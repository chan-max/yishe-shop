# CategoryTabs 组件重构

## 概述

为了更好的代码维护性和组件复用性，我们将原本在 `Welcome.vue` 中的 tab 功能拆分出了一个独立的 `CategoryTabs.vue` 组件。

## 重构内容

### 1. 新增组件
- `CategoryTabs.vue` - 独立的分类标签组件

### 2. 功能特性
- 支持多个分类标签的切换
- 鼠标悬停显示下拉菜单
- 响应式设计，支持移动端
- 包含热门搜索和特色商品展示

### 3. Props 接口
```typescript
interface Props {
  categories: Category[];           // 分类数据
  activeCategory: number;           // 当前激活的分类索引
  isDropdownVisible: boolean;       // 是否显示下拉菜单
}
```

### 4. Events 接口
```typescript
interface Emits {
  (e: 'mouseenter', index: number): void;    // 鼠标进入事件
  (e: 'mouseleave'): void;                   // 鼠标离开事件
  (e: 'tabChange', index: number): void;     // 标签切换事件
}
```

## 使用方法

在 `Welcome.vue` 中使用：

```vue
<template>
  <CategoryTabs
    :categories="categories"
    :active-category="activeCategory"
    :is-dropdown-visible="isDropdownVisible"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @tab-change="handleTabChange"
  />
</template>
```

## 样式特性

- 使用 SCSS 编写，支持嵌套和变量
- 响应式设计，适配不同屏幕尺寸
- 平滑的动画过渡效果
- 现代化的 UI 设计

## 维护优势

1. **代码分离**: tab 功能独立成组件，便于维护
2. **可复用性**: 可以在其他页面中复用此组件
3. **类型安全**: 使用 TypeScript 接口定义，提供更好的类型检查
4. **样式隔离**: 使用 `scoped` 样式，避免样式冲突

## 文件结构

```
components/awesome/
├── Welcome.vue          # 主页面组件（已重构）
├── CategoryTabs.vue     # 分类标签组件（新增）
└── README.md           # 说明文档（新增）
``` 