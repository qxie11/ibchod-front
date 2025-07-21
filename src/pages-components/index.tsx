'use client';

import { Recycle, ShieldCheck, Truck } from 'lucide-react';

import { useEffect } from 'react';

import Link from 'next/link';

import { ProductCard } from '@/entities/product';
import { Smartphone } from '@/entities/product/model/types';
import { AddToCartButton } from '@/features/add-to-cart';
import {
  selectPriceRange,
  selectSelectedColor,
  selectSelectedModel,
  selectSelectedStorage,
  setPriceRange,
  setSelectedColor,
  setSelectedModel,
  setSelectedStorage,
} from '@/features/filter-products';
import { ProductFilters } from '@/features/filter-products';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { useGetProductsQuery } from '@/shared/lib/slices/productApi';
import { Card } from '@/shared/ui/card';
import Container from '@/shared/ui/container';
import { LiquidGlass } from '@/shared/ui/liquid-glass';
import Loader from '@/shared/ui/loader';
import Text from '@/shared/ui/text';
import { Title } from '@/shared/ui/title';
import { Header } from '@/widgets/header';

interface HomePageProps {
  phoneListInit: Smartphone;
  uniqueBrands: string[];
  uniqueCapacities: number[];
  uniqueColors: string[];
  maxPrice: number;
  minPrice: number;
}

export default function HomePage({
  phoneListInit,
  uniqueBrands,
  uniqueCapacities,
  uniqueColors,
  maxPrice,
  minPrice,
}: HomePageProps) {
  const dispatch = useAppDispatch();
  const priceRange = useAppSelector(selectPriceRange);
  const selectedModel = useAppSelector(selectSelectedModel);
  const selectedStorage = useAppSelector(selectSelectedStorage);
  const selectedColor = useAppSelector(selectSelectedColor);

  const { data: phoneListState = phoneListInit, isFetching: isLoading } = useGetProductsQuery(
    {
      take: 10,
      name: selectedModel !== 'all' ? selectedModel : undefined,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      color: selectedColor !== 'all' ? selectedColor : undefined,
      capacity: selectedStorage !== 'all' ? selectedStorage : undefined,
    },
    {
      skip: priceRange[1] === 0,
    }
  );

  useEffect(() => {
    dispatch(setPriceRange([minPrice, maxPrice]));
  }, [dispatch, maxPrice, minPrice]);

  const resetFil = () => {
    dispatch(setPriceRange([minPrice, maxPrice]));
    dispatch(setSelectedModel('all'));
    dispatch(setSelectedStorage('all'));
    dispatch(setSelectedColor('all'));
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 mb-8">
          <Card className="p-4 md:p-6 flex items-center gap-4 bg-card/70 backdrop-blur-sm">
            <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-primary flex-shrink-0" />
            <div>
              <Title variant="h3" size="extra-small" className="md:text-lg mb-1">
                Záruka kvality
              </Title>
              <Text className="text-xs md:text-sm">12 měsíců záruka na každý iPhone.</Text>
            </div>
          </Card>
          <Card className="p-4 md:p-6 flex items-center gap-4 bg-card/70 backdrop-blur-sm">
            <Truck className="w-8 h-8 md:w-10 md:h-10 text-primary flex-shrink-0" />
            <div>
              <Title variant="h3" size="extra-small" className="md:text-lg mb-1">
                Rychlé doručení
              </Title>
              <Text className="text-xs md:text-sm">Doručení do 2 pracovních dnů.</Text>
            </div>
          </Card>
          <Card className="p-4 md:p-6 flex items-center gap-4 bg-card/70 backdrop-blur-sm">
            <Recycle className="w-8 h-8 md:w-10 md:h-10 text-primary flex-shrink-0" />
            <div>
              <Title variant="h3" size="extra-small" className="md:text-lg mb-1">
                Udržitelnost
              </Title>
              <Text className="text-xs md:text-sm">Šetříte planetu i peněženku.</Text>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          <LiquidGlass
            as="aside"
            className="md:col-span-2 rounded-lg shadow-sm h-fit md:sticky md:top-24 w-full"
          >
            <ProductFilters
              priceRange={priceRange}
              setPriceRange={(v) => dispatch(setPriceRange(v))}
              minPrice={minPrice}
              maxPrice={maxPrice}
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
              {phoneListState.items.map((product: Smartphone) => (
                <div key={product.id} className="relative group">
                  <Link href={`/product/${product.slug}`} className="block">
                    <ProductCard product={product} />
                  </Link>
                  <div className="absolute bottom-4 right-4 z-10">
                    <AddToCartButton size="small" product={product} />
                  </div>
                </div>
              ))}
            </div>
            {phoneListState.items.length === 0 && !isLoading && (
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
