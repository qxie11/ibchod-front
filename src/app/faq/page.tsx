import type { Metadata } from 'next';

import Container from '@/shared/ui/container';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import { Badge } from '@/shared/ui/badge';

export const metadata: Metadata = {
  title: 'Často kladené otázky | IObchod',
  description: 'Odpovědi na nejčastější otázky ohledně nákupu repasovaných iPhonů v IObchod.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function FAQPage() {
  const faqs = [
    {
      category: 'Obecné otázky',
      questions: [
        {
          question: 'Co znamená "repasovaný" iPhone?',
          answer: 'Repasovaný iPhone je použitý telefon, který prošel profesionální kontrolou, čištěním a případnou opravou. Všechny funkce jsou plně funkční a telefon má záruku.'
        },
        {
          question: 'Jaký je rozdíl mezi novým a repasovaným iPhone?',
          answer: 'Repasovaný iPhone je původně použitý, ale prošel kompletní kontrolou a opravou. Funguje stejně jako nový, ale stojí podstatně méně. Jediný rozdíl je v tom, že má drobné známky používání.'
        },
        {
          question: 'Jsou všechny iPhony odemčené?',
          answer: 'Ano, všechny naše iPhony jsou odemčené (unlocked) a fungují se všemi operátory v České republice i v zahraničí.'
        }
      ]
    },
    {
      category: 'Nákup a platba',
      questions: [
        {
          question: 'Jaké způsoby platby přijímáte?',
          answer: 'Přijímáme bankovní převod, platbu kartou (Visa, Mastercard) a platbu přes GoPay. Všechny platby jsou bezpečně zpracovávány.'
        },
        {
          question: 'Kdy bude můj iPhone odeslán?',
          answer: 'iPhone je připraven k odeslání do 24 hodin po připsání platby na náš účet. Doručení trvá 1-3 pracovní dny.'
        },
        {
          question: 'Můžu objednávku stornovat?',
          answer: 'Ano, objednávku můžete stornovat do 30 minut po její realizaci. Po této době je možné ji stornovat pouze v případě, že ještě nebyla expedována.'
        }
      ]
    },
    {
      category: 'Záruka a reklamace',
      questions: [
        {
          question: 'Jak dlouhou záruku poskytujete?',
          answer: 'Poskytujeme 3 měsíce záruky na funkčnost všech zařízení. Záruka se vztahuje na technické závady, nikoliv na kosmetické poškození.'
        },
        {
          question: 'Co když bude iPhone vadný?',
          answer: 'V případě technické závady vám iPhone opravíme nebo vyměníme za jiný stejného modelu. Všechny reklamace řešíme rychle a bez komplikací.'
        },
        {
          question: 'Můžu iPhone vrátit, pokud mi nebude vyhovovat?',
          answer: 'Ano, máte právo vrátit iPhone do 14 dnů od převzetí bez udání důvodu. Zařízení musí být v původním stavu a s originálními příslušenstvím.'
        }
      ]
    },
    {
      category: 'Doručení',
      questions: [
        {
          question: 'Jaké jsou náklady na dopravu?',
          answer: 'Dopravu hradíte vy. Cena závisí na zvoleném způsobu doručení a váze zásilky. Přesnou cenu uvidíte v košíku před dokončením objednávky.'
        },
        {
          question: 'Doručujete i na Slovensko?',
          answer: 'Ano, doručujeme i na Slovensko. Náklady na dopravu se mohou lišit od doručení v České republice.'
        },
        {
          question: 'Můžu si iPhone vyzvednout osobně?',
          answer: 'V současné době neposkytujeme osobní vyzvednutí. Všechny objednávky odesíláme kurýrní službou.'
        }
      ]
    }
  ];

  return (
    <>
      <Header />
      <Container className="py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4">FAQ</Badge>
            <h1 className="text-4xl font-bold mb-4">Často kladené otázky</h1>
            <p className="text-xl text-gray-600">
              Odpovědi na nejčastější dotazy našich zákazníků
            </p>
          </div>

          <div className="space-y-12">
            {faqs.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h2 className="text-2xl font-bold mb-6 text-blue-600">{section.category}</h2>
                <div className="space-y-4">
                  {section.questions.map((faq, faqIndex) => (
                    <div key={faqIndex} className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-3 text-gray-900">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Nenašli jste odpověď?</h2>
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
