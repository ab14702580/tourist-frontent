import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#08151b] text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-teal-900/60 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Compass className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-white leading-none">
                  Wanderly
                </span>
                <span className="text-[8px] tracking-[0.25em] font-medium text-teal-400 uppercase mt-0.5">
                  Explore • Experience • Remember
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Handcrafted travel experiences, bespoke luxury itineraries, and unforgettable moments around the globe. Travel with confidence and complete peace of mind.
            </p>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/" className="hover:text-teal-400 transition-colors">Home</Link></li>
              <li><Link to="/destinations" className="hover:text-teal-400 transition-colors">Destinations</Link></li>
              <li><Link to="/packages" className="hover:text-teal-400 transition-colors">Packages</Link></li>
              <li><Link to="/about" className="hover:text-teal-400 transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="hover:text-teal-400 transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-teal-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Support
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#faq" className="hover:text-teal-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#faq" className="hover:text-teal-400 transition-colors">FAQs</a></li>
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-5">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                Follow Us
              </h4>
              <div className="flex items-center gap-2.5">
                <a href="#" className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-teal-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors" title="Facebook">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-teal-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors" title="Instagram">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689-.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-teal-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors" title="YouTube">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-teal-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors" title="Pinterest">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0a12 12 0 0 0-4.37 23.17c-.07-.94-.13-2.39.03-3.42.15-.98.98-4.14.98-4.14s-.25-.5-.25-1.25c0-1.17.68-2.04 1.52-2.04.72 0 1.06.54 1.06 1.18 0 .72-.46 1.8-.7 2.8-.2.84.42 1.53 1.25 1.53 1.5 0 2.66-1.58 2.66-3.87 0-2.02-1.45-3.44-3.53-3.44-2.4 0-3.81 1.8-3.81 3.66 0 .73.28 1.5.63 1.93.07.08.08.16.06.24-.07.28-.22.88-.25 1-.04.16-.13.2-.3.12-1.13-.53-1.84-2.18-1.84-3.51 0-2.86 2.08-5.48 5.99-5.48 3.14 0 5.59 2.24 5.59 5.23 0 3.12-1.97 5.63-4.7 5.63-.92 0-1.78-.48-2.08-1.04l-.57 2.16c-.2.79-.76 1.77-1.13 2.37A12 12 0 1 0 12 0z"/></svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2.5">
                Download Our App
              </h4>
              <div className="flex flex-wrap items-center gap-2">
                <a href="#" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-white transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.76 1.05-1.81.93-2.87-1 .04-2.19.67-2.88 1.48-.55.64-.99 1.7-.86 2.72 1.12.09 2.23-.59 2.81-1.33z"/></svg>
                  <div className="text-left">
                    <span className="block text-[8px] uppercase tracking-wider text-slate-400 leading-none">Download on the</span>
                    <span className="block text-xs font-semibold text-white leading-tight">App Store</span>
                  </div>
                </a>

                <a href="#" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-white transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M3.609 1.814L13.792 12 3.61 22.186a2.006 2.006 0 0 1-.61-.926V2.74c.164-.343.376-.66.61-.926zm11.39 11.39l2.42 2.42-12.756 7.37c-.312.18-.65.27-.993.27l11.33-10.06zm0-2.408l-11.33-10.06c.343 0 .68.09.993.27l12.756 7.37-2.42 2.42zm1.205 1.204l2.977-1.722a1.868 1.868 0 0 1 1.819 0l.135.078c.84.486.84 1.72 0 2.206l-.135.078-2.977 1.722-1.82-2.362z"/></svg>
                  <div className="text-left">
                    <span className="block text-[8px] uppercase tracking-wider text-slate-400 leading-none">GET IT ON</span>
                    <span className="block text-xs font-semibold text-white leading-tight">Google Play</span>
                  </div>
                </a>
              </div>
            </div>

          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2025 Wanderly. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Travel More • Worry Less</span>
            <span className="text-teal-400">🌿</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
