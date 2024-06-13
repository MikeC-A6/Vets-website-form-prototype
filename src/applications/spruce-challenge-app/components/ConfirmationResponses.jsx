import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

const ConfirmationReceiptBox = ({ name }) => {
  return (
    <div className="inset vads-u-margin-top--3 vads-u-padding-y--3">
      <h3 className="vads-u-margin-top--0p5">Your submission information</h3>

      <p className="vads-u-font-family--serif vads-u-font-size--h4 vads-u-margin-bottom--0">
        <strong>Who submitted this form</strong>
      </p>
      <p className="vads-u-margin-top--0">
        {name.first} {name.middle} {name.last} {name.suffix}
      </p>

      <p className="vads-u-font-family--serif vads-u-font-size--h4 vads-u-margin-bottom--0">
        <strong>Date submitted</strong>
      </p>
      <p className="vads-u-margin-top--0">
        {format(new Date(), 'MMMM d, yyyy')}
      </p>

      <p className="vads-u-font-family--serif vads-u-font-size--h4 vads-u-margin-bottom--0">
        <strong>Confirmation for your records</strong>
      </p>
      <p className="vads-u-margin-top--0">
        You can print this confirmation page for your records
      </p>

      <va-button
        type="button"
        onClick={() => window.print()}
        text="Print this page"
      />
    </div>
  );
};

ConfirmationReceiptBox.propTypes = {
  name: PropTypes.object,
};

export function Approved(name) {
  return (
    <>
      <div>
        <va-alert
          close-btn-aria-label="Close notification"
          status="success"
          visible
        >
          <h2 slot="headline">
            You’ve submitted your form to order a frame to display your
            discharge certificate DD-217
          </h2>
          <div className="vads-u-margin-top--1p5">
            <p className="vads-u-margin-top--0 vads-u-margin-bottom--3">
              After we review and process your form, we’ll send you your frame
              of choice.
            </p>
          </div>
        </va-alert>
        <ConfirmationReceiptBox name={name} />
      </div>
      <div className="vads-u-margin-bottom--4">
        <h2>What are my next steps?</h2>
        <p>
          Once you submit your form, it may take up to 5 days for us to review
          and process your information. Depending on your choice of frame and
          your mailing address, it could take up to 4 weeks to receive your
          frame.
        </p>
      </div>
      <va-link-action href="https://va.gov/" text="Go back to VA.gov" />
    </>
  );
}

Approved.prototype = {
  name: PropTypes.object,
  response: PropTypes.object || PropTypes.bool,
};

export function LoadingResults() {
  return (
    <div className="vads-u-margin-y--5">
      <va-loading-indicator
        label="Loading"
        message="Loading your results"
        set-focus
      />
    </div>
  );
}
