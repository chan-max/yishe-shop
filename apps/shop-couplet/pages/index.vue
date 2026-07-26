<template>
  <div class="couplet-theme-wrapper">
    <!-- Top Crimson Header Bar -->
    <header class="couplet-header">
      <div class="couplet-header-inner">
        <NuxtLink to="/" class="couplet-brand">
          <div class="couplet-logo-icon">🏮</div>
          <span class="couplet-brand-text">衣设 · 春联定制工坊</span>
        </NuxtLink>
        <div class="couplet-header-actions">
          <NuxtLink to="/favorites" class="couplet-nav-link">
            <span>我的收藏</span>
          </NuxtLink>
          <NuxtLink to="/search" class="couplet-nav-link primary">
            <span>搜对联</span>
          </NuxtLink>
        </div>
      </div>
      <!-- Curved Wave Transition -->
      <div class="couplet-wave-bottom">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0C360 45 1080 45 1440 0V60H0V0Z" fill="#f8f2e7" />
        </svg>
      </div>
    </header>

    <!-- Main Parchment Content Body -->
    <main class="couplet-body">
      <!-- Auspicious Clouds Floating Background Decors -->
      <div class="cloud-decor cloud-left-top">☁️</div>
      <div class="cloud-decor cloud-right-middle">☁️</div>

      <div class="couplet-container">
        <!-- Hero Featured Showcase Banner -->
        <section class="couplet-hero-section">
          <div class="couplet-hero-card">
            <div class="hero-image-box">
              <div class="couplet-mockup-display">
                <div class="couplet-scroll-left">
                  <div class="scroll-heading">上联</div>
                  <div class="scroll-text">迎喜迎春迎富贵</div>
                </div>
                <div class="couplet-scroll-center">
                  <div class="scroll-heading">横批</div>
                  <div class="scroll-text">吉星高照</div>
                </div>
                <div class="couplet-scroll-right">
                  <div class="scroll-heading">下联</div>
                  <div class="scroll-text">接财接福接平安</div>
                </div>
              </div>
            </div>
            <div class="hero-title-box">
              <div class="hero-gold-sub">HAPPY CHINESE NEW YEAR</div>
              <h1 class="hero-gold-title">祥龙迎春 · 楹联大吉</h1>
              <div class="hero-gold-desc">传承千年书香气韵 尊享专属名家手写与金字春联定制</div>
            </div>
          </div>
          <p class="couplet-intro-text">
            衣设春联工坊专注于传世名家手写对联、烫金企业门联与创意新春楹联定制，采用特级万年红宣纸与耐候金墨，让每一副春联都承载吉祥安康。
          </p>
        </section>

        <!-- Product Grid Section: New Arrival / 新品楹联 -->
        <section class="couplet-products-section">
          <div class="section-header-title">
            <h2>新品上新 / New Arrival</h2>
            <div class="title-sub-line">传承金石气韵 · 严选精品楹联</div>
          </div>

          <div v-if="loading" class="couplet-loading-state">
            <div class="loading-spinner"></div>
            <span>正在加载春联精选作品…</span>
          </div>

          <div v-else-if="products.length === 0" class="couplet-empty-state">
            <p>暂无春联作品，请稍后刷新尝试。</p>
          </div>

          <div v-else class="couplet-grid">
            <article
              v-for="item in products"
              :key="item.id"
              class="couplet-card"
              @click="navigateToProduct(item)"
            >
              <div class="card-image-wrapper">
                <img
                  v-if="getProductImage(item)"
                  :src="getProductImage(item)"
                  :alt="item.name"
                  class="card-img"
                />
                <div v-else class="card-img-placeholder">
                  <span class="placeholder-icon">🧧</span>
                  <span class="placeholder-text">春联意境图上线中</span>
                </div>
                <div class="card-gold-border"></div>
              </div>
              <div class="card-info-badge">
                <div class="badge-row">
                  <h3 class="card-title">{{ item.name }}</h3>
                  <span class="card-price">¥ {{ item.price || '88.0' }}</span>
                </div>
                <p class="card-desc">{{ item.description || '经典手写万年红烫金春联，寓意岁岁平安、万事顺遂。' }}</p>
              </div>
            </article>
          </div>

          <div class="couplet-action-center">
            <button type="button" class="btn-view-all" @click="openAllProducts">
              查看全部春联作品 (View All)
            </button>
          </div>
        </section>

        <!-- Traditional Chinese Lattice Banner: Promotion Coupon -->
        <section class="couplet-promo-banner">
          <div class="lattice-border">
            <div class="promo-col">
              <span class="promo-label">企业与家庭量大定制专享</span>
              <div class="promo-highlight">70% <span>Discount</span></div>
              <div class="promo-sub">满 3 副即享专属立减福利</div>
            </div>
            <div class="promo-col code-col">
              <span class="promo-label">专属优惠兑换码</span>
              <div class="promo-code">COUPLET2026</div>
              <div class="promo-sub">结账时输入立享全场优惠</div>
            </div>
          </div>
        </section>

        <!-- Customer Testimonials Section -->
        <section class="couplet-reviews-section">
          <div class="section-header-title">
            <h2>客户口碑与实拍 / Customer Feedback</h2>
            <div class="title-sub-line">千家万户的共同选择 · 见证墨香年味</div>
          </div>

          <div class="reviews-grid">
            <div class="review-card">
              <div class="quote-mark">“</div>
              <p class="review-content">
                纸质非常厚重，烫金字在阳光下熠熠生辉！贴在公司大门上气场十足，客户看了都夸有文化底蕴。
              </p>
              <div class="reviewer-info">
                <div class="reviewer-avatar">👨‍💼</div>
                <div>
                  <div class="reviewer-name">张先生</div>
                  <div class="reviewer-title">企业创始人</div>
                </div>
              </div>
            </div>

            <div class="review-card">
              <div class="quote-mark">“</div>
              <p class="review-content">
                名家手写体韵味十足，万年红宣纸连续几年都不褪色。定制的私人名联放在新居特别喜庆！
              </p>
              <div class="reviewer-info">
                <div class="reviewer-avatar">👩‍🎨</div>
                <div>
                  <div class="reviewer-name">林女士</div>
                  <div class="reviewer-title">独立设计师</div>
                </div>
              </div>
            </div>

            <div class="review-card">
              <div class="quote-mark">“</div>
              <p class="review-content">
                包装非常精美完好，送给长辈和客户都非常有档次，客服小姐姐服务非常周到！
              </p>
              <div class="reviewer-info">
                <div class="reviewer-avatar">👨‍👩‍👧</div>
                <div>
                  <div class="reviewer-name">陈先生</div>
                  <div class="reviewer-title">资深家居收藏家</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- Crimson Footer Section -->
    <footer class="couplet-footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <span class="footer-logo">🏮 衣设 · 春联定制工坊</span>
          <p class="footer-tagline">专注于传统楹联文化传承与现代高品质对联设计定制</p>
        </div>
        <div class="footer-copyright">
          © 2026 衣设春联工坊 (Shop Couplet). All rights reserved.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

