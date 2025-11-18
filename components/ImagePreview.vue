<template>
  <Transition name="image-preview">
    <div
      v-if="modelValue"
      class="image-preview-overlay"
      :style="{ zIndex: zIndex }"
      @click="handleOverlayClick"
      @wheel="handleWheel"
    >
      <!-- 关闭按钮 -->
      <button
        @click.stop="close"
        class="image-preview-close"
        aria-label="关闭预览"
      >
        <Icon name="heroicons:x-mark" class="w-6 h-6 text-white" />
      </button>

      <!-- 图片容器 -->
      <div
        ref="imageContainerRef"
        class="image-preview-container"
        @click.stop
      >
        <!-- 左侧切换按钮 -->
        <button
          v-if="images.length > 1"
          @click.stop="previousImage"
          class="image-preview-nav image-preview-nav-left"
          aria-label="上一张"
        >
          <Icon name="heroicons:chevron-left" class="w-6 h-6 text-white" />
        </button>

        <!-- 预览图片 -->
        <div
          ref="imageWrapperRef"
          class="image-preview-wrapper"
          :style="imageWrapperStyle"
          :class="{ 'is-dragging': isDragging }"
          @mousedown="handleMouseDown"
          @mousemove="handleMouseMove"
          @mouseup="handleMouseUp"
          @mouseleave="handleMouseUp"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
        >
          <img
            ref="imageRef"
            :src="currentImageUrl"
            :alt="alt"
            class="image-preview-img"
            draggable="false"
            @load="handleImageLoad"
            @error="handleImageError"
          />
        </div>

        <!-- 右侧切换按钮 -->
        <button
          v-if="images.length > 1"
          @click.stop="nextImage"
          class="image-preview-nav image-preview-nav-right"
          aria-label="下一张"
        >
          <Icon name="heroicons:chevron-right" class="w-6 h-6 text-white" />
        </button>

        <!-- 图片索引指示器 -->
        <div
          v-if="images.length > 1"
          class="image-preview-indicator"
        >
          {{ currentIndex + 1 }} / {{ images.length }}
        </div>

        <!-- 缩放控制提示 -->
        <div
          v-if="scale !== 1"
          class="image-preview-scale-hint"
        >
          缩放: {{ Math.round(scale * 100) }}%
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";

interface Props {
  modelValue: boolean;
  images: string[];
  initialIndex?: number;
  alt?: string;
  zIndex?: number;
  minScale?: number;
  maxScale?: number;
  scaleStep?: number;
}

