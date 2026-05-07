<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { api } from "../../utils/api";
import { getPreviewImageUrl } from "../../utils/image";
import {
  SITE_DEFAULT_IMAGE,
  SITE_KEYWORDS,
  SITE_ORGANIZATION_NAME,
  SITE_URL,
} from "../../utils/seo";

definePageMeta({ layout: "page" });

const route = useRoute();
const router = useRouter();

const getDecodedKeyword = () => {
  const keyword = route.params.keyword;
  const keywordValue = Array.isArray(keyword) ? keyword[0] : keyword;
  if (!keywordValue || typeof keywordValue !== "string") return "";
  try {
    return decodeURIComponent(keywordValue);
  } catch {
    return keywordValue;
  }
};

const searchKeyword = ref<string>("");
const startDate = ref<string>("");
const endDate = ref<string>("");
const currentPage = ref<number>(1);
const pageSize = ref<number>(24);
const loading = ref<boolean>(false);
const productList = ref<any[]>([]);
const total = ref<number>(0);
const requestSequence = ref<number>(0);

const recommendedKeywords = [
  "印花",
  "创意设计",
  "T恤",
  "礼物",
  "家居",
  "鼠标垫",
];

const filterCategories = ["T-shirts", "Hoodies", "Mugs", "Tote Bags", "Phone Cases", "Home Textile"];
const colorOptions = ["#4f4631", "#315f3d", "#314d80", "#111111", "#ef4444", "#f8d84a", "#f4f4f5", "#f472b6"];
const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL", "One Size"];
const styleOptions = ["Minimal", "Streetwear", "Vintage", "Floral", "Oriental"];

const filterGroups = [
  {
    title: "商品方向",
    items: ["T恤", "卫衣", "鼠标垫", "装饰画", "抱枕", "帆布包"],
  },
  {
    title: "设计风格",
    items: ["印花", "极简", "复古", "国潮", "插画", "轻奢"],
  },
  {
    title: "使用场景",
    items: ["礼物", "办公用品", "家居装饰", "情侣礼物", "节日礼物"],
  },
];
const showFilters = ref<boolean>(false);

const routeKeyword = computed(() => getDecodedKeyword());

const syncStateFromRoute = () => {
  searchKeyword.value = routeKeyword.value || "";
  const query = route.query;
  startDate.value = typeof query.start === "string" ? query.start : "";
  endDate.value = typeof query.end === "string" ? query.end : "";
  currentPage.value =
    typeof query.page === "string" ? Number(query.page) || 1 : 1;
};

const fetchProducts = async () => {
  const requestId = requestSequence.value + 1;
  requestSequence.value = requestId;
  loading.value = true;

  try {
    const response = await api.productList.getPage({
      page: currentPage.value,
      pageSize: pageSize.value,
      isPublish: true,
      includeRelations: false,
      searchText: searchKeyword.value || undefined,
      startTime: startDate.value || undefined,
      endTime: endDate.value || undefined,
    });

    if (requestId !== requestSequence.value) return;

    if (
      response.code === 0 ||
      response.status === true ||
      response.code === 200
    ) {
      const data = response.data as { list?: any[]; total?: number };
      productList.value = data?.list || [];
      total.value = data?.total || 0;
    } else {
      productList.value = [];
      total.value = 0;
    }
  } catch (error) {
    console.error("获取商品列表失败:", error);
    if (requestId === requestSequence.value) {
      productList.value = [];
      total.value = 0;
    }
  } finally {
    if (requestId === requestSequence.value) loading.value = false;
  }
};

const buildRouteQuery = () => {
  const query: Record<string, string> = {};
  if (startDate.value) query.start = startDate.value;
  if (endDate.value) query.end = endDate.value;
  if (currentPage.value > 1) query.page = String(currentPage.value);
  return query;
};

const hasSameQuery = (nextQuery: Record<string, string>) => {
  const currentQuery: Record<string, string> = {};
  if (typeof route.query.start === "string" && route.query.start) {
    currentQuery.start = route.query.start;
  }
  if (typeof route.query.end === "string" && route.query.end) {
    currentQuery.end = route.query.end;
  }
  if (typeof route.query.page === "string" && Number(route.query.page) > 1) {
    currentQuery.page = route.query.page;
  }
  return JSON.stringify(currentQuery) === JSON.stringify(nextQuery);
};

