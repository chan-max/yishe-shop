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
  title: string
  subtitle: string
  icon: string
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
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleSearchInput = (value: string) => {
  emit('update:searchQuery', value)
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
    :title="title"
    :subtitle="subtitle"
    :icon="icon"
    :show-mobile-sidebar="showMobileSidebar"
    @toggle-mobile-sidebar="toggleMobileSidebar"
  >
    <template #search-filter>
      <!-- 搜索框 - 个人中心不需要筛选按钮 -->
      <div class="search-container">
        <div class="search-box">
          <v-icon class="search-icon">mdi-magnify</v-icon>
          <input
            :value="searchQuery"
            @input="handleSearchInput($event.target.value)"
            type="text"
            :placeholder="`搜索${title.toLowerCase()}...`"
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
  </BaseHeader>
</template>

<style scoped>
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
