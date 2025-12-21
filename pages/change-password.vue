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
          修改密码
        </h2>
        <p class="text-center text-sm text-gray-400 tracking-[0.1em] uppercase">
          更新您的账户密码
        </p>
      </div>
      <form class="mt-12 space-y-8" @submit.prevent="handleSubmit">
        <div class="space-y-6">
          <div>
            <label for="password" class="block text-sm text-gray-500 uppercase tracking-[0.15em] mb-4 font-light">
              当前密码 <span class="text-red-500">*</span>
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="w-full px-0 py-3 border-0 border-b border-gray-200 focus:border-gray-900 focus:outline-none text-base tracking-wide bg-transparent text-gray-900 placeholder:text-gray-400 transition-colors duration-300"
              placeholder="请输入当前密码"
            />
          </div>

          <div>
            <label for="newPassword" class="block text-sm text-gray-500 uppercase tracking-[0.15em] mb-4 font-light">
              新密码 <span class="text-red-500">*</span>
            </label>
            <input
              id="newPassword"
              v-model="form.newPassword"
              type="password"
              required
              minlength="6"
              class="w-full px-0 py-3 border-0 border-b border-gray-200 focus:border-gray-900 focus:outline-none text-base tracking-wide bg-transparent text-gray-900 placeholder:text-gray-400 transition-colors duration-300"
              placeholder="至少6位密码"
            />
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm text-gray-500 uppercase tracking-[0.15em] mb-4 font-light">
              确认新密码 <span class="text-red-500">*</span>
            </label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              required
              minlength="6"
              class="w-full px-0 py-3 border-0 border-b border-gray-200 focus:border-gray-900 focus:outline-none text-base tracking-wide bg-transparent text-gray-900 placeholder:text-gray-400 transition-colors duration-300"
              placeholder="请再次输入新密码"
            />
          </div>
        </div>

        <div v-if="errorMessage" class="text-red-500 text-sm text-center tracking-wide uppercase">
          {{ errorMessage }}
        </div>

        <div v-if="successMessage" class="text-green-500 text-sm text-center tracking-wide uppercase">
          {{ successMessage }}
        </div>

        <div class="flex flex-col sm:flex-row justify-end gap-4 pt-6">
          <NuxtLink
            to="/profile"
            class="px-6 py-3 text-sm uppercase tracking-[0.15em] text-gray-500 hover:text-black transition-all duration-300 transform hover:scale-105 active:scale-100 font-light text-center sm:text-left relative group"
          >
            <span class="relative">
              返回
              <span class="absolute bottom-0 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full"></span>
            </span>
          </NuxtLink>
          <button
            type="submit"
            :disabled="loading"
            class="px-8 py-4 bg-black text-white text-sm uppercase tracking-[0.2em] font-light hover:bg-gray-800 focus:outline-none transition-all duration-300 transform hover:scale-105 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {{ loading ? '修改中...' : '修改密码' }}
          </button>
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
  middleware: 'public-user-auth',
})

const publicUserStore = usePublicUserStore()
const router = useRouter()
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const toast = useToast()

const form = ref({
  password: '',
  newPassword: '',
  confirmPassword: '',
})

const handleSubmit = async () => {
  // 验证新密码和确认密码是否一致
  if (form.value.newPassword !== form.value.confirmPassword) {
    errorMessage.value = '新密码和确认密码不一致'
    return
  }

  // 验证新密码长度
  if (form.value.newPassword.length < 6) {
    errorMessage.value = '新密码长度不能少于6位'
    return
  }

  try {
    loading.value = true
    errorMessage.value = ''
    successMessage.value = ''
    
    const response = await api.publicUser.updatePassword({
      password: form.value.password,
      newPassword: form.value.newPassword,
    })
    
    // 后端成功时 code 为 0，status 为 true
    if (response.code === 0 || response.status === true || response.code === 200) {
      successMessage.value = '密码修改成功，请重新登录'
      toast.success('密码修改成功', '请重新登录', 3000)
      // 3秒后跳转到登录页
      setTimeout(async () => {
        publicUserStore.clearToken()
        await router.push('/login')
      }, 3000)
    } else {
      errorMessage.value = response.message || '密码修改失败'
      toast.error('密码修改失败', response.message || '密码修改失败，请重试')
    }
  } catch (error: any) {
    errorMessage.value = error.message || '密码修改失败'
    toast.error('密码修改失败', error.message || '密码修改失败，请重试')
  } finally {
    loading.value = false
  }
}
</script>

