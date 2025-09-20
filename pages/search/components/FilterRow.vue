<template>
  <div class="filter-row">
    <div 
      v-for="filter in filters" 
      :key="filter.key"
      class="filter-group"
      :style="{ minWidth: filter.minWidth || '150px' }"
    >
      <label class="filter-label">{{ filter.label }}</label>
      
      <!-- 下拉选择器 -->
      <v-select
        v-if="filter.type === 'select'"
        v-model="filterValues[filter.key]"
        :items="filter.items"
        :placeholder="filter.placeholder"
        variant="outlined"
        density="compact"
        class="filter-select"
        @update:model-value="onFilterChange(filter.key, $event)"
      />
      
      <!-- 文本输入框 -->
      <v-text-field
        v-else-if="filter.type === 'text'"
        v-model="filterValues[filter.key]"
        :placeholder="filter.placeholder"
        :type="filter.inputType || 'text'"
        variant="outlined"
        density="compact"
        class="filter-input"
        @update:model-value="onFilterChange(filter.key, $event)"
      />
      
      <!-- 价格范围 -->
      <div v-else-if="filter.type === 'price-range'" class="price-range">
        <v-text-field
          v-model.number="filterValues[filter.key + 'Min']"
          :placeholder="filter.minPlaceholder || '最低价'"
          type="number"
          variant="outlined"
          density="compact"
          class="price-input"
          @update:model-value="onPriceRangeChange(filter.key)"
        />
        <span class="price-separator">-</span>
        <v-text-field
          v-model.number="filterValues[filter.key + 'Max']"
          :placeholder="filter.maxPlaceholder || '最高价'"
          type="number"
          variant="outlined"
          density="compact"
          class="price-input"
          @update:model-value="onPriceRangeChange(filter.key)"
        />
      </div>
      
      <!-- 颜色选择器 -->
      <div v-else-if="filter.type === 'color-picker'" class="color-picker">
        <div
          v-for="color in filter.colorOptions"
          :key="color.value"
          class="color-option"
          :class="{ active: isColorSelected(color.value) }"
          :style="{ backgroundColor: color.color }"
          @click="toggleColor(color.value)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
export interface FilterItem {
  key: string
  label: string
  type: 'select' | 'text' | 'price-range' | 'color-picker'
  placeholder?: string
  minWidth?: string
  items?: Array<{ text: string; value: any }>
  inputType?: string
  minPlaceholder?: string
  maxPlaceholder?: string
  colorOptions?: Array<{ value: string; color: string; text: string }>
}

interface Props {
  filters: FilterItem[]
  modelValue: Record<string, any>
}

interface Emits {
  (e: 'update:modelValue', value: Record<string, any>): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const filterValues = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const onFilterChange = (key: string, value: any) => {
  const newValues = { ...filterValues.value }
  newValues[key] = value
  emit('update:modelValue', newValues)
}

const onPriceRangeChange = (key: string) => {
  const newValues = { ...filterValues.value }
  const minKey = key + 'Min'
  const maxKey = key + 'Max'
  
  // 构建价格范围字符串
  if (newValues[minKey] !== null && newValues[maxKey] !== null) {
    newValues[key] = `${newValues[minKey]}-${newValues[maxKey]}`
  } else if (newValues[minKey] !== null) {
    newValues[key] = `${newValues[minKey]}+`
  } else if (newValues[maxKey] !== null) {
    newValues[key] = `0-${newValues[maxKey]}`
  } else {
    newValues[key] = ''
  }
  
  emit('update:modelValue', newValues)
}

const isColorSelected = (colorValue: string) => {
  const colors = filterValues.value.colors || []
  return colors.includes(colorValue)
}

const toggleColor = (colorValue: string) => {
  const newValues = { ...filterValues.value }
  const colors = [...(newValues.colors || [])]
  const index = colors.indexOf(colorValue)
  
  if (index > -1) {
    colors.splice(index, 1)
  } else {
    colors.push(colorValue)
  }
  
  newValues.colors = colors
  emit('update:modelValue', newValues)
}
</script>

<style lang="scss" scoped>
.filter-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: end;
  
  .filter-group {
    .filter-label {
      display: block;
      color: #e0e0e0;
      font-size: 0.85rem;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    
    .price-range {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      
      .price-input {
        flex: 1;
      }
      
      .price-separator {
        color: #b0b0b0;
        font-weight: 500;
      }
    }
    
    .color-picker {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      
      .color-option {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        cursor: pointer;
        border: 2px solid transparent;
        transition: all 0.3s ease;
        
        &:hover {
          transform: scale(1.1);
        }
        
        &.active {
          border-color: #ffffff;
          box-shadow: 0 0 0 2px #3b82f6;
        }
      }
    }
  }
}
</style>
