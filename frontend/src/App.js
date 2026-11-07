import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Heart,
  Send,
  Users,
  Share2,
  Copy,
  Check,
  TrendingUp,
  Instagram,
  Volume2,
  VolumeX,
  Sparkles,
  MessageCircle,
  X,
  ExternalLink
} from 'lucide-react';
import { festiveAudio } from './utils/festiveAudio';

const API_URL =
  process.env.REACT_APP_API_URL ||
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000/api'
    : 'https://diwali-backend.onrender.com/api');

// --- PURE VECTOR SVG DIYA COMPONENT (GPU Accelerated, 0 Canvas Cost) ---
const DiyaSvg = React.memo(({ size = 'md', className = '' }) => {
  const dims = {
    sm: { width: 38, height: 32 },
    md: { width: 56, height: 46 },
    lg: { width: 84, height: 68 },
    xl: { width: 110, height: 88 }
  }[size] || { width: 56, height: 46 };

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: dims.width, height: dims.height }}
      aria-hidden="true"
    >
      {/* Outer Glow Aura */}
      <div
        className="absolute w-3/4 h-3/4 -top-1 rounded-full bg-amber-400/30 blur-md animate-flame-aura pointer-events-none"
      />
      <svg
        viewBox="0 0 100 80"
        width={dims.width}
        height={dims.height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 drop-shadow-[0_2px_8px_rgba(255,183,3,0.35)]"
      >
        <defs>
          <linearGradient id="clayBase" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c85a17" />
            <stop offset="45%" stopColor="#963c08" />
            <stop offset="100%" stopColor="#541e00" />
          </linearGradient>
          <linearGradient id="clayRim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffd700" />
            <stop offset="50%" stopColor="#ff9f1c" />
            <stop offset="100%" stopColor="#d35400" />
          </linearGradient>
          <radialGradient id="flameInner" cx="50%" cy="80%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#fff3b0" />
            <stop offset="55%" stopColor="#ffb703" />
            <stop offset="85%" stopColor="#fb8500" />
            <stop offset="100%" stopColor="#d62828" stopOpacity="0.8" />
          </radialGradient>
        </defs>

        {/* Diya Clay Bowl */}
        <ellipse cx="50" cy="58" rx="42" ry="16" fill="url(#clayBase)" />
        <ellipse cx="50" cy="54" rx="40" ry="12" fill="url(#clayRim)" stroke="#ffb703" strokeWidth="1" />
        <ellipse cx="50" cy="54" rx="33" ry="8" fill="#3d1500" />

        {/* Diya Spout Front Lip */}
        <path
          d="M44 48 C48 45, 52 45, 56 48 C54 53, 46 53, 44 48 Z"
          fill="#ffb703"
        />

        {/* Flickering Flame (GPU CSS animated) */}
        <g className="animate-flame" style={{ transformOrigin: '50px 48px' }}>
          <path
            d="M50 8 C43 23, 37 33, 41 45 C44 51, 56 51, 59 45 C63 33, 57 23, 50 8 Z"
            fill="url(#flameInner)"
          />
          <path
            d="M50 16 C46 25, 43 32, 45 40 C47 44, 53 44, 55 40 C57 32, 54 25, 50 16 Z"
            fill="#ffffff"
            opacity="0.85"
          />
        </g>
      </svg>
    </div>
  );
});

