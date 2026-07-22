<template>
  <div class="mousepad-page">
    <div class="ambient-orb orb-lime" />
    <div class="ambient-orb orb-cyan" />

    <!-- Navbar -->
    <header class="mp-navbar">
      <div class="navbar-inner">
        <NuxtLink to="/" class="navbar-brand">
          <svg class="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="5" width="20" height="14" rx="4" />
            <path d="M6 12h12" />
          </svg>
          <span>衣设 yishe</span>
        </NuxtLink>
        <nav class="navbar-links">
          <a href="#features">4mm 天然橡胶</a>
          <a href="#details">锁边工艺</a>
          <a href="#products">专属商品</a>
          <NuxtLink to="/design" class="navbar-cta">定制鼠标垫</NuxtLink>
        </nav>
      </div>
    </header>

    <!-- Hero -->
    <section class="mp-hero">
      <div class="hero-container">
        <div class="hero-content animate-up">
          <div class="badge-tag">
            <svg class="tag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            900×400mm 巨幅面 · 4mm 佳绩布高微操
          </div>

          <h1 class="hero-title">
            桌面美学新突破<br>
            <span class="title-gradient">专属巨幅电竞鼠标垫</span>
          </h1>

          <p class="hero-subtitle">
            精选 4mm 加厚天然防滑发泡橡胶底盘，结合高密度佳绩布面织造。鼠标滑动丝滑跟手，高精度升华转印还原炫彩桌搭灵感。
          </p>

          <div class="hero-features-list">
            <div class="hero-feature-item">
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>4mm 软弹缓震天然橡胶底</span>
            </div>
            <div class="hero-feature-item">
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>精细密针锁边 · 不起边不脱胶</span>
            </div>
            <div class="hero-feature-item">
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>热升华全彩转印 · 可水洗不退色</span>
            </div>
          </div>

          <div class="hero-actions">
            <NuxtLink to="/design" class="btn-lime">
              ⚡ 开始鼠标垫 POD 定制
            </NuxtLink>
            <a href="#products" class="btn-ghost">查看在售商品 ↓</a>
          </div>
        </div>

        <div class="hero-mockup-wrap animate-up" style="animation-delay: 0.15s">
          <div class="mockup-card">
            <div class="card-glow" />
            <svg class="mousepad-svg" viewBox="0 0 400 240" fill="none">
              <!-- Mousepad Base -->
              <rect x="20" y="20" width="360" height="200" rx="16" fill="#1E293B" stroke="#84CC16" stroke-width="3" />
              <!-- Stitched Border Dash Effect -->
              <rect x="24" y="24" width="352" height="192" rx="12" fill="none" stroke="#475569" stroke-width="1.5" stroke-dasharray="6 4" />
              <!-- Graphic Pattern -->
              <rect x="40" y="40" width="320" height="160" rx="8" fill="url(#padGrad)" opacity="0.9" />
              <circle cx="200" cy="120" r="35" fill="none" stroke="#84CC16" stroke-width="3" stroke-dasharray="6 6" />
              <text x="200" y="125" font-family="sans-serif" font-size="14" font-weight="900" fill="#F8FAFC" text-anchor="middle">DESK SETUP</text>
              <defs>
                <linearGradient id="padGrad" x1="0" y1="0" x2="320" y2="160" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#0F172A" />
                  <stop offset="0.5" stop-color="#1E1B4B" />
                  <stop offset="1" stop-color="#0284C7" />
                </linearGradient>
              </defs>
            </svg>
            <div class="mockup-tag tag-top">800×300 / 900×400 多尺寸</div>
            <div class="mockup-tag tag-bottom">防滑八字纹理底盘</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="mp-features">
      <div class="section-container">
        <div class="section-header animate-up">
          <span class="section-badge">电竞级品质</span>
          <h2 class="section-title">定位精准 · 操控自如</h2>
          <p class="section-sub">无论是办公办公还是高强电竞，带来流畅无阻的滑动反馈。</p>
        </div>

        <div class="features-grid">
          <div class="feature-card animate-up" style="animation-delay: 0.05s">
            <div class="icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
              </svg>
            </div>
            <h3>高密织佳绩布表面</h3>
            <p>经高温高压烫平处理，极小摩擦阻力，光电/激光鼠标追踪无死角。</p>
          </div>

          <div class="feature-card animate-up" style="animation-delay: 0.12s">
            <div class="icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3>精密包边不翘边</h3>
            <p>采用细密同色锁边线工艺，锁边低于布面高度，防止手腕长时间摩擦起毛翘边。</p>
          </div>

          <div class="feature-card animate-up" style="animation-delay: 0.2s">
            <div class="icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12h8" />
              </svg>
            </div>
            <h3>水洗防水防油污</h3>
            <p>表面经疏水抗污防溅涂层处理，液体污渍一擦即净，支持直接水洗晾干。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Products -->
    <section id="products" class="mp-products">
      <div class="section-container">
        <div class="section-header animate-up">
          <span class="section-badge">专属商品</span>
          <h2 class="section-title">【鼠标垫 / 桌垫】在售款式</h2>
          <p class="section-sub">实时展示分类为「鼠标垫」的最新已上架商品。</p>
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
              <p class="product-desc">{{ item.description || '4mm加厚天然橡胶底，热升华全彩转印，精密锁边不起毛。' }}</p>
              <div class="product-bottom">
                <span class="product-price">¥{{ item.price || '45.00' }}</span>
                <span class="product-btn">定制此款 →</span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div v-else class="empty-box animate-up">
          <div class="empty-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="2" y="5" width="20" height="14" rx="4" />
            </svg>
          </div>
          <h3>暂无【鼠标垫】分类在售商品</h3>
          <p>管理员可在后台发布分类为「鼠标垫」的商品。您现在可以直接进入 POD 设计器自定图案！</p>
          <NuxtLink to="/design" class="btn-lime">进入 POD 设计器</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Banner -->
    <section class="mp-cta-banner">
      <div class="cta-container animate-up">
        <h2>点亮你的桌面美学空间</h2>
        <p>支持高清桌画上传、动漫游戏插画排版与自由定制。48小时内发货。</p>
        <NuxtLink to="/design" class="btn-lime btn-lg">立即体验 POD 定制</NuxtLink>
      </div>
    </section>

    <!-- Footer -->
    <footer class="mp-footer">
      <div class="footer-container">
        <span class="footer-brand">衣设 yishe · 鼠标垫专属介绍页</span>
        <p>© 2026 yishe. All rights reserved.</p>
        <NuxtLink to="/" class="footer-link">← 返回主站</NuxtLink>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePublishedProducts, type StorefrontPublishedProduct } from '~/composables/use-published-products'

