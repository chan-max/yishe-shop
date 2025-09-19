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
      <div class="design-grid">
        <div v-for="item in designItems" :key="item.id" class="design-card">
          <div class="design-image">
            <img :src="item.image" :alt="item.title" />
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
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'

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

// 设计项目数据
const designItems = ref([
  {
    id: 1,
    title: '简约连衣裙设计',
    description: '优雅简约的夏季连衣裙，适合日常穿着',
    image: 'https://via.placeholder.com/300x400/ff6b6b/ffffff?text=Dress+1',
    price: 299,
    likes: 128,
    tags: ['连衣裙', '简约', '夏季']
  },
  {
    id: 2,
    title: '商务西装套装',
    description: '专业商务场合的经典西装设计',
    image: 'https://via.placeholder.com/300x400/4ecdc4/ffffff?text=Suit+1',
    price: 899,
    likes: 89,
    tags: ['西装', '商务', '正式']
  },
  {
    id: 3,
    title: '运动休闲T恤',
    description: '舒适透气的运动休闲T恤设计',
    image: 'https://via.placeholder.com/300x400/45b7d1/ffffff?text=T-Shirt+1',
    price: 199,
    likes: 156,
    tags: ['T恤', '运动', '休闲']
  },
  {
    id: 4,
    title: '复古牛仔外套',
    description: '经典复古风格的牛仔外套设计',
    image: 'https://via.placeholder.com/300x400/96ceb4/ffffff?text=Jacket+1',
    price: 599,
    likes: 203,
    tags: ['外套', '牛仔', '复古']
  },
  {
    id: 5,
    title: '优雅晚礼服',
    description: '正式场合的优雅晚礼服设计',
    image: 'https://via.placeholder.com/300x400/feca57/ffffff?text=Evening+1',
    price: 1299,
    likes: 67,
    tags: ['晚礼服', '正式', '优雅']
  },
  {
    id: 6,
    title: '街头风格卫衣',
    description: '时尚街头风格的连帽卫衣设计',
    image: 'https://via.placeholder.com/300x400/ff9ff3/ffffff?text=Hoodie+1',
    price: 399,
    likes: 178,
    tags: ['卫衣', '街头', '时尚']
  }
])
</script>

<style lang="scss" scoped>
@use '../styles/content-areas.scss';

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
    .design-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    
    .design-card {
      background: #2a2a2a;
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
      }
      
      .design-image {
        position: relative;
        aspect-ratio: 3/4;
        overflow: hidden;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .design-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        &:hover .design-overlay {
          opacity: 1;
        }
      }
      
      .design-info {
        padding: 1rem;
        
        .design-title {
          font-size: 1rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }
        
        .design-description {
          color: #b0b0b0;
          font-size: 0.85rem;
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }
        
        .design-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
          
          .design-tag {
            font-size: 0.75rem;
          }
        }
        
        .design-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          
          .design-price {
            font-size: 1.1rem;
            font-weight: 600;
            color: #3b82f6;
          }
          
          .design-likes {
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
</style>
