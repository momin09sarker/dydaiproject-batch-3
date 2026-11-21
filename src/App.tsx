import { useState } from 'react';
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BrainCircuit,
  Calendar,
  CheckCircle2,
  ClipboardCheck,
  Cpu,
  FileDown,
  Mail,
  MapPin,
  Megaphone,
  Monitor,
  Phone,
  ShieldCheck,
  Wallet,
} from 'lucide-react';
import AdmitCardModal from './components/AdmitCardModal';
import ApplicationModal from './components/ApplicationModal';
import CentersSection from './components/CentersSection';
import CurriculumSection from './components/CurriculumSection';
import Navbar from './components/Navbar';
import SafeImage from './components/SafeImage';
import {
  BENEFITS,
  BenefitItem,
  ELIGIBILITY_CRITERIA,
  KEY_STATS,
  TIMELINE_STEPS,
} from './data/projectData';

const NOTICE_TEXT =
  'ভর্তি নোটিশ: ২ মাস মেয়াদি (৩০০ ঘণ্টা) কৃত্রিম বুদ্ধিমত্তা (AI) ভিত্তিক বেসিক প্রশিক্ষণ কোর্সের ৩য় ব্যাচে সম্পূর্ণ বিনামূল্যে ভর্তি চলছে! আবেদনের শেষ সময়: ২৪ নভেম্বর ২০২৬। লিখিত পরীক্ষা: ২৮ নভেম্বর ২০২৬। ক্লাস শুরু: ১ ডিসেম্বর ২০২৬।';

function BenefitIcon({ name }: { name: BenefitItem['iconName'] }) {
  const cls = 'w-5 h-5 text-emerald-700';
  switch (name) {
    case 'cpu':
      return <Cpu className={cls} />;
    case 'award':
      return <Award className={cls} />;
    case 'wallet':
      return <Wallet className={cls} />;
    case 'badge-check':
      return <BadgeCheck className={cls} />;
    case 'clipboard-check':
      return <ClipboardCheck className={cls} />;
    case 'monitor':
      return <Monitor className={cls} />;
  }
}

