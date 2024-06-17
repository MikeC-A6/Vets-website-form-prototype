import React from 'react';
import * as address from 'platform/forms/definitions/address';
import MailingAddressViewField from '../../components/MailingAddressViewField';
import { formFields } from '../../constants';
import fullSchema from '../../schema';

export default {
  uiSchema: {
    'view:subHeadings': {
      'ui:description': (
        <>
          <h2 className="vads-u-font-size--h3">
            Tell us where to ship your frame
          </h2>
          <p>If eligible, we'll send your frame of choice to this address.</p>
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
            required: 'Enter your full street address',
          },
        },
        city: {
          'ui:title': 'City',
          'ui:errorMessages': {
            required: 'Enter a valid city',
          },
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
            required: 'Postal code must be 5 digits',
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
      [formFields.viewMailingAddress]: {
        type: 'object',
        properties: {
          [formFields.address]: {
            ...address.schema(fullSchema, true),
          },
        },
      },
    },
  },
};
