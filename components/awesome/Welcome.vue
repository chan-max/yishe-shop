<script lang="ts" setup>
const { awesome } = useAppConfig();
const { parseMenuRoute, parseMenuTitle } = useNavbarParser();

const props = defineProps({
  withAlert: {
    type: Boolean,
    default: true,
  },
});
const showAlert = ref(
  awesome?.layout?.welcome?.disableInfoReplaceIndexInWelcomePage
    ? !awesome?.layout?.welcome?.disableInfoReplaceIndexInWelcomePage
    : props.withAlert
);

const showDesignModal = ref(false);
const showSuccessToast = ref(false);
const showErrorToast = ref(false);
const designForm = ref({
  name: "",
  description: "",
  phoneNumber: "",
  email: "",
});

const formErrors = ref({
  name: "",
  description: "",
  phoneNumber: "",
  email: "",
});

const validateForm = () => {
  let isValid = true;
  formErrors.value = {
    name: "",
    description: "",
    phoneNumber: "",
    email: "",
  };

  if (!designForm.value.name.trim()) {
    formErrors.value.name = "请输入设计名称";
    isValid = false;
  } else if (designForm.value.name.length > 50) {
    formErrors.value.name = "设计名称不能超过50个字符";
    isValid = false;
  }

  if (!designForm.value.description.trim()) {
    formErrors.value.description = "请输入设计需求描述";
    isValid = false;
  } else if (designForm.value.description.length < 10) {
    formErrors.value.description = "设计需求描述至少需要10个字符";
    isValid = false;
  } else if (designForm.value.description.length > 1000) {
    formErrors.value.description = "设计需求描述不能超过1000个字符";
    isValid = false;
  }

  // 验证手机号
  const phoneRegex = /^1[3-9]\d{9}$/;
  if (!designForm.value.phoneNumber.trim()) {
    formErrors.value.phoneNumber = "请输入手机号";
    isValid = false;
  } else if (!phoneRegex.test(designForm.value.phoneNumber)) {
    formErrors.value.phoneNumber = "请输入有效的手机号";
    isValid = false;
  }

  // 验证邮箱
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!designForm.value.email.trim()) {
    formErrors.value.email = "请输入邮箱";
    isValid = false;
  } else if (!emailRegex.test(designForm.value.email)) {
    formErrors.value.email = "请输入有效的邮箱地址";
    isValid = false;
  }

  return isValid;
};

interface DesignRequestResponse {
  name: string;
  description: string;
  phoneNumber: string;
  email: string;
  userId: string | null;
  id: string;
  createTime: string;
  updateTime: string;
}

interface ApiResponse<T = any> {
  data: T;
  code: number;
  status: boolean;
}

const submitDesignRequest = async () => {
  if (!validateForm()) {
    return;
  }

  try {
    const { $customFetch } = useNuxtApp();
    const response = await $customFetch<ApiResponse<DesignRequestResponse>>(
      "/design-request",
      {
        method: "POST",
        body: {
          name: designForm.value.name,
          description: designForm.value.description,
          phoneNumber: designForm.value.phoneNumber,
          email: designForm.value.email,
        },
      }
    );

    showSuccessToast.value = true;

    showDesignModal.value = false;
    // 重置表单
    designForm.value = {
      name: "",
      description: "",
      phoneNumber: "",
      email: "",
    };
    formErrors.value = {
      name: "",
      description: "",
      phoneNumber: "",
      email: "",
    };
  } catch (error) {
    console.error("提交失败:", error);
    showErrorToast.value = true;
  }
};

