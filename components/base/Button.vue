<template>
  <button
    :type="type"
    :class="[
      'group inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer active:translate-y-[1px]',
      {
        'bg-stone-950 text-stone-50 hover:-translate-y-[1px] hover:bg-stone-800 focus-visible:ring-stone-950 border border-transparent': variant === 'primary',
        'bg-white text-stone-900 border border-stone-200 hover:-translate-y-[1px] hover:bg-stone-50 hover:border-stone-300 focus-visible:ring-stone-300': variant === 'secondary',
        'bg-transparent text-stone-900 border border-stone-300 hover:-translate-y-[1px] hover:border-stone-950 hover:bg-stone-950 hover:text-stone-50 focus-visible:ring-stone-900': variant === 'outline',
        'bg-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-100 focus-visible:ring-stone-200': variant === 'ghost',
        'bg-transparent text-stone-600 hover:text-stone-900 p-0 hover:underline': variant === 'link',
        'bg-red-600 text-white hover:-translate-y-[1px] hover:bg-red-700 focus-visible:ring-red-600': variant === 'danger',
        'bg-[#c8a46a] text-stone-950 border border-[#c8a46a] hover:-translate-y-[1px] hover:bg-[#b99253] focus-visible:ring-[#c8a46a]': variant === 'luxury',
        'border border-stone-300 bg-white text-stone-900 focus-visible:ring-stone-300 hover:-translate-y-[1px] hover:bg-stone-50 hover:border-stone-400': variant === 'glass',
      },
      {
        'px-2.5 py-1.5 text-[11px] rounded': size === 'xs',
        'px-3 py-1.5 text-xs rounded-md': size === 'sm',
        'px-4 py-2 text-xs rounded-lg': size === 'md',
        'px-5 py-2.5 text-sm rounded-lg': size === 'lg',
        'px-6 py-3 text-sm rounded-xl': size === 'xl',
      },
      { 'w-full': block },
      loading ? 'pointer-events-none' : '',
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-2 h-4 w-4"
      :class="variant === 'outline' || variant === 'ghost' || variant === 'link' ? 'text-current' : 'text-white'"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>

    <span v-if="$slots.prefix && !loading" class="mr-2 flex items-center">
      <slot name="prefix"></slot>
    </span>

    <slot></slot>

    <span v-if="$slots.suffix && !loading" class="ml-2 flex items-center transition-transform duration-200 group-hover:translate-x-0.5">
      <slot name="suffix"></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'danger' | 'luxury' | 'glass'
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
  if (!props.disabled && !props.loading) emit('click', event)
}
</script>
