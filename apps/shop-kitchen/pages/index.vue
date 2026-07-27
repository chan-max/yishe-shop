<template>
  <div class="kit-site">
    <header class="hdr" :class="{ scrolled }">
      <div class="hdr-inner">
        <NuxtLink to="/" class="hdr-logo">🍳 <span>{{ cfg.brand }}</span></NuxtLink>
        <nav class="hdr-nav"><NuxtLink v-for="n in cfg.nav" :key="n.to" :to="n.to" class="hdr-nav-link">{{ n.label }}</NuxtLink></nav>
        <div class="hdr-actions"><NuxtLink to="/login" class="hdr-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></NuxtLink></div>
        <button class="hdr-burger" @click="menuOpen = !menuOpen"><span/><span/><span/></button>
      </div>
    </header>
    <div class="mobile-menu" :class="{ open: menuOpen }" @click.self="menuOpen = false"><div class="mobile-panel"><NuxtLink v-for="n in cfg.nav" :key="n.to" :to="n.to" class="mobile-link" @click="menuOpen = false">{{ n.label }}</NuxtLink></div></div>

    <section class="hero">
      <div class="hero-inner">
        <span class="hero-tag">{{ cfg.hero.eyebrow }}</span>
        <h1>{{ cfg.hero.title }}</h1>
        <p>{{ cfg.hero.desc }}</p>
        <NuxtLink to="/search" class="btn-primary">{{ cfg.hero.cta }}</NuxtLink>
      </div>
    </section>

    <section class="cats">
      <div class="wrap">
        <h2>厨具分类</h2>
        <div class="cats-grid">
          <NuxtLink v-for="c in cfg.categories" :key="c.slug" :to="`/search?type=${c.slug}`" class="cat-item" :style="{ '--bg': catBg[c.slug] || '#e8f5e9' }">
            <div class="cat-visual"><img v-if="getCatImg(c.slug)" :src="getCatImg(c.slug)" :alt="c.name" loading="lazy"/></div>
            <span>{{ c.name }}</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="prods">
      <div class="wrap">
        <div class="prods-head"><h2>精选厨具</h2><NuxtLink to="/search" class="link-more">查看全部 →</NuxtLink></div>
        <div v-if="loading" class="state-msg">加载中…</div>
        <div v-else class="prods-grid">
          <NuxtLink v-for="p in products" :key="p.id" :to="getPath(p)" class="prod-card">
            <div class="prod-img"><img v-if="getImg(p)" :src="getImg(p)" :alt="p.title" loading="lazy"/><span v-if="p.originalPrice > p.price" class="prod-badge">-{{ Math.round((1 - p.price / p.originalPrice) * 100) }}%</span></div>
            <div class="prod-info"><h3>{{ p.title }}</h3><b v-if="p.price">¥{{ p.price }}</b></div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <footer class="ftr">
      <div class="wrap ftr-grid">
        <div class="ftr-brand"><b>🍳 {{ cfg.brand }}</b><p>{{ cfg.footer.desc }}</p></div>
        <div v-for="col in cfg.footer.cols" :key="col.title" class="ftr-col"><h4>{{ col.title }}</h4><NuxtLink v-for="l in col.links" :key="l.label" :to="l.to">{{ l.label }}</NuxtLink></div>
      </div>
      <div class="ftr-copy">© 2026 {{ cfg.brand }}.</div>
    </footer>
    <button v-show="scrolled" class="go-top" @click="scrollTo({top:0,behavior:'smooth'})">↑</button>
  </div>
</template>

<script setup lang="ts">
import cfg from '../site.config';
import { usePublishedProducts } from '~/composables/use-published-products';

