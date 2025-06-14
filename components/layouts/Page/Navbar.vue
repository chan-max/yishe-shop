<script lang="ts" setup>
const { awesome } = useAppConfig()
const { parseMenuRoute, parseMenuTitle } = useNavbarParser()
const $screen = useAwesomeScreen()
const nuxtApp = useNuxtApp()
const route = useRoute()

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
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
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
      <div class="container mx-auto px-8">
        <div class="flex h-12 items-center space-x-0 text-[10px] font-bold">
          <NuxtLink to="/" class="hover:text-gray-300 px-6 py-0 h-full flex items-center relative group">
            <span class="relative z-10">首页</span>
            <div class="absolute inset-0 bg-[#d01345] transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity" :class="{ 'opacity-100': route.path === '/' }"></div>
          </NuxtLink>
          <NuxtLink to="/products" class="hover:text-gray-300 px-6 py-0 h-full flex items-center relative group">
            <span class="relative z-10">产品</span>
            <div class="absolute inset-0 bg-[#d01345] transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity" :class="{ 'opacity-100': route.path === '/products' }"></div>
          </NuxtLink>
          <NuxtLink to="/about" class="hover:text-gray-300 px-6 py-0 h-full flex items-center relative group">
            <span class="relative z-10">关于我们</span>
            <div class="absolute inset-0 bg-[#d01345] transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity" :class="{ 'opacity-100': route.path === '/about' }"></div>
          </NuxtLink>
          <NuxtLink to="/contact" class="hover:text-gray-300 px-6 py-0 h-full flex items-center relative group">
            <span class="relative z-10">联系我们</span>
            <div class="absolute inset-0 bg-[#d01345] transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity" :class="{ 'opacity-100': route.path === '/contact' }"></div>
          </NuxtLink>
        </div>
      </div>
    </div>
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