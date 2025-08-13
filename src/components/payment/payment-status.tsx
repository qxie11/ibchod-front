'use client';

import { AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react';

import { useEffect, useState } from 'react';

import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

interface PaymentStatusProps {
  paymentId: string;
  onStatusChange?: (status: string) => void;
}

type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'CANCELED' | 'UNKNOWN';

const statusConfig = {
  PENDING: {
    icon: Clock,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    title: 'Platba čeká na zpracování',
    description: 'Vaše platba je ve zpracování. Prosím vyčkejte.',
  },
  PAID: {
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    title: 'Platba úspěšná',
    description: 'Vaše platba byla úspěšně zpracována.',
  },
  FAILED: {
    icon: XCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    title: 'Platba selhala',
    description: 'Platba se nezdařila. Zkuste to prosím znovu.',
  },
  CANCELED: {
    icon: AlertCircle,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    title: 'Platba zrušena',
    description: 'Platba byla zrušena.',
  },
  UNKNOWN: {
    icon: AlertCircle,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    title: 'Neznámý stav',
    description: 'Stav platby není znám.',
  },
};

export function PaymentStatus({ paymentId, onStatusChange }: PaymentStatusProps) {
  const [status, setStatus] = useState<PaymentStatus>('PENDING');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/payment/status/${paymentId}`);
        const data = await response.json();

        if (data.success) {
          setStatus(data.status as PaymentStatus);
          onStatusChange?.(data.status);
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
        setStatus('UNKNOWN');
      } finally {
        setIsLoading(false);
      }
    };

    // Проверяем статус каждые 5 секунд
    const interval = setInterval(checkStatus, 5000);
    checkStatus(); // Первая проверка

    return () => clearInterval(interval);
  }, [paymentId, onStatusChange]);

  const config = statusConfig[status];
  const IconComponent = config.icon;

  if (isLoading) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2">Kontrola stavu platby...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`w-full max-w-md ${config.bgColor}`}>
      <CardHeader>
        <CardTitle className={`flex items-center gap-2 ${config.color}`}>
          <IconComponent className="h-5 w-5" />
          {config.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600">{config.description}</p>

        {status === 'FAILED' && (
          <Button asChild className="w-full">
            <a href="/checkout">Zkusit znovu</a>
          </Button>
        )}

        {status === 'CANCELED' && (
          <div className="space-y-2">
            <Button asChild className="w-full">
              <a href="/checkout">Zkusit znovu</a>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <a href="/cart">Zpět do košíku</a>
            </Button>
          </div>
        )}

        <div className="text-xs text-gray-500">ID platby: {paymentId}</div>
      </CardContent>
    </Card>
  );
}
