<script setup lang="ts">
import { useToast } from "~/composables/use-toast";
import {
  SITE_AUTHOR,
  SITE_DEFAULT_IMAGE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_OG_NAME,
  SITE_ROBOTS,
  SITE_THEME_COLOR,
  SITE_TWITTER_DESCRIPTION,
  SITE_URL,
} from "~/utils/seo";

const toast = useToast();

const toastType = computed(() => toast.toastType.value);
const toastTitle = computed(() => toast.toastTitle.value);
const toastText = computed(() => toast.toastText.value);
const toastDuration = computed(() => toast.toastDuration.value);
const showToast = computed({
  get: () => toast.showToast.value,
  set: (val) => {
    toast.showToast.value = val;
  },
});

useSeoMeta({
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  author: SITE_AUTHOR,
  language: "zh-CN",
  robots: SITE_ROBOTS,
  ogTitle: SITE_NAME,
  ogDescription: SITE_DESCRIPTION,
  ogType: "website",
  ogUrl: SITE_URL,
  ogImage: SITE_DEFAULT_IMAGE,
  ogSiteName: SITE_OG_NAME,
  ogLocale: "zh_CN",
  twitterCard: "summary_large_image",
  twitterTitle: SITE_NAME,
  twitterDescription: SITE_TWITTER_DESCRIPTION,
  twitterImage: SITE_DEFAULT_IMAGE,
  "theme-color": SITE_THEME_COLOR,
  "apple-mobile-web-app-capable": "yes",
  "apple-mobile-web-app-status-bar-style": "default",
});

useHead({
  htmlAttrs: { lang: "zh-CN" },
  meta: [
    {
      name: "format-detection",
      content: "telephone=no, email=no, address=no",
    },
  ],
});
</script>

<template>
  <Body class="app-body">
    <div class="ys-grain" aria-hidden="true"></div>
    <NuxtLoadingIndicator color="#1c1917" :height="2" :throttle="200" />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <AwesomeToast
      v-model:show="showToast"
      :type="toastType"
      :title="toastTitle"
      :text="toastText"
      :duration="toastDuration"
    />
  </Body>
</template>

<style>
:root {
  --version: "1.0.0";
  --ys-bg: #ffffff;
  --ys-surface: #ffffff;
  --ys-surface-soft: #f3f3f3;
  --ys-surface-hover: #f7f7f7;
  --ys-surface-active: #eeeeee;
  --ys-border: rgba(0, 0, 0, 0.08);
  --ys-border-strong: rgba(0, 0, 0, 0.18);
  --ys-text: #111111;
  --ys-text-soft: #444444;
  --ys-text-muted: #777777;
  --ys-accent: #111111;
  --ys-accent-strong: #000000;
  --ys-accent-soft: rgba(0, 0, 0, 0.06);
  --ys-warm: #111111;
  --ys-focus: rgba(0, 0, 0, 0.14);
  --ys-focus-ring: rgba(0, 0, 0, 0.1);
  --ys-shadow-sm: none;
  --ys-shadow-md: none;
  --ys-shadow-lg: none;
  --ys-page-max: 1440px;
  --ys-page-gutter: clamp(1rem, 2vw, 6rem);
  --ys-container: min(var(--ys-page-max), calc(100% - var(--ys-page-gutter)));
  --ys-container-pad: max(
    calc(var(--ys-page-gutter) / 2),
    calc((100vw - var(--ys-page-max)) / 2)
  );
  --ys-font-sans:
    "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Microsoft JhengHei",
    "Noto Sans SC", "Source Han Sans SC", "Heiti SC", "STHeiti", "SimHei",
    "Helvetica Neue", Arial, sans-serif;
  --ys-font-display:
    "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Microsoft JhengHei",
    "Noto Sans SC", "Source Han Sans SC", "Heiti SC", "STHeiti", "SimHei",
    "Helvetica Neue", Arial, sans-serif;
  font-family: var(--ys-font-sans);
}

html,
body,
#__nuxt {
  min-height: 100%;
  background: var(--ys-bg);
}

html {
  font-size: 15px;
  scroll-behavior: smooth;
}

body,
button,
input,
select,
textarea {
  font-family: var(--ys-font-sans);
}

body {
  margin: 0;
  color: var(--ys-text);
  background: var(--ys-bg);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

*::selection {
  background: rgba(139, 154, 135, 0.24);
}

.app-body {
  background: var(--ys-bg);
  color: var(--ys-text);
}

.ys-grain {
  display: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--ys-font-display);
  letter-spacing: 0;
  font-weight: 700;
}

