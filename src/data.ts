import { Project, UniversityProject, Strength, Experience } from './types';

// Import images as ES Modules to guarantee correct compilation and packing by Vite
import profileAvatar from './assets/images/profile_avatar_new_1783111707767.jpg';
import sakeLunaImg from './assets/images/regenerated_image_1783113546290.png';
import neonShrineImg from './assets/images/cyber_shrine_1783105490449.jpg';
import skincareFloraImg from './assets/images/skincare_branding_1783105476996.jpg';
import desertOasisImg from './assets/images/sandstone_oasis_1783105501813.jpg';

export const PROFILE = {
  name: '赵笑禾 / Zhao Xiaohe',
  titles: [
    '高级包装与平面设计师',
    '3D游戏场景地编设计师 / 关卡美术师'
  ],
  bio: '兼具商业设计直觉与数字化空间塑造力。深耕平面、高端品牌包装与视觉体系，同时作为关卡地编艺术家，将世界观叙事融入三维虚拟空间。追求极致的视觉秩序、材质触感与空间情绪。',
  email: 'zxiaohe26@gmail.com',
  phone: '+86 138-1234-5678',
  location: '中国 · 上海 / Shanghai, China',
  wechat: 'Xiaohe_Design_3D',
  behance: 'behance.net/zhaoxiaohe_design',
  avatar: profileAvatar,
  stats: [
    { value: '5+', label: '行业深耕年限' },
    { value: '40+', label: '落地包装与品牌项目' },
    { value: '12+', label: '独立/中大型游戏场景地编' },
    { value: '100%', label: '创意与商业落地融合率' }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: 'sake-luna',
    title: '赴山唤春，以武夷山「喊山祭茶」非遗民俗为文化根脉的年轻化茶包装',
    category: 'graphic',
    tags: ['茶包装设计', '非遗文化', '品牌视觉', '国潮新茶饮'],
    image: sakeLunaImg,
    description: '一款致敬武夷山「喊山祭茶」非遗民俗的年轻化茶叶包装设计。采用鲜活明朗的春绿色调，融合非遗文化根脉，打造符合现代年轻人审美的东方新茶饮视觉体系。',
    details: [
      '非遗根脉：以武夷山传统「喊山祭茶」非遗仪式为灵感，结合现代极简插画重构传统茶文化。',
      '视觉呈现：大面积充满生命力的春绿专色，搭配优雅的现代汉字排版，展现传统美学在当代的高频共振。',
      '工艺规格：环保艺术纸张，无热击凸工艺，完美还原非遗仪式感与山野茶香。'
    ],
    year: '2025',
    client: '闽小芽茶业 (Min Xiao Ya Tea Co.)',
    software: ['Photoshop', 'Illustrator', 'Cinema 4D', 'Keyshot']
  },
  {
    id: 'neon-shrine',
    title: '「霓虹圣域」Neon Sanctum - 赛博神道教虚拟场景地编',
    category: 'level',
    tags: ['游戏地编', '关卡美术', '灯光与氛围', '硬表面细节'],
    image: neonShrineImg,
    description: '一个融合日式传统神道教鸟居建筑与赛博朋克未来主义的全三维次世代游戏场景。重在通过灯光、雨夜积水反射与体积雾营造高对比度的叙事氛围。',
    details: [
      '美术规格：采用次世代PBR工作流，自制高度细分材质与模块化建筑资产',
      '地编要点：利用雨水顶点着色器模拟地面水洼，配合点光源与发光全息图形成多层次反射，规划合理的玩家引导视线流。',
      '帧率表现：在Unreal Engine 5中结合Lumen与Nanite，场景在RTX 3070上实现稳定60 FPS。'
    ],
    year: '2025',
    client: '次世代动作RPG独立开发项目',
    software: ['Unreal Engine 5', 'Houdini', 'Blender', 'Substance Painter']
  },
  {
    id: 'skincare-flora',
    title: '「草木物语」Flora & Fauna - 有机草本护肤全案视觉体系',
    category: 'graphic',
    tags: ['品牌全案', '包装设计', '网格排版', '环保纸张'],
    image: skincareFloraImg,
    description: '针对天然植物成分护肤品的品牌重塑项目。建立从标志、辅助图形、纸盒网格排版到特种玻璃瓶标签的高质感轻奢视觉系统。',
    details: [
      '工艺：环保大豆油墨印刷、低饱和度专色、凹凸浮雕工艺',
      '设计理念：遵循严谨的瑞士现代主义排版网格，展现科学与植物自然的平衡美感。',
      '应用模块：主包装、限定礼盒、线上视觉海报、品牌线下展陈手册。'
    ],
    year: '2024',
    client: '植粹护肤实验室 (Flora & Fauna Lab)',
    software: ['Illustrator', 'InDesign', 'Photoshop', 'Dimension']
  },
  {
    id: 'desert-oasis',
    title: '「遗落绿洲」The Forgotten Oasis - 远古沙漠神庙遗迹关卡',
    category: 'level',
    tags: ['环境设计', '地形绘制', '植被散布', '自然叙事'],
    image: desertOasisImg,
    description: '广袤荒漠中掩埋的古文明神庙场景。展示巨型砂岩遗迹与地下涌出的晶莹水源、繁茂热带植被之间的强烈视觉张力。',
    details: [
      '地编要点：使用Runtime Virtual Texture (RVT) 完美融合砂岩资产与地形沙土，设计复杂的植被高度和湿度权重。',
      '光影控制：运用正午强直射日光配合神庙阴影和丁达尔光束，表现神圣静谧感。',
      '关卡路线：围绕中央圣池进行模块化阻挡和解密区域路线规划。'
    ],
    year: '2024',
    client: '写实开放世界探险游戏',
    software: ['Unreal Engine 5', 'Substance Designer', 'SpeedTree', 'ZBrush']
  }
];

