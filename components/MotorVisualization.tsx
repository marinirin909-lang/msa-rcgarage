'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, RotateCcw, Search, ChevronRight, Box, Compass, Play, Pause, Layers, Sliders } from 'lucide-react';
import { useApp } from './AppProvider';
import { partsTranslations } from '@/lib/translations';
import { Motor3DCanvas } from './Motor3DCanvas';

type MotorPart = {
  id: string;
  name: string;
  description: string;
  features: string[];
  width: number;
  height: number;
  assembledX: number;
  explodedX: number;
  zIndex: number;
  render: () => React.ReactNode;
};

const PARTS: MotorPart[] = [
  {
    id: 'back-cover',
    name: 'Back Cover',
    description: 'Precision-machined 6061-T6 aluminum back cover in signature Voltrix Electric Yellow. Features optimized cooling fins and standard M3 mounting patterns.',
    features: ['6061-T6 Aluminum', 'CNC Machined', 'Electric Yellow Anodized'],
    width: 26,
    height: 120,
    assembledX: -140,
    explodedX: -360,
    zIndex: 10,
    render: () => (
      <div className="w-full h-full relative rounded-l-md overflow-hidden bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-600 border-r border-yellow-700 shadow-[inset_2px_0_6px_rgba(255,255,255,0.6),-4px_0_12px_rgba(0,0,0,0.5)]">
        <div className="absolute top-3 bottom-3 left-1 w-1.5 border-x border-amber-600/50 rounded-full bg-yellow-500/30"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/90 border border-yellow-500/60 shadow-inner flex items-center justify-center">
           <div className="w-3.5 h-3.5 rounded-full bg-yellow-400/90 border border-yellow-600 shadow-[0_0_6px_rgba(250,204,21,0.6)]"></div>
        </div>
        <div className="absolute top-3 left-2.5 w-1.5 h-1.5 rounded-full bg-zinc-900 border border-yellow-600 shadow-inner"></div>
        <div className="absolute bottom-3 left-2.5 w-1.5 h-1.5 rounded-full bg-zinc-900 border border-yellow-600 shadow-inner"></div>
      </div>
    )
  },
  {
    id: 'bearing-back',
    name: 'Rear Bearing (F684ZZ)',
    description: 'High-speed F684ZZ flanged bearing (Φ4 x Φ10.3 x 4mm). Ensures ultra-low friction and long-lasting smooth rotation under extreme RPMs.',
    features: ['ABEC-5 Rating', 'Flanged Design', 'Pre-lubricated'],
    width: 14,
    height: 44,
    assembledX: -120,
    explodedX: -260,
    zIndex: 20,
    render: () => (
      <div className="w-full h-full bg-gradient-to-b from-gray-200 via-white to-gray-500 rounded-sm border-x border-gray-400 flex items-center justify-center shadow-md">
        <div className="w-4 h-full bg-gradient-to-b from-gray-400 via-gray-200 to-gray-600 border-x border-gray-500/50 rounded-[1px]"></div>
      </div>
    )
  },
  {
    id: 'shell',
    name: 'Stator Shell',
    description: 'CNC machined billet aluminum heatsink can finished in stealth graphite with laser-etched Voltrix speedlines and electric yellow accents.',
    features: ['Billet Aluminum Can', 'Voltrix Laser Etched', 'Electric Yellow Accents'],
    width: 170,
    height: 124,
    assembledX: -50,
    explodedX: -130,
    zIndex: 30,
    render: () => (
      <div className="w-full h-full relative rounded-sm bg-gradient-to-b from-[#22242a] via-[#121316] to-[#07080a] shadow-2xl overflow-hidden border-y border-yellow-500/40 border-x border-black">
         <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white/15 to-transparent"></div>
         <div className="absolute top-0 bottom-0 left-0 w-2 bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-600 border-r border-yellow-700"></div>
         <div className="absolute top-0 bottom-0 right-0 w-2 bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-600 border-l border-yellow-700"></div>
         
         <div className="absolute inset-0 flex flex-col items-center justify-center select-none px-4">
            <div className="flex items-center gap-1.5 mb-1">
              <svg className="w-5 h-5 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 2L3 14h8l-2 8 11-13h-8l3-7z" />
              </svg>
              <span className="text-yellow-400 font-black text-2xl tracking-[0.22em] italic drop-shadow-[0_0_10px_rgba(250,204,21,0.4)]">
                VOLTRIX
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-yellow-300/90 font-mono tracking-widest uppercase border border-yellow-400/40 bg-yellow-950/40 px-1.5 py-0.5 rounded">
                POWER YOU CAN FEEL
              </span>
            </div>
            <span className="text-[8px] text-gray-400 font-mono tracking-[0.2em] mt-1">
              2940 SERIES • BRUSHLESS
            </span>
         </div>
      </div>
    )
  },
  {
    id: 'coil',
    name: 'Vortex Coil',
    description: 'High-purity oxygen-free copper windings maximizing electrical conductivity and efficiency under intense competition loads.',
    features: ['High-Purity Copper', '200°C High-Temp Rating', 'Precision Hand-Wound'],
    width: 150,
    height: 104,
    assembledX: -40,
    explodedX: 0,
    zIndex: 40,
    render: () => (
      <div className="w-full h-full relative bg-gradient-to-b from-[#7A3610] via-[#CD6722] to-[#4A1E06] rounded-sm border-y border-[#3E1F07] shadow-[inset_0_10px_20px_rgba(0,0,0,0.5)] overflow-hidden">
         <div className="absolute inset-0 flex">
            {[...Array(40)].map((_, i) => (
              <div key={i} className="flex-1 h-full border-r border-[#3E1F07]/40 mix-blend-multiply"></div>
            ))}
         </div>
         <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white/20 to-transparent"></div>
         <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-b from-gray-400 via-gray-300 to-gray-600 border-r border-gray-500"></div>
         <div className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-b from-gray-400 via-gray-300 to-gray-600 border-l border-gray-500"></div>
      </div>
    )
  },
  {
    id: 'gasket',
    name: 'Precision Gasket',
    description: 'High-tolerance spacer ring to maintain optimal magnetic clearance and prevent axial play in the rotor assembly.',
    features: ['Brass Alloy', 'Micrometer Tolerance', 'Anti-Vibration'],
    width: 6,
    height: 48,
    assembledX: 30,
    explodedX: 110,
    zIndex: 50,
    render: () => (
      <div className="w-full h-full bg-gradient-to-b from-yellow-300 via-yellow-100 to-yellow-600 rounded-sm shadow-md border border-yellow-700/50"></div>
    )
  },
  {
    id: 'rotor',
    name: 'Explosion-Proof Rotor',
    description: 'Dynamic balanced 4-pole Neodymium rotor reinforced with high-modulus Kevlar wrap to resist expansion past 60,000 RPM.',
    features: ['4-Pole Neodymium', 'Kevlar Wrapped', 'Dynamic Balance'],
    width: 140,
    height: 46,
    assembledX: 40,
    explodedX: 200,
    zIndex: 60,
    render: () => (
      <div className="w-full h-full relative flex items-center shadow-xl">
         <div className="w-[110px] h-full bg-gradient-to-b from-gray-900 via-gray-700 to-gray-950 rounded-sm border-y border-black overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-4 bg-white/10"></div>
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, #EAB308 2px, #EAB308 4px)' }}></div>
         </div>
         <div className="absolute left-0 w-2 h-full bg-gradient-to-b from-gray-400 to-gray-600"></div>
         <div className="absolute left-[108px] w-2 h-full bg-gradient-to-b from-gray-400 to-gray-600"></div>
      </div>
    )
  },
  {
    id: 'fan',
    name: 'Cooling Fan',
    description: 'Integrated internal aluminum turbine fan that forces fresh air directly across the stator coils to keep operating temperatures low.',
    features: ['Lightweight Aluminum', 'High-CFM Design', 'RPM Synchronized'],
    width: 14,
    height: 52,
    assembledX: 100,
    explodedX: 320,
    zIndex: 70,
    render: () => (
      <div className="w-full h-full bg-gradient-to-b from-yellow-200 via-white to-amber-300 rounded-[1px] flex flex-col justify-around py-0.5 shadow-md border border-yellow-500/50">
         {[...Array(6)].map((_, i) => (
            <div key={i} className="w-full h-1 bg-gradient-to-r from-amber-400 to-yellow-500 skew-y-12"></div>
         ))}
      </div>
    )
  },
  {
    id: 'bearing-front',
    name: 'Front Bearing (F684ZZ)',
    description: 'High-speed F684ZZ flanged bearing (Φ4 x Φ10.3 x 4mm). Supports the output shaft under heavy pinion gear loads.',
    features: ['ABEC-5 Rating', 'Heavy Load Capacity', 'Dust Sealed'],
    width: 14,
    height: 44,
    assembledX: 120,
    explodedX: 390,
    zIndex: 80,
    render: () => (
      <div className="w-full h-full bg-gradient-to-b from-gray-200 via-white to-gray-500 rounded-sm border-x border-gray-400 flex items-center justify-center shadow-md">
        <div className="w-4 h-full bg-gradient-to-b from-gray-400 via-gray-200 to-gray-600 border-x border-gray-500/50 rounded-[1px]"></div>
      </div>
    )
  },
  {
    id: 'front-cover',
    name: 'Front Cover',
    description: 'Voltrix Electric Yellow anodized aluminum front bell with calibrated vortex ventilation ports for superior thermal exhaust.',
    features: ['6061-T6 Aluminum', 'Ventilated Design', 'Electric Yellow Anodized'],
    width: 26,
    height: 120,
    assembledX: 140,
    explodedX: 470,
    zIndex: 90,
    render: () => (
      <div className="w-full h-full relative rounded-r-md overflow-hidden bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-600 border-l border-yellow-700 shadow-[inset_-2px_0_6px_rgba(255,255,255,0.6),4px_0_12px_rgba(0,0,0,0.5)] flex items-center justify-center">
         <div className="w-16 h-16 rounded-full bg-black/90 flex items-center justify-center border-2 border-yellow-500/60 shadow-inner">
             <div className="w-6 h-6 rounded-full bg-[#111] border border-yellow-600 shadow-[inset_0_2px_4px_rgba(0,0,0,1)]"></div>
         </div>
         <div className="absolute top-2 left-2 w-3.5 h-3.5 rounded-full bg-black/85 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)] border border-yellow-700/50"></div>
         <div className="absolute bottom-2 left-2 w-3.5 h-3.5 rounded-full bg-black/85 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)] border border-yellow-700/50"></div>
         <div className="absolute top-8 right-2 w-3.5 h-3.5 rounded-full bg-black/85 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)] border border-yellow-700/50"></div>
         <div className="absolute bottom-8 right-2 w-3.5 h-3.5 rounded-full bg-black/85 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)] border border-yellow-700/50"></div>
      </div>
    )
  },
  {
    id: 'shaft',
    name: 'Output Shaft',
    description: 'Precision ground Φ4mm stainless steel output shaft. Engineered for perfect concentricity and maximum power transfer to the pinion gear.',
    features: ['Stainless Steel', 'Φ4.0mm Diameter', 'Precision Ground'],
    width: 220,
    height: 12,
    assembledX: 50,
    explodedX: 200,
    zIndex: 100,
    render: () => (
      <div className="w-full h-full bg-gradient-to-b from-gray-200 via-white to-gray-500 rounded-r-full shadow-md border-y border-gray-400 relative">
         <div className="absolute top-1 left-0 right-1 h-1 bg-white/70 rounded-r-full"></div>
      </div>
    )
  }
];

