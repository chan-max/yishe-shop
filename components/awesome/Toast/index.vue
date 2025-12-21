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
  show: false
})

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
}>()

const showToast = ref(props.show)

watch(() => props.show, (newVal) => {
  showToast.value = newVal
  if (newVal && props.duration > 0) {
    setTimeout(() => {
      showToast.value = false
      emit('update:show', false)
    }, props.duration)
  }
})

const toastStyles = {
  success: {
    bg: 'bg-green-500',
    darkBg: 'dark:bg-green-600',
    border: 'border-green-400',
    darkBorder: 'dark:border-green-300',
    text: 'text-white',
    darkText: 'text-white',
    icon: 'text-white',
    hover: 'hover:bg-green-400',
    darkHover: 'dark:hover:bg-green-500'
  },
  danger: {
    bg: 'bg-red-600',
    darkBg: 'dark:bg-red-700',
    border: 'border-red-500',
    darkBorder: 'dark:border-red-400',
    text: 'text-white',
    darkText: 'text-white',
    icon: 'text-white',
    hover: 'hover:bg-red-500',
    darkHover: 'dark:hover:bg-red-600'
  },
  warning: {
    bg: 'bg-yellow-500',
    darkBg: 'dark:bg-yellow-600',
    border: 'border-yellow-400',
    darkBorder: 'dark:border-yellow-300',
    text: 'text-white',
    darkText: 'text-white',
    icon: 'text-white',
    hover: 'hover:bg-yellow-400',
    darkHover: 'dark:hover:bg-yellow-500'
  },
  info: {
    bg: 'bg-blue-600',
    darkBg: 'dark:bg-blue-700',
    border: 'border-blue-500',
    darkBorder: 'dark:border-blue-400',
    text: 'text-white',
    darkText: 'text-white',
    icon: 'text-white',
    hover: 'hover:bg-blue-500',
    darkHover: 'dark:hover:bg-blue-600'
  }
}

const currentStyle = computed(() => toastStyles[props.type])

// SVG 图标路径 (Heroicons)
const iconPaths = {
  success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  danger: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
  warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  info: 'M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
}
</script>

<template>
  <div class="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform -translate-y-6 opacity-0 scale-95"
      enter-to-class="transform translate-y-0 opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100 scale-100"
      leave-to-class="transform -translate-y-6 opacity-0 scale-95"
    >
      <div v-if="showToast" class="relative">
        <div
          role="alert"
          :class="`${currentStyle.bg} ${currentStyle.darkBg} border-l-4 ${currentStyle.border} ${currentStyle.darkBorder} ${currentStyle.text} ${currentStyle.darkText} p-4 rounded-lg flex items-center transition duration-300 ease-in-out ${currentStyle.hover} ${currentStyle.darkHover} transform hover:scale-105 shadow-lg min-w-[320px] max-w-[500px]`"
        >
          <!-- SVG 图标 -->
          <svg
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            :class="`h-5 w-5 flex-shrink-0 mr-3 ${currentStyle.icon}`"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              :d="iconPaths[props.type]"
              stroke-width="2"
              stroke-linejoin="round"
              stroke-linecap="round"
            ></path>
          </svg>
          
          <!-- 内容区域 -->
          <div class="flex-1 min-w-0">
            <p v-if="props.title" class="text-xs font-semibold leading-tight">
              {{ props.title }}
            </p>
            <p v-if="props.text" class="text-xs font-medium mt-1 leading-tight opacity-90">
              {{ props.text }}
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template> 