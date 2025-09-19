<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-01-27 11:00:00
 * @FilePath: /yishe-nuxt/pages/search/components/headers/BaseHeader.vue
 * @Description: 基础Header组件
-->
<script lang="ts" setup>
interface Props {
  title: string
  subtitle: string
  icon: string
  showMobileSidebar: boolean
  showFilterMenu: boolean
}

interface Emits {
  (e: 'toggle-mobile-sidebar'): void
  (e: 'toggle-filter-menu'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const toggleMobileSidebar = () => {
  emit('toggle-mobile-sidebar')
}

const toggleFilterMenu = () => {
  emit('toggle-filter-menu')
}
</script>

<template>
  <header class="top-header">
    <div class="header-content">
      <!-- 移动端菜单按钮 -->
      <v-btn
        variant="text"
        @click="toggleMobileSidebar"
        class="mobile-menu-btn"
        icon
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      
      <!-- Header信息 -->
      <div class="header-info">
        <div class="header-title-section">
          <div class="title-with-icon">
            <v-icon class="title-icon">{{ icon }}</v-icon>
            <div class="title-text">
              <h1 class="page-title">{{ title }}</h1>
              <p class="page-subtitle">{{ subtitle }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 插槽：搜索和筛选区域 -->
      <div class="search-filter-container">
        <slot name="search-filter" />
      </div>
    </div>
    
    <!-- 筛选菜单区域 -->
    <div v-if="showFilterMenu" class="filter-menu">
      <slot name="filter-content" />
    </div>
  </header>
</template>

<style scoped>
.top-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #1a1a1a;
  border-bottom: 1px solid #333;
  padding: 1rem 0;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0 2rem;
  max-width: 100%;
}

.mobile-menu-btn {
  display: none;
  color: #e0e0e0 !important;
}

.header-info {
  flex: 1;
  min-width: 0;
}

.header-title-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.title-with-icon {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.title-icon {
  color: #e55a2b;
  font-size: 1.5rem;
}

.title-text {
  min-width: 0;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  line-height: 1.2;
}

.page-subtitle {
  font-size: 0.9rem;
  color: #999;
  margin: 0.25rem 0 0 0;
  line-height: 1.3;
}

.search-filter-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.filter-menu {
  background: #1a1a1a;
  border-top: none;
  padding: 1.5rem 2rem 0 2rem;
  margin-top: 0;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .mobile-menu-btn {
    display: block;
  }

  .header-content {
    padding: 0 1rem;
    gap: 0.75rem;
  }

  .title-with-icon {
    gap: 0.5rem;
  }

  .title-icon {
    font-size: 1.25rem;
  }

  .page-title {
    font-size: 1.25rem;
  }

  .page-subtitle {
    font-size: 0.8rem;
  }

  .search-filter-container {
    gap: 0.5rem;
  }

  .filter-menu {
    padding: 1rem 1rem 0 1rem;
  }
}
</style>
