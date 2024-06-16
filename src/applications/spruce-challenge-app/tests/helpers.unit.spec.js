import { expect } from 'chai';
import { formatReadableDate, mapAddress } from '../helpers';

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
      State: 'NY',
      ZipCode: '12345',
    });
  });
  it('should transform address from USPS mock service to form data shape', () => {
    const USPSVerifiedAddress = {
      AddressLine1: '123 MAIN ST',
      AddressLine2: 'APT 4B',
      City: 'ANYTOWN',
      State: 'NY',
      ZipCode: '12345',
    };

    const mappedAddress = mapAddress(USPSVerifiedAddress, false);

    expect(mappedAddress).to.deep.equal({
      street: '123 MAIN ST',
      street2: 'APT 4B',
      city: 'ANYTOWN',
      state: 'NY',
      postalCode: '12345',
    });
  });
});
