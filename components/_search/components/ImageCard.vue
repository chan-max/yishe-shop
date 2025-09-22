<template>
  <div class="image-card" :class="{ 'hover-effect': hoverEffect }">
    <div class="card-image" :style="{ aspectRatio: aspectRatio }">
      <!-- 有图片时显示图片 -->
      <img
        v-if="hasValidImage"
        :src="image"
        :alt="title"
        @load="onImageLoad"
        @error="onImageError"
        :class="{ 'opacity-0': !imageLoaded }"
      />
      
      <!-- 没有图片时显示空状态 -->
      <div v-else class="empty-image">
        <v-icon size="48" color="grey-lighten-2">{{ emptyIcon }}</v-icon>
        <p class="empty-image-text">{{ emptyText }}</p>
      </div>
      
      <!-- 图片加载中的骨架屏 -->
      <ImageSkeleton 
        v-if="hasValidImage && !imageLoaded" 
        :aspect-ratio="aspectRatio"
        :show-info="false"
      />
      
      <!-- 悬浮操作按钮 -->
      <div v-if="showOverlay" class="image-overlay">
        <v-btn 
          v-for="action in overlayActions" 
          :key="action.icon"
          :icon="action.icon" 
          variant="text" 
          :class="action.class"
          @click="$emit('action', action.type, item)"
        />
      </div>
      
      <!-- 徽章 -->
      <div v-if="badge" class="image-badge">
        <v-chip :size="badgeSize" :color="badgeColor">{{ badge }}</v-chip>
      </div>
    </div>
    
    <!-- 卡片信息 -->
    <div v-if="showInfo" class="card-info">
      <h3 class="card-title">{{ title }}</h3>
      <p v-if="description" class="card-description">{{ description }}</p>
      
      <!-- 标签 -->
      <div v-if="tags && tags.length > 0" class="card-tags">
        <v-chip
          v-for="tag in tags"
          :key="tag"
          size="small"
          variant="outlined"
          class="card-tag"
        >
          {{ tag }}
        </v-chip>
      </div>
      
      <!-- 规格信息 -->
      <div v-if="specs && specs.length > 0" class="card-specs">
        <span 
          v-for="spec in specs" 
          :key="spec.label"
          class="spec-item"
        >
          <v-icon size="small">{{ spec.icon }}</v-icon>
          {{ spec.label }}
        </span>
      </div>
      
      <!-- 元数据 -->
      <div class="card-meta">
        <span v-if="price !== undefined" class="card-price">
          {{ price === 0 ? '免费' : `¥${price}` }}
        </span>
        <span v-if="likes !== undefined" class="card-likes">
          <v-icon size="small">mdi-heart</v-icon>
          {{ likes }}
        </span>
        <span v-if="downloads !== undefined" class="card-downloads">
          <v-icon size="small">mdi-download</v-icon>
          {{ downloads }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Spec {
  icon: string
  label: string
}

interface OverlayAction {
  icon: string
  type: string
  class?: string
}

interface Props {
  item: any
  image?: string
  title: string
  description?: string
  tags?: string[]
  specs?: Spec[]
  price?: number
  likes?: number
  downloads?: number
  badge?: string
  badgeSize?: string
  badgeColor?: string
  aspectRatio?: string
  hoverEffect?: boolean
  showInfo?: boolean
  showOverlay?: boolean
  overlayActions?: OverlayAction[]
  emptyIcon?: string
  emptyText?: string
}

interface Emits {
  (e: 'action', type: string, item: any): void
  (e: 'imageLoad', event: Event): void
  (e: 'imageError', event: Event): void
}

const props = withDefaults(defineProps<Props>(), {
  aspectRatio: '4/3',
  hoverEffect: true,
  showInfo: true,
  showOverlay: true,
  overlayActions: () => [
    { icon: 'mdi-eye', type: 'preview', class: 'preview-btn' },
    { icon: 'mdi-download', type: 'download', class: 'download-btn' },
    { icon: 'mdi-heart-outline', type: 'favorite', class: 'favorite-btn' }
  ],
  emptyIcon: 'mdi-image-outline',
  emptyText: '暂无图片',
  badgeSize: 'small'
})

const emit = defineEmits<Emits>()

const imageLoaded = ref(false)

const hasValidImage = computed(() => {
  return props.image && !props.image.includes('placeholder')
})

const onImageLoad = (event: Event) => {
  imageLoaded.value = true
  emit('imageLoad', event)
}

const onImageError = (event: Event) => {
  console.error("图片加载失败:", event)
  imageLoaded.value = false
  emit('imageError', event)
}
</script>

<style lang="scss" scoped>
.image-card {
  background: transparent;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  width: 100%; // 占满容器宽度
  
  &.hover-effect:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    
    .card-info {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .card-image {
    position: relative;
    overflow: hidden;
    border-radius: 8px; // 添加圆角
    
    img {
      width: 100%;
      height: auto; // 保持原始比例
      display: block; // 移除底部间隙
      transition: opacity 0.3s ease;
      border-radius: 8px; // 图片圆角
      object-fit: cover; // 覆盖容器，保持比例
      object-position: center; // 居中显示
    }
    
    .empty-image {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: 200px; // 设置最小高度
      background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
      border-radius: 8px; // 保持圆角一致
      
      .empty-image-text {
        margin-top: 0.5rem;
        font-size: 0.8rem;
        color: #999;
      }
    }
    
    .image-overlay {
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
    
    &:hover .image-overlay {
      opacity: 1;
    }
    
    .image-badge {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
    }
  }
  
  .card-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
    padding: 1rem 0.75rem 0.75rem;
    opacity: 0;
    transform: translateY(100%);
    transition: all 0.3s ease;
    
    .card-title {
      font-size: 0.9rem;
      font-weight: 600;
      color: #ffffff;
      margin-bottom: 0.25rem;
      line-height: 1.2;
    }
    
    .card-description {
      color: #e0e0e0;
      font-size: 0.8rem;
      margin-bottom: 0.5rem;
      line-height: 1.3;
    }
    
    .card-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
      margin-bottom: 0.5rem;
      
      .card-tag {
        font-size: 0.7rem;
        background: rgba(255, 255, 255, 0.2);
        color: #ffffff;
      }
    }
    
    .card-specs {
      display: flex;
      gap: 1rem;
      margin-bottom: 0.5rem;
      
      .spec-item {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        color: #e0e0e0;
        font-size: 0.8rem;
      }
    }
    
    .card-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .card-price {
        font-size: 1rem;
        font-weight: 600;
        color: #ff6b35;
      }
      
      .card-likes,
      .card-downloads {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        color: #e0e0e0;
        font-size: 0.85rem;
      }
    }
  }
}
</style>
