'use client';

import { Building, CreditCard, Mail, MapPin, Smartphone } from 'lucide-react';

import { useState } from 'react';

import { useToast } from '@/hooks/use-toast';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

interface GoPayPaymentFormProps {
  orderData: {
    total: number;
    items: Array<{
      id: string;
      name: string;
      price: number;
      quantity: number;
    }>;
  };
  onPaymentSuccess: (paymentId: string) => void;
  onPaymentError: (error: string) => void;
}

export function GoPayPaymentForm({
  orderData,
  onPaymentSuccess: _onPaymentSuccess,
  onPaymentError,
}: GoPayPaymentFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [customerData, setCustomerData] = useState({
    email: '',
    phone: '',
    city: '',
    street: '',
    postalCode: '',
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setCustomerData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePayment = async () => {
    if (!customerData.email || !customerData.phone) {
      toast({
        title: 'Chyba',
        description: 'Vyplňte prosím email a telefon',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/payment/gopay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderData,
          customerData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem('currentPaymentId', result.payment.id.toString());

        window.location.href = result.payment.gateway_url;
      } else {
        throw new Error(result.error || 'Chyba při vytváření platby');
      }
    } catch (error) {
      console.error('Payment error:', error);
      onPaymentError(error instanceof Error ? error.message : 'Neznámá chyba');
      toast({
        title: 'Chyba platby',
        description: 'Nepodařilo se vytvořit platbu. Zkuste to prosím znovu.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Platba přes GoPay
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="vas@email.cz"
            value={customerData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            Telefon
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+420 123 456 789"
            value={customerData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Město
          </Label>
          <Input
            id="city"
            type="text"
            placeholder="Praha"
            value={customerData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="street" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Ulice
          </Label>
          <Input
            id="street"
            type="text"
            placeholder="Václavské náměstí 1"
            value={customerData.street}
            onChange={(e) => handleInputChange('street', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="postalCode">PSČ</Label>
          <Input
            id="postalCode"
            type="text"
            placeholder="11000"
            value={customerData.postalCode}
            onChange={(e) => handleInputChange('postalCode', e.target.value)}
          />
        </div>

        <div className="pt-4">
          <Button onClick={handlePayment} disabled={isLoading} className="w-full" size="lg">
            {isLoading ? 'Zpracování...' : `Zaplatit ${orderData.total.toLocaleString('cs-CZ')} Kč`}
          </Button>
        </div>

        <div className="text-xs text-gray-500 text-center">
          Platba bude zpracována přes bezpečný GoPay systém
        </div>
      </CardContent>
    </Card>
  );
}
