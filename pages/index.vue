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

const { data: homeProductsData } = await useAsyncData(
  "home-published-products",
  () => fetchPublishedProducts({ pageSize: 48, random: true }),
);

const products = computed<StorefrontPublishedProduct[]>(
  () => homeProductsData.value || [],
);

const getProductImage = (product: StorefrontPublishedProduct, width = 900) =>
  getPublishedProductImage(product, width) || "";

const showcaseTabs = computed(() => [
  { id: "all", label: "全部商品", keyword: "" },
  ...(site.home.productFinderGroups || []).map((group) => ({
    id: group.key,
    label: group.label,
    keyword: group.keyword,
  })),
]);

const activeShowcaseTab = ref("all");
const selectedStudioIndex = ref(0);

const filteredShowcaseProducts = computed(() => {
  const tab = showcaseTabs.value.find(
    (item) => item.id === activeShowcaseTab.value,
  );
  if (!tab?.keyword) return products.value.slice(0, 8);

  const keyword = tab.keyword.toLowerCase();
  const matched = products.value.filter((product) =>
    [product.title, product.type, product.category]
      .join(" ")
      .toLowerCase()
      .includes(keyword),
  );

  return matched.length ? matched.slice(0, 8) : products.value.slice(0, 8);
});

const photoWallProducts = computed(() => {
  if (!products.value.length) return [];
  const source = products.value.slice(0, 24);
  const wallSegment = Array.from(
    { length: Math.max(24, source.length) },
    (_, index) => source[index % source.length],
  );
  return [...wallSegment, ...wallSegment];
});

const studioProduct = computed(
  () => products.value[selectedStudioIndex.value] || products.value[0] || null,
);

const studioThumbnails = computed(() => products.value.slice(0, 7));

const latestProducts = computed(() => {
  const latest = products.value.slice(8, 20);
  return latest.length >= 4 ? latest : products.value.slice(0, 12);
});

const collectionProducts = computed(() => {
  const collection = products.value.slice(20, 28);
  return collection.length >= 4 ? collection : products.value.slice(0, 8);
});
const processSteps = [
  ["01", "找到商品", "从品类、搜索或照片墙进入真实商品。"],
  ["02", "确定方向", "选择商品、风格和使用场景，整理成清晰需求。"],
  ["03", "完成定制", "提交项目，让一个视觉想法进入真实商品。"],
];

const platformLabels = [
  "服饰印花",
  "数码周边",
  "家居织物",
  "品牌礼赠",
  "一件起订",
  "商品打样",
  "图案延展",
  "POD 定制",
];

const formatPrice = (product: StorefrontPublishedProduct) => {
  if (!product.price) return "可定制";
  return `¥${product.price.toFixed(product.price % 1 === 0 ? 0 : 2)}`;
};
</script>

