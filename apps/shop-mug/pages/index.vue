<template>
  <div class="mug-site" :class="{ 'menu-open': menuOpen }">
    <!-- Skip to content for accessibility -->
    <a href="#main-content" class="skip-link">跳转到主要内容</a>

    <!-- Header -->
    <header class="header" :class="{ scrolled }" role="banner">
      <div class="header-inner">
        <NuxtLink to="/" class="logo" aria-label="MugAtelier 首页">
          <svg class="logo-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M8 6C8 4.89543 8.89543 4 10 4H22C23.1046 4 24 4.89543 24 6V8C24 8 26 8 26 10V22C26 25.3137 23.3137 28 20 28H12C8.68629 28 6 25.3137 6 22V10C6 8 8 8 8 8V6Z" fill="currentColor" opacity="0.15"/>
            <path d="M8 6C8 4.89543 8.89543 4 10 4H22C23.1046 4 24 4.89543 24 6V8C24 8 26 8 26 10V22C26 25.3137 23.3137 28 20 28H12C8.68629 28 6 25.3137 6 22V10C6 8 8 8 8 8V6Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M26 12H28C28.5523 12 29 12.4477 29 13V19C29 19.5523 28.5523 20 28 20H26" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 16H22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>
            <path d="M13 4V2M19 4V2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.3"/>
          </svg>
          <span class="logo-text">MugAtelier</span>
        </NuxtLink>

        <nav class="nav" role="navigation" aria-label="主导航">
          <NuxtLink
            v-for="n in cfg.nav"
            :key="n.to"
            :to="n.to"
            class="nav-link"
          >{{ n.label }}</NuxtLink>
        </nav>

        <div class="header-right">
          <NuxtLink to="/login" class="icon-btn" aria-label="用户登录">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </NuxtLink>
        </div>

        <button
          class="burger"
          :aria-expanded="menuOpen"
          aria-label="打开菜单"
          @click="toggleMenu"
        >
          <span class="burger-line" :class="{ open: menuOpen }"/>
          <span class="burger-line" :class="{ open: menuOpen }"/>
          <span class="burger-line" :class="{ open: menuOpen }"/>
        </button>
      </div>
    </header>

    <!-- Mobile Drawer -->
    <Teleport to="body">
      <div
        class="drawer-overlay"
        :class="{ open: menuOpen }"
        aria-hidden="true"
        @click="menuOpen = false"
      />
      <aside
        class="drawer"
        :class="{ open: menuOpen }"
        role="dialog"
        aria-label="移动端导航"
      >
        <div class="drawer-header">
          <span class="drawer-logo">MugAtelier</span>
          <button class="drawer-close" aria-label="关闭菜单" @click="menuOpen = false">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <nav class="drawer-nav" role="navigation" aria-label="移动端导航">
          <NuxtLink
            v-for="n in cfg.nav"
            :key="n.to"
            :to="n.to"
            class="drawer-link"
            @click="menuOpen = false"
          >{{ n.label }}</NuxtLink>
        </nav>
      </aside>
    </Teleport>

    <!-- Main Content -->
    <main id="main-content">
      <!-- Hero -->
      <section class="hero" aria-label="首页横幅">
        <div class="hero-bg" aria-hidden="true">
          <div class="hero-grain"/>
        </div>
        <div class="hero-content">
          <p class="hero-eyebrow">{{ cfg.hero.eyebrow }}</p>
          <h1 class="hero-title">{{ cfg.hero.title }}</h1>
          <p class="hero-desc">{{ cfg.hero.desc }}</p>
          <div class="hero-actions">
            <NuxtLink to="/search" class="btn btn-primary">{{ cfg.hero.cta }}</NuxtLink>
            <NuxtLink to="/search" class="btn btn-ghost">{{ cfg.hero.secondaryCta }}</NuxtLink>
          </div>
        </div>
        <div class="hero-scroll" aria-hidden="true">
          <div class="scroll-indicator">
            <div class="scroll-dot"/>
          </div>
        </div>
      </section>

      <!-- Categories -->
      <section class="section" aria-label="杯具分类">
        <div class="container">
          <div class="section-header">
            <div>
              <p class="section-eyebrow">品类精选</p>
              <h2 class="section-title">杯具分类</h2>
            </div>
            <NuxtLink to="/search" class="link-more">
              查看全部
              <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"/>
              </svg>
            </NuxtLink>
          </div>
          <div class="cat-grid">
            <NuxtLink
              v-for="(c, i) in cfg.categories"
              :key="c.slug"
              :to="`/search?type=${c.slug}`"
              class="cat-card"
              :style="{ '--delay': `${i * 60}ms` }"
            >
              <div class="cat-visual" :style="{ background: catColors[c.slug] }">
                <img
                  v-if="getCatImg(c.slug)"
                  :src="getCatImg(c.slug)"
                  :alt="c.name"
                  loading="lazy"
                  class="cat-img"
                />
                <div v-else class="cat-placeholder">
                  <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
                    <path d="M12 8C12 6.89543 12.8954 6 14 6H34C35.1046 6 36 6.89543 36 8V12C36 12 40 12 40 16V36C40 40.4183 36.4183 44 32 44H16C11.5817 44 8 40.4183 8 36V16C8 12 12 12 12 12V8Z" fill="currentColor" opacity="0.12"/>
                  </svg>
                </div>
              </div>
              <div class="cat-info">
                <span class="cat-name">{{ c.name }}</span>
                <span class="cat-desc">{{ c.desc }}</span>
              </div>
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- Products -->
      <section class="section section--alt" aria-label="热门杯具">
        <div class="container">
          <div class="section-header">
            <div>
              <p class="section-eyebrow">热门推荐</p>
              <h2 class="section-title">热门杯具</h2>
            </div>
            <NuxtLink to="/search" class="link-more">
              查看全部
              <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"/>
              </svg>
            </NuxtLink>
          </div>

          <!-- Skeleton Loading -->
          <div v-if="loading" class="product-grid">
            <div v-for="n in 8" :key="n" class="product-skeleton">
              <div class="skeleton-img skeleton-pulse"/>
              <div class="skeleton-text skeleton-pulse"/>
              <div class="skeleton-text skeleton-text--short skeleton-pulse"/>
            </div>
          </div>

          <!-- Product Grid -->
          <div v-else class="product-grid">
            <NuxtLink
              v-for="(p, i) in products"
              :key="p.id"
              :to="getPath(p)"
              class="product-card"
              :style="{ '--delay': `${i * 60}ms` }"
            >
              <div class="product-img-wrap">
                <img
                  v-if="getImg(p)"
                  :src="getImg(p)"
                  :alt="p.title"
                  loading="lazy"
                  class="product-img"
                />
                <span
                  v-if="p.originalPrice > p.price"
                  class="product-badge"
                >{{ Math.round((1 - p.price / p.originalPrice) * 100) }}% OFF</span>
                <div class="product-hover" aria-hidden="true">
                  <span class="hover-text">查看详情</span>
                </div>
              </div>
              <div class="product-meta">
                <h3 class="product-name">{{ p.title }}</h3>
                <div class="product-price">
                  <span v-if="p.price" class="price">¥{{ p.price }}</span>
                  <span v-if="p.originalPrice > p.price" class="price-original">¥{{ p.originalPrice }}</span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section class="section" aria-label="我们的优势">
        <div class="container">
          <div class="section-header section-header--center">
            <div>
              <p class="section-eyebrow">为什么选择我们</p>
              <h2 class="section-title">匠心承诺</h2>
            </div>
          </div>
          <div class="feature-grid">
            <div
              v-for="(f, i) in cfg.features"
              :key="f.title"
              class="feature-card"
              :style="{ '--delay': `${i * 80}ms` }"
            >
              <div class="feature-icon">
                <svg v-if="f.icon === 'craft'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
                <svg v-else-if="f.icon === 'safety'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
                <svg v-else-if="f.icon === 'custom'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M12 20h9"/>
                  <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <rect x="1" y="3" width="15" height="13"/>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/>
                  <circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              </div>
              <h3 class="feature-title">{{ f.title }}</h3>
              <p class="feature-desc">{{ f.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Trust Signals -->
      <section class="section section--dark" aria-label="数据统计">
        <div class="container">
          <div class="trust-grid">
            <div
              v-for="t in cfg.trustSignals"
              :key="t.label"
              class="trust-item"
            >
              <span class="trust-value">{{ t.value }}</span>
              <span class="trust-label">{{ t.label }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Newsletter -->
      <section class="section" aria-label="订阅资讯">
        <div class="container">
          <div class="newsletter-card">
            <div class="newsletter-content">
              <h2 class="newsletter-title">{{ cfg.newsletter.title }}</h2>
              <p class="newsletter-desc">{{ cfg.newsletter.desc }}</p>
            </div>
            <form class="newsletter-form" @submit.prevent="handleSubscribe">
              <div class="input-wrap">
                <input
                  v-model="email"
                  type="email"
                  :placeholder="cfg.newsletter.placeholder"
                  required
                  class="newsletter-input"
                  aria-label="邮箱地址"
                />
                <button type="submit" class="newsletter-btn" :disabled="subscribed">
                  {{ subscribed ? '已订阅' : cfg.newsletter.cta }}
                </button>
              </div>
              <p v-if="subscribed" class="subscribe-success" role="status">感谢订阅！我们会将最新资讯发送到您的邮箱。</p>
            </form>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="footer" role="contentinfo">
      <div class="container footer-grid">
        <div class="footer-brand">
          <span class="footer-logo">
            <svg class="footer-logo-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path d="M8 6C8 4.89543 8.89543 4 10 4H22C23.1046 4 24 4.89543 24 6V8C24 8 26 8 26 10V22C26 25.3137 23.3137 28 20 28H12C8.68629 28 6 25.3137 6 22V10C6 8 8 8 8 8V6Z" stroke="currentColor" stroke-width="1.5"/>
            </svg>
            MugAtelier
          </span>
          <p>{{ cfg.footer.desc }}</p>
        </div>
        <div v-for="col in cfg.footer.cols" :key="col.title" class="footer-col">
          <h4>{{ col.title }}</h4>
          <NuxtLink v-for="l in col.links" :key="l.label" :to="l.to">{{ l.label }}</NuxtLink>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 {{ cfg.brand }}. All rights reserved.</p>
      </div>
    </footer>

    <!-- Scroll to top -->
    <Transition name="fade">
      <button
        v-show="scrolled"
        class="top-btn"
        aria-label="回到顶部"
        @click="scrollToTop"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M18 15l-6-6-6 6"/>
        </svg>
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
  link: [{
    rel: 'icon',
    type: 'image/svg+xml',
    href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>☕</text></svg>',
  }],
});

const { fetchPublishedProducts, getPublishedProductImage: getImg, getPublishedProductPath: getPath } = usePublishedProducts();

const loading = ref(true);
const products = ref<any[]>([]);
const scrolled = ref(false);
const menuOpen = ref(false);
const email = ref('');
const subscribed = ref(false);

const catColors: Record<string, string> = {
  '咖啡杯': '#f5efe6',
  '陶瓷杯': '#e8e0d4',
  '保温杯': '#dce5e8',
  '马克杯': '#f0e8dc',
  '茶杯': '#e4ebe0',
  '玻璃杯': '#e8e4f0',
};

function getCatImg(slug: string) {
  const m = products.value.find(p => (p.type || p.category || '').toLowerCase().includes(slug));
  return m ? getImg(m, 600) : '';
}

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

  // Observe sections for entrance animation
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    await nextTick();
    document.querySelectorAll('.section, .hero-content').forEach((el) => {
      observer.observe(el);
    });
  }
});

