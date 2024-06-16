import {
  radioUI,
  radioSchema,
} from 'platform/forms-system/src/js/web-component-patterns/radioPattern';
import VaCheckboxField from 'platform/forms-system/src/js/web-component-fields/VaCheckboxField';
import { AddressVerification } from '../../components/AddressVerification';

const formConfig = {
  uiSchema: {
    'ui:description': AddressVerification,
    saveAddress: {
      'ui:webComponentField': VaCheckboxField,
      'ui:title': 'Save this address for future use?',
    },
    receiveAtAddress: radioUI({
      title: 'Can you receive a package at this address?',
      labels: {
        yes: 'Yes, I can',
        no: 'No, I cannot',
      },
      errorMessages: {
        required:
          'Please select whether you can receive a package at this address',
      },
    }),
  },
  schema: {
    type: 'object',
    required: ['receiveAtAddress'],
    properties: {
      saveAddress: {
        type: 'boolean',
        enum: [true],
      },
      receiveAtAddress: radioSchema(['yes', 'no']),
    },
  },
};

export default formConfig;
