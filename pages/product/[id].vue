<template>
  <div class="min-h-screen bg-white">
    <!-- 加载状态 -->
    <div v-if="loading" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="relative inline-block mb-6">
          <div
            class="w-16 h-16 border-2 border-gray-200 border-t-black rounded-full animate-spin"
          ></div>
        </div>
        <p class="text-sm text-gray-500 uppercase tracking-wider">加载中...</p>
      </div>
    </div>

    <!-- 商品详情 -->
    <div v-else-if="product" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- 返回按钮 -->
      <div class="mb-6">
        <button
          @click="router.back()"
          class="inline-flex items-center space-x-2 text-sm text-black hover:text-gray-600 transition-all duration-300 transform hover:scale-105 active:scale-100 uppercase tracking-wider px-3 py-2 rounded-md hover:bg-gray-50"
        >
          <Icon name="heroicons:arrow-left" class="w-4 h-4" />
          <span>返回</span>
        </button>
      </div>

      <!-- 主要内容区域 -->
      <div class="relative">
        <!-- 左侧导航箭头 -->
        <button
          v-if="hasPreviousProduct"
          @click="navigateToPrevious"
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-black transition-all duration-300 transform hover:scale-110 active:scale-105"
          aria-label="上一个商品"
        >
          <Icon name="heroicons:chevron-left" class="w-6 h-6 text-black" />
        </button>

        <!-- 右侧导航箭头 -->
        <button
          v-if="hasNextProduct"
          @click="navigateToNext"
          class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-black transition-all duration-300 transform hover:scale-110 active:scale-105"
          aria-label="下一个商品"
        >
          <Icon name="heroicons:chevron-right" class="w-6 h-6 text-black" />
        </button>

        <!-- 商品图片区域 -->
        <div class="mb-8 flex items-center justify-center relative">
          <!-- 左侧切换按钮 -->
          <button
            v-if="productImages.length > 1"
            @click="previousImage"
            class="absolute left-0 sm:left-2 md:left-4 lg:left-8 xl:left-12 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white border border-gray-200 flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-105 z-10 backdrop-blur-sm"
            aria-label="上一张图片"
          >
            <Icon
              name="heroicons:chevron-left"
              class="w-5 h-5 sm:w-6 sm:h-6 text-black"
            />
          </button>

          <!-- 图片容器 -->
          <div
            class="relative w-full max-w-full md:max-w-2xl mx-auto product-image-container overflow-hidden image-card"
          >
            <!-- 主图（带左右滑动动画） -->
            <transition :name="`slide-${slideDirection}`">
              <img
                v-if="currentImage"
                :key="currentImage"
                :src="currentImage"
                :alt="product.name"
                class="w-full h-full object-contain cursor-pointer"
                @error="handleImageError"
                @click="openImagePreview"
              />
              <div
                v-else
                key="no-image"
                class="w-full h-full flex items-center justify-center"
              >
                <span class="text-gray-400 text-sm">暂无图片</span>
              </div>
            </transition>

            <!-- 图片缩略图导航 -->
            <div
              v-if="productImages.length > 1"
              class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10"
            >
              <button
                v-for="(img, index) in productImages"
                :key="index"
                @click="currentImageIndex = index"
                :class="[
                  'w-2 h-2 rounded-full transition-all',
                  currentImageIndex === index
                    ? 'bg-black w-8'
                    : 'bg-gray-300 hover:bg-gray-400',
                ]"
                :aria-label="`查看图片 ${index + 1}`"
              />
            </div>
          </div>

          <!-- 右侧切换按钮 -->
          <button
            v-if="productImages.length > 1"
            @click="nextImage"
            class="absolute right-0 sm:right-2 md:right-4 lg:right-8 xl:right-12 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white border border-gray-200 flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-105 z-10 backdrop-blur-sm"
            aria-label="下一张图片"
          >
            <Icon
              name="heroicons:chevron-right"
              class="w-5 h-5 sm:w-6 sm:h-6 text-black"
            />
          </button>
        </div>

        <!-- 商品信息区域 -->
        <div class="max-w-4xl mx-auto space-y-6">
          <!-- 商品名称和收藏按钮 -->
          <div>
            <div class="flex items-start justify-between mb-2">
              <h1 class="text-2xl sm:text-3xl font-light tracking-wide text-black flex-1">
                {{ product.name }}
              </h1>
              <!-- 收藏按钮 -->
              <div class="ml-4 flex-shrink-0">
                <FavoriteButton
                  :is-favorite="isFavorite"
                  :count="favoriteCount"
                  :show-count="false"
                  @click="toggleFavorite"
                />
              </div>
            </div>
            <p v-if="product.description" class="text-base text-gray-600 leading-relaxed">
              {{ product.description }}
            </p>
          </div>

          <!-- 创建时间信息 -->
          <div
            v-if="product.createTime && product.type !== '二维产品图'"
            class="text-sm text-gray-500"
          >
            <span>{{ formatDate(product.createTime) }}</span>
          </div>

          <!-- 详细信息 -->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-gray-200"
          >
            <!-- 商品代码 -->
            <div v-if="product.code">
              <h3 class="text-xs uppercase tracking-wider text-gray-500 mb-2">
                产品代码
              </h3>
              <p class="text-sm text-black uppercase tracking-wider">
                {{ product.code }}
              </p>
            </div>


            <!-- 关键词 -->
            <div v-if="productKeywords.length > 0">
              <h3 class="text-xs uppercase tracking-wider text-gray-500 mb-2">关键词</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="keyword in productKeywords"
                  :key="keyword"
                  class="text-xs text-gray-600"
                >
                  {{ keyword }}
                </span>
              </div>
            </div>
          </div>

          <!-- 交互按钮 -->
          <div class="flex items-center space-x-6 pt-6 border-t border-gray-200">
            <button
              @click="copyLink"
              class="flex items-center space-x-2 text-sm text-gray-600 hover:text-black transition-all duration-300 transform hover:scale-105 active:scale-100 px-3 py-2 rounded-md hover:bg-gray-50"
            >
              <Icon name="heroicons:link" class="w-5 h-5" />
              <span class="uppercase tracking-wider">复制链接</span>
            </button>
            <button
              @click="shareProduct"
              class="flex items-center space-x-2 text-sm text-gray-600 hover:text-black transition-all duration-300 transform hover:scale-105 active:scale-100 px-3 py-2 rounded-md hover:bg-gray-50"
            >
              <Icon name="heroicons:share" class="w-5 h-5" />
              <span class="uppercase tracking-wider">分享</span>
            </button>
          </div>
          
          <!-- 收藏数量显示 -->
          <div v-if="favoriteCount !== null" class="pt-4 text-sm text-gray-500">
            <span>{{ favoriteCount }} 人收藏了此商品</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 未找到商品 -->
    <div v-else class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <Icon
          name="heroicons:exclamation-triangle"
          class="w-16 h-16 text-gray-400 mx-auto mb-4"
        />
        <h3 class="text-lg font-light text-gray-900 mb-2">商品不存在</h3>
        <p class="text-sm text-gray-500 mb-6">抱歉，您查找的商品不存在或已被删除</p>
        <button
          @click="router.push('/products')"
          class="px-6 py-2 bg-black text-white text-sm uppercase tracking-wider hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 active:scale-100"
        >
          返回商品列表
        </button>
      </div>
    </div>

    <!-- 图片预览组件 -->
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
import { ref, computed, watch } from "vue";
import { api } from "~/utils/api";
import ImagePreview from "../components/ImagePreview.vue";
import FavoriteButton from "~/components/FavoriteButton.vue";
import { usePublicUserStore } from "~/stores/public-user";
import { useToast } from "~/composables/use-toast";
import { usePageSEO, useProductStructuredData } from "~/composables/use-seo";

