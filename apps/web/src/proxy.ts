import { authClient } from "@/lib/auth-client";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/dashboard"] as const;
const AUTH_ROUTE = "/";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await authClient.getSession({
    fetchOptions: {
      headers: request.headers,
      throw: true,
    },
  });

  const isProtectedRoute = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isProtectedRoute && !session?.user) {
    return NextResponse.redirect(new URL(AUTH_ROUTE, request.url));
  }

  if (pathname === AUTH_ROUTE && session?.user) {
    return NextResponse.redirect(new URL(PROTECTED_ROUTES[0], request.url));
  }

  return NextResponse.next();
}
