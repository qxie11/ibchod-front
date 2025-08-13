'use client';

import { CheckCircle } from 'lucide-react';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { PaymentStatus } from '@/components/payment/payment-status';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import Container from '@/shared/ui/container';
import { Header } from '@/widgets/header';

export default function PaymentSuccessPage() {
  const [paymentId, setPaymentId] = useState<string | null>(null);

  useEffect(() => {
    // Получаем ID платежа из URL параметров или localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const idFromUrl = urlParams.get('id');
    const idFromStorage = localStorage.getItem('currentPaymentId');

    setPaymentId(idFromUrl || idFromStorage);

    // Очищаем localStorage
    if (idFromStorage) {
      localStorage.removeItem('currentPaymentId');
    }
  }, []);

  if (paymentId) {
    return (
      <>
        <Header />
        <Container className="w-full">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Platba úspěšná!</h1>
              <p className="text-gray-600">Sledujeme stav vaší platby</p>
            </div>
            <PaymentStatus paymentId={paymentId} />
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />
      <Container className="w-full">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <CardTitle className="text-2xl">Platba úspěšná!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Vaše platba byla úspěšně zpracována. Děkujeme za nákup v IObchod!
              </p>
              <p className="text-sm text-gray-500">
                Potvrzení objednávky jsme odeslali na váš email. Sledujte svůj email pro další
                informace o doručení.
              </p>
              <div className="pt-4 space-y-2">
                <Button asChild className="w-full">
                  <Link href="/">Pokračovat v nákupu</Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/admin/orders">Zobrazit objednávky</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </>
  );
}
