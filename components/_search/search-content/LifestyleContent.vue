<template>
  <div class="lifestyle-content">
    <!-- 生活用品设计专用头部 -->
    <div class="content-header">
      <h2 class="content-title">
        <v-icon left>mdi-home-variant-outline</v-icon>
        生活用品设计
      </h2>
      <p class="content-subtitle">创意生活用品设计，让生活更美好</p>
    </div>

    <!-- 生活用品设计专用筛选 -->
    <div class="content-filters">
      <div class="filter-row">
        <div class="filter-group">
          <label class="filter-label">产品类别</label>
          <v-select
            v-model="filters.category"
            :items="categories"
            placeholder="选择类别"
            variant="outlined"
            density="compact"
            class="filter-select"
          />
        </div>
        
        <div class="filter-group">
          <label class="filter-label">材质</label>
          <v-select
            v-model="filters.material"
            :items="materials"
            placeholder="选择材质"
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

    <!-- 生活用品设计内容主体 -->
    <div class="content-body">
      <div class="products-grid">
        <div v-for="item in productItems" :key="item.id" class="product-card">
          <div class="product-image">
            <img :src="item.image" :alt="item.title" />
            <div class="product-overlay">
              <v-btn icon="mdi-eye" variant="text" class="preview-btn" />
              <v-btn icon="mdi-cart-plus" variant="text" class="cart-btn" />
              <v-btn icon="mdi-heart-outline" variant="text" class="favorite-btn" />
            </div>
            <div class="product-badge" v-if="item.isNew">
              <v-chip size="small" color="success">新品</v-chip>
            </div>
          </div>
          <div class="product-info">
            <h3 class="product-title">{{ item.title }}</h3>
            <p class="product-description">{{ item.description }}</p>
            <div class="product-specs">
              <span class="spec-item">
                <v-icon size="small">mdi-palette</v-icon>
                {{ item.color }}
              </span>
              <span class="spec-item">
                <v-icon size="small">mdi-scale</v-icon>
                {{ item.size }}
              </span>
              <span class="spec-item">
                <v-icon size="small">mdi-cube</v-icon>
                {{ item.material }}
              </span>
            </div>
            <div class="product-meta">
              <div class="product-price">
                <span class="current-price">¥{{ item.price }}</span>
                <span v-if="item.originalPrice" class="original-price">¥{{ item.originalPrice }}</span>
              </div>
              <div class="product-rating">
                <v-rating
                  :model-value="item.rating"
                  size="small"
                  color="blue"
                  readonly
                  density="compact"
                />
                <span class="rating-text">({{ item.reviews }})</span>
              </div>
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
const categories = [
  { text: '厨房用品', value: 'kitchen' },
  { text: '卫浴用品', value: 'bathroom' },
  { text: '收纳用品', value: 'storage' },
  { text: '装饰用品', value: 'decoration' },
  { text: '办公用品', value: 'office' }
]

const materials = [
  { text: '陶瓷', value: 'ceramic' },
  { text: '玻璃', value: 'glass' },
  { text: '金属', value: 'metal' },
  { text: '塑料', value: 'plastic' },
  { text: '木质', value: 'wood' },
  { text: '竹制', value: 'bamboo' }
]

const styles = [
  { text: '简约', value: 'minimal' },
  { text: '北欧', value: 'nordic' },
  { text: '日式', value: 'japanese' },
  { text: '工业风', value: 'industrial' },
  { text: '复古', value: 'vintage' }
]

// 筛选状态
const filters = reactive({
  category: '',
  material: '',
  style: '',
  priceMin: null,
  priceMax: null
})

// 产品项目数据
const productItems = ref([
  {
    id: 1,
    title: '简约陶瓷马克杯',
    description: '手工制作的简约风格陶瓷马克杯',
    image: 'https://via.placeholder.com/300x300/ff6b6b/ffffff?text=Mug+1',
    price: 89,
    originalPrice: 129,
    color: '白色',
    size: '350ml',
    material: '陶瓷',
    rating: 4.5,
    reviews: 128,
    isNew: true
  },
  {
    id: 2,
    title: '北欧风收纳盒',
    description: '多功能收纳盒，适合桌面整理',
    image: 'https://via.placeholder.com/300x300/4ecdc4/ffffff?text=Box+1',
    price: 159,
    color: '原木色',
    size: '20x15x10cm',
    material: '木质',
    rating: 4.8,
    reviews: 89,
    isNew: false
  },
  {
    id: 3,
    title: '玻璃花瓶套装',
    description: '现代简约的玻璃花瓶三件套',
    image: 'https://via.placeholder.com/300x300/45b7d1/ffffff?text=Vase+1',
    price: 299,
    color: '透明',
    size: '不同尺寸',
    material: '玻璃',
    rating: 4.6,
    reviews: 67,
    isNew: true
  },
  {
    id: 4,
    title: '金属书签套装',
    description: '精美金属书签，适合阅读爱好者',
    image: 'https://via.placeholder.com/300x300/96ceb4/ffffff?text=Bookmark+1',
    price: 49,
    color: '金色',
    size: '15cm',
    material: '金属',
    rating: 4.7,
    reviews: 203,
    isNew: false
  },
  {
    id: 5,
    title: '竹制餐具套装',
    description: '环保竹制餐具，健康生活首选',
    image: 'https://via.placeholder.com/300x300/feca57/ffffff?text=Utensils+1',
    price: 199,
    color: '自然色',
    size: '6件套',
    material: '竹制',
    rating: 4.9,
    reviews: 156,
    isNew: false
  },
  {
    id: 6,
    title: '创意台灯',
    description: '现代创意台灯，营造温馨氛围',
    image: 'https://via.placeholder.com/300x300/ff9ff3/ffffff?text=Lamp+1',
    price: 399,
    color: '黑色',
    size: '30cm高',
    material: '金属+塑料',
    rating: 4.4,
    reviews: 78,
    isNew: true
  }
])
</script>

<style lang="scss" scoped>
@use './content-areas.scss';

.lifestyle-content {
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
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    
    .product-card {
      background: #2a2a2a;
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
      }
      
      .product-image {
        position: relative;
        aspect-ratio: 1;
        overflow: hidden;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .product-overlay {
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
        
        &:hover .product-overlay {
          opacity: 1;
        }
        
        .product-badge {
          position: absolute;
          top: 0.5rem;
          left: 0.5rem;
        }
      }
      
      .product-info {
        padding: 1rem;
        
        .product-title {
          font-size: 1rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }
        
        .product-description {
          color: #b0b0b0;
          font-size: 0.85rem;
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }
        
        .product-specs {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          margin-bottom: 0.75rem;
          
          .spec-item {
            display: flex;
            align-items: center;
            gap: 0.25rem;
            color: #b0b0b0;
            font-size: 0.8rem;
          }
        }
        
        .product-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          
          .product-price {
            .current-price {
              font-size: 1.1rem;
              font-weight: 600;
              color: #3b82f6;
            }
            
            .original-price {
              font-size: 0.9rem;
              color: #888;
              text-decoration: line-through;
              margin-left: 0.5rem;
            }
          }
          
          .product-rating {
            display: flex;
            align-items: center;
            gap: 0.25rem;
            
            .rating-text {
              color: #b0b0b0;
              font-size: 0.8rem;
            }
          }
        }
      }
    }
  }
}
</style>
