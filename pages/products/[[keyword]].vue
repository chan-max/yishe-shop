<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-XX XX:XX:XX
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-01-XX XX:XX:XX
 * @FilePath: /yishe-nuxt/pages/products/[[keyword]].vue
 * @Description: 产品列表页面 - 支持路径参数搜索（可选参数，同时支持 /products 和 /products/:keyword）
-->
<script lang="ts" setup>
import { ref, onMounted, computed, watch } from 'vue'
import { api } from '../../utils/api'
import { getPreviewImageUrl } from '../../utils/image'

definePageMeta({ layout: 'page' })

// 获取路径参数
const route = useRoute()
const router = useRouter()

// 解码搜索关键词（处理 URL 编码）
const getDecodedKeyword = () => {
  const keyword = route.params.keyword
  // 如果 keyword 是数组，取第一个元素
  const keywordValue = Array.isArray(keyword) ? keyword[0] : keyword
  if (!keywordValue || typeof keywordValue !== 'string') return ''
  try {
    return decodeURIComponent(keywordValue)
  } catch (e) {
    return keywordValue
  }
}

// 查询参数
const searchKeyword = ref<string>('')          // 关键字（后端 searchText）
const startDate = ref<string>('')              // 发布时间起
const endDate = ref<string>('')                // 发布时间止
const currentPage = ref<number>(1)
const pageSize = ref<number>(24)
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

// 推荐搜索词
const recommendedKeywords = [
  'dashboard',
  'landing page',
  'e-commerce',
  'logo',
  'card',
  'icons'
]

// 筛选面板开关
const showFilters = ref<boolean>(false)

// 价格区间选项（前端过滤）
const priceRanges = [
  { value: 'all', label: '不限' },
  { value: '0-199', label: '¥0 - ¥199' },
  { value: '200-499', label: '¥200 - ¥499' },
  { value: '500-999', label: '¥500 - ¥999' },
  { value: '1000+', label: '¥1000 以上' }
]

// 排序选项（前端排序）
const sortOptions = [
  { value: 'newest', label: '最新优先' },
  { value: 'priceAsc', label: '价格从低到高' },
  { value: 'priceDesc', label: '价格从高到低' },
  { value: 'random', label: '随机看看' }
]

