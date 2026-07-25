<script lang="ts" setup>
interface ToastProps {
  type?: 'success' | 'danger' | 'warning' | 'info'
  title?: string
  text?: string
  duration?: number
  show?: boolean
}

const props = withDefaults(defineProps<ToastProps>(), {
  type: 'success',
  title: '',
  text: '',
  duration: 3000,
  show: false,
})

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
}>()

const showToast = ref(props.show)
let timer: ReturnType<typeof setTimeout> | null = null

watch(() => props.show, (newVal) => {
  showToast.value = newVal
  if (timer) clearTimeout(timer)
  if (newVal && props.duration > 0) {
    timer = setTimeout(() => {
      showToast.value = false
      emit('update:show', false)
    }, props.duration)
  }
})

const toastStyles = {
  success: {
    iconWrap: 'bg-emerald-50 text-emerald-600',
    border: 'border-emerald-200',
    title: 'text-emerald-700',
  },
  danger: {
    iconWrap: 'bg-red-50 text-red-600',
    border: 'border-red-200',
    title: 'text-red-700',
  },
  warning: {
    iconWrap: 'bg-amber-50 text-amber-600',
    border: 'border-amber-200',
    title: 'text-amber-700',
  },
  info: {
    iconWrap: 'bg-sky-50 text-sky-600',
    border: 'border-sky-200',
    title: 'text-sky-700',
  },
}

const currentStyle = computed(() => toastStyles[props.type])

const iconPaths = {
  success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  danger: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
  warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  info: 'M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
}
</script>

<template>
  <div class="fixed left-1/2 top-5 z-[10000] -translate-x-1/2 pointer-events-none">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="-translate-y-3 scale-[0.98] opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-2 scale-[0.99] opacity-0"
    >
      <div v-if="showToast" class="relative pointer-events-auto">
        <div role="alert" :class="`relative overflow-hidden flex min-w-[280px] max-w-[460px] items-center gap-3 rounded-[1rem] border bg-white px-4 py-3 shadow-[0_18px_32px_rgba(28,25,23,0.08)] ${currentStyle.border}`">
          <div class="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,rgba(28,25,23,0.06),rgba(28,25,23,0.18),rgba(28,25,23,0.06))]"></div>
          <div :class="`inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${currentStyle.iconWrap}`">
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" class="h-4 w-4" xmlns="http://www.w3.org/2000/svg">
              <path :d="iconPaths[props.type]" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
            </svg>
          </div>

          <div class="min-w-0 flex-1 flex flex-col justify-center">
            <p v-if="props.title" :class="`text-[13px] font-semibold leading-tight ${currentStyle.title}`">{{ props.title }}</p>
            <p v-if="props.text" class="mt-0.5 text-[12px] leading-relaxed text-stone-500">{{ props.text }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
