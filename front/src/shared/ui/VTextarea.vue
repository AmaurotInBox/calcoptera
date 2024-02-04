<script setup lang="ts">
import { watch, computed } from 'vue'
import { useField } from 'vee-validate'
import _debounce from 'lodash/debounce'
import { getDomRef } from '@/shared/hooks/getDomRef'
import type { TValidator } from '@/shared/types/validator'

interface ITextareaProps {
  id: string
  name: string
  label?: string
  hideLabel?: boolean
  hideDescription?: boolean
  required?: boolean
  validation?: [TValidator]
  modelValue?: string | number
  disabled?: boolean
  placeholder?: string
  autofocus?: boolean
  readonly?: boolean
  description?: string
  errorMessage?: string
  debounce?: number
}
interface ITextareaEmits {
  (event: 'debounced-input', value: string, e: Event): void
  (event: 'update:modelValue', value: string, e: Event): void
  (event: 'blur', e: FocusEvent): void
}
const props = withDefaults(defineProps<ITextareaProps>(), {
  hideLabel: false,
  hideDescription: false,
  required: false,
  modelValue: undefined,
  disabled: false,
  placeholder: undefined,
  autofocus: false,
  readonly: false,
  description: '',
  errorMessage: '',
  debounce: undefined,
})
const emit = defineEmits<ITextareaEmits>()

const localValidation = computed(() => props.validation)
const { errors, value, handleChange } = useField<string | readonly string[] | number | undefined>(
  props.id,
  localValidation.value,
  {
    initialValue: props.modelValue,
    validateOnValueUpdate: false,
    syncVModel: false,
  },
)

const inputRef = getDomRef<HTMLElement>(null)
const debouncedInput = _debounce(
  (value: string, e: InputEvent) => emit('debounced-input', value, e),
  props.debounce || 0,
)

const onInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value

  if (errors.value.length > 0) {
    handleChange(value)
  }

  emit('update:modelValue', value, e)

  if (props.debounce !== undefined) {
    debouncedInput(value, e as InputEvent)
  }
}
const onBlur = (e: FocusEvent) => {
  const value = (e.target as HTMLInputElement).value

  handleChange(value)

  emit('blur', e)
}

watch(
  () => props.modelValue,
  (newModelValue) => {
    value.value = newModelValue
  },
)
</script>

<template>
  <div
    :class="[
      'v-textarea',
      props.disabled && 'disabled',
      errors.length > 0 && 'error',
      $attrs.class,
    ]"
  >
    <textarea
      :id="props.id"
      ref="inputRef"
      :name="props.name"
      :value="value"
      :placeholder="props.placeholder"
      :required="props.required"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :autofocus="props.autofocus"
      v-bind="$attrs"
      @input="onInput"
      @blur="onBlur"
    />
  </div>
</template>

<style lang="scss" scoped>
.v-textarea {
  width: 100%;

  textarea {
    @include body-s;
    @include font-weight-medium;
    @include vertical-scroll;
    outline: none !important;
    color: var(--text-secondary);
    background: var(--surface-primary);
    border: none;
    border-radius: 6px;
    padding: 14px 16px;
    width: 100%;
    resize: none;
    outline: none !important;
  }

  textarea::placeholder {
    @include body-s;
    @include font-weight-medium;
    opacity: 1;
    color: var(--text-secondary);
  }

  &.disabled {
    opacity: 0.5;
  }
}
</style>
@/shared/composables/getDomRef