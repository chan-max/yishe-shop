<template>
  <div class="loading-container">
    <div class="loading-spinner">
      <div class="spinner"></div>
      <p class="loading-text">{{ text }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  text?: string
}

withDefaults(defineProps<Props>(), {
  text: '正在加载...'
})
</script>

<style lang="scss" scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  
  .loading-spinner {
    text-align: center;
    
    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #e55a2b;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 1rem;
    }
    
    .loading-text {
      color: #b0b0b0;
      font-size: 0.9rem;
    }
  }
}

// 动画关键帧
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
