import FormFooter from 'platform/forms/components/FormFooter';
import preSubmitInfo from 'platform/forms/preSubmitInfo';

import prefillTransformer from './prefill-transformer';

import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';

// splitting pages into individual schemas for readability & consistency with current forms
import applicantInfo from './pages/applicantInfo';
import contactInfo from './pages/contactInfo';
import claimantInfo from './pages/claimantInfo';
import mailingAddress from './pages/mailingAddress';
import servicePeriods from './pages/servicePeriods';
import AddressVerificationPage from '../components/AddressVerificationPage';

import GetFormHelp from '../components/GetFormHelp';

import fullSchema from '../schema';
import manifest from '../manifest.json';

const formConfig = {
  rootUrl: '/aid-attendance-form',
  urlPrefix: '',
  submitUrl: 'http://localhost:3000/v0/21-2680/submit',
  trackingPrefix: 'aid-attendance-',

  formId: '21-2680',
  version: 0,
  title: 'Aid & Attendance Benefits Application',
  subTitle: 'Aid and Attendance Application (VA Form 21-2680)',

  prefillEnabled: true,
  prefillTransformer,
  preSubmitInfo: {
    info: [],
    required: [],
    custom: [],
  },

  downtime: {
    requiredForPrefill: true,
  },

  savedFormMessages: {
    notFound: 'Please start over to apply for Aid and Attendance benefits.',
    noAuth: 'Please sign in again to continue your application.',
  },
  saveInProgress: {
    messages: {
      inProgress:
        'Your Aid and Attendance benefits application (21-2680) is in progress.',
      expired:
        'Your saved Aid and Attendance benefits application (21-2680) has expired. If you want to apply for benefits, please start a new application.',
      saved: 'Your Aid and Attendance benefits application has been saved.',
    },
  },

  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  footerContent: FormFooter,
  getHelp: GetFormHelp,

  v3SegmentedProgressBar: true,

  defaultDefinitions: {
    ...fullSchema.definitions,
  },

  chapters: {
    veteranInformation: {
      title: 'Veteran & Claimant Information',
      pages: {
        applicantInfo: {
          title: 'Veteran Information',
          path: 'veteran-information',
          uiSchema: applicantInfo.uiSchema,
          schema: applicantInfo.schema,
        },
        claimantInfo: {
          title: 'Claimant Information',
          path: 'claimant-information',
          uiSchema: claimantInfo.uiSchema,
          schema: claimantInfo.schema,
        },
        contactInfo: {
          title: 'Contact Information',
          path: 'contact-information',
          uiSchema: contactInfo.uiSchema,
          schema: contactInfo.schema,
        },
        mailingAddress: {
          title: 'Mailing Address',
          path: 'mailing-address',
          uiSchema: mailingAddress.uiSchema,
          schema: mailingAddress.schema,
        },
        reviewAddress: {
          title: 'Verify Address',
          path: 'verify-address',
          CustomPage: AddressVerificationPage,
          CustomPageReview: null,
          schema: {
            type: 'object',
            properties: {},
          },
          uiSchema: {},
        },
      },
    },
    serviceHistory: {
      title: 'Service History',
      pages: {
        servicePeriods: {
          title: 'Service Periods',
          path: 'service-periods',
          uiSchema: servicePeriods.uiSchema,
          schema: servicePeriods.schema,
        },
      },
    },
  },
};

export default formConfig;
