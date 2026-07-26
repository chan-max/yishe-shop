<template>
  <div class="email-page-wrapper">
    <div class="email">
      <!-- HEADER -->
      <div class="header">
        <div class="top-info">
          <NuxtLink to="/" class="top-link">www.1s.design</NuxtLink>
          <NuxtLink to="/search" class="top-link">View in browser</NuxtLink>
        </div>

        <div class="logo">
          <NuxtLink to="/" class="logo-link">
            <span class="logo-text">🏮 衣设 · 春联工坊</span>
          </NuxtLink>
        </div>

        <!-- HERO DISPLAY -->
        <div class="hero">
          <div class="hero-scroll-display">
            <div class="hero-scroll-left">
              <span class="scroll-tag">上联</span>
              <span class="scroll-font">迎喜迎春迎富贵</span>
            </div>
            <div class="hero-scroll-center">
              <span class="scroll-tag">横批</span>
              <span class="scroll-font-center">吉星高照</span>
            </div>
            <div class="hero-scroll-right">
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

      <!-- CONTENT -->
      <div class="content">
        <p class="desc">
          衣设春联工坊专注于传世名家手写对联、烫金企业门联与创意新春楹联定制。
          <br />
          采用特级万年红宣纸与耐候金墨，让每一副春联都承载吉祥安康。
        </p>

        <h2 class="section-title">New Arrival</h2>

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
            class="product"
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
          <span @click="openAllProducts">View all</span>
        </div>

        <!-- COUPON -->
        <div class="coupon">
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
        <h2 class="review-title">Customer is our Priority</h2>

        <div class="reviews">
          <div class="review">
            <h1>“</h1>
            纸质非常厚重，烫金字在阳光下熠熠生辉！贴在公司大门上气场十足。
            <br /><br />
            <div class="avatar-box">👨‍💼</div>
            Benjamin Han
          </div>

          <div class="review">
            <h1>“</h1>
            名家手写体韵味十足，万年红宣纸连续几年都不褪色。
            <br /><br />
            <div class="avatar-box">👩‍🎨</div>
            Lauren Duo
          </div>

          <div class="review">
            <h1>“</h1>
            包装非常精美完好，送给长辈和客户都非常有档次！
            <br /><br />
            <div class="avatar-box">👨‍👩‍👧</div>
            Patricia Leo
          </div>
        </div>
      </div>

      <!-- FOOTER -->
      <div class="footer">
        <div class="social">
          facebook　instagram　linkedin　X
        </div>
        Manage Email Settings
        <br /><br />
        If you believe this has been sent to you in error, please safely unsubscribe.
        <br /><br />
        © 2026 Company. All rights reserved.
        <br /><br />
        <div class="footer-logo">🏮 衣设 · 春联工坊</div>
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
    const res = await fetchPublishedProducts({ page: 1, limit: 4 });
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
.email-page-wrapper {
  margin: 0;
  background: #ededed;
  font-family: Arial, "Helvetica Neue", sans-serif;
  min-height: 100vh;
  padding: 20px 0 60px;
}

