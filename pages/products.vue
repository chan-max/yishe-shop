<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-[1440px] mx-auto">
      <div class="px-4 py-8">
        <!-- 商品列表标题 -->
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold mb-2">精选商品</h2>
          <p class="text-gray-600 mb-4">发现独特的服装设计，展现您的个性风格</p>
          
          <!-- 搜索结果显示 -->
          <div v-if="searchKeyword" class="mb-4">
            <div class="flex items-center justify-center text-gray-600">
              <span class="text-sm">你当前的搜索为：</span>
              <span class="font-bold text-black text-lg">"{{ searchKeyword }}"</span>
              <button 
                @click="clearSearch" 
                class="ml-2 text-blue-500 hover:text-blue-700 transition-colors"
              >
                <Icon name="heroicons:x-mark-20-solid" class="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <!-- 关键词标签 -->
          <div class="border-t border-b border-gray-50 py-4">
            <div class="flex flex-wrap justify-center gap-2">
              <button class="px-3 py-1.5 rounded-full bg-gray-100 text-black hover:bg-gray-200 transition-colors text-xs">
                新品上市
              </button>
              <button class="px-3 py-1.5 rounded-full bg-gray-100 text-black hover:bg-gray-200 transition-colors text-xs">
                设计师款
              </button>
              <button class="px-3 py-1.5 rounded-full bg-gray-100 text-black hover:bg-gray-200 transition-colors text-xs">
                限时折扣
              </button>
              <button class="px-3 py-1.5 rounded-full bg-gray-100 text-black hover:bg-gray-200 transition-colors text-xs">
                热销榜单
              </button>
              <button class="px-3 py-1.5 rounded-full bg-gray-100 text-black hover:bg-gray-200 transition-colors text-xs">
                定制服务
              </button>
              <button class="px-3 py-1.5 rounded-full bg-gray-100 text-black hover:bg-gray-200 transition-colors text-xs">
                季节精选
              </button>
              <button class="px-3 py-1.5 rounded-full bg-gray-100 text-black hover:bg-gray-200 transition-colors text-xs">
                潮流趋势
              </button>
              <button class="px-3 py-1.5 rounded-full bg-gray-100 text-black hover:bg-gray-200 transition-colors text-xs">
                明星同款
              </button>
            </div>
          </div>
        </div>

        <!-- 筛选条件 -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 max-w-[1440px] mx-auto mb-8">
          <!-- 价格区间 -->
          <v-select
            v-model="selectedFilters.price"
            :items="filterOptions.price"
            item-title="label"
            item-value="value"
            label="价格区间"
            variant="outlined"
            density="comfortable"
            hide-details
            class="w-full"
          />

          <!-- 风格 -->
          <v-select
            v-model="selectedFilters.style"
            :items="filterOptions.style"
            item-title="label"
            item-value="value"
            label="风格"
            variant="outlined"
            density="comfortable"
            hide-details
            class="w-full"
          />

          <!-- 季节 -->
          <v-select
            v-model="selectedFilters.season"
            :items="filterOptions.season"
            item-title="label"
            item-value="value"
            label="季节"
            variant="outlined"
            density="comfortable"
            hide-details
            class="w-full"
          />

          <!-- 材质 -->
          <v-select
            v-model="selectedFilters.material"
            :items="filterOptions.material"
            item-title="label"
            item-value="value"
            label="材质"
            variant="outlined"
            density="comfortable"
            hide-details
            class="w-full"
          />

          <!-- 颜色 -->
          <v-select
            v-model="selectedFilters.color"
            :items="filterOptions.color"
            item-title="label"
            item-value="value"
            label="颜色"
            variant="outlined"
            density="comfortable"
            hide-details
            class="w-full"
          />

          <!-- 尺码 -->
          <v-select
            v-model="selectedFilters.size"
            :items="filterOptions.size"
            item-title="label"
            item-value="value"
            label="尺码"
            variant="outlined"
            density="comfortable"
            hide-details
            class="w-full"
          />

          <!-- 品牌 -->
          <v-select
            v-model="selectedFilters.brand"
            :items="filterOptions.brand"
            item-title="label"
            item-value="value"
            label="品牌"
            variant="outlined"
            density="comfortable"
            hide-details
            class="w-full"
          />

          <!-- 折扣 -->
          <v-select
            v-model="selectedFilters.discount"
            :items="filterOptions.discount"
            item-title="label"
            item-value="value"
            label="折扣"
            variant="outlined"
            density="comfortable"
            hide-details
            class="w-full"
          />
        </div>

        <!-- 商品列表 -->
        <div v-if="loading || !hasInitialized" class="w-full">
          <!-- 个性化Loading效果 -->
          <div class="text-center py-16">
            <!-- 主Loading动画 -->
            <div class="relative inline-block mb-6">
              <!-- 外圈旋转 -->
              <div class="w-20 h-20 border-4 border-gray-200 border-t-gray-400 rounded-full animate-spin"></div>
              <!-- 内圈脉冲 -->
              <div class="absolute inset-2 w-16 h-16 bg-gray-300 rounded-full animate-pulse"></div>
              <!-- 中心图标 -->
              <div class="absolute inset-0 flex items-center justify-center">
                <Icon name="heroicons:shopping-bag" class="w-8 h-8 text-white animate-bounce" />
              </div>
            </div>
            
            <!-- 加载文字 -->
            <div class="space-y-2">
              <h3 class="text-lg font-medium text-gray-800">正在为您精选商品</h3>
              <div class="flex justify-center items-center gap-1">
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms;"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms;"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms;"></div>
              </div>
              <p class="text-sm text-gray-500">发现更多时尚单品...</p>
            </div>
          </div>
        </div>

        <div v-else-if="products.length === 0" class="text-center py-12">
          <v-icon
            name="heroicons:shopping-bag"
            class="w-16 h-16 text-gray-400 mb-4"
          ></v-icon>
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            {{ searchKeyword ? '没有找到相关商品' : '暂无商品' }}
          </h3>
          <p class="text-gray-500">
            {{ searchKeyword ? '请尝试其他搜索关键词' : '敬请期待更多商品上架' }}
          </p>
        </div>

        <div v-else>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 max-w-[1440px] mx-auto">
            <!-- 商品卡片 -->
            <div
              v-for="product in products"
              :key="product.id"
              class="rounded-lg overflow-hidden shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
            >
              <!-- 商品图片 -->
              <div class="relative aspect-[4/5]">
                <!-- 有图片时显示图片 -->
                <img
                  v-if="hasValidImage(product)"
                  :src="product.images[0]"
                  :alt="product.name"
                  class="w-full h-full object-cover transition-opacity duration-300"
                  @load="onImageLoad($event, product.id)"
                  @error="onImageError($event, product.id)"
                  :class="{ 'opacity-0': !getImageLoadStatus(product.id) }"
                />
                
                <!-- 没有图片时显示空状态 -->
                <div 
                  v-else
                  class="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4"
                >
                  <!-- 空状态图标 -->
                  <div class="relative mb-3">
                    <!-- 外圈装饰 -->
                    <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <Icon name="heroicons:photo" class="w-6 h-6 text-gray-400" />
                    </div>
                    <!-- 小图标装饰 -->
                    <div class="absolute -top-1 -right-1 w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center">
                      <Icon name="heroicons:plus" class="w-2 h-2 text-gray-500" />
                    </div>
                  </div>
                  
                  <!-- 空状态文字 -->
                  <div class="text-center">
                    <p class="text-xs text-gray-500 font-medium mb-1">暂无图片</p>
                  </div>
                  
                  <!-- 装饰性元素 -->
                  <div class="absolute bottom-2 right-2">
                    <div class="flex gap-1">
                      <div class="w-1 h-1 bg-gray-300 rounded-full"></div>
                      <div class="w-1 h-1 bg-gray-300 rounded-full"></div>
                      <div class="w-1 h-1 bg-gray-300 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                <!-- 图片加载中的波浪效果 -->
                <div 
                  v-if="hasValidImage(product) && !getImageLoadStatus(product.id)"
                  class="absolute inset-0 bg-gray-100 flex items-center justify-center"
                >
                  <div class="relative">
                    <!-- 波浪动画 -->
                    <div class="flex items-center gap-1">
                      <div class="w-1 h-4 bg-gray-300 rounded-full animate-pulse" style="animation-delay: 0ms;"></div>
                      <div class="w-1 h-6 bg-gray-300 rounded-full animate-pulse" style="animation-delay: 150ms;"></div>
                      <div class="w-1 h-8 bg-gray-300 rounded-full animate-pulse" style="animation-delay: 300ms;"></div>
                      <div class="w-1 h-6 bg-gray-300 rounded-full animate-pulse" style="animation-delay: 450ms;"></div>
                      <div class="w-1 h-4 bg-gray-300 rounded-full animate-pulse" style="animation-delay: 600ms;"></div>
                    </div>
                  </div>
                </div>
                
                <!-- 商品标签 -->
                <div
                  v-if="product.tag"
                  class="absolute top-2 left-2 px-2 py-1 text-xs rounded border bg-white/90"
                >
                  {{ product.tag }}
                </div>
              </div>

              <!-- 商品信息 -->
              <div class="p-3">
                <h3 class="text-sm font-medium mb-2 line-clamp-2">{{ product.name }}</h3>
                
                <!-- 商品描述 -->
                <div v-if="product.description" class="mb-2">
                  <p class="text-xs text-gray-600 line-clamp-2">{{ product.description }}</p>
                </div>
                
                <!-- 关键词标签 -->
                <div v-if="getProductKeywords(product).length > 0" class="mb-2">
                  <div class="flex flex-wrap gap-1">
                    <span 
                      v-for="keyword in getProductKeywords(product).slice(0, 3)" 
                      :key="keyword"
                      class="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                    >
                      {{ keyword }}
                    </span>
                    <span 
                      v-if="getProductKeywords(product).length > 3" 
                      class="px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded-full"
                    >
                      +{{ getProductKeywords(product).length - 3 }}
                    </span>
                  </div>
                </div>
                
                <!-- 点赞数 -->
                <div class="flex items-center justify-end">
                  <div class="flex items-center gap-1 text-xs text-gray-500">
                    <Icon name="heroicons:heart" class="w-3 h-3" />
                    <span>{{ product.likes }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 分页 -->
          <div class="flex justify-center mt-8">
            <v-pagination
              v-model="currentPage"
              :length="Math.ceil(total / pageSize)"
              :total-visible="7"
              rounded="circle"
              color="primary"
            ></v-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSearchStore } from '../stores/use-search'

