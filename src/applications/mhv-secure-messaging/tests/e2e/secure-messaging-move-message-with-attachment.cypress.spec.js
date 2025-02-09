import PatientInboxPage from './pages/PatientInboxPage';
import SecureMessagingSite from './sm_site/SecureMessagingSite';
import mockMessagewithAttachment from './fixtures/message-response-withattachments.json';
import mockThreadwithAttachment from './fixtures/thread-attachment-response.json';
import mockMessages from './fixtures/messages-response.json';
import PatientMessageDetailsPage from './pages/PatientMessageDetailsPage';
import { AXE_CONTEXT, Locators, Paths } from './utils/constants';

describe('Secure Messaging - Move Message with Attachment', () => {
  it('can move with attachment', () => {
    const site = new SecureMessagingSite();
    const landingPage = new PatientInboxPage();
    const messageDetailsPage = new PatientMessageDetailsPage();
    site.login();
    mockMessagewithAttachment.data.id = '7192838';
    mockMessagewithAttachment.data.attributes.messageId = '7192838';
    mockMessagewithAttachment.data.attributes.attachment = true;
    mockMessagewithAttachment.data.attributes.body = 'attachment';
    landingPage.loadInboxMessages(mockMessages, mockMessagewithAttachment);
    cy.intercept(
      'GET',
      `${
        Paths.INTERCEPT.MESSAGE_FOLDERS
      }/0/messages?per_page=-1&useCache=false`,
      mockMessages,
    ).as('messagesFolder');
    cy.intercept(
      'PATCH',
      `${Paths.INTERCEPT.MESSAGE_THREADS}${
        mockThreadwithAttachment.data.at(0).attributes.threadId
      }/move?folder_id=-3`,
      mockMessagewithAttachment,
    ).as('moveMessagewithAttachment');

    cy.get('.is-active').click();
    messageDetailsPage.loadMessageDetails(
      mockMessagewithAttachment,
      mockThreadwithAttachment,
    );
    cy.get(Locators.BUTTONS.MOVE_BUTTON_TEXT).click({ force: true });
    cy.get(Locators.ALERTS.MOVE_MODAL)
      .find('[class = "form-radio-buttons hydrated"]', {
        includeShadowDom: true,
      })
      .find('[for = "radiobutton-Deletedinput"]', { includeShadowDom: true })
      .click();
    cy.get(Locators.ALERTS.MOVE_MODAL)
      .find('va-button[text="Confirm"]')
      .click();
    cy.wait('@moveMessagewithAttachment');
    cy.injectAxe();
    cy.axeCheck(AXE_CONTEXT, {});
    landingPage.verifyMoveMessageWithAttachmentSuccessMessage();
    cy.get('@moveMessagewithAttachment')
      .its('response')
      .then(response => {
        cy.log(JSON.stringify(response));
        expect(response.body.data.id).to.include('7192838');
        expect(response.statusCode).to.eq(200);
      });
  });
});
