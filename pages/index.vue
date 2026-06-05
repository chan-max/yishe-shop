<script lang="ts" setup>
import { computed, ref } from "vue";
import { api } from "../utils/api";
import { getPreviewImageUrl } from "../utils/image";
import { getProductPath } from "~/utils/product-url";

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
  slug?: string;
  creator?: string;
  likes?: number;
};

const featuredProducts = ref<FeaturedProduct[]>([]);
const moduleProducts = ref<Record<string, FeaturedProduct[]>>({});
const productsLoaded = ref(false);

const fallbackProducts: FeaturedProduct[] = [
  {
    id: "pod-print-series",
    title: "Botanical Print Capsule",
    description: "适合服饰、帆布包、杯具与家居布艺延展的植物印花系列。",
    category: "POD PRINT",
    type: "印花图案",
    creator: "林小溪",
    likes: 3280,
  },
  {
    id: "custom-gift-set",
    title: "Creator Gift Collection",
    description: "面向节日礼赠、品牌活动与私人纪念的定制商品企划。",
    category: "CUSTOM GIFT",
    type: "定制礼物",
    creator: "Studio W",
    likes: 2560,
  },
  {
    id: "home-textile-art",
    title: "Home Textile Art",
    description: "可延展到抱枕、挂毯、装饰画和软装织物的图案方向。",
    category: "HOME DECOR",
    type: "家居布艺",
    creator: "Artisan Lab",
    likes: 1890,
  },
  {
    id: "streetwear-drop",
    title: "Streetwear Drop",
    description: "适合 T 恤、卫衣、帽衫和潮流周边上新的视觉系列。",
    category: "APPAREL",
    type: "服饰印花",
    creator: "潮研所",
    likes: 5120,
  },
];

const categoryTiles = [
  { label: "服饰", keyword: "T恤" },
  { label: "礼赠", keyword: "杯子" },
  { label: "家居", keyword: "抱枕" },
  { label: "数码", keyword: "手机壳" },
  { label: "生活方式", keyword: "帆布包" },
];

const productFinderGroups = [
  { key: "mousepad", label: "鼠标垫", keyword: "鼠标垫", hint: "桌面办公 / 游戏周边" },
  { key: "apparel", label: "T 恤", keyword: "T恤", hint: "服饰印花 / 潮流上新" },
  { key: "hoodie", label: "卫衣", keyword: "卫衣", hint: "秋冬服饰 / 社群周边" },
  { key: "drinkware", label: "杯子", keyword: "杯子", hint: "礼赠 / 活动纪念" },
  { key: "digital", label: "手机壳", keyword: "手机壳", hint: "数码配件 / 日常风格" },
  { key: "home", label: "抱枕", keyword: "抱枕", hint: "家居软装 / 空间装饰" },
  { key: "bags", label: "帆布包", keyword: "帆布包", hint: "出行周边 / 品牌物料" },
  { key: "poster", label: "装饰画", keyword: "装饰画", hint: "墙面陈列 / 视觉作品" },
];

const homeModules = [
  {
    key: "mousepad",
    eyebrow: "DESK CULTURE",
    title: "鼠标垫与桌面灵感",
    keyword: "鼠标垫",
    text: "把插画、品牌视觉、游戏梗图或个人签名做成每天都会被看见的桌面装备。",
    href: "/products/鼠标垫",
    limit: 6,
  },
  {
    key: "apparel",
    eyebrow: "WEARABLE IDEAS",
    title: "服饰印花与潮流单品",
    keyword: "T恤",
    text: "T 恤、卫衣、帽衫和更多服饰载体，让创意成为可穿上街的个人表达。",
    href: "/products/T恤",
    limit: 6,
  },
  {
    key: "drinkware",
    eyebrow: "GIFT MOMENTS",
    title: "杯具与礼赠商品",
    keyword: "杯子",
    text: "适合节日、活动、品牌周边与私人纪念，把一句话、一张图变成有温度的礼物。",
    href: "/products/杯子",
    limit: 6,
  },
  {
    key: "home",
    eyebrow: "LIVING OBJECTS",
    title: "家居软装与生活周边",
    keyword: "抱枕",
    text: "抱枕、毯子、装饰画与居家小物，把空间变成作品的延展展厅。",
    href: "/products/抱枕",
    limit: 6,
  },
  {
    key: "digital",
    eyebrow: "DAILY TECH",
    title: "手机壳与数码配件",
    keyword: "手机壳",
    text: "让手机壳、配件与随身物件承载你的风格，也承载品牌的识别度。",
    href: "/products/手机壳",
    limit: 6,
  },
  {
    key: "bags",
    eyebrow: "CITY GOODS",
    title: "帆布包与出行周边",
    keyword: "帆布包",
    text: "把创意从屏幕带到街头，让一只包成为社群、活动和个人态度的移动媒介。",
    href: "/products/帆布包",
    limit: 6,
  },
];

const editorials = [
  {
    title: "PRINT AS PRODUCT",
    subtitle: "把每一种创意做成商品",
    href: "/products/印花",
  },
  {
    title: "CUSTOM ATELIER",
    subtitle: "私人定制，从灵感开始",
    href: "/design",
  },
  {
    title: "CREATOR WORKS",
    subtitle: "发现全球创作者的 POD 灵感",
    href: "/products",
  },
];

const heroProduct = computed(
  () => featuredProducts.value[0] || fallbackProducts[0],
);

const hasLiveProducts = computed(
  () => featuredProducts.value.length > 0 || Object.values(moduleProducts.value).some((items) => items.length > 0),
);

// 瀑布流照片墙数据
const masonryProducts = computed(() => {
  const pool = getProductPool();
  return pool.slice(0, 64);
});

const newArrivals = computed(() =>
  getProductPool().slice(
    0,
    16,
  ),
);

