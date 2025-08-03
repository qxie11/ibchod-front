'use client';

import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

import { useRouter } from 'next/navigation';

import { api } from '@/shared/lib/api';
import { Button } from '@/shared/ui/button';

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await api.auth.authControllerLogout();
      await signOut({
        redirect: false,
      });
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Button variant="outline" onClick={handleSignOut} className="flex items-center gap-2">
      <LogOut className="h-4 w-4" />
      Odhlásit se
    </Button>
  );
}
