'use client';

import { useSession } from 'next-auth/react';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

interface AdminGuardProps {
  children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session || session.user.role !== 'admin') {
      router.push('/auth/login');
    }
  }, [session, status, router]);

  if (!session || session.user.role !== 'admin') {
    return null;
  }

  return <>{children}</>;
}
