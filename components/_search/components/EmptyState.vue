<template>
  <div class="empty-state">
    <div class="empty-logo">
      <v-icon :size="iconSize" :color="iconColor">{{ icon }}</v-icon>
    </div>
    <div class="empty-title">这里还没人放东西</div>
    <div class="empty-text">
      这个条件下暂时没有合适内容。换个词，或者稍微拐一下方向，也许就出来了。
    </div>
    <button
      v-if="showRetry"
      type="button"
      @click="$emit('retry')"
      class="retry-btn"
    >
      <v-icon size="16">{{ retryIcon }}</v-icon>
      {{ retryText }}
    </button>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  icon?: string;
  iconSize?: number | string;
  iconColor?: string;
  showRetry?: boolean;
  retryText?: string;
  retryIcon?: string;
  retryButtonColor?: string;
}

interface Emits {
  (e: "retry"): void;
}

withDefaults(defineProps<Props>(), {
  icon: "mdi-package-variant-empty",
  iconSize: 64,
  iconColor: "grey-lighten-1",
  showRetry: false,
  retryText: "再试一次",
  retryIcon: "mdi-refresh",
  retryButtonColor: "primary",
});

defineEmits<Emits>();
</script>

<style lang="scss" scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  text-align: center;
  padding: 2.5rem 2rem;
  border: 1px dashed rgba(28, 25, 23, 0.12);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.72);

  .empty-logo {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 72px;
    height: 72px;
    margin-bottom: 1rem;
    border-radius: 999px;
    background: #faf8f5;
    border: 1px solid rgba(28, 25, 23, 0.08);
  }

  .empty-title {
    font-size: 14px;
    font-weight: 600;
    color: #1c1917;
    margin-bottom: 0.45rem;
  }

  .empty-text {
    max-width: 320px;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.7;
    color: #78716c;
    margin-bottom: 1rem;
  }

  .retry-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    margin-top: 0.25rem;
    min-height: 34px;
    padding: 0 14px;
    border: 1px solid rgba(28, 25, 23, 0.1);
    border-radius: 999px;
    background: #ffffff;
    color: #44403c;
    font-size: 12px;
    cursor: pointer;
    transition:
      transform 0.16s ease,
      border-color 0.16s ease,
      background-color 0.16s ease,
      color 0.16s ease;

    &:hover {
      transform: translateY(-1px);
      border-color: rgba(28, 25, 23, 0.18);
      background: #fcfbf9;
      color: #1c1917;
    }
  }
}
</style>
