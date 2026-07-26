<template>
  <div class="email-page-wrapper">
    <div class="email">
      <!-- HEADER -->
      <div class="header">
        <div class="top-info-bar">
          <NuxtLink to="/" class="top-link">www.1s.design</NuxtLink>
          <NuxtLink to="/search" class="top-link">搜春联 / 楹联专区</NuxtLink>
        </div>

        <div class="logo">
          <NuxtLink to="/" class="logo-link">
            <span class="logo-text">🏮 春联 · 传世楹联定制</span>
          </NuxtLink>
        </div>

        <!-- HERO DISPLAY -->
        <div class="hero squircle-box">
          <div class="hero-scroll-display">
            <div class="hero-scroll-left squircle-scroll">
              <span class="scroll-tag">上联</span>
              <span class="scroll-font">迎喜迎春迎富贵</span>
            </div>
            <div class="hero-scroll-center squircle-scroll">
              <span class="scroll-tag">横批</span>
              <span class="scroll-font-center">吉星高照</span>
            </div>
            <div class="hero-scroll-right squircle-scroll">
              <span class="scroll-tag">下联</span>
              <span class="scroll-font">接财接福接平安</span>
            </div>
          </div>
          <div class="hero-text">
            <h1>HAPPY</h1>
            <h2>CHINESE NEW YEAR</h2>
          </div>
        </div>
      </div>

      <!-- CONTENT CONTAINER -->
      <div class="content">
        <p class="desc">
          春联网专注于传世名家手写对联、烫金企业门联与创意新春楹联定制。
          <br />
          采用特级万年红宣纸与耐候金墨，让每一副春联都承载吉祥安康。
        </p>

        <h2 class="section-title">New Arrival / 新品楹联</h2>

        <!-- PRODUCTS GRID -->
        <div v-if="loading" class="loading-box">
          正在加载精品楹联作品…
        </div>

        <div v-else-if="products.length === 0" class="empty-box">
          暂无对联作品，请稍后刷新。
        </div>

        <div v-else class="products">
          <div
            v-for="item in products"
            :key="item.id"
            class="product squircle-card"
            @click="navigateToProduct(item)"
          >
            <div class="product-image">
              <img
                v-if="getProductImage(item)"
                :src="getProductImage(item)"
                :alt="item.name"
              />
              <div v-else class="product-img-fallback">
                <span class="fallback-icon">🧧</span>
                <span class="fallback-title">万年红烫金春联</span>
              </div>
            </div>

            <div class="product-info">
              <div class="product-name">
                <span>{{ item.name }}</span>
                <span>{{ item.price || '34.5' }}$</span>
              </div>
              {{ item.description || '经典手写万年红烫金春联，寓意岁岁平安、万事顺遂。' }}
            </div>
          </div>
        </div>

        <div class="view">
          <span class="squircle-btn" @click="openAllProducts">View all / 查看全部</span>
        </div>

        <!-- COUPON BANNER -->
        <div class="coupon squircle-banner">
          <div>
            Get Up to
            <br />
            <span class="discount">70%</span>
            <br />
            Discount
          </div>

          <div>
            Don't forget to use the code
            <br />
            <h2>DragNY25</h2>
          </div>
        </div>

        <!-- REVIEWS -->
        <h2 class="review-title">Customer is our Priority / 客户口碑</h2>

        <div class="reviews">
          <div class="review squircle-card">
            <h1>“</h1>
            纸质非常厚重，烫金字在阳光下熠熠生辉！贴在公司大门上气场十足。
            <br /><br />
            <div class="avatar-box">👨‍💼</div>
            <div class="reviewer-meta">
              <strong>Benjamin Han</strong>
              <small>企业创始人</small>
            </div>
          </div>

          <div class="review squircle-card">
            <h1>“</h1>
            名家手写体韵味十足，万年红宣纸连续几年都不褪色。
            <br /><br />
            <div class="avatar-box">👩‍🎨</div>
            <div class="reviewer-meta">
              <strong>Lauren Duo</strong>
              <small>独立设计师</small>
            </div>
          </div>

          <div class="review squircle-card">
            <h1>“</h1>
            包装非常精美完好，送给长辈和客户都非常有档次！
            <br /><br />
            <div class="avatar-box">👨‍👩‍👧</div>
            <div class="reviewer-meta">
              <strong>Patricia Leo</strong>
              <small>资深收藏家</small>
            </div>
          </div>
        </div>
      </div>

      <!-- FOOTER -->
      <div class="footer">
        <div class="social">
          facebook　instagram{...}　X
        </div>
        Manage Email Settings
        <br /><br />
        If you believe this has been sent to you in error, please safely unsubscribe.
        <br /><br />
        © 2026 春联. All rights reserved.
        <br /><br />
        <div class="footer-logo">🏮 春联 · 传世楹联定制</div>
      </div>
    </div>
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
/* 全屏通栏网页布局（基于 corner-shape: squircle 仿生平滑超椭圆圆角系统） */
.email-page-wrapper {
  margin: 0;
  padding: 0;
  background: #f8e8d0;
  font-family: Arial, "Helvetica Neue", sans-serif;
  min-height: 100vh;
  width: 100%;
}

