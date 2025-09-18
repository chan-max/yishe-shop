<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-01-27 11:00:00
 * @FilePath: /yishe-nuxt/pages/search.vue
 * @Description: 搜索页面 - 智能搜索和筛选
-->
<script lang="ts" setup>
import { useSearchStore } from '~/stores/use-search'

const { awesome } = useAppConfig()
definePageMeta({ layout: false })

// 获取路由和搜索store
const route = useRoute()
const router = useRouter()
const searchStore = useSearchStore()

// 设置页面标题
useHead({
  titleTemplate: '',
  title: computed(() => {
    const keyword = searchQuery.value
    return keyword ? `搜索"${keyword}" - 衣设服装设计` : '搜索 - 衣设服装设计'
  }),
  meta: [
    {
      name: 'description',
      content: '在衣设服装设计平台搜索您想要的服装设计，支持智能筛选和个性化推荐。'
    }
  ]
})

// 搜索相关状态
const searchQuery = ref('')
const searchResults = ref([])
const loading = ref(false)
const hasSearched = ref(false)
const totalResults = ref(0)
const currentPage = ref(1)
const pageSize = ref(20)

// 搜索建议和历史
const searchSuggestions = ref([
  '连衣裙', '牛仔裤', 'T恤', '运动鞋', '休闲裤', '衬衫', '外套', '裙子', '短裤', '长裤',
  '春季新品', '设计师联名', '限时折扣', '时尚配饰', '运动系列', '正装', '休闲装', '运动装'
])

const searchHistory = ref([])
const showSuggestions = ref(false)

// 筛选条件
const filters = ref({
  sort: 'latest',
  price: '',
  gender: '',
  ageGroup: '',
  style: '',
  season: '',
  material: '',
  color: '',
  size: '',
  occasion: '',
  brand: '',
  discount: ''
})

const showFilters = ref(false)

// 筛选选项
const filterOptions = {
  sort: [
    { value: 'latest', label: '最新上架' },
    { value: 'popular', label: '最受欢迎' },
    { value: 'rating', label: '好评如潮' },
    { value: 'price_asc', label: '价格从低到高' },
    { value: 'price_desc', label: '价格从高到低' }
  ],
  price: [
    { value: '0-100', label: '0-100元' },
    { value: '100-300', label: '100-300元' },
    { value: '300-500', label: '300-500元' },
    { value: '500-1000', label: '500-1000元' },
    { value: '1000+', label: '1000元以上' }
  ],
  gender: [
    { value: 'male', label: '男装' },
    { value: 'female', label: '女装' },
    { value: 'unisex', label: '中性' }
  ],
  ageGroup: [
    { value: 'youth', label: '青年(18-25)' },
    { value: 'adult', label: '成人(25-40)' },
    { value: 'senior', label: '老年(40+)' }
  ],
  style: [
    { value: 'casual', label: '休闲' },
    { value: 'formal', label: '正装' },
    { value: 'sports', label: '运动' },
    { value: 'vintage', label: '复古' },
    { value: 'street', label: '街头' },
    { value: 'business', label: '商务' },
    { value: 'sweet', label: '甜美' },
    { value: 'cool', label: '酷炫' }
  ],
  season: [
    { value: 'spring', label: '春季' },
    { value: 'summer', label: '夏季' },
    { value: 'autumn', label: '秋季' },
    { value: 'winter', label: '冬季' },
    { value: 'all_season', label: '四季' }
  ],
  material: [
    { value: 'cotton', label: '棉质' },
    { value: 'wool', label: '羊毛' },
    { value: 'silk', label: '丝绸' },
    { value: 'linen', label: '亚麻' },
    { value: 'denim', label: '牛仔' },
    { value: 'knit', label: '针织' },
    { value: 'leather', label: '皮革' }
  ],
  color: [
    { value: 'black', label: '黑色' },
    { value: 'white', label: '白色' },
    { value: 'red', label: '红色' },
    { value: 'blue', label: '蓝色' },
    { value: 'green', label: '绿色' },
    { value: 'yellow', label: '黄色' },
    { value: 'pink', label: '粉色' },
    { value: 'purple', label: '紫色' },
    { value: 'gray', label: '灰色' },
    { value: 'brown', label: '棕色' }
  ],
  size: [
    { value: 'xs', label: 'XS' },
    { value: 's', label: 'S' },
    { value: 'm', label: 'M' },
    { value: 'l', label: 'L' },
    { value: 'xl', label: 'XL' },
    { value: 'xxl', label: 'XXL' }
  ],
  occasion: [
    { value: 'daily', label: '日常' },
    { value: 'work', label: '工作' },
    { value: 'party', label: '聚会' },
    { value: 'sport', label: '运动' },
    { value: 'formal', label: '正式场合' },
    { value: 'date', label: '约会' }
  ],
  discount: [
    { value: 'no_discount', label: '无折扣' },
    { value: 'discount_90', label: '9折以上' },
    { value: 'discount_70_90', label: '7-9折' },
    { value: 'discount_50_70', label: '5-7折' },
    { value: 'discount_50', label: '5折以下' }
  ]
}

