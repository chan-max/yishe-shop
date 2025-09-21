<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-09-21 22:31:35
 * @FilePath: /yishe-nuxt/pages/search.vue
 * @Description: Search Page - Design Material Search and Filtering
-->
<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// import { useSearchStore } from '~/stores/use-search'

// Import content area components
import ClothingContent from '~/pages/search/search-content/ClothingContent.vue'
import MaterialsContent from '~/pages/search/search-content/MaterialsContent.vue'
import TextCreationContent from '~/pages/search/search-content/TextCreationContent.vue'

// Import Header components
import ClothingHeader from './search/components/headers/ClothingHeader.vue'
import MaterialsHeader from './search/components/headers/MaterialsHeader.vue'
import TextCreationHeader from './search/components/headers/TextCreationHeader.vue'

// Import unified configuration
import { 
  colorOptions, 
  languageOptions, 
  clothingFilterOptions, 
  materialsFilterOptions, 
  textCreationFilterOptions, 
  getFilterOptions 
} from './search/config/filterOptions'

const { awesome } = useAppConfig()
// definePageMeta({ layout: false })

// Get route
const route = useRoute()
const router = useRouter()
// const searchStore = useSearchStore()

// Set page title
useHead({
  titleTemplate: '',
  title: computed(() => {
  
    return 'Search - Fashion Design Platform'
  }),
  meta: [
    {
      name: 'description',
      content: 'Search for fashion designs on our platform with intelligent filtering and personalized recommendations.'
    },
    {
      name: 'keywords',
      content: 'fashion design, clothing design, fashion search, design materials, fashion inspiration, clothing styles, fashion trends'
    }
  ]
})

// Search related state
const searchQuery = ref('')
const searchResults = ref<any[]>([])
const loading = ref(false)
const hasSearched = ref(false)
const totalResults = ref(0)
const currentPage = ref(1)
const pageSize = ref(20)

// Search suggestions
const searchSuggestions = ref([
  'dress', 'jeans', 't-shirt', 'sneakers', 'casual pants', 'shirt', 'jacket', 'skirt', 'shorts', 'trousers'
])

const showSuggestions = ref(false)

// Filter conditions
const filters = ref({
  sort: 'latest',
  priceMin: null,
  priceMax: null,
  styles: [] as string[],
  colors: [] as string[]
})

const showMobileSidebar = ref(false)
const sidebarCollapsed = ref(false)

// Filter menu state
const showFilterMenu = ref(false)

// Sidebar category selection state
const selectedCategory = ref('clothing') // Default to clothing design

// Theme mode state
const isDarkMode = ref(true) // Default to dark mode

// Photo wall data
const photoWallData = ref<any[]>([])
const loadingMore = ref(false)

// Filter options configuration moved to ./search/config/filterOptions.ts

// General filter options (backward compatibility)
const filterOptions = clothingFilterOptions


// Initialize photo wall data
const initPhotoWall = () => {
  const mockPhotos = [
    {
      id: 1,
      title: 'Fashion Dress Design',
      description: 'Elegant spring dress showcasing feminine charm',
      image: 'https://picsum.photos/400/600?random=1',
      likes: 1234,
      views: 5678
    },
    {
      id: 2,
      title: 'Casual T-Shirt Collection',
      description: 'Comfortable and versatile daily wear choice',
      image: 'https://picsum.photos/300/400?random=2',
      likes: 856,
      views: 2345
    },
    {
      id: 3,
      title: 'Business Formal Suit',
      description: 'Perfect choice for professional workplace image',
      image: 'https://picsum.photos/350/500?random=3',
      likes: 2341,
      views: 4567
    },
    {
      id: 4,
      title: 'Sporty Casual Wear',
      description: 'Energetic sporty style design',
      image: 'https://picsum.photos/400/500?random=4',
      likes: 1890,
      views: 3456
    },
    {
      id: 5,
      title: 'Vintage Denim Series',
      description: 'Classic timeless denim style',
      image: 'https://picsum.photos/300/450?random=5',
      likes: 1456,
      views: 2789
    },
    {
      id: 6,
      title: 'Elegant Evening Gown',
      description: 'Perfect choice for glamorous evening events',
      image: 'https://picsum.photos/350/600?random=6',
      likes: 2789,
      views: 4567
    },
    {
      id: 7,
      title: 'Street Fashion Style',
      description: 'Young and trendy street culture',
      image: 'https://picsum.photos/400/450?random=7',
      likes: 1678,
      views: 3123
    },
    {
      id: 8,
      title: 'Minimalist Basics',
      description: 'Versatile and practical basic pieces',
      image: 'https://picsum.photos/300/400?random=8',
      likes: 987,
      views: 1987
    },
    {
      id: 9,
      title: 'Ethnic Style Design',
      description: 'Unique fusion of ethnic elements',
      image: 'https://picsum.photos/350/500?random=9',
      likes: 1234,
      views: 2345
    },
    {
      id: 10,
      title: 'Futuristic Tech Style',
      description: 'Avant-garde tech fashion style',
      image: 'https://picsum.photos/400/500?random=10',
      likes: 2100,
      views: 3789
    },
    {
      id: 11,
      title: 'Natural Country Style',
      description: 'Fresh and natural countryside style',
      image: 'https://picsum.photos/300/450?random=11',
      likes: 1456,
      views: 2567
    },
    {
      id: 12,
      title: 'Luxury Fur Collection',
      description: 'High-end luxurious fur design',
      image: 'https://picsum.photos/350/600?random=12',
      likes: 3456,
      views: 5678
    }
  ]
  
  photoWallData.value = mockPhotos
}

// Load more photos
const loadMorePhotos = async () => {
  loadingMore.value = true
  
  // Simulate loading delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Generate more mock data
  const newPhotos = []
  for (let i = 0; i < 8; i++) {
    const id = photoWallData.value.length + i + 1
    newPhotos.push({
      id,
      title: `Design Work ${id}`,
      description: `Creative design work showcasing unique style`,
      image: `https://picsum.photos/${300 + Math.random() * 100}/${400 + Math.random() * 200}?random=${id}`,
      likes: Math.floor(Math.random() * 3000) + 500,
      views: Math.floor(Math.random() * 5000) + 1000
    })
  }
  
  photoWallData.value.push(...newPhotos)
  loadingMore.value = false
}

// Toggle sidebar collapse state
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

// Toggle theme mode
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  // Save theme preference to localStorage
  localStorage.setItem('search-page-theme', isDarkMode.value ? 'dark' : 'light')
  console.log('Theme switched:', isDarkMode.value ? 'Dark mode' : 'Light mode')
}

