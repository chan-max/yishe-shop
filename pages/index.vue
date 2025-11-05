<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-09-26 07:03:52
 * @FilePath: /yishe-nuxt/pages/index.vue
 * @Description: Luxury Brand Homepage - LV/Nike Style
-->
<script lang="ts" setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

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

// Featured products
const featuredProducts = [
  { id: 1, title: '春季印花系列', category: 'pattern', image: 'grad1' },
  { id: 2, title: '现代服装设计', category: 'clothing', image: 'grad2' },
  { id: 3, title: '品牌视觉识别', category: 'brand', image: 'grad3' },
  { id: 4, title: '创意海报设计', category: 'poster', image: 'grad4' },
  { id: 5, title: '产品包装设计', category: 'packaging', image: 'grad5' },
  { id: 6, title: '社交媒体图形', category: 'social', image: 'grad6' }
]

// Stats
const stats = [
  { number: '15K+', label: '设计作品' },
  { number: '8K+', label: '活跃设计师' },
  { number: '70+', label: '国家地区' },
  { number: '3M+', label: '月度浏览量' }
]

// Intersection Observer for animations
let observer: IntersectionObserver | null = null

onMounted(() => {
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

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// Check if element is visible
const isVisible = (id: string) => {
  return visibleElements.value.has(id)
}
</script>

<template>
  <div class="luxury-homepage">
    <!-- Hero Section - Full Screen -->
    <section class="hero-section">
      <div class="hero-background">
        <div class="hero-overlay"></div>
        </div>
        <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">衣设</h1>
          <p class="hero-subtitle">创意印花图案设计平台</p>
          <p class="hero-description">探索无限创意，定义时尚未来</p>
          </div>
          <div class="hero-actions">
          <button class="luxury-btn primary" @click="goToExplore">探索设计</button>
          <button class="luxury-btn secondary" @click="goToSearch">开始创作</button>
        </div>
        </div>
    </section>

    <!-- Featured Collections Section -->
    <section class="collections-section">
      <div class="section-header">
        <h2 class="section-title">精选系列</h2>
        <p class="section-subtitle">发现全球设计师的创意杰作</p>
              </div>
      
      <div class="collections-grid">
        <!-- Large Featured Item -->
        <div class="collection-item large">
          <div class="collection-image">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'><defs><linearGradient id='grad1' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23f5f5f5'/><stop offset='100%' stop-color='%23e0e0e0'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23grad1)'/></svg>" alt="Collection" />
            </div>
          <div class="collection-content">
            <h3 class="collection-title">2024春季系列</h3>
            <p class="collection-description">融合现代艺术与传统文化，展现独特的视觉语言</p>
            <NuxtLink to="/search?category=spring" class="collection-link">
              查看系列
              <v-icon size="16">mdi-arrow-right</v-icon>
            </NuxtLink>
          </div>
        </div>

        <!-- Medium Items -->
        <div class="collection-item medium">
          <div class="collection-image">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><linearGradient id='grad2' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23ffffff'/><stop offset='100%' stop-color='%23f0f0f0'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23grad2)'/></svg>" alt="Collection" />
      </div>
          <div class="collection-content">
            <h3 class="collection-title">印花图案库</h3>
            <p class="collection-description">数千种高质量创意图案</p>
            <NuxtLink to="/search?category=pattern" class="collection-link">
              浏览图案
              <v-icon size="16">mdi-arrow-right</v-icon>
            </NuxtLink>
    </div>
          </div>

        <div class="collection-item medium">
          <div class="collection-image">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><linearGradient id='grad3' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23fafafa'/><stop offset='100%' stop-color='%23e8e8e8'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23grad3)'/></svg>" alt="Collection" />
                </div>
          <div class="collection-content">
            <h3 class="collection-title">设计师作品</h3>
            <p class="collection-description">来自全球顶尖设计师</p>
            <NuxtLink to="/search?category=designer" class="collection-link">
              查看作品
              <v-icon size="16">mdi-arrow-right</v-icon>
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
    <section class="horizontal-categories-section">
      <div class="horizontal-categories-container" data-animate-id="horizontal-categories">
        <div class="categories-scroll" :class="{ 'animate-in': isVisible('horizontal-categories') }">
          <button 
            v-for="(category, index) in horizontalCategories" 
            :key="category.id"
            class="category-tab"
            :class="{ 'active': category.active }"
            :style="{ '--delay': `${index * 0.05}s` }"
            @click="goToCategory(category.id)"
          >
            {{ category.name }}
          </button>
            </div>
          </div>
    </section>

    <!-- Categories Section -->
    <section class="categories-section">
      <div class="section-header" data-animate-id="categories-header">
        <h2 class="section-title" :class="{ 'animate-in': isVisible('categories-header') }">商品分类</h2>
        <p class="section-subtitle" :class="{ 'animate-in': isVisible('categories-header') }">探索我们的完整设计分类</p>
            </div>
      
      <div class="categories-grid">
        <div 
          v-for="(category, index) in categories" 
          :key="category.id"
          class="category-item"
          :data-animate-id="`category-${category.id}`"
          :class="{ 'animate-in': isVisible(`category-${category.id}`) }"
          :style="{ '--delay': `${index * 0.1}s`, '--category-color': category.color }"
          @click="goToCategory(category.id)"
        >
          <div class="category-icon" :style="{ 'background': `linear-gradient(135deg, ${category.color}15, ${category.color}05)` }">
            <v-icon :name="category.icon" />
          </div>
          <h3 class="category-name">{{ category.name }}</h3>
          <p class="category-count">{{ category.count }} 作品</p>
            </div>
          </div>
      
      <div class="section-footer" data-animate-id="categories-footer">
        <NuxtLink to="/search" class="view-all-link" :class="{ 'animate-in': isVisible('categories-footer') }">
          查看全部分类
          <v-icon size="20">mdi-arrow-right</v-icon>
        </NuxtLink>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="stats-container">
        <div 
          v-for="(stat, index) in stats" 
          :key="index"
          class="stat-item"
          :data-animate-id="`stat-${index}`"
          :class="{ 'animate-in': isVisible(`stat-${index}`) }"
          :style="{ '--delay': `${index * 0.15}s` }"
        >
          <h3 class="stat-number">{{ stat.number }}</h3>
          <p class="stat-label">{{ stat.label }}</p>
        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="products-section">
      <div class="section-header" data-animate-id="products-header">
        <h2 class="section-title" :class="{ 'animate-in': isVisible('products-header') }">精选商品</h2>
        <p class="section-subtitle" :class="{ 'animate-in': isVisible('products-header') }">发现最受欢迎的设计作品</p>
        </div>
        
      <div class="products-grid">
        <div 
          v-for="(product, index) in featuredProducts" 
          :key="product.id"
          class="product-item"
          :data-animate-id="`product-${product.id}`"
          :class="{ 'animate-in': isVisible(`product-${product.id}`) }"
          :style="{ '--delay': `${index * 0.1}s` }"
        >
          <div class="product-image">
            <img :src="`data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><linearGradient id='${product.image}' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23ffffff'/><stop offset='100%' stop-color='%23f0f0f0'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23${product.image})'/></svg>`" :alt="product.title" />
            <div class="product-overlay">
              <button class="product-btn" @click="goToCategory(product.category)">
                查看详情
              </button>
            </div>
          </div>
          <div class="product-info">
            <span class="product-category">{{ categories.find(c => c.id === product.category)?.name }}</span>
            <h3 class="product-title">{{ product.title }}</h3>
        </div>
      </div>
        </div>
      
      <div class="section-footer" data-animate-id="products-footer">
        <NuxtLink to="/search" class="view-all-link" :class="{ 'animate-in': isVisible('products-footer') }">
          查看更多商品
          <v-icon size="20">mdi-arrow-right</v-icon>
        </NuxtLink>
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
// Luxury Brand Color Palette
:root {
  --luxury-black: #000000;
  --luxury-white: #ffffff;
  --luxury-gray: #f5f5f5;
  --luxury-gray-dark: #666666;
  --luxury-text: #1a1a1a;
  --luxury-text-light: #888888;
  --luxury-border: #e5e5e5;
}

// Base styles
.luxury-homepage {
  min-height: 100vh;
  background: var(--luxury-white);
  color: var(--luxury-text);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
  position: relative;
  
  * {
    box-sizing: border-box;
  }
  
  section {
  width: 100%;
    max-width: 100%;
    overflow-x: hidden;
    position: relative;
  }
  
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
  
  // Prevent horizontal overflow
  [class*="grid"],
  [class*="container"] {
    max-width: 100%;
    overflow-x: hidden;
  }
}

// Hero Section - Full Screen
.hero-section {
  position: relative;
  width: 100%;
  max-width: 100vw;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
  background-size: cover;
  background-position: center;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.02);
  }
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 900px;
  padding: 0 2rem;
}

