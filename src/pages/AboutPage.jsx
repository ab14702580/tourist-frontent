import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, ShieldCheck, Heart, Headphones, ArrowRight, Play,
  CheckCircle2, Star, Calendar, Globe, Users, Leaf, ArrowUpRight,
  ChevronLeft, ChevronRight
} from 'lucide-react';

// Use home page hero background image as instructed
import heroBg from '../assets/touristHeroBackground.png';

// Team members
const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "FOUNDER & CEO",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Daniel Carter",
    role: "HEAD OF OPERATIONS",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Emily Roberts",
    role: "TRAVEL CONSULTANT",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Michael Lee",
    role: "CONTENT CREATOR",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
  }
];

// Testimonials
const travelerStories = [
  {
    name: "Jessica Miller",
    location: "New York, USA",
    quote: "Wanderly made our dream vacation come true! Everything was perfectly planned, and the experience was beyond our expectations.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    thumb: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=120&q=80"
  },
  {
    name: "David Wilson",
    location: "London, UK",
    quote: "The Bali package was absolutely incredible! From the boutique hotels to the tours, everything was seamless. Highly recommend Wanderly!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    thumb: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=120&q=80"
  },
  {
    name: "Olivia Taylor",
    location: "Sydney, Australia",
    quote: "Amazing service, warm team, and unforgettable memories. I can't wait to book my next European adventure with Wanderly!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    thumb: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=120&q=80"
  }
];

