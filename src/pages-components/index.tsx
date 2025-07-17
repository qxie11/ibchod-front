'use client';

import type { Content } from '@prismicio/client';
import * as prismic from '@prismicio/client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { ProductCard } from '@/entities/product';
import { AddToCartButton } from '@/features/add-to-cart';
import { ProductFilters } from '@/features/filter-products';
import {
  resetFilters,
  selectPriceRange,
  selectSelectedColor,
  selectSelectedModel,
  selectSelectedStorage,
  setPriceRange,
  setSelectedColor,
  setSelectedModel,
  setSelectedStorage,
} from '@/features/filter-products';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { createClient } from '@/shared/lib/utils/prismic-client';
import Container from '@/shared/ui/container';
import { LiquidGlass } from '@/shared/ui/liquid-glass';
import Loader from '@/shared/ui/loader';
import Text from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import { Header } from '@/widgets/header';

interface HomePageProps {
  phoneList: Content.PhoneDocument[];
  uniqueBrands: string[];
  uniqueCapacities: number[];
  uniqueColors: string[];
}

export default function HomePage({
  phoneList,
  uniqueBrands,
  uniqueCapacities,
  uniqueColors,
}: HomePageProps) {
  const [phoneListState, setPhoneListState] = useState(phoneList);

  const dispatch = useAppDispatch();
  const priceRange = useAppSelector(selectPriceRange);
  const selectedModel = useAppSelector(selectSelectedModel);
  const selectedStorage = useAppSelector(selectSelectedStorage);
  const selectedColor = useAppSelector(selectSelectedColor);

  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    setIsloading(true);
    const client = createClient();
    (async () => {
      const response = await client.getAllByType('phone', {
        filters: [
          ...(selectedModel !== 'all'
            ? [prismic.filter.fulltext('my.phone.name', selectedModel)]
            : []),
          ...(selectedStorage !== 'all'
            ? [prismic.filter.at('my.phone.capacity', +selectedStorage)]
            : []),
          ...(selectedColor !== 'all'
            ? [prismic.filter.fulltext('my.phone.color', selectedColor)]
            : []),
          prismic.filter.numberInRange('my.phone.price', ...(priceRange as [number, number])),
        ],
      });

      setPhoneListState(response);
      setIsloading(false);
    })();
  }, [priceRange, selectedModel, selectedStorage, selectedColor]);

  const resetFil = () => {
    dispatch(setPriceRange([0, 40000]));
    dispatch(setSelectedModel('all'));
    dispatch(setSelectedStorage('all'));
    dispatch(setSelectedColor('all'));
    dispatch(resetFilters());
  };

  return (
    <main>
      <Header />
      <Container className="flex-1 py-8 w-full">
        <Title variant="h1" className="mb-2">
          IPhony:
        </Title>
        <Text className="mb-8">
          Vysoce kvalitní repasované iPhony za skvělou cenu. Tvoje udržitelnější volba s minimálně
          12měsíční zárukou.
        </Text>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          <LiquidGlass
            as="aside"
            className="md:col-span-2 rounded-lg shadow-sm h-fit sticky top-24 w-full"
          >
            <ProductFilters
              priceRange={priceRange}
              setPriceRange={(v) => dispatch(setPriceRange(v))}
              maxPrice={40000}
              selectedModel={selectedModel}
              setSelectedModel={(v) => dispatch(setSelectedModel(v))}
              models={uniqueBrands}
              selectedStorage={selectedStorage}
              setSelectedStorage={(v) => dispatch(setSelectedStorage(v))}
              storages={uniqueCapacities}
              selectedColor={selectedColor}
              setSelectedColor={(v) => dispatch(setSelectedColor(v))}
              colors={uniqueColors}
              resetFilters={resetFil}
            />
          </LiquidGlass>
          <div className="md:col-span-4">
            <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              {isLoading && (
                <div className="absolute z-20 inset-0 bg-white bg-opacity-50">
                  <Loader className="absolute left-1/2 top-20" />
                </div>
              )}
              {phoneListState.map((product) => (
                <div key={product.id} className="relative group">
                  <Link href={`/product/${product.uid}`} className="block">
                    <ProductCard product={product} />
                  </Link>
                  <div className="absolute bottom-4 right-4 z-10">
                    <AddToCartButton size="small" product={product} />
                  </div>
                </div>
              ))}
            </div>
            {phoneListState.length === 0 && !isLoading && (
              <div className="text-center py-20 col-span-3">
                <Title variant="h2" className="text-2xl font-semibold text-foreground mb-2">
                  No products found
                </Title>
                <Text className="text-muted-foreground">Try adjusting your search filters.</Text>
              </div>
            )}
          </div>
        </div>
      </Container>
    </main>
  );
}
