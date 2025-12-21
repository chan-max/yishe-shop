<template>
  <div class="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
    <!-- 返回首页导航 -->
    <div class="fixed top-8 left-4 sm:left-8 z-50">
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black tracking-[0.15em] uppercase transition-all duration-300 group font-light"
      >
        <Icon name="heroicons:arrow-left" class="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
        <span class="relative">
          返回首页
          <span class="absolute bottom-0 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full"></span>
        </span>
      </NuxtLink>
    </div>

    <div class="max-w-md w-full space-y-10">
      <div>
        <h2 class="text-center text-4xl md:text-5xl font-light tracking-[0.05em] mb-3 uppercase text-gray-900">
          登录账号
        </h2>
        <p class="text-center text-sm text-gray-400 tracking-[0.1em] uppercase">
          登录您的开放用户账号
        </p>
      </div>
      <form class="mt-12 space-y-8" @submit.prevent="handleSubmit">
        <div class="space-y-6">
          <div>
            <label for="username" class="block text-sm text-gray-500 uppercase tracking-[0.15em] mb-4 font-light">
              账号
            </label>
            <input
              id="username"
              v-model="form.username"
              name="username"
              type="text"
              required
              class="w-full px-0 py-3 border-0 border-b border-gray-200 focus:border-gray-900 focus:outline-none text-base tracking-wide bg-transparent text-gray-900 placeholder:text-gray-400 transition-colors duration-300"
              placeholder="请输入您的账号"
            />
          </div>
          <div>
            <label for="password" class="block text-sm text-gray-500 uppercase tracking-[0.15em] mb-4 font-light">
              密码
            </label>
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              required
              class="w-full px-0 py-3 border-0 border-b border-gray-200 focus:border-gray-900 focus:outline-none text-base tracking-wide bg-transparent text-gray-900 placeholder:text-gray-400 transition-colors duration-300"
              placeholder="请输入您的密码"
            />
          </div>
        </div>

        <div v-if="errorMessage" class="text-red-500 text-sm text-center tracking-wide uppercase">
          {{ errorMessage }}
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-4 px-6 bg-black text-white text-sm uppercase tracking-[0.2em] font-light hover:bg-gray-800 focus:outline-none transition-all duration-300 transform hover:scale-105 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {{ loading ? '登录中...' : '登录' }}
          </button>
        </div>

        <div class="text-center">
          <NuxtLink
            to="/register"
            class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black tracking-[0.15em] uppercase transition-all duration-300 group font-light"
          >
            <span class="relative">
              还没有账号？去注册
              <span class="absolute bottom-0 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full"></span>
            </span>
            <v-icon size="14" class="transition-transform duration-300 group-hover:translate-x-1">mdi-arrow-right</v-icon>
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
      
      // 立即获取用户信息
      try {
        const userInfoResponse = await api.publicUser.getUserInfo()
        if (userInfoResponse.code === 0 || userInfoResponse.code === 200) {
          if (userInfoResponse.data) {
            publicUserStore.setUserInfo(userInfoResponse.data)
          }
        }
      } catch (error) {
        console.error('获取用户信息失败:', error)
      }
      
      // 延迟跳转到首页，让用户看到成功提示
      setTimeout(async () => {
        await router.push('/')
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

