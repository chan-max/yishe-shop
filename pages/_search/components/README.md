# 通用组件说明

本文档说明了从服装和素材组件中抽离出来的通用组件，这些组件可以在其他类似的内容展示页面中复用。

## 抽离的组件

### 1. LoadingSpinner.vue
**用途**: 通用的加载状态组件
**特性**:
- 可自定义加载文本
- 统一的加载动画样式
- 响应式设计

**使用示例**:
```vue
<LoadingSpinner text="正在加载数据..." />
```

### 2. ImageSkeleton.vue
**用途**: 图片加载时的骨架屏组件
**特性**:
- 可自定义宽高比
- 可选择是否显示信息骨架
- 波浪动画效果

**使用示例**:
```vue
<ImageSkeleton aspect-ratio="4/3" :show-info="true" />
```

### 3. ContentPagination.vue
**用途**: 通用的分页组件
**特性**:
- 基于 Vuetify 的 v-pagination
- 支持自定义页面大小
- 自动计算总页数

**使用示例**:
```vue
<ContentPagination
  v-model="currentPage"
  :total="total"
  :page-size="pageSize"
/>
```

### 4. EmptyState.vue
**用途**: 空状态显示组件
**特性**:
- 可自定义图标、标题、描述
- 支持重试按钮
- 统一的空状态样式

**使用示例**:
```vue
<EmptyState
  icon="mdi-image-outline"
  title="暂无数据"
  description="请尝试调整筛选条件"
  :show-retry="true"
  @retry="handleRetry"
/>
```

### 5. ImageCard.vue
**用途**: 通用的图片卡片组件
**特性**:
- 支持图片加载状态管理
- 可自定义悬浮操作按钮
- 支持标签、规格信息、元数据显示
- 可自定义宽高比
- 支持徽章显示

**使用示例**:
```vue
<ImageCard
  :item="item"
  :image="item.image"
  :title="item.title"
  :description="item.description"
  :tags="item.tags"
  :price="item.price"
  :likes="item.likes"
  aspect-ratio="4/3"
  @action="onCardAction"
/>
```

### 6. FilterRow.vue
**用途**: 通用的筛选器布局组件
**特性**:
- 支持多种筛选器类型：下拉选择、文本输入、价格范围、颜色选择
- 统一的筛选器样式
- 响应式布局

**使用示例**:
```vue
<FilterRow 
  :filters="filterConfig" 
  v-model="filters"
/>
```

## 组件优势

1. **代码复用**: 避免重复编写相似的UI组件
2. **统一风格**: 确保整个应用的UI风格一致
3. **易于维护**: 修改通用组件即可影响所有使用该组件的地方
4. **类型安全**: 使用 TypeScript 提供完整的类型支持
5. **可扩展性**: 组件设计考虑了扩展性，可以轻松添加新功能

## 使用建议

1. 在创建新的内容展示页面时，优先考虑使用这些通用组件
2. 如果需要修改通用组件的样式或功能，请确保不会影响其他页面的使用
3. 新增通用组件时，请更新本文档并提供使用示例
4. 保持组件的单一职责原则，每个组件只负责一个特定的功能

## 文件结构

```
pages/_search/components/
├── LoadingSpinner.vue      # 加载状态组件
├── ImageSkeleton.vue       # 骨架屏组件
├── ContentPagination.vue   # 分页组件
├── EmptyState.vue          # 空状态组件
├── ImageCard.vue           # 图片卡片组件
├── FilterRow.vue           # 筛选器组件
└── README.md              # 本文档
```
