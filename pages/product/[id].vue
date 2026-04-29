<template>
  <div class="product-detail-page">
    <div v-if="loading" class="product-loading">
      <div></div>
      <p>Loading product concept</p>
    </div>

    <div v-else-if="product" class="product-detail-shell">
      <nav class="product-breadcrumb" aria-label="面包屑导航">
        <NuxtLink to="/">Home</NuxtLink>
        <v-icon size="15">mdi-chevron-right</v-icon>
        <NuxtLink to="/products">POD 商品</NuxtLink>
        <v-icon size="15">mdi-chevron-right</v-icon>
        <span>{{ product.type || "Product Detail" }}</span>
      </nav>

      <section class="product-detail-grid">
        <div
          class="product-gallery"
          :class="{ 'product-gallery--single': productImages.length <= 1 }"
        >
          <div v-if="productImages.length > 1" class="product-thumbs">
            <button
              v-for="(img, index) in productImages"
              :key="img"
              type="button"
              :class="{ active: currentImageIndex === index }"
              @click="setCurrentImage(index)"
            >
              <img :src="img" :alt="`${product.name}-${index + 1}`" />
            </button>
          </div>

          <div class="product-main-frame">
            <button
              v-if="productImages.length > 1"
              type="button"
              class="product-gallery-arrow product-gallery-arrow--left"
              aria-label="上一张图片"
              @click="previousImage"
            >
              <v-icon size="20">mdi-chevron-left</v-icon>
            </button>
            <transition :name="`gallery-${slideDirection}`" mode="out-in">
              <img
                v-if="currentImage"
                :key="currentImage"
                :src="currentImage"
                :alt="product.name"
                class="product-main-image"
                @error="handleImageError"
                @click="openImagePreview"
              />
              <div v-else key="no-image" class="product-no-image">
                Preview coming soon
              </div>
            </transition>
            <button
              v-if="productImages.length > 1"
              type="button"
              class="product-gallery-arrow product-gallery-arrow--right"
              aria-label="下一张图片"
              @click="nextImage"
            >
              <v-icon size="20">mdi-chevron-right</v-icon>
            </button>
          </div>
        </div>

        <aside class="product-buy-panel">
          <div class="product-detail-kicker">
            {{ product.type || "POD Custom Product" }}
          </div>
          <div class="product-title-row">
            <h1>{{ product.name }}</h1>
            <FavoriteButton
              :is-favorite="isFavorite"
              :count="favoriteCount"
              :show-count="false"
              @click="toggleFavorite"
            />
          </div>

          <div class="product-rating-line" aria-label="商品状态">
            <span v-for="i in 5" :key="i">★</span>
            <strong>4.5/5</strong>
            <small v-if="favoriteCount !== null">{{ favoriteCount }} 收藏</small>
          </div>

          <div class="product-price-line">
            <strong>¥{{ productPrice }}</strong>
            <del>¥{{ productOldPrice }}</del>
            <span>-20%</span>
          </div>

          <p class="product-lead">{{ productLead }}</p>

          <div v-if="productKeywords.length" class="product-tags">
            <NuxtLink
              v-for="keyword in productKeywords.slice(0, 8)"
              :key="keyword"
              :to="`/products/${encodeURIComponent(keyword)}`"
            >
              {{ keyword }}
            </NuxtLink>
          </div>

          <div class="product-choice-block">
            <span>Select Colors</span>
            <div class="product-color-options">
              <button
                v-for="color in optionColors"
                :key="color"
                type="button"
                :style="{ backgroundColor: color }"
                :aria-label="`颜色 ${color}`"
              >
                <v-icon v-if="color === '#314d80'" size="14">mdi-check</v-icon>
              </button>
            </div>
          </div>

          <div class="product-choice-block">
            <span>Choose Size</span>
            <div class="product-size-options">
              <button v-for="size in optionSizes" :key="size" type="button">
                {{ size }}
              </button>
            </div>
          </div>

          <div class="product-actions">
            <div class="product-quantity">
              <button type="button" aria-label="减少数量">-</button>
              <strong>1</strong>
              <button type="button" aria-label="增加数量">+</button>
            </div>
            <NuxtLink to="/contact" class="product-primary-action">
              Add to Cart
            </NuxtLink>
            <button type="button" class="product-secondary-action" @click="copyLink">
              <v-icon size="18">mdi-link-variant</v-icon>
              复制链接
            </button>
            <button type="button" class="product-secondary-action" @click="shareProduct">
              <v-icon size="18">mdi-share-variant</v-icon>
              分享
            </button>
          </div>
        </aside>
      </section>

      <section class="product-tabs">
        <nav aria-label="商品详情标签">
          <button type="button" class="active">Product Details</button>
          <button type="button">Rating & Reviews</button>
          <button type="button">FAQs</button>
        </nav>

        <div class="product-review-head">
          <h2>All Reviews <span>({{ reviewCards.length }})</span></h2>
          <button type="button">Write a Review</button>
        </div>

        <div class="product-review-grid">
          <article v-for="review in reviewCards" :key="review.name">
            <div class="product-rating-line">
              <span v-for="i in 5" :key="i">★</span>
            </div>
            <h3>{{ review.name }} <v-icon size="16">mdi-check-decagram</v-icon></h3>
            <p>{{ review.text }}</p>
          </article>
        </div>

        <div class="product-detail-copy">
          <p>{{ productStory }}</p>
          <p>{{ productUsage }}</p>
        </div>
      </section>

      <section v-if="relatedProducts.length" class="product-related">
        <h2>You might also like</h2>
        <div class="product-related-grid">
          <NuxtLink
            v-for="(item, index) in relatedProducts"
            :key="item.id"
            :to="item.href || `/product/${item.id}`"
            class="product-related-card"
          >
            <div>
              <img
                v-if="getRelatedImage(item)"
                :src="getRelatedImage(item)"
                :alt="item.name"
                loading="lazy"
              />
              <span v-else>{{ item.type || "POD" }}</span>
            </div>
            <h3>{{ item.name }}</h3>
            <p>★★★★★ <small>4.5/5</small></p>
            <strong>¥{{ getRelatedPrice(item, index) }}</strong>
          </NuxtLink>
        </div>
      </section>
    </div>

    <div v-else class="product-empty">
      <span>404</span>
      <h2>这个商品暂时不可访问。</h2>
      <p>它可能已经下架，或者链接发生变化。回到商品库继续浏览更稳妥。</p>
      <NuxtLink to="/products">回到商品库</NuxtLink>
    </div>

    <ImagePreview
      v-model="isPreviewOpen"
      :images="productImages"
      :initial-index="currentImageIndex"
      :alt="product?.name || '商品图片'"
      :z-index="9999"
      @image-change="handlePreviewImageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { api } from "~/utils/api";
