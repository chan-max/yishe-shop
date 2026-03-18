<script setup lang="ts">
interface Props {
  kicker?: string
  title: string
  description?: string
  align?: 'start' | 'center'
}

withDefaults(defineProps<Props>(), {
  kicker: '',
  description: '',
  align: 'start',
})
</script>

<template>
  <div :class="['flex gap-4', align === 'center' ? 'flex-col items-center text-center' : 'flex-col lg:flex-row lg:items-end lg:justify-between']">
    <div class="max-w-2xl">
      <div v-if="kicker" class="minimal-kicker">{{ kicker }}</div>
      <h2 class="mt-3 text-[28px] font-semibold leading-[1.22] text-stone-950 sm:text-[34px]">{{ title }}</h2>
      <p v-if="description" class="mt-3 max-w-2xl text-[13px] leading-7 text-stone-500">{{ description }}</p>
    </div>
    <div v-if="$slots.actions" class="flex items-center gap-3">
      <slot name="actions" />
    </div>
  </div>
</template>
