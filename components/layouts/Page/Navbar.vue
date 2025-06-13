<script lang="ts" setup>
const { awesome } = useAppConfig()
const { parseMenuRoute, parseMenuTitle } = useNavbarParser()
const $screen = useAwesomeScreen()
const nuxtApp = useNuxtApp()

const menus = computed(
  () =>
    (awesome?.layout?.page?.navbar?.menus ||
      []) as AwesomeLayoutPageNavbarMenu[],
)

// drawer
const showDrawer = ref(false)

// 广告轮播
const adItems = ref([
  { text: '🎉 新人注册送100积分，快来领取！', link: '/promo1' },
  { text: '🔥 首单立减50元，限时专享！', link: '/promo2' },
  { text: '💡 加入会员，享专属福利！', link: '/promo3' }
])
const currentAdIndex = ref(0)

// 自动轮播
onMounted(() => {
  setInterval(() => {
    currentAdIndex.value = (currentAdIndex.value + 1) % adItems.value.length
  }, 3000)
})
</script>

<template>
  <div class=" top-0 left-0 right-0 z-50">
    <!-- 广告内容 -->
    <div class="w-full bg-white text-black py-1">
      <div class="container mx-auto">
        <div class="flex items-center justify-center text-center overflow-hidden h-8" style="height: 1.2rem;">
          <Transition
            mode="out-in"
            enter-active-class="transition duration-500 ease-out"
            enter-from-class="transform translate-y-full opacity-0"
            enter-to-class="transform translate-y-0 opacity-100"
            leave-active-class="transition duration-500 ease-in"
            leave-from-class="transform translate-y-0 opacity-100"
            leave-to-class="transform -translate-y-full opacity-0"
          >
            <a
              :key="currentAdIndex"
              :href="adItems[currentAdIndex].link"
              class="hover:underline block py-1 text-xs md:text-sm font-normal text-black"
            >
              {{ adItems[currentAdIndex].text }}
            </a>
          </Transition>
        </div>
      </div>
    </div>
    <!-- 导航栏 -->
    <header class="bg-[#2D2D2D] text-white">
      <div class="container mx-auto">
        <div class="flex h-16 items-center justify-between">
          <!-- title -->
          <div class="flex items-center space-x-4">
            <slot name="title">
              <NuxtLink to="/" class="font-bold text-lg text-white">
                <div class="flex items-center gap-2">
                  <img src="logo.svg" class="h-10">
                  <img src="logo_t.svg" class="h-5">
                </div>
              </NuxtLink>
            </slot>
          </div>
          <div> menu </div>
        </div>
      </div>
    </header>
    <!-- 小菜单 -->
    <div class="bg-[#525051] text-white">
      <div class="container mx-auto">
        <div class="flex h-12 items-center space-x-6 text-sm">
          <NuxtLink to="/" class="hover:text-gray-300">首页</NuxtLink>
          <NuxtLink to="/products" class="hover:text-gray-300">产品</NuxtLink>
          <NuxtLink to="/about" class="hover:text-gray-300">关于我们</NuxtLink>
          <NuxtLink to="/contact" class="hover:text-gray-300">联系我们</NuxtLink>
        </div>
      </div>
    </div>
    <!-- 移动端抽屉菜单 -->
    <AwesomeActionSheet
      v-if="showDrawer"
      @close="() => (showDrawer = false)"
    >
      <AwesomeActionSheetGroup>
        <AwesomeActionSheetHeader>
          <AwesomeActionSheetHeaderTitle text="Menu" />
        </AwesomeActionSheetHeader>
        <!-- dynamic menus -->
        <AwesomeActionSheetItem>
          <div
            class="flex flex-col text-sm items-center divide-y divide-gray-400 dark:divide-gray-700 text-center"
          >
            <template v-for="(item, i) in menus">
              <template v-if="item?.type === 'link'">
                <NuxtLink
                  :key="i"
                  :to="parseMenuRoute(item.to)"
                  #="{ isActive }"
                  class="w-full py-2"
                >
                  <span
                    :class="{
                      'text-gray-900 dark:text-gray-100 font-bold': isActive,
                      'text-gray-700 dark:text-gray-300': !isActive,
                    }"
                    >{{ parseMenuTitle(item?.title) }}</span
                  >
                </NuxtLink>
              </template>
              <template v-if="item?.type === 'button'">
                <AwesomeButton
                  :key="i"
                  :text="parseMenuTitle(item?.title)"
                  size="sm"
                  :to="parseMenuRoute(item.to)"
                  class="w-full"
                />
              </template>
              <template v-if="item?.type === 'dropdown'">
                <div :key="i" class="w-full">
                  <HeadlessDisclosure v-slot="{ open }">
                    <HeadlessDisclosureButton
                      :key="i"
                      :class="[
                        'text-gray-700 dark:text-gray-300 w-full py-2 flex items-center justify-center duration-300 transition-all',
                        open ? 'font-bold' : '',
                      ]"
                    >
                      <span>{{ parseMenuTitle(item?.title) }}</span>
                      <Icon
                        name="carbon:chevron-right"
                        class="ml-1"
                        :class="[
                          open
                            ? 'duration-300 transition-all transform rotate-90'
                            : 'rotate-0',
                        ]"
                      />
                    </HeadlessDisclosureButton>
                    <Transition
                      enter-active-class="transition duration-100 ease-out"
                      enter-from-class="transform scale-95 opacity-0"
                      enter-to-class="transform scale-100 opacity-100"
                      leave-active-class="transition duration-75 ease-out"
                      leave-from-class="transform scale-100 opacity-100"
                      leave-to-class="transform scale-95 opacity-0"
                    >
                      <HeadlessDisclosurePanel class="text-gray-500 pb-2">
                        <template
                          v-for="(child, j) in item?.children || []"
                          :key="j"
                        >
                          <NuxtLink
                            :to="parseMenuRoute(child.to)"
                            #="{ isActive }"
                            class="w-full py-2"
                          >
                            <span
                              :class="[
                                isActive
                                  ? 'text-gray-900 dark:text-gray-100 font-bold'
                                  : 'text-gray-700 dark:text-gray-300',
                              ]"
                              >{{ parseMenuTitle(child?.title) }}</span
                            >
                          </NuxtLink>
                        </template>
                      </HeadlessDisclosurePanel>
                    </Transition>
                  </HeadlessDisclosure>
                </div>
              </template>
            </template>
          </div>
        </AwesomeActionSheetItem>
      </AwesomeActionSheetGroup>
    </AwesomeActionSheet>
  </div>
</template>

<style scoped>
@keyframes advert-vertical {
  0% { transform: translateY(0); }
  25% { transform: translateY(-1.5rem); }
  50% { transform: translateY(-3rem); }
  75% { transform: translateY(-1.5rem); }
  100% { transform: translateY(0); }
}
.animate-advert-vertical .advert-vertical-list {
  animation: advert-vertical 6s infinite;
}
</style>