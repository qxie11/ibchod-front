'use client';

import { useSession } from 'next-auth/react';

export function useAuthToken() {
  const { data: session } = useSession();

  const getToken = () => {
    // Сначала пробуем получить токен из NextAuth сессии
    if (session?.accessToken) {
      return session.accessToken;
    }

    // Если нет в сессии, пробуем из localStorage
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessToken');
    }

    return null;
  };

  return {
    token: getToken(),
    isAuthenticated: !!getToken(),
  };
}