import ImagePreview from "../components/ImagePreview.vue";
import FavoriteButton from "~/components/FavoriteButton.vue";
import { usePublicUserStore } from "~/stores/public-user";
import { useToast } from "~/composables/use-toast";
import { useProductStructuredData } from "~/composables/use-seo";
import {
  SITE_DEFAULT_IMAGE,
  SITE_OG_NAME,
  SITE_ROBOTS,
  SITE_URL,
} from "~/utils/seo";

const toast = useToast();

definePageMeta({
  layout: "page",
  middleware: "product-or-search",
});

const route = useRoute();
const router = useRouter();
const publicUserStore = usePublicUserStore();

const loading = ref(true);
const product = ref<any>(null);
const relatedProducts = ref<any[]>([]);
const currentImageIndex = ref(0);
const isPreviewOpen = ref(false);
const isFavorite = ref(false);
const favoriteCount = ref<number | null>(null);
const slideDirection = ref<"next" | "prev">("next");

const productImages = computed(() => {
  if (!product.value) return [];
  const images: string[] = [];
  if (product.value.images && Array.isArray(product.value.images)) {
    product.value.images.forEach((url: string) => {
      if (
        url &&
        typeof url === "string" &&
        url.trim() &&
        url.startsWith("http")
      )
        images.push(url);
    });
  }
  return images;
});

