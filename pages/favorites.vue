<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-XX XX:XX:XX
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-01-XX XX:XX:XX
 * @FilePath: /yishe-nuxt/pages/favorites.vue
 * @Description: 我的收藏页面 - 显示用户收藏的商品列表
-->
<script lang="ts" setup>
import { ref, onMounted, computed, watch } from 'vue'
import { api } from '~/utils/api'
import { usePublicUserStore } from '~/stores/public-user'
import { useToast } from '~/composables/use-toast'

definePageMeta({ layout: 'page' })

const toast = useToast()
const router = useRouter()
const publicUserStore = usePublicUserStore()

// Page title and meta
useHead({
  titleTemplate: '',
  title: '我的收藏 - 衣设服装设计',
  meta: [
    {
      name: 'description',
      content: '查看我收藏的商品'
    }
  ]
})

// 分页参数
const currentPage = ref<number>(1)
const pageSize = ref<number>(20)
const loading = ref<boolean>(false)

// 收藏列表数据
const favoriteList = ref<any[]>([])
const total = ref<number>(0)

// Hover state for product cards
const hoveredProductId = ref<string | null>(null)

// 商品类型选项（用于显示）
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

// 检查登录状态
const isLoggedIn = computed(() => {
  return publicUserStore.isLoggedIn
})

// 获取收藏列表
const fetchFavorites = async () => {
  if (!isLoggedIn.value) {
    router.push('/login')
    return
  }

  loading.value = true
  try {
    const response = await api.favorite.getMyFavorites({
      currentPage: currentPage.value,
      pageSize: pageSize.value,
      includeProduct: true,
    })
    
    if (response.code === 0 || response.status === true || response.code === 200) {
      favoriteList.value = response.data?.list || []
      total.value = response.data?.total || 0
    } else {
      console.error('获取收藏列表失败:', response.message)
      favoriteList.value = []
      total.value = 0
      toast.error(response.message || '获取收藏列表失败')
    }
  } catch (error: any) {
    console.error('获取收藏列表失败:', error)
    favoriteList.value = []
    total.value = 0
    
    if (error.code === 401 || error.statusCode === 401) {
      // 未授权，清除登录状态并跳转登录页
      publicUserStore.clearToken()
      toast.error('登录已过期，请重新登录')
      router.push('/login')
    } else {
      toast.error(error.message || '获取收藏列表失败')
    }
  } finally {
    loading.value = false
  }
}

// 取消收藏（需要用户确认）
const removeFavorite = async (productId: string, favoriteId: number) => {
  // 用户确认
  const confirmed = window.confirm('确定要取消收藏这个商品吗？')
  if (!confirmed) {
    return
  }

  // 保存当前状态，用于失败时回滚
  const previousCount = total.value

  // 立即从列表中移除
  favoriteList.value = favoriteList.value.filter(item => item.id !== favoriteId)
  total.value = Math.max(0, total.value - 1)

  // 后台异步处理接口
  try {
    const response = await api.favorite.remove(productId)
    if (response.code !== 0 && response.status !== true && response.code !== 200) {
      // 失败，回滚状态
      await fetchFavorites()
      toast.error(response.message || '取消收藏失败')
    } else {
      toast.success('已取消收藏')
    }
  } catch (error: any) {
    console.error("取消收藏失败:", error)
    // 失败，回滚状态
    await fetchFavorites()
    
    if (error.code === 401 || error.statusCode === 401) {
      publicUserStore.clearToken()
      toast.error('登录已过期，请重新登录')
      router.push('/login')
    } else {
      toast.error(error.message || '取消收藏失败')
    }
  }
}

// 跳转到商品详情
const goToProductDetail = (productId: string) => {
  navigateTo(`/product/${productId}`)
}