const runwayProducts = computed(() => {
  return getProductPool().slice(0, 8);
});

const showcaseProducts = computed(() => {
  return getProductPool().slice(0, 8);
});

const collectionProducts = computed(() => {
  return getProductPool().slice(0, 8);
});

const productUniverses = computed(() =>
  homeModules.map((module, index) => ({
    ...module,
    products: getModuleProducts(module.key, module.limit, index),
  })),
);

const productFinderItems = computed(() =>
  productFinderGroups.map((group, index) => ({
    ...group,
    href: `/products/${encodeURIComponent(group.keyword)}`,
    products: getModuleProducts(group.key, 3, index + 10),
  })),
);

const editorialPanels = computed(() =>
  editorials.map((item, index) => ({
    ...item,
    product: newArrivals.value[index + 1] || newArrivals.value[index] || heroProduct.value,
  })),
);

const journeySteps = [
  {
    title: "发现任何创意",
    text: "从插画、图案、潮流字体到品牌视觉，找到能代表你态度的商品灵感。",
  },
  {
    title: "匹配商品载体",
    text: "把创意延展到服饰、杯具、家居、数码配件、礼赠和更多 POD 商品。",
  },
  {
    title: "实现私人定制",
    text: "为个人、品牌、活动或企业礼赠提交需求，让想法进入设计与交付流程。",
  },
];

const getProductHref = (product: FeaturedProduct) =>
  product.id.startsWith("pod-") ||
  product.id.startsWith("custom-") ||
  product.id.startsWith("home-") ||
  product.id.startsWith("streetwear-")
    ? "/products"
    : getProductPath(product);

const getProductImageUrl = (product: FeaturedProduct, width = 780) => {
  if (!product.imageUrl) return "";
  return (
    getPreviewImageUrl(product.imageUrl, {
      width,
      quality: 84,
      format: "webp",
    }) || product.imageUrl
  );
};

const formatLikes = (count: number) => {
  if (count >= 10000) return `${(count / 10000).toFixed(1)}W`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
};

const shuffleProducts = (products: FeaturedProduct[], seed = 0) =>
  [...products].sort((a, b) => {
    const aScore = pseudoRandom(`${a.id}-${seed}`);
    const bScore = pseudoRandom(`${b.id}-${seed}`);
    return aScore - bScore;
  });

const pseudoRandom = (value: string) => {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(Math.sin(hash) * 10000) % 1;
};

const normalizeProducts = (products: any[], seed = 0): FeaturedProduct[] =>
  shuffleProducts(
    products.map((product: any) => {
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
        slug: product.slug || "",
        creator: product.creator || "衣设创作者",
        likes: Math.floor(pseudoRandom(`${product.id}-likes`) * 9000) + 800,
      };
    }),
    seed,
  );

const getProductPool = () => {
  const modules = Object.values(moduleProducts.value).flat();
  const products = [...modules, ...featuredProducts.value];
  const deduped = products.filter(
    (product, index, array) =>
      array.findIndex((item) => item.id === product.id) === index,
  );
  if (deduped.length) return deduped;
  return productsLoaded.value ? fallbackProducts : [];
};

const getModuleProducts = (key: string, limit: number, seed = 0) => {
  const primary = moduleProducts.value[key] || [];
  const pool = getProductPool().filter(
    (product) => !primary.some((item) => item.id === product.id),
  );
  const products = [...primary, ...shuffleProducts(pool, seed)].slice(0, limit);
  if (products.length || productsLoaded.value) return products;
  return Array.from({ length: Math.min(limit, 3) }, (_, index) => ({
    id: `${key}-loading-${index}`,
    title: "",
    category: "",
    type: "",
  }));
};

const fetchProductPage = async (params: {
  pageSize: number;
  searchText?: string;
  random?: boolean;
}) => {
  const response = await api.productList.getPage({
    page: 1,
    pageSize: params.pageSize,
    isPublish: true,
    includeRelations: false,
    random: params.random,
    searchText: params.searchText,
    search: params.searchText,
  });

  if (
    response.code === 0 ||
    response.status === true ||
    response.code === 200
  ) {
    return (response.data as any)?.list || [];
  }

  return [];
};

const fetchFeaturedProducts = async () => {
  try {
    const finderOnlyGroups = productFinderGroups.filter(
      (group) => !homeModules.some((module) => module.key === group.key),
    );
    const keywordGroups = [...homeModules, ...finderOnlyGroups];

    const [featured, ...moduleResults] = await Promise.all([
      fetchProductPage({ pageSize: 18, random: true }),
      ...keywordGroups.map((module) =>
        fetchProductPage({
          pageSize: ("limit" in module ? module.limit : 3) + 4,
          searchText: module.keyword,
          random: true,
        }),
      ),
    ]);

    featuredProducts.value = normalizeProducts(featured, 1);
    moduleProducts.value = keywordGroups.reduce<Record<string, FeaturedProduct[]>>(
      (result, module, index) => {
        result[module.key] = normalizeProducts(moduleResults[index] || [], index + 2);
        return result;
      },
      {},
    );
  } catch (error) {
    console.error("获取首页商品失败:", error);
    featuredProducts.value = [];
    moduleProducts.value = {};
  } finally {
    productsLoaded.value = true;
  }
};

await fetchFeaturedProducts();
</script>

