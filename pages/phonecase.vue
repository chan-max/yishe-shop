<template>
  <div class="case-page">
    <div class="ambient-orb orb-cyan" />
    <div class="ambient-orb orb-purple" />

    <!-- Navbar -->
    <header class="pc-navbar">
      <div class="navbar-inner">
        <NuxtLink to="/" class="navbar-brand">
          <svg class="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="5" y="2" width="14" height="20" rx="3" />
            <line x1="12" y1="18" x2="12.01" y2="18" stroke-width="3" />
          </svg>
          <span>衣设 yishe</span>
        </NuxtLink>
        <nav class="navbar-links">
          <a href="#features">气囊防摔工艺</a>
          <a href="#print">UV 浮雕质感</a>
          <a href="#products">专属商品</a>
          <NuxtLink to="/design" class="navbar-cta">定制手机壳</NuxtLink>
        </nav>
      </div>
    </header>

    <!-- Hero -->
    <section class="pc-hero">
      <div class="hero-container">
        <div class="hero-content animate-up">
          <div class="badge-tag">
            <svg class="tag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            防摔气囊包边 · 3米防跌落检验
          </div>

          <h1 class="hero-title">
            防摔防护与艺术交融<br>
            <span class="title-gradient">专属高保真浮雕手机壳</span>
          </h1>

          <p class="hero-subtitle">
            全包四角四重缓冲气囊结构，兼具轻薄手感与强悍防摔能力。搭配纳米级 UV 浮雕印花，画作色彩立体触手可及。
          </p>

          <div class="hero-features-list">
            <div class="hero-feature-item">
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>四角隐形防摔气囊结构</span>
            </div>
            <div class="hero-feature-item">
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>镜头全包高于镜头 1.2mm</span>
            </div>
            <div class="hero-feature-item">
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>3D 立体 UV 浮雕触感印画</span>
            </div>
          </div>

          <div class="hero-actions">
            <NuxtLink to="/design" class="btn-cyan">
              ⚡ 开始手机壳 POD 定制
            </NuxtLink>
            <a href="#products" class="btn-ghost">查看在售商品 ↓</a>
          </div>
        </div>

        <div class="hero-mockup-wrap animate-up" style="animation-delay: 0.15s">
          <div class="mockup-card">
            <div class="card-glow" />
            <svg class="phone-svg" viewBox="0 0 240 440" fill="none">
              <!-- Outer Case outline -->
              <rect x="20" y="20" width="200" height="400" rx="36" fill="#0F172A" stroke="#06B6D4" stroke-width="3" />
              <!-- Camera Bump -->
              <rect x="40" y="40" width="70" height="70" rx="16" fill="#1E293B" stroke="#334155" stroke-width="2" />
              <circle cx="62" cy="62" r="12" fill="#000" stroke="#06B6D4" stroke-width="2" />
              <circle cx="88" cy="88" r="12" fill="#000" stroke="#06B6D4" stroke-width="2" />
              <circle cx="88" cy="62" r="6" fill="#06B6D4" />
              <!-- Back Graphic Pattern -->
              <rect x="35" y="130" width="170" height="270" rx="20" fill="url(#cyberArt)" opacity="0.9" />
              <circle cx="120" cy="265" r="35" fill="none" stroke="#06B6D4" stroke-width="3" stroke-dasharray="4 4" />
              <text x="120" y="270" font-family="sans-serif" font-size="12" font-weight="900" fill="#F8FAFC" text-anchor="middle">CYBER CASE</text>
              <defs>
                <linearGradient id="cyberArt" x1="0" y1="0" x2="170" y2="270" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#06B6D4" />
                  <stop offset="1" stop-color="#3B82F6" />
                </linearGradient>
              </defs>
            </svg>
            <div class="mockup-tag tag-top">支持 iPhone/华为/小米</div>
            <div class="mockup-tag tag-bottom">支持无线充电</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="pc-features">
      <div class="section-container">
        <div class="section-header animate-up">
          <span class="section-badge">强悍防护</span>
          <h2 class="section-title">全方位包覆 · 艺术不妥协</h2>
          <p class="section-sub">从材料抗黄变测试到 drop-test 防摔碰撞测试，全方位守护爱机。</p>
        </div>

        <div class="features-grid">
          <div class="feature-card animate-up" style="animation-delay: 0.05s">
            <div class="icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3>四角隐藏式防摔气囊</h3>
            <p>高弹 Bayer TPU 软胶边框，内置四角分子避震结构，能有效吸收 90% 跌落冲击力。</p>
          </div>

          <div class="feature-card animate-up" style="animation-delay: 0.12s">
            <div class="icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h3>3D 微浮雕触感工艺</h3>
            <p>采用日本高精度 UV 浮雕彩印技术，色彩饱满不过饱和，图案凹凸有致，久握不汗粘。</p>
          </div>

          <div class="feature-card animate-up" style="animation-delay: 0.2s">
            <div class="icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <h3>全型号精准开孔</h3>
            <p>覆盖主流 iPhone, 华为, 小米, 三星等热门机型。按键按压清脆无延迟，支持 Magsafe 无线充。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section id="products" class="pc-products">
      <div class="section-container">
        <div class="section-header animate-up">
          <span class="section-badge">专属商品</span>
          <h2 class="section-title">【手机壳】在售款式</h2>
          <p class="section-sub">实时展示分类为「手机壳」的最新上架定制款式。</p>
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
              <p class="product-desc">{{ item.description || '四角气囊防摔，3D立体UV浮雕，全机型按键精准适配。' }}</p>
              <div class="product-bottom">
                <span class="product-price">¥{{ item.price || '49.00' }}</span>
                <span class="product-btn">定制此款 →</span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div v-else class="empty-box animate-up">
          <div class="empty-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="5" y="2" width="14" height="20" rx="3" />
            </svg>
          </div>
          <h3>暂无【手机壳】分类在售商品</h3>
          <p>管理员可在后台发布分类为「手机壳」的商品。您现在可以直接进入 POD 设计器自定图案！</p>
          <NuxtLink to="/design" class="btn-cyan">进入 POD 设计器</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Banner -->
    <section class="pc-cta-banner">
      <div class="cta-container animate-up">
        <h2>为你的爱机披上专属防摔战袍</h2>
        <p>支持多型号选择、高清照片上传与创意图形印制。48小时内发货。</p>
        <NuxtLink to="/design" class="btn-cyan btn-lg">立即体验 POD 定制</NuxtLink>
      </div>
    </section>

    <!-- Footer -->
    <footer class="pc-footer">
      <div class="footer-container">
        <span class="footer-brand">衣设 yishe · 手机壳专属介绍页</span>
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
  title: '防摔浮雕手机壳定制 · 全机型POD配饰 · 衣设 yishe',
  ogTitle: '防摔浮雕手机壳定制 · 全机型POD配饰 · 衣设 yishe',
  description: '四角隐形防摔气囊手机壳定制，支持iPhone、华为、小米等全机型。纳米级3D UV浮雕彩印，耐磨抗黄变。',
  keywords: '手机壳定制, POD手机壳, 防摔手机壳, 浮雕手机壳, 数码配件印花'
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
    const res = await fetchPublishedProducts({ type: '手机壳', searchText: '壳', pageSize: 20 })
    products.value = res || []
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Inter:wght@400;500;600;700&display=swap');

