import React, { useState } from 'react';
import { X, CheckCircle, Sparkles } from 'lucide-react';

export default function ItineraryModal({ isOpen, onClose }) {
  const [selectedDestination, setSelectedDestination] = useState('Bali, Indonesia');
  const [vibe, setVibe] = useState('Cultural & Relaxing');
  const [duration, setDuration] = useState('7 Days');
  const [done, setDone] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = (e) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 p-6 sm:p-8">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {!done ? (
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bespoke Travel Planner</span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-slate-900">
              Customize Your 3-Step Itinerary
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              Tell us your dream route and our digital concierge will create a tailored travel plan.
            </p>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Step 1: Choose Destination
                </label>
                <select
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-600 bg-white font-medium"
                >
                  <option value="Bali, Indonesia">Bali, Indonesia</option>
                  <option value="Santorini, Greece">Santorini, Greece</option>
                  <option value="Paris, France">Paris, France</option>
                  <option value="Kyoto, Japan">Kyoto, Japan</option>
                  <option value="Swiss Alps, Switzerland">Swiss Alps, Switzerland</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Step 2: Travel Vibe & Focus
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Cultural & Relaxing',
                    'Adventure & Thrill',
                    'Foodie & Wine',
                    'Luxury & Scenic'
                  ].map((item) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => setVibe(item)}
                      className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                        vibe === item 
                          ? 'bg-teal-50 border-teal-600 text-teal-800 shadow-sm' 
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Step 3: Preferred Duration
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-600 bg-white font-medium"
                >
                  <option value="5 Days">5 Days / 4 Nights</option>
                  <option value="7 Days">7 Days / 6 Nights</option>
                  <option value="10 Days">10 Days / 9 Nights</option>
                  <option value="14 Days">14 Days / 13 Nights</option>
                </select>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md"
                >
                  Generate My Custom Itinerary
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="font-serif text-2xl font-bold text-slate-900">
              Itinerary Ready!
            </h4>
            <div className="p-4 bg-teal-50/70 rounded-2xl text-left border border-teal-100 space-y-2 text-xs">
              <div className="font-bold text-teal-900 text-sm">{selectedDestination}</div>
              <div className="text-slate-600"><strong>Duration:</strong> {duration}</div>
              <div className="text-slate-600"><strong>Experience Style:</strong> {vibe}</div>
              <p className="text-[11px] text-teal-800 pt-2 border-t border-teal-200/60">
                A custom PDF guide and curated booking link has been prepared for your trip.
              </p>
            </div>
            <button
              onClick={() => { setDone(false); onClose(); }}
              className="btn btn-sm bg-teal-700 hover:bg-teal-800 text-white font-medium rounded-xl border-none px-6"
            >
              Done & Explore More
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
