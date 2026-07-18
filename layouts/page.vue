<template>
  <div class="page-shell">
    <div v-if="showAnnouncement" class="site-announcement">
      <span>{{ site.announcement.text }}</span>
      <NuxtLink :to="site.announcement.actionTo">
        {{ site.announcement.actionLabel }}
      </NuxtLink>
      <button type="button" aria-label="关闭顶部通知" @click="showAnnouncement = false">
        <AppIcon name="x" class="ui-icon" :size="14" aria-hidden="true" />
      </button>
    </div>

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
        <button
          class="mobile-menu-btn mobile-menu-btn--left"
          :class="{ active: isMobileMenuOpen }"
          :title="isMobileMenuOpen ? '关闭菜单' : '打开菜单'"
          @click="toggleMobileMenu"
        >
          <AppIcon
            :name="isMobileMenuOpen ? 'x' : 'menu'"
            class="ui-icon"
            :size="20"
            aria-hidden="true"
          />
        </button>

        <NuxtLink to="/" class="brand-mark" :aria-label="`${site.brand.name}首页`">
          <img
            :src="site.brand.logo"
            :alt="site.brand.fullName"
            class="brand-logo-img"
          />
          <div class="brand-text">
            <span class="brand-name-en">{{ site.brand.nameEn }}</span>
            <span class="brand-name-zh">{{ site.brand.name }}</span>
          </div>
        </NuxtLink>

        <nav class="desktop-nav" aria-label="主导航">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="nav-item"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div class="header-actions">
          <form class="header-search desktop-only" @submit.prevent="handleHeaderSearch">
            <AppIcon name="search" class="ui-icon" :size="18" aria-hidden="true" />
            <input
              v-model="headerSearch"
              type="search"
              aria-label="搜索商品"
              placeholder="搜索商品…"
            />
          </form>

          <NuxtLink
            v-if="site.features.favorites"
            to="/favorites"
            class="header-icon-link"
            aria-label="收藏"
          >
            <AppIcon name="heart" class="ui-icon" :size="18" aria-hidden="true" />
          </NuxtLink>

          <template v-if="site.features.auth && isLoggedIn && currentUser">
            <div class="user-menu-wrapper">
              <button
                ref="userButtonRef"
                class="user-menu-button"
                @click.stop="isUserMenuOpen = !isUserMenuOpen"
              >
                <span
                  class="user-avatar"
                  :style="{ background: getAvatarColor(currentUser.name || currentUser.account) }"
                >
                  {{
                    getAvatarInitial(currentUser.name || currentUser.account)
                  }}
                </span>
                <span class="user-name">{{
                  currentUser.name || currentUser.account
                }}</span>
                <AppIcon name="chevron-down" class="user-menu-caret" :size="12" aria-hidden="true" />
              </button>

              <Transition name="user-menu">
                <div
                  v-if="isUserMenuOpen"
                  ref="userMenuRef"
                  class="user-menu-dropdown"
                  @click.stop
                >
                  <NuxtLink
                    to="/profile"
                    class="user-menu-item"
                    @click="isUserMenuOpen = false"
                    >个人信息</NuxtLink
                  >
                  <NuxtLink
                    v-if="site.features.favorites"
                    to="/favorites"
                    class="user-menu-item"
                    @click="isUserMenuOpen = false"
                    >我的收藏</NuxtLink
                  >
                  <button
                    class="user-menu-item logout-item"
                    @click="handleLogout"
                  >
                    退出登录
                  </button>
                </div>
              </Transition>
            </div>
          </template>

          <template v-else-if="site.features.auth">
            <NuxtLink to="/login" class="header-icon-link" aria-label="登录">
              <AppIcon name="user" class="ui-icon" :size="18" aria-hidden="true" />
            </NuxtLink>
          </template>

          <button
            class="mobile-menu-btn mobile-menu-btn--right"
            :class="{ active: isMobileMenuOpen }"
            :title="isMobileMenuOpen ? '关闭菜单' : '打开菜单'"
            @click="toggleMobileMenu"
          >
            <AppIcon
              :name="isMobileMenuOpen ? 'x' : 'menu'"
              class="ui-icon"
              :size="20"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </header>

    <Transition name="mobile-menu">
      <div
        v-if="isMobileMenuOpen"
        class="mobile-panel-overlay"
        @click="closeMobileMenu"
      >
        <aside class="mobile-panel" @click.stop>
          <div class="mobile-panel-head">
            <div>
              <span class="brand-kicker">{{ site.brand.nameEn }}</span>
              <h2>导航</h2>
            </div>
            <button class="mobile-close-btn" @click="closeMobileMenu">
              <AppIcon name="x" class="ui-icon" :size="18" aria-hidden="true" />
            </button>
          </div>

          <div class="mobile-search-form">
            <form @submit.prevent="handleMobileSearch">
              <AppIcon name="search" class="ui-icon" :size="16" aria-hidden="true" />
              <input
                v-model="mobileSearchKeyword"
                type="search"
                placeholder="搜索商品…"
              />
            </form>
          </div>

          <nav class="mobile-nav" aria-label="移动端导航">
            <NuxtLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="mobile-nav-link"
              @click="closeMobileMenu"
            >
              <AppIcon :name="item.icon" class="ui-icon" :size="17" aria-hidden="true" />
              {{ item.label }}
            </NuxtLink>
          </nav>

          <div
            v-if="site.features.auth && isLoggedIn && currentUser"
            class="mobile-user-card"
          >
            <div class="mobile-user-meta">
              <span
                class="user-avatar user-avatar--mobile"
                :style="{ background: getAvatarColor(currentUser.name || currentUser.account) }"
              >
                {{ getAvatarInitial(currentUser.name || currentUser.account) }}
              </span>
              <div>
                <strong>{{ currentUser.name || currentUser.account }}</strong>
                <p>管理你的收藏与创作偏好</p>
              </div>
            </div>
            <div class="mobile-user-actions">
              <NuxtLink
                to="/profile"
                class="mobile-secondary-link"
                @click="closeMobileMenu"
                >个人信息</NuxtLink
              >
              <NuxtLink
                v-if="site.features.favorites"
                to="/favorites"
                class="mobile-secondary-link"
                @click="closeMobileMenu"
                >我的收藏</NuxtLink
              >
              <button class="mobile-secondary-link" @click="handleLogout">
                退出登录
              </button>
            </div>
          </div>

          <NuxtLink
            v-else-if="site.features.auth"
            to="/login"
            class="mobile-login-button"
            @click="closeMobileMenu"
          >
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
import { usePublicUserStore } from "~/stores/public-user";
import { api } from "~/utils/api";

