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

const searchKeyword = ref("");
const productsLoaded = ref(false);
const products = ref<StorefrontPublishedProduct[]>([]);
const categoryProducts = ref<Record<string, StorefrontPublishedProduct[]>>({});

const marketplaceCategories = site.home.productFinderGroups.slice(0, 8);
const marketplaceModules = site.home.modules.slice(0, 4);
const activeCategoryKey = ref(marketplaceCategories[0]?.key || "");

const dedupeProducts = (items: StorefrontPublishedProduct[]) =>
  items.filter(
    (product, index, list) =>
      list.findIndex((item) => item.id === product.id) === index,
  );

const fetchMarketplaceProducts = async () => {
  try {
    const [featured, ...categoryResults] = await Promise.all([
      fetchPublishedProducts({ pageSize: 36, random: true }),
      ...marketplaceCategories.map((category) =>
        fetchPublishedProducts({
          pageSize: 8,
          searchText: category.keyword,
          random: true,
        }),
      ),
    ]);

    categoryProducts.value = marketplaceCategories.reduce<
      Record<string, StorefrontPublishedProduct[]>
    >((result, category, index) => {
      result[category.key] = categoryResults[index] || [];
      return result;
    }, {});

    products.value = dedupeProducts([...featured, ...categoryResults.flat()]);
  } catch (error) {
    console.error("获取商城首页商品失败:", error);
    products.value = [];
    categoryProducts.value = {};
  } finally {
    productsLoaded.value = true;
  }
};

await fetchMarketplaceProducts();

const photoWallProducts = computed(() => {
  const source = products.value.slice(0, 24);
  if (!source.length) return [];
  const base = Array.from(
    { length: Math.max(32, source.length) },
    (_, index) => source[index % source.length],
  );
  return [...base, ...base];
});
const dealProducts = computed(() => products.value.slice(0, 10));
const recommendedProducts = computed(() => products.value.slice(0, 30));

const categoryEntries = computed(() =>
  marketplaceCategories.map((category) => ({
    ...category,
    product:
      categoryProducts.value[category.key]?.[0] ||
      products.value.find((product) => product.type.includes(category.keyword)),
  })),
);

const productShelves = computed(() =>
  marketplaceModules
    .map((module) => ({
      ...module,
      products: (categoryProducts.value[module.key] || []).slice(0, 6),
    }))
    .filter((module) => module.products.length > 0),
);

const activeCategory = computed(
  () =>
    marketplaceCategories.find(
      (category) => category.key === activeCategoryKey.value,
    ) || marketplaceCategories[0],
);

const activeCategoryItems = computed(() =>
  (categoryProducts.value[activeCategoryKey.value] || []).slice(0, 6),
);

const handleSearch = async () => {
  const keyword = searchKeyword.value.trim();
  await navigateTo(
    keyword ? `/products/${encodeURIComponent(keyword)}` : "/products",
  );
};

const formatPrice = (price: number | null) =>
  price ? `¥${price.toFixed(price % 1 === 0 ? 0 : 2)}` : "可定制";

const getDiscount = (product: StorefrontPublishedProduct) => {
  if (!product.price || !product.originalPrice) return "";
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );
  return discount > 0 ? `省 ${discount}%` : "";
};
</script>

