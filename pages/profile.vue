<template>
  <div class="min-h-screen bg-[#f7f5f2] px-4 py-8 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-[1480px]">
      <NuxtLink to="/" class="inline-flex items-center gap-2 rounded-full px-3 py-2 text-[12px] text-stone-500 transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-stone-950">
        <Icon name="heroicons:arrow-left" class="h-4 w-4" />
        <span>返回首页</span>
      </NuxtLink>
    </div>

    <div class="mx-auto mt-8 max-w-4xl rounded-[1.5rem] border border-stone-200 bg-white p-6 transition duration-200 hover:-translate-y-0.5 hover:border-stone-300 sm:p-8">
      <div>
        <div class="text-[10px] uppercase tracking-[0.24em] text-stone-400">Profile</div>
        <h2 class="mt-3 text-[28px] font-semibold text-stone-950">个人信息</h2>
        <p class="mt-2 text-[13px] leading-6 text-stone-500">管理你的基本资料与账号信息。</p>
      </div>

      <div v-if="loading" class="py-16 text-center text-[13px] text-stone-500">加载中...</div>
      <div v-else-if="errorMessage" class="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[12px] text-red-600">{{ errorMessage }}</div>

      <form v-else class="mt-8 space-y-8" @submit.prevent="handleSubmit">
        <div class="grid gap-5 sm:grid-cols-2">
          <BaseInput id="account" v-model="form.account" label="账号" type="text" disabled helper="账号不可修改" />
          <BaseInput id="name" v-model="form.name" label="昵称" type="text" placeholder="请输入昵称" />
          <BaseInput id="email" v-model="form.email" label="邮箱" type="email" placeholder="请输入邮箱" />
          <BaseInput id="phone" v-model="form.phone" label="手机号" type="tel" placeholder="请输入手机号" />

          <div>
            <label for="sex" class="mb-2 block text-[12px] font-medium text-stone-600">性别</label>
            <select id="sex" v-model="form.sex" class="ys-field w-full rounded-xl px-4 py-3 text-[13px] transition duration-200 focus:outline-none">
              <option :value="undefined">请选择</option>
              <option :value="1">男</option>
              <option :value="0">女</option>
            </select>
          </div>

          <div>
            <label for="birthday" class="mb-2 block text-[12px] font-medium text-stone-600">出生日期</label>
            <input id="birthday" v-model="form.birthday" type="date" class="ys-field w-full rounded-xl px-4 py-3 text-[13px] transition duration-200 focus:outline-none" />
          </div>
        </div>

        <div v-if="updateErrorMessage" class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[12px] text-red-600 shadow-[0_0_0_4px_rgba(239,68,68,0.06)]">{{ updateErrorMessage }}</div>
        <div v-if="updateSuccessMessage" class="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-[12px] text-emerald-700 shadow-[0_0_0_4px_rgba(16,185,129,0.06)]">{{ updateSuccessMessage }}</div>

        <div class="flex flex-col gap-3 border-t border-stone-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <NuxtLink to="/change-password" class="inline-flex w-fit rounded-full px-3 py-2 text-[12px] text-stone-500 transition duration-200 hover:-translate-y-0.5 hover:bg-stone-100 hover:text-stone-950">修改密码</NuxtLink>
          <div class="flex flex-col gap-3 sm:flex-row">
            <button type="button" class="rounded-xl border border-stone-200 px-5 py-3 text-[12px] text-red-500 transition duration-200 hover:-translate-y-0.5 hover:border-red-300 hover:bg-red-50 active:translate-y-0" @click="handleLogout">
              退出登录
            </button>
            <BaseButton type="submit" :loading="updating" size="lg" class="!px-6 !py-3 !text-[12px]">
              {{ updating ? '保存中...' : '保存资料' }}
            </BaseButton>
          </div>
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

useSeoMeta({
  title: '个人资料 - 衣设 yishe',
  description: '管理衣设账号资料、POD 灵感收藏和定制设计信息。',
  robots: 'noindex, nofollow',
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

const loadUserInfo = async () => {
  try {
    loading.value = true
    errorMessage.value = ''

    const response = await api.publicUser.getUserInfo()

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

const handleSubmit = async () => {
  try {
    updating.value = true
    updateErrorMessage.value = ''
    updateSuccessMessage.value = ''

    const currentUser = publicUserStore.currentUser
    if (!currentUser || !currentUser.id) {
      updateErrorMessage.value = '用户信息不存在，请重新登录'
      toast.error('保存失败', '用户信息不存在，请重新登录')
      return
    }

    const updateData: any = { id: currentUser.id }

    if (form.value.name !== undefined && form.value.name !== null) updateData.name = form.value.name.trim() || null
    if (form.value.email !== undefined && form.value.email !== null) updateData.email = form.value.email.trim() || null
    if (form.value.phone !== undefined && form.value.phone !== null) updateData.phone = form.value.phone.trim() || null
    if (form.value.sex !== undefined) updateData.sex = form.value.sex
    if (form.value.birthday !== undefined && form.value.birthday !== null) updateData.birthday = form.value.birthday.trim() || null

    const response = await api.publicUser.update(updateData)

    if (response.code === 0 || response.code === 200) {
      if (response.data) {
        updateSuccessMessage.value = '保存成功'
        publicUserStore.setUserInfo(response.data)
        form.value = {
          account: response.data.account,
          name: response.data.name || '',
          email: response.data.email || '',
          phone: response.data.phone || '',
          sex: response.data.sex,
          birthday: response.data.birthday ? response.data.birthday.split('T')[0] : '',
        }
        toast.success('保存成功', '个人信息已更新')
      } else {
        updateErrorMessage.value = response.message || '保存失败：服务器返回数据为空'
      }
    } else {
      updateErrorMessage.value = response.message || `保存失败（错误码: ${response.code}）`
      toast.error('保存失败', updateErrorMessage.value)
    }
  } catch (error: any) {
    updateErrorMessage.value = error.message || '保存失败'
    toast.error('保存失败', updateErrorMessage.value)
  } finally {
    updating.value = false
  }
}

const handleLogout = async () => {
  try {
    await api.publicUser.logout()
  } catch (error) {
    console.error('登出失败:', error)
  } finally {
    publicUserStore.clearToken()
    toast.success('已退出登录')
    await router.push('/')
  }
}

onMounted(() => {
  loadUserInfo()
})
</script>
