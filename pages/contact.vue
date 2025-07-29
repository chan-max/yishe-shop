<template>
  <div class="container mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-8">
    <h1 class="text-3xl font-bold mb-6">联系我们</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-semibold mb-4">联系方式</h2>
        <div class="space-y-4">
          <p class="flex items-center">
            <span class="mr-2">📞</span>
            <span>客服电话：400-123-4567</span>
          </p>
          <p class="flex items-center">
            <span class="mr-2">✉️</span>
            <span>邮箱：support@example.com</span>
          </p>
          <p class="flex items-center">
            <span class="mr-2">🏢</span>
            <span>地址：北京市朝阳区xxx大厦</span>
          </p>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-semibold mb-4">在线留言</h2>
        <form class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">姓名</label>
            <input type="text" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
            <input type="email" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">留言内容</label>
            <textarea rows="4" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
          </div>
          <button type="submit" class="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            提交
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})
</script> 