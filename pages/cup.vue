<template>
  <div class="cup-page">
    <!-- ── Ambient Orbs ── -->
    <div class="ambient-orb orb-1" />
    <div class="ambient-orb orb-2" />
    <div class="ambient-orb orb-3" />

    <!-- ── Navbar ── -->
    <header class="cup-navbar">
      <div class="navbar-inner">
        <NuxtLink to="/" class="navbar-brand">
          <span class="brand-icon">☕</span>
          <span>衣设 yishe</span>
        </NuxtLink>
        <nav class="navbar-links">
          <a href="#crafts">材质工艺</a>
          <a href="#products">专属商品</a>
          <NuxtLink to="/design" class="navbar-cta">印花定制</NuxtLink>
        </nav>
      </div>
    </header>

    <!-- ── Hero ── -->
    <section class="cup-hero">
      <div class="hero-inner">
        <div class="hero-text animate-up">
          <div class="eyebrow-pill">
            <span class="pill-pulse" />
            360° 全景升华高保真印花 · 专属饮具定制
          </div>

          <h1 class="hero-title">
            <span class="title-line-main">把你的创意</span>
            <span class="title-line-accent">印在杯身上</span>
          </h1>

          <p class="hero-desc">
            精选医用级 304 不锈钢、高骨瓷与高硼硅玻璃。支持 360° 全景升华热转印、温变惊艳效果与激光雕刻工艺，每一口，都有专属温度。
          </p>

          <div class="hero-stats">
            <div class="stat-item">
              <span class="stat-num">3</span>
              <span class="stat-label">精选材质类型</span>
            </div>
            <div class="stat-sep" />
            <div class="stat-item">
              <span class="stat-num">360°</span>
              <span class="stat-label">全景印花覆盖</span>
            </div>
            <div class="stat-sep" />
            <div class="stat-item">
              <span class="stat-num">48h</span>
              <span class="stat-label">极速发货</span>
            </div>
          </div>

          <div class="hero-actions">
            <NuxtLink to="/design" class="btn-primary">
              <span>⚡</span> 立即印花定制
            </NuxtLink>
            <a href="#products" class="btn-ghost">查看专属商品 ↓</a>
          </div>
        </div>

        <!-- Right: Cup Stage -->
        <div class="hero-visual animate-up" style="animation-delay: 0.15s">
          <div class="cup-stage">
            <div class="stage-ring ring-1" />
            <div class="stage-ring ring-2" />
            <div class="stage-ring ring-3" />
            <div class="stage-glow" />

            <div class="cup-mockup">
              <div class="cup-body">
                <div class="cup-surface">
                  <div class="cup-pattern-line" v-for="i in 3" :key="i" />
                </div>
                <div class="cup-handle" />
                <div class="cup-bottom" />
              </div>
              <div class="cup-steam">
                <div class="steam-line" v-for="i in 3" :key="i" :style="`animation-delay: ${i * 0.3}s`" />
              </div>
            </div>

            <div class="stage-badge badge-top">高骨瓷 · 釉面温润</div>
            <div class="stage-badge badge-bottom">可洗碗机清洗</div>
          </div>
        </div>
      </div>

      <!-- Bottom gradient fade -->
      <div class="hero-fade" />
    </section>

    <!-- ── Craft Section ── -->
    <section id="crafts" class="cup-crafts">
      <div class="section-container">
        <div class="section-header animate-up">
          <div class="section-tag">工艺解说</div>
          <h2 class="section-title">三大精选材质<br><span class="gradient-blue">全方位工艺保障</span></h2>
          <p class="section-desc">每一款饮具，都经过严格材质遴选与高精度热升华打样工艺检验。</p>
        </div>

        <div class="crafts-grid">
          <div class="craft-card animate-up" style="animation-delay:0s">
            <div class="craft-icon-wrap">
              <span class="craft-icon">✨</span>
            </div>
            <h3 class="craft-title">高骨瓷马克杯</h3>
            <p class="craft-desc">釉面细腻通透，光折射率达 90%。色彩还原度极高，适合插画、品牌 LOGO、名画复刻与纪念礼品。</p>
            <div class="craft-specs">
              <span class="spec-tag">高温烧制 1260°C</span>
              <span class="spec-tag">微波炉安全</span>
            </div>
          </div>

          <div class="craft-card animate-up" style="animation-delay:0.1s">
            <div class="craft-icon-wrap">
              <span class="craft-icon">🔥</span>
            </div>
            <h3 class="craft-title">温变惊艳魔术杯</h3>
            <p class="craft-desc">注入 50℃+ 热饮，黑色特殊感温涂层迅速消退，隐藏图案瞬间显现，给亲友、顾客满满仪式感冲击。</p>
            <div class="craft-specs">
              <span class="spec-tag">感温涂层 50°C</span>
              <span class="spec-tag">可洗碗机清洗</span>
            </div>
          </div>

          <div class="craft-card animate-up" style="animation-delay:0.2s">
            <div class="craft-icon-wrap">
              <span class="craft-icon">❄️</span>
            </div>
            <h3 class="craft-title">304 双层保温杯</h3>
            <p class="craft-desc">医用级 304 不锈钢双层抽真空，保温 12h / 保冷 24h。搭配激光精雕或 UV 浮雕油墨，兼具实用与美感。</p>
            <div class="craft-specs">
              <span class="spec-tag">304 医用级钢</span>
              <span class="spec-tag">保温 12h</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Products Section ── -->
    <section id="products" class="cup-products">
      <div class="section-container">
        <div class="section-header animate-up">
          <div class="section-tag">精选商品</div>
          <h2 class="section-title">【杯子】分类<span class="gradient-blue">专属上架商品</span></h2>
          <p class="section-desc">实时抓取商品库中「杯子 / 马克杯」分类下的上架款式，点击直达定制。</p>
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
              <p class="product-desc-text">{{ item.description || '高保真热升华工艺，耐洗洗碗机适用，手感温润细腻。' }}</p>
              <div class="product-footer">
                <span v-if="item.price" class="product-price">¥{{ item.price }}</span>
                <span class="product-cta">定制此款 →</span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Empty state -->
        <div v-else class="empty-state animate-up">
          <div class="empty-icon">☕</div>
          <h3 class="empty-title">暂无【杯子】分类商品上架</h3>
          <p class="empty-desc">管理员可在后台【商品模块】发布分类为「杯子」或「马克杯」的商品。你现在也可以直接进入 POD 设计工具自由定制！</p>
          <NuxtLink to="/design" class="btn-primary">进入 POD 设计工具</NuxtLink>
        </div>
      </div>
    </section>

    <!-- ── CTA Banner ── -->
    <section class="cup-cta">
      <div class="cta-inner animate-up">
        <div class="cta-glow" />
        <h2 class="cta-title">☕ 每一口，都是你的专属温度</h2>
        <p class="cta-desc">从设计到印制，最快 48 小时送达。礼赠挚友，或留存自用，都是最好的灵感承载。</p>
        <NuxtLink to="/design" class="btn-primary btn-large">立即开始定制</NuxtLink>
      </div>
    </section>

    <!-- ── Footer ── -->
    <footer class="cup-footer">
      <div class="footer-inner">
        <NuxtLink to="/" class="footer-brand">衣设 yishe</NuxtLink>
        <p class="footer-copy">© 2026 杯子/饮具定制专属介绍落地页 · 衣设 yishe 版权所有</p>
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
  title: '马克杯水杯专属印花定制 · 衣设 yishe',
  ogTitle: '马克杯水杯专属印花定制 · 衣设 yishe',
  description: '精选高骨瓷、304不锈钢与高硼硅玻璃杯具。360°全景热升华印花，温变魔术，激光雕刻，专属灵感饮具定制落地页。',
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
    const res = await fetchPublishedProducts({ type: '杯子', searchText: '杯', pageSize: 20 })
    products.value = res || []
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

