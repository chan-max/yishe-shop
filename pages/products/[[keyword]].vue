<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { api } from "../../utils/api";
import { getPreviewImageUrl } from "../../utils/image";
import { getProductAbsoluteUrl, getProductPath } from "~/utils/product-url";
import {
  SITE_DEFAULT_IMAGE,
  SITE_KEYWORDS,
  SITE_LOCALE,
  SITE_OG_LOCALE,
  SITE_ORGANIZATION_NAME,
  SITE_URL,
} from "../../utils/seo";
import { useBreadcrumbStructuredData, useItemListStructuredData } from "~/composables/use-seo";
import { serializeStructuredData } from "~/utils/structured-data";

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
const selectedType = ref<string>("");
const selectedCategoryId = ref<string>("");
const selectedBrand = ref<string>("");
const selectedStatus = ref<string>("");
const selectedInventoryStatus = ref<string>("");
const selectedFlag = ref<string>("");
const selectedStockMode = ref<string>("");
const priceMin = ref<number | null>(null);
const priceMax = ref<number | null>(null);
const skuKeyword = ref<string>("");
const sortMode = ref<string>("sort_desc");
const currentPage = ref<number>(1);
const pageSize = ref<number>(24);
const loading = ref<boolean>(false);
const productList = ref<any[]>([]);
const categoryList = ref<any[]>([]);
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

const filterCategories = ["T恤", "卫衣", "鼠标垫", "杯子", "手机壳", "抱枕", "帆布包", "装饰画"];
const statusOptions = [
  { label: "在售商品", value: "active" },
  { label: "草稿商品", value: "draft" },
  { label: "归档商品", value: "archived" },
];
const inventoryOptions = [
  { label: "全部库存", value: "" },
  { label: "有库存", value: "in_stock" },
  { label: "无库存", value: "out_of_stock" },
  { label: "预售", value: "preorder" },
];
const flagOptions = [
  { label: "精选", value: "featured" },
  { label: "新品", value: "new" },
  { label: "热销", value: "hot" },
  { label: "促销", value: "sale" },
];
const stockModeOptions = [
  { label: "仅看有库存", value: "in_stock" },
  { label: "低库存优先", value: "low_stock" },
];
const sortOptions = [
  { label: "推荐", value: "sort_desc", sortBy: "sort", sortDir: "DESC" },
  { label: "最新", value: "newest", sortBy: "createTime", sortDir: "DESC" },
  { label: "价格↑", value: "price_asc", sortBy: "salePrice", sortDir: "ASC" },
  { label: "价格↓", value: "price_desc", sortBy: "salePrice", sortDir: "DESC" },
  { label: "销量", value: "sales_desc", sortBy: "salesCount", sortDir: "DESC" },
];

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
const currentSort = computed(() => sortOptions.find((item) => item.value === sortMode.value) || sortOptions[0]);
const categorySelectOptions = computed(() => [
  { label: "全部分类", value: "" },
  ...categoryList.value.map((item: any) => ({
    label: item.name,
    value: item.id,
  })),
]);

const toNumberOrNull = (value: unknown) => {
  if (value === undefined || value === null || value === "") return null;
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : null;
};

const setBooleanFlagParams = (params: Record<string, any>) => {
  if (selectedFlag.value === "featured") params.isFeatured = true;
  if (selectedFlag.value === "new") params.isNew = true;
  if (selectedFlag.value === "hot") params.isHot = true;
  if (selectedFlag.value === "sale") params.isOnSale = true;
};

const cleanQueryString = (value: unknown) => String(value || "").trim();

const loadCategories = async () => {
  try {
    const response = await api.productCategory.getAll();
    if (response.code === 0 || response.status === true || response.code === 200) {
      const data = Array.isArray(response.data) ? response.data : [];
      categoryList.value = data.filter((item: any) => item?.isActive !== false);
    }
  } catch (error) {
    console.warn("获取商品分类失败:", error);
    categoryList.value = [];
  }
};

const normalizeProductPageResponse = (response: any) => {
  const responseData = response?.data ?? response;
  const payload =
    responseData?.data &&
    (Array.isArray(responseData.data?.list) ||
      responseData.data?.total !== undefined ||
      responseData.data?.totalCount !== undefined)
      ? responseData.data
      : responseData;
  const list = Array.isArray(payload?.list)
    ? payload.list
    : Array.isArray(payload)
      ? payload
      : [];
  const rawTotal =
    payload?.total ??
    payload?.totalCount ??
    responseData?.total ??
    response?.total;
  const parsedTotal = Number(rawTotal);

  return {
    list,
    total:
      Number.isFinite(parsedTotal) && parsedTotal >= 0
        ? parsedTotal
        : list.length,
  };
};

const syncStateFromRoute = () => {
  searchKeyword.value = routeKeyword.value || "";
  const query = route.query;
  startDate.value = typeof query.start === "string" ? query.start : "";
  endDate.value = typeof query.end === "string" ? query.end : "";
  selectedType.value = typeof query.type === "string" ? query.type : "";
  selectedCategoryId.value = typeof query.categoryId === "string" ? query.categoryId : "";
  selectedBrand.value = typeof query.brand === "string" ? query.brand : "";
  selectedStatus.value = typeof query.status === "string" ? query.status : "";
  selectedInventoryStatus.value = typeof query.inventoryStatus === "string" ? query.inventoryStatus : "";
  selectedFlag.value = typeof query.flag === "string" ? query.flag : "";
  selectedStockMode.value = typeof query.stock === "string" ? query.stock : "";
  priceMin.value = toNumberOrNull(query.priceMin);
  priceMax.value = toNumberOrNull(query.priceMax);
  skuKeyword.value = typeof query.sku === "string" ? query.sku : "";
  sortMode.value = typeof query.sort === "string" ? query.sort : "sort_desc";
  currentPage.value =
    typeof query.page === "string" ? Number(query.page) || 1 : 1;
};

