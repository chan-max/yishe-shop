<template>
  <div class="image-skeleton">
    <div class="skeleton-content">
      <!-- 图片骨架 -->
      <div class="skeleton-image" :style="{ aspectRatio: aspectRatio }">
        <div class="loading-waves">
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
        </div>
      </div>
      
      <!-- 信息骨架 -->
      <div v-if="showInfo" class="skeleton-info">
        <div class="skeleton-title"></div>
        <div class="skeleton-description"></div>
        <div class="skeleton-tags">
          <div class="skeleton-tag"></div>
          <div class="skeleton-tag"></div>
        </div>
        <div class="skeleton-meta">
          <div class="skeleton-price"></div>
          <div class="skeleton-likes"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  aspectRatio?: string
  showInfo?: boolean
}

withDefaults(defineProps<Props>(), {
  aspectRatio: '4/3',
  showInfo: true
})
</script>

<style lang="scss" scoped>
.image-skeleton {
  .skeleton-content {
    background: #2a2a2a;
    border-radius: 12px;
    overflow: hidden;
    
    .skeleton-image {
      position: relative;
      background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      
      .loading-waves {
        display: flex;
        gap: 4px;
        
        .wave {
          width: 4px;
          height: 20px;
          background: #ccc;
          border-radius: 2px;
          animation: wave 1.5s ease-in-out infinite;
          
          &:nth-child(1) { animation-delay: 0s; }
          &:nth-child(2) { animation-delay: 0.2s; }
          &:nth-child(3) { animation-delay: 0.4s; }
        }
      }
    }
    
    .skeleton-info {
      padding: 1rem;
      
      .skeleton-title {
        height: 16px;
        background: linear-gradient(90deg, #3a3a3a 25%, #4a4a4a 50%, #3a3a3a 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
        border-radius: 4px;
        margin-bottom: 8px;
        width: 70%;
      }
      
      .skeleton-description {
        height: 12px;
        background: linear-gradient(90deg, #3a3a3a 25%, #4a4a4a 50%, #3a3a3a 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
        border-radius: 4px;
        margin-bottom: 12px;
        width: 90%;
      }
      
      .skeleton-tags {
        display: flex;
        gap: 8px;
        margin-bottom: 12px;
        
        .skeleton-tag {
          height: 20px;
          width: 60px;
          background: linear-gradient(90deg, #3a3a3a 25%, #4a4a4a 50%, #3a3a3a 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 10px;
        }
      }
      
      .skeleton-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .skeleton-price {
          height: 16px;
          width: 60px;
          background: linear-gradient(90deg, #3a3a3a 25%, #4a4a4a 50%, #3a3a3a 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 4px;
        }
        
        .skeleton-likes {
          height: 14px;
          width: 40px;
          background: linear-gradient(90deg, #3a3a3a 25%, #4a4a4a 50%, #3a3a3a 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 4px;
        }
      }
    }
  }
}

// 动画关键帧
@keyframes wave {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(1.5); }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
</style>
