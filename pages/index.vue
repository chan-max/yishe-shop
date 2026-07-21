<script lang="ts" setup>
import type { StorefrontPublishedProduct } from "~/composables/use-published-products";

definePageMeta({ layout: "page" });

const site = useStorefrontSite();
const {
  fetchPublishedProducts,
  getPublishedProductImage,
  getPublishedProductPath,
} = usePublishedProducts();

usePageSEO({
  ...site.seo.home,
  structuredData: [useWebsiteStructuredData(), useOrganizationStructuredData()],
});

const { data: homeProductsData } = await useAsyncData("home-published-products", () =>
  fetchPublishedProducts({ pageSize: 40, random: true })
);

const products = computed<StorefrontPublishedProduct[]>(() => homeProductsData.value || []);

const getProductImage = (product: StorefrontPublishedProduct, width = 800) => {
  return getPublishedProductImage(product, width) || "";
};

// Dynamic categories based on site config
const showcaseTabs = computed(() => {
  return [
    { id: "all", label: "全品类", keyword: "" },
    ...(site.home.productFinderGroups || []).map(group => ({
      id: group.key,
      label: group.label,
      keyword: group.keyword
    }))
  ];
});

const activeShowcaseTab = ref("all");

// Filtered products for the interactive finder/tabs
const filteredShowcaseProducts = computed(() => {
  if (activeShowcaseTab.value === "all") {
    return products.value.slice(0, 8);
  }
  const tab = showcaseTabs.value.find(t => t.id === activeShowcaseTab.value);
  if (!tab || !tab.keyword) return products.value.slice(0, 8);

  const matched = products.value.filter(p =>
    (p.category || "").toLowerCase().includes(tab.keyword.toLowerCase()) ||
    (p.title || "").toLowerCase().includes(tab.keyword.toLowerCase())
  );
  
  // fallback if no products match this category keyword
  return matched.length > 0 ? matched.slice(0, 8) : products.value.slice(0, 8);
});

// Platform-focused tags (No 3rd-party logistics or generic claims)
const partnerLabels = [
  "全品类 POD 载体", "数码直喷工艺", "热升华与刺绣", "柔性按需印制",
  "创作者图案生态", "品牌周边衍生", "高清视觉渲染", "一件设计打样"
];

// Fallback high-resolution POD commodity product photos for instant zero-gap background collage
const fallbackBgPhotos = [
  "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=500&auto=format&fit=crop&q=80"
];

// Seamless Zero-Gap Full-Background Stitched Product Photos (24 items guaranteed)
const bgWallPhotoUrls = computed(() => {
  if (products.value.length > 0) {
    const list = products.value.map(p => getProductImage(p, 500)).filter(Boolean);
    if (list.length >= 4) {
      const pool = [...list, ...list, ...list, ...list, ...list, ...list];
      return pool.slice(0, 24);
    }
  }
  return fallbackBgPhotos;
});

// Interactive Studio Selection
const selectedStudioIndex = ref(0);
const studioProduct = computed(() => products.value[selectedStudioIndex.value] || products.value[0] || null);
const studioThumbnails = computed(() => products.value.slice(0, 6));

const tileProducts = computed(() => products.value.slice(1, 4));
const runAppProduct = computed(() => products.value[4] || null);
const originalsProduct = computed(() => products.value[5] || null);

// Yishe Platform Core Capabilities (Strictly POD & Design Focus)
const trustGuarantees = [
  { icon: "package", title: "全品类 POD 载体", desc: "服饰、数码配件、居家礼赠全覆盖" },
  { icon: "palette", title: "高清视觉渲染", desc: "300 DPI 实时 3D 样机效果排版" },
  { icon: "sparkle", title: "创作者图案生态", desc: "聚合优质印花灵感与设计作品" },
  { icon: "lightning", title: "柔性按需印制", desc: "让每一份创意精准转化为真实单品" }
];
</script>

