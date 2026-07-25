<template>
  <div class="cup-yeti-page">
    <!-- Navbar -->
    <header class="yt-navbar">
      <div class="navbar-inner">
        <NuxtLink to="/" class="navbar-brand">
          <svg class="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <span>衣设 yishe</span>
        </NuxtLink>
        <nav class="navbar-links">
          <a href="#thermals">真空保温与材质</a>
          <a href="#thermal-studio">温变与容量模拟</a>
          <a href="#safety">食品级洗碗机安全</a>
          <a href="#products">分类商品</a>
          <NuxtLink to="/design" class="navbar-cta">去 POD 设计器</NuxtLink>
        </nav>
      </div>
    </header>

    <!-- Hero Header (Inspired by Yeti & Hydro Flask) -->
    <section class="yt-hero">
      <div class="hero-container animate-up">
        <div class="hero-badges">
          <span class="badge-item">TempShield™ 24H 保冷 12H 保温</span>
          <span class="badge-item">100% 洗碗机/微波炉适用</span>
          <span class="badge-item">BPA-Free 304 食品级不锈钢/高骨瓷</span>
        </div>
        <h1 class="hero-title">定制双层真空保温 & 温变马克杯</h1>
        <p class="hero-subtitle">
          参考 YETI 与 Society6 标杆水具打造。360° 全景热升华包裹印制，洗涤不褪色。支持温变感应与多容量规格模拟。
        </p>
      </div>
    </section>

    <!-- Section 1: Thermals & Materials (保温与材质三要素) -->
    <section id="thermals" class="yt-section yt-thermals">
      <div class="section-container">
        <div class="section-head text-center animate-up">
          <span class="section-tag">VACUUM & CERAMIC SPECS</span>
          <h2>水具材质与保温三大指标</h2>
          <p>从早晨咖啡到户外冰饮，时刻保持口感温度。</p>
        </div>

        <div class="tech-grid">
          <div class="tech-card animate-up" style="animation-delay: 0.05s">
            <div class="tech-icon">❄️</div>
            <h3>TempShield™ 双层真空隔离</h3>
            <p>双层 304 不锈钢抽真空层，杯外壁绝不结露汗湿，保温 12 小时、保冷 24 小时。</p>
          </div>
          <div class="tech-card animate-up" style="animation-delay: 0.1s">
            <div class="tech-icon">☕</div>
            <h3>高骨瓷热升华全景印花</h3>
            <p>高密度无瑕白瓷，釉面经过 800℃ 烧结，色彩深层锁定，耐酸碱且手感极其润滑。</p>
          </div>
          <div class="tech-card animate-up" style="animation-delay: 0.15s">
            <div class="tech-icon">🌿</div>
            <h3>BPA-Free 无毒安全认领</h3>
            <p>全系不含双酚A，杯盖采用食品级 Tritan 与防漏硅胶圈，热饮无异味析出。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: Interactive Thermal & Capacity Studio (温变与容量演练) -->
    <section id="thermal-studio" class="yt-section yt-studio">
      <div class="section-container">
        <div class="studio-card animate-up">
          <!-- Controls (Left) -->
          <div class="studio-controls">
            <div class="controls-title">
              <h3>☕ 容量规格与感温变色模拟器</h3>
              <p>切换水杯容量，并模拟注入热水时的神奇变色印花效果。</p>
            </div>

            <div class="control-block">
              <label>水杯容量与形态 (Capacity)</label>
              <div class="pill-group">
                <button
                  v-for="c in capacityList"
                  :key="c.id"
                  :class="{ active: selectedCapacity === c.id }"
                  @click="selectedCapacity = c.id"
                >
                  {{ c.name }}
                </button>
              </div>
            </div>

            <div class="control-block">
              <label>感温变色感应 (Thermal Magic)</label>
              <div class="toggle-box">
                <button :class="{ active: !isHotWater }" @click="isHotWater = false">❄️ 常温状态（黑色隐形）</button>
                <button :class="{ active: isHotWater }" @click="isHotWater = true">🔥 注入热水（感应显影）</button>
              </div>
            </div>

            <NuxtLink :to="`/design?preset=cup&cap=${selectedCapacity}&magic=${isHotWater ? '1' : '0'}`" class="btn-cta">
              ⚡ 带入此水具规格进入 POD 设计器
            </NuxtLink>
          </div>

          <!-- Preview Visual Stage (Right) -->
          <div class="studio-preview">
            <div class="cup-canvas-box">
              <svg class="cup-svg" viewBox="0 0 260 280" fill="none">
                <!-- Mug Body -->
                <rect x="50" y="40" width="140" height="200" rx="16" :fill="isHotWater ? '#0284C7' : '#18181B'" stroke="#38BDF8" stroke-width="4" style="transition: fill 0.4s ease;" />
                <!-- Mug Handle -->
                <path d="M190 70 C240 70 240 210 190 210" stroke="#38BDF8" stroke-width="12" fill="none" stroke-linecap="round" />

                <!-- Steam effects when hot -->
                <g v-if="isHotWater">
                  <path d="M90 25 C90 15 100 15 100 5" stroke="#BAE6FD" stroke-width="3" fill="none" stroke-linecap="round" />
                  <path d="M120 25 C120 15 130 15 130 5" stroke="#BAE6FD" stroke-width="3" fill="none" stroke-linecap="round" />
                  <path d="M150 25 C150 15 160 15 160 5" stroke="#BAE6FD" stroke-width="3" fill="none" stroke-linecap="round" />
                </g>

                <!-- Artwork area -->
                <rect x="70" y="80" width="100" height="120" rx="8" fill="#FFF" fill-opacity="0.9" />
                <text x="120" y="145" font-family="sans-serif" font-size="12" font-weight="900" :fill="isHotWater ? '#0284C7' : '#18181B'" text-anchor="middle">
                  {{ isHotWater ? '🔥 MAGIC REVEAL' : '🔒 HIDDEN PRINT' }}
                </text>
              </svg>

              <div class="preview-tag">当前模拟：{{ currentCapLabel }} · {{ isHotWater ? '热显荧光' : '常温隐藏' }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Safety & Care (洗碗机与食品安全说明) -->
    <section id="safety" class="yt-section yt-safety">
      <div class="section-container">
        <div class="section-head text-center animate-up">
          <span class="section-tag">DISHWASHER & MICROWAVE SAFE</span>
          <h2>严格安全认证与日常保养指南</h2>
          <p>满足美国 FDA 与欧盟 LFGB 食品级接触标准。</p>
        </div>

        <div class="safety-grid animate-up">
          <div class="safety-card">
            <h4>洗碗机耐洗测试</h4>
            <p>通过 500+ 次高压洗碗机高温冲洗测试，色彩依然鲜艳，无退色褪层。</p>
          </div>
          <div class="safety-card">
            <h4>微波炉加热安全</h4>
            <p>高骨瓷马克杯无任何金属边缘，可直接放微波炉加热牛奶与咖啡。</p>
          </div>
          <div class="safety-card">
            <h4>无死角圆润清洗</h4>
            <p>杯内壁采用大圆角设计，咖啡渍与茶垢一冲即净，不易滋生细菌。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Grid -->
    <section id="products" class="yt-section yt-products">
      <div class="section-container">
        <div class="section-head animate-up">
          <span class="section-tag">STOREFRONT PRODUCTS</span>
          <h2>【马克水杯】在售商品</h2>
          <p>展示平台已上架可直接下单定制的水杯载体。</p>
        </div>

        <div v-if="loading" class="products-grid">
          <div v-for="i in 4" :key="i" class="product-skeleton">
            <div class="sk-img" />
            <div class="sk-body"><div class="sk-line w-80" /><div class="sk-line w-50" /></div>
          </div>
        </div>

        <div v-else-if="products.length > 0" class="products-grid">
          <NuxtLink
            v-for="(item, i) in products"
            :key="item.id"
            :to="`/product/${item.id}`"
            class="product-card animate-up"
            :style="`animation-delay: ${i * 0.05}s`"
          >
            <div class="product-img-box">
              <img :src="item.imageUrl || ''" :alt="item.title" loading="lazy" />
              <span class="product-cat-tag">{{ item.category }}</span>
            </div>
            <div class="product-details">
              <h4 class="product-title">{{ item.title }}</h4>
              <div class="product-bottom">
                <span class="product-price">¥{{ item.price || '45.00' }}</span>
                <span class="product-btn">定制此款 →</span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div v-else class="empty-box animate-up">
          <div class="empty-icon">☕</div>
          <h3>暂无【水杯】分类在售商品</h3>
          <p>管理员可在后台发布分类为「水杯」的商品。您现在可以直接进入 POD 设计器自定图案！</p>
          <NuxtLink to="/design" class="btn-cta inline-btn">进入 POD 设计器</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="yt-footer">
      <div class="footer-container">
        <span class="footer-brand">衣设 yishe · 保温水具落地页</span>
        <p>© 2026 yishe. All rights reserved.</p>
        <NuxtLink to="/" class="footer-link">← 返回主站</NuxtLink>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePublishedProducts, type StorefrontPublishedProduct } from '~/composables/use-published-products'