const fetchProducts = async () => {
  const requestId = requestSequence.value + 1;
  requestSequence.value = requestId;
  loading.value = true;

  try {
    const params: Record<string, any> = {
      page: currentPage.value,
      pageSize: pageSize.value,
      isPublish: true,
      includeRelations: false,
      searchText: searchKeyword.value || undefined,
      startTime: startDate.value || undefined,
      endTime: endDate.value || undefined,
      type: selectedType.value || undefined,
      categoryId: selectedCategoryId.value || undefined,
      brand: cleanQueryString(selectedBrand.value) || undefined,
      status: selectedStatus.value || undefined,
      sku: cleanQueryString(skuKeyword.value) || undefined,
      inventoryStatus: selectedInventoryStatus.value || undefined,
      priceMin: priceMin.value ?? undefined,
      priceMax: priceMax.value ?? undefined,
      sortBy: currentSort.value.sortBy,
      sortDir: currentSort.value.sortDir,
    };
    if (selectedStockMode.value === "in_stock") params.hasStock = true;
    if (selectedStockMode.value === "low_stock") params.stockMax = 10;
    setBooleanFlagParams(params);

    const response = await api.productList.getPage(params);

    if (requestId !== requestSequence.value) return;

    if (
      response.code === 0 ||
      response.status === true ||
      response.code === 200
    ) {
      const data = normalizeProductPageResponse(response);
      productList.value = data.list;
      total.value = data.total;
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
  if (selectedType.value) query.type = selectedType.value;
  if (selectedCategoryId.value) query.categoryId = selectedCategoryId.value;
  if (cleanQueryString(selectedBrand.value)) query.brand = cleanQueryString(selectedBrand.value);
  if (selectedStatus.value) query.status = selectedStatus.value;
  if (selectedInventoryStatus.value) query.inventoryStatus = selectedInventoryStatus.value;
  if (selectedFlag.value) query.flag = selectedFlag.value;
  if (selectedStockMode.value) query.stock = selectedStockMode.value;
  if (priceMin.value !== null) query.priceMin = String(priceMin.value);
  if (priceMax.value !== null) query.priceMax = String(priceMax.value);
  if (cleanQueryString(skuKeyword.value)) query.sku = cleanQueryString(skuKeyword.value);
  if (sortMode.value && sortMode.value !== "sort_desc") query.sort = sortMode.value;
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
  [
    "type",
    "categoryId",
    "brand",
    "status",
    "inventoryStatus",
    "flag",
    "stock",
    "priceMin",
    "priceMax",
    "sku",
    "sort",
  ].forEach((key) => {
    const value = route.query[key];
    if (typeof value === "string" && value) currentQuery[key] = value;
  });
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
  selectedType.value = "";
  selectedCategoryId.value = "";
  selectedBrand.value = "";
  selectedStatus.value = "";
  selectedInventoryStatus.value = "";
  selectedFlag.value = "";
  selectedStockMode.value = "";
  priceMin.value = null;
  priceMax.value = null;
  skuKeyword.value = "";
  sortMode.value = "sort_desc";
  currentPage.value = 1;

  if (
    route.path === "/products" &&
    !Object.keys(route.query).length
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

const applyDrawerFilters = async () => {
  showFilters.value = false;
  await handleSearch();
};

const goToProductDetail = (productId: string) => {
  navigateTo(getProductPath({ id: productId }));
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
  return product?.type || "未识别";
};

const getProductPrice = (product: any, index = 0) => {
  const price = Number(product?.salePrice || product?.price || 0);
  if (price > 0) return Number(price.toFixed(2));
  const seed = Number(String(product?.id || index).replace(/\D/g, "").slice(-2)) || index + 11;
  return 99 + (seed % 9) * 20;
};

const getProductOldPrice = (product: any, index = 0) => {
  const compareAtPrice = Number(product?.compareAtPrice || 0);
  if (compareAtPrice > 0) return Number(compareAtPrice.toFixed(2));
  const originalPrice = Number(product?.price || 0);
  const salePrice = Number(product?.salePrice || 0);
  if (originalPrice > salePrice && salePrice > 0) return Number(originalPrice.toFixed(2));
  const price = getProductPrice(product, index);
  return index % 3 === 0 ? price + 60 : null;
};

const getProductDiscount = (product: any, index = 0) => {
  const oldPrice = getProductOldPrice(product, index);
  if (!oldPrice) return "";
  return `-${Math.round(((oldPrice - getProductPrice(product, index)) / oldPrice) * 100)}%`;
};

const getProductRating = (product: any, index = 0) => {
  const rating = Number(product?.rating || 0);
  if (rating > 0) return rating.toFixed(1);
  return (4.2 + (index % 7) * 0.1).toFixed(1);
};

const activeFilters = computed(() => {
  const filters: Array<{ label: string; key: string }> = [];
  if (routeKeyword.value) filters.push({ label: `关键词: ${routeKeyword.value}`, key: "keyword" });
  if (selectedType.value) filters.push({ label: selectedType.value, key: "type" });
  const categoryName = categoryList.value.find((item: any) => item.id === selectedCategoryId.value)?.name;
  if (categoryName) filters.push({ label: `分类: ${categoryName}`, key: "category" });
  if (selectedBrand.value) filters.push({ label: `品牌: ${selectedBrand.value}`, key: "brand" });
  if (selectedInventoryStatus.value) {
    filters.push({ label: inventoryOptions.find((item) => item.value === selectedInventoryStatus.value)?.label || "", key: "inventory" });
  }
  if (selectedFlag.value) {
    filters.push({ label: flagOptions.find((item) => item.value === selectedFlag.value)?.label || "", key: "flag" });
  }
  if (selectedStockMode.value) {
    filters.push({ label: stockModeOptions.find((item) => item.value === selectedStockMode.value)?.label || "", key: "stockMode" });
  }
  if (priceMin.value !== null || priceMax.value !== null) {
    filters.push({ label: `¥${priceMin.value ?? 0} - ${priceMax.value ?? "∞"}`, key: "price" });
  }
  if (skuKeyword.value) filters.push({ label: `SKU: ${skuKeyword.value}`, key: "sku" });
  if (startDate.value || endDate.value) {
    filters.push({ label: `${startDate.value || "开始"} ~ ${endDate.value || "结束"}`, key: "date" });
  }
  return filters;
});

const clearFilter = (key: string) => {
  switch (key) {
    case "keyword":
      searchKeyword.value = "";
      break;
    case "type":
      selectedType.value = "";
      break;
    case "category":
      selectedCategoryId.value = "";
      break;
    case "brand":
      selectedBrand.value = "";
      break;
    case "inventory":
      selectedInventoryStatus.value = "";
      break;
    case "flag":
      selectedFlag.value = "";
      break;
    case "stockMode":
      selectedStockMode.value = "";
      break;
    case "price":
      priceMin.value = null;
      priceMax.value = null;
      break;
    case "sku":
      skuKeyword.value = "";
      break;
    case "date":
      startDate.value = "";
      endDate.value = "";
      break;
  }
  handleSearch();
};

const robotsValue = computed(() =>
  startDate.value ||
  endDate.value ||
  currentPage.value > 1 ||
  routeKeyword.value
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
  Object.entries(buildRouteQuery()).forEach(([key, value]) => {
    if (!["start", "end", "page"].includes(key)) query.set(key, value);
  });
  if (currentPage.value > 1) query.set("page", String(currentPage.value));

  const queryString = query.toString();
  return `${SITE_URL}${path}${queryString ? `?${queryString}` : ""}`;
});

const collectionStructuredData = computed(() => {
  const breadcrumbItems = [
    { name: "首页", url: SITE_URL },
    { name: "POD 商品", url: `${SITE_URL}/products` },
  ];
  if (routeKeyword.value) {
    breadcrumbItems.push({
      name: routeKeyword.value,
      url: `${SITE_URL}/products/${encodeURIComponent(routeKeyword.value)}`,
    });
  }
  const breadcrumb = useBreadcrumbStructuredData(breadcrumbItems);

  const itemList = productList.value.length > 0
    ? useItemListStructuredData(
        productList.value.map((product: any, index: number) => ({
          name: product.name || "POD 定制商品",
          url: getProductAbsoluteUrl(product, SITE_URL),
          image: Array.isArray(product.images) && product.images.length > 0
            ? product.images.find((img: any) => img && typeof img === "string" && img.startsWith("http"))
            : undefined,
          position: (currentPage.value - 1) * pageSize.value + index + 1,
        })),
      )
    : null;

  const collection = {
    "@type": "CollectionPage",
    name: pageTitle.value,
    description: pageDescription.value,
    url: canonicalUrl.value,
    inLanguage: SITE_LOCALE,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_ORGANIZATION_NAME,
      url: SITE_URL,
    },
    about: routeKeyword.value || "衣设商品与设计内容",
    numberOfItems: total.value,
  };

  const graph = [
    { ...breadcrumb },
    collection,
    ...(itemList ? [{ ...itemList }] : []),
  ];

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
});
const collectionStructuredDataJson = computed(() =>
  serializeStructuredData(collectionStructuredData.value),
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
  ogLocale: SITE_OG_LOCALE,
  twitterCard: "summary_large_image",
  twitterTitle: () => pageTitle.value,
  twitterDescription: () => pageDescription.value,
  twitterImage: SITE_DEFAULT_IMAGE,
  robots: () => robotsValue.value,
});

useHead(() => ({
  link: [{ rel: "canonical", href: canonicalUrl.value }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: collectionStructuredDataJson.value,
    },
  ],
}));

