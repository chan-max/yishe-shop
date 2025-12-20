<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-04-03 05:45:40
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-11-10 06:51:14
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
          <!-- Left Section: Logo + Search -->
          <div class="header-left">
            <NuxtLink to="/" class="logo-link">
              <img src="/onestyle.png" alt="衣设服装设计" class="logo-image" />
            </NuxtLink>
            <div class="header-center">
              <div class="search-bar-wrapper">
              <input 
                type="text" 
                placeholder="搜索内容" 
                class="search-input"
                @focus="handleSearchFocus"
                @blur="handleSearchBlur"
                @keyup.enter="handleSearch"
                v-model="searchKeyword"
              />
              <button class="search-button" @click="handleSearch">
                <v-icon size="20" class="search-icon-btn">mdi-magnify</v-icon>
              </button>
            </div>
            </div>
          </div>
          
          <!-- Right Section: Navigation and Actions -->
          <div class="header-right">
            <div class="nav-links">
              <NuxtLink to="/" class="nav-link">
                <span>首页</span>
              </NuxtLink>
              <NuxtLink to="/products" class="nav-link">
                <span>产品</span>
                <v-icon size="16" class="nav-chevron">mdi-chevron-down</v-icon>
              </NuxtLink>
              <NuxtLink to="/design" class="nav-link">
                <span>设计服务</span>
                <v-icon size="16" class="nav-chevron">mdi-chevron-down</v-icon>
              </NuxtLink>
              <NuxtLink to="/portfolio" class="nav-link">
                <span>作品集</span>
              </NuxtLink>
              <NuxtLink to="/blog" class="nav-link">
                <span>博客</span>
              </NuxtLink>
            </div>
            <div class="action-buttons">
              <!-- 用户登录状态 -->
              <template v-if="publicUserStore.isLoggedIn && publicUserStore.currentUser">
                <div class="user-menu-wrapper">
                  <button 
                    class="user-menu-button"
                    @click.stop="isUserMenuOpen = !isUserMenuOpen"
                    ref="userButtonRef"
                  >
                    <span class="user-name">{{ publicUserStore.currentUser.name || publicUserStore.currentUser.account }}</span>
                    <v-icon size="16" class="user-menu-icon">mdi-chevron-down</v-icon>
                  </button>
                  <!-- 用户下拉菜单 -->
                  <Transition name="user-menu">
                    <div v-if="isUserMenuOpen" class="user-menu-dropdown" ref="userMenuRef" @click.stop>
                      <NuxtLink 
                        to="/profile" 
                        class="user-menu-item"
                        @click="isUserMenuOpen = false"
                      >
                        <v-icon size="18">mdi-account</v-icon>
                        <span>个人信息</span>
                      </NuxtLink>
                      <button 
                        class="user-menu-item logout-item"
                        @click="handleLogout"
                      >
                        <v-icon size="18">mdi-logout</v-icon>
                        <span>退出登录</span>
                      </button>
                    </div>
                  </Transition>
                </div>
              <NuxtLink to="/contact" class="contact-link">联系我们</NuxtLink>
              </template>
              <!-- 未登录状态 -->
              <template v-else>
                <NuxtLink to="/contact" class="contact-link">联系我们</NuxtLink>
                <!-- 登录和注册按钮挨着，放在最右侧 -->
                <div class="auth-buttons-group">
                  <NuxtLink to="/login" class="login-button">登录</NuxtLink>
                  <NuxtLink to="/register" class="register-button">注册</NuxtLink>
                </div>
              </template>
            </div>
          </div>
          
          <!-- Mobile Menu Button -->
          <button 
            class="mobile-menu-btn"
            @click="toggleMobileMenu"
            :class="{ 'active': isMobileMenuOpen }"
            :title="isMobileMenuOpen ? '关闭菜单' : '打开菜单'"
          >
            <v-icon size="24" class="menu-icon">{{ isMobileMenuOpen ? 'mdi-close' : 'mdi-menu' }}</v-icon>
          </button>
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

            <!-- Mobile Search Bar -->
            <div class="mobile-search-section">
              <div class="mobile-search-bar-wrapper">
                <input 
                  type="text" 
                  placeholder="搜索内容" 
                  class="mobile-search-input"
                  @focus="handleSearchFocus"
                  @blur="handleSearchBlur"
                  @keyup.enter="handleMobileSearch"
                  v-model="searchKeyword"
                />
                <button class="mobile-search-button" @click="handleMobileSearch">
                  <v-icon size="20" class="search-icon-btn">mdi-magnify</v-icon>
                </button>
              </div>
            </div>

            <!-- Mobile Menu Links -->
            <nav class="mobile-nav-menu">
              <NuxtLink to="/" class="mobile-nav-link" @click="closeMobileMenu">
                首页
              </NuxtLink>
              <NuxtLink to="/products" class="mobile-nav-link" @click="closeMobileMenu">
                产品
              </NuxtLink>
              <NuxtLink to="/design" class="mobile-nav-link" @click="closeMobileMenu">
                设计服务
              </NuxtLink>
              <NuxtLink to="/portfolio" class="mobile-nav-link" @click="closeMobileMenu">
                作品集
              </NuxtLink>
              <NuxtLink to="/blog" class="mobile-nav-link" @click="closeMobileMenu">
                博客
              </NuxtLink>
            </nav>

            <!-- Mobile User Section -->
            <div v-if="publicUserStore.isLoggedIn && publicUserStore.currentUser" class="mobile-user-section">
              <div class="mobile-user-info">
                <v-icon size="20">mdi-account-circle</v-icon>
                <span class="mobile-user-name">{{ publicUserStore.currentUser.name || publicUserStore.currentUser.account }}</span>
              </div>
              <NuxtLink 
                to="/profile" 
                class="mobile-nav-link" 
                @click="closeMobileMenu"
              >
                个人信息
              </NuxtLink>
              <button 
                class="mobile-nav-link logout-link"
                @click="async () => { await handleLogout(); }"
              >
                退出登录
              </button>
            </div>
            <!-- Mobile Login/Register Buttons -->
            <div v-else class="mobile-login-section">
              <NuxtLink 
                to="/login" 
                class="mobile-nav-link" 
                @click="closeMobileMenu"
              >
                登录
              </NuxtLink>
              <NuxtLink 
                to="/register" 
                class="mobile-nav-link" 
                @click="closeMobileMenu"
              >
                注册
              </NuxtLink>
            </div>

            <!-- Mobile Action Buttons -->
            <div class="mobile-action-buttons">
              <NuxtLink to="/contact" class="mobile-contact-link" @click="closeMobileMenu">
                联系我们
              </NuxtLink>
            </div>
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
import { usePublicUserStore } from '~/stores/public-user'
import { api } from '~/utils/api'