.hero-text {
  margin-bottom: 3rem;
}

.hero-title {
  font-size: 6rem;
  font-weight: 300;
  letter-spacing: 8px;
  margin-bottom: 1rem;
  color: var(--luxury-text);
  text-transform: uppercase;
  
  @media (max-width: 768px) {
    font-size: 3rem;
    letter-spacing: 4px;
  }
  
  @media (max-width: 480px) {
    font-size: 2.5rem;
    letter-spacing: 2px;
  }
}

.hero-subtitle {
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: 4px;
  margin-bottom: 1rem;
  color: var(--luxury-text-light);
  text-transform: uppercase;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    letter-spacing: 2px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    letter-spacing: 1px;
  }
}

.hero-description {
  font-size: 1.1rem;
  font-weight: 300;
  color: var(--luxury-text-light);
  line-height: 1.8;
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
}

.hero-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  
  @media (max-width: 480px) {
      flex-direction: column;
    width: 100%;
    gap: 1rem;
  }
}

// Luxury Buttons
.luxury-btn {
  padding: 1rem 2.5rem;
  border: 1px solid var(--luxury-black);
  background: transparent;
  color: var(--luxury-black);
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 180px;
  
  &.primary {
    background: var(--luxury-black);
    color: var(--luxury-white);
      
      &:hover {
      background: var(--luxury-gray-dark);
      border-color: var(--luxury-gray-dark);
    }
  }
  
  &.secondary {
    background: transparent;
    color: var(--luxury-black);
  
  &:hover {
      background: var(--luxury-black);
      color: var(--luxury-white);
    }
  }
  
  @media (max-width: 480px) {
    width: 100%;
    padding: 0.875rem 2rem;
    font-size: 0.85rem;
  }
}

