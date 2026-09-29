import React, { useState } from 'react';
import heroBg from '../assets/touristHeroBackground.png';
import { MapPin, Calendar, Users, ChevronDown, Search } from 'lucide-react';

export default function Hero({ onSearchSubmit }) {
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const [travelers, setTravelers] = useState('2 Adults');
  const [isTravelerDropdown, setIsTravelerDropdown] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit({ destination, dates, travelers });
    }
  };

  return (
    <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden">
      {/* Background Image from assets/design1.png */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg || "/touristHeroBackground.png"}
          alt="Explore the World - Wanderly"
          className="w-full h-full object-cover object-center scale-100 transition-transform duration-700"
        />
        {/* Soft Vignette Overlay to ensure text readability on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-8 text-white space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-[0.22em] text-teal-300 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
              DISCOVER • EXPLORE • EXPERIENCE
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
              Explore the <br />
              <span className="text-teal-400 italic font-serif font-normal">World</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-200/90 max-w-xl font-light leading-relaxed">
              Find the best destinations, curated experiences, and unforgettable memories around the globe.
            </p>
          </div>

          {/* Cursive Note */}
          <div className="lg:col-span-4 text-left lg:text-right hidden sm:block">
            <div className="inline-block transform -rotate-3 lg:rotate-[-4deg]">
              <span className="font-script text-3xl sm:text-4xl text-amber-200/95 block drop-shadow-md select-none">
                Collect Moments <br className="hidden lg:block"/> Not Things
              </span>
            </div>
          </div>
        </div>

        {/* Floating Rounded-Pill Search Bar */}
        <div className="w-full max-w-4xl bg-white/95 backdrop-blur-md rounded-full shadow-2xl p-2 sm:p-2.5 border border-white/40">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center justify-between gap-2 px-3 py-1">
            
            {/* Where to? */}
            <div className="w-full sm:w-auto flex-1 flex items-center gap-3 px-3 py-2 border-b sm:border-b-0 sm:border-r border-slate-100">
              <div className="text-teal-700 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-left w-full">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-tight">
                  Where to?
                </label>
                <input
                  type="text"
                  placeholder="Search destinations"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
                />
              </div>
            </div>

            {/* When? */}
            <div className="w-full sm:w-auto flex-1 flex items-center gap-3 px-3 py-2 border-b sm:border-b-0 sm:border-r border-slate-100">
              <div className="text-teal-700 shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="text-left w-full">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-tight">
                  When?
                </label>
                <input
                  type="text"
                  placeholder="Add dates"
                  value={dates}
                  onChange={(e) => setDates(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Travelers */}
            <div className="relative w-full sm:w-auto flex-1 flex items-center gap-3 px-3 py-2 cursor-pointer"
                 onClick={() => setIsTravelerDropdown(!isTravelerDropdown)}>
              <div className="text-teal-700 shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-left w-full">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-tight">
                  Travelers
                </label>
                <div className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center justify-between">
                  <span>{travelers}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
                </div>
              </div>

              {isTravelerDropdown && (
                <div 
                  className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-30"
                  onClick={(e) => e.stopPropagation()}
                >
                  {['1 Adult', '2 Adults', '2 Adults, 1 Child', 'Family Group (4+)'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setTravelers(opt);
                        setIsTravelerDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-800 rounded-xl transition-colors"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Circular Search Button */}
            <div className="w-full sm:w-auto shrink-0 flex justify-end">
              <button
                type="submit"
                className="w-full sm:w-12 sm:h-12 py-3 sm:py-0 rounded-full bg-teal-700 hover:bg-teal-800 active:scale-95 text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all"
                title="Search"
              >
                <Search className="w-5 h-5" />
                <span className="sm:hidden ml-2 font-medium text-xs">Search Now</span>
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
}
