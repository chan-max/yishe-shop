<template>
  <div class="mousepad-page">
    <!-- Navbar -->
    <header class="mp-navbar">
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
          <a href="#simulator">桌面比例模拟器</a>
          <a href="#surface">微纹理滑动体验</a>
          <a href="#products">专属商品</a>
          <NuxtLink to="/design" class="navbar-cta">去 POD 设计器</NuxtLink>
        </nav>
      </div>
    </header>

    <!-- Hero Header -->
    <section class="mp-hero">
      <div class="hero-inner animate-up">
        <span class="hero-tag">CYBER ESPORTS & DESK SETUP</span>
        <h1 class="hero-title">900×400mm 巨幅电竞桌垫</h1>
        <p class="hero-desc">4mm 加厚天然发泡防滑橡胶底，精密包边不起毛。在下方桌面模拟器中匹配你的外设摆放布局。</p>
      </div>
    </section>

    <!-- Interactive Deskmat Simulator (桌面比例模拟器) -->
    <section id="simulator" class="mp-simulator-section">
      <div class="section-container">
        <div class="sim-wrapper animate-up">
          <!-- Controls (Left) -->
          <div class="sim-controls">
            <div class="control-header">
              <h3>⌨️ 桌面尺寸与外设比例匹配器</h3>
              <p>选择桌垫尺寸，并开启键盘鼠标与音箱的实景比例摆放。</p>
            </div>

            <div class="control-group">
              <label>桌垫尺寸 (Deskmat Size)</label>
              <div class="pill-group">
                <button
                  v-for="size in sizeList"
                  :key="size.id"
                  :class="{ active: selectedSize === size.id }"
                  @click="selectedSize = size.id"
                >
                  {{ size.name }}
                </button>
              </div>
            </div>

            <div class="control-group">
              <label>锁边工艺 (Stitching Tech)</label>
              <div class="pill-group">
                <button
                  v-for="stitch in stitchTypes"
                  :key="stitch.id"
                  :class="{ active: selectedStitch === stitch.id }"
                  @click="selectedStitch = stitch.id"
                >
                  {{ stitch.name }}
                </button>
              </div>
            </div>

            <div class="control-group">
              <label>外设摆放层 (Peripherals Overlay)</label>
              <div class="toggle-group">
                <label class="checkbox-label">
                  <input v-model="showKeyboard" type="checkbox" />
                  <span>87键机械键盘</span>
                </label>
                <label class="checkbox-label">
                  <input v-model="showMouse" type="checkbox" />
                  <span>电竞游戏鼠标</span>
                </label>
              </div>
            </div>

            <NuxtLink :to="`/design?preset=mousepad&size=${selectedSize}`" class="btn-lime">
              🚀 带着此规格进入 POD 设计器
            </NuxtLink>
          </div>

          <!-- Interactive Desk Stage (Right) -->
          <div class="sim-stage">
            <div class="desk-canvas">
              <svg class="desk-svg" viewBox="0 0 400 280" fill="none">
                <!-- Desk Surface Background -->
                <rect x="10" y="10" width="380" height="260" rx="8" fill="#18181B" stroke="#27272A" stroke-width="2" />

                <!-- Deskmat Rendered based on selected size -->
                <rect
                  v-if="selectedSize === '900x400'"
                  x="30" y="40" width="340" height="200" rx="10"
                  fill="#84CC16" fill-opacity="0.25" stroke="#84CC16" stroke-width="3"
                />
                <rect
                  v-else-if="selectedSize === '800x300'"
                  x="50" y="60" width="300" height="160" rx="8"
                  fill="#84CC16" fill-opacity="0.25" stroke="#84CC16" stroke-width="3"
                />
                <rect
                  v-else
                  x="140" y="80" width="120" height="120" rx="6"
                  fill="#84CC16" fill-opacity="0.25" stroke="#84CC16" stroke-width="3"
                />

                <!-- Peripherals Overlays -->
                <!-- Keyboard -->
                <g v-if="showKeyboard" transform="translate(70, 95)">
                  <rect x="0" y="0" width="160" height="70" rx="6" fill="#27272A" stroke="#52525B" stroke-width="2" />
                  <!-- Keycaps -->
                  <rect x="8" y="8" width="144" height="54" rx="4" fill="#09090B" />
                  <text x="80" y="40" font-family="monospace" font-size="10" font-weight="700" fill="#A1A1AA" text-anchor="middle">MECHANICAL KEYBOARD</text>
                </g>

                <!-- Mouse -->
                <g v-if="showMouse" transform="translate(260, 105)">
                  <rect x="0" y="0" width="40" height="60" rx="16" fill="#27272A" stroke="#84CC16" stroke-width="2" />
                  <line x1="20" y1="5" x2="20" y2="20" stroke="#84CC16" stroke-width="2" />
                </g>
              </svg>

              <div class="stage-tag">当前渲染：{{ currentSizeLabel }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Surface Tech Section (微纹理解析) -->
    <section id="surface" class="mp-tech-section">
      <div class="section-container">
        <div class="section-header animate-up">
          <span class="section-badge">电竞硬核</span>
          <h2 class="section-title">高密佳绩布微纹理 · 顺滑定位准</h2>
          <p class="section-sub">4mm 橡胶阻尼感与密针锁边，桌面防滑防泼水。</p>
        </div>

        <div class="tech-grid">
          <div class="tech-card animate-up" style="animation-delay: 0.05s">
            <div class="tech-num">4mm</div>
            <h3>加厚天然发泡橡胶底</h3>
            <p>有效平整桌面微小瑕疵，手腕长时间支撑舒适不发麻。</p>
          </div>

          <div class="tech-card animate-up" style="animation-delay: 0.1s">
            <div class="tech-num">100%</div>
            <h3>八字八字锁边防护</h3>
            <p>高密度细密针脚包边，防止边缘开胶、分层或卷边不起毛。</p>
          </div>

          <div class="tech-card animate-up" style="animation-delay: 0.15s">
            <div class="tech-num">900×400</div>
            <h3>巨幅桌搭空间</h3>
            <p>放置全尺寸键盘与鼠标仍留有宽裕移动空间，提升桌面美学氛围。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Products -->
    <section id="products" class="mp-products">
      <div class="section-container">
        <div class="section-header animate-up">
          <span class="section-badge">专属商品</span>
          <h2 class="section-title">【电竞桌垫】在售款式</h2>
          <p class="section-sub">实时展示分类为「桌垫」的最新已上架商品。</p>
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
            :style="`animation-delay: ${i * 0.06}s`"
          >
            <div class="product-img-box">
              <img :src="item.imageUrl || ''" :alt="item.title" loading="lazy" />
              <span class="product-cat-tag">{{ item.category }}</span>
            </div>
            <div class="product-details">
              <h4 class="product-title">{{ item.title }}</h4>
              <div class="product-bottom">
                <span class="product-price">¥{{ item.price || '49.00' }}</span>
                <span class="product-btn">定制此款 →</span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div v-else class="empty-box animate-up">
          <div class="empty-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
            </svg>
          </div>
          <h3>暂无【桌垫】分类在售商品</h3>
          <p>管理员可在后台发布分类为「桌垫」的商品。您现在可以直接进入 POD 设计器自定图案！</p>
          <NuxtLink to="/design" class="btn-lime inline-btn">进入 POD 设计器</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="mp-footer">
      <div class="footer-container">
        <span class="footer-brand">衣设 yishe · 电竞桌垫专属落地页</span>
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
  title: '巨幅电竞桌垫定制 · 4mm加厚天然防滑橡胶底 · 衣设 yishe',
  ogTitle: '巨幅电竞桌垫定制 · 4mm加厚天然防滑橡胶底 · 衣设 yishe',
  description: '900×400mm 巨幅电竞桌垫定制，4mm 加厚天然发泡防滑橡胶底，精密细针包边不起毛，佳绩布顺滑精准定位。',
  keywords: '桌垫定制, POD鼠标垫, 电竞桌垫, 900x400桌垫, 游戏桌搭鼠标垫'
})