// Collections Section
.collections-section {
  padding: 8rem 2rem;
  max-width: 1920px;
  margin: 0 auto;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 3rem 1rem;
  }
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    margin-bottom: 3rem;
  }
}

.section-title {
  font-size: 2.5rem;
  font-weight: 300;
  letter-spacing: 4px;
  margin-bottom: 1rem;
  text-transform: uppercase;
  color: var(--luxury-text);
  
  @media (max-width: 768px) {
    font-size: 2rem;
    letter-spacing: 2px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
    letter-spacing: 1px;
  }
}

.section-subtitle {
  font-size: 1rem;
  font-weight: 300;
  color: var(--luxury-text-light);
  letter-spacing: 2px;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
}

.collections-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 2rem;
  width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.collection-item {
  position: relative;
    overflow: hidden;
  background: var(--luxury-gray);
  width: 100%;
  max-width: 100%;
    
  &.large {
    grid-row: span 2;
    
    .collection-image {
      height: 100%;
    }
  }
  
  &.medium {
    .collection-image {
      height: 400px;
      
      @media (max-width: 1024px) {
        height: 350px;
      }
      
      @media (max-width: 768px) {
        height: 300px;
      }
    }
  }
}

.collection-image {
  width: 100%;
  height: 100%;
  overflow: hidden;
  max-width: 100%;
  
  img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    max-width: 100%;
  }
}

