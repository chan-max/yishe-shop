<template>
  <div class="hoodie-page">
    <div class="ambient-orb orb-amber" />
    <div class="ambient-orb orb-indigo" />

    <!-- Navbar -->
    <header class="hd-navbar">
      <div class="navbar-inner">
        <NuxtLink to="/" class="navbar-brand">
          <svg class="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10a2 2 0 002 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" />
          </svg>
          <span>衣设 yishe</span>
        </NuxtLink>
        <nav class="navbar-links">
          <a href="#features">400g 重磅面料</a>
          <a href="#details">街头剪裁</a>
          <a href="#products">专属商品</a>
          <NuxtLink to="/design" class="navbar-cta">定制专属卫衣</NuxtLink>
        </nav>
      </div>
    </header>

    <!-- Hero -->
    <section class="hd-hero">
      <div class="hero-container">
        <div class="hero-content animate-up">
          <div class="badge-tag">
            <svg class="tag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            400g/㎡ 纯棉抓绒 · 挺括落肩版型
          </div>

          <h1 class="hero-title">
            街头质感重塑<br>
            <span class="title-gradient">400g 重磅连帽卫衣</span>
          </h1>

          <p class="hero-subtitle">
            选自特级重磅纯棉抓绒面料，厚实挺括不塌陷。支持大面积高保真刺绣与数码印花，打造专属于你的高街潮牌质感。
          </p>

          <div class="hero-stats">
            <div class="stat-box">
              <span class="stat-num">400g</span>
              <span class="stat-lbl">重磅纯棉抓绒</span>
            </div>
            <div class="stat-sep" />
            <div class="stat-box">
              <span class="stat-num">3D</span>
              <span class="stat-lbl">立体双层连帽</span>
            </div>
            <div class="stat-sep" />
            <div class="stat-box">
              <span class="stat-num">48h</span>
              <span class="stat-lbl">极速印制发货</span>
            </div>
          </div>

          <div class="hero-actions">
            <NuxtLink to="/design" class="btn-amber">
              ⚡ 开始卫衣 POD 定制
            </NuxtLink>
            <a href="#products" class="btn-ghost">查看在售商品 ↓</a>
          </div>
        </div>

        <div class="hero-mockup-wrap animate-up" style="animation-delay: 0.15s">
          <div class="mockup-card">
            <div class="card-glow" />
            <svg class="hoodie-svg" viewBox="0 0 400 440" fill="none">
              <!-- Hoodie Base SVG Shape -->
              <path d="M110 50 L150 75 Q200 95 250 75 L290 50 L380 120 L330 195 L295 165 V400 H105 V165 L70 195 L20 120 Z" fill="#161F30" stroke="#334155" stroke-width="3" />
              <!-- Hood Shape -->
              <path d="M150 75 Q200 30 250 75 Q200 95 150 75 Z" fill="#1E293B" stroke="#F59E0B" stroke-width="2" />
              <!-- Pocket -->
              <path d="M140 280 H260 L245 360 H155 Z" fill="#0F172A" stroke="#334155" stroke-width="2" />
              <!-- Drawstrings -->
              <path d="M185 85 V150" stroke="#F59E0B" stroke-width="3" stroke-linecap="round" />
              <path d="M215 85 V140" stroke="#F59E0B" stroke-width="3" stroke-linecap="round" />
              <!-- Printed Graphic -->
              <rect x="155" y="145" width="90" height="110" rx="10" fill="url(#amberGrad)" opacity="0.85" />
              <text x="200" y="205" font-family="sans-serif" font-size="16" font-weight="900" fill="#F8FAFC" text-anchor="middle">HOODIE</text>
              <defs>
                <linearGradient id="amberGrad" x1="0" y1="0" x2="90" y2="110" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#F59E0B" />
                  <stop offset="1" stop-color="#D97706" />
                </linearGradient>
              </defs>
            </svg>
            <div class="mockup-tag tag-top">双层挺括帽型</div>
            <div class="mockup-tag tag-bottom">袋鼠兜加固托缝</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Details -->
    <section id="features" class="hd-features">
      <div class="section-container">
        <div class="section-header animate-up">
          <span class="section-badge">工艺解析</span>
          <h2 class="section-title">高街质感 · 细节硬核</h2>
          <p class="section-sub">拒绝塌软无型，专为品质追求者打造的重磅卫衣标准。</p>
        </div>

        <div class="features-grid">
          <div class="feature-card animate-up" style="animation-delay: 0.05s">
            <div class="icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
            </div>
            <h3>400g/㎡ 双面抓绒棉</h3>
            <p>高密度织造，外层平整细腻易打理，内层高密细腻抓绒，保暖防风，型格十足。</p>
          </div>

          <div class="feature-card animate-up" style="animation-delay: 0.12s">
            <div class="icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h3>3D 立体双层大帽</h3>
            <p>双层同色面料拼接，连帽天然立挺不塌软，配备定制金属扣眼与抽绳。</p>
          </div>

          <div class="feature-card animate-up" style="animation-delay: 0.2s">
            <div class="icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <h3>刺绣/印花多元定制</h3>
            <p>支持 DTG 数码直喷、高密度绣花与烫金胶印，精准还原你的品牌 LOGO 或潮流设计。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section id="products" class="hd-products">
      <div class="section-container">
        <div class="section-header animate-up">
          <span class="section-badge">专属商品</span>
          <h2 class="section-title">【卫衣 / 连帽衫】在售款式</h2>
          <p class="section-sub">实时展示分类为「卫衣」的最新上架商品，直达印花定制。</p>
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
                <span class="product-price">¥{{ item.price || '189.00' }}</span>
                <span class="product-btn">定制此款 →</span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div v-else class="empty-box animate-up">
          <div class="empty-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10a2 2 0 002 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" />
            </svg>
          </div>
          <h3>暂无【卫衣】分类在售商品</h3>
          <p>管理员可以在后台商品模块发布分类为「卫衣」的商品。您现在可以直接进入 POD 设计器自定图案！</p>
          <NuxtLink to="/design" class="btn-amber">进入 POD 设计器</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Banner -->
    <section class="hd-cta-banner">
      <div class="cta-container animate-up">
        <h2>设计你的第一件重磅潮牌卫衣</h2>
        <p>支持图案自由编排、高精度预览与多色面料选择。一件即可下单发货。</p>
        <NuxtLink to="/design" class="btn-amber btn-lg">立即体验 POD 定制</NuxtLink>
      </div>
    </section>

    <!-- Footer -->
    <footer class="hd-footer">
      <div class="footer-container">
        <span class="footer-brand">衣设 yishe · 卫衣专属介绍页</span>
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
  title: '400g重磅连帽卫衣定制 · 服饰POD印花 · 衣设 yishe',
  ogTitle: '400g重磅连帽卫衣定制 · 服饰POD印花 · 衣设 yishe',
  description: '400g重磅纯棉抓绒连帽卫衣定制，立体大帽落肩版型，支持大面积印花与高精度刺绣，一件起订。',
  keywords: '卫衣定制, POD连帽衫, 重磅卫衣, 潮牌卫衣, 服饰印花'
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
    const res = await fetchPublishedProducts({ type: '卫衣', pageSize: 20 })
    products.value = res || []
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=DM+Sans:wght@400;500;700&display=swap');

