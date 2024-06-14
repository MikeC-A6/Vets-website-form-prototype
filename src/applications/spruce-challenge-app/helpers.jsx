import { formFields } from './constants';

export function isAlphaNumeric(str) {
  const alphaNumericRegEx = new RegExp(/^[a-z0-9]+$/i);
  return alphaNumericRegEx.test(str);
}

export function isOnlyWhitespace(str) {
  return str && !str.trim().length;
}

export function titleCase(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

export const addWhitespaceOnlyError = (field, errors, errorMessage) => {
  if (isOnlyWhitespace(field)) {
    errors.addError(errorMessage);
  }
};

/**
 * Formats a date in human-readable form. For example:
 * January 1, 2000.
 *
 * @param {*} rawDate A date in the form '2000-12-31' (December 31, 2000)
 * @returns A human-readable date string.
 */
export const formatReadableDate = rawDate => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  let dateParts;
  let date;

  if (rawDate) {
    dateParts = rawDate.split('-');
    date = new Date(
      Number.parseInt(dateParts[0], 10),
      Number.parseInt(dateParts[1], 10) - 1,
      Number.parseInt(dateParts[2], 10),
    );
  }

  if (!date || Number.isNaN(date.getDate())) {
    return '';
  }

  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

export function prefillTransformer(pages, formData, metadata, state) {
  const vaProfile = state.user.profile;

  // For reference, I _think_ the vapContactInfo has the follow form:
  // const vapContactInfo = {
  //   email: {
  //     emailAddress: 'hey@test.com',
  //   },
  //   mobilePhone: {
  //     countryCode: '+1',
  //     areaCode: '222',
  //     phoneNumber: '333',
  //     extension: '4444',
  //   },
  //   address: {
  //     addressLine1: '123 Maine Street',
  //     addressLine2: 'Floor 1',
  //     addressLine3: 'Suite 1000',
  //     city: 'Washington',
  //     province: '',
  //     stateCode: 'DC',
  //     countryCodeIso3: 'USA',
  //     zipCode: '22222',
  //     internationalPostalCode: '',
  //   },
  // };
  const vapContactInfo = vaProfile?.vapContactInfo;

  const vapAddress = vapContactInfo?.address;
  const vapMobilePhone = vapContactInfo?.mobilePhone;
  const vapMobilePhoneCountryCode = parseInt(vapMobilePhone?.countryCode, 10);

  const transformedData = {
    ...formData,
    [formFields.email]: {
      ...formData[formFields.email],
      [formFields.email]:
        vaProfile?.email || vapContactInfo?.email?.emailAddress,
      [formFields.confirmEmail]:
        vaProfile?.email || vapContactInfo?.email?.emailAddress,
    },
    [formFields.viewMailingAddress]: {
      ...formData[formFields.viewMailingAddress],
      [formFields.address]: {
        country: vapAddress?.countryCodeIso3,
        street: vapAddress?.addressLine1,
        street2: vapAddress?.addressLine2,
        street3: vapAddress?.addressLine3,
        city: vapAddress?.city,
        state: vapAddress?.stateCode,
        postalCode: vapAddress?.zipCode
          ? vapAddress?.zipCode
          : vapAddress?.internationalPostalCode,
      },
    },
    [formFields.viewPhoneNumbers]: {
      ...formData[formFields.viewPhoneNumbers],
      [formFields.mobilePhoneNumber]: {
        phone: [
          vapMobilePhoneCountryCode !== 1 ? vapMobilePhoneCountryCode : '',
          vapMobilePhone?.areaCode,
          vapMobilePhone?.phoneNumber,
          vapMobilePhone?.extension,
        ].join(''),
        isInternational: vapMobilePhoneCountryCode !== 1,
      },
    },
  };

  return {
    metadata,
    formData: transformedData,
    pages,
    state,
  };
}
