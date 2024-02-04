<template>
  <div class="user-repos-data-github">
    <h2 class="user-repos-data-github__title">
      {{ $t('views.home.user.repositories') }}
    </h2>
    <div class="user-repos-data-github__repos-container">
      <UserRepositoryDataGithub
        v-for="repo in props.repos"
        :key="repo.id"
        :repo="repo"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import UserRepositoryDataGithub from './UserRepositoryDataGithub.vue';

const props = defineProps({
  repos: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.user-repos-data-github {
  &__repos-container {
    margin-top: 16px;
    max-height: 550px;
    overflow-y: auto;
  }
}
</style>
