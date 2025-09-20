<template>
  <div class="materials-content">
    <!-- 素材图专用头部 -->
    <div class="content-header">
      <h2 class="content-title">
        <v-icon left>mdi-image-multiple-outline</v-icon>
        素材图库
      </h2>
      <p class="content-subtitle">高质量设计素材，助力您的创意项目</p>
    </div>

    <!-- 素材图专用筛选 -->
    <div class="content-filters">
      <div class="filter-row">
        <div class="filter-group">
          <label class="filter-label">素材类型</label>
          <v-select
            v-model="filters.materialType"
            :items="materialTypes"
            placeholder="选择类型"
            variant="outlined"
            density="compact"
            class="filter-select"
          />
        </div>
        
        <div class="filter-group">
          <label class="filter-label">文件格式</label>
          <v-select
            v-model="filters.format"
            :items="formats"
            placeholder="选择格式"
            variant="outlined"
            density="compact"
            class="filter-select"
          />
        </div>
        
        <div class="filter-group">
          <label class="filter-label">分组</label>
          <v-select
            v-model="filters.group"
            :items="groups"
            placeholder="选择分组"
            variant="outlined"
            density="compact"
            class="filter-select"
          />
        </div>
        
        <div class="filter-group">
          <label class="filter-label">颜色</label>
          <div class="color-picker">
            <div
              v-for="color in colorOptions"
              :key="color.value"
              class="color-option"
              :class="{ active: filters.colors.includes(color.value) }"
              :style="{ backgroundColor: color.color }"
              @click="toggleColor(color.value)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 素材图内容主体 -->
    <div class="content-body">
      <!-- 加载状态 -->
      <div v-if="loading || !hasInitialized" class="loading-container">
        <div class="loading-spinner">
          <div class="spinner"></div>
          <p class="loading-text">正在加载素材图库...</p>
        </div>
      </div>
      
      <!-- 错误状态 -->
      <div v-else-if="error" class="error-state">
        <v-icon size="64" color="error">mdi-alert-circle-outline</v-icon>
        <h3 class="error-title">加载失败</h3>
        <p class="error-description">{{ error }}</p>
        <v-btn color="primary" @click="fetchMaterialItems" class="retry-btn">
          <v-icon left>mdi-refresh</v-icon>
          重试
        </v-btn>
      </div>
      
      <!-- 空状态 -->
      <div v-else-if="materialItems.length === 0" class="empty-state">
        <v-icon size="64" color="grey-lighten-1">mdi-image-multiple-outline</v-icon>
        <h3 class="empty-title">暂无素材图片</h3>
        <p class="empty-description">请尝试调整筛选条件或稍后再试</p>
      </div>
      
      <!-- 素材图网格 -->
      <div v-else class="materials-grid">
        <div v-for="item in materialItems" :key="item.id" class="material-card">
          <div class="material-image">
            <!-- 有图片时显示图片 -->
            <img
              v-if="hasValidImage(item)"
              :src="item.image"
              :alt="item.title"
              @load="onImageLoad($event, item.id)"
              @error="onImageError($event, item.id)"
              :class="{ 'opacity-0': !getImageLoadStatus(item.id) }"
            />
            
            <!-- 没有图片时显示空状态 -->
            <div 
              v-else
              class="empty-image"
            >
              <v-icon size="48" color="grey-lighten-2">mdi-image-outline</v-icon>
              <p class="empty-image-text">暂无图片</p>
            </div>
            
            <!-- 图片加载中的波浪效果 -->
            <div 
              v-if="hasValidImage(item) && !getImageLoadStatus(item.id)"
              class="image-loading"
            >
              <div class="loading-waves">
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
              </div>
            </div>
            
            <div class="material-overlay">
              <v-btn icon="mdi-eye" variant="text" class="preview-btn" />
              <v-btn icon="mdi-download" variant="text" class="download-btn" />
              <v-btn icon="mdi-heart-outline" variant="text" class="favorite-btn" />
            </div>
            <div class="material-badge">
              <v-chip size="small" color="primary">{{ item.format }}</v-chip>
            </div>
          </div>
          <div class="material-info">
            <h3 class="material-title">{{ item.title }}</h3>
            <p class="material-description">{{ item.description }}</p>
            <div class="material-specs">
              <span class="spec-item">
                <v-icon size="small">mdi-file</v-icon>
                {{ item.format }}
              </span>
              <span class="spec-item">
                <v-icon size="small">mdi-tag</v-icon>
                {{ item.group || '未分组' }}
              </span>
            </div>
            <div class="material-meta">
              <span class="material-price">{{ item.price === 0 ? '免费' : `¥${item.price}` }}</span>
              <span class="material-downloads">
                <v-icon size="small">mdi-download</v-icon>
                {{ item.downloads || 0 }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 分页 -->
      <div v-if="materialItems.length > 0" class="pagination-container">
        <v-pagination
          v-model="currentPage"
          :length="Math.ceil(total / pageSize)"
          :total-visible="7"
          rounded="circle"
          color="primary"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'

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

// 筛选选项 - 根据 sticker 接口的实际数据优化
const materialTypes = [
  { text: '背景图', value: 'background' },
  { text: '纹理', value: 'texture' },
  { text: '图标', value: 'icon' },
  { text: '插画', value: 'illustration' },
  { text: '照片', value: 'photo' },
  { text: '贴纸', value: 'sticker' },
  { text: '装饰', value: 'decoration' }
]

const formats = [
  { text: 'PNG', value: 'png' },
  { text: 'JPG', value: 'jpg' },
  { text: 'JPEG', value: 'jpeg' },
  { text: 'SVG', value: 'svg' },
  { text: 'GIF', value: 'gif' },
  { text: 'WEBP', value: 'webp' },
  { text: 'BMP', value: 'bmp' }
]

const groups = [
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

const colorOptions = [
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

// 筛选状态
const filters = reactive({
  materialType: '',
  format: '',
  group: '',
  colors: [] as string[]
})

// 分页相关状态
const currentPage = ref(1)
const pageSize = ref(12)
const total = ref(0)
const loading = ref(false)
const hasInitialized = ref(false)
const error = ref('')

// 素材项目数据
const materialItems = ref<MaterialItem[]>([])

// 图片加载状态
const imageLoaded = ref<Record<string, boolean>>({})

// 切换颜色选择
const toggleColor = (color: string) => {
  const index = filters.colors.indexOf(color)
  if (index > -1) {
    filters.colors.splice(index, 1)
  } else {
    filters.colors.push(color)
  }
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
      // 移除 isPublic 限制，允许查询所有数据
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
    if (filters.colors.length > 0) {
      const colorKeywords = filters.colors.map(color => {
        const colorOption = colorOptions.find(opt => opt.value === color)
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
  .content-header {
    margin-bottom: 2rem;
    
    .content-title {
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      font-weight: 600;
      color: #ffffff;
      margin-bottom: 0.5rem;
    }
    
    .content-subtitle {
      color: #b0b0b0;
      font-size: 0.9rem;
    }
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
            box-shadow: 0 0 0 2px #e55a2b;
          }
        }
      }
    }
  }
  
  .content-body {
    .loading-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 300px;
      
      .loading-spinner {
        text-align: center;
        
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #e55a2b;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }
        
        .loading-text {
          color: #b0b0b0;
          font-size: 0.9rem;
        }
      }
    }
    
    .error-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 300px;
      text-align: center;
      
      .error-title {
        font-size: 1.2rem;
        font-weight: 600;
        color: #ff6b6b;
        margin: 1rem 0 0.5rem;
      }
      
      .error-description {
        color: #b0b0b0;
        font-size: 0.9rem;
        margin-bottom: 1.5rem;
      }
      
      .retry-btn {
        margin-top: 1rem;
      }
    }
    
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 300px;
      text-align: center;
      
      .empty-title {
        font-size: 1.2rem;
        font-weight: 600;
        color: #ffffff;
        margin: 1rem 0 0.5rem;
      }
      
      .empty-description {
        color: #b0b0b0;
        font-size: 0.9rem;
      }
    }
    
    .materials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    
    .pagination-container {
      display: flex;
      justify-content: center;
      margin-top: 2rem;
    }
    
    .material-card {
      background: #2a2a2a;
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
      }
      
      .material-image {
        position: relative;
        aspect-ratio: 4/3;
        overflow: hidden;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.3s ease;
        }
        
        .empty-image {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
          
          .empty-image-text {
            margin-top: 0.5rem;
            font-size: 0.8rem;
            color: #999;
          }
        }
        
        .image-loading {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          
          .loading-waves {
            display: flex;
            gap: 4px;
            
            .wave {
              width: 4px;
              height: 20px;
              background: #ccc;
              border-radius: 2px;
              animation: wave 1.5s ease-in-out infinite;
              
              &:nth-child(1) { animation-delay: 0s; }
              &:nth-child(2) { animation-delay: 0.2s; }
              &:nth-child(3) { animation-delay: 0.4s; }
            }
          }
        }
        
        .material-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        &:hover .material-overlay {
          opacity: 1;
        }
        
        .material-badge {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
        }
      }
      
      .material-info {
        padding: 1rem;
        
        .material-title {
          font-size: 1rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }
        
        .material-description {
          color: #b0b0b0;
          font-size: 0.85rem;
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }
        
        .material-specs {
          display: flex;
          gap: 1rem;
          margin-bottom: 0.75rem;
          
          .spec-item {
            display: flex;
            align-items: center;
            gap: 0.25rem;
            color: #b0b0b0;
            font-size: 0.8rem;
          }
        }
        
        .material-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          
          .material-price {
            font-size: 1.1rem;
            font-weight: 600;
            color: #e55a2b;
          }
          
          .material-downloads {
            display: flex;
            align-items: center;
            gap: 0.25rem;
            color: #b0b0b0;
            font-size: 0.85rem;
          }
        }
      }
    }
  }
}

// 动画关键帧
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes wave {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(1.5); }
}
</style>
