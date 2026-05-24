import { Bot, BrainCircuit, CircleDot, Database, Handshake, MessageSquareText, Network, Settings, Sparkles, UsersRound } from "lucide-react";
import type { PageKey } from "../types";
import { user } from "../data/mock";

const navItems: { key: PageKey; label: string; subtitle: string; icon: typeof BrainCircuit }[] = [
  { key: "studio", label: "Studio", subtitle: "我的分身", icon: BrainCircuit },
  { key: "chat", label: "Avatar Chat", subtitle: "分身对话", icon: MessageSquareText },
  { key: "roundtable", label: "Roundtable", subtitle: "圆桌协同", icon: UsersRound },
  { key: "network", label: "Avatar Network", subtitle: "分身网络", icon: Network },
  { key: "connections", label: "Connections", subtitle: "真人连接", icon: Handshake },
  { key: "dataset", label: "Dataset", subtitle: "训练素材", icon: Database },
  { key: "settings", label: "Settings", subtitle: "设置", icon: Settings },
];

export function AppShell({
  activePage,
  onPageChange,
  onBuildAvatar,
  onStartRoundtable,
  children,
}: {
  activePage: PageKey;
  onPageChange: (page: PageKey) => void;
  onBuildAvatar: () => void;
  onStartRoundtable: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#f4f7fb] text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-20 flex w-60 flex-col bg-[#121827] px-4 py-5 text-white">
        <div className="flex items-center gap-3 px-2">
          <div className="brand-gradient grid h-11 w-11 place-items-center rounded-2xl shadow-lg shadow-blue-950/30">
            <Sparkles size={22} />
          </div>
          <div>
            <div className="text-lg font-black tracking-wide">Wanstar</div>
            <div className="text-xs text-slate-400">万思达工作台</div>
          </div>
        </div>

        <nav className="mt-7 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activePage === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onPageChange(item.key)}
                className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition active:scale-[0.99] ${
                  active ? "bg-white text-slate-950 shadow-lg shadow-black/20" : "text-slate-300 hover:bg-white/8 hover:text-white"
                }`}
                type="button"
              >
                <Icon size={19} />
                <span>
                  <span className="block text-sm font-bold">{item.label}</span>
                  <span className={`block text-xs ${active ? "text-slate-500" : "text-slate-500"}`}>{item.subtitle}</span>
                </span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto rounded-[22px] border border-white/10 bg-white/6 p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-sm font-black text-slate-950">许</div>
            <div className="min-w-0">
              <div className="truncate text-sm font-bold">{user.name}</div>
              <div className="truncate text-xs text-slate-400">{user.role}</div>
            </div>
          </div>
          <div className="mt-4 space-y-2 text-xs text-slate-300">
            <div className="flex items-center justify-between">
              <span>分身状态</span>
              <span className="font-semibold text-blue-200">{user.avatarStatus}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>当前分身</span>
              <span className="font-semibold text-white">{user.avatarName}</span>
            </div>
          </div>
        </div>
      </aside>

      <div className="ml-60 flex h-screen min-w-0 flex-1 flex-col overflow-hidden">
        <header className="z-10 flex h-20 shrink-0 items-center justify-between border-b border-slate-200/80 bg-[#f4f7fb]/85 px-7 backdrop-blur">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <CircleDot size={13} className="text-emerald-500" />
              Workspace online
            </div>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-950">Wanstar 用户端 Demo</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onBuildAvatar} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 shadow-sm transition hover:border-blue-200 hover:text-blue-700 active:scale-[0.98]" type="button">
              <Bot size={17} />
              构建我的分身
            </button>
            <button onClick={onStartRoundtable} className="brand-gradient inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:brightness-105 active:scale-[0.98]" type="button">
              <UsersRound size={17} />
              发起圆桌协同
            </button>
          </div>
        </header>
        <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
