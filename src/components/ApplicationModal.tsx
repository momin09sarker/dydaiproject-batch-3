import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Copy,
  FileDown,
  MapPin,
  ShieldCheck,
  X,
} from 'lucide-react';
import {
  ALL_DISTRICTS_FLAT,
  ApplicationRecord,
  TRAINING_PACKAGES,
  saveApplicationRecord,
  toBengaliDigits,
} from '../data/projectData';

interface ApplicationModalProps {
  isOpen: boolean;
  initialDistrictEn?: string;
  onClose: () => void;
  onSuccessOpenAdmitCard: (trackingId: string) => void;
}

const EDUCATION_OPTIONS = [
  'এইচএসসি (HSC) বা সমমান',
  'ডিপ্লোমা ইন ইঞ্জিনিয়ারিং / সমমান',
  'স্নাতক / অনার্স (Honours)',
  'স্নাতকোত্তর / মাস্টার্স (Masters)',
];

// Calculate exact age as of the application deadline: 24 November 2026
function calculateAgeAtDeadline(dobStr: string): { years: number; months: number; valid: boolean } | null {
  if (!dobStr) return null;
  const birth = new Date(`${dobStr}T00:00:00`);
  if (Number.isNaN(birth.getTime())) return null;

  const refDate = new Date('2026-11-24T00:00:00');
  let years = refDate.getFullYear() - birth.getFullYear();
  let months = refDate.getMonth() - birth.getMonth();
  const days = refDate.getDate() - birth.getDate();

  if (days < 0) {
    months -= 1;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return {
    years,
    months,
    valid: years >= 18 && years <= 35,
  };
}

export default function ApplicationModal({
  isOpen,
  initialDistrictEn,
  onClose,
  onSuccessOpenAdmitCard,
}: ApplicationModalProps) {
  const [nameBn, setNameBn] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [dob, setDob] = useState('');
  const [nidOrBirthNo, setNidOrBirthNo] = useState('');
  const [districtEn, setDistrictEn] = useState('Gaibandha');
  const [education, setEducation] = useState(EDUCATION_OPTIONS[0]);
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [declaration, setDeclaration] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedRecord, setSubmittedRecord] = useState<ApplicationRecord | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialDistrictEn) {
      setDistrictEn(initialDistrictEn);
    }
  }, [initialDistrictEn]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const selectedDistrictInfo = useMemo(
    () =>
      ALL_DISTRICTS_FLAT.find((d) => d.nameEn === districtEn) ??
      ALL_DISTRICTS_FLAT.find((d) => d.nameEn === 'Gaibandha')!,
    [districtEn]
  );

  const ageInfo = useMemo(() => calculateAgeAtDeadline(dob), [dob]);

  if (!isOpen) return null;

  const resetForm = () => {
    setNameBn('');
    setNameEn('');
    setFatherName('');
    setMotherName('');
    setDob('');
    setNidOrBirthNo('');
    setDistrictEn('Gaibandha');
    setEducation(EDUCATION_OPTIONS[0]);
    setMobile('');
    setEmail('');
    setDeclaration(true);
    setErrorMsg(null);
    setSubmittedRecord(null);
    setCopied(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!nameBn.trim() || !nameEn.trim() || !fatherName.trim() || !motherName.trim()) {
      setErrorMsg('অনুগ্রহ করে প্রার্থীর নাম (বাংলা ও ইংরেজি), পিতা ও মাতার নাম সঠিকভাবে পূরণ করুন।');
      return;
    }

    if (!dob || !ageInfo) {
      setErrorMsg('অনুগ্রহ করে সঠিক জন্ম তারিখ নির্বাচন করুন।');
      return;
    }

    if (!ageInfo.valid) {
      setErrorMsg(
        `আপনার বয়স ${toBengaliDigits(ageInfo.years)} বছর (${ageInfo.years} yrs)। আবেদনের জন্য বয়স ১৮ হতে ৩৫ বছরের মধ্যে হতে হবে।`
      );
      return;
    }

    const cleanNid = nidOrBirthNo.replace(/\s+/g, '');
    if (!/^\d{10}$|^\d{13}$|^\d{17}$/.test(cleanNid)) {
      setErrorMsg('জাতীয় পরিচয়পত্র (NID) বা জন্ম নিবন্ধন নম্বর অবশ্যই ১০, ১৩ অথবা ১৭ সংখ্যার হতে হবে।');
      return;
    }

    const cleanMobile = mobile.replace(/[\s-]/g, '');
    if (!/^01[3-9]\d{8}$/.test(cleanMobile)) {
      setErrorMsg('অনুগ্রহ করে ১১ সংখ্যার সঠিক বাংলাদেশি মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)।');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('অনুগ্রহ করে একটি সঠিক ইমেইল ঠিকানা প্রদান করুন।');
      return;
    }

    if (!declaration) {
      setErrorMsg('আবেদন জমা দেওয়ার জন্য তথ্য সত্যতা ও কারিগরি যোগ্যতার ঘোষণাপত্রে টিক চিহ্ন দিন।');
      return;
    }

    const random4 = Math.floor(1000 + Math.random() * 9000);
    const trackingId = `DYD-B3-2026-${random4}`;
    const pkgNumber = selectedDistrictInfo.packageId.replace('pkg-', '');
    const rollNo = `30${pkgNumber}-${String(Math.floor(10 + Math.random() * 89))}-${random4}`;

    const record: ApplicationRecord = {
      trackingId,
      rollNo,
      nameBn: nameBn.trim(),
      nameEn: nameEn.trim(),
      fatherName: fatherName.trim(),
      motherName: motherName.trim(),
      dob,
      ageYears: ageInfo.years,
      nidOrBirthNo: cleanNid,
      districtBn: selectedDistrictInfo.nameBn,
      districtEn: selectedDistrictInfo.nameEn,
      packageTitle: selectedDistrictInfo.packageTitle,
      examCenter: selectedDistrictInfo.centerName,
      education,
      mobile: cleanMobile,
      email: email.trim(),
      submittedAt: '২০ নভেম্বর ২০২৬',
    };

    saveApplicationRecord(record);
    setSubmittedRecord(record);
  };

  const handleCopyId = async () => {
    if (!submittedRecord) return;
    try {
      await navigator.clipboard.writeText(submittedRecord.trackingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="apply-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-2xl my-auto max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-5 bg-slate-900 text-white flex items-start justify-between gap-4 shrink-0">
          <div>
            <p className="text-xs text-emerald-300 font-medium">
              যুব উন্নয়ন অধিদপ্তর · ব্যাচ-০৩ (সম্পূর্ণ বিনামূল্যে)
            </p>
            <h2 id="apply-modal-title" className="text-xl font-bold mt-1">
              {submittedRecord ? 'অনলাইন আবেদন সফলভাবে সম্পন্ন হয়েছে' : 'অনলাইন ভর্তি আবেদন ফরম'}
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          {submittedRecord ? (
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3.5">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    অভিনন্দন, {submittedRecord.nameBn}!
                  </h3>
                  <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                    কৃত্রিম বুদ্ধিমত্তা (AI) প্রযুক্তির মাধ্যমে দক্ষতা উন্নয়ন প্রকল্প (ব্যাচ-০৩) এর জন্য আপনার আবেদনটি গৃহীত হয়েছে। নিচের ট্র্যাকিং আইডিটি সংরক্ষণ করুন।
                  </p>
                </div>
              </div>

              {/* Tracking ID Highlight Box */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    আবেদন ট্র্যাকিং আইডি (Application Tracking ID)
                  </p>
                  <p className="font-en text-2xl font-bold tracking-tight text-slate-900 mt-1">
                    {submittedRecord.trackingId}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCopyId}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-slate-800 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Copy className="w-4 h-4 text-teal-700" />
                  <span>{copied ? 'কপি হয়েছে' : 'আইডি কপি করুন'}</span>
                </button>
              </div>

              {/* Summary Table */}
              <div className="border border-slate-200 rounded-xl divide-y divide-slate-200 text-sm">
                <div className="px-4 py-3 flex justify-between gap-4">
                  <span className="text-slate-500">প্রার্থীর নাম</span>
                  <span className="font-semibold text-slate-900 text-right">
                    {submittedRecord.nameBn} ({submittedRecord.nameEn})
                  </span>
                </div>
                <div className="px-4 py-3 flex justify-between gap-4">
                  <span className="text-slate-500">রোল নম্বর (সম্ভাব্য)</span>
                  <span className="font-en font-semibold text-slate-900">
                    {submittedRecord.rollNo}
                  </span>
                </div>
                <div className="px-4 py-3 flex justify-between gap-4">
                  <span className="text-slate-500">নির্বাচিত জেলা ও প্যাকেজ</span>
                  <span className="font-semibold text-slate-900 text-right">
                    {submittedRecord.districtBn} · {submittedRecord.packageTitle.split(':')[0]}
                  </span>
                </div>
                <div className="px-4 py-3 flex justify-between gap-4">
                  <span className="text-slate-500">নির্ধারিত পরীক্ষা কেন্দ্র</span>
                  <span className="font-medium text-slate-800 text-right max-w-xs">
                    {submittedRecord.examCenter}
                  </span>
                </div>
                <div className="px-4 py-3 flex justify-between gap-4">
                  <span className="text-slate-500">লিখিত ও মৌখিক পরীক্ষা</span>
                  <span className="font-semibold text-emerald-700 text-right">
                    ২৮ ও ২৯ নভেম্বর ২০২৬
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full sm:w-auto px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  নতুন আবেদন করুন
                </button>
                <button
                  type="button"
                  onClick={() => onSuccessOpenAdmitCard(submittedRecord.trackingId)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  <FileDown className="w-4 h-4" />
                  <span>প্রবেশপত্র দেখুন ও ডাউনলোড করুন</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {errorMsg && (
                <div
                  role="alert"
                  className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-sm text-red-800"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Candidate Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nameBn" className="block text-sm font-semibold text-slate-800 mb-1.5">
                    প্রার্থীর পূর্ণ নাম (বাংলায়) <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="nameBn"
                    type="text"
                    required
                    value={nameBn}
                    onChange={(e) => setNameBn(e.target.value)}
                    placeholder="যেমন: মোঃ রাকিবুল ইসলাম"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                  />
                </div>
                <div>
                  <label htmlFor="nameEn" className="block text-sm font-semibold text-slate-800 mb-1.5">
                    Full Name (English) <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="nameEn"
                    type="text"
                    required
                    value={nameEn}
                    onChange={(e) => setNameEn(e.target.value)}
                    placeholder="e.g. Md. Rakibul Islam"
                    className="font-en w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                  />
                </div>
              </div>

              {/* Father / Mother Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fatherName" className="block text-sm font-semibold text-slate-800 mb-1.5">
                    পিতার নাম <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="fatherName"
                    type="text"
                    required
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                    placeholder="পিতার পূর্ণ নাম লিখুন"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                  />
                </div>
                <div>
                  <label htmlFor="motherName" className="block text-sm font-semibold text-slate-800 mb-1.5">
                    মাতার নাম <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="motherName"
                    type="text"
                    required
                    value={motherName}
                    onChange={(e) => setMotherName(e.target.value)}
                    placeholder="মাতার পূর্ণ নাম লিখুন"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                  />
                </div>
              </div>

              {/* DOB + NID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dob" className="block text-sm font-semibold text-slate-800 mb-1.5">
                    জন্ম তারিখ (বয়স ১৮–৩৫ বছর) <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="dob"
                    type="date"
                    required
                    max="2008-11-24"
                    min="1990-11-25"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="font-en w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                  />
                  {ageInfo && (
                    <div
                      className={`mt-1.5 flex items-center gap-1.5 text-xs font-medium ${
                        ageInfo.valid ? 'text-emerald-700' : 'text-red-700'
                      }`}
                    >
                      {ageInfo.valid ? (
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      )}
                      <span>
                        বয়স (২৪ নভে ২০২৬ অনুযায়ী): {toBengaliDigits(ageInfo.years)} বছর{' '}
                        {toBengaliDigits(ageInfo.months)} মাস —{' '}
                        {ageInfo.valid ? 'আবেদনের উপযোগী' : 'বয়সসীমা ১৮–৩৫ বছরের বাইরে'}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="nid" className="block text-sm font-semibold text-slate-800 mb-1.5">
                    এনআইডি / জন্ম নিবন্ধন নম্বর <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="nid"
                    type="text"
                    inputMode="numeric"
                    required
                    value={nidOrBirthNo}
                    onChange={(e) => setNidOrBirthNo(e.target.value)}
                    placeholder="১০, ১৩ বা ১৭ সংখ্যার নম্বর"
                    className="font-en w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                  />
                </div>
              </div>

              {/* District + Education */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="district" className="block text-sm font-semibold text-slate-800 mb-1.5">
                    প্রশিক্ষণ জেলা নির্বাচন করুন <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="district"
                    value={districtEn}
                    onChange={(e) => setDistrictEn(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                  >
                    <optgroup label="বিশেষ নির্বাচিত কেন্দ্র (প্যাকেজ-২)">
                      <option value="Gaibandha">★ গাইবান্ধা (Gaibandha) — প্যাকেজ-২</option>
                    </optgroup>
                    {TRAINING_PACKAGES.map((pkg) => (
                      <optgroup key={pkg.id} label={pkg.tabLabel}>
                        {pkg.districts.map((d) => (
                          <option key={`${pkg.id}-${d.nameEn}`} value={d.nameEn}>
                            {d.nameBn} ({d.nameEn})
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="education" className="block text-sm font-semibold text-slate-800 mb-1.5">
                    সর্বোচ্চ শিক্ষাগত যোগ্যতা <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="education"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                  >
                    {EDUCATION_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dynamic Selected Center Preview */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <MapPin className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed">
                  <p className="font-semibold text-slate-900">
                    {selectedDistrictInfo.nameBn} জেলা কেন্দ্র · {selectedDistrictInfo.packageShort}
                  </p>
                  <p className="text-slate-600 mt-0.5">{selectedDistrictInfo.centerName}</p>
                </div>
              </div>

              {/* Mobile + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="mobile" className="block text-sm font-semibold text-slate-800 mb-1.5">
                    মোবাইল নম্বর (SMS আপডেটের জন্য) <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="mobile"
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="font-en w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-800 mb-1.5">
                    ইমেইল ঠিকানা (Email) <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="applicant@email.com"
                    className="font-en w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                  />
                </div>
              </div>

              {/* Declaration */}
              <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={declaration}
                  onChange={(e) => setDeclaration(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600 shrink-0"
                />
                <span className="text-xs text-slate-600 leading-relaxed">
                  আমি প্রত্যয়ন করছি যে উপরে প্রদত্ত সকল তথ্য সত্য এবং আমার প্রাথমিক কম্পিউটার ও মৌলিক ইংরেজি ব্যবহারিক জ্ঞান রয়েছে। নির্বাচিত হলে ২ মাস মেয়াদি (৩০০ ঘণ্টা) নিয়মিত ল্যাব ক্লাসে অংশগ্রহণ করতে সম্মত আছি।
                </span>
              </label>

              {/* Submit Footer */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>কোনো আবেদন ফি প্রযোজ্য নয় (১০০% বিনামূল্যে)</span>
                </div>
                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-sm font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 active:bg-emerald-800 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    আবেদন জমা দিন
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
