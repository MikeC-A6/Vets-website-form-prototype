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
          <h2 className="vads-u-font-size--h3">Your identity information</h2>
        </>
      ),
    },
    [formFields.veteranSocialSecurityNumber]: {
      ...ssnUI,
      'ui:title': 'Social Security number',
      'ui:required': formData => !formData[formFields.departmentOfDefenseID],
      'ui:errorMessages': {
        required:
          'Please enter a Social Security number or a Department of Defense ID number',
      },
    },
    [formFields.departmentOfDefenseID]: {
      'ui:title': 'Department of Defense ID number',
      'ui:validations': [isAlphaNumeric],
      'ui:required': formData =>
        !formData[formFields.veteranSocialSecurityNumber],
      'ui:errorMessages': {
        required:
          'Please enter a Social Security number or a Department of Defense ID number',
      },
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