<template>
  <main class="premium-home">
    <section class="premium-hero">
      <div class="premium-hero__wall" aria-hidden="true">
        <div class="premium-hero__wall-track">
          <div
            v-for="(product, index) in photoWallProducts"
            :key="`${product.id}-${index}`"
            :class="['premium-hero__tile', `premium-hero__tile--${index % 5}`]"
          >
            <img :src="getProductImage(product, 620)" alt="" />
          </div>
        </div>
      </div>
      <div class="premium-hero__shade" aria-hidden="true"></div>

      <div class="premium-hero__content">
        <div class="premium-hero__eyebrow">
          <span>1S.DESIGN</span>
          <i></i>
          <span>POD 商品与创意定制平台</span>
        </div>
        <h1>把一个想法<br />变成一件真实商品。</h1>
        <p>
          浏览已发布的 POD
          商品，找到适合的载体，再把图案、风格和品牌想法延展成可以被使用的物品。
        </p>
        <div class="premium-hero__actions">
          <NuxtLink to="/products" class="premium-button premium-button--light">
            浏览商品
            <AppIcon name="arrow-right" :size="13" aria-hidden="true" />
          </NuxtLink>
          <NuxtLink to="/design" class="premium-button premium-button--line">
            发起定制
            <AppIcon name="palette" :size="13" aria-hidden="true" />
          </NuxtLink>
        </div>
      </div>

      <div class="premium-hero__bottom">
        <span>EXPLORE THE PRODUCT WORLD</span>
        <span>SCROLL TO DISCOVER</span>
      </div>
    </section>

    <section class="premium-section premium-discovery">
      <header class="premium-section__head">
        <div>
          <span>START WITH A PRODUCT</span>
          <h2>从一个商品开始，发现更多可能。</h2>
        </div>
        <p>
          商品是最直接的入口。先看形态，再决定设计，不用在空白画布前猜测结果。
        </p>
      </header>

      <div class="premium-tabs" role="tablist" aria-label="商品品类">
        <button
          v-for="tab in showcaseTabs"
          :key="tab.id"
          type="button"
          role="tab"
          :aria-selected="activeShowcaseTab === tab.id"
          :class="{ 'is-active': activeShowcaseTab === tab.id }"
          @click="activeShowcaseTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="premium-product-grid">
        <NuxtLink
          v-for="(product, index) in filteredShowcaseProducts"
          :key="product.id"
          :to="getPublishedProductPath(product)"
          :class="['premium-product-card', { 'is-large': index === 0 }]"
        >
          <div class="premium-product-card__media">
            <img :src="getProductImage(product, 900)" :alt="product.title" />
            <span>{{ product.type }}</span>
          </div>
          <div class="premium-product-card__meta">
            <strong>{{ product.title }}</strong>
            <small>{{ formatPrice(product) }}</small>
          </div>
        </NuxtLink>
      </div>

      <div class="premium-section__link">
        <NuxtLink to="/products">
          查看全部商品
          <AppIcon name="arrow-right" :size="13" aria-hidden="true" />
        </NuxtLink>
      </div>
    </section>

    <section class="premium-workbench">
      <div class="premium-workbench__inner">
        <header class="premium-section__head premium-section__head--light">
          <div>
            <span>THE YISHE WORKBENCH</span>
            <h2>选择一个商品，<br />让定制从可见结果开始。</h2>
          </div>
          <p>
            这里展示的是衣设商品库中的真实商品。切换缩略图，查看不同载体，再进入商品详情或提交定制需求。
          </p>
        </header>

        <div class="premium-workbench__stage">
          <div class="premium-workbench__image">
            <img
              v-if="studioProduct"
              :src="getProductImage(studioProduct, 1400)"
              :alt="studioProduct.title"
            />
            <div v-else class="premium-workbench__empty">暂无商品</div>
          </div>
          <aside class="premium-workbench__panel">
            <span>SELECTED PRODUCT</span>
            <h3>{{ studioProduct?.title || "选择一个商品" }}</h3>
            <p>
              {{
                studioProduct?.description || "从商品库中选择一个真实商品开始。"
              }}
            </p>
            <dl>
              <div>
                <dt>品类</dt>
                <dd>{{ studioProduct?.type || "POD 商品" }}</dd>
              </div>
              <div>
                <dt>价格</dt>
                <dd>
                  {{ studioProduct ? formatPrice(studioProduct) : "可定制" }}
                </dd>
              </div>
              <div>
                <dt>下一步</dt>
                <dd>查看详情 / 发起定制</dd>
              </div>
            </dl>
            <div class="premium-workbench__panel-actions">
              <NuxtLink
                v-if="studioProduct"
                :to="getPublishedProductPath(studioProduct)"
                class="premium-button premium-button--light"
              >
                查看商品
                <AppIcon name="arrow-up-right" :size="13" aria-hidden="true" />
              </NuxtLink>
              <NuxtLink
                to="/design"
                class="premium-button premium-button--dark"
              >
                提交定制
                <AppIcon name="arrow-right" :size="13" aria-hidden="true" />
              </NuxtLink>
            </div>
          </aside>
          <div class="premium-workbench__thumbs" aria-label="切换商品">
            <button
              v-for="(product, index) in studioThumbnails"
              :key="product.id"
              type="button"
              :class="{ 'is-active': selectedStudioIndex === index }"
              :aria-label="`查看 ${product.title}`"
              @click="selectedStudioIndex = index"
            >
              <img :src="getProductImage(product, 220)" :alt="product.title" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="premium-marquee" aria-label="衣设商品能力">
      <div class="premium-marquee__track">
        <span
          v-for="(label, index) in [...platformLabels, ...platformLabels]"
          :key="`${label}-${index}`"
        >
          {{ label }} <b>•</b>
        </span>
      </div>
    </section>

    <section class="premium-section premium-collections">
      <header class="premium-section__head">
        <div>
          <span>PRODUCT COLLECTIONS</span>
          <h2>从单件商品，到一组完整系列。</h2>
        </div>
        <NuxtLink to="/products" class="premium-section__head-link">
          探索全部
          <AppIcon name="arrow-right" :size="13" aria-hidden="true" />
        </NuxtLink>
      </header>

      <div class="premium-collection-grid">
        <NuxtLink
          v-for="(product, index) in collectionProducts"
          :key="product.id"
          :to="getPublishedProductPath(product)"
          :class="[
            'premium-collection-card',
            { 'is-wide': index === 0 || index === 3 },
          ]"
        >
          <img
            :src="getProductImage(product, 1000)"
            :alt="product.title"
            loading="lazy"
          />
          <div>
            <span>{{ product.type }}</span>
            <strong>{{ product.title }}</strong>
            <small>{{ formatPrice(product) }}</small>
          </div>
        </NuxtLink>
      </div>
    </section>

    <section class="premium-process">
      <div class="premium-process__inner">
        <header class="premium-section__head premium-section__head--light">
          <div>
            <span>FROM IDEA TO OBJECT</span>
            <h2>路径越简单，创意越容易落地。</h2>
          </div>
          <p>从浏览商品到提交需求，衣设把每一步都放在清楚的位置。</p>
        </header>
        <div class="premium-process__grid">
          <article v-for="step in processSteps" :key="step[0]">
            <span>{{ step[0] }}</span>
            <h3>{{ step[1] }}</h3>
            <p>{{ step[2] }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="premium-section premium-latest">
      <header class="premium-section__head">
        <div>
          <span>RECENTLY ADDED</span>
          <h2>最新商品，持续更新。</h2>
        </div>
        <NuxtLink to="/products" class="premium-section__head-link">
          查看全部商品
          <AppIcon name="arrow-right" :size="13" aria-hidden="true" />
        </NuxtLink>
      </header>
      <div class="premium-latest-grid">
        <NuxtLink
          v-for="product in latestProducts"
          :key="product.id"
          :to="getPublishedProductPath(product)"
          class="premium-latest-card"
        >
          <div>
            <img
              :src="getProductImage(product, 620)"
              :alt="product.title"
              loading="lazy"
            />
            <FavoriteButton :product-id="product.id" />
          </div>
          <strong>{{ product.title }}</strong>
          <small>{{ product.type }} · {{ formatPrice(product) }}</small>
        </NuxtLink>
      </div>
    </section>

    <section class="premium-final-cta">
      <div>
        <span>START WITH YISHE</span>
        <h2>找到商品，<br />再让想法继续发生。</h2>
      </div>
      <div>
        <p>浏览真实 POD 商品，或者把你的定制需求交给衣设。</p>
        <div>
          <NuxtLink to="/products" class="premium-button premium-button--light">
            浏览商品
            <AppIcon name="arrow-right" :size="13" aria-hidden="true" />
          </NuxtLink>
          <NuxtLink to="/design" class="premium-button premium-button--line">
            开始定制
            <AppIcon name="palette" :size="13" aria-hidden="true" />
          </NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.premium-home {
  --premium-ink: #111;
  --premium-soft: #f4f4f1;
  --premium-line: #deded9;
  overflow: hidden;
  background: #fff;
  color: var(--premium-ink);
}

.premium-hero {
  position: relative;
  min-height: min(820px, calc(100vh - 68px));
  overflow: hidden;
  color: #fff;
  isolation: isolate;
}

.premium-hero__wall,
.premium-hero__shade {
  position: absolute;
  inset: 0;
}

.premium-hero__wall {
  z-index: -2;
  overflow: hidden;
  background: #1a1a1a;
}

.premium-hero__wall-track {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  width: 100%;
  animation: premium-wall-scroll 60s linear infinite;
  will-change: transform;
}

.premium-hero__tile {
  overflow: hidden;
  aspect-ratio: 0.76;
  background: #202020;
}

.premium-hero__tile--1,
.premium-hero__tile--3 {
  transform: translateY(-15%);
}

.premium-hero__tile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.15) contrast(1.02) brightness(0.72);
}

