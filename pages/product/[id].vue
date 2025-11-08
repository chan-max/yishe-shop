<template>
  <div class="min-h-screen bg-white">
    <!-- 加载状态 -->
    <div v-if="loading" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="relative inline-block mb-6">
          <div class="w-16 h-16 border-2 border-gray-200 border-t-black rounded-full animate-spin"></div>
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
          class="inline-flex items-center space-x-2 text-sm text-black hover:text-gray-600 transition-colors uppercase tracking-wider"
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
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-black transition-colors shadow-sm"
          aria-label="上一个商品"
        >
          <Icon name="heroicons:chevron-left" class="w-6 h-6 text-black" />
        </button>

        <!-- 右侧导航箭头 -->
        <button
          v-if="hasNextProduct"
          @click="navigateToNext"
          class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-black transition-colors shadow-sm"
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
            class="absolute left-0 sm:left-2 md:left-4 lg:left-8 xl:left-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white border border-gray-200 flex items-center justify-center transition-colors shadow-sm z-10"
            aria-label="上一张图片"
          >
            <Icon name="heroicons:chevron-left" class="w-6 h-6 text-black" />
          </button>

          <!-- 图片容器 -->
          <div class="relative max-w-2xl w-full ml-12 mr-12 sm:ml-16 sm:mr-16 md:ml-20 md:mr-20" style="aspect-ratio: 4 / 3;">
            <!-- 主图 -->
            <img
              v-if="currentImage"
              :src="currentImage"
              :alt="product.name"
              class="w-full h-full object-contain"
              @error="handleImageError"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <span class="text-gray-400 text-sm">暂无图片</span>
            </div>

            <!-- 图片缩略图导航 -->
            <div
              v-if="productImages.length > 1"
              class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2"
            >
              <button
                v-for="(img, index) in productImages"
                :key="index"
                @click="currentImageIndex = index"
                :class="[
                  'w-2 h-2 rounded-full transition-all',
                  currentImageIndex === index ? 'bg-black w-8' : 'bg-gray-300 hover:bg-gray-400'
                ]"
                :aria-label="`查看图片 ${index + 1}`"
              />
            </div>
          </div>

          <!-- 右侧切换按钮 -->
          <button
            v-if="productImages.length > 1"
            @click="nextImage"
            class="absolute right-0 sm:right-2 md:right-4 lg:right-8 xl:right-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white border border-gray-200 flex items-center justify-center transition-colors shadow-sm z-10"
            aria-label="下一张图片"
          >
            <Icon name="heroicons:chevron-right" class="w-6 h-6 text-black" />
          </button>
        </div>

        <!-- 探索相关内容按钮 -->
        <div class="mb-8 text-center">
          <button
            @click="exploreRelated"
            class="inline-flex items-center space-x-2 px-6 py-3 bg-black text-white text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
          >
            <Icon name="heroicons:sparkles" class="w-4 h-4" />
            <span>探索相关内容</span>
          </button>
        </div>

        <!-- 商品信息区域 -->
        <div class="max-w-4xl mx-auto space-y-6">
          <!-- 商品名称 -->
          <div>
            <h1 class="text-2xl sm:text-3xl font-light tracking-wide text-black mb-2">
              {{ product.name }}
            </h1>
            <p v-if="product.description" class="text-base text-gray-600 leading-relaxed">
              {{ product.description }}
            </p>
          </div>

          <!-- 创建时间信息 -->
          <div v-if="product.createTime && product.type !== '二维产品图'" class="text-sm text-gray-500">
            <span>{{ formatDate(product.createTime) }}</span>
          </div>

          <!-- 详细信息 -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
            <!-- 价格信息（非二维产品图显示） -->
            <div v-if="product.type !== '二维产品图' && product.price != null">
              <h3 class="text-xs uppercase tracking-wider text-gray-500 mb-2">价格</h3>
              <div class="flex items-baseline space-x-2">
                <span class="text-xl font-light text-black">
                  ¥{{ Number(product.price).toFixed(2) }}
                </span>
                <span v-if="product.salePrice && product.salePrice !== product.price" class="text-sm text-gray-400 line-through">
                  ¥{{ Number(product.salePrice).toFixed(2) }}
                </span>
              </div>
            </div>

            <!-- 商品代码 -->
            <div v-if="product.code">
              <h3 class="text-xs uppercase tracking-wider text-gray-500 mb-2">产品代码</h3>
              <p class="text-sm text-black uppercase tracking-wider">{{ product.code }}</p>
            </div>

            <!-- 库存信息 -->
            <div v-if="product.type !== '二维产品图' && product.stock !== undefined">
              <h3 class="text-xs uppercase tracking-wider text-gray-500 mb-2">库存</h3>
              <p class="text-sm text-black">{{ product.stock }} 件</p>
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
              class="flex items-center space-x-2 text-sm text-gray-600 hover:text-black transition-colors"
            >
              <Icon name="heroicons:link" class="w-5 h-5" />
              <span class="uppercase tracking-wider">复制链接</span>
            </button>
            <button
              @click="shareProduct"
              class="flex items-center space-x-2 text-sm text-gray-600 hover:text-black transition-colors"
            >
              <Icon name="heroicons:share" class="w-5 h-5" />
              <span class="uppercase tracking-wider">分享</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 未找到商品 -->
    <div v-else class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <Icon name="heroicons:exclamation-triangle" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-light text-gray-900 mb-2">商品不存在</h3>
        <p class="text-sm text-gray-500 mb-6">抱歉，您查找的商品不存在或已被删除</p>
        <button
          @click="router.push('/products')"
          class="px-6 py-2 bg-black text-white text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
        >
          返回商品列表
        </button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { api } from '~/utils/api'

