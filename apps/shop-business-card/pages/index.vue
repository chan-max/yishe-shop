<template>
  <div class="gucci-storefront-wrapper">
    <!-- Top White Luxury Header Bar -->
    <header class="gucci-header">
      <div class="gucci-header-inner">
        <div class="header-left">
          <NuxtLink to="/contact" class="header-contact-btn">
            <span class="plus-icon">+</span>
            <span>联系设计师 / 预约打样</span>
          </NuxtLink>
        </div>

        <div class="header-center">
          <NuxtLink to="/" class="gucci-brand-logo">
            名 片 工 坊 · B U S I N E S S  C A R D
          </NuxtLink>
        </div>

        <div class="header-right">
          <NuxtLink to="/search" class="header-icon-btn" title="搜索名片">
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
      <!-- 1. Full-Bleed Hero Campaign Showcase -->
      <section class="gucci-hero-section">
        <div class="hero-image-bg">
          <div class="hero-editorial-art">
            <div class="hero-model-silhouette">
              <div class="card-display-floating">
                <div class="gold-embossed-card">
                  <div class="card-monogram">BC</div>
                  <div class="card-holder-name">EXECUTIVE EDITION</div>
                  <div class="card-line">600G COTTON · 24K GOLD FOIL</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="hero-overlay-center">
          <span class="hero-subtitle">尊享商务名片定制 · 彰显卓然身份</span>
          <NuxtLink to="/search" class="gucci-btn-white">
            浏览全系列名片
          </NuxtLink>
        </div>
      </section>

      <!-- 2. Dynamic Published Products Grid -->
      <section class="gucci-collection-section">
        <div v-if="loading" class="collection-loading">
          正在加载名片工坊高定作品集…
        </div>

        <div v-else class="collection-4col-grid">
          <!-- Live Dynamic Products or Fallback Cards -->
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
                <div class="card-shadow-3d">{{ getCardEmoji(idx) }}</div>
                <span class="mockup-label">{{ getCardLabel(idx) }}</span>
              </div>
            </div>
            <div class="card-caption">
              <span class="caption-title">{{ item.name || getCardTitle(idx) }}</span>
            </div>
          </div>
        </div>

        <div class="collection-action-center">
          <NuxtLink to="/search" class="gucci-btn-gray">
            查看更多工艺名片
          </NuxtLink>
        </div>
      </section>

      <!-- 3. Business Card Atelier Services Section -->
      <section class="gucci-services-section">
        <h2 class="services-main-title">名片工坊 专属定制服务</h2>

        <div class="services-3col-grid">
          <!-- Service 1 -->
          <div class="service-card">
            <div class="service-photo-wrapper">
              <div class="service-photo photo-boutique">
                <div class="photo-overlay-icon">✍️</div>
              </div>
            </div>
            <h3 class="service-title">1对1 排版与文字排字</h3>
            <NuxtLink to="/contact" class="service-link">
              预约设计师沟通
            </NuxtLink>
          </div>

          <!-- Service 2 -->
          <div class="service-card">
            <div class="service-photo-wrapper">
              <div class="service-photo photo-types">
                <div class="photo-overlay-icon">📇</div>
              </div>
            </div>
            <h3 class="service-title">特种纸质感与烫金纸样盒</h3>
            <NuxtLink to="/contact" class="service-link">
              免费申请纸样盒
            </NuxtLink>
          </div>

          <!-- Service 3 -->
          <div class="service-card">
            <div class="service-photo-wrapper">
              <div class="service-photo photo-collect">
                <div class="photo-overlay-icon">⚡</div>
              </div>
            </div>
            <h3 class="service-title">加急打样与顺丰次日达</h3>
            <NuxtLink to="/contact" class="service-link">
              了解加急服务
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- 4. Subscription Section -->
      <section class="gucci-subscribe-section">
        <div class="subscribe-container">
          <span class="subscribe-tag">订阅名片工坊工艺资讯</span>
          <h2 class="subscribe-headline">
            获取最新特种纸材质、24K 烫金色系与商务精英名片设计灵感。
          </h2>
          <div class="subscribe-action">
            <button type="button" class="subscribe-plus-btn" @click="subscribeEmail">
              <span class="plus-symbol">+</span> 立即订阅
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
              <li><NuxtLink to="/search">查询订单状态</NuxtLink></li>
              <li><NuxtLink to="/about">特种纸材质说明</NuxtLink></li>
              <li><NuxtLink to="/contact">矢量文件规范说明</NuxtLink></li>
              <li><NuxtLink to="/search">搜索名片灵感库</NuxtLink></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4 class="col-title">关于名片工坊</h4>
            <ul>
              <li><NuxtLink to="/about">工坊品牌故事</NuxtLink></li>
              <li><NuxtLink to="/about">活字印刷与凹版工艺</NuxtLink></li>
              <li><NuxtLink to="/about">24K 烫金与浮雕技术</NuxtLink></li>
              <li><NuxtLink to="/about">FSC 环保无酸棉纸</NuxtLink></li>
            </ul>
          </div>

          <div class="footer-col col-form">
            <h4 class="col-title">加急打样与寄送</h4>
            <div class="input-with-arrow">
              <input type="text" placeholder="输入城市名称（查询顺丰时效）" />
              <span class="arrow-right">›</span>
            </div>

            <h4 class="col-title sub-form-title">订阅工艺资讯</h4>
            <p class="form-desc">订阅即可免费获取电子版《商务名片材质与烫金工艺搭配指南》。</p>
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
          <h4 class="col-title">名片定制快捷入口</h4>
          <div class="link-inline-row">
            <NuxtLink to="/about">探索活字工艺</NuxtLink>
            <NuxtLink to="/contact">预约设计师</NuxtLink>
            <NuxtLink to="/search">申请纸样盒</NuxtLink>
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

