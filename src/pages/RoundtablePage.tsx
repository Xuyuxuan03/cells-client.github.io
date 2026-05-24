import { FilePlus2, Search, UsersRound } from "lucide-react";
import { useMemo, useState } from "react";
import { roundtableMessages, roundtableProjects } from "../data/mock";
import type { AvatarProfile, ChatMessage, RoundtableProject } from "../types";
import { AvatarBubble, Badge, ChatInput } from "../components/ui";

function statusTone(status: string) {
  if (status === "讨论中") return "blue";
  if (status === "已总结") return "green";
  if (status === "等待真人回复") return "amber";
  return "violet";
}

function RoundtableList({
  projects,
  active,
  onSelect,
}: {
  projects: RoundtableProject[];
  active: number;
  onSelect: (index: number) => void;
}) {
  return (
    <aside className="flex min-h-0 w-[330px] flex-col gap-4">
      <div className="glass-card rounded-[24px] p-4">
        <button className="brand-gradient flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black text-white shadow-lg shadow-blue-100 transition hover:brightness-105 active:scale-[0.98]" type="button">
          <FilePlus2 size={18} />
          新建圆桌
        </button>
        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-slate-100 px-3 py-2.5 text-sm text-slate-500">
          <Search size={16} />
          <input className="w-full bg-transparent outline-none" placeholder="搜索数字化身 / 项目 / 话题" />
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-3 overflow-auto pr-1">
        {projects.map((project, index) => (
          <button
            key={project.title}
            onClick={() => onSelect(index)}
            className={`w-full rounded-[22px] border p-4 text-left shadow-sm transition hover:-translate-y-0.5 active:scale-[0.99] ${
              active === index ? "border-blue-200 bg-white shadow-md" : "border-slate-200 bg-white/80 hover:bg-white"
            }`}
            type="button"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-sm font-black leading-5 text-slate-950">{project.title}</h3>
              {project.unread > 0 && <span className="grid h-6 min-w-6 place-items-center rounded-full bg-blue-600 px-2 text-xs font-black text-white">{project.unread}</span>}
            </div>
            <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">{project.question}</p>
            <div className="mt-4 flex items-center justify-between">
              <Badge tone={statusTone(project.status)}>{project.status}</Badge>
              <span className="text-xs font-semibold text-slate-500">{project.avatars} 个分身 · 刚刚更新</span>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}

function RoundtableParticipants({ participants }: { participants: AvatarProfile[] }) {
  return (
    <div className="grid grid-cols-5 gap-3">
      {participants.map((avatar) => (
        <div key={avatar.name} className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <AvatarBubble name={avatar.name} active={avatar.name === "Yuxuan.A"} />
            <div className="min-w-0">
              <div className="truncate text-sm font-black text-slate-950">{avatar.name}</div>
              <div className="truncate text-xs text-slate-500">{avatar.role}</div>
            </div>
          </div>
          <p className="mt-3 truncate text-xs text-slate-500">背后真实人：{avatar.owner}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {avatar.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function RoundtableMessageList({
  messages,
  onConnect,
}: {
  messages: ChatMessage[];
  onConnect: (name: string) => void;
}) {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <article key={message.id} className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex gap-3">
            <AvatarBubble name={message.author} active={message.author === "Yuxuan.A"} />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <strong className="text-sm text-slate-950">{message.author}</strong>
                {message.role && <span className="text-xs font-semibold text-slate-500">{message.role}</span>}
                {message.type && <Badge tone={message.type === "反对意见" ? "rose" : message.type === "总结" ? "green" : "blue"}>{message.type}</Badge>}
              </div>
              <p className="mt-2 text-sm leading-7 text-slate-700">{message.content}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["追问他", "邀请展开", "采纳为结论"].map((action) => (
                  <button key={action} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-200 active:scale-[0.98]" type="button">
                    {action}
                  </button>
                ))}
                <button onClick={() => onConnect(message.author)} className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 transition hover:bg-blue-100 active:scale-[0.98]" type="button">
                  请求连接本人
                </button>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function RoundtableOutcomePanel({
  summarized,
  connectionStatus,
  onConnect,
}: {
  summarized: boolean;
  connectionStatus: string;
  onConnect: (name: string) => void;
}) {
  const consensus = summarized
    ? ["圆桌入口应优先服务真实问题，而不是品牌叙事。", "用户需要先看到分身互相补充、反驳和总结的过程。", "请求连接本人应在高价值观点后自然出现。"]
    : ["Demo 应从用户真实使用路径开始，而不是技术展示。", "圆桌协同是 Wanstar 的核心差异化入口。", "C-to-A-to-A-to-C 应通过“请求连接本人”自然出现。"];

  const actions = summarized
    ? ["保留 Studio 作为分身构建中心", "将 Roundtable 设为核心协同场景", "在观点卡片中强化连接本人动作", "把会议总结转成可执行下一步"]
    : ["重做首页为 App Dashboard", "Studio 做成侧写 + 分身对话", "Roundtable 做成多数字化身实时协同", "增加“连接本人”按钮", "弱化技术后台表达"];

  return (
    <aside className="flex min-h-0 w-[350px] flex-col gap-4 overflow-auto">
      <div className="glass-card rounded-[24px] p-5">
        <h3 className="font-black text-slate-950">圆桌共识</h3>
        <div className="mt-4 space-y-3">
          {consensus.map((item) => (
            <div key={item} className="rounded-2xl bg-blue-50 p-3 text-sm font-semibold leading-6 text-blue-900">
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-[24px] p-5">
        <h3 className="font-black text-slate-950">仍需讨论的分歧</h3>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
          {["是否先突出 Studio，还是先突出 Roundtable？", "投资人更关注技术壁垒，还是用户增长路径？", "数字化身背后的真人连接是否应做强提醒？"].map((item) => (
            <li key={item} className="rounded-2xl bg-slate-50 p-3">{item}</li>
          ))}
        </ul>
      </div>

      <div className="glass-card rounded-[24px] p-5">
        <h3 className="font-black text-slate-950">行动清单</h3>
        <div className="mt-4 space-y-2">
          {actions.map((item) => (
            <label key={item} className="flex items-center gap-3 rounded-2xl bg-white p-3 text-sm font-semibold text-slate-700 shadow-sm">
              <input type="checkbox" className="h-4 w-4 accent-blue-600" defaultChecked={summarized} />
              {item}
            </label>
          ))}
        </div>
      </div>

      {connectionStatus && <div className="rounded-[22px] border border-emerald-100 bg-emerald-50 p-4 text-sm font-bold text-emerald-800">{connectionStatus}</div>}

      <div className="glass-card rounded-[24px] p-5">
        <h3 className="font-black text-slate-950">可连接的真人</h3>
        <div className="mt-4 space-y-3">
          {[
            ["Mira Zhang", "早期投资人", "她的 Avatar 多次提出融资叙事建议", "请求引荐"],
            ["Lin Chen", "医养机构顾问", "她的 Avatar 对医养落地路径有高相关性", "请求 15 分钟交流"],
            ["Kai Wang", "产品增长负责人", "他的 Avatar 参与了 MVP 路径设计", "发送合作邀请"],
          ].map(([name, role, reason, cta]) => (
            <div key={name} className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm">
              <div className="font-black text-slate-950">{name}｜{role}</div>
              <p className="mt-2 text-xs leading-5 text-slate-500">连接理由：{reason}</p>
              <button onClick={() => onConnect(name)} className="mt-3 w-full rounded-full bg-slate-950 px-3 py-2 text-xs font-bold text-white transition hover:bg-slate-800 active:scale-[0.98]" type="button">
                {cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

export function RoundtablePage({ participants }: { participants: AvatarProfile[] }) {
  const [activeProject, setActiveProject] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>(roundtableMessages);
  const [summarized, setSummarized] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("");
  const project = roundtableProjects[activeProject];

  const currentParticipants = useMemo(() => participants.slice(0, Math.max(5, participants.length)), [participants]);

  const sendRoundtable = (content: string) => {
    const base = Date.now();
    setMessages((items) => [
      ...items,
      { id: base, author: "许宇轩", fromUser: true, type: "追问", content },
      { id: base + 1, author: "Mira.VC", role: "投资人视角", type: "风险提醒", content: "我会先提醒一点：这类表达必须让投资人看到付费主体和复购理由，否则再强的概念也会被归类为展示型产品。" },
      { id: base + 2, author: "Kai.Product", role: "产品负责人视角", type: "补充论证", content: "从体验上看，可以让用户先输入一个真实问题，再看到系统如何挑选互补分身。选择过程本身就是 Wanstar 的信任建立。" },
      { id: base + 3, author: "Sora.Brand", role: "品牌叙事顾问", type: "总结", content: "我建议把一句话压成：让值得信任的认知能力先参与讨论，再决定是否连接背后的人。" },
    ]);
  };

  const handleProjectSelect = (index: number) => {
    setActiveProject(index);
    setMessages(roundtableMessages.map((message) => ({ ...message, id: message.id + index * 100 })));
  };

  const requestConnect = (name: string) => {
    setConnectionStatus(`已生成 ${name} 的连接请求草稿，等待对方确认。`);
  };

  return (
    <main className="flex min-h-0 flex-1 gap-5 p-5">
      <RoundtableList projects={roundtableProjects} active={activeProject} onSelect={handleProjectSelect} />
      <section className="glass-card flex min-w-[660px] flex-1 flex-col overflow-hidden rounded-[24px]">
        <div className="border-b border-slate-200 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-700">
                <UsersRound size={15} />
                圆桌标题
              </div>
              <h2 className="mt-1 text-2xl font-black text-slate-950">{project.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">当前问题：{project.question}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge tone="blue">发起人：许宇轩</Badge>
              <Badge tone="green">参与分身：{currentParticipants.length} 个</Badge>
              <Badge tone="violet">会议状态：实时讨论中</Badge>
            </div>
          </div>
          <div className="mt-5">
            <RoundtableParticipants participants={currentParticipants} />
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-auto p-5">
          <RoundtableMessageList messages={messages} onConnect={requestConnect} />
        </div>

        <div className="p-5 pt-0">
          <ChatInput
            placeholder="向圆桌提出问题，或 @某个数字化身 追问..."
            onSend={sendRoundtable}
            actions={[
              { label: "@选择数字化身" },
              { label: "添加文件" },
              { label: "添加语音" },
              { label: "一键让所有分身给建议", primary: true, onClick: () => sendRoundtable("请所有分身从各自视角给出下一步建议。") },
              { label: "只让反对者发言" },
              { label: "生成会议总结", onClick: () => setSummarized(true) },
              { label: "发起真人连接请求", onClick: () => requestConnect("当前圆桌") },
            ]}
          />
        </div>
      </section>
      <RoundtableOutcomePanel summarized={summarized} connectionStatus={connectionStatus} onConnect={requestConnect} />
    </main>
  );
}
