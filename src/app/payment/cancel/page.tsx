import { XCircle } from 'lucide-react';

import type { Metadata } from 'next';

import Link from 'next/link';

import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import Container from '@/shared/ui/container';
import { Header } from '@/widgets/header';

export const metadata: Metadata = {
  title: 'Platba zrušena - IObchod',
  description: 'Platba byla zrušena. Můžete to zkusit znovu.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function PaymentCancelPage() {
  return (
    <>
      <Header />
      <Container className="w-full">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <XCircle className="h-16 w-16 text-red-500" />
              </div>
              <CardTitle className="text-2xl">Platba zrušena</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Platba byla zrušena nebo se nezdařila. Vaše objednávka nebyla dokončena.
              </p>
              <p className="text-sm text-gray-500">
                Můžete to zkusit znovu nebo se vrátit do košíku.
              </p>
              <div className="pt-4 space-y-2">
                <Button asChild className="w-full">
                  <Link href="/cart">Zpět do košíku</Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/">Pokračovat v nákupu</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </>
  );
}
