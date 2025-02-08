import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FEATURE_FLAG_NAMES from 'platform/utilities/feature-toggles/featureFlagNames';

import RoutedSavableApp from 'platform/forms/save-in-progress/RoutedSavableApp';

import { setData } from 'platform/forms-system/src/js/actions';
import { toggleValues } from 'platform/site-wide/feature-toggles/selectors';
import formConfig from '../config/form';

function AidAttendanceApp({
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
        <a href="/">VA.gov home</a>
        <a href="/pension">Pension benefits</a>
        <a href="/pension/aid-attendance-housebound">
          VA Aid and Attendance benefits and Housebound allowance
        </a>
      </va-breadcrumbs>
      <RoutedSavableApp formConfig={formConfig} currentLocation={location}>
        {children}
      </RoutedSavableApp>
    </>
  );
}

AidAttendanceApp.propTypes = {
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
)(AidAttendanceApp);
