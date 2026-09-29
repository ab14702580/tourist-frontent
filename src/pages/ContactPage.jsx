import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  MapPin, Phone, Mail, MessageSquare, Send, 
  ArrowRight, Compass, Calendar, Ticket, Headphones, 
  Star, ChevronLeft, ChevronRight, Plus, X, User, Tag, 
  Lock, Zap, Shield, Heart
} from 'lucide-react';

import heroBg from '../assets/destinationBottom.png';
import bottomCtaBg from '../assets/travelRichLife.png';
import { contactService } from '../services';

// FAQ Items
const faqItems = [
  {
    id: 1,
    question: "How can I book a trip with Wanderly?",
    answer: "Booking is simple! Explore our curated packages or contact our travel specialists directly. We will craft a custom itinerary, confirm dates, and finalize your booking with secure online payment."
  },
  {
    id: 2,
    question: "What is your cancellation policy?",
    answer: "We offer flexible cancellation policies. Most packages allow full refunds or free date rescheduling up to 14 days before your departure. Specific terms for private boutique stays are clearly outlined in your booking confirmation."
  },
  {
    id: 3,
    question: "Do you offer travel insurance?",
    answer: "Yes, we partner with world-leading travel insurance providers to offer comprehensive medical, trip cancellation, luggage protection, and emergency evacuation coverage tailored for your journey."
  },
  {
    id: 4,
    question: "Can I customize my package?",
    answer: "Absolutely! Custom journeys are our specialty. Our destination concierges will modify daily activities, room categories, dining reservations, and transfers to perfectly align with your personal preferences."
  },
  {
    id: 5,
    question: "What payment methods do you accept?",
    answer: "We accept all major international credit cards (Visa, MasterCard, American Express), direct bank wire transfers, and secure digital payment gateways with end-to-end 256-bit encryption."
  }
];

// Testimonials
const testimonials = [
  {
    name: "Jessica Miller",
    location: "New York, USA",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    quote: "Wanderly made our dream vacation come true! Everything was perfectly planned, and the experience was beyond our expectations.",
    thumb: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=120&q=80"
  },
  {
    name: "David Wilson",
    location: "London, UK",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    quote: "The Bali package was absolutely incredible! From the boutique hotels to the local trekking guides, everything was seamless. Highly recommend Wanderly!",
    thumb: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=120&q=80"
  },
  {
    name: "Olivia Taylor",
    location: "Sydney, Australia",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    quote: "Amazing service, friendly team, and unforgettable memories. I can't wait to book my next European adventure with Wanderly!",
    thumb: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=120&q=80"
  }
];

