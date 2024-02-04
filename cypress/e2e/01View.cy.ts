import homeSelectors from './utilities/home/home.selectors';

describe('01 HomeView', () => {
  const inputValue = 'andresws12';
  const nonExistingUser = 'undefined';
  const userWithoutRepositories = 'andresws';

  beforeEach(() => {
    cy.visit('/');
    cy.get(homeSelectors.searchGitHubUsersInput).clear();
  });

  it('01 Home with input value', () => {
    cy.get(homeSelectors.sectionHomePage).should('be.visible');
    cy.get(homeSelectors.searchGitHubUsersInput).type(inputValue);
    cy.get(homeSelectors.searchGitHubUsers).should('be.visible');
    cy.get(homeSelectors.searchGitHubUsersLogo).should('be.visible');
    cy.get(homeSelectors.searchGitHubUsersInput).should(
      'have.value',
      inputValue
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
    cy.get(homeSelectors.searchGitHubUsersInput).type(nonExistingUser);
    cy.get(homeSelectors.searchGitHubUsers).should('be.visible');
    cy.get(homeSelectors.searchGitHubUsersLogo).should('be.visible');
    cy.get(homeSelectors.searchGitHubUsersInput).should(
      'have.value',
      nonExistingUser
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
    cy.get(homeSelectors.searchGitHubUsersInput).type(userWithoutRepositories);
    cy.get(homeSelectors.searchGitHubUsers).should('be.visible');
    cy.get(homeSelectors.searchGitHubUsersLogo).should('be.visible');
    cy.get(homeSelectors.searchGitHubUsersInput).should(
      'have.value',
      userWithoutRepositories
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
