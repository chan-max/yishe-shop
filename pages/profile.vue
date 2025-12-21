<template>
  <div class="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
    <!-- 返回首页导航 -->
    <div class="max-w-3xl mx-auto mb-8">
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

    <div class="max-w-3xl mx-auto">
      <div class="bg-white">
        <h2 class="text-4xl md:text-5xl font-light tracking-[0.05em] mb-3 uppercase text-gray-900">个人信息</h2>
        <p class="text-sm text-gray-400 tracking-[0.1em] uppercase mb-12">管理您的个人资料</p>

        <div v-if="loading" class="text-center py-16">
          <p class="text-sm text-gray-400 tracking-[0.1em] uppercase">加载中...</p>
        </div>

        <div v-else-if="errorMessage" class="text-red-500 text-sm text-center py-16 tracking-wide uppercase">
          {{ errorMessage }}
        </div>

        <form v-else @submit.prevent="handleSubmit" class="space-y-10">
          <div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <label for="account" class="block text-sm text-gray-500 uppercase tracking-[0.15em] mb-4 font-light">账号</label>
              <input
                id="account"
                v-model="form.account"
                type="text"
                disabled
                class="w-full px-0 py-3 border-0 border-b border-gray-200 bg-transparent text-gray-400 text-base tracking-wide focus:outline-none cursor-not-allowed"
              />
            </div>

            <div>
              <label for="name" class="block text-sm text-gray-500 uppercase tracking-[0.15em] mb-4 font-light">昵称</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                class="w-full px-0 py-3 border-0 border-b border-gray-200 focus:border-gray-900 focus:outline-none text-base tracking-wide bg-transparent text-gray-900 placeholder:text-gray-400 transition-colors duration-300"
                placeholder="请输入昵称"
              />
            </div>

            <div>
              <label for="email" class="block text-sm text-gray-500 uppercase tracking-[0.15em] mb-4 font-light">邮箱</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                class="w-full px-0 py-3 border-0 border-b border-gray-200 focus:border-gray-900 focus:outline-none text-base tracking-wide bg-transparent text-gray-900 placeholder:text-gray-400 transition-colors duration-300"
                placeholder="请输入邮箱"
              />
            </div>

            <div>
              <label for="phone" class="block text-sm text-gray-500 uppercase tracking-[0.15em] mb-4 font-light">手机号</label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                class="w-full px-0 py-3 border-0 border-b border-gray-200 focus:border-gray-900 focus:outline-none text-base tracking-wide bg-transparent text-gray-900 placeholder:text-gray-400 transition-colors duration-300"
                placeholder="请输入手机号"
              />
            </div>

            <div>
              <label for="sex" class="block text-sm text-gray-500 uppercase tracking-[0.15em] mb-4 font-light">性别</label>
              <select
                id="sex"
                v-model="form.sex"
                class="w-full px-0 py-3 border-0 border-b border-gray-200 focus:border-gray-900 focus:outline-none text-base tracking-wide bg-transparent text-gray-900 transition-colors duration-300 appearance-none cursor-pointer"
              >
                <option :value="undefined">请选择</option>
                <option :value="1">男</option>
                <option :value="0">女</option>
              </select>
            </div>

            <div>
              <label for="birthday" class="block text-sm text-gray-500 uppercase tracking-[0.15em] mb-4 font-light">出生日期</label>
              <input
                id="birthday"
                v-model="form.birthday"
                type="date"
                class="w-full px-0 py-3 border-0 border-b border-gray-200 focus:border-gray-900 focus:outline-none text-base tracking-wide bg-transparent text-gray-900 transition-colors duration-300"
              />
            </div>
          </div>


          <div v-if="updateErrorMessage" class="text-red-500 text-sm tracking-wide uppercase">
            {{ updateErrorMessage }}
          </div>

          <div v-if="updateSuccessMessage" class="text-green-600 text-sm tracking-wide uppercase">
            {{ updateSuccessMessage }}
          </div>

          <div class="flex flex-col sm:flex-row justify-end gap-4 pt-6">
            <NuxtLink
              to="/change-password"
              class="px-6 py-3 text-sm uppercase tracking-[0.15em] text-gray-500 hover:text-black transition-all duration-300 transform hover:scale-105 active:scale-100 font-light text-center sm:text-left relative group"
            >
              <span class="relative">
                修改密码
                <span class="absolute bottom-0 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full"></span>
              </span>
            </NuxtLink>
            <button
              type="submit"
              :disabled="updating"
              class="px-8 py-4 bg-black text-white text-sm uppercase tracking-[0.2em] font-light hover:bg-gray-800 focus:outline-none transition-all duration-300 transform hover:scale-105 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {{ updating ? '保存中...' : '保存' }}
            </button>
          </div>
        </form>

        <div class="mt-12 pt-8 border-t border-gray-100">
          <button
            @click="handleLogout"
            class="w-full px-6 py-4 text-sm uppercase tracking-[0.15em] text-red-500 hover:text-red-600 transition-all duration-300 transform hover:scale-105 active:scale-100 font-light relative group"
          >
            <span class="relative">
              退出登录
              <span class="absolute bottom-0 left-0 w-0 h-px bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </span>
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
})

