import { Archive, Bot, Brain, CheckCircle2, FileText, RefreshCw, Sparkles } from "lucide-react";
import { useState } from "react";
import { avatarMessages, profilingMessages, studioTasks } from "../data/mock";
import type { ChatMessage, StudioTab } from "../types";
import { AvatarBubble, Badge, ChatInput, ProgressBar } from "../components/ui";

const studioAvatarMessages: ChatMessage[] = [
  ...avatarMessages,
  {
    id: 101,
    author: "许宇轩",
    fromUser: true,
    content: "如果我要把 Wanstar 的用户端做得更像一个每天会用的产品，而不是展示页，你会先调整哪里？",
  },
  {
    id: 102,
    author: "Yuxuan.A",
    role: "Version 0.3 Preview",
    content:
      "我会先调整信息入口。用户不应该先看到品牌解释，而应该先看到三个可行动的工作区：继续构建自己的分身、向自己的分身验证一个判断、发起一个圆桌协同。这样 Wanstar 的价值不是被讲出来，而是在一次使用路径里被体验到。",
  },
  {
    id: 103,
    author: "许宇轩",
    fromUser: true,
    content: "那分身对话本身应该承担什么作用？只是测试像不像我吗？",
  },
  {
    id: 104,
    author: "Yuxuan.A",
    role: "Version 0.3 Preview",
    content:
      "不只是像不像。它应该承担三个作用：第一，帮助你检查系统是否理解你的判断方式；第二，把高置信表达沉淀成训练素材；第三，在你准备进入圆桌之前，先让自己的分身帮你把问题整理成更适合协同讨论的版本。",
  },
  {
    id: 105,
    author: "许宇轩",
    fromUser: true,
    content: "如果我担心这个产品看起来像普通 AI 聊天工具，你会怎么避免？",
  },
  {
    id: 106,
    author: "Yuxuan.A",
    role: "Version 0.3 Preview",
    content:
      "我会避免把重点放在“问答能力”上，而是突出“人的认知结构可以被持续校准，并参与协作”。在界面上，单聊之后要自然出现两个动作：把这段话加入训练素材，或者把这个问题带入圆桌，让其他人的数字化身参与讨论。",
  },
  {
    id: 107,
    author: "许宇轩",
    fromUser: true,
    content: "你觉得现在最需要补充我的哪类样本？",
  },
  {
    id: 108,
    author: "Yuxuan.A",
    role: "Version 0.3 Preview",
    content:
      "目前结构判断和商业闭环样本比较多，但冲突处理、情绪反应、日常偏好还不够。换句话说，我已经能模仿你如何判断一个项目是否成立，但还需要更多样本来理解你在压力、分歧和不确定关系里的真实反应。",
  },
];

