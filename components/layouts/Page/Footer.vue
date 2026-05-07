<script lang="ts" setup>
const { awesome } = useAppConfig();

const footerGroups = {
  商品: [
    { name: "全部商品", href: "/products" },
    { name: "定制设计", href: "/design" },
    { name: "设计灵感", href: "/products/印花" },
    { name: "收藏夹", href: "/favorites" },
  ],
  了解: [
    { name: "关于我们", href: "/about" },
    { name: "创始人", href: "/founder" },
    { name: "联系我们", href: "/contact" },
  ],
};

const newsletterEmail = ref("");

const handleNewsletterSubmit = async () => {
  if (!newsletterEmail.value || !newsletterEmail.value.includes("@")) {
    return;
  }
  newsletterEmail.value = "";
};
</script>

<template>
  <footer class="footer-shell">
    <section class="footer-newsletter">
      <div>
        <span>订阅更新</span>
        <h2>获取最新 POD 商品与设计灵感</h2>
      </div>
      <form class="footer-newsletter__form" @submit.prevent="handleNewsletterSubmit">
        <div class="footer-newsletter__input">
          <v-icon size="18">mdi-email-outline</v-icon>
          <input
            v-model="newsletterEmail"
            type="email"
            placeholder="输入邮箱地址"
          />
        </div>
        <button type="submit" class="footer-newsletter__btn">
          订阅
        </button>
      </form>
    </section>

    <div class="footer-inner">
      <section class="footer-grid">
        <div class="footer-brand">
          <NuxtLink to="/" class="footer-logo" aria-label="衣设首页">
            <img src="/logo.png" alt="1s.design 衣设" class="footer-logo-img" />
            <div class="footer-logo-text">
              <span class="footer-logo-en">1s.design</span>
              <span class="footer-logo-zh">衣设</span>
            </div>
          </NuxtLink>
          <p>
            POD 印花、定制商品与创意设计开放平台。为创作者、品牌和个人定制需求提供可浏览、可延展的商品灵感。
          </p>
        </div>

        <div
          v-for="(links, title) in footerGroups"
          :key="title"
          class="footer-column"
        >
          <h3>{{ title }}</h3>
          <NuxtLink
            v-for="link in links"
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
          <NuxtLink to="/">首页</NuxtLink>
          <a href="mailto:jackieontheway666@gmail.com">联系邮箱</a>
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

.footer-newsletter,
.footer-inner {
  width: var(--ys-container);
  margin: 0 auto;
}

.footer-newsletter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  margin-top: 0.75rem;
  border-radius: 12px;
  background: #000;
  color: #fff;
  padding: clamp(1.2rem, 3vw, 2rem) clamp(1.2rem, 3vw, 2.5rem);
}

.footer-newsletter span {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.footer-newsletter h2 {
  max-width: 400px;
  margin-top: 0.35rem;
  font-size: clamp(1.1rem, 2.5vw, 1.8rem);
  line-height: 1.15;
  color: #fff;
}

.footer-newsletter__form {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  min-width: 280px;
}

.footer-newsletter__input {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.6rem;
  border-radius: 8px;
  background: #fff;
  padding: 0 0.75rem;
}

.footer-newsletter__input input {
  flex: 1;
  min-width: 0;
  height: 2.6rem;
  border: 0;
  outline: 0;
  background: transparent;
  color: #111;
  font-size: 0.82rem;
}

.footer-newsletter__input input::placeholder {
  color: rgba(0, 0, 0, 0.35);
}

.footer-newsletter__btn {
  min-height: 2.6rem;
  border: 0;
  border-radius: 8px;
  background: #fff;
  color: #111;
  font-size: 0.82rem;
  font-weight: 700;
  padding: 0 1rem;
  cursor: pointer;
  transition: opacity 0.16s ease;
}

.footer-newsletter__btn:hover {
  opacity: 0.85;
}

.footer-inner {
  padding: 1.5rem 0 0.85rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr repeat(2, 1fr);
  gap: clamp(1rem, 3vw, 2.5rem);
  padding-bottom: 1.2rem;
}

.footer-brand {
  display: grid;
  align-content: start;
  gap: 0.85rem;
}

.footer-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
}

.footer-logo-img {
  display: block;
  width: 26px;
  height: 26px;
  flex-shrink: 0;
}

.footer-logo-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1;
}

.footer-logo-en {
  font-family: var(--ys-font-display);
  font-size: 0.85rem;
  font-weight: 800;
  color: #000;
}

.footer-logo-zh {
  font-size: 0.6rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 0.08rem;
}

.footer-brand p {
  max-width: 260px;
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.75rem;
  line-height: 1.6;
}

.footer-socials {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 999px;
  background: #fff;
  color: #111;
  text-decoration: none;
  transition: all 0.16s ease;
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
  margin-bottom: 0.25rem;
  color: #111;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.footer-link {
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.75rem;
  line-height: 1.8;
  text-decoration: none;
  transition: color 0.16s ease;
}

.footer-link:hover {
  color: #111;
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  padding-top: 0.75rem;
}

.footer-bottom p {
  color: rgba(0, 0, 0, 0.5);
  font-size: 0.72rem;
}

.footer-legal {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.footer-legal a {
  color: rgba(0, 0, 0, 0.5);
  font-size: 0.72rem;
  text-decoration: none;
  transition: color 0.16s ease;
}

.footer-legal a:hover {
  color: #111;
}

@media (max-width: 960px) {
  .footer-newsletter {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer-newsletter__form {
    width: 100%;
    min-width: unset;
  }

  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
