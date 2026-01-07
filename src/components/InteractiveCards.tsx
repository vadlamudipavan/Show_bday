import { useState, useEffect } from 'react';
import { Smile, Music, BookHeart, Coffee } from 'lucide-react';

interface InteractiveCardsProps {
  onComplete: () => void;
  onSecretFound: (message: string) => void;
}

export default function InteractiveCards({ onComplete, onSecretFound }: InteractiveCardsProps) {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const cards = [
    {
      icon: Smile,
      front: 'Your Smile',
      back: 'Barre navvu i know ippudu kuda navvuthu choosthav Ya keep that smile bright always',
      secret: 'Rahasyam #2: Aa smile kosam entha fool ina itha lee🙂'
    },
    {
      icon: Music,
      front: 'yOur Songs',
      back: 'meeThi si wo gaali teri sunne ko taiyaar hoon main tera yaar hoon main tera yaar hoon main tera yaar hoon...',
      secret: 'Rahasyam #3: I still remember ee song nuvvu paduthunte entha bavuntadhoo... ala choodali anipisthadi feel itha padthav ga kudirthe ni pellike pedatha aa song 🎵'
    },
    {
      icon: BookHeart,
      front: 'Shared Stories',
      back: 'Every chapter of life is better with you as my sister and best friend!',
      secret: 'Rahasyam #4: I think i can say i knw everything about you in and out ! 📖'
    },
    {
      icon: Coffee,
      front: 'Chit Chat',
      back: 'Our conversations are priceless. Thank you for always listening! actually i am the one who listens more🧐 right',
      secret: 'Rahasyam #5: Talking to you when i am stressed is much more comfy than anything ☕'
    }
  ];

  const handleCardClick = (index: number) => {
    if (flippedCards.includes(index)) {
      setFlippedCards(flippedCards.filter(i => i !== index));
    } else {
      setFlippedCards([...flippedCards, index]);
    }
  };

  const handleCardDoubleClick = (index: number) => {
    onSecretFound(cards[index].secret);
  };

  useEffect(() => {
    if (flippedCards.length === cards.length) {
      setTimeout(onComplete, 2000);
    }
  }, [flippedCards, cards.length, onComplete]);

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-rose-600 mb-4 font-serif">
          Things I Love About You
        </h2>
        <p className="text-center text-rose-400 mb-12 text-sm">
          💡 oka pani cheyyi: oka sare click chesav anuko flip ithayi, ade two times chesav anuko hehe choodu nuvve...😁
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="relative h-64 cursor-pointer perspective-1000"
              onClick={() => handleCardClick(index)}
              onDoubleClick={() => handleCardDoubleClick(index)}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className={`relative w-full h-full transition-all duration-500 transform-style-3d ${
                  flippedCards.includes(index) ? 'rotate-y-180' : ''
                } ${hoveredCard === index ? 'scale-105' : ''}`}
              >
                <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl shadow-xl flex flex-col items-center justify-center p-6 text-white">
                  <card.icon className="w-16 h-16 mb-4" />
                  <h3 className="text-xl font-bold text-center">{card.front}</h3>
                </div>

                <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-purple-400 to-rose-500 rounded-2xl shadow-xl rotate-y-180 flex items-center justify-center p-6 text-white">
                  <p className="text-center leading-relaxed">{card.back}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {flippedCards.length === cards.length && (
          <p className="text-center mt-8 text-rose-500 animate-bounce">
            🎉 Manchide ikkadi daka ochav ga kindaki kuda vellu... 🎉
          </p>
        )}
      </div>
    </section>
  );
}
