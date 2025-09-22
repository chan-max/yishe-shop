<template>
  <div class="clothing-content">
    <!-- Header Section -->
    <div class="clothing-header">
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
          <!-- Filter button -->
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
          
          <!-- Search box -->
          <div class="search-container">
            <div class="search-box">
              <v-icon class="search-icon">mdi-magnify</v-icon>
              <input
                :value="searchQuery"
                @input="handleSearchInput(($event.target as HTMLInputElement).value)"
                type="text"
                placeholder="Search fashion designs..."
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
      
      <!-- Filter content -->
      <div v-if="showFilterMenu" class="filter-content">
        <!-- Filter chips display -->
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
          <!-- Sort options -->
          <div class="filter-group">
            <label class="filter-label">Sort</label>
            <v-select
              :model-value="props.filters.sort"
              :items="filterOptions.sort"
              variant="outlined"
              density="compact"
              hide-details
              placeholder="Select sort option"
              class="filter-select"
              @update:model-value="(value) => updateFilters({ ...props.filters, sort: value })"
            />
          </div>
          
          <!-- Price range input -->
          <div class="filter-group filter-group-range">
            <label class="filter-label">Price Range</label>
            <div class="price-range-container">
              <v-text-field
                :model-value="props.filters.priceMin"
                type="number"
                placeholder="Min Price"
                class="price-input"
                variant="outlined"
                density="compact"
                hide-details
                @update:model-value="(value) => updateFilters({ ...props.filters, priceMin: value })"
              />
              <span class="price-separator">-</span>
              <v-text-field
                :model-value="props.filters.priceMax"
                type="number"
                placeholder="Max Price"
                class="price-input"
                variant="outlined"
                density="compact"
                hide-details
                @update:model-value="(value) => updateFilters({ ...props.filters, priceMax: value })"
              />
            </div>
          </div>
          
          <!-- Style chip selection -->
          <div class="filter-group filter-group-chips">
            <label class="filter-label">Style</label>
            <div class="style-chips">
              <v-chip
                v-for="style in filterOptions.style"
                :key="style.value"
                :class="{ 'chip-selected': props.filters.styles?.includes(style.value) }"
                @click="toggleStyle(style.value)"
                class="style-chip"
                size="small"
                variant="outlined"
              >
                {{ style.text }}
              </v-chip>
            </div>
          </div>
          
          <!-- Color picker -->
          <div class="filter-group filter-group-colors">
            <label class="filter-label">Color</label>
            <div class="color-picker">
              <div
                v-for="color in colorOptions"
                :key="color.value"
                :class="{ 'color-selected': props.filters.colors?.includes(color.value) }"
                @click="toggleColor(color.value)"
                class="color-option"
                :style="{ backgroundColor: color.value }"
                :title="color.text"
              />
            </div>
          </div>
          
          <!-- Action buttons -->
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

    <!-- Fashion design content main body -->
    <div class="content-body">
      <!-- Loading state -->
      <LoadingSpinner 
        v-if="loading || !hasInitialized" 
        text="Loading fashion design works..."
      />
      
      <!-- Empty state -->
      <EmptyState 
        v-else-if="designItems.length === 0"
        icon="mdi-tshirt-crew-outline"
      />
      
      <!-- Masonry layout -->
      <masonry-wall 
        v-else
        :items="designItems" 
        :column-width="300"
        :gap="12"
        class="clothing-masonry"
      >
        <template #default="{ item, index }">
          <div class="clothing-card" @click="onCardClick(item)">
            <div class="image-container" :class="{ 'loading': !imageLoaded[item.id] }">
              <img
                :src="item.image"
                :alt="item.title"
                class="clothing-image"
                @load="(event: Event) => onImageLoad(event, item.id)"
                @error="(event: Event) => onImageError(event, item.id)"
                :class="{ 'loaded': imageLoaded[item.id] }"
              />
              
              <!-- Loading state -->
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
              
              <!-- Hover overlay -->
              <div class="image-overlay" :class="{ 'small-image': isSmallImage(item.id) }">
                <!-- Content information -->
                <div class="overlay-content">
                  <h3 class="clothing-title" :title="item.title">
                    {{ item.title }}
                  </h3>
                  
                  <!-- Description information -->
                  <p 
                    class="clothing-description" 
                    v-if="item.description"
                  >
                    {{ item.description }}
                  </p>
                  
                  <!-- Tags information -->
                  <div class="clothing-tags" v-if="item.tags && item.tags.length > 0">
                    <div class="tags-label">Tags:</div>
                    <div class="tags-list">
                      {{ item.tags.join(', ') }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </masonry-wall>
      
      <!-- Pagination -->
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
import LoadingSpinner from '../components/LoadingSpinner.vue'
import EmptyState from '../components/EmptyState.vue'
import ImageCard from '../components/ImageCard.vue'
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

// 筛选状态 - 现在使用从父组件传递的 props.filters

// 分页相关状态
const currentPage = ref(1)
const pageSize = ref(36)
const total = ref(0)
const loading = ref(false)
const hasInitialized = ref(false)

// 设计项目数据
const designItems = ref([])

// 图片加载状态
const imageLoaded = ref({})

// 图片高度状态
const imageHeights = ref<Record<string, number>>({})

// 检查是否为小图片
const isSmallImage = (itemId: string) => {
  const height = imageHeights.value[itemId]
  return height && height < 150
}

// 移除计算逻辑，使用纯 CSS 自适应

// 获取设计项目列表
const fetchDesignItems = async () => {
  loading.value = true
  try {
    const { $customFetch } = useNuxtApp()
    const requestBody = {
      currentPage: currentPage.value,
      pageSize: pageSize.value,
      isPublish: true, // 传入true，代表是公开的内容
    }
    
    // 添加服装相关的过滤条件
    const requestFilters = requestBody.filters || {}
    
    // 服装类型映射
    if (props.filters.clothingType) {
      const typeMapping = {
        'dress': '连衣裙',
        'top': '上衣',
        'bottom': '下装',
        'outerwear': '外套',
        'accessories': '配饰'
      }
      requestFilters.keyword = typeMapping[props.filters.clothingType] || props.filters.clothingType
    }
    
    // 季节筛选
    if (props.filters.season) {
      const seasonMapping = {
        'spring': '春季',
        'summer': '夏季',
        'autumn': '秋季',
        'winter': '冬季'
      }
      if (!requestFilters.keyword) requestFilters.keyword = ''
      requestFilters.keyword += (requestFilters.keyword ? ' ' : '') + (seasonMapping[props.filters.season] || props.filters.season)
    }
    
    // 风格筛选
    if (props.filters.style) {
      const styleMapping = {
        'casual': '休闲',
        'formal': '正式',
        'sport': '运动',
        'vintage': '复古',
        'modern': '现代'
      }
      if (!requestFilters.keyword) requestFilters.keyword = ''
      requestFilters.keyword += (requestFilters.keyword ? ' ' : '') + (styleMapping[props.filters.style] || props.filters.style)
    }
    
    // 价格范围筛选
    if (props.filters.priceMin !== null || props.filters.priceMax !== null) {
      if (props.filters.priceMin !== null && props.filters.priceMax !== null) {
        requestFilters.price = `${props.filters.priceMin}-${props.filters.priceMax}`
      } else if (props.filters.priceMin !== null) {
        requestFilters.price = `${props.filters.priceMin}+`
      } else if (props.filters.priceMax !== null) {
        requestFilters.price = `0-${props.filters.priceMax}`
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
const onImageLoad = (event: Event, itemId: string) => {
  imageLoaded.value[itemId] = true
  const img = event.target as HTMLImageElement
  if (img) {
    imageHeights.value[itemId] = img.naturalHeight
  }
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

// 卡片点击处理
const onCardClick = (item: any) => {
  console.log('卡片点击:', item)
  // 这里可以添加卡片点击的具体逻辑，比如跳转到详情页
}

// 监听筛选条件变化
watch(() => props.filters, () => {
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
  /* Header Styles */
  .clothing-header {
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
  
  .content-body {
    .clothing-masonry {
      padding: 24px 1.5rem 0 1.5rem; /* 增加瀑布流内容的上下左右边距 */
      // 瀑布流项目样式
      :deep(.masonry-item) {
        .clothing-card {
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
          
          .clothing-image {
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
              
              .clothing-title {
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
              
              .clothing-description {
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
              
              .clothing-tags {
                .tags-label {
                  font-size: 10px;
                  color: #888;
                  margin-bottom: 4px;
                  font-weight: 500;
                }
                
                .tags-list {
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
  @media (max-width: 768px) {
    
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
