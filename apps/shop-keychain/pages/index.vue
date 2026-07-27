<template>
  <div class="kc-site">
    <header class="hdr" :class="{ scrolled }">
      <div class="hdr-inner">
        <NuxtLink to="/" class="hdr-logo">🔑 <span>{{ cfg.brand }}</span></NuxtLink>
        <nav class="hdr-nav"><NuxtLink v-for="n in cfg.nav" :key="n.to" :to="n.to" class="hdr-link">{{ n.label }}</NuxtLink></nav>
        <NuxtLink to="/login" class="hdr-login">登录</NuxtLink>
        <button class="hdr-burger" @click="menuOpen = !menuOpen"><span/><span/><span/></button>
      </div>
    </header>
    <div class="drawer" :class="{ open: menuOpen }" @click.self="menuOpen = false"><div class="drawer-inner"><NuxtLink v-for="n in cfg.nav" :key="n.to" :to="n.to" class="drawer-link" @click="menuOpen = false">{{ n.label }}</NuxtLink></div></div>

    <!-- Hero — 渐变活力 -->
    <section class="hero">
      <div class="hero-gradient"/>
      <div class="hero-body">
        <span class="hero-badge">NEW ARRIVAL</span>
        <h1>{{ cfg.hero.title }}</h1>
        <p>{{ cfg.hero.desc }}</p>
        <NuxtLink to="/search" class="hero-btn">{{ cfg.hero.cta }}</NuxtLink>
      </div>
      <div class="hero-shapes" aria-hidden="true"><span class="s1"/><span class="s2"/><span class="s3"/></div>
    </section>

    <!-- Categories — 彩色卡片 -->
    <section class="cats"><div class="wrap">
      <h2>材质分类</h2>
      <div class="cats-grid">
        <NuxtLink v-for="(c, i) in cfg.categories" :key="c.slug" :to="`/search?type=${c.slug}`" class="cat-card" :style="{ '--c': palette[i % palette.length] }">
          <div class="cat-emoji">{{ catEmoji[c.slug] }}</div>
          <span>{{ c.name }}</span>
        </NuxtLink>
      </div>
    </div></section>

    <!-- Products — 大图卡片 -->
    <section class="prods"><div class="wrap">
      <div class="prods-head"><h2>精选配件</h2><NuxtLink to="/search" class="more">查看全部 →</NuxtLink></div>
      <div v-if="loading" class="empty">加载中…</div>
      <div v-else class="prods-grid">
        <NuxtLink v-for="p in products" :key="p.id" :to="getPath(p)" class="p-card">
          <div class="p-img"><img v-if="getImg(p)" :src="getImg(p)" :alt="p.title" loading="lazy"/><span v-if="p.originalPrice > p.price" class="p-badge">{{ Math.round((1 - p.price / p.originalPrice) * 100) }}%</span></div>
          <div class="p-info"><h3>{{ p.title }}</h3><b v-if="p.price">¥{{ p.price }}</b></div>
        </NuxtLink>
      </div>
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
useHead({ htmlAttrs: { lang: 'zh-CN' }, link: [{ rel: 'icon', type: 'image/svg+xml', href: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔑</text></svg>" }] });

const { fetchPublishedProducts, getPublishedProductImage: getImg, getPublishedProductPath: getPath } = usePublishedProducts();
const loading = ref(true);
const products = ref<any[]>([]);
const scrolled = ref(false);
const menuOpen = ref(false);

const palette = ['#6c5ce7', '#00b894', '#e17055', '#0984e3', '#d63031', '#e84393'];
const catEmoji: Record<string, string> = { '亚克力': '💎', '金属': '⚙️', '硅胶': '🧸', '木质': '🪵', '皮革': '👜', '树脂': '✨' };

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
/* ===== KEYCHAIN — 潮流年轻活力 ===== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
.kc-site { font-family: "Inter", "PingFang SC", system-ui, sans-serif; color: #1a1a2e; background: #fff; line-height: 1.6; }
.kc-site a { color: inherit; text-decoration: none; }
.wrap { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }

/* Header — 圆润活泼 */
.hdr { position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,0.94); backdrop-filter: blur(10px); border-bottom: 2px solid #f0f0f5; }
.hdr.scrolled { box-shadow: 0 4px 20px rgba(108,92,231,0.08); }
.hdr-inner { display: flex; align-items: center; justify-content: space-between; height: 56px; max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
.hdr-logo { display: flex; align-items: center; gap: .4rem; font-weight: 800; font-size: 1.05rem; color: #6c5ce7; }
.hdr-nav { display: flex; gap: .15rem; }
.hdr-link { padding: .4rem .8rem; font-size: .82rem; font-weight: 500; color: #666; border-radius: 999px; transition: all .15s; }
.hdr-link:hover { background: #f0eeff; color: #6c5ce7; }
.hdr-login { font-size: .8rem; font-weight: 600; color: #6c5ce7; padding: .4rem 1rem; border: 2px solid #6c5ce7; border-radius: 999px; transition: all .15s; }
.hdr-login:hover { background: #6c5ce7; color: #fff; }
.hdr-burger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; }
.hdr-burger span { display: block; width: 20px; height: 2px; background: #6c5ce7; border-radius: 1px; }
@media (max-width: 768px) { .hdr-nav, .hdr-login { display: none; } .hdr-burger { display: flex; } }

.drawer { position: fixed; inset: 0; z-index: 200; background: rgba(0,0,0,0.2); opacity: 0; pointer-events: none; transition: opacity .2s; }
.drawer.open { opacity: 1; pointer-events: auto; }
.drawer-inner { position: fixed; top: 0; left: 0; bottom: 0; width: 260px; background: #fff; padding: 1.5rem; transform: translateX(-100%); transition: transform .25s; display: flex; flex-direction: column; gap: .25rem; }
.drawer.open .drawer-inner { transform: translateX(0); }
.drawer-link { padding: .7rem 1rem; border-radius: 10px; font-size: .88rem; color: #444; transition: background .15s; }
.drawer-link:hover { background: #f0eeff; color: #6c5ce7; }

/* Hero — 渐变 + 装饰形状 */
.hero { position: relative; overflow: hidden; padding: 5rem 1.5rem 4rem; background: linear-gradient(135deg, #f8f7ff 0%, #fff0f6 50%, #f0fffe 100%); }
.hero-gradient { position: absolute; inset: 0; background: radial-gradient(circle at 80% 20%, rgba(108,92,231,0.1) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(232,67,147,0.08) 0%, transparent 50%); }
.hero-body { position: relative; z-index: 1; max-width: 560px; }
.hero-badge { display: inline-block; padding: .3rem .8rem; background: #6c5ce7; color: #fff; font-size: .65rem; font-weight: 800; letter-spacing: .1em; border-radius: 999px; margin-bottom: 1rem; }
.hero h1 { font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 800; line-height: 1.1; margin-bottom: 1rem; color: #1a1a2e; }
.hero p { font-size: .95rem; color: #555; margin-bottom: 1.5rem; line-height: 1.7; }
.hero-btn { display: inline-block; padding: .8rem 2rem; background: #6c5ce7; color: #fff; border-radius: 999px; font-size: .88rem; font-weight: 700; transition: all .2s; box-shadow: 0 4px 16px rgba(108,92,231,0.25); }
.hero-btn:hover { background: #4834d4; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(108,92,231,0.35); }
.hero-shapes { position: absolute; top: 50%; right: 10%; transform: translateY(-50%); z-index: 0; }
.s1, .s2, .s3 { position: absolute; border-radius: 50%; }
.s1 { width: 120px; height: 120px; background: rgba(108,92,231,0.08); top: -60px; left: 0; }
.s2 { width: 80px; height: 80px; background: rgba(232,67,147,0.08); top: 20px; left: 140px; }
.s3 { width: 60px; height: 60px; background: rgba(0,184,148,0.08); top: -20px; left: 240px; }

/* Categories — 彩色边框卡片 */
.cats { padding: 4rem 0; }
.cats h2 { font-size: 1.3rem; font-weight: 800; margin-bottom: 1.5rem; }
.cats-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: .75rem; }
@media (max-width: 768px) { .cats-grid { grid-template-columns: repeat(2, 1fr); } }
.cat-card { display: flex; flex-direction: column; align-items: center; padding: 1.5rem .75rem; background: #fff; border: 2px solid #f0f0f5; border-radius: 16px; transition: all .2s; }
.cat-card:hover { border-color: var(--c); transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
.cat-emoji { font-size: 2rem; margin-bottom: .5rem; }
.cat-card span { font-size: .82rem; font-weight: 600; color: #444; }

/* Products */
.prods { padding: 0 0 4rem; background: #fafafe; }
.prods-head { display: flex; justify-content: space-between; align-items: baseline; padding: 4rem 0 1.5rem; }
.prods-head h2 { font-size: 1.3rem; font-weight: 800; }
.more { font-size: .82rem; color: #6c5ce7; font-weight: 600; }
.empty { text-align: center; padding: 3rem; color: #aaa; }
.prods-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
@media (max-width: 768px) { .prods-grid { grid-template-columns: repeat(2, 1fr); gap: .6rem; } }
.p-card { display: block; text-decoration: none; color: inherit; border-radius: 14px; overflow: hidden; background: #fff; border: 2px solid #f0f0f5; transition: all .2s; }
.p-card:hover { border-color: #6c5ce7; transform: translateY(-3px); box-shadow: 0 8px 24px rgba(108,92,231,0.1); }
.p-img { position: relative; aspect-ratio: 1; overflow: hidden; }
.p-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .35s; }
.p-card:hover .p-img img { transform: scale(1.04); }
.p-badge { position: absolute; top: .5rem; right: .5rem; background: #e84393; color: #fff; font-size: .68rem; font-weight: 800; padding: .2rem .5rem; border-radius: 999px; }
.p-info { padding: .6rem .75rem; }
.p-info h3 { font-size: .82rem; font-weight: 500; line-height: 1.3; margin-bottom: .2rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.p-info b { font-size: .9rem; color: #6c5ce7; }

/* Footer */
.ftr { background: #1a1a2e; color: #ccc; padding: 2.5rem 0 0; }
.ftr-grid { display: grid; grid-template-columns: 1.5fr repeat(3, 1fr); gap: 2rem; padding-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.06); }
@media (max-width: 768px) { .ftr-grid { grid-template-columns: 1fr; } }
.ftr-brand b { font-size: 1rem; color: #6c5ce7; display: block; margin-bottom: .5rem; }
.ftr-brand p { font-size: .78rem; line-height: 1.6; opacity: .5; }
.ftr-col h4 { font-size: .82rem; font-weight: 600; color: #fff; margin-bottom: .6rem; }
.ftr-col a { display: block; font-size: .78rem; padding: .25rem 0; opacity: .45; transition: opacity .15s; }
.ftr-col a:hover { opacity: 1; }
.ftr-copy { text-align: center; padding: 1rem; font-size: .68rem; opacity: .3; }

.go-top { position: fixed; bottom: 2rem; right: 2rem; width: 42px; height: 42px; border-radius: 50%; border: none; background: #6c5ce7; color: #fff; font-size: 1rem; cursor: pointer; z-index: 50; box-shadow: 0 4px 16px rgba(108,92,231,0.3); transition: all .2s; }
.go-top:hover { background: #4834d4; transform: translateY(-2px); }
</style>
