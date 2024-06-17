import { formFields } from './constants';

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

/**
 * Returns a boolean whether to hide a conditional inline alert
 *
 * @param {*} form Form field data
 * @returns boolean
 */
export const missingServicePeriodRank = form => {
  const periods = form[formFields.toursOfDuty];

  if (periods) {
    const periodsWithMissingRank = periods.filter(p => p.rank === undefined);
    return periodsWithMissingRank.length === 0;
  }

  return true;
};

// this should be iterated to check against all entered periods not just the first two...
function checkDateRangeOverlap(ranges) {
  // Returns true if
  // Start Date 1 < End Date 2 && Start Date 2 < End Date 1
  return (
    Date.parse(ranges[0].from) <= Date.parse(ranges[1].to) &&
    Date.parse(ranges[1].from) <= Date.parse(ranges[0].to)
  );
}

/**
 * Returns a boolean whether to hide a conditional inline alert
 *
 * @param {*} form Form field data
 * @returns boolean
 */
export const overlappingServicePeriodDates = form => {
  const periods = form[formFields.toursOfDuty];

  if (periods) {
    // if there are less than 2 periods, or the second period isn't filled out yet, hide alert
    if (
      periods.length < 2 &&
      periods[1]?.dateRange.from === undefined &&
      periods[1]?.dateRange.to === undefined
    )
      return true;

    // get all entered date ranges
    const dateRanges = periods.map(p => {
      return p.dateRange;
    });

    return !checkDateRangeOverlap(dateRanges);
  }

  return true;
};

// Adjust form data into shape that validation API expects and vice versa
export const mapAddress = (address, toUSPS = true) => {
  const mappedAddress = {};

  if (toUSPS) {
    if (address.street) mappedAddress.AddressLine1 = address.street;
    if (address.street2) mappedAddress.AddressLine2 = address.street2;
    if (address.city) mappedAddress.City = address.city;
    if (address.state) mappedAddress.State = address.state;
    if (address.postalCode) mappedAddress.ZipCode = address.postalCode;
    if (address.country) mappedAddress.Country = address.country;
    // mappedAddress = {
    //   AddressLine1: address.street,
    //   AddressLine2: address.street2,
    //   City: address.city,
    //   State: address.state,
    //   ZipCode: address.postalCode,
    // };
  } else {
    if (address.AddressLine1) mappedAddress.street = address.AddressLine1;
    if (address.AddressLine2) mappedAddress.street2 = address.AddressLine2;
    if (address.City) mappedAddress.city = address.City;
    if (address.State) mappedAddress.state = address.State;
    if (address.ZipCode) mappedAddress.postalCode = address.ZipCode;
    if (address.Country) mappedAddress.country = address.Country;
    // mappedAddress = {
    //   street: address.AddressLine1,
    //   street2: address.AddressLine2,
    //   city: address.City,
    //   state: address.State,
    //   postalCode: address.ZipCode,
    // };
  }

  return mappedAddress;
};

export const formatAddressString = address => {
  let string = '';
  if (address.street) string += `${address.street} \n`;
  if (address.street2) string += `${address.street2} \n`;
  if (address.city)
    string += `${address.city}, ${address.state} ${address.postalCode} \n`;
  if (address.country) string += `${address.country}`;
  return string;
};
