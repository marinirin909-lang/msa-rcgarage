'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Loader2, Zap, MessageCircle } from 'lucide-react';
import { useApp } from './AppProvider';

type Message = {
  id: string;
  role: 'user' | 'model';
  text: string;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, lang } = useApp();
  
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  
  const messages: Message[] = [
    {
      id: 'init',
      role: 'model',
      text: t('chatGreeting'),
    },
    ...chatHistory,
  ];

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages.length, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input.trim(),
    };

    setChatHistory((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiMessages = [...messages, userMessage].map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch response');
      }

      const modelMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: data.text,
      };

      setChatHistory((prev) => [...prev, modelMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setChatHistory((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: t('chatError'),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-[#EAB308] text-black rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/30 hover:bg-[#CA8A04] hover:scale-105 active:scale-95 transition-all z-50 group"
            title="Chat dengan Voltrix AI"
          >
            <Zap size={24} className="fill-current group-hover:rotate-12 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-[92vw] sm:w-[410px] h-[520px] max-h-[82vh] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-yellow-500/30 flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gray-950 text-white border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-yellow-500 text-black flex items-center justify-center font-black">
                  <Zap size={18} className="fill-black" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm leading-tight flex items-center gap-1.5 text-white">
                    VOLTRIX AI Expert
                    <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-1.5 py-0.2 rounded border border-yellow-500/40">RC</span>
                  </h3>
                  <p className="text-[11px] text-gray-400">Power You Can Feel • Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick WhatsApp Bar */}
            <div className="bg-yellow-500/10 px-4 py-2 border-b border-yellow-500/20 flex items-center justify-between text-xs">
              <span className="text-gray-700 dark:text-gray-300 font-medium">Beli RM 99 via WhatsApp?</span>
              <a 
                href="https://wa.me/60133008217?text=Hi%20Voltrix,%20saya%20berminat%20untuk%20beli%20motor%20RC%20Voltrix"
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-yellow-700 dark:text-yellow-400 font-bold hover:underline"
              >
                <MessageCircle size={14} />
                WhatsApp Kami
              </a>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/60 dark:bg-gray-950/60">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.role === 'user'
                        ? 'bg-[#EAB308] text-black font-medium rounded-br-sm shadow-sm'
                        : 'bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-sm border border-gray-100 dark:border-gray-800 rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2">
                    <Loader2 size={16} className="text-yellow-500 animate-spin" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">{t('chatThinking')}</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-3.5 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t('chatPlaceholder')}
                  className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 bg-[#EAB308] text-black rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#CA8A04] transition-colors shrink-0"
                >
                  <Send size={16} className="ml-0.5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
