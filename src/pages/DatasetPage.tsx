import { Archive, CheckCircle2, Database, Filter, Flag, MessageSquareText, Plus, Search, Star, Tags } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge, ProgressBar } from "../components/ui";

type Sample = {
  id: number;
  title: string;
  source: string;
  category: string;
  confidence: "高置信" | "中置信" | "需要补充";
  rounds: number;
  quote: string;
  status: "已加入训练素材" | "待校准" | "需补充上下文";
};

const initialSamples: Sample[] = [
  {
    id: 1,
    title: "判断新项目时先看可复用结构",
    source: "侧写对话",
    category: "思考方式",
    confidence: "高置信",
    rounds: 4,
    quote: "我一般会先看它背后是不是存在一个可复用的结构，如果只是单点需求，我兴趣不大。",
    status: "已加入训练素材",
  },
  {
    id: 2,
    title: "技术叙事最终要转成商业闭环",
    source: "分身对话",
    category: "表达方式",
    confidence: "高置信",
    rounds: 3,
    quote: "技术叙事必须最终转成商业闭环，否则用户和投资人都很难判断它的实际价值。",
    status: "已加入训练素材",
  },
  {
    id: 3,
    title: "先验证核心假设，再扩大场景",
    source: "圆桌协同",
    category: "决策偏好",
    confidence: "中置信",
    rounds: 2,
    quote: "我不会先直接选行业，而会先看哪个场景能更快验证 Wanstar 的核心假设。",
    status: "待校准",
  },
  {
    id: 4,
    title: "协作上偏好结构型技术伙伴",
    source: "侧写对话",
    category: "协作风格",
    confidence: "需要补充",
    rounds: 1,
    quote: "我需要能一起搭结构的人，也需要有人把结构落成可用产品。",
    status: "需补充上下文",
  },
  {
    id: 5,
    title: "不满足于普通问答式智能体",
    source: "分身对话",
    category: "价值观与边界",
    confidence: "高置信",
    rounds: 5,
    quote: "不满足于普通 Agent，要表达数字化身差异。",
    status: "已加入训练素材",
  },
];

const categories = ["全部", "高置信", "待校准", "需要补充", "思考方式", "表达方式", "决策偏好", "协作风格"];

function toneForSample(sample: Sample) {
  if (sample.confidence === "高置信") return "green";
  if (sample.confidence === "中置信") return "blue";
  return "amber";
}

