<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-01-27 11:00:00
 * @FilePath: /yishe-nuxt/pages/contact.vue
 * @Description: Contact Page - Get in touch with 1s Design
-->
<script lang="ts" setup>
definePageMeta({ layout: 'page' })

// Page title and meta
useHead({
  titleTemplate: '',
  title: 'Contact - 1s Design',
  meta: [
    {
      name: 'description',
      content: 'Get in touch with 1s Design team. We\'d love to hear from you and help with any questions or feedback.'
    },
    {
      name: 'keywords',
      content: 'contact 1s design, get in touch, support, feedback, help'
    }
  ]
})

// Contact form data
const contactForm = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

// Form submission
const submitForm = () => {
  // Handle form submission here
  console.log('Form submitted:', contactForm.value)
  // You can add actual form submission logic here
}
</script>

<template>
  <div class="contact-page">
    <div class="contact-container">
      <!-- Hero Section -->
      <section class="contact-hero">
        <h1 class="contact-title">联系我们</h1>
        <p class="contact-subtitle">
          我们很想听到您的声音。与我们团队取得联系，告诉我们如何帮助您的设计之旅。
        </p>
      </section>

      <!-- Contact Content -->
      <div class="contact-content">
        <!-- Contact Form -->
        <section class="contact-form-section">
          <h2 class="section-title">发送消息</h2>
          <form @submit.prevent="submitForm" class="contact-form">
            <div class="form-group">
              <label for="name" class="form-label">姓名</label>
              <input
                id="name"
                v-model="contactForm.name"
                type="text"
                class="form-input"
                placeholder="您的姓名"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="email" class="form-label">邮箱</label>
              <input
                id="email"
                v-model="contactForm.email"
                type="email"
                class="form-input"
                placeholder="your.email@example.com"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="subject" class="form-label">主题</label>
              <input
                id="subject"
                v-model="contactForm.subject"
                type="text"
                class="form-input"
                placeholder="请简述事由"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="message" class="form-label">消息内容</label>
              <textarea
                id="message"
                v-model="contactForm.message"
                class="form-textarea"
                placeholder="请详细描述您的问题或反馈..."
                rows="5"
                required
              ></textarea>
            </div>
            
            <button type="submit" class="submit-btn">
              <v-icon left>mdi-send</v-icon>
              发送消息
            </button>
          </form>
        </section>

        <!-- Contact Info -->
        <section class="contact-info-section">
          <h2 class="section-title">联系方式</h2>
          
          <div class="contact-info">
            <div class="contact-item">
              <div class="contact-icon">
                <v-icon size="24" color="primary">mdi-email</v-icon>
              </div>
              <div class="contact-details">
                <h3 class="contact-item-title">邮箱</h3>
                <p class="contact-item-text">hello@1s.design</p>
                <p class="contact-item-text">support@1s.design</p>
              </div>
            </div>
            
            <div class="contact-item">
              <div class="contact-icon">
                <v-icon size="24" color="primary">mdi-phone</v-icon>
              </div>
              <div class="contact-details">
                <h3 class="contact-item-title">电话</h3>
                <p class="contact-item-text">+86 400-XXX-XXXX</p>
                <p class="contact-item-text">周一至周五 9:00-18:00</p>
              </div>
            </div>
            
            <div class="contact-item">
              <div class="contact-icon">
                <v-icon size="24" color="primary">mdi-map-marker</v-icon>
              </div>
              <div class="contact-details">
                <h3 class="contact-item-title">办公地址</h3>
                <p class="contact-item-text">北京市朝阳区创意园区</p>
                <p class="contact-item-text">设计大厦 1234 号</p>
              </div>
            </div>
          </div>
          
          <!-- Social Links -->
          <div class="social-links">
            <h3 class="social-title">关注我们</h3>
            <div class="social-icons">
              <a href="#" class="social-link">
                <v-icon>mdi-twitter</v-icon>
              </a>
              <a href="#" class="social-link">
                <v-icon>mdi-instagram</v-icon>
              </a>
              <a href="#" class="social-link">
                <v-icon>mdi-facebook</v-icon>
              </a>
              <a href="#" class="social-link">
                <v-icon>mdi-linkedin</v-icon>
              </a>
              <a href="#" class="social-link">
                <v-icon>mdi-dribbble</v-icon>
              </a>
            </div>
          </div>
        </section>
      </div>
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

.contact-page {
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
  padding: 2rem 0;
}

.contact-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
}

.contact-hero {
  text-align: center;
  margin-bottom: 4rem;
  padding: 2rem 0;
}

.contact-title {
  font-size: 3rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
}

.contact-subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 2rem;
}

// Contact Form Styles
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
}

.form-input,
.form-textarea {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
  }
  
  &::placeholder {
    color: var(--text-muted);
  }
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-btn {
  background: var(--primary-color);
  color: var(--bg-primary);
  border: none;
  border-radius: 8px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background: var(--text-secondary);
    transform: translateY(-2px);
  }
}

// Contact Info Styles
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 3rem;
}

.contact-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.contact-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  background: var(--bg-secondary);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-details {
  flex: 1;
}

.contact-item-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.contact-item-text {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 0.25rem;
}

// Social Links
.social-links {
  border-top: 1px solid var(--border-color);
  padding-top: 2rem;
}

.social-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.social-icons {
  display: flex;
  gap: 1rem;
}

.social-link {
  width: 40px;
  height: 40px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--primary-color);
    color: var(--bg-primary);
    transform: translateY(-2px);
  }
}

// Responsive Design
@media (max-width: 768px) {
  .contact-container {
    padding: 0 1rem;
  }
  
  .contact-hero {
    margin-bottom: 2rem;
    padding: 1rem 0;
  }
  
  .contact-content {
    gap: 2rem;
  }
  
  .contact-info {
    gap: 1.5rem;
  }
  
  .contact-item {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .contact-icon {
    width: 40px;
    height: 40px;
  }
}
</style>