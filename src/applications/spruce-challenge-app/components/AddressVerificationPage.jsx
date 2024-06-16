// CustomPage.jsx
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import { setData } from 'platform/forms-system/src/js/actions';
import FormNavButtons from '~/platform/forms-system/src/js/components/FormNavButtons';
import MailingAddressViewField from './AddressViewField';

import { formFields } from '../constants';
import { mapAddress } from '../helpers';

// Mock async request
export const verifyAddress = async address => {
  const params = new URLSearchParams(address).toString();
  const res = await fetch(
    `http://localhost:3000/vetsapi/verifyAddress?${params}`,
    {
      method: 'GET',
    },
  ).then(response => response.json());
  // console.log(res);
  if (res.errorCode) return false;

  // If no error from API + result matches input, verified
  return { USPSVerifiedAddress: res, equal: isEqual(res, address) };
};

const AddressVerificationPage = ({
  title,
  data,
  onReviewPage,
  goBack,
  goToPath,
  updatePage,
  setFormData, // setData
}) => {
  const address = data['view:mailingAddress'].mailingAddress;

  // Set state for this form
  const [addressObj, setaddressObj] = useState({
    value: address || '',
    dirty: false,
  });
  const [isVerified, setIsVerified] = useState(false);
  const [USPSaddress, setUSPSaddress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(
    () => {
      const checkVerification = async () => {
        const mappedAddress = mapAddress(address);
        const result = await verifyAddress(mappedAddress);

        // error received from address api
        if (result === false) {
          setIsVerified(false);
          setIsError(true);
          setIsLoading(false);
          return;
        }

        setUSPSaddress(mapAddress(result.USPSVerifiedAddress, false));
        setIsVerified(result.equal);
        setIsLoading(false);
      };

      checkVerification();
    },
    [address],
  );

  // when form submits to go to next page
  const updateFormData = () => {
    // use setData to set form schema data. see mapDispatchToProps below
    setFormData({
      ...data,
      [formFields.viewMailingAddress]: {
        mailingAddress: addressObj.value,
      },
    });

    // Redirect to page using goToPath, or if on review page,
    // return to review mode instead of edit mode.
    // eslint-disable-next-line no-unused-expressions
    onReviewPage ? updatePage() : goToPath('/review-and-submit');
  };

  // should fire when a checkbox is selected
  const onAddressChange = event => {
    if (event.target?.value) {
      setaddressObj({ value: JSON.parse(event.target.value), dirty: true });
    }
  };

  const navButtons = <FormNavButtons goBack={goBack} submitToContinue />;
  const updateButton = (
    <va-button type="submit">Review update button</va-button>
  );
  return (
    <form onSubmit={updateFormData}>
      <fieldset>
        <h2 className="vads-u-font-size--h3">{title}</h2>

        {isError && (
          <va-alert status="info">
            We were unable to verify your address with the United States Postal
            Service due to technical issues. You can submit your address as
            entered without this verification.
          </va-alert>
        )}
        {USPSaddress && (
          <va-alert
            data-label="Info banner"
            status={isVerified ? 'success' : 'warning'}
            visible
          >
            <h3 id="USPS-Verification" slot="headline">
              USPS verified address:
            </h3>
            <MailingAddressViewField address={USPSaddress} />
          </va-alert>
        )}

        <p className="vads-u-margin-bottom--0">
          <strong>You entered:</strong>
        </p>
        <MailingAddressViewField address={address} />

        {!isLoading && (
          <va-radio
            error={null}
            hint={null}
            label="Select which address to use"
            onClick={e => onAddressChange(e)}
          >
            {USPSaddress && (
              <va-radio-option
                id="USPS"
                label="USPS verified address"
                name="group1"
                tile
                value={JSON.stringify(USPSaddress)}
                checked={USPSaddress}
              />
            )}
            <va-radio-option
              id="user"
              label="Mailing address as you entered it"
              name="group1"
              tile
              value={JSON.stringify(address)}
              checked={!USPSaddress}
            />
          </va-radio>
        )}

        {onReviewPage ? updateButton : navButtons}
      </fieldset>
    </form>
  );
};

// map setData to component props
const mapDispatchToProps = {
  setFormData: setData,
};

export default connect(
  null,
  mapDispatchToProps,
)(AddressVerificationPage);