const props = withDefaults(defineProps<Props>(), {
  initialIndex: 0,
  alt: "预览图片",
  zIndex: 9999,
  minScale: 0.5,
  maxScale: 3,
  scaleStep: 0.1,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  close: [];
  "image-change": [index: number];
}>();

// Refs
const imageContainerRef = ref<HTMLElement | null>(null);
const imageWrapperRef = ref<HTMLElement | null>(null);
const imageRef = ref<HTMLImageElement | null>(null);

// 状态
const currentIndex = ref(props.initialIndex);
const scale = ref(1);
const translateX = ref(0);
const translateY = ref(0);

// 拖拽状态
const isDragging = ref(false);
const dragStartX = ref(0);
const dragStartY = ref(0);
const dragStartTranslateX = ref(0);
const dragStartTranslateY = ref(0);

// 触摸状态
const touchStartX = ref(0);
const touchStartY = ref(0);
const touchStartTime = ref(0);
const minSwipeDistance = 50;
const maxSwipeTime = 300;
const lastTouchDistance = ref(0);
const isPinching = ref(false);

// 计算属性
const currentImageUrl = computed(() => {
  if (props.images.length === 0) return "";
  return props.images[currentIndex.value] || props.images[0];
});

const imageWrapperStyle = computed(() => {
  return {
    transform: `translate(${translateX.value}px, ${translateY.value}px) scale(${scale.value})`,
  };
});

// 方法
const close = () => {
  emit("update:modelValue", false);
  emit("close");
  resetTransform();
  document.body.style.overflow = "";
};

const resetTransform = () => {
  scale.value = 1;
  translateX.value = 0;
  translateY.value = 0;
};

const previousImage = () => {
  if (props.images.length > 0) {
    currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length;
    resetTransform();
    emit("image-change", currentIndex.value);
  }
};

const nextImage = () => {
  if (props.images.length > 0) {
    currentIndex.value = (currentIndex.value + 1) % props.images.length;
    resetTransform();
    emit("image-change", currentIndex.value);
  }
};

const handleOverlayClick = (e: MouseEvent) => {
  // 点击背景关闭
  if (e.target === e.currentTarget) {
    close();
  }
};

// 鼠标滚轮缩放
const handleWheel = (e: WheelEvent) => {
  e.preventDefault();
  const delta = e.deltaY > 0 ? -props.scaleStep : props.scaleStep;
  const newScale = Math.max(
    props.minScale,
    Math.min(props.maxScale, scale.value + delta)
  );
  
  if (imageWrapperRef.value) {
    const rect = imageWrapperRef.value.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    
    // 以鼠标位置为中心缩放
    const scaleChange = newScale / scale.value;
    translateX.value = translateX.value - mouseX * (scaleChange - 1);
    translateY.value = translateY.value - mouseY * (scaleChange - 1);
  }
  
  scale.value = newScale;
  // 缩放后应用边界限制
  constrainTranslate();
};

// 计算拖拽边界
const getDragBounds = () => {
  if (!imageWrapperRef.value || !imageRef.value || !imageContainerRef.value) {
    return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
  }

  const containerRect = imageContainerRef.value.getBoundingClientRect();
  const image = imageRef.value;

  // 获取图片原始尺寸
  const imageWidth = image.naturalWidth || image.width;
  const imageHeight = image.naturalHeight || image.height;

  // 计算缩放后的尺寸
  const scaledWidth = imageWidth * scale.value;
  const scaledHeight = imageHeight * scale.value;

  const containerWidth = containerRect.width;
  const containerHeight = containerRect.height;

  // 计算边界：图片边缘不能超出容器中心
  // 当图片大于容器时，允许拖拽，但不能完全移出
  const minX = scaledWidth > containerWidth 
    ? -(scaledWidth - containerWidth) / 2 
    : 0;
  const maxX = scaledWidth > containerWidth 
    ? (scaledWidth - containerWidth) / 2 
    : 0;
  const minY = scaledHeight > containerHeight 
    ? -(scaledHeight - containerHeight) / 2 
    : 0;
  const maxY = scaledHeight > containerHeight 
    ? (scaledHeight - containerHeight) / 2 
    : 0;

  return { minX, maxX, minY, maxY };
};

// 限制拖拽位置在边界内
const constrainTranslate = () => {
  if (scale.value <= 1) {
    translateX.value = 0;
    translateY.value = 0;
    return;
  }

  const bounds = getDragBounds();
  translateX.value = Math.max(bounds.minX, Math.min(bounds.maxX, translateX.value));
  translateY.value = Math.max(bounds.minY, Math.min(bounds.maxY, translateY.value));
};

// 鼠标拖拽
const handleMouseDown = (e: MouseEvent) => {
  // 如果点击的是按钮，不触发拖拽
  if ((e.target as HTMLElement).closest('button')) {
    return;
  }

  if (scale.value <= 1) {
    // 未放大时，允许点击切换图片
    return;
  }
  
  e.preventDefault();
  isDragging.value = true;
  dragStartX.value = e.clientX;
  dragStartY.value = e.clientY;
  dragStartTranslateX.value = translateX.value;
  dragStartTranslateY.value = translateY.value;
  
  if (imageWrapperRef.value) {
    imageWrapperRef.value.style.cursor = "grabbing";
    imageWrapperRef.value.style.userSelect = "none";
  }
};

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) {
    // 更新鼠标样式
    if (imageWrapperRef.value && scale.value > 1) {
      imageWrapperRef.value.style.cursor = "grab";
    }
    return;
  }
  
  e.preventDefault();
  const deltaX = e.clientX - dragStartX.value;
  const deltaY = e.clientY - dragStartY.value;
  
  translateX.value = dragStartTranslateX.value + deltaX;
  translateY.value = dragStartTranslateY.value + deltaY;
  
  // 应用边界限制
  constrainTranslate();
};

const handleMouseUp = () => {
  if (isDragging.value) {
    isDragging.value = false;
    if (imageWrapperRef.value) {
      imageWrapperRef.value.style.cursor = scale.value > 1 ? "grab" : "default";
      imageWrapperRef.value.style.userSelect = "";
    }
    // 确保位置在边界内
    constrainTranslate();
  }
};

// 触摸事件
const handleTouchStart = (e: TouchEvent) => {
  if (e.touches.length === 1) {
    // 单指：准备滑动切换或拖拽
    touchStartX.value = e.touches[0].clientX;
    touchStartY.value = e.touches[0].clientY;
    touchStartTime.value = Date.now();
    isPinching.value = false;
    
    // 如果已放大，准备拖拽
    if (scale.value > 1) {
      isDragging.value = true;
      dragStartX.value = e.touches[0].clientX;
      dragStartY.value = e.touches[0].clientY;
      dragStartTranslateX.value = translateX.value;
      dragStartTranslateY.value = translateY.value;
    }
  } else if (e.touches.length === 2) {
    // 双指：准备缩放
    isPinching.value = true;
    isDragging.value = false;
    const touch1 = e.touches[0];
    const touch2 = e.touches[1];
    lastTouchDistance.value = Math.hypot(
      touch2.clientX - touch1.clientX,
      touch2.clientY - touch1.clientY
    );
  }
};

