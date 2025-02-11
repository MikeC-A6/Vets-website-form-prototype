import MedicationsSite from './med_site/MedicationsSite';
import MedicationsListPage from './pages/MedicationsListPage';
import parkedRx from './fixtures/parked-prescription-details.json';
import MedicationsDetailsPage from './pages/MedicationsDetailsPage';
import MedicationsLandingPage from './pages/MedicationsLandingPage';

describe('Medications Details Page Parked Status DropDown', () => {
  it('visits Medications Details Page Active Parked Rx Status DropDown', () => {
    const site = new MedicationsSite();
    const listPage = new MedicationsListPage();
    const detailsPage = new MedicationsDetailsPage();
    const landingPage = new MedicationsLandingPage();
    site.login();
    landingPage.visitLandingPageURL();
    cy.injectAxe();
    cy.axeCheck('main');
    listPage.clickGotoMedicationsLink();
    detailsPage.clickMedicationDetailsLink(parkedRx);
    detailsPage.clickWhatDoesThisStatusMeanDropDown();
    detailsPage.verifyParkedStatusDropDownDefinition();
  });
});
