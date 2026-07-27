<template>
  <div class="woonuxt-theme" data-site="mug">
    <!-- ===== HEADER ===== -->
    <header class="wx-header" :class="{ 'is-scrolled': isScrolled }">
      <div class="wx-header-inner">
        <div class="wx-header-left">
          <button class="wx-hamburger" @click="mobileMenuOpen = !mobileMenuOpen" aria-label="菜单">
            <span /><span /><span />
          </button>
          <NuxtLink to="/" class="wx-logo">
            <span class="wx-logo-icon">☕</span>
            <span>MugAtelier</span>
          </NuxtLink>
        </div>

        <nav class="wx-nav">
          <NuxtLink to="/" class="wx-nav-link active">首页</NuxtLink>
          <NuxtLink to="/search" class="wx-nav-link">商品</NuxtLink>
          <NuxtLink to="/search?type=咖啡杯" class="wx-nav-link">分类</NuxtLink>
          <NuxtLink to="/contact" class="wx-nav-link">联系我们</NuxtLink>
          <NuxtLink to="/search" class="wx-nav-link wx-nav-mobile-only">收藏夹</NuxtLink>
          <NuxtLink to="/login" class="wx-nav-link wx-nav-mobile-only">我的账户</NuxtLink>
        </nav>

        <div class="wx-header-right">
          <form class="wx-search-form" @submit.prevent="handleSearch">
            <svg class="wx-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input v-model="searchQuery" type="text" class="wx-search-input" placeholder="搜索商品..." />
          </form>
          <button class="wx-header-btn wx-search-mobile" @click="showMobileSearch = true" aria-label="搜索">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </button>
          <NuxtLink to="/login" class="wx-header-btn wx-user-desktop" title="登录">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </NuxtLink>
          <button class="wx-header-btn" title="购物车">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile drawer -->
    <div class="wx-mobile-drawer" :class="{ 'is-open': mobileMenuOpen }">
      <div class="wx-mobile-backdrop" @click="mobileMenuOpen = false" />
      <div class="wx-mobile-panel">
        <nav class="wx-mobile-nav">
          <NuxtLink to="/" class="wx-mobile-nav-link" @click="mobileMenuOpen = false">首页</NuxtLink>
          <NuxtLink to="/search" class="wx-mobile-nav-link" @click="mobileMenuOpen = false">商品</NuxtLink>
          <NuxtLink to="/search?type=咖啡杯" class="wx-mobile-nav-link" @click="mobileMenuOpen = false">☕ 咖啡杯</NuxtLink>
          <NuxtLink to="/search?type=陶瓷杯" class="wx-mobile-nav-link" @click="mobileMenuOpen = false">🍵 陶瓷杯</NuxtLink>
          <NuxtLink to="/search?type=保温杯" class="wx-mobile-nav-link" @click="mobileMenuOpen = false">🧴 保温杯</NuxtLink>
          <NuxtLink to="/search?type=马克杯" class="wx-mobile-nav-link" @click="mobileMenuOpen = false">🍺 马克杯</NuxtLink>
          <NuxtLink to="/search" class="wx-mobile-nav-link" @click="mobileMenuOpen = false">收藏夹</NuxtLink>
          <NuxtLink to="/login" class="wx-mobile-nav-link" @click="mobileMenuOpen = false">我的账户</NuxtLink>
        </nav>
      </div>
    </div>

    <!-- ===== MAIN CONTENT ===== -->
    <main class="wx-main">
      <!-- ===== HERO ===== -->
      <div class="wx-hero-wrapper">
        <img src="https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=1400&h=800&fit=crop" alt="Hero background" class="wx-hero-image" loading="eager" />
        <div class="wx-hero-overlay">
          <h1 class="wx-hero-title">发现手作杯具的<br/>温度与美感</h1>
          <h2 class="wx-hero-subtitle">精选杯具 · Curated Selection</h2>
          <div class="wx-hero-desc-wrapper">
            <p class="wx-hero-desc">从晨间第一杯咖啡到深夜的一盏热茶，每一只杯子都承载着生活的温度。探索来自独立设计师的原创杯具，为日常注入仪式感。</p>
          </div>
          <NuxtLink to="/search" class="wx-hero-cta">浏览商品</NuxtLink>
        </div>
      </div>

      <!-- ===== BRAND LOGOS ===== -->
      <div class="wx-container wx-brands">
        <img src="https://woonuxt-v3.vercel.app/images/logoipsum-211.svg" alt="Brand 1" width="132" height="35" />
        <img src="https://woonuxt-v3.vercel.app/images/logoipsum-221.svg" alt="Brand 2" width="119" height="30" />
        <img src="https://woonuxt-v3.vercel.app/images/logoipsum-225.svg" alt="Brand 3" width="49" height="48" />
        <img src="https://woonuxt-v3.vercel.app/images/logoipsum-280.svg" alt="Brand 4" width="78" height="30" />
        <img src="https://woonuxt-v3.vercel.app/images/logoipsum-284.svg" alt="Brand 5" width="70" height="44" />
        <img src="https://woonuxt-v3.vercel.app/images/logoipsum-215.svg" alt="Brand 6" width="132" height="40" />
      </div>

      <!-- ===== CATEGORIES ===== -->
      <section class="wx-container wx-section">
        <div class="wx-section-header">
          <h2 class="wx-section-title">杯具分类</h2>
          <NuxtLink to="/search" class="wx-section-link">查看全部</NuxtLink>
        </div>
        <div class="wx-categories-grid">
          <NuxtLink v-for="cat in categories" :key="cat.name" :to="`/search?type=${cat.name}`" class="wx-category-card">
            <img :src="cat.image" :alt="cat.name" class="wx-category-img" loading="lazy" />
            <div class="wx-category-gradient" />
            <span class="wx-category-name">{{ cat.name }}</span>
          </NuxtLink>
        </div>
      </section>

      <!-- ===== FEATURES ===== -->
      <section class="wx-container wx-section wx-section-lg">
        <div class="wx-features-grid">
          <div class="wx-feature-card">
            <img src="https://woonuxt-v3.vercel.app/icons/box.svg" width="60" height="60" alt="免费配送" loading="lazy" />
            <div>
              <h3 class="wx-feature-title">免费配送</h3>
              <p class="wx-feature-desc">全场满 ¥199 包邮</p>
            </div>
          </div>
          <div class="wx-feature-card">
            <img src="https://woonuxt-v3.vercel.app/icons/moneyback.svg" width="60" height="60" alt="品质保证" loading="lazy" />
            <div>
              <h3 class="wx-feature-title">品质保证</h3>
              <p class="wx-feature-desc">精选材质，匠心工艺</p>
            </div>
          </div>
          <div class="wx-feature-card">
            <img src="https://woonuxt-v3.vercel.app/icons/secure.svg" width="60" height="60" alt="安全支付" loading="lazy" />
            <div>
              <h3 class="wx-feature-title">安全支付</h3>
              <p class="wx-feature-desc">您的支付安全可靠</p>
            </div>
          </div>
          <div class="wx-feature-card">
            <img src="https://woonuxt-v3.vercel.app/icons/support.svg" width="60" height="60" alt="24/7 客服" loading="lazy" />
            <div>
              <h3 class="wx-feature-title">24/7 客服</h3>
              <p class="wx-feature-desc">全天候在线客服支持</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== PRODUCTS ===== -->
      <section class="wx-container wx-section">
        <div class="wx-section-header">
          <h2 class="wx-section-title">热门商品</h2>
          <NuxtLink to="/search" class="wx-section-link">查看全部</NuxtLink>
        </div>

        <div v-if="loading" class="wx-loading">
          <div class="wx-loading-spinner" />
          正在加载精选杯具…
        </div>
        <div v-else-if="products.length === 0" class="wx-empty">暂无商品，请稍后刷新</div>
        <div v-else class="wx-products-grid">
          <div v-for="(item, index) in products" :key="item.id" class="wx-product-card group">
            <div class="wx-product-image-wrap">
              <NuxtLink :to="getPublishedProductPath(item)" class="wx-product-image-link">
                <img v-if="getPublishedProductImage(item)" :src="getPublishedProductImage(item)" :alt="item.title" class="wx-product-img" :loading="index < 3 ? 'eager' : 'lazy'" />
              </NuxtLink>
              <span v-if="item.originalPrice && item.originalPrice > item.price" class="wx-sale-badge">-{{ Math.round((1 - item.price / item.originalPrice) * 100) }} %</span>
              <div v-if="getPublishedProductImage(item, 800)" class="wx-product-dots">
                <span class="wx-dot active" />
                <span class="wx-dot" />
              </div>
            </div>
            <div class="wx-product-info">
              <div class="wx-product-rating">
                <span v-for="i in 5" :key="i" class="wx-star" :class="{ empty: i > 4 }" />
                <span class="wx-rating-count">({{ getRatingCount(item.id) }})</span>
              </div>
              <NuxtLink :to="getPublishedProductPath(item)" class="wx-product-title">{{ item.title }}</NuxtLink>
              <div class="wx-product-price">
                <span v-if="item.originalPrice && item.originalPrice > item.price" class="wx-price-original">¥{{ item.originalPrice }}</span>
                <span v-if="item.price" class="wx-price-current">¥{{ item.price }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- ===== FOOTER ===== -->
    <footer class="wx-footer">
      <div class="wx-container wx-footer-inner">
        <div class="wx-footer-brand">
          <NuxtLink to="/" class="wx-footer-logo">
            <span class="wx-logo-icon">☕</span>
            <span>MugAtelier</span>
          </NuxtLink>
          <p class="wx-footer-desc">专注于手作杯具与创意马克杯定制服务，让每一次举杯都成为生活的仪式感。</p>
        </div>
        <div class="wx-footer-col">
          <div class="wx-footer-col-title">商品浏览</div>
          <div class="wx-footer-links">
            <NuxtLink to="/search">新品到货</NuxtLink>
            <NuxtLink to="/search">热销推荐</NuxtLink>
            <NuxtLink to="/search?type=咖啡杯">咖啡杯</NuxtLink>
            <NuxtLink to="/search?type=陶瓷杯">陶瓷杯</NuxtLink>
          </div>
        </div>
        <div class="wx-footer-col">
          <div class="wx-footer-col-title">客户服务</div>
          <div class="wx-footer-links">
            <NuxtLink to="/contact">联系我们</NuxtLink>
            <NuxtLink to="/contact">配送信息</NuxtLink>
            <NuxtLink to="/contact">退换政策</NuxtLink>
            <NuxtLink to="/contact">常见问题</NuxtLink>
          </div>
        </div>
        <div class="wx-footer-col">
          <div class="wx-footer-col-title">我的账户</div>
          <div class="wx-footer-links">
            <NuxtLink to="/login">我的账户</NuxtLink>
            <NuxtLink to="/login">订单历史</NuxtLink>
            <NuxtLink to="/search">收藏夹</NuxtLink>
            <NuxtLink to="/contact">通讯订阅</NuxtLink>
          </div>
        </div>
      </div>
      <div class="wx-footer-bottom">
        <div class="wx-footer-bottom-inner">
          <span>© 2026 MugAtelier.</span>
          <div class="wx-footer-social">
            <a href="#" aria-label="微信">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18z"/><path d="M23.997 14.637c0-3.2-3.095-5.794-6.913-5.794-3.818 0-6.913 2.594-6.913 5.794 0 3.2 3.095 5.794 6.913 5.794.713 0 1.403-.1 2.052-.289a.725.725 0 01.59.076l1.584.926a.264.264 0 00.14.045.244.244 0 00.241-.244c0-.06-.023-.118-.039-.177l-.325-1.228a.49.49 0 01.177-.552c1.515-1.115 2.492-2.783 2.492-4.346zm-9.043-1.047c-.535 0-.969-.44-.969-.983s.434-.983.969-.983c.535 0 .969.44.969.983s-.434.983-.969.983zm4.258 0c-.535 0-.969-.44-.969-.983s.434-.983.969-.983c.535 0 .969.44.969.983s-.434.983-.969.983z"/></svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
            </a>
            <a href="#" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>

    <!-- Back to top -->
    <button v-show="isScrolled" class="wx-back-to-top is-visible" @click="scrollToTop" aria-label="回到顶部">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import '~/apps/_shared/woonuxt-theme.css';

definePageMeta({ layout: false });

useSeoMeta({
  title: '手作杯子工坊 · 家居马克杯与创意杯具定制平台',
  ogTitle: '手作杯子工坊 · 家居马克杯与创意杯具定制',
  description: '手作杯子工坊专注于家居马克杯、创意陶瓷杯与个性印花杯具定制服务，为每一杯温暖注入独特设计。',
  ogDescription: '为每一杯温暖注入独特设计，手作陶瓷杯与创意马克杯专属定制。'
});

useHead({
  htmlAttrs: { lang: 'zh-CN' },
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>☕</text></svg>' }
  ]
});

