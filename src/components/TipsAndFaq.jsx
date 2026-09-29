import React, { useState } from 'react';
import { 
  Compass, 
  ChevronRight, 
  Plus, 
  Minus, 
  ArrowRight,
  Luggage,
  FileCheck,
  Sun,
  Plane,
  ShieldCheck
} from 'lucide-react';
import { travelTipsList, faqList } from '../data/travelData';

const tipIcons = [
  Luggage,
  FileCheck,
  Sun,
  Plane,
  ShieldCheck
];

export default function TipsAndFaq() {
  const [openFaq, setOpenFaq] = useState(1);
  const [selectedTip, setSelectedTip] = useState(null);

  const toggleFaq = (id) => {
    setOpenFaq(prev => prev === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-teal-700 uppercase mb-2">
            <span className="w-5 h-0.5 bg-teal-700 inline-block"></span>
            TRAVEL TIPS & FAQ
            <span className="w-5 h-0.5 bg-teal-700 inline-block"></span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Helpful Tips for a Better Journey
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            Get the most out of your travels with our expert tips and answers to common questions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-4">
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[3/4] bg-slate-100 group">
              <img
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=800&q=80"
                alt="Young traveler on journey"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase tracking-widest text-teal-300 font-semibold block mb-1">
                  Editorial Guide
                </span>
                <h4 className="font-serif text-xl font-bold leading-tight">
                  The Art of Meaningful & Intentional Travel
                </h4>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-400 uppercase mb-4">
              <Compass className="w-4 h-4 text-teal-700" />
              <span>TRAVEL TIPS</span>
            </div>

            <div className="space-y-2.5">
              {travelTipsList.map((tip, idx) => {
                const TipIcon = tipIcons[idx] || Luggage;
                const isSelected = selectedTip === tip.id;

                return (
                  <div
                    key={tip.id}
                    onClick={() => setSelectedTip(isSelected ? null : tip.id)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all border ${
                      isSelected 
                        ? 'bg-teal-50 border-teal-200 shadow-sm' 
                        : 'bg-slate-50/70 border-slate-100 hover:bg-slate-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-teal-100/80 text-teal-800 flex items-center justify-center shrink-0">
                        <TipIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                          {tip.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {tip.subtitle}
                        </p>
                      </div>
                    </div>

                    <ChevronRight className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isSelected ? 'rotate-90 text-teal-700' : ''}`} />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                FREQUENTLY ASKED QUESTIONS
              </div>
              <a href="#faq" className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1">
                <span>View All FAQ</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            <div className="space-y-3">
              {faqList.map((item) => {
                const isOpen = openFaq === item.id;
                return (
                  <div
                    key={item.id}
                    className="border border-slate-200/80 rounded-2xl overflow-hidden transition-all bg-white"
                  >
                    <button
                      onClick={() => toggleFaq(item.id)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
                        {item.question}
                      </span>
                      <span className="shrink-0 text-slate-400">
                        {isOpen ? <Minus className="w-4 h-4 text-teal-700" /> : <Plus className="w-4 h-4" />}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-slate-500 leading-relaxed border-t border-slate-50 bg-slate-50/40">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
