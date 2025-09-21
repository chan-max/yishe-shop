/**
 * Search page filter options unified configuration
 * Avoid duplicate definitions, easy to maintain
 */

// Common color options
export const colorOptions = [
  { value: '#000000', text: 'Black' },
  { value: '#FFFFFF', text: 'White' },
  { value: '#FF0000', text: 'Red' },
  { value: '#0000FF', text: 'Blue' },
  { value: '#00FF00', text: 'Green' },
  { value: '#FFFF00', text: 'Yellow' },
  { value: '#FF69B4', text: 'Pink' },
  { value: '#800080', text: 'Purple' },
  { value: '#FFA500', text: 'Orange' },
  { value: '#8B4513', text: 'Brown' },
  { value: '#808080', text: 'Gray' },
  { value: '#000080', text: 'Navy Blue' }
]

// Common language options
export const languageOptions = [
  { value: 'zh', text: 'Chinese' },
  { value: 'en', text: 'English' },
  { value: 'ja', text: 'Japanese' },
  { value: 'ko', text: 'Korean' },
  { value: 'fr', text: 'French' },
  { value: 'de', text: 'German' },
  { value: 'es', text: 'Spanish' },
  { value: 'it', text: 'Italian' }
]

// Fashion design filter options
export const clothingFilterOptions = {
  sort: [
    { value: 'latest', text: 'Latest' },
    { value: 'popular', text: 'Most Popular' },
    { value: 'rating', text: 'Highest Rated' },
    { value: 'price_asc', text: 'Price: Low to High' },
    { value: 'price_desc', text: 'Price: High to Low' }
  ],
  price: [
    { value: '0-100', label: '$0-100' },
    { value: '100-300', label: '$100-300' },
    { value: '300-500', label: '$300-500' },
    { value: '500-1000', label: '$500-1000' },
    { value: '1000+', label: '$1000+' }
  ],
  gender: [
    { value: 'male', label: 'Men\'s' },
    { value: 'female', label: 'Women\'s' },
    { value: 'unisex', label: 'Unisex' }
  ],
  ageGroup: [
    { value: 'youth', label: 'Youth (18-25)' },
    { value: 'adult', label: 'Adult (25-40)' },
    { value: 'senior', label: 'Senior (40+)' }
  ],
  style: [
    { value: 'casual', text: 'Casual' },
    { value: 'formal', text: 'Formal' },
    { value: 'sports', text: 'Sports' },
    { value: 'vintage', text: 'Vintage' },
    { value: 'street', text: 'Street' },
    { value: 'business', text: 'Business' },
    { value: 'sweet', text: 'Sweet' },
    { value: 'cool', text: 'Cool' }
  ],
  season: [
    { value: 'spring', label: 'Spring' },
    { value: 'summer', label: 'Summer' },
    { value: 'autumn', label: 'Autumn' },
    { value: 'winter', label: 'Winter' },
    { value: 'all_season', label: 'All Season' }
  ],
  material: [
    { value: 'cotton', label: 'Cotton' },
    { value: 'wool', label: 'Wool' },
    { value: 'silk', label: 'Silk' },
    { value: 'linen', label: 'Linen' },
    { value: 'denim', label: 'Denim' },
    { value: 'knit', label: 'Knit' },
    { value: 'leather', label: 'Leather' }
  ],
  color: [
    { value: 'black', label: 'Black' },
    { value: 'white', label: 'White' },
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'pink', label: 'Pink' },
    { value: 'purple', label: 'Purple' },
    { value: 'gray', label: 'Gray' },
    { value: 'brown', label: 'Brown' }
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
    { value: 'daily', label: 'Daily' },
    { value: 'work', label: 'Work' },
    { value: 'party', label: 'Party' },
    { value: 'sport', label: 'Sports' },
    { value: 'formal', label: 'Formal' },
    { value: 'date', label: 'Date' }
  ],
  discount: [
    { value: 'no_discount', label: 'No Discount' },
    { value: 'discount_90', label: '10%+ Off' },
    { value: 'discount_70_90', label: '10-30% Off' },
    { value: 'discount_50_70', label: '30-50% Off' },
    { value: 'discount_50', label: '50%+ Off' }
  ]
}

// Design materials filter options
export const materialsFilterOptions = {
  sort: [
    { value: 'latest', text: 'Latest Upload' },
    { value: 'popular', text: 'Most Popular' },
    { value: 'downloads', text: 'Most Downloaded' },
    { value: 'rating', text: 'Highest Rated' }
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
