import Link from 'next/link';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA] dark:bg-gray-950 text-gray-900 dark:text-white px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center mb-6 text-yellow-600 dark:text-yellow-400">
        <AlertCircle size={32} />
      </div>
      <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">
        404 - Halaman Tidak Dijumpai
      </h1>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8 text-sm md:text-base leading-relaxed">
        Halaman yang anda cari tidak wujud atau telah dipindahkan. Sila kembali ke laman utama VOLTRIX RC.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-[#EAB308] hover:bg-[#CA8A04] text-black font-black px-6 py-3 rounded-full text-sm transition-all shadow-lg shadow-yellow-500/20 active:scale-95"
      >
        <ArrowLeft size={16} />
        <span>Kembali ke Laman Utama</span>
      </Link>
    </div>
  );
}
