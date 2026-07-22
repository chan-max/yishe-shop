<template>
  <div class="tshirt-page">
    <!-- Ambient Blur Orbs -->
    <div class="ambient-orb orb-primary" />
    <div class="ambient-orb orb-secondary" />

    <!-- Sticky Navbar -->
    <header class="ts-navbar">
      <div class="navbar-inner">
        <NuxtLink to="/" class="navbar-brand">
          <svg class="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10a2 2 0 002 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" />
          </svg>
          <span>衣设 yishe</span>
        </NuxtLink>
        <nav class="navbar-links">
          <a href="#features">面料工艺</a>
          <a href="#gallery">印花灵感</a>
          <a href="#products">专属上架</a>
          <NuxtLink to="/design" class="navbar-cta">定制专属 T恤</NuxtLink>
        </nav>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="ts-hero">
      <div class="hero-container">
        <div class="hero-content animate-up">
          <div class="badge-tag">
            <svg class="tag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            240g 重磅精梳棉 · DTG 数码直喷
          </div>

          <h1 class="hero-title">
            表达你的态度<br>
            <span class="title-gradient">专属纯棉 T恤定制</span>
          </h1>

          <p class="hero-subtitle">
            高密度精梳双纱纯棉，触感细腻亲肤。结合工业级 DTG 喷墨技术，色彩透气不胶糊，经百次洗涤依旧鲜亮如初。
          </p>

          <div class="hero-features-list">
            <div class="hero-feature-item">
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>240g/㎡ 亲肤透气双纱</span>
            </div>
            <div class="hero-feature-item">
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>0 胶感环保活性印染</span>
            </div>
            <div class="hero-feature-item">
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>一件起订 · 48小时发货</span>
            </div>
          </div>

          <div class="hero-actions">
            <NuxtLink to="/design" class="btn-primary">
              进入 POD 设计工具
              <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </NuxtLink>
            <a href="#products" class="btn-secondary">浏览该分类商品 ↓</a>
          </div>
        </div>

        <!-- T-Shirt Interactive SVG Mockup -->
        <div class="hero-mockup-wrap animate-up" style="animation-delay: 0.15s">
          <div class="mockup-card">
            <div class="card-glow" />
            <svg class="tshirt-svg" viewBox="0 0 400 440" fill="none">
              <path d="M120 40 L160 70 Q200 85 240 70 L280 40 L370 110 L315 170 L285 145 V390 H115 V145 L85 170 L30 110 Z" fill="#1E293B" stroke="#475569" stroke-width="3" />
              <path d="M160 70 Q200 85 240 70" stroke="#64748B" stroke-width="3" fill="none" />
              <!-- Mock Printed Graphic Pattern -->
              <rect x="150" y="150" width="100" height="120" rx="12" fill="url(#graphicGradient)" opacity="0.9" />
              <circle cx="200" cy="210" r="30" fill="none" stroke="#6366F1" stroke-width="4" stroke-dasharray="6 6" />
              <text x="200" y="215" font-family="sans-serif" font-size="14" font-weight="bold" fill="#F8FAFC" text-anchor="middle">YOUR ART</text>
              <defs>
                <linearGradient id="graphicGradient" x1="0" y1="0" x2="100" y2="120" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#6366F1" />
                  <stop offset="1" stop-color="#A855F7" />
                </linearGradient>
              </defs>
            </svg>

            <div class="mockup-tag tag-top">DTG 高清印花</div>
            <div class="mockup-tag tag-bottom">领口防变形压条</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="ts-features">
      <div class="section-container">
        <div class="section-header animate-up">
          <span class="section-badge">匠心质感</span>
          <h2 class="section-title">重定义一件优秀 T恤 的标准</h2>
          <p class="section-sub">从纱线挑选到后整工艺，每一处细节皆为穿著体验而生。</p>
        </div>

        <div class="features-grid">
          <div class="feature-card animate-up" style="animation-delay: 0.05s">
            <div class="icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <h3>高重磅精梳纯棉</h3>
            <p>挑选长绒棉经精梳去杂，240g/㎡ 黄金厚度，既有挺括型格，又有天然棉质的柔软呼吸感。</p>
          </div>

          <div class="feature-card animate-up" style="animation-delay: 0.12s">
            <div class="icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3>螺纹领口双针加固</h3>
            <p>高弹防变形螺纹领口，内埋后领通肩压条。即使经历数十次机洗，领口依然平整紧致不上卷。</p>
          </div>

          <div class="feature-card animate-up" style="animation-delay: 0.2s">
            <div class="icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <h3>纳米级直喷色彩</h3>
            <p>采用环保水性墨水，墨滴深层渗入棉纤纤维。印花无硬块感、无异味，透气吸汗不黏身。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Grid Section -->
    <section id="products" class="ts-products">
      <div class="section-container">
        <div class="section-header animate-up">
          <span class="section-badge">专属商品</span>
          <h2 class="section-title">【T恤 / 短袖】在售款式</h2>
          <p class="section-sub">实时同步该分类下的已上架定制商品，点击即可直达专属创作体验。</p>
        </div>

        <div v-if="loading" class="products-grid">
          <div v-for="i in 4" :key="i" class="product-skeleton">
            <div class="sk-img" />
            <div class="sk-body">
              <div class="sk-line w-80" />
              <div class="sk-line w-50" />
            </div>
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
              <p class="product-desc">{{ item.description || '高重磅纯棉，DTG数码直喷，版型挺括舒适。' }}</p>
              <div class="product-bottom">
                <span class="product-price">¥{{ item.price || '99.00' }}</span>
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
          <h3>暂无【T恤】分类在售商品</h3>
          <p>管理员可以在后台商品模块发布分类为「T恤」的商品。您现在可以直接进入 POD 设计器自定图案！</p>
          <NuxtLink to="/design" class="btn-primary">进入 POD 设计器</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Bottom Call To Action Banner -->
    <section class="ts-cta-banner">
      <div class="cta-container animate-up">
        <h2>定制你的第一件专属潮流 T恤</h2>
        <p>支持高清图案上传、文字排版与多色印制。48 小时内完成生产发货。</p>
        <NuxtLink to="/design" class="btn-primary btn-lg">立即体验 POD 定制</NuxtLink>
      </div>
    </section>

    <!-- Footer -->
    <footer class="ts-footer">
      <div class="footer-container">
        <span class="footer-brand">衣设 yishe · T恤专属介绍页</span>
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
  title: '纯棉重磅T恤专属定制 · 数码直喷印花 · 衣设 yishe',
  ogTitle: '纯棉重磅T恤专属定制 · 数码直喷印花 · 衣设 yishe',
  description: '240g精梳纯棉重磅T恤，0胶感DTG数码直喷，领口防变形压条。支持单件起订、一件代发与自由设计。',
  keywords: 'T恤定制, POD短袖, 纯棉T恤, 数码直喷, 自制潮牌, 服饰定制'
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
    const res = await fetchPublishedProducts({ type: 'T恤', searchText: 'T恤', pageSize: 20 })
    products.value = res || []
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@400;500;600;700&display=swap');