watch(
  () => [
    Array.isArray(route.params.keyword)
      ? route.params.keyword.join("/")
      : route.params.keyword || "",
    typeof route.query.start === "string" ? route.query.start : "",
    typeof route.query.end === "string" ? route.query.end : "",
    typeof route.query.page === "string" ? route.query.page : "",
    typeof route.query.type === "string" ? route.query.type : "",
    typeof route.query.categoryId === "string" ? route.query.categoryId : "",
    typeof route.query.brand === "string" ? route.query.brand : "",
    typeof route.query.status === "string" ? route.query.status : "",
    typeof route.query.inventoryStatus === "string" ? route.query.inventoryStatus : "",
    typeof route.query.flag === "string" ? route.query.flag : "",
    typeof route.query.stock === "string" ? route.query.stock : "",
    typeof route.query.priceMin === "string" ? route.query.priceMin : "",
    typeof route.query.priceMax === "string" ? route.query.priceMax : "",
    typeof route.query.sku === "string" ? route.query.sku : "",
    typeof route.query.sort === "string" ? route.query.sort : "",
  ],
  async () => {
    syncStateFromRoute();
    await fetchProducts();
  },
  { immediate: false },
);

syncStateFromRoute();
await loadCategories();
await fetchProducts();
</script>

<template>
  <div class="catalog-page">
    <h1 class="sr-only">{{ pageTitle }}</h1>

    <nav class="catalog-breadcrumb" aria-label="面包屑导航">
      <NuxtLink to="/">首页</NuxtLink>
      <span class="ui-icon" aria-hidden="true">/</span>
      <span>{{ routeKeyword || "POD 商品" }}</span>
    </nav>

    <section class="product-filter-head">
      <div class="product-filter-title">
        <div>
          <span>Products</span>
          <h2>{{ routeKeyword || "全部商品" }}</h2>
          <p>{{ resultSummary }}</p>
        </div>
        <div class="product-filter-metrics">
          <strong>{{ total }}</strong>
          <span>件商品</span>
        </div>
      </div>

      <div class="product-filter-searchrow">
        <form class="product-filter-search" @submit.prevent="handleSearch">
          <AppIcon name="search" class="ui-icon" :size="16" aria-hidden="true" />
          <input v-model="searchKeyword" type="search" placeholder="搜索名称、关键词、品牌" />
          <button type="submit">搜索</button>
        </form>
        <select v-model="sortMode" class="product-filter-select" @change="handleSearch">
          <option v-for="item in sortOptions" :key="item.value" :value="item.value">
            {{ item.label }}
          </option>
        </select>
        <button type="button" class="product-filter-mobile" @click="toggleFilters">
          <AppIcon name="sliders" class="ui-icon" :size="15" aria-hidden="true" />
          筛选
        </button>
      </div>

      <div class="product-filter-quick">
        <div>
          <span>类型</span>
          <button
            v-for="item in filterCategories"
            :key="item"
            type="button"
            :class="{ active: selectedType === item }"
            @click="selectedType = selectedType === item ? '' : item; handleSearch()"
          >
            {{ item }}
          </button>
        </div>
        <div>
          <span>标签</span>
          <button
            v-for="item in flagOptions"
            :key="item.value"
            type="button"
            :class="{ active: selectedFlag === item.value }"
            @click="selectedFlag = selectedFlag === item.value ? '' : item.value; handleSearch()"
          >
            {{ item.label }}
          </button>
        </div>
      </div>

      <div v-if="activeFilters.length" class="product-filter-chips">
        <button
          v-for="filter in activeFilters"
          :key="filter.key"
          type="button"
          @click="clearFilter(filter.key)"
        >
          {{ filter.label }}
          <AppIcon name="x" class="ui-icon" :size="12" aria-hidden="true" />
        </button>
        <button type="button" class="product-filter-clear" @click="resetFilters">
          清除全部
        </button>
      </div>
    </section>

    <section class="catalog-layout">
      <aside class="product-filter-panel catalog-filter--desktop">
        <div class="product-filter-panel__head">
          <div>
            <strong>筛选</strong>
            <span>按商品数据快速缩小范围</span>
          </div>
          <button type="button" aria-label="清空筛选" @click="resetFilters">
            <AppIcon name="reset" class="ui-icon" :size="14" aria-hidden="true" />
          </button>
        </div>

        <div class="product-filter-section">
          <label>商品范围</label>
          <select v-model="selectedCategoryId" @change="handleSearch">
            <option v-for="item in categorySelectOptions" :key="item.value" :value="item.value">
              {{ item.label }}
            </option>
          </select>
          <div class="product-filter-pills">
            <button
              v-for="item in filterCategories"
              :key="item"
              type="button"
              :class="{ active: selectedType === item }"
              @click="selectedType = selectedType === item ? '' : item; handleSearch()"
            >
              {{ item }}
            </button>
          </div>
        </div>

        <div class="product-filter-section">
          <label>关键词</label>
          <input v-model="selectedBrand" type="search" placeholder="品牌" @keyup.enter="handleSearch" />
          <input v-model="skuKeyword" type="search" placeholder="SKU" @keyup.enter="handleSearch" />
        </div>

        <div class="product-filter-section">
          <label>价格区间</label>
          <div class="product-filter-range">
            <input v-model.number="priceMin" type="number" min="0" placeholder="最低价" @keyup.enter="handleSearch" />
            <span></span>
            <input v-model.number="priceMax" type="number" min="0" placeholder="最高价" @keyup.enter="handleSearch" />
          </div>
        </div>

        <div class="product-filter-section">
          <label>库存状态</label>
          <select v-model="selectedInventoryStatus" @change="handleSearch">
            <option v-for="item in inventoryOptions" :key="item.value" :value="item.value">
              {{ item.label }}
            </option>
          </select>
          <div class="product-filter-pills">
            <button
              v-for="item in stockModeOptions"
              :key="item.value"
              type="button"
              :class="{ active: selectedStockMode === item.value }"
              @click="selectedStockMode = selectedStockMode === item.value ? '' : item.value; handleSearch()"
            >
              {{ item.label }}
            </button>
          </div>
        </div>

        <div class="product-filter-section">
          <label>上新时间</label>
          <div class="product-filter-datepair">
            <input v-model="startDate" type="date" @change="handleSearch" />
            <span></span>
            <input v-model="endDate" type="date" @change="handleSearch" />
          </div>
        </div>

        <div class="product-filter-section">
          <label>商品标签</label>
          <div class="product-filter-pills">
            <button
              v-for="item in flagOptions"
              :key="item.value"
              type="button"
              :class="{ active: selectedFlag === item.value }"
              @click="selectedFlag = selectedFlag === item.value ? '' : item.value; handleSearch()"
            >
              {{ item.label }}
            </button>
          </div>
        </div>

        <div v-for="group in filterGroups" :key="group.title" class="product-filter-section">
          <label>{{ group.title }}</label>
          <div class="product-filter-pills">
            <button
              v-for="item in group.items"
              :key="item"
              type="button"
              :class="{ active: searchKeyword === item || routeKeyword === item }"
              @click="handleKeywordClick(item)"
            >
              {{ item }}
            </button>
          </div>
        </div>
      </aside>

      <div class="catalog-results">
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
            :to="getProductPath(product)"
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
                <AppIcon name="arrow-up-right" class="ui-icon" :size="13" aria-hidden="true" />
              </span>
            </div>
            <div class="catalog-product__body">
              <h3>{{ product.name }}</h3>
              <div class="catalog-rating-line">
                <span>★★★★★</span>
                <small>{{ getProductRating(product, index) }}/5</small>
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
            <AppIcon name="arrow-left" class="ui-icon" :size="13" aria-hidden="true" />
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
            <AppIcon name="arrow-right" class="ui-icon" :size="13" aria-hidden="true" />
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
            <AppIcon name="search" class="ui-icon" :size="16" aria-hidden="true" />
            <input v-model="searchKeyword" type="search" placeholder="搜索商品…" />
          </form>
          <div class="catalog-filter__block">
            <label>商品分类</label>
            <select v-model="selectedCategoryId">
              <option v-for="item in categorySelectOptions" :key="item.value" :value="item.value">
                {{ item.label }}
              </option>
            </select>
          </div>
          <div class="catalog-filter__block">
            <label>品牌 / SKU</label>
            <input v-model="selectedBrand" type="search" placeholder="品牌" />
            <input v-model="skuKeyword" type="search" placeholder="SKU" />
          </div>
          <div class="catalog-filter__block">
            <label>价格区间</label>
            <div class="catalog-number-row">
              <input v-model.number="priceMin" type="number" min="0" placeholder="最低价" />
              <input v-model.number="priceMax" type="number" min="0" placeholder="最高价" />
            </div>
          </div>
          <div class="catalog-filter__block">
            <label>库存状态</label>
            <select v-model="selectedInventoryStatus">
              <option v-for="item in inventoryOptions" :key="item.value" :value="item.value">
                {{ item.label }}
              </option>
            </select>
          </div>
          <div class="catalog-filter__block">
            <label>商品标签</label>
            <button
              v-for="item in flagOptions"
              :key="item.value"
              type="button"
              class="catalog-filter__item"
              :class="{ active: selectedFlag === item.value }"
              @click="selectedFlag = selectedFlag === item.value ? '' : item.value"
            >
              <span>{{ item.label }}</span>
              <AppIcon name="chevron-right" class="ui-icon" :size="13" aria-hidden="true" />
            </button>
          </div>
          <div class="catalog-filter__block">
            <label>上新时间</label>
            <div class="product-filter-datepair">
              <input v-model="startDate" type="date" />
              <span></span>
              <input v-model="endDate" type="date" />
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
              @click="handleKeywordClick(item)"
            >
              <span>{{ item }}</span>
              <AppIcon name="chevron-right" class="ui-icon" :size="13" aria-hidden="true" />
            </button>
          </div>
          <button type="button" class="catalog-drawer__apply" @click="applyDrawerFilters">
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

