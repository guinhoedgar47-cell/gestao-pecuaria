import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function middleware(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  // Se Supabase não estiver configurado, permitir acesso
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.next();
  }

  // Verificar se o usuário está autenticado
  const accessToken = request.cookies.get('sb-access-token')?.value;
  const refreshToken = request.cookies.get('sb-refresh-token')?.value;
  
  const isLoginPage = request.nextUrl.pathname.startsWith('/login');
  const isAuthCallback = request.nextUrl.pathname.startsWith('/auth/callback');
  
  // Permitir acesso ao callback sempre
  if (isAuthCallback) {
    return NextResponse.next();
  }
  
  // Se não tiver tokens e não estiver na página de login, redirecionar
  if (!accessToken && !refreshToken && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Se tiver token e tentar acessar /login, redirecionar para home
  if ((accessToken || refreshToken) && isLoginPage) {
    // Verificar se o token é válido
    try {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      const { data: { user } } = await supabase.auth.getUser(accessToken);
      
      if (user) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
      // Token inválido, permitir acesso ao login
      const response = NextResponse.next();
      response.cookies.delete('sb-access-token');
      response.cookies.delete('sb-refresh-token');
      return response;
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|icon.svg|.*\\..*).*)'],
};
