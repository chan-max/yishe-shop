<template>
  <div class="gucci-storefront-wrapper">
    <!-- Top White Luxury Header Bar -->
    <header class="gucci-header">
      <div class="gucci-header-inner">
        <div class="header-left">
          <NuxtLink to="/contact" class="header-contact-btn animated-hover-link">
            <span class="plus-icon">+</span>
            <span>个人与小微企业 · 0元免费名片设计</span>
          </NuxtLink>
        </div>

        <div class="header-center">
          <NuxtLink to="/" class="gucci-brand-logo logo-hover-effect">
            名 片 设 计 工 坊 · B U S I N E S S  C A R D
          </NuxtLink>
        </div>

        <div class="header-right">
          <NuxtLink v-if="!user" to="/login" class="header-contact-btn underline-slide" style="margin-right: 0.5rem;">登录 / 注册</NuxtLink>
          <span v-else class="user-greeting" style="font-size: 0.8rem; font-weight: 700; color: #d4a337; margin-right: 0.5rem;">{{ user.username || 'VIP 会员' }}</span>
          <NuxtLink to="/search" class="header-icon-btn icon-hover-bounce" title="搜索设计灵感">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </NuxtLink>
          <NuxtLink to="/contact" class="header-icon-btn icon-hover-bounce" title="免费预约设计">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </NuxtLink>
          <NuxtLink to="/search" class="header-icon-btn icon-hover-bounce" title="免费设计库">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </NuxtLink>
          <NuxtLink to="/about" class="header-menu-btn icon-hover-bounce">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            <span class="menu-label">免费设计菜单</span>
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Main Full-Bleed Editorial Layout -->
    <main class="gucci-main">
      <!-- 1. GUCCI Dual 2-Column Split Hero Stage (经典双色块 Hero 舞台 - 左柔和暖白/象牙色块，右深邃黑金/钛钢色块) -->
      <section class="gucci-split-hero-stage">
        <div class="split-hero-grid">
          <!-- Left Column (Ivory Warm Color Block) -->
          <div
            class="split-hero-column left-color-block interactive-split-card"
            @click="navigateToHeroProduct(0)"
          >
            <div class="color-block-inner">
              <span class="editorial-badge">COLLECTION I · 活字凹版工艺</span>
              <h2 class="split-card-title">
                {{ heroLeftProduct ? heroLeftProduct.name : '600g 活字凹版纯棉纸名片设计' }}
              </h2>
              <p class="split-card-desc">
                {{ heroLeftProduct ? heroLeftProduct.description : '600g 进口纯棉纸搭配传统活字凹版压印，呈现触感极佳的立体字痕。' }}
              </p>

              <!-- Card Mockup inside Color Block -->
              <div class="block-card-mockup light-card-mockup">
                <div class="m-row-top">
                  <span>LETTERPRESS</span>
                  <span>600GSM</span>
                </div>
                <div class="m-row-center">
                  <span class="m-name">ALEXANDER SMITH</span>
                  <span class="m-sub">CHIEF DESIGN OFFICER</span>
                </div>
                <div class="m-row-bottom">
                  <span>0元免费排字</span>
                  <span>支持设计同款</span>
                </div>
              </div>

              <div class="split-action-link shine-arrow">
                <span>免费设计同款 ➔</span>
              </div>
            </div>
          </div>

          <!-- Right Column (Ebony Gold Dark Color Block) -->
          <div
            class="split-hero-column right-color-block interactive-split-card"
            @click="navigateToHeroProduct(1)"
          >
            <div class="color-block-inner">
              <span class="editorial-badge gold-badge">COLLECTION II · 24K 浮雕烫金</span>
              <h2 class="split-card-title gold-text">
                {{ heroRightProduct ? heroRightProduct.name : '24K 浮雕热压金黑卡名片设计' }}
              </h2>
              <p class="split-card-desc light-desc">
                {{ heroRightProduct ? heroRightProduct.description : '500g 哑光黑卡配合 24K 浮雕热压金箔，展现极致黑金奢华质感。' }}
              </p>

              <!-- Card Mockup inside Color Block -->
              <div class="block-card-mockup dark-gold-card-mockup">
                <div class="m-row-top gold-text">
                  <span>24K GOLD FOIL</span>
                  <span>MATTE BLACK</span>
                </div>
                <div class="m-row-center">
                  <span class="m-name gold-text">VICTORIA CHEN</span>
                  <span class="m-sub">FOUNDER & CEO</span>
                </div>
                <div class="m-row-bottom gold-text">
                  <span>小微企业 0元免费设计</span>
                  <span>即刻预约排版</span>
                </div>
              </div>

              <div class="split-action-link shine-arrow gold-text">
                <span>免费设计同款 ➔</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Center Editorial Banner Text Below Split Stage -->
        <div class="split-hero-caption-bar">
          <span class="caption-tag">FREE BUSINESS CARD DESIGN & INSPIRATION ATELIER</span>
          <h1 class="caption-headline">名片免费设计 · 汇聚全网灵感库</h1>
          <p class="caption-lead">
            专为独立创作者、个人创业者与初创小微团队提供 0 元免费名片排字、矢量 Logo 适配与 24 小时电子稿输出。
          </p>
          <div class="caption-btn-row">
            <NuxtLink to="/contact" class="gucci-btn-gold ripple-btn">
              申请 0 元免费名片设计 (FREE DESIGN)
            </NuxtLink>
            <NuxtLink to="/search" class="gucci-btn-outline-dark ripple-btn">
              探索名片设计灵感库
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- 2. Free Design Service Banner for Individuals & Small Businesses -->
      <section class="gucci-free-design-banner">
        <div class="free-design-inner">
          <div class="free-badge">FOR INDIVIDUALS & STARTUPS</div>
          <h2 class="free-title">为个人与小微企业提供 0 元免费名片设计</h2>
          <p class="free-desc">
            无隐形费用，无门槛限制。无论您是独立自由职业者、个人创业者、还是初创小微团队，名片工坊资深设计师免费为您提供专业版面排字、Logo 矢量微调与 24 小时电子稿输出。
          </p>
          <div class="free-features-row">
            <div class="free-feature-item hover-lift-sm">
              <svg class="f-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>0 元免费出设计矢量稿</span>
            </div>
            <div class="free-feature-item hover-lift-sm">
              <svg class="f-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>24小时快速交付初稿</span>
            </div>
            <div class="free-feature-item hover-lift-sm">
              <svg class="f-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>支持全量设计风格同款</span>
            </div>
          </div>
          <NuxtLink to="/contact" class="free-cta-btn ripple-btn">
            立即申请 0元免费设计 ›
          </NuxtLink>
        </div>
      </section>

      <!-- 3. Dynamic 4-Column High-Fashion Color-Tone Showcase -->
      <section class="gucci-collection-section">
        <div class="section-title-bar">
          <span class="section-badge">INSPIRATION GALLERY</span>
          <h2 class="section-main-heading">热门名片设计灵感 · 点击免费设计同款</h2>
        </div>

        <div v-if="loading" class="collection-loading">
          <div class="spinner-ring"></div>
          <span>正在加载名片设计灵感库…</span>
        </div>

        <div v-else class="collection-4col-grid">
          <!-- Live Dynamic Products or High-End Mockup Cards -->
          <div
            v-for="(item, idx) in displayProducts"
            :key="item.id || idx"
            class="collection-card interactive-collection-card"
            :class="getCardToneClass(idx)"
            @click="navigateToProduct(item)"
          >
            <div class="card-photo-container">
              <img
                v-if="getProductImage(item)"
                :src="getProductImage(item)"
                :alt="item.name"
                class="photo-img-cover zoom-on-hover"
              />
              <div v-else class="photo-product-mockup" :class="getMockupBgClass(idx)">
                <div class="card-mockup-inner">
                  <div class="card-icon-svg icon-pulse">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <rect x="3" y="4" width="18" height="16" rx="0"></rect>
                      <line x1="7" y1="8" x2="17" y2="8"></line>
                      <line x1="7" y1="12" x2="13" y2="12"></line>
                    </svg>
                  </div>
                  <span class="mockup-label">{{ getCardLabel(idx) }}</span>
                  <span class="mockup-sublabel">{{ getCardSublabel(idx) }}</span>
                </div>
              </div>
              <div class="card-hover-overlay slide-up-overlay">
                <span class="overlay-btn-text">免费设计同款风格 ›</span>
              </div>
            </div>
            <div class="card-caption">
              <span class="caption-title">{{ item.name || getCardTitle(idx) }}</span>
              <span class="caption-price">设计服务：0元免费设计 (同款印制参考 ${{ item.price || '88.00' }})</span>
            </div>
          </div>
        </div>

        <div class="collection-action-center">
          <NuxtLink to="/search" class="gucci-btn-gray ripple-btn">
            探索更多设计灵感 (BROWSE ALL INSPIRATIONS)
          </NuxtLink>
        </div>
      </section>

      <!-- 4. Business Card Atelier Services Section -->
      <section class="gucci-services-section">
        <span class="section-badge">FREE ATELIER SERVICES</span>
        <h2 class="services-main-title">名片工坊 免费设计与灵感服务</h2>

        <div class="services-3col-grid">
          <!-- Service 1 -->
          <div class="service-card interactive-service-card" @click="goTo('/contact')">
            <div class="service-photo-wrapper">
              <div class="service-photo photo-boutique">
                <div class="photo-svg-icon icon-bounce-on-hover">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
                    <path d="M12 19l7-73-7-7-7 7 7 7zm0 0v-8"></path>
                    <path d="M18 13l-6 6-6-6"></path>
                  </svg>
                </div>
                <div class="service-hover-shine"></div>
              </div>
            </div>
            <h3 class="service-title">个人与小微企业 0元免费设计</h3>
            <p class="service-desc">专为独立创作者与初创小微团队提供 0 元免费版面排字与 Logo 适配</p>
            <NuxtLink to="/contact" class="service-link underline-slide">
              立即免费申请设计 ›
            </NuxtLink>
          </div>

          <!-- Service 2 -->
          <div class="service-card interactive-service-card" @click="goTo('/search')">
            <div class="service-photo-wrapper">
              <div class="service-photo photo-types">
                <div class="photo-svg-icon gold-svg icon-bounce-on-hover">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
                    <rect x="3" y="3" width="18" height="18" rx="0"></rect>
                    <path d="M3 9h18M9 21V9"></path>
                  </svg>
                </div>
                <div class="service-hover-shine"></div>
              </div>
            </div>
            <h3 class="service-title">全网名片灵感 · 免费设计同款</h3>
            <p class="service-desc">挑选喜欢的名片设计风格，设计师免费全量替换文字与专属视觉</p>
            <NuxtLink to="/search" class="service-link underline-slide">
              探索同款灵感模板 ›
            </NuxtLink>
          </div>

          <!-- Service 3 -->
          <div class="service-card interactive-service-card" @click="goTo('/contact')">
            <div class="service-photo-wrapper">
              <div class="service-photo photo-collect">
                <div class="photo-svg-icon icon-bounce-on-hover">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                </div>
                <div class="service-hover-shine"></div>
              </div>
            </div>
            <h3 class="service-title">24 小时免费矢量打样交付</h3>
            <p class="service-desc">提交需求后 24 小时出具电子版高清 PDF/SVG 矢量稿供审核</p>
            <NuxtLink to="/contact" class="service-link underline-slide">
              申请免费矢量打样 ›
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- 5. Subscription Section -->
      <section class="gucci-subscribe-section">
        <div class="subscribe-container">
          <span class="subscribe-tag">SUBSCRIBE TO FREE DESIGN INSIGHTS</span>
          <h2 class="subscribe-headline">
            订阅设计工坊，免费获取全球最新名片设计趋势、排版灵感与特种纸搭配指南。
          </h2>
          <div class="subscribe-action">
            <button type="button" class="subscribe-plus-btn ripple-btn" @click="subscribeEmail">
              <span class="plus-symbol">+</span> 免费订阅设计灵感
            </button>
          </div>
        </div>
      </section>
    </main>

    <!-- 6. Luxury Black Multi-Column Footer -->
    <footer class="gucci-footer">
      <div class="footer-inner">
        <div class="footer-columns">
          <div class="footer-col">
            <h4 class="col-title">免费设计服务与支持</h4>
            <ul>
              <li><NuxtLink to="/contact" class="footer-hover-link">个人与小微企业免费设计</NuxtLink></li>
              <li><NuxtLink to="/search" class="footer-hover-link">搜索名片设计灵感</NuxtLink></li>
              <li><NuxtLink to="/about" class="footer-hover-link">名片排版与字体指南</NuxtLink></li>
              <li><NuxtLink to="/contact" class="footer-hover-link">Logo 矢量文件免费调整</NuxtLink></li>
              <li><NuxtLink to="/search" class="footer-hover-link">名片免费设计灵感库</NuxtLink></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4 class="col-title">关于设计工坊</h4>
            <ul>
              <li><NuxtLink to="/about" class="footer-hover-link">工坊 0元免费设计理念</NuxtLink></li>
              <li><NuxtLink to="/about" class="footer-hover-link">活字凹版排字工艺</NuxtLink></li>
              <li><NuxtLink to="/about" class="footer-hover-link">24K 烫金与设计艺术</NuxtLink></li>
              <li><NuxtLink to="/about" class="footer-hover-link">FSC 环保特种纸搭配</NuxtLink></li>
            </ul>
          </div>

          <div class="footer-col col-form">
            <h4 class="col-title">免费打样方案查询</h4>
            <div class="input-with-arrow interactive-input-box">
              <input type="text" placeholder="输入城市名称（查询设计师交付时效）" class="sharp-input" />
              <span class="arrow-right hover-bounce">›</span>
            </div>

            <h4 class="col-title sub-form-title">订阅设计灵感</h4>
            <p class="form-desc">免费获取电子版《商务精英名片排版与设计灵感手册》。</p>
            <div class="input-with-arrow interactive-input-box">
              <input type="email" placeholder="输入您的电子邮箱" v-model="emailInput" class="sharp-input" />
              <span class="arrow-right hover-bounce" @click="submitEmail">›</span>
            </div>

            <div class="country-region-selector">
              <span class="region-label">服务地区 / REGION</span>
              <span class="selected-country">中国 Mainland China / Global Express</span>
            </div>
          </div>
        </div>

        <div class="footer-secondary-links">
          <h4 class="col-title">名片免费设计快捷通道</h4>
          <div class="link-inline-row">
            <NuxtLink to="/contact" class="footer-hover-link">0元申请免费设计</NuxtLink>
            <NuxtLink to="/search" class="footer-hover-link">免费设计同款</NuxtLink>
            <NuxtLink to="/contact" class="footer-hover-link">预约设计师 1对1 沟通</NuxtLink>
          </div>
        </div>

        <div class="footer-copyright-line">
          © 2026 名片设计工坊 Business Card Design Atelier. 保留所有权利。专为个人与小微企业提供 0 元免费名片设计服务。
        </div>

        <!-- Giant Serif Logo -->
        <div class="footer-giant-brand logo-glow-on-hover">
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
  title: '名片免费设计 · 个人与小微企业 0 元免费定制 | 名片设计工坊',
  ogTitle: '名片免费设计 · 个人与小微企业 0 元免费定制 | BUSINESS CARD',
  description: '名片设计工坊专为个人与小微企业提供 0 元免费名片设计服务，汇聚全网名片灵感库，支持免费设计同款与 24 小时矢量出稿。',
  ogDescription: '专为个人与小微企业提供 0 元免费名片设计服务，汇聚全网名片灵感库。'
});