definePageMeta({ layout: false })

useSeoMeta({
  title: '双层真空保温水杯定制 · 骨瓷热升华马克杯 · 衣设 yishe',
  ogTitle: '双层真空保温水杯定制 · 骨瓷热升华马克杯 · 衣设 yishe',
  description: '参考 YETI / Society6 标杆水具打造，TempShield 双层真空 24H 保冷，支持 11oz/15oz/20oz 规格与感温变色模拟。',
  keywords: '水杯定制, POD马克杯, YETI保温杯定制, 感温变色杯, 骨瓷咖啡杯定制'
})

const selectedCapacity = ref('11oz')
const isHotWater = ref(false)

const capacityList = [
  { id: '11oz', name: '11 oz (330ml 经典马克杯)' },
  { id: '15oz', name: '15 oz (450ml 大容量咖啡杯)' },
  { id: '20oz', name: '20 oz (600ml 真空随行保温杯)' }
]

const currentCapLabel = computed(() => {
  const match = capacityList.find(c => c.id === selectedCapacity.value)
  return match ? match.name : '11 oz'
})

const { fetchPublishedProducts } = usePublishedProducts()
const loading = ref(true)
const products = ref<StorefrontPublishedProduct[]>([])

onMounted(async () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.08 })

  document.querySelectorAll('.animate-up').forEach(el => observer.observe(el))

  loading.value = true
  try {
    const res = await fetchPublishedProducts({ type: '马克杯', pageSize: 20 })
    products.value = res || []
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.cup-yeti-page {
  --bg-page: #030712;
  --bg-card: #0F172A;
  --bg-input: #1E293B;
  --accent: #0284C7;
  --text-main: #F8FAFC;
  --text-sub: #94A3B8;
  --border: #1E293B;

  min-height: 100vh;
  background: var(--bg-page);
  color: var(--text-main);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.yt-navbar { position: sticky; top: 0; z-index: 100; background: rgba(3, 7, 18, 0.92); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border); padding: 0 24px; }
.navbar-inner { max-width: 1240px; margin: 0 auto; height: 64px; display: flex; align-items: center; justify-content: space-between; }
.navbar-brand { display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 19px; color: var(--text-main); text-decoration: none; }
.brand-icon { width: 22px; height: 22px; stroke: var(--accent); }
.navbar-links { display: flex; align-items: center; gap: 28px; }
.navbar-links a { color: var(--text-sub); text-decoration: none; font-size: 13.5px; font-weight: 600; }
.navbar-cta { background: var(--accent); color: #FFF !important; font-weight: 800; padding: 8px 18px; border-radius: 8px; }

.yt-hero { padding: 70px 24px 50px; text-align: center; border-bottom: 1px solid var(--border); }
.hero-container { max-width: 840px; margin: 0 auto; }
.hero-badges { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; }
.badge-item { background: rgba(2, 132, 199, 0.12); color: var(--accent); border: 1px solid rgba(2, 132, 199, 0.3); font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 9999px; }
.hero-title { font-size: clamp(2.2rem, 4.5vw, 3.6rem); font-weight: 800; margin-bottom: 16px; letter-spacing: -0.02em; }
.hero-subtitle { font-size: 1.05rem; color: var(--text-sub); line-height: 1.7; }

.yt-section { padding: 80px 24px; }
.section-container { max-width: 1240px; margin: 0 auto; }
.section-head { margin-bottom: 48px; }
.section-head.text-center { text-align: center; }
.section-tag { font-size: 11px; font-weight: 800; letter-spacing: 0.12em; color: var(--accent); display: block; margin-bottom: 8px; }
.section-head h2 { font-size: 2.2rem; font-weight: 800; margin-bottom: 8px; }
.section-head p { font-size: 14px; color: var(--text-sub); }

.tech-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
.tech-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 18px; padding: 32px; }
.tech-icon { font-size: 32px; margin-bottom: 14px; }
.tech-card h3 { font-size: 18px; font-weight: 800; margin-bottom: 8px; }
.tech-card p { font-size: 13.5px; color: var(--text-sub); line-height: 1.6; margin: 0; }

.studio-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 24px; padding: 36px; display: grid; grid-template-columns: 440px 1fr; gap: 40px; }
@media (max-width: 960px) { .studio-card { grid-template-columns: 1fr; } }
.controls-title h3 { font-size: 20px; font-weight: 800; color: var(--accent); margin-bottom: 4px; }
.controls-title p { font-size: 13px; color: var(--text-sub); margin-bottom: 24px; }
.control-block { margin-bottom: 20px; }
.control-block label { font-size: 12px; font-weight: 700; color: var(--text-sub); display: block; margin-bottom: 8px; }

