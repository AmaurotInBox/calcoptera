<script setup lang="ts">
import type { IContent } from '../types/container.ts'

interface ITableContainerProps {
  content: IContent[]
}

defineProps<ITableContainerProps>()
</script>

<template>
  <div class="table-container">
    <div
      v-for="(item, index) in content"
      :key="index"
      :style="item.style"
      class="table-container__item"
    >
      <slot :name="item.name" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.table-container {
  width: 100%;
  display: flex;
  align-items: center;

  &__item {
    flex-grow: 1;
  }
}
</style>
