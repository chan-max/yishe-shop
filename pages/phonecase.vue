<template>
  <div class="phonecase-casetify-page">
    <!-- Navbar -->
    <header class="cs-navbar">
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
          <a href="#protection">防摔与气囊科技</a>
          <a href="#monogram-studio">定制名字与拆解器</a>
          <a href="#compatibility">全机型列表</a>
          <a href="#products">分类商品</a>
          <NuxtLink to="/design" class="navbar-cta">去 POD 设计器</NuxtLink>
        </nav>
      </div>
    </header>

    <!-- Hero Header (Inspired by CASETiFY & RhinoShield) -->
    <section class="cs-hero">
      <div class="hero-container animate-up">
        <div class="hero-badges">
          <span class="badge-item">8 FT / 2.5m 军工防摔认证</span>
          <span class="badge-item">QiTech™ 蜂窝减震材料</span>
          <span class="badge-item">MagSafe 磁吸无线快充</span>
        </div>
        <h1 class="hero-title">CASETiFY 级防摔与 3D 浮雕手机壳</h1>
        <p class="hero-subtitle">
          融合高强分压蜂窝气囊与 3D 触感 UV 彩印。在下方 Custom Studio 中自由添加名字 Monogram，并可拆解四层防摔结构。
        </p>
      </div>
    </section>

    <!-- Protection Tech Cards (CASETiFY 防护三大支柱) -->
    <section id="protection" class="cs-section cs-protection">
      <div class="section-container">
        <div class="section-head text-center animate-up">
          <span class="section-tag">IMPACT PROTECTION TECH</span>
          <h2>全方位硬核防护三要素</h2>
          <p>保护手机远离意外跌落划伤，保持轻薄握持感。</p>
        </div>

        <div class="tech-grid">
          <div class="tech-card animate-up" style="animation-delay: 0.05s">
            <div class="tech-icon">🛡️</div>
            <h3>QiTech™ 蜂窝分子气囊</h3>
            <p>转角处内嵌蜂窝分子气囊，落地瞬间将集中冲击力快速分散至全壳，减少 85% 震频。</p>
          </div>
          <div class="tech-card animate-up" style="animation-delay: 0.1s">
            <div class="tech-icon">📷</div>
            <h3>+0.8mm 双重加高保护圈</h3>
            <p>手机屏幕与摄像头环均高出机身 0.8mm，平放桌面、磕碰粗糙地面不伤镜头玻璃。</p>
          </div>
          <div class="tech-card animate-up" style="animation-delay: 0.15s">
            <div class="tech-icon">🧲</div>
            <h3>MagSafe 强磁阵列兼容</h3>
            <p>内嵌 36 颗 N52 强磁铁环，兼容 MagSafe 磁吸充电器、车充及卡包配件，吸附稳固不掉落。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Monogram & 3D Layer Studio (CASETiFY 风格 Custom Studio) -->
    <section id="monogram-studio" class="cs-section cs-studio">
      <div class="section-container">
        <div class="studio-card animate-up">
          <!-- Controls (Left) -->
          <div class="studio-controls">
            <div class="controls-title">
              <h3>📱 CASETiFY Custom Studio</h3>
              <p>个性化 Monogram 签名与 3D 图层拆解器。</p>
            </div>

            <div class="control-block">
              <label>自定义文字签名 (Personalized Monogram)</label>
              <input v-model="monogramText" type="text" placeholder="输入名字或缩写, 如: ALEX" maxlength="12" class="cs-input" />
            </div>

            <div class="control-block">
              <label>防摔底壳材质 (Case Finish)</label>
              <div class="pill-group">
                <button
                  v-for="f in finishList"
                  :key="f.id"
                  :class="{ active: selectedFinish === f.id }"
                  @click="selectedFinish = f.id"
                >
                  {{ f.name }}
                </button>
              </div>
            </div>

            <div class="control-block">
              <div class="slider-header">
                <label>3D 防摔图层拆解距离</label>
                <strong>{{ explodeDist }}px</strong>
              </div>
              <input v-model.number="explodeDist" type="range" min="0" max="50" step="1" class="cs-range" />
            </div>

            <NuxtLink :to="`/design?preset=phonecase&text=${encodeURIComponent(monogramText)}&finish=${selectedFinish}`" class="btn-cta">
              ⚡ 导出签名进入 POD 设计器
            </NuxtLink>
          </div>

          <!-- Preview Visual (Right) -->
          <div class="studio-preview">
            <div class="phone-stage">
              <!-- Exploded 3D Plates -->
              <div class="layer-plate layer-top" :style="{ transform: `translateY(-${explodeDist * 1.6}px) rotateX(35deg) rotateZ(-15deg)` }">
                <span>9H 防刮硬化层</span>
              </div>
              <div class="layer-plate layer-art" :style="{ transform: `translateY(-${explodeDist * 1.0}px) rotateX(35deg) rotateZ(-15deg)` }">
                <span class="art-monogram">{{ monogramText || 'YOUR NAME' }}</span>
              </div>
              <div class="layer-plate layer-cushion" :style="{ transform: `translateY(-${explodeDist * 0.4}px) rotateX(35deg) rotateZ(-15deg)` }">
                <span>QiTech™ 气囊层</span>
              </div>
              <div class="layer-plate layer-tpu" :style="{ transform: `translateY(0px) rotateX(35deg) rotateZ(-15deg)` }">
                <span>MagSafe 保护底壳</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Compatibility Grid (机型覆盖表) -->
    <section id="compatibility" class="cs-section cs-compat">
      <div class="section-container">
        <div class="section-head text-center animate-up">
          <span class="section-tag">COMPATIBILITY</span>
          <h2>支持全品牌主流旗舰机型 POD 定制</h2>
          <p>真机 1:1 模具开孔，独立高弹按键按压顺畅。</p>
        </div>

        <div class="brand-grid animate-up">
          <div class="brand-card">
            <h4>🍎 Apple iPhone</h4>
            <p>iPhone 16 Pro Max / 16 Pro / 16 / 15 全系 / 14 / 13</p>
          </div>
          <div class="brand-card">
            <h4>🔴 华为 HUAWEI</h4>
            <p>Mate 70 Pro / Mate 60 Pro / Pura 70 Ultra / Nova 全系</p>
          </div>
          <div class="brand-card">
            <h4>🟠 小米 Xiaomi</h4>
            <p>小米 15 Pro / 15 / 14 Ultra / REDMI K80 全系</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Products -->
    <section id="products" class="cs-section cs-products">
      <div class="section-container">
        <div class="section-head animate-up">
          <span class="section-tag">STOREFRONT PRODUCTS</span>
          <h2>【手机壳】在售商品</h2>
          <p>展示平台已上架可直接下单定制的手机壳载体。</p>
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
            :style="`animation-delay: ${i * 0.05}s`"
          >
            <div class="product-img-box">
              <img :src="item.imageUrl || ''" :alt="item.title" loading="lazy" />
              <span class="product-cat-tag">{{ item.category }}</span>
            </div>
            <div class="product-details">
              <h4 class="product-title">{{ item.title }}</h4>
              <div class="product-bottom">
                <span class="product-price">¥{{ item.price || '39.00' }}</span>
                <span class="product-btn">定制此款 →</span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div v-else class="empty-box animate-up">
          <div class="empty-icon">📱</div>
          <h3>暂无【手机壳】分类在售商品</h3>
          <p>管理员可在后台发布分类为「手机壳」的商品。您现在可以直接进入 POD 设计器自定图案！</p>
          <NuxtLink to="/design" class="btn-cta inline-btn">进入 POD 设计器</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="cs-footer">
      <div class="footer-container">
        <span class="footer-brand">衣设 yishe · 防摔手机壳落地页</span>
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
  title: 'CASETiFY 级防摔手机壳定制 · 3D浮雕签名壳 · 衣设 yishe',
  ogTitle: 'CASETiFY 级防摔手机壳定制 · 3D浮雕签名壳 · 衣设 yishe',
  description: '参考 CASETiFY 标杆打造，8FT 军工防摔与 QiTech 蜂窝气囊，支持个性化名字 Monogram 与 3D 浮雕图层拆解。',
  keywords: '手机壳定制, POD手机壳, CASETiFY手机壳, 防摔气囊手机壳, iPhone16定制壳'
})