const navigateWithFilters = async () => {
  const keyword = searchKeyword.value.trim();
  const nextPath = keyword
    ? `/products/${encodeURIComponent(keyword)}`
    : "/products";
  const nextQuery = buildRouteQuery();

  if (route.path === nextPath && hasSameQuery(nextQuery)) {
    await fetchProducts();
    return false;
  }

  await router.push({ path: nextPath, query: nextQuery });
  return true;
};

const handleSearch = async () => {
  currentPage.value = 1;
  await navigateWithFilters();
};

const resetFilters = async () => {
  searchKeyword.value = "";
  startDate.value = "";
  endDate.value = "";
  currentPage.value = 1;

  if (
    route.path === "/products" &&
    typeof route.query.start !== "string" &&
    typeof route.query.end !== "string" &&
    typeof route.query.page !== "string"
  ) {
    await fetchProducts();
    return;
  }

  await router.push("/products");
};

const handlePageChange = async (page: number) => {
  currentPage.value = page;
  await navigateWithFilters();
  if (process.client) window.scrollTo({ top: 0, behavior: "smooth" });
};

const handleKeywordClick = (keyword: string) => {
  searchKeyword.value = keyword;
  handleSearch();
};

const toggleFilters = () => {
  showFilters.value = !showFilters.value;
};

const goToProductDetail = (productId: string) => {
  navigateTo(`/product/${productId}`);
};

const getProductImage = (product: any) => {
  if (!product) return null;
  if (Array.isArray(product.images) && product.images.length > 0) {
    const validImage = product.images.find(
      (img: any) =>
        img &&
        typeof img === "string" &&
        img.trim() !== "" &&
        img.startsWith("http"),
    );
    if (validImage) return validImage;
  }
  return null;
};

const handleImageError = (event: Event, product: any) => {
  const img = event.target as HTMLImageElement;
  console.warn("图片加载失败:", img.src, "商品ID:", product?.id);
  img.style.opacity = "0";
  const loadingEl = img.parentElement?.querySelector(
    ".img-loading",
  ) as HTMLElement | null;
  if (loadingEl) loadingEl.style.display = "none";
  const parent = img.parentElement;
  if (parent) {
    const placeholder = parent.querySelector(
      ".image-placeholder",
    ) as HTMLElement;
    if (placeholder) placeholder.style.display = "flex";
  }
};

const handleImageLoad = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.style.opacity = "1";
  const loadingEl = img.parentElement?.querySelector(
    ".img-loading",
  ) as HTMLElement | null;
  if (loadingEl) loadingEl.style.display = "none";
  const parent = img.parentElement;
  if (parent) {
    const placeholder = parent.querySelector(
      ".image-placeholder",
    ) as HTMLElement;
    if (placeholder) placeholder.style.display = "none";
  }
};

const totalPages = computed(() => Math.ceil(total.value / pageSize.value));

const pageNumbers = computed(() => {
  const pages: number[] = [];
  const maxPages = 7;
  const current = currentPage.value;
  const totalCount = totalPages.value;

  if (totalCount <= maxPages) {
    for (let i = 1; i <= totalCount; i += 1) pages.push(i);
  } else {
    let start = Math.max(1, current - Math.floor(maxPages / 2));
    let end = Math.min(totalCount, start + maxPages - 1);
    if (end - start < maxPages - 1) start = Math.max(1, end - maxPages + 1);
    for (let i = start; i <= end; i += 1) pages.push(i);
  }
  return pages;
});

const pageTitle = computed(() => {
  return routeKeyword.value
    ? `${routeKeyword.value} POD 设计与定制商品灵感 - 衣设`
    : "POD 印花商品与定制设计灵感 - 衣设";
});

const pageDescription = computed(() => {
  return routeKeyword.value
    ? `浏览衣设中与“${routeKeyword.value}”相关的 POD 图案、印花商品、定制周边和创意设计灵感。`
    : "发现适合服饰印花、礼品周边、家居布艺和私人定制的 POD 商品设计灵感。";
});

const pageKeywords = computed(() => {
  const baseKeywords = `POD商品,印花设计,定制商品,私人定制,图案素材,服装印花,设计灵感,${SITE_KEYWORDS}`;
  return routeKeyword.value
    ? `${routeKeyword.value},${baseKeywords}`
    : baseKeywords;
});

const resultSummary = computed(() => {
  if (loading.value) return "正在加载当前筛选下的 POD 设计资源";
  if (routeKeyword.value) {
    return `${total.value} 个与“${routeKeyword.value}”相关的商品`;
  }
  return `${total.value} 个 POD 商品`;
});

