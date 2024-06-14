import formConfig from '../../../config/form';

export const getData = ({ loggedIn = true, data = {} } = {}) => ({
  props: {
    loggedIn,
    location: {
      basename: '/sc-base-url',
    },
    route: {
      formConfig,
      pageList: [
        { path: '/introduction' },
        { path: '/first-page', formConfig },
      ],
    },
  },
  mockStore: {
    getState: () => ({
      user: {
        login: {
          currentlyLoggedIn: loggedIn,
        },
        profile: {
          savedForms: [],
          prefillsAvailable: ['24-SPRUCE'],
          userFullName: {
            first: 'Peter',
            middle: 'B',
            last: 'Parker',
          },
        },
      },
      form: {
        formId: formConfig.formId,
        loadedStatus: 'success',
        savedStatus: '',
        loadedData: {
          metadata: {},
        },
        data,
      },
      scheduledDowntime: {
        globalDowntime: null,
        isReady: true,
        isPending: false,
        serviceMap: { get() {} },
        dismissedDowntimeWarnings: [],
      },
    }),
    subscribe: () => {},
    dispatch: () => {},
  },
});

export const userData = {
  userFullName: {
    first: 'Peter',
    middle: 'B',
    last: 'Parker',
  },
};
