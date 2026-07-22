<template>
  <div class="sf-standalone-landing">
    <!-- 专属沉浸式极简 Header 导航 -->
    <header class="sf-nav-header">
      <div class="nav-container">
        <NuxtLink to="/" class="brand-logo">
          <span>🧧 乙巳年 · 专属春联</span>
        </NuxtLink>
        <div class="nav-links">
          <a href="#intro">特色介绍</a>
          <a href="#products">分类商品</a>
          <a href="#crafts">万年红工艺</a>
          <NuxtLink to="/design" class="btn-custom">在线定制</NuxtLink>
        </div>
      </div>
    </header>

    <!-- 1. 全屏沉浸式中国红金墨 Banner 介绍 -->
    <section class="sf-hero-fullscreen">
      <div class="hero-bg-overlay" />
      <div class="hero-content-box">
        <span class="sf-badge">乙巳年新春大吉 · 手书墨宝落地页</span>
        <h1 class="sf-main-title">名家墨宝 · 专属春联</h1>
        <p class="sf-description">
          传承千年书法气象，结合现代防晒防潮高保真印花科技。专属定制门楣横批、上下对联与烫金福字，为家庭纳福，为企业开门红。
        </p>

        <!-- 动态对仗演示与介绍模块 -->
        <div class="couplet-showcase-box">
          <div class="scroll-unit left">
            <span class="couplet-font">迎春接福禧盈门</span>
          </div>
          <div class="center-unit">
            <div class="batch-text">吉星高照</div>
            <div class="diamond-fu">福</div>
          </div>
          <div class="scroll-unit right">
            <span class="couplet-font">贺岁纳财吉祥到</span>
          </div>
        </div>

        <div class="hero-actions">
          <a href="#products" class="btn-primary-gold">浏览分类春联商品 ↓</a>
          <NuxtLink to="/design" class="btn-secondary-red">定制个性春联</NuxtLink>
        </div>
      </div>
    </section>

    <!-- 2. 春联专题详细介绍模块 -->
    <section id="intro" class="sf-intro-section">
      <div class="section-container">
        <div class="intro-grid">
          <div class="intro-card">
            <div class="card-num">01</div>
            <h3>名家手书集字</h3>
            <p>收录楷、行、草、隶、篆等多门经典书法大家字库，字字刚劲有力，韵味绵长。</p>
          </div>
          <div class="intro-card">
            <div class="card-num">02</div>
            <h3>洒金万年红面料</h3>
            <p>采用特级防晒防水万年红云锦布料，久晒不退色，风吹不上翘，历久弥新。</p>
          </div>
          <div class="intro-card">
            <div class="card-num">03</div>
            <h3>尊贵礼盒全套装</h3>
            <p>含门幅双联、横批、斗方大福字及无痕粘贴胶，自用喜庆，送客户企业尽显尊贵。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. 分类商品动态抓取与展示模块 -->
    <section id="products" class="sf-products-section">
      <div class="section-container">
        <div class="section-title-bar">
          <div>
            <h2 class="title">【春联】分类精选上架商品</h2>
            <p class="subtitle">实时抓取当前商品库中归属于「春联/年货」分类下的专属款式</p>
          </div>
          <div class="product-count">共 {{ products.length }} 款春联专属商品</div>
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
              <p class="p-desc">{{ item.description || '高保真热转印烫金春联，字迹遒劲，历久弥新。' }}</p>
              <div class="p-foot">
                <span v-if="item.price" class="p-price">¥{{ item.price }}</span>
                <span class="p-link">查看详情 →</span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- 暂无分类商品引导 -->
        <div v-else class="empty-box">
          <div class="empty-icon">🧧</div>
          <h3>暂未检索到【春联】分类下的商品</h3>
          <p>管理员可以在后台【商品模块】中发布分类为「春联」的商品。你也可以直接打开 POD 设计工具创建图形！</p>
          <NuxtLink to="/design" class="btn-gold-outline">去设计工具创作</NuxtLink>
        </div>
      </div>
    </section>

    <!-- 4. 页脚 -->
    <footer class="sf-footer">
      <p>© 2026 乙巳年春联专属展示落地页 · 衣设 yishe 版权所有</p>
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
  title: '乙巳年新春手书春联 - 专属介绍落地页 - 衣设 yishe',
  description: '全新独立的春联专属介绍落地页。为您提供万年红金墨春联、门楣斗方福字与企业对联定制服务展示。',
})

const { fetchPublishedProducts } = usePublishedProducts()
const loading = ref(true)
const products = ref<StorefrontPublishedProduct[]>([])

