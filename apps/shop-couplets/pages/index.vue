<template>
  <div class="couplet-theme-wrapper">
    <!-- Top Imperial Crimson & Gold Header Bar -->
    <header class="couplet-header">
      <div class="couplet-header-inner">
        <NuxtLink to="/" class="couplet-brand">
          <div class="couplet-logo-icon">🏮</div>
          <div class="brand-text-group">
            <span class="couplet-brand-text">衣设 · 春联定制工坊</span>
            <small class="couplet-brand-sub">YISHE COUPLET WORKSHOP</small>
          </div>
        </NuxtLink>

        <div class="couplet-header-actions">
          <NuxtLink to="/favorites" class="couplet-nav-link">
            <span>我的收藏</span>
          </NuxtLink>

          <NuxtLink to="/search" class="couplet-nav-link gold-btn">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span>搜对联 / 楹联库</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Wave Bottom Separator -->
      <div class="couplet-wave-bottom">
        <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0C480 36 960 36 1440 0V48H0V0Z" fill="#fcf8f2" />
        </svg>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="couplet-body">
      <!-- Ambient Golden Cloud Floating Background Elements -->
      <div class="cloud-decor cloud-1">☁️</div>
      <div class="cloud-decor cloud-2">☁️</div>

      <div class="couplet-container">

        <!-- 1. Hero Showcase Section (Directly matching 02e0884e-908c-4e42-a578-085967ae9701.png layout) -->
        <section class="couplet-hero-section">
          <div class="couplet-hero-card">
            <!-- Corner Gold Ornaments -->
            <div class="corner-ornament top-left"></div>
            <div class="corner-ornament top-right"></div>
            <div class="corner-ornament bottom-left"></div>
            <div class="corner-ornament bottom-right"></div>

            <div class="hero-display-box">
              <div class="couplet-scroll-stage">
                <!-- Left Scroll (上联) -->
                <div class="scroll-unit left-scroll">
                  <span class="scroll-label">上联</span>
                  <span class="scroll-calligraphy">{{ customLeft || '迎喜迎春迎富贵' }}</span>
                </div>

                <!-- Center Scroll (横批) -->
                <div class="scroll-unit center-scroll">
                  <span class="scroll-label">横批</span>
                  <span class="scroll-calligraphy-center">{{ customCenter || '吉星高照' }}</span>
                </div>

                <!-- Right Scroll (下联) -->
                <div class="scroll-unit right-scroll">
                  <span class="scroll-label">下联</span>
                  <span class="scroll-calligraphy">{{ customRight || '接财接福接平安' }}</span>
                </div>
              </div>
            </div>

            <!-- Metallic Gold Title Banner -->
            <div class="hero-title-box">
              <div class="hero-gold-sub">HAPPY CHINESE NEW YEAR</div>
              <h1 class="hero-gold-title">祥龙迎春 · 楹联大吉</h1>
              <div class="hero-gold-desc">传承千年书香气韵 尊享专属名家手写与烫金春联定制</div>
            </div>
          </div>

          <p class="couplet-intro-text">
            衣设春联工坊专注于传世名家手写对联、烫金企业门联与创意新春楹联定制，采用特级万年红宣纸与耐候金墨，让每一副春联都承载吉祥安康。
          </p>
        </section>

        <!-- 2. Live Interactive Couplet Generator (实时预览体验) -->
        <section class="couplet-interactive-section">
          <div class="section-header-title">
            <span class="section-tag">INTERACTIVE PREVIEW</span>
            <h2>实时对联预览定制 / Online Customizer</h2>
            <div class="title-sub-line">输入您的专属文字 实时生成金字春联效果</div>
          </div>

          <div class="interactive-box">
            <div class="input-grid">
              <div class="input-item">
                <label>上联 (7字/9字/11字)</label>
                <input v-model="customLeft" type="text" placeholder="例如：迎喜迎春迎富贵" maxlength="14" />
              </div>
              <div class="input-item">
                <label>横批 (4字)</label>
                <input v-model="customCenter" type="text" placeholder="例如：吉星高照" maxlength="8" />
              </div>
              <div class="input-item">
                <label>下联 (7字/9字/11字)</label>
                <input v-model="customRight" type="text" placeholder="例如：接财接福接平安" maxlength="14" />
              </div>
            </div>
            <div class="interactive-tip">
              <span>💡 提示：在上方框中输入文字，主图对联将同步完成金字排版与预览！</span>
            </div>
          </div>
        </section>

        <!-- 3. New Arrival Product Grid (新品楹联) -->
        <section class="couplet-products-section">
          <div class="section-header-title">
            <span class="section-tag">NEW ARRIVALS</span>
            <h2>新品上新 / 严选楹联</h2>
            <div class="title-sub-line">传承金石气韵 · 精选名家手写与烫金春联作品</div>
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
              <!-- Card Top Image Display -->
              <div class="card-image-wrapper">
                <img
                  v-if="getProductImage(item)"
                  :src="getProductImage(item)"
                  :alt="item.name"
                  class="card-img"
                />
                <div v-else class="card-img-placeholder">
                  <div class="placeholder-icon">🧧</div>
                  <div class="placeholder-text">万年红烫金春联</div>
                  <div class="placeholder-sub">名家墨宝 · 定制特辑</div>
                </div>
                <div class="card-gold-frame"></div>
                <span class="card-tag">名家手写</span>
              </div>

              <!-- Card Bottom Crimson Info Badge (Matching reference design badge) -->
              <div class="card-info-badge">
                <div class="badge-header">
                  <h3 class="card-title">{{ item.name }}</h3>
                  <div class="card-price-box">
                    <span class="price-symbol">¥</span>
                    <span class="price-val">{{ item.price || '88.0' }}</span>
                  </div>
                </div>
                <p class="card-desc">{{ item.description || '特级万年红宣纸，耐候金墨手写，寓意岁岁平安、万事顺遂。' }}</p>
                <div class="card-action-bar">
                  <span>立即定制</span>
                  <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>
            </article>
          </div>

          <div class="couplet-action-center">
            <button type="button" class="btn-view-all" @click="openAllProducts">
              <span>查看全部春联作品 (View All)</span>
              <svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </section>

        <!-- 4. Traditional Chinese Lattice Coupon Banner (回字纹/窗格纹 优惠卡块) -->
        <section class="couplet-promo-banner">
          <div class="lattice-border">
            <div class="lattice-corner tl"></div>
            <div class="lattice-corner tr"></div>
            <div class="lattice-corner bl"></div>
            <div class="lattice-corner br"></div>

            <div class="promo-left">
              <span class="promo-tag">企业与家庭量大定制专享</span>
              <div class="promo-title">
                Get Upto <span class="highlight-gold">70%</span> Discount
              </div>
              <div class="promo-sub">全场满 3 副即享专属立减与全国包邮礼遇</div>
            </div>

            <div class="promo-right">
              <span class="promo-tag">专属优惠兑换码</span>
              <div class="code-box">
                <span class="code-text">COUPLET2026</span>
                <button type="button" class="btn-copy" @click="copyCode">复制代码</button>
              </div>
              <div class="promo-sub">结账时输入 DragNY25 或 COUPLET2026 自动立减</div>
            </div>
          </div>
        </section>

        <!-- 5. 4 Core Craftsmanship Advantages (四大品质保障) -->
        <section class="craftsmanship-section">
          <div class="craft-grid">
            <div class="craft-card">
              <div class="craft-icon">📜</div>
              <h4>特级万年红宣纸</h4>
              <p>加厚防潮洒金宣纸，红艳如火，历久弥新</p>
            </div>
            <div class="craft-card">
              <div class="craft-icon">✨</div>
              <h4>耐候纳米金墨</h4>
              <p>高纯度沉金墨汁，阳光下熠熠生辉不褪色</p>
            </div>
            <div class="craft-card">
              <div class="craft-icon">🖌️</div>
              <h4>名家字体定制</h4>
              <p>楷书、行书、隶书多体可选，气韵非凡</p>
            </div>
            <div class="craft-card">
              <div class="craft-icon">📦</div>
              <h4>专业防压礼盒</h4>
              <p>定制圆筒无折痕包装，全国顺丰包邮直达</p>
            </div>
          </div>
        </section>

        <!-- 6. Customer Testimonials Section (客户口碑) -->
        <section class="couplet-reviews-section">
          <div class="section-header-title">
            <span class="section-tag">CUSTOMER IS OUR PRIORITY</span>
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
                <div class="reviewer-meta">
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
                <div class="reviewer-meta">
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
                <div class="reviewer-meta">
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

