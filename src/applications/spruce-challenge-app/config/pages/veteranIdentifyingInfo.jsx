import React from 'react';

// In a real form this wouldn't be imported here. We'd pull the real schema
import commonDefinitions from 'vets-json-schema/dist/definitions.json';

import currentOrPastDateUI from 'platform/forms-system/src/js/definitions/currentOrPastDate';
import ssnUI from 'platform/forms-system/src/js/definitions/ssn';

import GoToYourProfileLink from '../../components/GoToYourProfileLink';
import { isAlphaNumeric } from '../../helpers';

export default {
  uiSchema: {
    'view:subHeadings': {
      'ui:description': (
        <>
          <h3>Review your personal information</h3>
          <p>
            This is the personal information we have on file for you. If you
            notice any errors, please correct them now. Any updates you make
            will change the information for your education benefits only.
          </p>
          <p>
            <strong>Note:</strong> If you want to update your personal
            information for other VA benefits, you can do that from your
            profile.
          </p>
          <p className="vads-u-margin-bottom--3">
            <GoToYourProfileLink />
          </p>
        </>
      ),
    },
    veteranSocialSecurityNumber: {
      ...ssnUI,
      'ui:title': 'Social Security number (must have this or a VA file number)',
      'ui:required': form => !form.vaFileNumber,
    },
    dodIDNumber: {
      'ui:title': 'Department of Defense ID number (DoD ID number)',
      'ui:validations': [isAlphaNumeric],
    },
    dischargeDate: {
      ...currentOrPastDateUI('Date of discharge'),
      'ui:errorMessages': {
        required: 'Please enter a discharge date',
      },
    },
  },
  schema: {
    type: 'object',
    required: ['dischargeDate'],
    properties: {
      'view:subHeadings': {
        type: 'object',
        properties: {},
      },
      veteranSocialSecurityNumber: {
        type: 'string',
        pattern: '^[0-9]{9}$',
      },
      dodIDNumber: {
        type: 'string',
      },
      dischargeDate: commonDefinitions.date,
    },
  },
};
