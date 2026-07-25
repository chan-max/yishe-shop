<template>
  <div class="pillow-page">
    <header class="pl-navbar">
      <div class="navbar-inner">
        <NuxtLink to="/" class="navbar-brand">
          <svg class="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="4" />
            <path d="M3 9h18" />
            <path d="M9 3v18" />
          </svg>
          <span>衣设 yishe</span>
        </NuxtLink>
        <nav class="navbar-links">
          <a href="#features">面料触感</a>
          <a href="#details">隐形拉链</a>
          <a href="#products">专属商品</a>
          <NuxtLink to="/design" class="navbar-cta">定制抱枕</NuxtLink>
        </nav>
      </div>
    </header>

    <section class="pl-hero">
      <div class="hero-container">
        <div class="hero-content animate-up">
          <div class="badge-tag">
            <svg class="tag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            短绒绒感面料 · 高弹PP棉饱满填充
          </div>

          <h1 class="hero-title">
            温馨家居惬意时光<br>
            <span class="title-gradient">专属高保真艺术抱枕</span>
          </h1>

          <p class="hero-subtitle">
            选自高密度亲肤短毛绒/亚麻布面，柔软触感温馨入怀。全彩升华双面印制，隐形拉链方便拆洗，为每一个空间增添灵感温度。
          </p>

          <div class="hero-features-list">
            <div class="hero-feature-item">
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>细腻亲肤短毛绒 / 原色亚麻双面</span>
            </div>
            <div class="hero-feature-item">
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>三维高弹三维 PP 绵饱满填充</span>
            </div>
            <div class="hero-feature-item">
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>隐形拉链扣 · 可全套易拆清洗</span>
            </div>
          </div>

          <div class="hero-actions">
            <NuxtLink to="/design" class="btn-warm">
              🏠 开始抱枕 POD 定制
            </NuxtLink>
            <a href="#products" class="btn-ghost">查看在售商品 ↓</a>
          </div>
        </div>

        <div class="hero-mockup-wrap animate-up" style="animation-delay: 0.15s">
          <div class="mockup-card">
            <svg class="pillow-svg" viewBox="0 0 320 320" fill="none">
              <!-- Pillow Shape -->
              <rect x="40" y="40" width="240" height="240" rx="36" fill="#FFFDF9" stroke="#E5DEC9" stroke-width="3" />
              <path d="M40 76 Q76 40 160 45 Q244 40 280 76 Q285 160 280 244 Q244 280 160 275 Q76 280 40 244 Q35 160 40 76 Z" fill="#FBF6E9" opacity="0.6" />
              <!-- Printed Pattern -->
              <rect x="70" y="70" width="180" height="180" rx="20" fill="url(#pillArt)" opacity="0.85" />
              <circle cx="160" cy="160" r="30" fill="none" stroke="#FAF7F2" stroke-width="3" />
              <text x="160" y="165" font-family="serif" font-size="14" font-weight="bold" fill="#FAF7F2" text-anchor="middle">COZY HOME</text>
              <defs>
                <linearGradient id="pillArt" x1="0" y1="0" x2="180" y2="180" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#C25E00" />
                  <stop offset="1" stop-color="#D97706" />
                </linearGradient>
              </defs>
            </svg>
            <div class="mockup-tag tag-top">45×45cm / 50×50cm 尺寸</div>
            <div class="mockup-tag tag-bottom">双面高清双图案印制</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="pl-features">
      <div class="section-container">
        <div class="section-header animate-up">
          <span class="section-badge">温馨质感</span>
          <h2 class="section-title">软暖入怀 · 打造惬意角落</h2>
          <p class="section-sub">精选无毒环保浆料，水洗不退色，陪伴沙发、床头与书房。</p>
        </div>

        <div class="features-grid">
          <div class="feature-card animate-up" style="animation-delay: 0.05s">
            <div class="icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <h3>触感细腻亲肤</h3>
            <p>挑选软糯微绒面料，零刺激触感，给肌肤与身体贴心的包裹依托。</p>
          </div>

          <div class="feature-card animate-up" style="animation-delay: 0.12s">
            <div class="icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v8" />
                <path d="M8 12h8" />
              </svg>
            </div>
            <h3>高弹持久防塌陷</h3>
            <p>内填 3D 高弹螺旋 PP 棉，久靠不易变形，抱枕饱满有挺型。</p>
          </div>

          <div class="feature-card animate-up" style="animation-delay: 0.2s">
            <div class="icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18" />
              </svg>
            </div>
            <h3>隐形拉链防划伤</h3>
            <p>底部同色隐形拉链缝合，美观不划皮肤与沙发面料，随时轻松拆洗枕套。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Products -->
    <section id="products" class="pl-products">
      <div class="section-container">
        <div class="section-header animate-up">
          <span class="section-badge">专属商品</span>
          <h2 class="section-title">【抱枕 / 靠垫】在售款式</h2>
          <p class="section-sub">实时展示分类为「抱枕」的最新已上架商品。</p>
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
              <rect x="3" y="3" width="18" height="18" rx="4" />
            </svg>
          </div>
          <h3>暂无【抱枕】分类在售商品</h3>
          <p>管理员可在后台发布分类为「抱枕」的商品。您现在可以直接进入 POD 设计器自定图案！</p>
          <NuxtLink to="/design" class="btn-warm">进入 POD 设计器</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Banner -->
    <section class="pl-cta-banner">
      <div class="cta-container animate-up">
        <h2>点亮居家温馨角落</h2>
        <p>支持照片印制、插画图案排版与双面独立设计。48小时内极速发货。</p>
        <NuxtLink to="/design" class="btn-warm btn-lg">立即体验 POD 定制</NuxtLink>
      </div>
    </section>

    <footer class="pl-footer">
      <div class="footer-container">
        <span class="footer-brand">衣设 yishe · 抱枕专属介绍页</span>
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
  title: '艺术抱枕靠垫定制 · 亲肤短绒暖心家居 · 衣设 yishe',
  ogTitle: '艺术抱枕靠垫定制 · 亲肤短绒暖心家居 · 衣设 yishe',
  description: '亲肤短绒柔感抱枕靠垫定制，高弹PP棉饱满填充，全彩双面高清热升华印花，隐形拉链易拆洗，单件起订。',
  keywords: '抱枕定制, POD靠垫, 家居软装, 照片抱枕, 艺术抱枕印制'
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
    const res = await fetchPublishedProducts({ type: '抱枕', pageSize: 20 })
    products.value = res || []
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

