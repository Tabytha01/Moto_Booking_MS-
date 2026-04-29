import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

const ROLE_ROUTES = {
  "/admin": "ADMIN",
  "/rider": "RIDER",
  "/customer": "CUSTOMER",
};

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  const matchedPrefix = Object.keys(ROLE_ROUTES).find((prefix) => pathname.startsWith(prefix));
  if (!matchedPrefix) return NextResponse.next();

  const requiredRole = ROLE_ROUTES[matchedPrefix];
  const payload = token ? verifyToken(token) : null;

  if (!payload) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (payload.role !== requiredRole) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/rider/:path*", "/customer/:path*"],
};