definePageMeta({
  layout: 'default'
});

const { fetchPublishedProducts, getPublishedProductImage } = usePublishedProducts();

const loading = ref(true);
const products = ref<any[]>([]);

const getProductImage = (item: any) => {
  if (item.images && item.images.length > 0) return item.images[0];
  return getPublishedProductImage(item);
};

const navigateToProduct = (item: any) => {
  const router = useRouter();
  router.push(`/product/${item.id}`);
};

const openAllProducts = () => {
  const router = useRouter();
  router.push('/search');
};

onMounted(async () => {
  try {
    loading.value = true;
    const res = await fetchPublishedProducts({ page: 1, limit: 8 });
    if (res && Array.isArray(res)) {
      products.value = res;
    } else if (res && Array.isArray(res.items)) {
      products.value = res.items;
    }
  } catch (e) {
    console.error('Failed to fetch couplet products:', e);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
/* Traditional Crimson & Gold Color Palette Variables */
.couplet-theme-wrapper {
  --cp-crimson: #6b0512;
  --cp-crimson-dark: #4a030b;
  --cp-gold: #d4a337;
  --cp-gold-light: #f5d061;
  --cp-bg: #f8f2e7;
  --cp-card-bg: #ffffff;
  --cp-text: #2c1810;
  --cp-text-muted: #7a6358;

  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  background-color: var(--cp-bg);
  color: var(--cp-text);
  min-height: 100vh;
}

/* Header */
.couplet-header {
  position: relative;
  background-color: var(--cp-crimson);
  color: #ffffff;
  padding-top: 1.25rem;
  padding-bottom: 2.5rem;
}

.couplet-header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.couplet-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: #ffffff;
}

.couplet-logo-icon {
  font-size: 1.6rem;
}

.couplet-brand-text {
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: var(--cp-gold-light);
}

.couplet-header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.couplet-nav-link {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 600;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  transition: all 0.2s ease;
}

.couplet-nav-link.primary {
  background: linear-gradient(135deg, var(--cp-gold-light), var(--cp-gold));
  color: var(--cp-crimson-dark);
  font-weight: 800;
}

.couplet-wave-bottom {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

/* Main Body & Container */
.couplet-body {
  position: relative;
  padding: 2rem 1.5rem 4rem;
}

.cloud-decor {
  position: absolute;
  font-size: 2.5rem;
  opacity: 0.25;
  pointer-events: none;
}

.cloud-left-top {
  top: 4rem;
  left: 2rem;
}

.cloud-right-middle {
  top: 30rem;
  right: 2rem;
}

.couplet-container {
  max-width: 1100px;
  margin: 0 auto;
}

/* Hero Showcase Card */
.couplet-hero-section {
  text-align: center;
  margin-bottom: 3.5rem;
}

.couplet-hero-card {
  background: var(--cp-card-bg);
  border: 2px solid var(--cp-gold);
  border-radius: 12px;
  padding: 2.5rem 2rem;
  box-shadow: 0 10px 30px rgba(107, 5, 18, 0.08);
}

.hero-image-box {
  background: var(--cp-crimson);
  border-radius: 8px;
  padding: 2.5rem 1rem;
  margin-bottom: 2rem;
}

.couplet-mockup-display {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  @media (max-width: 640px) {
    gap: 0.75rem;
  }
}

.couplet-scroll-left,
.couplet-scroll-right {
  background: #b81424;
  border: 2px solid var(--cp-gold-light);
  color: var(--cp-gold-light);
  padding: 1rem 0.6rem;
  border-radius: 4px;
  writing-mode: vertical-rl;
  font-family: "KaiTi", "STKaiti", serif;
  letter-spacing: 0.3em;
  font-size: 1.2rem;
  font-weight: 800;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.couplet-scroll-center {
  background: #b81424;
  border: 2px solid var(--cp-gold-light);
  color: var(--cp-gold-light);
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  font-family: "KaiTi", "STKaiti", serif;
  letter-spacing: 0.3em;
  font-size: 1.1rem;
  font-weight: 800;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.scroll-heading {
  font-size: 0.65rem;
  opacity: 0.75;
  letter-spacing: 0.1em;
  margin-bottom: 0.25rem;
}

.hero-gold-sub {
  color: var(--cp-gold);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.25em;
  text-transform: uppercase;
}

.hero-gold-title {
  font-size: 2.25rem;
  font-weight: 900;
  color: var(--cp-crimson);
  margin: 0.4rem 0 0.6rem;
  letter-spacing: 0.05em;
}

.hero-gold-desc {
  color: var(--cp-text-muted);
  font-size: 0.95rem;
  font-weight: 600;
}

.couplet-intro-text {
  max-width: 800px;
  margin: 1.5rem auto 0;
  color: var(--cp-crimson);
  font-weight: 700;
  font-size: 0.92rem;
  line-height: 1.7;
}

/* Products Section */
.couplet-products-section {
  margin-bottom: 4rem;
}

.section-header-title {
  text-align: center;
  margin-bottom: 2rem;
}

.section-header-title h2 {
  font-size: 1.6rem;
  font-weight: 900;
  color: var(--cp-crimson);
  margin: 0;
}

.title-sub-line {
  color: var(--cp-gold);
  font-size: 0.85rem;
  font-weight: 700;
  margin-top: 0.3rem;
}

.couplet-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.75rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.couplet-card {
  background: var(--cp-card-bg);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
  transition: all 0.25s ease;
  display: flex;
  flex-direction: column;
}

.couplet-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 25px rgba(107, 5, 18, 0.12);
}

.card-image-wrapper {
  position: relative;
  width: 100%;
  height: 280px;
  background: #fdfaf5;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 640px) {
    height: 200px;
  }
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-img-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--cp-crimson);
}

.placeholder-icon {
  font-size: 2.5rem;
}

.placeholder-text {
  font-size: 0.82rem;
  font-weight: 700;
  opacity: 0.8;
}

.card-gold-border {
  position: absolute;
  inset: 8px;
  border: 1px solid rgba(212, 163, 55, 0.35);
  pointer-events: none;
  border-radius: 6px;
}

.card-info-badge {
  background: var(--cp-crimson);
  color: #ffffff;
  padding: 1.1rem 1.25rem;
  flex: 1;
}

.badge-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
}

.card-title {
  font-size: 1.05rem;
  font-weight: 800;
  margin: 0;
  color: #ffffff;
}

.card-price {
  color: var(--cp-gold-light);
  font-size: 1.15rem;
  font-weight: 900;
}

.card-desc {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.82);
  margin: 0;
  line-height: 1.5;
}