const router = useRouter();
const site = useStorefrontSite();
const publicUserStore = usePublicUserStore();
const isLoggedIn = computed(() => publicUserStore?.isLoggedIn ?? false);
const currentUser = computed(() => publicUserStore?.currentUser ?? null);

const navigationIcons = {
  box: "cube",
  palette: "palette",
  info: "info",
  mail: "envelope",
};

const navItems = computed(() =>
  site.navigation.map((item) => ({
    ...item,
    icon: navigationIcons[item.icon],
  })),
);

const showAnnouncement = ref(
  site.features.announcement && site.announcement.enabled,
);
const headerSearch = ref("");
const mobileSearchKeyword = ref("");
const isMobileMenuOpen = ref(false);
const isScrolled = ref(false);
const isUserMenuOpen = ref(false);
const showStickyHeader = ref(false);
const headerHeight = ref(0);

const userMenuRef = ref(null);
const userButtonRef = ref(null);
const headerRef = ref<HTMLElement | null>(null);

const STICKY_TRIGGER_OFFSET = 220;

onMounted(async () => {
  if (site.features.auth) {
    publicUserStore.initToken();
    if (isLoggedIn.value) {
      try {
        const response = await api.publicUser.getUserInfo();
        if (
          response.code === 0 ||
          response.status === true ||
          response.code === 200
        ) {
          publicUserStore.setUserInfo(response.data);
        }
      } catch (error) {
        console.error("获取用户信息失败:", error);
      }
    }
  }

  if (process.client) {
    nextTick(() => {
      document.addEventListener("click", handleClickOutside);
      updateHeaderState();
      syncHeaderHeight();
    });

    window.addEventListener("resize", syncHeaderHeight, { passive: true });
  }
});