definePageMeta({ layout: false });
useSeoMeta({ title: cfg.seo.title, description: cfg.seo.description, ogTitle: cfg.seo.ogTitle, ogDescription: cfg.seo.ogDescription });
useHead({ htmlAttrs: { lang: 'zh-CN' }, link: [{ rel: 'icon', type: 'image/svg+xml', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍳</text></svg>' }] });

const { fetchPublishedProducts, getPublishedProductImage: getImg, getPublishedProductPath: getPath } = usePublishedProducts();
const loading = ref(true);
const products = ref<any[]>([]);
const scrolled = ref(false);
const menuOpen = ref(false);

const catBg: Record<string, string> = { '围裙': '#e8f5e9', '砧板': '#f5ece2', '隔热垫': '#fff3e0', '调料罐': '#e3f2fd', '餐垫': '#fce4ec', '厨房毛巾': '#e0f7fa' };

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
/* ===== KITCHEN — 现代极简绿色 ===== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
.kit-site { font-family: "Inter", "PingFang SC", system-ui, sans-serif; color: #1a1a1a; background: #fff; line-height: 1.6; }
.kit-site a { color: inherit; text-decoration: none; }
.wrap { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }

/* Header — 竖线极简 */
.hdr { position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); border-bottom: 1px solid #f0f0f0; }
.hdr.scrolled { box-shadow: 0 1px 8px rgba(0,0,0,0.06); }
.hdr-inner { display: flex; align-items: center; justify-content: space-between; height: 56px; max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
.hdr-logo { display: flex; align-items: center; gap: .4rem; font-weight: 700; font-size: 1rem; }
.hdr-nav { display: flex; gap: .25rem; }
.hdr-nav-link { padding: .4rem .75rem; font-size: .82rem; font-weight: 500; color: #666; border-radius: 6px; transition: all .15s; }
.hdr-nav-link:hover { background: #f5f5f5; color: #1a1a1a; }
.hdr-actions { display: flex; gap: .5rem; }
.hdr-icon { display: flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 8px; transition: background .15s; }
.hdr-icon:hover { background: #f5f5f5; }
.hdr-icon svg { width: 18px; height: 18px; }
.hdr-burger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; }
.hdr-burger span { display: block; width: 20px; height: 1.5px; background: #333; }
@media (max-width: 768px) { .hdr-nav { display: none; } .hdr-burger { display: flex; } }

/* Mobile menu */
.mobile-menu { position: fixed; inset: 0; z-index: 200; background: rgba(0,0,0,0.25); opacity: 0; pointer-events: none; transition: opacity .25s; }
.mobile-menu.open { opacity: 1; pointer-events: auto; }
.mobile-panel { position: fixed; top: 0; left: 0; bottom: 0; width: 260px; background: #fff; padding: 1.5rem; transform: translateX(-100%); transition: transform .25s; display: flex; flex-direction: column; gap: .25rem; }
.mobile-menu.open .mobile-panel { transform: translateX(0); }
.mobile-link { padding: .7rem 1rem; border-radius: 8px; font-size: .9rem; color: #444; transition: background .15s; }
.mobile-link:hover { background: #f5f5f5; }

/* Hero — 干净分割 */
.hero { background: linear-gradient(160deg, #f0faf4 0%, #e8f5e9 50%, #f5f0e8 100%); padding: 5rem 1.5rem; }
.hero-inner { max-width: 600px; }
.hero-tag { font-size: .7rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #2d6a4f; display: block; margin-bottom: .75rem; }
.hero h1 { font-size: clamp(1.8rem, 4.5vw, 3rem); font-weight: 800; line-height: 1.1; margin-bottom: 1rem; color: #1a1a1a; }
.hero p { font-size: .95rem; color: #555; margin-bottom: 1.5rem; max-width: 440px; line-height: 1.7; }
.btn-primary { display: inline-block; padding: .75rem 1.75rem; background: #2d6a4f; color: #fff; border-radius: 8px; font-size: .85rem; font-weight: 600; transition: background .2s; }
.btn-primary:hover { background: #1b4332; }

/* Categories — 圆角卡片 */
.cats { padding: 4rem 0; }
.cats h2 { font-size: 1.3rem; font-weight: 700; margin-bottom: 1.5rem; }
.cats-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: .75rem; }
@media (max-width: 768px) { .cats-grid { grid-template-columns: repeat(2, 1fr); } }
.cat-item { display: flex; flex-direction: column; align-items: center; text-decoration: none; border-radius: 12px; overflow: hidden; background: var(--bg); transition: transform .2s, box-shadow .2s; }
.cat-item:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.06); }
.cat-visual { width: 100%; aspect-ratio: 1; overflow: hidden; }
.cat-visual img { width: 100%; height: 100%; object-fit: cover; transition: transform .35s; }
.cat-item:hover .cat-visual img { transform: scale(1.05); }
.cat-item span { padding: .6rem; font-size: .82rem; font-weight: 600; color: #333; }

/* Products — 细边框卡片 */
.prods { padding: 4rem 0; background: #fafafa; }
.prods-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1.5rem; }
.prods-head h2 { font-size: 1.3rem; font-weight: 700; }
.link-more { font-size: .82rem; color: #2d6a4f; font-weight: 500; }
.state-msg { text-align: center; padding: 3rem; color: #999; }
.prods-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
@media (max-width: 768px) { .prods-grid { grid-template-columns: repeat(2, 1fr); gap: .6rem; } }
.prod-card { display: block; text-decoration: none; color: inherit; border-radius: 10px; overflow: hidden; background: #fff; border: 1px solid #eee; transition: transform .2s, box-shadow .2s; }
.prod-card:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,0.06); }
.prod-img { position: relative; aspect-ratio: 1; overflow: hidden; }
.prod-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .35s; }
.prod-card:hover .prod-img img { transform: scale(1.04); }
.prod-badge { position: absolute; top: .5rem; right: .5rem; background: #e53e3e; color: #fff; font-size: .68rem; font-weight: 700; padding: .15rem .4rem; border-radius: 4px; }
.prod-info { padding: .6rem .75rem; }
.prod-info h3 { font-size: .82rem; font-weight: 500; line-height: 1.3; margin-bottom: .2rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.prod-info b { font-size: .88rem; color: #2d6a4f; }

/* Footer */
.ftr { background: #1a1a1a; color: #ccc; padding: 2.5rem 0 0; }
.ftr-grid { display: grid; grid-template-columns: 1.5fr repeat(3, 1fr); gap: 2rem; padding-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.08); }
@media (max-width: 768px) { .ftr-grid { grid-template-columns: 1fr; } }
.ftr-brand b { font-size: 1rem; color: #fff; display: block; margin-bottom: .5rem; }
.ftr-brand p { font-size: .78rem; line-height: 1.6; opacity: .6; }
.ftr-col h4 { font-size: .82rem; font-weight: 600; color: #fff; margin-bottom: .6rem; }
.ftr-col a { display: block; font-size: .78rem; padding: .25rem 0; opacity: .5; transition: opacity .15s; }
.ftr-col a:hover { opacity: 1; }
.ftr-copy { text-align: center; padding: 1rem; font-size: .68rem; opacity: .35; }

/* Go top */
.go-top { position: fixed; bottom: 2rem; right: 2rem; width: 40px; height: 40px; border-radius: 10px; border: none; background: #2d6a4f; color: #fff; font-size: 1rem; cursor: pointer; z-index: 50; transition: background .2s; }
.go-top:hover { background: #1b4332; }
</style>
