<template>
  <div class="gucci-page-wrapper">
    <!-- Header Navigation -->
    <header class="gucci-header">
      <div class="gucci-header-inner">
        <div class="header-left">
          <NuxtLink to="/" class="back-link underline-slide">
            ‹ 返回工坊首页
          </NuxtLink>
        </div>
        <div class="header-center">
          <NuxtLink to="/" class="gucci-brand-logo logo-hover-effect">
            名 片 设 计 工 坊 · B U S I N E S S  C A R D
          </NuxtLink>
        </div>
        <div class="header-right">
          <NuxtLink v-if="!publicUserStore.isLoggedIn" to="/login" class="header-icon-link underline-slide">登录 / 注册</NuxtLink>
          <div v-else class="user-menu">
            <button type="button" class="user-menu-trigger" :aria-expanded="userMenuOpen" aria-haspopup="menu" @click="userMenuOpen = !userMenuOpen">
              <span class="user-avatar">{{ userInitial }}</span>
              <span class="user-menu-copy">
                <strong>{{ displayName }}</strong>
              </span>
              <span class="user-menu-chevron" aria-hidden="true">⌄</span>
            </button>
            <div v-if="userMenuOpen" class="user-menu-panel" role="menu">
              <NuxtLink to="/profile" role="menuitem" @click="userMenuOpen = false">个人资料</NuxtLink>
              <button type="button" role="menuitem" @click="handleLogout">退出登录</button>
            </div>
          </div>
          <NuxtLink to="/" class="header-icon-link underline-slide">首页</NuxtLink>
        </div>
      </div>
    </header>

    <main class="gucci-main-container">
      <!-- Search Banner & Filter Bar -->
      <section class="search-hero-banner">
        <h1 class="search-title">全量名片高级搜索 · 点击免费设计同款</h1>
        <p class="search-sub">探寻 600g 触感棉纸、活字凹版压印、24K 浮雕烫金与极客钛钢名片设计灵感。</p>

        <!-- Search Input Bar -->
        <div class="search-bar-wrapper">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="输入设计关键词（如：极简黑金、活字压印、钛钢、莫兰迪色系、创业公司）…"
            class="search-input sharp-input"
            @keyup.enter="handleSearch"
          />
          <button type="button" class="search-btn icon-hover-bounce" @click="handleSearch">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </section>

      <!-- Advanced Filters Section -->
      <section class="advanced-filter-panel">
        <div class="filter-row">
          <span class="filter-row-label">设计工艺流派 (CRAFT)</span>
          <div class="filter-options">
            <button
              v-for="cat in categories"
              :key="cat.key"
              type="button"
              class="filter-chip-btn ripple-btn"
              :class="{ active: selectedCategory === cat.key }"
              @click="selectCategory(cat.key)"
            >
              {{ cat.label }}
            </button>
          </div>
        </div>

        <div class="filter-row">
          <span class="filter-row-label">纸张与材质 (STOCK)</span>
          <div class="filter-options">
            <button
              v-for="paper in paperStocks"
              :key="paper.key"
              type="button"
              class="filter-chip-btn ripple-btn"
              :class="{ active: selectedPaperStock === paper.key }"
              @click="selectedPaperStock = paper.key"
            >
              {{ paper.label }}
            </button>
          </div>
        </div>

        <div class="filter-row filter-row-flex">
          <div class="filter-sub-group">
            <span class="filter-row-label">排序方式 (SORT BY)</span>
            <select v-model="sortBy" class="filter-select sharp-input">
              <option value="recommended">综合推荐 (RECOMMENDED)</option>
              <option value="popular">最受欢迎 (MOST POPULAR)</option>
              <option value="price-asc">指导价：从低到高</option>
              <option value="price-desc">指导价：从高到低</option>
            </select>
          </div>

          <div class="filter-sub-group">
            <span class="filter-row-label">指导价区间 (PRICE RANGE)</span>
            <div class="price-range-inputs">
              <input v-model.number="minPrice" type="number" placeholder="Min $" class="price-num-input sharp-input" />
              <span>-</span>
              <input v-model.number="maxPrice" type="number" placeholder="Max $" class="price-num-input sharp-input" />
            </div>
          </div>
        </div>
      </section>

      <!-- Products Grid Section -->
      <section class="products-grid-section">
        <div class="results-header-line">
          <span class="results-count">为您找到 <strong>{{ filteredProducts.length }}</strong> 项匹配的名片设计灵感稿</span>
          <button type="button" class="clear-filters-btn underline-slide" @click="resetFilters">重置筛选条件</button>
        </div>

        <div v-if="loading" class="gucci-loading">
          <div class="spinner-ring"></div>
          <span>正在进行高级搜索与数据检索…</span>
        </div>

        <div v-else-if="filteredProducts.length === 0" class="gucci-empty">
          <p>暂无符合条件的名片设计样式，请输入其他关键字搜索，或直接预约设计师免费定制。</p>
          <NuxtLink to="/contact" class="reset-btn ripple-btn">
            申请 0元免费设计专属样稿
          </NuxtLink>
        </div>

        <div v-else class="gucci-products-grid">
          <div
            v-for="item in filteredProducts"
            :key="item.id"
            class="gucci-product-card interactive-product-card"
            @click="navigateToProduct(item)"
          >
            <div class="product-photo-wrapper">
              <img
                v-if="getProductImage(item)"
                :src="getProductImage(item)"
                :alt="item.title"
                class="product-photo zoom-on-hover"
              />
              <div v-else class="product-fallback-photo">
                <svg class="fallback-svg icon-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <rect x="3" y="4" width="18" height="16" rx="0"></rect>
                  <line x1="7" y1="8" x2="17" y2="8"></line>
                  <line x1="7" y1="12" x2="13" y2="12"></line>
                </svg>
                <span class="fallback-tag">DESIGN PORTFOLIO</span>
              </div>
              <span class="luxury-badge">可免费设计同款</span>
            </div>

            <div class="product-details">
              <h3 class="product-name">{{ item.title }}</h3>
              <div class="product-price">{{ item.type || '名片定制' }} · {{ formatPrice(item) }}</div>
              <p class="product-desc">{{ item.description || '特种纸结合 24K 浮雕烫金与活字凹版压印设计。' }}</p>
              <div class="card-action-link underline-slide">
                <span>免费设计同款风格</span>
                <span class="arrow">›</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="gucci-mini-footer">
      <div class="footer-logo-small">名 片 设 计 工 坊 · B U S I N E S S  C A R D</div>
      <p>© 2026 名片设计工坊 Business Card Design Atelier. 保留所有权利。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { StorefrontPublishedProduct } from '~/composables/use-published-products';
