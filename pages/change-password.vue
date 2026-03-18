<template>
  <div class="min-h-screen bg-[#f7f5f2] px-4 py-8 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-[1480px]">
      <NuxtLink to="/" class="ys-quiet-link text-[12px]">
        <Icon name="heroicons:arrow-left" class="h-4 w-4" />
        <span>返回首页</span>
      </NuxtLink>
    </div>

    <div class="mx-auto mt-10 max-w-md rounded-[1.5rem] border border-stone-200 bg-white px-6 py-7 transition duration-200 hover:-translate-y-0.5 hover:border-stone-300 sm:px-8">
      <div>
        <div class="text-[10px] uppercase tracking-[0.24em] text-stone-400">Security</div>
        <h2 class="mt-3 text-[28px] font-semibold text-stone-950">修改密码</h2>
        <p class="mt-2 text-[13px] leading-6 text-stone-500">更新你的账户密码，保存后需要重新登录。</p>
      </div>
      <form class="mt-8 space-y-5" @submit.prevent="handleSubmit">
        <BaseInput id="password" v-model="form.password" label="当前密码" type="password" required placeholder="请输入当前密码" />
        <BaseInput id="newPassword" v-model="form.newPassword" label="新密码" type="password" required placeholder="至少 6 位密码" />
        <BaseInput id="confirmPassword" v-model="form.confirmPassword" label="确认新密码" type="password" required placeholder="请再次输入新密码" />

        <div v-if="errorMessage" class="ys-feedback is-danger">
          {{ errorMessage }}
        </div>

        <div v-if="successMessage" class="ys-feedback is-success">
          {{ successMessage }}
        </div>

        <div class="flex flex-col gap-3 border-t border-stone-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <NuxtLink to="/profile" class="ys-quiet-link w-fit text-[12px]">
            返回个人中心
          </NuxtLink>
          <BaseButton type="submit" :loading="loading" size="lg" class="!px-6 !py-3 !text-[12px]">
            {{ loading ? '修改中...' : '修改密码' }}
          </BaseButton>
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