// Watch menuOpen to cleanup body overflow
watch(menuOpen, (val) => {
  if (!val) document.body.style.overflow = '';
});
</script>

<style>
/* ============================================================
   MUG SITE — Premium Handcrafted Design System
   ============================================================ */

/* --- Reset & Base --- */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
.mug-site {
  font-family: 'Nunito Sans', 'Noto Sans SC', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #1c1917;
  background: #faf9f7;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.mug-site a { color: inherit; text-decoration: none; }
img { display: block; max-width: 100%; }
button { font: inherit; }

/* --- Accessibility --- */
.skip-link {
  position: absolute;
  top: -100%;
  left: 1rem;
  padding: 0.75rem 1.5rem;
  background: #c4704b;
  color: #fff;
  border-radius: 0 0 8px 8px;
  font-weight: 600;
  z-index: 9999;
  transition: top 0.2s;
}
.skip-link:focus {
  top: 0;
}

/* Focus visible for keyboard navigation */
:focus-visible {
  outline: 2px solid #c4704b;
  outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  html { scroll-behavior: auto; }
}

/* --- Container --- */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* --- Header --- */
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(250, 249, 247, 0.88);
  backdrop-filter: blur(20px) saturate(1.2);
  -webkit-backdrop-filter: blur(20px) saturate(1.2);
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.3s ease;
}
.header.scrolled {
  box-shadow: 0 1px 20px rgba(28, 25, 23, 0.06);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}
.logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 700;
  font-size: 1.15rem;
  letter-spacing: -0.01em;
  transition: opacity 0.2s;
}
.logo:hover { opacity: 0.7; }
.logo-icon { width: 28px; height: 28px; color: #c4704b; }
.logo-text { font-family: 'Playfair Display', 'Noto Serif SC', serif; }
.nav { display: flex; gap: 2rem; }
.nav-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: #78716c;
  padding: 0.25rem 0;
  position: relative;
  transition: color 0.2s;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: #c4704b;
  border-radius: 1px;
  transition: width 0.3s ease;
}
.nav-link:hover { color: #1c1917; }
.nav-link:hover::after { width: 100%; }
.header-right { display: flex; gap: 0.5rem; }
.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: background 0.2s, color 0.2s;
  color: #78716c;
}
.icon-btn:hover { background: #f5f0eb; color: #1c1917; }
.icon-btn svg { width: 20px; height: 20px; }

/* Burger */
.burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  width: 44px;
  height: 44px;
  justify-content: center;
  align-items: center;
}
.burger-line {
  display: block;
  width: 20px;
  height: 2px;
  background: #1c1917;
  border-radius: 1px;
  transition: transform 0.3s, opacity 0.3s;
}
.burger-line.open:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.burger-line.open:nth-child(2) { opacity: 0; }
.burger-line.open:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