export const UNIVERSITY_PROJECTS: UniversityProject[] = [
  {
    id: 'univ-1',
    title: '「城市呼吸器」Urban Oasis - 模块化垂直生态社区概念设计',
    category: '游戏关卡美术 / 毕业设计',
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80',
    year: '2023',
    description: '探讨高密度未来都市中绿植、装配式集装箱建筑与居民公共空间的垂直排布。荣获学院优秀毕业设计一等奖。'
  },
  {
    id: 'univ-2',
    title: '「流动印记」Fluid Mark - 城市公共文化空间导视系统设计',
    category: '平面视觉 / 课程设计',
    image: 'https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?auto=format&fit=crop&w=800&q=80',
    year: '2022',
    description: '将流体动力学概念引入博物馆、剧院等文化空间的导视牌中。利用光栅板实现随着游览者走动产生变化的动态视觉反馈。'
  },
  {
    id: 'univ-3',
    title: '「重塑日常」Re-daily - 废旧家电外壳可持续再造包装研究',
    category: '工业与包装 / 课题项目',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    year: '2022',
    description: '通过打碎、热压、重新定型等物理回收方式，将废弃ABS塑料外壳制成抗震物流包装盒，并探索其高档礼盒包装的可行性。'
  }
];

export const STRENGTHS: Strength[] = [
  {
    id: 'str-1',
    title: '硬核地编与三维美学 / Unreal Scene Crafting',
    iconName: 'Box',
    desc: '掌握虚幻引擎次世代游戏制作与场景地编工作流，能将极具质感的平面网格审美带入三维。擅长在复杂材质混合、大面积植被及硬表面光影方面，通过构图和配色引导视线。',
    skills: ['UE5 (Lumen/Nanite)', '材质混合与着色器', '灯光氛围渲染', '关卡路径与视线引导']
  },
  {
    id: 'str-2',
    title: '触觉级包装与材质工艺 / Tactile Packaging Art',
    iconName: 'Sparkles',
    desc: '拥有敏锐的材料学触觉，擅长纸浆、纸张、金属、玻璃等特种材料的触感探索，对印刷后道工艺（击凹凸、烫金、丝印、防伪）了如指掌。拒绝常规快消模板，致力于打造收藏级包装。',
    skills: ['纸张学与可持续材料', '印前打样与后道工艺精控', '极简禅意排版', '3D产品高精度打样渲染']
  },
  {
    id: 'str-3',
    title: '严谨的平面网格与品牌体系 / Swiss Grid Discipline',
    iconName: 'Layout',
    desc: '遵循严谨的国际主义（瑞士）平面设计网格，具有高度的视觉规范管理能力。无论是大型企业品牌手册，还是微型香氛包装，都能构建出坚实的字体层级与色彩逻辑。',
    skills: ['瑞士现代主义排版', '色彩心理学与品牌定位', '导视系统与矢量图标设计', '印刷工艺与规范输出']
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    period: '2024.03 - 至今',
    role: '资深视觉创意与空间美术设计',
    company: '上海“边界之线”创意设计工作室 / Borderline Studio',
    description: '跨界负责高端消费品品牌视觉研发、可持续包装落地，并为科技展厅、互动装置及轻度游戏提供空间场景地编（Level Art）设计。',
    achievements: [
      '主导并设计了3款知名环保酒类品牌的全新概念包装，获得Pentawards国际包装大奖提名；',
      '运用虚幻引擎（UE5）为虚拟珠宝概念展厅进行3D场景地编与材质工艺精细化渲染，在多端流畅展示；',
      '建立工作室平面设计网格规范，提升整体产出视觉一致性与团队沟通效率。'
    ]
  },
  {
    id: 'exp-2',
    period: '2023.06 - 2024.02',
    role: '游戏场景地编师 / 关卡美术助理',
    company: '天火游影互娱科技有限公司 / Phoenix Games',
    description: '参与一款中型写实3D动作RPG项目的研发，负责部分古迹关卡、林地关卡的地形拼接、植被散布、材质调制与灯光细化。',
    achievements: [
      '完成古建筑遗迹群模块化组装地编，减少了15%的冗余重合DrawCalls，提升玩家流畅体验；',
      '配合关卡设计师优化核心战斗场景视角，设计明暗路线标识以无形引导玩家方向；',
      '搭建了植被自动化生成及混合材质层（Layered Materials）资产库，将后期编辑效率提升了30%。'
    ]
  },
  {
    id: 'exp-3',
    period: '2019.09 - 2023.06',
    role: '包装与环境设计专业 (学士学位)',
    company: '中国著名美术学院 / China Academy of Fine Arts',
    description: '主修品牌策划、包装结构设计、纸品工艺，辅修三维环境艺术、关卡灯光。',
    achievements: [
      '连续三年获得一等奖学金，毕业设计荣获学院最高学术委员会大奖；',
      '任校级设计协会会长，组织策划并布展了2场全校规模的青年设计作品展。'
    ]
  }
];
