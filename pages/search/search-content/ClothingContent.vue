<template>
  <div class="clothing-content">

    <!-- 服装设计内容主体 -->
    <div class="content-body">
      <!-- 加载状态 -->
      <LoadingSpinner 
        v-if="loading || !hasInitialized" 
        text="正在加载服装设计作品..."
      />
      
      <!-- 空状态 -->
      <EmptyState 
        v-else-if="designItems.length === 0"
        icon="mdi-tshirt-crew-outline"
        title="暂无服装设计作品"
        description="请尝试调整筛选条件或稍后再试"
      />
      
      <!-- 设计作品网格 -->
      <div v-else class="design-grid">
        <ImageCard
          v-for="item in designItems"
          :key="item.id"
          :item="item"
          :image="item.image"
          :title="item.title"
          :description="item.description"
          :tags="item.tags"
          :price="item.price"
          :likes="item.likes"
          aspect-ratio="4/5"
          @action="onCardAction"
          @image-load="(event) => onImageLoad(event, item.id)"
          @image-error="(event) => onImageError(event, item.id)"
        />
      </div>
      
      <!-- 分页 -->
      <ContentPagination
        v-model="currentPage"
        :total="total"
        :page-size="pageSize"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import EmptyState from '../components/EmptyState.vue'
import ImageCard from '../components/ImageCard.vue'
import FilterRow from '../components/FilterRow.vue'
import type { FilterItem } from '../components/FilterRow.vue'
import ContentPagination from '../components/ContentPagination.vue'

// 筛选配置
const clothingFilters: FilterItem[] = [
  {
    key: 'clothingType',
    label: '服装类型',
    type: 'select',
    placeholder: '选择类型',
    items: [
      { text: '连衣裙', value: 'dress' },
      { text: '上衣', value: 'top' },
      { text: '下装', value: 'bottom' },
      { text: '外套', value: 'outerwear' },
      { text: '配饰', value: 'accessories' }
    ]
  },
  {
    key: 'season',
    label: '季节',
    type: 'select',
    placeholder: '选择季节',
    items: [
      { text: '春季', value: 'spring' },
      { text: '夏季', value: 'summer' },
      { text: '秋季', value: 'autumn' },
      { text: '冬季', value: 'winter' }
    ]
  },
  {
    key: 'style',
    label: '风格',
    type: 'select',
    placeholder: '选择风格',
    items: [
      { text: '休闲', value: 'casual' },
      { text: '正式', value: 'formal' },
      { text: '运动', value: 'sport' },
      { text: '复古', value: 'vintage' },
      { text: '现代', value: 'modern' }
    ]
  },
  {
    key: 'price',
    label: '价格范围',
    type: 'price-range',
    minPlaceholder: '最低价',
    maxPlaceholder: '最高价'
  }
]

// 筛选状态
const filters = reactive({
  clothingType: '',
  season: '',
  style: '',
  price: '',
  priceMin: null,
  priceMax: null
})

// 分页相关状态
const currentPage = ref(1)
const pageSize = ref(12)
const total = ref(0)
const loading = ref(false)
const hasInitialized = ref(false)

// 设计项目数据
const designItems = ref([])

// 图片加载状态
const imageLoaded = ref({})