const categories = ref([
  {
    name: '上衣',
    path: '/category/tops',
    subcategories: [
      { name: 'T恤', path: '/category/tops/t-shirts' },
      { name: '衬衫', path: '/category/tops/shirts' },
      { name: '卫衣', path: '/category/tops/hoodies' },
      { name: '毛衣', path: '/category/tops/sweaters' },
      { name: '背心', path: '/category/tops/tank-tops' },
      { name: 'POLO衫', path: '/category/tops/polo-shirts' },
      { name: '针织衫', path: '/category/tops/knitwear' },
      { name: '马甲', path: '/category/tops/vests' },
      { name: '开衫', path: '/category/tops/cardigans' },
      { name: '高领衫', path: '/category/tops/turtlenecks' },
      { name: '吊带', path: '/category/tops/straps' },
      { name: '抹胸', path: '/category/tops/tube-tops' },
      { name: '露肩上衣', path: '/category/tops/off-shoulder' },
      { name: '一字肩上衣', path: '/category/tops/one-shoulder' },
      { name: '荷叶边上衣', path: '/category/tops/ruffle-tops' }
    ],
    brands: [
      { name: 'UNIQLO', image: '/brands/uniqlo.jpg' },
      { name: 'ZARA', image: '/brands/zara.jpg' },
      { name: 'H&M', image: '/brands/hm.jpg' },
      { name: '优衣库', image: '/brands/uniqlo-cn.jpg' },
      { name: 'GAP', image: '/brands/gap.jpg' },
      { name: 'COS', image: '/brands/cos.jpg' },
      { name: 'Massimo Dutti', image: '/brands/massimo-dutti.jpg' },
      { name: 'Mango', image: '/brands/mango.jpg' },
      { name: 'Pull&Bear', image: '/brands/pull-bear.jpg' },
      { name: 'Bershka', image: '/brands/bershka.jpg' },
      { name: 'Stradivarius', image: '/brands/stradivarius.jpg' },
      { name: 'C&A', image: '/brands/ca.jpg' }
    ],
    styles: [
      { name: '基础款T恤', path: '/category/tops/basic-tees' },
      { name: '印花T恤', path: '/category/tops/printed-tees' },
      { name: '条纹衬衫', path: '/category/tops/striped-shirts' },
      { name: '格子衬衫', path: '/category/tops/plaid-shirts' },
      { name: '连帽卫衣', path: '/category/tops/hooded-sweatshirts' },
      { name: '圆领卫衣', path: '/category/tops/crew-neck-sweatshirts' },
      { name: 'V领毛衣', path: '/category/tops/v-neck-sweaters' },
      { name: '圆领毛衣', path: '/category/tops/crew-neck-sweaters' },
      { name: '高领毛衣', path: '/category/tops/turtleneck-sweaters' },
      { name: '开衫毛衣', path: '/category/tops/cardigan-sweaters' },
      { name: '针织背心', path: '/category/tops/knit-vests' },
      { name: 'Polo衫', path: '/category/tops/polo-shirts' },
      { name: '吊带上衣', path: '/category/tops/strappy-tops' },
      { name: '露肩上衣', path: '/category/tops/off-shoulder-tops' },
      { name: '一字肩上衣', path: '/category/tops/one-shoulder-tops' }
    ],
    featured: [
      { name: '基础款T恤', image: '/featured/basic-tee.jpg' },
      { name: '连帽卫衣', image: '/featured/hoodie.jpg' },
      { name: '商务衬衫', image: '/featured/business-shirt.jpg' }
    ],
    trending: [
      { name: '新品上市', path: '/category/tops/new-arrivals' },
      { name: '热销商品', path: '/category/tops/bestsellers' },
      { name: '限时特惠', path: '/category/tops/sale' },
      { name: '春季新品', path: '/category/tops/spring-collection' },
      { name: '夏季必备', path: '/category/tops/summer-essentials' },
      { name: '秋季系列', path: '/category/tops/autumn-collection' }
    ]
  },
  {
    name: '裤子',
    path: '/category/pants',
    subcategories: [
      { name: '牛仔裤', path: '/category/pants/jeans' },
      { name: '休闲裤', path: '/category/pants/casual' },
      { name: '运动裤', path: '/category/pants/sports' },
      { name: '短裤', path: '/category/pants/shorts' },
      { name: '工装裤', path: '/category/pants/workwear' },
      { name: '西裤', path: '/category/pants/suit-pants' },
      { name: '阔腿裤', path: '/category/pants/wide-leg' },
      { name: '紧身裤', path: '/category/pants/skinny' },
      { name: '哈伦裤', path: '/category/pants/harem' },
      { name: '背带裤', path: '/category/pants/overalls' },
      { name: '九分裤', path: '/category/pants/cropped' },
      { name: '高腰裤', path: '/category/pants/high-waist' },
      { name: '低腰裤', path: '/category/pants/low-waist' },
      { name: '直筒裤', path: '/category/pants/straight' },
      { name: '喇叭裤', path: '/category/pants/flare' },
      { name: '烟管裤', path: '/category/pants/skinny-fit' },
      { name: '老爹裤', path: '/category/pants/dad-jeans' },
      { name: '破洞牛仔裤', path: '/category/pants/ripped-jeans' }
    ],
    brands: [
      { name: 'Levi\'s', image: '/brands/levis.jpg' },
      { name: 'UNIQLO', image: '/brands/uniqlo.jpg' },
      { name: 'ZARA', image: '/brands/zara.jpg' },
      { name: 'H&M', image: '/brands/hm.jpg' },
      { name: 'GAP', image: '/brands/gap.jpg' },
      { name: 'COS', image: '/brands/cos.jpg' },
      { name: 'Massimo Dutti', image: '/brands/massimo-dutti.jpg' },
      { name: 'Mango', image: '/brands/mango.jpg' },
      { name: 'Pull&Bear', image: '/brands/pull-bear.jpg' },
      { name: 'Bershka', image: '/brands/bershka.jpg' },
      { name: 'Stradivarius', image: '/brands/stradivarius.jpg' },
      { name: 'C&A', image: '/brands/ca.jpg' },
      { name: 'Lee', image: '/brands/lee.jpg' },
      { name: 'Wrangler', image: '/brands/wrangler.jpg' }
    ],
    styles: [
      { name: '直筒牛仔裤', path: '/category/pants/straight-jeans' },
      { name: '修身牛仔裤', path: '/category/pants/slim-jeans' },
      { name: '阔腿裤', path: '/category/pants/wide-leg-pants' },
      { name: '运动裤', path: '/category/pants/track-pants' },
      { name: '工装裤', path: '/category/pants/cargo-pants' },
      { name: '西装裤', path: '/category/pants/suit-pants' },
      { name: '九分裤', path: '/category/pants/cropped-pants' },
      { name: '高腰裤', path: '/category/pants/high-waist' },
      { name: '低腰裤', path: '/category/pants/low-waist' },
      { name: '喇叭裤', path: '/category/pants/flare-pants' },
      { name: '烟管裤', path: '/category/pants/skinny-fit-pants' },
      { name: '老爹牛仔裤', path: '/category/pants/dad-jeans' },
      { name: '破洞牛仔裤', path: '/category/pants/ripped-jeans' },
      { name: '背带裤', path: '/category/pants/overalls' },
      { name: '哈伦裤', path: '/category/pants/harem-pants' }
    ],
    featured: [
      { name: '直筒牛仔裤', image: '/featured/straight-jeans.jpg' },
      { name: '运动裤', image: '/featured/track-pants.jpg' },
      { name: '工装裤', image: '/featured/cargo-pants.jpg' }
    ],
    trending: [
      { name: '新品上市', path: '/category/pants/new-arrivals' },
      { name: '热销商品', path: '/category/pants/bestsellers' },
      { name: '限时特惠', path: '/category/pants/sale' },
      { name: '春季新品', path: '/category/pants/spring-collection' },
      { name: '夏季必备', path: '/category/pants/summer-essentials' },
      { name: '秋季系列', path: '/category/pants/autumn-collection' },
      { name: '牛仔裤专区', path: '/category/pants/jeans-zone' },
      { name: '运动裤专区', path: '/category/pants/sports-zone' }
    ]
  },
  {
    name: '裙子',
    path: '/category/dresses',
    subcategories: [
      { name: '连衣裙', path: '/category/dresses/dresses' },
      { name: '半身裙', path: '/category/dresses/skirts' },
      { name: '迷你裙', path: '/category/dresses/mini-skirts' },
      { name: '长裙', path: '/category/dresses/maxi-dresses' },
      { name: '礼服裙', path: '/category/dresses/formal' },
      { name: '百褶裙', path: '/category/dresses/pleated' },
      { name: 'A字裙', path: '/category/dresses/a-line' },
      { name: '包臀裙', path: '/category/dresses/pencil' },
      { name: '蓬蓬裙', path: '/category/dresses/tutu' },
      { name: '鱼尾裙', path: '/category/dresses/mermaid' },
      { name: '吊带裙', path: '/category/dresses/strappy' },
      { name: '碎花裙', path: '/category/dresses/floral' },
      { name: '小黑裙', path: '/category/dresses/little-black' },
      { name: '晚礼服', path: '/category/dresses/evening' },
      { name: '婚纱', path: '/category/dresses/wedding' },
      { name: '旗袍', path: '/category/dresses/qipao' },
      { name: '汉服', path: '/category/dresses/hanfu' },
      { name: '洛丽塔', path: '/category/dresses/lolita' }
    ],
    brands: [
      { name: 'ZARA', image: '/brands/zara.jpg' },
      { name: 'H&M', image: '/brands/hm.jpg' },
      { name: 'UNIQLO', image: '/brands/uniqlo.jpg' },
      { name: '优衣库', image: '/brands/uniqlo-cn.jpg' },
      { name: 'GAP', image: '/brands/gap.jpg' },
      { name: 'COS', image: '/brands/cos.jpg' },
      { name: 'Massimo Dutti', image: '/brands/massimo-dutti.jpg' },
      { name: 'Mango', image: '/brands/mango.jpg' },
      { name: 'Pull&Bear', image: '/brands/pull-bear.jpg' },
      { name: 'Bershka', image: '/brands/bershka.jpg' },
      { name: 'Stradivarius', image: '/brands/stradivarius.jpg' },
      { name: 'C&A', image: '/brands/ca.jpg' },
      { name: 'Forever 21', image: '/brands/forever21.jpg' },
      { name: 'Topshop', image: '/brands/topshop.jpg' }
    ],
    styles: [
      { name: 'A字裙', path: '/category/dresses/a-line-dresses' },
      { name: '吊带裙', path: '/category/dresses/strappy-dresses' },
      { name: '碎花裙', path: '/category/dresses/floral-dresses' },
      { name: '小黑裙', path: '/category/dresses/little-black-dress' },
      { name: '百褶裙', path: '/category/dresses/pleated-skirts' },
      { name: '包臀裙', path: '/category/dresses/pencil-skirts' },
      { name: '蓬蓬裙', path: '/category/dresses/tutu-skirts' },
      { name: '鱼尾裙', path: '/category/dresses/mermaid-skirts' },
      { name: '迷你裙', path: '/category/dresses/mini-skirts' },
      { name: '长裙', path: '/category/dresses/maxi-skirts' },
      { name: '晚礼服', path: '/category/dresses/evening-dresses' },
      { name: '婚纱', path: '/category/dresses/wedding-dresses' },
      { name: '旗袍', path: '/category/dresses/qipao-dresses' },
      { name: '汉服', path: '/category/dresses/hanfu-dresses' },
      { name: '洛丽塔', path: '/category/dresses/lolita-dresses' }
    ],
    featured: [
      { name: 'A字裙', image: '/featured/a-line-dress.jpg' },
      { name: '碎花裙', image: '/featured/floral-dress.jpg' },
      { name: '小黑裙', image: '/featured/little-black-dress.jpg' }
    ],
    trending: [
      { name: '新品上市', path: '/category/dresses/new-arrivals' },
      { name: '热销商品', path: '/category/dresses/bestsellers' },
      { name: '限时特惠', path: '/category/dresses/sale' },
      { name: '春季新品', path: '/category/dresses/spring-collection' },
      { name: '夏季必备', path: '/category/dresses/summer-essentials' },
      { name: '秋季系列', path: '/category/dresses/autumn-collection' },
      { name: '连衣裙专区', path: '/category/dresses/dresses-zone' },
      { name: '半身裙专区', path: '/category/dresses/skirts-zone' },
      { name: '礼服专区', path: '/category/dresses/formal-zone' }
    ]
  },
  {
    name: '外套',
    path: '/category/outerwear',
    subcategories: [
      { name: '夹克', path: '/category/outerwear/jackets' },
      { name: '风衣', path: '/category/outerwear/trench-coats' },
      { name: '羽绒服', path: '/category/outerwear/down-jackets' },
      { name: '西装外套', path: '/category/outerwear/blazers' },
      { name: '皮衣', path: '/category/outerwear/leather' },
      { name: '毛呢大衣', path: '/category/outerwear/wool-coats' }
    ],
    brands: [
      { name: 'ZARA', image: '/brands/zara.jpg' },
      { name: 'H&M', image: '/brands/hm.jpg' },
      { name: 'UNIQLO', image: '/brands/uniqlo.jpg' },
      { name: '优衣库', image: '/brands/uniqlo-cn.jpg' },
      { name: 'GAP', image: '/brands/gap.jpg' }
    ],
    styles: [
      { name: '牛仔夹克', path: '/category/outerwear/denim-jackets' },
      { name: '飞行员夹克', path: '/category/outerwear/bomber-jackets' },
      { name: '风衣', path: '/category/outerwear/trench-coats' },
      { name: '羽绒服', path: '/category/outerwear/down-jackets' },
      { name: '西装外套', path: '/category/outerwear/blazers' },
      { name: '皮衣', path: '/category/outerwear/leather-jackets' }
    ],
    featured: [
      { name: '牛仔夹克', image: '/featured/denim-jacket.jpg' },
      { name: '飞行员夹克', image: '/featured/bomber-jacket.jpg' },
      { name: '风衣', image: '/featured/trench-coat.jpg' }
    ],
    trending: [
      { name: '新品上市', path: '/category/outerwear/new-arrivals' },
      { name: '热销商品', path: '/category/outerwear/bestsellers' },
      { name: '限时特惠', path: '/category/outerwear/sale' }
    ]
  },
  {
    name: '内衣',
    path: '/category/underwear',
    subcategories: [
      { name: '内裤', path: '/category/underwear/underwear' },
      { name: '胸罩', path: '/category/underwear/bras' },
      { name: '家居服', path: '/category/underwear/loungewear' },
      { name: '睡衣', path: '/category/underwear/pajamas' },
      { name: '塑身衣', path: '/category/underwear/shapewear' },
      { name: '运动内衣', path: '/category/underwear/sports-bras' }
    ],
    brands: [
      { name: 'UNIQLO', image: '/brands/uniqlo.jpg' },
      { name: '优衣库', image: '/brands/uniqlo-cn.jpg' },
      { name: 'H&M', image: '/brands/hm.jpg' },
      { name: 'ZARA', image: '/brands/zara.jpg' },
      { name: 'GAP', image: '/brands/gap.jpg' }
    ],
    styles: [
      { name: '基础款内衣', path: '/category/underwear/basic-underwear' },
      { name: '蕾丝内衣', path: '/category/underwear/lace-underwear' },
      { name: '运动内衣', path: '/category/underwear/sports-bras' },
      { name: '家居服', path: '/category/underwear/loungewear' },
      { name: '睡衣', path: '/category/underwear/pajamas' },
      { name: '塑身衣', path: '/category/underwear/shapewear' }
    ],
    featured: [
      { name: '基础款内衣', image: '/featured/basic-underwear.jpg' },
      { name: '运动内衣', image: '/featured/sports-bra.jpg' },
      { name: '家居服', image: '/featured/loungewear.jpg' }
    ]
  },
  {
    name: '配饰',
    path: '/category/accessories',
    subcategories: [
      { name: '帽子', path: '/category/accessories/hats' },
      { name: '围巾', path: '/category/accessories/scarves' },
      { name: '手套', path: '/category/accessories/gloves' },
      { name: '腰带', path: '/category/accessories/belts' },
      { name: '袜子', path: '/category/accessories/socks' },
      { name: '太阳镜', path: '/category/accessories/sunglasses' }
    ],
    brands: [
      { name: 'UNIQLO', image: '/brands/uniqlo.jpg' },
      { name: '优衣库', image: '/brands/uniqlo-cn.jpg' },
      { name: 'H&M', image: '/brands/hm.jpg' },
      { name: 'ZARA', image: '/brands/zara.jpg' },
      { name: 'GAP', image: '/brands/gap.jpg' }
    ],
    styles: [
      { name: '棒球帽', path: '/category/accessories/baseball-caps' },
      { name: '贝雷帽', path: '/category/accessories/berets' },
      { name: '围巾', path: '/category/accessories/scarves' },
      { name: '手套', path: '/category/accessories/gloves' },
      { name: '腰带', path: '/category/accessories/belts' },
      { name: '太阳镜', path: '/category/accessories/sunglasses' }
    ],
    featured: [
      { name: '棒球帽', image: '/featured/baseball-cap.jpg' },
      { name: '围巾', image: '/featured/scarf.jpg' },
      { name: '太阳镜', image: '/featured/sunglasses.jpg' }
    ]
  }
]);

const activeCategory = ref<number>(0); // 默认显示第一个tab
const isDropdownVisible = ref(true); // 默认显示下拉菜单

// 商品数据状态
const productsData = ref({
  newArrivals: [],
  popular: [],
  recommended: [],
  categoryProducts: {} as Record<string, any[]>,
  // 新增分类数据
  genderProducts: {} as Record<string, any[]>,
  seasonProducts: {} as Record<string, any[]>,
  priceProducts: {} as Record<string, any[]>,
  brandProducts: {} as Record<string, any[]>,
  materialProducts: {} as Record<string, any[]>,
  colorProducts: {} as Record<string, any[]>,
  sizeProducts: {} as Record<string, any[]>,
  ageProducts: {} as Record<string, any[]>,
  occasionProducts: {} as Record<string, any[]>,
  trendingProducts: [] as any[],
  saleProducts: [] as any[],
  featuredProducts: [] as any[]
});

