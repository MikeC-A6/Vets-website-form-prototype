import React from 'react';

export default function MailingAddressViewField({ formData }) {
  const {
    country,
    street,
    street2,
    city,
    state,
    postalCode,
  } = formData.address;
  return (
    <>
      <span>{country}</span>
      <br />
      <span>
        {street} {street2 && `${street2}`}
      </span>
      <br />
      <span>
        {city}, {state} {postalCode}
      </span>
    </>
  );
}
