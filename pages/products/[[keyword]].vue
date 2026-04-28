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
  "法式花卉",
  "联名系列",
  "T恤",
  "礼物",
  "家居",
  "手机壳",
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
    return `共找到 ${total.value} 个和“${routeKeyword.value}”相关的 POD 设计资源`;
  }
  return `当前共有 ${total.value} 个可浏览的 POD 设计资源`;
});

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
  () => {
    syncStateFromRoute();
    fetchProducts();
  },
  { immediate: true },
);
</script>

<template>
  <div class="min-h-screen bg-[#f7f5f2] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
    <div class="mx-auto max-w-[1560px]">
      <h1 class="sr-only">{{ pageTitle }}</h1>

      <div
        class="ys-section-shell sticky top-[58px] z-20 p-4 backdrop-blur-sm sm:p-5"
      >
        <div class="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div class="relative flex-1">
            <span
              class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
            >
              <svg
                class="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="6"
                  stroke="currentColor"
                  stroke-width="1.6"
                />
                <line
                  x1="15"
                  y1="15"
                  x2="20"
                  y2="20"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                />
              </svg>
            </span>
            <input
              v-model="searchKeyword"
              type="text"
              placeholder="搜索印花图案、POD 商品、礼品周边或定制主题"
              class="ys-field w-full rounded-xl bg-[#faf8f5] py-3 pl-11 pr-4 text-[13px] outline-none transition duration-200"
              @keyup.enter="handleSearch"
            />
          </div>
          <div class="flex gap-2">
            <button
              class="ys-action-btn rounded-xl px-4 py-3 text-[12px] transition duration-200"
              @click="toggleFilters"
            >
              {{ showFilters ? "收起筛选" : "筛选" }}
            </button>
            <BaseButton
              size="lg"
              class="!px-5 !py-3 !text-[12px]"
              @click="handleSearch"
              >搜索</BaseButton
            >
          </div>
        </div>

        <div
          class="mt-4 flex flex-col gap-3 border-t border-white/70 pt-4 lg:flex-row lg:items-center lg:justify-between"
        >
          <div class="flex flex-wrap items-center gap-2">
            <button
              v-for="keyword in recommendedKeywords"
              :key="keyword"
              class="ys-chip rounded-full px-3 py-1 text-[11px]"
              @click="handleKeywordClick(keyword)"
            >
              {{ keyword }}
            </button>
          </div>
          <button class="ys-quiet-link text-[11px]" @click="resetFilters">
            重置
          </button>
        </div>

        <div
          v-if="showFilters"
          class="mt-4 grid gap-3 border-t border-white/70 pt-4 sm:grid-cols-[1fr_1fr_auto] sm:items-center"
        >
          <input
            v-model="startDate"
            type="date"
            class="ys-field rounded-xl px-4 py-3 text-[12px] outline-none transition"
            @change="handleSearch"
          />
          <input
            v-model="endDate"
            type="date"
            class="ys-field rounded-xl px-4 py-3 text-[12px] outline-none transition"
            @change="handleSearch"
          />
          <button
            class="ys-action-btn rounded-xl px-4 py-3 text-[12px] transition"
            @click="resetFilters"
          >
            重置筛选
          </button>
        </div>

        <div
          class="mt-4 flex flex-col gap-3 border-t border-white/70 pt-4 lg:flex-row lg:items-center lg:justify-between"
        >
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-[12px] text-stone-500">{{ resultSummary }}</span>
            <span
              v-if="activeFilters.length"
              class="ml-1 text-[10px] uppercase tracking-[0.18em] text-stone-400"
            >
              当前筛选
            </span>
            <span
              v-for="filter in activeFilters"
              :key="filter"
              class="ys-chip cursor-default rounded-full px-3 py-1 text-[11px]"
            >
              {{ filter }}
            </span>
          </div>
          <div class="text-[11px] text-stone-400">
            {{
              totalPages > 0
                ? `第 ${currentPage} / ${totalPages} 页`
                : "等待资源"
            }}
          </div>
        </div>
      </div>

      <div class="mt-8">
        <div
          v-if="loading"
          class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6"
        >
          <div
            v-for="i in 12"
            :key="i"
            class="product-skeleton rounded-[0.9rem] bg-transparent p-1"
          >
            <div
              class="skeleton-wave skeleton-image aspect-[4/5] rounded-[0.85rem]"
            ></div>
            <div class="mt-3 h-3 w-24 rounded skeleton-wave"></div>
            <div
              class="mt-2 h-3 w-16 rounded skeleton-wave skeleton-wave-delay"
            ></div>
          </div>
        </div>

        <div
          v-else-if="productList.length > 0"
          class="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
        >
          <article
            v-for="product in productList"
            :key="product.id"
            class="ys-flat-block group cursor-pointer rounded-[1.05rem] p-2.5 transition duration-200 hover:bg-white/92"
            @click="goToProductDetail(product.id)"
          >
            <div class="overflow-hidden rounded-[0.95rem] bg-stone-100">
              <div class="relative aspect-[4/5] overflow-hidden">
                <template v-if="getProductImage(product)">
                  <div class="img-loading absolute inset-0 bg-stone-100"></div>
                  <img
                    :src="
                      getPreviewImageUrl(getProductImage(product), {
                        width: 500,
                        quality: 80,
                        format: 'webp',
                      }) || undefined
                    "
                    :alt="product.name || 'POD 定制商品图片'"
                    class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.025]"
                    @error="handleImageError($event, product)"
                    @load="handleImageLoad"
                  />
                  <div
                    class="image-placeholder absolute inset-0 hidden items-center justify-center bg-stone-100 text-[12px] text-stone-400"
                  >
                    暂无预览图
                  </div>
                </template>
                <div
                  v-else
                  class="absolute inset-0 flex items-center justify-center bg-stone-100 text-[12px] text-stone-400"
                >
                  暂无预览图
                </div>
              </div>
            </div>
            <div class="mt-3 px-1">
              <h3
                class="text-[13px] font-medium leading-6 text-stone-900 transition duration-200 group-hover:text-stone-700"
              >
                {{ product.name }}
              </h3>
              <p
                v-if="product.description"
                class="mt-1 line-clamp-2 text-[12px] leading-5 text-stone-500"
              >
                {{ product.description }}
              </p>
              <div
                v-if="product.code"
                class="mt-2 text-[10px] uppercase tracking-[0.16em] text-stone-400"
              >
                {{ product.code }}
              </div>
            </div>
          </article>
        </div>

        <div
          v-else
          class="ys-section-shell mx-auto max-w-xl px-6 py-16 text-center sm:px-8"
        >
          <p class="text-[13px] leading-7 text-stone-500">
            暂时没有匹配的 POD 设计资源。可以换一个图案、商品品类或定制主题继续搜索。
          </p>
          <button
            class="ys-action-btn mt-5 rounded-xl px-5 py-3 text-[12px] transition"
            @click="resetFilters"
          >
            查看全部资源
          </button>
        </div>

        <div
          v-if="!loading && totalPages > 1 && productList.length > 0"
          class="mt-12 flex flex-col items-center gap-4 border-t border-white/70 pt-6"
        >
          <div class="flex flex-wrap items-center justify-center gap-2">
            <button
              @click="handlePageChange(currentPage - 1)"
              :disabled="currentPage === 1"
              class="ys-action-btn rounded-xl px-4 py-2 text-[12px] transition disabled:opacity-35"
            >
              上一页
            </button>
            <button
              v-if="pageNumbers[0] > 1"
              @click="handlePageChange(1)"
              class="ys-action-btn rounded-xl px-4 py-2 text-[12px] transition"
            >
              1
            </button>
            <span v-if="pageNumbers[0] > 2" class="px-1 text-stone-300"
              >...</span
            >
            <button
              v-for="page in pageNumbers"
              :key="page"
              @click="handlePageChange(page)"
              :class="[
                'rounded-xl px-4 py-2 text-[12px] transition',
                currentPage === page ? 'ys-action-btn-active' : 'ys-action-btn',
              ]"
            >
              {{ page }}
            </button>
            <span
              v-if="pageNumbers[pageNumbers.length - 1] < totalPages - 1"
              class="px-1 text-stone-300"
              >...</span
            >
            <button
              v-if="pageNumbers[pageNumbers.length - 1] < totalPages"
              @click="handlePageChange(totalPages)"
              class="ys-action-btn rounded-xl px-4 py-2 text-[12px] transition"
            >
              {{ totalPages }}
            </button>
            <button
              @click="handlePageChange(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="ys-action-btn rounded-xl px-4 py-2 text-[12px] transition disabled:opacity-35"
            >
              下一页
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-skeleton .skeleton-wave {
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, #f0ece6 0%, #ebe5dd 100%);
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
  background: linear-gradient(180deg, #eee8df 0%, #e7dfd5 100%);
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
</style>
