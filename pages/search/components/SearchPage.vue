<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-09-19 06:26:33
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-09-19 22:34:15
 * @FilePath: /yishe-scripts/Users/jackie/workspace/yishe-nuxt/pages/search/components/SearchPage.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-09-18 21:32:42
 * @FilePath: /yishe-nuxt/pages/search/components/SearchPage.vue
 * @Description: 搜索页面主组件
-->
<script lang="ts" setup>
import { ref, computed, onMounted, onErrorCaptured } from 'vue'

// 导入子组件
import SearchHeader from './SearchHeader.vue'
import SearchSidebar from './SearchSidebar.vue'
import SearchContent from './SearchContent.vue'
import SearchFilter from './SearchFilter.vue'

// 搜索相关状态
const searchQuery = ref('')
const searchResults = ref<any[]>([])
const loading = ref(false)
const hasSearched = ref(false)
const totalResults = ref(0)
const currentPage = ref(1)
const pageSize = ref(20)

// 侧边栏状态
const sidebarCollapsed = ref(false)
const showMobileSidebar = ref(false)

// 筛选菜单状态
const showFilterMenu = ref(false)

// 执行搜索
const performSearch = async () => {
  try {
    // 这里可以添加搜索逻辑
    console.log('执行搜索')
  } catch (error) {
    console.error('搜索执行失败:', error)
  }
}

// 加载更多照片
const loadMorePhotos = async () => {
  try {
    // 这里可以添加加载更多逻辑
    console.log('加载更多照片')
  } catch (error) {
    console.error('加载更多照片失败:', error)
  }
}

// 切换侧边栏
const toggleSidebar = () => {
  try {
    // 这里可以添加侧边栏切换逻辑
    console.log('切换侧边栏')
  } catch (error) {
    console.error('切换侧边栏失败:', error)
  }
}

// 切换筛选菜单
const toggleFilterMenu = () => {
  try {
    // 这里可以添加筛选菜单切换逻辑
    console.log('切换筛选菜单')
  } catch (error) {
    console.error('切换筛选菜单失败:', error)
  }
}

// 清空筛选条件
const clearFilters = () => {
  try {
    // 这里可以添加清空筛选逻辑
    console.log('清空筛选条件')
  } catch (error) {
    console.error('清空筛选条件失败:', error)
  }
}

// 应用筛选条件
const applyFilters = () => {
  try {
    // 这里可以添加应用筛选逻辑
    console.log('应用筛选条件')
  } catch (error) {
    console.error('应用筛选条件失败:', error)
  }
}

// 错误处理
const error = ref<string | null>(null)

// 初始化检查
onMounted(() => {
  // 基本初始化检查
  console.log('SearchPage 已挂载')
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
