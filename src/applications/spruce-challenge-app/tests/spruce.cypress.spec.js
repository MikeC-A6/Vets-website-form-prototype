import path from 'path';

import testForm from 'platform/testing/e2e/cypress/support/form-tester';
import { createTestConfig } from 'platform/testing/e2e/cypress/support/form-tester/utilities';

import mockUser from './fixtures/mocks/user.json';

import formConfig from '../config/form';
import manifest from '../manifest.json';
import { setup, pageHooks } from './cypress.helpers';

const testConfig = createTestConfig(
  {
    dataPrefix: 'data',
    useWebComponentFields: true,

    dataSets: [
      // no prefill at all - fill out the entire form
      'minimal-test',
      // #118: scenario 1 - no address prefill
      'service-prefill-test',
      // #119: scenario 2 - no service history prefill
      'address-prefill-test',
      // #120: scenario 3 - all prefilled
      'all-prefill-test',
    ],

    fixtures: {
      data: path.join(__dirname, 'fixtures', 'data'),
    },

    pageHooks: pageHooks(cy),
    setupPerTest: data => {
      cy.login(mockUser);
      setup(cy, data);
    },

    // skip: [],
  },
  manifest,
  formConfig,
);

testForm(testConfig);