@media (max-width: 768px) {
  .nav { display: none; }
  .header-right { display: none; }
  .burger { display: flex; }
}

/* --- Mobile Drawer --- */
.drawer-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}
.drawer-overlay.open { opacity: 1; pointer-events: auto; }
.drawer {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 300px;
  max-width: 85vw;
  background: #fff;
  z-index: 201;
  transform: translateX(-100%);
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.1);
}
.drawer.open { transform: translateX(0); }
.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #f0ebe4;
}
.drawer-logo {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 1.1rem;
}
.drawer-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 8px;
  color: #78716c;
  transition: background 0.2s;
}
.drawer-close:hover { background: #f5f0eb; }
.drawer-close svg { width: 20px; height: 20px; }
.drawer-nav {
  flex: 1;
  padding: 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.drawer-link {
  padding: 0.85rem 1rem;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 500;
  color: #44403c;
  transition: background 0.2s, color 0.2s;
}
.drawer-link:hover { background: #f5f0eb; color: #c4704b; }

/* --- Hero --- */
.hero {
  position: relative;
  min-height: min(85vh, 640px);
  display: flex;
  align-items: center;
  overflow: hidden;
}
.hero-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, #faf5ef 0%, #f0e6d8 35%, #e6d5c1 70%, #d4c0a8 100%);
}
.hero-grain {
  position: absolute;
  inset: 0;
  opacity: 0.3;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
}
.hero-content {
  position: relative;
  z-index: 1;
  padding: 5rem 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.hero-content.visible { opacity: 1; transform: translateY(0); }
.hero-eyebrow {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #c4704b;
  margin-bottom: 1rem;
}
.hero-title {
  font-family: 'Playfair Display', 'Noto Serif SC', serif;
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.15;
  margin-bottom: 1.25rem;
  color: #1c1917;
  max-width: 600px;
}
.hero-desc {
  font-size: 1.05rem;
  color: #57534e;
  max-width: 520px;
  margin-bottom: 2rem;
  line-height: 1.75;
}
.hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 2rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  border: none;
  min-height: 48px;
}
.btn-primary {
  background: #c4704b;
  color: #fff;
  box-shadow: 0 4px 14px rgba(196, 112, 75, 0.25);
}
.btn-primary:hover {
  background: #b5613e;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(196, 112, 75, 0.35);
}
.btn-ghost {
  background: transparent;
  color: #1c1917;
  border: 1.5px solid #d6d3d1;
}
.btn-ghost:hover {
  border-color: #c4704b;
  color: #c4704b;
  background: rgba(196, 112, 75, 0.04);
}

/* Hero scroll indicator */
.hero-scroll {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}
.scroll-indicator {
  width: 24px;
  height: 36px;
  border: 2px solid rgba(196, 112, 75, 0.3);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  padding-top: 6px;
}
.scroll-dot {
  width: 4px;
  height: 8px;
  background: #c4704b;
  border-radius: 2px;
  animation: scrollBounce 1.8s ease-in-out infinite;
}
@keyframes scrollBounce {
  0%, 100% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(8px); opacity: 0.3; }
}

/* --- Sections --- */
.section {
  padding: 5rem 0;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.section.visible { opacity: 1; transform: translateY(0); }
.section--alt { background: #f5f0eb; }
.section--dark {
  background: #2c1810;
  color: #e7e5e4;
}
.section--dark .section-title { color: #fff; }
.section--dark .section-eyebrow { color: #d6a573; }

.section-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 2.5rem;
}
.section-header--center { flex-direction: column; align-items: center; text-align: center; }
.section-eyebrow {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #c4704b;
  margin-bottom: 0.5rem;
}
.section-title {
  font-family: 'Playfair Display', 'Noto Serif SC', serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: #1c1917;
}
.link-more {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #c4704b;
  transition: gap 0.2s, opacity 0.2s;
}
.link-more:hover { gap: 0.6rem; opacity: 0.8; }

/* --- Categories --- */
.cat-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1.25rem;
}
.cat-card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  transition: transform 0.3s ease;
}
.cat-card:hover { transform: translateY(-6px); }
.cat-visual {
  width: 100%;
  aspect-ratio: 3/4;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cat-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.cat-card:hover .cat-img { transform: scale(1.08); }
.cat-placeholder svg {
  width: 48px;
  height: 48px;
  color: #c4704b;
  opacity: 0.4;
}
.cat-info {
  padding: 0.75rem 0.25rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}
.cat-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #1c1917;
}
.cat-desc {
  font-size: 0.75rem;
  color: #a8a29e;
}

@media (max-width: 768px) {
  .cat-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
  .section { padding: 3rem 0; }
}

/* --- Products --- */
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}
@media (max-width: 768px) { .product-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; } }
@media (min-width: 769px) and (max-width: 1024px) { .product-grid { grid-template-columns: repeat(3, 1fr); } }

