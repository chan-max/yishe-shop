import { ofetch } from 'ofetch'
import { useLocalStorage } from '@vueuse/core'

const BASE_URL = 'https://localhost:4321/api'

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
}

export const request = async <T = any>(
  url: string,
  options: RequestOptions = {}
): Promise<Response<T>> => {
  const { method = 'GET', params, body, headers = {} } = options

  // 使用 useLocalStorage 获取 token
  const token = useLocalStorage('token', null).value

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