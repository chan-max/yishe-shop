<template>
  <div class="sf-page">
    <!-- ── Ambient Background Orbs ── -->
    <div class="ambient-orb orb-1" />
    <div class="ambient-orb orb-2" />
    <div class="ambient-orb orb-3" />

    <!-- ── Sticky Navbar ── -->
    <header class="sf-navbar">
      <div class="navbar-inner">
        <NuxtLink to="/" class="navbar-brand">
          <span class="brand-dot">●</span>
          <span>衣设 yishe</span>
        </NuxtLink>
        <nav class="navbar-links">
          <a href="#features">特色工艺</a>
          <a href="#products">专属商品</a>
          <NuxtLink to="/design" class="navbar-cta">定制春联</NuxtLink>
        </nav>
      </div>
    </header>

    <!-- ── Hero Section ── -->
    <section class="sf-hero">
      <div class="hero-inner">
        <!-- Left: Text content -->
        <div class="hero-text animate-up">
          <div class="eyebrow-pill">
            <span class="pill-dot" />
            乙巳年新春专属 · 名家墨宝金墨定制
          </div>

          <h1 class="hero-title">
            <span class="title-line">门楣生辉</span>
            <span class="title-line gradient-gold">专属手书春联</span>
          </h1>

          <p class="hero-desc">
            千年书法气象，遇见现代高保真烫金印花科技。专为家庭门楣、企业展台、节庆礼品量身定制，字字遒劲，岁岁流传。
          </p>

          <div class="hero-stats">
            <div class="stat">
              <span class="stat-num">12+</span>
              <span class="stat-label">名家字体库</span>
            </div>
            <div class="stat-divider" />
            <div class="stat">
              <span class="stat-num">100%</span>
              <span class="stat-label">防水防晒面料</span>
            </div>
            <div class="stat-divider" />
            <div class="stat">
              <span class="stat-num">48h</span>
              <span class="stat-label">极速印制发货</span>
            </div>
          </div>

          <div class="hero-actions">
            <NuxtLink to="/design" class="btn-primary">
              ✨ 开始设计专属春联
            </NuxtLink>
            <a href="#products" class="btn-ghost">浏览分类商品 ↓</a>
          </div>
        </div>

        <!-- Right: Couplet Visual -->
        <div class="hero-visual animate-up" style="animation-delay: 0.15s">
          <div class="couplet-stage">
            <div class="stage-glow" />

            <!-- 横批 -->
            <div class="batch-scroll">
              <div class="scroll-content batch-content">
                <span class="scroll-text horizontal">吉 星 高 照</span>
              </div>
            </div>

            <!-- 对联主体 -->
            <div class="couplets-row">
              <div class="single-scroll">
                <div class="scroll-content">
                  <span class="scroll-text vertical">迎 春 接 福 禧 盈 门</span>
                </div>
                <div class="scroll-tab" />
              </div>

              <!-- 福字 -->
              <div class="fu-center">
                <div class="fu-diamond">
                  <span class="fu-char">福</span>
                </div>
                <div class="fu-label">斗方大福</div>
              </div>

              <div class="single-scroll">
                <div class="scroll-content">
                  <span class="scroll-text vertical">贺 岁 纳 财 吉 祥 到</span>
                </div>
                <div class="scroll-tab" />
              </div>
            </div>

            <!-- 装饰小元素 -->
            <div class="deco-tag deco-top-left">万年红云锦</div>
            <div class="deco-tag deco-bottom-right">烫金工艺</div>
          </div>
        </div>
      </div>

      <!-- Bottom wave divider -->
      <div class="hero-wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,10 1440,40 L1440,80 L0,80 Z" fill="#0d0604"/>
        </svg>
      </div>
    </section>

    <!-- ── Features Section ── -->
    <section id="features" class="sf-features">
      <div class="section-container">
        <div class="section-header animate-up">
          <div class="section-tag">工艺解说</div>
          <h2 class="section-title">三重匠心工艺<br><span class="gradient-gold">历久弥新</span></h2>
          <p class="section-desc">每一副春联，都承载着千年书法底蕴与现代印花精工的完美结合。</p>
        </div>

        <div class="features-grid">
          <div class="feature-card animate-up" style="animation-delay: 0.05s">
            <div class="feature-icon-wrap">
              <span class="feature-icon">🖌️</span>
            </div>
            <h3 class="feature-title">名家集字手书库</h3>
            <p class="feature-desc">收录颜、柳、欧、赵四大楷书，兼备行草篆隶。字字经名家精心校订，气韵生动，风骨天然。</p>
          </div>
          <div class="feature-card animate-up" style="animation-delay: 0.12s">
            <div class="feature-icon-wrap">
              <span class="feature-icon">📜</span>
            </div>
            <h3 class="feature-title">洒金万年红云锦</h3>
            <p class="feature-desc">特级加厚万年红真丝云锦底料，经防晒防水工艺处理，户外风吹日晒三年不褪色、不上翘。</p>
          </div>
          <div class="feature-card animate-up" style="animation-delay: 0.2s">
            <div class="feature-icon-wrap">
              <span class="feature-icon">📦</span>
            </div>
            <h3 class="feature-title">尊贵礼盒全套装</h3>
            <p class="feature-desc">含门幅双联、横批横轴、斗方大福字及无痕背胶贴条。专属烫金礼盒包装，送礼自用皆相宜。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Products Section ── -->
    <section id="products" class="sf-products">
      <div class="section-container">
        <div class="section-header animate-up">
          <div class="section-tag">精选商品</div>
          <h2 class="section-title">【春联】分类<span class="gradient-gold">上架商品</span></h2>
          <p class="section-desc">实时抓取商品库中「春联/年货」分类下的专属上架款式，点击即可直达专属定制。</p>
        </div>

        <!-- Loading skeletons -->
        <div v-if="loading" class="products-grid">
          <div v-for="i in 4" :key="i" class="product-skeleton">
            <div class="skeleton-img" />
            <div class="skeleton-body">
              <div class="skeleton-line long" />
              <div class="skeleton-line short" />
              <div class="skeleton-line medium" />
            </div>
          </div>
        </div>

        <!-- Product grid -->
        <div v-else-if="products.length > 0" class="products-grid">
          <NuxtLink
            v-for="(item, i) in products"
            :key="item.id"
            :to="`/product/${item.id}`"
            class="product-card animate-up"
            :style="`animation-delay: ${i * 0.07}s`"
          >
            <div class="product-img-wrap">
              <img :src="item.imageUrl || ''" :alt="item.title" loading="lazy" />
              <div class="img-overlay" />
              <span class="product-tag">{{ item.category }}</span>
            </div>
            <div class="product-info">
              <h4 class="product-name">{{ item.title }}</h4>
              <p class="product-desc">{{ item.description || '高保真烫金印花，字迹遒劲，历久弥新。' }}</p>
              <div class="product-footer">
                <span v-if="item.price" class="product-price">¥{{ item.price }}</span>
                <span class="product-cta">定制此款 →</span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Empty state -->
        <div v-else class="empty-state animate-up">
          <div class="empty-icon">🧧</div>
          <h3 class="empty-title">暂无【春联】分类商品上架</h3>
          <p class="empty-desc">管理员可在后台【商品模块】发布分类为「春联」的商品。你也可以直接在 POD 设计工具上自由创作！</p>
          <NuxtLink to="/design" class="btn-primary">进入 POD 设计工具</NuxtLink>
        </div>
      </div>
    </section>

    <!-- ── CTA Banner ── -->
    <section class="sf-cta-banner">
      <div class="cta-inner animate-up">
        <h2 class="cta-title">🧧 让这个新年，更有你的温度</h2>
        <p class="cta-desc">专属春联，一次定制，岁岁皆宜。现在开始设计，48小时内精工完成发货。</p>
        <NuxtLink to="/design" class="btn-primary btn-large">立即开始定制</NuxtLink>
      </div>
    </section>

    <!-- ── Footer ── -->
    <footer class="sf-footer">
      <div class="footer-inner">
        <NuxtLink to="/" class="footer-brand">衣设 yishe</NuxtLink>
        <p class="footer-copy">© 2026 乙巳年春联专属介绍落地页 · 衣设 yishe 版权所有</p>
        <NuxtLink to="/" class="footer-back">← 返回主站</NuxtLink>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePublishedProducts, type StorefrontPublishedProduct } from '~/composables/use-published-products'

