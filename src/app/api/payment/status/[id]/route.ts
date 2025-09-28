import { NextRequest, NextResponse } from 'next/server';

import { goPayService } from '@/shared/lib/utils/gopay';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: paymentId } = await params;

    if (!paymentId) {
      return NextResponse.json(
        { success: false, error: 'Payment ID is required' },
        { status: 400 }
      );
    }

    const paymentStatus = await goPayService.getPaymentStatus(paymentId);

    return NextResponse.json({
      success: true,
      status: paymentStatus.state,
      payment: paymentStatus,
    });
  } catch (error) {
    console.error('Error checking payment status:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Chyba při kontrole stavu platby',
        status: 'UNKNOWN',
      },
      { status: 500 }
    );
  }
}
