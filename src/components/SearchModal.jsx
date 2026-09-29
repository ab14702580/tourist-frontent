import React, { useState, useEffect } from 'react';
import { X, Search, MapPin, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import destinationService from '../services/destinationService';

export default function SearchModal({ isOpen, onClose, onSelectDestination }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [allDestinations, setAllDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch destinations once on mount (not on every open, for performance)
  useEffect(() => {
    destinationService.getDestinations()
      .then(data => setAllDestinations(data || []))
      .catch(() => setAllDestinations([]))
      .finally(() => setLoading(false));
  }, []);

  // Reset query when modal closes
  useEffect(() => {
    if (!isOpen) setQuery('');
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = allDestinations.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.country.toLowerCase().includes(query.toLowerCase()) ||
    (item.category && item.category.toLowerCase().includes(query.toLowerCase()))
  );

  const handleSelect = (item) => {
    if (onSelectDestination) onSelectDestination(item);
    onClose();
    navigate(`/destinations/${item.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100">

        {/* Search Input */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-teal-700 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search destination, country, or category..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm font-medium text-slate-800 focus:outline-none placeholder-slate-400"
          />
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="p-4 max-h-96 overflow-y-auto space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block px-2 mb-2">
            {query ? `Matching Destinations (${filtered.length})` : 'Popular Suggestions'}
          </span>

          {loading ? (
            <div className="space-y-2 px-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse flex items-center gap-3 p-2">
                  <div className="w-12 h-12 rounded-xl bg-slate-200 shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3.5 bg-slate-200 rounded w-1/2" />
                    <div className="h-3 bg-slate-200 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length > 0 ? (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-teal-50/70 cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-slate-900 group-hover:text-teal-800">
                      {item.title}
                    </h4>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-teal-700" />
                      {item.country}
                      {item.category && (
                        <span className="ml-1 px-1.5 py-0.5 rounded-full bg-teal-50 text-teal-700 text-[10px] font-medium">
                          {item.category}
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-800">${item.price}</span>
                  <div className="w-7 h-7 rounded-full bg-teal-100 group-hover:bg-teal-700 text-teal-700 group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-slate-400 text-xs">
              No destinations matching "<span className="font-semibold text-slate-600">{query}</span>" found.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
