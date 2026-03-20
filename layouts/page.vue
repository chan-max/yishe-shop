<template>
  <div class="page-shell">
    <div
      v-if="showStickyHeader"
      class="site-header-spacer"
      :style="{ height: `${headerHeight}px` }"
      aria-hidden="true"
    ></div>

    <header
      ref="headerRef"
      class="site-header"
      :class="{
        'site-header-scrolled': isScrolled,
        'site-header-fixed': showStickyHeader,
        'site-header-visible': showStickyHeader,
      }"
    >
      <div class="header-inner">
        <NuxtLink to="/" class="brand-mark" aria-label="衣设首页">
          <img src="/logo.svg" alt="衣设" class="brand-logo" />
          <div class="brand-copy">
            <span class="brand-kicker">Creative POD House</span>
            <strong>衣设</strong>
          </div>
        </NuxtLink>

        <nav class="desktop-nav" aria-label="主导航">
          <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to" class="nav-item">
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div class="header-actions">
          <NuxtLink to="/products" class="header-chip desktop-only">探索商品</NuxtLink>

          <template v-if="isLoggedIn && currentUser">
            <div class="user-menu-wrapper">
              <button ref="userButtonRef" class="user-menu-button" @click.stop="isUserMenuOpen = !isUserMenuOpen">
                <v-avatar size="26" :color="getAvatarColor(currentUser.name || currentUser.account)">
                  {{ getAvatarInitial(currentUser.name || currentUser.account) }}
                </v-avatar>
                <span class="user-name">{{ currentUser.name || currentUser.account }}</span>
                <v-icon size="16" class="user-menu-caret">mdi-chevron-down</v-icon>
              </button>

              <Transition name="user-menu">
                <div v-if="isUserMenuOpen" ref="userMenuRef" class="user-menu-dropdown" @click.stop>
                  <NuxtLink to="/profile" class="user-menu-item" @click="isUserMenuOpen = false">个人信息</NuxtLink>
                  <NuxtLink to="/favorites" class="user-menu-item" @click="isUserMenuOpen = false">我的收藏</NuxtLink>
                  <button class="user-menu-item logout-item" @click="handleLogout">退出登录</button>
                </div>
              </Transition>
            </div>
          </template>

          <template v-else>
            <NuxtLink to="/login" class="login-button">登录</NuxtLink>
          </template>

          <button class="mobile-menu-btn" :class="{ active: isMobileMenuOpen }" :title="isMobileMenuOpen ? '关闭菜单' : '打开菜单'" @click="toggleMobileMenu">
            <v-icon size="20">{{ isMobileMenuOpen ? 'mdi-close' : 'mdi-menu' }}</v-icon>
          </button>
        </div>
      </div>
    </header>

    <Transition name="mobile-menu">
      <div v-if="isMobileMenuOpen" class="mobile-panel-overlay" @click="closeMobileMenu">
        <aside class="mobile-panel" @click.stop>
          <div class="mobile-panel-head">
            <div>
              <span class="brand-kicker">Creative POD House</span>
              <h2>衣设导航</h2>
            </div>
            <button class="mobile-close-btn" @click="closeMobileMenu">
              <v-icon>mdi-close</v-icon>
            </button>
          </div>

          <nav class="mobile-nav" aria-label="移动端导航">
            <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to" class="mobile-nav-link" @click="closeMobileMenu">
              {{ item.label }}
            </NuxtLink>
            <NuxtLink to="/contact" class="mobile-nav-link mobile-nav-link-accent" @click="closeMobileMenu">
              联系我们
            </NuxtLink>
          </nav>

          <div v-if="isLoggedIn && currentUser" class="mobile-user-card">
            <div class="mobile-user-meta">
              <v-avatar size="32" :color="getAvatarColor(currentUser.name || currentUser.account)">
                {{ getAvatarInitial(currentUser.name || currentUser.account) }}
              </v-avatar>
              <div>
                <strong>{{ currentUser.name || currentUser.account }}</strong>
                <p>管理你的收藏与创作偏好</p>
              </div>
            </div>
            <div class="mobile-user-actions">
              <NuxtLink to="/profile" class="mobile-secondary-link" @click="closeMobileMenu">个人信息</NuxtLink>
              <NuxtLink to="/favorites" class="mobile-secondary-link" @click="closeMobileMenu">我的收藏</NuxtLink>
              <button class="mobile-secondary-link" @click="handleLogout">退出登录</button>
            </div>
          </div>

          <NuxtLink v-else to="/login" class="mobile-login-button" @click="closeMobileMenu">
            登录 / 注册
          </NuxtLink>
        </aside>
      </div>
    </Transition>

    <main class="page-content">
      <slot />
    </main>

    <LayoutPageFooter />
  </div>