.tshirt-page {
  --bg-deep: #090D16;
  --bg-card: #111827;
  --bg-card-hover: #1E293B;
  --accent-primary: #6366F1;
  --accent-purple: #A855F7;
  --text-main: #F8FAFC;
  --text-muted: #94A3B8;
  --border-color: rgba(255, 255, 255, 0.1);

  min-height: 100vh;
  background-color: var(--bg-deep);
  color: var(--text-main);
  font-family: 'Inter', -apple-system, sans-serif;
  position: relative;
  overflow-x: hidden;
}

/* Ambient Orbs */
.ambient-orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(120px);
  pointer-events: none;
  z-index: 0;
}
.orb-primary {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 70%);
  top: -100px; left: -100px;
}
.orb-secondary {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%);
  top: 40%; right: -100px;
}

/* Navbar */
.ts-navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(9, 13, 22, 0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-color);
  padding: 0 24px;
}
.navbar-inner {
  max-width: 1200px;
  margin: 0 auto;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.navbar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: 18px;
  color: var(--text-main);
  text-decoration: none;
}
.brand-icon { width: 22px; height: 22px; stroke: var(--accent-primary); }
.navbar-links { display: flex; align-items: center; gap: 28px; }
.navbar-links a { color: var(--text-muted); text-decoration: none; font-size: 14px; transition: color 0.2s; cursor: pointer; }
.navbar-links a:hover { color: var(--text-main); }
.navbar-cta {
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-purple));
  color: #fff !important;
  font-weight: 600;
  padding: 8px 18px;
  border-radius: 9999px;
  transition: transform 0.2s, box-shadow 0.2s !important;
}
.navbar-cta:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4); }

