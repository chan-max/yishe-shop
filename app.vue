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
  --ys-bg: #f7f5f2;
  --ys-surface: #ffffff;
  --ys-surface-soft: #f3f0eb;
  --ys-surface-hover: #fcfbf9;
  --ys-surface-active: #f4efe9;
  --ys-border: rgba(28, 25, 23, 0.09);
  --ys-border-strong: rgba(28, 25, 23, 0.18);
  --ys-text: #1c1917;
  --ys-text-soft: #57534e;
  --ys-text-muted: #78716c;
  --ys-accent: #b88b4a;
  --ys-accent-soft: rgba(184, 139, 74, 0.12);
  --ys-focus: rgba(28, 25, 23, 0.16);
  --ys-font-sans:
    "MiSans", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
    "Noto Sans SC", "Helvetica Neue", Arial, sans-serif;
  --ys-font-display:
    "MiSans", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
    "Noto Sans SC", sans-serif;
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
  background: rgba(184, 139, 74, 0.18);
}

.app-body {
  background: var(--ys-bg);
  color: var(--ys-text);
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--ys-font-display);
  letter-spacing: 0;
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
  letter-spacing: 0.24em;
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
  box-shadow: 0 6px 16px rgba(28, 25, 23, 0.025);
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
  box-shadow: 0 8px 18px rgba(28, 25, 23, 0.03);
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
  border-color: #1c1917;
  background: #1c1917;
  color: #f7f5f2;
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
  border-color: #1c1917;
  background: var(--ys-surface);
  box-shadow: 0 0 0 4px rgba(28, 25, 23, 0.08);
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
