import React from 'react';
import { render } from '@testing-library/react';
import { expect } from 'chai';
import { ReviewAddress } from '../../components/ReviewAddress';

describe('ReviewAddress', () => {
  const mockAddress = {
    'view:mailingAddress': {
      mailingAddress: {
        street: '123 Main St',
        street2: 'Apt 4B',
        city: 'Anytown',
        state: 'NY',
        postalCode: '12345',
      },
    },
  };

  it('should render', () => {
    const { getByText } = render(<ReviewAddress formData={mockAddress} />);
    expect(getByText('123 Main St')).to.exist;
    expect(getByText('Apt 4B')).to.exist;
    expect(getByText('Anytown, NY 12345')).to.exist;
  });
});
