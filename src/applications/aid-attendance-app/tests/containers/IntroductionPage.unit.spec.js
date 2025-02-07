import { render } from '@testing-library/react';
import { expect } from 'chai';
import React from 'react';
import { Provider } from 'react-redux';

import { $, $$ } from 'platform/forms-system/src/js/utilities/ui';

import IntroductionPage, {
  mapStateToProps,
} from '../../containers/IntroductionPage';

import { getData } from '../fixtures/data/mock-form-data';

describe('<IntroductionPage/>', () => {
  it('should render', () => {
    const { props, mockStore } = getData({ loggedIn: false });
    const { container } = render(
      <Provider store={mockStore}>
        <IntroductionPage {...props} />
      </Provider>,
    );
    expect($('h1', container).textContent).to.eq(
      'Apply for a frame to display your DD-217 certificate',
    );
    expect($$('h2', container)[0].textContent).to.eq(
      'What to know before you start this form',
    );
  });

  it('should render OMB info', () => {
    const { props, mockStore } = getData({ loggedIn: true });
    const { container } = render(
      <Provider store={mockStore}>
        <IntroductionPage {...props} />
      </Provider>,
    );
    expect($$('va-omb-info', container).length).to.equal(1);
  });

  it('when using mapStateToProps and not have a state.user, should set user to {}', () => {
    const state = {};
    const props = mapStateToProps(state);
    expect(props.user).to.deep.equal({});
  });
});
