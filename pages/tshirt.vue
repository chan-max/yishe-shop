<template>
  <div class="clubi-exact-page">
    <!-- ── 1. 顶部公告栏 (黑底白字公告) ── -->
    <div class="clubi-top-announcement">
      <button class="arrow-btn">‹</button>
      <span class="announcement-text">✨ 衣设 yishe · 纯棉 T恤专属频道 | 全场 POD 定制满 ¥199 包邮 | 支持一件起订与极速发货</span>
      <button class="arrow-btn">›</button>
    </div>

    <!-- ── 2. 主 Header 顶栏 (Logo + 搜索框 + 分类导航) ── -->
    <header class="clubi-main-header">
      <div class="header-top-row">
        <!-- Logo -->
        <NuxtLink to="/" class="clubi-logo-brand">
          <span class="logo-script">衣设</span>
          <span class="logo-sans">yishe · T-Shirt</span>
        </NuxtLink>

        <!-- Center Search Bar -->
        <div class="header-search-bar">
          <input type="text" placeholder="搜索 T恤 款式、印花风格或图案关键词..." class="search-input" />
          <button class="search-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>

        <!-- Right Utility Icons -->
        <div class="header-user-actions">
          <NuxtLink to="/design" class="action-item account-link" title="个人中心">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </NuxtLink>
          <NuxtLink to="/design" class="action-item cart-link" title="设计工具">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span class="cart-badge-count">0</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Bottom Category Bar with horizontal arrows -->
      <div class="header-cat-bar">
        <button class="cat-arrow left-arrow">‹</button>
        <nav class="cat-nav-list">
          <a href="#new" class="cat-item highlight-orange">🔥 新品首发</a>
          <a href="#heavyweight" class="cat-item">240g 重磅纯棉</a>
          <a href="#oversized" class="cat-item">街头 OVERSIZED</a>
          <a href="#vintage" class="cat-item">复古洗水系列</a>
          <a href="#bestseller" class="cat-item active-cat">经典热销 T恤</a>
          <a href="#design-zone" class="cat-item">POD 设计中心</a>
        </nav>
        <button class="cat-arrow right-arrow">›</button>
      </div>
    </header>

    <!-- ── 3. Hero Carousel Banner ── -->
    <section class="clubi-hero-banner">
      <button class="hero-arrow hero-prev">‹</button>
      <div class="hero-slide-container">
        <div class="hero-slide-content">
          <span class="slide-badge">衣设 yishe 2026 T-Shirt Collection</span>
          <h1>100% 精梳纯棉 · 0 胶感透气印花</h1>
          <p>衣服讲述的故事！用极致的面料质感与独家艺术图案，记录每一个惬意日常。</p>
          <NuxtLink to="/design?preset=tshirt" class="btn-hero-action">进入 POD 设计器自定印花</NuxtLink>
        </div>
      </div>
      <button class="hero-arrow hero-next">›</button>
      <div class="hero-dots">
        <span class="dot active" />
        <span class="dot" />
      </div>
    </section>

    <!-- ── 4. Section 1: "新品首发 · 热门印花 T恤" ── -->
    <section id="new" class="clubi-section-block">
      <div class="section-container">
        <h2 class="section-main-title">新品首发 · 热门印花 T恤</h2>

        <div class="carousel-wrapper">
          <button class="nav-arrow prev-arrow">‹</button>
          
          <div class="product-grid-5">
            <div
              v-for="(prod, i) in displayList1"
              :key="prod.id || i"
              class="clubi-exact-card"
            >
              <NuxtLink :to="prod.id ? `/product/${prod.id}` : '/design?preset=tshirt'" class="card-img-wrapper">
                <img :src="prod.imageUrl || prod.fallbackImg" :alt="prod.title" loading="lazy" />
              </NuxtLink>
              <div class="card-info">
                <NuxtLink :to="prod.id ? `/product/${prod.id}` : '/design?preset=tshirt'" class="card-title-link">
                  <h3>{{ prod.title }}</h3>
                </NuxtLink>
                <div class="card-price-val">¥{{ prod.price || prod.fallbackPrice }}</div>
                <div class="card-stock-alert">热销现货 · 仅剩 {{ prod.stockAlert || 3 }} 件库存</div>
                <NuxtLink :to="prod.id ? `/product/${prod.id}` : '/design?preset=tshirt'" class="btn-green-buy">
                  立即定制
                </NuxtLink>
              </div>
            </div>
          </div>

          <button class="nav-arrow next-arrow">›</button>
        </div>

        <div class="section-dot-nav">
          <span class="dot active" />
          <span class="dot" />
          <span class="dot" />
        </div>
      </div>
    </section>

    <!-- ── 5. Section 2: "重磅垂感 · 经典热销款式" ── -->
    <section id="bestseller" class="clubi-section-block">
      <div class="section-container">
        <h2 class="section-main-title">重磅垂感 · 经典热销款式</h2>

        <div class="carousel-wrapper">
          <button class="nav-arrow prev-arrow">‹</button>

          <div class="product-grid-5">
            <div
              v-for="(prod, i) in displayList2"
              :key="prod.id || i"
              class="clubi-exact-card"
            >
              <NuxtLink :to="prod.id ? `/product/${prod.id}` : '/design?preset=tshirt'" class="card-img-wrapper">
                <img :src="prod.imageUrl || prod.fallbackImg" :alt="prod.title" loading="lazy" />
              </NuxtLink>
              <div class="card-info">
                <NuxtLink :to="prod.id ? `/product/${prod.id}` : '/design?preset=tshirt'" class="card-title-link">
                  <h3>{{ prod.title }}</h3>
                </NuxtLink>
                <div class="card-price-val">¥{{ prod.price || prod.fallbackPrice }}</div>
                <div class="card-installment-sub">支持一件起订 · 48h 极速印制发货</div>
                <div class="card-stock-alert">热销现货 · 仅剩 {{ prod.stockAlert || 2 }} 件</div>
                <NuxtLink :to="prod.id ? `/product/${prod.id}` : '/design?preset=tshirt'" class="btn-green-buy">
                  立即定制
                </NuxtLink>
              </div>
            </div>
          </div>

          <button class="nav-arrow next-arrow">›</button>
        </div>

        <div class="section-dot-nav">
          <span class="dot active" />
          <span class="dot" />
          <span class="dot" />
          <span class="dot" />
        </div>
      </div>
    </section>

    <!-- ── 6. Section 3: 3 大绿色宣传横幅 ── -->
    <section class="clubi-promo-banners">
      <div class="section-container">
        <div class="promo-grid-3">
          <NuxtLink to="/design?preset=tshirt" class="btn-large-green-promo">
            ✨ 开启在线 POD 创作
          </NuxtLink>
          <NuxtLink to="/design?preset=tshirt" class="btn-large-green-promo">
            🎨 浏览热门插画印花
          </NuxtLink>
          <NuxtLink to="/design?preset=tshirt" class="btn-large-green-promo">
            👕 定制团队服/情侣装
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ── 7. Section 4: 社群灵感墙 ("晒图社群 @yishe_design") ── -->
    <section class="clubi-insta-section">
      <div class="section-container text-center">
        <div class="insta-header">
          <svg class="insta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
          <h2>晒图社群 @yishe_design</h2>
        </div>

        <div class="insta-grid-4">
          <div class="insta-card">
            <img src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80" alt="穿搭社群灵感 1" />
          </div>
          <div class="insta-card">
            <img src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80" alt="穿搭社群灵感 2" />
            <div class="insta-overlay-badge">买家实拍秀 · 240g重磅</div>
          </div>
          <div class="insta-card">
            <img src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80" alt="穿搭社群灵感 3" />
            <div class="insta-overlay-caption">服装讲述的故事。每一件独立创作，都值得被温柔对待...</div>
          </div>
          <div class="insta-card quote-card">
            <div class="quote-box">
              <p>灵感不被定义。<br>只需尽情绽放。</p>
              <span>@yishe_design</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 8. Section 5: 4 大服务保障 ── -->
    <section class="clubi-props-section">
      <div class="section-container">
        <div class="props-grid-4">
          <div class="prop-item">
            <div class="prop-icon">💳</div>
            <h4>灵活支付方式</h4>
            <p>支持微信支付、支付宝与银联，数秒完成订单确认</p>
          </div>
          <div class="prop-item">
            <div class="prop-icon">💬</div>
            <h4>专属客户服务</h4>
            <p>工作日 09:00 - 18:00 在线解答印花与版型问题</p>
          </div>
          <div class="prop-item">
            <div class="prop-icon">🔄</div>
            <h4>品质售后无忧</h4>
            <p>印制瑕疵或质量问题支持无忧退换保障</p>
          </div>
          <div class="prop-item">
            <div class="prop-icon">🚚</div>
            <h4>全国满额包邮</h4>
            <p>全场订单实付满 ¥199 元即享普通快递免费包邮</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 9. Section 6: 周刊订阅栏 ── -->
    <section class="clubi-newsletter-section">
      <div class="section-container text-center">
        <h2>订阅衣设设计周刊</h2>
        <p>第一时间获取最新插画印花上新通知与专属优惠券！</p>

        <form class="newsletter-form" @submit.prevent>
          <input type="email" placeholder="请输入您的电子邮箱..." class="news-input" />
          <button type="submit" class="news-btn">立即订阅</button>
        </form>
      </div>
    </section>

    <!-- ── 10. 页脚 Footer ── -->
    <footer class="clubi-exact-footer">
      <div class="footer-top-container">
        <!-- Col 1: 品牌与联系信息 -->
        <div class="footer-col brand-col">
          <div class="footer-logo">
            <span class="logo-script">衣设</span>
            <span class="logo-sans">yishe</span>
          </div>
          <p class="brand-desc">
            服装讲述的故事！衣设 yishe 专注于时尚设计、POD 柔性定制与独立站设计师生态。
          </p>
          <div class="social-icons-row">
            <a href="#" class="social-icon">📷</a>
            <a href="#" class="social-icon">💬</a>
          </div>
          <div class="contact-details">
            <p>客服热线：400-888-2026</p>
            <p>商务合作：contact@yishe.com</p>
            <p>品牌总部：中国上海市静安区衣设设计中心</p>
          </div>
        </div>

        <!-- Col 2: 引导链接 -->
        <div class="footer-col">
          <h4>关于衣设</h4>
          <ul class="footer-links-list">
            <li><NuxtLink to="/about">品牌故事</NuxtLink></li>
            <li><NuxtLink to="/design">POD 设计器</NuxtLink></li>
            <li><a href="#new">新品首发</a></li>
            <li><a href="#bestseller">热销推荐</a></li>
          </ul>
        </div>

        <!-- Col 3: 服务条款 -->
        <div class="footer-col">
          <h4>服务条款</h4>
          <ul class="footer-links-list">
            <li><a href="#">配送与发货政策</a></li>
            <li><a href="#">支付方式说明</a></li>
            <li><a href="#">隐私保护政策</a></li>
            <li><a href="#">退换货与售后保障</a></li>
          </ul>
        </div>

        <!-- Col 4: 快捷订阅 -->
        <div class="footer-col">
          <h4>周刊订阅</h4>
          <div class="footer-mini-form">
            <input type="email" placeholder="输入邮箱" class="footer-input" />
            <button class="footer-btn">提交</button>
          </div>
        </div>
      </div>

      <!-- Bottom Copyright & Payment Methods Line -->
      <div class="footer-bottom-bar">
        <div class="section-container bottom-flex">
          <div class="payment-badges">
            <span class="pay-chip">微信支付</span>
            <span class="pay-chip">支付宝</span>
            <span class="pay-chip">银联在线</span>
          </div>
          <div class="copyright-text">
            Copyright 衣设 yishe - 2026. All rights reserved. 沪ICP备20260001号
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePublishedProducts, type StorefrontPublishedProduct } from '~/composables/use-published-products'

