<template>
  <div class="apron-page">
    <header class="ap-navbar">
      <div class="navbar-inner">
        <NuxtLink to="/" class="navbar-brand">
          <svg class="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <span>衣设 yishe</span>
        </NuxtLink>
        <nav class="navbar-links">
          <a href="#features">防油防泼水</a>
          <a href="#details">挂脖与调节扣</a>
          <a href="#products">专属商品</a>
          <NuxtLink to="/design" class="navbar-cta">定制围裙</NuxtLink>
        </nav>
      </div>
    </header>

    <section class="ap-hero">
      <div class="hero-container">
        <div class="hero-content animate-up">
          <div class="badge-tag">
            <svg class="tag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            加厚涤棉混纺 · 纳米防泼水防油
          </div>

          <h1 class="hero-title">
            烹饪与生活的温度<br>
            <span class="title-highlight">定制多功能围裙</span>
          </h1>

          <p class="hero-subtitle">
            精选加厚斜纹涤棉混纺，纳米疏水防油污面料。配有大容量双口袋与调节挂脖扣带，为厨房烹饪、咖啡烘焙与花艺创作打造专属职人风范。
          </p>

          <div class="hero-actions">
            <NuxtLink to="/design" class="btn-primary">
              开始围裙 POD 定制
            </NuxtLink>
            <a href="#products" class="btn-secondary">查看在售款式 ↓</a>
          </div>
        </div>

        <div class="hero-mockup-wrap animate-up" style="animation-delay: 0.15s">
          <div class="mockup-card">
            <svg class="apron-svg" viewBox="0 0 300 340" fill="none">
              <!-- Apron Body -->
              <path d="M100 60 C100 60 70 120 60 140 L60 300 L240 300 L240 140 C230 120 200 60 200 60 Z" fill="#2D3748" stroke="#1A202C" stroke-width="3" />
              <!-- Neck Strap -->
              <path d="M120 60 C120 20 180 20 180 60" fill="none" stroke="#D69E2E" stroke-width="6" stroke-linecap="round" />
              <!-- Waist Straps -->
              <path d="M60 160 L20 170" fill="none" stroke="#D69E2E" stroke-width="5" stroke-linecap="round" />
              <path d="M240 160 L280 170" fill="none" stroke="#D69E2E" stroke-width="5" stroke-linecap="round" />
              <!-- Front Pocket -->
              <rect x="90" y="190" width="120" height="80" rx="8" fill="#1A202C" stroke="#D69E2E" stroke-width="2" />
              <!-- Printed Artwork Logo Placeholder -->
              <circle cx="150" cy="115" r="22" fill="#D69E2E" opacity="0.9" />
              <text x="150" y="120" font-family="sans-serif" font-size="10" font-weight="900" fill="#1A202C" text-anchor="middle">CHEF</text>
            </svg>
            <div class="mockup-tag tag-top">纳米疏水防油</div>
            <div class="mockup-tag tag-bottom">双大口袋 · 铜扣可调</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Products -->
    <section id="products" class="ap-products">
      <div class="section-container">
        <div class="section-header animate-up">
          <span class="section-badge">专属商品</span>
          <h2 class="section-title">【围裙】在售款式</h2>
          <p class="section-sub">实时展示分类为「围裙」的最新已上架商品。</p>
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
                <span class="product-price">¥{{ item.price || '58.00' }}</span>
                <span class="product-btn">定制此款 →</span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div v-else class="empty-box animate-up">
          <div class="empty-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
            </svg>
          </div>
          <h3>暂无【围裙】分类在售商品</h3>
          <p>管理员可在后台发布分类为「围裙」的商品。您现在可以直接进入 POD 设计器自定图案！</p>
          <NuxtLink to="/design" class="btn-primary">进入 POD 设计器</NuxtLink>
        </div>
      </div>
    </section>

    <footer class="ap-footer">
      <div class="footer-container">
        <span class="footer-brand">衣设 yishe · 围裙专属介绍页</span>
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
  title: '厨艺烘焙围裙定制 · 加厚防水防油围裙 · 衣设 yishe',
  ogTitle: '厨艺烘焙围裙定制 · 加厚防水防油围裙 · 衣设 yishe',
  description: '加厚斜纹涤棉混纺围裙定制，纳米疏水防油污，大容量双口袋与铜扣调节带，咖啡花艺烘焙首选。',
  keywords: '围裙定制, POD围裙, 咖啡师围裙, 烘焙围裙, 烘焙印花围裙'
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
  }, { threshold: 0.08 })

  document.querySelectorAll('.animate-up').forEach(el => observer.observe(el))

  loading.value = true
  try {
    const res = await fetchPublishedProducts({ type: '围裙', pageSize: 20 })
    products.value = res || []
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@500;700;800&display=swap');

.apron-page {
  --bg-deep: #FAF8F5;
  --bg-card: #FFFFFF;
  --accent-olive: #3F6212;
  --accent-gold: #D69E2E;
  --text-main: #1C1917;
  --text-muted: #78716C;
  --border-color: #E7E5E4;

  min-height: 100vh;
  background-color: var(--bg-deep);
  color: var(--text-main);
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.ap-navbar { position: sticky; top: 0; z-index: 100; background: rgba(250, 248, 245, 0.9); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border-color); padding: 0 24px; }
.navbar-inner { max-width: 1200px; margin: 0 auto; height: 64px; display: flex; align-items: center; justify-content: space-between; }
.navbar-brand { display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 20px; color: var(--text-main); text-decoration: none; }
.brand-icon { width: 22px; height: 22px; stroke: var(--accent-olive); }
.navbar-links { display: flex; align-items: center; gap: 28px; }
.navbar-links a { color: var(--text-muted); text-decoration: none; font-size: 14px; font-weight: 600; }
.navbar-cta { background: var(--accent-olive); color: #FFF !important; font-weight: 700; padding: 8px 18px; border-radius: 8px; }

.ap-hero { padding: 80px 24px; }
.hero-container { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 48px; align-items: center; }
@media (max-width: 900px) { .hero-container { grid-template-columns: 1fr; } }

.badge-tag { display: inline-flex; align-items: center; gap: 8px; background: rgba(63, 98, 18, 0.08); color: var(--accent-olive); padding: 6px 14px; border-radius: 9999px; font-size: 13px; font-weight: 700; margin-bottom: 24px; }
.tag-icon { width: 14px; height: 14px; stroke: var(--accent-olive); }
.hero-title { font-family: 'Lora', serif; font-size: clamp(2.4rem, 4.5vw, 3.8rem); font-weight: 700; line-height: 1.25; margin-bottom: 20px; }
.title-highlight { color: var(--accent-olive); font-style: italic; }
.hero-subtitle { font-size: 1.05rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 32px; max-width: 520px; }

.hero-actions { display: flex; gap: 14px; }
.btn-primary { background: var(--accent-olive); color: #FFF; font-weight: 700; padding: 13px 28px; border-radius: 10px; text-decoration: none; }
.btn-secondary { padding: 13px 24px; border-radius: 10px; border: 1px solid var(--border-color); color: var(--text-main); text-decoration: none; font-size: 14px; font-weight: 600; background: #FFF; }

.mockup-card { position: relative; background: #FFF; border: 1px solid var(--border-color); border-radius: 24px; padding: 36px; display: flex; justify-content: center; align-items: center; box-shadow: 0 20px 40px rgba(0,0,0,0.04); }
.apron-svg { width: 260px; height: 280px; }
.mockup-tag { position: absolute; background: #FFF; border: 1px solid var(--border-color); color: var(--text-main); font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 9999px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
.tag-top { top: 20px; right: 20px; } .tag-bottom { bottom: 20px; left: 20px; }

.ap-products { padding: 80px 24px; }
.section-container { max-width: 1200px; margin: 0 auto; }
.section-header { text-align: center; margin-bottom: 48px; }
.section-badge { display: inline-block; color: var(--accent-olive); font-size: 11px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px; }
.section-title { font-family: 'Lora', serif; font-size: 2rem; font-weight: 700; margin-bottom: 8px; }
.section-sub { color: var(--text-muted); font-size: 14px; }

.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; }
.product-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; overflow: hidden; text-decoration: none; color: var(--text-main); transition: transform 0.2s, box-shadow 0.2s; }
.product-card:hover { transform: translateY(-4px); box-shadow: 0 16px 30px rgba(0,0,0,0.06); }
.product-img-box { position: relative; width: 100%; padding-top: 100%; background: #F5F5F4; }
.product-img-box img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.product-cat-tag { position: absolute; top: 12px; left: 12px; background: rgba(0,0,0,0.7); color: #FFF; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; }
.product-details { padding: 18px; }
.product-title { font-size: 15px; font-weight: 700; margin-bottom: 6px; }
.product-desc { font-size: 12px; color: var(--text-muted); line-height: 1.5; margin-bottom: 16px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.product-bottom { display: flex; justify-content: space-between; align-items: center; }
.product-price { font-size: 18px; font-weight: 800; color: var(--accent-olive); }
.product-btn { font-size: 13px; font-weight: 700; color: var(--text-main); }

.empty-box { text-align: center; padding: 60px 24px; background: var(--bg-card); border: 1px dashed var(--border-color); border-radius: 20px; }
.empty-icon-wrap { width: 56px; height: 56px; background: rgba(63, 98, 18, 0.08); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
.empty-icon-wrap svg { width: 28px; height: 28px; stroke: var(--accent-olive); }
.empty-box h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 8px; }
.empty-box p { color: var(--text-muted); font-size: 14px; max-width: 440px; margin: 0 auto 20px; }

.ap-footer { padding: 28px 24px; background: #FFF; border-top: 1px solid var(--border-color); }
.footer-container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; font-size: 13px; color: var(--text-muted); }
.footer-brand { font-weight: 700; color: var(--text-main); }
.footer-link { color: var(--accent-olive); text-decoration: none; font-weight: 600; }

.animate-up { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
.animate-up.in-view { opacity: 1; transform: translateY(0); }
</style>