const currentImage = computed(() => {
  if (productImages.value.length === 0) return null;
  return productImages.value[currentImageIndex.value] || productImages.value[0];
});

const productKeywords = computed(() => {
  if (!product.value?.keywords) return [];
  return product.value.keywords
    .split(",")
    .map((k: string) => k.trim())
    .filter((k: string) => k.length > 0);
});

const keywordLine = computed(() =>
  productKeywords.value.slice(0, 3).join("、"),
);

const productLead = computed(() => {
  if (!product.value) return "";
  if (product.value.description) return product.value.description;
  return `「${product.value.name}」是一组可继续延展的 POD 商品设计方向，适合用于印花、周边、礼赠或品牌内容展示。`;
});

const productStory = computed(() => {
  if (!product.value) return "";
  if (keywordLine.value)
    return `这组设计围绕「${keywordLine.value}」展开，可以作为单品上新，也可以继续组合成服饰、礼品、家居和品牌周边系列。`;
  return "这组设计保留了继续商品化的空间，可以根据目标人群、材质、工艺和展示场景进一步定制。";
});

const productUsage = computed(() => {
  if (!product.value) return "";
  return "适合用于私人定制、品牌企划、节日礼赠、创作者周边和按需生产商品的视觉起点。";
});

const productPrice = computed(() => {
  const seed =
    Number(String(product.value?.id || "").replace(/\D/g, "").slice(-2)) || 8;
  return 129 + (seed % 8) * 30;
});

const productOldPrice = computed(() => productPrice.value + 80);

const optionColors = ["#4f4631", "#314d80", "#111111"];
const optionSizes = ["Small", "Medium", "Large", "X-Large"];
const reviewCards = [
  {
    name: "M. Studio",
    text: "图案细节和商品展示都很完整，适合继续做品牌周边延展。",
  },
  {
    name: "Y. Creator",
    text: "配色干净，落在 T 恤、帆布包和礼赠套装上都比较稳。",
  },
];

const fallbackRelatedProducts = computed(() => {
  const baseImage = productImages.value[0] || "";
  const fallbackKeywords = productKeywords.value.length
    ? productKeywords.value
    : ["印花", "礼物", "家居", "T恤"];

  return [
    {
      id: "fallback-pod-print",
      href: `/products/${encodeURIComponent(fallbackKeywords[0] || "印花")}`,
      name: "POD Print Capsule",
      type: "POD PRINT",
      images: baseImage ? [baseImage] : [],
    },
    {
      id: "fallback-custom-gift",
      href: "/products/礼物",
      name: "Custom Gift Series",
      type: "CUSTOM GIFT",
      images: [],
    },
    {
      id: "fallback-home-goods",
      href: "/products/家居",
      name: "Home Goods Direction",
      type: "HOME DECOR",
      images: [],
    },
    {
      id: "fallback-apparel",
      href: "/products/T恤",
      name: "Apparel Print Mood",
      type: "APPAREL",
      images: [],
    },
  ];
});

const setFallbackRelatedProducts = () => {
  relatedProducts.value = fallbackRelatedProducts.value;
};

const hasPreviousProduct = computed(() => false);
const hasNextProduct = computed(() => false);
const isLoggedIn = computed(() => publicUserStore.isLoggedIn);

const productSeoTitle = computed(() =>
  product.value?.name
    ? `${product.value.name} - POD 定制商品与印花设计灵感 - 衣设`
    : "POD 商品详情 - 衣设 yishe",
);

const productSeoDescription = computed(
  () =>
    product.value?.description ||
    productLead.value ||
    "查看 POD 定制商品的图案、场景、灵感说明和设计方向。",
);

const productSeoImage = computed(
  () => productImages.value[0] || SITE_DEFAULT_IMAGE,
);

const productSeoUrl = computed(
  () => `${SITE_URL}/product/${route.params.id || ""}`,
);

