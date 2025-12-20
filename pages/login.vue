<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          登录账号
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          登录您的开放用户账号
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="username" class="sr-only">账号</label>
            <input
              id="username"
              v-model="form.username"
              name="username"
              type="text"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              placeholder="账号"
            />
          </div>
          <div>
            <label for="password" class="sr-only">密码</label>
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              placeholder="密码"
            />
          </div>
        </div>

        <div v-if="errorMessage" class="text-red-600 text-sm text-center">
          {{ errorMessage }}
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
          >
            {{ loading ? '登录中...' : '登录' }}
          </button>
        </div>

        <div class="text-center">
          <NuxtLink
            to="/register"
            class="text-sm text-primary-600 hover:text-primary-500"
          >
            还没有账号？去注册
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { api } from '~/utils/api'
import { usePublicUserStore } from '~/stores/public-user'
import { useToast } from '~/composables/use-toast'

definePageMeta({
  layout: false,
})

const publicUserStore = usePublicUserStore()
const router = useRouter()
const loading = ref(false)
const errorMessage = ref('')
const toast = useToast()

const form = ref({
  username: '',
  password: '',
})

const handleSubmit = async () => {
  try {
    loading.value = true
    errorMessage.value = ''
    
    const response = await api.publicUser.login(form.value)
    
    // 后端成功时 code 为 0，status 为 true
    if (response.code === 0 || response.status === true || response.code === 200) {
      // 检查响应数据是否存在
      if (!response.data || !response.data.token) {
        errorMessage.value = '用户名或密码不正确'
        toast.error('登录失败', '用户名或密码不正确')
        return
      }
      
      publicUserStore.setToken(response.data.token)
      
      // 显示成功提示
      toast.success('登录成功', '欢迎回来', 2000)
      
      // 延迟3秒后获取用户信息
      setTimeout(async () => {
        try {
          const userInfoResponse = await api.publicUser.getUserInfo()
          if (userInfoResponse.code === 0 || userInfoResponse.status === true || userInfoResponse.code === 200) {
            publicUserStore.setUserInfo(userInfoResponse.data)
          }
        } catch (error) {
          console.error('获取用户信息失败:', error)
        }
      }, 3000)
      
      // 延迟跳转，让用户看到成功提示
      setTimeout(async () => {
        await router.push('/profile')
      }, 2000)
    } else {
      // 根据错误码判断错误类型
      const errorMsg = response.message || '用户名或密码不正确'
      errorMessage.value = errorMsg
      toast.error('登录失败', errorMsg)
    }
  } catch (error: any) {
    // 捕获所有错误，统一显示友好提示
    const errorMsg = error?.message?.includes('token') || error?.message?.includes('null') 
      ? '用户名或密码不正确' 
      : (error?.message || '用户名或密码不正确')
    errorMessage.value = errorMsg
    toast.error('登录失败', errorMsg)
  } finally {
    loading.value = false
  }
}
</script>