.hoodie-page {
  --bg-deep: #0B0F17;
  --bg-card: #161F30;
  --accent-amber: #F59E0B;
  --accent-gold: #D97706;
  --text-main: #F8FAFC;
  --text-muted: #94A3B8;
  --border-color: rgba(255, 255, 255, 0.08);

  min-height: 100vh;
  background-color: var(--bg-deep);
  color: var(--text-main);
  font-family: 'DM Sans', -apple-system, sans-serif;
  position: relative;
  overflow-x: hidden;
}

.ambient-orb { position: fixed; border-radius: 50%; filter: blur(120px); pointer-events: none; z-index: 0; }
.orb-amber { width: 500px; height: 500px; background: radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, transparent 70%); top: -100px; right: -100px; }
.orb-indigo { width: 400px; height: 400px; background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%); top: 45%; left: -100px; }

.hd-navbar { position: sticky; top: 0; z-index: 100; background: rgba(11, 15, 23, 0.85); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border-color); padding: 0 24px; }
.navbar-inner { max-width: 1200px; margin: 0 auto; height: 64px; display: flex; align-items: center; justify-content: space-between; }
.navbar-brand { display: flex; align-items: center; gap: 10px; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 18px; color: var(--text-main); text-decoration: none; }
.brand-icon { width: 22px; height: 22px; stroke: var(--accent-amber); }
.navbar-links { display: flex; align-items: center; gap: 28px; }
.navbar-links a { color: var(--text-muted); text-decoration: none; font-size: 14px; transition: color 0.2s; cursor: pointer; }
.navbar-links a:hover { color: var(--text-main); }
.navbar-cta { background: linear-gradient(135deg, var(--accent-amber), var(--accent-gold)); color: #000 !important; font-weight: 700; padding: 8px 18px; border-radius: 9999px; transition: transform 0.2s, box-shadow 0.2s !important; }
.navbar-cta:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(245, 158, 11, 0.4); }