onUnmounted(() => {
  if (process.client) document.removeEventListener("click", handleClickOutside);
  if (process.client) window.removeEventListener("resize", syncHeaderHeight);
});

const handleLogout = async () => {
  try {
    await api.publicUser.logout();
  } catch (error) {
    console.error("登出失败:", error);
  } finally {
    publicUserStore.clearToken();
    isUserMenuOpen.value = false;
    isMobileMenuOpen.value = false;
    await router.push("/");
  }
};

const handleClickOutside = (event) => {
  if (!process.client || !isUserMenuOpen.value) return;
  const userMenu = userMenuRef.value;
  const userButton = userButtonRef.value;
  if (
    userMenu &&
    userButton &&
    !userMenu.contains(event.target) &&
    !userButton.contains(event.target)
  ) {
    isUserMenuOpen.value = false;
  }
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const handleHeaderSearch = async () => {
  const keyword = headerSearch.value.trim();
  await navigateTo(
    keyword ? `/products/${encodeURIComponent(keyword)}` : "/products",
  );
};

const handleMobileSearch = async () => {
  const keyword = mobileSearchKeyword.value.trim();
  closeMobileMenu();
  await navigateTo(
    keyword ? `/products/${encodeURIComponent(keyword)}` : "/products",
  );
};

const syncHeaderHeight = () => {
  if (!process.client) return;
  headerHeight.value = headerRef.value?.offsetHeight || 0;
};

const updateHeaderState = () => {
  if (!process.client) return;
  const scrollTop = window.scrollY;
  isScrolled.value = scrollTop > 16;
  showStickyHeader.value = scrollTop > STICKY_TRIGGER_OFFSET;
  syncHeaderHeight();
};

const getAvatarInitial = (name) => {
  if (!name) return "U";
  const trimmed = name.trim();
  if (!trimmed) return "U";
  const firstChar = trimmed[0];
  return /[a-zA-Z]/.test(firstChar) ? firstChar.toUpperCase() : firstChar;
};

const getAvatarColor = (name) => {
  if (!name) return "#e5e7eb";
  const colors = [
    "#fecaca",
    "#fbcfe8",
    "#ddd6fe",
    "#c7d2fe",
    "#bfdbfe",
    "#bae6fd",
    "#a7f3d0",
    "#bbf7d0",
    "#fde68a",
    "#fed7aa",
    "#e5e7eb",
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i += 1)
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};

router.afterEach(() => {
  isMobileMenuOpen.value = false;
});

useEventListener(
  "scroll",
  () => {
    updateHeaderState();
  },
  { passive: true },
);
</script>

<style lang="scss" scoped>
.page-shell {
  min-height: 100vh;
  background: var(--ys-bg);
  color: var(--ys-text);
  font-family: var(--ys-font-sans);
}

.site-announcement {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  min-height: 32px;
  padding: 0.25rem 1rem;
  background: var(--ys-text);
  color: #fff;
  font-size: 0.72rem;
  line-height: 1.3;
  text-align: center;
}

.site-announcement a {
  color: #fff;
  font-weight: 800;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.site-announcement button {
  position: absolute;
  right: var(--ys-container-pad);
  display: grid;
  place-items: center;
  width: 1.6rem;
  height: 1.6rem;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: #fff;
}

.site-header-spacer {
  width: 100%;
}

.site-header {
  position: relative;
  top: 0;
  padding: 0.75rem 0;
  background: rgba(255, 255, 255, 0.92);
  border-bottom: 1px solid transparent;
  transition:
    background-color 240ms ease,
    border-color 240ms ease,
    transform 420ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 420ms ease;
}

.site-header-scrolled {
  background: rgba(255, 255, 255, 0.94);
  border-bottom-color: transparent;
  backdrop-filter: blur(14px);
}

.site-header-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  isolation: isolate;
  transform: translateY(-120%);
  opacity: 0;
  background: rgba(255, 255, 255, 0.9);
  border-bottom-color: transparent;
  backdrop-filter: blur(18px) saturate(110%);
}

.site-header-visible {
  transform: translateY(0);
  opacity: 1;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  width: var(--ys-container);
  margin: 0 auto;
  min-height: 40px;
  padding: 0;
}

.brand-mark {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  color: var(--ys-text);
  text-decoration: none;
  white-space: nowrap;
  flex: 0 0 auto;
}

.brand-logo-img {
  display: block;
  width: 28px;
  height: 28px;
  max-width: 28px;
  max-height: 28px;
  object-fit: contain;
  flex-shrink: 0;
}

.brand-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
  line-height: 1;
}

