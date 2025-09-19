<template>
  <div class="branding-content">
    <!-- 品牌Logo专用头部 -->
    <div class="content-header">
      <h2 class="content-title">
        <v-icon left>mdi-account-star-outline</v-icon>
        品牌Logo设计
      </h2>
      <p class="content-subtitle">专业品牌标识设计，提升品牌形象</p>
    </div>

    <!-- 品牌Logo专用筛选 -->
    <div class="content-filters">
      <div class="filter-row">
        <div class="filter-group">
          <label class="filter-label">行业类型</label>
          <v-select
            v-model="filters.industry"
            :items="industries"
            placeholder="选择行业"
            variant="outlined"
            density="compact"
            class="filter-select"
          />
        </div>
        
        <div class="filter-group">
          <label class="filter-label">设计风格</label>
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
          <label class="filter-label">颜色方案</label>
          <v-select
            v-model="filters.colorScheme"
            :items="colorSchemes"
            placeholder="选择颜色"
            variant="outlined"
            density="compact"
            class="filter-select"
          />
        </div>
        
        <div class="filter-group">
          <label class="filter-label">复杂度</label>
          <v-select
            v-model="filters.complexity"
            :items="complexities"
            placeholder="选择复杂度"
            variant="outlined"
            density="compact"
            class="filter-select"
          />
        </div>
      </div>
    </div>

    <!-- 品牌Logo内容主体 -->
    <div class="content-body">
      <div class="logos-grid">
        <div v-for="item in logoItems" :key="item.id" class="logo-card">
          <div class="logo-preview">
            <div class="logo-container" :style="{ backgroundColor: item.bgColor }">
              <img :src="item.logo" :alt="item.title" />
            </div>
            <div class="logo-overlay">
              <v-btn icon="mdi-eye" variant="text" class="preview-btn" />
              <v-btn icon="mdi-download" variant="text" class="download-btn" />
              <v-btn icon="mdi-heart-outline" variant="text" class="favorite-btn" />
            </div>
            <div class="logo-badge" v-if="item.isPremium">
              <v-chip size="small" color="warning">专业版</v-chip>
            </div>
          </div>
          <div class="logo-info">
            <h3 class="logo-title">{{ item.title }}</h3>
            <p class="logo-description">{{ item.description }}</p>
            <div class="logo-tags">
              <v-chip
                v-for="tag in item.tags"
                :key="tag"
                size="small"
                variant="outlined"
                class="logo-tag"
              >
                {{ tag }}
              </v-chip>
            </div>
            <div class="logo-specs">
              <span class="spec-item">
                <v-icon size="small">mdi-palette</v-icon>
                {{ item.colorScheme }}
              </span>
              <span class="spec-item">
                <v-icon size="small">mdi-vector-square</v-icon>
                {{ item.format }}
              </span>
            </div>
            <div class="logo-meta">
              <span class="logo-price">{{ item.price === 0 ? '免费' : `¥${item.price}` }}</span>
              <span class="logo-likes">
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
const industries = [
  { text: '科技', value: 'tech' },
  { text: '餐饮', value: 'food' },
  { text: '时尚', value: 'fashion' },
  { text: '金融', value: 'finance' },
  { text: '教育', value: 'education' },
  { text: '医疗', value: 'healthcare' }
]

const styles = [
  { text: '简约', value: 'minimal' },
  { text: '现代', value: 'modern' },
  { text: '复古', value: 'vintage' },
  { text: '手绘', value: 'handdrawn' },
  { text: '几何', value: 'geometric' },
  { text: '有机', value: 'organic' }
]

const colorSchemes = [
  { text: '单色', value: 'monochrome' },
  { text: '双色', value: 'duotone' },
  { text: '多色', value: 'multicolor' },
  { text: '渐变', value: 'gradient' }
]

const complexities = [
  { text: '简单', value: 'simple' },
  { text: '中等', value: 'medium' },
  { text: '复杂', value: 'complex' }
]

// 筛选状态
const filters = reactive({
  industry: '',
  style: '',
  colorScheme: '',
  complexity: ''
})

// Logo项目数据
const logoItems = ref([
  {
    id: 1,
    title: '科技公司Logo',
    description: '现代简约的科技公司品牌标识',
    logo: 'https://via.placeholder.com/200x200/ffffff/333333?text=TECH',
    bgColor: '#f8f9fa',
    format: 'SVG',
    colorScheme: '单色',
    price: 299,
    likes: 234,
    isPremium: true,
    tags: ['科技', '简约', '现代']
  },
  {
    id: 2,
    title: '咖啡店Logo',
    description: '温馨的咖啡店品牌标识设计',
    logo: 'https://via.placeholder.com/200x200/8B4513/ffffff?text=COFFEE',
    bgColor: '#f5f5dc',
    format: 'PNG',
    colorScheme: '双色',
    price: 199,
    likes: 189,
    isPremium: false,
    tags: ['餐饮', '温馨', '手绘']
  },
  {
    id: 3,
    title: '时尚品牌Logo',
    description: '高端时尚品牌标识设计',
    logo: 'https://via.placeholder.com/200x200/000000/ffffff?text=FASHION',
    bgColor: '#ffffff',
    format: 'AI',
    colorScheme: '单色',
    price: 499,
    likes: 156,
    isPremium: true,
    tags: ['时尚', '高端', '几何']
  },
  {
    id: 4,
    title: '健身中心Logo',
    description: '活力四射的健身中心标识',
    logo: 'https://via.placeholder.com/200x200/ff6b35/ffffff?text=FITNESS',
    bgColor: '#fff5f5',
    format: 'SVG',
    colorScheme: '渐变',
    price: 0,
    likes: 312,
    isPremium: false,
    tags: ['健身', '活力', '现代']
  },
  {
    id: 5,
    title: '教育机构Logo',
    description: '专业教育机构品牌标识',
    logo: 'https://via.placeholder.com/200x200/4a90e2/ffffff?text=EDU',
    bgColor: '#f0f8ff',
    format: 'PNG',
    colorScheme: '双色',
    price: 249,
    likes: 98,
    isPremium: false,
    tags: ['教育', '专业', '简约']
  },
  {
    id: 6,
    title: '餐厅Logo',
    description: '创意餐厅品牌标识设计',
    logo: 'https://via.placeholder.com/200x200/e74c3c/ffffff?text=RESTAURANT',
    bgColor: '#fff8f0',
    format: 'AI',
    colorScheme: '多色',
    price: 349,
    likes: 267,
    isPremium: true,
    tags: ['餐饮', '创意', '有机']
  }
])
</script>

<style lang="scss" scoped>
@use '../styles/content-areas.scss';

.branding-content {
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
    }
  }
  
  .content-body {
    .logos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    
    .logo-card {
      background: #2a2a2a;
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
      }
      
      .logo-preview {
        position: relative;
        aspect-ratio: 1;
        overflow: hidden;
        
        .logo-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          
          img {
            max-width: 80%;
            max-height: 80%;
            object-fit: contain;
          }
        }
        
        .logo-overlay {
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
        
        &:hover .logo-overlay {
          opacity: 1;
        }
        
        .logo-badge {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
        }
      }
      
      .logo-info {
        padding: 1rem;
        
        .logo-title {
          font-size: 1rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }
        
        .logo-description {
          color: #b0b0b0;
          font-size: 0.85rem;
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }
        
        .logo-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
          
          .logo-tag {
            font-size: 0.75rem;
          }
        }
        
        .logo-specs {
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
        
        .logo-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          
          .logo-price {
            font-size: 1.1rem;
            font-weight: 600;
            color: #3b82f6;
          }
          
          .logo-likes {
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
