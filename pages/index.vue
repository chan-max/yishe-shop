<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-11-12 07:07:41
 * @FilePath: /yishe-nuxt/pages/index.vue
 * @Description: Luxury Brand Homepage - LV/Nike Style
-->
<script lang="ts" setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { api } from '~/utils/api'

const { awesome } = useAppConfig()
definePageMeta({ layout: 'page' })

// Page title and meta
useHead({
  titleTemplate: '',
  title: '衣设服装设计 - 创意印花图案与服装设计平台',
  meta: [
    {
      name: 'description',
      content: '衣设是一个专注于创意印花图案和服装设计的专业平台，汇聚全球设计师的创意灵感，提供服装设计作品展示、设计师交流、设计灵感获取等服务。'
    },
    {
      name: 'keywords',
      content: '服装设计,创意印花,图案设计,服装设计师平台,服装设计作品集,服装设计灵感,印花图案,时尚设计'
    }
  ]
})

// Navigation state
const isMenuOpen = ref(false)
const isScrolled = ref(false)

// Animation state
const visibleElements = ref<Set<string>>(new Set())

// Product categories
const categories = [
  { id: 'pattern', name: '印花图案', icon: 'mdi-palette', count: '15K+', color: '#FF6B6B' },
  { id: 'clothing', name: '服装设计', icon: 'mdi-tshirt-crew', count: '8K+', color: '#4ECDC4' },
  { id: 'brand', name: '品牌标识', icon: 'mdi-shape', count: '5K+', color: '#95E1D3' },
  { id: 'poster', name: '海报设计', icon: 'mdi-post', count: '12K+', color: '#F38181' },
  { id: 'packaging', name: '包装设计', icon: 'mdi-package-variant', count: '6K+', color: '#AA96DA' },
  { id: 'social', name: '社交媒体', icon: 'mdi-instagram', count: '10K+', color: '#FCBAD3' },
  { id: 'illustration', name: '插画设计', icon: 'mdi-brush', count: '9K+', color: '#FFD93D' },
  { id: 'typography', name: '字体设计', icon: 'mdi-format-font', count: '7K+', color: '#6BCB77' },
  { id: 'logo', name: 'Logo设计', icon: 'mdi-star', count: '11K+', color: '#FF9F43' },
  { id: 'web', name: '网页设计', icon: 'mdi-monitor', count: '13K+', color: '#5F7A61' }
]

// Horizontal categories for scroll
const horizontalCategories = [
  { id: 'all', name: '全部', active: true },
  { id: 'pattern', name: '印花图案' },
  { id: 'clothing', name: '服装设计' },
  { id: 'brand', name: '品牌标识' },
  { id: 'poster', name: '海报设计' },
  { id: 'packaging', name: '包装设计' },
  { id: 'illustration', name: '插画设计' },
  { id: 'typography', name: '字体设计' },
  { id: 'logo', name: 'Logo设计' },
  { id: 'web', name: '网页设计' },
  { id: 'social', name: '社交媒体' },
  { id: 'print', name: '印刷设计' }
]

// Featured designers
const featuredDesigners = [
  { id: 1, name: '张设计师', avatar: 'https://picsum.photos/80/80?random=1', works: 124, followers: '2.5K' },
  { id: 2, name: '李创意', avatar: 'https://picsum.photos/80/80?random=2', works: 98, followers: '1.8K' },
  { id: 3, name: '王艺术', avatar: 'https://picsum.photos/80/80?random=3', works: 156, followers: '3.2K' },
  { id: 4, name: '陈设计', avatar: 'https://picsum.photos/80/80?random=4', works: 87, followers: '1.5K' },
  { id: 5, name: '刘时尚', avatar: 'https://picsum.photos/80/80?random=5', works: 203, followers: '4.1K' },
  { id: 6, name: '周视觉', avatar: 'https://picsum.photos/80/80?random=6', works: 145, followers: '2.8K' }
]

// Popular tags
const popularTags = [
  { name: '极简主义', count: 1250 },
  { name: '复古风格', count: 980 },
  { name: '现代设计', count: 2100 },
  { name: '手绘风格', count: 750 },
  { name: '几何图形', count: 890 },
  { name: '渐变色彩', count: 1100 },
  { name: '黑白设计', count: 680 },
  { name: '3D效果', count: 540 }
]

