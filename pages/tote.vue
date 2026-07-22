<template>
  <div class="tote-page">
    <!-- Navbar -->
    <header class="tt-navbar">
      <div class="navbar-inner">
        <NuxtLink to="/" class="navbar-brand">
          <svg class="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <span>衣设 yishe</span>
        </NuxtLink>
        <nav class="navbar-links">
          <a href="#features">12安加厚帆布</a>
          <a href="#details">容量细节</a>
          <a href="#products">专属商品</a>
          <NuxtLink to="/design" class="navbar-cta">定制帆布包</NuxtLink>
        </nav>
      </div>
    </header>

    <!-- Hero -->
    <section class="tt-hero">
      <div class="hero-container">
        <div class="hero-content animate-up">
          <div class="badge-tag">
            <svg class="tag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            12安纯棉帆布 · 环保可循环使用
          </div>

          <h1 class="hero-title">
            把艺术便携随行<br>
            <span class="title-gradient">专属环保帆布托特包</span>
          </h1>

          <p class="hero-subtitle">
            精选 12 安加厚环保无染纯棉帆布，结实耐磨无异味。支持双面全彩水墨印染、文字烫印与刺绣，轻便装下灵感与日常。
          </p>

          <div class="hero-features-list">
            <div class="hero-feature-item">
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>12oz 密织加厚棉帆布</span>
            </div>
            <div class="hero-feature-item">
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>加宽承重肩带 + 内置暗袋</span>
            </div>
            <div class="hero-feature-item">
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>环保无毒印花 · 高色牢度</span>
            </div>
          </div>

          <div class="hero-actions">
            <NuxtLink to="/design" class="btn-emerald">
              🌿 开始帆布包 POD 定制
            </NuxtLink>
            <a href="#products" class="btn-ghost">查看在售商品 ↓</a>
          </div>
        </div>

        <div class="hero-mockup-wrap animate-up" style="animation-delay: 0.15s">
          <div class="mockup-card">
            <svg class="tote-svg" viewBox="0 0 360 420" fill="none">
              <!-- Handles -->
              <path d="M120 120 C120 40 240 40 240 120" stroke="#78350F" stroke-width="12" stroke-linecap="round" fill="none" />
              <!-- Bag Body -->
              <rect x="70" y="110" width="220" height="260" rx="16" fill="#F5F2EB" stroke="#D6CEBE" stroke-width="3" />
              <line x1="70" y1="130" x2="290" y2="130" stroke="#E2DAC9" stroke-width="2" />
              <!-- Inner pocket dash line -->
              <path d="M130 150 H230 V200 H130 Z" fill="#EFE9DC" stroke="#D6CEBE" stroke-width="1.5" stroke-dasharray="4 4" />
              <!-- Art Graphic -->
              <rect x="110" y="210" width="140" height="130" rx="10" fill="url(#toteArt)" />
              <circle cx="180" cy="275" r="30" fill="none" stroke="#FAF8F5" stroke-width="3" />
              <text x="180" y="280" font-family="serif" font-size="14" font-weight="bold" fill="#FAF8F5" text-anchor="middle">ART TOTE</text>
              <defs>
                <linearGradient id="toteArt" x1="0" y1="0" x2="140" y2="130" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#059669" />
                  <stop offset="1" stop-color="#047857" />
                </linearGradient>
              </defs>
            </svg>
            <div class="mockup-tag tag-top">X型打圈十字加固</div>
            <div class="mockup-tag tag-bottom">大容量包底扩容</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="tt-features">
      <div class="section-container">
        <div class="section-header animate-up">
          <span class="section-badge">天然生活</span>
          <h2 class="section-title">实用与美学结合的伴身好物</h2>
          <p class="section-sub">无论是日常通勤、图书馆阅读还是周末集市，皆能随心搭配。</p>
        </div>

        <div class="features-grid">
          <div class="feature-card animate-up" style="animation-delay: 0.05s">
            <div class="icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              </svg>
            </div>
            <h3>12oz 密织加厚棉面料</h3>
            <p>选用未经漂白的原色纯棉帆布，布面带有天然棉籽微粒，质感朴素天然，经久耐磨。</p>
          </div>

          <div class="feature-card animate-up" style="animation-delay: 0.12s">
            <div class="icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1" />
                <path d="M18 8h4a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-4" />
              </svg>
            </div>
            <h3>大容量 + 内置收纳暗袋</h3>
            <p>轻松容纳 15.6 英寸笔记本电脑、书籍与水杯。内置带拉链暗袋，手机钥匙安全收纳。</p>
          </div>

          <div class="feature-card animate-up" style="animation-delay: 0.2s">
            <div class="icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
            </div>
            <h3>环保印花 · 久洗不退色</h3>
            <p>采用水性环保印花浆料，高温固色，图案耐磨耐洗不打皱，还原艺术画作的细节色彩。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Products -->
    <section id="products" class="tt-products">
      <div class="section-container">
        <div class="section-header animate-up">
          <span class="section-badge">专属商品</span>
          <h2 class="section-title">【帆布包 / 托特包】在售款式</h2>
          <p class="section-sub">实时同步分类为「帆布包」的已上架商品。</p>
        </div>

        <div v-if="loading" class="products-grid">
          <div v-for="i in 4" :key="i" class="product-skeleton">
            <div class="sk-img" stroke-width="2" />
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
                <span class="product-price">¥{{ item.price || '69.00' }}</span>
                <span class="product-btn">定制此款 →</span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div v-else class="empty-box animate-up">
          <div class="empty-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            </svg>
          </div>
          <h3>暂无【帆布包】分类在售商品</h3>
          <p>管理员可在后台发布分类为「帆布包」的商品。您现在可以直接进入 POD 设计器自定图案！</p>
          <NuxtLink to="/design" class="btn-emerald">进入 POD 设计器</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Banner -->
    <section class="tt-cta-banner">
      <div class="cta-container animate-up">
        <h2>拎上属于你的艺术灵感</h2>
        <p>支持自由图案排版、文创设计上传与一件代发。48小时内极速发货。</p>
        <NuxtLink to="/design" class="btn-emerald btn-lg">立即体验 POD 定制</NuxtLink>
      </div>
    </section>

    <!-- Footer -->
    <footer class="tt-footer">
      <div class="footer-container">
        <span class="footer-brand">衣设 yishe · 帆布包专属介绍页</span>
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
  title: '12安环保帆布包定制 · POD托特包印染 · 衣设 yishe',
  ogTitle: '12安环保帆布包定制 · POD托特包印染 · 衣设 yishe',
  description: '12安加厚无染纯棉帆布托特包定制，支持双面水墨全彩印花、文创设计，环保耐磨大容量，单件起订。',
  keywords: '帆布包定制, POD托特包, 环保帆布袋, 文创袋定制, 帆布包印花'
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
    const res = await fetchPublishedProducts({ type: '帆布包', pageSize: 20 })
    products.value = res || []
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

