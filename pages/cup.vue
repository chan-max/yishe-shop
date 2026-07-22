<template>
  <div class="cup-standalone-landing">
    <!-- 专属科技极简风格 Navbar 导航 -->
    <header class="cup-nav-header">
      <div class="nav-container">
        <NuxtLink to="/" class="brand-logo">
          <span>☕ 衣设 · 专属饮具定制</span>
        </NuxtLink>
        <div class="nav-links">
          <a href="#intro">材质工艺</a>
          <a href="#products">专属商品</a>
          <NuxtLink to="/design" class="btn-custom">去设计器</NuxtLink>
        </div>
      </div>
    </header>

    <!-- 1. 全屏沉浸式极简 Banner 介绍区 -->
    <section class="cup-hero-fullscreen">
      <div class="hero-content">
        <span class="cup-badge">✨ 灵感与温度的载体</span>
        <h1 class="cup-main-title">把你的创意 <span>印在专属杯身上</span></h1>
        <p class="cup-description">
          精选医用级 304 不锈钢、高骨瓷与高硼硅玻璃。支持 360° 全景升华打样、温变魔法效果及激光雕刻印制。
        </p>

        <!-- 杯子 Showcase Preview 卡片 -->
        <div class="cup-stage-box">
          <div class="stage-glow" />
          <div class="stage-icon">☕</div>
          <div class="stage-label">360° 环绕热升华高保真印花</div>
        </div>

        <div class="hero-actions">
          <a href="#products" class="btn-blue-main">查看【杯子】分类商品 ↓</a>
          <NuxtLink to="/design" class="btn-outline-white">在线设计印花</NuxtLink>
        </div>
      </div>
    </section>

    <!-- 2. 杯子材质与介绍模块 -->
    <section id="intro" class="cup-crafts-section">
      <div class="section-container">
        <h2 class="crafts-heading">三大精选杯具材质与介绍</h2>
        <div class="crafts-grid">
          <div class="craft-box">
            <div class="c-icon">✨</div>
            <h3>高骨瓷马克杯</h3>
            <p>质地细腻通透，釉面光滑如雪。色彩还原度极高，适合名画插画、复古图案与纪念礼品。</p>
          </div>
          <div class="craft-box">
            <div class="c-icon">🔥</div>
            <h3>温变惊艳魔术杯</h3>
            <p>注入 50℃ 热水后黑色涂层迅速消退，隐藏印花瞬间惊喜呈现，给亲友与顾客满满仪式感。</p>
          </div>
          <div class="craft-box">
            <div class="c-icon">❄️</div>
            <h3>304 双层保温杯</h3>
            <p>双层抽真空保温保冷，搭配 3D 浮雕涂层或激光微雕工艺，满足商务与户外个性化需求。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. 【杯子/马克杯】分类商品动态抓取与展示区 -->
    <section id="products" class="cup-products-section">
      <div class="section-container">
        <div class="section-title-bar">
          <div>
            <h2 class="title">【杯子】分类上架商品</h2>
            <p class="subtitle">实时抓取当前商品库中归属于「杯子 / 马克杯」分类下的专属款式</p>
          </div>
          <div class="product-count">共 {{ products.length }} 款饮具分类商品</div>
        </div>

        <!-- 骨架图加载 -->
        <div v-if="loading" class="loading-grid">
          <div v-for="i in 4" :key="i" class="skeleton-card" />
        </div>

        <!-- 真实分类商品列表 -->
        <div v-else-if="products.length > 0" class="products-grid">
          <NuxtLink
            v-for="item in products"
            :key="item.id"
            :to="`/product/${item.id}`"
            class="product-card"
          >
            <div class="img-wrapper">
              <img :src="item.imageUrl" :alt="item.title" loading="lazy" />
              <span class="cat-pill">{{ item.category }}</span>
            </div>
            <div class="card-body">
              <h4 class="p-title">{{ item.title }}</h4>
              <p class="p-desc">{{ item.description || '高保真热升华工艺，耐洗洗碗机适用，手感温润细腻。' }}</p>
              <div class="p-foot">
                <span v-if="item.price" class="p-price">¥{{ item.price }}</span>
                <span class="p-link">查看详情 →</span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- 暂无分类商品引导 -->
        <div v-else class="empty-box">
          <div class="empty-icon">☕</div>
          <h3>暂未检索到【杯子】分类下的商品</h3>
          <p>管理员可以在后台【商品模块】中发布分类为「杯子」或「马克杯」的商品。你也可以直接打开 POD 设计工具定制印花！</p>
          <NuxtLink to="/design" class="btn-blue-outline">去设计工具创作</NuxtLink>
        </div>
      </div>
    </section>

    <!-- 4. 页脚 -->
    <footer class="cup-footer">
      <p>© 2026 杯子/饮具定制专属介绍落地页 · 衣设 yishe 版权所有</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePublishedProducts, type StorefrontPublishedProduct } from '~/composables/use-published-products'

definePageMeta({
  layout: false, // 彻底摆脱默认主站通用 Layout，打造全新的独立落地页！
})

useSeoMeta({
  title: '水杯/马克杯专属定制 - 介绍落地页 - 衣设 yishe',
  description: '全新独立的马克杯与水杯专属介绍落地页。为您提供高骨瓷马克杯、魔术温变杯与保温杯的个性化展示。',
})

