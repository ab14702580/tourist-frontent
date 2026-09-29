import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';
import ItineraryModal from '../components/ItineraryModal';
import SearchModal from '../components/SearchModal';
import PageLoader from '../components/PageLoader';

export default function MainLayout() {
  const navigate = useNavigate();

  const [selectedItemForBooking, setSelectedItemForBooking] = useState(null);
  const [isItineraryOpen, setIsItineraryOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Scroll-to-top is handled globally by RootLayout in routes.jsx

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => { setToastMessage(null); }, 3500);
  };

  const handleBookingConfirm = () => {
    showToast("Booking request sent! Our travel specialist will be in touch.");
  };

  const handleSearchSubmit = (searchParams) => {
    showToast(`Searching trips in ${searchParams.destination || 'all destinations'} for ${searchParams.travelers}`);
    navigate('/destinations');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans selection:bg-teal-700 selection:text-white">
      <PageLoader />

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="alert bg-teal-800 text-white shadow-xl rounded-2xl border border-teal-700 py-3 px-5 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
            <span className="text-xs font-medium">{toastMessage}</span>
          </div>
        </div>
      )}

      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      <main className="flex-grow">
        <Outlet context={{
          onBook: (item) => setSelectedItemForBooking(item),
          onOpenItinerary: () => setIsItineraryOpen(true),
          onOpenSearch: () => setIsSearchOpen(true),
          onToast: showToast,
          handleSearchSubmit,
        }} />
      </main>

      <Footer />

      <BookingModal
        item={selectedItemForBooking}
        onClose={() => setSelectedItemForBooking(null)}
        onConfirm={handleBookingConfirm}
      />
      <ItineraryModal isOpen={isItineraryOpen} onClose={() => setIsItineraryOpen(false)} />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectDestination={(item) => setSelectedItemForBooking(item)}
      />
    </div>
  );
}
