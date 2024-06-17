import { mockPrefillData } from './fixtures/mocks/mock-prefill-data';

/**
 * Setup for the e2e test, including any cleanup and mocking api responses
 * @param {object} cy
 */
export const setup = (cy, data) => {
  const dataType = data.type;

  cy.intercept(
    'GET',
    '/v0/in_progress_forms/24-SPRUCE',
    mockPrefillData[dataType],
  );

  cy.intercept('PUT', '/v0/in_progress_forms/24-SPRUCE', {
    data: {
      id: '10661',
      type: 'in_progress_forms',
      attributes: {
        formId: '24-SPRUCE',
        createdAt: '2024-06-13T00:00:00.000Z',
        updatedAt: '2024-06-13T00:00:00.000Z',
        metadata: {
          version: 1,
          returnUrl: '/review-and-submit',
          savedAt: 1593500000000,
          lastUpdated: 1593500000000,
          expiresAt: 99999999999,
          submission: {
            status: false,
            errorMessage: false,
            id: false,
            timestamp: false,
            hasAttemptedSubmit: false,
          },
          inProgressFormId: 1234,
        },
      },
    },
  });

  cy.intercept(
    'GET',
    '/vetsapi/verifyAddress?AddressLine1=123+MAIN+ST&AddressLine2=BEN+FRANKLIN+VILLAGE&City=SAN+DIEGO&State=CA&ZipCode=09028&Country=USA',
    {
      AddressLine1: '123 MAIN ST',
      AddressLine2: 'BEN FRANKLIN VILLAGE',
      City: 'SAN DIEGO',
      State: 'CA',
      ZipCode: '09028',
    },
  );

  cy.intercept('POST', '/v0/24-SPRUCE/submit', {
    data: {
      attributes: {
        guid: '123fake-submission-id-567',
      },
    },
  });
};

export const pageHooks = (cy, _toggles) => ({
  start: () => {
    // skip wizard
    cy.findByText(/apply now/i).click();
  },

  introduction: () => {
    cy.get('@testData').then(_data => {
      // Start form
      cy.findAllByText(/start the/i, { selector: 'a' })
        .first()
        .click();
    });
  },
});
