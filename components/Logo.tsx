export function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Icon */}
      <svg
        width="60"
        height="60"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Hexagon Border */}
        <path
          d="M50 4L90 27V73L50 96L10 73V27L50 4Z"
          stroke="#1F2229"
          strokeWidth="4"
          fill="white"
        />
        
        {/* Orange angled shape at top left */}
        <path
          d="M10 27L50 4L70 15L10 35Z"
          fill="#FF4B12"
        />

        {/* Inner circle (Stator outline) */}
        <circle cx="50" cy="50" r="28" stroke="#6C757D" strokeWidth="2" />

        {/* Stator poles (black dashes on circle) */}
        <g stroke="#1F2229" strokeWidth="6" strokeLinecap="round">
          <line x1="50" y1="12" x2="50" y2="20" />
          <line x1="50" y1="80" x2="50" y2="88" />
          <line x1="12" y1="50" x2="20" y2="50" />
          <line x1="80" y1="50" x2="88" y2="50" />
          
          <line x1="23.1" y1="23.1" x2="28.8" y2="28.8" />
          <line x1="71.2" y1="71.2" x2="76.9" y2="76.9" />
          <line x1="23.1" y1="76.9" x2="28.8" y2="71.2" />
          <line x1="71.2" y1="28.8" x2="76.9" y2="23.1" />
        </g>

        {/* Center Orange Circle */}
        <circle cx="50" cy="50" r="14" fill="#FF4B12" />

        {/* Lightning Bolt */}
        <path
          d="M50 40L44 52H51L49 60L57 48H49L50 40Z"
          fill="white"
        />
      </svg>

      {/* Text */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline leading-none">
          <span className="text-4xl font-black text-[#1F2229] tracking-tight">MSA</span>
        </div>
        <div className="flex items-baseline leading-none mt-1">
          <span className="text-2xl font-bold text-[#FF4B12] tracking-tighter">Rc</span>
          <span className="text-2xl font-bold text-[#FF4B12] tracking-tight">Garage</span>
        </div>
        <div className="mt-2 h-px w-full bg-[#6C757D] opacity-50"></div>
        <span className="text-[0.55rem] font-medium text-[#6C757D] tracking-[0.2em] mt-1 uppercase">
          Competition-Grade Brushless Motor
        </span>
      </div>
    </div>
  );
}