const monogramText = ref('ALEX')
const selectedFinish = ref('impact-clear')
const explodeDist = ref(24)

const finishList = [
  { id: 'impact-clear', name: '高透防摔强弹壳' },
  { id: 'matte-black', name: '哑光磨砂防指纹' },
  { id: 'glitter-pink', name: '璀璨闪粉炫彩壳' }
]

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
    const res = await fetchPublishedProducts({ type: '手机壳', pageSize: 20 })
    products.value = res || []
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.phonecase-casetify-page {
  --bg-page: #070D18;
  --bg-card: #0F172A;
  --bg-input: #1E293B;
  --accent: #06B6D4;
  --text-main: #F8FAFC;
  --text-sub: #94A3B8;
  --border: #1E293B;

  min-height: 100vh;
  background: var(--bg-page);
  color: var(--text-main);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.cs-navbar { position: sticky; top: 0; z-index: 100; background: rgba(7, 13, 24, 0.92); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border); padding: 0 24px; }
.navbar-inner { max-width: 1240px; margin: 0 auto; height: 64px; display: flex; align-items: center; justify-content: space-between; }
.navbar-brand { display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 19px; color: var(--text-main); text-decoration: none; }
.brand-icon { width: 22px; height: 22px; stroke: var(--accent); }
.navbar-links { display: flex; align-items: center; gap: 28px; }
.navbar-links a { color: var(--text-sub); text-decoration: none; font-size: 13.5px; font-weight: 600; }
.navbar-cta { background: var(--accent); color: #070D18 !important; font-weight: 800; padding: 8px 18px; border-radius: 8px; }

.cs-hero { padding: 70px 24px 50px; text-align: center; border-bottom: 1px solid var(--border); }
.hero-container { max-width: 840px; margin: 0 auto; }
.hero-badges { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; }
.badge-item { background: rgba(6, 182, 212, 0.12); color: var(--accent); border: 1px solid rgba(6, 182, 212, 0.3); font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 9999px; }
.hero-title { font-size: clamp(2.2rem, 4.5vw, 3.6rem); font-weight: 800; margin-bottom: 16px; letter-spacing: -0.02em; }
.hero-subtitle { font-size: 1.05rem; color: var(--text-sub); line-height: 1.7; }

.cs-section { padding: 80px 24px; }
.section-container { max-width: 1240px; margin: 0 auto; }
.section-head { margin-bottom: 48px; }
.section-head.text-center { text-align: center; }
.section-tag { font-size: 11px; font-weight: 800; letter-spacing: 0.12em; color: var(--accent); display: block; margin-bottom: 8px; }
.section-head h2 { font-size: 2.2rem; font-weight: 800; margin-bottom: 8px; }
.section-head p { font-size: 14px; color: var(--text-sub); }

.tech-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
.tech-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 18px; padding: 32px; }
.tech-icon { font-size: 32px; margin-bottom: 14px; }
.tech-card h3 { font-size: 18px; font-weight: 800; margin-bottom: 8px; }
.tech-card p { font-size: 13.5px; color: var(--text-sub); line-height: 1.6; margin: 0; }

