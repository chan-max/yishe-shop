<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-09-26 07:03:52
 * @FilePath: /yishe-nuxt/pages/index.vue
 * @Description: 1s Design - Creative Design Sharing Platform Homepage with Asymmetric Large-Small Layout
-->
<script lang="ts" setup>
import { ref, onMounted } from 'vue'

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

// Animation state
const currentSlide = ref(0)

// Initialize animations (keep simple rotation over 3 fixed slides)
onMounted(() => {
  setInterval(() => { currentSlide.value = (currentSlide.value + 1) % 3 }, 5000)
})

// Navigation functions
const goToSearch = () => {
  navigateTo('/search')
}

const goToExplore = () => {
  navigateTo('/search?category=clothing')
}
</script>

<template>
  <div class="design-homepage">
    <!-- Banner Section with Large Left Image, Small Right Text -->
    <section class="banner-section">
      <div class="banner-container">
        <div class="banner-image">
          <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><radialGradient id='bg1' cx='30%' cy='30%' r='80%'><stop offset='0%' stop-color='%23ff6b6b'/><stop offset='50%' stop-color='%234ecdc4' stop-opacity='.8'/><stop offset='100%' stop-color='%230a0a0a' stop-opacity='1'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23bg1)'/></svg>" alt="Banner Image" class="banner-img">
        </div>
        <div class="banner-content">
          <h1 class="banner-title">衣设服装设计</h1>
          <h2 class="banner-subtitle">创意印花图案设计平台</h2>
          <p class="banner-slogan">创意源于生活，设计改变时尚</p>
          <p class="banner-description">专注于创意印花图案和服装设计的专业平台，汇聚全球设计师的创意灵感，为您的时尚项目提供高质量的设计资源</p>
          <div class="banner-actions">
            <button class="primary-btn" @click="goToSearch">开始设计</button>
            <button class="secondary-btn">
              <v-icon size="16">mdi-arrow-up</v-icon>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Hero Slider Section -->
    <section class="hero-section">
      <!-- Slide 1 -->
      <div class="hero-slide" :class="{ active: currentSlide === 0 }">
        <div class="hero-background" style="background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 800 600%22><defs><radialGradient id=%22g1%22 cx=%2230%25%22 cy=%2230%25%22 r=%2280%25%22><stop offset=%220%25%22 stop-color=%22%23ff6b6b%22/><stop offset=%2250%25%22 stop-color=%22%234ecdc4%22 stop-opacity=%22.8%22/><stop offset=%22100%25%22 stop-color=%22%230a0a0a%22 stop-opacity=%221%22/></radialGradient></defs><rect width=%22100%25%22 height=%22100%25%22 fill=%22url(%23g1)%22/></svg>');"></div>
          <div class="hero-content">
          <h1 class="hero-title">创意印花图案库</h1>
          <h2 class="hero-subtitle">免费高清设计资源</h2>
          <p class="hero-description">精心挑选的创意印花图案和服装设计作品，为您的时尚设计项目提供免费可下载的高清设计资源</p>
              <div class="hero-actions">
            <button class="primary-btn" @click="goToExplore">探索设计</button>
            <button class="secondary-btn" @click="goToSearch">立即搜索</button>
              </div>
            </div>
          </div>
      <!-- Slide 2 -->
      <div class="hero-slide" :class="{ active: currentSlide === 1 }">
        <div class="hero-background" style="background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 800 600%22><defs><radialGradient id=%22g2%22 cx=%2270%25%22 cy=%2240%25%22 r=%2280%25%22><stop offset=%220%25%22 stop-color=%22%234facfe%22/><stop offset=%2260%25%22 stop-color=%22%2300f2fe%22 stop-opacity=%22.9%22/><stop offset=%22100%25%22 stop-color=%22%230a0a0a%22/></radialGradient></defs><rect width=%22100%25%22 height=%22100%25%22 fill=%22url(%23g2)%22/></svg>');"></div>
        <div class="hero-content">
          <h1 class="hero-title">免费设计服务</h1>
          <h2 class="hero-subtitle">印花图案与创意设计</h2>
          <p class="hero-description">我们提供免费服务：创意印花图案、服装设计、品牌标识、海报设计、产品包装、名片设计、明信片、电影海报、报纸版面等更多2D设计服务</p>
          <div class="hero-actions">
            <button class="primary-btn" @click="goToExplore">探索设计</button>
            <button class="secondary-btn" @click="goToSearch">立即搜索</button>
        </div>
      </div>
    </div>
      <!-- Slide 3 -->
      <div class="hero-slide" :class="{ active: currentSlide === 2 }">
        <div class="hero-background" style="background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 800 600%22><defs><radialGradient id=%22g3%22 cx=%2250%25%22 cy=%2260%25%22 r=%2285%25%22><stop offset=%220%25%22 stop-color=%22%23a78bfa%22/><stop offset=%2255%25%22 stop-color=%22%23f472b6%22 stop-opacity=%22.85%22/><stop offset=%22100%25%22 stop-color=%22%230a0a0a%22/></radialGradient></defs><rect width=%22100%25%22 height=%22100%25%22 fill=%22url(%23g3)%22/></svg>');"></div>
        <div class="hero-content">
          <h1 class="hero-title">共同创造时尚</h1>
          <h2 class="hero-subtitle">灵感与启发</h2>
          <p class="hero-description">与全球设计师连接，共同创作并推动视觉设计的边界，让创意印花图案和服装设计焕发新的生命力</p>
          <div class="hero-actions">
            <button class="primary-btn" @click="goToExplore">探索设计</button>
            <button class="secondary-btn" @click="goToSearch">立即搜索</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section with Large Left, Small Right Layout -->
    <section class="features-section">
      <h2 class="section-title">探索衣设设计</h2>
      <div class="features-container">
        <div class="features-large">
          <div class="feature-item large">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'><defs><radialGradient id='g4' cx='35%' cy='35%' r='90%'><stop offset='0%' stop-color='%23ff9a9e'/><stop offset='60%' stop-color='%23fad0c4' stop-opacity='.9'/><stop offset='100%' stop-color='%231c2526'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23g4)'/></svg>" alt="Feature Image" class="feature-image">
            <div class="feature-content">
              <v-icon size="48" class="feature-icon">mdi-palette</v-icon>
              <h3 class="feature-title">免费设计服务</h3>
              <p class="feature-description">我们提供免费服务：创意印花图案、服装设计、品牌标识、产品形象、服装设计、品牌文案、标识设计、名片、明信片、海报、报纸版面等更多服务</p>
              <div class="feature-meta">
                <div class="feature-tags">
                  <span class="tag">印花图案</span>
                  <span class="tag">服装设计</span>
                  <span class="tag">海报设计</span>
                  <span class="tag">品牌设计</span>
                </div>
                <div class="feature-actions">
                  <button class="chip-btn" @click="goToSearch">
                    <v-icon size="16">mdi-lightning-bolt</v-icon>
                    获取免费资源
                  </button>
                  <NuxtLink to="/search?category=graphic" class="text-link">探索分类</NuxtLink>
                </div>
              </div>
        </div>
            <div class="feature-gallery">
              <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><radialGradient id='g2' cx='70%' cy='40%' r='80%'><stop offset='0%' stop-color='%234facfe'/><stop offset='60%' stop-color='%2300f2fe' stop-opacity='.9'/><stop offset='100%' stop-color='%230a0a0a'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23g2)'/></svg>" alt="Gallery 1" class="gallery-thumb tall2">
              <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><radialGradient id='g3' cx='50%' cy='60%' r='85%'><stop offset='0%' stop-color='%23a78bfa'/><stop offset='55%' stop-color='%23f472b6' stop-opacity='.85'/><stop offset='100%' stop-color='%230a0a0a'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23g3)'/></svg>" alt="Gallery 2" class="gallery-thumb">
              <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><defs><radialGradient id='g7' cx='50%' cy='50%' r='90%'><stop offset='0%' stop-color='%23a18cd1'/><stop offset='60%' stop-color='%23fbc2eb' stop-opacity='.9'/><stop offset='100%' stop-color='%231c2526'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23g7)'/></svg>" alt="Gallery 3" class="gallery-thumb">
              <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'><defs><radialGradient id='g4' cx='35%' cy='35%' r='90%'><stop offset='0%' stop-color='%23ff9a9e'/><stop offset='60%' stop-color='%23fad0c4' stop-opacity='.9'/><stop offset='100%' stop-color='%231c2526'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23g4)'/></svg>" alt="Gallery 4" class="gallery-thumb tall">
              <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><defs><radialGradient id='g6' cx='30%' cy='70%' r='85%'><stop offset='0%' stop-color='%2392fe9d'/><stop offset='60%' stop-color='%2300c9ff' stop-opacity='.9'/><stop offset='100%' stop-color='%231c2526'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23g6)'/></svg>" alt="Gallery 5" class="gallery-thumb">
              <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><defs><radialGradient id='g5' cx='65%' cy='30%' r='90%'><stop offset='0%' stop-color='%23ffd3a5'/><stop offset='60%' stop-color='%23fd6585' stop-opacity='.9'/><stop offset='100%' stop-color='%231c2526'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23g5)'/></svg>" alt="Gallery 6" class="gallery-thumb">
              <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><radialGradient id='g1' cx='30%' cy='30%' r='80%'><stop offset='0%' stop-color='%23ff6b6b'/><stop offset='50%' stop-color='%234ecdc4' stop-opacity='.8'/><stop offset='100%' stop-color='%230a0a0a' stop-opacity='1'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23g1)'/></svg>" alt="Gallery 7" class="gallery-thumb tall">
              <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><radialGradient id='g2' cx='70%' cy='40%' r='80%'><stop offset='0%' stop-color='%234facfe'/><stop offset='60%' stop-color='%2300f2fe' stop-opacity='.9'/><stop offset='100%' stop-color='%230a0a0a'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23g2)'/></svg>" alt="Gallery 8" class="gallery-thumb">
              <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><radialGradient id='g3' cx='50%' cy='60%' r='85%'><stop offset='0%' stop-color='%23a78bfa'/><stop offset='55%' stop-color='%23f472b6' stop-opacity='.85'/><stop offset='100%' stop-color='%230a0a0a'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23g3)'/></svg>" alt="Gallery 9" class="gallery-thumb">
              <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'><defs><radialGradient id='g4' cx='35%' cy='35%' r='90%'><stop offset='0%' stop-color='%23ff9a9e'/><stop offset='60%' stop-color='%23fad0c4' stop-opacity='.9'/><stop offset='100%' stop-color='%231c2526'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23g4)'/></svg>" alt="Gallery 10" class="gallery-thumb tall2">
              <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><defs><radialGradient id='g7' cx='50%' cy='50%' r='90%'><stop offset='0%' stop-color='%23a18cd1'/><stop offset='60%' stop-color='%23fbc2eb' stop-opacity='.9'/><stop offset='100%' stop-color='%231c2526'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23g7)'/></svg>" alt="Gallery 11" class="gallery-thumb">
              <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><defs><radialGradient id='g6' cx='30%' cy='70%' r='85%'><stop offset='0%' stop-color='%2392fe9d'/><stop offset='60%' stop-color='%2300c9ff' stop-opacity='.9'/><stop offset='100%' stop-color='%231c2526'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23g6)'/></svg>" alt="Gallery 12" class="gallery-thumb">
              <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><radialGradient id='g1' cx='30%' cy='30%' r='80%'><stop offset='0%' stop-color='%23ff6b6b'/><stop offset='50%' stop-color='%234ecdc4' stop-opacity='.8'/><stop offset='100%' stop-color='%230a0a0a' stop-opacity='1'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23g1)'/></svg>" alt="Gallery 13" class="gallery-thumb tall">
              <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><radialGradient id='g2' cx='70%' cy='40%' r='80%'><stop offset='0%' stop-color='%234facfe'/><stop offset='60%' stop-color='%2300f2fe' stop-opacity='.9'/><stop offset='100%' stop-color='%230a0a0a'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23g2)'/></svg>" alt="Gallery 14" class="gallery-thumb">
              <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><radialGradient id='g3' cx='50%' cy='60%' r='85%'><stop offset='0%' stop-color='%23a78bfa'/><stop offset='55%' stop-color='%23f472b6' stop-opacity='.85'/><stop offset='100%' stop-color='%230a0a0a'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23g3)'/></svg>" alt="Gallery 15" class="gallery-thumb tall2">
              <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'><defs><radialGradient id='g4' cx='35%' cy='35%' r='90%'><stop offset='0%' stop-color='%23ff9a9e'/><stop offset='60%' stop-color='%23fad0c4' stop-opacity='.9'/><stop offset='100%' stop-color='%231c2526'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23g4)'/></svg>" alt="Gallery 16" class="gallery-thumb">
              <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><radialGradient id='g3' cx='50%' cy='60%' r='85%'><stop offset='0%' stop-color='%23a78bfa'/><stop offset='55%' stop-color='%23f472b6' stop-opacity='.85'/><stop offset='100%' stop-color='%230a0a0a'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23g3)'/></svg>" alt="Gallery 17" class="gallery-thumb tall2">
              <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><defs><radialGradient id='g6' cx='30%' cy='70%' r='85%'><stop offset='0%' stop-color='%2392fe9d'/><stop offset='60%' stop-color='%2300c9ff' stop-opacity='.9'/><stop offset='100%' stop-color='%231c2526'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23g6)'/></svg>" alt="Gallery 18" class="gallery-thumb">
            </div>
      </div>
        </div>
        <div class="features-small">
          <div class="feature-item small portrait">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><radialGradient id='g3' cx='50%' cy='60%' r='85%'><stop offset='0%' stop-color='%23a78bfa'/><stop offset='55%' stop-color='%23f472b6' stop-opacity='.85'/><stop offset='100%' stop-color='%230a0a0a'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23g3)'/></svg>" alt="Feature Image" class="feature-image">
            <div class="feature-content">
              <v-icon size="32" class="feature-icon">mdi-shape</v-icon>
              <h3 class="feature-title">标识与品牌</h3>
              <p class="feature-description">品牌系统、命名、标识设计、身份识别套件和风格指南</p>
            </div>
          </div>
          <div class="feature-item small portraitTall">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><defs><radialGradient id='g6' cx='30%' cy='70%' r='85%'><stop offset='0%' stop-color='%2392fe9d'/><stop offset='60%' stop-color='%2300c9ff' stop-opacity='.9'/><stop offset='100%' stop-color='%231c2526'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23g6)'/></svg>" alt="Feature Image" class="feature-image">
            <div class="feature-content">
              <v-icon size="32" class="feature-icon">mdi-tshirt-crew</v-icon>
              <h3 class="feature-title">产品与服装</h3>
              <p class="feature-description">产品形象、效果图、服装视觉效果和创意时尚设计</p>
            </div>
          </div>
          <div class="feature-item small portrait">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><defs><radialGradient id='g7' cx='50%' cy='50%' r='90%'><stop offset='0%' stop-color='%23a18cd1'/><stop offset='60%' stop-color='%23fbc2eb' stop-opacity='.9'/><stop offset='100%' stop-color='%231c2526'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23g7)'/></svg>" alt="Feature Image" class="feature-image">
            <div class="feature-content">
              <v-icon size="32" class="feature-icon">mdi-post</v-icon>
              <h3 class="feature-title">海报与版面</h3>
              <p class="feature-description">电影/音乐海报、编辑版面、宣传册和印刷就绪文件</p>
            </div>
          </div>
          <div class="feature-item small portraitTall">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><radialGradient id='g2' cx='70%' cy='40%' r='80%'><stop offset='0%' stop-color='%234facfe'/><stop offset='60%' stop-color='%2300f2fe' stop-opacity='.9'/><stop offset='100%' stop-color='%230a0a0a'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23g2)'/></svg>" alt="Feature Image" class="feature-image">
            <div class="feature-content">
              <v-icon size="32" class="feature-icon">mdi-package-variant</v-icon>
              <h3 class="feature-title">包装与标签</h3>
              <p class="feature-description">瓶身包装、盒子刀线和货架就绪标签系统</p>
            </div>
          </div>
          <div class="feature-item small portrait">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'><defs><radialGradient id='g4' cx='35%' cy='35%' r='90%'><stop offset='0%' stop-color='%23ff9a9e'/><stop offset='60%' stop-color='%23fad0c4' stop-opacity='.9'/><stop offset='100%' stop-color='%231c2526'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23g4)'/></svg>" alt="Feature Image" class="feature-image">
            <div class="feature-content">
              <v-icon size="32" class="feature-icon">mdi-instagram</v-icon>
              <h3 class="feature-title">社交媒体图形</h3>
              <p class="feature-description">短视频封面、故事系列和垂直活动模板</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="stats-container">
        <div class="stat-item">
          <h3 class="stat-number">15K+</h3>
          <p class="stat-label">设计作品分享</p>
          </div>
        <div class="stat-item">
          <h3 class="stat-number">8K+</h3>
          <p class="stat-label">活跃设计师</p>
        </div>
        <div class="stat-item">
          <h3 class="stat-number">70+</h3>
          <p class="stat-label">国家地区</p>
        </div>
        <div class="stat-item">
          <h3 class="stat-number">3M+</h3>
          <p class="stat-label">月度浏览量</p>
        </div>
      </div>
    </section>

    <!-- Trending Designs Section with Large Left, Small Right -->
    <section class="trending-section">
      <h2 class="section-title">热门设计</h2>
      <div class="trending-container">
        <div class="trending-large">
          <div class="trending-item large">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><radialGradient id='tg1' cx='30%' cy='30%' r='80%'><stop offset='0%' stop-color='%2360a5fa'/><stop offset='50%' stop-color='%233b82f6' stop-opacity='.9'/><stop offset='100%' stop-color='%230a0a0a'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23tg1)'/></svg>" alt="Trending Design" class="trending-image">
            <div class="trending-overlay">
              <h3 class="trending-title">大胆极简主义</h3>
              <p class="trending-description">简洁的构图、丰富的留白和富有表现力的色彩</p>
              <div class="trending-meta">
                <span>设计师 A</span>
      </div>
            </div>
        </div>
        
          <!-- Complement block to balance left column height -->
          <div class="trending-complement">
            <div class="tc-media">
              <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><defs><radialGradient id='tc1' cx='65%' cy='30%' r='90%'><stop offset='0%' stop-color='%23ffd3a5'/><stop offset='60%' stop-color='%23fd6585' stop-opacity='.9'/><stop offset='100%' stop-color='%231c2526'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23tc1)'/></svg>" alt="Complement Visual" class="tc-image" />
            </div>
            <div class="tc-content">
              <h4 class="tc-title">新潮方向</h4>
              <p class="tc-desc">垂直构图配合大胆的字体设计和柔和的渐变，打造品牌时刻</p>
              <div class="tc-tags">
                <span class="tc-tag">海报</span>
                <span class="tc-tag">编辑</span>
                <span class="tc-tag">品牌</span>
          </div>
        </div>
      </div>
        </div>
        <div class="trending-small">
          <div class="trending-item small portrait">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><radialGradient id='ts1' cx='70%' cy='40%' r='80%'><stop offset='0%' stop-color='%234facfe'/><stop offset='60%' stop-color='%2300f2fe' stop-opacity='.9'/><stop offset='100%' stop-color='%230a0a0a'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23ts1)'/></svg>" alt="Trending Design" class="trending-image">
            <div class="trending-overlay">
              <h3 class="trending-title">街头风格</h3>
              <p class="trending-description">充满活力的形状和动感字体设计，灵感来自城市</p>
              <div class="trending-meta">
                <span>设计师 B</span>
              </div>
            </div>
          </div>
          <div class="trending-item small portraitTall">
            <img src="/pages/index/monalisa.jpg" alt="Trending Design" class="trending-image">
            <div class="trending-overlay">
              <h3 class="trending-title">经典艺术复兴</h3>
              <p class="trending-description">灵感来自世界著名杰作，为现代可持续品牌重新构想</p>
              <div class="trending-meta">
                <span>免费艺术资源可用</span>
              </div>
            </div>
          </div>
          <div class="trending-item small">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><radialGradient id='ts3' cx='30%' cy='30%' r='80%'><stop offset='0%' stop-color='%23ff6b6b'/><stop offset='50%' stop-color='%234ecdc4' stop-opacity='.8'/><stop offset='100%' stop-color='%230a0a0a' stop-opacity='1'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23ts3)'/></svg>" alt="Trending Design" class="trending-image">
            <div class="trending-overlay">
              <h3 class="trending-title">科技融合</h3>
              <p class="trending-description">霓虹纹理和柔和光晕融合未来与工艺</p>
              <div class="trending-meta">
                <span>设计师 D</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="primary-btn" @click="goToExplore">查看更多设计</button>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section">
      <h2 class="section-title">社区用户评价</h2>
      <div class="testimonials-container">
        <div class="testimonial-item">
          <img src="https://picsum.photos/120/120?random=12" alt="Author" class="testimonial-image">
          <blockquote class="testimonial-quote">衣设服装设计彻底改变了我分享创意愿景的方式！</blockquote>
          <div class="testimonial-author">
            <strong>苏菲·林</strong>
            <span>服装设计师</span>
          </div>
        </div>
        <div class="testimonial-item">
          <img src="https://picsum.photos/120/120?random=13" alt="Author" class="testimonial-image">
          <blockquote class="testimonial-quote">这个平台让我每天都能与鼓舞人心的设计师们连接。</blockquote>
          <div class="testimonial-author">
            <strong>卡洛斯·门德斯</strong>
            <span>平面艺术家</span>
          </div>
        </div>
        <div class="testimonial-item">
          <img src="https://picsum.photos/120/120?random=14" alt="Author" class="testimonial-image">
          <blockquote class="testimonial-quote">这里的趋势洞察让我的作品始终保持前沿。</blockquote>
          <div class="testimonial-author">
            <strong>艾莎·汗</strong>
            <span>产品设计师</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Design Services Section -->
    <section class="services-section">
      <h2 class="section-title">我们免费提供的设计服务</h2>
      <p class="services-subtitle">一个设计分享社区，同时也能帮助您创建全方位的2D平面设计</p>
      <div class="services-grid">
        <div class="service-card portrait" style="--delay:0s">
          <div class="service-media">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><radialGradient id='sv1' cx='30%' cy='30%' r='80%'><stop offset='0%' stop-color='%23ff6b6b'/><stop offset='50%' stop-color='%234ecdc4' stop-opacity='.8'/><stop offset='100%' stop-color='%230a0a0a' stop-opacity='1'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23sv1)'/></svg>" alt="Asset Graphics" class="service-image" />
          </div>
          <div class="service-content">
            <h3 class="service-title">印花图案</h3>
            <p class="service-description">高质量的创意印花图案和可重复使用的组件包</p>
          </div>
        </div>
        <div class="service-card portrait" style="--delay:0.05s">
          <div class="service-media">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><radialGradient id='sv2' cx='70%' cy='40%' r='80%'><stop offset='0%' stop-color='%234facfe'/><stop offset='60%' stop-color='%2300f2fe' stop-opacity='.9'/><stop offset='100%' stop-color='%230a0a0a'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23sv2)'/></svg>" alt="Logo Design" class="service-image" />
          </div>
          <div class="service-content">
            <h3 class="service-title">Logo Design</h3>
            <p class="service-description">Wordmarks, symbols, marks and multi-size exports</p>
          </div>
        </div>
        <div class="service-card" style="--delay:0.1s">
          <div class="service-media">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><radialGradient id='sv3' cx='50%' cy='60%' r='85%'><stop offset='0%' stop-color='%23a78bfa'/><stop offset='55%' stop-color='%23f472b6' stop-opacity='.85'/><stop offset='100%' stop-color='%230a0a0a'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23sv3)'/></svg>" alt="Product Imagery" class="service-image" />
          </div>
          <div class="service-content">
            <h3 class="service-title">Product Imagery</h3>
            <p class="service-description">Creative visuals for lifestyle goods and e-commerce</p>
          </div>
        </div>
        <div class="service-card portrait" style="--delay:0.15s">
          <div class="service-media">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'><defs><radialGradient id='sv4' cx='35%' cy='35%' r='90%'><stop offset='0%' stop-color='%23ff9a9e'/><stop offset='60%' stop-color='%23fad0c4' stop-opacity='.9'/><stop offset='100%' stop-color='%231c2526'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23sv4)'/></svg>" alt="Apparel & Garment" class="service-image" />
          </div>
          <div class="service-content">
            <h3 class="service-title">Apparel & Garment</h3>
            <p class="service-description">Garment sketches, fabric matching and fashion visuals</p>
          </div>
        </div>
        <div class="service-card" style="--delay:0.2s">
          <div class="service-media">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><defs><radialGradient id='sv5' cx='65%' cy='30%' r='90%'><stop offset='0%' stop-color='%23ffd3a5'/><stop offset='60%' stop-color='%23fd6585' stop-opacity='.9'/><stop offset='100%' stop-color='%231c2526'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23sv5)'/></svg>" alt="Brand & Copywriting" class="service-image" />
          </div>
          <div class="service-content">
            <h3 class="service-title">Brand & Copywriting</h3>
            <p class="service-description">Naming, slogans, tone, guidelines and brand decks</p>
          </div>
        </div>
        <div class="service-card portrait" style="--delay:0.25s">
          <div class="service-media">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><defs><radialGradient id='sv6' cx='30%' cy='70%' r='85%'><stop offset='0%' stop-color='%2392fe9d'/><stop offset='60%' stop-color='%2300c9ff' stop-opacity='.9'/><stop offset='100%' stop-color='%231c2526'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23sv6)'/></svg>" alt="Signage & Wayfinding" class="service-image" />
          </div>
          <div class="service-content">
            <h3 class="service-title">Signage & Wayfinding</h3>
            <p class="service-description">Storefront signage, wayfinding and outdoor specs</p>
          </div>
        </div>
        <div class="service-card portrait" style="--delay:0.3s">
          <div class="service-media">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><defs><radialGradient id='sv7' cx='50%' cy='50%' r='90%'><stop offset='0%' stop-color='%23a18cd1'/><stop offset='60%' stop-color='%23fbc2eb' stop-opacity='.9'/><stop offset='100%' stop-color='%231c2526'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23sv7)'/></svg>" alt="Business Cards" class="service-image" />
          </div>
          <div class="service-content">
            <h3 class="service-title">Business Cards</h3>
            <p class="service-description">Multiple layouts plus print craft recommendations</p>
          </div>
        </div>
        <div class="service-card" style="--delay:0.35s">
          <div class="service-media">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><radialGradient id='sv8' cx='70%' cy='40%' r='80%'><stop offset='0%' stop-color='%234facfe'/><stop offset='60%' stop-color='%2300f2fe' stop-opacity='.9'/><stop offset='100%' stop-color='%230a0a0a'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23sv8)'/></svg>" alt="Postcards & Greeting" class="service-image" />
          </div>
          <div class="service-content">
            <h3 class="service-title">Postcards & Greeting</h3>
            <p class="service-description">Illustrated themes for holidays and keepsakes</p>
          </div>
        </div>
        <div class="service-card portraitTall" style="--delay:0.4s">
          <div class="service-media">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><radialGradient id='sv9' cx='50%' cy='60%' r='85%'><stop offset='0%' stop-color='%23a78bfa'/><stop offset='55%' stop-color='%23f472b6' stop-opacity='.85'/><stop offset='100%' stop-color='%230a0a0a'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23sv9)'/></svg>" alt="Film/Music Posters" class="service-image" />
          </div>
          <div class="service-content">
            <h3 class="service-title">Film/Music Posters</h3>
            <p class="service-description">From cinematic grain to modern art poster styles</p>
          </div>
        </div>
        <div class="service-card portrait" style="--delay:0.45s">
          <div class="service-media">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'><defs><radialGradient id='sv10' cx='35%' cy='35%' r='90%'><stop offset='0%' stop-color='%23ff9a9e'/><stop offset='60%' stop-color='%23fad0c4' stop-opacity='.9'/><stop offset='100%' stop-color='%231c2526'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23sv10)'/></svg>" alt="Editorial Typography" class="service-image" />
          </div>
          <div class="service-content">
            <h3 class="service-title">Editorial Typography</h3>
            <p class="service-description">Grids, headline systems and long-form layouts</p>
          </div>
        </div>
        <div class="service-card" style="--delay:0.5s">
          <div class="service-media">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><radialGradient id='sv11' cx='50%' cy='60%' r='85%'><stop offset='0%' stop-color='%234facfe'/><stop offset='55%' stop-color='%2300f2fe' stop-opacity='.85'/><stop offset='100%' stop-color='%230a0a0a'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23sv11)'/></svg>" alt="2D Graphic Design" class="service-image" />
          </div>
          <div class="service-content">
            <h3 class="service-title">2D Graphic Design</h3>
            <p class="service-description">Icons, illustrations, brochures, roll-ups and more</p>
          </div>
        </div>
      </div>
      <div class="services-cta">
        <button class="primary-btn" @click="goToSearch">Submit Your Request</button>
        <button class="secondary-btn" @click="goToExplore">Browse More Works</button>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="cta-section">
      <div class="cta-background"></div>
        <div class="cta-content">
        <h2 class="cta-title">Join the Creative Revolution</h2>
        <p class="cta-description">Share your designs and inspire the world with 1s Design!</p>
          <div class="cta-actions">
          <button class="primary-btn" @click="goToSearch">Get Started</button>
          <button class="secondary-btn" @click="goToExplore">Explore Now</button>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
