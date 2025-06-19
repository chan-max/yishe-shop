<template>
  <div class="flex justify-center items-center py-12">
    <div class="text-center">
      <v-progress-circular
        indeterminate
        :color="color"
        :size="size"
      ></v-progress-circular>
      <p v-if="text" class="mt-4 text-gray-600 text-sm">{{ text }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * 通用Loading组件
 * 
 * 使用示例：
 * <Loading /> - 默认样式
 * <Loading text="加载中..." /> - 带文字提示
 * <Loading :size="32" color="success" text="正在处理..." /> - 自定义大小和颜色
 * 
 * Props:
 * - size: loading圆圈大小，默认64
 * - color: loading颜色，默认'primary'
 * - text: 显示的文字提示，可选
 */
interface Props {
  size?: number | string
  color?: string
  text?: string
}

withDefaults(defineProps<Props>(), {
  size: 64,
  color: 'primary',
  text: ''
})
</script> 