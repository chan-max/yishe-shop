<template>
  <div class="kit-site">
    <!-- Header -->
    <header class="hdr" :class="{ scrolled }">
      <div class="hdr-inner">
        <NuxtLink to="/" class="hdr-logo">
          <svg class="hdr-logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15 11h.01M11 15h.01M16 16h.01M2 16l20 6-6-20-2 8z"/></svg>
          <span>{{ cfg.brand }}</span>
        </NuxtLink>
        <nav class="hdr-nav">
          <NuxtLink v-for="n in cfg.nav" :key="n.to" :to="n.to" class="hdr-nav-link">{{ n.label }}</NuxtLink>
        </nav>
        <div class="hdr-actions">
          <NuxtLink to="/login" class="hdr-login-btn">登录</NuxtLink>
          <button class="hdr-burger" :class="{ open: menuOpen }" @click="menuOpen = !menuOpen">
            <span/><span/><span/>
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Drawer -->
    <Teleport to="body">
      <div class="drawer" :class="{ open: menuOpen }" @click.self="menuOpen = false">
        <div class="drawer-panel">
          <div class="drawer-header">
            <span class="drawer-brand">🍳 {{ cfg.brand }}</span>
            <button class="drawer-close" @click="menuOpen = false">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <NuxtLink v-for="n in cfg.nav" :key="n.to" :to="n.to" class="drawer-link" @click="menuOpen = false">{{ n.label }}</NuxtLink>
        </div>
      </div>
    </Teleport>

    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg">
        <div class="hero-grid-lines" aria-hidden="true"></div>
        <div class="hero-glow" aria-hidden="true"></div>
      </div>
      <div class="hero-content">
        <span class="hero-badge">{{ cfg.hero.eyebrow }}</span>
        <h1 class="hero-title">{{ cfg.hero.title }}</h1>
        <p class="hero-desc">{{ cfg.hero.desc }}</p>
        <div class="hero-actions">
          <NuxtLink to="/search" class="btn-primary">
            <span>{{ cfg.hero.cta }}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </NuxtLink>
          <NuxtLink to="/contact" class="btn-ghost">联系我们</NuxtLink>
        </div>
        <div class="hero-stats">
          <div class="stat"><span class="stat-num">200+</span><span class="stat-label">创意设计</span></div>
          <div class="stat-divider"></div>
          <div class="stat"><span class="stat-num">50+</span><span class="stat-label">设计师</span></div>
          <div class="stat-divider"></div>
          <div class="stat"><span class="stat-num">100%</span><span class="stat-label">原创设计</span></div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="section cats-section">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="section-badge">CATEGORIES</span>
            <h2 class="section-title">厨具分类</h2>
          </div>
          <NuxtLink to="/search" class="section-more">查看全部 →</NuxtLink>
        </div>
        <div class="cats-grid">
          <NuxtLink v-for="c in cfg.categories" :key="c.slug" :to="`/search?type=${c.slug}`" class="cat-card">
            <div class="cat-visual" :style="{ background: catBg[c.slug] || '#e8f5e9' }">
              <img v-if="getCatImg(c.slug)" :src="getCatImg(c.slug)" :alt="c.name" loading="lazy"/>
              <div v-else class="cat-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
              </div>
            </div>
            <span class="cat-name">{{ c.name }}</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Products -->
    <section class="section prods-section">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="section-badge">FEATURED</span>
            <h2 class="section-title">精选厨具</h2>
          </div>
          <NuxtLink to="/search" class="section-more">查看全部 →</NuxtLink>
        </div>
        <div v-if="loading" class="loading-state">
          <div class="loading-spinner"></div>
          <span>加载中…</span>
        </div>
        <div v-else-if="products.length === 0" class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
          <span>暂无产品</span>
        </div>
        <div v-else class="prods-grid">
          <NuxtLink v-for="p in products" :key="p.id" :to="getPath(p)" class="prod-card">
            <div class="prod-img">
              <img v-if="getImg(p)" :src="getImg(p)" :alt="p.title" loading="lazy"/>
              <div v-else class="prod-img-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
              </div>
              <span v-if="p.originalPrice > p.price" class="prod-badge">-{{ Math.round((1 - p.price / p.originalPrice) * 100) }}%</span>
            </div>
            <div class="prod-info">
              <h3 class="prod-title">{{ p.title }}</h3>
              <div class="prod-meta">
                <span v-if="p.price" class="prod-price">¥{{ p.price }}</span>
                <span v-if="p.originalPrice > p.price" class="prod-original">¥{{ p.originalPrice }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA Banner -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-banner">
          <div class="cta-content">
            <span class="cta-badge">CUSTOM DESIGN</span>
            <h2>找不到想要的厨具？</h2>
            <p>告诉我们您的需求，我们的设计师团队为您打造专属厨房用品。</p>
            <NuxtLink to="/contact" class="btn-primary btn-white">免费咨询设计</NuxtLink>
          </div>
          <div class="cta-deco" aria-hidden="true">
            <div class="cta-circle c1"></div>
            <div class="cta-circle c2"></div>
            <div class="cta-circle c3"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="ftr">
      <div class="container">
        <div class="ftr-grid">
          <div class="ftr-brand">
            <span class="ftr-logo">🍳 {{ cfg.brand }}</span>
            <p class="ftr-desc">{{ cfg.footer.desc }}</p>
            <div class="ftr-social">
              <a href="#" aria-label="Instagram" class="social-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>
              </a>
              <a href="#" aria-label="Twitter" class="social-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
              </a>
              <a href="#" aria-label="Pinterest" class="social-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.25 2.67 7.9 6.44 9.34-.09-.78-.17-1.98.04-2.83.18-.78 1.2-5.1 1.2-5.1s-.31-.61-.31-1.51c0-1.42.82-2.48 1.84-2.48.87 0 1.29.65 1.29 1.43 0 .87-.56 2.18-.84 3.39-.24 1.01.5 1.83 1.49 1.83 1.79 0 3.17-1.89 3.17-4.61 0-2.41-1.73-4.1-4.21-4.1-2.87 0-4.55 2.15-4.55 4.37 0 .87.33 1.79.75 2.3.08.1.09.19.07.29-.08.31-.25 1.01-.29 1.15-.05.19-.15.23-.35.14-1.31-.61-2.13-2.53-2.13-4.07 0-3.32 2.41-6.36 6.95-6.36 3.65 0 6.49 2.6 6.49 6.07 0 3.62-2.28 6.53-5.45 6.53-1.06 0-2.07-.55-2.41-1.21l-.66 2.5c-.24.92-.88 2.07-1.32 2.77.99.31 2.04.47 3.13.47 5.52 0 10-4.48 10-10S17.52 2 12 2z"/></svg>
              </a>
            </div>
          </div>
          <div v-for="col in cfg.footer.cols" :key="col.title" class="ftr-col">
            <h4 class="ftr-col-title">{{ col.title }}</h4>
            <NuxtLink v-for="l in col.links" :key="l.label" :to="l.to" class="ftr-link">{{ l.label }}</NuxtLink>
          </div>
        </div>
        <div class="ftr-bottom">
          <span>© 2026 {{ cfg.brand }}. All rights reserved.</span>
          <div class="ftr-bottom-links">
            <NuxtLink to="/about">关于我们</NuxtLink>
            <NuxtLink to="/contact">联系方式</NuxtLink>
          </div>
        </div>
      </div>
    </footer>

    <!-- Back to Top -->
    <button v-show="scrolled" class="top-btn" @click="scrollTo({ top: 0, behavior: 'smooth' })" aria-label="回到顶部">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg>
    </button>
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
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
.kit-site { font-family: 'DM Sans', 'PingFang SC', system-ui, -apple-system, sans-serif; color: #1a1a1a; background: #fff; line-height: 1.6; -webkit-font-smoothing: antialiased; }
.kit-site a { color: inherit; text-decoration: none; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }

/* ===== HEADER ===== */
.hdr { position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,0.85); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-bottom: 1px solid rgba(0,0,0,0.04); transition: all .3s ease; }
.hdr.scrolled { background: rgba(255,255,255,0.95); box-shadow: 0 1px 20px rgba(0,0,0,0.06); }
.hdr-inner { display: flex; align-items: center; justify-content: space-between; height: 64px; max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
.hdr-logo { display: flex; align-items: center; gap: .5rem; font-weight: 700; font-size: 1.05rem; color: #2d6a4f; }
.hdr-logo-icon { width: 22px; height: 22px; }
.hdr-nav { display: flex; gap: .25rem; }
.hdr-nav-link { padding: .5rem 1rem; font-size: .85rem; font-weight: 500; color: #666; border-radius: 8px; transition: all .2s ease; }
.hdr-nav-link:hover { background: #f0fdf4; color: #2d6a4f; }
.hdr-actions { display: flex; align-items: center; gap: .75rem; }
.hdr-login-btn { font-size: .82rem; font-weight: 600; color: #2d6a4f; padding: .5rem 1.25rem; border: 1.5px solid #2d6a4f; border-radius: 8px; transition: all .2s ease; }
.hdr-login-btn:hover { background: #2d6a4f; color: #fff; }
.hdr-burger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
.hdr-burger span { display: block; width: 20px; height: 2px; background: #333; border-radius: 2px; transition: all .3s ease; }
.hdr-burger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
.hdr-burger.open span:nth-child(2) { opacity: 0; }
.hdr-burger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
@media (max-width: 768px) { .hdr-nav, .hdr-login-btn { display: none; } .hdr-burger { display: flex; } }

/* ===== DRAWER ===== */
.drawer { position: fixed; inset: 0; z-index: 200; background: rgba(0,0,0,0.4); backdrop-filter: blur(4px); opacity: 0; pointer-events: none; transition: opacity .3s ease; }
.drawer.open { opacity: 1; pointer-events: auto; }
.drawer-panel { position: fixed; top: 0; left: 0; bottom: 0; width: 300px; background: #fff; padding: 0; transform: translateX(-100%); transition: transform .3s cubic-bezier(.4,0,.2,1); display: flex; flex-direction: column; box-shadow: 4px 0 24px rgba(0,0,0,0.1); }
.drawer.open .drawer-panel { transform: translateX(0); }
.drawer-header { display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 1.5rem; border-bottom: 1px solid #f0f0f0; }
.drawer-brand { font-weight: 700; font-size: 1rem; color: #2d6a4f; }
.drawer-close { background: none; border: none; cursor: pointer; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 8px; transition: background .15s; }
.drawer-close:hover { background: #f5f5f5; }
.drawer-close svg { width: 18px; height: 18px; color: #666; }
.drawer-link { padding: .85rem 1.5rem; font-size: .95rem; color: #444; transition: all .15s; border-left: 3px solid transparent; }
.drawer-link:hover { background: #f0fdf4; color: #2d6a4f; border-left-color: #2d6a4f; }

/* ===== HERO ===== */
.hero { position: relative; overflow: hidden; background: linear-gradient(160deg, #f0fdf4 0%, #dcfce7 40%, #f0f9ff 100%); padding: 6rem 1.5rem 5rem; }
.hero-bg { position: absolute; inset: 0; pointer-events: none; }
.hero-grid-lines { position: absolute; inset: 0; background-image: linear-gradient(rgba(45,106,79,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(45,106,79,0.03) 1px, transparent 1px); background-size: 60px 60px; }
.hero-glow { position: absolute; top: -20%; right: -10%; width: 500px; height: 500px; background: radial-gradient(circle, rgba(45,106,79,0.08) 0%, transparent 70%); border-radius: 50%; }
.hero-content { position: relative; z-index: 1; max-width: 680px; }
.hero-badge { display: inline-block; font-size: .7rem; font-weight: 700; letter-spacing: .15em; text-transform: uppercase; color: #2d6a4f; background: rgba(45,106,79,0.08); padding: .4rem 1rem; border-radius: 999px; margin-bottom: 1.5rem; }
.hero-title { font-size: clamp(2.2rem, 5vw, 3.5rem); font-weight: 700; line-height: 1.15; margin-bottom: 1.25rem; color: #0f172a; letter-spacing: -0.02em; }
.hero-desc { font-size: 1.05rem; color: #64748b; max-width: 520px; margin-bottom: 2rem; line-height: 1.75; }
.hero-actions { display: flex; align-items: center; gap: 1rem; margin-bottom: 3rem; }
.btn-primary { display: inline-flex; align-items: center; gap: .5rem; padding: .85rem 2rem; background: #2d6a4f; color: #fff; border-radius: 10px; font-size: .9rem; font-weight: 600; transition: all .25s ease; box-shadow: 0 4px 14px rgba(45,106,79,0.25); }
.btn-primary:hover { background: #1b4332; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(45,106,79,0.35); }
.btn-primary svg { width: 16px; height: 16px; transition: transform .2s; }
.btn-primary:hover svg { transform: translateX(3px); }
.btn-ghost { display: inline-flex; align-items: center; padding: .85rem 1.5rem; color: #2d6a4f; font-size: .9rem; font-weight: 600; border-radius: 10px; transition: all .2s; }
.btn-ghost:hover { background: rgba(45,106,79,0.06); }
.hero-stats { display: flex; align-items: center; gap: 2rem; }
.stat { display: flex; flex-direction: column; }
.stat-num { font-size: 1.5rem; font-weight: 700; color: #2d6a4f; }
.stat-label { font-size: .75rem; color: #94a3b8; font-weight: 500; }
.stat-divider { width: 1px; height: 32px; background: rgba(0,0,0,0.08); }
@media (max-width: 640px) { .hero { padding: 4rem 1.5rem 3rem; } .hero-actions { flex-direction: column; align-items: stretch; } .hero-stats { gap: 1.25rem; } .stat-num { font-size: 1.2rem; } }

/* ===== SECTIONS ===== */
.section { padding: 5rem 0; }
.section-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 2.5rem; }
.section-badge { font-size: .68rem; font-weight: 700; letter-spacing: .15em; text-transform: uppercase; color: #2d6a4f; display: block; margin-bottom: .5rem; }
.section-title { font-size: 1.75rem; font-weight: 700; color: #0f172a; letter-spacing: -0.01em; }
.section-more { font-size: .85rem; color: #2d6a4f; font-weight: 600; transition: color .2s; white-space: nowrap; }
.section-more:hover { color: #1b4332; }

/* ===== CATEGORIES ===== */
.cats-section { background: #fff; }
.cats-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 1.25rem; }
@media (max-width: 1024px) { .cats-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 640px) { .cats-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; } }
.cat-card { display: flex; flex-direction: column; text-decoration: none; border-radius: 14px; overflow: hidden; background: #fff; border: 1px solid rgba(0,0,0,0.05); transition: all .3s ease; }
.cat-card:hover { transform: translateY(-6px); box-shadow: 0 12px 32px rgba(0,0,0,0.08); border-color: transparent; }
.cat-visual { width: 100%; aspect-ratio: 4/5; overflow: hidden; position: relative; }
.cat-visual img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s cubic-bezier(.25,1,.5,1); }
.cat-card:hover .cat-visual img { transform: scale(1.08); }
.cat-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
.cat-placeholder svg { width: 40px; height: 40px; stroke: rgba(0,0,0,0.12); }
.cat-name { padding: .85rem 1rem; font-size: .88rem; font-weight: 600; color: #334155; text-align: center; }

/* ===== PRODUCTS ===== */
.prods-section { background: #f8fafb; }
.prods-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
@media (max-width: 1024px) { .prods-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 768px) { .prods-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; } }
.prod-card { display: block; text-decoration: none; color: inherit; border-radius: 14px; overflow: hidden; background: #fff; border: 1px solid rgba(0,0,0,0.04); transition: all .3s ease; }
.prod-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.08); }
.prod-img { position: relative; aspect-ratio: 1; overflow: hidden; background: #f1f5f9; }
.prod-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s cubic-bezier(.25,1,.5,1); }
.prod-card:hover .prod-img img { transform: scale(1.06); }
.prod-img-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
.prod-img-placeholder svg { width: 48px; height: 48px; stroke: rgba(0,0,0,0.08); }
.prod-badge { position: absolute; top: .75rem; right: .75rem; background: #ef4444; color: #fff; font-size: .7rem; font-weight: 700; padding: .25rem .6rem; border-radius: 6px; }
.prod-info { padding: 1rem; }
.prod-title { font-size: .88rem; font-weight: 500; line-height: 1.4; color: #1e293b; margin-bottom: .5rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.prod-meta { display: flex; align-items: baseline; gap: .5rem; }
.prod-price { font-size: 1rem; font-weight: 700; color: #2d6a4f; }
.prod-original { font-size: .8rem; color: #94a3b8; text-decoration: line-through; }

/* ===== LOADING / EMPTY ===== */
.loading-state, .empty-state { text-align: center; padding: 4rem 0; color: #94a3b8; display: flex; flex-direction: column; align-items: center; gap: 1rem; }
.loading-spinner { width: 32px; height: 32px; border: 3px solid #e2e8f0; border-top-color: #2d6a4f; border-radius: 50%; animation: spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.empty-state svg { width: 48px; height: 48px; stroke: #cbd5e1; }

/* ===== CTA ===== */
.cta-section { padding: 0 0 5rem; }
.cta-banner { position: relative; background: linear-gradient(135deg, #2d6a4f 0%, #1b4332 100%); border-radius: 20px; padding: 4rem; overflow: hidden; }
.cta-content { position: relative; z-index: 1; max-width: 500px; }
.cta-badge { font-size: .68rem; font-weight: 700; letter-spacing: .15em; color: rgba(255,255,255,0.6); display: block; margin-bottom: 1rem; }
.cta-banner h2 { font-size: 1.75rem; font-weight: 700; color: #fff; margin-bottom: .75rem; }
.cta-banner p { font-size: .95rem; color: rgba(255,255,255,0.7); line-height: 1.7; margin-bottom: 2rem; }
.btn-white { background: #fff; color: #2d6a4f; box-shadow: 0 4px 14px rgba(0,0,0,0.15); }
.btn-white:hover { background: #f0fdf4; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.2); }
.cta-deco { position: absolute; top: 0; right: 0; bottom: 0; width: 50%; }
.cta-circle { position: absolute; border-radius: 50%; border: 1px solid rgba(255,255,255,0.08); }
.c1 { width: 300px; height: 300px; top: -50px; right: -50px; }
.c2 { width: 200px; height: 200px; top: 50px; right: 100px; }
.c3 { width: 150px; height: 150px; bottom: -30px; right: 30px; }
@media (max-width: 768px) { .cta-banner { padding: 2.5rem 1.5rem; } .cta-deco { display: none; } }

/* ===== FOOTER ===== */
.ftr { background: #0f172a; color: #94a3b8; padding: 4rem 0 0; }
.ftr-grid { display: grid; grid-template-columns: 1.5fr repeat(3, 1fr); gap: 3rem; padding-bottom: 3rem; border-bottom: 1px solid rgba(255,255,255,0.06); }
@media (max-width: 768px) { .ftr-grid { grid-template-columns: 1fr; gap: 2rem; } }
.ftr-logo { font-size: 1.1rem; font-weight: 700; color: #fff; display: block; margin-bottom: 1rem; }
.ftr-desc { font-size: .82rem; line-height: 1.7; margin-bottom: 1.5rem; }
.ftr-social { display: flex; gap: .75rem; }
.social-link { display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 8px; background: rgba(255,255,255,0.05); color: #94a3b8; transition: all .2s; }
.social-link:hover { background: rgba(255,255,255,0.1); color: #fff; }
.social-link svg { width: 16px; height: 16px; }
.ftr-col-title { font-size: .82rem; font-weight: 600; color: #e2e8f0; margin-bottom: 1rem; letter-spacing: .03em; }
.ftr-link { display: block; font-size: .82rem; padding: .35rem 0; color: #64748b; transition: color .2s; }
.ftr-link:hover { color: #2d6a4f; }
.ftr-bottom { display: flex; align-items: center; justify-content: space-between; padding: 1.5rem 0; font-size: .75rem; color: #475569; }
.ftr-bottom-links { display: flex; gap: 1.5rem; }
.ftr-bottom-links a { color: #64748b; transition: color .2s; }
.ftr-bottom-links a:hover { color: #2d6a4f; }
@media (max-width: 640px) { .ftr-bottom { flex-direction: column; gap: .75rem; text-align: center; } }

/* ===== BACK TO TOP ===== */
.top-btn { position: fixed; bottom: 2rem; right: 2rem; width: 44px; height: 44px; border-radius: 12px; border: none; background: #2d6a4f; color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(45,106,79,0.3); transition: all .25s ease; z-index: 50; animation: fadeIn .3s ease; }
.top-btn:hover { background: #1b4332; transform: translateY(-3px); box-shadow: 0 6px 20px rgba(45,106,79,0.4); }
.top-btn svg { width: 20px; height: 20px; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>