const { fetchPublishedProducts, getPublishedProductImage, getPublishedProductPath } = usePublishedProducts();

const loading = ref(true);
const products = ref<any[]>([]);
const isScrolled = ref(false);
const mobileMenuOpen = ref(false);
const searchQuery = ref('');
const showMobileSearch = ref(false);

const categories = [
  { name: '咖啡杯', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=220&h=275&fit=crop' },
  { name: '陶瓷杯', image: 'https://images.unsplash.com/photo-1577936014378-282a0e3f3fcc?w=220&h=275&fit=crop' },
  { name: '保温杯', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=220&h=275&fit=crop' },
  { name: '马克杯', image: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=220&h=275&fit=crop' },
  { name: '茶杯', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=220&h=275&fit=crop' },
  { name: '玻璃杯', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=220&h=275&fit=crop' },
];

function getRatingCount(id: string | number) {
  const hash = String(id).split('').reduce((acc: number, c: string) => acc + c.charCodeAt(0), 0);
  return (hash % 80) + 10;
}

function handleSearch() {
  if (searchQuery.value.trim()) {
    navigateTo(`/search?q=${encodeURIComponent(searchQuery.value.trim())}`);
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleScroll() {
  isScrolled.value = window.scrollY > 50;
}

onMounted(async () => {
  try {
    products.value = (await fetchPublishedProducts({ pageSize: 10, random: true })) || [];
  } catch (e) {
    console.error('Failed to fetch products:', e);
  } finally {
    loading.value = false;
  }
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.woonuxt-theme[data-site="mug"] {
  --wx-accent: #c4704b;
  --wx-accent-light: #d4916e;
  --wx-accent-dark: #a85a3a;
}

/* Container - matches Tailwind container */
.wx-container {
  max-width: 1440px;
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 768px) {
  .wx-container {
    padding-left: 3rem;
    padding-right: 3rem;
  }
}

/* Main */
.wx-main {
  background: #f3f4f6;
}

/* Header */
.wx-header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: white;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);
}

.wx-header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem;
  max-width: 1440px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .wx-header-inner {
    padding: 1rem 3rem;
  }
}

.wx-header-left {
  display: flex;
  align-items: center;
}

.wx-header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 10rem;
  justify-content: flex-end;
}

@media (min-width: 640px) {
  .wx-header-right {
    gap: 1.5rem;
    width: auto;
  }
}

.wx-hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 26px;
  height: 26px;
  margin-right: 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
}

@media (min-width: 1024px) {
  .wx-hamburger {
    display: none;
  }
}

.wx-hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background: #374151;
  border-radius: 1px;
}

.wx-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
  text-decoration: none;
  width: 10rem;
}

.wx-logo-icon {
  font-size: 1.5rem;
}

.wx-nav {
  display: none;
  align-items: center;
  gap: 1.5rem;
  padding: 0 1rem;
}

@media (min-width: 1024px) {
  .wx-nav {
    display: flex;
  }
}

.wx-nav-link {
  font-size: 0.875rem;
  color: #6b7280;
  text-decoration: none;
  transition: color 0.2s;
}

.wx-nav-link:hover,
.wx-nav-link.active {
  color: #111827;
}

.wx-nav-mobile-only {
  display: block;
}

@media (min-width: 1024px) {
  .wx-nav-mobile-only {
    display: none;
  }
}

/* Search */
.wx-search-form {
  position: relative;
  display: none;
  align-items: center;
}

@media (min-width: 640px) {
  .wx-search-form {
    display: inline-flex;
  }
}

.wx-search-icon {
  position: absolute;
  left: 12px;
  width: 18px;
  height: 18px;
  opacity: 0.5;
  pointer-events: none;
}

.wx-search-input {
  width: 100%;
  max-width: 20rem;
  padding: 0.5rem 0.75rem 0.5rem 2.5rem;
  font-size: 0.875rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: #f9fafb;
  color: #374151;
  outline: none;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
}

.wx-search-input::placeholder {
  color: #9ca3af;
}

.wx-search-mobile {
  display: inline-flex;
}

@media (min-width: 640px) {
  .wx-search-mobile {
    display: none;
  }
}

.wx-user-desktop {
  display: none;
}

@media (min-width: 640px) {
  .wx-user-desktop {
    display: inline-flex;
  }
}

.wx-header-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  color: #374151;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.wx-header-btn svg {
  width: 22px;
  height: 22px;
}

/* Hero */
.wx-hero-wrapper {
  position: relative;
  width: 100%;
}

.wx-hero-image {
  display: block;
  width: 100%;
  height: 420px;
  object-fit: cover;
}

@media (min-width: 1024px) {
  .wx-hero-image {
    height: 560px;
  }
}

@media (min-width: 1280px) {
  .wx-hero-image {
    height: 640px;
  }
}

.wx-hero-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 1rem;
  max-width: 1440px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .wx-hero-overlay {
    padding: 0 3rem;
  }
}

