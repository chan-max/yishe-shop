<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-10-28 21:59:57
 * @FilePath: /yishe-nuxt/pages/founder.vue
 * @Description: Founder Page - About the founder
-->
<script lang="ts" setup>
definePageMeta({ layout: 'page' })

// Page title and meta
useHead({
  titleTemplate: '',
  title: '陈政 Jackie Chan - 全栈开发工程师 & 产品设计师 | 1s Design 创始人',
  meta: [
    {
      name: 'description',
      content: '陈政（Jackie Chan），1s Design、衣设网创始人，全栈开发工程师、UI/UX设计师、产品设计师。专注于前后端开发、自动化工具、数据爬虫、设计素材收集。善于将艺术与代码结合，打造优质设计工具和产品。'
    },
    {
      name: 'keywords',
      content: '陈政, Jackie Chan, 1s Design, 衣设网, 1s.design, 全栈开发, 前端开发, 后端开发, UI设计, UX设计, 产品设计, 视觉设计, Node.js, Vue.js, JavaScript, 自动化工具, 数据爬虫, 设计素材, 字体收集, 设计师, 程序员, 艺术创作, 设计工具, 创始人, founder, designer, developer, full-stack developer, UI/UX designer, product designer'
    },
    {
      name: 'author',
      content: '陈政 (Jackie Chan)'
    },
    {
      property: 'og:title',
      content: '陈政 Jackie Chan - 全栈开发工程师 & 产品设计师 | 1s Design 创始人'
    },
    {
      property: 'og:description',
      content: '陈政（Jackie Chan），1s Design、衣设网创始人，全栈开发工程师、UI/UX设计师、产品设计师。专注于前后端开发、自动化工具、数据爬虫、设计素材收集。'
    },
    {
      property: 'og:type',
      content: 'profile'
    },
    {
      property: 'og:url',
      content: 'https://1s.design/founder'
    },
    {
      property: 'og:image',
      content: 'https://1s.design/me.jpg'
    },
    {
      property: 'profile:first_name',
      content: '陈'
    },
    {
      property: 'profile:last_name',
      content: '政'
    },
    {
      property: 'profile:username',
      content: 'Jackie Chan'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: '陈政 Jackie Chan - 全栈开发工程师 & 产品设计师'
    },
    {
      name: 'twitter:description',
      content: '1s Design、衣设网创始人，专注于设计工具开发和艺术创作'
    },
    {
      name: 'twitter:image',
      content: 'https://1s.design/me.jpg'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://1s.design/founder'
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: '陈政',
        alternateName: 'Jackie Chan',
        birthDate: '1999-01-12',
        nationality: {
          '@type': 'Country',
          name: '中国'
        },
        jobTitle: ['全栈开发工程师', '产品设计师', 'UI/UX设计师'],
        description: '一位善于大胆想象、审美独特的程序员与艺术创作家。1s Design、衣设网创始人，专注于前后端开发、自动化工具、设计素材收集。',
        url: 'https://1s.design',
        email: 'jackieontheway666@gmail.com',
        telephone: ['+86-18742539196', '+86-13224229196'],
        sameAs: [
          'https://github.com/chan-max',
          'https://1s.design'
        ],
        worksFor: {
          '@type': 'Organization',
          name: '1s Design'
        },
        founder: {
          '@type': 'Organization',
          name: '1s Design',
          url: 'https://1s.design',
          alternateName: '衣设网'
        },
        knowsAbout: [
          'JavaScript',
          'Node.js',
          'Vue.js',
          'UI/UX设计',
          '产品设计',
          '视觉设计',
          '全栈开发',
          '前端开发',
          '后端开发',
          '自动化工具',
          '数据爬虫',
          '设计素材收集'
        ],
        image: 'https://1s.design/me.jpg'
      })
    }
  ]
})