a,
button,
input,
select,
textarea,
[role="button"] {
  transition:
    color 160ms ease,
    background-color 160ms ease,
    border-color 160ms ease,
    opacity 160ms ease,
    transform 160ms ease,
    box-shadow 160ms ease;
}

a,
button,
[role="button"] {
  -webkit-tap-highlight-color: transparent;
}

a:hover {
  color: var(--ys-text);
}

button:active,
[role="button"]:active,
a:active {
  transform: translateY(0.5px);
}

button:disabled,
input:disabled,
select:disabled,
textarea:disabled {
  cursor: not-allowed;
}

:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--ys-focus);
}

input,
select,
textarea {
  border-radius: 12px;
}

#nuxt-loading-indicator {
  box-shadow: none !important;
}

.minimal-panel {
  background: var(--ys-surface);
  border: 1px solid var(--ys-border);
}

.minimal-muted {
  color: var(--ys-text-muted);
}

.minimal-kicker {
  font-size: 10px;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--ys-text-muted);
}

.interactive-surface {
  transition:
    transform 160ms ease,
    background-color 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease,
    color 160ms ease;
}

.interactive-surface:hover {
  background: var(--ys-surface-hover);
  border-color: var(--ys-border-strong);
  transform: none;
  box-shadow: none;
}

.interactive-surface:active {
  transform: none;
  background: var(--ys-surface-active);
  box-shadow: none;
}

.ys-panel,
.ys-card,
.ys-soft-card {
  border: 1px solid var(--ys-border);
  border-radius: 1.25rem;
  background: var(--ys-surface);
}

.ys-card {
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    background-color 180ms ease,
    box-shadow 180ms ease;
}

.ys-card:hover {
  transform: none;
  border-color: var(--ys-border-strong);
  background: var(--ys-surface-hover);
  box-shadow: none;
}

.ys-soft-card {
  background: var(--ys-surface-soft);
}

.ys-chip,
.ys-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  min-height: 2rem;
  padding: 0.35rem 0.8rem;
  border: 1px solid var(--ys-border);
  border-radius: 999px;
  background: var(--ys-surface);
  color: var(--ys-text-soft);
  font-size: 0.74rem;
  line-height: 1;
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    background-color 160ms ease,
    color 160ms ease;
}

.ys-chip:hover,
.ys-pill:hover {
  transform: none;
  border-color: var(--ys-border-strong);
  background: var(--ys-surface-hover);
  color: var(--ys-text);
}

.ys-chip.is-active,
.ys-pill.is-active {
  border-color: var(--ys-text);
  background: var(--ys-text);
  color: #fff;
}

.ys-control {
  border: 1px solid var(--ys-border);
  border-radius: 0.95rem;
  background: var(--ys-surface);
  transition:
    border-color 160ms ease,
    background-color 160ms ease,
    box-shadow 160ms ease,
    transform 160ms ease;
}

.ys-control:hover {
  border-color: var(--ys-border-strong);
  background: var(--ys-surface-hover);
}

.ys-control:focus-within,
.ys-control.is-active {
  border-color: var(--ys-accent-strong);
  background: var(--ys-surface);
  box-shadow: 0 0 0 3px var(--ys-focus-ring);
}

.ys-quiet-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border-radius: 999px;
  padding: 0.45rem 0.8rem;
  color: var(--ys-text-muted);
  text-decoration: none;
  transition:
    transform 160ms ease,
    background-color 160ms ease,
    color 160ms ease;
}

.ys-quiet-link:hover {
  transform: none;
  background: var(--ys-surface-soft);
  color: var(--ys-text);
}

.ys-display {
  font-family: var(--ys-font-display);
}

.ys-shell {
  position: relative;
  z-index: 2;
}

.ys-section-shell {
  border: 1px solid var(--ys-border);
  border-radius: 1.6rem;
  background: var(--ys-surface);
}

.ys-flat-block {
  border: 1px solid var(--ys-border);
  border-radius: 1.15rem;
  background: var(--ys-surface-soft);
}

.ys-feedback {
  border-radius: 0.95rem;
  padding: 0.8rem 1rem;
  border: 1px solid var(--ys-border);
  background: var(--ys-surface);
  font-size: 0.78rem;
  line-height: 1.6;
}

.ys-feedback.is-danger {
  border-color: rgba(239, 68, 68, 0.18);
  background: rgba(254, 242, 242, 0.9);
  color: #b91c1c;
}