// Interactive Leaflet Map Component for Our Location section
function LeafletLocationMap() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Coordinate for Wanderly HQ in Uluwatu, South Bali
    const hqCoord = [-8.814, 115.118];

    // Initialize Leaflet map
    const map = L.map(mapContainerRef.current, {
      center: [-8.810, 115.126],
      zoom: 13,
      zoomControl: false,
      scrollWheelZoom: false,
    });

    // Zoom control at bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // CartoDB Voyager map tiles (smooth, crisp, modern aesthetic)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    // Custom Wanderly HQ Marker Icon
    const hqIcon = L.divIcon({
      className: 'custom-hq-marker',
      html: `
        <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%); cursor: pointer;">
          <div style="background: #0B2522; color: #FFFFFF; font-weight: 700; font-size: 11px; padding: 5px 12px; border-radius: 9999px; box-shadow: 0 4px 14px rgba(0,0,0,0.28); white-space: nowrap; border: 2px solid #2DD4BF; display: flex; align-items: center; gap: 5px;">
            <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #2DD4BF;"></span>
            <span>Wanderly HQ</span>
          </div>
          <div style="width: 14px; height: 14px; background: #0D6B5A; border: 2.5px solid #FFFFFF; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.3); margin-top: -2px;"></div>
        </div>
      `,
      iconSize: [0, 0],
      iconAnchor: [0, 0],
      popupAnchor: [0, -36],
    });

    // Custom POI Icon for nearby landmarks
    const createPoiIcon = (label) => L.divIcon({
      className: 'custom-poi-marker',
      html: `
        <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%); cursor: pointer;">
          <div style="background: rgba(15, 23, 42, 0.88); backdrop-filter: blur(4px); color: #F8FAFC; font-weight: 600; font-size: 10px; padding: 3px 8px; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.2); white-space: nowrap; border: 1px solid rgba(255,255,255,0.25);">
            ${label}
          </div>
          <div style="width: 8px; height: 8px; background: #0ea5e9; border: 2px solid #FFFFFF; border-radius: 50%; margin-top: -1px;"></div>
        </div>
      `,
      iconSize: [0, 0],
      iconAnchor: [0, 0],
      popupAnchor: [0, -26],
    });

    // Add Wanderly HQ Marker
    const hqMarker = L.marker(hqCoord, { icon: hqIcon }).addTo(map);
    hqMarker.bindPopup(`
      <div style="padding: 4px; font-family: inherit; min-width: 190px;">
        <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #0D6B5A; letter-spacing: 0.05em; margin-bottom: 2px;">Global Headquarters</div>
        <h4 style="font-weight: 700; color: #0F172A; margin: 0 0 4px 0; font-size: 13px;">Wanderly Travel Co.</h4>
        <p style="color: #64748B; margin: 0 0 8px 0; font-size: 11px; line-height: 1.4;">Jl. Pantai Suluban No. 18, Uluwatu, Badung, Bali 80361</p>
        <div style="display: flex; align-items: center; gap: 6px; font-size: 10px; color: #047857; font-weight: 600; background: #ECFDF5; padding: 3px 8px; border-radius: 9999px; width: fit-content;">
          <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #10B981;"></span>
          Open Daily: 08:00 AM – 08:00 PM
        </div>
      </div>
    `);

    // Nearby highlights matching design
    const pois = [
      { name: "Uluwatu Temple", coord: [-8.829, 115.084], desc: "Historic clifftop temple with world-famous sunset amphitheatre" },
      { name: "Padang Padang Beach", coord: [-8.811, 115.103], desc: "Famous white sand cove and surf spot" },
      { name: "Dreamland Beach", coord: [-8.798, 115.117], desc: "Expansive turquoise shoreline & coastal cafes" },
    ];

    pois.forEach(poi => {
      const m = L.marker(poi.coord, { icon: createPoiIcon(poi.name) }).addTo(map);
      m.bindPopup(`
        <div style="padding: 2px; font-family: inherit;">
          <h5 style="font-weight: 700; margin: 0 0 2px 0; font-size: 12px; color: #0F172A;">${poi.name}</h5>
          <p style="margin: 0; font-size: 11px; color: #64748B;">${poi.desc}</p>
        </div>
      `);
    });

    // Auto-open HQ marker popup
    hqMarker.openPopup();

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-xl border border-teal-900/10 aspect-[16/10] bg-slate-100 isolate z-10">
      <div ref={mapContainerRef} className="w-full h-full min-h-[360px]" />
      
      {/* Floating Header Card */}
      <div className="absolute top-4 left-4 z-[500] pointer-events-none bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md text-[11px] font-bold text-slate-800 flex items-center gap-2 border border-slate-200/80">
        <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
        <span>Wanderly HQ • Uluwatu, Bali</span>
      </div>

      {/* Floating Instructions Pill */}
      <div className="absolute bottom-4 left-4 z-[500] pointer-events-none bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-medium px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 border border-white/10">
        <Compass className="w-3.5 h-3.5 text-teal-400" />
        <span>Interactive Map • Click pins to inspect</span>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(1);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await contactService.sendMessage(formData);
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ fullName: '', email: '', subject: '', message: '' });
      }, 4500);
    } catch (err) {
      console.error('Contact submit error:', err);
    }
  };

  const handleTestimonialPrev = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleTestimonialNext = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-[#FAFDFD] text-slate-800 font-sans selection:bg-teal-700 selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION & TRUST BADGES                                            */}
      {/* ========================================================================= */}
      <section 
        className="relative min-h-[540px] sm:min-h-[600px] lg:min-h-[640px] flex items-center bg-cover bg-center pt-28 pb-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Directional contrast overlay: ensures left text legibility while coastal bay & sea on right stay completely vivid */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          
          {/* Left Hero Content */}
          <div className="max-w-2xl text-left space-y-6">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#082823]/80 border border-teal-500/40 text-teal-300 text-[11px] font-semibold tracking-wider uppercase backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              <span>Contact Us</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.12]">
              Get in Touch <br />
              <span className="font-serif italic text-[#38e1c6] font-normal">We're Here to Help</span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-100 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed font-light drop-shadow-sm">
              Have a question, need travel advice, or ready to plan your next adventure? Our team is just a message away.
            </p>

            {/* 3-Pillar Trust Pill Strip */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
                <Zap className="w-3.5 h-3.5 text-teal-300" />
                <span>Quick Response</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
                <Shield className="w-3.5 h-3.5 text-teal-300" />
                <span>Expert Support</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
                <Heart className="w-3.5 h-3.5 text-teal-300" />
                <span>Your Journey Matters</span>
              </div>
            </div>
          </div>

          {/* Right Organic Handwritten Sticker on the Photo */}
          <div className="hidden lg:block select-none pointer-events-none pr-8">
            <span 
              className="text-white text-3xl xl:text-4xl leading-snug block drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              Let's Plan <br />
              Your Next <br />
              <span className="text-[#38e1c6]">Adventure ♡</span>
            </span>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CONTACT FORM & DIRECT CHANNELS ("We'd Love to Hear From You")           */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-teal-700 text-xs font-bold uppercase tracking-widest mb-1.5">
            <span className="w-6 h-[2px] bg-teal-600 inline-block" />
            <span>Send Us a Message</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            We'd Love to Hear From You
          </h2>
          <p className="text-slate-500 text-sm mt-1.5 max-w-2xl leading-relaxed">
            Fill out the form below and we'll get back to you as soon as possible. Whether it's a question, feedback, or a custom trip request — we're here to help.
          </p>
        </div>

        {/* Split Grid: Left Form Card (60%) / Right Contact Tiles & Postcard (40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Inquiry Form Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-[0_4px_24px_-2px_rgba(11,37,34,0.06)]">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Row 1: Full Name & Email Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input 
                      type="text"
                      required
                      placeholder="Alex Morgan"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700 transition-all bg-[#FAFDFD]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input 
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700 transition-all bg-[#FAFDFD]"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Subject */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Tag className="w-4 h-4" />
                  </div>
                  <input 
                    type="text"
                    required
                    placeholder="Inquiring about Custom Bali Expedition"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700 transition-all bg-[#FAFDFD]"
                  />
                </div>
              </div>

              {/* Row 3: Message Textarea */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute top-3.5 left-3.5 pointer-events-none text-slate-400">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <textarea 
                    required
                    rows={5}
                    placeholder="Tell us about your desired travel dates, destination preferences, or any specific questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700 transition-all bg-[#FAFDFD] resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Row 4: Submit Button & Security Reassurance */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#0D6B5A] hover:bg-[#09493D] text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer group"
                >
                  <span>{formSubmitted ? "Message Sent! ✓" : "Send Message"}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Lock className="w-3.5 h-3.5 text-teal-700" />
                  <span>Your information is safe with us.</span>
                </div>
              </div>

            </form>
          </div>

          {/* Right Column: Direct Channels & Polaroid Postcard */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Channel 1: Our Location */}
            <div className="bg-[#FAFDFD] rounded-2xl p-4 sm:p-5 border border-slate-100 flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <h4 className="font-bold text-slate-900 text-sm">Our Location</h4>
                <p className="text-slate-500 mt-0.5 leading-relaxed">
                  123 Travel Street, Adventure City <br />
                  Bali, Indonesia 80361
                </p>
              </div>
            </div>

            {/* Channel 2: Phone Number */}
            <div className="bg-[#FAFDFD] rounded-2xl p-4 sm:p-5 border border-slate-100 flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <h4 className="font-bold text-slate-900 text-sm">Phone Number</h4>
                <p className="text-teal-700 font-semibold mt-0.5">+62 812 3456 7890</p>
                <p className="text-slate-400 text-[11px] mt-0.5">Mon - Fri, 9AM - 6PM (GMT+8)</p>
              </div>
            </div>

            {/* Channel 3: Email Address */}
            <div className="bg-[#FAFDFD] rounded-2xl p-4 sm:p-5 border border-slate-100 flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <h4 className="font-bold text-slate-900 text-sm">Email Address</h4>
                <p className="text-teal-700 font-semibold mt-0.5">hello@wanderly.com</p>
                <p className="text-slate-400 text-[11px] mt-0.5">We reply within 24 hours</p>
              </div>
            </div>

            {/* Channel 4: Live Chat */}
            <div className="bg-[#FAFDFD] rounded-2xl p-4 sm:p-5 border border-slate-100 flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <h4 className="font-bold text-slate-900 text-sm">Live Chat</h4>
                <p className="text-slate-500 mt-0.5">Chat with our destination guides</p>
                <div className="flex items-center gap-1.5 text-[11px] text-teal-700 font-medium mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Available 24/7</span>
                </div>
              </div>
            </div>

            {/* Travel Postcard Element () */}
            <div className="pt-4 flex justify-center">
              <div className="relative bg-white p-3 rounded-2xl shadow-xl border border-slate-200/80 -rotate-2 hover:rotate-0 transition-transform duration-500 max-w-xs w-full">
                {/* Photo in postcard */}
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80" 
                    alt="Kelingking Beach Bali" 
                    className="w-full h-full object-cover"
                  />
                  {/* Yellow postal stamp top-right */}
                  <div className="absolute top-2.5 right-2.5 bg-amber-100/90 border border-amber-300 rounded px-1.5 py-0.5 text-[8px] font-black text-amber-800 rotate-6 shadow-sm">
                    BALI POST
                  </div>
                </div>

                {/* Postcard Text */}
                <div className="pt-2.5 pb-1 text-center">
                  <p 
                    className="text-slate-700 text-xl font-normal leading-tight"
                    style={{ fontFamily: "'Caveat', cursive" }}
                  >
                    Travel More, Worry Less ♡
                  </p>
                  <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold block mt-0.5">
                    Kelingking Beach • Bali
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. OUR LOCATION & INTERACTIVE MAP                                         */}
      {/* ========================================================================= */}
      <section className="bg-[#EBF5F3] py-16 sm:py-24 border-y border-teal-800/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Office Intro */}
            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-center gap-2 text-teal-700 text-xs font-bold uppercase tracking-wider">
                <span className="w-6 h-[2px] bg-teal-600 inline-block" />
                <span>Visit Our Office</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Our Location
              </h2>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Come say hello! We'd love to meet you in person, discuss custom itineraries over fresh Balinese coffee, and show you around our headquarters.
              </p>

              <div className="pt-1">
                <a
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-teal-700 text-teal-800 hover:bg-teal-700 hover:text-white text-xs sm:text-sm font-semibold transition-all group"
                >
                  <Compass className="w-4 h-4" />
                  <span>Get Directions</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Mountain Line Doodle & Note */}
              <div className="pt-4 text-teal-800/60 flex items-center gap-2">
                <svg className="w-24 h-8 stroke-current fill-none stroke-[1.5]" viewBox="0 0 100 32">
                  <path d="M0 28 L25 10 L45 24 L70 4 L95 28" />
                </svg>
                <span 
                  className="text-lg text-teal-900 font-normal"
                  style={{ fontFamily: "'Caveat', cursive" }}
                >
                  Adventure Awaits 🗺️
                </span>
              </div>
            </div>

            {/* Right Column: Interactive Leaflet Map */}
            <div className="lg:col-span-7">
              <LeafletLocationMap />
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION)                             */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: FAQ Intro */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-2 text-teal-700 text-xs font-bold uppercase tracking-wider">
              <span className="w-6 h-[2px] bg-teal-600 inline-block" />
              <span>Frequently Asked Questions</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              Quick Answers to Common Questions
            </h2>

            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Find answers to the most common questions about our services, bookings, payments, and private guided itineraries.
            </p>

            <div className="pt-2">
              <Link
                to="/faq"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0D6B5A] hover:bg-[#09493D] text-white text-xs sm:text-sm font-semibold shadow-md transition-all group"
              >
                <span>View All FAQs</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Handwritten Note */}
            <div className="pt-4 text-teal-700 flex items-center gap-2">
              <span 
                className="text-2xl font-normal"
                style={{ fontFamily: "'Caveat', cursive" }}
              >
                Better Journeys ♡
              </span>
              <span className="text-teal-400 text-xs">•••••••••••••</span>
            </div>
          </div>

          {/* Right Column: Accordion Items */}
          <div className="lg:col-span-7 space-y-3">
            {faqItems.map((item) => {
              const isOpen = openFaq === item.id;
              return (
                <div 
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : item.id)}
                    className="w-full py-4 px-5 sm:px-6 flex items-center justify-between text-left cursor-pointer gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xs shrink-0">
                        ?
                      </div>
                      <span className="font-serif font-bold text-sm sm:text-base text-slate-800 hover:text-teal-800 transition-colors">
                        {item.question}
                      </span>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                      {isOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-500 leading-relaxed border-t border-slate-50 ml-9">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. HOW CAN WE HELP? (SUPPORT SERVICES GRID)                               */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 text-teal-700 text-xs font-bold uppercase tracking-widest">
            <span className="w-6 h-[2px] bg-teal-600 inline-block" />
            <span>How Can We Help?</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            We're Here for Every Step of Your Journey
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
            Whether you need booking assistance or 24/7 emergency support on the road, our travel specialists have you covered.
          </p>
        </div>

        {/* 4 Support Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          
          {/* Card 1: Booking Support */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-[0_4px_20px_-2px_rgba(11,37,34,0.05)] hover:shadow-[0_12px_28px_-4px_rgba(11,37,34,0.12)] transition-all flex flex-col justify-between group">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 mb-5 group-hover:scale-105 transition-transform">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-teal-800 transition-colors">
                Booking Support
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Manage reservations, customize trip dates, or inquire about real-time availability and rates.
              </p>
            </div>
            <div className="pt-5 mt-4 border-t border-slate-100">
              <Link to="/contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 group-hover:translate-x-1 transition-all">
                <span>Get Help</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Travel Planning */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-[0_4px_20px_-2px_rgba(11,37,34,0.05)] hover:shadow-[0_12px_28px_-4px_rgba(11,37,34,0.12)] transition-all flex flex-col justify-between group">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 mb-5 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-teal-800 transition-colors">
                Travel Planning
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Work 1-on-1 with our local destination experts to build your dream itinerary from scratch.
              </p>
            </div>
            <div className="pt-5 mt-4 border-t border-slate-100">
              <Link to="/contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 group-hover:translate-x-1 transition-all">
                <span>Plan My Trip</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Existing Booking */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-[0_4px_20px_-2px_rgba(11,37,34,0.05)] hover:shadow-[0_12px_28px_-4px_rgba(11,37,34,0.12)] transition-all flex flex-col justify-between group">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 mb-5 group-hover:scale-105 transition-transform">
                <Ticket className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-teal-800 transition-colors">
                Existing Booking
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Access vouchers, make payments, upgrade room packages, or request exclusive local add-ons.
              </p>
            </div>
            <div className="pt-5 mt-4 border-t border-slate-100">
              <Link to="/contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 group-hover:translate-x-1 transition-all">
                <span>Manage Booking</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 4: Emergency Assistance */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-[0_4px_20px_-2px_rgba(11,37,34,0.05)] hover:shadow-[0_12px_28px_-4px_rgba(11,37,34,0.12)] transition-all flex flex-col justify-between group">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 mb-5 group-hover:scale-105 transition-transform">
                <Headphones className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-teal-800 transition-colors">
                Emergency Assistance
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Instant 24/7 hotline and rapid messaging support for travelers currently experiencing journeys abroad.
              </p>
            </div>
            <div className="pt-5 mt-4 border-t border-slate-100">
              <Link to="/contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 group-hover:translate-x-1 transition-all">
                <span>Contact Support</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. TRAVELER TESTIMONIALS ("Real Stories. Real People.")                   */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        
        {/* Header with Carousel Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-teal-700 text-xs font-bold uppercase tracking-widest mb-1.5">
              <span className="w-6 h-[2px] bg-teal-600 inline-block" />
              <span>What Our Travelers Say</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Real Stories. Real People.
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-xl">
              Don't just take our word for it. Here's what fellow travelers have to say about their experiences with Wanderly.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTestimonialPrev}
              className="w-9 h-9 rounded-full border border-slate-200 text-slate-600 hover:border-teal-700 hover:text-teal-800 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleTestimonialNext}
              className="w-9 h-9 rounded-full border border-slate-200 text-slate-600 hover:border-teal-700 hover:text-teal-800 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-[0_4px_20px_-2px_rgba(11,37,34,0.05)] hover:shadow-[0_12px_28px_-4px_rgba(11,37,34,0.12)] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Reviewer Header */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={t.avatar} 
                      alt={t.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-teal-700/20"
                    />
                    <div>
                      <h4 className="font-serif font-bold text-sm text-slate-900 leading-tight">
                        {t.name}
                      </h4>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        {t.location}
                      </span>
                    </div>
                  </div>
                  
                  {/* Destination Thumbnail */}
                  <img 
                    src={t.thumb} 
                    alt="Destination" 
                    className="w-9 h-9 rounded-xl object-cover"
                  />
                </div>

                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. READY TO EXPLORE? / CONTACT CTA BANNER                                  */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div 
          className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[380px] sm:min-h-[420px] flex items-center p-8 sm:p-12 lg:p-16 bg-cover bg-center"
          style={{ backgroundImage: `url(${bottomCtaBg})` }}
        >
          {/* Subtle directional contrast overlay so sunset, town, and yachts on the right stay 100% natural */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-xl space-y-5 text-white">
            <div className="inline-flex items-center gap-2 text-teal-300 text-xs font-bold uppercase tracking-wider">
              <span className="w-5 h-[2px] bg-teal-400 inline-block" />
              <span>Ready to Explore?</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Your Next Adventure <br />
              Starts Here
            </h2>

            <p className="text-slate-100 text-xs sm:text-sm leading-relaxed font-light">
              Let's turn your travel dreams into unforgettable memories. Discover the world with personalized guidance from Wanderly.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => window.scrollTo({ top: 300, behavior: 'smooth' })}
                className="px-7 py-3 rounded-full bg-[#0D6B5A] hover:bg-[#09493D] text-white text-xs sm:text-sm font-semibold shadow-lg transition-all cursor-pointer"
              >
                Start Planning →
              </button>
              <Link
                to="/packages"
                className="px-7 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold backdrop-blur-md border border-white/20 transition-all"
              >
                Explore Packages →
              </Link>
            </div>
          </div>

          {/* Organic Handwritten Flourish on the Right of Photo */}
          <div className="hidden lg:block absolute right-12 bottom-10 z-10 text-right select-none pointer-events-none">
            <span 
              className="text-white text-3xl xl:text-4xl leading-tight block drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              Good Vibes <br />
              <span className="text-[#38e1c6]">Only ♡</span>
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. TRUST & SUPPORT VALUE STRIP                                            */}
      {/* ========================================================================= */}
      <section className="bg-[#0B2522] py-8 sm:py-10 text-white border-t border-teal-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-white">Quick Response</h4>
                <p className="text-[11px] text-slate-300">Average reply &lt; 2 hours</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-white">Encrypted Booking</h4>
                <p className="text-[11px] text-slate-300">100% secure payments</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-white">Local Guides</h4>
                <p className="text-[11px] text-slate-300">Native destination experts</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-white">24/7 Global Support</h4>
                <p className="text-[11px] text-slate-300">Always on standby</p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
