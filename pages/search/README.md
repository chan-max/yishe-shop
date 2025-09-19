# 搜索页面模块化结构

## 概述
搜索页面已经重构为模块化结构，便于维护和扩展。所有文件都位于 `/pages/search/` 目录下，保持原有的路由路径不变。

## 文件结构

```
pages/search/
├── index.vue                    # 主入口文件，保持路由路径
├── components/                  # 组件目录
│   ├── SearchPage.vue          # 主页面组件
│   ├── SearchHeader.vue        # 搜索头部组件
│   ├── SearchSidebar.vue       # 侧边栏组件
│   ├── SearchContent.vue       # 内容展示组件
│   └── SearchFilter.vue        # 筛选组件
├── utils/                      # 工具函数
├── styles/                     # 样式文件
│   ├── search-page.scss        # 主页面样式
│   ├── search-header.scss      # 头部样式
│   ├── search-sidebar.scss     # 侧边栏样式
│   ├── search-filter.scss      # 筛选样式
│   └── search-content.scss     # 内容样式
└── README.md                   # 说明文档
```

## 组件说明

### 主入口文件
- **index.vue**: 保持原有路由路径 `/search`，导入主页面组件

### 核心组件
- **SearchPage.vue**: 主页面组件，协调所有子组件
- **SearchHeader.vue**: 搜索框和筛选按钮
- **SearchSidebar.vue**: 左侧导航菜单
- **SearchContent.vue**: 搜索结果和照片墙展示
- **SearchFilter.vue**: 筛选条件面板

### 状态管理
- 所有状态和操作逻辑已整合到 **SearchPage.vue** 主组件中
- 使用 Vue 3 的 Composition API 管理响应式状态

### 样式管理
- 每个组件都有对应的样式文件
- 使用 SCSS 预处理器
- 支持响应式设计

## 优势

1. **模块化**: 每个功能独立成组件，便于维护
2. **简化结构**: 状态和操作逻辑直接整合在主组件中，减少文件复杂度
3. **可扩展**: 新功能可以轻松添加新组件
4. **路由不变**: 保持原有的 `/search` 路由路径
5. **类型安全**: 使用 TypeScript 提供类型检查

## 使用方式

路由访问方式保持不变：
- 访问 `/search` 即可使用搜索页面
- 所有原有功能都得到保留
- 性能和维护性得到提升

## 开发建议

1. 新增功能时，优先考虑是否可以作为独立组件
2. 状态和操作逻辑直接写在主组件中，保持代码集中
3. 样式按组件分离，避免全局污染
4. 保持组件的单一职责原则