definePageMeta({ layout: 'page' })
useHead({ 
  titleTemplate: '', 
  title: '商品详情 - 衣设服装设计' 
})

const route = useRoute()
const router = useRouter()

// 状态
const loading = ref(true)
const product = ref(null)
const currentImageIndex = ref(0)

// 计算属性
const productImages = computed(() => {
  if (!product.value) return []
  
  const images = []
  
  // 添加商品图片
  if (product.value.images && Array.isArray(product.value.images)) {
    product.value.images.forEach((url) => {
      if (url && typeof url === 'string' && url.trim() && url.startsWith('http')) {
        images.push(url)
      }
    })
  }
  
  return images
})

const currentImage = computed(() => {
  if (productImages.value.length === 0) return null
  return productImages.value[currentImageIndex.value] || productImages.value[0]
})

const productKeywords = computed(() => {
  if (!product.value?.keywords) return []
  return product.value.keywords
    .split(',')
    .map(k => k.trim())
    .filter(k => k.length > 0)
})

const hasPreviousProduct = computed(() => {
  // TODO: 实现上一个商品的逻辑
  return false
})

const hasNextProduct = computed(() => {
  // TODO: 实现下一个商品的逻辑
  return false
})

// 获取商品详情
const fetchProductDetail = async () => {
  loading.value = true
  try {
    const response = await api.productList.getById(route.params.id, false)
    
    if (response.code === 0 || response.status === true || response.code === 200) {
      product.value = response.data
      // 重置图片索引
      currentImageIndex.value = 0
    } else {
      console.error('获取商品详情失败:', response.message)
      product.value = null
    }
  } catch (error) {
    console.error('获取商品详情失败:', error)
    product.value = null
  } finally {
    loading.value = false
  }
}

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 处理图片加载错误
const handleImageError = (event) => {
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
}

// 切换到上一张图片
const previousImage = () => {
  if (productImages.value.length > 0) {
    currentImageIndex.value = (currentImageIndex.value - 1 + productImages.value.length) % productImages.value.length
  }
}

// 切换到下一张图片
const nextImage = () => {
  if (productImages.value.length > 0) {
    currentImageIndex.value = (currentImageIndex.value + 1) % productImages.value.length
  }
}

// 探索相关内容
const exploreRelated = () => {
  if (product.value?.type) {
    router.push(`/products?type=${encodeURIComponent(product.value.type)}`)
  } else {
    router.push('/products')
  }
}

// 复制链接
const copyLink = async () => {
  try {
    const url = window.location.href
    await navigator.clipboard.writeText(url)
    // TODO: 显示成功提示
    alert('链接已复制到剪贴板')
  } catch (error) {
    console.error('复制链接失败:', error)
  }
}

// 分享商品
const shareProduct = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: product.value?.name || '商品详情',
        text: product.value?.description || '',
        url: window.location.href
      })
    } catch (error) {
      console.error('分享失败:', error)
    }
  } else {
    // 降级到复制链接
    copyLink()
  }
}

// 导航到上一个商品
const navigateToPrevious = () => {
  // TODO: 实现上一个商品的导航逻辑
}

// 导航到下一个商品
const navigateToNext = () => {
  // TODO: 实现下一个商品的导航逻辑
}

// 监听路由参数变化
watch(() => route.params.id, () => {
  if (route.params.id) {
    fetchProductDetail()
  }
}, { immediate: true })

</script>
