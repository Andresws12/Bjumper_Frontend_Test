<template>
  <article class="search-github-users" data-cy="home-search-github-users">
    <div class="search-github-users__logo-container">
      <img
        class="search-github-users__logo"
        data-cy="home-search-github-users-logo"
        src="@/assets/icons/bjumperLogo.svg"
        alt="Bjumper logo"
        title="Bjumper logo"
        width="250px"
      />
    </div>
    <div class="search-github-users__input-container">
      <input
        v-model="searchQuery"
        class="search-github-users__input input"
        data-cy="home-search-github-users-input"
        type="text"
        :placeholder="$t('views.home.input.placeholder')"
        @keyup="debounceSearchUser"
      />
      <img
        v-if="searchQuery || user"
        class="search-github-users__clear-icon"
        src="@/assets/icons/close.svg"
        data-cy="home-search-github-users-clear-icon"
        alt="Clear"
        width="20"
        @click="clearSearchQuery(false)"
      />
    </div>
    <div
      v-if="error && searchQuery"
      class="search-github-users__error"
      data-cy="home-search-github-users-user-error"
    >
      {{
        $t('common.notifications.error.apiGithubUserError', {
          name: '@' + searchQuery,
        })
      }}
    </div>
    <div
      v-else-if="user && searchQuery"
      class="search-github-users__data-content"
      data-cy="home-search-github-users-user-data-content"
    >
      <UserPersonalDataGithub
        v-if="!loading"
        :user="user"
        data-cy="home-search-github-users-personal-data"
      />
      <UserRepositoriesDataGithub
        v-if="!loading && repos.length > 0"
        :repos="repos"
        data-cy="home-search-github-users-repositories-data"
      />
      <div
        v-if="errorRepos && searchQuery"
        class="search-github-users__error"
        data-cy="home-search-github-users-repositories-error"
      >
        {{
          $t('common.notifications.error.apiGithubReposError', {
            name: '@' + searchQuery,
          })
        }}
      </div>
      <GithubSkeleton v-if="loading" />
    </div>
  </article>
</template>

<script lang="ts" setup>
import UserPersonalDataGithub from './components/UserPersonalDataGithub.vue';
import UserRepositoriesDataGithub from './components/UserRepositoriesDataGithub.vue';
import GithubSkeleton from '@/components/common/GithubSkeleton.vue';

import { UserData, RepositoriesData } from '@/models/user/UserData';
import {
  getUsersService,
  getRepositoriesService,
} from '@/webservices/GithubWebservice';

import { ref, Ref } from 'vue';

const searchQuery: Ref<string> = ref('');
const user: Ref<UserData | null> = ref(null);
const repos: Ref<RepositoriesData[]> = ref([]);
const error: Ref<boolean> = ref(false);
const errorRepos: Ref<boolean> = ref(false);
const loading: Ref<boolean> = ref(false);

let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

// The `clearSearchQuery` function is responsible for clearing the search query and resetting the user,
// repositories, and error states.
function clearSearchQuery(isWriting: boolean) {
  if (!isWriting) {
    searchQuery.value = '';
  }
  user.value = null;
  repos.value = [];
  error.value = false;
  errorRepos.value = false;
}

// The `searchUser` function is an asynchronous function that is responsible for searching for a user
// on GitHub based on the `searchQuery` value.
async function searchUser() {
  try {
    loading.value = true;
    error.value = false;
    errorRepos.value = false;

    // Get the user data
    const userResponse = await getUsersService({ name: searchQuery.value });

    if (userResponse) {
      user.value = await userResponse;

      // Get the user repositories data if the user exists
      const reposResponse = await getRepositoriesService({
        name: searchQuery.value,
      });

      if (reposResponse.length > 0) {
        repos.value = await reposResponse;
        errorRepos.value = false;
      } else {
        repos.value = [];
        errorRepos.value = true;
      }
    }

    loading.value = false;
  } catch (err) {
    console.error(err);
    error.value = true;
    loading.value = false;
  }
}

// The `debounceSearchUser` function is responsible for debouncing the `searchUser` function.
function debounceSearchUser() {
  clearSearchQuery(true);
  return new Promise(resolve => {
    // Clear the previous debounce timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set a new debounce timeout
    debounceTimeout = setTimeout(() => {
      resolve(searchUser());
    }, 500);
  });
}
</script>

<style lang="scss" scoped>
.search-github-users {
  width: 70vw;

  &__data-content {
    padding: 10px;
    background: $white;
    border-color: $white;
    box-shadow: $input-shadow;
    border-radius: 0.5rem;
    margin-top: 5px;
  }

  &__logo-container {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
  }

  &__logo {
    display: flex;
    justify-self: center;
  }

  &__input-container {
    position: relative;
    display: flex;
  }

  &__input {
    width: 100%;
    padding-right: 40px;
  }

  &__clear-icon {
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    cursor: pointer;
  }

  &__error {
    color: $main-color-fail-lighter;
    margin-top: 16px;
  }
}
</style>
