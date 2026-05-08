import { api } from "~/utils/api"

export const useDesignRequest = () => {
  const loading = ref(false)

  const submitDesignRequest = async (data: {
    name: string
    description?: string
    phoneNumber?: string
    email?: string
  }) => {
    loading.value = true
    try {
      const response = await api.design.submit(data)
      return response
    } catch (error) {
      console.error("提交设计需求失败:", error)
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    submitDesignRequest,
    loading,
  }
}
