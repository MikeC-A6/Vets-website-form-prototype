// import React from 'react';
import {
  dateOfBirthSchema,
  dateOfBirthUI,
  fullNameNoSuffixSchema,
  fullNameNoSuffixUI,
  titleUI,
} from '~/platform/forms-system/src/js/web-component-patterns';
import { getFullNameLabels } from '../helpers';

/** @type {PageSchema} */
export const nameAndDateOfBirthPage = {
  uiSchema: {
    ...titleUI({ title: 'Name and date of birth', headerLevel: 1 }),
    fullName: fullNameNoSuffixUI(label => getFullNameLabels(label, false)),
    dateOfBirth: dateOfBirthUI({ required: true }),
  },
  schema: {
    type: 'object',
    properties: {
      fullName: fullNameNoSuffixSchema,
      dateOfBirth: dateOfBirthSchema,
    },
    required: ['fullName', 'dateOfBirth'],
  },
};
