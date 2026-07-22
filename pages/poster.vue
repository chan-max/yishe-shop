<template>
  <div class="poster-page">
    <header class="ps-navbar">
      <div class="navbar-inner">
        <NuxtLink to="/" class="navbar-brand">
          <svg class="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span>衣设 yishe</span>
        </NuxtLink>
        <nav class="navbar-links">
          <a href="#features">博物馆级微喷</a>
          <a href="#details">艺术纸张材质</a>
          <a href="#products">专属商品</a>
          <NuxtLink to="/design" class="navbar-cta">定制艺术海报</NuxtLink>
        </nav>
      </div>
    </header>

    <section class="ps-hero">
      <div class="hero-container">
        <div class="hero-content animate-up">
          <div class="badge-tag">
            <svg class="tag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            230g 德国艺术微喷纸 · 博物馆级色彩重现
          </div>

          <h1 class="hero-title">
            把画廊搬进生活空间<br>
            <span class="title-gradient">专属微喷艺术海报挂画</span>
          </h1>

          <p class="hero-subtitle">
            挑选 230g 德国无酸棉质艺术微喷纸与油画布底，12 色原装水性颜料墨水微喷，细节层次富丽，长久保存无褪色。
          </p>

          <div class="hero-features-list">
            <div class="hero-feature-item">
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>12色艺术微喷 · 99.8% 广色域复刻</span>
            </div>
            <div class="hero-feature-item">
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>无酸纯棉哑光纸质 · 百年避光不褪色</span>
            </div>
            <div class="hero-feature-item">
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>可选带实木内框 / 卷轴筒装直发</span>
            </div>
          </div>

          <div class="hero-actions">
            <NuxtLink to="/design" class="btn-gallery">
              🖼️ 开始海报 POD 定制
            </NuxtLink>
            <a href="#products" class="btn-ghost">查看在售商品 ↓</a>
          </div>
        </div>

        <div class="hero-mockup-wrap animate-up" style="animation-delay: 0.15s">
          <div class="mockup-card">
            <svg class="poster-svg" viewBox="0 0 300 400" fill="none">
              <!-- Frame Shadow & Border -->
              <rect x="30" y="20" width="240" height="340" fill="#1C1917" stroke="#A16207" stroke-width="3" />
              <!-- Mat Board / Passepartout -->
              <rect x="50" y="40" width="200" height="300" fill="#FAFAF9" stroke="#E8ECF0" stroke-width="2" />
              <!-- Art Image -->
              <rect x="70" y="60" width="160" height="240" fill="url(#artGrad)" />
              <circle cx="150" cy="180" r="35" fill="none" stroke="#FAFAF9" stroke-width="3" />
              <text x="150" y="185" font-family="serif" font-size="14" font-weight="bold" fill="#FAFAF9" text-anchor="middle">ART GALLERY</text>
              <defs>
                <linearGradient id="artGrad" x1="0" y1="0" x2="160" y2="240" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#1C1917" />
                  <stop offset="0.5" stop-color="#44403C" />
                  <stop offset="1" stop-color="#A16207" />
                </linearGradient>
              </defs>
            </svg>
            <div class="mockup-tag tag-top">30×40cm ~ 70×100cm 多尺寸</div>
            <div class="mockup-tag tag-bottom">无酸环保颜料无异味</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="ps-features">
      <div class="section-container">
        <div class="section-header animate-up">
          <span class="section-badge">画廊品质</span>
          <h2 class="section-title">收藏级品质 · 点亮生活空间</h2>
          <p class="section-sub">精选无酸微喷技术，还原艺术摄影与插画作品的原始韵味。</p>
        </div>

        <div class="features-grid">
          <div class="feature-card animate-up" style="animation-delay: 0.05s">
            <div class="icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
              </svg>
            </div>
            <h3>12 色艺术微喷技术</h3>
            <p>超越常规四色打印，色彩过渡顺滑无网点感，深色区域醇厚有深度。</p>
          </div>

          <div class="feature-card animate-up" style="animation-delay: 0.12s">
            <div class="icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3>德国无酸全棉艺术纸</h3>
            <p>230g 重磅纸质，表面呈细腻哑光纹理，不反光、不吸潮发黄。</p>
          </div>

          <div class="feature-card animate-up" style="animation-delay: 0.2s">
            <div class="icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              </svg>
            </div>
            <h3>硬核防压卷轴防护包装</h3>
            <p>采用加厚抗压珍珠棉+加厚纸筒多重保护包装，运输过程零打折损坏。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Products -->
    <section id="products" class="ps-products">
      <div class="section-container">
        <div class="section-header animate-up">
          <span class="section-badge">专属商品</span>
          <h2 class="section-title">【海报 / 挂画】在售款式</h2>
          <p class="section-sub">实时展示分类为「海报」的最新在售商品。</p>
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
              <p class="product-desc">{{ item.description || '230g德国艺术微喷纸，12色原装墨水，画廊收藏级复刻。' }}</p>
              <div class="product-bottom">
                <span class="product-price">¥{{ item.price || '39.00' }}</span>
                <span class="product-btn">定制此款 →</span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div v-else class="empty-box animate-up">
          <div class="empty-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
            </svg>
          </div>
          <h3>暂无【海报】分类在售商品</h3>
          <p>管理员可在后台发布分类为「海报」的商品。您现在可以直接进入 POD 设计器自定图案！</p>
          <NuxtLink to="/design" class="btn-gallery">进入 POD 设计器</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Banner -->
    <section class="ps-cta-banner">
      <div class="cta-container animate-up">
        <h2>定制你的第一幅艺术海报挂画</h2>
        <p>支持摄影高清上传、插画尺寸排版与一件起订。48小时内高精打印发货。</p>
        <NuxtLink to="/design" class="btn-gallery btn-lg">立即体验 POD 定制</NuxtLink>
      </div>
    </section>

    <footer class="ps-footer">
      <div class="footer-container">
        <span class="footer-brand">衣设 yishe · 海报专属介绍页</span>
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
  title: '艺术海报装饰画定制 · 德国微喷无酸纸 · 衣设 yishe',
  ogTitle: '艺术海报装饰画定制 · 德国微喷无酸纸 · 衣设 yishe',
  description: '230g德国无酸纯棉艺术纸海报挂画定制，12色原装墨水艺术微喷，画廊收藏级全彩复刻，单张起订。',
  keywords: '海报定制, POD挂画, 艺术微喷, 装饰画印制, 摄影海报'
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
    const res = await fetchPublishedProducts({ type: '海报', searchText: '画', pageSize: 20 })
    products.value = res || []
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,700;1,700&family=Jost:wght@400;500;600;700&display=swap');