.product-card {
  display: block;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease;
}
.product-card:hover { transform: translateY(-4px); }
.product-img-wrap {
  position: relative;
  aspect-ratio: 1;
  border-radius: 14px;
  overflow: hidden;
  background: #ede8e1;
}
.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.product-card:hover .product-img { transform: scale(1.06); }
.product-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: #c4704b;
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.3rem 0.65rem;
  border-radius: 8px;
  letter-spacing: 0.02em;
}
.product-hover {
  position: absolute;
  inset: 0;
  background: rgba(28, 25, 23, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.product-card:hover .product-hover { opacity: 1; }
.hover-text {
  color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.6rem 1.4rem;
  border: 1.5px solid rgba(255, 255, 255, 0.8);
  border-radius: 999px;
  backdrop-filter: blur(4px);
}
.product-meta { padding: 0.75rem 0.25rem 0; }
.product-name {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.4;
  margin-bottom: 0.35rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #1c1917;
}
.product-price {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}
.price {
  font-size: 1rem;
  font-weight: 700;
  color: #c4704b;
  font-variant-numeric: tabular-nums;
}
.price-original {
  font-size: 0.8rem;
  color: #a8a29e;
  text-decoration: line-through;
  font-variant-numeric: tabular-nums;
}

/* Skeleton Loading */
.product-skeleton {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.skeleton-img {
  aspect-ratio: 1;
  border-radius: 14px;
  background: #ede8e1;
}
.skeleton-text {
  height: 14px;
  border-radius: 6px;
  background: #ede8e1;
  width: 80%;
}
.skeleton-text--short { width: 50%; }
.skeleton-pulse {
  animation: skeletonPulse 1.8s ease-in-out infinite;
}
@keyframes skeletonPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

/* --- Features --- */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}
.feature-card {
  text-align: center;
  padding: 2.5rem 1.5rem;
  border-radius: 16px;
  background: #fff;
  border: 1px solid #f0ebe4;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(28, 25, 23, 0.06);
}
.feature-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: linear-gradient(135deg, #f5efe6, #ede5d8);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.25rem;
  color: #c4704b;
}
.feature-icon svg { width: 26px; height: 26px; }
.feature-title {
  font-family: 'Playfair Display', 'Noto Serif SC', serif;
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
  color: #1c1917;
}
.feature-desc {
  font-size: 0.825rem;
  color: #78716c;
  line-height: 1.65;
}

@media (max-width: 768px) {
  .feature-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
  .feature-card { padding: 1.5rem 1rem; }
}
@media (max-width: 480px) {
  .feature-grid { grid-template-columns: 1fr; }
}

/* --- Trust Signals --- */
.trust-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  text-align: center;
}
.trust-item { display: flex; flex-direction: column; gap: 0.35rem; }
.trust-value {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 700;
  color: #d6a573;
}
.trust-label {
  font-size: 0.85rem;
  color: #a8a29e;
}

@media (max-width: 768px) {
  .trust-grid { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
}

/* --- Newsletter --- */
.newsletter-card {
  background: linear-gradient(135deg, #f5efe6 0%, #ede5d8 100%);
  border-radius: 20px;
  padding: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
}
.newsletter-content { flex: 1; }
.newsletter-title {
  font-family: 'Playfair Display', 'Noto Serif SC', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1c1917;
  margin-bottom: 0.5rem;
}
.newsletter-desc {
  font-size: 0.9rem;
  color: #57534e;
}
.newsletter-form { flex: 1; max-width: 440px; }
.input-wrap {
  display: flex;
  background: #fff;
  border-radius: 999px;
  padding: 0.35rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}
.newsletter-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 0.75rem 1.25rem;
  font-size: 0.9rem;
  background: transparent;
  color: #1c1917;
  min-width: 0;
}
.newsletter-input::placeholder { color: #a8a29e; }
.newsletter-btn {
  padding: 0.75rem 1.75rem;
  background: #c4704b;
  color: #fff;
  border: none;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;
}
.newsletter-btn:hover { background: #b5613e; }
.newsletter-btn:disabled { opacity: 0.7; cursor: default; }
.subscribe-success {
  margin-top: 0.75rem;
  font-size: 0.8rem;
  color: #16a34a;
  font-weight: 500;
}

@media (max-width: 768px) {
  .newsletter-card { flex-direction: column; padding: 2rem; text-align: center; }
  .newsletter-form { max-width: 100%; width: 100%; }
}

/* --- Footer --- */
.footer {
  background: #1c1917;
  color: #d6d3d1;
  padding: 3.5rem 0 0;
}
.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr repeat(3, 1fr);
  gap: 2.5rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Playfair Display', serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;
}
.footer-logo-icon { width: 24px; height: 24px; }
.footer-brand p {
  font-size: 0.825rem;
  line-height: 1.7;
  opacity: 0.5;
  max-width: 280px;
}
.footer-col h4 {
  font-size: 0.85rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;
}
.footer-col a {
  display: block;
  font-size: 0.825rem;
  padding: 0.4rem 0;
  opacity: 0.45;
  transition: opacity 0.2s, color 0.2s;
}
.footer-col a:hover { opacity: 1; color: #d6a573; }
.footer-bottom {
  text-align: center;
  padding: 1.5rem 0;
  font-size: 0.75rem;
  opacity: 0.3;
}

@media (max-width: 768px) {
  .footer-grid { grid-template-columns: 1fr; gap: 2rem; }
}

/* --- Scroll to Top --- */
.top-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: #c4704b;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(196, 112, 75, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
}
.top-btn:hover {
  background: #b5613e;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(196, 112, 75, 0.4);
}
.top-btn svg { width: 20px; height: 20px; }

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* --- Responsive Fine-tuning --- */
@media (max-width: 480px) {
  .hero-title { font-size: 1.85rem; }
  .hero-desc { font-size: 0.95rem; }
  .hero-actions { flex-direction: column; }
  .btn { width: 100%; }
  .section-title { font-size: 1.4rem; }
  .trust-value { font-size: 1.5rem; }
}
</style>
