<template>
  <HeadlessDialog
    as="div"
    class="relative z-50"
    :open="isOpen"
    @close="close"
  >
    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

    <div class="fixed inset-0 flex items-center justify-center p-4">
      <HeadlessDialogPanel class="mx-auto max-w-sm rounded bg-white p-6">
        <HeadlessDialogTitle class="text-lg font-medium leading-6 text-gray-900">
          登录
        </HeadlessDialogTitle>

        <form @submit.prevent="handleSubmit" class="mt-4">
          <div class="space-y-4">
            <div>
              <label for="username" class="block text-sm font-medium text-gray-700">用户名</label>
              <input
                id="username"
                v-model="form.username"
                type="text"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">密码</label>
              <input
                id="password"
                v-model="form.password"
                type="password"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div class="mt-6">
              <button
                type="submit"
                class="w-full rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                :disabled="loading"
              >
                {{ loading ? '登录中...' : '登录' }}
              </button>
            </div>
          </div>
        </form>
      </HeadlessDialogPanel>
    </div>
  </HeadlessDialog>
</template>

<script setup lang="ts">
import { api } from '~/utils/api'
import { useUserStore } from '~/stores/user'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const userStore = useUserStore()
const loading = ref(false)
const form = ref({
  username: '',
  password: '',
})

const close = () => {
  emit('close')
}

const handleSubmit = async () => {
  try {
    loading.value = true
    const response = await api.auth.login(form.value)
    
    if (response.code === 200) {
      userStore.setToken(response.data.token)
      close()
    } else {
      // 这里可以添加错误提示
      console.error('登录失败:', response.message)
    }
  } catch (error) {
    console.error('登录错误:', error)
  } finally {
    loading.value = false
  }
}
</script> 