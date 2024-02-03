<template>
  <h2>{{ $t('views.home.user.repositories') }}</h2>
  <div class="user-repos-data-github">
    <UserRepositoryDataGithub
      v-for="repo in props.repos"
      :key="repo.id"
      :repo="repo"
    />
  </div>
</template>
<script lang="ts" setup>
import UserRepositoryDataGithub from './UserRepositoryDataGithub.vue';

import { defineProps } from 'vue';

const props = defineProps({
  repos: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.user-repos-data-github {
  margin-top: 16px;
  max-height: 550px;
  overflow-y: auto;
}
</style>
