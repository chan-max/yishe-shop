<template>
  <div class="image-skeleton">
    <div class="skeleton-image" :style="{ aspectRatio: aspectRatio }">
      <div class="loading-waves">
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  aspectRatio?: string
}

withDefaults(defineProps<Props>(), {
  aspectRatio: '4/3'
})
</script>

<style lang="scss" scoped>
.image-skeleton {
  .skeleton-image {
    position: relative;
    background: linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    border-radius: 12px;
    overflow: hidden;
    
    .loading-waves {
      display: flex;
      gap: 4px;
      
      .wave {
        width: 4px;
        height: 20px;
        background: #555;
        border-radius: 2px;
        animation: wave 1.5s ease-in-out infinite;
        
        &:nth-child(1) { animation-delay: 0s; }
        &:nth-child(2) { animation-delay: 0.2s; }
        &:nth-child(3) { animation-delay: 0.4s; }
      }
    }
  }
}

// 动画关键帧
@keyframes wave {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(1.5); }
}
</style>