// 从URL参数初始化
const initFromQuery = () => {
  // 从路径参数获取搜索词
  const decodedKeyword = getDecodedKeyword()
  if (decodedKeyword) {
    searchKeyword.value = decodedKeyword
  }
  
  // 从查询参数获取其他筛选条件
  const query = route.query
  if (query.start) {
    startDate.value = String(query.start)
  }
  if (query.end) {
    endDate.value = String(query.end)
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
      searchText: searchKeyword.value || undefined,
      startTime: startDate.value || undefined,
      endTime: endDate.value || undefined,
    })
    
    if (response.code === 0 || response.status === true || response.code === 200) {
      const data = response.data as { list?: any[]; total?: number }
      productList.value = data?.list || []
      total.value = data?.total || 0
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

// 更新URL参数（保持路径格式）
const updateQuery = () => {
  const query: any = {}
  if (startDate.value) {
    query.start = startDate.value
  }
  if (endDate.value) {
    query.end = endDate.value
  }
  if (currentPage.value > 1) {
    query.page = currentPage.value
  }
  
  // 如果有搜索词，使用路径参数格式；否则使用查询参数格式
  if (searchKeyword.value && searchKeyword.value.trim()) {
    const encodedKeyword = encodeURIComponent(searchKeyword.value.trim())
    router.push({
      path: `/products/${encodedKeyword}`,
      query
    })
  } else {
    router.push({
      path: '/products',
      query
    })
  }
}

// 搜索处理
const handleSearch = () => {
  currentPage.value = 1
  updateQuery()
  fetchProducts()
}

// 重置筛选
const resetFilters = () => {
  searchKeyword.value = ''
  startDate.value = ''
  endDate.value = ''
  currentPage.value = 1
  router.push('/products')
}

// 分页处理
const handlePageChange = (page: number) => {
  currentPage.value = page
  updateQuery()
  fetchProducts()
  // 滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 点击推荐关键词
const handleKeywordClick = (keyword: string) => {
  searchKeyword.value = keyword
  handleSearch()
}

// 切换筛选面板
const toggleFilters = () => {
  showFilters.value = !showFilters.value
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

// Page title and meta - 使用 computed 动态更新
const pageTitle = computed(() => {
  const keyword = searchKeyword.value || getDecodedKeyword()
  return keyword ? `${keyword} - 商品列表 - 衣设服装设计` : '商品列表 - 衣设服装设计'
})

const pageDescription = computed(() => {
  const keyword = searchKeyword.value || getDecodedKeyword()
  return keyword ? `搜索"${keyword}"相关的商品，发现创意设计作品` : '浏览所有商品，发现创意设计作品'
})

useHead({
  titleTemplate: '',
  title: pageTitle,
  meta: [
    {
      name: 'description',
      content: pageDescription
    }
  ]
})

// 监听路由变化
watch(() => route.params.keyword, (newKeyword) => {
  const keywordValue = Array.isArray(newKeyword) ? newKeyword[0] : newKeyword
  if (keywordValue) {
    try {
      const decoded = typeof keywordValue === 'string' ? decodeURIComponent(keywordValue) : String(keywordValue)
      if (decoded !== searchKeyword.value) {
        searchKeyword.value = decoded
        currentPage.value = 1
        fetchProducts()
      }
    } catch (e) {
      searchKeyword.value = String(keywordValue)
      currentPage.value = 1
      fetchProducts()
    }
  } else {
    // 如果没有 keyword，清空搜索词
    if (searchKeyword.value) {
      searchKeyword.value = ''
      currentPage.value = 1
      fetchProducts()
    }
  }
}, { immediate: true })

watch(() => route.query, () => {
  initFromQuery()
  fetchProducts()
}, { deep: true })

// 在 setup 阶段就初始化搜索词（确保在模板渲染前就有值）
const initialKeyword = getDecodedKeyword()
if (initialKeyword) {
  searchKeyword.value = initialKeyword
}

// 初始化
onMounted(() => {
  // 确保从路径参数初始化搜索词
  const keyword = getDecodedKeyword()
  if (keyword && keyword !== searchKeyword.value) {
    searchKeyword.value = keyword
  }
  initFromQuery()
  // 立即执行搜索
  fetchProducts()
})
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- 页面头部 -->
    <div class="bg-white">
      <div class="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 pt-12 pb-4 sm:py-14">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.05em] mb-2 uppercase text-gray-900">商品列表</h1>
        <p class="text-[13px] md:text-sm font-light text-gray-500 tracking-[0.08em] uppercase">发现所有精选设计作品</p>
      </div>
    </div>

    <!-- 搜索和时间范围（简洁版） -->
    <div class="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div class="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 py-4">
        <div class="flex flex-col gap-3">
          <!-- 搜索行：圆角胶囊风格 -->
          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-3 bg-transparent">
              <div class="relative flex-1">
                <!-- 扁平化搜索图标 -->
                <span class="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-400">
                  <svg
                    class="w-4 h-4"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="11" cy="11" r="6" stroke="currentColor" stroke-width="1.6" />
                    <line x1="15" y1="15" x2="20" y2="20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
                  </svg>
                </span>
                <input
                  v-model="searchKeyword"
                  type="text"
                  placeholder="搜索商品名称、描述、关键词..."
                  class="w-full rounded-lg border-2 border-transparent bg-[#f3f3f4] pl-11 pr-28 py-3 text-base text-gray-900 placeholder:text-gray-400 transition ease-out duration-200 outline-none focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-100 hover:border-pink-200 hover:bg-white hover:ring-2 hover:ring-pink-50"
                  style="line-height: 1.5; min-height: 48px;"
                  @keyup.enter="handleSearch"
                />
                <button
                  @click="handleSearch"
                  class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center gap-2 px-7 md:px-9 h-10 rounded-lg bg-black text-white text-[13px] uppercase tracking-[0.08em] whitespace-nowrap transition-all duration-200 hover:bg-gray-800 hover:shadow-md active:scale-95 active:shadow-sm"
                >
                  <span class="leading-none">搜索</span>
                </button>
              </div>
              <div class="flex items-center gap-2">
                <button
                  @click="toggleFilters"
                  :class="[
                    'flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs uppercase tracking-[0.08em] whitespace-nowrap transition-all duration-200',
                    showFilters
                      ? 'border-pink-400 text-pink-500 bg-white shadow-sm'
                      : 'border-gray-200 text-gray-600 bg-white hover:border-gray-300 hover:text-black'
                  ]"
                >
                  <svg
                    class="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 7h16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
                    <path d="M7 12h10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
                    <path d="M10 17h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
                  </svg>
                  <span class="leading-none">筛选</span>
                </button>
              </div>
            </div>

            <!-- 推荐关键词 -->
            <div class="flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <span class="font-medium text-gray-700">推荐：</span>
              <button
                v-for="keyword in recommendedKeywords"
                :key="keyword"
                @click="handleKeywordClick(keyword)"
                class="px-3 py-1 rounded-full border border-gray-200 bg-white text-gray-700 hover:border-pink-400 hover:text-pink-500 transition-colors"
              >
                {{ keyword }}
              </button>
              <button
                @click="resetFilters"
                class="ml-auto text-xs uppercase tracking-[0.14em] text-gray-400 hover:text-black transition-colors"
              >
                清空
              </button>
            </div>
          </div>

          <!-- 筛选面板：可折叠 -->
          <div
            v-if="showFilters"
            class="mt-1 rounded-xl border border-gray-200 bg-white px-4 sm:px-6 py-4 shadow-[0_1px_6px_rgba(0,0,0,0.04)] flex flex-col gap-4"
          >
            <!-- 发布时间范围 -->
            <div class="flex flex-col sm:flex-row gap-3 sm:items-center text-xs text-gray-700">
              <span class="uppercase tracking-[0.15em] text-gray-600 whitespace-nowrap">按发布时间</span>
              <div class="flex items-center gap-2.5 flex-1 flex-wrap">
                <input
                  v-model="startDate"
                  type="date"
                  class="px-3 py-2 rounded-md border border-gray-200 bg-white text-xs focus:border-pink-400 focus:ring-1 focus:ring-pink-100 transition-colors"
                  @change="handleSearch"
                />
                <span class="text-gray-400">—</span>
                <input
                  v-model="endDate"
                  type="date"
                  class="px-3 py-2 rounded-md border border-gray-200 bg-white text-xs focus:border-pink-400 focus:ring-1 focus:ring-pink-100 transition-colors"
                  @change="handleSearch"
                />
                <span class="text-[11px] text-gray-500">
                  默认按最新发布时间排序
                </span>
              </div>
            </div>

            <!-- 重置按钮 -->
            <div class="flex justify-end">
              <button
                @click="resetFilters"
                class="px-4 py-2 text-xs uppercase tracking-[0.14em] text-gray-500 border border-gray-200 rounded-md hover:border-black hover:text-black transition-colors"
              >
                重置筛选
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 商品列表 -->
    <div class="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20">
      <!-- 加载状态 -->
      <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1 sm:gap-2 md:gap-2 lg:gap-3">
        <div v-for="i in 12" :key="i" class="bg-gradient-to-br from-gray-50 to-gray-100 animate-pulse" style="aspect-ratio: 3 / 4;">
          <div class="w-full h-full bg-gray-200"></div>
        </div>
      </div>

      <!-- 商品网格 -->
      <div v-else-if="productList.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1 sm:gap-2 md:gap-2 lg:gap-3">
        <div
          v-for="product in productList"
          :key="product.id"
          class="group overflow-hidden transition-all duration-500 cursor-pointer bg-white"
          @mouseenter="hoveredProductId = product.id"
          @mouseleave="hoveredProductId = null"
          @click="goToProductDetail(product.id)"
        >
          <!-- 商品图片 -->
          <div class="relative w-full aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
            <template v-if="getProductImage(product)">
              <img
                :src="getPreviewImageUrl(getProductImage(product), { width: 500, quality: 80, format: 'webp' }) || undefined"
                :alt="product.name || '商品图片'"
                class="w-full h-full object-cover transition-all duration-700 ease-out"
                :class="{ 'scale-110 brightness-110': hoveredProductId === product.id }"
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
              class="absolute inset-0 bg-gradient-to-b from-black/95 via-black/85 to-black/95 flex items-center justify-center transition-all duration-500 z-10 backdrop-blur-[1px]"
              :class="hoveredProductId === product.id ? 'opacity-100' : 'opacity-0 pointer-events-none'"
            >
              <div class="px-4 sm:px-8 text-center text-white max-w-[90%] transform transition-all duration-300"
                   :class="hoveredProductId === product.id ? 'scale-100' : 'scale-95'">
                <h3 class="text-lg sm:text-xl md:text-lg font-light tracking-wide uppercase mb-2 sm:mb-4 leading-snug transform transition-transform duration-300"
                    :class="hoveredProductId === product.id ? 'scale-100' : 'scale-95'">{{ product.name }}</h3>
                <p v-if="product.description" class="text-xs sm:text-sm md:text-xs font-light text-white/90 leading-relaxed mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3 md:line-clamp-2 transform transition-transform duration-300 delay-75"
                   :class="hoveredProductId === product.id ? 'opacity-100' : 'opacity-0'">{{ product.description }}</p>
                <button 
                  class="px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-sm text-white text-xs font-semibold tracking-wide uppercase border border-white/40 rounded-sm transition-all duration-300 transform hover:bg-white/20 hover:border-white/80 hover:scale-105 active:scale-100"
                  :class="hoveredProductId === product.id ? 'opacity-100 delay-150' : 'opacity-0'"
                  @click.stop="goToProductDetail(product.id)">
                  查看详情
                </button>
              </div>
            </div>
          </div>
          
          <!-- 商品信息 -->
          <div class="pt-4 sm:pt-5 px-4 sm:px-5 pb-3 sm:pb-4">

            <h3 class="text-xs sm:text-sm md:text-base font-semibold tracking-wide text-gray-900 mb-2 sm:mb-3 line-clamp-2 text-left leading-snug transition-colors duration-300 group-hover:text-black" :title="product.name">
              {{ product.name }}
            </h3>
            <p v-if="product.description" class="text-[10px] sm:text-xs font-medium text-gray-600 leading-relaxed line-clamp-2 mb-3 text-left transition-colors duration-300 group-hover:text-gray-700" :title="product.description">
              {{ product.description }}
            </p>
            <!-- 产品代码 -->
            <div v-if="product.code" class="flex items-center justify-end mt-3">
              <span class="text-[10px] text-gray-300 uppercase tracking-widest font-light">
                {{ product.code }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-else class="text-center py-24">
        <p class="text-sm text-gray-400 mb-8 tracking-[0.1em] uppercase">暂无商品</p>
        <button
          @click="resetFilters"
          class="px-0 py-2 text-gray-500 text-xs uppercase tracking-[0.2em] hover:text-black transition-all duration-300 transform hover:scale-105 active:scale-100 relative group font-light"
        >
          <span class="relative">
            清除筛选
            <span class="absolute bottom-0 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full"></span>
          </span>
        </button>
      </div>

      <!-- 分页 -->
      <div v-if="!loading && totalPages > 1 && productList.length > 0" class="mt-20 flex flex-col items-center gap-8">
        <div class="flex items-center justify-center gap-3 flex-wrap">
          <button
            @click="handlePageChange(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-6 py-2 text-xs uppercase tracking-[0.15em] disabled:opacity-30 disabled:cursor-not-allowed text-gray-500 hover:text-black transition-all duration-300 transform hover:scale-105 active:scale-100 font-light disabled:hover:scale-100"
          >
            上一页
          </button>
          
          <!-- 第一页 -->
          <button
            v-if="pageNumbers[0] > 1"
            @click="handlePageChange(1)"
            class="px-4 py-2 text-xs uppercase tracking-[0.15em] text-gray-500 hover:text-black transition-all duration-300 transform hover:scale-105 active:scale-100 font-light"
          >
            1
          </button>
          <span v-if="pageNumbers[0] > 2" class="px-2 text-gray-300">...</span>
          
          <!-- 页码按钮 -->
          <button
            v-for="page in pageNumbers"
            :key="page"
            @click="handlePageChange(page)"
            :class="[
              'px-4 py-2 text-xs uppercase tracking-[0.15em] transition-all duration-300 transform font-light',
              currentPage === page
                ? 'bg-black text-white scale-105'
                : 'text-gray-500 hover:text-black hover:scale-105 active:scale-100'
            ]"
          >
            {{ page }}
          </button>
          
          <!-- 最后一页 -->
          <span v-if="pageNumbers[pageNumbers.length - 1] < totalPages - 1" class="px-2 text-gray-300">...</span>
          <button
            v-if="pageNumbers[pageNumbers.length - 1] < totalPages"
            @click="handlePageChange(totalPages)"
            class="px-4 py-2 text-xs uppercase tracking-[0.15em] text-gray-500 hover:text-black transition-all duration-300 transform hover:scale-105 active:scale-100 font-light"
          >
            {{ totalPages }}
          </button>
          
          <button
            @click="handlePageChange(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-6 py-2 text-xs uppercase tracking-[0.15em] disabled:opacity-30 disabled:cursor-not-allowed text-gray-500 hover:text-black transition-all duration-300 transform hover:scale-105 active:scale-100 font-light disabled:hover:scale-100"
          >
            下一页
          </button>
        </div>
        
        <span class="text-xs text-gray-400 font-light tracking-[0.1em] uppercase">
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

