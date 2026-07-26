<template>
  <div class="gucci-product-detail-wrapper">
    <!-- Top Header -->
    <header class="gucci-header">
      <div class="gucci-header-inner">
        <div class="header-left">
          <button type="button" class="back-link-btn underline-slide" @click="goBack">
            ‹ 返回全量名片设计库
          </button>
        </div>
        <div class="header-center">
          <NuxtLink to="/" class="gucci-brand-logo logo-hover-effect">
            名 片 设 计 工 坊 · B U S I N E S S  C A R D
          </NuxtLink>
        </div>
        <div class="header-right">
          <NuxtLink to="/search" class="header-icon-link underline-slide">搜索设计灵感</NuxtLink>
        </div>
      </div>
    </header>

    <main class="gucci-detail-container">
      <div v-if="loading" class="detail-loading">
        <div class="spinner-ring"></div>
        <span>正在读取名片设计方案与排版参数…</span>
      </div>

      <div v-else-if="!product" class="detail-not-found">
        <h2>名片设计方案不存在或已更新</h2>
        <p>抱歉，您查看的名片设计样稿暂不可用。</p>
        <NuxtLink to="/search" class="gucci-btn-black ripple-btn">查看全量名片设计库</NuxtLink>
      </div>

      <div v-else class="detail-content-grid">
        <!-- Gallery Section -->
        <div class="gallery-section">
          <div class="main-image-box zoom-box-wrapper">
            <img
              v-if="currentImage"
              :src="currentImage"
              :alt="product.name"
              class="main-img zoom-on-hover"
            />
            <div v-else class="main-img-placeholder">
              <svg class="placeholder-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="3" y="4" width="18" height="16" rx="0"></rect>
                <line x1="7" y1="8" x2="17" y2="8"></line>
                <line x1="7" y1="12" x2="13" y2="12"></line>
              </svg>
              <span class="placeholder-text">DESIGN PORTFOLIO SAMPLE</span>
            </div>
          </div>

          <div v-if="product.images && product.images.length > 1" class="thumb-list">
            <img
              v-for="(img, idx) in product.images"
              :key="idx"
              :src="img"
              class="thumb-item interactive-thumb"
              :class="{ active: currentImage === img }"
              @click="currentImage = img"
            />
          </div>
        </div>

        <!-- Product Specs & Purchase Options -->
        <div class="specs-section">
          <div class="specs-header">
            <span class="collection-tag badge-pulse">DESIGN STYLE · 热门名片设计作品</span>
            <h1 class="product-title">{{ product.name }}</h1>
            <div class="product-price-line">
              <span class="price-val">设计服务：0元免费设计 (印制参考 ${{ product.price || '88.00' }})</span>
              <span class="tax-note">包含设计师 1对1 文字与 Logo 适配服务</span>
            </div>
          </div>

          <div class="divider"></div>

          <p class="product-full-desc">
            {{ product.description || '支持一键免费设计同款。挑选此设计风格，资深设计师将为您免费替换姓名、职务、公司 Logo 与联系信息，并出具高清 24 小时矢量打印方案。' }}
          </p>

          <!-- Craftsmanship Options -->
          <div class="craft-option-group">
            <label class="option-label">选择纸张材质与克重 (PAPER STOCK)</label>
            <div class="option-chips">
              <button
                v-for="paper in paperOptions"
                :key="paper"
                type="button"
                class="chip-btn ripple-btn"
                :class="{ selected: selectedPaper === paper }"
                @click="selectedPaper = paper"
              >
                {{ paper }}
              </button>
            </div>
          </div>

          <div class="craft-option-group">
            <label class="option-label">选择烫金/烫银色彩 (FOIL COLOR)</label>
            <div class="option-chips">
              <button
                v-for="foil in foilOptions"
                :key="foil"
                type="button"
                class="chip-btn ripple-btn"
                :class="{ selected: selectedFoil === foil }"
                @click="selectedFoil = foil"
              >
                {{ foil }}
              </button>
            </div>
          </div>

          <div class="craft-option-group">
            <label class="option-label">定制印制盒数 (100张/盒)</label>
            <div class="quantity-selector">
              <button type="button" class="qty-btn" @click="qty > 1 && qty--">-</button>
              <span class="qty-num">{{ qty }} 盒 (共 {{ qty * 100 }} 张)</span>
              <button type="button" class="qty-btn" @click="qty++">+</button>
            </div>
          </div>

          <!-- Action Button Focus on Free Design Same Style -->
          <div class="action-btn-row">
            <button type="button" class="btn-checkout-black ripple-btn" @click="handleOrder">
              ✨ 立即申请 0 元免费设计同款
            </button>
            <button type="button" class="btn-inquire-border ripple-btn" @click="inquireDesigner">
              预约 1对1 灵感沟通与排版
            </button>
          </div>

          <!-- Guarantee Vector SVG Icons -->
          <div class="guarantee-row">
            <div class="g-item hover-lift-sm">
              <svg class="g-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M12 19l7-73-7-7-7 7 7 7zm0 0v-8"></path>
              </svg>
              <span>资深设计师 1对1 免费排版</span>
            </div>
            <div class="g-item hover-lift-sm">
              <svg class="g-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <rect x="3" y="3" width="18" height="18" rx="0"></rect>
                <path d="M3 9h18M9 21V9"></path>
              </svg>
              <span>24小时 免费矢量试样稿</span>
            </div>
          </div>
        </div>
      </div>
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

