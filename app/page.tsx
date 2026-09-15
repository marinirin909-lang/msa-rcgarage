import { InteractiveViewer } from '@/components/MotorVisualization';
import { MotorSpecs } from '@/components/MotorSpecs';
import { Chatbot } from '@/components/Chatbot';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Header } from '@/components/Header';

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-gray-900 font-sans selection:bg-[#FF4B12]/30 overflow-x-hidden flex flex-col">
      <Header />

      {/* Main Content */}
      <main className="flex-1 flex flex-col pt-8 pb-20 w-full relative">
        
        {/* Title Section */}
        <ScrollReveal className="max-w-7xl mx-auto px-4 md:px-8 w-full mb-8 text-center md:text-left" id="overview">
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
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-12 z-10" id="documentation">
           <MotorSpecs />
        </div>

      </main>

      <Chatbot />
    </div>
  );
}
