<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-XX XX:XX:XX
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-01-XX XX:XX:XX
 * @FilePath: /yishe-nuxt/components/FavoriteButton.vue
 * @Description: 收藏按钮组件 - 带动画效果的心形按钮
-->
<template>
  <div class="favorite-button-container" @click="handleClick">
    <div 
      class="heart-container" 
      :class="{ 'is-favorite': isFavorite }"
    >
      <div class="svg-container">
        <!-- 心形图标 - 未收藏时显示灰色填充，已收藏时显示红色填充 -->
        <svg 
          viewBox="0 0 24 24" 
          class="svg-heart" 
          :class="{ 'is-favorite': isFavorite }"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
        </svg>
        
        <!-- 庆祝动画（点击收藏时显示） -->
        <svg 
          v-if="showCelebrate" 
          class="svg-celebrate" 
          width="100" 
          height="100" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="10,10 20,20"></polygon>
          <polygon points="10,50 20,50"></polygon>
          <polygon points="20,80 30,70"></polygon>
          <polygon points="90,10 80,20"></polygon>
          <polygon points="90,50 80,50"></polygon>
          <polygon points="80,80 70,70"></polygon>
        </svg>
      </div>
    </div>
    
    <!-- 文字提示 -->
    <span class="favorite-text" :class="{ 'is-favorite': isFavorite }">
      {{ isFavorite ? '取消收藏' : '收藏' }}
    </span>
    
    <!-- 收藏数量显示（可选） -->
    <div v-if="showCount && count !== null" class="favorite-count">
      {{ count }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  isFavorite: boolean
  count?: number | null
  showCount?: boolean
  size?: 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
  count: null,
  showCount: false,
  size: 'medium',
})

const emit = defineEmits<{
  click: []
}>()

const showCelebrate = ref(false)

// 监听收藏状态变化，触发庆祝动画
watch(() => props.isFavorite, (newVal, oldVal) => {
  // 从未收藏变为已收藏时，显示庆祝动画
  if (newVal && !oldVal) {
    showCelebrate.value = true
    setTimeout(() => {
      showCelebrate.value = false
    }, 500)
  }
})

const handleClick = () => {
  emit('click')
}
</script>

<style scoped>
.favorite-button-container {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  z-index: 20;
  position: relative;
  cursor: pointer;
}

.heart-container {
  --heart-color: rgb(255, 91, 137);
  position: relative;
  width: 36px;
  height: 36px;
  transition: transform 0.3s ease;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  z-index: 20;
  overflow: visible;
  display: flex;
  align-items: center;
  justify-content: center;
}

.heart-container:hover {
  transform: scale(1.1);
}

.heart-container:active {
  transform: scale(0.95);
}


.heart-container .svg-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: visible;
}

.heart-container .svg-heart {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  fill: #d1d5db; /* 灰色 - 未收藏状态 */
  transition: fill 0.3s ease, transform 0.3s ease;
  pointer-events: none;
}

.heart-container .svg-heart.is-favorite {
  fill: var(--heart-color); /* 红色 - 已收藏状态 */
  animation: keyframes-svg-filled 0.6s ease-out;
}

.heart-container .svg-celebrate {
  position: absolute;
  animation: keyframes-svg-celebrate 0.5s ease-out;
  animation-fill-mode: forwards;
  stroke: var(--heart-color);
  fill: var(--heart-color);
  stroke-width: 2px;
  width: 100px;
  height: 100px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 100;
  overflow: visible;
}


.favorite-text {
  font-size: 12px;
  color: #666;
  font-weight: 400;
  margin-top: 4px;
  transition: color 0.3s ease;
  cursor: pointer;
  white-space: nowrap;
}

.favorite-text.is-favorite {
  color: var(--heart-color);
}

.favorite-text {
  font-size: 12px;
  color: #666;
  font-weight: 400;
  margin-top: 4px;
  transition: color 0.3s ease;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
}

.favorite-text.is-favorite {
  color: var(--heart-color);
}

.favorite-count {
  font-size: 11px;
  color: #999;
  font-weight: 400;
  margin-top: 2px;
  min-height: 14px;
}

/* 尺寸变体 */
.heart-container.size-small {
  width: 40px;
  height: 40px;
}

.heart-container.size-large {
  width: 60px;
  height: 60px;
}

@keyframes keyframes-svg-filled {
  0% {
    transform: translate(-50%, -50%) scale(1);
  }
  25% {
    transform: translate(-50%, -50%) scale(1.15);
  }
  50% {
    transform: translate(-50%, -50%) scale(0.95);
    filter: brightness(1.3);
  }
  75% {
    transform: translate(-50%, -50%) scale(1.05);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    filter: brightness(1);
  }
}

/* 当填充的心形显示时，应用动画 */
.heart-container .svg-filled:not(.hidden) {
  animation: keyframes-svg-filled 0.6s ease-out;
}

@keyframes keyframes-svg-celebrate {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }
  50% {
    opacity: 1;
    filter: brightness(1.5);
  }
  100% {
    transform: translate(-50%, -50%) scale(1.4);
    opacity: 0;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .heart-container {
    width: 45px;
    height: 45px;
  }
}
</style>