.ui-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.product-filter-head,
.catalog-layout {
  width: var(--ys-container) !important;
  max-width: var(--ys-page-max) !important;
  margin-inline: auto;
}

.product-filter-head {
  margin-bottom: 1.5rem;
  padding: 1.25rem;
  border: 1px solid #eceef1;
  border-radius: 18px;
  background: #fff;
}

.product-filter-title,
.product-filter-searchrow {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
  gap: 1rem;
}

.product-filter-title {
  margin-bottom: 1.1rem;
}

.product-filter-title span,
.product-filter-panel label {
  color: #6f7378;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.product-filter-title h2 {
  margin: 0.1rem 0 0;
  color: #17191c;
  font-size: clamp(1.45rem, 2.6vw, 2rem);
  font-weight: 600;
  line-height: 1.08;
}

.product-filter-title p {
  margin: 0.35rem 0 0;
  color: #6f7378;
  font-size: 0.82rem;
}

.product-filter-metrics {
  min-width: 96px;
  text-align: right;
}

.product-filter-metrics strong {
  display: block;
  color: #17191c;
  font-size: 1.65rem;
  font-weight: 600;
  line-height: 1;
}

.product-filter-metrics span {
  color: #86868b;
  font-size: 0.72rem;
  text-transform: none;
}