// Content component mapping
const contentComponents = {
  clothing: ClothingContent,
  materials: MaterialsContent,
  'text-creation': TextCreationContent
}

// Header component mapping
const headerComponents = {
  clothing: ClothingHeader,
  materials: MaterialsHeader,
  'text-creation': TextCreationHeader
}

// Header configuration mapping - header config for each navigation item
const headerConfigs = {
  clothing: {
    title: 'Fashion Design',
    subtitle: 'Explore fashion design inspiration',
    searchPlaceholder: 'Search fashion designs...',
    icon: 'mdi-tshirt-crew-outline',
    showFilter: true,
    filterOptions: ['Style', 'Color', 'Price', 'Gender', 'Season', 'Material', 'Size', 'Occasion']
  },
  materials: {
    title: 'Design Materials',
    subtitle: 'High-quality design material resources',
    searchPlaceholder: 'Search material images...',
    icon: 'mdi-image-multiple-outline',
    showFilter: true,
    filterOptions: ['Type', 'Resolution', 'Format', 'Color', 'License', 'Category']
  },
  'text-creation': {
    title: 'Text Creation',
    subtitle: 'Creative text content and copywriting',
    searchPlaceholder: 'Search text creation content...',
    icon: 'mdi-text-box-outline',
    showFilter: true,
    filterOptions: ['Category', 'Style', 'Length', 'Tone', 'Purpose', 'Language']
  }
}

// Select category
const selectCategory = (category: string) => {
  // Allow clothing, materials and text-creation categories
  if (category === 'clothing' || category === 'materials' || category === 'text-creation') {
    selectedCategory.value = category
    console.log('Selected category:', category)
  }
}

// Get current content component
const currentContentComponent = computed(() => {
  return contentComponents[selectedCategory.value as keyof typeof contentComponents] || ClothingContent
})

// Get current header component
const currentHeaderComponent = computed(() => {
  return headerComponents[selectedCategory.value as keyof typeof headerComponents] || ClothingHeader
})

// Get current header configuration
const currentHeaderConfig = computed(() => {
  return headerConfigs[selectedCategory.value as keyof typeof headerConfigs] || headerConfigs.clothing
})

// Get header component props
const getHeaderProps = () => {
  // Return simplified props for text creation page
  if (selectedCategory.value === 'text-creation') {
    return {
      showMobileSidebar: showMobileSidebar.value
    }
  }
  
  // Return complete props for other pages
  return {
    searchQuery: searchQuery.value,
    showFilterMenu: showFilterMenu.value,
    showSuggestions: showSuggestions.value,
    filteredSuggestions: filteredSuggestions.value,
    showMobileSidebar: showMobileSidebar.value,
    filters: filters.value,
    filterOptions: getFilterOptions(selectedCategory.value),
    activeFilters: activeFilters.value,
    activeFiltersCount: activeFiltersCount.value
  }
}

// Initialize search query
onMounted(() => {
  // Initialize photo wall
  initPhotoWall()
  
  // Initialize theme settings
  const savedTheme = localStorage.getItem('search-page-theme')
  if (savedTheme) {
    isDarkMode.value = savedTheme === 'dark'
  }
  
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
  
})


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
      isPublish: true, // 传入true，代表是公开的内容
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

// 清空搜索
const clearSearch = () => {
  searchQuery.value = ''
  searchResults.value = []
  hasSearched.value = false
  totalResults.value = 0
  showSuggestions.value = false
  router.replace({ path: '/search' })
}


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

// 切换过滤菜单
const toggleFilterMenu = () => {
  showFilterMenu.value = !showFilterMenu.value
}

// 清空所有筛选条件
const clearFilters = () => {
  filters.value = {
    sort: 'latest',
    priceMin: null,
    priceMax: null,
    styles: [],
    colors: []
  }
  // 如果有搜索结果，重新搜索
  if (hasSearched.value) {
    performSearch()
  }
}

// 切换风格选择
const toggleStyle = (styleValue: string) => {
  const index = filters.value.styles.indexOf(styleValue)
  if (index > -1) {
    filters.value.styles.splice(index, 1)
  } else {
    filters.value.styles.push(styleValue)
  }
}

// 切换颜色选择
const toggleColor = (colorValue: string) => {
  const index = filters.value.colors.indexOf(colorValue)
  if (index > -1) {
    filters.value.colors.splice(index, 1)
  } else {
    filters.value.colors.push(colorValue)
  }
}

// 移除单个筛选条件
const removeFilter = (filterKey: string) => {
  if (filterKey === 'sort') {
    filters.value.sort = 'latest'
  } else if (filterKey === 'priceMin') {
    filters.value.priceMin = null
  } else if (filterKey === 'priceMax') {
    filters.value.priceMax = null
  } else if (filterKey === 'styles') {
    filters.value.styles = []
  } else if (filterKey === 'colors') {
    filters.value.colors = []
  }
  
  if (hasSearched.value) {
    performSearch()
  }
}

// 计算活跃的筛选条件
const activeFilters = computed(() => {
  const active: any = {}
  
  if (filters.value.sort && filters.value.sort !== 'latest') {
    const sortOption = filterOptions.sort.find(s => s.value === filters.value.sort)
    if (sortOption) {
      active.sort = { label: '排序', value: sortOption.text }
    }
  }
  
  if (filters.value.priceMin || filters.value.priceMax) {
    const min = filters.value.priceMin || 0
    const max = filters.value.priceMax || '∞'
    active.price = { label: '价格', value: `${min}-${max}` }
  }
  
  if (filters.value.styles.length > 0) {
    const styleTexts = filters.value.styles.map(styleValue => {
      const styleOption = filterOptions.style.find(s => s.value === styleValue)
      return styleOption ? styleOption.text : styleValue
    })
    active.styles = { label: '风格', value: styleTexts.join(', ') }
  }
  
  if (filters.value.colors.length > 0) {
    const colorTexts = filters.value.colors.map(colorValue => {
      const colorOption = colorOptions.find(c => c.value === colorValue)
      return colorOption ? colorOption.text : colorValue
    })
    active.colors = { label: '颜色', value: colorTexts.join(', ') }
  }
  
  return active
})

// 计算活跃筛选条件数量
const activeFiltersCount = computed(() => {
  return Object.keys(activeFilters.value).length
})

// 应用筛选条件
const applyFilters = () => {
  // 如果有搜索结果，重新搜索
  if (hasSearched.value) {
    performSearch()
  }
  // 关闭过滤菜单
  showFilterMenu.value = false
}

</script>