definePageMeta({ layout: false })

useSeoMeta({
  title: '巨幅电竞鼠标垫定制 · 4mm加厚锁边桌垫 · 衣设 yishe',
  ogTitle: '巨幅电竞鼠标垫定制 · 4mm加厚锁边桌垫 · 衣设 yishe',
  description: '900x400mm巨幅电竞桌垫鼠标垫定制，4mm加厚天然防滑橡胶，热升华全彩高清印花，精细锁边不翘边。',
  keywords: '鼠标垫定制, POD桌垫, 电竞鼠标垫, 动漫桌垫, 桌面配件印制'
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
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })

  document.querySelectorAll('.animate-up').forEach(el => observer.observe(el))

  loading.value = true
  try {
    const res = await fetchPublishedProducts({ type: '鼠标垫', searchText: '垫', pageSize: 20 })
    products.value = res || []
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Inter:wght@400;500;600;700&display=swap');

.mousepad-page {
  --bg-deep: #090D16;
  --bg-card: #0F172A;
  --accent-lime: #84CC16;
  --accent-cyan: #0284C7;
  --text-main: #F8FAFC;
  --text-muted: #94A3B8;
  --border-color: rgba(132, 204, 22, 0.2);

  min-height: 100vh;
  background-color: var(--bg-deep);
  color: var(--text-main);
  font-family: 'Inter', -apple-system, sans-serif;
  position: relative;
  overflow-x: hidden;
}

.ambient-orb { position: fixed; border-radius: 50%; filter: blur(120px); pointer-events: none; z-index: 0; }
.orb-lime { width: 500px; height: 500px; background: radial-gradient(circle, rgba(132, 204, 22, 0.18) 0%, transparent 70%); top: -100px; left: -100px; }
.orb-cyan { width: 400px; height: 400px; background: radial-gradient(circle, rgba(2, 132, 199, 0.15) 0%, transparent 70%); bottom: 10%; right: -100px; }

.mp-navbar { position: sticky; top: 0; z-index: 100; background: rgba(9, 13, 22, 0.85); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border-color); padding: 0 24px; }
.navbar-inner { max-width: 1200px; margin: 0 auto; height: 64px; display: flex; align-items: center; justify-content: space-between; }
.navbar-brand { display: flex; align-items: center; gap: 10px; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 18px; color: var(--text-main); text-decoration: none; }
.brand-icon { width: 22px; height: 22px; stroke: var(--accent-lime); }
.navbar-links { display: flex; align-items: center; gap: 28px; }
.navbar-links a { color: var(--text-muted); text-decoration: none; font-size: 14px; transition: color 0.2s; cursor: pointer; }
.navbar-links a:hover { color: var(--text-main); }
.navbar-cta { background: linear-gradient(135deg, var(--accent-lime), #65A30D); color: #000 !important; font-weight: 700; padding: 8px 18px; border-radius: 9999px; transition: transform 0.2s, box-shadow 0.2s !important; }
.navbar-cta:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(132, 204, 22, 0.4); }

.mp-hero { position: relative; z-index: 1; padding: 80px 24px; }
.hero-container { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 48px; align-items: center; }
@media (max-width: 900px) { .hero-container { grid-template-columns: 1fr; } }

.badge-tag { display: inline-flex; align-items: center; gap: 8px; background: rgba(132, 204, 22, 0.1); border: 1px solid var(--border-color); color: var(--accent-lime); padding: 6px 14px; border-radius: 9999px; font-size: 13px; margin-bottom: 24px; }
.tag-icon { width: 14px; height: 14px; stroke: var(--accent-lime); }
.hero-title { font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.3rem, 4.5vw, 3.6rem); font-weight: 700; line-height: 1.15; margin-bottom: 20px; }
.title-gradient { background: linear-gradient(135deg, #84CC16 0%, #38BDF8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero-subtitle { font-size: 1.05rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 36px; max-width: 520px; }

.hero-features-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 36px; }
.hero-feature-item { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text-main); }
.check-icon { width: 16px; height: 16px; stroke: var(--accent-lime); }

