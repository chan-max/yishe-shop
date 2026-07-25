<template>
  <div class="shop-a-page min-h-[70vh] flex flex-col items-center justify-center p-8 text-center">
    <div class="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold tracking-wide uppercase mb-4 border border-blue-100">
      SHOP-A 独立站示例
    </div>
    
    <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
      欢迎来到 Shop-A 定制独立站
    </h1>
    
    <p class="max-w-xl text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
      本项目为独立运行与打包构建的子站点。已自动继承 shop-main 基座的全部组件库、状态管理、接口请求与收藏/评论功能。
    </p>

    <div class="flex flex-wrap items-center justify-center gap-4">
      <NuxtLink to="/products" class="px-6 py-3 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition">
        浏览商品库
      </NuxtLink>
      <NuxtLink to="/contact" class="px-6 py-3 bg-gray-100 text-gray-800 rounded-full text-sm font-semibold border border-gray-200 hover:bg-gray-200 transition">
        联系设计师
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
// 自动继承 shop-main 基座的全局 SEO & Meta 配置能力
useHead({
  title: 'Shop-A 专属独立站'
})
</script>