@media (min-width: 640px) {
  .wx-hero-overlay {
    background: linear-gradient(to right, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 40%, transparent 70%);
  }
}

@media (max-width: 639px) {
  .wx-hero-overlay {
    background: linear-gradient(to right, rgba(243,244,246,0.95) 0%, rgba(243,244,246,0.7) 50%, transparent 100%);
  }
}

.wx-hero-title {
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 0.5rem;
  color: #111827;
}

@media (min-width: 768px) {
  .wx-hero-title {
    font-size: 2.25rem;
    margin-bottom: 1rem;
  }
}

@media (min-width: 1024px) {
  .wx-hero-title {
    font-size: 3.75rem;
  }
}

.wx-hero-subtitle {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #111827;
}

@media (min-width: 768px) {
  .wx-hero-subtitle {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
}

@media (min-width: 1024px) {
  .wx-hero-subtitle {
    font-size: 1.875rem;
  }
}

.wx-hero-desc-wrapper {
  max-width: 24rem;
  margin-bottom: 2rem;
}

@media (min-width: 1024px) {
  .wx-hero-desc-wrapper {
    max-width: 28rem;
  }
}

.wx-hero-desc {
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.6;
  color: #374151;
  text-wrap: balance;
}

.wx-hero-cta {
  display: inline-flex;
  padding: 0.75rem 1.5rem;
  font-weight: 700;
  color: white;
  background: #1f2937;
  border-radius: 0.75rem;
  text-decoration: none;
  transition: background 0.2s;
}

.wx-hero-cta:hover {
  background: #111827;
}

/* Brands */
.wx-brands {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 2rem 2rem;
  margin: 4rem auto;
  text-align: center;
}

.wx-brands img {
  max-height: min(8vw, 50px);
  object-fit: contain;
  opacity: 0.5;
  filter: grayscale(100%);
  transition: opacity 0.2s, filter 0.2s;
}

.wx-brands img:hover {
  opacity: 0.7;
  filter: grayscale(50%);
}

/* Section */
.wx-section {
  margin: 4rem auto;
}

.wx-section-lg {
  margin: 6rem auto;
}

.wx-section-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.wx-section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

@media (min-width: 768px) {
  .wx-section-title {
    font-size: 1.5rem;
  }
}

.wx-section-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--wx-accent-dark);
  text-decoration: none;
}