definePageMeta({ layout: false })

useSeoMeta({
  title: '乙巳年新春专属手书春联定制 · 衣设 yishe',
  ogTitle: '乙巳年新春专属手书春联定制 · 衣设 yishe',
  description: '名家墨宝与现代高保真烫金印花科技结合，专为家庭门楣、企业礼品量身定制的专属春联落地页。',
})

const { fetchPublishedProducts } = usePublishedProducts()
const loading = ref(true)
const products = ref<StorefrontPublishedProduct[]>([])

onMounted(async () => {
  // Scroll animations
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
    const res = await fetchPublishedProducts({ type: '春联', searchText: '春联', pageSize: 20 })
    products.value = res || []
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* ── Google Font ── */
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700;900&display=swap');

/* ── CSS Variables ── */
.sf-page {
  --bg-deep: #080301;
  --bg-card: #120805;
  --bg-feature: #0d0604;
  --accent-red: #C0392B;
  --accent-red-light: #E74C3C;
  --accent-gold: #D4AF37;
  --accent-gold-light: #F7D070;
  --text-primary: #F5EDD8;
  --text-muted: #A08060;
  --text-dim: #604030;
  --border-gold: rgba(212, 175, 55, 0.25);
  --border-red: rgba(192, 57, 43, 0.3);
  
  position: relative;
  min-height: 100vh;
  background-color: var(--bg-deep);
  color: var(--text-primary);
  font-family: -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif;
  overflow-x: hidden;
}

/* ── Ambient Orbs ── */
.ambient-orb {
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  filter: blur(100px);
}
.orb-1 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(192,57,43,0.35) 0%, transparent 70%);
  top: -100px; left: -150px;
}
.orb-2 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 70%);
  top: 30%; right: -100px;
}
.orb-3 {
  width: 350px; height: 350px;
  background: radial-gradient(circle, rgba(192,57,43,0.2) 0%, transparent 70%);
  bottom: 0; left: 30%;
}

