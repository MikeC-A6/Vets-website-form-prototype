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

  it('renders', () => {
    const mockStore = store();
    const { getByText } = render(
      <Provider store={mockStore}>
        <ConfirmationPage />
      </Provider>,
    );
    expect(
      getByText(
        'You’ve submitted your form to order a frame to display your discharge certificate DD-217',
      ),
    ).to.exist;
    expect(getByText('Josie Henrietta Smith')).to.exist;
  });
});