.cup-page {
  --bg-deep: #050811;
  --bg-card: #0D1422;
  --bg-elevated: #121B2E;
  --accent-blue: #3B82F6;
  --accent-cyan: #06B6D4;
  --accent-blue-dim: rgba(59,130,246,0.15);
  --accent-cyan-dim: rgba(6,182,212,0.1);
  --text-primary: #F1F5F9;
  --text-muted: #64748B;
  --text-secondary: #94A3B8;
  --border-subtle: rgba(255,255,255,0.08);
  --border-blue: rgba(59,130,246,0.2);

  position: relative;
  min-height: 100vh;
  background-color: var(--bg-deep);
  color: var(--text-primary);
  font-family: 'Inter', -apple-system, 'PingFang SC', sans-serif;
  overflow-x: hidden;
}

/* ── Ambient Orbs ── */
.ambient-orb {
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  filter: blur(120px);
}
.orb-1 {
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%);
  top: -200px; left: -200px;
}
.orb-2 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(6,182,212,0.14) 0%, transparent 70%);
  top: 40%; right: -100px;
}
.orb-3 {
  width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%);
  bottom: 10%; left: 20%;
}

/* ── Navbar ── */
.cup-navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 0 24px;
  background: rgba(5,8,17,0.85);
  backdrop-filter: blur(24px) saturate(1.8);
  border-bottom: 1px solid var(--border-subtle);
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
  font-size: 17px;
  font-weight: 800;
  color: #fff;
  text-decoration: none;
}
.brand-icon { font-size: 20px; }
.navbar-links {
  display: flex;
  align-items: center;
  gap: 28px;
}
.navbar-links a {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s;
}
.navbar-links a:hover { color: var(--text-primary); }
.navbar-cta {
  background: linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-cyan) 100%);
  color: #fff !important;
  font-weight: 700;
  padding: 8px 20px;
  border-radius: 9999px;
  transition: opacity 0.2s, transform 0.2s !important;
}
.navbar-cta:hover {
  opacity: 0.9;
  transform: translateY(-1px) !important;
  color: #fff !important;
}