.ys-feedback.is-success {
  border-color: rgba(16, 185, 129, 0.18);
  background: rgba(236, 253, 245, 0.92);
  color: #047857;
}

.design-page,
.lab-page,
.portfolio-page,
.fd-page,
.pricing-page,
.founder-page,
.knowledge-page {
  background: #fff !important;
  color: #111 !important;
}

.design-page,
.lab-page,
.portfolio-page,
.fd-page,
.pricing-page,
.founder-page {
  padding: clamp(1.2rem, 3vw, 2rem) 0 clamp(3rem, 7vw, 6rem) !important;
}

.design-page > section,
.lab-page > section,
.portfolio-page > section,
.fd-page > section,
.pricing-container,
.founder-container,
.knowledge-page > div {
  width: var(--ys-container) !important;
  max-width: var(--ys-page-max) !important;
  margin-inline: auto !important;
}

.max-w-\[1240px\] {
  max-width: var(--ys-page-max) !important;
}

.catalog-toolbar,
.catalog-layout,
.product-detail-shell,
.home-section,
.home-showcase,
.home-stats,
.home-cta {
  width: var(--ys-container) !important;
  max-width: var(--ys-page-max) !important;
}

.design-hero,
.lab-hero,
.portfolio-hero,
.fd-hero,
.pricing-hero,
.profile-header,
.knowledge-panel {
  overflow: hidden !important;
  border: 0 !important;
  border-radius: 20px !important;
  background: #f2f0ed !important;
  color: #111 !important;
  box-shadow: none !important;
}

.design-hero,
.lab-hero,
.portfolio-hero,
.fd-hero,
.pricing-hero {
  margin-bottom: clamp(1.4rem, 4vw, 2.5rem) !important;
  padding: clamp(1.6rem, 5vw, 3.6rem) !important;
}

.design-hero h1,
.lab-hero h1,
.portfolio-hero h1,
.fd-hero h1,
.pricing-title,
.founder-page .name,
.knowledge-page h1 {
  max-width: 12ch !important;
  margin: 0 !important;
  color: #050505 !important;
  font-size: clamp(2.7rem, 6vw, 5.9rem) !important;
  font-weight: 900 !important;
  line-height: 0.92 !important;
  letter-spacing: 0 !important;
  text-transform: uppercase !important;
}

.design-hero p,
.lab-hero p,
.portfolio-hero p,
.fd-hero__lead,
.pricing-subtitle,
.founder-page .bio,
.knowledge-page p {
  color: #5f5f5f !important;
  line-height: 1.85 !important;
}

.minimal-kicker,
.design-label,
.lab-label,
.portfolio-label,
.fd-section-kicker,
.fd-mini,
.panel-title {
  color: #777 !important;
  font-size: 0.72rem !important;
  font-weight: 900 !important;
  letter-spacing: 0.12em !important;
  text-transform: uppercase !important;
}

.design-strip,
.fd-ribbon {
  width: 100% !important;
  max-width: none !important;
  overflow: hidden !important;
  border: 0 !important;
  background: #000 !important;
  color: #fff !important;
}

.design-strip span,
.fd-ribbon span {
  color: #fff !important;
  font-size: clamp(1.25rem, 2.6vw, 2.4rem) !important;
  font-weight: 900 !important;
}

.design-stage,
.lab-console,
.portfolio-stage,
.fd-stage,
.fd-content,
.pricing-cards,
.plan-details-container,
.faq-grid,
.content,
.knowledge-workbench {
  display: grid !important;
  gap: clamp(1rem, 2.2vw, 1.4rem) !important;
}

.design-stage,
.lab-console,
.portfolio-stage,
.fd-stage,
.knowledge-workbench {
  grid-template-columns: minmax(0, 0.86fr) minmax(320px, 1.14fr) !important;
  align-items: stretch !important;
}

.fd-content,
.pricing-cards,
.plan-details-container,
.faq-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
}

.design-stage__lead,
.design-stage__selector,
.design-stage__brief,
.design-package,
.lab-console__left,
.lab-console__center,
.lab-console__right,
.lab-capability,
.portfolio-hero__panel,
.portfolio-stage__lead,
.portfolio-stage__note,
.portfolio-card,
.fd-selector__item,
.fd-stage__left,
.fd-stage__right,
.fd-content__block,
.fd-cta,
.pricing-card,
.plan-detail-item,
.faq-item,
.section,
.filter-panel,
.content-stage,
.preview-card,
.footer-cta,
.story-entry,
.skill-map article,
.featured-strip button,
.path-link,
.hot-item {
  border: 1px solid #eeeeee !important;
  border-radius: 20px !important;
  background: #fff !important;
  color: #111 !important;
  box-shadow: none !important;
}

