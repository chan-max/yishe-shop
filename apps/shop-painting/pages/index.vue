<template>
  <div class="woonuxt-theme" data-site="painting">
    <!-- ===== HEADER ===== -->
    <header class="wx-header" :class="{ 'is-scrolled': isScrolled }">
      <div class="wx-container wx-header-inner">
        <NuxtLink to="/" class="wx-logo">
          <span>🎨</span>
          <span>名画艺廊</span>
        </NuxtLink>

        <nav class="wx-nav">
          <NuxtLink to="/" class="wx-nav-link active">首页</NuxtLink>
          <NuxtLink to="/search" class="wx-nav-link">全部作品</NuxtLink>
          <NuxtLink to="/about" class="wx-nav-link">关于艺廊</NuxtLink>
          <NuxtLink to="/contact" class="wx-nav-link">定制咨询</NuxtLink>
        </nav>

        <div class="wx-header-actions">
          <NuxtLink to="/login" class="wx-header-btn" title="登录">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </NuxtLink>
        </div>

        <button class="wx-hamburger" @click="mobileOpen = !mobileOpen" aria-label="菜单">
          <span /><span /><span />
        </button>
      </div>
    </header>

    <!-- Mobile drawer -->
    <div class="wx-mobile-drawer" :class="{ 'is-open': mobileOpen }">
      <div class="wx-mobile-backdrop" @click="mobileOpen = false" />
      <div class="wx-mobile-panel">
        <nav class="wx-mobile-nav">
          <NuxtLink to="/" class="wx-mobile-nav-link" @click="mobileOpen = false">首页</NuxtLink>
          <NuxtLink to="/search" class="wx-mobile-nav-link" @click="mobileOpen = false">全部作品</NuxtLink>
          <NuxtLink to="/about" class="wx-mobile-nav-link" @click="mobileOpen = false">关于艺廊</NuxtLink>
          <NuxtLink to="/contact" class="wx-mobile-nav-link" @click="mobileOpen = false">定制咨询</NuxtLink>
          <NuxtLink to="/login" class="wx-mobile-nav-link" @click="mobileOpen = false">登录</NuxtLink>
        </nav>
      </div>
    </div>

    <!-- ===== HERO ===== -->
    <section class="wx-hero wx-hero--dark">
      <div class="wx-hero-overlay" />
      <div class="wx-hero-content">
        <span class="wx-hero-eyebrow">GALLERY MASTERS · EST. 2026</span>
        <h1 class="wx-hero-title">将世界名画<br/>带入您的空间</h1>
        <p class="wx-hero-desc">博物馆级品质复制品，从莫奈到梵高，从毕加索到达利。每一幅都是对经典的致敬与对品质的执着。</p>
        <NuxtLink to="/search" class="wx-hero-cta">浏览馆藏 →</NuxtLink>
      </div>
    </section>

    <!-- ===== ARTIST STRIP ===== -->
    <section class="wx-artist-strip">
      <div class="wx-container">
        <div class="wx-artist-strip-inner">
          <span v-for="(name, i) in artistNames" :key="i" class="wx-artist-name">{{ name }}</span>
        </div>
      </div>
    </section>

    <!-- ===== CATEGORIES (Art Periods) ===== -->
    <section class="wx-categories">
      <div class="wx-container">
        <div class="wx-section-header">
          <h2 class="wx-section-title">艺术流派</h2>
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
              <h4>全球包邮</h4>
              <p>专业防震包装，全球免费配送</p>
            </div>
          </div>
          <div class="wx-trust-item">
            <div class="wx-trust-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
            </div>
            <div class="wx-trust-text">
              <h4>博物馆级复刻</h4>
              <p>Giclée 微喷，色彩还原度 99%</p>
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
              <h4>定制咨询</h4>
              <p>专业艺术顾问在线服务</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== PRODUCTS ===== -->
    <section class="wx-products">
      <div class="wx-container">
        <div class="wx-section-header">
          <h2 class="wx-section-title">馆藏作品</h2>
          <NuxtLink to="/search" class="wx-section-link">查看全部 →</NuxtLink>
        </div>

        <div v-if="loading" class="wx-loading">
          <div class="wx-loading-spinner" />
          正在加载馆藏作品…
        </div>
        <div v-else-if="products.length === 0" class="wx-empty">暂无作品，请稍后刷新</div>
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

    <!-- ===== QUALITY SECTION ===== -->
    <section class="wx-quality">
      <div class="wx-container">
        <div class="wx-section-header wx-section-header--center">
          <h2 class="wx-section-title">品质承诺</h2>
        </div>
        <div class="wx-quality-grid">
          <div v-for="q in qualityPoints" :key="q.num" class="wx-quality-item">
            <span class="wx-quality-num">{{ q.num }}</span>
            <h3>{{ q.title }}</h3>
            <p>{{ q.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== QUOTE ===== -->
    <section class="wx-quote">
      <div class="wx-container">
        <blockquote class="wx-quote-text">
          "艺术的目的不是再现可见，而是使不可见成为可见。"
        </blockquote>
        <cite class="wx-quote-cite">— Paul Klee</cite>
      </div>
    </section>

    <!-- ===== CTA ===== -->
    <section class="wx-cta-section">
      <div class="wx-container">
        <h2>寻找您的心仪之作？</h2>
        <p>告诉我们您想要的画作，我们为您定制博物馆级复制品。</p>
        <NuxtLink to="/contact" class="wx-hero-cta">提交定制需求 →</NuxtLink>
      </div>
    </section>

    <!-- ===== NEWSLETTER ===== -->
    <section class="wx-newsletter">
      <div class="wx-container">
        <h2 class="wx-newsletter-title">订阅艺术资讯</h2>
        <p class="wx-newsletter-desc">第一时间获取新作品上架、艺术展览和独家优惠</p>
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
              <span>🎨</span>
              <span>名画艺廊</span>
            </div>
            <p class="wx-footer-brand-desc">专注于世界经典名画高品质复制品、博物馆级艺术版画与大师作品定制复刻服务。</p>
          </div>
          <div class="wx-footer-col">
            <h4>浏览</h4>
            <ul>
              <li><NuxtLink to="/search">全部作品</NuxtLink></li>
              <li><NuxtLink to="/about">关于艺廊</NuxtLink></li>
              <li><NuxtLink to="/contact">定制咨询</NuxtLink></li>
            </ul>
          </div>
          <div class="wx-footer-col">
            <h4>支持</h4>
            <ul>
              <li><NuxtLink to="/contact">联系我们</NuxtLink></li>
              <li><NuxtLink to="/login">账户登录</NuxtLink></li>
            </ul>
          </div>
          <div class="wx-footer-col">
            <h4>服务</h4>
            <ul>
              <li><NuxtLink to="/about">品牌故事</NuxtLink></li>
              <li><NuxtLink to="/about">艺术家入驻</NuxtLink></li>
            </ul>
          </div>
        </div>
        <div class="wx-footer-bottom">
          <span>© 2026 名画艺廊. All rights reserved.</span>
          <div class="wx-footer-social">
            <a href="#" aria-label="微信">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18z"/><path d="M23.997 14.637c0-3.2-3.095-5.794-6.913-5.794-3.818 0-6.913 2.594-6.913 5.794 0 3.2 3.095 5.794 6.913 5.794.713 0 1.403-.1 2.052-.289a.725.725 0 01.59.076l1.584.926a.264.264 0 00.14.045.244.244 0 00.241-.244c0-.06-.023-.118-.039-.177l-.325-1.228a.49.49 0 01.177-.552c1.515-1.115 2.492-2.783 2.492-4.346zm-9.043-1.047c-.535 0-.969-.44-.969-.983s.434-.983.969-.983c.535 0 .969.44.969.983s-.434.983-.969.983zm4.258 0c-.535 0-.969-.44-.969-.983s.434-.983.969-.983c.535 0 .969.44.969.983s-.434.983-.969.983z"/></svg>
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
  title: '名画艺廊 · 世界名画复制品与艺术版画定制平台',
  ogTitle: '名画艺廊 · 世界名画复制品与艺术版画定制',
  description: '名画艺廊专注于世界经典名画高品质复制品、博物馆级艺术版画与大师作品定制复刻服务。',
  ogDescription: '博物馆级品质，将世界经典名画带入您的生活空间。',
});