.case-page {
  --bg-deep: #090D16;
  --bg-card: #0F172A;
  --accent-cyan: #06B6D4;
  --accent-purple: #A855F7;
  --text-main: #F8FAFC;
  --text-muted: #94A3B8;
  --border-color: rgba(6, 182, 212, 0.2);

  min-height: 100vh;
  background-color: var(--bg-deep);
  color: var(--text-main);
  font-family: 'Inter', -apple-system, sans-serif;
  position: relative;
  overflow-x: hidden;
}

.ambient-orb { position: fixed; border-radius: 50%; filter: blur(120px); pointer-events: none; z-index: 0; }
.orb-cyan { width: 500px; height: 500px; background: radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%); top: -100px; left: -100px; }
.orb-purple { width: 400px; height: 400px; background: radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%); bottom: 10%; right: -100px; }

.pc-navbar { position: sticky; top: 0; z-index: 100; background: rgba(9, 13, 22, 0.85); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border-color); padding: 0 24px; }
.navbar-inner { max-width: 1200px; margin: 0 auto; height: 64px; display: flex; align-items: center; justify-content: space-between; }
.navbar-brand { display: flex; align-items: center; gap: 10px; font-family: 'Orbitron', sans-serif; font-weight: 700; font-size: 17px; color: var(--text-main); text-decoration: none; }
.brand-icon { width: 22px; height: 22px; stroke: var(--accent-cyan); }
.navbar-links { display: flex; align-items: center; gap: 28px; }
.navbar-links a { color: var(--text-muted); text-decoration: none; font-size: 14px; transition: color 0.2s; cursor: pointer; }
.navbar-links a:hover { color: var(--text-main); }
.navbar-cta { background: linear-gradient(135deg, var(--accent-cyan), #3B82F6); color: #FFF !important; font-weight: 600; padding: 8px 18px; border-radius: 9999px; transition: transform 0.2s, box-shadow 0.2s !important; }
.navbar-cta:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(6, 182, 212, 0.4); }

.pc-hero { position: relative; z-index: 1; padding: 80px 24px; }
.hero-container { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 48px; align-items: center; }
@media (max-width: 900px) { .hero-container { grid-template-columns: 1fr; } }

.badge-tag { display: inline-flex; align-items: center; gap: 8px; background: rgba(6, 182, 212, 0.1); border: 1px solid var(--border-color); color: var(--accent-cyan); padding: 6px 14px; border-radius: 9999px; font-size: 13px; margin-bottom: 24px; }
.tag-icon { width: 14px; height: 14px; stroke: var(--accent-cyan); }
.hero-title { font-family: 'Orbitron', sans-serif; font-size: clamp(2.3rem, 4.5vw, 3.6rem); font-weight: 700; line-height: 1.15; margin-bottom: 20px; }
.title-gradient { background: linear-gradient(135deg, #06B6D4 0%, #A855F7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero-subtitle { font-size: 1.05rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 36px; max-width: 520px; }

.hero-features-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 36px; }
.hero-feature-item { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text-main); }
.check-icon { width: 16px; height: 16px; stroke: var(--accent-cyan); }

.hero-actions { display: flex; flex-wrap: wrap; gap: 14px; }
.btn-cyan { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg, var(--accent-cyan), #3B82F6); color: #FFF; font-weight: 700; padding: 13px 28px; border-radius: 9999px; text-decoration: none; cursor: pointer; box-shadow: 0 4px 20px rgba(6, 182, 212, 0.35); transition: transform 0.2s, box-shadow 0.2s; }
.btn-cyan:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(6, 182, 212, 0.5); }
.btn-ghost { display: inline-flex; align-items: center; padding: 13px 24px; border-radius: 9999px; border: 1px solid var(--border-color); color: var(--text-muted); text-decoration: none; font-size: 14px; cursor: pointer; transition: color 0.2s, border-color 0.2s; }
.btn-ghost:hover { color: var(--text-main); border-color: rgba(6, 182, 212, 0.5); }

.hero-mockup-wrap { display: flex; justify-content: center; }
.mockup-card { position: relative; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 24px; padding: 36px; display: flex; justify-content: center; align-items: center; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
.card-glow { position: absolute; inset: 0; border-radius: 24px; background: radial-gradient(circle at center, rgba(6,182,212,0.15), transparent 70%); pointer-events: none; }
.phone-svg { width: 220px; height: 340px; }
.mockup-tag { position: absolute; background: rgba(9, 13, 22, 0.9); border: 1px solid var(--border-color); color: var(--accent-cyan); font-size: 11px; font-weight: 600; padding: 4px 12px; border-radius: 9999px; }
.tag-top { top: 20px; right: 20px; } .tag-bottom { bottom: 20px; left: 20px; }

.pc-features { padding: 100px 24px; background: rgba(15, 23, 42, 0.6); border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color); }
.section-container { max-width: 1200px; margin: 0 auto; }
.section-header { text-align: center; margin-bottom: 60px; }
.section-badge { display: inline-block; background: rgba(6, 182, 212, 0.1); border: 1px solid var(--border-color); color: var(--accent-cyan); font-size: 11px; font-weight: 700; padding: 4px 14px; border-radius: 9999px; margin-bottom: 14px; letter-spacing: 0.05em; }
.section-title { font-family: 'Orbitron', sans-serif; font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 700; margin-bottom: 12px; }
.section-sub { color: var(--text-muted); font-size: 15px; max-width: 500px; margin: 0 auto; }

.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
.feature-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 20px; padding: 32px; transition: transform 0.3s, border-color 0.3s; }
.feature-card:hover { transform: translateY(-4px); border-color: var(--accent-cyan); }
.icon-box { width: 48px; height: 48px; background: rgba(6, 182, 212, 0.15); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
.icon-box svg { width: 24px; height: 24px; stroke: var(--accent-cyan); }
.feature-card h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 10px; }
.feature-card p { color: var(--text-muted); font-size: 14px; line-height: 1.6; }

