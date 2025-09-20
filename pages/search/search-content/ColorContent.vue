<template>
  <div class="color-content">
    <!-- 色彩搭配专用头部 -->
    <div class="content-header">
      <h2 class="content-title">
        <v-icon left>mdi-palette-outline</v-icon>
        色彩搭配
      </h2>
      <p class="content-subtitle">专业色彩方案，提升设计美感</p>
    </div>

    <!-- 色彩搭配专用筛选 -->
    <div class="content-filters">
      <div class="filter-row">
        <div class="filter-group">
          <label class="filter-label">色彩类型</label>
          <v-select
            v-model="filters.colorType"
            :items="colorTypes"
            placeholder="选择类型"
            variant="outlined"
            density="compact"
            class="filter-select"
          />
        </div>
        
        <div class="filter-group">
          <label class="filter-label">色调</label>
          <v-select
            v-model="filters.tone"
            :items="tones"
            placeholder="选择色调"
            variant="outlined"
            density="compact"
            class="filter-select"
          />
        </div>
        
        <div class="filter-group">
          <label class="filter-label">应用场景</label>
          <v-select
            v-model="filters.scenario"
            :items="scenarios"
            placeholder="选择场景"
            variant="outlined"
            density="compact"
            class="filter-select"
          />
        </div>
      </div>
    </div>

    <!-- 色彩搭配内容主体 -->
    <div class="content-body">
      <div class="color-palettes-grid">
        <div v-for="item in paletteItems" :key="item.id" class="palette-card">
          <div class="palette-preview">
            <div class="color-swatches">
              <div
                v-for="(color, index) in item.colors"
                :key="index"
                class="color-swatch"
                :style="{ backgroundColor: color }"
                :title="color"
              />
            </div>
            <div class="palette-overlay">
              <v-btn icon="mdi-eye" variant="text" class="preview-btn" />
              <v-btn icon="mdi-download" variant="text" class="download-btn" />
              <v-btn icon="mdi-heart-outline" variant="text" class="favorite-btn" />
            </div>
          </div>
          <div class="palette-info">
            <h3 class="palette-title">{{ item.title }}</h3>
            <p class="palette-description">{{ item.description }}</p>
            <div class="palette-tags">
              <v-chip
                v-for="tag in item.tags"
                :key="tag"
                size="small"
                variant="outlined"
                class="palette-tag"
              >
                {{ tag }}
              </v-chip>
            </div>
            <div class="palette-specs">
              <span class="spec-item">
                <v-icon size="small">mdi-palette</v-icon>
                {{ item.colorCount }}色
              </span>
              <span class="spec-item">
                <v-icon size="small">mdi-tag</v-icon>
                {{ item.type }}
              </span>
            </div>
            <div class="palette-meta">
              <span class="palette-price">{{ item.price === 0 ? '免费' : `¥${item.price}` }}</span>
              <span class="palette-likes">
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
const colorTypes = [
  { text: '单色系', value: 'monochrome' },
  { text: '互补色', value: 'complementary' },
  { text: '类似色', value: 'analogous' },
  { text: '三角色', value: 'triadic' },
  { text: '分裂互补', value: 'split-complementary' }
]

const tones = [
  { text: '暖色调', value: 'warm' },
  { text: '冷色调', value: 'cool' },
  { text: '中性色', value: 'neutral' },
  { text: '明亮色', value: 'bright' },
  { text: '柔和色', value: 'soft' }
]

const scenarios = [
  { text: '网页设计', value: 'web' },
  { text: '移动应用', value: 'mobile' },
  { text: '印刷设计', value: 'print' },
  { text: '室内设计', value: 'interior' },
  { text: '服装设计', value: 'fashion' }
]

// 筛选状态
const filters = reactive({
  colorType: '',
  tone: '',
  scenario: ''
})

// 色彩方案数据
const paletteItems = ref([
  {
    id: 1,
    title: '海洋蓝调',
    description: '清新海洋风格的蓝色系搭配',
    colors: ['#1e3a8a', '#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe'],
    colorCount: 5,
    type: '单色系',
    price: 0,
    likes: 456,
    tags: ['蓝色', '清新', '海洋']
  },
  {
    id: 2,
    title: '日落橙红',
    description: '温暖日落色调的橙红搭配',
    colors: ['#dc2626', '#ea580c', '#f97316', '#fb923c', '#fed7aa'],
    colorCount: 5,
    type: '类似色',
    price: 29,
    likes: 234,
    tags: ['橙色', '温暖', '日落']
  },
  {
    id: 3,
    title: '森林绿意',
    description: '自然森林风格的绿色搭配',
    colors: ['#14532d', '#16a34a', '#22c55e', '#4ade80', '#bbf7d0'],
    colorCount: 5,
    type: '单色系',
    price: 0,
    likes: 189,
    tags: ['绿色', '自然', '森林']
  },
  {
    id: 4,
    title: '紫罗兰梦',
    description: '神秘优雅的紫色系搭配',
    colors: ['#581c87', '#7c3aed', '#a855f7', '#c084fc', '#e9d5ff'],
    colorCount: 5,
    type: '单色系',
    price: 39,
    likes: 312,
    tags: ['紫色', '优雅', '神秘']
  },
  {
    id: 5,
    title: '互补对比',
    description: '蓝橙互补色的强烈对比搭配',
    colors: ['#1e40af', '#3b82f6', '#fbbf24', '#f59e0b', '#d97706'],
    colorCount: 5,
    type: '互补色',
    price: 49,
    likes: 178,
    tags: ['对比', '活力', '现代']
  },
  {
    id: 6,
    title: '中性灰调',
    description: '专业商务的中性灰色搭配',
    colors: ['#111827', '#374151', '#6b7280', '#9ca3af', '#f3f4f6'],
    colorCount: 5,
    type: '单色系',
    price: 0,
    likes: 267,
    tags: ['灰色', '商务', '专业']
  }
])
</script>

<style lang="scss" scoped>
@use './content-areas.scss';

.color-content {
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
    .color-palettes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    
    .palette-card {
      background: #2a2a2a;
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
      }
      
      .palette-preview {
        position: relative;
        aspect-ratio: 2;
        overflow: hidden;
        
        .color-swatches {
          display: flex;
          height: 100%;
          
          .color-swatch {
            flex: 1;
            height: 100%;
            cursor: pointer;
            transition: transform 0.2s ease;
            
            &:hover {
              transform: scale(1.05);
            }
          }
        }
        
        .palette-overlay {
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
        
        &:hover .palette-overlay {
          opacity: 1;
        }
      }
      
      .palette-info {
        padding: 1rem;
        
        .palette-title {
          font-size: 1rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }
        
        .palette-description {
          color: #b0b0b0;
          font-size: 0.85rem;
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }
        
        .palette-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
          
          .palette-tag {
            font-size: 0.75rem;
          }
        }
        
        .palette-specs {
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
        
        .palette-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          
          .palette-price {
            font-size: 1.1rem;
            font-weight: 600;
            color: #3b82f6;
          }
          
          .palette-likes {
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
