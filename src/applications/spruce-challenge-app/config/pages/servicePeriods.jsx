import React from 'react';

import { currentOrPastDateUI } from 'platform/forms-system/src/js/web-component-patterns';
import { validateDateRange } from '@department-of-veterans-affairs/platform-forms-system/validation';
import ServicePeriodView from 'platform/forms/components/ServicePeriodView';
import {
  VaTextInputField,
  VaSelectField,
} from 'platform/forms-system/src/js/web-component-fields';

import { nonBlockingWarning } from '../../components/NonBlockingWarning';
import { formFields } from '../../constants';
import {
  missingServicePeriodRank,
  overlappingServicePeriodDates,
} from '../../helpers';

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
    'view:subHeadings': {
      'ui:description': (
        <>
          <h2 className="vads-u-font-size--h3">Service periods</h2>
        </>
      ),
    },
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
        // showSave: true,
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
        },
        serviceBranch: {
          'ui:title': 'Branch of service',
          'ui:webComponentField': VaSelectField,
          'ui:required': () => true,
        },
        duty: {
          'ui:title': 'Duty assignment and major command',
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
    'view:noRankWarning': {
      'ui:description': nonBlockingWarning(
        'Your rank was not entered for one or more service periods',
      ),
      'ui:options': {
        hideIf: form => missingServicePeriodRank(form),
      },
    },
    'view:overlappingServiceDatesWarning': {
      'ui:description': nonBlockingWarning(
        'Service periods have overlapping start and end dates',
      ),
      'ui:options': {
        hideIf: form => overlappingServicePeriodDates(form),
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
      [formFields.toursOfDuty]: toursOfDuty,
      'view:noRankWarning': {
        type: 'object',
        properties: {},
      },
      'view:overlappingServiceDatesWarning': {
        type: 'object',
        properties: {},
      },
    },
  },
};
