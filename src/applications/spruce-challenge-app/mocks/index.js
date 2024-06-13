/* eslint-disable camelcase */
const delay = require('mocker-api/lib/delay');
// const dateFns = require('date-fns');
const commonResponses = require('../../../platform/testing/local-dev-mock-api/common');
// const checkInData = require('./mocks/v2/check-in-data/index');

function requiredParams() {
  return ['AddressLine1', 'City', 'State', 'ZipCode'];
}

function verifyRequiredParams(params) {
  let verified = true;
  const missingParams = [];
  requiredParams().forEach(param => {
    if (!Object.keys(params).includes(param)) {
      verified = false;
      missingParams.push(param);
    }
  });
  return { verified, missingParams };
}

function handleErrorCases(params) {
  const errorCases = [
    '401-unauthorized',
    '403-forbidden',
    '404-not-found',
    '500-internal-server-error',
    '503-service-unavailable',
  ];

  let text = '';

  Object.values(params).forEach(v => {
    if (errorCases.includes(v.toLowerCase()) && text === '') {
      text = v;
    }
  });

  switch (text) {
    case '401-unauthorized':
      return { httpStatus: 401, errorMessage: 'Unauthorized' };
    case '403-forbidden':
      return { httpStatus: 403, errorMessage: 'Forbidden' };
    case '404-not-found':
      return { httpStatus: 404, errorMessage: 'Resource not found' };
    case '500-internal-server-error':
      return { httpStatus: 500, errorMessage: 'Internal Server Error' };
    case '503-service-unavailable':
      return { httpStatus: 503, errorMessage: 'Service Unavailable' };
    default:
      return { httpStatus: 0, errorMessage: null };
  }
}

const responses = {
  ...commonResponses,
  'PUT /v0/in_progress_forms/24-SPRUCE': (req, res) => {
    return res.json(req.body.formData);
  },
  'POST /check_in/v0/travel_claims/': (req, res) => {
    return res.json({ data: req.body });
  },
  'GET /vetsapi/verifyAddress': (req, res) => {
    const params = req.query;

    const { httpStatus, errorMessage } = handleErrorCases(params);

    if (httpStatus > 0) {
      return res.json({
        'Error Message': errorMessage,
        'Error Code': httpStatus.toString(),
      });
    }

    const { verified, missingParams } = verifyRequiredParams(params);
    if (!verified) {
      return res.json({
        'Error Message': `Missing required fields to verify address: ${missingParams.join(
          ', ',
        )}.`,
        'Error Code': '400',
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
      'Zip Code': suggestedResults.ZipCode,
    });
  },
};

module.exports = delay(responses, 500);
