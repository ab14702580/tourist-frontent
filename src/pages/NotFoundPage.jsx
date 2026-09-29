import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-16 h-16 rounded-3xl bg-teal-100 text-teal-800 flex items-center justify-center mb-6 shadow-sm">
        <Compass className="w-8 h-8 stroke-[2.2] animate-spin-slow" />
      </div>

      <span className="text-teal-700 font-bold text-xs uppercase tracking-widest mb-2">
        Error 404
      </span>

      <h1 className="text-4xl sm:text-6xl font-serif font-bold text-slate-900 mb-4">
        Lost in Wonder?
      </h1>

      <p className="text-slate-500 max-w-md text-sm sm:text-base mb-8 leading-relaxed">
        The page you are looking for doesn't exist or might have moved to another scenic destination.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs shadow-md transition-all active:scale-98"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <Link
          to="/destinations"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 transition-all"
        >
          <Compass className="w-4 h-4" />
          <span>Explore Destinations</span>
        </Link>
      </div>
    </div>
  );
}
