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
                @keydown.enter="performSearch"
                type="text"
                placeholder="搜索服装设计..."
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
        
        <!-- 第一行：排序和商品类型 -->
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
            <label class="filter-label">商品类型</label>
            <v-select
              :model-value="filters.type"
              :items="filterOptions.type"
              variant="outlined"
              density="compact"
              hide-details
              placeholder="选择商品类型"
              class="filter-select"
              @update:model-value="(value) => updateFilters({ ...filters, type: value })"
            />
          </div>
        </div>

        <!-- 第二行：价格范围滑块 -->
        <div class="filter-row">
          <div class="filter-group filter-group-range">
            <label class="filter-label">价格范围</label>
            <div class="price-range-slider">
              <div class="price-display">
                <span class="price-min">¥{{ filters.priceMin || filterOptions.priceRange.defaultMin }}</span>
                <span class="price-separator">-</span>
                <span class="price-max">¥{{ filters.priceMax || filterOptions.priceRange.defaultMax }}</span>
              </div>
              <v-range-slider
                :model-value="[filters.priceMin || filterOptions.priceRange.defaultMin, filters.priceMax || filterOptions.priceRange.defaultMax]"
                :min="filterOptions.priceRange.min"
                :max="filterOptions.priceRange.max"
                :step="filterOptions.priceRange.step"
                thumb-label
                thumb-size="20"
                track-color="var(--border-primary)"
                color="var(--theme-primary)"
                @update:model-value="(value) => updateFilters({ ...filters, priceMin: value[0], priceMax: value[1] })"
              />
            </div>
          </div>
        </div>

        <!-- 第三行：风格选择 -->
        <div class="filter-row">
          <div class="filter-group filter-group-chips">
            <label class="filter-label">风格</label>
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

        <!-- 第四行：颜色选择 -->
        <div class="filter-row">
          <div class="filter-group filter-group-colors">
            <label class="filter-label">颜色</label>
            <div class="color-picker">
              <div
                v-for="color in filterOptions.color"
                :key="color.value"
                :class="{ 'color-selected': filters.colors?.includes(color.value) }"
                @click="toggleColor(color.value)"
                class="color-option"
                :title="color.text"
              >
                <div class="color-circle" :style="{ backgroundColor: getColorValue(color.value) }"></div>
                <span class="color-text">{{ color.text }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 第五行：性别和年龄 -->
        <div class="filter-row">
          <div class="filter-group">
            <label class="filter-label">性别</label>
            <div class="chips-container">
              <v-chip
                v-for="gender in filterOptions.gender"
                :key="gender.value"
                :class="{ 'chip-selected': filters.gender?.includes(gender.value) }"
                @click="toggleGender(gender.value)"
                class="filter-chip"
                size="small"
                variant="outlined"
              >
                {{ gender.text }}
              </v-chip>
            </div>
          </div>
          
          <div class="filter-group">
            <label class="filter-label">年龄群体</label>
            <div class="chips-container">
              <v-chip
                v-for="age in filterOptions.ageGroup"
                :key="age.value"
                :class="{ 'chip-selected': filters.ageGroup?.includes(age.value) }"
                @click="toggleAgeGroup(age.value)"
                class="filter-chip"
                size="small"
                variant="outlined"
              >
                {{ age.text }}
              </v-chip>
            </div>
          </div>
        </div>

        <!-- 第六行：季节和材质 -->
        <div class="filter-row">
          <div class="filter-group">
            <label class="filter-label">季节</label>
            <div class="chips-container">
              <v-chip
                v-for="season in filterOptions.season"
                :key="season.value"
                :class="{ 'chip-selected': filters.season?.includes(season.value) }"
                @click="toggleSeason(season.value)"
                class="filter-chip"
                size="small"
                variant="outlined"
              >
                {{ season.text }}
              </v-chip>
            </div>
          </div>
          
          <div class="filter-group">
            <label class="filter-label">材质</label>
            <div class="chips-container">
              <v-chip
                v-for="material in filterOptions.material"
                :key="material.value"
                :class="{ 'chip-selected': filters.material?.includes(material.value) }"
                @click="toggleMaterial(material.value)"
                class="filter-chip"
                size="small"
                variant="outlined"
              >
                {{ material.text }}
              </v-chip>
            </div>
          </div>
        </div>

        <!-- 第七行：特殊标签和操作按钮 -->
        <div class="filter-row">
          <div class="filter-group">
            <label class="filter-label">特殊标签</label>
            <div class="chips-container">
              <v-chip
                v-for="special in filterOptions.special"
                :key="special.value"
                :class="{ 'chip-selected': filters.special?.includes(special.value) }"
                @click="toggleSpecial(special.value)"
                class="filter-chip"
                size="small"
                variant="outlined"
              >
                {{ special.text }}
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
import { useLocalStorage } from '@vueuse/core'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import EmptyState from '../components/EmptyState.vue'
import ImageCard from '../components/ImageCard.vue'
import FilterRow from '../components/FilterRow.vue'
import type { FilterItem } from '../components/FilterRow.vue'
import ContentPagination from '../components/ContentPagination.vue'
import { colorOptions, clothingFilterOptions } from '../customConfig/filterOptions'

// Props for header functionality
const props = defineProps<{
  searchQuery: string
  showMobileSidebar: boolean
}>()

// Local state for filter menu with localStorage persistence
const showFilterMenu = useLocalStorage('clothing-filter-menu', false)

// Search and results state
const loading = ref(false)
const hasSearched = ref(false)
const currentPage = ref(1)
const pageSize = ref(20)

// Design items state
const designItems = ref<any[]>([])
const total = ref(0)
const hasInitialized = ref(false)

// Search suggestions
const searchSuggestions = ref([
  // 服装类型
  '连衣裙', '牛仔裤', 'T恤', '运动鞋', '休闲裤', '衬衫', '夹克', '短裙', '短裤', '长裤',
  // 风格
  '休闲', '正式', '运动', '复古', '街头', '商务', '甜美', '酷炫', '优雅', '极简',
  // 颜色
  '黑色', '白色', '红色', '蓝色', '绿色', '粉色', '灰色', '棕色',
  // 季节
  '春季', '夏季', '秋季', '冬季',
  // 材质
  '棉质', '羊毛', '丝绸', '牛仔', '皮革',
  // 场合
  '日常', '工作', '聚会', '运动', '约会', '旅行'
])

// Filter conditions - 使用localStorage持久化
const filters = useLocalStorage('clothing-search-filters', {
  sort: 'latest',
  type: null,
  priceMin: null,
  priceMax: null,
  styles: [] as string[],
  colors: [] as string[],
  gender: [] as string[],
  ageGroup: [] as string[],
  season: [] as string[],
  material: [] as string[],
  special: [] as string[]
})

// Filter options
const filterOptions = clothingFilterOptions

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
  'toggle-gender': [gender: string]
  'toggle-age-group': [ageGroup: string]
  'toggle-season': [season: string]
  'toggle-material': [material: string]
  'toggle-special': [special: string]
}>()

