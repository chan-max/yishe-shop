<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-09-25 22:36:14
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
  title: '1s Design - Creative Design Sharing Platform',
  meta: [
    {
      name: 'description',
      content: '1s Design is a creative design sharing platform where designers showcase their work, discover inspiration, and connect with the global design community.'
    },
    {
      name: 'keywords',
      content: 'design sharing, creative platform, fashion design, design inspiration, design community, 1s design'
    }
  ]
})

// Animation state
const isLoaded = ref(false)
const currentSlide = ref(0)

// Initialize animations (keep simple rotation over 3 fixed slides)
onMounted(() => {
  setTimeout(() => { isLoaded.value = true }, 100)
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
  <div class="design-homepage" :class="{ 'loaded': isLoaded }">
    <!-- Banner Section with Large Left Image, Small Right Text -->
    <section class="banner-section">
      <div class="banner-container">
        <div class="banner-image">
          <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><radialGradient id='bg1' cx='30%' cy='30%' r='80%'><stop offset='0%' stop-color='%23ff6b6b'/><stop offset='50%' stop-color='%234ecdc4' stop-opacity='.8'/><stop offset='100%' stop-color='%230a0a0a' stop-opacity='1'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23bg1)'/></svg>" alt="Banner Image" class="banner-img">
        </div>
        <div class="banner-content">
          <h1 class="banner-title">1s Design</h1>
          <h2 class="banner-subtitle">World Famous Art Collection</h2>
          <p class="banner-slogan">Art comes from life and returns to life</p>
          <p class="banner-description">Curated collection of world-famous artworks, providing free high-quality design resources for your creative projects</p>
          <div class="banner-actions">
            <button class="primary-btn" @click="goToSearch">Ask 1s Design</button>
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
          <h1 class="hero-title">World Famous Art Assets</h1>
          <h2 class="hero-subtitle">Free HD Art Resources</h2>
          <p class="hero-description">Curated selection of world-famous masterpieces, providing free downloadable HD assets for your creative design projects</p>
              <div class="hero-actions">
            <button class="primary-btn" @click="goToExplore">Explore Designs</button>
            <button class="secondary-btn" @click="goToSearch">Search Now</button>
              </div>
            </div>
          </div>
      <!-- Slide 2 -->
      <div class="hero-slide" :class="{ active: currentSlide === 1 }">
        <div class="hero-background" style="background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 800 600%22><defs><radialGradient id=%22g2%22 cx=%2270%25%22 cy=%2240%25%22 r=%2280%25%22><stop offset=%220%25%22 stop-color=%22%234facfe%22/><stop offset=%2260%25%22 stop-color=%22%2300f2fe%22 stop-opacity=%22.9%22/><stop offset=%22100%25%22 stop-color=%22%230a0a0a%22/></radialGradient></defs><rect width=%22100%25%22 height=%22100%25%22 fill=%22url(%23g2)%22/></svg>');"></div>
        <div class="hero-content">
          <h1 class="hero-title">Free Design Services</h1>
          <h2 class="hero-subtitle">Art Assets & Creative Design</h2>
          <p class="hero-description">We provide free services: world-famous art assets, logo design, brand identity, poster creation, product packaging, business cards, postcards, film posters, newspaper layout and more 2D design services</p>
          <div class="hero-actions">
            <button class="primary-btn" @click="goToExplore">Explore Designs</button>
            <button class="secondary-btn" @click="goToSearch">Search Now</button>
        </div>
      </div>
      </div>
      <!-- Slide 3 -->
      <div class="hero-slide" :class="{ active: currentSlide === 2 }">
        <div class="hero-background" style="background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 800 600%22><defs><radialGradient id=%22g3%22 cx=%2250%25%22 cy=%2260%25%22 r=%2285%25%22><stop offset=%220%25%22 stop-color=%22%23a78bfa%22/><stop offset=%2255%25%22 stop-color=%22%23f472b6%22 stop-opacity=%22.85%22/><stop offset=%22100%25%22 stop-color=%22%230a0a0a%22/></radialGradient></defs><rect width=%22100%25%22 height=%22100%25%22 fill=%22url(%23g3)%22/></svg>');"></div>
        <div class="hero-content">
          <h1 class="hero-title">Create Art Together</h1>
          <h2 class="hero-subtitle">Inspire & Be Inspired</h2>
          <p class="hero-description">Connect with designers worldwide to co-create and push boundaries of visual design, bringing world-famous art assets to new life</p>
          <div class="hero-actions">
            <button class="primary-btn" @click="goToExplore">Explore Designs</button>
            <button class="secondary-btn" @click="goToSearch">Search Now</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section with Large Left, Small Right Layout -->
    <section class="features-section">
      <h2 class="section-title">Discover 1s Design</h2>
      <div class="features-container">
        <div class="features-large">
          <div class="feature-item large">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'><defs><radialGradient id='g4' cx='35%' cy='35%' r='90%'><stop offset='0%' stop-color='%23ff9a9e'/><stop offset='60%' stop-color='%23fad0c4' stop-opacity='.9'/><stop offset='100%' stop-color='%231c2526'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23g4)'/></svg>" alt="Feature Image" class="feature-image">
            <div class="feature-content">
              <v-icon size="48" class="feature-icon">mdi-palette</v-icon>
              <h3 class="feature-title">Free Design Services</h3>
              <p class="feature-description">We provide free services: world-famous art assets, logo design, product imagery, apparel design, brand copywriting, signage, business cards, postcards, posters, newspaper layout and more</p>
              <div class="feature-meta">
                <div class="feature-tags">
                  <span class="tag">Art Assets</span>
                  <span class="tag">Logo Design</span>
                  <span class="tag">Posters</span>
                  <span class="tag">Branding</span>
                </div>
                <div class="feature-actions">
                  <button class="chip-btn" @click="goToSearch">
                    <v-icon size="16">mdi-lightning-bolt</v-icon>
                    Get Free Assets
                  </button>
                  <NuxtLink to="/search?category=graphic" class="text-link">Explore Categories</NuxtLink>
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
              <h3 class="feature-title">Logo & Brand</h3>
              <p class="feature-description">Brand systems, naming, logo marks, identity kits and style guides</p>
            </div>
          </div>
          <div class="feature-item small portraitTall">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><defs><radialGradient id='g6' cx='30%' cy='70%' r='85%'><stop offset='0%' stop-color='%2392fe9d'/><stop offset='60%' stop-color='%2300c9ff' stop-opacity='.9'/><stop offset='100%' stop-color='%231c2526'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23g6)'/></svg>" alt="Feature Image" class="feature-image">
            <div class="feature-content">
              <v-icon size="32" class="feature-icon">mdi-tshirt-crew</v-icon>
              <h3 class="feature-title">Product & Apparel</h3>
              <p class="feature-description">Product imagery, mockups, garment visuals and creative fashion design</p>
            </div>
          </div>
          <div class="feature-item small portrait">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><defs><radialGradient id='g7' cx='50%' cy='50%' r='90%'><stop offset='0%' stop-color='%23a18cd1'/><stop offset='60%' stop-color='%23fbc2eb' stop-opacity='.9'/><stop offset='100%' stop-color='%231c2526'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23g7)'/></svg>" alt="Feature Image" class="feature-image">
            <div class="feature-content">
              <v-icon size="32" class="feature-icon">mdi-post</v-icon>
              <h3 class="feature-title">Posters & Layout</h3>
              <p class="feature-description">Film/music posters, editorial layouts, brochures and print-ready files</p>
            </div>
          </div>
          <div class="feature-item small portraitTall">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><radialGradient id='g2' cx='70%' cy='40%' r='80%'><stop offset='0%' stop-color='%234facfe'/><stop offset='60%' stop-color='%2300f2fe' stop-opacity='.9'/><stop offset='100%' stop-color='%230a0a0a'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23g2)'/></svg>" alt="Feature Image" class="feature-image">
            <div class="feature-content">
              <v-icon size="32" class="feature-icon">mdi-package-variant</v-icon>
              <h3 class="feature-title">Packaging & Labels</h3>
              <p class="feature-description">Bottle wraps, box dielines and shelf-ready label systems</p>
            </div>
          </div>
          <div class="feature-item small portrait">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'><defs><radialGradient id='g4' cx='35%' cy='35%' r='90%'><stop offset='0%' stop-color='%23ff9a9e'/><stop offset='60%' stop-color='%23fad0c4' stop-opacity='.9'/><stop offset='100%' stop-color='%231c2526'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23g4)'/></svg>" alt="Feature Image" class="feature-image">
            <div class="feature-content">
              <v-icon size="32" class="feature-icon">mdi-instagram</v-icon>
              <h3 class="feature-title">Social Media Graphics</h3>
              <p class="feature-description">Reels covers, story series and vertical campaign templates</p>
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
          <p class="stat-label">Designs Shared</p>
          </div>
        <div class="stat-item">
          <h3 class="stat-number">8K+</h3>
          <p class="stat-label">Active Designers</p>
        </div>
        <div class="stat-item">
          <h3 class="stat-number">70+</h3>
          <p class="stat-label">Countries</p>
        </div>
        <div class="stat-item">
          <h3 class="stat-number">3M+</h3>
          <p class="stat-label">Monthly Views</p>
        </div>
      </div>
    </section>

    <!-- Trending Designs Section with Large Left, Small Right -->
    <section class="trending-section">
      <h2 class="section-title">Trending Designs</h2>
      <div class="trending-container">
        <div class="trending-large">
          <div class="trending-item large">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><radialGradient id='tg1' cx='30%' cy='30%' r='80%'><stop offset='0%' stop-color='%2360a5fa'/><stop offset='50%' stop-color='%233b82f6' stop-opacity='.9'/><stop offset='100%' stop-color='%230a0a0a'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23tg1)'/></svg>" alt="Trending Design" class="trending-image">
            <div class="trending-overlay">
              <h3 class="trending-title">Bold Minimalism</h3>
              <p class="trending-description">Sleek compositions, generous whitespace and expressive color</p>
              <div class="trending-meta">
                <span>By Designer A</span>
      </div>
            </div>
        </div>
        
          <!-- Complement block to balance left column height -->
          <div class="trending-complement">
            <div class="tc-media">
              <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><defs><radialGradient id='tc1' cx='65%' cy='30%' r='90%'><stop offset='0%' stop-color='%23ffd3a5'/><stop offset='60%' stop-color='%23fd6585' stop-opacity='.9'/><stop offset='100%' stop-color='%231c2526'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23tc1)'/></svg>" alt="Complement Visual" class="tc-image" />
            </div>
            <div class="tc-content">
              <h4 class="tc-title">Fresh Directions</h4>
              <p class="tc-desc">Vertical compositions with bold typography and soft gradients for brand moments</p>
              <div class="tc-tags">
                <span class="tc-tag">Poster</span>
                <span class="tc-tag">Editorial</span>
                <span class="tc-tag">Brand</span>
          </div>
        </div>
      </div>
        </div>
        <div class="trending-small">
          <div class="trending-item small portrait">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><radialGradient id='ts1' cx='70%' cy='40%' r='80%'><stop offset='0%' stop-color='%234facfe'/><stop offset='60%' stop-color='%2300f2fe' stop-opacity='.9'/><stop offset='100%' stop-color='%230a0a0a'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23ts1)'/></svg>" alt="Trending Design" class="trending-image">
            <div class="trending-overlay">
              <h3 class="trending-title">Street Vibes</h3>
              <p class="trending-description">Energetic shapes and kinetic typography inspired by the city</p>
              <div class="trending-meta">
                <span>By Designer B</span>
              </div>
            </div>
          </div>
          <div class="trending-item small portraitTall">
            <img src="/pages/index/monalisa.jpg" alt="Trending Design" class="trending-image">
            <div class="trending-overlay">
              <h3 class="trending-title">Classic Art Revival</h3>
              <p class="trending-description">Inspired by world-famous masterpieces, reimagined for modern sustainable brands</p>
              <div class="trending-meta">
                <span>Free Art Assets Available</span>
              </div>
            </div>
          </div>
          <div class="trending-item small">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><radialGradient id='ts3' cx='30%' cy='30%' r='80%'><stop offset='0%' stop-color='%23ff6b6b'/><stop offset='50%' stop-color='%234ecdc4' stop-opacity='.8'/><stop offset='100%' stop-color='%230a0a0a' stop-opacity='1'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23ts3)'/></svg>" alt="Trending Design" class="trending-image">
            <div class="trending-overlay">
              <h3 class="trending-title">Tech Fusion</h3>
              <p class="trending-description">Neon textures and soft glows blending future and craft</p>
              <div class="trending-meta">
                <span>By Designer D</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="primary-btn" @click="goToExplore">See More Designs</button>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section">
      <h2 class="section-title">What Our Community Says</h2>
      <div class="testimonials-container">
        <div class="testimonial-item">
          <img src="https://picsum.photos/120/120?random=12" alt="Author" class="testimonial-image">
          <blockquote class="testimonial-quote">1s Design has transformed how I share my creative vision!</blockquote>
          <div class="testimonial-author">
            <strong>Sophie Lin</strong>
            <span>Fashion Designer</span>
          </div>
        </div>
        <div class="testimonial-item">
          <img src="https://picsum.photos/120/120?random=13" alt="Author" class="testimonial-image">
          <blockquote class="testimonial-quote">This platform connects me with inspiring designers daily.</blockquote>
          <div class="testimonial-author">
            <strong>Carlos Mendes</strong>
            <span>Graphic Artist</span>
          </div>
        </div>
        <div class="testimonial-item">
          <img src="https://picsum.photos/120/120?random=14" alt="Author" class="testimonial-image">
          <blockquote class="testimonial-quote">The trend insights here keep my work cutting-edge.</blockquote>
          <div class="testimonial-author">
            <strong>Aisha Khan</strong>
            <span>Product Designer</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Design Services Section -->
    <section class="services-section">
      <h2 class="section-title">What We Can Design For Free</h2>
      <p class="services-subtitle">A design-sharing community that can also help you create a full spectrum of 2D graphic design</p>
      <div class="services-grid">
        <div class="service-card portrait" style="--delay:0s">
          <div class="service-media">
            <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><radialGradient id='sv1' cx='30%' cy='30%' r='80%'><stop offset='0%' stop-color='%23ff6b6b'/><stop offset='50%' stop-color='%234ecdc4' stop-opacity='.8'/><stop offset='100%' stop-color='%230a0a0a' stop-opacity='1'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23sv1)'/></svg>" alt="Asset Graphics" class="service-image" />
          </div>
          <div class="service-content">
            <h3 class="service-title">Art Assets</h3>
            <p class="service-description">High-quality world-famous art assets and reusable component packs</p>
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
  --primary-color: #ffffff;
  --secondary-color: #f3f4f6;
  --accent-color: #e5e7eb;
  --text-primary: #ffffff;
  --text-secondary: #d1d5db;
  --text-muted: #9ca3af;
  --bg-primary: #0a0a0a;
  --bg-secondary: #1c2526;
  --bg-tertiary: #2e3b3e;
  --border-color: #444;
  --gradient-1: linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1);
  --gradient-2: linear-gradient(135deg, #667eea, #f093fb, #f5576c);
  --gradient-3: linear-gradient(135deg, #4facfe, #00f2fe, #38f9d7);
}

// Base styles
.design-homepage {
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  overflow-x: hidden;
  
  &.loaded {
    .banner-content,
    .hero-content,
    .feature-item,
    .stat-item,
    .trending-item,
    .testimonial-item,
    .cta-content {
      opacity: 1;
      transform: translateY(0);
    }
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
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease-out;
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
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s ease-out;
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
}

.stat-item {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease-out;
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
}

.service-card {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.6s ease-out forwards;
  animation-delay: var(--delay);
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
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease-out;
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
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s ease-out;
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
  background: rgba(255, 255, 255, 0.25);
  border: 2px solid rgba(255, 255, 255, 0.4);
  color: var(--text-primary);
  padding: 1rem 2.5rem;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.35);
    transform: translateY(-3px);
  }
}

