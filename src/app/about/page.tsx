import { Metadata } from 'next';

import { AboutPage } from '@/pages-components/about';

export const metadata: Metadata = {
  title: 'O nás - IObchod | Váš spolehlivý partner pro iPhone',
  description:
    'Poznejte IObchod - váš spolehlivý partner pro nákup iPhone a příslušenství. Naše historie, hodnoty a závazek k kvalitě.',
  keywords: 'IObchod, o nás, iPhone, obchod, historie, hodnoty, kvalita, spolehlivost',
  openGraph: {
    title: 'O nás - IObchod',
    description: 'Poznejte IObchod - váš spolehlivý partner pro nákup iPhone a příslušenství.',
    type: 'website',
    url: 'https://iobchod.cz/about',
  },
};

export default function AboutPageRoute() {
  return <AboutPage />;
}