const productSeoKeywords = computed(
  () =>
    productKeywords.value.join(",") ||
    "POD商品,印花设计,定制商品,图案设计,私人定制",
);

const productStructuredDataJson = computed(() => {
  if (!product.value) return "";
  return JSON.stringify(
    useProductStructuredData({
      name: product.value.name || "POD 定制商品",
      description: productSeoDescription.value,
      image: productSeoImage.value,
      url: productSeoUrl.value,
      category: product.value.type || "POD 定制商品",
    }),
  );
});

useSeoMeta({
  title: () => productSeoTitle.value,
  description: () => productSeoDescription.value,
  keywords: () => productSeoKeywords.value,
  ogTitle: () => productSeoTitle.value,
  ogDescription: () => productSeoDescription.value,
  ogImage: () => productSeoImage.value,
  ogUrl: () => productSeoUrl.value,
  ogType: "product",
  ogSiteName: SITE_OG_NAME,
  ogLocale: "zh_CN",
  twitterCard: "summary_large_image",
  twitterTitle: () => productSeoTitle.value,
  twitterDescription: () => productSeoDescription.value,
  twitterImage: () => productSeoImage.value,
  robots: SITE_ROBOTS,
});

useHead(() => ({
  link: [{ rel: "canonical", href: productSeoUrl.value }],
  script: productStructuredDataJson.value
    ? [
        {
          type: "application/ld+json",
          children: productStructuredDataJson.value,
        },
      ]
    : [],
}));

const fetchProductDetail = async () => {
  loading.value = true;
  try {
    const response = await api.productList.getById(route.params.id, false);
    if (
      response.code === 0 ||
      response.status === true ||
      response.code === 200
    ) {
      product.value = response.data;
      currentImageIndex.value = 0;
      setFallbackRelatedProducts();
      await Promise.all([checkFavoriteStatus(), fetchFavoriteCount()]);
    } else {
      product.value = null;
    }
  } catch (error) {
    console.error("获取商品详情失败:", error);
    product.value = null;
  } finally {
    loading.value = false;
  }
};

const checkFavoriteStatus = async () => {
  if (!isLoggedIn.value || !product.value?.id) return;
  try {
    const response = await api.favorite.check(product.value.id);
    if (
      response.code === 0 ||
      response.status === true ||
      response.code === 200
    ) {
      isFavorite.value = response.data === true;
    }
  } catch (error) {
    console.error("检查收藏状态失败:", error);
  }
};

const fetchFavoriteCount = async () => {
  if (!product.value?.id) return;
  try {
    const response = await api.favorite.getProductCount(product.value.id);
    if (
      response.code === 0 ||
      response.status === true ||
      response.code === 200
    ) {
      favoriteCount.value = response.data;
    }
  } catch (error) {
    console.error("获取收藏数量失败:", error);
  }
};

const fetchRelatedProducts = async () => {
  try {
    const request = (searchText?: string) =>
      api.productList.getPage({
        page: 1,
        pageSize: 5,
        isPublish: true,
        includeRelations: false,
        searchText,
      });

    let response = await request(
      product.value?.type || productKeywords.value[0] || undefined,
    );

    if (
      response.code === 0 ||
      response.status === true ||
      response.code === 200
    ) {
      let list = ((response.data as any)?.list || []).filter(
        (item: any) => item.id !== product.value?.id,
      );

      if (list.length < 4) {
        response = await request();
        if (
          response.code === 0 ||
          response.status === true ||
          response.code === 200
        ) {
          list = ((response.data as any)?.list || []).filter(
            (item: any) => item.id !== product.value?.id,
          );
        }
      }

      relatedProducts.value = list.slice(0, 4);
      if (relatedProducts.value.length === 0) {
        relatedProducts.value = fallbackRelatedProducts.value;
      }
    }
  } catch (error) {
    console.error("获取相关推荐失败:", error);
    relatedProducts.value = fallbackRelatedProducts.value;
  }
};

const getRelatedImage = (item: any) => {
  if (!Array.isArray(item?.images)) return "";
  return item.images.find((url: string) => url && url.startsWith("http")) || "";
};