.premium-hero__shade {
  z-index: -1;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.86),
    rgba(0, 0, 0, 0.4) 62%,
    rgba(0, 0, 0, 0.16)
  );
}

.premium-hero__content,
.premium-hero__bottom {
  position: relative;
  z-index: 1;
  width: var(--ys-container);
  margin-inline: auto;
}

.premium-hero__content {
  display: flex;
  min-height: min(720px, calc(100vh - 168px));
  flex-direction: column;
  justify-content: flex-end;
  padding: clamp(4rem, 9vh, 7rem) 0 clamp(3rem, 6vh, 5rem);
}

.premium-hero__eyebrow,
.premium-section__head > div > span,
.premium-workbench__panel > span,
.premium-final-cta > div > span {
  font-size: 0.64rem;
  font-weight: 800;
  letter-spacing: 0;
  text-transform: uppercase;
}

.premium-hero__eyebrow {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  color: rgba(255, 255, 255, 0.72);
}

.premium-hero__eyebrow i {
  width: 4px;
  height: 4px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.48);
}

.premium-hero h1 {
  max-width: 920px;
  margin: 0.85rem 0 0;
  color: #fff;
  font-size: clamp(2.8rem, 5.8vw, 5.6rem);
  font-weight: 800;
  line-height: 0.93;
}

