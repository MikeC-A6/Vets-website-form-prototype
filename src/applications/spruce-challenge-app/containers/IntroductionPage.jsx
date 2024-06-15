import React from 'react';
import { connect } from 'react-redux';

// import FEATURE_FLAG_NAMES from 'platform/utilities/feature-toggles/featureFlagNames';

import { focusElement } from 'platform/utilities/ui';
import FormTitle from 'platform/forms-system/src/js/components/FormTitle';
import SaveInProgressIntro from 'platform/forms/save-in-progress/SaveInProgressIntro';
// import { toggleValues } from 'platform/site-wide/feature-toggles/selectors';

class IntroductionPage extends React.Component {
  componentDidMount() {
    focusElement('.va-nav-breadcrumbs-list');
  }

  render() {
    const { route, user } = this.props;

    return (
      <div className="schemaform-intro">
        <FormTitle title="Apply for your DD-217 Discharge Certificate Frame" />
        <p className="vads-u-font-size--h3">Equal to VA Form 24-SPRUCE</p>

        <p>
          New legislation allows Veterans to receive a complimentary frame for
          their DD-217 Discharge Certificate.
        </p>

        <h2 className="vads-u-font-size--h3">
          Follow these steps to get started
        </h2>

        <va-process-list uswds="false">
          <li>
            <h3 className="vads-u-font-size--h4">Check your eligibility</h3>
            <p>
              Make sure you meet our eligibility requirements before you apply.
            </p>
            <va-additional-info
              class="vads-u-margin-bottom--2"
              trigger="What are the 24-SPRUCE eligibility requirements?"
            >
              <p>
                <strong>
                  You are a veteran with honorable discharge status.
                </strong>
              </p>
              <p>or</p>
              <p>
                You are related to a deceased veteran with honorable discharge
                status.
              </p>
            </va-additional-info>
          </li>
          <li>
            <h3 className="vads-u-font-size--h4">Gather your information</h3>
            <p>
              <strong>Here’s what you’ll need to apply</strong>:
            </p>
            <ul className="vads-u-margin-bottom--0">
              <li>
                Knowledge of your chosen Veteran of service member's military
                service history
              </li>
              <li>Your contact information and shipping address</li>
              <li>Your SSN or DoD ID number</li>
              <li>Your Discharge Papers and Separation Documents (DD-214) .</li>
            </ul>
          </li>
          <li>
            <h3 className="vads-u-font-size--h4">Start your application</h3>
            <p>
              We’ll take you through each step of the process. It should take
              about 15 minutes.
            </p>

            <va-additional-info trigger="What happens after I apply?">
              <p>
                After you apply, a frame will be mailed to the provided shipping
                address within 14-21 days.
              </p>
              <p className="vads-u-margin-bottom--0">
                <strong>Note</strong>: If a valid shipping address is not
                provided, the frame may be shipped and held at local USPS office
                for the provided zip code.
              </p>
            </va-additional-info>
          </li>
        </va-process-list>

        {user?.login?.currentlyLoggedIn && (
          <h2 className="vads-u-font-size--h3 vads-u-margin-top--0">
            Begin your request for a complimentary discharge certificate frame.
          </h2>
        )}

        <SaveInProgressIntro
          prefillEnabled={route.formConfig.prefillEnabled}
          messages={route.formConfig.savedFormMessages}
          pageList={route.pageList}
          startText="Start your application"
        />

        <div
          className={`omb-info--container vads-u-padding--0 vads-u-margin-top--${
            user?.login?.currentlyLoggedIn ? '4' : '2p5'
          } vads-u-margin-bottom--2`}
        >
          <va-omb-info
            res-burden={15}
            omb-number="24-SPRUCE"
            exp-date="06/17/2024"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // showUpdatedSpruceApp: toggleValues(state)[
  //   FEATURE_FLAG_NAMES.showUpdatedSpruceApp
  // ],
  user: state.user || {},
});

export default connect(mapStateToProps)(IntroductionPage);