.product-filter-searchrow {
  grid-template-columns: minmax(320px, 1fr) 172px auto;
  align-items: center;
  gap: 0.75rem;
}

.product-filter-search {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.6rem;
  height: 3.25rem;
  padding: 0 0.55rem 0 1rem;
  border-radius: 14px;
  border: 1px solid #eceef1;
  background: #fff;
}

.product-filter-search input {
  min-width: 0;
  height: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  color: #1d1d1f;
  font-size: 0.88rem;
}

.product-filter-search input::placeholder,
.product-filter-panel input::placeholder {
  color: #86868b;
}

.product-filter-search button,
.product-filter-mobile {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  height: 2.25rem;
  border: 0;
  border-radius: 10px;
  background: #17191c;
  color: #fff;
  font-size: 0.76rem;
  padding: 0 0.85rem;
}

.product-filter-select {
  width: 100%;
  height: 3.25rem;
  border: 1px solid #eceef1;
  border-radius: 14px;
  outline: 0;
  background: #fff;
  color: #17191c;
  font-size: 0.8rem;
  padding: 0 0.85rem;
}

.product-filter-mobile {
  display: none;
  background: #fff;
  box-shadow: inset 0 0 0 1px #eceef1;
  color: #17191c;
}

.product-filter-quick {
  display: grid;
  gap: 0.65rem;
  margin-top: 0.85rem;
}

.product-filter-quick > div {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  flex-wrap: wrap;
}

.product-filter-quick span {
  min-width: 2.4rem;
  color: #6f7378;
  font-size: 0.72rem;
  font-weight: 600;
}

.product-filter-quick button {
  height: 1.9rem;
  border: 0;
  border-radius: 10px;
  background: #fff;
  box-shadow: inset 0 0 0 1px #eceef1;
  color: #34373d;
  font-size: 0.74rem;
  padding: 0 0.75rem;
}

.product-filter-quick button:hover,
.product-filter-pills button:hover,
.product-filter-chips button:hover,
.product-filter-panel__head button:hover {
  background: #fafafa;
}

.product-filter-quick button.active {
  background: #17191c;
  color: #fff;
}

.product-filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.9rem;
}