.premium-hero__content > p {
  max-width: 560px;
  margin: 1.25rem 0 0;
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.88rem;
  line-height: 1.75;
}

.premium-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: 1.35rem;
}

.premium-button {
  display: inline-flex;
  min-height: 2.75rem;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  border: 1px solid transparent;
  border-radius: 3px;
  padding: 0 1rem;
  font-size: 0.72rem;
  font-weight: 800;
  text-decoration: none;
}

.premium-button--light {
  background: #fff;
  color: #111;
}

.premium-button--line {
  border-color: rgba(255, 255, 255, 0.48);
  background: rgba(0, 0, 0, 0.16);
  color: #fff;
}

.premium-button--dark {
  background: #111;
  color: #fff;
}

.premium-button:hover {
  transform: translateY(-2px);
}

.premium-hero__bottom {
  display: flex;
  min-height: 60px;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(255, 255, 255, 0.25);
  color: rgba(255, 255, 255, 0.56);
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0;
}

.premium-section {
  width: var(--ys-container);
  margin-inline: auto;
  padding: clamp(4rem, 8vw, 7rem) 0;
}

.premium-section__head {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(260px, 0.45fr);
  gap: clamp(1.5rem, 6vw, 6rem);
  align-items: end;
  margin-bottom: 2.2rem;
}

.premium-section__head h2 {
  max-width: 850px;
  margin: 0.6rem 0 0;
  font-size: clamp(1.9rem, 3.3vw, 3.6rem);
  font-weight: 800;
  line-height: 1.02;
}

.premium-section__head > p {
  margin: 0;
  color: #6b6b67;
  font-size: 0.8rem;
  line-height: 1.8;
}

.premium-section__head--light {
  color: #fff;
}

.premium-section__head--light > div > span {
  color: rgba(255, 255, 255, 0.58);
}

.premium-section__head--light > p {
  color: rgba(255, 255, 255, 0.62);
}

.premium-tabs {
  display: flex;
  width: max-content;
  max-width: 100%;
  gap: 0.3rem;
  overflow-x: auto;
  border-bottom: 1px solid var(--premium-line);
  padding-bottom: 0.45rem;
  scrollbar-width: none;
}

.premium-tabs::-webkit-scrollbar {
  display: none;
}

.premium-tabs button {
  min-height: 2.25rem;
  flex: 0 0 auto;
  border: 0;
  border-radius: 3px;
  background: transparent;
  color: #777;
  padding: 0 0.85rem;
  font-size: 0.7rem;
  font-weight: 800;
  cursor: pointer;
}

.premium-tabs button.is-active,
.premium-tabs button:hover {
  background: #111;
  color: #fff;
}

.premium-product-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.8rem;
  margin-top: 1.1rem;
}

.premium-product-card {
  min-width: 0;
  color: #111;
  text-decoration: none;
}

.premium-product-card.is-large {
  grid-column: span 2;
  grid-row: span 2;
}

.premium-product-card__media {
  position: relative;
  aspect-ratio: 1 / 1.03;
  overflow: hidden;
  background: #f0f0ed;
}

.premium-product-card.is-large .premium-product-card__media {
  aspect-ratio: 1 / 1.01;
}

.premium-product-card__media img,
.premium-collection-card img,
.premium-latest-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
}

.premium-product-card:hover img,
.premium-collection-card:hover img,
.premium-latest-card:hover img {
  transform: scale(1.035);
}

