import React from 'react';
import { render } from '@testing-library/react';
import { expect } from 'chai';
import MailingAddressViewField from '../../components/MailingAddressViewField';

describe('MailingAddressViewField', () => {
  it('should render', () => {
    const mockFormData = {
      address: {
        country: 'USA',
        street: '123 Main St',
        street2: 'Apt 4B',
        city: 'Anytown',
        state: 'NY',
        postalCode: '12345',
      },
    };

    const { getByText } = render(
      <MailingAddressViewField formData={mockFormData} />,
    );
    expect(getByText('USA')).to.exist;
    expect(getByText('123 Main St Apt 4B')).to.exist;
    expect(getByText('Anytown, NY 12345')).to.exist;
  });
});
