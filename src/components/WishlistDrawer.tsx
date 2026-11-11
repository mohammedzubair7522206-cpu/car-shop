import React from 'react';
import { X, Trash2, ArrowRight, Calendar, Heart, Shield } from 'lucide-react';
import { Car } from '../types/car';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedCars: Car[];
  onRemoveFromWishlist: (carId: string) => void;
  onSelectCar: (car: Car) => void;
  onBookDrive: (car: Car) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  savedCars,
  onRemoveFromWishlist,
  onSelectCar,
  onBookDrive,
}) => {
  if (!isOpen) return null;

  const totalPortfolioValue = savedCars.reduce((acc, car) => acc + car.price, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-neutral-950 border-l border-white/10 text-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-950/60 border border-red-500/40 flex items-center justify-center text-red-500">
                <Heart className="w-4 h-4 fill-red-500" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-white">
                  Private Garage Wishlist
                </h3>
                <span className="text-xs text-neutral-400 font-mono-numbers">
                  {savedCars.length} {savedCars.length === 1 ? 'vehicle' : 'vehicles'} selected
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close wishlist drawer"
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cars List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
            {savedCars.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-neutral-500">
                  <Heart className="w-7 h-7" />
                </div>
                <h4 className="font-display font-bold text-base text-white mb-1">
                  Your VIP Garage is Empty
                </h4>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto mb-6">
                  Click the heart icon on any vehicle to add it to your private portfolio.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Browse Collection
                </button>
              </div>
            ) : (
              (savedCars || []).filter(Boolean).map((car) => (
                <div
                  key={car.id}
                  className="glass-panel rounded-xl p-4 border border-white/10 flex gap-4 relative group"
                >
                  <img
                    src={car.image || ''}
                    alt={car.name || 'Vehicle'}
                    className="w-24 h-20 object-cover rounded-lg bg-neutral-900 shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                        {car.brand || 'Elite Drive'} · {car.year || 2025}
                      </div>
                      <h4
                        onClick={() => {
                          onClose();
                          onSelectCar(car);
                        }}
                        className="font-display font-bold text-sm text-white truncate cursor-pointer hover:text-red-400 transition-colors"
                      >
                        {car.name || 'Vehicle'}
                      </h4>
                      <div className="font-mono-numbers text-xs font-bold text-red-400 mt-1">
                        ${(car.price || 0).toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => {
                          onClose();
                          onBookDrive(car);
                        }}
                        className="text-[11px] font-bold text-white bg-red-600 hover:bg-red-700 px-2.5 py-1 rounded transition-colors"
                      >
                        Book Drive
                      </button>
                      <button
                        onClick={() => onRemoveFromWishlist(car.id)}
                        aria-label="Remove item"
                        className="p-1 text-neutral-500 hover:text-red-400 transition-colors ml-auto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Portfolio Total */}
          {savedCars.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-neutral-900/60 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-400 uppercase tracking-wider font-semibold">
                  Portfolio Valuation
                </span>
                <span className="font-mono-numbers text-lg font-bold text-white">
                  ${totalPortfolioValue.toLocaleString()}
                </span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onBookDrive(savedCars[0]);
                }}
                className="w-full py-3.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-lg transition-all shadow-xl shadow-red-950/60 cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Inquire Private Multi-Drive</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
