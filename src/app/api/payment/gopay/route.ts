import { NextRequest, NextResponse } from 'next/server';

import { goPayService } from '@/shared/lib/utils/gopay';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderData, customerData } = body;

    // Создаем платеж в GoPay
    const paymentRequest = {
      payer: {
        contact: {
          email: customerData.email,
          phone_number: customerData.phone,
          city: customerData.city || 'Praha',
          street: customerData.street || 'N/A',
          postal_code: customerData.postalCode || '10000',
          country_code: 'CZE',
        },
      },
      amount: orderData.total * 100, // GoPay использует копейки
      currency: 'CZK',
      order_number: `ORDER-${Date.now()}`,
      order_description: `Objednávka iPhone - ${orderData.items.length} položek`,
      items: orderData.items.map((item: any) => ({
        name: item.name,
        amount: item.price * 100,
        quantity: item.quantity,
      })),
      callback: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
        notification_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/webhook`,
      },
      payment_methods: goPayService.getPaymentMethods(),
      ttl_sec: 1800, // 30 minut
    };

    const paymentResponse = await goPayService.createPayment(paymentRequest);

    return NextResponse.json({
      success: true,
      payment: paymentResponse,
    });
  } catch (error) {
    console.error('GoPay payment creation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Chyba při vytváření platby',
      },
      { status: 500 }
    );
  }
}
