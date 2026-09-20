'use client';

import { InteractiveViewer } from '@/components/MotorVisualization';
import { MotorSpecs } from '@/components/MotorSpecs';
import { MotorTiersSection } from '@/components/MotorTiersSection';
import { Chatbot } from '@/components/Chatbot';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Header } from '@/components/Header';
import { AppProvider, useApp } from '@/components/AppProvider';
import { Zap, MessageCircle, ShieldCheck } from 'lucide-react';

function PageContent() {
  const { t } = useApp();

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans selection:bg-yellow-500/30 overflow-x-hidden flex flex-col transition-colors duration-300">
      <Header />

      {/* Main Content */}
      <main className="flex-1 flex flex-col pt-8 pb-20 w-full relative">
        
        {/* Title Section */}
        <ScrollReveal className="max-w-7xl mx-auto px-4 md:px-8 w-full mb-8 text-center md:text-left" id="overview">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 dark:bg-yellow-500/20 border border-yellow-500/30 text-yellow-700 dark:text-yellow-400 text-xs font-black uppercase tracking-widest mb-3">
             <Zap size={14} className="fill-current animate-pulse" />
             <span>VOLTRIX BRUSHLESS RC • 4 MOTOR TIERS</span>
           </div>
           <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-950 dark:text-white tracking-tight">
             {t('precisionArch')}
           </h1>
           <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl text-sm md:text-base leading-relaxed mx-auto md:mx-0">
             {t('heroDesc')}
           </p>
        </ScrollReveal>

        {/* 3D Visualization Area */}
        <div className="w-full z-10">
           <InteractiveViewer />
        </div>

        {/* Four Voltrix Motor Tiers Display Section */}
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-12 z-10">
           <MotorTiersSection />
        </div>

        {/* Detailed Technical Specifications Table */}
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-8 z-10" id="documentation">
           <MotorSpecs />
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200 dark:border-gray-800/80 bg-white dark:bg-gray-950 py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center font-black text-black">
              <Zap size={18} className="fill-black" />
            </div>
            <div>
              <span className="font-black tracking-tight text-gray-950 dark:text-white text-base">VOLTRIX RC</span>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 font-bold uppercase tracking-wider">Power You Can Feel.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-yellow-500" />
              <span>Siri: Spark • Storm • Apex • Black Edition</span>
            </div>
          </div>

          <a
            href="https://wa.me/60133008217?text=Hi%20Voltrix,%20saya%20berminat%20untuk%20beli%20motor%20RC%20Voltrix%20(RM99.00)"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 font-bold text-xs border border-yellow-500/30 transition-colors"
          >
            <MessageCircle size={15} />
            <span>WhatsApp: +60 13-300 8217</span>
          </a>
        </div>
        <div className="max-w-7xl mx-auto text-center mt-6 text-[11px] text-gray-400">
          © {new Date().getFullYear()} VOLTRIX Malaysia. Hak cipta terpelihara.
        </div>
      </footer>

      <Chatbot />
    </div>
  );
}

export default function ClientPage() {
  return (
    <AppProvider>
      <PageContent />
    </AppProvider>
  );
}
