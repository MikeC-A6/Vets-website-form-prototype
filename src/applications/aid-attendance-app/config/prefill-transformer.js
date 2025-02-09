import { formFields } from '../constants';

// Transforms data from a user profile to prefill form fields.
export default function prefillTransformer(pages, formData, metadata) {
  const {
    userFullName = {},
    dateOfBirth = null,
    toursOfDuty = [],
    mailingAddress = {
      country: null,
      street: null,
      street2: null,
      city: null,
      state: null,
      postalCode: null,
    } || {},
    primaryPhone = null, // null because these are optional fields and
    emailAddress = null, // '' triggers validation on the value
  } = formData || {};

  const newFormData = {
    [formFields.userFullName]: userFullName,
    [formFields.dateOfBirth]: dateOfBirth,
    [formFields.toursOfDuty]: toursOfDuty,
    [formFields.viewMailingAddress]: {
      [formFields.address]: {
        country: mailingAddress?.country,
        street: mailingAddress?.AddressLine1,
        street2: mailingAddress?.AddressLine2,
        city: mailingAddress?.city,
        state: mailingAddress?.state,
        postalCode: mailingAddress?.zipCode,
      },
    },
    [formFields.viewPhoneNumbers]: {
      [formFields.phoneNumber]: primaryPhone,
    },
    [formFields.email]: emailAddress,
  };

  return {
    pages,
    formData: newFormData,
    metadata,
  };
}
