import crypto from 'crypto';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('signature');

    // Проверяем подпись от GoPay
    const expectedSignature = crypto
      .createHmac('sha256', process.env.GOPAY_SECRET_KEY || '')
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const paymentData = JSON.parse(body);

    // Обрабатываем статус платежа
    switch (paymentData.state) {
      case 'PAID':
        // Платеж успешно завершен
        console.log('Payment completed:', paymentData.id);
        // Здесь можно обновить статус заказа в базе данных
        break;

      case 'CANCELED':
        // Платеж отменен
        console.log('Payment canceled:', paymentData.id);
        break;

      case 'FAILED':
        // Платеж не удался
        console.log('Payment failed:', paymentData.id);
        break;

      default:
        console.log('Payment status:', paymentData.state, paymentData.id);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
