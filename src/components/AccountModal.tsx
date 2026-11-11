import React, { useState } from 'react';
import { X, User, Shield, KeyRound, Calendar, Car, Mail, CheckCircle2 } from 'lucide-react';
import { TestDriveBooking } from '../types/car';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: TestDriveBooking[];
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  bookings,
}) => {
  const [tab, setTab] = useState<'profile' | 'bookings' | 'procurement'>('profile');
  const [procurementSuccess, setProcurementSuccess] = useState(false);
  const [carRequest, setCarRequest] = useState('');
  const [budget, setBudget] = useState('$250,000+');

  if (!isOpen) return null;

  const handleProcureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!carRequest.trim()) return;
    setProcurementSuccess(true);
    setTimeout(() => {
      setCarRequest('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-neutral-950 border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-8 text-white my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-neutral-900 border border-white/15 flex items-center justify-center text-red-500">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                VIP Client Portal
              </h3>
              <span className="text-xs text-neutral-400">
                Private Collector Tier · Member #ED-8821
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close client portal"
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 p-1 bg-neutral-900/80 rounded-lg border border-white/10 mb-6 text-xs">
          <button
            onClick={() => setTab('profile')}
            className={`flex-1 py-2 font-semibold rounded-md transition-all ${
              tab === 'profile'
                ? 'bg-red-600 text-white shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Collector Dossier
          </button>
          <button
            onClick={() => setTab('bookings')}
            className={`flex-1 py-2 font-semibold rounded-md transition-all ${
              tab === 'bookings'
                ? 'bg-red-600 text-white shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            My Drives ({bookings.length})
          </button>
          <button
            onClick={() => setTab('procurement')}
            className={`flex-1 py-2 font-semibold rounded-md transition-all ${
              tab === 'procurement'
                ? 'bg-red-600 text-white shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Off-Market Sourcing
          </button>
        </div>

        {/* Tab Content */}
        {tab === 'profile' && (
          <div className="space-y-6 text-xs">
            {/* VIP Card Representation */}
            <div className="p-6 rounded-xl bg-gradient-to-tr from-neutral-900 via-neutral-800 to-neutral-950 border border-white/15 relative overflow-hidden shadow-xl">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <span className="font-display font-black text-sm tracking-widest text-white">
                    ELITE DRIVE · VIP PRESTIGE
                  </span>
                  <div className="text-[10px] text-red-500 font-mono tracking-widest mt-0.5">
                    AUTHENTICATED MEMBER
                  </div>
                </div>
                <div className="w-8 h-6 rounded bg-gradient-to-r from-amber-400 to-amber-200 opacity-80" />
              </div>

              <div className="font-mono-numbers text-base sm:text-lg tracking-[0.25em] text-neutral-200 mb-6">
                4820 ···· ···· 8821
              </div>

              <div className="flex justify-between items-end text-neutral-400">
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-neutral-500">
                    Client Name
                  </div>
                  <div className="font-semibold text-white">Sterling Vance</div>
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-neutral-500">
                    Advisory Hub
                  </div>
                  <div className="font-semibold text-white">Beverly Hills & Mayfair</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900/50 border border-white/5 space-y-2">
              <div className="flex justify-between text-neutral-300">
                <span className="text-neutral-500">Dedicated Advisor:</span>
                <span className="font-semibold text-white">Maximilian Von Stauffen</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span className="text-neutral-500">Private Line:</span>
                <span className="font-mono-numbers text-neutral-200">+1 (310) 845-9209</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span className="text-neutral-500">Enclosed Transporter Allocation:</span>
                <span className="text-red-400 font-semibold">Priority 1 Status</span>
              </div>
            </div>
          </div>
        )}

        {tab === 'bookings' && (
          <div className="space-y-3 max-h-80 overflow-y-auto no-scrollbar">
            {bookings.length === 0 ? (
              <div className="text-center py-10 text-neutral-500 text-xs">
                No active test drive appointments currently scheduled.
              </div>
            ) : (
              bookings.map((b) => (
                <div
                  key={b.id}
                  className="p-4 rounded-xl bg-neutral-900/70 border border-white/10 space-y-2 text-xs"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-mono-numbers text-red-500 font-bold">{b.id}</span>
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-neutral-300">
                      Confirmed
                    </span>
                  </div>
                  <div className="font-display font-bold text-sm text-white">
                    {b.carName}
                  </div>
                  <div className="text-neutral-400 flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                      {b.preferredDate} at {b.preferredTime}
                    </span>
                  </div>
                  <div className="text-neutral-500 text-[11px]">
                    Location: {b.location}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {tab === 'procurement' && (
          <div>
            <p className="text-xs text-neutral-400 mb-4">
              Seeking an ultra-rare limited allocation, historic racecar, or bespoke PTS Porsche? Our off-market acquisition desk sources directly from private European and North American collections.
            </p>

            {procurementSuccess ? (
              <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                <span>Procurement brief received. Your personal advisor will review available off-market dossiers.</span>
              </div>
            ) : (
              <form onSubmit={handleProcureSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-neutral-400 tracking-wider mb-1">
                    Requested Vehicle Make, Model or Spec
                  </label>
                  <input
                    type="text"
                    value={carRequest}
                    onChange={(e) => setCarRequest(e.target.value)}
                    placeholder="e.g. 2024 Porsche 911 GT3 RS in PTS Oak Green Metallic"
                    className="w-full bg-neutral-900 border border-white/15 focus:border-red-500 rounded-lg p-3 text-xs text-white focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-neutral-400 tracking-wider mb-1">
                    Target Acquisition Budget
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-neutral-900 border border-white/15 focus:border-red-500 rounded-lg p-3 text-xs text-white focus:outline-none"
                  >
                    <option value="$100,000 - $200,000">$100,000 - $200,000</option>
                    <option value="$200,000 - $350,000">$200,000 - $350,000</option>
                    <option value="$350,000 - $500,000">$350,000 - $500,000</option>
                    <option value="$500,000+ Unlimited Allocation">$500,000+ Unlimited Allocation</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-red-950/60"
                >
                  Submit Confidential Procurement Brief
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