// CSS Variables
:root {
  --primary-color: #2563eb;
  --secondary-color: #f8fafc;
  --accent-color: #64748b;
  --text-primary: #1e293b;
  --text-secondary: #475569;
  --text-muted: #94a3b8;
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-tertiary: #f1f5f9;
  --border-color: #e2e8f0;
  --gradient-1: linear-gradient(135deg, #3b82f6, #1d4ed8, #1e40af);
  --gradient-2: linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7);
  --gradient-3: linear-gradient(135deg, #06b6d4, #0891b2, #0e7490);
}

// Base styles
.design-homepage {
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  overflow-x: hidden;
  box-sizing: border-box;
  
  * {
    box-sizing: border-box;
  }
  
}

// Banner Section (New Large Left Image, Small Right Text)
.banner-section {
  padding: 4rem 2rem;
  background: var(--bg-primary);
}

.banner-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin: 0 auto;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  box-sizing: border-box;
}

.banner-image {
  justify-self: start;
  .banner-img {
    width: 100%;
    height: 700px;
    object-fit: cover;
    border-radius: 16px;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.02);
    }
  }
}

.banner-content {
  padding: 1.25rem 1rem 1.25rem 0.75rem;
  opacity: 1;
  transform: translateY(0);
}

.banner-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
}