import { usePublicUserStore } from '~/stores/public-user';
import { api } from '~/utils/api';
import { useToast } from '~/composables/use-toast';

definePageMeta({
  layout: 'default'
});

useSeoMeta({
  title: '全量名片高级搜索 · 免费设计同款 | 名片设计工坊 | BUSINESS CARD',
  ogTitle: '全量名片高级搜索 · BUSINESS CARD',
  description: '多维度高级检索高端商务名片、特种纸工艺名片与金属凸字名片设计，支持一键免费设计同款。',
  ogDescription: '多维度高级检索高端商务名片设计，支持一键免费设计同款。'
});

useHead({
  title: '全量名片高级搜索 · 免费设计同款 | 名片设计工坊 | BUSINESS CARD',
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📇</text></svg>' }
  ]
});

const route = useRoute();
const router = useRouter();
const { fetchPublishedProducts, getPublishedProductImage } = usePublishedProducts();
const publicUserStore = usePublicUserStore();
const toast = useToast();
const userMenuOpen = ref(false);
const displayName = computed(() => publicUserStore.currentUser?.name || '会员');
const userInitial = computed(() => displayName.value.trim().slice(0, 1).toUpperCase());

const handleLogout = async () => {
  try {
    await api.publicUser.logout();
  } catch (error) {
    console.error('退出登录失败:', error);
  } finally {
    publicUserStore.clearToken();
    userMenuOpen.value = false;
    toast.success('已退出登录');
    await router.push('/');
  }
};

const loading = ref(true);
const products = ref<StorefrontPublishedProduct[]>([]);
const searchQuery = ref((route.query.q as string) || '');
const selectedCategory = ref((route.query.category as string) || 'all');
const selectedPaperStock = ref('all');
const sortBy = ref('recommended');
const minPrice = ref<number | null>(null);
const maxPrice = ref<number | null>(null);

const categories = [
  { key: 'all', label: '全部工艺 (All)' },
  { key: 'letterpress', label: '凹版活字压印 (Letterpress)' },
  { key: 'gold-foil', label: '24K 浮雕烫金 (Gold Foil)' },
  { key: 'steel', label: '钛钢极客精印 (Metal Steel)' },
  { key: 'specialty', label: '触感特种纸艺 (Specialty Paper)' }
];

