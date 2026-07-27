<template>
  <div class="woonuxt-theme" data-site="kitchen">
    <!-- ===== HEADER ===== -->
    <header class="wx-header" :class="{ 'is-scrolled': isScrolled }">
      <div class="wx-container wx-header-inner">
        <NuxtLink to="/" class="wx-logo">
          <span>🍳</span>
          <span>厨房设计工坊</span>
        </NuxtLink>

        <nav class="wx-nav">
          <NuxtLink to="/" class="wx-nav-link active">首页</NuxtLink>
          <NuxtLink to="/search" class="wx-nav-link">全部厨具</NuxtLink>
          <NuxtLink to="/search?type=围裙" class="wx-nav-link">围裙</NuxtLink>
          <NuxtLink to="/search?type=砧板" class="wx-nav-link">砧板</NuxtLink>
          <NuxtLink to="/about" class="wx-nav-link">品牌故事</NuxtLink>
          <NuxtLink to="/contact" class="wx-nav-link">联系我们</NuxtLink>
        </nav>

        <div class="wx-header-actions">
          <NuxtLink to="/login" class="wx-header-btn" title="登录">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </NuxtLink>
          <NuxtLink to="/search" class="wx-header-btn" title="收藏">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
          </NuxtLink>
        </div>

        <button class="wx-hamburger" @click="mobileMenuOpen = !mobileMenuOpen" aria-label="菜单">
          <span /><span /><span />
        </button>
      </div>
    </header>

    <!-- Mobile drawer -->
    <div class="wx-mobile-drawer" :class="{ 'is-open': mobileMenuOpen }">
      <div class="wx-mobile-backdrop" @click="mobileMenuOpen = false" />
      <div class="wx-mobile-panel">
        <nav class="wx-mobile-nav">
          <NuxtLink to="/" class="wx-mobile-nav-link" @click="mobileMenuOpen = false">首页</NuxtLink>
          <NuxtLink to="/search" class="wx-mobile-nav-link" @click="mobileMenuOpen = false">全部厨具</NuxtLink>
          <NuxtLink to="/search?type=围裙" class="wx-mobile-nav-link" @click="mobileMenuOpen = false">👨‍🍳 围裙</NuxtLink>
          <NuxtLink to="/search?type=砧板" class="wx-mobile-nav-link" @click="mobileMenuOpen = false">🪵 砧板</NuxtLink>
          <NuxtLink to="/search?type=隔热垫" class="wx-mobile-nav-link" @click="mobileMenuOpen = false">🧤 隔热垫</NuxtLink>
          <NuxtLink to="/search?type=调料罐" class="wx-mobile-nav-link" @click="mobileMenuOpen = false">🧂 调料罐</NuxtLink>
          <NuxtLink to="/about" class="wx-mobile-nav-link" @click="mobileMenuOpen = false">品牌故事</NuxtLink>
          <NuxtLink to="/contact" class="wx-mobile-nav-link" @click="mobileMenuOpen = false">联系我们</NuxtLink>
          <NuxtLink to="/login" class="wx-mobile-nav-link" @click="mobileMenuOpen = false">登录 / 注册</NuxtLink>
        </nav>
      </div>
    </div>

    <!-- ===== HERO ===== -->
    <section class="wx-hero">
      <div class="wx-hero-overlay" />
      <div class="wx-hero-content">
        <span class="wx-hero-eyebrow">厨房美学 · Kitchen Aesthetics</span>
        <h1 class="wx-hero-title">让厨房，成为<br/>灵感发生地</h1>
        <p class="wx-hero-desc">从围裙到砧板，从隔热垫到调料罐，每一件厨具都可以是艺术品。探索来自独立设计师的创意厨房用品，为日常烹饪注入仪式感。</p>
        <NuxtLink to="/search" class="wx-hero-cta">探索厨房好物 →</NuxtLink>
      </div>
    </section>

    <!-- ===== BRAND LOGOS BAR ===== -->
    <section class="wx-brands">
      <div class="wx-container">
        <div class="wx-brands-grid">
          <svg class="wx-brand-logo" viewBox="0 0 120 30" fill="currentColor"><text x="10" y="22" font-size="16" font-weight="700" font-family="sans-serif">KITCHEN</text></svg>
          <svg class="wx-brand-logo" viewBox="0 0 120 30" fill="currentColor"><text x="10" y="22" font-size="16" font-weight="700" font-family="sans-serif">HOME</text></svg>
          <svg class="wx-brand-logo" viewBox="0 0 120 30" fill="currentColor"><text x="10" y="22" font-size="16" font-weight="700" font-family="sans-serif">COOK</text></svg>
          <svg class="wx-brand-logo" viewBox="0 0 120 30" fill="currentColor"><text x="10" y="22" font-size="16" font-weight="700" font-family="sans-serif">DESIGN</text></svg>
          <svg class="wx-brand-logo" viewBox="0 0 120 30" fill="currentColor"><text x="10" y="22" font-size="16" font-weight="700" font-family="sans-serif">STYLE</text></svg>
          <svg class="wx-brand-logo" viewBox="0 0 120 30" fill="currentColor"><text x="10" y="22" font-size="16" font-weight="700" font-family="sans-serif">CRAFT</text></svg>
        </div>
      </div>
    </section>

    <!-- ===== CATEGORIES ===== -->
    <section class="wx-categories">
      <div class="wx-container">
        <div class="wx-section-header">
          <h2 class="wx-section-title">厨具分类</h2>
          <NuxtLink to="/search" class="wx-section-link">查看全部 →</NuxtLink>
        </div>
        <div class="wx-categories-grid">
          <NuxtLink v-for="cat in categories" :key="cat.name" :to="`/search?type=${cat.name}`" class="wx-category-card">
            <div class="wx-category-placeholder" :style="{ background: cat.bg }">{{ cat.icon }}</div>
            <div class="wx-category-card-overlay">
              <span class="wx-category-card-name">{{ cat.name }}</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ===== TRUST BADGES ===== -->
    <section class="wx-trust">
      <div class="wx-container">
        <div class="wx-trust-grid">
          <div class="wx-trust-item">
            <div class="wx-trust-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            </div>
            <div class="wx-trust-text">
              <h4>免费配送</h4>
              <p>全场满 ¥199 包邮</p>
            </div>
          </div>
          <div class="wx-trust-item">
            <div class="wx-trust-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
            </div>
            <div class="wx-trust-text">
              <h4>品质保证</h4>
              <p>精选材质，匠心工艺</p>
            </div>
          </div>
          <div class="wx-trust-item">
            <div class="wx-trust-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
            </div>
            <div class="wx-trust-text">
              <h4>7天退换</h4>
              <p>不满意可无条件退换</p>
            </div>
          </div>
          <div class="wx-trust-item">
            <div class="wx-trust-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
            </div>
            <div class="wx-trust-text">
              <h4>24/7 客服</h4>
              <p>全天候在线客服支持</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== PRODUCTS ===== -->
    <section class="wx-products">
      <div class="wx-container">
        <div class="wx-section-header">
          <h2 class="wx-section-title">精选厨具</h2>
          <NuxtLink to="/search" class="wx-section-link">查看全部 →</NuxtLink>
        </div>

        <div v-if="loading" class="wx-loading">
          <div class="wx-loading-spinner" />
          正在加载精选厨具…
        </div>
        <div v-else-if="products.length === 0" class="wx-empty">暂无商品，请稍后刷新</div>
        <div v-else class="wx-products-grid">
          <NuxtLink v-for="item in products" :key="item.id" :to="getPublishedProductPath(item)" class="wx-product-card">
            <div class="wx-product-image">
              <img v-if="getPublishedProductImage(item)" :src="getPublishedProductImage(item)" :alt="item.title" class="img-primary" loading="lazy" />
              <img v-if="getPublishedProductImage(item, 800)" :src="getPublishedProductImage(item, 800)" :alt="item.title" class="img-hover" loading="lazy" />
              <span v-if="item.originalPrice && item.originalPrice > item.price" class="wx-sale-badge">-{{ Math.round((1 - item.price / item.originalPrice) * 100) }}%</span>
            </div>
            <div class="wx-product-info">
              <div class="wx-product-rating">
                <span class="wx-stars">★★★★★</span>
                <span class="wx-rating-count">({{ getRatingCount(item.id) }})</span>
              </div>
              <h3 class="wx-product-title">{{ item.title }}</h3>
              <div class="wx-product-price">
                <span v-if="item.price" class="wx-price-current">¥{{ item.price }}</span>
                <span v-if="item.originalPrice && item.originalPrice > item.price" class="wx-price-original">¥{{ item.originalPrice }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ===== NEWSLETTER ===== -->
    <section class="wx-newsletter">
      <div class="wx-container">
        <h2 class="wx-newsletter-title">订阅厨房灵感通讯</h2>
        <p class="wx-newsletter-desc">获取专属优惠、新品资讯和限量发售通知</p>
        <form class="wx-newsletter-form" @submit.prevent>
          <input type="email" class="wx-newsletter-input" placeholder="请输入您的邮箱地址" />
          <button type="submit" class="wx-newsletter-btn">订阅</button>
        </form>
      </div>
    </section>

    <!-- ===== FOOTER ===== -->
    <footer class="wx-footer">
      <div class="wx-container">
        <div class="wx-footer-grid">
          <div class="wx-footer-brand">
            <div class="wx-footer-brand-logo">
              <span>🍳</span>
              <span>厨房设计工坊</span>
            </div>
            <p class="wx-footer-brand-desc">专注于创意厨具与个性厨房用品定制服务，让每一次烹饪都成为生活的仪式感。</p>
          </div>
          <div class="wx-footer-col">
            <h4>快速链接</h4>
            <ul>
              <li><NuxtLink to="/search">新品到货</NuxtLink></li>
              <li><NuxtLink to="/search">热销推荐</NuxtLink></li>
              <li><NuxtLink to="/search?type=围裙">围裙定制</NuxtLink></li>
              <li><NuxtLink to="/search?type=砧板">砧板设计</NuxtLink></li>
              <li><NuxtLink to="/search?type=隔热垫">隔热垫</NuxtLink></li>
            </ul>
          </div>
          <div class="wx-footer-col">
            <h4>客户服务</h4>
            <ul>
              <li><NuxtLink to="/contact">帮助中心</NuxtLink></li>
              <li><NuxtLink to="/login">订单查询</NuxtLink></li>
              <li><NuxtLink to="/contact">配送信息</NuxtLink></li>
              <li><NuxtLink to="/contact">退换政策</NuxtLink></li>
              <li><NuxtLink to="/contact">联系我们</NuxtLink></li>
            </ul>
          </div>
          <div class="wx-footer-col">
            <h4>关于我们</h4>
            <ul>
              <li><NuxtLink to="/about">品牌故事</NuxtLink></li>
              <li><NuxtLink to="/about">设计师入驻</NuxtLink></li>
              <li><NuxtLink to="/about">合作伙伴</NuxtLink></li>
            </ul>
          </div>
        </div>
        <div class="wx-footer-bottom">
          <span>© 2026 厨房设计工坊. All Rights Reserved.</span>
          <div class="wx-footer-social">
            <a href="#" aria-label="微信">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18z"/><path d="M23.997 14.637c0-3.2-3.095-5.794-6.913-5.794-3.818 0-6.913 2.594-6.913 5.794 0 3.2 3.095 5.794 6.913 5.794.713 0 1.403-.1 2.052-.289a.725.725 0 01.59.076l1.584.926a.264.264 0 00.14.045.244.244 0 00.241-.244c0-.06-.023-.118-.039-.177l-.325-1.228a.49.49 0 01.177-.552c1.515-1.115 2.492-2.783 2.492-4.346zm-9.043-1.047c-.535 0-.969-.44-.969-.983s.434-.983.969-.983c.535 0 .969.44.969.983s-.434.983-.969.983zm4.258 0c-.535 0-.969-.44-.969-.983s.434-.983.969-.983c.535 0 .969.44.969.983s-.434.983-.969.983z"/></svg>
            </a>
            <a href="#" aria-label="微博">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.737 5.439z"/></svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
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
  title: '厨房设计工坊 · 创意厨具与厨房用品定制平台',
  ogTitle: '厨房设计工坊 · 创意厨具与厨房用品定制',
  description: '厨房设计工坊专注于创意厨具、个性厨房用品与家居烹饪配件定制服务，让厨房也成为艺术空间。',
  ogDescription: '让厨房也成为艺术空间，创意厨具与个性厨房用品专属定制。'
});

