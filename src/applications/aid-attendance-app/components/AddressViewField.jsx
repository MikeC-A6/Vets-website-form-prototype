import React from 'react';

export default function MailingAddressViewField({ address }) {
  const { country, street, street2, city, state, postalCode } = address;
  return (
    <>
      {street && (
        <>
          <span>{street}</span>
          <br />
        </>
      )}
      {street2 && (
        <>
          <span>{street2}</span>
          <br />
        </>
      )}
      {city && (
        <>
          <span>
            {city}, {state} {postalCode}
          </span>
          <br />
        </>
      )}
      {country && (
        <>
          <span>{country}</span>
          <br />
        </>
      )}
    </>
  );
}
