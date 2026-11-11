import React, { useState } from 'react';
import {
  X,
  Gauge,
  Zap,
  Activity,
  Flame,
  Volume2,
  Calendar,
  Heart,
  CheckCircle2,
  ShieldCheck,
  Calculator,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Car } from '../types/car';
import { playEngineRev } from '../utils/engineAudio';

interface CarDetailModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (carId: string) => void;
  onBookDrive: (car: Car) => void;
}

export const CarDetailModal: React.FC<CarDetailModalProps> = ({
  car,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onBookDrive,
}) => {
  const [activeImage, setActiveImage] = useState<string>(car?.image || '');
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string }>(
    car?.colors?.[0] || { name: 'Standard', hex: '#888' }
  );
  const [isRevving, setIsRevving] = useState(false);

  // Finance Calculator state
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTermMonths, setLoanTermMonths] = useState(48);

  React.useEffect(() => {
    if (car) {
      setActiveImage(car.image || '');
      setSelectedColor(car.colors?.[0] || { name: 'Standard', hex: '#888' });
    }
  }, [car]);

  if (!isOpen || !car) return null;

  const interestRate = 5.9; // 5.9% APR for luxury tier
  const downPaymentAmount = ((car.price || 0) * downPaymentPercent) / 100;
  const principalLoan = car.price - downPaymentAmount;
  const monthlyInterestRate = interestRate / 100 / 12;
  const estimatedMonthlyPayment = Math.round(
    (principalLoan * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths))) /
      (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1)
  );

  const handleRev = () => {
    setIsRevving(true);
    playEngineRev(car.soundPreset);
    setTimeout(() => setIsRevving(false), 2400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-neutral-950 border border-white/15 rounded-2xl shadow-2xl text-white my-8 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close vehicle dossier"
          className="absolute top-5 right-5 z-30 p-2.5 rounded-full bg-black/70 border border-white/15 text-neutral-400 hover:text-white hover:bg-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content Container */}
        <div className="max-h-[85vh] overflow-y-auto no-scrollbar">
          {/* Hero Banner / Gallery Image */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-neutral-900 overflow-hidden">
            <img
              src={activeImage}
              alt={car.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-black/40" />

            {/* Left Top Badges */}
            <div className="absolute top-6 left-6 flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded bg-black/70 backdrop-blur-md border border-white/15 text-white">
                {car.brand}
              </span>
              <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded bg-red-600/90 text-white">
                {car.status}
              </span>
            </div>

            {/* Bottom Overlay Title & Quick Specs */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="text-xs font-mono-numbers text-neutral-400 mb-1">
                  Model Year {car.year} · {car.category}
                </div>
                <h2 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-white drop-shadow-lg">
                  {car.name}
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleRev}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider backdrop-blur-md border transition-all cursor-pointer ${
                    isRevving
                      ? 'bg-red-600 border-red-400 text-white shadow-lg'
                      : 'bg-black/70 border-white/20 text-neutral-200 hover:bg-white/10'
                  }`}
                >
                  <Volume2 className={`w-4 h-4 ${isRevving ? 'animate-bounce text-white' : 'text-red-500'}`} />
                  <span>{isRevving ? 'Revving Engine...' : 'Ignition Symphony'}</span>
                </button>

                <button
                  onClick={() => onToggleWishlist(car.id)}
                  aria-label="Save to garage"
                  className="p-2.5 rounded-lg bg-black/70 border border-white/20 text-white hover:bg-white/10 transition-colors"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-600 text-red-600' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Dossier Body */}
          <div className="p-6 sm:p-10 space-y-10">
            {/* Price & Primary Specs Band */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-xl bg-neutral-900/80 border border-white/10">
              <div>
                <div className="text-[10px] uppercase font-semibold text-neutral-500 tracking-wider">
                  Acquisition
                </div>
                <div className="font-mono-numbers text-xl sm:text-2xl font-bold text-white">
                  ${car.price.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-semibold text-neutral-500 tracking-wider">
                  Power Output
                </div>
                <div className="font-mono-numbers text-xl sm:text-2xl font-bold text-red-500">
                  {car.horsepower} HP
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-semibold text-neutral-500 tracking-wider">
                  0-60 MPH
                </div>
                <div className="font-mono-numbers text-xl sm:text-2xl font-bold text-white">
                  {(car.acceleration || '3.0 s').split(' ')[0]}
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-semibold text-neutral-500 tracking-wider">
                  Top Speed
                </div>
                <div className="font-mono-numbers text-lg sm:text-xl font-bold text-white truncate">
                  {(car.topSpeed || '200 mph').split('/')[0]}
                </div>
              </div>
            </div>

            {/* Description & Overview */}
            <div>
              <h3 className="font-display font-bold text-lg uppercase tracking-wider text-white mb-2">
                Executive Overview
              </h3>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                {car.description}
              </p>
            </div>

            {/* Comprehensive Mechanical Dossier Grid */}
            <div>
              <h3 className="font-display font-bold text-lg uppercase tracking-wider text-white mb-4">
                Mechanical Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono-numbers">
                <div className="p-3.5 rounded-lg bg-neutral-900/50 border border-white/5 flex justify-between">
                  <span className="text-neutral-500">Engine / Powertrain:</span>
                  <span className="text-neutral-200 font-semibold text-right">{car.engine}</span>
                </div>
                <div className="p-3.5 rounded-lg bg-neutral-900/50 border border-white/5 flex justify-between">
                  <span className="text-neutral-500">Torque:</span>
                  <span className="text-neutral-200 font-semibold">{car.torque}</span>
                </div>
                <div className="p-3.5 rounded-lg bg-neutral-900/50 border border-white/5 flex justify-between">
                  <span className="text-neutral-500">Transmission:</span>
                  <span className="text-neutral-200 font-semibold text-right">{car.transmission}</span>
                </div>
                <div className="p-3.5 rounded-lg bg-neutral-900/50 border border-white/5 flex justify-between">
                  <span className="text-neutral-500">Drivetrain:</span>
                  <span className="text-neutral-200 font-semibold">{car.drivetrain}</span>
                </div>
                <div className="p-3.5 rounded-lg bg-neutral-900/50 border border-white/5 flex justify-between">
                  <span className="text-neutral-500">Mileage Recorded:</span>
                  <span className="text-neutral-200 font-semibold">{car.mileage}</span>
                </div>
                <div className="p-3.5 rounded-lg bg-neutral-900/50 border border-white/5 flex justify-between">
                  <span className="text-neutral-500">Fuel Requirement:</span>
                  <span className="text-neutral-200 font-semibold">{car.fuelType}</span>
                </div>
              </div>
            </div>

            {/* Interior & Exterior Features Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Exterior Features */}
              <div className="p-6 rounded-xl bg-neutral-900/40 border border-white/5">
                <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                  Exterior Highlights & Aerodynamics
                </h4>
                <ul className="space-y-2.5 text-xs text-neutral-300">
                  {car.exteriorFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interior Features */}
              <div className="p-6 rounded-xl bg-neutral-900/40 border border-white/5">
                <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                  Interior Cockpit & Connectivity
                </h4>
                <ul className="space-y-2.5 text-xs text-neutral-300">
                  {car.interiorFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Interactive Finance Calculator */}
            <div className="p-6 sm:p-8 rounded-xl bg-neutral-900/80 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="w-4 h-4 text-red-500" />
                <h3 className="font-display font-bold text-sm uppercase tracking-wider text-white">
                  Bespoke Lease & Finance Estimator
                </h3>
              </div>
              <p className="text-xs text-neutral-400 mb-6">
                Calculate estimated monthly financing allocations with competitive Tier-1 private bank rates.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end">
                <div>
                  <div className="flex justify-between text-xs text-neutral-400 mb-2">
                    <span>Down Payment:</span>
                    <span className="font-bold text-white font-mono-numbers">
                      {downPaymentPercent}% (${downPaymentAmount.toLocaleString()})
                    </span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={50}
                    step={5}
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full accent-red-600 bg-neutral-950"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-neutral-400 mb-2">
                    <span>Term Duration:</span>
                    <span className="font-bold text-white font-mono-numbers">
                      {loanTermMonths} Months
                    </span>
                  </div>
                  <select
                    value={loanTermMonths}
                    onChange={(e) => setLoanTermMonths(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-white/15 rounded-md p-2.5 text-xs text-white focus:outline-none"
                  >
                    <option value={24}>24 Months (2 Years)</option>
                    <option value={36}>36 Months (3 Years)</option>
                    <option value={48}>48 Months (4 Years)</option>
                    <option value={60}>60 Months (5 Years)</option>
                    <option value={72}>72 Months (6 Years)</option>
                  </select>
                </div>

                <div className="p-4 rounded-lg bg-black/60 border border-white/10 text-right">
                  <div className="text-[10px] uppercase font-semibold text-neutral-500">
                    Est. Monthly Payment
                  </div>
                  <div className="font-mono-numbers text-2xl font-black text-red-500">
                    ${estimatedMonthlyPayment.toLocaleString()}
                    <span className="text-xs text-neutral-400 font-normal"> / mo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions Sticky Container */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
              <div className="text-xs text-neutral-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-red-500" />
                <span>Certified by Elite Drive Master Automotive Technicians</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={onClose}
                  className="px-5 py-3 rounded-lg border border-white/15 text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  Close Dossier
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onBookDrive(car);
                  }}
                  className="flex-1 sm:flex-initial px-8 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-[0.2em] shadow-xl shadow-red-950/60 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Private Test Drive</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
