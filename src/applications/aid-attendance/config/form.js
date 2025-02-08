import FormFooter from 'platform/forms/components/FormFooter';
// import preSubmitInfo from 'platform/forms/preSubmitInfo';

import prefillTransformer from './prefill-transformer';

import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';

// splitting pages into individual schemas for readability & consistency with current forms
import applicantInfo from '../pages/applicantInfo';
import contactInfo from '../pages/contactInfo';
import claimantInfo from '../pages/claimantInfo';
import mailingAddress from '../pages/mailingAddress';
import servicePeriods from '../pages/servicePeriods';
import AddressVerificationPage from '../components/AddressVerificationPage';

import GetFormHelp from '../components/GetFormHelp';

import fullSchema from '../schema';
// import manifest from '../manifest.json';

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


// // In a real ap this would not be imported directly; instead the schema you
// // imported above would import and use these common definitions:
// import commonDefinitions from 'vets-json-schema/dist/definitions.json';

// // Example of an imported schema:
// import fullSchema from '../21-2680-schema.json';
// // In a real app this would be imported from `vets-json-schema`:
// // import fullSchema from 'vets-json-schema/dist/21-2680-schema.json';

// import fullNameUI from 'platform/forms-system/src/js/definitions/fullName';
// import ssnUI from 'platform/forms-system/src/js/definitions/ssn';
// import phoneUI from 'platform/forms-system/src/js/definitions/phone';
// import * as address from 'platform/forms-system/src/js/definitions/address';

// // import fullSchema from 'vets-json-schema/dist/21-2680-schema.json';

// import manifest from '../manifest.json';

// import IntroductionPage from '../containers/IntroductionPage';
// import ConfirmationPage from '../containers/ConfirmationPage';

// // const { } = fullSchema.properties;

// // const { } = fullSchema.definitions;

// // pages
// import directDeposit from '../pages/directDeposit';
// import serviceHistory from '../pages/serviceHistory';

// const { fullName, ssn, date, dateRange, usaPhone } = commonDefinitions;

// const formConfig = {
//   rootUrl: manifest.rootUrl,
//   urlPrefix: '/',
//   // submitUrl: '/v0/api',
//   submit: () =>
//     Promise.resolve({ attributes: { confirmationNumber: '123123123' } }),
//   trackingPrefix: 'aid-attendance-',
//   introduction: IntroductionPage,
//   confirmation: ConfirmationPage,
//   formId: '21-2680',
//   saveInProgress: {
//     // messages: {
//     //   inProgress: 'Your EXAMINATION FOR HOUSEBOUND STATUS OR PERMANENT NEED  FOR REGULAR AID AND ATTENDANCE application (21-2680) is in progress.',
//     //   expired: 'Your saved EXAMINATION FOR HOUSEBOUND STATUS OR PERMANENT NEED  FOR REGULAR AID AND ATTENDANCE application (21-2680) has expired. If you want to apply for EXAMINATION FOR HOUSEBOUND STATUS OR PERMANENT NEED  FOR REGULAR AID AND ATTENDANCE, please start a new application.',
//     //   saved: 'Your EXAMINATION FOR HOUSEBOUND STATUS OR PERMANENT NEED  FOR REGULAR AID AND ATTENDANCE application has been saved.',
//     // },
//   },
//   version: 0,
//   prefillEnabled: true,
//   savedFormMessages: {
//     notFound:
//       'Please start over to apply for EXAMINATION FOR HOUSEBOUND STATUS OR PERMANENT NEED  FOR REGULAR AID AND ATTENDANCE.',
//     noAuth:
//       'Please sign in again to continue your application for EXAMINATION FOR HOUSEBOUND STATUS OR PERMANENT NEED  FOR REGULAR AID AND ATTENDANCE.',
//   },
//   title: 'Complex Form',
//   defaultDefinitions: {
//     fullName,
//     ssn,
//     date,
//     dateRange,
//     usaPhone,
//   },
//   chapters: {
//     applicantInformationChapter: {
//       title: 'Applicant Information',
//       pages: {
//         applicantInformation: {
//           path: 'applicant-information',
//           title: 'Applicant Information',
//           uiSchema: {
//             fullName: fullNameUI,
//             ssn: ssnUI,
//           },
//           schema: {
//             type: 'object',
//             required: ['fullName'],
//             properties: {
//               fullName,
//               ssn,
//             },
//           },
//         },
//       },
//     },
//     serviceHistoryChapter: {
//       title: 'Service History',
//       pages: {
//         serviceHistory: {
//           path: 'service-history',
//           title: 'Service History',
//           uiSchema: serviceHistory.uiSchema,
//           schema: serviceHistory.schema,
//         },
//       },
//     },
//     additionalInformationChapter: {
//       title: 'Additional Information',
//       pages: {
//         contactInformation: {
//           path: 'contact-information',
//           title: 'Contact Information',
//           uiSchema: {
//             address: address.uiSchema('Mailing address'),
//             email: {
//               'ui:title': 'Primary email',
//             },
//             altEmail: {
//               'ui:title': 'Secondary email',
//             },
//             phoneNumber: phoneUI('Daytime phone'),
//           },
//           schema: {
//             type: 'object',
//             properties: {
//               address: address.schema(fullSchema, true),
//               email: {
//                 type: 'string',
//                 format: 'email',
//               },
//               altEmail: {
//                 type: 'string',
//                 format: 'email',
//               },
//               phoneNumber: usaPhone,
//             },
//           },
//         },
//         directDeposit: {
//           path: 'direct-deposit',
//           title: 'Direct Deposit',
//           uiSchema: directDeposit.uiSchema,
//           schema: directDeposit.schema,
//         },
//       },
//     },
//   },
// };

// export default formConfig;
