import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Calendar, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import { blogService } from '../services';

export default function BlogDetailsPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        const data = await blogService.getArticleById(id);
        if (mounted) setPost(data);
      } catch (err) {
        if (mounted) setError(err.message || 'Failed to load article.');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadData();
    return () => { mounted = false; };
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex flex-col items-center justify-center text-center px-4 bg-slate-50">
        <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-700 rounded-full animate-spin mb-4" />
        <p className="text-slate-500 text-sm">Loading article...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-serif font-bold text-slate-800 mb-2">Article Not Found</h2>
        <p className="text-slate-500 mb-6 text-sm">{error || "We couldn't find the article you are looking for."}</p>
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-teal-700 text-white text-sm font-semibold hover:bg-teal-800"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-6 pt-4">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-teal-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Articles
          </Link>
        </div>

        {/* Article Header */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm mb-8">
          <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-teal-700" />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-teal-700" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 leading-tight mb-6">
            {post.title}
          </h1>

          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8 shadow-md">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-slate max-w-none space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            <p className="font-medium text-slate-800 text-lg leading-relaxed">
              {post.excerpt}
            </p>
            <p>
              Traveling gives you an incredible opportunity to step outside of your daily routine, see the world from different perspectives, and connect with communities and cultures you might otherwise never encounter.
            </p>
            <h3 className="font-serif font-bold text-xl text-slate-900 pt-4">
              1. Planning Ahead While Staying Flexible
            </h3>
            <p>
              When organizing your trip, it's always best to book your core transportation and premier accommodations early. However, leaving open afternoons for spontaneous wandering often leads to the most treasured memories.
            </p>
            <h3 className="font-serif font-bold text-xl text-slate-900 pt-4">
              2. Embracing Local Cuisine & Traditions
            </h3>
            <p>
              Never be afraid to ask locals where they love to eat! Street vendors, neighborhood bakeries, and morning market stalls will consistently deliver the freshest and most authentic flavors at a fraction of tourist trap prices.
            </p>
          </div>

          <div className="pt-8 mt-8 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-sm">
                W
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block">Wanderly Editorial Team</span>
                <span className="text-[11px] text-slate-400">Global Travel Enthusiasts</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-teal-700 transition-colors" title="Bookmark">
                <Bookmark className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-teal-700 transition-colors" title="Share">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
