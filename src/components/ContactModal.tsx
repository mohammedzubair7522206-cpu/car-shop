import React, { useState } from 'react';
import { X, Phone, Mail, MapPin, Send, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import { SHOWROOM_LOCATIONS } from '../data/cars';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Acquisition Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-neutral-950 border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-10 text-white my-8">
        <button
          onClick={handleResetAndClose}
          aria-label="Close modal"
          className="absolute top-6 right-6 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-10 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-500/50 flex items-center justify-center mx-auto mb-6 text-red-500">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white mb-2">
              DISPATCH DISPATCHED
            </h3>
            <p className="text-sm text-neutral-400 max-w-md mx-auto mb-8">
              Your inquiry has been routed to our senior acquisition team. Expect a response or confidential call within 60 minutes.
            </p>
            <button
              onClick={handleResetAndClose}
              className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-md"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <div className="text-xs font-semibold uppercase tracking-[0.25em] text-red-500 mb-1">
                Private Advisory
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
                CONTACT ELITE DRIVE
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Connect directly with our global showroom hubs in Beverly Hills, London, Stuttgart, or Dubai.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form (7 cols) */}
              <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase font-semibold text-neutral-400 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full bg-neutral-900 border border-white/15 focus:border-red-500 rounded-lg p-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase font-semibold text-neutral-400 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-neutral-900 border border-white/15 focus:border-red-500 rounded-lg p-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-semibold text-neutral-400 mb-1">
                    Private Client Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@domain.com"
                    className="w-full bg-neutral-900 border border-white/15 focus:border-red-500 rounded-lg p-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-semibold text-neutral-400 mb-1">
                    Inquiry Scope
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-neutral-900 border border-white/15 focus:border-red-500 rounded-lg p-2.5 text-xs text-white focus:outline-none"
                  >
                    <option value="Acquisition Inquiry">Vehicle Purchase & Acquisition</option>
                    <option value="Bespoke Leasing">Private Lease & Asset Financing</option>
                    <option value="Trade-in Consignment">Supercar Consignment & Trade-In</option>
                    <option value="Track Day Concierge">Track Experience & Delivery</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-semibold text-neutral-400 mb-1">
                    Confidential Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about the vehicle or transaction you wish to discuss..."
                    className="w-full bg-neutral-900 border border-white/15 focus:border-red-500 rounded-lg p-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-lg transition-all shadow-xl shadow-red-950/50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Confidential Inquiry</span>
                </button>
              </form>

              {/* Showroom Contacts (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-6 space-y-4 text-xs">
                <div>
                  <h4 className="font-display font-bold text-sm text-white mb-3">
                    Direct Client Hotlines
                  </h4>
                  <div className="space-y-3 text-neutral-400">
                    <div className="p-3 rounded-lg bg-neutral-900/60 border border-white/5">
                      <div className="text-white font-semibold">Americas Concierge</div>
                      <div className="font-mono-numbers text-neutral-300 mt-0.5">+1 (310) 845-9200</div>
                      <div className="text-[11px] text-neutral-500">Beverly Hills, CA</div>
                    </div>

                    <div className="p-3 rounded-lg bg-neutral-900/60 border border-white/5">
                      <div className="text-white font-semibold">Europe & UK Desk</div>
                      <div className="font-mono-numbers text-neutral-300 mt-0.5">+44 20 7946 0912</div>
                      <div className="text-[11px] text-neutral-500">Mayfair, London · Stuttgart</div>
                    </div>

                    <div className="p-3 rounded-lg bg-neutral-900/60 border border-white/5">
                      <div className="text-white font-semibold">Middle East Operations</div>
                      <div className="font-mono-numbers text-neutral-300 mt-0.5">+971 4 362 7000</div>
                      <div className="text-[11px] text-neutral-500">DIFC, Dubai</div>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-red-950/20 border border-red-500/20 text-[11px] text-neutral-400">
                  <ShieldCheck className="w-4 h-4 text-red-500 mb-1" />
                  <span>Every inquiry is protected under non-disclosure confidentiality agreements.</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
