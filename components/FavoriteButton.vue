<template>
  <button
    type="button"
    class="favorite-button-container"
    :class="{ 'is-favorite': isFavorite }"
    :aria-pressed="isFavorite"
    :title="isFavorite ? '已收藏' : '收藏'"
    @click="handleClick"
  >
    <div class="heart-icon-wrapper" :class="{ 'is-favorite': isFavorite, 'is-animating': isAnimating }">
      <svg
        viewBox="0 0 24 24"
        class="svg-heart"
        :class="{ 'is-favorite': isFavorite }"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        ></path>
      </svg>
    </div>

    <span class="favorite-text" :class="{ 'is-favorite': isFavorite }">
      {{ isFavorite ? "已收藏" : "收藏" }}
    </span>

    <span v-if="showCount && count !== null" class="favorite-count">
      ({{ count }})
    </span>
  </button>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

interface Props {
  productId?: string;
  isFavorite?: boolean;
  count?: number | null;
  showCount?: boolean;
  size?: "small" | "medium" | "large";
}

const props = withDefaults(defineProps<Props>(), {
  productId: "",
  isFavorite: false,
  count: null,
  showCount: false,
  size: "medium",
});

const emit = defineEmits<{
  click: [];
}>();

const isAnimating = ref(false);

watch(
  () => props.isFavorite,
  () => {
    isAnimating.value = true;
    setTimeout(() => {
      isAnimating.value = false;
    }, 450);
  },
);

const handleClick = () => {
  isAnimating.value = true;
  setTimeout(() => {
    isAnimating.value = false;
  }, 450);
  emit("click");
};
</script>

<style scoped>
/* 无外边框，无阴影，纯粹的上下列排版 (爱心在上，文字在下) */
.favorite-button-container {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
  cursor: pointer;
  border: none;
  background: transparent;
  padding: 0;
  box-shadow: none;
  user-select: none;
  outline: none;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.85;
  }

  &:active {
    transform: scale(0.96);
  }
}

.heart-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &.is-animating {
    animation: heart-bounce 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
}

.svg-heart {
  width: 34px;
  height: 34px;
  fill: #9ca3af;
  transition: fill 0.2s ease, transform 0.2s ease;

  &.is-favorite {
    fill: #ff2442;
  }
}

.favorite-text {
  font-size: 0.8rem;
  font-weight: 650;
  color: #4b5563;
  line-height: 1;

  &.is-favorite {
    color: #ff2442;
  }
}

.favorite-count {
  font-size: 0.68rem;
  color: #9ca3af;
  line-height: 1;
}

@keyframes heart-bounce {
  0% {
    transform: scale(1);
  }
  40% {
    transform: scale(1.4);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
</style>
