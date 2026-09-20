'use client';

import React, { useState } from 'react';
import { Logo } from './Logo';
import { PurchaseModal } from './PurchaseModal';
import { Moon, Sun, Languages, ShoppingBag, Zap } from 'lucide-react';
import { useApp } from './AppProvider';

export function Header() {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const { lang, setLang, theme, setTheme, t } = useApp();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="w-full bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 md:h-24 flex items-center justify-between">
          <Logo />
          
          <div className="flex gap-3 md:gap-6 items-center">
             <button 
               onClick={() => scrollTo('tiers')} 
               className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-gray-700 hover:text-yellow-600 dark:text-gray-200 dark:hover:text-yellow-400 cursor-pointer transition-colors"
             >
                <Zap size={15} className="text-yellow-500" />
                <span>4 Tier Motor</span>
             </button>
             <button 
               onClick={() => scrollTo('overview')} 
               className="hidden md:block text-sm font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer transition-colors"
             >
                {t('overview')}
             </button>
             <button 
               onClick={() => scrollTo('documentation')} 
               className="hidden lg:block text-sm font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer transition-colors"
             >
                {t('documentation')}
             </button>
             
             {/* Main CTA */}
             <button 
                onClick={() => setIsPurchaseModalOpen(true)}
                className="bg-[#EAB308] hover:bg-[#CA8A04] text-black px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all shadow-md shadow-yellow-500/25 active:scale-95 whitespace-nowrap flex items-center gap-2"
             >
                <ShoppingBag size={16} />
                <span>{t('purchase')} • From RM 119</span>
             </button>

             <div className="h-6 w-px bg-gray-200 dark:bg-gray-800 mx-1 hidden sm:block"></div>

             <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
                className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                title="Tukar Tema / Toggle Theme"
             >
               {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
             </button>
             
             <button 
                onClick={() => setLang(lang === 'en' ? 'ms' : 'en')} 
                className="flex items-center gap-1 p-2 text-xs md:text-sm font-bold text-gray-600 hover:text-yellow-600 dark:text-gray-300 dark:hover:text-yellow-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                title="Tukar Bahasa / Change Language"
             >
               <Languages size={17} />
               <span>{lang === 'en' ? 'EN' : 'MS'}</span>
             </button>
          </div>
        </div>
      </header>

      <PurchaseModal 
        isOpen={isPurchaseModalOpen} 
        onClose={() => setIsPurchaseModalOpen(false)} 
      />
    </>
  );
}
