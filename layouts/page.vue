<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-04-03 05:45:40
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-09-21 19:59:41
 * @FilePath: /yishe-nuxt/layouts/page.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="overflow-x-hidden min-h-screen bg-black">
    <!-- 检查是否为search页面，如果是则不显示左侧菜单 -->
    <div v-if="route.path !== '/search'" class="main-layout">
      <!-- Left Sidebar Navigation -->
      <aside class="sidebar">
        <nav class="sidebar-nav">
          <NuxtLink to="/" class="nav-link">
            <v-icon left size="16">mdi-home</v-icon>
            Home
          </NuxtLink>
          <NuxtLink to="/products" class="nav-link">
            <v-icon left size="16">mdi-tshirt-crew</v-icon>
            Products
          </NuxtLink>
          <NuxtLink to="/search" class="nav-link">
            <v-icon left size="16">mdi-magnify</v-icon>
            Search
          </NuxtLink>
          <NuxtLink to="/about" class="nav-link">
            <v-icon left size="16">mdi-information</v-icon>
            About
          </NuxtLink>
          <NuxtLink to="/contact" class="nav-link">
            <v-icon left size="16">mdi-email</v-icon>
            Contact
          </NuxtLink>
        </nav>
        <div class="sidebar-footer">
          <v-icon color="white" size="16">mdi-diamond</v-icon>
        </div>
      </aside>

      <!-- Main Content Area -->
      <main class="main-content">
        <slot />
      </main>
    </div>
    
    <!-- Footer for non-search pages -->
    <div v-if="route.path !== '/search'" class="footer-wrapper">
      <LayoutPageFooter />
    </div>
    
    <!-- Search页面使用原来的布局 -->
    <div v-else>
      <LayoutPageNavbar />
      <LayoutPageContent>
        <slot />
      </LayoutPageContent>
      <LayoutPageFooter />
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

</script>

<style lang="scss" scoped>
// CSS Variables - Pure Black Theme
:root {
  --primary-color: #ffffff;
  --text-primary: #ffffff;
  --text-secondary: #d1d5db;
  --text-muted: #9ca3af;
  --bg-primary: #000000;
  --bg-secondary: #111111;
  --bg-tertiary: #1a1a1a;
  --border-color: #333333;
}

// Main Layout
.main-layout {
  display: flex;
  min-height: 100vh;
  padding-top: 0;
}

// Left Sidebar
.sidebar {
  background: var(--bg-primary);
  border-right: 1px solid var(--border-color);
  padding: 1.5rem 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 160px;
  max-width: 200px;
  width: 12vw;
  flex-shrink: 0;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 100;
  
  @media (max-width: 1024px) {
    display: none;
  }
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 2rem;
}

.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
  
  &.router-link-active {
    background: rgba(255, 255, 255, 0.15);
    color: white;
  }
}

.sidebar-footer {
  display: flex;
  justify-content: center;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

// Main Content
.main-content {
  flex: 1;
  margin-left: 12vw;
  min-width: 0;
  padding: 2rem;
  
  @media (max-width: 1024px) {
    margin-left: 0;
    padding: 1rem;
  }
}

// Responsive Design
@media (max-width: 1200px) {
  .sidebar {
    width: 10vw;
    min-width: 140px;
  }
  
  .main-content {
    margin-left: 10vw;
  }
}

@media (max-width: 1024px) {
  .main-layout {
    flex-direction: column;
  }
  
  .sidebar {
    display: none;
  }
  
  .main-content {
    margin-left: 0;
    padding: 1rem;
  }
}

// Footer wrapper to avoid overlap with sidebar
.footer-wrapper {
  margin-left: 12vw;
  
  @media (max-width: 1200px) {
    margin-left: 10vw;
  }
  
  @media (max-width: 1024px) {
    margin-left: 0;
  }
}
</style>