.hd-hero { position: relative; z-index: 1; padding: 80px 24px; }
.hero-container { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 48px; align-items: center; }
@media (max-width: 900px) { .hero-container { grid-template-columns: 1fr; } }

.badge-tag { display: inline-flex; align-items: center; gap: 8px; background: rgba(245, 158, 11, 0.12); border: 1px solid rgba(245, 158, 11, 0.3); color: var(--accent-amber); padding: 6px 14px; border-radius: 9999px; font-size: 13px; margin-bottom: 24px; }
.tag-icon { width: 14px; height: 14px; stroke: var(--accent-amber); }
.hero-title { font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 700; line-height: 1.1; margin-bottom: 20px; }
.title-gradient { background: linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero-subtitle { font-size: 1.05rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 36px; max-width: 520px; }

.hero-stats { display: flex; align-items: center; gap: 20px; margin-bottom: 36px; }
.stat-box { text-align: center; }
.stat-num { display: block; font-family: 'Space Grotesk', sans-serif; font-size: 1.6rem; font-weight: 700; color: var(--accent-amber); }
.stat-lbl { font-size: 12px; color: var(--text-muted); }
.stat-sep { width: 1px; height: 36px; background: var(--border-color); }

.hero-actions { display: flex; flex-wrap: wrap; gap: 14px; }
.btn-amber { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg, var(--accent-amber), var(--accent-gold)); color: #000; font-weight: 700; padding: 13px 28px; border-radius: 9999px; text-decoration: none; cursor: pointer; box-shadow: 0 4px 20px rgba(245, 158, 11, 0.35); transition: transform 0.2s, box-shadow 0.2s; }
.btn-amber:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(245, 158, 11, 0.5); }
.btn-ghost { display: inline-flex; align-items: center; padding: 13px 24px; border-radius: 9999px; border: 1px solid var(--border-color); color: var(--text-muted); text-decoration: none; font-size: 14px; cursor: pointer; transition: color 0.2s, border-color 0.2s; }
.btn-ghost:hover { color: var(--text-main); border-color: rgba(255,255,255,0.3); }

.hero-mockup-wrap { display: flex; justify-content: center; }
.mockup-card { position: relative; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 24px; padding: 40px; display: flex; justify-content: center; align-items: center; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
.card-glow { position: absolute; inset: 0; border-radius: 24px; background: radial-gradient(circle at center, rgba(245,158,11,0.15), transparent 70%); pointer-events: none; }
.hoodie-svg { width: 280px; height: 310px; }
.mockup-tag { position: absolute; background: rgba(11, 15, 23, 0.9); border: 1px solid var(--border-color); color: var(--accent-amber); font-size: 11px; font-weight: 600; padding: 4px 12px; border-radius: 9999px; }
.tag-top { top: 20px; right: 20px; } .tag-bottom { bottom: 20px; left: 20px; }

.hd-features { padding: 100px 24px; background: rgba(22, 31, 48, 0.4); border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color); }
.section-container { max-width: 1200px; margin: 0 auto; }
.section-header { text-align: center; margin-bottom: 60px; }
.section-badge { display: inline-block; background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); color: var(--accent-amber); font-size: 11px; font-weight: 700; padding: 4px 14px; border-radius: 9999px; margin-bottom: 14px; letter-spacing: 0.05em; }
.section-title { font-family: 'Space Grotesk', sans-serif; font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 700; margin-bottom: 12px; }
.section-sub { color: var(--text-muted); font-size: 15px; max-width: 500px; margin: 0 auto; }

