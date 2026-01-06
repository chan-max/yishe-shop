<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:30:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-01-27 11:30:00
 * @FilePath: /yishe-nuxt/pages/test-api.vue
 * @Description: API测试页面
-->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '~/utils/api'

// 响应式数据
const testResult = ref<any>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const apiBase = ref('')

// 测试API连接
const testApiConnection = async () => {
  try {
    loading.value = true
    error.value = null
    
    console.log('测试API连接...')
    console.log('API基础URL:', useRuntimeConfig().public.apiBase)
    
    // 测试hello接口
    const response = await api.hello.get()
    
    console.log('API响应:', response)
    
    testResult.value = response
  } catch (err: any) {
    console.error('API测试错误:', err)
    error.value = err.message || 'API连接失败'
  } finally {
    loading.value = false
  }
}

// 测试商品API - 已暂时注释，不再使用 2d 商品相关逻辑
/*
const testProductApi = async () => {
  try {
    loading.value = true
    error.value = null
    
    console.log('测试商品API...')
    
    // 测试商品分页接口
    const response = await api.product.getPage({ page: 1, pageSize: 1 })
    
    console.log('商品API响应:', response)
    
    testResult.value = response
  } catch (err: any) {
    console.error('商品API测试错误:', err)
    error.value = err.message || '商品API连接失败'
  } finally {
    loading.value = false
  }
}
*/

// 页面加载时获取API基础URL
onMounted(() => {
  apiBase.value = useRuntimeConfig().public.apiBase
})

// 设置页面标题
useHead({
  title: 'API测试 - 衣设服装设计',
  meta: [
    {
      name: 'description',
      content: 'API连接测试页面'
    }
  ]
})
</script>

<template>
  <div class="test-api-page">
    <div class="container">
      <h1 class="page-title">API连接测试</h1>
      
      <div class="api-info">
        <h2>API配置信息</h2>
        <p><strong>API基础URL:</strong> {{ apiBase }}</p>
      </div>
      
      <div class="test-buttons">
        <button @click="testApiConnection" class="test-btn" :disabled="loading">
          {{ loading ? '测试中...' : '测试Hello API' }}
        </button>
        
        <!-- 暂时注释掉 2d 商品 API 测试 -->
        <!-- <button @click="testProductApi" class="test-btn" :disabled="loading">
          {{ loading ? '测试中...' : '测试商品API' }}
        </button> -->
      </div>
      
      <!-- 加载状态 -->
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>正在测试API连接...</p>
      </div>
      
      <!-- 错误状态 -->
      <div v-else-if="error" class="error">
        <h3>测试失败</h3>
        <p>{{ error }}</p>
      </div>
      
      <!-- 测试结果 -->
      <div v-else-if="testResult" class="result">
        <h3>测试结果</h3>
        <pre class="result-json">{{ JSON.stringify(testResult, null, 2) }}</pre>
      </div>
      
      <!-- 返回链接 -->
      <div class="back-link">
        <NuxtLink to="/" class="back-btn">返回首页</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.test-api-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  padding: 2rem;
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  text-align: center;
  margin-bottom: 2rem;
}

.api-info {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.api-info h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
}

.api-info p {
  color: #6b7280;
  font-family: 'Monaco', 'Menlo', monospace;
  background: #f9fafb;
  padding: 0.5rem;
  border-radius: 4px;
}

.test-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.test-btn {
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.test-btn:hover:not(:disabled) {
  background: #2563eb;
  transform: translateY(-1px);
}

.test-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.loading {
  text-align: center;
  padding: 2rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.error h3 {
  margin-bottom: 0.5rem;
}

.result {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.result h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
}

.result-json {
  background: #f9fafb;
  padding: 1rem;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.875rem;
  overflow-x: auto;
  white-space: pre-wrap;
}

.back-link {
  text-align: center;
}

.back-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #f3f4f6;
  color: #374151;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: #e5e7eb;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .test-api-page {
    padding: 1rem;
  }
  
  .test-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .test-btn {
    width: 100%;
    max-width: 200px;
  }
}
</style>
