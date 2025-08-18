import { NextRequest, NextResponse } from 'next/server';

import { Api } from '@/generated/generated';

const api = new Api({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
});

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get('refreshToken')?.value;

    if (!refreshToken) {
      return NextResponse.json({ error: 'Refresh token nebyl nalezen' }, { status: 401 });
    }

    const response = await api.auth.authControllerRefresh({
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    // @ts-ignore
    if (response?.data) {
      const responseData = response.data as any;

      if (responseData.accessToken) {
        const response = NextResponse.json({
          accessToken: responseData.accessToken,
        });

        if (responseData.refreshToken) {
          response.cookies.set('refreshToken', responseData.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60,
          });
        }

        return response;
      }
    }

    return NextResponse.json({ error: 'Nepodařilo se obnovit token' }, { status: 401 });
  } catch (error) {
    console.error('Refresh token error:', error);
    return NextResponse.json({ error: 'Interní chyba serveru' }, { status: 500 });
  }
}
