<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-01-27 11:00:00
 * @FilePath: /yishe-nuxt/pages/_search/components/headers/PersonalHeader.vue
 * @Description: 个人中心Header组件
-->
<script lang="ts" setup>
import BaseHeader from './BaseHeader.vue'

interface Props {
  searchQuery: string
  showMobileSidebar: boolean
}

interface Emits {
  (e: 'update:searchQuery', value: string): void
  (e: 'perform-search'): void
  (e: 'clear-search'): void
  (e: 'toggle-mobile-sidebar'): void
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

const toggleMobileSidebar = () => {
  emit('toggle-mobile-sidebar')
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
        <div class="search-box">
          <v-icon class="search-icon">mdi-magnify</v-icon>
          <input
            :value="searchQuery"
            @input="handleSearchInput(($event.target as HTMLInputElement).value)"
            type="text"
            placeholder="搜索内容..."
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

/* 搜索建议相关样式已移除 */

/* 移动端适配 */
@media (max-width: 768px) {
  .search-box {
    min-width: 200px;
  }
}
</style>