// 加载用户信息
const loadUserInfo = async () => {
  try {
    loading.value = true
    errorMessage.value = ''
    
    const response = await api.publicUser.getUserInfo()
    
    // 后端成功时 code 为 0 或 200，注意：status: true 不能作为成功判断
    if (response.code === 0 || response.code === 200) {
      if (response.data) {
        const userInfo = response.data
        publicUserStore.setUserInfo(userInfo)
        
        form.value = {
          account: userInfo.account,
          name: userInfo.name || '',
          email: userInfo.email || '',
          phone: userInfo.phone || '',
          sex: userInfo.sex,
          birthday: userInfo.birthday ? userInfo.birthday.split('T')[0] : '',
        }
      } else {
        errorMessage.value = response.message || '获取用户信息失败：服务器返回数据为空'
      }
    } else {
      errorMessage.value = response.message || `获取用户信息失败（错误码: ${response.code}）`
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
    
    // 获取当前用户信息
    const currentUser = publicUserStore.currentUser
    if (!currentUser || !currentUser.id) {
      updateErrorMessage.value = '用户信息不存在，请重新登录'
      toast.error('保存失败', '用户信息不存在，请重新登录')
      return
    }
    
    const updateData: any = {
      id: currentUser.id, // 必须传递用户 ID
    }
    
    // 只传递有值的字段，空字符串也传递（允许清空字段）
    if (form.value.name !== undefined && form.value.name !== null) {
      updateData.name = form.value.name.trim() || null
    }
    if (form.value.email !== undefined && form.value.email !== null) {
      updateData.email = form.value.email.trim() || null
    }
    if (form.value.phone !== undefined && form.value.phone !== null) {
      updateData.phone = form.value.phone.trim() || null
    }
    if (form.value.sex !== undefined) {
      updateData.sex = form.value.sex
    }
    if (form.value.birthday !== undefined && form.value.birthday !== null) {
      updateData.birthday = form.value.birthday.trim() || null
    }
    
    console.log('更新用户信息，请求数据:', updateData)
    
    const response = await api.publicUser.update(updateData)
    
    console.log('更新用户信息，响应数据:', response)
    
    // 后端成功时 code 为 0 或 200，注意：status: true 不能作为成功判断，因为错误响应也可能有 status: true
    if (response.code === 0 || response.code === 200) {
      // 确保有数据才认为是成功
      if (response.data) {
        updateSuccessMessage.value = '保存成功'
        // 更新 store 中的用户信息
        publicUserStore.setUserInfo(response.data)
        // 同时更新表单数据，确保显示最新数据
        form.value = {
          account: response.data.account,
          name: response.data.name || '',
          email: response.data.email || '',
          phone: response.data.phone || '',
          sex: response.data.sex,
          birthday: response.data.birthday ? response.data.birthday.split('T')[0] : '',
        }
        toast.success('保存成功', '个人信息已更新', 3000)
        // 3秒后清除成功消息
        setTimeout(() => {
          updateSuccessMessage.value = ''
        }, 3000)
      } else {
        // code 是 0 或 200 但没有数据，可能是异常情况
        const errorMsg = response.message || '保存失败：服务器返回数据为空'
        updateErrorMessage.value = errorMsg
        toast.error('保存失败', errorMsg)
        console.error('保存失败：响应 code 正常但 data 为空:', response)
      }
    } else {
      // code 不是 0 或 200，肯定是错误
      const errorMsg = response.message || `保存失败（错误码: ${response.code}）`
      updateErrorMessage.value = errorMsg
      toast.error('保存失败', errorMsg)
      console.error('保存失败:', response)
    }
  } catch (error: any) {
    const errorMsg = error.message || error.data?.message || '保存失败，请重试'
    updateErrorMessage.value = errorMsg
    toast.error('保存失败', errorMsg)
    console.error('保存失败，错误信息:', error)
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