.tote-page {
  --bg-deep: #FAF8F5;
  --bg-card: #FFFFFF;
  --accent-emerald: #059669;
  --accent-dark-emerald: #047857;
  --text-main: #1C2A26;
  --text-muted: #5C6E68;
  --border-color: #E2DAC9;

  min-height: 100vh;
  background-color: var(--bg-deep);
  color: var(--text-main);
  font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
  position: relative;
  overflow-x: hidden;
}

.tt-navbar { position: sticky; top: 0; z-index: 100; background: rgba(250, 248, 245, 0.85); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border-color); padding: 0 24px; }
.navbar-inner { max-width: 1200px; margin: 0 auto; height: 64px; display: flex; align-items: center; justify-content: space-between; }
.navbar-brand { display: flex; align-items: center; gap: 10px; font-family: 'Playfair Display', serif; font-weight: 700; font-size: 19px; color: var(--text-main); text-decoration: none; }
.brand-icon { width: 22px; height: 22px; stroke: var(--accent-emerald); }
.navbar-links { display: flex; align-items: center; gap: 28px; }
.navbar-links a { color: var(--text-muted); text-decoration: none; font-size: 14px; transition: color 0.2s; cursor: pointer; }
.navbar-links a:hover { color: var(--text-main); }
.navbar-cta { background: var(--accent-emerald); color: #FFF !important; font-weight: 600; padding: 8px 18px; border-radius: 9999px; transition: transform 0.2s, box-shadow 0.2s !important; }
.navbar-cta:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(5, 150, 105, 0.3); }

