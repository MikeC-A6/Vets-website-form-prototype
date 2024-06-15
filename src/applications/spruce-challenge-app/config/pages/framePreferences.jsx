import React from 'react';
import {
  radioUI,
  radioSchema,
} from 'platform/forms-system/src/js/web-component-patterns/radioPattern';
import { formFields, WOOD_CHOICES, MOUNT_CHOICES } from '../../constants';

export default {
  uiSchema: {
    'view:subHeadings': {
      'ui:description': (
        <>
          <h3>Choose your frame type</h3>
          <p>
            These choices will determine the appearance of the shipped frame.
            You can make selections for the type of wood used as well as the
            mounting style (wall-mounted or standing)
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
};
