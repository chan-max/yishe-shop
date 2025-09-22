<template>
  <div v-if="total > 0" class="pagination-container">
    <div class="pagination-wrapper">
      <!-- 上一页按钮 -->
      <button 
        class="pagination-btn prev-btn"
        :disabled="currentPage <= 1"
        @click="goToPage(currentPage - 1)"
      >
        <v-icon size="14">mdi-chevron-left</v-icon>
      </button>
      
      <!-- 页码按钮 -->
      <div class="page-numbers">
        <button
          v-for="page in visiblePages"
          :key="page"
          class="pagination-btn page-btn"
          :class="{ 
            'active': page === currentPage,
            'ellipsis': page === '...'
          }"
          :disabled="page === '...'"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
      </div>
      
      <!-- 下一页按钮 -->
      <button 
        class="pagination-btn next-btn"
        :disabled="currentPage >= totalPages"
        @click="goToPage(currentPage + 1)"
      >
        <v-icon size="14">mdi-chevron-right</v-icon>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  total: number
  pageSize: number
  modelValue: number
}

interface Emits {
  (e: 'update:modelValue', value: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const currentPage = computed({
  get: () => props.modelValue,
  set: (value: number) => emit('update:modelValue', value)
})

const totalPages = computed(() => Math.ceil(props.total / props.pageSize))

// 计算可见的页码
const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const current = currentPage.value
  const total = totalPages.value
  
  if (total <= 7) {
    // 总页数少于等于7页，显示所有页码
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // 总页数大于7页，使用省略号
    if (current <= 4) {
      // 当前页在前4页
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      // 当前页在后4页
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      // 当前页在中间
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    }
  }
  
  return pages
})

const goToPage = (page: number | string) => {
  if (typeof page === 'number' && page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}
</script>

<style lang="scss" scoped>
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  padding: 0.5rem 0;
}

.pagination-wrapper {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  padding: 0.25rem;
}

.page-numbers {
  display: flex;
  align-items: center;
  gap: 0.125rem;
}

.pagination-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: #666;
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.15s ease;
  position: relative;
  
  &:hover:not(:disabled):not(.ellipsis) {
    background: rgba(255, 255, 255, 0.05);
    color: #999;
  }
  
  &.active {
    background: rgba(59, 130, 246, 0.15);
    color: #3b82f6;
    font-weight: 500;
  }
  
  &.ellipsis {
    cursor: default;
    color: #444;
    font-weight: 400;
    
    &:hover {
      background: transparent;
    }
  }
  
  &:disabled {
    opacity: 0.2;
    cursor: not-allowed;
    
    &:hover {
      background: transparent;
    }
  }
  
  // 上一页/下一页按钮
  &.prev-btn,
  &.next-btn {
    color: #777;
    
    &:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.05);
      color: #999;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .pagination-wrapper {
    gap: 0.125rem;
    padding: 0.125rem;
  }
  
  .pagination-btn {
    min-width: 24px;
    height: 24px;
    font-size: 11px;
  }
  
  .page-numbers {
    gap: 0.0625rem;
  }
}
</style>
