<script lang="ts" setup>
import { useSearchStore } from '../../../stores/use-search'

const route = useRoute();
const router = useRouter();
const searchStore = useSearchStore();

// 广告轮播
const adItems = ref([
  { text: "🎉 新人注册送100积分，快来领取！", link: "/promo1" },
  { text: "🔥 首单立减50元，限时专享！", link: "/promo2" },
  { text: "💡 加入会员，享专属福利！", link: "/promo3" },
]);
const currentAdIndex = ref(0);

onMounted(() => {
  setInterval(() => {
    currentAdIndex.value = (currentAdIndex.value + 1) % adItems.value.length;
  }, 3000);
});

// 滚动监听
const isFixed = ref(false);
const SCROLL_THRESHOLD = 200;
const handleScroll = () => {
  isFixed.value = window.scrollY > SCROLL_THRESHOLD;
};
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// 移动端菜单与搜索
const isMobileMenuOpen = ref(false);
const isMobileSearchOpen = ref(false);
const toggleMobileSearch = () => {
  isMobileSearchOpen.value = !isMobileSearchOpen.value;
  if (isMobileSearchOpen.value) isMobileMenuOpen.value = false;
};
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  if (isMobileMenuOpen.value) isMobileSearchOpen.value = false;
};

// 搜索相关
const searchQuery = ref("");
const searchSuggestions = ref(["连衣裙", "牛仔裤", "T恤", "运动鞋", "休闲裤"]);
const hotSearches = ref([
  { text: "春季新品", count: 1234 },
  { text: "设计师联名", count: 986 },
  { text: "限时折扣", count: 876 },
  { text: "时尚配饰", count: 765 },
  { text: "运动系列", count: 654 },
]);
const isSearchFocused = ref(false);
const handleSearchBlur = () => {
  setTimeout(() => {
    isSearchFocused.value = false;
  }, 200);
};
const performSearch = () => {
  if (searchQuery.value.trim()) {
    searchStore.setSearchKeyword(searchQuery.value.trim());
    router.push({ path: '/products', query: { search: searchQuery.value.trim() } });
    isSearchFocused.value = false;
    isMobileSearchOpen.value = false;
  }
};
const selectSuggestion = (suggestion: string) => {
  searchQuery.value = suggestion;
  performSearch();
  isMobileSearchOpen.value = false;
};
const selectHotSearch = (hotSearch: { text: string; count: number }) => {
  searchQuery.value = hotSearch.text;
  performSearch();
  isMobileSearchOpen.value = false;
};
const searchRef = ref(null);
onClickOutside(searchRef, () => {
  isSearchFocused.value = false;
});
</script>

