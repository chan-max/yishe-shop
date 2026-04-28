/*
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-XX XX:XX:XX
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-01-XX XX:XX:XX
 * @FilePath: /yishe-nuxt/stores/public-user.ts
 * @Description: 开放用户状态管理
 */
import { defineStore } from 'pinia'

const PUBLIC_USER_TOKEN_KEY = 'public-user-token'

const getStoredToken = () => {
  if (!process.client) return null
  return window.localStorage.getItem(PUBLIC_USER_TOKEN_KEY)
}

const setStoredToken = (token: string | null) => {
  if (!process.client) return
  if (token) {
    window.localStorage.setItem(PUBLIC_USER_TOKEN_KEY, token)
  } else {
    window.localStorage.removeItem(PUBLIC_USER_TOKEN_KEY)
  }
}

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

interface PublicUserState {
  token: string | null
  userInfo: PublicUserInfo | null
}

export const usePublicUserStore = defineStore('publicUser', {
  state: (): PublicUserState => ({
    token: null,
    userInfo: null,
  }),

  getters: {
    isLoggedIn(state) {
      // 在客户端时，每次都从 localStorage 读取最新的 token
      if (process.client) {
        return !!getStoredToken()
      }
      // SSR 时使用 state 中的 token
      return !!state.token
    },
    currentUser: (state) => state.userInfo,
  },

  actions: {
    setToken(token: string) {
      this.token = token
      setStoredToken(token)
    },

    clearToken() {
      this.token = null
      setStoredToken(null)
      this.userInfo = null
    },

    setUserInfo(userInfo: PublicUserInfo) {
      this.userInfo = userInfo
    },

    // 初始化时从 localStorage 恢复 token
    initToken() {
      const token = getStoredToken()
      if (token) {
        this.token = token
      }
    },
  },
})
