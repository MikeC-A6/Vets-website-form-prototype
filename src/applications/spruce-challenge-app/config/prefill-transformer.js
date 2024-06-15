import { formFields } from '../constants';

// Transforms data from a user profile to prefill form fields.
export default function prefillTransformer(pages, formData, metadata) {
  const {
    userFullName = {},
    toursOfDuty = [],
    mailingAddress = {
      country: null,
      street: null,
      street2: null,
      city: null,
      state: null,
      postalCode: null,
    },
    primaryPhone = null, // null because these are optional fields and
    emailAddress = null, // '' triggers validation on the value
  } = formData || {};

  const newFormData = {
    [formFields.userFullName]: userFullName,
    [formFields.toursOfDuty]: toursOfDuty,
    [formFields.viewMailingAddress]: {
      [formFields.address]: {
        country: mailingAddress.country,
        street: mailingAddress.addressLine1,
        street2: mailingAddress.addressLine2,
        city: mailingAddress.city,
        state: mailingAddress.state,
        postalCode: mailingAddress.zipCode,
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