export function InteractiveViewer() {
  const [explodeRatio, setExplodeRatio] = useState(0);
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);
  const [viewAngle, setViewAngle] = useState<'iso' | 'front' | 'side' | 'rear' | 'top'>('iso');
  const [autoRotate, setAutoRotate] = useState(false);
  const [renderMode, setRenderMode] = useState<'3d' | '2d'>('3d');
  
  const { t, lang } = useApp();
  const selectedPart = PARTS.find(p => p.id === selectedPartId);
  const translatedPart = selectedPartId ? partsTranslations[lang][selectedPartId as keyof typeof partsTranslations['en']] : null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="flex flex-col xl:flex-row gap-6 w-full h-full max-w-7xl mx-auto p-4 md:p-8"
    >
      {/* Viewer Main Stage Area */}
      <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-gray-800 overflow-hidden relative min-h-[560px]">
        
        {/* Top Floating Control Bar */}
        <div className="p-4 bg-gray-50/90 dark:bg-gray-900/90 border-b border-gray-100 dark:border-gray-800 backdrop-blur-md z-20 flex flex-wrap items-center justify-between gap-3">
          
          {/* Mode Switch: 3D Visual vs Blueprint */}
          <div className="flex items-center gap-1.5 p-1 bg-gray-200/80 dark:bg-gray-800/80 rounded-xl">
            <button
              onClick={() => setRenderMode('3d')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                renderMode === '3d'
                  ? 'bg-yellow-500 text-black shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }`}
            >
              <Box size={14} />
              <span>3D WebGL (Yellow)</span>
            </button>
            <button
              onClick={() => setRenderMode('2d')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                renderMode === '2d'
                  ? 'bg-yellow-500 text-black shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }`}
            >
              <Layers size={14} />
              <span>2D Blueprint</span>
            </button>
          </div>

          {/* 3D Camera Angles & Auto-Rotate Controls */}
          {renderMode === '3d' && (
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 hidden sm:inline mr-1">
                {t('viewAngles')}:
              </span>
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800/90 p-1 rounded-xl">
                {(['iso', 'front', 'side', 'rear', 'top'] as const).map((angle) => (
                  <button
                    key={angle}
                    onClick={() => {
                      setViewAngle(angle);
                      setAutoRotate(false);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase transition-all ${
                      viewAngle === angle
                        ? 'bg-yellow-400 text-black font-black shadow-xs'
                        : 'text-gray-600 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400'
                    }`}
                  >
                    {t(angle as any) || angle}
                  </button>
                ))}
              </div>

              {/* Auto Rotate Toggle */}
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                title={t('autoRotate')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  autoRotate
                    ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/40 shadow-xs'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-transparent hover:border-gray-300 dark:hover:border-gray-700'
                }`}
              >
                {autoRotate ? <Pause size={13} className="text-yellow-500 animate-spin" /> : <Play size={13} />}
                <span className="hidden sm:inline">{t('autoRotate')}</span>
              </button>
            </div>
          )}
        </div>

        {/* Interactive Canvas Area */}
        <div className="flex-1 relative overflow-hidden min-h-[360px] md:min-h-[420px] bg-[#fbfbfb] dark:bg-[#0c0d10]">
          
          {/* Subtle Grid texture */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.06)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.08)_0%,transparent_75%)]"></div>

          {renderMode === '3d' ? (
            <Motor3DCanvas
              explodeRatio={explodeRatio}
              selectedPartId={selectedPartId}
              onSelectPart={(id) => setSelectedPartId(id)}
              viewAngle={viewAngle}
              autoRotate={autoRotate}
            />
          ) : (
            /* 2D Schematic Interactive Canvas */
            <div 
              className="w-full h-full relative cursor-crosshair overflow-hidden flex items-center justify-center min-h-[400px]"
              onClick={(e) => {
                 if (e.target === e.currentTarget) setSelectedPartId(null);
              }}
            >
               <div className="scale-[0.45] sm:scale-[0.65] lg:scale-100 transition-transform origin-center relative w-full h-full flex items-center justify-center">
                  <AnimatePresence>
                    {PARTS.map((part) => {
                       const isSelected = selectedPartId === part.id;
                       const isAnySelected = selectedPartId !== null;
                       const currentX = part.assembledX + (part.explodedX - part.assembledX) * explodeRatio;
                       
                       return (
                         <motion.div
                           key={part.id}
                           className="absolute top-1/2 -translate-y-1/2 cursor-pointer group"
                           style={{ 
                             width: part.width, 
                             height: part.height,
                             zIndex: isSelected ? 200 : part.zIndex 
                           }}
                           initial={false}
                           animate={{ 
                             x: currentX,
                             opacity: isAnySelected && !isSelected ? 0.3 : 1,
                             scale: isSelected ? 1.05 : 1,
                             filter: isSelected ? 'drop-shadow(0 20px 30px rgba(234, 179, 8, 0.45))' : 'drop-shadow(0 0px 0px rgba(0,0,0,0))'
                           }}
                           transition={{ type: "spring", stiffness: 300, damping: 30 }}
                           onClick={(e) => {
                             e.stopPropagation();
                             setSelectedPartId(part.id);
                           }}
                         >
                           {part.render()}
                           {explodeRatio > 0.3 && !isSelected && (
                             <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isAnySelected ? 0 : 1 }}
                                className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 px-2.5 py-1 rounded-full shadow-sm border border-gray-100 dark:border-gray-700 pointer-events-none transition-all group-hover:text-yellow-600 dark:group-hover:text-yellow-400 group-hover:border-yellow-400/50"
                             >
                               {part.name}
                             </motion.div>
                           )}
                         </motion.div>
                       );
                    })}
                  </AnimatePresence>
               </div>
            </div>
          )}

          {/* Interactive Hint Banner */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none z-10 transition-opacity">
            <div className="text-[11px] md:text-xs font-bold text-yellow-800 dark:text-yellow-300 bg-yellow-400/15 dark:bg-yellow-950/80 px-4 py-1.5 rounded-full shadow-sm border border-yellow-500/30 backdrop-blur-md flex items-center gap-2">
              <Compass size={14} className="text-yellow-500 animate-spin" />
              <span>{t('rotateHint')}</span>
            </div>
          </div>
        </div>

        {/* Quick Component Picker Strip */}
        <div className="px-6 py-2.5 bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 overflow-x-auto flex items-center gap-2 scrollbar-none">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider shrink-0">
            {t('inspectComponents')}:
          </span>
          {PARTS.map((part) => {
            const isSelected = selectedPartId === part.id;
            return (
              <button
                key={part.id}
                onClick={() => setSelectedPartId(isSelected ? null : part.id)}
                className={`text-xs px-3 py-1 rounded-full transition-all shrink-0 font-medium ${
                  isSelected
                    ? 'bg-yellow-500 text-black font-black shadow-sm scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white border border-gray-200 dark:border-gray-700'
                }`}
              >
                {part.name}
              </button>
            );
          })}
        </div>

        {/* Exploded View Slider & Controls */}
        <div className="p-6 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 z-10 flex flex-col gap-4">
           <div className="flex justify-between items-center px-1">
             <div className="flex items-center gap-2">
               <Sliders size={16} className="text-yellow-500" />
               <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{t('assembled')} (0%)</span>
             </div>
             
             {/* Quick Actions: Assemble vs Explode */}
             <div className="flex items-center gap-2">
                <button
                  onClick={() => setExplodeRatio(0)}
                  className={`text-xs px-2.5 py-1 rounded-md font-bold transition-all ${
                    explodeRatio === 0
                      ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border border-yellow-500/40'
                      : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {t('assemble')}
                </button>
                <button
                  onClick={() => setExplodeRatio(1)}
                  className={`text-xs px-2.5 py-1 rounded-md font-bold transition-all ${
                    explodeRatio === 1
                      ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border border-yellow-500/40'
                      : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {t('explode')}
                </button>
                <span className="text-sm font-black text-yellow-600 dark:text-yellow-400 ml-2">
                  {Math.round(explodeRatio * 100)}%
                </span>
             </div>
           </div>

           <input
             type="range"
             min="0"
             max="100"
             value={explodeRatio * 100}
             onChange={(e) => setExplodeRatio(Number(e.target.value) / 100)}
             className="w-full h-2.5 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
           />

           <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 px-1">
              <span>{t('dragHint')}</span>
              <button 
                onClick={() => {
                  setExplodeRatio(0);
                  setSelectedPartId(null);
                  setViewAngle('iso');
                  setAutoRotate(false);
                }}
                className="flex items-center gap-1.5 text-xs font-bold text-gray-600 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors px-3 py-1 rounded-full hover:bg-yellow-50 dark:hover:bg-yellow-950/40"
              >
                 <RotateCcw size={13} />
                 <span>{t('resetView')}</span>
              </button>
           </div>
        </div>
      </div>

      {/* Part Info & Inspection Panel */}
      <div className="w-full xl:w-96 flex flex-col shrink-0">
        <AnimatePresence mode="wait">
          {selectedPart && translatedPart ? (
            <motion.div
              key="part-info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-yellow-500/30 relative overflow-hidden flex-1 flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-bl-full -z-10"></div>
              
              <div>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-yellow-600 dark:text-yellow-400 mb-1 block">
                      {t('componentIsolated')}
                    </span>
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white">{translatedPart.name}</h2>
                  </div>
                  <button 
                    onClick={() => setSelectedPartId(null)}
                    className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <Search size={18} />
                  </button>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 text-sm">
                  {translatedPart.description}
                </p>
                
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <ChevronRight size={16} className="text-yellow-500" />
                    {t('keySpecs')}
                  </h4>
                  <ul className="space-y-3">
                    {translatedPart.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 px-4 py-2.5 rounded-xl border border-gray-100 dark:border-gray-800">
                         <div className="w-2 h-2 rounded-full bg-yellow-500 shrink-0"></div>
                         {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center gap-3 text-xs text-gray-400">
                <Info size={14} />
                <span>{t('interactionHint')}</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-gray-50 dark:bg-gray-900/50 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 border-dashed flex flex-col items-center justify-center text-center flex-1 min-h-[320px]"
            >
              <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 dark:bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20 flex items-center justify-center mb-4">
                <Box size={28} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{t('inspectComponents')}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[240px]">
                {t('inspectDesc')}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-1.5">
                {PARTS.slice(0, 4).map(p => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPartId(p.id)}
                    className="text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-yellow-500 px-2.5 py-1 rounded-full text-gray-600 dark:text-gray-400 hover:text-yellow-600 transition-colors"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </motion.div>
  );
}