.pillow-page {
  --bg-deep: #FAF7F2;
  --bg-card: #FFFFFF;
  --accent-warm: #C25E00;
  --accent-light: #D97706;
  --text-main: #261E14;
  --text-muted: #665A4C;
  --border-color: #E8E2D3;

  min-height: 100vh;
  background-color: var(--bg-deep);
  color: var(--text-main);
  font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
  position: relative;
  overflow-x: hidden;
}

.pl-navbar { position: sticky; top: 0; z-index: 100; background: rgba(250, 247, 242, 0.85); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border-color); padding: 0 24px; }
.navbar-inner { max-width: 1200px; margin: 0 auto; height: 64px; display: flex; align-items: center; justify-content: space-between; }
.navbar-brand { display: flex; align-items: center; gap: 10px; font-family: 'Lora', serif; font-weight: 700; font-size: 19px; color: var(--text-main); text-decoration: none; }
.brand-icon { width: 22px; height: 22px; stroke: var(--accent-warm); }
.navbar-links { display: flex; align-items: center; gap: 28px; }
.navbar-links a { color: var(--text-muted); text-decoration: none; font-size: 14px; transition: color 0.2s; cursor: pointer; }
.navbar-links a:hover { color: var(--text-main); }
.navbar-cta { background: var(--accent-warm); color: #FFF !important; font-weight: 600; padding: 8px 18px; border-radius: 9999px; transition: transform 0.2s, box-shadow 0.2s !important; }
.navbar-cta:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(194, 94, 0, 0.3); }

.pl-hero { position: relative; z-index: 1; padding: 80px 24px; }
.hero-container { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 48px; align-items: center; }
@media (max-width: 900px) { .hero-container { grid-template-columns: 1fr; } }

.badge-tag { display: inline-flex; align-items: center; gap: 8px; background: rgba(194, 94, 0, 0.1); border: 1px solid rgba(194, 94, 0, 0.25); color: var(--accent-warm); padding: 6px 14px; border-radius: 9999px; font-size: 13px; margin-bottom: 24px; }
.tag-icon { width: 14px; height: 14px; stroke: var(--accent-warm); }
.hero-title { font-family: 'Lora', serif; font-size: clamp(2.4rem, 4.8vw, 3.8rem); font-weight: 700; line-height: 1.15; margin-bottom: 20px; color: var(--text-main); }
.title-gradient { color: var(--accent-warm); }
.hero-subtitle { font-size: 1.05rem; color: var(--text-muted); line-height: 1.75; margin-bottom: 32px; max-width: 520px; }

.hero-features-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 36px; }
.hero-feature-item { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text-main); }
.check-icon { width: 16px; height: 16px; stroke: var(--accent-warm); }

.hero-actions { display: flex; flex-wrap: wrap; gap: 14px; }
.btn-warm { display: inline-flex; align-items: center; gap: 8px; background: var(--accent-warm); color: #FFF; font-weight: 600; padding: 13px 28px; border-radius: 9999px; text-decoration: none; cursor: pointer; box-shadow: 0 4px 20px rgba(194, 94, 0, 0.25); transition: transform 0.2s, box-shadow 0.2s; }
.btn-warm:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(194, 94, 0, 0.4); }
.btn-ghost { display: inline-flex; align-items: center; padding: 13px 24px; border-radius: 9999px; border: 1px solid var(--border-color); color: var(--text-muted); text-decoration: none; font-size: 14px; cursor: pointer; transition: color 0.2s, border-color 0.2s; }
.btn-ghost:hover { color: var(--text-main); border-color: var(--accent-warm); }

