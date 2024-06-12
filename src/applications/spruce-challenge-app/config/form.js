import React from 'react';

import fullSchema5490 from 'vets-json-schema/dist/22-5490-schema.json';
import commonDefinitions from 'vets-json-schema/dist/definitions.json';

import * as address from 'platform/forms/definitions/address';
import FormFooter from 'platform/forms/components/FormFooter';
import currentOrPastDateUI from 'platform/forms-system/src/js/definitions/currentOrPastDate';
import emailUI from 'platform/forms-system/src/js/definitions/email';
import fullNameUI from 'platform/forms-system/src/js/definitions/fullName';
import ssnUI from 'platform/forms-system/src/js/definitions/ssn';
import {
  radioUI,
  radioSchema,
} from 'platform/forms-system/src/js/web-component-patterns/radioPattern';

import manifest from '../manifest.json';

import {
  isAlphaNumeric,
  isOnlyWhitespace,
  prefillTransformer,
} from '../helpers';

import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';

// splitting schema out like this may make it more readable + consistent with existing forms
import servicePeriods from './chapters/servicePeriods';

import { formFields, WOOD_CHOICES, MOUNT_CHOICES } from '../constants';
import GetFormHelp from '../components/GetFormHelp';
import GoToYourProfileLink from '../components/GoToYourProfileLink';
import { phoneSchema, phoneUISchema } from '../schema';
import EmailViewField from '../components/EmailViewField';
import { /* isValidPhoneField, */ validateEmail } from '../validation';
import EmailReviewField from '../components/EmailReviewField';
import MailingAddressViewField from '../components/MailingAddressViewField';
import PreSubmitInfo from '../components/PreSubmitInfo';

// const { date, fullName } = fullSchema5490.definitions;
const { /* dateRange, usaPhone, */ date, fullName, email } = commonDefinitions;

