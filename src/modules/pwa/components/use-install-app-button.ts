import { useEffect, useRef, useState } from 'react';

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function useInstallAppButton() {
  const [showInstallButton, setShowInstallButton] = useState(false);
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone
    ) {
      setShowInstallButton(false);
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      console.log('Evento beforeinstallprompt disparado. PWA é instalável.');
      deferredPrompt.current = e as BeforeInstallPromptEvent;
      setShowInstallButton(true);
    };

    const handleAppInstalled = () => {
      console.log('PWA foi instalado com sucesso!');
      setShowInstallButton(false);
      deferredPrompt.current = null;
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt.current) {
      deferredPrompt.current.prompt();

      const { outcome } = await deferredPrompt.current.userChoice;
      console.log(`Resposta do usuário ao prompt de instalação: ${outcome}`);

      if (outcome === 'dismissed') {
        setShowInstallButton(false);
      }

      deferredPrompt.current = null;
    }
  };


  return {
    handleInstallClick,
    showInstallButton
  }
}
