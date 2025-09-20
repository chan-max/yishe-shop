<template>
  <div class="material-card" @click="handleCardClick">
    <!-- 图片容器 -->
    <div class="image-container">
      <img
        :src="item.image"
        :alt="item.title"
        class="material-image"
        @load="onImageLoad"
        @error="onImageError"
        :class="{ 'loaded': isImageLoaded }"
      />
      
      <!-- 加载状态 -->
      <div v-if="!isImageLoaded" class="image-loading">
        <div class="loading-spinner"></div>
      </div>
      
      <!-- 图片遮罩层 -->
      <div class="image-overlay">
        <!-- 格式标签 -->
        <div class="format-badge">
          {{ item.format }}
        </div>
        
        <!-- 操作按钮 -->
        <div class="action-buttons">
          <button 
            class="action-btn download-btn"
            @click.stop="handleDownload"
            title="下载"
          >
            <i class="mdi mdi-download"></i>
          </button>
          <button 
            class="action-btn preview-btn"
            @click.stop="handlePreview"
            title="预览"
          >
            <i class="mdi mdi-eye"></i>
          </button>
        </div>
      </div>
    </div>
    
    <!-- 内容信息 -->
    <div class="card-content">
      <!-- 标题 -->
      <h3 class="material-title" :title="item.title">
        {{ item.title }}
      </h3>
      
      <!-- 描述 -->
      <p class="material-description" v-if="item.description">
        {{ item.description }}
      </p>
      
      <!-- 元信息 -->
      <div class="material-meta">
        <div class="meta-item">
          <i class="mdi mdi-tag-outline"></i>
          <span>{{ item.group || '未分组' }}</span>
        </div>
        <div class="meta-item">
          <i class="mdi mdi-download"></i>
          <span>{{ item.downloads }}</span>
        </div>
        <div class="meta-item" v-if="item.price > 0">
          <i class="mdi mdi-currency-cny"></i>
          <span>{{ item.price }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 定义 props
interface Props {
  item: {
    id: string
    title: string
    description: string
    image: string
    format: string
    group: string
    price: number
    downloads: number
  }
}

const props = defineProps<Props>()

// 定义 emits
const emit = defineEmits<{
  download: [item: any]
  preview: [item: any]
  click: [item: any]
  imageLoad: [event: Event, itemId: string]
  imageError: [event: Event, itemId: string]
}>()

// 图片加载状态
const isImageLoaded = ref(false)

// 图片加载成功
const onImageLoad = (event: Event) => {
  isImageLoaded.value = true
  emit('imageLoad', event, props.item.id)
}

// 图片加载失败
const onImageError = (event: Event) => {
  isImageLoaded.value = false
  emit('imageError', event, props.item.id)
}

// 卡片点击
const handleCardClick = () => {
  emit('click', props.item)
}

// 下载按钮点击
const handleDownload = () => {
  emit('download', props.item)
}

// 预览按钮点击
const handlePreview = () => {
  emit('preview', props.item)
}
</script>

<style lang="scss" scoped>
.material-card {
  width: 100%;
  background: #1a1a1a;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid #2a2a2a;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    border-color: #e55a2b;
    
    .image-overlay {
      opacity: 1;
    }
  }
}

.image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 4/3;
  overflow: hidden;
  background: #2a2a2a;
  
  .material-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    align-items: center;
    justify-content: center;
    background: #2a2a2a;
    
    .loading-spinner {
      width: 24px;
      height: 24px;
      border: 2px solid #444;
      border-top: 2px solid #e55a2b;
      border-radius: 50%;
      animation: spin 1s linear infinite;
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
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 0.3) 50%,
      rgba(0, 0, 0, 0.7) 100%
    );
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 12px;
    opacity: 0;
    transition: opacity 0.3s ease;
    
    .format-badge {
      align-self: flex-start;
      background: #e55a2b;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
    }
    
    .action-buttons {
      align-self: flex-end;
      display: flex;
      gap: 8px;
      
      .action-btn {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: none;
        background: rgba(255, 255, 255, 0.9);
        color: #333;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        
        &:hover {
          background: #e55a2b;
          color: white;
          transform: scale(1.1);
        }
        
        i {
          font-size: 16px;
        }
      }
    }
  }
}

.card-content {
  padding: 16px;
  
  .material-title {
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
    margin: 0 0 8px 0;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .material-description {
    font-size: 12px;
    color: #b0b0b0;
    margin: 0 0 12px 0;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .material-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    
    .meta-item {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      color: #888;
      
      i {
        font-size: 14px;
      }
      
      span {
        white-space: nowrap;
      }
    }
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .material-card {
    .card-content {
      padding: 12px;
      
      .material-title {
        font-size: 13px;
      }
      
      .material-description {
        font-size: 11px;
      }
      
      .material-meta {
        gap: 8px;
        
        .meta-item {
          font-size: 10px;
        }
      }
    }
  }
}
</style>
