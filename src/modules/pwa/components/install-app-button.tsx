'use client';

import { Button } from '@/modules/shared/components/ui/button';
import { ArrowDownCircleIcon } from '@/modules/shared/icons/arrow-down-circle';
import React, { useEffect, useState, useRef } from 'react';
import { useInstallAppButton } from './use-install-app-button';


export function InstallAppButton() {

  const { handleInstallClick, showInstallButton } = useInstallAppButton()

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
