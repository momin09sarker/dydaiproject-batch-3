import { FormEvent, useEffect, useState } from 'react';
import {
  AlertCircle,
  BrainCircuit,
  CheckCircle2,
  Download,
  Printer,
  Search,
  X,
} from 'lucide-react';
import {
  ApplicationRecord,
  SAMPLE_APPLICATIONS,
  findApplicationByQuery,
  getStoredApplications,
  toBengaliDigits,
} from '../data/projectData';

interface AdmitCardModalProps {
  isOpen: boolean;
  initialQuery?: string;
  onClose: () => void;
}

function buildAdmitCardHtml(record: ApplicationRecord): string {
  return `<!doctype html>
<html lang="bn">
<head>
  <meta charset="UTF-8" />
  <title>Admit Card - ${record.trackingId}</title>
  <style>
    body { font-family: 'Hind Siliguri', Arial, sans-serif; color: #0f172a; margin: 0; padding: 32px; background: #f8fafc; }
    .card { max-width: 760px; margin: 0 auto; background: #fff; border: 2px solid #0f172a; padding: 28px; }
    .header { text-align: center; border-bottom: 2px solid #059669; padding-bottom: 16px; margin-bottom: 20px; }
    .gov { font-size: 13px; color: #334155; margin: 0; }
    .title { font-size: 20px; font-weight: 700; margin: 6px 0; color: #0f172a; }
    .sub { font-size: 15px; font-weight: 600; color: #059669; margin: 4px 0 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 14px; }
    td { border: 1px solid #cbd5e1; padding: 10px 12px; }
    td.label { width: 34%; background: #f8fafc; font-weight: 600; color: #334155; }
    .notes { margin-top: 18px; padding: 14px; background: #f8fafc; border: 1px solid #e2e8f0; font-size: 13px; line-height: 1.65; }
    .sign { display: flex; justify-content: space-between; margin-top: 40px; font-size: 13px; }
    .sign div { border-top: 1px solid #475569; padding-top: 6px; width: 200px; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <p class="gov">গণপ্রজাতন্ত্রী বাংলাদেশ সরকার | যুব ও ক্রীড়া মন্ত্রণালয় | যুব উন্নয়ন অধিদপ্তর</p>
      <h1 class="title">কৃত্রিম বুদ্ধিমত্তা (AI) প্রযুক্তির মাধ্যমে দক্ষতা উন্নয়ন প্রকল্প (ব্যাচ-০৩)</h1>
      <p class="sub">প্রবেশপত্র (ADMIT CARD) — লিখিত ও মৌখিক ভর্তি পরীক্ষা</p>
    </div>
    <table>
      <tr><td class="label">আবেদন ট্র্যাকিং আইডি</td><td><strong>${record.trackingId}</strong></td></tr>
      <tr><td class="label">পরীক্ষার রোল নম্বর</td><td><strong>${record.rollNo}</strong></td></tr>
      <tr><td class="label">প্রার্থীর নাম (বাংলা ও ইংরেজি)</td><td>${record.nameBn} (${record.nameEn})</td></tr>
      <tr><td class="label">পিতার নাম / মাতার নাম</td><td>${record.fatherName} / ${record.motherName}</td></tr>
      <tr><td class="label">শিক্ষাগত যোগ্যতা ও মোবাইল</td><td>${record.education} | ${record.mobile}</td></tr>
      <tr><td class="label">জেলা ও অঞ্চল</td><td>${record.districtBn} (${record.districtEn}) — ${record.packageTitle}</td></tr>
      <tr><td class="label">পরীক্ষার কেন্দ্র</td><td>${record.examCenter}</td></tr>
      <tr><td class="label">লিখিত পরীক্ষার তারিখ ও সময়</td><td>২৮ নভেম্বর ২০২৬ · সকাল ১০:০০ ঘটিকা (রিপোর্টিং: ৯:৩০)</td></tr>
      <tr><td class="label">মৌখিক পরীক্ষা (ভাইভা)</td><td>২৯ নভেম্বর ২০২৬ · সকাল ১০:০০ ঘটিকা হতে</td></tr>
    </table>
    <div class="notes">
      <strong>পরীক্ষার্থীদের জন্য নির্দেশাবলী:</strong><br/>
      ১. পরীক্ষার হলে মূল জাতীয় পরিচয়পত্র (NID) অথবা জন্ম নিবন্ধন সনদ ও এই প্রবেশপত্রের প্রিন্ট কপি অবশ্যই সঙ্গে আনতে হবে।<br/>
      ২. পরীক্ষা শুরুর অন্তত ৩০ মিনিট পূর্বে নির্ধারিত কেন্দ্রে উপস্থিত হতে হবে।<br/>
      ৩. চূড়ান্ত মেধা তালিকা প্রকাশ: ৩০ নভেম্বর ২০২৬ এবং ক্লাস শুরু: ১ ডিসেম্বর ২০২৬।
    </div>
    <div class="sign">
      <div>প্রার্থীর স্বাক্ষর</div>
      <div>প্রকল্প পরিচালক (dydaibatch03)</div>
    </div>
  </div>
</body>
</html>`;
}

