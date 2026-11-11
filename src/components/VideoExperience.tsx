import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, ArrowRight } from 'lucide-react';
import { playEngineRev } from '../utils/engineAudio';

interface VideoExperienceProps {
  onExploreCollection: () => void;
}

export const VideoExperience: React.FC<VideoExperienceProps> = ({ onExploreCollection }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setScrollY(rect.top);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleAudioThrottle = () => {
    playEngineRev('v10na');
  };

  return (
    <section
      id="video-experience"
      ref={sectionRef}
      className="relative w-full h-[70vh] min-h-[550px] flex items-center justify-center overflow-hidden bg-neutral-950 my-12"
    >
      {/* Background Video with subtle parallax */}
      <div
        className="absolute inset-0 w-full h-[130%] -top-[15%] will-change-transform pointer-events-none"
        style={{
          transform: `translate3d(0, ${-scrollY * 0.2}px, 0)`
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover"
          poster="/src/assets/images/hero_porsche_cinematic_1794232747528.jpg"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-car-driving-on-a-road-at-night-4247-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* High-contrast scrim for pristine text readability */}
        <div className="absolute inset-0 bg-neutral-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950" />
      </div>

      {/* Floating Center Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="inline-block px-3 py-1 rounded-full border border-red-500/30 bg-red-950/30 text-xs font-semibold uppercase tracking-[0.25em] text-red-400 mb-6">
          Cinematic Immersion
        </div>

        <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white mb-6">
          FEEL THE POWER
        </h2>

        <p className="text-lg sm:text-2xl font-light text-neutral-300 max-w-xl mx-auto mb-10 leading-relaxed text-balance">
          Every car tells a story. Start yours today.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onExploreCollection}
            className="px-8 py-4 rounded-md bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs uppercase tracking-[0.2em] shadow-xl shadow-red-950/60 hover:shadow-red-600/30 transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleAudioThrottle}
            className="px-6 py-4 rounded-md border border-white/20 hover:border-white/50 bg-black/50 hover:bg-white/10 backdrop-blur-md text-white font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-2 cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-red-500" />
            <span>V10 Engine Symphony</span>
          </button>
        </div>
      </div>

      {/* Video controls */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md p-1.5 rounded-lg border border-white/10">
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
          className="p-2 text-neutral-400 hover:text-white transition-colors"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <button
          onClick={() => setIsMuted(!isMuted)}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          className="p-2 text-neutral-400 hover:text-white transition-colors"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </section>
  );
};
