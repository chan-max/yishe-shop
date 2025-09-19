/**
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-09-18 21:32:42
 * @FilePath: /yishe-nuxt/pages/search/composables/useSearchState.ts
 * @Description: 搜索页面状态管理
 */

export const useSearchState = () => {
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

  return {
    // 搜索状态
    searchQuery,
    searchResults,
    loading,
    hasSearched,
    totalResults,
    currentPage,
    pageSize,
    
    // 侧边栏状态
    sidebarCollapsed,
    showMobileSidebar,
    
    // 筛选状态
    showFilterMenu
  }
}