/* Hero */
.ts-hero { position: relative; z-index: 1; padding: 80px 24px; }
.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 48px;
  align-items: center;
}
@media (max-width: 900px) { .hero-container { grid-template-columns: 1fr; } }

.badge-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(99, 102, 241, 0.15);
  border: 1px solid rgba(99, 102, 241, 0.3);
  color: #818CF8;
  padding: 6px 14px;
  border-radius: 9999px;
  font-size: 13px;
  margin-bottom: 24px;
}
.tag-icon { width: 14px; height: 14px; stroke: #818CF8; }

.hero-title {
  font-family: 'Syne', sans-serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 20px;
}
.title-gradient {
  background: linear-gradient(135deg, #818CF8 0%, #C084FC 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hero-subtitle { font-size: 1.05rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 32px; max-width: 520px; }

.hero-features-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 36px; }
.hero-feature-item { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text-main); }
.check-icon { width: 16px; height: 16px; stroke: var(--accent-primary); }

.hero-actions { display: flex; flex-wrap: wrap; gap: 14px; }
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-purple));
  color: #fff;
  font-weight: 700;
  padding: 13px 28px;
  border-radius: 9999px;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.35);
  transition: transform 0.2s, box-shadow 0.2s;
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(99, 102, 241, 0.5); }
.arrow-icon { width: 16px; height: 16px; }

.btn-secondary {
  display: inline-flex;
  align-items: center;
  padding: 13px 24px;
  border-radius: 9999px;
  border: 1px solid var(--border-color);
  color: var(--text-muted);
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
}
.btn-secondary:hover { color: var(--text-main); border-color: rgba(255,255,255,0.3); }

/* Mockup */
.hero-mockup-wrap { display: flex; justify-content: center; }
.mockup-card {
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
}
.card-glow {
  position: absolute;
  inset: 0;
  border-radius: 24px;
  background: radial-gradient(circle at center, rgba(99,102,241,0.15), transparent 70%);
  pointer-events: none;
}
.tshirt-svg { width: 280px; height: 310px; }
.mockup-tag {
  position: absolute;
  background: rgba(17, 24, 39, 0.9);
  border: 1px solid var(--border-color);
  color: #818CF8;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 9999px;
}
.tag-top { top: 20px; right: 20px; }
.tag-bottom { bottom: 20px; left: 20px; }

/* Features */
.ts-features { padding: 100px 24px; background: rgba(17, 24, 39, 0.5); border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color); }
.section-container { max-width: 1200px; margin: 0 auto; }
.section-header { text-align: center; margin-bottom: 60px; }
.section-badge {
  display: inline-block;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  color: #818CF8;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 14px;
  border-radius: 9999px;
  margin-bottom: 14px;
  letter-spacing: 0.05em;
}
.section-title { font-family: 'Syne', sans-serif; font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 800; margin-bottom: 12px; }
.section-sub { color: var(--text-muted); font-size: 15px; max-width: 500px; margin: 0 auto; }