// 获取商品第一张图片
const getProductImage = (product: any) => {
  if (!product || !product.product) return null
  
  // 检查 product.images 字段
  if (Array.isArray(product.product.images) && product.product.images.length > 0) {
    const validImage = product.product.images.find((img: any) => 
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
  console.warn('图片加载失败:', img.src, '商品ID:', product?.product?.id)
  img.style.opacity = '0'
  
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
  img.style.opacity = '1'
  
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
  const maxPages = 7
  const current = currentPage.value
  const total = totalPages.value
  
  if (total <= maxPages) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    let start = Math.max(1, current - Math.floor(maxPages / 2))
    let end = Math.min(total, start + maxPages - 1)
    
    if (end - start < maxPages - 1) {
      start = Math.max(1, end - maxPages + 1)
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
  }
  
  return pages
})

// 分页处理
const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchFavorites()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 初始化
onMounted(() => {
  if (!isLoggedIn.value) {
    router.push('/login')
    return
  }
  fetchFavorites()
})
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- 页面头部 -->
    <div class="bg-white">
      <div class="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.05em] mb-3 uppercase text-gray-900">我的收藏</h1>
        <p class="text-sm md:text-base font-light text-gray-400 tracking-[0.1em] uppercase">查看我收藏的商品</p>
      </div>
    </div>

    <!-- 收藏列表 -->
    <div class="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20">
      <!-- 加载状态 -->
      <div v-if="loading" class="space-y-4">
        <div v-for="i in 10" :key="i" class="flex gap-6 border-b border-gray-100 pb-6 animate-pulse">
          <div class="w-32 h-32 sm:w-40 sm:h-40 bg-gray-200 flex-shrink-0"></div>
          <div class="flex-1 space-y-3">
            <div class="h-4 bg-gray-200 w-3/4"></div>
            <div class="h-3 bg-gray-200 w-1/2"></div>
            <div class="h-3 bg-gray-200 w-full"></div>
            <div class="h-3 bg-gray-200 w-2/3"></div>
          </div>
        </div>
      </div>

      <!-- 收藏商品列表 -->
      <div v-else-if="favoriteList.length > 0" class="space-y-0">
        <div
          v-for="favorite in favoriteList"
          :key="favorite.id"
          class="group flex flex-col sm:flex-row gap-4 sm:gap-6 border-b border-gray-100 py-6 px-6 sm:px-8 md:px-12 hover:bg-gray-50 transition-all duration-300 cursor-pointer relative"
          @mouseenter="hoveredProductId = favorite.product?.id"
          @mouseleave="hoveredProductId = null"
        >
          <!-- 商品图片 -->
          <div 
            class="relative w-full sm:w-32 md:w-40 h-48 sm:h-32 md:h-40 flex-shrink-0 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
            @click="goToProductDetail(favorite.productId)"
          >
            <template v-if="getProductImage(favorite)">
              <img
                :src="getProductImage(favorite)"
                :alt="favorite.product?.name || '商品图片'"
                class="w-full h-full object-cover transition-all duration-500 ease-out"
                :class="{ 'scale-110 brightness-110': hoveredProductId === favorite.product?.id }"
                @error="handleImageError($event, favorite)"
                @load="handleImageLoad"
              />
              <div 
                class="image-placeholder absolute inset-0 w-full h-full flex items-center justify-center bg-gray-100 z-1"
                style="display: none;"
              >
                <span class="text-gray-400 text-xs">暂无图片</span>
              </div>
            </template>
            <div 
              v-else
              class="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-100 z-0"
            >
              <span class="text-gray-400 text-xs">暂无图片</span>
            </div>
          </div>
          
          <!-- 商品信息 -->
          <div class="flex-1 flex flex-col justify-between min-w-0">
            <div>
              <!-- 类型标签 -->
              <div class="mb-2">
                <div v-if="favorite.product?.type && favorite.product.type !== '二维产品图'">
                  <span class="text-[10px] sm:text-xs text-gray-400 uppercase tracking-[0.15em] font-light">
                    {{ productTypes.find(t => t.value === favorite.product.type)?.label || favorite.product.type }}
                  </span>
                </div>
              </div>
              
              <!-- 商品名称 -->
              <h3 
                class="text-sm sm:text-base md:text-lg font-semibold tracking-wide text-gray-900 mb-2 sm:mb-3 leading-snug text-left transition-colors duration-300 group-hover:text-black cursor-pointer"
                :title="favorite.product?.name"
                @click="goToProductDetail(favorite.productId)"
              >
                {{ favorite.product?.name }}
              </h3>
              
              <!-- 商品描述 -->
              <p 
                v-if="favorite.product?.description" 
                class="text-xs sm:text-sm font-medium text-gray-600 leading-relaxed line-clamp-2 sm:line-clamp-3 mb-3 text-left transition-colors duration-300 group-hover:text-gray-700 cursor-pointer"
                :title="favorite.product.description"
                @click="goToProductDetail(favorite.productId)"
              >
                {{ favorite.product.description }}
              </p>
            </div>
            
            <!-- 底部信息 -->
            <div class="flex items-center justify-between mt-auto pt-2">
              <span class="text-xs text-gray-400 uppercase tracking-widest font-light">
                收藏于 {{ new Date(favorite.createTime).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }) }}
              </span>
              <div class="flex items-center gap-2" @click.stop>
                <button 
                  class="px-4 py-2 text-xs uppercase tracking-[0.15em] text-gray-600 hover:text-black border border-gray-200 hover:border-gray-900 transition-all duration-300 transform hover:scale-105 active:scale-100 font-light"
                  @click="removeFavorite(favorite.productId, favorite.id)"
                >
                  取消收藏
                </button>
                <button 
                  class="px-4 py-2 text-xs uppercase tracking-[0.15em] text-gray-600 hover:text-black border border-gray-200 hover:border-gray-900 transition-all duration-300 transform hover:scale-105 active:scale-100 font-light"
                  @click="goToProductDetail(favorite.productId)"
                >
                  查看详情
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-else class="text-center py-24">
        <Icon name="heroicons:heart" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p class="text-sm text-gray-400 mb-8 tracking-[0.1em] uppercase">暂无收藏</p>
        <NuxtLink
          to="/products"
          class="px-6 py-2 bg-black text-white text-sm uppercase tracking-wider hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 active:scale-100 inline-block"
        >
          去逛逛
        </NuxtLink>
      </div>

      <!-- 分页组件 -->
      <div v-if="!loading && favoriteList.length > 0" class="mt-12 flex flex-col items-center gap-6">
        <!-- 分页信息 -->
        <div class="text-xs text-gray-400 font-light tracking-[0.1em] uppercase">
          共 {{ total }} 件收藏，第 {{ currentPage }} / {{ totalPages }} 页
        </div>
        
        <!-- 分页按钮 -->
        <div class="flex items-center justify-center gap-2 flex-wrap">
          <!-- 上一页 -->
          <button
            @click="handlePageChange(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-4 py-2 text-xs uppercase tracking-[0.15em] disabled:opacity-30 disabled:cursor-not-allowed text-gray-500 hover:text-black border border-gray-200 hover:border-gray-900 transition-all duration-300 transform hover:scale-105 active:scale-100 font-light disabled:hover:scale-100 disabled:hover:border-gray-200"
          >
            上一页
          </button>
          
          <!-- 第一页 -->
          <button
            v-if="pageNumbers[0] > 1"
            @click="handlePageChange(1)"
            class="px-4 py-2 text-xs uppercase tracking-[0.15em] text-gray-500 hover:text-black border border-gray-200 hover:border-gray-900 transition-all duration-300 transform hover:scale-105 active:scale-100 font-light"
          >
            1
          </button>
          <span v-if="pageNumbers[0] > 2" class="px-2 text-gray-300 text-xs">...</span>
          
          <!-- 页码按钮 -->
          <button
            v-for="page in pageNumbers"
            :key="page"
            @click="handlePageChange(page)"
            :class="[
              'px-4 py-2 text-xs uppercase tracking-[0.15em] transition-all duration-300 transform font-light border',
              currentPage === page
                ? 'bg-black text-white border-black scale-105'
                : 'text-gray-500 hover:text-black border-gray-200 hover:border-gray-900 hover:scale-105 active:scale-100'
            ]"
          >
            {{ page }}
          </button>
          
          <!-- 最后一页 -->
          <span v-if="pageNumbers[pageNumbers.length - 1] < totalPages - 1" class="px-2 text-gray-300 text-xs">...</span>
          <button
            v-if="pageNumbers[pageNumbers.length - 1] < totalPages"
            @click="handlePageChange(totalPages)"
            class="px-4 py-2 text-xs uppercase tracking-[0.15em] text-gray-500 hover:text-black border border-gray-200 hover:border-gray-900 transition-all duration-300 transform hover:scale-105 active:scale-100 font-light"
          >
            {{ totalPages }}
          </button>
          
          <!-- 下一页 -->
          <button
            @click="handlePageChange(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 text-xs uppercase tracking-[0.15em] disabled:opacity-30 disabled:cursor-not-allowed text-gray-500 hover:text-black border border-gray-200 hover:border-gray-900 transition-all duration-300 transform hover:scale-105 active:scale-100 font-light disabled:hover:scale-100 disabled:hover:border-gray-200"
          >
            下一页
          </button>
        </div>
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

