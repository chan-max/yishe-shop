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
          <NuxtLink v-if="!user" to="/login" class="header-icon-link underline-slide">登录 / 注册</NuxtLink>
          <span v-else class="user-greeting">欢迎，{{ user.username || 'VIP 会员' }}</span>
          <NuxtLink to="/search" class="header-icon-link underline-slide">高级搜索</NuxtLink>
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

      <div v-else class="detail-main-layout">
        <!-- Top Section: Gallery + Specs -->
        <div class="detail-content-grid">
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

          <!-- Product Specs & Customization Form -->
          <div class="specs-section">
            <div class="specs-header">
              <span class="collection-tag badge-pulse">DESIGN STYLE · 热门名片设计作品</span>
              <h1 class="product-title">{{ product.name }}</h1>
              <div class="product-price-line">
                <span class="price-val">设计服务：0元免费设计 (印制指导价 ${{ calculatedPrice }})</span>
                <span class="tax-note">包含 1对1 矢量排版与 Logo 适配</span>
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

            <!-- Online Text Customization Fields -->
            <div class="online-custom-fields">
              <label class="option-label">名片定制文字信息 (ONLINE CUSTOMIZATION)</label>

              <div class="fields-grid">
                <input v-model="customForm.name" type="text" placeholder="名片姓名 (如：张总 / Alexander)" class="sharp-input" />
                <input v-model="customForm.title" type="text" placeholder="公司职务 (如：创始人兼 CEO)" class="sharp-input" />
                <input v-model="customForm.company" type="text" placeholder="公司/品牌名称" class="sharp-input" />
                <input v-model="customForm.mobile" type="text" placeholder="联系电话 / 手机" class="sharp-input" />
                <input v-model="customForm.email" type="email" placeholder="电子邮箱 / 网址" class="sharp-input" />
                <input v-model="customForm.address" type="text" placeholder="公司地址 (可选)" class="sharp-input" />
              </div>
            </div>

            <div class="craft-option-group">
              <label class="option-label">定制印制盒数 (QUANTITY TIER)</label>
              <div class="quantity-selector">
                <button type="button" class="qty-btn" @click="qty > 1 && qty--">-</button>
                <span class="qty-num">{{ qty }} 盒 (共 {{ qty * 100 }} 张名片)</span>
                <button type="button" class="qty-btn" @click="qty++">+</button>
              </div>
            </div>

            <!-- Action Button Focus on Free Design Same Style -->
            <div class="action-btn-row">
              <button type="button" class="btn-checkout-black ripple-btn" @click="handleOrder">
                ✨ 0 元免费申请此款设计 (APPLY FOR FREE DESIGN)
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
                <span>1对1 矢量排版</span>
              </div>
              <div class="g-item hover-lift-sm">
                <svg class="g-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="0"></rect>
                  <path d="M3 9h18M9 21V9"></path>
                </svg>
                <span>24小时 免费矢量试样</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Specs Table & Reviews Section -->
        <section class="technical-specs-section">
          <div class="specs-table-box">
            <h3 class="section-sub-title">工艺与材质规格参数 (TECHNICAL SPECIFICATIONS)</h3>
            <table class="specs-table">
              <tbody>
                <tr>
                  <td class="tbl-label">印制工艺 (CRAFT)</td>
                  <td>{{ product.name }} · 24K 浮雕烫金与活字凹版压印</td>
                </tr>
                <tr>
                  <td class="tbl-label">选用纸款 (PAPER STOCK)</td>
                  <td>{{ selectedPaper }} (FSC 国际环保认证)</td>
                </tr>
                <tr>
                  <td class="tbl-label">烫金箔彩 (FOIL COLOR)</td>
                  <td>{{ selectedFoil }} (0.02mm 极细拉丝金箔)</td>
                </tr>
                <tr>
                  <td class="tbl-label">交付 SLA (DELIVERY)</td>
                  <td>提交排版需求后 24 小时出具 PDF/SVG 电子矢量稿</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- User Reviews & Rating Section -->
          <div class="reviews-section">
            <h3 class="section-sub-title">用户评价与鉴赏 (CUSTOMER REVIEWS & RATINGS)</h3>
            <div class="rating-summary">
              <span class="score">4.9</span>
              <div class="stars">★★★★★</div>
              <span class="count">(全网 128 位创作者与 CEO 真实评价)</span>
            </div>

            <div class="reviews-list">
              <div class="review-item">
                <div class="rev-header">
                  <span class="rev-name">张先生 (科技创业公司 CEO)</span>
                  <span class="rev-date">2026-07-24</span>
                </div>
                <p class="rev-content">0元免费排版出稿非常迅速！设计师帮我们调整了 Logo 矢量版式，600g 棉纸与烫金质感惊艳，合作伙伴都夸非常符合高定水准。</p>
              </div>

              <div class="review-item">
                <div class="rev-header">
                  <span class="rev-name">Victoria (独立设计师)</span>
                  <span class="rev-date">2026-07-21</span>
                </div>
                <p class="rev-content">搜索和设计同款功能太赞了。选了这个黑金样式，客服和排字师非常专业，打样细节满分！</p>
              </div>
            </div>
          </div>
        </section>
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

