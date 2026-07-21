<script setup lang="ts">
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowLeft,
  faArrowRight,
  faArrowUpRightFromSquare,
  faBars,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faCircleCheck,
  faCircleInfo,
  faCircleQuestion,
  faCircleXmark,
  faCube,
  faEnvelope,
  faLaptop,
  faLink,
  faMagnifyingGlass,
  faMoon,
  faPalette,
  faPlus,
  faRotateRight,
  faShareNodes,
  faSliders,
  faSun,
  faTriangleExclamation,
  faUser,
  faWandMagicSparkles,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const svgIcons: Record<string, string> = {
  heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  "heart-fill": `<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  "user-circle": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></svg>`,
  x: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  "chevron-down": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
};

const iconMap: Record<string, IconDefinition> = {
  "arrow-left": faArrowLeft,
  "arrow-right": faArrowRight,
  "arrow-up-right": faArrowUpRightFromSquare,
  check: faCircleCheck,
  "check-circle": faCircleCheck,
  "chevron-down": faChevronDown,
  "chevron-left": faChevronLeft,
  "chevron-right": faChevronRight,
  cube: faCube,
  envelope: faEnvelope,
  heart: faHeartRegular,
  info: faCircleInfo,
  laptop: faLaptop,
  link: faLink,
  menu: faBars,
  moon: faMoon,
  palette: faPalette,
  plus: faPlus,
  reset: faRotateRight,
  search: faMagnifyingGlass,
  share: faShareNodes,
  sliders: faSliders,
  sparkle: faWandMagicSparkles,
  sun: faSun,
  user: faUser,
  warning: faTriangleExclamation,
  x: faXmark,
  "x-circle": faCircleXmark,
};

const props = withDefaults(
  defineProps<{
    name: string;
    size?: number | string;
    fixedWidth?: boolean;
  }>(),
  {
    size: 16,
    fixedWidth: true,
  },
);

const customSvg = computed(() => svgIcons[props.name] || null);
const icon = computed(() => iconMap[props.name] || faCircleQuestion);
const iconSize = computed(() =>
  typeof props.size === "number" ? `${props.size}px` : props.size,
);
</script>

<template>
  <span
    v-if="customSvg"
    class="app-icon custom-svg-icon"
    :style="{ width: iconSize, height: iconSize, fontSize: iconSize }"
    v-html="customSvg"
  ></span>
  <FontAwesomeIcon
    v-else
    class="app-icon"
    :icon="icon"
    :fixed-width="fixedWidth"
    :style="{ fontSize: iconSize }"
  />
</template>

<style scoped>
.app-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  line-height: 1;
}

.custom-svg-icon :deep(svg) {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
