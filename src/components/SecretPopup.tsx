import { X, Gift } from 'lucide-react';

interface SecretPopupProps {
  message: string;
  onClose: () => void;
}

export default function SecretPopup({ message, onClose }: SecretPopupProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-rose-400 hover:text-rose-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center">
          <Gift className="w-16 h-16 mx-auto mb-4 text-rose-500 animate-bounce" />
          <h3 className="text-2xl font-bold text-rose-600 mb-4 font-serif">
            Secret Unlocked! 🎉
          </h3>
          <p className="text-rose-700 leading-relaxed whitespace-pre-line">
            {message}
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-gradient-to-r from-rose-400 to-pink-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all hover:scale-105"
        >
          Continue Exploring!
        </button>
      </div>
    </div>
  );
}
