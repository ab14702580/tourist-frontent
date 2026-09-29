import React, { useState, useEffect } from 'react';
import { Star, Quote, ArrowRight } from 'lucide-react';
import testimonialsService from '../services/testimonialsService';
import { TestimonialsSkeleton } from './Skeletons';

export default function Testimonials({ onMoreReviews }) {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    testimonialsService.getTestimonials()
      .then(setTestimonials)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-teal-700 uppercase mb-2">
              <span className="w-5 h-0.5 bg-teal-700 inline-block"></span>
              TRAVELER TESTIMONIALS
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              What Our Travelers Say
            </h2>
            <p className="text-slate-500 text-sm mt-1 max-w-lg">
              Real stories from real travelers. Here's what our community has to say about their journeys with us.
            </p>
          </div>

          <button
            type="button"
            onClick={onMoreReviews}
            className="btn btn-sm sm:btn-md bg-teal-700 hover:bg-teal-800 text-white font-medium rounded-xl border-none shadow-sm hover:shadow px-5"
          >
            <span>View More Reviews</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        {loading ? <TestimonialsSkeleton count={3} /> : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="relative flex flex-col justify-between p-7 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-teal-100"
                    />
                    <div>
                      <div className="flex items-center gap-0.5 mb-1">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <h4 className="font-bold text-sm text-slate-900">
                        {item.name}
                      </h4>
                      {item.location && (
                        <span className="text-[11px] text-slate-400 block">
                          {item.location}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                    "{item.quote}"
                  </p>
                </div>

                <div className="flex justify-end pt-4">
                  <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center">
                    <Quote className="w-4 h-4 rotate-180" />
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
