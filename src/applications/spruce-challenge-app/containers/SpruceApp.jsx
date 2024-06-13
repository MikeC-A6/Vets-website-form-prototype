import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FEATURE_FLAG_NAMES from 'platform/utilities/feature-toggles/featureFlagNames';

import RoutedSavableApp from 'platform/forms/save-in-progress/RoutedSavableApp';

import { setData } from 'platform/forms-system/src/js/actions';
import { toggleValues } from 'platform/site-wide/feature-toggles/selectors';
import formConfig from '../config/form';

function SpruceApp({
  children,
  formData,
  location,
  setFormData,
  showUpdatedSpruceApp,
  user,
}) {
  useEffect(
    () => {
      if (!user.login.currentlyLoggedIn) {
        return;
      }

      if (formData.showUpdatedSpruceApp !== showUpdatedSpruceApp) {
        setFormData({
          ...formData,
          showUpdatedSpruceApp,
        });
      }
    },
    [
      formData,
      location.pathname,
      setFormData,
      showUpdatedSpruceApp,
      user.login.currentlyLoggedIn,
    ],
  );

  return (
    <>
      <va-breadcrumbs uswds="false">
        <a href="/">Home</a>
        <a href="/supporting-forms-for-claims">
          Supporting forms for VA claims
        </a>
        <a href="/supporting-forms-for-claims/frame-for-certificate-form-24-spruce">
          Apply for a complimentary frame for a DD-217 discharge certificate
        </a>
      </va-breadcrumbs>
      <RoutedSavableApp formConfig={formConfig} currentLocation={location}>
        {children}
      </RoutedSavableApp>
    </>
  );
}

SpruceApp.propTypes = {
  children: PropTypes.object,
  formData: PropTypes.object,
  location: PropTypes.object,
  setFormData: PropTypes.func,
  showUpdatedSpruceApp: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  formData: state.form?.data || {},
  showUpdatedSpruceApp: toggleValues(state)[
    FEATURE_FLAG_NAMES.showUpdatedSpruceApp
  ],
  user: state?.user,
});

const mapDispatchToProps = {
  setFormData: setData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SpruceApp);
