<script lang="ts" setup>
import { v4 as uuid } from 'uuid'

const UID = uuid()
</script>

<template>
  <svg class="loader" width="42px" height="42px" xmlns="http://www.w3.org/2000/svg">
    <circle
      class="path"
      fill="transparent"
      stroke-width="12%"
      cx="50%"
      cy="50%"
      r="44%"
      :stroke="`url(#${UID})`"
    />
    <linearGradient :id="UID">
      <stop offset="10%" stop-opacity="1" />
      <stop offset="15%" stop-opacity=".8" />
      <stop offset="20%" stop-opacity=".6" />
      <stop offset="50%" stop-opacity=".4" />
      <stop offset="100%" stop-opacity="0" />
    </linearGradient>
  </svg>
</template>

<style scoped lang="scss">
.loader {
  animation: rotate 1s linear infinite;
  position: relative;

  stop {
    stop-color: var(--button-primary);
  }
}

.path {
  stroke-dasharray: 200%;
  stroke-dashoffset: 30%;
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
