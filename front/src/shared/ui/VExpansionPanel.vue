<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { getDomRef } from '../hooks/getDomRef'

interface IExpansionPanelProps {
  isActive?: boolean
}

const props = withDefaults(defineProps<IExpansionPanelProps>(), {
  isActive: false,
})

const panel = getDomRef<HTMLDivElement | null>(null)
const active = ref(props.isActive)

watch(
  () => props.isActive,
  (value) => {
    active.value = value
  },
)

const _active = computed(() => {
  return panel?.value && active.value
})

const onClick = () => {
  active.value = !active.value
}
</script>

<template>
  <div class="expansion-panel">
    <div @click="onClick">
      <slot name="activator" :isActive="active" />
    </div>
    <div v-show="_active" ref="panel">
      <slot name="panel" :isActive="active" />
    </div>
  </div>
</template>
../composables/getDomRef