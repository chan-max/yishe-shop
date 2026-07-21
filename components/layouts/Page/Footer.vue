<script lang="ts" setup>
const { awesome } = useAppConfig();
const site = useStorefrontSite();
const footerGroups = site.footer.groups;
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">

      <!-- Brand mark (centered) -->
      <NuxtLink to="/" class="footer__brand" :aria-label="`${site.brand.name}首页`">
        <svg class="footer__logo-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="8" fill="#ff2d75" />
          <path d="M10.5 9.5H13.5V22.5H10.5V9.5Z" fill="#ffffff" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5 11.5C15.5 10.4 16.4 9.5 17.5 9.5H22.5V12.5H18.5V14H21.5C22.6 14 23.5 14.9 23.5 16V20C23.5 21.1 22.6 22.5 21.5 22.5H15.5V19.5H20.5V17.5H18.5C16.8 17.5 15.5 16.2 15.5 14.5V11.5Z" fill="#ffffff" />
        </svg>
        <div class="footer__brand-text">
          <span class="footer__brand-name">1s design</span>
          <span class="footer__brand-sub">衣设 · POD按需定制</span>
        </div>
      </NuxtLink>

      <!-- Tagline -->
      <p class="footer__tagline">{{ site.footer.description }}</p>

      <!-- Nav links (all groups flattened into one row) -->
      <nav class="footer__nav">
        <template v-for="(links, title) in footerGroups" :key="title">
          <NuxtLink
            v-for="link in links"
            :key="link.name"
            :to="link.href"
            class="footer__nav-link"
          >
            {{ link.name }}
          </NuxtLink>
        </template>
      </nav>

      <!-- Divider -->
      <div class="footer__divider"></div>

      <!-- Bottom bar -->
      <div class="footer__bottom">
        <p class="footer__copy">
          © {{ awesome?.layout?.footer?.year || new Date().getFullYear() }}
          {{ awesome?.author?.name || site.brand.organizationName }}.
          All rights reserved.
        </p>
        <div class="footer__legal">
          <a :href="`mailto:${site.footer.email}`" class="footer__legal-link">{{ site.footer.email }}</a>
          <NuxtLink to="/about" class="footer__legal-link">关于我们</NuxtLink>
          <NuxtLink to="/contact" class="footer__legal-link">联系我们</NuxtLink>
        </div>
      </div>

    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  background: #0a0a0c;
  color: rgba(255, 255, 255, 0.55);
  font-family: var(--ys-font-sans);
}

.footer__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: min(1200px, calc(100% - 3rem));
  margin: 0 auto;
  padding: 4rem 0 2.5rem;
  gap: 0;
}

/* Brand */
.footer__brand {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  margin-bottom: 1.25rem;
}

.footer__logo-svg {
  display: block;
  width: 28px;
  height: 28px;
  opacity: 0.9;
}

.footer__brand-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.12rem;
  line-height: 1;
}

.footer__brand-name {
  font-family: var(--ys-font-display);
  font-size: 0.96rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #fff;
}

.footer__brand-sub {
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.45);
}

/* Tagline */
.footer__tagline {
  max-width: 480px;
  font-size: 0.82rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.42);
  margin: 0 0 2.25rem;
}

/* Nav links row */
.footer__nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.25rem 0.1rem;
  margin-bottom: 2.5rem;
}

.footer__nav-link {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.82rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.18s ease, background 0.18s ease;

  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.08);
  }
}

/* Divider */
.footer__divider {
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin-bottom: 1.75rem;
}

/* Bottom bar */
.footer__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;
  flex-wrap: wrap;
}

.footer__copy {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.3);
  margin: 0;
}

.footer__legal {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.footer__legal-link {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.3);
  text-decoration: none;
  transition: color 0.18s ease;

  &:hover { color: rgba(255, 255, 255, 0.75); }
}

/* Responsive */
@media (max-width: 640px) {
  .footer__bottom {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.75rem;
  }

  .footer__legal {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
