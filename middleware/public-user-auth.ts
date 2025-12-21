/*
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-XX XX:XX:XX
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-01-XX XX:XX:XX
 * @FilePath: /yishe-nuxt/middleware/public-user-auth.ts
 * @Description: 开放用户认证中间件
 */
import { usePublicUserStore } from '~/stores/public-user'

export default defineNuxtRouteMiddleware((to, from) => {
  // SSR 时不进行跳转，等待客户端初始化
  if (!process.client) {
    return
  }
  
  const publicUserStore = usePublicUserStore()
  
  // 在客户端时，先初始化 token（从 localStorage 恢复）
  publicUserStore.initToken()
  
  // 检查是否已登录
  if (!publicUserStore.isLoggedIn) {
    return navigateTo('/login')
  }
})

