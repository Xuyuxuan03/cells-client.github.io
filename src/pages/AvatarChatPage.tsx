import { Archive, Bot, CheckCircle2, Clock3, FileText, MessageSquareText, Mic, Paperclip, Search, Sparkles, UserPlus, UsersRound } from "lucide-react";
import { useMemo, useState } from "react";
import { AvatarBubble, Badge, ChatInput, ProgressBar } from "../components/ui";
import { avatars } from "../data/mock";
import type { AvatarProfile, ChatMessage } from "../types";

type ChatThread = {
  avatar: AvatarProfile;
  unread: number;
  status: string;
  similarity?: number;
  messages: ChatMessage[];
  memoryRefs: string[];
};

const initialThreads: ChatThread[] = avatars.slice(0, 6).map((avatar, index) => ({
  avatar,
  unread: index === 0 ? 0 : index + 1,
  status: index === 0 ? "自我分身预览" : "可单独对话",
  similarity: avatar.name === "Yuxuan.A" ? 68 : undefined,
  memoryRefs:
    avatar.name === "Yuxuan.A"
      ? ["先看底层结构是否可复用", "技术叙事必须最终转成商业闭环", "先验证核心假设，再扩大场景"]
      : [`来自 ${avatar.name} 的圆桌观点`, `${avatar.owner} 的公开专业背景`, `${avatar.tags[0]} 相关协作记录`],
  messages:
    avatar.name === "Yuxuan.A"
      ? [
          { id: 1, author: "许宇轩", fromUser: true, content: "如果我今天要判断 Wanstar 的优先级，你会怎么拆？" },
          {
            id: 2,
            author: "Yuxuan.A",
            role: "Version 0.3 Preview",
            content: "我会先拆成三件事：第一，是否继续提高自我分身的相似度；第二，Roundtable 是否已经足够展示协同价值；第三，真人连接是否自然出现。按你的判断习惯，最优先的不是加功能，而是让用户在一次真实问题里走完整个闭环。",
          },
        ]
      : [
          { id: 1, author: "许宇轩", fromUser: true, content: `我想单独听听你对 Wanstar 当前 Demo 的判断，先从 ${avatar.tags[0]} 角度说。` },
          {
            id: 2,
            author: avatar.name,
            role: avatar.role,
            content: `从${avatar.role}看，我会先关注用户是否能在三分钟内理解“为什么要和多个数字化身协同”。如果只停留在聊天，价值会变弱；如果能自然进入请求连接本人，Wanstar 的差异就会立起来。`,
          },
        ],
}));

function threadReply(thread: ChatThread, content: string): ChatMessage {
  if (thread.avatar.name === "Yuxuan.A") {
    return {
      id: Date.now() + 1,
      author: "Yuxuan.A",
      role: "Version 0.3 Preview",
      content: `我会把你的问题先放进“结构是否成立”的框架里。你刚才提到「${content.slice(0, 28)}」，这里最需要确认的是：它是否能产生持续样本、是否能推动圆桌协同、是否能带来值得连接的人。`,
    };
  }

  return {
    id: Date.now() + 1,
    author: thread.avatar.name,
    role: thread.avatar.role,
    content: `我会从${thread.avatar.tags[0]}角度补充：这件事不要只看单次回复质量，要看它是否能进入协作记录，并最终帮助你判断是否需要连接 ${thread.avatar.owner} 本人。`,
  };
}

function toneForStatus(status: string) {
  if (status.includes("预览")) return "violet";
  if (status.includes("圆桌")) return "blue";
  return "green";
}

