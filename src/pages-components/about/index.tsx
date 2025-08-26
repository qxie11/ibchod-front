'use client';

import { Award, CheckCircle, Globe, Heart, Shield, Star, Truck, Users } from 'lucide-react';

import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import Container from '@/shared/ui/container';
import Text from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import { Header } from '@/widgets/header';

export function AboutPage() {
  const stats = [
    { label: 'Spokojených zákazníků', value: '500+', icon: Heart },
    { label: 'Dodaných produktů', value: '1,200+', icon: Truck },
    { label: 'Let zkušeností', value: '3+', icon: Award },
    { label: 'Zemí dodání', value: '3+', icon: Globe },
  ];

  const values = [
    {
      title: 'Kvalita',
      description: 'Prodáváme pouze originální produkty Apple s plnou zárukou.',
      icon: Star,
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    },
    {
      title: 'Spolehlivost',
      description: 'Vaše objednávky doručujeme rychle a bezpečně.',
      icon: Shield,
      color: 'bg-blue-100 text-blue-800 border-blue-200',
    },
    {
      title: 'Podpora',
      description: 'Náš tým je tu pro vás 24/7 s profesionální pomocí.',
      icon: Users,
      color: 'bg-green-100 text-green-800 border-green-200',
    },
    {
      title: 'Inovace',
      description: 'Sledujeme nejnovější trendy a technologie.',
      icon: CheckCircle,
      color: 'bg-purple-100 text-purple-800 border-purple-200',
    },
  ];

  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
          <Container className="text-center">
            <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
              O nás
            </Badge>
            <Title variant="h1" className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
              Poznejte{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                IObchod
              </span>
            </Title>
            <Text className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Jsme váš spolehlivý partner pro nákup iPhone a příslušenství. Naše mise je přinášet
              nejlepší technologie do vašich rukou s důrazem na kvalitu, spolehlivost a zákaznický
              servis.
            </Text>
          </Container>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-blue-100 rounded-full">
                        <IconComponent className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <Title variant="h3" className="text-2xl font-bold text-gray-900 mb-2">
                      {stat.value}
                    </Title>
                    <Text className="text-gray-600">{stat.label}</Text>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Title variant="h2" className="text-3xl font-bold mb-6 text-gray-900">
                  Naše příběh
                </Title>
                <div className="space-y-4 text-gray-600">
                  <Text>
                    IObchod vznikl v roce 2021 s jednoduchou vizí - přinést nejlepší technologie
                    Apple do České republiky a okolních zemí. Začali jsme jako malý obchod s velkými
                    ambicemi.
                  </Text>
                  <Text>
                    Dnes jsme rostoucím obchodem s iPhone a příslušenstvím, s několika stovkami
                    spokojených zákazníků a malým, ale profesionálním týmem.
                  </Text>
                  <Text>
                    Naše úspěchy jsou založeny na třech pilířích: kvalitě produktů, vynikajícím
                    zákaznickém servisu a neustálé inovaci našich služeb.
                  </Text>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                  <Title variant="h3" className="text-2xl font-bold mb-4">
                    Naše mise
                  </Title>
                  <Text className="text-blue-100 mb-6">
                    Přinášet nejnovější technologie Apple do vašich rukou s důrazem na kvalitu,
                    spolehlivost a vynikající zákaznický servis.
                  </Text>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <Text className="text-blue-100">Originální produkty Apple</Text>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <Text className="text-blue-100">Rychlé dodání</Text>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <Text className="text-blue-100">24/7 podpora</Text>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-white">
          <Container>
            <div className="text-center mb-12">
              <Title variant="h2" className="text-3xl font-bold mb-4 text-gray-900">
                Naše hodnoty
              </Title>
              <Text className="text-xl text-gray-600 max-w-2xl mx-auto">
                Tyto hodnoty nás vedou v každém rozhodnutí a každém kroku naší cesty.
              </Text>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div
                    key={index}
                    className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex justify-center mb-4">
                      <div className={`p-3 rounded-full border ${value.color}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                    </div>
                    <Title variant="h3" className="text-xl font-bold mb-3 text-gray-900">
                      {value.title}
                    </Title>
                    <Text className="text-gray-600">{value.description}</Text>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <Container>
            <div className="text-center mb-12">
              <Title variant="h2" className="text-3xl font-bold mb-4 text-gray-900">
                Náš tým
              </Title>
              <Text className="text-xl text-gray-600 max-w-2xl mx-auto">
                Poznejte lidi, kteří stojí za úspěchem IObchod a jsou tu pro vás každý den.
              </Text>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <Title variant="h3" className="text-xl font-bold mb-2 text-gray-900">
                  Zákaznický servis
                </Title>
                <Text className="text-gray-600 mb-4">
                  Náš tým je tu pro vás 24/7 s profesionální pomocí a podporou.
                </Text>
                <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                  K dispozici 24/7
                </Badge>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Truck className="w-12 h-12 text-white" />
                </div>
                <Title variant="h3" className="text-xl font-bold mb-2 text-gray-900">
                  Logistika
                </Title>
                <Text className="text-gray-600 mb-4">
                  Zajišťujeme rychlé a bezpečné doručení vašich objednávek.
                </Text>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                  Rychlé dodání
                </Badge>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Shield className="w-12 h-12 text-white" />
                </div>
                <Title variant="h3" className="text-xl font-bold mb-2 text-gray-900">
                  Kvalita
                </Title>
                <Text className="text-gray-600 mb-4">
                  Kontrolujeme každý produkt, abychom zajistili nejvyšší kvalitu.
                </Text>
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-800 border-purple-200"
                >
                  Garance kvality
                </Badge>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
          <Container>
            <div className="text-center text-white">
              <Title variant="h2" className="text-3xl font-bold mb-4">
                Připojte se k nám
              </Title>
              <Text className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
                Staňte se součástí naší komunity spokojených zákazníků a objevte svět nejlepších
                technologií.
              </Text>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href="/products"
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Prohlédnout produkty
                </Button>
                <Button
                  href="/blog"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Číst blog
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
