<template>
  <div class="empty-state">
    <v-icon :size="iconSize" :color="iconColor">{{ icon }}</v-icon>
    <h3 class="empty-title">{{ title }}</h3>
    <p class="empty-description">{{ description }}</p>
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
  title?: string
  description?: string
  showRetry?: boolean
  retryText?: string
  retryIcon?: string
  retryButtonColor?: string
}

interface Emits {
  (e: 'retry'): void
}

withDefaults(defineProps<Props>(), {
  icon: 'mdi-information-outline',
  iconSize: 64,
  iconColor: 'grey-lighten-1',
  title: '暂无数据',
  description: '请尝试调整筛选条件或稍后再试',
  showRetry: false,
  retryText: '重试',
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
  
  .empty-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: #ffffff;
    margin: 1rem 0 0.5rem;
  }
  
  .empty-description {
    color: #b0b0b0;
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }
  
  .retry-btn {
    margin-top: 1rem;
  }
}
</style>
