// Festive Ambient Audio Synthesizer using Web Audio API
// Zero external files, zero network latency, 0 KB payload, no 404s or CORS issues.
// Plays gentle Indian classical temple bells & meditative tanpura-like acoustic drone on pentatonic scale (Raag Bhupali).
// Also synthesizes real-time interactive firecracker / patakha burst sounds!

class FestiveAudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.droneOsc1 = null;
    this.droneOsc2 = null;
    this.droneGain = null;
    this.chimeTimer = null;
    // Pentatonic scale frequencies: C4, D4, E4, G4, A4, C5, D5
    this.notes = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33];
    this.soundEffectsEnabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  async start() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    if (this.isPlaying) return;
    this.isPlaying = true;

    const now = this.ctx.currentTime;

    // 1. Warm harmonic acoustic drone (Tanpura-like continuous foundation)
    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.001, now);
    this.droneGain.gain.exponentialRampToValueAtTime(0.04, now + 2); // Soft volume

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, now);

    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc1.type = 'sine';
    this.droneOsc1.frequency.setValueAtTime(130.81, now); // C3 fundamental

    this.droneOsc2 = this.ctx.createOscillator();
    this.droneOsc2.type = 'triangle';
    this.droneOsc2.frequency.setValueAtTime(196.0, now); // G3 harmonic

    this.droneOsc1.connect(filter);
    this.droneOsc2.connect(filter);
    filter.connect(this.droneGain);
    this.droneGain.connect(this.ctx.destination);

    this.droneOsc1.start(now);
    this.droneOsc2.start(now);

    // 2. Play initial welcoming chime
    this.playChime();

    // 3. Periodic gentle festive bell ring every 3 to 6 seconds
    const scheduleNextChime = () => {
      if (!this.isPlaying) return;
      const delay = 3000 + Math.random() * 3500;
      this.chimeTimer = setTimeout(() => {
        this.playChime();
        scheduleNextChime();
      }, delay);
    };
    scheduleNextChime();
  }

  playChime() {
    if (!this.ctx || !this.isPlaying) return;

    const now = this.ctx.currentTime;
    const freq = this.notes[Math.floor(Math.random() * this.notes.length)];

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Bell envelope: instant rise, long soothing exponential decay
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 2.6);
  }

  // Realistic Patakha / Cracker Burst Sound Effect (Instant Web Audio synthesis)
  playCrackerBurst() {
    if (!this.soundEffectsEnabled) return;
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    try {
      const now = this.ctx.currentTime;

      // 1. Deep Bass Explosion Boom (140Hz to 32Hz pitch drop)
      const boomOsc = this.ctx.createOscillator();
      const boomGain = this.ctx.createGain();
      boomOsc.type = 'sine';
      boomOsc.frequency.setValueAtTime(140, now);
      boomOsc.frequency.exponentialRampToValueAtTime(32, now + 0.32);

      boomGain.gain.setValueAtTime(0.3, now);
      boomGain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

      boomOsc.connect(boomGain);
      boomGain.connect(this.ctx.destination);
      boomOsc.start(now);
      boomOsc.stop(now + 0.33);

      // 2. High-Frequency Crackle/Snap (Noise Buffer)
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.12);
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(1200 + Math.random() * 800, now);
      noiseFilter.Q.setValueAtTime(2.5, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.22, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      whiteNoise.start(now);
      whiteNoise.stop(now + 0.13);

      // 3. Secondary Sparkles (Micro Crackles)
      for (let s = 1; s <= 2; s++) {
        const popTime = now + 0.06 + Math.random() * 0.12;
        const popOsc = this.ctx.createOscillator();
        const popGain = this.ctx.createGain();
        popOsc.type = 'triangle';
        popOsc.frequency.setValueAtTime(700 + Math.random() * 800, popTime);
        popGain.gain.setValueAtTime(0.06, popTime);
        popGain.gain.exponentialRampToValueAtTime(0.0001, popTime + 0.05);

        popOsc.connect(popGain);
        popGain.connect(this.ctx.destination);
        popOsc.start(popTime);
        popOsc.stop(popTime + 0.06);
      }
    } catch (e) {
      // Audio playback fails silently if user has not interacted with DOM yet
    }
  }

  stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;

    if (this.chimeTimer) {
      clearTimeout(this.chimeTimer);
      this.chimeTimer = null;
    }

    if (this.droneGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.droneGain.gain.setValueAtTime(this.droneGain.gain.value, now);
      this.droneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

      setTimeout(() => {
        if (this.droneOsc1) {
          try { this.droneOsc1.stop(); this.droneOsc1.disconnect(); } catch (e) {}
          this.droneOsc1 = null;
        }
        if (this.droneOsc2) {
          try { this.droneOsc2.stop(); this.droneOsc2.disconnect(); } catch (e) {}
          this.droneOsc2 = null;
        }
      }, 600);
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}

export const festiveAudio = new FestiveAudioSynthesizer();
