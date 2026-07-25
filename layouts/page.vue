<template>
  <div class="page-shell">
    <div v-if="showAnnouncement" class="site-announcement">
      <span>{{ site.announcement.text }}</span>
      <NuxtLink :to="site.announcement.actionTo">
        {{ site.announcement.actionLabel }}
      </NuxtLink>
      <button
        type="button"
        aria-label="关闭顶部通知"
        @click="showAnnouncement = false"
      >
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
        <!-- Mobile Menu Trigger -->
        <button
          class="mobile-menu-btn"
          :class="{ active: isMobileMenuOpen }"
          :title="isMobileMenuOpen ? '关闭菜单' : '打开菜单'"
          aria-label="打开导航菜单"
          @click="toggleMobileMenu"
        >
          <AppIcon
            :name="isMobileMenuOpen ? 'x' : 'menu'"
            class="ui-icon"
            :size="18"
            aria-hidden="true"
          />
        </button>

        <NuxtLink
          to="/"
          class="brand-mark"
          :aria-label="`${site.brand.name}首页`"
        >
          <img src="/logo.png" :alt="site.brand.name" class="brand-logo-img" />
          <div class="brand-text">
            <span class="brand-name-en">1s design</span>
            <span class="brand-name-zh">衣设</span>
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
          <button
            type="button"
            class="header-search-trigger"
            title="搜索商品 (⌘K)"
            aria-label="打开全屏搜索"
            @click="openSearch"
          >
            <AppIcon
              name="search"
              class="ui-icon"
              :size="16"
              aria-hidden="true"
            />
            <span class="search-trigger-text desktop-only">搜索商品、印花或定制…</span>
            <kbd class="search-kbd desktop-only">⌘K</kbd>
          </button>

          <NuxtLink
            v-if="site.features.favorites"
            to="/favorites"
            class="header-icon-link"
            title="我的收藏"
            aria-label="我的收藏"
          >
            <AppIcon
              name="heart"
              class="ui-icon"
              :size="18"
              aria-hidden="true"
            />
          </NuxtLink>

          <template v-if="site.features.auth && isLoggedIn">
            <div class="user-menu-wrapper desktop-only">
              <button
                ref="userButtonRef"
                class="user-menu-button"
                :class="{ 'is-active': isUserMenuOpen }"
                @click.stop="isUserMenuOpen = !isUserMenuOpen"
              >
                <span
                  class="user-avatar"
                  :style="{
                    background: getAvatarColor(
                      currentUser?.name || currentUser?.account || 'U',
                    ),
                  }"
                >
                  {{
                    getAvatarInitial(
                      currentUser?.name || currentUser?.account || "U",
                    )
                  }}
                </span>
                <span class="user-name">{{
                  currentUser?.name || currentUser?.account || "用户"
                }}</span>
                <AppIcon
                  name="chevron-down"
                  class="user-menu-caret"
                  :class="{ 'is-active': isUserMenuOpen }"
                  :size="12"
                  aria-hidden="true"
                />
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
                  >
                    <AppIcon name="user" :size="13" class="menu-item-icon" />
                    <span>个人信息</span>
                  </NuxtLink>
                  <NuxtLink
                    v-if="site.features.favorites"
                    to="/favorites"
                    class="user-menu-item"
                    @click="isUserMenuOpen = false"
                  >
                    <AppIcon name="heart" :size="13" class="menu-item-icon" />
                    <span>我的收藏</span>
                  </NuxtLink>
                  <button
                    class="user-menu-item logout-item"
                    @click="handleLogout"
                  >
                    <AppIcon
                      name="x-circle"
                      :size="13"
                      class="menu-item-icon"
                    />
                    <span>退出登录</span>
                  </button>
                </div>
              </Transition>
            </div>
          </template>

          <template v-else-if="site.features.auth">
            <NuxtLink to="/login" class="header-login-link desktop-only"> 登录 </NuxtLink>
            <NuxtLink to="/products" class="header-signup-btn desktop-only">
              开始创作
            </NuxtLink>
          </template>
        </div>
      </div>
    </header>

    <!-- Mobile Navigation Drawer Panel (Apple-Style Ultra-Minimalist) -->
    <Transition name="mobile-drawer">
      <div
        v-if="isMobileMenuOpen"
        class="mobile-panel-overlay"
        @click="closeMobileMenu"
      >
        <aside class="mobile-panel" @click.stop>
          <div class="mobile-panel-head">
            <NuxtLink to="/" class="mobile-brand" @click="closeMobileMenu">
              <img src="/logo.png" alt="1s design" class="mobile-brand-logo" />
              <span class="mobile-brand-title">衣设 1s design</span>
            </NuxtLink>
            <button
              class="mobile-close-btn"
              title="关闭菜单"
              aria-label="关闭菜单"
              @click="closeMobileMenu"
            >
              <AppIcon name="x" class="ui-icon" :size="16" aria-hidden="true" />
            </button>
          </div>

          <div class="mobile-search-section">
            <button
              type="button"
              class="mobile-search-pill"
              @click="openSearch"
            >
              <AppIcon
                name="search"
                class="ui-icon"
                :size="14"
                aria-hidden="true"
              />
              <span class="mobile-search-text">搜索商品…</span>
            </button>
          </div>

          <div class="mobile-section-title">选单</div>
          <nav class="mobile-nav" aria-label="移动端主导航">
            <NuxtLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="mobile-nav-link"
              @click="closeMobileMenu"
            >
              {{ item.label }}
            </NuxtLink>
          </nav>

          <div class="mobile-section-title">探索品类</div>
          <div class="mobile-quick-categories">
            <NuxtLink
              v-for="cat in quickCategories"
              :key="cat.name"
              :to="cat.to"
              class="mobile-cat-chip"
              @click="closeMobileMenu"
            >
              {{ cat.name }}
            </NuxtLink>
          </div>

          <div class="mobile-user-section">
            <div v-if="site.features.auth && isLoggedIn" class="mobile-user-card">
              <div class="mobile-user-meta">
                <span
                  class="user-avatar user-avatar--mobile"
                  :style="{
                    background: getAvatarColor(
                      currentUser?.name || currentUser?.account || 'U',
                    ),
                  }"
                >
                  {{
                    getAvatarInitial(
                      currentUser?.name || currentUser?.account || "U",
                    )
                  }}
                </span>
                <span class="user-name-text">{{
                  currentUser?.name || currentUser?.account || "用户"
                }}</span>
              </div>
              <div class="mobile-user-actions">
                <NuxtLink
                  to="/profile"
                  class="mobile-user-action-btn"
                  @click="closeMobileMenu"
                >
                  个人中心
                </NuxtLink>
                <NuxtLink
                  v-if="site.features.favorites"
                  to="/favorites"
                  class="mobile-user-action-btn"
                  @click="closeMobileMenu"
                >
                  我的收藏
                </NuxtLink>
                <button
                  type="button"
                  class="mobile-user-action-btn logout"
                  @click="handleLogout"
                >
                  退出登录
                </button>
              </div>
            </div>

            <div v-else-if="site.features.auth" class="mobile-auth-card">
              <div class="mobile-auth-btns">
                <NuxtLink
                  to="/login"
                  class="mobile-btn-primary"
                  @click="closeMobileMenu"
                >
                  登录 / 注册
                </NuxtLink>
                <NuxtLink
                  to="/products"
                  class="mobile-btn-secondary"
                  @click="closeMobileMenu"
                >
                  探索商品
                </NuxtLink>
              </div>
            </div>
          </div>

          <div class="mobile-drawer-footer">
            <span>1s design · 衣设</span>
          </div>
        </aside>
      </div>
    </Transition>

    <!-- Fullscreen Search Modal -->
    <Transition name="site-search">
      <section
        v-if="isSearchOpen"
        class="site-search-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="全屏搜索"
        @click.self="closeSearch"
      >
        <div class="site-search-panel">
          <form class="site-search-form" @submit.prevent="submitSearch">
            <AppIcon name="search" :size="17" aria-hidden="true" />
            <input
              ref="searchInputRef"
              v-model="searchKeyword"
              type="search"
              autocomplete="off"
              placeholder="搜索商品"
              aria-label="搜索商品、印花或设计需求"
            />
            <button
              type="submit"
              class="site-search-submit"
              aria-label="执行搜索"
            >
              <AppIcon name="arrow-up-right" :size="15" aria-hidden="true" />
            </button>
            <button
              type="button"
              class="site-search-close"
              title="关闭搜索"
              aria-label="关闭搜索"
              @click="closeSearch"
            >
              <AppIcon name="x" :size="17" aria-hidden="true" />
            </button>
          </form>

          <div class="site-search-content">
            <div v-if="!searchKeyword.trim()" class="site-search-suggestions">
              <div class="site-search-results-head">
                <span>热门搜索</span>
                <small>按商品品类浏览</small>
              </div>
              <div>
                <button
                  v-for="item in searchSuggestions"
                  :key="item.key"
                  type="button"
                  @click="selectSearchSuggestion(item.keyword)"
                >
                  <span>
                    <strong>{{ item.label }}</strong>
                    <small>{{ item.hint }}</small>
                  </span>
                  <AppIcon
                    name="arrow-up-right"
                    :size="12"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>

            <div v-else class="site-search-results">
              <div class="site-search-results-head">
                <span>相关商品</span>
                <small v-if="searchLoading">正在查找</small>
                <small v-else>{{ searchResults.length }} 个结果</small>
              </div>

              <div v-if="searchLoading" class="site-search-status">
                正在搜索商品…
              </div>
              <div
                v-else-if="searchResults.length"
                class="site-search-result-list"
              >
                <NuxtLink
                  v-for="product in searchResults"
                  :key="product.id"
                  :to="getPublishedProductPath(product)"
                  class="site-search-result"
                  @click="closeSearch"
                >
                  <div class="site-search-result-media">
                    <img
                      :src="getPublishedProductImage(product, 480)"
                      :alt="product.title"
                    />
                  </div>
                  <div class="site-search-result-copy">
                    <strong>{{ product.title }}</strong>
                    <span>{{ product.type }}</span>
                  </div>
                  <small>{{ formatSearchPrice(product.price) }}</small>
                  <AppIcon
                    name="arrow-up-right"
                    class="site-search-result-arrow"
                    :size="13"
                    aria-hidden="true"
                  />
                </NuxtLink>
                <button
                  type="button"
                  class="site-search-all"
                  @click="submitSearch"
                >
                  查看全部“{{ searchKeyword.trim() }}”结果
                  <AppIcon name="arrow-right" :size="13" aria-hidden="true" />
                </button>
              </div>
              <div v-else class="site-search-status">
                没有找到匹配商品，试试搜索 T 恤、杯子、手机壳或帆布包。
              </div>
            </div>
          </div>
        </div>
      </section>
    </Transition>

    <main class="page-content">
      <slot />
    </main>

    <LayoutPageFooter />
  </div>