const toast = useToast();

definePageMeta({ layout: "page" });

// 先初始化 route 和 router
const route = useRoute();
const router = useRouter();
const publicUserStore = usePublicUserStore();

// 默认 SEO（在商品加载前）
usePageSEO({
  title: "商品详情 - 衣设服装设计",
  description: "查看商品详情，发现更多创意设计作品",
  url: `https://1s.design/product/${route.params.id}`,
  type: "product",
});

// 状态
const loading = ref(true);
const product = ref(null);
const currentImageIndex = ref(0);
const isPreviewOpen = ref(false);
const isFavorite = ref(false);
const favoriteCount = ref<number | null>(null);
const slideDirection = ref<"next" | "prev">("next");

// 计算属性
const productImages = computed(() => {
  if (!product.value) return [];

  const images = [];

  // 添加商品图片
  if (product.value.images && Array.isArray(product.value.images)) {
    product.value.images.forEach((url) => {
      if (url && typeof url === "string" && url.trim() && url.startsWith("http")) {
        images.push(url);
      }
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
    .map((k) => k.trim())
    .filter((k) => k.length > 0);
});

const hasPreviousProduct = computed(() => {
  // TODO: 实现上一个商品的逻辑
  return false;
});

const hasNextProduct = computed(() => {
  // TODO: 实现下一个商品的逻辑
  return false;
});

// 是否已登录
const isLoggedIn = computed(() => {
  return publicUserStore.isLoggedIn;
});

// 获取商品详情
const fetchProductDetail = async () => {
  loading.value = true;
  try {
    const response = await api.productList.getById(route.params.id, false);

    if (response.code === 0 || response.status === true || response.code === 200) {
      product.value = response.data;
      // 重置图片索引
      currentImageIndex.value = 0;
      // 获取收藏状态和收藏数
      await Promise.all([
        checkFavoriteStatus(),
        fetchFavoriteCount(),
      ]);
    } else {
      console.error("获取商品详情失败:", response.message);
      product.value = null;
    }
  } catch (error) {
    console.error("获取商品详情失败:", error);
    product.value = null;
  } finally {
    loading.value = false;
  }
};

// 检查收藏状态
const checkFavoriteStatus = async () => {
  if (!isLoggedIn.value || !product.value?.id) return;
  
  try {
    const response = await api.favorite.check(product.value.id);
    if (response.code === 0 || response.status === true || response.code === 200) {
      isFavorite.value = response.data === true;
    }
  } catch (error) {
    console.error("检查收藏状态失败:", error);
  }
};

// 获取收藏数量
const fetchFavoriteCount = async () => {
  if (!product.value?.id) return;
  
  try {
    const response = await api.favorite.getProductCount(product.value.id);
    if (response.code === 0 || response.status === true || response.code === 200) {
      favoriteCount.value = response.data;
    }
  } catch (error) {
    console.error("获取收藏数量失败:", error);
  }
};

// 切换收藏状态 - 立即切换，后台处理接口
const toggleFavorite = async () => {
  if (!product.value?.id) return;

  // 未登录，跳转到登录页
  if (!isLoggedIn.value) {
    router.push('/login');
    return;
  }

  // 保存当前状态，用于失败时回滚
  const previousFavoriteState = isFavorite.value;
  const previousCount = favoriteCount.value;

  // 立即切换状态
  isFavorite.value = !isFavorite.value;
  
  // 立即更新收藏数量（乐观更新）
  if (isFavorite.value) {
    // 添加收藏
    if (favoriteCount.value !== null) {
      favoriteCount.value += 1;
    } else {
      favoriteCount.value = 1;
    }
  } else {
    // 取消收藏
    if (favoriteCount.value !== null && favoriteCount.value > 0) {
      favoriteCount.value -= 1;
    }
  }

  // 后台异步处理接口
  try {
    if (previousFavoriteState) {
      // 取消收藏
      const response = await api.favorite.remove(product.value.id);
      if (response.code !== 0 && response.status !== true && response.code !== 200) {
        // 失败，回滚状态
        isFavorite.value = previousFavoriteState;
        favoriteCount.value = previousCount;
        toast.error(response.message || '取消收藏失败');
      }
    } else {
      // 添加收藏
      const response = await api.favorite.create({
        productId: product.value.id,
      });
      if (response.code !== 0 && response.status !== true && response.code !== 200) {
        // 失败，回滚状态
        isFavorite.value = previousFavoriteState;
        favoriteCount.value = previousCount;
        if (response.code === 409) {
          toast.warning('该商品已收藏');
        } else {
          toast.error(response.message || '收藏失败');
        }
      }
    }
  } catch (error: any) {
    console.error("切换收藏状态失败:", error);
    // 失败，回滚状态
    isFavorite.value = previousFavoriteState;
    favoriteCount.value = previousCount;
    
    // 处理错误响应
    if (error.code === 401 || error.statusCode === 401) {
      // 未授权，清除登录状态并跳转登录页
      publicUserStore.clearToken();
      toast.error('登录已过期，请重新登录');
      router.push('/login');
    } else if (error.code === 500 || error.statusCode === 500) {
      // 服务器错误
      toast.error(error.message || '服务器错误，请稍后重试');
    } else {
      // 其他错误
      toast.error(error.message || '操作失败，请稍后重试');
    }
  }
};

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// 处理图片加载错误
const handleImageError = (event) => {
  const img = event.target as HTMLImageElement;
  img.style.display = "none";
};

// 切换到上一张图片
const previousImage = () => {
  if (productImages.value.length > 0) {
    slideDirection.value = "prev";
    currentImageIndex.value =
      (currentImageIndex.value - 1 + productImages.value.length) %
      productImages.value.length;
  }
};

// 切换到下一张图片
const nextImage = () => {
  if (productImages.value.length > 0) {
    slideDirection.value = "next";
    currentImageIndex.value = (currentImageIndex.value + 1) % productImages.value.length;
  }
};

// 复制链接
const copyLink = async () => {
  try {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    // TODO: 显示成功提示
    alert("链接已复制到剪贴板");
  } catch (error) {
    console.error("复制链接失败:", error);
  }
};

// 分享商品
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
    // 降级到复制链接
    copyLink();
  }
};

// 导航到上一个商品
const navigateToPrevious = () => {
  // TODO: 实现上一个商品的导航逻辑
};

// 导航到下一个商品
const navigateToNext = () => {
  // TODO: 实现下一个商品的导航逻辑
};

// 打开图片预览
const openImagePreview = () => {
  if (productImages.value.length === 0) return;
  isPreviewOpen.value = true;
};

// 处理预览图片变化
const handlePreviewImageChange = (index: number) => {
  currentImageIndex.value = index;
};

// 监听产品数据变化，更新 SEO
watch(
  () => product.value,
  (newProduct) => {
    if (newProduct) {
      const productImage = productImages.value[0] || 'https://1s.design/logo/logo.svg'
      const productUrl = `https://1s.design/product/${newProduct.id}`
      const productDescription = newProduct.description || newProduct.name || '查看商品详情'
      
      usePageSEO({
        title: `${newProduct.name || '商品详情'} - 衣设服装设计`,
        description: productDescription,
        keywords: productKeywords.value.join(',') || '服装设计,创意印花,图案设计',
        image: productImage,
        url: productUrl,
        type: 'product',
        structuredData: useProductStructuredData({
          name: newProduct.name || '商品',
          description: productDescription,
          image: productImage,
          url: productUrl,
          category: newProduct.type || '服装设计',
        }),
      })
    }
  },
  { immediate: true }
)

// 监听路由参数变化
watch(
  () => route.params.id,
  () => {
    if (route.params.id) {
      fetchProductDetail();
    }
  },
  { immediate: true }
);
</script>

<style scoped>
/* 商品主图尺寸优化：移动端和桌面端都尽量更大一些 */
.product-image-container {
  /* 提高纵向占比，让图片更高一些 */
  aspect-ratio: 4 / 5;
}

/* 图片卡片样式：圆角 + 立体阴影 */
.image-card {
  border-radius: 8px;
  box-shadow: 0 14px 35px rgba(15, 23, 42, 0.18);
  background-color: #ffffff;
}

@media (min-width: 768px) {
  .product-image-container {
    /* 桌面端略宽一点，但仍保持较大的高度 */
    aspect-ratio: 3 / 2;
    max-width: 960px;
  }
}

/* 减少双击缩放触发几率 */
.product-image-container,
.product-image-container img {
  touch-action: manipulation;
}

/* 限制主图最大高度，尽量占据视口但不超出 */
.product-image-container img {
  max-height: 80vh;
  object-fit: contain;
}

/* 图片左右滑动过渡动画：只做位移动画，避免透明度导致空白闪动 */
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: transform 0.2s ease-out;
  position: absolute;
  inset: 0;
}

.slide-next-enter-from {
  transform: translateX(100%);
}

.slide-next-enter-to {
  transform: translateX(0%);
}

.slide-next-leave-from {
  transform: translateX(0%);
}

.slide-next-leave-to {
  transform: translateX(-100%);
}

.slide-prev-enter-from {
  transform: translateX(-100%);
}

.slide-prev-enter-to {
  transform: translateX(0%);
}

.slide-prev-leave-from {
  transform: translateX(0%);
}

.slide-prev-leave-to {
  transform: translateX(100%);
}
</style>

<!-- global styles to mitigate fast-scroll header gap -->
<style>
html,
body {
  background-color: #ffffff;
  overscroll-behavior-y: contain; /* reduce rubber-band over-scroll revealing gaps */
  overscroll-behavior-x: none;
}

/* Ensure the app header stays on its own compositing layer */
header,
.site-header,
.app-header {
  backface-visibility: hidden;
  transform: translateZ(0);
  will-change: transform;
  background-color: #ffffff; /* avoid transparent flash */
}

/* Respect safe area and avoid a visual seam on iOS */
header,
.site-header,
.app-header {
  padding-top: max(env(safe-area-inset-top), 0px);
}
</style>