.tt-hero { position: relative; z-index: 1; padding: 80px 24px; }
.hero-container { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 48px; align-items: center; }
@media (max-width: 900px) { .hero-container { grid-template-columns: 1fr; } }

.badge-tag { display: inline-flex; align-items: center; gap: 8px; background: rgba(5, 150, 105, 0.1); border: 1px solid rgba(5, 150, 105, 0.25); color: var(--accent-emerald); padding: 6px 14px; border-radius: 9999px; font-size: 13px; margin-bottom: 24px; }
.tag-icon { width: 14px; height: 14px; stroke: var(--accent-emerald); }
.hero-title { font-family: 'Playfair Display', serif; font-size: clamp(2.5rem, 5vw, 3.8rem); font-weight: 700; line-height: 1.15; margin-bottom: 20px; color: var(--text-main); }
.title-gradient { color: var(--accent-emerald); }
.hero-subtitle { font-size: 1.05rem; color: var(--text-muted); line-height: 1.75; margin-bottom: 32px; max-width: 520px; }

.hero-features-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 36px; }
.hero-feature-item { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text-main); }
.check-icon { width: 16px; height: 16px; stroke: var(--accent-emerald); }

.hero-actions { display: flex; flex-wrap: wrap; gap: 14px; }
.btn-emerald { display: inline-flex; align-items: center; gap: 8px; background: var(--accent-emerald); color: #FFF; font-weight: 600; padding: 13px 28px; border-radius: 9999px; text-decoration: none; cursor: pointer; box-shadow: 0 4px 20px rgba(5, 150, 105, 0.25); transition: transform 0.2s, box-shadow 0.2s; }
.btn-emerald:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(5, 150, 105, 0.4); }
.btn-ghost { display: inline-flex; align-items: center; padding: 13px 24px; border-radius: 9999px; border: 1px solid var(--border-color); color: var(--text-muted); text-decoration: none; font-size: 14px; cursor: pointer; transition: color 0.2s, border-color 0.2s; }
.btn-ghost:hover { color: var(--text-main); border-color: var(--accent-emerald); }

.hero-mockup-wrap { display: flex; justify-content: center; }
.mockup-card { position: relative; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 24px; padding: 36px; display: flex; justify-content: center; align-items: center; box-shadow: 0 16px 40px rgba(28, 42, 38, 0.08); }
.tote-svg { width: 280px; height: 320px; }
.mockup-tag { position: absolute; background: rgba(250, 248, 245, 0.95); border: 1px solid var(--border-color); color: var(--accent-dark-emerald); font-size: 11px; font-weight: 600; padding: 4px 12px; border-radius: 9999px; }
.tag-top { top: 20px; right: 20px; } .tag-bottom { bottom: 20px; left: 20px; }

