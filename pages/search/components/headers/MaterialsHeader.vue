<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-01-27 11:00:00
 * @FilePath: /yishe-nuxt/pages/search/components/headers/MaterialsHeader.vue
 * @Description: 素材图Header组件
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

// 素材图相关的搜索建议
const materialsSuggestions = ref([
  '背景图', '纹理', '图案', '图标', '插画', '照片', '矢量图', 'PNG', 'JPG', 'SVG',
  '装饰元素', '边框', '分割线', '按钮', '标签', '徽章', '水印', '蒙版'
])

// 素材图相关的筛选选项
const materialsFilterOptions = [
  { value: 'type', label: '类型', options: ['背景图', '纹理', '图案', '图标', '插画', '照片', '矢量图'] },
  { value: 'format', label: '格式', options: ['PNG', 'JPG', 'SVG', 'AI', 'PSD', 'EPS'] },
  { value: 'resolution', label: '分辨率', options: ['高清', '超高清', '4K', '8K', '矢量'] },
  { value: 'color', label: '颜色', options: ['彩色', '黑白', '单色', '渐变', '透明'] },
  { value: 'style', label: '风格', options: ['简约', '复古', '现代', '卡通', '写实', '抽象'] }
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
            placeholder="搜索素材图片..."
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
            <v-icon class="suggestion-icon">mdi-image</v-icon>
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
  color: var(--text-secondary) !important;
  transition: all 0.3s ease;
  
  &.active {
    color: var(--theme-primary) !important;
    background: var(--bg-hover) !important;
  }
  
  &:hover {
    color: var(--theme-primary) !important;
    background: var(--bg-hover) !important;
  }
}

.search-container {
  position: relative;
}

.search-box {
  display: flex;
  align-items: center;
  background: var(--input-bg);
  border: 1px solid var(--border-secondary);
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  min-width: 300px;
  transition: all 0.3s ease;

  &:hover {
    background: var(--input-bg-hover);
  }

  &:focus-within {
    background: var(--input-bg-focus);
    border-color: var(--theme-primary);
    box-shadow: 0 0 0 2px var(--border-hover);
  }
}

.search-icon {
  color: var(--text-tertiary);
  margin-right: 0.5rem;
  transition: all 0.3s ease;
  
  .search-box:hover & {
    color: var(--text-secondary);
  }
  
  .search-box:focus-within & {
    color: var(--theme-primary);
  }
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text-primary);
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: var(--text-muted);
  }
  
  &:focus {
    color: var(--text-primary);
    
    &::placeholder {
      color: var(--text-tertiary);
    }
  }
}

.clear-btn {
  color: var(--text-tertiary) !important;
  margin-left: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--text-primary) !important;
    background: var(--bg-hover) !important;
  }
}

.search-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-secondary);
  border-top: none;
  border-radius: 0 0 8px 8px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1003;
  box-shadow: 0 4px 12px var(--shadow-primary);
  transition: all 0.3s ease;
}

.suggestion-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid var(--border-secondary);
  
  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: var(--bg-hover);
  }
}

.suggestion-icon {
  color: var(--text-muted);
  margin-right: 0.5rem;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.suggestion-text {
  color: var(--text-secondary);
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

/* 筛选相关样式 */
.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
}

.filter-chip {
  background: var(--theme-primary) !important;
  color: var(--text-primary) !important;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--theme-primary-hover) !important;
  }
}

.filter-row-single {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: end;
  padding-bottom: 1.5rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 150px;
}

.filter-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
  transition: all 0.3s ease;
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
    background: var(--theme-primary) !important;
    color: var(--text-primary) !important;
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
    border-color: var(--theme-primary);
    box-shadow: 0 0 0 2px var(--border-hover);
  }
}

.filter-actions-inline {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.filter-clear-btn {
  color: var(--text-tertiary) !important;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--text-primary) !important;
    background: var(--bg-hover) !important;
  }
}

.filter-apply-btn {
  background: var(--theme-primary) !important;
  color: var(--text-primary) !important;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--theme-primary-hover) !important;
  }
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