export function AvatarChatPage({ onInviteToRoundtable }: { onInviteToRoundtable: (avatar: AvatarProfile) => void }) {
  const [threads, setThreads] = useState(initialThreads);
  const [activeName, setActiveName] = useState("Yuxuan.A");
  const [notice, setNotice] = useState("");
  const [calibration, setCalibration] = useState("最近一次校准：Yuxuan.A 对优先级判断有 68% 相似度。");
  const active = useMemo(() => threads.find((thread) => thread.avatar.name === activeName) ?? threads[0], [threads, activeName]);

  const sendMessage = (content: string) => {
    setThreads((items) =>
      items.map((thread) => {
        if (thread.avatar.name !== active.avatar.name) return thread;
        return {
          ...thread,
          unread: 0,
          messages: [...thread.messages, { id: Date.now(), author: "许宇轩", fromUser: true, content }, threadReply(thread, content)],
        };
      }),
    );
  };

  const addFeedback = (label: string) => {
    setCalibration(`已记录「${label}」反馈，下一版分身校准会优先参考这段对话。`);
  };

  const inviteActive = () => {
    onInviteToRoundtable(active.avatar);
    setNotice(`已邀请 ${active.avatar.name} 加入当前圆桌。`);
  };

  return (
    <main className="flex min-h-0 flex-1 gap-5 p-5">
      <aside className="flex min-h-0 w-[340px] flex-col gap-4">
        <div className="glass-card rounded-[24px] p-5">
          <div className="flex items-center gap-3">
            <div className="brand-gradient grid h-11 w-11 place-items-center rounded-2xl text-white">
              <MessageSquareText size={22} />
            </div>
            <div>
              <h2 className="font-black text-slate-950">分身对话</h2>
              <p className="mt-1 text-xs text-slate-500">测试自我分身，也可单聊网络分身</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-2xl bg-slate-100 px-3 py-2.5 text-sm text-slate-500">
            <Search size={16} />
            <input className="w-full bg-transparent outline-none" placeholder="搜索分身、真实人、话题" />
          </div>
        </div>

        <div className="min-h-0 flex-1 space-y-3 overflow-auto pr-1">
          {threads.map((thread) => (
            <button
              key={thread.avatar.name}
              onClick={() => setActiveName(thread.avatar.name)}
              className={`w-full rounded-[22px] border p-4 text-left shadow-sm transition hover:-translate-y-0.5 active:scale-[0.99] ${
                active.avatar.name === thread.avatar.name ? "border-blue-200 bg-white shadow-md" : "border-slate-200 bg-white/80 hover:bg-white"
              }`}
              type="button"
            >
              <div className="flex items-center gap-3">
                <AvatarBubble name={thread.avatar.name} active={thread.avatar.name === "Yuxuan.A"} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="truncate text-sm font-black text-slate-950">{thread.avatar.name}</div>
                    {thread.unread > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-blue-600 px-1.5 text-[11px] font-black text-white">{thread.unread}</span>}
                  </div>
                  <div className="mt-1 truncate text-xs text-slate-500">{thread.avatar.role} · {thread.avatar.owner}</div>
                </div>
              </div>
              <p className="mt-3 line-clamp-2 text-xs leading-5 text-slate-500">{thread.messages.at(-1)?.content}</p>
              <div className="mt-3 flex items-center justify-between">
                <Badge tone={toneForStatus(thread.status)}>{thread.status}</Badge>
                <span className="text-xs font-semibold text-slate-400">{thread.avatar.responseTime}</span>
              </div>
            </button>
          ))}
        </div>
      </aside>

      <section className="glass-card flex min-w-[650px] flex-1 flex-col overflow-hidden rounded-[24px]">
        <div className="border-b border-slate-200 p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <AvatarBubble name={active.avatar.name} active={active.avatar.name === "Yuxuan.A"} />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-black text-slate-950">{active.avatar.name}</h2>
                  <Badge tone={active.avatar.name === "Yuxuan.A" ? "violet" : "blue"}>{active.status}</Badge>
                </div>
                <p className="mt-1 text-sm text-slate-500">{active.avatar.role} · 背后真实人：{active.avatar.owner}</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              <button onClick={inviteActive} className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-700 transition hover:bg-blue-100 active:scale-[0.98]" type="button">
                <UsersRound size={16} />
                邀请进圆桌
              </button>
              <button onClick={() => setNotice(`已生成连接 ${active.avatar.owner} 的请求草稿。`)} className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800 active:scale-[0.98]" type="button">
                <UserPlus size={16} />
                请求连接本人
              </button>
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 space-y-5 overflow-auto p-5">
          {active.messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.fromUser ? "justify-end" : "justify-start"}`}>
              {!message.fromUser && <AvatarBubble name={message.author} active={message.author === "Yuxuan.A"} />}
              <div className={`max-w-[78%] rounded-[22px] p-4 text-sm leading-7 shadow-sm ${message.fromUser ? "brand-gradient text-white" : "border border-slate-200 bg-white text-slate-700"}`}>
                <div className={`mb-1 flex flex-wrap items-center gap-2 text-xs font-bold ${message.fromUser ? "text-white/85" : "text-slate-500"}`}>
                  <span>{message.author}</span>
                  {message.role && <span>{message.role}</span>}
                </div>
                <p>{message.content}</p>
                {!message.fromUser && active.avatar.name === "Yuxuan.A" && (
                  <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-3">
                    {["很像我", "有点像", "不像我", "加入训练素材", "修正表达方式"].map((label) => (
                      <button key={label} onClick={() => addFeedback(label)} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 active:scale-[0.98]" type="button">
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-5 pt-0">
          <ChatInput
            placeholder={active.avatar.name === "Yuxuan.A" ? "问 Yuxuan.A 一个真实判断问题，用来测试它是否像你..." : `向 ${active.avatar.name} 单独追问，或请求它进入圆桌...`}
            onSend={sendMessage}
            actions={[
              { label: "附件" },
              { label: "语音" },
              { label: "生成对话摘要", onClick: () => setNotice("已生成这段分身对话摘要，可加入协作记录。") },
              { label: "标记为训练素材", onClick: () => setNotice("已把最近一轮回复标记为训练素材。") },
              { label: "邀请进圆桌", onClick: inviteActive, primary: true },
            ]}
          />
        </div>
      </section>

      <aside className="flex min-h-0 w-[340px] flex-col gap-4 overflow-auto">
        {notice && <div className="rounded-[22px] border border-emerald-100 bg-emerald-50 p-4 text-sm font-bold text-emerald-800">{notice}</div>}

        <div className="glass-card rounded-[24px] p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-violet-50 text-violet-600">
              <Bot size={22} />
            </div>
            <div>
              <h3 className="font-black text-slate-950">分身状态</h3>
              <p className="mt-1 text-xs text-slate-500">{active.avatar.category} · {active.avatar.connection}</p>
            </div>
          </div>
          <div className="mt-5 space-y-4">
            {active.similarity ? (
              <div>
                <div className="mb-2 flex justify-between text-xs font-bold text-slate-500">
                  <span>表达相似度</span>
                  <span>{active.similarity}%</span>
                </div>
                <ProgressBar value={active.similarity} />
              </div>
            ) : (
              <div className="rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-blue-900">这是外部分身。你可以通过单独对话判断它是否适合加入圆桌，或请求连接背后的真实人。</div>
            )}
            <div className="grid grid-cols-2 gap-3 text-center">
              {[
                [active.avatar.invited, "被邀请"],
                [active.avatar.responseTime, "响应速度"],
              ].map(([value, label]) => (
                <div key={label as string} className="rounded-2xl bg-slate-50 p-3">
                  <div className="font-black text-slate-950">{value}</div>
                  <div className="mt-1 text-xs text-slate-500">{label as string}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-card rounded-[24px] p-5">
          <div className="flex items-center gap-2 font-black text-slate-950">
            <Sparkles size={19} className="text-blue-600" />
            记忆引用
          </div>
          <div className="mt-4 space-y-3">
            {active.memoryRefs.map((item) => (
              <div key={item} className="rounded-2xl bg-white p-3 text-sm font-semibold leading-6 text-slate-700 shadow-sm">
                “{item}”
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-[24px] p-5">
          <div className="flex items-center gap-2 font-black text-slate-950">
            <CheckCircle2 size={19} className="text-emerald-600" />
            校准与素材
          </div>
          <p className="mt-3 rounded-2xl bg-emerald-50 p-3 text-sm leading-6 text-emerald-800">{calibration}</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {[
              [FileText, "阶段总结"],
              [Archive, "加入素材"],
              [Paperclip, "附加资料"],
              [Mic, "语音追问"],
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

        <div className="glass-card rounded-[24px] p-5">
          <div className="flex items-center gap-2 font-black text-slate-950">
            <Clock3 size={19} className="text-violet-600" />
            最近协作
          </div>
          <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <div className="rounded-2xl bg-slate-50 p-3">从圆桌协同回到单聊，继续追问具体判断。</div>
            <div className="rounded-2xl bg-slate-50 p-3">单聊中采纳的观点可进入训练素材或协作记录。</div>
          </div>
        </div>
      </aside>
    </main>
  );
}