definePageMeta({ layout: false })

useSeoMeta({
  title: '纯棉 T恤专属频道 · 0 胶感透气印花定制 · 衣设 yishe',
  ogTitle: '纯棉 T恤专属频道 · 0 胶感透气印花定制 · 衣设 yishe',
  description: '衣设 yishe 纯棉 T恤频道，100% 精梳双纱纯棉，0 胶感 DTG 数码直喷，领口防变形压条，支持一件起订与极速发货。',
  keywords: 'T恤定制, POD短袖, 衣设yishe, 240g重磅T恤, 纯棉T恤定制'
})

// High-fidelity fallback product data with Chinese titles & yishe system details
const fallbackProducts1 = [
  { id: '', title: '【纯棉重磅】日系猫咪插画短袖 T恤 #1346', fallbackPrice: 98, stockAlert: 3, fallbackImg: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=80' },
  { id: '', title: '【复古洗水】弗里达艺术烫画 T恤 #1347', fallbackPrice: 98, stockAlert: 2, fallbackImg: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&auto=format&fit=crop&q=80' },
  { id: '', title: '【宽松垂感】度假风植物印花 T恤 #1345', fallbackPrice: 98, stockAlert: 5, fallbackImg: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&auto=format&fit=crop&q=80' },
  { id: '', title: '【极简街头】抽象线条花卉 T恤 #1279', fallbackPrice: 98, stockAlert: 2, fallbackImg: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&auto=format&fit=crop&q=80' },
  { id: '', title: '【240g双纱】飞鸟森林艺术 T恤 #1275', fallbackPrice: 98, stockAlert: 4, fallbackImg: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&auto=format&fit=crop&q=80' }
]

const fallbackProducts2 = [
  { id: '', title: '【Godê 垂感】绿叶诗意落叶 T恤 #1321', fallbackPrice: 139, stockAlert: 2, fallbackImg: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&auto=format&fit=crop&q=80' },
  { id: '', title: '【Godê 垂感】现代抽象几何 T恤 #1316', fallbackPrice: 139, stockAlert: 3, fallbackImg: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=80' },
  { id: '', title: '【Godê 垂感】秋日暖色调艺术 T恤 #1225', fallbackPrice: 139, stockAlert: 2, fallbackImg: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&auto=format&fit=crop&q=80' },
  { id: '', title: '【Godê 垂感】油画感山茶花 T恤 #1279', fallbackPrice: 139, stockAlert: 4, fallbackImg: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&auto=format&fit=crop&q=80' },
  { id: '', title: '【Godê 垂感】红梅绽放金丝 T恤 #1281', fallbackPrice: 139, stockAlert: 3, fallbackImg: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&auto=format&fit=crop&q=80' }
]

const { fetchPublishedProducts } = usePublishedProducts()
const loading = ref(true)
const products = ref<StorefrontPublishedProduct[]>([])

const displayList1 = computed(() => {
  if (products.value && products.value.length >= 5) {
    return products.value.slice(0, 5)
  }
  return fallbackProducts1
})

const displayList2 = computed(() => {
  if (products.value && products.value.length >= 10) {
    return products.value.slice(5, 10)
  }
  return fallbackProducts2
})

onMounted(async () => {
  loading.value = true
  try {
    const res = await fetchPublishedProducts({ type: 'T恤', pageSize: 20 })
    products.value = res || []
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Noto+Serif+SC:wght@700;900&family=Inter:wght@400;600;700;800&display=swap');

.clubi-exact-page {
  --bg-page: #FFFFFF;
  --bg-dark: #2E2E2E;
  --bg-sub-dark: #3A3A3A;
  --green-btn: #4DC247;
  --green-btn-hover: #43A93E;
  --red-alert: #E74C3C;
  --text-dark: #2D2D2D;
  --text-muted: #666666;
  --border-light: #E5E7EB;

  min-height: 100vh;
  background: var(--bg-page);
  color: var(--text-dark);
  font-family: 'Inter', sans-serif;
}

/* 1. Top Announcement Bar */
.clubi-top-announcement { background: var(--bg-dark); color: #FFFFFF; font-size: 11.5px; font-weight: 700; padding: 7px 16px; display: flex; justify-content: center; align-items: center; gap: 16px; letter-spacing: 0.04em; }
.arrow-btn { background: none; border: none; color: #FFFFFF; font-size: 14px; cursor: pointer; opacity: 0.7; }

/* 2. Main Header Navbar */
.clubi-main-header { background: #FFFFFF; border-bottom: 1px solid var(--border-light); }
.header-top-row { max-width: 1240px; margin: 0 auto; padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
.clubi-logo-brand { text-decoration: none; color: var(--text-dark); display: flex; align-items: baseline; gap: 4px; }
.logo-script { font-family: 'Noto Serif SC', serif; font-size: 28px; font-weight: 900; color: #111827; }
.logo-sans { font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 800; color: #374151; }

.header-search-bar { flex: 1; max-width: 580px; display: flex; border: 1px solid #D1D5DB; border-radius: 6px; overflow: hidden; }
.search-input { flex: 1; border: none; padding: 10px 16px; font-size: 13.5px; outline: none; color: var(--text-dark); }
.search-btn { background: #E5E7EB; border: none; width: 44px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
.search-btn svg { width: 18px; height: 18px; stroke: #4B5563; }

.header-user-actions { display: flex; align-items: center; gap: 18px; }
.action-item svg { width: 22px; height: 22px; stroke: var(--text-dark); }
.cart-link { position: relative; display: flex; align-items: center; text-decoration: none; color: var(--text-dark); }
.cart-badge-count { position: absolute; top: -6px; right: -8px; font-size: 10px; font-weight: 800; background: var(--text-dark); color: #FFF; width: 16px; height: 16px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }

/* Bottom Category Navigation Bar */
.header-cat-bar { border-top: 1px solid var(--border-light); padding: 10px 24px; display: flex; align-items: center; justify-content: center; gap: 12px; max-width: 1240px; margin: 0 auto; }
.cat-arrow { background: none; border: none; font-size: 16px; color: var(--text-muted); cursor: pointer; }
.cat-nav-list { display: flex; gap: 24px; overflow-x: auto; white-space: nowrap; font-size: 12px; font-weight: 700; letter-spacing: 0.05em; }
.cat-item { color: var(--text-dark); text-decoration: none; transition: color 0.2s; }
.highlight-orange { color: #D35400 !important; }

/* 3. Hero Carousel Banner */
.clubi-hero-banner { position: relative; background: #F3F4F6; height: 420px; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid var(--border-light); }
.hero-arrow { position: absolute; top: 50%; transform: translateY(-50%); background: none; border: none; font-size: 32px; color: var(--text-dark); cursor: pointer; padding: 10px 20px; z-index: 5; opacity: 0.6; }
.hero-prev { left: 16px; }
.hero-next { right: 16px; }
.hero-slide-container { text-align: center; max-width: 600px; padding: 0 24px; }
.slide-badge { font-size: 12px; font-weight: 700; color: #D35400; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px; display: inline-block; }
.hero-slide-container h1 { font-size: 2.8rem; font-weight: 800; margin-bottom: 12px; color: var(--text-dark); }
.hero-slide-container p { font-size: 1.05rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 24px; }
.btn-hero-action { display: inline-block; background: var(--green-btn); color: #FFF; font-weight: 800; padding: 12px 28px; border-radius: 6px; text-decoration: none; transition: background 0.2s; }
.btn-hero-action:hover { background: var(--green-btn-hover); }
.hero-dots { position: absolute; bottom: 16px; display: flex; gap: 8px; }

/* Dots indicator */
.dot { width: 8px; height: 8px; border-radius: 50%; background: #D1D5DB; display: inline-block; }
.dot.active { background: var(--text-dark); }

/* 4. Section Blocks & 5-Column Grid */
.clubi-section-block { padding: 60px 24px; }
.section-container { max-width: 1240px; margin: 0 auto; }
.section-main-title { font-size: 2rem; font-weight: 800; color: var(--text-dark); margin-bottom: 32px; text-align: left; }

.carousel-wrapper { position: relative; display: flex; align-items: center; }
.nav-arrow { position: absolute; background: none; border: none; font-size: 28px; color: var(--text-dark); cursor: pointer; z-index: 5; opacity: 0.6; padding: 10px; }
.prev-arrow { left: -28px; }
.next-arrow { right: -28px; }

.product-grid-5 { display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; width: 100%; }
@media (max-width: 1024px) { .product-grid-5 { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 640px) { .product-grid-5 { grid-template-columns: repeat(2, 1fr); } }

.clubi-exact-card { display: flex; flex-direction: column; background: #FFFFFF; border-radius: 4px; overflow: hidden; }
.card-img-wrapper { width: 100%; padding-top: 125%; position: relative; background: #F9FAFB; overflow: hidden; display: block; }
.card-img-wrapper img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease; }
.card-img-wrapper:hover img { transform: scale(1.05); }

.card-info { padding: 14px 0 0; text-align: left; display: flex; flex-direction: column; flex: 1; }
.card-title-link { text-decoration: none; color: var(--text-dark); margin-bottom: 6px; }
.card-info h3 { font-size: 13.5px; font-weight: 600; color: var(--text-dark); margin: 0; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.card-price-val { font-size: 16px; font-weight: 800; color: var(--text-dark); margin-bottom: 2px; }
.card-installment-sub { font-size: 11px; color: var(--text-muted); margin-bottom: 4px; }
.card-stock-alert { font-size: 11.5px; font-weight: 700; color: var(--red-alert); margin-bottom: 12px; }

.btn-green-buy { display: block; text-align: center; background: var(--green-btn); color: #FFFFFF; font-weight: 800; font-size: 13px; padding: 9px; border-radius: 6px; text-decoration: none; transition: background 0.2s; margin-top: auto; }
.btn-green-buy:hover { background: var(--green-btn-hover); }

.section-dot-nav { display: flex; justify-content: center; gap: 8px; margin-top: 24px; }

/* 5. 3 Green Promo CTA Banners */
.clubi-promo-banners { padding: 20px 24px 60px; }
.promo-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
@media (max-width: 768px) { .promo-grid-3 { grid-template-columns: 1fr; } }
.btn-large-green-promo { display: flex; align-items: center; justify-content: center; background: var(--green-btn); color: #FFFFFF; font-weight: 800; font-size: 16px; padding: 18px; border-radius: 8px; text-decoration: none; transition: background 0.2s, transform 0.2s; box-shadow: 0 4px 12px rgba(77, 194, 71, 0.2); }
.btn-large-green-promo:hover { background: var(--green-btn-hover); transform: translateY(-2px); }

/* 6. Instagram Section */
.clubi-insta-section { padding: 60px 24px; background: #FFFFFF; }
.insta-header { display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 32px; }
.insta-icon { width: 28px; height: 28px; stroke: var(--text-dark); }
.insta-header h2 { font-size: 1.8rem; font-weight: 800; color: var(--text-dark); margin: 0; }

.insta-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
@media (max-width: 768px) { .insta-grid-4 { grid-template-columns: repeat(2, 1fr); } }
.insta-card { position: relative; width: 100%; padding-top: 100%; border-radius: 8px; overflow: hidden; background: #F3F4F6; }
.insta-card img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.insta-overlay-badge { position: absolute; bottom: 12px; left: 12px; background: rgba(0,0,0,0.7); color: #FFF; font-size: 11px; padding: 4px 8px; border-radius: 4px; }
.insta-overlay-caption { position: absolute; bottom: 12px; left: 12px; right: 12px; background: rgba(0,0,0,0.75); color: #FFF; font-size: 11px; padding: 8px; border-radius: 4px; line-height: 1.4; }

.quote-card { background: #FDE68A !important; display: flex; align-items: center; justify-content: center; }
.quote-box { position: absolute; inset: 0; padding: 24px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; }
.quote-box p { font-family: 'Ma Shan Zheng', cursive; font-size: 26px; font-weight: 700; color: var(--text-dark); line-height: 1.3; margin-bottom: 8px; }
.quote-box span { font-size: 11px; font-weight: 700; color: #78350F; }

/* 7. Value Props Section */
.clubi-props-section { padding: 50px 24px; border-top: 1px solid var(--border-light); border-bottom: 1px solid var(--border-light); background: #FFFFFF; }
.props-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; text-align: center; }
@media (max-width: 768px) { .props-grid-4 { grid-template-columns: repeat(2, 1fr); } }
.prop-icon { font-size: 32px; margin-bottom: 10px; }
.prop-item h4 { font-size: 15px; font-weight: 800; margin-bottom: 6px; color: var(--text-dark); }
.prop-item p { font-size: 12.5px; color: var(--text-muted); line-height: 1.4; margin: 0; }

/* 8. Newsletter Section */
.clubi-newsletter-section { padding: 60px 24px; background: var(--bg-sub-dark); color: #FFFFFF; }
.clubi-newsletter-section h2 { font-size: 2rem; font-weight: 800; margin-bottom: 8px; }
.clubi-newsletter-section p { font-size: 14px; opacity: 0.8; margin-bottom: 24px; }
.newsletter-form { max-width: 500px; margin: 0 auto; display: flex; gap: 10px; }
.news-input { flex: 1; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; padding: 12px 16px; color: #FFF; font-size: 14px; outline: none; }
.news-btn { background: var(--bg-dark); color: #FFF; border: 1px solid rgba(255,255,255,0.3); padding: 12px 24px; border-radius: 6px; font-weight: 800; font-size: 14px; cursor: pointer; }

/* 9. Footer */
.clubi-exact-footer { background: var(--bg-dark); color: #FFFFFF; padding-top: 60px; font-size: 13px; }
.footer-top-container { max-width: 1240px; margin: 0 auto; padding: 0 24px 50px; display: grid; grid-template-columns: 2fr 1fr 1fr 1.2fr; gap: 40px; }
@media (max-width: 1024px) { .footer-top-container { grid-template-columns: 1fr 1fr; } }
@media (max-width: 640px) { .footer-top-container { grid-template-columns: 1fr; } }

.brand-col .footer-logo { margin-bottom: 14px; }
.brand-desc { opacity: 0.75; line-height: 1.6; margin-bottom: 20px; font-size: 13px; }
.social-icons-row { display: flex; gap: 12px; margin-bottom: 20px; font-size: 20px; }
.contact-details p { opacity: 0.7; margin-bottom: 6px; font-size: 12.5px; }

.footer-col h4 { font-size: 15px; font-weight: 800; margin-bottom: 18px; color: #FFFFFF; }
.footer-links-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
.footer-links-list a { color: #FFFFFF; opacity: 0.75; text-decoration: none; transition: opacity 0.2s; }
.footer-links-list a:hover { opacity: 1; }

.footer-mini-form { display: flex; flex-direction: column; gap: 10px; }
.footer-input { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; padding: 10px 14px; color: #FFF; font-size: 13px; outline: none; }
.footer-btn { background: #444; color: #FFF; border: none; padding: 10px; border-radius: 4px; font-weight: 800; cursor: pointer; }

.footer-bottom-bar { border-top: 1px solid rgba(255,255,255,0.1); padding: 24px 0; background: #222222; }
.bottom-flex { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; font-size: 12px; opacity: 0.7; }
.payment-badges { display: flex; gap: 8px; }
.pay-chip { background: #333; padding: 4px 8px; border-radius: 4px; font-weight: 800; font-size: 10px; }
</style>
