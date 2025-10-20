<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-04-03 05:45:40
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-09-24 21:09:38
 * @FilePath: /yishe-nuxt/layouts/page.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="overflow-x-hidden min-h-screen bg-white">
    <!-- 经典上方Header布局 -->
    <div class="main-layout">
      <!-- Top Header Navigation -->
      <header class="top-header">
        <div class="header-container">
          <!-- Logo Section -->
          <div class="header-logo">
            <NuxtLink to="/" class="logo-link">
              <img src="/logo.svg" alt="衣设服装设计" class="logo-image" />
              <span class="logo-text">衣设服装设计</span>
            </NuxtLink>
          </div>
          
          <!-- Desktop Navigation Menu -->
          <nav class="header-nav desktop-nav">
            <NuxtLink to="/" class="nav-link">
              首页
            </NuxtLink>
            <NuxtLink to="/products" class="nav-link">
              产品
            </NuxtLink>
            <NuxtLink to="/search" class="nav-link">
              搜索
              <v-icon right size="16">mdi-arrow-top-right</v-icon>
            </NuxtLink>
            <NuxtLink to="/design" class="nav-link">
              设计服务
            </NuxtLink>
            <NuxtLink to="/portfolio" class="nav-link">
              作品集
            </NuxtLink>
            <NuxtLink to="/gallery" class="nav-link">
              画廊
            </NuxtLink>
            <NuxtLink to="/blog" class="nav-link">
              博客
            </NuxtLink>
            <NuxtLink to="/about" class="nav-link">
              关于我们
            </NuxtLink>
            <NuxtLink to="/contact" class="nav-link">
              联系我们
            </NuxtLink>
          </nav>

          <!-- Mobile Menu Button -->
          <button 
            class="mobile-menu-btn"
            @click="toggleMobileMenu"
            :class="{ 'active': isMobileMenuOpen }"
          >
            <v-icon size="20">{{ isMobileMenuOpen ? 'mdi-close' : 'mdi-menu' }}</v-icon>
          </button>
        </div>
      </header>

      <!-- Mobile Menu Overlay -->
      <Transition name="mobile-menu">
        <div v-if="isMobileMenuOpen" class="mobile-menu-overlay" @click="closeMobileMenu">
          <div class="mobile-menu-content" @click.stop>
            <!-- Mobile Menu Header -->
            <div class="mobile-menu-header">
              <div class="mobile-logo">
                <img src="/logo.svg" alt="衣设服装设计" class="mobile-logo-image" />
                <span class="mobile-logo-text">衣设服装设计</span>
              </div>
              <button @click="closeMobileMenu" class="close-btn">
                <v-icon>mdi-close</v-icon>
              </button>
            </div>

            <!-- Mobile Menu Links -->
            <nav class="mobile-nav-menu">
              <NuxtLink to="/" class="mobile-nav-link" @click="closeMobileMenu">
                首页
              </NuxtLink>
              <NuxtLink to="/products" class="mobile-nav-link" @click="closeMobileMenu">
                产品
              </NuxtLink>
              <NuxtLink to="/search" class="mobile-nav-link" @click="closeMobileMenu">
                搜索
                <v-icon right size="16">mdi-arrow-top-right</v-icon>
              </NuxtLink>
              <NuxtLink to="/design" class="mobile-nav-link" @click="closeMobileMenu">
                设计服务
              </NuxtLink>
              <NuxtLink to="/portfolio" class="mobile-nav-link" @click="closeMobileMenu">
                作品集
              </NuxtLink>
              <NuxtLink to="/gallery" class="mobile-nav-link" @click="closeMobileMenu">
                画廊
              </NuxtLink>
              <NuxtLink to="/blog" class="mobile-nav-link" @click="closeMobileMenu">
                博客
              </NuxtLink>
              <NuxtLink to="/about" class="mobile-nav-link" @click="closeMobileMenu">
                关于我们
              </NuxtLink>
              <NuxtLink to="/contact" class="mobile-nav-link" @click="closeMobileMenu">
                联系我们
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
    
    <!-- Footer -->
    <LayoutPageFooter />
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
// CSS Variables - White Theme
:root {
  --primary-color: #2563eb;
  --secondary-color: #f8fafc;
  --accent-color: #64748b;
  --text-primary: #1e293b;
  --text-secondary: #475569;
  --text-muted: #94a3b8;
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-tertiary: #f1f5f9;
  --border-color: #e2e8f0;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
}

// Main Layout
.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

// Top Header
.top-header {
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 64px;
  width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
    min-height: 56px;
  }
  
  @media (max-width: 480px) {
    padding: 0 0.75rem;
    min-height: 52px;
  }
}

// Logo Section
.header-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 8px;
  
  &:hover {
    background: var(--bg-secondary);
    transform: scale(1.02);
    
    .logo-image {
      transform: rotate(5deg);
    }
    
    .logo-text {
      color: var(--primary-color);
    }
  }
}

.logo-image {
  width: 40px;
  height: 40px;
  transition: transform 0.3s ease;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  transition: color 0.3s ease;
  letter-spacing: -0.5px;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
}

// Desktop Navigation
.desktop-nav {
  display: flex;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 1024px) {
    display: none;
  }
}

.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: var(--primary-color);
    background: var(--bg-secondary);
  }
  
  &.router-link-active {
    color: var(--primary-color);
    background: var(--bg-tertiary);
    font-weight: 600;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: var(--primary-color);
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }
  
  &:hover::after,
  &.router-link-active::after {
    width: 80%;
  }
}

// Main Content
.main-content {
  flex: 1;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
}

// Mobile Menu Button
.mobile-menu-btn {
  display: none;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  width: 48px;
  height: 48px;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-sm);
  
  &:hover {
    background: var(--bg-secondary);
    transform: scale(1.05);
  }
  
  &.active {
    background: var(--primary-color);
    color: white;
  }
  
  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
  }
  
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
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
  box-shadow: var(--shadow-lg);
  width: 100%;
  max-width: 320px;
  max-height: 80vh;
  overflow-y: auto;
  backdrop-filter: blur(10px);
  
  @media (max-width: 480px) {
    max-width: 100%;
    border-radius: 8px;
    margin: 0.5rem;
  }
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
  width: 32px;
  height: 32px;
  transition: all 0.3s ease;
}

.mobile-logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
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
    color: var(--text-primary);
    background: var(--bg-secondary);
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
    background: var(--bg-secondary);
  }
  
  &.router-link-active {
    color: var(--primary-color);
    background: var(--bg-tertiary);
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