// Header methods
const handleSearchInput = (value: string) => {
  emit('update:searchQuery', value)
  // 移除实时搜索，只在点击搜索按钮或回车时搜索
}

const toggleFilter = () => {
  showFilterMenu.value = !showFilterMenu.value
}

// 执行搜索
const performSearch = async () => {
  if (!props.searchQuery.trim()) {
    designItems.value = []
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
      currentPage: 1, // 搜索时重置到第一页
      pageSize: pageSize.value,
      isPublish: true, // 传入true，代表是公开的内容
      search: buildSearchKeywords()
    }
    
    // 添加类型过滤
    if (filters.value.type) {
      requestBody.type = filters.value.type
    }
    
    // 添加价格过滤
    if (filters.value.priceMin !== null) {
      requestBody.priceMin = filters.value.priceMin
    }
    if (filters.value.priceMax !== null) {
      requestBody.priceMax = filters.value.priceMax
    }
    
    // 添加排序
    if (filters.value.sort) {
      const sortOption = filterOptions.sort.find(s => s.value === filters.value.sort)
      if (sortOption) {
        requestBody.sort = sortOption.apiValue
      }
    }
    
    const response = await $customFetch('/product/page', {
      method: 'POST',
      body: requestBody
    }) as any
    
    // 转换数据格式以适配设计项目显示
    designItems.value = (response.list || []).map(item => ({
      id: item.id,
      title: item.name || '未命名商品',
      description: item.description || '精美的服装设计作品',
      image: item.customModel?.thumbnail || (item.images && item.images[0]) || 'https://via.placeholder.com/300x400/ff6b6b/ffffff?text=Clothing',
      price: item.price || 0,
      salePrice: item.salePrice || item.price || 0,
      likes: Math.floor(Math.random() * 200) + 50, // 模拟点赞数
      tags: item.keywords ? item.keywords.split(',').map(k => k.trim()) : ['服装设计'],
      searchKeywords: item.searchKeywords || '',
      isLimitedEdition: item.isLimitedEdition || false,
      createTime: item.createTime,
      updateTime: item.updateTime
    }))
    
    total.value = response.total || 0
    currentPage.value = 1
    
  } catch (error) {
    console.error('获取服装设计列表失败:', error)
    designItems.value = []
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
  // 重新获取默认的服装列表（不包含搜索关键词）
  fetchDesignItemsWithoutSearch()
}

