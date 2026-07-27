# 独立站 UI 重设计交接文档

## 项目背景

5 个独立站（shop-mug、shop-kitchen、shop-painting、shop-wall-art、shop-keychain）参考 [Woonuxt](https://woonuxt-v3.vercel.app/) 的设计风格进行了 UI 重设计。当前实现了基础结构，需要进一步完善细节。

## 参考模板

- **Woonuxt 演示站**：https://woonuxt-v3.vercel.app/
- **Woonuxt GitHub**：https://github.com/scottyzen/woonuxt

## 需要重点完善的方面

### 1. Hero 区域
当前实现比较简单，缺少真实背景图。Woonuxt 的 Hero 使用全宽高清背景图 + 半透明渐变叠加层。

**需要改进**：
- 添加真实的产品/生活场景背景图（每个站点不同）
- 文字排版需要更精致，参考 Woonuxt 的字号层级
- CTA 按钮样式需要更贴合 Woonuxt（圆角胶囊形、hover 效果）

### 2. Brand Logos Bar
当前用 SVG 文字占位，需要替换为真实的品牌 logo 图片。

**需要改进**：
- 替换为真实的合作伙伴/品牌 SVG 或 PNG 图片
- 调整灰度和透明度效果

### 3. Categories 网格
当前使用 emoji 占位，需要替换为真实的分类图片。

**需要改进**：
- 添加真实的分类图片（每个品类一张）
- 图片比例建议 4:5（略高于正方形）
- hover 缩放效果需要微调

### 4. Product Card 产品卡片
这是最重要的组件，当前实现了基本结构但细节不足。

**需要改进**：
- 双图 hover 切换效果需要更流畅（当前用两张独立图片，可以考虑用同一图片的不同裁切）
- 产品标题的 hover 变色效果
- 评分星星的样式（当前是纯文字 ★，建议用 SVG 或 icon font）
- 价格显示格式（当前只有 ¥，可以考虑添加货币切换）
- Sale badge 的位置和样式
- 卡片的圆角和阴影需要微调

### 5. 响应式布局
当前实现了基础断点，但细节不够。

**需要改进**：
- 移动端的 header 布局
- 产品网格在不同屏幕尺寸下的列数
- Footer 在移动端的堆叠方式
- 触摸设备上的交互效果

### 6. 动画和过渡
当前只有基础的 hover 效果。

**需要改进**：
- 页面滚动时的渐入动画（Intersection Observer）
- 产品卡片的 hover 动画（scale + shadow）
- 页面切换动画
- 移动端菜单的滑入/滑出动画

### 7. 字体和排版
当前使用系统字体。

**需要改进**：
- 考虑引入 Woonuxt 使用的 Nunito 或 Inter 字体
- 中文字体的优化（思源黑体等）
- 字号层级的统一

## 文件结构

```
apps/_shared/woonuxt-theme.css    # 共享样式（所有站点引用）
apps/shop-mug/pages/index.vue     # 杯子站（暖棕色 #c4704b）
apps/shop-kitchen/pages/index.vue # 厨房站（深绿色 #2d6a4f）
apps/shop-painting/pages/index.vue # 名画站（金色 #C9A96E）
apps/shop-wall-art/pages/index.vue # 装饰画站（灰蓝色 #5b7e8a）
apps/shop-keychain/pages/index.vue # 钥匙链站（紫色 #6c5ce7）
```

## CSS 变量系统

每个站点通过 `data-site` 属性切换品牌色：

```css
.woonuxt-theme[data-site="mug"]      { --wx-accent: #c4704b; }
.woonuxt-theme[data-site="kitchen"]  { --wx-accent: #2d6a4f; }
.woonuxt-theme[data-site="painting"] { --wx-accent: #C9A96E; }
.woonuxt-theme[data-site="wall-art"] { --wx-accent: #5b7e8a; }
.woonuxt-theme[data-site="keychain"] { --wx-accent: #6c5ce7; }
```

## 数据层接口（不变）

所有站点复用以下 composable：

```typescript
const { fetchPublishedProducts, getPublishedProductImage, getPublishedProductPath } = usePublishedProducts();

// 获取商品列表
const products = await fetchPublishedProducts({ pageSize: 12, random: true });

// 获取商品图片
const imageUrl = getPublishedProductImage(product, width?);

// 获取商品详情页路径
const path = getPublishedProductPath(product);
```

## 每个站点保留的逻辑

每个 `index.vue` 的 `<script setup>` 部分保持不变：
- `useSeoMeta` / `useHead` SEO 配置
- `usePublishedProducts()` 数据获取
- 倒计时逻辑
- 滚动监听
- 移动端菜单状态

只修改 `<template>` 和 `<style scoped>` 部分。

## 站点特有内容

### shop-mug（杯子）
- 分类：咖啡杯、陶瓷杯、保温杯、马克杯、茶杯、玻璃杯
- Hero 文案：发现手作杯具的温度与美感
- 品牌：MugAtelier

### shop-kitchen（厨房）
- 分类：围裙、砧板、隔热垫、调料罐、餐垫、厨房毛巾
- Hero 文案：让厨房，成为灵感发生地
- 品牌：厨房设计工坊

### shop-painting（名画）
- 分类：印象派、后印象派、立体主义、超现实主义、古典主义、现代艺术
- Hero 文案：将世界名画带入您的空间
- 品牌：名画艺廊
- 特殊：有艺术家名单滚动条、品质承诺区块、名言引用

### shop-wall-art（装饰画）
- 分类：客厅、卧室、办公室、咖啡馆、餐厅、儿童房
- Hero 文案：为每一面墙注入艺术灵魂
- 品牌：墙面艺术馆

### shop-keychain（钥匙链）
- 分类：亚克力、金属、硅胶、木质、皮革、树脂
- Hero 文案：把个性挂在钥匙上
- 品牌：KEYCHAIN POP

## 开发命令

```bash
# 启动开发服务器
npm run dev:mug         # 端口 15206
npm run dev:kitchen     # 端口 15208
npm run dev:painting    # 端口 15210
npm run dev:wallart     # 端口 15212
npm run dev:keychain    # 端口 15214

# 构建
npm run build:mug
npm run build:kitchen
npm run build:painting
npm run build:wallart
npm run build:keychain
```

## 注意事项

1. 所有站点使用 `definePageMeta({ layout: false })` 完全自定义布局
2. 样式使用 scoped CSS，避免全局污染
3. 移动端优先设计，响应式断点：480px / 768px / 1024px
4. 图片使用 `loading="lazy"` 延迟加载
5. 产品卡片需要支持双图 hover 切换（需要后端返回多张图片）

## 待办事项

- [ ] 为每个站点设计真实的 Hero 背景图
- [ ] 替换 Brand Bar 的占位文字为真实 logo
- [ ] 为 Categories 添加真实分类图片
- [ ] 优化 Product Card 的双图切换效果
- [ ] 添加页面滚动渐入动画
- [ ] 完善移动端交互细节
- [ ] 引入统一的字体方案
- [ ] 添加暗色模式支持（可选）
