import { useState } from 'react';
import HeroSection from './HeroSection';
import InteractiveCards from './InteractiveCards';
import MemoryLane from './MemoryLane';
import HiddenMessages from './HiddenMessages';
import WishingWall from './WishingWall';
import SecretGarden from './SecretGarden';

interface MainContentProps {
  onSecretFound: (message: string) => void;
}

export default function MainContent({ onSecretFound }: MainContentProps) {
  const [unlockedSections, setUnlockedSections] = useState(1);

  const unlockNextSection = () => {
    setUnlockedSections(prev => Math.min(prev + 1, 6));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-50 to-purple-50">
      <HeroSection onSecretFound={onSecretFound} />

      {unlockedSections >= 1 && (
        <InteractiveCards
          onComplete={unlockNextSection}
          onSecretFound={onSecretFound}
        />
      )}

      {unlockedSections >= 2 && (
        <MemoryLane
          onComplete={unlockNextSection}
          onSecretFound={onSecretFound}
        />
      )}

      {unlockedSections >= 3 && (
        <HiddenMessages
          onComplete={unlockNextSection}
          onSecretFound={onSecretFound}
        />
      )}

      {unlockedSections >= 4 && (
        <WishingWall
          onComplete={unlockNextSection}
          onSecretFound={onSecretFound}
        />
      )}

      {unlockedSections >= 5 && (
        <SecretGarden onSecretFound={onSecretFound} />
      )}
    </div>
  );
}
