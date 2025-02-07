import React from 'react';

export default function IntroSignInAlert() {
  return (
    <div>
      <va-alert status="info" uswds visible>
        <div className="usa-alert-body">
          <p className="vads-u-margin-top--0">
            Since you’re signed in to your account, we can prefill part of your
            application based on your VA.gov account details.
          </p>
          <p>
            If you’d like to make changes to your VA.gov account information,
            you can make those changes in your profile.
          </p>
          <a href="/profile">Go to your VA.gov profile</a>
        </div>
      </va-alert>
      <br />
    </div>
  );
}
