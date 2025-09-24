<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-09-24 18:35:00
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

// Features data with large left, small right layout
const features = ref([
  {
    icon: 'mdi-palette',
    title: 'Design Showcase',
    description: 'Display your creative work in stunning detail to captivate a global audience.',
    image: 'https://picsum.photos/600/400?random=4',
    isLarge: true
  },
  {
    icon: 'mdi-heart',
    title: 'Inspiration Hub',
    description: 'Explore a curated collection of innovative designs.',
    image: 'https://picsum.photos/300/200?random=5',
    isLarge: false
  },
  {
    icon: 'mdi-account-group',
    title: 'Community',
    description: 'Connect with like-minded creators and collaborate.',
    image: 'https://picsum.photos/300/200?random=6',
    isLarge: false
  },
  {
    icon: 'mdi-trending-up',
    title: 'Trend Pulse',
    description: 'Stay updated with the latest design trends.',
    image: 'https://picsum.photos/300/200?random=7',
    isLarge: false
  }
])

// Stats data
const stats = ref([
  { number: '15K+', label: 'Designs Shared' },
  { number: '8K+', label: 'Active Designers' },
  { number: '70+', label: 'Countries' },
  { number: '3M+', label: 'Monthly Views' }
])

// Trending Designs data with varied sizes
const trendingDesigns = ref([
  {
    title: 'Bold Minimalism',
    description: 'Sleek designs with clean lines and elegance',
    image: 'https://picsum.photos/800/600?random=8',
    author: 'Designer A',
    likes: 2450,
    isLarge: true
  },
  {
    title: 'Street Vibes',
    description: 'Urban-inspired graphics and patterns',
    image: 'https://picsum.photos/400/300?random=9',
    author: 'Designer B',
    likes: 1789,
    isLarge: false
  },
  {
    title: 'Eco Chic',
    description: 'Sustainable fashion with a modern twist',
    image: 'https://picsum.photos/400/300?random=10',
    author: 'Designer C',
    likes: 1923,
    isLarge: false
  },
  {
    title: 'Tech Fusion',
    description: 'Futuristic designs blending tech and style',
    image: 'https://picsum.photos/400/300?random=11',
    author: 'Designer D',
    likes: 2678,
    isLarge: false
  }
])

// Testimonials data
const testimonials = ref([
  {
    quote: '1s Design has transformed how I share my creative vision!',
    author: 'Sophie Lin',
    role: 'Fashion Designer',
    image: 'https://picsum.photos/120/120?random=12'
  },
  {
    quote: 'This platform connects me with inspiring designers daily.',
    author: 'Carlos Mendes',
    role: 'Graphic Artist',
    image: 'https://picsum.photos/120/120?random=13'
  },
  {
    quote: 'The trend insights here keep my work cutting-edge.',
    author: 'Aisha Khan',
    role: 'Product Designer',
    image: 'https://picsum.photos/120/120?random=14'
  }
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
  <div class="design-homepage" :class="{ 'loaded': isLoaded }">
    <!-- Banner Section with Large Left Image, Small Right Text -->
    <section class="banner-section">
      <div class="banner-container">
        <div class="banner-image">
          <img src="https://picsum.photos/800/600?random=15" alt="Banner Image" class="banner-img">
        </div>
        <div class="banner-content">
          <h1 class="banner-title">1s Design</h1>
          <h2 class="banner-subtitle">1s Design is here</h2>
          <p class="banner-slogan">Art comes from life and returns to life.</p>
          <p class="banner-description">Our smartest, fastest, and most useful design platform yet.</p>
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
      <div v-for="(slide, index) in heroSlides" :key="index" class="hero-slide" :class="{ active: currentSlide === index }">
        <div class="hero-background" :style="{ backgroundImage: `url(${slide.image})`, backgroundGradient: slide.gradient }"></div>
        <div class="hero-content">
          <h1 class="hero-title">{{ slide.title }}</h1>
          <h2 class="hero-subtitle">{{ slide.subtitle }}</h2>
          <p class="hero-description">{{ slide.description }}</p>
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
          <div class="feature-item large" v-if="features[0]">
            <img :src="features[0].image" alt="Feature Image" class="feature-image">
            <div class="feature-content">
              <v-icon :color="features[0].color" size="48" class="feature-icon">{{ features[0].icon }}</v-icon>
              <h3 class="feature-title">{{ features[0].title }}</h3>
              <p class="feature-description">{{ features[0].description }}</p>
            </div>
          </div>
        </div>
        <div class="features-small">
          <div v-for="(feature, index) in features.slice(1)" :key="index" class="feature-item small">
            <img :src="feature.image" alt="Feature Image" class="feature-image">
            <div class="feature-content">
              <v-icon :color="feature.color" size="32" class="feature-icon">{{ feature.icon }}</v-icon>
              <h3 class="feature-title">{{ feature.title }}</h3>
              <p class="feature-description">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="stats-container">
        <div v-for="(stat, index) in stats" :key="index" class="stat-item">
          <h3 class="stat-number">{{ stat.number }}</h3>
          <p class="stat-label">{{ stat.label }}</p>
        </div>
      </div>
    </section>

    <!-- Trending Designs Section with Large Left, Small Right -->
    <section class="trending-section">
      <h2 class="section-title">Trending Designs</h2>
      <div class="trending-container">
        <div class="trending-large">
          <div class="trending-item large" v-if="trendingDesigns[0]">
            <img :src="trendingDesigns[0].image" alt="Trending Design" class="trending-image">
            <div class="trending-overlay">
              <h3 class="trending-title">{{ trendingDesigns[0].title }}</h3>
              <p class="trending-description">{{ trendingDesigns[0].description }}</p>
              <div class="trending-meta">
                <span>By {{ trendingDesigns[0].author }}</span>
                <span><v-icon size="18">mdi-heart</v-icon> {{ trendingDesigns[0].likes }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="trending-small">
          <div v-for="(design, index) in trendingDesigns.slice(1)" :key="index" class="trending-item small">
            <img :src="design.image" alt="Trending Design" class="trending-image">
            <div class="trending-overlay">
              <h3 class="trending-title">{{ design.title }}</h3>
              <p class="trending-description">{{ design.description }}</p>
              <div class="trending-meta">
                <span>By {{ design.author }}</span>
                <span><v-icon size="16">mdi-heart</v-icon> {{ design.likes }}</span>
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
        <div v-for="(testimonial, index) in testimonials" :key="index" class="testimonial-item">
          <img :src="testimonial.image" alt="Author" class="testimonial-image">
          <blockquote class="testimonial-quote">{{ testimonial.quote }}</blockquote>
          <div class="testimonial-author">
            <strong>{{ testimonial.author }}</strong>
            <span>{{ testimonial.role }}</span>
          </div>
        </div>
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
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;
}

.banner-image {
  .banner-img {
    width: 100%;
    height: 500px;
    object-fit: cover;
    border-radius: 12px;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.02);
    }
  }
}

.banner-content {
  padding: 2rem;
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
      height: 400px;
      object-fit: cover;
    }
    
    .feature-content {
      padding: 2rem;
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
      height: 150px;
      object-fit: cover;
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
    }
    
    .trending-title {
      font-size: 1.8rem;
    }
    
    .trending-description {
      font-size: 1rem;
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
      height: 200px;
      object-fit: cover;
    }
    
    .trending-title {
      font-size: 1.1rem;
    }
    
    .trending-description {
      font-size: 0.85rem;
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
      height: 350px;
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