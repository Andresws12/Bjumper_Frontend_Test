<template>
  <div class="user-personal-data-github">
    <img
      :src="props.user.avatar_url"
      alt="Avatar"
      class="user-personal-data-github__avatar"
    />
    <div class="user-personal-data-github__info">
      <div class="user-personal-data-github__username">
        {{ '@' + props.user.login }}
      </div>
      <div class="user-personal-data-github__fullname is-secondary">
        {{ props.user.name }}
      </div>
      <div class="user-personal-data-github__followers is-secondary">
        {{ $t('views.home.user.followers') }}{{ props.user.followers }}
      </div>
      <div class="user-personal-data-github__bio is-secondary">
        {{ props.user.bio }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.user-personal-data-github {
  display: flex;
  align-items: center;

  &__avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 16px;
  }

  &__info {
    display: flex;
    flex-direction: column;
  }

  &__username {
    font-weight: bold;
    font-size: 1.2rem;
  }

  & .is-secondary {
    margin-top: 8px;
  }
}
</style>
