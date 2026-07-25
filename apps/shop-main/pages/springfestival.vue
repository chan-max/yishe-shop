<template>
  <div class="sf-festive-page">
    <!-- ── 1. 乙巳年味顶部通告栏 ── -->
    <div class="sf-top-banner">
      <span>🧧 乙巳蛇年 · 新春特惠 | 全场手书/烫金春联满 ¥199 包邮 | 支持个性化定制与快速发货 🏮</span>
    </div>

    <!-- ── 2. 传统典雅 Header 导航 ── -->
    <header class="sf-header">
      <div class="header-inner">
        <NuxtLink to="/" class="brand-link">
          <span class="seal-icon">年</span>
          <div class="brand-text">
            <span class="title-main">衣设 yishe · 春联馆</span>
            <span class="title-sub">乙巳蛇年 · 门楣生辉</span>
          </div>
        </NuxtLink>

        <nav class="nav-menu">
          <a href="#workshop">✍️ 门楣演练</a>
          <a href="#presets">🧧 经典对联辑</a>
          <a href="#craft">📜 纸墨考究</a>
          <a href="#products">🛍️ 年货在售</a>
          <NuxtLink to="/design?preset=springfestival" class="btn-design-entry">去 POD 设计器</NuxtLink>
        </nav>
      </div>
    </header>

    <!-- ── 3. Hero Section (朱红大门 · 实时手书对联演练) ── -->
    <section id="workshop" class="sf-hero-section">
      <div class="section-container">
        <div class="hero-header text-center">
          <span class="year-badge">2026 乙巳蛇年新春限定</span>
          <h1 class="hero-title">手书春联 · 千家万户换新符</h1>
          <p class="hero-subtitle">万年红云锦纸 × 3D 浮雕烫金墨 · 实时演练朱红大门贴对联效果</p>
        </div>

        <!-- 实时对联演练大堂 (Interactive Couplet Door Stage) -->
        <div class="couplet-stage-wrapper">
          <!-- 门楣预览画布 Stage -->
          <div class="door-stage">
            <div class="door-lintel">
              <div class="horizontal-banner">
                <span class="gold-ink">{{ bannerText || '吉星高照' }}</span>
              </div>
            </div>

            <div class="door-body">
              <!-- 左对联 (下联) -->
              <div class="vertical-scroll scroll-left">
                <span class="gold-ink">{{ leftText || '贺岁纳财吉祥到' }}</span>
              </div>

              <!-- 门心斗方大福字 -->
              <div class="fu-box">
                <span class="fu-char">福</span>
              </div>

              <!-- 右对联 (上联) -->
              <div class="vertical-scroll scroll-right">
                <span class="gold-ink">{{ rightText || '迎春接福禧盈门' }}</span>
              </div>
            </div>
          </div>

          <!-- 对联内容实时控制面板 -->
          <div class="stage-control-panel">
            <div class="panel-head">
              <h3>✍️ 实时拟真演练</h3>
              <p>输入对联文字，或一键选择经典吉语预设：</p>
            </div>

            <!-- 经典吉语一键预设 -->
            <div class="preset-pills">
              <button
                v-for="p in coupletPresets"
                :key="p.name"
                class="pill-btn"
                @click="applyPreset(p)"
              >
                {{ p.name }}
              </button>
            </div>

            <div class="input-form-grid">
              <div class="form-item">
                <label>上联（贴右侧）</label>
                <input v-model="rightText" type="text" placeholder="迎春接福禧盈门" maxlength="11" />
              </div>
              <div class="form-item">
                <label>下联（贴左侧）</label>
                <input v-model="leftText" type="text" placeholder="贺岁纳财吉祥到" maxlength="11" />
              </div>
              <div class="form-item">
                <label>横批（贴上方）</label>
                <input v-model="bannerText" type="text" placeholder="吉星高照" maxlength="6" />
              </div>
            </div>

            <div class="panel-action">
              <NuxtLink
                :to="`/design?preset=springfestival&right=${encodeURIComponent(rightText)}&left=${encodeURIComponent(leftText)}&banner=${encodeURIComponent(bannerText)}`"
                class="btn-gold-cta"
              >
                ✨ 带着此对联生成 POD 印刷订单
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 4. 经典年禧对联辑 (Presets Grid) ── -->
    <section id="presets" class="sf-section presets-section">
      <div class="section-container">
        <div class="section-title-wrap text-center">
          <span class="sub-title">FESTIVE SELECTION</span>
          <h2 class="main-title">年味精选 · 喜庆对联辑</h2>
          <p class="desc">名家书法字体，传统对偶押韵，为您呈献浓浓中国年味。</p>
        </div>

        <div class="presets-cards-grid">
          <div
            v-for="(item, i) in coupletCollection"
            :key="i"
            class="preset-card"
            @click="applyCollection(item)"
          >
            <div class="card-tag">{{ item.tag }}</div>
            <h3>{{ item.banner }}</h3>
            <div class="couplet-preview">
              <p><span>上联：</span>{{ item.right }}</p>
              <p><span>下联：</span>{{ item.left }}</p>
            </div>
            <button class="btn-use-preset">套用此对联 →</button>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 5. 纸墨考究 (Craftsmanship) ── -->
    <section id="craft" class="sf-section craft-section">
      <div class="section-container">
        <div class="section-title-wrap text-center">
          <span class="sub-title">CRAFTSMANSHIP</span>
          <h2 class="main-title">匠心品质 · 纸墨考究</h2>
        </div>

        <div class="craft-grid-3">
          <div class="craft-card">
            <div class="craft-icon">📜</div>
            <h3>万年红云锦宣纸</h3>
            <p>采用特级防晒耐候染料与加厚云锦宣纸，经风吹日晒一整年依旧鲜红如初，不掉色、不起皱。</p>
          </div>
          <div class="craft-card">
            <div class="craft-icon">✨</div>
            <h3>3D 浮雕烫金工艺</h3>
            <p>99% 高纯度金属烫金膏，结合高精浮雕压纹，在阳光下呈现流光溢彩的名家墨宝质感。</p>
          </div>
          <div class="craft-card">
            <div class="craft-icon">🖌️</div>
            <h3>名家字库集字</h3>
            <p>收录王羲之、颜真卿、赵孟頫等传统书法名家字体，笔力雄健，典雅端庄。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 6. 春联年货在售商品 (Products) ── -->
    <section id="products" class="sf-section products-section">
      <div class="section-container">
        <div class="section-title-wrap text-center">
          <span class="sub-title">STOREFRONT</span>
          <h2 class="main-title">【春联年货】在售清单</h2>
          <p class="desc">展示分类为「春联」的最新已上架商品。</p>
        </div>

        <div v-if="loading" class="products-grid">
          <div v-for="i in 4" :key="i" class="product-skeleton">
            <div class="sk-img" />
            <div class="sk-body"><div class="sk-line w-80" /><div class="sk-line w-50" /></div>
          </div>
        </div>

        <div v-else-if="products.length > 0" class="products-grid">
          <NuxtLink
            v-for="item in products"
            :key="item.id"
            :to="`/product/${item.id}`"
            class="sf-product-card"
          >
            <div class="card-img-box">
              <img :src="item.imageUrl || ''" :alt="item.title" loading="lazy" />
              <span class="badge-tag">春联特惠</span>
            </div>
            <div class="card-content">
              <h4 class="card-title">{{ item.title }}</h4>
              <div class="card-bottom">
                <span class="card-price">¥{{ item.price || '68.00' }}</span>
                <span class="btn-buy">立即定制</span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div v-else class="empty-box text-center">
          <div class="empty-seal">春</div>
          <h3>暂无【春联】分类在售商品</h3>
          <p>管理员可在后台发布分类为「春联」的商品。您现在可以直接进入 POD 设计器自定图案！</p>
          <NuxtLink to="/design?preset=springfestival" class="btn-gold-cta inline-btn">进入 POD 设计器</NuxtLink>
        </div>
      </div>
    </section>

    <!-- ── 7. 页脚 Footer ── -->
    <footer class="sf-footer">
      <div class="section-container footer-flex">
        <div class="footer-brand">
          <span class="footer-seal">年</span>
          <div class="footer-text">
            <h4>衣设 yishe · 春联馆</h4>
            <p>乙巳蛇年大吉 · 千家万户换新符</p>
          </div>
        </div>
        <div class="footer-links">
          <NuxtLink to="/">← 返回主站首页</NuxtLink>
          <NuxtLink to="/design?preset=springfestival">POD 春联定制</NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePublishedProducts, type StorefrontPublishedProduct } from '~/composables/use-published-products'

