import { Send, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

export function Badge({ children, tone = "slate" }: { children: ReactNode; tone?: "blue" | "violet" | "green" | "amber" | "rose" | "slate" }) {
  const tones = {
    blue: "bg-blue-50 text-blue-700 ring-blue-100",
    violet: "bg-violet-50 text-violet-700 ring-violet-100",
    green: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    amber: "bg-amber-50 text-amber-700 ring-amber-100",
    rose: "bg-rose-50 text-rose-700 ring-rose-100",
    slate: "bg-slate-100 text-slate-700 ring-slate-200",
  };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${tones[tone]}`}>{children}</span>;
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 rounded-full bg-slate-100">
      <div className="brand-gradient h-2 rounded-full transition-all duration-500" style={{ width: `${value}%` }} />
    </div>
  );
}

export function AvatarBubble({ name, active = false }: { name: string; active?: boolean }) {
  const initials = name
    .split(/[.\s]/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
  return (
    <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl text-sm font-bold text-white shadow-sm ${active ? "brand-gradient" : "bg-slate-700"}`}>
      {initials}
    </div>
  );
}

export function ChatInput({
  placeholder,
  onSend,
  actions = [],
}: {
  placeholder: string;
  onSend: (value: string) => void;
  actions?: { label: string; onClick?: () => void; primary?: boolean }[];
}) {
  const [value, setValue] = useState("");
  const submit = () => {
    if (!value.trim()) return;
    onSend(value.trim());
    setValue("");
  };

  return (
    <div className="rounded-[22px] border border-slate-200 bg-white p-3 shadow-sm">
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            submit();
          }
        }}
        placeholder={placeholder}
        className="min-h-20 w-full resize-none rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-6 outline-none ring-0 transition focus:bg-white focus:shadow-inner"
      />
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={action.onClick}
              className={`rounded-full px-3 py-2 text-xs font-semibold transition active:scale-[0.98] ${
                action.primary ? "brand-gradient text-white shadow-md shadow-blue-200 hover:brightness-105" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
              type="button"
            >
              {action.label}
            </button>
          ))}
        </div>
        <button onClick={submit} className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-[0.98]" type="button">
          <Send size={16} />
          发送
        </button>
      </div>
    </div>
  );
}

export function EmptyModule({ title }: { title: string }) {
  return (
    <main className="grid min-h-screen flex-1 place-items-center bg-slate-50 p-8">
      <div className="glass-card max-w-md rounded-[24px] p-8 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
          <Sparkles size={22} />
        </div>
        <h2 className="mt-5 text-xl font-bold text-slate-950">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">该模块已在主导航中预留，Demo 重点展示 Studio、圆桌协同和分身网络的完整用户路径。</p>
      </div>
    </main>
  );
}
