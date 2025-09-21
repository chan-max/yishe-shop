<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-09-21 19:52:08
 * @FilePath: /yishe-nuxt/pages/index.vue
 * @Description: 1s Design - Creative Design Sharing Platform Homepage
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

// Hero section data
const heroSlides = ref([
  {
    title: 'Creative Design',
    subtitle: 'Share Your Vision',
    description: 'Join thousands of designers sharing their creative work and inspiring others',
    image: 'https://picsum.photos/1200/800?random=1',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    title: 'Fashion Forward',
    subtitle: 'Trending Styles',
    description: 'Discover the latest fashion trends and innovative design concepts',
    image: 'https://picsum.photos/1200/800?random=2',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    title: 'Design Community',
    subtitle: 'Connect & Collaborate',
    description: 'Connect with fellow designers and collaborate on amazing projects',
    image: 'https://picsum.photos/1200/800?random=3',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  }
])

// Features data
const features = ref([
  {
    icon: 'mdi-palette',
    title: 'Design Showcase',
    description: 'Upload and showcase your creative designs to a global audience',
    color: '#667eea'
  },
  {
    icon: 'mdi-heart',
    title: 'Inspiration Hub',
    description: 'Discover endless inspiration from talented designers worldwide',
    color: '#f093fb'
  },
  {
    icon: 'mdi-account-group',
    title: 'Community',
    description: 'Connect with like-minded designers and build meaningful relationships',
    color: '#4facfe'
  },
  {
    icon: 'mdi-trending-up',
    title: 'Trending',
    description: 'Stay updated with the latest design trends and popular styles',
    color: '#43e97b'
  }
])

// Stats data
const stats = ref([
  { number: '10K+', label: 'Designs Shared' },
  { number: '5K+', label: 'Active Designers' },
  { number: '50+', label: 'Countries' },
  { number: '1M+', label: 'Monthly Views' }
])

// Initialize animations
onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
  
  // Auto-rotate hero slides
  setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % heroSlides.value.length
  }, 5000)
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
  <div class="homepage" :class="{ 'loaded': isLoaded }">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-slides">
        <div 
          v-for="(slide, index) in heroSlides" 
          :key="index"
          class="hero-slide"
          :class="{ 'active': currentSlide === index }"
          :style="{ backgroundImage: `url(${slide.image})` }"
        >
          <div class="hero-overlay" :style="{ background: slide.gradient }"></div>
          <div class="hero-content">
            <div class="hero-text">
              <h1 class="hero-title">{{ slide.title }}</h1>
              <h2 class="hero-subtitle">{{ slide.subtitle }}</h2>
              <p class="hero-description">{{ slide.description }}</p>
              <div class="hero-actions">
                <v-btn
                  size="large"
                  color="white"
                  variant="flat"
                  @click="goToSearch"
                  class="hero-btn primary"
                >
                  <v-icon left>mdi-magnify</v-icon>
                  Explore Designs
                </v-btn>
                <v-btn
                  size="large"
                  color="white"
                  variant="outlined"
                  @click="goToExplore"
                  class="hero-btn secondary"
                >
                  <v-icon left>mdi-tshirt-crew</v-icon>
                  Fashion Design
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Hero Navigation Dots -->
      <div class="hero-dots">
        <button
          v-for="(slide, index) in heroSlides"
          :key="index"
          class="hero-dot"
          :class="{ 'active': currentSlide === index }"
          @click="currentSlide = index"
        ></button>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div 
            v-for="(stat, index) in stats" 
            :key="index"
            class="stat-item"
            :style="{ '--delay': `${index * 0.1}s` }"
          >
            <div class="stat-number">{{ stat.number }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Why Choose 1s Design?</h2>
          <p class="section-subtitle">A platform built by designers, for designers</p>
        </div>
        
        <div class="features-grid">
          <div 
            v-for="(feature, index) in features" 
            :key="index"
            class="feature-card"
            :style="{ '--delay': `${index * 0.1}s` }"
          >
            <div class="feature-icon" :style="{ backgroundColor: feature.color }">
              <v-icon>{{ feature.icon }}</v-icon>
            </div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">Ready to Share Your Designs?</h2>
          <p class="cta-description">
            Join our community of creative designers and start sharing your amazing work today.
          </p>
          <div class="cta-actions">
            <v-btn
              size="x-large"
              color="primary"
              variant="flat"
              @click="goToSearch"
              class="cta-btn"
            >
              <v-icon left>mdi-upload</v-icon>
              Start Sharing
            </v-btn>
            <v-btn
              size="x-large"
              color="white"
              variant="outlined"
              @click="goToExplore"
              class="cta-btn"
            >
              <v-icon left>mdi-eye</v-icon>
              Browse Designs
            </v-btn>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
// CSS Variables
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --accent-color: #f093fb;
  --text-primary: #2d3748;
  --text-secondary: #4a5568;
  --text-muted: #718096;
  --bg-primary: #ffffff;
  --bg-secondary: #f7fafc;
  --border-color: #e2e8f0;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);
}

