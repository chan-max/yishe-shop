<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const statusCode = computed(() => props.error?.statusCode || 500)
const title = computed(() => statusCode.value === 404 ? '页面未找到' : '页面暂时不可用')
const description = computed(() => statusCode.value === 404
  ? '你访问的页面可能已被移动、删除，或者链接地址并不正确。'
  : '服务器遇到了一点问题。你可以先返回首页，或稍后再试。')

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="min-h-screen bg-[#f7f5f2] px-4 py-10 sm:px-6 lg:px-8">
    <div class="mx-auto flex min-h-[80vh] max-w-[1560px] items-center justify-center">
      <div class="grid w-full max-w-4xl gap-4 rounded-[1.75rem] bg-white p-5 sm:p-6 lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
        <section class="rounded-[1.25rem] bg-[#f6f4f1] p-6 sm:p-7">
          <div class="text-[10px] uppercase tracking-[0.24em] text-stone-400">Error State</div>
          <div class="mt-5 text-[68px] font-semibold leading-none text-stone-950 sm:text-[88px]">{{ statusCode }}</div>
          <div class="mt-4 inline-flex rounded-full bg-white px-3 py-1 text-[11px] text-stone-500">
            Flat Minimal System
          </div>
        </section>

        <section class="flex flex-col justify-between rounded-[1.25rem] bg-[#fcfbf9] p-6 sm:p-7">
          <div>
            <h1 class="text-[28px] font-semibold leading-[1.2] text-stone-950 sm:text-[34px]">{{ title }}</h1>
            <p class="mt-4 max-w-xl text-[13px] leading-7 text-stone-500">{{ description }}</p>
          </div>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <BaseButton size="lg" class="!px-6 !py-3 !text-[12px]" @click="handleError">返回首页</BaseButton>
            <BaseButton variant="outline" size="lg" class="!px-6 !py-3 !text-[12px]" @click="$router?.back?.()">
              返回上一页
            </BaseButton>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>