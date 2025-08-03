'use client';

import { signIn, useSession } from 'next-auth/react';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import Container from '@/shared/ui/container';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { data: session } = useSession();
  const router = useRouter();

  if (session?.user?.role === 'admin') {
    router.push('/admin');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Nesprávné přihlašovací údaje');
      } else {
        router.push('/admin');
      }
    } catch {
      setError('Došlo k chybě při přihlašování');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Container className="max-w-md w-full">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Přihlášení do administrace</CardTitle>
            <CardDescription className="text-center">
              Zadejte své přihlašovací údaje pro přístup do administrativní panelu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder="admin@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Heslo</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder="Zadejte heslo"
                />
              </div>
              {error && <div className="text-red-500 text-sm text-center">{error}</div>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Přihlašování...' : 'Přihlásit se'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
