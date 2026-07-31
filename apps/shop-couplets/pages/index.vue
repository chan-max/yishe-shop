<template>
  <div class="site-couplet" :class="{ 'menu-open': menuOpen }">
    <a href="#main-content" class="skip-link">跳转到主要内容</a>

    <!-- ═══════════════════════════════════════════
         FLOATING HEADER (FESTIVE RED & GOLD)
    ═══════════════════════════════════════════ -->
    <header class="header" :class="{ scrolled }" role="banner">
      <div class="header-pill">
        <NuxtLink to="/" class="logo" aria-label="春联 首页">
          <div class="logo-badge">
            <span class="logo-character">福</span>
          </div>
          <div class="logo-text-group">
            <span class="logo-title">{{ cfg.brand }}</span>
            <span class="logo-subtitle">传世名家楹联</span>
          </div>
        </NuxtLink>

        <nav class="nav" role="navigation" aria-label="主导航">
          <NuxtLink v-for="n in cfg.nav" :key="n.to" :to="n.to" class="nav-link">
            <span>{{ n.label }}</span>
          </NuxtLink>
        </nav>

        <div class="header-actions">
          <button class="style-toggle-btn" title="切换烫金/金墨质感" @click="activeStyle = activeStyle === 'gold' ? 'ink' : 'gold'">
            <span class="toggle-icon">✨</span>
            <span class="toggle-text">{{ activeStyle === 'gold' ? '烫金质感' : '金墨质感' }}</span>
          </button>
          
          <NuxtLink to="/search" class="action-btn" aria-label="搜索春联">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="18" height="18"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          </NuxtLink>

          <NuxtLink to="/login" class="action-btn" aria-label="个人中心">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="18" height="18"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
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
          <div class="logo-badge sm">
            <span class="logo-character">福</span>
          </div>
          <span class="drawer-logo">{{ cfg.brandFull }}</span>
          <button class="drawer-close" aria-label="关闭菜单" @click="menuOpen = false">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" width="20" height="20"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <nav class="drawer-nav" role="navigation">
          <NuxtLink v-for="n in cfg.nav" :key="n.to" :to="n.to" class="drawer-link" @click="menuOpen = false">
            <span>{{ n.label }}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M9 18l6-6-6-6"/></svg>
          </NuxtLink>
        </nav>
      </aside>
    </Teleport>

    <main id="main-content">
      <!-- ═══════════════════════════════════════════
           SECTION 1: HERO — FESTIVE RED & GOLD SPLENDOR
      ═══════════════════════════════════════════ -->
      <section class="hero" aria-label="新春横幅">
        <div class="hero-bg">
          <img
            src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=2000&q=85"
            alt="新春春联红火氛围" class="hero-bg-img" loading="eager"
          />
          <div class="hero-gradient-overlay"/>
          <div class="paper-texture-overlay"/>
        </div>

        <!-- Floating Decorative Lanterns -->
        <div class="lanterns" aria-hidden="true">
          <div class="lantern lantern--left-1">
            <div class="lantern-body">
              <span class="lantern-text">福</span>
            </div>
            <div class="lantern-tassel"/>
          </div>
          <div class="lantern lantern--left-2">
            <div class="lantern-body sm">
              <span class="lantern-text">春</span>
            </div>
            <div class="lantern-tassel"/>
          </div>
          <div class="lantern lantern--right-1">
            <div class="lantern-body">
              <span class="lantern-text">禧</span>
            </div>
            <div class="lantern-tassel"/>
          </div>
        </div>

        <!-- Floating Auspicious Cloud Deco -->
        <div class="cloud-decorations" aria-hidden="true">
          <div class="cloud-gold cloud--1"/>
          <div class="cloud-gold cloud--2"/>
        </div>

        <div class="hero-container">
          <div class="hero-badge-eyebrow" data-reveal>
            <span class="badge-icon">🐉</span>
            <span class="badge-text">{{ cfg.hero.tagline }}</span>
          </div>

          <h1 class="hero-main-title" data-reveal>
            <span class="title-line title-line--gold">{{ cfg.hero.title }}</span>
            <span class="title-line title-line--red">{{ cfg.hero.subtitle }}</span>
          </h1>

          <p class="hero-description" data-reveal>
            {{ cfg.hero.desc }}
          </p>

          <div class="hero-cta-group" data-reveal>
            <NuxtLink to="/search" class="btn-primary-gold">
              <span class="btn-shine"/>
              <span>{{ cfg.hero.cta }}</span>
              <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
            </NuxtLink>

            <NuxtLink to="/contact" class="btn-secondary-silk">
              <span>{{ cfg.hero.secondaryCta }}</span>
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════
           SECTION 2: LIVE COUPLET SCROLL SHOWCASE
      ═══════════════════════════════════════════ -->
      <section class="couplet-showcase-section" aria-label="在线试赏楹联">
        <div class="section-container">
          <div class="showcase-header text-center" data-reveal>
            <span class="gold-eyebrow">— 传世名家 试赏墨宝 —</span>
            <h2 class="section-heading-gold">喜迎新春 · 千吉万祥</h2>
            <p class="section-subtext">选择吉祥词组，即刻预览安徽万年红宣与耐候沉金墨实拍美感</p>

            <!-- Preset Selector Pills -->
            <div class="preset-pills">
              <button
                v-for="(p, idx) in cfg.presets"
                :key="p.name"
                class="preset-pill"
                :class="{ active: selectedPresetIndex === idx }"
                @click="selectedPresetIndex = idx"
              >
                <span>{{ p.name }}</span>
              </button>
            </div>
          </div>

          <!-- Traditional 3-Column Scroll Presentation -->
          <div class="couplet-scroll-stage" :class="[activeStyle]" data-reveal>
            <!-- Gold Cloud Header Decoration -->
            <div class="stage-frame-deco-top" aria-hidden="true">
              <div class="deco-seal">福</div>
            </div>

            <div class="scrolls-grid">
              <!-- Left Scroll: 上联 -->
              <div class="couplet-scroll-column couplet-scroll--left">
                <div class="scroll-wood-top"/>
                <div class="scroll-paper-body">
                  <div class="scroll-tag">上联</div>
                  <div class="vertical-text calligraphy-font">
                    {{ currentPreset.left }}
                  </div>
                </div>
                <div class="scroll-wood-bottom"/>
              </div>

              <!-- Center Scroll: 横批 -->
              <div class="couplet-scroll-column couplet-scroll--center">
                <div class="scroll-paper-body-center">
                  <div class="scroll-tag">横批</div>
                  <div class="horizontal-text calligraphy-font">
                    {{ currentPreset.center }}
                  </div>
                  <div class="seal-stamp">吉庆</div>
                </div>
              </div>

              <!-- Right Scroll: 下联 -->
              <div class="couplet-scroll-column couplet-scroll--right">
                <div class="scroll-wood-top"/>
                <div class="scroll-paper-body">
                  <div class="scroll-tag">下联</div>
                  <div class="vertical-text calligraphy-font">
                    {{ currentPreset.right }}
                  </div>
                </div>
                <div class="scroll-wood-bottom"/>
              </div>
            </div>

            <!-- Action bar under scrolls -->
            <div class="scroll-action-bar">
              <NuxtLink :to="`/search?q=${encodeURIComponent(currentPreset.name)}`" class="btn-gold-outline">
                <span>定制该副书法楹联</span>
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════
           SECTION 3: OVERSIZED TRUST METRICS STRIP
      ═══════════════════════════════════════════ -->
      <section class="trust-metrics-section" aria-label="品牌品质数据">
        <div class="section-container">
          <div class="trust-grid">
            <div v-for="(t, i) in cfg.trustSignals" :key="t.label" class="trust-card" :style="{ '--delay': `${i * 0.1}s` }" data-reveal>
              <div class="trust-card-inner">
                <span class="trust-number-gold">{{ t.value }}</span>
                <span class="trust-label-text">{{ t.label }}</span>
              </div>
              <div class="trust-card-bg-glow"/>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════
           SECTION 4: BENTO GRID CATEGORIES
      ═══════════════════════════════════════════ -->
      <section class="bento-categories-section" aria-label="春联品类精选">
        <div class="section-container">
          <div class="section-header-row" data-reveal>
            <div>
              <span class="gold-eyebrow">SPRING FESTIVAL COLLECTIONS</span>
              <h2 class="section-title-dark">典藏品类 · 匠心出众</h2>
            </div>
            <NuxtLink to="/search" class="link-with-arrow">
              <span>查看全部五大系列</span>
              <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
            </NuxtLink>
          </div>

          <!-- Asymmetric Bento Grid -->
          <div class="bento-grid" data-reveal>
            <div
              v-for="(cat, idx) in cfg.categories"
              :key="cat.name"
              class="bento-card"
              :class="`bento-card--${idx}`"
            >
              <NuxtLink :to="`/search?type=${encodeURIComponent(cat.slug)}`" class="bento-card-link">
                <div class="bento-image-wrap">
                  <img :src="cat.image" :alt="cat.name" class="bento-img" loading="lazy" />
                  <div class="bento-overlay"/>
                </div>
                <div class="bento-content">
                  <span class="bento-badge">{{ cat.badge }}</span>
                  <h3 class="bento-title">{{ cat.name }}</h3>
                  <p class="bento-desc">{{ cat.desc }}</p>
                  <span class="bento-action">
                    <span>探索专区</span>
                    <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"/></svg>
                  </span>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════
           SECTION 5: CURATED PRODUCTS SHOWCASE
      ═══════════════════════════════════════════ -->
      <section class="products-section" aria-label="热门春联推荐">
        <div class="section-container">
          <div class="section-header-center text-center" data-reveal>
            <span class="gold-eyebrow">NEW YEAR SELECTION</span>
            <h2 class="section-heading-gold">名家新春真迹与尊享对联</h2>
            <p class="section-subtext">精选最受家庭与企业青睐的经典楹联珍品</p>
          </div>

          <!-- Product Filter Tabs -->
          <div class="filter-tabs" data-reveal>
            <button
              v-for="cat in filterCategories"
              :key="cat"
              class="filter-btn"
              :class="{ active: activeFilter === cat }"
              @click="activeFilter = cat"
            >
              {{ cat }}
            </button>
          </div>

          <!-- Products Grid -->
          <div class="products-grid" data-reveal>
            <div
              v-for="product in filteredProducts"
              :key="product.id || product.title"
              class="product-card"
            >
              <div class="card-media">
                <NuxtLink :to="getProductLink(product)" class="media-link">
                  <img
                    :src="getProductImg(product, 0)"
                    :alt="product.title"
                    class="img-primary"
                    loading="lazy"
                  />
                  <img
                    :src="getProductImg(product, 1)"
                    :alt="product.title"
                    class="img-secondary"
                    loading="lazy"
                  />
                </NuxtLink>

                <div class="card-badges">
                  <span class="badge-red">新春特惠</span>
                  <span v-if="product.tag" class="badge-gold">{{ product.tag }}</span>
                </div>

                <div class="quick-actions">
                  <button class="quick-view-btn" title="快速预览" @click="openQuickView(product)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    <span>快速预览</span>
                  </button>
                </div>
              </div>

              <div class="card-info">
                <div class="rating-stars" aria-label="评分 5.0 星">
                  <span class="stars">★★★★★</span>
                  <span class="rating-val">5.0</span>
                </div>

                <h3 class="product-title">
                  <NuxtLink :to="getProductLink(product)">{{ product.title }}</NuxtLink>
                </h3>

                <p class="product-snippet">{{ product.description || '万年红宣纸 · 沉金耐候墨 · 名家手书' }}</p>

                <div class="price-row">
                  <div class="prices">
                    <span class="price-current">¥{{ product.price || 298 }}</span>
                    <span v-if="product.originalPrice" class="price-old">¥{{ product.originalPrice }}</span>
                  </div>
                  <NuxtLink :to="getProductLink(product)" class="buy-btn">
                    <span>定制</span>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════
           SECTION 6: FOUR PILLARS OF CRAFTSMANSHIP
      ═══════════════════════════════════════════ -->
      <section class="craftsmanship-section" aria-label="非遗匠心工艺">
        <div class="section-container">
          <div class="craft-header text-center" data-reveal>
            <span class="gold-eyebrow">HERITAGE & CRAFTSMANSHIP</span>
            <h2 class="section-title-dark">四大传世工艺 · 岁月沉淀之美</h2>
            <p class="section-subtext">承载百年宣纸文脉与古法调墨配方，让对联持久鲜亮</p>
          </div>

          <div class="craft-grid" data-reveal>
            <div
              v-for="feat in cfg.features"
              :key="feat.title"
              class="craft-card"
            >
              <div class="craft-tag">{{ feat.tag }}</div>
              <div class="craft-icon-wrap">
                <span class="craft-emoji" v-if="feat.icon === 'paper'">📜</span>
                <span class="craft-emoji" v-else-if="feat.icon === 'ink'">✨</span>
                <span class="craft-emoji" v-else-if="feat.icon === 'brush'">🖌️</span>
                <span class="craft-emoji" v-else>🎁</span>
              </div>
              <h3 class="craft-title">{{ feat.title }}</h3>
              <p class="craft-desc">{{ feat.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════
           SECTION 7: CORPORATE & ENTERPRISE CUSTOM BANNER
      ═══════════════════════════════════════════ -->
      <section class="enterprise-banner-section" aria-label="企业春联定制">
        <div class="section-container">
          <div class="enterprise-card" data-reveal>
            <div class="enterprise-content">
              <span class="gold-eyebrow-dark">CORPORATE & MANSION CUSTOM</span>
              <h2 class="enterprise-title">企业门楼 & 豪宅定制楹联</h2>
              <p class="enterprise-desc">
                提供最大达10米特大尺寸企业大联定制，专业书法名家针对企业文化撰联挥毫，金墨压烫，气派宏伟。
              </p>
              <div class="enterprise-actions">
                <NuxtLink to="/contact" class="btn-gold-solid">
                  <span>预约专人定制服务</span>
                </NuxtLink>
                <a href="tel:400-888-9999" class="enterprise-phone">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                  <span>定制热线: 400-888-9999</span>
                </a>
              </div>
            </div>

            <div class="enterprise-graphic" aria-hidden="true">
              <div class="graphic-seal">大吉</div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════
           SECTION 8: NEWSLETTER & FESTIVE FOOTER
      ═══════════════════════════════════════════ -->
      <section class="newsletter-section" aria-label="订阅新春通讯">
        <div class="section-container">
          <div class="newsletter-card" data-reveal>
            <div class="newsletter-badge">{{ cfg.newsletter.tag }}</div>
            <h2 class="newsletter-title">{{ cfg.newsletter.title }}</h2>
            <p class="newsletter-desc">{{ cfg.newsletter.desc }}</p>

            <form class="newsletter-form" @submit.prevent="handleSubscribe">
              <input
                v-model="email"
                type="email"
                required
                :placeholder="cfg.newsletter.placeholder"
                class="newsletter-input"
              />
              <button type="submit" class="newsletter-submit">
                <span>{{ cfg.newsletter.cta }}</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>

    <!-- ═══════════════════════════════════════════
         FOOTER
    ═══════════════════════════════════════════ -->
    <footer class="site-footer" role="contentinfo">
      <div class="section-container">
        <div class="footer-top">
          <div class="footer-brand">
            <div class="logo-badge">
              <span class="logo-character">福</span>
            </div>
            <span class="footer-brand-title">{{ cfg.brandFull }}</span>
            <p class="footer-brand-desc">{{ cfg.footer.desc }}</p>
          </div>

          <div class="footer-nav-columns">
            <div v-for="col in cfg.footer.cols" :key="col.title" class="footer-col">
              <h4 class="footer-col-title">{{ col.title }}</h4>
              <ul class="footer-links">
                <li v-for="link in col.links" :key="link.label">
                  <NuxtLink :to="link.to">{{ link.label }}</NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p class="copyright">© 2026 {{ cfg.brandFull }}. 版权所有 · 喜迎乙巳蛇年</p>
          <div class="footer-badges">
            <span class="badge-item">非遗文化传承</span>
            <span class="badge-item">100% 正品保障</span>
          </div>
        </div>
      </div>
    </footer>

    <!-- Quick View Modal -->
    <Teleport to="body">
      <div v-if="quickViewProduct" class="modal-overlay" @click="quickViewProduct = null">
        <div class="modal-card" @click.stop>
          <button class="modal-close" @click="quickViewProduct = null">✕</button>
          <div class="modal-grid">
            <div class="modal-image">
              <img :src="getProductImg(quickViewProduct, 0)" :alt="quickViewProduct.title" />
            </div>
            <div class="modal-details">
              <span class="badge-gold">名家新春真迹</span>
              <h3 class="modal-title">{{ quickViewProduct.title }}</h3>
              <div class="modal-price">¥{{ quickViewProduct.price || 298 }}</div>
              <p class="modal-desc">{{ quickViewProduct.description || '特级万年红宣纸配合耐候沉金墨精制，墨宝永留春意。' }}</p>
              <NuxtLink :to="getProductLink(quickViewProduct)" class="btn-primary-gold block-btn" @click="quickViewProduct = null">
                前往定制该款春联
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import cfg from '../site.config';
import { usePublishedProducts } from '~/composables/use-published-products';

definePageMeta({ layout: false });

useSeoMeta({
  title: cfg.seo.title,
  description: cfg.seo.description,
  ogTitle: cfg.seo.ogTitle,
  ogDescription: cfg.seo.ogDescription,
  keywords: cfg.seo.keywords,
});

useHead({
  htmlAttrs: { lang: 'zh-CN' },
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Noto+Serif+SC:wght@400;600;700;900&display=swap' }
  ]
});

// Navigation & scroll state
const menuOpen = ref(false);
const scrolled = ref(false);
const activeStyle = ref<'gold' | 'ink'>('gold');
const selectedPresetIndex = ref(0);
const email = ref('');
const quickViewProduct = ref<any>(null);

const currentPreset = computed(() => cfg.presets[selectedPresetIndex.value] || cfg.presets[0]);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const handleScroll = () => {
  scrolled.value = window.scrollY > 40;
};

// Fetch real products from composable fallback
const { fetchPublishedProducts, getPublishedProductImage, getPublishedProductPath } = usePublishedProducts();
const rawProducts = ref<any[]>([]);

const defaultCouplets = [
  { id: '1', title: '【名家真迹】乙巳大吉 · 万年红沉金名家手写对联', price: 398, originalPrice: 480, tag: '书法家协会会员笔', category: '手写春联', images: ['https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80'] },
  { id: '2', title: '【烫金门联】金玉满堂 · 24K烫金重彩大门联套装', price: 268, originalPrice: 320, tag: '热销暴款', category: '烫金春联', images: ['https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80'] },
  { id: '3', title: '【企业定制】大展宏图 · 5米特大尺寸企业门楼烫金联', price: 888, originalPrice: 1080, tag: '企业首选', category: '企业春联', images: ['https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80'] },
  { id: '4', title: '【国潮礼盒】新春锦绣 · 传统福字楹联锦盒开运礼盒', price: 198, originalPrice: 258, tag: '新春送礼', category: '创意春联', images: ['https://images.unsplash.com/photo-1578926375605-eaf7559b1458?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80'] },
];

onMounted(async () => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  try {
    const fetched = await fetchPublishedProducts({ pageSize: 8, random: true });
    if (fetched && fetched.length > 0) {
      rawProducts.value = fetched;
    } else {
      rawProducts.value = defaultCouplets;
    }
  } catch (e) {
    rawProducts.value = defaultCouplets;
  }

  // Scroll reveal observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const filterCategories = ['全部', '手写春联', '烫金春联', '企业春联', '创意春联'];
const activeFilter = ref('全部');

const filteredProducts = computed(() => {
  const list = rawProducts.value.length > 0 ? rawProducts.value : defaultCouplets;
  if (activeFilter.value === '全部') return list;
  return list.filter(p => (p.category || '').includes(activeFilter.value) || (p.title || '').includes(activeFilter.value));
});

const getProductImg = (p: any, idx: number) => {
  if (p.images && p.images[idx]) return p.images[idx];
  if (p.image) return p.image;
  return defaultCouplets[idx % defaultCouplets.length].images[0];
};

const getProductLink = (p: any) => {
  return `/search?q=${encodeURIComponent(p.title || '春联')}`;
};

const openQuickView = (p: any) => {
  quickViewProduct.value = p;
};

const handleSubscribe = () => {
  alert(`感谢您的订阅！新春福礼已发送至: ${email.value}`);
  email.value = '';
};
</script>

<style scoped>
/* ═══════════════════════════════════════════════════════════════════════════
   CHINESE NEW YEAR LUXURY DESIGN SYSTEM (UI-UX-PRO-MAX / TASTE-UI)
   Theme: Cinnabar Red (#B81D24), Imperial Gold (#D4AF37), Crimson (#8B0000)
═══════════════════════════════════════════════════════════════════════════ */

:root {
  --red-primary: #B81D24;
  --red-dark: #8B0000;
  --red-crimson: #4A0404;
  --gold-primary: #D4AF37;
  --gold-light: #F5E096;
  --gold-dark: #AA771C;
  --bg-silk: #FAF7F2;
  --bg-rice: #FFFDF9;
  --text-dark: #1C1917;
  --text-muted: #78716C;
  --gold-gradient: linear-gradient(135deg, #F5E096 0%, #D4AF37 50%, #AA771C 100%);
  --red-gradient: linear-gradient(135deg, #D32F2F 0%, #B81D24 60%, #8B0000 100%);
}

.site-couplet {
  font-family: 'Noto Serif SC', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, serif;
  background-color: var(--bg-silk);
  color: var(--text-dark);
  min-height: 100vh;
  overflow-x: hidden;
}

/* Calligraphy font helper */
.calligraphy-font {
  font-family: 'Ma Shan Zheng', 'Noto Serif SC', cursive, serif;
}

.skip-link {
  position: absolute;
  top: -100px;
  left: 20px;
  background: var(--gold-primary);
  color: #000;
  padding: 8px 16px;
  z-index: 9999;
}
.skip-link:focus { top: 20px; }

.section-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Scroll reveal helper */
[data-reveal] {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
[data-reveal].revealed {
  opacity: 1;
  transform: translateY(0);
}

/* ═══════════════════════════════════════════
   HEADER (FLOATING GLASS + GOLD ACCENT)
═══════════════════════════════════════════ */
.header {
  position: fixed;
  top: 16px;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  padding: 0 16px;
  transition: all 0.3s ease;
}

.header-pill {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  height: 64px;
  padding: 0 24px;
  background: rgba(139, 0, 0, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 999px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(245, 224, 150, 0.3);
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.logo-badge {
  width: 40px;
  height: 40px;
  background: var(--gold-gradient);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.4);
}
.logo-badge.sm { width: 32px; height: 32px; }

.logo-character {
  font-family: 'Ma Shan Zheng', cursive;
  color: #8B0000;
  font-size: 24px;
  font-weight: bold;
}

.logo-text-group {
  display: flex;
  flex-direction: column;
}

.logo-title {
  color: #FFFDF9;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 2px;
}

.logo-subtitle {
  color: var(--gold-light);
  font-size: 10px;
  letter-spacing: 1px;
  opacity: 0.9;
}

.nav {
  display: flex;
  align-items: center;
  gap: 28px;
}

.nav-link {
  color: #FAF7F2;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 1px;
  position: relative;
  padding: 4px 0;
  transition: color 0.3s ease;
}
.nav-link:hover {
  color: var(--gold-light);
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--gold-gradient);
  transition: width 0.3s ease;
}
.nav-link:hover::after { width: 100%; }

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.style-toggle-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(212, 175, 55, 0.15);
  border: 1px solid rgba(212, 175, 55, 0.4);
  color: var(--gold-light);
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.style-toggle-btn:hover {
  background: rgba(212, 175, 55, 0.3);
}

.action-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gold-light);
  text-decoration: none;
  background: rgba(255, 255, 255, 0.08);
  transition: background 0.3s ease;
}
.action-btn:hover {
  background: rgba(212, 175, 55, 0.25);
}

.burger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 16px;
  background: transparent;
  border: none;
  cursor: pointer;
}
.burger-line {
  width: 100%;
  height: 2px;
  background: var(--gold-light);
  border-radius: 2px;
  transition: transform 0.3s ease;
}

/* Mobile Drawer */
.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  z-index: 1001;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}
.drawer-overlay.open { opacity: 1; pointer-events: auto; }

.drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 280px;
  background: #4A0404;
  z-index: 1002;
  transform: translateX(100%);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  padding: 24px;
  color: #FFFDF9;
}
.drawer.open { transform: translateX(0); }

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(212, 175, 55, 0.2);
}
.drawer-logo { font-size: 16px; font-weight: bold; color: var(--gold-light); }
.drawer-close { background: none; border: none; color: var(--gold-light); cursor: pointer; }
.drawer-nav { display: flex; flex-direction: column; gap: 16px; margin-top: 24px; }
.drawer-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #FFFDF9;
  text-decoration: none;
  font-size: 16px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

