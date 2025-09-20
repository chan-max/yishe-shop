<template>
  <div class="clothing-page">
    <!-- 服装页面头部 -->
    <ClothingHeader 
      :search-query="searchQuery"
      :show-filter-menu="showFilterMenu"
      @update:search-query="searchQuery = $event"
      @toggle-filter="toggleFilterMenu"
      @search="performSearch"
    />
    
    <!-- 过滤菜单 -->
    <SearchFilter 
      :show="showFilterMenu"
      :filters="clothingFilters"
      @update:show="showFilterMenu = $event"
      @clear="clearFilters"
      @apply="applyFilters"
    />
    
    <!-- 服装内容区域 -->
    <ClothingContent 
      :design-items="designItems"
      :loading="loading"
      :has-searched="hasSearched"
      :total-results="totalResults"
      :current-page="currentPage"
      :page-size="pageSize"
      @load-more="loadMoreItems"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import ClothingHeader from '../components/headers/ClothingHeader.vue'
import SearchFilter from '../components/SearchFilter.vue'
import ClothingContent from '../search-content/ClothingContent.vue'
import type { FilterItem } from '../components/FilterRow.vue'

// 搜索相关状态
const searchQuery = ref('')
const showFilterMenu = ref(false)
const loading = ref(false)
const hasSearched = ref(false)

// 分页相关状态
const currentPage = ref(1)
const pageSize = ref(12)
const totalResults = ref(0)

// 数据状态
const designItems = ref([])

// 服装筛选配置
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

// 获取服装设计项目列表
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
    
    totalResults.value = response.total
    hasSearched.value = true
  } catch (error) {
    console.error("获取服装设计列表失败:", error)
  } finally {
    loading.value = false
  }
}

// 搜索处理
const performSearch = () => {
  currentPage.value = 1
  fetchDesignItems()
}

// 加载更多
const loadMoreItems = () => {
  currentPage.value++
  fetchDesignItems()
}

// 切换过滤菜单
const toggleFilterMenu = () => {
  showFilterMenu.value = !showFilterMenu.value
}

// 清除筛选
const clearFilters = () => {
  Object.keys(filters).forEach(key => {
    if (key === 'priceMin' || key === 'priceMax') {
      filters[key] = null
    } else {
      filters[key] = ''
    }
  })
  currentPage.value = 1
  fetchDesignItems()
}

// 应用筛选
const applyFilters = () => {
  currentPage.value = 1
  fetchDesignItems()
  showFilterMenu.value = false
}

// 监听筛选条件变化
watch(filters, () => {
  currentPage.value = 1
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
.clothing-page {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
