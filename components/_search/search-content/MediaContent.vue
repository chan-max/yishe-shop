<template>
  <div class="media-content">
    <!-- Header Section -->
    <div class="media-header">
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
                @keydown.enter="performSearch"
                type="text"
                placeholder="搜索媒体素材..."
                class="search-input"
                @focus="showSuggestions = true"
                @blur="handleBlur"
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
            
            <!-- Search suggestions dropdown -->
            <div v-if="showSuggestions && filteredSuggestions.length > 0" class="search-suggestions">
              <div class="suggestions-list">
                <div
                  v-for="suggestion in filteredSuggestions"
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
        
        <!-- 第一行：排序和分类 -->
        <div class="filter-row">
          <div class="filter-group">
            <label class="filter-label">排序方式</label>
            <v-select
              :model-value="filters.sort"
              :items="filterOptions.sort"
              variant="outlined"
              density="compact"
              hide-details
              placeholder="选择排序方式"
              class="filter-select"
              @update:model-value="(value) => updateFilters({ ...filters, sort: value })"
            />
          </div>
          
          <div class="filter-group">
            <label class="filter-label">分类</label>
            <v-select
              :model-value="filters.category"
              :items="filterOptions.category"
              variant="outlined"
              density="compact"
              hide-details
              placeholder="选择分类"
              class="filter-select"
              @update:model-value="(value) => updateFilters({ ...filters, category: value })"
            />
          </div>
        </div>

        <!-- 第二行：文件格式 -->
        <div class="filter-row">
          <div class="filter-group filter-group-chips">
            <label class="filter-label">文件格式</label>
            <div class="chips-container">
              <v-chip
                v-for="format in filterOptions.format"
                :key="format.value"
                :class="{ 'chip-selected': filters.formats?.includes(format.value) }"
                @click="toggleFormat(format.value)"
                class="filter-chip"
                size="small"
                variant="outlined"
              >
                {{ format.text }}
              </v-chip>
            </div>
          </div>
        </div>

        <!-- 第三行：标签和操作按钮 -->
        <div class="filter-row">
          <div class="filter-group">
            <label class="filter-label">标签</label>
            <div class="chips-container">
              <v-chip
                v-for="tag in filterOptions.tags"
                :key="tag.value"
                :class="{ 'chip-selected': filters.tags?.includes(tag.value) }"
                @click="toggleTag(tag.value)"
                class="filter-chip"
                size="small"
                variant="outlined"
              >
                {{ tag.text }}
              </v-chip>
            </div>
          </div>
          
          <!-- Action buttons -->
          <div class="filter-actions">
            <v-btn
              variant="outlined"
              @click="clearFilters"
              class="filter-clear-btn"
              size="small"
            >
              <v-icon left>mdi-refresh</v-icon>
              重置
            </v-btn>
            <v-btn
              variant="flat"
              @click="applyFilters"
              class="filter-apply-btn"
              size="small"
              color="primary"
            >
              <v-icon left>mdi-check</v-icon>
              应用筛选
            </v-btn>
          </div>
        </div>
      </div>
    </div>

    <!-- Media content main body -->
    <div class="content-body">
      <!-- Loading state -->
      <LoadingSpinner 
        v-if="loading || !hasInitialized" 
        text="Loading media materials..."
      />
      
      <!-- Empty state -->
      <EmptyState 
        v-else-if="mediaItems.length === 0"
        icon="mdi-image-multiple-outline"
      />
      
      <!-- Masonry layout -->
      <masonry-wall 
        v-else
        :items="mediaItems" 
        :column-width="300"
        :gap="12"
        class="media-masonry"
      >
        <template #default="{ item, index }">
          <div class="media-card" @click="onCardClick(item)">
            <div class="media-container" :class="{ 'loading': !mediaLoaded[item.id] }">
              <!-- 使用新的媒体预览组件 -->
              <MediaPreview
                :url="item.url"
                :name="item.name"
                :format="item.suffix"
                :type="getMediaType(item.suffix)"
                @load="(event: Event) => onMediaLoad(event, item.id)"
                @error="(event: Event) => onMediaError(event, item.id)"
                @play="() => onMediaPlay(item.id)"
                @pause="() => onMediaPause(item.id)"
              />
              
              <!-- Hover overlay -->
              <div class="media-overlay" :class="{ 'small-media': isSmallMedia(item.id) }" @click.stop>
                <!-- Content information -->
                <div class="overlay-content">
                  <h3 class="media-title" :title="item.name">
                    {{ item.name }}
                  </h3>
                  
                  <!-- Description information -->
                  <p 
                    class="media-description" 
                    v-if="item.description"
                  >
                    {{ item.description }}
                  </p>
                  
                  <!-- Tags information -->
                  <div class="media-tags" v-if="item.tags && item.tags.length > 0">
                    <div class="tags-label">Tags:</div>
                    <div class="tags-list">
                      {{ item.tags.join(', ') }}
                    </div>
                  </div>

                  <!-- Media format badge -->
                  <div class="media-format-badge">
                    {{ item.suffix?.toUpperCase() || 'UNKNOWN' }}
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
import { useLocalStorage } from '@vueuse/core'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import EmptyState from '../components/EmptyState.vue'
import ContentPagination from '../components/ContentPagination.vue'
import MediaPreview from '../components/MediaPreview.vue'
import { mediaFilterOptions } from '../customConfig/filterOptions'

