<!-- Ссылка на Figma -->
<!-- https://www.figma.com/file/PnbjU3YyW6Y3C1lDIBrFmO/GateRevisor-Lib?type=design&node-id=81-12163&mode=design&t=QBUZl9hVOZsCUh2I-4 -->

<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import { useField } from 'vee-validate'
import _debounce from 'lodash/debounce'
import omit from 'lodash/omit'
import { getDomRef } from '@/shared/composables/getDomRef'
import { useError } from '@/shared/composables/useError'
import CloseIcon from '@/shared/icons/CloseIcon.vue'
import type { TValidator } from '@/shared/types/validator'

defineOptions({
  inheritAttrs: false,
})

interface IInputProps {
  id: string
  name: string
  label?: string
  hideLabel?: boolean
  hideError?: boolean
  required?: boolean
  validation?: [TValidator]
  modelValue?: string | number
  disabled?: boolean
  placeholder?: string
  autofocus?: boolean
  readonly?: boolean
  errorMessage?: string
  autocomplete?: string
  debounce?: number | null
  hasError?: boolean
  clearable?: boolean
  focus?: boolean
  filled?: boolean
}
interface IInputEmits {
  (event: 'debounced-input', value: string, e: Event): void
  (event: 'update:modelValue', value: string, inputElem: HTMLInputElement): void
  (event: 'leading-icon-click', e: MouseEvent): void
  (event: 'trailing-icon-click', e: MouseEvent): void
  (event: 'blur', e?: FocusEvent | undefined): void
  (event: 'focus', e?: FocusEvent | undefined): void
  (event: 'clear', e: Event): void
}
const props = withDefaults(defineProps<IInputProps>(), {
  label: 'label',
  placeholder: 'placeholder',
  errorMessage: '',
  autocomplete: 'off',
  clearable: true,
})
const emit = defineEmits<IInputEmits>()

const inputRef = getDomRef<HTMLInputElement>(null)
const debouncedInput = _debounce(
  (value: string, e: Event) => emit('debounced-input', value, e),
  props.debounce || 0,
)
const localValidation = computed(() => props.validation)
const inputFocused = ref(false)
const { errors, value, handleChange } = useField<string | number | undefined | null>(
  props.id,
  localValidation.value,
  {
    initialValue: props.modelValue,
    validateOnValueUpdate: false,
    type: 'default',
    syncVModel: false,
  },
)

const _error = computed(() => {
  if (props.errorMessage) {
    return useError(props.hasError, [...errors.value, props.errorMessage])
  }
  return useError(props.hasError, errors.value)
})
const _focus = computed(() => props.focus || inputFocused.value)
const _filled = computed(() => props.filled || !!value.value)

const onInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value

  if (errors.value.length > 0) {
    handleChange(value)
  }

  emit('update:modelValue', value, inputRef.value)

  if (props.debounce !== null) {
    debouncedInput(value, e)
  }
}

const onBlur = (e: FocusEvent) => {
  const value = (e.target as HTMLInputElement).value

  handleChange(value)
  inputFocused.value = false

  emit('blur', e)
}

const onFocus = (e: FocusEvent) => {
  inputFocused.value = true

  emit('focus', e)
}

const onClear = (e: Event) => {
  if (props.disabled) {
    return
  }

  handleChange('')

  emit('update:modelValue', '', inputRef.value)

  debouncedInput('', e)

  emit('clear', e)

  inputRef.value.focus()
}

watch(
  () => props.modelValue,
  (newModelValue) => {
    value.value = newModelValue
  },
)

defineExpose({
  handleChange,
  inputRef,
})
</script>