function ProfilingTaskList() {
  return (
    <section className="flex min-h-0 w-[320px] flex-col gap-4">
      <div className="glass-card rounded-[24px] p-5">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-50 text-blue-600">
            <Brain size={22} />
          </div>
          <div>
            <h2 className="font-black text-slate-950">我的数字分身构建进度</h2>
            <p className="mt-1 text-xs text-slate-500">用于模型训练与分身构建的素材已准备 72%</p>
          </div>
        </div>
        <div className="mt-5 space-y-4 text-sm">
          {[
            ["认知覆盖度", "72%"],
            ["表达相似度", "64%"],
            ["决策稳定性", "58%"],
            ["训练素材", "1264 samples"],
            ["当前阶段", "可进行第一版 Avatar 训练"],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-3">
              <span className="text-slate-500">{label}</span>
              <span className="text-right font-bold text-slate-900">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-3 overflow-auto pr-1">
        {studioTasks.map((task) => (
          <article key={task.name} className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-sm font-black text-slate-950">{task.name}</h3>
                <p className="mt-1 text-xs text-slate-500">已产生 {task.samples} 条样本</p>
              </div>
              <Badge tone={task.status === "可训练" ? "green" : task.status === "需要补充" ? "amber" : "blue"}>{task.status}</Badge>
            </div>
            <div className="mt-4">
              <div className="mb-2 flex justify-between text-xs font-semibold text-slate-500">
                <span>完成度</span>
                <span>{task.progress}%</span>
              </div>
              <ProgressBar value={task.progress} />
            </div>
            <button className="mt-4 w-full rounded-full bg-slate-950 px-3 py-2 text-xs font-bold text-white transition hover:bg-slate-800 active:scale-[0.98]" type="button">
              继续侧写
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function MessageCard({
  message,
  avatarMode,
  onFeedback,
}: {
  message: ChatMessage;
  avatarMode?: boolean;
  onFeedback?: (feedback: string) => void;
}) {
  return (
    <div className={`flex gap-3 ${message.fromUser ? "justify-end" : "justify-start"}`}>
      {!message.fromUser && <AvatarBubble name={message.author} active={message.author === "Yuxuan.A"} />}
      <div className={`max-w-[78%] rounded-[22px] p-4 text-sm leading-7 shadow-sm ${message.fromUser ? "brand-gradient text-white" : "border border-slate-200 bg-white text-slate-700"}`}>
        <div className={`mb-1 flex items-center gap-2 text-xs font-bold ${message.fromUser ? "text-white/85" : "text-slate-500"}`}>
          <span>{message.author}</span>
          {message.role && <span>{message.role}</span>}
        </div>
        <p>{message.content}</p>
        {avatarMode && !message.fromUser && message.author === "Yuxuan.A" && (
          <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-3">
            {["很像我", "有点像", "不像我", "这句话可以作为训练样本", "修正这段思考方式"].map((item) => (
              <button key={item} onClick={() => onFeedback?.(item)} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 active:scale-[0.98]" type="button">
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StudioChatPanel({ onCalibration }: { onCalibration: (text: string) => void }) {
  const [tab, setTab] = useState<StudioTab>("profiling");
  const [profiling, setProfiling] = useState<ChatMessage[]>(profilingMessages);
  const [avatarChat, setAvatarChat] = useState<ChatMessage[]>(studioAvatarMessages);

  const tabs: { key: StudioTab; label: string }[] = [
    { key: "profiling", label: "侧写对话" },
    { key: "avatar", label: "和我的数字分身对话" },
    { key: "calibration", label: "校准记录" },
  ];

  const sendProfiling = (content: string) => {
    const base = Date.now();
    setProfiling((items) => [
      ...items,
      { id: base, author: "许宇轩", fromUser: true, content },
      {
        id: base + 1,
        author: "Wanstar 侧写访谈",
        content: "我会把这段回答标记为一条新的认知样本。这里出现了一个稳定线索：你在表达判断时会先寻找可复用结构，再决定是否投入更多注意力。接下来我们换一个现实冲突场景继续验证。",
      },
    ]);
  };

  const sendAvatar = (content: string) => {
    const base = Date.now();
    setAvatarChat((items) => [
      ...items,
      { id: base, author: "许宇轩", fromUser: true, content },
      {
        id: base + 1,
        author: "Yuxuan.A",
        role: "Version 0.3 Preview",
        content: "按你的方式，我会先把问题拆成核心假设、验证路径和协作成本三层。当前最值得先验证的是：用户是否愿意持续把高质量判断沉淀给自己的数字分身；只要这个动作成立，后面的圆桌协同和真人连接才会有连续价值。",
      },
    ]);
  };

  return (
    <section className="glass-card flex min-w-[520px] flex-1 flex-col rounded-[24px]">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <div className="flex gap-2">
          {tabs.map((item) => (
            <button key={item.key} onClick={() => setTab(item.key)} className={`rounded-full px-4 py-2 text-sm font-bold transition active:scale-[0.98] ${tab === item.key ? "brand-gradient text-white shadow-md shadow-blue-100" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`} type="button">
              {item.label}
            </button>
          ))}
        </div>
        <Badge tone="violet">Yuxuan.A · Building 72%</Badge>
      </div>

      {tab === "avatar" && (
        <div className="mx-5 mt-5 rounded-[22px] border border-blue-100 bg-blue-50/70 p-4">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <strong>我的数字分身：Yuxuan.A</strong>
            <Badge tone="blue">Version 0.3 Preview</Badge>
            <Badge tone="green">相似度 68%</Badge>
            <span className="text-slate-500">记忆同步：已同步 1264 条侧写样本</span>
          </div>
        </div>
      )}

      <div className="min-h-0 flex-1 space-y-5 overflow-auto p-5">
        {tab === "profiling" && profiling.map((message) => <MessageCard key={message.id} message={message} />)}
        {tab === "avatar" && avatarChat.map((message) => <MessageCard key={message.id} message={message} avatarMode onFeedback={onCalibration} />)}
        {tab === "calibration" && (
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-3">
              {[
                ["很像我", "24 条"],
                ["有点像", "11 条"],
                ["不像我", "6 条"],
                ["已加入训练素材", "37 条"],
                ["待修正表达", "8 条"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[20px] bg-white p-4 shadow-sm">
                  <div className="text-lg font-black text-slate-950">{value}</div>
                  <div className="mt-1 text-xs text-slate-500">{label}</div>
                </div>
              ))}
            </div>
            {["Yuxuan.A 对教育/医养判断的分层方式与本人高度一致", "融资叙事表达过于直接，需要补充用户路径", "关于协作伙伴判断可作为高置信样本", "表达风格接近，但需要减少绝对化语气"].map((item, index) => (
              <div key={item} className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <strong className="text-sm text-slate-950">{item}</strong>
                  <Badge tone={index === 1 ? "amber" : "green"}>{index === 1 ? "待修正" : "已记录"}</Badge>
                </div>
                <p className="mt-2 text-xs text-slate-500">来自最近一次分身对话反馈</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {tab !== "calibration" && (
        <div className="p-5 pt-0">
          <ChatInput
            placeholder={tab === "profiling" ? "输入你的想法，Wanstar 会继续追问你的思维方式..." : "向 Yuxuan.A 提出一个真实判断问题..."}
            onSend={tab === "profiling" ? sendProfiling : sendAvatar}
            actions={[
              { label: "附件" },
              { label: "语音" },
              { label: tab === "profiling" ? "继续追问" : "很像我", onClick: () => onCalibration("已记录一条高置信校准反馈。"), primary: tab === "avatar" },
              { label: "换个角度问" },
              { label: "生成阶段总结" },
              { label: "标记为重要样本" },
            ]}
          />
        </div>
      )}
    </section>
  );
}

function CognitiveProfilePanel({ calibrationStatus }: { calibrationStatus: string }) {
  return (
    <aside className="flex min-h-0 w-[340px] flex-col gap-4 overflow-auto">
      <div className="glass-card rounded-[24px] p-5">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-violet-50 text-violet-600">
            <Sparkles size={21} />
          </div>
          <div>
            <h2 className="font-black text-slate-950">我的认知画像卡</h2>
            <p className="mt-1 text-xs text-slate-500">基于侧写对话持续更新</p>
          </div>
        </div>
        <div className="mt-5 space-y-4">
          {[
            ["思考入口", "结构优先 / 机制优先 / 长链条推演"],
            ["表达方式", "长段论述 + 概念框架 + 商业落地结合"],
            ["决策偏好", "先判断底层命题是否成立，再判断投入产出"],
            ["协作偏好", "需要结构型技术伙伴 + 产品落地伙伴"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-slate-50 p-4">
              <div className="text-xs font-bold text-slate-500">{label}</div>
              <div className="mt-1 text-sm font-semibold leading-6 text-slate-900">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {calibrationStatus && (
        <div className="rounded-[22px] border border-emerald-100 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
          <CheckCircle2 className="mr-2 inline" size={17} />
          {calibrationStatus}
        </div>
      )}

      <div className="glass-card rounded-[24px] p-5">
        <h3 className="font-black text-slate-950">高置信样本</h3>
        <div className="mt-4 space-y-3">
          {["先看底层结构是否可复用", "技术叙事必须最终转成商业闭环", "不满足于普通 Agent，要表达数字化身差异"].map((item) => (
            <div key={item} className="rounded-2xl bg-white p-3 text-sm font-semibold text-slate-700 shadow-sm">
              “{item}”
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-[24px] p-5">
        <h3 className="font-black text-slate-950">训练素材状态</h3>
        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          {[
            ["38", "对话轮次"],
            ["1264", "有效样本"],
            ["312", "高置信样本"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-2xl bg-slate-50 p-3">
              <div className="font-black text-slate-950">{value}</div>
              <div className="mt-1 text-xs text-slate-500">{label}</div>
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-2xl bg-amber-50 p-3 text-xs leading-5 text-amber-800">需要补充：情绪反应、冲突处理、日常偏好</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {[
            [FileText, "生成阶段报告"],
            [Bot, "进入分身训练"],
            [Archive, "导出训练素材"],
            [RefreshCw, "查看校准历史"],
          ].map(([Icon, label]) => {
            const TheIcon = Icon as typeof FileText;
            return (
              <button key={label as string} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-3 py-3 text-xs font-bold text-slate-700 transition hover:bg-slate-200 active:scale-[0.98]" type="button">
                <TheIcon size={15} />
                {label as string}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

export function StudioPage() {
  const [calibrationStatus, setCalibrationStatus] = useState("");
  const handleCalibration = (feedback: string) => {
    setCalibrationStatus(feedback.includes("高置信") ? feedback : `已记录「${feedback}」校准反馈。`);
  };

  return (
    <main className="flex min-h-0 flex-1 gap-5 p-5">
      <ProfilingTaskList />
      <StudioChatPanel onCalibration={handleCalibration} />
      <CognitiveProfilePanel calibrationStatus={calibrationStatus} />
    </main>
  );
}
