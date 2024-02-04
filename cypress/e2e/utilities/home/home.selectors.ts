import { cySelector } from '../utils';
const BASE_SELECTOR: string = 'home-';

const BASE_SELECTOR_GITHUB_COMPONENT: string =
  BASE_SELECTOR + 'search-github-users';

const sectionHomePage: string = cySelector(BASE_SELECTOR + 'section');

const searchGitHubUsers: string = cySelector(BASE_SELECTOR_GITHUB_COMPONENT);

const searchGitHubUsersLogo: string = cySelector(
  BASE_SELECTOR_GITHUB_COMPONENT + '-logo'
);

const searchGitHubUsersInput: string = cySelector(
  BASE_SELECTOR_GITHUB_COMPONENT + '-input'
);

const searchGitHubUsersClearIcon: string = cySelector(
  BASE_SELECTOR_GITHUB_COMPONENT + '-clear-icon'
);

const searchGitHubUsersUserError: string = cySelector(
  BASE_SELECTOR_GITHUB_COMPONENT + '-user-error'
);

const searchGitHubUsersUserDataContent: string = cySelector(
  BASE_SELECTOR_GITHUB_COMPONENT + '-user-data-content'
);

const searchGitHubUsersPersonalData: string = cySelector(
  BASE_SELECTOR_GITHUB_COMPONENT + '-personal-data'
);

const searchGitHubUsersRepositoriesData: string = cySelector(
  BASE_SELECTOR_GITHUB_COMPONENT + '-repositories-data'
);

const searchGitHubUsersRepositoriesError: string = cySelector(
  BASE_SELECTOR_GITHUB_COMPONENT + '-repositories-error'
);

const homeSelectors = {
  sectionHomePage,
  searchGitHubUsers,
  searchGitHubUsersLogo,
  searchGitHubUsersInput,
  searchGitHubUsersClearIcon,
  searchGitHubUsersUserError,
  searchGitHubUsersUserDataContent,
  searchGitHubUsersPersonalData,
  searchGitHubUsersRepositoriesData,
  searchGitHubUsersRepositoriesError,
};

export default homeSelectors;
