import { useState, useEffect } from 'react';
import { Heart, Star, Gift } from 'lucide-react';

interface HeroSectionProps {
  onSecretFound: (message: string) => void;
}

export default function HeroSection({ onSecretFound }: HeroSectionProps) {
  const [heartClicks, setHeartClicks] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleHeartClick = () => {
    setHeartClicks(prev => prev + 1);
    if (heartClicks === 4) {
      onSecretFound('Rahasyam #1: Eewww bane kanipettav👌 You clicked my heart 5 times! Just like the 5 letters in SMILE, which is what you always bring to my face! 😊');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden">
      <div className="absolute top-10 right-10 cursor-pointer hover:scale-110 transition-transform" onClick={handleHeartClick}>
        <Heart className={`w-8 h-8 ${heartClicks > 0 ? 'text-red-500 fill-red-500' : 'text-rose-400'}`} />
      </div>

      <div className="absolute top-10 left-10 animate-spin-slow">
        <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {showMessage && (
          <div className="animate-fade-in">
            <Gift className="w-20 h-20 mx-auto mb-8 text-rose-500 animate-bounce" />

            <h1 className="text-5xl md:text-7xl font-bold text-rose-600 mb-6 font-serif animate-slide-up">
              To My Amazing Show Pilla
            </h1>

            <p className="text-xl md:text-2xl text-rose-500 mb-8 leading-relaxed animate-slide-up delay-100">
              Eroju ni dinam !😅 Sorry I mean Today is YOUR day, A day to celebrate the incredible person you are,   the beautiful soul that lights up every room, and the best sister in the universe! ante alanti universe inka create avvaledhu kabbati ippatike ithe ala anesko😁 🌟
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                { emoji: '🎂', text: 'Another year wiser' },
                { emoji: '💖', text: 'Forever my favorite person' },
                { emoji: '✨', text: 'Shine bright today,tomorrow and forever' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 cursor-pointer animate-slide-up"
                  style={{ animationDelay: `${idx * 100 + 200}ms` }}
                >
                  <div className="text-4xl mb-3">{item.emoji}</div>
                  <p className="text-rose-700 font-medium">{item.text}</p>
                </div>
              ))}
            </div>

            <p className="mt-12 text-sm text-rose-400 animate-pulse">
              ✨ Kindaki Scroll cheyyi inka surprises untayi... there is a secret hidden everywhere! So vethuku ✨
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
