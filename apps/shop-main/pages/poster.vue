<template>
  <div class="poster-desenio-page">
    <!-- Navbar -->
    <header class="ds-navbar">
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
          <a href="#giclee-tech">12色艺术微喷</a>
          <a href="#wall-studio">画廊墙与装框演练</a>
          <a href="#sizes">画幅尺寸指南</a>
          <a href="#products">分类商品</a>
          <NuxtLink to="/design" class="navbar-cta">去 POD 设计器</NuxtLink>
        </nav>
      </div>
    </header>

    <!-- Hero Header (Inspired by Desenio & Society6) -->
    <section class="ds-hero">
      <div class="hero-container animate-up">
        <div class="hero-badges">
          <span class="badge-item">230g 德国无酸纯棉艺术纸</span>
          <span class="badge-item">Epson 原装 12 色微喷</span>
          <span class="badge-item">100 年抗光衰画廊级复刻</span>
        </div>
        <h1 class="hero-title">画廊级 12 色微喷艺术海报 & 框材</h1>
        <p class="hero-subtitle">
          参考 Desenio 与 Society6 标杆画廊打造。无酸棉质面理，无反射眩光。在下方 Room Studio 中模拟不同相框与墙面家居氛围。
        </p>
      </div>
    </section>

    <!-- Section 1: Giclee Tech & Paper Specs (画廊三大品质支撑) -->
    <section id="giclee-tech" class="ds-section ds-tech">
      <div class="section-container">
        <div class="section-head text-center animate-up">
          <span class="section-tag">ARCHIVAL QUALITY & PAPER SPECS</span>
          <h2>画廊级复刻的三大核心标准</h2>
          <p>让插画师、摄影师与艺术收藏者的作品长久璀璨。</p>
        </div>

        <div class="tech-grid">
          <div class="tech-card animate-up" style="animation-delay: 0.05s">
            <div class="tech-icon">🎨</div>
            <h3>Epson 原装 12 色颜料微喷</h3>
            <p>包含三重黑色与扩展色域，阶调极其流畅细腻，暗部细节沉稳饱满，彻底告别偏色。</p>
          </div>
          <div class="tech-card animate-up" style="animation-delay: 0.1s">
            <div class="tech-icon">📄</div>
            <h3>230g 德国无酸纯棉艺术纸</h3>
            <p>pH 值呈中性，彻底避免普通铜版纸随时间变黄变脆，触摸体验温润柔细。</p>
          </div>
          <div class="tech-card animate-up" style="animation-delay: 0.15s">
            <div class="tech-icon">🖼️</div>
            <h3>实木框材与卡纸衬边 (Mat)</h3>
            <p>配套哑光黑铝框、自然原木与胡桃木实木框，内嵌白卡纸衬边 (Mat Border)，提升层次感。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: Interactive Room & Frame Studio (Desenio 风格 Room Studio) -->
    <section id="wall-studio" class="ds-section ds-studio">
      <div class="section-container">
        <div class="studio-card animate-up">
          <!-- Controls (Left) -->
          <div class="studio-controls">
            <div class="controls-title">
              <h3>🖼️ Desenio 风格 Room Studio</h3>
              <p>切换相框材质、室内墙面基调与海报尺寸。</p>
            </div>

            <div class="control-block">
              <label>相框材质 (Frame Finish)</label>
              <div class="pill-group">
                <button
                  v-for="f in frameOptions"
                  :key="f.id"
                  :class="{ active: selectedFrame === f.id }"
                  @click="selectedFrame = f.id"
                >
                  {{ f.name }}
                </button>
              </div>
            </div>

            <div class="control-block">
              <label>室内墙面色彩 (Wall Backdrop)</label>
              <div class="pill-group">
                <button
                  v-for="w in wallOptions"
                  :key="w.id"
                  :class="{ active: selectedWall === w.id }"
                  @click="selectedWall = w.id"
                >
                  {{ w.name }}
                </button>
              </div>
            </div>

            <div class="control-block">
              <label>画幅尺寸 (Poster Dimension)</label>
              <div class="pill-group">
                <button
                  v-for="s in sizeOptions"
                  :key="s.id"
                  :class="{ active: selectedSize === s.id }"
                  @click="selectedSize = s.id"
                >
                  {{ s.name }}
                </button>
              </div>
            </div>

            <NuxtLink :to="`/design?preset=poster&frame=${selectedFrame}&size=${selectedSize}`" class="btn-cta">
              ⚡ 带着此装框搭配进入 POD 设计器
            </NuxtLink>
          </div>

          <!-- Preview Stage (Right) -->
          <div class="studio-preview" :style="{ background: currentWallColor }">
            <div class="art-display-viewport">
              <div class="art-frame-container" :class="[selectedFrame, selectedSize]">
                <div class="card-mat-border">
                  <svg class="poster-svg" viewBox="0 0 200 280" fill="none">
                    <rect width="200" height="280" fill="#1C1917" />
                    <circle cx="100" cy="110" r="45" fill="#A16207" opacity="0.9" />
                    <path d="M40 220 L100 160 L160 220 Z" fill="#D4AF37" opacity="0.8" />
                    <text x="100" y="250" font-family="serif" font-size="11" font-weight="900" fill="#E7E5E4" text-anchor="middle">GALLERY ART</text>
                  </svg>
                </div>
              </div>
              <div class="preview-tag">当前模拟：{{ currentFrameLabel }} · {{ currentSizeLabel }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Dimension Guide (画幅尺寸说明) -->
    <section id="sizes" class="ds-section ds-sizes">
      <div class="section-container">
        <div class="section-head text-center animate-up">
          <span class="section-tag">DIMENSION GUIDE</span>
          <h2>标准国际画幅规格</h2>
          <p>提供常见的标准比例，方便选购市售画框。</p>
        </div>

        <div class="size-grid animate-up">
          <div class="size-card">
            <h4>A3 尺寸 (297 × 420 mm)</h4>
            <p>适合书房桌面、玄关小画框、组合画廊墙拼图。</p>
          </div>
          <div class="size-card">
            <h4>A2 尺寸 (420 × 594 mm·标杆)</h4>
            <p>最受欢迎的客餐厅独立挂画规格，视觉比例极其工整。</p>
          </div>
          <div class="size-card">
            <h4>A1 巨幅 (594 × 841 mm)</h4>
            <p>适合沙发背景墙、大客厅与画廊展览主主视觉，气场十足。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Grid -->
    <section id="products" class="ds-section ds-products">
      <div class="section-container">
        <div class="section-head animate-up">
          <span class="section-tag">STOREFRONT PRODUCTS</span>
          <h2>【艺术海报】在售商品</h2>
          <p>展示平台已上架可直接下单定制的海报挂画载体。</p>
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
                <span class="product-price">¥{{ item.price || '69.00' }}</span>
                <span class="product-btn">定制此款 →</span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div v-else class="empty-box animate-up">
          <div class="empty-icon">🖼️</div>
          <h3>暂无【海报】分类在售商品</h3>
          <p>管理员可在后台发布分类为「海报」的商品。您现在可以直接进入 POD 设计器自定图案！</p>
          <NuxtLink to="/design" class="btn-cta inline-btn">进入 POD 设计器</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="ds-footer">
      <div class="footer-container">
        <span class="footer-brand">衣设 yishe · 艺术海报落地页</span>
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
  title: '画廊级 12 色微喷艺术海报定制 · Desenio 标杆 · 衣设 yishe',
  ogTitle: '画廊级 12 色微喷艺术海报定制 · Desenio 标杆 · 衣设 yishe',
  description: '参考 Desenio / Society6 标杆打造，230g 德国无酸纯棉纸与 12 色原装微喷，支持多种实木相框与 Room Studio 墙面演练。',
  keywords: '海报定制, POD海报, Desenio海报, 艺术微喷海报, 装饰画框定制'
})

