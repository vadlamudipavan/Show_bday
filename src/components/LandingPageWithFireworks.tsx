import { useState, useEffect } from 'react';
import { Cake, Sparkles } from 'lucide-react';
import Fireworks from './Fireworks';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  const [clicks, setClicks] = useState(0);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setClicks(prev => prev + 1);
    if (clicks >= 2) {
      setTimeout(onStart, 500);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-rose-300 flex items-center justify-center relative overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      <Fireworks autoPlay intensity="light" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            <Sparkles className="text-pink-400 opacity-40" size={20} />
          </div>
        ))}
      </div>

      <div className="text-center z-10 animate-bounce pointer-events-none">
        <Cake className="w-24 h-24 mx-auto mb-6 text-rose-600" strokeWidth={1.5} />
        <h1 className="text-6xl font-bold text-rose-700 mb-4 font-serif">
          Happy Birthday
        </h1>
        <p className="text-2xl text-rose-600 mb-8">Dear Sister! 💖</p>
        {showHint && (
          <p className="text-sm text-rose-500 animate-pulse">
            {clicks === 0 && "✨ Click anywhere to begin the journey ✨"}
            {clicks === 1 && "✨ One more click... ✨"}
            {clicks === 2 && "🎉 Opening your special surprise! 🎉"}
          </p>
        )}
      </div>
    </div>
  );
}
