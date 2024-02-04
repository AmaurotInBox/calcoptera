<script setup lang="ts">
import VLoader from './VLoader.vue'

defineProps<{
  text?: string
}>()
</script>

<template>
  <div class="loader-background">
    <div class="text" v-if="text">
      {{ text }}
    </div>
    <VLoader />
  </div>
</template>

<style lang="scss" scoped>
.loader-background {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--background);
}

.text {
  margin-bottom: 10px;
}
</style>
