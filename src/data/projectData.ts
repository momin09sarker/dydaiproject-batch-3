export interface BenefitItem {
  id: string;
  index: string;
  title: string;
  subtitleEn: string;
  description: string;
  highlight: string;
  iconName: 'cpu' | 'award' | 'wallet' | 'badge-check' | 'clipboard-check' | 'monitor';
}

export interface CurriculumModule {
  id: string;
  number: string;
  titleEn: string;
  titleBn: string;
  hours: string;
  summary: string;
  tools: string[];
  topics: string[];
  outcome: string;
  iconName: 'terminal' | 'sparkles' | 'pen-tool' | 'workflow' | 'bar-chart' | 'briefcase';
}

export interface TimelineStep {
  step: string;
  title: string;
  dateBn: string;
  detail: string;
  statusLabel: string;
  isActive?: boolean;
}

export interface EligibilityCriterion {
  id: string;
  number: string;
  label: string;
  requirement: string;
  detail: string;
}

export interface DistrictEntry {
  nameBn: string;
  nameEn: string;
  divisionBn: string;
  centerName: string;
  featured?: boolean;
}

export interface TrainingPackage {
  id: string;
  tabLabel: string;
  shortLabel: string;
  title: string;
  divisions: string;
  districtCountBn: string;
  partnerName: string;
  partnerSubtitle: string;
  labCapacity: string;
  coordinatorPhone: string;
  districts: DistrictEntry[];
}

export interface ApplicationRecord {
  trackingId: string;
  rollNo: string;
  nameBn: string;
  nameEn: string;
  fatherName: string;
  motherName: string;
  dob: string;
  ageYears: number;
  nidOrBirthNo: string;
  districtBn: string;
  districtEn: string;
  packageTitle: string;
  examCenter: string;
  education: string;
  mobile: string;
  email: string;
  submittedAt: string;
}

export const KEY_STATS = [
  {
    value: '৬৪ জেলা কেন্দ্র',
    label: 'দেশব্যাপী সরাসরি ল্যাব ক্লাস',
    meta: '৪টি আঞ্চলিক প্যাকেজ',
  },
  {
    value: '৩০০ ঘণ্টা',
    label: '২ মাস / ৫০ দিন প্রশিক্ষণ',
    meta: 'দৈনিক ৬ ঘণ্টা ব্যবহারিক ক্লাস',
  },
  {
    value: '১০০% বিনামূল্যে',
    label: 'সরকারি অর্থায়নে পরিচালিত',
    meta: 'কোনো রেজিস্ট্রেশন ফি নেই',
  },
  {
    value: 'দৈনিক ২০০/- টাকা',
    label: 'যাতায়াত ও আনুষঙ্গিক ভাতা',
    meta: 'নিয়মিত উপস্থিতির ভিত্তিতে',
  },
];

export const BENEFITS: BenefitItem[] = [
  {
    id: 'hands-on-ai',
    index: '০১',
    title: 'হাতে-কলমে AI দক্ষতা',
    subtitleEn: 'Practical Generative AI',
    description:
      'Generative AI, Prompt Engineering ও আধুনিক AI টুলসের বাস্তব প্রয়োগ—তত্ত্বের পাশাপাশি প্রতিদিন ল্যাবে প্রজেক্টভিত্তিক অনুশীলন।',
    highlight: 'দৈনিক ৬ ঘণ্টা প্র্যাকটিক্যাল ল্যাব',
    iconName: 'cpu',
  },
  {
    id: 'govt-certificate',
    index: '০২',
    title: 'সরকারি প্রফেশনাল সনদপত্র',
    subtitleEn: 'Verified Certification',
    description:
      'কোর্স ও মূল্যায়ন সফলভাবে সম্পন্ন করলে যুব উন্নয়ন অধিদপ্তর কর্তৃক ভেরিফায়েড সরকারি প্রশিক্ষণ সনদপত্র প্রদান করা হবে।',
    highlight: 'অনলাইন ভেরিফিকেশন সুবিধা',
    iconName: 'award',
  },
  {
    id: 'daily-allowance',
    index: '০৩',
    title: 'দৈনিক ২০০/- টাকা ভাতা (TA)',
    subtitleEn: 'Training Allowance',
    description:
      'প্রশিক্ষণার্থীদের উৎসাহিত করতে নিয়মিত উপস্থিতির ভিত্তিতে প্রতিদিন ২০০ টাকা হারে সরকারি যাতায়াত ও আনুষঙ্গিক ভাতা সুবিধা।',
    highlight: 'সর্বোচ্চ ১০,০০০/- টাকা (৫০ দিন)',
    iconName: 'wallet',
  },
  {
    id: 'free-training',
    index: '০৪',
    title: '১০০% ফ্রি প্রশিক্ষণ',
    subtitleEn: 'Zero Tuition Cost',
    description:
      'গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের যুব ও ক্রীড়া মন্ত্রণালয়ের অর্থায়নে পরিচালিত হওয়ায় কোনো প্রকার রেজিস্ট্রেশন বা কোর্স ফি নেই।',
    highlight: 'সম্পূর্ণ সরকারি অর্থায়ন',
    iconName: 'badge-check',
  },
  {
    id: 'merit-selection',
    index: '০৫',
    title: 'মেধাভিত্তিক নির্বাচন',
    subtitleEn: 'Transparent Selection',
    description:
      'স্বচ্ছ অনলাইন আবেদন, জেলা পর্যায়ে সরাসরি লিখিত ও মৌখিক (ভাইভা) পরীক্ষার মাধ্যমে সম্পূর্ণ মেধাভিত্তিক প্রার্থী নির্বাচন।',
    highlight: 'SMS ও অনলাইন মেধা তালিকা',
    iconName: 'clipboard-check',
  },
  {
    id: 'modern-labs',
    index: '০৬',
    title: 'আধুনিক কম্পিউটার ল্যাব',
    subtitleEn: '64 District Labs',
    description:
      'প্রতিটি জেলায় নির্ধারিত পার্টনার প্রতিষ্ঠানের উচ্চগতির ইন্টারনেট ও আধুনিক কম্পিউটার ল্যাবে অভিজ্ঞ প্রশিক্ষকের তত্ত্বাবধানে ক্লাস।',
    highlight: 'একজন শিক্ষার্থী — একটি কম্পিউটার',
    iconName: 'monitor',
  },
];

