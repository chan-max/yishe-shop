<template>
  <div class="loading-container">
    <div class="loader">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 无需 props，纯视觉组件
</script>

<style lang="scss" scoped>
/* From Uiverse.io by cosnametv */
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  height: 60vh;
  width: 100%;
}

.loader {
  --color: #3b82f6;
  --size: 50px;
  width: var(--size);
  height: var(--size);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3px;
}

.loader span {
  width: 100%;
  height: 100%;
  background-color: var(--color);
  animation: keyframes-blink 0.6s alternate infinite linear;
}

.loader span:nth-child(1) {
  animation-delay: 0ms;
}

.loader span:nth-child(2) {
  animation-delay: 200ms;
}

.loader span:nth-child(3) {
  animation-delay: 300ms;
}

.loader span:nth-child(4) {
  animation-delay: 400ms;
}

.loader span:nth-child(5) {
  animation-delay: 500ms;
}

.loader span:nth-child(6) {
  animation-delay: 600ms;
}

@keyframes keyframes-blink {
  0% {
    opacity: 0.3;
    transform: scale(0.5) rotate(5deg);
  }

  50% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