.collection-content {
  padding: 2rem;
  background: var(--luxury-white);
  
  @media (max-width: 768px) {
  padding: 1.5rem;
}
}

.collection-title {
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: 2px;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
}

.collection-description {
  font-size: 0.95rem;
  color: var(--luxury-text-light);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
  font-size: 0.9rem;
  }
}

.collection-link {
      display: inline-flex;
      align-items: center;
  gap: 0.5rem;
  color: var(--luxury-black);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: gap 0.3s ease;
      
      &:hover {
      gap: 1rem;
  }
}

// Showcase Section
.showcase-section {
  padding: 8rem 0;
  background: var(--luxury-white);
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  
  @media (max-width: 768px) {
    padding: 4rem 0;
  }
}

.showcase-container {
  max-width: 1920px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
}

.showcase-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 8rem;
  width: 100%;
  max-width: 100%;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &.reverse {
    direction: rtl;
    
    > * {
      direction: ltr;
    }
  }

  @media (max-width: 1024px) {
    gap: 3rem;
    margin-bottom: 6rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 4rem;
    
    &.reverse {
      direction: ltr;
    }
  }
}

.showcase-image {
        width: 100%;
  height: 600px;
  overflow: hidden;
  background: var(--luxury-gray);
  max-width: 100%;
  
  img {
    width: 100%;
    height: 100%;
        object-fit: cover;
    max-width: 100%;
  }
  
  @media (max-width: 768px) {
    height: 400px;
  }
  
  @media (max-width: 480px) {
    height: 300px;
  }
}

.showcase-content {
  padding: 2rem;
}

.showcase-label {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--luxury-text-light);
  margin-bottom: 1rem;
}

.showcase-title {
  font-size: 2.5rem;
  font-weight: 300;
  letter-spacing: 3px;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    letter-spacing: 2px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
}

.showcase-description {
  font-size: 1rem;
  font-weight: 300;
  color: var(--luxury-text-light);
  line-height: 1.8;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
  font-size: 0.95rem;
  }
}

// Gallery Section
.gallery-section {
  padding: 8rem 2rem;
  max-width: 1920px;
  margin: 0 auto;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 3rem 1rem;
  }
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding-bottom: 24px;
  }
}

.gallery-item {
  position: relative;
  overflow: hidden;
  aspect-ratio: 3 / 4;
  background: var(--luxury-gray);
  cursor: pointer;
  border-radius: 12px;
      width: 100%;
  max-width: 100%;
  
  &:hover .gallery-overlay {
    opacity: 1;
  }
}

.gallery-image {
  width: 100%;
  height: 100%;
  max-width: 100%;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    max-width: 100%;
  }
}

.gallery-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: var(--luxury-white);
  opacity: 0;
  transition: opacity 0.3s ease;
  
  @media (max-width: 768px) {
    opacity: 1;
    padding: 1.5rem;
  }
}

.gallery-title {
  font-size: 1.2rem;
  font-weight: 300;
  letter-spacing: 2px;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.gallery-description {
  font-size: 0.9rem;
  font-weight: 300;
  opacity: 0.9;
}

// CTA Section
.cta-section {
    position: relative;
  padding: 8rem 2rem;
  text-align: center;
  background: var(--luxury-gray);
    overflow: hidden;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 3rem 1rem;
  }
}

.cta-background {
  position: absolute;
  top: 0;
  left: 0;
        width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
  opacity: 0.5;
}

.cta-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  padding: 0 1rem;
}

.cta-title {
  font-size: 3rem;
  font-weight: 300;
  letter-spacing: 4px;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    letter-spacing: 2px;
}

@media (max-width: 480px) {
    font-size: 1.5rem;
  }
}

.cta-description {
  font-size: 1.1rem;
  font-weight: 300;
  color: var(--luxury-text-light);
  line-height: 1.8;
  margin-bottom: 2.5rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
}

.cta-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  
  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
    gap: 1rem;
  }
}

