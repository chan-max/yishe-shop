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
    border: 'border-green-500',
    icon: 'text-green-400',
    text: 'text-white'
  },
  danger: {
    border: 'border-red-500',
    icon: 'text-red-400',
    text: 'text-white'
  },
  warning: {
    border: 'border-yellow-500',
    icon: 'text-yellow-400',
    text: 'text-white'
  },
  info: {
    border: 'border-blue-500',
    icon: 'text-blue-400',
    text: 'text-white'
  }
}

const currentStyle = computed(() => toastStyles[props.type])

const icons = {
  success: 'i-heroicons-check-circle',
  danger: 'i-heroicons-exclamation-circle',
  warning: 'i-heroicons-exclamation-triangle',
  info: 'i-heroicons-information-circle'
}
</script>

<template>
  <div class="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
    <Transition
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="transform -translate-y-8 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-8 opacity-0"
    >
      <div v-if="showToast" class="relative">
        <div
          :class="`bg-gray-900 border-l-4 ${currentStyle.border} rounded-lg px-6 py-4 min-w-[380px] flex items-center gap-4 shadow-lg`"
        >
          <div :class="`${currentStyle.icon} text-2xl`">
            <Icon :name="icons[type]" />
          </div>
          <div class="flex-1">
            <h3 :class="`${currentStyle.text} font-bold text-lg`">{{ title }}</h3>
            <p class="text-gray-300 text-sm font-medium">{{ text }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template> 