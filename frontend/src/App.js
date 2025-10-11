import React, { useState, useEffect, useRef } from 'react';
import { Heart, Send, Users, Share2, Copy, Check, TrendingUp, Instagram } from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || window.location.origin + '/api';

export default function App() {
  const [senderName, setSenderName] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [message, setMessage] = useState('');
  const [showWish, setShowWish] = useState(false);
  const [wishes, setWishes] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState('create');
  const [counters, setCounters] = useState({ created: 0, opened: 0 });
  const canvasRef = useRef(null);

  // Fetch counters on load
  useEffect(() => {
    fetchCounters();
  }, []);

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
      setShowWish(true);
      
      // Increment opened counter
      incrementCounter('opened');
    }
  }, []);

  const fetchCounters = async () => {
    try {
      const response = await fetch(`${API_URL}/counters`);
      const data = await response.json();
      setCounters(data);
    } catch (error) {
      console.error('Error fetching counters:', error);
    }
  };

  const incrementCounter = async (type) => {
    try {
      const response = await fetch(`${API_URL}/counters/${type}`, {
        method: 'POST'
      });
      const data = await response.json();
      fetchCounters(); // Refresh counters
    } catch (error) {
      console.error('Error incrementing counter:', error);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = {
          x: (Math.random() - 0.5) * 8,
          y: (Math.random() - 0.5) * 8
        };
        this.alpha = 1;
        this.friction = 0.95;
        this.gravity = 0.3;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      update() {
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        this.velocity.y += this.gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.01;
      }
    }

    class Diya {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.flicker = 0;
        this.flickerSpeed = 0.1;
      }

      draw() {
        this.flicker += this.flickerSpeed;
        const flickerOffset = Math.sin(this.flicker) * 2;

        ctx.fillStyle = '#D2691E';
        ctx.beginPath();
        ctx.ellipse(this.x, this.y + 15, 20, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        const gradient = ctx.createRadialGradient(
          this.x, this.y + flickerOffset, 0,
          this.x, this.y + flickerOffset, 30
        );
        gradient.addColorStop(0, 'rgba(255, 200, 0, 0.8)');
        gradient.addColorStop(0.3, 'rgba(255, 100, 0, 0.4)');
        gradient.addColorStop(1, 'rgba(255, 50, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y + flickerOffset, 30, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFA500';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - 15 + flickerOffset);
        ctx.bezierCurveTo(
          this.x - 8, this.y - 5 + flickerOffset,
          this.x - 5, this.y + 5,
          this.x, this.y + 10
        );
        ctx.bezierCurveTo(
          this.x + 5, this.y + 5,
          this.x + 8, this.y - 5 + flickerOffset,
          this.x, this.y - 15 + flickerOffset
        );
        ctx.fill();

        ctx.fillStyle = '#FFFF00';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - 10 + flickerOffset);
        ctx.bezierCurveTo(
          this.x - 4, this.y - 3 + flickerOffset,
          this.x - 3, this.y + 2,
          this.x, this.y + 5
        );
        ctx.bezierCurveTo(
          this.x + 3, this.y + 2,
          this.x + 4, this.y - 3 + flickerOffset,
          this.x, this.y - 10 + flickerOffset
        );
        ctx.fill();
      }
    }

    const diyas = [
      new Diya(150, canvas.height - 100),
      new Diya(canvas.width - 150, canvas.height - 100),
      new Diya(canvas.width / 2, canvas.height - 80)
    ];

    function createFirework(x, y) {
      const colors = ['#FFD700', '#FF6347', '#FF1493', '#00CED1', '#9370DB', '#32CD32'];
      const particleCount = 60;
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
      }
    }

    function animate() {
      ctx.fillStyle = 'rgba(10, 0, 30, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      diyas.forEach(diya => diya.draw());

      particles.forEach((particle, index) => {
        if (particle.alpha <= 0) {
          particles.splice(index, 1);
        } else {
          particle.update();
          particle.draw();
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    const fireworkInterval = setInterval(() => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * (canvas.height * 0.5);
      createFirework(x, y);
    }, 1500);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(fireworkInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSubmit = async () => {
    if (senderName.trim() && receiverName.trim()) {
      const newWish = {
        from: senderName.trim(),
        to: receiverName.trim(),
        message: message.trim(),
        timestamp: new Date().toLocaleString()
      };

      // Save to database
      try {
        await fetch(`${API_URL}/wishes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newWish)
        });
      } catch (error) {
        console.error('Error saving wish:', error);
      }

      setWishes(prev => [newWish, ...prev]);
      
      // Increment created counter
      await incrementCounter('created');
      
      const baseUrl = window.location.origin + window.location.pathname;
      const link = `${baseUrl}?from=${encodeURIComponent(senderName.trim())}&to=${encodeURIComponent(receiverName.trim())}${message.trim() ? '&msg=' + encodeURIComponent(message.trim()) : ''}`;
      setShareLink(link);
      setShowShareModal(true);
      
      setShowWish(true);
      setTimeout(() => setShowWish(false), 6000);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnInstagram = () => {
    const text = `🪔 Happy Diwali! 🎆\n\nI created a personalized Diwali wish for you!\n\n${shareLink}\n\nCreate your own wish at this amazing app by @ohi_abhist\n\n#HappyDiwali #Diwali2024 #FestivalOfLights`;
    
    // For mobile - try to open Instagram app
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      // Copy to clipboard and show instructions
      navigator.clipboard.writeText(text);
      alert('✅ Link copied! Now:\n1. Open Instagram\n2. Create a Story/Post\n3. Paste the text\n4. Tag @ohi_abhist\n\nHappy Diwali! 🪔');
    } else {
      // For desktop - open Instagram web
      navigator.clipboard.writeText(text);
      window.open('https://www.instagram.com/', '_blank');
      alert('✅ Text copied to clipboard!\n\nNow paste it in your Instagram post/story and tag @ohi_abhist\n\nHappy Diwali! 🪔');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      handleSubmit();
    }
  };

  const createNewWish = () => {
    window.history.pushState({}, '', window.location.pathname);
    setViewMode('create');
    setShowWish(false);
    setSenderName('');
    setReceiverName('');
    setMessage('');
  };

  // Counter Display Component
  const CounterDisplay = () => (
    <div 
      className="fixed bottom-4 left-4 z-50 p-4 rounded-2xl"
      style={{
        background: 'rgba(75, 0, 130, 0.4)',
        backdropFilter: 'blur(20px)',
        border: '2px solid rgba(255, 215, 0, 0.3)',
        boxShadow: '0 0 30px rgba(138, 43, 226, 0.4)'
      }}
    >
      <div className="flex items-center gap-3">
        <TrendingUp className="w-6 h-6 text-yellow-300" />
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="text-yellow-300 font-bold text-lg">{counters.created}</div>
            <div className="text-yellow-100 text-sm">Wishes Created</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-green-300 font-bold text-lg">{counters.opened}</div>
            <div className="text-yellow-100 text-sm">Wishes Opened</div>
          </div>
        </div>
      </div>
    </div>
  );

  // Instagram Handle Component
  const InstagramHandle = () => (
    <div 
      className="fixed bottom-4 right-4 z-50 p-3 rounded-2xl cursor-pointer transform hover:scale-105 transition-all"
      style={{
        background: 'linear-gradient(135deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
        boxShadow: '0 0 30px rgba(188, 24, 136, 0.5)'
      }}
      onClick={() => window.open('https://instagram.com/ohi_abhist', '_blank')}
    >
      <div className="flex items-center gap-2">
        <Instagram className="w-6 h-6 text-white" />
        <div className="text-white font-bold">@ohi_abhist</div>
      </div>
    </div>
  );

  if (viewMode === 'view') {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ background: 'linear-gradient(to bottom, #0a001e 0%, #1a0033 50%, #2d0a4a 100%)' }}
        />

        <CounterDisplay />
        <InstagramHandle />

        <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
          <div 
            className="p-12 rounded-3xl max-w-2xl mx-4 animate-fade-in"
            style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 50%, #FF4500 100%)',
              boxShadow: '0 0 80px rgba(255, 215, 0, 0.8)',
              border: '4px solid #FFFF00'
            }}
          >
            <div className="text-center text-white">
              <div className="text-8xl mb-6">🎆✨🎊</div>
              <h3 className="text-5xl font-bold mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                Happy Diwali, {receiverName}!
              </h3>
              <div className="text-2xl mb-6 font-semibold" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
                From: {senderName} 💝
              </div>
              {message && (
                <p className="text-xl mb-6 italic bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                  "{message}"
                </p>
              )}
              <p className="text-2xl mb-2">May your life be filled with</p>
              <p className="text-2xl mb-6">light, joy, and prosperity!</p>
              <div className="text-6xl mb-6">🪔🪔🪔</div>
              <button
                onClick={createNewWish}
                className="px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: '#4B0082',
                  boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)'
                }}
              >
                Create Your Own Wish
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'linear-gradient(to bottom, #0a001e 0%, #1a0033 50%, #2d0a4a 100%)' }}
      />

      <CounterDisplay />
      <InstagramHandle />

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
        <div className="text-center mb-12 animate-fade-in">
          <h1 
            className="text-6xl md:text-8xl font-bold mb-4"
            style={{
              color: '#FFD700',
              textShadow: '0 0 20px #FFD700, 0 0 40px #FF8C00, 0 0 60px #FF4500',
              animation: 'glow 2s ease-in-out infinite'
            }}
          >
            Happy Diwali
          </h1>
          <p className="text-2xl md:text-3xl text-yellow-200 font-semibold"
             style={{ textShadow: '0 0 10px rgba(255, 215, 0, 0.5)' }}>
            🪔 Create & Share Personalized Wishes 🪔
          </p>
        </div>

        <div 
          className="w-full max-w-md p-8 mb-8 rounded-3xl"
          style={{
            background: 'rgba(139, 69, 19, 0.3)',
            backdropFilter: 'blur(20px)',
            border: '3px solid rgba(255, 215, 0, 0.5)',
            boxShadow: '0 0 30px rgba(255, 215, 0, 0.3), inset 0 0 30px rgba(255, 140, 0, 0.1)'
          }}
        >
          <div className="text-center mb-6">
            <div className="text-7xl mb-4">🪔</div>
            <h2 className="text-3xl font-bold text-yellow-300 mb-2"
                style={{ textShadow: '0 0 10px rgba(255, 215, 0, 0.5)' }}>
              Create Your Wish
            </h2>
            <p className="text-yellow-100">Share the light of joy</p>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Your name (From)"
              className="w-full px-5 py-4 rounded-xl text-white placeholder-yellow-200 transition-all text-lg"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 215, 0, 0.3)',
                outline: 'none',
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.2)'
              }}
            />
            <input
              type="text"
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Recipient's name (To)"
              className="w-full px-5 py-4 rounded-xl text-white placeholder-yellow-200 transition-all text-lg"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 215, 0, 0.3)',
                outline: 'none',
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.2)'
              }}
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Personal message (optional)"
              rows="3"
              className="w-full px-5 py-4 rounded-xl text-white placeholder-yellow-200 transition-all text-lg resize-none"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 215, 0, 0.3)',
                outline: 'none',
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.2)'
              }}
            />
            <button
              onClick={handleSubmit}
              className="w-full py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all transform hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
                color: '#4B0082',
                boxShadow: '0 0 30px rgba(255, 215, 0, 0.5)',
                border: '2px solid #FFD700'
              }}
            >
              <Send className="w-6 h-6" />
              Create & Share
            </button>
          </div>
        </div>

        {showShareModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm p-4">
            <div 
              className="p-8 rounded-3xl max-w-lg w-full"
              style={{
                background: 'linear-gradient(135deg, #4B0082 0%, #8B008B 100%)',
                border: '3px solid rgba(255, 215, 0, 0.5)',
                boxShadow: '0 0 50px rgba(255, 215, 0, 0.5)'
              }}
            >
              <div className="text-center mb-6">
                <Share2 className="w-16 h-16 text-yellow-300 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-yellow-300 mb-2">Share Your Wish!</h3>
                <p className="text-yellow-100">Copy this link and send it to {receiverName}</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-4 break-all text-yellow-100 text-sm">
                {shareLink}
              </div>
              
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all transform hover:scale-105"
                    style={{
                      background: copied ? 'linear-gradient(135deg, #32CD32 0%, #228B22 100%)' : 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
                      color: '#fff',
                      boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)'
                    }}
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    {copied ? 'Copied!' : 'Copy Link'}
                  </button>
                  <button
                    onClick={() => setShowShareModal(false)}
                    className="py-3 px-6 rounded-xl font-bold transition-all"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#FFD700',
                      border: '2px solid rgba(255, 215, 0, 0.3)'
                    }}
                  >
                    Close
                  </button>
                </div>
                
                <button
                  onClick={shareOnInstagram}
                  className="w-full py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all transform hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
                    color: '#fff',
                    boxShadow: '0 0 20px rgba(188, 24, 136, 0.5)'
                  }}
                >
                  <Instagram className="w-5 h-5" />
                  Share on Instagram (@ohi_abhist)
                </button>
              </div>
            </div>
          </div>
        )}

        {showWish && !showShareModal && (
          <div className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none animate-bounce">
            <div 
              className="p-10 rounded-3xl max-w-lg mx-4"
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 50%, #FF4500 100%)',
                boxShadow: '0 0 60px rgba(255, 215, 0, 0.8)',
                border: '4px solid #FFFF00'
              }}
            >
              <div className="text-center text-white">
                <div className="text-7xl mb-4">🎆✨🎊</div>
                <h3 className="text-3xl font-bold mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                  Wish Created!
                </h3>
                <p className="text-lg">From {senderName} to {receiverName}</p>
                <div className="text-5xl mt-4">🪔🪔🪔</div>
              </div>
            </div>
          </div>
        )}

        {wishes.length > 0 && (
          <div className="w-full max-w-2xl">
            <div 
              className="p-6 rounded-3xl"
              style={{
                background: 'rgba(75, 0, 130, 0.3)',
                backdropFilter: 'blur(20px)',
                border: '2px solid rgba(255, 215, 0, 0.3)',
                boxShadow: '0 0 30px rgba(138, 43, 226, 0.3)'
              }}
            >
              <h3 className="text-2xl font-bold text-yellow-300 mb-4 flex items-center gap-2"
                  style={{ textShadow: '0 0 10px rgba(255, 215, 0, 0.5)' }}>
                <Users className="w-6 h-6" />
                Your Wishes ({wishes.length})
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {wishes.map((wish, index) => (
                  <div
                    key={wish.id || index}
                    className="rounded-xl p-4 transform hover:scale-105 transition-all"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 215, 0, 0.2)',
                      animation: `slideIn 0.5s ease-out ${index * 0.1}s both`
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">🪔</div>
                        <div>
                          <p className="text-yellow-200 font-semibold text-lg">
                            {wish.from} → {wish.to}
                          </p>
                          <p className="text-yellow-100 text-sm opacity-75">{wish.timestamp}</p>
                        </div>
                      </div>
                      <Heart className="w-6 h-6 text-red-400 fill-current animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 text-center">
          <p className="text-yellow-200 text-xl font-semibold"
             style={{ textShadow: '0 0 10px rgba(255, 215, 0, 0.5)', animation: 'glow 2s ease-in-out infinite' }}>
            ✨ Create personalized wishes and share them with your loved ones! ✨
          </p>
        </div>
      </div>

      <style>{`
        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 20px #FFD700, 0 0 40px #FF8C00, 0 0 60px #FF4500;
          }
          50% {
            text-shadow: 0 0 30px #FFD700, 0 0 60px #FF8C00, 0 0 90px #FF4500;
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1.5s ease-out;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(255, 215, 0, 0.5);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 215, 0, 0.7);
        }
      `}</style>
    </div>
  );
}
