<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-01-27 11:00:00
 * @FilePath: /yishe-nuxt/pages/products.vue
 * @Description: 商品列表页面 - 简洁风格
-->
<script lang="ts" setup>
import { ref, onMounted, computed, watch } from 'vue'
import { api } from '~/utils/api'

definePageMeta({ layout: 'page' })

// Page title and meta
useHead({
  titleTemplate: '',
  title: '商品列表 - 衣设服装设计',
  meta: [
    {
      name: 'description',
      content: '浏览所有商品，发现创意设计作品'
    }
  ]
})

// 查询参数
const route = useRoute()
const router = useRouter()

// 搜索和筛选状态
const searchKeyword = ref<string>('')
const selectedType = ref<string>('')
const currentPage = ref<number>(1)
const pageSize = ref<number>(20)
const loading = ref<boolean>(false)

// 商品列表数据
const productList = ref<any[]>([])
const total = ref<number>(0)

// Hover state for product cards
const hoveredProductId = ref<string | null>(null)

// 商品类型选项
const productTypes = [
  { value: '', label: '全部类型' },
  { value: 'pattern', label: '印花图案' },
  { value: 'clothing', label: '服装设计' },
  { value: 'brand', label: '品牌标识' },
  { value: 'poster', label: '海报设计' },
  { value: 'packaging', label: '包装设计' },
  { value: 'social', label: '社交媒体' },
  { value: 'illustration', label: '插画设计' },
  { value: 'typography', label: '字体设计' },
  { value: 'logo', label: 'Logo设计' },
  { value: 'web', label: '网页设计' }
]

// 从URL参数初始化
const initFromQuery = () => {
  const query = route.query
  if (query.search) {
    searchKeyword.value = String(query.search)
  }
  if (query.type) {
    selectedType.value = String(query.type)
  }
  if (query.page) {
    currentPage.value = Number(query.page) || 1
  }
}

// 获取商品列表
const fetchProducts = async () => {
  loading.value = true
  try {
    const response = await api.productList.getPage({
      page: currentPage.value,
      pageSize: pageSize.value,
      isPublish: true,
      includeRelations: false,
      type: selectedType.value || undefined,
      search: searchKeyword.value || undefined,
    })
    
    if (response.code === 0 || response.status === true || response.code === 200) {
      productList.value = response.data?.list || []
      total.value = response.data?.total || 0
      
      // 调试：打印第一个商品的数据
      if (productList.value.length > 0) {
        console.log('第一个商品数据:', productList.value[0])
        console.log('第一个商品的图片:', productList.value[0].images)
      }
    } else {
      console.error('获取商品列表失败:', response.message)
      productList.value = []
      total.value = 0
    }
  } catch (error) {
    console.error('获取商品列表失败:', error)
    productList.value = []
    total.value = 0
  } finally {
    loading.value = false
  }
}

// 更新URL参数
const updateQuery = () => {
  const query: any = {}
  if (searchKeyword.value) {
    query.search = searchKeyword.value
  }
  if (selectedType.value) {
    query.type = selectedType.value
  }
  if (currentPage.value > 1) {
    query.page = currentPage.value
  }
  
  router.push({
    path: '/products',
    query
  })
}

// 搜索处理
const handleSearch = () => {
  currentPage.value = 1
  updateQuery()
  fetchProducts()
}

// 类型筛选处理
const handleTypeChange = () => {
  currentPage.value = 1
  updateQuery()
  fetchProducts()
}

