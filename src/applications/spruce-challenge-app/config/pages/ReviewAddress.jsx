import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  radioUI,
  radioSchema,
} from 'platform/forms-system/src/js/web-component-patterns/radioPattern';

// Mock async request
const verifyAddress = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
};

export const ReviewAddress = ({ formData }) => {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const checkVerification = async () => {
      const result = await verifyAddress();
      setIsVerified(result);
    };

    checkVerification();
  }, []);

  const address = formData['view:mailingAddress'].mailingAddress;

  return (
    <>
      <va-banner
        data-label="Info banner"
        headline="Should we save this address to your VA profile?"
        type="info"
        visible
      >
        <p>Your mailing address</p>
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
        <p>{isVerified ? 'Verified' : 'Not Verified'}</p>
      </va-banner>
    </>
  );
};

const formConfig = {
  uiSchema: {
    receiveAtAddress: radioUI({
      title: 'Can you receive a package at this address?',
      labels: {
        yes: 'Yes, I can',
        no: 'No, I cannot',
      },
      required: () => true,
      errorMessages: {
        required:
          'Please select whether you can receive a package at this address',
      },
    }),
    saveAddress: radioUI({
      title: 'Would you like to save this address to your VA Profile?',
      labels: {
        yes: 'Yes, I would',
        no: 'No, I would not',
      },
      required: () => true,
      errorMessages: {
        required:
          "Please select whether you'd like to save this address to your VA Profile",
      },
    }),
  },
  schema: {
    type: 'object',
    required: ['saveAddress', 'receiveAtAddress'],
    properties: {
      saveAddress: radioSchema(['yes', 'no']),
      receiveAtAddress: radioSchema(['yes', 'no']),
    },
  },
};

export default formConfig;

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