// 热门搜索
const hotSearches = ref([
  { text: '春季新品', count: 1234, tag: 'hot' },
  { text: '设计师联名', count: 986, tag: 'trending' },
  { text: '限时折扣', count: 876, tag: 'sale' },
  { text: '时尚配饰', count: 765, tag: 'accessories' },
  { text: '运动系列', count: 654, tag: 'sports' },
  { text: '正装', count: 543, tag: 'formal' },
  { text: '休闲装', count: 432, tag: 'casual' },
  { text: '运动装', count: 321, tag: 'active' }
])

// 初始化搜索查询
onMounted(() => {
  // 从URL参数获取搜索关键词
  if (route.query.q) {
    searchQuery.value = route.query.q as string
    searchStore.setSearchKeyword(searchQuery.value)
    performSearch()
  } else if (searchStore.searchKeyword) {
    searchQuery.value = searchStore.searchKeyword
    performSearch()
  }
  
  // 加载搜索历史
  loadSearchHistory()
})

// 加载搜索历史
const loadSearchHistory = () => {
  const history = localStorage.getItem('searchHistory')
  if (history) {
    searchHistory.value = JSON.parse(history)
  }
}

// 保存搜索历史
const saveSearchHistory = (keyword: string) => {
  if (!keyword.trim()) return
  
  // 移除重复项
  searchHistory.value = searchHistory.value.filter(item => item !== keyword)
  // 添加到开头
  searchHistory.value.unshift(keyword)
  // 限制历史记录数量
  searchHistory.value = searchHistory.value.slice(0, 10)
  
  // 保存到本地存储
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value))
}

// 执行搜索
const performSearch = async () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = []
    hasSearched.value = false
    return
  }
  
  loading.value = true
  hasSearched.value = true
  
  try {
    const { $customFetch } = useNuxtApp()
    
    // 构建请求参数
    const requestBody = {
      currentPage: currentPage.value,
      pageSize: pageSize.value,
      isPublish: true,
      keyword: searchQuery.value.trim()
    }
    
    // 添加排序
    if (filters.value.sort) {
      requestBody.sort = filters.value.sort
    }
    
    // 添加筛选条件
    const activeFilters = Object.entries(filters.value)
      .filter(([key, value]) => value && key !== 'sort')
      .reduce((acc, [key, value]) => {
        acc[key] = value
        return acc
      }, {})
    
    if (Object.keys(activeFilters).length > 0) {
      requestBody.filters = activeFilters
    }
    
    const response = await $customFetch('/product/page', {
      method: 'POST',
      body: requestBody
    }) as any
    
    searchResults.value = response.list || []
    totalResults.value = response.total || 0
    
    // 保存搜索历史
    saveSearchHistory(searchQuery.value.trim())
    
    // 更新URL
    updateURL()
    
  } catch (error) {
    console.error('搜索失败:', error)
    searchResults.value = []
    totalResults.value = 0
  } finally {
    loading.value = false
  }
}