// Props for header functionality
const props = defineProps<{
  searchQuery: string
  showMobileSidebar: boolean
}>()

// Local state for filter menu with localStorage persistence
const showFilterMenu = useLocalStorage('media-filter-menu', false)

// Search and results state
const loading = ref(false)
const hasSearched = ref(false)
const currentPage = ref(1)
const pageSize = ref(20)

// Media items state
const mediaItems = ref<any[]>([])
const total = ref(0)
const hasInitialized = ref(false)

// Search suggestions
const searchSuggestions = ref([
  // 媒体类型
  '视频', '音频', '图片', '动画', '特效', '转场', '背景', '音效', '音乐', '配音',
  // 格式
  'MP4', 'AVI', 'MOV', 'MP3', 'WAV', 'PNG', 'JPG', 'GIF', 'SVG', 'AI',
  // 用途
  '广告', '宣传', '教育', '娱乐', '新闻', '纪录片', '动画片', '电影', '电视剧', '短视频',
  // 风格
  '现代', '复古', '简约', '华丽', '科技', '自然', '商务', '创意', '艺术', '时尚'
])

// Filter conditions - 使用localStorage持久化
const filters = useLocalStorage('media-search-filters', {
  sort: 'latest',
  category: null,
  formats: [] as string[],
  tags: [] as string[]
})

// Filter options
const filterOptions = mediaFilterOptions

// 搜索建议状态
const showSuggestions = ref(false)

// 搜索建议过滤
const filteredSuggestions = computed(() => {
  if (!props.searchQuery.trim()) {
    return searchSuggestions.value.slice(0, 8)
  }
  
  return searchSuggestions.value
    .filter(suggestion => 
      suggestion.toLowerCase().includes(props.searchQuery.toLowerCase())
    )
    .slice(0, 8)
})

// 计算活跃的筛选条件
const activeFilters = computed(() => {
  const active: any = {}
  
  if (filters.value.sort && filters.value.sort !== 'latest') {
    const sortOption = filterOptions.sort.find(s => s.value === filters.value.sort)
    if (sortOption) {
      active.sort = { label: '排序', value: sortOption.text }
    }
  }
  
  if (filters.value.category) {
    const categoryOption = filterOptions.category.find(c => c.value === filters.value.category)
    if (categoryOption) {
      active.category = { label: '分类', value: categoryOption.text }
    }
  }
  
  if (filters.value.formats.length > 0) {
    const formatTexts = filters.value.formats.map(formatValue => {
      const formatOption = filterOptions.format.find(f => f.value === formatValue)
      return formatOption ? formatOption.text : formatValue
    })
    active.formats = { label: '格式', value: formatTexts.join(', ') }
  }
  
  if (filters.value.tags.length > 0) {
    const tagTexts = filters.value.tags.map(tagValue => {
      const tagOption = filterOptions.tags.find(t => t.value === tagValue)
      return tagOption ? tagOption.text : tagValue
    })
    active.tags = { label: '标签', value: tagTexts.join(', ') }
  }
  
  return active
})