.studio-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 24px; padding: 36px; display: grid; grid-template-columns: 440px 1fr; gap: 40px; }
@media (max-width: 960px) { .studio-card { grid-template-columns: 1fr; } }
.controls-title h3 { font-size: 20px; font-weight: 800; color: var(--accent); margin-bottom: 4px; }
.controls-title p { font-size: 13px; color: var(--text-sub); margin-bottom: 24px; }
.control-block { margin-bottom: 20px; }
.control-block label { font-size: 12px; font-weight: 700; color: var(--text-sub); display: block; margin-bottom: 8px; }
.cs-input { width: 100%; background: var(--bg-input); border: 1px solid var(--border); color: var(--text-main); padding: 10px 14px; border-radius: 8px; font-size: 14px; }
.cs-input:focus { border-color: var(--accent); outline: none; }

.slider-header { display: flex; justify-content: space-between; font-size: 12px; color: var(--text-sub); margin-bottom: 8px; }
.cs-range { width: 100%; accent-color: var(--accent); cursor: pointer; }

.pill-group { display: flex; gap: 8px; flex-wrap: wrap; }
.pill-group button { background: var(--bg-input); border: 1px solid var(--border); color: var(--text-sub); padding: 8px 14px; border-radius: 8px; font-size: 12.5px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
.pill-group button.active { background: var(--accent); color: #070D18; border-color: var(--accent); }

.btn-cta { display: block; text-align: center; background: var(--accent); color: #070D18; font-weight: 800; padding: 14px; border-radius: 10px; text-decoration: none; margin-top: 24px; }
.inline-btn { display: inline-block; padding: 12px 28px; }

.studio-preview { background: var(--bg-page); border: 1px solid var(--border); border-radius: 18px; padding: 36px; display: flex; justify-content: center; align-items: center; min-height: 420px; perspective: 1000px; }
.phone-stage { position: relative; width: 220px; height: 320px; display: flex; flex-direction: column; align-items: center; justify-content: center; transform-style: preserve-3d; }
.layer-plate { position: absolute; width: 190px; height: 270px; border-radius: 26px; border: 2px solid var(--accent); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; transition: transform 0.1s linear; backdrop-filter: blur(4px); box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
.layer-top { background: rgba(6, 182, 212, 0.15); color: #FFF; border-color: #67E8F9; }
.layer-art { background: rgba(59, 130, 246, 0.25); color: #FFF; border-color: #93C5FD; }
.art-monogram { font-family: monospace; font-size: 18px; font-weight: 900; letter-spacing: 0.1em; color: #FACC15; text-shadow: 0 2px 8px rgba(0,0,0,0.8); }
.layer-cushion { background: rgba(16, 185, 129, 0.25); color: #FFF; border-color: #6EE7B7; }
.layer-tpu { background: rgba(15, 23, 42, 0.9); color: #FFF; border-color: #334155; }

.brand-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
.brand-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 24px; }
.brand-card h4 { font-size: 16px; font-weight: 800; color: var(--accent); margin-bottom: 8px; }
.brand-card p { font-size: 13px; color: var(--text-sub); line-height: 1.5; margin: 0; }

.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; }
.product-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; text-decoration: none; color: var(--text-main); transition: transform 0.2s; }
.product-card:hover { transform: translateY(-4px); }
.product-img-box { position: relative; width: 100%; padding-top: 100%; background: #1E293B; }
.product-img-box img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.product-cat-tag { position: absolute; top: 12px; left: 12px; background: var(--accent); color: #070D18; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; }
.product-details { padding: 18px; }
.product-title { font-size: 15px; font-weight: 800; margin-bottom: 6px; }
.product-desc { font-size: 12px; color: var(--text-sub); line-height: 1.5; margin-bottom: 16px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.product-bottom { display: flex; justify-content: space-between; align-items: center; }
.product-price { font-size: 18px; font-weight: 800; color: var(--accent); }
.product-btn { font-size: 13px; font-weight: 800; color: var(--text-main); }

.empty-box { text-align: center; padding: 60px 24px; background: var(--bg-card); border: 1px dashed var(--border); border-radius: 20px; }
.empty-icon { font-size: 32px; margin-bottom: 12px; }
.empty-box h3 { font-size: 1.1rem; font-weight: 800; margin-bottom: 8px; }
.empty-box p { color: var(--text-sub); font-size: 14px; max-width: 440px; margin: 0 auto 20px; }

.cs-footer { padding: 28px 24px; background: #050912; border-top: 1px solid var(--border); }
.footer-container { max-width: 1240px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; font-size: 13px; color: var(--text-sub); }
.footer-brand { font-weight: 800; color: var(--accent); }
.footer-link { color: var(--text-main); text-decoration: none; font-weight: 700; }

.animate-up { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
.animate-up.in-view { opacity: 1; transform: translateY(0); }
</style>
