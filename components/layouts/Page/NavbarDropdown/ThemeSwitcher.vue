<script lang="ts" setup>
const props = defineProps({
  type: {
    type: String,
    default: 'dropdown-right-top',
  },
})
const currentStyle = toRef(props, 'type')

const availableThemes = [
  {
    key: 'light',
    text: 'Light',
    icon: 'sun',
  },
  {
    key: 'dark',
    text: 'Dark',
    icon: 'moon',
  },
  {
    key: 'system',
    text: 'System',
    icon: 'laptop',
  },
]
</script>

<template>
  <div class="flex items-center">
    <HeadlessListbox
      v-if="currentStyle === 'dropdown-right-top'"
      v-model="$colorMode.preference"
      as="div"
      class="relative flex items-center"
    >
      <HeadlessListboxLabel class="sr-only">Theme</HeadlessListboxLabel>
      <HeadlessListboxButton type="template">
        <AwesomeLink class="dark:text-gray-400 text-gray-600">
          <span class="flex justify-center items-center dark:hidden">
            <AppIcon name="sun" :size="18" />
          </span>
          <span class="justify-center items-center hidden dark:flex">
            <AppIcon name="moon" :size="18" />
          </span>
        </AwesomeLink>
      </HeadlessListboxButton>
      <HeadlessListboxOptions
        class="p-1 absolute z-50 origin-top-right top-full right-0 outline-none bg-white rounded-lg ring-1 ring-gray-900/10 shadow-lg overflow-hidden w-36 py-1 text-sm text-gray-700 font-semibold dark:bg-gray-800 dark:ring-0 dark:highlight-white/5 dark:text-gray-300"
      >
        <HeadlessListboxOption
          v-for="theme in availableThemes"
          :key="theme.key"
          :value="theme.key"
          :class="{
            'py-2 px-2 flex items-center cursor-pointer': true,
            'text-sky-500 bg-gray-100 dark:bg-gray-600/30':
              $colorMode.preference === theme.key,
            'hover:bg-gray-50 dark:hover:bg-gray-700/30':
              $colorMode.preference !== theme.key,
          }"
        >
          <span class="text-sm mr-2 flex items-center">
            <AppIcon :name="theme.icon" :size="16" />
          </span>
          {{ theme.text }}
        </HeadlessListboxOption>
      </HeadlessListboxOptions>
    </HeadlessListbox>
    <select
      v-if="currentStyle === 'select-box'"
      v-model="$colorMode.preference"
      class="w-full px-2 pr-3 py-1 outline-none rounded border bg-transparent text-gray-700 dark:text-gray-300 border-gray-900/10 dark:border-gray-50/[0.2]"
    >
      <option
        v-for="theme in availableThemes"
        :key="theme.key"
        :value="theme.key"
      >
        {{ theme.text }}
      </option>
    </select>
  </div>
</template>
