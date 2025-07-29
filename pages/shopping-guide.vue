<template>
  <div class="container mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-8">
    <h1 class="text-2xl font-bold mb-6">购物指南</h1>
    <div class="space-y-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">购物流程</h2>
        <div class="space-y-4">
          <div class="flex items-start">
            <div class="w-8 h-8 bg-[#d01345] text-white rounded-full flex items-center justify-center mr-4">1</div>
            <div>
              <h3 class="font-medium">注册/登录</h3>
              <p class="text-gray-600">创建账号或登录已有账号</p>
            </div>
          </div>
          <div class="flex items-start">
            <div class="w-8 h-8 bg-[#d01345] text-white rounded-full flex items-center justify-center mr-4">2</div>
            <div>
              <h3 class="font-medium">浏览商品</h3>
              <p class="text-gray-600">选择心仪的商品加入购物车</p>
            </div>
          </div>
          <div class="flex items-start">
            <div class="w-8 h-8 bg-[#d01345] text-white rounded-full flex items-center justify-center mr-4">3</div>
            <div>
              <h3 class="font-medium">提交订单</h3>
              <p class="text-gray-600">确认订单信息并完成支付</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'page'
})
</script> 