/* ── Hero ── */
.cup-hero {
  position: relative;
  z-index: 1;
  padding: 80px 24px 0;
}
.hero-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  padding-bottom: 80px;
}
@media (max-width: 900px) {
  .hero-inner { grid-template-columns: 1fr; gap: 48px; }
}

.eyebrow-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--accent-blue-dim);
  border: 1px solid var(--border-blue);
  color: var(--accent-cyan);
  padding: 6px 16px;
  border-radius: 9999px;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 24px;
}
.pill-pulse {
  width: 6px; height: 6px;
  background: var(--accent-cyan);
  border-radius: 50%;
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.7); }
}

.hero-title {
  font-size: clamp(2.8rem, 5vw, 4.2rem);
  font-weight: 900;
  line-height: 1.08;
  letter-spacing: -0.02em;
  margin-bottom: 20px;
}
.title-line-main { display: block; color: var(--text-primary); }
.title-line-accent {
  display: block;
  background: linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-cyan) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.gradient-blue {
  background: linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-cyan) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-desc {
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--text-secondary);
  margin-bottom: 36px;
  max-width: 480px;
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 36px;
}
.stat-item { text-align: center; }
.stat-num {
  display: block;
  font-size: 1.6rem;
  font-weight: 900;
  color: var(--accent-cyan);
  line-height: 1.1;
}
.stat-label {
  display: block;
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 2px;
}
.stat-sep {
  width: 1px; height: 36px;
  background: var(--border-subtle);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

/* ── Cup Stage Visual ── */
.hero-visual { position: relative; display: flex; justify-content: center; }
.cup-stage {
  position: relative;
  width: 320px; height: 380px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.stage-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(59,130,246,0.15);
  animation: ring-pulse 4s ease-in-out infinite;
}
.ring-1 { width: 200px; height: 200px; animation-delay: 0s; }
.ring-2 { width: 280px; height: 280px; animation-delay: 0.5s; border-style: dashed; }
.ring-3 { width: 360px; height: 360px; animation-delay: 1s; opacity: 0.5; }
@keyframes ring-pulse {
  0%, 100% { opacity: 0.15; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.02); }
}
.stage-glow {
  position: absolute;
  width: 180px; height: 180px;
  background: radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%);
  filter: blur(30px);
}