// Featured products - 从API获取
const featuredProducts = ref<Array<{
  id: string
  title: string
  description?: string
  category: string
  image: string
  imageUrl?: string
}>>([])

// Hover state for product cards
const hoveredProductId = ref<string | null>(null)

// Stats
const stats = [
  { number: '15K+', label: '设计作品' },
  { number: '8K+', label: '活跃设计师' },
  { number: '70+', label: '国家地区' },
  { number: '3M+', label: '月度浏览量' }
]

// Intersection Observer for animations
let observer: IntersectionObserver | null = null

// 获取精选商品
const fetchFeaturedProducts = async () => {
  try {
    const response = await api.productList.getPage({
      page: 1,
      pageSize: 6,
      isPublish: true,
      includeRelations: false, // 不包含关联信息
    })
    
    if (response.code === 0 || response.status === true || response.code === 200) {
      const products = response.data?.list || []
      featuredProducts.value = products.map((product: any) => {
        // 获取第一张图片作为展示图片
        const firstImage = Array.isArray(product.images) && product.images.length > 0 
          ? product.images[0] 
          : null
        
        return {
          id: product.id,
          title: product.name || '商品',
          description: product.description || '',
          category: product.type || 'pattern',
          image: 'grad1', // 保留原有的占位符逻辑
          imageUrl: firstImage, // 添加实际图片URL
        }
      })
    }
  } catch (error) {
    console.error('获取精选商品失败:', error)
    // 失败时使用默认数据
    featuredProducts.value = [
      { id: '1', title: '春季印花系列', category: 'pattern', image: 'grad1' },
      { id: '2', title: '现代服装设计', category: 'clothing', image: 'grad2' },
      { id: '3', title: '品牌视觉识别', category: 'brand', image: 'grad3' },
      { id: '4', title: '创意海报设计', category: 'poster', image: 'grad4' },
      { id: '5', title: '产品包装设计', category: 'packaging', image: 'grad5' },
      { id: '6', title: '社交媒体图形', category: 'social', image: 'grad6' }
    ]
  }
}

onMounted(() => {
  // 获取精选商品
  fetchFeaturedProducts()
  
  // Handle scroll
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 50
  }
  window.addEventListener('scroll', handleScroll)

  // Setup Intersection Observer
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-animate-id')
          if (id) {
            visibleElements.value.add(id)
          }
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  )

  // Observe all elements with data-animate-id after DOM is ready
  nextTick(() => {
    document.querySelectorAll('[data-animate-id]').forEach((el) => {
      observer?.observe(el)
    })
  })

  return () => {
    window.removeEventListener('scroll', handleScroll)
    observer?.disconnect()
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})

// Navigation functions
const goToSearch = () => {
  navigateTo('/search')
}

const goToExplore = () => {
  navigateTo('/search?category=clothing')
}

const goToCategory = (categoryId: string) => {
  navigateTo(`/search?category=${categoryId}`)
}

