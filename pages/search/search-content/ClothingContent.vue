<template>
  <div class="clothing-content">

    <!-- 服装设计内容主体 -->
    <div class="content-body">
      <!-- 加载状态 -->
      <LoadingSpinner 
        v-if="loading || !hasInitialized" 
        text="正在加载服装设计作品..."
      />
      
      <!-- 空状态 -->
      <EmptyState 
        v-else-if="designItems.length === 0"
        icon="mdi-tshirt-crew-outline"
        title="暂无服装设计作品"
        description="请尝试调整筛选条件或稍后再试"
      />
      
      <!-- 瀑布流布局 -->
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
                  <h3 class="clothing-title" :title="item.title">
                    {{ item.title }}
                  </h3>
                  
                  <!-- 描述信息 -->
                  <p 
                    class="clothing-description" 
                    v-if="item.description"
                  >
                    {{ item.description }}
                  </p>
                  
                  <!-- 标签信息 -->
                  <div class="clothing-tags" v-if="item.tags && item.tags.length > 0">
                    <div class="tags-label">标签：</div>
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
import ImageCard from '../components/ImageCard.vue'
import FilterRow from '../components/FilterRow.vue'
import type { FilterItem } from '../components/FilterRow.vue'
import ContentPagination from '../components/ContentPagination.vue'

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

// 筛选状态
const filters = reactive({
  clothingType: '',
  season: '',
  style: '',
  price: '',
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

// 图片高度状态
const imageHeights = ref<Record<string, number>>({})

// 检查是否为小图片
const isSmallImage = (itemId: string) => {
  const height = imageHeights.value[itemId]
  return height && height < 150
}

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
  }
  
  .content-body {
    .clothing-masonry {
      // 瀑布流项目样式
      :deep(.masonry-item) {
        .clothing-card {
          width: 100%;
          height: 100%;
          border-radius: 12px;
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
}

</style>