// 更新URL
const updateURL = () => {
  const query: any = {}
  if (searchQuery.value.trim()) {
    query.q = searchQuery.value.trim()
  }
  
  // 添加筛选参数
  Object.entries(filters.value).forEach(([key, value]) => {
    if (value) {
      query[key] = value
    }
  })
  
  router.replace({ path: '/search', query })
}

// 搜索建议过滤
const filteredSuggestions = computed(() => {
  if (!searchQuery.value.trim()) {
    return searchSuggestions.value.slice(0, 8)
  }
  
  return searchSuggestions.value
    .filter(suggestion => 
      suggestion.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    .slice(0, 8)
})

// 选择搜索建议
const selectSuggestion = (suggestion: string) => {
  searchQuery.value = suggestion
  showSuggestions.value = false
  performSearch()
}

// 选择热门搜索
const selectHotSearch = (hotSearch: { text: string; count: number }) => {
  searchQuery.value = hotSearch.text
  showSuggestions.value = false
  performSearch()
}

// 清空搜索
const clearSearch = () => {
  searchQuery.value = ''
  searchResults.value = []
  hasSearched.value = false
  totalResults.value = 0
  showSuggestions.value = false
  searchStore.clearSearchKeyword()
  router.replace({ path: '/search' })
}

// 清空筛选条件
const clearFilters = () => {
  filters.value = {
    sort: 'latest',
    price: '',
    gender: '',
    ageGroup: '',
    style: '',
    season: '',
    material: '',
    color: '',
    size: '',
    occasion: '',
    brand: '',
    discount: ''
  }
  currentPage.value = 1
  performSearch()
}

// 应用筛选条件
const applyFilters = () => {
  currentPage.value = 1
  performSearch()
}

// 获取活跃筛选条件数量
const activeFiltersCount = computed(() => {
  return Object.values(filters.value).filter(value => value && value !== 'latest').length
})

// 监听筛选条件变化
watch(filters, () => {
  if (hasSearched.value) {
    applyFilters()
  }
}, { deep: true })

// 监听分页变化
watch(currentPage, () => {
  if (hasSearched.value) {
    performSearch()
  }
})

// 图片加载状态
const imageLoaded = ref({})

const onImageLoad = (productId: string) => {
  imageLoaded.value[productId] = true
}

const onImageError = (productId: string) => {
  imageLoaded.value[productId] = false
}

// 跳转到商品详情
const goToProduct = (productId: string) => {
  navigateTo(`/product/${productId}`)
}
</script>

<template>
  <div class="search-page">
    <!-- 独立页面头部 -->
    <header class="page-header">
      <div class="header-container">
        <!-- Logo和标题 -->
        <div class="header-brand">
          <NuxtLink to="/" class="brand-link">
            <img src="/logo.svg" alt="衣设服装设计" class="brand-logo" />
            <span class="brand-text">衣设服装设计</span>
          </NuxtLink>
        </div>
        
        <!-- 导航菜单 -->
        <nav class="header-nav">
          <NuxtLink to="/" class="nav-link">首页</NuxtLink>
          <NuxtLink to="/products" class="nav-link">商品</NuxtLink>
          <NuxtLink to="/custom-design" class="nav-link">定制设计</NuxtLink>
          <NuxtLink to="/designers" class="nav-link">设计师</NuxtLink>
          <NuxtLink to="/contact" class="nav-link">联系我们</NuxtLink>
        </nav>
        
        <!-- 用户操作 -->
        <div class="header-actions">
          <NuxtLink to="/member" class="action-link">
            <v-icon>mdi-account</v-icon>
            <span>会员中心</span>
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- 搜索头部 -->
    <div class="search-header">
      <div class="search-container">
        <!-- 搜索框 -->
        <div class="search-input-wrapper">
          <v-text-field
            v-model="searchQuery"
            placeholder="搜索您想要的服装设计..."
            variant="outlined"
            density="comfortable"
            class="search-input"
            prepend-inner-icon="mdi-magnify"
            append-inner-icon="mdi-close"
            hide-details
            @keyup.enter="performSearch"
            @click:append-inner="clearSearch"
            @focus="showSuggestions = true"
            @blur="setTimeout(() => showSuggestions = false, 200)"
          >
            <template #append>
              <v-btn
                color="primary"
                variant="elevated"
                @click="performSearch"
                :loading="loading"
                :disabled="!searchQuery.trim()"
                class="search-btn"
              >
                搜索
              </v-btn>
            </template>
          </v-text-field>
          
          <!-- 搜索建议下拉框 -->
          <v-card
            v-if="showSuggestions && (filteredSuggestions.length > 0 || searchHistory.length > 0)"
            class="suggestions-dropdown"
            elevation="4"
          >
            <!-- 搜索历史 -->
            <div v-if="searchHistory.length > 0 && !searchQuery.trim()" class="suggestions-section">
              <div class="suggestions-title">
                <v-icon>mdi-history</v-icon>
                <span>搜索历史</span>
              </div>
              <div class="suggestions-list">
                <div
                  v-for="(history, index) in searchHistory.slice(0, 5)"
                  :key="index"
                  class="suggestion-item"
                  @click="selectSuggestion(history)"
                >
                  <v-icon>mdi-clock-outline</v-icon>
                  <span>{{ history }}</span>
                </div>
              </div>
            </div>
            
            <!-- 搜索建议 -->
            <div v-if="filteredSuggestions.length > 0" class="suggestions-section">
              <div class="suggestions-title">
                <v-icon>mdi-lightbulb-outline</v-icon>
                <span>搜索建议</span>
              </div>
              <div class="suggestions-list">
                <div
                  v-for="(suggestion, index) in filteredSuggestions"
                  :key="index"
                  class="suggestion-item"
                  @click="selectSuggestion(suggestion)"
                >
                  <v-icon>mdi-magnify</v-icon>
                  <span>{{ suggestion }}</span>
                </div>
              </div>
            </div>
          </v-card>
        </div>
        
        <!-- 筛选按钮 -->
        <div class="filter-controls">
          <v-btn
            variant="outlined"
            @click="showFilters = !showFilters"
            class="filter-toggle-btn"
          >
            <v-icon left>mdi-filter-variant</v-icon>
            筛选
            <v-chip
              v-if="activeFiltersCount > 0"
              size="small"
              color="primary"
              class="filter-count-chip"
            >
              {{ activeFiltersCount }}
            </v-chip>
          </v-btn>
          
          <v-btn
            v-if="activeFiltersCount > 0"
            variant="text"
            @click="clearFilters"
            class="clear-filters-btn"
          >
            <v-icon left>mdi-close</v-icon>
            清空筛选
          </v-btn>
        </div>
      </div>
    </div>

    <!-- 筛选面板 -->
    <v-expand-transition>
      <div v-if="showFilters" class="filters-panel">
        <v-card class="filters-card">
          <v-card-text>
            <div class="filters-grid">
              <!-- 排序 -->
              <div class="filter-group">
                <label class="filter-label">排序方式</label>
                <v-select
                  v-model="filters.sort"
                  :items="filterOptions.sort"
                  variant="outlined"
                  density="compact"
                  hide-details
                />
              </div>
              
              <!-- 价格 -->
              <div class="filter-group">
                <label class="filter-label">价格区间</label>
                <v-select
                  v-model="filters.price"
                  :items="filterOptions.price"
                  variant="outlined"
                  density="compact"
                  hide-details
                  clearable
                />
              </div>
              
              <!-- 性别 -->
              <div class="filter-group">
                <label class="filter-label">性别</label>
                <v-select
                  v-model="filters.gender"
                  :items="filterOptions.gender"
                  variant="outlined"
                  density="compact"
                  hide-details
                  clearable
                />
              </div>
              
              <!-- 年龄段 -->
              <div class="filter-group">
                <label class="filter-label">年龄段</label>
                <v-select
                  v-model="filters.ageGroup"
                  :items="filterOptions.ageGroup"
                  variant="outlined"
                  density="compact"
                  hide-details
                  clearable
                />
              </div>
              
              <!-- 风格 -->
              <div class="filter-group">
                <label class="filter-label">风格</label>
                <v-select
                  v-model="filters.style"
                  :items="filterOptions.style"
                  variant="outlined"
                  density="compact"
                  hide-details
                  clearable
                />
              </div>
              
              <!-- 季节 -->
              <div class="filter-group">
                <label class="filter-label">季节</label>
                <v-select
                  v-model="filters.season"
                  :items="filterOptions.season"
                  variant="outlined"
                  density="compact"
                  hide-details
                  clearable
                />
              </div>
              
              <!-- 材质 -->
              <div class="filter-group">
                <label class="filter-label">材质</label>
                <v-select
                  v-model="filters.material"
                  :items="filterOptions.material"
                  variant="outlined"
                  density="compact"
                  hide-details
                  clearable
                />
              </div>
              
              <!-- 颜色 -->
              <div class="filter-group">
                <label class="filter-label">颜色</label>
                <v-select
                  v-model="filters.color"
                  :items="filterOptions.color"
                  variant="outlined"
                  density="compact"
                  hide-details
                  clearable
                />
              </div>
              
              <!-- 尺码 -->
              <div class="filter-group">
                <label class="filter-label">尺码</label>
                <v-select
                  v-model="filters.size"
                  :items="filterOptions.size"
                  variant="outlined"
                  density="compact"
                  hide-details
                  clearable
                />
              </div>
              
              <!-- 场合 -->
              <div class="filter-group">
                <label class="filter-label">场合</label>
                <v-select
                  v-model="filters.occasion"
                  :items="filterOptions.occasion"
                  variant="outlined"
                  density="compact"
                  hide-details
                  clearable
                />
              </div>
              
              <!-- 折扣 -->
              <div class="filter-group">
                <label class="filter-label">折扣</label>
                <v-select
                  v-model="filters.discount"
                  :items="filterOptions.discount"
                  variant="outlined"
                  density="compact"
                  hide-details
                  clearable
                />
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </v-expand-transition>

    <!-- 主要内容区域 -->
    <div class="search-content">
      <!-- 未搜索状态 -->
      <div v-if="!hasSearched" class="search-placeholder">
        <div class="placeholder-content">
          <v-icon size="64" color="primary" class="placeholder-icon">mdi-magnify</v-icon>
          <h2 class="placeholder-title">开始您的搜索之旅</h2>
          <p class="placeholder-description">
            在衣设服装设计平台搜索您想要的服装设计，支持智能筛选和个性化推荐
          </p>
          
          <!-- 热门搜索 -->
          <div class="hot-searches">
            <h3 class="hot-searches-title">热门搜索</h3>
            <div class="hot-searches-list">
              <v-chip
                v-for="(hotSearch, index) in hotSearches"
                :key="index"
                :color="hotSearch.tag === 'hot' ? 'red' : hotSearch.tag === 'trending' ? 'orange' : 'primary'"
                variant="outlined"
                class="hot-search-chip"
                @click="selectHotSearch(hotSearch)"
              >
                <v-icon left size="small">
                  {{ hotSearch.tag === 'hot' ? 'mdi-fire' : hotSearch.tag === 'trending' ? 'mdi-trending-up' : 'mdi-tag' }}
                </v-icon>
                {{ hotSearch.text }}
                <span class="search-count">({{ hotSearch.count }})</span>
              </v-chip>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 搜索结果 -->
      <div v-else class="search-results">
        <!-- 搜索结果头部 -->
        <div class="results-header">
          <div class="results-info">
            <h2 class="results-title">
              搜索结果
              <span class="results-count">({{ totalResults }} 件商品)</span>
            </h2>
            <p class="results-query">
              关键词: <strong>"{{ searchQuery }}"</strong>
            </p>
          </div>
          
          <!-- 排序选择 -->
          <div class="results-sort">
            <v-select
              v-model="filters.sort"
              :items="filterOptions.sort"
              variant="outlined"
              density="compact"
              hide-details
              label="排序方式"
              class="sort-select"
            />
          </div>
        </div>
        
        <!-- 加载状态 -->
        <div v-if="loading" class="loading-container">
          <v-progress-circular indeterminate color="primary" size="48"></v-progress-circular>
          <p class="loading-text">正在搜索中...</p>
        </div>
        
        <!-- 无结果 -->
        <div v-else-if="searchResults.length === 0" class="no-results">
          <v-icon size="64" color="grey">mdi-magnify-remove</v-icon>
          <h3 class="no-results-title">未找到相关商品</h3>
          <p class="no-results-description">
            尝试使用不同的关键词或调整筛选条件
          </p>
          <v-btn
            color="primary"
            variant="outlined"
            @click="clearFilters"
            class="no-results-btn"
          >
            清空筛选条件
          </v-btn>
        </div>
        
        <!-- 搜索结果列表 -->
        <div v-else class="results-grid">
          <div
            v-for="product in searchResults"
            :key="product.id"
            class="product-card"
            @click="goToProduct(product.id)"
          >
            <div class="product-image">
              <img
                v-if="product?.customModel?.thumbnail"
                :src="product.customModel.thumbnail"
                :alt="product.name"
                class="product-img"
                @load="onImageLoad(product.id)"
                @error="onImageError(product.id)"
              />
              <div v-else class="product-placeholder">
                <v-icon>mdi-image</v-icon>
              </div>
              
              <!-- 商品标签 -->
              <div v-if="product.tag" class="product-tag">
                {{ product.tag }}
              </div>
            </div>
            
            <div class="product-info">
              <h3 class="product-title">{{ product.name }}</h3>
              <p class="product-description">{{ product.description }}</p>
              
              <div class="product-meta">
                <div class="product-price">
                  <span class="current-price">¥{{ product.price || '待定' }}</span>
                  <span v-if="product.originalPrice && product.originalPrice > product.price" class="original-price">
                    ¥{{ product.originalPrice }}
                  </span>
                </div>
                
                <div class="product-stats">
                  <div class="stat-item">
                    <v-icon size="small">mdi-heart</v-icon>
                    <span>{{ product.likes || 0 }}</span>
                  </div>
                  <div class="stat-item">
                    <v-icon size="small">mdi-star</v-icon>
                    <span>{{ product.rating || 0 }}</span>
                  </div>
                  <div class="stat-item">
                    <v-icon size="small">mdi-shopping</v-icon>
                    <span>{{ product.sales || 0 }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 分页 -->
        <div v-if="totalResults > pageSize" class="pagination-container">
          <v-pagination
            v-model="currentPage"
            :length="Math.ceil(totalResults / pageSize)"
            :total-visible="7"
            color="primary"
            class="pagination"
          />
        </div>
      </div>
    </div>

    <!-- 页面底部 -->
    <footer class="page-footer">
      <div class="footer-container">
        <div class="footer-content">
          <div class="footer-section">
            <h3 class="footer-title">关于衣设</h3>
            <p class="footer-description">
              衣设是一个开放式的创意服装设计平台，汇聚全球设计师的创意灵感，连接设计师与品牌，打造最具创意的服装设计社区。
            </p>
          </div>
          
          <div class="footer-section">
            <h3 class="footer-title">快速链接</h3>
            <ul class="footer-links">
              <li><NuxtLink to="/products">商品中心</NuxtLink></li>
              <li><NuxtLink to="/custom-design">定制设计</NuxtLink></li>
              <li><NuxtLink to="/designers">设计师</NuxtLink></li>
              <li><NuxtLink to="/fashion-news">时尚资讯</NuxtLink></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h3 class="footer-title">帮助支持</h3>
            <ul class="footer-links">
              <li><NuxtLink to="/contact">联系我们</NuxtLink></li>
              <li><NuxtLink to="/shopping-guide">购物指南</NuxtLink></li>
              <li><NuxtLink to="/member">会员中心</NuxtLink></li>
              <li><NuxtLink to="/about">关于我们</NuxtLink></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h3 class="footer-title">关注我们</h3>
            <div class="social-links">
              <a href="#" class="social-link">
                <v-icon>mdi-wechat</v-icon>
                <span>微信</span>
              </a>
              <a href="#" class="social-link">
                <v-icon>mdi-weibo</v-icon>
                <span>微博</span>
              </a>
              <a href="#" class="social-link">
                <v-icon>mdi-instagram</v-icon>
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p class="copyright">
            © 2024 衣设服装设计平台. 保留所有权利.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.search-page {
  min-height: 100vh;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
}

// 页面头部样式
.page-header {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.header-brand {
  .brand-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    color: #1f2937;
    font-weight: 700;
    font-size: 1.25rem;
    transition: color 0.3s ease;
    
    &:hover {
      color: var(--v-theme-primary);
    }
  }
  
  .brand-logo {
    width: 32px;
    height: 32px;
    object-fit: contain;
  }
  
  .brand-text {
    font-family: 'Helvetica Neue LT Std 53 Extended', 'Helvetica Neue', sans-serif;
  }
}

.header-nav {
  display: flex;
  gap: 2rem;
  
  .nav-link {
    color: #6b7280;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.95rem;
    padding: 0.5rem 0;
    position: relative;
    transition: color 0.3s ease;
    
    &:hover {
      color: var(--v-theme-primary);
    }
    
    &.router-link-active {
      color: var(--v-theme-primary);
      
      &::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 2px;
        background: var(--v-theme-primary);
        border-radius: 1px;
      }
    }
  }
}

.header-actions {
  .action-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #6b7280;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.95rem;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    
    &:hover {
      color: var(--v-theme-primary);
      background: rgba(var(--v-theme-primary), 0.05);
    }
    
    .v-icon {
      font-size: 1.25rem;
    }
  }
}

