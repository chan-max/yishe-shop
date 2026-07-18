<script setup lang="ts">
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
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
  heart: faHeart,
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

const icon = computed(() => iconMap[props.name] || faCircleQuestion);
const iconSize = computed(() =>
  typeof props.size === "number" ? `${props.size}px` : props.size,
);
</script>

<template>
  <FontAwesomeIcon
    class="app-icon"
    :icon="icon"
    :fixed-width="fixedWidth"
    :style="{ fontSize: iconSize }"
  />
</template>

<style scoped>
.app-icon {
  display: inline-block;
  flex: 0 0 auto;
  line-height: 1;
}
</style>
