<script lang="ts" setup>
import type { IDefaultIconType } from '@/shared/icons'

const props = withDefaults(defineProps<IDefaultIconType>(), {
  width: 24,
  height: 24
})
</script>

<template>
  <svg
    :width="props.width"
    :height="props.height"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="1.5" />
  </svg>
</template>
