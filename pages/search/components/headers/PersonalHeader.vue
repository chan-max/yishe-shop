<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-01-27 11:00:00
 * @FilePath: /yishe-nuxt/pages/search/components/headers/PersonalHeader.vue
 * @Description: 个人中心Header组件
-->
<script lang="ts" setup>
import BaseHeader from './BaseHeader.vue'

interface Props {
  searchQuery: string
  showSuggestions: boolean
  filteredSuggestions: string[]
  showMobileSidebar: boolean
}

interface Emits {
  (e: 'update:searchQuery', value: string): void
  (e: 'perform-search'): void
  (e: 'clear-search'): void
  (e: 'select-suggestion', suggestion: string): void
  (e: 'toggle-mobile-sidebar'): void
  (e: 'handle-blur'): void
  (e: 'update:showSuggestions', value: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// 搜索建议位置
const suggestionPosition = ref({
  top: 0,
  left: 0,
  width: 0
})

const searchBoxRef = ref<HTMLDivElement>()

// 计算搜索建议位置
const updateSuggestionPosition = () => {
  if (searchBoxRef.value) {
    const rect = searchBoxRef.value.getBoundingClientRect()
    suggestionPosition.value = {
      top: rect.bottom + window.scrollY + 8,
      left: rect.left + window.scrollX,
      width: rect.width
    }
  }
}

const handleSearchInput = (value: string) => {
  emit('update:searchQuery', value)
  if (value.length > 0) {
    nextTick(() => {
      updateSuggestionPosition()
    })
  }
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
    :show-mobile-sidebar="showMobileSidebar"
    @toggle-mobile-sidebar="toggleMobileSidebar"
  >
    <template #search-filter>
      <!-- 搜索框 - 个人中心不需要筛选按钮 -->
      <div class="search-container">
        <div ref="searchBoxRef" class="search-box">
          <v-icon class="search-icon">mdi-magnify</v-icon>
          <input
            :value="searchQuery"
            @input="handleSearchInput(($event.target as HTMLInputElement).value)"
            type="text"
            placeholder="搜索内容..."
            class="search-input"
            @keyup.enter="performSearch"
            @focus="() => { emit('update:showSuggestions', true); updateSuggestionPosition() }"
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
      </div>
      
      <!-- 搜索建议 - 使用固定定位 -->
      <div 
        v-if="showSuggestions && filteredSuggestions.length > 0" 
        class="search-suggestions search-suggestions-fixed"
        :style="{
          top: suggestionPosition.top + 'px',
          left: suggestionPosition.left + 'px',
          width: suggestionPosition.width + 'px'
        }"
      >
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
    </template>
  </BaseHeader>
</template>

<style scoped>
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

/* 固定定位的搜索建议 */
.search-suggestions-fixed {
  position: fixed !important;
  z-index: 9999 !important;
  max-height: 200px;
  overflow-y: auto;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-secondary);
  border-radius: 8px;
  box-shadow: 0 4px 12px var(--shadow-primary);
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

/* 移动端适配 */
@media (max-width: 768px) {
  .search-box {
    min-width: 200px;
  }
}
</style>
