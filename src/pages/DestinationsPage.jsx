import React, { useState, useEffect } from 'react';
import { useOutletContext, Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, Calendar, Users, Search, Heart, Star, ArrowRight,
  ShieldCheck, Tag, Headphones, Sparkles, UserCheck, CalendarClock,
  Compass, Mountain, Building2, Landmark, Waves, Play,
  Globe, Utensils,
  Briefcase
} from 'lucide-react';

// Curated destination hero and section imagery
import heroBg from '../assets/DestinationHero.jpeg';
import sectionGirlImg from '../assets/destinationSection.png';
import bottomBannerImg from '../assets/destinationBottom.png';
import { destinationService } from '../services';

// Curated Experiences (UI-only, not from DB)
const curatedExperiences = [
  {
    title: "Local Food Tours",
    desc: "Taste authentic flavors at hidden gems.",
    icon: Utensils,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Adventure Activities",
    desc: "Feel the thrill, live the adventure.",
    icon: Mountain,
    image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Cultural Immersion",
    desc: "Connect with local traditions and people.",
    icon: Landmark,
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Wellness Retreats",
    desc: "Relax, recharge, feel refreshed.",
    icon: Waves,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80"
  }
];

export default function DestinationsPage() {
  const navigate = useNavigate();
  const context = useOutletContext() || {};
  const onOpenItinerary = context.onOpenItinerary || (() => {});

  const [activeCategory, setActiveCategory] = useState('All');
  const [likedIds, setLikedIds] = useState([1, 3]);
  const [searchWhere, setSearchWhere] = useState('');
  const [searchTravelers, setSearchTravelers] = useState('2 adults');
  const [appliedSearch, setAppliedSearch] = useState('');

  // Dynamic data from MongoDB
  const [allDestinations, setAllDestinations] = useState([]);
  const [destLoading, setDestLoading] = useState(true);

  // Fetch all destinations once on mount
  useEffect(() => {
    destinationService.getDestinations()
      .then(data => setAllDestinations(data || []))
      .catch(() => setAllDestinations([]))
      .finally(() => setDestLoading(false));
  }, []);

  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLikedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Dynamic categories — derived from actual destination data in DB
  const CATEGORY_ICON_MAP = {
    Beach:     Waves,
    Mountain:  Mountain,
    City:      Building2,
    Cultural:  Landmark,
    Adventure: Compass,
    Wildlife:  Globe,
    Eco:       Globe,
    Nature:    Globe,
  };

  const dynamicCategories = [
    { name: 'All', icon: null },
    ...[...new Set(
      allDestinations
        .map(d => d.category)
        .filter(Boolean)
    )]
    .sort()
    .map(name => ({ name, icon: CATEGORY_ICON_MAP[name] || Globe })),
  ];

  // Apply both category and search filters on full dataset
  const filteredCards = allDestinations.filter(card => {
    const matchCategory = activeCategory === 'All' || card.category === activeCategory;
    const q = appliedSearch.toLowerCase();
    const matchSearch = !q ||
      card.title.toLowerCase().includes(q) ||
      card.country.toLowerCase().includes(q) ||
      (card.category && card.category.toLowerCase().includes(q));
    return matchCategory && matchSearch;
  });

  // Section 2 "Top Destinations" shows same filtered set (up to 5)
  const destinationDesign2Cards = filteredCards.slice(0, 5);

  const handleSearch = () => {
    setAppliedSearch(searchWhere.trim());
    // scroll down to the destinations section
    const el = document.getElementById('destinations-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white text-slate-800 font-sans selection:bg-teal-700 selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section 
        className="relative min-h-[580px] md:min-h-[640px] flex items-center justify-center bg-cover bg-center pt-24 pb-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Soft dark vignette overlay to make typography pop */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/60 pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-start justify-center">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-white/90 mb-4 font-medium tracking-wide">
            <Link to="/" className="hover:text-teal-300 transition-colors">Home</Link>
            <span className="text-white/60">/</span>
            <span className="text-white">Destinations</span>
          </nav>

          {/* Headline */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold leading-tight tracking-tight text-white mb-4">
            Explore <br />
            <span className="text-[#38e1c6] drop-shadow-sm">Destinations</span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-xl font-normal leading-relaxed mb-10 drop-shadow">
            Discover extraordinary places, create unforgettable memories and experience the world like never before.
          </p>

          {/* Search Pill Bar */}
          <div className="w-full max-w-3xl bg-white rounded-3xl md:rounded-full p-2.5 sm:p-3 shadow-2xl flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-100 border border-slate-100">
            
            {/* Where to? */}
            <div className="flex-1 flex items-center gap-3 px-4 py-2">
              <MapPin className="w-5 h-5 text-teal-700 shrink-0" />
              <div className="flex flex-col text-left w-full">
                <span className="text-[11px] font-bold text-slate-900 tracking-wide">Where to?</span>
                <input 
                  type="text"
                  placeholder="Search destinations"
                  value={searchWhere}
                  onChange={(e) => setSearchWhere(e.target.value)}
                  className="text-xs text-slate-500 placeholder-slate-400 bg-transparent focus:outline-none w-full"
                />
              </div>
            </div>

            {/* When? */}
            <div className="flex-1 flex items-center gap-3 px-4 py-2">
              <Calendar className="w-5 h-5 text-teal-700 shrink-0" />
              <div className="flex flex-col text-left w-full">
                <span className="text-[11px] font-bold text-slate-900 tracking-wide">When?</span>
                <input 
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  className="text-xs text-slate-500 bg-transparent focus:outline-none w-full"
                />
              </div>
            </div>

            {/* Travelers */}
            <div className="flex-1 flex items-center gap-3 px-4 py-2">
              <Users className="w-5 h-5 text-teal-700 shrink-0" />
              <div className="flex flex-col text-left w-full">
                <span className="text-[11px] font-bold text-slate-900 tracking-wide">Travelers</span>
                <input 
                  type="text"
                  placeholder="2 adults"
                  value={searchTravelers}
                  onChange={(e) => setSearchTravelers(e.target.value)}
                  className="text-xs text-slate-500 placeholder-slate-400 bg-transparent focus:outline-none w-full"
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="p-1">
              <button 
                type="button"
                onClick={handleSearch}
                className="w-full md:w-auto px-7 py-3 rounded-full bg-[#0c7c72] hover:bg-[#096860] active:scale-95 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-md transition-all duration-200"
              >
                <Search className="w-4 h-4 stroke-[2.2]" />
                <span>Search</span>
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. POPULAR DESTINATIONS                  */}
      {/* ========================================================================= */}
      <section id="destinations-section" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header with Category Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-teal-700 uppercase mb-2">
                <span className="w-5 h-0.5 bg-teal-700 inline-block"></span>
                POPULAR DESTINATIONS
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Popular Destinations
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Discover handpicked destinations loved by travelers around the world.
              </p>
            </div>

            {/* Category Pills — dynamic from DB */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {dynamicCategories.map((cat) => {
                const isActive = activeCategory === cat.name;
                const IconComponent = cat.icon;
                return (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                      isActive 
                        ? "bg-[#0c7c72] text-white shadow-sm"
                        : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200"
                    }`}
                  >
                    {IconComponent && <IconComponent className="w-3.5 h-3.5" />}
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* All Destination Cards — filtered by category + search */}
          {destLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="animate-pulse flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100">
                  <div className="m-2 aspect-[4/3] rounded-2xl bg-slate-200" />
                  <div className="px-3 pt-1 pb-3 space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-3/4" />
                    <div className="h-3 bg-slate-200 rounded w-1/2" />
                    <div className="pt-2 flex justify-between">
                      <div className="h-4 bg-slate-200 rounded w-1/3" />
                      <div className="h-7 bg-slate-200 rounded-xl w-20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredCards.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-slate-400 text-sm">No destinations found for "<span className="font-semibold text-slate-600">{appliedSearch || activeCategory}</span>".</p>
              <button
                onClick={() => { setActiveCategory('All'); setAppliedSearch(''); setSearchWhere(''); }}
                className="mt-4 px-5 py-2 rounded-full bg-teal-700 text-white text-xs font-medium"
              >
                Clear Filters
              </button>
            </div>
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {filteredCards.map((item) => {
              const isLiked = likedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => navigate(`/destinations/${item.id}`)}
                  className="group cursor-pointer flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-slate-100"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 m-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(item.id, e);
                      }}
                      className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center text-slate-700 hover:bg-white hover:text-rose-600 transition-all shadow-sm z-10"
                      title="Add to wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  </div>

                  <div className="px-3 pt-1 pb-3 flex flex-col flex-grow justify-between">
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-teal-700 shrink-0" />
                          <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-teal-800 transition-colors">
                            {item.title}
                          </h3>
                        </div>
                        <span className="text-xs text-slate-400 pl-4 block mt-0.5">
                          {item.country}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-xs font-bold text-slate-800 shrink-0">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{item.rating}</span>
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] text-slate-400 font-normal">From</span>
                        <span className="font-bold text-sm text-slate-900 ml-1">
                          ${item.price}
                        </span>
                        <span className="text-[11px] text-slate-400 font-normal">
                          / night
                        </span>
                      </div>
                      <Link
                        to={`/destinations/${item.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="px-2.5 py-1 rounded-xl bg-teal-50 group-hover:bg-[#0c7c72] text-teal-800 group-hover:text-white font-semibold text-xs transition-colors shadow-sm"
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

      {/* ========================================================================= */}
      {/* 3. WHY TRAVEL WITH US? */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-20 bg-slate-50/60 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-teal-700 uppercase mb-2">
                  <span className="w-5 h-0.5 bg-teal-700 inline-block"></span>
                  WHY TRAVEL WITH US?
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
                  More Than Just a Trip,<br />
                  It’s a Life Experience
                </h2>
                <p className="text-slate-500 text-sm sm:text-base mt-3 leading-relaxed max-w-xl">
                  We make travel simple, safe and unforgettable. From handpicked destinations to 24/7 support, we’re with you every step of the way.
                </p>
              </div>

              {/* 6 Feature Items (2 Columns x 3 Rows) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 pt-2">
                
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
                    <ShieldCheck className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Trusted & Safe</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Your safety is our priority.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
                    <Tag className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Best Price Guarantee</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Get the best value for your money.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
                    <Headphones className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">24/7 Support</h4>
                    <p className="text-xs text-slate-500 mt-0.5">We're always here to help.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
                    <Sparkles className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Curated Experiences</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Unique trips, not just tourist spots.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
                    <UserCheck className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Expert Guides</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Local insights for a richer experience.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
                    <CalendarClock className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Flexible Booking</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Change plans, not your dreams.</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Image Container using destinationSection.png */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[16/11] shadow-2xl border-4 border-white">
                <img 
                  src={sectionGirlImg} 
                  alt="Better Trips Bigger Stories" 
                  className="w-full h-full object-cover"
                />

                {/* Script text over the image */}
                <div className="absolute top-6 left-6 text-white select-none">
                  <span className="font-serif italic text-2xl sm:text-3xl font-bold drop-shadow-lg block -rotate-6">
                    Better Trips
                  </span>
                  <span className="font-serif italic text-3xl sm:text-4xl font-extrabold drop-shadow-xl block -rotate-3 text-amber-200">
                    Bigger Stories
                  </span>
                </div>

                {/* Watch Our Story Video Pill button */}
                <div className="absolute bottom-6 right-6 flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg cursor-pointer hover:bg-white transition-all group">
                  <div className="w-8 h-8 rounded-full bg-[#0c7c72] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Play className="w-4 h-4 fill-white translate-x-0.5" />
                  </div>
                  <div className="text-left pr-1">
                    <span className="block text-xs font-bold text-slate-900 leading-tight">Watch Our Story</span>
                    <span className="block text-[10px] text-slate-400 leading-tight">2 min</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. TOP DESTINATIONS                          */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-teal-700 uppercase mb-2">
                <span className="w-5 h-0.5 bg-teal-700 inline-block"></span>
                TOP DESTINATIONS
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Popular Destinations
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Dream it. Explore it. Live it.
              </p>
            </div>

            <button 
              onClick={() => navigate('/packages')}
              className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-teal-800 hover:text-teal-900 group"
            >
              <span>View All Destinations</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {destinationDesign2Cards.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/destinations/${item.id}`)}
                className="group cursor-pointer flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-slate-100"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 m-2">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Rating badge top-right */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 text-[11px] font-bold text-slate-800 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-full shadow-sm">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{item.rating}</span>
                  </div>

                  {/* Heart top-left */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(item.id, e);
                    }}
                    className="absolute top-2.5 left-2.5 w-7 h-7 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center text-slate-700 hover:bg-white hover:text-rose-600 transition-all shadow-sm z-10"
                  >
                    <Heart className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="px-3 pt-1 pb-3 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-teal-700 shrink-0" />
                      <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-teal-800 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <span className="text-xs text-slate-400 pl-4 block mt-0.5">
                      {item.country}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-100">
                    <div>
                      <span className="font-bold text-base text-slate-900">
                        ${item.price}
                      </span>
                      <span className="text-[11px] text-slate-400 ml-1">
                        / person
                      </span>
                    </div>

                    <Link
                      to={`/destinations/${item.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="px-2.5 py-1 rounded-xl bg-teal-50 group-hover:bg-[#0c7c72] text-teal-800 group-hover:text-white font-semibold text-xs transition-colors shadow-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CURATED TRAVEL EXPERIENCES               */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-20 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-teal-700 uppercase mb-2">
                <span className="w-5 h-0.5 bg-teal-700 inline-block"></span>
                UNIQUE EXPERIENCES
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Curated Travel Experiences
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Go beyond sightseeing. Explore, taste, learn and feel the real essence of every place.
              </p>
            </div>

            <button 
              onClick={() => navigate('/packages')}
              className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-teal-800 hover:text-teal-900 group"
            >
              <span>View All Experiences</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* 4 Experience Cards (Left) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {curatedExperiences.map((exp, index) => {
                const IconComponent = exp.icon;
                return (
                  <div
                    key={index}
                    className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm transition-all duration-300 flex flex-col"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img 
                        src={exp.image} 
                        alt={exp.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-sm text-slate-900 group-hover:text-teal-800 transition-colors">
                          {exp.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                          {exp.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Itinerary Steps Card (Right) */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-serif font-bold text-xl text-slate-900 mb-6">
                  Plan Your Custom Journey
                </h3>

                <div className="space-y-6 relative">
                  {/* Step 1 */}
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#0c7c72] text-white font-bold text-xs flex items-center justify-center shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">Choose Destination</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Pick where you want to go</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#0c7c72] text-white font-bold text-xs flex items-center justify-center shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">Customize Your Itinerary</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Select activities, dates & stay</p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#0c7c72] text-white font-bold text-xs flex items-center justify-center shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">Pack & Go</h4>
                      <p className="text-xs text-slate-500 mt-0.5">We'll handle the rest!</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={onOpenItinerary}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#0c7c72] hover:bg-[#096860] active:scale-98 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Create Your Itinerary</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-[11px] text-center text-teal-700 font-serif italic">
                  Your Journey Starts Here ✨
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. BOTTOM BANNER */}
      {/* ========================================================================= */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div 
            className="relative rounded-3xl overflow-hidden bg-cover bg-center shadow-2xl p-8 sm:p-12 text-white"
            style={{ backgroundImage: `url(${bottomBannerImg})` }}
          >
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-[#091b22]/55 backdrop-blur-[1px]"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              
              {/* Left text & button */}
              <div className="flex items-start gap-5 max-w-xl">
                <div className="w-12 h-12 rounded-full bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 shrink-0">
                  <Compass className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <span className="text-[10px] tracking-[0.2em] font-bold text-teal-300 uppercase block mb-1">
                    TRAVEL MAKES LIFE RICHER
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
                    Explore the World
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mb-6">
                    New places. New people. New stories.
                  </p>
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0c7c72] hover:bg-[#0a665e] text-white text-xs font-semibold shadow-lg transition-all active:scale-95"
                  >
                    <span>Explore Destinations</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right stats (500+ Destinations, 1M+ Happy Travelers, 4.8 Rating) */}
              <div className="flex flex-wrap items-center gap-8 sm:gap-12 border-t lg:border-t-0 lg:border-l border-white/20 pt-6 lg:pt-0 lg:pl-12">
                <div className="text-center">
                  <div className="flex items-center justify-center text-teal-400 mb-1">
                    <Globe className="w-5 h-5" />
                  </div>
                  <span className="font-serif font-bold text-2xl sm:text-3xl text-white block">500+</span>
                  <span className="text-[11px] text-slate-300">Destinations</span>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center text-teal-400 mb-1">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <span className="font-serif font-bold text-2xl sm:text-3xl text-white block">1M+</span>
                  <span className="text-[11px] text-slate-300">Happy Travelers</span>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center text-teal-400 mb-1">
                    <Star className="w-5 h-5 fill-teal-400" />
                  </div>
                  <span className="font-serif font-bold text-2xl sm:text-3xl text-white block">4.8</span>
                  <span className="text-[11px] text-slate-300">Average Rating</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
