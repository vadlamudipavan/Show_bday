import { useState, useEffect } from 'react';
import { Heart, Star, Sparkles } from 'lucide-react';

export default function FloatingElements() {
  const [elements] = useState(() =>
    [...Array(15)].map((_, i) => ({
      id: i,
      type: i % 3 === 0 ? 'heart' : i % 3 === 1 ? 'star' : 'sparkle',
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10,
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {elements.map((el) => {
        const Icon = el.type === 'heart' ? Heart : el.type === 'star' ? Star : Sparkles;
        return (
          <div
            key={el.id}
            className="absolute animate-float-up opacity-30"
            style={{
              left: `${el.left}%`,
              animationDelay: `${el.delay}s`,
              animationDuration: `${el.duration}s`,
            }}
          >
            <Icon
              className={`${
                el.type === 'heart'
                  ? 'text-rose-400'
                  : el.type === 'star'
                  ? 'text-yellow-400'
                  : 'text-purple-400'
              }`}
              size={20}
            />
          </div>
        );
      })}
    </div>
  );
}