const { fetchPublishedProducts } = usePublishedProducts()
const loading = ref(true)
const products = ref<StorefrontPublishedProduct[]>([])

onMounted(async () => {
  loading.value = true
  try {
    const res = await fetchPublishedProducts({
      type: '杯子',
      searchText: '杯',
      pageSize: 20,
    })
    products.value = res || []
  } catch (err) {
    console.error('抓取杯子分类商品失败:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.cup-standalone-landing {
  background-color: #0f172a;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  min-height: 100vh;
}

.cup-nav-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 16px 24px;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand-logo {
  font-size: 20px;
  font-weight: 900;
  color: #38bdf8;
  text-decoration: none;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-links a {
  color: #cbd5e1;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: #38bdf8;
}

.btn-custom {
  background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%);
  color: #fff !important;
  font-weight: 700;
  padding: 6px 18px;
  border-radius: 20px;
}

.cup-hero-fullscreen {
  position: relative;
  padding: 80px 24px 100px;
  text-align: center;
  background: radial-gradient(circle at center, #1e293b 0%, #0f172a 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.hero-content {
  max-width: 900px;
  margin: 0 auto;
}

.cup-badge {
  display: inline-block;
  background: rgba(56, 189, 248, 0.15);
  border: 1px solid #38bdf8;
  color: #38bdf8;
  padding: 6px 18px;
  border-radius: 20px;
  font-size: 14px;
  margin-bottom: 24px;
}

.cup-main-title {
  font-size: 46px;
  font-weight: 900;
  color: #fff;
  margin-bottom: 20px;
}

.cup-main-title span {
  display: block;
  background: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.cup-description {
  font-size: 17px;
  color: #94a3b8;
  line-height: 1.6;
  max-width: 720px;
  margin: 0 auto 40px;
}

.cup-stage-box {
  position: relative;
  width: 220px;
  height: 220px;
  margin: 0 auto 40px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.stage-glow {
  position: absolute;
  width: 120px;
  height: 120px;
  background: #38bdf8;
  filter: blur(50px);
  opacity: 0.3;
}

.stage-icon {
  font-size: 72px;
  z-index: 1;
}

.stage-label {
  z-index: 1;
  font-size: 12px;
  color: #cbd5e1;
  margin-top: 12px;
  background: rgba(0, 0, 0, 0.5);
  padding: 3px 10px;
  border-radius: 10px;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.btn-blue-main {
  background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%);
  color: #fff;
  font-weight: 800;
  padding: 14px 32px;
  border-radius: 30px;
  text-decoration: none;
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.4);
}

.btn-outline-white {
  border: 1px solid #38bdf8;
  color: #38bdf8;
  font-weight: 700;
  padding: 14px 32px;
  border-radius: 30px;
  text-decoration: none;
}

.cup-crafts-section {
  padding: 80px 24px;
  background: #1e293b;
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
}

.crafts-heading {
  text-align: center;
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 48px;
  color: #fff;
}

.crafts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
}

.craft-box {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 32px;
  text-align: center;
}

.c-icon {
  font-size: 36px;
  margin-bottom: 16px;
}

.craft-box h3 {
  font-size: 20px;
  font-weight: 700;
  color: #38bdf8;
  margin-bottom: 10px;
}

.craft-box p {
  font-size: 14px;
  color: #94a3b8;
  line-height: 1.6;
}

.cup-products-section {
  padding: 80px 24px;
}

.section-title-bar {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 16px;
}

.title {
  font-size: 28px;
  font-weight: 800;
  color: #fff;
}

.subtitle {
  font-size: 14px;
  color: #94a3b8;
  margin-top: 6px;
}

.product-count {
  background: rgba(56, 189, 248, 0.1);
  color: #38bdf8;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 28px;
}

.product-card {
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  overflow: hidden;
  text-decoration: none;
  color: #fff;
  transition: transform 0.2s;
}

.product-card:hover {
  transform: translateY(-4px);
}

.img-wrapper {
  position: relative;
  width: 100%;
  padding-top: 100%;
  background: #0f172a;
}

.img-wrapper img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cat-pill {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(14, 165, 233, 0.9);
  color: #fff;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
}

.card-body {
  padding: 16px;
}

.p-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 6px;
  color: #fff;
}

.p-desc {
  font-size: 12px;
  color: #94a3b8;
  line-height: 1.4;
  margin-bottom: 12px;
}

.p-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.p-price {
  font-size: 18px;
  font-weight: 800;
  color: #38bdf8;
}

.p-link {
  font-size: 13px;
  color: #38bdf8;
}

.empty-box {
  text-align: center;
  padding: 60px 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px dashed rgba(255, 255, 255, 0.15);
  border-radius: 16px;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.btn-blue-outline {
  display: inline-block;
  margin-top: 16px;
  border: 1px solid #38bdf8;
  color: #38bdf8;
  padding: 8px 24px;
  border-radius: 20px;
  text-decoration: none;
  font-size: 14px;
}

.cup-footer {
  text-align: center;
  padding: 32px;
  background: #090d16;
  color: #64748b;
  font-size: 13px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