</template>

<script setup lang="ts">
import { usePublicUserStore } from '~/stores/public-user'
import { api } from '~/utils/api'

const router = useRouter()
const publicUserStore = usePublicUserStore()
const isLoggedIn = computed(() => publicUserStore?.isLoggedIn ?? false)
const currentUser = computed(() => publicUserStore?.currentUser ?? null)

const navItems = [
  { label: '首页', to: '/' },
  { label: '产品', to: '/products' },
  { label: '定制设计', to: '/design' },
  { label: '作品集', to: '/portfolio' },
  { label: 'AI 实验室', to: '/ai-lab' },
]

const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)
const isUserMenuOpen = ref(false)
const showStickyHeader = ref(false)
const headerHeight = ref(0)

const userMenuRef = ref(null)
const userButtonRef = ref(null)
const headerRef = ref<HTMLElement | null>(null)

const STICKY_TRIGGER_OFFSET = 220

onMounted(async () => {
  publicUserStore.initToken()
  if (isLoggedIn.value) {
    try {
      const response = await api.publicUser.getUserInfo()
      if (response.code === 0 || response.status === true || response.code === 200) {
        publicUserStore.setUserInfo(response.data)
      }
    } catch (error) {
      console.error('获取用户信息失败:', error)
    }
  }

  if (process.client) {
    nextTick(() => {
      document.addEventListener('click', handleClickOutside)
      updateHeaderState()
      syncHeaderHeight()
    })

    window.addEventListener('resize', syncHeaderHeight, { passive: true })
  }
})

onUnmounted(() => {
  if (process.client) document.removeEventListener('click', handleClickOutside)
  if (process.client) window.removeEventListener('resize', syncHeaderHeight)
})

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

const handleClickOutside = (event) => {
  if (!process.client || !isUserMenuOpen.value) return
  const userMenu = userMenuRef.value
  const userButton = userButtonRef.value
  if (userMenu && userButton && !userMenu.contains(event.target) && !userButton.contains(event.target)) {
    isUserMenuOpen.value = false
  }
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const syncHeaderHeight = () => {
  if (!process.client) return
  headerHeight.value = headerRef.value?.offsetHeight || 0
}

const updateHeaderState = () => {
  if (!process.client) return
  const scrollTop = window.scrollY
  isScrolled.value = scrollTop > 16
  showStickyHeader.value = scrollTop > STICKY_TRIGGER_OFFSET
  syncHeaderHeight()
}

const getAvatarInitial = (name) => {
  if (!name) return 'U'
  const trimmed = name.trim()
  if (!trimmed) return 'U'
  const firstChar = trimmed[0]
  return /[a-zA-Z]/.test(firstChar) ? firstChar.toUpperCase() : firstChar
}

const getAvatarColor = (name) => {
  if (!name) return 'grey-lighten-2'
  const colors = [
    'red-lighten-2', 'pink-lighten-2', 'purple-lighten-2', 'deep-purple-lighten-2', 'indigo-lighten-2',
    'blue-lighten-2', 'light-blue-lighten-2', 'cyan-lighten-2', 'teal-lighten-2', 'green-lighten-2',
    'light-green-lighten-2', 'lime-lighten-2', 'yellow-lighten-2', 'amber-lighten-2', 'orange-lighten-2',
    'deep-orange-lighten-2', 'brown-lighten-2', 'blue-grey-lighten-2',
  ]

  let hash = 0
  for (let i = 0; i < name.length; i += 1) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return colors[Math.abs(hash) % colors.length]
}

router.afterEach(() => {
  isMobileMenuOpen.value = false
})

useEventListener('scroll', () => {
  updateHeaderState()
}, { passive: true })
</script>

<style lang="scss" scoped>
.page-shell {
  min-height: 100vh;
  background: #f7f5f2;
  color: #1c1917;
  font-family: var(--ys-font-sans);
}

.site-header-spacer {
  width: 100%;
}

.site-header {
  position: relative;
  top: 0;
  padding: 0.75rem 0;
  background: transparent;
  border-bottom: 1px solid transparent;
  transition:
    background-color 240ms ease,
    border-color 240ms ease,
    box-shadow 240ms ease,
    transform 420ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 420ms ease;
}

.site-header-scrolled {
  background: rgba(247, 245, 242, 0.98);
  box-shadow: 0 4px 14px rgba(28, 25, 23, 0.03);
}

.site-header-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transform: translateY(-120%);
  opacity: 0;
  background: rgba(247, 245, 242, 0.92);
  border-bottom-color: rgba(28, 25, 23, 0.05);
  backdrop-filter: blur(14px);
}

