<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-01-27 11:00:00
 * @FilePath: /yishe-nuxt/components/_search/search-content/TextCreationContent.vue
 * @Description: 文字创作内容组件 - 简洁卡片式展示
-->
<template>
  <div class="text-creation-content">
    <!-- Header Section -->
    <div class="text-creation-header">
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
                placeholder="搜索文字创作内容..."
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
          
          <!-- Language selection -->
          <div class="filter-group filter-group-chips">
            <label class="filter-label">Language</label>
            <div class="style-chips">
              <v-chip
                v-for="lang in filterOptions.language"
                :key="lang.value"
                :class="{ 'chip-selected': props.filters.languages?.includes(lang.value) }"
                @click="toggleLanguage(lang.value)"
                class="style-chip"
                size="small"
                variant="outlined"
              >
                {{ lang.text }}
              </v-chip>
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

    <!-- Content Section -->
    <div class="text-creation-body">
      <!-- 加载状态 -->
      <LoadingSpinner 
        v-if="loading || !hasInitialized" 
        text="正在加载文字创作内容..."
      />
    
    <!-- 空状态 -->
    <EmptyState 
      v-else-if="textItems.length === 0"
      icon="mdi-text-box-outline"
    />
    
    <!-- 文字内容网格 -->
    <div v-else class="text-grid">
      <div 
        v-for="(item, index) in textItems" 
        :key="item.id"
        class="text-card"
        @click="onItemClick(item)"
      >
        <!-- 文字内容 -->
        <div class="text-content">
          <p class="text-preview">
            {{ item.content }}
          </p>
        </div>
        
        <!-- 操作按钮 -->
        <div class="text-actions">
          <v-btn
            variant="text"
            size="small"
            icon
            @click.stop="onCopyText(item)"
            class="action-btn"
            title="复制"
          >
            <v-icon>mdi-content-copy</v-icon>
          </v-btn>
          <v-btn
            variant="text"
            size="small"
            icon
            @click.stop="onLikeText(item)"
            class="action-btn"
            :class="{ 'liked': item.isLiked }"
            title="点赞"
          >
            <v-icon>{{ item.isLiked ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
          </v-btn>
          <v-btn
            variant="text"
            size="small"
            icon
            @click.stop="onShareText(item)"
            class="action-btn"
            title="分享"
          >
            <v-icon>mdi-share-variant</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
    
      <!-- 分页 -->
      <div class="pagination-container" v-if="textItems.length > 0">
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
import { ref, watch, onMounted } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import EmptyState from '../components/EmptyState.vue'
import ContentPagination from '../components/ContentPagination.vue'

// Props for header functionality
const props = defineProps<{
  searchQuery: string
  showMobileSidebar: boolean
  filters: any
  filterOptions: any
  activeFilters: any
  activeFiltersCount: number
}>()

// Local state for filter menu with localStorage persistence
const showFilterMenu = useLocalStorage('text-creation-filter-menu', false)

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

const performSearch = async () => {
  if (!props.searchQuery.trim()) {
    textItems.value = []
    hasSearched.value = false
    return
  }

  loading.value = true
  hasSearched.value = true
  
  try {
    const { $customFetch } = useNuxtApp()
    const requestBody = {
      currentPage: 1,
      pageSize: pageSize.value,
      search: props.searchQuery.trim()
    }

    const response = await $customFetch('/api/sticker/getPage', {
      method: 'POST',
      body: requestBody
    })

    if (response && response.data) {
      textItems.value = response.data
      total.value = response.total || 0
      currentPage.value = 1
    } else {
      textItems.value = []
      total.value = 0
    }
  } catch (error) {
    console.error('搜索文字创作内容失败:', error)
    textItems.value = []
    total.value = 0
  } finally {
    loading.value = false
  }
}

const clearSearch = () => {
  // 清空搜索查询
  emit('update:searchQuery', '')
  // 重置搜索状态
  hasSearched.value = false
  // 重新获取默认的文字创作列表（不包含搜索关键词）
  fetchTextItemsWithoutSearch()
}

// 获取文字创作列表（不包含搜索关键词）
const fetchTextItemsWithoutSearch = async () => {
  loading.value = true
  try {
    const { $customFetch } = useNuxtApp()
    const requestBody = {
      currentPage: currentPage.value,
      pageSize: pageSize.value
      // 不添加search参数
    }

    const response = await $customFetch('/api/sticker/getPage', {
      method: 'POST',
      body: requestBody
    })

    if (response && response.data) {
      textItems.value = response.data
      total.value = response.total || 0
    } else {
      textItems.value = []
      total.value = 0
    }
  } catch (error) {
    console.error('获取文字创作列表失败:', error)
    textItems.value = []
    total.value = 0
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

const toggleLanguage = (language: string) => {
  emit('toggle-language', language)
}

// 分页相关状态
const currentPage = ref(1)
const pageSize = ref(20)
const total = ref(0)
const loading = ref(false)
const hasInitialized = ref(false)

// 文字内容数据
const textItems = ref([])

// 获取文字创作内容列表
const fetchTextItems = async () => {
  loading.value = true
  try {
    const { $customFetch } = useNuxtApp()
    const requestBody = {
      currentPage: currentPage.value,
      pageSize: pageSize.value,
      isPublish: true, // 传入true，代表是公开的内容
    }
    
    const response = await $customFetch("/sentences/page", {
      method: "POST",
      body: requestBody,
    })
    
    // 转换数据格式以适配文字内容显示
    textItems.value = response.list.map(item => ({
      id: item.id,
      title: item.content?.substring(0, 50) + (item.content?.length > 50 ? '...' : '') || '无标题',
      content: item.content || '',
      description: item.description || '',
      category: getCategoryFromContent(item.content),
      language: '中文', // 默认中文，可以根据实际数据调整
      length: getLengthCategory(item.content?.length || 0),
      tags: item.keywords ? item.keywords.split(',').map(k => k.trim()) : ['文字创作'],
      views: Math.floor(Math.random() * 1000) + 100, // 模拟浏览量
      likes: Math.floor(Math.random() * 200) + 20, // 模拟点赞数
      downloads: Math.floor(Math.random() * 100) + 10, // 模拟下载数
      isLiked: false,
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: item.updatedAt || new Date().toISOString()
    }))
    
    total.value = response.total
    hasInitialized.value = true
  } catch (error) {
    console.error("获取文字创作内容失败:", error)
    hasInitialized.value = true
  } finally {
    loading.value = false
  }
}

// 根据内容判断分类
const getCategoryFromContent = (content: string) => {
  if (!content) return '其他'
  
  const categories = {
    '文案': ['广告', '营销', '推广', '宣传'],
    '标题': ['标题', '题目', '主题'],
    '描述': ['描述', '介绍', '说明'],
    '故事': ['故事', '小说', '情节', '叙述'],
    '诗歌': ['诗', '歌', '韵', '律'],
    '新闻': ['新闻', '报道', '资讯', '消息'],
    '评论': ['评论', '评价', '观点', '看法']
  }
  
  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => content.includes(keyword))) {
      return category
    }
  }
  
  return '其他'
}

// 根据长度判断分类
const getLengthCategory = (length: number) => {
  if (length <= 20) return '短句'
  if (length <= 100) return '中等'
  if (length <= 500) return '长文'
  return '超长'
}


// 复制文字
const onCopyText = async (item: any) => {
  try {
    await navigator.clipboard.writeText(item.content)
    // 这里可以添加复制成功的提示
    console.log('文字已复制到剪贴板')
  } catch (error) {
    console.error('复制失败:', error)
  }
}

// 点赞文字
const onLikeText = (item: any) => {
  item.isLiked = !item.isLiked
  if (item.isLiked) {
    item.likes += 1
  } else {
    item.likes -= 1
  }
}

// 分享文字
const onShareText = (item: any) => {
  // 这里可以实现分享功能
  console.log('分享文字:', item.title)
}

// 点击文字项
const onItemClick = (item: any) => {
  console.log('点击文字项:', item)
  // 这里可以添加跳转到详情页的逻辑
}

// 监听分页变化
watch(currentPage, () => {
  fetchTextItems()
})

// 初始化加载
onMounted(() => {
  fetchTextItems()
})
</script>

<style lang="scss" scoped>
@use './content-areas.scss';

.text-creation-content {
  /* Header Styles */
  .text-creation-header {
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
      box-shadow: 0 4px 16px rgba(245, 158, 11, 0.2);
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
    padding: 0.75rem 1.5rem 1rem 1.5rem; /* 增加左右边距，与网格内容对齐 */
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
  .text-creation-body {
    padding: 1.5rem 0; /* 增加上下边距，让内容更舒适 */
  }
  
  .pagination-container {
    padding: 2rem 0 3rem 0; /* 增加分页组件的上下间距，底部更多 */
  }
  
  .text-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
    padding: 0 1.5rem; /* 增加左右边距 */
    margin-bottom: 2rem;
  }
  
  .text-card {
    background: var(--bg-tertiary);
    border: 1px solid var(--border-primary);
    border-radius: 16px;
    padding: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: auto;
    min-height: 120px;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
      border-color: var(--theme-primary);
      
      &::before {
        opacity: 1;
      }
    }
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
  }
  
  .text-content {
    flex: 1;
    margin-bottom: 1rem;
    
    .text-preview {
      font-size: 1rem;
      line-height: 1.7;
      color: var(--text-primary);
      margin: 0;
      white-space: pre-wrap;
      word-break: break-word;
      word-wrap: break-word;
      overflow-wrap: break-word;
      hyphens: auto;
    }
  }
  
  .text-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-secondary);
    
    .action-btn {
      color: var(--text-tertiary) !important;
      min-width: 36px;
      height: 36px;
      border-radius: 8px;
      transition: all 0.2s ease;
      
      &:hover {
        color: var(--text-primary) !important;
        background: var(--bg-hover) !important;
        transform: scale(1.05);
      }
      
      &.liked {
        color: #ef4444 !important;
        background: rgba(239, 68, 68, 0.1) !important;
      }
    }
  }
}

