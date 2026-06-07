import type { AvatarProfile, ChatMessage, ProfilingTask, RoundtableProject } from "./types";

export const mobileUser = {
  name: "许宇轩",
  title: "Founder",
  avatarName: "Yuxuan.A",
  buildProgress: 72,
  image: "avatar-yuxuan.jpg",
};

export const mobileTasks: ProfilingTask[] = [
  { name: "基本信息", progress: 86, samples: 340, status: "可使用" },
  { name: "思考习惯", progress: 78, samples: 286, status: "进行中" },
  { name: "说话风格", progress: 64, samples: 192, status: "进行中" },
  { name: "决策偏好", progress: 58, samples: 168, status: "待补充" },
  { name: "工作经验", progress: 72, samples: 214, status: "可使用" },
];

export const mobileAvatars: AvatarProfile[] = [
  {
    name: "Yuxuan.A",
    role: "我的分身",
    owner: "许宇轩",
    background: "更懂你判断方式的工作分身",
    tags: ["结构判断", "商业落地", "长期规划"],
    category: "我的",
    connection: "本人",
    invited: 18,
    responseTime: "即时",
  },
  {
    name: "Mira.VC",
    role: "投资人",
    owner: "Mira Zhang",
    background: "早期科技投资人",
    tags: ["融资", "市场", "增长"],
    category: "投资",
    connection: "可联系",
    invited: 126,
    responseTime: "2 min",
  },
  {
    name: "Kai.Product",
    role: "产品负责人",
    owner: "Kai Wang",
    background: "AI 产品增长负责人",
    tags: ["MVP", "留存", "用户路径"],
    category: "产品",
    connection: "可联系",
    invited: 98,
    responseTime: "1 min",
  },
  {
    name: "Dr.Lin.Care",
    role: "医养顾问",
    owner: "Lin Chen",
    background: "医养机构数字化顾问",
    tags: ["医养", "采购", "信任"],
    category: "医疗",
    connection: "可联系",
    invited: 77,
    responseTime: "4 min",
  },
  {
    name: "Sora.Brand",
    role: "品牌顾问",
    owner: "Sora Li",
    background: "科技品牌策略顾问",
    tags: ["叙事", "传播", "感知"],
    category: "品牌",
    connection: "可联系",
    invited: 64,
    responseTime: "3 min",
  },
];

export const avatarImages: Record<string, string> = {
  "Yuxuan.A": "avatar-yuxuan.jpg",
  "Mira.VC": "avatar-mira.jpg",
  "Kai.Product": "avatar-kai.jpg",
  "Dr.Lin.Care": "avatar-lin.jpg",
  "Sora.Brand": "avatar-sora.jpg",
};

export const mobileThreads: Record<string, ChatMessage[]> = {
  "Yuxuan.A": [
    { id: 1, author: "许宇轩", fromUser: true, content: "我现在应该先做教育，还是先做医养？" },
    {
      id: 2,
      author: "Yuxuan.A",
      role: "我的分身",
      content: "我不会先选行业。我会先看哪个场景能更快验证产品价值。教育更容易跑通数据，医养更能体现信任和多人协作。",
    },
    { id: 3, author: "许宇轩", fromUser: true, content: "那如果只做一个 Demo，重点应该是什么？" },
    {
      id: 4,
      author: "Yuxuan.A",
      role: "我的分身",
      content: "重点不是介绍技术，而是让用户直接提出问题，然后看到多个分身一起讨论，最后能联系到背后的人。",
    },
    { id: 5, author: "许宇轩", fromUser: true, content: "我担心它看起来像普通聊天工具。" },
    {
      id: 6,
      author: "Yuxuan.A",
      role: "我的分身",
      content: "那就少讲能力，多展示结果。聊天只是入口，真正的价值是：把判断留下来、把人连接起来。",
    },
  ],
  "Mira.VC": [
    { id: 1, author: "许宇轩", fromUser: true, content: "从投资人角度，你会怎么看 Wanstar？" },
    { id: 2, author: "Mira.VC", role: "投资人", content: "我会先看它能不能降低高价值人脉和专业判断的连接成本。这个点比概念本身更容易被理解。" },
  ],
  "Kai.Product": [
    { id: 1, author: "许宇轩", fromUser: true, content: "产品第一屏怎么做更好？" },
    { id: 2, author: "Kai.Product", role: "产品负责人", content: "第一屏直接让用户提问题。系统推荐分身，生成讨论结果，再给出下一步。" },
  ],
  "Dr.Lin.Care": [
    { id: 1, author: "许宇轩", fromUser: true, content: "医养场景适合做样板吗？" },
    { id: 2, author: "Dr.Lin.Care", role: "医养顾问", content: "适合。医养里老人、家属、护理员、医生都需要协同，圆桌价值比较直观。" },
  ],
  "Sora.Brand": [
    { id: 1, author: "许宇轩", fromUser: true, content: "Wanstar 应该怎么讲得更简单？" },
    { id: 2, author: "Sora.Brand", role: "品牌顾问", content: "一句话：让你的分身先帮你找到值得聊的人。" },
  ],
};

export const mobileRoundtables: RoundtableProject[] = [
  {
    title: "融资策略",
    status: "讨论中",
    avatars: 5,
    unread: 8,
    question: "如何把 Wanstar 讲成投资人听得懂的商业故事？",
  },
  {
    title: "医养产品",
    status: "已总结",
    avatars: 4,
    unread: 2,
    question: "如何用分身提高医养场景里的沟通效率？",
  },
  {
    title: "教育闭环",
    status: "待回复",
    avatars: 6,
    unread: 5,
    question: "如何让学生愿意持续使用自己的学习分身？",
  },
];

export const mobileRoundtableMessages: ChatMessage[] = [
  {
    id: 1,
    author: "Mira.VC",
    role: "投资人",
    type: "机会",
    content: "投资人会先看它是不是一个可复制的生意。建议把重点放在连接成本和付费场景上。",
  },
  {
    id: 2,
    author: "Kai.Product",
    role: "产品负责人",
    type: "建议",
    content: "第一步应该让用户输入真实问题，系统自动组一个圆桌。体验比介绍更重要。",
  },
  {
    id: 3,
    author: "Yuxuan.A",
    role: "我的分身",
    type: "补充",
    content: "普通聊天工具只回答问题。Wanstar 要让用户看到：分身会讨论，也能帮你找到背后的人。",
  },
];
