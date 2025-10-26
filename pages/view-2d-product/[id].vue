<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-01-27 11:00:00
 * @FilePath: /yishe-nuxt/pages/view-2d-product/[id].vue
 * @Description: 商品详情查看页面
-->
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { api } from '@/utils/api'

// 获取运行时配置
const runtimeConfig = useRuntimeConfig()

// 获取路由参数并标准化为字符串（避免为数组或无效值导致请求异常）
const route = useRoute()
const rawId = route.params.id
const id = Array.isArray(rawId) ? String(rawId[0] ?? '') : String(rawId ?? '')

// 响应式数据
const product = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)

// 图片模态框相关
const showImageModal = ref(false)
const currentImage = ref('')
const currentImageIndex = ref(0)

// 轮播相关
const currentSlide = ref(0)
const autoPlay = ref(true)
const autoPlayInterval = ref<NodeJS.Timeout | null>(null)

// 打开图片模态框
const openImageModal = (imageUrl: string, index: number) => {
  currentImage.value = imageUrl
  currentImageIndex.value = index
  showImageModal.value = true
}

// 关闭图片模态框
const closeImageModal = () => {
  showImageModal.value = false
}

// 上一张图片
const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
    currentImage.value = productImages.value[currentImageIndex.value]
  }
}

// 下一张图片
const nextImage = () => {
  if (currentImageIndex.value < productImages.value.length - 1) {
    currentImageIndex.value++
    currentImage.value = productImages.value[currentImageIndex.value]
  }
}

// 轮播控制
const nextSlide = () => {
  if (currentSlide.value < productImages.value.length - 1) {
    currentSlide.value++
  } else {
    currentSlide.value = 0
  }
}

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  } else {
    currentSlide.value = productImages.value.length - 1
  }
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}

// 自动播放
const startAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
  }
  if (autoPlay.value && productImages.value.length > 1) {
    autoPlayInterval.value = setInterval(() => {
      nextSlide()
    }, 3000)
  }
}

const stopAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
    autoPlayInterval.value = null
  }
}

// 计算属性 - 获取所有图片
const productImages = computed(() => {
  if (!product.value) return []
  
  const images: string[] = []
  for (let i = 1; i <= 10; i++) {
    const imageUrl = product.value[`image${i}`]
    if (imageUrl && typeof imageUrl === 'string' && imageUrl.trim()) {
      images.push(imageUrl)
    }
  }
  return images
})

