import React, { useState, useEffect } from 'react';
import { X, MapPin, Check } from 'lucide-react';
import { bookingService } from '../services';

export default function BookingModal({ item, onClose, onConfirm }) {
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('2025-06-15');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Reset form every time a new item is opened
  useEffect(() => {
    if (item) {
      setGuests(2);
      setDate('2025-06-15');
      setName('');
      setEmail('');
      setSubmitted(false);
      setLoading(false);
      setError(null);
    }
  }, [item]);

  if (!item) return null;

  const total = (item.price || 999) * guests;

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await bookingService.createBooking({
        itemId: item.id,
        itemTitle: item.title,
        image: item.image,
        location: item.location || item.country || '',
        duration: item.duration || '',
        badge: item.badge || '',
        guests,
        date,
        name,
        email,
        total,
      });
      setSubmitted(true);
      setTimeout(() => {
        if (onConfirm) onConfirm();
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.message || 'Booking submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center transition-colors shadow-sm"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative h-44 bg-slate-800">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/20 to-transparent"></div>
          
          <div className="absolute bottom-4 left-5 right-5 text-white">
            {item.badge && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-600 text-white mb-1.5 inline-block">
                {item.badge}
              </span>
            )}
            <h3 className="font-serif text-2xl font-bold leading-tight">
              {item.title}
            </h3>
            <p className="text-xs text-slate-200 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-teal-400" />
              {item.location || item.country}
            </p>
          </div>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h4 className="font-serif text-xl font-bold text-slate-900">
                Reservation Requested!
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Our travel curator will contact you shortly with your customized itinerary and confirmation.
              </p>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Travel Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-600 font-medium text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Travelers
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-600 font-medium text-slate-800 bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Traveler' : 'Travelers'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {error && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-600 font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-600 font-medium text-slate-800"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Total Est. Price</span>
                  <span className="font-bold text-lg text-slate-900">${total.toLocaleString()}</span>
                  <span className="text-[10px] text-slate-400 ml-1">({guests} × ${item.price})</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-sm bg-teal-700 hover:bg-teal-800 text-white font-medium rounded-xl border-none px-6 disabled:opacity-70"
                >
                  {loading ? 'Submitting...' : 'Reserve Now'}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
