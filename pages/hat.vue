<template>
  <div class="hat-page">
    <div class="ambient-orb orb-orange" />
    <div class="ambient-orb orb-blue" />

    <!-- Navbar -->
    <header class="ht-navbar">
      <div class="navbar-inner">
        <NuxtLink to="/" class="navbar-brand">
          <svg class="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 16.5C6 14 8 11.5 12 11.5s6 2.5 6 5" />
            <path d="M2 16.5h20" />
            <path d="M12 11.5V4" />
            <circle cx="12" cy="4" r="1.5" fill="currentColor" />
          </svg>
          <span>衣设 yishe</span>
        </NuxtLink>
        <nav class="navbar-links">
          <a href="#features">刺绣工艺</a>
          <a href="#details">帽型版型</a>
          <a href="#products">专属商品</a>
          <NuxtLink to="/design" class="navbar-cta">定制棒球帽</NuxtLink>
        </nav>
      </div>
    </header>

    <!-- Hero -->
    <section class="ht-hero">
      <div class="hero-container">
        <div class="hero-content animate-up">
          <div class="badge-tag">
            <svg class="tag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            立体高密绣花 · 弧形修脸檐型
          </div>

          <h1 class="hero-title">
            塑造街头标号<br>
            <span class="title-gradient">专属高密刺绣棒球帽</span>
          </h1>

          <p class="hero-subtitle">
            精选加厚斜纹棉涤面料，挺括不易变形。搭配立体平绣/3D立体贴布绣，吸汗带透气干爽，打造街头运动随性风格。
          </p>

          <div class="hero-features-list">
            <div class="hero-feature-item">
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>加厚斜纹面料 + 六面板型挺括支撑</span>
            </div>
            <div class="hero-feature-item">
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>3D 立体饱满刺绣工艺</span>
            </div>
            <div class="hero-feature-item">
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>可调节金属扣头 · 54-60cm头围通用</span>
            </div>
          </div>

          <div class="hero-actions">
            <NuxtLink to="/design" class="btn-orange">
              🔥 开始帽子 POD 定制
            </NuxtLink>
            <a href="#products" class="btn-ghost">查看在售商品 ↓</a>
          </div>
        </div>

        <div class="hero-mockup-wrap animate-up" style="animation-delay: 0.15s">
          <div class="mockup-card">
            <div class="card-glow" />
            <svg class="cap-svg" viewBox="0 0 360 380" fill="none">
              <!-- Cap Crown Base -->
              <path d="M70 240 C70 110 290 110 290 240 Z" fill="#1E293B" stroke="#334155" stroke-width="3" />
              <!-- Panel Stitch Lines -->
              <path d="M180 115 V240" stroke="#334155" stroke-width="2" />
              <path d="M180 115 C130 140 90 190 75 235" stroke="#334155" stroke-width="2" />
              <path d="M180 115 C230 140 270 190 285 235" stroke="#334155" stroke-width="2" />
              <!-- Button on Top -->
              <circle cx="180" cy="115" r="8" fill="#EA580C" stroke="#1E293B" stroke-width="2" />
              <!-- Curved Visor Brim -->
              <path d="M40 240 Q180 275 320 240 Q180 320 40 240 Z" fill="#0F172A" stroke="#EA580C" stroke-width="3" />
              <!-- Embroidery Logo Graphic -->
              <rect x="130" y="160" width="100" height="55" rx="8" fill="url(#orangeGrad)" opacity="0.9" />
              <text x="180" y="195" font-family="sans-serif" font-size="14" font-weight="900" fill="#F8FAFC" text-anchor="middle">EMBROIDERY</text>
              <defs>
                <linearGradient id="orangeGrad" x1="0" y1="0" x2="100" y2="55" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#EA580C" />
                  <stop offset="1" stop-color="#F97316" />
                </linearGradient>
              </defs>
            </svg>
            <div class="mockup-tag tag-top">立体刺绣防跑线</div>
            <div class="mockup-tag tag-bottom">内嵌吸汗防污带</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Details -->
    <section id="features" class="ht-features">
      <div class="section-container">
        <div class="section-header animate-up">
          <span class="section-badge">精工细节</span>
          <h2 class="section-title">舒适修脸 · 版型无懈可击</h2>
          <p class="section-sub">从面料选材到金属搭扣，专为全天候舒适佩戴体验而设计。</p>
        </div>

        <div class="features-grid">
          <div class="feature-card animate-up" style="animation-delay: 0.05s">
            <div class="icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              </svg>
            </div>
            <h3>加厚六面斜纹面料</h3>
            <p>高密斜纹棉面料，前贴硬衬定型，佩戴顶帽不塌陷，帽型饱满修饰脸型。</p>
          </div>

          <div class="feature-card animate-up" style="animation-delay: 0.12s">
            <div class="icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <h3>高密度 3D 立体刺绣</h3>
            <p>进口绣花机打样，线迹致密平整无毛刺。支持文字、图案立体凸起效果。”</p>
          </div>

          <div class="feature-card animate-up" style="animation-delay: 0.2s">
            <div class="icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3>吸汗带 + 金属调节扣</h3>
            <p>内侧包裹吸汗防污织带，佩戴干爽不闷汗。尾部铜质复古扣调节，大小灵活自由。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Products -->
    <section id="products" class="ht-products">
      <div class="section-container">
        <div class="section-header animate-up">
          <span class="section-badge">专属商品</span>
          <h2 class="section-title">【帽子 / 棒球帽】在售款式</h2>
          <p class="section-sub">实时展示分类为「帽子」的最新上架定制款式。</p>
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
                <span class="product-price">¥{{ item.price || '59.00' }}</span>
                <span class="product-btn">定制此款 →</span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div v-else class="empty-box animate-up">
          <div class="empty-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M6 16.5C6 14 8 11.5 12 11.5s6 2.5 6 5" />
              <path d="M2 16.5h20" />
            </svg>
          </div>
          <h3>暂无【帽子】分类在售商品</h3>
          <p>管理员可在后台发布分类为「帽子」的商品。您现在可以直接进入 POD 设计器自定图案！</p>
          <NuxtLink to="/design" class="btn-orange">进入 POD 设计器</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Banner -->
    <section class="ht-cta-banner">
      <div class="cta-container animate-up">
        <h2>定制你的第一顶潮流签名棒球帽</h2>
        <p>支持文字刺绣、图案上传与一件起订。48小时内高精打样发货。</p>
        <NuxtLink to="/design" class="btn-orange btn-lg">立即体验 POD 定制</NuxtLink>
      </div>
    </section>

    <!-- Footer -->
    <footer class="ht-footer">
      <div class="footer-container">
        <span class="footer-brand">衣设 yishe · 帽子专属介绍页</span>
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
  title: '立体刺绣棒球帽定制 · POD帽饰潮牌 · 衣设 yishe',
  ogTitle: '立体刺绣棒球帽定制 · POD帽饰潮牌 · 衣设 yishe',
  description: '挺括斜纹棉棒球帽鸭舌帽定制，支持高密3D立体刺绣、复古铜扣调节，潮牌运动百搭，单件起订。',
  keywords: '帽子定制, POD棒球帽, 鸭舌帽印花, 刺绣帽子, 潮牌帽饰'
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
    const res = await fetchPublishedProducts({ type: '帽子', pageSize: 20 })
    products.value = res || []
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&family=Inter:wght@400;500;600;700&display=swap');

