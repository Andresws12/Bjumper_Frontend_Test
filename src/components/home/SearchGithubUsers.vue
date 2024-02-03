<template>
  <article class="search-github-users">
    <div class="search-github-users__logo-container">
      <img
        class="search-github-users__logo"
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
        type="text"
        :placeholder="$t('views.home.input.placeholder')"
        @keyup="debounceSearchUser"
      />
      <img
        v-if="searchQuery || user"
        class="search-github-users__clear-icon"
        src="@/assets/icons/close.svg"
        alt="Clear"
        width="20"
        @click="clearSearchQuery"
      />
    </div>
    <div v-if="error && searchQuery" class="search-github-users__error">
      {{ error }}
    </div>
    <div
      v-else-if="user && searchQuery"
      class="search-github-users__data-content"
    >
      <UserPersonalDataGithub v-if="!loading" :user="user" />
      <UserRepositoriesDataGithub
        v-if="!loading && repos.length > 0"
        :repos="repos"
      />
      <div v-if="errorRepos && searchQuery" class="search-github-users__error">
        {{ errorRepos }}
      </div>
      <GithubSkeleton v-if="loading" />
    </div>
  </article>
</template>

<script lang="ts" setup>
import UserPersonalDataGithub from './components/UserPersonalDataGithub.vue';
import UserRepositoriesDataGithub from './components/UserRepositoriesDataGithub.vue';
import GithubSkeleton from '@/components/common/GithubSkeleton.vue';

import { useI18n } from 'vue-i18n';

import { UserData, RepositoriesData } from '@/models/user/UserData';
import {
  getUsersService,
  getRepositoriesService,
} from '@/webservices/GithubWebservice';
import { ref, Ref, watch } from 'vue';

const { t, locale } = useI18n();

const searchQuery: Ref<string> = ref('');
const user: Ref<UserData | null> = ref(null);
const repos: Ref<RepositoriesData[]> = ref([]);
const error: Ref<string> = ref('');
const errorRepos: Ref<string> = ref('');
const loading: Ref<boolean> = ref(false);

let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

// The `clearSearchQuery` function is responsible for clearing the search query and resetting the user
// and repositories data.
function clearSearchQuery() {
  searchQuery.value = '';
  user.value = null;
  repos.value = [];
}

// The `searchUser` function is an asynchronous function that is responsible for searching for a user
// on GitHub based on the `searchQuery` value.
async function searchUser() {
  try {
    loading.value = true;

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
        errorRepos.value = '';
      } else {
        repos.value = [];
        errorRepos.value = t('common.notifications.error.apiGithubReposError');
      }
    }

    loading.value = false;
  } catch (err) {
    console.error(err);
    error.value = t('common.notifications.error.apiGithubUserError');
    loading.value = false;
  }
}

// The `debounceSearchUser` function is responsible for debouncing the `searchUser` function.
function debounceSearchUser() {
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
// Watch the `locale` value to reset the error messages when the locale changes
watch(
  () => locale.value,
  () => {
    if (error.value) {
      error.value = t('common.notifications.error.apiGithubUserError');
    }
    if (errorRepos.value) {
      errorRepos.value = t('common.notifications.error.apiGithubReposError');
    }
  }
);
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