.site-header-visible {
  transform: translateY(0);
  opacity: 1;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: min(1560px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 0.4rem 0;
}

.brand-mark {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  color: #1c1917;
  text-decoration: none;
}

.brand-mark:hover .brand-logo {
  transform: scale(1.03);
}

.brand-logo {
  width: 2.25rem;
  height: 2.25rem;
  object-fit: contain;
  transition: transform 0.18s ease;
}

.brand-copy {
  display: flex;
  flex-direction: column;
  line-height: 1.05;
}

.brand-copy strong {
  font-family: var(--ys-font-display);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.brand-kicker {
  font-size: 0.56rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #78716c;
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.nav-item,
.header-chip,
.login-button {
  position: relative;
  padding: 0.55rem 0.85rem;
  border-radius: 999px;
  color: #44403c;
  text-decoration: none;
  font-size: 0.74rem;
  line-height: 1;
  transition: color 0.16s ease, background-color 0.16s ease, transform 0.16s ease, border-color 0.16s ease, box-shadow 0.16s ease;
}

.nav-item::after {
  content: '';
  position: absolute;
  left: 0.7rem;
  right: 0.7rem;
  bottom: 0.2rem;
  height: 2px;
  background: #1c1917;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.16s ease;
  opacity: 0.75;
}

.nav-item:hover,
.header-chip:hover,
.login-button:hover {
  color: #1c1917;
  background: rgba(28, 25, 23, 0.065);
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(28, 25, 23, 0.03);
}

.nav-item:hover::after,
.nav-item.router-link-active::after,
.nav-item.router-link-exact-active::after {
  transform: scaleX(1);
}

.nav-item.router-link-active,
.nav-item.router-link-exact-active {
  color: #1c1917;
  background: rgba(28, 25, 23, 0.07);
}

.header-chip,
.login-button {
  border: 1px solid rgba(28, 25, 23, 0.1);
  background: #fff;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-menu-wrapper {
  position: relative;
}

.user-menu-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0.55rem 0.3rem 0.3rem;
  border: 1px solid rgba(28, 25, 23, 0.1);
  border-radius: 999px;
  background: #fff;
  color: #1c1917;
  cursor: pointer;
  transition: transform 0.16s ease, border-color 0.16s ease, background-color 0.16s ease, box-shadow 0.16s ease;
}

.user-menu-button:hover {
  transform: translateY(-1px);
  border-color: rgba(28, 25, 23, 0.16);
  background: #fcfbf9;
  box-shadow: 0 4px 12px rgba(28, 25, 23, 0.03);
}

.user-menu-button:hover .user-menu-caret {
  transform: translateY(1px);
}

.user-menu-caret {
  transition: transform 0.16s ease;
}

.user-name {
  max-width: 8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.74rem;
}

.user-menu-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  min-width: 11rem;
  display: grid;
  gap: 0.25rem;
  padding: 0.35rem;
  border: 1px solid rgba(28, 25, 23, 0.08);
  border-radius: 0.9rem;
  background: #fff;
  box-shadow: 0 8px 20px rgba(28, 25, 23, 0.04);
}

.user-menu-item {
  display: block;
  width: 100%;
  padding: 0.65rem 0.75rem;
  border: 0;
  border-radius: 0.7rem;
  background: transparent;
  color: #44403c;
  text-align: left;
  text-decoration: none;
  font-size: 0.74rem;
  cursor: pointer;
  transition: background-color 0.16s ease, color 0.16s ease, transform 0.16s ease;
}

.user-menu-item:hover {
  background: #f5f4f1;
  color: #1c1917;
  transform: translateX(2px);
}

.logout-item {
  color: #b91c1c;
}

.mobile-menu-btn {
  display: none;
  align-items: center;
  justify-content: center;
  width: 2.2rem;
  height: 2.2rem;
  border: 1px solid rgba(28, 25, 23, 0.1);
  border-radius: 999px;
  background: #fff;
  color: #1c1917;
  transition: transform 0.16s ease, border-color 0.16s ease, background-color 0.16s ease;
}

.mobile-menu-btn:hover,
.mobile-close-btn:hover,
.mobile-nav-link:hover,
.mobile-secondary-link:hover,
.mobile-login-button:hover {
  border-color: rgba(28, 25, 23, 0.16);
  background: #fcfbf9;
  transform: translateY(-1px);
}

.mobile-menu-btn.active {
  background: #1c1917;
  color: #f7f5f2;
  border-color: #1c1917;
}

.page-content {
  min-height: 1px;
}

.mobile-panel-overlay {
  position: fixed;
  inset: 0;
  z-index: 60;
  background: rgba(28, 25, 23, 0.14);
}

.mobile-panel {
  width: min(22rem, calc(100vw - 1rem));
  height: calc(100vh - 1rem);
  margin: 0.5rem 0.5rem 0.5rem auto;
  padding: 1rem;
  border-left: 1px solid rgba(28, 25, 23, 0.08);
  background: #f7f5f2;
}

.mobile-panel-head,
.mobile-user-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.mobile-panel-head h2 {
  margin-top: 0.25rem;
  font-family: var(--ys-font-display);
  font-size: 1.05rem;
}

.mobile-close-btn {
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid rgba(28, 25, 23, 0.1);
  border-radius: 999px;
  background: #fff;
  transition: transform 0.16s ease, border-color 0.16s ease, background-color 0.16s ease;
}

.mobile-nav {
  display: grid;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.mobile-nav-link,
.mobile-login-button,
.mobile-secondary-link {
  display: block;
  width: 100%;
  padding: 0.85rem 0.95rem;
  border: 1px solid rgba(28, 25, 23, 0.08);
  border-radius: 0.9rem;
  background: #fff;
  color: #1c1917;
  text-decoration: none;
  font-size: 0.8rem;
  transition: transform 0.16s ease, border-color 0.16s ease, background-color 0.16s ease, color 0.16s ease;
}

.mobile-user-card {
  margin-top: 1rem;
  padding: 0.9rem;
  border: 1px solid rgba(28, 25, 23, 0.08);
  border-radius: 1rem;
  background: #fff;
}

.mobile-user-meta p {
  margin-top: 0.25rem;
  color: #78716c;
  font-size: 0.74rem;
}

.mobile-user-actions {
  display: grid;
  gap: 0.5rem;
  margin-top: 0.8rem;
}

.mobile-secondary-link {
  text-align: left;
  cursor: pointer;
}

.user-menu-enter-active,
.user-menu-leave-active,
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.2s ease;
}

.user-menu-enter-from,
.user-menu-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}

.mobile-menu-enter-from .mobile-panel,
.mobile-menu-leave-to .mobile-panel {
  transform: translateX(10px);
}

@media (max-width: 1024px) {
  .desktop-nav,
  .desktop-only,
  .user-name {
    display: none;
  }

  .mobile-menu-btn {
    display: inline-flex;
  }

  .header-inner {
    width: min(100%, calc(100% - 1rem));
  }
}
</style>
