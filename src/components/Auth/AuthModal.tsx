import React, { useState } from 'react';
import { X, User as UserIcon, Lock, Mail, Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import { User, UserRole } from '../../types/database';
import { DatabaseService } from '../../services/db';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onLoginSuccess: (user: User) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
  onLogout
}) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot' | 'reset-sent'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('Customer');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const users = await DatabaseService.getUsers();
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user || user.password !== password) {
      setError('Invalid credentials. Check email and password.');
      return;
    }

    await DatabaseService.setCurrentUser(user);
    onLoginSuccess(user);
    onClose();
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }

    const users = await DatabaseService.getUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      setError('An account with this email address already exists.');
      return;
    }

    const newUser: User = {
      id: `user_${Date.now()}`,
      name,
      email,
      password,
      role,
      vipTier: role === 'Admin' ? 'Black Card / Private Collector' : 'Standard',
      createdAt: new Date().toISOString()
    };

    await DatabaseService.saveUser(newUser);
    await DatabaseService.setCurrentUser(newUser);
    onLoginSuccess(newUser);
    onClose();
  };

  const handleQuickLogin = async (asRole: UserRole) => {
    const users = await DatabaseService.getUsers();
    const targetUser = users.find((u) => u.role === asRole) || users[0];
    await DatabaseService.setCurrentUser(targetUser);
    onLoginSuccess(targetUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-neutral-950 border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-8 text-white my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {currentUser ? (
          /* Profile & Sign Out View */
          <div className="text-center py-4 space-y-6">
            <div className="w-16 h-16 rounded-full bg-neutral-900 border border-red-500/40 flex items-center justify-center mx-auto text-red-500 font-display font-black text-xl">
              {currentUser.name.slice(0, 2).toUpperCase()}
            </div>

            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-red-500">
                {currentUser.role} Account
              </div>
              <h3 className="font-display font-black text-xl text-white">
                {currentUser.name}
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">{currentUser.email}</p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/5 text-xs text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-500">Client Tier:</span>
                <span className="text-white font-semibold">{currentUser.vipTier || 'Prestige'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Platform Permissions:</span>
                <span className="text-red-400 font-bold">{currentUser.role === 'Admin' ? 'Full Control' : 'Showroom Client'}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full py-3 rounded-lg border border-red-500/40 text-red-400 hover:bg-red-950/40 text-xs font-bold uppercase tracking-wider transition-all"
            >
              Sign Out of Portal
            </button>
          </div>
        ) : mode === 'forgot' ? (
          /* Forgot Password */
          <div>
            <h3 className="font-display font-black text-xl uppercase tracking-wider text-white mb-2">
              Reset Security Code
            </h3>
            <p className="text-xs text-neutral-400 mb-6">
              Enter your registered private client email. We will transmit temporary authentication dispatch tokens.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setMode('reset-sent');
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block text-neutral-400 mb-1 font-semibold uppercase">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@elitedrive.com"
                  className="w-full bg-neutral-900 border border-white/15 rounded-lg p-3 text-white focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider rounded-lg shadow-lg"
              >
                Send Password Reset Token
              </button>
              <button
                type="button"
                onClick={() => setMode('signin')}
                className="w-full text-center text-neutral-400 hover:text-white"
              >
                Back to Sign In
              </button>
            </form>
          </div>
        ) : mode === 'reset-sent' ? (
          <div className="text-center py-6 space-y-4">
            <CheckCircle2 className="w-12 h-12 text-red-500 mx-auto" />
            <h3 className="font-display font-black text-lg text-white">
              DISPATCH TRANSMITTED
            </h3>
            <p className="text-xs text-neutral-400">
              A password reset dispatch has been logged for {email}. Please follow the instructions sent to your terminal.
            </p>
            <button
              onClick={() => setMode('signin')}
              className="px-6 py-2 rounded bg-neutral-900 border border-white/15 text-xs text-white"
            >
              Return to Login
            </button>
          </div>
        ) : (
          /* Sign In / Sign Up View */
          <div>
            <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
              <button
                onClick={() => {
                  setMode('signin');
                  setError('');
                }}
                className={`text-sm font-bold uppercase tracking-wider pb-1 transition-colors ${
                  mode === 'signin' ? 'text-red-500 border-b-2 border-red-500' : 'text-neutral-500 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <span className="text-neutral-700">|</span>
              <button
                onClick={() => {
                  setMode('signup');
                  setError('');
                }}
                className={`text-sm font-bold uppercase tracking-wider pb-1 transition-colors ${
                  mode === 'signup' ? 'text-red-500 border-b-2 border-red-500' : 'text-neutral-500 hover:text-white'
                }`}
              >
                Register VIP Account
              </button>
            </div>

            {error && (
              <div className="p-3 mb-4 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={mode === 'signin' ? handleSignIn : handleSignUp} className="space-y-4 text-xs">
              {mode === 'signup' && (
                <div>
                  <label className="block text-neutral-400 mb-1 font-semibold uppercase">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Marcus Sterling"
                    className="w-full bg-neutral-900 border border-white/15 rounded-lg p-2.5 text-white focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-neutral-400 mb-1 font-semibold uppercase">Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-neutral-900 border border-white/15 rounded-lg p-2.5 text-white focus:outline-none"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-neutral-400 font-semibold uppercase">Password *</label>
                  {mode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[11px] text-red-400 hover:underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-neutral-900 border border-white/15 rounded-lg p-2.5 text-white focus:outline-none"
                />
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-neutral-400 mb-1 font-semibold uppercase">Account Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full bg-neutral-900 border border-white/15 rounded-lg p-2.5 text-white focus:outline-none"
                  >
                    <option value="Customer">Customer (Private Collector)</option>
                    <option value="Admin">Administrator (Showroom Director)</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-[0.15em] rounded-lg shadow-xl shadow-red-950/50 transition-all cursor-pointer"
              >
                {mode === 'signin' ? 'Authenticate & Enter' : 'Create VIP Account'}
              </button>
            </form>

            {/* Quick Demo Role Switches */}
            <div className="mt-6 pt-5 border-t border-white/10 text-center">
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider block mb-2">
                Instant Quick-Login Switches
              </span>
              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('Admin')}
                  className="px-3 py-1.5 rounded-md bg-neutral-900 hover:bg-neutral-800 border border-red-500/40 text-red-400 text-[11px] font-bold"
                >
                  ⚡ Log in as Admin
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('Customer')}
                  className="px-3 py-1.5 rounded-md bg-neutral-900 hover:bg-neutral-800 border border-white/15 text-neutral-300 text-[11px]"
                >
                  👤 Log in as Customer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
