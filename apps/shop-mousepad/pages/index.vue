<template>
  <div class="site" :class="{ 'menu-open': menuOpen }">
    <a href="#main-content" class="skip-link">跳转到主要内容</a>

    <!-- Floating Glass Navbar -->
    <header class="header" :class="{ scrolled }" role="banner">
      <div class="header-pill">
        <NuxtLink to="/" class="logo" aria-label="PadStudio 首页">
          <span class="logo-mark">P</span>
          <span class="logo-text">PadStudio</span>
        </NuxtLink>

        <nav class="nav" role="navigation" aria-label="主导航">
          <NuxtLink v-for="n in cfg.nav" :key="n.to" :to="n.to" class="nav-link">{{ n.label }}</NuxtLink>
        </nav>

        <div class="header-actions">
          <NuxtLink to="/login" class="icon-btn" aria-label="用户登录">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </NuxtLink>
          <NuxtLink to="/search" class="icon-btn" aria-label="搜索产品">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          </NuxtLink>
        </div>

        <button class="burger" :aria-expanded="menuOpen" aria-label="打开菜单" @click="toggleMenu">
          <span class="burger-line" :class="{ open: menuOpen }"/>
          <span class="burger-line" :class="{ open: menuOpen }"/>
        </button>
      </div>
    </header>

    <!-- Mobile Drawer -->
    <Teleport to="body">
      <div class="drawer-overlay" :class="{ open: menuOpen }" aria-hidden="true" @click="menuOpen = false"/>
      <aside class="drawer" :class="{ open: menuOpen }" role="dialog" aria-label="移动端导航">
        <div class="drawer-header">
          <span class="drawer-logo">PadStudio</span>
          <button class="drawer-close" aria-label="关闭菜单" @click="menuOpen = false">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <nav class="drawer-nav" role="navigation" aria-label="移动端导航">
          <NuxtLink v-for="n in cfg.nav" :key="n.to" :to="n.to" class="drawer-link" @click="menuOpen = false">{{ n.label }}</NuxtLink>
        </nav>
      </aside>
    </Teleport>

    <main id="main-content">
      <!-- ═══════════════════════════════════════════
           SECTION 1: HERO — Cinematic Product Lead
           Composition: bottom-left text over full-bleed image
           Background: full-bleed product photo with tonal overlay
      ═══════════════════════════════════════════ -->
      <section class="hero" aria-label="首页横幅">
        <div class="hero-bg">
          <img
            src="https://picsum.photos/seed/dark-desk-setup-peripheral/1800/1000"
            alt="" class="hero-bg-img" loading="eager"
          />
          <div class="hero-overlay"/>
        </div>
        <div class="hero-content" data-reveal>
          <div class="eyebrow">
            <span class="eyebrow-dot"/>
            专业级外设
          </div>
          <h1 class="hero-title">
            精准操控<br/>
            <span class="hero-title--accent">从一块好垫开始</span>
          </h1>
          <p class="hero-desc">{{ cfg.hero.desc }}</p>
          <div class="hero-actions">
            <NuxtLink to="/search" class="cta-primary group">
              <span>{{ cfg.hero.cta }}</span>
              <span class="cta-icon-wrap">
                <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14" aria-hidden="true" class="cta-icon"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"/></svg>
              </span>
            </NuxtLink>
            <NuxtLink to="/search" class="cta-ghost">{{ cfg.hero.secondaryCta }}</NuxtLink>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════
           SECTION 2: TRUST — Oversized Metrics Strip
           Background: solid with hairline borders
      ═══════════════════════════════════════════ -->
      <section class="trust" aria-label="信任数据">
        <div class="trust-inner">
          <div v-for="(t, i) in cfg.trustSignals" :key="t.label" class="trust-item" :style="{ '--i': i }" data-reveal>
            <span class="trust-value">{{ t.value }}</span>
            <span class="trust-label">{{ t.label }}</span>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════
           SECTION 3: CATEGORIES — Asymmetric Bento
           Composition: top-left lead
           Background: solid surface
      ═══════════════════════════════════════════ -->
      <section class="section" aria-label="鼠标垫分类">
        <div class="container">
          <div class="section-head" data-reveal>
            <div>
              <h2 class="section-title">分类浏览</h2>
              <p class="section-sub">为每种场景精心设计</p>
            </div>
            <NuxtLink to="/search" class="link-more">
              查看全部
              <svg viewBox="0 0 20 20" fill="currentColor" width="12" height="12" aria-hidden="true"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"/></svg>
            </NuxtLink>
          </div>
          <div class="cat-grid">
            <NuxtLink
              v-for="(c, i) in cfg.categories.slice(0, 5)"
              :key="c.slug"
              :to="`/search?type=${c.slug}`"
              class="cat-card"
              :class="`cat-card--${i}`"
              data-reveal
            >
              <div class="cat-card-shell">
                <div class="cat-visual">
                  <img :src="catImages[i]" :alt="c.name" loading="lazy" class="cat-img"/>
                  <div class="cat-img-overlay"/>
                </div>
                <div class="cat-info">
                  <span class="cat-name">{{ c.name }}</span>
                  <span class="cat-desc">{{ c.desc }}</span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════
           SECTION 4: PRODUCTS — Gapless Bento Grid
           Composition: centered low
           Background: alternate subtle tint
      ═══════════════════════════════════════════ -->
      <section class="section section--alt" aria-label="热门鼠标垫">
        <div class="container">
          <div class="section-head" data-reveal>
            <div>
              <h2 class="section-title">热门鼠标垫</h2>
              <p class="section-sub">玩家和设计师的选择</p>
            </div>
            <NuxtLink to="/search" class="link-more">
              查看全部
              <svg viewBox="0 0 20 20" fill="currentColor" width="12" height="12" aria-hidden="true"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"/></svg>
            </NuxtLink>
          </div>

          <!-- Skeleton -->
          <div v-if="loading" class="product-grid">
            <div v-for="n in 4" :key="n" class="product-skeleton">
              <div class="skeleton-img skeleton-pulse"/>
              <div class="skeleton-text skeleton-pulse"/>
              <div class="skeleton-text skeleton-text--short skeleton-pulse"/>
            </div>
          </div>

          <!-- Grid -->
          <div v-else class="product-grid">
            <NuxtLink
              v-for="(p, i) in products"
              :key="p.id"
              :to="getPath(p)"
              class="product-card"
              data-reveal
            >
              <div class="product-card-shell">
                <div class="product-img-wrap">
                  <img v-if="getImg(p)" :src="getImg(p)" :alt="p.title" loading="lazy" class="product-img"/>
                  <span v-if="p.originalPrice > p.price" class="product-badge">{{ Math.round((1 - p.price / p.originalPrice) * 100) }}% OFF</span>
                </div>
                <div class="product-meta">
                  <h3 class="product-name">{{ p.title }}</h3>
                  <div class="product-price">
                    <span v-if="p.price" class="price">¥{{ p.price }}</span>
                    <span v-if="p.originalPrice > p.price" class="price-original">¥{{ p.originalPrice }}</span>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════
           SECTION 5: FEATURES — Editorial Zigzag
           Composition: alternating left/right
           Background: full-bleed product detail images
      ═══════════════════════════════════════════ -->
      <section class="section" aria-label="产品特性">
        <div class="container">
          <div class="section-head section-head--center" data-reveal>
            <div class="eyebrow eyebrow--center">
              <span class="eyebrow-dot"/>
              工艺与科技
            </div>
            <h2 class="section-title">专业级品质</h2>
            <p class="section-sub">每一个细节都经过反复打磨</p>
          </div>

          <div class="features">
            <div v-for="(f, i) in cfg.features" :key="f.title" class="feature-row" :class="{ 'feature-row--reverse': i % 2 !== 0 }" data-reveal>
              <div class="feature-visual">
                <div class="feature-img-shell">
                  <img :src="featureImages[i]" :alt="f.title" loading="lazy" class="feature-img"/>
                </div>
              </div>
              <div class="feature-text">
                <div class="feature-icon-wrap">
                  <svg v-if="f.icon === 'precision'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
                  </svg>
                  <svg v-else-if="f.icon === 'durability'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>
                  </svg>
                  <svg v-else-if="f.icon === 'grip'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                  </svg>
                  <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
                  </svg>
                </div>
                <h3 class="feature-title">{{ f.title }}</h3>
                <p class="feature-desc">{{ f.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════
           SECTION 6: SPECS — Oversized Metrics
           Composition: centered
           Background: dark with accent tint
      ═══════════════════════════════════════════ -->
      <section class="section section--specs" aria-label="产品参数">
        <div class="container">
          <div class="specs-grid" data-reveal>
            <div v-for="s in cfg.specs" :key="s.label" class="spec-block">
              <span class="spec-number">{{ s.value }}</span>
              <span class="spec-unit">{{ s.unit }}</span>
              <span class="spec-label">{{ s.label }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════
           SECTION 7: NEWSLETTER — Clean CTA
           Composition: centered
           Background: solid surface with border
      ═══════════════════════════════════════════ -->
      <section class="section" aria-label="订阅资讯">
        <div class="container">
          <div class="newsletter-block" data-reveal>
            <div class="newsletter-content">
              <h2 class="newsletter-title">{{ cfg.newsletter.title }}</h2>
              <p class="newsletter-desc">{{ cfg.newsletter.desc }}</p>
            </div>
            <form class="newsletter-form" @submit.prevent="handleSubscribe">
              <label for="nl-email" class="sr-only">邮箱地址</label>
              <div class="input-group">
                <input id="nl-email" v-model="email" type="email" :placeholder="cfg.newsletter.placeholder" required class="nl-input"/>
                <button type="submit" class="nl-btn" :disabled="subscribed">
                  {{ subscribed ? '已订阅' : cfg.newsletter.cta }}
                </button>
              </div>
              <p v-if="subscribed" class="nl-success" role="status">感谢订阅。</p>
            </form>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="footer" role="contentinfo">
      <div class="container">
        <div class="footer-top">
          <div class="footer-brand">
            <div class="footer-logo">
              <span class="footer-logo-mark">P</span>
              PadStudio
            </div>
            <p>{{ cfg.footer.desc }}</p>
          </div>
          <div class="footer-links">
            <div v-for="col in cfg.footer.cols" :key="col.title" class="footer-col">
              <h4>{{ col.title }}</h4>
              <NuxtLink v-for="l in col.links" :key="l.label" :to="l.to">{{ l.label }}</NuxtLink>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2026 {{ cfg.brand }}. All rights reserved.</p>
        </div>
      </div>
    </footer>

    <!-- Scroll to top -->
    <Transition name="fade">
      <button v-show="scrolled" class="top-btn" aria-label="回到顶部" @click="scrollToTop">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 15l-6-6-6 6"/></svg>
      </button>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import cfg from '../site.config';
import { usePublishedProducts } from '~/composables/use-published-products';

definePageMeta({ layout: false });

useSeoMeta({
  title: cfg.seo.title,
  description: cfg.seo.description,
  ogTitle: cfg.seo.ogTitle,
  ogDescription: cfg.seo.ogDescription,
});

useHead({
  htmlAttrs: { lang: 'zh-CN' },
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>%F0%9F%96%AF</text></svg>' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap' },
  ],
});

const { fetchPublishedProducts, getPublishedProductImage: getImg, getPublishedProductPath: getPath } = usePublishedProducts();

const loading = ref(true);
const products = ref<any[]>([]);
const scrolled = ref(false);
const menuOpen = ref(false);
const email = ref('');
const subscribed = ref(false);

const catImages = [
  'https://picsum.photos/seed/gaming-desk-mousepad/800/500',
  'https://picsum.photos/seed/office-desk-mat/600/400',
  'https://picsum.photos/seed/extra-large-deskpad/600/400',
  'https://picsum.photos/seed/rgb-gaming-setup/600/400',
  'https://picsum.photos/seed/wireless-charging-desk/600/400',
];

const featureImages = [
  'https://picsum.photos/seed/mousepad-surface-detail/800/600',
  'https://picsum.photos/seed/mousepad-stitching-edge/800/600',
  'https://picsum.photos/seed/mousepad-rubber-base/800/600',
  'https://picsum.photos/seed/mousepad-custom-print/800/600',
];

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
  document.body.style.overflow = menuOpen.value ? 'hidden' : '';
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleSubscribe() {
  if (email.value) {
    subscribed.value = true;
    email.value = '';
  }
}

onMounted(async () => {
  try {
    products.value = (await fetchPublishedProducts({ pageSize: 8, random: true })) || [];
  } catch {} finally {
    loading.value = false;
  }

  const onScroll = () => { scrolled.value = window.scrollY > 80; };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Staggered reveal with IntersectionObserver
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    await nextTick();
    const reveals = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.delay || '0';
            setTimeout(() => el.classList.add('in-view'), parseInt(delay));
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );
    reveals.forEach((el, i) => {
      (el as HTMLElement).dataset.delay = String(i * 60);
      observer.observe(el);
    });
  } else {
    await nextTick();
    document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('in-view'));
  }
});

