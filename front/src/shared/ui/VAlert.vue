<!-- Ссылка на Figma -->
<!-- https://www.figma.com/file/PnbjU3YyW6Y3C1lDIBrFmO/GateRevisor-Lib?type=design&node-id=423-4709&mode=design&t=QBUZl9hVOZsCUh2I-4 -->

<script setup lang="ts">
import SuccessIcon from '../icons/SuccessIcon.vue'
import WarningIcon from '../icons/WarningIcon.vue'
import ErrorIcon from '../icons/ErrorIcon.vue'

interface IAlertProps {
  type: 'success' | 'warning' | 'error'
  text?: string
  hideIcon?: boolean
}

const props = withDefaults(defineProps<IAlertProps>(), {
  text: '',
  hideIcon: false,
})
</script>

<template>
  <div :class="['alert', props.type]">
    <div v-if="!hideIcon" class="icon">
      <slot name="icon">
        <SuccessIcon v-if="props.type === 'success'" />
        <WarningIcon v-if="props.type === 'warning'" />
        <ErrorIcon v-if="props.type === 'error'" />
      </slot>
    </div>
    <div class="content">
      <slot>{{ props.text }}</slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.alert {
  @include shadow-m;
  display: flex;
  gap: 8px;
  padding: 16px;
  border-radius: 8px;

  &.success {
    background-color: var(--surface-success);
    border: 1px solid var(--border-success);
  }
  &.warning {
    background-color: var(--surface-warning);
    border: 1px solid var(--border-warning);
  }
  &.error {
    background-color: var(--surface-error);
    border: 1px solid var(--border-error);
  }
}
.content {
  @include body-m;
  @include font-weight-regular;
}
</style>
