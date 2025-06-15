import { useNuxtApp } from '#app'

interface DesignRequest {
  name: string
  phone: string
  description: string
}

interface ApiResponse<T = any> {
  code: number
  data: T
  message: string
}

export const useDesignRequest = () => {
  const { $customFetch } = useNuxtApp()
  const loading = ref(false)

  const submitDesignRequest = async (data: DesignRequest) => {
    loading.value = true
    try {
      const response = await $customFetch<ApiResponse<DesignRequest>>('/design-request', {
        method: 'POST',
        body: data
      })
      return response
    } catch (error) {
      console.error('提交设计需求失败:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    submitDesignRequest,
    loading
  }
} 