<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto">
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">修改密码</h2>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">当前密码</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="请输入当前密码"
            />
          </div>

          <div>
            <label for="newPassword" class="block text-sm font-medium text-gray-700">新密码</label>
            <input
              id="newPassword"
              v-model="form.newPassword"
              type="password"
              required
              minlength="6"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="请输入新密码（至少6位）"
            />
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">确认新密码</label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              required
              minlength="6"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="请再次输入新密码"
            />
          </div>

          <div v-if="errorMessage" class="text-red-600 text-sm">
            {{ errorMessage }}
          </div>

          <div v-if="successMessage" class="text-green-600 text-sm">
            {{ successMessage }}
          </div>

          <div class="flex justify-end space-x-4">
            <NuxtLink
              to="/profile"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              返回
            </NuxtLink>
            <button
              type="submit"
              :disabled="loading"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              {{ loading ? '修改中...' : '修改密码' }}
            </button>
          </div>
        </form>
      </div>
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