<template>
  <div :class="['v-input', props.hideError && 'hide-error', $attrs.class]">
    <div
      :class="[
        'input-wrapper',
        $slots.leadingIcon && 'has-leading-icon',
        $slots.trailingIcon && 'has-trailing-icon',
        props.clearable && 'clearable',
        props.disabled && 'disabled',
        _error.hasError && 'error',
        _focus && 'focus',
        _filled && 'filled',
      ]"
    >
      <label
        :for="props.id"
        :class="[
          'label',
          $slots.leadingIcon && 'has-leading-icon',
          _focus && 'focus',
          _filled && 'filled',
          props.hideLabel && 'hide-label',
        ]"
      >
        {{ props.label }}
        <sup v-if="props.required">*</sup>
      </label>

      <div
        :class="[
          'input',
          _focus && !props.hideLabel && 'focus',
          _filled && !props.hideLabel && 'filled',
        ]"
      >
        <div
          v-if="$slots.leadingIcon"
          class="leading-icon"
          @click="$emit('leading-icon-click', $event)"
        >
          <slot name="leadingIcon" />
        </div>

        <slot name="input">
          <input
            :id="props.id"
            ref="inputRef"
            :name="props.name"
            :value="value"
            :placeholder="props.hideLabel ? props.placeholder : undefined"
            :required="props.required"
            :autocomplete="props.autocomplete"
            :disabled="props.disabled"
            :readonly="props.readonly"
            :autofocus="props.autofocus"
            type="text"
            v-bind="omit($attrs, ['class'])"
            @input="onInput"
            @focus="onFocus"
            @blur="onBlur"
          />
        </slot>

        <div v-show="props.clearable && value" class="clearable-icon" @click="onClear">
          <CloseIcon />
        </div>

        <div
          v-if="$slots.trailingIcon"
          class="trailing-icon"
          @click="$emit('trailing-icon-click', $event)"
        >
          <slot name="trailingIcon" />
        </div>
      </div>
    </div>

    <div :class="['error-text', props.hideError && 'hide-error']">
      {{ _error.errorMessages }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.v-input {
  position: relative;
  padding-bottom: 20px;

  &.hide-error {
    padding-bottom: 0;
  }
}

.input-wrapper {
  position: relative;
  width: 100%;
  height: 48px;
  background-color: var(--surface-primary);
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 0 8px;

  &:not(.disabled):hover {
    border: 1px solid var(--border-primary);
  }

  &.error {
    background-color: var(--surface-primary);
    border: 1px solid var(--border-error);
  }

  &.focus {
    background-color: var(--background);
    border: 1px solid var(--border-active);

    :deep(.leading-icon svg *) {
      stroke: var(--icon-secondary-hover);
    }
  }

  &.filled {
    :deep(.leading-icon svg *) {
      stroke: var(--icon-secondary-hover);
    }
  }

  &.disabled {
    opacity: 0.5;

    .clearable-icon,
    input {
      cursor: not-allowed;
    }
  }
}

.input {
  display: flex;
  align-items: center;

  input {
    @include body-s;
    @include font-weight-medium;
    background-clip: padding-box !important; // remove box shadow on iOS
    outline: none;
    color: var(--text-primary);
    border: none;
    background: transparent;
    padding: 14px 8px;
    width: 100%;
  }

  input::placeholder {
    @include body-s;
    @include font-weight-medium;
    color: var(--text-secondary);
    opacity: 1;
  }

  &.focus,
  &.filled {
    input {
      padding: 23px 8px 5px;
    }
  }
}

.label {
  @include body-s;
  @include font-weight-medium;
  position: absolute;
  top: 14px;
  left: 16px;
  color: var(--text-secondary);

  &.has-leading-icon {
    left: 56px;
  }

  &.focus,
  &.filled {
    @include body-xs;
    @include font-weight-regular;
    top: 5px;
  }
  &.hide-label {
    display: none;
  }
}

.clearable-icon {
  height: 100%;
  padding: 12px 8px;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }

  :deep(svg *) {
    stroke: var(--icon-secondary);
  }

  &:hover {
    :deep(svg *) {
      stroke: var(--icon-secondary-hover);
    }
  }
}

.leading-icon,
.trailing-icon {
  height: 100%;
  padding: 12px 8px;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }

  :deep(svg *) {
    stroke: var(--icon-secondary);
  }

  &:hover {
    :deep(svg *) {
      stroke: var(--icon-secondary-hover);
    }
  }
}

.error-text {
  @include body-xs;
  @include font-weight-medium;
  position: absolute;
  bottom: 0;
  left: 0;
  color: var(--text-error);

  &.hide-error {
    display: none;
  }
}
</style>
@/shared/composables/getDomRef@/shared/composables/useError
