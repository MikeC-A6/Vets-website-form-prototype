import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FEATURE_FLAG_NAMES from 'platform/utilities/feature-toggles/featureFlagNames';

import RoutedSavableApp from 'platform/forms/save-in-progress/RoutedSavableApp';

import { setData } from 'platform/forms-system/src/js/actions';
import { toggleValues } from 'platform/site-wide/feature-toggles/selectors';
import formConfig from '../config/form';
import { fetchVeterans } from '../actions';
import { VETERANS_TYPE } from '../constants';

function SpruceApp({
  children,
  formData,
  getVeterans,
  location,
  setFormData,
  showUpdatedSpruceApp,
  user,
  veterans,
}) {
  const [fetchedVeterans, setFetchedVeterans] = useState(false);

  useEffect(
    () => {
      if (!user.login.currentlyLoggedIn) {
        return;
      }

      if (!fetchedVeterans) {
        setFetchedVeterans(true);
        getVeterans();
      }

      if (
        formData.showUpdatedSpruceApp !== showUpdatedSpruceApp ||
        formData.veterans !== veterans
      ) {
        setFormData({
          ...formData,
          showUpdatedSpruceApp,
          veterans,
        });
      }
    },
    [
      fetchedVeterans,
      formData,
      getVeterans,
      location.pathname,
      setFormData,
      showUpdatedSpruceApp,
      user.login.currentlyLoggedIn,
      veterans,
    ],
  );

  return (
    <>
      <va-breadcrumbs uswds="false">
        <a href="/">Home</a>
        <a href="/education">Education and training</a>
        <a href="/fry-dea">
          Apply for education benefits as an eligible dependent
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
  getVeterans: PropTypes.func,
  location: PropTypes.object,
  setFormData: PropTypes.func,
  showUpdatedSpruceApp: PropTypes.bool,
  veterans: VETERANS_TYPE,
};

const mapStateToProps = state => ({
  formData: state.form?.data || {},
  showUpdatedSpruceApp: toggleValues(state)[
    FEATURE_FLAG_NAMES.showUpdatedSpruceApp
  ],
  user: state?.user,
  veterans: state.data?.veterans,
});

const mapDispatchToProps = {
  setFormData: setData,
  getVeterans: fetchVeterans,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SpruceApp);