export default function AdmitCardModal({
  isOpen,
  initialQuery = '',
  onClose,
}: AdmitCardModalProps) {
  const [query, setQuery] = useState(initialQuery);
  const [record, setRecord] = useState<ApplicationRecord | null>(null);
  const [notFound, setNotFound] = useState(false);

  const recentStored = isOpen ? getStoredApplications() : [];

  useEffect(() => {
    if (!isOpen) return;
    if (initialQuery) {
      setQuery(initialQuery);
      const found = findApplicationByQuery(initialQuery);
      setRecord(found);
      setNotFound(!found);
    } else {
      setNotFound(false);
    }
  }, [isOpen, initialQuery]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLookup = (searchValue: string) => {
    setQuery(searchValue);
    const found = findApplicationByQuery(searchValue);
    if (found) {
      setRecord(found);
      setNotFound(false);
    } else {
      setRecord(null);
      setNotFound(true);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleLookup(query);
  };

  const handleDownloadHtml = () => {
    if (!record) return;
    const html = buildAdmitCardHtml(record);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AdmitCard_${record.trackingId}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admit-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-2xl my-auto max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-slate-900 text-white flex items-start justify-between gap-4 shrink-0">
          <div>
            <p className="text-xs text-teal-300 font-medium">
              dydaibatch03 · প্রবেশপত্র ও ফলাফল অনুসন্ধান
            </p>
            <h2 id="admit-modal-title" className="text-xl font-bold mt-1">
              প্রবেশপত্র ডাউনলোড ও আবেদনের অবস্থা যাচাই
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
            aria-label="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Search Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <label htmlFor="admit-search" className="block text-sm font-semibold text-slate-800">
              আবেদন ট্র্যাকিং আইডি (Tracking ID) অথবা মোবাইল নম্বর লিখুন
            </label>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="admit-search"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="যেমন: DYD-B3-2026-8492 অথবা 01712345678"
                  className="font-en w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                অনুসন্ধান করুন
              </button>
            </div>

            {/* Quick Lookup Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-500">
              <span>নমুনা বা সাম্প্রতিক আইডি:</span>
              {recentStored.slice(0, 2).map((item) => (
                <button
                  key={item.trackingId}
                  type="button"
                  onClick={() => handleLookup(item.trackingId)}
                  className="font-en px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
                >
                  {item.trackingId} ({item.districtBn})
                </button>
              ))}
              {SAMPLE_APPLICATIONS.map((sample) => (
                <button
                  key={sample.trackingId}
                  type="button"
                  onClick={() => handleLookup(sample.trackingId)}
                  className="font-en px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  {sample.trackingId} ({sample.districtBn})
                </button>
              ))}
            </div>
          </form>

          {notFound && (
            <div
              role="alert"
              className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-sm text-amber-900"
            >
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">কোনো আবেদন পাওয়া যায়নি</p>
                <p className="text-xs text-amber-800 mt-0.5">
                  সঠিক ট্র্যাকিং আইডি (যেমন: <span className="font-en font-semibold">DYD-B3-2026-8492</span>) বা ১১ সংখ্যার মোবাইল নম্বর (<span className="font-en font-semibold">01712345678</span>) দিয়ে পুনরায় চেষ্টা করুন।
                </p>
              </div>
            </div>
          )}

          {/* Official Admit Card Preview */}
          {record && (
            <div className="space-y-4">
              <div
                id="admit-card-printable"
                className="bg-white border-2 border-slate-900 rounded-xl overflow-hidden"
              >
                {/* Official Banner */}
                <div className="px-5 py-4 bg-slate-50 border-b-2 border-emerald-600 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center shrink-0">
                      <BrainCircuit className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-600">
                        গণপ্রজাতন্ত্রী বাংলাদেশ সরকার · যুব ও ক্রীড়া মন্ত্রণালয় · যুব উন্নয়ন অধিদপ্তর
                      </p>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                        কৃত্রিম বুদ্ধিমত্তা (AI) দক্ষতা উন্নয়ন প্রকল্প — ব্যাচ ০৩
                      </h3>
                      <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                        প্রবেশপত্র (ADMIT CARD) · লিখিত ও মৌখিক পরীক্ষা
                      </p>
                    </div>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <p className="text-xs text-slate-500">পরীক্ষার রোল নম্বর</p>
                    <p className="font-en text-lg font-bold text-slate-900 tracking-tight">
                      {record.rollNo}
                    </p>
                  </div>
                </div>

                {/* Candidate Details Grid */}
                <div className="p-5 grid grid-cols-1 md:grid-cols-12 gap-5">
                  <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 text-sm">
                    <div>
                      <p className="text-xs text-slate-500">ট্র্যাকিং আইডি</p>
                      <p className="font-en font-bold text-slate-900 mt-0.5">{record.trackingId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">আবেদনের অবস্থা</p>
                      <p className="inline-flex items-center gap-1 font-semibold text-emerald-700 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>লিখিত পরীক্ষার জন্য অনুমোদিত</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">প্রার্থীর নাম (বাংলায়)</p>
                      <p className="font-semibold text-slate-900 mt-0.5">{record.nameBn}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Candidate Name (English)</p>
                      <p className="font-en font-semibold text-slate-900 mt-0.5">{record.nameEn}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">পিতার নাম</p>
                      <p className="font-medium text-slate-800 mt-0.5">{record.fatherName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">মাতার নাম</p>
                      <p className="font-medium text-slate-800 mt-0.5">{record.motherName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">বয়স ও এনআইডি / জন্মনিবন্ধন</p>
                      <p className="font-en font-medium text-slate-800 mt-0.5">
                        {toBengaliDigits(record.ageYears)} বছর · {record.nidOrBirthNo}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">মোবাইল ও শিক্ষাগত যোগ্যতা</p>
                      <p className="font-medium text-slate-800 mt-0.5">
                        <span className="font-en">{record.mobile}</span> · {record.education}
                      </p>
                    </div>
                  </div>

                  {/* Verification Block */}
                  <div className="md:col-span-3 flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <svg
                      viewBox="0 0 64 64"
                      className="w-20 h-20 text-slate-900"
                      aria-label="ভেরিফিকেশন কিউআর কোড"
                    >
                      <rect x="2" y="2" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="4" />
                      <rect x="8" y="8" width="6" height="6" fill="currentColor" />
                      <rect x="44" y="2" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="4" />
                      <rect x="50" y="8" width="6" height="6" fill="currentColor" />
                      <rect x="2" y="44" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="4" />
                      <rect x="8" y="50" width="6" height="6" fill="currentColor" />
                      <rect x="26" y="6" width="6" height="6" fill="currentColor" />
                      <rect x="26" y="18" width="6" height="12" fill="currentColor" />
                      <rect x="36" y="26" width="8" height="6" fill="currentColor" />
                      <rect x="24" y="36" width="10" height="6" fill="currentColor" />
                      <rect x="40" y="38" width="6" height="10" fill="currentColor" />
                      <rect x="50" y="44" width="10" height="6" fill="currentColor" />
                      <rect x="28" y="50" width="6" height="10" fill="currentColor" />
                      <rect x="48" y="54" width="12" height="6" fill="currentColor" />
                    </svg>
                    <p className="font-en text-[11px] font-semibold text-slate-700 mt-2">
                      {record.trackingId}
                    </p>
                    <p className="text-[11px] text-slate-500">ভেরিফায়েড প্রবেশপত্র</p>
                  </div>
                </div>

                {/* Exam Schedule & Center Strip */}
                <div className="px-5 py-4 bg-slate-50 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-slate-500">জেলা ও পরীক্ষা কেন্দ্র</p>
                    <p className="font-semibold text-slate-900 mt-0.5">{record.districtBn} জেলা</p>
                    <p className="text-xs text-slate-600 mt-0.5 leading-snug">{record.examCenter}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">লিখিত পরীক্ষা</p>
                    <p className="font-semibold text-slate-900 mt-0.5">২৮ নভেম্বর ২০২৬</p>
                    <p className="text-xs text-slate-600 mt-0.5">সকাল ১০:০০ ঘটিকা (রিপোর্টিং ৯:৩০)</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">মৌখিক পরীক্ষা (ভাইভা)</p>
                    <p className="font-semibold text-slate-900 mt-0.5">২৯ নভেম্বর ২০২৬</p>
                    <p className="text-xs text-slate-600 mt-0.5">চূড়ান্ত ফলাফল: ৩০ নভেম্বর ২০২৬</p>
                  </div>
                </div>

                {/* Instructions */}
                <div className="px-5 py-3.5 bg-white border-t border-slate-200 text-xs text-slate-600 leading-relaxed">
                  <span className="font-semibold text-slate-800">নির্দেশাবলী: </span>
                  পরীক্ষার কেন্দ্রে মূল জাতীয় পরিচয়পত্র (NID) অথবা জন্মনিবন্ধন সনদ ও প্রবেশপত্রের প্রিন্ট কপি সঙ্গে আনতে হবে। পরীক্ষা শুরুর ৩০ মিনিট পূর্বে আসন গ্রহণ করতে হবে।
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-800 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-slate-700" />
                  <span>প্রিন্ট / PDF সংরক্ষণ</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadHtml}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>প্রবেশপত্র ডাউনলোড করুন</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
