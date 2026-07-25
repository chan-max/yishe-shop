<template>
  <div class="product-detail-page">
    <div v-if="loading" class="product-loading">
      <div></div>
      <p>加载商品信息</p>
    </div>

    <div v-else-if="product" class="product-detail-shell">
      <nav class="product-breadcrumb" aria-label="面包屑导航">
        <NuxtLink to="/">首页</NuxtLink>
        <span class="ui-icon" aria-hidden="true">/</span>
        <NuxtLink to="/products">POD 商品</NuxtLink>
        <span class="ui-icon" aria-hidden="true">/</span>
        <span>{{ product.type || "未识别" }}</span>
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
            <div class="product-frame-mark" aria-hidden="true">
              <span>{{ product.type || "未识别" }}</span>
              <small v-if="productImages.length">
                {{ String(currentImageIndex + 1).padStart(2, "0") }} /
                {{ String(productImages.length).padStart(2, "0") }}
              </small>
            </div>
            <button
              v-if="productImages.length > 1"
              type="button"
              class="product-gallery-arrow product-gallery-arrow--left"
              aria-label="上一张图片"
              @click="previousImage"
            >
              <AppIcon name="chevron-left" class="ui-icon" :size="17" aria-hidden="true" />
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
                预览图即将上线
              </div>
            </transition>
            <button
              v-if="productImages.length > 1"
              type="button"
              class="product-gallery-arrow product-gallery-arrow--right"
              aria-label="下一张图片"
              @click="nextImage"
            >
              <AppIcon name="chevron-right" class="ui-icon" :size="17" aria-hidden="true" />
            </button>
          </div>
        </div>

        <aside class="product-buy-panel">
          <!-- 顶部 Clean Pills (无 Emoji) -->
          <div class="product-header-meta">
            <div class="product-meta-pills">
              <span v-if="product.inventoryStatus" class="product-pill product-pill--green">
                {{ product.inventoryStatus === 'in_stock' ? '现货在售' : product.inventoryStatus === 'out_of_stock' ? '暂时缺货' : product.inventoryStatus }}
              </span>
              <span class="product-pill product-pill--gray">
                编码: {{ product.code || product.sku || product.id }}
              </span>
            </div>
            <FavoriteButton
              :is-favorite="isFavorite"
              :count="favoriteCount"
              :show-count="true"
              @click="toggleFavorite"
            />
          </div>

          <!-- 分类 & 标题 -->
          <div class="product-detail-kicker">
            {{ product.type || "POD 定制商品" }}
          </div>

          <div class="product-title-row">
            <h1>{{ product.name }}</h1>
          </div>



          <!-- 商品详情与描述块 (置于右侧面板) -->
          <div class="product-detail-box">
            <div class="product-detail-box-header">商品详情</div>
            <div class="product-detail-box-content">
              <p v-if="productLead">{{ productLead }}</p>
              <p v-if="productStory && productStory !== productLead">{{ productStory }}</p>
              <p v-if="productUsage">{{ productUsage }}</p>
            </div>

            <dl v-if="productSpecItems.length" class="product-detail-box-specs">
              <template v-for="item in productSpecItems" :key="item.label">
                <dt>{{ item.label }}</dt>
                <dd>{{ item.value }}</dd>
              </template>
            </dl>

            <dl v-if="productAttributeItems.length" class="product-detail-box-specs">
              <template v-for="item in productAttributeItems" :key="item.label">
                <dt>{{ item.label }}</dt>
                <dd>{{ item.value }}</dd>
              </template>
            </dl>
          </div>

          <!-- 右侧卡片：价格与核心定制入口 -->
          <div class="product-action-card">
            <!-- 价格展示 -->
            <div v-if="hasProductPrice" class="product-price-section">
              <div class="product-price-main">
                <span class="product-price-currency">¥</span>
                <strong class="product-price-amount">{{ productPrice }}</strong>
                <del v-if="productOldPrice" class="product-price-del">¥{{ productOldPrice }}</del>
              </div>
              <div class="product-guarantee-tag">
                <svg class="ui-icon-check" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <span>支持同款复刻与私人专属设计定制</span>
              </div>
            </div>

            <!-- 设计入口主按钮：设计同款 -->
            <NuxtLink :to="designSameHref" class="product-primary-btn">
              设计同款
            </NuxtLink>

            <!-- 快捷定制入口按钮组 (设计同款 / 设计相似款 / 咨询设计师) -->
            <div class="product-secondary-actions-grid">
              <NuxtLink :to="designSameHref" class="product-secondary-btn">
                设计相似款
              </NuxtLink>
              <NuxtLink to="/contact" class="product-secondary-btn">
                咨询设计师定制
              </NuxtLink>
              <button type="button" class="product-secondary-btn" @click="copyLink">
                复制链接 / 分享
              </button>
            </div>

            <!-- 设计与定制特色说明 -->
            <div class="product-service-grid">
              <div class="product-service-box">
                <strong>灵感复刻</strong>
                <small>支持同款 / 相似款</small>
              </div>
              <div class="product-service-box">
                <strong>私享定制</strong>
                <small>1对1 设计师沟通</small>
              </div>
              <div class="product-service-box">
                <strong>自由改装</strong>
                <small>载体图案灵活换</small>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <!-- Mobile Sticky Bottom Action Bar -->
      <div class="product-mobile-bottom-bar">
        <NuxtLink :to="designSameHref" class="product-mobile-action-primary">
          <AppIcon name="palette" class="ui-icon" :size="15" aria-hidden="true" />
          免费在线设计同款
        </NuxtLink>
        <NuxtLink to="/contact" class="product-mobile-action-secondary">
          咨询按需定制
        </NuxtLink>
      </div>

      <section v-if="relatedProducts.length" class="product-related">
        <h2>你可能还喜欢</h2>
        <div class="product-related-grid">
          <NuxtLink
            v-for="item in relatedProducts"
            :key="item.id"
            :to="item.href || getProductPath(item)"
            class="product-related-card"
          >
            <div>
              <img
                v-if="getRelatedImage(item)"
                :src="getRelatedImage(item)"
                :alt="item.name"
                loading="lazy"
              />
              <span v-else>{{ item.type || "未识别" }}</span>
            </div>
            <h3>{{ item.name }}</h3>
            <p v-if="item.type">{{ item.type }}</p>
            <strong v-if="getRelatedPrice(item)">¥{{ getRelatedPrice(item) }}</strong>
          </NuxtLink>
        </div>
      </section>

      <!-- 独立站买家商品评价与评论社区 -->
      <ProductComments
        v-if="product?.id"
        :target-id="String(product.id)"
        target-type="product"
      />
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
import { useUserBehaviorLog } from "~/composables/use-user-behavior-log";
import { useProductStructuredData, useBreadcrumbStructuredData } from "~/composables/use-seo";
import { getProductAbsoluteUrl, getProductPath } from "~/utils/product-url";
import { isPublishedProduct } from "~/utils/product-indexing";
import { serializeStructuredData } from "~/utils/structured-data";
import {
  SITE_DEFAULT_IMAGE,
  SITE_LOCALE,
  SITE_OG_NAME,
  SITE_OG_LOCALE,
  SITE_ROBOTS,
  SITE_URL,
} from "~/utils/seo";

