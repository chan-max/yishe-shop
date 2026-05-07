<script lang="ts" setup>
import { computed, ref } from "vue";
import { api } from "../utils/api";
import { getPreviewImageUrl } from "../utils/image";

definePageMeta({ layout: "page" });

usePageSEO({
  title: "衣设 1s.design - POD 印花、定制商品与创意设计开放平台",
  description:
    "衣设聚合 POD 印花图案、定制商品、品牌周边、私人定制和创意设计灵感，帮助创作者与品牌把视觉想法转化为真实产品。",
  keywords:
    "POD,印花设计,定制商品,私人定制,创意设计,图案素材,服装印花,品牌周边,按需定制,1s.design",
  url: "https://1s.design",
  type: "website",
  structuredData: [useWebsiteStructuredData(), useOrganizationStructuredData()],
});

type FeaturedProduct = {
  id: string;
  title: string;
  description?: string;
  category: string;
  imageUrl?: string;
  type?: string;
  code?: string;
};

const featuredProducts = ref<FeaturedProduct[]>([]);

const fallbackProducts: FeaturedProduct[] = [
  {
    id: "pod-print-series",
    title: "Botanical Print Capsule",
    description: "适合服饰、帆布包、杯具与家居布艺延展的植物印花系列。",
    category: "POD PRINT",
    type: "印花图案",
  },
  {
    id: "custom-gift-set",
    title: "Creator Gift Collection",
    description: "面向节日礼赠、品牌活动与私人纪念的定制商品企划。",
    category: "CUSTOM GIFT",
    type: "定制礼物",
  },
  {
    id: "home-textile-art",
    title: "Home Textile Art",
    description: "可延展到抱枕、挂毯、装饰画和软装织物的图案方向。",
    category: "HOME DECOR",
    type: "家居布艺",
  },
  {
    id: "streetwear-drop",
    title: "Streetwear Drop",
    description: "适合 T 恤、卫衣、帽衫和潮流周边上新的视觉系列。",
    category: "APPAREL",
    type: "服饰印花",
  },
];

const categoryTiles = [
  {
    title: "T-Shirts",
    label: "服饰印花",
    keyword: "T恤",
    image: "/discovery/pod-tee.svg",
  },
  {
    title: "Mugs",
    label: "杯具礼赠",
    keyword: "杯子",
    image: "/discovery/pod-mug.svg",
  },
  {
    title: "Tote Bags",
    label: "日常周边",
    keyword: "帆布包",
    image: "/discovery/pod-bag.svg",
  },
  {
    title: "Phone Cases",
    label: "数码配件",
    keyword: "手机壳",
    image: "/discovery/pod-phone.svg",
  },
  {
    title: "Home Textile",
    label: "家居布艺",
    keyword: "抱枕",
    image: "/discovery/pod-pillow.svg",
  },
  {
    title: "Wall Art",
    label: "空间装饰",
    keyword: "装饰画",
    image: "/discovery/pod-tapestry.svg",
  },
];

const styleDirections = [
  { name: "Minimal", desc: "克制留白，高级品牌感", keyword: "极简" },
  { name: "Floral", desc: "花卉印花与柔和礼赠", keyword: "花卉" },
  { name: "Street", desc: "潮流图形与服饰企划", keyword: "街头" },
  { name: "Oriental", desc: "新中式、国潮与文创", keyword: "国潮" },
];

const platformStats = [
  { value: "POD", label: "按需定制商品" },
  { value: "30min", label: "站点地图刷新" },
  { value: "SSR", label: "搜索引擎友好" },
  { value: "SEO", label: "关键词落地页" },
];

const marqueeWords = [
  "POD 印花",
  "定制设计",
  "品牌周边",
  "创意商品",
  "按需定制",
  "私人订制",
];

const heroProduct = computed(
  () => featuredProducts.value[0] || fallbackProducts[0],
);
const newArrivals = computed(() =>
  (featuredProducts.value.length ? featuredProducts.value : fallbackProducts).slice(
    0,
    8,
  ),
);
const topSelling = computed(() =>
  (featuredProducts.value.length
    ? [...featuredProducts.value].slice(4, 12)
    : fallbackProducts
  ).slice(0, 4),
);

