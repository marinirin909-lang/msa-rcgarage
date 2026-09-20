'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Zap, Flame, Trophy, Award, MessageCircle, ArrowRight, CheckCircle2, Sliders, ExternalLink } from 'lucide-react';
import { useApp } from './AppProvider';
import { PurchaseModal } from './PurchaseModal';

export interface MotorTier {
  id: 'Spark' | 'Storm' | 'Apex' | 'Black';
  name: string;
  badge: string;
  badgeType: 'entry' | 'flagship' | 'pro' | 'limited';
  kv: string;
  windingCode: string;
  priceNum: number;
  price: string;
  image: string;
  accentBorder: string;
  performanceFocus: {
    title: string;
    description: string;
  };
  highlights: string[];
  specs: {
    voltage: string;
    maxCurrent: string;
    rotorType: string;
    bestFor: string;
  };
}

export const VOLTRIX_TIERS: MotorTier[] = [
  {
    id: 'Spark',
    name: 'Voltrix Spark (Entry)',
    badge: 'Entry Level',
    badgeType: 'entry',
    kv: '3300KV',
    windingCode: '3650-18T',
    priceNum: 119,
    price: 'RM 119',
    image: '/images/tiers/spark.jpg',
    accentBorder: 'border-emerald-500/40 hover:border-emerald-500',
    performanceFocus: {
      title: 'Kawalan Tork Linear & Ketahanan Termal Maksimum',
      description: 'Ditala khas untuk kelancaran pendikit (linear throttle response) dan kecekapan bateri tinggi. Belitan 18-Turn memberikan suhu operasi yang sejuk bagi sesi latihan berterusan serta pengendalian mudah untuk pelumba amatur.',
    },
    highlights: [
      'Belitan 18-Turn Tembaga Ketulenan Tinggi',
      'Kelancaran Pendikit Mesra Pemula',
      'Ketahanan Bateri Panjang (2S - 3S LiPo)',
      'Suhu Operasi Sejuk & Stabil'
    ],
    specs: {
      voltage: '2S - 3S LiPo (7.4V - 11.1V)',
      maxCurrent: '85A',
      rotorType: '4-Pole Neodymium Dynamically Balanced',
      bestFor: 'Kelab amatur, latihan trek, & perlumbaan permulaan'
    }
  },
  {
    id: 'Storm',
    name: 'Voltrix Storm (Flagship/Comp)',
    badge: 'Flagship / Comp',
    badgeType: 'flagship',
    kv: '8330KV',
    windingCode: '3650-7T',
    priceNum: 189,
    price: 'RM 189',
    image: '/images/tiers/storm.jpg',
    accentBorder: 'border-yellow-500 ring-1 ring-yellow-500/40 hover:border-yellow-400',
    performanceFocus: {
      title: 'Ledakan Kuasa Maksima & Halaju Pusingan Ultra-Tinggi',
      description: 'Model teratas siri kejohanan. Gabungan 8330KV dan belitan rintangan ultra-rendah 7-Turn memberikan daya pemecutan kilat serta kelajuan garis lurus yang mendominasi mana-mana kejohanan kelas terbuka kebangsaan.',
    },
    highlights: [
      '8330KV High-RPM Stator Matrix',
      'Belitan 7-Turn Rintangan Ultra-Rendah',
      'Tork Pukulan Kilat di Selekoh Tajam',
      'Penyegerakan ESC Kelajuan Tinggi 120A'
    ],
    specs: {
      voltage: '2S - 4S LiPo (7.4V - 14.8V)',
      maxCurrent: '120A',
      rotorType: 'Balutan Kevlar Kalis Letupan 60,000+ RPM',
      bestFor: 'Kejohanan kebangsaan & litar halaju tinggi'
    }
  },
  {
    id: 'Apex',
    name: 'Voltrix Apex (Pro Competition)',
    badge: 'Pro Competition',
    badgeType: 'pro',
    kv: '4500KV',
    windingCode: '3650-13T',
    priceNum: 129,
    price: 'RM 129',
    image: '/images/tiers/apex.jpg',
    accentBorder: 'border-blue-500/40 hover:border-blue-500',
    performanceFocus: {
      title: 'Ketepatan Berskala Penuh untuk Pelumba Profesional',
      description: 'Kejuruteraan seimbang antara tork pertengahan berkuasa dan pusingan RPM tinggi. Reka bentuk stator anti-cogging memastikan kestabilan mikron semasa kawalan selekoh teknikal chassis touring car dan drift.',
    },
    highlights: [
      'Belitan 13-Turn Formula Pro',
      'Tork Pertengahan Pantas Tanpa Sentakan',
      'Stator Anti-Cogging untuk Kawalan Halus',
      'Kemasan Anodized Titanium Ungu Gelap'
    ],
    specs: {
      voltage: '2S - 4S LiPo',
      maxCurrent: '140A',
      rotorType: '4-Pole Presisi Tinggi Gred Perlumbaan',
      bestFor: 'Kejuaraan touring terbuka & chassis drift teknikal'
    }
  },
  {
    id: 'Black',
    name: 'Voltrix Black Edition (Extreme)',
    badge: 'Limited Edition',
    badgeType: 'limited',
    kv: '5200KV',
    windingCode: '3650-11T',
    priceNum: 159,
    price: 'RM 159',
    image: '/images/tiers/black-edition.jpg',
    accentBorder: 'border-purple-500/40 hover:border-purple-500',
    performanceFocus: {
      title: 'Prestasi Halaju Ekstrem & Galas Seramik Hibrid',
      description: 'Edisi terhad berprestasi tinggi dalam kemasan stealth matte black. Menggabungkan belitan 11-Turn berdaya tinggi dengan rotor balutan Kevlar yang terbukti stabil sehingga 65,000 RPM untuk cabaran drag dan kelajuan mutlak.',
    },
    highlights: [
      '5200KV Extreme Speed Stator',
      'Belitan 11-Turn Prestasi Halaju Puncak',
      'Galas Seramik Hibrid Geseran Rendah',
      'Kemasan Koleksi Eksklusif Stealth Matte'
    ],
    specs: {
      voltage: '2S - 4S LiPo',
      maxCurrent: '160A',
      rotorType: 'Rotor Kevlar Ekstrem 65,000 RPM',
      bestFor: 'Koleksi eksklusif, drag race, & speed-trap ekstrem'
    }
  },
];

