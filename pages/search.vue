<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-09-19 08:17:49
 * @FilePath: /yishe-nuxt/pages/search.vue
 * @Description: 搜索页面 - 设计素材搜索和筛选
-->
<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// import { useSearchStore } from '~/stores/use-search'

// 导入内容区域组件
import ClothingContent from '~/pages/search/search-content/ClothingContent.vue'
import MaterialsContent from '~/pages/search/search-content/MaterialsContent.vue'

// 导入Header组件
import ClothingHeader from './search/components/headers/ClothingHeader.vue'
import MaterialsHeader from './search/components/headers/MaterialsHeader.vue'

const { awesome } = useAppConfig()
// definePageMeta({ layout: false })

// 获取路由
const route = useRoute()
const router = useRouter()
// const searchStore = useSearchStore()

// 设置页面标题
useHead({
  titleTemplate: '',
  title: computed(() => {
  
    return '搜索 - 衣设服装设计'
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

// 搜索建议
const searchSuggestions = ref([
  '连衣裙', '牛仔裤', 'T恤', '运动鞋', '休闲裤', '衬衫', '外套', '裙子', '短裤', '长裤'
])

const showSuggestions = ref(false)

// 筛选条件
const filters = ref({
  sort: 'latest',
  priceMin: null,
  priceMax: null,
  styles: [] as string[],
  colors: [] as string[]
})

const showMobileSidebar = ref(false)
const sidebarCollapsed = ref(false)

// 过滤菜单状态
const showFilterMenu = ref(false)

// 侧边栏分类选中状态
const selectedCategory = ref('clothing') // 默认选中服装设计

// 主题模式状态
const isDarkMode = ref(true) // 默认夜间模式

// 照片墙数据
const photoWallData = ref<any[]>([])
const loadingMore = ref(false)

// 服装设计筛选选项
const clothingFilterOptions = {
  sort: [
    { value: 'latest', text: '最新上架' },
    { value: 'popular', text: '最受欢迎' },
    { value: 'rating', text: '好评如潮' },
    { value: 'price_asc', text: '价格从低到高' },
    { value: 'price_desc', text: '价格从高到低' }
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
    { value: 'casual', text: '休闲' },
    { value: 'formal', text: '正装' },
    { value: 'sports', text: '运动' },
    { value: 'vintage', text: '复古' },
    { value: 'street', text: '街头' },
    { value: 'business', text: '商务' },
    { value: 'sweet', text: '甜美' },
    { value: 'cool', text: '酷炫' }
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

// 素材图筛选选项
const materialsFilterOptions = {
  sort: [
    { value: 'latest', text: '最新上传' },
    { value: 'popular', text: '最受欢迎' },
    { value: 'downloads', text: '下载最多' },
    { value: 'rating', text: '评分最高' }
  ],
  type: [
    { value: 'background', label: '背景图' },
    { value: 'texture', label: '纹理' },
    { value: 'icon', label: '图标' },
    { value: 'illustration', label: '插画' },
    { value: 'photo', label: '照片' }
  ],
  format: [
    { value: 'png', label: 'PNG' },
    { value: 'jpg', label: 'JPG' },
    { value: 'svg', label: 'SVG' },
    { value: 'ai', label: 'AI' },
    { value: 'psd', label: 'PSD' },
    { value: 'eps', label: 'EPS' }
  ],
  group: [
    { value: 'business', label: '商务' },
    { value: 'nature', label: '自然' },
    { value: 'technology', label: '科技' },
    { value: 'food', label: '美食' },
    { value: 'travel', label: '旅行' },
    { value: 'abstract', label: '抽象' },
    { value: 'minimalist', label: '极简' }
  ],
  color: [
    { value: 'red', label: '红色' },
    { value: 'blue', label: '蓝色' },
    { value: 'green', label: '绿色' },
    { value: 'yellow', label: '黄色' },
    { value: 'purple', label: '紫色' },
    { value: 'orange', label: '橙色' },
    { value: 'pink', label: '粉色' },
    { value: 'teal', label: '青色' }
  ]
}

// 根据分类获取筛选选项
const getFilterOptions = (category: string) => {
  switch (category) {
    case 'clothing':
      return clothingFilterOptions
    case 'materials':
      return materialsFilterOptions
    default:
      return clothingFilterOptions
  }
}

// 通用筛选选项（向后兼容）
const filterOptions = clothingFilterOptions

// 颜色选项
const colorOptions = [
  { value: '#000000', text: '黑色' },
  { value: '#FFFFFF', text: '白色' },
  { value: '#FF0000', text: '红色' },
  { value: '#0000FF', text: '蓝色' },
  { value: '#00FF00', text: '绿色' },
  { value: '#FFFF00', text: '黄色' },
  { value: '#FF69B4', text: '粉色' },
  { value: '#800080', text: '紫色' },
  { value: '#FFA500', text: '橙色' },
  { value: '#8B4513', text: '棕色' },
  { value: '#808080', text: '灰色' },
  { value: '#000080', text: '海军蓝' }
]


// 初始化照片墙数据
const initPhotoWall = () => {
  const mockPhotos = [
    {
      id: 1,
      title: '时尚连衣裙设计',
      description: '优雅的春季连衣裙，展现女性魅力',
      image: 'https://picsum.photos/400/600?random=1',
      likes: 1234,
      views: 5678
    },
    {
      id: 2,
      title: '休闲T恤系列',
      description: '舒适百搭的日常穿搭选择',
      image: 'https://picsum.photos/300/400?random=2',
      likes: 856,
      views: 2345
    },
    {
      id: 3,
      title: '商务正装套装',
      description: '专业职场形象的最佳选择',
      image: 'https://picsum.photos/350/500?random=3',
      likes: 2341,
      views: 4567
    },
    {
      id: 4,
      title: '运动休闲装',
      description: '活力四射的运动风格设计',
      image: 'https://picsum.photos/400/500?random=4',
      likes: 1890,
      views: 3456
    },
    {
      id: 5,
      title: '复古牛仔系列',
      description: '经典永不过时的牛仔风格',
      image: 'https://picsum.photos/300/450?random=5',
      likes: 1456,
      views: 2789
    },
    {
      id: 6,
      title: '优雅晚礼服',
      description: '华丽晚宴的完美选择',
      image: 'https://picsum.photos/350/600?random=6',
      likes: 2789,
      views: 4567
    },
    {
      id: 7,
      title: '街头潮流风',
      description: '年轻时尚的街头文化',
      image: 'https://picsum.photos/400/450?random=7',
      likes: 1678,
      views: 3123
    },
    {
      id: 8,
      title: '简约基础款',
      description: '百搭实用的基础单品',
      image: 'https://picsum.photos/300/400?random=8',
      likes: 987,
      views: 1987
    },
    {
      id: 9,
      title: '民族风情设计',
      description: '独特的民族元素融合',
      image: 'https://picsum.photos/350/500?random=9',
      likes: 1234,
      views: 2345
    },
    {
      id: 10,
      title: '未来科技感',
      description: '前卫的科技时尚风格',
      image: 'https://picsum.photos/400/500?random=10',
      likes: 2100,
      views: 3789
    },
    {
      id: 11,
      title: '自然田园风',
      description: '清新自然的田园风格',
      image: 'https://picsum.photos/300/450?random=11',
      likes: 1456,
      views: 2567
    },
    {
      id: 12,
      title: '奢华皮草系列',
      description: '高端奢华的皮草设计',
      image: 'https://picsum.photos/350/600?random=12',
      likes: 3456,
      views: 5678
    }
  ]
  
  photoWallData.value = mockPhotos
}

// 加载更多照片
const loadMorePhotos = async () => {
  loadingMore.value = true
  
  // 模拟加载延迟
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // 生成更多模拟数据
  const newPhotos = []
  for (let i = 0; i < 8; i++) {
    const id = photoWallData.value.length + i + 1
    newPhotos.push({
      id,
      title: `设计作品 ${id}`,
      description: `创意设计作品，展现独特风格`,
      image: `https://picsum.photos/${300 + Math.random() * 100}/${400 + Math.random() * 200}?random=${id}`,
      likes: Math.floor(Math.random() * 3000) + 500,
      views: Math.floor(Math.random() * 5000) + 1000
    })
  }
  
  photoWallData.value.push(...newPhotos)
  loadingMore.value = false
}

// 切换侧边栏折叠状态
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

// 切换主题模式
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  // 保存主题偏好到localStorage
  localStorage.setItem('search-page-theme', isDarkMode.value ? 'dark' : 'light')
  console.log('主题切换:', isDarkMode.value ? '夜间模式' : '白天模式')
}

// 内容组件映射
const contentComponents = {
  clothing: ClothingContent,
  materials: MaterialsContent
}

// Header组件映射
const headerComponents = {
  clothing: ClothingHeader,
  materials: MaterialsHeader
}

// Header配置映射 - 每个导航项对应的header配置
const headerConfigs = {
  clothing: {
    title: '服装设计',
    subtitle: '探索时尚服装设计灵感',
    searchPlaceholder: '搜索服装设计...',
    icon: 'mdi-tshirt-crew-outline',
    showFilter: true,
    filterOptions: ['风格', '颜色', '价格', '性别', '季节', '材质', '尺码', '场合']
  },
  materials: {
    title: '素材图',
    subtitle: '高质量设计素材资源',
    searchPlaceholder: '搜索素材图片...',
    icon: 'mdi-image-multiple-outline',
    showFilter: true,
    filterOptions: ['类型', '分辨率', '格式', '颜色', '授权', '分类']
  },
}

// 选择分类
const selectCategory = (category: string) => {
  // 只允许clothing和materials分类
  if (category === 'clothing' || category === 'materials') {
  selectedCategory.value = category
  console.log('选择分类:', category)
  }
}

// 获取当前内容组件
const currentContentComponent = computed(() => {
  return contentComponents[selectedCategory.value as keyof typeof contentComponents] || ClothingContent
})

// 获取当前header组件
const currentHeaderComponent = computed(() => {
  return headerComponents[selectedCategory.value as keyof typeof headerComponents] || ClothingHeader
})

// 获取当前header配置
const currentHeaderConfig = computed(() => {
  return headerConfigs[selectedCategory.value as keyof typeof headerConfigs] || headerConfigs.clothing
})

// 获取header组件的props
const getHeaderProps = () => {
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

// 初始化搜索查询
onMounted(() => {
  // 初始化照片墙
  initPhotoWall()
  
  // 初始化主题设置
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
    <!-- 移动端遮罩层 -->
    <div 
      v-if="showMobileSidebar" 
      class="mobile-overlay"
      @click="closeMobileSidebar"
    ></div>

    <!-- 左侧固定侧边栏 -->
    <aside class="sidebar" :class="{ 'mobile-open': showMobileSidebar, 'collapsed': sidebarCollapsed }">
      <div class="sidebar-content">
        <!-- Logo和折叠按钮区域 -->
        <div class="sidebar-header">
          <!-- Logo区域 - 折叠时隐藏 -->
          <div class="sidebar-logo" v-if="!sidebarCollapsed">
            <div class="logo-container">
              <img 
                :src="isDarkMode ? '/logo/logo.svg' : '/logo/logo.light.svg'" 
                alt="Yishe Logo" 
                class="logo-image"
              />
            </div>
          </div>

          <!-- 折叠按钮 - 右上角 -->
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

        <!-- 导航菜单 -->
        <nav class="sidebar-nav">

          <div class="nav-section">
            <v-btn
              variant="text"
              class="nav-btn"
              :class="{ 'active': selectedCategory === 'clothing' }"
              @click="selectCategory('clothing')"
            >
              <v-icon v-if="sidebarCollapsed">mdi-tshirt-crew-outline</v-icon>
              <template v-else>
                <v-icon left>mdi-tshirt-crew-outline</v-icon>
                <span>服装设计</span>
              </template>
            </v-btn>
            
            <v-btn
              variant="text"
              class="nav-btn"
              :class="{ 'active': selectedCategory === 'materials' }"
              @click="selectCategory('materials')"
            >
              <v-icon v-if="sidebarCollapsed">mdi-image-multiple-outline</v-icon>
              <template v-else>
                <v-icon left>mdi-image-multiple-outline</v-icon>
                <span>素材图</span>
              </template>
            </v-btn>
            
          </div>

        </nav>

        <!-- 主题切换开关 -->
        <div class="theme-toggle-section">
          <div class="theme-toggle-container">
            <!-- 折叠状态：使用div -->
            <div 
              v-if="sidebarCollapsed"
              class="theme-toggle-btn theme-toggle-btn-collapsed"
              @click="toggleTheme"
              :title="isDarkMode ? '切换到白天模式' : '切换到夜间模式'"
            >
              <v-icon>
                {{ isDarkMode ? 'mdi-weather-sunny' : 'mdi-weather-night' }}
              </v-icon>
          </div>
            <!-- 展开状态：使用v-btn -->
            <v-btn
              v-else
              variant="text"
              class="theme-toggle-btn"
              @click="toggleTheme"
              :title="isDarkMode ? '切换到白天模式' : '切换到夜间模式'"
            >
              <v-icon left>
                {{ isDarkMode ? 'mdi-weather-sunny' : 'mdi-weather-night' }}
              </v-icon>
              <span>{{ isDarkMode ? '切换到白天模式' : '切换到夜间模式' }}</span>
            </v-btn>
          </div>
        </div>
      </div>
    </aside>

    <!-- 主内容区域 -->
    <main class="main-content" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <!-- 动态Header组件 -->
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
      />

    <!-- 主要内容区域 -->
    <div class="content-area">
      <!-- 动态内容组件 -->
      <component :is="currentContentComponent" />
    </div>
    </main>
  </div>
</template>

<style lang="scss">
// CSS变量定义 - 夜间模式（默认）
.search-page {
  // 背景色
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
