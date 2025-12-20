<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">个人信息</h2>

        <div v-if="loading" class="text-center py-8">
          <p class="text-gray-500">加载中...</p>
        </div>

        <div v-else-if="errorMessage" class="text-red-600 text-center py-8">
          {{ errorMessage }}
        </div>

        <form v-else @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="account" class="block text-sm font-medium text-gray-700">账号</label>
              <input
                id="account"
                v-model="form.account"
                type="text"
                disabled
                class="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 text-gray-500 shadow-sm sm:text-sm"
              />
            </div>

            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">昵称</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                placeholder="请输入昵称"
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">邮箱</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                placeholder="请输入邮箱"
              />
            </div>

            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700">手机号</label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                placeholder="请输入手机号"
              />
            </div>

            <div>
              <label for="sex" class="block text-sm font-medium text-gray-700">性别</label>
              <select
                id="sex"
                v-model="form.sex"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                <option :value="undefined">请选择</option>
                <option :value="1">男</option>
                <option :value="0">女</option>
              </select>
            </div>

            <div>
              <label for="birthday" class="block text-sm font-medium text-gray-700">出生日期</label>
              <input
                id="birthday"
                v-model="form.birthday"
                type="date"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label for="avatar" class="block text-sm font-medium text-gray-700">头像URL</label>
            <input
              id="avatar"
              v-model="form.avatar"
              type="url"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="请输入头像URL"
            />
          </div>

          <div v-if="updateErrorMessage" class="text-red-600 text-sm">
            {{ updateErrorMessage }}
          </div>

          <div v-if="updateSuccessMessage" class="text-green-600 text-sm">
            {{ updateSuccessMessage }}
          </div>

          <div class="flex justify-end space-x-4">
            <NuxtLink
              to="/change-password"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              修改密码
            </NuxtLink>
            <button
              type="submit"
              :disabled="updating"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              {{ updating ? '保存中...' : '保存' }}
            </button>
          </div>
        </form>

        <div class="mt-6 pt-6 border-t border-gray-200">
          <button
            @click="handleLogout"
            class="w-full px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50"
          >
            退出登录
          </button>
        </div>
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
const loading = ref(true)
const updating = ref(false)
const errorMessage = ref('')
const updateErrorMessage = ref('')
const updateSuccessMessage = ref('')
const toast = useToast()

const form = ref({
  account: '',
  name: '',
  email: '',
  phone: '',
  sex: undefined as number | undefined,
  birthday: '',
  avatar: '',
})

// 加载用户信息
const loadUserInfo = async () => {
  try {
    loading.value = true
    errorMessage.value = ''
    
    const response = await api.publicUser.getUserInfo()
    
    // 后端成功时 code 为 0，status 为 true
    if (response.code === 0 || response.status === true || response.code === 200) {
      const userInfo = response.data
      publicUserStore.setUserInfo(userInfo)
      
      form.value = {
        account: userInfo.account,
        name: userInfo.name || '',
        email: userInfo.email || '',
        phone: userInfo.phone || '',
        sex: userInfo.sex,
        birthday: userInfo.birthday ? userInfo.birthday.split('T')[0] : '',
        avatar: userInfo.avatar || '',
      }
    } else {
      errorMessage.value = response.message || '获取用户信息失败'
    }
  } catch (error: any) {
    errorMessage.value = error.message || '获取用户信息失败'
  } finally {
    loading.value = false
  }
}

// 更新用户信息
const handleSubmit = async () => {
  try {
    updating.value = true
    updateErrorMessage.value = ''
    updateSuccessMessage.value = ''
    
    const updateData: any = {}
    if (form.value.name) updateData.name = form.value.name
    if (form.value.email) updateData.email = form.value.email
    if (form.value.phone) updateData.phone = form.value.phone
    if (form.value.sex !== undefined) updateData.sex = form.value.sex
    if (form.value.birthday) updateData.birthday = form.value.birthday
    if (form.value.avatar) updateData.avatar = form.value.avatar
    
    const response = await api.publicUser.update(updateData)
    
    // 后端成功时 code 为 0，status 为 true
    if (response.code === 0 || response.status === true || response.code === 200) {
      updateSuccessMessage.value = '保存成功'
      publicUserStore.setUserInfo(response.data)
      toast.success('保存成功', '个人信息已更新', 3000)
      // 3秒后清除成功消息
      setTimeout(() => {
        updateSuccessMessage.value = ''
      }, 3000)
    } else {
      updateErrorMessage.value = response.message || '保存失败'
      toast.error('保存失败', response.message || '保存失败，请重试')
    }
  } catch (error: any) {
    updateErrorMessage.value = error.message || '保存失败'
    toast.error('保存失败', error.message || '保存失败，请重试')
  } finally {
    updating.value = false
  }
}

// 退出登录
const handleLogout = async () => {
  try {
    await api.publicUser.logout()
  } catch (error) {
    console.error('登出失败:', error)
  } finally {
    publicUserStore.clearToken()
    await router.push('/login')
  }
}

onMounted(() => {
  loadUserInfo()
})
</script>

