import React from 'react';
import { ArrowRight, PhoneCall, Sparkles } from 'lucide-react';

interface CallToActionProps {
  onExploreCollection: () => void;
  onContactUs: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({
  onExploreCollection,
  onContactUs
}) => {
  return (
    <section className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden bg-neutral-950 border-t border-white/5">
      {/* Background Cinematic Visual */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_porsche_cinematic_1794232747528.jpg"
          alt="Cinematic luxury automotive showroom"
          className="w-full h-full object-cover opacity-35 filter brightness-75 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/90" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-neutral-950/50 to-neutral-950" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Subtle Luxury Kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-semibold uppercase tracking-[0.25em] text-neutral-300">
          <span>Private Client Advisory Available 24/7</span>
        </div>

        {/* Main Heading */}
        <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white mb-6 text-balance">
          YOUR NEXT CAR IS WAITING.
        </h2>

        {/* Text */}
        <p className="text-base sm:text-xl font-light text-neutral-300 max-w-2xl mx-auto mb-10 leading-relaxed text-balance">
          Explore our exclusive collection and find the machine that moves you.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onExploreCollection}
            className="w-full sm:w-auto px-8 py-4 rounded-md bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs uppercase tracking-[0.2em] shadow-xl shadow-red-950/60 hover:shadow-red-600/30 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onContactUs}
            className="w-full sm:w-auto px-8 py-4 rounded-md border border-white/20 hover:border-white/50 bg-black/50 hover:bg-white/10 backdrop-blur-md text-white font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-red-500" />
            <span>Contact Us</span>
          </button>
        </div>
      </div>
    </section>
  );
};
