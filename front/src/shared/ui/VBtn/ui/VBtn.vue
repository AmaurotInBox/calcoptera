<script setup lang="ts">
import { VLoader } from '@/shared/ui/VLoader'
import { VText } from '@/shared/ui/VText'

interface IVBtnProps {
  disabled?: boolean
  loading?: boolean
  look?: 'primary' | 'secondary' | 'border'
  size?: 'm' | 's' | 'xs' | 'xxs'
  type?: 'btn' | 'icon'
}

interface IVBtnEmits {
  (event: 'click', e: Event): void
}

const props = withDefaults(defineProps<IVBtnProps>(), {
  disabled: false,
  to: undefined,
  loading: false,
  look: 'primary',
  size: 'm',
  type: 'btn',
})

const emit = defineEmits<IVBtnEmits>()

const onClick = (e: Event) => {
  if (!props.disabled && !props.loading) {
    emit('click', e)
  }
}
</script>

<template>
  <button
    :disabled="props.disabled"
    :class="[
      'v-btn',
      props.look,
      props.size,
      props.disabled && 'disabled',
      props.loading && 'loading',
      props.type,
    ]"
    :tabindex="props.disabled ? -1 : 0"
    @click="onClick"
  >
    <div v-if="$slots.leadingIcon" :class="['leading-icon', props.loading && 'hidden']">
      <slot name="leadingIcon" />
    </div>

    <VText type="btn" weight="bold" :class="['text', props.loading && 'hidden']">
      <slot />
    </VText>

    <div v-if="$slots.trailingIcon" :class="['trailing-icon', props.loading && 'hidden']">
      <slot name="trailingIcon" />
    </div>

    <div v-show="props.loading" class="loader">
      <VLoader />
    </div>
  </button>
</template>

<style lang="scss" scoped>
$button-sizes: (
  'm': (
    'btn-size': 48px,
    'padding': 10px 23px,
    'icon-size': 18px,
    'gap': 8px,
  ),
);

$button-looks: (
  'primary': (
    'bg': var(--surface-btn-primary),
    'color': var(--text-on-btn-primary),
    'icon-color': var(--icon-on-btn-primary),
    'hover-bg': var(--surface-btn-primary-hover),
    'disabled-opacity': 0.3,
  ),
  'secondary': (
    'bg': var(--surface-btn-secondary),
    'color': var(--text-on-btn-secondary),
    'icon-color': var(--icon-on-btn-secondary),
    'hover-bg': var(--surface-btn-secondary-hover),
    'disabled-opacity': 0.5,
  ),
  'border': (
    'bg': var(--surface-btn-border),
    'color': var(--text-on-btn-border),
    'icon-color': var(--icon-on-btn-border),
    'border': 1px solid var(--border-primary),
    'border-hover': 1px solid var(--border-primary-hover),
    'disabled-opacity': 0.5,
  ),
);

.v-btn {
  $VBtn: &;
  display: inline-flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  vertical-align: middle;
  cursor: pointer;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  border: none;
  outline: none;
  transition: background var(--main-transition-length);

  @each $size, $values in $button-sizes {
    gap: map-get($values, 'gap');

    &.#{$size} {
      height: map-get($values, 'btn-size');
      min-width: map-get($values, 'btn-size');
      padding: map-get($values, 'padding');

      &.icon {
        max-width: map-get($values, 'btn-size');

        .text,
        :deep(.text > *) {
          width: map-get($values, 'icon-size');
          height: map-get($values, 'icon-size');
        }
      }

      .leading-icon,
      .trailing-icon,
      .loader,
      :deep(.trailing-icon > *),
      :deep(.leading-icon > *),
      :deep(.loader > *) {
        width: map-get($values, 'icon-size') !important;
        height: map-get($values, 'icon-size') !important;
      }
    }
  }

  @each $look, $values in $button-looks {
    &.#{$look} {
      background: map-get($values, 'bg');

      .text {
        color: map-get($values, 'color');
      }

      .leading-icon,
      .trailing-icon,
      .loader {
        color: map-get($values, 'icon-color');
      }

      @if map-get($values, 'border') {
        border: map-get($values, 'border');
      } @else {
        border: 1px solid transparent;
      }

      &:hover,
      &:active,
      &:focus {
        background: map-get($values, 'hover-bg');
        border: map-get($values, 'border-hover');
      }

      &.disabled,
      &[disabled] {
        opacity: map-get($values, 'disabled-opacity');
        cursor: not-allowed;
      }
    }
  }

  .leading-icon,
  .trailing-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &.loading {
    opacity: 1;
  }

  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .hidden {
    opacity: 0;
  }
}
</style>