.hat-page {
  --bg-deep: #0F172A;
  --bg-card: #1E293B;
  --accent-orange: #EA580C;
  --accent-light-orange: #F97316;
  --text-main: #F8FAFC;
  --text-muted: #94A3B8;
  --border-color: rgba(255, 255, 255, 0.08);

  min-height: 100vh;
  background-color: var(--bg-deep);
  color: var(--text-main);
  font-family: 'Inter', -apple-system, sans-serif;
  position: relative;
  overflow-x: hidden;
}

.ambient-orb { position: fixed; border-radius: 50%; filter: blur(120px); pointer-events: none; z-index: 0; }
.orb-orange { width: 500px; height: 500px; background: radial-gradient(circle, rgba(234, 88, 12, 0.2) 0%, transparent 70%); top: -100px; right: -100px; }
.orb-blue { width: 400px; height: 400px; background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%); bottom: 10%; left: -100px; }

.ht-navbar { position: sticky; top: 0; z-index: 100; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border-color); padding: 0 24px; }
.navbar-inner { max-width: 1200px; margin: 0 auto; height: 64px; display: flex; align-items: center; justify-content: space-between; }
.navbar-brand { display: flex; align-items: center; gap: 10px; font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 18px; color: var(--text-main); text-decoration: none; }
.brand-icon { width: 22px; height: 22px; stroke: var(--accent-orange); }
.navbar-links { display: flex; align-items: center; gap: 28px; }
.navbar-links a { color: var(--text-muted); text-decoration: none; font-size: 14px; transition: color 0.2s; cursor: pointer; }
.navbar-links a:hover { color: var(--text-main); }
.navbar-cta { background: linear-gradient(135deg, var(--accent-orange), var(--accent-light-orange)); color: #FFF !important; font-weight: 700; padding: 8px 18px; border-radius: 9999px; transition: transform 0.2s, box-shadow 0.2s !important; }
.navbar-cta:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(234, 88, 12, 0.4); }