<template>
  <div class="search-page" :class="{ 'light-theme': !isDarkMode }">
    <!-- Mobile overlay -->
    <div 
      v-if="showMobileSidebar" 
      class="mobile-overlay"
      @click="closeMobileSidebar"
    ></div>

    <!-- Left fixed sidebar -->
    <aside class="sidebar" :class="{ 'mobile-open': showMobileSidebar, 'collapsed': sidebarCollapsed }">
      <div class="sidebar-content">
        <!-- Logo and collapse button area -->
        <div class="sidebar-header">
          <!-- Logo area - hidden when collapsed -->
          <div class="sidebar-logo" v-if="!sidebarCollapsed">
            <div class="logo-container">
              <img 
                :src="isDarkMode ? '/logo/logo.svg' : '/logo/logo.light.svg'" 
                alt="Yishe Logo" 
                class="logo-image"
              />
            </div>
          </div>

          <!-- Collapse button - top right corner -->
          <div class="sidebar-toggle">
            <v-btn
              variant="text"
              @click="toggleSidebar"
              class="toggle-btn"
              icon
                size="small"
              >
              <v-icon>{{ sidebarCollapsed ? 'mdi-dock-right' : 'mdi-dock-left' }}</v-icon>
            </v-btn>
          </div>
        </div>

        <!-- Navigation menu -->
        <nav class="sidebar-nav">

          <div class="nav-section">
            <v-btn
              variant="text"
              class="nav-btn"
              :class="{ 'active': selectedCategory === 'clothing' }"
              @click="selectCategory('clothing')"
            >
              <v-icon v-if="sidebarCollapsed">mdi-tshirt-crew</v-icon>
              <template v-else>
                <v-icon left>mdi-tshirt-crew</v-icon>
                <span>Fashion</span>
              </template>
            </v-btn>
            
            <v-btn
              variant="text"
              class="nav-btn"
              :class="{ 'active': selectedCategory === 'materials' }"
              @click="selectCategory('materials')"
            >
              <v-icon v-if="sidebarCollapsed">mdi-image-multiple</v-icon>
              <template v-else>
                <v-icon left>mdi-image-multiple</v-icon>
                <span> Materials</span>
              </template>
            </v-btn>
            
            <v-btn
              variant="text"
              class="nav-btn"
              :class="{ 'active': selectedCategory === 'text-creation' }"
              @click="selectCategory('text-creation')"
            >
              <v-icon v-if="sidebarCollapsed">mdi-text-box</v-icon>
              <template v-else>
                <v-icon left>mdi-text-box</v-icon>
                <span>Text</span>
              </template>
            </v-btn>
            
          </div>

        </nav>

        <!-- Theme toggle switch -->
        <div class="theme-toggle-section">
          <div class="theme-toggle-container">
            <!-- Collapsed state: use div -->
            <div 
              v-if="sidebarCollapsed"
              class="theme-toggle-btn theme-toggle-btn-collapsed"
              @click="toggleTheme"
              :title="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
            >
              <v-icon>
                {{ isDarkMode ? 'mdi-brightness-6' : 'mdi-weather-night' }}
              </v-icon>
          </div>
            <!-- Expanded state: use v-btn -->
            <v-btn
              v-else
              variant="text"
              class="theme-toggle-btn"
              @click="toggleTheme"
              :title="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
            >
              <v-icon left>
                {{ isDarkMode ? 'mdi-brightness-6' : 'mdi-weather-night' }}
              </v-icon>
              <span>{{ isDarkMode ? 'Switch to light mode' : 'Switch to dark mode' }}</span>
            </v-btn>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main content area -->
    <main class="main-content" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <!-- Dynamic Header component -->
      <component
        :is="currentHeaderComponent"
        v-bind="getHeaderProps()"
        @update:searchQuery="searchQuery = $event"
        @toggle-filter-menu="toggleFilterMenu"
        @perform-search="performSearch"
        @clear-search="clearSearch"
        @select-suggestion="selectSuggestion"
        @toggle-mobile-sidebar="showMobileSidebar = !showMobileSidebar"
        @handle-blur="handleBlur"
        @update:showSuggestions="showSuggestions = $event"
        @update:filters="filters = $event"
        @remove-filter="removeFilter"
        @clear-filters="clearFilters"
        @apply-filters="applyFilters"
        @toggle-style="toggleStyle"
        @toggle-color="toggleColor"
        v-if="selectedCategory !== 'text-creation'"
      />
      
      <!-- Simplified Header for text creation page -->
      <component
        :is="currentHeaderComponent"
        v-bind="getHeaderProps()"
        @toggle-mobile-sidebar="showMobileSidebar = !showMobileSidebar"
        v-if="selectedCategory === 'text-creation'"
      />

    <!-- Main content area -->
    <div class="content-area">
      <!-- Dynamic content component -->
      <component :is="currentContentComponent" />
    </div>
    </main>
  </div>
</template>

