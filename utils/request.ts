/*
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-05-16 07:16:24
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-06-05 06:45:17
 * @FilePath: /design-server/Users/jackie/workspace/yishe-nuxt/utils/request.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ofetch } from 'ofetch'
import { useLocalStorage } from '@vueuse/core'

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  params?: Record<string, any>
  body?: any
  headers?: Record<string, string>
}

interface Response<T = any> {
  code: number
  data: T
  message: string
  status?: boolean
}

export const request = async <T = any>(
  url: string,
  options: RequestOptions = {}
): Promise<Response<T>> => {
  const { method = 'GET', params, body, headers = {} } = options

  // 在调用时读取运行时配置，避免在模块顶层使用 useRuntimeConfig 导致 SSR 上下文缺失
  const { public: publicRuntime } = useRuntimeConfig()
  const BASE_URL = publicRuntime.apiBase

  // 仅在客户端读取本地存储，避免 SSR 时访问导致报错
  const token = process.client ? useLocalStorage('token', null).value : null

  try {
    const response = await ofetch<Response<T>>(`${BASE_URL}${url}`, {
      method,
      params,
      body,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    })

    return response
  } catch (error: any) {
    // 统一错误处理
    const errorResponse: Response = {
      code: error.statusCode || 500,
      data: null as any,
      message: error.message || '请求失败',
    }
    return errorResponse
  }
}

// 导出便捷方法
export const get = <T = any>(url: string, params?: Record<string, any>, headers?: Record<string, string>) => {
  return request<T>(url, { method: 'GET', params, headers })
}

export const post = <T = any>(url: string, body?: any, headers?: Record<string, string>) => {
  return request<T>(url, { method: 'POST', body, headers })
}

export const put = <T = any>(url: string, body?: any, headers?: Record<string, string>) => {
  return request<T>(url, { method: 'PUT', body, headers })
}

export const del = <T = any>(url: string, params?: Record<string, any>, headers?: Record<string, string>) => {
  return request<T>(url, { method: 'DELETE', params, headers })
} 