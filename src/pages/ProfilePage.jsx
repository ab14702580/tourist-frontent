import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  User, Mail, Phone, Shield, Calendar, MapPin, Clock,
  Package, CheckCircle2, XCircle, AlertCircle, Edit3,
  Save, X, Plane, RefreshCw, Camera, Upload,
  CreditCard, Users, LogOut, ArrowRight, Trash2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { bookingService, profileService } from '../services';

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '—';

const daysUntil = (dateStr) => {
  if (!dateStr) return null;
  const diff = new Date(dateStr) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const StatusBadge = ({ status }) => {
  const map = {
    confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    pending:   'bg-amber-50  text-amber-700  border-amber-200',
    cancelled: 'bg-rose-50   text-rose-700   border-rose-200',
  };
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${map[status] ?? map.pending}`}>
      {status}
    </span>
  );
};

const TABS = [
  { id: 'bookings', label: 'My Bookings',    icon: Package },
  { id: 'upcoming', label: 'Upcoming Travel', icon: Plane   },
  { id: 'edit',     label: 'Edit Profile',    icon: Edit3   },
];

// ─────────────────────────────────────────────────────────────────────────────
export default function ProfilePage() {
  const { user: authUser, logout, updateUser } = useAuth();
  const fileInputRef = useRef(null);

  // ── Page state ─────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab]     = useState('bookings');
  const [profile, setProfile]         = useState(null);
  const [bookings, setBookings]       = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [dataError, setDataError]     = useState('');

  // ── Edit form state ────────────────────────────────────────────────────────
  const [form, setForm]           = useState({ name: '', phone: '' });
  const [avatarPreview, setAvatarPreview] = useState(''); // data URL or remote URL
  const [avatarBase64, setAvatarBase64]   = useState(''); // base64 to send to server
  const [avatarChanged, setAvatarChanged] = useState(false);
  const [saving, setSaving]       = useState(false);
  const [saveMsg, setSaveMsg]     = useState('');
  const [saveErr, setSaveErr]     = useState('');

  // ── Load ───────────────────────────────────────────────────────────────────
  const loadAll = async () => {
    setLoadingData(true);
    setDataError('');
    try {
      const [profileRes, bookingsRes] = await Promise.all([
        profileService.getProfile(),
        bookingService.getMyBookings(),
      ]);
      const p = profileRes?.user ?? profileRes;
      setProfile(p);
      setForm({ name: p?.name || '', phone: p?.phone || '' });
      setAvatarPreview(p?.avatar || '');
      setAvatarBase64('');
      setAvatarChanged(false);
      setBookings(Array.isArray(bookingsRes) ? bookingsRes : []);
    } catch (err) {
      setDataError(err.message || 'Failed to load profile');
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => { window.scrollTo({ top: 0 }); loadAll(); }, []);

  // ── Photo pick → Base64 ────────────────────────────────────────────────────
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 2 MB limit
    if (file.size > 2 * 1024 * 1024) {
      setSaveErr('Image must be smaller than 2 MB.');
      e.target.value = '';
      return;
    }
    if (!file.type.startsWith('image/')) {
      setSaveErr('Please select a valid image file.');
      e.target.value = '';
      return;
    }

    setSaveErr('');
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target.result; // "data:image/jpeg;base64,..."
      setAvatarPreview(base64);
      setAvatarBase64(base64);
      setAvatarChanged(true);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setAvatarPreview('');
    setAvatarBase64('');
    setAvatarChanged(true);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ── Save ───────────────────────────────────────────────────────────────────
  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { setSaveErr('Name cannot be empty.'); return; }

    setSaving(true);
    setSaveErr('');
    setSaveMsg('');

    try {
      const payload = {
        name:  form.name.trim(),
        phone: form.phone?.trim() || '',
      };
      // Only send avatar field if user changed it
      if (avatarChanged) {
        payload.avatar = avatarBase64 || null; // null = remove photo
      }

      const res = await profileService.updateProfile(payload);
      const updated = res?.user ?? res;

      // Update local profile state
      setProfile(updated);
      setAvatarPreview(updated.avatar || '');
      setAvatarBase64('');
      setAvatarChanged(false);

      // Sync AuthContext + localStorage so Navbar avatar/name updates instantly
      updateUser({
        name:   updated.name,
        avatar: updated.avatar || null,
        phone:  updated.phone  || null,
      });

      setSaveMsg('Profile updated successfully!');
      setTimeout(() => setSaveMsg(''), 3500);
    } catch (err) {
      setSaveErr(err.message || 'Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setForm({ name: profile?.name || '', phone: profile?.phone || '' });
    setAvatarPreview(profile?.avatar || '');
    setAvatarBase64('');
    setAvatarChanged(false);
    setSaveErr('');
    setSaveMsg('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ── Derived ────────────────────────────────────────────────────────────────
  const upcoming = bookings
    .filter(b => b.status !== 'cancelled' && b.date && new Date(b.date) > new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const displayUser = profile || authUser;
  const initials    = displayUser?.name
    ? displayUser.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
    : 'U';

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loadingData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-700 rounded-full animate-spin" />
          <p className="text-slate-500 text-sm">Loading your profile…</p>
        </div>
      </div>
    );
  }

  if (dataError) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-20 px-4">
        <div className="bg-white rounded-3xl shadow p-10 text-center max-w-sm w-full">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <p className="text-slate-700 font-semibold mb-4">{dataError}</p>
          <button onClick={loadAll}
            className="px-6 py-2.5 rounded-xl bg-teal-700 text-white text-sm font-semibold hover:bg-teal-800 transition">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ── Main ───────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f0f7f6] pt-20 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {/* Hero Card */}
        <div className="relative bg-gradient-to-br from-[#0a2e28] via-[#0c7c72] to-[#14b8a6] rounded-3xl p-6 sm:p-8 mb-6 overflow-hidden shadow-xl">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-5">
            {/* Avatar */}
            <div className="relative shrink-0">
              {displayUser?.avatar ? (
                <img src={displayUser.avatar} alt={displayUser.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-white/30 shadow-lg" />
              ) : (
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/20 border-4 border-white/30 flex items-center justify-center shadow-lg">
                  <span className="text-3xl font-bold text-white">{initials}</span>
                </div>
              )}
              <button onClick={() => setActiveTab('edit')}
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-teal-50 transition"
                title="Edit profile">
                <Camera className="w-3.5 h-3.5 text-teal-700" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif">{displayUser?.name}</h1>
                {displayUser?.role === 'admin' && (
                  <span className="text-[10px] font-bold bg-amber-400 text-amber-900 px-2.5 py-0.5 rounded-full uppercase tracking-wider">Admin</span>
                )}
              </div>
              <p className="text-teal-100/80 text-sm mb-3">{displayUser?.email}</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-xs text-teal-100/70">
                {displayUser?.phone && (
                  <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />{displayUser.phone}</span>
                )}
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  {displayUser?.provider === 'google' ? 'Google Account' :
                   displayUser?.provider === 'facebook' ? 'Facebook Account' : 'Email Account'}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />Joined {fmtDate(displayUser?.createdAt)}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex sm:flex-col gap-4 sm:gap-3 shrink-0">
              <div className="text-center bg-white/10 rounded-2xl px-4 py-3 min-w-[72px]">
                <p className="text-2xl font-bold text-white">{bookings.length}</p>
                <p className="text-[10px] text-teal-200 uppercase tracking-wider mt-0.5">Bookings</p>
              </div>
              <div className="text-center bg-white/10 rounded-2xl px-4 py-3 min-w-[72px]">
                <p className="text-2xl font-bold text-white">{upcoming.length}</p>
                <p className="text-[10px] text-teal-200 uppercase tracking-wider mt-0.5">Upcoming</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-2xl p-1.5 shadow-sm border border-slate-200/60 mb-6">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === id ? 'bg-teal-700 text-white shadow-sm' : 'text-slate-500 hover:text-teal-700 hover:bg-teal-50'
              }`}>
              <Icon className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* ══════════ MY BOOKINGS ══════════ */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-bold text-slate-800">
                My Bookings <span className="text-slate-400 font-normal text-base">({bookings.length})</span>
              </h2>
              <button onClick={loadAll}
                className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:text-teal-700 hover:border-teal-300 transition bg-white">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {bookings.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-12 text-center">
                <Package className="w-14 h-14 text-slate-200 mx-auto mb-4" />
                <h3 className="font-semibold text-slate-700 mb-2">No bookings yet</h3>
                <p className="text-slate-400 text-sm mb-6">Explore our packages and book your first adventure!</p>
                <Link to="/packages"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold transition shadow-sm">
                  Browse Packages <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {bookings.map((b) => {
                  const days  = daysUntil(b.date);
                  const isPast = days !== null && days < 0;
                  return (
                    <div key={b.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition overflow-hidden">
                      <div className="flex">
                        <div className={`w-1.5 shrink-0 ${
                          b.status === 'confirmed' ? 'bg-emerald-400' :
                          b.status === 'cancelled' ? 'bg-rose-400' : 'bg-amber-400'
                        }`} />
                        <div className="flex-1 p-4 sm:p-5">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                            <div className="flex gap-3 min-w-0">
                              {b.image ? (
                                <img src={b.image} alt={b.itemTitle}
                                  className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-100" />
                              ) : (
                                <div className="w-14 h-14 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                                  <Package className="w-6 h-6 text-teal-600" />
                                </div>
                              )}
                              <div className="min-w-0">
                                <p className="font-semibold text-slate-800 text-sm truncate">{b.itemTitle || 'Travel Package'}</p>
                                {b.location && (
                                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                                    <MapPin className="w-3 h-3 shrink-0" />{b.location}
                                  </p>
                                )}
                                <div className="flex flex-wrap gap-2 mt-2">
                                  <StatusBadge status={b.status} />
                                  {b.bookingRef && (
                                    <span className="text-[10px] font-mono text-slate-400 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full">
                                      {b.bookingRef}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex sm:flex-col items-start sm:items-end gap-3 sm:gap-2 shrink-0">
                              <p className="text-lg font-bold text-teal-700">${(b.total || 0).toLocaleString()}</p>
                              <div className="text-right">
                                {b.date && (
                                  <p className="text-xs text-slate-500 flex items-center gap-1 justify-end">
                                    <Plane className="w-3 h-3" /> {fmtDate(b.date)}
                                  </p>
                                )}
                                {days !== null && !isPast && b.status !== 'cancelled' && (
                                  <p className={`text-[10px] font-bold mt-0.5 ${days <= 7 ? 'text-rose-600' : days <= 30 ? 'text-amber-600' : 'text-teal-600'}`}>
                                    {days === 0 ? 'Today!' : `${days}d to go`}
                                  </p>
                                )}
                                {isPast && b.status !== 'cancelled' && (
                                  <p className="text-[10px] font-bold text-slate-400 mt-0.5">Completed</p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-4 mt-3 pt-3 border-t border-slate-100 text-xs text-slate-400">
                            {b.guests && (
                              <span className="flex items-center gap-1">
                                <Users className="w-3.5 h-3.5" />{b.guests} traveler{b.guests > 1 ? 's' : ''}
                              </span>
                            )}
                            {b.duration && (
                              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{b.duration}</span>
                            )}
                            {b.paymentMethod && (
                              <span className="flex items-center gap-1">
                                <CreditCard className="w-3.5 h-3.5" />
                                {b.paymentMethod === 'card' ? 'Card' :
                                 b.paymentMethod === 'bank' ? 'Bank Transfer' :
                                 b.paymentMethod === 'mobile' ? 'Mobile Banking' : b.paymentMethod}
                              </span>
                            )}
                            <span className="flex items-center gap-1 ml-auto">Booked {fmtDate(b.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ══════════ UPCOMING TRAVEL ══════════ */}
        {activeTab === 'upcoming' && (
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-slate-800">
              Upcoming Travel <span className="text-slate-400 font-normal text-base">({upcoming.length})</span>
            </h2>

            {upcoming.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-12 text-center">
                <Plane className="w-14 h-14 text-slate-200 mx-auto mb-4" />
                <h3 className="font-semibold text-slate-700 mb-2">No upcoming trips</h3>
                <p className="text-slate-400 text-sm mb-6">No confirmed trips yet. Time to plan your next adventure!</p>
                <Link to="/packages"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold transition shadow-sm">
                  Explore Packages <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {upcoming.map((b, idx) => {
                  const days    = daysUntil(b.date);
                  const urgency = days === 0 ? 'TODAY' : days === 1 ? 'TOMORROW' : days <= 30 ? `${days} DAYS` : null;
                  return (
                    <div key={b.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition">
                      {idx === 0 && (
                        <div className="bg-gradient-to-r from-teal-700 to-teal-500 px-5 py-2.5 flex items-center justify-between">
                          <span className="text-xs font-bold text-white uppercase tracking-wider">✈ Next Trip</span>
                          {urgency && (
                            <span className={`text-xs font-bold px-3 py-0.5 rounded-full ${
                              days <= 3 ? 'bg-rose-500 text-white' :
                              days <= 7 ? 'bg-amber-400 text-amber-900' : 'bg-white/20 text-white'
                            }`}>{urgency} TO GO</span>
                          )}
                        </div>
                      )}
                      <div className="p-5 sm:p-6">
                        <div className="flex flex-col sm:flex-row gap-5">
                          {b.image ? (
                            <img src={b.image} alt={b.itemTitle}
                              className="w-full sm:w-32 h-40 sm:h-32 rounded-2xl object-cover shrink-0" />
                          ) : (
                            <div className="w-full sm:w-32 h-32 rounded-2xl bg-gradient-to-br from-teal-100 to-teal-50 flex items-center justify-center shrink-0">
                              <Plane className="w-10 h-10 text-teal-500" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div>
                                <h3 className="font-serif font-bold text-lg text-slate-900 leading-tight">{b.itemTitle || 'Travel Package'}</h3>
                                {b.location && (
                                  <p className="text-sm text-slate-400 flex items-center gap-1 mt-0.5">
                                    <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />{b.location}
                                  </p>
                                )}
                              </div>
                              <StatusBadge status={b.status} />
                            </div>

                            {/* Flight-style row */}
                            <div className="flex items-center gap-3 my-4 p-3 bg-slate-50 rounded-2xl">
                              <div className="text-center">
                                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Departure</p>
                                <p className="font-bold text-slate-800 text-sm mt-0.5">
                                  {b.date ? new Date(b.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'}
                                </p>
                                <p className="text-[10px] text-slate-400">{b.date ? new Date(b.date).getFullYear() : ''}</p>
                              </div>
                              <div className="flex-1 flex items-center gap-1.5 px-2">
                                <div className="h-px flex-1 bg-teal-200" />
                                <Plane className="w-4 h-4 text-teal-500 shrink-0" />
                                <div className="h-px flex-1 bg-teal-200" />
                              </div>
                              <div className="text-center">
                                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Duration</p>
                                <p className="font-bold text-slate-800 text-sm mt-0.5">{b.duration || '—'}</p>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                              <span className="flex items-center gap-1.5">
                                <Users className="w-3.5 h-3.5 text-teal-600" />
                                {b.guests || 1} traveler{(b.guests || 1) > 1 ? 's' : ''}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <CreditCard className="w-3.5 h-3.5 text-teal-600" />
                                ${(b.total || 0).toLocaleString()} paid
                              </span>
                              {b.bookingRef && (
                                <span className="font-mono text-slate-400">Ref: {b.bookingRef}</span>
                              )}
                            </div>

                            {days !== null && days >= 0 && (
                              <div className={`mt-4 inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full ${
                                days === 0 ? 'bg-rose-100 text-rose-700' :
                                days <= 7  ? 'bg-amber-100 text-amber-700' : 'bg-teal-100 text-teal-700'
                              }`}>
                                <Calendar className="w-3.5 h-3.5" />
                                {days === 0 ? 'Your trip is today!' :
                                 days === 1 ? 'Your trip is tomorrow!' :
                                 `${days} days until your trip`}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ══════════ EDIT PROFILE ══════════ */}
        {activeTab === 'edit' && (
          <div className="max-w-xl">
            <h2 className="font-serif text-xl font-bold text-slate-800 mb-5">Edit Profile</h2>

            <form onSubmit={handleSave} className="space-y-5">

              {/* ── Photo Upload ── */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Profile Photo</h3>

                <div className="flex items-center gap-5">
                  {/* Preview */}
                  <div className="relative shrink-0">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="preview"
                        className="w-20 h-20 rounded-2xl object-cover border-2 border-teal-200 shadow-sm" />
                    ) : (
                      <div className="w-20 h-20 rounded-2xl bg-teal-50 border-2 border-dashed border-teal-200 flex items-center justify-center">
                        <span className="text-2xl font-bold text-teal-400">{initials}</span>
                      </div>
                    )}
                    {avatarPreview && (
                      <button type="button" onClick={handleRemovePhoto}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600 transition shadow"
                        title="Remove photo">
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* Upload button */}
                  <div className="flex-1">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      onChange={handleFileChange}
                      className="hidden"
                      id="avatar-upload"
                    />
                    <label htmlFor="avatar-upload"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-dashed border-teal-300 text-teal-700 text-sm font-semibold cursor-pointer hover:bg-teal-50 hover:border-teal-500 transition">
                      <Upload className="w-4 h-4" />
                      {avatarPreview ? 'Change Photo' : 'Upload Photo'}
                    </label>
                    <p className="text-[10px] text-slate-400 mt-2 text-center">
                      JPG, PNG, WEBP — max 2 MB
                    </p>
                  </div>
                </div>
              </div>

              {/* ── Personal Info ── */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Personal Info</h3>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="text" value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Your full name"
                      className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-800 placeholder-slate-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input type="email" value={displayUser?.email || ''} disabled
                      className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="tel" value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="+880 1XXX-XXXXXX"
                      className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-800 placeholder-slate-300"
                    />
                  </div>
                </div>
              </div>

              {/* ── Account Info ── */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-3">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Account Info</h3>
                {[
                  ['Sign-in method', displayUser?.provider || 'Email'],
                  ['Account role',   displayUser?.role || 'User'],
                  ['Member since',   fmtDate(displayUser?.createdAt)],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-slate-400">{label}</span>
                    <span className="font-semibold text-slate-700 capitalize">{val}</span>
                  </div>
                ))}
              </div>

              {/* Feedback */}
              {saveErr && (
                <div className="flex items-center gap-2 p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-sm">
                  <XCircle className="w-4 h-4 shrink-0" />{saveErr}
                </div>
              )}
              {saveMsg && (
                <div className="flex items-center gap-2 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 text-sm">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />{saveMsg}
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3">
                <button type="button" onClick={handleReset}
                  className="flex-1 py-3.5 rounded-2xl border-2 border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition flex items-center justify-center gap-2">
                  <X className="w-4 h-4" /> Reset
                </button>
                <button type="submit" disabled={saving}
                  className="flex-1 py-3.5 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm shadow-md transition disabled:opacity-60 flex items-center justify-center gap-2">
                  {saving
                    ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    : <Save className="w-4 h-4" />}
                  {saving ? 'Saving…' : 'Save Changes'}
                </button>
              </div>
            </form>

            {/* Sign out */}
            <div className="mt-6 bg-white rounded-3xl border border-rose-100 shadow-sm p-6">
              <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-4">Account</h3>
              <button onClick={logout}
                className="w-full py-3 rounded-2xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-semibold text-sm transition flex items-center justify-center gap-2">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