.couplet-action-center {
  text-align: center;
  margin-top: 2.5rem;
}

.btn-view-all {
  background: var(--cp-crimson);
  color: var(--cp-gold-light);
  border: 1px solid var(--cp-gold);
  padding: 0.75rem 2rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--cp-crimson-dark);
    transform: scale(1.04);
  }
}

/* Traditional Lattice Promotion Banner */
.couplet-promo-banner {
  margin-bottom: 4rem;
}

.lattice-border {
  background: var(--cp-crimson);
  color: #ffffff;
  border: 4px double var(--cp-gold);
  border-radius: 8px;
  padding: 2.25rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem;
  align-items: center;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
}

.promo-label {
  font-size: 0.85rem;
  color: var(--cp-gold-light);
  font-weight: 700;
  display: block;
}

.promo-highlight {
  font-size: 2.8rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1.1;
  margin: 0.2rem 0;

  span {
    font-size: 1.1rem;
    font-weight: 700;
  }
}

.promo-sub {
  font-size: 0.82rem;
  opacity: 0.85;
}

.promo-code {
  font-size: 1.8rem;
  font-weight: 900;
  color: var(--cp-gold-light);
  letter-spacing: 0.1em;
  margin: 0.2rem 0;
}

/* Reviews Section */
.couplet-reviews-section {
  margin-bottom: 2rem;
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
}

