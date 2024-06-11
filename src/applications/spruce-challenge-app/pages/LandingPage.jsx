import React from 'react';
import PageLayout from '../components/PageLayout';

const LandingPage = () => {
  return (
    <PageLayout showNeedHelp>
      <div>
        <h1>Spruce Challenge App</h1>
        <p>
          Welcome to the Spruce Challenge App. To get started, you will need to
          enter your biographical information and service history on the
          following pages.
        </p>
        <p>
          Please ensure that all information entered is accurate and up-to-date.
          This includes your full name, date of birth, place of birth, and all
          relevant details pertaining to your military service history.
        </p>
        <p>
          Once you have entered all the required information, you will receive a
          framed DD-217. The DD-217 is a formal military discharge document that
          certifies your service in the military. It is an important document,
          so please keep it in a safe place.
        </p>
        <p>
          If you encounter any issues or need help at any point, please don’t
          hesitate to reach out to us. We’re here to help!
        </p>
        <va-button
          data-testid="start-spruce-application"
          text="Start Application"
          uswds
        />
      </div>
    </PageLayout>
  );
};

export default LandingPage;
