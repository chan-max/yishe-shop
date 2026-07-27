<template>
  <div class="wa-page">
    <header class="wa-header">
      <div class="wa-header__inner">
        <a href="/" class="wa-logo">
          <span class="wa-logo__emoji">🖼️</span>
          <span class="wa-logo__text">墙面艺术馆</span>
        </a>
        <nav class="wa-nav">
          <a href="#categories" class="wa-nav__link">分类</a>
          <a href="#products" class="wa-nav__link">全部作品</a>
          <a href="#about" class="wa-nav__link">关于</a>
          <a href="#contact" class="wa-nav__link">联系</a>
        </nav>
        <div class="wa-header__actions">
          <a href="/login" class="wa-login-btn">登录</a>
          <button
            class="wa-hamburger"
            :class="{ 'wa-hamburger--open': mobileMenuOpen }"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      <div
        class="wa-mobile-menu"
        :class="{ 'wa-mobile-menu--open': mobileMenuOpen }"
      >
        <a href="#categories" class="wa-mobile-menu__link" @click="mobileMenuOpen = false">分类</a>
        <a href="#products" class="wa-mobile-menu__link" @click="mobileMenuOpen = false">全部作品</a>
        <a href="#about" class="wa-mobile-menu__link" @click="mobileMenuOpen = false">关于</a>
        <a href="#contact" class="wa-mobile-menu__link" @click="mobileMenuOpen = false">联系</a>
        <a href="/login" class="wa-mobile-menu__link wa-mobile-menu__link--accent" @click="mobileMenuOpen = false">登录</a>
      </div>
    </header>

    <section class="wa-hero">
      <div class="wa-hero__inner">
        <p class="wa-hero__eyebrow">WALL ART · CONTEMPORARY LIVING</p>
        <h1 class="wa-hero__title">为每一面墙注入艺术灵魂</h1>
        <p class="wa-hero__desc">现代装饰画、抽象艺术与创意挂画定制。从客厅到卧室，从办公室到咖啡馆，让空间讲述你的故事。</p>
        <a href="#products" class="wa-hero__cta">探索装饰画</a>
      </div>
    </section>

    <section id="categories" class="wa-categories">
      <div class="wa-categories__inner">
        <h2 class="wa-section-title">浏览分类</h2>
        <div class="wa-categories__scroll">
          <a
            v-for="cat in categories"
            :key="cat.id"
            href="#products"
            class="wa-pill"
          >
            <span class="wa-pill__dot" :style="{ backgroundColor: cat.color }"></span>
            <span class="wa-pill__label">{{ cat.name }}</span>
          </a>
        </div>
      </div>
    </section>

    <section id="products" class="wa-products">
      <div class="wa-products__inner">
        <h2 class="wa-section-title">精选作品</h2>
        <div class="wa-masonry">
          <a
            v-for="p in products"
            :key="p.id"
            :href="`/products/${p.slug || p.id}`"
            class="wa-card"
          >
            <div class="wa-card__img-wrap">
              <img
                :src="p.cover || p.image"
                :alt="p.title"
                class="wa-card__img"
                loading="lazy"
              />
              <div class="wa-card__overlay">
                <span class="wa-card__overlay-title">{{ p.title }}</span>
                <span class="wa-card__overlay-price">¥{{ p.price }}</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>

    <footer id="contact" class="wa-footer">
      <div class="wa-footer__inner">
        <div class="wa-footer__brand">
          <span class="wa-footer__logo">🖼️ 墙面艺术馆</span>
          <p class="wa-footer__tagline">为每一面墙注入艺术灵魂</p>
        </div>
        <div class="wa-footer__col">
          <h4 class="wa-footer__col-title">探索</h4>
          <a href="#categories" class="wa-footer__link">全部分类</a>
          <a href="#products" class="wa-footer__link">精选作品</a>
          <a href="#about" class="wa-footer__link">关于我们</a>
        </div>
        <div class="wa-footer__col">
          <h4 class="wa-footer__col-title">服务</h4>
          <a href="#" class="wa-footer__link">定制挂画</a>
          <a href="#" class="wa-footer__link">空间搭配</a>
          <a href="#" class="wa-footer__link">企业采购</a>
        </div>
        <div class="wa-footer__col">
          <h4 class="wa-footer__col-title">支持</h4>
          <a href="#" class="wa-footer__link">配送说明</a>
          <a href="#" class="wa-footer__link">退换政策</a>
          <a href="#" class="wa-footer__link">联系我们</a>
        </div>
      </div>
      <div class="wa-footer__bottom">
        <span>© 2024 墙面艺术馆 All rights reserved.</span>
      </div>
    </footer>

    <button
      v-show="showBackToTop"
      class="wa-back-top"
      @click="scrollToTop"
    >
      ↑
    </button>
  </div>
