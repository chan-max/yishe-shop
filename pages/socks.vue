<template>
  <div class="socks-page">
    <div class="ambient-orb orb-pink" />
    <div class="ambient-orb orb-yellow" />

    <header class="sk-navbar">
      <div class="navbar-inner">
        <NuxtLink to="/" class="navbar-brand">
          <svg class="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 12V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v10" />
            <path d="M4 12c0 3 2 7 6 7h6a4 4 0 0 0 4-4v-1" />
          </svg>
          <span>衣设 yishe</span>
        </NuxtLink>
        <nav class="navbar-links">
          <a href="#features">全针织印花</a>
          <a href="#details">袜头无感接缝</a>
          <a href="#products">专属商品</a>
          <NuxtLink to="/design" class="navbar-cta">定制潮流袜</NuxtLink>
        </nav>
      </div>
    </header>

    <section class="sk-hero">
      <div class="hero-container">
        <div class="hero-content animate-up">
          <div class="badge-tag">
            <svg class="tag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            200针高密度精梳棉 · 360° 3D 循环无缝提花
          </div>

          <h1 class="hero-title">
            脚尖上的潮流表达<br>
            <span class="title-gradient">专属全彩图案潮流袜</span>
          </h1>

          <p class="hero-subtitle">
            挑选 200 针精细高密精梳棉纱线，包裹式弹力袜口不勒脚。结合 360° 3D 全景升华印染与提花工艺，让每一双袜画都个性张扬。
          </p>

          <div class="hero-features-list">
            <div class="hero-feature-item">
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>200针精细精梳棉 + 高弹莱卡防滑口</span>
            </div>
            <div class="hero-feature-item">
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>袜头手工无感缝合 · 走动无磨脚感</span>
            </div>
            <div class="hero-feature-item">
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>360° 3D 旋转全景印花 · 不卡缝裂图</span>
            </div>
          </div>

          <div class="hero-actions">
            <NuxtLink to="/design" class="btn-pink">
              ⚡ 开始潮袜 POD 定制
            </NuxtLink>
            <a href="#products" class="btn-ghost">查看在售商品 ↓</a>
          </div>
        </div>

        <div class="hero-mockup-wrap animate-up" style="animation-delay: 0.15s">
          <div class="mockup-card">
            <div class="card-glow" />
            <svg class="socks-svg" viewBox="0 0 320 380" fill="none">
              <!-- Sock 1 -->
              <path d="M80 60 H140 V220 L180 270 Q200 295 170 315 L110 320 Q70 320 70 270 V60 Z" fill="#1E1B2E" stroke="#EC4899" stroke-width="3" />
              <!-- Sock 2 -->
              <path d="M170 80 H230 V240 L270 290 Q290 315 260 335 L200 340 Q160 340 160 290 V80 Z" fill="#2A1B36" stroke="#FACC15" stroke-width="3" />
              <!-- Graphic Pattern -->
              <circle cx="110" cy="140" r="18" fill="#EC4899" opacity="0.8" />
              <rect x="90" y="180" width="40" height="20" rx="4" fill="#FACC15" opacity="0.8" />
              <circle cx="200" cy="160" r="18" fill="#FACC15" opacity="0.8" />
              <rect x="180" y="200" width="40" height="20" rx="4" fill="#EC4899" opacity="0.8" />
            </svg>
            <div class="mockup-tag tag-top">中筒/短筒/船袜 多款</div>
            <div class="mockup-tag tag-bottom">高弹莱卡弹力防滑</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="sk-features">
      <div class="section-container">
        <div class="section-header animate-up">
          <span class="section-badge">潮流设计</span>
          <h2 class="section-title">细节出彩 · 告别平庸</h2>
          <p class="section-sub">无论是街头搭配还是运动出街，小细节展现大态度。</p>
        </div>

        <div class="features-grid">
          <div class="feature-card animate-up" style="animation-delay: 0.05s">
            <div class="icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 12V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v10" />
              </svg>
            </div>
            <h3>200 针密织精梳棉</h3>
            <p>高于行业普通168针标准，布面手感更细腻平整，吸汗透气防臭。</p>
          </div>

          <div class="feature-card animate-up" style="animation-delay: 0.12s">
            <div class="icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v12" />
              </svg>
            </div>
            <h3>手工无缝缝头工艺</h3>
            <p>脚尖采用平整无感骨针接缝，避免摩擦打脚趾，脚感丝滑舒适。</p>
          </div>

          <div class="feature-card animate-up" style="animation-delay: 0.2s">
            <div class="icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3>立体 Y 型袜跟设计</h3>
            <p>符合人体工学后跟曲面加固，完美包裹脚跟，运动不易掉跟不上滑。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Products -->
    <section id="products" class="sk-products">
      <div class="section-container">
        <div class="section-header animate-up">
          <span class="section-badge">专属商品</span>
          <h2 class="section-title">【袜子】在售款式</h2>
          <p class="section-sub">实时展示分类为「袜子」的最新在售定制款式。</p>
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
                <span class="product-price">¥{{ item.price || '29.00' }}</span>
                <span class="product-btn">定制此款 →</span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div v-else class="empty-box animate-up">
          <div class="empty-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M4 12V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v10" />
            </svg>
          </div>
          <h3>暂无【袜子】分类在售商品</h3>
          <p>管理员可在后台发布分类为「袜子」的商品。您现在可以直接进入 POD 设计器自定图案！</p>
          <NuxtLink to="/design" class="btn-pink">进入 POD 设计器</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Banner -->
    <section class="sk-cta-banner">
      <div class="cta-container animate-up">
        <h2>设计你的第一双潮流态度袜子</h2>
        <p>支持重复平铺图案排版、全彩照片打印与一件代发。48小时内发货。</p>
        <NuxtLink to="/design" class="btn-pink btn-lg">立即体验 POD 定制</NuxtLink>
      </div>
    </section>

    <footer class="sk-footer">
      <div class="footer-container">
        <span class="footer-brand">衣设 yishe · 袜子专属介绍页</span>
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
  title: '潮流印花袜子定制 · 200针精梳棉POD配饰 · 衣设 yishe',
  ogTitle: '潮流印花袜子定制 · 200针精梳棉POD配饰 · 衣设 yishe',
  description: '200针高密精梳棉潮流袜子定制，360°全景全彩印花，无感缝头不磨脚，支持单双起订与一件代发。',
  keywords: '袜子定制, POD潮流袜, 印花袜子, 创意长筒袜, 配饰印制'
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
    const res = await fetchPublishedProducts({ type: '袜子', pageSize: 20 })
    products.value = res || []
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;700&display=swap');

