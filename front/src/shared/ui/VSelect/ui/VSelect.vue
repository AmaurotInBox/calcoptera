<!-- Ссылка на Figma -->
<!-- https://www.figma.com/file/PnbjU3YyW6Y3C1lDIBrFmO/GateRevisor-Lib?type=design&node-id=67-1500&mode=design&t=RY1eJUhm0emLnUUH-4 -->

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { getDomRef } from '@/shared/hooks/getDomRef'
import VInput from '@/shared/ui/VInput.vue'
import FixFluidColGrid from '@/shared/ui/FixFluidColGrid.vue'
import ChevronIcon from '@/shared/icons/ChevronIcon.vue'
import TrashIcon from '@/shared/icons/TrashIcon.vue'
import CheckIcon from '@/shared/icons/CheckIcon.vue'

import type { TValidator } from '@/shared/types/validator'
import type { TVSelectItem } from '../types/vSelectItem'

interface ISelectProps {
  id: string
  name: string
  items: Array<TVSelectItem>
  itemTitle?: string
  itemValue?: string
  itemId?: string
  label?: string
  hideError?: boolean
  hideLabel?: boolean
  mandatory?: boolean
  hideDropdownHeader?: boolean
  closeOnSelect?: boolean
  required?: boolean
  validation?: [TValidator]
  modelValue?: Array<TVSelectItem>
  disabled?: boolean
  errorMessage?: string
  hasError?: boolean
  clearable?: boolean
  dropdownHeader?: string
  dropdownHeight?: number
  multiple?: boolean
  placeholder?: string
}

interface ISelectEmits {
  (event: 'update:modelValue', value: Array<TVSelectItem>): void
  (event: 'focus', e?: FocusEvent): void
  (event: 'clear', e?: Event): void
}

const props = withDefaults(defineProps<ISelectProps>(), {
  label: 'label',
  modelValue: () => [],
  errorMessage: '',
  clearable: false,
  dropdownHeader: 'Header',
  dropdownHeight: 380,
  itemTitle: 'title',
  itemValue: 'value',
  itemId: 'id',
  placeholder: 'placeholder',
})
const emit = defineEmits<ISelectEmits>()

const selectRef = getDomRef<HTMLDivElement>(null)
const headerRef = getDomRef<HTMLDivElement>(null)
const dropdownContentRef = getDomRef<HTMLDivElement>(null)

const focus = ref(false)

const _items = ref(props.items)
const _selectedItemIds = ref(
  props.modelValue.reduce((acc: { [key: string]: string }, item) => {
    acc[`${item[props.itemId]}`] = item[props.itemId]
    return acc
  }, {}),
)
const selectedCount = computed(() => Object.keys(_selectedItemIds.value).length)
const hasSelected = computed(() => !!selectedCount.value)
const selectedItems = computed(() =>
  _items.value.filter((item) => item[props.itemId] in _selectedItemIds.value),
)
const inputValue = computed(() =>
  selectedItems.value.reduce((acc, item, index) => {
    return acc + item[props.itemTitle] + (selectedCount.value !== index + 1 ? ', ' : '')
  }, ''),
)

const onFocus = () => {
  focus.value = true

  emit('focus')
}

const onChevronClick = () => {
  focus.value = !focus.value
}

const onSelectCell = (index: number) => {
  if (_selectedItemIds.value[_items.value[index][props.itemId]] && !props.mandatory) {
    delete _selectedItemIds.value[_items.value[index][props.itemId]]
  } else if (props.multiple) {
    _selectedItemIds.value[_items.value[index][props.itemId]] = _items.value[index][props.itemId]
  } else {
    _selectedItemIds.value = {
      [_items.value[index][props.itemId]]: _items.value[index][props.itemId],
    }
  }

  if (props.closeOnSelect) {
    focus.value = false
  }

  emit('update:modelValue', selectedItems.value)
}

const onClearAll = () => {
  _selectedItemIds.value = {}
  _items.value = props.items

  emit('update:modelValue', selectedItems.value)
  emit('clear')
}

const calcDropdownHeight = (header: number | undefined, body: number | undefined) => {
  const headerHeight = header ? +header : 0
  const bodyHeight = body ? +body : 0
  return `${headerHeight + bodyHeight + 3}px`
}

onClickOutside(selectRef, () => {
  focus.value = false
})