<style lang="scss">
// CSS variable definitions - dark mode (default)
.search-page {
  // Background colors
  --bg-primary: #1a1a1a;
  --bg-secondary: #1C1C1C;
  --bg-tertiary: #2a2a2a;
  --bg-hover: rgba(255, 255, 255, 0.08);
  --bg-active: rgba(255, 255, 255, 0.15);
  
  // 文字颜色
  --text-primary: #ffffff;
  --text-secondary: #e0e0e0;
  --text-tertiary: #999999;
  --text-muted: #888888;
  
  // 边框颜色
  --border-primary: #404040;
  --border-secondary: rgba(255, 255, 255, 0.1);
  --border-hover: rgba(255, 255, 255, 0.2);
  
  // 主题色
  --theme-primary: #3b82f6;
  --theme-primary-hover: #2563eb;
  --theme-gradient: linear-gradient(135deg, #3b82f6, #1d4ed8);
  
  // 阴影
  --shadow-primary: rgba(0, 0, 0, 0.3);
  --shadow-secondary: rgba(0, 0, 0, 0.4);
  
  // 输入框背景
  --input-bg: rgba(255, 255, 255, 0.05);
  --input-bg-hover: rgba(255, 255, 255, 0.1);
  --input-bg-focus: rgba(255, 255, 255, 0.15);
}

// 白天模式变量
.light-theme {
  // 背景色 - 更柔和的白色系
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-tertiary: #f1f5f9;
  --bg-hover: rgba(0, 0, 0, 0.04);
  --bg-active: rgba(0, 0, 0, 0.08);
  
  // 文字颜色 - 更好的对比度
  --text-primary: #1e293b;
  --text-secondary: #475569;
  --text-tertiary: #64748b;
  --text-muted: #94a3b8;
  
  // 边框颜色 - 更细腻的边框
  --border-primary: #e2e8f0;
  --border-secondary: rgba(0, 0, 0, 0.08);
  --border-hover: rgba(0, 0, 0, 0.15);
  
  // 主题色
  --theme-primary: #3b82f6;
  --theme-primary-hover: #2563eb;
  --theme-gradient: linear-gradient(135deg, #3b82f6, #1d4ed8);
  
  // 阴影 - 更柔和的阴影
  --shadow-primary: rgba(0, 0, 0, 0.08);
  --shadow-secondary: rgba(0, 0, 0, 0.12);
  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  --shadow-card-hover: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
  
  // 输入框背景 - 更清晰的输入框
  --input-bg: #ffffff;
  --input-bg-hover: #f8fafc;
  --input-bg-focus: #ffffff;
  --input-border: #d1d5db;
  --input-border-hover: #9ca3af;
  --input-border-focus: #3b82f6;
  
  // 卡片背景
  --card-bg: #ffffff;
  --card-bg-hover: #f8fafc;
  
  // 按钮样式
  --btn-primary-bg: #3b82f6;
  --btn-primary-hover: #2563eb;
  --btn-secondary-bg: #f1f5f9;
  --btn-secondary-hover: #e2e8f0;
  --btn-text: #475569;
}

// 全局滚动条样式
* {
  scrollbar-width: thin;
  scrollbar-color: var(--border-primary) var(--bg-tertiary);
}

*::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

*::-webkit-scrollbar-track {
  background: var(--bg-tertiary);
  border-radius: 2px;
}

*::-webkit-scrollbar-thumb {
  background: var(--border-primary);
  border-radius: 2px;
  transition: background 0.3s ease;
    
    &:hover {
    background: var(--text-tertiary);
  }
}

*::-webkit-scrollbar-thumb:active {
  background: var(--text-secondary);
}

*::-webkit-scrollbar-corner {
  background: var(--bg-tertiary);
}

// 搜索页面布局
.search-page {
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
  display: flex;
  transition: all 0.3s ease;
}

// 左侧固定侧边栏
.sidebar {
  width: 240px;
  background: var(--bg-secondary);
  border-right: 1px solid var(--border-primary);
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  overflow: hidden;
  z-index: 1002; // 高于固定头部，确保不被遮挡
  box-shadow: 2px 0 8px var(--shadow-primary);
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  &.collapsed {
    width: 80px;
  }
}

.sidebar-content {
  padding: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.sidebar-toggle {
  position: relative; // 改为相对定位，让flex布局控制位置
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .toggle-btn {
    color: var(--text-secondary);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    background: var(--bg-secondary);
    transform: scale(1);
    
    &:hover {
      color: var(--text-primary);
      background: var(--bg-hover);
      transform: scale(1.05);
    }
    
    &:active {
      transform: scale(0.95);
    }
  }
}


// 侧边栏头部区域 - Logo和折叠按钮容器
.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 0.5rem 1rem 0.5rem;
  margin-bottom: 0.75rem;
  min-height: 60px; // 设置最小高度确保垂直居中效果
}

// 侧边栏Logo区域
.sidebar-logo {
  padding: 0;
  border-bottom: none;
  margin-bottom: 0;
  
  .logo-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0;
    margin-left: 0.875rem; // 与导航按钮图标左边缘对齐
  }
  
  .logo-image {
    height: 24px;
    width: auto;
    flex-shrink: 0;
  }
}

// 折叠状态下的头部样式
.sidebar.collapsed {
  .sidebar-header {
    padding: 1rem 0.25rem 0.75rem 0.25rem;
    justify-content: center;
    min-height: 50px; // 折叠状态下稍微减少高度
  }
}

// 侧边栏导航菜单
.sidebar-nav {
  padding: 1rem 0.25rem 1.5rem 0.25rem; // 调整顶部padding，因为现在有logo区域
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  
  .nav-section {
    margin-bottom: 1.5rem;
    
    .nav-btn {
      width: 100%;
      justify-content: flex-start;
      padding: 1rem 1.25rem; // 增加按钮内边距
      margin: 0.25rem 0; // 增加按钮间距
      color: var(--text-tertiary);
      font-size: 0.85rem;
      font-weight: 500;
      font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      text-transform: none;
      border-radius: 8px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      min-height: 36px;
      background: transparent;
      text-decoration: none;
      letter-spacing: 0.01em;
      
      &:hover {
        color: var(--text-primary);
        background: var(--bg-hover);
        border-radius: 8px;
        transform: translateX(2px);
      }
      
      &.active {
        color: var(--text-primary);
        font-weight: 600;
        transform: translateX(0);
        
        .v-icon {
          color: var(--text-primary);
        }
        
        &:hover {
          color: var(--text-primary);
          transform: translateX(0);
          
          .v-icon {
            color: var(--text-primary);
          }
        }
      }
      
      .v-icon {
        margin-right: 0.625rem;
        font-size: 1.2rem;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border-radius: 4px;
        padding: 2px;
      }
      
      span {
        transition: all 0.3s ease;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: inherit;
      }
    }
  }
}

// 折叠状态下的导航样式
.sidebar.collapsed {
  .sidebar-nav {
    padding: 1rem 0 1rem 0; // 折叠状态下不需要左右padding，保持居中
    
    .nav-section {
      margin-bottom: 1rem;
      
      .nav-btn {
        padding: 0.75rem; // 保持原来的内边距
        justify-content: center;
        align-items: center;
        margin: 0.25rem 0.25rem; // 减少左右间距
        width: calc(100% - 1rem);
        background: transparent;
        min-height: 44px;
        border-radius: 8px;
        display: flex !important;
        flex-direction: row;
        text-align: center;
        
        .v-icon {
          font-size: 1.4rem;
          margin: 0 !important;
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          padding: 4px;
        }
        
        &:hover {
          color: var(--text-primary);
          background: var(--bg-hover);
          transform: scale(1.05);
        }
        
        &.active {
          color: var(--text-primary);
          background: var(--bg-active);
          font-weight: 600;
          
          &::after {
            content: '';
            position: absolute;
            bottom: 4px;
            left: 50%;
            transform: translateX(-50%);
            width: 24px;
            height: 2px;
            background: var(--text-primary);
            border-radius: 1px;
          }
        }
      }
    }
  }
}

// 主题切换区域
.theme-toggle-section {
  padding: 1rem 0.5rem;
  border-top: 1px solid var(--border-secondary);
  margin-top: auto;
  
  .theme-toggle-container {
    .theme-toggle-btn {
      width: 100%;
      justify-content: flex-start;
      padding: 0.625rem 0.875rem;
      color: var(--text-tertiary);
      font-size: 0.85rem;
      font-weight: 500;
      font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      text-transform: none;
      border-radius: 8px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      min-height: 36px;
      background: transparent;
      text-decoration: none;
      letter-spacing: 0.01em;
      
      &:hover {
        color: var(--text-primary);
        background: var(--bg-hover);
        border-radius: 8px;
        transform: translateX(2px);
      }
      
      .v-icon {
        margin-right: 0.625rem;
        font-size: 1.2rem;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border-radius: 4px;
        padding: 2px;
      }
      
      span {
        transition: all 0.3s ease;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: inherit;
      }
    }
  }
}

// 折叠状态下的主题切换按钮
.sidebar.collapsed {
  .theme-toggle-section {
    padding: 0.5rem 0.25rem;
    display: flex;
    justify-content: center;
    
    .theme-toggle-container {
      .theme-toggle-btn-collapsed {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        background: transparent;
        border-radius: 4px;
        cursor: pointer;
        color: var(--text-tertiary);
        
        &:hover {
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
        }
        
        .v-icon {
          font-size: 16px;
          margin: 0;
        }
      }
      
      .theme-toggle-btn {
        padding: 0.75rem;
        justify-content: center;
        align-items: center;
        margin: 0.25rem 0.5rem;
        width: calc(100% - 1rem);
        background: transparent;
        min-height: 44px;
        border-radius: 8px;
        display: flex !important;
        flex-direction: row;
        text-align: center;
        
        .v-icon {
          font-size: 1.4rem;
          margin: 0 !important;
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          padding: 4px;
        }
        
        &:hover {
          color: var(--text-primary);
          background: var(--bg-hover);
          transform: scale(1.05);
        }
      }
    }
  }
}




// 主内容区域
.main-content {
  flex: 1;
  margin-left: 240px;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 56px); // 减去头部高度
  background: var(--bg-primary);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  &.sidebar-collapsed {
    margin-left: 80px;
  }
  
}