// 计算活跃筛选条件数量
const activeFiltersCount = computed(() => {
  return Object.keys(activeFilters.value).length
})

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
  'toggle-format': [format: string]
  'toggle-tag': [tag: string]
}>()

// Header methods
const handleSearchInput = (value: string) => {
  emit('update:searchQuery', value)
}

const toggleFilter = () => {
  showFilterMenu.value = !showFilterMenu.value
}

// 执行搜索
const performSearch = async () => {
  if (!props.searchQuery.trim()) {
    mediaItems.value = []
    hasSearched.value = false
    total.value = 0
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
      keyword: props.searchQuery.trim()
    }
    
    // 添加分类过滤
    if (filters.value.category) {
      requestBody.category = filters.value.category
    }
    
    // 添加格式过滤
    if (filters.value.formats.length > 0) {
      requestBody.suffix = filters.value.formats.join(',')
    }
    
    // 添加标签过滤
    if (filters.value.tags.length > 0) {
      requestBody.tags = filters.value.tags.join(',')
    }
    
    const response = await $customFetch('/clip-material/page', {
      method: 'POST',
      body: requestBody
    }) as any
    
    // 转换数据格式
    mediaItems.value = (response.list || []).map(item => ({
      id: item.id,
      name: item.name || '未命名素材',
      description: item.description || '精美的媒体素材',
      url: item.url || 'https://via.placeholder.com/300x400/4f46e5/ffffff?text=Media',
      suffix: item.suffix || 'unknown',
      category: item.category || '其他',
      tags: item.tags ? item.tags.split(',').map(t => t.trim()) : ['媒体素材'],
      keywords: item.keywords || '',
      createTime: item.createTime,
      updateTime: item.updateTime
    }))
    
    total.value = response.total || 0
    currentPage.value = 1
    
  } catch (error) {
    console.error('获取媒体素材列表失败:', error)
    mediaItems.value = []
    total.value = 0
  } finally {
    loading.value = false
  }
}

const clearSearch = () => {
  emit('update:searchQuery', '')
  hasSearched.value = false
  fetchMediaItemsWithoutSearch()
}

// 获取媒体素材列表（不包含搜索关键词）
const fetchMediaItemsWithoutSearch = async () => {
  loading.value = true
  try {
    const { $customFetch } = useNuxtApp()
    const requestBody: any = {
      currentPage: currentPage.value,
      pageSize: pageSize.value
    }
    
    // 添加过滤条件
    if (filters.value.category) {
      requestBody.category = filters.value.category
    }
    
    if (filters.value.formats.length > 0) {
      requestBody.suffix = filters.value.formats.join(',')
    }
    
    if (filters.value.tags.length > 0) {
      requestBody.tags = filters.value.tags.join(',')
    }
    
    const response = await $customFetch('/clip-material/page', {
      method: 'POST',
      body: requestBody
    }) as any
    
    // 转换数据格式
    mediaItems.value = (response.list || []).map(item => ({
      id: item.id,
      name: item.name || '未命名素材',
      description: item.description || '精美的媒体素材',
      url: item.url || 'https://via.placeholder.com/300x400/4f46e5/ffffff?text=Media',
      suffix: item.suffix || 'unknown',
      category: item.category || '其他',
      tags: item.tags ? item.tags.split(',').map(t => t.trim()) : ['媒体素材'],
      keywords: item.keywords || '',
      createTime: item.createTime,
      updateTime: item.updateTime
    }))
    
    total.value = response.total || 0
    hasInitialized.value = true
  } catch (error) {
    console.error("获取媒体素材列表失败:", error)
    mediaItems.value = []
    total.value = 0
    hasInitialized.value = true
  } finally {
    loading.value = false
  }
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

// 清空所有筛选条件
const clearFilters = () => {
  filters.value = {
    sort: 'latest',
    category: null,
    formats: [],
    tags: []
  }
  if (hasSearched.value) {
    performSearch()
  }
}

// 切换格式选择
const toggleFormat = (formatValue: string) => {
  const index = filters.value.formats.indexOf(formatValue)
  if (index > -1) {
    filters.value.formats.splice(index, 1)
  } else {
    filters.value.formats.push(formatValue)
  }
}

// 切换标签选择
const toggleTag = (tagValue: string) => {
  const index = filters.value.tags.indexOf(tagValue)
  if (index > -1) {
    filters.value.tags.splice(index, 1)
  } else {
    filters.value.tags.push(tagValue)
  }
}

// 移除单个筛选条件
const removeFilter = (filterKey: string) => {
  if (filterKey === 'sort') {
    filters.value.sort = 'latest'
  } else if (filterKey === 'category') {
    filters.value.category = null
  } else if (filterKey === 'formats') {
    filters.value.formats = []
  } else if (filterKey === 'tags') {
    filters.value.tags = []
  }
  
  if (hasSearched.value) {
    performSearch()
  }
}

// 应用筛选条件
const applyFilters = () => {
  if (hasSearched.value) {
    performSearch()
  }
  showFilterMenu.value = false
}

const toggleMobileSidebar = () => {
  emit('toggle-mobile-sidebar')
}

// 媒体加载状态
const mediaLoaded = ref<Record<string, boolean>>({})

// 媒体高度状态
const mediaHeights = ref<Record<string, number>>({})

// 媒体播放状态
const mediaPlaying = ref<Record<string, boolean>>({})

// 获取媒体类型
const getMediaType = (suffix: string) => {
  if (!suffix) return 'unknown'
  
  const format = suffix.toLowerCase()
  
  // 图片格式
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico'].includes(format)) {
    return 'image'
  }
  
  // 视频格式
  if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv', 'm4v'].includes(format)) {
    return 'video'
  }
  
  // 音频格式
  if (['mp3', 'wav', 'flac', 'aac', 'ogg', 'wma', 'm4a'].includes(format)) {
    return 'audio'
  }
  
  // 文档格式
  if (['pdf', 'doc', 'docx', 'txt', 'rtf', 'ppt', 'pptx', 'xls', 'xlsx'].includes(format)) {
    return 'document'
  }
  
  return 'unknown'
}

