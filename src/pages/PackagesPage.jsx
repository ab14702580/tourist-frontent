import React, { useState, useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { 
  MapPin, Calendar, Clock, Plane, Heart, Star, ArrowRight, 
  ShieldCheck, Headphones, CalendarClock, CheckCircle, CheckCircle2,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight, SlidersHorizontal,
  Sparkles, Play, Search, X
} from 'lucide-react';

import bottomBannerImg from '../assets/destinationBottom.png';
import packageService from '../services/packageService';
import categoriesService from '../services/categoriesService';

export default function PackagesPage() {
  const context = useOutletContext() || {};
  const onBook = context.onBook || (() => {});
  const onOpenItinerary = context.onOpenItinerary || (() => {});

  const [likedIds, setLikedIds] = useState([1]);
  const [openFaq, setOpenFaq] = useState(0);

  // MongoDB packages
  const [allPackages, setAllPackages] = useState([]);
  const [pkgLoading, setPkgLoading] = useState(true);

  useEffect(() => {
    packageService.getPackages()
      .then(data => setAllPackages(data || []))
      .catch(() => setAllPackages([]))
      .finally(() => setPkgLoading(false));
  }, []);

  // Categories from DB (used in Travel Style filter)
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    categoriesService.getCategories()
      .then(data => setAllCategories(data || []))
      .catch(() => setAllCategories([]));
  }, []);

  // Trip Finder Interactive Quiz States
  const [selectedSetting, setSelectedSetting] = useState('Warm & Coastal');
  const [selectedCompanion, setSelectedCompanion] = useState('Couple / Romantic');
  const [selectedPace, setSelectedPace] = useState('Relaxed & Leisure');

  // Filter States
  const [regionFilter, setRegionFilter] = useState('All Regions');
  const [styleFilter, setStyleFilter] = useState('All Styles');
  const [durationFilter, setDurationFilter] = useState('Any Length');
  const [budgetFilter, setBudgetFilter] = useState('Any Budget');
  const [searchQuery, setSearchQuery] = useState('');

  // ── Client-side filter logic ──────────────────────────────────────────────
  const regionMap = {
    'Europe':              ['greece', 'france', 'switzerland', 'iceland', 'italy', 'spain', 'portugal'],
    'Asia & Pacific':      ['indonesia', 'japan', 'bali', 'maldives', 'thailand', 'india'],
    'Americas':            ['brazil', 'peru', 'costa rica', 'usa', 'canada', 'mexico'],
    'Africa & Middle East':['tanzania', 'egypt', 'morocco', 'south africa', 'kenya'],
  };

  // Style options from categories API
  const dynamicStyles = [
    'All Styles',
    ...allCategories.map(c => c.name).filter(Boolean),
  ];

  const parseDays = (str = '') => {
    const m = str.match(/(\d+)\s*days?/i);
    return m ? parseInt(m[1], 10) : 0;
  };

  const applyFilters = (pkg) => {
    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const haystack = `${pkg.title} ${pkg.location} ${pkg.description} ${pkg.badge}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    // Region
    if (regionFilter !== 'All Regions') {
      const keywords = regionMap[regionFilter] || [];
      const loc = (pkg.location || '').toLowerCase();
      if (!keywords.some(k => loc.includes(k))) return false;
    }

    // Style — match against package category name or badge (case-insensitive)
    if (styleFilter !== 'All Styles') {
      const pkgCategory = (pkg.category || pkg.badge || '').toLowerCase();
      if (pkgCategory !== styleFilter.toLowerCase()) return false;
    }

    // Duration
    if (durationFilter !== 'Any Length') {
      const days = parseDays(pkg.duration);
      if (durationFilter === '3 - 5 Days' && (days < 3 || days > 5)) return false;
      if (durationFilter === '6 - 8 Days' && (days < 6 || days > 8)) return false;
      if (durationFilter === '9+ Days' && days < 9) return false;
    }

    // Budget
    if (budgetFilter !== 'Any Budget') {
      const price = pkg.price || 0;
      if (budgetFilter === 'Under $1,000' && price >= 1000) return false;
      if (budgetFilter === '$1,000 - $2,000' && (price < 1000 || price > 2000)) return false;
      if (budgetFilter === '$2,000+' && price < 2000) return false;
    }

    return true;
  };

  const filteredPackages = allPackages.filter(applyFilters);

  // Pagination over filtered results
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Reset to page 1 whenever filters change
  useEffect(() => { setCurrentPage(1); }, [regionFilter, styleFilter, durationFilter, budgetFilter, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredPackages.length / itemsPerPage));
  const displayedPackages = filteredPackages.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // "Most Loved" top 4 by rating from MongoDB
  const popularPackagesMongo = [...allPackages]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 4);

  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLikedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const comparePackagesData = [
    {
      thumb: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=100&q=80',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=80',
      name: 'Santorini Sunsets',
      title: 'Santorini Sunsets',
      duration: '7 Days',
      accommodation: '5-Star Resort',
      tours: '4 Guided Tours',
      price: 1299,
      location: 'Santorini, Greece',
    },
    {
      thumb: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=100&q=80',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80',
      name: 'Bali Serenity Escape',
      title: 'Bali Serenity Escape',
      duration: '8 Days',
      accommodation: 'Boutique Villa',
      tours: '5 Guided Tours',
      price: 1499,
      location: 'Bali, Indonesia',
    },
    {
      thumb: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=100&q=80',
      image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=900&q=80',
      name: 'Japan Cherry Blossom',
      title: 'Japan Cherry Blossom',
      duration: '10 Days',
      accommodation: '4-Star Hotel',
      tours: '6 Guided Tours',
      price: 2199,
      location: 'Tokyo, Japan',
    },
    {
      thumb: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=100&q=80',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=900&q=80',
      name: 'Tanzania Safari Adventure',
      title: 'Tanzania Safari Adventure',
      duration: '9 Days',
      accommodation: 'Luxury Safari Lodge',
      tours: '7 Guided Tours',
      price: 3499,
      location: 'Serengeti, Tanzania',
    },
    {
      thumb: 'https://images.unsplash.com/photo-1499678329028-101435549a4e?auto=format&fit=crop&w=100&q=80',
      image: 'https://images.unsplash.com/photo-1499678329028-101435549a4e?auto=format&fit=crop&w=900&q=80',
      name: 'Maldives Overwater Bliss',
      title: 'Maldives Overwater Bliss',
      duration: '6 Days',
      accommodation: 'Overwater Bungalow',
      tours: '3 Guided Tours',
      price: 2899,
      location: 'Maldives',
    },
  ];

  const interestCategories = [
    {
      name: 'Beach & Coastal',
      count: '24 Packages',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Mountain & Hiking',
      count: '18 Packages',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'City & Culture',
      count: '31 Packages',
      image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Wildlife & Safari',
      count: '12 Packages',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Romantic Escapes',
      count: '15 Packages',
      image: 'https://images.unsplash.com/photo-1499678329028-101435549a4e?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Adventure & Sports',
      count: '20 Packages',
      image: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const testimonialsList = [
    {
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      name: 'Sarah Mitchell',
      location: 'New York, USA',
      quote: 'Absolutely breathtaking experience! Every detail was perfectly arranged. Wanderly made our honeymoon unforgettable.',
      packageTag: '✈ Santorini Sunsets Package',
    },
    {
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      name: 'James Fernandez',
      location: 'London, UK',
      quote: 'From the moment we landed to the final transfer home, everything was seamless. The local guides were outstanding.',
      packageTag: '✈ Bali Serenity Escape',
    },
    {
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      name: 'Amina Youssef',
      location: 'Dubai, UAE',
      quote: 'I had been dreaming of Japan for years. Wanderly turned it into reality — and exceeded every expectation.',
      packageTag: '✈ Japan Cherry Blossom Tour',
    },
  ];

  const faqs = [
    {
      q: "What is typically included in each travel package?",
      a: "All Wanderly packages include curated hotel accommodations, verified return flight tickets with major carriers, daily gourmet breakfast, airport transfers, entrance tickets for scheduled tours, and 24/7 dedicated support via our concierge app."
    },
    {
      q: "Can I customize or modify a package itinerary?",
      a: "Yes! Every itinerary can be tailored to your schedule and preferences. You can adjust the trip duration, upgrade accommodations, or swap activities during booking."
    },
    {
      q: "What is the cancellation and refund policy?",
      a: "We offer free cancellation up to 14 days prior to your departure date with a 100% refund or rebooking credit, ensuring complete peace of mind."
    },
    {
      q: "Are international or domestic flights guaranteed?",
      a: "Yes, when flights are indicated as included, we issue confirmed round-trip airline tickets with reputable carriers including checked baggage allowance."
    }
  ];

  return (
    <div className="bg-white text-slate-800 font-sans selection:bg-teal-700 selection:text-white pt-20">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION                                */}
      {/* ========================================================================= */}
      <section className="py-12 md:py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-teal-700 uppercase">
                <span className="w-5 h-0.5 bg-teal-700 inline-block"></span>
                OUR PACKAGES
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.12] tracking-tight">
                Handpicked Travel<br />
                Packages for You
              </h1>

              <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl">
                Explore our carefully curated travel packages designed to give you the perfect mix of adventure, relaxation, and authentic cultural experiences around the world.
              </p>

              {/* Search Box Card */}
              <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-xl border border-slate-100 max-w-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  
                  <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-50 border border-slate-100">
                    <MapPin className="w-5 h-5 text-teal-700 shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block leading-tight">Where to?</span>
                      <input 
                        type="text" 
                        placeholder="Search destinations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="text-xs font-medium text-slate-800 bg-transparent focus:outline-none placeholder-slate-400 w-full"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-50 border border-slate-100">
                    <Calendar className="w-5 h-5 text-teal-700 shrink-0" />
                    <div className="flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block leading-tight">When?</span>
                      <input 
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        className="text-xs font-medium text-slate-800 bg-transparent focus:outline-none w-full"
                      />
                    </div>
                  </div>

                </div>

                <button 
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('find-journey');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-3 px-6 rounded-xl bg-[#0c7c72] hover:bg-[#0a665e] active:scale-98 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Search className="w-4 h-4 stroke-[2.2]" />
                  <span>Search</span>
                </button>
              </div>

              {/* Trust Indicators Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-5 h-5 text-teal-700 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block leading-tight">Best Price</span>
                    <span className="text-[10px] text-slate-400">Guaranteed</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Headphones className="w-5 h-5 text-teal-700 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block leading-tight">24/7</span>
                    <span className="text-[10px] text-slate-400">Support</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block leading-tight">Trusted</span>
                    <span className="text-[10px] text-slate-400">Partners</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <CalendarClock className="w-5 h-5 text-teal-700 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block leading-tight">Flexible</span>
                    <span className="text-[10px] text-slate-400">Booking</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80" 
                  alt="Dream Explore Discover"
                  className="w-full h-full object-cover" 
                />

                {/* Cursive Text */}
                <div className="absolute top-6 left-6 text-white select-none">
                  <span className="font-serif italic text-2xl sm:text-3xl font-bold drop-shadow-lg block">
                    Dream • Explore • Discover
                  </span>
                </div>

                {/* Floating card bottom-left */}
                <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-md p-2.5 pr-4 rounded-2xl shadow-xl flex items-center gap-3">
                  <img 
                    src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=100&q=80" 
                    alt="Santorini Sunsets"
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block leading-tight">Santorini Sunsets</span>
                    <span className="text-[10px] text-teal-700 font-semibold">From $1,299</span>
                  </div>
                </div>

                {/* Floating video pill bottom-right */}
                <div className="absolute bottom-5 right-5 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full shadow-xl cursor-pointer hover:bg-white transition-all">
                  <div className="w-6 h-6 rounded-full bg-[#0c7c72] text-white flex items-center justify-center">
                    <Play className="w-3 h-3 fill-white translate-x-0.5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-900">Watch Our Story</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. MOST LOVED TRAVEL PACKAGES         */}
      {/* ========================================================================= */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-teal-700 uppercase mb-2">
                <span className="w-5 h-0.5 bg-teal-700 inline-block"></span>
                POPULAR PACKAGES
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Most Loved Travel Packages
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                These are the top-rated and most booked packages curated by our travel specialists.
              </p>
            </div>

            <button
              onClick={() => {
                const el = document.getElementById('find-journey');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-teal-800 hover:text-teal-900 group"
            >
              <span>View All Packages</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(pkgLoading ? Array.from({ length: 4 }) : popularPackagesMongo).map((pkg, idx) => {
              if (pkgLoading) return (
                <div key={idx} className="animate-pulse flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
                  <div className="aspect-[16/11] bg-slate-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 bg-slate-200 rounded w-1/2" />
                    <div className="h-5 bg-slate-200 rounded w-3/4" />
                    <div className="h-3 bg-slate-200 rounded w-full" />
                    <div className="h-9 bg-slate-200 rounded-xl w-full mt-2" />
                  </div>
                </div>
              );
              const isLiked = likedIds.includes(pkg.id);
              return (
                <div
                  key={pkg.id}
                  className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                    <img 
                      src={pkg.image} 
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    
                    <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm ${pkg.badgeColor}`}>
                      {pkg.badge}
                    </span>

                    <button
                      onClick={(e) => toggleLike(pkg.id, e)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-700 hover:bg-white hover:text-rose-600 transition-colors shadow-sm"
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  </div>

                  <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-1 text-xs text-slate-400 mb-1">
                        <MapPin className="w-3 h-3 text-teal-700" />
                        <span>{pkg.location}</span>
                      </div>
                      <h3 className="font-serif font-bold text-lg text-slate-900 group-hover:text-teal-800 transition-colors">
                        {pkg.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-teal-700" />{pkg.duration}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Plane className="w-3.5 h-3.5 text-teal-700" />{pkg.flights}</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between pt-3 border-t border-slate-100 mb-3">
                        <div>
                          <span className="font-bold text-lg text-slate-900">${pkg.price}</span>
                          <span className="text-[11px] text-slate-400 ml-1">/ person</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          to={`/packages/${pkg.id}`}
                          className="py-2.5 rounded-xl border border-slate-200 hover:border-teal-700 hover:bg-teal-50 text-slate-700 hover:text-teal-800 font-semibold text-xs flex items-center justify-center transition-all"
                        >
                          Details
                        </Link>
                        <button
                          type="button"
                          onClick={() => onBook(pkg)}
                          className="py-2.5 rounded-xl bg-[#0c7c72] hover:bg-[#0a665e] active:scale-98 text-white font-medium text-xs flex items-center justify-center gap-1 shadow-sm transition-all"
                        >
                          <span>Book</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MORE THAN JUST A TRIP (Mint Tinted Section)   */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-20 bg-[#eef8f6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-teal-700 uppercase">
                <span className="w-5 h-0.5 bg-teal-700 inline-block"></span>
                WHY CHOOSE US
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
                More Than Just a Trip
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                We create meaningful travel experiences that stay with you forever. Every package includes seamless logistics, vetted local guides, and 24/7 on-ground assistance.
              </p>

              {/* 4 Feature Points Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                    <Star className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Expert Guides</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Local insights, richer experiences.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Curated Experiences</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Unique, authentic, memorable.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Safe & Secure</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Your safety is our priority.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">24/7 Support</h4>
                    <p className="text-xs text-slate-500 mt-0.5">We're here for you, always.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Polaroid Photo Stack Visual */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative">
                {/* Back tilted polaroid */}
                <div className="w-64 sm:w-72 bg-white p-3 pb-8 rounded-2xl shadow-xl transform -rotate-6 border border-slate-100">
                  <img 
                    src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=500&q=80" 
                    alt="Travel Moments" 
                    className="w-full aspect-[4/3] object-cover rounded-xl"
                  />
                  <div className="text-center mt-3 font-serif italic text-xs text-slate-400">
                    Memories to Cherish
                  </div>
                </div>

                {/* Front polaroid */}
                <div className="w-64 sm:w-72 bg-white p-3 pb-8 rounded-2xl shadow-2xl transform rotate-3 -mt-36 sm:-mt-40 ml-8 sm:ml-12 border border-slate-100">
                  <img 
                    src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=500&q=80" 
                    alt="Amalfi Coast 2024" 
                    className="w-full aspect-[4/3] object-cover rounded-xl"
                  />
                  <div className="text-center mt-3 font-serif italic text-xs font-semibold text-slate-700">
                    Amalfi Coast, 2024
                  </div>
                </div>

                {/* Cursive Tag */}
                <span className="absolute -bottom-6 right-0 font-serif italic text-xl font-bold text-teal-800 -rotate-6 select-none">
                  Not Things ♡
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. WHAT OUR TRAVELERS SAY             */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-teal-700 uppercase mb-2">
                <span className="w-5 h-0.5 bg-teal-700 inline-block"></span>
                TRAVELER REVIEWS
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                What Our Travelers Say
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Real stories. Real experiences. Hear from our happy travelers worldwide.
              </p>
            </div>

            {/* Slider arrows */}
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonialsList.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <img 
                      src={item.avatar} 
                      alt={item.name} 
                      className="w-11 h-11 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{item.name}</h4>
                      <span className="text-xs text-slate-400">{item.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{item.quote}"
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-teal-700">
                    {item.packageTag}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FIND YOUR PERFECT JOURNEY           */}
      {/* ========================================================================= */}
      <section id="find-journey" className="py-16 md:py-20 bg-slate-50/70 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-teal-700 uppercase mb-2">
              <span className="w-5 h-0.5 bg-teal-700 inline-block"></span>
              EXPLORE MORE
              <span className="w-5 h-0.5 bg-teal-700 inline-block"></span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Find Your Perfect Journey
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Filter by style, duration, or budget to discover comprehensive itineraries crafted by destination masters.
            </p>
          </div>

          {/* Filter Bar with 4 Dropdowns and Filter Button */}
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap lg:flex-nowrap items-center gap-3 mb-10">
            
            {/* Region */}
            <div className="flex-1 min-w-[150px]">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 pl-3">Destination Region</label>
              <select 
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="w-full text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2.5 focus:outline-none focus:border-teal-700"
              >
                <option>All Regions</option>
                <option>Europe</option>
                <option>Asia & Pacific</option>
                <option>Americas</option>
                <option>Africa & Middle East</option>
              </select>
            </div>

            {/* Travel Style */}
            <div className="flex-1 min-w-[150px]">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 pl-3">Travel Style</label>
              <select 
                value={styleFilter}
                onChange={(e) => setStyleFilter(e.target.value)}
                className="w-full text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2.5 focus:outline-none focus:border-teal-700"
              >
                {dynamicStyles.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Duration */}
            <div className="flex-1 min-w-[150px]">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 pl-3">Duration</label>
              <select 
                value={durationFilter}
                onChange={(e) => setDurationFilter(e.target.value)}
                className="w-full text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2.5 focus:outline-none focus:border-teal-700"
              >
                <option>Any Length</option>
                <option>3 - 5 Days</option>
                <option>6 - 8 Days</option>
                <option>9+ Days</option>
              </select>
            </div>

            {/* Budget */}
            <div className="flex-1 min-w-[150px]">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 pl-3">Budget</label>
              <select 
                value={budgetFilter}
                onChange={(e) => setBudgetFilter(e.target.value)}
                className="w-full text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2.5 focus:outline-none focus:border-teal-700"
              >
                <option>Any Budget</option>
                <option>Under $1,000</option>
                <option>$1,000 - $2,000</option>
                <option>$2,000+</option>
              </select>
            </div>

            {/* Action button */}
            <div className="w-full lg:w-auto self-end pt-2 lg:pt-0">
              <button 
                type="button"
                className="w-full lg:w-auto px-6 py-2.5 rounded-xl bg-[#0c7c72] hover:bg-[#0a665e] text-white font-medium text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filter ({filteredPackages.length})</span>
              </button>
            </div>

          </div>

          {/* Package Cards Grid — MongoDB filtered results */}
          {pkgLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex flex-col">
                  <div className="aspect-[16/10] bg-slate-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 bg-slate-200 rounded w-1/3" />
                    <div className="h-5 bg-slate-200 rounded w-3/4" />
                    <div className="h-3 bg-slate-200 rounded w-full" />
                    <div className="h-3 bg-slate-200 rounded w-5/6" />
                    <div className="flex gap-2 mt-2">
                      <div className="h-6 bg-slate-200 rounded-lg w-16" />
                      <div className="h-6 bg-slate-200 rounded-lg w-16" />
                    </div>
                    <div className="pt-4 flex justify-between items-center border-t border-slate-100">
                      <div className="h-5 bg-slate-200 rounded w-1/4" />
                      <div className="h-8 bg-slate-200 rounded-xl w-24" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPackages.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-slate-400 text-sm">No packages match the selected filters.</p>
              <button
                onClick={() => { setRegionFilter('All Regions'); setStyleFilter('All Styles'); setDurationFilter('Any Length'); setBudgetFilter('Any Budget'); setSearchQuery(''); }}
                className="mt-4 px-5 py-2 rounded-full bg-teal-700 text-white text-xs font-medium"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedPackages.map((pkg) => (
              <div 
                key={pkg.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <span className="absolute top-3 left-3 text-[10px] font-bold px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white">
                    {pkg.badge}
                  </span>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] font-bold text-slate-900 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{pkg.rating}</span>
                    <span className="text-slate-400 font-normal">({pkg.reviews})</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 block mb-1">
                      {pkg.badge}
                    </span>
                    <h3 className="font-serif font-bold text-xl text-slate-900 group-hover:text-teal-800 transition-colors">
                      {pkg.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {pkg.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mt-4 text-[11px] text-slate-500">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100">{pkg.duration}</span>
                      {pkg.location && <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100">{pkg.location}</span>}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Starting From</span>
                      <span className="text-lg font-bold text-slate-900">${pkg.price}</span>
                      <span className="text-xs text-slate-400"> / person</span>
                    </div>

                    <Link
                      to={`/packages/${pkg.id}`}
                      className="px-4 py-2 rounded-xl bg-[#0c7c72] hover:bg-[#0a665e] text-white text-xs font-semibold shadow-sm transition-all inline-block"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
{ totalPages > 1 && (
  <div className="flex justify-center items-center space-x-2 mt-6">
    <button
      onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
      disabled={currentPage === 1}
      className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-teal-600 text-white hover:bg-teal-700'}`}
    >
      Prev
    </button>
    {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
      <button
        key={num}
        onClick={() => setCurrentPage(num)}
        className={`px-3 py-1 rounded ${currentPage === num ? 'bg-teal-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
      >
        {num}
      </button>
    ))}
    <button
      onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
      disabled={currentPage === totalPages}
      className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-teal-600 text-white hover:bg-teal-700'}`}
    >
      Next
    </button>
  </div>
)}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. TRAVEL BY INTEREST                  */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-teal-700 uppercase mb-2">
              <span className="w-5 h-0.5 bg-teal-700 inline-block"></span>
              CATEGORIES
              <span className="w-5 h-0.5 bg-teal-700 inline-block"></span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Travel by Interest
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Find an experience shaped by what matters most to you.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {interestCategories.map((cat, i) => (
              <div
                key={i}
                className="group cursor-pointer relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-4 text-white"
              >
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                <div className="relative z-10">
                  <span className="text-[9px] font-bold tracking-widest text-teal-300 block mb-0.5">
                    {cat.count}
                  </span>
                  <h4 className="font-serif font-bold text-sm sm:text-base leading-snug">
                    {cat.name}
                  </h4>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. TRIP FINDER                        */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-20 bg-slate-50/70 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Interactive Quiz */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-teal-700 uppercase mb-2">
                  <span className="w-5 h-0.5 bg-teal-700 inline-block"></span>
                  TRIP FINDER
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                  Not sure where to go? Let us match your vibe.
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
                  Answer 3 quick preferences and our destination algorithm will pair you with the package that fits your pace, comfort, and desires.
                </p>
              </div>

              {/* Question 1 */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                  1. What setting speaks to you?
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Warm & Coastal', 'Alpine / Cold', 'Historic Cities'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSelectedSetting(opt)}
                      className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                        selectedSetting === opt
                          ? 'bg-[#0c7c72] text-white shadow-sm border border-[#0c7c72]'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2 */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                  2. Who are you traveling with?
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Solo Adventurer', 'Couple / Romantic', 'Family & Kids'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSelectedCompanion(opt)}
                      className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                        selectedCompanion === opt
                          ? 'bg-[#0c7c72] text-white shadow-sm border border-[#0c7c72]'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3 */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                  3. Desired pace?
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Relaxed & Leisure', 'Balanced Mix', 'Action-Packed'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSelectedPace(opt)}
                      className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                        selectedPace === opt
                          ? 'bg-[#0c7c72] text-white shadow-sm border border-[#0c7c72]'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenItinerary}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0c7c72] hover:bg-[#0a665e] active:scale-98 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Find My Recommended Itinerary</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right Result Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl group cursor-pointer text-white flex flex-col justify-between p-6 sm:p-8">
                <img 
                  src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80" 
                  alt="Amalfi Coast Discovery"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40"></div>

                <div className="relative z-10 flex justify-start">
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-teal-500/90 backdrop-blur-md text-white shadow-sm">
                    ✨ 99% Match For You
                  </span>
                </div>

                <div className="relative z-10">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-teal-300 block mb-1">
                    RECOMMENDED JOURNEY
                  </span>
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl leading-snug mb-1">
                    Amalfi Coast Panoramic Discovery
                  </h3>
                  <div className="flex items-center justify-between pt-2">
                    <p className="text-xs text-slate-300">
                      7 Days • Boutique Cliffside Villa • Private Boat Tour
                    </p>
                    <span className="text-xl font-bold text-white">$1,690</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. COMPARE TOP PACKAGES               */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-teal-700 uppercase mb-2">
              <span className="w-5 h-0.5 bg-teal-700 inline-block"></span>
              TRANSPARENT VALUE
              <span className="w-5 h-0.5 bg-teal-700 inline-block"></span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Compare Top Packages
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Detailed breakdown of what makes each journey extraordinary.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="py-4 px-6">Package Name</th>
                  <th className="py-4 px-6">Duration</th>
                  <th className="py-4 px-6">Accommodation</th>
                  <th className="py-4 px-6">Flights Included</th>
                  <th className="py-4 px-6">Guided Tours</th>
                  <th className="py-4 px-6">Starting Price</th>
                  <th className="py-4 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {comparePackagesData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img 
                          src={row.thumb} 
                          alt={row.name}
                          className="w-10 h-10 rounded-xl object-cover shrink-0" 
                        />
                        <span className="font-bold text-slate-900">{row.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">{row.duration}</td>
                    <td className="py-4 px-6">{row.accommodation}</td>
                    <td className="py-4 px-6 text-teal-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-teal-600" />
                      <span>Included</span>
                    </td>
                    <td className="py-4 px-6">{row.tours}</td>
                    <td className="py-4 px-6 font-bold text-slate-900 text-sm">${row.price}</td>
                    <td className="py-4 px-6 text-center">
                      <button
                        type="button"
                        onClick={() => onBook(row)}
                        className="px-4 py-1.5 rounded-lg bg-[#0c7c72] hover:bg-[#0a665e] text-white text-xs font-semibold shadow-sm transition-all"
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. FREQUENTLY ASKED QUESTIONS         */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-20 bg-slate-50/60 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-teal-700 uppercase mb-2">
              <span className="w-5 h-0.5 bg-teal-700 inline-block"></span>
              FREQUENTLY ASKED QUESTIONS
              <span className="w-5 h-0.5 bg-teal-700 inline-block"></span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Everything You Need to Know
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4"
                  >
                    <span className="font-serif font-bold text-sm sm:text-base text-slate-900">
                      {faq.q}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-500 leading-relaxed border-t border-slate-50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. BOTTOM BANNER                    */}
      {/* ========================================================================= */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div 
            className="relative rounded-3xl overflow-hidden bg-cover bg-center shadow-2xl p-8 sm:p-14 text-white"
            style={{ backgroundImage: `url(${bottomBannerImg})` }}
          >
            <div className="absolute inset-0 bg-[#091b22]/85 backdrop-blur-[2px]"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              
              <div className="max-w-xl space-y-4 text-center lg:text-left">
                <h3 className="font-serif text-3xl sm:text-5xl font-bold leading-tight tracking-tight text-white">
                  Ready for Your Next<br />
                  Adventure?
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Discover amazing destinations, exclusive early-bird deals, and unforgettable experiences planned down to the very last detail.
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                  <button
                    onClick={() => {
                      const el = document.getElementById('find-journey');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-3 rounded-full bg-[#0c7c72] hover:bg-[#0a665e] text-white text-xs font-semibold shadow-lg transition-all active:scale-95 flex items-center gap-1.5"
                  >
                    <span>Explore Packages</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={onOpenItinerary}
                    className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold transition-all"
                  >
                    Speak with a Specialist
                  </button>
                </div>
              </div>

              {/* Right cursive script */}
              <div className="text-center lg:text-right select-none">
                <span className="font-serif italic text-3xl sm:text-4xl lg:text-5xl font-bold text-white/90 drop-shadow-lg block -rotate-3">
                  Adventure
                </span>
                <span className="font-serif italic text-4xl sm:text-5xl lg:text-6xl font-extrabold text-amber-200 drop-shadow-xl block -rotate-6">
                  Awaits ♡
                </span>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
