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
                type="text"
                placeholder="搜索素材图片..."
                class="search-input"
                @keyup.enter="performSearch"
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
            {{ filter.label }}: {{ filter.value }}
          </v-chip>
        </div>
        
        <div class="filter-row-single">
          <!-- 排序方式 -->
          <div class="filter-group">
            <label class="filter-label">排序</label>
            <v-select
              v-model="filters.sort"
              :items="filterOptions.sort"
              variant="outlined"
              density="compact"
              hide-details
              placeholder="选择排序方式"
              class="filter-select"
              @update:model-value="updateFilters(filters)"
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
          
          <!-- 风格标签选择 -->
          <div class="filter-group filter-group-chips">
            <label class="filter-label">风格</label>
            <div class="style-chips">
              <v-chip
                v-for="style in filterOptions.style"
                :key="style.value"
                :class="{ 'chip-selected': filters.styles.includes(style.value) }"
                @click="toggleStyle(style.value)"
                class="style-chip"
                size="small"
                variant="outlined"
              >
                {{ style.text }}
              </v-chip>
            </div>
          </div>
          
          <!-- 颜色选择器 -->
          <div class="filter-group filter-group-colors">
            <label class="filter-label">颜色</label>
            <div class="color-picker">
              <div
                v-for="color in colorOptions"
                :key="color.value"
                :class="{ 'color-selected': filters.colors.includes(color.value) }"
                @click="toggleColor(color.value)"
                class="color-option"
                :style="{ backgroundColor: color.value }"
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
import FilterRow from '../components/FilterRow.vue'
import type { FilterItem } from '../components/FilterRow.vue'
import ContentPagination from '../components/ContentPagination.vue'
import { colorOptions } from '../customConfig/filterOptions'

// Props for header functionality
const props = defineProps<{
  searchQuery: string
  showFilterMenu: boolean
  showMobileSidebar: boolean
  filters: any
  filterOptions: any
  activeFilters: any
  activeFiltersCount: number
}>()

// Emits for header functionality
const emit = defineEmits<{
  'update:searchQuery': [value: string]
  'toggle-filter-menu': []
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
}

const toggleFilter = () => {
  emit('toggle-filter-menu')
}

const performSearch = () => {
  emit('perform-search')
}

const clearSearch = () => {
  emit('clear-search')
}

const toggleMobileSidebar = () => {
  emit('toggle-mobile-sidebar')
}

const updateFilters = (filters: any) => {
  emit('update:filters', filters)
}

const removeFilter = (key: string) => {
  emit('remove-filter', key)
}

const clearFilters = () => {
  emit('clear-filters')
}

const applyFilters = () => {
  emit('apply-filters')
}

const toggleStyle = (style: string) => {
  emit('toggle-style', style)
}

const toggleColor = (color: string) => {
  emit('toggle-color', color)
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
watch(filters, () => {
  currentPage.value = 1 // 重置到第一页
  fetchMaterialItems()
}, { deep: true })

// 监听分页变化
watch(currentPage, () => {
  fetchMaterialItems()
})

// 初始化加载
onMounted(() => {
  fetchMaterialItems()
})
</script>

<style lang="scss" scoped>
@use './content-areas.scss';

.materials-content {
  /* Header Styles */
  .materials-header {
    background: var(--bg-primary);
    position: fixed;
    top: 0;
    left: 240px;
    right: 0;
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
    height: 56px;
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

  .search-box {
    display: flex;
    align-items: center;
    background: var(--input-bg);
    border: 1px solid var(--border-secondary);
    border-radius: 8px;
    padding: 0.5rem 0.75rem;
    min-width: 300px;

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
    padding: 0.75rem 0.75rem 1.5rem 0.75rem;
    background: var(--bg-primary);
  }

  .filter-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
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
    padding-bottom: 1.5rem;
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

  /* Content body styles */
  .content-body {
    margin-top: 56px; /* 为固定头部留出空间 */
  }
  
  .content-filters {
    margin-bottom: 2rem;
    
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
  }
  
  .content-body {
    .materials-masonry {
      // 瀑布流项目样式
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

