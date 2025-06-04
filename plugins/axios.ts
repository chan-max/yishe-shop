import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  
  // 创建自定义的 fetch 实例
  const customFetch = $fetch.create({
    baseURL: config.public.apiBase,
    // 响应拦截器
    async onResponse({ response }) {
      // 统一处理响应数据结构
      if (response._data && response._data.data !== undefined) {
        response._data = response._data.data
      }
    }
  })

  // 将自定义的 fetch 实例注入到 nuxt 应用中
  nuxtApp.provide('customFetch', customFetch)
}) 