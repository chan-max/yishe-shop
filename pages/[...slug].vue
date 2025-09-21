<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center px-4">
    <div class="max-w-md w-full text-center">
      <!-- 404 图标 -->
      <div class="mb-8">
        <div class="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 select-none">
          404
        </div>
      </div>

      <!-- 错误信息 -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white mb-3">Page Not Found</h1>
        <p class="text-gray-300">
          The page you're looking for doesn't exist.
        </p>
      </div>

      <!-- 操作按钮 -->
      <NuxtLink
        to="/"
        class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-semibold shadow-lg hover:scale-105 transform"
      >
        <Icon name="uil:home" class="w-4 h-4 mr-2" />
        Return Home
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()

// 设置页面标题
useHead({
  title: '404 - Page Not Found',
  meta: [
    {
      name: 'description',
      content: 'The page you are looking for does not exist. Return to our homepage to continue exploring.'
    },
    {
      name: 'robots',
      content: 'noindex, nofollow'
    }
  ]
})

</script>

<style scoped>
/* 响应式设计 */
@media (max-width: 640px) {
  .text-7xl {
    font-size: 4rem;
  }
  
  .text-3xl {
    font-size: 2rem;
  }
}
</style>