.premium-product-card__media > span {
  position: absolute;
  top: 0.55rem;
  left: 0.55rem;
  background: rgba(255, 255, 255, 0.92);
  padding: 0.28rem 0.4rem;
  font-size: 0.58rem;
  font-weight: 800;
}

.premium-product-card__meta {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.6rem;
  padding: 0.55rem 0.1rem 0;
}

.premium-product-card__meta strong {
  overflow: hidden;
  font-size: 0.76rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.premium-product-card__meta small {
  flex: 0 0 auto;
  color: #666;
  font-size: 0.68rem;
}

.premium-section__link,
.premium-section__head-link {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.35rem;
}

.premium-section__link a,
.premium-section__head-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: #111;
  font-size: 0.72rem;
  font-weight: 800;
  text-decoration: none;
}

.premium-workbench,
.premium-process {
  background: #151515;
  color: #fff;
}

.premium-workbench__inner,
.premium-process__inner {
  width: var(--ys-container);
  margin-inline: auto;
  padding: clamp(4rem, 8vw, 7rem) 0;
}

.premium-workbench__stage {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(300px, 0.38fr);
  gap: 0.8rem;
  min-height: 540px;
}

.premium-workbench__image {
  min-height: 540px;
  overflow: hidden;
  background: #222;
}

.premium-workbench__image img,
.premium-workbench__empty {
  width: 100%;
  height: 100%;
  min-height: 540px;
  object-fit: cover;
}

.premium-workbench__empty {
  display: grid;
  place-items: center;
  color: #777;
}

.premium-workbench__panel {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: #222;
  padding: clamp(1.2rem, 3vw, 2rem);
}

.premium-workbench__panel > span {
  color: #888;
}

.premium-workbench__panel h3 {
  margin: 0.7rem 0 0;
  font-size: clamp(1.45rem, 2.8vw, 2.65rem);
  line-height: 1.06;
}

.premium-workbench__panel > p {
  margin: 0.85rem 0 0;
  color: #aaa;
  font-size: 0.74rem;
  line-height: 1.7;
}

.premium-workbench__panel dl {
  display: grid;
  gap: 0.6rem;
  margin: 1.3rem 0 0;
  border-top: 1px solid #3c3c3c;
  padding-top: 1rem;
}

.premium-workbench__panel dl div {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.premium-workbench__panel dt,
.premium-workbench__panel dd {
  margin: 0;
  font-size: 0.68rem;
}

.premium-workbench__panel dt {
  color: #777;
}

.premium-workbench__panel dd {
  color: #eee;
  text-align: right;
}

.premium-workbench__panel-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 1.4rem;
}

.premium-workbench__thumbs {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  display: flex;
  max-width: calc(100% - 2rem);
  gap: 0.35rem;
  overflow-x: auto;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(10, 10, 10, 0.75);
  padding: 0.35rem;
  scrollbar-width: none;
}

.premium-workbench__thumbs::-webkit-scrollbar {
  display: none;
}

.premium-workbench__thumbs button {
  width: 50px;
  height: 50px;
  flex: 0 0 auto;
  overflow: hidden;
  border: 2px solid transparent;
  background: #333;
  padding: 0;
  cursor: pointer;
}

.premium-workbench__thumbs button.is-active {
  border-color: #fff;
}

.premium-workbench__thumbs img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.premium-marquee {
  overflow: hidden;
  border-bottom: 1px solid #ddd;
  background: #f1f1ef;
  padding: 1.1rem 0;
}

.premium-marquee__track {
  display: flex;
  width: max-content;
  gap: 1.4rem;
  animation: premium-marquee 28s linear infinite;
}

.premium-marquee__track span {
  color: #686862;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0;
  text-transform: uppercase;
}

.premium-marquee__track b {
  margin-left: 1.4rem;
  color: #111;
}

.premium-collection-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.8rem;
}

.premium-collection-card {
  position: relative;
  min-height: 360px;
  overflow: hidden;
  color: #fff;
  text-decoration: none;
}

.premium-collection-card.is-wide {
  grid-column: span 2;
}

.premium-collection-card::after {
  position: absolute;
  inset: 0;
  content: "";
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.74), transparent 56%);
}

.premium-collection-card > div {
  position: absolute;
  z-index: 1;
  right: 1rem;
  bottom: 1rem;
  left: 1rem;
}

