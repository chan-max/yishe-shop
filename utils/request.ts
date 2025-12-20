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
  // 优先使用 public-user-token（开放用户），如果没有则使用普通 token（管理员）
  let publicUserToken: string | null = null
  let token: string | null = null
  
  if (process.client) {
    const publicUserTokenStorage = useLocalStorage('public-user-token', null)
    const tokenStorage = useLocalStorage('token', null)
    publicUserToken = publicUserTokenStorage.value
    token = tokenStorage.value
  }
  
  const finalToken = publicUserToken || token

  try {
    const response = await ofetch<Response<T>>(`${BASE_URL}${url}`, {
      method,
      params,
      body,
      headers: {
        'Content-Type': 'application/json',
        ...(finalToken ? { Authorization: `Bearer ${finalToken}` } : {}),
        ...headers,
      },
    })

    return response
  } catch (error: any) {
    // 统一错误处理
    let errorMessage = error.message || '请求失败'
    
    // 对于登录相关的错误，提供更友好的提示
    if (url.includes('login') || url.includes('auth')) {
      if (error.statusCode === 401 || error.statusCode === 400) {
        errorMessage = '用户名或密码不正确'
      } else if (error.message?.includes('token') || error.message?.includes('null')) {
        errorMessage = '用户名或密码不正确'
      }
    }
    
    // 对于注册相关的错误，优化账号重复的提示
    if (url.includes('register')) {
      const responseMessage = error.data?.message || error.message || ''
      if (
        error.statusCode === 400 ||
        responseMessage.includes('已存在') ||
        responseMessage.includes('已注册') ||
        responseMessage.includes('duplicate') ||
        responseMessage.includes('exists')
      ) {
        errorMessage = '该账号已被注册，请使用其他账号或直接登录'
      }
    }
    
    const errorResponse: Response = {
      code: error.statusCode || 500,
      data: null as any,
      message: errorMessage,
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