useHead({
  title: '名片免费设计 · 个人与小微企业 0 元免费定制 | 名片设计工坊',
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📇</text></svg>' }
  ]
});

const router = useRouter();
const { fetchPublishedProducts, getPublishedProductImage } = usePublishedProducts();

const user = ref<any>(null);
const loading = ref(true);
const products = ref<any[]>([]);
const emailInput = ref('');

const heroLeftProduct = computed(() => {
  return products.value[0] || null;
});

const heroRightProduct = computed(() => {
  return products.value[1] || null;
});

const fallbackPreset = [
  { id: 'pres-1', name: '凹版活字压印设计 (Executive Letterpress)', key: 'letterpress' },
  { id: 'pres-2', name: '24K 浮雕烫金设计 (Gold Foil Embossed)', key: 'gold-foil' },
  { id: 'pres-3', name: '钛钢极客精印设计 (Metal Steel Edition)', key: 'steel' },
  { id: 'pres-4', name: '触感特种纸艺设计 (Specialty Paper Crafts)', key: 'specialty' }
];

const displayProducts = computed(() => {
  if (products.value.length > 0) {
    return products.value.slice(0, 4);
  }
  return fallbackPreset;
});

const getProductImage = (item: any) => {
  if (item && item.images && item.images.length > 0) return item.images[0];
  return getPublishedProductImage(item);
};

