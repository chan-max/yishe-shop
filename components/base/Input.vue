<template>
  <div class="w-full">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="relative rounded-md shadow-sm">
      <div v-if="$slots.prefix" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <slot name="prefix"></slot>
      </div>
      <input
        :id="id"
        ref="inputRef"
        v-bind="$attrs"
        :value="modelValue"
        :type="type"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        class="block w-full transition-colors duration-200 ease-in-out py-3 focus:outline-none"
        :class="[
          $slots.prefix ? 'pl-10' : 'pl-4',
          $slots.suffix ? 'pr-10' : 'pr-4',
          disabled ? 'bg-gray-100 cursor-not-allowed text-gray-400' : 'bg-transparent',
          // Variants
          variant === 'bordered' 
            ? 'rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-black' 
            : 'border-0 border-b border-gray-200 focus:border-black rounded-none px-0',
          // Error state overrides
          error 
            ? (variant === 'bordered' ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500') 
            : (variant === 'bordered' ? 'hover:border-gray-400' : 'hover:border-gray-400')
        ]"
        @input="updateValue"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      />
      <div v-if="$slots.suffix" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <slot name="suffix"></slot>
      </div>
    </div>
    <p v-if="error" class="mt-1 text-sm text-red-600 animate-pulse">{{ error }}</p>
    <p v-else-if="helper" class="mt-1 text-sm text-gray-500">{{ helper }}</p>
  </div>
</template>

<script setup lang="ts">
import { useId } from '#imports'

interface Props {
  modelValue?: string | number
  label?: string
  id?: string
  type?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  helper?: string
  variant?: 'bordered' | 'underlined'
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: '',
  id: () => useId(),
  type: 'text',
  placeholder: '',
  required: false,
  disabled: false,
  error: '',
  helper: '',
  variant: 'bordered',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
}>()

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const inputRef = ref<HTMLInputElement | null>(null)

defineExpose({
  focus: () => inputRef.value?.focus(),
  select: () => inputRef.value?.select(),
})
</script>

<style scoped>
/* Remove chrome auto-fill background color */
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active{
    -webkit-box-shadow: 0 0 0 30px white inset !important;
    transition: background-color 5000s ease-in-out 0s;
}
</style>