<template>
  <main class="market-home">
    <section class="market-entry">
      <nav class="market-category-nav" aria-label="热门商品分类">
        <NuxtLink to="/products" class="market-category-nav__all">
          <AppIcon name="menu" :size="14" aria-hidden="true" />
          全部分类
        </NuxtLink>
        <NuxtLink
          v-for="category in marketplaceCategories"
          :key="category.key"
          :to="`/products/${encodeURIComponent(category.keyword)}`"
        >
          {{ category.label }}
        </NuxtLink>
      </nav>

      <form class="market-search" @submit.prevent="handleSearch">
        <AppIcon name="search" :size="18" aria-hidden="true" />
        <input
          v-model="searchKeyword"
          type="search"
          placeholder="搜索 T 恤、鼠标垫、杯子、手机壳或设计风格"
          aria-label="搜索 POD 商品"
        />
        <button type="submit">搜索</button>
      </form>

      <div class="market-promo">
        <div class="market-photo-wall" aria-hidden="true">
          <div class="market-photo-wall__track">
            <div
              v-for="(product, index) in photoWallProducts"
              :key="`${product.id}-banner-${index}`"
              :class="['market-photo-wall__item', `is-${index % 4}`]"
            >
              <img :src="getPublishedProductImage(product, 480)" alt="" />
            </div>
          </div>
        </div>
        <div class="market-promo__shade" aria-hidden="true"></div>

        <div class="market-promo__copy">
          <span>1S.DESIGN POD MARKETPLACE</span>
          <h1>POD 商品与创意定制商城</h1>
          <p>
            浏览衣设已发布商品，发现服饰、家居、礼赠和数码周边，也可以从任意商品发起同款定制。
          </p>
          <div class="market-promo__actions">
            <NuxtLink
              to="/products"
              class="market-action market-action--primary"
            >
              逛全部商品
              <AppIcon name="arrow-right" :size="13" aria-hidden="true" />
            </NuxtLink>
            <NuxtLink
              to="/design"
              class="market-action market-action--secondary"
            >
              发起定制
              <AppIcon name="palette" :size="13" aria-hidden="true" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="market-service-strip">
        <div>
          <AppIcon name="cube" :size="16" aria-hidden="true" />
          <span
            ><strong>丰富品类</strong
            ><small>服饰、礼赠、家居与数码</small></span
          >
        </div>
        <div>
          <AppIcon name="search" :size="16" aria-hidden="true" />
          <span
            ><strong>真实商品</strong><small>直接浏览已发布商品</small></span
          >
        </div>
        <div>
          <AppIcon name="palette" :size="16" aria-hidden="true" />
          <span
            ><strong>支持定制</strong
            ><small>从商品详情发起同款设计</small></span
          >
        </div>
        <div>
          <AppIcon name="heart" :size="16" aria-hidden="true" />
          <span
            ><strong>收藏灵感</strong><small>保存喜欢的商品与方向</small></span
          >
        </div>
      </div>
    </section>

    <section class="market-section market-categories">
      <header class="market-section__head">
        <div>
          <h2>热门品类</h2>
          <p>按商品类型快速进入</p>
        </div>
        <NuxtLink to="/products">
          查看全部
          <AppIcon name="chevron-right" :size="12" aria-hidden="true" />
        </NuxtLink>
      </header>

      <div class="market-category-grid">
        <NuxtLink
          v-for="category in categoryEntries"
          :key="category.key"
          :to="`/products/${encodeURIComponent(category.keyword)}`"
          class="market-category-card"
        >
          <div>
            <img
              v-if="category.product"
              :src="getPublishedProductImage(category.product, 320)"
              :alt="category.label"
            />
            <AppIcon v-else name="cube" :size="26" aria-hidden="true" />
          </div>
          <strong>{{ category.label }}</strong>
          <small>{{ category.hint }}</small>
        </NuxtLink>
      </div>

      <div class="market-category-browser">
        <div
          class="market-category-tabs"
          role="tablist"
          aria-label="切换商品分类"
        >
          <button
            v-for="category in marketplaceCategories"
            :key="`tab-${category.key}`"
            type="button"
            role="tab"
            :aria-selected="activeCategoryKey === category.key"
            :class="{ 'is-active': activeCategoryKey === category.key }"
            @click="activeCategoryKey = category.key"
          >
            {{ category.label }}
          </button>
        </div>

        <div class="market-category-browser__head">
          <div>
            <strong>{{ activeCategory?.label }}</strong>
            <span>{{ activeCategory?.hint }}</span>
          </div>
          <NuxtLink
            v-if="activeCategory"
            :to="`/products/${encodeURIComponent(activeCategory.keyword)}`"
          >
            进入分类
            <AppIcon name="arrow-right" :size="12" aria-hidden="true" />
          </NuxtLink>
        </div>

        <div
          v-if="activeCategoryItems.length"
          class="market-category-browser__grid"
        >
          <NuxtLink
            v-for="product in activeCategoryItems"
            :key="`category-preview-${product.id}`"
            :to="getPublishedProductPath(product)"
            class="market-product-card"
          >
            <div class="market-product-card__image">
              <img
                :src="getPublishedProductImage(product, 480)"
                :alt="product.title"
              />
            </div>
            <div class="market-product-card__info">
              <small>{{ product.type }}</small>
              <strong>{{ product.title }}</strong>
              <div>
                <b>{{ formatPrice(product.price) }}</b>
              </div>
            </div>
          </NuxtLink>
        </div>
        <div v-else class="market-category-browser__empty">
          当前分类暂时没有已发布商品
        </div>
      </div>
    </section>

    <section class="market-section market-deals">
      <header class="market-section__head market-section__head--deal">
        <div>
          <span>平台精选</span>
          <h2>正在被发现的商品</h2>
        </div>
        <NuxtLink to="/products">
          更多商品
          <AppIcon name="chevron-right" :size="12" aria-hidden="true" />
        </NuxtLink>
      </header>

      <div v-if="dealProducts.length" class="market-product-row">
        <NuxtLink
          v-for="product in dealProducts"
          :key="product.id"
          :to="getPublishedProductPath(product)"
          class="market-product-card"
        >
          <div class="market-product-card__image">
            <img
              :src="getPublishedProductImage(product, 520)"
              :alt="product.title"
              loading="lazy"
            />
            <span v-if="getDiscount(product)">{{ getDiscount(product) }}</span>
          </div>
          <div class="market-product-card__info">
            <small>{{ product.type }}</small>
            <strong>{{ product.title }}</strong>
            <div>
              <b>{{ formatPrice(product.price) }}</b>
              <del v-if="product.originalPrice"
                >¥{{ product.originalPrice }}</del
              >
            </div>
          </div>
        </NuxtLink>
      </div>
      <div v-else class="market-empty">
        {{ productsLoaded ? "暂时没有可展示的商品" : "正在加载商品" }}
      </div>
    </section>

    <section class="market-custom-banner">
      <div>
        <span>POD CUSTOM SERVICE</span>
        <h2>看到喜欢的商品，直接发起同款定制</h2>
        <p>
          商品详情会自动带入参考图片、商品类型与关键词，不需要重新描述一遍。
        </p>
      </div>
      <NuxtLink to="/design" class="market-action market-action--dark">
        开始定制
        <AppIcon name="arrow-right" :size="13" aria-hidden="true" />
      </NuxtLink>
    </section>

    <section
      v-for="shelf in productShelves"
      :key="shelf.key"
      class="market-section market-shelf"
    >
      <header class="market-section__head">
        <div>
          <h2>{{ shelf.title }}</h2>
          <p>{{ shelf.text }}</p>
        </div>
        <NuxtLink :to="shelf.href">
          查看更多
          <AppIcon name="chevron-right" :size="12" aria-hidden="true" />
        </NuxtLink>
      </header>

      <div class="market-shelf__grid">
        <NuxtLink
          v-for="product in shelf.products"
          :key="product.id"
          :to="getPublishedProductPath(product)"
          class="market-product-card"
        >
          <div class="market-product-card__image">
            <img
              :src="getPublishedProductImage(product, 520)"
              :alt="product.title"
              loading="lazy"
            />
          </div>
          <div class="market-product-card__info">
            <small>{{ product.type }}</small>
            <strong>{{ product.title }}</strong>
            <div>
              <b>{{ formatPrice(product.price) }}</b>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <section class="market-section market-recommendations">
      <header class="market-section__head">
        <div>
          <h2>猜你喜欢</h2>
          <p>更多来自衣设平台的 POD 商品</p>
        </div>
      </header>

      <div v-if="recommendedProducts.length" class="market-recommendation-grid">
        <NuxtLink
          v-for="product in recommendedProducts"
          :key="`recommend-${product.id}`"
          :to="getPublishedProductPath(product)"
          class="market-product-card"
        >
          <div class="market-product-card__image">
            <img
              :src="getPublishedProductImage(product, 520)"
              :alt="product.title"
              loading="lazy"
            />
            <FavoriteButton :product-id="product.id" />
          </div>
          <div class="market-product-card__info">
            <small>{{ product.type }}</small>
            <strong>{{ product.title }}</strong>
            <div>
              <b>{{ formatPrice(product.price) }}</b>
              <span>支持定制</span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.market-home {
  --market-accent: #151515;
  --market-accent-soft: #f0f0f0;
  --market-ink: #1b1b1b;
  min-height: 100vh;
  background: #f5f6f8;
  color: var(--market-ink);
}

