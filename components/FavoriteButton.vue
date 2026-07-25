<template>
  <button
    type="button"
    class="favorite-button-container"
    :class="{ 'is-favorite': isFavorite }"
    :aria-pressed="isFavorite"
    :title="isFavorite ? '已经留住这件了' : '先把这件留住'"
    @click="handleClick"
  >
    <span
      class="heart-container"
      :class="[{ 'is-favorite': isFavorite }, `size-${size}`]"
    >
      <span class="heart-surface"></span>
      <span class="svg-container">
        <svg
          viewBox="0 0 24 24"
          class="svg-heart"
          :class="{ 'is-favorite': isFavorite }"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"
          ></path>
        </svg>

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
      </span>
    </span>

    <span class="favorite-text" :class="{ 'is-favorite': isFavorite }">
      {{ isFavorite ? "留住了" : "先留一下" }}
    </span>

    <div v-if="showCount && count !== null" class="favorite-count">
      {{ count }}
    </div>
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

const showCelebrate = ref(false);

watch(
  () => props.isFavorite,
  (newVal, oldVal) => {
    if (newVal && !oldVal) {
      showCelebrate.value = true;
      setTimeout(() => {
        showCelebrate.value = false;
      }, 420);
    }
  },
);

const handleClick = () => {
  emit("click");
};
</script>

<style scoped>
.favorite-button-container {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  position: relative;
  cursor: pointer;
  border: 0;
  background: transparent;
  padding: 2px;
  transition: transform 0.18s ease;
}

.favorite-button-container:focus-visible .heart-surface {
  box-shadow: 0 0 0 3px rgba(28, 25, 23, 0.14);
}

.favorite-button-container:hover {
  transform: translateY(-1px);
}

.favorite-button-container:active {
  transform: translateY(0) scale(0.98);
}

.heart-container {
  --heart-color: #dd5b73;
  position: relative;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.heart-surface {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: #faf8f5;
  border: 1px solid rgba(28, 25, 23, 0.08);
  transition:
    transform 0.18s ease,
    background-color 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease;
}

.favorite-button-container:hover .heart-surface {
  transform: translateY(-1px) scale(1.04);
  background: #fff;
  border-color: rgba(28, 25, 23, 0.18);
  box-shadow: 0 10px 20px rgba(28, 25, 23, 0.06);
}

.favorite-button-container:active .heart-surface {
  transform: translateY(0) scale(0.98);
}

.heart-container.is-favorite .heart-surface {
  background: rgba(221, 91, 115, 0.1);
  border-color: rgba(221, 91, 115, 0.28);
}

.favorite-button-container:hover .heart-container.is-favorite .heart-surface {
  box-shadow: 0 10px 22px rgba(221, 91, 115, 0.14);
}

.svg-container {
  width: 18px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
}

.svg-heart {
  width: 100%;
  height: 100%;
  fill: #a8a29e;
  transition:
    fill 0.22s ease,
    transform 0.22s ease;
  pointer-events: none;
}

.favorite-button-container:hover .svg-heart {
  fill: #78716c;
  transform: scale(1.08);
}

.svg-heart.is-favorite {
  fill: var(--heart-color);
  animation: keyframes-svg-filled 0.45s ease-out;
}

.svg-celebrate {
  position: absolute;
  animation: keyframes-svg-celebrate 0.42s ease-out;
  animation-fill-mode: forwards;
  stroke: var(--heart-color);
  fill: var(--heart-color);
  stroke-width: 2px;
  width: 86px;
  height: 86px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 10;
}

.favorite-text {
  font-size: 11px;
  color: #78716c;
  font-weight: 500;
  transition: color 0.18s ease;
  white-space: nowrap;
  user-select: none;
}

.favorite-button-container:hover .favorite-text {
  color: #292524;
}

.favorite-text.is-favorite {
  color: var(--heart-color);
}

.favorite-count {
  font-size: 10px;
  color: #a8a29e;
  font-weight: 500;
  min-height: 12px;
}

.heart-container.size-small {
  width: 30px;
  height: 30px;
}

.heart-container.size-large {
  width: 42px;
  height: 42px;
}

@keyframes keyframes-svg-filled {
  0% {
    transform: scale(1);
  }
  35% {
    transform: scale(1.15);
  }
  70% {
    transform: scale(0.94);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes keyframes-svg-celebrate {
  0% {
    transform: translate(-50%, -50%) scale(0.4);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0;
  }
}
</style>
