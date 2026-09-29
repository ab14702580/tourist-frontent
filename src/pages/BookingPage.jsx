import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft, MapPin, Clock, Star, Users, Calendar,
  Phone, Mail, User, Shield, CheckCircle2, CreditCard,
  Landmark, Smartphone, Check, AlertCircle, Lock,
  Eye, EyeOff, Building2
} from 'lucide-react';
import { packageService, bookingService, destinationService } from '../services';
import FullPageLoader from '../components/FullPageLoader';

const PAYMENT_METHODS = [
  { id: 'card',   label: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, Amex' },
  { id: 'bank',   label: 'Bank Transfer',        icon: Building2,  desc: 'Direct bank transfer'  },
  { id: 'mobile', label: 'Mobile Banking',        icon: Smartphone, desc: 'bKash, Nagad, Rocket'  },
];

const TRAVELER_OPTIONS = [1,2,3,4,5,6,7,8,9,10];

const EMPTY_PAYMENT = {
  cardNumber: '', cardName: '', cardExpiry: '', cardCvv: '',
  bankName: '', accountNumber: '', routingNumber: '', accountHolder: '',
  mobileProvider: 'bKash', mobileNumber: '', transactionId: '',
};

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isDestination = searchParams.get('type') === 'destination';

  const [pkg, setPkg] = useState(null);
  const [pkgLoading, setPkgLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    travelDate: '',
    travelers: 2,
    specialRequests: '',
    paymentMethod: 'card',
    agreeTerms: false,
  });
  const [paymentDetails, setPaymentDetails] = useState(EMPTY_PAYMENT);
  const [showCvv, setShowCvv] = useState(false);
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    let mounted = true;
    async function load() {
      try {
        let data;
        if (isDestination) {
          data = await destinationService.getDestinationById(id);
          data = {
            ...data,
            price: data.price ?? 0,
            duration: data.duration ?? 'Custom Duration',
            badge: data.badge ?? null,
            badgeColor: 'bg-teal-700 text-white',
            description: data.description ?? `Experience the beauty of ${data.title}.`,
            rating: data.rating ?? 4.8,
            reviews: data.reviews ?? 120,
          };
        } else {
          data = await packageService.getPackageById(id);
        }
        if (mounted) setPkg(data);
      } catch {
        if (mounted) navigate(isDestination ? '/destinations' : '/packages', { replace: true });
      } finally {
        if (mounted) setPkgLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [id, navigate, isDestination]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setFormError('');
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cardNumber') {
      const digits = value.replace(/\D/g, '').slice(0, 16);
      const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
      setPaymentDetails(p => ({ ...p, cardNumber: formatted }));
      return;
    }
    if (name === 'cardExpiry') {
      const digits = value.replace(/\D/g, '').slice(0, 4);
      const formatted = digits.length > 2 ? digits.slice(0, 2) + '/' + digits.slice(2) : digits;
      setPaymentDetails(p => ({ ...p, cardExpiry: formatted }));
      return;
    }
    setPaymentDetails(p => ({ ...p, [name]: value }));
  };

  const totalPrice = pkg ? pkg.price * Number(form.travelers) : 0;
  const serviceFee = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + serviceFee;

  const validatePayment = () => {
    const m = form.paymentMethod;
    if (m === 'card') {
      const num = paymentDetails.cardNumber.replace(/\s/g, '');
      if (num.length < 16) return 'Please enter a valid 16-digit card number.';
      if (!paymentDetails.cardName.trim()) return 'Please enter the cardholder name.';
      if (paymentDetails.cardExpiry.length < 5) return 'Please enter a valid expiry date (MM/YY).';
      if (paymentDetails.cardCvv.length < 3) return 'Please enter a valid CVV.';
    }
    if (m === 'bank') {
      if (!paymentDetails.bankName.trim()) return 'Please enter the bank name.';
      if (!paymentDetails.accountNumber.trim()) return 'Please enter the account number.';
      if (!paymentDetails.accountHolder.trim()) return 'Please enter the account holder name.';
    }
    if (m === 'mobile') {
      if (!paymentDetails.mobileNumber.trim() || paymentDetails.mobileNumber.replace(/\D/g, '').length < 11)
        return 'Please enter a valid mobile number (11 digits).';
      if (!paymentDetails.transactionId.trim()) return 'Please enter the transaction ID.';
    }
    return '';
  };

  const handleReview = (e) => {
    e.preventDefault();
    if (!form.firstName.trim() || !form.lastName.trim()) { setFormError('Please enter your full name.'); return; }
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) { setFormError('Please enter a valid email address.'); return; }
    if (!form.phone.trim()) { setFormError('Please enter your phone number.'); return; }
    if (!form.travelDate) { setFormError('Please select your travel date.'); return; }
    const payErr = validatePayment();
    if (payErr) { setFormError(payErr); return; }
    if (!form.agreeTerms) { setFormError('Please agree to the Terms & Conditions to continue.'); return; }
    setFormError('');
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await bookingService.createBooking({
        itemId:          pkg.id,
        itemTitle:       pkg.title,
        location:        pkg.location,
        image:           pkg.image,
        duration:        pkg.duration,
        guests:          Number(form.travelers),
        date:            form.travelDate,
        name:            `${form.firstName} ${form.lastName}`,
        email:           form.email,
        phone:           form.phone,
        specialRequests: form.specialRequests,
        paymentMethod:   form.paymentMethod,
        total:           grandTotal,
        pricePerPerson:  pkg.price,
        serviceFee,
      });
      const ref = res.booking?.bookingRef || res.booking?.id || 'WB' + Date.now();
      navigate(`/payment/${ref}`, {
        state: {
          booking: {
            ref,
            itemTitle:     pkg.title,
            travelDate:    form.travelDate,
            travelers:     form.travelers,
            grandTotal,
            email:         form.email,
            paymentMethod: form.paymentMethod,
          },
        },
      });
    } catch (err) {
      setFormError(err.message || 'Submission failed. Please try again.');
      setSubmitting(false);
    }
  };

  if (pkgLoading) return <FullPageLoader message="Loading booking details..." />;

  // ─── Inline payment details JSX (not a sub-component — avoids remount on re-render) ──
  const renderPaymentDetails = () => {
    if (form.paymentMethod === 'card') return (
      <div className="space-y-4">
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Card Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input name="cardNumber" type="text" inputMode="numeric"
              value={paymentDetails.cardNumber} onChange={handlePaymentChange}
              placeholder="1234 5678 9012 3456" maxLength={19}
              className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-800 placeholder-slate-300 bg-white font-mono tracking-widest"
            />
          </div>
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Cardholder Name <span className="text-rose-500">*</span>
          </label>
          <input name="cardName" type="text"
            value={paymentDetails.cardName} onChange={handlePaymentChange}
            placeholder="Name as on card"
            className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-800 placeholder-slate-300 bg-white"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Expiry (MM/YY) <span className="text-rose-500">*</span>
            </label>
            <input name="cardExpiry" type="text" inputMode="numeric"
              value={paymentDetails.cardExpiry} onChange={handlePaymentChange}
              placeholder="MM/YY" maxLength={5}
              className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-800 placeholder-slate-300 bg-white font-mono"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              CVV <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input name="cardCvv" type={showCvv ? 'text' : 'password'} inputMode="numeric"
                value={paymentDetails.cardCvv} onChange={handlePaymentChange}
                placeholder="•••" maxLength={4}
                className="w-full pl-4 pr-10 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-800 placeholder-slate-300 bg-white font-mono"
              />
              <button type="button" onClick={() => setShowCvv(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showCvv ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
        <p className="flex items-center gap-1.5 text-[11px] text-slate-400">
          <Lock className="w-3 h-3 text-teal-600" />
          Your card details are encrypted and never stored.
        </p>
      </div>
    );

    if (form.paymentMethod === 'bank') return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Bank Name <span className="text-rose-500">*</span>
            </label>
            <input name="bankName" type="text"
              value={paymentDetails.bankName} onChange={handlePaymentChange}
              placeholder="e.g. Dutch Bangla Bank"
              className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-800 placeholder-slate-300 bg-white"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Account Holder Name <span className="text-rose-500">*</span>
            </label>
            <input name="accountHolder" type="text"
              value={paymentDetails.accountHolder} onChange={handlePaymentChange}
              placeholder="Full name on account"
              className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-800 placeholder-slate-300 bg-white"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Account Number <span className="text-rose-500">*</span>
            </label>
            <input name="accountNumber" type="text" inputMode="numeric"
              value={paymentDetails.accountNumber} onChange={handlePaymentChange}
              placeholder="Your account number"
              className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-800 placeholder-slate-300 bg-white font-mono"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Routing / Branch Code
            </label>
            <input name="routingNumber" type="text"
              value={paymentDetails.routingNumber} onChange={handlePaymentChange}
              placeholder="Optional"
              className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-800 placeholder-slate-300 bg-white"
            />
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800">
          <strong>Note:</strong> Please transfer <strong>${grandTotal.toLocaleString()}</strong> to our account and enter your bank account details above. Your booking will be confirmed once we verify the transfer (within 1–2 business hours).
        </div>
      </div>
    );

    if (form.paymentMethod === 'mobile') return (
      <div className="space-y-4">
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Mobile Banking Provider <span className="text-rose-500">*</span>
          </label>
          <div className="flex gap-3">
            {['bKash', 'Nagad', 'Rocket'].map(p => (
              <label key={p} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 cursor-pointer text-xs font-bold transition-all ${
                paymentDetails.mobileProvider === p
                  ? 'border-teal-600 bg-teal-50 text-teal-700'
                  : 'border-slate-200 text-slate-500 hover:border-teal-300'
              }`}>
                <input type="radio" name="mobileProvider"
                  value={p} checked={paymentDetails.mobileProvider === p}
                  onChange={handlePaymentChange} className="sr-only" />
                {p}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            {paymentDetails.mobileProvider} Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input name="mobileNumber" type="tel" inputMode="numeric"
              value={paymentDetails.mobileNumber} onChange={handlePaymentChange}
              placeholder="01XXXXXXXXX"
              className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-800 placeholder-slate-300 bg-white font-mono"
            />
          </div>
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Transaction ID <span className="text-rose-500">*</span>
          </label>
          <input name="transactionId" type="text"
            value={paymentDetails.transactionId} onChange={handlePaymentChange}
            placeholder="e.g. 8FG9KL2M"
            className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-800 placeholder-slate-300 bg-white font-mono"
          />
        </div>
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 text-xs text-teal-800">
          <strong>Instructions:</strong> Send <strong>${grandTotal.toLocaleString()}</strong> to our {paymentDetails.mobileProvider} number <strong>01XXXXXXXXX</strong>, then enter your number and the transaction ID above.
        </div>
      </div>
    );

    return null;
  };

  // ─── Success screen ──────────────────────────────────────────────────────────
  // ─── Main render ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link to="/" className="hover:text-teal-700 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/packages" className="hover:text-teal-700 transition-colors">Packages</Link>
          <span>/</span>
          <Link to={`/packages/${id}`} className="hover:text-teal-700 transition-colors">{pkg?.title}</Link>
          <span>/</span>
          <span className="text-teal-700 font-semibold">Book Now</span>
        </nav>

        {/* Back link */}
        <Link
          to={`/packages/${id}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-teal-700 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Package Details
        </Link>

        {/* Progress Steps */}
        <div className="flex items-center gap-3 mb-10">
          {['Traveler Info', 'Review & Pay', 'Confirmation'].map((label, idx) => {
            const sNum = idx + 1;
            const isActive = step === sNum;
            const isDone = step > sNum;
            return (
              <React.Fragment key={label}>
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isDone   ? 'bg-teal-700 text-white' :
                    isActive ? 'bg-teal-700 text-white ring-4 ring-teal-100' :
                               'bg-slate-200 text-slate-500'
                  }`}>
                    {isDone ? <Check className="w-3.5 h-3.5" /> : sNum}
                  </div>
                  <span className={`text-xs font-semibold hidden sm:block ${
                    isActive ? 'text-teal-700' : isDone ? 'text-teal-600' : 'text-slate-400'
                  }`}>
                    {label}
                  </span>
                </div>
                {idx < 2 && (
                  <div className={`flex-1 h-0.5 rounded-full transition-all ${step > sNum ? 'bg-teal-600' : 'bg-slate-200'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT: Form */}
          <div className="lg:col-span-7 space-y-6">

            {/* ── Step 1: Traveler Info + Payment ── */}
            {step === 1 && (
              <form onSubmit={handleReview} noValidate>

                {/* Traveler Info */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 mb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="font-serif font-bold text-lg text-slate-900">Traveler Information</h2>
                      <p className="text-xs text-slate-400">Lead traveler details for the booking</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        First Name <span className="text-rose-500">*</span>
                      </label>
                      <input name="firstName" type="text" value={form.firstName} onChange={handleChange}
                        placeholder="e.g. Rahim" required
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-800 placeholder-slate-300 bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        Last Name <span className="text-rose-500">*</span>
                      </label>
                      <input name="lastName" type="text" value={form.lastName} onChange={handleChange}
                        placeholder="e.g. Uddin" required
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-800 placeholder-slate-300 bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input name="email" type="email" value={form.email} onChange={handleChange}
                          placeholder="name@example.com" required
                          className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-800 placeholder-slate-300 bg-white transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input name="phone" type="tel" value={form.phone} onChange={handleChange}
                          placeholder="+880 1xxx-xxxxxx" required
                          className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-800 placeholder-slate-300 bg-white transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trip Details */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 mb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="font-serif font-bold text-lg text-slate-900">Trip Details</h2>
                      <p className="text-xs text-slate-400">Choose your travel date and group size</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        Travel Start Date <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        <input name="travelDate" type="date" value={form.travelDate} onChange={handleChange}
                          min={new Date().toISOString().split('T')[0]} required
                          className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-800 bg-white transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        Number of Travelers <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        <select name="travelers" value={form.travelers} onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-800 bg-white transition-all appearance-none"
                        >
                          {TRAVELER_OPTIONS.map(n => (
                            <option key={n} value={n}>{n} {n === 1 ? 'Traveler' : 'Travelers'}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        Special Requests <span className="text-slate-300">(Optional)</span>
                      </label>
                      <textarea name="specialRequests" value={form.specialRequests} onChange={handleChange}
                        rows={3}
                        placeholder="e.g. Vegetarian meals, wheelchair access, anniversary arrangement..."
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-800 placeholder-slate-300 bg-white transition-all resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method selector */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 mb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="font-serif font-bold text-lg text-slate-900">Payment Method</h2>
                      <p className="text-xs text-slate-400">Select how you'd like to pay</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {PAYMENT_METHODS.map(method => {
                      const Icon = method.icon;
                      const isSelected = form.paymentMethod === method.id;
                      return (
                        <label key={method.id}
                          className={`relative flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                            isSelected
                              ? 'border-teal-600 bg-teal-50/60 shadow-sm'
                              : 'border-slate-200 hover:border-teal-300 bg-white'
                          }`}
                        >
                          <input type="radio" name="paymentMethod" value={method.id}
                            checked={isSelected} onChange={handleChange} className="sr-only" />
                          {isSelected && (
                            <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-teal-600 flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 text-white" />
                            </div>
                          )}
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isSelected ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="text-center">
                            <p className={`text-xs font-bold ${isSelected ? 'text-teal-700' : 'text-slate-700'}`}>{method.label}</p>
                            <p className="text-[10px] text-slate-400">{method.desc}</p>
                          </div>
                        </label>
                      );
                    })}
                  </div>

                  <p className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-4">
                    <Shield className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    Your payment details are secure and encrypted via SSL.
                  </p>
                </div>

                {/* Payment Details Form */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 mb-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="font-serif font-bold text-lg text-slate-900">
                        {form.paymentMethod === 'card'   && 'Card Details'}
                        {form.paymentMethod === 'bank'   && 'Bank Transfer Details'}
                        {form.paymentMethod === 'mobile' && 'Mobile Banking Details'}
                      </h2>
                      <p className="text-xs text-slate-400">Enter your payment information securely</p>
                    </div>
                  </div>
                  {renderPaymentDetails()}
                </div>

                {/* Terms */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 mb-6">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div
                      onClick={() => setForm(prev => ({ ...prev, agreeTerms: !prev.agreeTerms }))}
                      className={`w-5 h-5 mt-0.5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                        form.agreeTerms ? 'bg-teal-600 border-teal-600' : 'border-slate-300 group-hover:border-teal-400'
                      }`}
                    >
                      {form.agreeTerms && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-xs text-slate-600 leading-relaxed">
                      I agree to the{' '}
                      <span className="text-teal-700 font-semibold cursor-pointer hover:underline">Terms & Conditions</span>
                      {' '}and{' '}
                      <span className="text-teal-700 font-semibold cursor-pointer hover:underline">Privacy Policy</span>.
                      I confirm that the traveler information provided is accurate and I authorize Wanderly to process this booking.
                    </span>
                  </label>
                </div>

                {/* Error */}
                {formError && (
                  <div className="flex items-center gap-2 p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-xs mb-4">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {formError}
                  </div>
                )}

                <button type="submit"
                  className="w-full py-4 rounded-2xl bg-[#0c7c72] hover:bg-[#096860] text-white font-semibold text-sm shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  Review My Booking
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </button>
              </form>
            )}

            {/* ── Step 2: Review & Confirm ── */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8">
                  <h2 className="font-serif font-bold text-xl text-slate-900 mb-6">Review Your Booking</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-y-3 text-sm">
                      <span className="text-slate-400">Full Name</span>
                      <span className="font-semibold text-slate-800">{form.firstName} {form.lastName}</span>

                      <span className="text-slate-400">Email</span>
                      <span className="font-semibold text-slate-800 break-all">{form.email}</span>

                      <span className="text-slate-400">Phone</span>
                      <span className="font-semibold text-slate-800">{form.phone}</span>

                      <span className="text-slate-400">Travel Date</span>
                      <span className="font-semibold text-slate-800">
                        {new Date(form.travelDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>

                      <span className="text-slate-400">Travelers</span>
                      <span className="font-semibold text-slate-800">{form.travelers} {form.travelers === 1 ? 'Person' : 'People'}</span>

                      <span className="text-slate-400">Payment</span>
                      <span className="font-semibold text-slate-800">
                        {PAYMENT_METHODS.find(p => p.id === form.paymentMethod)?.label}
                      </span>

                      {form.paymentMethod === 'card' && paymentDetails.cardNumber && (
                        <>
                          <span className="text-slate-400">Card</span>
                          <span className="font-semibold text-slate-800 font-mono">
                            •••• •••• •••• {paymentDetails.cardNumber.replace(/\s/g, '').slice(-4)}
                          </span>
                        </>
                      )}
                      {form.paymentMethod === 'mobile' && paymentDetails.mobileNumber && (
                        <>
                          <span className="text-slate-400">{paymentDetails.mobileProvider}</span>
                          <span className="font-semibold text-slate-800">{paymentDetails.mobileNumber}</span>
                        </>
                      )}
                      {form.paymentMethod === 'bank' && paymentDetails.bankName && (
                        <>
                          <span className="text-slate-400">Bank</span>
                          <span className="font-semibold text-slate-800">{paymentDetails.bankName}</span>
                        </>
                      )}

                      {form.specialRequests && (
                        <>
                          <span className="text-slate-400">Special Requests</span>
                          <span className="font-semibold text-slate-800">{form.specialRequests}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8">
                  <h3 className="font-serif font-bold text-lg text-slate-900 mb-4">Price Breakdown</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">${pkg?.price?.toLocaleString()} × {form.travelers} traveler{form.travelers > 1 ? 's' : ''}</span>
                      <span className="font-semibold text-slate-800">${totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Service fee (5%)</span>
                      <span>${serviceFee.toLocaleString()}</span>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex justify-between font-bold text-base">
                      <span className="text-slate-900">Total</span>
                      <span className="text-teal-700">${grandTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {formError && (
                  <div className="flex items-center gap-2 p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {formError}
                  </div>
                )}

                <div className="flex gap-3">
                  <button type="button"
                    onClick={() => { setStep(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="flex-1 py-4 rounded-2xl border-2 border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
                  >
                    ← Edit Details
                  </button>
                  <button type="button" onClick={handleSubmit} disabled={submitting}
                    className="flex-1 py-4 rounded-2xl bg-[#0c7c72] hover:bg-[#096860] text-white font-semibold text-sm shadow-md transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </span>
                    ) : 'Confirm & Pay →'}
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm sticky top-28 overflow-hidden">
              <div className="relative aspect-[16/9] bg-slate-100">
                <img src={pkg?.image} alt={pkg?.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                {pkg?.badge && (
                  <span className={`absolute top-3 left-3 text-[11px] font-bold px-3 py-1 rounded-full shadow ${pkg?.badgeColor}`}>
                    {pkg.badge}
                  </span>
                )}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-serif font-bold text-lg leading-tight">{pkg?.title}</h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-teal-600" />
                    {pkg?.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                    {pkg?.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-slate-700">{pkg?.rating}</span>
                    <span>({pkg?.reviews} reviews)</span>
                  </span>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed border-b border-slate-100 pb-4">
                  {pkg?.description}
                </p>

                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between text-slate-500">
                    <span>${pkg?.price?.toLocaleString()} × {form.travelers} traveler{form.travelers > 1 ? 's' : ''}</span>
                    <span className="font-semibold text-slate-700">${totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-xs">
                    <span>Service fee</span>
                    <span>${serviceFee.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block">Total Amount</span>
                      <span className="text-2xl font-bold text-slate-900">${grandTotal.toLocaleString()}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-700 text-[11px] font-bold">
                      {form.travelers} {form.travelers === 1 ? 'person' : 'people'}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  {[
                    'Free cancellation up to 14 days',
                    'Instant booking confirmation',
                    'No hidden charges',
                    '24/7 traveler support',
                  ].map(text => (
                    <div key={text} className="flex items-center gap-2 text-[11px] text-slate-500">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