// 顶部固定导航栏 - 完全固定
.top-header {
  background: var(--bg-primary);
  position: fixed;
  top: 0;
  left: 240px; // 从左侧菜单右侧开始
  right: 0;
  z-index: 1001;
  box-shadow: 0 2px 8px var(--shadow-primary);
  backdrop-filter: blur(10px);
  will-change: transform;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-perspective: 1000;
  perspective: 1000;
  contain: layout style paint;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

// 当侧边栏折叠时调整头部位置
.sidebar-collapsed .top-header {
  left: 80px;
}

.header-content {
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 56px;
  position: relative;
}

.page-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  flex-shrink: 0;
}

// 搜索和筛选容器
.search-filter-container {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  max-width: 600px;
  margin: 0 auto;
}

// 头部筛选按钮
.search-filter-container .filter-toggle-btn {
  color: var(--text-secondary);
  transition: all 0.3s ease;
  flex-shrink: 0;
  
  &.active {
    color: var(--text-primary);
    background: var(--bg-hover);
  }
  
  &:hover {
    color: var(--text-primary);
    background: var(--bg-hover);
  }
}

// 搜索容器
.search-container {
  flex: 1;
  position: relative;
}

// 搜索框 - 背景色风格
.search-box {
  display: flex;
  align-items: center;
  background: var(--input-bg);
  border: none;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  height: 40px;
  
  &:hover {
    background: var(--input-bg-hover);
  }
  
  &:focus-within {
    background: var(--input-bg-focus);
    box-shadow: 0 0 0 2px var(--border-hover);
  }
}

.search-icon {
  color: var(--text-tertiary);
  margin-right: 0.625rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  .search-box:hover & {
    color: var(--text-secondary);
  }
  
  .search-box:focus-within & {
    color: var(--text-primary);
  }
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text-primary);
  font-size: 0.9rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 400;
  
  &::placeholder {
    color: var(--text-muted);
    font-weight: 400;
    transition: color 0.3s ease;
  }
  
  &:focus {
    color: var(--text-primary);
    
    &::placeholder {
      color: var(--text-tertiary);
    }
  }
}

.clear-btn {
  color: var(--text-tertiary);
  margin-left: 0.375rem;
  opacity: 0.7;
  transition: all 0.3s ease;
  padding: 0.125rem;
  border-radius: 50%;
  min-width: 24px;
  height: 24px;
  
  &:hover {
    color: var(--text-primary);
    opacity: 1;
    background: var(--bg-hover);
  }
}

// 搜索建议
.search-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-secondary);
  border-radius: 12px;
  margin-top: 0.5rem;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px var(--shadow-primary);
  z-index: 1003; // 确保在固定头部之上
  overflow: hidden;
}

.suggestion-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  cursor: pointer;
  border-bottom: 1px solid var(--border-secondary);
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: var(--bg-hover);
  }
}

.suggestion-icon {
  color: var(--text-muted);
  margin-right: 0.75rem;
  font-size: 1rem;
}

.suggestion-text {
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 400;
}


// 过滤菜单样式
.filter-section {
  background: var(--bg-primary);
  position: fixed;
  top: 56px; // 在头部下方
  left: 240px; // 从左侧菜单右侧开始
  right: 0;
  z-index: 1000;
  margin-top: -1px; // 与头部重叠1px，消除间隙
  transition: all 0.3s ease;
  
  // 当侧边栏折叠时调整位置
  .sidebar-collapsed & {
    left: 80px;
  }
}


.filter-content {
  padding: 0.75rem 0.75rem 1.5rem 0.75rem; // 增加底部内边距
  background: var(--bg-primary);
}

.filter-row-single {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 0.5rem 0.5rem 1rem 0.5rem; // 增加上下左右padding，为滚动条留出空间
  
  // 自定义滚动条
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--border-secondary);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--border-hover);
    border-radius: 2px;
    
    &:hover {
      background: var(--text-tertiary);
    }
  }
}

.filter-group {
  flex-shrink: 0;
  min-width: 140px;
}

.filter-label {
  display: block;
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
  font-weight: 500;
}

.filter-select {
  .v-field {
    background: var(--input-bg);
    border: 1px solid var(--border-secondary);
    color: var(--text-primary);
    
    &:hover {
      border-color: var(--border-hover);
    }
    
    &.v-field--focused {
      border-color: var(--text-primary);
      box-shadow: 0 0 0 1px var(--border-hover);
    }
  }
  
  .v-field__input {
    color: var(--text-primary);
    
    &::placeholder {
      color: var(--text-muted);
    }
  }
  
  .v-field__append-inner {
    color: var(--text-secondary);
  }
}

.filter-actions-inline {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
  margin-left: 0.5rem;
}

