import React from 'react';
import { connect } from 'react-redux';

import scrollToTop from 'platform/utilities/ui/scrollToTop';
import { focusElement } from 'platform/utilities/ui';
import PropTypes from 'prop-types';
import { Approved } from '../components/ConfirmationResponses';

function createConfirmationPage(form) {
  const { data } = form;
  let name = {
    first: 'John',
    middle: 'J',
    last: 'Doe',
    suffix: 'Sr',
  };

  let addressAlert = false;

  if (typeof data.userFullName.first !== 'undefined') {
    name = data.userFullName;
  }

  if (data.updateProfileAddress) {
    addressAlert = true;
  }

  return Approved(name, addressAlert);
}

export class ConfirmationPage extends React.Component {
  componentDidMount() {
    focusElement('.schemaform-title > h1');
    scrollToTop('topScrollElement');
  }

  render() {
    return createConfirmationPage(this.props.form);
  }
}

function mapStateToProps(state) {
  return {
    form: state.form,
  };
}

ConfirmationPage.protoType = {
  form: PropTypes.object,
};

export default connect(mapStateToProps)(ConfirmationPage);
