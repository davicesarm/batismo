import { NextRequest, NextResponse, type MiddlewareConfig } from "next/server";
import * as jose from "jose";
import { JwtPayload } from "./types/jwtpayload";

const publicRoutes = ["/login"];
const authenticatedRedirectPath = "/";
const loginPath = "/login";

// Rotas protegidas + roles permitidas
const protectedRoutes: Record<string, string[]> = {
  "/admin": ["admin"],
  "/secretaria": ["secretaria", "admin"],
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("accessToken")?.value;
  const isPublicRoute = publicRoutes.includes(path);

  // Usuário autenticado tentando acessar rota pública -> redireciona
  if (token && isPublicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = authenticatedRedirectPath;
    return NextResponse.redirect(redirectUrl);
  }

  // Usuário não autenticado tentando acessar rota privada -> redireciona
  if (!token && !isPublicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = loginPath;
    return NextResponse.redirect(redirectUrl);
  }

  // Usuário não autenticado em rota pública -> segue
  if (!token && isPublicRoute) {
    return NextResponse.next();
  }

  try {
    const payload = jose.decodeJwt(token!) as JwtPayload;
    const scope = payload.scope ?? "";

    // Checa permissões baseadas nas rotas configuradas
    for (const [route, allowedRoles] of Object.entries(protectedRoutes)) {
      if (path.startsWith(route)) {
        const hasAccess = allowedRoles.includes(scope);
        if (!hasAccess) {
          return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
        }
      }
    }

    return NextResponse.next();
  } catch {
    // Token inválido (nem conseguiu decodificar)
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config: MiddlewareConfig = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};
