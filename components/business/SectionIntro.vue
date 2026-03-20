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
  <div :class="['flex gap-6', align === 'center' ? 'flex-col items-center text-center' : 'flex-col lg:flex-row lg:items-end lg:justify-between']">
    <div class="max-w-2xl">
      <div v-if="kicker" class="minimal-kicker">{{ kicker }}</div>
      <h2 class="ys-display mt-4 text-[31px] leading-[1.12] text-[color:var(--ys-text)] sm:text-[38px]">{{ title }}</h2>
      <p v-if="description" class="mt-4 max-w-2xl text-[15px] leading-8 text-[color:var(--ys-text-soft)]">{{ description }}</p>
    </div>
    <div v-if="$slots.actions" class="flex items-center gap-3">
      <slot name="actions" />
    </div>
  </div>
</template>