/* ═══════════════════════════════════════════
   SECTION 1: HERO SECTION
═══════════════════════════════════════════ */
.hero {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 24px 80px;
  overflow: hidden;
  background: #2C0A0A;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 1;
}
.hero-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.4) saturate(1.2);
}
.hero-gradient-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(184, 29, 36, 0.4) 0%, rgba(44, 10, 10, 0.95) 85%);
}

.paper-texture-overlay {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(212, 175, 55, 0.08) 1px, transparent 0);
  background-size: 24px 24px;
  pointer-events: none;
}

/* Floating Lanterns */
.lanterns { position: absolute; inset: 0; pointer-events: none; z-index: 2; }
.lantern {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: floatLantern 6s ease-in-out infinite alternate;
}
.lantern--left-1 { top: 12%; left: 8%; animation-delay: 0s; }
.lantern--left-2 { top: 35%; left: 14%; animation-delay: 2s; }
.lantern--right-1 { top: 15%; right: 8%; animation-delay: 1s; }

.lantern-body {
  width: 60px;
  height: 76px;
  background: var(--red-gradient);
  border: 2px solid var(--gold-primary);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 25px rgba(239, 68, 68, 0.6), inset 0 0 15px rgba(245, 224, 150, 0.5);
}
.lantern-body.sm { width: 44px; height: 56px; border-radius: 14px; }
.lantern-text { color: var(--gold-light); font-weight: bold; font-size: 24px; font-family: 'Ma Shan Zheng', cursive; }
.lantern-body.sm .lantern-text { font-size: 18px; }

