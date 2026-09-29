import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Mail, Lock, Eye, EyeOff, ArrowRight, User, Compass, Heart
} from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import loginImg from '../assets/loginImg.png';

export default function LoginPage() {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState('');
  const [error, setError] = useState(null);

  const handleSuccess = () => {
    setSubmitted(true);
    setTimeout(() => navigate(from, { replace: true }), 900);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login({ email, password, rememberMe });
      handleSuccess();
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-In — fires after user picks account, provides an ID token
  const handleGoogleLogin = async (credentialResponse) => {
    setSocialLoading('google');
    setError(null);
    try {
      await loginWithGoogle(credentialResponse.credential);
      handleSuccess();
    } catch (err) {
      setError(err.message || 'Google login failed.');
    } finally {
      setSocialLoading('');
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#FAFDFD] font-sans selection:bg-teal-700 selection:text-white overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* LEFT COLUMN: SCENIC HERO IMAGE (48% - 50%)                                 */}
      {/* ========================================================================= */}
      <div className="relative w-full lg:w-[48%] min-h-[500px] lg:min-h-screen flex flex-col justify-between p-8 sm:p-12 lg:p-14 text-white overflow-hidden">
        {/* Background Image: assets/loginImg.png */}
        <img 
          src={loginImg} 
          alt="Scenic Destination Sunset" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Directional Vignette / Contrast Overlays */}
        {/* Darkens top and left for optimal text contrast, while leaving Santorini cliffside & sunset glowing */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* --- Top Brand Logo --- */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3 group">
            {/* Wanderly Mountain Logo Mark */}
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-teal-300 shadow-md group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M4 18l5-8 4 6 3-4 4 6H4z" />
              </svg>
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white block leading-none drop-shadow-sm">
                Wanderly
              </span>
              <span className="text-[8.5px] font-bold uppercase tracking-[0.24em] text-teal-200/90 block mt-1 drop-shadow-sm">
                EXPLORE • DISCOVER • TRAVEL
              </span>
            </div>
          </Link>
        </div>

        {/* --- Center Hero Copy & Benefit Badges --- */}
        <div className="relative z-10 max-w-lg my-12 lg:my-auto space-y-6">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-teal-300 text-[11px] font-bold uppercase tracking-wider">
            <span className="w-4 h-[2px] bg-teal-400 inline-block" />
            <span>WELCOME BACK</span>
          </div>

          {/* Hero Heading */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.12] drop-shadow-md">
            Your Next <br />
            Adventure Awaits
          </h1>

          {/* Subtitle */}
          <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-md drop-shadow">
            Log in to access your bookings, explore new destinations, and continue your journey with Wanderly.
          </p>

          {/* 3 Value Proposition Badges */}
          <div className="pt-2 grid grid-cols-3 gap-3 max-w-md">
            {/* 1. Manage Bookings */}
            <div className="flex flex-col items-center text-center space-y-2 group">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-all">
                <User className="w-5 h-5 text-teal-200" />
              </div>
              <span className="text-[11px] font-medium text-white/95 leading-tight">
                Manage<br />Bookings
              </span>
            </div>

            {/* 2. Explore Destinations */}
            <div className="flex flex-col items-center text-center space-y-2 group">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-all">
                <Compass className="w-5 h-5 text-teal-200" />
              </div>
              <span className="text-[11px] font-medium text-white/95 leading-tight">
                Explore<br />Destinations
              </span>
            </div>

            {/* 3. Personalized Recommendations */}
            <div className="flex flex-col items-center text-center space-y-2 group">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-all">
                <Heart className="w-5 h-5 text-teal-200" />
              </div>
              <span className="text-[11px] font-medium text-white/95 leading-tight">
                Get Personalized<br />Recommendations
              </span>
            </div>
          </div>
        </div>

        {/* --- Bottom Note --- */}
        {/* Note: assets/loginImg.png already features handwritten "Collect Moments Not Things ♡" at bottom-left */}
        <div className="relative z-10 pt-4">
          <span className="text-[10px] text-white/70 font-medium uppercase tracking-wider block">
            Santorini • Greece
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT COLUMN: AMBIENT SOFT MINT WITH FLOATING CARD (52%)                   */}
      {/* ========================================================================= */}
      <div className="relative w-full lg:w-[52%] min-h-screen bg-[#EBF7F4] flex flex-col items-center justify-center p-6 sm:p-10 lg:p-12 overflow-hidden">
        
        {/* --- Top Right Handwritten Script Accent --- */}
        <div className="absolute top-6 right-6 sm:top-10 sm:right-12 select-none pointer-events-none -rotate-6 z-10">
          <p 
            className="text-[#0D6B5A] text-2xl sm:text-3xl font-normal leading-none"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            Good Vibes Only ♡
          </p>
        </div>

        {/* --- Ambient Background Vector Art: Vintage Compass Rose & Flight Trails --- */}
        {/* Flight path curve with mini plane */}
        <svg 
          className="absolute -bottom-10 -left-12 sm:bottom-4 sm:left-4 w-72 sm:w-96 h-48 stroke-[#0D6B5A]/20 fill-none pointer-events-none z-0" 
          viewBox="0 0 300 150"
        >
          <path 
            d="M 10 140 C 90 120, 160 50, 280 20" 
            strokeDasharray="4 4" 
            strokeWidth="1.5" 
          />
          {/* Mini Airplane icon on the trail */}
          <polygon 
            points="280,20 270,16 274,23" 
            fill="#0D6B5A" 
            opacity="0.35" 
          />
        </svg>

        {/* Vintage Compass Rose Vector in Bottom Right */}
        <div className="absolute -bottom-16 -right-16 sm:-bottom-20 sm:-right-20 w-80 h-80 sm:w-96 sm:h-96 pointer-events-none select-none opacity-25 z-0 text-[#0D6B5A]">
          <svg viewBox="0 0 200 200" className="w-full h-full stroke-current fill-none stroke-[0.8]">
            <circle cx="100" cy="100" r="90" strokeDasharray="2 3" />
            <circle cx="100" cy="100" r="70" />
            <circle cx="100" cy="100" r="45" />
            {/* Compass Axes */}
            <line x1="100" y1="5" x2="100" y2="195" strokeWidth="1.2" />
            <line x1="5" y1="100" x2="195" y2="100" strokeWidth="1.2" />
            <line x1="33" y1="33" x2="167" y2="167" strokeWidth="0.6" strokeDasharray="3 3" />
            <line x1="167" y1="33" x2="33" y2="167" strokeWidth="0.6" strokeDasharray="3 3" />
            {/* Cardinal Letters */}
            <text x="100" y="24" textAnchor="middle" fontSize="9" fontWeight="bold" fill="currentColor" stroke="none">N</text>
            <text x="100" y="186" textAnchor="middle" fontSize="9" fontWeight="bold" fill="currentColor" stroke="none">S</text>
            <text x="24" y="103" textAnchor="middle" fontSize="9" fontWeight="bold" fill="currentColor" stroke="none">W</text>
            <text x="176" y="103" textAnchor="middle" fontSize="9" fontWeight="bold" fill="currentColor" stroke="none">E</text>
            {/* Center Star Points */}
            <polygon points="100,55 106,94 145,100 106,106 100,145 94,106 55,100 94,94" fill="currentColor" opacity="0.15" />
          </svg>
        </div>

        {/* --- Floating Login Card --- */}
        <div className="relative z-10 w-full max-w-[460px] bg-white rounded-3xl p-7 sm:p-10 shadow-[0_20px_50px_-15px_rgba(11,37,34,0.08)] border border-slate-100">
          
          {/* Success Banner */}
          {submitted && (
            <div className="mb-6 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Login successful! Redirecting to your dashboard...</span>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Top Card Icon & Header */}
          <div className="text-center mb-7">
            {/* Wanderly Mountain Brand Mark */}
            <div className="w-12 h-12 mx-auto rounded-2xl bg-[#EBF7F4] flex items-center justify-center text-[#115E59] shadow-sm mb-3">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M4 18l5-8 4 6 3-4 4 6H4z" />
              </svg>
            </div>
            
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1.5 leading-relaxed">
              Please enter your details to log in to your account.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Address Field */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input 
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700 bg-white transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <Link 
                  to="#" 
                  className="text-[11px] font-semibold text-teal-700 hover:text-teal-800 hover:underline transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700 bg-white transition-all shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Keep me logged in Checkbox */}
            <div className="flex items-center pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input 
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-teal-700 focus:ring-teal-600 focus:ring-offset-0 accent-teal-700 cursor-pointer"
                />
                <span className="text-xs text-slate-600 font-medium">
                  Keep me logged in
                </span>
              </label>
            </div>

            {/* Primary Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-full bg-[#115E59] hover:bg-[#0B423A] active:scale-[0.99] text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-teal-900/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span>{loading ? 'Logging in...' : 'Log In'}</span>
                {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </button>
            </div>
          </form>

          {/* Divider: Or continue with */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Sign-in Buttons */}
          <div className="flex justify-center">
            {/* Google — uses GoogleLogin component which returns a proper ID token */}
            {socialLoading === 'google' ? (
              <div className="w-full py-2.5 px-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">
                <span className="w-4 h-4 border-2 border-slate-300 border-t-blue-500 rounded-full animate-spin" />
                <span>Connecting to Google...</span>
              </div>
            ) : (
              <div className="w-full [&>div]:w-full [&>div>div]:w-full [&>div>div>div]:w-full [&_iframe]:w-full">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => setError('Google login was cancelled or failed.')}
                  useOneTap={false}
                  theme="outline"
                  size="large"
                  shape="rectangular"
                  text="continue_with"
                  logo_alignment="left"
                  width="400"
                />
              </div>
            )}
          </div>

          {/* Footer: Sign Up Link */}
          <div className="text-center mt-7 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className="font-bold text-[#115E59] hover:text-[#0B423A] hover:underline transition-colors"
              >
                Sign Up →
              </Link>
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
