'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, ShieldCheck, Cpu, Flame, Trophy, Award, MessageCircle } from 'lucide-react';
import { useApp } from './AppProvider';
import { PurchaseModal } from './PurchaseModal';

export function MotorSpecs({ className = '' }: { className?: string }) {
  const { t } = useApp();
  const [activeSeries, setActiveSeries] = useState<'Spark' | 'Storm' | 'Apex' | 'Black'>('Storm');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const PRODUCT_SERIES = [
    {
      id: 'Spark' as const,
      name: 'Voltrix Spark',
      tier: 'Entry Level',
      tagline: 'Kawalan tork linear & ketahanan termal untuk permulaan yang mantap',
      kv: '3300KV',
      winding: '3650-18T',
      voltage: '2S - 3S LiPo (7.4V - 11.1V)',
      current: '85A Max',
      badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      icon: Zap,
      idealFor: 'Kelab amatur, latihan trek & perlumbaan permulaan',
      accentColor: 'border-emerald-500/40',
      price: 'RM 119.00',
    },
    {
      id: 'Storm' as const,
      name: 'Voltrix Storm',
      tier: 'Flagship / Prestasi',
      tagline: 'Ledakan kuasa kilat dengan kelajuan pusingan 8330KV',
      kv: '8330KV',
      winding: '3650-7T',
      voltage: '2S - 4S LiPo (7.4V - 14.8V)',
      current: '120A Max',
      badgeColor: 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-500/40',
      icon: Flame,
      idealFor: 'Pertandingan peringkat kebangsaan & litar pantas',
      accentColor: 'border-yellow-500 shadow-yellow-500/20 shadow-lg',
      price: 'RM 189.00',
      featured: true,
    },
    {
      id: 'Apex' as const,
      name: 'Voltrix Apex',
      tier: 'Pro Competition',
      tagline: 'Ketepatan tertinggi tanpa senggukan untuk pelumba profesional',
      kv: '4500KV',
      winding: '3650-13T',
      voltage: '2S - 4S LiPo',
      current: '140A Max',
      badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
      icon: Trophy,
      idealFor: 'Kejohanan profesional, touring & kejuaraan drift terbuka',
      accentColor: 'border-blue-500/40',
      price: 'RM 129.00',
    },
    {
      id: 'Black' as const,
      name: 'Voltrix Black Edition',
      tier: 'Edisi Terhad',
      tagline: 'Kemasan matte stealth dengan rotor Kevlar 65,000 RPM & galas seramik',
      kv: '5200KV',
      winding: '3650-11T',
      voltage: '2S - 4S LiPo',
      current: '160A Max',
      badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
      icon: Award,
      idealFor: 'Koleksi eksklusif, drag race, & pelumba halaju ekstrem',
      accentColor: 'border-purple-500/40',
      price: 'RM 159.00',
    },
  ];

  const currentSeries = PRODUCT_SERIES.find(s => s.id === activeSeries) || PRODUCT_SERIES[1];

  const SPECS_LIST = [
    { label: t('motorModel'), value: `${currentSeries.name} 3650` },
    { label: 'Kod Winding', value: currentSeries.winding },
    { label: t('kv'), value: currentSeries.kv },
    { label: t('maxVoltage'), value: currentSeries.voltage },
    { label: t('maxCurrent'), value: currentSeries.current },
    { label: t('poles'), value: '4-Pole Neodymium (Dynamic Balanced)' },
    { label: t('dimensions'), value: 'Φ36.0mm x 50.0mm (Format 3650)' },
    { label: t('shaftDiameter'), value: 'Φ3.175mm / Φ5.0mm Precision Ground' },
    { label: t('shaftLength'), value: '15.0mm' },
    { label: t('frontBearing'), value: 'High-RPM Ultra-Low Friction' },
    { label: t('rearBearing'), value: currentSeries.id === 'Black' ? 'Hybrid Ceramic High-RPM' : 'Dual Sealed Steel Ball Bearing' },
    { label: t('weight'), value: '180g' },
  ];

  return (
    <div className={`space-y-12 ${className}`}>
      {/* Product Series Section */}
      <section id="series" className="pt-4">
        <div className="text-center md:text-left mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-700 dark:text-yellow-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Zap size={14} className="fill-current" />
            Siri Motor Voltrix
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-gray-950 dark:text-white tracking-tight">
            Pilihan Siri Produk VOLTRIX
          </h2>
          <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl">
            Dibina dengan teknologi motor brushless termaju Malaysia untuk memenuhi setiap kategori pelumba RC.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {PRODUCT_SERIES.map((series) => {
            const Icon = series.icon;
            const isSelected = activeSeries === series.id;

            return (
              <motion.div
                key={series.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => setActiveSeries(series.id)}
                className={`cursor-pointer rounded-2xl p-6 bg-white dark:bg-gray-900 border transition-all flex flex-col justify-between relative overflow-hidden ${
                  isSelected 
                    ? 'border-yellow-500 ring-2 ring-yellow-500/30 shadow-xl shadow-yellow-500/10' 
                    : 'border-gray-200 dark:border-gray-800 hover:border-yellow-500/50'
                }`}
              >
                {series.featured && (
                  <div className="absolute top-0 right-0 bg-[#EAB308] text-black text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-sm">
                    Pilihan Utama
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 flex items-center justify-center border border-yellow-500/20">
                      <Icon size={24} />
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${series.badgeColor}`}>
                      {series.tier}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-gray-950 dark:text-white tracking-tight">
                    {series.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                    {series.tagline}
                  </p>

                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Kelajuan KV:</span>
                      <span className="font-bold text-gray-900 dark:text-white">{series.kv}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Voltan:</span>
                      <span className="font-semibold text-gray-900 dark:text-white truncate max-w-[140px]">{series.voltage}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase font-medium">Harga Promosi</span>
                    <span className="text-lg font-black text-yellow-600 dark:text-yellow-400">{series.price}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveSeries(series.id);
                      setIsModalOpen(true);
                    }}
                    className="px-3.5 py-1.5 rounded-full bg-yellow-500 hover:bg-yellow-600 text-black text-xs font-bold transition-transform active:scale-95 shadow-sm"
                  >
                    Beli Siri Ini
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Detailed Technical Specs Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 dark:border-gray-800"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
          <div>
            <div className="flex items-center gap-2">
              <Cpu size={20} className="text-yellow-500" />
              <h3 className="text-xl font-black text-gray-950 dark:text-white tracking-tight">
                {t('techSpecs')} — {currentSeries.name}
              </h3>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Spesifikasi mekanikal dan elektrikal siri {currentSeries.tier.toLowerCase()}.
            </p>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#EAB308] hover:bg-[#CA8A04] text-black font-extrabold text-xs md:text-sm px-4 py-2.5 rounded-full transition-all shadow-md shadow-yellow-500/20 active:scale-95 whitespace-nowrap"
          >
            <MessageCircle size={16} />
            <span>Tempah {currentSeries.name} ({currentSeries.price})</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
          {SPECS_LIST.map((spec, i) => (
            <div key={i} className="flex justify-between items-center py-2.5 border-b border-gray-100 dark:border-gray-800/80">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{spec.label}</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white text-right">{spec.value}</span>
            </div>
          ))}
        </div>

        {/* Quality Guarantee Footnote */}
        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-yellow-600 dark:text-yellow-400" />
            <span>Jaminan Kualiti Voltrix Malaysia: Diuji ketahanan haba & ketepatan pengimbangan dinamik 100%.</span>
          </div>
          <span className="font-mono text-yellow-600 dark:text-yellow-400 font-bold">
            TAGLINE: &quot;POWER YOU CAN FEEL.&quot;
          </span>
        </div>
      </motion.div>

      <PurchaseModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedSeries={currentSeries.name}
      />
    </div>
  );
}
