<template>
  <div class="pnt-site">
    <header class="hdr" :class="{ scrolled }">
      <div class="hdr-inner">
        <NuxtLink to="/" class="hdr-logo">🎨 <span>{{ cfg.brand }}</span></NuxtLink>
        <nav class="hdr-nav"><NuxtLink v-for="n in cfg.nav" :key="n.to" :to="n.to" class="hdr-nav-link">{{ n.label }}</NuxtLink></nav>
        <div class="hdr-actions"><NuxtLink to="/login" class="hdr-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></NuxtLink></div>
        <button class="hdr-burger" @click="menuOpen = !menuOpen"><span/><span/><span/></button>
      </div>
    </header>
    <div class="mm" :class="{ open: menuOpen }" @click.self="menuOpen = false"><div class="mm-panel"><NuxtLink v-for="n in cfg.nav" :key="n.to" :to="n.to" class="mm-link" @click="menuOpen = false">{{ n.label }}</NuxtLink></div></div>

    <!-- Dark hero -->
    <section class="hero">
      <div class="hero-glow"/>
      <div class="hero-inner">
        <span class="hero-eyebrow">{{ cfg.hero.eyebrow }}</span>
        <h1>{{ cfg.hero.title }}</h1>
        <p>{{ cfg.hero.desc }}</p>
        <NuxtLink to="/search" class="cta-gold">{{ cfg.hero.cta }}</NuxtLink>
      </div>
    </section>

    <!-- Artist strip -->
    <section class="artists"><div class="wrap"><div class="artists-row"><span v-for="a in (cfg as any).artists" :key="a" class="artist-name">{{ a }}</span></div></div></section>

    <!-- Categories -->
    <section class="cats"><div class="wrap">
      <h2>艺术流派</h2>
      <div class="cats-grid">
        <NuxtLink v-for="c in cfg.categories" :key="c.slug" :to="`/search?type=${c.slug}`" class="cat-card" :style="{ background: catBg[c.slug] }">
          <img v-if="getCatImg(c.slug)" :src="getCatImg(c.slug)" :alt="c.name" loading="lazy" class="cat-bg"/>
          <div class="cat-shade"/><span class="cat-label">{{ c.name }}</span>
        </NuxtLink>
      </div>
    </div></section>

    <!-- Products -->
    <section class="prods"><div class="wrap">
      <h2>馆藏作品</h2>
      <div v-if="loading" class="msg">加载中…</div>
      <div v-else class="prods-grid">
        <NuxtLink v-for="p in products" :key="p.id" :to="getPath(p)" class="prod-card">
          <div class="prod-img"><img v-if="getImg(p)" :src="getImg(p)" :alt="p.title" loading="lazy"/></div>
          <div class="prod-info"><h3>{{ p.title }}</h3><b v-if="p.price">¥{{ p.price }}</b></div>
        </NuxtLink>
      </div>
    </div></section>

    <!-- Quality -->
    <section class="quality"><div class="wrap">
      <h2>品质承诺</h2>
      <div class="quality-grid">
        <div v-for="q in (cfg as any).quality" :key="q.num" class="quality-item"><span class="q-num">{{ q.num }}</span><h3>{{ q.title }}</h3><p>{{ q.desc }}</p></div>
      </div>
    </div></section>

    <!-- Quote -->
    <section class="quote-section"><div class="wrap">
      <blockquote>{{ (cfg as any).quote.text }}</blockquote>
      <cite>{{ (cfg as any).quote.cite }}</cite>
    </div></section>

    <!-- CTA -->
    <section class="cta-block"><div class="wrap">
      <h2>{{ (cfg as any).cta.title }}</h2>
      <p>{{ (cfg as any).cta.desc }}</p>
      <NuxtLink to="/contact" class="cta-gold">{{ (cfg as any).cta.action }}</NuxtLink>
    </div></section>

    <footer class="ftr"><div class="wrap">
      <div class="ftr-grid">
        <div class="ftr-brand"><b>{{ cfg.emoji }} {{ cfg.brand }}</b><p>{{ cfg.footer.desc }}</p></div>
        <div v-for="col in cfg.footer.cols" :key="col.title" class="ftr-col"><h4>{{ col.title }}</h4><NuxtLink v-for="l in col.links" :key="l.label" :to="l.to">{{ l.label }}</NuxtLink></div>
      </div>
      <div class="ftr-copy">© 2026 {{ cfg.brand }}.</div>
    </div></footer>
    <button v-show="scrolled" class="go-top" @click="scrollTo({top:0,behavior:'smooth'})">↑</button>
  </div>
</template>

<script setup lang="ts">
import cfg from '../site.config';
import { usePublishedProducts } from '~/composables/use-published-products';

