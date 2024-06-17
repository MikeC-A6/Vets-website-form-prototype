import { expect } from 'chai';
import {
  formatReadableDate,
  mapAddress,
  formatAddressString,
} from '../helpers';

describe('formatReadableDate', () => {
  it('should transform a raw date string to a human readable string', () => {
    const rawDate = '2000-12-31';
    const formatted = formatReadableDate(rawDate);

    expect(formatted).to.eq('December 31, 2000');
  });

  it('should return an empty string with an invalid date provided', () => {
    const rawDate = '2000/12/31';
    const formatted = formatReadableDate(rawDate);

    expect(formatted).to.eq('');
  });
});

describe('mapAddress', () => {
  it('should transform address saved in form to shape expected by USPS mock verification service', () => {
    const formAddress = {
      country: 'USA',
      street: '123 Main St',
      street2: 'Apt 4B',
      city: 'Anytown',
      state: 'NY',
      postalCode: '12345',
    };

    const mappedAddress = mapAddress(formAddress);

    expect(mappedAddress).to.deep.equal({
      AddressLine1: '123 Main St',
      AddressLine2: 'Apt 4B',
      City: 'Anytown',
      Country: 'USA',
      State: 'NY',
      ZipCode: '12345',
    });
  });
  it('should transform address from USPS mock service to form data shape', () => {
    const USPSVerifiedAddress = {
      AddressLine1: '123 MAIN ST',
      AddressLine2: 'APT 4B',
      City: 'ANYTOWN',
      Country: 'USA',
      State: 'NY',
      ZipCode: '12345',
    };

    const mappedAddress = mapAddress(USPSVerifiedAddress, false);

    expect(mappedAddress).to.deep.equal({
      street: '123 MAIN ST',
      street2: 'APT 4B',
      city: 'ANYTOWN',
      country: 'USA',
      state: 'NY',
      postalCode: '12345',
    });
  });
});

describe('formatAddressString', () => {
  it('should format an address object into a single string with newlines for display', () => {
    const formAddress = {
      country: 'USA',
      street: '123 Main St',
      street2: 'Apt 4B',
      city: 'Anytown',
      state: 'NY',
      postalCode: '12345',
    };

    const formatted = formatAddressString(formAddress);
    expect(formatted).to.equal(
      '123 Main St \nApt 4B \nAnytown, NY 12345 \nUSA',
    );
  });
});