.market-entry,
.market-section,
.market-custom-banner {
  width: var(--ys-container);
  margin: 0 auto;
}

.market-entry {
  padding: 0.75rem 0 0;
}

.market-category-nav {
  display: flex;
  min-height: 38px;
  align-items: center;
  gap: 0.2rem;
  overflow-x: auto;
  border: 1px solid #e0e2e6;
  border-radius: 6px;
  background: #fff;
  padding: 0.25rem;
  scrollbar-width: none;
}

.market-category-nav::-webkit-scrollbar {
  display: none;
}

.market-category-nav a {
  display: inline-flex;
  min-height: 30px;
  flex: 0 0 auto;
  align-items: center;
  gap: 0.4rem;
  border-radius: 4px;
  padding: 0 0.75rem;
  color: #3c4043;
  font-size: 0.72rem;
  font-weight: 700;
  text-decoration: none;
}

.market-category-nav a:hover {
  background: var(--market-accent-soft);
  color: #111;
}

.market-category-nav__all {
  background: var(--market-accent) !important;
  color: #fff !important;
}

.market-search {
  display: none;
  min-height: 46px;
  align-items: center;
  gap: 0.6rem;
  margin-top: 0.65rem;
  border: 2px solid var(--market-accent);
  border-radius: 6px;
  background: #fff;
  padding-left: 0.8rem;
  color: var(--market-accent);
}

