import FormFooter from 'platform/forms/components/FormFooter';
import preSubmitInfo from 'platform/forms/preSubmitInfo';

import prefillTransformer from './prefill-transformer';

import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';

// splitting pages into individual schemas for readability & consistency with current forms
import applicantInfo from './pages/applicantInfo';
import contactInfo from './pages/contactInfo';
import veteranIdentifyingInfo from './pages/veteranIdentifyingInfo';
import servicePeriods from './pages/servicePeriods';
import mailingAddress from './pages/mailingAddress';
import AddressVerificationPage from '../components/AddressVerificationPage';

import GetFormHelp from '../components/GetFormHelp';

import fullSchema from '../schema';
import manifest from '../manifest.json';

const formConfig = {
  rootUrl: manifest.rootUrl,
  urlPrefix: '/',
  submitUrl: 'http://localhost:3000/v0/21-2680/submit',
  trackingPrefix: 'aid-attendance-',

  formId: '21-2680',
  version: 0,
  title: 'Aid and Attendance Benefits Application',
  subTitle: 'Aid and Attendance Application (VA Form 21-2680)',

  prefillEnabled: true,
  prefillTransformer,
  preSubmitInfo,

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
    applicantInformationChapter: {
      title: 'Personal Information',
      pages: {
        applicantInformation: {
          title: 'Personal information',
          path: 'personal-information',
          uiSchema: applicantInfo.uiSchema,
          schema: applicantInfo.schema,
        },
        identifyingInformation: {
          title: 'Veteran personal information',
          path: 'identity-information',
          uiSchema: veteranIdentifyingInfo.uiSchema,
          schema: veteranIdentifyingInfo.schema,
        },
        phoneEmail: {
          title: 'Phone numbers and email address',
          path: 'contact-information',
          uiSchema: contactInfo.uiSchema,
          schema: contactInfo.schema,
        },
      },
    },
    serviceHistory: {
      title: 'Service History',
      pages: {
        servicePeriods: {
          title: 'Service periods',
          path: 'service-periods',
          uiSchema: servicePeriods.uiSchema,
          schema: servicePeriods.schema,
        },
      },
    },
    mailingAddressChapter: {
      title: 'Mailing Address',
      pages: {
        mailingAddress: {
          title: 'Mailing address',
          path: 'mailing-address',
          uiSchema: mailingAddress.uiSchema,
          schema: mailingAddress.schema,
        },
        reviewAddressSchemaless: {
          title: 'Verify mailing address',
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
  },
};

export default formConfig;