.pill-group { display: flex; gap: 8px; flex-wrap: wrap; }
.pill-group button { background: var(--bg-input); border: 1px solid var(--border); color: var(--text-sub); padding: 8px 14px; border-radius: 8px; font-size: 12.5px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
.pill-group button.active { background: var(--accent); color: #FFF; border-color: var(--accent); }

.toggle-box { display: flex; gap: 10px; }
.toggle-box button { flex: 1; padding: 10px; background: var(--bg-input); border: 1px solid var(--border); color: var(--text-sub); border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
.toggle-box button.active { background: #0284C7; color: #FFF; border-color: #0284C7; }

.btn-cta { display: block; text-align: center; background: var(--accent); color: #FFF; font-weight: 800; padding: 14px; border-radius: 10px; text-decoration: none; margin-top: 24px; }
.inline-btn { display: inline-block; padding: 12px 28px; }

.studio-preview { background: var(--bg-page); border: 1px solid var(--border); border-radius: 18px; padding: 36px; display: flex; justify-content: center; align-items: center; min-height: 380px; }
.cup-canvas-box { display: flex; flex-direction: column; align-items: center; gap: 16px; }
.cup-svg { width: 240px; height: 260px; }
.preview-tag { font-size: 12px; font-weight: 800; color: var(--accent); background: rgba(2, 132, 199, 0.1); padding: 4px 14px; border-radius: 9999px; }

.safety-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
.safety-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 24px; }
.safety-card h4 { font-size: 16px; font-weight: 800; color: var(--accent); margin-bottom: 8px; }
.safety-card p { font-size: 13px; color: var(--text-sub); line-height: 1.5; margin: 0; }

.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; }
.product-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; text-decoration: none; color: var(--text-main); transition: transform 0.2s; }
.product-card:hover { transform: translateY(-4px); }
.product-img-box { position: relative; width: 100%; padding-top: 100%; background: #1E293B; }
.product-img-box img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.product-cat-tag { position: absolute; top: 12px; left: 12px; background: var(--accent); color: #FFF; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; }
.product-details { padding: 18px; }
.product-title { font-size: 15px; font-weight: 800; margin-bottom: 6px; }
.product-desc { font-size: 12px; color: var(--text-sub); line-height: 1.5; margin-bottom: 16px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.product-bottom { display: flex; justify-content: space-between; align-items: center; }
.product-price { font-size: 18px; font-weight: 800; color: var(--accent); }
.product-btn { font-size: 13px; font-weight: 800; color: var(--text-main); }

.empty-box { text-align: center; padding: 60px 24px; background: var(--bg-card); border: 1px dashed var(--border); border-radius: 20px; }
.empty-icon { font-size: 32px; margin-bottom: 12px; }
.empty-box h3 { font-size: 1.1rem; font-weight: 800; margin-bottom: 8px; }
.empty-box p { color: var(--text-sub); font-size: 14px; max-width: 440px; margin: 0 auto 20px; }

.yt-footer { padding: 28px 24px; background: #030712; border-top: 1px solid var(--border); }
.footer-container { max-width: 1240px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; font-size: 13px; color: var(--text-sub); }
.footer-brand { font-weight: 800; color: var(--accent); }
.footer-link { color: var(--text-main); text-decoration: none; font-weight: 700; }

.animate-up { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
.animate-up.in-view { opacity: 1; transform: translateY(0); }
</style>