export const CURRICULUM_MODULES: CurriculumModule[] = [
  {
    id: 'prompt-engineering',
    number: 'মডিউল ০১',
    titleEn: 'Prompt Engineering',
    titleBn: 'অ্যাডভান্সড প্রম্পট ইঞ্জিনিয়ারিং',
    hours: '৫০ ঘণ্টা',
    summary:
      'ChatGPT, Claude ও Gemini-র জন্য স্ট্রাকচার্ড ও অ্যাডভান্সড প্রম্পট রাইটিং, রোল-বেজড ফ্রেমওয়ার্ক এবং আউটপুট অপটিমাইজেশন।',
    tools: ['ChatGPT', 'Claude', 'Google Gemini', 'NotebookLM'],
    topics: [
      'Zero-shot, Few-shot ও Chain-of-Thought প্রম্পট ডিজাইন',
      'বাংলা ও ইংরেজি প্রফেশনাল ডকুমেন্ট রাইটিং ও রিসার্চ',
      'কাস্টম সিস্টেম ইনস্ট্রাকশন ও পার্সোনাল AI অ্যাসিস্ট্যান্ট তৈরি',
    ],
    outcome: 'পেশাগত কাজের জন্য ৫০+ রিইউজেবল প্রম্পট প্লেবুক তৈরি',
    iconName: 'terminal',
  },
  {
    id: 'generative-ai-tools',
    number: 'মডিউল ০২',
    titleEn: 'Generative AI Tools',
    titleBn: 'মাল্টিমিডিয়া জেনারেটিভ AI টুলস',
    hours: '৫৫ ঘণ্টা',
    summary:
      'আধুনিক ইমেজ, অডিও, ভয়েসওভার এবং ভিডিও জেনারেশন টুলসের ব্যবহার করে ডিজিটাল অ্যাসেট তৈরি ও এডিটিং।',
    tools: ['Midjourney', 'Canva AI', 'ElevenLabs', 'Runway'],
    topics: [
      'কমার্শিয়াল ভিজ্যুয়াল, পোস্টার ও ব্যানার জেনারেশন কৌশল',
      'AI ভয়েস সিন্থেসিস, বাংলা-ইংরেজি ডাবিং ও অডিও ক্লিনিং',
      'স্ক্রিপ্ট থেকে শর্ট ভিডিও ও প্রেজেন্টেশন প্রোডাকশন',
    ],
    outcome: 'সম্পূর্ণ মাল্টিমিডিয়া প্রোমোশনাল ক্যাম্পেইন পোর্টফোলিও',
    iconName: 'sparkles',
  },
  {
    id: 'ai-content-creation',
    number: 'মডিউল ০৩',
    titleEn: 'AI Content Creation',
    titleBn: 'কনটেন্ট ক্রিয়েশন ও ডিজিটাল মার্কেটিং',
    hours: '৫০ ঘণ্টা',
    summary:
      'সোশ্যাল মিডিয়া, SEO ব্লগ, ই-কমার্স প্রোডাক্ট ডেসক্রিপশন ও মার্কেটিং কনটেন্ট অটোমেশন পদ্ধতি।',
    tools: ['SEO AI Writers', 'Meta Business Suite', 'Canva Magic', 'Copy Frameworks'],
    topics: [
      'SEO-ফ্রেন্ডলি আর্টিকেল রিসার্চ, আউটলাইন ও ফ্যাক্ট-চেকিং',
      '৩০ দিনের সোশ্যাল মিডিয়া কনটেন্ট ক্যালেন্ডার ও কপি রাইটিং',
      'ই-কমার্স ও ক্ষুদ্র উদ্যোক্তাদের জন্য ব্র্যান্ড কনটেন্ট প্যাক',
    ],
    outcome: 'লাইভ ব্লগ ও সোশ্যাল মিডিয়া ক্যাম্পেইন অ্যাসাইনমেন্ট',
    iconName: 'pen-tool',
  },
  {
    id: 'ai-productivity',
    number: 'মডিউল ০৪',
    titleEn: 'AI Productivity & Automation',
    titleBn: 'অফিসিয়াল প্রোডাক্টিভিটি ও অটোমেশন',
    hours: '৫০ ঘণ্টা',
    summary:
      'দৈনন্দিন অফিসিয়াল কাজ, ইমেইল, প্রেজেন্টেশন এবং নো-কোড ওয়ার্কফ্লো অটোমেশনের মাধ্যমে সময় সাশ্রয়।',
    tools: ['Google Workspace AI', 'Microsoft Copilot', 'Zapier / Make', 'Notion AI'],
    topics: [
      'অফিসিয়াল চিঠি, মিটিং মিনিটস ও প্রজেক্ট প্রপোজাল অটোমেশন',
      'ডকুমেন্ট সামারাইজেশন ও স্মার্ট প্রেজেন্টেশন স্লাইড ডেক তৈরি',
      'গুগল ফর্ম, শিট ও ইমেইল অটো-রিপ্লাই নো-কোড ওয়ার্কফ্লো',
    ],
    outcome: 'বাস্তব অফিস অটোমেশন পাইপলাইন ডেমো উপস্থাপনা',
    iconName: 'workflow',
  },
  {
    id: 'data-analysis-ai',
    number: 'মডিউল ০৫',
    titleEn: 'Data Analysis with AI',
    titleBn: 'AI-ভিত্তিক ডেটা বিশ্লেষণ ও রিপোর্টিং',
    hours: '৫০ ঘণ্টা',
    summary:
      'এআই ব্যবহার করে স্প্রেডশিট ডেটা ক্লিনিং, দ্রুত ডেটা বিশ্লেষণ, চার্ট ভিজ্যুয়ালাইজেশন ও বিজনেস রিপোর্ট তৈরি।',
    tools: ['Excel + AI Formulas', 'Google Sheets', 'Looker Studio', 'Python / Colab AI'],
    topics: [
      'ন্যাচারাল ল্যাঙ্গুয়েজ থেকে জটিল Excel ফর্মুলা ও পিভট টেবিল',
      'সার্ভে ও সেলস ডেটাসেট ক্লিনিং এবং ইনসাইট এক্সট্র্যাকশন',
      'ইন্টার‍্যাক্টিভ ড্যাশবোর্ড ও এক্সিকিউটিভ সামারি রিপোর্ট',
    ],
    outcome: 'রিয়েল-ওয়ার্ল্ড ডেটাসেট বিশ্লেষণ ও ড্যাশবোর্ড রিপোর্ট',
    iconName: 'bar-chart',
  },
  {
    id: 'ai-freelancing',
    number: 'মডিউল ০৬',
    titleEn: 'AI Freelancing & Career',
    titleBn: 'ফ্রিল্যান্সিং, ক্যারিয়ার ও ক্যাপস্টোন প্রজেক্ট',
    hours: '৪৫ ঘণ্টা',
    summary:
      'Fiverr, Upwork ও গ্লোবাল মার্কেটপ্লেসে AI সার্ভিস সেলিং, প্রোফাইল অপটিমাইজেশন এবং স্থানীয় চাকরির প্রস্তুতি।',
    tools: ['Fiverr', 'Upwork', 'LinkedIn', 'Portfolio Site'],
    topics: [
      'হাই-ডিমান্ড AI সার্ভিস গিগ নির্বাচন ও ক্লায়েন্ট কমিউনিকেশন',
      'প্রফেশনাল পোর্টফোলিও, সিভি এবং লিংকডইন প্রোফাইল ব্র্যান্ডিং',
      'চূড়ান্ত ক্যাপস্টোন প্রজেক্ট উপস্থাপনা ও মূল্যায়ন পরীক্ষা',
    ],
    outcome: 'রেডি-টু-লঞ্চ ফ্রিল্যান্স প্রোফাইল ও ক্যাপস্টোন প্রজেক্ট',
    iconName: 'briefcase',
  },
];

