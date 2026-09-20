'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingCart, ShieldCheck, MessageCircle, ExternalLink, Zap } from 'lucide-react';
import { useApp } from './AppProvider';

export interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSeries?: string;
  selectedPrice?: string;
  selectedWinding?: string;
  selectedKv?: string;
}

const SERIES_OPTIONS = [
  { 
    id: 'Spark', 
    name: 'Voltrix Spark (Entry)', 
    tag: 'Entry Level', 
    kv: '3300KV', 
    winding: '3650-18T', 
    price: 'RM 119.00',
    priceNum: 119 
  },
  { 
    id: 'Storm', 
    name: 'Voltrix Storm (Flagship/Comp)', 
    tag: 'Flagship / Comp', 
    kv: '8330KV', 
    winding: '3650-7T', 
    price: 'RM 189.00',
    priceNum: 189 
  },
  { 
    id: 'Apex', 
    name: 'Voltrix Apex (Pro Competition)', 
    tag: 'Pro Competition', 
    kv: '4500KV', 
    winding: '3650-13T', 
    price: 'RM 129.00',
    priceNum: 129 
  },
  { 
    id: 'Black', 
    name: 'Voltrix Black Edition (Extreme)', 
    tag: 'Limited Edition', 
    kv: '5200KV', 
    winding: '3650-11T', 
    price: 'RM 159.00',
    priceNum: 159 
  },
];

export function PurchaseModal({ 
  isOpen, 
  onClose,
  selectedSeries = 'Voltrix Storm',
}: PurchaseModalProps) {
  const { t } = useApp();

  // Selected series ID state with fallback to prop
  const [userSelectedId, setUserSelectedId] = useState<string | null>(null);

  const propMatched = SERIES_OPTIONS.find(
    s => s.name.toLowerCase().includes(selectedSeries.toLowerCase()) || 
         selectedSeries.toLowerCase().includes(s.id.toLowerCase())
  );

  const activeId = userSelectedId || propMatched?.id || 'Storm';
  const currentOption = SERIES_OPTIONS.find(s => s.id === activeId) || SERIES_OPTIONS[1];

  const getWhatsAppLink = () => {
    const message = encodeURIComponent(
      `Hi VOLTRIX Malaysia! Saya berminat untuk membuat belian ${currentOption.name} [KV: ${currentOption.kv}, Kod Winding: ${currentOption.winding}] dengan harga promosi ${currentOption.price}. Sila bantu saya untuk proses pembayaran dan penghantaran.`
    );
    return `https://wa.me/60133008217?text=${message}`;
  };

  const handlePayClick = () => {
    const url = getWhatsAppLink();
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-md bg-white dark:bg-gray-900 border border-yellow-500/30 rounded-3xl shadow-2xl shadow-yellow-500/10 z-[101] overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-5 md:p-6 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <ShoppingCart size={20} className="text-yellow-500" />
                {t('completePurchase')}
              </h2>
              <button 
                onClick={onClose} 
                className="text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors p-2 -mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-5 md:p-6 bg-gray-50/70 dark:bg-gray-950/60 flex-1 overflow-y-auto space-y-5">
              {/* Product Hero Badge */}
              <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-yellow-500/20 flex gap-4 items-center shadow-sm">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-xl flex flex-col items-center justify-center text-black shrink-0 shadow-md font-black">
                   <Zap size={22} className="fill-black" />
                   <span className="text-[9px] uppercase tracking-wider font-mono font-black">VOLTRIX</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-yellow-600 dark:text-yellow-400 uppercase tracking-wider">
                      {currentOption.tag}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-gray-900 dark:text-white text-base leading-tight mt-0.5 truncate">
                    {currentOption.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono">
                    KV: {currentOption.kv} • Winding: {currentOption.winding}
                  </p>
                </div>
              </div>

              {/* Series Selector */}
              <div>
                <label className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider block mb-2">
                  Pilih Siri Voltrix:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {SERIES_OPTIONS.map((series) => (
                    <button
                      key={series.id}
                      type="button"
                      onClick={() => setUserSelectedId(series.id)}
                      className={`p-2.5 rounded-xl text-left border transition-all text-xs flex flex-col justify-between ${
                        currentOption.id === series.id
                          ? 'bg-yellow-500/10 border-yellow-500 text-yellow-700 dark:text-yellow-300 font-bold shadow-sm'
                          : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-400 hover:border-yellow-500/40'
                      }`}
                    >
                      <span className="font-bold truncate">{series.name.split(' (')[0]}</span>
                      <span className="text-[10px] opacity-75">{series.tag}</span>
                      <span className="font-mono font-bold text-yellow-600 dark:text-yellow-400 mt-1">{series.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">{t('subtotal')}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{currentOption.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">{t('shipping')} (Semenanjung)</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">{t('free')}</span>
                </div>
                <div className="h-px w-full bg-gray-100 dark:bg-gray-800 my-1"></div>
                <div className="flex justify-between items-end pt-1">
                  <div>
                    <span className="text-gray-900 dark:text-white font-bold block">{t('total')}</span>
                    <span className="text-[11px] text-gray-400">Harga Rasmi Promosi</span>
                  </div>
                  <span className="text-2xl font-black text-yellow-600 dark:text-yellow-400 font-mono">{currentOption.price}</span>
                </div>
              </div>

              {/* Secure WhatsApp Notice */}
              <div className="flex items-center gap-2.5 text-xs text-gray-600 dark:text-gray-400 bg-yellow-500/10 p-3 rounded-xl border border-yellow-500/20">
                <ShieldCheck size={18} className="text-yellow-600 dark:text-yellow-400 shrink-0" />
                <span>Urusan belian selamat terus melalui WhatsApp rasmi Voltrix Malaysia (+60 13-300 8217).</span>
              </div>
            </div>

            {/* Action Footer */}
            <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handlePayClick}
                className="w-full bg-[#EAB308] hover:bg-[#CA8A04] text-black py-4 rounded-full font-black text-base transition-all shadow-lg shadow-yellow-500/25 flex justify-center items-center gap-2.5 active:scale-95 group"
              >
                <MessageCircle size={20} className="fill-black/10 group-hover:scale-110 transition-transform" />
                <span>Bayar {currentOption.price} via WhatsApp</span>
                <ExternalLink size={16} className="opacity-70" />
              </a>
              <p className="text-[11px] text-center text-gray-400 mt-2">
                Klik butang untuk membuka WhatsApp rasmi dan mengesahkan tempahan
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
