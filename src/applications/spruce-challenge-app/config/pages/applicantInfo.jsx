import React from 'react';

import fullNameUI from 'platform/forms-system/src/js/definitions/fullName';
import currentOrPastDateUI from 'platform/forms-system/src/js/definitions/currentOrPastDate';
import { isValidName } from 'platform/forms/validations';
import { validateCurrentOrPastDate } from 'platform/forms-system/src/js/validation';
import { isDateWithinTenYearsOfToday } from '../../validation';

import { formFields } from '../../constants';
import GoToYourProfileLink from '../../components/GoToYourProfileLink';

// In a real form this wouldn't be imported here. We'd pull the real schema
import fullSchema from '../../schema';

const { date, fullName } = fullSchema.definitions;

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
    [formFields.userFullName]: {
      ...fullNameUI,
      first: {
        ...fullNameUI.first,
        'ui:title': 'Your first name',
        'ui:validations': [
          (errors, field) => {
            if (field.length < 3) {
              errors.addError('Please enter your first name');
            }
            if (!isValidName(field)) {
              if (field[0] === ' ' || field[0] === "'") {
                errors.addError(
                  'First character must be a letter with no leading space.',
                );
              } else {
                errors.addError(
                  'Please enter a valid entry. Acceptable entries are letters, spaces and apostrophes.',
                );
              }
            }
          },
        ],
      },
      last: {
        ...fullNameUI.last,
        'ui:title': 'Your last name',
        'ui:validations': [
          (errors, field) => {
            if (field.length < 3) {
              errors.addError('Please enter your last name');
            }
            if (!isValidName(field)) {
              if (field[0] === ' ' || field[0] === "'" || field[0] === '-') {
                errors.addError(
                  'First character must be a letter with no leading space.',
                );
              } else {
                errors.addError(
                  'Please enter a valid entry. Acceptable entries are letters, spaces, dashes and apostrophes.',
                );
              }
            }
          },
        ],
      },
      middle: {
        ...fullNameUI.middle,
        'ui:title': 'Your middle name',
        'ui:validations': [
          (errors, field) => {
            if (!isValidName(field)) {
              if (field[0] === ' ' || field[0] === "'") {
                errors.addError(
                  'First character must be a letter with no leading space.',
                );
              } else {
                errors.addError(
                  'Please enter a valid entry. Acceptable entries are letters, spaces and apostrophes.',
                );
              }
            }
          },
        ],
      },
    },
    [formFields.dateOfBirth]: {
      ...currentOrPastDateUI('Your date of birth'),
      // need to include the standard date validation in addition to our custom check
      'ui:validations': [
        validateCurrentOrPastDate,
        isDateWithinTenYearsOfToday,
      ],
    },
    // [formFields.dateOfDeath]: {
    //   ...currentOrPastDateUI('Date of death'),
    // },
  },
  schema: {
    type: 'object',
    required: [formFields.dateOfBirth],
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
      [formFields.dateOfBirth]: date,
      'view:dateOfBirthUnder18Alert': {
        type: 'object',
        properties: {},
      },
      // [formFields.dateOfDeath]: date,
    },
  },
};
