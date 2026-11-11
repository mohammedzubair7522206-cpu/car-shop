import React, { useState } from 'react';
import { Download, Smartphone, X, CheckCircle2 } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  className?: string;
  variant?: 'nav' | 'hero' | 'banner';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  className = '',
  variant = 'nav',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    setIsInstalling(true);
    await install();
    setIsInstalling(false);
  };

  // Chromium / Android / Desktop flow with real beforeinstallprompt
  if (isInstallable) {
    if (variant === 'banner') {
      return (
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 border-y border-white/10 px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-950/60 border border-red-500/40 flex items-center justify-center text-red-500">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                Install Elite Drive App
              </div>
              <div className="text-[11px] text-neutral-400">
                Experience high-performance offline access, instant 3D garage loading, and VIP alerts.
              </div>
            </div>
          </div>
          <button
            onClick={handleInstallClick}
            disabled={isInstalling}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-md transition-all shadow-md shadow-red-950/50 cursor-pointer"
          >
            {isInstalling ? 'Installing...' : 'Install App'}
          </button>
        </div>
      );
    }

    return (
      <button
        onClick={handleInstallClick}
        disabled={isInstalling}
        title="Install Elite Drive App"
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-red-500/40 bg-red-950/30 text-red-300 hover:text-white hover:bg-red-600 hover:border-red-600 text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${className}`}
      >
        <Download className="w-3.5 h-3.5 text-red-500 group-hover:text-white" />
        <span className="hidden sm:inline">Install App</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 text-neutral-300 hover:text-white text-xs font-medium transition-all ${className}`}
        >
          <Smartphone className="w-3.5 h-3.5 text-neutral-400" />
          <span className="hidden sm:inline">Add to Home Screen</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-sm rounded-2xl bg-neutral-900 border border-white/20 p-6 shadow-2xl text-white">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-red-500" />
                  <h3 className="font-display font-bold text-sm uppercase tracking-wider text-white">
                    Install on iPhone / iPad
                  </h3>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 rounded text-neutral-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-neutral-300 leading-relaxed mb-6">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-neutral-800 text-neutral-300 flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
                  <span>Tap the <strong>Share</strong> icon (box with upward arrow) in the Safari toolbar.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-neutral-800 text-neutral-300 flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
                  <span>Scroll down the action sheet and select <strong>Add to Home Screen</strong>.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-neutral-800 text-neutral-300 flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
                  <span>Tap <strong>Add</strong> in the top-right corner to launch Elite Drive in full-screen standalone mode.</span>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white transition-colors"
              >
                Close Instructions
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