</template>

<script setup lang="ts">
import type { StorefrontPublishedProduct } from "~/composables/use-published-products";
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
  book: "book",
};

const navItems = computed(() =>
  site.navigation.map((item) => ({
    ...item,
    icon: navigationIcons[item.icon],
  })),
);

const quickCategories = [
  { name: "T 恤", to: "/tshirt" },
  { name: "连帽衫", to: "/hoodie" },
  { name: "帆布包", to: "/tote" },
  { name: "手机壳", to: "/phonecase" },
  { name: "海报", to: "/poster" },
  { name: "贴纸", to: "/sticker" },
];

const showAnnouncement = ref(
  site.features.announcement && site.announcement.enabled,
);
const {
  fetchPublishedProducts,
  getPublishedProductImage,
  getPublishedProductPath,
} = usePublishedProducts();
const isSearchOpen = ref(false);
const searchKeyword = ref("");
const searchLoading = ref(false);
const searchResults = ref<StorefrontPublishedProduct[]>([]);
const isMobileMenuOpen = ref(false);
const isScrolled = ref(false);
const isUserMenuOpen = ref(false);
const showStickyHeader = ref(false);
const headerHeight = ref(0);

const userMenuRef = ref(null);
const userButtonRef = ref(null);
const headerRef = ref<HTMLElement | null>(null);
const searchInputRef = ref<HTMLInputElement | null>(null);
let searchTimer: ReturnType<typeof setTimeout> | undefined;
let searchRequestId = 0;

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
      document.addEventListener("keydown", handleSearchShortcut);
      updateHeaderState();
      syncHeaderHeight();
    });

    window.addEventListener("resize", syncHeaderHeight, { passive: true });
  }
});