// --- SUBTLE RANGOLI BACKGROUND PATTERN (Zero Overhead Vector) ---
const RangoliWatermark = React.memo(() => (
  <div
    className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-[0.045] mix-blend-screen"
    aria-hidden="true"
  >
    <svg width="860" height="860" viewBox="0 0 400 400" fill="none" stroke="#ffd700" strokeWidth="1.2">
      <circle cx="200" cy="200" r="180" strokeDasharray="4 6" />
      <circle cx="200" cy="200" r="140" />
      <circle cx="200" cy="200" r="100" strokeDasharray="6 4" />
      <circle cx="200" cy="200" r="60" />
      <circle cx="200" cy="200" r="20" fill="#ffd700" fillOpacity="0.3" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 200 200)`}>
          <path d="M200 60 Q215 100 200 140 Q185 100 200 60 Z" />
          <path d="M200 20 Q210 40 200 60 Q190 40 200 20 Z" />
        </g>
      ))}
    </svg>
  </div>
));

// --- MEMOIZED COUNTER DISPLAY (Zero Re-render on Typing) ---
const CounterDisplay = React.memo(({ created, opened }) => (
  <div
    className="fixed top-4 left-4 z-40 p-2.5 sm:p-3 rounded-2xl bg-black/40 backdrop-blur-md border border-amber-500/25 shadow-lg shadow-black/40 text-xs sm:text-sm text-yellow-100 flex items-center gap-3 transition-transform duration-200"
    style={{ transform: 'translate3d(0,0,0)' }}
  >
    <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
      <TrendingUp className="w-4 h-4" />
    </div>
    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 font-medium">
      <div className="flex items-center gap-1.5">
        <span className="text-amber-300 font-bold text-sm sm:text-base">{created}</span>
        <span className="text-amber-100/70 text-xs">Created</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-emerald-400 font-bold text-sm sm:text-base">{opened}</span>
        <span className="text-emerald-100/70 text-xs">Opened</span>
      </div>
    </div>
  </div>
));

// --- MEMOIZED MUSIC TOGGLE (Pleasant Web Audio Ambient Sound) ---
const MusicToggle = React.memo(({ isPlaying, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    aria-label={isPlaying ? 'Mute festive background music' : 'Play festive background music'}
    title={isPlaying ? 'Music: ON (Tap to Mute)' : 'Music: OFF (Tap to Play)'}
    className={`fixed top-4 right-4 z-40 min-h-[44px] min-w-[44px] p-2.5 rounded-2xl backdrop-blur-md border flex items-center gap-2 text-xs font-semibold shadow-lg transition-transform duration-200 active:scale-95 ${
      isPlaying
        ? 'bg-amber-500/25 border-amber-400/50 text-amber-300 shadow-amber-500/20'
        : 'bg-black/40 border-white/20 text-white/70 hover:text-white'
    }`}
    style={{ transform: 'translate3d(0,0,0)' }}
  >
    {isPlaying ? (
      <>
        <Volume2 className="w-5 h-5 text-amber-300 animate-pulse" />
        <span className="hidden sm:inline text-amber-200">Music ON</span>
      </>
    ) : (
      <>
        <VolumeX className="w-5 h-5 text-white/60" />
        <span className="hidden sm:inline text-white/70">Music</span>
      </>
    )}
  </button>
));

// --- MEMOIZED INSTAGRAM BADGE ---
const InstagramBadge = React.memo(() => (
  <a
    href="https://instagram.com/ohi_abhist"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Follow @ohi_abhist on Instagram"
    className="fixed bottom-4 right-4 z-40 min-h-[44px] px-3.5 py-2 rounded-full bg-gradient-to-r from-[#833ab4]/80 via-[#fd1d1d]/80 to-[#fcb045]/80 backdrop-blur-md border border-white/20 text-white text-xs font-bold shadow-lg shadow-black/40 flex items-center gap-2 transition-transform duration-200 hover:scale-105 active:scale-95"
    style={{ transform: 'translate3d(0,0,0)' }}
  >
    <Instagram className="w-4 h-4 text-white" />
    <span>@ohi_abhist</span>
  </a>
));

// --- MEMOIZED SHARE MODAL ---
const ShareModal = React.memo(({
  isOpen,
  onClose,
  shareLink,
  receiverName,
  senderName,
  onCopy,
  copied,
  onWhatsApp,
  onInstagram
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-entrance-zoom"
    >
      <div className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-[#1f002b] to-[#0d0018] border border-amber-400/40 p-6 sm:p-8 shadow-2xl shadow-amber-500/10 text-white">
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
            <Share2 className="w-7 h-7" />
          </div>
          <h3 className="font-display text-2xl font-bold text-amber-300">Share Your Wish!</h3>
          <p className="text-amber-100/80 text-sm mt-1">
            Send this special Diwali link to <strong className="text-amber-200">{receiverName}</strong>
          </p>
        </div>

        {/* Link Box */}
        <div className="bg-black/40 border border-amber-400/20 rounded-xl p-3 mb-5 text-xs text-amber-100/90 break-all select-all font-mono">
          {shareLink}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5">
          {/* WhatsApp Button */}
          <button
            type="button"
            onClick={onWhatsApp}
            className="w-full min-h-[48px] py-3 px-5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-600 to-green-500 text-white flex items-center justify-center gap-2 shadow-md shadow-emerald-700/30 transition-transform active:scale-98 hover:brightness-110"
          >
            <MessageCircle className="w-5 h-5" />
            Share on WhatsApp
          </button>

          {/* Copy Button */}
          <button
            type="button"
            onClick={onCopy}
            className={`w-full min-h-[48px] py-3 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-transform active:scale-98 ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-r from-amber-400 to-amber-500 text-stone-900 shadow-md shadow-amber-500/20 hover:brightness-105'
            }`}
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            {copied ? 'Link Copied to Clipboard!' : 'Copy Link'}
          </button>

          {/* Instagram Share */}
          <button
            type="button"
            onClick={onInstagram}
            className="w-full min-h-[44px] py-2.5 px-4 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white/90 border border-white/15 flex items-center justify-center gap-2 transition-colors"
          >
            <Instagram className="w-4 h-4 text-pink-400" />
            Share on Instagram Story / DM
          </button>
        </div>
      </div>
    </div>
  );
});

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================
export default function App() {
  const [senderName, setSenderName] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [message, setMessage] = useState('');
  const [wishes, setWishes] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState('create');
  const [counters, setCounters] = useState({ created: 0, opened: 0 });
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const canvasRef = useRef(null);

  // Show transient toast
  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  }, []);

  // Fetch counters on load
  const fetchCounters = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/counters`);
      if (!response.ok) return;
      const data = await response.json();
      setCounters(data);
    } catch (error) {
      console.warn('Could not fetch counters:', error.message);
    }
  }, []);

  // Increment counter
  const incrementCounter = useCallback(async (type) => {
    try {
      await fetch(`${API_URL}/counters/${type}`, { method: 'POST' });
      fetchCounters();
    } catch (error) {
      console.warn('Could not increment counter:', error.message);
    }
  }, [fetchCounters]);

  // Fetch recent wishes
  const fetchWishes = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/wishes`);
      if (!response.ok) return;
      const data = await response.json();
      if (Array.isArray(data)) {
        setWishes(data);
      }
    } catch (error) {
      console.warn('Could not fetch recent wishes:', error.message);
    }
  }, []);

  useEffect(() => {
    fetchCounters();
    fetchWishes();
  }, [fetchCounters, fetchWishes]);

  // Check URL parameters for customized view mode
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const from = params.get('from');
    const to = params.get('to');
    const msg = params.get('msg');

    if (from && to) {
      setViewMode('view');
      setSenderName(decodeURIComponent(from));
      setReceiverName(decodeURIComponent(to));
      setMessage(msg ? decodeURIComponent(msg) : '');
      incrementCounter('opened');
    }
  }, [incrementCounter]);

  // Toggle ambient music
  const toggleMusic = useCallback(() => {
    const newState = festiveAudio.toggle();
    setIsMusicPlaying(newState);
  }, []);

  // --------------------------------------------------------------------------
  // HIGH-PERFORMANCE CANVAS FIREWORKS ENGINE
  // Zero ctx.shadowBlur, additive lighter blend, DPR capped, backward loop, visibility paused
  // --------------------------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Check device tier & hardware concurrency
    const isMobile = window.innerWidth < 768;
    const cpuCores = navigator.hardwareConcurrency || 4;
    const isLowTier = isMobile || cpuCores <= 4;
    const burstCount = isLowTier ? 24 : 46;
    const fireworkIntervalMs = isLowTier ? 2500 : 1600;
    const maxParticles = isLowTier ? 90 : 200;

    // Cap DPR at 2.0 to protect mobile 3x/4x screens from fill-rate lag
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resizeCanvas();

    const particles = [];
    const colors = ['#ffd700', '#ffb703', '#fb8500', '#ff007f', '#00f5d4', '#7b2cbf', '#ffffff'];

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        const speed = 1.5 + Math.random() * 4.5;
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.decay = 0.012 + Math.random() * 0.014;
        this.gravity = 0.06;
        this.friction = 0.965;
        this.radius = 1.8 + Math.random() * 1.6;
      }

      update() {
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
      }

      draw(context) {
        context.fillStyle = this.color;
        context.globalAlpha = Math.max(0, this.alpha);
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
      }
    }

    const createFirework = (x, y) => {
      if (particles.length > maxParticles) return; // Cap maximum active particles
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < burstCount; i++) {
        particles.push(new Particle(x, y, color));
      }
    };

    let animationFrameId = null;
    let isHidden = false;

    const loop = () => {
      if (isHidden) return;

      // Soft trail clear without clearing canvas entirely
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(7, 0, 16, 0.22)';
      ctx.fillRect(0, 0, width, height);

      // Additive blending: gives vibrant, glowing festival sparks with ZERO CPU blur cost
      ctx.globalCompositeOperation = 'lighter';

      // Backward iteration: zero GC pause and zero index-skipping bug
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        if (p.alpha <= 0 || p.y > height + 20) {
          particles.splice(i, 1);
        } else {
          p.draw(ctx);
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(loop);
    };

    // Initial fireworks
    createFirework(width * 0.5, height * 0.35);
    animationFrameId = requestAnimationFrame(loop);

    // Periodic fireworks
    const intervalId = setInterval(() => {
      if (isHidden) return;
      const x = width * (0.15 + Math.random() * 0.7);
      const y = height * (0.15 + Math.random() * 0.4);
      createFirework(x, y);
    }, fireworkIntervalMs);

    // Pause on tab switch (save battery and CPU)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isHidden = true;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      } else {
        isHidden = false;
        animationFrameId = requestAnimationFrame(loop);
      }
    };

    window.addEventListener('resize', resizeCanvas, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      clearInterval(intervalId);
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Handle Form Submission
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!senderName.trim() || !receiverName.trim()) {
      showToast('Please enter both your name and recipient name!');
      return;
    }

    const trimmedSender = senderName.trim();
    const trimmedReceiver = receiverName.trim();
    const trimmedMsg = message.trim();

    const newWish = {
      from: trimmedSender,
      to: trimmedReceiver,
      message: trimmedMsg,
      timestamp: new Date().toLocaleString()
    };

    // Optimistic UI update
    setWishes((prev) => [newWish, ...prev.slice(0, 9)]);

    // Save to backend
    try {
      await fetch(`${API_URL}/wishes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newWish)
      });
      incrementCounter('created');
    } catch (error) {
      console.warn('Error saving wish to backend:', error);
    }

    const baseUrl = window.location.origin + window.location.pathname;
    const generatedLink = `${baseUrl}?from=${encodeURIComponent(trimmedSender)}&to=${encodeURIComponent(
      trimmedReceiver
    )}${trimmedMsg ? '&msg=' + encodeURIComponent(trimmedMsg) : ''}`;

    setShareLink(generatedLink);
    setShowShareModal(true);
  };

  // Copy to clipboard
  const handleCopyLink = () => {
    if (!shareLink) return;
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    showToast('Link copied to clipboard! ✨');
    setTimeout(() => setCopied(false), 2000);
  };

  // Share on WhatsApp
  const handleWhatsAppShare = () => {
    const text = `🪔 *Happy Diwali!* ✨\n\nDear *${receiverName}*, I made a glowing personalized Diwali greeting especially for you! 🎆\n\nTap to open: ${shareLink}\n\n_Wish you immense happiness, health & prosperity!_ 🪔`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Share on Instagram
  const handleInstagramShare = () => {
    const text = `🪔 Happy Diwali! 🎆\nI created a personalized Diwali wish for you!\n${shareLink}\n\n#HappyDiwali #Diwali2025 #FestivalOfLights`;
    navigator.clipboard.writeText(text);
    showToast('Wish text copied! Paste it in Instagram Story/DM 🪔');
    setTimeout(() => {
      window.open('https://www.instagram.com/', '_blank');
    }, 600);
  };

  // Switch to Create Mode from View Mode
  const handleCreateNewWish = () => {
    window.history.pushState({}, '', window.location.pathname);
    setViewMode('create');
    setSenderName('');
    setReceiverName('');
    setMessage('');
  };

  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-hidden bg-[#070010] text-white flex flex-col justify-between">
      {/* Background Fireworks Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Subtle Rangoli Watermark */}
      <RangoliWatermark />

      {/* Floating Header Controls */}
      <CounterDisplay created={counters.created} opened={counters.opened} />
      <MusicToggle isPlaying={isMusicPlaying} onToggle={toggleMusic} />
      <InstagramBadge />

      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-amber-500 text-stone-950 font-bold text-xs sm:text-sm shadow-xl shadow-amber-500/30 animate-entrance-zoom flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-stone-950" />
          {toastMessage}
        </div>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        shareLink={shareLink}
        receiverName={receiverName}
        senderName={senderName}
        onCopy={handleCopyLink}
        copied={copied}
        onWhatsApp={handleWhatsAppShare}
        onInstagram={handleInstagramShare}
      />

      {/* ============================================================== */}
      {/* VIEW MODE: When recipient opens personalized link              */}
      {/* ============================================================== */}
      {viewMode === 'view' ? (
        <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 pt-20 pb-20">
          <div className="w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#1b0026]/90 via-[#12001c]/90 to-[#070010]/95 border border-amber-400/30 p-6 sm:p-10 shadow-2xl shadow-amber-500/10 text-center animate-entrance-up backdrop-blur-md">
            {/* Top Diya */}
            <div className="flex justify-center -mt-2 mb-4">
              <DiyaSvg size="lg" />
            </div>

            <span className="inline-block px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide mb-3">
              ✨ दीपावली की हार्दिक शुभकामनाएं ✨
            </span>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 leading-tight mb-2 drop-shadow-[0_2px_12px_rgba(255,183,3,0.3)]">
              Happy Diwali, {receiverName}!
            </h1>

            <p className="text-amber-200/90 text-sm sm:text-base font-medium mb-6">
              With affectionate wishes from <span className="text-white font-bold">{senderName}</span> 💝
            </p>

            {/* Custom Message Card */}
            {message ? (
              <div className="rounded-2xl bg-amber-500/10 border border-amber-400/25 p-4 sm:p-5 mb-6 text-amber-100 text-sm sm:text-base italic leading-relaxed">
                "{message}"
              </div>
            ) : null}

            {/* Traditional Blessing */}
            <div className="space-y-1 text-sm sm:text-base text-yellow-100/80 mb-6">
              <p>May the divine glow of diyas illuminate your life with</p>
              <p className="text-amber-300 font-semibold">Health, Wealth, Happiness & Endless Prosperity!</p>
            </div>

            {/* Trio of glowing diyas */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <DiyaSvg size="sm" />
              <DiyaSvg size="md" />
              <DiyaSvg size="sm" />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={handleCreateNewWish}
                className="flex-1 min-h-[48px] py-3 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-stone-950 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-transform active:scale-95 hover:brightness-105"
              >
                <Sparkles className="w-4 h-4" />
                Create Your Own Wish
              </button>

              <button
                type="button"
                onClick={() => {
                  const url = window.location.href;
                  navigator.clipboard.writeText(url);
                  showToast('Wish link copied!');
                }}
                className="min-h-[48px] py-3 px-5 rounded-xl text-sm font-semibold bg-white/10 hover:bg-white/15 border border-white/20 text-white flex items-center justify-center gap-2 transition-colors active:scale-95"
              >
                <Copy className="w-4 h-4 text-amber-300" />
                Copy Greeting
              </button>
            </div>
          </div>
        </main>
      ) : (
        /* ============================================================== */
        /* CREATE MODE: Default View to make & share wishes               */
        /* ============================================================== */
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 pt-20 pb-20 max-w-3xl mx-auto w-full">
          {/* Hero Section */}
          <header className="text-center mb-8 sm:mb-10 animate-entrance-up">
            <div className="flex justify-center mb-3">
              <DiyaSvg size="lg" />
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Festival of Lights {new Date().getFullYear()}
            </div>

            <h1
              className="font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 tracking-tight leading-none mb-3 drop-shadow-[0_2px_18px_rgba(255,183,3,0.35)]"
              style={{ fontSize: 'clamp(2.4rem, 7vw, 4.8rem)' }}
            >
              Happy Diwali
            </h1>

            <p className="text-amber-200/90 text-sm sm:text-lg font-medium">
              दीपावली की हार्दिक शुभकामनाएं 🪔 Create & Share Personalized Wishes
            </p>
          </header>

          {/* Form Card */}
          <section className="w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#1c0128]/85 to-[#0b0014]/90 border border-amber-400/30 p-6 sm:p-8 shadow-2xl shadow-amber-500/10 backdrop-blur-md mb-8 animate-entrance-up">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="sender" className="block text-xs font-semibold text-amber-200/80 mb-1.5 uppercase tracking-wide">
                  Your Name (From) *
                </label>
                <input
                  id="sender"
                  type="text"
                  required
                  maxLength={40}
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-black/40 border border-amber-400/30 text-white placeholder-amber-100/30 text-sm sm:text-base focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="receiver" className="block text-xs font-semibold text-amber-200/80 mb-1.5 uppercase tracking-wide">
                  Recipient's Name (To) *
                </label>
                <input
                  id="receiver"
                  type="text"
                  required
                  maxLength={40}
                  value={receiverName}
                  onChange={(e) => setReceiverName(e.target.value)}
                  placeholder="e.g. Priya & Family"
                  className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-black/40 border border-amber-400/30 text-white placeholder-amber-100/30 text-sm sm:text-base focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="customMessage" className="block text-xs font-semibold text-amber-200/80 mb-1.5 uppercase tracking-wide">
                  Personal Message (Optional)
                </label>
                <textarea
                  id="customMessage"
                  rows={3}
                  maxLength={200}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Wishing you good health, abundant success, and peace this Diwali!"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-amber-400/30 text-white placeholder-amber-100/30 text-sm sm:text-base focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full min-h-[50px] py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-stone-950 flex items-center justify-center gap-2 shadow-xl shadow-amber-500/25 transition-transform active:scale-98 hover:brightness-105"
              >
                <Send className="w-5 h-5 text-stone-950" />
                Generate & Share Wish 🪔
              </button>
            </form>
          </section>

          {/* Recent Wishes Section */}
          {wishes.length > 0 && (
            <section className="w-full max-w-lg rounded-3xl bg-black/40 border border-amber-400/20 p-5 sm:p-6 backdrop-blur-md animate-entrance-up">
              <h2 className="text-base sm:text-lg font-bold text-amber-300 mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-400" />
                Recent Wishes ({wishes.length})
              </h2>
              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {wishes.map((w, idx) => (
                  <div
                    key={w._id || w.id || idx}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3 text-xs sm:text-sm transition-colors hover:bg-white/10"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-lg flex-shrink-0">🪔</span>
                      <div className="min-w-0">
                        <p className="font-semibold text-amber-200 truncate">
                          {w.from} → {w.to}
                        </p>
                        {w.message && (
                          <p className="text-white/70 text-xs truncate mt-0.5 italic">"{w.message}"</p>
                        )}
                      </div>
                    </div>
                    <Heart className="w-4 h-4 text-rose-400 flex-shrink-0 fill-rose-400/40" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Footer Quote */}
          <footer className="mt-8 text-center text-xs sm:text-sm text-amber-200/60 font-medium">
            ✨ Share the divine light with everyone you love ✨
          </footer>
        </main>
      )}
    </div>
  );
}
