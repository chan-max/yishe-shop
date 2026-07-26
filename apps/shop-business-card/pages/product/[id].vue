<template>
  <div class="gucci-product-detail-wrapper">
    <!-- Top Header -->
    <header class="gucci-header">
      <div class="gucci-header-inner">
        <div class="header-left">
          <button type="button" class="back-link-btn" @click="goBack">
            ‹ Back to Collection
          </button>
        </div>
        <div class="header-center">
          <NuxtLink to="/" class="gucci-brand-logo">
            B U S I N E S S  C A R D
          </NuxtLink>
        </div>
        <div class="header-right">
          <NuxtLink to="/search" class="header-icon-link">Search</NuxtLink>
        </div>
      </div>
    </header>

    <main class="gucci-detail-container">
      <div v-if="loading" class="detail-loading">
        <div class="loading-spinner"></div>
        <span>Fetching business card details...</span>
      </div>

      <div v-else-if="!product" class="detail-not-found">
        <h2>Card Edition Not Found</h2>
        <p>The requested business card collection is unavailable.</p>
        <NuxtLink to="/search" class="gucci-btn-black">View Collection</NuxtLink>
      </div>

      <div v-else class="detail-content-grid">
        <!-- Gallery Section -->
        <div class="gallery-section">
          <div class="main-image-box">
            <img
              v-if="currentImage"
              :src="currentImage"
              :alt="product.name"
              class="main-img"
            />
            <div v-else class="main-img-placeholder">
              <span class="placeholder-emoji">📇</span>
              <span class="placeholder-text">LUXURY BUSINESS CARD</span>
            </div>
          </div>

          <div v-if="product.images && product.images.length > 1" class="thumb-list">
            <img
              v-for="(img, idx) in product.images"
              :key="idx"
              :src="img"
              class="thumb-item"
              :class="{ active: currentImage === img }"
              @click="currentImage = img"
            />
          </div>
        </div>

        <!-- Product Specs & Purchase Options -->
        <div class="specs-section">
          <div class="specs-header">
            <span class="collection-tag">EXECUTIVE COLLECTION</span>
            <h1 class="product-title">{{ product.name }}</h1>
            <div class="product-price-line">
              <span class="price-val">${{ product.price || '88.00' }}</span>
              <span class="tax-note">Taxes included</span>
            </div>
          </div>

          <div class="divider"></div>

          <p class="product-full-desc">
            {{ product.description || 'Precision letterpress business cards crafted with 600gsm imported specialty cotton paper and hand-applied hot foil stamping.' }}
          </p>

          <!-- Craftsmanship Options -->
          <div class="craft-option-group">
            <label class="option-label">PAPER STOCK & WEIGHT</label>
            <div class="option-chips">
              <button
                v-for="paper in paperOptions"
                :key="paper"
                type="button"
                class="chip-btn"
                :class="{ selected: selectedPaper === paper }"
                @click="selectedPaper = paper"
              >
                {{ paper }}
              </button>
            </div>
          </div>

          <div class="craft-option-group">
            <label class="option-label">FOIL STAMPING COLOR</label>
            <div class="option-chips">
              <button
                v-for="foil in foilOptions"
                :key="foil"
                type="button"
                class="chip-btn"
                :class="{ selected: selectedFoil === foil }"
                @click="selectedFoil = foil"
              >
                {{ foil }}
              </button>
            </div>
          </div>

          <div class="craft-option-group">
            <label class="option-label">QUANTITY BOX (100 CARDS / BOX)</label>
            <div class="quantity-selector">
              <button type="button" @click="qty > 1 && qty--">-</button>
              <span>{{ qty }} Box ({{ qty * 100 }} Cards)</span>
              <button type="button" @click="qty++">+</button>
            </div>
          </div>

          <!-- Purchase Action Button -->
          <div class="action-btn-row">
            <button type="button" class="btn-checkout-black" @click="handleOrder">
              ORDER NOW - ${{ ((product.price || 88) * qty).toFixed(2) }}
            </button>
            <button type="button" class="btn-inquire-border" @click="inquireDesigner">
              1-on-1 Designer Consultation
            </button>
          </div>

          <!-- Guarantee Icons -->
          <div class="guarantee-row">
            <div class="g-item">
              <span class="g-icon">✈️</span>
              <span>Express Insured Shipping</span>
            </div>
            <div class="g-item">
              <span class="g-icon">📐</span>
              <span>Free Vector Proofing</span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="gucci-mini-footer">
      <div class="footer-logo-small">B U S I N E S S  C A R D</div>
      <p>© 2026 Business Card Workshop S.p.A. All rights reserved.</p>
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

const paperOptions = ['600gsm Cotton Paper', '500gsm Black Matte', '400gsm Kraft Velvet'];
const selectedPaper = ref('600gsm Cotton Paper');

const foilOptions = ['24K Matte Gold Foil', 'Silver Mirror Foil', 'Deep Emerald Foil', 'Black Embossed'];
const selectedFoil = ref('24K Matte Gold Foil');

const goBack = () => {
  router.back();
};

const handleOrder = () => {
  alert(`Thank you for ordering ${qty.value} box of ${product.value?.name}! Our master craftsman will prepare your vector proof.`);
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

      // Dynamically set page SEO meta based on product details!
      useSeoMeta({
        title: `${res.name} - 高端商务名片定制 | BUSINESS CARD`,
        ogTitle: `${res.name} - BUSINESS CARD`,
        description: res.description || '特种纸与烫金名片定制',
        ogDescription: res.description || '特种纸与烫金名片定制'
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
  font-family: Didot, "Times New Roman", serif;
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
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  cursor: pointer;
  text-decoration: none;
}

.gucci-brand-logo {
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.25em;
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

.placeholder-emoji { font-size: 4rem; }
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
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  color: #888888;
  display: block;
  margin-bottom: 0.35rem;
}

.product-title {
  font-size: 2rem;
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
  font-size: 1.5rem;
  font-weight: 700;
}

.tax-note {
  font-size: 0.75rem;
  color: #777777;
}

.divider {
  height: 1px;
  background: #e5e5e5;
  margin-bottom: 1.5rem;
}

.product-full-desc {
  font-size: 0.88rem;
  color: #444444;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.craft-option-group {
  margin-bottom: 1.75rem;
}

.option-label {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.15em;
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
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
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
}

.quantity-selector button {
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}

.quantity-selector span {
  padding: 0.5rem 1rem;
  font-size: 0.82rem;
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
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.15em;
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
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-inquire-border:hover {
  background: #f5f5f5;
}

.guarantee-row {
  display: flex;
  gap: 2rem;
  font-size: 0.75rem;
  color: #666666;
  border-top: 1px solid #e5e5e5;
  padding-top: 1.5rem;
}

.g-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.detail-loading, .detail-not-found {
  text-align: center;
  padding: 6rem 1rem;
  color: #666666;
}

.gucci-btn-black {
  background: #000000;
  color: #ffffff;
  padding: 0.75rem 2rem;
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  display: inline-block;
  margin-top: 1rem;
}

.gucci-mini-footer {
  border-top: 1px solid #e5e5e5;
  padding: 2.5rem 1rem;
  text-align: center;
  font-size: 0.75rem;
  color: #888888;
}

.footer-logo-small {
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #000000;
  margin-bottom: 0.5rem;
}
</style>
