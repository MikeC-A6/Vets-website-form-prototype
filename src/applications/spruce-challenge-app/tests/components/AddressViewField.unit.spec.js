import React from 'react';
import { render } from '@testing-library/react';
import { expect } from 'chai';
import AddressViewField from '../../components/AddressViewField';

describe('AddressViewField', () => {
  it('should render', () => {
    const address = {
      country: 'USA',
      street: '123 Main St',
      street2: 'Apt 4B',
      city: 'Anytown',
      state: 'NY',
      postalCode: '12345',
    };

    const { getByText } = render(<AddressViewField address={address} />);
    expect(getByText('USA')).to.exist;
    expect(getByText('123 Main St')).to.exist;
    expect(getByText('Apt 4B')).to.exist;
    expect(getByText('Anytown, NY 12345')).to.exist;
  });
});