.hero-mockup-wrap { display: flex; justify-content: center; }
.mockup-card { position: relative; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 24px; padding: 36px; display: flex; justify-content: center; align-items: center; box-shadow: 0 16px 40px rgba(38, 30, 20, 0.06); }
.pillow-svg { width: 260px; height: 260px; }
.mockup-tag { position: absolute; background: rgba(250, 247, 242, 0.95); border: 1px solid var(--border-color); color: var(--accent-warm); font-size: 11px; font-weight: 600; padding: 4px 12px; border-radius: 9999px; }
.tag-top { top: 20px; right: 20px; } .tag-bottom { bottom: 20px; left: 20px; }

.pl-features { padding: 100px 24px; background: #F3ECE0; border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color); }
.section-container { max-width: 1200px; margin: 0 auto; }
.section-header { text-align: center; margin-bottom: 60px; }
.section-badge { display: inline-block; background: rgba(194, 94, 0, 0.1); border: 1px solid rgba(194, 94, 0, 0.25); color: var(--accent-warm); font-size: 11px; font-weight: 700; padding: 4px 14px; border-radius: 9999px; margin-bottom: 14px; letter-spacing: 0.05em; }
.section-title { font-family: 'Lora', serif; font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 700; margin-bottom: 12px; }
.section-sub { color: var(--text-muted); font-size: 15px; max-width: 500px; margin: 0 auto; }

.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
.feature-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 20px; padding: 32px; transition: transform 0.3s, border-color 0.3s; }
.feature-card:hover { transform: translateY(-4px); border-color: var(--accent-warm); }
.icon-box { width: 48px; height: 48px; background: rgba(194, 94, 0, 0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
.icon-box svg { width: 24px; height: 24px; stroke: var(--accent-warm); }
.feature-card h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 10px; }
.feature-card p { color: var(--text-muted); font-size: 14px; line-height: 1.65; }

.pl-products { padding: 100px 24px; }
.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; }
.product-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; overflow: hidden; text-decoration: none; color: var(--text-main); transition: transform 0.3s, border-color 0.3s; cursor: pointer; }
.product-card:hover { transform: translateY(-6px); border-color: var(--accent-warm); box-shadow: 0 16px 40px rgba(0,0,0,0.06); }
.product-img-box { position: relative; width: 100%; padding-top: 100%; background: #F3ECE0; }
.product-img-box img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.product-cat-tag { position: absolute; top: 12px; left: 12px; background: var(--accent-warm); color: #FFF; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 6px; }
.product-details { padding: 18px; }
.product-title { font-size: 15px; font-weight: 700; margin-bottom: 6px; }
.product-desc { font-size: 12px; color: var(--text-muted); line-height: 1.5; margin-bottom: 16px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.product-bottom { display: flex; justify-content: space-between; align-items: center; }
.product-price { font-size: 18px; font-weight: 800; color: var(--accent-warm); }
.product-btn { font-size: 13px; color: var(--text-muted); transition: color 0.2s; }
.product-card:hover .product-btn { color: var(--accent-warm); }

.product-skeleton { background: var(--bg-card); border-radius: 16px; border: 1px solid var(--border-color); overflow: hidden; }
.sk-img { width: 100%; padding-top: 100%; background: linear-gradient(90deg, #F3ECE0 25%, #E6DEC8 50%, #F3ECE0 75%); background-size: 400% 100%; animation: sk 1.5s infinite; }
.sk-body { padding: 18px; }
.sk-line { height: 12px; border-radius: 6px; background: linear-gradient(90deg, #F3ECE0 25%, #E6DEC8 50%, #F3ECE0 75%); background-size: 400% 100%; animation: sk 1.5s infinite; margin-bottom: 10px; }
.w-80 { width: 80%; } .w-50 { width: 50%; }
@keyframes sk { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

.empty-box { text-align: center; padding: 80px 24px; background: var(--bg-card); border: 1px dashed var(--border-color); border-radius: 24px; }
.empty-icon-wrap { width: 64px; height: 64px; background: rgba(194, 94, 0, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
.empty-icon-wrap svg { width: 32px; height: 32px; stroke: var(--accent-warm); }
.empty-box h3 { font-size: 1.2rem; font-weight: 700; margin-bottom: 8px; }
.empty-box p { color: var(--text-muted); font-size: 14px; max-width: 460px; margin: 0 auto 24px; line-height: 1.6; }

.pl-cta-banner { padding: 80px 24px; background: #3B1C05; color: #FAF7F2; text-align: center; }
.cta-container h2 { font-family: 'Lora', serif; font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 700; margin-bottom: 14px; }
.cta-container p { color: #FCD34D; max-width: 500px; margin: 0 auto 28px; line-height: 1.6; }
.btn-lg { padding: 15px 36px; font-size: 16px; }

.pl-footer { padding: 28px 24px; background: #261103; color: #FCD34D; border-top: 1px solid rgba(255,255,255,0.1); }
.footer-container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; font-size: 13px; }
.footer-brand { font-family: 'Lora', serif; font-weight: 700; color: #FFF; }
.footer-link { color: #FCD34D; text-decoration: none; transition: color 0.2s; }
.footer-link:hover { color: #FFF; }

.animate-up { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
.animate-up.in-view { opacity: 1; transform: translateY(0); }
</style>