useHead({
  htmlAttrs: { lang: 'zh-CN' },
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍳</text></svg>' }
  ]
});

const { fetchPublishedProducts, getPublishedProductImage, getPublishedProductPath } = usePublishedProducts();

const loading = ref(true);
const products = ref<any[]>([]);
const isScrolled = ref(false);
const mobileMenuOpen = ref(false);

const categories = [
  { icon: '👨‍🍳', name: '围裙', bg: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)' },
  { icon: '🪵', name: '砧板', bg: 'linear-gradient(135deg, #f5ece2, #e8d5c0)' },
  { icon: '🧤', name: '隔热垫', bg: 'linear-gradient(135deg, #fff3e0, #ffe0b2)' },
  { icon: '🧂', name: '调料罐', bg: 'linear-gradient(135deg, #e3f2fd, #bbdefb)' },
  { icon: '🍽️', name: '餐垫', bg: 'linear-gradient(135deg, #fce4ec, #f8bbd0)' },
  { icon: '🧻', name: '厨房毛巾', bg: 'linear-gradient(135deg, #e0f7fa, #b2ebf2)' },
];

// Deterministic rating count based on product ID
function getRatingCount(id: string | number) {
  const hash = String(id).split('').reduce((acc: number, c: string) => acc + c.charCodeAt(0), 0);
  return (hash % 80) + 10;
}