.market-search input {
  min-width: 0;
  flex: 1;
  border: 0;
  outline: 0;
  background: transparent;
  font-size: 0.78rem;
}

.market-search button {
  align-self: stretch;
  border: 0;
  background: var(--market-accent);
  color: #fff;
  padding: 0 1.2rem;
  font-size: 0.76rem;
  font-weight: 800;
  cursor: pointer;
}

.market-promo {
  position: relative;
  display: flex;
  width: 100vw;
  min-height: clamp(620px, 78vh, 860px);
  align-items: center;
  margin-top: 0.75rem;
  margin-left: calc(50% - 50vw);
  overflow: hidden;
  border-radius: 0;
  background: var(--market-accent);
  color: #fff;
  isolation: isolate;
}

.market-promo__copy {
  position: relative;
  z-index: 2;
  display: flex;
  width: var(--ys-container);
  max-width: none;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;
  padding: clamp(2rem, 5vw, 4rem) 0;
}

.market-photo-wall,
.market-promo__shade {
  position: absolute;
  inset: 0;
}

.market-photo-wall {
  z-index: -2;
  overflow: hidden;
  background: #111;
}

.market-photo-wall__track {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  width: 100%;
  animation: market-photo-wall-scroll 56s linear infinite;
  will-change: transform;
}

.market-photo-wall__item {
  overflow: hidden;
  aspect-ratio: 0.82;
  background: #222;
}

.market-photo-wall__item.is-1,
.market-photo-wall__item.is-3 {
  transform: translateY(-18%);
}

.market-photo-wall__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.88) contrast(0.96) brightness(0.78);
}

.market-promo__shade {
  z-index: -1;
  background:
    linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.88) 0%,
      rgba(0, 0, 0, 0.62) 44%,
      rgba(0, 0, 0, 0.18) 78%
    ),
    linear-gradient(0deg, rgba(0, 0, 0, 0.46), transparent 58%);
}

