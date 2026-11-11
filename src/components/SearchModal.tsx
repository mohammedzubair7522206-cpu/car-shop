import React, { useState } from 'react';
import { X, Search, SlidersHorizontal, ArrowRight, Gauge } from 'lucide-react';
import { Car, CarCategory } from '../types/car';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  cars: Car[];
  onSelectCar: (car: Car) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  cars,
  onSelectCar,
}) => {
  const [query, setQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [maxPrice, setMaxPrice] = useState(300000);
  const [selectedFuel, setSelectedFuel] = useState('All');

  if (!isOpen) return null;

  const brands = ['All', ...Array.from(new Set(cars.map((c) => c.brand)))];

  const results = cars.filter((car) => {
    const matchesQuery =
      car.name.toLowerCase().includes(query.toLowerCase()) ||
      car.brand.toLowerCase().includes(query.toLowerCase()) ||
      car.engine.toLowerCase().includes(query.toLowerCase()) ||
      car.category.toLowerCase().includes(query.toLowerCase());

    const matchesBrand = selectedBrand === 'All' || car.brand === selectedBrand;
    const matchesPrice = car.price <= maxPrice;
    const matchesFuel = selectedFuel === 'All' || car.fuelType === selectedFuel;

    return matchesQuery && matchesBrand && matchesPrice && matchesFuel;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-neutral-950 border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-8 text-white my-8">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-red-500" />
            <h3 className="font-display font-bold text-lg text-white">
              Search Vehicle Inventory
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close search"
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by model, brand, engine (e.g., Porsche 911, V10, M4, Twin-Turbo)..."
            className="w-full bg-neutral-900 border border-white/15 focus:border-red-500 rounded-xl py-3.5 pl-4 pr-10 text-sm text-white placeholder-neutral-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-3.5 text-neutral-400 hover:text-white text-xs"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Strip */}
        <div className="space-y-4 mb-6 p-4 rounded-xl bg-neutral-900/50 border border-white/5 text-xs">
          {/* Brand Row */}
          <div>
            <span className="text-neutral-400 uppercase tracking-wider font-semibold block mb-2">
              Brand:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {brands.map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBrand(b)}
                  className={`px-2.5 py-1 rounded text-xs transition-colors ${
                    selectedBrand === b
                      ? 'bg-red-600 text-white font-bold'
                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Price & Fuel Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/5">
            <div>
              <div className="flex justify-between text-neutral-400 mb-1">
                <span>Maximum Price:</span>
                <span className="font-mono-numbers text-white font-bold">
                  ${maxPrice.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={80000}
                max={300000}
                step={10000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-red-600"
              />
            </div>

            <div>
              <span className="text-neutral-400 uppercase tracking-wider font-semibold block mb-1">
                Powertrain:
              </span>
              <div className="flex gap-2">
                {['All', 'Gasoline', 'Hybrid', 'Electric'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFuel(f)}
                    className={`px-2.5 py-1 rounded text-xs transition-colors ${
                      selectedFuel === f
                        ? 'bg-red-600 text-white font-bold'
                        : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="text-xs text-neutral-400 mb-4 font-mono-numbers">
          Found <strong className="text-white">{results.length}</strong> matching vehicles
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto space-y-3 no-scrollbar">
          {results.length === 0 ? (
            <div className="text-center py-10 text-neutral-500 text-sm">
              No matching vehicles found for these specifications.
            </div>
          ) : (
            results.map((car) => (
              <div
                key={car.id}
                onClick={() => {
                  onClose();
                  onSelectCar(car);
                }}
                className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-900/60 hover:bg-neutral-900 border border-white/5 hover:border-red-500/30 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={car.image || ''}
                    alt={car.name || 'Vehicle'}
                    className="w-16 h-12 object-cover rounded-lg bg-neutral-950 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="text-[10px] uppercase font-semibold text-neutral-400">
                      {car.brand || 'Elite Drive'} · {car.year || 2025}
                    </div>
                    <div className="font-display font-bold text-sm text-white group-hover:text-red-400 transition-colors">
                      {car.name || 'Vehicle'}
                    </div>
                    <div className="text-[11px] text-neutral-500 font-mono-numbers">
                      {car.horsepower || 500} HP · {car.engine || 'Engine'}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono-numbers text-sm font-bold text-white">
                    ${(car.price || 0).toLocaleString()}
                  </div>
                  <div className="text-[10px] text-red-500 font-semibold group-hover:underline flex items-center justify-end gap-1">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
