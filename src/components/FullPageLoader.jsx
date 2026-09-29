import React from 'react';

/**
 * FullPageLoader — centered spinner shown while async page data is loading.
 * Accepts an optional `message` prop.
 */
export default function FullPageLoader({ message = 'Loading...' }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-slate-50">
      {/* Outer ring */}
      <div className="relative w-14 h-14 mb-5">
        <div className="absolute inset-0 rounded-full border-4 border-teal-100" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-teal-600 animate-spin" />
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-teal-600 animate-pulse" />
        </div>
      </div>
      <p className="text-slate-400 text-sm font-medium">{message}</p>
    </div>
  );
}