onUnmounted(() => {
  if (process.client) document.removeEventListener("click", handleClickOutside);
  if (process.client)
    document.removeEventListener("keydown", handleSearchShortcut);
  if (process.client) window.removeEventListener("resize", syncHeaderHeight);
  if (process.client) document.body.style.overflow = "";
  if (searchTimer) clearTimeout(searchTimer);
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

const handleClickOutside = (event: MouseEvent) => {
  if (!process.client || !isUserMenuOpen.value) return;
  const userMenu = userMenuRef.value as HTMLElement | null;
  const userButton = userButtonRef.value as HTMLElement | null;
  if (
    userMenu &&
    userButton &&
    !userMenu.contains(event.target as Node) &&
    !userButton.contains(event.target as Node)
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

const searchSuggestions = computed(() =>
  (site.home.productFinderGroups || []).slice(0, 6),
);

const formatSearchPrice = (price: number | null) => {
  if (!price) return "可定制";
  return `¥${price.toFixed(price % 1 === 0 ? 0 : 2)}`;
};

const openSearch = async () => {
  closeMobileMenu();
  isSearchOpen.value = true;
  await nextTick();
  searchInputRef.value?.focus();
};

const closeSearch = () => {
  isSearchOpen.value = false;
  searchRequestId += 1;
  searchKeyword.value = "";
  searchResults.value = [];
  searchLoading.value = false;
};

const selectSearchSuggestion = (keyword: string) => {
  searchKeyword.value = keyword;
  nextTick(() => searchInputRef.value?.focus());
};

const submitSearch = async () => {
  const keyword = searchKeyword.value.trim();
  closeSearch();
  await navigateTo(
    keyword ? `/products/${encodeURIComponent(keyword)}` : "/products",
  );
};

const handleSearchShortcut = (event: KeyboardEvent) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openSearch();
    return;
  }
  if (event.key === "Escape" && isSearchOpen.value) closeSearch();
};

watch(searchKeyword, (value) => {
  if (searchTimer) clearTimeout(searchTimer);
  const keyword = value.trim();
  if (!keyword) {
    searchResults.value = [];
    searchLoading.value = false;
    return;
  }

  searchLoading.value = true;
  const requestId = ++searchRequestId;
  searchTimer = setTimeout(async () => {
    try {
      const results = await fetchPublishedProducts({
        pageSize: 6,
        searchText: keyword,
        random: false,
      });
      if (requestId === searchRequestId) searchResults.value = results;
    } catch {
      if (requestId === searchRequestId) searchResults.value = [];
    } finally {
      if (requestId === searchRequestId) searchLoading.value = false;
    }
  }, 260);
});

watch(isSearchOpen, (open) => {
  if (!process.client) return;
  document.body.style.overflow = open ? "hidden" : "";
});

watch(isMobileMenuOpen, (open) => {
  if (!process.client) return;
  document.body.style.overflow = open ? "hidden" : "";
});

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

const getAvatarInitial = (name: string) => {
  if (!name) return "U";
  const trimmed = name.trim();
  if (!trimmed) return "U";
  const firstChar = trimmed[0];
  return /[a-zA-Z]/.test(firstChar) ? firstChar.toUpperCase() : firstChar;
};

const getAvatarColor = (name: string) => {
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
  closeSearch();
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
  right: var(--ys-container-pad, 1rem);
  display: grid;
  place-items: center;
  width: 1.6rem;
  height: 1.6rem;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: #fff;
}

/* === Apple-Style Ultra-Minimalist Header === */
.site-header {
  position: relative;
  top: 0;
  padding: 0.6rem 0;
  background: #ffffff;
  border: 0;
  box-shadow: none;
  color: #1d1d1f;
  transition:
    background-color 240ms ease,
    transform 420ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 420ms ease;
}

.site-header-scrolled {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 0;
  box-shadow: none;
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
  background: rgba(255, 255, 255, 0.94);
  border: 0;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: none;
}

.site-header-visible {
  transform: translateY(0);
  opacity: 1;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  width: 100%;
  min-height: 44px;
  padding: 0 1.5rem;
}

.mobile-menu-btn {
  display: none;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: #1d1d1f;
  cursor: pointer;
  flex-shrink: 0;
  box-shadow: none;
  transition: background-color 0.16s ease;

  &:hover {
    background: #f5f5f7;
  }

  &.active {
    background: #1d1d1f;
    color: #ffffff;
  }
}

.brand-mark {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: #1d1d1f;
  text-decoration: none;
  white-space: nowrap;
  flex: 0 0 auto;
}

.brand-logo-img {
  display: block;
  height: 26px;
  width: auto;
  flex-shrink: 0;
  object-fit: contain;
}

.brand-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.1rem;
  line-height: 1;
}

.brand-name-en {
  font-family: var(--ys-font-display);
  font-size: 0.92rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #1d1d1f;
}

.brand-name-zh {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #86868b;
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 0.1rem;
  flex: 0 0 auto;
}

.nav-item {
  position: relative;
  padding: 0.35rem 0.75rem;
  border: 0;
  background: transparent;
  color: #515154;
  text-decoration: none;
  font-size: 0.76rem;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  border-radius: 999px;
  transition: all 0.16s ease;
  letter-spacing: 0.01em;
}

.nav-item:hover {
  color: #1d1d1f;
  background: #f5f5f7;
}

.nav-item.router-link-active,
.nav-item.router-link-exact-active {
  color: #1d1d1f;
  background: #f5f5f7;
  font-weight: 700;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex: 1 1 auto;
  justify-content: flex-end;
  min-width: 0;
}

.header-search-trigger {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  height: 2.3rem;
  width: clamp(200px, 22vw, 320px);
  padding: 0 0.85rem;
  border: 0;
  border-radius: 999px;
  background: #f5f5f7;
  color: #86868b;
  cursor: pointer;
  box-shadow: none;
  transition: all 0.18s ease;

  &:hover {
    color: #1d1d1f;
    background: #e8e8ed;
  }
}

.search-trigger-text {
  font-size: 0.76rem;
  font-weight: 500;
  color: #86868b;
  flex: 1;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.search-kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--ys-font-sans);
  font-size: 0.64rem;
  font-weight: 600;
  color: #86868b;
  background: #ffffff;
  padding: 0.12rem 0.45rem;
  border-radius: 4px;
  line-height: 1;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}