.banner-subtitle {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.banner-slogan {
  font-size: 1.2rem;
  font-style: italic;
  margin-bottom: 1rem;
  color: var(--text-secondary);
}

.banner-description {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: var(--text-secondary);
}

.banner-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

// Hero Section
.hero-section {
  position: relative;
  height: 80vh;
  overflow: hidden;
}

.hero-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  
  &.active {
    opacity: 1;
  }
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: blur(6px) brightness(0.75);
}

.hero-content {
  position: relative;
  z-index: 2;
  padding: 4rem 2rem;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  opacity: 1;
  transform: translateY(0);
}

.hero-title {
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
}

.hero-subtitle {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.hero-description {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.hero-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

// Features Section
.features-section {
  padding: 6rem 2rem;
  background: var(--bg-secondary);
}

.section-title {
  font-size: 2.8rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 4rem;
}

.features-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

.features-large {
  .feature-item.large {
  display: flex;
    flex-direction: column;
    background: var(--bg-tertiary);
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.3s ease;
  
  &:hover {
      transform: translateY(-5px);
    }
    
    .feature-image {
      width: 100%;
      height: 560px;
      object-fit: cover;
      border-radius: inherit;
    }
    
    .feature-content {
      padding: 1.25rem 1.5rem 1rem;
    }
    .feature-gallery {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-auto-rows: 140px;
      gap: 0.75rem;
      padding: 0 1.5rem 1.25rem;
    }

    .gallery-thumb {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 12px;
      border: 1px solid var(--border-color);
      background: var(--bg-primary);
      transition: transform 0.2s ease;
      
      &:hover {
        transform: translateY(-2px);
      }
    }

    .gallery-thumb.tall { grid-row: span 2; }
    .gallery-thumb.tall2 { grid-row: span 3; }
    
    .feature-meta {
      margin-top: 0.75rem;
  display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .feature-tags {
      display: flex;
      flex-wrap: wrap;
  gap: 0.5rem;
    }

    .tag {
      display: inline-flex;
      align-items: center;
      padding: 0.25rem 0.6rem;
      border: 1px solid var(--border-color);
      border-radius: 999px;
      font-size: 0.75rem;
      color: var(--text-secondary);
      background: var(--bg-primary);
    }

    .feature-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .chip-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: var(--text-primary);
      padding: 0.4rem 0.8rem;
      border-radius: 999px;
      font-size: 0.8rem;
  cursor: pointer;
      transition: all 0.2s ease;
      
      &:hover {
        background: rgba(255, 255, 255, 0.15);
        transform: translateY(-1px);
      }
    }

    .text-link {
      color: var(--text-secondary);
      text-decoration: none;
      font-size: 0.85rem;
      transition: color 0.2s ease;
  
  &:hover {
        color: var(--primary-color);
      }
    }
    .feature-title {
      font-size: 2rem;
      font-weight: 700;
    }
    
    .feature-description {
      font-size: 1.1rem;
    }
  }
}

.features-small {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  .feature-item.small {
    background: var(--bg-tertiary);
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: translateY(-3px);
    }
    
      .feature-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: inherit;
      }
    
    .feature-content {
      padding: 1rem;
    }
    
    .feature-title {
      font-size: 1.2rem;
      font-weight: 600;
    }
    
    .feature-description {
      font-size: 0.9rem;
    }

      &.portrait .feature-image {
        height: 320px;
      }
      &.portraitTall .feature-image {
        height: 420px;
      }
  }
}

