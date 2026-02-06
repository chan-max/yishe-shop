<template>
  <button
    :type="type"
    :class="[
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]',
      // Variant styles
      {
        'bg-black text-white hover:bg-gray-800 focus-visible:ring-black border border-transparent shadow-sm hover:shadow-md': variant === 'primary',
        'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-visible:ring-gray-200': variant === 'secondary',
        'bg-transparent text-gray-900 border border-gray-900 hover:bg-black hover:text-white focus-visible:ring-black': variant === 'outline',
        'bg-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-200': variant === 'ghost',
        'bg-transparent text-gray-600 hover:text-gray-900 p-0 hover:underline': variant === 'link',
        'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600 shadow-sm': variant === 'danger',
      },
      // Size styles
      {
        'px-2.5 py-1.5 text-xs rounded': size === 'xs',
        'px-3 py-2 text-sm rounded-md': size === 'sm',
        'px-4 py-2 text-sm rounded-lg': size === 'md',
        'px-6 py-3 text-base rounded-lg': size === 'lg',
        'px-8 py-4 text-lg rounded-xl': size === 'xl',
      },
      // Block style
      { 'w-full': block },
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <!-- Loading Spinner -->
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-2 h-4 w-4"
      :class="variant === 'outline' || variant === 'ghost' ? 'text-current' : 'text-white'"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>

    <!-- Prefix Icon -->
    <span v-if="$slots.prefix && !loading" class="mr-2 flex items-center">
      <slot name="prefix"></slot>
    </span>

    <!-- Content -->
    <slot></slot>

    <!-- Suffix Icon -->
    <span v-if="$slots.suffix && !loading" class="ml-2 flex items-center">
      <slot name="suffix"></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'danger'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  type?: 'button' | 'submit' | 'reset'
  block?: boolean
  loading?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  block: false,
  loading: false,
  disabled: false,
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>