.header-login-link {
  color: #515154;
  font-size: 0.76rem;
  font-weight: 600;
  padding: 0.38rem 0.85rem;
  text-decoration: none;
  border-radius: 999px;
  white-space: nowrap;
  transition: all 0.16s ease;
}

.header-login-link:hover {
  color: #1d1d1f;
  background: #f5f5f7;
}

.header-signup-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2.15rem;
  padding: 0 1.2rem;
  border-radius: 999px;
  background: #1d1d1f;
  color: #ffffff;
  font-size: 0.76rem;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
  transition: opacity 0.18s ease;
}

.header-signup-btn:hover {
  opacity: 0.88;
}

.header-icon-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.15rem;
  height: 2.15rem;
  padding: 0;
  border-radius: 999px;
  border: 0;
  background: #f5f5f7;
  color: #515154;
  text-decoration: none;
  box-shadow: none;
  transition: all 0.18s ease;
  flex-shrink: 0;
}

.header-icon-link:hover {
  color: #1d1d1f;
  background: #e8e8ed;
}

.header-icon-link:active {
  transform: scale(0.94);
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
  width: 26px;
  height: 26px;
  border-radius: 999px;
  color: #171717;
  font-size: 0.74rem;
  font-weight: 700;
  flex: 0 0 auto;
  border: 0;
  box-shadow: none;
}

