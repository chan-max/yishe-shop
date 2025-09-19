<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-01-27 11:00:00
 * @FilePath: /yishe-nuxt/pages/search/components/headers/ClothingHeader.vue
 * @Description: 服装设计Header组件
-->
<script lang="ts" setup>
import BaseHeader from './BaseHeader.vue'

interface Props {
  searchQuery: string
  showFilterMenu: boolean
  showSuggestions: boolean
  filteredSuggestions: string[]
  showMobileSidebar: boolean
  filters: any
  filterOptions: any
  activeFilters: any
  activeFiltersCount: number
}

interface Emits {
  (e: 'update:searchQuery', value: string): void
  (e: 'toggle-filter-menu'): void
  (e: 'perform-search'): void
  (e: 'clear-search'): void
  (e: 'select-suggestion', suggestion: string): void
  (e: 'toggle-mobile-sidebar'): void
  (e: 'handle-blur'): void
  (e: 'update:filters', filters: any): void
  (e: 'remove-filter', key: string): void
  (e: 'clear-filters'): void
  (e: 'apply-filters'): void
  (e: 'toggle-style', style: string): void
  (e: 'toggle-color', color: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// 服装设计相关的搜索建议
const clothingSuggestions = ref([
  '连衣裙', '牛仔裤', 'T恤', '运动鞋', '休闲裤', '衬衫', '外套', '裙子', '短裤', '长裤',
  '卫衣', '毛衣', '风衣', '夹克', '西装', '礼服', '运动装', '家居服'
])

// 服装设计相关的筛选选项
const clothingFilterOptions = [
  { value: 'style', label: '风格', options: ['休闲', '正式', '运动', '时尚', '复古', '简约'] },
  { value: 'gender', label: '性别', options: ['男装', '女装', '中性', '童装'] },
  { value: 'season', label: '季节', options: ['春季', '夏季', '秋季', '冬季', '四季'] },
  { value: 'occasion', label: '场合', options: ['日常', '工作', '运动', '聚会', '正式'] },
  { value: 'material', label: '材质', options: ['棉质', '牛仔', '针织', '丝绸', '皮革', '合成纤维'] }
]

// 颜色选项
const colorOptions = [
  { value: '#FF0000', text: '红色' },
  { value: '#00FF00', text: '绿色' },
  { value: '#0000FF', text: '蓝色' },
  { value: '#FFFF00', text: '黄色' },
  { value: '#FF00FF', text: '紫色' },
  { value: '#00FFFF', text: '青色' },
  { value: '#000000', text: '黑色' },
  { value: '#FFFFFF', text: '白色' },
  { value: '#808080', text: '灰色' },
  { value: '#FFA500', text: '橙色' }
]

const handleSearchInput = (value: string) => {
  emit('update:searchQuery', value)
}

const toggleFilter = () => {
  emit('toggle-filter-menu')
}

const performSearch = () => {
  emit('perform-search')
}

const clearSearch = () => {
  emit('clear-search')
}

const selectSuggestion = (suggestion: string) => {
  emit('select-suggestion', suggestion)
}

const toggleMobileSidebar = () => {
  emit('toggle-mobile-sidebar')
}

const handleBlur = () => {
  emit('handle-blur')
}

// 筛选相关方法
const updateFilters = (filters: any) => {
  emit('update:filters', filters)
}

const removeFilter = (key: string) => {
  emit('remove-filter', key)
}

const clearFilters = () => {
  emit('clear-filters')
}

const applyFilters = () => {
  emit('apply-filters')
}

const toggleStyle = (style: string) => {
  emit('toggle-style', style)
}

const toggleColor = (color: string) => {
  emit('toggle-color', color)
}
</script>

<template>
  <BaseHeader
    title="服装设计"
    subtitle="探索时尚服装设计灵感"
    icon="mdi-tshirt-crew-outline"
    :show-mobile-sidebar="showMobileSidebar"
    :show-filter-menu="showFilterMenu"
    @toggle-mobile-sidebar="toggleMobileSidebar"
    @toggle-filter-menu="toggleFilter"
  >
    <template #search-filter>
      <!-- 筛选按钮 -->
      <v-btn
        variant="text"
        @click="toggleFilter"
        class="filter-toggle-btn"
        :class="{ 'active': showFilterMenu }"
        icon
        size="small"
      >
        <v-icon>{{ showFilterMenu ? 'mdi-tune' : 'mdi-tune-variant' }}</v-icon>
      </v-btn>
      
      <!-- 搜索框 -->
      <div class="search-container">
        <div class="search-box">
          <v-icon class="search-icon">mdi-magnify</v-icon>
          <input
            :value="searchQuery"
            @input="handleSearchInput($event.target.value)"
            type="text"
            placeholder="搜索服装设计..."
            class="search-input"
            @keyup.enter="performSearch"
            @focus="$emit('update:showSuggestions', true)"
            @blur="handleBlur"
          />
          <v-btn
            v-if="searchQuery"
            variant="text"
            @click="clearSearch"
            class="clear-btn"
            icon
            size="small"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        
        <!-- 搜索建议 -->
        <div v-if="showSuggestions && filteredSuggestions.length > 0" class="search-suggestions">
          <div
            v-for="(suggestion, index) in filteredSuggestions"
            :key="index"
            class="suggestion-item"
            @click="selectSuggestion(suggestion)"
          >
            <v-icon class="suggestion-icon">mdi-magnify</v-icon>
            <span class="suggestion-text">{{ suggestion }}</span>
          </div>
        </div>
      </div>
    </template>
    
    <!-- 筛选内容 -->
    <template #filter-content>
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
            @update:model-value="updateFilters(filters)"
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
              @update:model-value="updateFilters(filters)"
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
              @update:model-value="updateFilters(filters)"
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
    </template>
  </BaseHeader>
</template>

<style scoped>
.filter-toggle-btn {
  color: #e0e0e0 !important;
  
  &.active {
    color: #e55a2b !important;
    background: rgba(229, 90, 43, 0.1) !important;
  }
}

.search-container {
  position: relative;
}

.search-box {
  display: flex;
  align-items: center;
  background: #2a2a2a;
  border: 1px solid #444;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  min-width: 300px;
  transition: border-color 0.2s ease;

  &:focus-within {
    border-color: #e55a2b;
  }
}

.search-icon {
  color: #999;
  margin-right: 0.5rem;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #e0e0e0;
  font-size: 0.9rem;

  &::placeholder {
    color: #666;
  }
}

.clear-btn {
  color: #999 !important;
  margin-left: 0.5rem;
}

.search-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #2a2a2a;
  border: 1px solid #444;
  border-top: none;
  border-radius: 0 0 8px 8px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
}

.suggestion-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: #333;
  }
}