.search-header {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 1.5rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.search-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
}

.search-input-wrapper {
  flex: 1;
  position: relative;
}

.search-input {
  .v-field {
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    
    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    &.v-field--focused {
      box-shadow: 0 0 0 3px rgba(var(--v-theme-primary), 0.2);
    }
  }
}

.search-btn {
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(var(--v-theme-primary), 0.3);
  }
}

.suggestions-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  margin-top: 4px;
  border-radius: 12px;
  overflow: hidden;
}

.suggestions-section {
  padding: 1rem;
  
  &:not(:last-child) {
    border-bottom: 1px solid #e2e8f0;
  }
}

.suggestions-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 0.75rem;
}

.suggestions-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.suggestion-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(var(--v-theme-primary), 0.05);
    color: var(--v-theme-primary);
  }
  
  .v-icon {
    font-size: 1.25rem;
    color: #9ca3af;
  }
  
  span {
    font-size: 0.875rem;
  }
}

.filter-controls {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.filter-toggle-btn {
  border-radius: 8px;
  font-weight: 500;
  position: relative;
}

.filter-count-chip {
  position: absolute;
  top: -8px;
  right: -8px;
  min-width: 20px;
  height: 20px;
  font-size: 0.75rem;
}

.clear-filters-btn {
  color: #6b7280;
  font-size: 0.875rem;
}

.filters-panel {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 1.5rem 0;
}

.filters-card {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.filter-group {
  .filter-label {
    display: block;
    font-size: 0.875rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
  }
}

.search-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  flex: 1;
}

// 页面底部样式
.page-footer {
  background: #1f2937;
  color: white;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1rem 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section {
  .footer-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: white;
    margin-bottom: 1rem;
  }
  
  .footer-description {
    color: #d1d5db;
    line-height: 1.6;
    font-size: 0.875rem;
  }
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    margin-bottom: 0.5rem;
    
    a {
      color: #d1d5db;
      text-decoration: none;
      font-size: 0.875rem;
      transition: color 0.3s ease;
      
      &:hover {
        color: var(--v-theme-primary);
      }
    }
  }
}

