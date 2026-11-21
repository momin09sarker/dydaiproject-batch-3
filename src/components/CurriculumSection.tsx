import { useState } from 'react';
import {
  BarChart3,
  Briefcase,
  Check,
  ChevronRight,
  PenTool,
  Sparkles,
  Terminal,
  Workflow,
} from 'lucide-react';
import { CURRICULUM_MODULES, CurriculumModule } from '../data/projectData';

interface CurriculumSectionProps {
  onOpenApply: () => void;
}

function ModuleIcon({ name, active }: { name: CurriculumModule['iconName']; active: boolean }) {
  const cls = `w-5 h-5 ${active ? 'text-white' : 'text-teal-700'}`;
  switch (name) {
    case 'terminal':
      return <Terminal className={cls} />;
    case 'sparkles':
      return <Sparkles className={cls} />;
    case 'pen-tool':
      return <PenTool className={cls} />;
    case 'workflow':
      return <Workflow className={cls} />;
    case 'bar-chart':
      return <BarChart3 className={cls} />;
    case 'briefcase':
      return <Briefcase className={cls} />;
  }
}

export default function CurriculumSection({ onOpenApply }: CurriculumSectionProps) {
  const [selectedId, setSelectedId] = useState<string>(CURRICULUM_MODULES[0].id);

  const activeModule =
    CURRICULUM_MODULES.find((m) => m.id === selectedId) ?? CURRICULUM_MODULES[0];

  return (
    <section id="curriculum" className="py-20 lg:py-24 bg-slate-50 border-y border-slate-200">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-teal-700">
              কোর্স কারিকুলাম · মোট ৩০০ ঘণ্টা (৫০ দিন × ৬ ঘণ্টা)
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 tracking-tight text-balance">
              প্রশিক্ষণ মডিউল হাইলাইটস
            </h2>
            <p className="text-base text-slate-600 mt-3 leading-relaxed">
              বাজারের চাহিদা ও আধুনিক কর্মক্ষেত্রের উপযোগী ৬টি ব্যবহারিক মডিউলে সাজানো সম্পূর্ণ সিলেবাস। বিস্তারিত দেখতে যেকোনো মডিউলে ক্লিক করুন।
            </p>
          </div>
          <div className="text-sm text-slate-600 lg:text-right shrink-0">
            <p className="font-semibold text-slate-900">১০০% ল্যাবভিত্তিক অনুশীলন</p>
            <p className="mt-0.5">প্রতি মডিউল শেষে প্র্যাকটিক্যাল অ্যাসাইনমেন্ট ও মূল্যায়ন</p>
          </div>
        </div>

        {/* 6 Interactive Curriculum Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CURRICULUM_MODULES.map((mod) => {
            const isActive = mod.id === activeModule.id;
            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => setSelectedId(mod.id)}
                aria-pressed={isActive}
                className={`group text-left p-6 rounded-xl border transition-all duration-150 cursor-pointer flex flex-col justify-between focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                    : 'bg-white text-slate-900 border-slate-200 hover:border-teal-600/60 hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isActive ? 'bg-emerald-600' : 'bg-slate-100 group-hover:bg-teal-50'
                      }`}
                    >
                      <ModuleIcon name={mod.iconName} active={isActive} />
                    </div>
                    <span
                      className={`text-xs font-medium tabular-nums ${
                        isActive ? 'text-emerald-300' : 'text-slate-500'
                      }`}
                    >
                      {mod.number} · {mod.hours}
                    </span>
                  </div>

                  <h3
                    className={`font-en text-lg font-bold tracking-tight ${
                      isActive ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {mod.titleEn}
                  </h3>
                  <p
                    className={`text-sm font-semibold mt-0.5 ${
                      isActive ? 'text-emerald-300' : 'text-teal-700'
                    }`}
                  >
                    {mod.titleBn}
                  </p>
                  <p
                    className={`text-sm mt-3 leading-relaxed ${
                      isActive ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {mod.summary}
                  </p>
                </div>

                <div
                  className={`mt-5 pt-4 border-t flex items-center justify-between text-xs font-semibold ${
                    isActive
                      ? 'border-slate-800 text-emerald-300'
                      : 'border-slate-100 text-slate-700 group-hover:text-emerald-700'
                  }`}
                >
                  <span>{isActive ? 'বিস্তারিত নিচে প্রদর্শিত হচ্ছে' : 'সিলেবাস বিস্তারিত দেখুন'}</span>
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Module Syllabus Inspector Panel */}
        <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-teal-700">
                <span>{activeModule.number}</span>
                <span aria-hidden="true">·</span>
                <span>সময়কাল: {activeModule.hours}</span>
                <span aria-hidden="true">·</span>
                <span>প্র্যাকটিক্যাল ল্যাব মডিউল</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  <span className="font-en">{activeModule.titleEn}</span> — {activeModule.titleBn}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                  {activeModule.summary}
                </p>
              </div>

              <div className="pt-2">
                <p className="text-sm font-bold text-slate-900 mb-3">এই মডিউলে যা হাতে-কলমে শিখবেন:</p>
                <ul className="space-y-2.5">
                  {activeModule.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-5 lg:pl-6 lg:border-l border-slate-200 space-y-5">
              <div>
                <p className="text-xs font-semibold text-slate-500">ব্যবহৃত আধুনিক AI টুলস ও প্ল্যাটফর্ম</p>
                <p className="font-en text-sm font-medium text-slate-900 mt-2 leading-relaxed">
                  {activeModule.tools.join('  ·  ')}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <p className="text-xs font-semibold text-slate-500">প্র্যাকটিক্যাল আউটকাম / প্রজেক্ট</p>
                <p className="text-sm font-semibold text-slate-900 mt-1.5 leading-relaxed">
                  {activeModule.outcome}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-slate-500">সকল মডিউল সম্পূর্ণ বিনামূল্যে অন্তর্ভুক্ত</span>
                <button
                  type="button"
                  onClick={onOpenApply}
                  className="px-4 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap cursor-pointer"
                >
                  ব্যাচ-০৩ এ আবেদন করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
