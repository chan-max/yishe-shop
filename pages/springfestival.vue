<template>
  <NuxtLayout name="page">
    <div class="spring-festival-landing">
      <!-- 1. 沉浸式中国红黑金 Header Hero 区域 -->
      <section class="sf-hero-banner">
        <div class="sf-hero-content">
          <div class="sf-tag-badge">
            <span>🧧 乙巳年新春大吉 · 专属喜庆定制</span>
          </div>
          <h1 class="sf-title">
            手书新春佳联 <span>名家金墨定制</span>
          </h1>
          <p class="sf-subtitle">
            传统书法气象与现代高保真印花科技的碰撞。定制专属门楣横批、上下联及烫金福字，为家纳福，为企业添彩。
          </p>

          <!-- 交互式春联快速效果模拟展示 -->
          <div class="sf-couplet-interactive-card">
            <div class="couplet-preview-stage">
              <div class="couplet-scroll couplet-left">
                <span class="couplet-text">迎春接福禧盈门</span>
              </div>
              <div class="couplet-center-box">
                <div class="horizontal-batch">吉星高照</div>
                <div class="fu-square">福</div>
              </div>
              <div class="couplet-scroll couplet-right">
                <span class="couplet-text">贺岁纳财吉祥到</span>
              </div>
            </div>
            <div class="sf-action-row">
              <NuxtLink to="/design" class="sf-btn-primary">
                ✨ 开始专属春联在线设计
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. 分类商品动态绑定与展示区域 -->
      <section class="sf-products-section">
        <div class="sf-section-header">
          <div class="header-left">
            <h2 class="section-title">春联 / 喜庆年货 专属系列商品</h2>
            <p class="section-desc">已为你自动筛选库中【春联】分类下的上线定制商品</p>
          </div>
          <div class="header-right">
            <span class="count-badge">共 {{ products.length }} 款春联专属款</span>
          </div>
        </div>

        <!-- 商品加载状态 -->
        <div v-if="loading" class="sf-loading-grid">
          <div v-for="i in 4" :key="i" class="sf-skeleton-card" />
        </div>

        <!-- 商品列表 (如果有精准匹配分类商品) -->
        <div v-else-if="products.length > 0" class="sf-product-grid">
          <NuxtLink
            v-for="item in products"
            :key="item.id"
            :to="`/product/${item.id}`"
            class="sf-product-card"
          >
            <div class="card-image-box">
              <img :src="item.imageUrl" :alt="item.title" loading="lazy" />
              <span class="category-tag">{{ item.category }}</span>
            </div>
            <div class="card-info">
              <h3 class="product-name">{{ item.title }}</h3>
              <p class="product-desc">{{ item.description || '高保真热转印烫金春联，字迹遒劲，历久弥新。' }}</p>
              <div class="price-row">
                <strong v-if="item.price" class="price-text">¥{{ item.price }}</strong>
                <span class="detail-btn">定制该款式 →</span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- 如果暂无对应分类商品的温馨引导 -->
        <div v-else class="sf-empty-state">
          <div class="empty-icon">🧧</div>
          <h3>尚未检索到特定分类的春联发布商品</h3>
          <p>管理员可以在后台【商品模块】中添加分类为「春联」的商品。你现在依然可以直接进入 POD 设工具设计春联！</p>
          <NuxtLink to="/design" class="sf-btn-outline">进入设计器自由创作春联</NuxtLink>
        </div>
      </section>

      <!-- 3. 春联特色亮点区 -->
      <section class="sf-features">
        <div class="feature-grid">
          <div class="feature-item">
            <div class="icon">🖌️</div>
            <h4>名家手书库</h4>
            <p>内置楷、行、草、隶、篆及现代金墨等多种高精度矢量字体，满足个性化对仗审美。</p>
          </div>
          <div class="feature-item">
            <div class="icon">📜</div>
            <h4>洒金万年红布料</h4>
            <p>采用特级防晒防水万年红宣纸与云锦织造布，户外风吹日晒不褪色、不上翘。</p>
          </div>
          <div class="feature-item">
            <div class="icon">📦</div>
            <h4>精美礼盒包装</h4>
            <p>含门幅双联、横批、斗方福字及无痕胶贴，新春自用或送客户企业尊贵典雅。</p>
          </div>
        </div>
      </section>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePublishedProducts, type StorefrontPublishedProduct } from '~/composables/use-published-products'

definePageMeta({
  layout: 'page',
})

useSeoMeta({
  title: '春联专属定制 - 新春手书烫金春联 - 衣设 yishe',
  description: '衣设独立站新春佳节专属春联定制落地页。为您提供万年红金墨春联、门楣斗方福字与企业对联定制服务。',
})

const { fetchPublishedProducts } = usePublishedProducts()
const loading = ref(true)
const products = ref<StorefrontPublishedProduct[]>([])

