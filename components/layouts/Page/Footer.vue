<script lang="ts" setup>
const { awesome } = useAppConfig();
const site = useStorefrontSite();
const footerGroups = site.footer.groups;

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
    <section v-if="site.features.newsletter" class="footer-newsletter">
      <div>
        <span>{{ site.footer.newsletterEyebrow }}</span>
        <h2>{{ site.footer.newsletterTitle }}</h2>
      </div>
      <form class="footer-newsletter__form" @submit.prevent="handleNewsletterSubmit">
        <div class="footer-newsletter__input">
          <AppIcon name="envelope" class="ui-icon" :size="15" aria-hidden="true" />
          <input
            v-model="newsletterEmail"
            type="email"
            :placeholder="site.footer.newsletterPlaceholder"
          />
        </div>
        <button type="submit" class="footer-newsletter__btn">
          {{ site.footer.newsletterAction }}
        </button>
      </form>
    </section>

    <div class="footer-inner">
      <section class="footer-grid">
        <div class="footer-brand">
          <NuxtLink to="/" class="footer-logo" :aria-label="`${site.brand.name}首页`">
            <img
              :src="site.brand.logo"
              :alt="site.brand.fullName"
              class="footer-logo-img"
            />
            <div class="footer-logo-text">
              <span class="footer-logo-en">{{ site.brand.nameEn }}</span>
              <span class="footer-logo-zh">{{ site.brand.name }}</span>
            </div>
          </NuxtLink>
          <p>{{ site.footer.description }}</p>
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
          {{ awesome?.author?.name || site.brand.author }}. All rights reserved.
        </p>
        <div class="footer-legal">
          <NuxtLink to="/">首页</NuxtLink>
          <a :href="`mailto:${site.footer.email}`">联系邮箱</a>
        </div>
      </section>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer-shell {
  background: var(--ys-bg);
  color: var(--ys-text);
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
  border-radius: var(--ys-radius-lg);
  background: var(--ys-text);
  color: #fff;
  padding: clamp(1.2rem, 3vw, 2rem) clamp(1.2rem, 3vw, 2.5rem);
}

.footer-newsletter span {
  color: rgba(255, 255, 255, 0.62);
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
  border-radius: var(--ys-radius-sm);
  background: var(--ys-surface);
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
  border-radius: var(--ys-radius-sm);
  background: var(--ys-accent-soft);
  color: var(--ys-accent);
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
  color: var(--ys-text);
}

.footer-logo-zh {
  font-size: 0.6rem;
  font-weight: 600;
  color: var(--ys-text-muted);
  margin-top: 0.08rem;
}

.footer-brand p {
  max-width: 260px;
  color: var(--ys-text-soft);
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
  border: 1px solid transparent;
  border-radius: var(--ys-pill-radius);
  background: var(--ys-surface-soft);
  color: var(--ys-text-soft);
  text-decoration: none;
  transition: all 0.16s ease;
}

.social-link:hover {
  border-color: transparent;
  background: var(--ys-accent);
  color: #fff;
}

.footer-column {
  display: grid;
  align-content: start;
  gap: 0.45rem;
}

.footer-column h3 {
  margin-bottom: 0.25rem;
  color: var(--ys-text);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.footer-link {
  color: var(--ys-text-soft);
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
  color: var(--ys-text-muted);
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
  color: var(--ys-text);
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
