import {
  CheckCircle2,
  ChevronRight,
  Home,
  MessageCircle,
  Mic,
  Network,
  Paperclip,
  Plus,
  Search,
  Send,
  Settings,
  UserRound,
  UsersRound,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { ChatMessage } from "./types";
import {
  avatarImages,
  mobileAvatars,
  mobileRoundtableMessages,
  mobileRoundtables,
  mobileTasks,
  mobileThreads,
  mobileUser,
} from "./mobileData";

type MobileTab = "studio" | "chat" | "roundtable" | "network" | "me";

const tabItems: { key: MobileTab; label: string; icon: typeof Home }[] = [
  { key: "studio", label: "分身", icon: Home },
  { key: "chat", label: "对话", icon: MessageCircle },
  { key: "roundtable", label: "圆桌", icon: UsersRound },
  { key: "network", label: "网络", icon: Network },
  { key: "me", label: "我的", icon: UserRound },
];

function AvatarImage({ avatar, size = "h-12 w-12" }: { avatar: string; size?: string }) {
  return <img src={avatarImages[avatar] ?? "/avatar-yuxuan.svg"} alt={avatar} className={`${size} shrink-0 rounded-2xl object-cover shadow-sm`} />;
}

function Pill({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${active ? "bg-[#121827] text-white" : "bg-slate-100 text-slate-600"}`}>{children}</span>;
}

function Progress({ value }: { value: number }) {
  return (
    <div className="h-2 rounded-full bg-slate-100">
      <div className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" style={{ width: `${value}%` }} />
    </div>
  );
}

function PhoneShell({ activeTab, onTabChange, children }: { activeTab: MobileTab; onTabChange: (tab: MobileTab) => void; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#eef3f8] text-slate-950">
      <main className="mx-auto min-h-screen w-full max-w-[430px] bg-[#f7f9fc] pb-24 shadow-2xl shadow-slate-300/70">
        {children}
      </main>
      <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-[430px] border-t border-slate-200 bg-white/95 px-5 py-3 backdrop-blur">
        <div className="grid grid-cols-5 gap-1">
          {tabItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.key;
            return (
              <button key={item.key} onClick={() => onTabChange(item.key)} className={`flex flex-col items-center gap-1 rounded-2xl py-2 text-xs font-semibold transition ${active ? "bg-slate-950 text-white" : "text-slate-500 hover:bg-slate-100"}`} type="button">
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

function TopCard({ onStartChat, onStartRoundtable }: { onStartChat: () => void; onStartRoundtable: () => void }) {
  return (
    <section className="rounded-b-[32px] bg-[#121827] px-5 pb-6 pt-5 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-400">Wanstar</p>
          <h1 className="mt-1 text-2xl font-black">我的分身</h1>
        </div>
        <AvatarImage avatar="Yuxuan.A" size="h-12 w-12" />
      </div>
      <div className="mt-6 rounded-[24px] bg-white/8 p-4 ring-1 ring-white/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-300">Yuxuan.A</p>
            <p className="mt-1 text-lg font-bold">已完成 {mobileUser.buildProgress}%</p>
          </div>
          <Pill active>可继续完善</Pill>
        </div>
        <div className="mt-4 h-2 rounded-full bg-white/12">
          <div className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-violet-400" style={{ width: `${mobileUser.buildProgress}%` }} />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button onClick={onStartChat} className="rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-950 active:scale-[0.98]" type="button">
          开始对话
        </button>
        <button onClick={onStartRoundtable} className="rounded-2xl bg-violet-500 px-4 py-3 text-sm font-bold text-white active:scale-[0.98]" type="button">
          发起圆桌
        </button>
      </div>
    </section>
  );
}

function StudioPage({ onStartChat, onStartRoundtable }: { onStartChat: () => void; onStartRoundtable: () => void }) {
  const [mode, setMode] = useState<"tasks" | "profile">("tasks");
  return (
    <>
      <TopCard onStartChat={onStartChat} onStartRoundtable={onStartRoundtable} />
      <section className="px-5 py-5">
        <div className="grid grid-cols-3 gap-3">
          {[
            ["了解程度", "72%"],
            ["像我程度", "64%"],
            ["素材", "1264"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-3xl bg-white p-4 text-center shadow-sm">
              <p className="text-lg font-black">{value}</p>
              <p className="mt-1 text-xs text-slate-500">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex gap-2">
          <button onClick={() => setMode("tasks")} className={`rounded-full px-4 py-2 text-sm font-bold ${mode === "tasks" ? "bg-slate-950 text-white" : "bg-white text-slate-600"}`} type="button">
            完善分身
          </button>
          <button onClick={() => setMode("profile")} className={`rounded-full px-4 py-2 text-sm font-bold ${mode === "profile" ? "bg-slate-950 text-white" : "bg-white text-slate-600"}`} type="button">
            分身画像
          </button>
        </div>

        {mode === "tasks" ? (
          <div className="mt-4 space-y-3">
            {mobileTasks.map((task) => (
              <article key={task.name} className="rounded-[24px] bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-bold">{task.name}</h3>
                    <p className="mt-1 text-xs text-slate-500">{task.samples} 条内容</p>
                  </div>
                  <Pill>{task.status}</Pill>
                </div>
                <div className="mt-4">
                  <div className="mb-2 flex justify-between text-xs text-slate-500">
                    <span>进度</span>
                    <span>{task.progress}%</span>
                  </div>
                  <Progress value={task.progress} />
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {[
              ["做事方式", "先判断值不值得做，再看第一步怎么落地。"],
              ["说话方式", "喜欢把复杂问题讲成清楚的结构。"],
              ["合作偏好", "需要懂技术的人，也需要能把产品推起来的人。"],
            ].map(([title, text]) => (
              <div key={title} className="rounded-[24px] bg-white p-4 shadow-sm">
                <p className="font-bold">{title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function MessageBubble({ message, onFeedback }: { message: ChatMessage; onFeedback?: (value: string) => void }) {
  const mine = message.fromUser;
  return (
    <div className={`flex gap-2 ${mine ? "justify-end" : "justify-start"}`}>
      {!mine && <AvatarImage avatar={message.author} size="h-9 w-9" />}
      <div className={`max-w-[78%] rounded-[22px] px-4 py-3 text-sm leading-6 ${mine ? "bg-violet-600 text-white" : "bg-white text-slate-700 shadow-sm"}`}>
        {!mine && <p className="mb-1 text-xs font-bold text-slate-500">{message.author}</p>}
        <p>{message.content}</p>
        {!mine && message.author === "Yuxuan.A" && onFeedback && (
          <div className="mt-3 flex flex-wrap gap-2">
            {["很像我", "有点像", "不像我"].map((item) => (
              <button key={item} onClick={() => onFeedback(item)} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600" type="button">
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ChatInput({ placeholder, onSend }: { placeholder: string; onSend: (value: string) => void }) {
  const [value, setValue] = useState("");
  const submit = () => {
    if (!value.trim()) return;
    onSend(value.trim());
    setValue("");
  };
  return (
    <div className="flex items-center gap-2 border-t border-slate-100 bg-white p-3">
      <button className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-600" type="button">
        <Paperclip size={18} />
      </button>
      <input value={value} onChange={(event) => setValue(event.target.value)} onKeyDown={(event) => event.key === "Enter" && submit()} placeholder={placeholder} className="h-11 min-w-0 flex-1 rounded-full bg-slate-100 px-4 text-sm outline-none" />
      <button className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-600" type="button">
        <Mic size={18} />
      </button>
      <button onClick={submit} className="grid h-10 w-10 place-items-center rounded-full bg-slate-950 text-white" type="button">
        <Send size={18} />
      </button>
    </div>
  );
}

function ChatPage({ initialActive }: { initialActive: string }) {
  const [active, setActive] = useState(initialActive);
  const [threads, setThreads] = useState<Record<string, ChatMessage[]>>(mobileThreads);
  const [feedback, setFeedback] = useState("");
  const activeAvatar = mobileAvatars.find((item) => item.name === active) ?? mobileAvatars[0];

  const send = (content: string) => {
    const reply =
      active === "Yuxuan.A"
        ? "我会先看这件事是否值得做，再看谁能一起做，最后看第一步怎么落地。"
        : "我建议把这个问题放到圆桌里，让几个不同视角一起判断。";
    setThreads((items) => ({
      ...items,
      [active]: [
        ...(items[active] ?? []),
        { id: Date.now(), author: mobileUser.name, fromUser: true, content },
        { id: Date.now() + 1, author: active, role: activeAvatar.role, content: reply },
      ],
    }));
  };

  return (
    <section className="flex h-[calc(100vh-6rem)] flex-col bg-[#f7f9fc]">
      <div className="rounded-b-[30px] bg-[#121827] px-5 pb-5 pt-5 text-white">
        <div className="flex items-center gap-3">
          <AvatarImage avatar={active} size="h-14 w-14" />
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-xl font-black">{activeAvatar.name}</h1>
            <p className="mt-1 text-sm text-emerald-300">{activeAvatar.role} · 在线</p>
          </div>
          <button className="rounded-full bg-white/10 px-3 py-2 text-xs font-bold" type="button">
            联系本人
          </button>
        </div>
      </div>

      <div className="border-b border-slate-100 bg-white px-5 py-3">
        <div className="flex gap-3 overflow-x-auto pb-1">
          {mobileAvatars.map((avatar) => (
            <button key={avatar.name} onClick={() => setActive(avatar.name)} className="flex shrink-0 flex-col items-center gap-1" type="button">
              <AvatarImage avatar={avatar.name} size={`h-12 w-12 ${active === avatar.name ? "ring-2 ring-violet-500" : ""}`} />
              <span className="max-w-16 truncate text-xs font-semibold text-slate-600">{avatar.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-4">
        {(threads[active] ?? []).map((message) => (
          <MessageBubble key={message.id} message={message} onFeedback={(value) => setFeedback(`已记录：${value}`)} />
        ))}
      </div>
      {feedback && <div className="mx-5 mb-2 rounded-2xl bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">{feedback}</div>}
      <ChatInput placeholder="输入消息..." onSend={send} />
    </section>
  );
}

function RoundtablePage() {
  const [active, setActive] = useState(0);
  const [messages, setMessages] = useState(mobileRoundtableMessages);
  const [summary, setSummary] = useState(false);
  const project = mobileRoundtables[active];

  const send = (content: string) => {
    setMessages((items) => [
      ...items,
      { id: Date.now(), author: "许宇轩", fromUser: true, content },
      { id: Date.now() + 1, author: "Mira.VC", role: "投资人", type: "建议", content: "先把这个问题讲成用户能立刻理解的价值，再谈长期想象。" },
      { id: Date.now() + 2, author: "Kai.Product", role: "产品负责人", type: "建议", content: "可以先做一个很短的使用路径，让用户看到结果。" },
    ]);
  };

  return (
    <section className="px-5 py-5">
      <div className="rounded-[30px] bg-[#121827] p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">圆桌</p>
            <h1 className="mt-1 text-2xl font-black">{project.title}</h1>
          </div>
          <button className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10" type="button">
            <Plus size={20} />
          </button>
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-300">{project.question}</p>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {mobileRoundtables.map((item, index) => (
          <button key={item.title} onClick={() => setActive(index)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold ${active === index ? "bg-slate-950 text-white" : "bg-white text-slate-600"}`} type="button">
            {item.title}
          </button>
        ))}
      </div>

      <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
        {mobileAvatars.slice(0, 5).map((avatar) => (
          <div key={avatar.name} className="shrink-0 rounded-[22px] bg-white p-3 text-center shadow-sm">
            <AvatarImage avatar={avatar.name} size="mx-auto h-12 w-12" />
            <p className="mt-2 max-w-20 truncate text-xs font-bold">{avatar.role}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 h-[430px] space-y-3 overflow-y-auto rounded-[28px] bg-white p-4 shadow-sm">
        {messages.map((message) => (
          <article key={message.id} className="rounded-[22px] bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <AvatarImage avatar={message.author} size="h-8 w-8" />
              <p className="text-sm font-bold">{message.author}</p>
              {message.type && <Pill>{message.type}</Pill>}
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-700">{message.content}</p>
            <div className="mt-3 flex gap-2">
              <button className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-600" type="button">
                追问
              </button>
              <button className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-600" type="button">
                采纳
              </button>
              <button className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700" type="button">
                联系本人
              </button>
            </div>
          </article>
        ))}
      </div>

      {summary && (
        <div className="mt-4 rounded-[24px] bg-emerald-50 p-4 text-sm leading-6 text-emerald-800">
          共识：先让用户提出真实问题，再由多个分身给出判断，最后连接值得聊的人。
        </div>
      )}
      <div className="mt-4">
        <ChatInput placeholder="向圆桌提问..." onSend={send} />
        <button onClick={() => setSummary(true)} className="mt-3 w-full rounded-2xl bg-slate-950 py-3 text-sm font-bold text-white" type="button">
          生成总结
        </button>
      </div>
    </section>
  );
}

function NetworkPage({ onStartChat }: { onStartChat: (name: string) => void }) {
  const [category, setCategory] = useState("全部");
  const categories = ["全部", "投资", "产品", "医疗", "品牌"];
  const list = useMemo(() => mobileAvatars.filter((item) => category === "全部" || item.category === category), [category]);
  return (
    <section className="px-5 py-5">
      <div className="rounded-[30px] bg-[#121827] p-5 text-white">
        <h1 className="text-2xl font-black">分身网络</h1>
        <div className="mt-4 flex items-center gap-2 rounded-2xl bg-white/10 px-3 py-3 text-sm text-slate-300">
          <Search size={17} />
          搜索分身或行业
        </div>
      </div>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {categories.map((item) => (
          <button key={item} onClick={() => setCategory(item)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold ${category === item ? "bg-slate-950 text-white" : "bg-white text-slate-600"}`} type="button">
            {item}
          </button>
        ))}
      </div>
      <div className="mt-4 space-y-3">
        {list.map((avatar) => (
          <article key={avatar.name} className="rounded-[26px] bg-white p-4 shadow-sm">
            <div className="flex gap-3">
              <AvatarImage avatar={avatar.name} size="h-14 w-14" />
              <div className="min-w-0 flex-1">
                <h3 className="font-black">{avatar.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{avatar.role} · {avatar.owner}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{avatar.background}</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {avatar.tags.map((tag) => (
                <Pill key={tag}>{tag}</Pill>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button onClick={() => onStartChat(avatar.name)} className="rounded-2xl bg-slate-950 py-3 text-sm font-bold text-white" type="button">
                单独对话
              </button>
              <button className="rounded-2xl bg-blue-50 py-3 text-sm font-bold text-blue-700" type="button">
                加入圆桌
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function MePage() {
  const [connectionSent, setConnectionSent] = useState(false);
  return (
    <section className="px-5 py-5">
      <div className="rounded-[30px] bg-[#121827] p-5 text-white">
        <div className="flex items-center gap-3">
          <AvatarImage avatar="Yuxuan.A" size="h-16 w-16" />
          <div>
            <h1 className="text-2xl font-black">{mobileUser.name}</h1>
            <p className="mt-1 text-sm text-slate-300">{mobileUser.title} · {mobileUser.avatarName}</p>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {[
          ["联系请求", "3"],
          ["确认素材", "312"],
          ["待补充", "4"],
          ["分身进度", "72%"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[24px] bg-white p-4 shadow-sm">
            <p className="text-xl font-black">{value}</p>
            <p className="mt-1 text-sm text-slate-500">{label}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-3">
        {[
          [UserRound, "真人连接", "查看联系请求和草稿"],
          [CheckCircle2, "素材", "管理已确认内容"],
          [Settings, "设置", "分身权限和通知"],
        ].map(([Icon, title, desc]) => {
          const TheIcon = Icon as typeof UserRound;
          return (
            <button key={title as string} onClick={() => title === "真人连接" && setConnectionSent(true)} className="flex w-full items-center gap-3 rounded-[24px] bg-white p-4 text-left shadow-sm" type="button">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-100">
                <TheIcon size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold">{title as string}</p>
                <p className="mt-1 text-sm text-slate-500">{desc as string}</p>
              </div>
              <ChevronRight size={18} className="text-slate-400" />
            </button>
          );
        })}
      </div>
      {connectionSent && <div className="mt-4 rounded-[24px] bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">已生成联系请求草稿。</div>}
    </section>
  );
}

export default function MobileApp() {
  const [tab, setTab] = useState<MobileTab>("studio");
  const [chatTarget, setChatTarget] = useState("Yuxuan.A");

  const openChat = (target = "Yuxuan.A") => {
    setChatTarget(target);
    setTab("chat");
  };

  return (
    <PhoneShell activeTab={tab} onTabChange={setTab}>
      {tab === "studio" && <StudioPage onStartChat={() => openChat("Yuxuan.A")} onStartRoundtable={() => setTab("roundtable")} />}
      {tab === "chat" && <ChatPage key={chatTarget} initialActive={chatTarget} />}
      {tab === "roundtable" && <RoundtablePage />}
      {tab === "network" && <NetworkPage onStartChat={openChat} />}
      {tab === "me" && <MePage />}
    </PhoneShell>
  );
}