const route = useRoute();
const router = useRouter();
const { fetchProductDetail, getPublishedProductImage } = usePublishedProducts();

const loading = ref(true);
const product = ref<any>(null);
const currentImage = ref<string>('');
const qty = ref(1);

const paperOptions = ['600g 进口纯棉纸', '500g 哑光黑卡', '400g 绒面触感纸'];
const selectedPaper = ref('600g 进口纯棉纸');

const foilOptions = ['24K 哑光金箔', '亮银镜面箔', '璀璨黑金', '无色凹压字'];
const selectedFoil = ref('24K 哑光金箔');

const goBack = () => {
  router.back();
};

const handleOrder = () => {
  alert(`为您开启 ${product.value?.name} 的【0元免费设计同款】排版流程！资深设计师将在 24 小时内为您免费出具专属姓名、职务与 Logo 的矢量试样稿。`);
};

const inquireDesigner = () => {
  router.push('/contact');
};

onMounted(async () => {
  const id = route.params.id as string;
  try {
    loading.value = true;
    const res = await fetchProductDetail(id);
    if (res) {
      product.value = res;
      currentImage.value = (res.images && res.images[0]) || getPublishedProductImage(res);

      useSeoMeta({
        title: `${res.name} - 0元免费设计同款 | 名片设计工坊 | BUSINESS CARD`,
        ogTitle: `${res.name} - 免费设计同款 | BUSINESS CARD`,
        description: res.description || '挑选名片设计风格，一键免费设计同款。',
        ogDescription: res.description || '挑选名片设计风格，一键免费设计同款。'
      });
    }
  } catch (e) {
    console.error('Failed to load product detail:', e);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.gucci-product-detail-wrapper {
  background: #ffffff;
  color: #000000;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", Didot, "Times New Roman", serif;
}

input, select, textarea, button, .chip-btn, .btn-checkout-black, .btn-inquire-border, .gucci-btn-black {
  border-radius: 0 !important;
}

/* Micro-Interactions */
.ripple-btn {
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.ripple-btn:active {
  transform: scale(0.96) !important;
}

.zoom-on-hover {
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}

.zoom-box-wrapper:hover .zoom-on-hover {
  transform: scale(1.06);
}

.interactive-thumb {
  transition: all 0.25s ease;
}

.interactive-thumb:hover {
  transform: scale(1.08);
  border-color: #d4a337 !important;
}

.hover-lift-sm:hover {
  transform: translateY(-2px);
  color: #d4a337;
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

.back-link-btn, .header-icon-link {
  background: none;
  border: none;
  color: #000000;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
}

.gucci-brand-logo {
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #000000;
  text-decoration: none;
}

.gucci-detail-container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.detail-content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

@media (max-width: 900px) {
  .detail-content-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

.gallery-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.main-image-box {
  width: 100%;
  height: 500px;
  background: #f5f5f5;
  overflow: hidden;
}

.main-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.main-img-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%);
  color: #d4a337;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.placeholder-svg { width: 56px; height: 56px; stroke: #d4a337; }
.placeholder-text { font-size: 0.8rem; font-weight: 800; letter-spacing: 0.2em; color: #ffffff; }

.thumb-list {
  display: flex;
  gap: 0.75rem;
}

.thumb-item {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border: 1px solid transparent;
  cursor: pointer;
  border-radius: 0 !important;
}

.thumb-item.active {
  border-color: #000000;
}

.specs-section {
  display: flex;
  flex-direction: column;
}

.collection-tag {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: #d4a337;
  display: block;
  margin-bottom: 0.35rem;
}

.product-title {
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  margin: 0 0 1rem;
}

.product-price-line {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.price-val {
  font-size: 1.35rem;
  font-weight: 700;
}

.tax-note {
  font-size: 0.78rem;
  color: #777777;
}

.divider {
  height: 1px;
  background: #e5e5e5;
  margin-bottom: 1.5rem;
}

.product-full-desc {
  font-size: 0.9rem;
  color: #444444;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.craft-option-group {
  margin-bottom: 1.75rem;
}

.option-label {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: #000000;
  display: block;
  margin-bottom: 0.6rem;
}

.option-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.chip-btn {
  background: #ffffff;
  border: 1px solid #cccccc;
  padding: 0.55rem 1rem;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 0 !important;
}

.chip-btn.selected, .chip-btn:hover {
  background: #000000;
  color: #ffffff;
  border-color: #000000;
}

.quantity-selector {
  display: inline-flex;
  align-items: center;
  border: 1px solid #cccccc;
  border-radius: 0 !important;
}

.qty-btn {
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s ease;
  border-radius: 0 !important;
}

.qty-btn:hover {
  background: #000000;
  color: #ffffff;
}

.qty-num {
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 700;
}

.action-btn-row {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin-top: 1rem;
  margin-bottom: 2.5rem;
}

.btn-checkout-black {
  background: #000000;
  color: #ffffff;
  border: none;
  padding: 1.1rem;
  font-size: 0.88rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: background 0.2s ease;
  border-radius: 0 !important;
}

.btn-checkout-black:hover {
  background: #222222;
}

.btn-inquire-border {
  background: #ffffff;
  color: #000000;
  border: 1px solid #000000;
  padding: 0.9rem;
  font-size: 0.82rem;
  font-weight: 800;
  cursor: pointer;
  transition: background 0.2s ease;
  border-radius: 0 !important;
}

.btn-inquire-border:hover {
  background: #f5f5f5;
}

.guarantee-row {
  display: flex;
  gap: 2rem;
  font-size: 0.78rem;
  color: #666666;
  border-top: 1px solid #e5e5e5;
  padding-top: 1.5rem;
}

.g-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.25s ease;
}

.g-svg {
  width: 18px;
  height: 18px;
  stroke: #000000;
}

.detail-loading, .detail-not-found {
  text-align: center;
  padding: 6rem 1rem;
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

.gucci-btn-black {
  background: #000000;
  color: #ffffff;
  padding: 0.75rem 2rem;
  text-decoration: none;
  font-size: 0.78rem;
  font-weight: 800;
  display: inline-block;
  margin-top: 1rem;
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
