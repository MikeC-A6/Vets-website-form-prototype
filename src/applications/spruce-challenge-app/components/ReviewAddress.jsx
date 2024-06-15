import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';

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

  if (res.errorCode) return false;

  // If no error from API + result matches input, verified
  return isEqual(res, address);
};

export const ReviewAddress = ({ formData }) => {
  const [isVerified, setIsVerified] = useState(false);
  const address = formData['view:mailingAddress'].mailingAddress;

  useEffect(
    () => {
      const checkVerification = async () => {
        const mappedAddress = mapAddress(address);
        const result = await verifyAddress(mappedAddress);

        setIsVerified(result);
      };

      checkVerification();
    },
    [address],
  );

  return (
    <>
      <va-banner
        data-label="Info banner"
        headline="Should we save this address to your VA profile?"
        type="info"
        visible
      >
        {address.street && (
          <>
            <span>{address.street}</span>
            <br />
          </>
        )}
        {address.street2 && (
          <>
            <span>{address.street2}</span>
            <br />
          </>
        )}
        {address.city && (
          <>
            <span>
              {address.city}, {address.state} {address.postalCode}
            </span>
            <br />
          </>
        )}
        {address.country && (
          <>
            <span>{address.country}</span>
            <br />
          </>
        )}
        <p>
          {isVerified ? (
            <>
              <span>
                <va-icon class="green-checkmark" icon="check" size="3" />
              </span>
              <span>Verified</span>
            </>
          ) : (
            <>
              <span>
                <va-icon class="warning-icon" icon="do_not_disturb" size="3" />
              </span>
              <span>Not Verified</span>
            </>
          )}
        </p>
      </va-banner>
    </>
  );
};

ReviewAddress.propTypes = {
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