const displayRange = computed(() => {
  if (!total.value || !productList.value.length) return "0-0";
  const start = (currentPage.value - 1) * pageSize.value + 1;
  const end = Math.min(start + productList.value.length - 1, total.value);
  return `${start}-${end}`;
});

const extractProductKeywords = (product: any) => {
  const raw = [product?.type, product?.tags, product?.keywords, product?.searchKeywords]
    .filter(Boolean)
    .join(",");
  return raw
    .split(/[,，、;；\n\r\t|/]+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 3);
};

const productMetaLine = (product: any) => {
  const tags = extractProductKeywords(product);
  if (tags.length) return tags.join(" / ");
  return product?.type || "POD Custom";
};

const getProductPrice = (product: any, index = 0) => {
  const seed = Number(String(product?.id || index).replace(/\D/g, "").slice(-2)) || index + 11;
  return 99 + (seed % 9) * 20;
};

const getProductOldPrice = (product: any, index = 0) => {
  const price = getProductPrice(product, index);
  return index % 3 === 0 ? price + 60 : null;
};

const getProductDiscount = (product: any, index = 0) => {
  const oldPrice = getProductOldPrice(product, index);
  if (!oldPrice) return "";
  return `-${Math.round(((oldPrice - getProductPrice(product, index)) / oldPrice) * 100)}%`;
};

const getProductRating = (index = 0) => (4.2 + (index % 7) * 0.1).toFixed(1);

const activeFilters = computed(() => {
  const filters: string[] = [];
  if (routeKeyword.value) filters.push(`关键词 ${routeKeyword.value}`);
  if (startDate.value) filters.push(`开始 ${startDate.value}`);
  if (endDate.value) filters.push(`结束 ${endDate.value}`);
  return filters;
});

const robotsValue = computed(() =>
  startDate.value || endDate.value || currentPage.value > 1
    ? "noindex, follow, max-image-preview:large"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
);

const canonicalUrl = computed(() => {
  const path = routeKeyword.value
    ? `/products/${encodeURIComponent(routeKeyword.value)}`
    : "/products";
  const query = new URLSearchParams();

  if (startDate.value) query.set("start", startDate.value);
  if (endDate.value) query.set("end", endDate.value);
  if (currentPage.value > 1) query.set("page", String(currentPage.value));

  const queryString = query.toString();
  return `${SITE_URL}${path}${queryString ? `?${queryString}` : ""}`;
});

const collectionStructuredData = computed(() => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: pageTitle.value,
  description: pageDescription.value,
  url: canonicalUrl.value,
  inLanguage: "zh-CN",
  isPartOf: {
    "@type": "WebSite",
    name: SITE_ORGANIZATION_NAME,
    url: SITE_URL,
  },
  about: routeKeyword.value || "衣设商品与设计内容",
  numberOfItems: total.value,
}));
const collectionStructuredDataJson = computed(() =>
  JSON.stringify(collectionStructuredData.value),
);

useSeoMeta({
  title: () => pageTitle.value,
  description: () => pageDescription.value,
  keywords: () => pageKeywords.value,
  ogTitle: () => pageTitle.value,
  ogDescription: () => pageDescription.value,
  ogUrl: () => canonicalUrl.value,
  ogType: "website",
  ogImage: SITE_DEFAULT_IMAGE,
  ogSiteName: SITE_ORGANIZATION_NAME,
  ogLocale: "zh_CN",
  twitterCard: "summary_large_image",
  twitterTitle: () => pageTitle.value,
  twitterDescription: () => pageDescription.value,
  twitterImage: SITE_DEFAULT_IMAGE,
  robots: () => robotsValue.value,
});

useHead({
  link: [{ rel: "canonical", href: canonicalUrl }],
  script: [
    {
      type: "application/ld+json",
      children: collectionStructuredDataJson,
    },
  ],
});

watch(
  () => [
    Array.isArray(route.params.keyword)
      ? route.params.keyword.join("/")
      : route.params.keyword || "",
    typeof route.query.start === "string" ? route.query.start : "",
    typeof route.query.end === "string" ? route.query.end : "",
    typeof route.query.page === "string" ? route.query.page : "",
  ],
  async () => {
    syncStateFromRoute();
    await fetchProducts();
  },
  { immediate: false },
);

syncStateFromRoute();
await fetchProducts();
</script>

