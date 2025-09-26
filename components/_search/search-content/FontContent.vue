<template>
  <div class="font-content">
    <!-- Header Section -->
    <div class="font-header">
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
                placeholder="搜索字体模板..."
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

        <!-- 第二行：字体风格 -->
        <div class="filter-row">
          <div class="filter-group filter-group-chips">
            <label class="filter-label">字体风格</label>
            <div class="chips-container">
              <v-chip
                v-for="style in filterOptions.style"
                :key="style.value"
                :class="{ 'chip-selected': filters.styles?.includes(style.value) }"
                @click="toggleStyle(style.value)"
                class="filter-chip"
                size="small"
                variant="outlined"
              >
                {{ style.text }}
              </v-chip>
            </div>
          </div>
        </div>

        <!-- 第三行：语言支持和操作按钮 -->
        <div class="filter-row">
          <div class="filter-group">
            <label class="filter-label">语言支持</label>
            <div class="chips-container">
              <v-chip
                v-for="language in filterOptions.language"
                :key="language.value"
                :class="{ 'chip-selected': filters.languages?.includes(language.value) }"
                @click="toggleLanguage(language.value)"
                class="filter-chip"
                size="small"
                variant="outlined"
              >
                {{ language.text }}
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

    <!-- Font content main body -->
    <div class="content-body">
      <!-- Loading state -->
      <LoadingSpinner 
        v-if="loading || !hasInitialized" 
        text="Loading font templates..."
      />
      
      <!-- Empty state -->
      <EmptyState 
        v-else-if="fontItems.length === 0"
        icon="mdi-text-box-outline"
      />
      
      <!-- Masonry layout -->
      <masonry-wall 
        v-else
        :items="fontItems" 
        :column-width="300"
        :gap="12"
        class="font-masonry"
      >
        <template #default="{ item, index }">
          <div class="font-card" @click="onCardClick(item)">
            <div class="image-container" :class="{ 'loading': !imageLoaded[item.id] }">
              <img
                :src="item.thumbnail"
                :alt="item.name"
                class="font-image"
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
                  <h3 class="font-title" :title="item.name">
                    {{ item.name }}
                  </h3>
                  
                  <!-- Description information -->
                  <p 
                    class="font-description" 
                    v-if="item.description"
                  >
                    {{ item.description }}
                  </p>
                  
                  <!-- Font info -->
                  <div class="font-meta">
                    <span class="font-category">{{ item.category }}</span>
                    <span class="font-style">{{ item.style }}</span>
                  </div>
                  
                  <!-- Language support -->
                  <div class="font-languages" v-if="item.languageSupport && item.languageSupport.length > 0">
                    <div class="languages-label">支持语言:</div>
                    <div class="languages-list">
                      {{ item.languageSupport.join(', ') }}
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
import { useLocalStorage } from '@vueuse/core'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import EmptyState from '../components/EmptyState.vue'
import ContentPagination from '../components/ContentPagination.vue'
import { fontFilterOptions } from '../customConfig/filterOptions'

// Props for header functionality
const props = defineProps<{
  searchQuery: string
  showMobileSidebar: boolean
}>()

// Local state for filter menu with localStorage persistence
const showFilterMenu = useLocalStorage('font-filter-menu', false)

// Search and results state
const loading = ref(false)
const hasSearched = ref(false)
const currentPage = ref(1)
const pageSize = ref(20)

// Font items state
const fontItems = ref<any[]>([])
const total = ref(0)
const hasInitialized = ref(false)

// Search suggestions
const searchSuggestions = ref([
  // 字体类型
  '中文字体', '英文字体', '日文字体', '韩文字体', '数字字体', '符号字体', '手写体', '印刷体', '装饰体', '艺术体',
  // 风格
  '现代', '古典', '简约', '华丽', '科技', '自然', '商务', '创意', '艺术', '时尚', '复古', '未来',
  // 用途
  '标题', '正文', '广告', '海报', '标志', '包装', '网页', '印刷', '品牌', '设计',
  // 特色
  '免费', '商用', '开源', '可商用', '无版权', '高质量', '矢量', '多语言'
])

// Filter conditions - 使用localStorage持久化
const filters = useLocalStorage('font-search-filters', {
  sort: 'latest',
  category: null,
  styles: [] as string[],
  languages: [] as string[]
})

