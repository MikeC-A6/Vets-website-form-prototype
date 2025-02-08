import React from 'react';

import fullNameUI from 'platform/forms-system/src/js/definitions/fullName';
import currentOrPastDateUI from 'platform/forms-system/src/js/definitions/currentOrPastDate';
import { isValidName } from 'platform/forms/validations';
import { validateCurrentOrPastDate } from 'platform/forms-system/src/js/validation';
import { isDateWithinTenYearsOfToday } from '../../validation';

import { formFields } from '../../constants';

// In a real form this wouldn't be imported here. We'd pull the real schema
import fullSchema from '../../schema';

const { date, fullName } = fullSchema.definitions;

export default {
  uiSchema: {
    'view:subHeadings': {
      'ui:description': (
        <>
          <h2 className="vads-u-font-size--h3">Veteran Information</h2>
          <va-alert status="info" uswds visible>
            <div className="usa-alert-body">
              <p className="vads-u-margin-y--0">
                <strong>Note: </strong>
                Since you're signed in to your account, we can prefill part of
                your application based on your VA.gov account details.
              </p>
            </div>
          </va-alert>
        </>
      ),
    },
    [formFields.userFullName]: {
      ...fullNameUI,
      first: {
        ...fullNameUI.first,
        'ui:title': "Veteran's first name",
        'ui:validations': [
          (errors, field) => {
            if (field.length < 3) {
              errors.addError('Enter a first name with 3 or more characters');
            }
            if (!isValidName(field)) {
              if (field[0] === ' ' || field[0] === "'") {
                errors.addError(
                  'First character must be a letter with no leading space.',
                );
              } else {
                errors.addError(
                  'Enter a valid entry. Acceptable entries are letters, spaces and apostrophes.',
                );
              }
            }
          },
        ],
      },
      last: {
        ...fullNameUI.last,
        'ui:title': "Veteran's last name",
        'ui:validations': [
          (errors, field) => {
            if (field.length < 3) {
              errors.addError('Enter a last name with 3 or more characters');
            }
            if (!isValidName(field)) {
              if (field[0] === ' ' || field[0] === "'" || field[0] === '-') {
                errors.addError(
                  'First character must be a letter with no leading space.',
                );
              } else {
                errors.addError(
                  'Enter a valid entry. Acceptable entries are letters, spaces, dashes and apostrophes.',
                );
              }
            }
          },
        ],
      },
      middle: {
        ...fullNameUI.middle,
        'ui:title': "Veteran's middle name",
        'ui:validations': [
          (errors, field) => {
            if (!isValidName(field)) {
              if (field[0] === ' ' || field[0] === "'") {
                errors.addError(
                  'First character must be a letter with no leading space.',
                );
              } else {
                errors.addError(
                  'Enter a valid entry. Acceptable entries are letters, spaces and apostrophes.',
                );
              }
            }
          },
        ],
      },
    },
    [formFields.veteranSocialSecurityNumber]: {
      'ui:title': "Veteran's Social Security number",
      'ui:widget': 'ssn',
      'ui:errorMessages': {
        pattern: 'Please enter a valid 9-digit Social Security number (dashes will be added automatically)',
      },
    },
    [formFields.vaFileNumber]: {
      'ui:title': 'VA file number (if applicable)',
      'ui:help': 'This number will be on any correspondence VA sent you',
      'ui:errorMessages': {
        pattern: 'Please enter a valid VA file number',
      },
    },
    [formFields.serviceNumber]: {
      'ui:title': 'Service number (if applicable)',
      'ui:help': 'This is your military service number if different from your Social Security number',
      'ui:errorMessages': {
        pattern: 'Please enter a valid service number',
      },
    },
    [formFields.dateOfBirth]: {
      ...currentOrPastDateUI("Veteran's date of birth"),
      'ui:validations': [
        validateCurrentOrPastDate,
        isDateWithinTenYearsOfToday,
      ],
    },
  },
  schema: {
    type: 'object',
    required: [formFields.userFullName, formFields.veteranSocialSecurityNumber, formFields.dateOfBirth],
    properties: {
      'view:subHeadings': {
        type: 'object',
        properties: {},
      },
      [formFields.userFullName]: {
        ...fullName,
        properties: {
          ...fullName.properties,
          middle: {
            ...fullName.properties.middle,
            maxLength: 30,
          },
        },
      },
      [formFields.veteranSocialSecurityNumber]: {
        type: 'string',
        pattern: '^[0-9]{9}$',
      },
      [formFields.vaFileNumber]: {
        type: 'string',
        pattern: '^[0-9]{8,9}$',
      },
      [formFields.serviceNumber]: {
        type: 'string',
        pattern: '^[0-9A-Za-z]{1,20}$',
      },
      [formFields.dateOfBirth]: date,
    },
  },
};
