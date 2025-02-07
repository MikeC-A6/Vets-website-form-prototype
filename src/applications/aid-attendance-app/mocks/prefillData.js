const minPrefillData = {
  userFullName: {
    first: 'Jane',
    last: 'Doe',
  },
  dateOfBirth: '1985-01-01',
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
      serviceBranch: 'Army',
      dateRange: {
        from: '2001-03-21',
        to: '2014-07-21',
      },
      rank: 'Corporal',
      duty: 'HHC 1ST BN',
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
      serviceBranch: 'Army',
      dateRange: {
        from: '2001-03-21',
        to: '2014-07-21',
      },
      rank: 'Corporal',
      duty: 'HHC 1ST BN',
    },
  ],
  userFullName: {
    first: 'Jane',
    last: 'Doe',
  },
  dateOfBirth: '1985-01-01',
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
  dateOfBirth: '1985-01-01',
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
      serviceBranch: 'Army',
      dateRange: {
        from: '2001-03-21',
        to: '2014-07-21',
      },
      rank: 'Corporal',
      duty: 'HHC 1ST BN',
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
      serviceBranch: 'Army',
      dateRange: {
        from: '2001-03-21',
        to: '2014-07-21',
      },
      rank: 'Corporal',
      duty: 'HHC 1ST BN',
    },
  ],
  userFullName: {
    first: 'Jane',
    last: 'Doe',
  },
  dateOfBirth: '1985-01-01',
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
