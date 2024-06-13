import { currentOrPastDateUI } from 'platform/forms-system/src/js/web-component-patterns';
import { validateDateRange } from '@department-of-veterans-affairs/platform-forms-system/validation';
import ServicePeriodView from 'platform/forms/components/ServicePeriodView';

import {
  VaTextInputField,
  VaSelectField,
} from 'platform/forms-system/src/js/web-component-fields';
import { formFields } from '../../constants';

const toursOfDuty = {
  type: 'array',
  minItems: 1,
  maxItems: 100,
  items: {
    type: 'object',
    properties: {
      serviceBranch: {
        type: 'string',
        enum: ['Air Force', 'Army', 'Coast Guard', 'Marine Corps', 'Navy'],
      },
      dateRange: {
        type: 'object',
        properties: {
          from: {
            pattern:
              '^(\\d{4}|XXXX)-(0[1-9]|1[0-2]|XX)-(0[1-9]|[1-2][0-9]|3[0-1]|XX)$',
            type: 'string',
          },
          to: {
            pattern:
              '^(\\d{4}|XXXX)-(0[1-9]|1[0-2]|XX)-(0[1-9]|[1-2][0-9]|3[0-1]|XX)$',
            type: 'string',
          },
        },
      },
      rank: {
        type: 'string',
      },
      duty: {
        type: 'string',
      },
      command: {
        type: 'string',
      },
    },
  },
};

export function dateRangeUI(
  from = 'From',
  to = 'To',
  rangeError = 'To date must be after From date',
) {
  return {
    'ui:validations': [validateDateRange],
    'ui:errorMessages': {
      pattern: rangeError,
      required: 'Please enter a date',
    },
    from: currentOrPastDateUI(from),
    to: currentOrPastDateUI(to),
  };
}

export default {
  uiSchema: {
    'ui:title': 'Service periods',
    'ui:options': {
      pageClass: 'service-period-view',
    },
    [formFields.toursOfDuty]: {
      'ui:options': {
        itemName: 'Service period',
        viewField: ServicePeriodView,
        uswds: true,
        classNames: 'vads-u-margin--0',
        reviewTitle: 'Service periods',
        keepInPageOnReview: true,
        customTitle: ' ',
        confirmRemove: true,
        useDlWrap: true,
        itemAriaLabel: entry => entry.serviceBranch,
      },
      items: {
        dateRange: {
          ...dateRangeUI(
            'Service start date',
            'Service end date',
            'End of service must be after start of service',
          ),
          'ui:required': () => true,
        },
        serviceBranch: {
          'ui:title': 'Branch of service',
          'ui:webComponentField': VaSelectField,
          'ui:required': () => true,
        },
        duty: {
          'ui:title': 'Duty assignment',
          'ui:webComponentField': VaTextInputField,
          'ui:required': () => true,
        },
        command: {
          'ui:title': 'Major command',
          'ui:webComponentField': VaTextInputField,
          'ui:required': () => true,
        },
        rank: {
          'ui:title': 'Grade, rank or rating',
          'ui:webComponentField': VaTextInputField,
          'ui:options': {
            width: 'lg',
          },
        },
      },
    },
  },
  schema: {
    type: 'object',
    properties: {
      [formFields.toursOfDuty]: toursOfDuty,
    },
  },
};
