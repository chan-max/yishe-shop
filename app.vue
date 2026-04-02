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
  --ys-bg: #f5f1ea;
  --ys-surface: #fffdf9;
  --ys-surface-soft: #f3eee6;
  --ys-surface-hover: #faf6ef;
  --ys-surface-active: #ede6db;
  --ys-border: rgba(36, 49, 39, 0.07);
  --ys-border-strong: rgba(36, 49, 39, 0.12);
  --ys-text: #243127;
  --ys-text-soft: #556258;
  --ys-text-muted: #7c847d;
  --ys-accent: #859480;
  --ys-accent-strong: #6d7d6a;
  --ys-accent-soft: rgba(133, 148, 128, 0.12);
  --ys-warm: #c48a6a;
  --ys-focus: rgba(133, 148, 128, 0.18);
  --ys-focus-ring: rgba(133, 148, 128, 0.14);
  --ys-shadow-sm: 0 2px 10px rgba(36, 49, 39, 0.025);
  --ys-shadow-md: 0 8px 20px rgba(36, 49, 39, 0.04);
  --ys-shadow-lg: 0 14px 34px rgba(36, 49, 39, 0.055);
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
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.45), transparent 18rem),
    radial-gradient(
      circle at top left,
      rgba(196, 138, 106, 0.05),
      transparent 26rem
    ),
    radial-gradient(
      circle at top right,
      rgba(133, 148, 128, 0.08),
      transparent 28rem
    ),
    var(--ys-bg);
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
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.012;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  background-repeat: repeat;
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
  color: #f8f5ef;
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
  border: 1px solid rgba(36, 49, 39, 0.05);
  border-radius: 1.6rem;
  background: rgba(255, 253, 249, 0.72);
}

.ys-flat-block {
  border: 1px solid rgba(36, 49, 39, 0.05);
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
