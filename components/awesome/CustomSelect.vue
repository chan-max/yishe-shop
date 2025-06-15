<script lang="ts" setup>
interface Option {
  value: string
  label: string
}

const props = defineProps<{
  modelValue: string
  options: Option[]
  placeholder: string
}>()

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const selectedOption = computed(() => {
  return props.options.find(opt => opt.value === props.modelValue)?.label || props.placeholder
})

const selectOption = (option: Option) => {
  emit('update:modelValue', option.value)
  isOpen.value = false
}

// 点击外部关闭下拉框
const selectRef = ref<HTMLElement | null>(null)
onClickOutside(selectRef, () => {
  isOpen.value = false
})
</script>

<template>
  <div ref="selectRef" class="relative">
    <!-- 选择框 -->
    <div
      @click="isOpen = !isOpen"
      class="flex items-center justify-between rounded-lg border border-gray-300 px-3 pr-10 py-2 bg-transparent cursor-pointer hover:border-gray-300 transition-colors duration-200"
      :class="{ 'border-primary': isOpen }"
    >
      <span class="text-gray-400 text-[0.9em] font-semibold truncate">{{ selectedOption }}</span>
      <div class="absolute right-3 top-1/2 -translate-y-1/2">
        <Icon
          name="heroicons:chevron-down"
          class="w-4 h-4 text-gray-600 transition-transform duration-200"
          :class="{ 'transform rotate-180': isOpen }"
        />
      </div>
    </div>

    <!-- 下拉选项 -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isOpen"
        class="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-100 py-1 max-h-60 overflow-auto"
      >
        <div
          v-for="option in options"
          :key="option.value"
          @click="selectOption(option)"
          class="px-3 py-2 text-xs text-gray-800 hover:bg-gray-50 cursor-pointer transition-colors duration-150 font-normal"
          :class="{ 'bg-gray-50': option.value === modelValue }"
        >
          {{ option.label }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* 自定义滚动条样式 */
.overflow-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-auto::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 3px;
}

.overflow-auto::-webkit-scrollbar-thumb:hover {
  background-color: #9ca3af;
}
</style> 