export const TIMELINE_STEPS: TimelineStep[] = [
  {
    step: 'ধাপ ০১',
    title: 'অনলাইন আবেদন',
    dateBn: '২৪ নভেম্বর ২০২৬ (রাত ১১:৫৯ পর্যন্ত)',
    detail: 'নির্ধারিত অনলাইন ফরমে সঠিক তথ্য, এনআইডি/জন্মনিবন্ধন ও জেলা নির্বাচন করে বিনামূল্যে আবেদন সম্পন্ন করতে হবে।',
    statusLabel: 'চলমান',
    isActive: true,
  },
  {
    step: 'ধাপ ০২',
    title: 'লিখিত পরীক্ষা',
    dateBn: '২৮ নভেম্বর ২০২৬',
    detail: 'প্রাথমিক তথ্যপ্রযুক্তি, সাধারণ ইংরেজি ও বিশ্লেষণধর্মী MCQ মূল্যায়ন। SMS ও প্রবেশপত্রে কেন্দ্র ও সময় জানানো হবে।',
    statusLabel: 'আসন্ন',
  },
  {
    step: 'ধাপ ০৩',
    title: 'মৌখিক পরীক্ষা (ভাইভা)',
    dateBn: '২৯ নভেম্বর ২০২৬',
    detail: 'লিখিত পরীক্ষায় উত্তীর্ণ প্রার্থীদের জেলাভিত্তিক কেন্দ্রে সরাসরি মৌখিক পরীক্ষা ও কাগজপত্র যাচাইকরণ।',
    statusLabel: 'নির্ধারিত',
  },
  {
    step: 'ধাপ ০৪',
    title: 'চূড়ান্ত মেধা তালিকা প্রকাশ',
    dateBn: '৩০ নভেম্বর ২০২৬',
    detail: 'জেলা যুব উন্নয়ন অধিদপ্তর কার্যালয় ও অনলাইন পোর্টালে ব্যাচ-০৩ এর চূড়ান্ত নির্বাচিত প্রার্থীদের তালিকা প্রকাশ।',
    statusLabel: 'নির্ধারিত',
  },
  {
    step: 'ধাপ ০৫',
    title: 'ক্লাস শুরু ও সমাপ্তি',
    dateBn: '১ ডিসেম্বর ২০২৬ — ৩১ জানুয়ারি ২০২৭',
    detail: 'সারা দেশের ৬৪টি জেলা ল্যাবে একযোগে ৩০০ ঘণ্টার (৫০ দিন, দৈনিক ৬ ঘণ্টা) ব্যবহারিক প্রশিক্ষণ কার্যক্রম শুরু।',
    statusLabel: 'প্রশিক্ষণ',
  },
];