const getRelatedPrice = (item: any, index = 0) => {
  const seed =
    Number(String(item?.id || index).replace(/\D/g, "").slice(-2)) ||
    index + 7;
  return 99 + (seed % 8) * 20;
};

const toggleFavorite = async () => {
  if (!product.value?.id) return;
  if (!isLoggedIn.value) {
    router.push("/login");
    return;
  }

  const previousFavoriteState = isFavorite.value;
  const previousCount = favoriteCount.value;
  isFavorite.value = !isFavorite.value;

  if (isFavorite.value) {
    favoriteCount.value =
      favoriteCount.value !== null ? favoriteCount.value + 1 : 1;
  } else if (favoriteCount.value !== null && favoriteCount.value > 0) {
    favoriteCount.value -= 1;
  }

  try {
    if (previousFavoriteState) {
      const response = await api.favorite.remove(product.value.id);
      if (
        response.code !== 0 &&
        response.status !== true &&
        response.code !== 200
      ) {
        isFavorite.value = previousFavoriteState;
        favoriteCount.value = previousCount;
        toast.error(response.message || "取消收藏失败");
      }
    } else {
      const response = await api.favorite.create({
        productId: product.value.id,
      });
      if (
        response.code !== 0 &&
        response.status !== true &&
        response.code !== 200
      ) {
        isFavorite.value = previousFavoriteState;
        favoriteCount.value = previousCount;
        if (response.code === 409) toast.warning("这件你已经留过了");
        else toast.error(response.message || "这次没留住，再点一次");
      }
    }
  } catch (error: any) {
    isFavorite.value = previousFavoriteState;
    favoriteCount.value = previousCount;
    if (error.code === 401 || error.statusCode === 401) {
      publicUserStore.clearToken();
      toast.error("登录状态过期了", "重新进一下就好。");
      router.push("/login");
    } else if (error.code === 500 || error.statusCode === 500) {
      toast.error(error.message || "服务器有点忙，等会儿再试");
    } else {
      toast.error(error.message || "这次没成功，等会儿再试");
    }
  }
};

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.style.display = "none";
};

const setCurrentImage = (index: number) => {
  if (productImages.value.length === 0 || index === currentImageIndex.value)
    return;
  slideDirection.value = index > currentImageIndex.value ? "next" : "prev";
  currentImageIndex.value = index;
};

const previousImage = () => {
  if (productImages.value.length > 0) {
    const nextIndex =
      (currentImageIndex.value - 1 + productImages.value.length) %
      productImages.value.length;
    slideDirection.value = "prev";
    currentImageIndex.value = nextIndex;
  }
};

const nextImage = () => {
  if (productImages.value.length > 0) {
    const nextIndex =
      (currentImageIndex.value + 1) % productImages.value.length;
    slideDirection.value = "next";
    currentImageIndex.value = nextIndex;
  }
};

const copyLink = async () => {
  try {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    toast.success("已经复制好了", "链接在剪贴板里。");
  } catch (error) {
    console.error("复制链接失败:", error);
  }
};

const shareProduct = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: product.value?.name || "商品详情",
        text: product.value?.description || "",
        url: window.location.href,
      });
    } catch (error) {
      console.error("分享失败:", error);
    }
  } else {
    copyLink();
  }
};

const navigateToPrevious = () => {};
const navigateToNext = () => {};

const openImagePreview = () => {
  if (productImages.value.length === 0) return;
  isPreviewOpen.value = true;
};

const handlePreviewImageChange = (index: number) => {
  setCurrentImage(index);
};

watch(
  () => route.params.id,
  async () => {
    if (route.params.id) await fetchProductDetail();
  },
  { immediate: false },
);

if (route.params.id) {
  await fetchProductDetail();
}

onMounted(() => {
  if (product.value?.id) fetchRelatedProducts();
});
</script>

<style scoped>
.product-detail-page {
  min-height: 100vh;
  background: #fff;
  color: #111;
  padding: 1.35rem 0 clamp(3rem, 6vw, 5rem);
}

