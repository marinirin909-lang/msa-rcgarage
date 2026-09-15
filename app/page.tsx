import { Logo } from '@/components/Logo';
import { InteractiveViewer } from '@/components/MotorVisualization';
import { MotorSpecs } from '@/components/MotorSpecs';
import { Chatbot } from '@/components/Chatbot';
import { ScrollReveal } from '@/components/ScrollReveal';

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-gray-900 font-sans selection:bg-[#FF4B12]/30 overflow-x-hidden flex flex-col">
      {/* Header */}
      <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-24 flex items-center justify-between">
          <Logo />
          
          <div className="hidden md:flex gap-6 items-center">
             <span className="text-sm font-semibold text-gray-500 hover:text-gray-900 cursor-pointer transition-colors">Overview</span>
             <span className="text-sm font-semibold text-gray-500 hover:text-gray-900 cursor-pointer transition-colors">Documentation</span>
             <button className="bg-[#FF4B12] hover:bg-[#E03F0A] text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-md shadow-[#FF4B12]/20 active:scale-95">
                Purchase
             </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col pt-8 pb-20 w-full relative">
        
        {/* Title Section */}
        <ScrollReveal className="max-w-7xl mx-auto px-4 md:px-8 w-full mb-8 text-center md:text-left">
           <span className="text-[#FF4B12] font-bold tracking-widest text-xs uppercase mb-2 block">Interactive Teardown</span>
           <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
             Precision Internal Architecture
           </h1>
           <p className="mt-4 text-gray-600 max-w-2xl text-sm md:text-base leading-relaxed mx-auto md:mx-0">
             Explore the competition-grade components of the MSA 2940-7T. Drag the slider to expand the assembly and click individual parts to inspect their engineering specifications.
           </p>
        </ScrollReveal>

        {/* 3D Visualization Area */}
        <div className="w-full z-10">
           <InteractiveViewer />
        </div>

        {/* Specifications Table */}
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-12 z-10">
           <MotorSpecs />
        </div>

      </main>

      <Chatbot />
    </div>
  );
}
