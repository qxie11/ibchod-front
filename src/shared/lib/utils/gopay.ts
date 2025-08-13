import crypto from 'crypto';

export interface GoPayPaymentRequest {
  payer: {
    contact: {
      email: string;
      phone_number: string;
      city: string;
      street: string;
      postal_code: string;
      country_code: string;
    };
  };
  amount: number;
  currency: string;
  order_number: string;
  order_description: string;
  items: Array<{
    name: string;
    amount: number;
    quantity: number;
  }>;
  callback: {
    return_url: string;
    notification_url: string;
  };
  payment_methods: string[];
  ttl_sec: number;
}

export interface GoPayPaymentResponse {
  id: number;
  state: string;
  gateway_url: string;
  payment_session_id: string;
  embedded_payment_gateway_url?: string;
}

export class GoPayService {
  private readonly merchantId: string;
  private readonly secretKey: string;
  private readonly environment: 'test' | 'prod';

  constructor() {
    this.merchantId = process.env.GOPAY_MERCHANT_ID || '';
    this.secretKey = process.env.GOPAY_SECRET_KEY || '';
    this.environment = (process.env.GOPAY_ENVIRONMENT as 'test' | 'prod') || 'test';
  }

  private getBaseUrl(): string {
    return this.environment === 'test'
      ? 'https://gw.sandbox.gopay.com/api/v3'
      : 'https://gate.gopay.cz/api/v3';
  }

  private generateSignature(data: string): string {
    return crypto.createHmac('sha256', this.secretKey).update(data).digest('hex');
  }

  async createPayment(paymentData: GoPayPaymentRequest): Promise<GoPayPaymentResponse> {
    const url = `${this.getBaseUrl()}/payments/payment`;

    const requestBody = {
      ...paymentData,
      target: {
        goid: this.merchantId,
      },
    };

    const bodyString = JSON.stringify(requestBody);
    const signature = this.generateSignature(bodyString);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${this.getAccessToken()}`,
        Signature: signature,
      },
      body: bodyString,
    });

    if (!response.ok) {
      throw new Error(`GoPay API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getPaymentStatus(paymentId: string): Promise<any> {
    const url = `${this.getBaseUrl()}/payments/payment/${paymentId}`;
    const signature = this.generateSignature('');

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.getAccessToken()}`,
        Signature: signature,
      },
    });

    if (!response.ok) {
      throw new Error(`GoPay API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  private getAccessToken(): string {
    // В реальном приложении здесь должна быть логика получения токена
    // Для демонстрации используем переменную окружения
    return process.env.GOPAY_ACCESS_TOKEN || '';
  }

  getPaymentMethods(): string[] {
    return [
      'PAYMENT_CARD',
      'BANK_ACCOUNT',
      'GPAY',
      'APPLE_PAY',
      'PAYPAL',
      'BITCOIN',
      'PRSMS',
      'GPAY_APPLE_PAY',
      'GPAY_GOOGLE_PAY',
    ];
  }
}

export const goPayService = new GoPayService();
