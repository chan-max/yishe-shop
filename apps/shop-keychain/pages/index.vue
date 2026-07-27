<template>
  <div class="woonuxt-theme" data-site="keychain">
    <!-- ===== HEADER ===== -->
    <header class="wx-header" :class="{ 'is-scrolled': isScrolled }">
      <div class="wx-container wx-header-inner">
        <NuxtLink to="/" class="wx-logo">
          <span>🔑</span>
          <span>KEYCHAIN POP</span>
        </NuxtLink>

        <nav class="wx-nav">
          <NuxtLink to="/" class="wx-nav-link active">首页</NuxtLink>
          <NuxtLink to="/search" class="wx-nav-link">全部配件</NuxtLink>
          <NuxtLink to="/search?type=亚克力" class="wx-nav-link">亚克力</NuxtLink>
          <NuxtLink to="/search?type=金属" class="wx-nav-link">金属</NuxtLink>
          <NuxtLink to="/about" class="wx-nav-link">关于我们</NuxtLink>
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
          <NuxtLink to="/search" class="wx-mobile-nav-link" @click="mobileMenuOpen = false">全部配件</NuxtLink>
          <NuxtLink to="/search?type=亚克力" class="wx-mobile-nav-link" @click="mobileMenuOpen = false">💎 亚克力</NuxtLink>
          <NuxtLink to="/search?type=金属" class="wx-mobile-nav-link" @click="mobileMenuOpen = false">⚙️ 金属</NuxtLink>
          <NuxtLink to="/search?type=硅胶" class="wx-mobile-nav-link" @click="mobileMenuOpen = false">🧸 硅胶</NuxtLink>
          <NuxtLink to="/search?type=木质" class="wx-mobile-nav-link" @click="mobileMenuOpen = false">🪵 木质</NuxtLink>
          <NuxtLink to="/about" class="wx-mobile-nav-link" @click="mobileMenuOpen = false">关于我们</NuxtLink>
          <NuxtLink to="/contact" class="wx-mobile-nav-link" @click="mobileMenuOpen = false">联系我们</NuxtLink>
          <NuxtLink to="/login" class="wx-mobile-nav-link" @click="mobileMenuOpen = false">🔑 登录 / 注册</NuxtLink>
        </nav>
      </div>
    </div>

    <!-- ===== HERO ===== -->
    <section class="wx-hero">
      <div class="wx-hero-overlay" />
      <div class="wx-hero-content">
        <span class="wx-hero-eyebrow">✨ KEYCHAIN POP · 创意配件工坊</span>
        <h1 class="wx-hero-title">把个性<br/>挂在钥匙上</h1>
        <p class="wx-hero-desc">从可爱卡通到极简几何，从金属质感到底层亚克力，每一条钥匙链都是你风格的延伸。探索数百款创意设计，或定制专属于你的那一款。</p>
        <NuxtLink to="/search" class="wx-hero-cta">探索全部配件 →</NuxtLink>
      </div>
    </section>

    <!-- ===== BRAND LOGOS BAR ===== -->
    <section class="wx-brands">
      <div class="wx-container">
        <div class="wx-brands-grid">
          <svg class="wx-brand-logo" viewBox="0 0 120 30" fill="currentColor"><text x="10" y="22" font-size="16" font-weight="700" font-family="sans-serif">BRAND</text></svg>
          <svg class="wx-brand-logo" viewBox="0 0 120 30" fill="currentColor"><text x="10" y="22" font-size="16" font-weight="700" font-family="sans-serif">STYLE</text></svg>
          <svg class="wx-brand-logo" viewBox="0 0 120 30" fill="currentColor"><text x="10" y="22" font-size="16" font-weight="700" font-family="sans-serif">CRAFT</text></svg>
          <svg class="wx-brand-logo" viewBox="0 0 120 30" fill="currentColor"><text x="10" y="22" font-size="16" font-weight="700" font-family="sans-serif">DESIGN</text></svg>
          <svg class="wx-brand-logo" viewBox="0 0 120 30" fill="currentColor"><text x="10" y="22" font-size="16" font-weight="700" font-family="sans-serif">MAKER</text></svg>
          <svg class="wx-brand-logo" viewBox="0 0 120 30" fill="currentColor"><text x="10" y="22" font-size="16" font-weight="700" font-family="sans-serif">STUDIO</text></svg>
        </div>
      </div>
    </section>

    <!-- ===== CATEGORIES ===== -->
    <section class="wx-categories">
      <div class="wx-container">
        <div class="wx-section-header">
          <h2 class="wx-section-title">材质分类</h2>
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
              <p>满 ¥99 全国包邮</p>
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
          <h2 class="wx-section-title">精选配件</h2>
          <NuxtLink to="/search" class="wx-section-link">查看全部 →</NuxtLink>
        </div>

        <div v-if="loading" class="wx-loading">
          <div class="wx-loading-spinner" />
          正在加载精选配件…
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
        <h2 class="wx-newsletter-title">订阅获取独家优惠</h2>
        <p class="wx-newsletter-desc">第一时间获取新品上市、限时折扣和创意灵感</p>
        <form class="wx-newsletter-form" @submit.prevent>
          <input type="email" class="wx-newsletter-input" placeholder="输入你的邮箱地址" />
          <button type="submit" class="wx-newsletter-btn">立即订阅</button>
        </form>
      </div>
    </section>

    <!-- ===== FOOTER ===== -->
    <footer class="wx-footer">
      <div class="wx-container">
        <div class="wx-footer-grid">
          <div class="wx-footer-brand">
            <div class="wx-footer-brand-logo">
              <span>🔑</span>
              <span>KEYCHAIN POP</span>
            </div>
            <p class="wx-footer-brand-desc">创意钥匙链与个性配件定制。每一件都承载着你的独特风格。</p>
          </div>
          <div class="wx-footer-col">
            <h4>快速链接</h4>
            <ul>
              <li><NuxtLink to="/">首页</NuxtLink></li>
              <li><NuxtLink to="/search">全部商品</NuxtLink></li>
              <li><NuxtLink to="/about">关于我们</NuxtLink></li>
              <li><NuxtLink to="/contact">联系我们</NuxtLink></li>
            </ul>
          </div>
          <div class="wx-footer-col">
            <h4>客户服务</h4>
            <ul>
              <li><NuxtLink to="/faq">常见问题</NuxtLink></li>
              <li><NuxtLink to="/shipping">配送说明</NuxtLink></li>
              <li><NuxtLink to="/returns">退换政策</NuxtLink></li>
              <li><NuxtLink to="/contact">在线客服</NuxtLink></li>
            </ul>
          </div>
          <div class="wx-footer-col">
            <h4>联系我们</h4>
            <ul>
              <li>📧 hi@keychain.1s.design</li>
              <li>📞 400-KEY-CHAIN</li>
              <li>📍 中国·上海</li>
            </ul>
          </div>
        </div>
        <div class="wx-footer-bottom">
          <span>© 2026 KEYCHAIN POP. All rights reserved.</span>
          <div class="wx-footer-social">
            <a href="#" aria-label="微信">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18z"/><path d="M23.925 14.725c0-3.29-3.166-5.963-7.07-5.963-3.949 0-7.07 2.672-7.07 5.963 0 3.29 3.121 5.963 7.07 5.963.779 0 1.537-.112 2.25-.326a.72.72 0 01.59.078l1.518.89a.264.264 0 00.137.044.234.234 0 00.235-.237c0-.058-.023-.115-.039-.17l-.31-1.184a.477.477 0 01.169-.528c1.506-1.113 2.513-2.783 2.513-4.534zm-9.503-1.067c-.515 0-.933-.424-.933-.947s.418-.947.933-.947c.515 0 .933.424.933.947s-.418.947-.933.947zm5.146 0c-.515 0-.933-.424-.933-.947s.418-.947.933-.947c.515 0 .933.424.933.947s-.418.947-.933.947z"/></svg>
            </a>
            <a href="#" aria-label="微博">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.739 5.443z"/></svg>
            </a>
            <a href="#" aria-label="小红书">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 14h-9a.5.5 0 01-.5-.5v-7a.5.5 0 01.5-.5h9a.5.5 0 01.5.5v7a.5.5 0 01-.5.5z"/></svg>
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

