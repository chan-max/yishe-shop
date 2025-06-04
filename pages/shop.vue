<template>
  <div class="min-h-screen w-full">
    <!-- 顶部筛选栏 -->
    <div class="sticky top-16 z-40 shadow-sm">
      <div class="w-full px-4">
        <!-- 主要筛选条件 -->
        <div class="flex flex-wrap items-center justify-between py-4 gap-4">
          <!-- 左侧筛选组 -->
          <div class="flex flex-wrap items-center gap-4">
            <div class="relative">
              <button 
                @click="showCategoryDropdown = !showCategoryDropdown"
                class="flex items-center gap-2 px-4 py-2 border rounded-lg"
              >
                <span>分类</span>
                <Icon name="heroicons:chevron-down" class="w-4 h-4" />
              </button>
              <!-- 分类下拉菜单 -->
              <div v-if="showCategoryDropdown" class="absolute top-full left-0 mt-1 w-48 rounded-lg shadow-lg border">
                <div class="p-2">
                  <div v-for="category in categories" :key="category.id" 
                    class="px-3 py-2 rounded cursor-pointer">
                    {{ category.name }}
                  </div>

                </div>
              </div>
            </div>

            <div class="relative">
              <button 
                @click="showPriceDropdown = !showPriceDropdown"
                class="flex items-center gap-2 px-4 py-2 border rounded-lg"
              >
                <span>价格</span>
                <Icon name="heroicons:chevron-down" class="w-4 h-4" />
              </button>
              <!-- 价格下拉菜单 -->
              <div v-if="showPriceDropdown" class="absolute top-full left-0 mt-1 w-48 rounded-lg shadow-lg border">
                <div class="p-4">
                  <div class="flex items-center gap-2">
                    <input type="number" placeholder="最低价" class="w-20 px-2 py-1 border rounded" />
                    <span>-</span>
                    <input type="number" placeholder="最高价" class="w-20 px-2 py-1 border rounded" />
                  </div>
                  <button class="mt-2 w-full py-1 rounded border">确定</button>
                </div>
              </div>
            </div>

            <div class="relative">
              <button 
                @click="showSizeDropdown = !showSizeDropdown"
                class="flex items-center gap-2 px-4 py-2 border rounded-lg"
              >
                <span>尺码</span>
                <Icon name="heroicons:chevron-down" class="w-4 h-4" />
              </button>
              <!-- 尺码下拉菜单 -->
              <div v-if="showSizeDropdown" class="absolute top-full left-0 mt-1 w-48 rounded-lg shadow-lg border">
                <div class="p-2 grid grid-cols-3 gap-2">
                  <div v-for="size in sizes" :key="size" 
                    class="px-3 py-2 text-center border rounded cursor-pointer">
                    {{ size }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 右侧排序 -->
          <div class="flex items-center gap-4">
            <select class="px-4 py-2 border rounded-lg">
              <option>综合排序</option>
              <option>销量优先</option>
              <option>价格从低到高</option>
              <option>价格从高到低</option>
              <option>最新上架</option>
            </select>
            
            <!-- 视图切换 -->
            <div class="flex items-center gap-2">
              <button class="p-2 rounded border">
                <Icon name="heroicons:squares-2x2" class="w-5 h-5" />
              </button>
              <button class="p-2 rounded border">
                <Icon name="heroicons:list-bullet" class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <!-- 标签筛选 -->
        <div class="flex flex-wrap gap-2 py-3 border-t">
          <div v-for="tag in tags" :key="tag" 
            class="px-3 py-1 rounded-full text-sm cursor-pointer border">
            {{ tag }}
          </div>
        </div>
      </div>
    </div>

    <!-- 商品展示区 -->
    <div class="w-full px-4 py-8">
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
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'page' })
useHead({ titleTemplate: '', title: '商店 - 衣设服装设计' })

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

// 状态管理
const showCategoryDropdown = ref(false)
const showPriceDropdown = ref(false)
const showSizeDropdown = ref(false)

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
        // 这里可以添加其他筛选条件
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

// 模拟数据
const categories = [
  { id: 1, name: '连衣裙' },
  { id: 2, name: '上衣' },
  { id: 3, name: '裤装' },
  { id: 4, name: '外套' },
  { id: 5, name: '配饰' },
]

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

const tags = ['新品', '热销', '折扣', '设计师款', '限量款', '联名款']
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 