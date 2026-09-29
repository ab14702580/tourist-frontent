import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Tag, 
  Headphones, 
  Sparkles, 
  UserCheck, 
  CalendarClock, 
  Play, 
  X 
} from 'lucide-react';
import { whyChooseUs } from '../data/travelData';

const iconMap = {
  ShieldCheck,
  Tag,
  Headphones,
  Sparkles,
  UserCheck,
  CalendarClock
};

export default function ValueProposition() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-teal-700 uppercase mb-2">
                <span className="w-5 h-0.5 bg-teal-700 inline-block"></span>
                WHY TRAVEL WITH US?
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]">
                More Than Just a Trip, <br />
                It's a Life Experience
              </h2>
              <p className="text-slate-500 text-sm sm:text-base mt-4 max-w-xl leading-relaxed">
                We make travel simple, safe and unforgettable. From handpicked destinations to 24/7 support, we're with you every step of the way.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whyChooseUs.map((feat, index) => {
                const IconComponent = iconMap[feat.icon] || Sparkles;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50/80 hover:bg-teal-50/50 transition-colors border border-slate-100/80"
                  >
                    <div className="w-9 h-9 rounded-lg bg-teal-100/60 text-teal-700 flex items-center justify-center shrink-0">
                      <IconComponent className="w-4 h-4 stroke-[2]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-slate-800">
                        {feat.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group aspect-[4/5] sm:aspect-[4/4] lg:aspect-[4/5] bg-slate-900">
              
              <img
                src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=1000&q=80"
                alt="Traveler standing on mountain peak"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40"></div>

              <div className="absolute top-8 left-8">
                <span className="font-script text-3xl sm:text-4xl text-amber-200 block drop-shadow-md leading-tight">
                  Better Trips. <br /> Bigger Stories.
                </span>
              </div>

              <div className="absolute bottom-6 right-6">
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/95 hover:bg-white text-slate-900 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 group/btn"
                >
                  <div className="w-8 h-8 rounded-full bg-teal-700 group-hover/btn:bg-teal-800 text-white flex items-center justify-center shadow-md">
                    <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                  </div>
                  <div className="text-left pr-2">
                    <span className="block text-xs font-bold leading-tight text-slate-900">
                      Watch Our Story
                    </span>
                    <span className="block text-[10px] text-slate-500 leading-tight">
                      1:45
                    </span>
                  </div>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>

      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Wanderly Story Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
