<template>
  <NuxtLayout name="page">
    <div class="cup-landing-page">
      <!-- 1. 现代极简/科技感 Hero 区域 -->
      <section class="cup-hero-banner">
        <div class="cup-hero-wrapper">
          <div class="cup-hero-text">
            <span class="cup-pill">☕ 专属饮具定制 · 灵感好物</span>
            <h1 class="cup-title">
              一口专属温度 <span>印下你的灵感故事</span>
            </h1>
            <p class="cup-subtitle">
              精选高骨瓷、304 医用级不锈钢与高硼硅玻璃。支持 360° 环绕热升华高保真印花、温变惊艳呈现与激光雕刻工艺。
            </p>

            <div class="cup-cta-group">
              <NuxtLink to="/design" class="cup-btn-primary">
                ⚡ 立即定制你的专属杯子
              </NuxtLink>
            </div>
          </div>

          <!-- 杯型展示展台 preview -->
          <div class="cup-showcase-stage">
            <div class="cup-mockup-card">
              <div class="cup-circle-glow" />
              <div class="cup-avatar-icon">☕</div>
              <div class="cup-type-badge">骨瓷马克杯 · 高保真升华</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. 分类商品动态绑定与展示区域 -->
      <section class="cup-products-section">
        <div class="cup-section-header">
          <div>
            <h2 class="section-title">马克杯 / 水杯 专属定制商品</h2>
            <p class="section-desc">已为你自动抓取库中【杯子/马克杯】分类下的上线商品</p>
          </div>
          <span class="cup-count-tag">共 {{ products.length }} 款饮具商品</span>
        </div>

        <!-- 骨架图加载 -->
        <div v-if="loading" class="cup-skeleton-grid">
          <div v-for="i in 4" :key="i" class="cup-skeleton-item" />
        </div>

        <!-- 动态抓取商品列表 -->
        <div v-else-if="products.length > 0" class="cup-product-grid">
          <NuxtLink
            v-for="item in products"
            :key="item.id"
            :to="`/product/${item.id}`"
            class="cup-product-card"
          >
            <div class="card-thumb">
              <img :src="item.imageUrl" :alt="item.title" loading="lazy" />
              <span class="type-pill">{{ item.category }}</span>
            </div>
            <div class="card-details">
              <h3 class="name">{{ item.title }}</h3>
              <p class="desc">{{ item.description || '高保真热升华工艺，耐洗洗碗机适用，手感温润细腻。' }}</p>
              <div class="card-footer">
                <span v-if="item.price" class="price">¥{{ item.price }}</span>
                <span class="link-text">定制此款 →</span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- 暂无分类商品时的引导 -->
        <div v-else class="cup-empty">
          <div class="icon">☕</div>
          <h3>暂未检索到【杯子】分类下的发布商品</h3>
          <p>管理员可以在后台【商品模块】添加分类为「杯子」或「马克杯」的商品。你也可以直接打开 POD 设计工具定制图案！</p>
          <NuxtLink to="/design" class="cup-btn-secondary">去设计器印杯子</NuxtLink>
        </div>
      </section>

      <!-- 3. 杯子定制材质与工艺选型展示 -->
      <section class="cup-crafts">
        <div class="crafts-wrapper">
          <h2 class="crafts-title">多重精致材质与印制工艺</h2>
          <div class="crafts-grid">
            <div class="craft-card">
              <div class="craft-icon">✨</div>
              <h4>骨瓷马克杯</h4>
              <p>釉面温润如玉，透光度高。适合复古插画、品牌 LOGO 及名画印花。</p>
            </div>
            <div class="craft-card">
              <div class="craft-icon">🔥</div>
              <h4>温变魔术杯</h4>
              <p>倒入 50℃ 以上热水后，杯身黑色涂层迅速消退，瞬间惊喜呈现隐藏图案。</p>
            </div>
            <div class="craft-card">
              <div class="craft-icon">❄️</div>
              <h4>不锈钢保温杯</h4>
              <p>双层抽真空保温，结合激光精雕与 UV 立体油墨，兼具户外实用与美感。</p>
            </div>
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
  title: '水杯/马克杯专属定制 - 创意礼物与饮具印花 - 衣设 yishe',
  description: '衣设独立站马克杯与水杯专属定制落地页。为您提供高骨瓷马克杯、魔术温变杯与保温杯的个性化在线印花定制服务。',
})