const route = useRoute()
const publicUserStore = usePublicUserStore()
const router = useRouter()

// 移动端菜单状态
const isMobileMenuOpen = ref(false)

// 滚动状态
const isScrolled = ref(false)
const searchKeyword = ref('')
const isSearchFocused = ref(false)

// 用户下拉菜单状态
const isUserMenuOpen = ref(false)

// 初始化时加载用户信息
onMounted(async () => {
  publicUserStore.initToken()
  if (publicUserStore.isLoggedIn) {
    try {
      const response = await api.publicUser.getUserInfo()
      // 后端成功时 code 为 0，status 为 true
      if (response.code === 0 || response.status === true || response.code === 200) {
        publicUserStore.setUserInfo(response.data)
      }
    } catch (error) {
      console.error('获取用户信息失败:', error)
    }
  }
})

// 退出登录
const handleLogout = async () => {
  try {
    await api.publicUser.logout()
  } catch (error) {
    console.error('登出失败:', error)
  } finally {
    publicUserStore.clearToken()
    isUserMenuOpen.value = false
    isMobileMenuOpen.value = false
    await router.push('/')
  }
}

// 点击外部关闭用户菜单
const userMenuRef = ref(null)
const userButtonRef = ref(null)

const handleClickOutside = (event) => {
  if (process.client && isUserMenuOpen.value) {
    const userMenu = userMenuRef.value
    const userButton = userButtonRef.value
    if (userMenu && userButton && !userMenu.contains(event.target) && !userButton.contains(event.target)) {
      isUserMenuOpen.value = false
    }
  }
}

onMounted(() => {
  if (process.client) {
    nextTick(() => {
      document.addEventListener('click', handleClickOutside)
    })
  }
})

onUnmounted(() => {
  if (process.client) {
    document.removeEventListener('click', handleClickOutside)
  }
})

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

