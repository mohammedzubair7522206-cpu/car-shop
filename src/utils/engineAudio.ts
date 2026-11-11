/**
 * Web Audio API synthesizer for luxury & high-performance car engine sounds
 * Provides ignition start, deep idle rumble, and high-RPM throttle roar.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playEngineRev(preset: 'flat6' | 'v8twin' | 'v10na' | 'inline6' | 'evwhine' = 'v8twin') {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.connect(ctx.destination);

    if (preset === 'evwhine') {
      // High-tech electric motor spool
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 1.2);
      osc.frequency.exponentialRampToValueAtTime(600, now + 2.2);

      masterGain.gain.setValueAtTime(0.01, now);
      masterGain.gain.linearRampToValueAtTime(0.18, now + 0.8);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + 2.4);

      osc.connect(masterGain);
      osc.start(now);
      osc.stop(now + 2.5);
      return;
    }

    // Baseline frequencies by architecture
    const baseFreq = preset === 'v10na' ? 140 : preset === 'flat6' ? 95 : preset === 'inline6' ? 110 : 80;

    // Dual oscillator setup for mechanical combustion resonance
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const subOsc = ctx.createOscillator();

    osc1.type = 'sawtooth';
    osc2.type = 'triangle';
    subOsc.type = 'sine';

    // Ignition starter crank
    osc1.frequency.setValueAtTime(45, now);
    osc1.frequency.linearRampToValueAtTime(baseFreq * 0.9, now + 0.3);
    // Throttle blip
    osc1.frequency.exponentialRampToValueAtTime(baseFreq * 2.8, now + 0.9);
    osc1.frequency.exponentialRampToValueAtTime(baseFreq * 1.1, now + 1.8);
    osc1.frequency.linearRampToValueAtTime(baseFreq * 0.7, now + 2.4);

    osc2.frequency.setValueAtTime(48, now);
    osc2.frequency.linearRampToValueAtTime(baseFreq * 1.35, now + 0.3);
    osc2.frequency.exponentialRampToValueAtTime(baseFreq * 4.2, now + 0.9);
    osc2.frequency.exponentialRampToValueAtTime(baseFreq * 1.6, now + 1.8);
    osc2.frequency.linearRampToValueAtTime(baseFreq * 0.9, now + 2.4);

    subOsc.frequency.setValueAtTime(35, now);
    subOsc.frequency.linearRampToValueAtTime(55, now + 0.5);
    subOsc.frequency.exponentialRampToValueAtTime(110, now + 0.9);
    subOsc.frequency.linearRampToValueAtTime(40, now + 2.2);

    // Exhaust resonance filter
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(350, now);
    filter.frequency.linearRampToValueAtTime(1800, now + 0.9);
    filter.frequency.exponentialRampToValueAtTime(450, now + 2.0);
    filter.Q.setValueAtTime(3.5, now);

    // Distortion / exhaust throat rasp
    const waveshaper = ctx.createWaveShaper();
    waveshaper.curve = makeDistortionCurve(18) as any;
    waveshaper.oversample = '4x';

    osc1.connect(waveshaper);
    osc2.connect(waveshaper);
    subOsc.connect(filter);
    waveshaper.connect(filter);
    filter.connect(masterGain);

    // Volume envelope
    masterGain.gain.setValueAtTime(0.01, now);
    masterGain.gain.linearRampToValueAtTime(0.24, now + 0.3);
    masterGain.gain.linearRampToValueAtTime(0.35, now + 0.9);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

    osc1.start(now);
    osc2.start(now);
    subOsc.start(now);

    osc1.stop(now + 2.5);
    osc2.stop(now + 2.5);
    subOsc.stop(now + 2.5);
  } catch {
    // Graceful fallback if audio context blocked by browser policy
  }
}

function makeDistortionCurve(amount: number): Float32Array {
  const k = typeof amount === 'number' ? amount : 50;
  const nSamples = 44100;
  const curve = new Float32Array(nSamples);
  const deg = Math.PI / 180;
  for (let i = 0; i < nSamples; ++i) {
    const x = (i * 2) / nSamples - 1;
    curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
  }
  return curve;
}