// 检查是否为小媒体
const isSmallMedia = (itemId: string) => {
  const height = mediaHeights.value[itemId]
  return height && height < 150
}

// 媒体加载成功处理
const onMediaLoad = (event: Event, itemId: string) => {
  mediaLoaded.value[itemId] = true
  
  // 尝试获取媒体高度
  const target = event.target as HTMLMediaElement | HTMLImageElement
  if (target) {
    if ('naturalHeight' in target) {
      mediaHeights.value[itemId] = target.naturalHeight
    } else if ('videoHeight' in target) {
      mediaHeights.value[itemId] = target.videoHeight
    }
  }
}

// 媒体加载失败处理
const onMediaError = (event: Event, itemId: string) => {
  console.error("媒体加载失败:", event)
  mediaLoaded.value[itemId] = false
}

// 媒体播放处理
const onMediaPlay = (itemId: string) => {
  console.log('媒体开始播放:', itemId)
  mediaPlaying.value[itemId] = true
  // 暂停其他正在播放的媒体
  Object.keys(mediaPlaying.value).forEach(id => {
    if (id !== itemId && mediaPlaying.value[id]) {
      mediaPlaying.value[id] = false
      console.log('暂停其他媒体:', id)
    }
  })
}

// 媒体暂停处理
const onMediaPause = (itemId: string) => {
  console.log('媒体暂停播放:', itemId)
  mediaPlaying.value[itemId] = false
}

// 卡片点击处理
const onCardClick = (item: any) => {
  console.log('卡片点击:', item)
  // 这里可以添加卡片点击的具体逻辑，比如跳转到详情页
}

// 监听筛选条件变化
watch(() => filters.value, () => {
  currentPage.value = 1
  fetchMediaItemsWithoutSearch()
}, { deep: true })

// 监听分页变化
watch(currentPage, () => {
  fetchMediaItemsWithoutSearch()
})

// 初始化加载
onMounted(() => {
  fetchMediaItemsWithoutSearch()
})
</script>

<style lang="scss" scoped>
@use './content-areas.scss';

