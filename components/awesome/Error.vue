<script lang="ts" setup>
// components
const PageWrapper = resolveComponent('LayoutPageWrapper')

// compiler macro
const props = defineProps({
  code: {
    type: Number,
    default: 400,
  },
  wrap: {
    type: Boolean,
    default: false,
  },
})

// computed
const errorsMap: {
  [key: string]: string
} = {
  '400': '请求错误',
  '401': '未授权',
  '403': '禁止访问',
  '404': '页面未找到',
}
const error = computed(() => {
  const { code } = props
  return {
    code,
    message: errorsMap[code.toString()] || '未知错误',
  }
})
</script>

<template>
  <component
    :is="props.wrap ? PageWrapper : 'div'"
    :class="props.wrap ? 'flex flex-col items-center justify-center min-h-screen bg-white text-gray-900' : 'error-container'"
  >
    <div class="error-content">
      <h1 class="text-center mb-8 leading-3">
        <span class="font-bold text-8xl block text-gray-900">{{ error.code }}</span>
        <span class="block italic text-xl text-gray-600 mt-4">{{ error.message }}</span>
      </h1>
      <div class="text-center">
        <AwesomeButton text="返回首页" to="/" size="sm" />
      </div>
    </div>
  </component>
</template>

<style scoped>
.error-container {
  min-height: 100vh;
  background: white;
  color: #1f2937;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.error-content {
  text-align: center;
  max-width: 600px;
}

.error-content h1 {
  margin-bottom: 2rem;
}

.error-content h1 span:first-child {
  color: #1f2937;
  font-weight: 800;
  font-size: 6rem;
  line-height: 1;
  margin-bottom: 1rem;
}

.error-content h1 span:last-child {
  color: #6b7280;
  font-style: italic;
  font-size: 1.25rem;
  font-weight: 400;
}

@media (max-width: 768px) {
  .error-content h1 span:first-child {
    font-size: 4rem;
  }
  
  .error-content h1 span:last-child {
    font-size: 1.125rem;
  }
}

@media (max-width: 480px) {
  .error-content h1 span:first-child {
    font-size: 3rem;
  }
  
  .error-content h1 span:last-child {
    font-size: 1rem;
  }
}
</style>