const toast = useToast();
const { reportBehaviorLog } = useUserBehaviorLog();

definePageMeta({
  layout: "page",
  middleware: "product-or-search",
  alias: ["/product/:id/:slug?"],
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
  const values = [
    product.value.type,
    product.value.brand,
    product.value.material,
    keywordLine.value,
  ].filter(Boolean);
  if (!values.length) return "";
  return `已收录信息：${values.join(" / ")}。`;
});

const formatPrice = (value: unknown) => {
  const price = Number(value || 0);
  if (!Number.isFinite(price) || price <= 0) return "";
  return Number(price.toFixed(2)).toString();
};

const hasProductPrice = computed(
  () => Boolean(formatPrice(product.value?.salePrice || product.value?.price)),
);

const productPrice = computed(() => {
  return formatPrice(product.value?.salePrice || product.value?.price);
});

const productOldPrice = computed(() => {
  const compareAtPrice = formatPrice(product.value?.compareAtPrice);
  if (compareAtPrice) return compareAtPrice;
  const price = Number(product.value?.price || 0);
  const salePrice = Number(product.value?.salePrice || 0);
  if (price > salePrice && salePrice > 0) return formatPrice(price);
  return "";
});

const formatMetaValue = (value: unknown) => {
  if (value === null || value === undefined || value === "") return "";
  if (Array.isArray(value)) return value.map(formatMetaValue).filter(Boolean).join("、");
  if (typeof value === "object") {
    return Object.entries(value as Record<string, unknown>)
      .map(([key, entryValue]) => `${key}: ${formatMetaValue(entryValue)}`)
      .filter((item) => !item.endsWith(": "))
      .join("；");
  }
  return String(value);
};

