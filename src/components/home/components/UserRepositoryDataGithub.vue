<template>
  <div class="user-repo-data-github">
    <div class="user-repo-data-github__name">{{ props.repo.name }}</div>
    <div class="user-repo-data-github__stats">
      <div class="user-repo-data-github__forks">
        <img
          class="search-github-users__clear-icon"
          src="@/assets/icons/fork.svg"
          alt="Clear"
          width="20"
        />
        {{ $t('views.home.github.forks') }}{{ props.repo.forks }}
      </div>
      <div class="user-repo-data-github__stars">
        <img
          class="search-github-users__clear-icon"
          src="@/assets/icons/star.svg"
          alt="Clear"
          width="20"
        />
        {{ $t('views.home.github.stars') }}{{ props.repo.stargazers_count }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({
  repo: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.user-repo-data-github {
  margin-top: 16px;
  padding: 16px;
  border: 1px solid $gray;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__name {
    font-weight: bold;
    font-size: 1.1rem;
  }

  &__stats {
    display: flex;
    margin-top: 8px;
  }

  &__forks {
    margin-right: 16px;
  }
}
</style>