useHead({
  htmlAttrs: { lang: 'zh-CN' },
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎨</text></svg>',
    },
  ],
});

const { fetchPublishedProducts, getPublishedProductImage, getPublishedProductPath } = usePublishedProducts();

const loading = ref(true);
const products = ref<any[]>([]);
const isScrolled = ref(false);
const mobileOpen = ref(false);

const artistNames = [
  'Monet', 'Van Gogh', 'Picasso', 'Dalí', 'Klimt',
  'Vermeer', 'Rembrandt', 'Renoir', 'Cézanne', 'Matisse',
];

const categories = [
  { icon: '🌊', name: '印象派', bg: 'linear-gradient(135deg, #e8d5f5, #f0e6ff)' },
  { icon: '🌻', name: '后印象派', bg: 'linear-gradient(135deg, #fff3e0, #ffe0b2)' },
  { icon: '🎭', name: '立体主义', bg: 'linear-gradient(135deg, #e3f2fd, #bbdefb)' },
  { icon: '⏰', name: '超现实主义', bg: 'linear-gradient(135deg, #fce4ec, #f8bbd0)' },
  { icon: '🏛️', name: '古典主义', bg: 'linear-gradient(135deg, #f5f0e1, #e8e0d0)' },
  { icon: '🎨', name: '现代艺术', bg: 'linear-gradient(135deg, #e0f7fa, #b2ebf2)' },
];