const toDisplayItems = (source: unknown) => {
  if (!source) return [];
  let data = source;
  if (typeof source === "string") {
    try {
      data = JSON.parse(source);
    } catch {
      return source
        .split(/[,，;；\n]/)
        .map((item) => item.trim())
        .filter(Boolean)
        .map((value) => ({ label: "参数", value }));
    }
  }
  if (Array.isArray(data)) {
    return data
      .map((item, index) => {
        if (typeof item === "object" && item !== null) {
          const record = item as Record<string, unknown>;
          return {
            label: formatMetaValue(record.name || record.label || `参数 ${index + 1}`),
            value: formatMetaValue(record.value || record.content || record.text),
          };
        }
        return { label: `参数 ${index + 1}`, value: formatMetaValue(item) };
      })
      .filter((item) => item.value);
  }
  if (typeof data === "object") {
    return Object.entries(data as Record<string, unknown>)
      .map(([label, value]) => ({ label, value: formatMetaValue(value) }))
      .filter((item) => item.value);
  }
  return [];
};

const productMetaItems = computed(() =>
  [
    { label: "品牌", value: product.value?.brand },
    { label: "材质", value: product.value?.material },
    { label: "尺寸", value: product.value?.dimensions },
    { label: "产地", value: product.value?.origin },
  ]
    .map((item) => ({ ...item, value: formatMetaValue(item.value) }))
    .filter((item) => item.value),
);

const productSignalItems = computed(() =>
  [
    { label: "类型", value: product.value?.type },
    { label: "品牌", value: product.value?.brand },
    { label: "材质", value: product.value?.material },
    { label: "更新", value: formatDate(product.value?.updateTime) },
  ]
    .map((item) => ({ ...item, value: formatMetaValue(item.value) }))
    .filter((item) => item.value)
    .slice(0, 4),
);

const productSpecItems = computed(() => toDisplayItems(product.value?.specifications));
const productAttributeItems = computed(() => toDisplayItems(product.value?.attributes));

const designSameHref = computed(() => ({
  path: "/design",
  query: {
    source: "product",
    productId: product.value?.id || "",
    productName: product.value?.name || "",
    productType: product.value?.type || "",
    keywords: productKeywords.value.slice(0, 6).join(","),
    image: currentImage.value || "",
    from: productSeoUrl.value,
  },
}));

const isLoggedIn = computed(() => publicUserStore.isLoggedIn);

const normalizeSeoText = (value?: string | null) => String(value || "").trim();

const productSeoTitle = computed(() => {
  const explicitTitle = normalizeSeoText(product.value?.seoTitle);
  if (explicitTitle) return explicitTitle;

  if (product.value?.name) {
    const keywordSuffix = keywordLine.value ? `｜${keywordLine.value}` : "";
    return `${product.value.name}${keywordSuffix} - POD 定制商品与印花设计灵感 - 衣设`;
  }

  return "POD 商品详情 - 衣设 yishe";
});

const productSeoDescription = computed(() => {
  const explicitDescription = normalizeSeoText(product.value?.seoDescription);
  if (explicitDescription) return explicitDescription;

  if (product.value?.description) return product.value.description;
  if (keywordLine.value) {
    return `查看「${product.value?.name || "POD 定制商品"}」的图案展示、关键词方向和商品化灵感，适合围绕 ${keywordLine.value} 延展为印花、礼品、家居或品牌周边。`;
  }
  return productLead.value || "查看 POD 定制商品的图案、场景、灵感说明和设计方向。";
});

const productSeoImage = computed(
  () => productImages.value[0] || SITE_DEFAULT_IMAGE,
);

const productAvailability = computed(() => {
  if (product.value?.inventoryStatus === "out_of_stock") {
    return "https://schema.org/OutOfStock";
  }
  if (product.value?.inventoryStatus === "preorder") {
    return "https://schema.org/PreOrder";
  }
  return "https://schema.org/InStock";
});

const productSeoUrl = computed(() =>
  product.value
    ? getProductAbsoluteUrl(product.value, SITE_URL)
    : `${SITE_URL}/product/${route.params.id || ""}`,
);

const productSeoKeywords = computed(
  () =>
    productKeywords.value.join(",") ||
    "POD商品,印花设计,定制商品,图案设计,私人定制",
);

const productRobots = computed(() =>
  product.value ? SITE_ROBOTS : "noindex, nofollow",
);

const productStructuredDataJson = computed(() => {
  if (!product.value) return "";
  const breadcrumb = useBreadcrumbStructuredData([
    { name: "首页", url: SITE_URL },
    { name: "POD 商品", url: `${SITE_URL}/products` },
    ...(product.value.type
      ? [{ name: product.value.type, url: `${SITE_URL}/products/${encodeURIComponent(product.value.type)}` }]
      : []),
    { name: product.value.name || "商品详情", url: productSeoUrl.value },
  ]);
  const productSchema = useProductStructuredData({
    name: product.value.name || "POD 定制商品",
    description: productSeoDescription.value,
    image: productImages.value.length
      ? productImages.value
      : productSeoImage.value,
    url: productSeoUrl.value,
    category: product.value.type || undefined,
    price: Number(productPrice.value) || undefined,
    currency: product.value.currency || "CNY",
    availability: productAvailability.value,
    sku: product.value.sku || product.value.code || undefined,
    brand: product.value.brand || undefined,
  });
  return serializeStructuredData({
    "@context": "https://schema.org",
    "@graph": [
      { ...breadcrumb, "@context": undefined },
      { ...productSchema, "@context": undefined },
    ],
  });
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
  ogLocale: SITE_OG_LOCALE,
  twitterCard: "summary_large_image",
  twitterTitle: () => productSeoTitle.value,
  twitterDescription: () => productSeoDescription.value,
  twitterImage: () => productSeoImage.value,
  robots: () => productRobots.value,
});

