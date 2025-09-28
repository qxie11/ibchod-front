import type { Metadata } from 'next';

import Container from '@/shared/ui/container';
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';

export const metadata: Metadata = {
  title: 'Obchodní podmínky | IObchod',
  description: 'Obchodní podmínky a pravidla používání služeb IObchod.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <Container className="py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Obchodní podmínky</h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Základní ustanovení</h2>
              <p className="mb-4">
                Tyto obchodní podmínky upravují vztahy mezi IObchod a zákazníky při prodeji
                repasovaných iPhonů.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Definice pojmů</h2>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  <strong>Prodávající:</strong> IObchod
                </li>
                <li>
                  <strong>Kupující:</strong> Fyzická nebo právnická osoba nakupující zboží
                </li>
                <li>
                  <strong>Zboží:</strong> Repasované iPhony
                </li>
                <li>
                  <strong>Objednávka:</strong> Kupní smlouva mezi prodávajícím a kupujícím
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Ceny a platby</h2>
              <ul className="list-disc pl-6 mb-4">
                <li>Všechny ceny jsou uvedeny včetně DPH</li>
                <li>Platba je možná převodem, kartou nebo GoPay</li>
                <li>Zboží je expedováno po připsání platby na účet</li>
                <li>V případě neplatnosti objednávky bude platba vrácena</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Dodání a převzetí</h2>
              <ul className="list-disc pl-6 mb-4">
                <li>Dodací lhůta je 1-3 pracovní dny</li>
                <li>Zboží je doručováno na adresu uvedenou v objednávce</li>
                <li>Kupující je povinen zboží převzít v uvedenou dobu</li>
                <li>Náklady na dopravu hradí kupující</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Záruka a reklamace</h2>
              <ul className="list-disc pl-6 mb-4">
                <li>Na zboží poskytujeme záruku 3 měsíce</li>
                <li>Záruka se vztahuje na funkčnost zařízení</li>
                <li>Reklamace je možná do 30 dnů od převzetí</li>
                <li>Vadné zboží bude opraveno nebo vyměněno</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Odstoupení od smlouvy</h2>
              <p className="mb-4">
                Kupující má právo odstoupit od kupní smlouvy do 14 dnů od převzetí zboží bez udání
                důvodu. Zboží musí být v původním stavu.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Odpovědnost</h2>
              <p className="mb-4">
                Prodávající odpovídá za škody způsobené porušením smlouvy, maximálně do výše
                zaplacené ceny.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Kontaktní údaje</h2>
              <p className="mb-4">
                <strong>IObchod</strong>
                <br />
                E-mail: info@iobchod.cz
                <br />
                Telefon: +420 722 179 379
                <br />
                Adresa: Praha, Česká republika
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