.secondary-btn {
  background: transparent;
  border: 2px solid var(--accent-color);
  color: var(--accent-color);
  padding: 1rem 2rem;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-3px);
  }
}

// Animations
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Responsive Design
@media (max-width: 1024px) {
  .banner-container,
  .features-container,
  .trending-container {
    grid-template-columns: 1fr;
  }
  
  .banner-image {
    .banner-img {
      width: 95%;
      height: 480px;
    }
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
  .banner-title {
    font-size: 2.5rem;
  }
  
  .banner-subtitle {
    font-size: 1.5rem;
  }
  
  .banner-slogan {
    font-size: 1rem;
  }
  
  .banner-description {
    font-size: 0.95rem;
  }
  
  .banner-actions {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .hero-title {
    font-size: 3rem;
  }
  
  .hero-subtitle {
    font-size: 1.8rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .hero-actions {
    flex-direction: column;
    gap: 1rem;
  }
  
  .section-title {
    font-size: 2.2rem;
  }
  
  .features-large,
  .trending-large {
    .feature-item.large,
    .trending-item.large {
      .feature-image,
      .trending-image {
        height: 300px;
      }
      
      .feature-title,
      .trending-title {
        font-size: 1.6rem;
      }
      
      .feature-description,
      .trending-description {
        font-size: 0.95rem;
      }
    }
  }
  
  .cta-title {
    font-size: 2.2rem;
  }
  
  .cta-actions {
    flex-direction: column;
  }
}
</style>