export function MotorTiersSection({ 
  onSelectTier 
}: { 
  onSelectTier?: (tierId: 'Spark' | 'Storm' | 'Apex' | 'Black') => void 
}) {
  const { lang } = useApp();
  const [selectedTierForModal, setSelectedTierForModal] = useState<MotorTier>(VOLTRIX_TIERS[1]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'cards' | 'compare'>('cards');

  const handleOrderClick = (tier: MotorTier) => {
    setSelectedTierForModal(tier);
    setIsModalOpen(true);
  };

  const getWhatsAppDirectLink = (tier: MotorTier) => {
    const text = encodeURIComponent(
      `Hi VOLTRIX Malaysia! Saya berminat untuk membeli ${tier.name} [KV: ${tier.kv}, Winding: ${tier.windingCode}] dengan harga promosi ${tier.price}. Mohon panduan pembayaran dan penghantaran.`
    );
    return `https://wa.me/60133008217?text=${text}`;
  };

  return (
    <section id="tiers" className="w-full py-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 dark:bg-yellow-500/20 border border-yellow-500/30 text-yellow-700 dark:text-yellow-400 text-xs font-black uppercase tracking-wider mb-2">
            <Zap size={14} className="fill-current" />
            <span>4 TIER VOLTRIX MOTOR ARCHITECTURE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-950 dark:text-white tracking-tight">
            {lang === 'ms' ? 'Siri Prestasi Motor VOLTRIX' : 'VOLTRIX Brushless Motor Tiers'}
          </h2>
          <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
            {lang === 'ms' 
              ? 'Empat formulasi belitan dan profil KV berbeza yang direka khusus mengikut fokus prestasi perlumbaan anda.'
              : 'Four precision-engineered winding configurations and KV profiles matched to your exact racing demands.'}
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-gray-200/80 dark:bg-gray-800 p-1 rounded-xl self-start md:self-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('cards')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'cards'
                ? 'bg-white dark:bg-gray-900 text-gray-950 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
            }`}
          >
            {lang === 'ms' ? 'Kad Produk' : 'Product Cards'}
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'compare'
                ? 'bg-white dark:bg-gray-900 text-gray-950 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
            }`}
          >
            <Sliders size={13} />
            <span>{lang === 'ms' ? 'Jadual Perbandingan' : 'Compare Matrix'}</span>
          </button>
        </div>
      </div>

      {/* 4 Cards Grid */}
      {activeTab === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {VOLTRIX_TIERS.map((tier, idx) => {
            const isFlagship = tier.badgeType === 'flagship';

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`group rounded-3xl bg-white dark:bg-gray-900 border transition-all duration-300 flex flex-col justify-between overflow-hidden relative shadow-sm hover:shadow-xl ${
                  isFlagship 
                    ? 'border-yellow-500 ring-2 ring-yellow-500/30 dark:shadow-yellow-500/10' 
                    : 'border-gray-200 dark:border-gray-800 hover:border-yellow-500/50'
                }`}
              >
                {/* Flagship / Limited Top Ribbons */}
                {isFlagship && (
                  <div className="absolute top-0 right-0 z-20 bg-yellow-500 text-black text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-bl-xl shadow-md flex items-center gap-1">
                    <Flame size={12} className="fill-black" />
                    <span>FLAGSHIP</span>
                  </div>
                )}
                {tier.badgeType === 'limited' && (
                  <div className="absolute top-0 right-0 z-20 bg-purple-600 text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-bl-xl shadow-md flex items-center gap-1">
                    <Award size={12} />
                    <span>LIMITED</span>
                  </div>
                )}

                <div>
                  {/* Image Display Frame */}
                  <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-950 overflow-hidden border-b border-gray-100 dark:border-gray-800">
                    <Image
                      src={tier.image}
                      alt={tier.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      referrerPolicy="no-referrer"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Floating Tier Badges */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-black/75 text-white backdrop-blur-md border border-white/20">
                        {tier.badge}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-xs font-mono font-black bg-yellow-500 text-black shadow-md">
                        {tier.price}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-5 md:p-6 space-y-4">
                    {/* Header info */}
                    <div>
                      <h3 className="text-xl font-black text-gray-950 dark:text-white tracking-tight leading-snug">
                        {tier.name}
                      </h3>
                      
                      {/* KV and Winding Chips */}
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-yellow-500/10 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 font-mono font-black text-xs border border-yellow-500/30">
                          <Zap size={12} />
                          {tier.kv}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-mono font-bold text-xs border border-gray-200 dark:border-gray-700">
                          {tier.windingCode}
                        </span>
                      </div>
                    </div>

                    {/* Performance Focus Box */}
                    <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-950/70 border border-gray-100 dark:border-gray-800/80 space-y-1.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-yellow-600 dark:text-yellow-400 block">
                        {lang === 'ms' ? 'Fokus Prestasi (Performance Focus)' : 'Performance Focus'}
                      </span>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100 leading-tight">
                        {tier.performanceFocus.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed pt-1">
                        {tier.performanceFocus.description}
                      </p>
                    </div>

                    {/* Bullet Highlights */}
                    <div className="space-y-1.5 pt-1">
                      {tier.highlights.map((item, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
                          <CheckCircle2 size={14} className="text-yellow-500 shrink-0 mt-0.5" />
                          <span className="leading-tight">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-5 md:p-6 pt-0 border-t border-gray-100 dark:border-gray-800/60 mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-500 pb-2 pt-3">
                    <span>{lang === 'ms' ? 'Disyorkan Untuk:' : 'Recommended For:'}</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200 text-right truncate max-w-[170px]">
                      {tier.specs.bestFor.split(',')[0]}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        if (onSelectTier) onSelectTier(tier.id);
                        handleOrderClick(tier);
                      }}
                      className="w-full py-2.5 px-3 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold text-xs transition-all shadow-md shadow-yellow-500/20 active:scale-95 flex items-center justify-center gap-1.5"
                    >
                      <span>{lang === 'ms' ? 'Tempah' : 'Order'} {tier.price}</span>
                      <ArrowRight size={13} />
                    </button>

                    <a
                      href={getWhatsAppDirectLink(tier)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold text-xs transition-all border border-gray-200 dark:border-gray-700 active:scale-95 flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle size={14} className="text-green-600 dark:text-green-400" />
                      <span>WhatsApp</span>
                      <ExternalLink size={11} className="opacity-60" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Comparison Matrix View */}
      {activeTab === 'compare' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-950/80 border-b border-gray-200 dark:border-gray-800 text-xs uppercase font-black text-gray-500 dark:text-gray-400">
                <tr>
                  <th className="py-4 px-6">{lang === 'ms' ? 'Model Motor' : 'Motor Model'}</th>
                  <th className="py-4 px-4">{lang === 'ms' ? 'Kategori' : 'Tier'}</th>
                  <th className="py-4 px-4">KV Rating</th>
                  <th className="py-4 px-4">{lang === 'ms' ? 'Kod Winding' : 'Winding Code'}</th>
                  <th className="py-4 px-4">{lang === 'ms' ? 'Kadar Voltan' : 'Voltage Range'}</th>
                  <th className="py-4 px-4">{lang === 'ms' ? 'Arus Maks' : 'Max Current'}</th>
                  <th className="py-4 px-4">{lang === 'ms' ? 'Harga' : 'Price'}</th>
                  <th className="py-4 px-6 text-right">{lang === 'ms' ? 'Tindakan' : 'Action'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800/80">
                {VOLTRIX_TIERS.map((tier) => (
                  <tr key={tier.id} className="hover:bg-yellow-500/5 transition-colors">
                    <td className="py-4 px-6 font-bold text-gray-950 dark:text-white flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shrink-0">
                        <Image 
                          src={tier.image} 
                          alt={tier.name}
                          width={40}
                          height={40}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <span>{tier.name}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                        {tier.badge}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-yellow-600 dark:text-yellow-400">
                      {tier.kv}
                    </td>
                    <td className="py-4 px-4 font-mono text-gray-700 dark:text-gray-300">
                      {tier.windingCode}
                    </td>
                    <td className="py-4 px-4 text-xs text-gray-500">
                      {tier.specs.voltage}
                    </td>
                    <td className="py-4 px-4 text-xs font-semibold text-gray-700 dark:text-gray-300">
                      {tier.specs.maxCurrent}
                    </td>
                    <td className="py-4 px-4 font-mono font-black text-base text-gray-950 dark:text-white">
                      {tier.price}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleOrderClick(tier)}
                        className="px-4 py-2 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold text-xs shadow-sm transition-transform active:scale-95"
                      >
                        {lang === 'ms' ? 'Tempah' : 'Order'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Dynamic Purchase Modal */}
      <PurchaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedSeries={selectedTierForModal.name}
        selectedPrice={selectedTierForModal.price}
        selectedWinding={selectedTierForModal.windingCode}
        selectedKv={selectedTierForModal.kv}
      />
    </section>
  );
}
