<template>
  <div class="empty-state">
    <div class="empty-logo">
      <v-icon :size="iconSize" :color="iconColor">{{ icon }}</v-icon>
    </div>
    <div class="empty-text">empty</div>
    <v-btn 
      v-if="showRetry" 
      :color="retryButtonColor" 
      @click="$emit('retry')" 
      class="retry-btn"
    >
      <v-icon left>{{ retryIcon }}</v-icon>
      {{ retryText }}
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  icon?: string
  iconSize?: number | string
  iconColor?: string
  showRetry?: boolean
  retryText?: string
  retryIcon?: string
  retryButtonColor?: string
}

interface Emits {
  (e: 'retry'): void
}

withDefaults(defineProps<Props>(), {
  icon: 'mdi-package-variant-empty',
  iconSize: 64,
  iconColor: 'grey-lighten-1',
  showRetry: false,
  retryText: 'Retry',
  retryIcon: 'mdi-refresh',
  retryButtonColor: 'primary'
})

defineEmits<Emits>()
</script>

<style lang="scss" scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  text-align: center;
  padding: 2rem;
  
  .empty-logo {
    margin-bottom: 0.75rem;
    opacity: 0.6;
  }
  
  .empty-text {
    font-size: 0.875rem;
    font-weight: 400;
    color: #6b7280;
    letter-spacing: 0.05em;
    text-transform: lowercase;
    margin-bottom: 1rem;
    opacity: 0.8;
  }
  
  .retry-btn {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    text-transform: none;
  }
}
</style>