<template>
  <main class="lux-home">
    <h1 class="sr-only">衣设 POD 印花、定制商品与创意设计开放平台</h1>

    <section class="lux-hero">
      <div class="lux-hero__masonry" aria-hidden="true">
        <div class="lux-hero__masonry-track">
          <div
            v-for="(product, index) in [...masonryProducts, ...masonryProducts]"
            :key="`${product.id}-masonry-${index}`"
            :class="['lux-masonry-item', `lux-masonry-item--${index % 4}`]"
          >
            <img
              v-if="getProductImageUrl(product, 600)"
              :src="getProductImageUrl(product, 600)"
              :alt="product.title"
              class="lux-product-image"
              loading="lazy"
            />
            <div v-else class="lux-image-skeleton"></div>
          </div>
        </div>
      </div>
      <nav class="lux-hero__nav" aria-label="首页快捷入口">
        <NuxtLink
          v-for="item in categoryTiles"
          :key="item.keyword"
          :to="`/products/${encodeURIComponent(item.keyword)}`"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
      <div class="lux-hero__brand">YISHE</div>
      <div class="lux-hero__caption">
        <span>1s.design</span>
        <h2>最大、最具创意的 POD 商品平台。</h2>
        <p>在这里发现任何灵感，把它做成服饰、礼物、家居、数码周边，或一次真正属于你的私人定制。</p>
        <div>
          <NuxtLink to="/products">发现创意商品</NuxtLink>
          <NuxtLink to="/design">开始私人定制</NuxtLink>
        </div>
      </div>
    </section>

    <section class="lux-finder" aria-label="快速查找 POD 商品">
      <div class="lux-finder__head">
        <span>Find Your Product</span>
        <h2>先选商品，再让创意落地。</h2>
        <p>首页按固定关键词抓取对应商品，结构清晰，也方便后续继续维护更多品类。</p>
      </div>
      <div class="lux-finder__grid">
        <NuxtLink
          v-for="item in productFinderItems"
          :key="item.key"
          :to="item.href"
          class="lux-finder-card"
        >
          <section>
            <span>{{ item.keyword }}</span>
            <strong>{{ item.label }}</strong>
            <small>{{ item.hint }}</small>
          </section>
          <div class="lux-finder-card__preview">
            <div
              v-for="product in item.products"
              :key="`${item.key}-${product.id}`"
            >
              <img
                v-if="getProductImageUrl(product, 260)"
                :src="getProductImageUrl(product, 260)"
                :alt="product.title"
                class="lux-product-image"
                loading="lazy"
              />
              <div v-else class="lux-image-skeleton" aria-hidden="true"></div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <section class="lux-showcase-strip" aria-label="精选商品横向展示">
      <div class="lux-showcase-strip__track">
        <NuxtLink
          v-for="(product, index) in [...showcaseProducts, ...showcaseProducts]"
          :key="`${product.id}-${index}`"
          :to="getProductHref(product)"
          class="lux-showcase-item"
        >
          <img
            v-if="getProductImageUrl(product, 520)"
            :src="getProductImageUrl(product, 520)"
            :alt="product.title"
            class="lux-product-image"
            loading="lazy"
          />
          <div v-else class="lux-image-skeleton" aria-hidden="true"></div>
          <span>{{ product.title }}</span>
        </NuxtLink>
      </div>
    </section>

    <section class="lux-feature">
      <div class="lux-feature__copy">
        <span>Selected Work</span>
        <h2>{{ heroProduct.title }}</h2>
        <p>
          {{ heroProduct.description || "从一个作品出发，延展为服饰、礼赠、家居与品牌周边，让创意拥有可被购买、可被定制的商品生命力。" }}
        </p>
        <NuxtLink :to="getProductHref(heroProduct)">查看这个创意</NuxtLink>
      </div>
      <NuxtLink :to="getProductHref(heroProduct)" class="lux-feature__media">
        <img
          v-if="getProductImageUrl(heroProduct, 980)"
          :src="getProductImageUrl(heroProduct, 980)"
          :alt="heroProduct.title"
          class="lux-product-image"
        />
        <div v-else class="lux-image-skeleton" aria-hidden="true"></div>
      </NuxtLink>
    </section>

    <section class="lux-runway" aria-label="POD 商品展示">
      <div class="lux-runway__sticky">
        <span>Product Runway</span>
        <h2>任何创意，都能找到合适的商品形态。</h2>
        <p>
          衣设把创作者作品和 POD 商品载体连接起来。你可以为自己定制一件礼物，也可以为品牌策划一整套周边系列。
        </p>
      </div>
      <div class="lux-runway__rail">
        <NuxtLink
          v-for="(product, index) in runwayProducts"
          :key="product.id"
          :to="getProductHref(product)"
          :class="[
            'lux-runway-card',
            { 'lux-runway-card--tall': index === 0, 'lux-runway-card--warm': index === 2 },
          ]"
        >
          <img
            v-if="getProductImageUrl(product, 760)"
            :src="getProductImageUrl(product, 760)"
            :alt="product.title"
            class="lux-product-image"
            loading="lazy"
          />
          <div v-else class="lux-image-skeleton" aria-hidden="true"></div>
          <span>{{ product.type || product.category }}</span>
        </NuxtLink>
      </div>
    </section>

    <section class="lux-editorials" aria-label="衣设专题">
      <NuxtLink
        v-for="item in editorialPanels"
        :key="item.title"
        :to="item.href"
        class="lux-editorial"
      >
        <img
          v-if="getProductImageUrl(item.product, 1100)"
          :src="getProductImageUrl(item.product, 1100)"
          :alt="item.product.title"
          class="lux-product-image"
          loading="lazy"
        />
        <div v-else class="lux-editorial__skeleton" aria-hidden="true"></div>
        <div>
          <span>{{ item.title }}</span>
          <strong>{{ item.subtitle }}</strong>
        </div>
      </NuxtLink>
    </section>

    <section class="lux-journey" aria-label="使用衣设的流程">
      <div class="lux-section-head">
        <span>How it unfolds</span>
        <h2>从灵感到商品，路径清晰。</h2>
      </div>
      <div class="lux-journey__grid">
        <article v-for="(step, index) in journeySteps" :key="step.title">
          <span>{{ String(index + 1).padStart(2, "0") }}</span>
          <strong>{{ step.title }}</strong>
          <p>{{ step.text }}</p>
        </article>
      </div>
    </section>

    <section class="lux-universe" aria-label="按主题探索 POD 商品">
      <div class="lux-section-head">
        <span>POD Universe</span>
        <h2>每一个主题，都有自己的商品宇宙。</h2>
      </div>
      <div class="lux-universe__grid">
        <article
          v-for="module in productUniverses"
          :key="module.key"
          class="lux-universe-block"
        >
          <div class="lux-universe-block__head">
            <span>{{ module.eyebrow }}</span>
            <h3>{{ module.title }}</h3>
            <p>{{ module.text }}</p>
            <NuxtLink :to="module.href">探索 {{ module.keyword }}</NuxtLink>
          </div>
          <div class="lux-universe-block__products">
            <NuxtLink
              v-for="product in module.products"
              :key="`${module.key}-${product.id}`"
              :to="getProductHref(product)"
              class="lux-universe-product"
            >
              <div>
                <img
                  v-if="getProductImageUrl(product, 560)"
                  :src="getProductImageUrl(product, 560)"
                  :alt="product.title"
                  class="lux-product-image"
                  loading="lazy"
                />
                <div v-else class="lux-image-skeleton" aria-hidden="true"></div>
              </div>
              <strong>{{ product.title }}</strong>
            </NuxtLink>
          </div>
        </article>
      </div>
    </section>

    <section class="lux-collection" aria-label="商品系列陈列">
      <div class="lux-collection__lead">
        <span>Product Gallery</span>
        <h2>更多商品形态，等待被你的创意点亮。</h2>
      </div>
      <div class="lux-collection__grid">
        <NuxtLink
          v-for="(product, index) in collectionProducts"
          :key="product.id"
          :to="getProductHref(product)"
          :class="['lux-collection-card', { 'is-wide': index === 0 || index === 5 }]"
        >
          <div>
            <img
              v-if="getProductImageUrl(product, 900)"
              :src="getProductImageUrl(product, 900)"
              :alt="product.title"
              class="lux-product-image"
              loading="lazy"
            />
            <div v-else class="lux-image-skeleton" aria-hidden="true"></div>
          </div>
          <section>
            <span>{{ product.type || product.category }}</span>
            <strong>{{ product.title }}</strong>
          </section>
        </NuxtLink>
      </div>
    </section>

    <section class="lux-feed">
      <div class="lux-section-head">
        <span>Community Selection</span>
        <h2>来自社区的新灵感</h2>
      </div>
      <div class="lux-product-grid">
        <NuxtLink
          v-for="product in newArrivals"
          :key="product.id"
          :to="getProductHref(product)"
          class="lux-product-card"
        >
          <div>
            <img
              v-if="getProductImageUrl(product)"
              :src="getProductImageUrl(product)"
              :alt="product.title"
              class="lux-product-image"
              loading="lazy"
            />
            <div v-else class="lux-image-skeleton" aria-hidden="true"></div>
          </div>
          <section>
            <span>{{ product.category }}</span>
            <strong>{{ product.title }}</strong>
            <small>{{ product.creator || "衣设创作者" }} · {{ formatLikes(product.likes || 0) }}</small>
          </section>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.lux-home {
  min-height: 100vh;
  background: #fff;
  color: #111;
}

