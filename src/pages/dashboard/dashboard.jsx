import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingCart, Users, MapPin,
  BarChart3, Settings, Search, Bell, LogOut, Plus, Trash2,
  Ban, CheckCircle, TrendingUp, DollarSign, Globe, X,
  ChevronDown, ArrowRight, AlertTriangle, RefreshCw, Eye,
  XCircle
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell
} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import apiClient from '../../services/apiClient';

// ─── API helpers (all hit /api/admin/* — requires admin JWT) ──────────────────
const fetchAnalytics   = () => apiClient.get('/admin/analytics');
const fetchUsers       = () => apiClient.get('/admin/users');
const fetchPackages    = () => apiClient.get('/packages');
const fetchDestinations= () => apiClient.get('/destinations');
const fetchAdminBookings = () => apiClient.get('/admin/bookings');
const banUser          = (id) => apiClient.patch(`/admin/users/${id}/ban`);
const unbanUser        = (id) => apiClient.patch(`/admin/users/${id}/unban`);
const deleteUser       = (id) => apiClient.delete(`/admin/users/${id}`);
const deletePackage    = (id) => apiClient.delete(`/admin/packages/${id}`);
const deleteDestination= (id) => apiClient.delete(`/admin/destinations/${id}`);
const addPackage       = (data) => apiClient.post('/admin/packages', data);
const addDestination   = (data) => apiClient.post('/admin/destinations', data);
const updateBookingStatus = (id, status) => apiClient.patch(`/admin/bookings/${id}/status`, { status });

// ─── Chart tooltip ────────────────────────────────────────────────────────────
const ChartTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-[#0b2b1d] text-white px-3 py-1.5 rounded-lg shadow-lg text-xs text-center">
        <p className="text-gray-300 text-[10px]">{label}</p>
        <p className="text-sm font-semibold">${payload[0].value?.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, sub, color = 'teal' }) => (
  <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex items-center gap-3.5 hover:shadow-md transition">
    <div className={`w-11 h-11 rounded-xl bg-${color}-50 text-${color}-700 flex items-center justify-center border border-${color}-100 shrink-0`}>
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-[11px] font-medium text-slate-500">{label}</p>
      <h3 className="text-xl font-bold text-slate-800 leading-tight">{value ?? '—'}</h3>
      {sub && <p className="text-[10px] text-teal-600 font-semibold mt-0.5">{sub}</p>}
    </div>
  </div>
);

// ─── Add Package Modal ────────────────────────────────────────────────────────
const EMPTY_PKG = { title: '', location: '', duration: '', price: '', badge: '', description: '' };