.feature-icon {
  margin-bottom: 1rem;
}

// Stats Section
.stats-section {
  padding: 4rem 2rem;
  background: var(--bg-primary);
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
}

.stat-item {
  opacity: 1;
  transform: translateY(0);
}

.stat-number {
  font-size: 2.8rem;
  font-weight: 800;
  color: var(--accent-color);
}

.stat-label {
  font-size: 1rem;
  color: var(--text-muted);
}

// Trending Section
.trending-section {
  padding: 6rem 2rem;
  background: var(--bg-secondary);
}

.trending-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

.trending-large {
  .trending-item.large {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.02);
    }
    
    .trending-image {
      width: 100%;
      height: 500px;
      object-fit: cover;
      border-radius: inherit;
    }
    
    .trending-title {
      font-size: 1.8rem;
    }
    
    .trending-description {
      font-size: 1rem;
    }

    .trending-complement {
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 1rem;
      margin-top: 1rem;
      background: var(--bg-tertiary);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      overflow: hidden;
      
      .tc-media {
        background: var(--bg-primary);
        min-height: 140px;
      }
    .tc-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      border-radius: inherit;
      }
      .tc-content {
        padding: 1rem 1rem 1.1rem 0.75rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .tc-title {
  font-size: 1.1rem;
        font-weight: 700;
      }
      .tc-desc {
        font-size: 0.95rem;
  color: var(--text-secondary);
      }
      .tc-tags { display: flex; gap: 0.5rem; flex-wrap: wrap; }
      .tc-tag {
        padding: 0.2rem 0.55rem;
        border: 1px solid var(--border-color);
        border-radius: 999px;
        font-size: 0.75rem;
        color: var(--text-muted);
      }
    }
  }
}