.product-detail-shell {
  width: var(--ys-container);
  margin: 0 auto;
}

.product-breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.55rem;
  min-height: 3rem;
  color: #777;
  font-size: 0.82rem;
}

.product-breadcrumb a {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  border: 0;
  background: transparent;
  color: #555;
  text-decoration: none;
  font-weight: 700;
}

.product-detail-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(390px, 0.95fr);
  gap: clamp(1.3rem, 3vw, 2.6rem);
  align-items: start;
  margin-top: 1rem;
}

.product-gallery {
  display: grid;
  grid-template-columns: 152px minmax(0, 1fr);
  align-items: start;
  gap: 1rem;
}

.product-gallery--single {
  grid-template-columns: minmax(0, 1fr);
}

.product-thumbs {
  display: grid;
  grid-template-columns: minmax(0, calc(100% - 0.68rem));
  align-content: start;
  justify-content: start;
  gap: 0.85rem;
  max-height: clamp(440px, 42vw, 620px);
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  padding: 0 0.68rem 0 0;
  scrollbar-gutter: stable;
  scrollbar-width: none;
}

.product-thumbs::-webkit-scrollbar {
  width: 1px;
  height: 0;
}

.product-thumbs::-webkit-scrollbar-track {
  background: transparent;
}

.product-thumbs::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.2);
}

.product-thumbs::-webkit-scrollbar-corner {
  background: transparent;
}

.product-thumbs button {
  display: grid;
  place-items: center;
  width: 100%;
  min-width: 0;
  aspect-ratio: 1;
  overflow: hidden;
  border: 1px solid transparent;
  min-height: auto;
  border-radius: 20px;
  background: #f0f0f0;
  padding: 0;
}

.product-thumbs button.active {
  border-color: #111;
}

.product-thumbs img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-main-frame {
  position: relative;
  display: grid;
  place-items: center;
  align-self: start;
  width: 100%;
  min-height: clamp(440px, 42vw, 620px);
  overflow: hidden;
  border-radius: 20px;
  background: #f1f1f1;
}

.product-main-frame > * {
  grid-area: 1 / 1;
}

.product-main-image {
  width: min(82%, 720px);
  max-height: min(68vh, 620px);
  object-fit: contain;
  cursor: zoom-in;
  filter: drop-shadow(0 24px 34px rgba(0, 0, 0, 0.12));
  transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
}

.product-gallery--single .product-main-frame {
  min-height: clamp(390px, 38vw, 560px);
}

.product-gallery--single .product-main-image {
  width: min(92%, 760px);
  max-height: min(58vh, 520px);
}

.product-main-frame:hover .product-main-image {
  transform: scale(1.025);
}

.product-no-image {
  display: grid;
  place-items: center;
  color: #777;
  font-size: 0.86rem;
}

.product-gallery-arrow {
  position: absolute;
  z-index: 4;
  display: grid;
  place-items: center;
  width: 2.7rem;
  height: 2.7rem;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  color: #111;
}

.product-gallery-arrow--left {
  left: 1rem;
}

.product-gallery-arrow--right {
  right: 1rem;
}

.product-buy-panel {
  position: sticky;
  top: 104px;
  display: grid;
  gap: 1.15rem;
}

.product-detail-kicker {
  color: #666;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

.product-title-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 1rem;
  align-items: start;
}

.product-title-row h1 {
  margin: 0;
  color: #050505;
  font-size: clamp(2.2rem, 4vw, 3.25rem);
  line-height: 0.96;
  text-transform: uppercase;
}

.product-rating-line {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.45rem;
  color: #f5b301;
  font-size: 0.9rem;
}

.product-rating-line strong,
.product-rating-line small {
  color: #555;
  font-size: 0.82rem;
}

.product-lead {
  margin: 0;
  color: #555;
  font-size: 0.98rem;
  line-height: 1.9;
}

