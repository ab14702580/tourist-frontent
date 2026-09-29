import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, Mail, Lock, ShieldCheck, Eye, EyeOff, ArrowRight, Compass, Calendar, Heart
} from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import loginImg from '../assets/loginImg.png';

export default function RegisterPage() {
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Password strength calculator
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: '', color: 'bg-slate-200' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8 && /[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 1, label: 'Weak password', color: 'bg-red-400' };
    if (score === 2) return { score: 2, label: 'Fair password', color: 'bg-amber-400' };
    if (score === 3) return { score: 3, label: 'Good password', color: 'bg-teal-500' };
    return { score: 4, label: 'Strong password', color: 'bg-[#10B981]' };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please check again.');
      return;
    }
    if (!agreeTerms) {
      setErrorMsg('Please agree to the Terms of Service & Privacy Policy.');
      return;
    }
    setErrorMsg('');
    setLoading(true);
    try {
      await register({ fullName, email, password });
      setSubmitted(true);
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const [socialLoading, setSocialLoading] = useState('');

  // Google Sign-In — fires after user picks account, provides an ID token
  const handleGoogleRegister = async (credentialResponse) => {
    setSocialLoading('google');
    setErrorMsg('');
    try {
      await loginWithGoogle(credentialResponse.credential);
      setSubmitted(true);
      setTimeout(() => navigate('/'), 900);
    } catch (err) {
      setErrorMsg(err.message || 'Google sign-up failed.');
    } finally {
      setSocialLoading('');
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#FAFDFD] font-sans selection:bg-teal-700 selection:text-white overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* LEFT COLUMN: SCENIC HERO IMAGE (48% - 50%)                                 */}
      {/* ========================================================================= */}
      <div className="relative w-full lg:w-[48%] min-h-[520px] lg:min-h-screen flex flex-col justify-between p-8 sm:p-12 lg:p-14 text-white overflow-hidden">
        {/* Background Image: assets/loginImg.png */}
        <img 
          src={loginImg} 
          alt="Scenic Destination Sunset" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Directional Contrast Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/30 to-black/65 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent pointer-events-none" />

        {/* --- Top Brand Logo --- */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3 group">
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

        {/* --- Center Hero Content & Value Badges --- */}
        <div className="relative z-10 max-w-lg my-10 lg:my-auto space-y-6">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-teal-300 text-[11px] font-bold uppercase tracking-wider">
            <span className="w-4 h-[2px] bg-teal-400 inline-block" />
            <span>START YOUR JOURNEY</span>
          </div>

          {/* Hero Heading */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.12] drop-shadow-md">
            Create Your Account <br />
            & Start Exploring
          </h1>

          {/* Subtitle */}
          <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-md drop-shadow">
            Join Wanderly and discover destinations, curated experiences, and unforgettable journeys across the globe.
          </p>

          {/* 3 Value Proposition Feature Badges */}
          <div className="pt-2 grid grid-cols-3 gap-3 max-w-md">
            {/* 1. Personalized Recommendations */}
            <div className="flex flex-col items-center text-center space-y-2 group">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-all">
                <Compass className="w-5 h-5 text-teal-200" />
              </div>
              <span className="text-[11px] font-medium text-white/95 leading-tight">
                Personalized<br />Recommendations
              </span>
            </div>

            {/* 2. Easy Booking Management */}
            <div className="flex flex-col items-center text-center space-y-2 group">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-all">
                <Calendar className="w-5 h-5 text-teal-200" />
              </div>
              <span className="text-[11px] font-medium text-white/95 leading-tight">
                Easy Booking<br />Management
              </span>
            </div>

            {/* 3. Exclusive Experiences */}
            <div className="flex flex-col items-center text-center space-y-2 group">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-all">
                <Heart className="w-5 h-5 text-teal-200" />
              </div>
              <span className="text-[11px] font-medium text-white/95 leading-tight">
                Exclusive<br />Experiences
              </span>
            </div>
          </div>
        </div>

        {/* --- Bottom Quote: Your Journey Starts Here ♡ --- */}
        <div className="relative z-10 pt-4 flex items-center justify-between">
          <p 
            className="text-white text-2xl sm:text-3xl font-normal leading-tight drop-shadow-md"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            Your Journey Starts Here ♡
          </p>
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
        <div className="absolute top-6 right-6 sm:top-8 sm:right-12 select-none pointer-events-none -rotate-6 z-10">
          <p 
            className="text-[#0D6B5A] text-2xl sm:text-3xl font-normal leading-none"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            Good Vibes Only ♡
          </p>
        </div>

        {/* --- Ambient Background Vector Art: Vintage Compass Rose & Flight Trails --- */}
        <svg 
          className="absolute -bottom-10 -left-12 sm:bottom-4 sm:left-4 w-72 sm:w-96 h-48 stroke-[#0D6B5A]/20 fill-none pointer-events-none z-0" 
          viewBox="0 0 300 150"
        >
          <path 
            d="M 10 140 C 90 120, 160 50, 280 20" 
            strokeDasharray="4 4" 
            strokeWidth="1.5" 
          />
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
            <line x1="100" y1="5" x2="100" y2="195" strokeWidth="1.2" />
            <line x1="5" y1="100" x2="195" y2="100" strokeWidth="1.2" />
            <line x1="33" y1="33" x2="167" y2="167" strokeWidth="0.6" strokeDasharray="3 3" />
            <line x1="167" y1="33" x2="33" y2="167" strokeWidth="0.6" strokeDasharray="3 3" />
            <text x="100" y="24" textAnchor="middle" fontSize="9" fontWeight="bold" fill="currentColor" stroke="none">N</text>
            <text x="100" y="186" textAnchor="middle" fontSize="9" fontWeight="bold" fill="currentColor" stroke="none">S</text>
            <text x="24" y="103" textAnchor="middle" fontSize="9" fontWeight="bold" fill="currentColor" stroke="none">W</text>
            <text x="176" y="103" textAnchor="middle" fontSize="9" fontWeight="bold" fill="currentColor" stroke="none">E</text>
            <polygon points="100,55 106,94 145,100 106,106 100,145 94,106 55,100 94,94" fill="currentColor" opacity="0.15" />
          </svg>
        </div>

        {/* --- Floating Register Card --- */}
        <div className="relative z-10 w-full max-w-[480px] bg-white rounded-3xl p-7 sm:p-9 shadow-[0_20px_50px_-15px_rgba(11,37,34,0.08)] border border-slate-100 my-8">
          
          {/* Success Banner */}
          {submitted && (
            <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Account created successfully! Welcome to Wanderly.</span>
            </div>
          )}

          {/* Error Banner */}
          {errorMsg && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          {/* Top Card Icon & Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-[#EBF7F4] flex items-center justify-center text-[#115E59] shadow-sm mb-3">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M4 18l5-8 4 6 3-4 4 6H4z" />
              </svg>
            </div>
            
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Create Your Account
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-relaxed">
              Sign up to start planning your next adventure.
            </p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            
            {/* Field 1: Full Name */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input 
                  type="text"
                  required
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700 bg-white transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Field 2: Email Address */}
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
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700 bg-white transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Field 3: Password with Dynamic Strength Meter */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Wanderlust2024!"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 sm:py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700 bg-white transition-all shadow-sm"
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

              {/* 4-Pill Segmented Password Strength Meter */}
              <div className="flex items-center gap-3 mt-2">
                <div className="grid grid-cols-4 gap-1.5 flex-1">
                  {[1, 2, 3, 4].map((index) => (
                    <div 
                      key={index} 
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index <= strength.score ? strength.color : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
                {strength.label && (
                  <span className="text-[11px] font-semibold text-emerald-700 whitespace-nowrap">
                    {strength.label}
                  </span>
                )}
              </div>
            </div>

            {/* Field 4: Confirm Password */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <input 
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="Wanderlust2024!"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 sm:py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700 bg-white transition-all shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Checkbox: Agree to Terms */}
            <div className="flex items-start pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input 
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-slate-300 text-teal-700 focus:ring-teal-600 focus:ring-offset-0 accent-teal-700 cursor-pointer"
                />
                <span className="text-xs text-slate-600 font-medium leading-tight">
                  I agree to the <Link to="#" className="text-teal-700 font-semibold hover:underline">Terms of Service</Link> & <Link to="#" className="text-teal-700 font-semibold hover:underline">Privacy Policy</Link>
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
                <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
                {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </button>
            </div>
          </form>

          {/* Divider: Or continue with */}
          <div className="relative my-5">
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
                  onSuccess={handleGoogleRegister}
                  onError={() => setErrorMsg('Google sign-up was cancelled or failed.')}
                  useOneTap={false}
                  theme="outline"
                  size="large"
                  shape="rectangular"
                  text="signup_with"
                  logo_alignment="left"
                  width="400"
                />
              </div>
            )}
          </div>

          {/* Footer: Sign In Link */}
          <div className="text-center mt-6 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="font-bold text-[#115E59] hover:text-[#0B423A] hover:underline transition-colors"
              >
                Sign In →
              </Link>
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
