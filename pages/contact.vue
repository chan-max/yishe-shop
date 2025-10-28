<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-10-29 07:17:18
 * @FilePath: /yishe-nuxt/pages/contact.vue
 * @Description: Contact Page - Get in touch with 1s Design
-->
<script lang="ts" setup>
definePageMeta({ layout: 'page' })

// Page title and meta
useHead({
  titleTemplate: '',
  title: '联系我们 - 1s Design | 陈政 Jackie Chan',
  meta: [
    {
      name: 'description',
      content: '联系 1s Design 创始人陈政（Jackie Chan）。邮箱：jackieontheway666@gmail.com，电话：18742539196 / 13224229196。通过微信、QQ、抖音、小红书等多种方式与我们取得联系。'
    },
    {
      name: 'keywords',
      content: '联系1s Design, 陈政联系方式, Jackie Chan, contact, 邮箱, 电话, 微信, QQ, 抖音, 小红书, 1s.design, 衣设网'
    }
  ]
})

// 创始人信息
const founderInfo = {
  name: '陈政',
  englishName: 'Jackie Chan',
  email: 'jackieontheway666@gmail.com',
  phones: ['18742539196', '13224229196'],
  location: '中国',
  github: 'https://github.com/chan-max',
  website: 'https://1s.design'
}

// 社交平台
const socialPlatforms = ref([
  {
    name: '微信',
    icon: 'mdi-wechat',
    image: '/contact/weixin.jpg',
    color: '#07c160'
  },
  {
    name: '微博',
    icon: 'mdi-sina-weibo',
    image: '/contact/weibo.png',
    color: '#e6162d'
  },
  {
    name: '小红书',
    icon: 'mdi-book-open-page-variant',
    image: '/contact/xiaohongshu.jpg',
    color: '#ff2442'
  },
  {
    name: '抖音',
    icon: 'mdi-music-note',
    image: '/contact/douyin.webp',
    color: '#000000'
  },
  {
    name: '快手',
    icon: 'mdi-video',
    image: '/contact/kuaishou.webp',
    color: '#ff6600'
  }
])

// 二维码弹窗
const showQRDialog = ref(false)
const selectedPlatform = ref(null)

const openQRCode = (platform) => {
  selectedPlatform.value = platform
  showQRDialog.value = true
}

const closeQRDialog = () => {
  showQRDialog.value = false
  selectedPlatform.value = null
}
</script>

