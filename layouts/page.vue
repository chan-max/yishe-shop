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
            class="header-search-trigger desktop-only"
            title="打开全屏搜索"
            aria-label="打开全屏搜索"
            @click="openSearch"
          >
            <AppIcon
              name="search"
              class="ui-icon"
              :size="17"
              aria-hidden="true"
            />
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
            <div class="user-menu-wrapper">
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
            <NuxtLink to="/login" class="header-login-link"> 登录 </NuxtLink>
            <NuxtLink to="/products" class="header-signup-btn">
              开始创作
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

          <button
            type="button"
            class="mobile-search-trigger"
            @click="openSearch"
          >
            <AppIcon
              name="search"
              class="ui-icon"
              :size="16"
              aria-hidden="true"
            />
            <span>搜索商品、印花或定制</span>
            <AppIcon
              name="arrow-right"
              class="ui-icon"
              :size="14"
              aria-hidden="true"
            />
          </button>

          <nav class="mobile-nav" aria-label="移动端导航">
            <NuxtLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="mobile-nav-link"
              @click="closeMobileMenu"
            >
              <AppIcon
                :name="item.icon"
                class="ui-icon"
                :size="17"
                aria-hidden="true"
              />
              {{ item.label }}
            </NuxtLink>
          </nav>

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
              <div>
                <strong>{{
                  currentUser?.name || currentUser?.account || "用户"
                }}</strong>
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
  right: var(--ys-container-pad);
  display: grid;
  place-items: center;
  width: 1.6rem;
  height: 1.6rem;
  border: 0;
  border-radius: 999px;
  background: transparent;
}

.site-header {
  position: relative;
  top: 0;
  padding: 0.6rem 0;
  background: rgba(255, 255, 255, 0.96);
  border-bottom: 1px solid #e2e8f0;
  transition:
    background-color 240ms ease,
    border-color 240ms ease,
    transform 420ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 420ms ease;
  color: #0f172a;
  box-shadow: 0 2px 14px rgba(0, 0, 0, 0.03);
}

.site-header-scrolled {
  background: rgba(255, 255, 255, 0.92);
  border-bottom-color: #cbd5e1;
  backdrop-filter: blur(20px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
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
  border-bottom-color: #cbd5e1;
  backdrop-filter: blur(20px) saturate(110%);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
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

.brand-mark {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  color: #0f172a;
  text-decoration: none;
  white-space: nowrap;
  flex: 0 0 auto;
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex: 0 0 auto;
  margin-left: 0.5rem;
}

.brand-logo-img {
  display: block;
  height: 28px;
  width: auto;
  flex-shrink: 0;
  object-fit: contain;
}

.brand-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.12rem;
  line-height: 1;
}

.brand-name-en {
  font-family: var(--ys-font-display);
  font-size: 0.96rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #0f172a;
}

.brand-name-zh {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: #475569;
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 0.1rem;
  flex: 0 0 auto;
}

.nav-item {
  position: relative;
  padding: 0.38rem 0.75rem;
  border: 0;
  background: transparent;
  color: #475569;
  text-decoration: none;
  font-size: 0.76rem;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
  border-radius: 999px;
  transition: all 0.16s ease;
  letter-spacing: 0.01em;
}

.nav-item:hover {
  color: #0f172a;
  background: #f1f5f9;
}

.nav-item.router-link-active,
.nav-item.router-link-exact-active {
  color: #0f172a;
  background: #e2e8f0;
  font-weight: 800;
}

.ui-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.header-search-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.15rem;
  height: 2.15rem;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: #0f172a;
  cursor: pointer;
  transition: opacity 0.18s ease;
}

.header-search-trigger:hover {
  opacity: 0.55;
}

.header-login-link {
  color: #475569;
  font-size: 0.76rem;
  font-weight: 700;
  padding: 0.38rem 0.85rem;
  text-decoration: none;
  border-radius: 999px;
  white-space: nowrap;
  transition: all 0.16s ease;
}

.header-login-link:hover {
  color: #0f172a;
  background: #f1f5f9;
}

.header-signup-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2.15rem;
  padding: 0 1.2rem;
  border-radius: 999px;
  background: #0f172a;
  color: #ffffff;
  font-size: 0.76rem;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
  transition:
    background 0.18s ease,
    opacity 0.18s ease;
}

