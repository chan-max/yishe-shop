/*
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-XX XX:XX:XX
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-01-XX XX:XX:XX
 * @FilePath: /yishe-nuxt/stores/public-user.ts
 * @Description: 开放用户状态管理
 */
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

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
    token: useLocalStorage('public-user-token', null).value,
    userInfo: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    currentUser: (state) => state.userInfo,
  },

  actions: {
    setToken(token: string) {
      this.token = token
      if (process.client) {
        const tokenStorage = useLocalStorage('public-user-token', null)
        tokenStorage.value = token
      }
    },

    clearToken() {
      this.token = null
      if (process.client) {
        const tokenStorage = useLocalStorage('public-user-token', null)
        tokenStorage.value = null
      }
      this.userInfo = null
    },

    setUserInfo(userInfo: PublicUserInfo) {
      this.userInfo = userInfo
    },

    // 初始化时从 localStorage 恢复 token
    initToken() {
      const token = localStorage.getItem('public-user-token')
      if (token) {
        this.token = token
      }
    },
  },
})