// 获取设计项目列表（不包含搜索关键词）
const fetchDesignItemsWithoutSearch = async () => {
  loading.value = true
  try {
    const { $customFetch } = useNuxtApp()
    const requestBody: any = {
      currentPage: currentPage.value,
      pageSize: pageSize.value,
      isPublish: true, // 传入true，代表是公开的内容
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
    addKeywordsFromFilter(filters.value.gender, filterOptions.gender)
    addKeywordsFromFilter(filters.value.ageGroup, filterOptions.ageGroup)
    addKeywordsFromFilter(filters.value.style, filterOptions.style)
    addKeywordsFromFilter(filters.value.season, filterOptions.season)
    addKeywordsFromFilter(filters.value.material, filterOptions.material)
    addKeywordsFromFilter(filters.value.color, filterOptions.color)
    addKeywordsFromFilter(filters.value.size, filterOptions.size)
    addKeywordsFromFilter(filters.value.occasion, filterOptions.occasion)
    addKeywordsFromFilter(filters.value.special, filterOptions.special)
    
    if (keywords.length > 0) {
      requestBody.search = keywords.join(' ')
    }
    
    // 添加商品类型过滤
    if (filters.value.type) {
      requestBody.type = filters.value.type
    }
    
    // 添加价格范围过滤
    if (filters.value.priceMin !== null || filters.value.priceMax !== null) {
      if (filters.value.priceMin !== null && filters.value.priceMax !== null) {
        requestBody.priceMin = filters.value.priceMin
        requestBody.priceMax = filters.value.priceMax
      } else if (filters.value.priceMin !== null) {
        requestBody.priceMin = filters.value.priceMin
      } else if (filters.value.priceMax !== null) {
        requestBody.priceMax = filters.value.priceMax
      }
    }
    
    // 添加排序
    if (filters.value.sort) {
      const sortOption = filterOptions.sort.find(s => s.value === filters.value.sort)
      if (sortOption && sortOption.apiValue) {
        requestBody.sort = sortOption.apiValue
      }
    }
    
    console.log('清除搜索后的请求参数:', requestBody)
    
    const response = await $customFetch('/product/page', {
      method: 'POST',
      body: requestBody
    }) as any
    
    console.log('API响应:', response)
    
    // 转换数据格式以适配设计项目显示
    designItems.value = (response.list || []).map(item => ({
      id: item.id,
      title: item.name || '未命名商品',
      description: item.description || '精美的服装设计作品',
      image: item.customModel?.thumbnail || (item.images && item.images[0]) || 'https://via.placeholder.com/300x400/ff6b6b/ffffff?text=Clothing',
      price: item.price || 0,
      salePrice: item.salePrice || item.price || 0,
      likes: Math.floor(Math.random() * 200) + 50, // 模拟点赞数
      tags: item.keywords ? item.keywords.split(',').map(k => k.trim()) : ['服装设计'],
      searchKeywords: item.searchKeywords || '',
      isLimitedEdition: item.isLimitedEdition || false,
      createTime: item.createTime,
      updateTime: item.updateTime
    }))
    
    total.value = response.total || 0
    hasInitialized.value = true
  } catch (error) {
    console.error("获取服装设计列表失败:", error)
    designItems.value = []
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
    type: null,
    priceMin: null,
    priceMax: null,
    styles: [],
    colors: [],
    gender: [],
    ageGroup: [],
    season: [],
    material: [],
    special: []
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

// 新增的过滤方法
const toggleGender = (genderValue: string) => {
  const index = filters.value.gender.indexOf(genderValue)
  if (index > -1) {
    filters.value.gender.splice(index, 1)
  } else {
    filters.value.gender.push(genderValue)
  }
}

const toggleAgeGroup = (ageGroupValue: string) => {
  const index = filters.value.ageGroup.indexOf(ageGroupValue)
  if (index > -1) {
    filters.value.ageGroup.splice(index, 1)
  } else {
    filters.value.ageGroup.push(ageGroupValue)
  }
}

const toggleSeason = (seasonValue: string) => {
  const index = filters.value.season.indexOf(seasonValue)
  if (index > -1) {
    filters.value.season.splice(index, 1)
  } else {
    filters.value.season.push(seasonValue)
  }
}

const toggleMaterial = (materialValue: string) => {
  const index = filters.value.material.indexOf(materialValue)
  if (index > -1) {
    filters.value.material.splice(index, 1)
  } else {
    filters.value.material.push(materialValue)
  }
}

const toggleSpecial = (specialValue: string) => {
  const index = filters.value.special.indexOf(specialValue)
  if (index > -1) {
    filters.value.special.splice(index, 1)
  } else {
    filters.value.special.push(specialValue)
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

// 应用筛选条件
const applyFilters = () => {
  // 如果有搜索结果，重新搜索
  if (hasSearched.value) {
    performSearch()
  }
  // 关闭过滤菜单
  showFilterMenu.value = false
}


const toggleMobileSidebar = () => {
  emit('toggle-mobile-sidebar')
}

// 初始化搜索
onMounted(() => {
  if (props.searchQuery.trim()) {
    performSearch()
  }
})

// 移除自动搜索监听，改为手动触发
// watch(() => props.searchQuery, (newQuery) => {
//   if (newQuery.trim()) {
//     performSearch()
//   } else {
//     searchResults.value = []
//     hasSearched.value = false
//     totalResults.value = 0
//   }
// })


// 获取颜色值
const getColorValue = (colorKey: string) => {
  const colorMap: Record<string, string> = {
    'black': '#000000',
    'white': '#FFFFFF',
    'red': '#FF0000',
    'blue': '#0000FF',
    'green': '#00FF00',
    'yellow': '#FFFF00',
    'pink': '#FF69B4',
    'purple': '#800080',
    'gray': '#808080',
    'brown': '#8B4513',
    'beige': '#F5F5DC',
    'navy': '#000080'
  }
  return colorMap[colorKey] || '#808080'
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
  
  // 性别关键词
  if (filters.value.gender) {
    addKeywordsFromFilter(filters.value.gender, filterOptions.gender)
  }
  
  // 年龄群体关键词
  if (filters.value.ageGroup) {
    addKeywordsFromFilter(filters.value.ageGroup, filterOptions.ageGroup)
  }
  
  // 风格关键词
  if (filters.value.styles) {
    addKeywordsFromFilter(filters.value.styles, filterOptions.style)
  }
  
  // 季节关键词
  if (filters.value.season) {
    addKeywordsFromFilter(filters.value.season, filterOptions.season)
  }
  
  // 材质关键词
  if (filters.value.material) {
    addKeywordsFromFilter(filters.value.material, filterOptions.material)
  }
  
  // 颜色关键词
  if (filters.value.colors) {
    addKeywordsFromFilter(filters.value.colors, filterOptions.color)
  }
  
  // 特殊标签关键词
  if (filters.value.special) {
    addKeywordsFromFilter(filters.value.special, filterOptions.special)
  }
  
  return keywords.join(' ')
}

// 获取设计项目列表
const fetchDesignItems = async () => {
  loading.value = true
  try {
    const { $customFetch } = useNuxtApp()
    const requestBody: any = {
      currentPage: currentPage.value,
      pageSize: pageSize.value,
      isPublish: true, // 传入true，代表是公开的内容
    }
    
    // 添加搜索关键词
    const searchKeywords = buildSearchKeywords()
    if (searchKeywords.trim()) {
      requestBody.search = searchKeywords.trim()
    }
    
    // 添加商品类型过滤
    if (filters.value.type) {
      requestBody.type = filters.value.type
    }
    
    // 添加价格范围过滤
    if (filters.value.priceMin !== null || filters.value.priceMax !== null) {
      if (filters.value.priceMin !== null && filters.value.priceMax !== null) {
        requestBody.priceMin = filters.value.priceMin
        requestBody.priceMax = filters.value.priceMax
      } else if (filters.value.priceMin !== null) {
        requestBody.priceMin = filters.value.priceMin
      } else if (filters.value.priceMax !== null) {
        requestBody.priceMax = filters.value.priceMax
      }
    }
    
    // 添加排序
    if (filters.value.sort) {
      const sortOption = filterOptions.sort.find(s => s.value === filters.value.sort)
      if (sortOption && sortOption.apiValue) {
        requestBody.sort = sortOption.apiValue
      }
    }
    
    console.log('请求参数:', requestBody)
    
    const response = await $customFetch("/product/page", {
      method: "POST",
      body: requestBody,
    })
    
    console.log('API响应:', response)
    
    // 转换数据格式以适配设计项目显示
    designItems.value = (response.list || []).map(item => ({
      id: item.id,
      title: item.name || '未命名商品',
      description: item.description || '精美的服装设计作品',
      image: item.customModel?.thumbnail || (item.images && item.images[0]) || 'https://via.placeholder.com/300x400/ff6b6b/ffffff?text=Clothing',
      price: item.price || 0,
      salePrice: item.salePrice || item.price || 0,
      likes: Math.floor(Math.random() * 200) + 50, // 模拟点赞数
      tags: item.keywords ? item.keywords.split(',').map(k => k.trim()) : ['服装设计'],
      searchKeywords: item.searchKeywords || '',
      isLimitedEdition: item.isLimitedEdition || false,
      isActive: item.isActive !== false
    }))
    
    total.value = response.total || 0
    hasInitialized.value = true
  } catch (error) {
    console.error("获取服装设计列表失败:", error)
    designItems.value = []
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
watch(() => filters.value, () => {
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

  // 价格范围滑块样式
  .price-range-slider {
    width: 100%;
    min-width: 300px;
    
    .price-display {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
      color: var(--text-secondary);
      
      .price-min, .price-max {
        font-weight: 600;
        color: var(--theme-primary);
      }
      
      .price-separator {
        color: var(--text-tertiary);
        margin: 0 0.5rem;
      }
    }
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
    gap: 0.75rem;
  }

  .color-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    
    &:hover {
      background: var(--bg-hover);
      transform: translateY(-1px);
    }
    
    &.color-selected {
      background: var(--bg-active);
      box-shadow: 0 0 0 2px var(--theme-primary);
    }
    
    .color-circle {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 2px solid var(--border-primary);
      transition: all 0.3s ease;
    }
    
    .color-text {
      font-size: 0.75rem;
      color: var(--text-secondary);
      text-align: center;
      white-space: nowrap;
    }
    
    &.color-selected .color-text {
      color: var(--text-primary);
      font-weight: 600;
    }
  }

  .filter-actions {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    margin-left: auto;
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
          min-height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          
          &.loading {
            min-height: 120px;
          }
          
          .clothing-image {
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
    
    .filter-row {
      flex-direction: column;
      align-items: stretch;
      gap: 1rem;
    }
    
    .filter-group {
      min-width: auto;
    }
    
    // 移动端价格滑块优化
    .price-range-slider {
      min-width: auto;
      width: 100%;
    }
    
    // 移动端芯片容器优化
    .chips-container {
      gap: 0.375rem;
    }
    
    .filter-chip {
      font-size: 0.8rem;
      padding: 0.25rem 0.5rem;
    }
    
    // 移动端颜色选择器优化
    .color-picker {
      gap: 0.5rem;
    }
    
    .color-option {
      .color-circle {
        width: 20px;
        height: 20px;
      }
      
      .color-text {
        font-size: 0.7rem;
      }
    }
    
    // 移动端操作按钮优化
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
