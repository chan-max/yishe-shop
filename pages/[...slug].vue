<template>
  <div class="error-page">
    <div class="error-container">
      <!-- 404 数字 -->
      <div class="error-number">404</div>

      <!-- 错误信息 -->
      <h1 class="error-title">页面未找到</h1>
      <p class="error-description">
        抱歉，您访问的页面不存在或已被移除
      </p>

      <!-- 操作按钮 -->
      <div class="error-actions">
        <NuxtLink to="/" class="back-btn">
          <v-icon size="16">mdi-home</v-icon>
          <span>返回首页</span>
        </NuxtLink>
        <button @click="$router.back()" class="back-btn secondary">
          <v-icon size="16">mdi-arrow-left</v-icon>
          <span>返回上一页</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()

// 设置页面标题
useHead({
  title: '404 - 页面未找到',
  meta: [
    {
      name: 'description',
      content: '抱歉，您访问的页面不存在或已被移除。请返回首页继续浏览我们的内容。'
    },
    {
      name: 'robots',
      content: 'noindex, nofollow'
    }
  ]
})

</script>

<style scoped>
.error-page {
  min-height: 100vh;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.error-container {
  max-width: 500px;
  width: 100%;
  text-align: center;
}

.error-number {
  font-size: 8rem;
  font-weight: 700;
  color: #111827;
  line-height: 1;
  margin-bottom: 1.5rem;
  letter-spacing: -0.05em;
  opacity: 0.1;
  user-select: none;
  
  @media (max-width: 768px) {
    font-size: 6rem;
  }
  
  @media (max-width: 480px) {
    font-size: 4.5rem;
  }
}

.error-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.75rem 0;
  letter-spacing: -0.02em;
  
  @media (max-width: 768px) {
    font-size: 1.35rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
}

.error-description {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 2rem 0;
  line-height: 1.6;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin-bottom: 1.5rem;
  }
}

.error-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.25rem;
  background: #111827;
  color: #ffffff;
  text-decoration: none;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #1f2937;
    transform: translateY(-2px);
  }
  
  &.secondary {
    background: #f3f4f6;
    color: #111827;
    
    &:hover {
      background: #e5e7eb;
    }
  }
  
  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
    padding: 0.7rem 1.25rem;
  }
}

/* 优化移动端布局 */
@media (max-width: 480px) {
  .error-page {
    padding: 1.5rem;
  }
  
  .error-actions {
    width: 100%;
    flex-direction: column;
  }
}
</style>