/* Categories */
.wx-categories-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 2rem;
}

@media (min-width: 768px) {
  .wx-categories-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .wx-categories-grid {
    grid-template-columns: repeat(6, 1fr);
  }
}

.wx-category-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  aspect-ratio: 4 / 5;
  border-radius: 0.75rem;
  border: 1px solid white;
  overflow: hidden;
  text-decoration: none;
}

.wx-category-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.wx-category-gradient {
  position: absolute;
  inset: 0;
  bottom: 0;
  height: 50%;
  background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);
  opacity: 0.5;
}

.wx-category-name {
  position: relative;
  z-index: 10;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  text-transform: capitalize;
}

@media (min-width: 768px) {
  .wx-category-name {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
}

/* Features */
.wx-features-grid {
  display: grid;
  gap: 1rem;
}

@media (min-width: 768px) {
  .wx-features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .wx-features-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.wx-feature-card {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 0.5rem;
}

.wx-feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
}

.wx-feature-desc {
  font-size: 0.875rem;
  color: #374151;
}

/* Products */
.wx-products-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 2rem;
}

@media (min-width: 768px) {
  .wx-products-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 1024px) {
  .wx-products-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

.wx-product-card {
  position: relative;
  width: 100%;
}

.wx-product-image-wrap {
  position: relative;
}

.wx-product-image-link {
  display: block;
  aspect-ratio: 8 / 9;
  overflow: hidden;
  border-radius: 0.5rem;
}

.wx-product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

.wx-sale-badge {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 10;
  padding: 0.125rem 0.375rem;
  font-size: 0.75rem;
  line-height: 1.5;
  color: white;
  background: #f87171;
  border-radius: 0.375rem;
}

.wx-product-dots {
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.25rem;
}

.wx-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255,255,255,0.6);
}

