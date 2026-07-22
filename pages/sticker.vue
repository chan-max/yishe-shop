<template>
  <div class="sticker-page">
    <header class="st-navbar">
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
          <a href="#features">3M 模切车贴胶</a>
          <a href="#details">防水防刮</a>
          <a href="#products">专属商品</a>
          <NuxtLink to="/design" class="navbar-cta">定制模切贴纸</NuxtLink>
        </nav>
      </div>
    </header>

    <section class="st-hero">
      <div class="hero-container">
        <div class="hero-content animate-up">
          <div class="badge-tag">
            <svg class="tag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            3M 优质 PVC 乙烯基 · 异形精确模切
          </div>

          <h1 class="hero-title">
            个性贴出态度<br>
            <span class="title-highlight">专属异形模切贴纸</span>
          </h1>

          <p class="hero-subtitle">
            精选 3M 防水防晒 PVC 乙烯基材质，高清全彩浮雕胶印。支持任意复杂边缘异形自动模切，撕下无残胶，为笔记本、手账与滑板贴上态度。
          </p>

          <div class="hero-features-list">
            <div class="hero-feature-item">
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>3M 防水防晒 PVC · 撕下零残胶</span>
            </div>
            <div class="hero-feature-item">
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>智能沿边异形模切 (Die-Cut)</span>
            </div>
            <div class="hero-feature-item">
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>哑光膜 / 光膜 / 镭射膜多质感</span>
            </div>
          </div>

          <div class="hero-actions">
            <NuxtLink to="/design" class="btn-pink">
              💥 开始贴纸 POD 定制
            </NuxtLink>
            <a href="#products" class="btn-ghost">查看在售商品 ↓</a>
          </div>
        </div>

        <div class="hero-mockup-wrap animate-up" style="animation-delay: 0.15s">
          <div class="mockup-card">
            <svg class="sticker-svg" viewBox="0 0 320 340" fill="none">
              <!-- Laptop Lid -->
              <rect x="30" y="30" width="260" height="200" rx="16" fill="#18181B" stroke="#09090B" stroke-width="4" />
              <!-- Laptop Hinge & Base line -->
              <rect x="20" y="235" width="280" height="12" rx="4" fill="#3F3F46" stroke="#09090B" stroke-width="3" />

              <!-- Die-cut Stickers on Laptop -->
              <!-- Sticker 1: Star -->
              <g transform="translate(60, 60) rotate(-12)">
                <polygon points="30 5 38 22 55 24 42 37 46 54 30 45 14 54 18 37 5 24 22 22 30 5" fill="#FACC15" stroke="#18181B" stroke-width="3" />
                <text x="30" y="34" font-family="sans-serif" font-size="10" font-weight="900" fill="#18181B" text-anchor="middle">POP!</text>
              </g>
              <!-- Sticker 2: Badge -->
              <g transform="translate(160, 70) rotate(8)">
                <rect x="0" y="0" width="100" height="60" rx="12" fill="#EC4899" stroke="#18181B" stroke-width="3" />
                <text x="50" y="36" font-family="sans-serif" font-size="12" font-weight="900" fill="#FFF" text-anchor="middle">STICKER</text>
              </g>
              <!-- Sticker 3: Circle -->
              <g transform="translate(110, 140) rotate(-5)">
                <circle cx="45" cy="45" r="40" fill="#3B82F6" stroke="#18181B" stroke-width="3" />
                <text x="45" y="50" font-family="sans-serif" font-size="12" font-weight="900" fill="#FFF" text-anchor="middle">YISHE</text>
              </g>
            </svg>
            <div class="mockup-tag tag-top">单张 / 贴纸包 / 散装</div>
            <div class="mockup-tag tag-bottom">白边 / 透明边可选</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Details -->
    <section id="features" class="st-features">
      <div class="section-container">
        <div class="section-header animate-up">
          <span class="section-badge">波普态度</span>
          <h2 class="section-title">品质硬核 · 随时随地贴出花样</h2>
          <p class="section-sub">告别易破纸质贴纸，专业级车贴材料，耐磨防水不留痕。</p>
        </div>

        <div class="features-grid">
          <div class="feature-card animate-up" style="animation-delay: 0.05s">
            <div class="icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
              </svg>
            </div>
            <h3>3M 车贴级 PVC 胶膜</h3>
            <p>具有极强柔韧度与贴合度，曲面亦可服帖粘贴，户外风吹日晒不退色折裂。</p>
          </div>

          <div class="feature-card animate-up" style="animation-delay: 0.12s">
            <div class="icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3>精准智能沿边模切</h3>
            <p>根据上传的图案外轮廓自动生成切割线，保留 2mm 精致白边或透明边。</p>
          </div>

          <div class="feature-card animate-up" style="animation-delay: 0.2s">
            <div class="icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <h3>哑光 / 光面 / 镭射炫彩</h3>
            <p>支持覆哑光膜（质感高级）、覆光膜（防刮防水）或全息镭射膜（光照变色）。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Products -->
    <section id="products" class="st-products">
      <div class="section-container">
        <div class="section-header animate-up">
          <span class="section-badge">专属商品</span>
          <h2 class="section-title">【贴纸】在售款式</h2>
          <p class="section-sub">实时展示分类为「贴纸」的最新已上架商品。</p>
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
              <p class="product-desc">{{ item.description || '3M防水PVC材质，沿边精密模切，撕下无残留胶。' }}</p>
              <div class="product-bottom">
                <span class="product-price">¥{{ item.price || '15.00' }}</span>
                <span class="product-btn">定制此款 →</span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div v-else class="empty-box animate-up">
          <div class="empty-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <h3>暂无【贴纸】分类在售商品</h3>
          <p>管理员可在后台发布分类为「贴纸」的商品。您现在可以直接进入 POD 设计器自定图案！</p>
          <NuxtLink to="/design" class="btn-pink">进入 POD 设计器</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Banner -->
    <section class="st-cta-banner">
      <div class="cta-container animate-up">
        <h2>定制属于你的专属涂鸦贴纸</h2>
        <p>支持批量印刷、单张智能模切与多材质覆膜选择。48小时内发货。</p>
        <NuxtLink to="/design" class="btn-pink btn-lg">立即体验 POD 定制</NuxtLink>
      </div>
    </section>

    <footer class="st-footer">
      <div class="footer-container">
        <span class="footer-brand">衣设 yishe · 贴纸专属介绍页</span>
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
  title: '异形模切贴纸定制 · 3M防水PVC涂鸦贴 · 衣设 yishe',
  ogTitle: '异形模切贴纸定制 · 3M防水PVC涂鸦贴 · 衣设 yishe',
  description: '3M车贴级防水PVC异形模切贴纸定制，支持手账、电脑、滑板涂鸦，撕下零残胶，哑光/光膜/镭射多质感。',
  keywords: '贴纸定制, POD模切贴纸, 涂鸦贴纸, 笔记本贴纸, 异形贴纸印制'
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
    const res = await fetchPublishedProducts({ type: '贴纸', searchText: '贴', pageSize: 20 })
    products.value = res || []
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;900&display=swap');

