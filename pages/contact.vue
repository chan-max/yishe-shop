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
        <form class="space-y-4" @submit.prevent="handleSubmit">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">姓名</label>
            <input 
              v-model="form.name"
              type="text" 
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
            <input 
              v-model="form.email"
              type="email" 
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">留言内容</label>
            <textarea 
              v-model="form.message"
              rows="4" 
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>
          <button 
            type="submit" 
            class="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? '提交中...' : '提交' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'page'
})

// 表单数据
const form = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)

// 提交表单
const handleSubmit = async () => {
  isSubmitting.value = true
  
  try {
    // 这里可以添加实际的提交逻辑
    console.log('提交表单:', form.value)
    
    // 模拟提交延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 重置表单
    form.value = {
      name: '',
      email: '',
      message: ''
    }
    
    alert('留言提交成功！我们会尽快回复您。')
  } catch (error) {
    console.error('提交失败:', error)
    alert('提交失败，请稍后重试。')
  } finally {
    isSubmitting.value = false
  }
}
</script> 