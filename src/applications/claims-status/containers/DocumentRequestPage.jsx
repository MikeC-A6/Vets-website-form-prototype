import React from 'react';
import Scroll from 'react-scroll';
import { merge } from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import scrollTo from '@department-of-veterans-affairs/platform-utilities/scrollTo';
import scrollToTop from '@department-of-veterans-affairs/platform-utilities/scrollToTop';

import AddFilesFormOld from '../components/AddFilesFormOld';
import NeedHelp from '../components/NeedHelp';
import ClaimsBreadcrumbs from '../components/ClaimsBreadcrumbs';
import DueDate from '../components/DueDate';
import Notification from '../components/Notification';
import {
  addFile,
  removeFile,
  submitFiles,
  // START lighthouse_migration
  submitFilesLighthouse,
  // END lighthouse_migration
  resetUploads,
  updateField,
  cancelUpload,
  // START lighthouse_migration
  getClaim as getClaimAction,
  // END lighthouse_migration
  setFieldsDirty,
  clearNotification,
} from '../actions';
// START lighthouse_migration
import { benefitsDocumentsUseLighthouse } from '../selectors';
// END lighthouse_migration
import { scrubDescription, setDocumentTitle } from '../utils/helpers';
import { setPageFocus, setUpPage } from '../utils/page';
import withRouter from '../utils/withRouter';

const scrollToError = () => {
  const options = merge({}, window.VetsGov.scroll, { offset: -25 });
  scrollTo('uploadError', options);
};
const { Element } = Scroll;

const filesPath = '../files';

