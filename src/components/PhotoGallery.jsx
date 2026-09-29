import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, X, Maximize2 } from 'lucide-react';
import galleryService from '../services/galleryService';
import momentsMatterBg from '../assets/MomentsMatter.png';
import { PhotoGallerySkeleton } from './Skeletons';

export default function PhotoGallery() {
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    galleryService.getGallery()
      .then(setGalleryPhotos)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryPhotos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === galleryPhotos.length - 1 ? 0 : prev + 1));
  };

  const openModal = (photo, index) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
  };

  const nextModal = () => {
    const nextIdx = (currentIndex + 1) % galleryPhotos.length;
    setCurrentIndex(nextIdx);
    setSelectedPhoto(galleryPhotos[nextIdx]);
  };

  const prevModal = () => {
    const prevIdx = (currentIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
    setCurrentIndex(prevIdx);
    setSelectedPhoto(galleryPhotos[prevIdx]);
  };

  return (
    <section 
      id="gallery" 
      className="relative py-24 text-white overflow-hidden"
    >
      {/* Background Image: MomentsMatter.png */}
      <div className="absolute inset-0 z-0">
        <img
          src={momentsMatterBg || "/MomentsMatter.png"}
          alt="Moments That Matter Background"
          className="w-full h-full object-cover object-center scale-100"
        />
        {/* Soft vignette so the turquoise water, limestone cliffs, and sunset are clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-teal-300 uppercase mb-2 drop-shadow">
              <span className="w-5 h-0.5 bg-teal-400 inline-block"></span>
              PHOTO GALLERY
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white drop-shadow-md">
              Moments That Matter
            </h2>
            <p className="text-slate-200 text-sm sm:text-base mt-2 max-w-xl font-light drop-shadow">
              A curated collection of breathtaking places, happy travelers and unforgettable moments.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="#gallery" 
              className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-teal-300 hover:text-white transition-colors group drop-shadow"
            >
              <span>View Gallery</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </a>

            <div className="flex items-center gap-2">
              <button 
                onClick={handlePrev}
                className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 flex items-center justify-center text-white transition-all backdrop-blur-sm shadow-md active:scale-95"
                title="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={handleNext}
                className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 flex items-center justify-center text-white transition-all backdrop-blur-sm shadow-md active:scale-95"
                title="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {loading ? <PhotoGallerySkeleton count={5} /> : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {galleryPhotos.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => openModal(photo, index)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-slate-900/60 backdrop-blur-sm shadow-xl ring-1 ring-white/20 hover:ring-teal-400/80 transition-all duration-300 transform hover:-translate-y-1"
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-colors"></div>
                
                <div className="absolute inset-0 p-3.5 flex flex-col justify-end">
                  <span className="text-xs font-semibold text-white drop-shadow-sm truncate">
                    {photo.title}
                  </span>
                  <span className="text-[11px] text-teal-300 flex items-center gap-1 mt-1 opacity-90 group-hover:opacity-100">
                    <Maximize2 className="w-3 h-3" /> Click to view
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={prevModal}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextModal}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] bg-black flex items-center justify-center">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-4 bg-slate-900 flex items-center justify-between border-t border-slate-800">
              <div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                  {selectedPhoto.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Photo {currentIndex + 1} of {galleryPhotos.length}
                </p>
              </div>
              <span className="text-xs text-teal-400 font-medium px-3 py-1 rounded-full bg-teal-950/60 border border-teal-800/50">
                Wanderly Curated Archive
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