/* CSS Cup Mockup */
.cup-mockup {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cup-body {
  position: relative;
  width: 120px;
  height: 140px;
}
.cup-surface {
  width: 100%;
  height: 110px;
  background: linear-gradient(135deg, #1E3A5F 0%, #0D1F3C 50%, #162F52 100%);
  border-radius: 8px 8px 16px 16px;
  border: 1px solid rgba(59,130,246,0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  overflow: hidden;
  box-shadow: inset 0 2px 8px rgba(6,182,212,0.1), 0 8px 32px rgba(0,0,0,0.5);
}
.cup-pattern-line {
  width: 60%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(6,182,212,0.6), transparent);
  border-radius: 1px;
}
.cup-handle {
  position: absolute;
  right: -22px;
  top: 20px;
  width: 22px; height: 50px;
  border: 3px solid rgba(59,130,246,0.4);
  border-left: none;
  border-radius: 0 12px 12px 0;
}
.cup-bottom {
  width: 80%;
  height: 10px;
  background: linear-gradient(135deg, #1E3A5F, #0D1F3C);
  border-radius: 0 0 8px 8px;
  border: 1px solid rgba(59,130,246,0.3);
  margin: 0 auto;
}
.cup-steam {
  display: flex;
  gap: 10px;
  margin-bottom: 4px;
  height: 40px;
  align-items: flex-end;
}
.steam-line {
  width: 2px;
  height: 20px;
  background: linear-gradient(to top, rgba(6,182,212,0.6), transparent);
  border-radius: 1px;
  animation: steam 2s ease-in-out infinite;
}
@keyframes steam {
  0%, 100% { height: 16px; opacity: 0.5; }
  50% { height: 28px; opacity: 1; }
}

.stage-badge {
  position: absolute;
  background: rgba(13,20,34,0.9);
  border: 1px solid var(--border-blue);
  color: var(--accent-cyan);
  font-size: 11px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 9999px;
}
.badge-top { top: 40px; right: -10px; }
.badge-bottom { bottom: 40px; left: -10px; }

/* Hero fade */
.hero-fade {
  height: 80px;
  background: linear-gradient(to bottom, transparent, var(--bg-deep));
  margin-top: -40px;
}

/* ── Buttons ── */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-cyan) 100%);
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  padding: 13px 28px;
  border-radius: 9999px;
  text-decoration: none;
  box-shadow: 0 4px 20px rgba(59,130,246,0.4);
  transition: transform 0.22s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.22s;
  position: relative;
  overflow: hidden;
}
.btn-primary::after {
  content: '';
  position: absolute;
  top: -50%; left: -60%;
  width: 30%; height: 200%;
  background: rgba(255,255,255,0.18);
  transform: skewX(-20deg);
  animation: shimmer 3.5s infinite;
}
@keyframes shimmer { 0% { left: -60%; } 100% { left: 150%; } }
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(59,130,246,0.6);
}
.btn-ghost {
  display: inline-flex;
  align-items: center;
  color: var(--text-muted);
  font-size: 14px;
  font-weight: 600;
  padding: 13px 24px;
  border-radius: 9999px;
  text-decoration: none;
  border: 1px solid var(--border-subtle);
  transition: color 0.2s, border-color 0.2s;
}
.btn-ghost:hover {
  color: var(--text-primary);
  border-color: var(--border-blue);
}
.btn-large { padding: 16px 40px; font-size: 16px; }

/* ── Common Section ── */
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
  background: var(--accent-blue-dim);
  border: 1px solid var(--border-blue);
  color: var(--accent-blue);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 16px;
  border-radius: 9999px;
  margin-bottom: 16px;
}
.section-title {
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  font-weight: 900;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: var(--text-primary);
  margin-bottom: 14px;
}
.section-desc {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 540px;
  margin: 0 auto;
}