.lux-hero {
  position: relative;
  display: grid;
  min-height: calc(100vh - 72px);
  overflow: hidden;
  color: #fff;
  isolation: isolate;
}

.lux-hero__masonry {
  position: absolute;
  inset: 0;
  z-index: -2;
  overflow: hidden;
}

.lux-hero__masonry-track {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 0;
  padding: 0;
  animation: lux-masonry-scroll 80s linear infinite;
  will-change: transform;
}

.lux-masonry-item {
  position: relative;
  overflow: hidden;
  background: #1a1a1a;
  border-radius: 0;
  aspect-ratio: 3 / 4;
}

.lux-masonry-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.85) contrast(0.92) brightness(0.7);
  transition: transform 0.6s ease;
}

.lux-masonry-item:hover img {
  transform: scale(1.05);
}

@keyframes lux-masonry-scroll {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}

.lux-hero::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.15) 30%, rgba(0, 0, 0, 0.25) 70%, rgba(0, 0, 0, 0.65) 100%),
    radial-gradient(circle at 50% 42%, transparent 0 35%, rgba(0, 0, 0, 0.35) 85%);
  pointer-events: none;
}

.lux-hero__nav {
  position: absolute;
  left: 50%;
  top: 1.25rem;
  display: flex;
  width: min(92vw, 760px);
  transform: translateX(-50%);
  justify-content: center;
  gap: clamp(0.75rem, 3vw, 2.4rem);
}

.lux-hero__nav a,
.lux-hero__caption a,
.lux-feature__copy a {
  color: inherit;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-decoration: underline;
  text-underline-offset: 0.35rem;
  text-transform: uppercase;
}

.lux-hero__nav a,
.lux-hero__caption a {
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.55);
}