.ht-hero { position: relative; z-index: 1; padding: 80px 24px; }
.hero-container { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 48px; align-items: center; }
@media (max-width: 900px) { .hero-container { grid-template-columns: 1fr; } }

.badge-tag { display: inline-flex; align-items: center; gap: 8px; background: rgba(234, 88, 12, 0.12); border: 1px solid rgba(234, 88, 12, 0.3); color: var(--accent-light-orange); padding: 6px 14px; border-radius: 9999px; font-size: 13px; margin-bottom: 24px; }
.tag-icon { width: 14px; height: 14px; stroke: var(--accent-orange); }
.hero-title { font-family: 'Montserrat', sans-serif; font-size: clamp(2.5rem, 5vw, 3.8rem); font-weight: 800; line-height: 1.15; margin-bottom: 20px; }
.title-gradient { background: linear-gradient(135deg, #F97316 0%, #FBBF24 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero-subtitle { font-size: 1.05rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 36px; max-width: 520px; }

.hero-features-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 36px; }
.hero-feature-item { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text-main); }
.check-icon { width: 16px; height: 16px; stroke: var(--accent-orange); }

.hero-actions { display: flex; flex-wrap: wrap; gap: 14px; }
.btn-orange { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg, var(--accent-orange), var(--accent-light-orange)); color: #FFF; font-weight: 700; padding: 13px 28px; border-radius: 9999px; text-decoration: none; cursor: pointer; box-shadow: 0 4px 20px rgba(234, 88, 12, 0.35); transition: transform 0.2s, box-shadow 0.2s; }
.btn-orange:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(234, 88, 12, 0.5); }
.btn-ghost { display: inline-flex; align-items: center; padding: 13px 24px; border-radius: 9999px; border: 1px solid var(--border-color); color: var(--text-muted); text-decoration: none; font-size: 14px; cursor: pointer; transition: color 0.2s, border-color 0.2s; }
.btn-ghost:hover { color: var(--text-main); border-color: rgba(255,255,255,0.3); }

.hero-mockup-wrap { display: flex; justify-content: center; }
.mockup-card { position: relative; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 24px; padding: 40px; display: flex; justify-content: center; align-items: center; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
.card-glow { position: absolute; inset: 0; border-radius: 24px; background: radial-gradient(circle at center, rgba(234,88,12,0.15), transparent 70%); pointer-events: none; }
.cap-svg { width: 280px; height: 300px; }
.mockup-tag { position: absolute; background: rgba(15, 23, 42, 0.9); border: 1px solid var(--border-color); color: var(--accent-light-orange); font-size: 11px; font-weight: 600; padding: 4px 12px; border-radius: 9999px; }
.tag-top { top: 20px; right: 20px; } .tag-bottom { bottom: 20px; left: 20px; }

.ht-features { padding: 100px 24px; background: rgba(30, 41, 59, 0.5); border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color); }
.section-container { max-width: 1200px; margin: 0 auto; }
.section-header { text-align: center; margin-bottom: 60px; }
.section-badge { display: inline-block; background: rgba(234, 88, 12, 0.1); border: 1px solid rgba(234, 88, 12, 0.3); color: var(--accent-light-orange); font-size: 11px; font-weight: 700; padding: 4px 14px; border-radius: 9999px; margin-bottom: 14px; letter-spacing: 0.05em; }
.section-title { font-family: 'Montserrat', sans-serif; font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 800; margin-bottom: 12px; }
.section-sub { color: var(--text-muted); font-size: 15px; max-width: 500px; margin: 0 auto; }