const { fetchPublishedProducts } = usePublishedProducts()
const loading = ref(true)
const products = ref<StorefrontPublishedProduct[]>([])

onMounted(async () => {
  loading.value = true
  try {
    // 自动抓取分类为 杯子 或 马克杯 的商品
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
.cup-landing-page {
  background-color: #f8fafc;
  color: #0f172a;
  min-height: 100vh;
}

.cup-hero-banner {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #fff;
  padding: 80px 24px;
}

.cup-hero-wrapper {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}

@media (max-width: 768px) {
  .cup-hero-wrapper {
    grid-template-columns: 1fr;
  }
}

.cup-pill {
  display: inline-block;
  background: rgba(56, 189, 248, 0.15);
  border: 1px solid #38bdf8;
  color: #38bdf8;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 20px;
}

.cup-title {
  font-size: 40px;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 16px;
}

.cup-title span {
  display: block;
  background: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.cup-subtitle {
  font-size: 16px;
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 32px;
}

.cup-btn-primary {
  display: inline-block;
  background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%);
  color: #fff;
  font-weight: 700;
  padding: 14px 32px;
  border-radius: 30px;
  text-decoration: none;
  box-shadow: 0 4px 20px rgba(37, 99, 235, 0.4);
  transition: transform 0.2s, box-shadow 0.2s;
}

.cup-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(37, 99, 235, 0.6);
}

.cup-showcase-stage {
  display: flex;
  justify-content: center;
}

.cup-mockup-card {
  position: relative;
  width: 260px;
  height: 260px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(12px);
}

.cup-circle-glow {
  position: absolute;
  width: 140px;
  height: 140px;
  background: #38bdf8;
  filter: blur(60px);
  opacity: 0.3;
}

.cup-avatar-icon {
  font-size: 80px;
  z-index: 1;
}

.cup-type-badge {
  z-index: 1;
  font-size: 13px;
  color: #cbd5e1;
  margin-top: 16px;
  background: rgba(0, 0, 0, 0.4);
  padding: 4px 12px;
  border-radius: 12px;
}

.cup-products-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 24px;
}

.cup-section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 32px;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 16px;
}

.section-title {
  font-size: 24px;
  font-weight: 800;
  color: #0f172a;
}

.section-desc {
  font-size: 14px;
  color: #64748b;
  margin-top: 4px;
}

.cup-count-tag {
  background: #e0f2fe;
  color: #0369a1;
  font-size: 13px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 12px;
}

.cup-product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
}

.cup-product-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;
}

.cup-product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
}

.card-thumb {
  position: relative;
  width: 100%;
  padding-top: 100%;
  background: #f1f5f9;
}

.card-thumb img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.type-pill {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(15, 23, 42, 0.8);
  color: #fff;
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 6px;
}

.card-details {
  padding: 16px;
}

.name {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 6px;
}

.desc {
  font-size: 13px;
  color: #64748b;
  line-height: 1.4;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 18px;
  font-weight: 800;
  color: #0284c7;
}

.link-text {
  font-size: 13px;
  font-weight: 600;
  color: #2563eb;
}

.cup-empty {
  text-align: center;
  padding: 60px 20px;
  background: #fff;
  border-radius: 16px;
  border: 1px dashed #cbd5e1;
}

.cup-empty .icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.cup-btn-secondary {
  display: inline-block;
  margin-top: 16px;
  background: #0f172a;
  color: #fff;
  padding: 10px 24px;
  border-radius: 20px;
  text-decoration: none;
  font-size: 14px;
}

.cup-crafts {
  background: #fff;
  border-top: 1px solid #e2e8f0;
  padding: 60px 24px;
}

.crafts-wrapper {
  max-width: 1100px;
  margin: 0 auto;
}

.crafts-title {
  text-align: center;
  font-size: 26px;
  font-weight: 800;
  margin-bottom: 40px;
}

.crafts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
}

.craft-card {
  padding: 24px;
  background: #f8fafc;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  text-align: center;
}

.craft-icon {
  font-size: 36px;
  margin-bottom: 12px;
}

.craft-card h4 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
}

.craft-card p {
  font-size: 13px;
  color: #64748b;
  line-height: 1.5;
}
</style>
