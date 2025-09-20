<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-09-18 21:32:42
 * @FilePath: /yishe-nuxt/pages/search/components/SearchSidebar.vue
 * @Description: 搜索页面侧边栏组件
-->
<script lang="ts" setup>
interface Props {
  collapsed: boolean
  mobileVisible: boolean
  activePage: string
}

interface Emits {
  (e: 'toggle'): void
  (e: 'switch-page', page: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// 导航菜单数据 - 替换原来的服装设计、色彩搭配等按钮
const navSections = ref([
  {
    title: '设计分类',
    items: [
      { 
        icon: 'mdi-tshirt-crew-outline', 
        text: '服装设计', 
        href: '/search?category=clothing',
        value: 'clothing'
      },
      { 
        icon: 'mdi-image-multiple-outline', 
        text: '素材图', 
        href: '/search?category=materials',
        value: 'materials'
      },
      { 
        icon: 'mdi-home-variant-outline', 
        text: '生活用品设计', 
        href: '/search?category=lifestyle',
        value: 'lifestyle'
      },
      { 
        icon: 'mdi-account-star-outline', 
        text: '品牌Logo', 
        href: '/search?category=branding',
        value: 'branding'
      },
      { 
        icon: 'mdi-palette-outline', 
        text: '色彩搭配', 
        href: '/search?category=color',
        value: 'color'
      },
      { 
        icon: 'mdi-vector-square-outline', 
        text: 'UI设计', 
        href: '/search?category=ui',
        value: 'ui'
      },
      { 
        icon: 'mdi-package-variant-outline', 
        text: '包装设计', 
        href: '/search?category=packaging',
        value: 'packaging'
      },
      { 
        icon: 'mdi-book-open-variant-outline', 
        text: '平面设计', 
        href: '/search?category=graphic',
        value: 'graphic'
      }
    ]
  },
  {
    title: '个人中心',
    items: [
      { 
        icon: 'mdi-heart-outline', 
        text: '我的收藏', 
        href: '/favorites',
        value: 'favorites'
      },
      { 
        icon: 'mdi-clock-outline', 
        text: '最近浏览', 
        href: '/recent',
        value: 'recent'
      },
      { 
        icon: 'mdi-download-outline', 
        text: '我的下载', 
        href: '/downloads',
        value: 'downloads'
      },
      { 
        icon: 'mdi-account-outline', 
        text: '个人资料', 
        href: '/profile',
        value: 'profile'
      }
    ]
  }
])

// 当前选中的分类
const selectedCategory = ref('')
const selectedPersonal = ref('')

// 错误处理
const error = ref<string | null>(null)

// 切换侧边栏
const toggleSidebar = () => {
  emit('toggle')
}

// 处理分类点击
const handleCategoryClick = (item: any) => {
  try {
    selectedCategory.value = item.value
    selectedPersonal.value = '' // 清除个人中心选中状态
    
    // 只处理已实现的页面
    if (item.value === 'clothing' || item.value === 'materials') {
      emit('switch-page', item.value)
    } else {
      // 其他页面暂时显示提示
      console.log('该页面正在开发中:', item.text, item.value)
    }
  } catch (err) {
    console.error('处理分类点击失败:', err)
    error.value = '处理分类点击失败'
  }
}

// 处理个人中心点击
const handlePersonalClick = (item: any) => {
  try {
    selectedPersonal.value = item.value
    selectedCategory.value = '' // 清除分类选中状态
    // 可以在这里添加导航逻辑
    console.log('选择个人中心:', item.text, item.value)
  } catch (err) {
    console.error('处理个人中心点击失败:', err)
    error.value = '处理个人中心点击失败'
  }
}

// 检查是否选中
const isCategorySelected = (value: string) => props.activePage === value
const isPersonalSelected = (value: string) => selectedPersonal.value === value

// 主题切换
const toggleTheme = () => {
  // 这里可以添加主题切换逻辑
  console.log('切换主题')
}
</script>

<template>
  <!-- 桌面端侧边栏 -->
  <aside class="sidebar" :class="{ collapsed: collapsed }">
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
    
    <!-- 侧边栏切换按钮 -->
    <div class="sidebar-toggle">
      <v-btn
        @click="toggleSidebar"
        class="toggle-btn"
        variant="text"
        size="small"
        icon
      >
        <v-icon>{{ collapsed ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
      </v-btn>
    </div>
    
    <!-- 导航菜单 -->
    <nav class="sidebar-nav">
      <div v-for="section in navSections" :key="section.title" class="nav-section">
        <h3 class="nav-section-title">{{ section.title }}</h3>
        <div class="nav-items">
          <div
            v-for="item in section.items"
            :key="item.text"
            :class="[
              'nav-btn',
              {
                'nav-btn-selected': 
                  (section.title === '设计分类' && isCategorySelected(item.value)) ||
                  (section.title === '个人中心' && isPersonalSelected(item.value))
              }
            ]"
            @click="
              section.title === '设计分类' ? handleCategoryClick(item) :
              handlePersonalClick(item)
            "
          >
            <v-icon class="nav-icon">{{ item.icon }}</v-icon>
            <span v-if="!collapsed" class="nav-text">{{ item.text }}</span>
          </div>
        </div>
      </div>
    </nav>
    
    <!-- 主题切换按钮 -->
    <div class="theme-switcher-container">
      <div class="theme-switcher" :class="{ 'collapsed': collapsed }" @click="toggleTheme">
        <div class="theme-btn" :title="collapsed ? '主题切换' : '切换主题'">
          <v-icon class="theme-icon">mdi-weather-sunny</v-icon>
        </div>
        <span v-if="!collapsed" class="theme-text">主题切换</span>
      </div>
    </div>
  </aside>
  
  <!-- 移动端遮罩 -->
  <div 
    v-if="mobileVisible" 
    class="mobile-overlay"
    @click="toggleSidebar"
  />
  
  <!-- 移动端侧边栏 -->
  <aside 
    v-if="mobileVisible" 
    class="mobile-sidebar"
  >
    <div class="mobile-sidebar-header">
      <h3>导航菜单</h3>
      <v-btn
        @click="toggleSidebar"
        variant="text"
        size="small"
        icon
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
    
    <nav class="mobile-sidebar-nav">
      <div v-for="section in navSections" :key="section.title" class="nav-section">
        <h4 class="nav-section-title">{{ section.title }}</h4>
        <div class="nav-items">
          <div
            v-for="item in section.items"
            :key="item.text"
            :class="[
              'nav-btn',
              {
                'nav-btn-selected': 
                  (section.title === '设计分类' && isCategorySelected(item.value)) ||
                  (section.title === '个人中心' && isPersonalSelected(item.value))
              }
            ]"
            @click="
              section.title === '设计分类' ? handleCategoryClick(item) :
              handlePersonalClick(item);
              toggleSidebar()
            "
          >
            <v-icon class="nav-icon">{{ item.icon }}</v-icon>
            <span class="nav-text">{{ item.text }}</span>
          </div>
        </div>
      </div>
    </nav>
    
    <!-- 移动端主题切换按钮 -->
    <div class="mobile-theme-switcher">
      <div class="theme-switcher" @click="toggleTheme">
        <div class="theme-btn" title="切换主题">
          <v-icon class="theme-icon">mdi-weather-sunny</v-icon>
        </div>
        <span class="theme-text">主题切换</span>
      </div>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
@use '../styles/search-sidebar.scss';
</style>