.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
.feature-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 20px; padding: 32px; transition: transform 0.3s, border-color 0.3s; }
.feature-card:hover { transform: translateY(-4px); border-color: var(--accent-orange); }
.icon-box { width: 48px; height: 48px; background: rgba(234, 88, 12, 0.15); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
.icon-box svg { width: 24px; height: 24px; stroke: var(--accent-orange); }
.feature-card h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 10px; }
.feature-card p { color: var(--text-muted); font-size: 14px; line-height: 1.6; }

.ht-products { padding: 100px 24px; }
.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; }
.product-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; overflow: hidden; text-decoration: none; color: var(--text-main); transition: transform 0.3s, border-color 0.3s; cursor: pointer; }
.product-card:hover { transform: translateY(-6px); border-color: var(--accent-orange); }
.product-img-box { position: relative; width: 100%; padding-top: 100%; background: #0F172A; }
.product-img-box img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.product-cat-tag { position: absolute; top: 12px; left: 12px; background: var(--accent-orange); color: #FFF; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 6px; }
.product-details { padding: 18px; }
.product-title { font-size: 15px; font-weight: 700; margin-bottom: 6px; }
.product-desc { font-size: 12px; color: var(--text-muted); line-height: 1.5; margin-bottom: 16px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.product-bottom { display: flex; justify-content: space-between; align-items: center; }
.product-price { font-size: 18px; font-weight: 800; color: var(--accent-light-orange); }
.product-btn { font-size: 13px; color: var(--text-muted); transition: color 0.2s; }
.product-card:hover .product-btn { color: var(--accent-orange); }

.product-skeleton { background: var(--bg-card); border-radius: 16px; border: 1px solid var(--border-color); overflow: hidden; }
.sk-img { width: 100%; padding-top: 100%; background: linear-gradient(90deg, #1E293B 25%, #334155 50%, #1E293B 75%); background-size: 400% 100%; animation: sk 1.5s infinite; }
.sk-body { padding: 18px; }
.sk-line { height: 12px; border-radius: 6px; background: linear-gradient(90deg, #1E293B 25%, #334155 50%, #1E293B 75%); background-size: 400% 100%; animation: sk 1.5s infinite; margin-bottom: 10px; }
.w-80 { width: 80%; } .w-50 { width: 50%; }
@keyframes sk { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

.empty-box { text-align: center; padding: 80px 24px; background: var(--bg-card); border: 1px dashed var(--border-color); border-radius: 24px; }
.empty-icon-wrap { width: 64px; height: 64px; background: rgba(234, 88, 12, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
.empty-icon-wrap svg { width: 32px; height: 32px; stroke: var(--accent-orange); }
.empty-box h3 { font-size: 1.2rem; font-weight: 700; margin-bottom: 8px; }
.empty-box p { color: var(--text-muted); font-size: 14px; max-width: 460px; margin: 0 auto 24px; line-height: 1.6; }

.ht-cta-banner { padding: 80px 24px; background: linear-gradient(135deg, #431407 0%, #1E293B 100%); text-align: center; border-top: 1px solid var(--border-color); }
.cta-container h2 { font-family: 'Montserrat', sans-serif; font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 800; margin-bottom: 14px; }
.cta-container p { color: var(--text-muted); max-width: 500px; margin: 0 auto 28px; line-height: 1.6; }
.btn-lg { padding: 15px 36px; font-size: 16px; }

.ht-footer { padding: 28px 24px; background: #090E1A; border-top: 1px solid var(--border-color); }
.footer-container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; font-size: 13px; color: var(--text-muted); }
.footer-brand { font-family: 'Montserrat', sans-serif; font-weight: 800; color: var(--accent-orange); }
.footer-link { color: var(--text-muted); text-decoration: none; transition: color 0.2s; }
.footer-link:hover { color: var(--text-main); }

.animate-up { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
.animate-up.in-view { opacity: 1; transform: translateY(0); }
</style>