.market-promo__copy > span,
.market-custom-banner span,
.market-section__head--deal span {
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.market-promo h1 {
  max-width: 560px;
  margin: 0.45rem 0 0;
  color: #fff;
  font-size: clamp(1.85rem, 3.5vw, 3.1rem);
  line-height: 1.05;
}

.market-promo__copy p {
  max-width: 540px;
  margin: 0.75rem 0 0;
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.78rem;
  line-height: 1.7;
}

.market-promo__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.market-action {
  display: inline-flex;
  min-height: 2.6rem;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 0 0.9rem;
  font-size: 0.72rem;
  font-weight: 800;
  text-decoration: none;
}

.market-action--primary {
  background: #fff;
  color: #161616;
}

.market-action--secondary {
  border-color: rgba(255, 255, 255, 0.5);
  color: #fff;
}

.market-action--dark {
  background: #151515;
  color: #fff;
}

.market-service-strip {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  min-height: 68px;
  border: 1px solid #e0e2e6;
  border-top: 0;
  border-radius: 0 0 6px 6px;
  background: #fff;
}

.market-service-strip > div {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  border-right: 1px solid #e7e8ea;
  padding: 0.75rem 1rem;
  color: var(--market-accent);
}

.market-service-strip > div:last-child {
  border-right: 0;
}

.market-service-strip span,
.market-service-strip strong,
.market-service-strip small {
  display: block;
}

.market-service-strip strong {
  color: #222;
  font-size: 0.72rem;
}

.market-service-strip small {
  margin-top: 0.15rem;
  color: #74787d;
  font-size: 0.62rem;
}

.market-section {
  margin-top: 0.9rem;
  border-radius: 6px;
  background: #fff;
  padding: 1rem;
}

.market-section__head {
  display: flex;
  min-height: 44px;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.85rem;
}

.market-section__head h2 {
  margin: 0;
  font-size: clamp(1.2rem, 2.1vw, 1.65rem);
  line-height: 1.15;
}

.market-section__head p {
  max-width: 560px;
  margin: 0.2rem 0 0;
  color: #767a80;
  font-size: 0.66rem;
  line-height: 1.45;
}

.market-section__head > a {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 0.25rem;
  color: var(--market-accent);
  font-size: 0.7rem;
  font-weight: 750;
  text-decoration: none;
}

.market-category-grid {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  gap: 0.65rem;
}

.market-category-card {
  min-width: 0;
  color: #222;
  text-align: center;
  text-decoration: none;
}

.market-category-card > div {
  display: grid;
  aspect-ratio: 1;
  place-items: center;
  overflow: hidden;
  border-radius: 6px;
  background: #f1f3f5;
  color: #8a8f95;
}

.market-category-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 220ms ease;
}

.market-category-card:hover img {
  transform: scale(1.045);
}

.market-category-card strong,
.market-category-card small {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.market-category-card strong {
  margin-top: 0.45rem;
  font-size: 0.72rem;
}

.market-category-card small {
  margin-top: 0.12rem;
  color: #888d93;
  font-size: 0.58rem;
}

.market-category-browser {
  margin-top: 1rem;
  border-top: 1px solid #e0e2e5;
  padding-top: 0.9rem;
}

.market-category-tabs {
  display: flex;
  gap: 0.4rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
  scrollbar-width: none;
}

.market-category-tabs::-webkit-scrollbar {
  display: none;
}

.market-category-tabs button {
  min-height: 2.2rem;
  flex: 0 0 auto;
  border: 1px solid #d9dadd;
  border-radius: 4px;
  background: #fff;
  color: #4a4d51;
  padding: 0 0.8rem;
  font-size: 0.68rem;
  font-weight: 750;
  cursor: pointer;
}

.market-category-tabs button:hover {
  border-color: #777;
  color: #111;
}

.market-category-tabs button.is-active {
  border-color: #151515;
  background: #151515;
  color: #fff;
}

.market-category-browser__head {
  display: flex;
  min-height: 52px;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.market-category-browser__head strong,
.market-category-browser__head span {
  display: block;
}

.market-category-browser__head strong {
  font-size: 0.88rem;
}

.market-category-browser__head span {
  margin-top: 0.1rem;
  color: #7b7e82;
  font-size: 0.62rem;
}

.market-category-browser__head a {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: #111;
  font-size: 0.68rem;
  font-weight: 800;
  text-decoration: none;
}

.market-category-browser__grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 0.7rem;
}

.market-category-browser__empty {
  display: grid;
  min-height: 130px;
  place-items: center;
  border: 1px dashed #d8dadd;
  color: #85898e;
  font-size: 0.7rem;
}

.market-section__head--deal {
  border-radius: 4px;
  background: #f2f2f2;
  padding: 0.7rem 0.85rem;
}

.market-section__head--deal span {
  color: #555;
}

.market-product-row {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.7rem;
}

.market-product-card {
  min-width: 0;
  color: #222;
  text-decoration: none;
}

.market-product-card__image {
  position: relative;
  display: grid;
  aspect-ratio: 1 / 1.06;
  place-items: center;
  overflow: hidden;
  border-radius: 5px;
  background: #f2f3f5;
}

.market-product-card__image > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 220ms ease;
}

.market-product-card:hover .market-product-card__image > img {
  transform: scale(1.025);
}

.market-product-card__image > span {
  position: absolute;
  top: 0.45rem;
  left: 0.45rem;
  border-radius: 3px;
  background: #151515;
  color: #fff;
  padding: 0.25rem 0.35rem;
  font-size: 0.58rem;
  font-weight: 800;
}

