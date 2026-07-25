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
    isLoggedIn(state): boolean {
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
      if (process.client) {
        window.localStorage.removeItem('public-user-info')
      }
    },

    setUserInfo(userInfo: PublicUserInfo) {
      this.userInfo = userInfo
      if (process.client && userInfo) {
        try {
          window.localStorage.setItem('public-user-info', JSON.stringify(userInfo))
        } catch {}
      }
    },

    // 初始化时从 localStorage 恢复 token 与 userInfo
    initToken() {
      const token = getStoredToken()
      if (token) {
        this.token = token
      }
      if (process.client && !this.userInfo) {
        try {
          const raw = window.localStorage.getItem('public-user-info')
          if (raw) {
            this.userInfo = JSON.parse(raw)
          }
        } catch {}
      }
    },
  },
})
