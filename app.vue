<script setup lang="ts">
import { useToast } from "~/composables/use-toast";

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
  title: "衣设服装设计 - 创意印花图案与服装设计平台",
  description:
    "衣设是一个专注于创意印花图案和服装设计的专业平台，汇聚全球设计师的创意灵感，提供服装设计作品展示、设计师交流、设计灵感获取等服务。",
  keywords:
    "衣设服装设计,创意印花,图案设计,服装设计,服装设计师平台,服装设计作品集,服装设计灵感,印花图案,时尚设计,服装设计服务,设计师社区",
  author: "衣设设计团队",
  language: "zh-CN",
  robots:
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  ogTitle: "衣设服装设计 - 创意印花图案与服装设计平台",
  ogDescription:
    "衣设是一个专注于创意印花图案和服装设计的专业平台，汇聚全球设计师的创意灵感，提供服装设计作品展示、设计师交流、设计灵感获取等服务。",
  ogType: "website",
  ogUrl: "https://1s.design",
  ogImage: "https://1s.design/logo/logo.svg",
  ogSiteName: "衣设服装设计",
  ogLocale: "zh_CN",
  twitterCard: "summary_large_image",
  twitterTitle: "衣设服装设计 - 创意印花图案与服装设计平台",
  twitterDescription:
    "衣设是一个专注于创意印花图案和服装设计的专业平台，汇聚全球设计师的创意灵感。",
  twitterImage: "https://1s.design/logo/logo.svg",
  "theme-color": "#f7f5f2",
  "apple-mobile-web-app-capable": "yes",
  "apple-mobile-web-app-status-bar-style": "default",
});

useHead({
  htmlAttrs: { lang: "zh-CN" },
  link: [{ rel: "canonical", href: "https://1s.design" }],
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
  --ys-bg: #f8f5ef;
  --ys-surface: #ffffff;
  --ys-surface-soft: #f2ede5;
  --ys-surface-hover: #fcfaf6;
  --ys-surface-active: #efe7dd;
  --ys-border: rgba(36, 49, 39, 0.1);
  --ys-border-strong: rgba(36, 49, 39, 0.18);
  --ys-text: #243127;
  --ys-text-soft: #556258;
  --ys-text-muted: #7c847d;
  --ys-accent: #8b9a87;
  --ys-accent-strong: #6d7d6a;
  --ys-accent-soft: rgba(139, 154, 135, 0.14);
  --ys-warm: #c48a6a;
  --ys-focus: rgba(139, 154, 135, 0.2);
  --ys-focus-ring: rgba(139, 154, 135, 0.16);
  --ys-shadow-sm: 0 10px 24px rgba(36, 49, 39, 0.05);
  --ys-shadow-md: 0 18px 40px rgba(36, 49, 39, 0.08);
  --ys-shadow-lg: 0 24px 60px rgba(36, 49, 39, 0.12);
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
    radial-gradient(circle at top left, rgba(196, 138, 106, 0.08), transparent 22rem),
    radial-gradient(circle at top right, rgba(139, 154, 135, 0.12), transparent 24rem),
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
  opacity: 0.02;
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
  transform: translateY(-1px);
  box-shadow: var(--ys-shadow-sm);
}

.interactive-surface:active {
  transform: translateY(1px);
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
  transform: translateY(-1px);
  border-color: var(--ys-border-strong);
  background: var(--ys-surface-hover);
  box-shadow: var(--ys-shadow-md);
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
  transform: translateY(-1px);
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
  box-shadow: 0 0 0 4px var(--ys-focus-ring);
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
  transform: translateY(-1px);
  background: var(--ys-surface);
  color: var(--ys-text);
}

.ys-display {
  font-family: var(--ys-font-display);
}

.ys-shell {
  position: relative;
  z-index: 2;
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
