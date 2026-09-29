import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, MapPin, Star, CheckCircle2, ArrowLeft, Shield, Utensils, Hotel } from 'lucide-react';
import { packageService } from '../services';
import FullPageLoader from '../components/FullPageLoader';

export default function PackageDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        const data = await packageService.getPackageById(id);
        if (mounted) setPkg(data);
      } catch (err) {
        if (mounted) setError(err.message || 'Failed to load travel package.');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadData();
    return () => { mounted = false; };
  }, [id]);

  if (loading) {
    return <FullPageLoader message="Loading package details..." />;
  }

  if (error || !pkg) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-serif font-bold text-slate-800 mb-2">Package Not Found</h2>
        <p className="text-slate-500 mb-6 text-sm">{error || "We couldn't find the package you are looking for."}</p>
        <Link 
          to="/packages" 
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-teal-700 text-white text-sm font-semibold hover:bg-teal-800"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Packages
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back link */}
        <div className="mb-6 pt-4">
          <Link 
            to="/packages" 
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-teal-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Packages
          </Link>
        </div>

        {/* Main Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden aspect-[16/10] shadow-lg border border-slate-200">
              <img 
                src={pkg.image} 
                alt={pkg.title} 
                className="w-full h-full object-cover"
              />
              <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full shadow-md ${pkg.badgeColor}`}>
                {pkg.badge}
              </span>
            </div>

            <div className="mt-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <h3 className="font-serif text-2xl font-bold text-slate-900">What's Included</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <Hotel className="w-5 h-5 text-teal-700 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">4-5 Star Accommodation</h4>
                    <p className="text-[11px] text-slate-500">Premium hotels & private villas</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <Utensils className="w-5 h-5 text-teal-700 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Daily Breakfast & Dinners</h4>
                    <p className="text-[11px] text-slate-500">Buffet breakfasts + curated gourmet dinners</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <Clock className="w-5 h-5 text-teal-700 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Airport Transfers</h4>
                    <p className="text-[11px] text-slate-500">Private luxury transport pickup & dropoff</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <Shield className="w-5 h-5 text-teal-700 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">English Speaking Guide</h4>
                    <p className="text-[11px] text-slate-500">Dedicated local certified tour specialist</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Booking Card */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                Package Overview
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-slate-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{pkg.rating}</span>
                <span className="text-slate-400 font-normal">({pkg.reviews} reviews)</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-2">
              {pkg.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-6">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-teal-700" />
                <span>{pkg.duration}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-teal-700" />
                <span>{pkg.location}</span>
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {pkg.description} Immerse yourself in the local atmosphere, scenic beauty, and authentic excursions planned from arrival to departure.
            </p>

            <div className="border-t border-b border-slate-100 py-4 mb-6 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Instant Confirmation & Flexible Rescheduling</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>All entrance fees & taxes included</span>
              </div>
            </div>

            <div className="flex items-baseline justify-between mb-6">
              <div>
                <span className="text-xs text-slate-400 block">Total per person</span>
                <span className="text-3xl font-bold text-slate-900">${pkg.price}</span>
              </div>
            </div>

            <button
              onClick={() => navigate(`/booking/${id}`)}
              className="w-full py-3.5 px-6 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
            >
              <span>Book This Package</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
