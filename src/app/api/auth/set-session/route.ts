import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { access_token, refresh_token } = await request.json();
    
    if (!access_token || !refresh_token) {
      return NextResponse.json(
        { error: 'Tokens são obrigatórios' },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    
    // Configurar cookie de access token
    cookieStore.set('sb-access-token', access_token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    
    // Configurar cookie de refresh token
    cookieStore.set('sb-refresh-token', refresh_token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 dias
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao configurar sessão:', error);
    return NextResponse.json(
      { error: 'Erro ao configurar sessão' },
      { status: 500 }
    );
  }
}
