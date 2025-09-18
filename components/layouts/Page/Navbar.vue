<script lang="ts" setup>
import { useSearchStore } from '../../../stores/use-search'

const { awesome } = useAppConfig();
const { parseMenuRoute, parseMenuTitle } = useNavbarParser();
const $screen = useAwesomeScreen();
const nuxtApp = useNuxtApp();
const route = useRoute();
const router = useRouter();

// 引入搜索store
const searchStore = useSearchStore();

const menus = computed(
  () => (awesome?.layout?.page?.navbar?.menus || []) as AwesomeLayoutPageNavbarMenu[]
);

// drawer
const showDrawer = ref(false);

// 广告轮播
const adItems = ref([
  { text: "🎉 新人注册送100积分，快来领取！", link: "/promo1" },
  { text: "🔥 首单立减50元，限时专享！", link: "/promo2" },
  { text: "💡 加入会员，享专属福利！", link: "/promo3" },
]);
const currentAdIndex = ref(0);

// 自动轮播
onMounted(() => {
  setInterval(() => {
    currentAdIndex.value = (currentAdIndex.value + 1) % adItems.value.length;
  }, 3000);
});

// 添加滚动监听
const isFixed = ref(false);
const lastScrollY = ref(0);
const SCROLL_THRESHOLD = 200; // 滚动阈值，可以根据需要调整

const handleScroll = () => {
  const currentScrollY = window.scrollY;
  isFixed.value = currentScrollY > SCROLL_THRESHOLD;
  lastScrollY.value = currentScrollY;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// 移动端菜单状态
const isMobileMenuOpen = ref(false);
const isMobileSearchOpen = ref(false);

// 移动端搜索控制
const toggleMobileSearch = () => {
  isMobileSearchOpen.value = !isMobileSearchOpen.value;
  if (isMobileSearchOpen.value) {
    isMobileMenuOpen.value = false;
  }
};

// 移动端菜单控制
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  if (isMobileMenuOpen.value) {
    isMobileSearchOpen.value = false;
  }
};

// 关闭移动端菜单
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

