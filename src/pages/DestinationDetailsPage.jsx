import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, MapPin, Check, ArrowLeft, Shield, Users } from 'lucide-react';
import { destinationService } from '../services';
import FullPageLoader from '../components/FullPageLoader';

export default function DestinationDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        const data = await destinationService.getDestinationById(id);
        if (mounted) setDestination(data);
      } catch (err) {
        if (mounted) setError(err.message || 'Failed to load destination.');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadData();
    return () => { mounted = false; };
  }, [id]);

  if (loading) {
    return <FullPageLoader message="Loading destination details..." />;
  }

  if (error || !destination) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-serif font-bold text-slate-800 mb-2">Destination Not Found</h2>
        <p className="text-slate-500 mb-6 text-sm">{error || "We couldn't find the destination you are looking for."}</p>
        <Link 
          to="/destinations" 
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-teal-700 text-white text-sm font-semibold hover:bg-teal-800"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Destinations
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back button */}
        <div className="mb-6 pt-4">
          <Link 
            to="/destinations" 
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-teal-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Destinations
          </Link>
        </div>

        {/* Hero Banner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden aspect-[16/10] shadow-lg border border-slate-200">
              <img 
                src={destination.image} 
                alt={destination.title} 
                className="w-full h-full object-cover"
              />
              {destination.badge && (
                <span className="absolute top-4 left-4 bg-teal-800 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  {destination.badge}
                </span>
              )}
            </div>
          </div>

          {/* Destination Details & Booking Box */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                {destination.category || 'Featured'} Destination
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-slate-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{destination.rating}</span>
                <span className="text-slate-400 font-normal">({destination.reviews || 120} reviews)</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-2">
              {destination.title}
            </h1>

            <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-6">
              <MapPin className="w-4 h-4 text-teal-700" />
              <span>{destination.country}</span>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Experience the breathtaking charm of {destination.title}, {destination.country}. From scenic views and local culinary delights to curated adventures, this destination offers an unforgettable getaway.
            </p>

            <div className="border-t border-b border-slate-100 py-4 mb-6 space-y-2.5 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600" />
                <span>Free cancellation up to 14 days before arrival</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-teal-600" />
                <span>Verified boutique hotels & certified local guides</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-teal-600" />
                <span>Small group tours or private VIP options</span>
              </div>
            </div>

            <div className="flex items-baseline justify-between mb-6">
              <div>
                <span className="text-xs text-slate-400 block">Starting from</span>
                <span className="text-3xl font-bold text-slate-900">${destination.price}</span>
                <span className="text-xs text-slate-400 ml-1">/ person</span>
              </div>
            </div>

            <button
              onClick={() => navigate(`/booking/${id}?type=destination`)}
              className="w-full py-3.5 px-6 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
            >
              <span>Book This Trip Now</span>
            </button>
          </div>
        </div>

        {/* Highlights Section */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h3 className="font-serif text-2xl font-bold text-slate-900 mb-4">
            Trip Highlights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <h4 className="font-bold text-sm text-slate-900 mb-1">Local Culture</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Immerse yourself in authentic traditions, art exhibitions, and vibrant neighborhoods.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <h4 className="font-bold text-sm text-slate-900 mb-1">Culinary Journey</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Savor Michelin-guided dining and hidden street food treasures beloved by locals.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <h4 className="font-bold text-sm text-slate-900 mb-1">Scenic Sightseeing</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Take iconic photos at sunrise viewpoints with private, hassle-free transport.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