const navigateToProduct = (item: any) => {
  const router = useRouter();
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
/* GUCCI High-Fashion Luxury Design System - Pure Business Card Atelier Copy */
.gucci-storefront-wrapper {
  margin: 0;
  padding: 0;
  background: #ffffff;
  color: #000000;
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Didot, "Times New Roman", serif;
  min-height: 100vh;
  width: 100%;
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
  font-size: 0.78rem;
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

.gucci-hero-section {
  position: relative;
  width: 100%;
  height: 600px;
  background: linear-gradient(135deg, #2b3a42 0%, #0f171e 100%);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-image-bg {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-editorial-art {
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 40%, rgba(212, 163, 55, 0.15) 0%, rgba(0, 0, 0, 0.4) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-display-floating { perspective: 1000px; }

.gold-embossed-card {
  width: 330px;
  height: 195px;
  background: #0d0d0d;
  border: 1.5px solid rgba(212, 163, 55, 0.8);
  border-radius: 6px;
  padding: 1.5rem;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transform: rotateY(-10deg) rotateX(6deg);
  transition: transform 0.5s ease;
}

.gold-embossed-card:hover { transform: rotateY(0deg) rotateX(0deg); }

.card-monogram {
  font-family: Didot, serif;
  font-size: 2.2rem;
  font-weight: 900;
  color: #d4a337;
  letter-spacing: 0.1em;
}

.card-holder-name {
  font-size: 0.85rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.2em;
}

.card-line {
  font-size: 0.65rem;
  color: #d4a337;
  letter-spacing: 0.15em;
}

.hero-overlay-center {
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
}

.hero-subtitle {
  color: #ffffff;
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-shadow: 0 2px 4px rgba(0,0,0,0.6);
}

.gucci-btn-white {
  background: #ffffff;
  color: #000000;
  padding: 0.75rem 2.5rem;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
}

.gucci-btn-white:hover { background: #f0f0f0; }

.gucci-collection-section { background: #ffffff; }

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

.collection-card:hover .photo-img-cover { transform: scale(1.04); }

.tone-pink .card-photo-container { background: linear-gradient(180deg, #3a2228 0%, #1f1115 100%); }
.tone-canvas .card-photo-container { background: linear-gradient(180deg, #4a3e2e 0%, #2b2216 100%); }
.tone-navy .card-photo-container { background: linear-gradient(180deg, #1b2631 0%, #0d131a 100%); }
.tone-blue .card-photo-container { background: linear-gradient(180deg, #2c3e50 0%, #1a252f 100%); }

.photo-product-mockup {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  gap: 1rem;
  transition: transform 0.4s ease;
}

.collection-card:hover .photo-product-mockup { transform: scale(1.04); }

.card-shadow-3d {
  font-size: 4rem;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.4));
}

.mockup-label {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.25em;
  opacity: 0.9;
}

.card-caption {
  padding: 1.25rem 1rem;
  text-align: center;
  background: #ffffff;
}

.caption-title {
  font-size: 0.85rem;
  color: #000000;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.collection-action-center {
  text-align: center;
  padding: 3rem 1rem;
  background: #ffffff;
}

.gucci-btn-gray {
  background: #e0e0e0;
  color: #000000;
  padding: 0.85rem 3rem;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-decoration: none;
  display: inline-block;
  transition: all 0.2s ease;
}

.gucci-btn-gray:hover { background: #d0d0d0; }

.gucci-services-section {
  padding: 5rem 2rem 4rem;
  background: #ffffff;
  text-align: center;
}

.services-main-title {
  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  color: #000000;
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

.service-card { display: flex; flex-direction: column; align-items: center; }

.service-photo-wrapper {
  width: 100%;
  height: 320px;
  background: #f5f5f5;
  margin-bottom: 1.5rem;
  overflow: hidden;
}

.service-photo {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.4s ease;
}

.service-card:hover .service-photo { transform: scale(1.03); }

.photo-boutique { background: #e8e8e8; }
.photo-types { background: #1a1a1a; color: #d4a337; }
.photo-collect { background: #dcdcdc; }

.photo-overlay-icon { font-size: 3.5rem; }

.service-title {
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: #000000;
  margin: 0 0 0.5rem;
}

.service-link {
  font-size: 0.8rem;
  color: #666666;
  text-decoration: underline;
}

.gucci-subscribe-section {
  background: #000000;
  color: #ffffff;
  padding: 5rem 2rem;
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
  letter-spacing: 0.2em;
  color: #ffffff;
}

.subscribe-headline {
  font-size: 1.35rem;
  font-weight: 400;
  line-height: 1.6;
  color: #ffffff;
}

.subscribe-plus-btn {
  background: none;
  border: none;
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
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
