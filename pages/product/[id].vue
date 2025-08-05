<template>
  <div class="container mx-auto px-4 py-4">
    <div class="max-w-4xl mx-auto">
      <!-- 返回按钮 -->
      <div class="mb-4">
        <button
          @click="router.push('/products')"
          class="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md border border-gray-200 hover:border-gray-300 transition-all duration-200"
        >
          <Icon name="heroicons:arrow-left" class="w-3.5 h-3.5" />
          <span>返回商品列表</span>
        </button>
      </div>

      <!-- 加载状态 -->
      <div v-if="loading" class="text-center py-16">
        <div class="relative inline-block mb-6">
          <div class="w-20 h-20 border-4 border-gray-200 border-t-gray-400 rounded-full animate-spin"></div>
          <div class="absolute inset-2 w-16 h-16 bg-gray-300 rounded-full animate-pulse"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <Icon name="heroicons:shopping-bag" class="w-8 h-8 text-white animate-bounce" />
          </div>
        </div>
        <h3 class="text-lg font-medium text-gray-800">正在加载商品详情</h3>
      </div>

      <!-- 商品详情 -->
      <div v-else-if="product" class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <!-- 左侧图片区域 -->
        <div class="space-y-2">
          <!-- 主图 -->
          <div class="aspect-square rounded-md overflow-hidden bg-gray-100">
            <img
              v-if="product.customModel?.thumbnail"
              :src="product.customModel.thumbnail"
              :alt="product.name"
              class="w-full h-full object-cover"
            />
            <img
              v-else-if="product.images && product.images.length > 0"
              :src="product.images[0]"
              :alt="product.name"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <Icon name="heroicons:photo" class="w-12 h-12 text-gray-400" />
            </div>
          </div>

          <!-- 商品图片列表 -->
          <div v-if="getProductImages().length > 0" class="space-y-3">
            <h3 class="text-xs font-medium text-gray-900">商品图片</h3>
            <div class="grid grid-cols-4 gap-1.5">
              <div
                v-for="(image, index) in getProductImages().slice(0, 8)"
                :key="index"
                class="relative aspect-square rounded-md overflow-hidden bg-gray-100 cursor-pointer hover:opacity-80 transition-opacity group"
              >
                <img
                  :src="image.url"
                  :alt="image.name || `${product.name} - 图片${index + 1}`"
                  class="w-full h-full object-cover"
                />
                <!-- 图片类型标识 -->
                <div class="absolute top-0.5 right-0.5 px-1 py-0.5 text-xs bg-black/50 text-white rounded">
                  {{ image.type === 'draft' ? '设计稿' : '商品图' }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧信息区域 -->
        <div class="space-y-4">
          <!-- 商品标题 -->
          <div>
            <h1 class="text-xl font-bold text-gray-900 mb-1">{{ product.name }}</h1>
            <p v-if="product.description" class="text-sm text-gray-600">{{ product.description }}</p>
          </div>

          <!-- 商品标签 -->
          <div v-if="product.tag" class="inline-block">
            <span class="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              {{ product.tag }}
            </span>
          </div>

          <!-- 关键词标签 -->
          <div v-if="getProductKeywords(product).length > 0">
            <h3 class="text-xs font-medium text-gray-900 mb-1">关键词</h3>
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="keyword in getProductKeywords(product)"
                :key="keyword"
                class="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {{ keyword }}
              </span>
            </div>
          </div>



          <!-- 价格信息 -->
          <div v-if="product.price" class="flex items-center space-x-3">
            <div class="text-xl font-bold text-red-600">
              ¥{{ product.salePrice || product.price }}
            </div>
            <div v-if="product.salePrice && product.salePrice !== product.price" class="text-base text-gray-400 line-through">
              ¥{{ product.price }}
            </div>
          </div>

          <!-- 库存信息 -->
          <div v-if="product.stock !== undefined" class="text-xs text-gray-600">
            库存：{{ product.stock }} 件
          </div>

          <!-- 商品类型 -->
          <div v-if="product.type" class="text-xs text-gray-600">
            类型：{{ product.type }}
          </div>

          <!-- 创建时间 -->
          <div class="text-xs text-gray-500">
            创建时间：{{ formatDate(product.createTime) }}
          </div>

          <!-- 操作按钮 -->
          <div class="space-y-3 pt-4">
            <button class="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-sm shadow-sm hover:shadow-md">
              立即购买
            </button>
            <button class="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-2.5 px-4 rounded-lg font-medium hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 text-sm flex items-center justify-center space-x-2 shadow-sm hover:shadow-md">
              <Icon name="heroicons:sparkles" class="w-4 h-4" />
              <span>设计师免费设计同款</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 未找到商品 -->
      <div v-else class="text-center py-16">
        <Icon name="heroicons:exclamation-triangle" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">商品不存在</h3>
        <p class="text-gray-500 mb-6">抱歉，您查找的商品不存在或已被删除</p>
        <button
          @click="router.push('/products')"
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          返回商品列表
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'page' })
useHead({ titleTemplate: '', title: '商品详情 - 衣设服装设计' })

const route = useRoute()
const router = useRouter()

// 状态
const loading = ref(true)
const product = ref(null)

// 获取商品详情
const fetchProductDetail = async () => {
  loading.value = true
  try {
    const { $customFetch } = useNuxtApp()
    const response = await $customFetch(`/product/${route.params.id}`, {
      method: 'GET'
    })
    product.value = response
  } catch (error) {
    console.error('获取商品详情失败:', error)
    product.value = null
  } finally {
    loading.value = false
  }
}

// 获取产品关键词
const getProductKeywords = (product) => {
  if (!product.keywords) return []
  
  return product.keywords
    .split(',')
    .map(keyword => keyword.trim())
    .filter(keyword => keyword.length > 0)
}

// 获取商品图片列表（整合drafts和商品图片）
const getProductImages = () => {
  const images = []
  
  // 添加drafts（通过customModelId查询的）
  if (product.value?.drafts) {
    product.value.drafts.forEach(draft => {
      if (draft.url) {
        images.push({
          url: draft.url,
          name: draft.name,
          type: 'draft'
        })
      }
    })
  }
  
  // 添加商品图片
  if (product.value?.images) {
    product.value.images.forEach((imageUrl, index) => {
      if (imageUrl) {
        images.push({
          url: imageUrl,
          name: `${product.value.name} - 图片${index + 1}`,
          type: 'product'
        })
      }
    })
  }
  
  return images
}

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 监听路由参数变化
watch(() => route.params.id, () => {
  if (route.params.id) {
    fetchProductDetail()
  }
}, { immediate: true })
</script> 