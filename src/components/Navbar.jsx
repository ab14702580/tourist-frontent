import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, Heart, Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onOpenSearch }) {
  const { user, isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const favoritesCount = 3;
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop || 0;
      setIsScrolled(scrollPos > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Destinations", href: "/destinations" },
    { name: "Packages", href: "/packages" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" }
  ];

  // Pages where Hero section has a full background image
  const currentPath = location?.pathname || '/';
  const hasHeroImage = currentPath === '/' || currentPath === '/destinations' || currentPath === '/about' || currentPath === '/blog' || currentPath === '/contact';

  // If page has hero background image: transparent on top, transitions to solid after 50px scroll
  // If page does NOT have full hero background image: always has solid scroll background
  const shouldShowSolidBg = isScrolled || mobileMenuOpen || !hasHeroImage;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        shouldShowSolidBg 
          ? "bg-[#091b22]/90 backdrop-blur-md border-b border-white/10 shadow-sm" 
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-9 h-9 flex items-center justify-center text-teal-400 group-hover:scale-105 transition-transform">
              <svg className="w-8 h-8 fill-none stroke-teal-400 stroke-[2.2]" viewBox="0 0 32 32">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 24L12 8L18 19L22 13L28 24H4Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8L15 13.5M22 13L24 16.5" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-2xl font-bold tracking-tight text-white leading-none">
                Wanderly
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors relative py-1 ${
                    isActive 
                      ? "text-teal-300 font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-teal-400" 
                      : "text-white/80 hover:text-white"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={onOpenSearch}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              title="Search destinations"
            >
              <Search className="w-5 h-5 stroke-[1.8]" />
            </button>
            <button 
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors relative"
              title="Saved items"
            >
              <Heart className="w-5 h-5 stroke-[1.8]" />
              {favoritesCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-teal-400 rounded-full ring-2 ring-slate-900"></span>
              )}
            </button>
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
                >
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full object-cover" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center text-xs font-bold">
                      {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                  )}
                  <span className="text-xs font-semibold text-white max-w-[100px] truncate">{user?.name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="p-2 text-white/80 hover:text-rose-400 hover:bg-white/10 rounded-full transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Link to={'/login'}
                  className="text-sm font-medium text-white hover:bg-white/10 px-5 py-2 rounded-full border border-white/40 transition-all duration-200"
                >
                  Sign In
                </Link>
                
                <Link to={'/register'}
                  className="text-sm font-semibold text-white bg-[#0c7c72] hover:bg-[#0a6b62] active:scale-95 px-6 py-2 rounded-full transition-all duration-200 shadow-md hover:shadow-teal-500/20"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-2">
            <button 
              onClick={onOpenSearch} 
              className="p-2 text-white/80 hover:text-white"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-teal-300"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a1c24]/98 border-b border-white/10 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-teal-900/60 text-teal-300 font-semibold border-l-4 border-teal-400" 
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
          
          <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
            {isAuthenticated ? (
              <div className="space-y-3">
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center text-sm font-bold">
                      {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <span className="block text-sm font-semibold text-white truncate">{user?.name}</span>
                    <span className="block text-xs text-teal-300 truncate">{user?.email}</span>
                  </div>
                  <User className="w-4 h-4 text-teal-400 shrink-0" />
                </Link>
                <button
                  onClick={() => { setMobileMenuOpen(false); logout(); }}
                  className="w-full py-2.5 text-center text-sm font-medium text-rose-300 border border-rose-500/30 hover:bg-rose-500/10 rounded-full transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <>
                <Link 
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-sm font-medium text-white border border-white/40 rounded-full hover:bg-white/10 transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-sm font-semibold text-white bg-[#0c7c72] hover:bg-[#0a6b62] rounded-full shadow-md transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