// Categories Section
.categories-section {
  padding: 8rem 2rem;
  max-width: 1920px;
  margin: 0 auto;
  background: var(--luxury-white);
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 3rem 1rem;
  }
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
  width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}

.category-item {
  padding: 3rem 2rem;
  background: var(--luxury-gray);
  text-align: center;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, var(--category-color, transparent), transparent);
    opacity: 0;
    border-radius: 12px;
  }
  
  &:hover {
    border-color: var(--luxury-black);
    background: var(--luxury-white);
    
    &::before {
      opacity: 0.1;
    }
  }
  
  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
}

.category-icon {
  margin-bottom: 1.5rem;
  color: var(--luxury-text);
  padding: 1.5rem;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  :deep(svg) {
    width: 48px;
    height: 48px;
    
    @media (max-width: 768px) {
      width: 40px;
      height: 40px;
    }
  }
}

.category-name {
  font-size: 1.2rem;
  font-weight: 300;
  letter-spacing: 2px;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  color: var(--luxury-text);

@media (max-width: 768px) {
    font-size: 1rem;
  }
}

.category-count {
  font-size: 0.9rem;
  color: var(--luxury-text-light);
  letter-spacing: 1px;
}

.section-footer {
  text-align: center;
  margin-top: 3rem;
}

.view-all-link {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--luxury-black);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 400;
  letter-spacing: 2px;
  text-transform: uppercase;
  transition: gap 0.3s ease;
  padding: 1rem 2rem;
  border: 1px solid var(--luxury-black);
  
  &:hover {
    gap: 1.5rem;
    background: var(--luxury-black);
    color: var(--luxury-white);
  }
}

// Stats Section
.stats-section {
  padding: 6rem 2rem;
  background: var(--luxury-gray);
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
  max-width: 1920px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  padding: 0;

@media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
}

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 3.5rem;
  font-weight: 300;
  letter-spacing: 2px;
  margin-bottom: 0.5rem;
  color: var(--luxury-text);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
}

.stat-label {
  font-size: 1rem;
  font-weight: 300;
  color: var(--luxury-text-light);
  letter-spacing: 1px;
  text-transform: uppercase;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
      }
    }

// Products Section
.products-section {
  padding: 8rem 2rem;
  max-width: 1920px;
  margin: 0 auto;
  background: var(--luxury-white);
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 3rem 1rem;
  }
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 4rem;
  width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 1400px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding-bottom: 24px;
  }
}

.product-item {
  background: var(--luxury-gray);
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid transparent;
  width: 100%;
  max-width: 100%;
  
  &:hover {
    border-color: var(--luxury-border);
  }
}

.product-image {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  background: var(--luxury-gray);
  max-width: 100%;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    max-width: 100%;
  }
  
  @media (max-width: 768px) {
    height: 300px;
  }
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  .product-item:hover & {
    opacity: 1;
  }
}

.product-btn {
  padding: 1rem 2rem;
  background: var(--luxury-white);
  color: var(--luxury-black);
  border: none;
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--luxury-black);
    color: var(--luxury-white);
  }
}

.product-info {
  padding: 1.5rem;
}

.product-category {
  display: block;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--luxury-text-light);
  margin-bottom: 0.5rem;
}

.product-title {
  font-size: 1.2rem;
  font-weight: 300;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--luxury-text);
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
}

// About Section
.about-section {
  padding: 8rem 2rem;
  background: var(--luxury-gray);
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }
}

.about-container {
    display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1920px;
  margin: 0 auto;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

.about-content {
  padding: 2rem;
}

.about-label {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--luxury-text-light);
  margin-bottom: 1rem;
}

.about-title {
  font-size: 2.5rem;
  font-weight: 300;
  letter-spacing: 3px;
  margin-bottom: 2rem;
  text-transform: uppercase;
    line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
}

.about-description {
  font-size: 1rem;
  font-weight: 300;
  color: var(--luxury-text-light);
  line-height: 1.8;
    margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
}

.about-features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}