.lux-hero__brand {
  align-self: center;
  justify-self: center;
  color: rgba(255, 255, 255, 0.94);
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(4rem, 17vw, 16rem);
  font-weight: 500;
  letter-spacing: 0.06em;
  line-height: 0.8;
  text-align: center;
  text-shadow:
    0 2px 2px rgba(0, 0, 0, 0.26),
    0 18px 54px rgba(0, 0, 0, 0.55);
  animation: lux-brand-rise 1100ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

.lux-hero__caption {
  position: absolute;
  bottom: clamp(2rem, 6vw, 4.5rem);
  left: 50%;
  width: min(92vw, 760px);
  transform: translateX(-50%);
  text-align: center;
  text-shadow:
    0 2px 8px rgba(0, 0, 0, 0.54),
    0 18px 44px rgba(0, 0, 0, 0.48);
  animation: lux-caption-rise 1100ms 180ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

.lux-hero__caption span,
.lux-feature__copy span,
.lux-section-head span,
.lux-editorial span,
.lux-product-card span {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.lux-hero__caption h2 {
  margin: 0.6rem 0 0;
  color: #fff;
  font-size: clamp(1.8rem, 4.6vw, 4.4rem);
  font-weight: 500;
  letter-spacing: 0;
  line-height: 1.05;
  text-shadow:
    0 2px 4px rgba(0, 0, 0, 0.42),
    0 14px 38px rgba(0, 0, 0, 0.56);
}

.lux-hero__caption p {
  max-width: 44rem;
  margin: 0.7rem auto 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  line-height: 1.8;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.62);
}

.lux-hero__caption div {
  display: flex;
  justify-content: center;
  gap: 1.4rem;
  margin-top: 1.05rem;
}

.lux-finder {
  width: min(var(--ys-page-max), calc(100% - var(--ys-page-gutter)));
  margin-inline: auto;
  padding: clamp(1.8rem, 4vw, 3.2rem) 0;
}

.lux-finder__head {
  display: grid;
  grid-template-columns: minmax(0, 0.58fr) minmax(280px, 0.42fr);
  gap: 1rem;
  align-items: end;
  margin-bottom: clamp(0.9rem, 2vw, 1.3rem);
}

.lux-finder__head span {
  color: #777;
  font-size: 0.68rem;
  font-weight: 850;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.lux-finder__head h2 {
  margin: 0.45rem 0 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(1.9rem, 3.4vw, 3.6rem);
  font-weight: 500;
  line-height: 1;
}

.lux-finder__head p {
  margin: 0;
  color: #666;
  font-size: 0.82rem;
  line-height: 1.75;
}

.lux-finder__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(0.55rem, 1vw, 0.85rem);
}

.lux-finder-card {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(96px, 1fr);
  min-height: 148px;
  overflow: hidden;
  background: #f4f0e8;
  color: #111;
  text-decoration: none;
  transition: transform 220ms ease, background-color 220ms ease;
}

.lux-finder-card:hover {
  transform: translateY(-4px);
  background: #ece5d8;
}

.lux-finder-card section {
  display: grid;
  align-content: end;
  min-width: 0;
  padding: 0.85rem;
}

.lux-finder-card section span {
  color: #777;
  font-size: 0.62rem;
  font-weight: 850;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.lux-finder-card section strong {
  margin-top: 0.35rem;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(1.2rem, 2vw, 1.65rem);
  font-weight: 500;
  line-height: 1;
}

.lux-finder-card section small {
  display: -webkit-box;
  margin-top: 0.45rem;
  color: #68635b;
  font-size: 0.68rem;
  line-height: 1.45;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.lux-finder-card__preview {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  min-width: 0;
  background: rgba(17, 17, 17, 0.08);
}

.lux-finder-card__preview > div {
  display: grid;
  place-items: center;
  min-width: 0;
  background: #eee9df;
}

.lux-finder-card__preview img,
.lux-finder-card__preview .lux-image-skeleton {
  width: 82%;
  max-height: 90px;
  object-fit: contain;
  transition: transform 260ms ease;
}

.lux-finder-card:hover .lux-finder-card__preview img {
  transform: translateY(-3px) scale(1.04);
}

.lux-showcase-strip {
  overflow: hidden;
  border-bottom: 1px solid #e8e3da;
  background: #fbfaf7;
  padding: 0.7rem 0;
}

.lux-showcase-strip__track {
  display: flex;
  width: max-content;
  gap: 0.65rem;
  animation: lux-product-marquee 42s linear infinite;
}

.lux-showcase-strip:hover .lux-showcase-strip__track {
  animation-play-state: paused;
}

.lux-showcase-item {
  display: grid;
  grid-template-columns: 58px minmax(120px, 160px);
  align-items: center;
  gap: 0.55rem;
  min-height: 4.2rem;
  color: #111;
  text-decoration: none;
}

.lux-showcase-item img,
.lux-showcase-item .lux-image-skeleton {
  width: 58px;
  height: 58px;
  object-fit: cover;
  background: #eee9df;
}

.lux-showcase-item span {
  display: -webkit-box;
  color: #111;
  font-size: 0.72rem;
  font-weight: 750;
  line-height: 1.35;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.lux-feature,
.lux-feed {
  width: min(var(--ys-page-max), calc(100% - var(--ys-page-gutter)));
  margin-inline: auto;
}

.lux-feature {
  display: grid;
  grid-template-columns: minmax(0, 0.72fr) minmax(340px, 1fr);
  gap: clamp(1.5rem, 4vw, 4rem);
  align-items: center;
  padding: clamp(2.4rem, 7vw, 6rem) 0;
  animation: lux-reveal linear both;
  animation-timeline: view();
  animation-range: entry 8% cover 34%;
}

.lux-feature__copy {
  max-width: 460px;
}

.lux-feature__copy h2,
.lux-section-head h2 {
  margin: 0.7rem 0 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(2rem, 5vw, 5rem);
  font-weight: 500;
  letter-spacing: 0;
  line-height: 0.96;
}

.lux-feature__copy p {
  margin: 1rem 0 1.35rem;
  color: #666;
  font-size: 0.92rem;
  line-height: 1.85;
}

.lux-feature__media {
  display: grid;
  place-items: center;
  min-height: clamp(360px, 46vw, 640px);
  overflow: hidden;
  border: 1px solid #ebe5db;
  background: #f2f0ed;
  transition: transform 420ms ease, background-color 420ms ease;
}

.lux-feature__media img {
  width: min(82%, 560px);
  max-height: 560px;
  object-fit: contain;
  filter: drop-shadow(0 28px 28px rgba(0, 0, 0, 0.12));
  transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
}

.lux-feature__media:hover {
  background: #ebe7df;
  transform: translateY(-4px);
}

.lux-feature__media:hover img {
  transform: scale(1.035) rotate(-0.6deg);
}

.lux-runway {
  display: grid;
  grid-template-columns: minmax(280px, 0.58fr) minmax(0, 1.42fr);
  gap: clamp(1.5rem, 4vw, 4rem);
  width: min(var(--ys-page-max), calc(100% - var(--ys-page-gutter)));
  margin-inline: auto;
  padding: clamp(1.5rem, 5vw, 4rem) 0 clamp(2.5rem, 7vw, 6rem);
}

.lux-runway__sticky {
  position: sticky;
  top: 6rem;
  align-self: start;
  padding-top: 0.4rem;
}

.lux-runway__sticky span {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.lux-runway__sticky h2 {
  max-width: 9ch;
  margin: 0.7rem 0 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(2.1rem, 4.5vw, 4.8rem);
  font-weight: 500;
  letter-spacing: 0;
  line-height: 0.96;
}

.lux-runway__sticky p {
  max-width: 26rem;
  margin: 1rem 0 0;
  color: #666;
  font-size: 0.9rem;
  line-height: 1.85;
}

.lux-runway__rail {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(0.55rem, 1vw, 0.85rem);
}

.lux-runway-card {
  position: relative;
  display: grid;
  place-items: center;
  min-height: clamp(220px, 20vw, 330px);
  overflow: hidden;
  border: 1px solid #ebe5db;
  background: #f2f0ed;
  color: #111;
  text-decoration: none;
  animation: lux-card-rise linear both;
  animation-timeline: view();
  animation-range: entry 8% cover 36%;
}

.lux-runway-card::after {
  content: "";
  position: absolute;
  inset: auto 0 0;
  height: 38%;
  background: linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.82));
  pointer-events: none;
}

.lux-runway-card:hover {
  border-color: #d8d0c3;
}

.lux-runway-card:nth-child(1) {
  grid-column: auto;
}

.lux-runway-card:nth-child(2),
.lux-runway-card:nth-child(3) {
  grid-column: auto;
}

.lux-runway-card:nth-child(n + 4) {
  grid-column: auto;
  min-height: clamp(220px, 20vw, 330px);
}

.lux-runway-card--tall {
  min-height: clamp(220px, 20vw, 330px);
}

.lux-runway-card--warm {
  background: #eee6dc;
}

.lux-runway-card img {
  width: min(80%, 300px);
  max-height: 70%;
  object-fit: contain;
  filter: drop-shadow(0 24px 26px rgba(0, 0, 0, 0.14));
  transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
}

.lux-runway-card span {
  position: absolute;
  z-index: 1;
  left: 0.75rem;
  bottom: 0.7rem;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.lux-runway-card:hover img {
  transform: translateY(-8px) scale(1.04);
}

.lux-product-image {
  opacity: 0;
  animation: lux-image-in 680ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.lux-image-skeleton,
.lux-editorial__skeleton {
  position: relative;
  overflow: hidden;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.64), rgba(255, 255, 255, 0.16)),
    #ede8df;
}

.lux-image-skeleton::after,
.lux-editorial__skeleton::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-120%);
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.58), transparent);
  animation: lux-skeleton-sweep 1.8s ease-in-out infinite;
}