.hero-actions { display: flex; flex-wrap: wrap; gap: 14px; }
.btn-lime { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg, var(--accent-lime), #65A30D); color: #000; font-weight: 700; padding: 13px 28px; border-radius: 9999px; text-decoration: none; cursor: pointer; box-shadow: 0 4px 20px rgba(132, 204, 22, 0.35); transition: transform 0.2s, box-shadow 0.2s; }
.btn-lime:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(132, 204, 22, 0.5); }
.btn-ghost { display: inline-flex; align-items: center; padding: 13px 24px; border-radius: 9999px; border: 1px solid var(--border-color); color: var(--text-muted); text-decoration: none; font-size: 14px; cursor: pointer; transition: color 0.2s, border-color 0.2s; }
.btn-ghost:hover { color: var(--text-main); border-color: rgba(132, 204, 22, 0.5); }

.hero-mockup-wrap { display: flex; justify-content: center; }
.mockup-card { position: relative; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 24px; padding: 36px; display: flex; justify-content: center; align-items: center; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
.card-glow { position: absolute; inset: 0; border-radius: 24px; background: radial-gradient(circle at center, rgba(132,204,22,0.15), transparent 70%); pointer-events: none; }
.mousepad-svg { width: 300px; height: 180px; }
.mockup-tag { position: absolute; background: rgba(9, 13, 22, 0.9); border: 1px solid var(--border-color); color: var(--accent-lime); font-size: 11px; font-weight: 600; padding: 4px 12px; border-radius: 9999px; }
.tag-top { top: 20px; right: 20px; } .tag-bottom { bottom: 20px; left: 20px; }

.mp-features { padding: 100px 24px; background: rgba(15, 23, 42, 0.6); border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color); }
.section-container { max-width: 1200px; margin: 0 auto; }
.section-header { text-align: center; margin-bottom: 60px; }
.section-badge { display: inline-block; background: rgba(132, 204, 22, 0.1); border: 1px solid var(--border-color); color: var(--accent-lime); font-size: 11px; font-weight: 700; padding: 4px 14px; border-radius: 9999px; margin-bottom: 14px; letter-spacing: 0.05em; }
.section-title { font-family: 'Space Grotesk', sans-serif; font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 700; margin-bottom: 12px; }
.section-sub { color: var(--text-muted); font-size: 15px; max-width: 500px; margin: 0 auto; }

