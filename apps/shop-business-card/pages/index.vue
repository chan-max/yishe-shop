<template>
  <div class="gucci-storefront-wrapper">
    <!-- Top White Luxury Header Bar -->
    <header class="gucci-header">
      <div class="gucci-header-inner">
        <div class="header-left">
          <NuxtLink to="/contact" class="header-contact-btn">
            <span class="plus-icon">+</span>
            <span>预约设计师 1对1 打样</span>
          </NuxtLink>
        </div>

        <div class="header-center">
          <NuxtLink to="/" class="gucci-brand-logo">
            名 片 工 坊 · B U S I N E S S  C A R D
          </NuxtLink>
        </div>

        <div class="header-right">
          <NuxtLink to="/search" class="header-icon-btn" title="搜索名片库">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </NuxtLink>
          <NuxtLink to="/contact" class="header-icon-btn" title="个人中心">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </NuxtLink>
          <NuxtLink to="/search" class="header-icon-btn" title="名片盒">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </NuxtLink>
          <NuxtLink to="/about" class="header-menu-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            <span class="menu-label">工艺菜单</span>
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Main Full-Bleed Editorial Layout -->
    <main class="gucci-main">
      <!-- 1. Full-Bleed High-Fashion Hero Campaign Showcase -->
      <section class="gucci-hero-section">
        <div class="hero-bg-light-effects"></div>

        <div class="hero-center-stage">
          <div class="hero-headline-group">
            <span class="hero-top-badge">CRAFTSMANSHIP ATELIER · 商务高定名片</span>
            <h1 class="hero-main-title">彰显尊贵身份 · 触感活字印刷</h1>
            <p class="hero-sub-text">600g 进口纯棉纸 · 24K 浮雕热压金 · 德国古典活字凹版压印</p>
          </div>

          <!-- Dual 3D Floating Realistic Business Cards Showcase -->
          <div class="hero-cards-stage">
            <div class="hero-card-item card-ebony-gold">
              <div class="card-foil-texture"></div>
              <div class="card-inner-content">
                <div class="card-header-row">
                  <span class="card-brand-initials">BC</span>
                  <span class="card-serial">NO. 008824</span>
                </div>
                <div class="card-center-body">
                  <span class="card-person-name">ALEXANDER SMITH</span>
                  <span class="card-person-title">FOUNDER & CEO · 首席执行官</span>
                </div>
                <div class="card-footer-row">
                  <span>ATELIER 1S DESIGN</span>
                  <span>24K EMBOSSED GOLD</span>
                </div>
              </div>
            </div>

            <div class="hero-card-item card-crimson-silver">
              <div class="card-foil-texture silver"></div>
              <div class="card-inner-content">
                <div class="card-header-row">
                  <span class="card-brand-initials silver-text">1S</span>
                  <span class="card-serial">SILVER FOIL</span>
                </div>
                <div class="card-center-body">
                  <span class="card-person-name">VICTORIA CHEN</span>
                  <span class="card-person-title">CHIEF CREATIVE OFFICER · 设计总监</span>
                </div>
                <div class="card-footer-row">
                  <span>600GSM COTTON STOCK</span>
                  <span>LETTERPRESS</span>
                </div>
              </div>
            </div>
          </div>

          <div class="hero-action-row">
            <NuxtLink to="/search" class="gucci-btn-gold">
              探索高定名片灵感库
            </NuxtLink>
            <NuxtLink to="/contact" class="gucci-btn-outline">
              预约 1对1 矢量打样
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- 2. Dynamic 4-Column High-Fashion Color-Tone Showcase -->
      <section class="gucci-collection-section">
        <div class="section-title-bar">
          <span class="section-badge">COLLECTION HIGHLIGHTS</span>
          <h2 class="section-main-heading">高定工艺名片系列</h2>
        </div>

        <div v-if="loading" class="collection-loading">
          正在读取名片工坊在线名片款式…
        </div>

        <div v-else class="collection-4col-grid">
          <!-- Live Dynamic Products or High-End Mockup Cards -->
          <div
            v-for="(item, idx) in displayProducts"
            :key="item.id || idx"
            class="collection-card"
            :class="getCardToneClass(idx)"
            @click="navigateToProduct(item)"
          >
            <div class="card-photo-container">
              <img
                v-if="getProductImage(item)"
                :src="getProductImage(item)"
                :alt="item.name"
                class="photo-img-cover"
              />
              <div v-else class="photo-product-mockup" :class="getMockupBgClass(idx)">
                <div class="card-mockup-inner">
                  <div class="card-shadow-3d">{{ getCardEmoji(idx) }}</div>
                  <span class="mockup-label">{{ getCardLabel(idx) }}</span>
                  <span class="mockup-sublabel">{{ getCardSublabel(idx) }}</span>
                </div>
              </div>
              <div class="card-hover-overlay">
                <span>查看高定细节 ›</span>
              </div>
            </div>
            <div class="card-caption">
              <span class="caption-title">{{ item.name || getCardTitle(idx) }}</span>
              <span class="caption-price">${{ item.price || '88.00' }} / 盒</span>
            </div>
          </div>
        </div>

        <div class="collection-action-center">
          <NuxtLink to="/search" class="gucci-btn-gray">
            浏览全系列名片款式 (ALL COLLECTIONS)
          </NuxtLink>
        </div>
      </section>

      <!-- 3. Business Card Atelier Services Section -->
      <section class="gucci-services-section">
        <span class="section-badge">ATELIER SERVICES</span>
        <h2 class="services-main-title">名片工坊 专属高定服务</h2>

        <div class="services-3col-grid">
          <!-- Service 1 -->
          <div class="service-card" @click="goTo('/contact')">
            <div class="service-photo-wrapper">
              <div class="service-photo photo-boutique">
                <div class="photo-overlay-icon">✍️</div>
                <div class="service-hover-shine"></div>
              </div>
            </div>
            <h3 class="service-title">1对1 字体与排板设计</h3>
            <p class="service-desc">资深字体大师亲自把关行距、字距与版面发丝级对齐</p>
            <NuxtLink to="/contact" class="service-link">
              预约设计师沟通 ›
            </NuxtLink>
          </div>

          <!-- Service 2 -->
          <div class="service-card" @click="goTo('/contact')">
            <div class="service-photo-wrapper">
              <div class="service-photo photo-types">
                <div class="photo-overlay-icon">📇</div>
                <div class="service-hover-shine"></div>
              </div>
            </div>
            <h3 class="service-title">特种纸质感与烫金纸样盒</h3>
            <p class="service-desc">免费寄送 600g 棉纸、绒面卡纸与 12 种烫金试样卡盒</p>
            <NuxtLink to="/contact" class="service-link">
              免费申请纸样盒 ›
            </NuxtLink>
          </div>

          <!-- Service 3 -->
          <div class="service-card" @click="goTo('/contact')">
            <div class="service-photo-wrapper">
              <div class="service-photo photo-collect">
                <div class="photo-overlay-icon">⚡</div>
                <div class="service-hover-shine"></div>
              </div>
            </div>
            <h3 class="service-title">加急打样与顺丰次日达</h3>
            <p class="service-desc">24 小时矢量文件加急打样，全国顺丰特快保价直达</p>
            <NuxtLink to="/contact" class="service-link">
              了解加急打样服务 ›
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- 4. Subscription Section -->
      <section class="gucci-subscribe-section">
        <div class="subscribe-container">
          <span class="subscribe-tag">SUBSCRIBE TO BUSINESS CARD INSIGHTS</span>
          <h2 class="subscribe-headline">
            订阅名片工坊资讯，免费获取《商务精英名片材质与烫金工艺搭配指南》。
          </h2>
          <div class="subscribe-action">
            <button type="button" class="subscribe-plus-btn" @click="subscribeEmail">
              <span class="plus-symbol">+</span> 立即免费订阅
            </button>
          </div>
        </div>
      </section>
    </main>

    <!-- 5. Luxury Black Multi-Column Footer -->
    <footer class="gucci-footer">
      <div class="footer-inner">
        <div class="footer-columns">
          <div class="footer-col">
            <h4 class="col-title">客户服务与支持</h4>
            <ul>
              <li><NuxtLink to="/contact">联系设计师</NuxtLink></li>
              <li><NuxtLink to="/search">查询名片订单</NuxtLink></li>
              <li><NuxtLink to="/about">特种纸材质说明</NuxtLink></li>
              <li><NuxtLink to="/contact">矢量文件上传规范</NuxtLink></li>
              <li><NuxtLink to="/search">搜索名片灵感库</NuxtLink></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4 class="col-title">关于名片工坊</h4>
            <ul>
              <li><NuxtLink to="/about">工坊品牌故事</NuxtLink></li>
              <li><NuxtLink to="/about">活字印刷与凹版压印</NuxtLink></li>
              <li><NuxtLink to="/about">24K 浮雕烫金技术</NuxtLink></li>
              <li><NuxtLink to="/about">FSC 环保无酸棉纸</NuxtLink></li>
            </ul>
          </div>

          <div class="footer-col col-form">
            <h4 class="col-title">加急打样与寄送查询</h4>
            <div class="input-with-arrow">
              <input type="text" placeholder="输入城市名称（查询顺丰时效）" />
              <span class="arrow-right">›</span>
            </div>

            <h4 class="col-title sub-form-title">订阅工艺资讯</h4>
            <p class="form-desc">订阅即可电子版《商务名片材质与烫金工艺搭配指南》。</p>
            <div class="input-with-arrow">
              <input type="email" placeholder="输入您的电子邮箱" v-model="emailInput" />
              <span class="arrow-right" @click="submitEmail">›</span>
            </div>

            <div class="country-region-selector">
              <span class="region-label">服务地区 / REGION</span>
              <span class="selected-country">中国 Mainland China / Global Express</span>
            </div>
          </div>
        </div>

        <div class="footer-secondary-links">
          <h4 class="col-title">名片定制快捷通道</h4>
          <div class="link-inline-row">
            <NuxtLink to="/about">探索活字工艺</NuxtLink>
            <NuxtLink to="/contact">预约设计师</NuxtLink>
            <NuxtLink to="/search">免费申请纸样盒</NuxtLink>
          </div>
        </div>

        <div class="footer-copyright-line">
          © 2026 名片工坊 Business Card Atelier. 保留所有权利。专为商务精英与设计大师打造。
        </div>

        <!-- Giant Serif Logo -->
        <div class="footer-giant-brand">
          B U S I N E S S  C A R D
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

