'use client';

import React from 'react';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* High-Tech Voltrix "V" Lightning Icon */}
      <div className="relative w-12 h-12 md:w-14 md:h-14 shrink-0 flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_12px_rgba(234,179,8,0.45)]"
        >
          {/* Outer Chamfered Shield / Hex Accent */}
          <polygon
            points="50,4 92,26 92,74 50,96 8,74 8,26"
            className="stroke-yellow-500/40 fill-black/60 dark:fill-black/90"
            strokeWidth="3"
          />

          {/* Electric Speed Arcs */}
          <path
            d="M20 22 C 32 10, 68 10, 80 22"
            stroke="#EAB308"
            strokeWidth="2.5"
            strokeDasharray="6 4"
            strokeLinecap="round"
          />
          <path
            d="M20 78 C 32 90, 68 90, 80 78"
            stroke="#CA8A04"
            strokeWidth="2"
            strokeDasharray="4 4"
            strokeLinecap="round"
          />

          {/* Core Letter V with Integrated Lightning Bolt */}
          <defs>
            <linearGradient id="voltrixBoltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="35%" stopColor="#FACC15" />
              <stop offset="75%" stopColor="#EAB308" />
              <stop offset="100%" stopColor="#CA8A04" />
            </linearGradient>
            <linearGradient id="voltrixWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#A16207" />
            </linearGradient>
            <filter id="yellowGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#FACC15" floodOpacity="0.7" />
            </filter>
          </defs>

          {/* Left Arm of V */}
          <path
            d="M20 25 L34 25 L47 62 L39 65 Z"
            fill="url(#voltrixWingGrad)"
            opacity="0.9"
          />

          {/* Right Arm of V forming dynamic lightning shape */}
          <path
            d="M80 25 L65 25 L48 60 L57 60 Z"
            fill="url(#voltrixWingGrad)"
            opacity="0.85"
          />

          {/* Center Lightning Bolt piercing down */}
          <polygon
            points="58,16 35,52 50,52 42,85 68,44 52,44"
            fill="url(#voltrixBoltGrad)"
            filter="url(#yellowGlow)"
          />
        </svg>
      </div>

      {/* Brand Typographic Identity */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5 leading-none">
          <span className="text-2xl md:text-3xl font-black tracking-tight text-gray-950 dark:text-white font-sans uppercase">
            VOLT<span className="text-yellow-500 dark:text-yellow-400">RIX</span>
          </span>
          <span className="bg-yellow-500/10 dark:bg-yellow-400/20 text-yellow-600 dark:text-yellow-400 text-[10px] font-extrabold px-1.5 py-0.5 rounded border border-yellow-500/30 tracking-widest">
            RC
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] md:text-[11px] font-bold tracking-[0.22em] text-yellow-600 dark:text-yellow-400 uppercase">
            Power You Can Feel.
          </span>
        </div>
      </div>
    </div>
  );
}