<template>
  <div class="catalog-page">
    <h1 class="sr-only">{{ pageTitle }}</h1>

    <nav class="catalog-breadcrumb" aria-label="面包屑导航">
      <NuxtLink to="/">首页</NuxtLink>
      <v-icon size="14">mdi-chevron-right</v-icon>
      <span>{{ routeKeyword || "POD 商品" }}</span>
    </nav>

    <section class="catalog-toolbar" aria-label="商品搜索和结果状态">
      <div>
        <h2>{{ routeKeyword || "POD 商品" }}</h2>
        <span>显示 {{ displayRange }} / 共 {{ total }} 个商品</span>
      </div>
      <div class="catalog-toolbar__actions">
        <form class="catalog-search" @submit.prevent="handleSearch">
          <v-icon size="16">mdi-magnify</v-icon>
          <input
            v-model="searchKeyword"
            type="search"
            placeholder="搜索 POD 商品…"
          />
        </form>
        <span class="catalog-sort">排序：<strong>最热门</strong></span>
        <button type="button" class="catalog-filter-toggle" @click="toggleFilters">
          <v-icon size="15">mdi-tune-variant</v-icon>
          筛选
        </button>
      </div>
    </section>

    <section class="catalog-layout">
      <aside class="catalog-filter catalog-filter--desktop">
        <div class="catalog-filter__head">
          <strong>筛选</strong>
          <button type="button" aria-label="清空筛选" @click="resetFilters">
            <v-icon size="16">mdi-tune-variant</v-icon>
          </button>
        </div>

        <div class="catalog-filter__block">
          <button
            v-for="item in filterCategories"
            :key="item"
            type="button"
            class="catalog-filter__item catalog-filter__item--category"
            @click="handleKeywordClick(item)"
          >
            <span>{{ item }}</span>
            <v-icon size="14">mdi-chevron-right</v-icon>
          </button>
        </div>

        <div class="catalog-filter__block">
          <label>价格</label>
          <div class="catalog-price-range">
            <span></span>
            <i></i>
          </div>
          <div class="catalog-price-labels">
            <span>¥99</span>
            <span>¥399</span>
          </div>
        </div>

        <div
          v-for="group in filterGroups"
          :key="group.title"
          class="catalog-filter__block"
        >
          <label>{{ group.title }}</label>
          <button
            v-for="item in group.items"
            :key="item"
            type="button"
            class="catalog-filter__item"
            :class="{ active: searchKeyword === item || routeKeyword === item }"
            @click="handleKeywordClick(item)"
          >
            <span>{{ item }}</span>
            <v-icon size="14">mdi-chevron-right</v-icon>
          </button>
        </div>

        <div class="catalog-filter__block">
          <label>颜色</label>
          <div class="catalog-color-list">
            <button
              v-for="color in colorOptions"
              :key="color"
              type="button"
              :style="{ backgroundColor: color }"
              :aria-label="`颜色 ${color}`"
            >
              <v-icon v-if="color === '#111111'" size="12">mdi-check</v-icon>
            </button>
          </div>
        </div>

        <div class="catalog-filter__block">
          <label>尺码</label>
          <div class="catalog-size-list">
            <button v-for="size in sizeOptions" :key="size" type="button">
              {{ size }}
            </button>
          </div>
        </div>

        <div class="catalog-filter__block">
          <label>风格</label>
          <button
            v-for="item in styleOptions"
            :key="item"
            type="button"
            class="catalog-filter__item catalog-filter__item--category"
            @click="handleKeywordClick(item)"
          >
            <span>{{ item }}</span>
            <v-icon size="14">mdi-chevron-right</v-icon>
          </button>
        </div>

        <button type="button" class="catalog-apply" @click="handleSearch">
          应用筛选
        </button>
      </aside>

      <div class="catalog-results">
        <div v-if="activeFilters.length" class="catalog-active-filters">
          <span v-for="filter in activeFilters" :key="filter">{{ filter }}</span>
        </div>

        <div v-if="loading" class="catalog-grid">
          <div v-for="i in 12" :key="i" class="product-skeleton">
            <div class="skeleton-wave skeleton-image"></div>
            <div class="skeleton-wave skeleton-line"></div>
            <div class="skeleton-wave skeleton-line skeleton-line--short"></div>
          </div>
        </div>

        <div v-else-if="productList.length > 0" class="catalog-grid">
          <NuxtLink
            v-for="(product, index) in productList"
            :key="product.id"
            :to="`/product/${product.id}`"
            class="catalog-product"
          >
            <div class="catalog-product__media">
              <template v-if="getProductImage(product)">
                <div class="img-loading"></div>
                <img
                  :src="
                    getPreviewImageUrl(getProductImage(product), {
                      width: 620,
                      quality: 82,
                      format: 'webp',
                    }) || undefined
                  "
                  :alt="product.name || 'POD 定制商品图片'"
                  loading="lazy"
                  @error="handleImageError($event, product)"
                  @load="handleImageLoad"
                />
                <div class="image-placeholder">暂无预览图</div>
              </template>
              <div v-else class="catalog-product__empty">暂无预览图</div>
              <span class="catalog-product__open" aria-hidden="true">
                <v-icon size="17">mdi-arrow-top-right</v-icon>
              </span>
            </div>
            <div class="catalog-product__body">
              <h3>{{ product.name }}</h3>
              <div class="catalog-rating-line">
                <span>★★★★★</span>
                <small>{{ getProductRating(index) }}/5</small>
              </div>
              <div class="catalog-product__footer">
                <strong>¥{{ getProductPrice(product, index) }}</strong>
                <del v-if="getProductOldPrice(product, index)">¥{{ getProductOldPrice(product, index) }}</del>
                <small v-if="getProductDiscount(product, index)">
                  {{ getProductDiscount(product, index) }}
                </small>
              </div>
              <p>{{ productMetaLine(product) }}</p>
            </div>
          </NuxtLink>
        </div>

        <div v-else class="catalog-empty">
          <span>暂无结果</span>
          <h2>换一个关键词，可能会遇到更合适的设计。</h2>
          <p>
            试试“印花”“礼物”“鼠标垫”“装饰画”这类商品或场景词，系统会展示对应的 POD 商品与定制灵感。
          </p>
          <button type="button" @click="resetFilters">查看全部商品</button>
        </div>

        <nav
          v-if="!loading && totalPages > 1 && productList.length > 0"
          class="catalog-pagination"
          aria-label="商品分页"
        >
          <button
            type="button"
            :disabled="currentPage === 1"
            @click="handlePageChange(currentPage - 1)"
          >
            <v-icon size="16">mdi-arrow-left</v-icon>
            上一页
          </button>
          <button
            v-if="pageNumbers[0] > 1"
            type="button"
            @click="handlePageChange(1)"
          >
            1
          </button>
          <span v-if="pageNumbers[0] > 2">...</span>
          <button
            v-for="page in pageNumbers"
            :key="page"
            type="button"
            :class="{ active: currentPage === page }"
            @click="handlePageChange(page)"
          >
            {{ page }}
          </button>
          <span v-if="pageNumbers[pageNumbers.length - 1] < totalPages - 1"
            >...</span
          >
          <button
            v-if="pageNumbers[pageNumbers.length - 1] < totalPages"
            type="button"
            @click="handlePageChange(totalPages)"
          >
            {{ totalPages }}
          </button>
          <button
            type="button"
            :disabled="currentPage === totalPages"
            @click="handlePageChange(currentPage + 1)"
          >
            下一页
            <v-icon size="16">mdi-arrow-right</v-icon>
          </button>
        </nav>
      </div>
    </section>

    <Transition name="catalog-drawer">
      <div v-if="showFilters" class="catalog-drawer" @click="toggleFilters">
        <aside class="catalog-drawer__panel" @click.stop>
          <div class="catalog-filter__head">
            <strong>筛选</strong>
            <button type="button" @click="toggleFilters">关闭</button>
          </div>
          <form class="catalog-search catalog-search--drawer" @submit.prevent="handleSearch">
            <v-icon size="16">mdi-magnify</v-icon>
            <input v-model="searchKeyword" type="search" placeholder="搜索商品…" />
          </form>
          <div class="catalog-filter__block">
            <label>上新时间</label>
            <input v-model="startDate" type="date" @change="handleSearch" />
            <input v-model="endDate" type="date" @change="handleSearch" />
          </div>
          <div
            v-for="group in filterGroups"
            :key="group.title"
            class="catalog-filter__block"
          >
            <label>{{ group.title }}</label>
            <button
              v-for="item in group.items"
              :key="item"
              type="button"
              class="catalog-filter__item"
              @click="handleKeywordClick(item)"
            >
              <span>{{ item }}</span>
              <v-icon size="15">mdi-chevron-right</v-icon>
            </button>
          </div>
          <button type="button" class="catalog-drawer__apply" @click="toggleFilters">
            应用筛选
          </button>
        </aside>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.catalog-page {
  min-height: 100vh;
  background: #ffffff;
  color: #111111;
  padding: 1rem 0 3.5rem;
}

