import type { AvatarProfile, ChatMessage, ProfilingTask, RoundtableProject } from "../types";

export const user = {
  name: "许宇轩",
  role: "Founder / Cognitive Architect",
  avatarStatus: "Building 72%",
  avatarName: "Yuxuan.A",
};

export const studioTasks: ProfilingTask[] = [
  { name: "基础人格侧写", progress: 86, samples: 340, status: "可训练" },
  { name: "思考方式侧写", progress: 78, samples: 286, status: "进行中" },
  { name: "表达风格侧写", progress: 64, samples: 192, status: "进行中" },
  { name: "决策偏好侧写", progress: 58, samples: 168, status: "需要补充" },
  { name: "专业经验侧写", progress: 72, samples: 214, status: "可训练" },
  { name: "协作风格侧写", progress: 49, samples: 64, status: "需要补充" },
  { name: "价值观与边界侧写", progress: 42, samples: 58, status: "需要补充" },
];

export const avatars: AvatarProfile[] = [
  {
    name: "Yuxuan.A",
    role: "你的自我分身",
    owner: "许宇轩",
    background: "Wanstar 创始人 / 认知架构设计者",
    tags: ["结构建模", "底层规律", "长链条推演"],
    category: "自我分身",
    connection: "本人",
    invited: 18,
    responseTime: "即时",
  },
  {
    name: "Mira.VC",
    role: "投资人视角",
    owner: "Mira Zhang",
    background: "早期科技投资人",
    tags: ["融资叙事", "市场规模", "增长路径"],
    category: "投资人",
    connection: "可请求连接",
    invited: 126,
    responseTime: "2 min",
  },
  {
    name: "Kai.Product",
    role: "产品负责人视角",
    owner: "Kai Wang",
    background: "AI 产品增长负责人",
    tags: ["MVP", "用户路径", "留存"],
    category: "产品",
    connection: "可请求连接",
    invited: 98,
    responseTime: "1 min",
  },
  {
    name: "Dr.Lin.Care",
    role: "医养行业专家",
    owner: "Lin Chen",
    background: "医养机构数字化顾问",
    tags: ["医养落地", "机构采购", "信任机制"],
    category: "医疗",
    connection: "可请求连接",
    invited: 77,
    responseTime: "4 min",
  },
  {
    name: "Sora.Brand",
    role: "品牌叙事顾问",
    owner: "Sora Li",
    background: "科技品牌策略顾问",
    tags: ["概念包装", "传播语言", "用户感知"],
    category: "品牌",
    connection: "可请求连接",
    invited: 64,
    responseTime: "3 min",
  },
  {
    name: "Noah.Legal",
    role: "法律与合规顾问",
    owner: "Noah Smith",
    background: "数据合规与平台协议律师",
    tags: ["协议设计", "数据合规", "风险边界"],
    category: "法律",
    connection: "可请求连接",
    invited: 52,
    responseTime: "5 min",
  },
  {
    name: "Hana.Global",
    role: "海外市场顾问",
    owner: "Hana Kim",
    background: "新加坡与日韩市场顾问",
    tags: ["新加坡市场", "日韩渠道", "本地化"],
    category: "海外市场",
    connection: "可请求连接",
    invited: 71,
    responseTime: "3 min",
  },
];

export const roundtableProjects: RoundtableProject[] = [
  {
    title: "万思达融资策略会",
    status: "讨论中",
    avatars: 5,
    unread: 8,
    question: "如何把 Wanstar 从技术叙事转成投资人能理解的商业叙事？",
  },
  {
    title: "医养场景产品讨论",
    status: "已总结",
    avatars: 4,
    unread: 2,
    question: "如何用数字化身协同提升医养场景中的跨角色沟通效率？",
  },
  {
    title: "教育场景商业闭环",
    status: "等待真人回复",
    avatars: 6,
    unread: 5,
    question: "如何用 Wanstar 建立教育场景中的学习陪伴与提分闭环？",
  },
  {
    title: "新加坡市场进入策略",
    status: "讨论中",
    avatars: 3,
    unread: 1,
    question: "Wanstar 如果从新加坡启动海外市场，第一批种子用户应该是谁？",
  },
  {
    title: "技术路线风险评估",
    status: "已总结",
    avatars: 4,
    unread: 0,
    question: "Wanstar 当前技术路线最大的产品化风险是什么？",
  },
  {
    title: "用户增长方案讨论",
    status: "讨论中",
    avatars: 5,
    unread: 3,
    question: "如何让第一批用户愿意持续训练自己的数字分身？",
  },
];

export const profilingMessages: ChatMessage[] = [
  {
    id: 1,
    author: "Wanstar 侧写访谈",
    content: "我们先从你面对复杂问题时的第一反应开始。当你看到一个新项目，你通常会先关注市场机会、技术结构、人的组织关系，还是底层规律？",
  },
  {
    id: 2,
    author: "许宇轩",
    fromUser: true,
    content: "我一般会先看它背后是不是存在一个可复用的结构，如果只是单点需求，我兴趣不大。",
  },
  {
    id: 3,
    author: "Wanstar 侧写访谈",
    content: "我捕捉到一个特征：你倾向于从现象背后的生成结构切入，而不是从表层功能切入。接下来我会继续确认这个模式是否稳定。",
  },
];

export const avatarMessages: ChatMessage[] = [
  {
    id: 1,
    author: "许宇轩",
    fromUser: true,
    content: "如果我现在要判断 Wanstar 先做教育场景还是医养场景，你会怎么想？",
  },
  {
    id: 2,
    author: "Yuxuan.A",
    role: "Version 0.3 Preview",
    content: "我不会先直接选行业，而会先看哪个场景能更快验证 Wanstar 的核心假设。教育场景更容易形成可量化闭环，医养场景更能体现多角色协同和信任价值。我的倾向是先用教育验证可控认知建模，再用医养放大协同价值。",
  },
];

export const roundtableMessages: ChatMessage[] = [
  {
    id: 1,
    author: "Mira.VC",
    role: "投资人视角",
    type: "机会判断",
    content: "投资人不会先买单“硅基生命”这个概念，他们会先判断它是否能形成可复制的商业闭环。你需要把 Wanstar 表达成：通过数字化身降低高价值人脉和专业判断的连接成本。",
  },
  {
    id: 2,
    author: "Kai.Product",
    role: "产品负责人视角",
    type: "补充论证",
    content: "我建议 Demo 第一屏不要讲技术，而是让用户直接创建一个问题圆桌。用户输入问题后，系统自动推荐 3-5 个互补数字化身，这样价值感最直接。",
  },
  {
    id: 3,
    author: "Yuxuan.A",
    role: "你的自我分身",
    type: "反对意见",
    content: "我同意产品入口要前置协同价值，但不能丢掉 Wanstar 的核心差异。普通 Agent 是任务执行，Wanstar 的数字化身是人的认知结构代理。这个区别要藏在体验里，而不是写在大标题里。",
  },
  {
    id: 4,
    author: "Dr.Lin.Care",
    role: "医养行业专家",
    type: "风险提醒",
    content: "医养场景适合展示多角色协同：老人、家属、护理员、医生、机构管理者都可以有对应代理。这里不是单 AI 问答，而是跨专业共识形成。",
  },
  {
    id: 5,
    author: "系统主持人",
    role: "圆桌主持",
    type: "总结",
    content: "已形成阶段性结论：Wanstar 用户端首屏应从“提出问题 → 自动组建数字化身圆桌 → 形成行动建议 → 连接真人”开始，而不是从技术训练流程开始。",
  },
];
