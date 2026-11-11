import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, Quote } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/cars';

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const current = TESTIMONIALS_DATA[activeIndex];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/10 pb-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-red-500 mb-2">
            Client Voices & Provenance
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
            CUSTOMER EXPERIENCE
          </h2>
          <p className="text-neutral-400 text-sm mt-2 max-w-lg">
            Read testimonials from collectors, drivers, and entrepreneurs who acquired their exceptional machines through Elite Drive.
          </p>
        </div>

        {/* Carousel Navigation */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="p-3 rounded-full border border-white/15 bg-neutral-900 hover:bg-white/10 text-neutral-300 hover:text-white transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            className="p-3 rounded-full border border-white/15 bg-neutral-900 hover:bg-white/10 text-neutral-300 hover:text-white transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Featured Testimonial Card */}
      <div className="glass-panel rounded-2xl p-8 sm:p-14 border border-white/10 relative overflow-hidden shadow-2xl">
        <Quote className="absolute -bottom-10 -right-10 w-64 h-64 text-white/[0.02] pointer-events-none" />

        <div className="max-w-4xl">
          {/* Star Rating */}
          <div className="flex items-center gap-1.5 mb-8">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-red-600 text-red-600" />
            ))}
            <span className="text-xs font-mono-numbers text-neutral-400 ml-2">
              Verified 5.0 Private Acquisition
            </span>
          </div>

          {/* Quote Text */}
          <blockquote className="font-display text-xl sm:text-2xl md:text-3xl text-neutral-100 font-light leading-relaxed mb-10 text-balance">
            "{current.quote}"
          </blockquote>

          {/* Profile & Vehicle Details */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 border-t border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-lg text-white">
                  {current.name}
                </span>
                {current.verifiedOwner && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-400 bg-red-950/40 border border-red-500/30 px-2 py-0.5 rounded">
                    <CheckCircle2 className="w-3 h-3 text-red-500" />
                    Verified Owner
                  </span>
                )}
              </div>
              <div className="text-xs text-neutral-400 mt-1">
                {current.role} · {current.city}
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">
                Acquired Vehicle
              </div>
              <div className="font-display font-semibold text-sm text-neutral-200">
                {current.carPurchased}
              </div>
              <div className="text-[11px] font-mono-numbers text-neutral-400">
                Delivered {current.date}
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="flex items-center gap-2 mt-8">
          {TESTIMONIALS_DATA.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                activeIndex === i ? 'w-8 bg-red-600' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
