import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CATEGORIES_DATA } from '../data/cars';
import { CarCategory } from '../types/car';

interface CarCategoriesProps {
  onSelectCategory: (category: CarCategory) => void;
}

export const CarCategories: React.FC<CarCategoriesProps> = ({ onSelectCategory }) => {
  const handleCategoryClick = (catName: string) => {
    onSelectCategory(catName as CarCategory);
    const target = document.getElementById('featured-cars');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories" className="py-24 bg-neutral-950/60 border-t border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-14">
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-red-500 mb-2">
            Curated Classes
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
              EXPLORE BY CATEGORY
            </h2>
            <p className="text-neutral-400 text-sm max-w-md">
              From open-air naturally aspirated supercars to serene executive gran tourers. Select your preferred automotive discipline.
            </p>
          </div>
        </div>

        {/* Categories Grid (6 Attractive Categories) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES_DATA.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.title)}
              className="group relative h-80 rounded-xl overflow-hidden cursor-pointer border border-white/10 hover:border-red-500/40 transition-all duration-500 bg-neutral-900"
            >
              {/* Cinematic Background Image with Zoom */}
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Dynamic Dark Overlay that intensifies on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-black/30 group-hover:via-neutral-950/80 transition-all duration-300" />

              {/* Red Accent Hairline */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Content Container with upward hover translation */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end transform transition-transform duration-300 group-hover:-translate-y-2">
                {/* Count and accent metadata */}
                <div className="flex items-center justify-between text-xs font-mono-numbers text-neutral-400 mb-2">
                  <span className="text-red-400 font-semibold tracking-wider uppercase text-[11px]">
                    {cat.accent}
                  </span>
                  <span>{cat.count} Vehicles Available</span>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white uppercase tracking-tight group-hover:text-neutral-100 transition-colors">
                  {cat.title}
                </h3>

                {/* Description that reveals smoothly */}
                <p className="text-neutral-400 text-xs sm:text-sm mt-2 line-clamp-2 transition-opacity duration-300">
                  {cat.description}
                </p>

                {/* Interactive Explore Link */}
                <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-500 group-hover:text-red-400 transition-colors">
                  <span>View Inventory</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
