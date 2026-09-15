'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, RotateCcw, Search, ChevronRight } from 'lucide-react';

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
    description: 'Precision-machined 6061-T6 aluminum back cover. Features optimized heat dissipation fins and standard M3 mounting holes for secure chassis installation.',
    features: ['6061-T6 Aluminum', 'CNC Machined', 'Red Anodized'],
    width: 24,
    height: 120,
    assembledX: -140,
    explodedX: -360,
    zIndex: 10,
    render: () => (
      <div className="w-full h-full relative rounded-l-md overflow-hidden bg-gradient-to-b from-red-600 via-red-500 to-red-800 border-r border-red-900 shadow-[inset_2px_0_4px_rgba(255,255,255,0.3),-4px_0_10px_rgba(0,0,0,0.5)]">
        <div className="absolute top-4 bottom-4 left-1 w-1.5 border-x border-red-900/30 rounded-full bg-red-700/20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/90 border border-red-900/50 shadow-inner">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gray-800 border border-black"></div>
        </div>
        <div className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-yellow-600/80 shadow-[0_0_2px_rgba(255,215,0,0.5)]"></div>
        <div className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-yellow-600/80 shadow-[0_0_2px_rgba(255,215,0,0.5)]"></div>
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
      <div className="w-full h-full bg-gradient-to-b from-gray-300 via-white to-gray-500 rounded-sm border-x border-gray-400 flex items-center justify-center shadow-md">
        <div className="w-4 h-full bg-gradient-to-b from-gray-400 via-gray-200 to-gray-600 border-x border-gray-500/50 rounded-[1px]"></div>
      </div>
    )
  },
  {
    id: 'shell',
    name: 'Stator Shell',
    description: 'CNC machined billet aluminum heatsink can. Designed for maximum heat dissipation and structural integrity to protect internal components.',
    features: ['Billet Aluminum', 'Laser Etched', 'Maximum Cooling'],
    width: 170,
    height: 124,
    assembledX: -50,
    explodedX: -130,
    zIndex: 30,
    render: () => (
      <div className="w-full h-full relative rounded-sm bg-gradient-to-b from-gray-800 via-[#1f2023] to-black shadow-2xl overflow-hidden border-y border-gray-600/30 border-x border-black">
         {/* Highlight on top */}
         <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white/10 to-transparent"></div>
         {/* MSA Branding */}
         <div className="absolute inset-0 flex flex-col items-center justify-center mix-blend-screen opacity-90 pb-2">
            <span className="text-white font-black text-2xl tracking-[0.2em] italic mb-1">MSA</span>
            <div className="flex gap-2 text-[10px] text-gray-300 tracking-wider font-mono">
              <span className="border border-white/30 px-1">2940-7T</span>
              <span>8330KV</span>
            </div>
         </div>
      </div>
    )
  },
  {
    id: 'coil',
    name: 'Vortex Coil',
    description: 'High-purity copper windings maximizing conductivity and efficiency. Designed to withstand high-temperature competition use without performance degradation.',
    features: ['High-Purity Copper', 'High-Temp Rating', 'Hand-Wound Precision'],
    width: 150,
    height: 104,
    assembledX: -40,
    explodedX: 0,
    zIndex: 40,
    render: () => (
      <div className="w-full h-full relative bg-gradient-to-b from-[#7A3610] via-[#CD6722] to-[#4A1E06] rounded-sm border-y border-[#3E1F07] shadow-[inset_0_10px_20px_rgba(0,0,0,0.5)] overflow-hidden">
         {/* Coil texture */}
         <div className="absolute inset-0 flex">
            {[...Array(40)].map((_, i) => (
              <div key={i} className="flex-1 h-full border-r border-[#3E1F07]/40 mix-blend-multiply"></div>
            ))}
         </div>
         {/* Top specular highlight */}
         <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white/20 to-transparent"></div>
         {/* End caps */}
         <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-b from-gray-400 via-gray-300 to-gray-600 border-r border-gray-500"></div>
         <div className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-b from-gray-400 via-gray-300 to-gray-600 border-l border-gray-500"></div>
      </div>
    )
  },
  {
    id: 'gasket',
    name: 'Precision Gasket',
    description: 'High-tolerance spacer ring to maintain optimal clearance and prevent lateral play in the rotor assembly, ensuring consistent magnetic flux.',
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
    description: 'High-strength, precision-balanced 4-pole rotor. Features Kevlar wrapping to prevent expansion and catastrophic failure at extreme RPMs.',
    features: ['4-Pole Neodymium', 'Kevlar Wrapped', 'Dynamic Balance'],
    width: 140,
    height: 46,
    assembledX: 40,
    explodedX: 200,
    zIndex: 60,
    render: () => (
      <div className="w-full h-full relative flex items-center shadow-xl">
         {/* Kevlar body */}
         <div className="w-[110px] h-full bg-gradient-to-b from-gray-900 via-gray-700 to-gray-950 rounded-sm border-y border-black overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-4 bg-white/10"></div>
            {/* Kevlar pattern */}
            <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, #fff 2px, #fff 4px)' }}></div>
         </div>
         {/* Rotor ends */}
         <div className="absolute left-0 w-2 h-full bg-gradient-to-b from-gray-400 to-gray-600"></div>
         <div className="absolute left-[108px] w-2 h-full bg-gradient-to-b from-gray-400 to-gray-600"></div>
      </div>
    )
  },
  {
    id: 'fan',
    name: 'Cooling Fan',
    description: 'Integrated internal aluminum fan for enhanced airflow and temperature management. Forces air through the stator to dramatically reduce operating temps.',
    features: ['Lightweight Aluminum', 'High-CFM Design', 'RPM Synchronized'],
    width: 14,
    height: 52,
    assembledX: 100,
    explodedX: 320,
    zIndex: 70,
    render: () => (
      <div className="w-full h-full bg-gradient-to-b from-gray-200 via-white to-gray-400 rounded-[1px] flex flex-col justify-around py-0.5 shadow-md border border-gray-300">
         {[...Array(6)].map((_, i) => (
            <div key={i} className="w-full h-1 bg-gradient-to-r from-gray-400 to-gray-500 skew-y-12"></div>
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
      <div className="w-full h-full bg-gradient-to-b from-gray-300 via-white to-gray-500 rounded-sm border-x border-gray-400 flex items-center justify-center shadow-md">
        <div className="w-4 h-full bg-gradient-to-b from-gray-400 via-gray-200 to-gray-600 border-x border-gray-500/50 rounded-[1px]"></div>
      </div>
    )
  },
  {
    id: 'front-cover',
    name: 'Front Cover',
    description: 'Red anodized aluminum front cover with optimized ventilation holes for improved cooling efficiency and precise bearing alignment.',
    features: ['6061-T6 Aluminum', 'Ventilated Design', 'Red Anodized'],
    width: 24,
    height: 120,
    assembledX: 140,
    explodedX: 470,
    zIndex: 90,
    render: () => (
      <div className="w-full h-full relative rounded-r-md overflow-hidden bg-gradient-to-b from-red-600 via-red-500 to-red-800 border-l border-red-900 shadow-[inset_-2px_0_4px_rgba(255,255,255,0.3),4px_0_10px_rgba(0,0,0,0.5)] flex items-center justify-center">
         <div className="w-16 h-16 rounded-full bg-black/90 flex items-center justify-center border-2 border-red-900/40 shadow-inner">
             {/* Shaft hole */}
             <div className="w-6 h-6 rounded-full bg-[#111] border border-gray-800 shadow-[inset_0_2px_4px_rgba(0,0,0,1)]"></div>
         </div>
         {/* Ventilation holes */}
         <div className="absolute top-2 left-2 w-3.5 h-3.5 rounded-full bg-black/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]"></div>
         <div className="absolute bottom-2 left-2 w-3.5 h-3.5 rounded-full bg-black/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]"></div>
         <div className="absolute top-8 right-2 w-3.5 h-3.5 rounded-full bg-black/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]"></div>
         <div className="absolute bottom-8 right-2 w-3.5 h-3.5 rounded-full bg-black/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]"></div>
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
    explodedX: 200, // Shaft moves with the rotor
    zIndex: 100, // Top layer so it sticks out over the front cover
    render: () => (
      <div className="w-full h-full bg-gradient-to-b from-gray-300 via-white to-gray-500 rounded-r-full shadow-md border-y border-gray-400">
         {/* Shaft highlight */}
         <div className="absolute top-1 left-0 right-1 h-1 bg-white/70 rounded-r-full"></div>
      </div>
    )
  }
];

export function InteractiveViewer() {
  const [explodeRatio, setExplodeRatio] = useState(0);
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);
  
  const selectedPart = PARTS.find(p => p.id === selectedPartId);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="flex flex-col xl:flex-row gap-6 w-full h-full max-w-7xl mx-auto p-4 md:p-8"
    >
      
      {/* Viewer Area */}
      <div className="flex-1 flex flex-col bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden relative min-h-[500px]">
        {/* Interactive Canvas */}
        <div 
          className="flex-1 relative cursor-crosshair overflow-hidden"
          onClick={(e) => {
             // Clicked background
             if (e.target === e.currentTarget) setSelectedPartId(null);
          }}
        >
           {/* Background Grid */}
           <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
           
           {/* Center Pivot */}
           <div className="absolute top-1/2 left-1/2 -translate-y-1/2 scale-[0.4] sm:scale-[0.6] lg:scale-100 transition-transform origin-center">
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
                         filter: isSelected ? 'drop-shadow(0 20px 30px rgba(255, 75, 18, 0.4))' : 'drop-shadow(0 0px 0px rgba(0,0,0,0))'
                       }}
                       transition={{ type: "spring", stiffness: 300, damping: 30 }}
                       onClick={(e) => {
                         e.stopPropagation();
                         setSelectedPartId(part.id);
                       }}
                     >
                       {part.render()}
                       
                       {/* Label Tooltip (only when exploded enough and not selected) */}
                       {explodeRatio > 0.3 && !isSelected && (
                         <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isAnySelected ? 0 : 1 }}
                            className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-gray-500 bg-white px-2 py-1 rounded shadow-sm border border-gray-100 pointer-events-none transition-opacity group-hover:text-[#FF4B12] group-hover:border-[#FF4B12]/30"
                         >
                           {part.name}
                         </motion.div>
                       )}
                     </motion.div>
                   )
                })}
              </AnimatePresence>
           </div>
           
           {/* Instructions overlay */}
           {explodeRatio === 0 && !selectedPartId && (
              <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none animate-pulse opacity-60">
                 <div className="text-sm font-semibold text-gray-400 bg-white/80 px-4 py-2 rounded-full shadow-sm border border-gray-100 backdrop-blur-sm">
                   Drag slider to explode assembly
                 </div>
              </div>
           )}
        </div>

        {/* Controls */}
        <div className="p-6 bg-gray-50/50 border-t border-gray-100 backdrop-blur-md z-10 flex flex-col gap-4">
           <div className="flex justify-between items-center px-1">
             <span className="text-sm font-bold text-gray-700">Assembled</span>
             <span className="text-sm font-bold text-[#FF4B12]">Exploded View</span>
           </div>
           <input
             type="range"
             min="0"
             max="100"
             value={explodeRatio * 100}
             onChange={(e) => setExplodeRatio(Number(e.target.value) / 100)}
             className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF4B12] focus:outline-none focus:ring-2 focus:ring-[#FF4B12]/50"
           />
           <div className="flex justify-center mt-2">
              <button 
                onClick={() => {
                  setExplodeRatio(0);
                  setSelectedPartId(null);
                }}
                className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors px-4 py-2 rounded-full hover:bg-gray-100"
              >
                 <RotateCcw size={16} />
                 Reset View
              </button>
           </div>
        </div>
      </div>

      {/* Part Info Panel */}
      <div className="w-full xl:w-96 flex flex-col shrink-0">
        <AnimatePresence mode="wait">
          {selectedPart ? (
            <motion.div
              key="part-info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#FF4B12]/20 relative overflow-hidden flex-1"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF4B12]/5 rounded-bl-full -z-10"></div>
              
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#FF4B12] mb-1 block">Component Isolated</span>
                  <h2 className="text-2xl font-black text-gray-900">{selectedPart.name}</h2>
                </div>
                <button 
                  onClick={() => setSelectedPartId(null)}
                  className="p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Search size={20} />
                </button>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-8 text-sm">
                {selectedPart.description}
              </p>
              
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <ChevronRight size={16} className="text-[#FF4B12]" />
                  Key Specifications
                </h4>
                <ul className="space-y-3">
                  {selectedPart.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-700 bg-gray-50 px-4 py-2.5 rounded-lg border border-gray-100">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#FF4B12]"></div>
                       {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-3 text-xs text-gray-400">
                <Info size={14} />
                <span>Interaction: Click background to deselect</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-gray-50 rounded-3xl p-8 border border-gray-100 border-dashed flex flex-col items-center justify-center text-center flex-1 min-h-[300px]"
            >
              <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-[#FF4B12] mb-4">
                <Search size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Inspect Components</h3>
              <p className="text-sm text-gray-500 max-w-[200px]">
                Click on any component in the assembly view to isolate it and view detailed technical specifications.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </motion.div>
  );
}