<script setup>
import '~/apps/_shared/woonuxt-theme.css';

definePageMeta({ layout: false });

useSeoMeta({
  title: '创意钥匙链工坊 — KEYCHAIN POP | 个性定制钥匙链',
  description: '探索数百款创意钥匙链设计，从可爱卡通到极简几何，从金属质感到底层亚克力。满 ¥99 包邮，每周上新，定制 ¥1 起。',
  ogTitle: 'KEYCHAIN POP — 创意钥匙链与个性配件',
  ogDescription: '创意钥匙链与个性配件定制平台。精选亚克力、金属、硅胶、木质等材质，打造专属于你的钥匙链。',
});

useHead({
  htmlAttrs: { lang: 'zh-CN' },
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔑</text></svg>",
    },
  ],
});

const isScrolled = ref(false);
const mobileMenuOpen = ref(false);
const loading = ref(true);
const products = ref([]);

const categories = [
  { name: '亚克力', icon: '💎', bg: 'linear-gradient(135deg, #e8d5f5, #f0e6ff)' },
  { name: '金属', icon: '⚙️', bg: 'linear-gradient(135deg, #d5e8f5, #e6f0ff)' },
  { name: '硅胶', icon: '🧸', bg: 'linear-gradient(135deg, #f5d5d5, #ffe6e6)' },
  { name: '木质', icon: '🪵', bg: 'linear-gradient(135deg, #f5edd5, #fff5e6)' },
  { name: '皮革', icon: '👜', bg: 'linear-gradient(135deg, #f5e6d5, #fff0e6)' },
  { name: '树脂', icon: '✨', bg: 'linear-gradient(135deg, #d5f5e8, #e6fff0)' },
];

const { fetchPublishedProducts, getPublishedProductImage, getPublishedProductPath } = usePublishedProducts();

// Deterministic rating count based on product ID
function getRatingCount(id) {
  const hash = String(id).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return (hash % 80) + 10;
}

// Countdown timer
const cd = ref({ days: '00', hours: '00', minutes: '00', seconds: '00' });
let timer = null;
function updateCountdown() {
  const now = new Date();
  const end = new Date(now);
  end.setDate(end.getDate() + 3);
  end.setHours(23, 59, 59, 0);
  const diff = end - now;
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
  } catch (e) { console.error(e); } finally { loading.value = false; }
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* Site-specific overrides */
.woonuxt-theme[data-site="keychain"] {
  --wx-accent: #6c5ce7;
  --wx-accent-light: #a29bfe;
  --wx-accent-dark: #4834d4;
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

/* Hero background gradient for keychain */
.woonuxt-theme[data-site="keychain"] .wx-hero {
  background: linear-gradient(135deg, #f8f7ff 0%, #fff0f6 50%, #f0fffe 100%);
}

.woonuxt-theme[data-site="keychain"] .wx-hero-overlay {
  background: linear-gradient(to right, rgba(108, 92, 231, 0.4) 0%, rgba(108, 92, 231, 0.1) 60%, transparent 100%);
}
</style>
