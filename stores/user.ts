/*
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-05-17 06:56:38
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-05-17 06:58:12
 * @FilePath: /yishe-nuxt/stores/user.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

interface UserState {
  token: string | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: useLocalStorage('token', null).value,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
    setToken(token: string) {
      this.token = token
      // 使用 useLocalStorage 保存 token
      useLocalStorage('token', token)
    },

    clearToken() {
      this.token = null
      // 使用 useLocalStorage 清除 token
      useLocalStorage('token', null)
    },

    // 初始化时从 localStorage 恢复 token
    initToken() {
      const token = localStorage.getItem('token')
      if (token) {
        this.token = token
      }
    },
  },
}) 