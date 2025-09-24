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
        <!-- Logo Section -->
        <div class="sidebar-logo">
          <NuxtLink to="/" class="logo-link">
            <img src="/logo.svg" alt="1s Design" class="logo-image" />
          </NuxtLink>
        </div>
        
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
                <img src="/logo.svg" alt="1s Design" class="mobile-logo-image" />
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
  min-width: 180px;
  max-width: 220px;
  width: 14vw;
  flex-shrink: 0;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 100;
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* 添加微妙的渐变背景 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, 
      rgba(255, 255, 255, 0.02) 0%, 
      transparent 20%, 
      transparent 80%, 
      rgba(255, 255, 255, 0.01) 100%
    );
    pointer-events: none;
  }
  
  @media (max-width: 1024px) {
    display: none;
  }
}

// Logo Section
.sidebar-logo {
  padding: 1rem 0.75rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 1rem;
}

.logo-link {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-decoration: none;
  color: var(--primary-color);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0.5rem;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  
  /* 添加hover效果 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.6s ease;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateX(2px);
    
    &::before {
      left: 100%;
    }
    
    .logo-image {
      transform: scale(1.05) rotate(2deg);
    }
    
    .logo-text {
      color: white;
    }
  }
}

.logo-image {
  width: 56px;
  height: 56px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.logo-text {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--primary-color);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.5px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0;
  
  /* 为导航链接添加进入动画 */
  .nav-link {
    animation: slideInLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1) both;
    
    &:nth-child(1) { animation-delay: 0.1s; }
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.3s; }
    &:nth-child(4) { animation-delay: 0.4s; }
    &:nth-child(5) { animation-delay: 0.5s; }
  }
}

/* 定义进入动画 */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
  transform: translateX(0);
  
  /* 添加渐变背景和阴影 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.6s ease;
  }
  
  /* 添加左侧指示条 */
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 3px;
    height: 0;
    background: var(--primary-color);
    border-radius: 0 2px 2px 0;
    transform: translateY(-50%);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  /* 图标动画 */
  .v-icon {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: scale(1);
  }
  
  /* Hover 状态 */
  &:hover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.12));
    color: white;
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    
    &::before {
      left: 100%;
    }
    
    &::after {
      height: 60%;
    }
    
    .v-icon {
      transform: scale(1.1) rotate(5deg);
      color: var(--primary-color);
    }
  }
  
  /* Active 状态 */
  &.router-link-active {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.2));
    color: white;
    transform: translateX(6px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    font-weight: 600;
    
    &::before {
      left: 100%;
    }
    
    &::after {
      height: 80%;
      background: var(--primary-color);
      box-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
    }
    
    .v-icon {
      transform: scale(1.15) rotate(0deg);
      color: var(--primary-color);
      filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.4));
    }
  }
  
  /* 点击时的脉冲效果 */
  &:active {
    transform: translateX(2px) scale(0.98);
    transition: all 0.1s ease;
  }
}


// Main Content
.main-content {
  flex: 1;
  margin-left: 14vw;
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
    width: 12vw;
    min-width: 160px;
  }
  
  .main-content {
    margin-left: 12vw;
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
  margin-left: 14vw;
  
  @media (max-width: 1200px) {
    margin-left: 12vw;
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

.mobile-logo-image {
  width: 52px;
  height: 52px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
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
  
  /* 为移动端导航链接添加进入动画 */
  .mobile-nav-link {
    animation: slideInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) both;
    
    &:nth-child(1) { animation-delay: 0.1s; }
    &:nth-child(2) { animation-delay: 0.15s; }
    &:nth-child(3) { animation-delay: 0.2s; }
    &:nth-child(4) { animation-delay: 0.25s; }
    &:nth-child(5) { animation-delay: 0.3s; }
  }
}

/* 定义移动端进入动画 */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  padding: 1rem;
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: 12px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  gap: 0.75rem;
  position: relative;
  overflow: hidden;
  transform: translateX(0);
  
  /* 添加滑动背景效果 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.6s ease;
  }
  
  /* 添加左侧指示条 */
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 4px;
    height: 0;
    background: var(--primary-color);
    border-radius: 0 3px 3px 0;
    transform: translateY(-50%);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  /* 图标动画 */
  .v-icon {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: scale(1);
  }
  
  /* Hover 状态 */
  &:hover {
    color: var(--primary-color);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.12));
    transform: translateX(6px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    
    &::before {
      left: 100%;
    }
    
    &::after {
      height: 70%;
    }
    
    .v-icon {
      transform: scale(1.1) rotate(5deg);
      color: var(--primary-color);
    }
  }
  
  /* Active 状态 */
  &.router-link-active {
    color: var(--primary-color);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.2));
    font-weight: 600;
    transform: translateX(8px);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.2);
    
    &::before {
      left: 100%;
    }
    
    &::after {
      height: 90%;
      background: var(--primary-color);
      box-shadow: 0 0 12px rgba(255, 255, 255, 0.4);
    }
    
    .v-icon {
      transform: scale(1.2) rotate(0deg);
      color: var(--primary-color);
      filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.6));
    }
  }
  
  /* 点击时的脉冲效果 */
  &:active {
    transform: translateX(4px) scale(0.98);
    transition: all 0.1s ease;
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