watch(
  () => props.items,
  (newItems) => {
    if (props.mandatory && !props.modelValue.length) {
      onSelectCell(0)
    }
    _items.value = newItems
  },
  {
    immediate: true,
  },
)

defineExpose({
  selectRef,
})
</script>

<template>
  <div ref="selectRef" :class="['v-select', focus && 'focus', hasSelected && 'filled']">
    <VInput
      :id="props.id"
      :name="props.name"
      :label="props.label"
      :validation="props.validation"
      :disabled="props.disabled"
      :hideLabel="props.hideLabel"
      :clearable="props.clearable"
      :hideError="props.hideError"
      :focus="focus"
      :filled="hasSelected"
      :model-value="inputValue"
      :placeholder="props.placeholder"
      readonly
      @focus="onFocus"
      @trailing-icon-click="onChevronClick"
      @clear="onClearAll"
    >
      <template #trailingIcon>
        <ChevronIcon :class="['chevron', focus && 'focus']" />
      </template>
    </VInput>

    <FixFluidColGrid
      v-if="focus"
      class="dropdown"
      :style="{
        height: calcDropdownHeight(headerRef?.scrollHeight, dropdownContentRef?.scrollHeight),
        maxHeight: `${props.dropdownHeight}px`,
      }"
    >
      <template #fix-top-part>
        <template v-if="!props.hideDropdownHeader">
          <div ref="headerRef" class="header">
            <div class="header-text">
              {{ hasSelected ? `Selected ${selectedCount}` : props.dropdownHeader }}
            </div>
            <div v-show="hasSelected" class="header-icon" @click="onClearAll">
              <slot name="headerIcon">
                <TrashIcon />
              </slot>
            </div>
          </div>
        </template>
      </template>
      <template #fluid-part>
        <div ref="dropdownContentRef" class="dropdown-content">
          <div
            v-for="(item, index) in _items"
            :key="item[props.itemId]"
            class="dropdown-cell"
            @click="onSelectCell(index)"
          >
            <div class="cell-text">{{ item.title }}</div>
            <div v-if="item[props.itemId] in _selectedItemIds" class="cell-icon">
              <CheckIcon />
            </div>
          </div>
        </div>
      </template>
    </FixFluidColGrid>
  </div>
</template>
<style lang="scss" scoped>
.v-select {
  position: relative;

  .v-input {
    z-index: 2;
  }

  :deep(input) {
    cursor: pointer;
  }

  &:not(.filled) {
    :deep(.label.focus) {
      @include body-s;
      @include font-weight-medium;
      top: 14px;
    }
  }

  &:hover,
  &.focus {
    :deep(svg.chevron *) {
      stroke: var(--icon-secondary-hover);
    }
  }
}

.chevron {
  &.focus {
    transform: rotate(180deg);
  }
}
.dropdown {
  @include modal-z-index;
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  width: 100%;
  border-radius: 4px;
  border: 1px solid var(--border-secondary);
  background-color: #fff;
  transform-origin: left top;
}
.dropdown-content {
  @include vertical-scroll;
  height: 100%;
  overflow-y: auto;
  background-color: var(--background);
}
.header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-secondary);
  background-color: var(--background);
}
.header-text {
  @include body-s;
  @include font-weight-regular;
  color: var(--text-secondary);
  flex-grow: 1;
  padding: 14px 0 14px 16px;
}
.header-icon {
  padding: 14px 16px;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;

    :deep(*) {
      stroke: var(--icon-secondary);
    }
  }
  &:hover {
    :deep(svg *) {
      stroke: var(--icon-secondary-hover);
    }
  }
}
.dropdown-cell {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 40px;
  cursor: pointer;
  border-bottom: 1px solid var(--border-secondary);

  &:last-of-type {
    border-bottom: none;
  }

  &:hover {
    background-color: var(--surface-secondary);
  }

  &.active {
    background-color: var(--surface-btn-secondary-hover);
  }
}
.cell-text {
  @include body-s;
  color: var(--text-primary);
  padding: 10px 16px;
  flex-grow: 1;
}
.cell-icon {
  padding: 8px 16px;
  padding-right: 8px;

  svg {
    width: 24px;
    height: 24px;

    :deep(*) {
      stroke: var(--icon-primary);
    }
  }
}
</style>
@/shared/composables/getDomRef