<template>
  <main class="y-home">
    <!-- ═══════════════════════════════════════════════
         SECTION 1 · HERO (CRYSTAL-CLEAR 100% OPACITY STITCHED PRODUCT PHOTO WALL BANNER)
         ═══════════════════════════════════════════════ -->
    <section class="hero">
      <!-- Full-background 100% Crystal-Clear Product Photo Wall (100% 原色高档拼接照片幕布) -->
      <div class="hero__bg-wall" aria-hidden="true">
        <div class="hero__seamless-grid">
          <img
            v-for="(src, i) in bgWallPhotoUrls"
            :key="'bg-photo-' + i"
            :src="src"
            alt="POD商品拼接照片"
            class="hero__seamless-img"
            loading="eager"
          />
        </div>
      </div>

      <div class="hero__inner wrap hero__inner--center">
        <a href="/about" class="hero__eyebrow">
          <span class="hero__sparkle-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2l2.4 7.2L21.6 11.6l-7.2 2.4L12 21.2l-2.4-7.2-7.2-2.4 7.2-2.4z"/>
            </svg>
          </span>
          <span>1s design · 衣设 POD 开放平台</span>
          <span class="hero__eyebrow-arrow">查看指南 →</span>
        </a>

        <h1 class="hero__h1">
          把设计与视觉灵感<br />
          <span class="hero__gradient-text">打造成真实 POD 商品</span>
        </h1>

        <p class="hero__sub hero__sub--center">
          提供全套服饰印花、数码周边、居家礼盒与日常用品定制方案。打通按需印刷与柔性供应链，让每一份好创意都能以高品质的实物形态交付。
        </p>

        <div class="hero__ctas hero__ctas--center">
          <NuxtLink to="/products" class="btn-primary">
            <span>发现可定制商品</span>
            <svg class="btn-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </NuxtLink>
          <NuxtLink to="/design" class="btn-outline">
            <svg class="pink-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21"/>
            </svg>
            <span>提交定制设计</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Partner Ticker Marquee (Infinite Seamless Loop with Glass pill) -->
      <div class="hero__ticker">
        <div class="ticker__glass">
          <p class="ticker__label">专业级按需印刷 (Print on Demand) 交付体系</p>
          <div class="ticker__viewport">
            <div class="ticker__track">
              <span v-for="(label, i) in partnerLabels" :key="'t1-' + i" class="ticker__item">
                <svg width="6" height="6" viewBox="0 0 6 6" fill="none" class="ticker-dot">
                  <circle cx="3" cy="3" r="3" fill="#ff2d75"/>
                </svg>
                {{ label }}
              </span>
              <!-- Duplicated set for seamless loop -->
              <span v-for="(label, i) in partnerLabels" :key="'t2-' + i" class="ticker__item">
                <svg width="6" height="6" viewBox="0 0 6 6" fill="none" class="ticker-dot">
                  <circle cx="3" cy="3" r="3" fill="#ff2d75"/>
                </svg>
                {{ label }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════
         SECTION 2 · CATEGORY FILTERING & FINDER (Light Mode)
         ═══════════════════════════════════════════════ -->
    <section class="sec sec--light-gray sec--center">
      <div class="wrap">
        <div class="sec__head">
          <h2 class="sec__h2">按品类探索我们的商品宇宙</h2>
          <p class="sec__lead">选择你需要的商品载体，开始印花设计或个性化定制。</p>

          <!-- Segmented Tab Bar -->
          <div class="tabbar" v-if="showcaseTabs.length > 1">
            <button
              v-for="t in showcaseTabs"
              :key="t.id"
              class="tabbar__btn"
              :class="{ active: activeShowcaseTab === t.id }"
              @click="activeShowcaseTab = t.id"
            >
              {{ t.label }}
            </button>
          </div>
        </div>

        <!-- Dynamic Product Preview Grid -->
        <div class="products-grid">
          <NuxtLink
            v-for="p in filteredShowcaseProducts"
            :key="p.id"
            :to="getPublishedProductPath(p)"
            class="product-card"
          >
            <div class="product-card__img">
              <img :src="getProductImage(p, 600)" :alt="p.title" loading="lazy" />
              <span class="product-card__badge">POD 按需定制</span>
              <span v-if="p.category" class="product-card__tag">{{ p.category }}</span>
            </div>
            <div class="product-card__info">
              <h4>{{ p.title }}</h4>
              <div class="product-card__bottom">
                <span class="product-card__price">¥{{ p.price || '99' }}<small>起</small></span>
                <span class="product-card__cta">
                  <span>立即定制</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════
         SECTION 3 · STUDIO CARD (Clean Light Chrome Viewport)
         ═══════════════════════════════════════════════ -->
    <section class="sec sec--white sec--center">
      <div class="wrap">
        <div class="sec__head">
          <h2 class="sec__h2">所见即所得，一站式定制流程</h2>
          <p class="sec__lead">配合在线预览与排版，从设计稿到样衣打样，路径清晰。</p>
        </div>

        <div class="studio-card">
          <div class="studio-card__bar">
            <div class="studio-dots">
              <span class="dot dot--red"></span>
              <span class="dot dot--yellow"></span>
              <span class="dot dot--green"></span>
            </div>
            <span class="studio-card__title">衣设 POD 实时打样与预览引擎</span>
            <div class="studio-card__status">
              <span class="status-indicator"></span> 渲染引擎就绪
            </div>
          </div>

          <div class="studio-card__viewport">
            <img
              v-if="studioProduct"
              :src="getProductImage(studioProduct, 1400)"
              :alt="studioProduct.title"
              class="studio-main-img"
            />
            <div v-else class="studio-card__placeholder">加载中…</div>

            <!-- Thumbnail Switcher Bar -->
            <div class="studio-thumbs" v-if="studioThumbnails.length > 0">
              <button
                v-for="(tp, idx) in studioThumbnails"
                :key="tp.id + '-thumb'"
                class="studio-thumb"
                :class="{ active: selectedStudioIndex === idx }"
                @click="selectedStudioIndex = idx"
              >
                <img :src="getProductImage(tp, 200)" :alt="tp.title" />
              </button>
            </div>
            
            <!-- Real-time information panel -->
            <div class="studio-panel" v-if="studioProduct">
              <small>当前展示商品</small>
              <strong>{{ studioProduct.title }}</strong>

              <div class="studio-specs">
                <div class="spec-row">
                  <span>渲染精度</span>
                  <em>300 DPI 全彩</em>
                </div>
                <div class="spec-row">
                  <span>定制方式</span>
                  <em>按需印刷</em>
                </div>
                <div class="spec-row">
                  <span>工艺支持</span>
                  <em>直喷 / 刺绣</em>
                </div>
              </div>

              <div class="studio-prompt">
                <em>POD 品类</em>
                <p>{{ studioProduct.category || '服装印花定制' }}</p>
              </div>

              <NuxtLink :to="getPublishedProductPath(studioProduct)" class="btn-generate">
                <span>发起同款定制</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </NuxtLink>
            </div>
          </div>

          <div class="studio-card__foot">
            <div>
              <h3>支持小批量定制与大规模柔性生产</h3>
              <p>采用符合高标准环保与耐洗水洗的印花工艺，确保出货质量一致性。</p>
            </div>
            <NuxtLink to="/products" class="link-arrow">
              <span>浏览全部定制底衫</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════
         SECTION 4 · TRUST GUARANTEE BANNER (Clean Light Cards)
         ═══════════════════════════════════════════════ -->
    <section class="sec sec--guarantee">
      <div class="wrap">
        <div class="guarantee-grid">
          <div v-for="g in trustGuarantees" :key="g.title" class="guarantee-card">
            <span class="guarantee-icon">
              <!-- Package SVG -->
              <svg v-if="g.icon === 'package'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
              <!-- Palette SVG -->
              <svg v-else-if="g.icon === 'palette'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9333ea" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="13.5" cy="6.5" r=".5"/>
                <circle cx="17.5" cy="10.5" r=".5"/>
                <circle cx="8.5" cy="7.5" r=".5"/>
                <circle cx="6.5" cy="12.5" r=".5"/>
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.7-.75 1.7-1.7 0-.42-.16-.8-.44-1.1-.28-.3-.43-.7-.43-1.14 0-.94.76-1.71 1.7-1.71h1.97c3.33 0 6.03-2.7 6.03-6.03 0-5.17-4.33-8.32-10.53-8.32z"/>
              </svg>
              <!-- Sparkle SVG -->
              <svg v-else-if="g.icon === 'sparkle'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff2d75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2l2.4 7.2L21.6 11.6l-7.2 2.4L12 21.2l-2.4-7.2-7.2-2.4 7.2-2.4z"/>
              </svg>
              <!-- Lightning SVG -->
              <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </span>
            <div>
              <h4>{{ g.title }}</h4>
              <p>{{ g.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════
         SECTION 5 · BENTO GRID (Category modules & workflows)
         ═══════════════════════════════════════════════ -->
    <section class="sec sec--light-gray">
      <div class="wrap">
        <div class="sec__head sec__head--split">
          <div>
            <h2 class="sec__h2">按需生产，灵活便捷</h2>
            <p class="sec__lead">无论是一件自用礼品，还是整套品牌周边，这里都有最适用的业务方案。</p>
          </div>
          <NuxtLink to="/products" class="btn-dark">
            <span>进入底衫库</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </NuxtLink>
        </div>

        <div class="bento">
          <!-- Card A: Category Showcase -->
          <div class="bento__card bento__card--white">
            <div class="bento__copy">
              <h3>丰富的定制品类</h3>
              <p>覆盖日常穿着服饰、数码产品外壳、水杯礼品、帆布袋等，底衫种类齐备。</p>
            </div>
            <div class="tool-tiles">
              <NuxtLink
                v-for="p in tileProducts"
                :key="p.id"
                :to="getPublishedProductPath(p)"
                class="tool-tile"
              >
                <img :src="getProductImage(p, 400)" :alt="p.title" />
                <span>{{ p.title }}</span>
              </NuxtLink>
              <div class="tool-tile tool-tile--accent">
                <div class="wave-bars">
                  <span></span><span></span><span></span><span></span><span></span>
                </div>
                <span>全线工艺打样支持</span>
              </div>
            </div>
          </div>

          <!-- Card D: Direct Order -->
          <div class="bento__card bento__card--blue">
            <div class="bento__copy">
              <h3>快捷提交定制需求</h3>
              <p>如果您已经有了具体想法，可以直接将定制底衫和印花设计需求提交给衣设团队。</p>
            </div>
            <div class="run-app">
              <img
                v-if="runAppProduct"
                :src="getProductImage(runAppProduct, 600)"
                :alt="runAppProduct.title"
              />
              <div v-else class="run-app__placeholder"></div>
              <NuxtLink to="/design" class="run-app__btn">
                <span>发起定制需求</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════
         SECTION 6 · ALL REAL PRODUCTS GRID
         ═══════════════════════════════════════════════ -->
    <section class="sec sec--white">
      <div class="wrap">
        <div class="sec__head sec__head--split">
          <div>
            <h2 class="sec__h2">最新上架定制底单与印花商品</h2>
            <p class="sec__lead">衣设 POD 官方最新上架的商品名册，直接对接印花厂打样出库。</p>
          </div>
          <NuxtLink to="/products" class="btn-dark">
            <span>查看全部商品</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </NuxtLink>
        </div>

        <div class="products-grid">
          <NuxtLink
            v-for="p in products.slice(8, 20)"
            :key="p.id"
            :to="getPublishedProductPath(p)"
            class="product-card"
          >
            <div class="product-card__img">
              <img :src="getProductImage(p, 600)" :alt="p.title" loading="lazy" />
              <span v-if="p.category" class="product-card__tag">{{ p.category }}</span>
            </div>
            <div class="product-card__info">
              <h4>{{ p.title }}</h4>
              <div class="product-card__bottom">
                <span class="product-card__price">¥{{ p.price || '99' }}<small>起</small></span>
                <span class="product-card__cta">
                  <span>立即定制</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════
         SECTION 7 · STEPS & INSTRUCTIONS
         ═══════════════════════════════════════════════ -->
    <section class="sec sec--light-gray sec--center">
      <div class="wrap">
        <div class="sec__head">
          <h2 class="sec__h2">简单清晰的定制三步法</h2>
          <p class="sec__lead">衣设将定制流程缩减至最低，确保沟通准确，交期及时。</p>
        </div>

        <div class="crafts-row">
          <div
            v-for="(step, index) in site.home.journeySteps || []"
            :key="step.title"
            class="craft-card"
          >
            <span class="craft-icon">0{{ index + 1 }}</span>
            <div>
              <strong>{{ step.title }}</strong>
              <span>{{ step.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════
         SECTION 8 · BENTO PHOTO SCENARIOS (Real Product Applications)
         ═══════════════════════════════════════════════ -->
    <section class="sec sec--white">
      <div class="wrap">
        <div class="sec__head sec__head--split">
          <div>
            <h2 class="sec__h2">丰富的实物应用范例</h2>
            <p class="sec__lead">让您的创意和品牌，在适合的材质载体上散发独特质感。</p>
          </div>
          <NuxtLink to="/products" class="btn-dark">
            <span>开始浏览</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </NuxtLink>
        </div>

        <div class="scenarios">
          <div class="scenario">
            <div class="scenario__img">
              <img
                v-if="products[21]"
                :src="getProductImage(products[21], 800)"
                :alt="products[21].title"
              />
              <div v-else class="scenario__placeholder"></div>
            </div>
            <div class="scenario__info">
              <h3>潮牌与设计师周边</h3>
              <p>定制 T 恤、卫衣、潮流挎包，一键起订，无库存滞销压力。</p>
            </div>
          </div>

          <div class="scenario">
            <div class="scenario__img">
              <img
                v-if="products[22]"
                :src="getProductImage(products[22], 800)"
                :alt="products[22].title"
              />
              <div v-else class="scenario__placeholder"></div>
            </div>
            <div class="scenario__info">
              <h3>企业行政与日常礼赠</h3>
              <p>定制员工服装、伴手礼杯具、开业礼品，提升品牌统一感。</p>
            </div>
          </div>

          <div class="scenario">
            <div class="scenario__img">
              <img
                v-if="products[23]"
                :src="getProductImage(products[23], 800)"
                :alt="products[23].title"
              />
              <div v-else class="scenario__placeholder"></div>
            </div>
            <div class="scenario__info">
              <h3>社群聚会与个性生活</h3>
              <p>定制活动纪念衫、聚会杯具、节日抱枕，记录生活的趣味时刻。</p>
            </div>
          </div>

          <!-- Wide card featuring a beautiful products collage -->
          <div class="scenario scenario--wide">
            <div class="scenario__img">
              <img
                v-if="products[24]"
                :src="getProductImage(products[24], 1400)"
                :alt="products[24].title"
              />
              <div v-else class="scenario__placeholder"></div>
            </div>
            <div class="scenario__info">
              <h3>全线承接定制底衫生产与交付</h3>
              <p>无论设计还是大货印花生产，我们提供专业的质检与极速交付服务。</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════
         SECTION 9 · CREATOR CASE STUDY
         ═══════════════════════════════════════════════ -->
    <section class="sec sec--light-gray">
      <div class="wrap">
        <div class="sec__head sec__head--split">
          <div>
            <h2 class="sec__h2">精选定制交付示范</h2>
            <p class="sec__lead">看看其他创作者或品牌如何利用衣设达成高还原度的商品落地。</p>
          </div>
        </div>

        <NuxtLink
          v-if="originalsProduct"
          :to="getPublishedProductPath(originalsProduct)"
          class="originals"
        >
          <img
            :src="getProductImage(originalsProduct, 1400)"
            :alt="originalsProduct.title"
            class="originals__bg"
          />
          <div class="originals__copy">
            <small>YISHE CREATOR SELECT</small>
            <h3>{{ originalsProduct.title }}</h3>
            <p>已通过数码直喷与数码刺绣工艺打样并正式发布。高还原度质感与持久的印花寿命。</p>
            <span class="btn-ghost-white">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" class="pink-icon">
                <polygon points="5,3 19,12 5,21"/>
              </svg>
              <span>立即发起同款定制</span>
            </span>
          </div>
        </NuxtLink>
      </div>
    </section>

  </main>
</template>

<style lang="scss" scoped>
/* ─────────────────────────────────────────────────
   BASE & PREMIUM LIGHT MODE PALETTE
───────────────────────────────────────────────── */
.y-home {
  background: #ffffff;
  color: #0f172a;
  font-family: var(--ys-font-sans);
  overflow-x: hidden;
}

.wrap {
  width: min(1200px, calc(100% - 3rem));
  margin: 0 auto;
}

.sec {
  padding: clamp(4.5rem, 7vw, 7rem) 0;

  &--white { background: #ffffff; }
  &--light-gray { background: #f8f9fa; }
  &--center { text-align: center; }
  &--guarantee {
    background: #ffffff;
    border-y: 1px solid #f1f5f9;
    padding: 3rem 0;
  }
}

.sec__head {
  margin-bottom: 2.75rem;

  &--split {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1.5rem;
  }
}

.sec__h2 {
  font-size: clamp(1.85rem, 3.8vw, 2.85rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  margin: 0 0 0.5rem;
  color: #0f172a;
}

.sec__lead {
  font-size: clamp(0.92rem, 1.2vw, 1.08rem);
  color: #64748b;
  margin: 0;
  max-width: 600px;
}

/* ─────────────────────────────────────────────────
   BUTTONS
───────────────────────────────────────────────── */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  height: 3rem;
  padding: 0 1.75rem;
  border-radius: 999px;
  background: #0f172a;
  color: #ffffff;
  font-size: 0.92rem;
  font-weight: 800;
  text-decoration: none;
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.25);
  transition: all 0.22s ease;

  &:hover {
    background: #1e293b;
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(15, 23, 42, 0.35);
  }

  .btn-icon {
    transition: transform 0.2s ease;
  }

  &:hover .btn-icon {
    transform: translateX(4px);
  }
}

.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  height: 3rem;
  padding: 0 1.75rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid #cbd5e1;
  color: #0f172a;
  font-size: 0.92rem;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  backdrop-filter: blur(10px);
  transition: all 0.22s ease;

  &:hover {
    background: #ffffff;
    border-color: #94a3b8;
    transform: translateY(-2px);
  }

  .pink-icon { color: #ff2d75; }
}

.btn-dark {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  height: 2.6rem;
  padding: 0 1.35rem;
  border-radius: 999px;
  background: #0f172a;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: #334155;
  }
}

.btn-ghost-white {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  height: 2.6rem;
  padding: 0 1.45rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: #fff;
  font-size: 0.85rem;
  font-weight: 700;
  backdrop-filter: blur(14px);

  .pink-icon { color: #ff2d75; }
}

.link-arrow {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: #0f172a;
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none;
  transition: color 0.18s ease;

  &:hover { color: #ff2d75; }
}

/* ─────────────────────────────────────────────────
   HERO (SUBTLE PHOTO WALL BACKGROUND + NATURAL FLOATING TEXT)
───────────────────────────────────────────────── */
.hero {
  position: relative;
  background: #f8fafc;
  color: #0f172a;
  padding: clamp(4rem, 7vw, 6.5rem) 0 clamp(3.5rem, 5vw, 5rem);
  min-height: 82vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  isolation: isolate;

  /* 带质感的径向蒙层：中心偏亮，边缘略暗，增加景深与层次感 */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
    background: radial-gradient(
      ellipse 68% 75% at 50% 50%,
      rgba(248, 250, 252, 0.72) 0%,
      rgba(226, 232, 240, 0.40) 42%,
      rgba(100, 116, 139, 0.18) 100%
    );
  }
}

/* 商品照片无缝拼接墙幕（自然低调质感背景）*/
.hero__bg-wall {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
}

.hero__seamless-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 2px;
  background: #e2e8f0;
  width: 100%;
  height: 100%;
}

.hero__seamless-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 0;
  margin: 0;
  padding: 0;
  filter: brightness(1.04) saturate(0.9);
  opacity: 0.65; /* 稍明显，保留自然质感 */
  transition: transform 0.4s ease;
}

.hero__inner--center {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 10;
}

.hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.38rem 1.1rem;
  border-radius: 999px;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  color: #334155;
  font-size: 0.78rem;
  font-weight: 700;
  text-decoration: none;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;

  &:hover {
    background: #ffffff;
    border-color: #94a3b8;
  }
}

.hero__sparkle-icon {
  color: #ff2d75;
  display: flex;
  align-items: center;
}

.hero__eyebrow-arrow {
  color: #94a3b8;
  font-size: 0.72rem;
}

.hero__h1 {
  font-size: clamp(2.4rem, 5vw, 4.2rem);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.035em;
  color: #0f172a;
  margin: 0 0 1.25rem;
  text-shadow: 0 1px 20px rgba(248, 250, 252, 0.9), 0 0 40px rgba(248, 250, 252, 0.7);
}

.hero__gradient-text {
  background: linear-gradient(135deg, #0f172a 30%, #ff2d75 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero__sub--center {
  font-size: clamp(0.95rem, 1.2vw, 1.08rem);
  line-height: 1.7;
  color: #334155;
  font-weight: 500;
  max-width: 660px;
  margin: 0 auto 2rem;
}

.hero__ctas--center {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Ticker Marquee Scroll */
.hero__ticker {
  margin-top: clamp(2.5rem, 4vw, 3.5rem);
  text-align: center;
  position: relative;
  z-index: 10;
  padding: 0 1.5rem;
}

.ticker__glass {
  display: inline-block;
  width: min(1000px, 100%);
  padding: 0.9rem 1.5rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
}

.ticker__label {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #64748b;
  margin-bottom: 0.75rem;
}

.ticker__viewport {
  width: 100%;
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
}

.ticker__track {
  display: flex;
  align-items: center;
  gap: 2.8rem;
  width: max-content;
  animation: ticker-scroll 32s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
}

.ticker__item {
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: #334155;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  transition: color 0.2s ease;

  &:hover { color: #0f172a; }
}

.ticker-dot {
  opacity: 0.8;
}

@keyframes ticker-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* ─────────────────────────────────────────────────
   TABBAR & PRODUCTS GRID (Clean Light Theme)
───────────────────────────────────────────────── */
.tabbar {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem;
  border-radius: 999px;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  margin-top: 1.25rem;
  max-width: 100%;
  overflow-x: auto;
}

.tabbar__btn {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  background: transparent;
  color: #64748b;
  font-size: 0.82rem;
  font-weight: 700;
  border: 0;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &.active {
    background: #0f172a;
    color: #ffffff;
    box-shadow: 0 2px 10px rgba(15, 23, 42, 0.15);
  }
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.35rem;
  margin-top: 2.25rem;
}

.product-card {
  display: flex;
  flex-direction: column;
  border-radius: 18px;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
    border-color: rgba(255, 45, 117, 0.4);
  }
}

.product-card__img {
  position: relative;
  aspect-ratio: 1;
  background: #f8fafc;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.35s ease;
  }

  .product-card:hover img {
    transform: scale(1.06);
  }
}

.product-card__badge {
  position: absolute;
  top: 0.6rem;
  left: 0.6rem;
  font-size: 0.6rem;
  font-weight: 800;
  color: #0f172a;
  background: rgba(255, 255, 255, 0.9);
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  backdrop-filter: blur(6px);
  border: 1px solid #e2e8f0;
}

.product-card__tag {
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  font-size: 0.6rem;
  font-weight: 700;
  color: #ffffff;
  background: #ff2d75;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
}

.product-card__info {
  padding: 1.15rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  text-align: left;

  h4 {
    font-size: 0.95rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.product-card__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-card__price {
  font-size: 1.05rem;
  font-weight: 800;
  color: #ff2d75;

  small {
    font-size: 0.65rem;
    font-weight: 600;
    color: #94a3b8;
    margin-left: 0.15rem;
  }
}

.product-card__cta {
  font-size: 0.78rem;
  font-weight: 700;
  color: #334155;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: color 0.18s ease;

  .product-card:hover & {
    color: #ff2d75;
  }
}

/* ─────────────────────────────────────────────────
   STUDIO CARD (Apple Light Chrome Style)
───────────────────────────────────────────────── */
.studio-card {
  border-radius: 24px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.06);
  text-align: left;
}

.studio-card__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 1.6rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.studio-dots {
  display: flex;
  gap: 0.45rem;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;

  &--red { background: #ff5f56; }
  &--yellow { background: #ffbd2e; }
  &--green { background: #27c93f; }
}

.studio-card__title {
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748b;
}

.studio-card__status {
  font-size: 0.68rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.status-indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #27c93f;
  box-shadow: 0 0 6px #27c93f;
}

.studio-card__viewport {
  position: relative;
  aspect-ratio: 2.15;
  background: #f1f5f9;
  overflow: hidden;
}

.studio-main-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.92;
  transition: opacity 0.3s ease;
}

.studio-thumbs {
  position: absolute;
  left: 2rem;
  bottom: 1.5rem;
  display: flex;
  gap: 0.65rem;
  z-index: 10;
  background: rgba(255, 255, 255, 0.9);
  padding: 0.45rem;
  border-radius: 14px;
  backdrop-filter: blur(16px);
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
}

.studio-thumb {
  width: 46px;
  height: 46px;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid transparent;
  background: #fff;
  padding: 0;
  cursor: pointer;
  transition: all 0.18s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &.active {
    border-color: #ff2d75;
    transform: scale(1.08);
  }
}

.studio-panel {
  position: absolute;
  right: 2.5rem;
  top: 50%;
  transform: translateY(-50%);
  width: min(320px, 42%);
  padding: 1.5rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid #e2e8f0;
  backdrop-filter: blur(24px);
  color: #0f172a;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  z-index: 10;

  small {
    display: block;
    font-size: 0.62rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    color: #94a3b8;
    text-transform: uppercase;
    margin-bottom: 0.25rem;
  }

  strong {
    display: block;
    font-size: 0.98rem;
    font-weight: 700;
    margin-bottom: 0.9rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.studio-specs {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  background: #f8fafc;
  padding: 0.7rem 0.9rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  margin-bottom: 0.9rem;
}

.spec-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.74rem;

  span { color: #64748b; }
  em { font-style: normal; color: #16a34a; font-weight: 700; }
}

.studio-prompt {
  background: #f8fafc;
  padding: 0.7rem 0.9rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  margin-bottom: 1.1rem;

  em {
    display: block;
    font-style: normal;
    font-size: 0.6rem;
    font-weight: 800;
    color: #ff2d75;
    letter-spacing: 0.08em;
    margin-bottom: 0.25rem;
  }

  p {
    font-size: 0.8rem;
    color: #334155;
    margin: 0;
  }
}

.btn-generate {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  width: 100%;
  height: 2.4rem;
  border-radius: 12px;
  border: 0;
  background: #0f172a;
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 800;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #ff2d75;
  }
}

.studio-card__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 1.85rem 2.5rem;
  background: #ffffff;

  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 0.35rem;
  }

  p {
    font-size: 0.84rem;
    color: #64748b;
    margin: 0;
  }
}

/* ─────────────────────────────────────────────────
   TRUST GUARANTEE BANNER (Clean Light Cards)
───────────────────────────────────────────────── */
.guarantee-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.guarantee-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.1rem 1.35rem;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.02);

  h4 {
    font-size: 0.9rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 0.15rem;
  }

  p {
    font-size: 0.74rem;
    color: #64748b;
    margin: 0;
  }
}

.guarantee-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  flex-shrink: 0;
}

/* ─────────────────────────────────────────────────
   CRAFTS & BENTO (Clean Light Theme)
───────────────────────────────────────────────── */
.crafts-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.craft-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.75rem;
  border-radius: 22px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
  text-align: left;

  strong {
    display: block;
    font-size: 1rem;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 0.3rem;
  }

  span {
    display: block;
    font-size: 0.8rem;
    color: #64748b;
    line-height: 1.55;
  }
}

.craft-icon {
  font-size: 1rem;
  font-weight: 800;
  color: #ff2d75;
  flex-shrink: 0;
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50%;
  background: #fff0f5;
  border: 1px solid rgba(255, 45, 117, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.bento {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 1.35rem;
  text-align: left;
}

.bento__card {
  padding: 2.25rem;
  border-radius: 22px;
  display: flex;
  flex-direction: column;
  gap: 1.35rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);

  &--white {
    background: #ffffff;
    border: 1px solid #e2e8f0;
  }

  &--blue {
    background: #0f172a;
    color: #fff;

    .bento__copy h3 { color: #fff; }
    .bento__copy p { color: rgba(255, 255, 255, 0.7); }
  }
}

.bento__copy {
  h3 {
    font-size: 1.3rem;
    font-weight: 800;
    margin: 0 0 0.45rem;
    color: #0f172a;
  }

  p {
    font-size: 0.85rem;
    line-height: 1.6;
    color: #64748b;
    margin: 0;
  }
}

.tool-tiles {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
}

.tool-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 0.5rem;
  border-radius: 14px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  text-decoration: none;
  color: #334155;
  font-size: 0.72rem;
  font-weight: 700;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    background: #e2e8f0;
  }

  img {
    width: 44px;
    height: 44px;
    object-fit: cover;
    border-radius: 10px;
  }

  &--accent {
    background: #0f172a;
    color: #fff;

    .wave-bars {
      display: flex;
      align-items: flex-end;
      gap: 3px;
      height: 24px;
      margin-bottom: 4px;

      span {
        width: 3px;
        background: #ff2d75;
        border-radius: 99px;
        animation: wave 1.2s ease-in-out infinite alternate;

        &:nth-child(1) { height: 40%; animation-delay: 0.1s; }
        &:nth-child(2) { height: 90%; animation-delay: 0.3s; }
        &:nth-child(3) { height: 60%; animation-delay: 0.2s; }
        &:nth-child(4) { height: 100%; animation-delay: 0.4s; }
        &:nth-child(5) { height: 50%; animation-delay: 0.15s; }
      }
    }
  }
}

@keyframes wave {
  0% { transform: scaleY(0.4); }
  100% { transform: scaleY(1); }
}

.run-app {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;

  img {
    width: 105px;
    height: 105px;
    object-fit: cover;
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.15);
  }
}

.run-app__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  height: 2.6rem;
  padding: 0 1.45rem;
  border-radius: 999px;
  background: #ffffff;
  color: #0f172a;
  font-size: 0.85rem;
  font-weight: 800;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
    transform: translateY(-2px);
  }
}

