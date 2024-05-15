import { Download } from 'lucide-react';
import React, { useEffect, useState } from 'react';

// Define the type for the BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
  }>;
}


const InstallButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  // State to control the visibility of the Install button
  const [showInstallButton, setShowInstallButton] = useState<boolean>(() =>!window.matchMedia('(display-mode: standalone)').matches);


  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Use a type assertion to treat the event as a BeforeInstallPromptEvent
      const beforeInstallPromptEvent = e as BeforeInstallPromptEvent;
      beforeInstallPromptEvent.preventDefault();
      setDeferredPrompt(beforeInstallPromptEvent); 
      // Show the Install button when the BeforeInstallPromptEvent is fired
      setShowInstallButton(true);
    };
  
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);


  const installApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      setDeferredPrompt(null); 
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt.');
      } else if (outcome === 'dismissed') {
        console.log('User dismissed the install prompt');
      }
      setShowInstallButton(false);
    }
  };

  return (
    <div className='flex justify-end absolute top-0 right-0'>
      {showInstallButton  && (
          <button className="flex gap-1 items-center px-4 py-1 rounded-full bg-forrest-green hover:bg-opacity-90 text-white m-2" onClick={installApp}>
            <Download size={16} />
            Install <span className="hidden md:inline-block"> the app</span>
          </button>
      )}
    </div>
  );
};

export default InstallButton;
