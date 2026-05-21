import { Clock, Eye, MessageSquareText, UserCheck, UserPlus } from "lucide-react";
import { useMemo, useState } from "react";
import { avatars } from "../data/mock";
import type { AvatarProfile } from "../types";
import { AvatarBubble, Badge } from "../components/ui";

const categories = ["全部", "投资人", "产品", "技术", "法律", "医疗", "教育", "品牌", "海外市场", "用户增长"];

function AvatarCard({
  avatar,
  onInvite,
  invited,
  onConnect,
}: {
  avatar: AvatarProfile;
  onInvite: (avatar: AvatarProfile) => void;
  invited: boolean;
  onConnect: (name: string) => void;
}) {
  return (
    <article className="glass-card rounded-[24px] p-5 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <AvatarBubble name={avatar.name} active={avatar.name === "Yuxuan.A"} />
          <div>
            <h3 className="font-black text-slate-950">{avatar.name}</h3>
            <p className="mt-1 text-xs font-semibold text-slate-500">{avatar.role}</p>
          </div>
        </div>
        <Badge tone={avatar.connection === "本人" ? "green" : "blue"}>{avatar.connection}</Badge>
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <div className="text-xs font-bold text-slate-400">所属真实人</div>
          <div className="mt-1 text-sm font-bold text-slate-800">{avatar.owner}</div>
        </div>
        <div>
          <div className="text-xs font-bold text-slate-400">身份背景</div>
          <div className="mt-1 text-sm leading-6 text-slate-700">{avatar.background}</div>
        </div>
        <div>
          <div className="text-xs font-bold text-slate-400">擅长问题</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {avatar.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-blue-50 p-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700">
            <UserCheck size={14} />
            被邀请次数
          </div>
          <div className="mt-1 text-lg font-black text-blue-950">{avatar.invited}</div>
        </div>
        <div className="rounded-2xl bg-violet-50 p-3">
          <div className="flex items-center gap-2 text-xs font-bold text-violet-700">
            <Clock size={14} />
            平均响应
          </div>
          <div className="mt-1 text-lg font-black text-violet-950">{avatar.responseTime}</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <button
          onClick={() => onInvite(avatar)}
          className={`inline-flex items-center justify-center gap-2 rounded-2xl px-3 py-3 text-xs font-black transition active:scale-[0.98] ${invited ? "bg-emerald-50 text-emerald-700" : "brand-gradient text-white hover:brightness-105"}`}
          type="button"
        >
          <UserPlus size={15} />
          {invited ? "已在圆桌" : "邀请进圆桌"}
        </button>
        <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-3 py-3 text-xs font-bold text-slate-700 transition hover:bg-slate-200 active:scale-[0.98]" type="button">
          <MessageSquareText size={15} />
          单独对话
        </button>
        <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-3 py-3 text-xs font-bold text-slate-700 transition hover:bg-slate-200 active:scale-[0.98]" type="button">
          <Eye size={15} />
          查看背后本人
        </button>
        <button onClick={() => onConnect(avatar.owner)} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-50 px-3 py-3 text-xs font-bold text-blue-700 transition hover:bg-blue-100 active:scale-[0.98]" type="button">
          <UserCheck size={15} />
          请求连接
        </button>
      </div>
    </article>
  );
}

export function AvatarNetworkPage({
  participants,
  onInvite,
}: {
  participants: AvatarProfile[];
  onInvite: (avatar: AvatarProfile) => void;
}) {
  const [category, setCategory] = useState("全部");
  const [notice, setNotice] = useState("");
  const filtered = useMemo(() => avatars.filter((avatar) => category === "全部" || avatar.category === category), [category]);

  const handleInvite = (avatar: AvatarProfile) => {
    onInvite(avatar);
    setNotice(`已邀请 ${avatar.name} 加入当前圆桌。`);
  };

  return (
    <main className="min-h-0 flex-1 overflow-auto p-5">
      <div className="glass-card rounded-[24px] p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-950">Avatar Network / 分身网络</h2>
            <p className="mt-2 text-sm text-slate-500">发现互补数字化身，邀请进入圆桌，并在高价值协同后连接背后的真实人。</p>
          </div>
          {notice && <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">{notice}</div>}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button key={item} onClick={() => setCategory(item)} className={`rounded-full px-4 py-2 text-sm font-bold transition active:scale-[0.98] ${category === item ? "brand-gradient text-white shadow-md shadow-blue-100" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`} type="button">
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3 2xl:grid-cols-4">
        {filtered.map((avatar) => (
          <AvatarCard
            key={avatar.name}
            avatar={avatar}
            invited={participants.some((item) => item.name === avatar.name)}
            onInvite={handleInvite}
            onConnect={(name) => setNotice(`已生成 ${name} 的真人连接请求草稿。`)}
          />
        ))}
      </div>
    </main>
  );
}