definePageMeta({ layout: 'page' })
useHead({ titleTemplate: '', title: '精选商品 - 衣设服装设计' })

// 引入搜索store
const searchStore = useSearchStore();
const route = useRoute();
const router = useRouter();

// 商品类型定义
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  tag?: string;
  likes: number;
  keywords?: string;
}

interface PageResponse {
  list: Product[];
  total: number;
  page: number;
  pageSize: number;
}

// 分页相关状态
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const loading = ref(false);
const hasInitialized = ref(false);

// 商品列表
const products = ref<Product[]>([]);

// 图片加载状态
const imageLoaded = ref<Record<number, boolean>>({});

// 图片加载成功处理
const onImageLoad = (event: Event, productId: number) => {
  imageLoaded.value[productId] = true;
};

// 图片加载失败处理
const onImageError = (event: Event, productId: number) => {
  console.error("图片加载失败:", event);
  imageLoaded.value[productId] = false;
};

// 检查商品是否有有效图片
const hasValidImage = (product: Product) => {
  return product.images && product.images.length > 0 && product.images[0];
};

// 获取商品图片加载状态
const getImageLoadStatus = (productId: number) => {
  return imageLoaded.value[productId] || false;
};

// 搜索关键词
const searchKeyword = computed(() => {
  // 优先使用URL参数，其次使用全局状态
  return route.query.search as string || searchStore.searchKeyword;
});