// 创始人信息
const founderInfo = ref({
  name: '陈政',
  englishName: 'Jackie Chan',
  role: 'UI/UX 设计师 & 全栈开发工程师 & 素材收藏家 & 自动化工具专家 & 产品设计师',
  avatar: '/me.jpg',
  bio: '一位善于大胆想象、审美独特的程序员与艺术创作家。相信艺术源于生活，又回归生活。善于发现生活中的美，热衷于将美的事物与代码相结合，希望通过设计与技术的融合，将独特的艺术理念带给每一个人。',
  birthday: '1999年1月12日',
  location: '中国',
  email: 'jackieontheway666@gmail.com',
  phones: ['18742539196', '13224229196'],
  social: {
    github: 'https://github.com/chan-max',
    website: 'https://1s.design'
  }
})

// 爱好列表
const hobbies = ref([
  { icon: 'mdi-gamepad-variant', name: '游戏', description: '热爱各类游戏，从中汲取设计灵感' },
  { icon: 'mdi-palette', name: '创作', description: '享受从零到一的创造过程' },
  { icon: 'mdi-basketball', name: '体育运动', description: '篮球、足球、跑步，保持活力' },
  { icon: 'mdi-dumbbell', name: '健身', description: '规律健身，追求健康生活方式' },
  { icon: 'mdi-tea', name: '喝茶', description: '品茗静心，享受慢生活' },
  { icon: 'mdi-coffee', name: '咖啡', description: '咖啡爱好者，探索不同风味' },
  { icon: 'mdi-food', name: '美食', description: '发现和品尝各地特色美食' },
  { icon: 'mdi-movie', name: '电影', description: '热爱各类型电影，从中学习叙事艺术' }
])

// 技能列表
const skills = ref([
  'JavaScript',
  'Node.js',
  'Vue.js',
  'UI/UX 设计',
  '产品设计',
  '视觉设计'
])

// 工作经历
const experiences = ref([
  {
    title: '全栈开发工程师 & 产品设计师',
    company: '1s Design',
    description: '长期从事前后端开发工作，专注于自动化工具的探索与实现。涉及各类数据爬虫的开发，用于收集和整理设计素材、字体资源等。同时负责产品的架构设计、功能开发和用户体验优化，将技术能力与产品思维相结合。'
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
          <div class="basic-info">
            <span class="info-item">
              <v-icon size="16">mdi-cake-variant</v-icon>
              {{ founderInfo.birthday }}
            </span>
            <span class="info-item">
              <v-icon size="16">mdi-map-marker</v-icon>
              {{ founderInfo.location }}
            </span>
          </div>
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
        <!-- 技能 -->
        <section class="section">
          <h2 class="section-title">核心技能</h2>
          <p class="skills-text">
            {{ skills.join('、') }}
          </p>
        </section>

        <!-- 爱好 -->
        <section class="section">
          <h2 class="section-title">兴趣爱好</h2>
          <p class="hobbies-text">
            {{ hobbies.map(h => h.name).join('、') }}
          </p>
        </section>

        <!-- 工作经历 -->
        <section class="section">
          <h2 class="section-title">工作经历</h2>
          <div class="experiences">
            <div v-for="(exp, index) in experiences" :key="index" class="experience-item">
              <h3 class="experience-title">{{ exp.title }} <span class="experience-company">@ {{ exp.company }}</span></h3>
              <p v-if="exp.description" class="experience-description">{{ exp.description }}</p>
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
  margin: 0 0 0.75rem 0;
  line-height: 1.6;
}

.basic-info {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #6b7280;
  
  svg {
    flex-shrink: 0;
  }
}

.bio {
  font-size: 1rem;
  color: #4b5563;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
  max-width: 90%;
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
.skills-text {
  font-size: 1rem;
  color: #4b5563;
  line-height: 1.8;
  margin: 0;
}

// 爱好
.hobbies-text {
  font-size: 1rem;
  color: #4b5563;
  line-height: 1.8;
  margin: 0;
}

// 工作经历
.experiences {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.experience-item {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.experience-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
  line-height: 1.4;
}

.experience-company {
  font-size: 0.95rem;
  font-weight: 400;
  color: #6b7280;
  margin-left: 0.5rem;
}

.experience-description {
  font-size: 1rem;
  color: #4b5563;
  line-height: 1.8;
  margin: 0;
  text-indent: 2em;
}

// 响应式
@media (max-width: 768px) {
  .founder-container {
    padding: 0 1rem;
  }
  
  .basic-info {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
