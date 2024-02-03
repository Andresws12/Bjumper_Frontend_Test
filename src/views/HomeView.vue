<template>
  <section class="home-view" data-cy="home-section">
    <search-github-users />
  </section>
</template>

<script lang="ts" setup>
import SearchGithubUsers from '@/components/home/SearchGithubUsers.vue';
</script>

<style lang="scss" scoped>
.home-view {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
