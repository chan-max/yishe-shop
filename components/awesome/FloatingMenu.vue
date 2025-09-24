<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-06-17 08:47:24
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-07-30 18:37:44
 * @FilePath: /yishe-scripts/Users/jackie/workspace/yishe-nuxt/components/awesome/FloatingMenu.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="fixed bottom-6 right-6 z-[9999]">
    <!-- 主菜单按钮 -->
    <button
      @click="isOpen = !isOpen"
      class="bg-primary-500 hover:bg-primary-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 relative"
    >
      <Icon
        :name="isOpen ? 'heroicons:x-mark' : 'heroicons:plus'"
        class="w-6 h-6"
      />
    </button>

    <!-- 展开的菜单项 -->
    <div
      v-if="isOpen"
      class="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-2 space-y-2 min-w-[200px] z-[9999]"
    >
      <NuxtLink
        to="/contact"
        class="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
      >
        <span>联系我们</span>
      </NuxtLink>


      <NuxtLink
        to="/quick-design"
        class="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
      >
        <span>快速设计</span>
      </NuxtLink>

      <button
        @click="openCustomerService"
        class="w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
      >
        <span>在线客服</span>
      </button>

      <button
        @click="scrollToTop"
        class="w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
      >
        <span>返回顶部</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false)

const openCustomerService = () => {
  // 这里可以集成您的在线客服系统
  window.open('您的客服链接', '_blank')
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style scoped>
.fixed {
  position: fixed;
  isolation: isolate;
}
</style> 