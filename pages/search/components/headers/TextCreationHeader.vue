<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-01-27 11:00:00
 * @FilePath: /yishe-nuxt/pages/search/components/headers/TextCreationHeader.vue
 * @Description: 文字创作Header组件
-->
<script lang="ts" setup>
import BaseHeader from './BaseHeader.vue'

interface Props {
  searchQuery: string
  showFilterMenu: boolean
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
  (e: 'toggle-mobile-sidebar'): void
  (e: 'update:filters', filters: any): void
  (e: 'remove-filter', key: string): void
  (e: 'clear-filters'): void
  (e: 'apply-filters'): void
  (e: 'toggle-style', style: string): void
  (e: 'toggle-color', color: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// 文字创作相关的筛选选项
const textCreationFilterOptions = [
  { value: 'category', label: '分类', options: ['文案', '标题', '描述', '广告语', '故事', '诗歌', '新闻', '评论'] },
  { value: 'style', label: '风格', options: ['正式', '轻松', '幽默', '严肃', '浪漫', '励志', '专业', '创意'] },
  { value: 'length', label: '长度', options: ['短句', '中等', '长文', '超长'] },
  { value: 'tone', label: '语调', options: ['积极', '中性', '消极', '疑问', '感叹', '陈述'] },
  { value: 'purpose', label: '用途', options: ['营销', '教育', '娱乐', '信息', '说服', '描述'] }
]

// 语言选项
const languageOptions = [
  { value: 'zh', text: '中文' },
  { value: 'en', text: '英文' },
  { value: 'ja', text: '日文' },
  { value: 'ko', text: '韩文' },
  { value: 'fr', text: '法文' },
  { value: 'de', text: '德文' },
  { value: 'es', text: '西班牙文' },
  { value: 'it', text: '意大利文' }
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

const toggleMobileSidebar = () => {
  emit('toggle-mobile-sidebar')
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

const toggleLanguage = (language: string) => {
  emit('toggle-color', language) // 复用颜色选择的方法
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
            @input="handleSearchInput(($event.target as HTMLInputElement).value)"
            type="text"
            placeholder="搜索文字创作内容..."
            class="search-input"
            @keyup.enter="performSearch"
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
        
        <!-- 分类选择 -->
        <div class="filter-group">
          <label class="filter-label">分类</label>
          <v-select
            v-model="filters.category"
            :items="textCreationFilterOptions[0].options"
            variant="outlined"
            density="compact"
            hide-details
            placeholder="选择分类"
            class="filter-select"
            @update:model-value="updateFilters(filters)"
          />
        </div>
        
        <!-- 风格标签选择 -->
        <div class="filter-group filter-group-chips">
          <label class="filter-label">风格</label>
          <div class="style-chips">
            <v-chip
              v-for="style in textCreationFilterOptions[1].options"
              :key="style"
              :class="{ 'chip-selected': filters.styles && filters.styles.includes(style) }"
              @click="toggleStyle(style)"
              class="style-chip"
              size="small"
              variant="outlined"
            >
              {{ style }}
            </v-chip>
          </div>
        </div>
        
        <!-- 语言选择器 -->
        <div class="filter-group filter-group-colors">
          <label class="filter-label">语言</label>
          <div class="language-picker">
            <div
              v-for="language in languageOptions"
              :key="language.value"
              :class="{ 'language-selected': filters.languages && filters.languages.includes(language.value) }"
              @click="toggleLanguage(language.value)"
              class="language-option"
              :title="language.text"
            >
              {{ language.text }}
            </div>
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
  font-size: 1rem;
  
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
  
  &:hover {
    color: var(--text-primary) !important;
    background: var(--bg-hover) !important;
  }
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
}

.filter-select {
  min-width: 150px;
}

.style-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.style-chip {
  cursor: pointer;
  
  &.chip-selected {
    background: var(--theme-primary) !important;
    color: var(--text-primary) !important;
  }
}

.language-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.language-option {
  padding: 0.25rem 0.75rem;
  border: 1px solid var(--border-secondary);
  border-radius: 16px;
  cursor: pointer;
  font-size: 0.8rem;
  color: var(--text-secondary);
  background: var(--bg-tertiary);
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--bg-hover);
    color: var(--text-primary);
    border-color: var(--border-hover);
  }
  
  &.language-selected {
    background: var(--theme-primary) !important;
    color: var(--text-primary) !important;
    border-color: var(--theme-primary) !important;
  }
}

.filter-actions-inline {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.filter-clear-btn {
  color: var(--text-tertiary) !important;
  
  &:hover {
    color: var(--text-primary) !important;
    background: var(--bg-hover) !important;
  }
}

.filter-apply-btn {
  background: var(--theme-primary) !important;
  color: var(--text-primary) !important;
  
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
