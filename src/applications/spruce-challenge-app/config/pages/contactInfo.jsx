import React from 'react';

import commonDefinitions from 'vets-json-schema/dist/definitions.json';
import phoneUI from 'platform/forms-system/src/js/definitions/phone';
import emailUI from 'platform/forms-system/src/js/definitions/email';

import { formFields } from '../../constants';
import GoToYourProfileLink from '../../components/GoToYourProfileLink';
import PhoneReviewField from '../../components/PhoneReviewField';
import YesNoReviewField from '../../components/YesNoReviewField';
import EmailViewField from '../../components/EmailViewField';
import EmailReviewField from '../../components/EmailReviewField';
import { titleCase } from '../../helpers';
import {
  validateHomePhone,
  validateMobilePhone,
  validateEmail,
} from '../../validation';

const { usaPhone, email } = commonDefinitions;

function phoneUISchema(category) {
  return {
    'ui:options': {
      hideLabelText: true,
      showFieldLabel: false,
    },
    'ui:objectViewField': PhoneReviewField,
    phone: {
      ...phoneUI(`${titleCase(category)} phone number`),
      'ui:validations': [
        category === 'mobile' ? validateMobilePhone : validateHomePhone,
      ],
    },
    isInternational: {
      'ui:title': `This ${category} phone number is international`,
      'ui:reviewField': YesNoReviewField,
      'ui:options': {
        hideIf: formData => {
          if (category === 'mobile') {
            if (
              !formData[formFields.viewPhoneNumbers][
                formFields.mobilePhoneNumber
              ].phone
            ) {
              return true;
            }
          } else if (
            !formData[formFields.viewPhoneNumbers][formFields.phoneNumber].phone
          ) {
            return true;
          }
          return false;
        },
      },
    },
  };
}

function phoneSchema() {
  return {
    type: 'object',
    properties: {
      phone: {
        ...usaPhone,
        pattern: '^\\d[-]?\\d(?:[0-9-]*\\d)?$',
      },
      isInternational: {
        type: 'boolean',
      },
    },
  };
}

export default {
  uiSchema: {
    'view:subHeadings': {
      'ui:description': (
        <>
          <h3>Review your phone numbers and email address</h3>
          <div className="meb-list-label">
            <strong>We’ll use this information to:</strong>
          </div>
          <ul>
            <li>Contact you if we have questions about your application</li>
            <li>Tell you important information about your benefits</li>
          </ul>
          <p>
            This is the contact information we have on file for you. If you
            notice any errors, please correct them now. Any updates you make
            will change the information for your education benefits only.
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
            If you’d like to update your phone numbers and email address, please
            edit the form fields below.
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
          if (field[formFields.email] !== field[formFields.confirmEmail]) {
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
};