const selectedSize = ref('900x400')
const selectedStitch = ref('dense')
const showKeyboard = ref(true)
const showMouse = ref(true)

const sizeList = [
  { id: '900x400', name: '900×400mm（巨幅全桌垫·推荐）' },
  { id: '800x300', name: '800×300mm（标准中号）' },
  { id: '300x250', name: '300×250mm（常规鼠标垫）' }
]

const stitchTypes = [
  { id: 'dense', name: '密针同色包边' },
  { id: 'invisible', name: '无痕锁边' }
]

const currentSizeLabel = computed(() => {
  const match = sizeList.find(s => s.id === selectedSize.value)
  return match ? match.name : '900×400mm'
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
    const res = await fetchPublishedProducts({ type: '桌垫', pageSize: 20 })
    products.value = res || []
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;800&family=Inter:wght@500;700;800&display=swap');

.mousepad-page {
  --bg-dark: #090D16;
  --bg-card: #111827;
  --accent-lime: #84CC16;
  --text-light: #F9FAFB;
  --text-muted: #9CA3AF;
  --border-dark: #1F2937;

  min-height: 100vh;
  background-color: var(--bg-dark);
  color: var(--text-light);
  font-family: 'Inter', sans-serif;
}

.mp-navbar { position: sticky; top: 0; z-index: 100; background: rgba(9, 13, 22, 0.92); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border-dark); padding: 0 24px; }
.navbar-inner { max-width: 1200px; margin: 0 auto; height: 64px; display: flex; align-items: center; justify-content: space-between; }
.navbar-brand { display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 20px; color: var(--text-light); text-decoration: none; font-family: 'Space Grotesk', sans-serif; }
.brand-icon { width: 22px; height: 22px; stroke: var(--accent-lime); }
.navbar-links { display: flex; align-items: center; gap: 28px; }
.navbar-links a { color: var(--text-muted); text-decoration: none; font-size: 14px; font-weight: 700; }
.navbar-cta { background: var(--accent-lime); color: #090D16 !important; font-weight: 900; padding: 8px 18px; border-radius: 8px; }

.mp-hero { padding: 70px 24px 40px; text-align: center; }
.hero-inner { max-width: 800px; margin: 0 auto; }
.hero-tag { display: inline-block; background: rgba(132, 204, 22, 0.12); color: var(--accent-lime); font-size: 11px; font-weight: 900; letter-spacing: 0.14em; padding: 4px 16px; border-radius: 9999px; margin-bottom: 16px; border: 1px solid rgba(132, 204, 22, 0.3); }
.hero-title { font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.4rem, 5vw, 3.8rem); font-weight: 800; color: var(--text-light); margin-bottom: 16px; }
.hero-desc { font-size: 1.05rem; color: var(--text-muted); line-height: 1.7; }

/* Interactive Simulator */
.mp-simulator-section { padding: 40px 24px 80px; }
.section-container { max-width: 1200px; margin: 0 auto; }
.sim-wrapper { display: grid; grid-template-columns: 420px 1fr; gap: 32px; background: var(--bg-card); border: 1px solid var(--border-dark); border-radius: 24px; padding: 32px; }
@media (max-width: 900px) { .sim-wrapper { grid-template-columns: 1fr; } }

.sim-controls { display: flex; flex-direction: column; gap: 22px; }
.control-header h3 { font-size: 18px; font-weight: 900; color: var(--accent-lime); margin-bottom: 4px; }
.control-header p { font-size: 13px; color: var(--text-muted); }
.control-group { display: flex; flex-direction: column; gap: 8px; }
.control-group label { font-size: 12px; font-weight: 700; color: var(--text-muted); }

.pill-group { display: flex; gap: 8px; flex-wrap: wrap; }
.pill-group button { background: var(--bg-dark); border: 1px solid var(--border-dark); color: var(--text-muted); padding: 8px 14px; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
.pill-group button.active { background: var(--accent-lime); color: #090D16; border-color: var(--accent-lime); }

.toggle-group { display: flex; gap: 16px; }
.checkbox-label { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--text-light); cursor: pointer; }

.btn-lime { text-align: center; background: var(--accent-lime); color: #090D16; font-weight: 900; padding: 14px; border-radius: 10px; text-decoration: none; transition: transform 0.2s; }
.btn-lime:hover { transform: translateY(-2px); }
.inline-btn { display: inline-block; padding: 12px 28px; }

/* Mockup Canvas Stage */
.sim-stage { background: var(--bg-dark); border-radius: 18px; border: 1px solid var(--border-dark); padding: 32px; display: flex; justify-content: center; align-items: center; position: relative; }
.desk-canvas { display: flex; flex-direction: column; align-items: center; gap: 16px; width: 100%; }
.desk-svg { width: 100%; max-width: 440px; height: 280px; }
.stage-tag { font-size: 12px; font-weight: 800; color: var(--accent-lime); background: rgba(132, 204, 22, 0.1); padding: 4px 14px; border-radius: 9999px; border: 1px solid rgba(132, 204, 22, 0.3); }

.mp-tech-section { padding: 80px 24px; background: #070A12; border-top: 1px solid var(--border-dark); }
.section-header { text-align: center; margin-bottom: 48px; }
.section-badge { display: inline-block; color: var(--accent-lime); font-size: 11px; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px; }
.section-title { font-size: 2rem; font-weight: 900; margin-bottom: 8px; color: var(--text-light); }
.section-sub { color: var(--text-muted); font-size: 14px; }

.tech-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
.tech-card { background: var(--bg-card); border: 1px solid var(--border-dark); border-radius: 16px; padding: 28px; }
.tech-num { font-family: 'Space Grotesk', sans-serif; font-size: 28px; font-weight: 800; color: var(--accent-lime); margin-bottom: 12px; }
.tech-card h3 { font-size: 1.1rem; font-weight: 800; margin-bottom: 8px; color: var(--text-light); }
.tech-card p { font-size: 13.5px; color: var(--text-muted); line-height: 1.6; }

.mp-products { padding: 80px 24px; }
.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; }
.product-card { background: var(--bg-card); border: 1px solid var(--border-dark); border-radius: 16px; overflow: hidden; text-decoration: none; color: var(--text-light); transition: transform 0.2s; }
.product-card:hover { transform: translateY(-4px); }
.product-img-box { position: relative; width: 100%; padding-top: 100%; background: #1F2937; }
.product-img-box img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.product-cat-tag { position: absolute; top: 12px; left: 12px; background: var(--accent-lime); color: #090D16; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; }
.product-details { padding: 18px; }
.product-title { font-size: 15px; font-weight: 800; margin-bottom: 6px; }
.product-desc { font-size: 12px; color: var(--text-muted); line-height: 1.5; margin-bottom: 16px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.product-bottom { display: flex; justify-content: space-between; align-items: center; }
.product-price { font-size: 18px; font-weight: 900; color: var(--accent-lime); }
.product-btn { font-size: 13px; font-weight: 900; color: var(--text-light); }

.empty-box { text-align: center; padding: 60px 24px; background: var(--bg-card); border: 1px dashed var(--border-dark); border-radius: 20px; }
.empty-icon-wrap { width: 56px; height: 56px; background: rgba(132, 204, 22, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
.empty-icon-wrap svg { width: 28px; height: 28px; stroke: var(--accent-lime); }
.empty-box h3 { font-size: 1.1rem; font-weight: 900; margin-bottom: 8px; }
.empty-box p { color: var(--text-muted); font-size: 14px; max-width: 440px; margin: 0 auto 20px; }

.mp-footer { padding: 28px 24px; background: #070A12; border-top: 1px solid var(--border-dark); }
.footer-container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; font-size: 13px; color: var(--text-muted); }
.footer-brand { font-weight: 900; color: var(--accent-lime); }
.footer-link { color: var(--text-light); text-decoration: none; font-weight: 700; }

.animate-up { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
.animate-up.in-view { opacity: 1; transform: translateY(0); }
</style>
