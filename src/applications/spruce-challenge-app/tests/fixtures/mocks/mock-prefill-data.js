const mockPrefillData = {
  minimal: {
    formData: {},
    metadata: {
      version: 0,
      prefill: true,
      returnUrl: '/applicant/name-information',
    },
  },
  all: {
    formData: {
      userFullName: {
        first: 'Mark',
        last: 'Tux',
      },
      dateOfBirth: '1950-10-04',
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
  },
  service: {
    formData: {
      userFullName: {
        first: 'Mark',
        last: 'Tux',
      },
      dateOfBirth: '1950-10-04',
      primaryPhone: '4445551212',
      emailAddress: 'test2@test1.net',
      mailingAddress: {},
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
  },
  address: {
    formData: {
      userFullName: {
        first: 'Mark',
        last: 'Tux',
      },
      dateOfBirth: '1950-10-04',
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
    },
    metadata: {
      version: 0,
      prefill: true,
      returnUrl: '/applicant/name-information',
    },
  },
};

export { mockPrefillData };