const qualityPoints = [
  { num: '01', title: '博物馆级复刻', desc: '采用 Giclée 微喷技术，色彩还原度达 99%，历久弥新。' },
  { num: '02', title: '艺术纸与画布', desc: '精选 300gsm 棉浆艺术纸或亚麻画布，质感媲美原作。' },
  { num: '03', title: '专业装裱', desc: '提供实木画框、无酸卡纸装裱，保护画作同时提升格调。' },
  { num: '04', title: '全球包邮', desc: '专业防震包装，全球主要地区免费配送。' },
];

// Deterministic rating count based on product ID
function getRatingCount(id: string | number) {
  const hash = String(id).split('').reduce((acc: number, c: string) => acc + c.charCodeAt(0), 0);
  return (hash % 80) + 10;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleScroll() {
  isScrolled.value = window.scrollY > 50;
}

onMounted(async () => {
  try {
    const res = await fetchPublishedProducts({ pageSize: 12, random: true });
    products.value = res || [];
  } catch (e) {
    console.error('Failed to fetch painting products:', e);
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
/* Site-specific overrides */
.woonuxt-theme[data-site="painting"] {
  --wx-accent: #C9A96E;
  --wx-accent-light: #dcc499;
  --wx-accent-dark: #a8893e;
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

/* Dark hero for painting */
.woonuxt-theme[data-site="painting"] .wx-hero--dark {
  background: #0a0a0a;
}

.woonuxt-theme[data-site="painting"] .wx-hero--dark .wx-hero-overlay {
  background: radial-gradient(ellipse at 30% 50%, rgba(201, 169, 110, 0.15) 0%, transparent 60%),
              radial-gradient(ellipse at 70% 30%, rgba(201, 169, 110, 0.1) 0%, transparent 50%);
}

.woonuxt-theme[data-site="painting"] .wx-hero--dark .wx-hero-eyebrow {
  color: var(--wx-accent);
}

.woonuxt-theme[data-site="painting"] .wx-hero--dark .wx-hero-title {
  color: #ffffff;
}

.woonuxt-theme[data-site="painting"] .wx-hero--dark .wx-hero-desc {
  color: rgba(255, 255, 255, 0.7);
}

/* Artist strip */
.wx-artist-strip {
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--wx-border);
  overflow: hidden;
}

.wx-artist-strip-inner {
  display: flex;
  gap: 2rem;
  white-space: nowrap;
}

.wx-artist-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--wx-text-muted);
  letter-spacing: 0.05em;
}

/* Quality section */
.wx-quality {
  padding: var(--wx-section-py) 0;
  background: var(--wx-surface);
}

.wx-section-header--center {
  text-align: center;
  margin-bottom: 2rem;
}

.wx-quality-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.wx-quality-item {
  text-align: center;
}

.wx-quality-num {
  display: block;
  font-size: 2rem;
  font-weight: 800;
  color: var(--wx-accent);
  margin-bottom: 0.5rem;
}

.wx-quality-item h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.wx-quality-item p {
  font-size: 0.8125rem;
  color: var(--wx-text-secondary);
  line-height: 1.5;
}

/* Quote section */
.wx-quote {
  padding: clamp(3rem, 6vw, 5rem) 0;
  text-align: center;
}

.wx-quote-text {
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  font-style: italic;
  color: var(--wx-text);
  max-width: 700px;
  margin: 0 auto 1rem;
  line-height: 1.6;
  border: none;
  padding: 0;
}

.wx-quote-cite {
  font-size: 0.9375rem;
  color: var(--wx-accent);
  font-style: normal;
}

/* CTA section */
.wx-cta-section {
  padding: var(--wx-section-py) 0;
  background: #0a0a0a;
  text-align: center;
  color: #ffffff;
}

.wx-cta-section h2 {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.wx-cta-section p {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.5rem;
}

/* Responsive overrides for painting-specific sections */
@media (max-width: 1024px) {
  .wx-quality-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .wx-quality-grid {
    grid-template-columns: 1fr;
  }

  .wx-artist-strip-inner {
    gap: 1.5rem;
  }
}
</style>
