<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-01-27 11:00:00
 * @FilePath: /yishe-nuxt/error.vue
 * @Description: 404错误页面 - 白色主题中文版本
-->
<script setup lang="ts">
// 错误页面配置
const props = defineProps<{
  error: {
    statusCode: number
    statusMessage: string
    message: string
  }
}>()

// 错误信息映射
const errorMessages: { [key: number]: string } = {
  400: '请求错误',
  401: '未授权访问',
  403: '禁止访问',
  404: '页面未找到',
  500: '服务器内部错误',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时'
}

// 获取错误信息
const errorInfo = computed(() => {
  const code = props.error?.statusCode || 404
  const message = errorMessages[code] || '未知错误'
  
  return {
    code,
    message,
    description: getErrorDescription(code)
  }
})

// 获取错误描述
function getErrorDescription(code: number): string {
  const descriptions: { [key: number]: string } = {
    400: '您的请求格式不正确，请检查后重试',
    401: '您需要登录才能访问此页面',
    403: '您没有权限访问此页面',
    404: '抱歉，您访问的页面不存在或已被移除',
    500: '服务器遇到了问题，请稍后重试',
    502: '服务器暂时无法响应，请稍后重试',
    503: '服务暂时不可用，请稍后重试',
    504: '请求超时，请稍后重试'
  }
  
  return descriptions[code] || '发生了未知错误，请稍后重试'
}

// 返回首页
const goHome = () => {
  navigateTo('/')
}

// 返回上一页
const goBack = () => {
  if (process.client) {
    window.history.back()
  }
}

// 设置页面标题
useHead({
  title: `${errorInfo.value.code} - ${errorInfo.value.message}`,
  meta: [
    {
      name: 'description',
      content: errorInfo.value.description
    }
  ]
})
</script>

<template>
  <div class="error-page">
    <div class="error-container">
      <!-- 错误代码和标题 -->
      <div class="error-header">
        <h1 class="error-code">{{ errorInfo.code }}</h1>
        <h2 class="error-title">{{ errorInfo.message }}</h2>
        <p class="error-description">{{ errorInfo.description }}</p>
      </div>

      <!-- 装饰性图标 -->
      <div class="error-icon">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="50" stroke="#e5e7eb" stroke-width="2" fill="#f9fafb"/>
          <path d="M40 40L80 80M80 40L40 80" stroke="#9ca3af" stroke-width="3" stroke-linecap="round"/>
        </svg>
      </div>

      <!-- 操作按钮 -->
      <div class="error-actions">
        <button @click="goHome" class="btn-primary">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
          </svg>
          返回首页
        </button>
        
        <button @click="goBack" class="btn-secondary">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"/>
          </svg>
          返回上页
        </button>
      </div>

      <!-- 帮助链接 -->
      <div class="error-help">
        <p>如果您认为这是一个错误，请联系我们：</p>
        <div class="help-links">
          <NuxtLink to="/contact" class="help-link">联系我们</NuxtLink>
          <NuxtLink to="/about" class="help-link">关于我们</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.error-container {
  text-align: center;
  max-width: 600px;
  width: 100%;
}

.error-header {
  margin-bottom: 3rem;
}

.error-code {
  font-size: 8rem;
  font-weight: 800;
  color: #1f2937;
  line-height: 1;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.error-title {
  font-size: 2rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
  letter-spacing: -0.025em;
}

.error-description {
  font-size: 1.125rem;
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
}

.error-icon {
  margin-bottom: 3rem;
  opacity: 0.6;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  text-decoration: none;
}

.btn-primary {
  background: #3b82f6;
  color: white;
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.1);
}

.btn-primary:hover {
  background: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.1);
}

.btn-secondary {
  background: white;
  color: #374151;
  border: 1px solid #d1d5db;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.btn-secondary:hover {
  background: #f9fafb;
  border-color: #9ca3af;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.error-help {
  color: #6b7280;
  font-size: 0.875rem;
}

.error-help p {
  margin-bottom: 1rem;
}

.help-links {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.help-link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.help-link:hover {
  color: #2563eb;
  text-decoration: underline;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .error-page {
    padding: 1rem;
  }
  
  .error-code {
    font-size: 6rem;
  }
  
  .error-title {
    font-size: 1.5rem;
  }
  
  .error-description {
    font-size: 1rem;
  }
  
  .error-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-primary,
  .btn-secondary {
    width: 100%;
    max-width: 200px;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .error-code {
    font-size: 4rem;
  }
  
  .error-title {
    font-size: 1.25rem;
  }
  
  .error-description {
    font-size: 0.875rem;
  }
  
  .error-icon svg {
    width: 80px;
    height: 80px;
  }
  
  .help-links {
    flex-direction: column;
    align-items: center;
  }
}
</style>