.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
.feature-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 32px;
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.3s;
}
.feature-card:hover { transform: translateY(-4px); border-color: rgba(99, 102, 241, 0.4); }
.icon-box {
  width: 48px; height: 48px;
  background: rgba(99, 102, 241, 0.15);
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 20px;
}
.icon-box svg { width: 24px; height: 24px; stroke: #818CF8; }
.feature-card h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 10px; }
.feature-card p { color: var(--text-muted); font-size: 14px; line-height: 1.6; }

/* Products */
.ts-products { padding: 100px 24px; }
.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; }
.product-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  color: var(--text-main);
  transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
  cursor: pointer;
}
.product-card:hover { transform: translateY(-6px); border-color: rgba(99,102,241,0.5); box-shadow: 0 16px 40px rgba(0,0,0,0.4); }
.product-img-box { position: relative; width: 100%; padding-top: 100%; background: #0F172A; }
.product-img-box img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.product-cat-tag { position: absolute; top: 12px; left: 12px; background: rgba(99, 102, 241, 0.9); color: #fff; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 6px; }
.product-details { padding: 18px; }
.product-title { font-size: 15px; font-weight: 700; margin-bottom: 6px; }
.product-desc { font-size: 12px; color: var(--text-muted); line-height: 1.5; margin-bottom: 16px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.product-bottom { display: flex; justify-content: space-between; align-items: center; }
.product-price { font-size: 18px; font-weight: 800; color: #818CF8; }
.product-btn { font-size: 13px; color: var(--text-muted); transition: color 0.2s; }
.product-card:hover .product-btn { color: var(--accent-primary); }

/* Skeleton */
.product-skeleton { background: var(--bg-card); border-radius: 16px; border: 1px solid var(--border-color); overflow: hidden; }
.sk-img { width: 100%; padding-top: 100%; background: linear-gradient(90deg, #111827 25%, #1E293B 50%, #111827 75%); background-size: 400% 100%; animation: sk 1.5s infinite; }
.sk-body { padding: 18px; }
.sk-line { height: 12px; border-radius: 6px; background: linear-gradient(90deg, #111827 25%, #1E293B 50%, #111827 75%); background-size: 400% 100%; animation: sk 1.5s infinite; margin-bottom: 10px; }
.w-80 { width: 80%; } .w-50 { width: 50%; }
@keyframes sk { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

/* Empty State */
.empty-box { text-align: center; padding: 80px 24px; background: var(--bg-card); border: 1px dashed var(--border-color); border-radius: 24px; }
.empty-icon-wrap { width: 64px; height: 64px; background: rgba(99, 102, 241, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
.empty-icon-wrap svg { width: 32px; height: 32px; stroke: #818CF8; }
.empty-box h3 { font-size: 1.2rem; font-weight: 700; margin-bottom: 8px; }
.empty-box p { color: var(--text-muted); font-size: 14px; max-width: 460px; margin: 0 auto 24px; line-height: 1.6; }

/* CTA Banner */
.ts-cta-banner { padding: 80px 24px; background: linear-gradient(135deg, #1E1B4B 0%, #311042 100%); text-align: center; border-top: 1px solid var(--border-color); }
.cta-container h2 { font-family: 'Syne', sans-serif; font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 800; margin-bottom: 14px; }
.cta-container p { color: var(--text-muted); max-width: 500px; margin: 0 auto 28px; line-height: 1.6; }
.btn-lg { padding: 15px 36px; font-size: 16px; }

/* Footer */
.ts-footer { padding: 28px 24px; background: #05080E; border-top: 1px solid var(--border-color); }
.footer-container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; font-size: 13px; color: var(--text-muted); }
.footer-brand { font-family: 'Syne', sans-serif; font-weight: 700; color: #818CF8; }
.footer-link { color: var(--text-muted); text-decoration: none; transition: color 0.2s; }
.footer-link:hover { color: var(--text-main); }

/* Animation */
.animate-up { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
.animate-up.in-view { opacity: 1; transform: translateY(0); }
</style>
