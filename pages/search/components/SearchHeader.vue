<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-09-18 21:32:42
 * @FilePath: /yishe-nuxt/pages/search/components/SearchHeader.vue
 * @Description: 搜索页面头部组件
-->
<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

interface Props {
  searchQuery: string
  showFilterMenu: boolean
}

interface Emits {
  (e: 'update:searchQuery', value: string): void
  (e: 'toggleFilter'): void
  (e: 'search'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const searchInputRef = ref<HTMLInputElement>()
const searchBoxRef = ref<HTMLDivElement>()

// 错误处理
const error = ref<string | null>(null)

// 搜索输入处理
const handleSearchInput = (value: string) => {
  try {
    emit('update:searchQuery', value)
  } catch (err) {
    console.error('搜索输入处理失败:', err)
    error.value = '搜索输入处理失败'
  }
}

// 执行搜索
const handleSearch = () => {
  try {
    emit('search')
  } catch (err) {
    console.error('执行搜索失败:', err)
    error.value = '执行搜索失败'
  }
}

// 清空搜索
const clearSearch = () => {
  try {
    emit('update:searchQuery', '')
  } catch (err) {
    console.error('清空搜索失败:', err)
    error.value = '清空搜索失败'
  }
}

// 键盘事件处理
const handleKeydown = (event: KeyboardEvent) => {
  try {
    if (event.key === 'Enter') {
      handleSearch()
    }
  } catch (err) {
    console.error('键盘事件处理失败:', err)
    error.value = '键盘事件处理失败'
  }
}
</script>

<template>
  <header class="top-header">
    <div class="header-content">
      <!-- 错误提示 -->
      <div v-if="error" class="error-container">
        <v-alert
          type="error"
          :text="error"
          closable
          @click:close="error = null"
          class="error-alert"
        />
      </div>
      
      <div class="search-filter-container">
        <v-btn
          @click="emit('toggleFilter')"
          class="filter-toggle-btn"
          variant="text"
          size="small"
          icon
        >
          <v-icon>mdi-filter-variant</v-icon>
        </v-btn>
        
        <div class="search-container">
          <div ref="searchBoxRef" class="search-box" @click="searchInputRef?.focus()">
            <v-icon class="search-icon">mdi-magnify</v-icon>
            <input
              ref="searchInputRef"
              :value="searchQuery"
              @input="handleSearchInput(($event.target as HTMLInputElement).value)"
              @keydown="handleKeydown"
              class="search-input"
              placeholder="搜索服装设计..."
              type="text"
            />
            <v-btn
              v-if="searchQuery"
              @click="clearSearch"
              class="clear-btn"
              variant="text"
              size="small"
              icon
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
      
      <!-- 搜索建议框已移除，避免被header遮挡 -->
      </div>

  </header>
</template>

<style lang="scss" scoped>
@use '../styles/search-header.scss';
</style>
