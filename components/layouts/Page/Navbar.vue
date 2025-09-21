<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-01-27 11:00:00
 * @FilePath: /yishe-nuxt/components/layouts/Page/Navbar.vue
 * @Description: 1s Design - Simple Navigation Header
-->
<script lang="ts" setup>
const route = useRoute();

// 移动端菜单状态
const isMobileMenuOpen = ref(false);

// 移动端菜单控制
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// 关闭移动端菜单
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};
</script>

<template>
  <div class="navbar">
    <div class="container">
      <div class="navbar-content">
        <!-- Logo -->
        <div class="logo" @click="navigateTo('/')">
          <v-icon size="32" color="primary">mdi-diamond</v-icon>
          <span class="logo-text">1s Design</span>
        </div>
        
        <!-- Desktop Navigation Menu -->
        <nav class="nav-menu desktop-nav">
          <NuxtLink to="/search" class="nav-link" :class="{ 'active': route.path === '/search' }">
            Search
                    </NuxtLink>
          <NuxtLink to="/about" class="nav-link" :class="{ 'active': route.path === '/about' }">
            About
                </NuxtLink>
          <NuxtLink to="/contact" class="nav-link" :class="{ 'active': route.path === '/contact' }">
            Contact
              </NuxtLink>
        </nav>

        <!-- Mobile Menu Button -->
                        <button
          class="mobile-menu-btn"
          @click="toggleMobileMenu"
        >
          <v-icon>mdi-menu</v-icon>
                        </button>
                      </div>
                    </div>

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
                      <NuxtLink
              to="/search" 
              class="mobile-nav-link"
              :class="{ 'active': route.path === '/search' }"
                        @click="closeMobileMenu"
                      >
              <v-icon left>mdi-magnify</v-icon>
              Search
                      </NuxtLink>
                      <NuxtLink
              to="/about" 
              class="mobile-nav-link"
              :class="{ 'active': route.path === '/about' }"
                        @click="closeMobileMenu"
                      >
              <v-icon left>mdi-information</v-icon>
              About
                      </NuxtLink>
                      <NuxtLink
              to="/contact" 
              class="mobile-nav-link"
              :class="{ 'active': route.path === '/contact' }"
                        @click="closeMobileMenu"
                      >
              <v-icon left>mdi-email</v-icon>
              Contact
                      </NuxtLink>
          </nav>
              </div>
            </div>
          </Transition>
  </div>
</template>

<style lang="scss" scoped>
// CSS Variables
:root {
  --primary-color: #667eea;
  --text-primary: #2d3748;
  --text-secondary: #4a5568;
  --bg-primary: #ffffff;
  --border-color: #e2e8f0;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
}

// Dark mode variables
.dark {
  --text-primary: #f7fafc;
  --text-secondary: #e2e8f0;
  --bg-primary: #1a202c;
  --border-color: #4a5568;
}

.navbar {
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  min-height: 64px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  letter-spacing: -0.5px;
}

.desktop-nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.5rem 0;
  
  &:hover {
    color: var(--primary-color);
  }
  
  &.active {
    color: var(--primary-color);
    font-weight: 600;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--primary-color);
    transition: width 0.3s ease;
  }
  
  &:hover::after,
  &.active::after {
    width: 100%;
  }
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
    background: rgba(102, 126, 234, 0.1);
  }
}

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
  justify-content: flex-end;
  padding: 1rem;
}

.mobile-menu-content {
  background: var(--bg-primary);
  border-radius: 12px;
  box-shadow: var(--shadow-md);
  width: 100%;
  max-width: 320px;
  max-height: 80vh;
  overflow-y: auto;
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
  gap: 0.5rem;
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
    background: rgba(102, 126, 234, 0.1);
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
  
  &:hover {
    color: var(--primary-color);
    background: rgba(102, 126, 234, 0.1);
  }
  
  &.active {
    color: var(--primary-color);
    background: rgba(102, 126, 234, 0.15);
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
  transform: translateX(100%);
}

.mobile-menu-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

// Responsive Design
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .navbar-content {
    padding: 0.75rem 0;
  }
  
  .desktop-nav {
    display: none;
  }
  
  .mobile-menu-btn {
    display: block;
  }
  
  .logo-text {
    font-size: 1.25rem;
  }
}

@media (max-width: 480px) {
  .mobile-menu-overlay {
    padding: 0.5rem;
  }
  
  .mobile-menu-content {
    max-width: 100%;
  }
  
  .mobile-menu-header {
    padding: 1rem;
  }
  
  .mobile-nav-menu {
    padding: 0.75rem;
  }
  
  .mobile-nav-link {
    padding: 0.75rem;
  }
}
</style>