.lantern-tassel {
  width: 4px;
  height: 30px;
  background: var(--gold-gradient);
  box-shadow: 0 4px 10px rgba(212, 175, 55, 0.8);
}

@keyframes floatLantern {
  from { transform: translateY(0) rotate(-2deg); }
  to { transform: translateY(-16px) rotate(2deg); }
}

.hero-container {
  position: relative;
  z-index: 3;
  max-width: 900px;
  text-align: center;
  color: #FFFDF9;
}

.hero-badge-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 18px;
  background: rgba(212, 175, 55, 0.15);
  border: 1px solid rgba(212, 175, 55, 0.5);
  border-radius: 999px;
  color: var(--gold-light);
  font-size: 14px;
  margin-bottom: 24px;
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
}

.hero-main-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: 4px;
  margin-bottom: 24px;
  font-family: 'Noto Serif SC', serif;
}

.title-line--gold {
  background: var(--gold-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.title-line--red {
  color: #FFFDF9;
  text-shadow: 0 2px 10px rgba(184, 29, 36, 0.8);
}

.hero-description {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: #FAF7F2;
  max-width: 720px;
  margin: 0 auto 40px;
  line-height: 1.7;
  opacity: 0.95;
}

.hero-cta-group {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.btn-primary-gold {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 36px;
  background: var(--gold-gradient);
  color: #4A0404;
  font-size: 17px;
  font-weight: 700;
  border-radius: 999px;
  text-decoration: none;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(212, 175, 55, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.btn-primary-gold:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(212, 175, 55, 0.6);
}

.btn-secondary-silk {
  display: inline-flex;
  align-items: center;
  padding: 16px 32px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(245, 224, 150, 0.4);
  color: var(--gold-light);
  font-size: 16px;
  font-weight: 600;
  border-radius: 999px;
  text-decoration: none;
  transition: all 0.3s ease;
}
.btn-secondary-silk:hover {
  background: rgba(212, 175, 55, 0.2);
  color: #FFF;
}

/* ═══════════════════════════════════════════
   SECTION 2: LIVE COUPLET SCROLL SHOWCASE
═══════════════════════════════════════════ */
.couplet-showcase-section {
  padding: 100px 0;
  background: linear-gradient(180deg, #2C0A0A 0%, #FAF7F2 30%);
}

.text-center { text-align: center; }

.gold-eyebrow {
  display: block;
  font-size: 13px;
  letter-spacing: 3px;
  color: var(--gold-dark);
  font-weight: 700;
  margin-bottom: 8px;
}

.section-heading-gold {
  font-size: clamp(2rem, 4vw, 3rem);
  color: #4A0404;
  font-weight: 800;
  margin-bottom: 12px;
}

.section-subtext {
  font-size: 16px;
  color: var(--text-muted);
  max-width: 600px;
  margin: 0 auto 32px;
}

.preset-pills {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.preset-pill {
  padding: 10px 22px;
  background: #FFF;
  border: 1px solid rgba(184, 29, 36, 0.2);
  border-radius: 999px;
  color: var(--text-dark);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.04);
}
.preset-pill.active, .preset-pill:hover {
  background: var(--red-primary);
  color: #FFFDF9;
  border-color: var(--red-primary);
  box-shadow: 0 6px 20px rgba(184, 29, 36, 0.3);
}

/* Couplet Scroll Stage */
.couplet-scroll-stage {
  max-width: 1000px;
  margin: 0 auto;
  background: #FFFDF9;
  border: 2px solid var(--gold-primary);
  border-radius: 24px;
  padding: 48px 32px 36px;
  box-shadow: 0 20px 60px rgba(139, 0, 0, 0.12);
  position: relative;
}

.stage-frame-deco-top {
  position: absolute;
  top: -24px;
  left: 50%;
  transform: translateX(-50%);
  width: 48px;
  height: 48px;
  background: var(--gold-gradient);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 16px rgba(212, 175, 55, 0.4);
}
.deco-seal { font-family: 'Ma Shan Zheng', cursive; color: #4A0404; font-size: 24px; font-weight: bold; }

.scrolls-grid {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 32px;
  margin-bottom: 36px;
}

.couplet-scroll-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.scroll-wood-top, .scroll-wood-bottom {
  width: 100%;
  height: 14px;
  background: linear-gradient(90deg, #4A0404 0%, #8B0000 50%, #4A0404 100%);
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}

.scroll-paper-body {
  width: 110px;
  min-height: 380px;
  background: var(--red-gradient);
  border: 2px solid var(--gold-primary);
  padding: 24px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: inset 0 0 20px rgba(0,0,0,0.2), 0 10px 25px rgba(184, 29, 36, 0.25);
  position: relative;
}

.scroll-paper-body-center {
  width: 220px;
  height: 90px;
  background: var(--red-gradient);
  border: 2px solid var(--gold-primary);
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 20px rgba(0,0,0,0.2), 0 10px 25px rgba(184, 29, 36, 0.25);
  position: relative;
  margin-top: 40px;
}

.scroll-tag {
  font-size: 11px;
  color: var(--gold-light);
  border: 1px solid var(--gold-primary);
  padding: 2px 8px;
  border-radius: 4px;
  margin-bottom: 16px;
}

.vertical-text {
  writing-mode: vertical-rl;
  font-size: 32px;
  letter-spacing: 12px;
  font-weight: 700;
  line-height: 1.2;
}

.horizontal-text {
  font-size: 30px;
  letter-spacing: 10px;
  font-weight: 700;
}

/* Style Variants */
.couplet-scroll-stage.gold .vertical-text,
.couplet-scroll-stage.gold .horizontal-text {
  background: var(--gold-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));
}

.couplet-scroll-stage.ink .vertical-text,
.couplet-scroll-stage.ink .horizontal-text {
  color: #111;
  text-shadow: 0 0 2px rgba(255, 215, 0, 0.6);
}

.seal-stamp {
  position: absolute;
  bottom: 8px;
  right: 12px;
  width: 32px;
  height: 32px;
  border: 2px solid var(--gold-primary);
  color: var(--gold-primary);
  font-size: 10px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(-12deg);
}

.scroll-action-bar {
  display: flex;
  justify-content: center;
}

.btn-gold-outline {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border: 2px solid var(--gold-dark);
  color: #4A0404;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
}
.btn-gold-outline:hover {
  background: var(--gold-primary);
  color: #4A0404;
}

/* ═══════════════════════════════════════════
   SECTION 3: TRUST METRICS
═══════════════════════════════════════════ */
.trust-metrics-section {
  padding: 40px 0 80px;
}

.trust-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.trust-card {
  background: #FFF;
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 16px;
  padding: 28px 20px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.03);
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;
}
.trust-card:hover { transform: translateY(-4px); }

.trust-number-gold {
  display: block;
  font-size: clamp(2rem, 3vw, 2.75rem);
  font-weight: 900;
  background: var(--gold-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 6px;
}

.trust-label-text {
  font-size: 14px;
  color: var(--text-muted);
  font-weight: 600;
}

/* ═══════════════════════════════════════════
   SECTION 4: BENTO GRID CATEGORIES
═══════════════════════════════════════════ */
.bento-categories-section {
  padding: 80px 0;
  background: #FAF7F2;
}

.section-header-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 40px;
}

.section-title-dark {
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  color: #1C1917;
  font-weight: 800;
}

.link-with-arrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--red-primary);
  font-weight: 700;
  text-decoration: none;
  font-size: 15px;
}

.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 260px;
  gap: 20px;
}

.bento-card--0 { grid-column: span 2; grid-row: span 1; }
.bento-card--1 { grid-column: span 1; grid-row: span 2; }
.bento-card--2 { grid-column: span 1; grid-row: span 1; }
.bento-card--3 { grid-column: span 1; grid-row: span 1; }
.bento-card--4 { grid-column: span 2; grid-row: span 1; }

.bento-card {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.06);
}

.bento-card-link {
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: #FFF;
}

.bento-image-wrap {
  position: absolute;
  inset: 0;
}
.bento-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.bento-card:hover .bento-img {
  transform: scale(1.08);
}
.bento-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(44, 10, 10, 0.85) 100%);
}