const getProductHref = (product: FeaturedProduct) =>
  product.id.startsWith("pod-") ||
  product.id.startsWith("custom-") ||
  product.id.startsWith("home-") ||
  product.id.startsWith("streetwear-")
    ? "/products"
    : `/product/${product.id}`;

const getProductImageUrl = (product: FeaturedProduct, width = 780) => {
  if (!product.imageUrl) return "";
  return (
    getPreviewImageUrl(product.imageUrl, {
      width,
      quality: 82,
      format: "webp",
    }) || product.imageUrl
  );
};

const fetchFeaturedProducts = async () => {
  try {
    const response = await api.productList.getPage({
      page: 1,
      pageSize: 12,
      isPublish: true,
      includeRelations: false,
    });

    if (
      response.code === 0 ||
      response.status === true ||
      response.code === 200
    ) {
      const products = (response.data as any)?.list || [];
      featuredProducts.value = products.map((product: any) => {
        const firstImage =
          Array.isArray(product.images) && product.images.length > 0
            ? product.images[0]
            : "";
        return {
          id: product.id,
          title: product.name || "POD 定制商品",
          description: product.description || "",
          category: product.type || "POD SELECTION",
          imageUrl: firstImage,
          type: product.type || "POD",
          code: product.code || "",
        };
      });
    }
  } catch (error) {
    console.error("获取首页商品失败:", error);
    featuredProducts.value = [];
  }
};

await fetchFeaturedProducts();
</script>