// 清空搜索
const clearSearch = () => {
  searchStore.clearSearchKeyword();
  router.push({ path: '/products', query: {} });
};

// 获取商品列表
const fetchProducts = async () => {
  loading.value = true;
  try {
    const { $customFetch } = useNuxtApp();
    const requestBody: any = {
      currentPage: currentPage.value,
      pageSize: pageSize.value,
      isPublish: true, // 固定传递，只查询已上架的商品
    };
    
    // 如果有搜索关键词，添加到请求体中
    if (searchKeyword.value) {
      requestBody.keyword = searchKeyword.value;
    }
    
    const response = await $customFetch<PageResponse>("/product/page", {
      method: "POST",
      body: requestBody,
    });
    products.value = response.list;
    total.value = response.total;
    hasInitialized.value = true;
  } catch (error) {
    console.error("获取商品列表失败:", error);
    hasInitialized.value = true; // 即使出错也要标记为已初始化
  } finally {
    loading.value = false;
  }
};

// 监听分页变化
watch([currentPage], () => {
  fetchProducts();
});

// 监听搜索关键词变化
watch(searchKeyword, (newKeyword) => {
  // 重置到第一页
  currentPage.value = 1;
  // 如果有搜索关键词，立即获取数据
  if (newKeyword) {
    fetchProducts();
  }
}, { immediate: false });

