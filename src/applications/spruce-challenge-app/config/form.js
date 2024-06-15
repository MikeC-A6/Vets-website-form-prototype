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
import formAddress from './pages/reviewAddress';

import { ReviewAddress } from '../components/ReviewAddress';
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
      title: 'Personal information',
      pages: {
        applicantInformation: {
          title: 'Personal information',
          path: 'applicant/name-information',
          subTitle: 'Personal information',
          instructions:
            'This is the personal information we have on file for you.',
          uiSchema: applicantInfo.uiSchema,
          schema: applicantInfo.schema,
        },
        identifyingInformation: {
          title: 'Veteran personal information',
          path: 'identifying-information',
          uiSchema: veteranIdentifyingInfo.uiSchema,
          schema: veteranIdentifyingInfo.schema,
        },
        phoneEmail: {
          title: 'Phone numbers and email address',
          path: 'applicant/contact-information',
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
          path: 'military-history/service-periods',
          uiSchema: servicePeriods.uiSchema,
          schema: servicePeriods.schema,
        },
      },
    },
    frameSelectionChapter: {
      title: 'Frame Type',
      pages: {
        frameOptions: {
          title: 'DD-217 Discharge Certificate Complementary Frame Options',
          path: 'frame-options',
          subTitle: 'Type of wood and display style',
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
          path: 'shipping-information/mailing-address',
          uiSchema: mailingAddress.uiSchema,
          schema: mailingAddress.schema,
        },
        reviewAddress: {
          title: 'Review Address',
          path: 'shipping-information/review-address',
          uiSchema: {
            'ui:description': ReviewAddress,
            saveAddress: formAddress.uiSchema.saveAddress,
            receiveAtAddress: formAddress.uiSchema.receiveAtAddress,
          },
          schema: formAddress.schema,
        },
      },
    },
  },
};

export default formConfig;
