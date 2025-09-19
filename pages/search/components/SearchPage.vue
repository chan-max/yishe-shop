<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-09-18 21:32:42
 * @FilePath: /yishe-nuxt/pages/search/components/SearchPage.vue
 * @Description: 搜索页面主组件
-->
<script lang="ts" setup>
// 导入子组件
import SearchHeader from './SearchHeader.vue'
import SearchSidebar from './SearchSidebar.vue'
import SearchContent from './SearchContent.vue'
import SearchFilter from './SearchFilter.vue'

// 导入composables
import { useSearchState } from '../composables/useSearchState'
import { useSearchActions } from '../composables/useSearchActions'
import { safeExecute, isInitialized } from '../utils/initialization'

// 使用搜索状态管理 - 添加防御性编程
const searchState = safeExecute(
  () => useSearchState(),
  {
    searchQuery: ref(''),
    searchResults: ref([]),
    loading: ref(false),
    hasSearched: ref(false),
    totalResults: ref(0),
    currentPage: ref(1),
    pageSize: ref(20),
    showFilterMenu: ref(false),
    sidebarCollapsed: ref(false),
    showMobileSidebar: ref(false)
  },
  '初始化搜索状态失败'
)

const {
  searchQuery,
  searchResults,
  loading,
  hasSearched,
  totalResults,
  currentPage,
  pageSize,
  showFilterMenu,
  sidebarCollapsed,
  showMobileSidebar
} = searchState

// 使用搜索操作 - 添加防御性编程
const searchActions = safeExecute(
  () => useSearchActions(),
  {
    performSearch: () => console.log('搜索功能不可用'),
    loadMorePhotos: () => console.log('加载更多功能不可用'),
    toggleSidebar: () => console.log('侧边栏切换功能不可用'),
    toggleFilterMenu: () => console.log('筛选菜单切换功能不可用'),
    clearFilters: () => console.log('清空筛选功能不可用'),
    applyFilters: () => console.log('应用筛选功能不可用')
  },
  '初始化搜索操作失败'
)

const {
  performSearch,
  loadMorePhotos,
  toggleSidebar,
  toggleFilterMenu,
  clearFilters,
  applyFilters
} = searchActions

// 错误处理
const error = ref<string | null>(null)

// 初始化检查
onMounted(() => {
  // 检查所有关键变量是否已正确初始化
  const checks = [
    { name: 'searchQuery', value: searchQuery },
    { name: 'searchResults', value: searchResults },
    { name: 'loading', value: loading },
    { name: 'hasSearched', value: hasSearched },
    { name: 'totalResults', value: totalResults },
    { name: 'currentPage', value: currentPage },
    { name: 'pageSize', value: pageSize },
    { name: 'showFilterMenu', value: showFilterMenu },
    { name: 'sidebarCollapsed', value: sidebarCollapsed },
    { name: 'showMobileSidebar', value: showMobileSidebar }
  ]
  
  const failedChecks = checks.filter(check => !isInitialized(check.value, check.name))
  
  if (failedChecks.length > 0) {
    console.error('以下变量初始化失败:', failedChecks.map(c => c.name))
    error.value = `初始化失败: ${failedChecks.map(c => c.name).join(', ')}`
  }
})

// 监听错误
onErrorCaptured((err) => {
  console.error('SearchPage 捕获到错误:', err)
  error.value = err.message || '发生未知错误'
  return false
})

// 设置页面标题
useHead({
  titleTemplate: '',
  title: computed(() => {
    const keyword = searchQuery.value
    return keyword ? `搜索"${keyword}" - 衣设服装设计` : '搜索 - 衣设服装设计'
  }),
  meta: [
    {
      name: 'description',
      content: '在衣设服装设计平台搜索您想要的服装设计，支持智能筛选和个性化推荐。'
    }
  ]
})
</script>

<template>
  <div class="search-page">
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
    
    <!-- 侧边栏 -->
    <SearchSidebar 
      :collapsed="sidebarCollapsed"
      :mobile-visible="showMobileSidebar"
      @toggle="toggleSidebar"
    />
    
    <!-- 主要内容区域 -->
    <div class="main-content" :class="{ 'sidebar-collapsed': sidebarCollapsed, 'filter-expanded': showFilterMenu }">
      <!-- 顶部头部 -->
      <SearchHeader 
        :search-query="searchQuery"
        :show-filter-menu="showFilterMenu"
        @update:search-query="searchQuery = $event"
        @toggle-filter="toggleFilterMenu"
        @search="performSearch"
      />
      
      <!-- 过滤菜单 -->
      <SearchFilter 
        :show="showFilterMenu"
        @update:show="showFilterMenu = $event"
        @clear="clearFilters"
        @apply="applyFilters"
      />
      
      <!-- 内容区域 -->
      <SearchContent 
        :search-results="searchResults"
        :loading="loading"
        :has-searched="hasSearched"
        :total-results="totalResults"
        :current-page="currentPage"
        :page-size="pageSize"
        @load-more="loadMorePhotos"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/search-page.scss';
</style>
