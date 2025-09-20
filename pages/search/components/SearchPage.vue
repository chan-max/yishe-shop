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
import SearchSidebar from './SearchSidebar.vue'
import ClothingPage from '../pages/ClothingPage.vue'
import MaterialsPage from '../pages/MaterialsPage.vue'

// 当前激活的页面
const activePage = ref('clothing') // 默认显示服装页面

// 侧边栏状态
const sidebarCollapsed = ref(false)
const showMobileSidebar = ref(false)

// 切换侧边栏
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

// 切换页面
const switchPage = (page: string) => {
  activePage.value = page
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
    const pageTitles: Record<string, string> = {
      'clothing': '服装设计 - 衣设',
      'materials': '素材图库 - 衣设'
    }
    return pageTitles[activePage.value] || '搜索 - 衣设服装设计'
  }),
  meta: [
    {
      name: 'description',
      content: '在衣设服装设计平台搜索您想要的服装设计和素材，支持智能筛选和个性化推荐。'
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
      :active-page="activePage"
      @toggle="toggleSidebar"
      @switch-page="switchPage"
    />
    
    <!-- 主要内容区域 -->
    <div class="main-content" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <!-- 服装页面 -->
      <ClothingPage v-if="activePage === 'clothing'" />
      
      <!-- 素材页面 -->
      <MaterialsPage v-else-if="activePage === 'materials'" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/search-page.scss';
</style>
