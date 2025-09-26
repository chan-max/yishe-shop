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

// Fashion design filter options - 根据后端API优化
export const clothingFilterOptions = {
  sort: [
    { value: 'latest', text: '最新发布', apiValue: 'createTime' },
    { value: 'popular', text: '最受欢迎', apiValue: 'views' },
    { value: 'rating', text: '评分最高', apiValue: 'rating' },
    { value: 'price_asc', text: '价格：低到高', apiValue: 'price_asc' },
    { value: 'price_desc', text: '价格：高到低', apiValue: 'price_desc' }
  ],
  // 商品类型 - 对应后端 type 字段
  type: [
    { value: 'clothing', text: '服装', apiValue: 'clothing' },
    { value: 'accessories', text: '配饰', apiValue: 'accessories' },
    { value: 'shoes', text: '鞋履', apiValue: 'shoes' },
    { value: 'bags', text: '包袋', apiValue: 'bags' },
    { value: 'jewelry', text: '珠宝', apiValue: 'jewelry' }
  ],
  // 价格范围 - 对应后端 price 字段
  price: [
    { value: '0-100', text: '¥0-100', min: 0, max: 100 },
    { value: '100-300', text: '¥100-300', min: 100, max: 300 },
    { value: '300-500', text: '¥300-500', min: 300, max: 500 },
    { value: '500-1000', text: '¥500-1000', min: 500, max: 1000 },
    { value: '1000+', text: '¥1000+', min: 1000, max: null }
  ],
  // 性别 - 通过搜索关键词实现
  gender: [
    { value: 'male', text: '男装', searchKeyword: '男装 男士' },
    { value: 'female', text: '女装', searchKeyword: '女装 女士' },
    { value: 'unisex', text: '中性', searchKeyword: '中性 男女通用' },
    { value: 'children', text: '童装', searchKeyword: '童装 儿童' }
  ],
  // 年龄群体 - 通过搜索关键词实现
  ageGroup: [
    { value: 'youth', text: '青年 (18-25)', searchKeyword: '青年 年轻' },
    { value: 'adult', text: '成人 (25-40)', searchKeyword: '成人 成熟' },
    { value: 'senior', text: '中年 (40+)', searchKeyword: '中年 成熟' },
    { value: 'children', text: '儿童', searchKeyword: '儿童 童装' }
  ],
  // 风格 - 通过搜索关键词实现
  style: [
    { value: 'casual', text: '休闲', searchKeyword: '休闲 日常' },
    { value: 'formal', text: '正式', searchKeyword: '正式 商务' },
    { value: 'sports', text: '运动', searchKeyword: '运动 健身' },
    { value: 'vintage', text: '复古', searchKeyword: '复古 怀旧' },
    { value: 'street', text: '街头', searchKeyword: '街头 潮流' },
    { value: 'business', text: '商务', searchKeyword: '商务 职业' },
    { value: 'sweet', text: '甜美', searchKeyword: '甜美 可爱' },
    { value: 'cool', text: '酷炫', searchKeyword: '酷炫 个性' },
    { value: 'elegant', text: '优雅', searchKeyword: '优雅 高贵' },
    { value: 'minimalist', text: '极简', searchKeyword: '极简 简约' }
  ],
  // 季节 - 通过搜索关键词实现
  season: [
    { value: 'spring', text: '春季', searchKeyword: '春季 春天' },
    { value: 'summer', text: '夏季', searchKeyword: '夏季 夏天' },
    { value: 'autumn', text: '秋季', searchKeyword: '秋季 秋天' },
    { value: 'winter', text: '冬季', searchKeyword: '冬季 冬天' },
    { value: 'all_season', text: '四季', searchKeyword: '四季 全年' }
  ],
  // 材质 - 通过搜索关键词实现
  material: [
    { value: 'cotton', text: '棉质', searchKeyword: '棉质 纯棉' },
    { value: 'wool', text: '羊毛', searchKeyword: '羊毛 毛呢' },
    { value: 'silk', text: '丝绸', searchKeyword: '丝绸 真丝' },
    { value: 'linen', text: '亚麻', searchKeyword: '亚麻 麻质' },
    { value: 'denim', text: '牛仔', searchKeyword: '牛仔 丹宁' },
    { value: 'knit', text: '针织', searchKeyword: '针织 毛衣' },
    { value: 'leather', text: '皮革', searchKeyword: '皮革 真皮' },
    { value: 'polyester', text: '涤纶', searchKeyword: '涤纶 化纤' }
  ],
  // 颜色 - 通过搜索关键词实现
  color: [
    { value: 'black', text: '黑色', searchKeyword: '黑色 黑' },
    { value: 'white', text: '白色', searchKeyword: '白色 白' },
    { value: 'red', text: '红色', searchKeyword: '红色 红' },
    { value: 'blue', text: '蓝色', searchKeyword: '蓝色 蓝' },
    { value: 'green', text: '绿色', searchKeyword: '绿色 绿' },
    { value: 'yellow', text: '黄色', searchKeyword: '黄色 黄' },
    { value: 'pink', text: '粉色', searchKeyword: '粉色 粉' },
    { value: 'purple', text: '紫色', searchKeyword: '紫色 紫' },
    { value: 'gray', text: '灰色', searchKeyword: '灰色 灰' },
    { value: 'brown', text: '棕色', searchKeyword: '棕色 棕' },
    { value: 'beige', text: '米色', searchKeyword: '米色 卡其' },
    { value: 'navy', text: '藏青', searchKeyword: '藏青 深蓝' }
  ],
  // 尺码 - 通过搜索关键词实现
  size: [
    { value: 'xs', text: 'XS', searchKeyword: 'XS 超小' },
    { value: 's', text: 'S', searchKeyword: 'S 小号' },
    { value: 'm', text: 'M', searchKeyword: 'M 中号' },
    { value: 'l', text: 'L', searchKeyword: 'L 大号' },
    { value: 'xl', text: 'XL', searchKeyword: 'XL 加大' },
    { value: 'xxl', text: 'XXL', searchKeyword: 'XXL 特大' }
  ],
  // 场合 - 通过搜索关键词实现
  occasion: [
    { value: 'daily', text: '日常', searchKeyword: '日常 休闲' },
    { value: 'work', text: '工作', searchKeyword: '工作 职场' },
    { value: 'party', text: '聚会', searchKeyword: '聚会 派对' },
    { value: 'sport', text: '运动', searchKeyword: '运动 健身' },
    { value: 'formal', text: '正式', searchKeyword: '正式 正装' },
    { value: 'date', text: '约会', searchKeyword: '约会 浪漫' },
    { value: 'travel', text: '旅行', searchKeyword: '旅行 出游' },
    { value: 'wedding', text: '婚礼', searchKeyword: '婚礼 婚纱' }
  ],
  // 特殊标签 - 通过搜索关键词实现
  special: [
    { value: 'new', text: '新品', searchKeyword: '新品 新款' },
    { value: 'hot', text: '热门', searchKeyword: '热门 爆款' },
    { value: 'limited', text: '限量', searchKeyword: '限量 限定' },
    { value: 'sale', text: '促销', searchKeyword: '促销 特价' },
    { value: 'eco', text: '环保', searchKeyword: '环保 可持续' },
    { value: 'handmade', text: '手工', searchKeyword: '手工 定制' }
  ],
  // 价格范围滑块配置
  priceRange: {
    min: 0,
    max: 5000,
    step: 50,
    defaultMin: 0,
    defaultMax: 1000
  }
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

// Media materials filter options
export const mediaFilterOptions = {
  sort: [
    { value: 'latest', text: '最新上传' },
    { value: 'popular', text: '最受欢迎' },
    { value: 'downloads', text: '下载最多' },
    { value: 'rating', text: '评分最高' }
  ],
  category: [
    { value: 'video', text: '视频' },
    { value: 'audio', text: '音频' },
    { value: 'image', text: '图片' },
    { value: 'animation', text: '动画' },
    { value: 'effect', text: '特效' },
    { value: 'transition', text: '转场' },
    { value: 'background', text: '背景' },
    { value: 'other', text: '其他' }
  ],
  format: [
    { value: 'mp4', text: 'MP4' },
    { value: 'avi', text: 'AVI' },
    { value: 'mov', text: 'MOV' },
    { value: 'mp3', text: 'MP3' },
    { value: 'wav', text: 'WAV' },
    { value: 'png', text: 'PNG' },
    { value: 'jpg', text: 'JPG' },
    { value: 'gif', text: 'GIF' },
    { value: 'svg', text: 'SVG' },
    { value: 'ai', text: 'AI' }
  ],
  tags: [
    { value: 'advertisement', text: '广告' },
    { value: 'education', text: '教育' },
    { value: 'entertainment', text: '娱乐' },
    { value: 'news', text: '新闻' },
    { value: 'documentary', text: '纪录片' },
    { value: 'animation', text: '动画片' },
    { value: 'movie', text: '电影' },
    { value: 'tv', text: '电视剧' },
    { value: 'short', text: '短视频' },
    { value: 'commercial', text: '商业' }
  ]
}

// Font template filter options
export const fontFilterOptions = {
  sort: [
    { value: 'latest', text: '最新上传' },
    { value: 'popular', text: '最受欢迎' },
    { value: 'downloads', text: '下载最多' },
    { value: 'rating', text: '评分最高' }
  ],
  category: [
    { value: 'chinese', text: '中文字体' },
    { value: 'english', text: '英文字体' },
    { value: 'japanese', text: '日文字体' },
    { value: 'korean', text: '韩文字体' },
    { value: 'number', text: '数字字体' },
    { value: 'symbol', text: '符号字体' },
    { value: 'mixed', text: '混合字体' },
    { value: 'other', text: '其他' }
  ],
  style: [
    { value: 'modern', text: '现代' },
    { value: 'classic', text: '古典' },
    { value: 'minimalist', text: '简约' },
    { value: 'luxury', text: '华丽' },
    { value: 'tech', text: '科技' },
    { value: 'nature', text: '自然' },
    { value: 'business', text: '商务' },
    { value: 'creative', text: '创意' },
    { value: 'artistic', text: '艺术' },
    { value: 'fashion', text: '时尚' },
    { value: 'vintage', text: '复古' },
    { value: 'futuristic', text: '未来' }
  ],
  language: [
    { value: 'zh', text: '中文' },
    { value: 'en', text: '英文' },
    { value: 'ja', text: '日文' },
    { value: 'ko', text: '韩文' },
    { value: 'fr', text: '法文' },
    { value: 'de', text: '德文' },
    { value: 'es', text: '西班牙文' },
    { value: 'it', text: '意大利文' },
    { value: 'ru', text: '俄文' },
    { value: 'ar', text: '阿拉伯文' }
  ]
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
    case 'media':
      return mediaFilterOptions
    case 'font':
      return fontFilterOptions
    default:
      return clothingFilterOptions
  }
}