.market-product-card__image :deep(.favorite-button) {
  position: absolute;
  top: 0.45rem;
  right: 0.45rem;
}

.market-product-card__info {
  display: grid;
  gap: 0.18rem;
  padding: 0.5rem 0.1rem 0.15rem;
}

.market-product-card__info > small {
  overflow: hidden;
  color: #777c82;
  font-size: 0.58rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.market-product-card__info > strong {
  display: -webkit-box;
  min-height: 2.2rem;
  overflow: hidden;
  font-size: 0.74rem;
  line-height: 1.45;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.market-product-card__info > div {
  display: flex;
  min-height: 1.3rem;
  align-items: baseline;
  gap: 0.35rem;
}

.market-product-card__info b {
  color: #111;
  font-size: 0.86rem;
}

.market-product-card__info del {
  color: #9b9da1;
  font-size: 0.58rem;
}

.market-product-card__info div > span {
  color: #777c82;
  font-size: 0.58rem;
}

.market-empty {
  display: grid;
  min-height: 180px;
  place-items: center;
  border: 1px dashed #d8dadd;
  color: #888d93;
  font-size: 0.74rem;
}

.market-custom-banner {
  display: flex;
  min-height: 130px;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-top: 0.9rem;
  border-radius: 6px;
  border: 1px solid #dedfe2;
  background: #ededed;
  padding: 1.2rem clamp(1.2rem, 3vw, 2.2rem);
}

.market-custom-banner h2 {
  margin: 0.35rem 0 0;
  font-size: clamp(1.2rem, 2.2vw, 1.8rem);
}

.market-custom-banner p {
  margin: 0.35rem 0 0;
  color: rgba(0, 0, 0, 0.62);
  font-size: 0.68rem;
}

.market-shelf__grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 0.7rem;
}

.market-recommendation-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.9rem 0.7rem;
}

.market-recommendations {
  margin-bottom: 1rem;
}

@keyframes market-photo-wall-scroll {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-50%);
  }
}

@media (max-width: 1050px) {
  .market-photo-wall__track {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }

  .market-category-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .market-product-row,
  .market-recommendation-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .market-shelf__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .market-category-browser__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 700px) {
  .market-home {
    background: #fff;
  }

  .market-entry,
  .market-section,
  .market-custom-banner {
    width: 100%;
  }

  .market-entry {
    padding-top: 0;
  }

  .market-category-nav,
  .market-search,
  .market-promo,
  .market-service-strip,
  .market-section,
  .market-custom-banner {
    border-radius: 0;
  }

  .market-category-nav {
    border-inline: 0;
  }

  .market-search {
    display: flex;
    margin: 0.55rem 0.75rem 0;
    border-radius: 6px;
  }

  .market-promo {
    min-height: 520px;
  }

  .market-promo__copy {
    width: calc(100% - 2rem);
    padding: 2rem 0;
  }

  .market-promo h1 {
    font-size: 1.75rem;
  }

  .market-photo-wall__track {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .market-promo__shade {
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.86),
      rgba(0, 0, 0, 0.5) 72%,
      rgba(0, 0, 0, 0.28)
    );
  }

  .market-service-strip {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    border-inline: 0;
  }

  .market-service-strip > div {
    min-height: 66px;
    border-bottom: 1px solid #e7e8ea;
    padding: 0.65rem 0.75rem;
  }

  .market-section {
    margin-top: 0.55rem;
    border-top: 6px solid #f3f4f6;
    padding: 0.85rem 0.75rem;
  }

  .market-category-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0.7rem 0.45rem;
  }

  .market-category-card small {
    display: none;
  }

  .market-product-row {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
  }

  .market-product-row::-webkit-scrollbar {
    display: none;
  }

  .market-product-row .market-product-card {
    flex: 0 0 44vw;
    scroll-snap-align: start;
  }

  .market-custom-banner {
    align-items: flex-start;
    flex-direction: column;
    margin-top: 0.55rem;
    padding: 1.25rem 1rem;
  }

  .market-shelf__grid,
  .market-category-browser__grid,
  .market-recommendation-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.8rem 0.55rem;
  }

  .market-section__head p {
    display: none;
  }

  .market-product-card__info > strong {
    font-size: 0.7rem;
  }
}
</style>