.catalog-breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  width: var(--ys-container);
  min-height: 2rem;
  margin: 0 auto 0.75rem;
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.78rem;
}

.catalog-breadcrumb a {
  color: rgba(0, 0, 0, 0.6);
  text-decoration: none;
}

.catalog-breadcrumb span {
  color: #111;
}

.catalog-search {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: min(28vw, 300px);
  min-height: 2.4rem;
  padding: 0 0.75rem;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  background: #fafafa;
  line-height: 1;
}

.catalog-search:focus-within {
  border-color: rgba(0, 0, 0, 0.2);
  background: #fff;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.04);
}

.catalog-search input {
  min-width: 0;
  width: 100%;
  height: 2.4rem;
  border: 0;
  outline: 0;
  background: transparent;
  color: #111;
  font-size: 0.8rem;
  line-height: normal;
  padding: 0;
}

.catalog-search input::placeholder {
  color: rgba(0, 0, 0, 0.35);
}

.catalog-search input:focus-visible {
  box-shadow: none;
}

.catalog-search button,
.catalog-empty button,
.catalog-drawer__apply,
.catalog-apply {
  min-height: 2.4rem;
  border: 0;
  border-radius: 8px;
  background: #000;
  color: #fff;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0 1rem;
}

.catalog-quick,
.catalog-active-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: 1rem;
}

