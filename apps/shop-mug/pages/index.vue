<template>
  <div class="mug-site">
    <header class="header" :class="{ scrolled }">
      <div class="header-inner">
        <NuxtLink to="/" class="logo">☕ <span>MugAtelier</span></NuxtLink>
        <nav class="nav">
          <NuxtLink v-for="n in cfg.nav" :key="n.to" :to="n.to" class="nav-link">{{ n.label }}</NuxtLink>
        </nav>
        <div class="header-right">
          <NuxtLink to="/login" class="icon-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </NuxtLink>
        </div>
        <button class="burger" @click="menuOpen = !menuOpen"><span/><span/><span/></button>
      </div>
    </header>

    <div class="drawer" :class="{ open: menuOpen }" @click.self="menuOpen = false">
      <div class="drawer-panel">
        <NuxtLink v-for="n in cfg.nav" :key="n.to" :to="n.to" class="drawer-link" @click="menuOpen = false">{{ n.label }}</NuxtLink>
      </div>
    </div>

    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg"/>
      <div class="hero-content">
        <p class="hero-eyebrow">{{ cfg.hero.eyebrow }}</p>
        <h1>{{ cfg.hero.title }}</h1>
        <p class="hero-desc">{{ cfg.hero.desc }}</p>
        <NuxtLink to="/search" class="hero-cta">{{ cfg.hero.cta }}</NuxtLink>
      </div>
    </section>

    <!-- Categories -->
    <section class="section">
      <div class="container">
        <div class="section-head"><h2>杯具分类</h2><NuxtLink to="/search" class="more-link">查看全部 →</NuxtLink></div>
        <div class="cat-grid">
          <NuxtLink v-for="c in cfg.categories" :key="c.slug" :to="`/search?type=${c.slug}`" class="cat-card">
            <div class="cat-img" :style="{ background: catColors[c.slug] || '#f5efe6' }">
              <img v-if="getCatImg(c.slug)" :src="getCatImg(c.slug)" :alt="c.name" loading="lazy"/>
            </div>
            <span class="cat-name">{{ c.name }}</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Products -->
    <section class="section section--alt">
      <div class="container">
        <div class="section-head"><h2>热门杯具</h2><NuxtLink to="/search" class="more-link">查看全部 →</NuxtLink></div>
        <div v-if="loading" class="loading">加载中…</div>
        <div v-else class="product-grid">
          <NuxtLink v-for="p in products" :key="p.id" :to="getPath(p)" class="product-card">
            <div class="product-img"><img v-if="getImg(p)" :src="getImg(p)" :alt="p.title" loading="lazy"/><span v-if="p.originalPrice > p.price" class="sale">{{ Math.round((1 - p.price / p.originalPrice) * 100) }}% OFF</span></div>
            <div class="product-meta"><h3>{{ p.title }}</h3><span class="price" v-if="p.price">¥{{ p.price }}</span></div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container footer-grid">
        <div class="footer-brand"><span class="footer-logo">{{ cfg.emoji }} {{ cfg.brand }}</span><p>{{ cfg.footer.desc }}</p></div>
        <div v-for="col in cfg.footer.cols" :key="col.title" class="footer-col"><h4>{{ col.title }}</h4><NuxtLink v-for="l in col.links" :key="l.label" :to="l.to">{{ l.label }}</NuxtLink></div>
      </div>
      <div class="footer-bottom">© 2026 {{ cfg.brand }}. All rights reserved.</div>
    </footer>

    <button v-show="scrolled" class="top-btn" @click="window.scrollTo({top:0,behavior:'smooth'})">↑</button>
  </div>
</template>

<script setup lang="ts">
import cfg from '../site.config';
import { usePublishedProducts } from '~/composables/use-published-products';

definePageMeta({ layout: false });

