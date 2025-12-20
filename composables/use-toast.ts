/*
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-XX XX:XX:XX
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-01-XX XX:XX:XX
 * @FilePath: /yishe-nuxt/composables/use-toast.ts
 * @Description: 消息提示 composable - 自动消失的弹出提示
 */

// 全局状态
const showToast = ref(false)
const toastType = ref<'success' | 'danger' | 'warning' | 'info'>('success')
const toastTitle = ref('')
const toastText = ref('')
const toastDuration = ref(3000)

let timeoutId: NodeJS.Timeout | null = null

export const useToast = () => {
  const show = (
    type: 'success' | 'danger' | 'warning' | 'info',
    title: string,
    text: string = '',
    duration: number = 3000
  ) => {
    // 清除之前的定时器
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }

    // 设置新的提示信息
    toastType.value = type
    toastTitle.value = title
    toastText.value = text
    toastDuration.value = duration
    
    // 先隐藏再显示，确保动画重新触发
    showToast.value = false
    nextTick(() => {
      showToast.value = true
    })

    // 自动隐藏
    if (duration > 0) {
      timeoutId = setTimeout(() => {
        showToast.value = false
        timeoutId = null
      }, duration)
    }
  }

  const success = (title: string, text: string = '', duration: number = 3000) => {
    show('success', title, text, duration)
  }

  const error = (title: string, text: string = '', duration: number = 3000) => {
    show('danger', title, text, duration)
  }

  const warning = (title: string, text: string = '', duration: number = 3000) => {
    show('warning', title, text, duration)
  }

  const info = (title: string, text: string = '', duration: number = 3000) => {
    show('info', title, text, duration)
  }

  const hide = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
    showToast.value = false
  }

  return {
    showToast,
    toastType,
    toastTitle,
    toastText,
    toastDuration,
    show,
    success,
    error,
    warning,
    info,
    hide,
  }
}
