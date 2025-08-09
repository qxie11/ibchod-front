'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Image from 'next/image';
import Link from 'next/link';

import { selectCartItems } from '@/entities/cart';
import type { Smartphone } from '@/entities/product/model/types';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { useCreateOrderMutation } from '@/shared/lib/slices/orderApi';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/ui/breadcrumb';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import Container from '@/shared/ui/container';
import FormField from '@/shared/ui/form-field';
import { Input } from '@/shared/ui/input';
import { Header } from '@/widgets/header';

const schema = yup.object().shape({
  name: yup.string().required('Jméno je povinné'),
  email: yup.string().email('Neplatný email').required('Email je povinný'),
  phone: yup
    .string()
    .matches(/^\+?\d{9,15}$/, 'Neplatné telefonní číslo')
    .required('Telefon je povinný'),
});

type FormData = {
  name: string;
  email: string;
  phone: string;
};

function CartItem({ item }: { item: Smartphone }) {
  const imageUrl = item.gallery?.[0];
  return (
    <li className="flex items-center gap-4 py-3">
      <div className="relative w-16 h-16 flex-shrink-0">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={item.name || ''}
            fill
            className="object-contain rounded-md border"
          />
        )}
      </div>
      <div className="flex-grow">
        <div className="font-medium text-sm">{item.name}</div>
        <div className="text-sm text-gray-500">
          {item.capacity}GB, {item.color}
        </div>
      </div>
      <div className="text-sm font-semibold">
        {item.quantity} x {item.price.toLocaleString('cs-CZ')} Kč
      </div>
    </li>
  );
}

export default function CheckoutPage() {
  const cartItems = useAppSelector(selectCartItems) as Smartphone[];
  const [createOrder, { isLoading: isOrderLoading, isSuccess, isError }] = useCreateOrderMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const onSubmit = async (data: FormData) => {
    const order = {
      ...data,
      items: cartItems.map((item: Smartphone) => ({
        smartphoneId: item.id,
        quantity: item.quantity,
      })),
    };
    try {
      await createOrder(order).unwrap();
      reset();
    } catch {
      // Error is displayed via isError state
    }
  };

  return (
    <>
      <Header />
      <Container className="py-10 w-full max-w-4xl">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Domů</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/cart">Košík</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Pokladna</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/cart" className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Zpět do košíku
            </Link>
          </Button>
        </div>
        <h1 className="text-3xl font-bold mb-8">Dokončení objednávky</h1>
        <div className="grid md:grid-cols-2 gap-12">
          <Card className="bg-card">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Fakturační údaje</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FormField label="Jméno a příjmení" error={errors.name?.message}>
                  <Input {...register('name')} placeholder="Jan Novák" error={!!errors.name} />
                </FormField>
                <FormField label="E-mail" error={errors.email?.message}>
                  <Input
                    {...register('email')}
                    placeholder="vas@email.cz"
                    type="email"
                    error={!!errors.email}
                  />
                </FormField>
                <FormField label="Telefon" error={errors.phone?.message}>
                  <Input
                    {...register('phone')}
                    placeholder="+420 123 456 789"
                    type="tel"
                    error={!!errors.phone}
                  />
                </FormField>
                <Button
                  type="submit"
                  className="w-full mt-4"
                  size="lg"
                  disabled={isSubmitting || isOrderLoading || isSuccess}
                >
                  {isOrderLoading
                    ? 'Odesílání…'
                    : isSuccess
                      ? 'Objednávka odeslána!'
                      : `Objednat a zaplatit ${cartTotal.toLocaleString('cs-CZ')} Kč`}
                </Button>
                {isSuccess && (
                  <p className="text-green-600 text-center mt-2">
                    Objednávka byla úspěšně odeslána! Děkujeme za Váš nákup.
                  </p>
                )}
                {isError && (
                  <p className="text-red-600 text-center mt-2">Chyba při odesílání objednávky.</p>
                )}
              </form>
            </CardContent>
          </Card>
          <div>
            <h2 className="text-xl font-semibold mb-4">Vaše objednávka</h2>
            <Card className="bg-card">
              <CardContent className="p-6">
                {cartItems.length === 0 ? (
                  <p>Košík je prázdný.</p>
                ) : (
                  <ul className="space-y-2 divide-y">
                    {cartItems.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </ul>
                )}
                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Mezisoučet</span>
                    <span>{cartTotal.toLocaleString('cs-CZ')} Kč</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Doprava</span>
                    <span className="text-green-600 font-medium">Zdarma</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-4">
                    <span>Celkem</span>
                    <span>{cartTotal.toLocaleString('cs-CZ')} Kč</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}
