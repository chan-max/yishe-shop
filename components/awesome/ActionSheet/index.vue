<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-04-03 05:45:40
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-06-01 06:12:28
 * @FilePath: /yishe-admin/Users/jackie/workspace/yishe-nuxt/components/awesome/ActionSheet/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'close', event: MouseEvent): void
}>()
const props = defineProps({
  closeButton: {
    type: Boolean,
    default: true,
  },
  closeButtonText: {
    type: String,
    default: 'Cancel',
  },
})

const isShow = ref(false)

const close = (e: MouseEvent) => {
  isShow.value = false
  setTimeout(() => emit('close', e), 300)
}

const onCloseComponentClick = (e: MouseEvent) => {
  const acceptedClasses = ['action-sheet', 'action-sheet-container']
  const target = e.target as HTMLElement
  const targetClassList = target.classList
  for (const acceptedClass of acceptedClasses) {
    if (targetClassList.contains(acceptedClass)) {
      close(e)
      break
    }
  }
}

onMounted(() => {
  isShow.value = true
})
</script>

<template>
  <Teleport to="body">
    <HeadlessTransitionRoot
      :show="isShow"
      class="action-sheet fixed z-50 top-0 left-0 w-screen h-screen max-h-screen max-w-full flex flex-col justify-end bg-black/[0.5]"
      enter="transition-opacity duration-300"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="transition-opacity duration-300"
      leave-from="opacity-100"
      leave-to="opacity-0"
      @click="onCloseComponentClick"
    >
      <div class="flex flex-col overflow-hidden relative">
        <div
          class="action-sheet-container flex-1 overflow-y-auto space-y-1 justify-end px-4 pb-2 pt-4"
          style=" padding-bottom: calc(20vh + env(safe-area-inset-bottom));"
        >
          <slot />
          <AwesomeActionSheetGroup v-if="closeButton">
            <AwesomeActionSheetItemButton
              class="text-red-500 font-bold"
              :text="closeButtonText"
              @click="close"
            />
          </AwesomeActionSheetGroup>
        </div>
      </div>
    </HeadlessTransitionRoot>
  </Teleport>
</template>
