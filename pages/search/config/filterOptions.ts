/**
 * 搜索页面筛选选项统一配置
 * 避免重复定义，便于维护
 */

// 通用颜色选项
export const colorOptions = [
  { value: '#000000', text: '黑色' },
  { value: '#FFFFFF', text: '白色' },
  { value: '#FF0000', text: '红色' },
  { value: '#0000FF', text: '蓝色' },
  { value: '#00FF00', text: '绿色' },
  { value: '#FFFF00', text: '黄色' },
  { value: '#FF69B4', text: '粉色' },
  { value: '#800080', text: '紫色' },
  { value: '#FFA500', text: '橙色' },
  { value: '#8B4513', text: '棕色' },
  { value: '#808080', text: '灰色' },
  { value: '#000080', text: '海军蓝' }
]

// 通用语言选项
export const languageOptions = [
  { value: 'zh', text: '中文' },
  { value: 'en', text: '英文' },
  { value: 'ja', text: '日文' },
  { value: 'ko', text: '韩文' },
  { value: 'fr', text: '法文' },
  { value: 'de', text: '德文' },
  { value: 'es', text: '西班牙文' },
  { value: 'it', text: '意大利文' }
]

// 服装设计筛选选项
export const clothingFilterOptions = {
  sort: [
    { value: 'latest', text: '最新上架' },
    { value: 'popular', text: '最受欢迎' },
    { value: 'rating', text: '好评如潮' },
    { value: 'price_asc', text: '价格从低到高' },
    { value: 'price_desc', text: '价格从高到低' }
  ],
  price: [
    { value: '0-100', label: '0-100元' },
    { value: '100-300', label: '100-300元' },
    { value: '300-500', label: '300-500元' },
    { value: '500-1000', label: '500-1000元' },
    { value: '1000+', label: '1000元以上' }
  ],
  gender: [
    { value: 'male', label: '男装' },
    { value: 'female', label: '女装' },
    { value: 'unisex', label: '中性' }
  ],
  ageGroup: [
    { value: 'youth', label: '青年(18-25)' },
    { value: 'adult', label: '成人(25-40)' },
    { value: 'senior', label: '老年(40+)' }
  ],
  style: [
    { value: 'casual', text: '休闲' },
    { value: 'formal', text: '正装' },
    { value: 'sports', text: '运动' },
    { value: 'vintage', text: '复古' },
    { value: 'street', text: '街头' },
    { value: 'business', text: '商务' },
    { value: 'sweet', text: '甜美' },
    { value: 'cool', text: '酷炫' }
  ],
  season: [
    { value: 'spring', label: '春季' },
    { value: 'summer', label: '夏季' },
    { value: 'autumn', label: '秋季' },
    { value: 'winter', label: '冬季' },
    { value: 'all_season', label: '四季' }
  ],
  material: [
    { value: 'cotton', label: '棉质' },
    { value: 'wool', label: '羊毛' },
    { value: 'silk', label: '丝绸' },
    { value: 'linen', label: '亚麻' },
    { value: 'denim', label: '牛仔' },
    { value: 'knit', label: '针织' },
    { value: 'leather', label: '皮革' }
  ],
  color: [
    { value: 'black', label: '黑色' },
    { value: 'white', label: '白色' },
    { value: 'red', label: '红色' },
    { value: 'blue', label: '蓝色' },
    { value: 'green', label: '绿色' },
    { value: 'yellow', label: '黄色' },
    { value: 'pink', label: '粉色' },
    { value: 'purple', label: '紫色' },
    { value: 'gray', label: '灰色' },
    { value: 'brown', label: '棕色' }
  ],
  size: [
    { value: 'xs', label: 'XS' },
    { value: 's', label: 'S' },
    { value: 'm', label: 'M' },
    { value: 'l', label: 'L' },
    { value: 'xl', label: 'XL' },
    { value: 'xxl', label: 'XXL' }
  ],
  occasion: [
    { value: 'daily', label: '日常' },
    { value: 'work', label: '工作' },
    { value: 'party', label: '聚会' },
    { value: 'sport', label: '运动' },
    { value: 'formal', label: '正式场合' },
    { value: 'date', label: '约会' }
  ],
  discount: [
    { value: 'no_discount', label: '无折扣' },
    { value: 'discount_90', label: '9折以上' },
    { value: 'discount_70_90', label: '7-9折' },
    { value: 'discount_50_70', label: '5-7折' },
    { value: 'discount_50', label: '5折以下' }
  ]
}