export const ELIGIBILITY_CRITERIA: EligibilityCriterion[] = [
  {
    id: 'age',
    number: '০১',
    label: 'বয়সসীমা',
    requirement: '১৮ হতে ৩৫ বছর (অনূর্ধ্ব ৩৫)',
    detail: 'আবেদনের শেষ তারিখ (২৪ নভেম্বর ২০২৬) অনুযায়ী প্রার্থীর বয়স সর্বনিম্ন ১৮ এবং সর্বোচ্চ ৩৫ বছরের মধ্যে হতে হবে।',
  },
  {
    id: 'education',
    number: '০২',
    label: 'শিক্ষাগত যোগ্যতা',
    requirement: 'ন্যূনতম এইচএসসি (HSC) বা সমমান',
    detail: 'স্বীকৃত বোর্ড হতে এইচএসসি, আলিম, ডিপ্লোমা বা সমমান পরীক্ষায় উত্তীর্ণ হতে হবে। স্নাতক/স্নাতকোত্তর শিক্ষার্থীরাও আবেদন করতে পারবেন।',
  },
  {
    id: 'tech',
    number: '০৩',
    label: 'কারিগরি জ্ঞান',
    requirement: 'প্রাথমিক কম্পিউটার ও ইন্টারনেট ব্যবহার',
    detail: 'কম্পিউটার পরিচালনা, বাংলা ও ইংরেজি টাইপিং, ব্রাউজার ও ইমেইল ব্যবহারের প্রাথমিক ব্যবহারিক জ্ঞান থাকতে হবে।',
  },
  {
    id: 'language',
    number: '০৪',
    label: 'ভাষা দক্ষতা',
    requirement: 'ইংরেজিতে মৌলিক যোগাযোগ ও রিডিং',
    detail: 'আধুনিক AI টুলসের ইন্টারফেস ও প্রম্পট বোঝার জন্য ইংরেজিতে মৌলিক যোগাযোগ এবং ডকুমেন্ট রিডিং দক্ষতা প্রয়োজন।',
  },
];

