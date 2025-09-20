<template>
  <div class="materials-page">
    <!-- 素材页面头部 -->
    <MaterialsHeader 
      :search-query="searchQuery"
      :show-filter-menu="showFilterMenu"
      @update:search-query="searchQuery = $event"
      @toggle-filter="toggleFilterMenu"
      @search="performSearch"
    />
    
    <!-- 过滤菜单 -->
    <SearchFilter 
      :show="showFilterMenu"
      :filters="materialFilters"
      @update:show="showFilterMenu = $event"
      @clear="clearFilters"
      @apply="applyFilters"
    />
    
    <!-- 素材内容区域 -->
    <MaterialsContent 
      :material-items="materialItems"
      :loading="loading"
      :has-searched="hasSearched"
      :total-results="totalResults"
      :current-page="currentPage"
      :page-size="pageSize"
      @load-more="loadMoreItems"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import MaterialsHeader from '../components/headers/MaterialsHeader.vue'
import SearchFilter from '../components/SearchFilter.vue'
import MaterialsContent from '../search-content/MaterialsContent.vue'
import type { FilterItem } from '../components/FilterRow.vue'

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
  isPublic: boolean
  keyword?: string
  suffix?: string
  group?: string
  sortingFields?: string
}

// 搜索相关状态
const searchQuery = ref('')
const showFilterMenu = ref(false)
const loading = ref(false)
const hasSearched = ref(false)

// 分页相关状态
const currentPage = ref(1)
const pageSize = ref(12)
const totalResults = ref(0)

// 数据状态
const materialItems = ref<MaterialItem[]>([])

// 素材筛选配置
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

// 获取素材列表
const fetchMaterialItems = async () => {
  loading.value = true
  try {
    const { $customFetch } = useNuxtApp()
    
    // 构建请求参数，参考 sticker.service.ts 中的 getPage 方法
    const requestBody: RequestBody = {
      currentPage: currentPage.value,
      pageSize: pageSize.value,
      isPublic: true // 只查询公开数据
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
    
    totalResults.value = response.total || 0
    hasSearched.value = true
  } catch (error) {
    console.error("获取素材列表失败:", error)
  } finally {
    loading.value = false
  }
}

// 搜索处理
const performSearch = () => {
  currentPage.value = 1
  fetchMaterialItems()
}

// 加载更多
const loadMoreItems = () => {
  currentPage.value++
  fetchMaterialItems()
}

// 切换过滤菜单
const toggleFilterMenu = () => {
  showFilterMenu.value = !showFilterMenu.value
}

// 清除筛选
const clearFilters = () => {
  Object.keys(filters).forEach(key => {
    if (key === 'colors') {
      filters[key] = []
    } else {
      filters[key] = ''
    }
  })
  currentPage.value = 1
  fetchMaterialItems()
}

// 应用筛选
const applyFilters = () => {
  currentPage.value = 1
  fetchMaterialItems()
  showFilterMenu.value = false
}

// 监听筛选条件变化
watch(filters, () => {
  currentPage.value = 1
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
.materials-page {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
