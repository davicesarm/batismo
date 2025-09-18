import { NextRequest, NextResponse, type MiddlewareConfig } from "next/server";

const publicRoutes = ["/login"];
const authenticatedRedirectPath = "/";
const loginPath = "/login";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const authenticated = request.cookies.get("accessToken");
  const isPublicRoute = publicRoutes.includes(path);

  if (authenticated && isPublicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = authenticatedRedirectPath;
    return NextResponse.redirect(redirectUrl);
  }

  if (!authenticated && !isPublicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = loginPath;
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