export default function AboutPage() {
  return (
    <div className="bg-white text-slate-800 font-sans selection:bg-teal-700 selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Using Home Page Background Image from touristHeroBackground.png) */}
      {/* ========================================================================= */}
      <section 
        className="relative min-h-[580px] md:min-h-[660px] flex items-center justify-center bg-cover bg-center pt-24 pb-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Soft vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/70 pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-start justify-center">
          
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-teal-300 uppercase mb-4">
            <span className="w-5 h-0.5 bg-teal-400 inline-block"></span>
            ABOUT US
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.12] tracking-tight text-white mb-6 max-w-3xl">
            We're More Than<br />
            Just a <span className="font-serif italic text-[#38e1c6] drop-shadow-sm font-normal">Travel Company</span>
          </h1>

          <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-xl font-normal leading-relaxed mb-8 drop-shadow">
            We're a team of passionate travelers, storytellers, and dreamers, committed to creating unforgettable experiences for people around the world.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/packages"
              className="px-7 py-3 rounded-full bg-[#0c7c72] hover:bg-[#0a665e] active:scale-95 text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
            >
              <span>Explore Packages</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => {
                const el = document.getElementById('why-choose-us');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-7 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white font-semibold text-xs sm:text-sm transition-all"
            >
              Our Story
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. WHY CHOOSE US ("Real People. Authentic Experiences.")                 */}
      {/* ========================================================================= */}
      <section id="why-choose-us" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-teal-700 uppercase mb-2">
                  <span className="w-5 h-0.5 bg-teal-700 inline-block"></span>
                  WHY CHOOSE US
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
                  Real People. Authentic<br />
                  Experiences.
                </h2>
                <p className="text-slate-500 text-sm sm:text-base mt-3 leading-relaxed">
                  At Wanderly, we believe travel is not just about visiting new places, it's about discovering new perspectives, meeting amazing people, and creating memories that last a lifetime.
                </p>
              </div>

              {/* 4 Feature Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
                    <Compass className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Expert Guides</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Local experts who bring destinations to life.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
                    <ShieldCheck className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Safe & Secure</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Your safety is our top priority always.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
                    <Heart className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Tailored Experiences</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Personalized trips for every curious traveler.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
                    <Headphones className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">24/7 Support</h4>
                    <p className="text-xs text-slate-500 mt-0.5">We're here whenever you need us, globally.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual Image Collage */}
            <div className="lg:col-span-6 relative">
              <div className="text-right mb-2">
                <span className="font-serif italic text-sm text-teal-800 font-semibold inline-flex items-center gap-2">
                  Explore Together ♡ <span className="border-b border-dashed border-teal-600 w-12 inline-block"></span>
                </span>
              </div>

              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Big Santorini Couple Photo */}
                <div className="col-span-7 relative rounded-3xl overflow-hidden aspect-[4/5] shadow-xl group">
                  <img 
                    src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80" 
                    alt="Couple in Santorini"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  
                  {/* Play Video button */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-teal-800 shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-teal-800 translate-x-0.5" />
                    </div>
                    <span className="text-[10px] font-bold tracking-widest text-white uppercase mt-2 drop-shadow">
                      OUR STORY
                    </span>
                  </div>
                </div>

                {/* 2 Stacked smaller photos on the right */}
                <div className="col-span-5 space-y-4">
                  <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-md group">
                    <img 
                      src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=500&q=80" 
                      alt="Roadtrip Van in Mountains"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-md group">
                    <img 
                      src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80" 
                      alt="Tropical Lagoon and Beach"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. OUR VALUES ("What Drives Us")                                         */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 bg-[#f4faf8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Values Content */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-teal-700 uppercase mb-2">
                  <span className="w-5 h-0.5 bg-teal-700 inline-block"></span>
                  OUR VALUES
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
                  What Drives Us
                </h2>
                <p className="text-slate-500 text-sm sm:text-base mt-3 leading-relaxed">
                  At Wanderly, our values are the foundation of everything we do. They guide our decisions, shape our culture, and ensure we create meaningful travel experiences for every traveler.
                </p>
              </div>

              {/* 4 Values Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100/80">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
                    <Compass className="w-4 h-4 stroke-[2]" />
                  </div>
                  <h4 className="font-serif font-bold text-sm text-slate-900 mb-1">Authenticity</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    We believe in real experiences, not just destinations.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100/80">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
                    <Users className="w-4 h-4 stroke-[2]" />
                  </div>
                  <h4 className="font-serif font-bold text-sm text-slate-900 mb-1">People First</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Our travelers, team and local communities always come first.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100/80">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
                    <Leaf className="w-4 h-4 stroke-[2]" />
                  </div>
                  <h4 className="font-serif font-bold text-sm text-slate-900 mb-1">Sustainability</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    We travel responsibly and protect the pristine places we love.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100/80">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
                    <Heart className="w-4 h-4 stroke-[2]" />
                  </div>
                  <h4 className="font-serif font-bold text-sm text-slate-900 mb-1">Passion</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    We're passionate about travel and the positive impact it creates.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Photo with Floating Tag */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-md w-full shadow-2xl border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80" 
                  alt="Travel Builds a Kinder, Brighter World"
                  className="w-full h-full object-cover" 
                />

                {/* Floating Badge */}
                <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-slate-100">
                  <span className="font-serif italic text-xs font-bold text-slate-900 block leading-tight">
                    Travel Builds a Kinder,
                  </span>
                  <span className="font-serif italic text-xs font-bold text-teal-700 block leading-tight">
                    Brighter World ♡
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. MEET OUR TEAM ("Meet Our Travel Experts")                              */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-teal-700 uppercase mb-2">
                <span className="w-5 h-0.5 bg-teal-700 inline-block"></span>
                OUR TEAM
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Meet Our Travel Experts
              </h2>
              <p className="text-slate-500 text-sm mt-1 max-w-2xl">
                Our team is made up of passionate travelers, experienced professionals, and local experts who live and breathe adventure. Together, we turn your travel dreams into reality.
              </p>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0c7c72] hover:bg-[#0a665e] text-white text-xs font-semibold shadow-sm transition-all whitespace-nowrap self-start sm:self-auto"
            >
              <span>Join Our Team</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-100 m-2 rounded-2xl">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>

                <div className="p-4 text-center">
                  <h4 className="font-serif font-bold text-base text-slate-900 group-hover:text-teal-800 transition-colors">
                    {member.name}
                  </h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mt-0.5">
                    {member.role}
                  </span>

                  {/* Social Icons */}
                  <div className="flex items-center justify-center gap-3 mt-3 pt-3 border-t border-slate-100 text-slate-400">
                    <a href="#" className="hover:text-teal-700 transition-colors" title="LinkedIn">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    <a href="#" className="hover:text-teal-700 transition-colors" title="Instagram">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689-.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a href="#" className="hover:text-teal-700 transition-colors" title="Website">
                      <Globe className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. OUR JOURNEY IN NUMBERS ("Our Impact")                                  */}
      {/* ========================================================================= */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-[#f8fbfb] p-8 sm:p-12 rounded-3xl border border-slate-100 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-10">
            
            {/* Left Copy */}
            <div className="lg:max-w-md space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-teal-700 uppercase">
                <span className="w-5 h-0.5 bg-teal-700 inline-block"></span>
                OUR IMPACT
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Our Journey in Numbers
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                From happy travelers to breathtaking destinations, our numbers tell a story of trust, adventure and lasting global impact.
              </p>
              <div className="pt-2">
                <Link
                  to="/destinations"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0c7c72] hover:bg-[#0a665e] text-white text-xs font-semibold shadow-sm transition-all"
                >
                  <span>Explore Destinations</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right 4 Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto">
              
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm text-center">
                <div className="w-9 h-9 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center mx-auto mb-2">
                  <Compass className="w-4 h-4" />
                </div>
                <span className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 block">500+</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1 block">DESTINATIONS</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm text-center">
                <div className="w-9 h-9 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center mx-auto mb-2">
                  <Users className="w-4 h-4" />
                </div>
                <span className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 block">1M+</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1 block">HAPPY TRAVELERS</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm text-center">
                <div className="w-9 h-9 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center mx-auto mb-2">
                  <Star className="w-4 h-4 fill-teal-700" />
                </div>
                <span className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 block">4.8</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1 block">AVERAGE RATING</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm text-center">
                <div className="w-9 h-9 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center mx-auto mb-2">
                  <Calendar className="w-4 h-4" />
                </div>
                <span className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 block">7+</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1 block">YEARS EXPERIENCE</span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. WHAT OUR TRAVELERS SAY (Traveler Stories)                              */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-teal-700 uppercase mb-2">
                <span className="w-5 h-0.5 bg-teal-700 inline-block"></span>
                TRAVELER STORIES
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                What Our Travelers Say
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Real stories. Real people. Genuine experiences.
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
            {travelerStories.map((story, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={story.avatar} 
                        alt={story.name} 
                        className="w-10 h-10 rounded-full object-cover" 
                      />
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{story.name}</h4>
                        <span className="text-xs text-slate-400">{story.location}</span>
                      </div>
                    </div>

                    <img 
                      src={story.thumb} 
                      alt="Destination Thumbnail" 
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{story.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. WHY WE TRAVEL ("Travel Can Create a Better World")                     */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 bg-[#fbfdfd] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Big Photo (Dining with locals) */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-xl group">
                <img 
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80" 
                  alt="Connecting travelers with local hosts" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating Tag Bottom-Left */}
                <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-xs bg-slate-950/80 backdrop-blur-md p-3.5 rounded-2xl text-white shadow-xl border border-white/10">
                  <span className="font-serif italic text-xs font-bold text-teal-300 block mb-0.5">
                    Sustainable & Mindful Exploration
                  </span>
                  <p className="text-[11px] text-slate-300 leading-tight">
                    Connecting travelers directly with local hosts across 45 countries.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-teal-700 uppercase mb-2">
                  <span className="w-5 h-0.5 bg-teal-700 inline-block"></span>
                  WHY WE TRAVEL
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
                  Travel Can Create a<br />
                  Better World
                </h2>
                <p className="text-slate-500 text-sm sm:text-base mt-3 leading-relaxed">
                  We aim to inspire people to explore the world responsibly, build meaningful connections, and experience the pure beauty of diverse cultures — one conscious journey at a time.
                </p>
              </div>

              {/* 3 Checkpoint Items */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-700 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">
                    Support Local Communities & Small Businesses
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-700 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">
                    Travel Responsibly with Zero-Waste Initiatives
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-700 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">
                    Protect Fragile Natural Habitats and Heritage Sites
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#0a1c24] hover:bg-[#0c7c72] text-white text-xs font-semibold shadow-md transition-all"
                >
                  <span>Learn More About Our Mission</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. READY TO EXPLORE? (Bottom Banner)             */}
      {/* ========================================================================= */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div 
            className="relative rounded-3xl overflow-hidden bg-cover bg-center shadow-2xl p-8 sm:p-14 text-white"
            style={{ 
              backgroundImage: `url("https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=1600&q=80")` 
            }}
          >
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-[#091b22]/75 backdrop-blur-[1px]"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              
              <div className="max-w-xl space-y-4 text-center lg:text-left">
                <span className="text-[10px] tracking-[0.2em] font-bold text-teal-300 uppercase block">
                  READY TO EXPLORE?
                </span>
                <h3 className="font-serif text-3xl sm:text-5xl font-bold leading-tight tracking-tight text-white">
                  Your Next Adventure<br />
                  Starts Here
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Let's turn your travel dreams into unforgettable memories. Discover the world with Wanderly.
                </p>

                <div className="pt-2">
                  <Link
                    to="/packages"
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#0c7c72] hover:bg-[#0a665e] text-white text-xs font-semibold shadow-lg transition-all active:scale-95"
                  >
                    <span>Explore Packages</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Cursive Script */}
              <div className="text-center lg:text-right select-none">
                <span className="font-serif italic text-4xl sm:text-6xl font-extrabold text-[#38e1c6] drop-shadow-xl block -rotate-6">
                  Good Vibes<br />
                  Only ♡
                </span>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
