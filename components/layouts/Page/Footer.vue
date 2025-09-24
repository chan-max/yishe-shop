<script lang="ts" setup>
const { awesome } = useAppConfig()

// Footer navigation links
const footerLinks = {
  design: [
    { name: 'Fashion Design', href: '/search?category=fashion' },
    { name: 'Graphic Design', href: '/search?category=graphic' },
    { name: 'UI/UX Design', href: '/search?category=ui-ux' },
    { name: 'Product Design', href: '/search?category=product' }
  ],
  community: [
    { name: 'Designers', href: '/designers' },
    { name: 'Inspiration', href: '/inspiration' },
    { name: 'Trends', href: '/trends' },
    { name: 'Challenges', href: '/challenges' }
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Feedback', href: '/feedback' },
    { name: 'Bug Report', href: '/bug-report' }
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Partners', href: '/partners' }
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
            <img src="/logo.svg" alt="1s Design" class="footer-logo-image" />
            <span class="footer-logo-text">1s Design</span>
          </div>
          <p class="footer-description">
            The ultimate platform for creative designers to showcase their work, discover inspiration, and connect with the global design community.
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
            <h3 class="footer-nav-title">Design</h3>
            <ul class="footer-nav-list">
              <li v-for="link in footerLinks.design" :key="link.name">
                <NuxtLink :to="link.href" class="footer-nav-link">
                  {{ link.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div class="footer-nav-section">
            <h3 class="footer-nav-title">Community</h3>
            <ul class="footer-nav-list">
              <li v-for="link in footerLinks.community" :key="link.name">
                <NuxtLink :to="link.href" class="footer-nav-link">
                  {{ link.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div class="footer-nav-section">
            <h3 class="footer-nav-title">Support</h3>
            <ul class="footer-nav-list">
              <li v-for="link in footerLinks.support" :key="link.name">
                <NuxtLink :to="link.href" class="footer-nav-link">
                  {{ link.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div class="footer-nav-section">
            <h3 class="footer-nav-title">Company</h3>
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
            {{ awesome?.author?.name || '1s Design' }}. All rights reserved.
          </p>
        </div>
        <div class="footer-legal">
          <NuxtLink to="/privacy" class="footer-legal-link">Privacy Policy</NuxtLink>
          <NuxtLink to="/terms" class="footer-legal-link">Terms of Service</NuxtLink>
          <NuxtLink to="/cookies" class="footer-legal-link">Cookie Policy</NuxtLink>
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
  padding: 4rem 0 2rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem 0 1rem;
  }
}

.footer-brand {
  max-width: 400px;
}

.footer-logo {
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.footer-logo-image {
  width: 40px;
  height: 40px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
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
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}

.footer-nav-section {
  min-width: 0;
}

.footer-nav-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
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
