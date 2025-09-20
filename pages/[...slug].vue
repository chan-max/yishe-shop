<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="max-w-md w-full text-center">
      <!-- 404 图标 -->
      <div class="mb-6">
        <div class="text-6xl font-bold text-gray-300 select-none">404</div>
      </div>

      <!-- 错误信息 -->
      <div class="mb-8">
        <h1 class="text-2xl font-semibold text-gray-800 mb-2">页面未找到</h1>
        <p class="text-gray-600">
          抱歉，您访问的页面不存在。
        </p>
      </div>

      <!-- 操作按钮 -->
      <div class="space-y-3">
        <NuxtLink
          to="/"
          class="inline-flex items-center px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors font-medium"
        >
          返回首页
        </NuxtLink>
        
        <button
          @click="goBack"
          class="block mx-auto text-gray-600 hover:text-gray-800 transition-colors text-sm"
        >
          返回上页
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
      content: '抱歉，您访问的页面不存在。'
    },
    {
      name: 'robots',
      content: 'noindex, nofollow'
    }
  ]
})

// 返回上一页
const goBack = () => {
  // 检查是否在客户端环境
  if (process.client) {
    if (window.history.length > 1) {
      router.go(-1)
    } else {
      router.push('/')
    }
  } else {
    // 服务端渲染时直接跳转到首页
    router.push('/')
  }
}
</script>

<style scoped>
/* 响应式设计 */
@media (max-width: 640px) {
  .text-6xl {
    font-size: 3rem;
  }
  
  .text-2xl {
    font-size: 1.5rem;
  }
}
</style>