.trending-small {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  .trending-item.small {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.02);
    }
    
      .trending-image {
        width: 100%;
        height: 240px;
        object-fit: cover;
        border-radius: inherit;
      }
    
    .trending-title {
      font-size: 1.1rem;
    }
    
    .trending-description {
        font-size: 0.85rem;
    }

      &.portrait .trending-image {
        height: 360px;
      }
      &.portraitTall .trending-image {
        height: 460px;
      }
  }
}

.trending-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem;
  background: linear-gradient(transparent, rgba(0,0,0,0.8));
  color: var(--text-primary);
}

.trending-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.trending-description {
  margin-bottom: 0.75rem;
}

.trending-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  align-items: center;
}

// Testimonials Section
.testimonials-section {
  padding: 6rem 2rem;
  background: var(--bg-primary);
}

.testimonials-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

// Services Section
.services-section {
  padding: 6rem 2rem;
  background: var(--bg-secondary);
}

.services-subtitle {
  text-align: center;
  color: var(--text-muted);
  margin: -2rem auto 3rem;
  max-width: 900px;
}

.services-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  width: 100%;
  box-sizing: border-box;
}

.service-card {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  opacity: 1;
  transform: translateY(0);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
  }
}

.service-media {
  height: 160px;
  background: var(--bg-primary);
  border-radius: inherit;
}

