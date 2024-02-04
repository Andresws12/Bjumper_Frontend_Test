import homeSelectors from './utilities/home/home.selectors';

describe('01 HomeView', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get(homeSelectors.searchGitHubUsersInput).clear();
  });

  it('01 Home with input value', () => {
    cy.get(homeSelectors.sectionHomePage).should('be.visible');
    cy.get(homeSelectors.searchGitHubUsersInput).type('andresws12');
    cy.get(homeSelectors.searchGitHubUsers).should('be.visible');
    cy.get(homeSelectors.searchGitHubUsersLogo).should('be.visible');
    cy.get(homeSelectors.searchGitHubUsersInput).should(
      'have.value',
      'andresws12'
    );
    cy.get(homeSelectors.searchGitHubUsersClearIcon).should('be.visible');
    cy.get(homeSelectors.searchGitHubUsersUserError).should('not.exist');
    cy.get(homeSelectors.searchGitHubUsersUserDataContent).should('be.visible');
    cy.get(homeSelectors.searchGitHubUsersPersonalData).should('be.visible');
    cy.get(homeSelectors.searchGitHubUsersRepositoriesData).should(
      'be.visible'
    );
    cy.get(homeSelectors.searchGitHubUsersRepositoriesError).should(
      'not.exist'
    );
  });

  it('02 Home with non-existing user', () => {
    cy.get(homeSelectors.searchGitHubUsersInput).type('undefined');
    cy.get(homeSelectors.searchGitHubUsers).should('be.visible');
    cy.get(homeSelectors.searchGitHubUsersLogo).should('be.visible');
    cy.get(homeSelectors.searchGitHubUsersInput).should(
      'have.value',
      'undefined'
    );
    cy.get(homeSelectors.searchGitHubUsersClearIcon).should('be.visible');
    cy.get(homeSelectors.searchGitHubUsersUserError).should('be.visible');
    cy.get(homeSelectors.searchGitHubUsersUserDataContent).should('not.exist');
    cy.get(homeSelectors.searchGitHubUsersPersonalData).should('not.exist');
    cy.get(homeSelectors.searchGitHubUsersRepositoriesData).should('not.exist');
    cy.get(homeSelectors.searchGitHubUsersRepositoriesError).should(
      'not.exist'
    );
  });

  it('03 Home with user without repositories', () => {
    cy.get(homeSelectors.searchGitHubUsersInput).type('andresws');
    cy.get(homeSelectors.searchGitHubUsers).should('be.visible');
    cy.get(homeSelectors.searchGitHubUsersLogo).should('be.visible');
    cy.get(homeSelectors.searchGitHubUsersInput).should(
      'have.value',
      'andresws'
    );
    cy.get(homeSelectors.searchGitHubUsersClearIcon).should('be.visible');
    cy.get(homeSelectors.searchGitHubUsersUserError).should('not.exist');
    cy.get(homeSelectors.searchGitHubUsersUserDataContent).should('be.visible');
    cy.get(homeSelectors.searchGitHubUsersPersonalData).should('be.visible');
    cy.get(homeSelectors.searchGitHubUsersRepositoriesData).should('not.exist');
    cy.get(homeSelectors.searchGitHubUsersRepositoriesError).should(
      'be.visible'
    );
  });
});