useHead(() => ({
  link: [{ rel: "canonical", href: productSeoUrl.value }],
  script: productStructuredDataJson.value
    ? [
        {
          type: "application/ld+json",
          innerHTML: productStructuredDataJson.value,
        },
      ]
    : [],
}));

const fetchProductDetail = async () => {
  loading.value = true;
  try {
    const rawId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
    const response = await api.productList.getById(String(rawId || ""), false);
    if (
      response.code === 0 ||
      response.status === true ||
      response.code === 200
    ) {
      product.value = isPublishedProduct(response.data) ? response.data : null;
      currentImageIndex.value = 0;
      relatedProducts.value = [];
      if (product.value && process.client) {
        reportBehaviorLog({
          action: 'product_view',
          targetId: String(product.value.id || rawId || ''),
          targetName: String(product.value.title || product.value.name || rawId || ''),
          metadata: {
            type: product.value.type,
            code: product.value.code,
          },
        });
      }
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
    }
  } catch (error) {
    console.error("获取相关推荐失败:", error);
    relatedProducts.value = [];
  }
};

const getRelatedImage = (item: any) => {
  if (!Array.isArray(item?.images)) return "";
  return item.images.find((url: string) => url && url.startsWith("http")) || "";
};

const getRelatedPrice = (item: any) => {
  return formatPrice(item?.salePrice || item?.price);
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
  return date.toLocaleDateString(SITE_LOCALE, {
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
  if (import.meta.server) {
    await fetchProductDetail();
    if (product.value) {
      const canonicalPath = getProductPath(product.value);
      if (route.path !== canonicalPath) {
        await navigateTo(canonicalPath, {
          redirectCode: 301,
          replace: true,
        });
      }
    } else {
      const event = useRequestEvent();
      if (event) setResponseStatus(event, 404, "Product Not Found");
    }
  } else {
    onMounted(async () => {
      await fetchProductDetail();
    });
  }
}

onMounted(() => {
  if (product.value?.id) fetchRelatedProducts();
  if (product.value) {
    reportBehaviorLog({
      action: 'product_view',
      targetId: String(product.value.id || route.params.id || ''),
      targetName: String(product.value.title || product.value.name || route.params.id || ''),
      metadata: {
        type: product.value.type,
        code: product.value.code,
      },
    });
  }
});
</script>

<style scoped>
.product-detail-page {
  min-height: 100vh;
  background: #fff;
  color: #111;
  padding: clamp(0.8rem, 2vw, 1.25rem) 0 clamp(2.5rem, 5vw, 4.5rem);
}

.product-detail-shell {
  width: var(--ys-container);
  margin: 0 auto;
  max-width: 1480px;
}

.product-breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
  min-height: 2.2rem;
  color: #777;
  font-size: 0.72rem;
}

.product-breadcrumb a {
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  border: 0;
  background: transparent;
  color: #555;
  text-decoration: none;
  font-weight: 700;
}

.product-detail-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(360px, 0.92fr);
  gap: clamp(1rem, 2.4vw, 2.4rem);
  align-items: start;
  margin-top: clamp(0.75rem, 2vw, 1.4rem);
}

.product-gallery {
  display: grid;
  grid-template-columns: 110px minmax(0, 1fr);
  align-items: start;
  gap: 0.75rem;
}

.product-gallery--single {
  grid-template-columns: minmax(0, 1fr);
}

.product-thumbs {
  display: grid;
  grid-template-columns: minmax(0, calc(100% - 0.5rem));
  align-content: start;
  justify-content: start;
  gap: 0.6rem;
  max-height: clamp(380px, 38vw, 540px);
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  padding: 0 0.5rem 0 0;
  scrollbar-gutter: stable;
  scrollbar-width: none;
}

.product-thumbs::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.product-thumbs::-webkit-scrollbar-track {
  background: transparent;
}

.product-thumbs::-webkit-scrollbar-thumb {
  background: transparent;
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
  border: 0;
  min-height: auto;
  border-radius: 0;
  background: #f5f5f7;
  padding: 0;
  transition: transform 220ms ease, opacity 220ms ease, background-color 220ms ease;
}

