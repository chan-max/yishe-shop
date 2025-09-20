# 搜索页面

## 概述
搜索页面使用 `search.vue` 作为主文件，提供完整的搜索和筛选功能。

## 文件结构

```
pages/search/
├── search.vue                    # 主搜索页面文件
├── components/                   # 组件目录
│   ├── headers/                 # 头部组件
│   │   ├── ClothingHeader.vue   # 服装设计头部
│   │   └── MaterialsHeader.vue  # 素材图头部
│   ├── SearchContent.vue        # 内容展示组件
│   ├── SearchFilter.vue         # 筛选组件
│   └── ...                      # 其他组件
├── search-content/              # 内容区域组件
│   ├── ClothingContent.vue      # 服装设计内容
│   └── MaterialsContent.vue     # 素材图内容
├── styles/                      # 样式文件
└── utils/                       # 工具函数
```

## 主要功能

1. **智能搜索**: 支持关键词搜索和智能建议
2. **分类筛选**: 服装设计和素材图两个主要分类
3. **高级筛选**: 支持多种筛选条件组合
4. **响应式设计**: 适配各种屏幕尺寸
5. **主题切换**: 支持明暗主题切换

## 使用方式

直接访问 `/search` 路由即可使用搜索页面功能。