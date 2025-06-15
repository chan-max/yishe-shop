/*
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-05-17 06:14:09
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-05-17 06:56:51
 * @FilePath: /yishe-nuxt/utils/api.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { request } from './request'

// 定义接口返回的数据类型
interface ApiResponse<T = any> {
  code: number
  data: T
  message: string
}

// 定义测试接口的返回数据类型
interface HelloResponse {
  message: string
  timestamp: number
}

// 登录接口的请求参数类型
interface LoginParams {
  username: string
  password: string
}

// 登录接口的返回数据类型
interface LoginResponse {
  token: string
}

// 设计请求的请求参数类型
interface DesignRequestParams {
  name: string
  phone: string
  description: string
}

// 设计请求的返回数据类型
interface DesignRequestResponse {
  name: string
  phone: string
  description: string
}

// API 方法封装
export const api = {
  // 测试接口
  hello: {
    get: () => request<ApiResponse<HelloResponse>>('/hello'),
  },
  // 认证相关接口
  auth: {
    login: (params: LoginParams) => 
      request<ApiResponse<LoginResponse>>('/auth/login', {
        method: 'POST',
        body: params,
      }),
  },
  // 设计请求相关接口
  design: {
    submit: (params: DesignRequestParams) =>
      request<ApiResponse<DesignRequestResponse>>('/design-request', {
        method: 'POST',
        body: params,
      }),
  },
}