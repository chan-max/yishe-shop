<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-01-27 11:00:00
 * @FilePath: /yishe-nuxt/pages/about.vue
 * @Description: About Page - Learn more about 1s Design
-->
<script lang="ts" setup>
definePageMeta({ layout: 'page' })

// Page title and meta
useHead({
  titleTemplate: '',
  title: 'About - 1s Design',
  meta: [
    {
      name: 'description',
      content: 'Learn more about 1s Design - the ultimate platform for creative designers to showcase their work and connect with the global design community.'
    },
    {
      name: 'keywords',
      content: 'about 1s design, design platform, creative community, design showcase'
    }
  ]
})
</script>

<template>
  <div class="about-page">
    <div class="about-container">
      <!-- Hero Section -->
      <section class="about-hero">
        <h1 class="about-title">关于衣设</h1>
        <p class="about-subtitle">
          为创意设计师打造的优质平台，展示作品，探索灵感，连接全球设计社区。
        </p>
      </section>

      <!-- Mission Section -->
      <section class="about-section">
        <h2 class="section-title">我们的使命</h2>
        <p class="section-content">
          我们相信优秀的设计具有启发、连接和改变世界的力量。我们的使命是为设计师提供一个展示创意、
          相互学习并在设计社区内建立有意义联系的平台。
        </p>
      </section>

      <!-- Vision Section -->
      <section class="about-section">
        <h2 class="section-title">我们的愿景</h2>
        <p class="section-content">
          成为世界领先的设计社区平台，让每一位设计师都能找到自己的声音，分享自己的愿景，
          为全球创意生态系统做出贡献。
        </p>
      </section>

      <!-- Values Section -->
      <section class="about-section">
        <h2 class="section-title">我们的价值观</h2>
        <div class="values-grid">
          <div class="value-card">
            <div class="value-icon">
              <v-icon size="32" color="primary">mdi-lightbulb</v-icon>
            </div>
            <h3 class="value-title">创新</h3>
            <p class="value-description">
              我们庆祝并培育各种形式的创意表达。
            </p>
          </div>
          
          <div class="value-card">
            <div class="value-icon">
              <v-icon size="32" color="primary">mdi-account-group</v-icon>
            </div>
            <h3 class="value-title">社区</h3>
            <p class="value-description">
              我们相信社区的力量能够启发和支持成长。
            </p>
          </div>
          
          <div class="value-card">
            <div class="value-icon">
              <v-icon size="32" color="primary">mdi-star</v-icon>
            </div>
            <h3 class="value-title">卓越</h3>
            <p class="value-description">
              我们力求在所做的每一件事和支持的每一件事上都追求卓越。
            </p>
          </div>
        </div>
      </section>

      <!-- Team Section -->
      <section class="about-section">
        <h2 class="section-title">我们的团队</h2>
        <p class="section-content">
          我们是一支充满热情的设计师、开发者和创意工作者团队，相信设计的变革力量。
          我们不同的背景和专业能力汇聚在一起，创造一个为全球设计社区服务的平台。
        </p>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// CSS Variables - Pure Black Theme
:root {
  --primary-color: #ffffff;
  --text-primary: #ffffff;
  --text-secondary: #d1d5db;
  --text-muted: #9ca3af;
  --bg-primary: #000000;
  --bg-secondary: #111111;
  --bg-tertiary: #1a1a1a;
  --border-color: #333333;
}

.about-page {
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
  padding: 2rem 0;
}

.about-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
}

.about-hero {
  text-align: center;
  margin-bottom: 4rem;
  padding: 2rem 0;
}

.about-title {
  font-size: 3rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
}

.about-subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
}

.about-section {
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
}

.section-content {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 1rem;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.value-card {
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }
}

.value-icon {
  margin-bottom: 1rem;
}

.value-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.value-description {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

// Responsive Design
@media (max-width: 768px) {
  .about-container {
    padding: 0 1rem;
  }
  
  .about-hero {
    margin-bottom: 2rem;
    padding: 1rem 0;
  }
  
  .about-section {
    margin-bottom: 2rem;
  }
  
  .values-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .value-card {
    padding: 1.5rem;
  }
}
</style>