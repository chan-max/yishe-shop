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
  role: 'UI/UX Designer & Full Stack Developer',
  avatar: '/me.jpg',
  bio: '一位热爱创作的设计师和开发者，致力于将美学与技术完美结合。凭借对用户体验的深刻理解和对技术创新的敏锐嗅觉，专注于打造既美观又实用的数字产品。相信设计不仅仅是视觉呈现，更是解决问题的艺术。',
  location: '北京, 中国',
  email: 'jackieontheway666@gmail.com',
  social: {
    github: 'https://github.com/chan-max',
    website: 'https://1s.design',
    twitter: 'https://twitter.com/chanmax',
    linkedin: 'https://linkedin.com/in/chanmax'
  }
})

// 技能列表
const skills = ref([
  'UI/UX Design',
  'Frontend Development',
  'Product Design',
  'Branding & Identity',
  'Web Design',
  'Mobile App Design',
  'User Research',
  'Prototyping',
  'Design Systems',
  'Motion Design',
  'Illustration',
  'Typography'
])

// 工作经历
const experiences = ref([
  {
    title: '创始人 & 产品设计师',
    company: '1s Design',
    period: '2022 - 至今',
    description: '创立 1s Design，专注于打造创新的设计工具和平台。带领团队进行产品设计、用户体验优化和技术开发，致力于为创作者提供更好的设计体验。'
  },
  {
    title: '高级 UI/UX 设计师',
    company: '知名互联网公司',
    period: '2020 - 2022',
    description: '负责核心产品线的用户体验设计，参与多个百万用户级别产品的设计工作，积累了丰富的产品设计和技术实现经验。'
  },
  {
    title: '全栈设计师 & 开发者',
    company: '初创公司',
    period: '2018 - 2020',
    description: '作为早期团队成员，从前端到后端全面参与产品开发，既负责界面设计也负责技术实现，培养了全栈思维。'
  }
])
</script>

<template>
  <div class="founder-page">
    <div class="founder-container">
      <!-- 顶部信息区 -->
      <header class="profile-header">
        <div class="profile-avatar">
          <img :src="founderInfo.avatar" :alt="founderInfo.name" class="avatar" />
        </div>
        <div class="profile-info">
          <h1 class="name">{{ founderInfo.name }}</h1>
          <p class="role">{{ founderInfo.role }}</p>
          <p class="bio">{{ founderInfo.bio }}</p>
          
          <!-- 社交链接 -->
          <div class="social">
            <a :href="founderInfo.social.github" target="_blank" rel="noopener" class="social-link">
              <v-icon size="18">mdi-github</v-icon>
            </a>
            <a :href="founderInfo.social.website" target="_blank" rel="noopener" class="social-link">
              <v-icon size="18">mdi-web</v-icon>
            </a>
            <a :href="founderInfo.social.twitter" target="_blank" rel="noopener" class="social-link">
              <v-icon size="18">mdi-twitter</v-icon>
            </a>
            <a :href="founderInfo.social.linkedin" target="_blank" rel="noopener" class="social-link">
              <v-icon size="18">mdi-linkedin</v-icon>
            </a>
            <a :href="'mailto:' + founderInfo.email" class="social-link">
              <v-icon size="18">mdi-email</v-icon>
            </a>
          </div>
        </div>
      </header>

      <!-- 内容区 -->
      <main class="content">
        <!-- 个人简介 -->
        <section class="section">
          <h2 class="section-title">关于我</h2>
          <div class="about-me">
            <p class="about-text">
              我是一位对设计和开发充满热情的全栈设计师，深信优秀的用户体验来源于对用户需求的深度理解和技术能力的完美融合。
            </p>
            <p class="about-text">
              在 1s Design，我致力于打造既美观又实用的数字产品，为创作者提供更好的设计工具和体验。我相信设计不仅仅是视觉呈现，更是解决问题的艺术。
            </p>
            <p class="about-text">
              对于每一个产品，我都倾注了心血，从用户研究、原型设计到最终实现，确保每一个细节都能为用户带来价值。
            </p>
          </div>
        </section>

        <!-- 技能 -->
        <section class="section">
          <h2 class="section-title">核心技能</h2>
          <div class="skills">
            <span v-for="skill in skills" :key="skill" class="skill-tag">
              {{ skill }}
            </span>
          </div>
        </section>

        <!-- 工作经历 -->
        <section class="section">
          <h2 class="section-title">工作经历</h2>
          <div class="experiences">
            <div v-for="(exp, index) in experiences" :key="index" class="experience-item">
              <div class="experience-period">{{ exp.period }}</div>
              <div class="experience-details">
                <h3 class="experience-title">{{ exp.title }}</h3>
                <p class="experience-company">{{ exp.company }}</p>
                <p v-if="exp.description" class="experience-description">{{ exp.description }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 联系方式 -->
        <section class="section">
          <h2 class="section-title">联系方式</h2>
          <div class="contact">
            <a :href="'mailto:' + founderInfo.email" class="contact-link">
              <v-icon size="20">mdi-email</v-icon>
              <span>{{ founderInfo.email }}</span>
            </a>
            <a :href="founderInfo.social.website" target="_blank" rel="noopener" class="contact-link">
              <v-icon size="20">mdi-web</v-icon>
              <span>{{ founderInfo.social.website }}</span>
            </a>
            <div class="contact-link">
              <v-icon size="20">mdi-map-marker</v-icon>
              <span>{{ founderInfo.location }}</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.founder-page {
  min-height: 100vh;
  background: #fafafa;
  padding: 3rem 0;
  
  @media (max-width: 768px) {
    padding: 1.5rem 0;
  }
}

.founder-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
}

