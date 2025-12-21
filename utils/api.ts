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

// 开放用户注册接口的请求参数类型
interface PublicUserRegisterParams {
  account: string
  password: string
  name?: string
  phone?: string
  email?: string
}

// 开放用户登录接口的请求参数类型
interface PublicUserLoginParams {
  username: string
  password: string
}

// 开放用户登录接口的返回数据类型
interface PublicUserLoginResponse {
  token: string
}

// 开放用户信息类型
interface PublicUserInfo {
  id: number
  account: string
  name?: string
  phone?: string
  email?: string
  avatar?: string
  sex?: number
  birthday?: string
  status?: string
  createTime: string
  updateTime: string
}

// 更新开放用户信息参数类型
interface UpdatePublicUserParams {
  id?: number
  name?: string
  avatar?: string
  email?: string
  sex?: number
  birthday?: string
  phone?: string
  status?: string
}

// 修改密码参数类型
interface UpdatePublicUserPasswordParams {
  password: string
  newPassword: string
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

// 商品（Product）接口的返回数据类型
interface ProductResponse {
  id: string
  code?: string
  name: string
  description?: string
  type?: string
  images?: string[]
  videos?: string[]
  price: number
  salePrice?: number
  stock: number
  specifications?: string
  tags?: string
  keywords?: string
  searchKeywords?: string
  isActive: boolean
  isPublish: boolean
  isLimitedEdition: number
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
  // 开放用户相关接口
  publicUser: {
    // 注册
    register: (params: PublicUserRegisterParams) =>
      request<ApiResponse<PublicUserInfo>>('/public-user/register', {
        method: 'POST',
        body: params,
      }),
    // 登录
    login: (params: PublicUserLoginParams) =>
      request<ApiResponse<PublicUserLoginResponse>>('/public-user-auth/login', {
        method: 'POST',
        body: params,
      }),
    // 登出
    logout: () =>
      request<ApiResponse<{ message: string }>>('/public-user-auth/logout', {
        method: 'POST',
      }),
    // 获取用户信息
    getUserInfo: (id?: string) =>
      request<ApiResponse<PublicUserInfo>>('/public-user/getUserInfo', {
        method: 'POST',
        body: id ? { id } : {},
      }),
    // 更新用户信息
    update: (params: UpdatePublicUserParams) =>
      request<ApiResponse<PublicUserInfo>>('/public-user/update', {
        method: 'POST',
        body: params,
      }),
    // 修改密码
    updatePassword: (params: UpdatePublicUserPasswordParams) =>
      request<ApiResponse<{}>>('/public-user/updatePass', {
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
  // 商品（Product）相关接口
  productList: {
    // 分页获取商品列表（不包含关联信息）
    getPage: (params: { 
      page?: number
      pageSize?: number
      isPublish?: boolean
      type?: string
      search?: string
      includeRelations?: boolean
    }) =>
      request<ApiResponse<{ list: ProductResponse[]; total: number; page: number; pageSize: number }>>('/product/page', {
        method: 'POST',
        body: {
          ...params,
          includeRelations: params.includeRelations ?? false, // 默认不包含关联信息
        },
      }),
    // 根据ID获取商品详情（不包含关联信息）
    getById: (id: string, includeRelations: boolean = false) =>
      request<ApiResponse<ProductResponse>>(`/product/${id}?includeRelations=${includeRelations}`, {
        method: 'GET',
      }),
  },
  // 收藏相关接口（开放用户商品收藏）
  favorite: {
    // 添加收藏
    create: (params: { productId: string; remark?: string; tags?: string }) =>
      request<ApiResponse<any>>('/favorite', {
        method: 'POST',
        body: params,
      }),
    // 取消收藏（根据商品ID）
    remove: (productId: string) =>
      request<ApiResponse<{ message: string }>>(`/favorite/product/${productId}`, {
        method: 'DELETE',
      }),
    // 检查是否收藏了某个商品
    check: (productId: string) =>
      request<ApiResponse<boolean>>(`/favorite/product/${productId}/check`, {
        method: 'GET',
      }),
    // 批量检查商品是否被收藏
    checkBatch: (productIds: string[]) =>
      request<ApiResponse<Record<string, boolean>>>('/favorite/check', {
        method: 'POST',
        body: { productIds },
      }),
    // 获取商品的收藏数量
    getProductCount: (productId: string) =>
      request<ApiResponse<number>>(`/favorite/product/${productId}/count`, {
        method: 'GET',
      }),
    // 批量获取商品的收藏数量
    getProductCounts: (productIds: string[]) =>
      request<ApiResponse<Record<string, number>>>('/favorite/product/counts', {
        method: 'POST',
        body: { productIds },
      }),
    // 获取我的收藏列表
    getMyFavorites: (params: { currentPage: number; pageSize: number; includeProduct?: boolean }) =>
      request<ApiResponse<{ list: any[]; total: number; page: number; pageSize: number }>>('/favorite/my', {
        method: 'GET',
        params: {
          currentPage: params.currentPage,
          pageSize: params.pageSize,
          includeProduct: params.includeProduct ?? true,
        },
      }),
    // 获取我的收藏商品ID列表
    getMyFavoriteProductIds: () =>
      request<ApiResponse<string[]>>('/favorite/my/product-ids', {
        method: 'GET',
      }),
  },
}