/* eslint-disable camelcase */
const delay = require('mocker-api/lib/delay');
// const dateFns = require('date-fns');
const commonResponses = require('../../../platform/testing/local-dev-mock-api/common');
const { verifyRequiredParams, handleErrorCases } = require('./addressAPI');

const mockUser = require('./user');
const { minPrefillData } = require('./prefillData');
// const { maxPrefillData } = require('./prefillData');

const responses = {
  ...commonResponses,

  // overwriting common user response to allow prefill on our specific form
  // prefills_available: ['24-SPRUCE'],
  'GET /v0/user': mockUser,

  // check for in progress
  'OPTIONS /v0/in_progress_forms/24-SPRUCE': 'OK',
  'GET /v0/in_progress_forms/24-SPRUCE': {
    formData: {
      // actual prefill data goes here
      ...minPrefillData,
      // ...maxPrefillData
    },
    metadata: {
      version: 0,
      prefill: true,
      returnUrl: '/applicant/name-information',
    },
  },

  // submit form data
  'PUT /v0/in_progress_forms/24-SPRUCE': {
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
  },

  // successful form submission
  'POST /v0/24-SPRUCE/submit': {
    data: {
      attributes: {
        guid: '123fake-submission-id-567',
      },
    },
  },

  // mock address verification
  'GET /vetsapi/verifyAddress': (req, res) => {
    const params = req.query;

    const { httpStatus, errorMessage } = handleErrorCases(params);

    if (httpStatus > 0) {
      return res.json({
        errorMessage,
        errorCode: httpStatus.toString(),
      });
    }

    const { verified, missingParams } = verifyRequiredParams(params);
    if (!verified) {
      return res.json({
        errorMessage: `Missing required fields to verify address: ${missingParams.join(
          ', ',
        )}.`,
        errorCode: '400',
      });
    }

    const suggestedResults = {};
    Object.entries(params).forEach(e => {
      suggestedResults[e[0]] = e[1].toUpperCase();
    });

    return res.json({
      AddressLine1: suggestedResults.AddressLine1,
      AddressLine2: suggestedResults.AddressLine2,
      City: suggestedResults.City,
      State: suggestedResults.State,
      ZipCode: suggestedResults.ZipCode,
    });
  },
};

module.exports = delay(responses, 500);
