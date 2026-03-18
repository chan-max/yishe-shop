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
        <div class="text-[10px] uppercase tracking-[0.24em] text-stone-400">Create Account</div>
        <h2 class="mt-3 text-[28px] font-semibold text-stone-950">注册账号</h2>
        <p class="mt-2 text-[13px] leading-6 text-stone-500">创建你的开放用户账号，开始收藏、展示和管理设计内容。</p>
      </div>

      <form class="mt-8 space-y-5" @submit.prevent="handleSubmit">
        <BaseInput id="account" v-model="form.account" label="账号" name="account" type="text" required placeholder="请输入账号" />
        <BaseInput id="password" v-model="form.password" label="密码" name="password" type="password" required placeholder="至少 6 位密码" />
        <BaseInput id="name" v-model="form.name" label="昵称" name="name" type="text" placeholder="请输入昵称" />
        <BaseInput id="email" v-model="form.email" label="邮箱" name="email" type="email" placeholder="请输入邮箱地址" />

        <div v-if="errorMessage" class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[12px] text-red-600 shadow-[0_0_0_4px_rgba(239,68,68,0.06)]">
          {{ errorMessage }}
        </div>

        <BaseButton type="submit" :loading="loading" class="w-full !py-3 !text-[12px]" size="lg">
          {{ loading ? '注册中...' : '注册' }}
        </BaseButton>

        <div class="text-center text-[12px] text-stone-500">
          已有账号？
          <NuxtLink to="/login" class="rounded-full px-2 py-1 text-stone-900 underline-offset-4 transition duration-200 hover:bg-stone-100 hover:underline">去登录</NuxtLink>
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

    if (response.code === 0) {
      toast.success('注册成功', '账号已创建，请登录', 2000)
      setTimeout(async () => {
        await router.push('/login')
      }, 2000)
    } else {
      let errorMsg = response.message || '注册失败'
      if (
        response.code === 400 &&
        (errorMsg.includes('已存在') || errorMsg.includes('已注册') || errorMsg.includes('duplicate') || errorMsg.includes('exists'))
      ) {
        errorMsg = '该账号已被注册，请使用其他账号或直接登录'
      }
      errorMessage.value = errorMsg
      toast.error('注册失败', errorMsg)
    }
  } catch (error: any) {
    let errorMsg = error.message || '注册失败，请重试'
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