.review-card {
  background: var(--cp-card-bg);
  border: 1px solid rgba(212, 163, 55, 0.25);
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
}

.quote-mark {
  font-size: 2.2rem;
  color: var(--cp-gold);
  line-height: 1;
  font-weight: 900;
}

.review-content {
  font-size: 0.88rem;
  color: var(--cp-text);
  line-height: 1.6;
  margin: 0.5rem 0 1.25rem;
}

.reviewer-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.reviewer-avatar {
  width: 2.5rem;
  height: 2.5rem;
  background: #fdf5e8;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.reviewer-name {
  font-size: 0.88rem;
  font-weight: 800;
  color: var(--cp-crimson);
}

.reviewer-title {
  font-size: 0.75rem;
  color: var(--cp-text-muted);
}

/* Footer */
.couplet-footer {
  background: var(--cp-crimson-dark);
  color: rgba(255, 255, 255, 0.85);
  padding: 2.5rem 1.5rem;
  text-align: center;
}

.footer-inner {
  max-width: 1100px;
  margin: 0 auto;
}

.footer-logo {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--cp-gold-light);
  display: block;
  margin-bottom: 0.5rem;
}

.footer-tagline {
  font-size: 0.82rem;
  margin: 0 0 1.5rem;
  opacity: 0.75;
}

.footer-copyright {
  font-size: 0.78rem;
  opacity: 0.55;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1.25rem;
}

.couplet-loading-state,
.couplet-empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--cp-crimson);
  font-weight: 700;
}
</style>
