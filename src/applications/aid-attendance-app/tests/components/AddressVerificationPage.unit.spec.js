import React from 'react';
import { render } from '@testing-library/react';
import { expect } from 'chai';
import sinon from 'sinon';
import {
  AddressVerificationPage,
  verifyAddress,
  onAddressChange,
} from '../../components/AddressVerificationPage';
import { mapAddress } from '../../helpers';

const defaultProps = {
  title: 'Test Title',
  data: {
    'view:mailingAddress': {
      mailingAddress: {
        street: '123 Test St',
        city: 'Test City',
        state: 'TS',
        postalCode: '12345',
      },
    },
  },
  // Function props grouped together
  onReviewPage: () => {},
  goBack: () => {},
  goToPath: () => {},
  updatePage: () => {},
  setFormData: () => {},
};

describe('<AddressVerificationPage />', () => {
  let fetchStub;
  let address;
  let response;

  beforeEach(() => {
    fetchStub = sinon.stub(window, 'fetch');
    address = {
      street: '123 Test St',
      city: 'Test City',
      state: 'TS',
      postalCode: '12345',
    };
    response = new Response(JSON.stringify(address));
  });

  afterEach(() => {
    fetchStub.restore();
  });

  it('renders without crashing', () => {
    const { container } = render(<AddressVerificationPage {...defaultProps} />);
    expect(container.firstChild).to.exist;
  });

  it('verifies address successfully when addresses match', async () => {
    fetchStub.returns(Promise.resolve(response));

    const mappedAddress = mapAddress(address);

    mappedAddress.AddressLine1 = mappedAddress.AddressLine1.toUpperCase();
    mappedAddress.City = mappedAddress.City.toUpperCase();

    const result = await verifyAddress(mappedAddress);

    expect(result.equal).to.be.true;
  });

  it('sets the address object when the event target has a value', () => {
    const setaddressObj = sinon.spy();
    const mockEvent = {
      target: {
        value: JSON.stringify({
          street: '123 Test St',
          city: 'Test City',
          state: 'TS',
          postalCode: '12345',
        }),
      },
    };

    onAddressChange(mockEvent, setaddressObj);

    expect(setaddressObj.calledOnce).to.be.true;
    expect(
      setaddressObj.calledWith({
        value: JSON.parse(mockEvent.target.value),
        dirty: true,
      }),
    ).to.be.true;
  });

  it('does not set the address object when the event target does not have a value', () => {
    const setaddressObj = sinon.spy();
    const mockEvent = {
      target: {},
    };

    onAddressChange(mockEvent, setaddressObj);

    expect(setaddressObj.called).to.be.false;
  });

  it('should see the va-alert element on the page when the address is not verified properly', async () => {
    const removedMailingAddress = {
      'view:mailingAddress': {
        mailingAddress: {
          street: '',
          city: '',
          state: '',
          postalCode: '',
        },
      },
    };

    // Render the component with some props
    const { container } = render(
      <AddressVerificationPage
        data={removedMailingAddress}
        defaultLoading={false}
      />,
    );

    await new Promise(resolve => setTimeout(resolve, 1000));

    const isAlertPresent = container.outerHTML.includes(
      'We were unable to verify',
    );

    expect(isAlertPresent).to.be.true;
  });
});
