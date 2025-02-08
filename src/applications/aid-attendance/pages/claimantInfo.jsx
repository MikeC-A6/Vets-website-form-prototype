import React from 'react';

import fullNameUI from 'platform/forms-system/src/js/definitions/fullName';
import currentOrPastDateUI from 'platform/forms-system/src/js/definitions/currentOrPastDate';
import { validateCurrentOrPastDate } from 'platform/forms-system/src/js/validation';
import { isValidName } from 'platform/forms/validations';

import { formFields, RELATIONSHIP_CHOICES } from '../../constants';
import fullSchema from '../../schema';

const { date, fullName } = fullSchema.definitions;

export default {
  uiSchema: {
    'view:claimantSection': {
      'ui:description': (
        <>
          <h2 className="vads-u-font-size--h3">Claimant Information</h2>
          <va-alert status="info" uswds visible>
            <div className="usa-alert-body">
              <p className="vads-u-margin-y--0">
                Please provide information about the person filing this claim.
              </p>
            </div>
          </va-alert>
        </>
      ),
    },
    [formFields.isClaimant]: {
      'ui:title': 'Are you also the Claimant?',
      'ui:widget': 'radio',
      'ui:options': {
        labels: {
          Y: 'Yes',
          N: 'No',
        },
      },
    },
    [formFields.claimantFullName]: {
      ...fullNameUI,
      'ui:options': {
        expandUnder: formFields.isClaimant,
        expandUnderCondition: 'N',
      },
      first: {
        ...fullNameUI.first,
        'ui:title': "Claimant's first name",
        'ui:validations': [
          (errors, field) => {
            if (field.length < 3) {
              errors.addError('Enter a first name with 3 or more characters');
            }
            if (!isValidName(field)) {
              errors.addError(
                'Enter a valid name. Acceptable characters include: letters, spaces, and apostrophes',
              );
            }
          },
        ],
      },
      middle: {
        ...fullNameUI.middle,
        'ui:title': "Claimant's middle name",
      },
      last: {
        ...fullNameUI.last,
        'ui:title': "Claimant's last name",
        'ui:validations': [
          (errors, field) => {
            if (field.length < 3) {
              errors.addError('Enter a last name with 3 or more characters');
            }
            if (!isValidName(field)) {
              errors.addError(
                'Enter a valid name. Acceptable characters include: letters, spaces, dashes, and apostrophes',
              );
            }
          },
        ],
      },
    },
    [formFields.claimantSocialSecurityNumber]: {
      'ui:title': "Claimant's Social Security number",
      'ui:options': {
        expandUnder: formFields.isClaimant,
        expandUnderCondition: 'N',
      },
      'ui:widget': 'ssn',
      'ui:errorMessages': {
        pattern: 'Please enter a valid 9-digit Social Security number (dashes will be added automatically)',
      },
    },
    [formFields.claimantDateOfBirth]: {
      ...currentOrPastDateUI("Claimant's date of birth"),
      'ui:options': {
        expandUnder: formFields.isClaimant,
        expandUnderCondition: 'N',
      },
      'ui:validations': [validateCurrentOrPastDate],
    },
    [formFields.relationshipToVeteran]: {
      'ui:title': 'What is your relationship to the Veteran?',
      'ui:widget': 'select',
      'ui:required': () => true,
      'ui:options': {
        expandUnder: formFields.isClaimant,
        expandUnderCondition: 'N',
        labels: {
          '': 'Please select...',
          SPOUSE: 'Spouse of Veteran',
          PARENT: 'Parent of Veteran',
          CHILD: 'Child of Veteran',
        },
      },
    },
  },
  schema: {
    type: 'object',
    required: [formFields.isClaimant],
    properties: {
      'view:claimantSection': {
        type: 'object',
        properties: {},
      },
      [formFields.isClaimant]: {
        type: 'string',
        enum: ['Y', 'N'],
      },
      [formFields.claimantFullName]: fullName,
      [formFields.claimantSocialSecurityNumber]: {
        type: 'string',
        pattern: '^[0-9]{9}$',
      },
      [formFields.claimantDateOfBirth]: date,
      [formFields.relationshipToVeteran]: {
        type: 'string',
        enum: RELATIONSHIP_CHOICES,
      },
    },
    dependencies: {
      [formFields.isClaimant]: {
        oneOf: [
          {
            properties: {
              [formFields.isClaimant]: {
                enum: ['Y'],
              },
            },
          },
          {
            properties: {
              [formFields.isClaimant]: {
                enum: ['N'],
              },
            },
            required: [
              formFields.claimantFullName,
              formFields.claimantSocialSecurityNumber,
              formFields.claimantDateOfBirth,
              formFields.relationshipToVeteran,
            ],
          },
        ],
      },
    },
  },
}; 