.service-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
}

// Portrait variant for richer vertical compositions
.service-card.portrait {
  grid-row: span 2;
}

.service-card.portrait .service-media {
  height: 420px;
}

.service-card.portrait .service-content {
  padding-top: 1.25rem;
}

// Extra-tall portrait variant
.service-card.portraitTall {
  grid-row: span 3;
}

.service-card.portraitTall .service-media {
  height: 560px;
}

.service-content {
  padding: 1rem 1.25rem 1.25rem;
}

.service-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.service-description {
  font-size: 0.95rem;
  color: var(--text-secondary);
}

.services-cta {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

@media (max-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}

.testimonial-item {
  background: var(--bg-tertiary);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  opacity: 1;
  transform: translateY(0);
}

.testimonial-image {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  border: 2px solid var(--accent-color);
}

.testimonial-quote {
  font-size: 1.1rem;
  font-style: italic;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.testimonial-author {
  font-size: 1rem;
  font-weight: 600;
  
  span {
    display: block;
    font-size: 0.9rem;
    color: var(--text-muted);
  }
}

// CTA Section
.cta-section {
  position: relative;
  padding: 6rem 2rem;
  text-align: center;
  background: var(--bg-secondary);
}

.cta-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--gradient-3);
  filter: blur(15px);
  opacity: 0.7;
}

