<template>
  <div class="clothing-content">
    <!-- 服装设计专用头部 -->
    <div class="content-header">
      <h2 class="content-title">
        <v-icon left>mdi-tshirt-crew-outline</v-icon>
        服装设计
      </h2>
      <p class="content-subtitle">探索最新的服装设计趋势和创意灵感</p>
    </div>

    <!-- 服装设计专用筛选 -->
    <div class="content-filters">
      <div class="filter-row">
        <div class="filter-group">
          <label class="filter-label">服装类型</label>
          <v-select
            v-model="filters.clothingType"
            :items="clothingTypes"
            placeholder="选择类型"
            variant="outlined"
            density="compact"
            class="filter-select"
          />
        </div>
        
        <div class="filter-group">
          <label class="filter-label">季节</label>
          <v-select
            v-model="filters.season"
            :items="seasons"
            placeholder="选择季节"
            variant="outlined"
            density="compact"
            class="filter-select"
          />
        </div>
        
        <div class="filter-group">
          <label class="filter-label">风格</label>
          <v-select
            v-model="filters.style"
            :items="styles"
            placeholder="选择风格"
            variant="outlined"
            density="compact"
            class="filter-select"
          />
        </div>
        
        <div class="filter-group">
          <label class="filter-label">价格范围</label>
          <div class="price-range">
            <v-text-field
              v-model.number="filters.priceMin"
              placeholder="最低价"
              type="number"
              variant="outlined"
              density="compact"
              class="price-input"
            />
            <span class="price-separator">-</span>
            <v-text-field
              v-model.number="filters.priceMax"
              placeholder="最高价"
              type="number"
              variant="outlined"
              density="compact"
              class="price-input"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 服装设计内容主体 -->
    <div class="content-body">
      <!-- 加载状态 -->
      <div v-if="loading || !hasInitialized" class="loading-container">
        <div class="loading-spinner">
          <div class="spinner"></div>
          <p class="loading-text">正在加载服装设计作品...</p>
        </div>
      </div>
      
      <!-- 空状态 -->
      <div v-else-if="designItems.length === 0" class="empty-state">
        <v-icon size="64" color="grey-lighten-1">mdi-tshirt-crew-outline</v-icon>
        <h3 class="empty-title">暂无服装设计作品</h3>
        <p class="empty-description">请尝试调整筛选条件或稍后再试</p>
      </div>
      
      <!-- 设计作品网格 -->
      <div v-else class="design-grid">
        <div v-for="item in designItems" :key="item.id" class="design-card">
          <div class="design-image">
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
            
            <div class="design-overlay">
              <v-btn icon="mdi-heart-outline" variant="text" class="favorite-btn" />
              <v-btn icon="mdi-download" variant="text" class="download-btn" />
            </div>
          </div>
          <div class="design-info">
            <h3 class="design-title">{{ item.title }}</h3>
            <p class="design-description">{{ item.description }}</p>
            <div class="design-tags">
              <v-chip
                v-for="tag in item.tags"
                :key="tag"
                size="small"
                variant="outlined"
                class="design-tag"
              >
                {{ tag }}
              </v-chip>
            </div>
            <div class="design-meta">
              <span class="design-price">¥{{ item.price }}</span>
              <span class="design-likes">
                <v-icon size="small">mdi-heart</v-icon>
                {{ item.likes }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 分页 -->
      <div v-if="designItems.length > 0" class="pagination-container">
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

// 筛选选项
const clothingTypes = [
  { text: '连衣裙', value: 'dress' },
  { text: '上衣', value: 'top' },
  { text: '下装', value: 'bottom' },
  { text: '外套', value: 'outerwear' },
  { text: '配饰', value: 'accessories' }
]

const seasons = [
  { text: '春季', value: 'spring' },
  { text: '夏季', value: 'summer' },
  { text: '秋季', value: 'autumn' },
  { text: '冬季', value: 'winter' }
]

const styles = [
  { text: '休闲', value: 'casual' },
  { text: '正式', value: 'formal' },
  { text: '运动', value: 'sport' },
  { text: '复古', value: 'vintage' },
  { text: '现代', value: 'modern' }
]

// 筛选状态
const filters = reactive({
  clothingType: '',
  season: '',
  style: '',
  priceMin: null,
  priceMax: null
})

// 分页相关状态
const currentPage = ref(1)
const pageSize = ref(12)
const total = ref(0)
const loading = ref(false)
const hasInitialized = ref(false)

// 设计项目数据
const designItems = ref([])

// 图片加载状态
const imageLoaded = ref({})

// 获取设计项目列表
const fetchDesignItems = async () => {
  loading.value = true
  try {
    const { $customFetch } = useNuxtApp()
    const requestBody = {
      currentPage: currentPage.value,
      pageSize: pageSize.value,
      isPublish: true, // 只查询已上架的商品
    }
    
    // 添加服装相关的过滤条件
    const requestFilters = requestBody.filters || {}
    
    // 服装类型映射
    if (filters.clothingType) {
      const typeMapping = {
        'dress': '连衣裙',
        'top': '上衣',
        'bottom': '下装',
        'outerwear': '外套',
        'accessories': '配饰'
      }
      requestFilters.keyword = typeMapping[filters.clothingType] || filters.clothingType
    }
    
    // 季节筛选
    if (filters.season) {
      const seasonMapping = {
        'spring': '春季',
        'summer': '夏季',
        'autumn': '秋季',
        'winter': '冬季'
      }
      if (!requestFilters.keyword) requestFilters.keyword = ''
      requestFilters.keyword += (requestFilters.keyword ? ' ' : '') + (seasonMapping[filters.season] || filters.season)
    }
    
    // 风格筛选
    if (filters.style) {
      const styleMapping = {
        'casual': '休闲',
        'formal': '正式',
        'sport': '运动',
        'vintage': '复古',
        'modern': '现代'
      }
      if (!requestFilters.keyword) requestFilters.keyword = ''
      requestFilters.keyword += (requestFilters.keyword ? ' ' : '') + (styleMapping[filters.style] || filters.style)
    }
    
    // 价格范围筛选
    if (filters.priceMin !== null || filters.priceMax !== null) {
      if (filters.priceMin !== null && filters.priceMax !== null) {
        requestFilters.price = `${filters.priceMin}-${filters.priceMax}`
      } else if (filters.priceMin !== null) {
        requestFilters.price = `${filters.priceMin}+`
      } else if (filters.priceMax !== null) {
        requestFilters.price = `0-${filters.priceMax}`
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
const onImageLoad = (event, itemId) => {
  imageLoaded.value[itemId] = true
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

// 监听筛选条件变化
watch(filters, () => {
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
      
      .price-range {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        
        .price-input {
          flex: 1;
        }
        
        .price-separator {
          color: #b0b0b0;
          font-weight: 500;
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
    
    .design-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
      // 移除 max-width 限制，让网格自适应占满容器
    }
    
    .pagination-container {
      display: flex;
      justify-content: center;
      margin-top: 2rem;
    }
    
    .design-card {
      background: transparent;
      border-radius: 8px;
      overflow: hidden;
      transition: all 0.3s ease;
      position: relative;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        
        .design-info {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .design-image {
        position: relative;
        aspect-ratio: 4/5;
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
        
        .design-overlay {
          display: none;
        }
      }
      
      .design-info {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
        padding: 1rem 0.75rem 0.75rem;
        opacity: 0;
        transform: translateY(100%);
        transition: all 0.3s ease;
        
        .design-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 0.25rem;
          line-height: 1.2;
        }
        
        .design-description {
          color: #e0e0e0;
          font-size: 0.8rem;
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }
        
        .design-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.25rem;
          margin-bottom: 0.5rem;
          
          .design-tag {
            font-size: 0.7rem;
            background: rgba(255, 255, 255, 0.2);
            color: #ffffff;
          }
        }
        
        .design-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          
          .design-price {
            font-size: 1rem;
            font-weight: 600;
            color: #ff6b35;
          }
          
          .design-likes {
            display: flex;
            align-items: center;
            gap: 0.25rem;
            color: #e0e0e0;
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