const handleMobileSearch = () => {
  if (searchKeyword.value.trim()) {
    navigateTo(`/search?q=${encodeURIComponent(searchKeyword.value.trim())}`)
    closeMobileMenu()
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
  max-width: 1920px;
  margin: 0 auto;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 85px;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  gap: 1rem;
  // border-bottom: 1px solid #eee;

  @media (min-width: 1200px) {
    padding: 0 2rem;
    gap: 1.5rem;
  }

  @media (min-width: 1400px) {
    padding: 0 5rem;
    gap: 1rem;
  }
  
  @media (min-width: 1600px) {
    padding: 0 6rem;
  }
  
  @media (min-width: 1800px) {
    padding: 0 8rem;
  }

  @media (max-width: 1024px) {
    height: 80px;
    padding: 0 1rem;
  }

  @media (max-width: 768px) {
    padding: 0 1rem;
    height: 75px;
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    padding: 0 0.75rem;
    height: 70px;
  }
}

// Left Section - Logo + Search
.header-left {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 1.5rem;
  
  @media (min-width: 1400px) {
    gap: 2rem;
  }
}

.logo-link {
  text-decoration: none;
  color: #0d0c22;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.8;
  }
}

.logo-image {
  height: 60px;
  width: auto;
  transition: opacity 0.2s ease;
  transform: translateY(4px);
  
  @media (max-width: 1024px) {
    height: 56px;
    transform: translateY(3px);
  }
  
  @media (max-width: 768px) {
    height: 52px;
    transform: translateY(3px);
  }
  
  @media (max-width: 480px) {
    height: 48px;
    transform: translateY(2px);
  }
}

// Center Section - Search Bar
.header-center {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  
  @media (max-width: 991px) {
    display: none;
  }
}

.search-bar-wrapper {
  display: flex;
  align-items: center;
  width: 500px;
  background-color: #f8f8f8;
  border-radius: 999px;
  overflow: hidden;
  position: relative;
  
  @media (min-width: 1400px) {
    width: 600px;
  }
  
  @media (max-width: 1024px) {
    width: 450px;
  }
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  padding: 0.75rem 1rem 0.75rem 1.5rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: #0d0c22;
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  &::placeholder {
    color: #9e9ea7;
    font-weight: 500;
  }
}


.search-button {
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  background-color: #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin: 0.25rem;
  flex-shrink: 0;
  
  &:hover {
    background-color: #e0e0e0;
  }
  
  .search-icon-btn {
    color: #666666;
  }
}

// Right Section - Navigation and Actions
.header-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.75rem;
  }
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  
  @media (max-width: 991px) {
    display: none;
  }
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  text-decoration: none;
  color: #0d0c22;
  font-size: 0.75rem;
  font-weight: 400;
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  transition: opacity 0.2s ease;
  padding: 0.5rem 0;
  
  &:hover {
    opacity: 0.7;
  }
  
  .nav-chevron {
    color: #9e9ea7;
  }
}

.action-buttons {
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    gap: 0.75rem;
  }
}

// 用户菜单
.user-menu-wrapper {
  position: relative;
  
  @media (max-width: 991px) {
    display: none;
  }
}

.user-menu-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.8rem;
  font-weight: 500;
  color: #0d0c22;
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  &:hover {
    background-color: #f8f8f8;
    border-color: #d0d0d0;
  }
  
  .user-name {
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .user-menu-icon {
    color: #9e9ea7;
    transition: transform 0.2s ease;
  }
  
  &:hover .user-menu-icon {
    transform: rotate(180deg);
  }
}

.user-menu-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  min-width: 180px;
  z-index: 1000;
  overflow: hidden;
}

.user-menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: #0d0c22;
  font-size: 0.85rem;
  font-weight: 400;
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  transition: background-color 0.2s ease;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  
  &:hover {
    background-color: #f8f8f8;
  }
  
  &.logout-item {
    border-top: 1px solid #e2e8f0;
    color: #dc2626;
    
    &:hover {
      background-color: #fef2f2;
    }
  }
  
  v-icon {
    color: inherit;
  }
}

// 登录/注册按钮组
.auth-buttons-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  @media (max-width: 991px) {
    display: none;
  }
}

