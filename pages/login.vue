<template>
  <div class="min-h-screen bg-[#f7f5f2] px-4 py-8 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-[1480px]">
      <NuxtLink to="/" class="inline-flex items-center gap-2 rounded-full px-3 py-2 text-[12px] text-stone-500 transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-stone-950">
        <Icon name="heroicons:arrow-left" class="h-4 w-4" />
        <span>返回首页</span>
      </NuxtLink>
    </div>

    <div class="mx-auto mt-10 max-w-md rounded-[1.5rem] border border-stone-200 bg-white px-6 py-7 transition duration-200 hover:-translate-y-0.5 hover:border-stone-300 sm:px-8">
      <div>
        <div class="text-[10px] uppercase tracking-[0.24em] text-stone-400">Account Access</div>
        <h2 class="mt-3 text-[28px] font-semibold text-stone-950">登录账号</h2>
        <p class="mt-2 text-[13px] leading-6 text-stone-500">登录你的开放用户账号，继续管理收藏和创作内容。</p>
      </div>

      <form class="mt-8 space-y-5" @submit.prevent="handleSubmit">
        <BaseInput id="username" v-model="form.username" label="账号" name="username" type="text" required placeholder="请输入您的账号" />
        <BaseInput id="password" v-model="form.password" label="密码" name="password" type="password" required placeholder="请输入您的密码" />

        <div v-if="errorMessage" class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[12px] text-red-600 shadow-[0_0_0_4px_rgba(239,68,68,0.06)]">
          {{ errorMessage }}
        </div>

        <BaseButton type="submit" :loading="loading" class="w-full !py-3 !text-[12px]" size="lg">
          登录
        </BaseButton>

        <div class="text-center text-[12px] text-stone-500">
          还没有账号？
          <NuxtLink to="/register" class="rounded-full px-2 py-1 text-stone-900 underline-offset-4 transition duration-200 hover:bg-stone-100 hover:underline">去注册</NuxtLink>
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

    if (response.code === 0 || response.status === true || response.code === 200) {
      if (!response.data || !response.data.token) {
        errorMessage.value = '用户名或密码不正确'
        toast.error('登录失败', '用户名或密码不正确')
        return
      }

      publicUserStore.setToken(response.data.token)
      toast.success('登录成功', '欢迎回来', 2000)

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

      setTimeout(async () => {
        await router.push('/')
      }, 2000)
    } else {
      const errorMsg = response.message || '用户名或密码不正确'
      errorMessage.value = errorMsg
      toast.error('登录失败', errorMsg)
    }
  } catch (error: any) {
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