.header-signup-btn:hover {
  background: #1e293b;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1 1 auto;
  justify-content: flex-end;
  min-width: 0;
}

.header-icon-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.15rem;
  height: 2.15rem;
  padding: 0;
  border-radius: 999px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #475569;
  text-decoration: none;
  transition: all 0.18s ease;
  flex-shrink: 0;
}

.header-icon-link:hover {
  color: #0f172a;
  background: #f1f5f9;
  border-color: #cbd5e1;
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
  width: 28px;
  height: 28px;
  border-radius: 999px;
  color: #171717;
  font-size: 0.76rem;
  font-weight: 800;
  flex: 0 0 auto;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
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
  gap: 0.45rem;
  padding: 0.2rem 0.65rem 0.2rem 0.2rem;
  border: 1px solid #e2e8f0;
  border-radius: 999px;
  background: #f8fafc;
  color: #334155;
  cursor: pointer;
  transition: all 0.2s ease;
}

.user-menu-button:hover,
.user-menu-button.is-active {
  border-color: #cbd5e1;
  background: #f1f5f9;
  color: #0f172a;
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
  font-size: 0.76rem;
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
  border: 1px solid #e2e8f0;
  border-radius: 14px;
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
  color: #374151;
  text-align: left;
  text-decoration: none;
  font-size: 0.76rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.16s ease;
}

.user-menu-item:hover {
  background: #f3f4f6;
  color: #111827;
}

.user-menu-item.logout-item:hover {
  background: #fef2f2;
  color: #ef4444;
}

.menu-item-icon {
  opacity: 0.7;
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

.mobile-search-trigger {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  min-height: 3rem;
  margin-top: 0.9rem;
  border: 0;
  border-radius: 0;
  background: #f3f3f0;
  color: #111;
  padding: 0 0.8rem;
  font-size: 0.78rem;
  text-align: left;
  cursor: pointer;
}

.mobile-search-trigger span {
  flex: 1;
  color: #777;
}

.mobile-search-trigger:hover {
  background: #ebebe7;
}

.site-search-overlay {
  position: fixed;
  inset: 0;
  z-index: 240;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: auto;
  background: rgba(17, 17, 17, 0.34);
  color: #111;
  padding: max(4.5rem, 10vh) 1rem 2rem;
  backdrop-filter: blur(5px);
}

.site-search-panel {
  width: min(680px, 100%);
  max-height: min(78vh, 720px);
  overflow: hidden;
  border: 0;
  border-radius: 0;
  background: rgba(255, 255, 255, 0.98);
}

.site-search-close {
  display: grid;
  width: 1.9rem;
  height: 1.9rem;
  flex: 0 0 auto;
  place-items: center;
  border: 0;
  border-radius: 3px;
  background: transparent;
  color: #666;
  cursor: pointer;
}

.site-search-close:hover {
  background: #f1f1ef;
  color: #111;
}

.site-search-form {
  display: flex;
  min-height: 82px;
  align-items: center;
  gap: 0.75rem;
  border: 0;
  background: #fff;
  padding: 0 0.85rem 0 1.1rem;
}

.site-search-form input {
  appearance: none;
  -webkit-appearance: none;
  display: block;
  height: 3.4rem;
  min-width: 0;
  flex: 1;
  border: 0;
  border-radius: 0;
  outline: none;
  overflow: visible;
  background: transparent !important;
  box-shadow: none;
  color: #111;
  font-size: 1.18rem;
  font-weight: 500;
  line-height: 1.5;
  padding: 0.7rem 0;
}

.site-search-form input:focus,
.site-search-form input:focus-visible {
  outline: none;
  box-shadow: none;
}

.site-search-form input::-webkit-search-decoration,
.site-search-form input::-webkit-search-cancel-button,
.site-search-form input::-webkit-search-results-button,
.site-search-form input::-webkit-search-results-decoration {
  display: none;
}

.site-search-form input::placeholder {
  color: #a3a39e;
}

.site-search-submit {
  display: grid;
  width: 1.9rem;
  height: 1.9rem;
  flex: 0 0 auto;
  place-items: center;
  border: 0;
  border-radius: 3px;
  background: #111;
  color: #fff;
  cursor: pointer;
}

.site-search-content {
  max-height: calc(min(78vh, 720px) - 82px);
  overflow-y: auto;
  background: #f5f5f2;
  padding: 0.9rem;
}

.site-search-results-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0 0.2rem 0.55rem;
}

