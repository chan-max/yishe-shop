<script lang="ts" setup>
const { awesome } = useAppConfig();

const footerGroups = {
  help: [
    { name: "FAQ", href: "/faq" },
    { name: "Shipping", href: "/shipping" },
    { name: "Returns", href: "/returns" },
    { name: "Order Status", href: "/orders" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Blog", href: "/blog" },
  ],
  discover: [
    { name: "New Arrivals", href: "/products" },
    { name: "Best Sellers", href: "/products/best" },
    { name: "Sale", href: "/products/sale" },
    { name: "Gift Cards", href: "/gift-cards" },
  ],
};

const socialLinks = [
  { name: "Twitter", icon: "mdi-twitter", href: "#" },
  { name: "Facebook", icon: "mdi-facebook", href: "#" },
  { name: "Instagram", icon: "mdi-instagram", href: "#" },
  { name: "GitHub", icon: "mdi-github", href: "#" },
];

const newsletterEmail = ref("");

const handleNewsletterSubmit = async () => {
  if (!newsletterEmail.value || !newsletterEmail.value.includes("@")) {
    return;
  }
  // TODO: 调用 newsletter 订阅 API
  newsletterEmail.value = "";
};
</script>

<template>
  <footer class="footer-shell">
    <section class="footer-newsletter">
      <div>
        <span>NEWSLETTER</span>
        <h2>STAY UP TO DATE ABOUT OUR LATEST OFFERS</h2>
      </div>
      <form class="footer-newsletter__form" @submit.prevent="handleNewsletterSubmit">
        <div class="footer-newsletter__input">
          <v-icon size="20">mdi-email-outline</v-icon>
          <input
            v-model="newsletterEmail"
            type="email"
            placeholder="Enter your email address"
          />
        </div>
        <button type="submit" class="footer-newsletter__btn">
          Subscribe to Newsletter
        </button>
      </form>
    </section>

    <div class="footer-inner">
      <section class="footer-grid">
        <div class="footer-brand">
          <NuxtLink to="/" class="footer-logo" aria-label="衣设首页">
            <img src="/logo/logo.light.svg" alt="衣设 yishe" />
          </NuxtLink>
          <p>
            We have clothes that suits your style and which you're proud to wear. From women to men.
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
          <h3>HELP</h3>
          <NuxtLink
            v-for="link in footerGroups.help"
            :key="link.name"
            :to="link.href"
            class="footer-link"
          >
            {{ link.name }}
          </NuxtLink>
        </div>
        <div class="footer-column">
          <h3>COMPANY</h3>
          <NuxtLink
            v-for="link in footerGroups.company"
            :key="link.name"
            :to="link.href"
            class="footer-link"
          >
            {{ link.name }}
          </NuxtLink>
        </div>
        <div class="footer-column">
          <h3>DISCOVER</h3>
          <NuxtLink
            v-for="link in footerGroups.discover"
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
          <NuxtLink to="/privacy">Privacy Policy</NuxtLink>
          <NuxtLink to="/terms">Terms of Use</NuxtLink>
          <NuxtLink to="/cookies">Cookie Policy</NuxtLink>
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
  gap: 1.5rem;
  margin-top: 1rem;
  border-radius: 1.25rem;
  background: #000;
  color: #fff;
  padding: clamp(1.5rem, 4vw, 2.25rem) clamp(1.5rem, 4vw, 3.5rem);
}

.footer-newsletter span {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.footer-newsletter h2 {
  max-width: 550px;
  margin-top: 0.5rem;
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  line-height: 1.1;
  color: #fff;
}

.footer-newsletter__form {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  min-width: 320px;
}

.footer-newsletter__input {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 3rem;
  border-radius: var(--ys-pill-radius);
  background: #fff;
  padding: 0 1rem;
}

.footer-newsletter__input input {
  flex: 1;
  min-width: 0;
  height: 3rem;
  border: 0;
  outline: 0;
  background: transparent;
  color: #111;
  font-size: 0.9rem;
}

.footer-newsletter__input input::placeholder {
  color: rgba(0, 0, 0, 0.4);
}

.footer-newsletter__btn {
  min-height: 3rem;
  border: 0;
  border-radius: var(--ys-pill-radius);
  background: #fff;
  color: #111;
  font-size: 0.88rem;
  font-weight: 700;
  padding: 0 1.25rem;
  cursor: pointer;
  transition: opacity 0.16s ease;
}

.footer-newsletter__btn:hover {
  opacity: 0.85;
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
  max-width: 280px;
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.82rem;
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
  margin-bottom: 0.35rem;
  color: #111;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.footer-link {
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.82rem;
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
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 1rem;
}

.footer-bottom p {
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.8rem;
}

.footer-legal {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-legal a {
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.8rem;
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
