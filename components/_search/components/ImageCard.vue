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
  background: #ffffff;
  border: 1px solid rgba(28, 25, 23, 0.08);
  border-radius: 18px;
  overflow: hidden;
  transition: transform 0.22s ease, border-color 0.22s ease, background-color 0.22s ease, box-shadow 0.22s ease;
  position: relative;
  width: 100%;
  
  &.hover-effect:hover {
    transform: translateY(-2px);
    border-color: rgba(28, 25, 23, 0.16);
    background: #fcfbf9;
    box-shadow: 0 18px 30px rgba(28, 25, 23, 0.06);

    .card-image img {
      transform: scale(1.035);
    }

    .image-overlay {
      opacity: 1;
    }
    
    .card-info {
      transform: translateY(0);
    }
  }
  
  .card-image {
    position: relative;
    overflow: hidden;
    border-radius: 18px;
    
    img {
      width: 100%;
      height: 100%;
      display: block;
      transition: opacity 0.28s ease, transform 0.45s ease;
      border-radius: 18px;
      object-fit: cover;
      object-position: center;
    }
    
    .empty-image {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: 200px;
      background: #f6f4f1;
      border-radius: 18px;
      
      .empty-image-text {
        margin-top: 0.5rem;
        font-size: 12px;
        color: #a8a29e;
      }
    }
    
    .image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(180deg, rgba(28, 25, 23, 0.04) 0%, rgba(28, 25, 23, 0.52) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.65rem;
      opacity: 0;
      transition: opacity 0.22s ease;
    }
    
    .image-badge {
      position: absolute;
      top: 0.65rem;
      right: 0.65rem;
    }
  }
  
  .card-info {
    position: relative;
    padding: 0.95rem 0.95rem 1rem;
    opacity: 1;
    transform: translateY(1px);
    transition: transform 0.22s ease;
    
    .card-title {
      font-size: 13px;
      font-weight: 600;
      color: #1c1917;
      margin-bottom: 0.3rem;
      line-height: 1.45;
    }
    
    .card-description {
      color: #78716c;
      font-size: 12px;
      margin-bottom: 0.6rem;
      line-height: 1.6;
    }
    
    .card-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
      margin-bottom: 0.5rem;
      
      .card-tag {
        font-size: 11px;
        background: #faf8f5;
        color: #57534e;
        border-color: rgba(28, 25, 23, 0.08);
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
        color: #78716c;
        font-size: 11px;
      }
    }
    
    .card-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.75rem;
      
      .card-price {
        font-size: 13px;
        font-weight: 600;
        color: #1c1917;
      }
      
      .card-likes,
      .card-downloads {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        color: #78716c;
        font-size: 11px;
      }
    }
  }

  :deep(.v-btn) {
    width: 34px;
    height: 34px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.94) !important;
    color: #44403c !important;
    border: 1px solid rgba(28, 25, 23, 0.08);
    box-shadow: none !important;

    &:hover {
      transform: translateY(-1px);
      background: #1c1917 !important;
      color: #f7f5f2 !important;
      border-color: #1c1917;
    }
  }
}
</style>