// 获取设计项目列表
const fetchDesignItems = async () => {
  loading.value = true
  try {
    const { $customFetch } = useNuxtApp()
    const requestBody = {
      currentPage: currentPage.value,
      pageSize: pageSize.value,
      isPublish: true, // 只查询已上架的商品
    }
    
    // 添加服装相关的过滤条件
    const requestFilters = requestBody.filters || {}
    
    // 服装类型映射
    if (filters.clothingType) {
      const typeMapping = {
        'dress': '连衣裙',
        'top': '上衣',
        'bottom': '下装',
        'outerwear': '外套',
        'accessories': '配饰'
      }
      requestFilters.keyword = typeMapping[filters.clothingType] || filters.clothingType
    }
    
    // 季节筛选
    if (filters.season) {
      const seasonMapping = {
        'spring': '春季',
        'summer': '夏季',
        'autumn': '秋季',
        'winter': '冬季'
      }
      if (!requestFilters.keyword) requestFilters.keyword = ''
      requestFilters.keyword += (requestFilters.keyword ? ' ' : '') + (seasonMapping[filters.season] || filters.season)
    }
    
    // 风格筛选
    if (filters.style) {
      const styleMapping = {
        'casual': '休闲',
        'formal': '正式',
        'sport': '运动',
        'vintage': '复古',
        'modern': '现代'
      }
      if (!requestFilters.keyword) requestFilters.keyword = ''
      requestFilters.keyword += (requestFilters.keyword ? ' ' : '') + (styleMapping[filters.style] || filters.style)
    }
    
    // 价格范围筛选
    if (filters.priceMin !== null || filters.priceMax !== null) {
      if (filters.priceMin !== null && filters.priceMax !== null) {
        requestFilters.price = `${filters.priceMin}-${filters.priceMax}`
      } else if (filters.priceMin !== null) {
        requestFilters.price = `${filters.priceMin}+`
      } else if (filters.priceMax !== null) {
        requestFilters.price = `0-${filters.priceMax}`
      }
    }
    
    // 如果有过滤条件，添加到请求体中
    if (Object.keys(requestFilters).length > 0) {
      requestBody.filters = requestFilters
    }
    
    const response = await $customFetch("/product/page", {
      method: "POST",
      body: requestBody,
    })
    
    // 转换数据格式以适配设计项目显示
    designItems.value = response.list.map(item => ({
      id: item.id,
      title: item.name,
      description: item.description || '精美的服装设计作品',
      image: item.customModel?.thumbnail || 'https://via.placeholder.com/300x400/ff6b6b/ffffff?text=Clothing',
      price: item.price || 0,
      likes: Math.floor(Math.random() * 200) + 50, // 模拟点赞数
      tags: item.keywords ? item.keywords.split(',').map(k => k.trim()) : ['服装设计']
    }))
    
    total.value = response.total
    hasInitialized.value = true
  } catch (error) {
    console.error("获取服装设计列表失败:", error)
    hasInitialized.value = true
  } finally {
    loading.value = false
  }
}

// 图片加载成功处理
const onImageLoad = (event, itemId) => {
  imageLoaded.value[itemId] = true
}

// 图片加载失败处理
const onImageError = (event, itemId) => {
  console.error("图片加载失败:", event)
  imageLoaded.value[itemId] = false
}

// 检查是否有有效图片
const hasValidImage = (item) => {
  return item.image && !item.image.includes('placeholder')
}

// 获取图片加载状态
const getImageLoadStatus = (itemId) => {
  return imageLoaded.value[itemId] || false
}

// 卡片操作处理
const onCardAction = (actionType, item) => {
  console.log('卡片操作:', actionType, item)
  // 这里可以添加具体的操作逻辑
}

// 监听筛选条件变化
watch(filters, () => {
  currentPage.value = 1 // 重置到第一页
  fetchDesignItems()
}, { deep: true })

// 监听分页变化
watch(currentPage, () => {
  fetchDesignItems()
})

// 初始化加载
onMounted(() => {
  fetchDesignItems()
})
</script>

<style lang="scss" scoped>
@use './content-areas.scss';

.clothing-content {
  .content-header {
    margin-bottom: 2rem;
    
    .content-title {
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      font-weight: 600;
      color: #ffffff;
      margin-bottom: 0.5rem;
    }
    
    .content-subtitle {
      color: #b0b0b0;
      font-size: 0.9rem;
    }
  }
  
  .content-filters {
    margin-bottom: 2rem;
  }
  
  .content-body {
    
    .design-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
      // 移除 max-width 限制，让网格自适应占满容器
    }
    
  }
}

</style>
