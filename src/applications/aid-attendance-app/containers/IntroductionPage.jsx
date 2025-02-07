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
        <FormTitle title="VA Aid and Attendance benefits and Housebound allowance" />
        <p className="vads-u-font-size--h3">
          VA Aid and Attendance or Housebound benefits provide monthly payments added to the amount of a monthly VA pension for qualified Veterans and survivors.
        </p>
        <p>
          Fill out VA Form 21-2680 (Examination for Housebound Status or Permanent Need for Regular Aid and Attendance). You can have your doctor fill out the examination information section.
        </p>

        <h2 className="vads-u-font-size--h3">
          What to know before you start this form
        </h2>
        <p>
          To complete this form, you'll need:
        </p>

        <ul>
          <li>Information about your daily activities and how you get around</li>
          <li>Details about any illness, injury, or disability that affects your ability to care for yourself</li>
          <li>Medical evidence or doctor's reports showing your need for Aid and Attendance or Housebound care</li>
          <li>If you're in a nursing home, you'll also need to fill out VA Form 21-0779 (Request for Nursing Home Information)</li>
        </ul>

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
