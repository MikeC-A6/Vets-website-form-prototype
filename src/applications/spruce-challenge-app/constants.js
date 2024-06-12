import PropTypes from 'prop-types';

export const YOUR_PROFILE_URL = '/profile';

export const RELATIONSHIP = {
  CHILD: 'Child',
  SPOUSE: 'Spouse',
};

export const VETERANS_TYPE = PropTypes.arrayOf(
  PropTypes.shape({
    dateOfBirth: PropTypes.string,
    deaEligibility: PropTypes.bool,
    deaStartDate: PropTypes.string,
    fryEligibility: PropTypes.bool,
    fryStartDate: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    relationship: PropTypes.string,
  }),
);

export const WOOD_CHOICES = ['Cedar', 'Cypress', 'Pine', 'Walnut'];

export const MOUNT_CHOICES = ['Wall mount', 'Table top'];

export const formFields = {
  accountNumber: 'accountNumber',
  accountType: 'accountType',
  additionalConsiderations: {
    marriageDate: 'marriageDate',
    marriageInformation: 'marriageInformation',
    outstandingFelony: 'outstandingFelony',
    remarriage: 'remarriage',
    remarriageDate: 'remarriageDate',
  },
  address: 'address',
  bankAccount: 'bankAccount',
  benefitSelection: 'benefitSelection',
  contactMethod: 'contactMethod',
  confirmEmail: 'confirmEmail',
  dateOfBirth: 'dateOfBirth',
  dateOfDeath: 'dateOfDeath',
  departmentOfDefenseID: 'departmentOfDefenseID',
  dischargeDate: 'dischargeDate',
  email: 'email',
  frameWood: 'frameWood',
  frameMount: 'frameMount',
  fullName: 'fullName',
  highSchoolDiploma: 'highSchoolDiploma',
  highSchoolDiplomaDate: 'highSchoolDiplomaDate',
  mobilePhoneNumber: 'mobilePhoneNumber',
  phoneNumber: 'phoneNumber',
  phoneNumberInternational: 'phoneNumberInternational',
  relationshipToVeteran: 'relationshipToVeteran',
  receiveTextMessages: 'receiveTextMessages',
  routingNumber: 'routingNumber',
  selectedVeteran: 'selectedVeteran',
  socialSecurityNumber: 'socialSecurityNumber',
  veteranDateOfBirth: 'veteranDateOfBirth',
  veteranFullName: 'veteranFullName',
  userFullName: 'userFullName',
  viewMailingAddress: 'view:mailingAddress',
  viewPhoneNumbers: 'view:phoneNumbers',
  viewReceiveTextMessages: 'view:receiveTextMessages',
};
