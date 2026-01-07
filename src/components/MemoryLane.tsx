import { useState, useEffect } from 'react';
import { Camera, Heart } from 'lucide-react';

interface MemoryLaneProps {
  onComplete: () => void;
  onSecretFound: (message: string) => void;
}

export default function MemoryLane({ onComplete, onSecretFound }: MemoryLaneProps) {
  const [activeMemory, setActiveMemory] = useState<number | null>(null);
  const [likedMemories, setLikedMemories] = useState<number[]>([]);
  const [secretClicks, setSecretClicks] = useState(0);

  const memories = [
    { year: 'B.Tech', text: 'Being as an introvert, i didnt know how to speak with you 1 year tharuvatha bokkale ela close ayyamo kuda teledhu', color: 'from-pink-300 to-rose-300' },
    { year: 'Office', text: 'Phase where i missed you in the office i know anukuntu untav bokkale nik gang ledha ofc lo ani untunde ,but i missed your presence at that time', color: 'from-rose-300 to-pink-400' },
    { year: 'Thousand Miles Apart', text: 'You dont know much about me how i am here and whats going on, but i always wanted to know whats going on there in ind becasue i always care for u❤️ i will...!', color: 'from-pink-400 to-purple-400' },
    { year: 'Today', text: 'Still as a sister, lets make memories always welcome i will all your stuff and gossips i am all ears😉', color: 'from-purple-400 to-rose-500' },
  ];

  useEffect(() => {
    if (likedMemories.length === memories.length) {
      setTimeout(onComplete, 1500);
    }
  }, [likedMemories, memories.length, onComplete]);

  const handleLike = (index: number) => {
    if (!likedMemories.includes(index)) {
      setLikedMemories([...likedMemories, index]);
    }
  };

  const handleCameraClick = () => {
    setSecretClicks(prev => prev + 1);
    if (secretClicks === 2) {
      onSecretFound('Rahasyam #6: 📸 eppudu nene thiyyali ni pics sodii 100gb storage unna saripodhu niku and ,Every moment with you is picture-perfect!');
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-transparent to-rose-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-5xl font-bold text-rose-600 mb-4 font-serif">
              Glimpse of Our Timeline
            </h2>
            <button
              onClick={handleCameraClick}
              className="absolute top-1/2 -right-16 transform -translate-y-1/2 group"
              title="Mudu sarlu kottu oka surprise osthadi..."
            >
              <Camera
                className="w-10 h-10 text-rose-500 cursor-pointer hover:scale-125 transition-transform drop-shadow-lg hover:text-rose-600 animate-bounce"
              />
            </button>
          </div>
          <p className="text-rose-400 text-sm">
            💝 Ala choosi odileyyaku abba click cheyyi... give it a heart!
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-rose-300 to-purple-300" />

          {memories.map((memory, index) => (
            <div
              key={index}
              className={`relative mb-12 ${index % 2 === 0 ? 'md:mr-auto md:pr-12 md:w-1/2' : 'md:ml-auto md:pl-12 md:w-1/2'}`}
            >
              <div
                className={`bg-gradient-to-br ${memory.color} p-6 rounded-2xl shadow-lg cursor-pointer transform transition-all hover:scale-105 ${
                  activeMemory === index ? 'scale-105 shadow-2xl' : ''
                }`}
                onClick={() => setActiveMemory(index)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-white">{memory.year}</h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(index);
                    }}
                    className="transition-transform hover:scale-125"
                  >
                    <Heart
                      className={`w-6 h-6 ${
                        likedMemories.includes(index)
                          ? 'fill-red-500 text-red-500'
                          : 'text-white'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-white/90">{memory.text}</p>
              </div>

              <div className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-rose-400 rounded-full border-4 border-white shadow-lg"
                style={{
                  [index % 2 === 0 ? 'right' : 'left']: '-2.5rem',
                }}
              />
            </div>
          ))}
        </div>

        {likedMemories.length === memories.length && (
          <p className="text-center mt-8 text-rose-500 animate-pulse">
            ✨ Since you liked all of the above this page will close in 10 Secs, Bokkale kindaki elluu... ✨
          </p>
        )}
      </div>
    </section>
  );
}
