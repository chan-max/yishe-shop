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

// 使用搜索状态管理
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
} = useSearchState()

// 使用搜索操作
const {
  performSearch,
  loadMorePhotos,
  toggleSidebar,
  toggleFilterMenu,
  clearFilters,
  applyFilters
} = useSearchActions()

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