.pc-products { padding: 100px 24px; }
.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; }
.product-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; overflow: hidden; text-decoration: none; color: var(--text-main); transition: transform 0.3s, border-color 0.3s; cursor: pointer; }
.product-card:hover { transform: translateY(-6px); border-color: var(--accent-cyan); }
.product-img-box { position: relative; width: 100%; padding-top: 100%; background: #090D16; }
.product-img-box img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.product-cat-tag { position: absolute; top: 12px; left: 12px; background: var(--accent-cyan); color: #000; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 6px; }
.product-details { padding: 18px; }
.product-title { font-size: 15px; font-weight: 700; margin-bottom: 6px; }
.product-desc { font-size: 12px; color: var(--text-muted); line-height: 1.5; margin-bottom: 16px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.product-bottom { display: flex; justify-content: space-between; align-items: center; }
.product-price { font-size: 18px; font-weight: 800; color: var(--accent-cyan); }
.product-btn { font-size: 13px; color: var(--text-muted); transition: color 0.2s; }
.product-card:hover .product-btn { color: var(--accent-cyan); }

.product-skeleton { background: var(--bg-card); border-radius: 16px; border: 1px solid var(--border-color); overflow: hidden; }
.sk-img { width: 100%; padding-top: 100%; background: linear-gradient(90deg, #0F172A 25%, #1E293B 50%, #0F172A 75%); background-size: 400% 100%; animation: sk 1.5s infinite; }
.sk-body { padding: 18px; }
.sk-line { height: 12px; border-radius: 6px; background: linear-gradient(90deg, #0F172A 25%, #1E293B 50%, #0F172A 75%); background-size: 400% 100%; animation: sk 1.5s infinite; margin-bottom: 10px; }
.w-80 { width: 80%; } .w-50 { width: 50%; }
@keyframes sk { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

.empty-box { text-align: center; padding: 80px 24px; background: var(--bg-card); border: 1px dashed var(--border-color); border-radius: 24px; }
.empty-icon-wrap { width: 64px; height: 64px; background: rgba(6, 182, 212, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
.empty-icon-wrap svg { width: 32px; height: 32px; stroke: var(--accent-cyan); }
.empty-box h3 { font-size: 1.2rem; font-weight: 700; margin-bottom: 8px; }
.empty-box p { color: var(--text-muted); font-size: 14px; max-width: 460px; margin: 0 auto 24px; line-height: 1.6; }

.pc-cta-banner { padding: 80px 24px; background: linear-gradient(135deg, #052E38 0%, #160D30 100%); text-align: center; border-top: 1px solid var(--border-color); }
.cta-container h2 { font-family: 'Orbitron', sans-serif; font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 700; margin-bottom: 14px; }
.cta-container p { color: var(--text-muted); max-width: 500px; margin: 0 auto 28px; line-height: 1.6; }
.btn-lg { padding: 15px 36px; font-size: 16px; }

.pc-footer { padding: 28px 24px; background: #04070D; border-top: 1px solid var(--border-color); }
.footer-container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; font-size: 13px; color: var(--text-muted); }
.footer-brand { font-family: 'Orbitron', sans-serif; font-weight: 700; color: var(--accent-cyan); }
.footer-link { color: var(--text-muted); text-decoration: none; transition: color 0.2s; }
.footer-link:hover { color: var(--text-main); }

.animate-up { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
.animate-up.in-view { opacity: 1; transform: translateY(0); }
</style>
