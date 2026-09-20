'use client';

import { useEffect } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA] dark:bg-gray-950 text-gray-900 dark:text-white px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-6 text-red-500">
        <AlertTriangle size={32} />
      </div>
      <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
        Ralat Telah Berlaku
      </h1>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8 text-sm md:text-base leading-relaxed">
        Sistem menghadapi masalah teknikal yang tidak dijangka. Sila cuba muat semula halaman ini.
      </p>
      <button
        onClick={() => reset()}
        className="inline-flex items-center gap-2 bg-[#EAB308] hover:bg-[#CA8A04] text-black font-black px-6 py-3 rounded-full text-sm transition-all shadow-lg shadow-yellow-500/20 active:scale-95 cursor-pointer"
      >
        <RotateCcw size={16} />
        <span>Cuba Semula</span>
      </button>
    </div>
  );
}