definePageMeta({ layout: false })

useSeoMeta({
  title: '乙巳蛇年手书春联 · 万年红烫金春联定制 · 衣设 yishe',
  ogTitle: '乙巳蛇年手书春联 · 万年红烫金春联定制 · 衣设 yishe',
  description: '衣设 yishe 春联馆，提供乙巳蛇年新春春联在线拟真手书演练、万年红云锦纸与 3D 浮雕烫金定制。',
  keywords: '春联定制, 蛇年春联, 烫金春联, 手书对联, 万年红对联'
})

const rightText = ref('迎春接福禧盈门')
const leftText = ref('贺岁纳财吉祥到')
const bannerText = ref('吉星高照')

const coupletPresets = [
  { name: '🧧 蛇年吉祥', right: '金蛇狂舞迎新春', left: '瑞气盈门送吉祥', banner: '蛇年大吉' },
  { name: '💰 生意兴隆', right: '门迎晓日财源广', left: '户纳春风吉庆多', banner: '生意兴隆' },
  { name: '🏡 合家平安', right: '平安二字值千金', left: '和顺满门添百福', banner: '合家欢乐' },
  { name: '✨ 迎春接福', right: '迎春接福禧盈门', left: '贺岁纳财吉祥到', banner: '吉星高照' }
]

