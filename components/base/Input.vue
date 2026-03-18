<template>
  <div class="w-full">
    <label v-if="label" :for="id" class="mb-2 block text-[12px] font-medium text-stone-600">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="input-shell relative">
      <div v-if="$slots.prefix" class="pointer-events-none absolute inset-y-0 left-0 z-[1] flex items-center pl-3 text-stone-400 transition-colors duration-200">
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
        class="input-element block w-full text-[13px] text-stone-900 transition duration-200 ease-in-out focus:outline-none"
        :class="[
          $slots.prefix ? 'pl-10' : 'pl-4',
          $slots.suffix ? 'pr-10' : 'pr-4',
          disabled ? 'cursor-not-allowed bg-stone-100 text-stone-400' : 'bg-white hover:bg-[var(--ys-surface-soft)] focus:bg-white',
          variant === 'bordered'
            ? 'rounded-xl border border-stone-200 py-3 shadow-[0_0_0_0_rgba(28,25,23,0)] hover:border-[color:var(--ys-border-strong)] focus:border-[color:var(--ys-focus-border)] focus:shadow-[0_0_0_4px_var(--ys-focus-ring)]'
            : 'rounded-none border-0 border-b border-stone-200 px-0 py-3 hover:border-[color:var(--ys-border-strong)] focus:border-[color:var(--ys-focus-border)] focus:shadow-[inset_0_-2px_0_0_var(--ys-focus-border)]',
          error
            ? (variant === 'bordered' ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:shadow-[0_0_0_4px_var(--ys-danger-ring)]' : 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:shadow-[inset_0_-2px_0_0_#ef4444]')
            : ''
        ]"
        @input="updateValue"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      />
      <div v-if="$slots.suffix" class="pointer-events-none absolute inset-y-0 right-0 z-[1] flex items-center pr-3 text-stone-400 transition-colors duration-200">
        <slot name="suffix"></slot>
      </div>
    </div>
    <p v-if="error" class="mt-2 text-[12px] text-red-600">{{ error }}</p>
    <p v-else-if="helper" class="mt-2 text-[12px] text-stone-500">{{ helper }}</p>
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
.input-shell:focus-within .pointer-events-none {
  color: var(--ys-focus-border);
}

.input-element::placeholder {
  color: #a8a29e;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px white inset !important;
  transition: background-color 5000s ease-in-out 0s;
}
</style>
