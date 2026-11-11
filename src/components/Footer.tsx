import React, { useState } from 'react';
import { Mail, Check, ArrowRight, MapPin, Phone, Clock, Instagram, Youtube, Twitter, Linkedin } from 'lucide-react';
import { SHOWROOM_LOCATIONS } from '../data/cars';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenContactModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection, onOpenContactModal }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please provide a valid private client email.');
      return;
    }
    setError('');
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer id="footer" className="bg-black text-neutral-400 border-t border-white/10 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-sm bg-neutral-900 border border-white/20 flex items-center justify-center relative overflow-hidden">
                  <span className="font-display font-black text-sm tracking-widest text-white">ED</span>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
                </div>
                <span className="font-display font-bold text-xl tracking-[0.2em] text-white">
                  ELITE<span className="text-red-600 font-black">.</span>DRIVE
                </span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">
                Curating the world’s most extraordinary automotive performance machines. Every vehicle is authenticated, precision-inspected, and delivered with uncompromising white-glove provenance.
              </p>

              <div className="text-xs text-neutral-500 font-mono-numbers">
                Tagline: <span className="text-neutral-300 italic">"Find Your Next Drive."</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-8">
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-red-500 hover:bg-neutral-800 transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#youtube"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-red-500 hover:bg-neutral-800 transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-red-500 hover:bg-neutral-800 transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#linkedin"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-red-500 hover:bg-neutral-800 transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-5">
              Navigation
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <button
                  onClick={() => onNavigateSection('hero')}
                  className="hover:text-red-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('featured-cars')}
                  className="hover:text-red-400 transition-colors"
                >
                  Cars
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('categories')}
                  className="hover:text-red-400 transition-colors"
                >
                  Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('showcase')}
                  className="hover:text-red-400 transition-colors"
                >
                  Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('why-us')}
                  className="hover:text-red-400 transition-colors"
                >
                  Services & Why Us
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContactModal}
                  className="hover:text-red-400 transition-colors"
                >
                  Contact Concierge
                </button>
              </li>
            </ul>
          </div>

          {/* Showroom Global Flagships (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-5">
              Global Showrooms
            </h4>
            <div className="space-y-4 text-xs">
              {SHOWROOM_LOCATIONS.slice(0, 3).map((loc) => (
                <div key={loc.city} className="border-l border-white/10 pl-3">
                  <div className="text-white font-semibold flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    <span>{loc.city}</span>
                  </div>
                  <div className="text-neutral-500 text-[11px] mt-0.5">{loc.address}</div>
                  <div className="font-mono-numbers text-neutral-400 text-[11px] mt-0.5">{loc.phone}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Subscription (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-5">
              Private Release Bulletin
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed mb-4">
              Receive confidential allocations, off-market supercar previews, and private track day invitations.
            </p>

            {subscribed ? (
              <div className="p-3.5 rounded-lg bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-red-500 shrink-0" />
                <span>You have been registered for private dispatch notices.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter private client email"
                    className="w-full bg-neutral-900 border border-white/15 focus:border-red-500 rounded-md py-2.5 px-3.5 text-xs text-white placeholder-neutral-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to bulletin"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-red-600 hover:bg-red-700 text-white rounded text-xs flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                {error && <p className="text-[11px] text-red-400">{error}</p>}
                <div className="text-[10px] text-neutral-500">
                  Strict client confidentiality guaranteed. No public marketing.
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} ELITE DRIVE Automobili S.p.A. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-neutral-400 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-neutral-400 transition-colors">Terms of Allocation</a>
            <a href="#escrow" className="hover:text-neutral-400 transition-colors">Escrow Verification</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
