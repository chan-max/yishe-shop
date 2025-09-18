<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-01-27 11:00:00
 * @FilePath: /yishe-nuxt/pages/search.vue
 * @Description: 搜索页面 - 智能搜索和筛选
-->
<script lang="ts" setup>
// import { useSearchStore } from '~/stores/use-search'

const { awesome } = useAppConfig()
definePageMeta({ layout: false })

// 获取路由
const route = useRoute()
const router = useRouter()
// const searchStore = useSearchStore()

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
const searchResults = ref<any[]>([])
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

const searchHistory = ref<string[]>([])
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
const showMobileSidebar = ref(false)

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
    // searchStore.setSearchKeyword(searchQuery.value)
    performSearch()
  }
  // else if (searchStore.searchKeyword) {
  //   searchQuery.value = searchStore.searchKeyword
  //   performSearch()
  // }
  
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
    const requestBody: any = {
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
      .reduce((acc: any, [key, value]) => {
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
  // searchStore.clearSearchKeyword()
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
const imageLoaded = ref<Record<string, boolean>>({})

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

// 移动端侧边栏控制
const toggleMobileSidebar = () => {
  showMobileSidebar.value = !showMobileSidebar.value
}

// 点击遮罩层关闭侧边栏
const closeMobileSidebar = () => {
  showMobileSidebar.value = false
}

// 处理搜索框失焦
const handleBlur = () => {
  setTimeout(() => {
    showSuggestions.value = false
  }, 200)
}
</script>

<template>
  <div class="search-page">
    <!-- 移动端遮罩层 -->
    <div 
      v-if="showMobileSidebar" 
      class="mobile-overlay"
      @click="closeMobileSidebar"
    ></div>

    <!-- 左侧固定侧边栏 -->
    <aside class="sidebar" :class="{ 'mobile-open': showMobileSidebar }">
      <div class="sidebar-content">
        <!-- Logo -->
        <div class="sidebar-brand">
          <NuxtLink to="/" class="brand-link">
            <img src="/logo.svg" alt="衣设服装设计" class="brand-logo" />
            <span class="brand-text">衣设</span>
          </NuxtLink>
        </div>

        <!-- 搜索框 -->
        <div class="sidebar-search">
          <v-text-field
            v-model="searchQuery"
            placeholder="搜索服装设计..."
            variant="outlined"
            density="compact"
            class="search-input"
            prepend-inner-icon="mdi-magnify"
            append-inner-icon="mdi-close"
            hide-details
            @keyup.enter="performSearch"
            @click:append-inner="clearSearch"
            @focus="showSuggestions = true"
            @blur="handleBlur"
          >
            <template #append>
              <v-btn
                color="primary"
                variant="elevated"
                size="small"
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
                <v-icon size="small">mdi-history</v-icon>
                <span>搜索历史</span>
              </div>
              <div class="suggestions-list">
                <div
                  v-for="(history, index) in searchHistory.slice(0, 5)"
                  :key="index"
                  class="suggestion-item"
                  @click="selectSuggestion(history)"
                >
                  <v-icon size="small">mdi-clock-outline</v-icon>
                  <span>{{ history }}</span>
                </div>
              </div>
            </div>
            
            <!-- 搜索建议 -->
            <div v-if="filteredSuggestions.length > 0" class="suggestions-section">
              <div class="suggestions-title">
                <v-icon size="small">mdi-lightbulb-outline</v-icon>
                <span>搜索建议</span>
              </div>
              <div class="suggestions-list">
                <div
                  v-for="(suggestion, index) in filteredSuggestions"
                  :key="index"
                  class="suggestion-item"
                  @click="selectSuggestion(suggestion)"
                >
                  <v-icon size="small">mdi-magnify</v-icon>
                  <span>{{ suggestion }}</span>
                </div>
              </div>
            </div>
          </v-card>
        </div>

        <!-- 导航菜单 -->
        <div class="sidebar-nav">
          <nav class="nav-menu">
            <NuxtLink to="/" class="nav-item">
              <v-icon>mdi-home</v-icon>
              <span>首页</span>
            </NuxtLink>
            <NuxtLink to="/products" class="nav-item">
              <v-icon>mdi-package-variant</v-icon>
              <span>商品</span>
            </NuxtLink>
            <NuxtLink to="/custom-design" class="nav-item">
              <v-icon>mdi-palette</v-icon>
              <span>定制设计</span>
            </NuxtLink>
            <NuxtLink to="/designers" class="nav-item">
              <v-icon>mdi-account-group</v-icon>
              <span>设计师</span>
            </NuxtLink>
            <NuxtLink to="/contact" class="nav-item">
              <v-icon>mdi-email</v-icon>
              <span>联系我们</span>
            </NuxtLink>
          </nav>
        </div>
      </div>
    </aside>

    <!-- 主内容区域 -->
    <main class="main-content">
      <!-- 顶部固定导航栏 -->
      <header class="top-header">
        <div class="header-content">
          <!-- 移动端菜单按钮 -->
          <v-btn
            variant="text"
            @click="showMobileSidebar = !showMobileSidebar"
            class="mobile-menu-btn"
            icon
          >
            <v-icon>mdi-menu</v-icon>
          </v-btn>
          
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

      <!-- 主要内容区域 -->
      <div class="content-area">
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
    </main>
  </div>
</template>

<style lang="scss" scoped>
// Freepik 深色主题布局
.search-page {
  min-height: 100vh;
  background: #1a1a1a;
  color: #ffffff;
  display: flex;
}

// 左侧固定侧边栏 - Freepik 深色风格
.sidebar {
  width: 280px;
  background: #2a2a2a;
  border-right: 1px solid #404040;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  overflow: hidden;
  z-index: 1000;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
}

.sidebar-content {
  padding: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.sidebar-brand {
  padding: 1.5rem 1rem;
  border-bottom: 1px solid #404040;
  
  .brand-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    color: #ffffff;
    font-weight: 700;
    font-size: 1.5rem;
    transition: color 0.3s ease;
    
    &:hover {
      color: #ff6b35;
    }
  }
  
  .brand-logo {
    width: 36px;
    height: 36px;
    object-fit: contain;
    filter: brightness(0) invert(1);
  }
  
  .brand-text {
    font-family: 'Helvetica Neue LT Std 53 Extended', 'Helvetica Neue', sans-serif;
    letter-spacing: 0.5px;
  }
}

.sidebar-search {
  position: relative;
  padding: 1.5rem 1rem;
  border-bottom: 1px solid #404040;
  
  .search-input {
    .v-field {
      background: #1a1a1a;
      border: 1px solid #404040;
      border-radius: 8px;
      color: #ffffff;
      transition: all 0.3s ease;
      
      &:hover {
        border-color: #666666;
      }
      
      &.v-field--focused {
        border-color: #ff6b35;
        box-shadow: 0 0 0 2px rgba(255, 107, 53, 0.2);
      }
    }
    
    .v-field__input {
      color: #ffffff;
      
      &::placeholder {
        color: #999999;
      }
    }
  }
  
  .search-btn {
    background: #ff6b35;
    color: #ffffff;
    border-radius: 6px;
    font-weight: 600;
    transition: all 0.3s ease;
    
    &:hover:not(:disabled) {
      background: #e55a2b;
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(255, 107, 53, 0.3);
    }
  }
}

.suggestions-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  margin-top: 4px;
  border-radius: 8px;
  overflow: hidden;
}

.suggestions-section {
  padding: 0.75rem;
  
  &:not(:last-child) {
    border-bottom: 1px solid #e2e8f0;
  }
}

.suggestions-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.suggestions-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.suggestion-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(var(--v-theme-primary), 0.05);
    color: var(--v-theme-primary);
  }
  
  .v-icon {
    font-size: 1rem;
    color: #9ca3af;
  }
  
  span {
    font-size: 0.75rem;
  }
}

