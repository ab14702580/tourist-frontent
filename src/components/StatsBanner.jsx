import React from 'react';
import { Link } from 'react-router-dom';
import travelRichLifeBg from '../assets/travelRichLife.png';
import { Compass, Globe, Users, Star, ArrowRight } from 'lucide-react';

export default function StatsBanner({ onExplore }) {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner with travelRichLife.png background */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800/20 text-white min-h-[280px] flex items-center">
          
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={travelRichLifeBg || "/travelRichLife.png"}
              alt="Mediterranean coastal town - Travel Makes Life Richer"
              className="w-full h-full object-cover object-center scale-100 hover:scale-105 transition-transform duration-7000"
            />
            {/* Reduced background color overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#071d24]/65 via-[#08222b]/45 via-55% to-[#081d24]/35"></div>
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          <div className="relative z-10 w-full p-8 sm:p-12 lg:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Heading, Subhead, CTA */}
              <div className="lg:col-span-6 space-y-4">
                <div className="w-10 h-10 rounded-full bg-teal-800/80 border border-teal-400/30 flex items-center justify-center text-teal-300 backdrop-blur-md shadow-md">
                  <Compass className="w-5 h-5" />
                </div>

                <div>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight drop-shadow-sm">
                    Travel Makes Life Richer
                  </h2>
                  <p className="text-teal-100/90 text-sm sm:text-base mt-2 font-light drop-shadow-sm">
                    New places. New people. New stories.
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    to="/destinations"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 active:scale-95 text-white font-medium text-sm transition-all duration-200 shadow-lg hover:shadow-teal-500/25 group backdrop-blur-sm"
                  >
                    <span>Explore Destinations</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Key Stats Cards */}
              <div className="lg:col-span-6 grid grid-cols-3 gap-3 sm:gap-4 border-t lg:border-t-0 lg:border-l border-white/15 pt-6 lg:pt-0 lg:pl-8">
                
                {/* Stat 1 */}
                <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-black/25 backdrop-blur-md border border-white/10 space-y-2">
                  <div className="w-10 h-10 rounded-full bg-teal-800/50 flex items-center justify-center text-teal-300">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-white block leading-tight">
                      500+
                    </span>
                    <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-teal-200/80 block mt-0.5">
                      Destinations
                    </span>
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-black/25 backdrop-blur-md border border-white/10 space-y-2">
                  <div className="w-10 h-10 rounded-full bg-teal-800/50 flex items-center justify-center text-teal-300">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-white block leading-tight">
                      1M+
                    </span>
                    <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-teal-200/80 block mt-0.5">
                      Happy Travelers
                    </span>
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-black/25 backdrop-blur-md border border-white/10 space-y-2">
                  <div className="w-10 h-10 rounded-full bg-teal-800/50 flex items-center justify-center text-amber-300">
                    <Star className="w-5 h-5 fill-amber-300" />
                  </div>
                  <div>
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-white block leading-tight">
                      4.8
                    </span>
                    <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-teal-200/80 block mt-0.5">
                      Average Rating
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
