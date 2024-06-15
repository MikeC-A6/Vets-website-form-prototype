/* ADDRESS VALIDATION FUNCTIONS */
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

module.exports = { verifyRequiredParams, handleErrorCases };
