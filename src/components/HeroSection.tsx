import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, Volume2, VolumeX, ShieldCheck, Gauge, Zap } from 'lucide-react';
import { playEngineRev } from '../utils/engineAudio';

interface HeroSectionProps {
  onExploreCars: () => void;
  onBookTestDrive: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCars,
  onBookTestDrive,
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Smooth mouse parallax coordinates with lerp damping
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });
  const isTouchDevice = useRef(false);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    // Check user preferences & touch capability
    if (typeof window !== 'undefined') {
      isTouchDevice.current = window.matchMedia('(pointer: coarse)').matches;
      prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    // Scroll listener using passive event
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Mousemove listener for subtle desktop 3D camera parallax
    const handleMouseMove = (e: MouseEvent) => {
      if (isTouchDevice.current || prefersReducedMotion.current) return;
      const { innerWidth, innerHeight } = window;
      // Normalized between -1 and 1
      targetMouse.current.x = (e.clientX / innerWidth - 0.5) * 2;
      targetMouse.current.y = (e.clientY / innerHeight - 0.5) * 2;
    };

    // Continuous smooth damping animation loop for mouse parallax
    let animId: number;
    const updateMouseDamping = () => {
      if (!isTouchDevice.current && !prefersReducedMotion.current) {
        currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.06;
        currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.06;
        setMouseOffset({ x: currentMouse.current.x, y: currentMouse.current.y });
      }
      animId = requestAnimationFrame(updateMouseDamping);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animId = requestAnimationFrame(updateMouseDamping);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleAudioToggle = () => {
    setIsPlayingAudio(true);
    playEngineRev('v8twin');
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 2500);
  };

  // ----------------------------------------------------
  // PARALLAX LAYER CALCULATIONS (Differential depth speed)
  // ----------------------------------------------------
  const mx = prefersReducedMotion.current ? 0 : mouseOffset.x;
  const my = prefersReducedMotion.current ? 0 : mouseOffset.y;
  const sy = scrollY;

  // Layer 1: Distant Background (Sky, horizon, celestial nebula): Moves very slowly
  const l1_Y = sy * 0.08 + my * 4;
  const l1_X = mx * 4;

  // Layer 2: Background Environment (Mountain ridges, distant horizon trees, highway landscape): Moves slowly
  const l2_Y = sy * 0.18 + my * 8;
  const l2_X = mx * 8;

  // Layer 3: Main Automotive Video (Supercar focus, camera-tracking medium speed with subtle dynamic focal zoom)
  const l3_Y = sy * 0.32 + my * 14;
  const l3_X = mx * 13;
  const l3_Scale = 1.05 + Math.min(sy * 0.0003, 0.08);

  // Layer 4: Foreground Elements (Atmospheric light streaks, highway dust bokeh, speed particles): Moves faster
  const l4_Y = sy * 0.55 + my * 22;
  const l4_X = mx * 20;

  // Layer 6: Hero Content (Heading moves slightly slower than foreground, buttons have smooth fade)
  const content_Y = -sy * 0.14 + my * -5;
  const content_X = mx * -6;
  const contentOpacity = Math.max(0, 1 - sy / 620);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-neutral-950 select-none"
    >
      {/* ==================================================== */}
      {/* LAYER 1 — DISTANT BACKGROUND (z-index: 0)            */}
      {/* Moves very slowly. Sky, celestial dawn, distant haze */}
      {/* ==================================================== */}
      <div
        className="absolute inset-0 w-[114%] -left-[7%] h-[120%] -top-[10%] pointer-events-none will-change-transform z-0"
        style={{
          transform: `translate3d(${l1_X}px, ${l1_Y}px, 0) scale(1.04)`,
        }}
      >
        {/* Soft cosmic dawn gradient & celestial atmospheric glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-[#090a12] to-[#040406]" />
        {/* Distant mountain silhouette glow */}
        <div className="absolute top-1/6 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-red-600/10 blur-[180px] rounded-full pointer-events-none opacity-70" />
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[350px] bg-blue-600/5 blur-[140px] rounded-full pointer-events-none opacity-50" />
      </div>

      {/* ==================================================== */}
      {/* LAYER 2 — BACKGROUND ENVIRONMENT (z-index: 1)        */}
      {/* Moves slowly. Distant terrain, coastal landscape      */}
      {/* ==================================================== */}
      <div
        className="absolute inset-0 w-[112%] -left-[6%] h-[124%] -top-[12%] pointer-events-none will-change-transform z-[1] opacity-75"
        style={{
          transform: `translate3d(${l2_X}px, ${l2_Y}px, 0) scale(1.06)`,
        }}
      >
        {/* Subtle procedural mountain horizon ridges & terrain silhouette */}
        <svg
          className="absolute bottom-0 w-full h-[55%] text-neutral-900/60 opacity-40 preserve-3d"
          viewBox="0 0 1440 320"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,192L48,176C96,160,192,128,288,144C384,160,480,224,576,218.7C672,213,768,139,864,128C960,117,1056,171,1152,181.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
      </div>

      {/* ==================================================== */}
      {/* LAYER 3 — MAIN AUTOMOTIVE VIDEO (z-index: 2)         */}
      {/* The cinematic car video. Moves at medium speed       */}
      {/* ==================================================== */}
      <div
        className="absolute inset-0 w-[112%] -left-[6%] h-[126%] -top-[13%] pointer-events-none will-change-transform z-[2]"
        style={{
          transform: `translate3d(${l3_X}px, ${l3_Y}px, 0) scale(${l3_Scale})`,
        }}
      >
        {/* Primary automotive video stream with high-res faststart stream */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onCanPlay={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-90' : 'opacity-0'
          }`}
          poster="/hero_poster.jpg"
        >
          <source src="/hero_cinematic_web.mp4" type="video/mp4" />
          <source src="/hero_cinematic.mp4" type="video/mp4" />
          {/* Universal high-definition fallback loop */}
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-car-driving-on-a-road-at-night-4247-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* High-fidelity fallback poster extracted from the sequence */}
        <img
          src="/hero_poster.jpg"
          alt="ELITE DRIVE luxury automotive performance commercial"
          className={`absolute inset-0 w-full h-full object-cover ${
            videoLoaded ? 'hidden' : 'block'
          }`}
          referrerPolicy="no-referrer"
        />
      </div>

      {/* ==================================================== */}
      {/* LAYER 4 — FOREGROUND ELEMENTS (z-index: 3)           */}
      {/* Nearby road light reflections, bokeh, embers. Fast   */}
      {/* ==================================================== */}
      <div
        className="absolute inset-0 w-[116%] -left-[8%] h-[130%] -top-[15%] pointer-events-none will-change-transform z-[3] overflow-hidden"
        style={{
          transform: `translate3d(${l4_X}px, ${l4_Y}px, 0)`,
        }}
      >
        {/* Subtle atmospheric highway light flares */}
        <div className="absolute -top-12 left-1/3 w-96 h-96 bg-red-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-2/3 right-1/4 w-80 h-80 bg-red-600/8 rounded-full blur-[90px] pointer-events-none" />

        {/* Foreground dynamic road reflection hairline */}
        <div className="absolute bottom-[8%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
      </div>

      {/* ==================================================== */}
      {/* LAYER 5 — DARK CINEMATIC OVERLAY (z-index: 4)        */}
      {/* Left side darker for text readability. Car visible   */}
      {/* ==================================================== */}
      <div className="absolute inset-0 pointer-events-none z-[4]">
        {/* Multi-zone directional gradient: left text scrim + gentle radial glow around the vehicle */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/50 to-neutral-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-neutral-950/60" />
        {/* Subtle radial center transparency so the car is brilliantly illuminated */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_45%,transparent_35%,rgba(8,8,10,0.65)_85%)]" />
      </div>

      {/* ==================================================== */}
      {/* LAYER 6 — HERO CONTENT (z-index: 10)                 */}
      {/* Text, buttons, and UI with subtle independent drift  */}
      {/* ==================================================== */}
      <div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16 flex flex-col items-center justify-center transition-transform duration-300 ease-out will-change-transform"
        style={{
          opacity: contentOpacity,
          transform: `translate3d(${content_X}px, ${content_Y}px, 0)`,
        }}
      >
        {/* Brand Tagline & Luxury Marker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-semibold uppercase tracking-[0.25em] text-neutral-300">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping inline-block" />
          <span>Curated Supercar Showroom · 2026 Fleet</span>
        </div>

        {/* Main Heading (Independent layered depth) */}
        <h1
          className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-[1.05] max-w-4xl mb-6 drop-shadow-2xl transition-transform duration-200"
          style={{
            transform: `translate3d(${content_X * 0.4}px, 0, 0)`,
          }}
        >
          DRIVE BEYOND <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">ORDINARY</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl md:text-2xl font-light text-neutral-300 max-w-2xl mx-auto mb-10 leading-relaxed text-balance">
          Discover exceptional cars. Experience extraordinary performance.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-14">
          <button
            onClick={onExploreCars}
            className="w-full sm:w-auto px-8 py-4 rounded-md bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs uppercase tracking-[0.2em] shadow-xl shadow-red-950/50 hover:shadow-red-600/30 transition-all duration-300 group flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Explore Cars</span>
            <span className="inline-block transform group-hover:translate-x-1 transition-transform">→</span>
          </button>

          <button
            onClick={onBookTestDrive}
            className="w-full sm:w-auto px-8 py-4 rounded-md border border-white/20 hover:border-white/50 bg-black/40 hover:bg-white/10 backdrop-blur-md text-white font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer"
          >
            Book A Test Drive
          </button>
        </div>

        {/* Engine Sound Experience Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleAudioToggle}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
              isPlayingAudio
                ? 'bg-red-600/20 border-red-500/50 text-red-300 shadow-lg shadow-red-950/40'
                : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:border-white/25'
            }`}
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                <span>Exhaust Roar Active</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span>Hear Exhaust Symphony</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Bottom KPI Bar / Trust Strip */}
      <div className="absolute bottom-6 left-0 right-0 z-20 hidden md:block">
        <div className="max-w-6xl mx-auto px-6">
          <div className="glass-panel rounded-lg py-3 px-6 flex items-center justify-between text-xs text-neutral-400 divide-x divide-white/10">
            <div className="flex items-center gap-2.5 px-4 first:pl-0">
              <ShieldCheck className="w-4 h-4 text-red-500 shrink-0" />
              <span>150-Point Certified Inspection</span>
            </div>
            <div className="flex items-center gap-2.5 px-4">
              <Gauge className="w-4 h-4 text-red-500 shrink-0" />
              <span>0-60 mph from 2.6s Verified</span>
            </div>
            <div className="flex items-center gap-2.5 px-4">
              <Zap className="w-4 h-4 text-red-500 shrink-0" />
              <span>Doorstep Enclosed Delivery</span>
            </div>
            <div className="flex items-center gap-2.5 px-4 last:pr-0">
              <span className="font-semibold text-neutral-200">Tagline:</span>
              <span className="italic text-neutral-300">"Find Your Next Drive."</span>
            </div>
          </div>
        </div>
      </div>

      {/* Smooth Scroll Down Indicator */}
      <button
        onClick={onExploreCars}
        aria-label="Scroll to featured cars"
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 text-neutral-400 hover:text-white p-2 rounded-full focus:outline-none transition-colors animate-bounce cursor-pointer"
      >
        <ArrowDown className="w-4 h-4" />
      </button>
    </section>
  );
};
