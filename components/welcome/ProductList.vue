<template>
  <!-- 商品展示区 -->
  <div class="w-full px-2 sm:px-4 lg:px-6 xl:px-8 py-8">
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <!-- 商品卡片 -->
      <div v-for="product in products" :key="product.id" 
        class="rounded-lg overflow-hidden shadow-sm border">
        <!-- 商品图片 -->
        <div class="relative aspect-[3/4]">
          <img :src="product.image" :alt="product.name" class="w-full h-full object-cover" />
          <!-- 商品标签 -->
          <div v-if="product.tag" class="absolute top-2 left-2 px-2 py-1 text-xs rounded border">
            {{ product.tag }}
          </div>
        </div>
        
        <!-- 商品信息 -->
        <div class="p-4">
          <h3 class="font-medium mb-1 line-clamp-2">{{ product.name }}</h3>
          <p class="text-sm mb-2">{{ product.description }}</p>
          <div class="flex items-center justify-between">
            <div class="flex items-baseline gap-1">
              <span class="text-lg font-bold">¥{{ product.price }}</span>
              <span v-if="product.originalPrice" class="text-sm line-through">¥{{ product.originalPrice }}</span>
            </div>
            <div class="flex items-center gap-1 text-sm">
              <Icon name="heroicons:heart" class="w-4 h-4" />
              <span>{{ product.likes }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <div class="flex justify-center mt-8">
      <nav class="flex items-center gap-2">
        <button 
          class="px-3 py-1 border rounded"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >上一页</button>
        <button 
          v-for="page in Math.ceil(total / pageSize)" 
          :key="page"
          class="px-3 py-1 border rounded"
          :class="{ 'bg-primary text-white': currentPage === page }"
          @click="currentPage = page"
        >{{ page }}</button>
        <button 
          class="px-3 py-1 border rounded"
          :disabled="currentPage >= Math.ceil(total / pageSize)"
          @click="currentPage++"
        >下一页</button>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
// 商品类型定义
interface Product {
  id: number
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  tag?: string
  likes: number
}

interface PageResponse {
  list: Product[]
  total: number
  page: number
  pageSize: number
}

// 分页相关状态
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const loading = ref(false)

// 商品列表
const products = ref<Product[]>([])

// 获取商品列表
const fetchProducts = async () => {
  loading.value = true
  try {
    const { $customFetch } = useNuxtApp()
    const response = await $customFetch<PageResponse>('/product/page', {
      method: 'POST',
      body: {
        currentPage: currentPage.value,
        pageSize: pageSize.value,
      }
    })
    products.value = response.list
    total.value = response.total
    
  } catch (error) {
    console.error('获取商品列表失败:', error)
  } finally {
    loading.value = false
  }
}

// 监听分页变化
watch([currentPage], () => {
  fetchProducts()
})

// 初始化加载
onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 