const selectedFrame = ref('frame-black')
const selectedWall = ref('wall-white')
const selectedSize = ref('size-a2')

const frameOptions = [
  { id: 'frame-black', name: '极简哑光铝合金黑框' },
  { id: 'frame-wood', name: '自然浅色原木框' },
  { id: 'frame-walnut', name: '复古黑胡桃木框' }
]

const wallOptions = [
  { id: 'wall-white', name: '极简纯白墙', bg: '#FAFAF9' },
  { id: 'wall-gray', name: '工业水泥灰', bg: '#3F3F46' },
  { id: 'wall-olive', name: '墨绿画廊墙', bg: '#064E3B' }
]

const sizeOptions = [
  { id: 'size-a3', name: 'A3 (297×420mm)' },
  { id: 'size-a2', name: 'A2 (420×594mm·推荐)' },
  { id: 'size-a1', name: 'A1 巨幅 (594×841mm)' }
]

const currentWallColor = computed(() => {
  const match = wallOptions.find(w => w.id === selectedWall.value)
  return match ? match.bg : '#FAFAF9'
})

const currentFrameLabel = computed(() => {
  const match = frameOptions.find(f => f.id === selectedFrame.value)
  return match ? match.name : '极简哑光铝合金黑框'
})

const currentSizeLabel = computed(() => {
  const match = sizeOptions.find(s => s.id === selectedSize.value)
  return match ? match.name : 'A2'
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
    const res = await fetchPublishedProducts({ type: '海报', pageSize: 20 })
    products.value = res || []
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.poster-desenio-page {
  --bg-page: #100E0C;
  --bg-card: #1C1917;
  --bg-input: #27272A;
  --accent: #A16207;
  --text-main: #FAFAF9;
  --text-sub: #A1A1AA;
  --border: #27272A;

  min-height: 100vh;
  background: var(--bg-page);
  color: var(--text-main);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.ds-navbar { position: sticky; top: 0; z-index: 100; background: rgba(16, 14, 12, 0.92); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border); padding: 0 24px; }
.navbar-inner { max-width: 1240px; margin: 0 auto; height: 64px; display: flex; align-items: center; justify-content: space-between; }
.navbar-brand { display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 19px; color: var(--text-main); text-decoration: none; }
.brand-icon { width: 22px; height: 22px; stroke: var(--accent); }
.navbar-links { display: flex; align-items: center; gap: 28px; }
.navbar-links a { color: var(--text-sub); text-decoration: none; font-size: 13.5px; font-weight: 600; }
.navbar-cta { background: var(--accent); color: #FFF !important; font-weight: 800; padding: 8px 18px; border-radius: 8px; }

.ds-hero { padding: 70px 24px 50px; text-align: center; border-bottom: 1px solid var(--border); }
.hero-container { max-width: 840px; margin: 0 auto; }
.hero-badges { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; }
.badge-item { background: rgba(161, 98, 7, 0.14); color: var(--accent); border: 1px solid rgba(161, 98, 7, 0.3); font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 9999px; }
.hero-title { font-size: clamp(2.2rem, 4.5vw, 3.6rem); font-weight: 800; margin-bottom: 16px; letter-spacing: -0.02em; }
.hero-subtitle { font-size: 1.05rem; color: var(--text-sub); line-height: 1.7; }

.ds-section { padding: 80px 24px; }
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

.btn-cta { display: block; text-align: center; background: var(--accent); color: #FFF; font-weight: 800; padding: 14px; border-radius: 10px; text-decoration: none; margin-top: 24px; }
.inline-btn { display: inline-block; padding: 12px 28px; }

.studio-preview { border-radius: 18px; border: 1px solid var(--border); padding: 40px; display: flex; justify-content: center; align-items: center; min-height: 420px; transition: background 0.3s ease; }
.art-display-viewport { display: flex; flex-direction: column; align-items: center; gap: 16px; }

.art-frame-container { padding: 14px; box-shadow: 0 20px 45px rgba(0,0,0,0.5); transition: all 0.3s ease; }
.frame-black { background: #18181B; border: 2px solid #27272A; }
.frame-wood { background: #E5D5C5; border: 2px solid #D4C3B3; }
.frame-walnut { background: #543B2A; border: 2px solid #3D291C; }

.card-mat-border { background: #FAFAF9; padding: 22px; border-radius: 2px; }
.poster-svg { width: 160px; height: 220px; }
.preview-tag { font-size: 12px; font-weight: 800; color: #FFF; background: rgba(0,0,0,0.6); padding: 4px 14px; border-radius: 9999px; backdrop-filter: blur(8px); }

.size-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
.size-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 24px; }
.size-card h4 { font-size: 16px; font-weight: 800; color: var(--accent); margin-bottom: 8px; }
.size-card p { font-size: 13px; color: var(--text-sub); line-height: 1.5; margin: 0; }

.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; }
.product-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; text-decoration: none; color: var(--text-main); transition: transform 0.2s; }
.product-card:hover { transform: translateY(-4px); }
.product-img-box { position: relative; width: 100%; padding-top: 100%; background: #27272A; }
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

.ds-footer { padding: 28px 24px; background: #100E0C; border-top: 1px solid var(--border); }
.footer-container { max-width: 1240px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; font-size: 13px; color: var(--text-sub); }
.footer-brand { font-weight: 800; color: var(--accent); }
.footer-link { color: var(--text-main); text-decoration: none; font-weight: 700; }

.animate-up { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
.animate-up.in-view { opacity: 1; transform: translateY(0); }
</style>