/* ── Navbar ── */
.sf-navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 0 24px;
  background: rgba(8, 3, 1, 0.85);
  backdrop-filter: blur(20px) saturate(1.8);
  border-bottom: 1px solid var(--border-gold);
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
  gap: 8px;
  font-size: 18px;
  font-weight: 800;
  color: var(--accent-gold-light);
  text-decoration: none;
  font-family: 'Noto Serif SC', serif;
}
.brand-dot { font-size: 10px; color: var(--accent-red); }
.navbar-links {
  display: flex;
  align-items: center;
  gap: 28px;
}
.navbar-links a {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}
.navbar-links a:hover { color: var(--accent-gold-light); }
.navbar-cta {
  background: linear-gradient(135deg, var(--accent-red) 0%, #8B0000 100%);
  color: var(--accent-gold-light) !important;
  font-weight: 700;
  padding: 8px 20px;
  border-radius: 9999px;
  border: 1px solid var(--border-gold);
  transition: transform 0.2s, box-shadow 0.2s !important;
}
.navbar-cta:hover {
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 16px rgba(192,57,43,0.5) !important;
  color: var(--accent-gold-light) !important;
}

/* ── Hero ── */
.sf-hero {
  position: relative;
  z-index: 1;
  padding: 80px 24px 0;
  overflow: hidden;
}
.hero-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  padding-bottom: 100px;
}
@media (max-width: 900px) {
  .hero-inner { grid-template-columns: 1fr; gap: 40px; }
}

