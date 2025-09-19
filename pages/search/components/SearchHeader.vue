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

// 搜索建议
const searchSuggestions = ref([
  '连衣裙', '牛仔裤', 'T恤', '运动鞋', '休闲裤', '衬衫', '外套', '裙子', '短裤', '长裤'
])

const showSuggestions = ref(false)
const searchInputRef = ref<HTMLInputElement>()

// 搜索输入处理
const handleSearchInput = (value: string) => {
  emit('update:searchQuery', value)
  showSuggestions.value = value.length > 0
}

// 执行搜索
const handleSearch = () => {
  emit('search')
  showSuggestions.value = false
}

// 选择建议
const selectSuggestion = (suggestion: string) => {
  emit('update:searchQuery', suggestion)
  showSuggestions.value = false
  handleSearch()
}

// 清空搜索
const clearSearch = () => {
  emit('update:searchQuery', '')
  showSuggestions.value = false
}

// 过滤建议
const filteredSuggestions = computed(() => {
  if (!props.searchQuery.trim()) {
    return searchSuggestions.value.slice(0, 5)
  }
  return searchSuggestions.value
    .filter(item => item.toLowerCase().includes(props.searchQuery.toLowerCase()))
    .slice(0, 5)
})

// 键盘事件处理
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    handleSearch()
  } else if (event.key === 'Escape') {
    showSuggestions.value = false
  }
}

// 点击外部关闭建议
const handleClickOutside = () => {
  setTimeout(() => {
    showSuggestions.value = false
  }, 200)
}
</script>

<template>
  <header class="top-header">
    <div class="header-content">
      <!-- 搜索和筛选容器 -->
      <div class="search-filter-container">
        <!-- 筛选按钮 -->
        <v-btn
          @click="emit('toggleFilter')"
          class="filter-toggle-btn"
          variant="text"
          size="small"
          icon
        >
          <v-icon>mdi-filter-variant</v-icon>
        </v-btn>
        
        <!-- 搜索框 -->
        <div class="search-box" @click="searchInputRef?.focus()">
          <v-icon class="search-icon">mdi-magnify</v-icon>
          <input
            ref="searchInputRef"
            :value="searchQuery"
            @input="handleSearchInput($event.target.value)"
            @keydown="handleKeydown"
            @blur="handleClickOutside"
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
      
      <!-- 搜索建议 -->
      <div v-if="showSuggestions && filteredSuggestions.length > 0" class="search-suggestions">
        <div
          v-for="suggestion in filteredSuggestions"
          :key="suggestion"
          @click="selectSuggestion(suggestion)"
          class="suggestion-item"
        >
          <v-icon class="suggestion-icon">mdi-magnify</v-icon>
          <span class="suggestion-text">{{ suggestion }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use '../styles/search-header.scss';
</style>