<template>
  <main class="home-page">
    <h1 class="sr-only">衣设 POD 印花、定制商品与创意设计开放平台</h1>

    <section class="home-hero">
      <div class="home-hero__copy">
        <span class="home-eyebrow">1s.design / POD 定制平台</span>
        <h2>找到匹配你创意的 POD 商品</h2>
        <p>
          探索印花图案、定制周边、品牌礼赠和私人定义商品。为创作者、品牌和个人定制需求提供可浏览、可延展的商品灵感。
        </p>
        <div class="home-hero__actions">
          <NuxtLink to="/products" class="home-primary-btn">
            浏览商品
            <v-icon size="18">mdi-arrow-right</v-icon>
          </NuxtLink>
          <NuxtLink to="/design" class="home-secondary-btn">
            发起定制
          </NuxtLink>
        </div>
      </div>

      <div class="home-hero__visual">
        <div class="home-hero__badge">新品</div>
        <span class="home-star home-star--one">✦</span>
        <span class="home-star home-star--two">✦</span>
        <NuxtLink :to="getProductHref(heroProduct)" class="home-feature-card">
          <div class="home-feature-card__media">
            <img
              v-if="getProductImageUrl(heroProduct, 980)"
              :src="getProductImageUrl(heroProduct, 980)"
              :alt="heroProduct.title"
            />
            <div v-else class="home-product-fallback">
              <span>{{ heroProduct.category }}</span>
            </div>
          </div>
          <div class="home-feature-card__body">
            <span>{{ heroProduct.category }}</span>
            <strong>{{ heroProduct.title }}</strong>
          </div>
        </NuxtLink>
      </div>
    </section>

    <section class="home-stats" aria-label="平台能力">
      <div v-for="item in platformStats" :key="item.label">
        <strong>{{ item.value }}</strong>
        <span>{{ item.label }}</span>
      </div>
    </section>

    <section class="home-marquee" aria-label="平台方向">
      <div>
        <span v-for="word in marqueeWords" :key="word">{{ word }}</span>
        <span v-for="word in marqueeWords" :key="`${word}-copy`">{{ word }}</span>
      </div>
    </section>

    <section class="home-section">
      <div class="home-section__head">
        <div>
          <span class="home-eyebrow">商品分类</span>
          <h2>按商品载体发现设计灵感</h2>
        </div>
        <NuxtLink to="/products" class="home-text-link">
          全部商品
          <v-icon size="16">mdi-arrow-right</v-icon>
        </NuxtLink>
      </div>

      <div class="home-category-grid">
        <NuxtLink
          v-for="item in categoryTiles"
          :key="item.title"
          :to="`/products/${encodeURIComponent(item.keyword)}`"
          class="home-category-card"
        >
          <div>
            <span>{{ item.label }}</span>
            <strong>{{ item.title }}</strong>
          </div>
          <img :src="item.image" :alt="item.label" />
        </NuxtLink>
      </div>
    </section>

    <section class="home-section">
      <div class="home-section__head">
        <div>
          <span class="home-eyebrow">最新上架</span>
          <h2>最新发布的 POD 商品与图案</h2>
        </div>
        <NuxtLink to="/products" class="home-text-link">
          查看更多
          <v-icon size="16">mdi-arrow-right</v-icon>
        </NuxtLink>
      </div>

      <div class="home-product-grid">
        <NuxtLink
          v-for="product in newArrivals"
          :key="product.id"
          :to="getProductHref(product)"
          class="home-product-card"
        >
          <div class="home-product-card__media">
            <img
              v-if="getProductImageUrl(product)"
              :src="getProductImageUrl(product)"
              :alt="product.title"
              loading="lazy"
            />
            <div v-else class="home-product-fallback">
              <span>{{ product.category }}</span>
            </div>
            <span class="home-product-card__arrow">
              <v-icon size="17">mdi-arrow-top-right</v-icon>
            </span>
          </div>
          <div class="home-product-card__body">
            <span>{{ product.category }}</span>
            <strong>{{ product.title }}</strong>
            <p>{{ product.description || "可用于印花、定制、礼赠和品牌周边的创意商品方向。" }}</p>
          </div>
        </NuxtLink>
      </div>
    </section>

    <section class="home-showcase">
      <div class="home-showcase__copy">
        <span class="home-eyebrow">商品系统</span>
        <h2>从一个图案，延展出一整套商品表达。</h2>
        <p>
          适合独立品牌、内容创作者、活动企划和私人礼物。你可以从关键词进入，也可以按商品类别浏览，让每个页面都成为可被搜索引擎理解的内容入口。
        </p>
        <NuxtLink to="/products/印花" class="home-primary-btn">
          探索印花设计
          <v-icon size="18">mdi-arrow-right</v-icon>
        </NuxtLink>
      </div>
      <div class="home-style-grid">
        <NuxtLink
          v-for="item in styleDirections"
          :key="item.name"
          :to="`/products/${encodeURIComponent(item.keyword)}`"
          class="home-style-card"
        >
          <span>{{ item.name }}</span>
          <strong>{{ item.desc }}</strong>
        </NuxtLink>
      </div>
    </section>

    <section class="home-section home-section--split">
      <div>
        <span class="home-eyebrow">热门方向</span>
        <h2>更适合商业化的设计方向</h2>
      </div>
      <div class="home-mini-list">
        <NuxtLink
          v-for="product in topSelling"
          :key="product.id"
          :to="getProductHref(product)"
          class="home-mini-product"
        >
          <div>
            <img
              v-if="getProductImageUrl(product, 360)"
              :src="getProductImageUrl(product, 360)"
              :alt="product.title"
              loading="lazy"
            />
            <span v-else>{{ product.category.slice(0, 2) }}</span>
          </div>
          <section>
            <small>{{ product.type || product.category }}</small>
            <strong>{{ product.title }}</strong>
          </section>
          <v-icon size="17">mdi-arrow-right</v-icon>
        </NuxtLink>
      </div>
    </section>

    <section class="home-cta">
      <span>PRIVATE CUSTOM / POD PRINT / BRAND MERCH</span>
      <h2>准备把你的视觉想法变成商品了吗？</h2>
      <p>
        从商品库找灵感，从定制服务开始落地。衣设会持续围绕 POD 印花、私人定义和创意设计内容优化可收录页面。
      </p>
      <div>
        <NuxtLink to="/design" class="home-primary-btn home-primary-btn--light">
          提交定制需求
        </NuxtLink>
        <NuxtLink to="/products" class="home-secondary-btn home-secondary-btn--dark">
          继续浏览商品
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  background: #fff;
  color: #111;
  overflow: hidden;
}

