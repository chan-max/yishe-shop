<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-4">
    <div class="max-w-md w-full text-center">
      <!-- 404 图标 -->
      <div class="mb-8">
        <div class="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 select-none">
          404
        </div>
      </div>

      <!-- 错误信息 -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-3">页面未找到</h1>
        <p class="text-gray-600">
          抱歉，您访问的页面不存在或已被移除。
        </p>
      </div>

      <!-- 操作按钮 -->
      <NuxtLink
        to="/"
        class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:scale-105 transform"
      >
        <Icon name="uil:home" class="w-4 h-4 mr-2" />
        返回首页
      </NuxtLink>
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
/* 页面整体样式 */
.min-h-screen {
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 404数字样式优化 */
.text-7xl {
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  letter-spacing: -0.02em;
}

/* 标题样式优化 */
.text-3xl {
  letter-spacing: -0.01em;
  line-height: 1.2;
}

/* 描述文字样式 */
.text-gray-600 {
  line-height: 1.6;
  font-size: 1.125rem;
}

/* 按钮悬停效果优化 */
.inline-flex:hover {
  box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.3);
}

/* 响应式设计 */
@media (max-width: 640px) {
  .text-7xl {
    font-size: 4rem;
  }
  
  .text-3xl {
    font-size: 2rem;
  }
  
  .text-gray-600 {
    font-size: 1rem;
  }
  
  .max-w-md {
    max-width: 100%;
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .text-7xl {
    font-size: 3rem;
  }
  
  .text-3xl {
    font-size: 1.5rem;
  }
  
  .text-gray-600 {
    font-size: 0.875rem;
  }
  
  .px-6 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .py-3 {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }
}
</style>