useSeoMeta({ title: cfg.seo.title, description: cfg.seo.description, ogTitle: cfg.seo.ogTitle, ogDescription: cfg.seo.ogDescription });
useHead({ htmlAttrs: { lang: 'zh-CN' }, link: [{ rel: 'icon', type: 'image/svg+xml', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>☕</text></svg>' }] });

const { fetchPublishedProducts, getPublishedProductImage: getImg, getPublishedProductPath: getPath } = usePublishedProducts();

const loading = ref(true);
const products = ref<any[]>([]);
const scrolled = ref(false);
const menuOpen = ref(false);

const catColors: Record<string, string> = { '咖啡杯': '#f5efe6', '陶瓷杯': '#e8e0d4', '保温杯': '#dce5e8', '马克杯': '#f0e8dc', '茶杯': '#e4ebe0', '玻璃杯': '#e8e4f0' };

function getCatImg(slug: string) {
  const m = products.value.find(p => (p.type || p.category || '').toLowerCase().includes(slug));
  return m ? getImg(m, 600) : '';
}

onMounted(async () => {
  try { products.value = (await fetchPublishedProducts({ pageSize: 12, random: true })) || []; } catch {} finally { loading.value = false; }
  addEventListener('scroll', () => { scrolled.value = scrollY > 50; });
});
</script>

<style>
/* ===== MUG SITE — 暖色手工质感 ===== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
.mug-site { font-family: "Noto Serif SC", "Georgia", serif; color: #3d2b1f; background: #faf8f5; line-height: 1.6; }
.mug-site a { color: inherit; text-decoration: none; }

.container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }

/* Header */
.header { position: sticky; top: 0; z-index: 100; background: rgba(250,248,245,0.92); backdrop-filter: blur(12px); border-bottom: 1px solid #e8e0d4; transition: box-shadow .3s; }
.header.scrolled { box-shadow: 0 2px 12px rgba(61,43,31,0.08); }
.header-inner { display: flex; align-items: center; justify-content: space-between; height: 60px; max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
.logo { display: flex; align-items: center; gap: .5rem; font-size: 1.1rem; font-weight: 700; }
.nav { display: flex; gap: 1.5rem; }
.nav-link { font-size: .85rem; color: #8b7355; transition: color .2s; }
.nav-link:hover { color: #c4704b; }
.header-right { display: flex; gap: .75rem; }
.icon-btn { display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%; transition: background .2s; }
.icon-btn:hover { background: #f0e8dc; }
.icon-btn svg { width: 20px; height: 20px; }
.burger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
.burger span { display: block; width: 22px; height: 2px; background: #3d2b1f; border-radius: 1px; }
@media (max-width: 768px) { .nav { display: none; } .burger { display: flex; } }

/* Drawer */
.drawer { position: fixed; inset: 0; z-index: 200; background: rgba(0,0,0,0.3); opacity: 0; pointer-events: none; transition: opacity .3s; }
.drawer.open { opacity: 1; pointer-events: auto; }
.drawer-panel { position: fixed; top: 0; left: 0; bottom: 0; width: 280px; background: #fff; padding: 2rem 1.5rem; transform: translateX(-100%); transition: transform .3s; display: flex; flex-direction: column; gap: .5rem; }
.drawer.open .drawer-panel { transform: translateX(0); }
.drawer-link { padding: .75rem 1rem; border-radius: 8px; font-size: .95rem; color: #5a4a3a; transition: background .15s; }
.drawer-link:hover { background: #f5efe6; color: #c4704b; }

/* Hero */
.hero { position: relative; min-height: 520px; display: flex; align-items: flex-end; overflow: hidden; }
.hero-bg { position: absolute; inset: 0; background: linear-gradient(135deg, #f5efe6 0%, #e8ddd0 40%, #d4c4b0 100%); }
.hero-bg::after { content: ''; position: absolute; inset: 0; background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c4704b' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); }
.hero-content { position: relative; z-index: 1; padding: 4rem 2rem; max-width: 1200px; margin: 0 auto; width: 100%; }
.hero-eyebrow { font-size: .75rem; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: #c4704b; margin-bottom: .75rem; }
.hero h1 { font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 800; line-height: 1.15; margin-bottom: 1rem; color: #2c1810; }
.hero-desc { font-size: 1rem; color: #6b5a4a; max-width: 480px; margin-bottom: 1.5rem; line-height: 1.7; }
.hero-cta { display: inline-block; padding: .85rem 2rem; background: #c4704b; color: #fff; border-radius: 999px; font-size: .9rem; font-weight: 600; transition: background .2s, transform .2s; }
.hero-cta:hover { background: #a85a3a; transform: translateY(-1px); }

/* Section */
.section { padding: 4rem 0; }
.section--alt { background: #f0ebe4; }
.section-head { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 1.5rem; }
.section-head h2 { font-size: 1.4rem; font-weight: 700; }
.more-link { font-size: .85rem; color: #c4704b; font-weight: 500; }

/* Categories */
.cat-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 1rem; }
@media (max-width: 768px) { .cat-grid { grid-template-columns: repeat(2, 1fr); } }
.cat-card { display: flex; flex-direction: column; align-items: center; text-decoration: none; transition: transform .25s; }
.cat-card:hover { transform: translateY(-4px); }
.cat-img { width: 100%; aspect-ratio: 4/5; border-radius: 12px; overflow: hidden; position: relative; }
.cat-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s; }
.cat-card:hover .cat-img img { transform: scale(1.06); }
.cat-name { margin-top: .5rem; font-size: .85rem; font-weight: 600; color: #5a4a3a; }

/* Products */
.product-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
@media (max-width: 768px) { .product-grid { grid-template-columns: repeat(2, 1fr); gap: .75rem; } }
.product-card { display: block; text-decoration: none; color: inherit; transition: transform .25s; }
.product-card:hover { transform: translateY(-3px); }
.product-img { position: relative; aspect-ratio: 1; border-radius: 10px; overflow: hidden; background: #e8e0d4; }
.product-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s; }
.product-card:hover .product-img img { transform: scale(1.04); }
.sale { position: absolute; top: .5rem; right: .5rem; background: #c4704b; color: #fff; font-size: .7rem; font-weight: 700; padding: .2rem .5rem; border-radius: 4px; }
.product-meta { padding: .5rem .25rem 0; }
.product-meta h3 { font-size: .85rem; font-weight: 500; line-height: 1.3; margin-bottom: .25rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.price { font-size: .9rem; font-weight: 700; color: #c4704b; }

/* Loading */
.loading { text-align: center; padding: 4rem 0; color: #b0a090; }

/* Footer */
.footer { background: #2c1810; color: #d4c4b0; padding: 3rem 0 0; }
.footer-grid { display: grid; grid-template-columns: 1.5fr repeat(3, 1fr); gap: 2rem; padding-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.08); }
@media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr; } }
.footer-logo { font-size: 1.1rem; font-weight: 700; color: #fff; display: block; margin-bottom: .75rem; }
.footer-brand p { font-size: .8rem; line-height: 1.6; opacity: .7; }
.footer-col h4 { font-size: .85rem; font-weight: 600; color: #fff; margin-bottom: .75rem; }
.footer-col a { display: block; font-size: .8rem; padding: .3rem 0; opacity: .6; transition: opacity .2s; }
.footer-col a:hover { opacity: 1; }
.footer-bottom { text-align: center; padding: 1.25rem 0; font-size: .7rem; opacity: .4; }

/* Top button */
.top-btn { position: fixed; bottom: 2rem; right: 2rem; width: 42px; height: 42px; border-radius: 50%; border: none; background: #c4704b; color: #fff; font-size: 1.1rem; cursor: pointer; box-shadow: 0 4px 12px rgba(196,112,75,0.3); transition: background .2s, transform .2s; z-index: 50; }
.top-btn:hover { background: #a85a3a; transform: translateY(-2px); }
</style>