.product-filter-chips button {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  min-height: 1.65rem;
  border: 0;
  border-radius: 10px;
  background: #fff;
  box-shadow: inset 0 0 0 1px #eceef1;
  color: #34373d;
  font-size: 0.72rem;
  padding: 0 0.6rem;
}

.product-filter-chips .product-filter-clear {
  background: transparent;
  color: #86868b;
}

.product-filter-panel {
  align-self: start;
  position: sticky;
  top: 86px;
  display: grid;
  gap: 1rem;
  max-height: calc(100vh - 104px);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.18) transparent;
  padding: 1rem;
  border: 1px solid #eceef1;
  border-radius: 16px;
  background: #fff;
}

.product-filter-panel::-webkit-scrollbar {
  width: 2px;
}

.product-filter-panel::-webkit-scrollbar-track {
  background: transparent;
}

.product-filter-panel::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.18);
}

.product-filter-panel::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.28);
}

.product-filter-panel__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.2rem;
}

.product-filter-panel__head strong {
  display: block;
  color: #1d1d1f;
  font-size: 0.95rem;
  font-weight: 600;
}

.product-filter-panel__head span {
  display: block;
  margin-top: 0.2rem;
  color: #86868b;
  font-size: 0.7rem;
  line-height: 1.45;
}

.product-filter-panel__head button {
  display: grid;
  place-items: center;
  width: 1.8rem;
  height: 1.8rem;
  border: 0;
  border-radius: 999px;
  background: #fff;
  box-shadow: inset 0 0 0 1px #eceef1;
  color: #17191c;
}

.product-filter-section {
  display: grid;
  gap: 0.5rem;
}

.product-filter-section input {
  width: 100%;
  height: 2.35rem;
  border: 0;
  border-radius: 10px;
  outline: 0;
  background: #fff;
  box-shadow: inset 0 0 0 1px #eceef1;
  color: #17191c;
  font-size: 0.78rem;
  padding: 0 0.7rem;
}

.product-filter-section input:focus {
  box-shadow: inset 0 0 0 1px #17191c;
}

.product-filter-range {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: 0.45rem;
}

.product-filter-range span {
  width: 10px;
  height: 1px;
  background: #86868b;
}

.product-filter-datepair {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: 0.45rem;
}

.product-filter-datepair > span {
  width: 10px;
  height: 1px;
  background: #86868b;
}

.product-filter-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.product-filter-pills button {
  min-height: 1.75rem;
  border: 0;
  border-radius: 10px;
  background: #fff;
  box-shadow: inset 0 0 0 1px #eceef1;
  color: #34373d;
  font-size: 0.72rem;
  padding: 0 0.65rem;
}

.product-filter-pills button.active {
  background: #17191c;
  color: #fff;
}

.product-filter-panel select {
  width: 100%;
  height: 2.35rem;
  border: 1px solid #eceef1;
  border-radius: 10px;
  outline: 0;
  background: #fff;
  color: #17191c;
  font-size: 0.78rem;
  padding: 0 0.7rem;
}

.catalog-search {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: min(28vw, 300px);
  min-height: 2rem;
  padding: 0;
  border: 0;
  border-bottom: 1px solid #e6e6e6;
  border-radius: 0;
  background: transparent;
  line-height: 1;
}

.catalog-search:focus-within {
  border-color: #111;
  background: transparent;
  box-shadow: none;
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

.catalog-toolbar {
  width: var(--ys-container);
  margin: 0 auto 2.5rem;
}

.catalog-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 1.2rem;
}

.catalog-header h2 {
  margin: 0;
  font-size: 1.65rem;
  font-weight: 600;
  letter-spacing: 0;
}

.catalog-header p {
  margin: 0.25rem 0 0;
  color: #86868b;
  font-size: 0.78rem;
  line-height: 1.45;
}

.catalog-stats {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.35rem;
  flex-wrap: wrap;
}

.catalog-stats span {
  display: inline-flex;
  align-items: center;
  height: 1.55rem;
  padding: 0 0.6rem;
  border-radius: 999px;
  background: #f5f5f7;
  color: #1d1d1f;
  font-size: 0.72rem;
}

.catalog-bar {
  display: grid;
  grid-template-columns: minmax(260px, 1.4fr) minmax(0, 3fr);
  align-items: end;
  gap: clamp(1rem, 2.2vw, 1.8rem);
  margin-bottom: 1.05rem;
}

.catalog-search {
  position: relative;
  width: 100%;
  max-width: none;
  min-height: 44px;
}

.catalog-search input {
  width: 100%;
  height: 44px;
  padding: 0 0.25rem 0 1.55rem;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: #111;
  font-size: 0.8rem;
}

.catalog-search input:focus {
  outline: none;
  background: transparent;
}

.catalog-search input::placeholder {
  color: #86868b;
}

.catalog-controls {
  display: grid;
  grid-template-columns:
    minmax(120px, 1fr)
    minmax(104px, 0.9fr)
    minmax(108px, 0.95fr)
    minmax(168px, 1.35fr)
    minmax(120px, 1fr)
    minmax(120px, 1fr)
    minmax(120px, 1fr)
    minmax(104px, 0.9fr)
    minmax(124px, 1fr)
    minmax(124px, 1fr)
    auto;
  align-items: end;
  gap: 0.75rem;
  min-width: 0;
}

.catalog-range-field {
  display: grid;
  align-content: end;
  min-width: 0;
  height: 44px;
  border-bottom: 1px solid #d2d2d7;
}

.catalog-range-field:focus-within {
  border-color: #1d1d1f;
}

.catalog-range-field > span {
  color: #86868b;
  font-size: 0.68rem;
  line-height: 1;
}

.catalog-range-field > div {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: 0.45rem;
  height: 29px;
}

