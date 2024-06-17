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
        id="print-button"
        data-testid="print-button"
        onClick={() => window.print()}
        text="Print this page"
      />
    </div>
  );
};

ConfirmationReceiptBox.propTypes = {
  name: PropTypes.object,
};

export function Approved(name, addressAlert) {
  return (
    <>
      <div>
        {addressAlert && (
          <>
            <va-alert
              close-btn-aria-label="Close notification"
              status="success"
              visible
            >
              <h2 slot="headline">Your mailing address has been updated</h2>
              <div className="vads-u-margin-top--1p5">
                <p className="vads-u-margin-top--0 vads-u-margin-bottom--3">
                  The address we use to mail you letters, bills, and
                  prescriptions has changed.
                </p>
                <a href="/profile">
                  View and/or edit your mailing address in your VA profile.
                </a>
              </div>
            </va-alert>
            <br />
          </>
        )}
        <va-alert
          close-btn-aria-label="Close notification"
          status="success"
          visible
        >
          <h2 slot="headline">
            You’ve submitted your application for a free frame to display your
            DD-217 certificate
          </h2>
          <div className="vads-u-margin-top--1p5">
            <p className="vads-u-margin-top--0 vads-u-margin-bottom--3">
              We'll review and process your form. If you are found eligible,
              we’ll send your frame of choice to your shipping address.
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
        {/* this web component link is not rendering for some reason */}
        {/* <va-link-action href="https://va.gov/" text="Go back to VA.gov" /> */}

        <a
          className="vads-c-action-link--green vads-u-margin-bottom-2"
          href="https://va.gov/"
        >
          Go back to VA.gov
        </a>
      </div>
    </>
  );
}

Approved.prototype = {
  name: PropTypes.object,
  addressAlert: PropTypes.bool,
  response: PropTypes.object || PropTypes.bool,
};
