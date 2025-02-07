import React from 'react';

import {
  phoneUI,
  phoneSchema,
} from 'platform/forms-system/src/js/web-component-patterns/phonePattern';
import {
  emailUI,
  emailSchema,
} from 'platform/forms-system/src/js/web-component-patterns/emailPattern';

import { formFields } from '../../constants';

export default {
  uiSchema: {
    'view:subHeadings': {
      'ui:description': (
        <>
          <h2 className="vads-u-font-size--h3">Your contact information</h2>
          <div className="meb-list-label">
            <strong>We’ll use this information to:</strong>
          </div>
          <ul>
            <li>Contact you if we have questions about your application</li>
            <li>Notify you when your frame has shipped</li>
          </ul>
        </>
      ),
    },
    [formFields.viewPhoneNumbers]: {
      'ui:description': (
        <>
          <h4 className="form-review-panel-page-header vads-u-font-size--h5 spruce-review-page-only">
            Phone numbers and email addresss
          </h4>
          <p className="spruce-review-page-only">
            If you’d like to update your phone numbers and email address, please
            edit the form fields below.
          </p>
        </>
      ),
      [formFields.phoneNumber]: phoneUI(),
    },
    [formFields.email]: emailUI(),
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
          [formFields.phoneNumber]: phoneSchema,
        },
      },
      [formFields.email]: emailSchema,
    },
  },
};