.home-section,
.home-showcase,
.home-stats,
.home-cta {
  width: var(--ys-container);
  margin-inline: auto;
}

.home-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(360px, 0.92fr);
  gap: clamp(2rem, 5vw, 4rem);
  align-items: center;
  width: 100%;
  margin: 0 0 clamp(2rem, 5vw, 4rem);
  padding:
    clamp(2.4rem, 6vw, 5.8rem)
    var(--ys-container-pad)
    clamp(2rem, 5vw, 4.5rem);
  background: #f2f0ed;
  overflow: hidden;
}

.home-eyebrow {
  display: inline-flex;
  align-items: center;
  min-height: 1.6rem;
  border: 1px solid #ececec;
  border-radius: 6px;
  color: #555;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  padding: 0 0.65rem;
}

.home-hero h2,
.home-section h2,
.home-showcase h2,
.home-cta h2 {
  margin: 0;
  color: #050505;
  letter-spacing: 0;
}

.home-hero h2 {
  max-width: 640px;
  margin-top: 0.75rem;
  font-size: clamp(1.6rem, 3.5vw, 2.6rem);
  line-height: 1.12;
  font-weight: 800;
}

.home-hero p,
.home-showcase p,
.home-cta p {
  max-width: 520px;
  margin: 0.85rem 0 0;
  color: #5f5f5f;
  font-size: 0.85rem;
  line-height: 1.75;
}

.home-hero__actions,
.home-cta > div {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1.2rem;
}

.home-primary-btn,
.home-secondary-btn,
.home-text-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  min-height: 2.6rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 700;
  text-decoration: none;
  padding: 0 1rem;
}

.home-primary-btn {
  background: #000;
  color: #fff;
}

.home-primary-btn:hover {
  color: #fff;
  opacity: 0.88;
}

.home-secondary-btn {
  border: 1px solid #e6e6e6;
  background: #fff;
  color: #111;
}

.home-secondary-btn:hover,
.home-text-link:hover {
  border-color: #111;
}

.home-hero__visual {
  position: relative;
  min-height: clamp(320px, 35vw, 480px);
  border-radius: 0;
  background: transparent;
  overflow: hidden;
}

.home-hero__badge {
  position: absolute;
  left: 0.85rem;
  top: 0.85rem;
  z-index: 3;
  border-radius: 6px;
  background: #000;
  color: #fff;
  font-size: 0.65rem;
  font-weight: 800;
  padding: 0.4rem 0.65rem;
}

.home-feature-card {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  color: inherit;
  text-decoration: none;
}

.home-feature-card__media {
  display: grid;
  place-items: center;
  min-height: 0;
  padding: clamp(2rem, 5vw, 4rem);
}

.home-feature-card__media img {
  width: min(94%, 600px);
  max-height: min(48vh, 470px);
  object-fit: contain;
  filter: drop-shadow(0 30px 34px rgba(0, 0, 0, 0.18));
  animation: home-float 5.6s ease-in-out infinite;
}

.home-feature-card__body {
  align-self: end;
  display: grid;
  gap: 0.3rem;
  margin: 0 0.85rem 0.85rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.88);
  padding: 0.75rem;
}

.home-star {
  position: absolute;
  z-index: 5;
  color: #000;
  line-height: 1;
}

.home-star--one {
  right: 4%;
  top: 14%;
  font-size: clamp(1.8rem, 4.5vw, 4rem);
}

.home-star--two {
  left: 5%;
  top: 38%;
  font-size: clamp(1.2rem, 2.5vw, 2.2rem);
}

.home-feature-card__body span,
.home-product-card__body span,
.home-category-card span,
.home-mini-product small,
.home-cta span {
  color: #777;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.home-feature-card__body strong {
  color: #111;
  font-size: clamp(1rem, 2vw, 1.6rem);
  line-height: 1.1;
}

.home-product-fallback {
  display: grid;
  place-items: center;
  width: 74%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #fff;
  color: #111;
  text-align: center;
}

