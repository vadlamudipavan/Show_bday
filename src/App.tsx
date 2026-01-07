import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import MainContent from './components/MainContent';
import FloatingElements from './components/FloatingElements';
import SecretPopup from './components/SecretPopup';

function App() {
  const [started, setStarted] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [secretMessage, setSecretMessage] = useState('');
  const [konami, setKonami] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const newKonami = [...konami, e.key];
      if (newKonami.join('').includes('sister')) {
        setSecretMessage('You found the secret code! You\'re the best sister anyone could ask for! 💝');
        setShowSecret(true);
        setKonami([]);
      } else {
        setKonami(newKonami.slice(-10));
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [konami]);

  return (
    <div className="relative overflow-x-hidden">
      {!started ? (
        <LandingPage onStart={() => setStarted(true)} />
      ) : (
        <>
          <MainContent onSecretFound={(msg) => {
            setSecretMessage(msg);
            setShowSecret(true);
          }} />
          <FloatingElements />
        </>
      )}
      {showSecret && (
        <SecretPopup
          message={secretMessage}
          onClose={() => setShowSecret(false)}
        />
      )}
    </div>
  );
}

export default App;