const goToProductDetail = (productId: string) => {
  navigateTo(`/product/${productId}`)
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// 处理图片加载错误
const handleImageError = (event: Event, product: any) => {
  const img = event.target as HTMLImageElement
  // 如果实际图片加载失败，回退到占位符
  if (product.imageUrl) {
    img.src = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><linearGradient id='${product.image}' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23ffffff'/><stop offset='100%' stop-color='%23f0f0f0'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23${product.image})'/></svg>`
  }
}

// Check if element is visible
const isVisible = (id: string) => {
  return visibleElements.value.has(id)
}
</script>

<template>
  <div class="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden w-full max-w-full">
    <!-- Hero Section - Full Screen -->
    <section class="relative w-full max-w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden box-border mt-8 md:mt-8">
      <div class="absolute inset-0 w-full h-full " style="background:#f6f6f6;"></div>
      <div class="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-4xl mx-auto w-full box-border">
        <div class="mb-12">
          <h1 class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light tracking-wider mb-6 uppercase text-black">衣设</h1>
          <p class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light tracking-widest mb-4 uppercase text-black">创意印花图案设计平台</p>
          <p class="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">探索无限创意，定义时尚未来</p>
        </div>
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button class="px-8 sm:px-10 py-4 bg-white text-black uppercase text-xs sm:text-sm tracking-wider border border-black min-w-[160px] sm:min-w-[180px] w-full sm:w-auto hover:bg-black hover:text-white transition-colors" @click="goToExplore">探索设计</button>
          <button class="px-8 sm:px-10 py-4 bg-transparent text-black uppercase text-xs sm:text-sm tracking-wider border border-black min-w-[160px] sm:min-w-[180px] w-full sm:w-auto hover:bg-black hover:text-white transition-colors" @click="goToSearch">开始创作</button>
        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="py-32 px-4 sm:px-6 md:px-8 bg-white max-w-[1920px] mx-auto w-full">
      <div class="text-center mb-16" data-animate-id="products-header">
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-light tracking-wider mb-4 uppercase text-gray-900" :class="{ 'animate-in': isVisible('products-header') }">精选商品</h2>
        <p class="text-base md:text-lg font-light text-gray-500 tracking-wider" :class="{ 'animate-in': isVisible('products-header') }">发现最受欢迎的设计作品</p>
      </div>
        
      <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 mb-16">
        <div 
          v-for="(product, index) in featuredProducts" 
          :key="product.id"
          class="group overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-500 cursor-pointer bg-white"
          :data-animate-id="`product-${product.id}`"
          :class="{ 'animate-in': isVisible(`product-${product.id}`) }"
          :style="{ '--delay': `${index * 0.1}s` }"
          @mouseenter="hoveredProductId = product.id"
          @mouseleave="hoveredProductId = null"
        >
          <div class="relative w-full aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
            <!-- 如果有实际图片URL，优先使用；否则使用占位符 -->
            <img 
              v-if="product.imageUrl" 
              :src="product.imageUrl" 
              :alt="product.title"
              class="w-full h-full object-cover transition-all duration-700 ease-out"
              :class="{ 'scale-110 brightness-110': hoveredProductId === product.id }"
              @error="handleImageError($event, product)"
            />
            <img 
              v-else
              :src="`data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><linearGradient id='${product.image}' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23ffffff'/><stop offset='100%' stop-color='%23f0f0f0'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23${product.image})'/></svg>`" 
              :alt="product.title"
              class="w-full h-full object-cover transition-all duration-700 ease-out"
              :class="{ 'scale-110 brightness-110': hoveredProductId === product.id }"
            />
            <!-- Hover 遮罩层 -->
            <div 
              class="absolute inset-0 bg-gradient-to-b from-black/95 via-black/85 to-black/95 flex items-center justify-center transition-all duration-500 z-10 backdrop-blur-[1px]"
              :class="hoveredProductId === product.id ? 'opacity-100' : 'opacity-0 pointer-events-none'"
            >
              <div class="px-4 sm:px-8 text-center text-white max-w-[90%] transform transition-all duration-300"
                   :class="hoveredProductId === product.id ? 'scale-100' : 'scale-95'">
                <h3 class="text-lg sm:text-xl md:text-lg font-light tracking-wide uppercase mb-2 sm:mb-4 leading-snug truncate whitespace-nowrap overflow-hidden text-ellipsis text-center transform transition-transform duration-300"
                    :class="hoveredProductId === product.id ? 'scale-100' : 'scale-95'"
                    :title="product.title">{{ product.title }}</h3>
                <p v-if="product.description" class="text-xs sm:text-sm md:text-xs font-light text-white/90 leading-relaxed mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3 md:line-clamp-2 transform transition-transform duration-300 delay-75"
                   :class="hoveredProductId === product.id ? 'opacity-100' : 'opacity-0'">{{ product.description }}</p>
                <button 
                  class="px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-sm text-white text-xs font-semibold tracking-wide uppercase border border-white/40 rounded-sm transition-all duration-300 transform hover:bg-white/20 hover:border-white/80 hover:scale-105 active:scale-100"
                  :class="hoveredProductId === product.id ? 'opacity-100 delay-150' : 'opacity-0'"
                  @click.stop="goToProductDetail(product.id)">
                  查看详情
                </button>
              </div>
            </div>
          </div>
          <div class="pt-4 sm:pt-5 px-1">
            <h3 class="text-sm sm:text-base md:text-lg font-light tracking-wide uppercase text-gray-900 mb-2 sm:mb-3 truncate text-center leading-tight transition-colors duration-300 group-hover:text-black" :title="product.title">{{ product.title }}</h3>
            <p v-if="product.description" class="text-xs sm:text-sm font-light text-gray-500 leading-relaxed line-clamp-2 mb-3 transition-colors duration-300 group-hover:text-gray-600" :title="product.description">{{ product.description }}</p>
          </div>
        </div>
      </div>
      
      <div class="text-center mt-16" data-animate-id="products-footer">
        <NuxtLink 
          to="/products" 
          class="inline-flex items-center gap-4 px-0 py-3 text-sm font-light tracking-[0.2em] uppercase text-gray-600 hover:text-black transition-all duration-300 group relative"
          :class="{ 'animate-in': isVisible('products-footer') }"
        >
          <span class="relative">
            查看更多商品
            <span class="absolute bottom-0 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full"></span>
          </span>
          <v-icon size="18" class="transition-transform duration-300 group-hover:translate-x-1">mdi-arrow-right</v-icon>
        </NuxtLink>
      </div>
    </section>

    <!-- Featured Collections Section -->
    <section class="py-32 px-4 sm:px-6 md:px-8 max-w-[1920px] mx-auto w-full">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-light tracking-wider mb-4 uppercase text-gray-900">精选系列</h2>
        <p class="text-base md:text-lg font-light text-gray-500 tracking-wider">发现全球设计师的创意杰作</p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Large Featured Item -->
        <div class="lg:row-span-2 relative overflow-hidden bg-gray-100 w-full">
          <div class="w-full h-full">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'><defs><linearGradient id='grad1' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23f5f5f5'/><stop offset='100%' stop-color='%23e0e0e0'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23grad1)'/></svg>" alt="Collection" class="w-full h-full object-cover" />
          </div>
          <div class="absolute bottom-0 left-0 right-0 p-8 bg-white">
            <h3 class="text-2xl md:text-xl font-light tracking-wide uppercase mb-3">2024春季系列</h3>
            <p class="text-base md:text-sm font-light text-gray-500 leading-relaxed mb-6">融合现代艺术与传统文化，展现独特的视觉语言</p>
            <NuxtLink to="/search?category=spring" class="inline-flex items-center gap-3 text-sm font-light tracking-[0.15em] uppercase text-gray-600 hover:text-black transition-all duration-300 group">
              <span class="relative">
                查看系列
                <span class="absolute bottom-0 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full"></span>
              </span>
              <v-icon size="16" class="transition-transform duration-300 group-hover:translate-x-1">mdi-arrow-right</v-icon>
            </NuxtLink>
          </div>
        </div>

        <!-- Medium Items -->
        <div class="relative overflow-hidden bg-gray-100 w-full">
          <div class="w-full h-96 lg:h-[400px] xl:h-[350px]">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><linearGradient id='grad2' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23ffffff'/><stop offset='100%' stop-color='%23f0f0f0'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23grad2)'/></svg>" alt="Collection" class="w-full h-full object-cover" />
          </div>
          <div class="p-6 md:p-8 bg-white">
            <h3 class="text-xl md:text-lg font-light tracking-wide uppercase mb-3">印花图案库</h3>
            <p class="text-sm md:text-xs font-light text-gray-500 leading-relaxed mb-6">数千种高质量创意图案</p>
            <NuxtLink to="/search?category=pattern" class="inline-flex items-center gap-3 text-sm font-light tracking-[0.15em] uppercase text-gray-600 hover:text-black transition-all duration-300 group">
              <span class="relative">
                浏览图案
                <span class="absolute bottom-0 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full"></span>
              </span>
              <v-icon size="16" class="transition-transform duration-300 group-hover:translate-x-1">mdi-arrow-right</v-icon>
            </NuxtLink>
          </div>
        </div>

        <div class="relative overflow-hidden bg-gray-100 w-full">
          <div class="w-full h-96 lg:h-[400px] xl:h-[350px]">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><linearGradient id='grad3' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23fafafa'/><stop offset='100%' stop-color='%23e8e8e8'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23grad3)'/></svg>" alt="Collection" class="w-full h-full object-cover" />
          </div>
          <div class="p-6 md:p-8 bg-white">
            <h3 class="text-xl md:text-lg font-light tracking-wide uppercase mb-3">设计师作品</h3>
            <p class="text-sm md:text-xs font-light text-gray-500 leading-relaxed mb-6">来自全球顶尖设计师</p>
            <NuxtLink to="/search?category=designer" class="inline-flex items-center gap-3 text-sm font-light tracking-[0.15em] uppercase text-gray-600 hover:text-black transition-all duration-300 group">
              <span class="relative">
                查看作品
                <span class="absolute bottom-0 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full"></span>
              </span>
              <v-icon size="16" class="transition-transform duration-300 group-hover:translate-x-1">mdi-arrow-right</v-icon>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Product Showcase Section -->
    <section class="py-32 bg-white w-full max-w-full box-border overflow-x-hidden">
      <div class="max-w-[1920px] mx-auto px-8 w-full max-w-full box-border">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32 w-full max-w-full">
          <div class="w-full h-[600px] md:h-[400px] overflow-hidden bg-gray-100 max-w-full">
            <img class="w-full h-full object-cover max-w-full" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1200'><defs><linearGradient id='show1' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23ffffff'/><stop offset='50%' stop-color='%23f5f5f5'/><stop offset='100%' stop-color='%23e8e8e8'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23show1)'/></svg>" alt="Product" />
          </div>
          <div class="p-8">
            <span class="inline-block text-xs font-normal tracking-widest uppercase text-gray-500 mb-4">新品</span>
            <h2 class="text-4xl md:text-5xl font-light tracking-wider mb-6 uppercase leading-tight">创意印花设计</h2>
            <p class="text-base md:text-lg font-light text-gray-600 leading-relaxed mb-8">探索我们的最新系列，每一件作品都经过精心设计，融合了艺术与时尚的完美平衡。</p>
            <button class="px-10 py-4 bg-black text-white uppercase text-sm tracking-wider border border-black min-w-[180px]" @click="goToExplore">立即探索</button>
          </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full max-w-full lg:flex-row-reverse">
          <div class="w-full h-[600px] md:h-[400px] overflow-hidden bg-gray-100 max-w-full lg:order-2">
            <img class="w-full h-full object-cover max-w-full" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1200'><defs><linearGradient id='show2' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23f8f8f8'/><stop offset='50%' stop-color='%23f0f0f0'/><stop offset='100%' stop-color='%23e5e5e5'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23show2)'/></svg>" alt="Product" />
          </div>
          <div class="p-8 lg:order-1">
            <span class="inline-block text-xs font-normal tracking-widest uppercase text-gray-500 mb-4">精选</span>
            <h2 class="text-4xl md:text-5xl font-light tracking-wider mb-6 uppercase leading-tight">服装设计服务</h2>
            <p class="text-base md:text-lg font-light text-gray-600 leading-relaxed mb-8">专业的服装设计服务，从概念到成品，为您打造独特的时尚风格。</p>
            <button class="px-10 py-4 bg-black text-white uppercase text-sm tracking-wider border border-black min-w-[180px]" @click="goToSearch">了解更多</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Horizontal Categories Filter -->
    <section class="py-16 bg-white overflow-x-auto">
      <div class="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8" data-animate-id="horizontal-categories">
        <div class="flex gap-4 overflow-x-auto scrollbar-hide" :class="{ 'animate-in': isVisible('horizontal-categories') }">
          <button 
            v-for="(category, index) in horizontalCategories" 
            :key="category.id"
            class="px-6 py-3 whitespace-nowrap text-sm font-normal tracking-wide uppercase border border-gray-300 bg-white text-gray-700 hover:bg-black hover:text-white hover:border-black transition-all flex-shrink-0"
            :class="{ 'bg-black text-white border-black': category.active }"
            :style="{ '--delay': `${index * 0.05}s` }"
            @click="goToCategory(category.id)"
          >
            {{ category.name }}
          </button>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-32 px-4 sm:px-6 md:px-8 max-w-[1920px] mx-auto w-full bg-white">
      <div class="text-center mb-16" data-animate-id="categories-header">
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-light tracking-wider mb-4 uppercase text-gray-900" :class="{ 'animate-in': isVisible('categories-header') }">商品分类</h2>
        <p class="text-base md:text-lg font-light text-gray-500 tracking-wider" :class="{ 'animate-in': isVisible('categories-header') }">探索我们的完整设计分类</p>
      </div>
      
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-16">
        <div 
          v-for="(category, index) in categories" 
          :key="category.id"
          class="group cursor-pointer transition-all duration-300 text-center"
          :data-animate-id="`category-${category.id}`"
          :class="{ 'animate-in': isVisible(`category-${category.id}`) }"
          :style="{ '--delay': `${index * 0.1}s` }"
          @click="goToCategory(category.id)"
        >
          <div class="w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110" :style="{ 'background': `linear-gradient(135deg, ${category.color}15, ${category.color}05)` }">
            <v-icon :name="category.icon" class="text-2xl transition-transform duration-300 group-hover:scale-110" :style="{ 'color': category.color }" />
          </div>
          <h3 class="text-base font-light tracking-wide mb-2 text-gray-900 transition-colors duration-300 group-hover:text-black">{{ category.name }}</h3>
          <p class="text-xs text-gray-400 tracking-wider uppercase">{{ category.count }} 作品</p>
        </div>
      </div>
      
      <div class="text-center mt-12" data-animate-id="categories-footer">
        <NuxtLink 
          to="/search" 
          class="inline-flex items-center gap-4 px-0 py-3 text-sm font-light tracking-[0.2em] uppercase text-gray-600 hover:text-black transition-all duration-300 group" 
          :class="{ 'animate-in': isVisible('categories-footer') }"
        >
          <span class="relative">
            查看全部分类
            <span class="absolute bottom-0 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full"></span>
          </span>
          <v-icon size="18" class="transition-transform duration-300 group-hover:translate-x-1">mdi-arrow-right</v-icon>
        </NuxtLink>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-24 bg-gray-50">
      <div class="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div 
            v-for="(stat, index) in stats" 
            :key="index"
            class="text-center"
            :data-animate-id="`stat-${index}`"
            :class="{ 'animate-in': isVisible(`stat-${index}`) }"
            :style="{ '--delay': `${index * 0.15}s` }"
          >
            <h3 class="text-4xl md:text-5xl lg:text-6xl font-light tracking-wider mb-4 text-gray-900">{{ stat.number }}</h3>
            <p class="text-sm md:text-base font-light text-gray-500 tracking-wide uppercase">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Grid Section -->
    <section class="py-32 px-8 max-w-[1920px] mx-auto w-full max-w-full box-border">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-light tracking-wider mb-4 uppercase text-black">设计画廊</h2>
        <p class="text-base md:text-lg font-light text-gray-500 tracking-wider">发现灵感，激发创意</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full box-border">
        <div 
          v-for="i in 6" 
          :key="i"
          class="relative overflow-hidden aspect-[3/4] bg-gray-100 cursor-pointer rounded-xl w-full max-w-full group"
        >
          <div class="w-full h-full max-w-full overflow-hidden">
            <img class="w-full h-full object-cover max-w-full" :src="`data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 800'><defs><linearGradient id='gal${i}' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23ffffff'/><stop offset='100%' stop-color='%23f0f0f0'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23gal${i})'/></svg>`" :alt="`Gallery ${i}`" />
          </div>
          <div class="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 md:opacity-100">
            <h3 class="text-xl font-light tracking-wider mb-2 uppercase">设计作品 {{ i }}</h3>
            <p class="text-sm font-light opacity-90">创意设计师作品</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Designers Section -->
    <section class="py-32 px-8 max-w-[1920px] mx-auto bg-white w-full max-w-full box-border">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-light tracking-wider mb-4 uppercase text-black">推荐设计师</h2>
        <p class="text-base md:text-lg font-light text-gray-500 tracking-wider">发现顶尖创意人才</p>
      </div>
      
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 w-full box-border">
        <div 
          v-for="designer in featuredDesigners" 
          :key="designer.id"
          class="bg-gray-100 rounded-xl p-8 text-center cursor-pointer border border-transparent w-full max-w-full hover:border-gray-300 hover:bg-white"
        >
          <div class="relative w-20 h-20 mx-auto mb-6">
            <img class="w-full h-full rounded-full object-cover border-[3px] border-white" :src="designer.avatar" :alt="designer.name" />
            <div class="absolute bottom-0 right-0 w-7 h-7 bg-black rounded-full flex items-center justify-center border-[3px] border-white">
              <v-icon name="mdi-check-circle" class="w-4 h-4 text-white" />
            </div>
          </div>
          <div>
            <h3 class="text-lg font-medium tracking-wide mb-4 text-black">{{ designer.name }}</h3>
            <div class="flex flex-col gap-2 mb-6 text-sm text-gray-500">
              <span class="flex items-center justify-center gap-2">
                <v-icon name="mdi-image-multiple" size="16" />
                {{ designer.works }} 作品
              </span>
              <span class="flex items-center justify-center gap-2">
                <v-icon name="mdi-account-group" size="16" />
                {{ designer.followers }} 关注
              </span>
            </div>
            <button class="w-full px-3 py-3 bg-transparent border border-black rounded-lg text-black text-sm font-normal tracking-wide cursor-pointer uppercase hover:bg-black hover:text-white">关注</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Tags Section -->
    <section class="py-32 px-8 max-w-[1920px] mx-auto bg-gray-100 w-full max-w-full box-border">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-light tracking-wider mb-4 uppercase text-black">热门标签</h2>
        <p class="text-base md:text-lg font-light text-gray-500 tracking-wider">探索流行设计趋势</p>
      </div>
      
      <div class="flex flex-wrap gap-4 justify-center max-w-[1200px] mx-auto">
        <button 
          v-for="tag in popularTags" 
          :key="tag.name"
          class="px-6 py-4 bg-white border border-gray-200 rounded-full flex items-center gap-3 cursor-pointer hover:border-black"
          @click="goToSearch"
        >
          <span class="text-sm font-normal tracking-wide text-black">{{ tag.name }}</span>
          <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full min-w-[40px] text-center">{{ tag.count }}</span>
        </button>
      </div>
    </section>

    <!-- About Section -->
    <section class="py-32 px-8 bg-gray-100 w-full max-w-full box-border">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-[1920px] mx-auto items-center w-full box-border">
        <div class="p-8">
          <span class="inline-block text-xs font-normal tracking-widest uppercase text-gray-500 mb-4">关于我们</span>
          <h2 class="text-4xl md:text-5xl font-light tracking-wider mb-8 uppercase leading-tight">衣设服装设计平台</h2>
          <p class="text-base font-light text-gray-600 leading-relaxed mb-6">
            衣设是一个专注于创意印花图案和服装设计的专业平台。我们汇聚了来自全球的设计师和创意人才，
            为时尚行业提供高质量的设计资源和灵感。无论是寻找灵感、展示作品，还是寻找合作伙伴，
            衣设都是您的理想之选。
          </p>
          <p class="text-base font-light text-gray-600 leading-relaxed mb-8">
            我们的使命是连接全球的设计师和创意爱好者，让优秀的创意设计能够被更多人发现和欣赏。
            我们提供免费的设计服务，包括印花图案、服装设计、品牌标识、海报设计等多种类型的设计服务。
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div class="flex items-center gap-3 text-base text-black">
              <v-icon name="mdi-check-circle" size="24" />
              <span>免费设计资源</span>
            </div>
            <div class="flex items-center gap-3 text-base text-black">
              <v-icon name="mdi-check-circle" size="24" />
              <span>全球设计师社区</span>
            </div>
            <div class="flex items-center gap-3 text-base text-black">
              <v-icon name="mdi-check-circle" size="24" />
              <span>高质量设计作品</span>
            </div>
            <div class="flex items-center gap-3 text-base text-black">
              <v-icon name="mdi-check-circle" size="24" />
              <span>专业设计服务</span>
            </div>
          </div>
        </div>
        <div class="w-full h-[600px] md:h-[400px] overflow-hidden bg-white max-w-full">
          <img class="w-full h-full object-cover max-w-full" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 1000'><defs><linearGradient id='about1' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23f5f5f5'/><stop offset='100%' stop-color='%23e0e0e0'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23about1)'/></svg>" alt="About" />
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative py-32 px-8 text-center bg-gray-100 overflow-hidden w-full max-w-full box-border">
      <div class="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 opacity-50"></div>
      <div class="relative z-10 max-w-[800px] mx-auto w-full box-border px-4">
        <h2 class="text-5xl md:text-6xl lg:text-7xl font-light tracking-wider mb-6 uppercase">加入创意社区</h2>
        <p class="text-lg md:text-xl font-light text-gray-600 leading-relaxed mb-10">与全球设计师一起，分享您的创意，发现无限可能</p>
        <div class="flex flex-col sm:flex-row gap-6 justify-center flex-wrap">
          <button class="px-10 py-4 bg-black text-white uppercase text-sm tracking-wider border border-black min-w-[180px]" @click="goToSearch">开始创作</button>
          <button class="px-10 py-4 bg-transparent text-black uppercase text-sm tracking-wider border border-black min-w-[180px]" @click="goToExplore">探索作品</button>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
// 只保留必要的动画样式
.animate-in {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 隐藏滚动条的工具类
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
