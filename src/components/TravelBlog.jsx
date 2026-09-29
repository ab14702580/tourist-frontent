import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import blogService from '../services/blogService';
import { TravelBlogSkeleton } from './Skeletons';

export default function TravelBlog({ onReadArticle }) {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    blogService.getArticles()
      .then(setBlogPosts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-teal-700 uppercase mb-2">
              <span className="w-5 h-0.5 bg-teal-700 inline-block"></span>
              TRAVEL STORIES &amp; BLOG
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Travel Inspiration
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Real stories. Beautiful places. Useful tips.
            </p>
          </div>

          <Link 
            to="/blog" 
            className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-teal-800 hover:text-teal-900 group"
          >
            <span>View All Stories</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {loading ? <TravelBlogSkeleton count={4} /> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => {
                  if (onReadArticle) onReadArticle(post);
                  navigate(`/blog/${post.id}`);
                }}
                className="group cursor-pointer flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100/90 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="p-4 flex flex-col flex-grow justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                      {post.date}
                    </span>
                    <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-teal-800 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-4 pt-3 border-t border-slate-50">
                    <Clock className="w-3.5 h-3.5 text-teal-700" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