</template>

<script setup>
import cfg from '../site.config'
import { usePublishedProducts } from '~/composables/use-published-products'

definePageMeta({ layout: false })

useHead({
  title: cfg.seo.title,
  meta: [
    { name: 'description', content: cfg.seo.description },
    { property: 'og:title', content: cfg.seo.ogTitle },
    { property: 'og:description', content: cfg.seo.ogDescription },
  ],
})

const mobileMenuOpen = ref(false)
const showBackToTop = ref(false)

const { data: publishedProducts } = await usePublishedProducts()

const products = computed(() => {
  return (publishedProducts.value || []).map((item) => ({
    id: item.id,
    slug: item.slug || item.id,
    title: item.title || item.name,
    cover: item.cover || item.image || '/placeholder.jpg',
    price: item.price || 0,
  }))
})

const categories = [
  { id: 1, name: '抽象艺术', color: '#5b7e8a' },
  { id: 2, name: '风景装饰', color: '#7a9e6e' },
  { id: 3, name: '现代极简', color: '#c4a35a' },
  { id: 4, name: '人像艺术', color: '#8a6b5e' },
  { id: 5, name: '植物花卉', color: '#6e9e8a' },
  { id: 6, name: '城市建筑', color: '#6b7e9e' },
  { id: 7, name: '创意挂画', color: '#9e6b7e' },
  { id: 8, name: '儿童房', color: '#d4a0c0' },
  { id: 9, name: '黑白摄影', color: '#555555' },
  { id: 10, name: '金属质感', color: '#8a8a8a' },
]

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    showBackToTop.value = window.scrollY > 400
  })
})
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: "Noto Serif SC", "Source Han Serif CN", Georgia, "Times New Roman", serif;
  background: #fafafa;
  color: #222;
  line-height: 1.6;
}

a {
  text-decoration: none;
  color: inherit;
}

img {
  display: block;
  max-width: 100%;
}

/* ── Header ── */
.wa-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(250, 250, 250, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.wa-header__inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.wa-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 18px;
  letter-spacing: 0.02em;
}

.wa-logo__emoji {
  font-size: 24px;
}

.wa-nav {
  display: flex;
  gap: 32px;
}

.wa-nav__link {
  font-size: 14px;
  letter-spacing: 0.04em;
  color: #555;
  transition: color 0.2s;
}

.wa-nav__link:hover {
  color: #5b7e8a;
}

.wa-header__actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.wa-login-btn {
  font-size: 13px;
  padding: 6px 18px;
  border: 1px solid #5b7e8a;
  border-radius: 4px;
  color: #5b7e8a;
  transition: all 0.2s;
}

.wa-login-btn:hover {
  background: #5b7e8a;
  color: #fff;
}

.wa-hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
}

.wa-hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background: #222;
  border-radius: 1px;
  transition: all 0.3s;
}

.wa-hamburger--open span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.wa-hamburger--open span:nth-child(2) {
  opacity: 0;
}

.wa-hamburger--open span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

.wa-mobile-menu {
  display: none;
  flex-direction: column;
  padding: 0 24px 24px;
  gap: 4px;
}

.wa-mobile-menu--open {
  display: flex;
}

.wa-mobile-menu__link {
  font-size: 15px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  color: #444;
}

.wa-mobile-menu__link--accent {
  color: #5b7e8a;
  font-weight: 600;
  border-bottom: none;
  margin-top: 8px;
}

@media (max-width: 768px) {
  .wa-nav {
    display: none;
  }

  .wa-login-btn {
    display: none;
  }

  .wa-hamburger {
    display: flex;
  }
}

/* ── Hero ── */
.wa-hero {
  min-height: 70vh;
  min-height: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e8e4de 0%, #d4e4ea 50%, #f0e8e2 100%);
  text-align: center;
  padding: 80px 24px;
}