const goTo = (path: string) => {
  router.push(path);
};

const navigateToHeroProduct = (index: number) => {
  const item = index === 0 ? heroLeftProduct.value : heroRightProduct.value;
  if (item && item.id && !item.id.startsWith('pres-')) {
    router.push(`/product/${item.id}`);
  } else {
    router.push(`/search`);
  }
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

const getCardLabel = (idx: number) => {
  const labels = ['LETTERPRESS', 'GOLD FOIL', 'METAL STEEL', 'SPECIALTY PAPER'];
  return labels[idx % labels.length];
};

const getCardSublabel = (idx: number) => {
  const sublabels = ['600g 活字棉纸免费设计', '24K 热压金箔免费设计', '拉丝钛钢精印免费设计', '触感绒面特种纸免费设计'];
  return sublabels[idx % sublabels.length];
};

const getCardTitle = (idx: number) => {
  const titles = [
    '凹版活字压印设计 (Executive Letterpress)',
    '24K 浮雕烫金设计 (Gold Foil Embossed)',
    '钛钢极客精印设计 (Metal Steel Edition)',
    '触感特种纸艺设计 (Specialty Paper Crafts)'
  ];
  return titles[idx % titles.length];
};

const subscribeEmail = () => {
  alert('感谢订阅名片设计工坊！电子版《商务精英名片排字与设计灵感手册》已发至您的邮箱。');
};

const submitEmail = () => {
  if (emailInput.value) {
    alert(`感谢订阅！${emailInput.value} 已成功加入名片设计灵感推送列表。`);
    emailInput.value = '';
  }
};

onMounted(async () => {
  try {
    const publicUserStore = usePublicUserStore();
    if (publicUserStore.user) {
      user.value = publicUserStore.user;
    }
  } catch (e) {}

  try {
    loading.value = true;
    const res = await fetchPublishedProducts({ page: 1, limit: 8 });
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
/* GUCCI Luxury Design System - Solid Color Block Hero Banner (Left Ivory, Right Dark Gold) */
.gucci-storefront-wrapper {
  margin: 0;
  padding: 0;
  background: #ffffff;
  color: #000000;
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Didot, "Times New Roman", serif;
  min-height: 100vh;
  width: 100%;
}

input, select, textarea, button, .gucci-btn-gold, .gucci-btn-outline, .gucci-btn-outline-dark, .gucci-btn-white, .gucci-btn-gray, .subscribe-plus-btn, .free-cta-btn {
  border-radius: 0 !important;
}

/* Micro-Interactions */
.ripple-btn {
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.ripple-btn::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -60%;
  width: 50%;
  height: 200%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.35) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: rotate(30deg);
  transition: all 0.6s ease;
}

.ripple-btn:hover::after {
  left: 130%;
}

.ripple-btn:active {
  transform: scale(0.96) !important;
}

.zoom-on-hover {
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}

.interactive-collection-card:hover .zoom-on-hover {
  transform: scale(1.06);
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
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: 0.12em;
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

/* 1. GUCCI Dual Solid Color-Block Hero Stage (左柔和暖白/象牙色块，右深邃黑金/钛钢色块) */
.gucci-split-hero-stage {
  width: 100%;
  background: #f7f5f0;
  border-bottom: 1px solid #e5e0d8;
}

.split-hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  min-height: 520px;
}

@media (max-width: 860px) {
  .split-hero-grid {
    grid-template-columns: 1fr;
  }
}

.split-hero-column {
  padding: 4rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

/* Left Ivory Warm Color Block */
.left-color-block {
  background: #f3f0e8;
  color: #000000;
  border-right: 1px solid #e2ddd3;
}

/* Right Ebony Dark Color Block */
.right-color-block {
  background: #111419;
  color: #ffffff;
}

.interactive-split-card:hover {
  transform: scale(1.01);
  z-index: 5;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.color-block-inner {
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.editorial-badge {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.25em;
  color: #888888;
}

.gold-badge {
  color: #d4a337 !important;
}

.split-card-title {
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  margin: 0;
  line-height: 1.3;
}

.split-card-desc {
  font-size: 0.88rem;
  color: #555555;
  line-height: 1.6;
  margin: 0;
}

.light-desc {
  color: #aaaaaa !important;
}

/* Block Card Mockup Box */
.block-card-mockup {
  width: 100%;
  height: 160px;
  border: 1px solid #d8d3c7;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0.5rem 0;
  transition: transform 0.3s ease;
}

.light-card-mockup {
  background: #ffffff;
  color: #000000;
}

.dark-gold-card-mockup {
  background: #000000;
  border-color: rgba(212, 163, 55, 0.6);
  color: #ffffff;
}

.interactive-split-card:hover .block-card-mockup {
  transform: translateY(-4px);
}

.m-row-top, .m-row-bottom {
  display: flex;
  justify-content: space-between;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: #888888;
}

.m-row-center {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.m-name {
  font-size: 0.95rem;
  font-weight: 800;
  letter-spacing: 0.1em;
}

.m-sub {
  font-size: 0.68rem;
  color: #666666;
}

.gold-text {
  color: #d4a337 !important;
}

.split-action-link {
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: #000000;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

/* Center Hero Caption Bar Below Split Stage */
.split-hero-caption-bar {
  max-width: 900px;
  margin: 0 auto;
  padding: 3.5rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.caption-tag {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.25em;
  color: #b38218;
  display: block;
  margin-bottom: 0.75rem;
}

.caption-headline {
  font-size: 2.2rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #000000;
  margin: 0 0 1rem;
}

.caption-lead {
  font-size: 1rem;
  color: #555555;
  line-height: 1.7;
  max-width: 720px;
  margin-bottom: 2rem;
}

.caption-btn-row {
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

.gucci-btn-outline-dark {
  background: transparent;
  color: #000000;
  border: 1px solid #000000;
  padding: 0.85rem 2.5rem;
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-decoration: none;
  transition: all 0.2s ease;
}

.gucci-btn-outline-dark:hover {
  background: #000000;
  color: #ffffff;
  transform: translateY(-2px);
}

/* Free Design Banner */
.gucci-free-design-banner {
  background: #f7f5f0;
  border-bottom: 1px solid #e8e4da;
  padding: 4.5rem 2rem;
  text-align: center;
}

.free-design-inner {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.free-badge {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.25em;
  color: #b38218;
  margin-bottom: 0.75rem;
}

.free-title {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #111111;
  margin: 0 0 1rem;
}

.free-desc {
  font-size: 0.95rem;
  color: #555555;
  line-height: 1.7;
  max-width: 760px;
  margin-bottom: 2rem;
}

.free-features-row {
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  margin-bottom: 2.5rem;
}

@media (max-width: 768px) {
  .free-features-row {
    flex-direction: column;
    gap: 1rem;
  }
}

.free-feature-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.88rem;
  font-weight: 700;
  color: #111111;
  transition: transform 0.25s ease;
}

.hover-lift-sm:hover {
  transform: translateY(-3px);
  color: #b38218;
}

.f-svg {
  width: 18px;
  height: 18px;
  stroke: #b38218;
}

.free-cta-btn {
  background: #111111;
  color: #ffffff;
  padding: 1rem 3rem;
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-decoration: none;
}

.free-cta-btn:hover {
  background: #333333;
}

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
}

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
}

.card-mockup-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.card-icon-svg svg {
  width: 54px;
  height: 54px;
  stroke: #d4a337;
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
}

.gucci-btn-gray:hover {
  background: #333333;
  transform: translateY(-2px);
}

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
}

.photo-boutique { background: #e8e8e8; color: #000000; }
.photo-types { background: #1a1a1a; color: #d4a337; }
.photo-collect { background: #dcdcdc; color: #000000; }

.photo-svg-icon svg {
  width: 52px;
  height: 52px;
}

.gold-svg svg {
  stroke: #d4a337;
}

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
}

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
}

.subscribe-plus-btn:hover {
  background: #e5e5e5;
  transform: scale(1.03);
}

.plus-symbol { font-size: 1rem; }

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
}

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
  border-radius: 0 !important;
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
  transition: all 0.4s ease;
}

.logo-glow-on-hover:hover {
  color: #d4a337;
  text-shadow: 0 0 30px rgba(212, 163, 55, 0.4);
}
</style>
