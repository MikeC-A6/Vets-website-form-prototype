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
          <h2 className="vads-u-font-size--h3">Your personal information</h2>
          <va-alert status="info" uswds visible>
            <div className="usa-alert-body">
              <p className="vads-u-margin-y--0">
                <strong>Note: </strong>
                Since you’re signed in to your account, we can prefill part of
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
      // [formFields.dateOfDeath]: date,
    },
  },
};
