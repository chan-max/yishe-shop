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
          <v-icon size="18">mdi-home</v-icon>
          <span>返回首页</span>
        </NuxtLink>
        <button @click="$router.back()" class="back-btn secondary">
          <v-icon size="18">mdi-arrow-left</v-icon>
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
  max-width: 600px;
  width: 100%;
  text-align: center;
}

.error-number {
  font-size: 10rem;
  font-weight: 700;
  color: #111827;
  line-height: 1;
  margin-bottom: 2rem;
  letter-spacing: -0.05em;
  opacity: 0.1;
  user-select: none;
  
  @media (max-width: 768px) {
    font-size: 8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 6rem;
  }
}

.error-title {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 1rem 0;
  letter-spacing: -0.02em;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
}

.error-description {
  font-size: 1rem;
  color: #6b7280;
  margin: 0 0 3rem 0;
  line-height: 1.6;
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    margin-bottom: 2rem;
  }
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #111827;
  color: #ffffff;
  text-decoration: none;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
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
    padding: 0.875rem 1.5rem;
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