definePageMeta({
  layout: 'default'
});

useSeoMeta({
  title: '名片工坊 · 高端商务名片与特种纸名片定制平台 | BUSINESS CARD',
  ogTitle: '名片工坊 · 高端商务名片与特种纸名片定制平台',
  description: '名片工坊专注于高端商务名片定制、特种纸工艺名片、24K烫金与极简活字印刷设计服务。',
  ogDescription: '专为企业精英与设计师打造的高端商务名片定制平台。'
});

useHead({
  title: '名片工坊 · 高端商务名片与特种纸名片定制平台 | BUSINESS CARD',
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📇</text></svg>' }
  ]
});

const router = useRouter();
const { fetchPublishedProducts, getPublishedProductImage } = usePublishedProducts();

const loading = ref(true);
const products = ref<any[]>([]);
const emailInput = ref('');

const fallbackPreset = [
  { id: 'pres-1', name: '凹版活字压印名片 (Executive Letterpress)', key: 'letterpress' },
  { id: 'pres-2', name: '24K 浮雕烫金名片 (Gold Foil Embossed)', key: 'gold-foil' },
  { id: 'pres-3', name: '钛钢极客精印名片 (Metal Steel Edition)', key: 'steel' },
  { id: 'pres-4', name: '触感特种纸艺名片 (Specialty Paper Crafts)', key: 'specialty' }
];

