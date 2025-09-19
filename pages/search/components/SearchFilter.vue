<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-09-18 21:32:42
 * @FilePath: /yishe-nuxt/pages/search/components/SearchFilter.vue
 * @Description: 搜索页面筛选组件
-->
<script lang="ts" setup>
interface Props {
  show: boolean
}

interface Emits {
  (e: 'update:show', value: boolean): void
  (e: 'clear'): void
  (e: 'apply'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// 筛选条件
const filters = ref({
  sort: 'latest',
  priceMin: null,
  priceMax: null,
  styles: [] as string[],
  colors: [] as string[]
})

// 筛选选项
const filterOptions = {
  sort: [
    { value: 'latest', text: '最新上架' },
    { value: 'popular', text: '最受欢迎' },
    { value: 'rating', text: '好评如潮' },
    { value: 'price_asc', text: '价格从低到高' },
    { value: 'price_desc', text: '价格从高到低' }
  ],
  style: [
    { value: 'casual', text: '休闲' },
    { value: 'formal', text: '正装' },
    { value: 'sports', text: '运动' },
    { value: 'vintage', text: '复古' },
    { value: 'street', text: '街头' },
    { value: 'business', text: '商务' },
    { value: 'sweet', text: '甜美' },
    { value: 'cool', text: '酷炫' }
  ]
}

// 颜色选项
const colorOptions = [
  { value: '#000000', text: '黑色' },
  { value: '#FFFFFF', text: '白色' },
  { value: '#FF0000', text: '红色' },
  { value: '#0000FF', text: '蓝色' },
  { value: '#00FF00', text: '绿色' },
  { value: '#FFFF00', text: '黄色' },
  { value: '#FF69B4', text: '粉色' },
  { value: '#800080', text: '紫色' },
  { value: '#FFA500', text: '橙色' },
  { value: '#8B4513', text: '棕色' },
  { value: '#808080', text: '灰色' },
  { value: '#000080', text: '海军蓝' }
]

// 切换风格选择
const toggleStyle = (styleValue: string) => {
  const index = filters.value.styles.indexOf(styleValue)
  if (index > -1) {
    filters.value.styles.splice(index, 1)
  } else {
    filters.value.styles.push(styleValue)
  }
}

// 切换颜色选择
const toggleColor = (colorValue: string) => {
  const index = filters.value.colors.indexOf(colorValue)
  if (index > -1) {
    filters.value.colors.splice(index, 1)
  } else {
    filters.value.colors.push(colorValue)
  }
}

// 移除单个筛选条件
const removeFilter = (filterKey: string) => {
  if (filterKey === 'sort') {
    filters.value.sort = 'latest'
  } else if (filterKey === 'priceMin') {
    filters.value.priceMin = null
  } else if (filterKey === 'priceMax') {
    filters.value.priceMax = null
  } else if (filterKey === 'styles') {
    filters.value.styles = []
  } else if (filterKey === 'colors') {
    filters.value.colors = []
  }
}

// 清空所有筛选条件
const clearFilters = () => {
  filters.value = {
    sort: 'latest',
    priceMin: null,
    priceMax: null,
    styles: [],
    colors: []
  }
  emit('clear')
}

// 应用筛选条件
const applyFilters = () => {
  emit('apply')
}

// 计算活跃的筛选条件
const activeFilters = computed(() => {
  const active: any = {}
  
  if (filters.value.sort && filters.value.sort !== 'latest') {
    const sortOption = filterOptions.sort.find(s => s.value === filters.value.sort)
    if (sortOption) {
      active.sort = { label: '排序', value: sortOption.text }
    }
  }
  
  if (filters.value.priceMin || filters.value.priceMax) {
    const min = filters.value.priceMin || 0
    const max = filters.value.priceMax || '∞'
    active.price = { label: '价格', value: `${min}-${max}` }
  }
  
  if (filters.value.styles.length > 0) {
    const styleTexts = filters.value.styles.map(styleValue => {
      const styleOption = filterOptions.style.find(s => s.value === styleValue)
      return styleOption ? styleOption.text : styleValue
    })
    active.styles = { label: '风格', value: styleTexts.join(', ') }
  }
  
  if (filters.value.colors.length > 0) {
    const colorTexts = filters.value.colors.map(colorValue => {
      const colorOption = colorOptions.find(c => c.value === colorValue)
      return colorOption ? colorOption.text : colorValue
    })
    active.colors = { label: '颜色', value: colorTexts.join(', ') }
  }
  
  return active
})

// 计算活跃筛选条件数量
const activeFiltersCount = computed(() => {
  return Object.keys(activeFilters.value).length
})
</script>

<template>
  <div v-show="show" class="filter-section">
    <div class="filter-content">
      <!-- 筛选标签显示 -->
      <div class="filter-chips" v-if="activeFiltersCount > 0">
        <v-chip
          v-for="(filter, key) in activeFilters"
          :key="key"
          size="small"
          closable
          @click:close="removeFilter(key)"
          class="filter-chip"
        >
          {{ filter.label }}: {{ filter.value }}
        </v-chip>
      </div>
      
      <div class="filter-row-single">
        <!-- 排序方式 -->
        <div class="filter-group">
          <label class="filter-label">排序</label>
          <v-select
            v-model="filters.sort"
            :items="filterOptions.sort"
            variant="outlined"
            density="compact"
            hide-details
            placeholder="选择排序方式"
            class="filter-select"
          />
        </div>
        
        <!-- 价格范围输入框 -->
        <div class="filter-group filter-group-range">
          <label class="filter-label">价格范围</label>
          <div class="price-range-container">
            <v-text-field
              v-model.number="filters.priceMin"
              type="number"
              placeholder="最低价"
              class="price-input"
              variant="outlined"
              density="compact"
              hide-details
            />
            <span class="price-separator">-</span>
            <v-text-field
              v-model.number="filters.priceMax"
              type="number"
              placeholder="最高价"
              class="price-input"
              variant="outlined"
              density="compact"
              hide-details
            />
          </div>
        </div>
        
        <!-- 风格标签选择 -->
        <div class="filter-group filter-group-chips">
          <label class="filter-label">风格</label>
          <div class="style-chips">
            <v-chip
              v-for="style in filterOptions.style"
              :key="style.value"
              :class="{ 'chip-selected': filters.styles.includes(style.value) }"
              @click="toggleStyle(style.value)"
              class="style-chip"
              size="small"
              variant="outlined"
            >
              {{ style.text }}
            </v-chip>
          </div>
        </div>
        
        <!-- 颜色选择器 -->
        <div class="filter-group filter-group-colors">
          <label class="filter-label">颜色</label>
          <div class="color-picker">
            <div
              v-for="color in colorOptions"
              :key="color.value"
              :class="{ 'color-selected': filters.colors.includes(color.value) }"
              @click="toggleColor(color.value)"
              class="color-option"
              :style="{ backgroundColor: color.value }"
              :title="color.text"
            />
          </div>
        </div>
        
        <!-- 操作按钮 -->
        <div class="filter-actions-inline">
          <v-btn
            variant="outlined"
            @click="clearFilters"
            class="filter-clear-btn"
            size="small"
            icon
          >
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
          <v-btn
            variant="flat"
            @click="applyFilters"
            class="filter-apply-btn"
            size="small"
            color="primary"
            icon
          >
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/search-filter.scss';
</style>
