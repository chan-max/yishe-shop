<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">时尚资讯</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- 这里后续可以添加时尚资讯文章列表 -->
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="aspect-w-16 aspect-h-9 bg-gray-200 mb-4"></div>
        <h2 class="text-xl font-semibold mb-2">2024春季时尚趋势</h2>
        <p class="text-gray-600 mb-4">探索2024年春季最新时尚趋势，了解设计师们的创意灵感...</p>
        <div class="text-sm text-gray-500">2024-03-20</div>
      </div>
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="aspect-w-16 aspect-h-9 bg-gray-200 mb-4"></div>
        <h2 class="text-xl font-semibold mb-2">可持续时尚指南</h2>
        <p class="text-gray-600 mb-4">如何通过选择环保材料和支持可持续时尚品牌来保护环境...</p>
        <div class="text-sm text-gray-500">2024-03-18</div>
      </div>
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="aspect-w-16 aspect-h-9 bg-gray-200 mb-4"></div>
        <h2 class="text-xl font-semibold mb-2">穿搭技巧分享</h2>
        <p class="text-gray-600 mb-4">专业造型师分享的日常穿搭技巧，让你轻松打造完美造型...</p>
        <div class="text-sm text-gray-500">2024-03-15</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'page'
})
</script> 