// Dark mode variables
.dark {
  --text-primary: #f7fafc;
  --text-secondary: #e2e8f0;
  --text-muted: #a0aec0;
  --bg-primary: #1a202c;
  --bg-secondary: #2d3748;
  --border-color: #4a5568;
}

// Base styles
.homepage {
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: all 0.3s ease;
  
  &.loaded {
    .hero-slide,
    .stat-item,
    .feature-card {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

// Hero Section
.hero-section {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.hero-slides {
  position: relative;
  width: 100%;
  height: 100%;
}

.hero-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0;
  transform: scale(1.1);
  transition: all 1s ease-in-out;
  
  &.active {
    opacity: 1;
    transform: scale(1);
  }
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
}

.hero-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
}

.hero-text {
  max-width: 800px;
  animation: fadeInUp 1s ease-out;
}

.hero-title {
  font-size: 4rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  line-height: 1.1;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
}

.hero-subtitle {
  font-size: 2rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
}

.hero-description {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2.5rem;
  line-height: 1.6;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-btn {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  text-transform: none;
  box-shadow: var(--shadow-lg);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-xl);
  }
  
  &.primary {
    background: white;
    color: var(--primary-color);
  }
  
  &.secondary {
    background: transparent;
    color: white;
    border: 2px solid white;
  }
}

.hero-dots {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 3;
}

.hero-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &.active {
    background: white;
    transform: scale(1.2);
  }
  
  &:hover {
    transform: scale(1.1);
  }
}

// Stats Section
.stats-section {
  padding: 4rem 0;
  background: var(--bg-secondary);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.stat-item {
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.6s ease-out forwards;
  animation-delay: var(--delay);
}

.stat-number {
  font-size: 3rem;
  font-weight: 800;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  line-height: 1;
}

.stat-label {
  font-size: 1.1rem;
  color: var(--text-secondary);
  font-weight: 500;
}

// Features Section
.features-section {
  padding: 6rem 0;
  background: var(--bg-primary);
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
}

.section-subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: var(--bg-primary);
  padding: 2.5rem 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.6s ease-out forwards;
  animation-delay: var(--delay);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-xl);
  }
}

.feature-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 2rem;
  box-shadow: var(--shadow-md);
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.feature-description {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

// CTA Section
.cta-section {
  padding: 6rem 0;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  color: white;
  text-align: center;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
}

.cta-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
}

.cta-description {
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  line-height: 1.6;
}

.cta-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-btn {
  padding: 1.25rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  text-transform: none;
  box-shadow: var(--shadow-lg);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-xl);
  }
}

// Animations
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Responsive Design
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .hero-actions,
  .cta-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .hero-btn,
  .cta-btn {
    width: 100%;
    max-width: 300px;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .hero-content {
    padding: 1rem;
  }
  
  .feature-card {
    padding: 2rem 1.5rem;
  }
}
</style>