class DocumentRequestPage extends React.Component {
  componentDidMount() {
    this.props.resetUploads();
    if (this.props.trackedItem) {
      setDocumentTitle(`Request for ${this.props.trackedItem.displayName}`);
    } else {
      setDocumentTitle('Document Request');
    }
    if (!this.props.loading) {
      setUpPage();
    } else {
      scrollToTop();
    }
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(props) {
    if (!props.loading && !props.trackedItem) {
      this.props.navigate(`../status`, {
        replace: true,
      });
    }
    if (props.uploadComplete) {
      this.goToFilesPage();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.message && !prevProps.message) {
      document.querySelector('.claims-alert').focus();
      scrollToError();
    }
    if (!this.props.loading && prevProps.loading) {
      setPageFocus();
    }
  }

  componentWillUnmount() {
    if (!this.props.uploadComplete) {
      this.props.clearNotification();
    }
  }

  getPageContent() {
    const { trackedItem } = this.props;

    return (
      <>
        <h1 className="claims-header">{trackedItem.displayName}</h1>
        {trackedItem.status === 'NEEDED_FROM_YOU' ? (
          <DueDate date={trackedItem.suspenseDate} />
        ) : null}
        {trackedItem.status === 'NEEDED_FROM_OTHERS' ? (
          <div className="optional-upload">
            <p>
              <strong>Optional</strong> - We’ve asked others to send this to us,
              but you may upload it if you have it.
            </p>
          </div>
        ) : null}
        <p>{scrubDescription(trackedItem.description)}</p>
      </>
    );
  }

  goToFilesPage() {
    this.props.getClaim(this.props.claim.id);
    this.props.navigate(filesPath);
  }

  render() {
    const { trackedItem } = this.props;
    let content;

    if (this.props.loading) {
      content = (
        <va-loading-indicator
          set-focus
          message="Loading your claim information..."
        />
      );
    } else {
      const { lastPage, message } = this.props;

      content = (
        <>
          {message && (
            <div>
              <Element name="uploadError" />
              <Notification
                title={message.title}
                body={message.body}
                type={message.type}
              />
            </div>
          )}
          {this.getPageContent()}
          <AddFilesFormOld
            field={this.props.uploadField}
            progress={this.props.progress}
            uploading={this.props.uploading}
            files={this.props.files}
            backUrl={lastPage ? `/${lastPage}` : filesPath}
            onSubmit={() => {
              // START lighthouse_migration
              if (this.props.documentsUseLighthouse) {
                this.props.submitFilesLighthouse(
                  this.props.claim.id,
                  trackedItem,
                  this.props.files,
                );
              } else {
                this.props.submitFiles(
                  this.props.claim.id,
                  trackedItem,
                  this.props.files,
                );
              }
              // END lighthouse_migration
            }}
            onAddFile={this.props.addFile}
            onRemoveFile={this.props.removeFile}
            onFieldChange={this.props.updateField}
            onCancel={this.props.cancelUpload}
            onDirtyFields={this.props.setFieldsDirty}
          />
        </>
      );
    }

    const crumbs = [
      {
        href: filesPath,
        label: 'Status details',
        isRouterLink: true,
      },
      {
        href: `../document-request/${this.props.params.trackedItemId}`,
        label: 'Document request',
        isRouterLink: true,
      },
    ];

    return (
      <div>
        <div name="topScrollElement" />
        <div className="vads-l-grid-container large-screen:vads-u-padding-x--0">
          <div className="vads-l-row vads-u-margin-x--neg1p5 medium-screen:vads-u-margin-x--neg2p5">
            <div className="vads-l-col--12">
              <ClaimsBreadcrumbs crumbs={crumbs} />
            </div>
          </div>
          <div className="vads-l-row vads-u-margin-x--neg2p5">
            <div className="vads-l-col--12 vads-u-padding-x--2p5 vads-u-padding-bottom--4 medium-screen:vads-l-col--8">
              {content}
            </div>
          </div>
          <div className="vads-l-row vads-u-margin-x--neg2p5">
            <div className="vads-l-col--12 vads-u-padding-x--2p5 medium-screen:vads-l-col--8">
              <NeedHelp />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const claimsState = state.disability.status;
  const { claimDetail, uploads } = claimsState;

  let trackedItem = null;
  if (claimDetail.detail) {
    const { trackedItems } = claimDetail.detail.attributes;
    const { trackedItemId } = ownProps.params;
    [trackedItem] = trackedItems.filter(
      item => item.id === parseInt(trackedItemId, 10),
    );
  }

  return {
    loading: claimDetail.loading,
    claim: claimDetail.detail,
    trackedItem,
    files: uploads.files,
    uploading: uploads.uploading,
    progress: uploads.progress,
    uploadError: uploads.uploadError,
    uploadComplete: uploads.uploadComplete,
    uploadField: uploads.uploadField,
    lastPage: claimsState.routing.lastPage,
    message: claimsState.notifications.message,
    // START lighthouse_migration
    documentsUseLighthouse: benefitsDocumentsUseLighthouse(state),
    // END lighthouse_migration
  };
}

const mapDispatchToProps = {
  addFile,
  removeFile,
  submitFiles,
  updateField,
  cancelUpload,
  getClaim: getClaimAction,
  // START lighthouse_migration
  submitFilesLighthouse,
  // END lighthouse_migration
  setFieldsDirty,
  resetUploads,
  clearNotification,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(DocumentRequestPage),
);

DocumentRequestPage.propTypes = {
  addFile: PropTypes.func,
  cancelUpload: PropTypes.func,
  claim: PropTypes.object,
  clearNotification: PropTypes.func,
  // START lighthouse_migration
  documentsUseLighthouse: PropTypes.bool,
  // END lighthouse_migration
  files: PropTypes.array,
  getClaim: PropTypes.func,
  lastPage: PropTypes.string,
  loading: PropTypes.bool,
  message: PropTypes.object,
  navigate: PropTypes.func,
  params: PropTypes.object,
  removeFile: PropTypes.func,
  resetUploads: PropTypes.func,
  setFieldsDirty: PropTypes.func,
  submitFiles: PropTypes.func,
  // START lighthouse_migration
  submitFilesLighthouse: PropTypes.func,
  // END lighthouse_migration
  trackedItem: PropTypes.object,
  updateField: PropTypes.func,
  uploadComplete: PropTypes.bool,
  uploading: PropTypes.bool,
};

export { DocumentRequestPage };
