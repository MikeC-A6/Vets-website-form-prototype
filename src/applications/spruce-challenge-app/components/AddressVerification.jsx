import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import AddressViewField from 'platform/forms-system/src/js/components/AddressViewField';

// Adjust form data into shape that validation API expects
const mapAddress = address => {
  const mappedAddress = {};

  if (address.street) mappedAddress.AddressLine1 = address.street;
  if (address.street2) mappedAddress.AddressLine2 = address.street2;
  if (address.city) mappedAddress.City = address.city;
  if (address.state) mappedAddress.State = address.state;
  if (address.postalCode) mappedAddress.ZipCode = address.postalCode;

  return mappedAddress;
};

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

// Actual component that renders on the FE to make async call
export const AddressVerification = ({ formData }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [USPSaddress, setUSPSaddress] = useState(null);
  const [isError, setIsError] = useState(false);
  const address = formData['view:mailingAddress'].mailingAddress;

  useEffect(
    () => {
      const checkVerification = async () => {
        const mappedAddress = mapAddress(address);
        const result = await verifyAddress(mappedAddress);

        // error received from address api
        if (result === false) {
          setIsVerified(false);
          setIsError(true);
          return;
        }

        setUSPSaddress(result.USPSVerifiedAddress);
        setIsVerified(result.equal);
      };

      checkVerification();
    },
    [address],
  );

  return (
    <>
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
          status={isVerified ? 'info' : 'warning'}
          visible
        >
          <span>
            <strong>USPS Verified address:</strong>
          </span>
          <br />
          {USPSaddress.AddressLine1 && (
            <>
              <span>{USPSaddress.AddressLine1}</span>
              <br />
            </>
          )}
          {USPSaddress.AddressLine2 && (
            <>
              <span>{USPSaddress.AddressLine2}</span>
              <br />
            </>
          )}
          {USPSaddress.City && (
            <>
              <span>
                {USPSaddress.City}, {USPSaddress.State} {USPSaddress.ZipCode}
              </span>
              <br />
            </>
          )}
          {USPSaddress?.Country && (
            <>
              <span>{USPSaddress.Country}</span>
              <br />
            </>
          )}
        </va-alert>
      )}

      <p className="vads-u-margin-bottom--0">
        <strong>You entered:</strong>
      </p>
      <AddressViewField formData={address} />
    </>
  );
};

AddressVerification.propTypes = {
  formData: PropTypes.shape({
    'view:mailingAddress': PropTypes.shape({
      mailingAddress: PropTypes.shape({
        street: PropTypes.string,
        street2: PropTypes.string,
        city: PropTypes.string,
        state: PropTypes.string,
        postalCode: PropTypes.string,
        country: PropTypes.string,
      }),
    }),
  }),
};