export default function App() {
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedDistrictEn, setSelectedDistrictEn] = useState<string>('Gaibandha');
  const [admitModalOpen, setAdmitModalOpen] = useState(false);
  const [admitInitialQuery, setAdmitInitialQuery] = useState('');

  // Interactive Eligibility Quick-Check state
  const [checkAge, setCheckAge] = useState(true);
  const [checkEdu, setCheckEdu] = useState(true);
  const [checkPc, setCheckPc] = useState(true);
  const [checkEng, setCheckEng] = useState(true);
  const isAllEligible = checkAge && checkEdu && checkPc && checkEng;

  const openApplyModal = (districtEn = 'Gaibandha') => {
    setSelectedDistrictEn(districtEn);
    setApplyModalOpen(true);
  };

  const openAdmitModal = (initialQuery = '') => {
    setAdmitInitialQuery(initialQuery);
    setAdmitModalOpen(true);
  };

  const handleSuccessOpenAdmit = (trackingId: string) => {
    setApplyModalOpen(false);
    setAdmitInitialQuery(trackingId);
    setAdmitModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      {/* Sticky Top Navigation Bar */}
      <Navbar
        onOpenApply={() => openApplyModal('Gaibandha')}
        onOpenAdmitCard={() => openAdmitModal('')}
      />

      {/* Urgent Notice Announcement Bar */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center gap-3 overflow-hidden">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 whitespace-nowrap shrink-0 pr-3 border-r border-slate-700">
            <Megaphone className="w-4 h-4 shrink-0" />
            <span>জরুরি বিজ্ঞপ্তি</span>
          </div>
          <div className="overflow-hidden flex-1">
            <div className="animate-notice-marquee text-xs sm:text-sm text-slate-100">
              <span className="pr-16 whitespace-nowrap">{NOTICE_TEXT}</span>
              <span className="pr-16 whitespace-nowrap" aria-hidden="true">
                {NOTICE_TEXT}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => openApplyModal('Gaibandha')}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-emerald-300 hover:text-emerald-200 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>আবেদন করুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <main className="flex-1">
        {/* Hero Section */}
        <section id="home" className="bg-white pt-10 pb-16 lg:pt-14 lg:pb-20 border-b border-slate-200">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Left Column: Official Headline & Conversion Actions */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-emerald-700 leading-relaxed">
                    গণপ্রজাতন্ত্রী বাংলাদেশ সরকার · যুব ও ক্রীড়া মন্ত্রণালয় · যুব উন্নয়ন অধিদপ্তর
                  </p>

                  <p className="text-xs sm:text-sm text-slate-500 mt-1.5 font-medium">
                    কৃত্রিম বুদ্ধিমত্তা (AI) প্রযুক্তির মাধ্যমে দক্ষতা উন্নয়ন প্রকল্প — ব্যাচ ০৩
                  </p>

                  <h1 className="mt-4 text-[clamp(1.85rem,3.4vw,2.95rem)] font-bold text-slate-900 leading-[1.2] tracking-tight text-balance">
                    তথ্যপ্রযুক্তি জ্ঞানসম্পন্ন যুবদের কৃত্রিম বুদ্ধিমত্তা (AI) প্রযুক্তির মাধ্যমে দক্ষতা উন্নয়ন (ব্যাচ-০৩)
                  </h1>

                  <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                    ২ মাস মেয়াদি (৫০ দিন, দৈনিক ৬ ঘণ্টা করে মোট ৩০০ ঘণ্টা) প্র্যাকটিক্যাল ল্যাব প্রশিক্ষণ। সম্পূর্ণ সরকারি অর্থায়নে ৬৪ জেলায় সরাসরি প্রশিক্ষণ ও দৈনিক ২০০/- টাকা ভাতা।
                  </p>

                  {/* Key Date Strip (Unboxed clean metadata) */}
                  <div className="mt-6 pt-5 border-t border-slate-200 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-700">
                    <span className="inline-flex items-center gap-2 font-semibold text-slate-900">
                      <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>আবেদনের শেষ সময়: ২৪ নভেম্বর ২০২৬</span>
                    </span>
                    <span className="text-slate-300 hidden sm:inline" aria-hidden="true">
                      /
                    </span>
                    <span className="font-medium text-teal-800">ক্লাস শুরু: ১ ডিসেম্বর ২০২৬</span>
                  </div>
                </div>

                {/* Hero CTAs */}
                <div className="mt-8 flex flex-wrap items-center gap-3.5">
                  <button
                    type="button"
                    onClick={() => openApplyModal('Gaibandha')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 active:bg-emerald-800 transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                  >
                    <span>অনলাইনে আবেদন করুন</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                  <a
                    href="#curriculum"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-900 bg-white border border-slate-300 rounded-xl hover:border-slate-900 hover:bg-slate-50 transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
                  >
                    <span>কোর্স মডিউল দেখুন</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => openAdmitModal('')}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-sm font-semibold text-teal-800 hover:text-teal-950 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <FileDown className="w-4 h-4 shrink-0" />
                    <span>প্রবেশপত্র যাচাই</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Institutional AI Lab Visual */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 flex-1 min-h-[280px] lg:min-h-[380px]">
                  <SafeImage
                    src="/src/assets/images/hero_ai_lab_1795240776748.jpg"
                    alt="যুব উন্নয়ন অধিদপ্তরের আধুনিক এআই ও কম্পিউটার প্রশিক্ষণ ল্যাবে প্রশিক্ষণার্থীরা"
                    className="w-full h-full object-cover"
                    fallbackTitle="৬৪ জেলা কম্পিউটার ও AI ল্যাব"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/55 to-transparent p-5 text-white">
                    <p className="text-xs font-medium text-emerald-300">
                      সরাসরি ব্যবহারিক ল্যাব · ৬৪ জেলা কেন্দ্র
                    </p>
                    <p className="text-sm sm:text-base font-semibold mt-1 leading-snug">
                      আধুনিক কম্পিউটার ল্যাবে প্রতিদিন ৬ ঘণ্টা হাতে-কলমে AI প্রজেক্ট অনুশীলন
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Highlights Stats Bar (4 Cards — Full-Width Row Below Hero Split) */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {KEY_STATS.map((stat) => (
                <div
                  key={stat.value}
                  className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
                >
                  <p className="text-2xl font-bold text-slate-900 tracking-tight tabular-nums">
                    {stat.value}
                  </p>
                  <div className="mt-2">
                    <p className="text-sm font-semibold text-emerald-700">{stat.label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{stat.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Overview & Key Benefits Section (6 Grid Cards) */}
        <section id="about" className="py-20 lg:py-24 bg-white">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Editorial Overview Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
              <div className="lg:col-span-6 space-y-4">
                <p className="text-sm font-semibold text-teal-700">
                  প্রকল্প পরিচিতি · dydaibatch03
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight text-balance">
                  স্মার্ট কর্মসংস্থান ও আত্মকর্মসংস্থানের লক্ষ্যে সরকারি AI দক্ষতা উন্নয়ন উদ্যোগ
                </h2>
                <p className="text-base text-slate-600 leading-relaxed">
                  চতুর্থ শিল্পবিপ্লবের চ্যালেঞ্জ মোকাবিলা এবং দেশের শিক্ষিত ও তথ্যপ্রযুক্তি জ্ঞানসম্পন্ন যুবসমাজকে বৈশ্বিক ফ্রিল্যান্সিং ও আধুনিক কর্পোরেট কর্মক্ষেত্রের উপযোগী করে গড়ে তুলতে যুব উন্নয়ন অধিদপ্তর এই ৩০০ ঘণ্টার নিবিড় AI প্রশিক্ষণ প্রকল্প বাস্তবায়ন করছে।
                </p>
                <div className="pt-2 grid grid-cols-2 gap-4 border-t border-slate-200 text-sm">
                  <div>
                    <p className="font-bold text-slate-900">৫০ কার্যদিবস</p>
                    <p className="text-xs text-slate-500 mt-0.5">প্রতিদিন ৬ ঘণ্টা সরাসরি ল্যাব</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">ভেরিফায়েড সনদ</p>
                    <p className="text-xs text-slate-500 mt-0.5">যুব উন্নয়ন অধিদপ্তর অনুমোদিত</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden border border-slate-200 aspect-[4/3] bg-slate-100">
                  <SafeImage
                    src="/src/assets/images/mentor_guidance_lab_1795240777222.jpg"
                    alt="প্রশিক্ষকের তত্ত্বাবধানে হাতে-কলমে এআই প্রশিক্ষণ"
                    className="w-full h-full object-cover"
                    fallbackTitle="প্রশিক্ষকের সরাসরি তত্ত্বাবধান"
                  />
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-200 aspect-[4/3] bg-slate-100">
                  <SafeImage
                    src="/src/assets/images/youth_tech_workshop_1795240777106.jpg"
                    alt="যুব প্রশিক্ষণার্থীদের দলীয় প্রজেক্ট অনুশীলন"
                    className="w-full h-full object-cover"
                    fallbackTitle="প্রজেক্টভিত্তিক কর্মশালা"
                  />
                </div>
              </div>
            </div>

            {/* Section Subheading for 6 Benefits */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pt-10 border-t border-slate-200">
              <div>
                <p className="text-sm font-semibold text-emerald-700">কেন এই প্রশিক্ষণ গুরুত্বপূর্ণ</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                  প্রকল্পের সুবিধাসমূহ
                </h3>
              </div>
              <p className="text-sm text-slate-500">
                ৬টি মূল সরকারি সুবিধা ও প্রাতিষ্ঠানিক নিশ্চয়তা
              </p>
            </div>

            {/* 6 Benefits Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {BENEFITS.map((benefit) => (
                <article
                  key={benefit.id}
                  className="p-6 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                        <BenefitIcon name={benefit.iconName} />
                      </div>
                      <span className="text-xs font-medium text-slate-400 tabular-nums">
                        {benefit.index} · <span className="font-en">{benefit.subtitleEn}</span>
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">{benefit.title}</h4>
                    <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                  <p className="mt-5 pt-4 border-t border-slate-100 text-xs font-semibold text-teal-700">
                    {benefit.highlight}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Course Curriculum Section (6 Interactive Cards + Syllabus Inspector) */}
        <CurriculumSection onOpenApply={() => openApplyModal('Gaibandha')} />

        {/* Admission Timeline Section (5 Steps) */}
        <section id="schedule" className="py-20 lg:py-24 bg-white">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <p className="text-sm font-semibold text-teal-700">
                ব্যাচ-০৩ গুরুত্বপূর্ণ তারিখসমূহ
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 tracking-tight text-balance">
                ভর্তি কার্যক্রমের সময়সূচী
              </h2>
              <p className="text-base text-slate-600 mt-3 leading-relaxed">
                আবেদন গ্রহণ থেকে শুরু করে চূড়ান্ত মেধা তালিকা প্রকাশ ও ক্লাস আরম্ভের নির্ধারিত ৫টি ধাপ।
              </p>
            </div>

            <ol className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {TIMELINE_STEPS.map((item) => (
                <li
                  key={item.step}
                  className={`p-5 rounded-xl border flex flex-col justify-between ${
                    item.isActive
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-900 border-slate-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs font-semibold">
                      <span className={item.isActive ? 'text-emerald-300' : 'text-teal-700'}>
                        {item.step}
                      </span>
                      <span className={item.isActive ? 'text-slate-300' : 'text-slate-500'}>
                        {item.statusLabel}
                      </span>
                    </div>

                    <h3
                      className={`text-lg font-bold mt-4 ${
                        item.isActive ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {item.title}
                    </h3>

                    <p
                      className={`text-sm font-semibold mt-1.5 tabular-nums ${
                        item.isActive ? 'text-emerald-300' : 'text-emerald-700'
                      }`}
                    >
                      {item.dateBn}
                    </p>

                    <p
                      className={`text-xs mt-3 leading-relaxed ${
                        item.isActive ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {item.detail}
                    </p>
                  </div>

                  {item.isActive && (
                    <button
                      type="button"
                      onClick={() => openApplyModal('Gaibandha')}
                      className="mt-5 w-full py-2 px-3 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer"
                    >
                      এখনই আবেদন করুন
                    </button>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Eligibility Criteria Section */}
        <section id="eligibility" className="py-20 lg:py-24 bg-slate-50 border-y border-slate-200">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left: 4 Official Eligibility Requirements */}
              <div className="lg:col-span-7">
                <p className="text-sm font-semibold text-teal-700">
                  কারা আবেদন করতে পারবেন · আবশ্যিক শর্তাবলি
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 tracking-tight text-balance">
                  আবেদনের যোগ্যতা
                </h2>
                <p className="text-base text-slate-600 mt-3 leading-relaxed">
                  বাংলাদেশের নাগরিক এবং নিচের ৪টি শর্ত পূরণকারী সকল নারী ও পুরুষ প্রার্থী সম্পূর্ণ বিনামূল্যে আবেদন করতে পারবেন।
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ELIGIBILITY_CRITERIA.map((criterion) => (
                    <div
                      key={criterion.id}
                      className="p-5 rounded-xl bg-white border border-slate-200"
                    >
                      <p className="text-xs font-semibold text-slate-400 tabular-nums">
                        শর্ত {criterion.number} · {criterion.label}
                      </p>
                      <h3 className="text-base font-bold text-slate-900 mt-2">
                        {criterion.requirement}
                      </h3>
                      <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                        {criterion.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Interactive Eligibility Self-Check Card */}
              <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
                <div className="flex items-center gap-2.5 text-slate-900">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <h3 className="text-lg font-bold">যোগ্যতা যাচাই চেকলিস্ট</h3>
                </div>
                <p className="text-sm text-slate-600 mt-2">
                  আবেদন করার আগে আপনার যোগ্যতাগুলো মিলিয়ে নিন:
                </p>

                <div className="mt-5 space-y-3">
                  <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checkAge}
                      onChange={(e) => setCheckAge(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600"
                    />
                    <span className="text-sm text-slate-800">
                      আমার বয়স ১৮ হতে ৩৫ বছরের মধ্যে (২৪ নভেম্বর ২০২৬ অনুযায়ী)
                    </span>
                  </label>
                  <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checkEdu}
                      onChange={(e) => setCheckEdu(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600"
                    />
                    <span className="text-sm text-slate-800">
                      আমি ন্যূনতম এইচএসসি (HSC) বা সমমান পরীক্ষায় উত্তীর্ণ
                    </span>
                  </label>
                  <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checkPc}
                      onChange={(e) => setCheckPc(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600"
                    />
                    <span className="text-sm text-slate-800">
                      প্রাথমিক কম্পিউটার পরিচালনা ও ইন্টারনেট ব্যবহারিক জ্ঞান আছে
                    </span>
                  </label>
                  <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checkEng}
                      onChange={(e) => setCheckEng(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600"
                    />
                    <span className="text-sm text-slate-800">
                      ইংরেজিতে মৌলিক যোগাযোগ ও ডকুমেন্ট পড়ার দক্ষতা আছে
                    </span>
                  </label>
                </div>

                <div
                  className={`mt-5 p-4 rounded-xl border text-sm ${
                    isAllEligible
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-amber-50 border-amber-200 text-amber-900'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2
                      className={`w-5 h-5 shrink-0 mt-0.5 ${
                        isAllEligible ? 'text-emerald-600' : 'text-amber-600'
                      }`}
                    />
                    <p className="font-medium leading-relaxed">
                      {isAllEligible
                        ? 'আপনি ব্যাচ-০৩ এ আবেদনের জন্য সম্পূর্ণ উপযোগী। ২৪ নভেম্বর ২০২৬ এর পূর্বেই বিনামূল্যে আবেদন সম্পন্ন করুন।'
                        : 'আবেদনের জন্য উপরের ৪টি আবশ্যিক শর্তই পূরণ করা প্রয়োজন।'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={!isAllEligible}
                  onClick={() => openApplyModal('Gaibandha')}
                  className="mt-5 w-full py-3 px-5 text-sm font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 disabled:bg-slate-300 disabled:text-slate-600 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  অনলাইনে ফরম পূরণ করুন
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive District & Training Package Tabs */}
        <CentersSection onApplyForDistrict={(districtEn) => openApplyModal(districtEn)} />

        {/* Pre-Footer Conversion Band */}
        <section className="bg-slate-900 text-white py-16">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-xs sm:text-sm font-semibold text-emerald-300">
                আবেদনের শেষ সময়: ২৪ নভেম্বর ২০২৬ · আসন সংখ্যা সীমিত
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2 tracking-tight text-balance">
                আপনার জেলা কেন্দ্রে সম্পূর্ণ বিনামূল্যে ৩০০ ঘণ্টার AI প্রশিক্ষণে অংশ নিন
              </h2>
              <p className="text-sm sm:text-base text-slate-300 mt-2.5">
                অনলাইনে আবেদন সম্পন্ন করে তাৎক্ষণিক ট্র্যাকিং আইডি সংগ্রহ করুন এবং ২৮ নভেম্বর ২০২৬ এর লিখিত পরীক্ষার প্রস্তুতি নিন।
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => openApplyModal('Gaibandha')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-500 transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>অনলাইনে আবেদন করুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => openAdmitModal('')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-semibold text-white bg-white/10 border border-white/20 rounded-xl hover:bg-white/15 transition-colors whitespace-nowrap cursor-pointer"
              >
                <FileDown className="w-4 h-4 text-emerald-300" />
                <span>প্রবেশপত্র ডাউনলোড</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Official Government-Style Footer */}
      <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Project Info */}
            <div className="md:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2.5 text-white">
                <span className="w-9 h-9 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                  <BrainCircuit className="w-5 h-5" />
                </span>
                <span className="font-en text-xl font-bold tracking-tight">dydaibatch03</span>
              </div>
              <p className="text-sm font-medium text-emerald-300">
                কৃত্রিম বুদ্ধিমত্তা (AI) প্রযুক্তির মাধ্যমে দক্ষতা উন্নয়ন প্রকল্প — ব্যাচ ০৩
              </p>
              <p className="text-sm text-slate-400 leading-relaxed max-w-md">
                গণপ্রজাতন্ত্রী বাংলাদেশ সরকার, যুব ও ক্রীড়া মন্ত্রণালয় এবং যুব উন্নয়ন অধিদপ্তরের তত্ত্বাবধানে ৬৪ জেলায় বাস্তবায়নাধীন বিনামূল্যে AI দক্ষতা উন্নয়ন কর্মসূচি।
              </p>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3 space-y-3">
              <h3 className="text-sm font-bold text-white">দ্রুত লিংকসমূহ</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#home" className="hover:text-emerald-300 transition-colors">
                    হোম
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-emerald-300 transition-colors">
                    প্রকল্প পরিচিতি ও সুবিধা
                  </a>
                </li>
                <li>
                  <a href="#curriculum" className="hover:text-emerald-300 transition-colors">
                    কোর্স মডিউল (৩০০ ঘণ্টা)
                  </a>
                </li>
                <li>
                  <a href="#schedule" className="hover:text-emerald-300 transition-colors">
                    ভর্তি সময়সূচী
                  </a>
                </li>
                <li>
                  <a href="#centers" className="hover:text-emerald-300 transition-colors">
                    ৬৪ জেলা প্রশিক্ষণ কেন্দ্র
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Helpline */}
            <div className="md:col-span-4 space-y-3">
              <h3 className="text-sm font-bold text-white">যোগাযোগ ও হেল্পলাইন</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                  <div>
                    <p className="text-slate-200 font-medium">+৮৮ ০২-৮০৯১১৮৮ | ০১৫৫০-৬৬৬৯০০</p>
                    <p className="text-xs text-slate-500 mt-0.5">সকাল ৯:০০ — বিকাল ৫:০০ (কর্মদিবস)</p>
                  </div>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a
                    href="mailto:info@dydaibatch03.com"
                    className="font-en text-slate-200 hover:text-emerald-300 transition-colors"
                  >
                    info@dydaibatch03.com
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                  <span>যুব ভবন, ১০৮ মতিঝিল বা/এ, ঢাকা-১০০০, বাংলাদেশ</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>© 2026 dydaibatch03 | যুব উন্নয়ন অধিদপ্তর প্রকল্প অবলম্বনে নির্মিত</p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => openAdmitModal('')}
                className="hover:text-emerald-300 transition-colors cursor-pointer"
              >
                প্রবেশপত্র ডাউনলোড
              </button>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => openApplyModal('Gaibandha')}
                className="hover:text-emerald-300 transition-colors cursor-pointer"
              >
                অনলাইন আবেদন
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <ApplicationModal
        isOpen={applyModalOpen}
        initialDistrictEn={selectedDistrictEn}
        onClose={() => setApplyModalOpen(false)}
        onSuccessOpenAdmitCard={handleSuccessOpenAdmit}
      />
      <AdmitCardModal
        isOpen={admitModalOpen}
        initialQuery={admitInitialQuery}
        onClose={() => setAdmitModalOpen(false)}
      />
    </div>
  );
}
