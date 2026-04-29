<script lang="ts" setup>
const { awesome } = useAppConfig();

const footerGroups = {
  discover: [
    { name: "POD 商品", href: "/products" },
    { name: "印花图案", href: "/products/%E5%8D%B0%E8%8A%B1" },
    { name: "定制礼物", href: "/products/%E7%A4%BC%E7%89%A9" },
    { name: "作品案例", href: "/portfolio" },
  ],
  platform: [
    { name: "品牌定制", href: "/design" },
    { name: "AI 创意工作台", href: "/ai-lab" },
    { name: "免费设计", href: "/free-design" },
    { name: "关于衣设", href: "/about" },
  ],
  service: [
    { name: "联系我们", href: "/contact" },
    { name: "登录", href: "/login" },
    { name: "注册", href: "/register" },
    { name: "商品地图", href: "/sitemap.xml" },
  ],
};

const socialLinks = [
  { name: "Instagram", icon: "mdi-instagram", href: "#" },
  { name: "Pinterest", icon: "mdi-pinterest", href: "#" },
  { name: "Behance", icon: "mdi-behance", href: "#" },
  { name: "Dribbble", icon: "mdi-dribbble", href: "#" },
];
</script>

<template>
  <footer class="footer-shell">
    <section class="footer-cta">
      <div>
        <span>1s.design / POD creative platform</span>
        <h2>从一个图案开始，生成一整套商品可能性。</h2>
      </div>
      <NuxtLink to="/design" class="footer-cta__link">
        发起定制
        <v-icon size="18">mdi-arrow-right</v-icon>
      </NuxtLink>
    </section>

    <div class="footer-inner">
      <section class="footer-grid">
        <div class="footer-brand">
          <NuxtLink to="/" class="footer-logo" aria-label="衣设首页">
            <img src="/logo/logo.light.svg" alt="衣设 yishe" />
          </NuxtLink>
          <p>
            POD 印花、私人定制、品牌周边与创意设计开放平台。为创作者和品牌提供可浏览、可收录、可继续落地的商品灵感。
          </p>
          <div class="footer-socials">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.href"
              :title="social.name"
              class="social-link"
            >
              <v-icon size="16">{{ social.icon }}</v-icon>
            </a>
          </div>
        </div>

        <div class="footer-column">
          <h3>发现</h3>
          <NuxtLink
            v-for="link in footerGroups.discover"
            :key="link.name"
            :to="link.href"
            class="footer-link"
          >
            {{ link.name }}
          </NuxtLink>
        </div>
        <div class="footer-column">
          <h3>平台</h3>
          <NuxtLink
            v-for="link in footerGroups.platform"
            :key="link.name"
            :to="link.href"
            class="footer-link"
          >
            {{ link.name }}
          </NuxtLink>
        </div>
        <div class="footer-column">
          <h3>服务</h3>
          <NuxtLink
            v-for="link in footerGroups.service"
            :key="link.name"
            :to="link.href"
            class="footer-link"
          >
            {{ link.name }}
          </NuxtLink>
        </div>
      </section>

      <section class="footer-bottom">
        <p>
          Copyright ©
          {{ awesome?.layout?.footer?.year || new Date().getFullYear() }}
          {{ awesome?.author?.name || "衣设" }}. All rights reserved.
        </p>
        <div class="footer-legal">
          <NuxtLink to="/privacy">隐私政策</NuxtLink>
          <NuxtLink to="/terms">服务条款</NuxtLink>
          <NuxtLink to="/cookies">Cookie 政策</NuxtLink>
        </div>
      </section>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer-shell {
  background: #fff;
  color: #111;
  font-family: var(--ys-font-sans);
}

.footer-cta,
.footer-inner {
  width: var(--ys-container);
  margin: 0 auto;
}

.footer-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-top: 1rem;
  border-radius: 1.6rem;
  background: #050505;
  color: #fff;
  padding: clamp(1.3rem, 4vw, 2.6rem);
}

.footer-cta span {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.footer-cta h2 {
  max-width: 780px;
  margin-top: 0.65rem;
  font-size: clamp(1.8rem, 4vw, 3.7rem);
  line-height: 0.98;
}

.footer-cta__link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  min-height: 3.1rem;
  flex: 0 0 auto;
  border-radius: 999px;
  background: #fff;
  color: #111;
  font-size: 0.88rem;
  font-weight: 800;
  padding: 0 1.25rem;
  text-decoration: none;
}

.footer-inner {
  padding: 2.2rem 0 1.2rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.35fr repeat(3, 1fr);
  gap: clamp(1rem, 3vw, 2.5rem);
  padding-bottom: 1.8rem;
}

.footer-brand {
  display: grid;
  align-content: start;
  gap: 0.85rem;
}

.footer-logo {
  display: inline-flex;
  align-items: center;
  width: 156px;
}

.footer-logo img {
  display: block;
  width: 100%;
  height: auto;
}

.footer-brand p {
  max-width: 420px;
  color: #666;
  font-size: 0.82rem;
  line-height: 1.9;
}

.footer-socials {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid #e9e9e9;
  border-radius: 999px;
  background: #fff;
  color: #111;
  text-decoration: none;
}

.social-link:hover {
  border-color: #111;
  background: #111;
  color: #fff;
}

.footer-column {
  display: grid;
  align-content: start;
  gap: 0.45rem;
}

.footer-column h3 {
  margin-bottom: 0.35rem;
  color: #111;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.footer-link,
.footer-bottom,
.footer-legal a {
  color: #666;
  font-size: 0.8rem;
  line-height: 1.9;
  text-decoration: none;
}

.footer-link:hover,
.footer-legal a:hover {
  color: #111;
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-top: 1px solid #eeeeee;
  padding-top: 1rem;
}

.footer-legal {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

@media (max-width: 960px) {
  .footer-cta,
  .footer-bottom {
    align-items: flex-start;
    flex-direction: column;
  }

  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }

  .footer-cta__link {
    width: 100%;
  }
}
</style>
