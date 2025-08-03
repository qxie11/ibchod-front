import { AuthOptions, getServerSession } from 'next-auth';

import { redirect } from 'next/navigation';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';

interface TokenAdminGuardProps {
  children: React.ReactNode;
}

export async function TokenAdminGuard({ children }: TokenAdminGuardProps) {
  const session = await getServerSession(authOptions as AuthOptions);

  if (!session || session.user.role !== 'admin') {
    return redirect('/auth/login');
  }

  return <>{children}</>;
}
