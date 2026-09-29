import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Heart, ArrowRight } from 'lucide-react';
import destinationService from '../services/destinationService';
import { FeaturedDestinationsSkeleton } from './Skeletons';

export default function FeaturedDestinations() {
  const [likedIds, setLikedIds] = useState([1, 3]);
  const [destinationItems, setDestinationItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    destinationService.getFeatured()
      .then(async (data) => {
        if (data.length >= 5) {
          setDestinationItems(data.slice(0, 5));
        } else {
          // fallback: top up from all destinations to always show 5
          const all = await destinationService.getDestinations();
          const ids = new Set(data.map((d) => d.id));
          const extras = all.filter((d) => !ids.has(d.id));
          setDestinationItems([...data, ...extras].slice(0, 5));
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLikedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <section id="destinations" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-teal-700 uppercase mb-2">
              <span className="w-5 h-0.5 bg-teal-700 inline-block"></span>
              TOP PLACES TO VISIT
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Featured Destinations
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Handpicked destinations for your next adventure.
            </p>
          </div>

          <Link 
            to="/destinations" 
            className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-teal-800 hover:text-teal-900 group"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 5 Destination Cards */}
        {loading ? <FeaturedDestinationsSkeleton count={5} /> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {destinationItems.map((item) => {
              const isLiked = likedIds.includes(item.id);
              return (
                <Link
                  key={item.id}
                  to={`/destinations/${item.id}`}
                  className="group cursor-pointer flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-slate-100/80"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleLike(item.id, e);
                      }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-700 hover:bg-white hover:text-rose-600 transition-all shadow-sm z-10"
                      title="Add to wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  </div>

                  <div className="pt-3 pb-2 px-1 flex flex-col gap-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-teal-800 transition-colors">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                          <MapPin className="w-3 h-3 text-teal-700" />
                          <span>{item.country}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-xs font-semibold text-slate-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/50">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{item.rating}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-900">${item.price}<span className="text-[11px] text-slate-400 font-normal"> / person</span></span>
                      <span className="px-2.5 py-1 rounded-xl bg-teal-50 group-hover:bg-[#0c7c72] text-teal-800 group-hover:text-white font-semibold text-xs transition-colors shadow-sm">
                        View Details
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
