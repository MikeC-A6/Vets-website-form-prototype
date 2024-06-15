import React from 'react';
import * as address from 'platform/forms/definitions/address';
import GoToYourProfileLink from '../../components/GoToYourProfileLink';
import MailingAddressViewField from '../../components/MailingAddressViewField';
import { formFields } from '../../constants';
import { isOnlyWhitespace } from '../../validation';

const addressSchema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: "DEPENDENTS' APPLICATION FOR VA EDUCATION BENEFITS (22-5490)",
  type: 'object',
  additionalProperties: false,
  definitions: {
    address: {
      type: 'object',
      oneOf: [
        {
          properties: {
            country: {
              type: 'string',
              enum: ['CAN'],
            },
            state: {
              type: 'string',
              enum: [
                'AB',
                'BC',
                'MB',
                'NB',
                'NL',
                'NT',
                'NS',
                'NU',
                'ON',
                'PE',
                'QC',
                'SK',
                'YT',
              ],
            },
            postalCode: {
              type: 'string',
              maxLength: 10,
            },
          },
        },
        {
          properties: {
            country: {
              type: 'string',
              enum: ['MEX'],
            },
            state: {
              type: 'string',
              enum: [
                'aguascalientes',
                'baja-california-norte',
                'baja-california-sur',
                'campeche',
                'chiapas',
                'chihuahua',
                'coahuila',
                'colima',
                'distrito-federal',
                'durango',
                'guanajuato',
                'guerrero',
                'hidalgo',
                'jalisco',
                'mexico',
                'michoacan',
                'morelos',
                'nayarit',
                'nuevo-leon',
                'oaxaca',
                'puebla',
                'queretaro',
                'quintana-roo',
                'san-luis-potosi',
                'sinaloa',
                'sonora',
                'tabasco',
                'tamaulipas',
                'tlaxcala',
                'veracruz',
                'yucatan',
                'zacatecas',
              ],
            },
            postalCode: {
              type: 'string',
              maxLength: 10,
            },
          },
        },
        {
          properties: {
            country: {
              type: 'string',
              enum: ['USA'],
            },
            state: {
              type: 'string',
              enum: [
                'AL',
                'AK',
                'AS',
                'AZ',
                'AR',
                'AA',
                'AE',
                'AP',
                'CA',
                'CO',
                'CT',
                'DE',
                'DC',
                'FM',
                'FL',
                'GA',
                'GU',
                'HI',
                'ID',
                'IL',
                'IN',
                'IA',
                'KS',
                'KY',
                'LA',
                'ME',
                'MH',
                'MD',
                'MA',
                'MI',
                'MN',
                'MS',
                'MO',
                'MT',
                'NE',
                'NV',
                'NH',
                'NJ',
                'NM',
                'NY',
                'NC',
                'ND',
                'MP',
                'OH',
                'OK',
                'OR',
                'PW',
                'PA',
                'PR',
                'RI',
                'SC',
                'SD',
                'TN',
                'TX',
                'UT',
                'VT',
                'VI',
                'VA',
                'WA',
                'WV',
                'WI',
                'WY',
              ],
            },
            postalCode: {
              type: 'string',
              maxLength: 10,
            },
          },
        },
        {
          properties: {
            country: {
              not: {
                type: 'string',
                enum: ['CAN', 'MEX', 'USA'],
              },
            },
            state: {
              type: 'string',
              maxLength: 51,
            },
            postalCode: {
              type: 'string',
              maxLength: 51,
            },
          },
        },
      ],
      properties: {
        street: {
          type: 'string',
          minLength: 1,
          maxLength: 50,
        },
        street2: {
          type: 'string',
          minLength: 1,
          maxLength: 50,
        },
        city: {
          type: 'string',
          minLength: 1,
          maxLength: 51,
        },
      },
    },
  },
};

export default {
  uiSchema: {
    'view:subHeadings': {
      'ui:description': (
        <>
          <h3>Review your mailing address</h3>
          <p>
            We’ll send any important information about your application to this
            address.
          </p>
          <p>
            This is the mailing address we have on file for you. If you notice
            any errors, please correct them now. Any updates you make will
            change the information for your education benefits only.
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
          <h4 className="form-review-panel-page-header vads-u-font-size--h5 spruce-review-page-only">
            Mailing address
          </h4>
          <p className="spruce-review-page-only">
            If you’d like to update your mailing address, please edit the form
            fields below.
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
                errors.addError('Please enter your full street address');
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
    required: [formFields.address],
    properties: {
      'view:subHeadings': {
        type: 'object',
        properties: {},
      },
      [formFields.viewMailingAddress]: {
        type: 'object',
        properties: {
          [formFields.address]: {
            ...address.schema(addressSchema, true),
          },
        },
      },
    },
  },
};