.media-content {
  /* Header Styles */
  .media-header {
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
    height: 64px;
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
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: 8px;
    box-shadow: 0 4px 12px var(--shadow-primary);
    z-index: 1000;
    margin-top: 4px;
    max-height: 300px;
    overflow-y: auto;
    
    .suggestions-list {
      padding: 0.5rem 0;
    }
    
    .suggestion-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
      color: var(--text-secondary);
      
      &:hover {
        background: var(--bg-hover);
        color: var(--text-primary);
      }
      
      .suggestion-icon {
        font-size: 1rem;
        color: var(--text-tertiary);
        flex-shrink: 0;
      }
      
      .suggestion-text {
        font-size: 0.9rem;
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .search-box {
    display: flex;
    align-items: center;
    background: var(--input-bg);
    border: none;
    border-radius: 50px;
    padding: 0.25rem 1rem;
    min-width: 280px;
    height: 40px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    &:hover {
      background: var(--input-bg-hover);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    &:focus-within {
      background: var(--input-bg-focus);
      box-shadow: 0 4px 16px rgba(79, 70, 229, 0.2);
    }
  }

  .search-icon {
    color: var(--text-tertiary);
    margin-right: 0.75rem;
    margin-left: 0.5rem;
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
    height: 100%;
    min-height: auto;
    max-height: none;
    resize: none;
    overflow: hidden;
    
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
    padding: 0.75rem 1.5rem 1rem 1.5rem;
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

  .filter-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: flex-end;
    padding-bottom: 1rem;
    margin-bottom: 0.5rem;
    
    &:last-child {
      margin-bottom: 0;
    }
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

  // 芯片容器样式
  .chips-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    max-width: 100%;
  }

  .filter-chip {
    cursor: pointer;
    transition: all 0.3s ease;
    
    &.chip-selected {
      background: var(--theme-primary) !important;
      color: var(--text-primary) !important;
      border-color: var(--theme-primary) !important;
    }
    
    &:hover {
      background: var(--bg-hover) !important;
      transform: translateY(-1px);
    }
  }

  .filter-actions {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    margin-left: auto;
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
    .media-masonry {
      padding: 24px 1.5rem 0 1.5rem;
      
      :deep(.masonry-item) {
        .media-card {
          width: 100%;
          height: 100%;
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.1);
          
          &:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4), 0 0 0 2px #4f46e5;
            border-color: #4f46e5;
            
            .image-overlay {
              opacity: 1;
            }
          }
        }
        
        .media-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: #1a1a1a;
          min-height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          
          &.loading {
            min-height: 120px;
          }
          
          .media-overlay {
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
            z-index: 5;
            pointer-events: none;
            
            &.small-media {
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
              pointer-events: none;
              
              .media-title {
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
                
                .small-media & {
                  font-size: 12px;
                  margin: 0 0 4px 0;
                  -webkit-line-clamp: 1;
                  line-clamp: 1;
                }
              }
              
              .media-description {
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
                
                .small-media & {
                  -webkit-line-clamp: 1;
                  line-clamp: 1;
                  margin: 0 0 6px 0;
                }
              }
              
              .media-tags {
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
                  
                  .small-media & {
                    -webkit-line-clamp: 1;
                    line-clamp: 1;
                  }
                }
              }
              
              .media-format-badge {
                position: absolute;
                top: 8px;
                right: 8px;
                font-size: 10px;
                color: #4f46e5;
                background: rgba(79, 70, 229, 0.2);
                padding: 2px 6px;
                border-radius: 4px;
                font-weight: 600;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(79, 70, 229, 0.3);
              }
            }
          }
        }
      }
    }
  }
  
  .pagination-container {
    padding: 2rem 0 3rem 0;
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
      margin-left: 3rem;
    }
    
    .search-box {
      min-width: 200px;
    }
    
    .filter-row {
      flex-direction: column;
      align-items: stretch;
      gap: 1rem;
    }
    
    .filter-group {
      min-width: auto;
    }
    
    .chips-container {
      gap: 0.375rem;
    }
    
    .filter-chip {
      font-size: 0.8rem;
      padding: 0.25rem 0.5rem;
    }
    
    .filter-actions {
      flex-direction: column;
      gap: 0.5rem;
      margin-left: 0;
      width: 100%;
    }
    
    .filter-clear-btn,
    .filter-apply-btn {
      width: 100%;
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
