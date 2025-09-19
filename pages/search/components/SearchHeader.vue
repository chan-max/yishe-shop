<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-09-18 21:32:42
 * @FilePath: /yishe-nuxt/pages/search/components/SearchHeader.vue
 * @Description: 搜索页面头部组件
-->
<script lang="ts" setup>
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

// 搜索输入处理
const handleSearchInput = (value: string) => {
  emit('update:searchQuery', value)
}

// 执行搜索
const handleSearch = () => {
  emit('search')
}

// 清空搜索
const clearSearch = () => {
  emit('update:searchQuery', '')
}

// 键盘事件处理
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    handleSearch()
  }
}
</script>

<template>
  <header class="top-header">
    <div class="header-content">
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
