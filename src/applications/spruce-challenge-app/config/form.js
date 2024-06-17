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
import framePreferences from './pages/framePreferences';
import mailingAddress from './pages/mailingAddress';
import AddressVerificationPage from '../components/AddressVerificationPage';

import GetFormHelp from '../components/GetFormHelp';

// for a real form, this would likely come from vets-json-schema.
// for the purposes of this challenge, ours is located at the root of our app
import fullSchema from '../schema';

import manifest from '../manifest.json';

const formConfig = {
  rootUrl: manifest.rootUrl,
  urlPrefix: '/',
  submitUrl: 'http://localhost:3000/v0/24-SPRUCE/submit', // endpoint mocked in ../mocks/index.js
  trackingPrefix: 'spruce-challenge-app-',

  formId: '24-SPRUCE',
  version: 0,
  title: 'Apply for a frame to display your DD-217 certificate',
  subTitle: 'Free frame application (VA Form 24-SPRUCE)',

  prefillEnabled: true,
  prefillTransformer,
  preSubmitInfo,

  downtime: {
    requiredForPrefill: true,
  },

  savedFormMessages: {
    notFound: 'Please start over to request your DD-217 frame.',
    noAuth: 'Please sign in again to continue your application.',
  },
  saveInProgress: {
    messages: {
      inProgress:
        'Your discharge certificate frame request (24-SPRUCE) is in progress.',
      expired:
        'Your saved discharge certificate frame request (24-SPRUCE) has expired. If you want to apply for a complimentary frame, please start a new application.',
      saved: 'Your discharge certificate frame reques has been saved.',
    },
  },

  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  footerContent: FormFooter,
  getHelp: GetFormHelp,

  // Fix double headers (only show v3)
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
    frameSelectionChapter: {
      title: 'Frame Type',
      pages: {
        frameOptions: {
          title: 'Frame selection',
          path: 'choose-frame-type',
          uiSchema: framePreferences.uiSchema,
          schema: framePreferences.schema,
        },
      },
    },
    shippingAddressChapter: {
      title: 'Mailing Address',
      pages: {
        mailingAddress: {
          title: 'Mailing address',
          path: 'where-to-ship-frame',
          uiSchema: mailingAddress.uiSchema,
          schema: mailingAddress.schema,
        },
        reviewAddressSchemaless: {
          title: 'Verify mailing address',
          path: 'verify-address',
          CustomPage: AddressVerificationPage,
          CustomPageReview: null,
          // This does still need to be here or it'll throw an error
          schema: {
            type: 'object',
            // props available to page via data
            // can be empty
            properties: {},
          },
          uiSchema: {},
        },
      },
    },
  },
};

export default formConfig;
