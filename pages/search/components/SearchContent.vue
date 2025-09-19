<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-09-18 21:32:42
 * @FilePath: /yishe-nuxt/pages/search/components/SearchContent.vue
 * @Description: 搜索页面内容组件
-->
<script lang="ts" setup>
interface Props {
  searchResults: any[]
  loading: boolean
  hasSearched: boolean
  totalResults: number
  currentPage: number
  pageSize: number
}

interface Emits {
  (e: 'loadMore'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// 照片墙数据
const photoWallData = ref<any[]>([])
const loadingMore = ref(false)

// 初始化照片墙数据
const initPhotoWall = () => {
  const mockPhotos = [
    {
      id: 1,
      title: '优雅连衣裙设计',
      description: '经典优雅的连衣裙设计，适合正式场合',
      image: 'https://picsum.photos/300/400?random=1',
      likes: 1234,
      views: 5678
    },
    {
      id: 2,
      title: '时尚休闲装',
      description: '现代时尚的休闲装设计',
      image: 'https://picsum.photos/350/450?random=2',
      likes: 987,
      views: 3456
    },
    {
      id: 3,
      title: '商务正装系列',
      description: '专业商务场合的正式着装',
      image: 'https://picsum.photos/400/500?random=3',
      likes: 2100,
      views: 7890
    },
    {
      id: 4,
      title: '运动休闲风',
      description: '舒适运动的休闲风格设计',
      image: 'https://picsum.photos/300/450?random=4',
      likes: 1456,
      views: 3456
    },
    {
      id: 5,
      title: '复古牛仔系列',
      description: '经典永不过时的牛仔风格',
      image: 'https://picsum.photos/300/450?random=5',
      likes: 1456,
      views: 2789
    },
    {
      id: 6,
      title: '优雅晚礼服',
      description: '华丽晚宴的完美选择',
      image: 'https://picsum.photos/350/600?random=6',
      likes: 2789,
      views: 4567
    },
    {
      id: 7,
      title: '街头潮流风',
      description: '年轻时尚的街头文化',
      image: 'https://picsum.photos/400/450?random=7',
      likes: 1678,
      views: 3123
    },
    {
      id: 8,
      title: '简约基础款',
      description: '百搭实用的基础单品',
      image: 'https://picsum.photos/300/400?random=8',
      likes: 987,
      views: 1987
    },
    {
      id: 9,
      title: '民族风情设计',
      description: '独特的民族元素融合',
      image: 'https://picsum.photos/350/500?random=9',
      likes: 1234,
      views: 2345
    },
    {
      id: 10,
      title: '未来科技感',
      description: '前卫的科技时尚风格',
      image: 'https://picsum.photos/400/500?random=10',
      likes: 2100,
      views: 3789
    },
    {
      id: 11,
      title: '自然田园风',
      description: '清新自然的田园风格',
      image: 'https://picsum.photos/300/450?random=11',
      likes: 1456,
      views: 2567
    },
    {
      id: 12,
      title: '奢华皮草系列',
      description: '高端奢华的皮草设计',
      image: 'https://picsum.photos/350/600?random=12',
      likes: 3456,
      views: 5678
    }
  ]
  
  photoWallData.value = mockPhotos
}

// 加载更多照片
const loadMorePhotos = async () => {
  loadingMore.value = true
  
  // 模拟加载延迟
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // 生成更多模拟数据
  const newPhotos = []
  for (let i = 0; i < 8; i++) {
    const id = photoWallData.value.length + i + 1
    newPhotos.push({
      id,
      title: `设计作品 ${id}`,
      description: `创意设计作品，展现独特风格`,
      image: `https://picsum.photos/${300 + Math.random() * 100}/${400 + Math.random() * 200}?random=${id}`,
      likes: Math.floor(Math.random() * 3000) + 500,
      views: Math.floor(Math.random() * 5000) + 1000
    })
  }
  
  photoWallData.value.push(...newPhotos)
  loadingMore.value = false
}

// 初始化
onMounted(() => {
  initPhotoWall()
})

// 处理加载更多
const handleLoadMore = () => {
  emit('loadMore')
}
</script>

<template>
  <div class="content-area">
    <!-- 搜索结果 -->
    <div v-if="hasSearched" class="search-results">
      <div class="results-header">
        <h2 class="results-title">
          搜索结果
          <span class="results-count">({{ totalResults }} 个结果)</span>
        </h2>
      </div>
      
      <div v-if="loading" class="loading-container">
        <v-progress-circular indeterminate color="primary" size="48" />
        <p class="loading-text">正在搜索...</p>
      </div>
      
      <div v-else-if="searchResults.length === 0" class="no-results">
        <v-icon class="no-results-icon">mdi-magnify-close</v-icon>
        <h3 class="no-results-title">未找到相关结果</h3>
        <p class="no-results-text">请尝试其他关键词或调整筛选条件</p>
      </div>
      
      <div v-else class="results-grid">
        <div
          v-for="item in searchResults"
          :key="item.id"
          class="result-item"
        >
          <div class="result-image">
            <img :src="item.image" :alt="item.title" />
            <div class="result-overlay">
              <v-btn class="like-btn" variant="text" size="small" icon>
                <v-icon>mdi-heart-outline</v-icon>
              </v-btn>
              <v-btn class="view-btn" variant="text" size="small" icon>
                <v-icon>mdi-eye-outline</v-icon>
              </v-btn>
            </div>
          </div>
          <div class="result-info">
            <h3 class="result-title">{{ item.title }}</h3>
            <p class="result-description">{{ item.description }}</p>
            <div class="result-stats">
              <span class="stat-item">
                <v-icon size="small">mdi-heart</v-icon>
                {{ item.likes }}
              </span>
              <span class="stat-item">
                <v-icon size="small">mdi-eye</v-icon>
                {{ item.views }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 照片墙展示 -->
    <div v-else class="photo-wall">
      <div class="wall-header">
        <h2 class="wall-title">精选设计作品</h2>
        <p class="wall-subtitle">发现更多创意设计</p>
      </div>
      
      <div class="wall-grid">
        <div
          v-for="photo in photoWallData"
          :key="photo.id"
          class="wall-item"
        >
          <div class="wall-image">
            <img :src="photo.image" :alt="photo.title" />
            <div class="wall-overlay">
              <v-btn class="like-btn" variant="text" size="small" icon>
                <v-icon>mdi-heart-outline</v-icon>
              </v-btn>
              <v-btn class="view-btn" variant="text" size="small" icon>
                <v-icon>mdi-eye-outline</v-icon>
              </v-btn>
            </div>
          </div>
          <div class="wall-info">
            <h3 class="wall-item-title">{{ photo.title }}</h3>
            <p class="wall-item-description">{{ photo.description }}</p>
            <div class="wall-stats">
              <span class="stat-item">
                <v-icon size="small">mdi-heart</v-icon>
                {{ photo.likes }}
              </span>
              <span class="stat-item">
                <v-icon size="small">mdi-eye</v-icon>
                {{ photo.views }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 加载更多按钮 -->
      <div class="load-more-container">
        <v-btn
          @click="handleLoadMore"
          :loading="loadingMore"
          variant="outlined"
          size="large"
          class="load-more-btn"
        >
          {{ loadingMore ? '加载中...' : '加载更多' }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/search-content.scss';
</style>
