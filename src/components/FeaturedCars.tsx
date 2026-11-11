import React, { useState } from 'react';
import { Heart, Gauge, Zap, Cog, ArrowUpRight, Check, SlidersHorizontal } from 'lucide-react';
import { Car, CarCategory } from '../types/car';

interface FeaturedCarsProps {
  cars: Car[];
  wishlistIds: string[];
  onToggleWishlist: (carId: string) => void;
  onSelectCar: (car: Car) => void;
  onBookDrive: (car: Car) => void;
  selectedCategory: CarCategory;
  onSelectCategory: (cat: CarCategory) => void;
}

const CATEGORIES: CarCategory[] = [
  'All',
  'Sports Cars',
  'Supercars',
  'Luxury Cars',
  'Electric Cars',
  'Sedans'
];

export const FeaturedCars: React.FC<FeaturedCarsProps> = ({
  cars,
  wishlistIds,
  onToggleWishlist,
  onSelectCar,
  onBookDrive,
  selectedCategory,
  onSelectCategory
}) => {
  const [showAllModal, setShowAllModal] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'hp-desc'>('featured');

  const carList = cars || [];

  // Filter cars
  const filteredCars = carList.filter((car) => {
    if (!car) return false;
    if (selectedCategory === 'All') return true;
    return car.category === selectedCategory;
  });

  // Sort cars
  const sortedCars = [...filteredCars].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'hp-desc') return b.horsepower - a.horsepower;
    return 0;
  });

  return (
    <section id="featured-cars" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-white/10 pb-8">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-red-500 mb-2">
            Automotive Excellence
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
            FEATURED COLLECTION
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-xl">
            Hand-picked mechanical masterworks. Thoroughly inspected, certified, and primed for immediate delivery.
          </p>
        </div>

        {/* Filter Controls (interactive buttons/tabs permitted) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900/80 border border-white/10 rounded-lg">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-md transition-all ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white shadow-md shadow-red-950/50'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sort strip */}
      <div className="flex items-center justify-between text-xs text-neutral-400 mb-8">
        <span className="font-mono-numbers">
          Showing <strong className="text-white">{sortedCars.length}</strong> mastercraft vehicles
        </span>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-500" />
          <span className="text-neutral-500">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-neutral-900 text-neutral-200 border border-white/10 rounded px-2.5 py-1 text-xs focus:outline-none focus:border-red-500"
          >
            <option value="featured">Featured First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="hp-desc">Horsepower: Highest</option>
          </select>
        </div>
      </div>

      {/* Car Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedCars.map((car) => {
          const isWishlisted = wishlistIds.includes(car.id);

          return (
            <div
              key={car.id}
              className="glass-card-interactive rounded-xl overflow-hidden flex flex-col group relative"
            >
              {/* Image Container with Hover Zoom */}
              <div
                className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900 cursor-pointer"
                onClick={() => onSelectCar(car)}
              >
                <img
                  src={car.image || ''}
                  alt={`${car.year || 2025} ${car.brand || ''} ${car.name || ''}`}
                  className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/30 opacity-80" />

                {/* Status / Category tag (unboxed clean tag) */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[11px] font-bold tracking-widest uppercase text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                    {car.status || 'Showroom'}
                  </span>
                </div>

                {/* Wishlist Heart Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(car.id);
                  }}
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                  className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/80 hover:text-white hover:bg-black/80 transition-all focus:outline-none"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      isWishlisted ? 'fill-red-600 text-red-600' : 'hover:scale-110'
                    }`}
                  />
                </button>

                {/* Quick 0-60 & HP overlay indicator on image bottom */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-neutral-200">
                  <span className="font-semibold text-white drop-shadow-md">
                    {car.horsepower || 600} HP
                  </span>
                  <span className="font-mono-numbers text-neutral-300 drop-shadow-md">
                    {car.acceleration || '3.0 s'}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Brand & Year Header */}
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                    <span className="uppercase tracking-widest font-semibold text-neutral-400">
                      {car.brand}
                    </span>
                    <span className="font-mono-numbers">{car.year}</span>
                  </div>

                  {/* Car Name */}
                  <h3
                    onClick={() => onSelectCar(car)}
                    className="font-display font-bold text-xl text-white group-hover:text-red-400 transition-colors cursor-pointer mb-3"
                  >
                    {car.name}
                  </h3>

                  {/* Clean unboxed metadata with separators (§1.A Zero-Pill) */}
                  <div className="flex items-center gap-2 text-xs text-neutral-400 mb-6 font-mono-numbers">
                    <span>{car.mileage || 'New'}</span>
                    <span aria-hidden="true" className="text-neutral-600">·</span>
                    <span>{car.fuelType || 'Gasoline'}</span>
                    <span aria-hidden="true" className="text-neutral-600">·</span>
                    <span className="truncate max-w-[120px]">{(car.transmission || 'Automatic').split(' ')[0]}</span>
                  </div>
                </div>

                {/* Price & Action Row */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">
                      Acquisition Price
                    </div>
                    <div className="font-mono-numbers text-lg sm:text-xl font-bold text-white tracking-tight">
                      ${(car.price || 0).toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectCar(car)}
                      aria-label={`Inspect ${car.name}`}
                      className="px-3 py-2 text-xs font-semibold rounded border border-white/15 text-neutral-300 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all"
                    >
                      Inspect
                    </button>
                    <button
                      onClick={() => onBookDrive(car)}
                      aria-label={`Book test drive for ${car.name}`}
                      className="px-3 py-2 text-xs font-bold uppercase tracking-wider rounded bg-red-600 hover:bg-red-700 text-white transition-all shadow-md shadow-red-950/40"
                    >
                      Drive
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* View All Cars Button */}
      <div className="mt-14 text-center">
        <button
          onClick={() => {
            onSelectCategory('All');
            const el = document.getElementById('showcase');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-md border border-white/20 hover:border-white/50 bg-neutral-900/80 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-xl cursor-pointer"
        >
          <span>VIEW ALL CARS & FULL SPEC SHEETS</span>
          <ArrowUpRight className="w-4 h-4 text-red-500" />
        </button>
      </div>
    </section>
  );
};
