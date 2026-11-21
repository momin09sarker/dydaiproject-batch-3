import { useMemo, useState } from 'react';
import { ArrowUpRight, Building2, MapPin, Phone, Search, Star } from 'lucide-react';
import { TRAINING_PACKAGES } from '../data/projectData';

interface CentersSectionProps {
  onApplyForDistrict: (districtEn: string) => void;
}

export default function CentersSection({ onApplyForDistrict }: CentersSectionProps) {
  const [activePackageId, setActivePackageId] = useState<string>('pkg-2');
  const [searchQuery, setSearchQuery] = useState('');

  const activePackage =
    TRAINING_PACKAGES.find((p) => p.id === activePackageId) ?? TRAINING_PACKAGES[0];

  const trimmedQuery = searchQuery.trim().toLowerCase();

  const filteredDistricts = useMemo(() => {
    if (!trimmedQuery) {
      return activePackage.districts.map((d) => ({
        ...d,
        packageShort: activePackage.shortLabel,
      }));
    }
    // Search across all 64 districts when user types a search query
    return TRAINING_PACKAGES.flatMap((pkg) =>
      pkg.districts
        .filter(
          (d) =>
            d.nameBn.toLowerCase().includes(trimmedQuery) ||
            d.nameEn.toLowerCase().includes(trimmedQuery) ||
            d.divisionBn.toLowerCase().includes(trimmedQuery) ||
            d.centerName.toLowerCase().includes(trimmedQuery)
        )
        .map((d) => ({
          ...d,
          packageShort: pkg.shortLabel,
        }))
    );
  }, [activePackage, trimmedQuery]);

  return (
    <section id="centers" className="py-20 lg:py-24 bg-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-teal-700">
              দেশব্যাপী প্রশিক্ষণ নেটওয়ার্ক · ৪টি প্যাকেজ · ৬৪ জেলা
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 tracking-tight text-balance">
              প্রশিক্ষণ অঞ্চল ও প্যাকেজ পরিচিতি
            </h2>
            <p className="text-base text-slate-600 mt-3 leading-relaxed">
              যুব উন্নয়ন অধিদপ্তরের অনুমোদিত আঞ্চলিক পার্টনার প্রতিষ্ঠানের মাধ্যমে দেশের ৬৪টি জেলায় সরাসরি কম্পিউটার ল্যাবে প্রশিক্ষণ পরিচালিত হচ্ছে।
            </p>
          </div>

          {/* District Search Input */}
          <div className="w-full lg:w-80 shrink-0">
            <label htmlFor="district-search" className="sr-only">
              আপনার জেলা খুঁজুন
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="district-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="আপনার জেলা খুঁজুন (যেমন: গাইবান্ধা, ঢাকা)..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-500 focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
              />
            </div>
          </div>
        </div>

        {/* Interactive Package Tabs */}
        <div
          role="tablist"
          aria-label="প্রশিক্ষণ প্যাকেজ তালিকা"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200 mb-8"
        >
          {TRAINING_PACKAGES.map((pkg) => {
            const isSelected = pkg.id === activePackage.id && !trimmedQuery;
            return (
              <button
                key={pkg.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => {
                  setActivePackageId(pkg.id);
                  setSearchQuery('');
                }}
                className={`px-4 py-3 rounded-lg text-left transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-white/80 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-bold whitespace-nowrap">{pkg.shortLabel}</span>
                  <span
                    className={`text-xs tabular-nums whitespace-nowrap ${
                      isSelected ? 'text-emerald-300' : 'text-slate-500'
                    }`}
                  >
                    {pkg.districtCountBn}
                  </span>
                </div>
                <p
                  className={`text-xs mt-1 truncate ${
                    isSelected ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  {pkg.divisions}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Package Summary Header (shown when not global searching) */}
        {!trimmedQuery ? (
          <div className="mb-8 p-6 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold text-emerald-700">
                {activePackage.divisions} · {activePackage.districtCountBn}
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                {activePackage.title}
              </h3>
              <div className="mt-3 flex items-start gap-2.5 text-sm text-slate-700">
                <Building2 className="w-4 h-4 text-teal-700 shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-slate-900">{activePackage.partnerName}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{activePackage.partnerSubtitle}</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 lg:border-l border-slate-200 lg:pl-6 space-y-2 text-sm">
              <p className="text-slate-700">
                <span className="font-semibold text-slate-900">ল্যাব সুবিধা: </span>
                {activePackage.labCapacity}
              </p>
              <p className="flex items-center gap-2 text-slate-700">
                <Phone className="w-4 h-4 text-teal-700 shrink-0" />
                <span>
                  আঞ্চলিক সহায়তা:{' '}
                  <strong className="font-en text-slate-900">{activePackage.coordinatorPhone}</strong>
                </span>
              </p>
            </div>
          </div>
        ) : (
          <div className="mb-6 flex items-center justify-between gap-4 text-sm text-slate-600">
            <p>
              সকল ৬৪ জেলার মধ্যে অনুসন্ধানের ফলাফল:{' '}
              <strong className="text-slate-900">{filteredDistricts.length}টি জেলা পাওয়া গেছে</strong>
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-xs font-semibold text-emerald-700 hover:underline cursor-pointer"
            >
              অনুসন্ধান মুছুন
            </button>
          </div>
        )}

        {/* Districts Grid */}
        {filteredDistricts.length === 0 ? (
          <div className="p-10 text-center rounded-xl border border-slate-200 bg-slate-50">
            <p className="text-base font-semibold text-slate-900">
              “{searchQuery}” নামে কোনো জেলা কেন্দ্র পাওয়া যায়নি
            </p>
            <p className="text-sm text-slate-600 mt-1">
              সঠিক বাংলা বা ইংরেজি বানান দিয়ে চেষ্টা করুন (যেমন: গাইবান্ধা, Gaibandha, রাজশাহী)।
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredDistricts.map((district) => (
              <div
                key={`${district.packageShort}-${district.nameEn}`}
                className={`p-4 rounded-xl border transition-colors flex flex-col justify-between ${
                  district.featured
                    ? 'bg-emerald-50/70 border-emerald-400'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <MapPin
                        className={`w-4 h-4 shrink-0 ${
                          district.featured ? 'text-emerald-700' : 'text-teal-700'
                        }`}
                      />
                      <h4 className="text-base font-bold text-slate-900 truncate">
                        {district.nameBn}
                      </h4>
                    </div>
                    {district.featured ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 whitespace-nowrap shrink-0">
                        <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                        <span>বিশেষ কেন্দ্র</span>
                      </span>
                    ) : (
                      <span className="font-en text-xs text-slate-500 whitespace-nowrap shrink-0">
                        {district.nameEn}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {district.divisionBn} বিভাগ · {district.packageShort}
                  </p>
                  <p className="text-xs text-slate-700 mt-2.5 leading-relaxed">
                    {district.centerName}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-xs font-medium text-emerald-700">ভর্তি চলছে</span>
                  <button
                    type="button"
                    onClick={() => onApplyForDistrict(district.nameEn)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 hover:text-emerald-700 transition-colors cursor-pointer"
                  >
                    <span>আবেদন করুন</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