.site-search-results-head > span {
  color: #555;
  font-size: 0.63rem;
  font-weight: 700;
}

.site-search-results-head small {
  color: #999;
  font-size: 0.58rem;
}

.site-search-suggestions > div:last-child {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.35rem;
}

.site-search-suggestions button {
  display: flex;
  min-width: 0;
  min-height: 3.35rem;
  align-items: center;
  justify-content: space-between;
  gap: 0.65rem;
  border: 0;
  border-radius: 0;
  background: rgba(255, 255, 255, 0.86);
  color: #111;
  padding: 0.6rem 0.7rem;
  text-align: left;
  cursor: pointer;
}

.site-search-suggestions button:hover {
  background: #fff;
}

.site-search-suggestions button > span {
  min-width: 0;
}

.site-search-suggestions button strong,
.site-search-suggestions button small {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.site-search-suggestions button strong {
  font-size: 0.7rem;
  font-weight: 650;
}

.site-search-suggestions button small {
  margin-top: 0.14rem;
  color: #8a8a85;
  font-size: 0.58rem;
}

.site-search-result-list {
  display: grid;
  background: rgba(255, 255, 255, 0.86);
}

.site-search-result {
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr) auto 1rem;
  gap: 0.7rem;
  align-items: center;
  min-width: 0;
  min-height: 64px;
  border: 0;
  background: transparent;
  color: #111;
  padding: 0.45rem 0.65rem;
  text-decoration: none;
}

.site-search-result:hover {
  background: #fff;
}

.site-search-result-media {
  width: 48px;
  height: 48px;
  overflow: hidden;
  background: #f1f1ee;
}

.site-search-result-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 350ms cubic-bezier(0.22, 1, 0.36, 1);
}

.site-search-result:hover .site-search-result-media img {
  transform: scale(1.035);
}

.site-search-result strong,
.site-search-result-copy span {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.site-search-result strong {
  font-size: 0.7rem;
  font-weight: 650;
}

.site-search-result-copy span {
  margin-top: 0.16rem;
  color: #777;
  font-size: 0.58rem;
}

.site-search-result > small {
  color: #555;
  font-size: 0.62rem;
  white-space: nowrap;
}

.site-search-result-arrow {
  color: #999;
}

.site-search-all {
  display: flex;
  min-height: 2.7rem;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  border: 0;
  background: #ecece8;
  color: #111;
  padding: 0.65rem 0.75rem;
  font-size: 0.65rem;
  font-weight: 650;
  text-align: left;
  cursor: pointer;
}

.site-search-all:hover {
  background: #e4e4df;
}

.site-search-status {
  border: 0;
  background: rgba(255, 255, 255, 0.86);
  padding: 1.4rem 0.75rem;
  color: #777;
  font-size: 0.68rem;
}

.site-search-enter-active,
.site-search-leave-active {
  transition: opacity 160ms ease;
}

.site-search-enter-active .site-search-panel,
.site-search-leave-active .site-search-panel {
  transition:
    transform 180ms ease,
    opacity 160ms ease;
}

.site-search-enter-from,
.site-search-leave-to {
  opacity: 0;
}

.site-search-enter-from .site-search-panel,
.site-search-leave-to .site-search-panel {
  opacity: 0;
  transform: translateY(-6px) scale(0.99);
}

.site-search-panel button:focus,
.site-search-panel button:focus-visible,
.site-search-panel a:focus,
.site-search-panel a:focus-visible {
  outline: none;
  box-shadow: none;
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

@media (max-width: 640px) {
  .site-search-overlay {
    padding: 0.5rem;
  }

  .site-search-panel {
    width: 100%;
    max-height: calc(100dvh - 1rem);
    border-radius: 0;
  }

  .site-search-form {
    min-height: 66px;
  }

  .site-search-form input {
    font-size: 1.1rem;
  }

  .site-search-content {
    max-height: calc(100dvh - 66px - 1rem);
    padding: 0.7rem;
  }

  .site-search-suggestions > div:last-child {
    grid-template-columns: 1fr;
  }

  .site-search-result {
    grid-template-columns: 44px minmax(0, 1fr) auto;
    min-height: 58px;
  }

  .site-search-result-media {
    width: 44px;
    height: 44px;
  }

  .site-search-result-arrow {
    display: none;
  }
}
</style>