.eyebrow-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(212, 175, 55, 0.12);
  border: 1px solid var(--border-gold);
  color: var(--accent-gold-light);
  padding: 6px 16px;
  border-radius: 9999px;
  font-size: 13px;
  margin-bottom: 24px;
}
.pill-dot {
  width: 6px; height: 6px;
  background: var(--accent-gold);
  border-radius: 50%;
  display: inline-block;
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

.hero-title {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(2.8rem, 5vw, 4.2rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: 0.04em;
  margin-bottom: 20px;
}
.title-line { display: block; }
.gradient-gold {
  background: linear-gradient(135deg, var(--accent-gold-light) 0%, var(--accent-gold) 50%, #B8860B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-desc {
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--text-muted);
  margin-bottom: 36px;
  max-width: 480px;
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 36px;
}
.stat { text-align: center; }
.stat-num {
  display: block;
  font-size: 1.6rem;
  font-weight: 900;
  color: var(--accent-gold-light);
  font-family: 'Noto Serif SC', serif;
}
.stat-label {
  display: block;
  font-size: 12px;
  color: var(--text-dim);
  margin-top: 2px;
}
.stat-divider {
  width: 1px;
  height: 36px;
  background: var(--border-gold);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

/* ── Couplet Visual ── */
.hero-visual { position: relative; }
.couplet-stage {
  position: relative;
  background: rgba(18, 8, 5, 0.8);
  border: 1px solid var(--border-gold);
  border-radius: 20px;
  padding: 36px 28px;
  backdrop-filter: blur(12px);
}
.stage-glow {
  position: absolute;
  inset: 0;
  border-radius: 20px;
  background: radial-gradient(ellipse at center, rgba(192,57,43,0.15) 0%, transparent 70%);
  pointer-events: none;
}

.batch-scroll {
  margin-bottom: 24px;
}
.scroll-content {
  background: linear-gradient(135deg, #8B0000 0%, #5A0000 100%);
  border: 1px solid var(--accent-gold);
  border-radius: 8px;
  padding: 12px 24px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(212,175,55,0.2);
}
.batch-content {
  text-align: center;
}
.scroll-text {
  font-family: 'Noto Serif SC', serif;
  color: var(--accent-gold-light);
  font-weight: 700;
  text-shadow: 0 1px 4px rgba(0,0,0,0.5);
}
.scroll-text.horizontal {
  font-size: 22px;
  letter-spacing: 12px;
}
.scroll-text.vertical {
  writing-mode: vertical-rl;
  font-size: 18px;
  letter-spacing: 6px;
  line-height: 1.4;
}

.couplets-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}
.single-scroll {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.scroll-tab {
  width: 32px;
  height: 8px;
  background: var(--accent-gold);
  border-radius: 4px;
  opacity: 0.6;
}

.fu-center { text-align: center; }
.fu-diamond {
  width: 64px; height: 64px;
  background: linear-gradient(135deg, var(--accent-red) 0%, #8B0000 100%);
  border: 2px solid var(--accent-gold);
  border-radius: 8px;
  transform: rotate(45deg);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 8px;
  box-shadow: 0 4px 20px rgba(192,57,43,0.4);
}
.fu-char {
  font-family: 'Noto Serif SC', serif;
  font-size: 28px;
  font-weight: 900;
  color: var(--accent-gold-light);
  transform: rotate(-45deg);
  display: block;
  text-shadow: 0 2px 8px rgba(0,0,0,0.5);
}
.fu-label {
  font-size: 11px;
  color: var(--text-dim);
}

.deco-tag {
  position: absolute;
  background: rgba(212,175,55,0.1);
  border: 1px solid var(--border-gold);
  color: var(--accent-gold-light);
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 9999px;
}
.deco-top-left { top: -12px; left: 20px; }
.deco-bottom-right { bottom: -12px; right: 20px; }

/* ── Wave ── */
.hero-wave {
  position: relative;
  margin-top: 0;
  line-height: 0;
}
.hero-wave svg { display: block; width: 100%; height: 80px; }

/* ── Buttons ── */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, var(--accent-red) 0%, var(--accent-red-light) 50%, #8B0000 100%);
  color: var(--accent-gold-light);
  font-size: 15px;
  font-weight: 700;
  padding: 13px 28px;
  border-radius: 9999px;
  text-decoration: none;
  border: 1px solid rgba(212,175,55,0.4);
  box-shadow: 0 4px 20px rgba(192,57,43,0.45);
  transition: transform 0.22s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.22s;
  position: relative;
  overflow: hidden;
}
.btn-primary::after {
  content: '';
  position: absolute;
  top: -50%; left: -60%;
  width: 30%; height: 200%;
  background: rgba(255,255,255,0.15);
  transform: skewX(-20deg);
  animation: shimmer 3.5s infinite;
}
@keyframes shimmer { 0% { left: -60%; } 100% { left: 150%; } }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(192,57,43,0.6); }

.btn-ghost {
  display: inline-flex;
  align-items: center;
  color: var(--text-muted);
  font-size: 14px;
  font-weight: 600;
  padding: 13px 24px;
  border-radius: 9999px;
  text-decoration: none;
  border: 1px solid var(--border-gold);
  transition: color 0.2s, border-color 0.2s;
}
.btn-ghost:hover { color: var(--accent-gold-light); border-color: rgba(212,175,55,0.5); }

.btn-large { padding: 16px 40px; font-size: 16px; }

/* ── Sections common ── */
.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
.section-header {
  text-align: center;
  margin-bottom: 60px;
}
.section-tag {
  display: inline-block;
  background: rgba(212,175,55,0.1);
  border: 1px solid var(--border-gold);
  color: var(--accent-gold);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 16px;
  border-radius: 9999px;
  margin-bottom: 16px;
}
.section-title {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  font-weight: 900;
  line-height: 1.2;
  color: var(--text-primary);
  margin-bottom: 14px;
}
.section-desc {
  font-size: 1rem;
  color: var(--text-muted);
  line-height: 1.7;
  max-width: 560px;
  margin: 0 auto;
}

/* ── Features ── */
.sf-features {
  position: relative;
  z-index: 1;
  background: var(--bg-feature);
  padding: 100px 24px;
  border-top: 1px solid var(--border-gold);
  border-bottom: 1px solid var(--border-gold);
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}
.feature-card {
  background: rgba(18,8,5,0.8);
  border: 1px solid var(--border-gold);
  border-radius: 16px;
  padding: 32px;
  transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
}
.feature-card:hover {
  transform: translateY(-6px);
  border-color: rgba(212,175,55,0.5);
  box-shadow: 0 16px 40px rgba(0,0,0,0.3);
}
.feature-icon-wrap {
  width: 56px; height: 56px;
  background: rgba(192,57,43,0.15);
  border: 1px solid var(--border-red);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  margin-bottom: 20px;
}
.feature-title {
  font-family: 'Noto Serif SC', serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--accent-gold-light);
  margin-bottom: 10px;
}
.feature-desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.7;
}

/* ── Products ── */
.sf-products {
  position: relative;
  z-index: 1;
  padding: 100px 24px;
}
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
}
.product-card {
  background: var(--bg-card);
  border: 1px solid var(--border-gold);
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  color: var(--text-primary);
  display: block;
  transition: transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.3s;
}
.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
}
.product-img-wrap {
  position: relative;
  width: 100%;
  padding-top: 100%;
  background: #0d0604;
  overflow: hidden;
}
.product-img-wrap img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94);
}
.product-card:hover .product-img-wrap img { transform: scale(1.06); }
.img-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(8,3,1,0.7) 0%, transparent 50%);
}
.product-tag {
  position: absolute;
  top: 12px; left: 12px;
  background: rgba(192,57,43,0.9);
  color: var(--accent-gold-light);
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 6px;
  border: 1px solid rgba(212,175,55,0.3);
  z-index: 1;
}
.product-info { padding: 18px; }
.product-name {
  font-family: 'Noto Serif SC', serif;
  font-size: 15px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 6px;
}
.product-desc {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.5;
  margin-bottom: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.product-price {
  font-size: 20px;
  font-weight: 900;
  color: var(--accent-gold-light);
}
.product-cta {
  font-size: 13px;
  color: var(--text-muted);
  transition: color 0.2s;
}
.product-card:hover .product-cta { color: var(--accent-gold-light); }

/* Skeleton */
.product-skeleton {
  background: var(--bg-card);
  border: 1px solid var(--border-gold);
  border-radius: 16px;
  overflow: hidden;
}
.skeleton-img {
  width: 100%; padding-top: 100%;
  background: linear-gradient(90deg, #1a0a06 25%, #2a1208 50%, #1a0a06 75%);
  background-size: 400% 100%;
  animation: skeleton-shimmer 1.5s infinite;
}
.skeleton-body { padding: 18px; }
.skeleton-line {
  height: 12px; border-radius: 6px;
  background: linear-gradient(90deg, #1a0a06 25%, #2a1208 50%, #1a0a06 75%);
  background-size: 400% 100%;
  animation: skeleton-shimmer 1.5s infinite;
  margin-bottom: 10px;
}
.skeleton-line.long { width: 80%; }
.skeleton-line.medium { width: 60%; }
.skeleton-line.short { width: 40%; }
@keyframes skeleton-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

/* Empty state */
.empty-state {
  text-align: center;
  padding: 80px 24px;
  background: var(--bg-card);
  border: 1px dashed var(--border-gold);
  border-radius: 20px;
}
.empty-icon { font-size: 56px; margin-bottom: 16px; }
.empty-title {
  font-family: 'Noto Serif SC', serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 10px;
}
.empty-desc {
  font-size: 14px;
  color: var(--text-muted);
  max-width: 480px;
  margin: 0 auto 24px;
  line-height: 1.7;
}

/* ── CTA Banner ── */
.sf-cta-banner {
  position: relative;
  z-index: 1;
  padding: 80px 24px;
  background: linear-gradient(135deg, #3D0000 0%, #7A0000 50%, #3D0000 100%);
  border-top: 1px solid var(--border-gold);
  text-align: center;
}
.sf-cta-banner::before {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at center, rgba(212,175,55,0.1) 0%, transparent 70%);
}
.cta-inner { position: relative; z-index: 1; }
.cta-title {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  font-weight: 900;
  color: var(--text-primary);
  margin-bottom: 14px;
}
.cta-desc {
  font-size: 1rem;
  color: var(--text-muted);
  max-width: 500px;
  margin: 0 auto 32px;
  line-height: 1.7;
}

/* ── Footer ── */
.sf-footer {
  position: relative;
  z-index: 1;
  background: #040201;
  border-top: 1px solid var(--border-gold);
  padding: 28px 24px;
}
.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}
.footer-brand {
  font-family: 'Noto Serif SC', serif;
  font-weight: 800;
  color: var(--accent-gold-light);
  text-decoration: none;
  font-size: 16px;
}
.footer-copy { font-size: 13px; color: var(--text-dim); }
.footer-back {
  font-size: 13px;
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.2s;
}
.footer-back:hover { color: var(--accent-gold-light); }

/* ── Scroll animations ── */
.animate-up {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.animate-up.in-view {
  opacity: 1;
  transform: translateY(0);
}
</style>
