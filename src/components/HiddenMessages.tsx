import { useState } from 'react';
import { Eye, EyeOff, Sparkles } from 'lucide-react';

interface HiddenMessagesProps {
  onComplete: () => void;
  onSecretFound: (message: string) => void;
}

export default function HiddenMessages({ onComplete, onSecretFound }: HiddenMessagesProps) {
  const [revealedMessages, setRevealedMessages] = useState<number[]>([]);
  const [foundSecret, setFoundSecret] = useState(false);

  const messages = [
    { hidden: 'S★I★S★T★E★R', revealed: 'You are my FOREVER friend!more of a sister anuko but i like more as a friend version 💕' },
    { hidden: 'B★E★S★T★I★E', revealed: 'No one gets me like you do!More irritated more funny HeHe... 🌟' },
    { hidden: 'L★O★V★E★Y★O★U', revealed: 'To the moon and back, always! 🌙' },
    { hidden: 'T★H★A★N★K★S', revealed: 'For being YOU every single day! 🦋' },
  ];

  const revealMessage = (index: number) => {
    if (!revealedMessages.includes(index)) {
      setRevealedMessages([...revealedMessages, index]);

      if (revealedMessages.length + 1 === messages.length) {
        setTimeout(() => {
          onComplete();
          if (!foundSecret) {
            onSecretFound('Rahasyam #7: Arre wow anni open cheshnava nice,baa desperate unnav ok continue ikkadi daka ochav kadha thanks choosthunanduku');
            setFoundSecret(true);
          }
        }, 1000);
      }
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Sparkles className="w-12 h-12 mx-auto mb-4 text-rose-500" />
          <h2 className="text-4xl md:text-5xl font-bold text-rose-600 mb-4 font-serif">
            Hidden Messages
          </h2>
          <p className="text-rose-400">
            👁️ Phone lo open chesav anuko maza undadhu so please open it in laptop and place your mouse on each tile... mouse ante rat kadhu cursor papa... 
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all relative overflow-hidden group cursor-pointer"
              onMouseEnter={() => revealMessage(index)}
              onClick={() => revealMessage(index)}
            >
              <div className="absolute top-4 right-4">
                {revealedMessages.includes(index) ? (
                  <Eye className="w-5 h-5 text-rose-400" />
                ) : (
                  <EyeOff className="w-5 h-5 text-rose-300" />
                )}
              </div>

              <div className="relative h-24 flex items-center justify-center">
                {!revealedMessages.includes(index) ? (
                  <p className="text-3xl font-bold text-rose-300 tracking-wider opacity-50 group-hover:opacity-100 transition-opacity">
                    {message.hidden}
                  </p>
                ) : (
                  <p className="text-xl text-rose-600 font-medium text-center animate-fade-in leading-relaxed">
                    {message.revealed}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-gradient-to-r from-rose-200 to-pink-200 p-6 rounded-xl">
            <p className="text-rose-700 text-lg">
              💌 Open chesinavi: {revealedMessages.length}/{messages.length}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
