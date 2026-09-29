import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { curatedExperiences, itinerarySteps } from '../data/travelData';

export default function CuratedExperiences({ onOpenItineraryModal }) {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-teal-700 uppercase mb-2">
                    <span className="w-5 h-0.5 bg-teal-700 inline-block"></span>
                    UNIQUE EXPERIENCES
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                    Curated Travel Experiences
                  </h2>
                  <p className="text-slate-500 text-sm mt-1 max-w-lg">
                    Go beyond sightseeing. Explore, taste, learn and feel the real essence of every place.
                  </p>
                </div>

                <a 
                  href="#experiences" 
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-teal-800 hover:text-teal-900 group"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {curatedExperiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="group cursor-pointer flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100"
                  >
                    <div className="relative aspect-square overflow-hidden bg-slate-100">
                      <img
                        src={exp.image}
                        alt={exp.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    </div>
                    <div className="p-3">
                      <h4 className="font-semibold text-xs sm:text-sm text-slate-900 group-hover:text-teal-800 transition-colors leading-snug">
                        {exp.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sm:hidden mt-6 text-right">
              <a href="#experiences" className="inline-flex items-center gap-1 text-xs font-bold text-teal-800">
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col">
            <div className="relative h-full bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-slate-100 flex flex-col justify-between">
              
              <div>
                <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-teal-700 uppercase mb-2">
                  <span className="w-5 h-0.5 bg-teal-700 inline-block"></span>
                  SIMPLE 3-STEP ITINERARY
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Plan Your Perfect Trip
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                  Turn your travel dreams into a well-crafted journey.
                </p>

                <div className="mt-8 space-y-6">
                  {itinerarySteps.map((item) => {
                    const isSelected = activeStep === item.step;
                    return (
                      <div
                        key={item.step}
                        onClick={() => setActiveStep(item.step)}
                        className={`flex items-start gap-4 p-3 rounded-2xl cursor-pointer transition-all ${
                          isSelected ? 'bg-teal-50/60 ring-1 ring-teal-600/20' : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                          isSelected 
                            ? 'bg-teal-700 text-white shadow-md' 
                            : 'bg-teal-100 text-teal-800'
                        }`}>
                          {item.step}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={onOpenItineraryModal}
                  className="btn btn-sm sm:btn-md bg-teal-700 hover:bg-teal-800 text-white font-medium rounded-xl border-none shadow-sm hover:shadow px-5"
                >
                  <span>Create Your Itinerary</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <div className="transform -rotate-2">
                  <span className="font-script text-2xl text-slate-600 select-none">
                    Your Journey Starts Here
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
