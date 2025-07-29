<template>
  <div class="container mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-8">
    <h1 class="text-3xl font-bold mb-6">新人注册送100积分</h1>
    <div class="bg-white rounded-lg shadow-lg p-6">
      <p class="text-lg mb-4">欢迎加入我们！</p>
      <p class="mb-4">新用户注册即可获得100积分奖励，可用于购物抵扣。</p>
      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <p class="text-yellow-700">活动说明：</p>
        <ul class="list-disc list-inside mt-2">
          <li>仅限新注册用户</li>
          <li>积分将在注册成功后自动发放</li>
          <li>积分有效期为一年</li>
          <li>100积分可抵扣10元</li>
        </ul>
      </div>
      <button class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
        立即注册
      </button>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})
</script> 