.product-thumbs button.active {
  background: #e8e8ed;
}

.product-thumbs button:hover {
  transform: translateY(-2px);
  opacity: 0.88;
  background: #eeeeef;
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
  min-height: clamp(440px, 48vw, 720px);
  overflow: hidden;
  border: 0;
  border-radius: 0;
  background: #f5f5f7;
  transition: background-color 260ms ease;
}

.product-main-frame:hover {
  background: #f0f0f2;
}

.product-frame-mark {
  position: absolute;
  z-index: 3;
  inset: 1rem 1rem auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  color: rgba(17, 17, 17, 0.62);
  font-size: 0.64rem;
  font-weight: 850;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  pointer-events: none;
}

.product-frame-mark span,
.product-frame-mark small {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-main-frame > * {
  grid-area: 1 / 1;
}

.product-main-image {
  position: relative;
  z-index: 2;
  width: min(86%, 820px);
  max-height: min(72vh, 660px);
  object-fit: contain;
  cursor: zoom-in;
  filter: drop-shadow(0 16px 24px rgba(0, 0, 0, 0.1));
  transition: transform 360ms cubic-bezier(0.22, 1, 0.36, 1), filter 360ms ease;
}

.product-main-frame:hover .product-main-image {
  transform: scale(1.018);
  filter: drop-shadow(0 22px 28px rgba(0, 0, 0, 0.13));
}

.product-gallery--single .product-main-frame {
  min-height: clamp(440px, 48vw, 720px);
}

.product-gallery--single .product-main-image {
  width: min(88%, 840px);
  max-height: min(72vh, 660px);
}

.product-no-image {
  display: grid;
  place-items: center;
  color: #777;
  font-size: 0.78rem;
}

.product-gallery-arrow {
  position: absolute;
  z-index: 5;
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border: 0;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.92);
  color: #111;
  transition: transform 180ms ease, background-color 180ms ease;
}

.product-gallery-arrow:hover {
  transform: scale(1.06);
  background: #111;
  color: #fff;
}

.product-gallery-arrow--left {
  left: 0.75rem;
}

.product-gallery-arrow--right {
  right: 0.75rem;
}

.product-buy-panel {
  position: sticky;
  top: 80px;
  display: grid;
  gap: 0.9rem;
  background: transparent;
  padding: 0;
}

/* 顶部 Pill 状态栏 (无 Emoji) */
.product-header-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.product-meta-pills {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.product-pill {
  display: inline-flex;
  align-items: center;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;

  &.product-pill--blue {
    background: #eff6ff;
    color: #1d4ed8;
    border: 1px solid #dbeafe;
  }

  &.product-pill--green {
    background: #f0fdf4;
    color: #15803d;
    border: 1px solid #dcfce7;
  }

  &.product-pill--gray {
    background: #f9fafb;
    color: #4b5563;
    border: 1px solid #f3f4f6;
    font-family: ui-monospace, SFMono-Regular, monospace;
  }
}

.product-detail-kicker {
  color: #2563eb;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.product-title-row h1 {
  margin: 0;
  color: #111827;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  font-weight: 700;
  line-height: 1.3;
}

/* 右侧栏商品详情与说明 */
.product-detail-box {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 0.85rem 1rem;
  box-shadow: none;
}

.product-detail-box-header {
  font-size: 0.82rem;
  font-weight: 700;
  color: #111827;
  padding-bottom: 0.35rem;
  margin-bottom: 0.45rem;
  border-bottom: 1px solid #f3f4f6;
}

.product-detail-box-content p {
  font-size: 0.84rem;
  color: #4b5563;
  line-height: 1.55;
  margin: 0 0 0.4rem 0;
}

.product-detail-box-specs {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.25rem 0.75rem;
  font-size: 0.78rem;
  margin: 0.5rem 0 0 0;
  padding-top: 0.5rem;
  border-top: 1px solid #f3f4f6;

  dt {
    color: #6b7280;
  }

  dd {
    color: #111827;
    font-weight: 600;
    margin: 0;
  }
}

.product-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.product-hashtag {
  font-size: 0.72rem;
  font-weight: 600;
  color: #2563eb;
  background: #f0f9ff;
  border: 1px solid #e0f2fe;
  padding: 0.2rem 0.65rem;
  border-radius: 999px;
  text-decoration: none;
  transition: all 0.15s ease;

  &:hover {
    background: #2563eb;
    color: #fff;
    border-color: #2563eb;
  }
}

/* 右侧卡片：价格与定制入口 (无阴影, 精精致字号) */
.product-action-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem 1.1rem;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.product-price-section {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.product-price-main {
  display: flex;
  align-items: baseline;
  gap: 0.2rem;
}

.product-price-currency {
  font-size: 1.05rem;
  font-weight: 700;
  color: #111827;
}

.product-price-amount {
  font-size: 1.75rem;
  font-weight: 800;
  color: #111827;
  line-height: 1;
}

.product-price-del {
  margin-left: 0.4rem;
  font-size: 0.85rem;
  color: #9ca3af;
}

.product-guarantee-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #16a34a;

  .ui-icon-check {
    width: 14px;
    height: 14px;
  }
}

/* 核心主按钮：设计同款 (高级黑，无阴影，适当字号) */
.product-primary-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  background: #111827;
  color: #fff;
  font-size: 0.88rem;
  font-weight: 650;
  padding: 0.65rem 1rem;
  border-radius: 999px;
  text-decoration: none;
  box-shadow: none;
  transition: background-color 0.15s ease;

  &:hover {
    background: #000000;
  }
}

