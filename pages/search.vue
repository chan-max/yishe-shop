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
// definePageMeta({ layout: false })

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

// 搜索建议
const searchSuggestions = ref([
  '连衣裙', '牛仔裤', 'T恤', '运动鞋', '休闲裤', '衬衫', '外套', '裙子', '短裤', '长裤'
])

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

const showMobileSidebar = ref(false)
const sidebarCollapsed = ref(false)

// 照片墙数据
const photoWallData = ref<any[]>([])
const loadingMore = ref(false)

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

// 初始化搜索查询
onMounted(() => {
  // 初始化照片墙
  initPhotoWall()
  
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
    <aside class="sidebar" :class="{ 'mobile-open': showMobileSidebar, 'collapsed': sidebarCollapsed }">
      <div class="sidebar-content">
        <!-- 折叠按钮 - 右上角 -->
        <div class="sidebar-toggle">
          <v-btn
            variant="text"
            @click="toggleSidebar"
            class="toggle-btn"
            icon
              size="small"
            >
            <v-icon>{{ sidebarCollapsed ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
          </v-btn>
        </div>
      </div>
    </aside>

    <!-- 主内容区域 -->
    <main class="main-content" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
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
          
          <!-- 页面标题 -->
          <h1 class="page-title">搜索</h1>
              </div>
      </header>

    <!-- 主要内容区域 -->
      <div class="content-area">
      <!-- 未搜索状态 -->
      <div v-if="!hasSearched" class="search-placeholder">
        <div class="placeholder-content">
          <v-icon size="64" color="primary" class="placeholder-icon">mdi-magnify</v-icon>
            <h2 class="placeholder-title">开始搜索</h2>
          <p class="placeholder-description">
              在左侧搜索框中输入关键词开始搜索
            </p>
        </div>
      </div>
      
        <!-- 照片墙 -->
        <div class="photo-wall">
          <div class="photo-wall-header">
            <h2 class="photo-wall-title">精选设计作品</h2>
            <p class="photo-wall-subtitle">发现更多创意灵感</p>
          </div>
          
          <div class="photo-grid">
            <div
              v-for="(photo, index) in photoWallData"
              :key="index"
              class="photo-item"
              :class="{ 'large': index % 7 === 0, 'medium': index % 7 === 3 || index % 7 === 6 }"
            >
              <div class="photo-container">
                <img
                  :src="photo.image"
                  :alt="photo.title"
                  class="photo-image"
                  @load="onImageLoad(photo.id)"
                />
                <div class="photo-overlay">
                  <div class="photo-info">
                    <h3 class="photo-title">{{ photo.title }}</h3>
                    <p class="photo-description">{{ photo.description }}</p>
                    <div class="photo-meta">
                      <span class="photo-likes">
                        <v-icon size="small">mdi-heart</v-icon>
                        {{ photo.likes }}
                      </span>
                      <span class="photo-views">
                        <v-icon size="small">mdi-eye</v-icon>
                        {{ photo.views }}
                  </span>
                </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
        
          <!-- 加载更多按钮 -->
          <div class="load-more-container">
            <v-btn
              variant="outlined"
              @click="loadMorePhotos"
              :loading="loadingMore"
              class="load-more-btn"
            >
              <v-icon left>mdi-plus</v-icon>
              加载更多
            </v-btn>
        </div>
      </div>
    </div>
    </main>
  </div>
</template>

<style lang="scss">
// 全局滚动条样式
* {
  scrollbar-width: thin;
  scrollbar-color: #404040 #2a2a2a;
}

*::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

*::-webkit-scrollbar-track {
  background: #2a2a2a;
  border-radius: 2px;
}

*::-webkit-scrollbar-thumb {
  background: #404040;
  border-radius: 2px;
  transition: background 0.3s ease;
    
    &:hover {
    background: #555555;
  }
}

*::-webkit-scrollbar-thumb:active {
  background: #666666;
}

*::-webkit-scrollbar-corner {
  background: #2a2a2a;
}

// Freepik 深色主题布局
.search-page {
  min-height: 100vh;
  background: #1a1a1a;
  color: #ffffff;
  display: flex;
}

// 左侧固定侧边栏 - Freepik 深色风格
.sidebar {
  width: 240px;
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
  transition: width 0.3s ease;
  
  &.collapsed {
    width: 60px;
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
        position: absolute;
  top: 1rem;
  right: 0.75rem;
  z-index: 10;
  
  .toggle-btn {
    color: #cccccc;
    transition: all 0.3s ease;
    background: rgba(42, 42, 42, 0.9);
    border: 1px solid #404040;
    
    &:hover {
      color: #ff6b35;
      background: rgba(255, 107, 53, 0.2);
      border-color: #ff6b35;
    }
  }
}




// 主内容区域
.main-content {
  flex: 1;
  margin-left: 240px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #1a1a1a;
  transition: margin-left 0.3s ease;
  
  &.sidebar-collapsed {
    margin-left: 60px;
  }
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
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 56px;
}

.page-title {
    font-size: 1.25rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
}


// 内容区域
.content-area {
  flex: 1;
  padding: 1.5rem;
  background: #1a1a1a;
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
  color: #ffffff;
    margin-bottom: 1rem;
  }
  
.placeholder-description {
  font-size: 1.125rem;
  color: #cccccc;
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
      color: #ffffff;
    margin-bottom: 0.5rem;
      background: linear-gradient(135deg, #ff6b35, #f7931e);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .photo-wall-subtitle {
      font-size: 1rem;
      color: #cccccc;
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
      background: #2a2a2a;
      transition: all 0.3s ease;
      cursor: pointer;
      
      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        
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
            rgba(0, 0, 0, 0.8) 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
    display: flex;
          align-items: flex-end;
          padding: 1.5rem;
          
          .photo-info {
            color: #ffffff;
            
            .photo-title {
      font-size: 1.25rem;
              font-weight: 600;
    margin-bottom: 0.5rem;
              color: #ffffff;
            }
    
            .photo-description {
      font-size: 0.875rem;
              color: #cccccc;
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
                color: #cccccc;
    
    .v-icon {
                  color: #ff6b35;
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
      background: #2a2a2a;
      border: 1px solid #404040;
      color: #ffffff;
      padding: 0.75rem 2rem;
      font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
        background: #ff6b35;
        border-color: #ff6b35;
        color: #ffffff;
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
    width: 220px;
    
    &.collapsed {
      width: 60px;
    }
  }
  
  .main-content {
    margin-left: 220px;
    
    &.sidebar-collapsed {
      margin-left: 60px;
    }
  }
  
  .content-area {
    padding: 1.5rem;
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
    transition: transform 0.3s ease, width 0.3s ease;
    width: 240px;
    
    &.mobile-open {
      transform: translateX(0);
    }
    
    &.collapsed {
      width: 60px;
    }
  }
  
  
  
  .main-content {
    margin-left: 0;
  }
  
  .header-content {
    padding: 0 1rem;
    height: 64px;
  }
  
  
  .content-area {
    padding: 1rem;
  }
  
  .photo-wall {
    .photo-wall-header {
      margin-bottom: 2rem;
      
      .photo-wall-title {
        font-size: 2rem;
      }
      
      .photo-wall-subtitle {
        font-size: 1rem;
      }
    }
    
    .photo-grid {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 0.875rem;
      
      .photo-item {
        .photo-container {
          min-height: 200px;
        }
        
        .photo-overlay {
          padding: 1rem;
          
          .photo-info {
            .photo-title {
              font-size: 1.125rem;
            }
            
            .photo-description {
              font-size: 0.8rem;
            }
            
            .photo-meta {
              gap: 0.75rem;
              
              .photo-likes,
              .photo-views {
                font-size: 0.8rem;
              }
            }
          }
        }
      }
    }
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