.premium-collection-card span,
.premium-collection-card strong,
.premium-collection-card small {
  display: block;
}

.premium-collection-card span,
.premium-collection-card small {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.62rem;
}

.premium-collection-card strong {
  margin: 0.35rem 0;
  font-size: 1.15rem;
}

.premium-process__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  background: #3a3a3a;
}

.premium-process__grid article {
  min-height: 250px;
  background: #151515;
  padding: 1.2rem;
}

.premium-process__grid article > span {
  color: #999;
  font-size: 0.68rem;
  font-weight: 800;
}

.premium-process__grid h3 {
  margin: 6rem 0 0;
  font-size: clamp(1.3rem, 2.4vw, 2.35rem);
}

.premium-process__grid p {
  max-width: 260px;
  margin: 0.6rem 0 0;
  color: #999;
  font-size: 0.72rem;
  line-height: 1.65;
}

.premium-latest-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.1rem 0.8rem;
}

.premium-latest-card {
  min-width: 0;
  color: #111;
  text-decoration: none;
}

.premium-latest-card > div {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: #f0f0ed;
}

.premium-latest-card strong,
.premium-latest-card small {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.premium-latest-card strong {
  margin-top: 0.55rem;
  font-size: 0.76rem;
}

.premium-latest-card small {
  margin-top: 0.2rem;
  color: #777;
  font-size: 0.64rem;
}

.premium-final-cta {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 0.55fr);
  gap: 3rem;
  align-items: end;
  background: #111;
  color: #fff;
  padding: clamp(4rem, 9vw, 8rem) var(--ys-container-pad);
}

.premium-final-cta h2 {
  max-width: 820px;
  margin: 0.65rem 0 0;
  color: #fff;
  font-size: clamp(2.2rem, 4.4vw, 4.6rem);
  line-height: 0.98;
}

.premium-final-cta p {
  margin: 0;
  color: #aaa;
  font-size: 0.78rem;
  line-height: 1.7;
}

.premium-final-cta > div:last-child > div {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 1.25rem;
}

@keyframes premium-wall-scroll {
  to {
    transform: translateY(-50%);
  }
}

@keyframes premium-marquee {
  to {
    transform: translateX(-50%);
  }
}

@media (max-width: 960px) {
  .premium-product-grid,
  .premium-latest-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .premium-product-card.is-large {
    grid-column: span 2;
  }

  .premium-workbench__stage {
    grid-template-columns: 1fr;
  }

  .premium-workbench__image,
  .premium-workbench__image img,
  .premium-workbench__empty {
    min-height: 440px;
  }

  .premium-workbench__panel {
    min-height: 300px;
  }

  .premium-collection-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .premium-collection-card.is-wide {
    grid-column: auto;
  }
}

@media (max-width: 640px) {
  .premium-hero {
    min-height: 76dvh;
  }

  .premium-hero__wall-track {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .premium-hero__content {
    min-height: calc(76dvh - 68px);
    padding: 3rem 0 2rem;
  }

  .premium-hero h1 {
    font-size: clamp(2.45rem, 11vw, 3.5rem);
  }

  .premium-hero__bottom {
    min-height: 48px;
  }

  .premium-section__head,
  .premium-final-cta {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .premium-section__head h2 {
    font-size: clamp(1.8rem, 8.5vw, 2.65rem);
  }

  .premium-product-grid,
  .premium-latest-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem 0.55rem;
  }

  .premium-product-card.is-large {
    grid-column: 1 / -1;
    grid-row: auto;
  }

  .premium-product-card.is-large .premium-product-card__media {
    aspect-ratio: 1 / 0.9;
  }

  .premium-workbench__stage {
    display: flex;
    flex-direction: column;
  }

  .premium-workbench__image,
  .premium-workbench__image img,
  .premium-workbench__empty {
    min-height: 340px;
  }

  .premium-workbench__panel {
    min-height: 0;
  }

  .premium-workbench__thumbs {
    position: static;
    order: 3;
    max-width: 100%;
    margin-top: 0.5rem;
  }

  .premium-collection-grid,
  .premium-process__grid {
    grid-template-columns: 1fr;
  }

  .premium-collection-card {
    min-height: 330px;
  }

  .premium-process__grid h3 {
    margin-top: 3.5rem;
  }

  .premium-final-cta {
    padding: 4rem 1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .premium-hero__wall-track,
  .premium-marquee__track {
    animation: none;
  }
}
</style>
