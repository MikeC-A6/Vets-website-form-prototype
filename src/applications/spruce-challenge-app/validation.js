import { isValidEmail } from 'platform/forms/validations';
import { formFields } from './constants';

const isValidPhone = (phone, isInternational) => {
  let stripped;
  try {
    stripped = phone.replace(/[^\d]/g, '');
  } catch (err) {
    stripped = phone;
  }
  return isInternational
    ? /^\d{10,15}$/.test(stripped)
    : /^\d{10}$/.test(stripped);
};

export const isValidPhoneField = phoneField => {
  const { isInternational } = phoneField;
  return isValidPhone(phoneField.phone, isInternational);
};

const validatePhone = (errors, phone, isInternational) => {
  if (phone && !isValidPhone(phone, isInternational)) {
    const numDigits = isInternational ? '10 to 15' : '10';
    errors.addError(
      `Please enter a ${numDigits}-digit phone number (with or without dashes)`,
    );
  }
};

export const validateHomePhone = (errors, phone, formData) => {
  const { isInternational } = formData[formFields.viewPhoneNumbers][
    formFields.phoneNumber
  ];

  validatePhone(errors, phone, isInternational);
};

export const validateMobilePhone = (errors, phone, formData) => {
  const { isInternational } = formData[formFields.viewPhoneNumbers][
    formFields.mobilePhoneNumber
  ];
  validatePhone(errors, phone, isInternational);
};

export const validateEmail = (errors, email) => {
  if (email && !isValidEmail(email)) {
    errors.addError('Please enter a valid email address.');
  }
};

export const isDateWithinTenYearsOfToday = (errors, date) => {
  const today = new Date();

  // convert field data to a date object for math
  const diff = Math.abs(today - new Date(date.replace(/-/g, '/')));

  // years * days * hours * minutes * seconds * milliseconds
  const tenYears = 10 * 365 * 24 * 60 * 60 * 1000;

  if (diff < tenYears) {
    errors.addError(
      'This birth date is too soon for you to have been discharged from the military. Please enter a valid birth date.',
    );
  }
};
