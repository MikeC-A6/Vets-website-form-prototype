import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { expect } from 'chai';

import ConfirmationPage from '../../containers/ConfirmationPage';

describe('<ConfirmationPage>', () => {
  const store = () => ({
    getState: () => ({
      user: {
        login: {
          currentlyLoggedIn: true,
        },
        profile: {
          savedForms: [],
          prefillsAvailable: [],
        },
      },
      form: {
        data: {
          userFullName: {
            first: 'Josie',
            middle: 'Henrietta',
            last: 'Smith',
          },
        },
      },
      featureToggles: {
        loading: false,
      },
    }),
    subscribe: () => {},
    dispatch: () => {},
  });

  const storeMissingFirst = () => ({
    getState: () => ({
      user: {
        login: {
          currentlyLoggedIn: true,
        },
        profile: {
          savedForms: [],
          prefillsAvailable: [],
        },
      },
      form: {
        data: {
          userFullName: {
            middle: 'Henrietta',
            last: 'Smith',
          },
        },
      },
      featureToggles: {
        loading: false,
      },
    }),
    subscribe: () => {},
    dispatch: () => {},
  });

  it('renders', () => {
    const mockStore = store();
    const { getByText } = render(
      <Provider store={mockStore}>
        <ConfirmationPage />
      </Provider>,
    );
    expect(
      getByText(
        'You’ve submitted your application for a free frame to display your DD-217 certificate',
      ),
    ).to.exist;
    expect(getByText('Josie Henrietta Smith')).to.exist;
  });

  it('first name is undefined set name to what is in datastore instead', () => {
    const mockStore = storeMissingFirst();
    const { getByText } = render(
      <Provider store={mockStore}>
        <ConfirmationPage />
      </Provider>,
    );
    expect(getByText('John J Doe Sr')).to.exist;
  });

  // it('handles click event on print button', () => {
  //   const mockStore = store(); // replace with your actual mock store
  //   const { getByTestId } = render(
  //     <Provider store={mockStore}>
  //       <ConfirmationPage />
  //     </Provider>,
  //   );

  //   const printButton = getByTestId('print-button');
  //   const onClickSpy = sinon.spy();
  //   printButton.onClick = onClickSpy;
  //   fireEvent.click(printButton);

  //   expect(onClickSpy.called).to.be.true;
  // });
});
