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

      <!-- Mobile Menu Button -->
      <button 
        class="mobile-menu-btn"
        @click="toggleMobileMenu"
        :class="{ 'active': isMobileMenuOpen }"
      >
        <v-icon size="20">{{ isMobileMenuOpen ? 'mdi-close' : 'mdi-menu' }}</v-icon>
      </button>

      <!-- Mobile Menu Overlay -->
      <Transition name="mobile-menu">
        <div v-if="isMobileMenuOpen" class="mobile-menu-overlay" @click="closeMobileMenu">
          <div class="mobile-menu-content" @click.stop>
            <!-- Mobile Menu Header -->
            <div class="mobile-menu-header">
              <div class="mobile-logo">
                <v-icon size="24" color="primary">mdi-diamond</v-icon>
                <span class="mobile-logo-text">1s Design</span>
              </div>
              <button @click="closeMobileMenu" class="close-btn">
                <v-icon>mdi-close</v-icon>
              </button>
            </div>

            <!-- Mobile Menu Links -->
            <nav class="mobile-nav-menu">
              <NuxtLink to="/" class="mobile-nav-link" @click="closeMobileMenu">
                <v-icon left>mdi-home</v-icon>
                Home
              </NuxtLink>
              <NuxtLink to="/search" class="mobile-nav-link" @click="closeMobileMenu">
                <v-icon left>mdi-magnify</v-icon>
                Search
              </NuxtLink>
              <NuxtLink to="/about" class="mobile-nav-link" @click="closeMobileMenu">
                <v-icon left>mdi-information</v-icon>
                About
              </NuxtLink>
              <NuxtLink to="/contact" class="mobile-nav-link" @click="closeMobileMenu">
                <v-icon left>mdi-email</v-icon>
                Contact
              </NuxtLink>
            </nav>
          </div>
        </div>
      </Transition>

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

// 移动端菜单状态
const isMobileMenuOpen = ref(false)

// 移动端菜单控制
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// 关闭移动端菜单
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// 监听路由变化，关闭移动端菜单
watch(() => route.path, () => {
  isMobileMenuOpen.value = false
})
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

// Mobile Menu Button
.mobile-menu-btn {
  display: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.98);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7);
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }
  
  &.active {
    background: var(--primary-color);
    color: var(--bg-primary);
  }
  
  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

// Mobile Menu Overlay
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 1rem;
  
  @media (max-width: 1024px) {
    display: flex;
  }
}

.mobile-menu-content {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 320px;
  max-height: 80vh;
  overflow-y: auto;
  backdrop-filter: blur(10px);
}

.mobile-menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.mobile-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.mobile-logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-color);
}

.close-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
    background: rgba(255, 255, 255, 0.1);
  }
}

.mobile-nav-menu {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  padding: 1rem;
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  gap: 0.75rem;
  
  &:hover {
    color: var(--primary-color);
    background: rgba(255, 255, 255, 0.1);
  }
  
  &.router-link-active {
    color: var(--primary-color);
    background: rgba(255, 255, 255, 0.15);
    font-weight: 600;
  }
}

// Mobile Menu Animation
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}

.mobile-menu-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>

