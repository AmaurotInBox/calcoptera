<script setup lang="ts">
import { computed } from 'vue'
import { getDomRef } from '@/shared/hooks/getDomRef'
import VBtn from '@/shared/ui/VBtn.vue'
import CloseIcon from '@/shared/icons/CloseIcon.vue'

interface IModalProps {
  show?: boolean
  backdrop?: boolean
  closeOnOutSideClick?: boolean
  hideCloseButton?: boolean
  title?: string
  subtitle?: string
  acceptText?: string
  cancelText?: string
  empty?: boolean
}
interface IModalEmits {
  (e: 'close'): void
  (e: 'accept'): void
  (e: 'cancel'): void
}
const props = withDefaults(defineProps<IModalProps>(), {
  show: false,
  backdrop: true,
  closeOnOutSideClick: true,
  hideCloseButton: false,
  title: '',
  subtitle: '',
  acceptText: '',
  cancelText: '',
  empty: false,
})
const emit = defineEmits<IModalEmits>()

const modalRef = getDomRef<HTMLElement>(null)
const show = computed(() => props.show)

const onClose = () => {
  emit('close')
}

const onClick = (event: Event) => {
  if (event.target === modalRef.value && props.closeOnOutSideClick) {
    onClose()
  }
}

const onAccept = () => {
  emit('accept')
}

const onCancel = () => {
  emit('cancel')
}
</script>

<template>
  <Teleport to="#modals-container">
    <div v-if="show" ref="modalRef" class="modal" @click="onClick">
      <div :class="['content', props.empty && 'empty']">
        <CloseIcon v-if="hideCloseButton === false" class="close-button" @click="onClose" />

        <slot name="header">
          <div v-if="props.title" class="title">{{ props.title }}</div>
          <div v-if="props.subtitle" class="subtitle">{{ props.subtitle }}</div>
        </slot>

        <slot />

        <slot name="footer">
          <div v-if="props.acceptText || props.acceptText" class="footer">
            <VBtn v-if="props.cancelText" look="border" @click="onCancel">
              {{ props.cancelText }}
            </VBtn>
            <VBtn v-if="props.acceptText" @click="onAccept">{{ props.acceptText }}</VBtn>
          </div>
        </slot>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.modal {
  @include modal-z-index;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background: var(--surface-overlay);
    opacity: 1;
  }
}

.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 520px;
  padding: 32px;
  background-color: var(--surface-tetriary);
  border-radius: 8px;

  &.empty {
    padding: unset;
  }
}

.close-button {
  outline: none;
  position: absolute;
  top: 16px;
  right: 16px;
  width: 24px;
  height: 24px;
  z-index: 1;
  cursor: pointer;

  :deep(path) {
    stroke: var(--icon-secondary);
  }

  &:hover,
  &:focus {
    :deep(path) {
      stroke: var(--icon-secondary-hover);
    }
  }
}

.title {
  @include headline-1;
  @include font-weight-semi-bold;
  color: var(--text-primary);
}

.subtitle {
  @include body-m;
  @include font-weight-regular;
  color: var(--text-secondary);
  margin-top: 8px;
}

.footer {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  width: 100%;
  margin-top: 24px;
}
</style>
@/shared/composables/getDomRef