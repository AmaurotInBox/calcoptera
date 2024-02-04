<script setup lang="ts">
interface ILoaderProps {
  size?: number
  color?: string
  strokeWidth?: number
}
withDefaults(defineProps<ILoaderProps>(), {
  size: 24,
  color: '#000000',
  strokeWidth: 2,
})
</script>

<template>
  <div class="v-loader" :style="{ width: size + 'px', height: size + 'px' }">
    <svg
      class="svg"
      :width="size"
      :height="size"
      :viewBox="`0 0 ${size} ${size}`"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2"
        stroke="currentColor"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.v-loader {
  display: block;
  position: relative;
  color: currentColor;

  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }

  .svg {
    animation: rotate 1s linear infinite;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;

    @keyframes rotate {
      0% {
        transform: translate(-50%, -50%) rotate(0deg);
      }
      100% {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }
  }
}
</style>
