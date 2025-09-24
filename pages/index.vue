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
    gradient: 'linear-gradient(135deg, #000000 0%, #111111 100%)'
  },
  {
    title: 'Fashion Forward',
    subtitle: 'Trending Styles',
    description: 'Discover the latest fashion trends and innovative design concepts',
    image: 'https://picsum.photos/1200/800?random=2',
    gradient: 'linear-gradient(135deg, #111111 0%, #1a1a1a 100%)'
  },
  {
    title: 'Design Community',
    subtitle: 'Connect & Collaborate',
    description: 'Connect with fellow designers and collaborate on amazing projects',
    image: 'https://picsum.photos/1200/800?random=3',
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)'
  }
])

// Features data
const features = ref([
  {
    icon: 'mdi-palette',
    title: 'Design Showcase',
    description: 'Upload and showcase your creative designs to a global audience',
    color: '#ffffff'
  },
  {
    icon: 'mdi-heart',
    title: 'Inspiration Hub',
    description: 'Discover endless inspiration from talented designers worldwide',
    color: '#f3f4f6'
  },
  {
    icon: 'mdi-account-group',
    title: 'Community',
    description: 'Connect with like-minded designers and build meaningful relationships',
    color: '#e5e7eb'
  },
  {
    icon: 'mdi-trending-up',
    title: 'Trending',
    description: 'Stay updated with the latest design trends and popular styles',
    color: '#d1d5db'
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
  <div class="openai-style-homepage" :class="{ 'loaded': isLoaded }">
    <!-- Central Banner -->
    <section class="central-banner">
      <div class="banner-background">
        <div class="gradient-overlay"></div>
      </div>
      <div class="banner-content">
        <h1 class="banner-title">1s Design</h1>
        <h2 class="banner-subtitle">1s Design is here</h2>
        <p class="banner-description">Our smartest, fastest, and most useful design platform yet.</p>
        <div class="banner-actions">
          <button class="primary-btn">Ask 1s Design</button>
          <button class="secondary-btn">
            <v-icon size="16">mdi-arrow-up</v-icon>
          </button>
        </div>
      </div>
    </section>

    <!-- Right Sidebar Content -->
    <aside class="right-sidebar">
      <!-- Content Card 1 -->
      <div class="content-card">
        <div class="card-background card-bg-1"></div>
        <div class="card-content">
          <div class="card-icon">
            <v-icon color="white" size="20">mdi-palette</v-icon>
          </div>
          <div class="card-text">
            <h3 class="card-title">Introducing Design AI and Creative API updates</h3>
            <div class="card-meta">
              <span class="card-category">Product</span>
              <span class="card-read-time">8 min read</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Card 2 -->
      <div class="content-card">
        <div class="card-background card-bg-2"></div>
        <div class="card-content">
          <div class="card-text">
            <h3 class="card-title">Open Models</h3>
            <div class="card-timestamp">0:40</div>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<style lang="scss" scoped>
// CSS Variables - OpenAI Style Theme
:root {
  --primary-color: #ffffff;
  --secondary-color: #f3f4f6;
  --accent-color: #e5e7eb;
  --text-primary: #ffffff;
  --text-secondary: #d1d5db;
  --text-muted: #9ca3af;
  --bg-primary: #000000;
  --bg-secondary: #111111;
  --bg-tertiary: #1a1a1a;
  --border-color: #333333;
  --gradient-1: linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57);
  --gradient-2: linear-gradient(135deg, #667eea, #764ba2, #f093fb, #f5576c);
  --gradient-3: linear-gradient(135deg, #4facfe, #00f2fe, #43e97b, #38f9d7);
}

// Base styles
.openai-style-homepage {
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  overflow-x: hidden;
  
  &.loaded {
    .banner-content,
    .content-card {
      opacity: 1;
      transform: translateY(0);
    }
  }
}


// Homepage specific styles
.openai-style-homepage {
  display: flex;
  min-height: 100vh;
  position: relative;
}

// Central Banner
.central-banner {
  position: relative;
  flex: 1;
  max-width: 600px;
  aspect-ratio: 16/10;
  border-radius: 16px;
  overflow: hidden;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--gradient-1);
  filter: blur(20px);
  opacity: 0.8;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.3), rgba(78, 205, 196, 0.3), rgba(69, 183, 209, 0.3));
}

.banner-content {
  position: relative;
  z-index: 2;
  padding: 3rem 2rem;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.banner-title {
  font-size: 4rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  line-height: 1;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
}

.banner-subtitle {
  font-size: 2rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
}

.banner-description {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
  line-height: 1.6;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.banner-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.primary-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
}

.secondary-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
}

// Right Sidebar
.right-sidebar {
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 250px;
  max-width: 350px;
  width: 25vw;
  flex-shrink: 0;
  
  @media (max-width: 1024px) {
    display: none;
  }
}

.content-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease-out forwards;
  
  &:hover {
    transform: translateY(-4px);
  }
  
  &:nth-child(1) {
    animation-delay: 0.1s;
  }
  
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
}

.card-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: blur(15px);
  opacity: 0.8;
}

.card-bg-1 {
  background: var(--gradient-2);
}

.card-bg-2 {
  background: var(--gradient-3);
}

.card-content {
  position: relative;
  z-index: 2;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-icon {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.card-text {
  flex: 1;
}

.card-title {
  color: white;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 0.5rem;
}

.card-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
}

.card-category {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.card-timestamp {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
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
@media (max-width: 1200px) {
  .right-sidebar {
    width: 20vw;
    min-width: 200px;
  }
}

@media (max-width: 1024px) {
  .openai-style-homepage {
    flex-direction: column;
  }
  
  .right-sidebar {
    display: none;
  }
  
  .central-banner {
    max-width: 100%;
    margin: 0;
  }
}

@media (max-width: 768px) {
  .header-content {
    padding: 1rem;
  }
  
  .banner-title {
    font-size: 2.5rem;
  }
  
  .banner-subtitle {
    font-size: 1.5rem;
  }
  
  .banner-actions {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .primary-btn {
    width: 100%;
  }
}
</style>
