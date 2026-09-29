import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Star, Heart, ArrowRight } from 'lucide-react';
import packageService from '../services/packageService';
import { TravelPackagesSkeleton } from './Skeletons';

export default function TravelPackages() {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedPackages, setLikedPackages] = useState([]);

  useEffect(() => {
    packageService.getPackages()
      .then((data) => setPackages(data.slice(0, 4)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLikedPackages(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <section id="packages" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-teal-700 uppercase mb-2">
              <span className="w-5 h-0.5 bg-teal-700 inline-block"></span>
              FEATURED PACKAGES
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Travel Packages
            </h2>
            <p className="text-slate-500 text-sm mt-1 max-w-xl">
              Handcrafted travel packages for every kind of traveler. Explore our most popular trips and create unforgettable memories.
            </p>
          </div>

          <Link
            to="/packages"
            className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-teal-800 hover:text-teal-900 group"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {loading ? (
          <TravelPackagesSkeleton count={4} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => {
              const isLiked = likedPackages.includes(pkg.id);
              return (
                <div
                  key={pkg.id}
                  onClick={() => navigate(`/packages/${pkg.id}`)}
                  className="group cursor-pointer flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-100/90 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    <span className={`absolute top-3 left-3 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm ${pkg.badgeColor}`}>
                      {pkg.badge}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => toggleLike(pkg.id, e)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-700 hover:bg-white hover:text-rose-600 transition-colors shadow-sm z-10"
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  </div>

                  <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                    <div>
                      <h3 className="font-serif font-bold text-lg text-slate-900 group-hover:text-teal-800 transition-colors">
                        {pkg.title}
                      </h3>

                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                        <Calendar className="w-3.5 h-3.5 text-teal-700" />
                        <span>{pkg.duration}</span>
                        <span>•</span>
                        <span>{pkg.location}</span>
                      </div>

                      <p className="text-xs text-slate-500 mt-2.5 line-clamp-2 leading-relaxed">
                        {pkg.description}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between pt-3 border-t border-slate-50 mb-4">
                        <div>
                          <span className="font-bold text-lg text-slate-900">
                            ${pkg.price}
                          </span>
                          <span className="text-xs text-slate-400 ml-1">
                            /person
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-slate-600">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-semibold text-slate-800">{pkg.rating}</span>
                          <span className="text-slate-400">({pkg.reviews})</span>
                        </div>
                      </div>

                      <Link
                        to={`/packages/${pkg.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 active:scale-98 text-white font-medium text-xs flex items-center justify-center shadow-sm transition-all"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
