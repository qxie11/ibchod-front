import type { Metadata } from 'next';

import { Badge } from '@/shared/ui/badge';
import Container from '@/shared/ui/container';
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';

export const metadata: Metadata = {
  title: 'Jak to funguje | IObchod',
  description: 'Zjistěte, jak funguje nákup repasovaných iPhonů v IObchod - od výběru po doručení.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function HowItWorksPage() {
  const steps = [
    {
      number: 1,
      title: 'Vyberte si iPhone',
      description:
        'Prohlédněte si naši nabídku repasovaných iPhonů s detailními informacemi o stavu, ceně a specifikacích.',
      icon: '📱',
    },
    {
      number: 2,
      title: 'Přidejte do košíku',
      description:
        'Klikněte na "Přidat do košíku" a pokračujte k pokladně nebo si prohlédněte další modely.',
      icon: '🛒',
    },
    {
      number: 3,
      title: 'Vyplňte údaje',
      description:
        'Zadejte doručovací adresu a platební údaje. Všechny údaje jsou bezpečně šifrovány.',
      icon: '✍️',
    },
    {
      number: 4,
      title: 'Zaplaťte',
      description: 'Zvolte si způsob platby - bankovní převod, platební kartu nebo GoPay.',
      icon: '💳',
    },
    {
      number: 5,
      title: 'Dostanete potvrzení',
      description: 'Obdržíte e-mail s potvrzením objednávky a číslem pro sledování.',
      icon: '📧',
    },
    {
      number: 6,
      title: 'Rychlé doručení',
      description:
        'Vaš iPhone bude připraven k odeslání do 24 hodin a doručen do 1-3 pracovních dnů.',
      icon: '🚚',
    },
  ];

  return (
    <>
      <Header />
      <Container className="py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4">Jak to funguje</Badge>
            <h1 className="text-4xl font-bold mb-4">Jednoduchý nákup v 6 krocích</h1>
            <p className="text-xl text-gray-600">
              Od výběru iPhone až po doručení - vše je jednoduché a transparentní
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.number} className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                    {step.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                      Krok {step.number}
                    </span>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Proč si vybrat IObchod?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
                  🛡️
                </div>
                <h3 className="font-semibold mb-2">3 měsíce záruka</h3>
                <p className="text-sm text-gray-600">Plná záruka na funkčnost všech zařízení</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
                  ⚡
                </div>
                <h3 className="font-semibold mb-2">Rychlé doručení</h3>
                <p className="text-sm text-gray-600">Do 24 hodin připraveno k odeslání</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
                  🌱
                </div>
                <h3 className="font-semibold mb-2">Udržitelnost</h3>
                <p className="text-sm text-gray-600">Šetříme planetu recyklací zařízení</p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Máte otázky?</h2>
            <p className="text-gray-600 mb-6">
              Naše zákaznická podpora vám ráda pomůže s jakýmikoli dotazy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/420722179379"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                💬 WhatsApp: +420 722 179 379
              </a>
              <a
                href="mailto:info@iobchod.cz"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                📧 E-mail: info@iobchod.cz
              </a>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}
