<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">会员中心</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">会员信息</h2>
        <!-- 这里后续可以添加会员信息组件 -->
        <div class="text-gray-500">会员信息即将上线...</div>
      </div>
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">会员特权</h2>
        <!-- 这里后续可以添加会员特权组件 -->
        <div class="text-gray-500">会员特权即将上线...</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'page'
})
</script> 