.poster-page {
  --bg-deep: #FAFAF9;
  --bg-card: #FFFFFF;
  --accent-gold: #A16207;
  --text-main: #1C1917;
  --text-muted: #64748B;
  --border-color: #D6D3D1;

  min-height: 100vh;
  background-color: var(--bg-deep);
  color: var(--text-main);
  font-family: 'Jost', -apple-system, sans-serif;
  position: relative;
  overflow-x: hidden;
}

.ps-navbar { position: sticky; top: 0; z-index: 100; background: rgba(250, 250, 249, 0.85); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border-color); padding: 0 24px; }
.navbar-inner { max-width: 1200px; margin: 0 auto; height: 64px; display: flex; align-items: center; justify-content: space-between; }
.navbar-brand { display: flex; align-items: center; gap: 10px; font-family: 'Bodoni Moda', serif; font-weight: 700; font-size: 20px; color: var(--text-main); text-decoration: none; }
.brand-icon { width: 22px; height: 22px; stroke: var(--accent-gold); }
.navbar-links { display: flex; align-items: center; gap: 28px; }
.navbar-links a { color: var(--text-muted); text-decoration: none; font-size: 14px; transition: color 0.2s; cursor: pointer; }
.navbar-links a:hover { color: var(--text-main); }
.navbar-cta { background: var(--text-main); color: #FFF !important; font-weight: 600; padding: 8px 18px; border-radius: 9999px; transition: transform 0.2s, box-shadow 0.2s !important; }
.navbar-cta:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(28, 25, 23, 0.3); }