.login-button {
  text-decoration: none;
  color: var(--theme-primary, #6900ff);
  background-color: transparent;
  border: 1.5px solid var(--theme-primary, #6900ff);
  font-size: 0.8rem;
  font-weight: 600;
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(105, 0, 255, 0.05);
    border-color: var(--theme-primary-hover, #5a00e6);
    color: var(--theme-primary-hover, #5a00e6);
  }
  
  &:active {
    background-color: rgba(105, 0, 255, 0.1);
    border-color: var(--theme-primary-active, #4b00cc);
    color: var(--theme-primary-active, #4b00cc);
  }
}

.register-button {
  text-decoration: none;
  color: #ffffff;
  background-color: var(--theme-primary, #6900ff);
  border: 1.5px solid var(--theme-primary, #6900ff);
  font-size: 0.8rem;
  font-weight: 600;
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(105, 0, 255, 0.2);
  
  &:hover {
    background-color: var(--theme-primary-hover, #5a00e6);
    border-color: var(--theme-primary-hover, #5a00e6);
    box-shadow: 0 4px 6px rgba(105, 0, 255, 0.3);
    transform: translateY(-1px);
  }
  
  &:active {
    background-color: var(--theme-primary-active, #4b00cc);
    border-color: var(--theme-primary-active, #4b00cc);
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(105, 0, 255, 0.2);
  }
}

// 用户菜单动画
.user-menu-enter-active,
.user-menu-leave-active {
  transition: all 0.2s ease;
}

.user-menu-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.user-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

// 移动端用户区域
.mobile-user-section {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #e2e8f0;
}

.mobile-user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  margin-bottom: 0.5rem;
  
  v-icon {
    color: #2563eb;
  }
}

.mobile-user-name {
  font-size: 0.9rem;
  font-weight: 500;
  color: #0d0c22;
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.mobile-login-section {
  padding: 0.25rem 1.25rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0;
  border-bottom: 1px solid #e2e8f0;
}

.logout-link {
  color: #dc2626 !important;
  
  &:hover {
    color: #b91c1c !important;
  }
}

.contact-link {
  text-decoration: none;
  color: #0d0c22;
  font-size: 0.8rem;
  font-weight: 600;
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.7;
  }
  
  @media (max-width: 991px) {
    display: none;
  }
}

.customize-button {
  text-decoration: none;
  color: #ffffff;
  background-color: #0d0c22;
  font-size: 0.8rem;
  font-weight: 600;
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #1a1926;
  }
  
  @media (max-width: 991px) {
    display: none;
  }
  
  @media (max-width: 768px) {
    padding: 0.4rem 0.75rem;
    font-size: 0.75rem;
  }
}

// Mobile Menu Button
.mobile-menu-btn {
  display: none;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #0d0c22;
  
  @media (max-width: 991px) {
    display: flex;
  }
  
  .menu-icon {
    color: #0d0c22;
  }
}


// Main Content
.main-content {
  flex: 1;
  padding: 0;
  max-width: 1920px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  
  @media (min-width: 1200px) {
    padding: 0 2rem;
  }

  @media (min-width: 1400px) {
    padding: 0 3rem;
  }
  
  @media (min-width: 1600px) {
    padding: 0 4rem;
  }
  
  @media (min-width: 1800px) {
    padding: 0 5rem;
  }
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0 0.75rem;
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
  width: 320px;
  height: 100vh;
  overflow-y: auto;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  
  @media (max-width: 480px) {
    width: 100%;
    max-width: 320px;
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

// Mobile Search Section
.mobile-search-section {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #e2e8f0;
}

.mobile-search-bar-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #f8f8f8;
  border-radius: 999px;
  overflow: hidden;
  position: relative;
  min-width: 0;
  flex-wrap: nowrap;
}

.mobile-search-input {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  padding: 0.75rem 1rem 0.75rem 1.5rem;
  font-size: 16px;
  font-weight: 500;
  color: #0d0c22;
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  &::placeholder {
    color: #9e9ea7;
    font-weight: 500;
  }
}


.mobile-search-button {
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  background-color: #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin: 0.25rem;
  flex-shrink: 0;
  z-index: 1;
  
  &:hover {
    background-color: #e0e0e0;
  }
  
  .search-icon-btn {
    color: #666666;
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
  padding: 0.75rem 0;
  color: #0d0c22;
  text-decoration: none;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 400;
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  letter-spacing: 0.1px;
  transition: color 0.2s ease;
  border-bottom: 1px solid #f5f5f5;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    color: #0d0c22;
    opacity: 0.7;
  }
  
  &.router-link-active {
    color: #0d0c22;
    opacity: 1;
    font-weight: 500;
  }
}

// Mobile Action Buttons
.mobile-action-buttons {
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border-top: 1px solid #e2e8f0;
}

.mobile-contact-link {
  text-decoration: none;
  color: #0d0c22;
  font-size: 0.85rem;
  font-weight: 500;
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: 0.75rem 1rem;
  text-align: center;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f8f8f8;
    border-color: #d0d0d0;
  }
}

.mobile-customize-button {
  text-decoration: none;
  color: #ffffff;
  background-color: #0d0c22;
  font-size: 0.85rem;
  font-weight: 500;
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: 0.75rem 1rem;
  text-align: center;
  border-radius: 8px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #1a1926;
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

