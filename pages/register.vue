<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          注册账号
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          创建您的开放用户账号
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="account" class="sr-only">账号</label>
            <input
              id="account"
              v-model="form.account"
              name="account"
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
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              placeholder="密码（至少6位）"
            />
          </div>
          <div>
            <label for="name" class="sr-only">昵称</label>
            <input
              id="name"
              v-model="form.name"
              name="name"
              type="text"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              placeholder="昵称（可选）"
            />
          </div>
          <div>
            <label for="email" class="sr-only">邮箱</label>
            <input
              id="email"
              v-model="form.email"
              name="email"
              type="email"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              placeholder="邮箱（可选）"
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
            {{ loading ? '注册中...' : '注册' }}
          </button>
        </div>

        <div class="text-center">
          <NuxtLink
            to="/login"
            class="text-sm text-primary-600 hover:text-primary-500"
          >
            已有账号？去登录
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