<template>
  <div class="contact-page">
    <div class="contact-container">
      <!-- Header -->
      <div class="page-header">
        <div class="title-row">
          <h1 class="page-title">联系我们</h1>
          <NuxtLink to="/founder" class="founder-link-text">了解作者 →</NuxtLink>
        </div>
      </div>

      <!-- Main Content -->
      <div class="main-content">

        <!-- Contact Info -->
        <div class="contact-section">
          <div class="contact-row">
            <div class="contact-item">
              <v-icon size="18" class="item-icon">mdi-email</v-icon>
              <span class="item-label">邮箱：</span>
              <a :href="'mailto:' + founderInfo.email" class="item-value">{{ founderInfo.email }}</a>
            </div>

            <div class="contact-item">
              <v-icon size="18" class="item-icon">mdi-phone</v-icon>
              <span class="item-label">电话：</span>
              <div class="item-values">
                <a :href="'tel:' + founderInfo.phones[0]" class="item-value">{{ founderInfo.phones[0] }}</a>
                <span class="separator">/</span>
                <a :href="'tel:' + founderInfo.phones[1]" class="item-value">{{ founderInfo.phones[1] }}</a>
              </div>
            </div>

            <div class="contact-item">
              <v-icon size="18" class="item-icon">mdi-map-marker</v-icon>
              <span class="item-label">所在地：</span>
              <span class="item-value">{{ founderInfo.location }}</span>
            </div>

            <div class="contact-item">
              <v-icon size="18" class="item-icon">mdi-github</v-icon>
              <span class="item-label">GitHub：</span>
              <a :href="founderInfo.github" target="_blank" class="item-value">{{ founderInfo.github }}</a>
            </div>

            <div class="contact-item">
              <v-icon size="18" class="item-icon">mdi-web</v-icon>
              <span class="item-label">网站：</span>
              <a :href="founderInfo.website" target="_blank" class="item-value">{{ founderInfo.website }}</a>
            </div>
          </div>
        </div>

        <!-- Social Platforms -->
        <div class="social-section">
          <h3 class="section-title">社交平台</h3>
          <div class="social-links">
            <button
              v-for="platform in socialPlatforms"
              :key="platform.name"
              @click="openQRCode(platform)"
              class="social-link"
            >
              <v-icon :icon="platform.icon" size="18"></v-icon>
              <span>{{ platform.name }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- QR Code Dialog -->
    <Teleport to="body">
      <Transition name="dialog">
        <div v-if="showQRDialog" class="qr-dialog-overlay" @click="closeQRDialog">
          <div class="qr-dialog" @click.stop>
            <button class="qr-close" @click="closeQRDialog">
              <v-icon>mdi-close</v-icon>
            </button>
            <div v-if="selectedPlatform" class="qr-content">
              <div class="qr-header">
                <v-icon :icon="selectedPlatform.icon" size="32" :style="{ color: selectedPlatform.color }"></v-icon>
                <h3 class="qr-title">{{ selectedPlatform.name }}</h3>
              </div>
              <div class="qr-image-wrapper">
                <img :src="selectedPlatform.image" :alt="selectedPlatform.name + ' 二维码'" class="qr-image" />
              </div>
              <p class="qr-tip">使用 {{ selectedPlatform.name }} 扫描二维码</p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>
.contact-page {
  min-height: 100vh;
  background: #ffffff;
  display: flex;
  align-items: center;
  padding: 2rem 0;
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
}

// Page Header
.page-header {
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
  text-align: center;
  max-width: 100%;
}

.title-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  margin-bottom: 1.5rem;
  position: relative;
  
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
  }
}

.page-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.founder-link-text {
  position: absolute;
  right: 0;
  color: #6b7280;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  
  &:hover {
    color: #111827;
  }
  
  @media (max-width: 640px) {
    position: static;
  }
}

.author-row {
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 1rem;
  
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }
}

.author-name {
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.author-name-en {
  font-size: 1.25rem;
  color: #6b7280;
  margin: 0;
}

.separator {
  color: #d1d5db;
  font-size: 1.2rem;
  
  @media (max-width: 640px) {
    display: none;
  }
}

// Main Content Layout
.main-content {
  max-width: 650px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

// Contact Section
.contact-section {
  padding-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.contact-row {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  
  @media (max-width: 640px) {
    flex-wrap: wrap;
  }
}

.item-icon {
  flex-shrink: 0;
  color: #9ca3af;
}

.item-label {
  color: #6b7280;
  flex-shrink: 0;
}

.item-value {
  color: #374151;
  text-decoration: none;
  transition: color 0.2s ease;
  word-break: break-all;
  
  &:hover {
    color: #111827;
  }
}

.item-values {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.separator {
  color: #d1d5db;
}

// Social Section
.social-section {
  text-align: center;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 1.5rem 0;
}

.social-links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.social-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0;
  background: none;
  border: none;
  color: #6b7280;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    color: #111827;
    
    .v-icon {
      transform: translateX(2px);
    }
  }
  
  .v-icon {
    transition: transform 0.2s ease;
  }
}

// QR Dialog
.qr-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
}

.qr-dialog {
  background: #ffffff;
  border-radius: 16px;
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.qr-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 32px;
  height: 32px;
  border: none;
  background: #f3f4f6;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  transition: all 0.2s ease;
  
  &:hover {
    background: #e5e7eb;
    color: #111827;
  }
}

.qr-content {
  text-align: center;
}

.qr-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.qr-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.qr-image-wrapper {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  background: #f9fafb;
  padding: 1rem;
  margin-bottom: 1rem;
}

.qr-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.qr-tip {
  font-size: 0.95rem;
  color: #6b7280;
  margin: 0;
}

// Dialog Animation
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.3s ease;
  
  .qr-dialog {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  
  .qr-dialog {
    transform: scale(0.9);
  }
}
</style>