.socks-page {
  --bg-deep: #0F0919;
  --bg-card: #1B132B;
  --accent-pink: #EC4899;
  --accent-yellow: #FACC15;
  --text-main: #F8FAFC;
  --text-muted: #A799B8;
  --border-color: rgba(236, 72, 153, 0.2);

  min-height: 100vh;
  background-color: var(--bg-deep);
  color: var(--text-main);
  font-family: 'DM Sans', -apple-system, sans-serif;
  position: relative;
  overflow-x: hidden;
}

.ambient-orb { position: fixed; border-radius: 50%; filter: blur(120px); pointer-events: none; z-index: 0; }
.orb-pink { width: 500px; height: 500px; background: radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%); top: -100px; left: -100px; }
.orb-yellow { width: 400px; height: 400px; background: radial-gradient(circle, rgba(250, 204, 21, 0.15) 0%, transparent 70%); bottom: 10%; right: -100px; }

.sk-navbar { position: sticky; top: 0; z-index: 100; background: rgba(15, 9, 25, 0.85); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border-color); padding: 0 24px; }
.navbar-inner { max-width: 1200px; margin: 0 auto; height: 64px; display: flex; align-items: center; justify-content: space-between; }
.navbar-brand { display: flex; align-items: center; gap: 10px; font-family: 'Syne', sans-serif; font-weight: 800; font-size: 18px; color: var(--text-main); text-decoration: none; }
.brand-icon { width: 22px; height: 22px; stroke: var(--accent-pink); }
.navbar-links { display: flex; align-items: center; gap: 28px; }
.navbar-links a { color: var(--text-muted); text-decoration: none; font-size: 14px; transition: color 0.2s; cursor: pointer; }
.navbar-links a:hover { color: var(--text-main); }
.navbar-cta { background: linear-gradient(135deg, var(--accent-pink), #DB2777); color: #FFF !important; font-weight: 700; padding: 8px 18px; border-radius: 9999px; transition: transform 0.2s, box-shadow 0.2s !important; }
.navbar-cta:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(236, 72, 153, 0.4); }

.sk-hero { position: relative; z-index: 1; padding: 80px 24px; }
.hero-container { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 48px; align-items: center; }
@media (max-width: 900px) { .hero-container { grid-template-columns: 1fr; } }

.badge-tag { display: inline-flex; align-items: center; gap: 8px; background: rgba(236, 72, 153, 0.1); border: 1px solid var(--border-color); color: var(--accent-pink); padding: 6px 14px; border-radius: 9999px; font-size: 13px; margin-bottom: 24px; }
.tag-icon { width: 14px; height: 14px; stroke: var(--accent-pink); }
.hero-title { font-family: 'Syne', sans-serif; font-size: clamp(2.3rem, 4.5vw, 3.6rem); font-weight: 800; line-height: 1.15; margin-bottom: 20px; }
.title-gradient { background: linear-gradient(135deg, #EC4899 0%, #FACC15 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero-subtitle { font-size: 1.05rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 36px; max-width: 520px; }

.hero-features-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 36px; }
.hero-feature-item { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text-main); }
.check-icon { width: 16px; height: 16px; stroke: var(--accent-pink); }

.hero-actions { display: flex; flex-wrap: wrap; gap: 14px; }
.btn-pink { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg, var(--accent-pink), #DB2777); color: #FFF; font-weight: 700; padding: 13px 28px; border-radius: 9999px; text-decoration: none; cursor: pointer; box-shadow: 0 4px 20px rgba(236, 72, 153, 0.35); transition: transform 0.2s, box-shadow 0.2s; }
.btn-pink:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(236, 72, 153, 0.5); }
.btn-ghost { display: inline-flex; align-items: center; padding: 13px 24px; border-radius: 9999px; border: 1px solid var(--border-color); color: var(--text-muted); text-decoration: none; font-size: 14px; cursor: pointer; transition: color 0.2s, border-color 0.2s; }
.btn-ghost:hover { color: var(--text-main); border-color: rgba(236, 72, 153, 0.5); }

.hero-mockup-wrap { display: flex; justify-content: center; }
.mockup-card { position: relative; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 24px; padding: 36px; display: flex; justify-content: center; align-items: center; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
.card-glow { position: absolute; inset: 0; border-radius: 24px; background: radial-gradient(circle at center, rgba(236,72,153,0.15), transparent 70%); pointer-events: none; }
.socks-svg { width: 260px; height: 320px; }
.mockup-tag { position: absolute; background: rgba(15, 9, 25, 0.9); border: 1px solid var(--border-color); color: var(--accent-pink); font-size: 11px; font-weight: 600; padding: 4px 12px; border-radius: 9999px; }
.tag-top { top: 20px; right: 20px; } .tag-bottom { bottom: 20px; left: 20px; }

.sk-features { padding: 100px 24px; background: rgba(27, 19, 43, 0.6); border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color); }
.section-container { max-width: 1200px; margin: 0 auto; }
.section-header { text-align: center; margin-bottom: 60px; }
.section-badge { display: inline-block; background: rgba(236, 72, 153, 0.1); border: 1px solid var(--border-color); color: var(--accent-pink); font-size: 11px; font-weight: 700; padding: 4px 14px; border-radius: 9999px; margin-bottom: 14px; letter-spacing: 0.05em; }
.section-title { font-family: 'Syne', sans-serif; font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 800; margin-bottom: 12px; }
.section-sub { color: var(--text-muted); font-size: 15px; max-width: 500px; margin: 0 auto; }

.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
.feature-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 20px; padding: 32px; transition: transform 0.3s, border-color 0.3s; }
.feature-card:hover { transform: translateY(-4px); border-color: var(--accent-pink); }
.icon-box { width: 48px; height: 48px; background: rgba(236, 72, 153, 0.15); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
.icon-box svg { width: 24px; height: 24px; stroke: var(--accent-pink); }
.feature-card h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 10px; }
.feature-card p { color: var(--text-muted); font-size: 14px; line-height: 1.6; }

