import React from 'react';

/* ─────────────────────────────────────────────
   Shared pulse wrapper
───────────────────────────────────────────── */
const Pulse = ({ className = '' }) => (
  <div className={`animate-pulse bg-slate-200 rounded-xl ${className}`} />
);

/* ─────────────────────────────────────────────
   FeaturedDestinations skeleton  (5 cards)
───────────────────────────────────────────── */
export function FeaturedDestinationsSkeleton({ count = 5 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100/80"
        >
          {/* image */}
          <Pulse className="aspect-[4/3] rounded-2xl" />
          {/* text */}
          <div className="pt-3 pb-2 px-1 space-y-2">
            <Pulse className="h-4 w-3/4" />
            <Pulse className="h-3 w-1/2" />
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <Pulse className="h-4 w-1/3" />
              <Pulse className="h-7 w-20 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PopularDestinations skeleton  (5 cards)
───────────────────────────────────────────── */
export function PopularDestinationsSkeleton({ count = 5 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100"
        >
          {/* image with inner margin */}
          <div className="m-2">
            <Pulse className="aspect-[4/3] rounded-2xl" />
          </div>
          <div className="px-3 pt-1 pb-3 space-y-2">
            <Pulse className="h-4 w-3/4" />
            <Pulse className="h-3 w-1/2" />
            <div className="pt-3 mt-2 border-t border-slate-100/70 flex items-center justify-between">
              <Pulse className="h-4 w-1/3" />
              <Pulse className="h-7 w-20 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   TravelPackages skeleton  (4 cards)
───────────────────────────────────────────── */
export function TravelPackagesSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-100/90 shadow-sm"
        >
          {/* image */}
          <Pulse className="aspect-[16/11] rounded-none" />
          {/* content */}
          <div className="p-5 flex flex-col flex-grow space-y-3">
            <Pulse className="h-5 w-3/4" />
            <Pulse className="h-3 w-1/2" />
            <Pulse className="h-3 w-full" />
            <Pulse className="h-3 w-5/6" />
            <div className="pt-3 border-t border-slate-50 flex items-center justify-between">
              <Pulse className="h-5 w-1/4" />
              <Pulse className="h-4 w-1/4" />
            </div>
            <Pulse className="h-9 w-full rounded-xl mt-1" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   TravelCategories skeleton  (6 cards)
───────────────────────────────────────────── */
export function TravelCategoriesSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col items-center text-center p-6 rounded-2xl border border-slate-100 bg-white"
        >
          {/* icon circle */}
          <div className="animate-pulse w-14 h-14 rounded-full bg-slate-200 mb-4" />
          <Pulse className="h-4 w-16" />
          <Pulse className="h-3 w-12 mt-1" />
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Testimonials skeleton  (3 cards)
───────────────────────────────────────────── */
export function TestimonialsSkeleton({ count = 3 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col justify-between p-7 rounded-3xl bg-white border border-slate-100 shadow-sm"
        >
          {/* avatar + name row */}
          <div className="flex items-center gap-3.5 mb-4">
            <div className="animate-pulse w-12 h-12 rounded-full bg-slate-200 shrink-0" />
            <div className="flex-1 space-y-2">
              <Pulse className="h-3 w-20" />
              <Pulse className="h-3 w-14" />
            </div>
          </div>
          {/* quote lines */}
          <div className="space-y-2">
            <Pulse className="h-3 w-full" />
            <Pulse className="h-3 w-5/6" />
            <Pulse className="h-3 w-4/5" />
          </div>
          {/* quote icon placeholder */}
          <div className="flex justify-end pt-4">
            <div className="animate-pulse w-8 h-8 rounded-full bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   TravelBlog skeleton  (4 cards)
───────────────────────────────────────────── */
export function TravelBlogSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100/90"
        >
          <Pulse className="aspect-[16/10] rounded-none" />
          <div className="p-4 flex flex-col flex-grow space-y-2">
            <Pulse className="h-3 w-1/3" />
            <Pulse className="h-4 w-full" />
            <Pulse className="h-4 w-4/5" />
            <Pulse className="h-3 w-full mt-1" />
            <Pulse className="h-3 w-3/4" />
            <div className="pt-3 mt-auto border-t border-slate-50 flex items-center gap-1">
              <Pulse className="h-3 w-3 rounded-full" />
              <Pulse className="h-3 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PhotoGallery skeleton  (5 photos)
───────────────────────────────────────────── */
export function PhotoGallerySkeleton({ count = 5 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="aspect-[4/3] rounded-2xl overflow-hidden bg-white/10"
        >
          <div className="animate-pulse w-full h-full bg-white/20 rounded-2xl" />
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   CuratedExperiences skeleton  (4 cards)
───────────────────────────────────────────── */
export function CuratedExperiencesSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100"
        >
          <Pulse className="aspect-square rounded-none" />
          <div className="p-3 space-y-1.5">
            <Pulse className="h-4 w-3/4" />
            <Pulse className="h-3 w-full" />
            <Pulse className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
