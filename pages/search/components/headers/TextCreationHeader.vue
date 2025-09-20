<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-09-20 20:44:50
 * @FilePath: /yishe-nuxt/pages/search/components/headers/TextCreationHeader.vue
 * @Description: 文字创作Header组件 - 简化版
-->
<script lang="ts" setup>
interface Props {
  showMobileSidebar: boolean
}

interface Emits {
  (e: 'toggle-mobile-sidebar'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const toggleMobileSidebar = () => {
  emit('toggle-mobile-sidebar')
}
</script>

<template>
  <header class="text-creation-header">
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
      
      <!-- 标题区域 -->
      <div class="title-container">
        <p class="page-subtitle">AI 智能文字生成工具</p>
      </div>
    </div>
  </header>
</template>

<style scoped>
.text-creation-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-primary);
  padding: 0.5rem 0;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0 2rem;
  max-width: 100%;
  position: relative;
  min-height: 2.5rem;
}

.mobile-menu-btn {
  display: none;
  color: var(--text-secondary) !important;
  position: absolute;
  left: 1rem;
  
  &:hover {
    color: var(--text-primary) !important;
    background: var(--bg-hover) !important;
  }
}

.title-container {
  text-align: center;
  flex: 1;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
  background: linear-gradient(135deg, var(--theme-primary), var(--theme-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0;
  font-weight: 400;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .mobile-menu-btn {
    display: block;
  }

  .header-content {
    padding: 0 1rem;
    gap: 0.5rem;
    min-height: 2rem;
  }

  .title-container {
    margin-left: 3rem; /* 为移动端菜单按钮留出空间 */
  }

  .page-title {
    font-size: 1.5rem;
  }

  .page-subtitle {
    font-size: 0.8rem;
  }
}
</style>
