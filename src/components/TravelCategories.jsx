import React, { useState, useEffect } from 'react';
import { Palmtree, Mountain, Building2, Landmark, PawPrint, Compass, ArrowRight } from 'lucide-react';
import categoriesService from '../services/categoriesService';
import { TravelCategoriesSkeleton } from './Skeletons';

const iconMap = {
  Palmtree,
  Mountain,
  Building2,
  Landmark,
  PawPrint,
  Compass
};

export default function TravelCategories() {
  const [travelCategories, setTravelCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoriesService.getCategories()
      .then(setTravelCategories)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-teal-700 uppercase mb-2">
              <span className="w-5 h-0.5 bg-teal-700 inline-block"></span>
              EXPLORE BY CATEGORY
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Travel Categories
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Find the perfect trip that matches your interests.
            </p>
          </div>

          <a 
            href="#categories" 
            className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-teal-800 hover:text-teal-900 group"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {loading ? <TravelCategoriesSkeleton count={6} /> : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {travelCategories.map((cat) => {
              const Icon = iconMap[cat.icon] || Compass;

              return (
                <div
                  key={cat.id}
                  className="group flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-300 border bg-white border-slate-100 hover:border-slate-200 hover:shadow-md"
                >
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 bg-teal-50 text-teal-700 group-hover:bg-teal-100">
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>

                  <span className="font-semibold text-sm text-slate-900 group-hover:text-teal-800">
                    {cat.name}
                  </span>
                  <span className="text-xs text-slate-400 mt-0.5">
                    {cat.subtitle}
                  </span>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