/* ── Crafts ── */
.cup-crafts {
  position: relative;
  z-index: 1;
  padding: 100px 24px;
  background: var(--bg-card);
  border-top: 1px solid var(--border-subtle);
  border-bottom: 1px solid var(--border-subtle);
}
.crafts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}
.craft-card {
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: 20px;
  padding: 32px;
  transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
}
.craft-card:hover {
  transform: translateY(-6px);
  border-color: var(--border-blue);
  box-shadow: 0 16px 40px rgba(0,0,0,0.3);
}
.craft-icon-wrap {
  width: 56px; height: 56px;
  background: var(--accent-blue-dim);
  border: 1px solid var(--border-blue);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  margin-bottom: 20px;
}
.craft-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 10px;
}
.craft-desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 16px;
}
.craft-specs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.spec-tag {
  background: var(--accent-cyan-dim);
  border: 1px solid rgba(6,182,212,0.2);
  color: var(--accent-cyan);
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 9999px;
}

/* ── Products ── */
.cup-products {
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
  border: 1px solid var(--border-subtle);
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
  border-color: var(--border-blue);
}
.product-img-wrap {
  position: relative;
  width: 100%;
  padding-top: 100%;
  background: var(--bg-elevated);
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
  background: linear-gradient(to top, rgba(5,8,17,0.7) 0%, transparent 55%);
}
.product-tag {
  position: absolute;
  top: 12px; left: 12px;
  background: rgba(59,130,246,0.85);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 6px;
  z-index: 1;
}
.product-info { padding: 18px; }
.product-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 6px;
}
.product-desc-text {
  font-size: 12px;
  color: var(--text-secondary);
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
  color: var(--accent-cyan);
}
.product-cta {
  font-size: 13px;
  color: var(--text-muted);
  transition: color 0.2s;
}
.product-card:hover .product-cta { color: var(--accent-blue); }

/* Skeleton */
.product-skeleton {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  overflow: hidden;
}
.skeleton-img {
  width: 100%; padding-top: 100%;
  background: linear-gradient(90deg, #0D1422 25%, #121B2E 50%, #0D1422 75%);
  background-size: 400% 100%;
  animation: sk 1.5s infinite;
}
.skeleton-body { padding: 18px; }
.skeleton-line {
  height: 12px; border-radius: 6px;
  background: linear-gradient(90deg, #0D1422 25%, #121B2E 50%, #0D1422 75%);
  background-size: 400% 100%;
  animation: sk 1.5s infinite;
  margin-bottom: 10px;
}
.skeleton-line.long { width: 80%; }
.skeleton-line.medium { width: 60%; }
.skeleton-line.short { width: 40%; }
@keyframes sk { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

/* Empty */
.empty-state {
  text-align: center;
  padding: 80px 24px;
  background: var(--bg-card);
  border: 1px dashed var(--border-blue);
  border-radius: 20px;
}
.empty-icon { font-size: 56px; margin-bottom: 16px; }
.empty-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 10px;
}
.empty-desc {
  font-size: 14px;
  color: var(--text-secondary);
  max-width: 480px;
  margin: 0 auto 24px;
  line-height: 1.7;
}

/* ── CTA ── */
.cup-cta {
  position: relative;
  z-index: 1;
  padding: 80px 24px;
  background: linear-gradient(135deg, #0A1628 0%, #0D2040 50%, #0A1628 100%);
  border-top: 1px solid var(--border-blue);
  text-align: center;
  overflow: hidden;
}
.cta-glow {
  position: absolute;
  width: 500px; height: 300px;
  background: radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%);
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
}
.cta-inner { position: relative; z-index: 1; }
.cta-title {
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  font-weight: 900;
  color: var(--text-primary);
  margin-bottom: 14px;
}
.cta-desc {
  font-size: 1rem;
  color: var(--text-secondary);
  max-width: 500px;
  margin: 0 auto 32px;
  line-height: 1.7;
}

/* ── Footer ── */
.cup-footer {
  position: relative;
  z-index: 1;
  background: #030608;
  border-top: 1px solid var(--border-subtle);
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
  font-weight: 800;
  color: var(--accent-cyan);
  text-decoration: none;
  font-size: 16px;
}
.footer-copy { font-size: 13px; color: var(--text-muted); }
.footer-back {
  font-size: 13px;
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.2s;
}
.footer-back:hover { color: var(--accent-blue); }

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