.product-price-line {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.product-price-line strong,
.product-price-line del {
  font-size: clamp(1.65rem, 3vw, 2rem);
  line-height: 1;
  font-weight: 900;
}

.product-price-line del {
  color: rgba(0, 0, 0, 0.36);
}

.product-price-line span {
  display: inline-flex;
  align-items: center;
  min-height: 1.75rem;
  border-radius: 999px;
  background: rgba(255, 51, 51, 0.1);
  color: #ff3333;
  font-size: 0.78rem;
  font-weight: 900;
  padding: 0 0.7rem;
}

.product-tags,
.product-next-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.product-tags a,
.product-next-links a {
  display: inline-flex;
  align-items: center;
  min-height: 2.15rem;
  border: 1px solid #ececec;
  border-radius: 999px;
  background: #f7f7f7;
  color: #333;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0 0.85rem;
  text-decoration: none;
}

.product-tags a:hover,
.product-next-links a:hover {
  background: #111;
  color: #fff;
}

.product-choice-block {
  display: grid;
  gap: 0.85rem;
  padding-top: 1rem;
  border-top: 1px solid #eeeeee;
}

.product-choice-block > span {
  color: #777;
  font-size: 0.9rem;
}

.product-color-options,
.product-size-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.product-color-options button {
  display: grid;
  place-items: center;
  width: 37px;
  height: 37px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 50%;
  color: #fff;
}

.product-size-options button {
  min-height: 2.9rem;
  border: 0;
  border-radius: 999px;
  background: #f0f0f0;
  color: rgba(0, 0, 0, 0.62);
  padding: 0 1.45rem;
}

.product-size-options button:hover,
.product-size-options button:first-child {
  background: #000;
  color: #fff;
}

.product-actions {
  display: grid;
  grid-template-columns: 170px minmax(0, 1fr);
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid #eeeeee;
}

.product-primary-action {
  grid-column: auto;
}

.product-primary-action,
.product-quantity,
.product-secondary-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  min-height: 3.35rem;
  border-radius: 999px;
  font-size: 0.88rem;
  font-weight: 800;
  text-decoration: none;
}

.product-primary-action {
  border: 0;
  background: #000;
  color: #fff;
}

.product-secondary-action {
  border: 1px solid #e9e9e9;
  background: #fff;
  color: #111;
}

.product-quantity {
  justify-content: space-between;
  border-radius: 999px;
  background: #f0f0f0;
  padding: 0 0.9rem;
}

.product-quantity button {
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border: 0;
  background: transparent;
  color: #111;
  font-size: 1.25rem;
}

.product-tabs,
.product-related {
  margin-top: clamp(2.5rem, 6vw, 5rem);
}

.product-tabs nav {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-bottom: 1px solid #eeeeee;
}

.product-tabs nav button {
  min-height: 3.6rem;
  border: 0;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: rgba(0, 0, 0, 0.55);
  font-size: 1rem;
}

.product-tabs nav button.active {
  border-color: #000;
  color: #111;
  font-weight: 800;
}

.product-review-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.55rem;
}

.product-review-head h2,
.product-related h2 {
  margin: 0;
  color: #000;
  font-size: clamp(1.7rem, 4vw, 3rem);
  line-height: 1;
  text-transform: uppercase;
}

.product-review-head h2 span {
  color: rgba(0, 0, 0, 0.5);
  font-size: 1rem;
}

.product-review-head button {
  min-height: 3rem;
  border: 0;
  border-radius: 999px;
  background: #000;
  color: #fff;
  font-weight: 800;
  padding: 0 1.2rem;
}

.product-review-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1.25rem;
}

.product-review-grid article {
  min-height: 220px;
  border: 1px solid #eeeeee;
  border-radius: 20px;
  padding: 1.35rem;
}

.product-review-grid h3 {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin: 0.7rem 0 0;
  font-size: 1.05rem;
}

.product-review-grid h3 .v-icon {
  color: #01ab31;
}

.product-review-grid p,
.product-detail-copy p {
  color: #555;
  line-height: 1.8;
}