// 顶部信息区
.profile-header {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 2.5rem;
  margin-bottom: 3rem;
  padding: 2.5rem;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    text-align: center;
    padding: 2rem 1.5rem;
  }
}

.profile-avatar {
  width: 120px;
  height: 120px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    margin: 0 auto;
  }
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
}

.profile-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.name {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
  letter-spacing: -0.02em;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
}

.role {
  font-size: 1rem;
  color: #6b7280;
  margin: 0 0 1.25rem 0;
  font-weight: 500;
}

.bio {
  font-size: 0.95rem;
  color: #4b5563;
  line-height: 1.7;
  margin: 0 0 1.75rem 0;
  max-width: 100%;
}

.social {
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
}

.social-link {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  text-decoration: none;
  background: #f9fafb;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    color: #111827;
    background: #f3f4f6;
    transform: translateY(-2px);
  }
}

// 内容区
.content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 2rem;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
}

.section-title {
  font-size: 1.375rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
  letter-spacing: -0.01em;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #f3f4f6;
}

// 关于我
.about-me {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 0.5rem;
}

.about-text {
  font-size: 0.95rem;
  color: #4b5563;
  line-height: 1.75;
  margin: 0;
}

// 技能
.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  padding: 0.5rem 1rem;
  background: #f9fafb;
  color: #374151;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f3f4f6;
    border-color: #d1d5db;
    transform: translateY(-1px);
  }
}

// 工作经历
.experiences {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.experience-item {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 2rem;
  padding: 1.25rem;
  border-radius: 8px;
  border: 1px solid #f3f4f6;
  background: #fafafa;
  transition: all 0.2s ease;
  
  &:hover {
    background: #ffffff;
    border-color: #e5e7eb;
    transform: translateX(2px);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
}

.experience-period {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
  white-space: nowrap;
}

.experience-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.experience-title {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.25rem 0;
}

.experience-company {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0 0 0.5rem 0;
  font-weight: 500;
}

.experience-description {
  font-size: 0.9rem;
  color: #4b5563;
  line-height: 1.65;
  margin: 0;
}

// 联系方式
.contact {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #4b5563;
  text-decoration: none;
  padding: 0.875rem 1rem;
  border-radius: 8px;
  background: #fafafa;
  border: 1px solid #f3f4f6;
  transition: all 0.2s ease;
  
  &:hover {
    color: #111827;
    background: #ffffff;
    border-color: #e5e7eb;
    transform: translateX(4px);
  }
  
  svg {
    flex-shrink: 0;
    color: #6b7280;
  }
}

// 响应式
@media (max-width: 768px) {
  .experience-item {
    padding: 1rem;
  }
}
</style>