const handleTouchMove = (e: TouchEvent) => {
  if (e.touches.length === 2 && isPinching.value) {
    // 双指缩放
    e.preventDefault();
    const touch1 = e.touches[0];
    const touch2 = e.touches[1];
    const currentDistance = Math.hypot(
      touch2.clientX - touch1.clientX,
      touch2.clientY - touch1.clientY
    );
    
    if (lastTouchDistance.value > 0) {
      const scaleChange = currentDistance / lastTouchDistance.value;
      const newScale = Math.max(
        props.minScale,
        Math.min(props.maxScale, scale.value * scaleChange)
      );
      scale.value = newScale;
      // 缩放后应用边界限制
      constrainTranslate();
    }
    
    lastTouchDistance.value = currentDistance;
  } else if (e.touches.length === 1 && isDragging.value && scale.value > 1) {
    // 单指拖拽（仅在放大时）
    e.preventDefault();
    const deltaX = e.touches[0].clientX - dragStartX.value;
    const deltaY = e.touches[0].clientY - dragStartY.value;
    
    translateX.value = dragStartTranslateX.value + deltaX;
    translateY.value = dragStartTranslateY.value + deltaY;
    
    // 应用边界限制
    constrainTranslate();
  }
};

const handleTouchEnd = (e: TouchEvent) => {
  // 重置拖拽状态
  if (isDragging.value) {
    isDragging.value = false;
    constrainTranslate();
  }
  
  if (e.changedTouches.length === 1 && !isPinching.value && scale.value <= 1) {
    // 单指滑动切换（仅在未放大时）
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const touchEndTime = Date.now();
    
    const deltaX = touchEndX - touchStartX.value;
    const deltaY = touchEndY - touchStartY.value;
    const deltaTime = touchEndTime - touchStartTime.value;
    
    const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);
    const isFastEnough = deltaTime < maxSwipeTime;
    const isLongEnough = Math.abs(deltaX) > minSwipeDistance;
    
    if (isHorizontalSwipe && isFastEnough && isLongEnough) {
      if (deltaX > 0) {
        previousImage();
      } else {
        nextImage();
      }
    }
  }
  
  if (e.touches.length < 2) {
    isPinching.value = false;
    lastTouchDistance.value = 0;
  }
};

const handleImageLoad = () => {
  resetTransform();
};

const handleImageError = () => {
  console.error("图片加载失败:", currentImageUrl.value);
};

// 键盘事件
const handleKeydown = (e: KeyboardEvent) => {
  if (!props.modelValue) return;
  
  switch (e.key) {
    case "Escape":
      close();
      break;
    case "ArrowLeft":
      previousImage();
      break;
    case "ArrowRight":
      nextImage();
      break;
  }
};

// 监听 props 变化
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      currentIndex.value = props.initialIndex;
      resetTransform();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
);

watch(
  () => props.initialIndex,
  (newVal) => {
    if (props.modelValue) {
      currentIndex.value = newVal;
      resetTransform();
    }
  }
);

// 生命周期
onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
  document.body.style.overflow = "";
});
</script>

<style scoped>
.image-preview-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
}

.image-preview-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 1rem;
}

.image-preview-wrapper {
  position: relative;
  max-width: 100%;
  max-height: 100%;
  cursor: grab;
  user-select: none;
  touch-action: none;
  will-change: transform;
  transition: transform 0.2s ease-out;
}

.image-preview-wrapper.is-dragging {
  cursor: grabbing;
  transition: none;
}

.image-preview-wrapper:active {
  cursor: grabbing;
}

.image-preview-img {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  display: block;
  pointer-events: none;
}

.image-preview-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 20;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  border: none;
  cursor: pointer;
}

.image-preview-close:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.image-preview-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  border: none;
  cursor: pointer;
}

.image-preview-nav:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.image-preview-nav-left {
  left: 1rem;
}

.image-preview-nav-right {
  right: 1rem;
}

.image-preview-indicator {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
}

.image-preview-scale-hint {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
}

/* 过渡动画 */
.image-preview-enter-active,
.image-preview-leave-active {
  transition: opacity 0.3s ease;
}

.image-preview-enter-from,
.image-preview-leave-to {
  opacity: 0;
}

.image-preview-enter-active .image-preview-container,
.image-preview-leave-active .image-preview-container {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.image-preview-enter-from .image-preview-container,
.image-preview-leave-to .image-preview-container {
  transform: scale(0.95);
  opacity: 0;
}

/* 移动端优化 */
@media (max-width: 768px) {
  .image-preview-nav {
    width: 2.5rem;
    height: 2.5rem;
  }

  .image-preview-nav-left {
    left: 0.5rem;
  }

  .image-preview-nav-right {
    right: 0.5rem;
  }

  .image-preview-close {
    top: 0.5rem;
    right: 0.5rem;
    width: 2rem;
    height: 2rem;
  }

  .image-preview-container {
    padding: 3rem 0.5rem;
  }
}
</style>

