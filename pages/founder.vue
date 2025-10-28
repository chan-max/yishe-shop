<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-01-27 11:00:00
 * @FilePath: /yishe-nuxt/pages/founder.vue
 * @Description: Founder Page - About the founder
-->
<script lang="ts" setup>
definePageMeta({ layout: 'page' })

// Page title and meta
useHead({
  titleTemplate: '',
  title: '关于创始人 - 1s Design',
  meta: [
    {
      name: 'description',
      content: '了解更多关于创始人的信息，探索设计背后的故事和灵感来源。'
    },
    {
      name: 'keywords',
      content: '创始人, founder, designer, 1s design founder'
    }
  ]
})

// 创始人信息
const founderInfo = ref({
  name: '陈设计师',
  role: 'UI/UX 设计师 & 全栈开发者',
  avatar: '/defaultAvatar/default-avatar-1.png',
  bio: '一位热爱创作的设计师和开发者，致力于将美学与技术完美结合。专注于用户界面设计、交互体验优化，以及前沿技术的探索与应用。',
  location: '北京, 中国',
  email: 'jackieontheway666@gmail.com',
  github: 'https://github.com/chan-max',
  website: 'https://1s.design',
  social: {
    twitter: 'https://twitter.com/chanmax',
    linkedin: 'https://linkedin.com/in/chanmax',
    dribbble: 'https://dribbble.com/chanmax',
    behance: 'https://behance.net/chanmax',
    instagram: 'https://instagram.com/chanmax'
  }
})

// 技能列表
const skills = ref([
  { name: 'UI 设计', level: 95, icon: 'mdi-brush' },
  { name: 'UX 设计', level: 90, icon: 'mdi-palette' },
  { name: '前端开发', level: 85, icon: 'mdi-code-tags' },
  { name: '产品设计', level: 88, icon: 'mdi-lightbulb' },
  { name: '品牌设计', level: 85, icon: 'mdi-image' },
  { name: '移动端设计', level: 90, icon: 'mdi-cellphone' }
])

// 工作经历
const experiences = ref([
  {
    company: '知名设计公司',
    position: '高级 UI/UX 设计师',
    period: '2022 - 至今',
    description: '负责核心产品的用户体验设计，带领设计团队完成多个重要项目的设计工作。'
  },
  {
    company: '互联网科技公司',
    position: '产品设计师',
    period: '2020 - 2022',
    description: '参与产品从 0 到 1 的设计过程，负责用户研究和交互设计。'
  },
  {
    company: '初创公司',
    position: '全栈设计师 & 开发者',
    period: '2018 - 2020',
    description: '兼任设计和开发工作，构建了完整的在线设计平台。'
  }
])

// 教育背景
const education = ref([
  {
    school: '设计学院',
    degree: '平面设计学士',
    period: '2014 - 2018',
    description: '专注于视觉传达和用户体验设计的学习与实践。'
  }
])
</script>

