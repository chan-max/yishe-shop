<script lang="ts" setup>
const { awesome } = useAppConfig()

// Footer navigation links
const footerLinks = {
  design: [
    { name: '服装设计', href: '/search?category=fashion' },
    { name: '图案设计', href: '/search?category=graphic' },
    { name: '印花设计', href: '/search?category=print' },
    { name: '面料设计', href: '/search?category=fabric' }
  ],
  community: [
    { name: '设计师', href: '/designers' },
    { name: '灵感库', href: '/inspiration' },
    { name: '流行趋势', href: '/trends' },
    { name: '设计挑战', href: '/challenges' }
  ],
  support: [
    { name: '帮助中心', href: '/help' },
    { name: '联系我们', href: '/contact' },
    { name: '意见反馈', href: '/feedback' },
    { name: '问题报告', href: '/bug-report' }
  ],
  company: [
    { name: '关于我们', href: '/about' },
    { name: '招聘信息', href: '/careers' },
    { name: '新闻动态', href: '/press' },
    { name: '合作伙伴', href: '/partners' }
  ]
}

// Social media links
const socialLinks = [
  { name: 'Twitter', icon: 'mdi-twitter', href: '#' },
  { name: 'Instagram', icon: 'mdi-instagram', href: '#' },
  { name: 'Facebook', icon: 'mdi-facebook', href: '#' },
  { name: 'LinkedIn', icon: 'mdi-linkedin', href: '#' },
  { name: 'Dribbble', icon: 'mdi-dribbble', href: '#' }
]
</script>

<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Main Footer Content -->
      <div class="footer-main">
        <!-- Brand Section -->
        <div class="footer-brand">
          <div class="footer-logo">
            <span class="footer-logo-text">衣设服装设计</span>
          </div>
          <p class="footer-description">
            专注于创意印花图案和服装设计的专业平台，汇聚全球设计师的创意灵感，提供服装设计作品展示、设计师交流、设计灵感获取等服务。
          </p>
          <div class="footer-social">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.href"
              class="social-link"
              :title="social.name"
            >
              <v-icon>{{ social.icon }}</v-icon>
            </a>
          </div>
        </div>

        <!-- Navigation Links -->
        <div class="footer-nav">
          <div class="footer-nav-section">
            <h3 class="footer-nav-title">设计分类</h3>
            <ul class="footer-nav-list">
              <li v-for="link in footerLinks.design" :key="link.name">
                <NuxtLink :to="link.href" class="footer-nav-link">
                  {{ link.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div class="footer-nav-section">
            <h3 class="footer-nav-title">社区</h3>
            <ul class="footer-nav-list">
              <li v-for="link in footerLinks.community" :key="link.name">
                <NuxtLink :to="link.href" class="footer-nav-link">
                  {{ link.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div class="footer-nav-section">
            <h3 class="footer-nav-title">支持</h3>
            <ul class="footer-nav-list">
              <li v-for="link in footerLinks.support" :key="link.name">
                <NuxtLink :to="link.href" class="footer-nav-link">
                  {{ link.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div class="footer-nav-section">
            <h3 class="footer-nav-title">公司</h3>
            <ul class="footer-nav-list">
              <li v-for="link in footerLinks.company" :key="link.name">
                <NuxtLink :to="link.href" class="footer-nav-link">
                  {{ link.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="footer-copyright">
          <p>
            Copyright © {{ awesome?.layout?.footer?.year || new Date().getFullYear() }}
            {{ awesome?.author?.name || '衣设服装设计' }}. 保留所有权利。
          </p>
        </div>
        <div class="footer-legal">
          <NuxtLink to="/privacy" class="footer-legal-link">隐私政策</NuxtLink>
          <NuxtLink to="/terms" class="footer-legal-link">服务条款</NuxtLink>
          <NuxtLink to="/cookies" class="footer-legal-link">Cookie政策</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
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
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.5);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.5);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5);
}

.footer {
  background: var(--bg-primary);
  border-top: 1px solid var(--border-color);
  color: var(--text-secondary);
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-main {
  padding: 3.5rem 0 2rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    padding: 2.5rem 0 1.5rem;
  }
}

.footer-brand {
  max-width: 400px;
  
  @media (max-width: 1024px) {
    max-width: 100%;
  }
}

.footer-logo {
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.25rem;
}

.footer-logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  letter-spacing: -0.5px;
}

.footer-description {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-muted);
  margin-bottom: 2rem;
}

.footer-social {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-muted);
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--primary-color);
    color: white;
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
}

.footer-nav {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.75rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem 1.5rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

.footer-nav-section {
  min-width: 0;
  
  @media (max-width: 768px) {
    min-width: 0;
  }
  
  @media (max-width: 480px) {
    min-width: 0;
  }
}

.footer-nav-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 0.6rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
  }
}

.footer-nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-nav-link {
  display: block;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.9rem;
  padding: 0.5rem 0;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.4rem 0;
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.35rem 0;
  }
  
  &:hover {
    color: var(--primary-color);
    transform: translateX(4px);
  }
}

.footer-bottom {
  padding: 2rem 0;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem 0;
  }
}

.footer-copyright {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.footer-legal {
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
  }
}

.footer-legal-link {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
  }
}
</style>