definePageMeta({ layout: false });
useSeoMeta({ title: cfg.seo.title, description: cfg.seo.description, ogTitle: cfg.seo.ogTitle, ogDescription: cfg.seo.ogDescription });
useHead({ htmlAttrs: { lang: 'zh-CN' }, link: [{ rel: 'icon', type: 'image/svg+xml', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎨</text></svg>' }] });

const { fetchPublishedProducts, getPublishedProductImage: getImg, getPublishedProductPath: getPath } = usePublishedProducts();
const loading = ref(true);
const products = ref<any[]>([]);
const scrolled = ref(false);
const menuOpen = ref(false);

const catBg: Record<string, string> = { '印象派': '#f0e6ff', '后印象派': '#fff3e0', '立体主义': '#e3f2fd', '超现实主义': '#fce4ec', '古典主义': '#f5f0e1', '现代艺术': '#e0f7fa' };

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
/* ===== PAINTING — 博物馆暗色画廊 ===== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
.pnt-site { font-family: "Playfair Display", "Noto Serif SC", Georgia, serif; color: #e8e0d0; background: #0a0a0a; line-height: 1.6; }
.pnt-site a { color: inherit; text-decoration: none; }
.wrap { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }

.hdr { position: sticky; top: 0; z-index: 100; background: rgba(10,10,10,0.92); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(255,255,255,0.06); }
.hdr.scrolled { box-shadow: 0 2px 16px rgba(0,0,0,0.4); }
.hdr-inner { display: flex; align-items: center; justify-content: space-between; height: 56px; max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
.hdr-logo { display: flex; align-items: center; gap: .4rem; font-weight: 700; font-size: 1rem; color: #fff; }
.hdr-nav { display: flex; gap: .25rem; }
.hdr-nav-link { padding: .4rem .75rem; font-size: .82rem; font-weight: 500; color: #999; border-radius: 6px; transition: all .15s; }
.hdr-nav-link:hover { background: rgba(255,255,255,0.06); color: #fff; }
.hdr-actions { display: flex; }
.hdr-icon { display: flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 8px; color: #999; transition: all .15s; }
.hdr-icon:hover { background: rgba(255,255,255,0.06); color: #fff; }
.hdr-icon svg { width: 18px; height: 18px; }
.hdr-burger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; }
.hdr-burger span { display: block; width: 20px; height: 1.5px; background: #ccc; }
@media (max-width: 768px) { .hdr-nav { display: none; } .hdr-burger { display: flex; } }

.mm { position: fixed; inset: 0; z-index: 200; background: rgba(0,0,0,0.5); opacity: 0; pointer-events: none; transition: opacity .25s; }
.mm.open { opacity: 1; pointer-events: auto; }
.mm-panel { position: fixed; top: 0; left: 0; bottom: 0; width: 260px; background: #141414; padding: 1.5rem; transform: translateX(-100%); transition: transform .25s; display: flex; flex-direction: column; gap: .25rem; }
.mm.open .mm-panel { transform: translateX(0); }
.mm-link { padding: .7rem 1rem; border-radius: 8px; font-size: .9rem; color: #999; transition: all .15s; }
.mm-link:hover { background: rgba(255,255,255,0.05); color: #fff; }

/* Hero — dark museum */
.hero { position: relative; min-height: 520px; display: flex; align-items: flex-end; overflow: hidden; }
.hero-glow { position: absolute; inset: 0; background: radial-gradient(ellipse at 30% 50%, rgba(201,169,110,0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(201,169,110,0.08) 0%, transparent 50%); }
.hero-inner { position: relative; z-index: 1; padding: 4rem 1.5rem; max-width: 1200px; margin: 0 auto; width: 100%; }
.hero-eyebrow { font-size: .7rem; font-weight: 600; letter-spacing: .15em; text-transform: uppercase; color: #C9A96E; display: block; margin-bottom: .75rem; }
.hero h1 { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 800; line-height: 1.1; margin-bottom: 1rem; color: #fff; }
.hero p { font-size: 1rem; color: rgba(255,255,255,0.6); max-width: 480px; margin-bottom: 1.5rem; line-height: 1.7; }
.cta-gold { display: inline-block; padding: .75rem 2rem; background: #C9A96E; color: #0a0a0a; border-radius: 4px; font-size: .85rem; font-weight: 700; letter-spacing: .03em; transition: background .2s; }
.cta-gold:hover { background: #dcc499; }

/* Artists */
.artists { border-bottom: 1px solid rgba(255,255,255,0.06); padding: 1.25rem 0; overflow: hidden; }
.artists-row { display: flex; gap: 2rem; white-space: nowrap; }
.artist-name { font-size: .85rem; color: #666; letter-spacing: .05em; }

/* Cats */
.cats { padding: 4rem 0; }
.cats h2 { font-size: 1.3rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; }
.cats-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: .75rem; }
@media (max-width: 768px) { .cats-grid { grid-template-columns: repeat(2, 1fr); } }
.cat-card { position: relative; display: flex; flex-direction: column; justify-content: flex-end; aspect-ratio: 4/5; border-radius: 6px; overflow: hidden; text-decoration: none; color: #fff; transition: transform .25s; }
.cat-card:hover { transform: translateY(-3px); }
.cat-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: .5; transition: opacity .3s, transform .35s; }
.cat-card:hover .cat-bg { opacity: .7; transform: scale(1.05); }
.cat-shade { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%); }
.cat-label { position: relative; z-index: 1; padding: .75rem; font-size: .82rem; font-weight: 600; }

/* Prods */
.prods { padding: 4rem 0; background: #111; }
.prods h2 { font-size: 1.3rem; font-weight: 700; color: #fff; margin-bottom: 1.5rem; }
.msg { text-align: center; padding: 3rem; color: #666; }
.prods-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
@media (max-width: 768px) { .prods-grid { grid-template-columns: repeat(2, 1fr); gap: .6rem; } }
.prod-card { display: block; text-decoration: none; color: inherit; border-radius: 6px; overflow: hidden; background: #1a1a1a; transition: transform .2s; }
.prod-card:hover { transform: translateY(-2px); }
.prod-img { aspect-ratio: 1; overflow: hidden; }
.prod-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s; }
.prod-card:hover .prod-img img { transform: scale(1.04); }
.prod-info { padding: .6rem .75rem; }
.prod-info h3 { font-size: .82rem; font-weight: 500; color: #ccc; line-height: 1.3; margin-bottom: .2rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.prod-info b { font-size: .88rem; color: #C9A96E; }

/* Quality */
.quality { padding: 4rem 0; background: #0e0e0e; }
.quality h2 { font-size: 1.3rem; font-weight: 700; color: #fff; text-align: center; margin-bottom: 2rem; }
.quality-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
@media (max-width: 768px) { .quality-grid { grid-template-columns: repeat(2, 1fr); } }
.quality-item { text-align: center; }
.q-num { display: block; font-size: 1.8rem; font-weight: 800; color: #C9A96E; margin-bottom: .4rem; }
.quality-item h3 { font-size: .9rem; font-weight: 600; color: #fff; margin-bottom: .3rem; }
.quality-item p { font-size: .78rem; color: #888; line-height: 1.5; }

/* Quote */
.quote-section { padding: 4rem 0; text-align: center; }
.quote-section blockquote { font-size: clamp(1.1rem, 2.5vw, 1.5rem); font-style: italic; color: #e8e0d0; max-width: 600px; margin: 0 auto .75rem; line-height: 1.6; }
.quote-section cite { font-size: .85rem; color: #C9A96E; font-style: normal; }

/* CTA */
.cta-block { padding: 4rem 0; text-align: center; background: #111; }
.cta-block h2 { font-size: 1.5rem; font-weight: 700; color: #fff; margin-bottom: .5rem; }
.cta-block p { font-size: .9rem; color: #888; margin-bottom: 1.5rem; }

/* Footer */
.ftr { border-top: 1px solid rgba(255,255,255,0.06); padding: 2.5rem 0 0; }
.ftr-grid { display: grid; grid-template-columns: 1.5fr repeat(3, 1fr); gap: 2rem; padding-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.06); }
@media (max-width: 768px) { .ftr-grid { grid-template-columns: 1fr; } }
.ftr-brand b { font-size: 1rem; color: #fff; display: block; margin-bottom: .5rem; }
.ftr-brand p { font-size: .78rem; line-height: 1.6; color: #888; }
.ftr-col h4 { font-size: .82rem; font-weight: 600; color: #fff; margin-bottom: .6rem; }
.ftr-col a { display: block; font-size: .78rem; padding: .25rem 0; color: #666; transition: color .15s; }
.ftr-col a:hover { color: #C9A96E; }
.ftr-copy { text-align: center; padding: 1rem; font-size: .68rem; color: #444; }

.go-top { position: fixed; bottom: 2rem; right: 2rem; width: 40px; height: 40px; border-radius: 4px; border: 1px solid rgba(201,169,110,0.3); background: rgba(10,10,10,0.9); color: #C9A96E; font-size: 1rem; cursor: pointer; z-index: 50; transition: all .2s; }
.go-top:hover { background: #C9A96E; color: #0a0a0a; }
</style>
