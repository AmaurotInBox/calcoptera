<script setup lang="ts">
import { computed, watch } from 'vue'
import { useField } from 'vee-validate'
import CheckIcon from '@/shared/icons/CheckIcon.vue'

import type { TValidator } from '@/shared/types/validator'

defineOptions({
  inheritAttrs: false,
})

interface ICheckboxProps {
  id: string
  name: string
  label?: string
  description?: string | null
  validation?: [TValidator]
  required?: boolean
  disabled?: boolean
  hideLabel?: boolean
  modelValue?: boolean
  width?: string | number
  height?: string | number
}
interface CheckboxEmits {
  (event: 'click', value: boolean, e: MouseEvent): void
  (event: 'update:modelValue', value: boolean): void
}
const props = withDefaults(defineProps<ICheckboxProps>(), {
  description: null,
  width: 18,
  height: 18,
})
const emit = defineEmits<CheckboxEmits>()

const localValidation = computed(() => props.validation)
const { errors, value, validate } = useField<boolean>(props.id, localValidation.value, {
  initialValue: props.modelValue,
  type: 'checkbox',
  syncVModel: false,
})

const _width = computed(() => `${props.width}px`)
const _height = computed(() => `${props.height}px`)

const onClick = (e: MouseEvent) => {
  if (!props.disabled) {
    emit('update:modelValue', !value.value)
    emit('click', value.value, e)
  }
}

watch(
  () => props.modelValue,
  async () => {
    value.value = props.modelValue

    await validate({ mode: 'force' })
  },
)
</script>

<template>
  <div
    :class="['v-checkbox', disabled && 'disabled', errors.length > 0 && 'error', $attrs.class]"
    @click.stop.prevent="onClick"
  >
    <div class="wrapper">
      <input
        :id="id"
        :name="name"
        :value="value"
        :checked="value"
        type="checkbox"
        :required="required"
        :disabled="disabled"
        v-bind="$attrs"
        tabindex="-1"
      />
      <div class="checkmark" :style="{ width: _width, height: _height }">
        <slot name="icon">
          <CheckIcon />
        </slot>
      </div>
      <label :for="id" tabindex="-1" :class="['label', hideLabel && 'sr-only']">
        <slot name="label">
          {{ label }}
        </slot>
      </label>
    </div>
    <div v-if="description" :class="['description', hideLabel && 'sr-only']">
      <slot name="description">
        {{ description }}
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.v-checkbox {
  position: relative;
  cursor: pointer;
  user-select: none;
  outline: none;

  .wrapper {
    display: flex;
    align-items: center;

    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;

      &:checked ~ .checkmark {
        background-color: var(--control-active) !important;
        border: 1px solid var(--control-active) !important;
      }
    }

    .checkmark {
      background-color: var(--background);
      color: var(--icon-on-active);
      border-radius: 4px;
      border: 1px solid var(--border-primary);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .label {
      cursor: pointer;
      padding-left: 4px;
    }
  }

  &.disabled {
    opacity: 0.5;
  }

  &:hover {
    input ~ .checkmark {
      border: 1px solid var(--border-primary-hover);
    }
  }
}
</style>
