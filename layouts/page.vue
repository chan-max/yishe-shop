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
      <header 
        class="top-header" 
        :class="{ 'scrolled': isScrolled }" 
        :style="{ 
          position: isScrolled ? 'fixed' : 'sticky',
          top: '0',
          left: '0',
          right: '0',
          zIndex: isScrolled ? '9999' : '1000',
          background: isScrolled ? 'rgba(255, 255, 255, 0.98)' : '#ffffff',
          boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none'
        }">
        <div class="header-container">
          <!-- Left Section: Menu and Search -->
          <div class="header-left">
            <button 
              class="header-nav-item"
              @click="toggleMobileMenu"
              :class="{ 'active': isMobileMenuOpen }"
            >
              <v-icon size="18" class="menu-icon">{{ isMobileMenuOpen ? 'mdi-close' : 'mdi-menu' }}</v-icon>
              <span class="nav-text">目录</span>
            </button>
            <div class="search-input-wrapper">
              <v-icon size="16" class="search-icon">mdi-magnify</v-icon>
              <input 
                type="text" 
                placeholder="搜索" 
                class="search-input"
                @focus="handleSearchFocus"
                @blur="handleSearchBlur"
                @keyup.enter="handleSearch"
                v-model="searchKeyword"
              />
            </div>
          </div>
          
          <!-- Center Logo -->
          <div class="header-center">
            <NuxtLink to="/" class="logo-link">
              <img src="/logo.svg" alt="衣设服装设计" class="logo-image" />
            </NuxtLink>
          </div>
          
          <!-- Right Section: Contact and About -->
          <div class="header-right">
            <NuxtLink 
              to="/contact" 
              class="header-nav-item contact-link"
            >
              <span class="nav-text">联系我们</span>
            </NuxtLink>
            <NuxtLink 
              to="/about" 
              class="header-icon-btn"
              title="了解我们"
            >
              <v-icon size="18">mdi-information-outline</v-icon>
            </NuxtLink>
          </div>
        </div>
      </header>

      <!-- Mobile Menu Overlay -->
      <Transition name="mobile-menu">
        <div v-if="isMobileMenuOpen" class="mobile-menu-overlay" @click="closeMobileMenu">
          <div class="mobile-menu-content" @click.stop>
            <!-- Mobile Menu Header -->
            <div class="mobile-menu-header">
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
              <NuxtLink to="/pricing" class="mobile-nav-link" @click="closeMobileMenu">
                定价
              </NuxtLink>
              <NuxtLink to="/founder" class="mobile-nav-link" @click="closeMobileMenu">
                创始人
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

// 滚动状态
const isScrolled = ref(false)
const searchKeyword = ref('')
const isSearchFocused = ref(false)

// 移动端菜单控制
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// 关闭移动端菜单
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// 搜索相关方法
const handleSearchFocus = () => {
  isSearchFocused.value = true
}

const handleSearchBlur = () => {
  isSearchFocused.value = false
}

const handleSearch = () => {
  if (searchKeyword.value.trim()) {
    navigateTo(`/search?q=${encodeURIComponent(searchKeyword.value.trim())}`)
  }
}

// 监听路由变化，关闭移动端菜单
watch(() => route.path, () => {
  isMobileMenuOpen.value = false
})

// 使用 Nuxt 3 的 useEventListener
useEventListener('scroll', () => {
  if (process.client) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    const shouldScroll = scrollTop > 100
    
    isScrolled.value = shouldScroll
  }
}, { passive: true })

// 初始检查
onMounted(() => {
  if (process.client) {
    nextTick(() => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
      isScrolled.value = scrollTop > 100
    })
  }
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
  width: 100%;
  transition: all 0.3s ease;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  
  // 滚动后的样式变化
  &.scrolled {
    border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  }
}

// 顶部黑色条（可选，参考图中最上方）
.top-bar {
  width: 100%;
  height: 1px;
  background: #000000;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 85px;
  width: 100%;
  box-sizing: border-box;
  position: relative;

  @media (max-width: 1024px) {
    height: 80px;
  }

  @media (max-width: 768px) {
    padding: 0 1rem;
    height: 75px;
  }

  @media (max-width: 480px) {
    padding: 0 0.75rem;
    height: 70px;
  }
}

// Header Layout: Left, Center, Right
.header-left,
.header-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex: 1;
  min-width: 0;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.75rem;
  }
}

.header-center {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  flex-shrink: 0;
}

.header-left {
  justify-content: flex-start;
}

.header-right {
  justify-content: flex-end;
}

