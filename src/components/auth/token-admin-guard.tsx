import { getServerSession } from 'next-auth';

import { redirect } from 'next/navigation';

import { authOptions } from '@/lib/auth';

interface TokenAdminGuardProps {
  children: React.ReactNode;
}

export async function TokenAdminGuard({ children }: TokenAdminGuardProps) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    return redirect('/auth/login');
  }

  return <>{children}</>;
}