// 素材图筛选选项
export const materialsFilterOptions = {
  sort: [
    { value: 'latest', text: '最新上传' },
    { value: 'popular', text: '最受欢迎' },
    { value: 'downloads', text: '下载最多' },
    { value: 'rating', text: '评分最高' }
  ],
  type: [
    { value: 'background', label: '背景图' },
    { value: 'texture', label: '纹理' },
    { value: 'icon', label: '图标' },
    { value: 'illustration', label: '插画' },
    { value: 'photo', label: '照片' }
  ],
  format: [
    { value: 'png', label: 'PNG' },
    { value: 'jpg', label: 'JPG' },
    { value: 'svg', label: 'SVG' },
    { value: 'ai', label: 'AI' },
    { value: 'psd', label: 'PSD' },
    { value: 'eps', label: 'EPS' }
  ],
  group: [
    { value: 'business', label: '商务' },
    { value: 'nature', label: '自然' },
    { value: 'technology', label: '科技' },
    { value: 'food', label: '美食' },
    { value: 'travel', label: '旅行' },
    { value: 'abstract', label: '抽象' },
    { value: 'minimalist', label: '极简' }
  ],
  color: [
    { value: 'red', label: '红色' },
    { value: 'blue', label: '蓝色' },
    { value: 'green', label: '绿色' },
    { value: 'yellow', label: '黄色' },
    { value: 'purple', label: '紫色' },
    { value: 'orange', label: '橙色' },
    { value: 'pink', label: '粉色' },
    { value: 'teal', label: '青色' }
  ]
}

// 文字创作筛选选项
export const textCreationFilterOptions = {
  sort: [
    { value: 'latest', text: '最新创作' },
    { value: 'popular', text: '最受欢迎' },
    { value: 'downloads', text: '下载最多' },
    { value: 'rating', text: '评分最高' }
  ],
  category: [
    { value: 'copywriting', text: '文案' },
    { value: 'title', text: '标题' },
    { value: 'description', text: '描述' },
    { value: 'advertisement', text: '广告语' },
    { value: 'story', text: '故事' },
    { value: 'poetry', text: '诗歌' },
    { value: 'news', text: '新闻' },
    { value: 'comment', text: '评论' }
  ],
  style: [
    { value: 'formal', text: '正式' },
    { value: 'casual', text: '轻松' },
    { value: 'humorous', text: '幽默' },
    { value: 'serious', text: '严肃' },
    { value: 'romantic', text: '浪漫' },
    { value: 'inspiring', text: '励志' },
    { value: 'professional', text: '专业' },
    { value: 'creative', text: '创意' }
  ],
  length: [
    { value: 'short', text: '短句' },
    { value: 'medium', text: '中等' },
    { value: 'long', text: '长文' },
    { value: 'very_long', text: '超长' }
  ],
  tone: [
    { value: 'positive', text: '积极' },
    { value: 'neutral', text: '中性' },
    { value: 'negative', text: '消极' },
    { value: 'question', text: '疑问' },
    { value: 'exclamation', text: '感叹' },
    { value: 'statement', text: '陈述' }
  ],
  purpose: [
    { value: 'marketing', text: '营销' },
    { value: 'education', text: '教育' },
    { value: 'entertainment', text: '娱乐' },
    { value: 'information', text: '信息' },
    { value: 'persuasion', text: '说服' },
    { value: 'description', text: '描述' }
  ],
  language: languageOptions
}

// 根据分类获取筛选选项
export const getFilterOptions = (category: string) => {
  switch (category) {
    case 'clothing':
      return clothingFilterOptions
    case 'materials':
      return materialsFilterOptions
    case 'text-creation':
      return textCreationFilterOptions
    default:
      return clothingFilterOptions
  }
}
