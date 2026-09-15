'use client';

import { motion } from 'motion/react';

export const MOTOR_SPECS = [
  { label: 'Motor Model', value: 'MSA 2940-7T' },
  { label: 'KV (RPM/Volt)', value: '8330KV' },
  { label: 'Max Voltage', value: '2S LiPo (8.4V)' },
  { label: 'Max Current', value: '120A' },
  { label: 'Poles', value: '4-Pole Neodymium' },
  { label: 'Dimensions', value: 'Φ29.3mm x 40.0mm' },
  { label: 'Shaft Diameter', value: 'Φ4.0mm' },
  { label: 'Shaft Length', value: '16.0mm' },
  { label: 'Front Bearing', value: 'F684ZZ (Φ4xΦ10.3x4mm)' },
  { label: 'Rear Bearing', value: 'F684ZZ (Φ4xΦ10.3x4mm)' },
  { label: 'Weight', value: '135g' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
};

export function MotorSpecs({ className = '' }: { className?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 ${className}`}
    >
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF4B12]"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="8" x2="16" y1="12" y2="12"/><line x1="12" x2="12" y1="8" y2="16"/></svg>
        Technical Specifications
      </h3>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3"
      >
        {MOTOR_SPECS.map((spec, i) => (
          <motion.div variants={itemVariants} key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
            <span className="text-sm font-medium text-gray-500">{spec.label}</span>
            <span className="text-sm font-semibold text-gray-900 text-right">{spec.value}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