.sticker-page {
  --bg-deep: #FAFAFA;
  --bg-card: #FFFFFF;
  --accent-pink: #EC4899;
  --accent-yellow: #FACC15;
  --text-main: #18181B;
  --text-muted: #52525B;
  --border-color: #18181B;

  min-height: 100vh;
  background-color: var(--bg-deep);
  color: var(--text-main);
  font-family: 'Space Grotesk', -apple-system, sans-serif;
  position: relative;
  overflow-x: hidden;
}

.st-navbar { position: sticky; top: 0; z-index: 100; background: rgba(250, 250, 250, 0.9); backdrop-filter: blur(20px); border-bottom: 3px solid var(--border-color); padding: 0 24px; }
.navbar-inner { max-width: 1200px; margin: 0 auto; height: 64px; display: flex; align-items: center; justify-content: space-between; }
.navbar-brand { display: flex; align-items: center; gap: 10px; font-weight: 900; font-size: 20px; color: var(--text-main); text-decoration: none; }
.brand-icon { width: 22px; height: 22px; stroke: var(--accent-pink); }
.navbar-links { display: flex; align-items: center; gap: 28px; }
.navbar-links a { color: var(--text-muted); text-decoration: none; font-size: 14px; font-weight: 700; transition: color 0.2s; cursor: pointer; }
.navbar-links a:hover { color: var(--text-main); }
.navbar-cta { background: var(--accent-pink); color: #FFF !important; font-weight: 900; padding: 8px 18px; border-radius: 8px; border: 2px solid var(--border-color); box-shadow: 3px 3px 0 var(--border-color); transition: transform 0.1s !important; }
.navbar-cta:hover { transform: translate(-2px, -2px) !important; box-shadow: 5px 5px 0 var(--border-color) !important; }

.st-hero { position: relative; z-index: 1; padding: 80px 24px; }
.hero-container { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 48px; align-items: center; }
@media (max-width: 900px) { .hero-container { grid-template-columns: 1fr; } }

.badge-tag { display: inline-flex; align-items: center; gap: 8px; background: var(--accent-yellow); border: 2px solid var(--border-color); color: var(--text-main); padding: 6px 14px; border-radius: 8px; font-size: 13px; font-weight: 700; box-shadow: 3px 3px 0 var(--border-color); margin-bottom: 24px; }
.tag-icon { width: 14px; height: 14px; stroke: var(--text-main); }
.hero-title { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 900; line-height: 1.1; margin-bottom: 20px; color: var(--text-main); }
.title-highlight { background: var(--accent-pink); color: #FFF; padding: 2px 8px; display: inline-block; }
.hero-subtitle { font-size: 1.05rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 32px; max-width: 520px; font-weight: 500; }

.hero-features-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 36px; }
.hero-feature-item { display: flex; align-items: center; gap: 10px; font-size: 14px; font-weight: 700; color: var(--text-main); }
.check-icon { width: 16px; height: 16px; stroke: var(--accent-pink); }

.hero-actions { display: flex; flex-wrap: wrap; gap: 14px; }
.btn-pink { display: inline-flex; align-items: center; gap: 8px; background: var(--accent-pink); color: #FFF; font-weight: 900; padding: 13px 28px; border-radius: 10px; border: 3px solid var(--border-color); text-decoration: none; cursor: pointer; box-shadow: 4px 4px 0 var(--border-color); transition: transform 0.1s; }
.btn-pink:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 var(--border-color); }
.btn-ghost { display: inline-flex; align-items: center; padding: 13px 24px; border-radius: 10px; border: 3px solid var(--border-color); color: var(--text-main); text-decoration: none; font-size: 14px; font-weight: 700; cursor: pointer; background: #FFF; box-shadow: 4px 4px 0 var(--border-color); transition: transform 0.1s; }
.btn-ghost:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 var(--border-color); }

.hero-mockup-wrap { display: flex; justify-content: center; }
.mockup-card { position: relative; background: var(--bg-card); border: 3px solid var(--border-color); border-radius: 24px; padding: 36px; display: flex; justify-content: center; align-items: center; box-shadow: 8px 8px 0 var(--border-color); }
.sticker-svg { width: 280px; height: 300px; }
.mockup-tag { position: absolute; background: var(--accent-yellow); border: 2px solid var(--border-color); color: var(--text-main); font-size: 11px; font-weight: 900; padding: 4px 12px; border-radius: 6px; box-shadow: 2px 2px 0 var(--border-color); }
.tag-top { top: 20px; right: 20px; } .tag-bottom { bottom: 20px; left: 20px; }

.st-features { padding: 100px 24px; background: #FFF; border-top: 3px solid var(--border-color); border-bottom: 3px solid var(--border-color); }
.section-container { max-width: 1200px; margin: 0 auto; }
.section-header { text-align: center; margin-bottom: 60px; }
.section-badge { display: inline-block; background: var(--accent-pink); border: 2px solid var(--border-color); color: #FFF; font-size: 11px; font-weight: 900; padding: 4px 14px; border-radius: 6px; box-shadow: 2px 2px 0 var(--border-color); margin-bottom: 14px; letter-spacing: 0.05em; }
.section-title { font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 900; margin-bottom: 12px; }
.section-sub { color: var(--text-muted); font-size: 15px; max-width: 500px; margin: 0 auto; font-weight: 500; }

.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
.feature-card { background: var(--bg-deep); border: 3px solid var(--border-color); border-radius: 20px; padding: 32px; box-shadow: 4px 4px 0 var(--border-color); transition: transform 0.2s; }
.feature-card:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 var(--border-color); }
.icon-box { width: 48px; height: 48px; background: var(--accent-yellow); border: 2px solid var(--border-color); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
.icon-box svg { width: 24px; height: 24px; stroke: var(--text-main); }
.feature-card h3 { font-size: 1.1rem; font-weight: 900; margin-bottom: 10px; }
.feature-card p { color: var(--text-muted); font-size: 14px; line-height: 1.6; font-weight: 500; }

.st-products { padding: 100px 24px; }
.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; }
.product-card { background: var(--bg-card); border: 3px solid var(--border-color); border-radius: 16px; overflow: hidden; text-decoration: none; color: var(--text-main); box-shadow: 4px 4px 0 var(--border-color); transition: transform 0.2s; cursor: pointer; }
.product-card:hover { transform: translate(-3px, -3px); box-shadow: 7px 7px 0 var(--border-color); }
.product-img-box { position: relative; width: 100%; padding-top: 100%; background: #F4F4F5; border-bottom: 3px solid var(--border-color); }
.product-img-box img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.product-cat-tag { position: absolute; top: 12px; left: 12px; background: var(--accent-pink); color: #FFF; font-size: 11px; font-weight: 900; padding: 2px 8px; border-radius: 4px; border: 2px solid var(--border-color); }
.product-details { padding: 18px; }
.product-title { font-size: 15px; font-weight: 900; margin-bottom: 6px; }
.product-desc { font-size: 12px; color: var(--text-muted); line-height: 1.5; margin-bottom: 16px; font-weight: 500; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.product-bottom { display: flex; justify-content: space-between; align-items: center; }
.product-price { font-size: 18px; font-weight: 900; color: var(--accent-pink); }
.product-btn { font-size: 13px; font-weight: 900; color: var(--text-main); }

.product-skeleton { background: var(--bg-card); border-radius: 16px; border: 3px solid var(--border-color); overflow: hidden; }
.sk-img { width: 100%; padding-top: 100%; background: linear-gradient(90deg, #E4E4E7 25%, #F4F4F5 50%, #E4E4E7 75%); background-size: 400% 100%; animation: sk 1.5s infinite; }
.sk-body { padding: 18px; }
.sk-line { height: 12px; border-radius: 6px; background: linear-gradient(90deg, #E4E4E7 25%, #F4F4F5 50%, #E4E4E7 75%); background-size: 400% 100%; animation: sk 1.5s infinite; margin-bottom: 10px; }
.w-80 { width: 80%; } .w-50 { width: 50%; }
@keyframes sk { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

.empty-box { text-align: center; padding: 80px 24px; background: var(--bg-card); border: 3px dashed var(--border-color); border-radius: 24px; }
.empty-icon-wrap { width: 64px; height: 64px; background: var(--accent-yellow); border: 2px solid var(--border-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; box-shadow: 3px 3px 0 var(--border-color); }
.empty-icon-wrap svg { width: 32px; height: 32px; stroke: var(--text-main); }
.empty-box h3 { font-size: 1.2rem; font-weight: 900; margin-bottom: 8px; }
.empty-box p { color: var(--text-muted); font-size: 14px; max-width: 460px; margin: 0 auto 24px; line-height: 1.6; font-weight: 500; }

.st-cta-banner { padding: 80px 24px; background: var(--accent-yellow); border-top: 3px solid var(--border-color); text-align: center; }
.cta-container h2 { font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 900; margin-bottom: 14px; color: var(--text-main); }
.cta-container p { color: var(--text-main); font-weight: 700; max-width: 500px; margin: 0 auto 28px; line-height: 1.6; }
.btn-lg { padding: 15px 36px; font-size: 16px; }

.st-footer { padding: 28px 24px; background: var(--text-main); color: #FFF; border-top: 3px solid var(--border-color); }
.footer-container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; font-size: 13px; font-weight: 700; }
.footer-brand { font-weight: 900; color: var(--accent-yellow); }
.footer-link { color: #FFF; text-decoration: none; transition: color 0.2s; }
.footer-link:hover { color: var(--accent-yellow); }

.animate-up { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
.animate-up.in-view { opacity: 1; transform: translateY(0); }
</style>
