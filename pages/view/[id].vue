<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-01-27 11:00:00
 * @FilePath: /yishe-nuxt/pages/view/[id].vue
 * @Description: 商品详情查看页面
-->
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
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

    <!-- 加载状态 -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-gray-600 text-lg">正在加载商品信息...</p>
        <p class="text-gray-400 text-sm mt-2">商品ID: {{ id }}</p>
      </div>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="flex items-center justify-center min-h-screen px-4">
      <div class="text-center max-w-md">
        <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
          <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
          </svg>
        </div>
        <h2 class="text-2xl font-semibold text-gray-900 mb-2">加载失败</h2>
        <p class="text-gray-600 mb-6">{{ error }}</p>
        <button @click="fetchProduct" class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          重新加载
        </button>
      </div>
    </div>

    <!-- 商品详情内容 -->
    <div v-else-if="product" class="max-w-7xl mx-auto">
      <!-- 导航栏 -->
      <nav class="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <NuxtLink to="/search" class="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              返回搜索
            </NuxtLink>
            <div class="flex items-center gap-3">
              <span v-if="product.code" class="text-sm text-gray-500 font-mono">{{ product.code }}</span>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="{
                      'bg-yellow-100 text-yellow-800': product.publishStatus === 'draft',
                      'bg-blue-100 text-blue-800': product.publishStatus === 'pending_social_media',
                      'bg-green-100 text-green-800': product.publishStatus === 'published_social_media',
                      'bg-gray-100 text-gray-800': product.publishStatus === 'archived'
                    }">
                {{ 
                  product.publishStatus === 'draft' ? '草稿' :
                  product.publishStatus === 'pending_social_media' ? '待发布' :
                  product.publishStatus === 'published_social_media' ? '已发布' :
                  product.publishStatus === 'archived' ? '已归档' : '未知状态'
                }}
              </span>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="product.isPublic ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                {{ product.isPublic ? '公开' : '私有' }}
              </span>
            </div>
          </div>
        </div>
      </nav>

      <!-- 主要内容区域 -->
      <main class="px-4 sm:px-6 lg:px-8 py-8">
        <!-- 商品标题 -->
        <div class="text-center mb-12">
          <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {{ product.name || '未命名商品' }}
          </h1>
          <p v-if="product.description" class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {{ product.description }}
          </p>
        </div>

        <!-- 商品图片展示 -->
        <div v-if="productImages.length > 0" class="mb-16">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div 
              v-for="(imageUrl, index) in productImages" 
              :key="index"
              class="group relative aspect-square bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              @click="openImageModal(imageUrl, index)"
            >
              <img 
                :src="imageUrl" 
                :alt="`${product.name} - 图片 ${index + 1}`"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div class="bg-white/90 backdrop-blur-sm rounded-full p-3">
                    <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 关键词标签 -->
        <div v-if="product.keywords" class="mb-16">
          <h2 class="text-2xl font-semibold text-gray-900 mb-6 text-center">关键词</h2>
          <div class="flex flex-wrap justify-center gap-3">
            <span 
              v-for="keyword in product.keywords.split(',').filter((k: string) => k.trim())" 
              :key="keyword.trim()"
              class="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
            >
              {{ keyword.trim() }}
            </span>
          </div>
        </div>

        <!-- 详细信息 -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-8 text-center">详细信息</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="space-y-2">
              <dt class="text-sm font-medium text-gray-500">商品ID</dt>
              <dd class="text-sm text-gray-900 font-mono">{{ product.id }}</dd>
            </div>
            <div class="space-y-2">
              <dt class="text-sm font-medium text-gray-500">素材ID</dt>
              <dd class="text-sm text-gray-900 font-mono">{{ product.materialId }}</dd>
            </div>
            <div class="space-y-2">
              <dt class="text-sm font-medium text-gray-500">模板组ID</dt>
              <dd class="text-sm text-gray-900 font-mono">{{ product.templateGroup2DId }}</dd>
            </div>
            <div class="space-y-2">
              <dt class="text-sm font-medium text-gray-500">创建时间</dt>
              <dd class="text-sm text-gray-900">{{ formatTime(product.createTime) }}</dd>
            </div>
            <div class="space-y-2">
              <dt class="text-sm font-medium text-gray-500">更新时间</dt>
              <dd class="text-sm text-gray-900">{{ formatTime(product.updateTime) }}</dd>
            </div>
            <div class="space-y-2">
              <dt class="text-sm font-medium text-gray-500">图片数量</dt>
              <dd class="text-sm text-gray-900">{{ productImages.length }} 张</dd>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- 图片预览模态框 -->
    <div v-if="showImageModal" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" @click="closeImageModal"></div>
      <div class="relative max-w-7xl max-h-[90vh] mx-4 bg-white rounded-2xl overflow-hidden shadow-2xl">
        <button 
          @click="closeImageModal"
          class="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
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
        <div class="flex items-center justify-between p-4 bg-gray-50">
          <button 
            @click="prevImage" 
            :disabled="currentImageIndex === 0"
            class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
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
            class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
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