export const TRAINING_PACKAGES: TrainingPackage[] = [
  {
    id: 'pkg-1',
    tabLabel: 'প্যাকেজ-১ (ঢাকা ও ময়মনসিংহ)',
    shortLabel: 'প্যাকেজ-১',
    title: 'প্যাকেজ-১: ঢাকা ও ময়মনসিংহ বিভাগ',
    divisions: 'ঢাকা ও ময়মনসিংহ বিভাগ',
    districtCountBn: '১৭টি জেলা',
    partnerName: 'বিডিআইটি ও ইয়ুথ টেক কনসোর্টিয়াম (অঞ্চল-১)',
    partnerSubtitle: 'যুব উন্নয়ন অধিদপ্তর অনুমোদিত প্রশিক্ষণ পার্টনার — কেন্দ্রীয় অঞ্চল',
    labCapacity: 'প্রতি জেলায় ২টি আধুনিক ল্যাব · ৬০ জন/ব্যাচ',
    coordinatorPhone: '০১৫৫০-৬৬৬৯০১',
    districts: [
      { nameBn: 'ঢাকা', nameEn: 'Dhaka', divisionBn: 'ঢাকা', centerName: 'ঢাকা কেন্দ্রীয় যুব আইসিটি ও এআই ল্যাব, মিরপুর-১০' },
      { nameBn: 'গাজীপুর', nameEn: 'Gazipur', divisionBn: 'ঢাকা', centerName: 'গাজীপুর জেলা যুব প্রশিক্ষণ কেন্দ্র ল্যাব' },
      { nameBn: 'নারায়ণগঞ্জ', nameEn: 'Narayanganj', divisionBn: 'ঢাকা', centerName: 'নারায়ণগঞ্জ আইটি স্কিল ডেভেলপমেন্ট ল্যাব, চাষাঢ়া' },
      { nameBn: 'নরসিংদী', nameEn: 'Narsingdi', divisionBn: 'ঢাকা', centerName: 'নরসিংদী জেলা যুব আইটি সেন্টার' },
      { nameBn: 'মুন্সিগঞ্জ', nameEn: 'Munshiganj', divisionBn: 'ঢাকা', centerName: 'মুন্সিগঞ্জ ডিজিটাল ট্রেনিং ল্যাব' },
      { nameBn: 'মানিকগঞ্জ', nameEn: 'Manikganj', divisionBn: 'ঢাকা', centerName: 'মানিকগঞ্জ যুব কম্পিউটার ও এআই কেন্দ্র' },
      { nameBn: 'টাঙ্গাইল', nameEn: 'Tangail', divisionBn: 'ঢাকা', centerName: 'টাঙ্গাইল জেলা যুব স্কিল ল্যাব' },
      { nameBn: 'কিশোরগঞ্জ', nameEn: 'Kishoreganj', divisionBn: 'ঢাকা', centerName: 'কিশোরগঞ্জ আইসিটি পার্টনার ল্যাব' },
      { nameBn: 'ফরিদপুর', nameEn: 'Faridpur', divisionBn: 'ঢাকা', centerName: 'ফরিদপুর আঞ্চলিক যুব প্রশিক্ষণ ল্যাব' },
      { nameBn: 'গোপালগঞ্জ', nameEn: 'Gopalganj', divisionBn: 'ঢাকা', centerName: 'গোপালগঞ্জ ডিজিটাল ইয়ুথ ল্যাব' },
      { nameBn: 'মাদারীপুর', nameEn: 'Madaripur', divisionBn: 'ঢাকা', centerName: 'মাদারীপুর জেলা আইসিটি প্রশিক্ষণ কেন্দ্র' },
      { nameBn: 'রাজবাড়ী', nameEn: 'Rajbari', divisionBn: 'ঢাকা', centerName: 'রাজবাড়ী যুব কম্পিউটার ল্যাব' },
      { nameBn: 'শরীয়তপুর', nameEn: 'Shariatpur', divisionBn: 'ঢাকা', centerName: 'শরীয়তপুর জেলা যুব আইটি ল্যাব' },
      { nameBn: 'ময়মনসিংহ', nameEn: 'Mymensingh', divisionBn: 'ময়মনসিংহ', centerName: 'ময়মনসিংহ বিভাগীয় এআই ও আইসিটি ল্যাব' },
      { nameBn: 'জামালপুর', nameEn: 'Jamalpur', divisionBn: 'ময়মনসিংহ', centerName: 'জামালপুর যুব প্রশিক্ষণ কেন্দ্র ল্যাব' },
      { nameBn: 'নেত্রকোনা', nameEn: 'Netrokona', divisionBn: 'ময়মনসিংহ', centerName: 'নেত্রকোনা ডিজিটাল স্কিল ল্যাব' },
      { nameBn: 'শেরপুর', nameEn: 'Sherpur', divisionBn: 'ময়মনসিংহ', centerName: 'শেরপুর জেলা যুব আইটি কেন্দ্র' },
    ],
  },
  {
    id: 'pkg-2',
    tabLabel: 'প্যাকেজ-২ (রাজশাহী ও রংপুর)',
    shortLabel: 'প্যাকেজ-২',
    title: 'প্যাকেজ-২: রাজশাহী ও রংপুর বিভাগ (গাইবান্ধা সহ ১৬টি জেলা)',
    divisions: 'রাজশাহী ও রংপুর বিভাগ',
    districtCountBn: '১৬টি জেলা',
    partnerName: 'নর্থ বেঙ্গল এআই অ্যান্ড ডিজিটাল স্কিলস পার্টনার্স (অঞ্চল-২)',
    partnerSubtitle: 'যুব উন্নয়ন অধিদপ্তর অনুমোদিত প্রশিক্ষণ পার্টনার — উত্তরাঞ্চল',
    labCapacity: 'প্রতি জেলায় ডেডিকেটেড AI কম্পিউটার ল্যাব · ৫০–৬০ জন/ব্যাচ',
    coordinatorPhone: '০১৫৫০-৬৬৬৯০২',
    districts: [
      {
        nameBn: 'গাইবান্ধা',
        nameEn: 'Gaibandha',
        divisionBn: 'রংপুর',
        centerName: 'গাইবান্ধা জেলা যুব উন্নয়ন আইসিটি ও এআই ল্যাব, স্টেশন রোড, গাইবান্ধা',
        featured: true,
      },
      { nameBn: 'রংপুর', nameEn: 'Rangpur', divisionBn: 'রংপুর', centerName: 'রংপুর বিভাগীয় যুব এআই প্রশিক্ষণ ল্যাব, জাহাজ কোম্পানি মোড়' },
      { nameBn: 'দিনাজপুর', nameEn: 'Dinajpur', divisionBn: 'রংপুর', centerName: 'দিনাজপুর জেলা যুব আইটি ল্যাব' },
      { nameBn: 'কুড়িগ্রাম', nameEn: 'Kurigram', divisionBn: 'রংপুর', centerName: 'কুড়িগ্রাম যুব ডিজিটাল প্রশিক্ষণ কেন্দ্র' },
      { nameBn: 'লালমনিরহাট', nameEn: 'Lalmonirhat', divisionBn: 'রংপুর', centerName: 'লালমনিরহাট জেলা কম্পিউটার ও এআই ল্যাব' },
      { nameBn: 'নীলফামারী', nameEn: 'Nilphamari', divisionBn: 'রংপুর', centerName: 'নীলফামারী যুব আইসিটি স্কিল সেন্টার' },
      { nameBn: 'পঞ্চগড়', nameEn: 'Panchagarh', divisionBn: 'রংপুর', centerName: 'পঞ্চগড় জেলা যুব প্রশিক্ষণ ল্যাব' },
      { nameBn: 'ঠাকুরগাঁও', nameEn: 'Thakurgaon', divisionBn: 'রংপুর', centerName: 'ঠাকুরগাঁও ডিজিটাল ইয়ুথ ট্রেনিং ল্যাব' },
      { nameBn: 'রাজশাহী', nameEn: 'Rajshahi', divisionBn: 'রাজশাহী', centerName: 'রাজশাহী বিভাগীয় যুব এআই ও হাই-টেক স্কিল ল্যাব' },
      { nameBn: 'বগুড়া', nameEn: 'Bogura', divisionBn: 'রাজশাহী', centerName: 'বগুড়া জেলা যুব আইসিটি ল্যাব, সাতমাথা' },
      { nameBn: 'পাবনা', nameEn: 'Pabna', divisionBn: 'রাজশাহী', centerName: 'পাবনা যুব কম্পিউটার ও এআই কেন্দ্র' },
      { nameBn: 'সিরাজগঞ্জ', nameEn: 'Sirajganj', divisionBn: 'রাজশাহী', centerName: 'সিরাজগঞ্জ জেলা ডিজিটাল প্রশিক্ষণ ল্যাব' },
      { nameBn: 'নাটোর', nameEn: 'Natore', divisionBn: 'রাজশাহী', centerName: 'নাটোর যুব স্কিল ডেভেলপমেন্ট ল্যাব' },
      { nameBn: 'নওগাঁ', nameEn: 'Naogaon', divisionBn: 'রাজশাহী', centerName: 'নওগাঁ জেলা যুব আইটি সেন্টার' },
      { nameBn: 'চাঁপাইনবাবগঞ্জ', nameEn: 'Chapainawabganj', divisionBn: 'রাজশাহী', centerName: 'চাঁপাইনবাবগঞ্জ যুব কম্পিউটার ল্যাব' },
      { nameBn: 'জয়পুরহাট', nameEn: 'Joypurhat', divisionBn: 'রাজশাহী', centerName: 'জয়পুরহাট জেলা আইসিটি ও এআই ল্যাব' },
    ],
  },
  {
    id: 'pkg-3',
    tabLabel: 'প্যাকেজ-৩ (বরিশাল ও খুলনা)',
    shortLabel: 'প্যাকেজ-৩',
    title: 'প্যাকেজ-৩: বরিশাল ও খুলনা বিভাগ',
    divisions: 'বরিশাল ও খুলনা বিভাগ',
    districtCountBn: '১৬টি জেলা',
    partnerName: 'সাউথ-ওয়েস্ট টেকনোলজি অ্যান্ড ইয়ুথ ইনস্টিটিউট (অঞ্চল-৩)',
    partnerSubtitle: 'যুব উন্নয়ন অধিদপ্তর অনুমোদিত প্রশিক্ষণ পার্টনার — দক্ষিণ-পশ্চিমাঞ্চল',
    labCapacity: 'প্রতি জেলায় হাই-স্পিড আইটি ল্যাব · ৫০ জন/ব্যাচ',
    coordinatorPhone: '০১৫৫০-৬৬৬৯০৩',
    districts: [
      { nameBn: 'খুলনা', nameEn: 'Khulna', divisionBn: 'খুলনা', centerName: 'খুলনা বিভাগীয় যুব এআই ও আইসিটি ল্যাব, শিববাড়ী' },
      { nameBn: 'যশোর', nameEn: 'Jashore', divisionBn: 'খুলনা', centerName: 'যশোর সফটওয়্যার ও যুব স্কিল ল্যাব' },
      { nameBn: 'সাতক্ষীরা', nameEn: 'Satkhira', divisionBn: 'খুলনা', centerName: 'সাতক্ষীরা জেলা যুব আইটি কেন্দ্র' },
      { nameBn: 'বাগেরহাট', nameEn: 'Bagerhat', divisionBn: 'খুলনা', centerName: 'বাগেরহাট যুব কম্পিউটার ল্যাব' },
      { nameBn: 'কুষ্টিয়া', nameEn: 'Kushtia', divisionBn: 'খুলনা', centerName: 'কুষ্টিয়া জেলা ডিজিটাল ট্রেনিং সেন্টার' },
      { nameBn: 'ঝিনাইদহ', nameEn: 'Jhenaidah', divisionBn: 'খুলনা', centerName: 'ঝিনাইদহ যুব আইসিটি ও এআই ল্যাব' },
      { nameBn: 'মাগুরা', nameEn: 'Magura', divisionBn: 'খুলনা', centerName: 'মাগুরা জেলা যুব প্রশিক্ষণ ল্যাব' },
      { nameBn: 'নড়াইল', nameEn: 'Narail', divisionBn: 'খুলনা', centerName: 'নড়াইল ডিজিটাল স্কিল ল্যাব' },
      { nameBn: 'চুয়াডাঙ্গা', nameEn: 'Chuadanga', divisionBn: 'খুলনা', centerName: 'চুয়াডাঙ্গা জেলা যুব আইটি সেন্টার' },
      { nameBn: 'মেহেরপুর', nameEn: 'Meherpur', divisionBn: 'খুলনা', centerName: 'মেহেরপুর যুব কম্পিউটার ল্যাব' },
      { nameBn: 'বরিশাল', nameEn: 'Barishal', divisionBn: 'বরিশাল', centerName: 'বরিশাল বিভাগীয় যুব এআই ল্যাব, সদর রোড' },
      { nameBn: 'পটুয়াখালী', nameEn: 'Patuakhali', divisionBn: 'বরিশাল', centerName: 'পটুয়াখালী জেলা যুব আইসিটি কেন্দ্র' },
      { nameBn: 'ভোলা', nameEn: 'Bhola', divisionBn: 'বরিশাল', centerName: 'ভোলা যুব ডিজিটাল প্রশিক্ষণ ল্যাব' },
      { nameBn: 'পিরোজপুর', nameEn: 'Pirojpur', divisionBn: 'বরিশাল', centerName: 'পিরোজপুর জেলা আইটি স্কিল ল্যাব' },
      { nameBn: 'ঝালকাঠি', nameEn: 'Jhalokati', divisionBn: 'বরিশাল', centerName: 'ঝালকাঠি যুব কম্পিউটার কেন্দ্র' },
      { nameBn: 'বরগুনা', nameEn: 'Barguna', divisionBn: 'বরিশাল', centerName: 'বরগুনা জেলা যুব প্রশিক্ষণ ল্যাব' },
    ],
  },
  {
    id: 'pkg-4',
    tabLabel: 'প্যাকেজ-৪ (চট্টগ্রাম ও সিলেট)',
    shortLabel: 'প্যাকেজ-৪',
    title: 'প্যাকেজ-৪: চট্টগ্রাম ও সিলেট বিভাগ',
    divisions: 'চট্টগ্রাম ও সিলেট বিভাগ',
    districtCountBn: '১৫টি জেলা',
    partnerName: 'ইস্টার্ন ডিজিটাল একাডেমি কনসোর্টিয়াম (অঞ্চল-৪)',
    partnerSubtitle: 'যুব উন্নয়ন অধিদপ্তর অনুমোদিত প্রশিক্ষণ পার্টনার — পূর্বাঞ্চল',
    labCapacity: 'প্রতি জেলায় আধুনিক এআই ল্যাব · ৫০–৬০ জন/ব্যাচ',
    coordinatorPhone: '০১৫৫০-৬৬৬৯০৪',
    districts: [
      { nameBn: 'চট্টগ্রাম', nameEn: 'Chattogram', divisionBn: 'চট্টগ্রাম', centerName: 'চট্টগ্রাম বিভাগীয় যুব এআই ও আইসিটি ল্যাব, আগ্রাবাদ' },
      { nameBn: 'কক্সবাজার', nameEn: 'Cox’s Bazar', divisionBn: 'চট্টগ্রাম', centerName: 'কক্সবাজার জেলা যুব ডিজিটাল ল্যাব' },
      { nameBn: 'কুমিল্লা', nameEn: 'Cumilla', divisionBn: 'চট্টগ্রাম', centerName: 'কুমিল্লা জেলা যুব আইসিটি প্রশিক্ষণ কেন্দ্র' },
      { nameBn: 'নোয়াখালী', nameEn: 'Noakhali', divisionBn: 'চট্টগ্রাম', centerName: 'নোয়াখালী যুব কম্পিউটার ও এআই ল্যাব' },
      { nameBn: 'ফেনী', nameEn: 'Feni', divisionBn: 'চট্টগ্রাম', centerName: 'ফেনী জেলা আইটি স্কিল সেন্টার' },
      { nameBn: 'ব্রাহ্মণবাড়িয়া', nameEn: 'Brahmanbaria', divisionBn: 'চট্টগ্রাম', centerName: 'ব্রাহ্মণবাড়িয়া যুব ডিজিটাল ল্যাব' },
      { nameBn: 'চাঁদপুর', nameEn: 'Chandpur', divisionBn: 'চট্টগ্রাম', centerName: 'চাঁদপুর জেলা যুব প্রশিক্ষণ ল্যাব' },
      { nameBn: 'লক্ষ্মীপুর', nameEn: 'Lakshmipur', divisionBn: 'চট্টগ্রাম', centerName: 'লক্ষ্মীপুর যুব আইসিটি ল্যাব' },
      { nameBn: 'রাঙ্গামাটি', nameEn: 'Rangamati', divisionBn: 'চট্টগ্রাম', centerName: 'রাঙ্গামাটি পার্বত্য যুব ডিজিটাল কেন্দ্র' },
      { nameBn: 'বান্দরবান', nameEn: 'Bandarban', divisionBn: 'চট্টগ্রাম', centerName: 'বান্দরবান জেলা যুব কম্পিউটার ল্যাব' },
      { nameBn: 'খাগড়াছড়ি', nameEn: 'Khagrachari', divisionBn: 'চট্টগ্রাম', centerName: 'খাগড়াছড়ি যুব আইসিটি প্রশিক্ষণ ল্যাব' },
      { nameBn: 'সিলেট', nameEn: 'Sylhet', divisionBn: 'সিলেট', centerName: 'সিলেট বিভাগীয় যুব এআই ল্যাব, জিন্দাবাজার' },
      { nameBn: 'মৌলভীবাজার', nameEn: 'Moulvibazar', divisionBn: 'সিলেট', centerName: 'মৌলভীবাজার জেলা যুব আইটি সেন্টার' },
      { nameBn: 'হবিগঞ্জ', nameEn: 'Habiganj', divisionBn: 'সিলেট', centerName: 'হবিগঞ্জ যুব কম্পিউটার ও এআই ল্যাব' },
      { nameBn: 'সুনামগঞ্জ', nameEn: 'Sunamganj', divisionBn: 'সিলেট', centerName: 'সুনামগঞ্জ জেলা ডিজিটাল স্কিল ল্যাব' },
    ],
  },
];

