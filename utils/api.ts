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
  status?: boolean
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

// 商品详情接口的返回数据类型
interface ProductImage2DResponse {
  id: string
  materialId: string
  templateGroup2DId: string
  name: string
  description: string
  keywords: string
  code?: string
  publishStatus: string
  isPublic: boolean
  image1?: string
  image2?: string
  image3?: string
  image4?: string
  image5?: string
  image6?: string
  image7?: string
  image8?: string
  image9?: string
  image10?: string
  createTime: string
  updateTime: string
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
  // 商品相关接口
  product: {
    // 根据ID或code获取商品详情（后端会自动识别）
    getById: (id: string) =>
      request<ApiResponse<ProductImage2DResponse>>(`/product-image-2d/${id}`, {
        method: 'GET',
      }),
    // 分页获取商品列表
    getPage: (params: { page?: number; pageSize?: number; publishStatus?: string; isPublic?: boolean }) =>
      request<ApiResponse<{ list: ProductImage2DResponse[]; total: number; page: number; pageSize: number }>>('/product-image-2d/page', {
        method: 'POST',
        body: params,
      }),
  },
}