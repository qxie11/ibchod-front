import { CreditCard, Globe, Shield, Smartphone } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

export function GoPayInfo() {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-800">
          <Shield className="h-5 w-5" />
          Proč GoPay?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-green-600" />
            <span>100% bezpečné</span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-blue-600" />
            <span>Všechny karty</span>
          </div>
          <div className="flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-purple-600" />
            <span>Apple/Google Pay</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-orange-600" />
            <span>Online bankovnictví</span>
          </div>
        </div>

        <div className="text-xs text-gray-600 bg-white p-3 rounded-md">
          <p className="font-medium mb-1">Podporované platební metody:</p>
          <ul className="space-y-1">
            <li>• Platební karty (Visa, Mastercard, Maestro)</li>
            <li>• Online bankovnictví (ČSOB, ČNB, KB, mBank)</li>
            <li>• Apple Pay a Google Pay</li>
            <li>• PayPal</li>
            <li>• SMS platby</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