/* ─────────────────────────────────────────────────
   SCENARIOS & ORIGINALS
───────────────────────────────────────────────── */
.scenarios {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.35rem;

  .scenario--wide {
    grid-column: span 3;
    aspect-ratio: 3.2;
  }
}

.scenario {
  position: relative;
  aspect-ratio: 1.2;
  border-radius: 22px;
  overflow: hidden;
  background: #0f172a;

  &:hover .scenario__img img {
    transform: scale(1.06);
  }
}

.scenario__img {
  position: absolute;
  inset: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.88;
    transition: transform 0.35s ease;
  }
}

.scenario__info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.6rem;
  background: linear-gradient(0deg, rgba(15, 23, 42, 0.95) 0%, transparent 100%);
  color: #fff;
  text-align: left;

  h3 {
    font-size: 1.3rem;
    font-weight: 700;
    margin: 0 0 0.35rem;
  }

  p {
    font-size: 0.82rem;
    color: rgba(255, 255, 255, 0.75);
    margin: 0;
  }
}

.originals {
  position: relative;
  width: 100%;
  aspect-ratio: 2.5;
  border-radius: 24px;
  overflow: hidden;
  background: #0f172a;
  color: #fff;
  display: block;
  text-align: left;
}

.originals__bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 0.78;
}