<template>
  <div class="founder-page">
    <div class="founder-container">
      <!-- Hero Section with Avatar -->
      <section class="founder-hero">
        <div class="founder-avatar">
          <img :src="founderInfo.avatar" :alt="founderInfo.name" class="avatar-image" />
        </div>
        <h1 class="founder-name">{{ founderInfo.name }}</h1>
        <p class="founder-role">{{ founderInfo.role }}</p>
        <p class="founder-location">
          <v-icon size="18" style="margin-right: 6px;">mdi-map-marker</v-icon>
          {{ founderInfo.location }}
        </p>
        
        <!-- Social Links -->
        <div class="founder-social">
          <a :href="founderInfo.github" target="_blank" rel="noopener" class="social-item" title="GitHub">
            <v-icon size="24">mdi-github</v-icon>
          </a>
          <a :href="'mailto:' + founderInfo.email" class="social-item" title="邮箱">
            <v-icon size="24">mdi-email</v-icon>
          </a>
          <a :href="founderInfo.social.linkedin" target="_blank" rel="noopener" class="social-item" title="LinkedIn">
            <v-icon size="24">mdi-linkedin</v-icon>
          </a>
          <a :href="founderInfo.social.dribbble" target="_blank" rel="noopener" class="social-item" title="Dribbble">
            <v-icon size="24">mdi-dribbble</v-icon>
          </a>
          <a :href="founderInfo.social.twitter" target="_blank" rel="noopener" class="social-item" title="Twitter">
            <v-icon size="24">mdi-twitter</v-icon>
          </a>
          <a :href="founderInfo.website" target="_blank" rel="noopener" class="social-item" title="个人网站">
            <v-icon size="24">mdi-link</v-icon>
          </a>
        </div>
      </section>

      <!-- About Section -->
      <section class="founder-section">
        <h2 class="section-title">关于我</h2>
        <p class="founder-bio">
          {{ founderInfo.bio }}
        </p>
      </section>

      <!-- Skills Section -->
      <section class="founder-section">
        <h2 class="section-title">技能专长</h2>
        <div class="skills-grid">
          <div v-for="skill in skills" :key="skill.name" class="skill-item">
            <div class="skill-header">
              <v-icon :icon="skill.icon" size="20" style="margin-right: 8px;" />
              <span class="skill-name">{{ skill.name }}</span>
              <span class="skill-percentage">{{ skill.level }}%</span>
            </div>
            <div class="skill-bar">
              <div class="skill-progress" :style="{ width: skill.level + '%' }"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Experience Section -->
      <section class="founder-section">
        <h2 class="section-title">工作经历</h2>
        <div class="timeline">
          <div v-for="(exp, index) in experiences" :key="index" class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <h3 class="timeline-title">{{ exp.position }}</h3>
              <p class="timeline-company">{{ exp.company }}</p>
              <p class="timeline-period">{{ exp.period }}</p>
              <p class="timeline-description">{{ exp.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Education Section -->
      <section class="founder-section">
        <h2 class="section-title">教育背景</h2>
        <div class="timeline">
          <div v-for="(edu, index) in education" :key="index" class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <h3 class="timeline-title">{{ edu.degree }}</h3>
              <p class="timeline-company">{{ edu.school }}</p>
              <p class="timeline-period">{{ edu.period }}</p>
              <p class="timeline-description">{{ edu.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="founder-section">
        <h2 class="section-title">联系方式</h2>
        <div class="contact-methods">
          <div class="contact-item">
            <v-icon>mdi-email</v-icon>
            <div class="contact-info">
              <h3>邮箱</h3>
              <a :href="'mailto:' + founderInfo.email">{{ founderInfo.email }}</a>
            </div>
          </div>
          <div class="contact-item">
            <v-icon>mdi-github</v-icon>
            <div class="contact-info">
              <h3>GitHub</h3>
              <a :href="founderInfo.github" target="_blank" rel="noopener">{{ founderInfo.github }}</a>
            </div>
          </div>
          <div class="contact-item">
            <v-icon>mdi-web</v-icon>
            <div class="contact-info">
              <h3>个人网站</h3>
              <a :href="founderInfo.website" target="_blank" rel="noopener">{{ founderInfo.website }}</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// CSS Variables
:root {
  --primary-color: #2563eb;
  --secondary-color: #f8fafc;
  --text-primary: #1e293b;
  --text-secondary: #475569;
  --text-muted: #94a3b8;
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --border-color: #e2e8f0;
  --accent-color: #64748b;
}

.founder-page {
  min-height: 100vh;
  background: var(--bg-primary);
  padding: 3rem 0;
  
  @media (max-width: 768px) {
    padding: 2rem 0;
  }
}

.founder-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem;
}

// Hero Section
.founder-hero {
  text-align: center;
  margin-bottom: 4rem;
  padding: 2rem 0;
}

.founder-avatar {
  margin-bottom: 1.5rem;
}

.avatar-image {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--border-color);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
}

.founder-name {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
}

.founder-role {
  font-size: 1.2rem;
  color: var(--primary-color);
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.founder-location {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.founder-social {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.social-item {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--primary-color);
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  }
}

// Sections
.founder-section {
  margin-bottom: 4rem;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
}

.founder-bio {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.8;
}

// Skills
.skills-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.skill-item {
  background: var(--bg-secondary);
  padding: 1.25rem;
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.skill-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
}

.skill-name {
  flex: 1;
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.95rem;
}

.skill-percentage {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-weight: 600;
}

.skill-bar {
  height: 8px;
  background: var(--border-color);
  border-radius: 4px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), #60a5fa);
  border-radius: 4px;
  transition: width 1s ease;
}

// Timeline
.timeline {
  position: relative;
  padding-left: 2rem;
  
  &::before {
    content: '';
    position: absolute;
    left: 8px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--border-color);
  }
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;
}

.timeline-marker {
  position: absolute;
  left: -25px;
  top: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--primary-color);
  border: 3px solid var(--bg-primary);
  box-shadow: 0 0 0 2px var(--primary-color);
}

.timeline-content {
  background: var(--bg-secondary);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
}

.timeline-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.timeline-company {
  font-size: 1rem;
  color: var(--primary-color);
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.timeline-period {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 0.75rem;
}

.timeline-description {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

// Contact Methods
.contact-methods {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.contact-item {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
  
  svg {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    color: var(--primary-color);
  }
}

.contact-info {
  flex: 1;
  
  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }
  
  a {
    font-size: 0.9rem;
    color: var(--text-secondary);
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: var(--primary-color);
    }
  }
}

// Responsive
@media (max-width: 768px) {
  .founder-container {
    padding: 0 1rem;
  }
  
  .founder-hero {
    margin-bottom: 3rem;
  }
  
  .founder-section {
    margin-bottom: 3rem;
  }
  
  .timeline {
    padding-left: 1.5rem;
  }
  
  .timeline-marker {
    left: -20px;
    width: 12px;
    height: 12px;
  }
  
  .contact-methods {
    grid-template-columns: 1fr;
  }
}
</style>