watch(menuOpen, (val) => {
  if (!val) document.body.style.overflow = '';
});
</script>

<style>
/* ============================================================
   PADSTUDIO — Precision Instrument Design System
   Vibe: Ethereal Glass | Layout: Asymmetric Bento
   DESIGN_VARIANCE: 8 | MOTION_INTENSITY: 6 | VISUAL_DENSITY: 3
   Palette: OLED Black + Electric Blue
   ============================================================ */

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

.site {
  font-family: 'Outfit', 'PingFang SC', 'Noto Sans SC', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #a1a1aa;
  background: #050505;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}
.site a { color: inherit; text-decoration: none; }
img { display: block; max-width: 100%; }
button { font: inherit; }

.sr-only {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border-width: 0;
}

.skip-link {
  position: absolute; top: -100%; left: 1rem;
  padding: 0.75rem 1.5rem; background: #2563eb; color: #fff;
  border-radius: 0 0 12px 12px; font-weight: 600; z-index: 9999;
  transition: top 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.skip-link:focus { top: 0; }

:focus-visible { outline: 2px solid #2563eb; outline-offset: 3px; border-radius: 4px; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  html { scroll-behavior: auto; }
}

/* --- Scroll Reveal System --- */
[data-reveal] {
  opacity: 0;
  transform: translateY(24px);
  filter: blur(4px);
  transition:
    opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
    filter 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
[data-reveal].in-view {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

/* --- Container --- */
.container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }

/* ═══════════════════════════════════════════
   HEADER — Floating Glass Pill
   ═══════════════════════════════════════════ */
.header {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; justify-content: center;
  padding: 0.75rem 1.5rem;
  pointer-events: none;
}

.header-pill {
  display: flex; align-items: center; gap: 2rem;
  padding: 0.5rem 1.5rem 0.5rem 1rem;
  border-radius: 100px;
  background: rgba(5, 5, 5, 0.7);
  backdrop-filter: blur(24px) saturate(1.4);
  -webkit-backdrop-filter: blur(24px) saturate(1.4);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  pointer-events: auto;
  transition: border-color 0.4s, box-shadow 0.4s;
}
.header.scrolled .header-pill {
  border-color: rgba(37, 99, 235, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(37, 99, 235, 0.05);
}

.logo {
  display: flex; align-items: center; gap: 0.5rem;
  font-weight: 700; font-size: 0.9rem;
  transition: opacity 0.2s;
}
.logo:hover { opacity: 0.7; }
.logo-mark {
  display: flex; align-items: center; justify-content: center;
  width: 28px; height: 28px; border-radius: 8px;
  background: #2563eb;
  color: #fff; font-weight: 800; font-size: 0.75rem;
}
.logo-text { letter-spacing: -0.02em; color: #fafafa; }

.nav { display: flex; gap: 1.75rem; }
.nav-link {
  font-size: 0.8rem; font-weight: 500; color: #71717a;
  padding: 0.25rem 0; position: relative;
  transition: color 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.nav-link::after {
  content: ''; position: absolute; bottom: -2px; left: 50%; transform: translateX(-50%);
  width: 0; height: 1.5px; background: #2563eb;
  border-radius: 1px;
  transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.nav-link:hover { color: #fafafa; }
.nav-link:hover::after { width: 100%; }

.header-actions { display: flex; gap: 0.15rem; }
.icon-btn {
  display: flex; align-items: center; justify-content: center;
  width: 36px; height: 36px; border-radius: 100px;
  transition: background 0.3s, color 0.3s; color: #71717a;
}
.icon-btn:hover { background: rgba(37, 99, 235, 0.1); color: #2563eb; }
.icon-btn svg { width: 18px; height: 18px; }

.burger {
  display: none; flex-direction: column; gap: 5px;
  background: none; border: none; cursor: pointer;
  padding: 8px; width: 40px; height: 40px;
  justify-content: center; align-items: center;
}
.burger-line {
  display: block; width: 18px; height: 1.5px;
  background: #fafafa; border-radius: 1px;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s;
}
.burger-line.open:first-child { transform: translateY(3.5px) rotate(45deg); }
.burger-line.open:last-child { transform: translateY(-3.5px) rotate(-45deg); }

@media (max-width: 768px) {
  .nav { display: none; }
  .header-actions { display: none; }
  .burger { display: flex; }
  .header { padding: 0.5rem 1rem; }
}

/* --- Mobile Drawer --- */
.drawer-overlay {
  position: fixed; inset: 0; z-index: 200;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  opacity: 0; pointer-events: none;
  transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.drawer-overlay.open { opacity: 1; pointer-events: auto; }

.drawer {
  position: fixed; top: 0; left: 0; bottom: 0; width: 320px; max-width: 85vw;
  background: #0a0a0a; z-index: 201;
  transform: translateX(-100%);
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex; flex-direction: column;
  border-right: 1px solid rgba(255, 255, 255, 0.04);
}
.drawer.open { transform: translateX(0); }

.drawer-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}
.drawer-logo { font-weight: 700; font-size: 1.1rem; color: #fafafa; }
.drawer-close {
  display: flex; align-items: center; justify-content: center;
  width: 36px; height: 36px; border: none; background: none;
  cursor: pointer; border-radius: 10px; color: #71717a;
  transition: background 0.2s, color 0.2s;
}
.drawer-close:hover { background: rgba(255, 255, 255, 0.04); color: #fafafa; }
.drawer-close svg { width: 20px; height: 20px; }

.drawer-nav { flex: 1; padding: 1rem; display: flex; flex-direction: column; gap: 0.15rem; }
.drawer-link {
  padding: 0.9rem 1.25rem; border-radius: 12px; font-size: 0.95rem;
  font-weight: 500; color: #71717a;
  transition: background 0.2s, color 0.2s;
}
.drawer-link:hover { background: rgba(37, 99, 235, 0.06); color: #2563eb; }

/* ═══════════════════════════════════════════
   HERO — Cinematic Product Lead
   ═══════════════════════════════════════════ */
.hero {
  position: relative; min-height: 100dvh;
  display: flex; align-items: flex-end;
  overflow: hidden;
}

.hero-bg {
  position: absolute; inset: 0;
}
.hero-bg-img {
  width: 100%; height: 100%; object-fit: cover;
  object-position: center 40%;
}
.hero-overlay {
  position: absolute; inset: 0;
  background:
    linear-gradient(to top, #050505 0%, rgba(5,5,5,0.7) 40%, rgba(5,5,5,0.2) 70%, rgba(5,5,5,0.4) 100%),
    radial-gradient(ellipse 60% 50% at 70% 50%, rgba(37, 99, 235, 0.08) 0%, transparent 70%);
}

.hero-content {
  position: relative; z-index: 1;
  padding: 0 0 6rem; max-width: 1200px; margin: 0 auto; width: 100%;
  padding-left: 1.5rem; padding-right: 1.5rem;
}

/* Eyebrow */
.eyebrow {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-size: 0.7rem; font-weight: 600; color: #2563eb;
  letter-spacing: 0.1em; text-transform: uppercase;
  margin-bottom: 1.5rem;
  padding: 0.4rem 0.9rem;
  border-radius: 100px;
  background: rgba(37, 99, 235, 0.08);
  border: 1px solid rgba(37, 99, 235, 0.12);
}
.eyebrow--center { margin-left: auto; margin-right: auto; }
.eyebrow-dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: #2563eb;
  animation: pulse-dot 2.5s ease-in-out infinite;
}
@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.7); }
}

.hero-title {
  font-size: clamp(2.8rem, 6vw, 4.5rem);
  font-weight: 800; line-height: 1.02; margin-bottom: 1.25rem;
  color: #fafafa; letter-spacing: -0.035em;
  max-width: 560px;
}
.hero-title--accent {
  background: linear-gradient(135deg, #60a5fa, #2563eb);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-desc {
  font-size: 1.05rem; color: #a1a1aa; max-width: 420px;
  margin-bottom: 2.5rem; line-height: 1.7;
  font-weight: 300;
}

.hero-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center; }

/* CTA Primary — Button-in-Button pattern */
.cta-primary {
  display: inline-flex; align-items: center; gap: 0;
  padding: 0.9rem 1.25rem 0.9rem 1.75rem;
  border-radius: 100px; border: none;
  background: #2563eb; color: #fff;
  font-size: 0.875rem; font-weight: 600; cursor: pointer;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 20px rgba(37, 99, 235, 0.3);
}
.cta-primary:hover {
  background: #1d4ed8;
  box-shadow: 0 8px 32px rgba(37, 99, 235, 0.4);
  transform: translateY(-2px);
}
.cta-primary:active { transform: scale(0.97) translateY(0); }

.cta-icon-wrap {
  display: flex; align-items: center; justify-content: center;
  width: 28px; height: 28px; border-radius: 100px;
  background: rgba(255, 255, 255, 0.15);
  margin-left: 0.75rem;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s;
}
.cta-primary:hover .cta-icon-wrap {
  transform: translate(2px, -1px);
  background: rgba(255, 255, 255, 0.2);
}
.cta-icon { width: 14px; height: 14px; }

.cta-ghost {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 0.9rem 1.75rem; border-radius: 100px;
  background: transparent; color: #d4d4d8;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.875rem; font-weight: 500;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.cta-ghost:hover {
  border-color: rgba(37, 99, 235, 0.3);
  color: #2563eb;
  background: rgba(37, 99, 235, 0.04);
}

@media (max-width: 768px) {
  .hero { min-height: 85dvh; align-items: flex-end; }
  .hero-content { padding-bottom: 4rem; }
}

/* ═══════════════════════════════════════════
   TRUST — Oversized Metrics
   ═══════════════════════════════════════════ */
.trust {
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  background: rgba(37, 99, 235, 0.015);
}

.trust-inner {
  display: flex; align-items: center; justify-content: center;
  gap: 4rem; max-width: 1200px; margin: 0 auto;
  padding: 2rem 1.5rem; flex-wrap: wrap;
}

.trust-item {
  display: flex; flex-direction: column; align-items: center; gap: 0.3rem;
}

.trust-value {
  font-size: 1.6rem; font-weight: 700; color: #fafafa;
  font-variant-numeric: tabular-nums; letter-spacing: -0.02em;
}
.trust-label { font-size: 0.75rem; color: #52525b; font-weight: 400; }

@media (max-width: 768px) {
  .trust-inner { gap: 2rem; padding: 1.5rem 1rem; }
  .trust-value { font-size: 1.2rem; }
}

/* ═══════════════════════════════════════════
   SECTIONS — Shared
   ═══════════════════════════════════════════ */
.section { padding: 7rem 0; }
.section--alt { background: rgba(255, 255, 255, 0.008); }

.section-head {
  display: flex; align-items: flex-end; justify-content: space-between;
  margin-bottom: 3.5rem;
}
.section-head--center { flex-direction: column; align-items: center; text-align: center; }

.section-title {
  font-size: 1.8rem; font-weight: 700; color: #fafafa;
  letter-spacing: -0.025em;
}
.section-sub { font-size: 0.9rem; color: #52525b; margin-top: 0.4rem; font-weight: 300; }

.link-more {
  display: inline-flex; align-items: center; gap: 0.3rem;
  font-size: 0.8rem; font-weight: 600; color: #2563eb;
  transition: gap 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s;
  white-space: nowrap;
}
.link-more:hover { gap: 0.5rem; opacity: 0.8; }

/* ═══════════════════════════════════════════
   CATEGORIES — Asymmetric Bento
   Double-Bezel architecture
   ═══════════════════════════════════════════ */
.cat-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 1rem;
}
.cat-card--0 { grid-column: 1 / 2; grid-row: 1 / 3; }
.cat-card--1 { grid-column: 2 / 3; grid-row: 1; }
.cat-card--2 { grid-column: 3 / 4; grid-row: 1; }
.cat-card--3 { grid-column: 2 / 3; grid-row: 2; }
.cat-card--4 { grid-column: 3 / 4; grid-row: 2; }

.cat-card {
  display: block; text-decoration: none;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.cat-card:hover { transform: translateY(-4px); }

/* Double-Bezel: Outer Shell */
.cat-card-shell {
  border-radius: 20px; overflow: hidden;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: border-color 0.4s, box-shadow 0.4s;
}
.cat-card:hover .cat-card-shell {
  border-color: rgba(37, 99, 235, 0.12);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

.cat-visual {
  width: 100%; aspect-ratio: 16/10; position: relative;
  overflow: hidden;
}
.cat-card--0 .cat-visual { aspect-ratio: auto; height: 260px; }

.cat-img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.cat-card:hover .cat-img { transform: scale(1.05); }

.cat-img-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(5, 5, 5, 0.5) 0%, transparent 50%);
  pointer-events: none;
}

.cat-info {
  padding: 1.1rem 1.25rem;
  display: flex; flex-direction: column; gap: 0.15rem;
}
.cat-name { font-size: 0.88rem; font-weight: 600; color: #e4e4e7; }
.cat-desc { font-size: 0.72rem; color: #52525b; }

@media (max-width: 768px) {
  .cat-grid { grid-template-columns: 1fr 1fr; grid-template-rows: auto; }
  .cat-card--0 { grid-column: 1 / -1; grid-row: auto; }
  .cat-card--0 .cat-visual { height: auto; aspect-ratio: 16/9; }
  .cat-card--1, .cat-card--2, .cat-card--3, .cat-card--4 { grid-column: auto; grid-row: auto; }
  .section { padding: 4rem 0; }
}

/* ═══════════════════════════════════════════
   PRODUCTS — Gapless Bento
   Double-Bezel architecture
   ═══════════════════════════════════════════ */
.product-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;
}

.product-card {
  display: block; text-decoration: none;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.product-card:hover { transform: translateY(-4px); }

.product-card-shell {
  border-radius: 16px; overflow: hidden;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  transition: border-color 0.4s, box-shadow 0.4s;
}
.product-card:hover .product-card-shell {
  border-color: rgba(37, 99, 235, 0.1);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
}

.product-img-wrap {
  position: relative; aspect-ratio: 1; overflow: hidden;
  background: #0a0a0a;
}
.product-img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.product-card:hover .product-img { transform: scale(1.04); }

.product-badge {
  position: absolute; top: 0.6rem; right: 0.6rem;
  background: #2563eb; color: #fff;
  font-size: 0.65rem; font-weight: 700;
  padding: 0.2rem 0.55rem; border-radius: 100px;
}

.product-meta { padding: 0.85rem 1rem 1rem; }
.product-name {
  font-size: 0.82rem; font-weight: 500; line-height: 1.4;
  margin-bottom: 0.4rem; display: -webkit-box;
  -webkit-line-clamp: 2; -webkit-box-orient: vertical;
  overflow: hidden; color: #a1a1aa;
}
.product-price { display: flex; align-items: baseline; gap: 0.4rem; }
.price {
  font-size: 0.95rem; font-weight: 700; color: #fafafa;
  font-variant-numeric: tabular-nums;
}
.price-original {
  font-size: 0.75rem; color: #3f3f46; text-decoration: line-through;
  font-variant-numeric: tabular-nums;
}

@media (max-width: 768px) { .product-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; } }
@media (min-width: 769px) and (max-width: 1024px) { .product-grid { grid-template-columns: repeat(3, 1fr); } }

.product-skeleton { display: flex; flex-direction: column; gap: 0.6rem; }
.skeleton-img { aspect-ratio: 1; border-radius: 16px; background: #0f0f0f; }
.skeleton-text { height: 12px; border-radius: 4px; background: #0f0f0f; width: 80%; }
.skeleton-text--short { width: 50%; }
.skeleton-pulse { animation: skeletonPulse 1.8s ease-in-out infinite; }
@keyframes skeletonPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

/* ═══════════════════════════════════════════
   FEATURES — Editorial Zigzag
   Full-bleed image + text, alternating
   ═══════════════════════════════════════════ */
.features { display: flex; flex-direction: column; gap: 1px; }

.feature-row {
  display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;
  padding: 3.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
}
.feature-row:last-child { border-bottom: none; }
.feature-row--reverse { direction: rtl; }
.feature-row--reverse > * { direction: ltr; }

.feature-visual { position: relative; }

/* Double-Bezel for feature images */
.feature-img-shell {
  border-radius: 20px; overflow: hidden;
  padding: 0.4rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
}
.feature-img {
  width: 100%; aspect-ratio: 4/3; object-fit: cover;
  border-radius: calc(20px - 0.4rem);
}

.feature-text { padding: 1rem 0; }

.feature-icon-wrap {
  width: 56px; height: 56px; border-radius: 16px;
  background: rgba(37, 99, 235, 0.06);
  border: 1px solid rgba(37, 99, 235, 0.08);
  display: flex; align-items: center; justify-content: center;
  color: #2563eb; margin-bottom: 1.5rem;
}
.feature-icon-wrap svg { width: 24px; height: 24px; }

.feature-title {
  font-size: 1.35rem; font-weight: 700; margin-bottom: 0.6rem;
  color: #fafafa; letter-spacing: -0.015em;
}
.feature-desc {
  font-size: 0.9rem; color: #71717a; line-height: 1.8; max-width: 380px;
  font-weight: 300;
}

@media (max-width: 768px) {
  .feature-row, .feature-row--reverse {
    grid-template-columns: 1fr; gap: 2rem; padding: 2.5rem 0;
    direction: ltr;
  }
  .feature-img-shell { padding: 0.3rem; }
  .feature-icon-wrap { width: 48px; height: 48px; border-radius: 14px; }
  .feature-icon-wrap svg { width: 20px; height: 20px; }
}

/* ═══════════════════════════════════════════
   SPECS — Oversized Metrics Strip
   ═══════════════════════════════════════════ */
.section--specs {
  background: rgba(37, 99, 235, 0.02);
  border-top: 1px solid rgba(37, 99, 235, 0.06);
  border-bottom: 1px solid rgba(37, 99, 235, 0.06);
}

.specs-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px; overflow: hidden;
}

.spec-block {
  display: flex; flex-direction: column; align-items: center;
  gap: 0.2rem; padding: 3rem 1rem;
  background: #050505;
  transition: background 0.4s;
}
.spec-block:hover { background: rgba(37, 99, 235, 0.03); }

.spec-number {
  font-size: 3rem; font-weight: 800; color: #fafafa;
  font-variant-numeric: tabular-nums; line-height: 1; letter-spacing: -0.04em;
}
.spec-unit {
  font-size: 0.9rem; font-weight: 300; color: #3f3f46;
  margin-top: -0.15rem;
}
.spec-label { font-size: 0.78rem; color: #52525b; margin-top: 0.3rem; }

@media (max-width: 768px) {
  .specs-grid { grid-template-columns: repeat(2, 1fr); }
  .spec-number { font-size: 2.2rem; }
  .spec-block { padding: 2rem 1rem; }
}

/* ═══════════════════════════════════════════
   NEWSLETTER — Clean CTA
   ═══════════════════════════════════════════ */
.newsletter-block {
  display: flex; align-items: center; justify-content: space-between;
  gap: 3rem; padding: 3rem 3.5rem;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
}

.newsletter-title {
  font-size: 1.3rem; font-weight: 700; color: #fafafa; margin-bottom: 0.3rem;
  letter-spacing: -0.015em;
}
.newsletter-desc { font-size: 0.85rem; color: #52525b; font-weight: 300; }

.newsletter-form { flex: 1; max-width: 400px; }
.input-group {
  display: flex; padding: 0.3rem;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: border-color 0.3s;
}
.input-group:focus-within { border-color: rgba(37, 99, 235, 0.3); }

.nl-input {
  flex: 1; border: none; outline: none; padding: 0.7rem 1.25rem;
  font-size: 0.85rem; background: transparent; color: #e4e4e7; min-width: 0;
}
.nl-input::placeholder { color: #3f3f46; }

.nl-btn {
  padding: 0.7rem 1.5rem;
  background: #2563eb; color: #fff; border: none; border-radius: 100px;
  font-size: 0.8rem; font-weight: 600; cursor: pointer;
  transition: background 0.3s, transform 0.2s;
  white-space: nowrap;
}
.nl-btn:hover { background: #1d4ed8; }
.nl-btn:active { transform: scale(0.97); }
.nl-btn:disabled { opacity: 0.4; cursor: default; }

.nl-success {
  margin-top: 0.6rem; font-size: 0.75rem;
  color: #22c55e; font-weight: 500;
}

@media (max-width: 768px) {
  .newsletter-block { flex-direction: column; padding: 2rem 1.5rem; text-align: center; gap: 1.5rem; border-radius: 20px; }
  .newsletter-form { max-width: 100%; width: 100%; }
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */
.footer {
  background: #030303; color: #3f3f46;
  padding-top: 4rem;
  border-top: 1px solid rgba(255, 255, 255, 0.03);
}

.footer-top {
  display: grid; grid-template-columns: 1.5fr 2fr; gap: 4rem;
  padding-bottom: 3rem; border-bottom: 1px solid rgba(255, 255, 255, 0.03);
}

.footer-logo {
  display: flex; align-items: center; gap: 0.5rem;
  font-size: 1rem; font-weight: 700; color: #d4d4d8; margin-bottom: 0.75rem;
}
.footer-logo-mark {
  display: flex; align-items: center; justify-content: center;
  width: 24px; height: 24px; border-radius: 6px;
  background: #2563eb; color: #fff; font-weight: 800; font-size: 0.7rem;
}

.footer-brand p { font-size: 0.8rem; line-height: 1.65; opacity: 0.35; max-width: 260px; }

.footer-links { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
.footer-col h4 {
  font-size: 0.72rem; font-weight: 700; color: #71717a;
  margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.06em;
}
.footer-col a {
  display: block; font-size: 0.8rem; padding: 0.35rem 0;
  opacity: 0.35; transition: opacity 0.25s, color 0.25s;
}
.footer-col a:hover { opacity: 1; color: #2563eb; }

.footer-bottom {
  text-align: center; padding: 1.25rem 0;
  font-size: 0.7rem; opacity: 0.18;
}

@media (max-width: 768px) {
  .footer-top { grid-template-columns: 1fr; gap: 2rem; }
  .footer-links { grid-template-columns: repeat(2, 1fr); }
}

/* --- Scroll to Top --- */
.top-btn {
  position: fixed; bottom: 2rem; right: 2rem;
  width: 48px; height: 48px; border-radius: 100px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(5, 5, 5, 0.85); color: #71717a;
  cursor: pointer; backdrop-filter: blur(12px);
  display: flex; align-items: center; justify-content: center;
  z-index: 50;
  transition: background 0.3s, transform 0.3s, color 0.3s, border-color 0.3s;
}
.top-btn:hover {
  background: rgba(37, 99, 235, 0.08);
  border-color: rgba(37, 99, 235, 0.2);
  color: #2563eb; transform: translateY(-3px);
}
.top-btn:active { transform: scale(0.95); }
.top-btn svg { width: 18px; height: 18px; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media (max-width: 480px) {
  .hero-title { font-size: 2.2rem; }
  .hero-desc { font-size: 0.9rem; }
  .hero-actions { flex-direction: column; align-items: stretch; }
  .cta-primary, .cta-ghost { width: 100%; justify-content: center; }
  .section-title { font-size: 1.4rem; }
}
</style>
