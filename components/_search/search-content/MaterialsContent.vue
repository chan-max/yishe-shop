<template>
  <div class="materials-content">
    <!-- Header Section -->
    <div class="materials-header">
      <div class="header-content">
        <!-- 移动端菜单按钮 -->
        <v-btn
          variant="text"
          @click="toggleMobileSidebar"
          class="mobile-menu-btn"
          icon
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        
        <!-- 搜索和筛选区域 -->
        <div class="search-filter-container">
          <!-- 筛选按钮 -->
          <v-btn
            variant="text"
            @click="toggleFilter"
            class="filter-toggle-btn"
            :class="{ 'active': showFilterMenu }"
            icon
            size="small"
          >
            <v-icon>{{ showFilterMenu ? 'mdi-tune' : 'mdi-tune-variant' }}</v-icon>
          </v-btn>
          
          <!-- 搜索框 -->
          <div class="search-container">
            <div class="search-box">
              <v-icon class="search-icon">mdi-magnify</v-icon>
              <input
                :value="searchQuery"
                @input="handleSearchInput(($event.target as HTMLInputElement).value)"
                @keydown.enter="performSearch"
                @focus="showSuggestions = true"
                @blur="handleBlur"
                type="text"
                placeholder="搜索素材图片..."
                class="search-input"
              />
              <v-btn
                v-if="searchQuery"
                variant="text"
                @click="clearSearch"
                class="clear-btn"
                icon
                size="small"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
            
            <!-- 搜索建议 -->
            <div v-if="showSuggestions && filteredSuggestions.length > 0" class="search-suggestions">
              <div
                v-for="suggestion in filteredSuggestions.slice(0, 8)"
                :key="suggestion"
                @click="selectSuggestion(suggestion)"
                class="suggestion-item"
              >
                <v-icon class="suggestion-icon">mdi-magnify</v-icon>
                <span class="suggestion-text">{{ suggestion }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 筛选内容 -->
      <div v-if="showFilterMenu" class="filter-content">
        <!-- 筛选标签显示 -->
        <div class="filter-chips" v-if="activeFiltersCount > 0">
          <v-chip
            v-for="(filter, key) in activeFilters"
            :key="key"
            size="small"
            closable
            @click:close="removeFilter(key)"
            class="filter-chip"
          >
            {{ key }}: {{ Array.isArray(filter) ? filter.join(', ') : filter }}
          </v-chip>
        </div>
        
        <div class="filter-row-single">
          <!-- 排序方式 -->
          <div class="filter-group">
            <label class="filter-label">排序</label>
            <v-select
              v-model="materialsFilters.sort"
              :items="filterOptions.sort"
              variant="outlined"
              density="compact"
              hide-details
              placeholder="选择排序方式"
              class="filter-select"
              @update:model-value="applyFilters"
            />
          </div>
          
          <!-- 价格范围输入框 -->
          <div class="filter-group filter-group-range">
            <label class="filter-label">价格范围</label>
            <div class="price-range-container">
              <v-text-field
                v-model.number="filters.priceMin"
                type="number"
                placeholder="最低价"
                class="price-input"
                variant="outlined"
                density="compact"
                hide-details
                @update:model-value="updateFilters(filters)"
              />
              <span class="price-separator">-</span>
              <v-text-field
                v-model.number="filters.priceMax"
                type="number"
                placeholder="最高价"
                class="price-input"
                variant="outlined"
                density="compact"
                hide-details
                @update:model-value="updateFilters(filters)"
              />
            </div>
          </div>
          
          <!-- 素材类型选择 -->
          <div class="filter-group filter-group-chips">
            <label class="filter-label">素材类型</label>
            <div class="style-chips">
              <v-chip
                v-for="type in filterOptions.type"
                :key="type.value"
                :class="{ 'chip-selected': materialsFilters.type.includes(type.value) }"
                @click="toggleStyle(type.value)"
                class="style-chip"
                size="small"
                variant="outlined"
              >
                {{ type.text }}
              </v-chip>
            </div>
          </div>
          
          <!-- 文件格式选择 -->
          <div class="filter-group filter-group-chips">
            <label class="filter-label">文件格式</label>
            <div class="style-chips">
              <v-chip
                v-for="format in filterOptions.format"
                :key="format.value"
                :class="{ 'chip-selected': materialsFilters.format.includes(format.value) }"
                @click="toggleFormat(format.value)"
                class="style-chip"
                size="small"
                variant="outlined"
              >
                {{ format.text }}
              </v-chip>
            </div>
          </div>
          
          <!-- 颜色选择器 -->
          <div class="filter-group filter-group-colors">
            <label class="filter-label">颜色</label>
            <div class="color-picker">
              <div
                v-for="color in filterOptions.color"
                :key="color.value"
                :class="{ 'color-selected': materialsFilters.colors.includes(color.value) }"
                @click="toggleColor(color.value)"
                class="color-option"
                :style="{ backgroundColor: getColorValue(color.value) }"
                :title="color.text"
              />
            </div>
          </div>
          
          <!-- 操作按钮 -->
          <div class="filter-actions-inline">
            <v-btn
              variant="outlined"
              @click="clearFilters"
              class="filter-clear-btn"
              size="small"
              icon
            >
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
            <v-btn
              variant="flat"
              @click="applyFilters"
              class="filter-apply-btn"
              size="small"
              color="primary"
              icon
            >
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </div>

    <!-- 素材图内容主体 -->
    <div class="content-body">
      <!-- 加载状态 -->
      <LoadingSpinner 
        v-if="loading || !hasInitialized" 
        text="正在加载素材图库..."
      />
      
      <!-- 错误状态 -->
      <EmptyState 
        v-else-if="error"
        icon="mdi-alert-circle-outline"
        icon-color="error"
        :show-retry="true"
        @retry="fetchMaterialItems"
      />
      
      <!-- 空状态 -->
      <EmptyState 
        v-else-if="materialItems.length === 0"
        icon="mdi-image-multiple-outline"
      />
      
      <!-- 瀑布流布局 -->
      <masonry-wall 
        v-else
        :items="materialItems" 
        :column-width="300" 
        :gap="12"
        class="materials-masonry"
      >
        <template #default="{ item, index }">
          <div class="material-card" @click="onCardClick(item)">
            <div class="image-container" :class="{ 'loading': !imageLoaded[item.id] }">
              <img
                :src="item.image"
                :alt="item.title"
                class="material-image"
                @load="(event: Event) => onImageLoad(event, item.id)"
                @error="(event: Event) => onImageError(event, item.id)"
                :class="{ 'loaded': imageLoaded[item.id] }"
              />
              
              <!-- 加载状态 -->
              <div v-if="!imageLoaded[item.id]" class="image-loading">
                <div class="loading-spinner"></div>
                <div class="skeleton-content">
                  <div class="skeleton-line skeleton-title"></div>
                  <div class="skeleton-line skeleton-description"></div>
                  <div class="skeleton-meta">
                    <div class="skeleton-tag"></div>
                    <div class="skeleton-tag"></div>
                  </div>
                </div>
              </div>
              
              <!-- 悬停遮罩层 -->
              <div class="image-overlay" :class="{ 'small-image': isSmallImage(item.id) }">
                <!-- 内容信息 -->
                <div class="overlay-content">
                  <h3 class="material-title" :title="item.title">
                    {{ item.title }}
                  </h3>
                  
                  <!-- 描述信息 -->
                  <p 
                    class="material-description" 
                    v-if="item.description"
                  >
                    {{ item.description }}
                  </p>
                  
                  <!-- 关键词信息 -->
                  <div class="material-keywords" v-if="item.keywords">
                    <div class="keywords-label">关键词：</div>
                    <div class="keywords-list">
                      {{ item.keywords }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </masonry-wall>
      
      <!-- 分页 -->
      <div class="pagination-container">
        <ContentPagination
          v-model="currentPage"
          :total="total"
          :page-size="pageSize"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import EmptyState from '../components/EmptyState.vue'
import FilterRow from '../components/FilterRow.vue'
import type { FilterItem } from '../components/FilterRow.vue'
import ContentPagination from '../components/ContentPagination.vue'
import { colorOptions } from '../customConfig/filterOptions'

// Props for header functionality
const props = defineProps<{
  searchQuery: string
  showMobileSidebar: boolean
  filters: any
  filterOptions: any
  activeFilters: any
  activeFiltersCount: number
}>()

// 本地状态管理
const materialsFilters = useLocalStorage('materials-filters', {
  sort: 'latest',
  type: [],
  format: [],
  group: [],
  colors: [],
  priceRange: { min: 0, max: 1000 }
})

// 搜索建议
const searchSuggestions = ref([
  // 素材类型
  '背景图', '纹理', '图标', '插画', '照片', '贴纸', '装饰', 'logo', 'banner',
  // 风格
  '商务', '自然', '科技', '美食', '旅行', '抽象', '极简', '卡通', '复古', '现代',
  // 颜色
  '红色', '蓝色', '绿色', '黄色', '紫色', '橙色', '粉色', '黑色', '白色', '灰色',
  // 用途
  '网页设计', '移动应用', '印刷品', '社交媒体', '电商', '品牌设计'
])

const showSuggestions = ref(false)

// 过滤选项配置
const filterOptions = {
  sort: [
    { value: 'latest', text: '最新发布', apiValue: 'createTime' },
    { value: 'popular', text: '最受欢迎', apiValue: 'downloads' },
    { value: 'rating', text: '评分最高', apiValue: 'rating' },
    { value: 'name_asc', text: '名称：A-Z', apiValue: 'name_asc' },
    { value: 'name_desc', text: '名称：Z-A', apiValue: 'name_desc' }
  ],
  type: [
    { value: 'background', text: '背景图', searchKeyword: '背景 背景图' },
    { value: 'texture', text: '纹理', searchKeyword: '纹理 材质' },
    { value: 'icon', text: '图标', searchKeyword: '图标 icon' },
    { value: 'illustration', text: '插画', searchKeyword: '插画 插图' },
    { value: 'photo', text: '照片', searchKeyword: '照片 摄影' },
    { value: 'sticker', text: '贴纸', searchKeyword: '贴纸 sticker' },
    { value: 'decoration', text: '装饰', searchKeyword: '装饰 装饰品' },
    { value: 'logo', text: 'Logo', searchKeyword: 'logo 标志' },
    { value: 'banner', text: '横幅', searchKeyword: '横幅 banner' }
  ],
  format: [
    { value: 'png', text: 'PNG', searchKeyword: 'PNG' },
    { value: 'jpg', text: 'JPG', searchKeyword: 'JPG JPEG' },
    { value: 'svg', text: 'SVG', searchKeyword: 'SVG 矢量' },
    { value: 'gif', text: 'GIF', searchKeyword: 'GIF 动图' },
    { value: 'webp', text: 'WEBP', searchKeyword: 'WEBP' },
    { value: 'bmp', text: 'BMP', searchKeyword: 'BMP' }
  ],
  group: [
    { value: 'business', text: '商务', searchKeyword: '商务 商业' },
    { value: 'nature', text: '自然', searchKeyword: '自然 风景' },
    { value: 'technology', text: '科技', searchKeyword: '科技 技术' },
    { value: 'food', text: '美食', searchKeyword: '美食 食物' },
    { value: 'travel', text: '旅行', searchKeyword: '旅行 旅游' },
    { value: 'abstract', text: '抽象', searchKeyword: '抽象 艺术' },
    { value: 'minimalist', text: '极简', searchKeyword: '极简 简约' },
    { value: 'cartoon', text: '卡通', searchKeyword: '卡通 动漫' },
    { value: 'vintage', text: '复古', searchKeyword: '复古 怀旧' },
    { value: 'modern', text: '现代', searchKeyword: '现代 时尚' },
    { value: 'holiday', text: '节日', searchKeyword: '节日 庆典' },
    { value: 'education', text: '教育', searchKeyword: '教育 学习' }
  ],
  color: [
    { value: 'red', text: '红色', searchKeyword: '红色 红' },
    { value: 'blue', text: '蓝色', searchKeyword: '蓝色 蓝' },
    { value: 'green', text: '绿色', searchKeyword: '绿色 绿' },
    { value: 'yellow', text: '黄色', searchKeyword: '黄色 黄' },
    { value: 'purple', text: '紫色', searchKeyword: '紫色 紫' },
    { value: 'orange', text: '橙色', searchKeyword: '橙色 橙' },
    { value: 'pink', text: '粉色', searchKeyword: '粉色 粉' },
    { value: 'black', text: '黑色', searchKeyword: '黑色 黑' },
    { value: 'white', text: '白色', searchKeyword: '白色 白' },
    { value: 'gray', text: '灰色', searchKeyword: '灰色 灰' },
    { value: 'brown', text: '棕色', searchKeyword: '棕色 棕' },
    { value: 'teal', text: '青色', searchKeyword: '青色 青' }
  ]
}

// 计算属性
const filteredSuggestions = computed(() => {
  if (!props.searchQuery.trim()) return []
  return searchSuggestions.value.filter(suggestion =>
    suggestion.toLowerCase().includes(props.searchQuery.toLowerCase())
  )
})

const activeFilters = computed(() => {
  const active: any = {}
  Object.keys(materialsFilters.value).forEach(key => {
    if (key === 'priceRange') return
    const value = materialsFilters.value[key]
    if (Array.isArray(value) && value.length > 0) {
      active[key] = value
    } else if (!Array.isArray(value) && value) {
      active[key] = value
    }
  })
  return active
})

const activeFiltersCount = computed(() => {
  return Object.keys(activeFilters.value).length
})

// Local state for filter menu with localStorage persistence
const showFilterMenu = useLocalStorage('materials-filter-menu', false)

// Emits for header functionality
const emit = defineEmits<{
  'update:searchQuery': [value: string]
  'perform-search': []
  'clear-search': []
  'toggle-mobile-sidebar': []
  'update:filters': [filters: any]
  'remove-filter': [key: string]
  'clear-filters': []
  'apply-filters': []
  'toggle-style': [style: string]
  'toggle-color': [color: string]
}>()

// Header methods
const handleSearchInput = (value: string) => {
  emit('update:searchQuery', value)
  showSuggestions.value = true
}

// 选择搜索建议
const selectSuggestion = (suggestion: string) => {
  emit('update:searchQuery', suggestion)
  showSuggestions.value = false
  performSearch()
}

// 处理搜索框失焦
const handleBlur = () => {
  setTimeout(() => {
    showSuggestions.value = false
  }, 200)
}

// 构建搜索关键词
const buildSearchKeywords = () => {
  const keywords: string[] = []
  
  // 添加搜索查询
  if (props.searchQuery.trim()) {
    keywords.push(props.searchQuery.trim())
  }
  
  // 添加过滤条件对应的搜索关键词
  const addKeywordsFromFilter = (filterValues: string[], filterOptions: any[]) => {
    if (filterValues && filterValues.length > 0) {
      filterValues.forEach(value => {
        const option = filterOptions.find(opt => opt.value === value)
        if (option && option.searchKeyword) {
          keywords.push(option.searchKeyword)
        }
      })
    }
  }
  
  // 添加各种过滤条件的关键词
  addKeywordsFromFilter(materialsFilters.value.type, filterOptions.type)
  addKeywordsFromFilter(materialsFilters.value.format, filterOptions.format)
  addKeywordsFromFilter(materialsFilters.value.group, filterOptions.group)
  addKeywordsFromFilter(materialsFilters.value.color, filterOptions.color)
  
  return keywords.join(' ')
}

const toggleFilter = () => {
  showFilterMenu.value = !showFilterMenu.value
}

const performSearch = async () => {
  if (!props.searchQuery.trim()) {
    materialItems.value = []
    hasSearched.value = false
    return
  }

  loading.value = true
  hasSearched.value = true
  
  try {
    const { $customFetch } = useNuxtApp()
    
    // 构建请求参数
    const requestBody: any = {
      currentPage: 1,
      pageSize: pageSize.value,
      isPublish: true
    }
    
    // 添加搜索关键词
    const searchKeywords = buildSearchKeywords()
    if (searchKeywords.trim()) {
      requestBody.search = searchKeywords.trim()
    }
    
    // 添加排序
    if (materialsFilters.value.sort) {
      const sortOption = filterOptions.sort.find(s => s.value === materialsFilters.value.sort)
      if (sortOption && sortOption.apiValue) {
        requestBody.sortingFields = `${sortOption.apiValue} DESC`
      }
    }
    
    console.log('搜索请求参数:', requestBody)

    const response = await $customFetch('/sticker/page', {
      method: 'POST',
      body: requestBody
    }) as any

    // 转换数据格式以适配素材显示
    materialItems.value = (response.list || []).map((item: any): MaterialItem => ({
      id: item.id,
      title: item.name || '未命名素材',
      description: item.description || '高质量设计素材',
      image: item.url || 'https://via.placeholder.com/300x200/ff6b6b/ffffff?text=Material',
      format: item.suffix?.toUpperCase() || 'UNKNOWN',
      group: item.group || '未分组',
      price: 0, // 素材图暂时免费
      downloads: Math.floor(Math.random() * 1000) + 100, // 模拟下载数
      keywords: item.keywords || '',
      isTexture: item.isTexture || false,
      isCustom: item.isCustom || false,
      isInfringement: item.isInfringement || false,
      createTime: item.createTime,
      uploader: item.uploader,
      phash: item.phash,
      meta: item.meta,
      isPublic: item.isPublic
    }))

    total.value = response.total || 0
    currentPage.value = 1
    hasInitialized.value = true
    
  } catch (error) {
    console.error('搜索素材失败:', error)
    materialItems.value = []
    total.value = 0
    hasInitialized.value = true
  } finally {
    loading.value = false
  }
}

const clearSearch = () => {
  // 清空搜索查询
  emit('update:searchQuery', '')
  // 重置搜索状态
  hasSearched.value = false
  // 重新获取默认的素材列表（不包含搜索关键词）
  fetchMaterialItemsWithoutSearch()
}

// 获取素材列表（不包含搜索关键词）
const fetchMaterialItemsWithoutSearch = async () => {
  loading.value = true
  try {
    const { $customFetch } = useNuxtApp()
    
    // 构建请求参数
    const requestBody: any = {
      currentPage: currentPage.value,
      pageSize: pageSize.value,
      isPublish: true
    }
    
    // 不添加搜索关键词，只添加过滤条件
    const keywords: string[] = []
    
    // 添加过滤条件对应的搜索关键词
    const addKeywordsFromFilter = (filterValues: string[], filterOptions: any[]) => {
      if (filterValues && filterValues.length > 0) {
        filterValues.forEach(value => {
          const option = filterOptions.find(opt => opt.value === value)
          if (option && option.searchKeyword) {
            keywords.push(option.searchKeyword)
          }
        })
      }
    }
    
    // 添加各种过滤条件的关键词
    addKeywordsFromFilter(materialsFilters.value.type, filterOptions.type)
    addKeywordsFromFilter(materialsFilters.value.format, filterOptions.format)
    addKeywordsFromFilter(materialsFilters.value.group, filterOptions.group)
    addKeywordsFromFilter(materialsFilters.value.color, filterOptions.color)
    
    if (keywords.length > 0) {
      requestBody.search = keywords.join(' ')
    }
    
    // 添加排序
    if (materialsFilters.value.sort) {
      const sortOption = filterOptions.sort.find(s => s.value === materialsFilters.value.sort)
      if (sortOption && sortOption.apiValue) {
        requestBody.sortingFields = `${sortOption.apiValue} DESC`
      }
    }
    
    console.log('清除搜索后的请求参数:', requestBody)

    const response = await $customFetch('/sticker/page', {
      method: 'POST',
      body: requestBody
    }) as any

    // 转换数据格式以适配素材显示
    materialItems.value = (response.list || []).map((item: any): MaterialItem => ({
      id: item.id,
      title: item.name || '未命名素材',
      description: item.description || '高质量设计素材',
      image: item.url || 'https://via.placeholder.com/300x200/ff6b6b/ffffff?text=Material',
      format: item.suffix?.toUpperCase() || 'UNKNOWN',
      group: item.group || '未分组',
      price: 0, // 素材图暂时免费
      downloads: Math.floor(Math.random() * 1000) + 100, // 模拟下载数
      keywords: item.keywords || '',
      isTexture: item.isTexture || false,
      isCustom: item.isCustom || false,
      isInfringement: item.isInfringement || false,
      createTime: item.createTime,
      uploader: item.uploader,
      phash: item.phash,
      meta: item.meta,
      isPublic: item.isPublic
    }))

    total.value = response.total || 0
    hasInitialized.value = true
    
  } catch (error) {
    console.error('获取素材列表失败:', error)
    materialItems.value = []
    total.value = 0
    hasInitialized.value = true
  } finally {
    loading.value = false
  }
}

const toggleMobileSidebar = () => {
  emit('toggle-mobile-sidebar')
}

const updateFilters = (filters: any) => {
  emit('update:filters', filters)
}

const removeFilter = (key: string) => {
  if (Array.isArray(materialsFilters.value[key])) {
    materialsFilters.value[key] = []
  } else {
    materialsFilters.value[key] = ''
  }
  // 如果有搜索结果，重新搜索
  if (hasSearched.value) {
    performSearch()
  }
}

const clearFilters = () => {
  materialsFilters.value = {
    sort: 'latest',
    type: [],
    format: [],
    group: [],
    colors: [],
    priceRange: { min: 0, max: 1000 }
  }
  // 如果有搜索结果，重新搜索
  if (hasSearched.value) {
    performSearch()
  }
}

const applyFilters = () => {
  // 如果有搜索结果，重新搜索
  if (hasSearched.value) {
    performSearch()
  }
  // 关闭过滤菜单
  showFilterMenu.value = false
}

const toggleStyle = (style: string) => {
  const index = materialsFilters.value.type.indexOf(style)
  if (index > -1) {
    materialsFilters.value.type.splice(index, 1)
  } else {
    materialsFilters.value.type.push(style)
  }
  // 如果有搜索结果，重新搜索
  if (hasSearched.value) {
    performSearch()
  }
}

const toggleColor = (color: string) => {
  const index = materialsFilters.value.colors.indexOf(color)
  if (index > -1) {
    materialsFilters.value.colors.splice(index, 1)
  } else {
    materialsFilters.value.colors.push(color)
  }
  // 如果有搜索结果，重新搜索
  if (hasSearched.value) {
    performSearch()
  }
}

const toggleFormat = (format: string) => {
  const index = materialsFilters.value.format.indexOf(format)
  if (index > -1) {
    materialsFilters.value.format.splice(index, 1)
  } else {
    materialsFilters.value.format.push(format)
  }
  // 如果有搜索结果，重新搜索
  if (hasSearched.value) {
    performSearch()
  }
}

// 获取颜色值
const getColorValue = (colorKey: string) => {
  const colorMap: Record<string, string> = {
    'red': '#ff4757',
    'blue': '#3742fa',
    'green': '#2ed573',
    'yellow': '#ffa502',
    'purple': '#9c88ff',
    'orange': '#ff6348',
    'pink': '#ff6b9d',
    'black': '#2c2c2c',
    'white': '#ffffff',
    'gray': '#95a5a6',
    'brown': '#8b4513',
    'teal': '#17a2b8'
  }
  return colorMap[colorKey] || colorKey
}

// 类型定义
interface MaterialItem {
  id: string
  title: string
  description: string
  image: string
  format: string
  group: string
  price: number
  downloads: number
  keywords: string
  isTexture: boolean
  isCustom: boolean
  isInfringement: boolean
  createTime: Date
  uploader: any
  phash: string
  meta: any
  isPublic: boolean
}

interface StickerResponse {
  list: any[]
  total: number
}

interface RequestBody {
  currentPage: number
  pageSize: number
  isPublish: boolean
  keyword?: string
  suffix?: string
  group?: string
  sortingFields?: string
}

// 筛选配置
const materialFilters: FilterItem[] = [
  {
    key: 'materialType',
    label: '素材类型',
    type: 'select',
    placeholder: '选择类型',
    items: [
      { text: '背景图', value: 'background' },
      { text: '纹理', value: 'texture' },
      { text: '图标', value: 'icon' },
      { text: '插画', value: 'illustration' },
      { text: '照片', value: 'photo' },
      { text: '贴纸', value: 'sticker' },
      { text: '装饰', value: 'decoration' }
    ]
  },
  {
    key: 'format',
    label: '文件格式',
    type: 'select',
    placeholder: '选择格式',
    items: [
      { text: 'PNG', value: 'png' },
      { text: 'JPG', value: 'jpg' },
      { text: 'JPEG', value: 'jpeg' },
      { text: 'SVG', value: 'svg' },
      { text: 'GIF', value: 'gif' },
      { text: 'WEBP', value: 'webp' },
      { text: 'BMP', value: 'bmp' }
    ]
  },
  {
    key: 'group',
    label: '分组',
    type: 'select',
    placeholder: '选择分组',
    items: [
      { text: '商务', value: 'business' },
      { text: '自然', value: 'nature' },
      { text: '科技', value: 'technology' },
      { text: '美食', value: 'food' },
      { text: '旅行', value: 'travel' },
      { text: '抽象', value: 'abstract' },
      { text: '极简', value: 'minimalist' },
      { text: '卡通', value: 'cartoon' },
      { text: '复古', value: 'vintage' },
      { text: '现代', value: 'modern' },
      { text: '节日', value: 'holiday' },
      { text: '教育', value: 'education' }
    ]
  },
  {
    key: 'colors',
    label: '颜色',
    type: 'color-picker',
    colorOptions: [
      { value: 'red', color: '#ff4757', text: '红色' },
      { value: 'blue', color: '#3742fa', text: '蓝色' },
      { value: 'green', color: '#2ed573', text: '绿色' },
      { value: 'yellow', color: '#ffa502', text: '黄色' },
      { value: 'purple', color: '#9c88ff', text: '紫色' },
      { value: 'orange', color: '#ff6348', text: '橙色' },
      { value: 'pink', color: '#ff6b9d', text: '粉色' },
      { value: 'teal', color: '#17a2b8', text: '青色' },
      { value: 'black', color: '#2c2c2c', text: '黑色' },
      { value: 'white', color: '#ffffff', text: '白色' },
      { value: 'gray', color: '#95a5a6', text: '灰色' },
      { value: 'brown', color: '#8b4513', text: '棕色' }
    ]
  }
]

// 筛选状态
const filters = reactive({
  materialType: '',
  format: '',
  group: '',
  colors: [] as string[]
})

// 分页相关状态
const currentPage = ref(1)
const pageSize = ref(36)
const total = ref(0)
const loading = ref(false)
const hasInitialized = ref(false)
const hasSearched = ref(false)
const error = ref('')

// 素材项目数据
const materialItems = ref<MaterialItem[]>([])

// 图片加载状态
const imageLoaded = ref<Record<string, boolean>>({})

// 图片高度状态
const imageHeights = ref<Record<string, number>>({})

// 检查是否为小图片
const isSmallImage = (itemId: string) => {
  const height = imageHeights.value[itemId]
  return height && height < 150
}



// 获取素材列表
const fetchMaterialItems = async () => {
  loading.value = true
  error.value = ''
  try {
    const { $customFetch } = useNuxtApp()
    
    // 构建请求参数，参考 sticker.service.ts 中的 getPage 方法
    const requestBody: RequestBody = {
      currentPage: currentPage.value,
      pageSize: pageSize.value,
      isPublish: true // 传入true，代表是公开的内容
    }
    
    // 添加筛选条件 - 根据 sticker 接口支持的参数
    if (filters.materialType) {
      const typeMapping: Record<string, string> = {
        'background': '背景',
        'texture': '纹理',
        'icon': '图标',
        'illustration': '插画',
        'photo': '照片',
        'sticker': '贴纸',
        'decoration': '装饰'
      }
      requestBody.keyword = typeMapping[filters.materialType] || filters.materialType
    }
    
    // 文件格式筛选 - 使用 suffix 字段
    if (filters.format) {
      requestBody.suffix = filters.format.toLowerCase()
    }
    
    // 分组筛选 - 使用 group 字段
    if (filters.group) {
      requestBody.group = filters.group
    }
    
    // 颜色筛选 - 通过关键词搜索
    if (filters.colors && filters.colors.length > 0) {
      const colorKeywords = filters.colors.map((color: string) => {
        const colorOption = materialFilters.find(f => f.key === 'colors')?.colorOptions?.find((opt: any) => opt.value === color)
        return colorOption ? colorOption.text : color
      })
      
      if (requestBody.keyword) {
        requestBody.keyword += ' ' + colorKeywords.join(' ')
      } else {
        requestBody.keyword = colorKeywords.join(' ')
      }
    }
    
    // 添加排序 - 默认按创建时间降序
    requestBody.sortingFields = 'createTime DESC'
    
    const response = await $customFetch("/sticker/page", {
      method: "POST",
      body: requestBody,
    }) as StickerResponse
    
    // 转换数据格式以适配素材显示
    materialItems.value = (response.list || []).map((item: any): MaterialItem => ({
      id: item.id,
      title: item.name || '未命名素材',
      description: item.description || '高质量设计素材',
      image: item.url || 'https://via.placeholder.com/300x200/ff6b6b/ffffff?text=Material',
      format: item.suffix?.toUpperCase() || 'UNKNOWN',
      group: item.group || '未分组',
      price: 0, // 素材图暂时免费
      downloads: Math.floor(Math.random() * 1000) + 100, // 模拟下载数
      keywords: item.keywords || '',
      isTexture: item.isTexture || false,
      isCustom: item.isCustom || false,
      isInfringement: item.isInfringement || false,
      createTime: item.createTime,
      uploader: item.uploader,
      // 添加更多 sticker 特有字段
      phash: item.phash,
      meta: item.meta,
      isPublic: item.isPublic
    }))
    
    total.value = response.total || 0
    hasInitialized.value = true
  } catch (err: any) {
    console.error("获取素材列表失败:", err)
    error.value = err.message || '获取素材列表失败，请稍后重试'
    // 设置空数据而不是保持旧数据
    materialItems.value = []
    total.value = 0
    hasInitialized.value = true
  } finally {
    loading.value = false
  }
}

// 图片加载成功处理
const onImageLoad = (event: Event, itemId: string) => {
  imageLoaded.value[itemId] = true
  const img = event.target as HTMLImageElement
  if (img) {
    imageHeights.value[itemId] = img.naturalHeight
  }
}

// 图片加载失败处理
const onImageError = (event: Event, itemId: string) => {
  console.error("图片加载失败:", event)
  imageLoaded.value[itemId] = false
}

// 检查是否有有效图片
const hasValidImage = (item: MaterialItem) => {
  return item.image && !item.image.includes('placeholder')
}

// 获取图片加载状态
const getImageLoadStatus = (itemId: string) => {
  return imageLoaded.value[itemId] || false
}

// 卡片操作处理
const onCardAction = (actionType: string, item: MaterialItem) => {
  console.log('卡片操作:', actionType, item)
  // 这里可以添加具体的操作逻辑
}

// 卡片点击处理
const onCardClick = (item: MaterialItem) => {
  console.log('卡片点击:', item)
  // 这里可以添加卡片点击的具体逻辑，比如跳转到详情页
}

// 下载处理
const onDownload = (item: MaterialItem) => {
  console.log('下载素材:', item)
  // 这里可以添加下载逻辑
  // 例如：window.open(item.image, '_blank')
}

// 预览处理
const onPreview = (item: MaterialItem) => {
  console.log('预览素材:', item)
  // 这里可以添加预览逻辑，比如打开预览弹窗
}

// 监听筛选条件变化
watch(() => materialsFilters.value, () => {
  currentPage.value = 1 // 重置到第一页
  fetchMaterialItemsWithoutSearch()
}, { deep: true })

// 监听分页变化
watch(currentPage, () => {
  if (hasSearched.value) {
    performSearch()
  } else {
    fetchMaterialItemsWithoutSearch()
  }
})

// 初始化加载
onMounted(() => {
  fetchMaterialItemsWithoutSearch()
})
</script>

<style lang="scss" scoped>
@use './content-areas.scss';

.materials-content {
  /* Header Styles */
  .materials-header {
    background: var(--bg-primary);
    position: sticky;
    top: 0;
    z-index: 1001;
    box-shadow: 0 2px 8px var(--shadow-primary);
    backdrop-filter: blur(10px);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .header-content {
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    height: 64px; /* 增加头部高度，从 56px 到 64px */
    position: relative;
  }

  .mobile-menu-btn {
    display: none;
    color: var(--text-secondary) !important;
    position: absolute;
    left: 1rem;
    
    &:hover {
      color: var(--text-primary) !important;
      background: var(--bg-hover) !important;
    }
  }

  .search-filter-container {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    max-width: 600px;
    margin: 0 auto;
  }

  .filter-toggle-btn {
    color: var(--text-secondary) !important;
    flex-shrink: 0;
    
    &.active {
      color: var(--theme-primary) !important;
      background: var(--bg-hover) !important;
    }
    
    &:hover {
      color: var(--theme-primary) !important;
      background: var(--bg-hover) !important;
    }
  }

  .search-container {
    flex: 1;
    position: relative;
  }

  // 搜索建议样式
  .search-suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--bg-primary);
    border: 1px solid var(--border-secondary);
    border-radius: 8px;
    box-shadow: 0 4px 12px var(--shadow-primary);
    z-index: 1000;
    max-height: 300px;
    overflow-y: auto;
    margin-top: 4px;
  }

  .suggestion-item {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: background-color 0.2s ease;
    border-bottom: 1px solid var(--border-secondary);

    &:hover {
      background: var(--bg-hover);
    }

    &:last-child {
      border-bottom: none;
    }
  }

  .suggestion-icon {
    color: var(--text-tertiary);
    margin-right: 0.75rem;
    font-size: 1rem;
  }

  .suggestion-text {
    color: var(--text-primary);
    font-size: 0.9rem;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .search-box {
    display: flex;
    align-items: center;
    background: var(--input-bg);
    border: 1px solid var(--border-secondary);
    border-radius: 6px;
    padding: 0.375rem 0.5rem;
    min-width: 280px;

    &:hover {
      background: var(--input-bg-hover);
    }

    &:focus-within {
      background: var(--input-bg-focus);
      border-color: var(--theme-primary);
      box-shadow: 0 0 0 2px var(--border-hover);
    }
  }

  .search-icon {
    color: var(--text-tertiary);
    margin-right: 0.5rem;
    font-size: 1rem;
    
    .search-box:hover & {
      color: var(--text-secondary);
    }
    
    .search-box:focus-within & {
      color: var(--theme-primary);
    }
  }

  .search-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: var(--text-primary);
    font-size: 0.9rem;
    height: 32px; /* 固定高度 */
    min-height: 32px; /* 最小高度 */
    max-height: 32px; /* 最大高度 */
    resize: none; /* 禁止调整大小 */
    overflow: hidden; /* 隐藏溢出内容 */
    
    &::placeholder {
      color: var(--text-muted);
    }
    
    &:focus {
      color: var(--text-primary);
      
      &::placeholder {
        color: var(--text-tertiary);
      }
    }
  }

  .clear-btn {
    color: var(--text-tertiary) !important;
    margin-left: 0.5rem;
    
    &:hover {
      color: var(--text-primary) !important;
      background: var(--bg-hover) !important;
    }
  }

  /* Filter content styles */
  .filter-content {
    padding: 0.75rem 1.5rem 1rem 1.5rem; /* 增加左右边距，与瀑布流内容对齐 */
    background: var(--bg-primary);
  }

  .filter-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    padding-bottom: 0.5rem;
  }

  .filter-chip {
    background: var(--theme-primary) !important;
    color: var(--text-primary) !important;
    
    &:hover {
      background: var(--theme-primary-hover) !important;
    }
  }

  .filter-row-single {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: end;
    padding-bottom: 0.75rem;
  }

  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-width: 150px;
  }

  .filter-label {
    font-size: 0.9rem;
    color: var(--text-secondary);
    font-weight: 500;
  }

  .filter-select {
    min-width: 150px;
  }

  .price-range-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .price-input {
    min-width: 80px;
  }

  .price-separator {
    color: #999;
    font-weight: 500;
  }

  .style-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .style-chip {
    cursor: pointer;
    
    &.chip-selected {
      background: var(--theme-primary) !important;
      color: var(--text-primary) !important;
    }
  }

  .color-picker {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .color-option {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid transparent;
    
    &:hover {
      transform: scale(1.1);
    }
    
    &.color-selected {
      border-color: var(--theme-primary);
      box-shadow: 0 0 0 2px var(--border-hover);
    }
  }

  .filter-actions-inline {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .filter-clear-btn {
    color: var(--text-tertiary) !important;
    
    &:hover {
      color: var(--text-primary) !important;
      background: var(--bg-hover) !important;
    }
  }

  .filter-apply-btn {
    background: var(--theme-primary) !important;
    color: var(--text-primary) !important;
    
    &:hover {
      background: var(--theme-primary-hover) !important;
    }
  }

  /* Content body styles - 内容自然跟随头部 */
  
  .content-filters {
    margin-bottom: 2rem;
  }
  
  .pagination-container {
    padding: 2rem 0 3rem 0; /* 增加分页组件的上下间距，底部更多 */
  }
  
  .filter-row {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    align-items: end;
  }
  
  .filter-group {
    min-width: 150px;
    
    .filter-label {
      display: block;
      color: #e0e0e0;
      font-size: 0.85rem;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    
    .color-picker {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      
      .color-option {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        cursor: pointer;
        border: 2px solid transparent;
        transition: all 0.3s ease;
        
        &:hover {
          transform: scale(1.1);
        }
        
        &.active {
          border-color: #ffffff;
          box-shadow: 0 0 0 2px #3b82f6;
        }
      }
    }
  }
  
  .content-body {
    .materials-masonry {
      padding: 24px 1.5rem 0 1.5rem; /* 增加瀑布流内容的上下左右边距 */
      /* 瀑布流项目样式 */
      :deep(.masonry-item) {
        .material-card {
          width: 100%;
          height: 100%;
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.1);
          
          &:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4), 0 0 0 2px #3b82f6;
            border-color: #3b82f6;
            
            .image-overlay {
              opacity: 1;
            }
          }
        }
        
        .image-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: #1a1a1a;
          
          &.loading {
            min-height: 200px;
          }
          
          .material-image {
            width: 100%;
            height: auto;
            display: block;
            transition: all 0.3s ease;
            opacity: 0;
            
            &.loaded {
              opacity: 1;
            }
          }
          
          .image-loading {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
            
            .loading-spinner {
              width: 32px;
              height: 32px;
              border: 3px solid rgba(255, 255, 255, 0.1);
              border-top: 3px solid #3b82f6;
              border-radius: 50%;
              animation: spin 1s linear infinite;
              margin-bottom: 12px;
            }
            
            .skeleton-content {
              position: absolute;
              bottom: 12px;
              left: 12px;
              right: 12px;
              
              .skeleton-line {
                background: linear-gradient(90deg, rgba(255, 255, 255, 0.1) 25%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 75%);
                background-size: 200% 100%;
                animation: skeleton-loading 1.5s infinite;
                border-radius: 4px;
                margin-bottom: 8px;
                
                &.skeleton-title {
                  height: 16px;
                  width: 70%;
                }
                
                &.skeleton-description {
                  height: 12px;
                  width: 85%;
                }
              }
              
              .skeleton-meta {
                display: flex;
                gap: 8px;
                margin-top: 8px;
                
                .skeleton-tag {
                  height: 20px;
                  width: 60px;
                  background: linear-gradient(90deg, rgba(255, 255, 255, 0.1) 25%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 75%);
                  background-size: 200% 100%;
                  animation: skeleton-loading 1.5s infinite;
                  border-radius: 10px;
                }
              }
            }
          }
          
            .image-overlay {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: linear-gradient(
                to bottom,
                rgba(0, 0, 0, 0.05) 0%,
                rgba(0, 0, 0, 0.2) 60%,
                rgba(0, 0, 0, 0.9) 100%
              );
              display: flex;
              flex-direction: column;
              justify-content: flex-end;
              align-items: flex-start;
              padding: 12px;
              opacity: 0;
              transition: opacity 0.3s ease;
              
              &.small-image {
                padding: 8px;
                justify-content: flex-end;
                
                .overlay-content {
                  position: absolute;
                  bottom: 8px;
                  left: 8px;
                  right: 8px;
                }
              }
            
            
            .overlay-content {
              text-align: left;
              max-width: 100%;
              
              .material-title {
                font-size: 14px;
                font-weight: 600;
                color: #ffffff;
                margin: 0 0 6px 0;
                line-height: 1.3;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
                
                .small-image & {
                  font-size: 12px;
                  margin: 0 0 4px 0;
                  -webkit-line-clamp: 1;
                  line-clamp: 1;
                }
              }
              
              .material-description {
                font-size: 11px;
                color: #b0b0b0;
                margin: 0 0 8px 0;
                line-height: 1.4;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
                
                .small-image & {
                  -webkit-line-clamp: 1;
                  line-clamp: 1;
                  margin: 0 0 6px 0;
                }
              }
              
              .material-keywords {
                .keywords-label {
                  font-size: 10px;
                  color: #888;
                  margin-bottom: 4px;
                  font-weight: 500;
                }
                
                .keywords-list {
                  font-size: 10px;
                  color: #aaa;
                  line-height: 1.3;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  line-clamp: 2;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  
                  .small-image & {
                    -webkit-line-clamp: 1;
                    line-clamp: 1;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes skeleton-loading {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  /* Responsive adjustments */
  @media (max-width: 1024px) {
    .materials-header {
      left: 200px;
    }
  }

  @media (max-width: 900px) {
    .materials-header {
      left: 180px;
    }
  }

  @media (max-width: 768px) {
    .materials-header {
      left: 0;
    }
    
    .mobile-menu-btn {
      display: block;
    }
    
    .header-content {
      padding: 0.75rem 1rem;
      min-height: 60px;
      gap: 0.75rem;
    }
    
    .search-filter-container {
      gap: 0.5rem;
      max-width: none;
      margin-left: 3rem; /* 为移动端菜单按钮留出空间 */
    }
    
    .search-box {
      min-width: 200px;
    }
    
    .filter-row-single {
      flex-direction: column;
      align-items: stretch;
    }
    
    .filter-group {
      min-width: auto;
    }
  }

  @media (max-width: 480px) {
    .header-content {
      padding: 0.625rem 0.75rem;
      min-height: 56px;
      gap: 0.5rem;
    }
    
    .search-box {
      min-width: 150px;
    }
  }
}


</style>