.sidebar-nav {
  flex: 1;
  padding: 1.5rem 1rem;
  overflow: hidden;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  color: #cccccc;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 0.95rem;
  
  &:hover {
    background: rgba(255, 107, 53, 0.1);
    color: #ff6b35;
  }
  
  &.router-link-active {
    background: rgba(255, 107, 53, 0.15);
    color: #ff6b35;
    border-left: 3px solid #ff6b35;
  }
  
  .v-icon {
    font-size: 1.25rem;
    min-width: 24px;
  }
  
  span {
    font-weight: 500;
  }
}

// 主内容区域
.main-content {
  flex: 1;
  margin-left: 280px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #1a1a1a;
}

// 顶部固定导航栏 - Freepik 风格
.top-header {
  background: #2a2a2a;
  border-bottom: 1px solid #404040;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.header-content {
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}

.header-nav {
  display: flex;
  gap: 2.5rem;
  
  .nav-link {
    color: #cccccc;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.95rem;
    padding: 0.75rem 0;
    position: relative;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    
    &:hover {
      color: #ff6b35;
    }
    
    &.router-link-active {
      color: #ff6b35;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 2px;
        background: #ff6b35;
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
    color: #cccccc;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.95rem;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    background: #1a1a1a;
    border: 1px solid #404040;
    
    &:hover {
      color: #ff6b35;
      background: #2a2a2a;
      border-color: #ff6b35;
    }
    
    .v-icon {
      font-size: 1.25rem;
    }
  }
}

// 内容区域
.content-area {
  flex: 1;
  padding: 2rem;
  background: #1a1a1a;
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
  color: #ffffff;
  margin-bottom: 1rem;
}

.placeholder-description {
  font-size: 1.125rem;
  color: #cccccc;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.hot-searches {
  .hot-searches-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #ffffff;
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
    margin-bottom: 2rem;
  }
  
  .results-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 0.5rem;
  }
  
  .results-count {
    font-size: 1rem;
    font-weight: 400;
    color: #cccccc;
  }
  
  .results-query {
    font-size: 1rem;
    color: #cccccc;
    margin: 0;
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
  color: #cccccc;
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
  color: #ffffff;
}