.sk-products { padding: 100px 24px; }
.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; }
.product-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; overflow: hidden; text-decoration: none; color: var(--text-main); transition: transform 0.3s, border-color 0.3s; cursor: pointer; }
.product-card:hover { transform: translateY(-6px); border-color: var(--accent-pink); }
.product-img-box { position: relative; width: 100%; padding-top: 100%; background: #0F0919; }
.product-img-box img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.product-cat-tag { position: absolute; top: 12px; left: 12px; background: var(--accent-pink); color: #FFF; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 6px; }
.product-details { padding: 18px; }
.product-title { font-size: 15px; font-weight: 700; margin-bottom: 6px; }
.product-desc { font-size: 12px; color: var(--text-muted); line-height: 1.5; margin-bottom: 16px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.product-bottom { display: flex; justify-content: space-between; align-items: center; }
.product-price { font-size: 18px; font-weight: 800; color: var(--accent-pink); }
.product-btn { font-size: 13px; color: var(--text-muted); transition: color 0.2s; }
.product-card:hover .product-btn { color: var(--accent-pink); }

.product-skeleton { background: var(--bg-card); border-radius: 16px; border: 1px solid var(--border-color); overflow: hidden; }
.sk-img { width: 100%; padding-top: 100%; background: linear-gradient(90deg, #1B132B 25%, #2B1E42 50%, #1B132B 75%); background-size: 400% 100%; animation: sk 1.5s infinite; }
.sk-body { padding: 18px; }
.sk-line { height: 12px; border-radius: 6px; background: linear-gradient(90deg, #1B132B 25%, #2B1E42 50%, #1B132B 75%); background-size: 400% 100%; animation: sk 1.5s infinite; margin-bottom: 10px; }
.w-80 { width: 80%; } .w-50 { width: 50%; }
@keyframes sk { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

.empty-box { text-align: center; padding: 80px 24px; background: var(--bg-card); border: 1px dashed var(--border-color); border-radius: 24px; }
.empty-icon-wrap { width: 64px; height: 64px; background: rgba(236, 72, 153, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
.empty-icon-wrap svg { width: 32px; height: 32px; stroke: var(--accent-pink); }
.empty-box h3 { font-size: 1.2rem; font-weight: 700; margin-bottom: 8px; }
.empty-box p { color: var(--text-muted); font-size: 14px; max-width: 460px; margin: 0 auto 24px; line-height: 1.6; }

.sk-cta-banner { padding: 80px 24px; background: linear-gradient(135deg, #3B0726 0%, #1B132B 100%); text-align: center; border-top: 1px solid var(--border-color); }
.cta-container h2 { font-family: 'Syne', sans-serif; font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 800; margin-bottom: 14px; }
.cta-container p { color: var(--text-muted); max-width: 500px; margin: 0 auto 28px; line-height: 1.6; }
.btn-lg { padding: 15px 36px; font-size: 16px; }

.sk-footer { padding: 28px 24px; background: #07040D; border-top: 1px solid var(--border-color); }
.footer-container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; font-size: 13px; color: var(--text-muted); }
.footer-brand { font-family: 'Syne', sans-serif; font-weight: 800; color: var(--accent-pink); }
.footer-link { color: var(--text-muted); text-decoration: none; transition: color 0.2s; }
.footer-link:hover { color: var(--text-main); }

.animate-up { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
.animate-up.in-view { opacity: 1; transform: translateY(0); }
</style>
