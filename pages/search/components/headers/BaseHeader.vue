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
  showMobileSidebar: boolean
  showFilterMenu?: boolean
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
      
      <!-- 插槽：搜索和筛选区域 - 居中显示 -->
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
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-primary);
  padding: 1rem 0;
  transition: all 0.3s ease;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 0 2rem;
  max-width: 100%;
  position: relative;
}

.mobile-menu-btn {
  display: none;
  color: var(--text-secondary) !important;
  position: absolute;
  left: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--text-primary) !important;
    background: var(--bg-hover) !important;
  }
}

.search-filter-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  justify-content: center;
  max-width: 600px;
}

.filter-menu {
  background: var(--bg-primary);
  border-top: none;
  padding: 1.5rem 2rem 0 2rem;
  margin-top: 0;
  transition: all 0.3s ease;
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

  .search-filter-container {
    gap: 0.5rem;
    max-width: none;
    margin-left: 3rem; /* 为移动端菜单按钮留出空间 */
  }

  .filter-menu {
    padding: 1rem 1rem 0 1rem;
  }
}
</style>
