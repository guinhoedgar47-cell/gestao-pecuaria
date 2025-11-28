import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Verificar se o usuário está autenticado
  const supabaseToken = request.cookies.get('sb-access-token');
  
  // Se não estiver autenticado e não estiver na página de login, redirecionar
  if (!supabaseToken && !request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Se estiver autenticado e tentar acessar /login, redirecionar para home
  if (supabaseToken && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