onMounted(async () => {
  loading.value = true
  try {
    // 自动抓取分类为 春联 或 包含 春联 关键词的商品
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
.spring-festival-landing {
  background-color: #7f0909;
  color: #fff;
  min-height: 100vh;
}

.sf-hero-banner {
  background: linear-gradient(180deg, #580000 0%, #8b0000 100%);
  padding: 60px 24px 80px;
  text-align: center;
  border-bottom: 2px solid #d4af37;
}

.sf-hero-content {
  max-width: 960px;
  margin: 0 auto;
}

.sf-tag-badge {
  display: inline-block;
  background: rgba(212, 175, 55, 0.2);
  border: 1px solid #d4af37;
  color: #f7d070;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  margin-bottom: 20px;
}

.sf-title {
  font-size: 42px;
  font-weight: 900;
  letter-spacing: 2px;
  margin-bottom: 16px;
  color: #fff;
}

.sf-title span {
  color: #f7d070;
  background: linear-gradient(135deg, #ffe599 0%, #d4af37 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.sf-subtitle {
  font-size: 16px;
  color: #f3c2c2;
  max-width: 680px;
  margin: 0 auto 36px;
  line-height: 1.6;
}

.sf-couplet-interactive-card {
  background: rgba(40, 0, 0, 0.4);
  border: 1px dashed rgba(212, 175, 55, 0.5);
  border-radius: 16px;
  padding: 32px;
  max-width: 600px;
  margin: 0 auto;
}

.couplet-preview-stage {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-bottom: 24px;
}

.couplet-scroll {
  background: #bb0a0a;
  border: 2px solid #d4af37;
  padding: 16px 10px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.couplet-text {
  writing-mode: vertical-rl;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 6px;
  color: #ffe699;
}

.couplet-center-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.horizontal-batch {
  background: #bb0a0a;
  border: 2px solid #d4af37;
  padding: 6px 16px;
  color: #ffe699;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 4px;
  border-radius: 4px;
}

.fu-square {
  background: #bb0a0a;
  border: 2px solid #d4af37;
  width: 54px;
  height: 54px;
  transform: rotate(45deg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffe699;
  font-size: 24px;
  font-weight: 900;
}

.sf-btn-primary {
  display: inline-block;
  background: linear-gradient(135deg, #ffd700 0%, #d4af37 100%);
  color: #4a0000;
  font-size: 16px;
  font-weight: 800;
  padding: 12px 32px;
  border-radius: 30px;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 16px rgba(212, 175, 55, 0.4);
}

.sf-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(212, 175, 55, 0.6);
}

.sf-products-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 24px;
}

.sf-section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 32px;
  border-bottom: 1px solid rgba(212, 175, 55, 0.3);
  padding-bottom: 16px;
}

.section-title {
  font-size: 24px;
  font-weight: 800;
  color: #ffd700;
}

.section-desc {
  font-size: 14px;
  color: #f5b0b0;
  margin-top: 4px;
}

.count-badge {
  background: rgba(0, 0, 0, 0.3);
  padding: 6px 14px;
  border-radius: 12px;
  font-size: 13px;
  color: #f7d070;
}

.sf-product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
}

.sf-product-card {
  background: #630505;
  border: 1px solid rgba(212, 175, 55, 0.4);
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  color: #fff;
  transition: transform 0.2s, border-color 0.2s;
}

.sf-product-card:hover {
  transform: translateY(-4px);
  border-color: #ffd700;
}

.card-image-box {
  position: relative;
  width: 100%;
  padding-top: 100%;
  background: #3c0000;
}

.card-image-box img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(187, 10, 10, 0.9);
  color: #ffe699;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid #d4af37;
}

.card-info {
  padding: 16px;
}

.product-name {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 6px;
  color: #fff;
}

.product-desc {
  font-size: 12px;
  color: #f1b3b3;
  line-height: 1.4;
  margin-bottom: 12px;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price-text {
  font-size: 18px;
  color: #ffd700;
}

.detail-btn {
  font-size: 13px;
  color: #f7d070;
}

.sf-empty-state {
  text-align: center;
  padding: 60px 20px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  border: 1px dashed rgba(212, 175, 55, 0.4);
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.sf-btn-outline {
  display: inline-block;
  margin-top: 16px;
  border: 1px solid #ffd700;
  color: #ffd700;
  padding: 8px 24px;
  border-radius: 20px;
  text-decoration: none;

  font-size: 14px;
}

.sf-features {
  background: #500000;
  border-top: 1px solid rgba(212, 175, 55, 0.3);
  padding: 60px 24px;
}

.feature-grid {
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
}

.feature-item {
  text-align: center;
}

.feature-item .icon {
  font-size: 36px;
  margin-bottom: 12px;
}

.feature-item h4 {
  font-size: 18px;
  font-weight: 700;
  color: #ffd700;
  margin-bottom: 8px;
}

.feature-item p {
  font-size: 13px;
  color: #e2a8a8;
  line-height: 1.5;
}
</style>
