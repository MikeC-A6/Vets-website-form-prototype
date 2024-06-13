import FormFooter from 'platform/forms/components/FormFooter';

import manifest from '../manifest.json';

import { prefillTransformer } from '../helpers';

import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';

// splitting pages into individual schemas for readability & consistency with current forms
import applicantInfo from './pages/applicantInfo';
import contactInfo from './pages/contactInfo';
import veteranIdentifyingInfo from './pages/veteranIdentifyingInfo';
import servicePeriods from './pages/servicePeriods';
import framePreferences from './pages/framePreferences';
import mailingAddress from './pages/mailingAddress';
import formAddress, { ReviewAddress } from './pages/reviewAddress';

import GetFormHelp from '../components/GetFormHelp';
import PreSubmitInfo from '../components/PreSubmitInfo';

// for a real form, this would likely come from vets-json-schema.
// for the purposes of this challenge, ours is located at the root of our app
import fullSchema from '../schema';

const formConfig = {
  rootUrl: manifest.rootUrl,
  urlPrefix: '/',
  submitUrl: 'http://localhost:3000/v0/24-SPRUCE/submit', // endpoint mocked in ../mocks/index.js
  trackingPrefix: 'spruce-challenge-app-',

  formId: '24-SPRUCE',
  version: 0,
  title: 'Apply for your DD-217 discharge certificate frame',
  subTitle: 'VA Form 24-SPRUCE (Order a DD-217 discharge certificate frame)',

  prefillEnabled: true,
  prefillTransformer,
  preSubmitInfo: PreSubmitInfo,

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

  v3SegmentedProgressBar: true,

  defaultDefinitions: {
    ...fullSchema.definitions,
  },

  chapters: {
    applicantInformationChapter: {
      title: 'Biographical information',
      pages: {
        applicantInformation: {
          title: 'Biographical information',
          path: 'applicant/name-information',
          subTitle: 'Biographical information',
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
      title: 'Complementary Frame',
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
            receiveAtAddress: formAddress.uiSchema.receiveAtAddress,
            saveAddress: formAddress.uiSchema.saveAddress,
          },
          schema: formAddress.schema,
        },
      },
    },
  },
};

export default formConfig;