.originals__copy {
  position: absolute;
  bottom: 3rem;
  left: 3rem;
  max-width: 480px;

  small {
    display: block;
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    color: #ff2d75;
    margin-bottom: 0.5rem;
  }

  h3 {
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    margin: 0 0 0.75rem;
    color: #fff;
  }

  p {
    font-size: 0.85rem;
    line-height: 1.65;
    color: rgba(255, 255, 255, 0.8);
    margin: 0 0 1.5rem;
  }
}

/* ─────────────────────────────────────────────────
   RESPONSIVE MEDIA QUERIES
───────────────────────────────────────────────── */
@media (max-width: 1080px) {
  .hero__inner { grid-template-columns: 1fr; }
  .products-grid { grid-template-columns: repeat(2, 1fr); }
  .guarantee-grid { grid-template-columns: repeat(2, 1fr); }
  .scenarios { grid-template-columns: 1fr; }
  .scenario--wide { grid-column: span 1; aspect-ratio: 1.5; }
  .bento { grid-template-columns: 1fr; }
  .studio-panel { position: relative; right: auto; top: auto; transform: none; width: 100%; margin: 1rem; }
  .studio-card__viewport { aspect-ratio: auto; min-height: 380px; }
  .hero__glass-card { padding: 2rem 1.5rem; }
}

@media (max-width: 720px) {
  .sec__head--split { flex-direction: column; align-items: flex-start; }
  .crafts-row { grid-template-columns: 1fr; }
  .guarantee-grid { grid-template-columns: 1fr; }
  .products-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
  .tool-tiles { grid-template-columns: repeat(2, 1fr); }
  .originals { aspect-ratio: 1.4; }
  .originals__copy { left: 1.5rem; bottom: 1.5rem; max-width: calc(100% - 3rem); }
}
</style>
