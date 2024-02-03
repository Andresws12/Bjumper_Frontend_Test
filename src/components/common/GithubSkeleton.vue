<template>
  <div class="skeleton">
    <div class="skeleton__item"></div>
    <div class="skeleton__item"></div>
    <div class="skeleton__item"></div>
  </div>
</template>
<style lang="scss" scoped>
.skeleton {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;

  &__item {
    width: 100%;
    height: 20px;
    background-color: $gray-light;
    margin-bottom: 10px;
    border-radius: 4px;
  }
}
</style>