const displayProducts = computed(() => {
  if (products.value.length > 0) {
    return products.value.slice(0, 4);
  }
  return fallbackPreset;
});

const getProductImage = (item: any) => {
  if (item.images && item.images.length > 0) return item.images[0];
  return getPublishedProductImage(item);
};

const goTo = (path: string) => {
  router.push(path);
};

const navigateToProduct = (item: any) => {
  if (item.id && !item.id.startsWith('pres-')) {
    router.push(`/product/${item.id}`);
  } else {
    router.push(`/search?category=${item.key || 'all'}`);
  }
};

const getCardToneClass = (idx: number) => {
  const tones = ['tone-pink', 'tone-canvas', 'tone-navy', 'tone-blue'];
  return tones[idx % tones.length];
};

const getMockupBgClass = (idx: number) => {
  const mockups = ['pink-mockup', 'canvas-mockup', 'navy-mockup', 'blue-mockup'];
  return mockups[idx % mockups.length];
};

const getCardEmoji = (idx: number) => {
  const emojis = ['📇', '✨', '💳', '📜'];
  return emojis[idx % emojis.length];
};

const getCardLabel = (idx: number) => {
  const labels = ['LETTERPRESS', 'GOLD FOIL', 'METAL STEEL', 'SPECIALTY PAPER'];
  return labels[idx % labels.length];
};