.brand-name-en {
  font-family: var(--ys-font-display);
  font-size: 0.92rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--ys-text);
}

.brand-name-zh {
  font-size: 0.62rem;
  font-weight: 600;
  color: var(--ys-text-muted);
  margin-top: 0.08rem;
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex: 0 0 auto;
}

.nav-item,
.header-search,
.login-button,
.header-icon-link {
  position: relative;
  padding: 0.4rem 0.65rem;
  border: 1px solid transparent;
  background: transparent;
  color: var(--ys-text-soft);
  text-decoration: none;
  font-size: 0.82rem;
  line-height: 1;
  white-space: nowrap;
  border-radius: var(--ys-radius-sm);
  transition:
    color 0.16s ease,
    background-color 0.16s ease,
    border-color 0.16s ease;
}

.nav-item:hover {
  color: var(--ys-accent);
  background: var(--ys-accent-soft);
}

.nav-item.router-link-active,
.nav-item.router-link-exact-active {
  color: var(--ys-accent);
  background: var(--ys-accent-soft);
  font-weight: 700;
}

.header-search,
.login-button {
  border-radius: var(--ys-radius-sm);
}

.ui-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.header-search {
  display: flex;
  align-items: center;
  min-width: min(30vw, 360px);
  min-height: 36px;
  justify-content: flex-start;
  gap: 0.5rem;
  padding: 0 0.75rem;
  border: 1px solid transparent;
  background: var(--ys-surface-soft);
  color: var(--ys-text-muted);
  font-size: 0.82rem;
}

.header-search:focus-within {
  border-color: transparent;
  background: var(--ys-surface);
  box-shadow: 0 0 0 3px var(--ys-focus-ring);
}

.header-search input {
  width: 100%;
  min-width: 0;
  height: 36px;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--ys-text);
  font-size: 0.82rem;
  line-height: normal;
  padding: 0;
}

.header-search input::placeholder {
  color: rgba(0, 0, 0, 0.35);
}

.header-search input:focus-visible {
  box-shadow: none;
}

.login-button {
  min-height: 2.55rem;
  padding: 0 1rem;
  border-color: transparent;
  background: var(--ys-accent-soft);
  font-weight: 800;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  flex: 1 1 auto;
  justify-content: flex-end;
  min-width: 0;
}

.header-icon-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border-radius: var(--ys-radius-sm);
  color: var(--ys-text-soft);
  text-decoration: none;
}

.header-icon-link:hover {
  color: var(--ys-accent);
  background: var(--ys-accent-soft);
}

.ui-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  flex-shrink: 0;
}

.user-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 999px;
  color: var(--ys-text);
  font-size: 0.78rem;
  font-weight: 800;
  flex: 0 0 auto;
}

.user-avatar--mobile {
  width: 32px;
  height: 32px;
}

.user-menu-wrapper {
  position: relative;
  z-index: 2;
}

.user-menu-button {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.5rem 0.25rem 0.25rem;
  border: 1px solid transparent;
  border-radius: var(--ys-radius-md);
  background: var(--ys-surface-soft);
  color: var(--ys-text);
  cursor: pointer;
  transition:
    border-color 0.16s ease,
    background-color 0.16s ease;
}

.user-menu-button:hover {
  border-color: transparent;
  background: var(--ys-accent-soft);
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
  z-index: 120;
  min-width: 11rem;
  display: grid;
  gap: 0.25rem;
  padding: 0.35rem;
  border: 1px solid transparent;
  border-radius: var(--ys-radius-lg);
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(14px);
  box-shadow: var(--ys-shadow-md);
}

.user-menu-item {
  display: block;
  width: 100%;
  padding: 0.65rem 0.75rem;
  border: 0;
  border-radius: var(--ys-radius-sm);
  background: transparent;
  color: var(--ys-text-soft);
  text-align: left;
  text-decoration: none;
  font-size: 0.74rem;
  cursor: pointer;
  transition:
    background-color 0.16s ease,
    color 0.16s ease;
}