// 筛选标签显示
.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem; // 增加下边距
  padding: 0.75rem 0 1rem 0; // 增加上下内边距
}

.filter-chip {
  background: var(--bg-hover) !important;
  color: var(--text-secondary) !important;
  border: 1px solid var(--border-secondary) !important;
  
  &:hover {
    background: var(--bg-active) !important;
  }
}

// 价格范围容器
.filter-group-range {
  min-width: 200px;
}

.price-range-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.price-input {
  flex: 1;
  min-width: 80px;
}

.price-separator {
  color: var(--text-secondary);
  font-weight: 500;
  flex-shrink: 0;
}

// 风格标签选择
.filter-group-chips {
  min-width: 300px;
}

.style-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  max-height: 60px;
  overflow-y: auto;
  padding: 0.5rem 0.5rem 0.75rem 0.5rem; // 增加padding，为滚动条留出空间
}

.style-chip {
  background: transparent !important;
  color: var(--text-secondary) !important;
  border: 1px solid var(--border-secondary) !important;
  cursor: pointer;
  
  &:hover {
    background: var(--bg-hover) !important;
    border-color: var(--border-hover) !important;
  }
  
  &.chip-selected {
    background: var(--bg-active) !important;
    border-color: var(--text-primary) !important;
    color: var(--text-primary) !important;
  }
}

// 颜色选择器
.filter-group-colors {
  min-width: 200px;
}

.color-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  max-height: 60px;
  overflow-y: auto;
  padding: 0.5rem 0.5rem 0.75rem 0.5rem; // 增加padding，为滚动条留出空间
}

.color-option {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
  position: relative;
  
  &:hover {
    transform: scale(1.1);
    border-color: var(--border-hover);
  }
  
  &.color-selected {
    border-color: var(--text-primary);
    box-shadow: 0 0 0 2px var(--border-hover);
    
    &::after {
      content: '✓';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: var(--text-primary);
      font-size: 12px;
      font-weight: bold;
      text-shadow: 0 0 2px var(--shadow-secondary);
    }
  }
}

.filter-clear-btn {
  color: var(--text-secondary);
  border-color: var(--border-primary);
  min-width: 36px;
  height: 36px;
  
  &:hover {
    color: var(--text-primary);
    border-color: var(--text-tertiary);
    background: var(--bg-hover);
  }
}

.filter-apply-btn {
  background: var(--theme-primary);
  color: var(--text-primary);
  min-width: 36px;
  height: 36px;
  
  &:hover {
    background: var(--theme-primary-hover);
  }
}

// 内容区域
.content-area {
  flex: 1;
  padding: 1.5rem 1.5rem 2rem 1.5rem; // 增加底部padding，为滚动条留出更多空间
  background: var(--bg-primary);
  overflow-y: auto;
  overflow-x: hidden;
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
  color: var(--text-primary);
    margin-bottom: 1rem;
  }
  
.placeholder-description {
  font-size: 1.125rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
    line-height: 1.6;
}


// 照片墙样式
.photo-wall {
  .photo-wall-header {
    text-align: center;
    margin-bottom: 3rem;
    
    .photo-wall-title {
      font-size: 2rem;
      font-weight: 700;
      color: var(--text-primary);
    margin-bottom: 0.5rem;
      background: var(--theme-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .photo-wall-subtitle {
      font-size: 1rem;
      color: var(--text-secondary);
  margin: 0;
    }
  }
  
  .photo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.25rem;
    margin-bottom: 2.5rem;
    
    .photo-item {
      position: relative;
      border-radius: 12px;
      overflow: hidden;
      background: var(--bg-tertiary);
      transition: all 0.3s ease;
      cursor: pointer;
      
      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px var(--shadow-secondary);
        
        .photo-overlay {
          opacity: 1;
        }
      }
      
      &.large {
        grid-row: span 2;
      }
      
      &.medium {
        grid-row: span 1.5;
      }
      
      .photo-container {
        position: relative;
        width: 100%;
        height: 100%;
        min-height: 250px;
        
        .photo-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        
        .photo-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            transparent 50%,
            var(--shadow-secondary) 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
    display: flex;
          align-items: flex-end;
          padding: 1.5rem;
          
          .photo-info {
            color: var(--text-primary);
            
            .photo-title {
      font-size: 1.25rem;
              font-weight: 600;
    margin-bottom: 0.5rem;
              color: var(--text-primary);
            }
    
            .photo-description {
      font-size: 0.875rem;
              color: var(--text-secondary);
              margin-bottom: 1rem;
              line-height: 1.4;
            }
            
            .photo-meta {
  display: flex;
  gap: 1rem;
  
              .photo-likes,
              .photo-views {
    display: flex;
    align-items: center;
                gap: 0.25rem;
    font-size: 0.875rem;
                color: var(--text-secondary);
    
    .v-icon {
                  color: var(--theme-primary);
                }
              }
            }
          }
        }
      }
    }
  }
  
  .load-more-container {
    text-align: center;
    margin-top: 2rem;
    
    .load-more-btn {
      background: var(--bg-tertiary);
      border: 1px solid var(--border-primary);
      color: var(--text-primary);
      padding: 0.75rem 2rem;
      font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
        background: var(--theme-primary);
        border-color: var(--theme-primary);
        color: var(--text-primary);
  }
}
  }
}

.search-results {
  .results-header {
    margin-bottom: 2rem;
  }
  
  .results-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }
  
  .results-count {
    font-size: 1rem;
    font-weight: 400;
    color: var(--text-secondary);
  }
  
  .results-query {
    font-size: 1rem;
    color: var(--text-secondary);
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
  color: var(--text-secondary);
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
  color: var(--text-primary);
}

.no-results-description {
  color: var(--text-secondary);
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
  background: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px var(--shadow-primary);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 32px var(--shadow-secondary);
    border-color: var(--theme-primary);
  }
}

.product-image {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
  background: var(--bg-primary);
  
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
    background: var(--bg-primary);
    color: var(--text-tertiary);
  }
  
  .product-tag {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    background: var(--theme-primary);
    color: var(--text-primary);
    padding: 0.375rem 0.75rem;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: 0 2px 8px var(--shadow-primary);
  }
}

.product-info {
  padding: 1.25rem;
}

