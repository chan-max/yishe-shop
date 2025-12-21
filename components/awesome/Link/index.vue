<script lang="ts" setup>
// micro compiler
const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  to: {
    type: [String, Object],
    default: undefined,
  },
  href: {
    type: String,
    default: '',
  },
})
// state
const href = toRef(props, 'href')
const to = toRef(props, 'to')
</script>

<template>
  <NuxtLink
    v-if="to"
    tag="a"
    :to="to"
    :class="`transition-all duration-300 ease-out dark:hover:text-white hover:text-gray-900 hover:underline transform-gpu hover:scale-105 active:scale-100 inline-block`"
  >
    <slot>{{ text }}</slot>
  </NuxtLink>
  <a
    v-else-if="!href"
    :class="`transition-all duration-300 ease-out dark:hover:text-white hover:text-gray-900 hover:underline transform-gpu hover:scale-105 active:scale-100 inline-block`"
    href="#"
  >
    <slot>{{ text }}</slot>
  </a>
  <a
    v-else
    :class="`transition-all duration-300 ease-out dark:hover:text-white hover:text-gray-900 hover:underline transform-gpu hover:scale-105 active:scale-100 inline-block`"
    :href="href"
  >
    <slot>{{ text }}</slot>
  </a>
</template>
