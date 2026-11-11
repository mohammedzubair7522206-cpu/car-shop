import React, { useState, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Gauge,
  Zap,
  Activity,
  Flame,
  Volume2,
  Calendar,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Car } from '../types/car';
import { playEngineRev } from '../utils/engineAudio';

interface CarShowcaseProps {
  cars: Car[];
  onBookDrive: (car: Car) => void;
  onOpenDetailModal: (car: Car) => void;
}

export const CarShowcase: React.FC<CarShowcaseProps> = ({
  cars,
  onBookDrive,
  onOpenDetailModal,
}) => {
  const [selectedCarIndex, setSelectedCarIndex] = useState(0);
  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [isRevving, setIsRevving] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  if (!cars || !Array.isArray(cars) || cars.length === 0) {
    return null;
  }

  // Filter out any undefined or null car records
  const validCars = cars.filter((c): c is Car => Boolean(c && c.id));
  if (validCars.length === 0) {
    return null;
  }

  const safeIndex = selectedCarIndex >= 0 && selectedCarIndex < validCars.length ? selectedCarIndex : 0;
  const activeCar = validCars[safeIndex] || validCars[0];

  if (!activeCar) {
    return null;
  }

  const activeColors = (Array.isArray(activeCar.colors) && activeCar.colors.length > 0)
    ? activeCar.colors
    : [{ name: 'Standard Finish', hex: '#c0c0c8' }];

  const handleCarSelect = (index: number) => {
    setSelectedCarIndex(index);
    setActiveColorIndex(0);

    // Scroll selected card into view in horizontal strip
    if (trackRef.current) {
      const cards = trackRef.current.children;
      if (cards[index]) {
        (cards[index] as HTMLElement).scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  };

  const handleNextCar = () => {
    const nextIdx = (safeIndex + 1) % validCars.length;
    handleCarSelect(nextIdx);
  };

  const handlePrevCar = () => {
    const prevIdx = (safeIndex - 1 + validCars.length) % validCars.length;
    handleCarSelect(prevIdx);
  };

  const handleRevEngine = () => {
    setIsRevving(true);
    playEngineRev(activeCar.soundPreset);
    setTimeout(() => {
      setIsRevving(false);
    }, 2400);
  };

  return (
    <section id="showcase" className="py-24 bg-neutral-950 text-white relative overflow-hidden">
      {/* Ambient Radial Spotlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-red-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Showcase Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 border-b border-white/10 pb-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500 mb-2">
              Bespoke Product Presentation
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
              INTERACTIVE SHOWCASE
            </h2>
            <p className="text-neutral-400 text-sm mt-2 max-w-xl">
              Experience dynamic chassis specifications, listen to authentic acoustic combustion, and inspect the engineering of tomorrow.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3">
            <span className="font-mono-numbers text-xs text-neutral-400 mr-2">
              <strong className="text-white">0{safeIndex + 1}</strong> / 0{validCars.length}
            </span>
            <button
              onClick={handlePrevCar}
              aria-label="Previous showcase car"
              className="p-3 rounded-full border border-white/15 bg-neutral-900 hover:bg-white/10 text-neutral-300 hover:text-white transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextCar}
              aria-label="Next showcase car"
              className="p-3 rounded-full border border-white/15 bg-neutral-900 hover:bg-white/10 text-neutral-300 hover:text-white transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Car Strip */}
        <div className="relative mb-12">
          <div
            ref={trackRef}
            className="flex items-center gap-4 overflow-x-auto no-scrollbar scroll-smooth py-3 px-1 snap-x snap-mandatory"
          >
            {validCars.map((car, idx) => {
              if (!car) return null;
              const isCurrent = idx === safeIndex;
              return (
                <div
                  key={car.id || idx}
                  onClick={() => handleCarSelect(idx)}
                  className={`snap-center shrink-0 w-64 sm:w-72 rounded-xl p-3 cursor-pointer transition-all duration-300 ${
                    isCurrent
                      ? 'bg-neutral-900 border-2 border-red-600 shadow-xl shadow-red-950/40 scale-102'
                      : 'bg-neutral-900/50 border border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-neutral-950 mb-3">
                    <img
                      src={car.image || ''}
                      alt={car.name || 'Vehicle'}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-black/70 text-neutral-300">
                      {car.brand || 'Elite Drive'}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-display font-bold text-white truncate max-w-[150px]">
                      {car.name}
                    </span>
                    <span className="font-mono-numbers font-semibold text-neutral-400">
                      {car.horsepower} HP
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Car Cinematic Stage & Deep Presentation View */}
        <div className="glass-panel rounded-2xl p-6 sm:p-10 border border-white/10 shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Visual Showcase & Color Selector (7 cols) */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-neutral-900/90 border border-white/10 shadow-inner group">
                <img
                  src={activeCar.image || ''}
                  alt={`${activeCar.brand || ''} ${activeCar.name || ''}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded bg-black/70 backdrop-blur-md border border-white/15 text-white">
                    {activeCar.status}
                  </span>
                </div>

                {/* Sound Roar Interactive Overlay Button */}
                <button
                  onClick={handleRevEngine}
                  aria-label="Play acoustic engine throttle"
                  className={`absolute top-4 right-4 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md border transition-all cursor-pointer ${
                    isRevving
                      ? 'bg-red-600 border-red-400 text-white shadow-lg shadow-red-900/50 scale-105'
                      : 'bg-black/70 border-white/20 text-neutral-200 hover:bg-red-600 hover:border-red-500 hover:text-white'
                  }`}
                >
                  <Volume2 className={`w-4 h-4 ${isRevving ? 'animate-bounce text-white' : 'text-red-500'}`} />
                  <span>{isRevving ? 'Revving RPM...' : 'Ignition Sound'}</span>
                </button>

                {/* Bottom Model Tag & Price */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs bg-black/60 backdrop-blur-md p-3 rounded-lg border border-white/10">
                  <div>
                    <span className="text-neutral-400 uppercase tracking-widest text-[10px] block">
                      {activeCar.brand} · {activeCar.year}
                    </span>
                    <span className="font-display font-black text-lg text-white">
                      {activeCar.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-neutral-400 uppercase tracking-widest text-[10px] block">
                      MSRP
                    </span>
                    <span className="font-mono-numbers text-base font-bold text-red-400">
                      ${activeCar.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Exterior Color Swatch Palette */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4 p-3 bg-neutral-900/60 rounded-lg border border-white/5">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-semibold text-neutral-400 tracking-wider">
                    Exterior Finish:
                  </span>
                  <span className="text-xs text-white font-medium">
                    {activeColors[activeColorIndex]?.name || 'Standard'}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  {activeColors.map((color, idx) => (
                    <button
                      key={color.name}
                      onClick={() => setActiveColorIndex(idx)}
                      title={color.name}
                      aria-label={`Select ${color.name}`}
                      className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer ${
                        activeColorIndex === idx
                          ? 'border-red-500 scale-120 shadow-md ring-2 ring-red-500/30'
                          : 'border-white/30 hover:scale-110'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: High-Performance Technical Breakdown (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-red-500 mb-1">
                  Engine & Performance Telemetry
                </div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight mb-4">
                  {activeCar.brand} {activeCar.name}
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {activeCar.description}
                </p>

                {/* Key Metrics Grid (Single-Elevation, Tabular Numerals) */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3.5 bg-neutral-900/80 rounded-lg border border-white/5">
                    <div className="text-[10px] uppercase font-semibold tracking-wider text-neutral-500 mb-1 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-red-500" />
                      Horsepower
                    </div>
                    <div className="font-mono-numbers text-xl font-bold text-white">
                      {activeCar.horsepower} <span className="text-xs text-neutral-400 font-normal">HP</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-neutral-900/80 rounded-lg border border-white/5">
                    <div className="text-[10px] uppercase font-semibold tracking-wider text-neutral-500 mb-1 flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5 text-red-500" />
                      0-60 MPH
                    </div>
                    <div className="font-mono-numbers text-xl font-bold text-white">
                      {(activeCar.acceleration || '3.0 s').split(' ')[0]}
                    </div>
                  </div>

                  <div className="p-3.5 bg-neutral-900/80 rounded-lg border border-white/5">
                    <div className="text-[10px] uppercase font-semibold tracking-wider text-neutral-500 mb-1 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-red-500" />
                      Top Speed
                    </div>
                    <div className="font-mono-numbers text-sm sm:text-base font-bold text-white truncate">
                      {(activeCar.topSpeed || '195 mph').split('/')[0]}
                    </div>
                  </div>

                  <div className="p-3.5 bg-neutral-900/80 rounded-lg border border-white/5">
                    <div className="text-[10px] uppercase font-semibold tracking-wider text-neutral-500 mb-1 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-red-500" />
                      Torque
                    </div>
                    <div className="font-mono-numbers text-sm sm:text-base font-bold text-white truncate">
                      {(activeCar.torque || '500 lb-ft').split('/')[0]}
                    </div>
                  </div>
                </div>

                {/* Mechanical Details */}
                <div className="space-y-2 mb-8 text-xs border-t border-b border-white/10 py-4">
                  <div className="flex justify-between py-1 text-neutral-300">
                    <span className="text-neutral-500">Powertrain:</span>
                    <span className="font-medium text-right">{activeCar.engine}</span>
                  </div>
                  <div className="flex justify-between py-1 text-neutral-300">
                    <span className="text-neutral-500">Transmission:</span>
                    <span className="font-medium text-right">{activeCar.transmission}</span>
                  </div>
                  <div className="flex justify-between py-1 text-neutral-300">
                    <span className="text-neutral-500">Drivetrain:</span>
                    <span className="font-medium text-right">{activeCar.drivetrain}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onBookDrive(activeCar)}
                  className="flex-1 py-3.5 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-md transition-all shadow-xl shadow-red-950/50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Test Drive</span>
                </button>
                <button
                  onClick={() => onOpenDetailModal(activeCar)}
                  className="py-3.5 px-5 border border-white/20 hover:border-white/50 bg-neutral-900 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider rounded-md transition-all cursor-pointer"
                >
                  Full Technical Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