const paperStocks = [
  { key: 'all', label: '全部纸张 (All)' },
  { key: 'cotton', label: '600g 进口纯棉纸' },
  { key: 'black', label: '500g 哑光黑卡' },
  { key: 'velvet', label: '400g 绒面触感纸' },
  { key: 'metal', label: '钛钢拉丝合金' }
];

const getProductImage = (item: any) => {
  return item?.imageUrl ? getPublishedProductImage(item) : '';
};

const formatPrice = (item: StorefrontPublishedProduct) => {
  if (!item.price) return '可定制';
  return `¥${Number(item.price).toFixed(Number(item.price) % 1 === 0 ? 0 : 2)}`;
};

const handleSearch = () => {
  router.replace({ query: { ...route.query, q: searchQuery.value || undefined } });
};

const selectCategory = (key: string) => {
  selectedCategory.value = key;
  router.replace({ query: { ...route.query, category: key === 'all' ? undefined : key } });
};

const resetFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = 'all';
  selectedPaperStock.value = 'all';
  sortBy.value = 'recommended';
  minPrice.value = null;
  maxPrice.value = null;
  router.replace({ query: {} });
};

const filteredProducts = computed(() => {
  let result = products.value.filter((item) => {
    const searchableText = [item.title, item.description, item.category, item.type].join(' ').toLowerCase();
    const query = searchQuery.value.trim().toLowerCase();
    const categoryTerms: Record<string, string[]> = {
      letterpress: ['letterpress', '凹版', '活字', '棉纸'],
      'gold-foil': ['gold', 'foil', '烫金', '浮雕', '黑金'],
      steel: ['steel', 'metal', '钛钢', '金属', '拉丝'],
      specialty: ['specialty', 'paper', '特种纸', '绒面', '触感']
    };
    const paperTerms: Record<string, string[]> = {
      cotton: ['cotton', '棉纸', '600g'],
      black: ['black', '黑卡', '哑光'],
      velvet: ['velvet', '绒面', '触感'],
      metal: ['metal', 'steel', '钛钢', '合金']
    };
    const matchesQuery = !query || searchableText.includes(query);
    const matchesCategory = selectedCategory.value === 'all' || (categoryTerms[selectedCategory.value] || [selectedCategory.value]).some((term) => searchableText.includes(term));
    const matchesPaperStock = selectedPaperStock.value === 'all' || (paperTerms[selectedPaperStock.value] || [selectedPaperStock.value]).some((term) => searchableText.includes(term));
    const price = item.price;
    const matchesMin = minPrice.value === null || (price !== null && price >= minPrice.value);
    const matchesMax = maxPrice.value === null || (price !== null && price <= maxPrice.value);
    return matchesQuery && matchesCategory && matchesPaperStock && matchesMin && matchesMax;
  });

  if (sortBy.value === 'price-asc') {
    result.sort((a, b) => (a.price ?? Number.POSITIVE_INFINITY) - (b.price ?? Number.POSITIVE_INFINITY));
  } else if (sortBy.value === 'price-desc') {
    result.sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
  }

  return result;
});

const navigateToProduct = (item: any) => {
  router.push(`/product/${encodeURIComponent(item.id)}`);
};

