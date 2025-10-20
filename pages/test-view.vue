<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:45:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-01-27 11:45:00
 * @FilePath: /yishe-nuxt/pages/test-view.vue
 * @Description: 测试商品查看页面的链接页面
-->
<script setup lang="ts">
import { ref } from 'vue'

// 测试用的商品ID列表
const testIds = ref([
  'test-id-1',
  'test-id-2', 
  '123',
  'abc',
  'product-001'
])

// 自定义ID输入
const customId = ref('')

// 跳转到商品详情页
const goToProduct = (productId: string) => {
  if (productId.trim()) {
    navigateTo(`/view/${productId.trim()}`)
  }
}

// 设置页面标题
useHead({
  title: '测试商品查看页面 - 衣设服装设计',
  meta: [
    {
      name: 'description',
      content: '测试商品详情页面的链接'
    }
  ]
})
</script>

<template>
  <div class="test-view-page">
    <div class="container">
      <h1 class="page-title">测试商品查看页面</h1>
      
      <div class="test-section">
        <h2>预设测试ID</h2>
        <p>点击下面的链接测试不同的商品ID：</p>
        
        <div class="test-links">
          <button 
            v-for="testId in testIds" 
            :key="testId"
            @click="goToProduct(testId)"
            class="test-link"
          >
            测试ID: {{ testId }}
          </button>
        </div>
      </div>
      
      <div class="custom-section">
        <h2>自定义ID测试</h2>
        <div class="custom-input">
          <input 
            v-model="customId"
            type="text"
            placeholder="输入商品ID"
            class="id-input"
          />
          <button 
            @click="goToProduct(customId)"
            :disabled="!customId.trim()"
            class="go-btn"
          >
            查看商品
          </button>
        </div>
      </div>
      
      <div class="info-section">
        <h2>说明</h2>
        <ul>
          <li>这些链接会跳转到 <code>/view/[id]</code> 页面</li>
          <li>页面会显示调试信息，包括获取到的ID和API配置</li>
          <li>如果后端服务未运行，会显示连接错误</li>
          <li>如果商品ID不存在，会显示相应的错误信息</li>
        </ul>
      </div>
      
      <div class="back-link">
        <NuxtLink to="/" class="back-btn">返回首页</NuxtLink>
        <NuxtLink to="/test-api" class="back-btn">API测试页面</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.test-view-page {
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

.test-section,
.custom-section,
.info-section {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.test-section h2,
.custom-section h2,
.info-section h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
}

.test-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.test-link {
  padding: 0.75rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.test-link:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.custom-input {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.id-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
}

.id-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.go-btn {
  padding: 0.75rem 1.5rem;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.go-btn:hover:not(:disabled) {
  background: #059669;
  transform: translateY(-1px);
}

.go-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.info-section ul {
  color: #6b7280;
  line-height: 1.6;
}

.info-section li {
  margin-bottom: 0.5rem;
}

.info-section code {
  background: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.875rem;
}

.back-link {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.back-btn {
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
  .test-view-page {
    padding: 1rem;
  }
  
  .custom-input {
    flex-direction: column;
  }
  
  .id-input,
  .go-btn {
    width: 100%;
  }
  
  .back-link {
    flex-direction: column;
    align-items: center;
  }
  
  .back-btn {
    width: 100%;
    max-width: 200px;
    text-align: center;
  }
}
</style>