.lux-feature__media .lux-image-skeleton,
.lux-runway-card .lux-image-skeleton {
  width: min(70%, 360px);
  aspect-ratio: 1;
}

.lux-editorials {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  background: #111;
  animation: lux-reveal linear both;
  animation-timeline: view();
  animation-range: entry 10% cover 32%;
}

.lux-editorial {
  position: relative;
  display: grid;
  min-height: clamp(380px, 38vw, 560px);
  overflow: hidden;
  color: #fff;
  text-decoration: none;
}

.lux-editorial img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 420ms ease;
}

.lux-editorial__skeleton {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #1b1a17, #4a443d);
}

.lux-editorial::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 40%, rgba(0, 0, 0, 0.45));
}

.lux-editorial:hover img {
  transform: scale(1.035);
}

.lux-editorial div {
  position: relative;
  z-index: 1;
  align-self: end;
  justify-self: center;
  width: min(86%, 360px);
  padding-bottom: clamp(1.4rem, 4vw, 3rem);
  text-align: center;
  transform: translateY(10px);
  transition: transform 360ms ease;
}

.lux-editorial:hover div {
  transform: translateY(0);
}

.lux-editorial strong {
  display: block;
  margin-top: 0.45rem;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(1.45rem, 3vw, 2.8rem);
  font-weight: 500;
  line-height: 1.04;
}

.lux-feed {
  padding: clamp(2.4rem, 7vw, 5.5rem) 0 clamp(3rem, 8vw, 6rem);
  animation: lux-reveal linear both;
  animation-timeline: view();
  animation-range: entry 8% cover 28%;
}

.lux-journey {
  width: min(var(--ys-page-max), calc(100% - var(--ys-page-gutter)));
  margin-inline: auto;
  padding: clamp(2.8rem, 7vw, 5.5rem) 0 clamp(1.2rem, 3vw, 2rem);
  animation: lux-reveal linear both;
  animation-timeline: view();
  animation-range: entry 8% cover 30%;
}

.lux-journey__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  border-block: 1px solid #e8e3da;
  background: #e8e3da;
}

.lux-journey article {
  min-height: 12rem;
  background: #fff;
  padding: clamp(1rem, 2vw, 1.35rem);
}