.suggestion-icon {
  color: #999;
  margin-right: 0.5rem;
  font-size: 1rem;
}

.suggestion-text {
  color: #e0e0e0;
  font-size: 0.9rem;
}

/* 筛选相关样式 */
.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.filter-chip {
  background: #e55a2b !important;
  color: white !important;
}

.filter-row-single {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: end;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 150px;
}

.filter-label {
  font-size: 0.9rem;
  color: #e0e0e0;
  font-weight: 500;
}

.filter-select {
  min-width: 150px;
}

.price-range-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.price-input {
  min-width: 80px;
}

.price-separator {
  color: #999;
  font-weight: 500;
}

.style-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.style-chip {
  cursor: pointer;
  transition: all 0.2s ease;
  
  &.chip-selected {
    background: #e55a2b !important;
    color: white !important;
  }
}

.color-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.color-option {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
  
  &.color-selected {
    border-color: #e55a2b;
    box-shadow: 0 0 0 2px rgba(229, 90, 43, 0.3);
  }
}

.filter-actions-inline {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.filter-clear-btn {
  color: #999 !important;
}

.filter-apply-btn {
  background: #e55a2b !important;
  color: white !important;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .search-box {
    min-width: 200px;
  }
  
  .filter-row-single {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-group {
    min-width: auto;
  }
}
</style>