.email {
  width: 100%;
  max-width: 100%;
  margin: 0;
  background: #f8e8d0;
  color: #820017;
  box-shadow: none;
}

/* =====================
   HEADER (通栏 Squircle 弧形 Header)
===================== */
.header {
  width: 100%;
  min-height: 380px;
  background: #870018;
  position: relative;
  border-radius: 0 0 65px 65px;
  corner-shape: squircle;
  padding-bottom: 50px;
}

.top-info-bar {
  max-width: 1200px;
  margin: 0 auto;
  padding: 25px 40px 0;
  display: flex;
  justify-content: space-between;
  color: #dca532;
  font-size: 13px;
  font-weight: bold;
}

.top-link {
  color: #dca532;
  text-decoration: none;
  transition: opacity 0.2s;
}

.top-link:hover {
  opacity: 0.8;
}

.logo {
  text-align: center;
  padding-top: 15px;
}

.logo-text {
  color: #f5c34b;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 1.5px;
}

.logo-link {
  text-decoration: none;
}

/* HERO SQUIRCLE BOX */
.hero.squircle-box {
  max-width: 780px;
  width: 90%;
  margin: 25px auto 0;
  height: 360px;
  border-radius: 24px;
  corner-shape: squircle;
  overflow: hidden;
  background: linear-gradient(135deg, #7a0c16 0%, #4a030b 100%);
  border: 3px solid #dca532;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.hero-scroll-display {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
}

.squircle-scroll {
  border-radius: 8px;
  corner-shape: squircle;
}

.hero-scroll-left,
.hero-scroll-right {
  background: #b81424;
  border: 2px solid #f5c34b;
  color: #f5c34b;
  padding: 14px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.35);
}

.hero-scroll-center {
  background: #b81424;
  border: 2px solid #f5c34b;
  color: #f5c34b;
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.35);
}

.scroll-tag {
  font-size: 10px;
  opacity: 0.85;
  margin-bottom: 4px;
}

.scroll-font {
  writing-mode: vertical-rl;
  font-family: "KaiTi", "STKaiti", serif;
  font-size: 19px;
  font-weight: 900;
  letter-spacing: 4px;
}

.scroll-font-center {
  font-family: "KaiTi", "STKaiti", serif;
  font-size: 17px;
  font-weight: 900;
  letter-spacing: 3px;
}

.hero-text {
  position: absolute;
  bottom: 25px;
  width: 100%;
  text-align: center;
  color: #e6a52b;
  text-shadow: 2px 3px 3px #7d4500;
}

.hero-text h1 {
  margin: 0;
  font-size: 44px;
  font-weight: 900;
  letter-spacing: 3px;
}

.hero-text h2 {
  margin: 0;
  font-size: 22px;
}

/* =====================
   CONTENT (全局网页响应式容器)
===================== */
.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 30px;
}

.desc {
  text-align: center;
  font-size: 15px;
  line-height: 24px;
  font-weight: bold;
  color: #850018;
  max-width: 800px;
  margin: 0 auto 40px;
}

