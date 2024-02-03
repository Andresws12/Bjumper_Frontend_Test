import sectionHomePage from './utilities/home/home.selectors';

describe('01 HomeView', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('01 Home with input value', () => {
    cy.get(sectionHomePage.sectionHomePage).should('be.visible');
  });
});