.catalog-range-field input {
  width: 100%;
  min-width: 0;
  height: 26px;
  border: 0;
  outline: 0;
  background: transparent;
  color: #1d1d1f;
  font-size: 0.78rem;
  padding: 0;
}

.catalog-range-field input::placeholder {
  color: #86868b;
}

.catalog-range-field i {
  width: 8px;
  height: 1px;
  background: #86868b;
}

.catalog-filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  height: 44px;
  padding: 0 0.85rem;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: #1d1d1f;
  font-size: 0.8rem;
  cursor: pointer;
  white-space: nowrap;
}

.catalog-filter-btn:hover {
  background: #f5f5f7;
}

.catalog-filter-btn:active,
.catalog-filter-btn[aria-expanded="true"] {
  border-color: #111;
  background: #111;
  color: #fff;
}

.catalog-active {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.85rem;
}

.catalog-active-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  height: 1.5rem;
  padding: 0 0.5rem 0 0.55rem;
  border: 0;
  border-radius: 999px;
  background: #f5f5f7;
  color: #1d1d1f;
  font-size: 0.72rem;
  cursor: pointer;
}

.catalog-active-tag:hover {
  background: #e8e8ed;
  color: #111;
}

.catalog-clear-all {
  height: 1.5rem;
  padding: 0 0.5rem;
  border: none;
  background: transparent;
  color: #86868b;
  font-size: 0.72rem;
  cursor: pointer;
  text-decoration: underline;
}

.catalog-clear-all:hover {
  color: #111;
}

.catalog-quick {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  align-items: flex-start;
}

.catalog-quick-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.catalog-quick-label {
  color: #86868b;
  font-size: 0.72rem;
  font-weight: 500;
  min-width: 2.5rem;
}

.catalog-quick-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.catalog-quick-btn {
  height: 1.65rem;
  padding: 0 0.65rem;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: #1d1d1f;
  font-size: 0.73rem;
  cursor: pointer;
}

.catalog-quick-btn:hover {
  background: #f5f5f7;
  color: #111;
}

.catalog-quick-btn.active {
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
  display: block;
  margin-bottom: 1.75rem;
  padding-bottom: 1.05rem;
  border-bottom: 1px solid #d2d2d7;
  background: #fff;
}

.catalog-toolbar h2 {
  margin: 0 0 0.2rem;
  color: #000;
  font-size: clamp(1.2rem, 2.2vw, 1.65rem);
  line-height: 1.1;
}

.catalog-toolbar span:not(.catalog-quick-label) {
  color: #86868b;
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

.catalog-filter-toggle,
.catalog-reset,
.catalog-filter__head button,
.catalog-pagination button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  min-height: 2rem;
  border: 0;
  border-radius: 6px;
  background: #fff;
  color: #111;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0 0.65rem;
}

.catalog-layout {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: clamp(1rem, 2vw, 1.5rem);
}

.catalog-filter {
  align-self: start;
  position: sticky;
  top: 86px;
  display: grid;
  gap: 0;
  max-height: calc(100vh - 104px);
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.18) transparent;
  padding: 0 1.35rem 0 0;
  background: #fff;
  border-right: 1px solid #d2d2d7;
  border-radius: 0;
}

.catalog-filter::-webkit-scrollbar {
  width: 2px;
}

.catalog-filter::-webkit-scrollbar-track {
  background: transparent;
}

.catalog-filter::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.18);
}

.catalog-filter::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.28);
}

.catalog-filter__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 1.2rem;
  padding-bottom: 0;
  border-bottom: 0;
}

.catalog-filter__head strong {
  display: inline-flex;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.catalog-filter__head button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: #999;
  cursor: pointer;
  transition: all 150ms ease;
}

.catalog-filter__head button:hover {
  background: #f5f5f7;
  color: #111;
}

.catalog-filter__block {
  margin-bottom: 1.15rem;
}

.catalog-filter__block:last-child {
  margin-bottom: 0;
}

.catalog-filter__block label {
  display: block;
  margin-bottom: 0.5rem;
  color: #86868b;
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.catalog-filter__block input,
.catalog-filter__block select {
  width: 100%;
  height: 2rem;
  padding: 0;
  border: 0;
  border-bottom: 1px solid #e5e5e5;
  border-radius: 0;
  background: #fff;
  color: #111;
  font-size: 0.75rem;
  transition: all 150ms ease;
}

.catalog-filter__block input:focus,
.catalog-filter__block select:focus {
  outline: none;
  border-color: #111;
}

.catalog-filter__block input::placeholder {
  color: #ccc;
}

.catalog-filter__block input + input {
  margin-top: 0.4rem;
}

.catalog-number-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.4rem;
}

.catalog-filter__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 1.85rem;
  padding: 0 0.55rem;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: #1d1d1f;
  font-size: 0.73rem;
  cursor: pointer;
  transition: all 150ms ease;
  margin-top: 0.3rem;
}

.catalog-filter__item:hover {
  background: #f5f5f7;
  color: #111;
}

.catalog-filter__item.active {
  background: #111;
  color: #fff;
}

.catalog-filter__item--category {
  justify-content: flex-start;
  gap: 0.4rem;
}

.catalog-filter__item span {
  display: inline-flex;
  align-items: center;
  min-height: 1.1rem;
}

.catalog-filter__item:hover {
  background: #f5f5f7;
  color: #111;
}

.catalog-filter__item.active {
  background: #111;
  color: #fff;
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

.catalog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: clamp(0.8rem, 1.4vw, 1.15rem);
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
  border-radius: 14px;
  background: #f4f4f5;
  transition: background 180ms ease;
}

.catalog-product:hover .catalog-product__media {
  background: #eceef1;
}

.catalog-product__media img {
  transition: transform 300ms ease;
}

