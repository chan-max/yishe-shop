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
      :class="
        variant === 'outline' || variant === 'ghost' || variant === 'link'
          ? 'text-current'
          : 'text-white'
      "
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

    <span v-if="$slots.prefix && !loading" class="mr-2 flex items-center">
      <slot name="prefix"></slot>
    </span>

    <slot></slot>

    <span
      v-if="$slots.suffix && !loading"
      class="ml-2 flex items-center transition-transform duration-200 group-hover:translate-x-0.5"
    >
      <slot name="suffix"></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "link"
    | "danger"
    | "luxury"
    | "glass";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  type?: "button" | "submit" | "reset";
  block?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  type: "button",
  block: false,
  loading: false,
  disabled: false,
});

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

const buttonClass = computed(() => [
  "ys-btn group inline-flex items-center justify-center select-none cursor-pointer",
  `ys-btn--${props.variant}`,
  `ys-btn--${props.size}`,
  {
    "ys-btn--block": props.block,
    "ys-btn--loading": props.loading,
  },
]);

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) emit("click", event);
};
</script>

<style scoped>
.ys-btn {
  appearance: none;
  gap: 0.45rem;
  min-height: 2.8rem;
  border: 1px solid transparent;
  border-radius: 999px;
  background: var(--ys-text);
  color: #f8f5ef;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.18em;
  text-transform: uppercase;
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
  transform: none;
  box-shadow: none;
}

.ys-btn:active:not(:disabled) {
  transform: none;
}

.ys-btn:focus-visible {
  outline: none;
  box-shadow: none;
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
  min-height: 2rem;
  padding: 0.35rem 0.85rem;
  font-size: 11px;
}

.ys-btn--sm {
  min-height: 2.35rem;
  padding: 0.45rem 1rem;
  font-size: 12px;
}

.ys-btn--md {
  min-height: 2.8rem;
  padding: 0.65rem 1.25rem;
  font-size: 12px;
}

.ys-btn--lg {
  min-height: 3.25rem;
  padding: 0.8rem 1.8rem;
  font-size: 13px;
}

.ys-btn--xl {
  min-height: 3.5rem;
  padding: 0.95rem 2rem;
  font-size: 14px;
}

.ys-btn--primary {
  background: var(--ys-text);
  color: #f8f5ef;
  border-color: var(--ys-text);
}

.ys-btn--primary:hover:not(:disabled) {
  background: var(--ys-warm);
  border-color: var(--ys-warm);
}

.ys-btn--primary:active:not(:disabled) {
  background: #000;
  border-color: #000;
}

.ys-btn--secondary,
.ys-btn--glass {
  background: #ffffff;
  color: var(--ys-text);
  border-color: rgba(36, 49, 39, 0.12);
}

.ys-btn--secondary:hover:not(:disabled),
.ys-btn--glass:hover:not(:disabled) {
  background: #f5f5f5;
  border-color: rgba(0, 0, 0, 0.18);
}

.ys-btn--secondary:active:not(:disabled),
.ys-btn--glass:active:not(:disabled) {
  background: #eeeeee;
}

.ys-btn--outline {
  background: rgba(255, 255, 255, 0.3);
  color: var(--ys-accent-strong);
  border-color: rgba(0, 0, 0, 0.14);
}

.ys-btn--outline:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.8);
  color: var(--ys-text);
  border-color: rgba(139, 154, 135, 0.56);
}

.ys-btn--outline:active:not(:disabled) {
  background: var(--ys-surface-active);
  color: var(--ys-text);
}

.ys-btn--ghost {
  background: transparent;
  color: var(--ys-text-soft);
  border-color: transparent;
}

.ys-btn--ghost:hover:not(:disabled) {
  background: var(--ys-accent-soft);
  color: var(--ys-text);
}

.ys-btn--ghost:active:not(:disabled) {
  background: #ece6de;
}

.ys-btn--link {
  padding-left: 0;
  padding-right: 0;
  min-height: auto;
  background: transparent;
  color: var(--ys-accent-strong);
  border-color: transparent;
  border-radius: 0;
}

.ys-btn--link:hover:not(:disabled) {
  color: var(--ys-text);
  text-decoration: underline;
  text-underline-offset: 0.22em;
  box-shadow: none;
}

.ys-btn--danger {
  background: #dc2626;
  color: #ffffff;
  border-color: transparent;
}

.ys-btn--danger:hover:not(:disabled) {
  background: #b91c1c;
}

.ys-btn--danger:focus-visible {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.16);
}

.ys-btn--luxury {
  background: linear-gradient(135deg, #f3ede5, #e5ddd1);
  color: var(--ys-text);
  border-color: rgba(36, 49, 39, 0.12);
}

.ys-btn--luxury:hover:not(:disabled) {
  background: linear-gradient(135deg, #fcfaf6, #ece3d8);
  border-color: rgba(36, 49, 39, 0.18);
}

.ys-btn--luxury:active:not(:disabled) {
  background: linear-gradient(135deg, #ece3d8, #ddd2c6);
  border-color: rgba(36, 49, 39, 0.14);
}
</style>