.email {
  width: 640px;
  margin: auto;
  background: #f8e8d0;
  color: #820017;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

@media (max-width: 680px) {
  .email {
    width: 100%;
  }
}

/* =====================
   HEADER
===================== */
.header {
  height: 320px;
  background: #870018;
  position: relative;
  border-radius: 0 0 65px 65px;
}

.top-info {
  position: absolute;
  top: 32px;
  left: 55px;
  right: 55px;
  display: flex;
  justify-content: space-between;
  color: #dca532;
  font-size: 11px;
  font-weight: bold;
}

.top-link {
  color: #dca532;
  text-decoration: none;
}

.logo {
  position: absolute;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
}

.logo-text {
  color: #f5c34b;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 1px;
}

.logo-link {
  text-decoration: none;
}

/* hero */
.hero {
  position: absolute;
  top: 82px;
  left: 50%;
  transform: translateX(-50%);
  width: 340px;
  height: 410px;
  border-radius: 18px;
  overflow: hidden;
  background: linear-gradient(135deg, #7a0c16 0%, #4a030b 100%);
  border: 3px solid #dca532;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 25px;
}

.hero-scroll-display {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.hero-scroll-left,
.hero-scroll-right {
  background: #b81424;
  border: 2px solid #f5c34b;
  color: #f5c34b;
  padding: 12px 6px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.hero-scroll-center {
  background: #b81424;
  border: 2px solid #f5c34b;
  color: #f5c34b;
  padding: 6px 12px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.scroll-tag {
  font-size: 9px;
  opacity: 0.8;
  margin-bottom: 3px;
}

.scroll-font {
  writing-mode: vertical-rl;
  font-family: "KaiTi", "STKaiti", serif;
  font-size: 17px;
  font-weight: 900;
  letter-spacing: 4px;
}

.scroll-font-center {
  font-family: "KaiTi", "STKaiti", serif;
  font-size: 15px;
  font-weight: 900;
  letter-spacing: 3px;
}

.hero-text {
  position: absolute;
  bottom: 25px;
  width: 100%;
  text-align: center;
  color: #e6a52b;
  text-shadow: 2px 3px 2px #7d4500;
}

.hero-text h1 {
  margin: 0;
  font-size: 43px;
  font-weight: 900;
  letter-spacing: 2px;
}

.hero-text h2 {
  margin: 0;
  font-size: 20px;
}

/* =====================
   CONTENT
===================== */
.content {
  padding: 210px 55px 40px;
}

@media (max-width: 640px) {
  .content {
    padding: 210px 20px 30px;
  }
}

.desc {
  text-align: center;
  font-size: 13px;
  line-height: 18px;
  font-weight: bold;
  color: #850018;
}

.section-title {
  text-align: center;
  margin: 50px 0 30px;
  font-size: 25px;
  font-weight: 900;
}

/* products */
.products {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px 45px;
}

@media (max-width: 580px) {
  .products {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

.product {
  overflow: hidden;
  border-radius: 18px;
  background: #fff;
  border: 1px solid #d8a02b;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.product:hover {
  transform: translateY(-4px);
}

.product-image {
  height: 220px;
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
  font-size: 40px;
  margin-bottom: 5px;
}

.fallback-title {
  font-size: 14px;
  font-weight: bold;
  font-family: "KaiTi", serif;
}

.product-info {
  background: #870018;
  color: #f1b536;
  padding: 10px 14px;
  font-size: 12px;
  line-height: 16px;
}

.product-name {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 3px;
}

.view {
  text-align: center;
  margin: 35px;
}

.view span {
  display: inline-block;
  background: #870018;
  color: #f5c34b;
  padding: 8px 28px;
  border-radius: 20px;
  font-size: 12px;
  cursor: pointer;
  font-weight: bold;
}

.view span:hover {
  background: #6b0013;
}

/* coupon */
.coupon {
  height: 135px;
  background: #870018;
  border: 2px solid #dca532;
  display: flex;
  position: relative;
}

.coupon:before,
.coupon:after {
  content: "";
  position: absolute;
  width: 35px;
  height: 35px;
  border: 2px solid #dca532;
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
  font-size: 62px;
  font-weight: 900;
  line-height: 1;
}

.coupon h2 {
  margin: 5px 0 0;
  font-size: 22px;
}

/* reviews */
.review-title {
  margin-top: 55px;
  margin-bottom: 30px;
  font-size: 28px;
  text-align: center;
}

.reviews {
  display: flex;
  gap: 25px;
}

@media (max-width: 580px) {
  .reviews {
    flex-direction: column;
  }
}

.review {
  width: 33%;
  font-size: 12px;
  line-height: 17px;
}

@media (max-width: 580px) {
  .review {
    width: 100%;
  }
}

.review h1 {
  font-size: 40px;
  margin: 0;
  line-height: 1;
}

.avatar-box {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: #ccc;
  float: left;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
}

/* footer */
.footer {
  background: #870018;
  padding: 30px 50px;
  text-align: center;
  color: #dca532;
  font-size: 12px;
}

.social {
  margin-bottom: 15px;
}

.footer-logo {
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #f5c34b;
}

.loading-box,
.empty-box {
  text-align: center;
  padding: 40px 0;
  color: #870018;
  font-weight: bold;
}
</style>