// 分页处理
const handlePageChange = (page: number) => {
  currentPage.value = page
  updateQuery()
  fetchProducts()
  // 滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 跳转到商品详情
const goToProductDetail = (productId: string) => {
  navigateTo(`/product/${productId}`)
}

// 获取商品第一张图片
const getProductImage = (product: any) => {
  if (!product) return null
  
  // 检查 images 字段
  if (Array.isArray(product.images) && product.images.length > 0) {
    // 找到第一个有效的图片URL（非空且是字符串）
    const validImage = product.images.find((img: any) => 
      img && typeof img === 'string' && img.trim() !== '' && img.startsWith('http')
    )
    if (validImage) {
      return validImage
    }
  }
  
  return null
}

// 处理图片加载错误
const handleImageError = (event: Event, product: any) => {
  const img = event.target as HTMLImageElement
  console.warn('图片加载失败:', img.src, '商品ID:', product?.id)
  
  // 隐藏图片
  img.style.opacity = '0'
  
  // 显示占位符
  const parent = img.parentElement
  if (parent) {
    const placeholder = parent.querySelector('.image-placeholder') as HTMLElement
    if (placeholder) {
      placeholder.style.display = 'flex'
    }
  }
}

// 处理图片加载成功
const handleImageLoad = (event: Event) => {
  const img = event.target as HTMLImageElement
  // 确保图片显示
  img.style.opacity = '1'
  
  // 隐藏占位符
  const parent = img.parentElement
  if (parent) {
    const placeholder = parent.querySelector('.image-placeholder') as HTMLElement
    if (placeholder) {
      placeholder.style.display = 'none'
    }
  }
}

// 计算总页数
const totalPages = computed(() => {
  return Math.ceil(total.value / pageSize.value)
})

// 计算显示的页码数组
const pageNumbers = computed(() => {
  const pages: number[] = []
  const maxPages = 7 // 最多显示7个页码
  const current = currentPage.value
  const total = totalPages.value
  
  if (total <= maxPages) {
    // 如果总页数少于等于7，显示所有页码
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // 计算起始和结束页码
    let start = Math.max(1, current - Math.floor(maxPages / 2))
    let end = Math.min(total, start + maxPages - 1)
    
    // 如果结束页码接近总页数，调整起始页码
    if (end - start < maxPages - 1) {
      start = Math.max(1, end - maxPages + 1)
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
  }
  
  return pages
})

// 监听路由变化
watch(() => route.query, () => {
  initFromQuery()
  fetchProducts()
}, { deep: true })

// 初始化
onMounted(() => {
  initFromQuery()
  fetchProducts()
})
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- 页面头部 -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 py-12">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-light tracking-wider mb-4 uppercase text-gray-900">商品列表</h1>
        <p class="text-base md:text-lg font-light text-gray-500 tracking-wider">发现所有精选设计作品</p>
      </div>
    </div>

    <!-- 搜索和筛选区域 -->
    <div class="bg-white border-b border-gray-200 sticky top-0 z-10 backdrop-blur-sm bg-white/95">
      <div class="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 py-6">
        <div class="flex flex-col md:flex-row gap-4">
          <!-- 搜索框 -->
          <div class="flex-1">
            <div class="relative">
              <input
                v-model="searchKeyword"
                type="text"
                placeholder="搜索商品名称、描述、关键词..."
                class="w-full px-4 py-3 border border-gray-300 focus:border-gray-600 focus:outline-none text-sm tracking-wide bg-white"
                @keyup.enter="handleSearch"
              />
              <button
                @click="handleSearch"
                class="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-gray-900 text-white text-xs uppercase tracking-wider hover:bg-gray-700 transition-colors"
              >
                搜索
              </button>
            </div>
          </div>
          
          <!-- 类型筛选 -->
          <div class="md:w-48">
            <select
              v-model="selectedType"
              @change="handleTypeChange"
              class="w-full px-4 py-3 border border-gray-300 focus:border-gray-600 focus:outline-none text-sm tracking-wide bg-white"
            >
              <option v-for="type in productTypes" :key="type.value" :value="type.value">
                {{ type.label }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- 商品列表 -->
    <div class="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 py-12">
      <!-- 加载状态 -->
      <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        <div v-for="i in 8" :key="i" class="bg-gray-100 animate-pulse" style="aspect-ratio: 1 / 1.3;">
          <div class="w-full h-full bg-gray-200"></div>
        </div>
      </div>

      <!-- 商品网格 -->
      <div v-else-if="productList.length > 0" class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        <div
          v-for="product in productList"
          :key="product.id"
          class="bg-gray-100 overflow-hidden border border-transparent hover:border-gray-300 hover:shadow-md transition-all cursor-pointer"
          @mouseenter="hoveredProductId = product.id"
          @mouseleave="hoveredProductId = null"
          @click="goToProductDetail(product.id)"
        >
          <!-- 商品图片 -->
          <div class="relative w-full h-64 sm:h-80 md:h-80 overflow-hidden bg-gray-100">
            <template v-if="getProductImage(product)">
              <img
                :src="getProductImage(product)"
                :alt="product.name || '商品图片'"
                class="w-full h-full object-cover transition-transform duration-300"
                :class="{ 'scale-105': hoveredProductId === product.id }"
                @error="handleImageError($event, product)"
                @load="handleImageLoad"
              />
              <div 
                class="image-placeholder absolute inset-0 w-full h-full flex items-center justify-center bg-gray-100 z-1"
                style="display: none;"
              >
                <span class="text-gray-400 text-sm">暂无图片</span>
              </div>
            </template>
            <div 
              v-else
              class="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-100 z-0"
            >
              <span class="text-gray-400 text-sm">暂无图片</span>
            </div>
            <!-- Hover 遮罩层 -->
            <div 
              class="absolute inset-0 bg-black/75 flex items-center justify-center transition-opacity duration-300 z-10"
              :class="hoveredProductId === product.id ? 'opacity-100' : 'opacity-0'"
            >
              <div class="px-4 sm:px-8 text-center text-white max-w-[90%]">
                <h3 class="text-lg sm:text-xl md:text-lg font-light tracking-wide uppercase mb-2 sm:mb-4 leading-snug">{{ product.name }}</h3>
                <p v-if="product.description" class="text-xs sm:text-sm md:text-xs font-light text-white/90 leading-relaxed mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3 md:line-clamp-2">{{ product.description }}</p>
                <button class="px-4 sm:px-6 py-2 sm:py-3 bg-transparent text-white/90 text-xs font-semibold tracking-wide uppercase hover:text-white border border-white/30 hover:border-white/60 transition-all" @click.stop="goToProductDetail(product.id)">
                  查看详情
                </button>
              </div>
            </div>
          </div>
          
          <!-- 商品信息 -->
          <div class="p-3 sm:p-6">
            <!-- 类型标签：二维产品图不显示 -->
            <div v-if="product.type && product.type !== '二维产品图'" class="mb-2">
              <span class="text-xs text-gray-500 uppercase tracking-wider">
                {{ productTypes.find(t => t.value === product.type)?.label || product.type }}
              </span>
            </div>
            <h3 class="text-base sm:text-lg md:text-xl font-light tracking-wide uppercase text-gray-900 mb-1 sm:mb-2 truncate" :title="product.name">
              {{ product.name }}
            </h3>
            <p v-if="product.description" class="text-xs sm:text-sm md:text-xs font-light text-gray-500 leading-relaxed line-clamp-2" :title="product.description">
              {{ product.description }}
            </p>
            <!-- 产品代码 -->
            <div v-if="product.code" class="flex items-center justify-end mt-2">
              <span class="text-xs text-gray-400 uppercase tracking-wider">
                {{ product.code }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-else class="text-center py-20">
        <p class="text-lg text-gray-500 mb-4">暂无商品</p>
        <button
          @click="() => { searchKeyword = ''; selectedType = ''; handleSearch() }"
          class="px-6 py-3 border border-gray-400 text-gray-700 text-sm uppercase tracking-wider hover:border-gray-600 hover:text-gray-900 transition-all"
        >
          清除筛选
        </button>
      </div>

      <!-- 分页 -->
      <div v-if="!loading && totalPages > 1" class="mt-16 flex flex-col items-center gap-6">
        <div class="flex items-center justify-center gap-2 flex-wrap">
          <button
            @click="handlePageChange(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-4 py-2 border border-gray-300 text-sm uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-600 transition-colors bg-white"
          >
            上一页
          </button>
          
          <!-- 第一页 -->
          <button
            v-if="pageNumbers[0] > 1"
            @click="handlePageChange(1)"
            class="px-4 py-2 border border-gray-300 text-sm uppercase tracking-wider hover:border-gray-600 transition-colors bg-white"
          >
            1
          </button>
          <span v-if="pageNumbers[0] > 2" class="px-2 text-gray-400">...</span>
          
          <!-- 页码按钮 -->
          <button
            v-for="page in pageNumbers"
            :key="page"
            @click="handlePageChange(page)"
            :class="[
              'px-4 py-2 border text-sm uppercase tracking-wider transition-colors bg-white',
              currentPage === page
                ? 'border-gray-900 bg-gray-900 text-white'
                : 'border-gray-300 hover:border-gray-600'
            ]"
          >
            {{ page }}
          </button>
          
          <!-- 最后一页 -->
          <span v-if="pageNumbers[pageNumbers.length - 1] < totalPages - 1" class="px-2 text-gray-400">...</span>
          <button
            v-if="pageNumbers[pageNumbers.length - 1] < totalPages"
            @click="handlePageChange(totalPages)"
            class="px-4 py-2 border border-gray-300 text-sm uppercase tracking-wider hover:border-gray-600 transition-colors bg-white"
          >
            {{ totalPages }}
          </button>
          
          <button
            @click="handlePageChange(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 border border-gray-300 text-sm uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-600 transition-colors bg-white"
          >
            下一页
          </button>
        </div>
        
        <span class="text-sm text-gray-500 font-light tracking-wide">
          第 {{ currentPage }} / {{ totalPages }} 页，共 {{ total }} 件商品
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

