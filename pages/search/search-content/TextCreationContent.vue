<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-01-27 11:00:00
 * @FilePath: /yishe-nuxt/pages/search/search-content/TextCreationContent.vue
 * @Description: 文字创作内容组件 - 使用列表式展示
-->
<template>
  <div class="text-creation-content">
    <!-- 文字创作内容主体 -->
    <div class="content-body">
      <!-- 加载状态 -->
      <LoadingSpinner 
        v-if="loading || !hasInitialized" 
        text="正在加载文字创作内容..."
      />
      
      <!-- 空状态 -->
      <EmptyState 
        v-else-if="textItems.length === 0"
        icon="mdi-text-box-outline"
        title="暂无文字创作内容"
        description="请尝试调整筛选条件或稍后再试"
      />
      
      <!-- 文字内容列表 -->
      <div v-else class="text-list">
        <div 
          v-for="(item, index) in textItems" 
          :key="item.id"
          class="text-item"
          @click="onItemClick(item)"
        >
          <!-- 文字卡片 -->
          <div class="text-card">
            <!-- 头部信息 -->
            <div class="text-header">
              <div class="text-title">
                <h3>{{ item.title }}</h3>
                <div class="text-meta">
                  <span class="text-category">{{ item.category }}</span>
                  <span class="text-language">{{ item.language }}</span>
                  <span class="text-length">{{ item.length }}</span>
                </div>
              </div>
              <div class="text-actions">
                <v-btn
                  variant="text"
                  size="small"
                  icon
                  @click.stop="onCopyText(item)"
                  class="action-btn"
                >
                  <v-icon>mdi-content-copy</v-icon>
                </v-btn>
                <v-btn
                  variant="text"
                  size="small"
                  icon
                  @click.stop="onLikeText(item)"
                  class="action-btn"
                  :class="{ 'liked': item.isLiked }"
                >
                  <v-icon>{{ item.isLiked ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                </v-btn>
                <v-btn
                  variant="text"
                  size="small"
                  icon
                  @click.stop="onShareText(item)"
                  class="action-btn"
                >
                  <v-icon>mdi-share-variant</v-icon>
                </v-btn>
              </div>
            </div>
            
            <!-- 文字内容 -->
            <div class="text-content">
              <div class="text-preview" :class="{ 'expanded': item.isExpanded }">
                <p>{{ item.content }}</p>
              </div>
              <button 
                v-if="item.content.length > 200"
                @click.stop="toggleExpand(item)"
                class="expand-btn"
              >
                {{ item.isExpanded ? '收起' : '展开' }}
                <v-icon size="small">
                  {{ item.isExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                </v-icon>
              </button>
            </div>
            
            <!-- 标签和统计 -->
            <div class="text-footer">
              <div class="text-tags" v-if="item.tags && item.tags.length > 0">
                <v-chip
                  v-for="tag in item.tags"
                  :key="tag"
                  size="x-small"
                  variant="outlined"
                  class="text-tag"
                >
                  {{ tag }}
                </v-chip>
              </div>
              <div class="text-stats">
                <span class="stat-item">
                  <v-icon size="small">mdi-eye</v-icon>
                  {{ item.views || 0 }}
                </span>
                <span class="stat-item">
                  <v-icon size="small">mdi-heart</v-icon>
                  {{ item.likes || 0 }}
                </span>
                <span class="stat-item">
                  <v-icon size="small">mdi-download</v-icon>
                  {{ item.downloads || 0 }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 分页 -->
      <ContentPagination
        v-model="currentPage"
        :total="total"
        :page-size="pageSize"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import EmptyState from '../components/EmptyState.vue'
import ContentPagination from '../components/ContentPagination.vue'

// 分页相关状态
const currentPage = ref(1)
const pageSize = ref(20)
const total = ref(0)
const loading = ref(false)
const hasInitialized = ref(false)

// 文字内容数据
const textItems = ref([])

// 获取文字创作内容列表
const fetchTextItems = async () => {
  loading.value = true
  try {
    const { $customFetch } = useNuxtApp()
    const requestBody = {
      currentPage: currentPage.value,
      pageSize: pageSize.value,
      isPublish: true,
    }
    
    const response = await $customFetch("/sentences/page", {
      method: "POST",
      body: requestBody,
    })
    
    // 转换数据格式以适配文字内容显示
    textItems.value = response.list.map(item => ({
      id: item.id,
      title: item.content?.substring(0, 50) + (item.content?.length > 50 ? '...' : '') || '无标题',
      content: item.content || '',
      description: item.description || '',
      category: getCategoryFromContent(item.content),
      language: '中文', // 默认中文，可以根据实际数据调整
      length: getLengthCategory(item.content?.length || 0),
      tags: item.keywords ? item.keywords.split(',').map(k => k.trim()) : ['文字创作'],
      views: Math.floor(Math.random() * 1000) + 100, // 模拟浏览量
      likes: Math.floor(Math.random() * 200) + 20, // 模拟点赞数
      downloads: Math.floor(Math.random() * 100) + 10, // 模拟下载数
      isLiked: false,
      isExpanded: false,
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: item.updatedAt || new Date().toISOString()
    }))
    
    total.value = response.total
    hasInitialized.value = true
  } catch (error) {
    console.error("获取文字创作内容失败:", error)
    hasInitialized.value = true
  } finally {
    loading.value = false
  }
}

// 根据内容判断分类
const getCategoryFromContent = (content: string) => {
  if (!content) return '其他'
  
  const categories = {
    '文案': ['广告', '营销', '推广', '宣传'],
    '标题': ['标题', '题目', '主题'],
    '描述': ['描述', '介绍', '说明'],
    '故事': ['故事', '小说', '情节', '叙述'],
    '诗歌': ['诗', '歌', '韵', '律'],
    '新闻': ['新闻', '报道', '资讯', '消息'],
    '评论': ['评论', '评价', '观点', '看法']
  }
  
  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => content.includes(keyword))) {
      return category
    }
  }
  
  return '其他'
}

// 根据长度判断分类
const getLengthCategory = (length: number) => {
  if (length <= 20) return '短句'
  if (length <= 100) return '中等'
  if (length <= 500) return '长文'
  return '超长'
}

// 切换展开/收起
const toggleExpand = (item: any) => {
  item.isExpanded = !item.isExpanded
}

// 复制文字
const onCopyText = async (item: any) => {
  try {
    await navigator.clipboard.writeText(item.content)
    // 这里可以添加复制成功的提示
    console.log('文字已复制到剪贴板')
  } catch (error) {
    console.error('复制失败:', error)
  }
}

// 点赞文字
const onLikeText = (item: any) => {
  item.isLiked = !item.isLiked
  if (item.isLiked) {
    item.likes += 1
  } else {
    item.likes -= 1
  }
}

// 分享文字
const onShareText = (item: any) => {
  // 这里可以实现分享功能
  console.log('分享文字:', item.title)
}

// 点击文字项
const onItemClick = (item: any) => {
  console.log('点击文字项:', item)
  // 这里可以添加跳转到详情页的逻辑
}

// 监听分页变化
watch(currentPage, () => {
  fetchTextItems()
})

// 初始化加载
onMounted(() => {
  fetchTextItems()
})
</script>

<style lang="scss" scoped>
@use './content-areas.scss';

.text-creation-content {
  .content-body {
    .text-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .text-item {
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-2px);
        
        .text-card {
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          border-color: var(--theme-primary);
        }
      }
    }
    
    .text-card {
      background: var(--bg-tertiary);
      border: 1px solid var(--border-primary);
      border-radius: 12px;
      padding: 1.5rem;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--theme-primary), #8b5cf6, #06b6d4);
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      &:hover::before {
        opacity: 1;
      }
    }
    
    .text-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
      
      .text-title {
        flex: 1;
        
        h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 0.5rem 0;
          line-height: 1.4;
        }
        
        .text-meta {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          
          span {
            font-size: 0.8rem;
            padding: 0.25rem 0.5rem;
            border-radius: 12px;
            font-weight: 500;
          }
          
          .text-category {
            background: rgba(59, 130, 246, 0.1);
            color: #3b82f6;
            border: 1px solid rgba(59, 130, 246, 0.2);
          }
          
          .text-language {
            background: rgba(16, 185, 129, 0.1);
            color: #10b981;
            border: 1px solid rgba(16, 185, 129, 0.2);
          }
          
          .text-length {
            background: rgba(245, 158, 11, 0.1);
            color: #f59e0b;
            border: 1px solid rgba(245, 158, 11, 0.2);
          }
        }
      }
      
      .text-actions {
        display: flex;
        gap: 0.25rem;
        flex-shrink: 0;
        
        .action-btn {
          color: var(--text-tertiary) !important;
          min-width: 32px;
          height: 32px;
          
          &:hover {
            color: var(--text-primary) !important;
            background: var(--bg-hover) !important;
          }
          
          &.liked {
            color: #ef4444 !important;
          }
        }
      }
    }
    
    .text-content {
      margin-bottom: 1rem;
      
      .text-preview {
        position: relative;
        
        p {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-secondary);
          margin: 0;
          white-space: pre-wrap;
          word-break: break-word;
        }
        
        &.expanded {
          p {
            max-height: none;
          }
        }
        
        &:not(.expanded) {
          p {
            max-height: 4.8rem; // 约3行文字的高度
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }
        }
      }
      
      .expand-btn {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        margin-top: 0.5rem;
        padding: 0.25rem 0.5rem;
        background: transparent;
        border: none;
        color: var(--theme-primary);
        font-size: 0.85rem;
        cursor: pointer;
        border-radius: 4px;
        transition: all 0.2s ease;
        
        &:hover {
          background: var(--bg-hover);
        }
      }
    }
    
    .text-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.75rem;
      
      .text-tags {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        
        .text-tag {
          font-size: 0.75rem;
          color: var(--text-tertiary) !important;
          border-color: var(--border-secondary) !important;
          
          &:hover {
            color: var(--text-primary) !important;
            border-color: var(--theme-primary) !important;
          }
        }
      }
      
      .text-stats {
        display: flex;
        gap: 1rem;
        
        .stat-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.8rem;
          color: var(--text-tertiary);
          
          .v-icon {
            font-size: 0.9rem;
          }
        }
      }
    }
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .text-creation-content {
    .text-card {
      padding: 1rem;
    }
    
    .text-header {
      flex-direction: column;
      gap: 0.75rem;
      
      .text-actions {
        align-self: flex-end;
      }
    }
    
    .text-footer {
      flex-direction: column;
      align-items: flex-start;
      
      .text-stats {
        gap: 0.75rem;
      }
    }
  }
}

/* 小屏幕适配 */
@media (max-width: 480px) {
  .text-creation-content {
    .text-card {
      padding: 0.75rem;
    }
    
    .text-title h3 {
      font-size: 1rem;
    }
    
    .text-meta {
      gap: 0.5rem;
      
      span {
        font-size: 0.75rem;
        padding: 0.2rem 0.4rem;
      }
    }
    
    .text-content .text-preview p {
      font-size: 0.9rem;
    }
  }
}
</style>