.lux-journey article span {
  color: #8a806c;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.lux-journey article strong {
  display: block;
  margin-top: clamp(2.2rem, 5vw, 4.4rem);
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(1.45rem, 3vw, 2.4rem);
  font-weight: 500;
  line-height: 1.05;
}

.lux-journey article p {
  max-width: 22rem;
  margin: 0.7rem 0 0;
  color: #666;
  font-size: 0.84rem;
  line-height: 1.75;
}

.lux-collection {
  width: min(var(--ys-page-max), calc(100% - var(--ys-page-gutter)));
  margin-inline: auto;
  padding: clamp(1.4rem, 4vw, 3rem) 0 clamp(2.5rem, 7vw, 5rem);
  animation: lux-reveal linear both;
  animation-timeline: view();
  animation-range: entry 8% cover 30%;
}

.lux-universe {
  padding: clamp(2.2rem, 6vw, 5rem) 0 clamp(2.4rem, 7vw, 5.5rem);
  border-top: 1px solid #e8e3da;
  border-bottom: 1px solid #e8e3da;
  background: #faf8f3;
}

.lux-universe__grid {
  display: grid;
  width: min(var(--ys-page-max), calc(100% - var(--ys-page-gutter)));
  margin-inline: auto;
  gap: clamp(0.9rem, 1.8vw, 1.2rem);
}

.lux-universe-block {
  display: grid;
  grid-template-columns: minmax(260px, 0.34fr) minmax(0, 1fr);
  min-height: 350px;
  border: 1px solid #e3ddd2;
  background: #fff;
  animation: lux-reveal linear both;
  animation-timeline: view();
  animation-range: entry 8% cover 30%;
}

.lux-universe-block:nth-child(even) {
  grid-template-columns: minmax(0, 1fr) minmax(260px, 0.34fr);
}

.lux-universe-block:nth-child(even) .lux-universe-block__head {
  order: 2;
}

.lux-universe-block__head {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: clamp(1rem, 2.2vw, 1.8rem);
  background: #111;
  color: #fff;
}

.lux-universe-block:nth-child(3n + 2) .lux-universe-block__head {
  background: #efe6d8;
  color: #111;
}

.lux-universe-block:nth-child(3n) .lux-universe-block__head {
  background: #d9ded6;
  color: #111;
}

