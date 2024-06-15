import React from 'react';

import currentOrPastDateUI from 'platform/forms-system/src/js/definitions/currentOrPastDate';
import ssnUI from 'platform/forms-system/src/js/definitions/ssn';

// In a real form this wouldn't be imported here. We'd pull the real schema
import fullSchema from '../../schema';
import { formFields } from '../../constants';
import { isAlphaNumeric } from '../../validation';

export default {
  uiSchema: {
    'view:subHeadings': {
      'ui:description': (
        <>
          <h3>Your identity information</h3>
        </>
      ),
    },
    [formFields.veteranSocialSecurityNumber]: {
      ...ssnUI,
      'ui:title': 'Social Security number',
      'ui:required': form => !form.vaFileNumber,
    },
    [formFields.departmentOfDefenseID]: {
      'ui:title': 'Department of Defense ID number',
      'ui:validations': [isAlphaNumeric],
    },
    [formFields.dischargeDate]: {
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
      [formFields.veteranSocialSecurityNumber]: {
        type: 'string',
        pattern: '^[0-9]{9}$',
      },
      [formFields.departmentOfDefenseID]: {
        type: 'string',
      },
      [formFields.dischargeDate]: fullSchema.definitions.date,
    },
  },
};
