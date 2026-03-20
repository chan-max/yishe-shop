<script lang="ts" setup>
const { awesome } = useAppConfig();

const footerGroups = {
  discover: [
    { name: "印花图案", href: "/products/%E5%9B%BE%E6%A1%88" },
    { name: "服饰单品", href: "/products" },
    { name: "周边与礼物", href: "/products/%E7%A4%BC%E7%89%A9" },
    { name: "作品集", href: "/portfolio" },
  ],
  creators: [
    { name: "灵感资料", href: "/portfolio" },
    { name: "创作方向", href: "/ai-lab" },
    { name: "定制服务", href: "/design" },
    { name: "关于衣设", href: "/about" },
  ],
  service: [
    { name: "POD 定制", href: "/design" },
    { name: "登录", href: "/login" },
    { name: "联系我们", href: "/contact" },
    { name: "注册", href: "/register" },
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
    <div class="footer-inner">
      <section class="footer-top">
        <div>
          <span class="footer-kicker">yishe / 1s.design</span>
          <h2>不是买商品，是在穿自己的想法。</h2>
          <p>
            衣设想把设计这件事还给更多普通人。灵感可以很轻，但表达最好别太随便。
          </p>
        </div>
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
      </section>

      <section class="footer-grid">
        <div class="footer-brand">
          <img src="/logo.svg" alt="衣设" class="footer-logo" />
          <strong>衣设</strong>
          <p>给有表达欲的人留一个把想法穿出去的地方。</p>
        </div>

        <div class="footer-column">
          <h3>探索内容</h3>
          <NuxtLink
            v-for="link in footerGroups.discover"
            :key="link.name"
            :to="link.href"
            class="footer-link"
            >{{ link.name }}</NuxtLink
          >
        </div>
        <div class="footer-column">
          <h3>给想做点东西的人</h3>
          <NuxtLink
            v-for="link in footerGroups.creators"
            :key="link.name"
            :to="link.href"
            class="footer-link"
            >{{ link.name }}</NuxtLink
          >
        </div>
        <div class="footer-column">
          <h3>入口</h3>
          <NuxtLink
            v-for="link in footerGroups.service"
            :key="link.name"
            :to="link.href"
            class="footer-link"
            >{{ link.name }}</NuxtLink
          >
        </div>
      </section>

      <section class="footer-bottom">
        <p>
          Copyright ©
          {{ awesome?.layout?.footer?.year || new Date().getFullYear() }}
          {{ awesome?.author?.name || "衣设" }}. 保留所有权利。
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
  border-top: 1px solid rgba(28, 25, 23, 0.08);
  background: #f7f5f2;
  color: #44403c;
  font-family: var(--ys-font-sans);
}

.footer-inner {
  width: min(1560px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 2.5rem 0 1.25rem;
}

.footer-top {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(28, 25, 23, 0.08);
}

.footer-kicker {
  display: inline-block;
  margin-bottom: 0.75rem;
  color: #78716c;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.footer-top h2 {
  font-family: var(--ys-font-display);
  font-size: 1.5rem;
  line-height: 1.3;
  color: #1c1917;
}

.footer-top p {
  margin-top: 0.6rem;
  max-width: 36rem;
  font-size: 0.78rem;
  line-height: 1.9;
}

.footer-socials {
  display: flex;
  gap: 0.5rem;
}

.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: 1px solid rgba(28, 25, 23, 0.1);
  border-radius: 999px;
  color: #57534e;
  text-decoration: none;
  background: #fff;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1.5rem 0;
}

.footer-brand {
  display: grid;
  align-content: start;
  gap: 0.5rem;
}

.footer-logo {
  width: 2.5rem;
  height: 2.5rem;
}

.footer-brand strong {
  font-family: var(--ys-font-display);
  font-size: 1rem;
  color: #1c1917;
}

.footer-brand p,
.footer-link,
.footer-bottom,
.footer-legal a {
  font-size: 0.75rem;
  line-height: 1.9;
}

.footer-column {
  display: grid;
  align-content: start;
  gap: 0.2rem;
}

.footer-column h3 {
  margin-bottom: 0.45rem;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  color: #1c1917;
}

.footer-link,
.footer-legal a {
  color: #57534e;
  text-decoration: none;
}

.footer-link:hover,
.footer-legal a:hover {
  color: #1c1917;
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(28, 25, 23, 0.08);
}

.footer-legal {
  display: flex;
  gap: 1rem;
}

@media (max-width: 960px) {
  .footer-top,
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
}
</style>
