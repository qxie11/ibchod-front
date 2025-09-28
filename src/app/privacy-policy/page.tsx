import type { Metadata } from 'next';

import Container from '@/shared/ui/container';
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';

export const metadata: Metadata = {
  title: 'Ochrana osobních údajů | IObchod',
  description: 'Zásady ochrany osobních údajů a zpracování dat v IObchod.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <Container className="py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Ochrana osobních údajů</h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Základní informace</h2>
              <p className="mb-4">
                IObchod (dále jen &quot;my&quot;, &quot;nám&quot;, &quot;náš&quot;) se zavazuje
                chránit vaše osobní údaje v souladu s Nařízením GDPR (Obecné nařízení o ochraně
                údajů).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Jaké údaje shromažďujeme</h2>
              <ul className="list-disc pl-6 mb-4">
                <li>Jméno a příjmení</li>
                <li>E-mailová adresa</li>
                <li>Telefonní číslo</li>
                <li>Doručovací adresa</li>
                <li>Platební údaje (zpracováváme pouze nezbytné údaje)</li>
                <li>IP adresa a cookies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Účel zpracování</h2>
              <p className="mb-4">Vaše osobní údaje zpracováváme za účelem:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Zpracování a doručení objednávek</li>
                <li>Komunikace s vámi</li>
                <li>Poskytování zákaznické podpory</li>
                <li>Zlepšování našich služeb</li>
                <li>Placení zákonných povinností</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Vaše práva</h2>
              <p className="mb-4">Podle GDPR máte právo na:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Přístup k vašim osobním údajům</li>
                <li>Opravu nesprávných údajů</li>
                <li>Výmaz údajů</li>
                <li>Omezení zpracování</li>
                <li>Přenositelnost údajů</li>
                <li>Námitku proti zpracování</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Kontakt</h2>
              <p className="mb-4">
                Máte-li dotazy ohledně ochrany osobních údajů, kontaktujte nás na:
              </p>
              <p className="mb-4">
                <strong>E-mail:</strong> info@iobchod.cz
                <br />
                <strong>Telefon:</strong> +420 722 179 379
              </p>
            </section>

            <section className="mb-8">
              <p className="text-sm text-gray-600">
                <strong>Datum účinnosti:</strong> 1. ledna 2025
                <br />
                <strong>Poslední aktualizace:</strong> 1. ledna 2025
              </p>
            </section>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}
