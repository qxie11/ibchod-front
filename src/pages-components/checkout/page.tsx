'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Image from 'next/image';

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
import Container from '@/shared/ui/container';
import FormField from '@/shared/ui/form-field';
import { Input } from '@/shared/ui/input';
import { LiquidGlass } from '@/shared/ui/liquid-glass';
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
    <li className="flex items-center gap-4 border-b pb-2">
      <div className="w-16 h-16 flex items-center justify-center overflow-hidden">
        {imageUrl && (
          <Image
            width={64}
            height={64}
            quality={30}
            src={imageUrl}
            alt={item.name || ''}
            className="object-contain rounded max-w-full max-h-full"
          />
        )}
      </div>
      <div>
        <div className="font-medium">{item.name}</div>
        <div className="text-sm text-gray-500">{item.small_desc}</div>
        <div className="text-sm">Množství: {item.quantity}</div>
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
      // Ошибка будет показана ниже
    }
  };

  return (
    <>
      <Header />
      <Container className="py-10 w-full">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Checkout</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mb-6">
          <Button size="small" className="inline-block" href="/">
            <span className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Zpět na hlavní stránku
            </span>
          </Button>
        </div>
        <h1 className="text-3xl font-bold mb-6">Pokladna</h1>
        <div className="flex gap-4 max-md:flex-col">
          <LiquidGlass className="basis-2/3 w-full mx-auto p-0">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
              <FormField label="Jméno" error={errors.name?.message}>
                <Input {...register('name')} placeholder="Vaše jméno" error={!!errors.name} />
              </FormField>
              <FormField label="Email" error={errors.email?.message}>
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
                  placeholder="+420123456789"
                  type="tel"
                  error={!!errors.phone}
                />
              </FormField>
              <Button type="submit" className="w-full" disabled={isSubmitting || isOrderLoading}>
                {isOrderLoading ? 'Odesílání...' : 'Odeslat objednávku'}
              </Button>
              {isSuccess && (
                <p className="text-green-600 text-center mt-2">Objednávka byla úspěšně odeslána!</p>
              )}
              {isError && (
                <p className="text-red-600 text-center mt-2">Chyba při odesílání objednávky.</p>
              )}
            </form>
          </LiquidGlass>
          <div className="basis-1/3">
            <h2 className="text-2xl font-semibold mb-4">Vaše produkty</h2>
            {cartItems.length === 0 ? (
              <p>Košík je prázdný.</p>
            ) : (
              <ul className="space-y-4">
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