const loading = ref({
  newArrivals: false,
  popular: false,
  recommended: false,
  categoryProducts: {} as Record<string, boolean>,
  // 新增加载状态
  genderProducts: {} as Record<string, boolean>,
  seasonProducts: {} as Record<string, boolean>,
  priceProducts: {} as Record<string, boolean>,
  brandProducts: {} as Record<string, boolean>,
  materialProducts: {} as Record<string, boolean>,
  colorProducts: {} as Record<string, boolean>,
  sizeProducts: {} as Record<string, boolean>,
  ageProducts: {} as Record<string, boolean>,
  occasionProducts: {} as Record<string, boolean>,
  trendingProducts: false,
  saleProducts: false,
  featuredProducts: false
});

// 新增分类配置
const genderCategories = ref([
  { name: '男装', value: 'male', icon: 'mdi-gender-male' },
  { name: '女装', value: 'female', icon: 'mdi-gender-female' },
  { name: '童装', value: 'kids', icon: 'mdi-baby-face' },
  { name: '中性', value: 'unisex', icon: 'mdi-gender-male-female' }
]);

const seasonCategories = ref([
  { name: '春季', value: 'spring', icon: 'mdi-flower', color: '#4ade80' },
  { name: '夏季', value: 'summer', icon: 'mdi-weather-sunny', color: '#fbbf24' },
  { name: '秋季', value: 'autumn', icon: 'mdi-leaf', color: '#f97316' },
  { name: '冬季', value: 'winter', icon: 'mdi-weather-snowy', color: '#60a5fa' }
]);

const priceCategories = ref([
  { name: '经济实惠', value: 'budget', range: '0-100', icon: 'mdi-currency-cny' },
  { name: '中端价位', value: 'mid-range', range: '100-500', icon: 'mdi-currency-cny' },
  { name: '高端精品', value: 'premium', range: '500-2000', icon: 'mdi-currency-cny' },
  { name: '奢侈品牌', value: 'luxury', range: '2000+', icon: 'mdi-currency-cny' }
]);

const brandCategories = ref([
  { name: 'UNIQLO', value: 'uniqlo', image: '/brands/uniqlo.jpg' },
  { name: 'ZARA', value: 'zara', image: '/brands/zara.jpg' },
  { name: 'H&M', value: 'hm', image: '/brands/hm.jpg' },
  { name: 'GAP', value: 'gap', image: '/brands/gap.jpg' },
  { name: 'COS', value: 'cos', image: '/brands/cos.jpg' },
  { name: 'Massimo Dutti', value: 'massimo-dutti', image: '/brands/massimo-dutti.jpg' },
  { name: 'Mango', value: 'mango', image: '/brands/mango.jpg' },
  { name: 'Pull&Bear', value: 'pull-bear', image: '/brands/pull-bear.jpg' }
]);

const materialCategories = ref([
  { name: '棉质', value: 'cotton', icon: 'mdi-cotton' },
  { name: '丝绸', value: 'silk', icon: 'mdi-silk' },
  { name: '羊毛', value: 'wool', icon: 'mdi-wool' },
  { name: '牛仔', value: 'denim', icon: 'mdi-denim' },
  { name: '皮革', value: 'leather', icon: 'mdi-leather' },
  { name: '针织', value: 'knit', icon: 'mdi-knit' }
]);

const colorCategories = ref([
  { name: '黑色', value: 'black', color: '#000000' },
  { name: '白色', value: 'white', color: '#ffffff' },
  { name: '红色', value: 'red', color: '#ef4444' },
  { name: '蓝色', value: 'blue', color: '#3b82f6' },
  { name: '绿色', value: 'green', color: '#10b981' },
  { name: '黄色', value: 'yellow', color: '#f59e0b' },
  { name: '紫色', value: 'purple', color: '#8b5cf6' },
  { name: '粉色', value: 'pink', color: '#ec4899' }
]);

const sizeCategories = ref([
  { name: 'XS', value: 'xs' },
  { name: 'S', value: 's' },
  { name: 'M', value: 'm' },
  { name: 'L', value: 'l' },
  { name: 'XL', value: 'xl' },
  { name: 'XXL', value: 'xxl' }
]);

const ageCategories = ref([
  { name: '青少年', value: 'teen', range: '13-19岁' },
  { name: '青年', value: 'young', range: '20-30岁' },
  { name: '中年', value: 'middle', range: '31-50岁' },
  { name: '老年', value: 'senior', range: '50岁以上' }
]);

const occasionCategories = ref([
  { name: '日常休闲', value: 'casual', icon: 'mdi-tshirt-crew' },
  { name: '商务正装', value: 'business', icon: 'mdi-account-tie' },
  { name: '运动健身', value: 'sports', icon: 'mdi-run' },
  { name: '派对聚会', value: 'party', icon: 'mdi-party-popper' },
  { name: '婚礼庆典', value: 'wedding', icon: 'mdi-heart' },
  { name: '户外活动', value: 'outdoor', icon: 'mdi-hiking' }
]);

// 新增UI状态管理
const activeFilters = ref({
  gender: '',
  season: '',
  price: '',
  brand: '',
  material: '',
  color: '',
  size: '',
  age: '',
  occasion: ''
});

const showAdvancedFilters = ref(false);
const showFilterModal = ref(false);
const selectedViewMode = ref('grid'); // grid, list, masonry
const sortBy = ref('latest'); // latest, price-asc, price-desc, popularity, rating

const showDropdown = (index: number) => {
  activeCategory.value = index;
  // 保持下拉菜单始终显示
  isDropdownVisible.value = true;
};

const hideDropdown = () => {
  isDropdownVisible.value = false;
  // 保持当前选中的tab，不重置为null
};

const handleMouseEnter = (index: number) => {
  showDropdown(index);
};

const handleMouseLeave = () => {
  // 不隐藏下拉菜单，保持内容始终显示
  // hideDropdown();
};

const handleTabChange = (index: number) => {
  activeCategory.value = index;
  isDropdownVisible.value = true;
};

// 获取商品数据的通用函数
const fetchProducts = async (params: any, type: string) => {
  if (loading.value[type as keyof typeof loading.value]) {
    loading.value[type as keyof typeof loading.value] = true;
  }
  try {
    const { $customFetch } = useNuxtApp();
    const requestBody = {
      currentPage: 1,
      pageSize: 8, // 首页展示8个商品
      isPublish: true,
      ...params
    };
    
    const response = await $customFetch("/product/page", {
      method: "POST",
      body: requestBody,
    }) as any;
    
    if (type === 'categoryProducts') {
      const categoryKey = params.filters?.style || params.filters?.gender || 'default';
      productsData.value.categoryProducts[categoryKey] = response.list || [];
    } else if (type.startsWith('genderProducts')) {
      const genderKey = params.filters?.gender || 'default';
      productsData.value.genderProducts[genderKey] = response.list || [];
    } else if (type.startsWith('seasonProducts')) {
      const seasonKey = params.filters?.season || 'default';
      productsData.value.seasonProducts[seasonKey] = response.list || [];
    } else if (type.startsWith('priceProducts')) {
      const priceKey = params.filters?.priceRange || 'default';
      productsData.value.priceProducts[priceKey] = response.list || [];
    } else if (type.startsWith('brandProducts')) {
      const brandKey = params.filters?.brand || 'default';
      productsData.value.brandProducts[brandKey] = response.list || [];
    } else if (type.startsWith('materialProducts')) {
      const materialKey = params.filters?.material || 'default';
      productsData.value.materialProducts[materialKey] = response.list || [];
    } else if (type.startsWith('colorProducts')) {
      const colorKey = params.filters?.color || 'default';
      productsData.value.colorProducts[colorKey] = response.list || [];
    } else if (type.startsWith('sizeProducts')) {
      const sizeKey = params.filters?.size || 'default';
      productsData.value.sizeProducts[sizeKey] = response.list || [];
    } else if (type.startsWith('ageProducts')) {
      const ageKey = params.filters?.ageGroup || 'default';
      productsData.value.ageProducts[ageKey] = response.list || [];
    } else if (type.startsWith('occasionProducts')) {
      const occasionKey = params.filters?.occasion || 'default';
      productsData.value.occasionProducts[occasionKey] = response.list || [];
    } else {
      (productsData.value as any)[type] = response.list || [];
    }
  } catch (error) {
    console.error(`获取${type}商品失败:`, error);
  } finally {
    if (loading.value[type as keyof typeof loading.value]) {
      loading.value[type as keyof typeof loading.value] = false;
    }
  }
};

// 获取新品上市
const fetchNewArrivals = () => {
  fetchProducts({ sort: 'latest' }, 'newArrivals');
};

// 获取热门商品
const fetchPopularProducts = () => {
  fetchProducts({ sort: 'popular' }, 'popular');
};

// 获取推荐商品
const fetchRecommendedProducts = () => {
  fetchProducts({ sort: 'rating' }, 'recommended');
};

// 获取分类商品
const fetchCategoryProducts = (category: string, filters: any = {}) => {
  const params = {
    filters: {
      style: category,
      ...filters
    }
  };
  fetchProducts(params, 'categoryProducts');
};

// 新增分类获取函数
const fetchGenderProducts = (gender: string) => {
  const params = {
    filters: { gender }
  };
  fetchProducts(params, `genderProducts_${gender}`);
};

const fetchSeasonProducts = (season: string) => {
  const params = {
    filters: { season }
  };
  fetchProducts(params, `seasonProducts_${season}`);
};

const fetchPriceProducts = (priceRange: string) => {
  const params = {
    filters: { priceRange }
  };
  fetchProducts(params, `priceProducts_${priceRange}`);
};

const fetchBrandProducts = (brand: string) => {
  const params = {
    filters: { brand }
  };
  fetchProducts(params, `brandProducts_${brand}`);
};

const fetchMaterialProducts = (material: string) => {
  const params = {
    filters: { material }
  };
  fetchProducts(params, `materialProducts_${material}`);
};

const fetchColorProducts = (color: string) => {
  const params = {
    filters: { color }
  };
  fetchProducts(params, `colorProducts_${color}`);
};

const fetchSizeProducts = (size: string) => {
  const params = {
    filters: { size }
  };
  fetchProducts(params, `sizeProducts_${size}`);
};

const fetchAgeProducts = (ageGroup: string) => {
  const params = {
    filters: { ageGroup }
  };
  fetchProducts(params, `ageProducts_${ageGroup}`);
};

const fetchOccasionProducts = (occasion: string) => {
  const params = {
    filters: { occasion }
  };
  fetchProducts(params, `occasionProducts_${occasion}`);
};

