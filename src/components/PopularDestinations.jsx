import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import destinationService from '../services/destinationService';
import { PopularDestinationsSkeleton } from './Skeletons';

export default function PopularDestinations() {
  const navigate = useNavigate();
  const [destinationItems, setDestinationItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    destinationService.getDestinations()
      .then(setDestinationItems)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="popular" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-teal-700 uppercase mb-2">
              <span className="w-5 h-0.5 bg-teal-700 inline-block"></span>
              TOP DESTINATIONS
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Popular Destinations
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Dream it. Explore it. Live it.
            </p>
          </div>

          <Link 
            to="/destinations" 
            className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-teal-800 hover:text-teal-900 group"
          >
            <span>View All Destinations</span>
          </Link>
        </div>

        {loading ? <PopularDestinationsSkeleton count={5} /> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {destinationItems.slice(0, 5).map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/destinations/${item.id}`)}
                className="group cursor-pointer flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-slate-100"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 m-2">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 text-[11px] font-bold text-slate-800 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full shadow-sm">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{item.rating}</span>
                  </div>
                </div>

                <div className="px-3 pt-1 pb-3 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-teal-800 transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                      <MapPin className="w-3 h-3 text-teal-700" />
                      <span>{item.country}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-100/70">
                    <div>
                      <span className="font-bold text-base text-slate-900">
                        ${item.price}
                      </span>
                      <span className="text-[11px] text-slate-400 ml-1">
                        /person
                      </span>
                    </div>

                    <Link
                      to={`/destinations/${item.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-1.5 rounded-xl bg-teal-50 group-hover:bg-[#0c7c72] text-teal-800 group-hover:text-white font-semibold text-xs transition-colors shadow-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