.wx-dot.active {
  background: white;
}

.wx-product-info {
  padding: 0.5rem;
}

.wx-product-rating {
  display: inline-flex;
  align-items: center;
}

.wx-star {
  display: inline-block;
  width: 14px;
  height: 14px;
  margin-right: 2px;
  background: #fbbf24;
  mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/%3E%3C/svg%3E");
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/%3E%3C/svg%3E");
  mask-size: contain;
  -webkit-mask-size: contain;
}

.wx-star.empty {
  background: #ccc;
}

.wx-rating-count {
  font-size: 0.75rem;
  margin-left: 0.25rem;
  color: #6b7280;
}

.wx-product-title {
  display: block;
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1.25;
  color: #111827;
  margin-bottom: 0.5rem;
  text-decoration: none;
  transition: color 0.2s;
}

.group:hover .wx-product-title {
  color: var(--wx-accent);
}

.wx-product-price {
  display: flex;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.wx-price-original {
  color: #9ca3af;
  font-weight: 400;
  text-decoration: line-through;
}

/* Footer */
.wx-footer {
  background: white;
  margin-top: 6rem;
}

.wx-footer-inner {
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  margin: 6rem 0;
}

@media (min-width: 768px) {
  .wx-footer-inner {
    gap: 6rem;
  }
}

.wx-footer-brand {
  margin-right: auto;
  max-width: 28rem;
}

.wx-footer-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
  text-decoration: none;
}