// 监听路由变化
watch(() => route.query.search, (newSearch) => {
  if (newSearch) {
    // 更新全局搜索状态
    searchStore.setSearchKeyword(newSearch as string);
    // 重置到第一页
    currentPage.value = 1;
    // 获取数据
    fetchProducts();
  }
}, { immediate: true });

// 初始化加载
onMounted(() => {
  // 检查URL参数
  if (route.query.search) {
    searchStore.setSearchKeyword(route.query.search as string);
  }
  fetchProducts();
});

// 过滤条件数据
const filterOptions = {
  price: [
    { value: "0-100", label: "0-100元" },
    { value: "100-300", label: "100-300元" },
    { value: "300-500", label: "300-500元" },
    { value: "500+", label: "500元以上" },
  ],
  style: [
    { value: "casual", label: "休闲" },
    { value: "formal", label: "正装" },
    { value: "sports", label: "运动" },
    { value: "vintage", label: "复古" },
  ],
  season: [
    { value: "spring", label: "春季" },
    { value: "summer", label: "夏季" },
    { value: "autumn", label: "秋季" },
    { value: "winter", label: "冬季" },
  ],
  material: [
    { value: "cotton", label: "棉质" },
    { value: "wool", label: "羊毛" },
    { value: "silk", label: "丝绸" },
    { value: "linen", label: "亚麻" },
  ],
  color: [
    { value: "black", label: "黑色" },
    { value: "white", label: "白色" },
    { value: "red", label: "红色" },
    { value: "blue", label: "蓝色" },
  ],
  size: [
    { value: "s", label: "S" },
    { value: "m", label: "M" },
    { value: "l", label: "L" },
    { value: "xl", label: "XL" },
  ],
  brand: [
    { value: "brand1", label: "品牌1" },
    { value: "brand2", label: "品牌2" },
    { value: "brand3", label: "品牌3" },
  ],
  discount: [
    { value: "discount1", label: "9折以上" },
    { value: "discount2", label: "7-9折" },
    { value: "discount3", label: "5-7折" },
    { value: "discount4", label: "5折以下" },
  ],
};

// 选中的过滤条件
const selectedFilters = ref({
  price: "",
  style: "",
  season: "",
  material: "",
  color: "",
  size: "",
  brand: "",
  discount: "",
});

// 获取产品关键词
const getProductKeywords = (product: Product) => {
  if (!product.keywords) return [];
  
  // 将逗号分隔的字符串转换为数组，并去除空格
  return product.keywords
    .split(',')
    .map(keyword => keyword.trim())
    .filter(keyword => keyword.length > 0);
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 