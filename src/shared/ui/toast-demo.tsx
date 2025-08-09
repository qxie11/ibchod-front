'use client';

import React from 'react';

import { useToast } from '../hooks/use-toast';
import { Button } from './button';

export function ToastDemo() {
  const { toast } = useToast();

  const showDefaultToast = () => {
    toast({
      title: 'Oznámení',
      description: 'Toto je výchozí toast notifikace.',
    });
  };

  const showSuccessToast = () => {
    toast({
      variant: 'success',
      title: 'Úspěch!',
      description: 'Operace byla úspěšně dokončena.',
    });
  };

  const showErrorToast = () => {
    toast({
      variant: 'destructive',
      title: 'Chyba!',
      description: 'Něco se pokazilo. Zkuste to prosím znovu.',
    });
  };

  const showInfoToast = () => {
    toast({
      variant: 'info',
      title: 'Informace',
      description: 'Zde jsou některé užitečné informace pro vás.',
    });
  };

  return (
    <div className="flex gap-4 flex-wrap">
      <Button onClick={showDefaultToast} variant="outline">
        Default Toast
      </Button>
      <Button onClick={showSuccessToast} variant="outline">
        Success Toast
      </Button>
      <Button onClick={showErrorToast} variant="outline">
        Error Toast
      </Button>
      <Button onClick={showInfoToast} variant="outline">
        Info Toast
      </Button>
    </div>
  );
}