.catalog-quick button,
.catalog-active-filters span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 1.6rem;
  border: 1px solid #ececec;
  border-radius: 6px;
  background: #fff;
  color: #333;
  font-size: 0.7rem;
  line-height: 1;
  padding: 0 0.65rem;
}

.catalog-quick button:hover {
  border-color: #111;
  background: #111;
  color: #fff;
}

.catalog-toolbar,
.catalog-layout {
  width: var(--ys-container) !important;
  max-width: var(--ys-page-max) !important;
  margin-inline: auto;
}

.catalog-toolbar {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid #efefef;
  background: #fff;
}

.catalog-toolbar h2 {
  margin: 0 0 0.2rem;
  color: #000;
  font-size: clamp(1.1rem, 2.2vw, 1.5rem);
  line-height: 1.1;
}

.catalog-toolbar span {
  color: #777;
  font-size: 0.7rem;
}

.catalog-toolbar strong {
  display: block;
  margin-top: 0.08rem;
  color: #111;
  font-size: 0.82rem;
}

.catalog-toolbar__actions {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.catalog-sort {
  display: inline-flex;
  align-items: center;
  min-height: 2rem;
  white-space: nowrap;
  line-height: 1;
  font-size: 0.75rem;
}

.catalog-sort strong {
  display: inline;
  color: #111;
  font-size: inherit;
}

.catalog-filter-toggle,
.catalog-reset,
.catalog-filter__head button,
.catalog-pagination button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  min-height: 2rem;
  border: 1px solid #e9e9e9;
  border-radius: 8px;
  background: #fff;
  color: #111;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0 0.65rem;
}

.catalog-layout {
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr);
  gap: clamp(0.75rem, 2vw, 1.5rem);
}

.catalog-filter {
  align-self: start;
  position: sticky;
  top: 130px;
  display: grid;
  gap: 0;
  padding: 0.85rem;
  border: 1px solid #e9e9e9;
  border-radius: 10px;
  background: #fff;
}

.catalog-filter__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  min-height: 1.8rem;
  padding: 0 0.05rem 0.55rem;
  border-bottom: 1px solid #eee;
}

.catalog-filter__head strong {
  display: inline-flex;
  align-items: center;
  font-size: 0.82rem;
  line-height: 1;
}

.catalog-filter__block {
  display: grid;
  gap: 0.4rem;
  padding: 0.65rem 0;
  border-top: 1px solid #eee;
}

.catalog-filter__head + .catalog-filter__block {
  border-top: 0;
  padding-top: 0.5rem;
}

.catalog-filter__block label {
  display: inline-flex;
  align-items: center;
  min-height: 1rem;
  color: #111;
  font-size: 0.68rem;
  font-weight: 700;
  line-height: 1;
}

.catalog-filter__block input {
  width: 100%;
  min-height: 2rem;
  border: 1px solid #e9e9e9;
  border-radius: 6px;
  background: #f7f7f7;
  color: #333;
  padding: 0 0.5rem;
  font-size: 0.75rem;
}