.home-stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1px;
  overflow: hidden;
  border-radius: 10px;
  background: #202020;
}

.home-stats div {
  min-height: 4.2rem;
  background: #050505;
  color: #fff;
  padding: 0.75rem;
}

.home-stats strong {
  display: block;
  font-size: clamp(1.1rem, 2vw, 1.75rem);
  line-height: 1;
}

.home-stats span {
  display: block;
  margin-top: 0.3rem;
  color: rgba(255, 255, 255, 0.64);
  font-size: 0.68rem;
}

.home-marquee {
  width: 100%;
  margin: clamp(1.5rem, 4vw, 3rem) 0;
  overflow: hidden;
  border-block: 0;
  background: #000;
}

.home-marquee div {
  display: flex;
  width: max-content;
  animation: home-marquee 28s linear infinite;
}

.home-marquee span {
  display: inline-flex;
  align-items: center;
  min-height: 3.2rem;
  padding: 0 1.5rem;
  color: #fff;
  font-size: clamp(1rem, 2.2vw, 1.8rem);
  font-weight: 800;
  white-space: nowrap;
}

.home-section {
  padding: clamp(0.75rem, 2vw, 1.5rem) 0 clamp(2rem, 5vw, 4rem);
}

.home-section__head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.home-section h2,
.home-showcase h2,
.home-cta h2 {
  margin-top: 0.6rem;
  font-size: clamp(1.2rem, 2.5vw, 1.9rem);
  line-height: 1.15;
}

.home-text-link {
  min-height: 2.2rem;
  border: 1px solid #e6e6e6;
  color: #111;
}

.home-category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 0.75rem;
}

.home-category-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  min-height: 140px;
  overflow: hidden;
  border-radius: 10px;
  background: #f0f0f0;
  color: #111;
  text-decoration: none;
  padding: 1rem;
}

.home-category-card strong {
  display: block;
  margin-top: 0.3rem;
  font-size: clamp(1.1rem, 2vw, 1.6rem);
  line-height: 1;
}

.home-category-card img {
  width: min(38%, 130px);
  aspect-ratio: 1;
  object-fit: contain;
}

.home-product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: clamp(0.6rem, 1.5vw, 1rem);
}

.home-product-card {
  min-width: 0;
  color: inherit;
  text-decoration: none;
}

.home-product-card__media {
  position: relative;
  display: grid;
  place-items: center;
  aspect-ratio: 0.86;
  overflow: hidden;
  border-radius: 10px;
  background: #f0f0f0;
}

.home-product-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.home-product-card__arrow {
  position: absolute;
  right: 0.8rem;
  top: 0.8rem;
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.92);
}

.home-product-card__body {
  display: grid;
  gap: 0.2rem;
  padding: 0.6rem 0.15rem 0;
}

.home-product-card__body strong {
  color: #111;
  font-size: 0.85rem;
  line-height: 1.4;
}

.home-product-card__body p {
  display: -webkit-box;
  margin: 0;
  color: #666;
  font-size: 0.72rem;
  line-height: 1.6;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
}

.home-showcase {
  display: grid;
  grid-template-columns: minmax(0, 0.88fr) minmax(280px, 1.12fr);
  gap: clamp(0.75rem, 2vw, 1.5rem);
  align-items: stretch;
  margin-bottom: clamp(2rem, 5vw, 4rem);
}

.home-showcase__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border-radius: 1.6rem;
  background: #111;
  color: #fff;
  padding: clamp(1.4rem, 4vw, 3rem);
}

.home-showcase__copy .home-eyebrow {
  border-color: rgba(255, 255, 255, 0.18);
  color: rgba(255, 255, 255, 0.72);
}

.home-showcase__copy h2 {
  color: #fff;
}

.home-showcase__copy p {
  color: rgba(255, 255, 255, 0.68);
}

.home-style-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 0.75rem;
}

.home-style-card {
  display: flex;
  min-height: 180px;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  background: #f0f0f0;
  color: #111;
  text-decoration: none;
  padding: 1rem;
}