.user-menu-item:hover {
  background: var(--ys-accent-soft);
  color: var(--ys-accent);
}

.logout-item {
  color: #b91c1c;
}

.mobile-menu-btn {
  display: none;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: 1px solid transparent;
  border-radius: var(--ys-radius-sm);
  background: var(--ys-surface-soft);
  color: var(--ys-text);
  transition:
    border-color 0.16s ease,
    background-color 0.16s ease;
}

.mobile-menu-btn--left {
  margin-right: -0.4rem;
}

.mobile-menu-btn--right {
  display: none;
}

.mobile-menu-btn:hover,
.mobile-close-btn:hover,
.mobile-nav-link:hover,
.mobile-secondary-link:hover,
.mobile-login-button:hover {
  border-color: transparent;
  background: var(--ys-accent-soft);
}

.mobile-menu-btn.active {
  background: var(--ys-accent);
  color: #fff;
  border-color: transparent;
}

.page-content {
  min-height: 1px;
}

.mobile-panel-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(0, 0, 0, 0.36);
}

.mobile-panel {
  width: min(20rem, calc(100vw - 1rem));
  height: calc(100vh - 1rem);
  margin: 0.5rem 0.5rem 0.5rem auto;
  padding: 0.85rem;
  border: 1px solid transparent;
  border-radius: var(--ys-radius-lg);
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(18px);
  overflow-y: auto;
}

.mobile-panel-head,
.mobile-user-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.mobile-panel-head h2 {
  margin-top: 0.15rem;
  font-family: var(--ys-font-display);
  font-size: 1.1rem;
}

.mobile-search-form {
  margin-top: 0.75rem;
}

.mobile-search-form form {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.65rem;
  height: 36px;
  border: 1px solid transparent;
  border-radius: var(--ys-radius-sm);
  background: var(--ys-surface-soft);
}

.mobile-search-form input {
  flex: 1;
  min-width: 0;
  height: 36px;
  border: 0;
  outline: 0;
  background: transparent;
  color: #111;
  font-size: 0.82rem;
}

.mobile-search-form input::placeholder {
  color: rgba(0, 0, 0, 0.35);
}

.mobile-close-btn {
  width: 2rem;
  height: 2rem;
  border: 1px solid transparent;
  border-radius: var(--ys-radius-sm);
  background: var(--ys-surface-soft);
  transition:
    border-color 0.16s ease,
    background-color 0.16s ease;
}

.mobile-nav {
  display: grid;
  gap: 0.25rem;
  margin-top: 1rem;
}

.mobile-nav-link,
.mobile-login-button,
.mobile-secondary-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.65rem 0.75rem;
  border: 1px solid transparent;
  border-radius: var(--ys-radius-sm);
  background: transparent;
  color: var(--ys-text);
  text-decoration: none;
  font-size: 0.8rem;
  transition:
    border-color 0.16s ease,
    background-color 0.16s ease,
    color 0.16s ease;
}

.mobile-nav-link:hover,
.mobile-nav-link.router-link-active {
  background: var(--ys-accent-soft);
  color: var(--ys-accent);
}

.mobile-user-card {
  margin-top: 0.75rem;
  padding: 0.75rem;
  border: 1px solid transparent;
  border-radius: var(--ys-radius-sm);
  background: var(--ys-surface-soft);
}

.mobile-user-meta p {
  margin-top: 0.25rem;
  color: #777;
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

  .mobile-menu-btn--left {
    display: inline-flex;
  }

  .mobile-menu-btn--right {
    display: none;
  }

  .header-inner {
    width: var(--ys-container);
    gap: 1rem;
  }

  .header-actions {
    flex: 0 0 auto;
    gap: 0.75rem;
  }

  .brand-mark {
    flex: 1 1 auto;
  }

  .brand-logo-img {
    width: 28px;
    height: 28px;
    max-width: 28px;
    max-height: 28px;
  }
}

@media (min-width: 1025px) {
  .mobile-menu-btn--left {
    display: none;
  }
}
</style>
