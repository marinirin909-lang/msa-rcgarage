'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Loader2, ShoppingCart, ShieldCheck } from 'lucide-react';

export function PurchaseModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [checkoutState, setCheckoutState] = useState<'idle' | 'processing' | 'success'>('idle');

  const handleCheckout = () => {
    setCheckoutState('processing');
    setTimeout(() => {
      setCheckoutState('success');
    }, 1500);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setCheckoutState('idle');
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md bg-white rounded-3xl shadow-2xl z-[101] overflow-hidden flex flex-col"
          >
            {checkoutState === 'success' ? (
              <div className="p-10 flex flex-col items-center text-center">
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  transition={{ type: 'spring', bounce: 0.5 }}
                  className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6"
                >
                  <CheckCircle2 size={40} />
                </motion.div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Order Confirmed!</h2>
                <p className="text-gray-500 mb-8">Thank you for your purchase. Your MSA 2940-7T Motor will be shipped shortly.</p>
                <button 
                  onClick={handleClose}
                  className="w-full bg-gray-900 hover:bg-black text-white py-3.5 rounded-full font-bold transition-colors"
                >
                  Continue Browsing
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <ShoppingCart size={20} className="text-[#FF4B12]" />
                    Complete Purchase
                  </h2>
                  <button onClick={handleClose} className="text-gray-400 hover:text-gray-800 transition-colors p-2 -mr-2">
                    <X size={20} />
                  </button>
                </div>
                
                <div className="p-6 bg-gray-50 flex-1">
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 flex gap-4 items-center mb-6 shadow-sm">
                    <div className="w-16 h-16 bg-gray-900 rounded-xl flex flex-col items-center justify-center text-white shrink-0 shadow-inner">
                       <span className="font-black text-sm italic tracking-widest">MSA</span>
                       <span className="text-[10px] text-gray-400 font-mono">2940-7T</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 leading-tight">Competition-Grade Brushless Motor</h3>
                      <p className="text-xs text-gray-500 mt-1">8330KV • 4-Pole Neodymium</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="font-medium text-gray-900">RM 99.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Shipping</span>
                      <span className="font-medium text-green-600">Free</span>
                    </div>
                    <div className="h-px w-full bg-gray-200 my-2"></div>
                    <div className="flex justify-between items-end">
                      <span className="text-gray-900 font-bold">Total</span>
                      <span className="text-2xl font-black text-[#FF4B12]">RM 99.00</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-100 p-3 rounded-lg">
                    <ShieldCheck size={16} className="text-green-600 shrink-0" />
                    <span>Secure 256-bit SSL encrypted checkout.</span>
                  </div>
                </div>

                <div className="p-6 border-t border-gray-100 bg-white">
                  <button 
                    onClick={handleCheckout}
                    disabled={checkoutState === 'processing'}
                    className="w-full bg-[#FF4B12] hover:bg-[#E03F0A] text-white py-4 rounded-full font-bold transition-all shadow-lg shadow-[#FF4B12]/20 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed active:scale-95"
                  >
                    {checkoutState === 'processing' ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Pay RM 99.00'
                    )}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