/* 快捷定制入口按钮组 (设计相似款 / 咨询设计师 / 复制链接) */
.product-secondary-actions-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 0.45rem;
}

.product-secondary-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  color: #374151;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.5rem 0.8rem;
  border-radius: 999px;
  text-decoration: none;
  cursor: pointer;
  box-shadow: none;
  transition: all 0.15s ease;

  &:hover {
    background: #ffffff;
    border-color: #111827;
    color: #111827;
  }
}

/* 服务保障网格 (3-Box 扁平质感) */
.product-service-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.4rem;
  padding-top: 0.5rem;
  border-top: 1px solid #f3f4f6;
}

.product-service-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: #f9fafb;
  border: 1px solid #f3f4f6;
  padding: 0.45rem 0.25rem;
  border-radius: 6px;

  strong {
    font-size: 0.72rem;
    color: #111827;
    font-weight: 700;
  }

  small {
    font-size: 0.62rem;
    color: #6b7280;
    margin-top: 0.05rem;
  }
}

.product-remix-badge {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 800;
  color: #f43f5e;
  background: rgba(244, 63, 94, 0.15);
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  margin-bottom: 0.4rem;
}

.product-remix-header strong {
  display: block;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.2rem;
}

.product-remix-header p {
  margin: 0;
  font-size: 0.8rem;
  color: #9ca3af;
  line-height: 1.45;
}

.product-design-remix:hover {
  transform: translateY(-3px);
  background: #1d1d1f;
}

.product-design-remix div {
  position: relative;
  z-index: 1;
  min-width: 0;
}

.product-design-remix span {
  color: rgba(255, 255, 255, 0.62);
  font-size: 0.62rem;
  font-weight: 850;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.product-design-remix strong {
  display: block;
  margin-top: 0.35rem;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(1.15rem, 2vw, 1.45rem);
  font-weight: 500;
  line-height: 1.05;
  overflow-wrap: anywhere;
}

.product-design-remix p {
  max-width: 22rem;
  margin: 0.45rem 0 0;
  color: rgba(255, 255, 255, 0.68);
  font-size: 0.74rem;
  line-height: 1.55;
}

.product-design-action {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  min-height: 2.35rem;
  border: 0;
  background: #fff;
  color: #111;
  font-size: 0.76rem;
  font-weight: 850;
  padding: 0 0.85rem;
  text-decoration: none;
  white-space: nowrap;
  transition: transform 220ms ease, background-color 220ms ease;
}

.product-design-action:hover {
  transform: translateY(-2px);
  background: #f5f5f7;
}

.product-meta-panel dl,
.product-data-table dl {
  display: grid;
  grid-template-columns: minmax(5.5rem, 0.28fr) minmax(0, 1fr);
  gap: 0.35rem 0.65rem;
  margin: 0;
  background: transparent;
}

.product-meta-panel dt,
.product-meta-panel dd,
.product-data-table dt,
.product-data-table dd {
  min-height: 2.4rem;
  margin: 0;
  border-bottom: 0;
  background: rgba(255, 255, 255, 0.62);
  color: #555;
  font-size: 0.76rem;
  line-height: 1.5;
  padding: 0.62rem 0.75rem;
  min-width: 0;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.product-meta-panel dt,
.product-data-table dt {
  color: #777;
  font-weight: 800;
}

.product-actions {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(6.8rem, auto) minmax(5.4rem, auto);
  gap: 0.5rem;
  padding-top: 0.75rem;
  border-top: 0;
}

.product-primary-action {
  grid-column: auto;
}

.product-primary-action,
.product-secondary-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  min-height: 2.6rem;
  border-radius: 0;
  font-size: 0.78rem;
  font-weight: 700;
  text-decoration: none;
  min-width: 0;
  white-space: nowrap;
}

.product-primary-action {
  border: 0;
  background: #000;
  color: #fff;
  transition: transform 180ms ease, background-color 180ms ease;
}

.product-secondary-action {
  border: 0;
  background: #fff;
  color: #111;
  transition: transform 180ms ease, background-color 180ms ease, color 180ms ease;
}

.product-primary-action:hover,
.product-secondary-action:hover {
  transform: translateY(-2px);
}

.product-primary-action:hover {
  background: #27231f;
}

.product-secondary-action:hover {
  background: #111;
  color: #fff;
}

.product-tabs,
.product-related {
  margin-top: clamp(1.5rem, 4vw, 3rem);
}

.product-tabs nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  border-bottom: 0;
}

