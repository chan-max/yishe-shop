<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-01-27 11:00:00
 * @FilePath: /yishe-nuxt/pages/about.vue
 * @Description: About Page - Learn more about 1s Design
-->
<script lang="ts" setup>
definePageMeta({ layout: "page" });

// Page title and meta
useHead({
  titleTemplate: "",
  title: "关于衣设 - POD 印花与定制设计开放平台",
  meta: [
    {
      name: "description",
      content: "了解衣设 yishe，一个面向品牌、创作者和个人用户的 POD 印花、定制商品与创意设计开放平台。",
    },
    {
      name: "keywords",
      content: "衣设,1s.design,POD平台,印花设计,定制商品,私人定制,创意设计平台",
    },
  ],
});
</script>

<template>
  <div class="about-page">
    <div class="about-container">
      <!-- Hero Section -->
      <section class="about-hero">
        <h1 class="about-title">关于衣设</h1>
        <p class="about-subtitle">一个连接图案、商品和私人表达的创意设计平台。</p>
      </section>

      <!-- Mission Section -->
      <section class="about-section">
        <h2 class="section-title">我们的使命</h2>
        <p class="section-content">
          我们相信好的设计应该从灵感走向真实产品。衣设把 POD 印花、定制商品、
          视觉素材和设计师服务连接起来，让创作者和品牌更快完成表达。
        </p>
      </section>

      <!-- Vision Section -->
      <section class="about-section">
        <h2 class="section-title">我们的愿景</h2>
        <p class="section-content">
          让一张图案、一句主题或一份纪念心意，延展成可以穿出去、送出去、摆出来的定制商品。
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
            <h3 class="value-title">表达优先</h3>
            <p class="value-description">
              我们先关心这件东西有没有态度，再关心它有没有被解释清楚。
            </p>
          </div>

          <div class="value-card">
            <div class="value-icon">
              <v-icon size="32" color="primary">mdi-account-group</v-icon>
            </div>
            <h3 class="value-title">门槛要低</h3>
            <p class="value-description">
              不会画图、没学过设计，也不该妨碍你做一件像自己的东西。
            </p>
          </div>

          <div class="value-card">
            <div class="value-icon">
              <v-icon size="32" color="primary">mdi-star</v-icon>
            </div>
            <h3 class="value-title">审美要真</h3>
            <p class="value-description">
              衣设不会什么都迎合。我们更在意留下来的内容，是不是值得被穿、被留、被记住。
            </p>
          </div>
        </div>
      </section>

      <!-- Team Section -->
      <section class="about-section">
        <h2 class="section-title">我们的团队</h2>
        <p class="section-content">
          我们由设计、产品和技术共同构建衣设，让图案资源、商品展示、定制服务和内容发布保持同一套审美标准。
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
