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
  name: '陈政',
  englishName: 'Jackie Chan',
  role: 'UI/UX 设计师 & 全栈开发工程师 & 素材收藏家 & 自动化工具专家 & 产品设计师',
  avatar: '/me.jpg',
  bio: '一位热爱创作的设计师和开发者，致力于将美学与技术完美结合。凭借对用户体验的深刻理解和对技术创新的敏锐嗅觉，专注于打造既美观又实用的数字产品。相信设计不仅仅是视觉呈现，更是解决问题的艺术。',
  location: '北京, 中国',
  email: 'jackieontheway666@gmail.com',
  phones: ['18742539196', '13224229196'],
  social: {
    github: 'https://github.com/chan-max',
    website: 'https://1s.design'
  }
})

// 技能列表
const skills = ref([
  'UI/UX 设计',
  '前端开发',
  '产品设计',
  '品牌形象',
  '网页设计',
  '移动端设计',
  '用户研究',
  '原型设计',
  '设计系统',
  '动效设计',
  '插画设计',
  '字体设计'
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
          <h1 class="name">{{ founderInfo.name }} <span class="english-name">{{ founderInfo.englishName }}</span></h1>
          <p class="role">{{ founderInfo.role }}</p>
          <p class="bio">{{ founderInfo.bio }}</p>
          
          <!-- 联系方式 -->
          <div class="profile-contact">
            <a :href="'mailto:' + founderInfo.email" class="contact-item">
              <v-icon size="18">mdi-email</v-icon>
              <span>{{ founderInfo.email }}</span>
            </a>
            <a :href="founderInfo.social.github" target="_blank" rel="noopener" class="contact-item">
              <v-icon size="18">mdi-github</v-icon>
              <span>GitHub</span>
            </a>
            <div class="phones-group">
              <a :href="'tel:' + founderInfo.phones[0]" class="contact-item">
                <v-icon size="18">mdi-phone</v-icon>
                <span>{{ founderInfo.phones[0] }}</span>
              </a>
              <a :href="'tel:' + founderInfo.phones[1]" class="contact-item">
                <v-icon size="18">mdi-phone</v-icon>
                <span>{{ founderInfo.phones[1] }}</span>
              </a>
            </div>
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

      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.founder-page {
  min-height: 100vh;
  background: #ffffff;
  padding: 4rem 0;
  
  @media (max-width: 768px) {
    padding: 2rem 0;
  }
}

.founder-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem;
}

// 顶部信息区
.profile-header {
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid #e5e7eb;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
}

.profile-avatar {
  width: 60px;
  height: 60px;
  
  @media (max-width: 768px) {
    margin: 0 auto;
  }
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.profile-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.name {
  font-size: 2.5rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
}

.english-name {
  font-size: 1.5rem;
  font-weight: 400;
  color: #6b7280;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
}

.role {
  font-size: 1rem;
  color: #6b7280;
  margin: 0 0 1rem 0;
  line-height: 1.6;
}

.bio {
  font-size: 1rem;
  color: #4b5563;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
  max-width: 500px;
}

// 联系方式
.profile-contact {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
}

.phones-group {
  display: flex;
  gap: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4b5563;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s;
  
  &:hover {
    color: #111827;
  }
  
  svg {
    flex-shrink: 0;
  }
}

// 内容区
.content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

// 关于我
.about-me {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.about-text {
  font-size: 1rem;
  color: #4b5563;
  line-height: 1.8;
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
  border-radius: 6px;
  font-size: 0.9rem;
  transition: all 0.2s;
  
  &:hover {
    background: #f3f4f6;
    border-color: #d1d5db;
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
  grid-template-columns: 180px 1fr;
  gap: 2rem;
  padding: 1.5rem 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
}

.experience-period {
  font-size: 0.9rem;
  color: #6b7280;
  font-weight: 500;
}

.experience-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.experience-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.experience-company {
  font-size: 1rem;
  color: #6b7280;
  margin: 0 0 0.5rem 0;
}

.experience-description {
  font-size: 0.95rem;
  color: #4b5563;
  line-height: 1.6;
  margin: 0;
}

// 响应式
@media (max-width: 768px) {
  .founder-container {
    padding: 0 1rem;
  }
  
  .experience-item {
    padding: 1rem 0;
  }
}
</style>
