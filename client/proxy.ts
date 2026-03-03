import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage =
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup");

  const isProtectedPage =
    pathname.startsWith("/discover") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/connections") ||
    pathname.startsWith("/chat");

  if (token && isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/discover";
    return NextResponse.redirect(url);
  }

  if (!token && isProtectedPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/discover/:path*",
    "/profile/:path*",
    "/connections/:path*",
    "/chat/:path*",
  ],
};
