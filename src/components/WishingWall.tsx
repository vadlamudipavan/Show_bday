import { useState } from 'react';
import { Star, Wand2 } from 'lucide-react';

interface WishingWallProps {
  onComplete: () => void;
  onSecretFound: (message: string) => void;
}

export default function WishingWall({ onComplete, onSecretFound }: WishingWallProps) {
  const [clickedWishes, setClickedWishes] = useState<number[]>([]);
  const [wandClicks, setWandClicks] = useState(0);

  const wishes = [
    'May all your dreams come true this year!, and may god bless you whatever you wish for 🌟 happy aa korukunna...',
    'Health, happiness, and endless joy! 💖',
    'Adventures and beautiful memories ahead! 🦋',
    'Love that grows stronger each day! 💝',
    'Success in everything you do! ⭐',
    'Laughter that never ends! 😊 ante smile without a reason',
    'Courage to chase your dreams! 🚀 rocket laga pike eguru',
    'Peace and contentment always! 🕊️jaara kopam thagginchuko',
  ];

  const handleWishClick = (index: number) => {
    if (!clickedWishes.includes(index)) {
      setClickedWishes([...clickedWishes, index]);

      if (clickedWishes.length + 1 === wishes.length) {
        setTimeout(onComplete, 1500);
      }
    }
  };

  const handleWandClick = () => {
    setWandClicks(prev => prev + 1);
    if (wandClicks === 2) {
      onSecretFound('Rahasyam #8: ✨ You found the magic wand🪄! May all your wishes come true, now and always!');
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-rose-50 to-purple-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 relative">
          <h2 className="text-4xl md:text-5xl font-bold text-rose-600 mb-4 font-serif">
            Birthday Wishes For You
          </h2>
          <Wand2
            className="absolute -top-6 right-1/4 w-8 h-8 text-purple-500 cursor-pointer hover:rotate-12 transition-transform animate-pulse"
            onClick={handleWandClick}
          />
          <p className="text-rose-400">
            ⭐ ide kuda ala kaliga unchithe em bavuntadhi jara star ichuko nakosam
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishes.map((wish, index) => (
            <div
              key={index}
              onClick={() => handleWishClick(index)}
              className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-500 ${
                clickedWishes.includes(index)
                  ? 'bg-gradient-to-br from-yellow-200 via-rose-200 to-purple-200 shadow-2xl scale-105'
                  : 'bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <Star
                  className={`w-8 h-8 mb-3 transition-all duration-500 ${
                    clickedWishes.includes(index)
                      ? 'text-yellow-500 fill-yellow-500 animate-spin-slow'
                      : 'text-rose-300'
                  }`}
                />
                <p className={`text-sm leading-relaxed ${
                  clickedWishes.includes(index) ? 'text-rose-700 font-medium' : 'text-rose-600'
                }`}>
                  {wish}
                </p>
              </div>

              {clickedWishes.includes(index) && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-white/60 backdrop-blur-sm p-4 rounded-xl">
            <p className="text-rose-600">
              ✨ lekkalo weak aa 8/8 avvali: {clickedWishes.length}/{wishes.length} ✨
            </p>
          </div>
        </div>

        {clickedWishes.length === wishes.length && (
          <p className="text-center mt-8 text-purple-600 text-lg animate-bounce">
            🎊 Nen cheppinattu annitike star ichav mari surprise odda...?? vethuku 🎊
          </p>
        )}
      </div>
    </section>
  );
}