function AddPackageModal({ onClose, onAdded }) {
  const [form, setForm]               = useState(EMPTY_PKG);
  const [imagePreview, setImagePreview] = useState('');
  const [imageBase64, setImageBase64]   = useState('');
  const [loading, setLoading]         = useState(false);
  const [err, setErr]                 = useState('');
  const fileInputRef                  = React.useRef(null);

  // ── File → Base64 ──────────────────────────────────────────────────────────
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) { setErr('Image must be smaller than 3 MB.'); e.target.value = ''; return; }
    if (!file.type.startsWith('image/')) { setErr('Please select a valid image.'); e.target.value = ''; return; }
    setErr('');
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImagePreview(ev.target.result);
      setImageBase64(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview('');
    setImageBase64('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.price) { setErr('Title and price are required.'); return; }
    setLoading(true);
    try {
      await addPackage({
        ...form,
        price:   Number(form.price),
        image:   imageBase64 || null,
        rating:  4.5,
        reviews: 0,
      });
      onAdded();
      onClose();
    } catch (ex) {
      setErr(ex.message || 'Failed to add package');
    } finally {
      setLoading(false);
    }
  };

  const field = (key, label, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-7 border border-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-xl font-bold text-slate-900">Add New Package</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center">
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {err && <p className="mb-3 text-xs text-rose-600 bg-rose-50 px-3 py-2 rounded-lg">{err}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Text fields */}
          <div className="grid grid-cols-2 gap-3">
            {field('title',    'Package Title', 'text',   'Bali Adventure')}
            {field('location', 'Location',      'text',   'Bali, Indonesia')}
            {field('duration', 'Duration',      'text',   '7 Days / 6 Nights')}
            {field('price',    'Price ($)',      'number', '999')}
            {field('badge',    'Badge',          'text',   'Most Popular')}
          </div>

          {/* Description */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              rows={2}
              placeholder="Short description..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 resize-none"
            />
          </div>

          {/* ── Image Upload ── */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
              Package Photo
            </label>

            {imagePreview ? (
              /* Preview */
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                <img src={imagePreview} alt="preview"
                  className="w-full h-36 object-cover" />
                <button type="button" onClick={removeImage}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow transition"
                  title="Remove image">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              /* Drop zone */
              <label htmlFor="pkg-image-upload"
                className="flex flex-col items-center justify-center gap-2 w-full h-28 rounded-xl border-2 border-dashed border-teal-300 bg-teal-50/40 cursor-pointer hover:bg-teal-50 hover:border-teal-500 transition">
                <svg className="w-7 h-7 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <span className="text-xs font-semibold text-teal-600">Click to upload photo</span>
                <span className="text-[10px] text-slate-400">JPG, PNG, WEBP — max 3 MB</span>
              </label>
            )}

            <input
              ref={fileInputRef}
              id="pkg-image-upload"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 flex gap-3">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold transition disabled:opacity-60 flex items-center justify-center gap-2">
              {loading
                ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <Plus className="w-4 h-4" />}
              {loading ? 'Adding...' : 'Add Package'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Add Destination Modal ────────────────────────────────────────────────────
const EMPTY_DEST = { title: '', country: '', category: '', price: '', duration: '', badge: '', description: '' };

function AddDestinationModal({ onClose, onAdded }) {
  const [form, setForm]               = useState(EMPTY_DEST);
  const [imagePreview, setImagePreview] = useState('');
  const [imageBase64, setImageBase64]   = useState('');
  const [loading, setLoading]         = useState(false);
  const [err, setErr]                 = useState('');
  const fileInputRef                  = React.useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) { setErr('Image must be smaller than 3 MB.'); e.target.value = ''; return; }
    if (!file.type.startsWith('image/')) { setErr('Please select a valid image.'); e.target.value = ''; return; }
    setErr('');
    const reader = new FileReader();
    reader.onload = (ev) => { setImagePreview(ev.target.result); setImageBase64(ev.target.result); };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(''); setImageBase64('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.country || !form.price) { setErr('Title, country, and price are required.'); return; }
    setLoading(true);
    try {
      await addDestination({
        ...form,
        price:   Number(form.price),
        image:   imageBase64 || null,
        rating:  4.5,
        reviews: 0,
      });
      onAdded();
      onClose();
    } catch (ex) {
      setErr(ex.message || 'Failed to add destination');
    } finally {
      setLoading(false);
    }
  };

  const field = (key, label, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">{label}</label>
      <input
        type={type} value={form[key]}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-7 border border-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-xl font-bold text-slate-900">Add New Destination</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center">
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {err && <p className="mb-3 text-xs text-rose-600 bg-rose-50 px-3 py-2 rounded-lg">{err}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {field('title',    'Destination Title', 'text',   'Santorini')}
            {field('country',  'Country',           'text',   'Greece')}
            {field('category', 'Category',          'text',   'Beach')}
            {field('price',    'Price ($)',          'number', '1299')}
            {field('duration', 'Duration',          'text',   '7 days')}
            {field('badge',    'Badge',              'text',   'Trending')}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              rows={2} placeholder="Short description..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 resize-none"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">Destination Photo</label>
            {imagePreview ? (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                <img src={imagePreview} alt="preview" className="w-full h-36 object-cover" />
                <button type="button" onClick={removeImage}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow transition">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <label htmlFor="dest-image-upload"
                className="flex flex-col items-center justify-center gap-2 w-full h-28 rounded-xl border-2 border-dashed border-teal-300 bg-teal-50/40 cursor-pointer hover:bg-teal-50 hover:border-teal-500 transition">
                <svg className="w-7 h-7 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <span className="text-xs font-semibold text-teal-600">Click to upload photo</span>
                <span className="text-[10px] text-slate-400">JPG, PNG, WEBP — max 3 MB</span>
              </label>
            )}
            <input ref={fileInputRef} id="dest-image-upload" type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleImageChange} className="hidden" />
          </div>

          <div className="pt-2 flex gap-3">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold transition disabled:opacity-60 flex items-center justify-center gap-2">
              {loading
                ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <Plus className="w-4 h-4" />}
              {loading ? 'Adding...' : 'Add Destination'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Confirm Dialog ───────────────────────────────────────────────────────────
function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 border border-slate-100 text-center">
        <AlertTriangle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
        <p className="text-sm font-semibold text-slate-800 mb-5">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
const CATEGORY_COLORS = ['#0c7c72', '#1a9e94', '#2ec4b6', '#52d9d0', '#8eeae4', '#c4f6f3'];
const NAV_ITEMS = [
  { name: 'Overview',     icon: LayoutDashboard },
  { name: 'Packages',     icon: Package },
  { name: 'Destinations', icon: Globe },
  { name: 'Bookings',     icon: ShoppingCart },
  { name: 'Users',        icon: Users },
  { name: 'Analytics',    icon: BarChart3 },
];

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu]       = useState('Overview');
  const [analytics, setAnalytics]         = useState(null);
  const [users, setUsers]                 = useState([]);
  const [packages, setPackages]           = useState([]);
  const [destinations, setDestinations]   = useState([]);
  const [allBookings, setAllBookings]     = useState([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState('');

  const [showAddPkg, setShowAddPkg]       = useState(false);
  const [showAddDest, setShowAddDest]     = useState(false);
  const [confirm, setConfirm]             = useState(null); // { message, onConfirm }
  const [searchUsers, setSearchUsers]     = useState('');
  const [searchPkgs, setSearchPkgs]       = useState('');
  const [toast, setToast]                 = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  // ── Load data ───────────────────────────────────────────────────────────────
  const loadAll = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [ana, usr, pkg, dest, bookings] = await Promise.all([
        fetchAnalytics(),
        fetchUsers(),
        fetchPackages(),
        fetchDestinations(),
        fetchAdminBookings(),
      ]);
      setAnalytics(ana);
      setUsers(usr);
      setPackages(pkg);
      setDestinations(dest);
      setAllBookings(bookings);
    } catch (ex) {
      setError(ex.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  // ── User actions ─────────────────────────────────────────────────────────────
  const handleBan = (u) => setConfirm({
    message: `Ban "${u.name}"? They won't be able to log in.`,
    onConfirm: async () => {
      setConfirm(null);
      await banUser(u.id);
      setUsers(prev => prev.map(x => x.id === u.id ? { ...x, isBanned: true } : x));
      showToast(`${u.name} has been banned.`);
    },
  });

  const handleUnban = async (u) => {
    await unbanUser(u.id);
    setUsers(prev => prev.map(x => x.id === u.id ? { ...x, isBanned: false } : x));
    showToast(`${u.name} has been unbanned.`);
  };

  const handleDeleteUser = (u) => setConfirm({
    message: `Permanently delete "${u.name}"?`,
    onConfirm: async () => {
      setConfirm(null);
      await deleteUser(u.id);
      setUsers(prev => prev.filter(x => x.id !== u.id));
      showToast(`${u.name} deleted.`);
    },
  });

  // ── Booking actions ──────────────────────────────────────────────────────────
  const handleCancelBooking = (b) => setConfirm({
    message: `Cancel booking "${b.bookingRef}"? The traveler will be notified.`,
    onConfirm: async () => {
      setConfirm(null);
      await updateBookingStatus(b.id, 'cancelled');
      setAllBookings(prev => prev.map(x => x.id === b.id ? { ...x, status: 'cancelled' } : x));
      showToast(`Booking ${b.bookingRef} cancelled.`);
    },
  });

  const handleConfirmBooking = async (b) => {
    await updateBookingStatus(b.id, 'confirmed');
    setAllBookings(prev => prev.map(x => x.id === b.id ? { ...x, status: 'confirmed' } : x));
    showToast(`Booking ${b.bookingRef} confirmed.`);
  };

  // ── Package/Destination actions ───────────────────────────────────────────────
  const handleDeletePkg = (pkg) => setConfirm({
    message: `Delete package "${pkg.title}"?`,
    onConfirm: async () => {
      setConfirm(null);
      await deletePackage(pkg.id);
      setPackages(prev => prev.filter(x => x.id !== pkg.id));
      showToast(`Package "${pkg.title}" deleted.`);
    },
  });

  const handleDeleteDest = (dest) => setConfirm({
    message: `Delete destination "${dest.title}"?`,
    onConfirm: async () => {
      setConfirm(null);
      await deleteDestination(dest.id);
      setDestinations(prev => prev.filter(x => x.id !== dest.id));
      showToast(`Destination "${dest.title}" deleted.`);
    },
  });

  const handleLogout = async () => { await logout(); navigate('/login'); };

  // ── Derived data ─────────────────────────────────────────────────────────────
  const stats = analytics?.stats || {};
  const monthlyRevenue = analytics?.monthlyRevenue || [];
  const recentBookings = analytics?.recentBookings || [];

  const categoryChartData = packages.reduce((acc, pkg) => {
    const cat = pkg.badge || 'Other';
    const existing = acc.find(a => a.name === cat);
    if (existing) existing.value += pkg.price || 0;
    else acc.push({ name: cat, value: pkg.price || 0 });
    return acc;
  }, []).slice(0, 6);

  const filteredUsers = users.filter(u =>
    u.name?.toLowerCase().includes(searchUsers.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchUsers.toLowerCase())
  );
  const filteredPkgs = packages.filter(p =>
    p.title?.toLowerCase().includes(searchPkgs.toLowerCase()) ||
    p.location?.toLowerCase().includes(searchPkgs.toLowerCase())
  );

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="flex min-h-screen bg-[#F0F7F6] font-sans antialiased text-slate-800">

      {/* ── Confirm Dialog ── */}
      {confirm && (
        <ConfirmDialog
          message={confirm.message}
          onConfirm={confirm.onConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}

      {/* ── Add Package Modal ── */}
      {showAddPkg && (
        <AddPackageModal onClose={() => setShowAddPkg(false)} onAdded={() => { loadAll(); showToast('Package added!'); }} />
      )}

      {/* ── Add Destination Modal ── */}
      {showAddDest && (
        <AddDestinationModal onClose={() => setShowAddDest(false)} onAdded={() => { loadAll(); showToast('Destination added!'); }} />
      )}

      {/* ── Toast ── */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-teal-800 text-white text-xs font-medium px-5 py-2.5 rounded-full shadow-xl animate-fadeIn">
          {toast}
        </div>
      )}

      {/* ══════════════════ SIDEBAR ══════════════════ */}
      <aside className="w-60 bg-[#0a2e28] text-teal-100 flex flex-col justify-between shrink-0 select-none">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-3 px-5 py-5 border-b border-teal-900/50 hover:bg-teal-900/20 transition">
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
              <svg className="w-5 h-5 text-teal-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 18l5-8 4 6 3-4 4 6H4z" />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-bold text-white leading-none">Wanderly</h1>
              <p className="text-[10px] text-teal-400/80 mt-0.5">Admin Dashboard</p>
            </div>
          </Link>

          {/* Nav */}
          <nav className="px-3 py-4 space-y-1">
            {NAV_ITEMS.map(({ name, icon: Icon }) => {
              const isActive = activeMenu === name;
              return (
                <button key={name} onClick={() => setActiveMenu(name)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive ? 'bg-teal-700/70 text-white shadow-sm' : 'text-teal-200/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-teal-300/60'}`} />
                  {name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Admin info + logout */}
        <div className="p-4 border-t border-teal-900/40">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Admin')}&background=0c7c72&color=fff`}
              alt={user?.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-teal-600/40"
            />
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{user?.name || 'Admin'}</p>
              <p className="text-[10px] text-teal-400/70 truncate">{user?.email}</p>
            </div>
          </div>
          <button onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-teal-200 text-xs font-medium transition border border-white/10"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ══════════════════ MAIN ══════════════════ */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">

        {/* Header */}
        <header className="px-7 py-4 flex items-center justify-between bg-white/70 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-10">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-serif">{activeMenu}</h2>
            <p className="text-[11px] text-slate-400">Wanderly Admin Panel</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={loadAll} className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-teal-700 transition shadow-sm" title="Refresh">
              <RefreshCw className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
              <img
                src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Admin')}&background=0c7c72&color=fff`}
                alt="Admin"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-teal-600/30"
              />
              <span className="text-xs font-bold text-slate-700">{user?.name}</span>
              <span className="text-[10px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-semibold">Admin</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="px-7 py-6 flex-1">

          {/* Error */}
          {error && (
            <div className="mb-5 flex items-center gap-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3 rounded-2xl">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              {error}
              <button onClick={loadAll} className="ml-auto text-rose-600 hover:text-rose-800 text-xs font-semibold underline">Retry</button>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-700 rounded-full animate-spin" />
            </div>
          )}

          {!loading && (
            <>
              {/* ═══ OVERVIEW ═══ */}
              {activeMenu === 'Overview' && (
                <div className="space-y-6">
                  {/* Greeting */}
                  <div>
                    <h3 className="text-2xl font-bold font-serif text-slate-900">
                      Welcome back, {user?.name?.split(' ')[0] || 'Admin'} 👋
                    </h3>
                    <p className="text-slate-500 text-sm mt-0.5">Here's what's happening with Wanderly today.</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard icon={ShoppingCart} label="Total Bookings" value={stats.totalBookings ?? 0} sub="All time" />
                    <StatCard icon={DollarSign}   label="Total Revenue"  value={`$${(stats.totalRevenue ?? 0).toLocaleString()}`} sub="From bookings" />
                    <StatCard icon={Users}         label="Registered Users" value={stats.totalUsers ?? 0} sub="All time" />
                    <StatCard icon={Package}       label="Travel Packages"  value={stats.totalPackages ?? 0} sub={`${stats.totalDestinations ?? 0} destinations`} />
                  </div>

                  {/* Charts row */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    {/* Revenue chart */}
                    <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-bold text-slate-800">Monthly Revenue</h4>
                        <span className="text-[11px] text-slate-400">Last 6 months</span>
                      </div>
                      <div className="h-52">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={monthlyRevenue} margin={{ top: 8, right: 10, left: -15, bottom: 0 }}>
                            <defs>
                              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%"  stopColor="#0c7c72" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#0c7c72" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} tickFormatter={v => `$${v}`} />
                            <Tooltip content={<ChartTooltip />} />
                            <Area type="monotone" dataKey="revenue" stroke="#0c7c72" strokeWidth={2.5}
                              fillOpacity={1} fill="url(#revGrad)"
                              dot={{ r: 3, fill: '#0c7c72', strokeWidth: 1, stroke: '#fff' }}
                              activeDot={{ r: 5, fill: '#0a2e28', stroke: '#fff', strokeWidth: 2 }}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Category donut */}
                    <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
                      <h4 className="text-sm font-bold text-slate-800 mb-3">Packages by Badge</h4>
                      {categoryChartData.length > 0 ? (
                        <div className="flex flex-col items-center">
                          <div className="h-36 w-36 relative">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie data={categoryChartData} innerRadius={42} outerRadius={62} paddingAngle={2} dataKey="value">
                                  {categoryChartData.map((_, i) => (
                                    <Cell key={i} fill={CATEGORY_COLORS[i % CATEGORY_COLORS.length]} />
                                  ))}
                                </Pie>
                              </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                              <span className="text-[10px] text-slate-400">Packages</span>
                              <span className="text-sm font-bold text-slate-800">{packages.length}</span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 w-full mt-3 pt-3 border-t border-slate-100">
                            {categoryChartData.map((cat, i) => (
                              <div key={cat.name} className="flex items-center gap-1.5 text-[11px]">
                                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: CATEGORY_COLORS[i % CATEGORY_COLORS.length] }} />
                                <span className="text-slate-600 truncate">{cat.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-slate-400 text-center py-10">No package data yet</p>
                      )}
                    </div>
                  </div>

                  {/* Recent Bookings */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-bold text-slate-800">Recent Bookings</h4>
                      <button onClick={() => setActiveMenu('Bookings')} className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1">
                        View All <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                    {recentBookings.length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-8">No bookings yet.</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="text-[10px] text-slate-400 uppercase tracking-wider border-b border-slate-100">
                              <th className="pb-2 font-medium">Ref</th>
                              <th className="pb-2 font-medium">Package</th>
                              <th className="pb-2 font-medium">Amount</th>
                              <th className="pb-2 font-medium">Status</th>
                              <th className="pb-2 font-medium">Date</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {recentBookings.map(b => (
                              <tr key={b.id} className="hover:bg-slate-50/70 transition">
                                <td className="py-2.5 font-mono text-slate-600">{b.bookingRef || b.id.slice(-8)}</td>
                                <td className="py-2.5 font-medium text-slate-800 max-w-[180px] truncate">{b.packageTitle}</td>
                                <td className="py-2.5 font-semibold text-teal-700">${b.amount?.toLocaleString()}</td>
                                <td className="py-2.5">
                                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                    b.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' :
                                    'bg-amber-50 text-amber-700 border border-amber-200/60'
                                  }`}>{b.status}</span>
                                </td>
                                <td className="py-2.5 text-slate-400">
                                  {b.createdAt ? new Date(b.createdAt).toLocaleDateString() : '—'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ═══ PACKAGES ═══ */}
              {activeMenu === 'Packages' && (
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h3 className="font-serif text-xl font-bold text-slate-900">Travel Packages ({packages.length})</h3>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <input value={searchPkgs} onChange={e => setSearchPkgs(e.target.value)}
                          placeholder="Search packages..."
                          className="pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-teal-600 bg-white w-48"
                        />
                      </div>
                      <button onClick={() => setShowAddPkg(true)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold transition shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Package
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-100">
                        <tr className="text-[10px] text-slate-400 uppercase tracking-wider">
                          <th className="py-3 px-4 font-medium">Package</th>
                          <th className="py-3 px-4 font-medium">Location</th>
                          <th className="py-3 px-4 font-medium">Duration</th>
                          <th className="py-3 px-4 font-medium">Price</th>
                          <th className="py-3 px-4 font-medium">Badge</th>
                          <th className="py-3 px-4 font-medium text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredPkgs.map(pkg => (
                          <tr key={pkg.id} className="hover:bg-slate-50/70 transition">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                {pkg.image && (
                                  <img src={pkg.image} alt={pkg.title}
                                    className="w-10 h-10 rounded-xl object-cover border border-slate-100"
                                    onError={e => { e.target.style.display = 'none'; }}
                                  />
                                )}
                                <span className="font-semibold text-slate-800">{pkg.title}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-slate-500">{pkg.location}</td>
                            <td className="py-3 px-4 text-slate-500">{pkg.duration}</td>
                            <td className="py-3 px-4 font-semibold text-teal-700">${pkg.price?.toLocaleString()}</td>
                            <td className="py-3 px-4">
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200/60">
                                {pkg.badge || '—'}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button onClick={() => handleDeletePkg(pkg)}
                                className="p-1.5 rounded-lg text-rose-400 hover:text-rose-600 hover:bg-rose-50 transition"
                                title="Delete package"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                        {filteredPkgs.length === 0 && (
                          <tr><td colSpan={6} className="py-10 text-center text-slate-400 text-sm">No packages found.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ═══ DESTINATIONS ═══ */}
              {activeMenu === 'Destinations' && (
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h3 className="font-serif text-xl font-bold text-slate-900">Destinations ({destinations.length})</h3>
                    <button onClick={() => setShowAddDest(true)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold transition shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Destination
                    </button>
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-100">
                        <tr className="text-[10px] text-slate-400 uppercase tracking-wider">
                          <th className="py-3 px-4 font-medium">Destination</th>
                          <th className="py-3 px-4 font-medium">Country</th>
                          <th className="py-3 px-4 font-medium">Category</th>
                          <th className="py-3 px-4 font-medium">Price</th>
                          <th className="py-3 px-4 font-medium">Rating</th>
                          <th className="py-3 px-4 font-medium text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {destinations.map(dest => (
                          <tr key={dest.id} className="hover:bg-slate-50/70 transition">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                {dest.image && (
                                  <img src={dest.image} alt={dest.title}
                                    className="w-10 h-10 rounded-xl object-cover border border-slate-100"
                                    onError={e => { e.target.style.display = 'none'; }}
                                  />
                                )}
                                <span className="font-semibold text-slate-800">{dest.title}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-slate-500">{dest.country}</td>
                            <td className="py-3 px-4">
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 font-medium border border-teal-200/60">
                                {dest.category}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-semibold text-teal-700">${dest.price?.toLocaleString()}</td>
                            <td className="py-3 px-4 text-amber-500 font-semibold">★ {dest.rating}</td>
                            <td className="py-3 px-4 text-right">
                              <button onClick={() => handleDeleteDest(dest)}
                                className="p-1.5 rounded-lg text-rose-400 hover:text-rose-600 hover:bg-rose-50 transition"
                                title="Delete destination"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ═══ BOOKINGS ═══ */}
              {activeMenu === 'Bookings' && (
                <div className="space-y-5">
                  <h3 className="font-serif text-xl font-bold text-slate-900">All Bookings ({allBookings.length})</h3>
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                    {allBookings.length === 0 ? (
                      <p className="text-sm text-slate-400 text-center py-16">No bookings in the system yet.</p>
                    ) : (
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 border-b border-slate-100">
                          <tr className="text-[10px] text-slate-400 uppercase tracking-wider">
                            <th className="py-3 px-4 font-medium">Ref</th>
                            <th className="py-3 px-4 font-medium">Customer</th>
                            <th className="py-3 px-4 font-medium">Package</th>
                            <th className="py-3 px-4 font-medium">Date</th>
                            <th className="py-3 px-4 font-medium">Amount</th>
                            <th className="py-3 px-4 font-medium">Payment</th>
                            <th className="py-3 px-4 font-medium">Status</th>
                            <th className="py-3 px-4 font-medium text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {allBookings.map(b => (
                            <tr key={b.id} className="hover:bg-slate-50/70 transition">
                              <td className="py-3 px-4 font-mono text-slate-600 text-[11px]">{b.bookingRef}</td>
                              <td className="py-3 px-4">
                                <p className="font-semibold text-slate-800">{b.name}</p>
                                <p className="text-[10px] text-slate-400">{b.email}</p>
                              </td>
                              <td className="py-3 px-4 font-medium text-slate-700 max-w-[140px] truncate">{b.itemTitle}</td>
                              <td className="py-3 px-4 text-slate-400 text-[11px]">
                                {b.date ? new Date(b.date).toLocaleDateString() : '—'}
                              </td>
                              <td className="py-3 px-4 font-semibold text-teal-700">${b.total?.toLocaleString()}</td>
                              <td className="py-3 px-4 text-slate-500 capitalize text-[11px]">{b.paymentMethod}</td>
                              <td className="py-3 px-4">
                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                  b.status === 'confirmed'  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' :
                                  b.status === 'cancelled'  ? 'bg-rose-50 text-rose-700 border border-rose-200/60' :
                                  'bg-amber-50 text-amber-700 border border-amber-200/60'
                                }`}>{b.status}</span>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  {b.status !== 'confirmed' && (
                                    <button onClick={() => handleConfirmBooking(b)} title="Confirm"
                                      className="p-1.5 rounded-lg text-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 transition text-[10px] font-semibold"
                                    >
                                      ✓
                                    </button>
                                  )}
                                  {b.status !== 'cancelled' && (
                                    <button onClick={() => handleCancelBooking(b)} title="Cancel / Reject"
                                      className="p-1.5 rounded-lg text-rose-400 hover:text-rose-600 hover:bg-rose-50 transition"
                                    >
                                      <XCircle className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}

              {/* ═══ USERS ═══ */}
              {activeMenu === 'Users' && (
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h3 className="font-serif text-xl font-bold text-slate-900">Users ({users.length})</h3>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                      <input value={searchUsers} onChange={e => setSearchUsers(e.target.value)}
                        placeholder="Search users..."
                        className="pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-teal-600 bg-white w-52"
                      />
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-100">
                        <tr className="text-[10px] text-slate-400 uppercase tracking-wider">
                          <th className="py-3 px-4 font-medium">User</th>
                          <th className="py-3 px-4 font-medium">Provider</th>
                          <th className="py-3 px-4 font-medium">Role</th>
                          <th className="py-3 px-4 font-medium">Status</th>
                          <th className="py-3 px-4 font-medium">Joined</th>
                          <th className="py-3 px-4 font-medium text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredUsers.map(u => (
                          <tr key={u.id} className="hover:bg-slate-50/70 transition">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={u.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name || 'U')}&background=0c7c72&color=fff&size=40`}
                                  alt={u.name}
                                  className="w-8 h-8 rounded-full object-cover border border-slate-100"
                                />
                                <div>
                                  <p className="font-semibold text-slate-800">{u.name}</p>
                                  <p className="text-[10px] text-slate-400">{u.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="capitalize text-slate-500">{u.provider || 'email'}</span>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                u.role === 'admin' ? 'bg-teal-100 text-teal-800 border border-teal-200/60' : 'bg-slate-100 text-slate-600'
                              }`}>{u.role}</span>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                u.isBanned ? 'bg-rose-50 text-rose-700 border border-rose-200/60' : 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                              }`}>{u.isBanned ? 'Banned' : 'Active'}</span>
                            </td>
                            <td className="py-3 px-4 text-slate-400">
                              {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1">
                                {u.role !== 'admin' && (
                                  <>
                                    {u.isBanned ? (
                                      <button onClick={() => handleUnban(u)} title="Unban user"
                                        className="p-1.5 rounded-lg text-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 transition"
                                      >
                                        <CheckCircle className="w-3.5 h-3.5" />
                                      </button>
                                    ) : (
                                      <button onClick={() => handleBan(u)} title="Ban user"
                                        className="p-1.5 rounded-lg text-amber-500 hover:text-amber-700 hover:bg-amber-50 transition"
                                      >
                                        <Ban className="w-3.5 h-3.5" />
                                      </button>
                                    )}
                                    <button onClick={() => handleDeleteUser(u)} title="Delete user"
                                      className="p-1.5 rounded-lg text-rose-400 hover:text-rose-600 hover:bg-rose-50 transition"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filteredUsers.length === 0 && (
                          <tr><td colSpan={6} className="py-10 text-center text-slate-400">No users found.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ═══ ANALYTICS ═══ */}
              {activeMenu === 'Analytics' && (
                <div className="space-y-6">
                  <h3 className="font-serif text-xl font-bold text-slate-900">Analytics & Reports</h3>

                  {/* KPI cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard icon={DollarSign}   label="Total Revenue"   value={`$${(stats.totalRevenue ?? 0).toLocaleString()}`} />
                    <StatCard icon={ShoppingCart} label="Total Bookings"  value={stats.totalBookings ?? 0} />
                    <StatCard icon={Users}         label="Total Users"     value={stats.totalUsers ?? 0} />
                    <StatCard icon={Package}       label="Total Packages"  value={stats.totalPackages ?? 0} />
                  </div>

                  {/* Full-width revenue chart */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
                    <h4 className="text-sm font-bold text-slate-800 mb-4">Revenue Trend (Last 6 Months)</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={monthlyRevenue} margin={{ top: 8, right: 10, left: -10, bottom: 0 }}>
                          <defs>
                            <linearGradient id="revGrad2" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%"  stopColor="#0c7c72" stopOpacity={0.35} />
                              <stop offset="95%" stopColor="#0c7c72" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={v => `$${v}`} />
                          <Tooltip content={<ChartTooltip />} />
                          <Area type="monotone" dataKey="revenue" stroke="#0c7c72" strokeWidth={3}
                            fillOpacity={1} fill="url(#revGrad2)"
                            dot={{ r: 4, fill: '#0c7c72', stroke: '#fff', strokeWidth: 2 }}
                            activeDot={{ r: 6, fill: '#0a2e28', stroke: '#fff', strokeWidth: 2 }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Summary table */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
                    <h4 className="text-sm font-bold text-slate-800 mb-4">Revenue by Month</h4>
                    <table className="w-full text-left text-xs">
                      <thead className="border-b border-slate-100">
                        <tr className="text-[10px] text-slate-400 uppercase tracking-wider">
                          <th className="pb-2 font-medium">Month</th>
                          <th className="pb-2 font-medium text-right">Revenue</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {monthlyRevenue.map(row => (
                          <tr key={row.month} className="hover:bg-slate-50/70 transition">
                            <td className="py-2.5 font-medium text-slate-700">{row.month}</td>
                            <td className="py-2.5 text-right font-semibold text-teal-700">${row.revenue?.toLocaleString()}</td>
                          </tr>
                        ))}
                        {monthlyRevenue.length === 0 && (
                          <tr><td colSpan={2} className="py-8 text-center text-slate-400">No revenue data yet.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