.product-detail-copy {
  display: grid;
  gap: 0.45rem;
  margin-top: 1.2rem;
  border-radius: 20px;
  background: #f7f7f7;
  padding: 1.35rem;
}

.product-related-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.25rem;
  margin-top: 1.6rem;
}

.product-related-card {
  color: inherit;
  text-decoration: none;
}

.product-related-card > div {
  display: grid;
  place-items: center;
  aspect-ratio: 0.82;
  overflow: hidden;
  border-radius: 20px;
  background: #f0f0f0;
}

.product-related-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
}

.product-related-card:hover img {
  transform: scale(1.045);
}

.product-related-card h3 {
  margin: 0.85rem 0 0;
  font-size: 1rem;
  line-height: 1.35;
}

.product-related-card p {
  margin: 0.35rem 0 0;
  color: #ffc633;
  font-size: 0.88rem;
}

.product-related-card p small {
  color: #555;
}

.product-related-card strong {
  display: block;
  margin-top: 0.35rem;
  font-size: 1.25rem;
}

.product-loading,
.product-empty {
  display: grid;
  place-items: center;
  min-height: 62vh;
  text-align: center;
}

.product-loading div {
  width: 2.5rem;
  height: 2.5rem;
  border: 2px solid #ececec;
  border-top-color: #111;
  border-radius: 999px;
  animation: product-spin 760ms linear infinite;
}

.product-loading p {
  margin-top: 1rem;
  color: #777;
  font-size: 0.8rem;
  text-transform: uppercase;
}

.product-empty {
  max-width: 680px;
  margin: 0 auto;
}

.product-empty span {
  color: #999;
  font-size: 0.8rem;
  font-weight: 800;
}

.product-empty h2 {
  margin: 0.8rem 0 0;
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1;
}

.product-empty p {
  color: #666;
  line-height: 1.8;
}

.product-empty a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 3rem;
  margin-top: 1rem;
  border-radius: 999px;
  background: #000;
  color: #fff;
  font-weight: 800;
  padding: 0 1.4rem;
  text-decoration: none;
}

.gallery-next-enter-active,
.gallery-next-leave-active,
.gallery-prev-enter-active,
.gallery-prev-leave-active {
  transition:
    transform 0.32s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.32s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.32s cubic-bezier(0.22, 1, 0.36, 1);
}

.gallery-next-enter-from {
  opacity: 0;
  transform: translate3d(32px, 0, 0) scale(0.985);
  filter: blur(4px);
}

.gallery-next-leave-to {
  opacity: 0;
  transform: translate3d(-32px, 0, 0) scale(1.01);
  filter: blur(4px);
}

.gallery-prev-enter-from {
  opacity: 0;
  transform: translate3d(-32px, 0, 0) scale(0.985);
  filter: blur(4px);
}

.gallery-prev-leave-to {
  opacity: 0;
  transform: translate3d(32px, 0, 0) scale(1.01);
  filter: blur(4px);
}

.gallery-next-enter-to,
.gallery-next-leave-from,
.gallery-prev-enter-to,
.gallery-prev-leave-from {
  opacity: 1;
  transform: translate3d(0, 0, 0) scale(1);
  filter: blur(0);
}

@keyframes product-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 1080px) {
  .product-detail-grid {
    grid-template-columns: 1fr;
  }

  .product-related-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .product-buy-panel {
    position: static;
  }
}

@media (max-width: 720px) {
  .product-detail-page {
    padding-top: 1rem;
  }

  .product-gallery {
    grid-template-columns: 1fr;
  }

  .product-thumbs {
    order: 2;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    max-height: none;
    overflow: visible;
    padding: 0;
  }

  .product-thumbs button {
    min-height: auto;
  }

  .product-main-frame {
    min-height: 420px;
    border-radius: 1.2rem;
  }

  .product-title-row {
    grid-template-columns: 1fr;
  }

  .product-actions {
    grid-template-columns: 1fr;
  }

  .product-review-grid,
  .product-tabs nav {
    grid-template-columns: 1fr;
  }

  .product-related-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.9rem;
  }

  .product-review-head {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
