import { useState } from 'react';
import { Monitor } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export default function SafeImage({
  src,
  alt,
  className = '',
  fallbackTitle = 'যুব উন্নয়ন অধিদপ্তর — AI ল্যাব',
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-slate-100 border border-slate-200 text-slate-500 p-8 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Monitor className="w-10 h-10 text-teal-700 mb-3" />
        <p className="text-sm font-semibold text-slate-700">{fallbackTitle}</p>
        <p className="text-xs text-slate-500 mt-1">কৃত্রিম বুদ্ধিমত্তা দক্ষতা উন্নয়ন প্রকল্প — ব্যাচ ০৩</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
