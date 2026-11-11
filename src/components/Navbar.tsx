import React, { useState, useEffect } from 'react';
import { Search, Heart, User as UserIcon, Menu, X, Shield, PhoneCall, Box, ShieldAlert } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';
import { User } from '../types/database';

interface NavbarProps {
  wishlistCount: number;
  currentUser: User | null;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  onOpenGarage: () => void;
  onOpenAdmin: () => void;
  onBookTestDrive: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  wishlistCount,
  currentUser,
  onOpenWishlist,
  onOpenSearch,
  onOpenAccount,
  onOpenGarage,
  onOpenAdmin,
  onBookTestDrive,
  onNavigateSection
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'Cars', id: 'featured-cars' },
    { label: 'Categories', id: 'categories' },
    { label: 'Showcase', id: 'showcase' },
    { label: 'Why Choose Us', id: 'why-us' },
    { label: 'Contact', id: 'footer' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-neutral-950/85 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl shadow-black/80'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Single element brand wordmark with luxury styling */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0 focus:outline-none"
            aria-label="Elite Drive Home"
          >
            <div className="w-8 h-8 rounded-sm bg-neutral-900 border border-white/20 flex items-center justify-center relative overflow-hidden group-hover:border-red-500/50 transition-colors">
              <span className="font-display font-black text-sm tracking-widest text-white">ED</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg tracking-[0.2em] text-white group-hover:text-neutral-200 transition-colors">
                ELITE<span className="text-red-600 font-black">.</span>DRIVE
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="hover:text-white transition-colors relative py-1 focus:outline-none focus-visible:text-white cursor-pointer"
              >
                {item.label}
              </button>
            ))}

            {/* Interactive 3D Garage Nav Button */}
            <button
              onClick={onOpenGarage}
              className="text-red-400 hover:text-white transition-colors flex items-center gap-1.5 font-bold cursor-pointer"
            >
              <Box className="w-3.5 h-3.5 text-red-500" />
              <span>3D Garage</span>
            </button>

            {/* Admin Console Nav Link (Visible when role is Admin) */}
            {currentUser?.role === 'Admin' && (
              <button
                onClick={onOpenAdmin}
                className="text-amber-400 hover:text-white transition-colors flex items-center gap-1 font-bold cursor-pointer bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30"
              >
                <Shield className="w-3 h-3 text-amber-500" />
                <span>Admin</span>
              </button>
            )}
          </nav>

          {/* Zone 3: Interactive Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* PWA Install Button */}
            <PWAInstallButton />

            {/* Search */}
            <button
              onClick={onOpenSearch}
              aria-label="Search collection"
              className="p-2 sm:p-2.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-all focus:outline-none cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist with count badge */}
            <button
              onClick={onOpenWishlist}
              aria-label={`Wishlist (${wishlistCount} saved)`}
              className="p-2 sm:p-2.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-all relative focus:outline-none cursor-pointer"
            >
              <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'text-red-500 fill-red-500/30' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center font-mono-numbers">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Client Account */}
            <button
              onClick={onOpenAccount}
              aria-label="Client Account"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 text-xs font-medium border border-white/10 transition-all focus:outline-none cursor-pointer"
            >
              <UserIcon className="w-3.5 h-3.5 text-red-500" />
              <span>{currentUser ? currentUser.name.split(' ')[0] : 'Sign In'}</span>
            </button>

            {/* Book Test Drive CTA */}
            <button
              onClick={onBookTestDrive}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-md transition-all duration-200 shadow-lg shadow-red-950/40 focus:outline-none focus:ring-2 focus:ring-red-500/50 whitespace-nowrap cursor-pointer"
            >
              Test Drive
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="lg:hidden p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 transition-all animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-left py-2 text-sm font-semibold uppercase tracking-widest text-neutral-300 hover:text-red-500 transition-colors border-b border-white/5"
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenGarage();
              }}
              className="text-left py-2 text-sm font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors border-b border-white/5 flex items-center gap-2"
            >
              <Box className="w-4 h-4 text-red-500" />
              <span>Enter 3D Garage</span>
            </button>

            {currentUser?.role === 'Admin' && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="text-left py-2 text-sm font-bold uppercase tracking-widest text-amber-400 hover:text-amber-300 transition-colors border-b border-white/5 flex items-center gap-2"
              >
                <Shield className="w-4 h-4 text-amber-500" />
                <span>Admin Console</span>
              </button>
            )}

            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAccount();
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-white/15 text-xs font-medium text-neutral-200 hover:bg-white/5"
              >
                <UserIcon className="w-4 h-4 text-red-500" />
                {currentUser ? `Account: ${currentUser.name}` : 'Sign In / Register'}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookTestDrive();
                }}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-red-600 hover:bg-red-700 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-950/50"
              >
                <PhoneCall className="w-4 h-4" />
                Book Private Test Drive
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