.no-results-description {
  color: #cccccc;
  font-size: 1rem;
}

.no-results-btn {
  margin-top: 1rem;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.product-card {
  background: #2a2a2a;
  border: 1px solid #404040;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
    border-color: #ff6b35;
  }
}

.product-image {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
  background: #1a1a1a;
  
  .product-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover .product-img {
    transform: scale(1.08);
  }
  
  .product-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #1a1a1a;
    color: #666666;
  }
  
  .product-tag {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    background: #ff6b35;
    color: white;
    padding: 0.375rem 0.75rem;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: 0 2px 8px rgba(255, 107, 53, 0.3);
  }
}

.product-info {
  padding: 1.25rem;
}

.product-title {
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.75rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-description {
  font-size: 0.875rem;
  color: #cccccc;
  margin-bottom: 1rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
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
    font-size: 1.25rem;
    font-weight: 700;
    color: #ff6b35;
  }
  
  .original-price {
    font-size: 0.875rem;
    color: #999999;
    text-decoration: line-through;
  }
}

.product-stats {
  display: flex;
  gap: 1rem;
  
  .stat-item {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.75rem;
    color: #cccccc;
    
    .v-icon {
      font-size: 0.875rem;
      color: #ff6b35;
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

// 移动端遮罩层
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: none;
}

// 移动端菜单按钮
.mobile-menu-btn {
  display: none;
}

// 响应式设计
@media (max-width: 1024px) {
  .sidebar {
    width: 260px;
  }
  
  .main-content {
    margin-left: 260px;
  }
  
  .content-area {
    padding: 1.5rem;
  }
  
  .sidebar-brand {
    padding: 1rem;
  }
  
  .sidebar-search {
    padding: 1rem;
  }
  
  .sidebar-nav {
    padding: 1rem;
  }
}

@media (max-width: 768px) {
  .mobile-overlay {
    display: block;
    background: rgba(0, 0, 0, 0.7);
  }
  
  .mobile-menu-btn {
    display: block;
    color: #ffffff;
    
    &:hover {
      background: rgba(255, 107, 53, 0.1);
    }
  }
  
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    width: 280px;
    
    &.mobile-open {
      transform: translateX(0);
    }
  }
  
  .sidebar-brand {
    padding: 1rem;
  }
  
  .sidebar-search {
    padding: 1rem;
  }
  
  .sidebar-nav {
    padding: 1rem;
  }
  
  .nav-item {
    padding: 0.875rem 1rem;
    font-size: 0.9rem;
    
    .v-icon {
      font-size: 1.125rem;
    }
  }
  
  .main-content {
    margin-left: 0;
  }
  
  .header-content {
    padding: 0 1rem;
    height: 64px;
  }
  
  .header-nav {
    display: none;
  }
  
  .header-actions {
    .action-link {
      padding: 0.5rem;
      background: #1a1a1a;
      border: 1px solid #404040;
      
      span {
        display: none;
      }
    }
  }
  
  .content-area {
    padding: 1rem;
  }
  
  .results-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
  
  .product-meta {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }
  
  .product-stats {
    justify-content: space-between;
  }
}

@media (max-width: 480px) {
  .results-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .hot-searches-list {
    gap: 0.5rem;
  }
  
  .hot-search-chip {
    font-size: 0.75rem;
  }
  
  .product-card {
    border-radius: 8px;
  }
  
  .product-image {
    height: 180px;
  }
  
  .product-info {
    padding: 1rem;
  }
}
</style>
