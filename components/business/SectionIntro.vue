<script setup lang="ts">
interface Props {
  kicker?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
}

withDefaults(defineProps<Props>(), {
  kicker: "",
  description: "",
  align: "start",
});
</script>

<template>
  <div
    :class="[
      'flex gap-8',
      align === 'center'
        ? 'flex-col items-center text-center'
        : 'flex-col lg:flex-row lg:items-end lg:justify-between',
    ]"
  >
    <div class="max-w-2xl">
      <div v-if="kicker" class="minimal-kicker">{{ kicker }}</div>
      <h2
        class="ys-display mt-4 text-[29px] leading-[1.16] text-[color:var(--ys-text)] sm:text-[36px] lg:text-[40px]"
      >
        {{ title }}
      </h2>
      <p
        v-if="description"
        class="mt-5 max-w-[42rem] text-[14px] leading-8 text-[color:var(--ys-text-soft)]"
      >
        {{ description }}
      </p>
    </div>
    <div v-if="$slots.actions" class="flex items-center gap-3">
      <slot name="actions" />
    </div>
  </div>
</template>
