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
}

interface Emits {
  (e: 'update:searchQuery', value: string): void
  (e: 'toggle-filter-menu'): void
  (e: 'perform-search'): void
  (e: 'clear-search'): void
  (e: 'select-suggestion', suggestion: string): void
  (e: 'toggle-mobile-sidebar'): void
  (e: 'handle-blur'): void
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
</script>

<template>
  <BaseHeader
    title="素材图"
    subtitle="高质量设计素材资源"
    icon="mdi-image-multiple-outline"
    :show-mobile-sidebar="showMobileSidebar"
    @toggle-mobile-sidebar="toggleMobileSidebar"
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

/* 移动端适配 */
@media (max-width: 768px) {
  .search-box {
    min-width: 200px;
  }
}
</style>