.wx-footer-desc {
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #374151;
  line-height: 1.6;
}

.wx-footer-col {
  width: 42.857%;
}

@media (min-width: 1024px) {
  .wx-footer-col {
    width: auto;
  }
}

.wx-footer-col-title {
  margin-bottom: 0.25rem;
  font-weight: 600;
  color: #111827;
}

.wx-footer-links {
  font-size: 0.875rem;
  color: #374151;
}

.wx-footer-links a {
  display: block;
  padding: 0.375rem 0;
  text-decoration: none;
}

.wx-footer-links a:hover {
  text-decoration: underline;
}

.wx-footer-bottom {
  border-top: 1px solid #e5e7eb;
}

.wx-footer-bottom-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
}

@media (min-width: 640px) {
  .wx-footer-bottom-inner {
    justify-content: space-between;
  }
}

.wx-footer-bottom span {
  font-size: 0.75rem;
  color: #4b5563;
}

.wx-footer-social {
  display: flex;
  gap: 1rem;
  font-size: 1.25rem;
}

.wx-footer-social a {
  color: #374151;
  text-decoration: none;
}

.wx-footer-social a:hover {
  color: #111827;
}

.wx-footer-social svg {
  width: 20px;
  height: 20px;
}

/* Loading */
.wx-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  color: #9ca3af;
  font-size: 0.9375rem;
}

.wx-loading-spinner {
  width: 24px;
  height: 24px;
  border: 2px solid #e5e7eb;
  border-top-color: var(--wx-accent);
  border-radius: 50%;
  animation: wx-spin 0.6s linear infinite;
  margin-right: 0.75rem;
}

@keyframes wx-spin {
  to { transform: rotate(360deg); }
}

.wx-empty {
  text-align: center;
  padding: 4rem 0;
  color: #9ca3af;
}

/* Back to top */
.wx-back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--wx-accent);
  color: white;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.2s, transform 0.2s;
  z-index: 50;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
}

.wx-back-to-top.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.wx-back-to-top:hover {
  background: var(--wx-accent-dark);
}

.wx-back-to-top svg {
  width: 20px;
  height: 20px;
}

/* Mobile drawer */
.wx-mobile-drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 200;
  pointer-events: none;
}

.wx-mobile-drawer.is-open {
  pointer-events: auto;
}

.wx-mobile-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  opacity: 0;
  transition: opacity 0.3s;
}

.wx-mobile-drawer.is-open .wx-mobile-backdrop {
  opacity: 1;
}

.wx-mobile-panel {
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100%;
  background: white;
  transform: translateX(-100%);
  transition: transform 0.3s;
  overflow-y: auto;
  z-index: 1;
}

.wx-mobile-drawer.is-open .wx-mobile-panel {
  transform: translateX(0);
}

.wx-mobile-nav {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
}

.wx-mobile-nav-link {
  display: block;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: #6b7280;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
}

.wx-mobile-nav-link:hover {
  background: #f3f4f6;
  color: #111827;
}
</style>