<template>
  <div class="navbar-root relative">
    <!-- 占位元素，防止固定定位导致的内容跳动 -->
    <div class="h-[120px]" v-if="isFixed"></div>
    <!-- 导航栏 -->
    <div
      :class="[
        'z-50 transition-all duration-300',
        isFixed ? 'fixed top-0 left-0 right-0 shadow-lg' : 'relative',
      ]"
    >
      <!-- 广告内容 -->
      <div class="w-full bg-white text-black py-1">
        <div class="container mx-auto">
          <div
            class="flex items-center justify-center text-center overflow-hidden h-8"
            style="height: 1.2rem"
          >
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
            <!-- title 和 小菜单 -->
            <div class="flex items-center space-x-8">
              <slot name="title">
                <NuxtLink to="/" class="font-bold text-lg text-white">
                  <div class="flex items-center gap-2">
                    <img src="/logo.svg" class="h-8 lg:h-10" />
                    <NuxtLink to="/" class="text-xl font-thin">
                      <span style="font-family: logo!important;">衣设服装设计</span>
                    </NuxtLink>
                  </div>
                </NuxtLink>
              </slot>
              
              <!-- 小菜单 - 只显示前三个 -->
              <div class="hidden lg:flex items-center space-x-6 text-[10px] font-normal mr-4">
                <NuxtLink
                  to="/"
                  class="hover:text-gray-300 px-3 py-2 h-full flex items-center relative group"
                >
                  <span class="relative z-10" :class="{ 'text-white': route.path === '/' }">首页</span>
                  <div
                    class="absolute inset-0 bg-[#525051] opacity-0 group-hover:opacity-100 transition-opacity"
                    :class="{ 'opacity-100': route.path === '/' }"
                  ></div>
                </NuxtLink>
                <NuxtLink
                  to="/new-arrivals"
                  class="hover:text-gray-300 px-3 py-2 h-full flex items-center relative group"
                >
                  <span class="relative z-10" :class="{ 'text-white': route.path === '/new-arrivals' }">新品上市!!</span>
                  <div
                    class="absolute inset-0 bg-[#525051] opacity-0 group-hover:opacity-100 transition-opacity"
                    :class="{ 'opacity-100': route.path === '/new-arrivals' }"
                  ></div>
                </NuxtLink>
                <NuxtLink
                  to="/products"
                  class="hover:text-gray-300 px-3 py-2 h-full flex items-center relative group"
                >
                  <span class="relative z-10" :class="{ 'text-white': route.path === '/products' }">精选商品</span>
                  <div
                    class="absolute inset-0 bg-[#525051] opacity-0 group-hover:opacity-100 transition-opacity"
                    :class="{ 'opacity-100': route.path === '/products' }"
                  ></div>
                </NuxtLink>
              </div>
            </div>

            <!-- 搜索框和图标按钮 -->
            <div class="hidden lg:flex items-center space-x-6 ml-auto flex-1 max-w-3xl">
              <!-- 搜索框容器 -->
              <div class="relative flex-1 max-w-md" ref="searchRef">
                <!-- 搜索输入框 -->
                <div class="relative">
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="搜索商品..."
                    class="w-full px-4 py-2.5 rounded-full bg-white border-2 border-white/30 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#d01345] transition-colors text-sm pr-12"
                    @keyup.enter="performSearch"
                    @focus="isSearchFocused = true"
                    @blur="handleSearchBlur"
                  />
                  <button
                    @click="performSearch"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#d01345] transition-colors"
                  >
                    <i class="i-heroicons-magnifying-glass-20-solid w-5 h-5"></i>
                  </button>
                </div>

                <!-- 搜索下拉提示 -->
                <div
                  v-if="isSearchFocused"
                  class="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl z-50 border border-gray-200"
                >
                  <div class="p-4">
                    <!-- 搜索建议 -->
                    <div v-if="searchQuery" class="mb-4">
                      <h3 class="text-sm font-medium text-gray-500 mb-2">搜索建议</h3>
                      <div class="flex flex-wrap gap-2">
                        <button
                          v-for="suggestion in searchSuggestions"
                          :key="suggestion"
                          @click="selectSuggestion(suggestion)"
                          class="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-[#2d2d2d] hover:text-white transition-colors"
                        >
                          {{ suggestion }}
                        </button>
                      </div>
                    </div>

                    <!-- 热门搜索 -->
                    <div>
                      <h3 class="text-sm font-medium text-gray-500 mb-2">热门搜索</h3>
                      <div class="space-y-2">
                        <button
                          v-for="(item, index) in hotSearches"
                          :key="index"
                          @click="selectHotSearch(item)"
                          class="w-full flex items-center justify-between px-3 py-2 hover:bg-[#2d2d2d] hover:text-white rounded-lg transition-colors"
                        >
                          <span class="text-gray-700">{{ item.text }}</span>
                          <span class="text-xs text-gray-400"
                            >{{ item.count }}次搜索</span
                          >
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex items-center space-x-4 flex-shrink-0">
                <button
                  class="text-white/70 hover:text-white transition-colors relative group"
                >
                  <Icon name="uil:heart" class="w-6 h-6" />
                  <span
                    class="absolute -top-2 -right-2 bg-[#d01345] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
                    >2</span
                  >
                </button>
                <button
                  class="text-white/70 hover:text-white transition-colors relative group"
                >
                  <Icon name="uil:shopping-cart" class="w-6 h-6" />
                  <span
                    class="absolute -top-2 -right-2 bg-[#d01345] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
                    >3</span
                  >
                </button>
                <button class="text-white/70 hover:text-white transition-colors">
                  <Icon name="uil:user" class="w-6 h-6" />
                </button>
                <button class="text-white/70 hover:text-white transition-colors">
                  <Icon name="uil:bell" class="w-6 h-6" />
                </button>
                <button class="text-white/70 hover:text-white transition-colors">
                  <Icon name="uil:comment-dots" class="w-6 h-6" />
                </button>
              </div>
            </div>

            <!-- 移动端搜索和购物车按钮 -->
            <div class="flex lg:hidden items-center space-x-4">
              <button
                @click="toggleMobileSearch"
                class="text-white/70 hover:text-white transition-colors"
              >
                <Icon name="uil:search" class="w-6 h-6" />
              </button>

              <button
                @click="toggleMobileMenu"
                class="text-white/70 hover:text-white transition-colors"
              >
                <Icon name="uil:bars" class="w-6 h-6" />
              </button>
            </div>
          </div>

          <!-- 移动端搜索框 -->
          <div v-if="isMobileSearchOpen" class="lg:hidden fixed inset-0 bg-black/50 z-50">
            <div class="bg-white h-full w-full">
              <div class="container mx-auto px-4 py-4">
                <div class="flex items-center justify-between mb-4">
                  <div class="relative flex-1 mr-4">
                    <input
                      v-model="searchQuery"
                      type="text"
                      placeholder="搜索商品..."
                      class="w-full px-3 py-2 rounded-full bg-gray-50 border-2 border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#d01345] transition-colors text-sm"
                      @keyup.enter="performSearch"
                    />
                    <button
                      @click="performSearch"
                      class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#d01345] transition-colors"
                    >
                      <Icon name="uil:search" class="w-5 h-5" />
                    </button>
                  </div>
                  <button
                    @click="toggleMobileSearch"
                    class="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <Icon name="uil:multiply" class="w-6 h-6" />
                  </button>
                </div>
                
                <!-- 搜索建议 -->
                <div v-if="searchQuery" class="mb-4">
                  <h3 class="text-sm font-medium text-gray-500 mb-2">搜索建议</h3>
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="suggestion in searchSuggestions"
                      :key="suggestion"
                      @click="selectSuggestion(suggestion)"
                      class="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-[#2d2d2d] hover:text-white transition-colors"
                    >
                      {{ suggestion }}
                    </button>
                  </div>
                </div>

                <!-- 热门搜索 -->
                <div class="mb-4">
                  <h3 class="text-sm font-medium text-gray-500 mb-2">热门搜索</h3>
                  <div class="space-y-2">
                    <button
                      v-for="(item, index) in hotSearches"
                      :key="index"
                      @click="selectHotSearch(item)"
                      class="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <span class="text-gray-700">{{ item.text }}</span>
                      <span class="text-xs text-gray-400">{{ item.count }}次搜索</span>
                    </button>
                  </div>
                </div>

                <!-- 搜索历史 -->
                <div>
                  <h3 class="text-sm font-medium text-gray-500 mb-2">搜索历史</h3>
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="history in ['连衣裙', '牛仔裤', 'T恤']"
                      :key="history"
                      @click="selectSuggestion(history)"
                      class="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-[#2d2d2d] hover:text-white transition-colors"
                    >
                      {{ history }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- 移动端菜单 -->
      <div v-if="isMobileMenuOpen" class="lg:hidden fixed inset-0 bg-black/50 z-50">
        <div class="bg-white h-full w-4/5 max-w-sm ml-auto">
          <div class="container mx-auto px-4 py-2">
            <div class="flex justify-end py-4">
              <button
                @click="toggleMobileMenu"
                class="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Icon name="uil:multiply" class="w-6 h-6" />
              </button>
            </div>
            <div class="flex flex-col space-y-1">
              <NuxtLink
                v-for="(item, index) in [
                  { path: '/', title: '首页' },
                  { path: '/new-arrivals', title: '新品上市' },
                  { path: '/products', title: '精选商品' },
                  { path: '/hot-sales', title: '热销商品' },
                  { path: '/designers', title: '设计师专区' },
                  { path: '/member', title: '会员中心' },
                  { path: '/shopping-guide', title: '购物指南' },
                  { path: '/fashion-news', title: '时尚资讯' },
                  { path: '/about', title: '关于我们' },
                ]"
                :key="index"
                :to="item.path"
                class="px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#d01345] transition-colors rounded-lg"
                :class="{ 'bg-[#2D2D2D] text-white': route.path === item.path }"
                @click="toggleMobileMenu"
              >
                {{ item.title }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes advert-vertical {
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-1.5rem);
  }
  50% {
    transform: translateY(-3rem);
  }
  75% {
    transform: translateY(-1.5rem);
  }
  100% {
    transform: translateY(0);
  }
}

.navbar-root {
  /* 可加全局防护样式 */
}

.navbar-root .animate-advert-vertical .advert-vertical-list {
  animation: advert-vertical 6s infinite;
}

.navbar-root header {
  background: #2D2D2D !important;
  color: #fff !important;
}

.navbar-root .h-\[120px\] {
  height: 120px !important;
}

.navbar-root .bg-white {
  background: #fff !important;
}

.navbar-root .text-black {
  color: #000 !important;
}

.navbar-root .text-white {
  color: #fff !important;
}

/* 你可以继续为其他容易被污染的类加 .navbar-root 前缀和 !important */
</style>