// Countdown timer
const cd = ref({ days: '00', hours: '00', minutes: '00', seconds: '00' });
let timer: ReturnType<typeof setInterval> | null = null;

function updateCountdown() {
  const now = new Date();
  const end = new Date(now);
  end.setDate(end.getDate() + 3);
  end.setHours(23, 59, 59, 0);
  const diff = end.getTime() - now.getTime();
  if (diff <= 0) {
    cd.value = { days: '00', hours: '00', minutes: '00', seconds: '00' };
    return;
  }
  cd.value = {
    days: String(Math.floor(diff / 86400000)).padStart(2, '0'),
    hours: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0'),
    minutes: String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'),
    seconds: String(Math.floor((diff % 60000) / 1000)).padStart(2, '0'),
  };
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleScroll() {
  isScrolled.value = window.scrollY > 50;
}

onMounted(async () => {
  updateCountdown();
  timer = setInterval(updateCountdown, 1000);
  try {
    products.value = (await fetchPublishedProducts({ pageSize: 12, random: true })) || [];
  } catch (e) {
    console.error('Failed to fetch kitchen products:', e);
  } finally {
    loading.value = false;
  }
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* Site-specific overrides */
.woonuxt-theme[data-site="kitchen"] {
  --wx-accent: #2d6a4f;
  --wx-accent-light: #52b788;
  --wx-accent-dark: #1b4332;
}

/* Category placeholder (no real images) */
.wx-category-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
}

/* Hero background for kitchen */
.woonuxt-theme[data-site="kitchen"] .wx-hero {
  background: linear-gradient(135deg, #f5f0e1 0%, #e8f5e9 50%, #f0e4d6 100%);
}

.woonuxt-theme[data-site="kitchen"] .wx-hero-overlay {
  background: linear-gradient(to right, rgba(45, 106, 79, 0.35) 0%, rgba(45, 106, 79, 0.1) 60%, transparent 100%);
}
</style>
