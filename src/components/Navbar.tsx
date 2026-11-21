import { useState } from 'react';
import { BrainCircuit, FileDown, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenApply: () => void;
  onOpenAdmitCard: () => void;
}

const NAV_LINKS = [
  { href: '#home', label: 'হোম' },
  { href: '#about', label: 'প্রকল্প পরিচিতি' },
  { href: '#curriculum', label: 'কোর্স মডিউল' },
  { href: '#schedule', label: 'সময়সূচী' },
  { href: '#eligibility', label: 'যোগ্যতা' },
  { href: '#centers', label: 'কেন্দ্রসমূহ' },
];

export default function Navbar({ onOpenApply, onOpenAdmitCard }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 lg:gap-6">
        {/* Brand Wordmark */}
        <a
          href="#home"
          className="inline-flex items-center gap-2.5 text-slate-900 hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 rounded-md"
          aria-label="dydaibatch03 হোম"
        >
          <span className="w-9 h-9 rounded-lg bg-slate-900 text-emerald-400 flex items-center justify-center shrink-0">
            <BrainCircuit className="w-5 h-5" strokeWidth={2} />
          </span>
          <span className="font-en text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
            dydaibatch03
          </span>
        </a>

        {/* Primary Navigation Links */}
        <nav
          aria-label="প্রধান নেভিগেশন"
          className="hidden xl:flex items-center gap-6 text-[15px] font-medium text-slate-600"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-1 text-slate-600 hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 border-b-2 border-transparent hover:border-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenAdmitCard}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-slate-800 bg-white border border-slate-300 rounded-lg hover:border-slate-900 hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          >
            <FileDown className="w-4 h-4 text-teal-700 shrink-0" />
            <span>প্রবেশপত্র ডাউনলোড</span>
          </button>
          <button
            type="button"
            onClick={onOpenApply}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 active:bg-emerald-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            আবেদন করুন
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex xl:hidden items-center gap-2">
          <button
            type="button"
            onClick={onOpenApply}
            className="md:hidden inline-flex items-center justify-center px-3.5 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            আবেদন করুন
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile / Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-slate-200 px-4 sm:px-6 py-4 space-y-3">
          <nav className="grid grid-cols-2 sm:grid-cols-3 gap-2" aria-label="মোবাইল নেভিগেশন">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-50 hover:text-emerald-700 transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5 md:hidden">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmitCard();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-800 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer"
            >
              <FileDown className="w-4 h-4 text-teal-700" />
              <span>প্রবেশপত্র ডাউনলোড</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenApply();
              }}
              className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              অনলাইনে আবেদন করুন
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