.product-tabs nav button {
  min-height: 2.6rem;
  border: 0;
  border-bottom: 0;
  background: transparent;
  color: rgba(0, 0, 0, 0.55);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: color 180ms ease, border-color 180ms ease;
}

.product-tabs nav button:hover {
  color: #111;
}

.product-tabs nav button.active {
  color: #111;
  font-weight: 700;
}

.product-related h2 {
  margin: 0;
  color: #000;
  font-size: clamp(1.1rem, 2.5vw, 1.6rem);
  line-height: 1.15;
  text-transform: uppercase;
}

.product-detail-copy p {
  color: #555;
  font-size: 0.78rem;
  line-height: 1.7;
  margin: 0;
  overflow-wrap: anywhere;
}

.product-detail-copy {
  display: grid;
  gap: 0.35rem;
  margin-top: 1rem;
  border-top: 0;
  border-bottom: 0;
  background: rgba(255, 255, 255, 0.68);
  padding: 1rem;
  position: relative;
}

.product-detail-copy::before {
  content: "DETAIL";
  position: static;
  color: #86868b;
  font-size: 0.58rem;
  font-weight: 850;
  letter-spacing: 0.12em;
  writing-mode: initial;
}

.product-data-table {
  margin-top: 1.2rem;
}

.product-data-table h2 {
  margin: 0 0 0.75rem;
  font-size: 0.82rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.product-related-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.85rem;
  margin-top: 1.2rem;
}

.product-related-card {
  color: inherit;
  text-decoration: none;
  transition: transform 260ms ease;
}

.product-related-card > div {
  display: grid;
  place-items: center;
  aspect-ratio: 0.82;
  overflow: hidden;
  border: 0;
  border-radius: 0;
  background: #f5f5f7;
  transition: background-color 260ms ease;
}

.product-related-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 320ms ease;
}

.product-related-card:hover {
  transform: translateY(-3px);
}

.product-related-card:hover > div {
  background: #eeeeef;
}

.product-related-card:hover img {
  transform: scale(1.035);
}

