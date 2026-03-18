<template>
  <button
    :type="type"
    :class="buttonClass"
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
import { computed } from 'vue'

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

const buttonClass = computed(() => [
  'ys-btn group inline-flex items-center justify-center select-none cursor-pointer',
  `ys-btn--${props.variant}`,
  `ys-btn--${props.size}`,
  {
    'ys-btn--block': props.block,
    'ys-btn--loading': props.loading,
  },
])

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) emit('click', event)
}
</script>

<style scoped>
.ys-btn {
  appearance: none;
  border: 1px solid transparent;
  background: #1c1917;
  color: #f7f5f2;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  transition:
    color 160ms ease,
    background-color 160ms ease,
    border-color 160ms ease,
    transform 160ms ease,
    box-shadow 160ms ease,
    opacity 160ms ease;
}

.ys-btn:hover:not(:disabled) {
  transform: translateY(-1px);
}

.ys-btn:active:not(:disabled) {
  transform: translateY(1px);
}

.ys-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(28, 25, 23, 0.12);
}

.ys-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.ys-btn--block {
  width: 100%;
}

.ys-btn--loading {
  pointer-events: none;
}

.ys-btn--xs {
  padding: 0.375rem 0.625rem;
  border-radius: 0.5rem;
  font-size: 11px;
}

.ys-btn--sm {
  padding: 0.4rem 0.75rem;
  border-radius: 0.625rem;
  font-size: 12px;
}

.ys-btn--md {
  padding: 0.55rem 1rem;
  border-radius: 0.75rem;
  font-size: 12px;
}

.ys-btn--lg {
  padding: 0.7rem 1.15rem;
  border-radius: 0.8rem;
  font-size: 13px;
}

.ys-btn--xl {
  padding: 0.85rem 1.35rem;
  border-radius: 1rem;
  font-size: 14px;
}

.ys-btn--primary {
  background: #1c1917;
  color: #f7f5f2;
  border-color: transparent;
}

.ys-btn--primary:hover:not(:disabled) {
  background: #292524;
}

.ys-btn--secondary,
.ys-btn--glass {
  background: #ffffff;
  color: #1c1917;
  border-color: rgba(28, 25, 23, 0.12);
}

.ys-btn--secondary:hover:not(:disabled),
.ys-btn--glass:hover:not(:disabled) {
  background: #fcfbf9;
  border-color: rgba(28, 25, 23, 0.2);
}

.ys-btn--outline {
  background: transparent;
  color: #1c1917;
  border-color: rgba(28, 25, 23, 0.22);
}

.ys-btn--outline:hover:not(:disabled) {
  background: #1c1917;
  color: #f7f5f2;
  border-color: #1c1917;
}

.ys-btn--ghost {
  background: transparent;
  color: #57534e;
  border-color: transparent;
}

.ys-btn--ghost:hover:not(:disabled) {
  background: #f1ede6;
  color: #1c1917;
}

.ys-btn--link {
  padding-left: 0;
  padding-right: 0;
  background: transparent;
  color: #57534e;
  border-color: transparent;
  border-radius: 0;
}

.ys-btn--link:hover:not(:disabled) {
  color: #1c1917;
  text-decoration: underline;
  text-underline-offset: 0.22em;
}

.ys-btn--danger {
  background: #dc2626;
  color: #ffffff;
  border-color: transparent;
}

.ys-btn--danger:hover:not(:disabled) {
  background: #b91c1c;
}

.ys-btn--luxury {
  background: #c8a46a;
  color: #1c1917;
  border-color: #c8a46a;
}

.ys-btn--luxury:hover:not(:disabled) {
  background: #b99253;
  border-color: #b99253;
}
</style>
