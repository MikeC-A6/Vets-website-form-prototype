/**
 * Setup for the e2e test, including any cleanup and mocking api responses
 * @param {object} cy
 */
export const setup = cy => {
  cy.intercept('GET', '/v0/in_progress_forms/24-SPRUCE', {
    formData: {
      // actual prefill data goes here
      userFullName: {
        first: 'Mark',
        last: 'Tux',
      },
      primaryPhone: '4445551212',
      emailAddress: 'test2@test1.net',
      mailingAddress: {
        country: 'USA',
        city: 'SAN DIEGO',
        state: 'CA',
        zipCode: '09028',
        AddressLine1: '123 MAIN ST',
        AddressLine2: 'BEN FRANKLIN VILLAGE',
      },
      toursOfDuty: [
        {
          serviceBranch: 'Air Force',
          dateRange: {
            from: '2001-03-21',
            to: '2014-07-21',
          },
        },
      ],
    },
    metadata: {
      version: 0,
      prefill: true,
      returnUrl: '/applicant/name-information',
    },
  });

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
    '/vetsapi/verifyAddress?AddressLine1=123+MAIN+ST&AddressLine2=BEN+FRANKLIN+VILLAGE&City=SAN+DIEGO&State=CA&ZipCode=09028',
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