.cta-content {
  position: relative;
  z-index: 2;
  max-width: 700px;
  margin: 0 auto;
  opacity: 1;
  transform: translateY(0);
  width: 100%;
  box-sizing: border-box;
}

.cta-title {
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
}

.cta-description {
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
}

.cta-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

// Buttons
.primary-btn {
  background: var(--primary-color);
  border: 2px solid var(--primary-color);
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #1d4ed8;
    border-color: #1d4ed8;
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    padding: 0.875rem 2rem;
    font-size: 1rem;
    min-height: 44px;
  }
  
  @media (max-width: 480px) {
    padding: 0.75rem 1.5rem;
    font-size: 0.95rem;
    min-height: 40px;
  }
}

.secondary-btn {
  background: transparent;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  padding: 1rem 2rem;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: var(--primary-color);
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(37, 99, 235, 0.2);
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    padding: 0.875rem 1.75rem;
    font-size: 0.95rem;
    min-height: 44px;
  }
  
  @media (max-width: 480px) {
    padding: 0.75rem 1.25rem;
    font-size: 0.9rem;
    min-height: 40px;
  }
}

// Responsive Design
@media (max-width: 1024px) {
  .banner-container,
  .features-container,
  .trending-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 1rem;
  }
  
  .banner-image {
    .banner-img {
      width: 100%;
      height: 400px;
    }
  }
  
  .banner-content {
    padding: 1rem 0;
    text-align: center;
  }
  
  .features-large,
  .trending-large {
    .feature-item.large,
    .trending-item.large {
      .feature-image,
      .trending-image {
        height: 350px;
      }
    }
  }
  
  .features-small,
  .trending-small {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .banner-section {
    padding: 2rem 1rem;
  }
  
  .banner-title {
    font-size: 2.2rem;
    line-height: 1.2;
  }
  
  .banner-subtitle {
    font-size: 1.3rem;
  }
  
  .banner-slogan {
    font-size: 0.95rem;
  }
  
  .banner-description {
    font-size: 0.9rem;
    line-height: 1.5;
  }
  
  .banner-actions {
    flex-direction: column;
    gap: 0.75rem;
    align-items: center;
  }
  
  .hero-section {
    height: 60vh;
  }
  
  .hero-content {
    padding: 2rem 1rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
    line-height: 1.1;
  }
  
  .hero-subtitle {
    font-size: 1.5rem;
  }
  
  .hero-description {
    font-size: 0.95rem;
    line-height: 1.5;
  }
  
  .hero-actions {
    flex-direction: column;
    gap: 1rem;
  }
  
  .section-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  
  .features-section,
  .trending-section,
  .testimonials-section,
  .services-section {
    padding: 3rem 1rem;
  }
  
  .features-large,
  .trending-large {
    .feature-item.large,
    .trending-item.large {
      .feature-image,
      .trending-image {
        height: 250px;
      }
      
      .feature-title,
      .trending-title {
        font-size: 1.4rem;
      }
      
      .feature-description,
      .trending-description {
        font-size: 0.9rem;
      }
    }
  }
  
  .features-small,
  .trending-small {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  .testimonials-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .cta-title {
    font-size: 2rem;
  }
  
  .cta-description {
    font-size: 1rem;
  }
  
  .cta-actions {
    flex-direction: column;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .banner-container,
  .features-container,
  .trending-container {
    padding: 0 0.5rem;
  }
  
  .banner-section {
    padding: 1.5rem 0.75rem;
  }
  
  .banner-title {
    font-size: 1.8rem;
  }
  
  .banner-subtitle {
    font-size: 1.1rem;
  }
  
  .banner-slogan {
    font-size: 0.9rem;
  }
  
  .banner-description {
    font-size: 0.85rem;
  }
  
  .hero-section {
    height: 50vh;
  }
  
  .hero-content {
    padding: 1.5rem 0.75rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1.3rem;
  }
  
  .hero-description {
    font-size: 0.9rem;
  }
  
  .section-title {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
  
  .features-section,
  .trending-section,
  .testimonials-section,
  .services-section {
    padding: 2rem 0.75rem;
  }
  
  .stats-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .stat-number {
    font-size: 2.2rem;
  }
  
  .stat-label {
    font-size: 0.9rem;
  }
  
  .primary-btn,
  .secondary-btn {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }
  
  .cta-title {
    font-size: 1.8rem;
  }
  
  .cta-description {
    font-size: 0.95rem;
  }
}
</style>