.product-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
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
  color: var(--text-secondary);
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
    color: var(--theme-primary);
  }
  
  .original-price {
    font-size: 0.875rem;
    color: var(--text-tertiary);
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
    color: var(--text-secondary);
    
    .v-icon {
      font-size: 0.875rem;
      color: var(--theme-primary);
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
  background: var(--shadow-primary);
  z-index: 999;
  display: none;
}

// 移动端菜单按钮
.mobile-menu-btn {
  display: none;
}

// 响应式设计 - 平板端优化
@media (max-width: 1024px) {
  .sidebar {
    width: 200px; // 稍微减少宽度，为内容留更多空间
    
    &.collapsed {
      width: 70px; // 折叠状态也稍微减少
    }
  }
  
  .main-content {
    margin-left: 200px;
    
    &.sidebar-collapsed {
      margin-left: 70px;
    }
  }
  
  .content-area {
    padding: 1.25rem; // 稍微减少内边距
  }
  
  // 平板端侧边栏导航优化
  .sidebar-nav {
    padding: 1rem 0.25rem 1rem 0.25rem; // 调整平板端顶部padding
    
    .nav-section {
      margin-bottom: 1rem; // 减少section间距
      
      .nav-btn {
        padding: 0.875rem 1rem; // 稍微减少按钮内边距
        font-size: 0.8rem; // 稍微减小字体
        min-height: 40px; // 减少最小高度
        
        &:hover {
          color: var(--text-primary);
          background: var(--bg-hover);
          border-radius: 8px;
          transform: translateX(1px); // 减少移动距离
        }
      }
    }
  }
  
  // 平板端折叠状态优化
  .sidebar.collapsed {
    .sidebar-nav {
      padding: 1rem 0 1rem 0;
      
      .nav-btn {
        padding: 0.625rem;
        margin: 0.2rem 0.2rem; // 减少间距
        min-height: 36px;
      }
    }
  }
  
  // 平板端头部优化
  .top-header {
    left: 200px;
    
    &.sidebar-collapsed {
      left: 70px;
    }
  }
  
  .filter-section {
    left: 200px;
    
    &.sidebar-collapsed {
      left: 70px;
    }
  }
}

// 中等屏幕优化 - 平板横屏和小笔记本
@media (max-width: 900px) and (min-width: 769px) {
  .sidebar {
    width: 180px;
    
    &.collapsed {
      width: 60px;
    }
  }
  
  .main-content {
    margin-left: 180px;
    
    &.sidebar-collapsed {
      margin-left: 60px;
    }
  }
  
  .top-header {
    left: 180px;
    
    &.sidebar-collapsed {
      left: 60px;
    }
  }
  
  .filter-section {
    left: 180px;
    
    &.sidebar-collapsed {
      left: 60px;
    }
  }
  
  .sidebar-nav {
    padding: 1rem 0.25rem 1rem 0.25rem; // 调整中等屏幕顶部padding
    
    .nav-btn {
      padding: 0.75rem 0.875rem;
      font-size: 0.8rem;
      min-height: 38px;
    }
  }
  
  .sidebar.collapsed {
    .sidebar-nav {
      padding: 1rem 0 1rem 0;
      
      .nav-btn {
        padding: 0.5rem;
        margin: 0.15rem 0.15rem;
        min-height: 32px;
      }
    }
  }
  
  .content-area {
    padding: 1rem;
  }
  
  .photo-wall {
    .photo-grid {
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 1rem;
    }
  }
  
  .results-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.25rem;
  }
}

// 移动端优化 - 重新设计交互方式
@media (max-width: 768px) {
  .mobile-overlay {
    display: block;
    background: var(--shadow-secondary);
    backdrop-filter: blur(4px);
  }
  
  .mobile-menu-btn {
    display: block;
    color: var(--text-primary);
    min-width: 44px; // 增加触摸区域
    height: 44px;
    
    &:hover {
      background: var(--bg-hover);
    }
  }
  
  // 移动端侧边栏 - 全屏抽屉式
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    width: 280px; // 移动端使用更宽的侧边栏
    z-index: 1003; // 确保在最上层
    
    &.mobile-open {
      transform: translateX(0);
    }
    
    // 移动端不支持折叠状态
    &.collapsed {
      width: 280px;
    }
  }
  
  // 移动端头部优化
  .sidebar-header {
    padding: 1rem 0.5rem 0.75rem 0.5rem;
    min-height: 56px; // 移动端设置合适的最小高度
  }
  
  .sidebar-logo {
    .logo-container {
      justify-content: flex-start;
      margin-left: 1.25rem; // 移动端与导航按钮图标左边缘对齐
      
      .logo-image {
        height: 22px;
      }
    }
  }

  // 移动端侧边栏导航优化
  .sidebar-nav {
    padding: 0.75rem 0.25rem 1rem 0.25rem; // 调整移动端顶部padding
    
    .nav-section {
      margin-bottom: 0.5rem;
      
      .nav-btn {
        padding: 1rem 1.25rem; // 移动端增加触摸区域
        font-size: 0.9rem;
        min-height: 48px; // 增加最小高度，便于触摸
        margin: 0.125rem 0;
        
        &:hover {
          background: var(--bg-hover);
          transform: none; // 移动端取消hover动画
        }
        
        &:active {
          background: var(--bg-active);
          transform: scale(0.98); // 添加点击反馈
        }
      }
    }
  }
  
  // 移动端头部优化 - 自适应高度
  .top-header {
    left: 0;
    min-height: 60px; // 设置最小高度
    box-shadow: 0 2px 12px var(--shadow-primary);
  }
  
  .header-content {
    padding: 0.75rem 1rem; // 增加上下padding
    min-height: 60px; // 设置最小高度
    gap: 0.75rem;
    align-items: center; // 确保垂直居中
    display: flex;
    flex-wrap: nowrap; // 防止换行
    overflow: visible; // 允许内容显示
  }
  
  .page-title {
    font-size: 1.1rem;
    flex-shrink: 0; // 防止标题被压缩
  }
  
  // 移动端搜索和筛选容器优化
  .search-filter-container {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 0; // 允许flex子元素收缩
  }
  
  // 移动端搜索框优化
  .search-container {
    flex: 1;
    min-width: 0; // 允许搜索框收缩
  }
  
  .search-box {
    padding: 0.625rem 0.875rem; // 调整padding适应新高度
    height: 40px; // 稍微减少搜索框高度
    min-width: 120px; // 设置最小宽度
  }
  
  .search-input {
    font-size: 0.9rem;
  }
  
  // 移动端筛选按钮优化
  .filter-toggle-btn {
    flex-shrink: 0; // 防止筛选按钮被压缩
    min-width: 40px;
    height: 40px;
  }
  
  .search-suggestions {
    border-radius: 12px;
    margin-top: 0.5rem;
    box-shadow: 0 8px 32px var(--shadow-primary);
  }
  
  .suggestion-item {
    padding: 1rem 1.25rem; // 增加触摸区域
    min-height: 48px;
  }
  
  .suggestion-text {
    font-size: 0.9rem;
  }
  
  // 移动端过滤菜单优化
  .filter-section {
    left: 0;
    top: auto; // 让过滤菜单自动定位在头部下方
    margin-top: -1px; // 与头部重叠1px，消除间隙
    box-shadow: 0 4px 16px var(--shadow-primary);
    
    .filter-content {
      padding: 1rem 1.25rem 1.5rem 1.25rem;
    }
    
    .filter-row-single {
      gap: 0.75rem;
      padding: 0.75rem 0.5rem 1rem 0.5rem;
      
      .filter-group {
        min-width: 140px;
      }
    }
    
    .filter-actions-inline {
      margin-top: 0.75rem;
    }
  }
  
  // 移动端主内容区域
  .main-content {
    margin-left: 0;
    min-height: calc(100vh - 60px); // 使用最小头部高度
    padding-top: 0; // 移除顶部padding，让内容紧贴头部
  }
  
  .content-area {
    padding: 1rem 0.75rem; // 减少左右内边距
  }
  
  // 移动端照片墙优化
  .photo-wall {
    .photo-wall-header {
      margin-bottom: 1.5rem;
      padding: 0 0.5rem;
      
      .photo-wall-title {
        font-size: 1.75rem;
        line-height: 1.2;
      }
      
      .photo-wall-subtitle {
        font-size: 0.9rem;
        margin-top: 0.5rem;
      }
    }
    
    .photo-grid {
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 0.75rem;
      
      .photo-item {
        border-radius: 8px;
        
        .photo-container {
          min-height: 180px;
        }
        
        .photo-overlay {
          padding: 0.75rem;
          border-radius: 8px;
          
          .photo-info {
            .photo-title {
              font-size: 1rem;
              margin-bottom: 0.25rem;
            }
            
            .photo-description {
              font-size: 0.75rem;
              margin-bottom: 0.75rem;
              line-height: 1.3;
            }
            
            .photo-meta {
              gap: 0.5rem;
              
              .photo-likes,
              .photo-views {
                font-size: 0.75rem;
              }
            }
          }
        }
      }
    }
  }
  
  // 移动端搜索结果优化
  .results-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1rem;
  }
  
  .product-card {
    border-radius: 8px;
    
    &:hover {
      transform: translateY(-2px); // 减少移动端hover效果
    }
  }
  
  .product-image {
    height: 160px;
  }
  
  .product-info {
    padding: 0.75rem;
  }
  
  .product-title {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
  
  .product-description {
    font-size: 0.8rem;
    margin-bottom: 0.75rem;
  }
  
  .product-meta {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }
  
  .product-stats {
    justify-content: space-between;
    gap: 0.5rem;
  }
}

