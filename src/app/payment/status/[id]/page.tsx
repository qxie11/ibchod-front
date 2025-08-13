import type { Metadata } from 'next';

import { PaymentStatus } from '@/components/payment/payment-status';
import Container from '@/shared/ui/container';
import { Header } from '@/widgets/header';

interface PaymentStatusPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params: _params,
}: PaymentStatusPageProps): Promise<Metadata> {
  return {
    title: `Stav platby - IObchod`,
    description: 'Sledujte stav vaší platby v reálném čase.',
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function PaymentStatusPage({ params: _params }: PaymentStatusPageProps) {
  return (
    <>
      <Header />
      <Container className="w-full">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Stav platby</h1>
            <p className="text-gray-600">Sledujeme stav vaší platby v reálném čase</p>
          </div>
          <PaymentStatus paymentId={_params.id} />
        </div>
      </Container>
    </>
  );
}
