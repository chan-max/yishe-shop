<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-05-17 07:02:20
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-07-29 05:49:07
 * @FilePath: /yishe-nuxt/components/layouts/Header.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <header class="bg-white shadow">
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <div class="flex flex-shrink-0 items-center">
            <NuxtLink to="/" class="text-xl font-bold">
              <span style="font-family: logo;">衣设服装设计</span>
            </NuxtLink>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <template v-if="userStore.isLoggedIn">
            <span class="text-gray-700">已登录</span>
            <button
              @click="handleLogout"
              class="rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              退出
            </button>
          </template>
          <template v-else>
            <button
              @click="showLoginDialog = true"
              class="rounded-md bg-primary-600 px-3 py-2 text-sm font-medium text-white hover:bg-primary-700"
            >
              登录
            </button>
          </template>
        </div>
      </div>
    </nav>
  </header>

  <LoginDialog
    :is-open="showLoginDialog"
    @close="showLoginDialog = false"
  />
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'
import LoginDialog from '~/components/auth/LoginDialog.vue'

const userStore = useUserStore()
const showLoginDialog = ref(false)

const handleLogout = () => {
  userStore.clearToken()
}
</script> 