.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
.feature-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 20px; padding: 32px; transition: transform 0.3s, border-color 0.3s; }
.feature-card:hover { transform: translateY(-4px); border-color: var(--accent-lime); }
.icon-box { width: 48px; height: 48px; background: rgba(132, 204, 22, 0.15); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
.icon-box svg { width: 24px; height: 24px; stroke: var(--accent-lime); }
.feature-card h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 10px; }
.feature-card p { color: var(--text-muted); font-size: 14px; line-height: 1.6; }

.mp-products { padding: 100px 24px; }
.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; }
.product-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; overflow: hidden; text-decoration: none; color: var(--text-main); transition: transform 0.3s, border-color 0.3s; cursor: pointer; }
.product-card:hover { transform: translateY(-6px); border-color: var(--accent-lime); }
.product-img-box { position: relative; width: 100%; padding-top: 100%; background: #090D16; }
.product-img-box img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.product-cat-tag { position: absolute; top: 12px; left: 12px; background: var(--accent-lime); color: #000; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 6px; }
.product-details { padding: 18px; }
.product-title { font-size: 15px; font-weight: 700; margin-bottom: 6px; }
.product-desc { font-size: 12px; color: var(--text-muted); line-height: 1.5; margin-bottom: 16px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.product-bottom { display: flex; justify-content: space-between; align-items: center; }
.product-price { font-size: 18px; font-weight: 800; color: var(--accent-lime); }
.product-btn { font-size: 13px; color: var(--text-muted); transition: color 0.2s; }
.product-card:hover .product-btn { color: var(--accent-lime); }

.product-skeleton { background: var(--bg-card); border-radius: 16px; border: 1px solid var(--border-color); overflow: hidden; }
.sk-img { width: 100%; padding-top: 100%; background: linear-gradient(90deg, #0F172A 25%, #1E293B 50%, #0F172A 75%); background-size: 400% 100%; animation: sk 1.5s infinite; }
.sk-body { padding: 18px; }
.sk-line { height: 12px; border-radius: 6px; background: linear-gradient(90deg, #0F172A 25%, #1E293B 50%, #0F172A 75%); background-size: 400% 100%; animation: sk 1.5s infinite; margin-bottom: 10px; }
.w-80 { width: 80%; } .w-50 { width: 50%; }
@keyframes sk { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

.empty-box { text-align: center; padding: 80px 24px; background: var(--bg-card); border: 1px dashed var(--border-color); border-radius: 24px; }
.empty-icon-wrap { width: 64px; height: 64px; background: rgba(132, 204, 22, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
.empty-icon-wrap svg { width: 32px; height: 32px; stroke: var(--accent-lime); }
.empty-box h3 { font-size: 1.2rem; font-weight: 700; margin-bottom: 8px; }
.empty-box p { color: var(--text-muted); font-size: 14px; max-width: 460px; margin: 0 auto 24px; line-height: 1.6; }

.mp-cta-banner { padding: 80px 24px; background: linear-gradient(135deg, #1A2E05 0%, #023652 100%); text-align: center; border-top: 1px solid var(--border-color); }
.cta-container h2 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 700; margin-bottom: 14px; }
.cta-container p { color: var(--text-muted); max-width: 500px; margin: 0 auto 28px; line-height: 1.6; }
.btn-lg { padding: 15px 36px; font-size: 16px; }

.mp-footer { padding: 28px 24px; background: #04070D; border-top: 1px solid var(--border-color); }
.footer-container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; font-size: 13px; color: var(--text-muted); }
.footer-brand { font-family: 'Space Grotesk', sans-serif; font-weight: 700; color: var(--accent-lime); }
.footer-link { color: var(--text-muted); text-decoration: none; transition: color 0.2s; }
.footer-link:hover { color: var(--text-main); }

.animate-up { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
.animate-up.in-view { opacity: 1; transform: translateY(0); }
</style>
