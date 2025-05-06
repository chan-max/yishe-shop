<template>
  <div class="overflow-x-hidden">
    <LayoutPageNavbar class="h-[64px] max-h-[64px]" />
    <LayoutPageContent>
      <slot />
    </LayoutPageContent>
    <LayoutPageFooter class="h-[52px] md:h-[42px]" />
  </div>
</template>

<style>

@font-face {
  font-family: 'ChillRound';
  src: url('/ChillRoundM.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

/* 使用示例 */
.font-1 {
  font-family: 'ChillRound', sans-serif;
}
</style>