.social-links {
  display: flex;
  gap: 1rem;
  
  .social-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #d1d5db;
    text-decoration: none;
    font-size: 0.875rem;
    padding: 0.5rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    
    &:hover {
      color: var(--v-theme-primary);
      background: rgba(255, 255, 255, 0.1);
    }
    
    .v-icon {
      font-size: 1.25rem;
    }
  }
}

.footer-bottom {
  border-top: 1px solid #374151;
  padding-top: 1.5rem;
  text-align: center;
  
  .copyright {
    color: #9ca3af;
    font-size: 0.875rem;
    margin: 0;
  }
}

.search-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.placeholder-content {
  text-align: center;
  max-width: 600px;
}

.placeholder-icon {
  margin-bottom: 1.5rem;
  opacity: 0.7;
}

.placeholder-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
}

.placeholder-description {
  font-size: 1.125rem;
  color: #6b7280;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.hot-searches {
  .hot-searches-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 1rem;
  }
}

.hot-searches-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

.hot-search-chip {
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
}

.search-count {
  font-size: 0.75rem;
  opacity: 0.8;
}

.search-results {
  .results-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;
    gap: 1rem;
  }
  
  .results-info {
    flex: 1;
  }
  
  .results-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }
  
  .results-count {
    font-size: 1rem;
    font-weight: 400;
    color: #6b7280;
  }
  
  .results-query {
    font-size: 1rem;
    color: #6b7280;
    margin: 0;
  }
  
  .results-sort {
    min-width: 200px;
  }
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  gap: 1rem;
}

