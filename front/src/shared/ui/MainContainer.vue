<template>
  <div class="main-container">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.main-container {
  @include main-container-width;
  margin: 0 auto;
}
</style>