.user-avatar--mobile {
  width: 32px;
  height: 32px;
  font-size: 0.82rem;
}

.user-menu-wrapper {
  position: relative;
  z-index: 2;
}

.user-menu-button {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.2rem 0.65rem 0.2rem 0.2rem;
  border: 0;
  border-radius: 999px;
  background: #f5f5f7;
  color: #1d1d1f;
  cursor: pointer;
  box-shadow: none;
  transition: all 0.2s ease;
}

.user-menu-button:hover,
.user-menu-button.is-active {
  background: #e8e8ed;
}

.user-menu-caret {
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.user-menu-caret.is-active {
  transform: rotate(180deg);
}

.user-name {
  max-width: 7.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.74rem;
  font-weight: 600;
}

.user-menu-dropdown {
  position: absolute;
  top: calc(100% + 0.6rem);
  right: 0;
  z-index: 120;
  min-width: 11.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.4rem;
  border: 0;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.user-menu-item {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  width: 100%;
  padding: 0.55rem 0.75rem;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #1d1d1f;
  text-align: left;
  text-decoration: none;
  font-size: 0.76rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.16s ease;
}

.user-menu-item:hover {
  background: #f5f5f7;
}

.user-menu-item.logout-item:hover {
  background: #fff5f5;
  color: #e53e3e;
}

.menu-item-icon {
  opacity: 0.7;
}

.logout-item {
  color: #e53e3e;
}

.page-content {
  min-height: 1px;
}

/* === Apple-Style Ultra-Minimalist Mobile Drawer === */
.mobile-panel-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.24);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.mobile-panel {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: min(290px, 80vw);
  height: 100dvh;
  background: #ffffff;
  border: 0;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  z-index: 210;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  padding: max(1.1rem, calc(0.5rem + env(safe-area-inset-top, 0px))) max(1.2rem, env(safe-area-inset-right, 0px)) max(1.1rem, calc(0.5rem + env(safe-area-inset-bottom, 0px))) max(1.2rem, env(safe-area-inset-left, 0px));
}

.mobile-panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.8rem;
  margin-bottom: 0.2rem;
}

