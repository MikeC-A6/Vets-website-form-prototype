import React from 'react';
import { connect } from 'react-redux';

// import FEATURE_FLAG_NAMES from 'platform/utilities/feature-toggles/featureFlagNames';

import { focusElement } from 'platform/utilities/ui';
import FormTitle from 'platform/forms-system/src/js/components/FormTitle';
import SaveInProgressIntro from 'platform/forms/save-in-progress/SaveInProgressIntro';
// import { toggleValues } from 'platform/site-wide/feature-toggles/selectors';

import IntroSignInAlert from '../components/IntroSignInAlert';

class IntroductionPage extends React.Component {
  componentDidMount() {
    focusElement('.va-nav-breadcrumbs-list');
  }

  render() {
    const { route, user } = this.props;

    return (
      <div className="schemaform-intro">
        <FormTitle title="Apply for a frame to display your DD-217 certificate" />
        <p className="vads-u-font-size--h3">
          Free frame application (VA Form 24-SPRUCE)
        </p>
        <p>
          Complete this form if you want a free frame to display your
          certificate of honorable service (DD-217). If you’re found eligible,
          we’ll ship the free frame of your choice directly to you.
        </p>

        <h2 className="vads-u-font-size--h3">
          What to know before you start this form
        </h2>
        <p>
          To complete the form, you’ll need access to your military service
          information including:
        </p>

        <ul>
          <li>Date of discharge</li>
          <li>Dates of service</li>
          <li>Duty assignment</li>
          <li>Major command</li>
        </ul>
        <p>
          Your DD-214 is sufficient to fulfill submission requirements for this
          form.{' '}
          <a href="https://www.va.gov/records/get-military-service-records/">
            If your DD-214 is lost or damaged, learn how to order a new copy of
            your DD-214.
          </a>
        </p>
        <SaveInProgressIntro
          prefillEnabled={route.formConfig.prefillEnabled}
          messages={route.formConfig.savedFormMessages}
          pageList={route.pageList}
          verifiedPrefillAlert={IntroSignInAlert()}
          startText="Start the application for a free frame"
        />
        <div
          className={`omb-info--container vads-u-padding--0 vads-u-margin-top--${
            user?.login?.currentlyLoggedIn ? '4' : '2p5'
          } vads-u-margin-bottom--2`}
        >
          <va-omb-info
            res-burden={10}
            omb-number="12-3456"
            exp-date="12/34/56"
          />
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  // showUpdatedSpruceApp: toggleValues(state)[
  //   FEATURE_FLAG_NAMES.showUpdatedSpruceApp
  // ],
  user: state.user || {},
});

export default connect(mapStateToProps)(IntroductionPage);
