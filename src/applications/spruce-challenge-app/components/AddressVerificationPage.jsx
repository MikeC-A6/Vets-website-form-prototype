// CustomPage.jsx
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import { setData } from 'platform/forms-system/src/js/actions';
import FormNavButtons from '~/platform/forms-system/src/js/components/FormNavButtons';
import MailingAddressViewField from './AddressViewField';

import { formFields } from '../constants';
import { mapAddress, formatAddressString } from '../helpers';

// Mock async request
export const verifyAddress = async address => {
  const params = new URLSearchParams(address).toString();
  const res = await fetch(
    `http://localhost:3000/vetsapi/verifyAddress?${params}`,
    {
      method: 'GET',
    },
  ).then(response => response.json());
  if (res.errorCode) return false;

  // If no error from API + result matches input, verified
  return { USPSVerifiedAddress: res, equal: isEqual(res, address) };
};

// Fires when a checkbox is selected
export const onAddressChange = (event, setaddressObj) => {
  if (event.target?.value) {
    setaddressObj({ value: JSON.parse(event.target.value), dirty: true });
  }
};

// Mock function that would communicate with the VA profile endpoint
export const saveAddressToVaProfile = async address => {
  // ... do some logic ...
  return `VA Profile updated with ${address.street}`;
};

export const AddressVerificationPage = ({
  title,
  data,
  onReviewPage,
  goBack,
  goToPath,
  updatePage,
  setFormData, // setData
  defaultLoading = true,
}) => {
  const address = data['view:mailingAddress'].mailingAddress;

  // Set state for this form
  const [addressObj, setaddressObj] = useState({
    value: address || '',
    dirty: false,
  });
  const [isVerified, setIsVerified] = useState(false);
  const [USPSaddress, setUSPSaddress] = useState(null);
  const [isLoading, setIsLoading] = useState(defaultLoading);
  const [isError, setIsError] = useState(false);
  const [saveAddress, setSaveAddress] = useState(false);

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
          setSaveAddress(false);
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

  // dynamically add event listener to the va-checkbox web component
  useEffect(
    () => {
      const element = document.querySelector('va-checkbox');
      const handleCheckboxChange = () => {
        setSaveAddress(!saveAddress);
      };
      element?.addEventListener('vaChange', handleCheckboxChange);
    },
    [saveAddress, USPSaddress],
  );

  // when form submits to go to next page
  const updateFormData = () => {
    // if the "Save this address" checkbox is checked, send update to va profile here
    if (saveAddress) {
      saveAddressToVaProfile(addressObj.value);
    }

    // use setData to set form schema data. see mapDispatchToProps below
    setFormData({
      ...data,
      [formFields.viewMailingAddress]: {
        mailingAddress: addressObj.value,
      },
      [formFields.updateProfileAddress]: saveAddress,
    });

    // Redirect to page using goToPath, or if on review page,
    // return to review mode instead of edit mode.
    // eslint-disable-next-line no-unused-expressions
    onReviewPage ? updatePage() : goToPath('/review-and-submit');
  };

  const alertString = isVerified
    ? 'Your address was verified by the US Postal Service (USPS)'
    : 'The address you entered could not be verified by the US Postal Service (USPS)';

  const navButtons = <FormNavButtons goBack={goBack} submitToContinue />;
  const updateButton = (
    <va-button type="submit">Review update button</va-button>
  );
  return (
    <form onSubmit={updateFormData}>
      <fieldset className="spruce-address-verification-page">
        <h2 className="vads-u-font-size--h3">{title}</h2>

        {isError && (
          <va-alert data-id="unable-to-verify" status="warning">
            We were unable to verify your address with the United States Postal
            Service due to technical issues on our end. You can submit your
            address as entered without this verification.
          </va-alert>
        )}
        {USPSaddress && (
          <va-alert
            data-label="Info banner"
            status={isVerified ? 'success' : 'warning'}
            visible
          >
            <h3
              id="USPS-Verification"
              className="vads-u-font-size--h4"
              slot="headline"
            >
              {alertString}
            </h3>
            {!isVerified && (
              <p>We found a similar address that is USPS verified:</p>
            )}
            <MailingAddressViewField address={USPSaddress} />
          </va-alert>
        )}

        {!isLoading &&
          !isVerified && (
            <va-radio
              error={null}
              hint={null}
              label="Select which address to use"
              onClick={e => onAddressChange(e, setaddressObj)}
            >
              {USPSaddress && (
                <va-radio-option
                  id="USPS"
                  label="USPS verified address"
                  description={formatAddressString(USPSaddress)}
                  name="group1"
                  tile
                  value={JSON.stringify(USPSaddress)}
                />
              )}
              <va-radio-option
                id="user"
                label="Mailing address as you entered it"
                description={formatAddressString(address)}
                name="group1"
                tile
                value={JSON.stringify(address)}
              />
            </va-radio>
          )}

        {USPSaddress && (
          <va-checkbox
            label="I want to save the selected address as my mailing address for VA letters, bills, and prescriptions"
            checked={saveAddress}
          />
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
