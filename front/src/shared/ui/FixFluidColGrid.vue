<template>
  <div class="col">
    <div v-if="$slots['fix-top-part']" class="col__fix-part">
      <slot name="fix-top-part" />
    </div>
    <div class="col__fluid-part">
      <div class="col__fluid-part__container">
        <slot name="fluid-part" />
      </div>
    </div>
    <div v-if="$slots['fix-bottom-part']" class="col__fix-part">
      <slot name="fix-bottom-part" />
    </div>
    <slot name="absolute-element" />
  </div>
</template>

<style scoped lang="scss">
.col {
  display: flex;
  position: relative;
  height: 100%;
  flex-direction: column;

  &__fix-part {
    flex-grow: 0;
  }

  &__fluid-part {
    flex-grow: 1;
    position: relative;

    &__container {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
}
</style>