.product-related-card h3 {
  margin: 0.5rem 0 0;
  font-size: 0.82rem;
  line-height: 1.35;
  display: -webkit-box;
  min-height: 2.2rem;
  overflow: hidden;
  overflow-wrap: anywhere;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.product-related-card p {
  margin: 0.2rem 0 0;
  color: #777;
  font-size: 0.72rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-related-card p small {
  color: #555;
}

.product-related-card strong {
  display: block;
  margin-top: 0.2rem;
  font-size: 0.9rem;
}

.product-loading,
.product-empty {
  display: grid;
  place-items: center;
  min-height: 62vh;
  text-align: center;
}

.product-loading div {
  width: 2rem;
  height: 2rem;
  border: 2px solid #ececec;
  border-top-color: #111;
  border-radius: 50%;
  animation: product-spin 760ms linear infinite;
}

.product-loading p {
  margin-top: 0.75rem;
  color: #777;
  font-size: 0.72rem;
  text-transform: uppercase;
}

.product-empty {
  max-width: 520px;
  margin: 0 auto;
}

.product-empty span {
  color: #999;
  font-size: 0.72rem;
  font-weight: 700;
}

.product-empty h2 {
  margin: 0.5rem 0 0;
  font-size: clamp(1.2rem, 3vw, 2rem);
  line-height: 1.15;
}

.product-empty p {
  color: #666;
  font-size: 0.82rem;
  line-height: 1.7;
}

.product-empty a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.4rem;
  margin-top: 0.75rem;
  border-radius: 8px;
  background: #000;
  color: #fff;
  font-weight: 700;
  font-size: 0.78rem;
  padding: 0 1.1rem;
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

  .product-main-frame,
  .product-gallery--single .product-main-frame {
    min-height: clamp(360px, 58vw, 620px);
  }

  .product-related-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .product-buy-panel {
    position: static;
    border-top-color: #e5ded2;
  }
}

.product-mobile-bottom-bar {
  display: none;
}

@media (max-width: 720px) {
  .product-detail-page {
    padding-top: 0.75rem;
    padding-bottom: 5.5rem;
  }

  .product-mobile-bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 180;
    display: flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.65rem max(1rem, env(safe-area-inset-right, 0px)) max(0.75rem, calc(0.5rem + env(safe-area-inset-bottom, 0px))) max(1rem, env(safe-area-inset-left, 0px));
    background: rgba(255, 255, 255, 0.94);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-top: 1px solid #f5f5f7;
    box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.04);
  }

  .product-mobile-action-primary {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    flex: 1;
    height: 2.5rem;
    border-radius: 8px;
    background: #1d1d1f;
    color: #ffffff;
    font-size: 0.78rem;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      opacity: 0.88;
    }
  }

  .product-mobile-action-secondary {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    padding: 0 0.85rem;
    height: 2.5rem;
    border-radius: 8px;
    background: #f5f5f7;
    color: #1d1d1f;
    font-size: 0.76rem;
    font-weight: 500;
    text-decoration: none;

    &:hover {
      background: #e8e8ed;
    }
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
    min-height: min(82vw, 380px);
  }

  .product-frame-mark {
    inset: 0.7rem 0.7rem auto;
    font-size: 0.56rem;
  }

  .product-buy-panel {
    padding: 0.9rem;
  }

  .product-title-row {
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 0.5rem;
  }

  .product-title-row h1 {
    font-size: clamp(1.55rem, 8vw, 2.2rem);
    line-height: 1.12;
  }

  .product-actions {
    grid-template-columns: 1fr;
  }

  .product-primary-action,
  .product-secondary-action {
    width: 100%;
  }

  .product-meta-panel dl,
  .product-data-table dl {
    grid-template-columns: 1fr;
  }

  .product-signal-grid {
    grid-template-columns: 1fr 1fr;
  }

  .product-signal-grid article {
    min-height: 4.4rem;
    padding: 0.65rem;
  }

  .product-signal-grid strong {
    font-size: 0.92rem;
  }

  .product-design-remix {
    grid-template-columns: 1fr;
    padding: 0.9rem;
  }

  .product-design-action {
    width: 100%;
  }

  .product-meta-panel dt,
  .product-data-table dt {
    min-height: auto;
    padding-bottom: 0.2rem;
  }

  .product-meta-panel dd,
  .product-data-table dd {
    padding-top: 0.45rem;
  }

  .product-tabs nav {
    gap: 0.8rem;
  }

  .product-detail-copy {
    padding: 0.95rem 0.85rem;
  }

  .product-tabs nav button {
    min-height: 2.2rem;
    font-size: 0.72rem;
  }

  .product-related-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.6rem;
  }

}

/* Flat product detail surfaces */
.product-detail-page {
  background: var(--ys-bg);
  color: var(--ys-text);
}

.product-main-frame,
.product-thumbs button,
.product-signal-grid article,
.product-related-card > div {
  border: 0;
  border-radius: var(--ys-radius-lg);
  background: var(--ys-surface-soft);
  box-shadow: none;
}

.product-main-image {
  filter: none;
}

.product-main-frame:hover .product-main-image {
  filter: none;
}

.product-gallery-arrow {
  border: 0;
  border-radius: var(--ys-pill-radius);
  background: var(--ys-surface);
  color: var(--ys-text);
  box-shadow: var(--ys-shadow-sm);
}

.product-gallery-arrow:hover {
  background: var(--ys-accent);
  color: #fff;
}

.product-status-line span,
.product-tags a,
.product-next-links a,
.product-secondary-action {
  border: 0;
  border-radius: var(--ys-pill-radius);
  background: var(--ys-surface-soft);
  color: var(--ys-text-soft);
}

.product-status-line span:hover,
.product-tags a:hover,
.product-next-links a:hover,
.product-secondary-action:hover {
  background: var(--ys-accent-soft);
  color: var(--ys-accent);
}

.product-signal-grid article:hover,
.product-related-card:hover > div {
  background: var(--ys-accent-soft);
}

.product-design-remix {
  border-radius: var(--ys-radius-lg);
  background: var(--ys-accent);
}

.product-design-remix:hover {
  background: #000000;
}

.product-design-action,
.product-primary-action {
  border-radius: var(--ys-radius-sm);
}

.product-primary-action {
  background: var(--ys-accent);
}

.product-primary-action:hover {
  background: #000000;
}

.product-detail-copy,
.product-meta-panel dt,
.product-meta-panel dd,
.product-data-table dt,
.product-data-table dd {
  border: 0;
  background: var(--ys-surface);
}

.product-related-card > div {
  border-radius: var(--ys-radius-lg);
}
</style>