.ps-hero { position: relative; z-index: 1; padding: 80px 24px; }
.hero-container { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 48px; align-items: center; }
@media (max-width: 900px) { .hero-container { grid-template-columns: 1fr; } }

.badge-tag { display: inline-flex; align-items: center; gap: 8px; background: rgba(161, 98, 7, 0.1); border: 1px solid rgba(161, 98, 7, 0.3); color: var(--accent-gold); padding: 6px 14px; border-radius: 9999px; font-size: 13px; margin-bottom: 24px; }
.tag-icon { width: 14px; height: 14px; stroke: var(--accent-gold); }
.hero-title { font-family: 'Bodoni Moda', serif; font-size: clamp(2.4rem, 4.8vw, 3.8rem); font-weight: 700; line-height: 1.15; margin-bottom: 20px; color: var(--text-main); }
.title-gradient { color: var(--accent-gold); }
.hero-subtitle { font-size: 1.05rem; color: var(--text-muted); line-height: 1.75; margin-bottom: 32px; max-width: 520px; }

.hero-features-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 36px; }
.hero-feature-item { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text-main); }
.check-icon { width: 16px; height: 16px; stroke: var(--accent-gold); }

.hero-actions { display: flex; flex-wrap: wrap; gap: 14px; }
.btn-gallery { display: inline-flex; align-items: center; gap: 8px; background: var(--text-main); color: #FFF; font-weight: 600; padding: 13px 28px; border-radius: 9999px; text-decoration: none; cursor: pointer; box-shadow: 0 4px 20px rgba(28, 25, 23, 0.25); transition: transform 0.2s, box-shadow 0.2s; }
.btn-gallery:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(28, 25, 23, 0.4); }
.btn-ghost { display: inline-flex; align-items: center; padding: 13px 24px; border-radius: 9999px; border: 1px solid var(--border-color); color: var(--text-muted); text-decoration: none; font-size: 14px; cursor: pointer; transition: color 0.2s, border-color 0.2s; }
.btn-ghost:hover { color: var(--text-main); border-color: var(--text-main); }

.hero-mockup-wrap { display: flex; justify-content: center; }
.mockup-card { position: relative; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 24px; padding: 36px; display: flex; justify-content: center; align-items: center; box-shadow: 0 16px 40px rgba(28, 25, 23, 0.08); }
.poster-svg { width: 240px; height: 320px; }
.mockup-tag { position: absolute; background: rgba(250, 250, 249, 0.95); border: 1px solid var(--border-color); color: var(--text-main); font-size: 11px; font-weight: 600; padding: 4px 12px; border-radius: 9999px; }
.tag-top { top: 20px; right: 20px; } .tag-bottom { bottom: 20px; left: 20px; }

.ps-features { padding: 100px 24px; background: #EFECE6; border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color); }
.section-container { max-width: 1200px; margin: 0 auto; }
.section-header { text-align: center; margin-bottom: 60px; }
.section-badge { display: inline-block; background: rgba(161, 98, 7, 0.1); border: 1px solid rgba(161, 98, 7, 0.3); color: var(--accent-gold); font-size: 11px; font-weight: 700; padding: 4px 14px; border-radius: 9999px; margin-bottom: 14px; letter-spacing: 0.05em; }
.section-title { font-family: 'Bodoni Moda', serif; font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 700; margin-bottom: 12px; }
.section-sub { color: var(--text-muted); font-size: 15px; max-width: 500px; margin: 0 auto; }

.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
.feature-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 20px; padding: 32px; transition: transform 0.3s, border-color 0.3s; }
.feature-card:hover { transform: translateY(-4px); border-color: var(--text-main); }
.icon-box { width: 48px; height: 48px; background: rgba(28, 25, 23, 0.08); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
.icon-box svg { width: 24px; height: 24px; stroke: var(--text-main); }
.feature-card h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 10px; }
.feature-card p { color: var(--text-muted); font-size: 14px; line-height: 1.65; }