export const ALL_DISTRICTS_FLAT = TRAINING_PACKAGES.flatMap((pkg) =>
  pkg.districts.map((d) => ({
    ...d,
    packageId: pkg.id,
    packageShort: pkg.shortLabel,
    packageTitle: pkg.title,
    partnerName: pkg.partnerName,
  }))
);

export const SAMPLE_APPLICATIONS: ApplicationRecord[] = [
  {
    trackingId: 'DYD-B3-2026-8492',
    rollNo: '302-19-0482',
    nameBn: 'মোঃ তানভীর আহমেদ সরকার',
    nameEn: 'Md. Tanvir Ahmed Sarker',
    fatherName: 'মোঃ আব্দুল হালিম সরকার',
    motherName: 'মোছাঃ রাশিদা বেগম',
    dob: '2001-05-14',
    ageYears: 25,
    nidOrBirthNo: '5512984310',
    districtBn: 'গাইবান্ধা',
    districtEn: 'Gaibandha',
    packageTitle: 'প্যাকেজ-২: রাজশাহী ও রংপুর বিভাগ',
    examCenter: 'গাইবান্ধা জেলা যুব উন্নয়ন আইসিটি ও এআই ল্যাব, স্টেশন রোড, গাইবান্ধা',
    education: 'স্নাতক / অনার্স (Honours)',
    mobile: '01712345678',
    email: 'tanvir.gaibandha@example.com',
    submittedAt: '২০ নভেম্বর ২০২৬',
  },
  {
    trackingId: 'DYD-B3-2026-4120',
    rollNo: '301-01-1104',
    nameBn: 'সাদিয়া আফরিন মিম',
    nameEn: 'Sadia Afrin Mim',
    fatherName: 'মোঃ শহিদুল ইসলাম',
    motherName: 'সালমা আক্তার',
    dob: '2003-09-22',
    ageYears: 23,
    nidOrBirthNo: '7823410956',
    districtBn: 'ঢাকা',
    districtEn: 'Dhaka',
    packageTitle: 'প্যাকেজ-১: ঢাকা ও ময়মনসিংহ বিভাগ',
    examCenter: 'ঢাকা কেন্দ্রীয় যুব আইসিটি ও এআই ল্যাব, মিরপুর-১০',
    education: 'এইচএসসি (HSC) বা সমমান',
    mobile: '01819876543',
    email: 'sadia.dhaka@example.com',
    submittedAt: '১৯ নভেম্বর ২০২৬',
  },
];

export const STORAGE_KEY = 'dydaibatch03_applications_v1';

export function getStoredApplications(): ApplicationRecord[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveApplicationRecord(record: ApplicationRecord): void {
  try {
    const existing = getStoredApplications();
    const updated = [record, ...existing.filter((item) => item.trackingId !== record.trackingId)];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore storage quota errors in private contexts
  }
}

export function findApplicationByQuery(query: string): ApplicationRecord | null {
  const normalized = query.trim().toLowerCase().replace(/\s+/g, '');
  if (!normalized) return null;
  const all = [...getStoredApplications(), ...SAMPLE_APPLICATIONS];
  return (
    all.find(
      (item) =>
        item.trackingId.toLowerCase() === normalized ||
        item.mobile.replace(/[^0-9]/g, '') === normalized.replace(/[^0-9]/g, '')
    ) ?? null
  );
}

export function toBengaliDigits(input: string | number): string {
  const map: Record<string, string> = {
    '0': '০',
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯',
  };
  return String(input).replace(/[0-9]/g, (d) => map[d] || d);
}
