import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, XCircle, Mail, Calendar, Users, DollarSign, Package } from 'lucide-react';

/**
 * PaymentPage — shown after "Confirm & Pay" is clicked.
 *
 * Flow:
 *  1. Processing animation (2.5 seconds)
 *  2. Success state (booking already saved by BookingPage before navigating here)
 *  3. Error state (if no booking state was passed)
 */
export default function PaymentPage() {
  const { ref } = useParams();
  const location  = useLocation();
  const navigate  = useNavigate();

  // Booking summary passed via navigate() state
  const booking = location.state?.booking || null;

  const [phase, setPhase] = useState('processing'); // 'processing' | 'success' | 'error'

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (!booking || !ref) {
      setPhase('error');
      return;
    }

    // Simulate brief payment processing animation
    const timer = setTimeout(() => {
      setPhase('success');
    }, 2500);

    return () => clearTimeout(timer);
  }, [booking, ref]);

  // ── Processing ──────────────────────────────────────────────────────────────
  if (phase === 'processing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-950 via-teal-900 to-slate-900 flex flex-col items-center justify-center px-4">
        {/* Animated ring */}
        <div className="relative mb-8">
          <div className="w-28 h-28 rounded-full border-4 border-teal-700/40" />
          <div className="absolute inset-0 w-28 h-28 rounded-full border-4 border-t-teal-400 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-10 h-10 text-teal-300" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 18l5-8 4 6 3-4 4 6H4z" />
            </svg>
          </div>
        </div>

        <h2 className="text-white text-2xl font-serif font-bold mb-2 text-center">
          Processing Your Payment
        </h2>
        <p className="text-teal-300/80 text-sm text-center max-w-sm">
          Please wait while we securely confirm your booking. Do not close this page.
        </p>

        {/* Animated dots */}
        <div className="flex gap-1.5 mt-8">
          {[0,1,2].map(i => (
            <div key={i} className="w-2 h-2 rounded-full bg-teal-400"
              style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
            />
          ))}
        </div>

        <style>{`
          @keyframes bounce {
            0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
            40% { transform: translateY(-8px); opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  // ── Error ───────────────────────────────────────────────────────────────────
  if (phase === 'error') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-10 text-center max-w-md w-full">
          <div className="w-20 h-20 rounded-full bg-rose-50 border-4 border-rose-100 flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-rose-500" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-slate-900 mb-2">Payment Failed</h2>
          <p className="text-slate-500 text-sm mb-6">
            Something went wrong with your payment. No charge has been made.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => navigate(-2)}
              className="px-6 py-3 rounded-2xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
            >
              ← Try Again
            </button>
            <Link to="/"
              className="px-6 py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm transition-colors shadow-sm"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Success ─────────────────────────────────────────────────────────────────
  const travelDate = booking?.travelDate
    ? new Date(booking.travelDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'TBD';

  const paymentLabel = {
    card:   'Credit / Debit Card',
    bank:   'Bank Transfer',
    mobile: 'Mobile Banking',
  }[booking?.paymentMethod] || booking?.paymentMethod;

  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-20 px-4">
      <div className="max-w-2xl mx-auto">

        {/* ── Confetti-like header ── */}
        <div className="bg-gradient-to-br from-teal-700 to-teal-900 rounded-3xl p-8 text-center text-white mb-6 relative overflow-hidden shadow-xl">
          {/* Decorative blobs */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5" />

          <div className="relative z-10">
            <div className="w-20 h-20 rounded-full bg-white/15 border-4 border-white/30 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>

            <div className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
              ✓ Payment Successful
            </div>

            <h1 className="font-serif text-3xl font-bold mb-2">You're all set! 🎉</h1>
            <p className="text-teal-100 text-sm max-w-sm mx-auto">
              Your booking has been confirmed. A confirmation email has been sent to{' '}
              <span className="font-bold text-white">{booking?.email}</span>.
            </p>
          </div>
        </div>

        {/* ── Booking Reference ── */}
        <div className="bg-amber-50 border-2 border-dashed border-amber-300 rounded-2xl p-5 text-center mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-1">Booking Reference</p>
          <p className="text-3xl font-bold font-mono text-amber-800 tracking-wide">{ref}</p>
          <p className="text-xs text-amber-600 mt-1">Keep this for your records</p>
        </div>

        {/* ── Booking Details Card ── */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 mb-6 space-y-4">
          <h2 className="font-serif font-bold text-lg text-slate-900 mb-2">Booking Summary</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                <Package className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider">Package</p>
                <p className="text-sm font-bold text-slate-800">{booking?.itemTitle}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider">Travel Date</p>
                <p className="text-sm font-bold text-slate-800">{travelDate}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider">Travelers</p>
                <p className="text-sm font-bold text-slate-800">
                  {booking?.travelers} {booking?.travelers === 1 ? 'Person' : 'People'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                <DollarSign className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider">Total Paid</p>
                <p className="text-sm font-bold text-teal-700">${booking?.grandTotal?.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
            <span className="text-slate-400">Payment Method</span>
            <span className="font-semibold text-slate-700">{paymentLabel}</span>
          </div>
        </div>

        {/* ── Email notice ── */}
        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 flex items-start gap-3 mb-6">
          <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-teal-800 mb-0.5">Confirmation Email Sent</p>
            <p className="text-xs text-teal-700/80 leading-relaxed">
              A detailed confirmation with your itinerary has been sent to <strong>{booking?.email}</strong>.
              Our travel specialist will contact you within 24 hours.
            </p>
          </div>
        </div>

        {/* ── CTAs ── */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/packages"
            className="flex-1 py-3.5 rounded-2xl border border-slate-200 text-slate-700 font-semibold text-sm text-center hover:bg-slate-50 transition-colors"
          >
            Browse More Packages
          </Link>
          <Link to="/"
            className="flex-1 py-3.5 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm text-center transition-colors shadow-sm"
          >
            Back to Home →
          </Link>
        </div>

      </div>
    </div>
  );
}