const customLeft = ref('迎喜迎春迎富贵');
const customCenter = ref('吉星高照');
const customRight = ref('接财接福接平安');

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

const copyCode = () => {
  if (process.client) {
    navigator.clipboard.writeText('COUPLET2026');
    alert('优惠码 COUPLET2026 已复制到剪贴板！');
  }
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
/* High-End Palace Crimson & Gold Theme Token System */
.couplet-theme-wrapper {
  --cp-crimson-dark: #4a030b;
  --cp-crimson: #7a0c16;
  --cp-crimson-light: #9e1320;
  --cp-gold-dark: #aa771c;
  --cp-gold: #d4a337;
  --cp-gold-light: #f5d061;
  --cp-gold-bright: #ffe289;
  --cp-bg: #fcf8f2;
  --cp-card-bg: #ffffff;
  --cp-text-dark: #2a1215;
  --cp-text-muted: #7a6358;

  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  background-color: var(--cp-bg);
  color: var(--cp-text-dark);
  min-height: 100vh;
}

/* 1. Header Navigation */
.couplet-header {
  position: relative;
  background: linear-gradient(135deg, #7a0c16 0%, #5a040d 100%);
  color: #ffffff;
  padding-top: 1.25rem;
  padding-bottom: 2.25rem;
  border-bottom: 2px solid var(--cp-gold);
  box-shadow: 0 4px 20px rgba(122, 12, 22, 0.25);
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
  gap: 0.85rem;
  text-decoration: none;
  color: #ffffff;
}

.couplet-logo-icon {
  font-size: 1.8rem;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
}

.brand-text-group {
  display: flex;
  flex-direction: column;
}

.couplet-brand-text {
  font-size: 1.35rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  background: linear-gradient(135deg, #ffe289 0%, #f5d061 50%, #d4a337 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.couplet-brand-sub {
  font-size: 0.62rem;
  color: var(--cp-gold-light);
  letter-spacing: 0.15em;
  opacity: 0.85;
}

.couplet-header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.couplet-nav-link {
  color: rgba(255, 255, 255, 0.92);
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 700;
  padding: 0.45rem 1rem;
  border-radius: 999px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.couplet-nav-link:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.12);
}

.couplet-nav-link.gold-btn {
  background: linear-gradient(135deg, #ffe289 0%, #d4a337 100%);
  color: var(--cp-crimson-dark);
  font-weight: 900;
  box-shadow: 0 2px 10px rgba(212, 163, 55, 0.4);
}

.couplet-nav-link.gold-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(212, 163, 55, 0.6);
}

.btn-icon {
  width: 15px;
  height: 15px;
}

.couplet-wave-bottom {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

/* Main Container */
.couplet-body {
  position: relative;
  padding: 2.5rem 1.5rem 5rem;
}

.cloud-decor {
  position: absolute;
  font-size: 2.8rem;
  opacity: 0.2;
  pointer-events: none;
}

.cloud-1 { top: 3rem; left: 1.5rem; }
.cloud-2 { top: 35rem; right: 1.5rem; }

.couplet-container {
  max-width: 1120px;
  margin: 0 auto;
}

/* 2. Hero Section Matching Reference Screenshot 1:1 */
.couplet-hero-section {
  text-align: center;
  margin-bottom: 4rem;
}

.couplet-hero-card {
  position: relative;
  background: #ffffff;
  border: 3px double var(--cp-gold);
  border-radius: 16px;
  padding: 3rem 2rem 2.5rem;
  box-shadow: 0 12px 35px rgba(122, 12, 22, 0.1);
}

/* Gold Corner Ornaments */
.corner-ornament {
  position: absolute;
  width: 24px;
  height: 24px;
  border-color: var(--cp-gold);
  border-style: solid;
}
.corner-ornament.top-left { top: 10px; left: 10px; border-width: 3px 0 0 3px; }
.corner-ornament.top-right { top: 10px; right: 10px; border-width: 3px 3px 0 0; }
.corner-ornament.bottom-left { bottom: 10px; left: 10px; border-width: 0 0 3px 3px; }
.corner-ornament.bottom-right { bottom: 10px; right: 10px; border-width: 0 3px 3px 0; }

.hero-display-box {
  background: linear-gradient(135deg, #7a0c16 0%, #4a030b 100%);
  border: 2px solid var(--cp-gold);
  border-radius: 12px;
  padding: 3rem 1.5rem;
  margin-bottom: 2rem;
  box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.4);
}

.couplet-scroll-stage {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
}

@media (max-width: 640px) {
  .couplet-scroll-stage {
    gap: 0.85rem;
  }
}

.scroll-unit {
  background: linear-gradient(180deg, #c01424 0%, #8f0b18 100%);
  border: 2px solid var(--cp-gold-light);
  border-radius: 6px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.left-scroll, .right-scroll {
  padding: 1.25rem 0.8rem;
}

.center-scroll {
  padding: 0.8rem 1.5rem;
}

.scroll-label {
  font-size: 0.65rem;
  color: rgba(255, 226, 137, 0.75);
  letter-spacing: 0.1em;
  margin-bottom: 0.4rem;
  font-weight: 700;
}

.scroll-calligraphy {
  writing-mode: vertical-rl;
  font-family: "KaiTi", "STKaiti", serif;
  font-size: 1.4rem;
  font-weight: 900;
  color: var(--cp-gold-bright);
  letter-spacing: 0.35em;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
  min-height: 200px;
}

.scroll-calligraphy-center {
  font-family: "KaiTi", "STKaiti", serif;
  font-size: 1.25rem;
  font-weight: 900;
  color: var(--cp-gold-bright);
  letter-spacing: 0.3em;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
}

.hero-gold-sub {
  color: var(--cp-gold-dark);
  font-size: 0.85rem;
  font-weight: 900;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

.hero-gold-title {
  font-size: 2.4rem;
  font-weight: 900;
  color: var(--cp-crimson);
  margin: 0.3rem 0 0.5rem;
  letter-spacing: 0.06em;
}

.hero-gold-desc {
  color: var(--cp-text-muted);
  font-size: 0.95rem;
  font-weight: 700;
}

.couplet-intro-text {
  max-width: 820px;
  margin: 1.75rem auto 0;
  color: var(--cp-crimson);
  font-weight: 800;
  font-size: 0.95rem;
  line-height: 1.75;
}

/* 3. Interactive Customizer Box */
.couplet-interactive-section {
  margin-bottom: 4.5rem;
}

.interactive-box {
  background: #ffffff;
  border: 1px solid rgba(212, 163, 55, 0.35);
  border-radius: 14px;
  padding: 1.75rem 2rem;
  box-shadow: 0 6px 20px rgba(122, 12, 22, 0.05);
}

.input-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .input-grid {
    grid-template-columns: 1fr;
  }
}

.input-item {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.input-item label {
  font-size: 0.82rem;
  font-weight: 800;
  color: var(--cp-crimson);
}

.input-item input {
  border: 1.5px solid #e8ded1;
  border-radius: 8px;
  padding: 0.65rem 0.9rem;
  font-size: 0.92rem;
  font-family: "KaiTi", "STKaiti", serif;
  font-weight: 700;
  color: var(--cp-crimson-dark);
  outline: none;
  transition: all 0.2s ease;
}

.input-item input:focus {
  border-color: var(--cp-gold);
  box-shadow: 0 0 0 3px rgba(212, 163, 55, 0.15);
}

.interactive-tip {
  margin-top: 1.2rem;
  text-align: center;
  font-size: 0.82rem;
  color: var(--cp-text-muted);
  font-weight: 700;
}

/* Section Header Titles */
.section-header-title {
  text-align: center;
  margin-bottom: 2.25rem;
}

.section-tag {
  font-size: 0.72rem;
  font-weight: 900;
  color: var(--cp-gold-dark);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  display: block;
  margin-bottom: 0.25rem;
}

.section-header-title h2 {
  font-size: 1.75rem;
  font-weight: 900;
  color: var(--cp-crimson);
  margin: 0;
}

.title-sub-line {
  color: var(--cp-gold);
  font-size: 0.88rem;
  font-weight: 800;
  margin-top: 0.4rem;
}

/* 4. Product Cards Grid */
.couplet-products-section {
  margin-bottom: 4.5rem;
}

.couplet-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem;
}

@media (max-width: 768px) {
  .couplet-grid {
    grid-template-columns: 1fr;
  }
}

.couplet-card {
  background: var(--cp-card-bg);
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
}

.couplet-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 36px rgba(122, 12, 22, 0.16);
}

.card-image-wrapper {
  position: relative;
  width: 100%;
  height: 290px;
  background: #fdf5ea;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 640px) {
  .card-image-wrapper {
    height: 210px;
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
  gap: 0.35rem;
  color: var(--cp-crimson);
  text-align: center;
}

.placeholder-icon { font-size: 2.8rem; }
.placeholder-text { font-size: 1.05rem; font-weight: 900; font-family: "KaiTi", serif; }
.placeholder-sub { font-size: 0.75rem; color: var(--cp-gold-dark); font-weight: 700; }

.card-gold-frame {
  position: absolute;
  inset: 10px;
  border: 1.5px solid rgba(212, 163, 55, 0.4);
  border-radius: 8px;
  pointer-events: none;
}

.card-tag {
  position: absolute;
  top: 18px;
  right: 18px;
  background: var(--cp-gold);
  color: var(--cp-crimson-dark);
  font-size: 0.72rem;
  font-weight: 900;
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.card-info-badge {
  background: linear-gradient(135deg, #7a0c16 0%, #5a040d 100%);
  color: #ffffff;
  padding: 1.25rem 1.35rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.badge-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 900;
  margin: 0;
  color: #ffffff;
}

.card-price-box {
  color: var(--cp-gold-bright);
  display: flex;
  align-items: baseline;
  gap: 0.15rem;
}

.price-symbol { font-size: 0.85rem; font-weight: 800; }
.price-val { font-size: 1.3rem; font-weight: 900; }

.card-desc {
  font-size: 0.84rem;
  color: rgba(255, 255, 255, 0.85);
  margin: 0 0 1rem;
  line-height: 1.55;
}

.card-action-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.82rem;
  font-weight: 900;
  color: var(--cp-gold-light);
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  padding-top: 0.65rem;
}

.arrow-icon { width: 15px; height: 15px; }

.couplet-action-center {
  text-align: center;
  margin-top: 2.75rem;
}

.btn-view-all {
  background: linear-gradient(135deg, #7a0c16 0%, #5a040d 100%);
  color: var(--cp-gold-bright);
  border: 1.5px solid var(--cp-gold);
  padding: 0.85rem 2.25rem;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.25s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  box-shadow: 0 4px 18px rgba(122, 12, 22, 0.2);
}

.btn-view-all:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 8px 25px rgba(122, 12, 22, 0.35);
  background: linear-gradient(135deg, #9e1320 0%, #6b0512 100%);
}

.btn-arrow { width: 16px; height: 16px; }

/* 5. Traditional Lattice Coupon Banner */
.couplet-promo-banner {
  margin-bottom: 4.5rem;
}

.lattice-border {
  position: relative;
  background: linear-gradient(135deg, #7a0c16 0%, #4a030b 100%);
  color: #ffffff;
  border: 4px double var(--cp-gold);
  border-radius: 12px;
  padding: 2.5rem 2.25rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem;
  align-items: center;
  box-shadow: 0 10px 30px rgba(122, 12, 22, 0.15);
}

@media (max-width: 768px) {
  .lattice-border {
    grid-template-columns: 1fr;
    text-align: center;
  }
}

.lattice-corner {
  position: absolute;
  width: 14px;
  height: 14px;
  border-color: var(--cp-gold-light);
  border-style: solid;
}
.lattice-corner.tl { top: 6px; left: 6px; border-width: 2px 0 0 2px; }
.lattice-corner.tr { top: 6px; right: 6px; border-width: 2px 2px 0 0; }
.lattice-corner.bl { bottom: 6px; left: 6px; border-width: 0 0 2px 2px; }
.lattice-corner.br { bottom: 6px; right: 6px; border-width: 0 2px 2px 0; }

.promo-tag {
  font-size: 0.85rem;
  color: var(--cp-gold-light);
  font-weight: 800;
  display: block;
}

.promo-title {
  font-size: 2.2rem;
  font-weight: 900;
  color: #ffffff;
  margin: 0.2rem 0 0.4rem;
}

.highlight-gold {
  color: var(--cp-gold-bright);
  font-size: 2.8rem;
}

.promo-sub {
  font-size: 0.84rem;
  opacity: 0.85;
}

.code-box {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0.4rem 0;

  @media (max-width: 768px) {
    justify-content: center;
  }
}

.code-text {
  font-size: 1.8rem;
  font-weight: 900;
  color: var(--cp-gold-bright);
  letter-spacing: 0.1em;
}

.btn-copy {
  background: var(--cp-gold);
  color: var(--cp-crimson-dark);
  border: none;
  padding: 0.4rem 0.9rem;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-copy:hover {
  background: var(--cp-gold-bright);
}

/* 6. Craftsmanship Section */
.craftsmanship-section {
  margin-bottom: 4.5rem;
}

.craft-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.5rem;
}

@media (max-width: 860px) {
  .craft-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 540px) {
  .craft-grid {
    grid-template-columns: 1fr;
  }
}

.craft-card {
  background: #ffffff;
  border: 1px solid rgba(212, 163, 55, 0.3);
  border-radius: 12px;
  padding: 1.5rem 1.2rem;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
}

.craft-icon { font-size: 2.2rem; margin-bottom: 0.6rem; }
.craft-card h4 { font-size: 1.02rem; font-weight: 900; color: var(--cp-crimson); margin: 0 0 0.4rem; }
.craft-card p { font-size: 0.8rem; color: var(--cp-text-muted); margin: 0; line-height: 1.5; }

/* 7. Reviews Section */
.couplet-reviews-section {
  margin-bottom: 2.5rem;
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.75rem;
}

@media (max-width: 860px) {
  .reviews-grid {
    grid-template-columns: 1fr;
  }
}

.review-card {
  background: #ffffff;
  border: 1.5px solid rgba(212, 163, 55, 0.3);
  border-radius: 12px;
  padding: 1.75rem 1.5rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.03);
}

.quote-mark {
  font-size: 2.5rem;
  color: var(--cp-gold);
  line-height: 1;
  font-weight: 900;
}

.review-content {
  font-size: 0.9rem;
  color: var(--cp-text-dark);
  line-height: 1.65;
  margin: 0.6rem 0 1.5rem;
}

.reviewer-info {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.reviewer-avatar {
  width: 2.6rem;
  height: 2.6rem;
  background: #fdf5ea;
  border: 1px solid var(--cp-gold);
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
}

.reviewer-name {
  font-size: 0.9rem;
  font-weight: 900;
  color: var(--cp-crimson);
}

.reviewer-title {
  font-size: 0.78rem;
  color: var(--cp-text-muted);
}

/* Footer */
.couplet-footer {
  background: var(--cp-crimson-dark);
  color: rgba(255, 255, 255, 0.85);
  padding: 3rem 1.5rem;
  text-align: center;
  border-top: 3px solid var(--cp-gold);
}

.footer-inner {
  max-width: 1120px;
  margin: 0 auto;
}

.footer-logo {
  font-size: 1.25rem;
  font-weight: 900;
  color: var(--cp-gold-bright);
  display: block;
  margin-bottom: 0.6rem;
}

.footer-tagline {
  font-size: 0.85rem;
  margin: 0 0 1.75rem;
  opacity: 0.8;
}

.footer-copyright {
  font-size: 0.8rem;
  opacity: 0.6;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  padding-top: 1.5rem;
}

.couplet-loading-state,
.couplet-empty-state {
  text-align: center;
  padding: 3.5rem 1rem;
  color: var(--cp-crimson);
  font-weight: 800;
}
</style>
