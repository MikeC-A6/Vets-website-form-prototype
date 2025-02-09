import { expect } from 'chai';
import React from 'react';
import { render } from '@testing-library/react';
import CallPharmacyPhone from '../../../components/shared/CallPharmacyPhone';
import { DD_ACTIONS_PAGE_TYPE } from '../../../util/constants';

describe('component that displayes pharmacy phone number', () => {
  const phoneNumber = '3538675309';
  const setup = () => {
    return render(
      <CallPharmacyPhone
        phone={phoneNumber}
        page={DD_ACTIONS_PAGE_TYPE.DETAILS}
      />,
    );
  };

  it('renders without errors', () => {
    const screen = setup();
    expect(screen);
  });

  it('displays phone number', () => {
    const screen = setup();
    const firsListItem = screen.findByText('353-867-5309.');
    expect(firsListItem).to.exist;
  });
});