.section-title {
  text-align: center;
  margin: 50px 0 35px;
  font-size: 28px;
  font-weight: 900;
}

/* PRODUCTS GRID */
.products {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

@media (max-width: 992px) {
  .products {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}

@media (max-width: 580px) {
  .products {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

.product.squircle-card {
  overflow: hidden;
  border-radius: 20px;
  corner-shape: squircle;
  background: #fff;
  border: 1.5px solid #d8a02b;
  cursor: pointer;
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
}

.product.squircle-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(135, 0, 24, 0.18);
}

.product-image {
  height: 230px;
  background: #ccc;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-img-fallback {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #7a0c16 0%, #4a030b 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #f5c34b;
}

.fallback-icon {
  font-size: 42px;
  margin-bottom: 6px;
}

.fallback-title {
  font-size: 15px;
  font-weight: bold;
  font-family: "KaiTi", serif;
}

.product-info {
  background: #870018;
  color: #f1b536;
  padding: 12px 16px;
  font-size: 13px;
  line-height: 18px;
}

.product-name {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 5px;
}

.view {
  text-align: center;
  margin: 45px 0 60px;
}

.view .squircle-btn {
  display: inline-block;
  background: #870018;
  color: #f5c34b;
  padding: 10px 36px;
  border-radius: 999px;
  corner-shape: squircle;
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(135, 0, 24, 0.2);
  transition: all 0.25s ease;
}

.view .squircle-btn:hover {
  background: #6b0013;
  transform: scale(1.04);
}

/* COUPON SQUIRCLE BANNER */
.coupon.squircle-banner {
  max-width: 900px;
  margin: 50px auto;
  height: 145px;
  background: #870018;
  border: 2px solid #dca532;
  display: flex;
  position: relative;
  border-radius: 16px;
  corner-shape: squircle;
  box-shadow: 0 8px 24px rgba(135, 0, 24, 0.15);
}

.coupon:before,
.coupon:after {
  content: "";
  position: absolute;
  width: 35px;
  height: 35px;
  border: 2px solid #dca532;
  border-radius: 6px;
  corner-shape: squircle;
}

.coupon:before {
  left: 10px;
  top: 10px;
}

.coupon:after {
  right: 10px;
  bottom: 10px;
}

.coupon div {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #f5c34b;
  text-align: center;
}

.coupon div + div {
  border-left: 1px solid #dca532;
}

.discount {
  font-size: 64px;
  font-weight: 900;
  line-height: 1;
}

.coupon h2 {
  margin: 6px 0 0;
  font-size: 24px;
  letter-spacing: 1px;
}

/* REVIEWS SQUIRCLE CARDS */
.review-title {
  margin-top: 60px;
  margin-bottom: 35px;
  font-size: 28px;
  text-align: center;
  font-weight: 900;
}

.reviews {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1100px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .reviews {
    grid-template-columns: 1fr;
  }
}

.review.squircle-card {
  background: #ffffff;
  border: 1px solid rgba(216, 160, 43, 0.4);
  border-radius: 18px;
  corner-shape: squircle;
  padding: 20px 24px;
  font-size: 13px;
  line-height: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
}

.review h1 {
  font-size: 40px;
  color: #dca532;
  margin: 0 0 5px;
  line-height: 1;
}

.avatar-box {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #fdf5ea;
  border: 1px solid #dca532;
  float: left;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.reviewer-meta {
  display: flex;
  flex-direction: column;
}

.reviewer-meta strong {
  color: #870018;
  font-size: 14px;
}

.reviewer-meta small {
  color: #850018;
  opacity: 0.75;
}

/* FOOTER */
.footer {
  width: 100%;
  background: #870018;
  padding: 40px 20px;
  text-align: center;
  color: #dca532;
  font-size: 13px;
  border-top: 3px solid #dca532;
}

.social {
  margin-bottom: 18px;
  font-weight: bold;
}

.footer-logo {
  margin-top: 24px;
  font-size: 18px;
  font-weight: bold;
  color: #f5c34b;
}

.loading-box,
.empty-box {
  text-align: center;
  padding: 50px 0;
  color: #870018;
  font-weight: bold;
}
</style>