.catalog-filter__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
  min-height: 1.7rem;
  padding: 0 0.4rem;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #555;
  text-align: left;
  font-size: 0.75rem;
  line-height: 1;
}

.catalog-filter__item span {
  display: inline-flex;
  align-items: center;
  min-height: 1.1rem;
}

.catalog-filter__item:hover,
.catalog-filter__item.active {
  background: #f4f4f4;
  color: #000;
}

.catalog-filter__item--category {
  padding-inline: 0.55rem;
}

.catalog-price-range {
  position: relative;
  height: 5px;
  margin: 0.45rem 0 0.15rem;
  border-radius: 999px;
  background: #f0f0f0;
}

.catalog-price-range span {
  position: absolute;
  left: 22%;
  right: 18%;
  top: 0;
  bottom: 0;
  border-radius: inherit;
  background: #000;
}

.catalog-price-range i,
.catalog-price-range::before {
  content: "";
  position: absolute;
  top: 50%;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #000;
  transform: translateY(-50%);
}

.catalog-price-range::before {
  left: 22%;
}

.catalog-price-range i {
  right: 18%;
}

.catalog-price-labels,
.catalog-color-list,
.catalog-size-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.catalog-price-labels {
  justify-content: space-between;
  color: #111;
  font-size: 0.72rem;
}

.catalog-color-list button {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 50%;
  color: #fff;
}

.catalog-size-list button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 1.7rem;
  border: 0;
  border-radius: 6px;
  background: #f0f0f0;
  color: rgba(0, 0, 0, 0.62);
  font-size: 0.68rem;
  line-height: 1;
  padding: 0 0.6rem;
}

.catalog-size-list button:hover {
  background: #000;
  color: #fff;
}

.catalog-apply {
  width: 100%;
  margin-top: 0.2rem;
  min-height: 2.2rem;
  font-size: 0.72rem;
}

.catalog-results {
  min-width: 0;
}

.catalog-active-filters {
  margin: 0 0 1rem;
}

.catalog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
  gap: clamp(0.6rem, 1.2vw, 1rem);
}

.catalog-product {
  display: block;
  cursor: pointer;
  min-width: 0;
  color: inherit;
  text-decoration: none;
}

.catalog-product__media {
  position: relative;
  display: grid;
  place-items: center;
  aspect-ratio: 0.82;
  overflow: hidden;
  border-radius: 10px;
  background: #f0f0f0;
}

.catalog-product__media img {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.img-loading {
  position: absolute;
  inset: 0;
  background: #f0f0f0;
}

.image-placeholder {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: none;
  place-items: center;
  align-items: center;
  justify-content: center;
  color: #888;
  font-size: 0.75rem;
}

.catalog-product__empty {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: grid;
  place-items: center;
  color: #888;
  font-size: 0.75rem;
}

.catalog-product__open {
  position: absolute;
  right: 0.6rem;
  top: 0.6rem;
  z-index: 4;
  display: grid;
  place-items: center;
  width: 1.8rem;
  height: 1.8rem;
  border: 0;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.92);
  color: #111;
  opacity: 0;
}

.catalog-product:hover .catalog-product__open {
  opacity: 1;
}

.catalog-product__body {
  padding: 0.55rem 0 0;
}

.catalog-product__body > span {
  display: block;
  color: #777;
  font-size: 0.65rem;
  line-height: 1.4;
}

.catalog-product h3 {
  margin: 0;
  color: #111;
  font-size: 0.88rem;
  line-height: 1.35;
  font-weight: 700;
}