.about-features .feature-item {
  display: flex;
    align-items: center;
  gap: 0.75rem;
  font-size: 0.95rem;
  color: var(--luxury-text);
  
  :deep(svg) {
    width: 24px;
    height: 24px;
    color: var(--luxury-text);
  }
}

.about-image {
  width: 100%;
  height: 600px;
  overflow: hidden;
  background: var(--luxury-white);
  max-width: 100%;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    max-width: 100%;
  }
  
  @media (max-width: 768px) {
    height: 400px;
  }
}

// Horizontal Categories Section
.horizontal-categories-section {
  padding: 2rem 0;
  background: var(--luxury-white);
  border-bottom: 1px solid var(--luxury-border);
  position: sticky;
  top: 85px;
  z-index: 100;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  
  @media (max-width: 991px) {
    display: none;
  }
}

.horizontal-categories-container {
  max-width: 1920px;
  margin: 0 auto;
  padding: 0 2rem;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  width: 100%;
  box-sizing: border-box;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  @media (min-width: 1400px) {
    padding: 0 5rem;
  }
  
  @media (min-width: 1600px) {
    padding: 0 6rem;
  }
  
  @media (min-width: 1800px) {
    padding: 0 8rem;
  }
}

.categories-scroll {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  padding: 0.5rem 0;
  width: max-content;
  min-width: 0;
}

.category-tab {
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: 1px solid var(--luxury-border);
  border-radius: 999px;
  color: var(--luxury-text);
        font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  
  &:hover {
    border-color: var(--luxury-black);
    background: var(--luxury-gray);
    transform: translateY(-2px);
  }
  
  &.active {
    background: var(--luxury-black);
    color: var(--luxury-white);
    border-color: var(--luxury-black);
  }
}

// Designers Section
.designers-section {
  padding: 8rem 2rem;
  max-width: 1920px;
  margin: 0 auto;
  background: var(--luxury-white);
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }
}

.designers-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 2rem;
  width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
  }
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}

.designer-card {
  background: var(--luxury-gray);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  border: 1px solid transparent;
  width: 100%;
  max-width: 100%;
  
  &:hover {
    border-color: var(--luxury-border);
    background: var(--luxury-white);
  }
}

.designer-avatar {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--luxury-white);
    transition: transform 0.3s ease;
  }
  
  .designer-card:hover & img {
    transform: scale(1.1);
  }
}

.designer-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 28px;
  height: 28px;
  background: var(--luxury-black);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid var(--luxury-white);
  
  :deep(svg) {
    width: 16px;
    height: 16px;
    color: var(--luxury-white);
  }
}

.designer-name {
    font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 1px;
  margin-bottom: 1rem;
  color: var(--luxury-text);
}

.designer-stats {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
    font-size: 0.85rem;
  color: var(--luxury-text-light);
}

.stat-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  :deep(svg) {
    width: 16px;
    height: 16px;
  }
}

.designer-follow-btn {
  width: 100%;
  padding: 0.75rem;
  background: transparent;
  border: 1px solid var(--luxury-black);
  border-radius: 8px;
  color: var(--luxury-black);
  font-size: 0.85rem;
  font-weight: 400;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  
  &:hover {
    background: var(--luxury-black);
    color: var(--luxury-white);
    transform: scale(1.05);
  }
}

// Tags Section
.tags-section {
  padding: 8rem 2rem;
  max-width: 1920px;
  margin: 0 auto;
  background: var(--luxury-gray);
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
}

.tag-button {
  padding: 1rem 1.5rem;
  background: var(--luxury-white);
  border: 1px solid var(--luxury-border);
  border-radius: 999px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-3px) scale(1.05);
    border-color: var(--luxury-black);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
}

.tag-name {
  font-size: 0.95rem;
  font-weight: 400;
  letter-spacing: 1px;
  color: var(--luxury-text);
}

.tag-count {
  font-size: 0.8rem;
  color: var(--luxury-text-light);
  background: var(--luxury-gray);
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  min-width: 40px;
  text-align: center;
}

</style>