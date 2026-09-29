import React from 'react';
import { ArrowRight } from 'lucide-react';
import lastfooterBg from '../assets/lastfooter.jpeg';

export default function BottomBanner({ onPlanTrip }) {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner with lastfooter.jpeg background */}
        <div className="relative rounded-3xl overflow-hidden text-white p-8 sm:p-12 shadow-2xl border border-white/20 min-h-[220px] flex items-center">
          
          {/* Background Image: lastfooter.jpeg */}
          <div className="absolute inset-0 z-0">
            <img
              src={lastfooterBg || "/lastfooter.jpeg"}
              alt="Ready to Explore the World - Mountain Lake Sunset"
              className="w-full h-full object-cover object-center"
            />
            {/* Cinematic overlay for great text contrast while keeping the fjord sunset visible */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#06151c]/85 via-[#06151c]/60 to-[#06151c]/35"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
          </div>

          <div className="relative z-10 w-full flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-teal-300 uppercase drop-shadow">
                <span className="w-5 h-0.5 bg-teal-400 inline-block"></span>
                YOUR NEXT ADVENTURE AWAITS
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight drop-shadow-md">
                Ready to Explore the World?
              </h2>
              <p className="text-slate-200 text-xs sm:text-sm font-light leading-relaxed drop-shadow">
                Discover new places, meet amazing people, and collect moments that last a lifetime.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <button
                type="button"
                onClick={onPlanTrip}
                className="px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 active:scale-95 text-white font-semibold text-xs tracking-wider uppercase transition-all duration-200 shadow-xl hover:shadow-teal-500/30 flex items-center gap-2 group backdrop-blur-sm"
              >
                <span>Plan Your Trip</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="transform -rotate-3 select-none">
                <span className="font-script text-3xl sm:text-4xl text-amber-200/95 block drop-shadow-md">
                  Adventure is Calling
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
