import { CheckCircle2, Clock3, FileText, Handshake, Mail, MessageSquare, Send, ShieldCheck, UserRoundCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { AvatarBubble, Badge } from "../components/ui";

type ConnectionRequest = {
  id: number;
  person: string;
  title: string;
  avatar: string;
  status: "等待对方确认" | "草稿待发送" | "已建立连接" | "需要补充说明";
  source: string;
  reason: string;
  lastUpdate: string;
  intent: string;
};

const initialRequests: ConnectionRequest[] = [
  {
    id: 1,
    person: "Mira Zhang",
    title: "早期科技投资人",
    avatar: "Mira.VC",
    status: "等待对方确认",
    source: "万思达融资策略会",
    reason: "她的数字化身多次提出融资叙事与增长路径建议。",
    lastUpdate: "12 分钟前",
    intent: "希望约 20 分钟交流 Wanstar 的商业叙事与第一批付费用户判断。",
  },
  {
    id: 2,
    person: "Lin Chen",
    title: "医养机构数字化顾问",
    avatar: "Dr.Lin.Care",
    status: "草稿待发送",
    source: "医养场景产品讨论",
    reason: "她的数字化身对机构采购、信任机制和跨角色协作有高相关观点。",
    lastUpdate: "今天 15:40",
    intent: "希望请她判断医养场景是否适合作为 Roundtable 的展示样板。",
  },
  {
    id: 3,
    person: "Kai Wang",
    title: "AI 产品增长负责人",
    avatar: "Kai.Product",
    status: "已建立连接",
    source: "教育场景商业闭环",
    reason: "他的数字化身参与了 MVP 路径设计，并给出用户留存建议。",
    lastUpdate: "昨天",
    intent: "继续讨论第一版用户端 App 的激活路径和样本沉淀机制。",
  },
  {
    id: 4,
    person: "Noah Smith",
    title: "数据合规与平台协议律师",
    avatar: "Noah.Legal",
    status: "需要补充说明",
    source: "技术路线风险评估",
    reason: "他的数字化身提示过真人授权、分身边界和连接告知问题。",
    lastUpdate: "周一",
    intent: "希望确认用户授权、分身发言边界和真人连接流程的表达方式。",
  },
];

function toneForStatus(status: ConnectionRequest["status"]) {
  if (status === "已建立连接") return "green";
  if (status === "等待对方确认") return "blue";
  if (status === "需要补充说明") return "amber";
  return "violet";
}

export function ConnectionsPage() {
  const [requests, setRequests] = useState(initialRequests);
  const [activeId, setActiveId] = useState(initialRequests[0].id);
  const [draft, setDraft] = useState("你好，我是许宇轩。你的数字化身在 Wanstar 圆桌中给出了很有价值的判断，我想基于这次协同结果，约一个简短交流。");
  const [notice, setNotice] = useState("");
  const active = useMemo(() => requests.find((item) => item.id === activeId) ?? requests[0], [activeId, requests]);

  const updateStatus = (status: ConnectionRequest["status"], message: string) => {
    setRequests((items) => items.map((item) => (item.id === active.id ? { ...item, status, lastUpdate: "刚刚" } : item)));
    setNotice(message);
  };

  return (
    <main className="flex min-h-0 flex-1 gap-5 p-5">
      <aside className="flex min-h-0 w-[340px] flex-col gap-4">
        <div className="glass-card rounded-[24px] p-5">
          <div className="flex items-center gap-3">
            <div className="brand-gradient grid h-11 w-11 place-items-center rounded-2xl text-white">
              <Handshake size={22} />
            </div>
            <div>
              <h2 className="font-black text-slate-950">真人连接</h2>
              <p className="mt-1 text-xs text-slate-500">从数字化身协同，走向真实的人</p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3 text-center">
            {[
              ["4", "请求"],
              ["1", "已连接"],
              ["2", "待确认"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl bg-slate-50 p-3">
                <div className="text-lg font-black text-slate-950">{value}</div>
                <div className="mt-1 text-xs text-slate-500">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="min-h-0 flex-1 space-y-3 overflow-auto pr-1">
          {requests.map((request) => (
            <button
              key={request.id}
              onClick={() => setActiveId(request.id)}
              className={`w-full rounded-[22px] border p-4 text-left shadow-sm transition hover:-translate-y-0.5 active:scale-[0.99] ${activeId === request.id ? "border-blue-200 bg-white shadow-md" : "border-slate-200 bg-white/80 hover:bg-white"}`}
              type="button"
            >
              <div className="flex items-center gap-3">
                <AvatarBubble name={request.avatar} active={request.avatar === "Yuxuan.A"} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-black text-slate-950">{request.person}</div>
                  <div className="truncate text-xs text-slate-500">{request.title}</div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <Badge tone={toneForStatus(request.status)}>{request.status}</Badge>
                <span className="text-xs font-semibold text-slate-400">{request.lastUpdate}</span>
              </div>
            </button>
          ))}
        </div>
      </aside>

      <section className="glass-card flex min-w-[620px] flex-1 flex-col rounded-[24px]">
        <div className="border-b border-slate-200 p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <AvatarBubble name={active.avatar} />
              <div>
                <h2 className="text-2xl font-black text-slate-950">{active.person}</h2>
                <p className="mt-1 text-sm text-slate-500">{active.title} · 来自 {active.avatar}</p>
              </div>
            </div>
            <Badge tone={toneForStatus(active.status)}>{active.status}</Badge>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-auto p-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-[22px] bg-blue-50 p-4">
              <div className="flex items-center gap-2 text-sm font-black text-blue-900">
                <MessageSquare size={17} />
                圆桌来源
              </div>
              <p className="mt-2 text-sm leading-6 text-blue-900">{active.source}</p>
            </div>
            <div className="rounded-[22px] bg-violet-50 p-4">
              <div className="flex items-center gap-2 text-sm font-black text-violet-900">
                <UserRoundCheck size={17} />
                连接意图
              </div>
              <p className="mt-2 text-sm leading-6 text-violet-900">{active.intent}</p>
            </div>
          </div>

          <div className="mt-4 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-black text-slate-950">为什么值得连接</h3>
            <p className="mt-3 text-sm leading-7 text-slate-700">{active.reason}</p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {["观点被采纳 3 次", "与当前问题高相关", "允许请求本人"].map((item) => (
                <div key={item} className="rounded-2xl bg-slate-50 p-3 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="mr-2 inline text-emerald-500" size={16} />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-black text-slate-950">连接请求草稿</h3>
              <Badge tone="slate">可编辑</Badge>
            </div>
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              className="mt-4 min-h-36 w-full resize-none rounded-[18px] bg-slate-50 p-4 text-sm leading-7 text-slate-700 outline-none transition focus:bg-white focus:shadow-inner"
            />
            <div className="mt-4 flex flex-wrap gap-2">
              <button onClick={() => updateStatus("等待对方确认", `已发送给 ${active.person}，等待对方确认。`)} className="brand-gradient inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold text-white transition hover:brightness-105 active:scale-[0.98]" type="button">
                <Send size={16} />
                发送连接请求
              </button>
              <button onClick={() => updateStatus("草稿待发送", "已保存为草稿。")} className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-200 active:scale-[0.98]" type="button">
                <FileText size={16} />
                保存草稿
              </button>
              <button onClick={() => updateStatus("需要补充说明", "已标记为需要补充说明。")} className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2.5 text-sm font-bold text-amber-700 transition hover:bg-amber-100 active:scale-[0.98]" type="button">
                <Mail size={16} />
                补充说明
              </button>
            </div>
          </div>
        </div>
      </section>

      <aside className="flex min-h-0 w-[340px] flex-col gap-4 overflow-auto">
        {notice && <div className="rounded-[22px] border border-emerald-100 bg-emerald-50 p-4 text-sm font-bold text-emerald-800">{notice}</div>}
        <div className="glass-card rounded-[24px] p-5">
          <h3 className="font-black text-slate-950">连接流程</h3>
          <div className="mt-4 space-y-3">
            {[
              ["分身提出高价值观点", "圆桌中形成可追溯观点依据"],
              ["用户发起请求", "说明为什么需要连接本人"],
              ["对方确认", "真人决定是否接受交流"],
            ].map(([title, desc], index) => (
              <div key={title} className="flex gap-3 rounded-2xl bg-white p-3 shadow-sm">
                <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-slate-950 text-xs font-black text-white">{index + 1}</div>
                <div>
                  <div className="text-sm font-black text-slate-900">{title}</div>
                  <div className="mt-1 text-xs leading-5 text-slate-500">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card rounded-[24px] p-5">
          <div className="flex items-center gap-2 font-black text-slate-950">
            <ShieldCheck size={19} className="text-blue-600" />
            权限提示
          </div>
          <p className="mt-3 text-sm leading-7 text-slate-600">Wanstar 只会发送你确认过的连接请求。对方能看到圆桌来源、连接理由和你的请求文字，但不会看到你的私人侧写对话。</p>
        </div>
        <div className="glass-card rounded-[24px] p-5">
          <div className="flex items-center gap-2 font-black text-slate-950">
            <Clock3 size={19} className="text-violet-600" />
            最近协作记录
          </div>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="rounded-2xl bg-slate-50 p-3">Mira.VC 的观点被采纳为融资叙事结论。</div>
            <div className="rounded-2xl bg-slate-50 p-3">Kai.Product 参与生成 MVP 行动清单。</div>
            <div className="rounded-2xl bg-slate-50 p-3">Dr.Lin.Care 提供医养场景信任机制判断。</div>
          </div>
        </div>
      </aside>
    </main>
  );
}
