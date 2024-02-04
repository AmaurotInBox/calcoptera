<script lang="ts" setup>
import { ref } from 'vue'
interface IVImageProps {
  src: string
  alt?: string
  desc?: string
  width?: number
  base?: 'width' | 'height'
}
const props = withDefaults(defineProps<IVImageProps>(), {
  alt: 'image',
  width: 100,
  desc: '',
  base: 'width'
})

const _src = ref('')
const _loading = ref(true)

const image = new Image(props.width)

image.onload = () => {
  _src.value = props.src
  _loading.value = false
}

image.src = props.src
</script>

<template>
  <figure :class="['v-image', _loading && 'loading']">
    <img
      v-show="_src"
      class="v-image__image"
      :class="props.base"
      :src="_src"
      :alt="props.alt"
      :width="props.width"
    />

    <figcaption v-if="props.desc || $slots.figcaption" class="v-image__description">
      <slot name="figcaption">{{ props.desc }}</slot>
    </figcaption>
  </figure>
</template>

<style lang="scss" scoped>
.v-image {
  position: relative;
  margin: 0;
  object-position: center;
  overflow: hidden;

  &.loading {
    background: linear-gradient(
        to bottom right,
        #0000 calc(50% - 40px),
        #fff 50%,
        #0000 calc(50% + 40px)
      )
      bottom right/calc(200% + 80px) calc(200% + 80px) gray;
    animation: l8 1s infinite;

    @keyframes l8 {
      100% {
        background-position: top left;
      }
    }
  }

  &__image {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &.width {
      width: 100%;
      height: auto;
    }

    &.height {
      width: auto;
      height: 100%;
    }
  }
}
</style>
