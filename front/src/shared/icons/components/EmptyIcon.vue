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
    <path
      d="M3 12C3 7.02944 7.02944 3 12 3V3V3C16.9706 3 21 7.02944 21 12V12V12C21 16.9706 16.9706 21 12 21V21V21C7.02944 21 3 16.9706 3 12V12V12Z"
      stroke="currentColor"
      stroke-width="2"
    />
  </svg>
</template>
