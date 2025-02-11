import React from 'react';
import { expect } from 'chai';
import { renderWithStoreAndRouter } from '@department-of-veterans-affairs/platform-testing/react-testing-library-helpers';
import reducer from '../../../reducers';
import AlertBackgroundBox from '../../../components/shared/AlertBackgroundBox';
import { Alerts, Paths } from '../../../util/constants';

describe('Alert Backround Box component', () => {
  it('ERROR alert should render without errors', () => {
    const initialState = {
      sm: {
        alerts: {
          alertVisible: true,
          alertList: [
            {
              datestamp: '2022-10-07T19:25:32.832Z',
              isActive: true,
              alertType: 'error',
              header: 'Error',
              content: 'Message was not successfully deleted.',
            },
          ],
        },
      },
    };
    const screen = renderWithStoreAndRouter(
      <AlertBackgroundBox closeable visible />,
      { initialState, reducers: reducer, path: Paths.INBOX },
    );

    expect(screen.findByText(Alerts.Message.DELETE_MESSAGE_ERROR));
  });
});
