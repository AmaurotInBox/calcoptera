<script lang="ts" setup>
import { ref, computed } from 'vue'
import { getSizeFromProps } from '@/shared/composables/getSizeFromProps'
import { VImage } from '@/shared/ui/VImage'

interface IVExpandingCardsProps {
  items: Array<any>
  gap?: number | string
  activeIndex?: number | string
  transitionDuration?: number | string
  borderRadius?: number | string
}
const props = withDefaults(defineProps<IVExpandingCardsProps>(), {
  gap: 20,
  activeIndex: 0,
  transitionDuration: 300,
  borderRadius: 20
})

const _items = computed(() => props.items)
const _gap = computed(() => getSizeFromProps(props.gap))
const _transitionDuration = computed(() => getSizeFromProps(props.transitionDuration, 'ms'))
const _borderRadius = computed(() => getSizeFromProps(props.borderRadius))

const itemsLength = computed(() => _items.value.length)

const _flex = computed(() => 1 / itemsLength.value)
const _activeFlex = computed(() => itemsLength.value)

const _activeIndex = ref(+props.activeIndex)

const onClick = (index: number) => (_activeIndex.value = index)
</script>

<template>
  <div class="expanding-cards" :style="{ gap: _gap }">
    <div
      v-for="(item, index) in _items"
      :key="index"
      class="expanding-cards__card"
      :class="[_activeIndex === index && 'active']"
      :style="{
        transitionDuration: _transitionDuration,
        flex: _activeIndex === index ? _activeFlex : _flex,
        borderRadius: _borderRadius
      }"
      @click="onClick(index)"
    >
      <VImage :src="item" class="expanding-cards__image" base="height" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.expanding-cards {
  display: flex;
  height: 100%;

  &__card {
    position: relative;
    height: 100%;
    cursor: pointer;
    transition-property: flex;
    overflow: hidden;

    &.active {
      .expanding-cards__image {
        transform: translate(-50%, -50%) scale(1.2);
      }
    }
  }

  &__image {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
    transition: transform 0.3s;
  }
}
</style>
