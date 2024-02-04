<script lang="ts" setup>
interface IVTextProps {
  as?: string
  type?: 'b1' | 'btn'
  weight?: 'regular' | 'semi-bold' | 'bold'
}

const props = withDefaults(defineProps<IVTextProps>(), {
  as: 'div',
  type: 'b1',
  weight: 'regular',
})
</script>
<template>
  <component :is="props.as" :class="['v-text', props.type, props.weight]">
    <slot />
  </component>
</template>
<style lang="scss" scoped>
$text-types: (
  'b1': (
    'font-size': 16px,
    'line-height': 24px,
  ),
  'btn': (
    'font-size': 16px,
    'line-height': 24px,
  ),
);

$text-weights: (
  'regular': (
    'font-weight': 400,
  ),
  'semi-bold': (
    'font-weight': 500,
  ),
  'bold': (
    'font-weight': 600,
  ),
);

.v-text {
  color: currentColor;

  @each $type, $values in $text-types {
    &.#{$type} {
      font-size: map-get($values, 'font-size');
      line-height: map-get($values, 'line-height');
    }
  }

  @each $weight, $values in $text-weights {
    &.#{$weight} {
      font-weight: map-get($values, 'font-weight');
    }
  }
}
</style>
