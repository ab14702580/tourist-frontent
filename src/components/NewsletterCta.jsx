import React, { useState } from 'react';
import { Mail, Check, ArrowRight } from 'lucide-react';
import footerColserBg from '../assets/footer-Colser.jpeg';
import { contactService } from '../services';

export default function NewsletterCta() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim()) {
      setLoading(true);
      try {
        await contactService.subscribeNewsletter(email);
        setSubscribed(true);
        setTimeout(() => {
          setEmail('');
          setSubscribed(false);
        }, 3500);
      } catch (err) {
        console.error('Newsletter subscription error:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Banner with footer-Colser.jpeg background */}
        <div 
          className="relative rounded-[2.5rem] overflow-hidden text-white p-8 sm:p-14 md:p-16 text-center shadow-2xl border border-white/20 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(8, 28, 36, 0.68), rgba(8, 28, 36, 0.76)), url(${footerColserBg})`
          }}
        >
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            
            <div className="w-12 h-12 rounded-2xl bg-teal-800/80 border border-teal-400/30 text-teal-300 mx-auto flex items-center justify-center shadow-lg backdrop-blur-sm">
              <Mail className="w-6 h-6 stroke-[1.75]" />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-teal-300 uppercase mb-2 drop-shadow">
                <span className="w-4 h-0.5 bg-teal-300 inline-block"></span>
                STAY INSPIRED
                <span className="w-4 h-0.5 bg-teal-300 inline-block"></span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-md">
                Join Our Travel Community
              </h2>
              <p className="text-teal-50/90 text-xs sm:text-sm mt-3 font-light leading-relaxed max-w-lg mx-auto drop-shadow">
                Get exclusive travel deals, destination guides, and insider tips straight to your inbox.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="relative flex flex-col sm:flex-row items-center bg-white/95 backdrop-blur-md rounded-2xl p-1.5 shadow-2xl ring-1 ring-black/10">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto mt-2 sm:mt-0 px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 active:scale-95 text-white font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 shadow-md shrink-0"
                >
                  <span>{subscribed ? 'Subscribed!' : 'Subscribe'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-teal-100 font-medium drop-shadow">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-teal-300" />
                <span>No spam</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-teal-300" />
                <span>Unsubscribe anytime</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-teal-300" />
                <span>Free travel tips</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
