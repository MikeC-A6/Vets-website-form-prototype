import FormFooter from 'platform/forms/components/FormFooter';
import preSubmitInfo from 'platform/forms/preSubmitInfo';

import prefillTransformer from './prefill-transformer';

import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';

// splitting pages into individual schemas for readability & consistency with current forms

import claimantInfo from '../pages/claimantInfo';
import veteranIdentifyingInfo from '../pages/veteranIdentifyingInfo';
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
        veteranIdentifyingInfo: {
          title: 'Veteran Information',
          path: 'veteran-information',
          uiSchema: veteranIdentifyingInfo.uiSchema,
          schema: veteranIdentifyingInfo.schema,
        },
        claimantInfo: {
          title: 'Claimant Information',
          path: 'claimant-information',
          uiSchema: claimantInfo.uiSchema,
          schema: claimantInfo.schema,
        },
      },  
      uiSchema: {},
    },
  },
};

export default formConfig;