.mobile-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.mobile-brand-logo {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.mobile-brand-title {
  font-family: var(--ys-font-display);
  font-size: 0.88rem;
  font-weight: 700;
  color: #1d1d1f;
  letter-spacing: -0.01em;
}

.mobile-close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: transparent;
  border: 0;
  box-shadow: none;
  color: #86868b;
  cursor: pointer;
  transition: color 0.16s ease, background-color 0.16s ease;

  &:hover {
    background: #f5f5f7;
    color: #1d1d1f;
  }
}

.mobile-search-section {
  margin-bottom: 1rem;
}

.mobile-search-pill {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  width: 100%;
  height: 2.2rem;
  padding: 0 0.75rem;
  border-radius: 8px;
  background: #f5f5f7;
  border: 0;
  box-shadow: none;
  color: #1d1d1f;
  font-size: 0.76rem;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.16s ease;

  &:hover {
    background: #e8e8ed;
  }
}

.mobile-search-text {
  flex: 1;
  color: #86868b;
}

.mobile-section-title {
  font-size: 0.62rem;
  font-weight: 600;
  color: #86868b;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin: 0.5rem 0 0.35rem 0.1rem;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  margin-bottom: 1rem;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 2.2rem;
  padding: 0.35rem 0.5rem;
  border-radius: 6px;
  background: transparent;
  border: 0;
  box-shadow: none;
  color: #1d1d1f;
  text-decoration: none;
  font-size: 0.84rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  transition: background-color 0.16s ease;

  &:hover,
  &.router-link-active {
    background: #f5f5f7;
    color: #000000;
    font-weight: 600;
  }
}