.wa-hero__inner {
  max-width: 680px;
}

.wa-hero__eyebrow {
  font-size: 12px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #888;
  margin-bottom: 20px;
}

.wa-hero__title {
  font-size: clamp(28px, 5vw, 48px);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 16px;
  color: #222;
}

.wa-hero__desc {
  font-size: clamp(14px, 2vw, 16px);
  color: #666;
  margin-bottom: 32px;
  line-height: 1.8;
}

.wa-hero__cta {
  display: inline-block;
  padding: 14px 36px;
  background: #5b7e8a;
  color: #fff;
  font-size: 15px;
  letter-spacing: 0.06em;
  border-radius: 4px;
  transition: background 0.2s, transform 0.2s;
}

.wa-hero__cta:hover {
  background: #4a6b75;
  transform: translateY(-1px);
}

/* ── Section Title ── */
.wa-section-title {
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 0.02em;
  margin-bottom: 24px;
  color: #222;
}

/* ── Categories (horizontal scroll pills) ── */
.wa-categories {
  padding: 64px 24px;
  background: #fafafa;
}

.wa-categories__inner {
  max-width: 1280px;
  margin: 0 auto;
}

.wa-categories__scroll {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 8px;
  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;
  -webkit-overflow-scrolling: touch;
}

.wa-categories__scroll::-webkit-scrollbar {
  height: 4px;
}

.wa-categories__scroll::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 2px;
}

.wa-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  padding: 10px 20px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 999px;
  font-size: 14px;
  color: #444;
  transition: all 0.2s;
  cursor: pointer;
  white-space: nowrap;
}

.wa-pill:hover {
  border-color: #5b7e8a;
  color: #5b7e8a;
  box-shadow: 0 2px 8px rgba(91, 126, 138, 0.1);
}

.wa-pill__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* ── Products (masonry columns) ── */
.wa-products {
  padding: 0 24px 64px;
  background: #fafafa;
}

.wa-products__inner {
  max-width: 1280px;
  margin: 0 auto;
}

.wa-masonry {
  column-count: 4;
  column-gap: 16px;
}

.wa-card {
  break-inside: avoid;
  margin-bottom: 16px;
  border-radius: 6px;
  overflow: hidden;
  background: #fff;
  display: block;
}

.wa-card__img-wrap {
  position: relative;
  overflow: hidden;
}

.wa-card__img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.4s ease;
}

.wa-card:hover .wa-card__img {
  transform: scale(1.04);
}

.wa-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.72) 0%, transparent 50%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 16px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.wa-card:hover .wa-card__overlay {
  opacity: 1;
}

.wa-card__overlay-title {
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.3;
}

.wa-card__overlay-price {
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
  margin-top: 4px;
}

@media (max-width: 1024px) {
  .wa-masonry {
    column-count: 3;
  }
}

@media (max-width: 768px) {
  .wa-masonry {
    column-count: 2;
    column-gap: 10px;
  }

  .wa-card {
    margin-bottom: 10px;
  }
}

/* ── Footer ── */
.wa-footer {
  background: #222;
  color: #ccc;
  padding: 56px 24px 0;
}

.wa-footer__inner {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 40px;
}

.wa-footer__logo {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
}

.wa-footer__tagline {
  font-size: 13px;
  color: #999;
  margin-top: 8px;
}

.wa-footer__col-title {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 16px;
}

.wa-footer__link {
  display: block;
  font-size: 14px;
  color: #aaa;
  padding: 4px 0;
  transition: color 0.2s;
}

.wa-footer__link:hover {
  color: #fff;
}

.wa-footer__bottom {
  max-width: 1280px;
  margin: 40px auto 0;
  padding: 20px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 12px;
  color: #777;
}

@media (max-width: 768px) {
  .wa-footer__inner {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
}

@media (max-width: 480px) {
  .wa-footer__inner {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

/* ── Back to Top ── */
.wa-back-top {
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #5b7e8a;
  color: #fff;
  border: none;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 12px rgba(91, 126, 138, 0.3);
  transition: background 0.2s, transform 0.2s;
  z-index: 90;
}

.wa-back-top:hover {
  background: #4a6b75;
  transform: translateY(-2px);
}
</style>
