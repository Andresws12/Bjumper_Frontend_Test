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
        class="search-github-users__input"
        type="text"
        @keyup.enter="searchUser"
      />
      <img
        v-if="searchQuery"
        class="search-github-users__clear-icon"
        src="@/assets/icons/close.svg"
        alt="Clear"
        width="20"
        @click="clearSearchQuery"
      />
    </div>
    <div v-if="error" class="search-github-users__error">
      {{ error }}
    </div>
    <div v-else-if="user" class="search-github-users__data-content">
      <UserPersonalDataGithub :user="user" />
      <UserRepositoriesDataGithub :repos="repos" />
    </div>
  </article>
</template>

<script lang="ts" setup>
import UserPersonalDataGithub from './components/UserPersonalDataGithub.vue';
import UserRepositoriesDataGithub from './components/UserRepositoriesDataGithub.vue';

import { UserData, RepositoriesData } from '@/models/user/UserData';

import {
  getUsersService,
  getRepositoriesService,
} from '@/webservices/GithubWebservice';
import { ref, Ref } from 'vue';

const searchQuery: Ref<string> = ref('');
const user: Ref<UserData | null> = ref(null);
const repos: Ref<RepositoriesData> = ref({} as RepositoriesData);
const error: Ref<string> = ref('');

// The `searchUser` function is an asynchronous function that is responsible for searching for a user
// on GitHub based on the `searchQuery` value.
async function searchUser() {
  try {
    // Get the user data
    const userResponse = await getUsersService({ name: searchQuery.value });
    if (userResponse) {
      user.value = await userResponse;
      const reposResponse = await getRepositoriesService({
        name: searchQuery.value,
      });

      // Get the user repositories data if the user exists
      if (reposResponse) {
        repos.value = await reposResponse;
        error.value = '';
      }
    } else {
      user.value = null;
      repos.value = {} as RepositoriesData;
      error.value =
        'The user does not exist or there was an error while searching for it.';
    }
  } catch (err) {
    console.error(err);
    error.value =
      'The user does not exist or there was an error while searching for it.';
  }
}

// The `clearSearchQuery` function is responsible for clearing the search query and resetting the user
// and repositories data.
function clearSearchQuery() {
  searchQuery.value = '';
  user.value = null;
  repos.value = {} as RepositoriesData;
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
    padding: 16px;
    border: 1px solid $gray;
    border-radius: 8px;
    width: 100%;
    padding-right: 40px;

    &:focus,
    &:active {
      border-color: $white;
      box-shadow: $input-shadow;
      outline: none;
    }
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
