<template>
  <div class="gucci-page-wrapper">
    <!-- Header Navigation -->
    <header class="gucci-header">
      <div class="gucci-header-inner">
        <div class="header-left">
          <NuxtLink to="/" class="back-link">
            ‹ 返回工坊首页
          </NuxtLink>
        </div>
        <div class="header-center">
          <NuxtLink to="/" class="gucci-brand-logo">
            名 片 设 计 工 坊 · B U S I N E S S  C A R D
          </NuxtLink>
        </div>
        <div class="header-right">
          <NuxtLink to="/" class="header-icon-link">首页</NuxtLink>
        </div>
      </div>
    </header>

    <main class="gucci-main-container">
      <!-- Search Banner & Filter Bar -->
      <section class="search-hero-banner">
        <h1 class="search-title">全量名片设计库 · 点击设计同款</h1>
        <p class="search-sub">探寻 600g 触感棉纸、活字凹版压印、24K 浮雕烫金与极客钛钢名片设计灵感。</p>

        <!-- Search Input Bar -->
        <div class="search-bar-wrapper">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索设计风格（如：极简黑金、活字压印、钛钢、莫兰迪色系）…"
            class="search-input"
            @keyup.enter="handleSearch"
          />
          <button type="button" class="search-btn" @click="handleSearch">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>

        <!-- Filter Tags -->
        <div class="category-tags-row">
          <button
            v-for="cat in categories"
            :key="cat.key"
            type="button"
            class="tag-btn"
            :class="{ active: selectedCategory === cat.key }"
            @click="selectCategory(cat.key)"
          >
            {{ cat.label }}
          </button>
        </div>
      </section>

      <!-- Products Grid Section -->
      <section class="products-grid-section">
        <div v-if="loading" class="gucci-loading">
          <div class="loading-spinner"></div>
          <span>正在检索名片设计灵感库…</span>
        </div>

        <div v-else-if="filteredProducts.length === 0" class="gucci-empty">
          <p>暂无符合条件的名片设计样式，请输入其他关键字搜索，或直接预约设计师定制。</p>
          <button type="button" class="reset-btn" @click="resetFilters">重置搜索条件</button>
        </div>

        <div v-else class="gucci-products-grid">
          <div
            v-for="item in filteredProducts"
            :key="item.id"
            class="gucci-product-card"
            @click="navigateToProduct(item)"
          >
            <div class="product-photo-wrapper">
              <img
                v-if="getProductImage(item)"
                :src="getProductImage(item)"
                :alt="item.name"
                class="product-photo"
              />
              <div v-else class="product-fallback-photo">
                <svg class="fallback-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <rect x="3" y="4" width="18" height="16" rx="0"></rect>
                  <line x1="7" y1="8" x2="17" y2="8"></line>
                  <line x1="7" y1="12" x2="13" y2="12"></line>
                </svg>
                <span class="fallback-tag">DESIGN PORTFOLIO</span>
              </div>
              <span class="luxury-badge">可设计同款</span>
            </div>

            <div class="product-details">
              <h3 class="product-name">{{ item.name }}</h3>
              <div class="product-price">设计同款指导价 ${{ item.price || '88.00' }}</div>
              <p class="product-desc">{{ item.description || '特种纸结合 24K 浮雕烫金与活字凹版压印设计。' }}</p>
              <div class="card-action-link">
                <span>设计同款风格</span>
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

definePageMeta({
  layout: 'default'
});

useSeoMeta({
  title: '全量名片设计库 · 设计同款 | 名片设计工坊 | BUSINESS CARD',
  ogTitle: '全量名片设计库 · BUSINESS CARD',
  description: '搜索并挑选专属的高端商务名片、特种纸工艺名片与金属凸字名片设计，支持一键设计同款。',
  ogDescription: '搜索并挑选专属的高端商务名片设计，支持一键设计同款。'
});

useHead({
  title: '全量名片设计库 · 设计同款 | 名片设计工坊 | BUSINESS CARD',
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📇</text></svg>' }
  ]
});

const route = useRoute();
const router = useRouter();
const { fetchPublishedProducts, getPublishedProductImage } = usePublishedProducts();

const loading = ref(true);
const products = ref<any[]>([]);
const searchQuery = ref((route.query.q as string) || '');
const selectedCategory = ref((route.query.category as string) || 'all');

const categories = [
  { key: 'all', label: '全部分类 (All Designs)' },
  { key: 'letterpress', label: '凹版活字压印 (Letterpress)' },
  { key: 'gold-foil', label: '24K 浮雕烫金 (Gold Foil)' },
  { key: 'steel', label: '钛钢极客精印 (Metal Steel)' },
  { key: 'specialty', label: '触感特种纸艺 (Specialty Paper)' }
];

const getProductImage = (item: any) => {
  if (item.images && item.images.length > 0) return item.images[0];
  return getPublishedProductImage(item);
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
  router.replace({ query: {} });
};

const filteredProducts = computed(() => {
  return products.value.filter((item) => {
    const matchesQuery = !searchQuery.value || item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || (item.description && item.description.toLowerCase().includes(searchQuery.value.toLowerCase()));
    const matchesCategory = selectedCategory.value === 'all' || item.category === selectedCategory.value || (item.name && item.name.toLowerCase().includes(selectedCategory.value));
    return matchesQuery && matchesCategory;
  });
});

const navigateToProduct = (item: any) => {
  router.push(`/product/${item.id}`);
};

onMounted(async () => {
  try {
    loading.value = true;
    const res = await fetchPublishedProducts({ page: 1, limit: 16 });
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

input, select, textarea, button, .tag-btn, .reset-btn, .search-input {
  border-radius: 0 !important;
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
  letter-spacing: 0.05em;
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
  margin-bottom: 4rem;
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
  max-width: 600px;
  margin: 0 auto 2rem;
  position: relative;

  .search-input {
    width: 100%;
    border: none;
    border-bottom: 2px solid #000000;
    padding: 0.85rem 3rem 0.85rem 0.5rem;
    font-size: 1rem;
    outline: none;
    font-family: inherit;
    border-radius: 0 !important;
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

.category-tags-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
}

.tag-btn {
  background: none;
  border: 1px solid #cccccc;
  padding: 0.55rem 1.25rem;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 0 !important;
}

.tag-btn.active, .tag-btn:hover {
  background: #000000;
  color: #ffffff;
  border-color: #000000;
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
  transition: transform 0.4s ease;
}

.gucci-product-card:hover .product-photo {
  transform: scale(1.05);
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
  border-radius: 0 !important;
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
  text-decoration: underline;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.gucci-loading, .gucci-empty {
  text-align: center;
  padding: 4rem 1rem;
  color: #666666;
}

.reset-btn {
  margin-top: 1rem;
  background: #000000;
  color: #ffffff;
  border: none;
  padding: 0.65rem 1.75rem;
  font-size: 0.78rem;
  font-weight: 800;
  cursor: pointer;
  border-radius: 0 !important;
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
</style>
