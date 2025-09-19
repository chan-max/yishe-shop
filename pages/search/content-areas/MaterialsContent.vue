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
          <label class="filter-label">分辨率</label>
          <v-select
            v-model="filters.resolution"
            :items="resolutions"
            placeholder="选择分辨率"
            variant="outlined"
            density="compact"
            class="filter-select"
          />
        </div>
        
        <div class="filter-group">
          <label class="filter-label">格式</label>
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
      <div class="materials-grid">
        <div v-for="item in materialItems" :key="item.id" class="material-card">
          <div class="material-image">
            <img :src="item.image" :alt="item.title" />
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
                <v-icon size="small">mdi-image-size-select-actual</v-icon>
                {{ item.resolution }}
              </span>
              <span class="spec-item">
                <v-icon size="small">mdi-file</v-icon>
                {{ item.size }}
              </span>
            </div>
            <div class="material-meta">
              <span class="material-price">{{ item.price === 0 ? '免费' : `¥${item.price}` }}</span>
              <span class="material-downloads">
                <v-icon size="small">mdi-download</v-icon>
                {{ item.downloads }}
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
const materialTypes = [
  { text: '背景图', value: 'background' },
  { text: '纹理', value: 'texture' },
  { text: '图标', value: 'icon' },
  { text: '插画', value: 'illustration' },
  { text: '照片', value: 'photo' }
]

const resolutions = [
  { text: '4K (3840x2160)', value: '4k' },
  { text: '2K (2560x1440)', value: '2k' },
  { text: '1080p (1920x1080)', value: '1080p' },
  { text: '720p (1280x720)', value: '720p' }
]

const formats = [
  { text: 'PNG', value: 'png' },
  { text: 'JPG', value: 'jpg' },
  { text: 'SVG', value: 'svg' },
  { text: 'AI', value: 'ai' },
  { text: 'PSD', value: 'psd' }
]

const colorOptions = [
  { value: 'red', color: '#ff4757' },
  { value: 'blue', color: '#3742fa' },
  { value: 'green', color: '#2ed573' },
  { value: 'yellow', color: '#ffa502' },
  { value: 'purple', color: '#9c88ff' },
  { value: 'orange', color: '#ff6348' },
  { value: 'pink', color: '#ff6b9d' },
  { value: 'teal', color: '#17a2b8' }
]

// 筛选状态
const filters = reactive({
  materialType: '',
  resolution: '',
  format: '',
  colors: [] as string[]
})

// 切换颜色选择
const toggleColor = (color: string) => {
  const index = filters.colors.indexOf(color)
  if (index > -1) {
    filters.colors.splice(index, 1)
  } else {
    filters.colors.push(color)
  }
}

// 素材项目数据
const materialItems = ref([
  {
    id: 1,
    title: '抽象几何背景',
    description: '现代简约的几何图案背景素材',
    image: 'https://via.placeholder.com/400x300/ff6b6b/ffffff?text=Abstract+1',
    format: 'PNG',
    resolution: '4K',
    size: '2.5MB',
    price: 0,
    downloads: 1234
  },
  {
    id: 2,
    title: '水彩纹理素材',
    description: '自然水彩效果的纹理背景',
    image: 'https://via.placeholder.com/400x300/4ecdc4/ffffff?text=Watercolor+1',
    format: 'JPG',
    resolution: '2K',
    size: '1.8MB',
    price: 29,
    downloads: 856
  },
  {
    id: 3,
    title: '矢量图标集合',
    description: '包含100+个现代风格图标',
    image: 'https://via.placeholder.com/400x300/45b7d1/ffffff?text=Icons+1',
    format: 'SVG',
    resolution: '矢量',
    size: '5.2MB',
    price: 99,
    downloads: 2103
  },
  {
    id: 4,
    title: '自然风景照片',
    description: '高质量自然风景摄影作品',
    image: 'https://via.placeholder.com/400x300/96ceb4/ffffff?text=Nature+1',
    format: 'JPG',
    resolution: '4K',
    size: '8.7MB',
    price: 0,
    downloads: 3456
  },
  {
    id: 5,
    title: '手绘插画素材',
    description: '原创手绘风格插画设计',
    image: 'https://via.placeholder.com/400x300/feca57/ffffff?text=Illustration+1',
    format: 'AI',
    resolution: '矢量',
    size: '12.3MB',
    price: 199,
    downloads: 567
  },
  {
    id: 6,
    title: '金属质感纹理',
    description: '高质感的金属表面纹理',
    image: 'https://via.placeholder.com/400x300/ff9ff3/ffffff?text=Metal+1',
    format: 'PNG',
    resolution: '2K',
    size: '3.1MB',
    price: 49,
    downloads: 1789
  }
])
</script>

<style lang="scss" scoped>
@use '../styles/content-areas.scss';

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
          
          &:hover {
            transform: scale(1.1);
          }
          
          &.active {
            border-color: #ffffff;
            box-shadow: 0 0 0 2px #3b82f6;
          }
        }
      }
    }
  }
  
  .content-body {
    .materials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    
    .material-card {
      background: #2a2a2a;
      border-radius: 12px;
      overflow: hidden;
      
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
            color: #3b82f6;
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
</style>