.tt-features { padding: 100px 24px; background: #F2ECE1; border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color); }
.section-container { max-width: 1200px; margin: 0 auto; }
.section-header { text-align: center; margin-bottom: 60px; }
.section-badge { display: inline-block; background: rgba(5, 150, 105, 0.1); border: 1px solid rgba(5, 150, 105, 0.25); color: var(--accent-emerald); font-size: 11px; font-weight: 700; padding: 4px 14px; border-radius: 9999px; margin-bottom: 14px; letter-spacing: 0.05em; }
.section-title { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 700; margin-bottom: 12px; }
.section-sub { color: var(--text-muted); font-size: 15px; max-width: 500px; margin: 0 auto; }

.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
.feature-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 20px; padding: 32px; transition: transform 0.3s, border-color 0.3s; }
.feature-card:hover { transform: translateY(-4px); border-color: var(--accent-emerald); }
.icon-box { width: 48px; height: 48px; background: rgba(5, 150, 105, 0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
.icon-box svg { width: 24px; height: 24px; stroke: var(--accent-emerald); }
.feature-card h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 10px; }
.feature-card p { color: var(--text-muted); font-size: 14px; line-height: 1.65; }

.tt-products { padding: 100px 24px; }
.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; }
.product-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; overflow: hidden; text-decoration: none; color: var(--text-main); transition: transform 0.3s, border-color 0.3s; cursor: pointer; }
.product-card:hover { transform: translateY(-6px); border-color: var(--accent-emerald); box-shadow: 0 16px 40px rgba(0,0,0,0.06); }
.product-img-box { position: relative; width: 100%; padding-top: 100%; background: #F2ECE1; }
.product-img-box img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.product-cat-tag { position: absolute; top: 12px; left: 12px; background: var(--accent-emerald); color: #FFF; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 6px; }
.product-details { padding: 18px; }
.product-title { font-size: 15px; font-weight: 700; margin-bottom: 6px; }
.product-desc { font-size: 12px; color: var(--text-muted); line-height: 1.5; margin-bottom: 16px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.product-bottom { display: flex; justify-content: space-between; align-items: center; }
.product-price { font-size: 18px; font-weight: 800; color: var(--accent-emerald); }
.product-btn { font-size: 13px; color: var(--text-muted); transition: color 0.2s; }
.product-card:hover .product-btn { color: var(--accent-emerald); }

.product-skeleton { background: var(--bg-card); border-radius: 16px; border: 1px solid var(--border-color); overflow: hidden; }
.sk-img { width: 100%; padding-top: 100%; background: linear-gradient(90deg, #F2ECE1 25%, #E5DDD0 50%, #F2ECE1 75%); background-size: 400% 100%; animation: sk 1.5s infinite; }
.sk-body { padding: 18px; }
.sk-line { height: 12px; border-radius: 6px; background: linear-gradient(90deg, #F2ECE1 25%, #E5DDD0 50%, #F2ECE1 75%); background-size: 400% 100%; animation: sk 1.5s infinite; margin-bottom: 10px; }
.w-80 { width: 80%; } .w-50 { width: 50%; }
@keyframes sk { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

.empty-box { text-align: center; padding: 80px 24px; background: var(--bg-card); border: 1px dashed var(--border-color); border-radius: 24px; }
.empty-icon-wrap { width: 64px; height: 64px; background: rgba(5, 150, 105, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
.empty-icon-wrap svg { width: 32px; height: 32px; stroke: var(--accent-emerald); }
.empty-box h3 { font-size: 1.2rem; font-weight: 700; margin-bottom: 8px; }
.empty-box p { color: var(--text-muted); font-size: 14px; max-width: 460px; margin: 0 auto 24px; line-height: 1.6; }

.tt-cta-banner { padding: 80px 24px; background: #064E3B; color: #FAF8F5; text-align: center; }
.cta-container h2 { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 700; margin-bottom: 14px; }
.cta-container p { color: #A7F3D0; max-width: 500px; margin: 0 auto 28px; line-height: 1.6; }
.btn-lg { padding: 15px 36px; font-size: 16px; }

.tt-footer { padding: 28px 24px; background: #022C22; color: #A7F3D0; border-top: 1px solid rgba(255,255,255,0.1); }
.footer-container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; font-size: 13px; }
.footer-brand { font-family: 'Playfair Display', serif; font-weight: 700; color: #FFF; }
.footer-link { color: #A7F3D0; text-decoration: none; transition: color 0.2s; }
.footer-link:hover { color: #FFF; }

.animate-up { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
.animate-up.in-view { opacity: 1; transform: translateY(0); }
</style>
