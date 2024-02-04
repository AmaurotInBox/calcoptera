<script lang="ts" setup>
import { ExpandingCards } from '@/entities/ExpandingCards'
const images = [
  'https://images.unsplash.com/photo-1558979158-65a1eaa08691',
  'https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
  'https://images.unsplash.com/photo-1551009175-8a68da93d5f9',
  'https://images.unsplash.com/photo-1549880338-65ddcdfd017b'
]
</script>

<template>
  <div class="wrapper">
    <ExpandingCards :items="images" :transitionDuration="200" class="cards" />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 1200px;
  height: 600px;
  margin: 0 auto;
  position: relative;
}
.cards {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