// Navigation Items with Icon and Text
.header-nav-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: transparent;
  border: none;
  border-radius: 0;
  color: #333333;
  cursor: pointer;
  text-decoration: none;
  transition: opacity 0.3s ease;
  padding: 0.5rem 0;
  font-weight: 400;
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  letter-spacing: 0.2px;
  
  &:hover {
    opacity: 0.7;
  }
  
  &.active {
    opacity: 1;
  }
  
  &.router-link-active {
    opacity: 1;
  }
  
  // 菜单图标样式 - 与文字尺寸同步
  .menu-icon {
    color: #333333;
  }
  
  .nav-text {
    white-space: nowrap;
    color: #333333;
    font-size: 0.75rem;
    
    @media (max-width: 1024px) {
      font-size: 0.7rem;
    }
    
    @media (max-width: 768px) {
      font-size: 0.65rem;
    }
    
    @media (max-width: 480px) {
      font-size: 0.6rem;
    }
  }
  
  @media (max-width: 768px) {
    gap: 0.3rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.25rem;
  }
}

// 右侧联系我们的文字样式
.contact-link .nav-text {
  font-size: 0.7rem;
  color: #333333;
  
  @media (max-width: 1024px) {
    font-size: 0.65rem;
  }
  
  @media (max-width: 768px) {
    font-size: 0.6rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.55rem;
  }
}

// 搜索输入框
.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  min-width: 120px;
  
  @media (max-width: 768px) {
    min-width: 100px;
  }
  
  @media (max-width: 480px) {
    min-width: 80px;
  }
  
  .search-icon {
    position: absolute;
    left: 0;
    color: #333333;
    pointer-events: none;
    z-index: 1;
  }
  
  .search-input {
    width: 100%;
    padding: 0.4rem 0.5rem 0.4rem 1.5rem;
    border: none;
    background: transparent;
    color: #333333;
    font-size: 0.75rem;
    font-weight: 400;
    font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    outline: none;
    transition: all 0.3s ease;
    
    &::placeholder {
      color: #666666;
      opacity: 0.8;
    }
    
    &:focus {
      color: #333333;
      
      &::placeholder {
        opacity: 0.5;
      }
    }
    
    @media (max-width: 1024px) {
      font-size: 0.7rem;
      padding: 0.35rem 0.45rem 0.35rem 1.4rem;
    }
    
    @media (max-width: 768px) {
      font-size: 0.65rem;
      padding: 0.3rem 0.4rem 0.3rem 1.3rem;
    }
    
    @media (max-width: 480px) {
      font-size: 0.6rem;
      padding: 0.25rem 0.35rem 0.25rem 1.2rem;
    }
  }
}

// Icon Buttons (for right side)
.header-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: auto;
  background: transparent;
  border: none;
  border-radius: 0;
  color: #333333;
  cursor: pointer;
  text-decoration: none;
  transition: opacity 0.3s ease;
  padding: 0.25rem;
  
  &:hover {
    opacity: 0.7;
  }
  
  &.active {
    opacity: 1;
  }
  
  &.router-link-active {
    opacity: 1;
  }
}

// Logo Section
.logo-link {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.3s ease;
  padding: 0.5rem 0;
  
  &:hover {
    opacity: 0.8;
  }
}

.logo-image {
  height: 42px;
  width: auto;
  transition: opacity 0.3s ease;
  
  @media (max-width: 1024px) {
    height: 38px;
  }
  
  @media (max-width: 768px) {
    height: 34px;
  }
  
  @media (max-width: 480px) {
    height: 30px;
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
  align-items: stretch;
  justify-content: flex-start;
  padding: 0;
  
  @media (max-width: 1024px) {
    display: flex;
  }
}

.mobile-menu-content {
  background: #ffffff;
  border-right: 1px solid #e2e8f0;
  width: 300px;
  height: 100vh;
  overflow-y: auto;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  @media (max-width: 480px) {
    width: 280px;
  }
}

.mobile-menu-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem 1.25rem;
  background: #ffffff;
}

.close-btn {
  background: none;
  border: none;
  color: #333333;
  cursor: pointer;
  padding: 0.25rem;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.6;
  }
}

.mobile-nav-menu {
  padding: 0.25rem 1.25rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  color: #333333;
  text-decoration: none;
  gap: 0.5rem;
  font-size: 0.8rem;
  font-weight: 400;
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  letter-spacing: 0.1px;
  transition: color 0.2s ease;
  border-bottom: 1px solid #f5f5f5;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    color: #333333;
    opacity: 0.6;
  }
  
  &.router-link-active {
    color: #333333;
    opacity: 1;
  }
}

// Mobile Menu Animation
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-menu-enter-from {
  opacity: 0;
  
  .mobile-menu-content {
    transform: translateX(-100%);
  }
}

.mobile-menu-leave-to {
  opacity: 0;
  
  .mobile-menu-content {
    transform: translateX(-100%);
  }
}

.mobile-menu-enter-active .mobile-menu-content,
.mobile-menu-leave-active .mobile-menu-content {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-menu-enter-from .mobile-menu-content,
.mobile-menu-leave-to .mobile-menu-content {
  transform: translateX(-100%);
}
</style>

