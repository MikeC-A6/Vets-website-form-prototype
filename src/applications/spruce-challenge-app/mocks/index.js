/* eslint-disable camelcase */
const delay = require('mocker-api/lib/delay');
// const dateFns = require('date-fns');
const commonResponses = require('../../../platform/testing/local-dev-mock-api/common');
// const checkInData = require('./mocks/v2/check-in-data/index');

const responses = {
  ...commonResponses,
  'PUT /v0/in_progress_forms/24-SPRUCE': (req, res) => {
    return res.json(req.body.formData);
  },
  'POST /check_in/v0/travel_claims/': (req, res) => {
    return res.json({ data: req.body });
  },
};

module.exports = delay(responses, 500);