.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
.feature-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 20px; padding: 32px; transition: transform 0.3s, border-color 0.3s; }
.feature-card:hover { transform: translateY(-4px); border-color: rgba(245, 158, 11, 0.4); }
.icon-box { width: 48px; height: 48px; background: rgba(245, 158, 11, 0.15); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
.icon-box svg { width: 24px; height: 24px; stroke: var(--accent-amber); }
.feature-card h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 10px; }
.feature-card p { color: var(--text-muted); font-size: 14px; line-height: 1.6; }

.hd-products { padding: 100px 24px; }
.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; }
.product-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; overflow: hidden; text-decoration: none; color: var(--text-main); transition: transform 0.3s, border-color 0.3s; cursor: pointer; }
.product-card:hover { transform: translateY(-6px); border-color: rgba(245,158,11,0.5); }
.product-img-box { position: relative; width: 100%; padding-top: 100%; background: #0B0F17; }
.product-img-box img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.product-cat-tag { position: absolute; top: 12px; left: 12px; background: rgba(245, 158, 11, 0.9); color: #000; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 6px; }
.product-details { padding: 18px; }
.product-title { font-size: 15px; font-weight: 700; margin-bottom: 6px; }
.product-desc { font-size: 12px; color: var(--text-muted); line-height: 1.5; margin-bottom: 16px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.product-bottom { display: flex; justify-content: space-between; align-items: center; }
.product-price { font-size: 18px; font-weight: 800; color: var(--accent-amber); }
.product-btn { font-size: 13px; color: var(--text-muted); transition: color 0.2s; }
.product-card:hover .product-btn { color: var(--accent-amber); }

.product-skeleton { background: var(--bg-card); border-radius: 16px; border: 1px solid var(--border-color); overflow: hidden; }
.sk-img { width: 100%; padding-top: 100%; background: linear-gradient(90deg, #161F30 25%, #222E45 50%, #161F30 75%); background-size: 400% 100%; animation: sk 1.5s infinite; }
.sk-body { padding: 18px; }
.sk-line { height: 12px; border-radius: 6px; background: linear-gradient(90deg, #161F30 25%, #222E45 50%, #161F30 75%); background-size: 400% 100%; animation: sk 1.5s infinite; margin-bottom: 10px; }
.w-80 { width: 80%; } .w-50 { width: 50%; }
@keyframes sk { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

.empty-box { text-align: center; padding: 80px 24px; background: var(--bg-card); border: 1px dashed var(--border-color); border-radius: 24px; }
.empty-icon-wrap { width: 64px; height: 64px; background: rgba(245, 158, 11, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
.empty-icon-wrap svg { width: 32px; height: 32px; stroke: var(--accent-amber); }
.empty-box h3 { font-size: 1.2rem; font-weight: 700; margin-bottom: 8px; }
.empty-box p { color: var(--text-muted); font-size: 14px; max-width: 460px; margin: 0 auto 24px; line-height: 1.6; }

.hd-cta-banner { padding: 80px 24px; background: linear-gradient(135deg, #1E170A 0%, #382405 100%); text-align: center; border-top: 1px solid var(--border-color); }
.cta-container h2 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 700; margin-bottom: 14px; }
.cta-container p { color: var(--text-muted); max-width: 500px; margin: 0 auto 28px; line-height: 1.6; }
.btn-lg { padding: 15px 36px; font-size: 16px; }

.hd-footer { padding: 28px 24px; background: #06090F; border-top: 1px solid var(--border-color); }
.footer-container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; font-size: 13px; color: var(--text-muted); }
.footer-brand { font-family: 'Space Grotesk', sans-serif; font-weight: 700; color: var(--accent-amber); }
.footer-link { color: var(--text-muted); text-decoration: none; transition: color 0.2s; }
.footer-link:hover { color: var(--text-main); }

.animate-up { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
.animate-up.in-view { opacity: 1; transform: translateY(0); }
</style>
