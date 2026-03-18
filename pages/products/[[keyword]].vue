<script lang="ts" setup>
import { ref, onMounted, computed, watch } from "vue";
import { api } from "../../utils/api";
import { getPreviewImageUrl } from "../../utils/image";

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

const recommendedKeywords = [
  "法式花卉",
  "联名系列",
  "T恤",
  "礼物",
  "家居",
  "手机壳",
];
const showFilters = ref<boolean>(false);

const initFromQuery = () => {
  const decodedKeyword = getDecodedKeyword();
  if (decodedKeyword) searchKeyword.value = decodedKeyword;
  const query = route.query;
  if (query.start) startDate.value = String(query.start);
  if (query.end) endDate.value = String(query.end);
  if (query.page) currentPage.value = Number(query.page) || 1;
};

const fetchProducts = async () => {
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
    productList.value = [];
    total.value = 0;
  } finally {
    loading.value = false;
  }
};

const updateQuery = () => {
  const query: any = {};
  if (startDate.value) query.start = startDate.value;
  if (endDate.value) query.end = endDate.value;
  if (currentPage.value > 1) query.page = currentPage.value;

  if (searchKeyword.value && searchKeyword.value.trim()) {
    const encodedKeyword = encodeURIComponent(searchKeyword.value.trim());
    router.push({ path: `/products/${encodedKeyword}`, query });
  } else {
    router.push({ path: "/products", query });
  }
};

const handleSearch = () => {
  currentPage.value = 1;
  updateQuery();
  fetchProducts();
};

const resetFilters = () => {
  searchKeyword.value = "";
  startDate.value = "";
  endDate.value = "";
  currentPage.value = 1;
  router.push("/products");
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
  updateQuery();
  fetchProducts();
  window.scrollTo({ top: 0, behavior: "smooth" });
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
  const keyword = searchKeyword.value || getDecodedKeyword();
  return keyword ? `${keyword} - 衣设商品列表` : "商品列表 - 衣设";
});

const pageDescription = computed(() => {
  const keyword = searchKeyword.value || getDecodedKeyword();
  return keyword
    ? `看看和“${keyword}”有关的商品与设计表达。`
    : "浏览衣设里的商品与设计内容，找到更像你的一件。";
});

useHead({
  titleTemplate: "",
  title: pageTitle,
  meta: [{ name: "description", content: pageDescription }],
});

watch(
  () => route.params.keyword,
  (newKeyword) => {
    const keywordValue = Array.isArray(newKeyword) ? newKeyword[0] : newKeyword;
    if (keywordValue) {
      try {
        const decoded =
          typeof keywordValue === "string"
            ? decodeURIComponent(keywordValue)
            : String(keywordValue);
        if (decoded !== searchKeyword.value) {
          searchKeyword.value = decoded;
          currentPage.value = 1;
          fetchProducts();
        }
      } catch {
        searchKeyword.value = String(keywordValue);
        currentPage.value = 1;
        fetchProducts();
      }
    } else if (searchKeyword.value) {
      searchKeyword.value = "";
      currentPage.value = 1;
      fetchProducts();
    }
  },
  { immediate: true },
);

watch(
  () => route.query,
  () => {
    initFromQuery();
    fetchProducts();
  },
  { deep: true },
);

const initialKeyword = getDecodedKeyword();
if (initialKeyword) searchKeyword.value = initialKeyword;

onMounted(() => {
  const keyword = getDecodedKeyword();
  if (keyword && keyword !== searchKeyword.value) searchKeyword.value = keyword;
  initFromQuery();
  fetchProducts();
});
</script>

<template>
  <div class="min-h-screen bg-[#f7f5f2] px-4 py-8 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-[1560px]">
      <div class="mx-auto max-w-2xl text-center">
        <div class="text-[10px] uppercase tracking-[0.24em] text-stone-400">
          Catalog
        </div>
        <h1 class="mt-3 text-[30px] font-semibold text-stone-950">
          先看看哪件像你
        </h1>
        <p class="mt-2 text-[13px] leading-6 text-stone-500">
          这里放的是衣设当前能直接浏览的商品和设计内容。逛的时候不用太快，停住的那件通常有点准。
        </p>
      </div>

      <div
        class="sticky top-[58px] z-20 mt-6 rounded-[1.25rem] border border-stone-200 bg-white p-4 sm:p-5"
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
              placeholder="搜一个你现在想穿、想送、想试试的词"
              class="ys-field w-full rounded-xl bg-[#faf8f5] py-3 pl-11 pr-4 text-[13px] outline-none transition duration-200"
              @keyup.enter="handleSearch"
            />
          </div>
          <div class="flex gap-2">
            <button
              class="ys-action-btn rounded-xl px-4 py-3 text-[12px] transition duration-200 hover:-translate-y-[1px] active:translate-y-0"
              @click="toggleFilters"
            >
              {{ showFilters ? "先收起来" : "挑一挑" }}
            </button>
            <BaseButton
              size="lg"
              class="!px-5 !py-3 !text-[12px]"
              @click="handleSearch"
              >去找找</BaseButton
            >
          </div>
        </div>

        <div class="mt-3 flex flex-wrap items-center gap-2">
          <button
            v-for="keyword in recommendedKeywords"
            :key="keyword"
            class="ys-chip rounded-full px-3 py-1 text-[11px] transition duration-200 hover:-translate-y-[1px]"
            @click="handleKeywordClick(keyword)"
          >
            {{ keyword }}
          </button>
          <button
            class="ml-auto text-[11px] text-stone-400 transition duration-200 hover:text-stone-900"
            @click="resetFilters"
          >
            清掉重来
          </button>
        </div>

        <div
          v-if="showFilters"
          class="mt-4 grid gap-3 border-t border-stone-100 pt-4 sm:grid-cols-[1fr_1fr_auto] sm:items-center"
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
            重新选
          </button>
        </div>
      </div>

      <div class="mt-6">
        <div
          v-if="loading"
          class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6"
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
          class="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6"
        >
          <article
            v-for="product in productList"
            :key="product.id"
            class="group cursor-pointer bg-transparent"
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
                    :alt="product.name || '商品图片'"
                    class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.025]"
                    @error="handleImageError($event, product)"
                    @load="handleImageLoad"
                  />
                  <div
                    class="image-placeholder absolute inset-0 hidden items-center justify-center bg-stone-100 text-[12px] text-stone-400"
                  >
                    这张图还没放上来
                  </div>
                </template>
                <div
                  v-else
                  class="absolute inset-0 flex items-center justify-center bg-stone-100 text-[12px] text-stone-400"
                >
                  这张图还没放上来
                </div>
              </div>
            </div>
            <div class="mt-3 px-0.5">
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
                class="mt-2 text-[10px] uppercase tracking-[0.16em] text-stone-300"
              >
                {{ product.code }}
              </div>
            </div>
          </article>
        </div>

        <div v-else class="py-20 text-center">
          <p class="text-[13px] text-stone-500">
            这一页还没出现让人停下来的东西，换个词试试。
          </p>
          <button
            class="ys-action-btn mt-5 rounded-xl px-5 py-3 text-[12px] transition"
            @click="resetFilters"
          >
            换个方向
          </button>
        </div>

        <div
          v-if="!loading && totalPages > 1 && productList.length > 0"
          class="mt-10 flex flex-col items-center gap-4 border-t border-stone-100 pt-6"
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