// Filter options
const filterOptions = fontFilterOptions

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
  
  if (filters.value.styles.length > 0) {
    const styleTexts = filters.value.styles.map(styleValue => {
      const styleOption = filterOptions.style.find(s => s.value === styleValue)
      return styleOption ? styleOption.text : styleValue
    })
    active.styles = { label: '风格', value: styleTexts.join(', ') }
  }
  
  if (filters.value.languages.length > 0) {
    const languageTexts = filters.value.languages.map(languageValue => {
      const languageOption = filterOptions.language.find(l => l.value === languageValue)
      return languageOption ? languageOption.text : languageValue
    })
    active.languages = { label: '语言', value: languageTexts.join(', ') }
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
  'toggle-style': [style: string]
  'toggle-language': [language: string]
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
    fontItems.value = []
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
    
    // 添加风格过滤
    if (filters.value.styles.length > 0) {
      requestBody.style = filters.value.styles.join(',')
    }
    
    // 添加语言过滤
    if (filters.value.languages.length > 0) {
      requestBody.languageSupport = filters.value.languages.join(',')
    }
    
    const response = await $customFetch('/font-template/page', {
      method: 'POST',
      body: requestBody
    }) as any
    
    // 转换数据格式
    fontItems.value = (response.list || []).map(item => ({
      id: item.id,
      name: item.name || 'no name',
      description: item.description || 'no description',
      thumbnail: item.thumbnail || '',
      category: item.category || '',
      keywords: item.keywords || '',
      createTime: item.createTime,
      updateTime: item.updateTime
    }))
    
    total.value = response.total || 0
    currentPage.value = 1
    
  } catch (error) {
    console.error('获取字体模板列表失败:', error)
    fontItems.value = []
    total.value = 0
  } finally {
    loading.value = false
  }
}

const clearSearch = () => {
  emit('update:searchQuery', '')
  hasSearched.value = false
  fetchFontItemsWithoutSearch()
}

// 获取字体模板列表（不包含搜索关键词）
const fetchFontItemsWithoutSearch = async () => {
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
    
    if (filters.value.styles.length > 0) {
      requestBody.style = filters.value.styles.join(',')
    }
    
    if (filters.value.languages.length > 0) {
      requestBody.languageSupport = filters.value.languages.join(',')
    }
    
    const response = await $customFetch('/font-template/page', {
      method: 'POST',
      body: requestBody
    }) as any
    
    // 转换数据格式
    fontItems.value = (response.list || []).map(item => ({
      id: item.id,
      name: item.name || 'no name',
      description: item.description || 'no description',
      thumbnail: item.thumbnail || '',
      category: item.category || 'unknown',
      keywords: item.keywords || '',
      createTime: item.createTime,
      updateTime: item.updateTime
    }))
    
    total.value = response.total || 0
    hasInitialized.value = true
  } catch (error) {
    console.error("获取字体模板列表失败:", error)
    fontItems.value = []
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
    styles: [],
    languages: []
  }
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

// 切换语言选择
const toggleLanguage = (languageValue: string) => {
  const index = filters.value.languages.indexOf(languageValue)
  if (index > -1) {
    filters.value.languages.splice(index, 1)
  } else {
    filters.value.languages.push(languageValue)
  }
}

// 移除单个筛选条件
const removeFilter = (filterKey: string) => {
  if (filterKey === 'sort') {
    filters.value.sort = 'latest'
  } else if (filterKey === 'category') {
    filters.value.category = null
  } else if (filterKey === 'styles') {
    filters.value.styles = []
  } else if (filterKey === 'languages') {
    filters.value.languages = []
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

// 图片加载状态
const imageLoaded = ref({})

// 图片高度状态
const imageHeights = ref<Record<string, number>>({})

// 检查是否为小图片
const isSmallImage = (itemId: string) => {
  const height = imageHeights.value[itemId]
  return height && height < 150
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

// 卡片点击处理
const onCardClick = (item: any) => {
  console.log('卡片点击:', item)
  // 这里可以添加卡片点击的具体逻辑，比如跳转到详情页
}

// 监听筛选条件变化
watch(() => filters.value, () => {
  currentPage.value = 1
  fetchFontItemsWithoutSearch()
}, { deep: true })

// 监听分页变化
watch(currentPage, () => {
  fetchFontItemsWithoutSearch()
})

// 初始化加载
onMounted(() => {
  fetchFontItemsWithoutSearch()
})
</script>

<style lang="scss" scoped>
@use './content-areas.scss';

.font-content {
  /* Header Styles */
  .font-header {
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
    height: 32px;
    min-height: 32px;
    max-height: 32px;
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
    .font-masonry {
      padding: 24px 1.5rem 0 1.5rem;
      
      :deep(.masonry-item) {
        .font-card {
          width: 100%;
          height: 100%;
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.1);
          
          &:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4), 0 0 0 2px #8b5cf6;
            border-color: #8b5cf6;
            
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
          min-height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          
          &.loading {
            min-height: 120px;
          }
          
          .font-image {
            width: 100%;
            height: auto;
            display: block;
            transition: all 0.3s ease;
            opacity: 0;
            object-fit: cover;
            
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
              border-top: 3px solid #8b5cf6;
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
              
              .font-title {
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
              
              .font-description {
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
              
              .font-meta {
                display: flex;
                gap: 8px;
                margin-bottom: 8px;
                
                .font-category {
                  font-size: 10px;
                  color: #8b5cf6;
                  background: rgba(139, 92, 246, 0.2);
                  padding: 2px 6px;
                  border-radius: 4px;
                  font-weight: 600;
                }
                
                .font-style {
                  font-size: 10px;
                  color: #f59e0b;
                  background: rgba(245, 158, 11, 0.2);
                  padding: 2px 6px;
                  border-radius: 4px;
                  font-weight: 600;
                }
              }
              
              .font-languages {
                .languages-label {
                  font-size: 10px;
                  color: #888;
                  margin-bottom: 4px;
                  font-weight: 500;
                }
                
                .languages-list {
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