// 计算属性 - 格式化时间
const formatTime = (timeStr: string) => {
  if (!timeStr) return ''
  const date = new Date(timeStr)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 获取商品详情（支持通过ID或code查询，后端会自动识别）
const fetchProduct = async () => {
  try {
    loading.value = true
    error.value = null
    
    console.log('正在请求商品标识:', id)
    console.log('API基础URL:', runtimeConfig.public.apiBase)
    
    // 后端会自动识别是ID还是code
    const response = await api.product.getById(id)
    
    console.log('API响应:', response)
    
    if (response.code === 0 || response.status === true || response.code === 200) {
      product.value = response.data
    } else {
      error.value = response.message || '获取商品信息失败'
    }
  } catch (err: any) {
    console.error('API请求错误:', err)
    error.value = err.message || '网络请求失败'
  } finally {
    loading.value = false
  }
}

// 页面加载时获取数据
onMounted(() => {
  console.log('页面加载，获取到的ID:', id)
  console.log('ID类型:', typeof id)
  console.log('ID是否为空:', !id)
  
  if (id && id !== 'undefined' && id !== 'null') {
    console.log('开始获取商品详情，ID:', id)
    fetchProduct()
  } else {
    console.error('商品ID无效:', id)
    error.value = `商品ID无效: ${id}`
    loading.value = false
  }
})

// 监听图片变化，启动自动播放
watch(productImages, (newImages) => {
  if (newImages.length > 0) {
    nextTick(() => {
      startAutoPlay()
    })
  }
}, { immediate: true })

// 组件卸载时清理定时器
onUnmounted(() => {
  stopAutoPlay()
})

// 设置页面标题和meta信息
useHead({
  title: computed(() => product.value ? `${product.value.name || '商品详情'} - 衣设服装设计` : '商品详情 - 衣设服装设计'),
  meta: [
    {
      name: 'description',
      content: computed(() => product.value?.description || '查看商品详细信息')
    },
    {
      name: 'keywords',
      content: computed(() => product.value?.keywords || '商品详情,服装设计')
    }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 调试信息（默认隐藏） -->
    <div v-if="false" class="fixed top-4 left-4 z-50 bg-blue-100 p-4 rounded-lg text-sm">
      <p>当前ID: {{ id }}</p>
      <p>API URL: {{ runtimeConfig.public.apiBase }}</p>
    </div>

    <!-- 简洁加载状态 -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <!-- 简洁的加载圆圈 -->
        <div class="relative mx-auto mb-6 w-12 h-12">
          <div class="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          <div class="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        <!-- 加载文字 -->
        <p class="text-gray-600 font-medium">加载中...</p>
      </div>
    </div>

    <!-- 简约错误状态 -->
    <div v-else-if="error" class="flex items-center justify-center min-h-screen px-4">
      <div class="text-center max-w-md">
        <!-- 简约错误卡片 -->
        <div class="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
          <!-- 简约错误图标 -->
          <div class="w-16 h-16 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/>
            </svg>
          </div>
          <h2 class="text-2xl font-medium text-gray-900 mb-4">加载失败</h2>
          <p class="text-gray-600 mb-6">{{ error }}</p>
          <!-- 简约按钮 -->
          <button @click="fetchProduct" class="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            重新加载
          </button>
        </div>
      </div>
    </div>

    <!-- 商品详情内容 -->
    <div v-else-if="product" class="max-w-7xl mx-auto">
      <!-- 简约导航栏 -->
      <nav class="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <!-- 简约返回按钮 -->
            <NuxtLink to="/search" class="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              <span class="font-medium">返回搜索</span>
            </NuxtLink>
            <div class="flex items-center gap-3">
              <span v-if="product.code" class="text-sm font-mono px-3 py-1 bg-gray-100 text-gray-600 rounded">{{ product.code }}</span>
            </div>
          </div>
        </div>
      </nav>

      <!-- 主要内容区域 -->
      <main class="px-4 sm:px-6 lg:px-8 py-20">
        <!-- 电商风格左右布局 -->
        <div v-if="productImages.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <!-- 左侧：图片轮播 -->
          <div class="order-1">
            <div class="relative max-w-md mx-auto lg:mx-0">
              <!-- 主轮播图 -->
              <div class="relative aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
                <img 
                  :src="productImages[currentSlide]" 
                  :alt="`${product.name} - 图片 ${currentSlide + 1}`"
                  class="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                  @click="openImageModal(productImages[currentSlide], currentSlide)"
                  loading="lazy"
                />
                
                <!-- 轮播控制按钮 -->
                <button 
                  v-if="productImages.length > 1"
                  @click="prevSlide"
                  @mouseenter="stopAutoPlay"
                  @mouseleave="startAutoPlay"
                  class="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:shadow-xl"
                >
                  <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                  </svg>
                </button>
                
                <button 
                  v-if="productImages.length > 1"
                  @click="nextSlide"
                  @mouseenter="stopAutoPlay"
                  @mouseleave="startAutoPlay"
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:shadow-xl"
                >
                  <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
              
              <!-- 缩略图导航 -->
              <div v-if="productImages.length > 1" class="flex gap-2 mt-4 overflow-x-auto pb-2">
                <button
                  v-for="(imageUrl, index) in productImages"
                  :key="index"
                  @click="goToSlide(index)"
                  @mouseenter="stopAutoPlay"
                  @mouseleave="startAutoPlay"
                  class="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200"
                  :class="currentSlide === index ? 'border-blue-500 shadow-lg' : 'border-gray-200 hover:border-gray-300'"
                >
                  <img 
                    :src="imageUrl" 
                    :alt="`缩略图 ${index + 1}`"
                    class="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              </div>
              
              <!-- 轮播指示器 -->
              <div v-if="productImages.length > 1" class="flex justify-center gap-2 mt-4">
                <button
                  v-for="(_, index) in productImages"
                  :key="index"
                  @click="goToSlide(index)"
                  @mouseenter="stopAutoPlay"
                  @mouseleave="startAutoPlay"
                  class="w-2 h-2 rounded-full transition-all duration-200"
                  :class="currentSlide === index ? 'bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'"
                ></button>
              </div>
            </div>
          </div>
          
          <!-- 右侧：商品信息 -->
          <div class="order-2">
            <div class="sticky top-24 max-w-lg mx-auto lg:mx-0">
              <h1 class="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
                {{ product.name || '未命名商品' }}
              </h1>
              
              <p v-if="product.description" class="text-base text-gray-600 mb-8 leading-relaxed">
                {{ product.description }}
              </p>
              
              <!-- 关键词标签 -->
              <div v-if="product.keywords" class="mb-8">
                <p class="text-sm text-gray-500 mb-3">关键词</p>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="keyword in product.keywords.split(',').filter((k: string) => k.trim())" 
                    :key="keyword.trim()"
                    class="inline-block px-3 py-1 bg-gray-50 text-gray-600 rounded text-sm border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    {{ keyword.trim() }}
                  </span>
                </div>
              </div>
              
              <!-- 创建时间 -->
              <div class="mb-8">
                <p class="text-sm text-gray-500 mb-1">创建时间</p>
                <p class="text-sm text-gray-900">{{ formatTime(product.createTime) }}</p>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>

    <!-- 简约图片预览模态框 -->
    <div v-if="showImageModal" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/80" @click="closeImageModal"></div>
      <div class="relative max-w-7xl max-h-[90vh] mx-4 bg-white rounded-lg overflow-hidden shadow-2xl">
        <!-- 简约关闭按钮 -->
        <button 
          @click="closeImageModal"
          class="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <img 
          :src="currentImage" 
          :alt="`${product?.name} - 预览`" 
          class="max-w-full max-h-[70vh] object-contain mx-auto block"
        />
        <!-- 简约操作栏 -->
        <div class="flex items-center justify-between p-4 bg-gray-50">
          <button 
            @click="prevImage" 
            :disabled="currentImageIndex === 0"
            class="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            上一张
          </button>
          <span class="text-sm font-medium text-gray-600">
            {{ currentImageIndex + 1 }} / {{ productImages.length }}
          </span>
          <button 
            @click="nextImage" 
            :disabled="currentImageIndex === productImages.length - 1"
            class="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            下一张
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


