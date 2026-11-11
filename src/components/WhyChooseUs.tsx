import React from 'react';
import {
  ShieldCheck,
  BadgeDollarSign,
  Wrench,
  CreditCard,
  KeyRound,
  Headphones,
  CheckCircle2
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: 'Certified Premium Cars',
      tagline: '150-Point Standard',
      description: 'Every vehicle undergoes rigorous multi-stage mechanical validation, paint depth laser scanning, and complete diagnostic provenance verification.'
    },
    {
      icon: BadgeDollarSign,
      title: 'Transparent Pricing',
      tagline: 'Zero Surcharges',
      description: 'Clear, upfront valuation with zero hidden showroom fees, transparent trade-in assessments, and verified market-indexed pricing.'
    },
    {
      icon: Wrench,
      title: 'Professional Inspection',
      tagline: 'Master Technicians',
      description: 'Maintained and certified exclusively by factory-trained Porsche, AMG, and Ferrari technicians with authentic OEM service archives.'
    },
    {
      icon: CreditCard,
      title: 'Easy Financing',
      tagline: 'Bespoke Capital',
      description: 'Private client portfolio financing, tailored open-ended leasing, balloon structures, and international wire escrow coordination.'
    },
    {
      icon: KeyRound,
      title: 'Test Drive Available',
      tagline: 'Closed-Circuit & Delivery',
      description: 'Experience your chosen vehicle on private handling courses or arrange doorstep delivery via our custom climate-controlled transporter.'
    },
    {
      icon: Headphones,
      title: 'Premium Customer Support',
      tagline: '24/7 Dedicated Concierge',
      description: 'Direct line to your personal automotive advisor for logistics, track day preparations, routine maintenance pickup, and VIP storage.'
    }
  ];

  return (
    <section id="why-us" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-red-500/30 bg-red-950/20 text-xs font-semibold uppercase tracking-[0.2em] text-red-400 mb-3">
          <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
          The Elite Drive Promise
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white mb-4">
          WHY CHOOSE ELITE DRIVE
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
          We operate at the standard of private aviation and bespoke horology. Experience an automotive dealership designed without compromise.
        </p>
      </div>

      {/* 6 Clean Minimalist Luxury Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="glass-panel rounded-xl p-8 border border-white/10 hover:border-red-500/40 transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Subtle metallic corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/5 to-transparent pointer-events-none" />

              {/* Number indicator */}
              <div className="font-mono-numbers text-xs text-neutral-600 mb-6 font-bold tracking-wider">
                0{index + 1}
              </div>

              {/* Icon Container */}
              <div className="w-12 h-12 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center text-red-500 mb-5 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-500 transition-all duration-300">
                <Icon className="w-6 h-6" />
              </div>

              {/* Tagline */}
              <div className="text-[11px] font-mono-numbers uppercase tracking-wider text-neutral-400 mb-1">
                {item.tagline}
              </div>

              {/* Title */}
              <h3 className="font-display font-bold text-xl text-white mb-3 group-hover:text-red-400 transition-colors">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