.ps-products { padding: 100px 24px; }
.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; }
.product-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; overflow: hidden; text-decoration: none; color: var(--text-main); transition: transform 0.3s, border-color 0.3s; cursor: pointer; }
.product-card:hover { transform: translateY(-6px); border-color: var(--text-main); box-shadow: 0 16px 40px rgba(0,0,0,0.06); }
.product-img-box { position: relative; width: 100%; padding-top: 100%; background: #EFECE6; }
.product-img-box img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.product-cat-tag { position: absolute; top: 12px; left: 12px; background: var(--text-main); color: #FFF; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 6px; }
.product-details { padding: 18px; }
.product-title { font-size: 15px; font-weight: 700; margin-bottom: 6px; }
.product-desc { font-size: 12px; color: var(--text-muted); line-height: 1.5; margin-bottom: 16px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.product-bottom { display: flex; justify-content: space-between; align-items: center; }
.product-price { font-size: 18px; font-weight: 800; color: var(--accent-gold); }
.product-btn { font-size: 13px; color: var(--text-muted); transition: color 0.2s; }
.product-card:hover .product-btn { color: var(--text-main); }

.product-skeleton { background: var(--bg-card); border-radius: 16px; border: 1px solid var(--border-color); overflow: hidden; }
.sk-img { width: 100%; padding-top: 100%; background: linear-gradient(90deg, #EFECE6 25%, #E2DDD4 50%, #EFECE6 75%); background-size: 400% 100%; animation: sk 1.5s infinite; }
.sk-body { padding: 18px; }
.sk-line { height: 12px; border-radius: 6px; background: linear-gradient(90deg, #EFECE6 25%, #E2DDD4 50%, #EFECE6 75%); background-size: 400% 100%; animation: sk 1.5s infinite; margin-bottom: 10px; }
.w-80 { width: 80%; } .w-50 { width: 50%; }
@keyframes sk { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

.empty-box { text-align: center; padding: 80px 24px; background: var(--bg-card); border: 1px dashed var(--border-color); border-radius: 24px; }
.empty-icon-wrap { width: 64px; height: 64px; background: rgba(28, 25, 23, 0.08); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
.empty-icon-wrap svg { width: 32px; height: 32px; stroke: var(--text-main); }
.empty-box h3 { font-size: 1.2rem; font-weight: 700; margin-bottom: 8px; }
.empty-box p { color: var(--text-muted); font-size: 14px; max-width: 460px; margin: 0 auto 24px; line-height: 1.6; }

.ps-cta-banner { padding: 80px 24px; background: #1C1917; color: #FAFAF9; text-align: center; }
.cta-container h2 { font-family: 'Bodoni Moda', serif; font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 700; margin-bottom: 14px; }
.cta-container p { color: #A16207; max-width: 500px; margin: 0 auto 28px; line-height: 1.6; }
.btn-lg { padding: 15px 36px; font-size: 16px; }

.ps-footer { padding: 28px 24px; background: #0C0A09; color: #A16207; border-top: 1px solid rgba(255,255,255,0.1); }
.footer-container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; font-size: 13px; }
.footer-brand { font-family: 'Bodoni Moda', serif; font-weight: 700; color: #FFF; }
.footer-link { color: #A16207; text-decoration: none; transition: color 0.2s; }
.footer-link:hover { color: #FFF; }

.animate-up { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
.animate-up.in-view { opacity: 1; transform: translateY(0); }
</style>
