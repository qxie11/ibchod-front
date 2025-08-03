import { getSession } from 'next-auth/react';

export const getAuthToken = async (): Promise<string | null> => {
  if (typeof window === 'undefined') {
    return null;
  }

  const session = await getSession();
  return session?.accessToken || null;
};

export const isAuthenticated = async (): Promise<boolean> => {
  const token = await getAuthToken();
  return !!token;
};

export const getAuthHeaders = async (): Promise<Record<string, string>> => {
  const token = await getAuthToken();

  if (token) {
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  return {
    'Content-Type': 'application/json',
  };
};
