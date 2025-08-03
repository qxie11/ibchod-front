import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const accessToken = `admin_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const refreshToken = `refresh_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const response = NextResponse.json({
        accessToken,
      });

      response.cookies.set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60,
      });

      return response;
    } else {
      return NextResponse.json({ error: 'Nesprávné přihlašovací údaje' }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ error: 'Došlo k chybě při zpracování požadavku' }, { status: 500 });
  }
}
