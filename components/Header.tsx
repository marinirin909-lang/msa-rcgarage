'use client';

import React, { useState } from 'react';
import { Logo } from './Logo';
import { PurchaseModal } from './PurchaseModal';

export function Header() {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-24 flex items-center justify-between">
          <Logo />
          
          <div className="flex gap-4 md:gap-6 items-center">
             <button onClick={() => scrollTo('overview')} className="hidden md:block text-sm font-semibold text-gray-500 hover:text-gray-900 cursor-pointer transition-colors">
                Overview
             </button>
             <button onClick={() => scrollTo('documentation')} className="hidden md:block text-sm font-semibold text-gray-500 hover:text-gray-900 cursor-pointer transition-colors">
                Documentation
             </button>
             <button 
                onClick={() => setIsPurchaseModalOpen(true)}
                className="bg-[#FF4B12] hover:bg-[#E03F0A] text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-md shadow-[#FF4B12]/20 active:scale-95 whitespace-nowrap"
             >
                Purchase
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