/* 平板适配 */
@media (max-width: 1024px) {
  .text-creation-content {
    .text-grid {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.25rem;
    }
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .text-creation-content {
    padding: 0.5rem 0;
    
    .text-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    
    .text-card {
      padding: 1.25rem;
    }
    
    .text-content {
      .text-preview {
        font-size: 0.95rem;
        line-height: 1.6;
      }
    }
    
    .text-actions {
      padding-top: 0.75rem;
      
      .action-btn {
        min-width: 32px;
        height: 32px;
      }
    }
  }
}

/* 小屏幕适配 */
@media (max-width: 480px) {
  .text-creation-content {
    .text-card {
      padding: 1rem;
    }
    
    .text-content {
      .text-preview {
        font-size: 0.9rem;
        line-height: 1.5;
      }
    }
  }
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .text-creation-header {
    left: 200px;
  }
}

@media (max-width: 900px) {
  .text-creation-header {
    left: 180px;
  }
}

@media (max-width: 768px) {
  .text-creation-header {
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
  
  .title-container {
    margin-left: 3rem; /* 为移动端菜单按钮留出空间 */
  }
  
  .page-subtitle {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .header-content {
    padding: 0.625rem 0.75rem;
    min-height: 56px;
    gap: 0.5rem;
  }
  
  .page-subtitle {
    font-size: 0.75rem;
  }
}
</style>