.mobile-quick-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 1rem;
}

.mobile-cat-chip {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.65rem;
  border-radius: 6px;
  background: #f5f5f7;
  border: 0;
  box-shadow: none;
  color: #1d1d1f;
  text-decoration: none;
  font-size: 0.74rem;
  font-weight: 500;
  transition: background-color 0.16s ease;

  &:hover {
    background: #e8e8ed;
    color: #000000;
  }
}

.mobile-user-section {
  margin-top: auto;
  padding-top: 0.8rem;
  border: 0;
}

.mobile-user-card {
  background: #f5f5f7;
  border: 0;
  box-shadow: none;
  border-radius: 10px;
  padding: 0.75rem;
}

.mobile-user-meta {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.user-name-text {
  font-size: 0.8rem;
  font-weight: 600;
  color: #1d1d1f;
}

.mobile-user-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.6rem;
}

.mobile-user-action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.35rem 0.6rem;
  border-radius: 6px;
  background: #ffffff;
  border: 0;
  box-shadow: none;
  color: #1d1d1f;
  text-decoration: none;
  font-size: 0.74rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.16s ease;

  &:hover {
    background: #e8e8ed;
  }

  &.logout {
    color: #e53e3e;
    background: #fff5f5;

    &:hover {
      background: #fed7d7;
    }
  }
}

.mobile-auth-card {
  background: transparent;
  border: 0;
  box-shadow: none;
  padding: 0;
}

.mobile-auth-btns {
  display: flex;
  gap: 0.5rem;
}

.mobile-btn-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 2.1rem;
  border-radius: 8px;
  background: #1d1d1f;
  border: 0;
  box-shadow: none;
  color: #ffffff;
  font-size: 0.76rem;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.16s ease;

  &:hover {
    opacity: 0.88;
  }
}

.mobile-btn-secondary {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 2.1rem;
  border-radius: 8px;
  background: #f5f5f7;
  border: 0;
  box-shadow: none;
  color: #1d1d1f;
  font-size: 0.76rem;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.16s ease;

  &:hover {
    background: #e8e8ed;
  }
}

.mobile-drawer-footer {
  margin-top: 0.75rem;
  text-align: center;
  font-size: 0.6rem;
  color: #86868b;
  font-weight: 400;
}

/* === Transitions === */
.mobile-drawer-enter-active,
.mobile-drawer-leave-active {
  transition: opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1);

  .mobile-panel {
    transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
  }
}

.mobile-drawer-enter-from,
.mobile-drawer-leave-to {
  opacity: 0;

  .mobile-panel {
    transform: translateX(-100%);
  }
}

.user-menu-enter-active,
.user-menu-leave-active {
  transition: all 0.2s ease;
}

.user-menu-enter-from,
.user-menu-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* === Search Overlay (Apple Style) === */
.site-search-overlay {
  position: fixed;
  inset: 0;
  z-index: 240;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: auto;
  background: rgba(0, 0, 0, 0.32);
  color: #1d1d1f;
  padding: max(4.5rem, 10vh) 1rem 2rem;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.site-search-panel {
  width: min(760px, 94vw);
  max-height: min(80vh, 760px);
  overflow: hidden;
  border: 0;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.16);
}

.site-search-close {
  display: grid;
  width: 2.1rem;
  height: 2.1rem;
  flex: 0 0 auto;
  place-items: center;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: #86868b;
  cursor: pointer;
  transition: all 0.16s ease;

  &:hover {
    background: #f5f5f7;
    color: #1d1d1f;
  }
}

.site-search-form {
  display: flex;
  min-height: 72px;
  align-items: center;
  gap: 0.85rem;
  border: 0;
  border-bottom: 1px solid #f5f5f7;
  background: #fff;
  padding: 0 1.25rem;

  input {
    flex: 1 1 auto;
    width: 100%;
    min-width: 0;
    border: 0;
    background: transparent;
    padding: 0;
    color: #1d1d1f;
    font-size: 1.12rem;
    font-weight: 500;
  }
}