.home-style-card span {
  color: #777;
  font-size: 0.68rem;
  font-weight: 700;
}

.home-style-card strong {
  max-width: 260px;
  font-size: clamp(1rem, 1.8vw, 1.5rem);
  line-height: 1.1;
}

.home-style-card:hover {
  background: #e8e8e8;
}

.home-section--split {
  display: grid;
  grid-template-columns: minmax(0, 0.78fr) minmax(300px, 1.22fr);
  gap: clamp(0.75rem, 3vw, 2rem);
  align-items: start;
}

.home-mini-list {
  display: grid;
  gap: 0.5rem;
}

.home-mini-product {
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.75rem;
  min-height: 4.8rem;
  border: 1px solid #ededed;
  border-radius: 8px;
  color: #111;
  text-decoration: none;
  padding: 0.5rem;
}

.home-mini-product > div {
  display: grid;
  place-items: center;
  width: 64px;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 6px;
  background: #f0f0f0;
}

.home-mini-product img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.home-mini-product strong {
  display: block;
  margin-top: 0.15rem;
  font-size: 0.85rem;
  line-height: 1.35;
}

.home-mini-product:hover {
  border-color: #111;
}

.home-cta {
  margin-bottom: clamp(2rem, 5vw, 4rem);
  border-radius: 12px;
  background: #050505;
  color: #fff;
  padding: clamp(1.2rem, 4vw, 3rem);
  text-align: center;
}

.home-cta h2,
.home-cta p {
  margin-inline: auto;
  color: #fff;
}

.home-cta p {
  color: rgba(255, 255, 255, 0.66);
}

.home-cta > div {
  justify-content: center;
}

.home-primary-btn--light {
  background: #fff;
  color: #111;
}

.home-primary-btn--light:hover {
  color: #111;
}

.home-secondary-btn--dark {
  border-color: rgba(255, 255, 255, 0.22);
  background: transparent;
  color: #fff;
}

.home-secondary-btn--dark:hover {
  border-color: #fff;
}

@keyframes home-float {
  0%,
  100% {
    transform: translateY(0) rotate(-1deg);
  }
  50% {
    transform: translateY(-14px) rotate(1deg);
  }
}

@keyframes home-marquee {
  to {
    transform: translateX(-50%);
  }
}

@media (max-width: 1080px) {
  .home-hero,
  .home-showcase,
  .home-section--split {
    grid-template-columns: 1fr;
  }

  .home-product-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .home-category-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .home-hero,
  .home-section,
  .home-showcase,
  .home-stats,
  .home-cta {
    width: var(--ys-container);
  }

  .home-hero {
    padding-top: 1.5rem;
    padding-inline: var(--ys-container-pad);
  }

  .home-hero h2 {
    font-size: clamp(1.6rem, 6vw, 2.4rem);
  }

  .home-hero p,
  .home-showcase p,
  .home-cta p {
    font-size: 0.82rem;
  }

  .home-hero__visual {
    min-height: 260px;
    border-radius: 10px;
  }

  .home-stats,
  .home-category-grid,
  .home-product-grid,
  .home-style-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .home-stats {
    border-radius: 8px;
  }

  .home-section__head {
    align-items: flex-start;
    flex-direction: column;
  }

  .home-category-card {
    min-height: 120px;
    flex-direction: column;
    align-items: flex-start;
  }

  .home-category-card img {
    width: 44px;
  }

  .home-product-card__media,
  .home-style-card {
    border-radius: 8px;
  }

  .home-style-card {
    min-height: 150px;
  }

  .home-product-card__body p {
    display: none;
  }

  .home-mini-product {
    grid-template-columns: 52px minmax(0, 1fr) auto;
  }

  .home-mini-product > div {
    width: 52px;
  }
}

@media (max-width: 480px) {
  .home-stats,
  .home-category-grid,
  .home-product-grid,
  .home-style-grid {
    grid-template-columns: 1fr;
  }

  .home-hero__actions,
  .home-cta > div {
    flex-direction: column;
  }

  .home-primary-btn,
  .home-secondary-btn {
    width: 100%;
  }
}
</style>
