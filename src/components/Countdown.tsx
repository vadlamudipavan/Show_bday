import { useState, useEffect } from 'react';
import { Gift } from 'lucide-react';
import Fireworks from './Fireworks';

interface CountdownProps {
  targetDate: Date;
  onCountdownComplete: () => void;
}

export default function Countdown({ targetDate, onCountdownComplete }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isComplete, setIsComplete] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference <= 0) {
        setIsComplete(true);
        setShowFireworks(true);
        setTimeout(() => {
          onCountdownComplete();
        }, 5000);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate, onCountdownComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-purple-100 to-pink-100 flex items-center justify-center relative overflow-hidden">
      {showFireworks && <Fireworks autoPlay intensity="heavy" />}

      <div className="text-center z-10">
        {!isComplete ? (
          <>
            <Gift className="w-24 h-24 mx-auto mb-8 text-rose-600 animate-bounce" />
            <h1 className="text-5xl md:text-7xl font-bold text-rose-700 mb-6 font-serif">
              Coming Soon!
            </h1>
            <p className="text-2xl text-rose-600 mb-12">
              Your Birthday Surprise Awaits...
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
                <div className="text-4xl md:text-5xl font-bold text-rose-600 mb-2">
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
                <p className="text-rose-500 font-semibold">Days</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
                <div className="text-4xl md:text-5xl font-bold text-rose-600 mb-2">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <p className="text-rose-500 font-semibold">Hours</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
                <div className="text-4xl md:text-5xl font-bold text-rose-600 mb-2">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <p className="text-rose-500 font-semibold">Minutes</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
                <div className="text-4xl md:text-5xl font-bold text-rose-600 mb-2">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <p className="text-rose-500 font-semibold">Seconds</p>
              </div>
            </div>

            <p className="mt-12 text-rose-500 text-lg animate-pulse">
              Get ready for something special! 🎉
            </p>
          </>
        ) : (
          <div className="animate-scale-in">
            <Gift className="w-32 h-32 mx-auto mb-8 text-rose-600 animate-bounce" />
            <h1 className="text-6xl md:text-7xl font-bold text-rose-700 mb-6 font-serif">
              It's Time! 🎉
            </h1>
            <p className="text-2xl text-rose-600">
              Let the celebration begin!
            </p>
          </div>
        )}
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-up"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${20 + Math.random() * 10}s`,
            }}
          >
            <div className="text-4xl animate-spin-slow">
              {['🎂', '🎉', '🎈', '🎁', '💝'][Math.floor(Math.random() * 5)]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
