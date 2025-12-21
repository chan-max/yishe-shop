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
          注册账号
        </h2>
        <p class="text-center text-sm text-gray-400 tracking-[0.1em] uppercase">
          创建您的开放用户账号
        </p>
      </div>
      <form class="mt-12 space-y-8" @submit.prevent="handleSubmit">
        <div class="space-y-6">
          <div>
            <label for="account" class="block text-sm text-gray-500 uppercase tracking-[0.15em] mb-4 font-light">
              账号 <span class="text-red-500">*</span>
            </label>
            <input
              id="account"
              v-model="form.account"
              name="account"
              type="text"
              required
              class="w-full px-0 py-3 border-0 border-b border-gray-200 focus:border-gray-900 focus:outline-none text-base tracking-wide bg-transparent text-gray-900 placeholder:text-gray-400 transition-colors duration-300"
              placeholder="请输入账号"
            />
          </div>
          <div>
            <label for="password" class="block text-sm text-gray-500 uppercase tracking-[0.15em] mb-4 font-light">
              密码 <span class="text-red-500">*</span>
            </label>
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              required
              class="w-full px-0 py-3 border-0 border-b border-gray-200 focus:border-gray-900 focus:outline-none text-base tracking-wide bg-transparent text-gray-900 placeholder:text-gray-400 transition-colors duration-300"
              placeholder="至少6位密码"
            />
          </div>
          <div>
            <label for="name" class="block text-sm text-gray-500 uppercase tracking-[0.15em] mb-4 font-light">
              昵称 <span class="text-gray-400 text-xs">(可选)</span>
            </label>
            <input
              id="name"
              v-model="form.name"
              name="name"
              type="text"
              class="w-full px-0 py-3 border-0 border-b border-gray-200 focus:border-gray-900 focus:outline-none text-base tracking-wide bg-transparent text-gray-900 placeholder:text-gray-400 transition-colors duration-300"
              placeholder="请输入昵称"
            />
          </div>
          <div>
            <label for="email" class="block text-sm text-gray-500 uppercase tracking-[0.15em] mb-4 font-light">
              邮箱 <span class="text-gray-400 text-xs">(可选)</span>
            </label>
            <input
              id="email"
              v-model="form.email"
              name="email"
              type="email"
              class="w-full px-0 py-3 border-0 border-b border-gray-200 focus:border-gray-900 focus:outline-none text-base tracking-wide bg-transparent text-gray-900 placeholder:text-gray-400 transition-colors duration-300"
              placeholder="请输入邮箱地址"
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
            {{ loading ? '注册中...' : '注册' }}
          </button>
        </div>

        <div class="text-center">
          <NuxtLink
            to="/login"
            class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black tracking-[0.15em] uppercase transition-all duration-300 group font-light"
          >
            <span class="relative">
              已有账号？去登录
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
  account: '',
  password: '',
  name: '',
  email: '',
})

const handleSubmit = async () => {
  try {
    loading.value = true
    errorMessage.value = ''
    
    const response = await api.publicUser.register({
      account: form.value.account,
      password: form.value.password,
      name: form.value.name || undefined,
      email: form.value.email || undefined,
    })
    
    // 后端成功时 code 为 0
    // 错误响应格式：{ code: 400, message: "用户已存在", status: true }
    if (response.code === 0) {
      // 显示成功提示
      toast.success('注册成功', '账号已创建，请登录', 2000)
      // 延迟跳转到登录页，让用户看到成功提示
      setTimeout(async () => {
        await router.push('/login')
      }, 2000)
    } else {
      // 处理错误响应
      let errorMsg = response.message || '注册失败'
      
      // 优化账号重复注册的错误提示
      // 当 code 为 400 且消息包含"已存在"时，显示友好提示
      if (
        response.code === 400 && 
        (errorMsg.includes('已存在') || 
         errorMsg.includes('已注册') ||
         errorMsg.includes('duplicate') ||
         errorMsg.includes('exists'))
      ) {
        errorMsg = '该账号已被注册，请使用其他账号或直接登录'
      }
      
      errorMessage.value = errorMsg
      toast.error('注册失败', errorMsg)
    }
  } catch (error: any) {
    // 优化错误处理，检测账号重复的情况
    let errorMsg = error.message || '注册失败，请重试'
    
    // 检查是否是账号重复的错误
    if (
      error?.response?.data?.code === 400 ||
      error?.response?.data?.message?.includes('已存在') ||
      error?.response?.data?.message?.includes('已注册') ||
      error?.message?.includes('已存在') ||
      error?.message?.includes('已注册') ||
      error?.message?.includes('duplicate') ||
      error?.message?.includes('exists') ||
      error?.statusCode === 400
    ) {
      errorMsg = '该账号已被注册，请使用其他账号或直接登录'
    }
    
    errorMessage.value = errorMsg
    toast.error('注册失败', errorMsg)
  } finally {
    loading.value = false
  }
}
</script>