.loading-text {
  color: #6b7280;
  font-size: 1rem;
}

.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  text-align: center;
  gap: 1rem;
}

.no-results-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
}

.no-results-description {
  color: #6b7280;
  font-size: 1rem;
}

.no-results-btn {
  margin-top: 1rem;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
}

.product-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  
  .product-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover .product-img {
    transform: scale(1.05);
  }
  
  .product-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f3f4f6;
    color: #9ca3af;
  }
  
  .product-tag {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    background: var(--v-theme-primary);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
  }
}

.product-info {
  padding: 1rem;
}

.product-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-description {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.75rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
}

.product-price {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  
  .current-price {
    font-size: 1.125rem;
    font-weight: 700;
    color: #059669;
  }
  
  .original-price {
    font-size: 0.875rem;
    color: #9ca3af;
    text-decoration: line-through;
  }
}

.product-stats {
  display: flex;
  gap: 0.75rem;
  
  .stat-item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.75rem;
    color: #6b7280;
    
    .v-icon {
      font-size: 0.875rem;
    }
  }
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
}

.pagination {
  .v-pagination__item {
    border-radius: 8px;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .header-container {
    padding: 0 1rem;
    height: 56px;
  }
  
  .header-nav {
    display: none; // 移动端隐藏导航菜单
  }
  
  .header-actions {
    .action-link {
      padding: 0.5rem;
      
      span {
        display: none; // 移动端只显示图标
      }
    }
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .social-links {
    justify-content: center;
  }
  
  .search-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .filter-controls {
    width: 100%;
    justify-content: space-between;
  }
  
  .filters-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .results-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .results-sort {
    min-width: auto;
  }
  
  .results-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
  
  .product-meta {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }
  
  .product-stats {
    justify-content: space-between;
  }
}

@media (max-width: 480px) {
  .search-content {
    padding: 1rem;
  }
  
  .results-grid {
    grid-template-columns: 1fr;
  }
  
  .hot-searches-list {
    gap: 0.5rem;
  }
  
  .hot-search-chip {
    font-size: 0.75rem;
  }
}
</style>