onMounted(async () => {
  loading.value = true
  try {
    const res = await fetchPublishedProducts({
      type: '春联',
      searchText: '春联',
      pageSize: 20,
    })
    products.value = res || []
  } catch (err) {
    console.error('抓取春联分类商品失败:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.sf-standalone-landing {
  background-color: #610404;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  min-height: 100vh;
}

.sf-nav-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(74, 4, 4, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(212, 175, 55, 0.3);
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
  color: #f7d070;
  text-decoration: none;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-links a {
  color: #f3c2c2;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: #ffd700;
}

.btn-custom {
  background: linear-gradient(135deg, #ffd700 0%, #d4af37 100%);
  color: #4a0000 !important;
  font-weight: 800;
  padding: 6px 18px;
  border-radius: 20px;
}

.sf-hero-fullscreen {
  position: relative;
  padding: 80px 24px 100px;
  text-align: center;
  background: radial-gradient(circle at center, #8b0000 0%, #4a0000 100%);
  border-bottom: 2px solid #d4af37;
}

.hero-content-box {
  max-width: 900px;
  margin: 0 auto;
}

.sf-badge {
  display: inline-block;
  background: rgba(212, 175, 55, 0.2);
  border: 1px solid #d4af37;
  color: #ffe699;
  padding: 6px 18px;
  border-radius: 20px;
  font-size: 14px;
  margin-bottom: 24px;
}

.sf-main-title {
  font-size: 48px;
  font-weight: 900;
  letter-spacing: 2px;
  color: #ffe699;
  margin-bottom: 20px;
}

.sf-description {
  font-size: 17px;
  color: #f1b3b3;
  line-height: 1.6;
  max-width: 720px;
  margin: 0 auto 40px;
}

.couplet-showcase-box {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px dashed rgba(212, 175, 55, 0.5);
  border-radius: 16px;
  padding: 32px;
  max-width: 540px;
  margin: 0 auto 40px;
}

.scroll-unit {
  background: #bd0a0a;
  border: 2px solid #d4af37;
  padding: 16px 12px;
  border-radius: 6px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.4);
}

.couplet-font {
  writing-mode: vertical-rl;
  font-size: 22px;
  font-weight: 800;
  letter-spacing: 8px;
  color: #ffe699;
}

.center-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.batch-text {
  background: #bd0a0a;
  border: 2px solid #d4af37;
  padding: 6px 16px;
  color: #ffe699;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 4px;
  border-radius: 4px;
}

.diamond-fu {
  background: #bd0a0a;
  border: 2px solid #d4af37;
  width: 56px;
  height: 56px;
  transform: rotate(45deg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffe699;
  font-size: 26px;
  font-weight: 900;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.btn-primary-gold {
  background: linear-gradient(135deg, #ffd700 0%, #d4af37 100%);
  color: #4a0000;
  font-weight: 800;
  padding: 14px 32px;
  border-radius: 30px;
  text-decoration: none;
  box-shadow: 0 4px 16px rgba(212, 175, 55, 0.4);
}

.btn-secondary-red {
  border: 1px solid #ffd700;
  color: #ffd700;
  font-weight: 700;
  padding: 14px 32px;
  border-radius: 30px;
  text-decoration: none;
}

.sf-intro-section {
  padding: 80px 24px;
  background: #4a0000;
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
}

.intro-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
}

.intro-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 16px;
  padding: 32px;
}

.card-num {
  font-size: 36px;
  font-weight: 900;
  color: #d4af37;
  margin-bottom: 12px;
}

.intro-card h3 {
  font-size: 20px;
  font-weight: 700;
  color: #ffe699;
  margin-bottom: 10px;
}

.intro-card p {
  font-size: 14px;
  color: #e2a8a8;
  line-height: 1.6;
}

.sf-products-section {
  padding: 80px 24px;
}

.section-title-bar {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
  border-bottom: 1px solid rgba(212, 175, 55, 0.3);
  padding-bottom: 16px;
}

.title {
  font-size: 28px;
  font-weight: 800;
  color: #ffe699;
}

.subtitle {
  font-size: 14px;
  color: #f1b3b3;
  margin-top: 6px;
}

.product-count {
  background: rgba(0, 0, 0, 0.4);
  color: #f7d070;
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
  background: #4a0000;
  border: 1px solid rgba(212, 175, 55, 0.4);
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
  background: #330000;
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
  background: #bd0a0a;
  color: #ffe699;
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
  color: #f1b3b3;
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
  color: #ffd700;
}

.p-link {
  font-size: 13px;
  color: #f7d070;
}

.empty-box {
  text-align: center;
  padding: 60px 20px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px dashed rgba(212, 175, 55, 0.4);
  border-radius: 16px;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.btn-gold-outline {
  display: inline-block;
  margin-top: 16px;
  border: 1px solid #ffd700;
  color: #ffd700;
  padding: 8px 24px;
  border-radius: 20px;
  text-decoration: none;
  font-size: 14px;
}

.sf-footer {
  text-align: center;
  padding: 32px;
  background: #330000;
  color: #e2a8a8;
  font-size: 13px;
  border-top: 1px solid rgba(212, 175, 55, 0.2);
}
</style>
