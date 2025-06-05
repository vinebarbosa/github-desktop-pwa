'use client';

import { Button } from '@/modules/shared/components/ui/button';
import { ArrowDownCircleIcon } from '@/modules/shared/icons/arrow-down-circle';
import React, { useEffect, useState, useRef } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function InstallAppButton() {
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

  if (!showInstallButton) {
    return null;
  }

  return (
    <Button
      onClick={handleInstallClick}
      variant="link"
      className="text-white [&>svg]:size-6 -tracking-[5.25%] h-fit"
    >
      <ArrowDownCircleIcon />
      Instalar PWA
    </Button>
  );
}
