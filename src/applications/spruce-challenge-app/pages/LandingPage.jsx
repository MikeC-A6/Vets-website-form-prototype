import React from 'react';
import PageLayout from '../components/PageLayout';

const LandingPage = () => {
  return (
    <PageLayout showNeedHelp>
      <div>
        <h1>Spruce Challenge App</h1>
        <p>
          Landing page started, let’s build forms from here and initiate any
          data we need on this page (or reset a user to this page if no data
          detected at all)
        </p>
      </div>
    </PageLayout>
  );
};

export default LandingPage;