function isValidName(str) {
  return str && /^[A-Za-z][A-Za-z ']*$/.test(str);
}
function isValidLastName(str) {
  return str && /^[A-Za-z][A-Za-z '-]*$/.test(str);
}

const formConfig = {
  rootUrl: manifest.rootUrl,
  urlPrefix: '/',
  submitUrl: '/v0/api-spruce', // should we tie this to our address api service? or just mock it?
  trackingPrefix: 'spruce-challenge-app-',
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  formId: '24-SPRUCE',
  version: 0,
  prefillEnabled: true,
  prefillTransformer,
  savedFormMessages: {
    notFound: 'Please start over to request your DD-217 frame.',
    noAuth: 'Please sign in again to continue your application.',
  },
  title: 'Apply for your DD-217 frame',
  subTitle: 'Equal to 24-SPRUCE, Application for DD-217 frame',
  footerContent: FormFooter,
  getHelp: GetFormHelp,
  defaultDefinitions: {
    fullName,
    date,
  },
  preSubmitInfo: PreSubmitInfo,
  chapters: {
    applicantInformationChapter: {
      title: 'Biographical information',
      pages: {
        applicantInformation: {
          title: 'Biographical information',
          path: 'applicant/name-information',
          subTitle: 'Biographical information',
          instructions:
            'This is the personal information we have on file for you.',
          uiSchema: {
            'view:subHeadings': {
              'ui:description': (
                <>
                  <h3>Review your personal information</h3>
                  <p>
                    This is the personal information we have on file for you. If
                    you notice any errors, please correct them now. Any updates
                    you make will change the information for your education
                    benefits only.
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
                    if (!isValidName(field)) {
                      if (field.length === 0) {
                        errors.addError('Please enter your first name');
                      } else if (field[0] === ' ' || field[0] === "'") {
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
                    if (!isValidLastName(field)) {
                      if (field.length === 0) {
                        errors.addError('Please enter your last name');
                      } else if (
                        field[0] === ' ' ||
                        field[0] === "'" ||
                        field[0] === '-'
                      ) {
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
                      if (field.length === 0) {
                        errors.addError('Please enter your middle name');
                      } else if (field[0] === ' ' || field[0] === "'") {
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
            },
            [formFields.dateOfDeath]: {
              ...currentOrPastDateUI('Date of death'),
            },
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
              [formFields.dateOfDeath]: date,
            },
          },
        },
        phoneEmail: {
          title: 'Phone numbers and email address',
          path: 'applicant/contact-information',
          uiSchema: {
            'view:subHeadings': {
              'ui:description': (
                <>
                  <h3>Review your phone numbers and email address</h3>
                  <div className="meb-list-label">
                    <strong>We’ll use this information to:</strong>
                  </div>
                  <ul>
                    <li>
                      Contact you if we have questions about your application
                    </li>
                    <li>Tell you important information about your benefits</li>
                  </ul>
                  <p>
                    This is the contact information we have on file for you. If
                    you notice any errors, please correct them now. Any updates
                    you make will change the information for your education
                    benefits only.
                  </p>
                  <p>
                    <strong>Note:</strong> If you want to update your contact
                    information for other VA benefits, you can do that from your
                    profile.
                  </p>
                  <p>
                    <GoToYourProfileLink />
                  </p>
                </>
              ),
            },
            [formFields.viewPhoneNumbers]: {
              'ui:description': (
                <>
                  <h4 className="form-review-panel-page-header vads-u-font-size--h5 fry-dea-review-page-only">
                    Phone numbers and email addresss
                  </h4>
                  <p className="fry-dea-review-page-only">
                    If you’d like to update your phone numbers and email
                    address, please edit the form fields below.
                  </p>
                </>
              ),
              [formFields.mobilePhoneNumber]: phoneUISchema('mobile'),
              [formFields.phoneNumber]: phoneUISchema('home'),
            },
            [formFields.email]: {
              'ui:options': {
                hideLabelText: true,
                showFieldLabel: false,
                viewComponent: EmailViewField,
              },
              [formFields.email]: {
                ...emailUI('Email address'),
                'ui:validations': [validateEmail],
                'ui:reviewField': EmailReviewField,
              },
              [formFields.confirmEmail]: {
                ...emailUI('Confirm email address'),
                'ui:options': {
                  ...emailUI()['ui:options'],
                  hideOnReview: true,
                },
              },
              'ui:validations': [
                (errors, field) => {
                  if (
                    field[formFields.email] !== field[formFields.confirmEmail]
                  ) {
                    errors[formFields.confirmEmail].addError(
                      'Sorry, your emails must match',
                    );
                  }
                },
              ],
            },
          },
          schema: {
            type: 'object',
            properties: {
              'view:subHeadings': {
                type: 'object',
                properties: {},
              },
              [formFields.viewPhoneNumbers]: {
                type: 'object',
                properties: {
                  [formFields.mobilePhoneNumber]: phoneSchema(),
                  [formFields.phoneNumber]: phoneSchema(),
                },
              },
              [formFields.email]: {
                type: 'object',
                required: [formFields.email, formFields.confirmEmail],
                properties: {
                  [formFields.email]: email,
                  [formFields.confirmEmail]: email,
                },
              },
            },
          },
        },
      },
    },
    veteranIdentifyingInformation: {
      title: 'Veteran personal information',
      pages: {
        identifyingInformation: {
          title: 'Veteran personal information',
          path: 'identifying-information',
          uiSchema: {
            'view:subHeadings': {
              'ui:description': (
                <>
                  <h3>Review your personal information</h3>
                  <p>
                    This is the personal information we have on file for you. If
                    you notice any errors, please correct them now. Any updates
                    you make will change the information for your education
                    benefits only.
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
              'ui:title':
                'Social Security number (must have this or a VA file number)',
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
              dischargeDate: date,
            },
          },
        },
        servicePeriods: {
          title: 'Service periods',
          path: 'military-history/service-periods',
          uiSchema: servicePeriods.uiSchema,
          schema: servicePeriods.schema,
        },
      },
    },
    frameSelectionChapter: {
      title: 'Complementary Frame',
      pages: {
        frameOptions: {
          title: 'Complementary Frame',
          path: 'frame-options',
          subTitle: 'Type of wood and display style',
          uiSchema: {
            'view:subHeadings': {
              'ui:description': (
                <>
                  <h3>Select options for the frame appearance</h3>
                  <p>
                    These choices will determine the appearance of the shipped
                    frame. You can make selections for the type of wood used as
                    well as the mounting style (wall-mounted or standing)
                  </p>
                </>
              ),
            },
            [formFields.frameWood]: radioUI({
              title: 'Choice of wood',
              labels: {
                cypress: 'Cypress',
                cedar: 'Cedar',
                pine: 'Pine',
                walnut: 'Walnut',
              },
              required: () => true,
              errorMessages: {
                required: 'Please select a type of wood',
              },
            }),
            [formFields.frameMount]: radioUI({
              title: 'Choice of mount',
              labels: {
                wall: 'Wall mounted',
                table: 'Table top',
              },
              required: () => true,
              errorMessages: {
                required: 'Please select a mounting style for your frame',
              },
            }),
          },
          schema: {
            type: 'object',
            required: [formFields.frameWood, formFields.frameMount],
            properties: {
              'view:subHeadings': {
                type: 'object',
                properties: {},
              },
              [formFields.frameWood]: radioSchema(WOOD_CHOICES),
              [formFields.frameMount]: radioSchema(MOUNT_CHOICES),
            },
          },
        },
      },
    },
    shippingAddressChapter: {
      title: 'Mailing Address',
      pages: {
        mailingAddress: {
          title: 'Mailing address',
          path: 'shipping-information/mailing-address',
          uiSchema: {
            'view:subHeadings': {
              'ui:description': (
                <>
                  <h3>Review your mailing address</h3>
                  <p>
                    We’ll send any important information about your application
                    to this address.
                  </p>
                  <p>
                    This is the mailing address we have on file for you. If you
                    notice any errors, please correct them now. Any updates you
                    make will change the information for your education benefits
                    only.
                  </p>
                  <p>
                    <strong>Note:</strong> If you want to update your personal
                    information for other VA benefits, you can do that from your
                    profile.
                  </p>
                  <p className="vads-u-margin-bottom--4">
                    <GoToYourProfileLink />
                  </p>
                </>
              ),
            },
            [formFields.viewMailingAddress]: {
              'ui:description': (
                <>
                  <h4 className="form-review-panel-page-header vads-u-font-size--h5 fry-dea-review-page-only">
                    Mailing address
                  </h4>
                  <p className="fry-dea-review-page-only">
                    If you’d like to update your mailing address, please edit
                    the form fields below.
                  </p>
                </>
              ),
              [formFields.address]: {
                ...address.uiSchema(''),
                street: {
                  'ui:title': 'Street address',
                  'ui:errorMessages': {
                    required: 'Please enter your full street address',
                  },
                  'ui:validations': [
                    (errors, field) => {
                      if (isOnlyWhitespace(field)) {
                        errors.addError(
                          'Please enter your full street address',
                        );
                      }
                    },
                  ],
                },
                city: {
                  'ui:title': 'City',
                  'ui:errorMessages': {
                    required: 'Please enter a valid city',
                  },
                  'ui:validations': [
                    (errors, field) => {
                      if (isOnlyWhitespace(field)) {
                        errors.addError('Please enter a valid city');
                      }
                    },
                  ],
                },
                state: {
                  'ui:title': 'State/Province/Region',
                  'ui:errorMessages': {
                    required: 'State is required',
                  },
                },
                postalCode: {
                  'ui:title': 'Postal Code (5-digit)',
                  'ui:errorMessages': {
                    required: 'Zip code must be 5 digits',
                  },
                },
              },
              'ui:options': {
                hideLabelText: true,
                showFieldLabel: false,
                viewComponent: MailingAddressViewField,
              },
            },
          },
          schema: {
            type: 'object',
            properties: {
              'view:subHeadings': {
                type: 'object',
                properties: {},
              },
              'view:mailingAddress': {
                type: 'object',
                properties: {
                  [formFields.address]: {
                    ...address.schema(fullSchema5490, true),
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default formConfig;