onMounted(async () => {
  try {
    publicUserStore.initToken();
  } catch (e) {}

  try {
    loading.value = true;
    const res = await fetchPublishedProducts({ pageSize: 48, random: false });
    if (res && Array.isArray(res)) {
      products.value = res;
    } else if (res && Array.isArray(res.items)) {
      products.value = res.items;
    }
  } catch (e) {
    console.error('Failed to fetch search products:', e);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.gucci-page-wrapper {
  background: #ffffff;
  color: #000000;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", Didot, "Times New Roman", serif;
}

input, select, textarea, button, .tag-btn, .reset-btn, .search-input, .filter-chip-btn, .filter-select, .price-num-input {
  border-radius: 0 !important;
}

/* Micro-Interactions */
.ripple-btn {
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.ripple-btn:active {
  transform: scale(0.96) !important;
}

.zoom-on-hover {
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}

.interactive-product-card:hover .zoom-on-hover {
  transform: scale(1.08);
}

.interactive-product-card {
  transition: all 0.35s cubic-bezier(0.25, 1, 0.5, 1);
}

.interactive-product-card:hover {
  transform: translateY(-6px);
}

.icon-hover-bounce:hover svg {
  transform: scale(1.15);
  stroke: #d4a337;
}

.underline-slide {
  position: relative;
  text-decoration: none !important;
}

.underline-slide::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0%;
  height: 2px;
  background: #000000;
  transition: width 0.3s ease;
}

.underline-slide:hover::after {
  width: 100%;
}

.sharp-input {
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.sharp-input:focus {
  border-bottom-color: #d4a337 !important;
  box-shadow: 0 2px 8px rgba(212, 163, 55, 0.2);
}

.gucci-header {
  border-bottom: 1px solid #e5e5e5;
  background: #ffffff;
  position: sticky;
  top: 0;
  z-index: 100;
}

.gucci-header-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.back-link, .header-icon-link {
  color: #000000;
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 700;
}

.user-greeting {
  font-size: 0.82rem;
  font-weight: 700;
  color: #d4a337;
}

.gucci-brand-logo {
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #000000;
  text-decoration: none;
}

.gucci-main-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.search-hero-banner {
  text-align: center;
  margin-bottom: 3rem;
}

.search-title {
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin: 0 0 0.5rem;
}

.search-sub {
  font-size: 0.9rem;
  color: #666666;
  margin: 0 0 2rem;
}

.search-bar-wrapper {
  max-width: 680px;
  margin: 0 auto;
  position: relative;

  .search-input {
    width: 100%;
    border: none;
    border-bottom: 2px solid #000000;
    padding: 0.85rem 3rem 0.85rem 0.5rem;
    font-size: 1rem;
    outline: none;
    font-family: inherit;
  }

  .search-btn {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;

    svg {
      width: 22px;
      height: 22px;
      stroke: #000000;
    }
  }
}

/* Advanced Filter Panel */
.advanced-filter-panel {
  background: #fcfcfc;
  border: 1px solid #eeeeee;
  padding: 1.75rem 2rem;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.filter-row {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .filter-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}

.filter-row-flex {
  justify-content: space-between;
  border-top: 1px dashed #e5e5e5;
  padding-top: 1rem;
}

.filter-row-label {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: #888888;
  min-width: 130px;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-chip-btn {
  background: #ffffff;
  border: 1px solid #cccccc;
  padding: 0.45rem 1rem;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-chip-btn.active, .filter-chip-btn:hover {
  background: #000000;
  color: #ffffff;
  border-color: #000000;
}

.filter-sub-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.filter-select {
  border: 1px solid #cccccc;
  padding: 0.45rem 1rem;
  font-size: 0.78rem;
  font-weight: 700;
  outline: none;
  background: #ffffff;
}

.price-range-inputs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.price-num-input {
  width: 90px;
  border: 1px solid #cccccc;
  padding: 0.45rem 0.5rem;
  font-size: 0.78rem;
  outline: none;
  text-align: center;
}

.results-header-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  font-size: 0.82rem;
  color: #666666;
}

.clear-filters-btn {
  background: none;
  border: none;
  color: #000000;
  font-weight: 700;
  cursor: pointer;
}

.gucci-products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.5rem;
}

@media (max-width: 1024px) {
  .gucci-products-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .gucci-products-grid { grid-template-columns: 1fr; }
}

.gucci-product-card {
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.product-photo-wrapper {
  height: 320px;
  background: #f5f5f5;
  position: relative;
  overflow: hidden;
}

.product-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-fallback-photo {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%);
  color: #d4a337;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.fallback-svg { width: 44px; height: 44px; stroke: #d4a337; }
.fallback-tag { font-size: 0.7rem; font-weight: 800; letter-spacing: 0.2em; color: #ffffff; }

.luxury-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #000000;
  color: #ffffff;
  font-size: 0.65rem;
  font-weight: 800;
  padding: 0.25rem 0.5rem;
  letter-spacing: 0.1em;
}

.product-details {
  padding: 1rem 0;
}

.product-name {
  font-size: 0.95rem;
  font-weight: 700;
  margin: 0 0 0.25rem;
}

.product-price {
  font-size: 0.85rem;
  color: #666666;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.product-desc {
  font-size: 0.8rem;
  color: #888888;
  margin: 0 0 0.85rem;
  line-height: 1.4;
}

.card-action-link {
  font-size: 0.78rem;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.gucci-loading, .gucci-empty {
  text-align: center;
  padding: 4rem 1rem;
  color: #666666;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.spinner-ring {
  width: 32px;
  height: 32px;
  border: 3px solid #e5e5e5;
  border-top-color: #000000;
  border-radius: 50% !important;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.reset-btn {
  margin-top: 1rem;
  background: #000000;
  color: #ffffff;
  border: none;
  padding: 0.75rem 2rem;
  font-size: 0.8rem;
  font-weight: 800;
  cursor: pointer;
  text-decoration: none;
}

.gucci-mini-footer {
  border-top: 1px solid #e5e5e5;
  padding: 2.5rem 1rem;
  text-align: center;
  font-size: 0.78rem;
  color: #888888;
}

.footer-logo-small {
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #000000;
  margin-bottom: 0.5rem;
}

.user-menu { position: relative; z-index: 120; }
.user-menu-trigger { display: inline-flex; align-items: center; gap: 0.45rem; padding: 0; border: 0; background: transparent; color: #111111; cursor: pointer; text-align: left; }
.user-avatar { width: 1.75rem; height: 1.75rem; display: inline-flex; align-items: center; justify-content: center; border: 1px solid #111111; border-radius: 50%; background: #111111; color: #ffffff; font-size: 0.72rem; font-weight: 700; }
.user-menu-copy { display: flex; flex-direction: row; align-items: center; gap: 0.3rem; min-width: 0; }
.user-menu-copy strong { max-width: 5.5rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.72rem; font-weight: 700; }
.user-menu-chevron { color: #777777; font-size: 0.9rem; line-height: 1; }
.user-menu-panel { position: absolute; top: calc(100% + 0.7rem); right: 0; min-width: 8.5rem; padding: 0.35rem 0; border: 1px solid #d8d8d8; background: #ffffff; }
.user-menu-panel a, .user-menu-panel button { display: block; width: 100%; box-sizing: border-box; padding: 0.65rem 0.8rem; border: 0; background: transparent; color: #222222; font: inherit; font-size: 0.72rem; text-align: left; text-decoration: none; cursor: pointer; }
.user-menu-panel a:hover, .user-menu-panel button:hover { background: #f3f3f3; }

@media (max-width: 768px) {
  .gucci-header-inner { padding: 0.85rem 1rem; gap: 0.75rem; }
  .header-left, .header-right { min-width: 0; }
  .header-center { flex: 1; min-width: 0; text-align: center; }
  .gucci-brand-logo { display: inline-block; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.88rem; letter-spacing: 0.07em; }
  .header-right { gap: 0.65rem; }
  .header-icon-link { font-size: 0.72rem; white-space: nowrap; }
  .gucci-main-container { padding: 2.5rem 1rem; }
  .search-title { font-size: 1.35rem; line-height: 1.45; letter-spacing: 0.04em; }
  .search-sub { font-size: 0.8rem; line-height: 1.65; }
  .search-bar-wrapper .search-input { font-size: 0.9rem; padding: 0.8rem 2.5rem 0.8rem 0.25rem; }
  .advanced-filter-panel { padding: 1.25rem 1rem; margin-bottom: 2rem; }
  .filter-row-flex { align-items: stretch; }
  .filter-sub-group { width: 100%; flex-direction: column; align-items: flex-start; gap: 0.6rem; }
  .filter-select { width: 100%; box-sizing: border-box; }
  .price-range-inputs { width: 100%; }
  .price-num-input { flex: 1; width: auto; }
  .results-header-line { align-items: flex-start; gap: 0.75rem; flex-direction: column; margin-bottom: 1.5rem; }
  .gucci-products-grid { gap: 1.5rem 1rem; }
  .product-photo-wrapper { height: 250px; }
  .product-details { padding: 0.8rem 0; }
  .product-name { font-size: 0.86rem; line-height: 1.45; }
  .product-desc { font-size: 0.76rem; }
  .gucci-mini-footer { padding: 2rem 1rem; }
  .footer-logo-small { font-size: 0.82rem; letter-spacing: 0.08em; }
}

@media (max-width: 420px) {
  .back-link { font-size: 0.7rem; }
  .header-right .header-icon-link:last-child { display: none; }
  .user-menu-copy { display: none; }
  .gucci-products-grid { grid-template-columns: 1fr; }
  .product-photo-wrapper { height: 300px; }
}
</style>
