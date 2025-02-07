import React from 'react';
import { render } from '@testing-library/react';
import { expect } from 'chai';
import GetFormHelp from '../../components/GetFormHelp';

describe('GetFormHelp', () => {
  it('should render', () => {
    const { getByText } = render(<GetFormHelp />);
    expect(
      getByText(
        /If you have technical difficulties using this online application, call our MyVA411 main information line at/,
      ),
    ).to.exist;
    expect(getByText(/We're here 24\/7./)).to.exist;
  });
});