const coupletCollection = [
  { tag: '蛇年爆款', name: '蛇年大吉套装', right: '金蛇狂舞迎新春', left: '瑞气盈门送吉祥', banner: '蛇年大吉' },
  { tag: '大宅商铺', name: '生意兴隆套装', right: '门迎晓日财源广', left: '户纳春风吉庆多', banner: '生意兴隆' },
  { tag: '平安喜乐', name: '合家欢乐套装', right: '平安二字值千金', left: '和顺满门添百福', banner: '合家欢乐' },
  { tag: '文青经典', name: '雅致春禧套装', right: '春满人间百花吐', left: '福临小院万事顺', banner: '迎春接福' }
]

function applyPreset(p: { right: string; left: string; banner: string }) {
  rightText.value = p.right
  leftText.value = p.left
  bannerText.value = p.banner
}

function applyCollection(item: { right: string; left: string; banner: string }) {
  applyPreset(item)
  const el = document.getElementById('workshop')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const { fetchPublishedProducts } = usePublishedProducts()
const loading = ref(true)
const products = ref<StorefrontPublishedProduct[]>([])

onMounted(async () => {
  loading.value = true
  try {
    const res = await fetchPublishedProducts({ type: '春联', pageSize: 20 })
    products.value = res || []
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Noto+Serif+SC:wght@700;900&family=Inter:wght@400;600;700&display=swap');

.sf-festive-page {
  --red-primary: #991B1B;
  --red-deep: #7F1D1D;
  --red-accent: #C2410C;
  --gold-primary: #F59E0B;
  --gold-bright: #FBBF24;
  --gold-bg: #FEF3C7;
  --bg-page: #FAF5EF;
  --text-dark: #27272A;
  --text-muted: #71717A;
  --border-color: #E4E4E7;

  min-height: 100vh;
  background: var(--bg-page);
  color: var(--text-dark);
  font-family: 'Inter', sans-serif;
}

/* 1. Top Banner */
.sf-top-banner { background: var(--red-deep); color: #FEF3C7; font-size: 12px; font-weight: 700; padding: 8px 16px; text-align: center; letter-spacing: 0.05em; border-bottom: 1px solid var(--gold-primary); }

/* 2. Header */
.sf-header { background: #FFFFFF; border-bottom: 1px solid var(--border-color); position: sticky; top: 0; z-index: 100; }
.header-inner { max-width: 1200px; margin: 0 auto; padding: 14px 24px; display: flex; justify-content: space-between; align-items: center; }
.brand-link { text-decoration: none; display: flex; align-items: center; gap: 10px; }
.seal-icon { width: 36px; height: 36px; background: var(--red-primary); color: var(--gold-bright); font-family: 'Noto Serif SC', serif; font-size: 20px; font-weight: 900; border-radius: 6px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(153, 27, 27, 0.3); }
.brand-text { display: flex; flex-direction: column; }
.title-main { font-family: 'Noto Serif SC', serif; font-size: 18px; font-weight: 900; color: var(--red-primary); }
.title-sub { font-size: 11px; color: var(--text-muted); }

.nav-menu { display: flex; align-items: center; gap: 24px; }
.nav-menu a { color: var(--text-dark); text-decoration: none; font-size: 13.5px; font-weight: 600; transition: color 0.2s; }
.nav-menu a:hover { color: var(--red-primary); }
.btn-design-entry { background: var(--red-primary); color: #FFFFFF !important; padding: 8px 16px; border-radius: 6px; font-weight: 700; }

/* 3. Hero Section & Interactive Door Stage */
.sf-hero-section { padding: 60px 24px; background: linear-gradient(180deg, #FFF7ED 0%, var(--bg-page) 100%); }
.section-container { max-width: 1140px; margin: 0 auto; }
.year-badge { display: inline-block; background: var(--gold-bg); color: #9A3412; font-size: 12px; font-weight: 700; padding: 4px 14px; border-radius: 9999px; margin-bottom: 12px; border: 1px solid var(--gold-primary); }
.hero-title { font-family: 'Noto Serif SC', serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 900; color: var(--red-primary); margin-bottom: 8px; }
.hero-subtitle { font-size: 14px; color: var(--text-muted); margin-bottom: 40px; }

/* Real-time Door Preview Stage */
.couplet-stage-wrapper { display: grid; grid-template-columns: 1fr 400px; gap: 36px; background: #FFFFFF; border: 1px solid var(--border-color); border-radius: 20px; padding: 36px; box-shadow: 0 10px 30px rgba(0,0,0,0.04); }
@media (max-width: 960px) { .couplet-stage-wrapper { grid-template-columns: 1fr; } }

.door-stage { background: #3F3D38; border-radius: 12px; padding: 32px 20px; display: flex; flex-direction: column; align-items: center; gap: 20px; border: 4px solid #27272A; }

.door-lintel { width: 100%; display: flex; justify-content: center; }
.horizontal-banner { background: var(--red-primary); border: 2px solid var(--gold-bright); padding: 8px 28px; border-radius: 4px; box-shadow: 0 4px 10px rgba(0,0,0,0.3); }

.door-body { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 0 16px; min-height: 280px; }

.vertical-scroll { background: var(--red-primary); border: 2px solid var(--gold-bright); padding: 16px 12px; border-radius: 4px; box-shadow: 0 4px 10px rgba(0,0,0,0.3); }

.gold-ink { font-family: 'Ma Shan Zheng', cursive; font-size: 26px; color: var(--gold-bright); text-shadow: 0 0 4px rgba(251, 191, 36, 0.5); letter-spacing: 0.15em; writing-mode: vertical-rl; }
.horizontal .gold-ink { writing-mode: horizontal-tb; font-size: 22px; }

.fu-box { width: 72px; height: 72px; background: var(--red-primary); border: 2px solid var(--gold-bright); transform: rotate(45deg); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.3); }
.fu-char { font-family: 'Ma Shan Zheng', cursive; font-size: 38px; color: var(--gold-bright); transform: rotate(-45deg); display: block; }

/* Control Panel */
.stage-control-panel { display: flex; flex-direction: column; justify-content: space-between; }
.panel-head h3 { font-size: 18px; font-weight: 800; color: var(--red-primary); margin-bottom: 4px; }
.panel-head p { font-size: 12.5px; color: var(--text-muted); margin-bottom: 16px; }

.preset-pills { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
.pill-btn { background: var(--gold-bg); color: #9A3412; border: 1px solid var(--gold-primary); font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 6px; cursor: pointer; transition: all 0.2s; }
.pill-btn:hover { background: var(--gold-primary); color: #FFF; }

.input-form-grid { display: flex; flex-direction: column; gap: 14px; margin-bottom: 24px; }
.form-item label { font-size: 12px; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 4px; }
.form-item input { width: 100%; border: 1px solid var(--border-color); border-radius: 6px; padding: 10px 14px; font-size: 14px; outline: none; transition: border-color 0.2s; }
.form-item input:focus { border-color: var(--red-primary); }

.btn-gold-cta { display: block; text-align: center; background: linear-gradient(135deg, #B91C1C, #991B1B); color: #FEF3C7; font-weight: 800; font-size: 14px; padding: 14px; border-radius: 8px; text-decoration: none; transition: transform 0.2s; box-shadow: 0 4px 12px rgba(153, 27, 27, 0.25); }
.btn-gold-cta:hover { transform: translateY(-2px); }

/* 4. Common Sections */
.sf-section { padding: 60px 24px; }
.section-title-wrap { margin-bottom: 40px; }
.sub-title { font-size: 11px; font-weight: 800; letter-spacing: 0.12em; color: var(--red-primary); display: block; margin-bottom: 4px; }
.main-title { font-family: 'Noto Serif SC', serif; font-size: 2rem; font-weight: 900; color: var(--text-dark); margin-bottom: 6px; }
.desc { font-size: 13.5px; color: var(--text-muted); }

/* Presets Cards */
.presets-cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
.preset-card { background: #FFFFFF; border: 1px solid var(--border-color); border-radius: 12px; padding: 24px; cursor: pointer; transition: transform 0.2s, border-color 0.2s; }
.preset-card:hover { transform: translateY(-4px); border-color: var(--red-primary); }
.card-tag { font-size: 11px; font-weight: 700; color: var(--red-primary); background: #FEE2E2; display: inline-block; padding: 2px 8px; border-radius: 4px; margin-bottom: 10px; }
.preset-card h3 { font-family: 'Noto Serif SC', serif; font-size: 18px; font-weight: 900; color: var(--text-dark); margin-bottom: 12px; }
.couplet-preview { font-size: 13px; color: var(--text-muted); line-height: 1.6; margin-bottom: 16px; }
.couplet-preview span { font-weight: 700; color: var(--red-primary); }
.btn-use-preset { background: none; border: none; font-size: 12px; font-weight: 700; color: var(--red-primary); cursor: pointer; padding: 0; }

/* 5. Craftsmanship */
.craft-section { background: #FFFFFF; border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color); }
.craft-grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 28px; }
.craft-card { background: var(--bg-page); border: 1px solid var(--border-color); border-radius: 14px; padding: 32px; text-align: center; }
.craft-icon { font-size: 36px; margin-bottom: 12px; }
.craft-card h3 { font-family: 'Noto Serif SC', serif; font-size: 18px; font-weight: 900; color: var(--red-primary); margin-bottom: 8px; }
.craft-card p { font-size: 13px; color: var(--text-muted); line-height: 1.6; margin: 0; }

/* 6. Products */
.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 24px; }
.sf-product-card { background: #FFFFFF; border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden; text-decoration: none; color: var(--text-dark); transition: transform 0.2s; }
.sf-product-card:hover { transform: translateY(-4px); }
.card-img-box { position: relative; width: 100%; padding-top: 100%; background: #F4F4F5; }
.card-img-box img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.badge-tag { position: absolute; top: 10px; left: 10px; background: var(--red-primary); color: #FFF; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; }
.card-content { padding: 16px; }
.card-title { font-size: 15px; font-weight: 700; margin-bottom: 12px; }
.card-bottom { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 10px; }
.card-price { font-size: 16px; font-weight: 800; color: var(--red-primary); }
.btn-buy { font-size: 12px; font-weight: 700; color: var(--red-primary); }

.empty-box { background: #FFFFFF; border: 1px dashed var(--border-color); border-radius: 16px; padding: 48px 24px; }
.empty-seal { width: 44px; height: 44px; background: var(--red-primary); color: var(--gold-bright); font-family: 'Noto Serif SC', serif; font-size: 24px; font-weight: 900; border-radius: 8px; margin: 0 auto 12px; display: flex; align-items: center; justify-content: center; }
.empty-box h3 { font-size: 16px; font-weight: 800; margin-bottom: 6px; }
.empty-box p { font-size: 13px; color: var(--text-muted); max-width: 440px; margin: 0 auto 20px; }
.inline-btn { display: inline-block; padding: 10px 24px; }

/* 7. Footer */
.sf-footer { background: var(--red-deep); color: #FEF3C7; padding: 36px 24px; }
.footer-flex { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
.footer-brand { display: flex; align-items: center; gap: 12px; }
.footer-seal { width: 32px; height: 32px; background: var(--gold-bright); color: var(--red-deep); font-family: 'Noto Serif SC', serif; font-size: 18px; font-weight: 900; border-radius: 4px; display: flex; align-items: center; justify-content: center; }
.footer-text h4 { font-size: 15px; font-weight: 800; margin: 0; }
.footer-text p { font-size: 12px; opacity: 0.8; margin: 0; }
.footer-links a { color: #FEF3C7; text-decoration: none; font-size: 13px; font-weight: 600; margin-left: 20px; }
</style>