const user = ref<any>(null);
const loading = ref(true);
const product = ref<any>(null);
const currentImage = ref<string>('');
const qty = ref(1);

const paperOptions = ['600g 进口纯棉纸', '500g 哑光黑卡', '400g 绒面触感纸'];
const selectedPaper = ref('600g 进口纯棉纸');

const foilOptions = ['24K 哑光金箔', '亮银镜面箔', '璀璨黑金', '无色凹压字'];
const selectedFoil = ref('24K 哑光金箔');

const customForm = ref({
  name: '',
  title: '',
  company: '',
  mobile: '',
  email: '',
  address: ''
});

const calculatedPrice = computed(() => {
  const base = parseFloat(product.value?.price) || 88;
  return (base * qty.value).toFixed(2);
});

const goBack = () => {
  router.back();
};

const handleOrder = () => {
  alert(`申请成功！已为您开启 ${product.value?.name} 的【0元免费设计同款】排版流程！资深设计师将在 24 小时内为您免费出具专属姓名 (${customForm.value.name || '定制'})、职务与 Logo 的矢量试样稿。`);
};

const inquireDesigner = () => {
  router.push('/contact');
};

onMounted(async () => {
  try {
    const publicUserStore = usePublicUserStore();
    if (publicUserStore.user) {
      user.value = publicUserStore.user;
    }
  } catch (e) {}

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

.sharp-input {
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.sharp-input:focus {
  border-bottom-color: #d4a337 !important;
  box-shadow: 0 2px 8px rgba(212, 163, 55, 0.2);
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

.user-greeting {
  font-size: 0.82rem;
  font-weight: 700;
  color: #d4a337;
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

.detail-main-layout {
  display: flex;
  flex-direction: column;
  gap: 5rem;
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
  font-size: 1.2rem;
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
  margin-bottom: 1.5rem;
}

.craft-option-group {
  margin-bottom: 1.5rem;
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
}

.chip-btn.selected, .chip-btn:hover {
  background: #000000;
  color: #ffffff;
  border-color: #000000;
}

/* Online Custom Fields */
.online-custom-fields {
  background: #fafafa;
  border: 1px solid #eeeeee;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
}

.fields-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 640px) {
  .fields-grid { grid-template-columns: 1fr; }
}

.fields-grid input {
  border: none;
  border-bottom: 1px solid #cccccc;
  padding: 0.55rem 0;
  font-size: 0.85rem;
  outline: none;
  background: none;
}

.quantity-selector {
  display: inline-flex;
  align-items: center;
  border: 1px solid #cccccc;
}

.qty-btn {
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s ease;
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
  margin-bottom: 2rem;
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

/* Technical Specs & Reviews */
.technical-specs-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  border-top: 1px solid #e5e5e5;
  padding-top: 4rem;
}

@media (max-width: 860px) {
  .technical-specs-section {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

.section-sub-title {
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  margin: 0 0 1.5rem;
  color: #000000;
}

.specs-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.specs-table td {
  padding: 0.85rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.tbl-label {
  font-weight: 800;
  color: #888888;
  width: 160px;
}

.rating-summary {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.score {
  font-size: 2.2rem;
  font-weight: 900;
  line-height: 1;
}

.stars {
  color: #d4a337;
  letter-spacing: 0.15em;
  font-size: 1.2rem;
}

.count {
  font-size: 0.78rem;
  color: #888888;
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.review-item {
  background: #fafafa;
  border: 1px solid #eeeeee;
  padding: 1.25rem;
}

.rev-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.rev-name {
  font-size: 0.85rem;
  font-weight: 800;
}

.rev-date {
  font-size: 0.75rem;
  color: #888888;
}

.rev-content {
  font-size: 0.82rem;
  color: #555555;
  line-height: 1.6;
  margin: 0;
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
