'use client';

import {
  CheckCircle,
  CreditCard,
  DollarSign,
  Euro,
  Globe,
  Shield,
  Smartphone,
  Zap,
} from 'lucide-react';

import { useState } from 'react';

import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

const paymentMethods = [
  {
    name: 'Platební karty',
    icon: CreditCard,
    description: 'Visa, Mastercard, Maestro',
    color: 'bg-blue-100 text-blue-800',
  },
  {
    name: 'Apple Pay & Google Pay',
    icon: Smartphone,
    description: 'Bezkontaktní platby',
    color: 'bg-purple-100 text-purple-800',
  },
  {
    name: 'Online bankovnictví',
    icon: Globe,
    description: 'ČSOB, ČNB, KB, mBank',
    color: 'bg-green-100 text-green-800',
  },
  {
    name: 'PayPal',
    icon: Euro,
    description: 'Bezpečné online platby',
    color: 'bg-orange-100 text-orange-800',
  },
];

const benefits = [
  {
    icon: Shield,
    title: '100% bezpečné',
    description: 'SSL šifrování a PCI DSS certifikace',
  },
  {
    icon: Zap,
    title: 'Rychlé zpracování',
    description: 'Platby jsou zpracovány během několika sekund',
  },
  {
    icon: CheckCircle,
    title: 'Automatické potvrzení',
    description: 'Okamžité potvrzení úspěšné platby',
  },
  {
    icon: DollarSign,
    title: 'Bez skrytých poplatků',
    description: 'Žádné dodatečné náklady pro zákazníky',
  },
];

export function PaymentDemo() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Заголовок */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Bezpečné platby přes GoPay</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          GoPay je nejpopulárnější platební brána v České republice. Nabízíme více než 20 způsobů
          platby pro maximální pohodlí našich zákazníků.
        </p>
      </div>

      {/* Способы оплаты */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Podporované platební metody
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {paymentMethods.map((method) => {
              const IconComponent = method.icon;
              return (
                <div
                  key={method.name}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedMethod === method.name
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedMethod(method.name)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${method.color}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{method.name}</h3>
                      <p className="text-xs text-gray-600">{method.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Преимущества */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Proč si vybrat GoPay?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit) => {
              const IconComponent = benefit.icon;
              return (
                <div key={benefit.title} className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <IconComponent className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Статистика */}
      <Card>
        <CardHeader>
          <CardTitle>GoPay v číslech</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">99.9%</div>
              <div className="text-sm text-gray-600">Úspěšnost plateb</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">20+</div>
              <div className="text-sm text-gray-600">Platebních metod</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">&lt;3s</div>
              <div className="text-sm text-gray-600">Průměrný čas zpracování</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">24/7</div>
              <div className="text-sm text-gray-600">Podpora zákazníků</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Призыв к действию */}
      <div className="text-center">
        <Button size="lg" className="px-8">
          Začít nakupovat s GoPay
        </Button>
        <p className="text-sm text-gray-500 mt-2">
          Všechny platby jsou chráněny nejmodernějšími bezpečnostními standardy
        </p>
      </div>
    </div>
  );
}