.bento-content {
  position: absolute;
  inset: 0;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 2;
}

.bento-badge {
  align-self: flex-start;
  padding: 4px 12px;
  background: var(--gold-gradient);
  color: #4A0404;
  font-size: 12px;
  font-weight: 700;
  border-radius: 999px;
  margin-bottom: 8px;
}

.bento-title {
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 6px;
  color: #FFFDF9;
}

.bento-desc {
  font-size: 13px;
  color: rgba(255,255,255,0.85);
  margin-bottom: 12px;
}

.bento-action {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 700;
  color: var(--gold-light);
}

/* ═══════════════════════════════════════════
   SECTION 5: CURATED PRODUCTS
═══════════════════════════════════════════ */
.products-section {
  padding: 90px 0;
  background: #FFFDF9;
}

.section-header-center { margin-bottom: 32px; }

.filter-tabs {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 10px 20px;
  border: 1px solid #E7E5E4;
  background: #FAF7F2;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-dark);
  cursor: pointer;
  transition: all 0.3s ease;
}
.filter-btn.active, .filter-btn:hover {
  background: var(--red-primary);
  color: #FFFDF9;
  border-color: var(--red-primary);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.product-card {
  background: #FFF;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}
.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 36px rgba(184, 29, 36, 0.12);
  border-color: rgba(212, 175, 55, 0.4);
}

.card-media {
  position: relative;
  width: 100%;
  padding-top: 100%; /* 1:1 Aspect ratio */
  overflow: hidden;
  background: #F5F5F4;
}

.media-link { position: absolute; inset: 0; }
.img-primary, .img-secondary {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.4s ease;
}
.img-secondary { opacity: 0; }
.product-card:hover .img-secondary { opacity: 1; }
.product-card:hover .img-primary { opacity: 0; }

.card-badges {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.badge-red { background: var(--red-primary); color: #FFF; padding: 4px 8px; font-size: 11px; font-weight: bold; border-radius: 4px; }
.badge-gold { background: var(--gold-gradient); color: #4A0404; padding: 4px 8px; font-size: 11px; font-weight: bold; border-radius: 4px; }

.quick-actions {
  position: absolute;
  bottom: 12px;
  left: 12px;
  right: 12px;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
}
.product-card:hover .quick-actions { opacity: 1; transform: translateY(0); }

.quick-view-btn {
  width: 100%;
  padding: 10px;
  background: rgba(255,255,255,0.95);
  border: 1px solid var(--gold-primary);
  border-radius: 8px;
  color: #4A0404;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
}

.card-info {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.rating-stars { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--gold-dark); margin-bottom: 6px; }

.product-title {
  font-size: 16px;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 6px;
}
.product-title a { color: var(--text-dark); text-decoration: none; }
.product-title a:hover { color: var(--red-primary); }

.product-snippet { font-size: 12px; color: var(--text-muted); margin-bottom: 16px; flex-grow: 1; }

.price-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}
.price-current { font-size: 20px; font-weight: 800; color: var(--red-primary); }
.price-old { font-size: 13px; color: #A8A29E; text-decoration: line-through; margin-left: 6px; }

.buy-btn {
  padding: 8px 18px;
  background: var(--red-gradient);
  color: #FFFDF9;
  border-radius: 999px;
  text-decoration: none;
  font-size: 13px;
  font-weight: 700;
  transition: background 0.3s ease;
}
.buy-btn:hover { background: var(--red-dark); }

/* ═══════════════════════════════════════════
   SECTION 6: CRAFTSMANSHIP
═══════════════════════════════════════════ */
.craftsmanship-section {
  padding: 90px 0;
  background: #FAF7F2;
}

.craft-header { margin-bottom: 48px; }

.craft-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.craft-card {
  background: #FFF;
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 20px;
  padding: 32px 24px;
  position: relative;
  box-shadow: 0 10px 30px rgba(0,0,0,0.03);
}

.craft-tag {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 11px;
  font-weight: bold;
  color: var(--gold-dark);
  background: rgba(212, 175, 55, 0.15);
  padding: 2px 8px;
  border-radius: 4px;
}

.craft-icon-wrap {
  width: 56px;
  height: 56px;
  background: rgba(184, 29, 36, 0.08);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin-bottom: 20px;
}

.craft-title { font-size: 18px; font-weight: 800; margin-bottom: 10px; color: #1C1917; }
.craft-desc { font-size: 14px; color: var(--text-muted); line-height: 1.6; }

/* ═══════════════════════════════════════════
   SECTION 7: ENTERPRISE BANNER
═══════════════════════════════════════════ */
.enterprise-banner-section { padding: 40px 0 90px; }

.enterprise-card {
  background: linear-gradient(135deg, #4A0404 0%, #8B0000 100%);
  border: 2px solid var(--gold-primary);
  border-radius: 24px;
  padding: 60px 48px;
  color: #FFFDF9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(139, 0, 0, 0.25);
}

.enterprise-content { max-width: 600px; position: relative; z-index: 2; }
.gold-eyebrow-dark { color: var(--gold-light); font-size: 12px; letter-spacing: 2px; font-weight: bold; }
.enterprise-title { font-size: clamp(2rem, 3.5vw, 2.75rem); font-weight: 900; margin: 8px 0 16px; color: #FFFDF9; }
.enterprise-desc { font-size: 16px; color: rgba(255,255,255,0.9); line-height: 1.7; margin-bottom: 32px; }

.enterprise-actions { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; }
.btn-gold-solid {
  padding: 14px 32px;
  background: var(--gold-gradient);
  color: #4A0404;
  font-weight: 800;
  border-radius: 999px;
  text-decoration: none;
  font-size: 15px;
}
.enterprise-phone { display: flex; align-items: center; gap: 8px; color: var(--gold-light); text-decoration: none; font-weight: 700; }

.enterprise-graphic {
  position: relative;
  z-index: 2;
}
.graphic-seal {
  width: 140px;
  height: 140px;
  border: 4px double var(--gold-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Ma Shan Zheng', cursive;
  font-size: 54px;
  color: var(--gold-light);
  box-shadow: 0 0 40px rgba(212, 175, 55, 0.4);
}

/* ═══════════════════════════════════════════
   SECTION 8: NEWSLETTER & FOOTER
═══════════════════════════════════════════ */
.newsletter-section { padding-bottom: 90px; }
.newsletter-card {
  background: #FFFDF9;
  border: 2px dashed var(--gold-primary);
  border-radius: 24px;
  padding: 48px 32px;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}
.newsletter-badge { display: inline-block; padding: 4px 12px; background: rgba(184, 29, 36, 0.1); color: var(--red-primary); font-size: 12px; font-weight: bold; border-radius: 999px; margin-bottom: 12px; }
.newsletter-title { font-size: 26px; font-weight: 800; color: #1C1917; margin-bottom: 8px; }
.newsletter-desc { font-size: 15px; color: var(--text-muted); max-width: 540px; margin: 0 auto 24px; }
.newsletter-form { display: flex; gap: 12px; max-width: 500px; margin: 0 auto; }
.newsletter-input { flex-grow: 1; padding: 14px 20px; border: 1px solid #D6D3D1; border-radius: 999px; font-size: 14px; outline: none; }
.newsletter-submit { padding: 14px 28px; background: var(--red-primary); color: #FFF; border: none; border-radius: 999px; font-weight: 700; cursor: pointer; }

.site-footer {
  background: #1C1917;
  color: #E7E5E4;
  padding: 80px 0 40px;
}
.footer-top { display: flex; justify-content: space-between; gap: 60px; margin-bottom: 60px; }
.footer-brand { max-width: 360px; }
.footer-brand-title { font-size: 18px; font-weight: bold; color: var(--gold-light); margin-top: 12px; display: block; }
.footer-brand-desc { font-size: 13px; color: #A8A29E; margin-top: 12px; line-height: 1.6; }
.footer-nav-columns { display: flex; gap: 60px; }
.footer-col-title { font-size: 15px; font-weight: 700; color: #FFF; margin-bottom: 16px; }
.footer-links { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
.footer-links a { color: #A8A29E; text-decoration: none; font-size: 14px; }
.footer-links a:hover { color: var(--gold-light); }

.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #78716C;
}
.footer-badges { display: flex; gap: 16px; }

/* Modal Quickview */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 24px; }
.modal-card { background: #FFF; border-radius: 20px; max-width: 700px; width: 100%; position: relative; overflow: hidden; }
.modal-close { position: absolute; top: 16px; right: 16px; border: none; background: none; font-size: 20px; cursor: pointer; }
.modal-grid { display: grid; grid-template-columns: 1fr 1fr; }
.modal-image img { width: 100%; height: 100%; object-fit: cover; }
.modal-details { padding: 32px; display: flex; flex-direction: column; gap: 12px; }
.modal-title { font-size: 20px; font-weight: bold; }
.modal-price { font-size: 24px; color: var(--red-primary); font-weight: bold; }
.block-btn { width: 100%; text-align: center; justify-content: center; margin-top: auto; }

/* RESPONSIVE BREAKPOINTS */
@media (max-width: 1024px) {
  .products-grid { grid-template-columns: repeat(2, 1fr); }
  .craft-grid, .trust-grid { grid-template-columns: repeat(2, 1fr); }
  .bento-grid { grid-template-columns: repeat(2, 1fr); }
  .bento-card--0, .bento-card--4 { grid-column: span 2; }
}

@media (max-width: 768px) {
  .nav { display: none; }
  .burger { display: flex; }
  .scrolls-grid { flex-direction: column; align-items: center; }
  .scroll-paper-body { width: 90%; min-height: 240px; }
  .vertical-text { writing-mode: horizontal-tb; font-size: 22px; letter-spacing: 4px; }
  .bento-grid { grid-template-columns: 1fr; grid-auto-rows: 200px; }
  .bento-card--0, .bento-card--1, .bento-card--2, .bento-card--3, .bento-card--4 { grid-column: span 1; grid-row: span 1; }
  .products-grid { grid-template-columns: 1fr; }
  .craft-grid, .trust-grid { grid-template-columns: 1fr; }
  .footer-top { flex-direction: column; }
  .enterprise-card { flex-direction: column; text-align: center; }
}
</style>