// 获取特价商品
const fetchSaleProducts = () => {
  fetchProducts({ filters: { onSale: true } }, 'saleProducts');
};

// 获取精选商品
const fetchFeaturedProducts = () => {
  fetchProducts({ filters: { featured: true } }, 'featuredProducts');
};

// 获取趋势商品
const fetchTrendingProducts = () => {
  fetchProducts({ sort: 'trending' }, 'trendingProducts');
};

// 筛选器相关函数
const applyFilter = (filterType: string, value: string) => {
  activeFilters.value[filterType as keyof typeof activeFilters.value] = value;
  // 这里可以根据筛选条件重新获取商品
};

const clearFilter = (filterType: string) => {
  activeFilters.value[filterType as keyof typeof activeFilters.value] = '';
};

const clearAllFilters = () => {
  activeFilters.value = {
    gender: '',
    season: '',
    price: '',
    brand: '',
    material: '',
    color: '',
    size: '',
    age: '',
    occasion: ''
  };
};

// 切换视图模式
const toggleViewMode = (mode: string) => {
  selectedViewMode.value = mode;
};

// 切换排序方式
const changeSortBy = (sort: string) => {
  sortBy.value = sort;
  // 重新获取商品数据
};

// 跳转到商品详情页
const navigateToProduct = (productId: string) => {
  // 这里可以根据实际路由结构调整
  navigateTo(`/product/${productId}`);
};

const leadingsText = computed(() => [
  {
    text: "最具创意的",
    startColor: "#007CF0",
    endColor: "#00DFD8",
    delay: 0,
  },
  {
    text: "开放式服装设计平台",
    startColor: "#7928CA",
    endColor: "#FF0080",
    delay: 2,
  },
  // {
  //   text: titlesText.value[2],
  //   startColor: '#FF4D4D',
  //   endColor: '#F9CB28',
  //   delay: 4,
  // },
]);

onMounted(() => {
  try {
    console.log("aweawe", parseMenuTitle("aweawe"));
  } catch (error) {
    console.log("aweawe error", error);
  }
  
  // 初始化商品数据
  fetchNewArrivals();
  fetchPopularProducts();
  fetchRecommendedProducts();
  fetchSaleProducts();
  fetchFeaturedProducts();
  fetchTrendingProducts();
  
  // 获取一些分类商品
  fetchCategoryProducts('casual');
  fetchCategoryProducts('formal');
  fetchCategoryProducts('sports');
  
  // 获取性别分类商品
  fetchGenderProducts('male');
  fetchGenderProducts('female');
  
  // 获取季节分类商品
  fetchSeasonProducts('spring');
  fetchSeasonProducts('summer');
  
  // 获取价格分类商品
  fetchPriceProducts('budget');
  fetchPriceProducts('mid-range');
  
  // 获取品牌分类商品
  fetchBrandProducts('uniqlo');
  fetchBrandProducts('zara');
  
  // 获取材质分类商品
  fetchMaterialProducts('cotton');
  fetchMaterialProducts('denim');
  
  // 获取颜色分类商品
  fetchColorProducts('black');
  fetchColorProducts('white');
  
  // 获取场合分类商品
  fetchOccasionProducts('casual');
  fetchOccasionProducts('business');
});
</script>

