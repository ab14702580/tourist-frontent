import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight, 
  Bookmark, Compass, BookOpen, MapPin, Shuffle, Landmark, 
  Coffee, Package, Heart, Send, Mail, Globe
} from 'lucide-react';

import heroBg from '../assets/travelRichLife.png';
import quoteBg from '../assets/DestinationHero.jpeg';
import blogService from '../services/blogService';

// Main Blog Posts
const blogArticles = [
  {
    id: 1,
    category: "DESTINATION GUIDE",
    categoryColor: "bg-teal-600/90 text-white",
    date: "May 12, 2025",
    readTime: "5 min read",
    title: "Top 10 Things to Do in Santorini, Greece",
    excerpt: "From stunning sunsets to charming villages, here's your ultimate guide to experiencing the best of Santorini on any budget.",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    category: "TRAVEL TIPS",
    categoryColor: "bg-sky-600/90 text-white",
    date: "May 8, 2025",
    readTime: "7 min read",
    title: "10 Essential Packing Tips for Your Next Adventure",
    excerpt: "Make your trip stress-free with these must-know packing tips curated from experienced worldwide travelers.",
    image: "https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    category: "LIFESTYLE",
    categoryColor: "bg-purple-600/90 text-white",
    date: "May 5, 2025",
    readTime: "6 min read",
    title: "The Best Beaches in Bali You Can't Miss",
    excerpt: "Crystal clear waters, powdery white sand and unforgettable tropical sunsets — explore the best coastal hideaways in Bali.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    category: "TRAVEL GUIDE",
    categoryColor: "bg-teal-700/90 text-white",
    date: "May 2, 2025",
    readTime: "6 min read",
    title: "A Complete Guide to Train Travel in Europe",
    excerpt: "Scenic routes, comfortable rides and unforgettable views — here's everything you need to know about navigating European railways.",
    image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    category: "CULTURE",
    categoryColor: "bg-amber-600/90 text-white",
    date: "Apr 28, 2025",
    readTime: "5 min read",
    title: "Exploring Japan's Rich Culture and Traditions",
    excerpt: "From ancient temples to modern cities, experience the unique blend of rich Japanese heritage, cuisine, and rituals.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    category: "INSPIRATION",
    categoryColor: "bg-emerald-600/90 text-white",
    date: "Apr 25, 2025",
    readTime: "4 min read",
    title: "How Travel Can Make You a Happier Person",
    excerpt: "New places, new people, new perspectives. Discover how travel can boost your mental well-being, mindfulness, and happiness.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80"
  }
];

// Icon map for dynamic categories
const categoryIconMap = {
  "destination": MapPin,
  "travel tips": BookOpen,
  "adventure": Shuffle,
  "culture": Landmark,
  "lifestyle": Coffee,
  "packing": Package,
  "inspiration": Heart,
  "budget": Package,
  "safety": Globe,
  "food": Coffee,
  "default": Compass,
};

function getCategoryIcon(categoryName = '') {
  const key = categoryName.toLowerCase();
  for (const [match, Icon] of Object.entries(categoryIconMap)) {
    if (key.includes(match)) return Icon;
  }
  return categoryIconMap.default;
}

// Explore Topics Cards
const topicCards = [
  {
    name: "Destination Guides",
    count: "12 Articles",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=400&q=80",
    icon: MapPin
  },
  {
    name: "Travel Tips",
    count: "10 Articles",
    image: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=400&q=80",
    icon: BookOpen
  },
  {
    name: "Adventure",
    count: "8 Articles",
    image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=400&q=80",
    icon: Compass
  },
  {
    name: "Food & Culture",
    count: "6 Articles",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80",
    icon: Landmark
  },
  {
    name: "Luxury Travel",
    count: "7 Articles",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80",
    icon: Heart
  },
  {
    name: "Sustainable",
    count: "9 Articles",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    icon: Globe
  }
];