.portfolio-card,
.fd-selector__item,
.pricing-card,
.story-entry,
.path-link,
.hot-item {
  transition:
    transform 220ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 220ms ease,
    background-color 220ms ease !important;
}

.portfolio-card:hover,
.fd-selector__item:hover,
.pricing-card:hover,
.story-entry:hover,
.path-link:hover,
.hot-item:hover {
  border-color: #111 !important;
  background: #f7f7f7 !important;
  transform: translateY(-3px) !important;
}

.fd-selector__item.is-active,
.portfolio-filter__item.is-active,
.filter-token.is-active,
.fd-output-cloud__item.is-active {
  border-color: #000 !important;
  background: #000 !important;
  color: #fff !important;
}

.design-page button,
.lab-page button,
.portfolio-page button,
.fd-page button,
.pricing-page button,
.founder-page button,
.knowledge-page button,
.design-page a,
.lab-page a,
.portfolio-page a,
.fd-page a,
.pricing-page a,
.founder-page a,
.knowledge-page a {
  border-radius: 999px !important;
}

.design-page input,
.design-page textarea,
.lab-page input,
.lab-page textarea,
.portfolio-page input,
.portfolio-page textarea,
.fd-page input,
.fd-page textarea,
.knowledge-page input,
.knowledge-page textarea {
  border: 1px solid #e9e9e9 !important;
  border-radius: 16px !important;
  background: #f7f7f7 !important;
  color: #111 !important;
  box-shadow: none !important;
}

.design-page input::placeholder,
.design-page textarea::placeholder,
.lab-page input::placeholder,
.lab-page textarea::placeholder,
.fd-page input::placeholder,
.fd-page textarea::placeholder,
.knowledge-page input::placeholder,
.knowledge-page textarea::placeholder {
  color: rgba(0, 0, 0, 0.42) !important;
}

.card-top-bar,
.story-line {
  background: #000 !important;
}

.cta-button,
.details-link,
.reset-button,
.practice-button,
.stream-action,
.preview-action,
.fd-cta__link,
.fd-hero__switch {
  border: 0 !important;
  background: #000 !important;
  color: #fff !important;
}

.price-amount,
.price-custom,
.plan-detail-price,
.section-title,
.section-title h2,
.design-stage h2,
.lab-console h2,
.portfolio-stage h2,
.fd-stage h2,
.fd-cta h3,
.knowledge-page h2,
.knowledge-page h3 {
  color: #050505 !important;
  font-weight: 900 !important;
  letter-spacing: 0 !important;
}

.preview-cover,
[class*="bg-gradient"],
[class*="bg-[linear-gradient"],
[class*="bg-[radial-gradient"] {
  background: #f0f0f0 !important;
}

.text-\[\#243127\],
.text-\[\#223127\],
.text-\[\#5d685d\],
.text-\[\#5f695f\],
.text-\[\#708072\],
.text-\[\#617061\],
.text-\[\#526050\] {
  color: #111 !important;
}

.bg-\[\#f4efe6\],
.bg-\[\#f7f3ec\],
.bg-\[\#faf8f5\],
.bg-\[\#f6f1ea\] {
  background: #f3f3f3 !important;
}

@media (max-width: 1024px) {
  .design-stage,
  .lab-console,
  .portfolio-stage,
  .fd-stage,
  .knowledge-workbench,
  .fd-content,
  .pricing-cards,
  .plan-details-container,
  .faq-grid {
    grid-template-columns: 1fr !important;
  }
}

@media (max-width: 640px) {
  .design-page,
  .lab-page,
  .portfolio-page,
  .fd-page,
  .pricing-page,
  .founder-page,
  .knowledge-page {
    padding-top: 1rem !important;
  }

  .design-hero h1,
  .lab-hero h1,
  .portfolio-hero h1,
  .fd-hero h1,
  .pricing-title,
  .founder-page .name,
  .knowledge-page h1 {
    font-size: clamp(2.25rem, 12vw, 3.6rem) !important;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation: none !important;
    transition-duration: 0.01ms !important;
    transition-delay: 0ms !important;
  }
}
</style>