<template>
  <div>
    <!-- 设计需求弹窗 -->
    <v-dialog
      v-model="showDesignModal"
      max-width="600"
      persistent
      class="design-request-dialog"
    >
      <v-card class="rounded-lg">
        <v-card-title class="d-flex justify-space-between align-center pa-6 border-bottom">
          <span class="text-h5 font-weight-bold">提交设计需求</span>
          <v-btn icon variant="text" @click="showDesignModal = false" class="close-btn">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pa-6">
          <v-form @submit.prevent="submitDesignRequest" class="design-form">
            <v-text-field
              v-model="designForm.name"
              label="设计名称"
              :error-messages="formErrors.name"
              variant="outlined"
              density="comfortable"
              class="mb-4 form-field"
              bg-color="grey-lighten-4"
              hide-details="auto"
            ></v-text-field>

            <v-textarea
              v-model="designForm.description"
              label="设计需求描述"
              :error-messages="formErrors.description"
              variant="outlined"
              density="comfortable"
              rows="4"
              class="mb-4 form-field"
              :hint="`已输入 ${designForm.description.length}/1000 字符`"
              persistent-hint
              bg-color="grey-lighten-4"
              hide-details="auto"
            ></v-textarea>

            <v-text-field
              v-model="designForm.phoneNumber"
              label="手机号"
              :error-messages="formErrors.phoneNumber"
              variant="outlined"
              density="comfortable"
              class="mb-4 form-field"
              bg-color="grey-lighten-4"
              hide-details="auto"
            ></v-text-field>

            <v-text-field
              v-model="designForm.email"
              label="邮箱"
              :error-messages="formErrors.email"
              variant="outlined"
              density="comfortable"
              class="mb-4 form-field"
              bg-color="grey-lighten-4"
              hide-details="auto"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions class="pa-6 pt-0">
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="elevated"
            @click="submitDesignRequest"
            class="submit-btn"
            size="large"
            min-width="120"
          >
            提交需求
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 提示框 -->
    <v-snackbar v-model="showSuccessToast" color="success" timeout="3000">
      提交成功 - 我们会尽快联系您
    </v-snackbar>

    <v-snackbar v-model="showErrorToast" color="error" timeout="3000">
      提交失败 - 请稍后重试
    </v-snackbar>

    <!-- 导航菜单 -->
    <div class="navigation-menu" v-if="false">
      <div class="nav-container">
        <div class="nav-bar">
          <div class="container mx-auto">
            <div class="nav-items pl-4">
              <div
                v-for="(category, index) in categories"
                :key="index"
                class="nav-item"
                @mouseenter="handleMouseEnter(index)"
                @mouseleave="handleMouseLeave"
              >
                <NuxtLink :to="category.path" class="nav-link">
                  {{ category.name }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- 下拉菜单 -->
        <Transition name="dropdown">
          <div
            v-if="isDropdownVisible && activeCategory !== null"
            class="dropdown-menu"
            @mouseenter="showDropdown(activeCategory!)"
            @mouseleave="handleMouseLeave"
          >
            <div class="container mx-auto">
              <div class="dropdown-content pl-8">
                <div class="dropdown-grid">
                  <!-- 左侧文本区域 -->
                  <div class="text-sections">
                    <!-- 按产品分类 -->
                    <div class="text-section">
                      <h3 class="section-title">按产品分类</h3>
                      <div class="section-list">
                        <NuxtLink
                          v-for="subcategory in categories[activeCategory!].subcategories"
                          :key="subcategory.path"
                          :to="subcategory.path"
                          class="section-item"
                        >
                          {{ subcategory.name }}
                        </NuxtLink>
                      </div>
                    </div>

                    <!-- 按品牌分类 -->
                    <div class="text-section">
                      <h3 class="section-title">按品牌分类</h3>
                      <div class="brand-list">
                        <div
                          v-for="brand in categories[activeCategory!].brands"
                          :key="brand.name"
                          class="brand-item"
                        >
                          <div class="brand-image">
                            <div class="brand-placeholder">{{ brand.name.charAt(0) }}</div>
                          </div>
                          <span class="brand-name">{{ brand.name }}</span>
                        </div>
                      </div>
                    </div>

                    <!-- 按款式分类 -->
                    <div class="text-section">
                      <h3 class="section-title">按款式分类</h3>
                      <div class="section-list">
                        <NuxtLink
                          v-for="style in categories[activeCategory!].styles"
                          :key="style.path"
                          :to="style.path"
                          class="section-item"
                        >
                          {{ style.name }}
                        </NuxtLink>
                      </div>
                    </div>

                    <!-- 热门趋势 -->
                    <div class="text-section">
                      <h3 class="section-title">热门趋势</h3>
                      <div class="section-list">
                        <NuxtLink
                          v-for="trend in categories[activeCategory!].trending"
                          :key="trend.path"
                          :to="trend.path"
                          class="section-item trending-item"
                        >
                          {{ trend.name }}
                        </NuxtLink>
                      </div>
                    </div>
                  </div>

                  <!-- 右侧图片区域 -->
                  <div class="image-sections">
                    <div
                      v-for="featured in categories[activeCategory!].featured"
                      :key="featured.name"
                      class="image-section"
                    >
                      <div class="image-content">
                        <div class="image-text">{{ featured.name }}</div>
                        <div class="image-placeholder">
                          <div class="featured-placeholder">{{ featured.name.charAt(0) }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- 黑色菜单栏 -->
    <!-- <div class="black-menu-bar">
      <div class="container mx-auto">
        <div class="black-menu-content">

        </div>
      </div>
    </div> -->

    <!-- 导航菜单栏 -->
    <div class="navigation-menu">
      <!-- Tab 栏 -->
      <div class="tab-bar">
        <div class="container mx-auto">
          <div class="tab-container">
            <input 
              v-for="(category, index) in categories" 
              :key="`tab-${index}`"
              type="radio" 
              :name="'tab'" 
              :id="`tab${index}`" 
              :class="`tab tab--${index + 1}`"
              :checked="activeCategory === index"
              @change="handleTabChange(index)"
            />
            <label 
              v-for="(category, index) in categories" 
              :key="`label-${index}`"
              :class="`tab_label`" 
              :for="`tab${index}`"
              @mouseenter="handleMouseEnter(index)"
              @mouseleave="handleMouseLeave"
            >
              {{ category.name }}
            </label>
            <div class="indicator"></div>
          </div>
        </div>
      </div>

      <!-- 大菜单 -->
      <div 
        v-if="isDropdownVisible"
        class="dropdown-menu"
        @mouseenter="handleMouseEnter(activeCategory)"
        @mouseleave="handleMouseLeave"
      >
        <div class="container mx-auto">
          <div class="menu-content">
            <!-- 左侧热门搜索 -->
            <div class="menu-left">
              <h3 class="menu-title">热门搜索</h3>
              <div class="trending-items">
                <div 
                  v-for="(item, index) in categories[activeCategory]?.trending?.slice(0, 5)" 
                  :key="index"
                  class="trending-item"
                >
                  <div class="trending-image">
                    <img 
                      :src="`/featured/${item.name.toLowerCase().replace(/\s+/g, '-')}.jpg`" 
                      :alt="item.name"
                      @error="(event) => { const target = event.target as HTMLImageElement; if (target) target.style.display = 'none'; }"
                    />
                  </div>
                  <span class="trending-name">{{ item.name }}</span>
                </div>
              </div>
            </div>

            <!-- 右侧特色商品 -->
            <div class="menu-right">
              <div class="featured-cards">
                <div 
                  v-for="(featured, index) in categories[activeCategory]?.featured?.slice(0, 3)" 
                  :key="index"
                  class="featured-card"
                >
                  <div class="featured-image">
                    <img 
                      :src="featured.image" 
                      :alt="featured.name"
                      @error="(event) => { const target = event.target as HTMLImageElement; if (target) target.style.display = 'none'; }"
                    />
                  </div>
                  <div class="featured-title">{{ featured.name }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div
      class="w-full h-24 mt-[1px]"
      style="background-color: rgba(105, 0, 255, 0.6)"
    ></div> -->
    <!-- <div class="w-full h-12 bg-white"></div> -->
    <!-- <div class="w-full h-80 bg-black"></div> -->

    <LayoutPageWrapper class="flex-1 flex bg-white">
      <LayoutPageSection class="flex-1 flex">
        <div class="flex-1 flex flex-col items-center my-20">
          <h1 class="text-center">
            <span
              v-for="(item, i) in leadingsText"
              :key="i"
              :style="`--content: '${item.text}'; --start-color: ${
                item.startColor
              }; --end-color: ${item.endColor}; --animation-name: anim-fg-${i + 1}`"
              class="animated-text-bg drop-shadow-xl text-6xl sm:text-8xl md:text-8xl lg:text-8xl 2xl:text-8xl block font-black uppercase"
            >
              <span class="animated-text-fg">{{ item.text }}</span>
            </span>
          </h1>
          <div class="px-2 sm:px-4 mt-6 text-center max-w-[500px] md:max-w-[600px] text-black">
            {{ awesome?.description || "最具创意的开放式服装设计平台" }}
          </div>
          <div class="flex space-x-4 ml-2 mt-8 justify-center md:justify-start">
            <v-btn
              @click="showDesignModal = true"
              variant="tonal"
              color="black"
              size="large"
              class="text-black font-bold text-xl"
            >
              免费设计
            </v-btn>
          </div>
        </div>
      </LayoutPageSection>
    </LayoutPageWrapper>

    <!-- 设计介绍部分 -->
    <div class="my-16 w-full">
      <h2 class="text-3xl font-bold text-center mb-8">选择您的设计方式</h2>
      <div class="grid grid-cols-1 md:grid-cols-3">
        <!-- 个人定制卡片 -->
        <v-card class="design-card" elevation="0">
          <div class="design-card-content">
            <div class="design-left">
              <div class="design-icon-wrapper">
                <v-icon size="x-large" color="primary">mdi-account-edit</v-icon>
              </div>
            </div>
            <div class="design-right">
              <v-card-title class="text-xl font-bold mb-3">个人定制</v-card-title>
              <v-card-text>
                <p class="text-gray-600">
                  完全由您主导的个性化设计体验。您可以自由选择服装类型、颜色、图案和做工等细节，打造专属于您的独特服装。
                </p>
              </v-card-text>
              <v-card-actions class="pt-4">
                <v-btn
                  variant="tonal"
                  color="black"
                  size="large"
                  class="text-black font-bold text-xl"
                  @click="showDesignModal = true"
                >
                  开始定制
                </v-btn>
              </v-card-actions>
            </div>
          </div>
        </v-card>

        <!-- 设计师设计卡片 -->
        <v-card class="design-card" elevation="0">
          <div class="design-card-content">
            <div class="design-left">
              <div class="design-icon-wrapper">
                <v-icon size="x-large" color="primary">mdi-palette</v-icon>
              </div>
            </div>
            <div class="design-right">
              <v-card-title class="text-xl font-bold mb-3">设计师设计</v-card-title>
              <v-card-text>
                <p class="text-gray-600">
                  由专业设计师为您量身定制。您只需提供设计灵感和需求，我们的设计师将为您打造独特的服装款式。
                </p>
              </v-card-text>
              <v-card-actions class="pt-4">
                <v-btn
                  variant="tonal"
                  color="black"
                  size="large"
                  class="text-black font-bold text-xl"
                  @click="showDesignModal = true"
                >
                  联系设计师
                </v-btn>
              </v-card-actions>
            </div>
          </div>
        </v-card>

        <!-- AI设计卡片 -->
        <v-card class="design-card" elevation="0">
          <div class="design-card-content">
            <div class="design-left">
              <div class="design-icon-wrapper">
                <v-icon size="x-large" color="primary">mdi-robot</v-icon>
              </div>
            </div>
            <div class="design-right">
              <v-card-title class="text-xl font-bold mb-3">AI设计</v-card-title>
              <v-card-text>
                <p class="text-gray-600">
                  通过AI技术实现智能设计。只需描述您的需求，AI将全程参与服装设计过程，为您提供专业的设计方案。
                </p>
              </v-card-text>
              <v-card-actions class="pt-4">
                <v-btn
                  variant="tonal"
                  color="black"
                  size="large"
                  class="text-black font-bold text-xl"
                  @click="showDesignModal = true"
                >
                  体验AI设计
                </v-btn>
              </v-card-actions>
            </div>
          </div>
        </v-card>
      </div>
    </div>

    <!-- 商品展示区域 -->
    <div class="my-16 w-full bg-gray-50 py-16">
      <div class="container mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
        
        <!-- 筛选器和视图控制 -->
        <div class="mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div class="flex items-center gap-4">
            <h2 class="text-2xl font-bold">商品筛选</h2>
            <v-btn
              variant="outlined"
              size="small"
              @click="showAdvancedFilters = !showAdvancedFilters"
              class="filter-toggle-btn"
            >
              <v-icon left>mdi-filter-variant</v-icon>
              高级筛选
            </v-btn>
          </div>
          
          <div class="flex items-center gap-4">
            <!-- 视图模式切换 -->
            <div class="flex items-center gap-2">
              <v-btn
                icon
                variant="text"
                :color="selectedViewMode === 'grid' ? 'primary' : 'default'"
                @click="toggleViewMode('grid')"
              >
                <v-icon>mdi-view-grid</v-icon>
              </v-btn>
              <v-btn
                icon
                variant="text"
                :color="selectedViewMode === 'list' ? 'primary' : 'default'"
                @click="toggleViewMode('list')"
              >
                <v-icon>mdi-view-list</v-icon>
              </v-btn>
              <v-btn
                icon
                variant="text"
                :color="selectedViewMode === 'masonry' ? 'primary' : 'default'"
                @click="toggleViewMode('masonry')"
              >
                <v-icon>mdi-view-module</v-icon>
              </v-btn>
            </div>
            
            <!-- 排序选择 -->
            <v-select
              v-model="sortBy"
              :items="[
                { title: '最新上架', value: 'latest' },
                { title: '价格从低到高', value: 'price-asc' },
                { title: '价格从高到低', value: 'price-desc' },
                { title: '人气排序', value: 'popularity' },
                { title: '评分排序', value: 'rating' }
              ]"
              label="排序方式"
              variant="outlined"
              density="compact"
              hide-details
              class="sort-select"
              @update:model-value="changeSortBy"
            ></v-select>
          </div>
        </div>

        <!-- 高级筛选面板 -->
        <v-expand-transition>
          <div v-if="showAdvancedFilters" class="mb-8">
            <v-card class="filter-panel">
              <v-card-text>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <!-- 性别筛选 -->
                  <div class="filter-section">
                    <h3 class="text-lg font-semibold mb-3">性别</h3>
                    <div class="flex flex-wrap gap-2">
                      <v-chip
                        v-for="gender in genderCategories"
                        :key="gender.value"
                        :color="activeFilters.gender === gender.value ? 'primary' : 'default'"
                        variant="outlined"
                        @click="applyFilter('gender', gender.value)"
                        class="filter-chip"
                      >
                        <v-icon left size="small">{{ gender.icon }}</v-icon>
                        {{ gender.name }}
                      </v-chip>
                    </div>
                  </div>

                  <!-- 季节筛选 -->
                  <div class="filter-section">
                    <h3 class="text-lg font-semibold mb-3">季节</h3>
                    <div class="flex flex-wrap gap-2">
                      <v-chip
                        v-for="season in seasonCategories"
                        :key="season.value"
                        :color="activeFilters.season === season.value ? 'primary' : 'default'"
                        variant="outlined"
                        @click="applyFilter('season', season.value)"
                        class="filter-chip"
                      >
                        <v-icon left size="small" :color="season.color">{{ season.icon }}</v-icon>
                        {{ season.name }}
                      </v-chip>
                    </div>
                  </div>

                  <!-- 价格筛选 -->
                  <div class="filter-section">
                    <h3 class="text-lg font-semibold mb-3">价格区间</h3>
                    <div class="flex flex-wrap gap-2">
                      <v-chip
                        v-for="price in priceCategories"
                        :key="price.value"
                        :color="activeFilters.price === price.value ? 'primary' : 'default'"
                        variant="outlined"
                        @click="applyFilter('price', price.value)"
                        class="filter-chip"
                      >
                        <v-icon left size="small">{{ price.icon }}</v-icon>
                        {{ price.name }}
                      </v-chip>
                    </div>
                  </div>

                  <!-- 品牌筛选 -->
                  <div class="filter-section">
                    <h3 class="text-lg font-semibold mb-3">品牌</h3>
                    <div class="flex flex-wrap gap-2">
                      <v-chip
                        v-for="brand in brandCategories.slice(0, 6)"
                        :key="brand.value"
                        :color="activeFilters.brand === brand.value ? 'primary' : 'default'"
                        variant="outlined"
                        @click="applyFilter('brand', brand.value)"
                        class="filter-chip"
                      >
                        {{ brand.name }}
                      </v-chip>
                    </div>
                  </div>
                </div>

                <!-- 清除筛选按钮 -->
                <div class="mt-6 flex justify-end">
                  <v-btn
                    variant="outlined"
                    color="error"
                    @click="clearAllFilters"
                    class="clear-filters-btn"
                  >
                    <v-icon left>mdi-close</v-icon>
                    清除所有筛选
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </div>
        </v-expand-transition>

        <!-- 性别分类展示 -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold mb-8">按性别分类</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              v-for="gender in genderCategories"
              :key="gender.value"
              class="gender-category-card"
              @click="fetchGenderProducts(gender.value)"
            >
              <div class="gender-card-content">
                <div class="gender-icon-wrapper">
                  <v-icon size="x-large" :color="gender.value === 'male' ? 'blue' : gender.value === 'female' ? 'pink' : 'green'">
                    {{ gender.icon }}
                  </v-icon>
                </div>
                <h3 class="gender-title">{{ gender.name }}</h3>
                <p class="gender-count">
                  {{ productsData.genderProducts[gender.value]?.length || 0 }} 件商品
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 季节分类展示 -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold mb-8">按季节分类</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              v-for="season in seasonCategories"
              :key="season.value"
              class="season-category-card"
              @click="fetchSeasonProducts(season.value)"
            >
              <div class="season-card-content">
                <div class="season-icon-wrapper" :style="{ backgroundColor: season.color + '20' }">
                  <v-icon size="x-large" :color="season.color">
                    {{ season.icon }}
                  </v-icon>
                </div>
                <h3 class="season-title">{{ season.name }}</h3>
                <p class="season-count">
                  {{ productsData.seasonProducts[season.value]?.length || 0 }} 件商品
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 价格分类展示 -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold mb-8">按价格分类</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              v-for="price in priceCategories"
              :key="price.value"
              class="price-category-card"
              @click="fetchPriceProducts(price.value)"
            >
              <div class="price-card-content">
                <div class="price-icon-wrapper">
                  <v-icon size="x-large" color="orange">
                    {{ price.icon }}
                  </v-icon>
                </div>
                <h3 class="price-title">{{ price.name }}</h3>
                <p class="price-range">{{ price.range }}</p>
                <p class="price-count">
                  {{ productsData.priceProducts[price.value]?.length || 0 }} 件商品
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 品牌分类展示 -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold mb-8">热门品牌</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <div
              v-for="brand in brandCategories"
              :key="brand.value"
              class="brand-category-card"
              @click="fetchBrandProducts(brand.value)"
            >
              <div class="brand-card-content">
                <div class="brand-image-wrapper">
                  <div class="brand-placeholder">{{ brand.name.charAt(0) }}</div>
                </div>
                <h3 class="brand-title">{{ brand.name }}</h3>
                <p class="brand-count">
                  {{ productsData.brandProducts[brand.value]?.length || 0 }} 件商品
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 材质分类展示 -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold mb-8">按材质分类</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div
              v-for="material in materialCategories"
              :key="material.value"
              class="material-category-card"
              @click="fetchMaterialProducts(material.value)"
            >
              <div class="material-card-content">
                <div class="material-icon-wrapper">
                  <v-icon size="large" color="brown">
                    {{ material.icon }}
                  </v-icon>
                </div>
                <h3 class="material-title">{{ material.name }}</h3>
                <p class="material-count">
                  {{ productsData.materialProducts[material.value]?.length || 0 }} 件商品
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 颜色分类展示 -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold mb-8">按颜色分类</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <div
              v-for="color in colorCategories"
              :key="color.value"
              class="color-category-card"
              @click="fetchColorProducts(color.value)"
            >
              <div class="color-card-content">
                <div class="color-circle" :style="{ backgroundColor: color.color }"></div>
                <h3 class="color-title">{{ color.name }}</h3>
                <p class="color-count">
                  {{ productsData.colorProducts[color.value]?.length || 0 }} 件商品
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 场合分类展示 -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold mb-8">按场合分类</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div
              v-for="occasion in occasionCategories"
              :key="occasion.value"
              class="occasion-category-card"
              @click="fetchOccasionProducts(occasion.value)"
            >
              <div class="occasion-card-content">
                <div class="occasion-icon-wrapper">
                  <v-icon size="large" color="purple">
                    {{ occasion.icon }}
                  </v-icon>
                </div>
                <h3 class="occasion-title">{{ occasion.name }}</h3>
                <p class="occasion-count">
                  {{ productsData.occasionProducts[occasion.value]?.length || 0 }} 件商品
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 特价商品 -->
        <div class="mb-16">
          <div class="flex justify-between items-center mb-8">
            <h2 class="text-3xl font-bold">特价商品</h2>
            <NuxtLink to="/products?sale=true" class="text-red-600 hover:text-red-800 font-medium">
              查看更多 →
            </NuxtLink>
          </div>
          <div v-if="loading.saleProducts" class="flex justify-center py-12">
            <v-progress-circular indeterminate color="primary" size="48"></v-progress-circular>
          </div>
          <div v-else-if="productsData.saleProducts.length === 0" class="text-center py-12 text-gray-500">
            暂无特价商品
          </div>
          <div v-else class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <div
              v-for="product in productsData.saleProducts.slice(0, 8)"
              :key="product.id"
              class="product-card sale-product-card"
              @click="navigateToProduct(product.id)"
            >
              <div class="product-image">
                <div class="sale-badge">特价</div>
                <img
                  v-if="product?.customModel?.thumbnail"
                  :src="product.customModel.thumbnail"
                  :alt="product.name"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
                  <v-icon>mdi-image</v-icon>
                </div>
              </div>
              <div class="product-info">
                <h3 class="product-title">{{ product.name }}</h3>
                <p class="product-price sale-price">¥{{ product.price || '待定' }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 精选商品 -->
        <div class="mb-16">
          <div class="flex justify-between items-center mb-8">
            <h2 class="text-3xl font-bold">精选商品</h2>
            <NuxtLink to="/products?featured=true" class="text-blue-600 hover:text-blue-800 font-medium">
              查看更多 →
            </NuxtLink>
          </div>
          <div v-if="loading.featuredProducts" class="flex justify-center py-12">
            <v-progress-circular indeterminate color="primary" size="48"></v-progress-circular>
          </div>
          <div v-else-if="productsData.featuredProducts.length === 0" class="text-center py-12 text-gray-500">
            暂无精选商品
          </div>
          <div v-else class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <div
              v-for="product in productsData.featuredProducts.slice(0, 8)"
              :key="product.id"
              class="product-card featured-product-card"
              @click="navigateToProduct(product.id)"
            >
              <div class="product-image">
                <div class="featured-badge">精选</div>
                <img
                  v-if="product?.customModel?.thumbnail"
                  :src="product.customModel.thumbnail"
                  :alt="product.name"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
                  <v-icon>mdi-image</v-icon>
                </div>
              </div>
              <div class="product-info">
                <h3 class="product-title">{{ product.name }}</h3>
                <p class="product-price">¥{{ product.price || '待定' }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 趋势商品 -->
        <div class="mb-16">
          <div class="flex justify-between items-center mb-8">
            <h2 class="text-3xl font-bold">趋势商品</h2>
            <NuxtLink to="/products?trending=true" class="text-orange-600 hover:text-orange-800 font-medium">
              查看更多 →
            </NuxtLink>
          </div>
          <div v-if="loading.trendingProducts" class="flex justify-center py-12">
            <v-progress-circular indeterminate color="primary" size="48"></v-progress-circular>
          </div>
          <div v-else-if="productsData.trendingProducts.length === 0" class="text-center py-12 text-gray-500">
            暂无趋势商品
          </div>
          <div v-else class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <div
              v-for="product in productsData.trendingProducts.slice(0, 8)"
              :key="product.id"
              class="product-card trending-product-card"
              @click="navigateToProduct(product.id)"
            >
              <div class="product-image">
                <div class="trending-badge">热门</div>
                <img
                  v-if="product?.customModel?.thumbnail"
                  :src="product.customModel.thumbnail"
                  :alt="product.name"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
                  <v-icon>mdi-image</v-icon>
                </div>
              </div>
              <div class="product-info">
                <h3 class="product-title">{{ product.name }}</h3>
                <p class="product-price">¥{{ product.price || '待定' }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 新品上市 -->
        <div class="mb-16">
          <div class="flex justify-between items-center mb-8">
            <h2 class="text-3xl font-bold">新品上市</h2>
            <NuxtLink to="/products?sort=latest" class="text-blue-600 hover:text-blue-800 font-medium">
              查看更多 →
            </NuxtLink>
          </div>
          <div v-if="loading.newArrivals" class="flex justify-center py-12">
            <v-progress-circular indeterminate color="primary" size="48"></v-progress-circular>
          </div>
          <div v-else-if="productsData.newArrivals.length === 0" class="text-center py-12 text-gray-500">
            暂无新品
          </div>
          <div v-else class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <div
              v-for="product in productsData.newArrivals.slice(0, 8)"
              :key="product.id"
              class="product-card new-product-card"
              @click="navigateToProduct(product.id)"
            >
              <div class="product-image">
                <div class="new-badge">新品</div>
                <img
                  v-if="product?.customModel?.thumbnail"
                  :src="product.customModel.thumbnail"
                  :alt="product.name"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
                  <v-icon>mdi-image</v-icon>
                </div>
              </div>
              <div class="product-info">
                <h3 class="product-title">{{ product.name }}</h3>
                <p class="product-price">¥{{ product.price || '待定' }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 热门商品 -->
        <div class="mb-16">
          <div class="flex justify-between items-center mb-8">
            <h2 class="text-3xl font-bold">热门商品</h2>
            <NuxtLink to="/products?sort=popular" class="text-blue-600 hover:text-blue-800 font-medium">
              查看更多 →
            </NuxtLink>
          </div>
          <div v-if="loading.popular" class="flex justify-center py-12">
            <v-progress-circular indeterminate color="primary" size="48"></v-progress-circular>
          </div>
          <div v-else-if="productsData.popular.length === 0" class="text-center py-12 text-gray-500">
            暂无热门商品
          </div>
          <div v-else class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <div
              v-for="product in productsData.popular.slice(0, 8)"
              :key="product.id"
              class="product-card"
              @click="navigateToProduct(product.id)"
            >
              <div class="product-image">
                <img
                  v-if="product?.customModel?.thumbnail"
                  :src="product.customModel.thumbnail"
                  :alt="product.name"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
                  <v-icon>mdi-image</v-icon>
                </div>
              </div>
              <div class="product-info">
                <h3 class="product-title">{{ product.name }}</h3>
                <p class="product-price">¥{{ product.price || '待定' }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 推荐商品 -->
        <div class="mb-16">
          <div class="flex justify-between items-center mb-8">
            <h2 class="text-3xl font-bold">推荐商品</h2>
            <NuxtLink to="/products?sort=rating" class="text-blue-600 hover:text-blue-800 font-medium">
              查看更多 →
            </NuxtLink>
          </div>
          <div v-if="loading.recommended" class="flex justify-center py-12">
            <v-progress-circular indeterminate color="primary" size="48"></v-progress-circular>
          </div>
          <div v-else-if="productsData.recommended.length === 0" class="text-center py-12 text-gray-500">
            暂无推荐商品
          </div>
          <div v-else class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <div
              v-for="product in productsData.recommended.slice(0, 8)"
              :key="product.id"
              class="product-card"
              @click="navigateToProduct(product.id)"
            >
              <div class="product-image">
                <img
                  v-if="product?.customModel?.thumbnail"
                  :src="product.customModel.thumbnail"
                  :alt="product.name"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
                  <v-icon>mdi-image</v-icon>
                </div>
              </div>
              <div class="product-info">
                <h3 class="product-title">{{ product.name }}</h3>
                <p class="product-price">¥{{ product.price || '待定' }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 分类商品展示 -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold mb-8">分类精选</h2>
          
          <!-- 休闲风格 -->
          <div class="mb-12">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-semibold">休闲风格</h3>
              <NuxtLink to="/products?filters[style]=casual" class="text-blue-600 hover:text-blue-800 font-medium">
                查看更多 →
              </NuxtLink>
            </div>
            <div v-if="loading.categoryProducts['casual']" class="flex justify-center py-8">
              <v-progress-circular indeterminate color="primary" size="32"></v-progress-circular>
            </div>
            <div v-else-if="!productsData.categoryProducts['casual'] || productsData.categoryProducts['casual'].length === 0" class="text-center py-8 text-gray-500">
              暂无休闲风格商品
            </div>
            <div v-else class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div
                v-for="product in productsData.categoryProducts['casual'].slice(0, 6)"
                :key="product.id"
                class="product-card"
                @click="navigateToProduct(product.id)"
              >
                <div class="product-image">
                  <img
                    v-if="product?.customModel?.thumbnail"
                    :src="product.customModel.thumbnail"
                    :alt="product.name"
                    class="w-full h-full object-cover"
                  />
                  <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
                    <v-icon>mdi-image</v-icon>
                  </div>
                </div>
                <div class="product-info">
                  <h3 class="product-title">{{ product.name }}</h3>
                  <p class="product-price">¥{{ product.price || '待定' }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 正装风格 -->
          <div class="mb-12">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-semibold">正装风格</h3>
              <NuxtLink to="/products?filters[style]=formal" class="text-blue-600 hover:text-blue-800 font-medium">
                查看更多 →
              </NuxtLink>
            </div>
            <div v-if="loading.categoryProducts['formal']" class="flex justify-center py-8">
              <v-progress-circular indeterminate color="primary" size="32"></v-progress-circular>
            </div>
            <div v-else-if="!productsData.categoryProducts['formal'] || productsData.categoryProducts['formal'].length === 0" class="text-center py-8 text-gray-500">
              暂无正装风格商品
            </div>
            <div v-else class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div
                v-for="product in productsData.categoryProducts['formal'].slice(0, 6)"
                :key="product.id"
                class="product-card"
                @click="navigateToProduct(product.id)"
              >
                <div class="product-image">
                  <img
                    v-if="product?.customModel?.thumbnail"
                    :src="product.customModel.thumbnail"
                    :alt="product.name"
                    class="w-full h-full object-cover"
                  />
                  <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
                    <v-icon>mdi-image</v-icon>
                  </div>
                </div>
                <div class="product-info">
                  <h3 class="product-title">{{ product.name }}</h3>
                  <p class="product-price">¥{{ product.price || '待定' }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 运动风格 -->
          <div class="mb-12">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-semibold">运动风格</h3>
              <NuxtLink to="/products?filters[style]=sports" class="text-blue-600 hover:text-blue-800 font-medium">
                查看更多 →
              </NuxtLink>
            </div>
            <div v-if="loading.categoryProducts['sports']" class="flex justify-center py-8">
              <v-progress-circular indeterminate color="primary" size="32"></v-progress-circular>
            </div>
            <div v-else-if="!productsData.categoryProducts['sports'] || productsData.categoryProducts['sports'].length === 0" class="text-center py-8 text-gray-500">
              暂无运动风格商品
            </div>
            <div v-else class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div
                v-for="product in productsData.categoryProducts['sports'].slice(0, 6)"
                :key="product.id"
                class="product-card"
                @click="navigateToProduct(product.id)"
              >
                <div class="product-image">
                  <img
                    v-if="product?.customModel?.thumbnail"
                    :src="product.customModel.thumbnail"
                    :alt="product.name"
                    class="w-full h-full object-cover"
                  />
                  <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
                    <v-icon>mdi-image</v-icon>
                  </div>
                </div>
                <div class="product-info">
                  <h3 class="product-title">{{ product.name }}</h3>
                  <p class="product-price">¥{{ product.price || '待定' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 商品展示链接部分 -->
        <div class="text-center">
          <h2 class="text-3xl font-bold mb-4">探索更多精选商品</h2>
          <p class="text-gray-600 mb-8 max-w-2xl mx-auto">
            发现独特的服装设计，展现您的个性风格。我们精心挑选了各种风格的服装，满足您的不同需求。
          </p>
          <NuxtLink to="/products">
            <v-btn
              color="primary"
              size="x-large"
              variant="elevated"
              class="text-white font-bold text-lg px-8 py-4"
            >
              浏览全部商品
            </v-btn>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
:root {
  --padding: 0.05em;
}

@keyframes anim-fg-1 {
  0%,
  16.667%,
  100% {
    opacity: 1;
  }
  33.333%,
  83.333% {
    opacity: 0;
  }
}
@keyframes anim-fg-2 {
  0%,
  16.667%,
  66.667%,
  100% {
    opacity: 0;
  }
  33.333%,
  50% {
    opacity: 1;
  }
}
@keyframes anim-fg-3 {
  0%,
  50%,
  100% {
    opacity: 0;
  }
  66.667%,
  83.333% {
    opacity: 1;
  }
}
.animated-text-bg {
  position: relative;
  display: block;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  content: var(--content);
  display: block;
  width: 100%;
  color: theme("colors.slate.800");
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
  padding-left: var(--padding);
  padding-right: var(--padding);
  &:before {
    content: var(--content);
    position: absolute;
    display: block;
    width: 100%;
    color: theme("colors.slate.800");
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    padding-left: var(--padding);
    padding-right: var(--padding);
  }
}
.animated-text-fg {
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-left: var(--padding);
  padding-right: var(--padding);
  background-image: linear-gradient(90deg, var(--start-color), var(--end-color));
  position: relative;
  opacity: 0;
  z-index: 1;
  animation: var(--animation-name) 8s infinite;
}
html.dark {
  .animated-text-bg {
    color: theme("colors.gray.100");
    &:before {
      color: theme("colors.gray.100");
    }
  }
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 删除 PrimeVue Dropdown 相关样式 */

/* 设计需求弹窗样式 */
.design-request-dialog {
  .v-card {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .border-bottom {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  }

  .close-btn {
    transition: all 0.3s ease;
    &:hover {
      transform: rotate(90deg);
    }
  }

  .form-field {
    .v-field {
      border-radius: 8px;
      transition: all 0.3s ease;

      &:hover {
        background-color: rgba(0, 0, 0, 0.02);
      }

      &.v-field--focused {
        background-color: #fff;
        box-shadow: 0 0 0 2px rgba(var(--v-theme-primary), 0.2);
      }
    }
  }

  .submit-btn {
    font-weight: 600;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(var(--v-theme-primary), 0.3);
    }
  }
}

/* 设计卡片样式 */
.design-card {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  overflow: hidden;
  height: 200px;
  
  .design-card-content {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 20px;
  }

  .design-left {
    flex: 0 0 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 20px;
  }

  .design-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .design-icon-wrapper {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s ease;
    background: rgba(var(--v-theme-primary), 0.05);
  }

  .v-card-title {
    font-size: 1.25rem;
    line-height: 1.3;
    color: rgba(0, 0, 0, 0.87);
    margin-bottom: 4px;
  }

  .v-card-text {
    color: rgba(0, 0, 0, 0.6);
    font-size: 0.95rem;
    line-height: 1.4;
    margin-bottom: 4px;
  }

  .v-card-actions {
    padding-top: 4px !important;
  }

  .v-btn {
    transition: all 0.3s ease;
    align-self: flex-start;
    padding: 0 16px;
    height: 36px;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }
}

/* 导航菜单样式 */
.navigation-menu {
  position: relative;
}

.nav-container {
  position: relative;
}

.nav-bar {
  background-color: #525050;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.nav-items {
  display: flex;
  align-items: center;
  gap: 24px;
  width: 100%;
  padding: 0;
  justify-content: flex-start;
}

.nav-item {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-top: 1px solid #e5e7eb;
  z-index: 1001;
}

.dropdown-content {
  padding: 32px 0;
}

.dropdown-grid {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 48px;
  align-items: start;
}

/* 左侧文本区域 */
.text-sections {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.text-section {
  .section-title {
    font-size: 14px;
    font-weight: 700;
    color: #374151;
    text-transform: uppercase;
    margin-bottom: 16px;
    letter-spacing: 0.5px;
  }
}

.section-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 300px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 2px;
    
    &:hover {
      background: #94a3b8;
    }
  }
}

.section-item {
  display: block;
  color: #6b7280;
  text-decoration: none;
  font-size: 14px;
  font-weight: 400;
  transition: all 0.2s ease;
  padding: 4px 0;
  
  &:hover {
    color: #374151;
    transform: translateX(4px);
  }
  
  &.trending-item {
    font-weight: 500;
    color: #059669;
    
    &:hover {
      color: #047857;
    }
  }
}

/* 品牌列表 */
.brand-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 280px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 2px;
    
    &:hover {
      background: #94a3b8;
    }
  }
}

.brand-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid #f3f4f6;
  transition: all 0.2s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    .brand-name {
      color: #059669;
    }
  }
}

.brand-image {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.brand-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6b7280 0%, #9ca3af 100%);
  color: white;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
}

.brand-name {
  font-size: 14px;
  font-weight: 400;
  color: #6b7280;
  transition: color 0.2s ease;
}

/* 右侧图片区域 */
.image-sections {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.image-section {
  background-color: #f9fafb;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f3f4f6;
    transform: translateY(-2px);
  }
}

.image-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  height: 80px;
}

.image-text {
  font-size: 14px;
  font-weight: 700;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex: 1;
}

.image-placeholder {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.featured-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6b7280 0%, #9ca3af 100%);
  color: white;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
}

// 过渡动画
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .dropdown-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .text-sections {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
  
  .section-list,
  .brand-list {
    max-height: 250px;
  }
  
  .image-sections {
    display: none;
  }
}

@media (max-width: 768px) {
  .text-sections {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  .section-title {
    font-size: 13px !important;
  }
  
  .section-item {
    font-size: 13px;
  }
  
  .brand-name {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .text-sections {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

@media (max-width: 768px) {
  .nav-items {
    gap: 16px;
    padding: 0 16px;
    overflow-x: auto;
    justify-content: flex-start;
  }
  
  .nav-link {
    font-size: 13px;
    padding: 6px 8px;
  }
  
  .dropdown-content {
    padding: 24px 16px;
  }
  
  .subcategory-list {
    grid-template-columns: 1fr;
  }
  
  .category-title {
    font-size: 20px;
  }
  
  .design-card {
    height: auto;
    
    .design-card-content {
      flex-direction: column;
      padding: 20px;
    }
    
    .design-left {
      flex: none;
      padding-right: 0;
      margin-bottom: 12px;
    }
    
    .design-icon-wrapper {
      width: 60px;
      height: 60px;
    }
    
    .v-card-title {
      font-size: 1.25rem;
      text-align: center;
      margin-bottom: 4px;
    }
    
    .v-card-text {
      text-align: center;
      margin-bottom: 4px;
    }
    
    .v-card-actions {
      padding-top: 4px !important;
    }
    
    .v-btn {
      align-self: center;
    }
  }
}

@media (max-width: 480px) {
  .nav-items {
    gap: 12px;
  }
  
  .nav-link {
    font-size: 12px;
    padding: 4px 6px;
  }
}

// 黑色菜单栏样式
.black-menu-bar {
  background: #000000;
  padding: 8px 0;
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
}

.black-menu-content {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  flex-wrap: wrap;
}

.black-menu-item {
  position: relative;
}

.black-menu-link {
  color: #ffffff;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    width: 0;
    height: 2px;
    background: #ffffff;
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }
  
  &:hover::after {
    width: 80%;
  }
}

// 渐变Banner样式
.gradient-banner {
  background: radial-gradient(circle, #F5F5F5 0%, #736F7A 100%);
  height: 100vh;
  margin-top: 0;
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.1) 100%);
    pointer-events: none;
  }
}

.banner-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 1;
}

.banner-text {
  color: white;
}

.banner-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  line-height: 1.1;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.banner-subtitle {
  font-size: 1.25rem;
  margin-bottom: 32px;
  opacity: 0.9;
  line-height: 1.5;
}

.banner-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.banner-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1rem;
  
  &.primary {
    background: white;
    color: #667eea;
    
    &:hover {
      background: #f8fafc;
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    }
  }
  
  &.secondary {
    background: rgba(255,255,255,0.2);
    color: white;
    border: 2px solid rgba(255,255,255,0.3);
    
    &:hover {
      background: rgba(255,255,255,0.3);
      border-color: rgba(255,255,255,0.5);
      transform: translateY(-2px);
    }
  }
}

.banner-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.outfit-showcase {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 400px;
}

.outfit-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.outfit-placeholder {
  width: 80px;
  height: 120px;
  border-radius: 12px;
  position: relative;
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
  }
  
  &.floral {
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    &::after {
      content: '🌸';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 24px;
    }
  }
  
  &.pinstripe {
    background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
    &::after {
      content: '⚡';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 24px;
    }
  }
  
  &.cream {
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    &::after {
      content: '✨';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 24px;
    }
  }
}

.outfit-label {
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  opacity: 0.9;
}

// 响应式设计
@media (max-width: 1024px) {
  .banner-content {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
  
  .banner-title {
    font-size: 2.5rem;
  }
  
  .outfit-showcase {
    max-width: 300px;
  }
}

@media (max-width: 768px) {
  .gradient-banner {
    height: 100vh;
  }
  
  .banner-title {
    font-size: 2rem;
  }
  
  .banner-subtitle {
    font-size: 1.125rem;
  }
  
  .banner-buttons {
    justify-content: center;
  }
  
  .outfit-showcase {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    max-width: 280px;
  }
  
  .outfit-placeholder {
    width: 60px;
    height: 90px;
  }
  
  .outfit-label {
    font-size: 0.75rem;
  }
}

@media (max-width: 768px) {
  .black-menu-content {
    gap: 20px;
    padding: 0 16px;
  }
  
  .black-menu-link {
    font-size: 0.875rem;
    padding: 6px 12px;
  }
}

@media (max-width: 480px) {
  .black-menu-bar {
    padding: 6px 0;
  }
  
  .black-menu-content {
    gap: 12px;
    padding: 0 12px;
  }
  
  .black-menu-link {
    font-size: 0.8rem;
    padding: 4px 8px;
  }
}

@media (max-width: 480px) {
  .gradient-banner {
    height: 100vh;
  }
  
  .banner-title {
    font-size: 1.75rem;
  }
  
  .banner-subtitle {
    font-size: 1rem;
  }
  
  .banner-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .banner-btn {
    width: 100%;
    max-width: 200px;
  }
  
  .outfit-showcase {
    gap: 12px;
  }
  
  .outfit-placeholder {
    width: 50px;
    height: 75px;
  }
}

/* 导航菜单样式 */
.navigation-menu {
  position: relative;
  z-index: 1000;
}

.tab-bar {
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  padding: 8px 0;
}

.tab-container {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 2px;
  background-color: #dadadb;
  border-radius: 9px;
  margin: 8px 32px;
  
  @media (max-width: 768px) {
    margin: 8px 20px;
  }
}

.indicator {
  content: "";
  width: 130px;
  height: 28px;
  background: #ffffff;
  position: absolute;
  top: 2px;
  left: 2px;
  z-index: 9;
  border: 0.5px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.12), 0px 3px 1px rgba(0, 0, 0, 0.04);
  border-radius: 7px;
  transition: all 0.2s ease-out;
}

.tab {
  width: 130px;
  height: 28px;
  position: absolute;
  z-index: 99;
  outline: none;
  opacity: 0;
}

.tab_label {
  width: 130px;
  height: 28px;
  position: relative;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  font-size: 0.75rem;
  color: #6c757d;
  opacity: 0.6;
  cursor: pointer;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.8;
  }
}

/* 动态定位indicator */
.tab--1:checked ~ .indicator {
  left: 2px;
}

.tab--2:checked ~ .indicator {
  left: calc(130px + 2px);
}

.tab--3:checked ~ .indicator {
  left: calc(130px * 2 + 2px);
}

.tab--4:checked ~ .indicator {
  left: calc(130px * 3 + 2px);
}

.tab--5:checked ~ .indicator {
  left: calc(130px * 4 + 2px);
}

.tab--6:checked ~ .indicator {
  left: calc(130px * 5 + 2px);
}

.tab--7:checked ~ .indicator {
  left: calc(130px * 6 + 2px);
}

.tab--8:checked ~ .indicator {
  left: calc(130px * 7 + 2px);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  animation: slideDown 0.3s ease;
  min-height: 280px;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.menu-content {
  display: flex;
  padding: 40px 32px;
  gap: 48px;
  min-height: 200px;
  
  @media (max-width: 768px) {
    padding: 32px 20px;
    gap: 24px;
    min-height: 180px;
  }
}

.menu-left {
  flex: 1;
  max-width: 300px;
}

.menu-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.trending-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.trending-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f9fafb;
    padding-left: 8px;
  }
}

.trending-image {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.trending-name {
  font-size: 14px;
  color: #374151;
  font-weight: 500;
}

.menu-right {
  flex: 2;
}

.featured-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.featured-card {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
}

.featured-image {
  width: 100%;
  height: 120px;
  overflow: hidden;
  background: #f3f4f6;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
}

.featured-title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
}

/* 响应式导航菜单 */
@media (max-width: 768px) {
  .tab-container {
    overflow-x: auto;
    margin: 8px 20px;
  }
  
  .tab_label {
    min-width: 100px;
    white-space: nowrap;
  }
  
  .menu-content {
    flex-direction: column;
    padding: 32px 20px;
    gap: 24px;
  }
  
  .menu-left {
    max-width: none;
  }
  
  .featured-cards {
    grid-template-columns: 1fr;
  }
  
  .featured-image {
    height: 100px;
  }
}

/* 商品卡片样式 */
.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
}

.product-image {
  width: 100%;
  height: 120px;
  position: relative;
  overflow: hidden;
  
  img {
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
}

.product-info {
  padding: 12px;
}

.product-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 4px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-price {
  font-size: 0.875rem;
  font-weight: 600;
  color: #059669;
  margin: 0;
}

/* 筛选器样式 */
.filter-toggle-btn {
  border-radius: 8px;
  font-weight: 500;
}

.filter-panel {
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

.filter-section {
  .filter-chip {
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      transform: translateY(-1px);
    }
  }
}

.clear-filters-btn {
  border-radius: 8px;
  font-weight: 500;
}

.sort-select {
  min-width: 150px;
}

/* 分类卡片样式 */
.gender-category-card,
.season-category-card,
.price-category-card,
.brand-category-card,
.material-category-card,
.color-category-card,
.occasion-category-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    border-color: rgba(var(--v-theme-primary), 0.2);
  }
}

.gender-card-content,
.season-card-content,
.price-card-content,
.brand-card-content,
.material-card-content,
.color-card-content,
.occasion-card-content {
  text-align: center;
}

.gender-icon-wrapper,
.season-icon-wrapper,
.price-icon-wrapper,
.material-icon-wrapper,
.occasion-icon-wrapper {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
  background: rgba(var(--v-theme-primary), 0.1);
  transition: all 0.3s ease;
}

.brand-image-wrapper {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 0 auto 12px;
  overflow: hidden;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6b7280 0%, #9ca3af 100%);
  color: white;
  font-size: 18px;
  font-weight: 600;
}

.color-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 0 auto 12px;
  border: 3px solid #e5e7eb;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    border-color: rgba(var(--v-theme-primary), 0.5);
  }
}

.gender-title,
.season-title,
.price-title,
.brand-title,
.material-title,
.color-title,
.occasion-title {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 4px;
}

.price-range {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 4px;
}

.gender-count,
.season-count,
.price-count,
.brand-count,
.material-count,
.color-count,
.occasion-count {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

/* 商品徽章样式 */
.sale-badge,
.featured-badge,
.trending-badge,
.new-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  z-index: 2;
}

.sale-badge {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

.featured-badge {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

.trending-badge {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.new-badge {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

/* 特价商品样式 */
.sale-product-card {
  .product-price {
    color: #ef4444;
    font-weight: 700;
  }
}

/* 响应式商品卡片 */
@media (max-width: 768px) {
  .product-image {
    height: 100px;
  }
  
  .product-info {
    padding: 8px;
  }
  
  .product-title {
    font-size: 0.8rem;
  }
  
  .product-price {
    font-size: 0.8rem;
  }
  
  .gender-icon-wrapper,
  .season-icon-wrapper,
  .price-icon-wrapper,
  .material-icon-wrapper,
  .occasion-icon-wrapper,
  .brand-image-wrapper,
  .color-circle {
    width: 50px;
    height: 50px;
  }
  
  .gender-title,
  .season-title,
  .price-title,
  .brand-title,
  .material-title,
  .color-title,
  .occasion-title {
    font-size: 0.9rem;
  }
  
  .gender-count,
  .season-count,
  .price-count,
  .brand-count,
  .material-count,
  .color-count,
  .occasion-count {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .product-image {
    height: 80px;
  }
  
  .product-info {
    padding: 6px;
  }
  
  .product-title {
    font-size: 0.75rem;
  }
  
  .product-price {
    font-size: 0.75rem;
  }
  
  .gender-icon-wrapper,
  .season-icon-wrapper,
  .price-icon-wrapper,
  .material-icon-wrapper,
  .occasion-icon-wrapper,
  .brand-image-wrapper,
  .color-circle {
    width: 40px;
    height: 40px;
  }
  
  .gender-title,
  .season-title,
  .price-title,
  .brand-title,
  .material-title,
  .color-title,
  .occasion-title {
    font-size: 0.8rem;
  }
  
  .gender-count,
  .season-count,
  .price-count,
  .brand-count,
  .material-count,
  .color-count,
  .occasion-count {
    font-size: 0.75rem;
  }
}
</style>