// 关闭移动端搜索
const closeMobileSearch = () => {
  isMobileSearchOpen.value = false;
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

// 全屏搜索相关数据
const fullscreenSearchSuggestions = ref([
  "连衣裙", "牛仔裤", "T恤", "运动鞋", "休闲裤", "衬衫", "外套", "裙子", "短裤", "长裤"
]);

const fullscreenHotSearches = ref([
  { text: "春季新品", count: 1234, tag: "new" },
  { text: "设计师联名", count: 986, tag: "designer" },
  { text: "限时折扣", count: 876, tag: "sale" },
  { text: "时尚配饰", count: 765, tag: "accessories" },
  { text: "运动系列", count: 654, tag: "sports" },
  { text: "情侣装", count: 543, tag: "couple" },
  { text: "童装专属", count: 432, tag: "kids" },
  { text: "团队风格", count: 321, tag: "team" }
]);

const fullscreenCategories = ref([
  { name: "服装", items: ["T恤", "衬衫", "外套", "连衣裙", "牛仔裤", "休闲裤"] },
  { name: "配饰", items: ["包包", "帽子", "围巾", "腰带", "手套", "袜子"] },
  { name: "家居", items: ["杯子", "挂毯", "毛巾", "抱枕", "装饰画", "桌布"] },
  { name: "数码", items: ["鼠标垫", "手机壳", "键盘", "耳机", "充电器", "数据线"] }
]);

const fullscreenBrands = ref([
  "ASOS DESIGN", "adidas", "British Brands", "New Balance", "New Look", "The North Face"
]);

const fullscreenTrending = ref([
  { text: "最近发布", icon: "uil:clock" },
  { text: "人气最高", icon: "uil:fire" },
  { text: "好评最高", icon: "uil:star" },
  { text: "限量发售", icon: "uil:gift" },
  { text: "热销爆款", icon: "uil:trending-up" }
]);

// 搜索历史
const searchHistory = ref(["连衣裙", "牛仔裤", "T恤"]);

// 添加搜索历史
const addToSearchHistory = (keyword: string) => {
  if (!searchHistory.value.includes(keyword)) {
    searchHistory.value.unshift(keyword);
    // 限制历史记录数量
    if (searchHistory.value.length > 10) {
      searchHistory.value = searchHistory.value.slice(0, 10);
    }
  }
};

// 清除搜索历史
const clearSearchHistory = () => {
  searchHistory.value = [];
};

// 全屏搜索状态
const isFullscreenSearchOpen = ref(false);

// 输入框聚焦时打开全屏搜索
const openFullscreenSearch = () => {
  console.log('输入框聚焦 - 打开全屏搜索');
  isFullscreenSearchOpen.value = true;
  // 聚焦到全屏搜索输入框
  nextTick(() => {
    const fullscreenInput = document.getElementById('fullscreen-search-input');
    if (fullscreenInput) {
      fullscreenInput.focus();
    }
  });
};

// 关闭全屏搜索
const closeFullscreenSearch = () => {
  isFullscreenSearchOpen.value = false;
  searchQuery.value = '';
};

// 全屏搜索框聚焦状态
const isSearchFocused = ref(false);

// 搜索框失去焦点处理
const handleSearchBlur = () => {
  // 延迟关闭，避免点击建议时立即关闭
  setTimeout(() => {
    isSearchFocused.value = false;
  }, 200);
};

// 执行搜索
const performSearch = () => {
  if (searchQuery.value.trim()) {
    // 添加到搜索历史
    addToSearchHistory(searchQuery.value.trim());
    
    // 设置全局搜索关键词
    searchStore.setSearchKeyword(searchQuery.value.trim());
    
    // 跳转到搜索页面
    router.push({
      path: '/search',
      query: { q: searchQuery.value.trim() }
    });
    
    // 关闭搜索框
    isSearchFocused.value = false;
    isMobileSearchOpen.value = false;
    isFullscreenSearchOpen.value = false;
  }
};

// 点击搜索建议
const selectSuggestion = (suggestion: string) => {
  searchQuery.value = suggestion;
  addToSearchHistory(suggestion);
  performSearch();
  // 确保搜索框关闭
  isMobileSearchOpen.value = false;
  isFullscreenSearchOpen.value = false;
};

// 点击热门搜索
const selectHotSearch = (hotSearch: { text: string; count: number }) => {
  searchQuery.value = hotSearch.text;
  addToSearchHistory(hotSearch.text);
  performSearch();
  // 确保搜索框关闭
  isMobileSearchOpen.value = false;
  isFullscreenSearchOpen.value = false;
};

// 全屏搜索相关函数
const selectFullscreenSuggestion = (suggestion: string) => {
  searchQuery.value = suggestion;
  addToSearchHistory(suggestion);
  performSearch();
  isFullscreenSearchOpen.value = false;
};

const selectFullscreenHotSearch = (hotSearch: { text: string; count: number; tag: string }) => {
  searchQuery.value = hotSearch.text;
  addToSearchHistory(hotSearch.text);
  performSearch();
  isFullscreenSearchOpen.value = false;
};

const selectFullscreenCategory = (category: string, item: string) => {
  searchQuery.value = item;
  addToSearchHistory(item);
  performSearch();
  isFullscreenSearchOpen.value = false;
};

const selectFullscreenBrand = (brand: string) => {
  searchQuery.value = brand;
  addToSearchHistory(brand);
  performSearch();
  isFullscreenSearchOpen.value = false;
};

const selectFullscreenTrending = (trending: { text: string; icon: string }) => {
  searchQuery.value = trending.text;
  addToSearchHistory(trending.text);
  performSearch();
  isFullscreenSearchOpen.value = false;
};

// 点击外部关闭搜索
const searchRef = ref(null);
onClickOutside(searchRef, () => {
  isSearchFocused.value = false;
});

// 点击外部关闭移动端菜单和搜索
const mobileMenuRef = ref(null);
const mobileSearchRef = ref(null);

onClickOutside(mobileMenuRef, () => {
  isMobileMenuOpen.value = false;
});

onClickOutside(mobileSearchRef, () => {
  isMobileSearchOpen.value = false;
});
</script>

<template>
  <div class="relative">
    <!-- 占位元素，防止固定定位导致的内容跳动 -->
    <!-- <div class="h-[120px]" v-if="isFixed"></div> -->
    <!-- 导航栏 -->
    <div
      :class="[
        'z-50 transition-all duration-300',
        isFixed ? 'fixed top-0 left-0 right-0 shadow-lg' : 'relative',
      ]"
    >
      <!-- 广告内容 -->
      <!-- <div class="w-full bg-white text-black py-1">
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
      </div> -->
      <!-- 导航栏 -->
      <header class="bg-white text-black">
        <div class=" mx-auto px-6 sm:px-4 lg:px-6 xl:px-8 2xl:px-12">
          <div class="flex h-[54px] items-center gap-4">
            <!-- title -->
            <div class="flex items-center flex-shrink-0">
              <slot name="title">
                <NuxtLink to="/" class="font-bold text-lg text-black">
                  <div class="flex items-center gap-2">
                    <!-- <img src="/logo.svg" class="h-8 lg:h-10" /> -->
                    <NuxtLink to="/" class="text-xl font-thin">
                      <span style="font-family: logo!important;">衣设服装设计</span>
                    </NuxtLink>
                  </div>
                </NuxtLink>
              </slot>
            </div>
            <!-- PC端菜单 -->
            <div class="hidden lg:flex items-center h-[54px] flex-shrink-0">
              <NuxtLink
                to="/"
                class="hover:text-gray-600 px-3 py-0 h-full flex items-center relative group text-[10px]"
                :class="[route.path === '/' ? 'text-black bg-gray-200 rounded' : '']"
              >
                首页
              </NuxtLink>
              <NuxtLink
                to="/products"
                class="hover:text-gray-600 px-3 py-0 h-full flex items-center relative group text-[10px]"
                :class="[route.path === '/products' ? 'text-black bg-gray-200 rounded' : '']"
              >
                寻找商品
              </NuxtLink>
              <NuxtLink
                to="/custom-design"
                class="hover:text-gray-600 px-3 py-0 h-full flex items-center relative group text-[10px]"
                :class="[route.path === '/custom-design' ? 'text-black bg-gray-200 rounded' : '']"
              >
                私人订制
              </NuxtLink>
            </div>
            <!-- 搜索框和图标按钮 -->
            <div class="hidden lg:flex items-center gap-6 flex-1 min-w-0">
              <!-- 搜索框容器 -->
              <div class="relative flex-1 min-w-0" ref="searchRef">
                <!-- 搜索输入框 -->
                <div class="relative">
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="搜索商品..."
                    class="w-full px-4 py-2.5 rounded-full bg-gray-100 border-2 border-white/30 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#d01345] transition-colors text-[10px] pr-12 cursor-pointer"
                    @focus="openFullscreenSearch"
                    @keyup.enter="performSearch"
                  />
                  <button
                    @click="performSearch"
                    class="absolute right-1 top-1/2 -translate-y-1/2 bg-gray-300 hover:bg-gray-400 text-gray-600 rounded-full px-3 py-1.5 transition-colors shadow-sm z-10 cursor-pointer"
                    type="button"
                  >
                    <Icon name="uil:search" class="w-4 h-4" />
                  </button>
                </div>

                <!-- 搜索下拉提示 -->
                <div
                  v-if="isSearchFocused"
                  class="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl z-[9999] border border-gray-200"
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
                          class="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] rounded-full hover:bg-gray-300 hover:text-black transition-colors"
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
                          class="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-200 hover:text-black rounded-lg transition-colors"
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
              <div class="flex items-center gap-4 flex-shrink-0">
                <button class="text-gray-600 hover:text-black transition-colors">
                  <Icon name="uil:comment-dots" class="w-6 h-6" />
                </button>
              </div>
            </div>

            <!-- 移动端搜索和购物车按钮 -->
            <div class="flex lg:hidden items-center gap-4 ml-auto flex-shrink-0">
              <button
                @click="performSearch"
                class="text-gray-600 hover:text-black transition-colors mobile-button"
              >
                <Icon name="uil:search" class="w-6 h-6" />
              </button>
              <button
                @click="toggleMobileMenu"
                class="text-gray-600 hover:text-black transition-colors mobile-button"
              >
                <Icon name="uil:bars" class="w-6 h-6" />
              </button>
            </div>
          </div>

          <!-- 移动端搜索框 -->
          <Transition name="mobile-search">
            <div v-if="isMobileSearchOpen" class="lg:hidden fixed inset-0 bg-black/50 z-[9999]" ref="mobileSearchRef">
              <div class="bg-white h-full w-full">
                                  <div class="container mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-4">
                  <div class="flex items-center justify-between mb-4">
                    <div class="relative flex-1 mr-4">
                      <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="搜索商品..."
                        class="w-full px-3 py-2 rounded-full bg-gray-50 border-2 border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#d01345] transition-colors text-[10px] pr-16"
                        @keyup.enter="performSearch"
                      />
                      <button
                        @click="performSearch"
                        class="absolute right-1 top-1/2 -translate-y-1/2 bg-gray-300 hover:bg-gray-400 text-gray-600 rounded-full px-2.5 py-1.5 transition-colors shadow-sm"
                      >
                        <Icon name="uil:search" class="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      @click="closeMobileSearch"
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
                        class="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] rounded-full hover:bg-gray-300 hover:text-black transition-colors"
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
                  <div v-if="searchHistory.length > 0">
                    <div class="flex items-center justify-between mb-2">
                      <h3 class="text-sm font-medium text-gray-500">搜索历史</h3>
                      <button
                        @click="clearSearchHistory"
                        class="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        清除历史
                      </button>
                    </div>
                    <div class="flex flex-wrap gap-2">
                                              <button
                          v-for="history in searchHistory"
                          :key="history"
                          @click="selectSuggestion(history)"
                          class="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] rounded-full hover:bg-gray-300 hover:text-black transition-colors"
                        >
                          {{ history }}
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>

          <!-- 移动端菜单 -->
          <Transition name="mobile-menu">
            <div v-if="isMobileMenuOpen" class="lg:hidden fixed inset-0 bg-black/50 z-[9999]" ref="mobileMenuRef">
              <div class="bg-white h-full w-full flex flex-col">
                <!-- 菜单头部 -->
                <div class="flex items-center justify-between p-4 border-b border-gray-200">
                  <div class="flex items-center gap-2">
                    <img src="/logo.svg" class="h-8" />
                    <span class="text-xl font-thin" style="font-family: logo!important;">衣设服装设计</span>
                  </div>
                  <button
                    @click="closeMobileMenu"
                    class="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <Icon name="uil:multiply" class="w-6 h-6" />
                  </button>
                </div>

                <!-- 菜单内容 -->
                <div class="flex-1 overflow-y-auto">
                  <!-- 主导航菜单 - 与PC端保持一致 -->
                  <div class="p-4">
                    <h3 class="text-sm font-medium text-gray-500 mb-3">导航菜单</h3>
                    <div class="space-y-1">
                      <NuxtLink
                        to="/"
                        @click="closeMobileMenu"
                        class="flex items-center px-3 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                        :class="[route.path === '/' ? 'bg-gray-200 text-black' : 'text-gray-700']"
                      >
                        <Icon name="uil:home" class="w-5 h-5 mr-3" />
                        <span>首页</span>
                      </NuxtLink>
                      <NuxtLink
                        to="/products"
                        @click="closeMobileMenu"
                        class="flex items-center px-3 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                        :class="[route.path === '/products' ? 'bg-gray-200 text-black' : 'text-gray-700']"
                      >
                        <Icon name="uil:shopping-bag" class="w-5 h-5 mr-3" />
                        <span>寻找商品</span>
                      </NuxtLink>
                      <NuxtLink
                        to="/custom-design"
                        @click="closeMobileMenu"
                        class="flex items-center px-3 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                        :class="[route.path === '/custom-design' ? 'bg-gray-200 text-black' : 'text-gray-700']"
                      >
                        <Icon name="uil:scissors" class="w-5 h-5 mr-3" />
                        <span>私人订制</span>
                      </NuxtLink>
                    </div>
                  </div>

                  <!-- 功能按钮 - 与PC端保持一致 -->
                  <div class="p-4 border-t border-gray-200">
                    <h3 class="text-sm font-medium text-gray-500 mb-3">功能服务</h3>
                    <div class="space-y-1">
                      <button class="w-full flex items-center px-3 py-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700">
                        <Icon name="uil:comment-dots" class="w-5 h-5 mr-3" />
                        <span>客服咨询</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </header>

      <!-- 全屏搜索蒙层 -->
      <Transition name="fullscreen-search" appear>
        <div 
          v-if="isFullscreenSearchOpen" 
          class="fixed inset-0 bg-black/20 backdrop-blur-md z-[99999] flex flex-col items-center justify-center p-6"
          @click="closeFullscreenSearch"
        >
          <div class="w-full max-w-4xl mx-auto" @click.stop>
            <!-- 搜索输入框 -->
            <div class="relative mb-8 max-w-2xl mx-auto">
              <input
                id="fullscreen-search-input"
                v-model="searchQuery"
                type="text"
                placeholder="搜索商品、品牌、分类..."
                class="input w-full h-10 px-4 text-lg border-2 border-transparent outline-none overflow-hidden bg-[#f3f3f3] rounded-[10px] hover:border-[#4a9dec] hover:shadow-[0px_0px_0px_7px_rgba(74,157,236,20%)] hover:bg-white focus:border-[#4a9dec] focus:shadow-[0px_0px_0px_7px_rgba(74,157,236,20%)] focus:bg-white"
                @keyup.enter="performSearch"
                @keyup.esc="closeFullscreenSearch"
              />
              <button
                @click="performSearch"
                class="absolute right-2 top-1/2 -translate-y-1/2 bg-[#4a9dec] hover:bg-[#3a8ddc] text-white rounded-lg px-3 py-1.5 transition-colors shadow-lg"
              >
                <Icon name="uil:search" class="w-4 h-4" />
              </button>
            </div>

            <!-- 推荐内容区域 -->
            <div class="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-2xl">
              <div class="grid grid-cols-3 gap-6">
                <!-- 第一列 -->
                <div class="space-y-4">
                  <!-- 搜索建议 -->
                  <div v-if="searchQuery">
                    <h3 class="text-sm font-semibold text-gray-700 mb-2">搜索建议</h3>
                    <div class="flex flex-wrap gap-2">
                      <button
                        v-for="suggestion in fullscreenSearchSuggestions.filter(s => s.includes(searchQuery)).slice(0, 4)"
                        :key="suggestion"
                        @click="selectFullscreenSuggestion(suggestion)"
                        class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors text-sm"
                      >
                        {{ suggestion }}
                      </button>
                    </div>
                  </div>

                  <!-- 热门搜索 -->
                  <div>
                    <h3 class="text-sm font-semibold text-gray-700 mb-2">热门搜索</h3>
                    <div class="space-y-2">
                      <button
                        v-for="hotSearch in fullscreenHotSearches.slice(0, 3)"
                        :key="hotSearch.text"
                        @click="selectFullscreenHotSearch(hotSearch)"
                        class="w-full flex items-center justify-between p-2 bg-gray-50 hover:bg-gray-100 rounded transition-colors"
                      >
                        <span class="text-gray-700 text-sm">{{ hotSearch.text }}</span>
                        <span class="text-xs text-gray-400">{{ hotSearch.count }}次</span>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- 第二列 -->
                <div class="space-y-4">
                  <!-- 商品分类 -->
                  <div>
                    <h3 class="text-sm font-semibold text-gray-700 mb-2">商品分类</h3>
                    <div class="space-y-3">
                      <div
                        v-for="category in fullscreenCategories.slice(0, 2)"
                        :key="category.name"
                        class="bg-gray-50 rounded p-3"
                      >
                        <h4 class="font-medium text-gray-700 mb-2 text-sm">{{ category.name }}</h4>
                        <div class="flex flex-wrap gap-1">
                          <button
                            v-for="item in category.items.slice(0, 3)"
                            :key="item"
                            @click="selectFullscreenCategory(category.name, item)"
                            class="px-2 py-1 text-xs bg-white hover:bg-gray-100 text-gray-600 rounded transition-colors"
                          >
                            {{ item }}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- 趋势推荐 -->
                  <div>
                    <h3 class="text-sm font-semibold text-gray-700 mb-2">趋势推荐</h3>
                    <div class="space-y-2">
                      <button
                        v-for="trending in fullscreenTrending.slice(0, 2)"
                        :key="trending.text"
                        @click="selectFullscreenTrending(trending)"
                        class="w-full flex items-center gap-2 p-2 bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 rounded transition-colors"
                      >
                        <Icon :name="trending.icon" class="w-3 h-3 text-orange-500" />
                        <span class="text-gray-700 text-sm">{{ trending.text }}</span>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- 第三列 -->
                <div class="space-y-4">
                  <!-- 品牌专区 -->
                  <div>
                    <h3 class="text-sm font-semibold text-gray-700 mb-2">品牌专区</h3>
                    <div class="flex flex-wrap gap-2">
                      <button
                        v-for="brand in fullscreenBrands.slice(0, 4)"
                        :key="brand"
                        @click="selectFullscreenBrand(brand)"
                        class="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full transition-colors text-sm"
                      >
                        {{ brand }}
                      </button>
                    </div>
                  </div>

                  <!-- 搜索历史 -->
                  <div v-if="searchHistory.length > 0">
                    <div class="flex items-center justify-between mb-2">
                      <h3 class="text-sm font-semibold text-gray-700">搜索历史</h3>
                      <button
                        @click="clearSearchHistory"
                        class="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        清除
                      </button>
                    </div>
                    <div class="flex flex-wrap gap-2">
                      <button
                        v-for="history in searchHistory.slice(0, 4)"
                        :key="history"
                        @click="selectFullscreenSuggestion(history)"
                        class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full text-sm transition-colors"
                      >
                        {{ history }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>

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
.animate-advert-vertical .advert-vertical-list {
  animation: advert-vertical 6s infinite;
}

/* 移动端菜单和搜索动画 */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.mobile-search-enter-active,
.mobile-search-leave-active {
  transition: all 0.3s ease;
}

.mobile-search-enter-from,
.mobile-search-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* 移动端按钮悬停效果 */
@media (hover: hover) {
  .mobile-button:hover {
    transform: scale(1.05);
  }
}

/* 移动端触摸反馈 */
  .mobile-button:active {
    transform: scale(0.95);
  }

/* 全屏搜索显示动画 */
.fullscreen-search-enter-active {
  transition: all 0.3s ease;
}

.fullscreen-search-enter-from {
  opacity: 0;
}

.fullscreen-search-enter-from .w-full {
  transform: scale(0.8) translateY(-30px);
}

.fullscreen-search-enter-to .w-full {
  transform: scale(1) translateY(0);
}

</style>