// 小屏幕移动端优化
@media (max-width: 480px) {
  // 小屏幕侧边栏优化
  .sidebar {
    width: 260px; // 稍微减少宽度
  }
  
  // 小屏幕头部优化
  .sidebar-header {
    padding: 0.75rem 0.375rem 0.5rem 0.375rem;
    min-height: 48px; // 小屏幕设置合适的最小高度
  }
  
  .sidebar-logo {
    .logo-container {
      justify-content: flex-start;
      margin-left: 1rem; // 小屏幕与导航按钮图标左边缘对齐
      
      .logo-image {
        height: 20px;
      }
    }
  }
  
  .sidebar-nav {
    padding: 0.5rem 0.25rem 0.75rem 0.25rem; // 调整小屏幕顶部padding
    
    .nav-btn {
      padding: 0.875rem 1rem;
      font-size: 0.85rem;
      min-height: 44px;
    }
  }
  
  // 小屏幕头部优化 - 自适应高度
  .top-header {
    min-height: 56px; // 设置最小高度
  }
  
  .header-content {
    min-height: 56px;
    padding: 0.625rem 0.75rem; // 增加上下padding
    gap: 0.5rem;
    align-items: center;
    display: flex;
    flex-wrap: nowrap;
    overflow: visible; // 允许内容显示
  }
  
  .page-title {
    font-size: 1rem;
  }
  
  .search-box {
    padding: 0.5rem 0.75rem;
    height: 36px; // 稍微减少高度
    min-width: 100px;
  }
  
  .search-input {
    font-size: 0.85rem;
  }
  
  // 小屏幕搜索和筛选容器
  .search-filter-container {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.375rem;
    min-width: 0;
  }
  
  .search-container {
    flex: 1;
    min-width: 0;
  }
  
  .filter-toggle-btn {
    flex-shrink: 0;
    min-width: 36px;
    height: 36px;
  }
  
  // 小屏幕过滤菜单优化
  .filter-section {
    top: auto; // 让过滤菜单自动定位在头部下方
    margin-top: -1px; // 与头部重叠1px，消除间隙
    
    .filter-content {
      padding: 0.75rem 1rem 1.25rem 1rem;
    }
    
    .filter-row-single {
      gap: 0.5rem;
      padding: 0.5rem 0.25rem 0.75rem 0.25rem;
      
      .filter-group {
        min-width: 120px;
      }
    }
  }
  
  // 小屏幕主内容区域
  .main-content {
    min-height: calc(100vh - 68px); // 更新为新的头部高度
  }
  
  .content-area {
    padding: 0.75rem 0.5rem;
  }
  
  // 小屏幕照片墙优化
  .photo-wall {
    .photo-wall-header {
      margin-bottom: 1.25rem;
      
      .photo-wall-title {
        font-size: 1.5rem;
      }
      
      .photo-wall-subtitle {
        font-size: 0.85rem;
      }
    }
    
    .photo-grid {
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 0.625rem;
      
      .photo-item {
        .photo-container {
          min-height: 160px;
        }
        
        .photo-overlay {
          padding: 0.625rem;
          
          .photo-info {
            .photo-title {
              font-size: 0.9rem;
            }
            
            .photo-description {
              font-size: 0.7rem;
            }
            
            .photo-meta {
              gap: 0.375rem;
              
              .photo-likes,
              .photo-views {
                font-size: 0.7rem;
              }
            }
          }
        }
      }
    }
  }
  
  // 小屏幕搜索结果优化
  .results-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 0.75rem;
  }
  
  .product-card {
    border-radius: 6px;
  }
  
  .product-image {
    height: 140px;
  }
  
  .product-info {
    padding: 0.625rem;
  }
  
  .product-title {
    font-size: 0.85rem;
    margin-bottom: 0.375rem;
  }
  
  .product-description {
    font-size: 0.75rem;
    margin-bottom: 0.625rem;
  }
  
  .product-meta {
    gap: 0.375rem;
  }
  
  .product-stats {
    gap: 0.375rem;
  }
}
</style>