.catalog-product p {
  display: -webkit-box;
  margin: 0.2rem 0 0;
  color: #666;
  font-size: 0.7rem;
  line-height: 1.6;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.catalog-rating-line,
.catalog-product__footer {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.catalog-rating-line {
  margin-top: 0.25rem;
}

.catalog-rating-line span {
  color: #ffc633;
  font-size: 0.72rem;
  letter-spacing: 0;
}

.catalog-rating-line small {
  color: #555;
  font-size: 0.68rem;
}

.catalog-product__footer {
  margin-top: 0.3rem;
}

.catalog-product__footer strong {
  color: #111;
  font-size: 1rem;
  line-height: 1;
}

.catalog-product__footer del {
  color: rgba(0, 0, 0, 0.38);
  font-size: 0.88rem;
  font-weight: 700;
}

.catalog-product__footer small {
  display: inline-flex;
  align-items: center;
  min-height: 1.2rem;
  border-radius: 4px;
  background: rgba(255, 51, 51, 0.1);
  color: #ff3333;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0 0.4rem;
}

.catalog-empty {
  display: grid;
  place-items: center;
  min-height: 300px;
  padding: 1.5rem;
  border-radius: 10px;
  background: #f3f3f3;
  text-align: center;
}

.catalog-empty span {
  font-size: 0.68rem;
  font-weight: 700;
  color: #777;
}

.catalog-empty h2 {
  max-width: 480px;
  margin: 0.5rem 0 0;
  font-size: clamp(1.2rem, 3vw, 2rem);
  line-height: 1.15;
}

.catalog-empty p {
  max-width: 420px;
  margin: 0.65rem 0 0;
  color: #666;
  font-size: 0.82rem;
  line-height: 1.7;
}

.catalog-empty button {
  margin-top: 1rem;
}

.catalog-pagination {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.35rem;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.catalog-pagination button.active {
  background: #111;
  color: #fff;
}

.catalog-pagination button:disabled {
  opacity: 0.35;
}

.catalog-drawer {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: flex;
  justify-content: flex-end;
  background: rgba(0, 0, 0, 0.42);
}

.catalog-drawer__panel {
  width: min(88vw, 340px);
  height: 100%;
  overflow-y: auto;
  padding: 1rem;
  background: #fff;
}

.catalog-search--drawer {
  width: 100%;
  margin: 0.75rem 0 0;
}

.catalog-drawer__apply {
  width: 100%;
  margin-top: 0.85rem;
}

.product-skeleton .skeleton-wave {
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, #f2f2f2 0%, #e9e9e9 100%);
}

.product-skeleton .skeleton-wave::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.52) 48%,
    transparent 100%
  );
  animation: skeleton-wave 1.5s ease-in-out infinite;
}

.product-skeleton .skeleton-image {
  aspect-ratio: 0.84;
  border-radius: 10px;
  background: linear-gradient(180deg, #f1f1f1 0%, #e5e5e5 100%);
}

.product-skeleton .skeleton-line {
  width: 72%;
  height: 0.6rem;
  margin-top: 0.6rem;
  border-radius: 4px;
}

.product-skeleton .skeleton-line--short {
  width: 46%;
  margin-top: 0.5rem;
}

.product-skeleton .skeleton-wave-delay::after {
  animation-delay: 0.18s;
}

@keyframes skeleton-wave {
  100% {
    transform: translateX(100%);
  }
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.catalog-drawer-enter-active,
.catalog-drawer-leave-active {
  transition: opacity 220ms ease;
}

.catalog-drawer-enter-active .catalog-drawer__panel,
.catalog-drawer-leave-active .catalog-drawer__panel {
  transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
}

.catalog-drawer-enter-from,
.catalog-drawer-leave-to {
  opacity: 0;
}

.catalog-drawer-enter-from .catalog-drawer__panel,
.catalog-drawer-leave-to .catalog-drawer__panel {
  transform: translateX(100%);
}

@keyframes catalog-float {
  0%,
  100% {
    transform: translate3d(0, 0, 0) rotate(-1deg);
  }
  50% {
    transform: translate3d(0, -14px, 0) rotate(1deg);
  }
}

@keyframes catalog-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 1280px) {
  .catalog-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 1024px) {
  .catalog-layout {
    grid-template-columns: 1fr;
  }

  .catalog-filter--desktop {
    display: none;
  }

  .catalog-search {
    width: min(42vw, 360px);
  }
}

@media (min-width: 1025px) {
  .catalog-filter-toggle {
    display: none;
  }
}

@media (max-width: 760px) {
  .catalog-page {
    padding-top: 1rem;
  }

  .catalog-search {
    width: 100%;
  }

  .catalog-toolbar {
    position: static;
    align-items: flex-start;
    flex-direction: column;
  }

  .catalog-toolbar__actions {
    width: 100%;
    flex-wrap: wrap;
  }

  .catalog-sort {
    order: 3;
    width: 100%;
  }

  .catalog-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.2rem 0.8rem;
  }

  .catalog-product__media {
    border-radius: 1rem;
  }

  .catalog-product h3 {
    font-size: 0.88rem;
  }

  .catalog-product p {
    display: none;
  }

  .catalog-product__open {
    opacity: 1;
    transform: none;
  }
}
</style>
