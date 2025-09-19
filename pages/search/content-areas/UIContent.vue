<template>
  <div class="ui-content">
    <!-- UI设计专用头部 -->
    <div class="content-header">
      <h2 class="content-title">
        <v-icon left>mdi-vector-square-outline</v-icon>
        UI设计
      </h2>
      <p class="content-subtitle">现代用户界面设计，提升用户体验</p>
    </div>

    <!-- UI设计专用筛选 -->
    <div class="content-filters">
      <div class="filter-row">
        <div class="filter-group">
          <label class="filter-label">界面类型</label>
          <v-select
            v-model="filters.interfaceType"
            :items="interfaceTypes"
            placeholder="选择类型"
            variant="outlined"
            density="compact"
            class="filter-select"
          />
        </div>
        
        <div class="filter-group">
          <label class="filter-label">平台</label>
          <v-select
            v-model="filters.platform"
            :items="platforms"
            placeholder="选择平台"
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

    <!-- UI设计内容主体 -->
    <div class="content-body">
      <div class="ui-grid">
        <div v-for="item in uiItems" :key="item.id" class="ui-card">
          <div class="ui-preview">
            <img :src="item.image" :alt="item.title" />
            <div class="ui-overlay">
              <v-btn icon="mdi-eye" variant="text" class="preview-btn" />
              <v-btn icon="mdi-download" variant="text" class="download-btn" />
              <v-btn icon="mdi-heart-outline" variant="text" class="favorite-btn" />
            </div>
            <div class="ui-badge" v-if="item.isPremium">
              <v-chip size="small" color="warning">专业版</v-chip>
            </div>
          </div>
          <div class="ui-info">
            <h3 class="ui-title">{{ item.title }}</h3>
            <p class="ui-description">{{ item.description }}</p>
            <div class="ui-tags">
              <v-chip
                v-for="tag in item.tags"
                :key="tag"
                size="small"
                variant="outlined"
                class="ui-tag"
              >
                {{ tag }}
              </v-chip>
            </div>
            <div class="ui-specs">
              <span class="spec-item">
                <v-icon size="small">mdi-monitor</v-icon>
                {{ item.platform }}
              </span>
              <span class="spec-item">
                <v-icon size="small">mdi-file</v-icon>
                {{ item.format }}
              </span>
            </div>
            <div class="ui-meta">
              <span class="ui-price">{{ item.price === 0 ? '免费' : `¥${item.price}` }}</span>
              <span class="ui-likes">
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
const interfaceTypes = [
  { text: '移动应用', value: 'mobile' },
  { text: '网页设计', value: 'web' },
  { text: '桌面应用', value: 'desktop' },
  { text: '仪表板', value: 'dashboard' },
  { text: '登录页面', value: 'login' }
]

const platforms = [
  { text: 'iOS', value: 'ios' },
  { text: 'Android', value: 'android' },
  { text: 'Web', value: 'web' },
  { text: 'Desktop', value: 'desktop' }
]

const styles = [
  { text: 'Material Design', value: 'material' },
  { text: 'iOS风格', value: 'ios' },
  { text: '扁平化', value: 'flat' },
  { text: '拟物化', value: 'skeuomorphic' },
  { text: '新拟物化', value: 'neumorphism' }
]

const complexities = [
  { text: '简单', value: 'simple' },
  { text: '中等', value: 'medium' },
  { text: '复杂', value: 'complex' }
]

// 筛选状态
const filters = reactive({
  interfaceType: '',
  platform: '',
  style: '',
  complexity: ''
})

// UI项目数据
const uiItems = ref([
  {
    id: 1,
    title: '移动应用界面',
    description: '现代移动应用UI设计模板',
    image: 'https://via.placeholder.com/400x600/667eea/ffffff?text=Mobile+App',
    platform: 'iOS/Android',
    format: 'Figma',
    price: 199,
    likes: 234,
    isPremium: true,
    tags: ['移动应用', '现代', 'Material Design']
  },
  {
    id: 2,
    title: '电商网站设计',
    description: '完整的电商网站UI设计系统',
    image: 'https://via.placeholder.com/400x300/764ba2/ffffff?text=E-commerce',
    platform: 'Web',
    format: 'Sketch',
    price: 299,
    likes: 189,
    isPremium: true,
    tags: ['电商', '网站', '扁平化']
  },
  {
    id: 3,
    title: '仪表板界面',
    description: '数据可视化仪表板设计',
    image: 'https://via.placeholder.com/400x300/f093fb/ffffff?text=Dashboard',
    platform: 'Web',
    format: 'Figma',
    price: 0,
    likes: 312,
    isPremium: false,
    tags: ['仪表板', '数据', '现代']
  },
  {
    id: 4,
    title: '登录页面设计',
    description: '简洁优雅的登录页面模板',
    image: 'https://via.placeholder.com/400x300/4facfe/ffffff?text=Login+Page',
    platform: 'Web',
    format: 'Adobe XD',
    price: 99,
    likes: 156,
    isPremium: false,
    tags: ['登录', '简洁', '优雅']
  },
  {
    id: 5,
    title: '桌面应用UI',
    description: '跨平台桌面应用界面设计',
    image: 'https://via.placeholder.com/400x300/43e97b/ffffff?text=Desktop+App',
    platform: 'Desktop',
    format: 'Figma',
    price: 249,
    likes: 98,
    isPremium: false,
    tags: ['桌面', '跨平台', '现代']
  },
  {
    id: 6,
    title: '新拟物化界面',
    description: '新拟物化设计风格界面',
    image: 'https://via.placeholder.com/400x300/fa709a/ffffff?text=Neumorphism',
    platform: 'Mobile',
    format: 'Sketch',
    price: 179,
    likes: 267,
    isPremium: true,
    tags: ['新拟物化', '现代', '创新']
  }
])
</script>

<style lang="scss" scoped>
@use '../styles/content-areas.scss';

.ui-content {
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
    .ui-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    
    .ui-card {
      background: var(--card-bg);
      border: 1px solid var(--border-primary);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: var(--shadow-card);
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-card-hover);
        background: var(--card-bg-hover);
      }
      
      .ui-preview {
        position: relative;
        aspect-ratio: 4/3;
        overflow: hidden;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .ui-overlay {
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
        }
        
        &:hover .ui-overlay {
          opacity: 1;
        }
        
        .ui-badge {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
        }
      }
      
      .ui-info {
        padding: 1rem;
        
        .ui-title {
          font-size: 1rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }
        
        .ui-description {
          color: #b0b0b0;
          font-size: 0.85rem;
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }
        
        .ui-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
          
          .ui-tag {
            font-size: 0.75rem;
          }
        }
        
        .ui-specs {
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
        
        .ui-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          
          .ui-price {
            font-size: 1.1rem;
            font-weight: 600;
            color: #3b82f6;
          }
          
          .ui-likes {
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