export function DatasetPage() {
  const [samples, setSamples] = useState(initialSamples);
  const [activeId, setActiveId] = useState(initialSamples[0].id);
  const [category, setCategory] = useState("全部");
  const [notice, setNotice] = useState("");
  const active = samples.find((item) => item.id === activeId) ?? samples[0];

  const filtered = useMemo(() => {
    return samples.filter((sample) => {
      if (category === "全部") return true;
      if (category === "高置信") return sample.confidence === "高置信";
      if (category === "待校准") return sample.status === "待校准";
      if (category === "需要补充") return sample.confidence === "需要补充";
      return sample.category === category;
    });
  }, [category, samples]);

  const markHighConfidence = () => {
    setSamples((items) =>
      items.map((item) =>
        item.id === active.id
          ? {
              ...item,
              confidence: "高置信",
              status: "已加入训练素材",
            }
          : item,
      ),
    );
    setNotice("已标记为高置信样本，并加入训练素材。");
  };

  const addSample = () => {
    const next: Sample = {
      id: Date.now(),
      title: "新增圆桌观点样本",
      source: "圆桌协同",
      category: "决策偏好",
      confidence: "中置信",
      rounds: 1,
      quote: "新增样本：用户更希望先看到真实问题被多个数字化身协同处理，再决定是否连接背后的人。",
      status: "待校准",
    };
    setSamples((items) => [next, ...items]);
    setActiveId(next.id);
    setNotice("已从最近圆桌协同中加入一条待校准样本。");
  };

  const highConfidenceCount = samples.filter((sample) => sample.confidence === "高置信").length;

  return (
    <main className="flex min-h-0 flex-1 gap-5 p-5">
      <aside className="flex min-h-0 w-[340px] flex-col gap-4">
        <div className="glass-card rounded-[24px] p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="brand-gradient grid h-11 w-11 place-items-center rounded-2xl text-white">
                <Database size={22} />
              </div>
              <div>
                <h2 className="font-black text-slate-950">训练素材</h2>
                <p className="mt-1 text-xs text-slate-500">侧写、分身对话与圆桌协同沉淀</p>
              </div>
            </div>
            <button onClick={addSample} className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-950 text-white transition hover:bg-slate-800 active:scale-[0.98]" type="button" aria-label="新增样本">
              <Plus size={18} />
            </button>
          </div>

          <div className="mt-5 space-y-4">
            <div>
              <div className="mb-2 flex justify-between text-xs font-bold text-slate-500">
                <span>素材准备度</span>
                <span>72%</span>
              </div>
              <ProgressBar value={72} />
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                [String(samples.length), "样本"],
                [String(highConfidenceCount), "高置信"],
                ["3", "需补充"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl bg-slate-50 p-3">
                  <div className="text-lg font-black text-slate-950">{value}</div>
                  <div className="mt-1 text-xs text-slate-500">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-card rounded-[24px] p-4">
          <div className="flex items-center gap-2 rounded-2xl bg-slate-100 px-3 py-2.5 text-sm text-slate-500">
            <Search size={16} />
            <input className="w-full bg-transparent outline-none" placeholder="搜索素材、标签、来源" />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map((item) => (
              <button key={item} onClick={() => setCategory(item)} className={`rounded-full px-3 py-1.5 text-xs font-bold transition active:scale-[0.98] ${category === item ? "brand-gradient text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`} type="button">
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-0 flex-1 space-y-3 overflow-auto pr-1">
          {filtered.map((sample) => (
            <button
              key={sample.id}
              onClick={() => setActiveId(sample.id)}
              className={`w-full rounded-[22px] border p-4 text-left shadow-sm transition hover:-translate-y-0.5 active:scale-[0.99] ${activeId === sample.id ? "border-blue-200 bg-white shadow-md" : "border-slate-200 bg-white/80 hover:bg-white"}`}
              type="button"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-black leading-5 text-slate-950">{sample.title}</h3>
                <Badge tone={toneForSample(sample)}>{sample.confidence}</Badge>
              </div>
              <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">{sample.quote}</p>
              <div className="mt-4 flex items-center justify-between text-xs font-semibold text-slate-400">
                <span>{sample.source}</span>
                <span>{sample.rounds} 轮验证</span>
              </div>
            </button>
          ))}
        </div>
      </aside>

      <section className="glass-card flex min-w-[650px] flex-1 flex-col rounded-[24px]">
        <div className="border-b border-slate-200 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-700">
                <MessageSquareText size={15} />
                {active.source}
              </div>
              <h2 className="mt-1 text-2xl font-black text-slate-950">{active.title}</h2>
              <p className="mt-2 text-sm text-slate-500">类别：{active.category} · {active.rounds} 轮验证</p>
            </div>
            <Badge tone={toneForSample(active)}>{active.confidence}</Badge>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-auto p-5">
          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-black text-slate-950">样本文本</h3>
            <p className="mt-4 rounded-[20px] bg-slate-50 p-5 text-base leading-8 text-slate-700">“{active.quote}”</p>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
            {[
              [Tags, "标签", active.category],
              [Flag, "状态", active.status],
              [Star, "置信度", active.confidence],
            ].map(([Icon, label, value]) => {
              const TheIcon = Icon as typeof Tags;
              return (
                <div key={label as string} className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <TheIcon size={15} />
                    {label as string}
                  </div>
                  <div className="mt-2 text-sm font-black text-slate-950">{value as string}</div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-black text-slate-950">用于校准的判断</h3>
            <div className="mt-4 space-y-3">
              {["是否稳定反映你的真实判断方式", "是否能帮助 Yuxuan.A 更像你", "是否适合加入下一版分身训练"].map((item, index) => (
                <label key={item} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-700">
                  <span>{item}</span>
                  <input type="checkbox" className="h-4 w-4 accent-blue-600" defaultChecked={index !== 1 || active.confidence === "高置信"} />
                </label>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button onClick={markHighConfidence} className="brand-gradient inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold text-white transition hover:brightness-105 active:scale-[0.98]" type="button">
                <CheckCircle2 size={16} />
                标记为高置信样本
              </button>
              <button onClick={() => setNotice("已加入待补充队列，后续侧写对话会继续追问。")} className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2.5 text-sm font-bold text-amber-700 transition hover:bg-amber-100 active:scale-[0.98]" type="button">
                <Filter size={16} />
                需要补充上下文
              </button>
              <button onClick={() => setNotice("已准备导出当前筛选范围内的训练素材。")} className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-200 active:scale-[0.98]" type="button">
                <Archive size={16} />
                导出筛选素材
              </button>
            </div>
          </div>
        </div>
      </section>

      <aside className="flex min-h-0 w-[330px] flex-col gap-4 overflow-auto">
        {notice && <div className="rounded-[22px] border border-emerald-100 bg-emerald-50 p-4 text-sm font-bold text-emerald-800">{notice}</div>}
        <div className="glass-card rounded-[24px] p-5">
          <h3 className="font-black text-slate-950">素材分布</h3>
          <div className="mt-5 space-y-4">
            {[
              ["侧写对话", 46],
              ["分身对话", 31],
              ["圆桌协同", 23],
            ].map(([label, value]) => (
              <div key={label as string}>
                <div className="mb-2 flex justify-between text-xs font-bold text-slate-500">
                  <span>{label as string}</span>
                  <span>{value as number}%</span>
                </div>
                <ProgressBar value={value as number} />
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-[24px] p-5">
          <h3 className="font-black text-slate-950">仍需补充</h3>
          <div className="mt-4 space-y-3">
            {["情绪反应", "冲突处理", "日常偏好", "失败复盘方式"].map((item) => (
              <div key={item} className="rounded-2xl bg-amber-50 p-3 text-sm font-semibold text-amber-800">{item}</div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-[24px] p-5">
          <h3 className="font-black text-slate-950">最近沉淀</h3>
          <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <div className="rounded-2xl bg-white p-3 shadow-sm">从 Roundtable 加入 3 条协同判断样本。</div>
            <div className="rounded-2xl bg-white p-3 shadow-sm">Yuxuan.A 新增 2 条表达相似度反馈。</div>
            <div className="rounded-2xl bg-white p-3 shadow-sm">侧写对话生成 5 条思考方式样本。</div>
          </div>
        </div>
      </aside>
    </main>
  );
}