.catalog-product:hover .catalog-product__media img {
  transform: scale(1.03);
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
  background: rgba(0, 0, 0, 0.18);
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

  .product-filter-searchrow {
    grid-template-columns: minmax(0, 1fr) 150px auto;
  }

  .product-filter-mobile {
    display: inline-flex;
  }

  .catalog-search {
    width: min(42vw, 360px);
  }

  .catalog-bar {
    grid-template-columns: 1fr;
    align-items: stretch;
  }

  .catalog-controls {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .catalog-filter-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (min-width: 1025px) {
  .catalog-filter-btn {
    display: none;
  }
}

@media (max-width: 760px) {
  .product-filter-title,
  .product-filter-searchrow {
    grid-template-columns: 1fr;
  }

  .product-filter-metrics {
    text-align: left;
  }

  .product-filter-searchrow {
    gap: 0.65rem;
  }

  .product-filter-head {
    padding: 1rem;
    border-radius: 14px;
  }

  .product-filter-quick {
    overflow-x: auto;
    margin-inline: -1rem;
    padding-inline: 1rem;
    padding-bottom: 0.25rem;
    -webkit-overflow-scrolling: touch;
  }

  .product-filter-quick::-webkit-scrollbar {
    display: none;
  }

  .product-filter-quick > div {
    flex-wrap: nowrap;
    min-width: max-content;
  }

  .product-filter-select,
  .product-filter-mobile {
    width: 100%;
  }

  .product-filter-chips {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 0.25rem;
    -webkit-overflow-scrolling: touch;
  }

  .product-filter-chips::-webkit-scrollbar {
    display: none;
  }

  .product-filter-chips button {
    flex: 0 0 auto;
  }

  .catalog-page {
    padding-top: 1rem;
  }

  .catalog-header {
    display: grid;
    align-items: start;
    margin-bottom: 0.75rem;
  }

  .catalog-header h2 {
    font-size: 1.35rem;
  }

  .catalog-bar {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.8rem;
    margin-bottom: 0.85rem;
  }

  .catalog-search {
    width: 100%;
    max-width: none;
    flex: none;
  }

  .catalog-controls {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: minmax(118px, 38vw);
    grid-template-columns: none;
    width: 100%;
    overflow-x: auto;
    padding-bottom: 0.25rem;
    -webkit-overflow-scrolling: touch;
  }

  .catalog-controls::-webkit-scrollbar {
    display: none;
  }

  .catalog-filter-btn {
    min-width: 86px;
  }

  .catalog-range-field {
    min-width: 168px;
  }

  .catalog-active {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 0.25rem;
    -webkit-overflow-scrolling: touch;
  }

  .catalog-active::-webkit-scrollbar {
    display: none;
  }

  .catalog-active-tag,
  .catalog-clear-all {
    flex: 0 0 auto;
  }

  .catalog-quick {
    flex-wrap: nowrap;
    gap: 0.65rem;
    overflow-x: auto;
    margin-inline: calc((100vw - var(--ys-container)) / -2);
    padding-inline: calc((100vw - var(--ys-container)) / 2);
    padding-bottom: 0.25rem;
    -webkit-overflow-scrolling: touch;
  }

  .catalog-quick::-webkit-scrollbar {
    display: none;
  }

  .catalog-quick-group,
  .catalog-quick-items {
    flex-wrap: nowrap;
  }

  .catalog-quick-group,
  .catalog-quick-btn {
    flex: 0 0 auto;
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

/* Flat catalog surfaces */
.catalog-page {
  background: var(--ys-bg);
  color: var(--ys-text);
}

.product-filter-head,
.product-filter-panel {
  border: 0;
  border-radius: var(--ys-radius-lg);
  background: var(--ys-surface);
  box-shadow: none;
}

.product-filter-search,
.product-filter-select,
.product-filter-section input,
.product-filter-panel select,
.catalog-search,
.catalog-range-field {
  border-color: transparent;
  border-radius: var(--ys-radius-md);
  background: var(--ys-surface-soft);
  box-shadow: none;
}

.product-filter-search:focus-within,
.catalog-search:focus-within,
.catalog-range-field:focus-within {
  border-color: transparent;
  background: var(--ys-surface);
  box-shadow: 0 0 0 3px var(--ys-focus-ring);
}

.product-filter-search button,
.product-filter-mobile,
.catalog-search button,
.catalog-empty button,
.catalog-drawer__apply,
.catalog-apply {
  border-radius: var(--ys-radius-sm);
  background: var(--ys-accent);
}

.product-filter-search button:hover,
.product-filter-mobile:hover,
.catalog-search button:hover,
.catalog-empty button:hover,
.catalog-drawer__apply:hover,
.catalog-apply:hover {
  background: #000000;
}

.product-filter-quick button,
.product-filter-pills button,
.product-filter-chips button,
.catalog-active-tag,
.catalog-quick-btn,
.catalog-filter__item,
.catalog-pagination button {
  border: 0;
  border-radius: var(--ys-radius-sm);
  background: var(--ys-surface-soft);
  box-shadow: none;
}

.product-filter-quick button.active,
.product-filter-pills button.active,
.catalog-quick-btn.active,
.catalog-filter__item.active,
.catalog-pagination button.active {
  background: var(--ys-accent);
  color: #fff;
}

.catalog-results,
.catalog-grid {
  gap: clamp(0.9rem, 1.5vw, 1.35rem);
}

.catalog-product__media {
  border: 0;
  border-radius: var(--ys-radius-lg);
  background: var(--ys-surface-soft);
}

.catalog-product__open {
  border: 0;
  border-radius: var(--ys-pill-radius);
  background: var(--ys-accent);
  box-shadow: none;
}

.catalog-product:hover .catalog-product__media {
  background: var(--ys-accent-soft);
}

.catalog-drawer__panel {
  border: 0;
  border-radius: var(--ys-radius-lg);
  box-shadow: var(--ys-shadow-md);
}
</style>