const getCardSublabel = (idx: number) => {
  const sublabels = ['600g 活字棉纸', '24K 热压金箔', '拉丝钛钢精印', '触感绒面特种纸'];
  return sublabels[idx % sublabels.length];
};

const getCardTitle = (idx: number) => {
  const titles = [
    '凹版活字压印名片 (Executive Letterpress)',
    '24K 浮雕烫金名片 (Gold Foil Embossed)',
    '钛钢极客精印名片 (Metal Steel Edition)',
    '触感特种纸艺名片 (Specialty Paper Crafts)'
  ];
  return titles[idx % titles.length];
};

const subscribeEmail = () => {
  alert('感谢订阅名片工坊！我们已将《商务名片材质与烫印指南》发送至您的邮箱。');
};

const submitEmail = () => {
  if (emailInput.value) {
    alert(`感谢订阅！${emailInput.value} 已成功加入名片工坊资讯列表。`);
    emailInput.value = '';
  }
};

onMounted(async () => {
  try {
    loading.value = true;
    const res = await fetchPublishedProducts({ page: 1, limit: 4 });
    if (res && Array.isArray(res)) {
      products.value = res;
    } else if (res && Array.isArray(res.items)) {
      products.value = res.items;
    }
  } catch (e) {
    console.error('Failed to fetch card products:', e);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
/* GUCCI High-Fashion Luxury Design System - Fully Polished Visual Details */
.gucci-storefront-wrapper {
  margin: 0;
  padding: 0;
  background: #ffffff;
  color: #000000;
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Didot, "Times New Roman", serif;
  min-height: 100vh;
  width: 100%;
}

/* 1. Header Navigation */
.gucci-header {
  width: 100%;
  background: #ffffff;
  border-bottom: 1px solid #e5e5e5;
  position: sticky;
  top: 0;
  z-index: 100;
}

.gucci-header-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left { display: flex; align-items: center; }

.header-contact-btn {
  background: none;
  border: none;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #000000;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  text-decoration: none;
}

.plus-icon { font-size: 0.95rem; }

.gucci-brand-logo {
  font-family: Didot, "Bodoni MT", Cinzel, "Times New Roman", serif;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #000000;
  text-decoration: none;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.header-icon-btn, .header-menu-btn {
  background: none;
  border: none;
  color: #000000;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.header-icon-btn svg { width: 19px; height: 19px; }
.header-menu-btn svg { width: 18px; height: 18px; }

.menu-label {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  margin-left: 0.3rem;
}

/* 2. Enhanced Hero Campaign Showcase */
.gucci-hero-section {
  position: relative;
  width: 100%;
  min-height: 640px;
  background: #0d1117;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
}

.hero-bg-light-effects {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 50% 30%, rgba(212, 163, 55, 0.18) 0%, transparent 60%),
    radial-gradient(circle at 80% 80%, rgba(53, 92, 125, 0.25) 0%, transparent 50%),
    radial-gradient(circle at 10% 20%, rgba(107, 43, 62, 0.2) 0%, transparent 50%);
  pointer-events: none;
}

.hero-center-stage {
  position: relative;
  z-index: 2;
  max-width: 1100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.hero-headline-group {
  margin-bottom: 3.5rem;
}

.hero-top-badge {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.25em;
  color: #d4a337;
  display: block;
  margin-bottom: 0.75rem;
}

.hero-main-title {
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #ffffff;
  margin: 0 0 1rem;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
}

.hero-sub-text {
  font-size: 1.05rem;
  color: #cccccc;
  letter-spacing: 0.05em;
}

/* Dual Floating 3D Cards Stage */
.hero-cards-stage {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  margin-bottom: 3.5rem;
  perspective: 1200px;
}

@media (max-width: 768px) {
  .hero-cards-stage {
    flex-direction: column;
    gap: 2rem;
  }
}

.hero-card-item {
  width: 320px;
  height: 190px;
  border-radius: 8px;
  padding: 1.35rem;
  position: relative;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6);
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-ebony-gold {
  background: linear-gradient(135deg, #181818 0%, #0a0a0a 100%);
  border: 1.5px solid rgba(212, 163, 55, 0.75);
  transform: rotateY(-14deg) rotateX(8deg);
}

.card-crimson-silver {
  background: linear-gradient(135deg, #4a1521 0%, #2b0b13 100%);
  border: 1.5px solid rgba(200, 210, 220, 0.6);
  transform: rotateY(12deg) rotateX(6deg);
}

.hero-card-item:hover {
  transform: rotateY(0deg) rotateX(0deg) scale(1.04);
  box-shadow: 0 35px 70px rgba(212, 163, 55, 0.25);
}

.card-foil-texture {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(212, 163, 55, 0.1) 0%, transparent 100%);
  pointer-events: none;
}

.card-foil-texture.silver {
  background: linear-gradient(135deg, rgba(220, 230, 240, 0.15) 0%, transparent 100%);
}

.card-inner-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-brand-initials {
  font-family: Didot, serif;
  font-size: 1.8rem;
  font-weight: 900;
  color: #d4a337;
  letter-spacing: 0.1em;
}

.silver-text {
  color: #e0e6ed !important;
}

.card-serial {
  font-size: 0.65rem;
  color: #888888;
  letter-spacing: 0.15em;
}

.card-center-body {
  text-align: left;
}

.card-person-name {
  font-size: 0.95rem;
  font-weight: 800;
  color: #ffffff;
  display: block;
  letter-spacing: 0.15em;
  margin-bottom: 0.2rem;
}

.card-person-title {
  font-size: 0.68rem;
  color: #bbbbbb;
  letter-spacing: 0.08em;
}

.card-footer-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.62rem;
  color: #d4a337;
  letter-spacing: 0.1em;
}

.hero-action-row {
  display: flex;
  gap: 1.25rem;
}

.gucci-btn-gold {
  background: #d4a337;
  color: #000000;
  padding: 0.85rem 2.5rem;
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(212, 163, 55, 0.3);
  transition: all 0.2s ease;
}

.gucci-btn-gold:hover {
  background: #e5b448;
  transform: translateY(-2px);
}

.gucci-btn-outline {
  background: transparent;
  color: #ffffff;
  border: 1px solid #ffffff;
  padding: 0.85rem 2.5rem;
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-decoration: none;
  transition: all 0.2s ease;
}

.gucci-btn-outline:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

/* 3. Section Title Bar & 4-Column Showcase */
.gucci-collection-section {
  padding: 4rem 0 0;
  background: #ffffff;
}

.section-title-bar {
  text-align: center;
  margin-bottom: 3rem;
}

.section-badge {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  color: #888888;
  display: block;
  margin-bottom: 0.5rem;
}

.section-main-heading {
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  margin: 0;
}

.collection-loading {
  text-align: center;
  padding: 4rem 1rem;
  color: #666666;
}

.collection-4col-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
}

@media (max-width: 1024px) { .collection-4col-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .collection-4col-grid { grid-template-columns: 1fr; } }

.collection-card {
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.card-photo-container {
  height: 480px;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.photo-img-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.collection-card:hover .photo-img-cover { transform: scale(1.05); }

.tone-pink .card-photo-container { background: linear-gradient(180deg, #3a2228 0%, #1f1115 100%); }
.tone-canvas .card-photo-container { background: linear-gradient(180deg, #4a3e2e 0%, #2b2216 100%); }
.tone-navy .card-photo-container { background: linear-gradient(180deg, #1b2631 0%, #0d131a 100%); }
.tone-blue .card-photo-container { background: linear-gradient(180deg, #2c3e50 0%, #1a252f 100%); }

.photo-product-mockup {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  transition: transform 0.4s ease;
}

.card-mockup-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.card-shadow-3d {
  font-size: 4rem;
  filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.5));
}

.mockup-label {
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.25em;
  opacity: 0.95;
}

.mockup-sublabel {
  font-size: 0.75rem;
  color: #d4a337;
  letter-spacing: 0.1em;
}

.card-hover-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.1em;
}

.collection-card:hover .card-hover-overlay {
  opacity: 1;
}

.card-caption {
  padding: 1.25rem 1rem;
  text-align: center;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.caption-title {
  font-size: 0.88rem;
  color: #000000;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.caption-price {
  font-size: 0.82rem;
  color: #888888;
  font-weight: 600;
}

.collection-action-center {
  text-align: center;
  padding: 3.5rem 1rem;
  background: #ffffff;
}

.gucci-btn-gray {
  background: #111111;
  color: #ffffff;
  padding: 0.9rem 3.5rem;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-decoration: none;
  display: inline-block;
  transition: all 0.25s ease;
}

.gucci-btn-gray:hover {
  background: #333333;
  transform: translateY(-2px);
}

/* 4. Services Section */
.gucci-services-section {
  padding: 5rem 2rem 4rem;
  background: #fcfcfc;
  border-top: 1px solid #f0f0f0;
  text-align: center;
}

.services-main-title {
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #000000;
  margin-top: 0.35rem;
  margin-bottom: 3.5rem;
}

.services-3col-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
}

@media (max-width: 860px) { .services-3col-grid { grid-template-columns: 1fr; } }

.service-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.service-photo-wrapper {
  width: 100%;
  height: 320px;
  background: #f5f5f5;
  margin-bottom: 1.5rem;
  overflow: hidden;
  position: relative;
}

.service-photo {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.4s ease;
}

.service-card:hover .service-photo { transform: scale(1.04); }

.photo-boutique { background: #e8e8e8; }
.photo-types { background: #1a1a1a; color: #d4a337; }
.photo-collect { background: #dcdcdc; }

.photo-overlay-icon { font-size: 3.8rem; }

.service-title {
  font-size: 0.95rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #000000;
  margin: 0 0 0.5rem;
}

.service-desc {
  font-size: 0.8rem;
  color: #777777;
  max-width: 280px;
  line-height: 1.5;
  margin: 0 0 0.85rem;
}

.service-link {
  font-size: 0.8rem;
  font-weight: 700;
  color: #000000;
  text-decoration: underline;
}

/* 5. Subscription Section */
.gucci-subscribe-section {
  background: #000000;
  color: #ffffff;
  padding: 5.5rem 2rem;
  text-align: center;
}

.subscribe-container {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.subscribe-tag {
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.25em;
  color: #d4a337;
}

.subscribe-headline {
  font-size: 1.35rem;
  font-weight: 400;
  line-height: 1.6;
  color: #ffffff;
}

.subscribe-plus-btn {
  background: #ffffff;
  color: #000000;
  border: none;
  padding: 0.85rem 2.5rem;
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.25s ease;
}

.subscribe-plus-btn:hover {
  background: #e5e5e5;
  transform: scale(1.03);
}

.plus-symbol { font-size: 1rem; }

/* 6. Footer */
.gucci-footer {
  background: #000000;
  color: #ffffff;
  padding: 4rem 2rem 2rem;
  border-top: 1px solid #222222;
}

.footer-inner { max-width: 1400px; margin: 0 auto; }

.footer-columns {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  margin-bottom: 4rem;
}

@media (max-width: 860px) { .footer-columns { grid-template-columns: 1fr; } }

.col-title {
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: #ffffff;
  margin-bottom: 1.25rem;
}

.sub-form-title { margin-top: 2rem; }

.footer-col ul { list-style: none; padding: 0; margin: 0; }
.footer-col li { margin-bottom: 0.75rem; }

.footer-col a {
  color: #aaaaaa;
  font-size: 0.8rem;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-col a:hover { color: #ffffff; }

.input-with-arrow {
  position: relative;
  width: 100%;
  margin-bottom: 1.25rem;
}

.input-with-arrow input {
  width: 100%;
  background: none;
  border: none;
  border-bottom: 1px solid #555555;
  color: #ffffff;
  padding: 0.5rem 2rem 0.5rem 0;
  font-size: 0.82rem;
  outline: none;
}

.arrow-right {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: #ffffff;
  font-size: 1.2rem;
  cursor: pointer;
}

.form-desc {
  font-size: 0.75rem;
  color: #888888;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.country-region-selector {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.region-label { font-size: 0.65rem; color: #666666; letter-spacing: 0.1em; }
.selected-country { font-size: 0.8rem; color: #ffffff; text-decoration: underline; }

.footer-secondary-links {
  border-top: 1px solid #222222;
  padding-top: 2rem;
  margin-bottom: 3rem;
}

.link-inline-row { display: flex; gap: 2rem; }
.link-inline-row a { color: #aaaaaa; font-size: 0.8rem; text-decoration: none; }

.footer-copyright-line {
  font-size: 0.75rem;
  color: #666666;
  margin-bottom: 3rem;
}

.footer-giant-brand {
  font-family: Didot, "Bodoni MT", Cinzel, "Times New Roman", serif;
  font-size: calc(3vw + 2.5rem);
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #ffffff;
  text-align: center;
  line-height: 1;
  opacity: 0.95;
  padding-top: 1rem;
}
</style>