// Editor's Picks — derived from allArticles in the component (first 4)

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [sidebarEmail, setSidebarEmail] = useState("");
  const [sidebarSubscribed, setSidebarSubscribed] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  // MongoDB blog articles
  const [allArticles, setAllArticles] = useState([]);
  const [blogLoading, setBlogLoading] = useState(true);

  useEffect(() => {
    blogService.getArticles()
      .then(data => setAllArticles(data || []))
      .catch(() => setAllArticles([]))
      .finally(() => setBlogLoading(false));
  }, []);

  // Reset page when filters change
  useEffect(() => { setCurrentPage(1); }, [searchQuery, activeCategory, sidebarSearch]);

  // Merge both search inputs (hero + sidebar)
  const effectiveSearch = searchQuery || sidebarSearch;

  // Client-side filter
  const filteredArticles = allArticles.filter(article => {
    const q = effectiveSearch.toLowerCase().trim();
    const matchSearch = !q ||
      article.title.toLowerCase().includes(q) ||
      (article.excerpt && article.excerpt.toLowerCase().includes(q)) ||
      (article.category && article.category.toLowerCase().includes(q)) ||
      (article.author && article.author.toLowerCase().includes(q));

    const matchCategory = !activeCategory ||
      (article.category && article.category.toLowerCase().includes(activeCategory.toLowerCase()));

    return matchSearch && matchCategory;
  });

  // Pagination
  const articlesPerPage = 6;
  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / articlesPerPage));
  const pagedArticles = filteredArticles.slice((currentPage - 1) * articlesPerPage, currentPage * articlesPerPage);

  // Sidebar popular posts — top 4 from MongoDB
  const popularPosts = allArticles.slice(0, 4);

  // Editor's Picks — top 4 articles from real data (has real ids for navigation)
  const editorsPicks = allArticles.slice(0, 4);

  // Dynamic categories derived from allArticles
  const categories = React.useMemo(() => {
    const countMap = {};
    allArticles.forEach((a) => {
      const cat = (a.category || 'Uncategorized').trim();
      countMap[cat] = (countMap[cat] || 0) + 1;
    });
    return Object.entries(countMap)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count, icon: getCategoryIcon(name) }));
  }, [allArticles]);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    // searchQuery already live-bound — just ensure page resets
    setCurrentPage(1);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmailInput("");
    }
  };

  const handleSidebarNewsletter = (e) => {
    e.preventDefault();
    if (sidebarEmail.trim()) {
      setSidebarSubscribed(true);
      setTimeout(() => setSidebarSubscribed(false), 4000);
      setSidebarEmail("");
    }
  };

  return (
    <div className="bg-[#FAFDFD] text-slate-800 font-sans selection:bg-teal-700 selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION WITH SCENIC COASTAL BACKGROUND                            */}
      {/* ========================================================================= */}
      <section 
        className="relative min-h-[540px] sm:min-h-[600px] lg:min-h-[640px] flex items-center bg-cover bg-center pt-28 pb-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Subtle contrast on the left so white text is readable, keeping sunset and coastal village on the right 100% natural and vivid */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-2xl text-left space-y-5">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#082823]/80 border border-teal-500/40 text-teal-300 text-[11px] font-semibold tracking-wider uppercase backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              <span>Travel Blog</span>
            </div>

            {/* Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.12]">
              Stories, Tips &amp; Inspiration <br />
              for <span className="text-[#2DD4BF] italic font-serif">Your Next Trip</span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-100 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed font-light drop-shadow-sm">
              Discover travel tips, destination guides, personal stories and expert advice to make your journeys more meaningful, memorable and extraordinary.
            </p>

            {/* Search Bar Pill */}
            <form 
              onSubmit={handleHeroSearch}
              className="max-w-lg pt-1"
            >
              <div className="flex items-center bg-white rounded-full shadow-2xl p-1.5 border border-white/60 focus-within:ring-2 focus-within:ring-teal-500 transition-all">
                <div className="pl-4 text-slate-400">
                  <Search className="w-5 h-5 text-teal-700" />
                </div>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search guides, destinations, gear..." 
                  className="w-full px-3 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
                />
                <button 
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#0D6B5A] hover:bg-[#09493D] text-white text-xs sm:text-sm font-semibold shadow-md transition-all whitespace-nowrap cursor-pointer hover:shadow-lg"
                >
                  Explore
                </button>
              </div>
            </form>
          </div>

          {/* Right edge carousel indicator pill as shown in blogDesign.png */}
          <div className="hidden lg:flex items-center justify-end pr-4">
            <div className="w-12 h-6 rounded-full bg-white/30 backdrop-blur-md border border-white/40 flex items-center justify-center p-1 shadow-lg">
              <span className="w-4 h-4 rounded-full bg-white shadow-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. MAIN BLOG GRID & SIDEBAR SECTION                                       */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Main Content Area (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Section Header */}
            <div>
              <div className="flex items-center gap-2 text-teal-700 text-xs font-bold uppercase tracking-widest mb-1.5">
                <span className="w-6 h-[2px] bg-teal-600 inline-block" />
                <span>Latest Posts</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Our Travel Blog
              </h2>
              <p className="text-slate-500 text-sm mt-1 max-w-2xl">
                Get inspired with our latest articles, travel guides, and tips from around the world.
              </p>
              {/* Active filter chips */}
              {(effectiveSearch || activeCategory) && (
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  {effectiveSearch && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-medium">
                      Search: "{effectiveSearch}"
                      <button onClick={() => { setSearchQuery(''); setSidebarSearch(''); }} className="text-teal-600 hover:text-teal-900">✕</button>
                    </span>
                  )}
                  {activeCategory && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-medium">
                      Category: {activeCategory}
                      <button onClick={() => setActiveCategory('')} className="text-teal-600 hover:text-teal-900">✕</button>
                    </span>
                  )}
                  <span className="text-xs text-slate-400">{filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found</span>
                </div>
              )}
            </div>

            {/* Articles Grid (2 columns) */}
            {blogLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="animate-pulse bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex flex-col">
                    <div className="aspect-[16/10] bg-slate-200" />
                    <div className="p-5 space-y-2">
                      <div className="h-3 bg-slate-200 rounded w-1/3" />
                      <div className="h-5 bg-slate-200 rounded w-full" />
                      <div className="h-3 bg-slate-200 rounded w-5/6" />
                      <div className="h-3 bg-slate-200 rounded w-4/5 mt-2" />
                      <div className="pt-4 border-t border-slate-100">
                        <div className="h-3 bg-slate-200 rounded w-20" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-slate-400 text-sm">
                  No articles found for "<span className="font-semibold text-slate-600">{effectiveSearch || activeCategory}</span>".
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSidebarSearch(''); setActiveCategory(''); }}
                  className="mt-4 px-5 py-2 rounded-full bg-teal-700 text-white text-xs font-medium"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
              {pagedArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_4px_20px_-2px_rgba(11,37,34,0.05)] hover:shadow-[0_12px_28px_-4px_rgba(11,37,34,0.12)] transition-all duration-300 flex flex-col group"
                >
                  {/* Article Thumbnail */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-sm ${article.categoryColor || 'bg-teal-600/90 text-white'}`}>
                        {article.category || 'TRAVEL'}
                      </span>
                    </div>
                  </div>

                  {/* Article Body */}
                  <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
                    <div>
                      {/* Meta: Date & Read Time */}
                      <div className="flex items-center gap-3 text-xs text-slate-400 mb-2.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-teal-600" />
                          {article.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-teal-600" />
                          {article.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900 group-hover:text-teal-800 transition-colors leading-snug">
                        <Link to={`/blog/${article.id}`}>
                          {article.title}
                        </Link>
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs sm:text-sm text-slate-500 mt-2.5 line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>

                    {/* Read More Link */}
                    <div className="pt-4 mt-5 border-t border-slate-100">
                      <Link
                        to={`/blog/${article.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 hover:text-teal-950 uppercase tracking-wider group-hover:translate-x-1 transition-all"
                      >
                        <span>Read More</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
            <div className="pt-8 flex items-center justify-center gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="w-9 h-9 rounded-full border border-slate-200 text-slate-500 hover:text-teal-800 hover:border-teal-700 flex items-center justify-center transition-colors cursor-pointer disabled:opacity-40"
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-9 h-9 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    currentPage === pageNum 
                      ? "bg-[#0D6B5A] text-white shadow-sm" 
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className="w-9 h-9 rounded-full border border-slate-200 text-slate-500 hover:text-teal-800 hover:border-teal-700 flex items-center justify-center transition-colors cursor-pointer disabled:opacity-40"
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            )}

          </div>

          {/* Sidebar Area (4 Cols) */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* Widget 1: Search Box */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <div className="relative">
                <input 
                  type="text"
                  value={sidebarSearch}
                  onChange={(e) => setSidebarSearch(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full pl-4 pr-10 py-2.5 rounded-full border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setCurrentPage(1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-700"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Widget 2: Categories */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-2 text-teal-700 text-xs font-bold uppercase tracking-wider mb-4">
                <span className="w-4 h-[2px] bg-teal-600 inline-block" />
                <span>Categories</span>
              </div>
              <ul className="space-y-2.5">
                {categories.map((cat, idx) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.name;
                  return (
                    <li key={idx}>
                      <button
                        type="button"
                        onClick={() => setActiveCategory(isActive ? '' : cat.name)}
                        className={`w-full flex items-center justify-between py-1.5 px-2 rounded-lg text-xs font-medium transition-all group ${
                          isActive
                            ? 'bg-teal-700 text-white'
                            : 'text-slate-700 hover:text-teal-800 hover:bg-teal-50/60'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-teal-600'}`} />
                          <span>{cat.name}</span>
                        </div>
                        <span className={`w-6 h-6 rounded-full text-[11px] font-semibold flex items-center justify-center transition-colors ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-100 text-slate-500 group-hover:bg-teal-100 group-hover:text-teal-800'
                        }`}>
                          {cat.count}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Widget 3: Popular Posts */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-2 text-teal-700 text-xs font-bold uppercase tracking-wider mb-4">
                <span className="w-4 h-[2px] bg-teal-600 inline-block" />
                <span>Popular Posts</span>
              </div>
              <div className="space-y-4">
                {popularPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.id}`}
                    className="flex items-center gap-3 group"
                  >
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-14 h-14 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="min-w-0">
                      <h4 className="font-serif font-bold text-xs text-slate-800 group-hover:text-teal-800 transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h4>
                      <span className="text-[11px] text-slate-400 mt-1 block">
                        {post.date}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Widget 4: Sidebar Newsletter */}
            <div className="relative rounded-3xl p-6 overflow-hidden bg-gradient-to-br from-[#0c3c35] to-[#072420] text-white shadow-xl text-center space-y-4">
              <div className="w-10 h-10 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center mx-auto text-teal-300">
                <Send className="w-5 h-5 -rotate-12" />
              </div>
              
              <div>
                <h3 className="font-serif font-bold text-lg text-white">
                  Get Travel Inspiration in Your Inbox
                </h3>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  Join our newsletter and receive the best travel tips, guides and exclusive offers.
                </p>
              </div>

              <form onSubmit={handleSidebarNewsletter} className="space-y-2.5">
                <input 
                  type="email"
                  value={sidebarEmail}
                  onChange={(e) => setSidebarEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full px-4 py-2.5 rounded-full bg-white text-slate-800 text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-full bg-[#0D6B5A] hover:bg-[#0b594b] text-white text-xs font-semibold shadow-md transition-colors cursor-pointer"
                >
                  {sidebarSubscribed ? "Subscribed! ✓" : "Subscribe"}
                </button>
              </form>
            </div>

          </aside>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. FEATURED STORY EDITORIAL ("The Art of Slow Travel")                     */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="bg-[#f2f8f7] rounded-3xl p-6 sm:p-10 lg:p-12 border border-teal-900/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Photo */}
            <div className="lg:col-span-7 relative">
              <div className="relative aspect-[16/11] rounded-3xl overflow-hidden shadow-xl bg-slate-200 group">
                <img 
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80" 
                  alt="Backpackers overlooking mountain valley" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Pill Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#0b3d36]/90 backdrop-blur-md text-white text-[11px] font-bold tracking-wider uppercase border border-white/20">
                    Featured Article
                  </span>
                </div>

                {/* Bookmark Button */}
                <button 
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-colors shadow-md ${
                    bookmarked ? "bg-teal-700 text-white" : "bg-white/90 text-slate-700 hover:bg-white"
                  }`}
                  title="Save article"
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                </button>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2 text-teal-700 text-xs font-bold uppercase tracking-wider">
                <span className="w-6 h-[2px] bg-teal-600 inline-block" />
                <span>Editor's Feature</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                The Art of Slow Travel: Discovering Places Beyond the Tourist Trail
              </h2>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Why rushing through checklist monuments misses the true magic of exploration. Learn how embracing slower paces, local transit, and community stays transforms your perspective on the world.
              </p>

              {/* Author & Meta */}
              <div className="flex items-center gap-3 pt-2 pb-2">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" 
                  alt="Sarah Williams" 
                  className="w-10 h-10 rounded-full object-cover border-2 border-teal-700/20"
                />
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block">Sarah Williams</span>
                  <span className="text-slate-400">Senior Travel Editor • May 15, 2025 • 8 min read</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <Link
                  to="/blog/featured"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0D6B5A] hover:bg-[#09493D] text-white text-xs sm:text-sm font-semibold shadow-md transition-all group"
                >
                  <span>Read Full Story</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. EXPLORE TOPICS / CATEGORY EXPLORER CARDS                               */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center">
        <div className="max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 text-teal-700 text-xs font-bold uppercase tracking-widest">
            <span className="w-6 h-[2px] bg-teal-600 inline-block" />
            <span>Explore Topics</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Find Your Travel Inspiration
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            Browse articles, guides, and tips curated across our most popular travel styles.
          </p>
        </div>

        {/* 6 Category Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {topicCards.map((topic, index) => {
            const Icon = topic.icon;
            return (
              <a
                key={index}
                href={`#topic-${topic.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-4 text-left"
              >
                {/* Photo Background */}
                <img 
                  src={topic.image} 
                  alt={topic.name} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:from-black/90 transition-colors" />

                {/* Content */}
                <div className="relative z-10 space-y-1">
                  <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-2 group-hover:bg-teal-500 transition-colors">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-white group-hover:text-teal-300 transition-colors leading-tight">
                    {topic.name}
                  </h4>
                  <span className="text-[10px] text-slate-300 flex items-center gap-1 group-hover:text-white">
                    {topic.count} →
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CURATED STORIES / EDITOR'S PICKS                                       */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-teal-700 text-xs font-bold uppercase tracking-widest mb-1.5">
              <span className="w-6 h-[2px] bg-teal-600 inline-block" />
              <span>Curated Stories</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Editor's Picks
            </h2>
          </div>

          <Link
            to="/blog/all"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 hover:text-teal-950 uppercase tracking-wider group"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {editorsPicks.map((pick) => (
            <Link
              key={pick.id}
              to={`/blog/${pick.id}`}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_4px_20px_-2px_rgba(11,37,34,0.05)] hover:shadow-[0_12px_28px_-4px_rgba(11,37,34,0.12)] transition-all duration-300 flex flex-col group"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                <img 
                  src={pick.image} 
                  alt={pick.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold text-white uppercase tracking-wider ${pick.tagColor || 'bg-teal-700'}`}>
                    {pick.tag || pick.category || 'TRAVEL'}
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <div className="text-[11px] text-slate-400 mb-2">
                    {pick.date} • {pick.readTime}
                  </div>
                  <h3 className="font-serif font-bold text-sm text-slate-900 group-hover:text-teal-800 transition-colors leading-snug">
                    {pick.title}
                  </h3>
                </div>

                <div className="pt-3 mt-4 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-teal-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read Article</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. QUOTE BANNER ("The world is a book...")                                */}
      {/* ========================================================================= */}
      <section 
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 text-center bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${quoteBg})` }}
      >
        {/* Soft atmospheric overlay - reduced so background scenery is clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-[#0B2522]/35 to-black/60 pointer-events-none" />

        <div className="max-w-3xl mx-auto space-y-6 relative z-10 text-white">
          {/* Solid Teal Quote Icon Badge */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#14B8A6] shadow-[0_0_25px_rgba(20,184,166,0.45)] flex items-center justify-center mx-auto text-[#071F1B] transition-transform hover:scale-105">
            <span className="font-serif text-3xl sm:text-4xl font-black leading-none select-none -mb-1">“</span>
          </div>

          {/* High-Contrast Pure White Quote Text with text shadow */}
          <blockquote className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-white font-normal leading-[1.35] tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            “The world is a book, and those who do not travel <br className="hidden sm:inline" />
            read only one page.”
          </blockquote>

          {/* Author in Glowing Teal Accent (#2DD4BF) with text shadow */}
          <p className="text-[#2DD4BF] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            — Saint Augustine
          </p>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-2 pt-1 text-teal-300/60 text-xs">
            <span className="tracking-widest">••••••••••</span>
            <Compass className="w-3.5 h-3.5 text-teal-300" />
            <span className="tracking-widest">••••••••••</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. NEWSLETTER CONTAINER ("Stay Updated" & Vintage Postcard)                */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="bg-[#EBF5F3] rounded-3xl p-6 sm:p-10 lg:p-14 border border-teal-800/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Vintage Postcard with Passport Stamp */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative bg-white p-3 sm:p-4 rounded-2xl shadow-xl border border-slate-200/80 -rotate-2 hover:rotate-0 transition-transform duration-500 max-w-sm w-full">
                {/* Photo in postcard */}
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=600&q=80" 
                    alt="Traveler with backpack at mountain lake" 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Postcard Text */}
                <div className="pt-3 pb-1 px-1 flex items-center justify-between text-slate-800">
                  <div>
                    <span className="font-serif font-black tracking-widest text-xs uppercase block text-slate-900">
                      WANDERLUST
                    </span>
                    <span className="text-[10px] text-slate-400 italic">
                      Wanderly Dispatch
                    </span>
                  </div>

                  {/* Circular Verified Passport Badge */}
                  <div className="w-14 h-14 rounded-full border-2 border-dashed border-[#0D6B5A] bg-[#0D6B5A]/10 p-1 flex flex-col items-center justify-center text-center text-[#0D6B5A] rotate-12">
                    <span className="text-[7px] font-black uppercase tracking-tight leading-tight">VERIFIED</span>
                    <span className="text-[9px] font-black leading-none">PASSPORT</span>
                    <span className="text-[7px] font-medium leading-tight">2025</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Newsletter Input Form */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-teal-700 text-xs font-bold uppercase tracking-wider">
                <span className="w-6 h-[2px] bg-teal-600 inline-block" />
                <span>Stay Updated</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                Get Travel Stories Straight to Your Inbox
              </h2>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl">
                Subscribe to our weekly dispatch and receive handpicked destination guides, travel tips, secret itineraries, and special member-only experiences.
              </p>

              {/* Form Input */}
              <form onSubmit={handleNewsletterSubmit} className="pt-2">
                <div className="flex flex-col sm:flex-row items-center gap-2 bg-white rounded-full p-1.5 shadow-md border border-teal-800/10 focus-within:border-teal-700 transition-all max-w-lg">
                  <div className="pl-4 pr-1 text-slate-400 hidden sm:block">
                    <Mail className="w-4 h-4 text-teal-700" />
                  </div>
                  <input 
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="w-full px-4 py-2.5 sm:px-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#0D6B5A] hover:bg-[#09493D] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all whitespace-nowrap cursor-pointer"
                  >
                    {subscribed ? "Subscribed! ✓" : "Subscribe"}
                  </button>
                </div>
              </form>

              <p className="text-[11px] text-slate-500 pt-1">
                * No spam ever. Unsubscribe with a single click anytime.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. BOTTOM CTA BANNER ("Ready for Your Next Trip?")                         */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[380px] sm:min-h-[420px] flex items-center p-8 sm:p-12 lg:p-16">
          {/* Panoramic Coastline Background */}
          <img 
            src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1600&q=85" 
            alt="Santorini Coastline" 
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#07191e]/90 via-[#07191e]/70 to-[#07191e]/30" />

          <div className="relative z-10 max-w-xl space-y-5 text-white">
            <div className="inline-flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
              <span className="w-5 h-[2px] bg-teal-400 inline-block" />
              <span>Ready for Your Next Trip?</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Your Next Adventure Starts Here
            </h2>

            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-light">
              Let's turn your travel dreams into unforgettable memories. Discover our handpicked packages and start exploring the world today.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/packages"
                className="px-6 py-3 rounded-full bg-[#0D6B5A] hover:bg-[#09493D] text-white text-xs sm:text-sm font-semibold shadow-lg transition-all"
              >
                Explore Packages →
              </Link>
              <Link
                to="/destinations"
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold backdrop-blur-md border border-white/20 transition-all"
              >
                Browse Destinations
              </Link>
            </div>
          </div>

          {/* Organic Handwritten Flourish on the Right of Photo */}
          <div className="hidden lg:block absolute right-12 bottom-10 z-10 text-right select-none pointer-events-none">
            <span 
              className="text-white text-3xl xl:text-4xl leading-tight block drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              Collect Moments <br />
              <span className="text-teal-300">Not Things ♡</span>
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. DECORATIVE BOTTOM FINISHING                                            */}
      {/* ========================================================================= */}
      <div className="text-center pb-12 pt-2 text-slate-400 space-y-2">
        <div className="w-8 h-8 rounded-full bg-teal-50 border border-teal-500/20 text-teal-600 flex items-center justify-center mx-auto">
          <Compass className="w-4 h-4" />
        </div>
        <p 
          className="text-slate-600 text-2xl font-normal"
          style={{ fontFamily: "'Caveat', cursive" }}
        >
          Keep Exploring ♡
        </p>
      </div>

    </div>
  );
}