.site-search-submit {
  display: grid;
  width: 2.1rem;
  height: 2.1rem;
  flex: 0 0 auto;
  place-items: center;
  border: 0;
  border-radius: 999px;
  background: #1d1d1f;
  color: #fff;
  cursor: pointer;
  transition: opacity 0.16s ease;

  &:hover {
    opacity: 0.88;
  }
}

.site-search-content {
  max-height: calc(min(80vh, 760px) - 72px);
  overflow-y: auto;
  padding: 1.25rem;
}

.site-search-results-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  font-size: 0.76rem;
  color: #86868b;

  strong {
    color: #1d1d1f;
  }
}

.site-search-suggestions > div:last-child {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.45rem;

  button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.65rem 0.85rem;
    border-radius: 10px;
    border: 0;
    background: #f5f5f7;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.16s ease;

    &:hover {
      background: #e8e8ed;
    }

    strong {
      display: block;
      font-size: 0.82rem;
      color: #1d1d1f;
    }

    small {
      display: block;
      font-size: 0.68rem;
      color: #86868b;
    }
  }
}

.site-search-status {
  padding: 2rem 1rem;
  text-align: center;
  color: #86868b;
  font-size: 0.82rem;
}

.site-search-result-list {
  display: grid;
  gap: 0.45rem;
}

.site-search-result {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 0.75rem;
  padding: 0.45rem 0.65rem;
  border-radius: 10px;
  background: #f5f5f7;
  text-decoration: none;
  color: inherit;
  transition: background-color 0.16s ease;

  &:hover {
    background: #e8e8ed;
  }

  small {
    font-weight: 600;
    color: #1d1d1f;
    font-size: 0.76rem;
  }
}

.site-search-result-media {
  width: 44px;
  height: 44px;
  border-radius: 6px;
  overflow: hidden;
  background: #e8e8ed;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.site-search-result-copy {
  display: flex;
  flex-direction: column;

  strong {
    font-size: 0.82rem;
    color: #1d1d1f;
  }

  span {
    font-size: 0.68rem;
    color: #86868b;
  }
}

.site-search-all {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  width: 100%;
  padding: 0.65rem;
  margin-top: 0.5rem;
  border: 0;
  border-radius: 10px;
  background: #f5f5f7;
  color: #1d1d1f;
  font-size: 0.78rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #e8e8ed;
  }
}

/* === Responsive Media Queries === */
@media (max-width: 1024px) {
  .desktop-nav,
  .desktop-only {
    display: none !important;
  }

  .mobile-menu-btn {
    display: inline-flex;
  }

  .header-inner {
    padding: 0 0.85rem;
    gap: 0.75rem;
  }

  .brand-mark {
    margin-right: auto;
  }

  .brand-logo-img {
    height: 24px;
  }

  .brand-name-en {
    font-size: 0.86rem;
  }

  .brand-name-zh {
    font-size: 0.62rem;
  }

  .header-actions {
    gap: 0.45rem;
  }

  .header-search-trigger {
    width: 32px;
    height: 32px;
    padding: 0;
    justify-content: center;
    border-radius: 999px;
  }
}

@media (max-width: 640px) {
  .site-search-overlay {
    padding: 0.5rem;
  }

  .site-search-panel {
    width: 100%;
    max-height: calc(100dvh - 1rem);
    border-radius: 14px;
  }

  .site-search-form {
    min-height: 58px;
  }

  .site-search-form input {
    font-size: 0.88rem;
  }

  .site-search-content {
    max-height: calc(100dvh - 58px - 1rem);
    padding: 0.75rem;
  }

  .site-search-suggestions > div:last-child {
    grid-template-columns: 1fr;
  }

  .site-search-result {
    grid-template-columns: 40px minmax(0, 1fr) auto;
  }

  .site-search-result-media {
    width: 40px;
    height: 40px;
  }

  .site-search-result-arrow {
    display: none;
  }
}
</style>