.lux-universe-block__head span {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.lux-universe-block__head h3 {
  max-width: 11ch;
  margin: 0.65rem 0 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(1.75rem, 3vw, 3.4rem);
  font-weight: 500;
  letter-spacing: 0;
  line-height: 0.96;
}

.lux-universe-block__head p {
  max-width: 24rem;
  margin: 0.8rem 0 1rem;
  color: currentColor;
  font-size: 0.82rem;
  line-height: 1.75;
  opacity: 0.76;
}

.lux-universe-block__head a {
  color: inherit;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-decoration: underline;
  text-underline-offset: 0.35rem;
  text-transform: uppercase;
}

.lux-universe-block__products {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 1px;
  background: #e3ddd2;
}

.lux-universe-product {
  display: grid;
  align-content: space-between;
  min-height: 350px;
  background: #f3f0eb;
  color: #111;
  text-decoration: none;
  transition: background-color 260ms ease;
}

.lux-universe-product > div {
  display: grid;
  place-items: center;
  min-height: 260px;
  overflow: hidden;
}

.lux-universe-product img,
.lux-universe-product .lux-image-skeleton {
  width: min(78%, 190px);
  max-height: 210px;
  object-fit: contain;
  filter: drop-shadow(0 20px 22px rgba(0, 0, 0, 0.12));
  transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
}

.lux-universe-product strong {
  display: -webkit-box;
  min-height: 2.8rem;
  padding: 0 0.7rem 0.72rem;
  font-size: 0.76rem;
  line-height: 1.35;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.lux-universe-product:hover {
  background: #ebe6de;
}

.lux-universe-product:hover img {
  transform: translateY(-8px) scale(1.04);
}

.lux-collection__lead {
  display: grid;
  max-width: 720px;
  margin: 0 auto clamp(1rem, 2.6vw, 1.8rem);
  text-align: center;
}

.lux-collection__lead span {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.lux-collection__lead h2 {
  margin: 0.65rem 0 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(2rem, 4vw, 4rem);
  font-weight: 500;
  line-height: 1;
}

.lux-collection__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(0.55rem, 1vw, 0.85rem);
}

.lux-collection-card {
  color: #111;
  text-decoration: none;
  animation: lux-card-rise linear both;
  animation-timeline: view();
  animation-range: entry 5% cover 28%;
}

.lux-collection-card.is-wide {
  grid-column: auto;
}

.lux-collection-card > div {
  display: grid;
  place-items: center;
  aspect-ratio: 0.9;
  overflow: hidden;
  border: 1px solid #ebe5db;
  background: #f2f0ed;
  transition: border-color 260ms ease, background-color 260ms ease;
}

.lux-collection-card.is-wide > div {
  aspect-ratio: 0.92;
}

.lux-collection-card img,
.lux-collection-card .lux-image-skeleton {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 360ms ease;
}

.lux-collection-card:hover img {
  transform: scale(1.035);
}

.lux-collection-card:hover > div {
  border-color: #d8d0c3;
  background: #ebe7df;
}

.lux-collection-card section {
  display: grid;
  gap: 0.2rem;
  padding-top: 0.5rem;
}

.lux-collection-card span {
  color: #777;
  font-size: 0.66rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.lux-collection-card strong {
  font-size: 0.86rem;
  line-height: 1.35;
}

.lux-section-head {
  margin-bottom: 1.1rem;
  text-align: center;
}

.lux-section-head h2 {
  font-size: clamp(2rem, 4vw, 3.6rem);
}

.lux-product-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: clamp(0.55rem, 1vw, 0.85rem);
}

.lux-product-card {
  color: #111;
  text-decoration: none;
  animation: lux-card-rise linear both;
  animation-timeline: view();
  animation-range: entry 5% cover 25%;
}

.lux-product-card > div {
  display: grid;
  place-items: center;
  aspect-ratio: 0.9;
  overflow: hidden;
  border: 1px solid #ebe5db;
  background: #f2f0ed;
  transition: border-color 260ms ease, background-color 300ms ease;
}

.lux-product-card img,
.lux-product-card .lux-image-skeleton {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 300ms ease;
}

.lux-product-card .lux-image-skeleton {
  border: 0;
  border-radius: 0;
}

.lux-product-card:hover img {
  transform: scale(1.03);
}

.lux-product-card:hover > div {
  border-color: #d8d0c3;
  background: #ebe7df;
}

.lux-product-card section {
  display: grid;
  gap: 0.22rem;
  padding: 0.55rem 0.05rem 0;
}

.lux-product-card strong {
  font-size: 0.82rem;
  line-height: 1.35;
}

.lux-product-card small {
  color: #777;
  font-size: 0.66rem;
}

@media (max-width: 980px) {
  .lux-hero__masonry-track {
    grid-template-columns: repeat(6, 1fr);
  }

  .lux-feature,
  .lux-runway,
  .lux-editorials,
  .lux-journey__grid,
  .lux-finder__head,
  .lux-universe-block,
  .lux-universe-block:nth-child(even),
  .lux-collection__grid,
  .lux-product-grid {
    grid-template-columns: 1fr 1fr;
  }

  .lux-universe-block,
  .lux-universe-block:nth-child(even) {
    grid-template-columns: 1fr;
  }

  .lux-universe-block:nth-child(even) .lux-universe-block__head {
    order: 0;
  }

  .lux-universe-block__products {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .lux-runway__rail {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .lux-runway-card,
  .lux-runway-card:nth-child(1),
  .lux-runway-card:nth-child(2),
  .lux-runway-card:nth-child(3),
  .lux-runway-card:nth-child(n + 4) {
    grid-column: auto;
    min-height: 280px;
  }

  .lux-product-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .lux-finder__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .lux-feature__copy,
  .lux-runway__sticky {
    grid-column: 1 / -1;
    max-width: 680px;
    text-align: center;
    margin-inline: auto;
  }

  .lux-runway__sticky {
    position: static;
  }

  .lux-runway__sticky h2,
  .lux-runway__sticky p {
    margin-inline: auto;
  }
}

@media (max-width: 640px) {
  .lux-hero {
    min-height: 86vh;
  }

  .lux-hero__masonry-track {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(24px, auto);
  }

  .lux-hero__nav {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 0.25rem;
  }

  .lux-hero__nav a {
    flex: 0 0 auto;
  }

  .lux-hero__caption div {
    flex-direction: column;
    gap: 0.7rem;
  }

  .lux-feature,
  .lux-runway,
  .lux-runway__rail,
  .lux-editorials,
  .lux-journey__grid,
  .lux-finder__head,
  .lux-finder__grid,
  .lux-universe-block,
  .lux-universe-block__products,
  .lux-collection__grid,
  .lux-product-grid {
    grid-template-columns: 1fr;
  }

  .lux-showcase-item {
    grid-template-columns: 64px 150px;
  }

  .lux-finder-card {
    grid-template-columns: minmax(0, 0.82fr) minmax(110px, 1fr);
  }

  .lux-showcase-item img,
  .lux-showcase-item .lux-image-skeleton {
    width: 64px;
    height: 64px;
  }

  .lux-editorial {
    min-height: 420px;
  }

  .lux-runway-card,
  .lux-runway-card--tall {
    min-height: 320px;
  }

  .lux-journey article {
    min-height: 11rem;
  }

  .lux-journey article strong {
    margin-top: 1.6rem;
  }

  .lux-universe-block,
  .lux-universe-product {
    min-height: 0;
  }

  .lux-universe-product > div {
    min-height: 300px;
  }

  .lux-collection-card.is-wide {
    grid-column: auto;
  }

  .lux-collection-card.is-wide > div {
    aspect-ratio: 1;
  }
}

@keyframes lux-hero-drift {
  from {
    transform: scale(1.02) translateY(0);
  }
  to {
    transform: scale(1.06) translateY(-1.2%);
  }
}

@keyframes lux-brand-rise {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes lux-caption-rise {
  from {
    opacity: 0;
    transform: translate(-50%, 18px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

@keyframes lux-reveal {
  from {
    opacity: 0.35;
    transform: translateY(42px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes lux-card-rise {
  from {
    opacity: 0.28;
    transform: translateY(34px) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes lux-product-marquee {
  to {
    transform: translateX(-50%);
  }
}

@keyframes lux-image-in {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes lux-skeleton-sweep {
  to {
    transform: translateX(120%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .lux-hero__bg,
  .lux-hero__brand,
  .lux-hero__caption,
  .lux-feature,
  .lux-editorials,
  .lux-feed,
  .lux-collection,
  .lux-universe-block,
  .lux-finder-card,
  .lux-showcase-strip__track,
  .lux-runway-card,
  .lux-universe-product,
  .lux-collection-card,
  .lux-product-card {
    animation: none;
  }

  .lux-image-skeleton::after,
  .lux-editorial__skeleton::after {
    animation: none;
  }

  .lux-feature__media,
  .lux-feature__media img,
  .lux-editorial img,
  .lux-editorial div,
  .lux-runway-card img,
  .lux-universe-product img,
  .lux-finder-card__preview img,
  .lux-collection-card img,
  .lux-product-card img {
    transition: none;
  }
}
</style>
