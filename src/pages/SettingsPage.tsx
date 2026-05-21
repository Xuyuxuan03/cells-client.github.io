import { Bell, Bot, CheckCircle2, LockKeyhole, MessageSquareText, Save, ShieldCheck, SlidersHorizontal, UserRoundCog, UsersRound } from "lucide-react";
import { useState } from "react";
import { Badge, ProgressBar } from "../components/ui";
import { user } from "../data/mock";

function Toggle({ checked, onChange }: { checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 rounded-full transition active:scale-[0.98] ${checked ? "bg-blue-600" : "bg-slate-300"}`}
      type="button"
      aria-pressed={checked}
    >
      <span className={`absolute top-1 grid h-5 w-5 place-items-center rounded-full bg-white shadow transition ${checked ? "left-6" : "left-1"}`} />
    </button>
  );
}

export function SettingsPage() {
  const [allowConnection, setAllowConnection] = useState(true);
  const [allowRoundtableInvite, setAllowRoundtableInvite] = useState(true);
  const [syncSamples, setSyncSamples] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);
  const [connectionReview, setConnectionReview] = useState(true);
  const [voiceInput, setVoiceInput] = useState(false);
  const [defaultMode, setDefaultMode] = useState("先邀请互补分身");
  const [notice, setNotice] = useState("");

  const save = () => setNotice("设置已保存，本地 Demo 状态已更新。");

  return (
    <main className="min-h-0 flex-1 overflow-auto p-5">
      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="glass-card rounded-[24px] p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="brand-gradient grid h-12 w-12 place-items-center rounded-2xl text-white">
                <UserRoundCog size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-950">设置</h2>
                <p className="mt-1 text-sm text-slate-500">管理你的数字分身、圆桌协同和真人连接权限。</p>
              </div>
            </div>
            <button onClick={save} className="brand-gradient inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white transition hover:brightness-105 active:scale-[0.98]" type="button">
              <Save size={17} />
              保存设置
            </button>
          </div>

          {notice && <div className="mt-5 rounded-[22px] border border-emerald-100 bg-emerald-50 p-4 text-sm font-bold text-emerald-800">{notice}</div>}

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-black text-slate-950">我的分身</h3>
                  <p className="mt-1 text-xs text-slate-500">{user.avatarName} · {user.avatarStatus}</p>
                </div>
              </div>
              <div className="mt-5 space-y-4">
                <div>
                  <div className="mb-2 flex justify-between text-xs font-bold text-slate-500">
                    <span>构建进度</span>
                    <span>72%</span>
                  </div>
                  <ProgressBar value={72} />
                </div>
                <label className="block">
                  <span className="text-xs font-bold text-slate-500">默认分身名称</span>
                  <input defaultValue={user.avatarName} className="mt-2 w-full rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:bg-white focus:shadow-inner" />
                </label>
                <label className="block">
                  <span className="text-xs font-bold text-slate-500">一句话介绍</span>
                  <textarea defaultValue="偏结构建模、长链条推演和商业闭环判断的数字分身。" className="mt-2 min-h-24 w-full resize-none rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition focus:bg-white focus:shadow-inner" />
                </label>
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-violet-50 text-violet-600">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 className="font-black text-slate-950">权限与边界</h3>
                  <p className="mt-1 text-xs text-slate-500">控制别人如何看见你和你的分身</p>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {[
                  ["允许别人请求连接本人", allowConnection, setAllowConnection],
                  ["允许我的分身被邀请进圆桌", allowRoundtableInvite, setAllowRoundtableInvite],
                  ["分身对话反馈自动进入训练素材", syncSamples, setSyncSamples],
                  ["真人连接前必须由我确认", connectionReview, setConnectionReview],
                ].map(([label, value, setter]) => (
                  <div key={label as string} className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 p-4">
                    <span className="text-sm font-semibold text-slate-700">{label as string}</span>
                    <Toggle checked={value as boolean} onChange={setter as (value: boolean) => void} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <aside className="space-y-5">
          <div className="glass-card rounded-[24px] p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                <UsersRound size={20} />
              </div>
              <div>
                <h3 className="font-black text-slate-950">圆桌偏好</h3>
                <p className="mt-1 text-xs text-slate-500">控制系统如何组建协同</p>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {["先邀请互补分身", "先邀请熟悉分身", "先邀请可连接真人"].map((item) => (
                <button key={item} onClick={() => setDefaultMode(item)} className={`flex w-full items-center justify-between rounded-2xl p-4 text-left text-sm font-bold transition active:scale-[0.99] ${defaultMode === item ? "bg-blue-50 text-blue-800 ring-1 ring-blue-100" : "bg-slate-50 text-slate-700 hover:bg-slate-100"}`} type="button">
                  {item}
                  {defaultMode === item && <CheckCircle2 size={17} />}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-[24px] p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-amber-50 text-amber-600">
                <Bell size={20} />
              </div>
              <div>
                <h3 className="font-black text-slate-950">通知</h3>
                <p className="mt-1 text-xs text-slate-500">只保留用户需要行动的提醒</p>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {[
                ["每周分身构建报告", weeklyReport, setWeeklyReport],
                ["语音输入入口", voiceInput, setVoiceInput],
              ].map(([label, value, setter]) => (
                <div key={label as string} className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 p-4">
                  <span className="text-sm font-semibold text-slate-700">{label as string}</span>
                  <Toggle checked={value as boolean} onChange={setter as (value: boolean) => void} />
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-[24px] p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-100 text-slate-700">
                <LockKeyhole size={20} />
              </div>
              <div>
                <h3 className="font-black text-slate-950">可见范围</h3>
                <p className="mt-1 text-xs text-slate-500">当前工作区隐私状态</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Badge tone="green">侧写对话仅自己可见</Badge>
              <Badge tone="blue">圆桌观点可被引用</Badge>
              <Badge tone="violet">连接请求需确认</Badge>
              <Badge tone="slate">素材导出需手动触发</Badge>
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        {[
          [SlidersHorizontal, "协同默认行为", "Roundtable 默认推荐 3-5 个互补数字化身，并优先展示可连接真人的来源。"],
          [MessageSquareText, "对话保存规则", "侧写对话、分身对话和圆桌协同分别保存，只有用户确认的内容会进入训练素材。"],
          [ShieldCheck, "真人连接保护", "请求连接前会展示来源、理由和草稿，避免把私人侧写内容暴露给对方。"],
        ].map(([Icon, title, desc]) => {
          const TheIcon = Icon as typeof SlidersHorizontal;
          return (
            <div key={title as string} className="glass-card rounded-[24px] p-5">
              <TheIcon className="text-blue-600" size={22} />
              <h3 className="mt-4 font-black text-slate-950">{title as string}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{desc as string}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
