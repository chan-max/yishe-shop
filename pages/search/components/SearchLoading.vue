<template>
  <div class="search-loading">
    <div class="loading-container">
      <!-- 旋转的圆圈 -->
      <div class="loading-spinner">
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
      </div>
      
      <!-- 加载文字 -->
      <div class="loading-text">
        <span class="loading-dots">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
// 可以接收自定义的加载文字
defineProps({
  text: {
    type: String,
    default: '加载中'
  }
})
</script>

<style scoped lang="scss">
.search-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  width: 100%;
  
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .loading-spinner {
    position: relative;
    width: 40px;
    height: 40px;
    
    .spinner-ring {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 3px solid transparent;
      border-top: 3px solid #6366f1;
      border-radius: 50%;
      animation: spin 1.2s linear infinite;
      
      &:nth-child(1) {
        animation-delay: 0s;
        border-top-color: #6366f1;
      }
      
      &:nth-child(2) {
        animation-delay: 0.2s;
        border-top-color: #8b5cf6;
        width: 80%;
        height: 80%;
        top: 10%;
        left: 10%;
      }
      
      &:nth-child(3) {
        animation-delay: 0.4s;
        border-top-color: #ec4899;
        width: 60%;
        height: 60%;
        top: 20%;
        left: 20%;
      }
    }
  }
  
  .loading-text {
    color: #6b7280;
    font-size: 0.9rem;
    font-weight: 500;
    
    .loading-dots {
      display: inline-block;
      
      span {
        animation: dots 1.4s infinite;
        
        &:nth-child(1) {
          animation-delay: 0s;
        }
        
        &:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        &:nth-child(3) {
          animation-delay: 0.4s;
        }
      }
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dots {
  0%, 20% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

// 卡片加载状态
.search-loading.card-loading {
  min-height: 300px;
  
  .loading-container {
    .loading-spinner {
      width: 30px;
      height: 30px;
    }
    
    .loading-text {
      font-size: 0.8rem;
    }
  }
}

// 网格加载状态
.search-loading.grid-loading {
  min-height: 400px;
  
  .loading-container {
    .loading-spinner {
      width: 50px;
      height: 50px;
    }
    
    .loading-text {
      font-size: 1rem;
    }
  }
}
</style>
