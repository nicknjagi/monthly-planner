import { Download } from 'lucide-react';
import React, { useEffect, useState } from 'react';

// Define the type for the BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
  }>;
}

const isIphone = () => {
  const platform = navigator.userAgent.toLowerCase();
  return platform.includes('iphone') || platform.includes('ipad') 
};

const InstallButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  // State to control the visibility of the Install button
  const [showInstallButton, setShowInstallButton] = useState<boolean>(() =>{
    // Check if the app has been installed before
    const isAppInstalled = localStorage.getItem('appInstalled') === 'true';
    return !isAppInstalled && !window.matchMedia('(display-mode: standalone)').matches && !isIphone
  });


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
  
  useEffect(() => {
    const handleAppInstalled = () => {
      console.log('App installed successfully.');
      localStorage.setItem('appInstalled', 'true');
      setShowInstallButton(false);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('appinstalled', handleAppInstalled);
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
    <div className='flex justify-end '>
      {showInstallButton  && (
          <button className="flex gap-1 items-center px-4 py-2 rounded-full bg-forrest-green hover:bg-opacity-90 transition translate-y-6 text-white mx-2 -mt-4 shadow-md shadow-green-50" onClick={installApp}>
            <Download size={16} />
            Install <span className="hidden md:inline-block"> the app</span>
          </button>
      )}
    </div>
  );
};

export default InstallButton;
