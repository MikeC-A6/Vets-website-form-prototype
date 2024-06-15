const minPrefillData = {
  mailingAddress: {
    country: 'USA',
    city: 'SAN DIEGO',
    state: 'CA',
    zipCode: '09028',
    addressLine1: '123 MAIN ST',
    addressLine2: 'BEN FRANKLIN VILLAGE',
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
};

const minTransformedPrefillData = {
  'view:mailingAddress': {
    mailingAddress: {
      country: 'USA',
      city: 'SAN DIEGO',
      state: 'CA',
      postalCode: '09028',
      street: '123 MAIN ST',
      street2: 'BEN FRANKLIN VILLAGE',
    },
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
  userFullName: {},
  email: null,
  'view:phoneNumbers': {
    phoneNumber: null,
  },
};

const maxPrefillData = {
  userFullName: {
    first: 'Jane',
    last: 'Doe',
  },
  primaryPhone: '4445551212',
  emailAddress: 'test2@test1.net',
  mailingAddress: {
    country: 'USA',
    city: 'SAN DIEGO',
    state: 'CA',
    zipCode: '09028',
    addressLine1: '123 MAIN ST',
    addressLine2: 'BEN FRANKLIN VILLAGE',
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
};

const maxTransformedPrefillData = {
  'view:mailingAddress': {
    mailingAddress: {
      country: 'USA',
      city: 'SAN DIEGO',
      state: 'CA',
      postalCode: '09028',
      street: '123 MAIN ST',
      street2: 'BEN FRANKLIN VILLAGE',
    },
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
  userFullName: {
    first: 'Jane',
    last: 'Doe',
  },
  email: 'test2@test1.net',
  'view:phoneNumbers': {
    phoneNumber: '4445551212',
  },
};

module.exports = {
  minPrefillData,
  minTransformedPrefillData,
  maxPrefillData,
  maxTransformedPrefillData,
};
