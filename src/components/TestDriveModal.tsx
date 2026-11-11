import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle2, ShieldCheck, Car as CarIcon } from 'lucide-react';
import { Car, TestDriveBooking } from '../types/car';
import { SHOWROOM_LOCATIONS } from '../data/cars';

interface TestDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCar: Car | null;
  cars: Car[];
  onConfirmBooking: (booking: TestDriveBooking) => void;
}

export const TestDriveModal: React.FC<TestDriveModalProps> = ({
  isOpen,
  onClose,
  selectedCar,
  cars,
  onConfirmBooking,
}) => {
  const [carId, setCarId] = useState(selectedCar?.id || (cars[0]?.id ?? ''));
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('11:00 AM');
  const [location, setLocation] = useState('Beverly Hills');
  const [conciergeDelivery, setConciergeDelivery] = useState(false);
  const [notes, setNotes] = useState('');
  const [licenseAgreed, setLicenseAgreed] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<TestDriveBooking | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validCars = (Array.isArray(cars) ? cars : []).filter((c): c is Car => Boolean(c && c.id));
  const activeCar = validCars.find((c) => c.id === carId) || selectedCar || validCars[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Client name is required.';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Valid private client email is required.';
    }
    if (!phone.trim()) newErrors.phone = 'Contact telephone is required.';
    if (!date) newErrors.date = 'Please select a preferred test drive date.';
    if (!licenseAgreed) newErrors.license = 'Must acknowledge valid high-performance driver license.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const booking: TestDriveBooking = {
      id: `ED-TD-${Math.floor(100000 + Math.random() * 900000)}`,
      carId: activeCar?.id || 'ED-TD-01',
      carName: activeCar ? `${activeCar.brand} ${activeCar.name}` : 'Selected Vehicle',
      clientName: name,
      clientEmail: email,
      clientPhone: phone,
      preferredDate: date,
      preferredTime: time,
      location: conciergeDelivery ? 'Client Private Address (Concierge Trailer)' : location,
      conciergeDelivery,
      notes,
      createdAt: new Date().toISOString()
    };

    onConfirmBooking(booking);
    setConfirmedBooking(booking);
  };

  const handleResetAndClose = () => {
    setConfirmedBooking(null);
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-10 text-white my-8">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          aria-label="Close modal"
          className="absolute top-6 right-6 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedBooking ? (
          /* Confirmation Screen */
          <div className="text-center py-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-500/50 flex items-center justify-center mx-auto mb-6 text-red-500">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400 mb-2">
              Reservation Confirmed
            </div>

            <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-2">
              PRIVATE TEST DRIVE SCHEDULED
            </h3>

            <p className="text-sm text-neutral-400 max-w-md mx-auto mb-8">
              Your appointment dossier has been logged. An Elite Drive Automotive Advisor will contact you within 2 business hours to verify driver license credentials and coordinate private vehicle staging.
            </p>

            <div className="glass-panel rounded-xl p-6 text-left max-w-lg mx-auto mb-8 space-y-3 border border-white/10 font-mono-numbers text-xs">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-neutral-500">Reservation Reference:</span>
                <span className="font-bold text-white text-sm">{confirmedBooking.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-neutral-500">Selected Machine:</span>
                <span className="font-bold text-red-400">{confirmedBooking.carName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-neutral-500">Scheduled Date & Time:</span>
                <span className="text-neutral-200">{confirmedBooking.preferredDate} at {confirmedBooking.preferredTime}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-neutral-500">Location:</span>
                <span className="text-neutral-200">{confirmedBooking.location}</span>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-md transition-all shadow-xl shadow-red-950/60"
            >
              Return to Showroom
            </button>
          </div>
        ) : (
          /* Booking Form */
          <div>
            <div className="mb-8">
              <div className="text-xs font-semibold uppercase tracking-[0.25em] text-red-500 mb-1">
                Exclusive Invitation
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
                BOOK A PRIVATE TEST DRIVE
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Experience precision handling on private circuits or through curated scenic road routes.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Selected Vehicle Selector */}
              <div>
                <label className="block text-xs uppercase font-semibold text-neutral-400 tracking-wider mb-2">
                  Select Machine
                </label>
                <div className="relative">
                  <select
                    value={carId}
                    onChange={(e) => setCarId(e.target.value)}
                    className="w-full bg-neutral-950 border border-white/15 focus:border-red-500 rounded-lg p-3 text-sm text-white focus:outline-none"
                  >
                    {validCars.map((c) => (
                      <option key={c.id} value={c.id} className="bg-neutral-900">
                        {c.brand} {c.name} ({c.horsepower} HP · ${(c.price || 0).toLocaleString()})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Personal Details 2-Column Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-neutral-400 tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sterling Archer"
                    className="w-full bg-neutral-950 border border-white/15 focus:border-red-500 rounded-lg p-3 text-sm text-white placeholder-neutral-600 focus:outline-none"
                  />
                  {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-neutral-400 tracking-wider mb-1.5">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className="w-full bg-neutral-950 border border-white/15 focus:border-red-500 rounded-lg p-3 text-sm text-white placeholder-neutral-600 focus:outline-none"
                  />
                  {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-neutral-400 tracking-wider mb-1.5">
                  Private Client Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@domain.com"
                  className="w-full bg-neutral-950 border border-white/15 focus:border-red-500 rounded-lg p-3 text-sm text-white placeholder-neutral-600 focus:outline-none"
                />
                {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
              </div>

              {/* Scheduling Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-neutral-400 tracking-wider mb-1.5">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    value={date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-neutral-950 border border-white/15 focus:border-red-500 rounded-lg p-3 text-sm text-white focus:outline-none"
                  />
                  {errors.date && <p className="text-[11px] text-red-400 mt-1">{errors.date}</p>}
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-neutral-400 tracking-wider mb-1.5">
                    Time Window
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-neutral-950 border border-white/15 focus:border-red-500 rounded-lg p-3 text-sm text-white focus:outline-none"
                  >
                    <option value="10:00 AM">10:00 AM - Morning Session</option>
                    <option value="11:30 AM">11:30 AM - Midday Session</option>
                    <option value="02:00 PM">02:00 PM - Afternoon Circuit</option>
                    <option value="04:30 PM">04:30 PM - Golden Hour Highway</option>
                    <option value="06:30 PM">06:30 PM - Twilight Track Experience</option>
                  </select>
                </div>
              </div>

              {/* Location or Concierge Delivery */}
              <div>
                <label className="block text-xs uppercase font-semibold text-neutral-400 tracking-wider mb-1.5">
                  Showroom Hub
                </label>
                <select
                  disabled={conciergeDelivery}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-neutral-950 border border-white/15 focus:border-red-500 rounded-lg p-3 text-sm text-white focus:outline-none disabled:opacity-50"
                >
                  {SHOWROOM_LOCATIONS.map((loc) => (
                    <option key={loc.city} value={loc.city}>
                      {loc.city} — {loc.address}
                    </option>
                  ))}
                </select>

                <label className="mt-3 flex items-center gap-2.5 cursor-pointer text-xs text-neutral-300">
                  <input
                    type="checkbox"
                    checked={conciergeDelivery}
                    onChange={(e) => setConciergeDelivery(e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 bg-neutral-950 accent-red-600"
                  />
                  <span>Request White-Glove Enclosed Transporter Delivery to Private Estate</span>
                </label>
              </div>

              {/* Driver License acknowledgment */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-neutral-400">
                  <input
                    type="checkbox"
                    checked={licenseAgreed}
                    onChange={(e) => setLicenseAgreed(e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 bg-neutral-950 accent-red-600 mt-0.5"
                  />
                  <span>
                    I confirm possession of a valid driver's license and understand that an advisor will verify identification prior to vehicle release.
                  </span>
                </label>
                {errors.license && <p className="text-[11px] text-red-400 mt-1">{errors.license}</p>}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-lg transition-all shadow-xl shadow-red-950/60 cursor-pointer"
              >
                Confirm Private Test Drive Reservation
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
