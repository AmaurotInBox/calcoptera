<script setup lang="ts">
import { computed } from 'vue'
import { usePagination } from '../hooks/usePagination'
import { VBtn } from '@/shared/ui/VBtn'
import { ChevronIcon } from '@/shared/icons'

interface IPaginationProps {
  modelValue: string | number
  total: string | number
  toShow?: string | number
}
interface IPaginationEmits {
  (event: 'update:modelValue', e: string | number): void
  (event: 'change', e: string | number): void
}
const props = withDefaults(defineProps<IPaginationProps>(), {
  toShow: 1
})
const emit = defineEmits<IPaginationEmits>()

const _value = computed(() => +props.modelValue)
const _total = computed(() => +props.total)
const _toShow = computed(() => +props.toShow)

const onPrevClick = () => {
  emit('update:modelValue', _value.value - 1)
}
const onNextClick = () => {
  emit('update:modelValue', _value.value + 1)
}
const onClick = (value: string | number) => {
  emit('update:modelValue', value)
}

const { isFirstPage, pages, isLastPage } = usePagination(_value, _total, _toShow)
</script>

<template>
  <div v-if="_total" class="pagination">
    <div class="pagination__container">
      <div class="pagination__item-prev">
        <VBtn
          btnType="icon"
          size="xs"
          look="border"
          :disabled="isFirstPage"
          @click.prevent="onPrevClick"
        >
          <ChevronIcon />
        </VBtn>
      </div>

      <div v-for="(item, index) in pages" :key="index" class="pagination__item">
        <VBtn
          btnType="icon"
          size="xs"
          :look="item.type === 'current' ? 'primary' : 'border'"
          :class="[item.type === 'current' && 'active', item.type === 'ellipsis' && 'ellipsis']"
          :disabled="item.type === 'ellipsis'"
          @click.prevent="onClick(item.number)"
        >
          {{ item.type === 'ellipsis' ? '...' : item.number }}
        </VBtn>
      </div>

      <div class="pagination__item-next">
        <VBtn
          btnType="icon"
          size="xs"
          look="border"
          :disabled="isLastPage"
          @click.prevent="onNextClick"
        >
          <ChevronIcon />
        </VBtn>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;

  &__container {
    display: flex;
    gap: 8px;
  }

  &__item-prev {
    padding-right: 8px;

    svg {
      transform: rotate(90deg);
    }
  }

  &__item-next {
    padding-left: 8px;

    svg {
      transform: rotate(-90deg);
    }
  }

  &__item {
    .button {
      &.border {
        border: none;
      }

      :deep(.text) {
        @include font-weight-medium;
        @include body-s;
      }

      &.ellipsis {
        opacity: unset;
      }
    }
  }
}
</style>
